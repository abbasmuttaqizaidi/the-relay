import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "../db/prisma.server";
import { getServerConfig } from "../lib/config.server";
import {
  createMarketingUnsubscribeToken,
  prepareMarketingEmail,
  sanitizeMarketingHtml,
} from "../lib/marketing-email.server";
import { parseDirectEmailRecipients } from "../lib/direct-email.server";
import { verifyAdminSession } from "../lib/admin-auth.server";

const sendDirectEmailSchema = z.object({
  recipients: z.string().trim().min(1).max(40_000),
  subject: z.string().trim().min(2).max(150),
  htmlContent: z.string().trim().min(1).max(100_000),
  permissionConfirmed: z.literal(true),
  requestId: z.string().uuid(),
});

function requireAdmin() {
  const cookieHeader = getRequestHeaders().get("cookie") || "";
  if (!verifyAdminSession(cookieHeader)) {
    throw new Error("Forbidden: Only the super admin can send email.");
  }
}

export const sendAdminDirectMarketingEmail = createServerFn({ method: "POST" })
  .inputValidator(sendDirectEmailSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    const config = getServerConfig();
    if (!config.resendApiKey) throw new Error("RESEND_API_KEY is not configured.");

    const recipients = parseDirectEmailRecipients(data.recipients);
    if (recipients.length === 0) throw new Error("Enter at least one email address.");

    const html = sanitizeMarketingHtml(data.htmlContent);
    if (!html) throw new Error("Email content is empty after HTML sanitization.");

    const suppressions = await prisma.marketingSuppression.findMany({
      where: { email: { in: recipients } },
      select: { email: true },
    });
    const suppressed = new Set(suppressions.map((entry) => entry.email));
    const eligible = recipients.filter((email) => !suppressed.has(email));
    if (eligible.length === 0) {
      return {
        sentCount: 0,
        suppressedCount: recipients.length,
        failed: [] as Array<{ email: string; error: string }>,
      };
    }

    createMarketingUnsubscribeToken(null, "configuration-check@example.invalid");
    const resend = new Resend(config.resendApiKey);
    const from =
      process.env.MARKETING_FROM_EMAIL ||
      "Marlowe Wells <marlowe.wells@usetherelay.com>";
    const messages = eligible.map((email) => {
      const prepared = prepareMarketingEmail(html, null, email);
      return {
        from,
        to: [email],
        subject: data.subject,
        html: prepared.html,
        text: prepared.text,
        headers: { "List-Unsubscribe": `<${prepared.unsubscribeUrl}>` },
      };
    });

    const result = await resend.batch.send(messages, {
      idempotencyKey: data.requestId,
      batchValidation: "permissive",
    });
    if (result.error) throw new Error(result.error.message);

    const failed = (result.data.errors || []).map((error) => ({
      email: eligible[error.index],
      error: error.message,
    }));
    return {
      sentCount: result.data.data.length,
      suppressedCount: suppressed.size,
      failed,
    };
  });