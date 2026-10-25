import { clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "../db/prisma.server";
import { verifyMarketingUnsubscribeToken } from "../lib/marketing-email.server";

export const unsubscribeFromMarketing = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1).max(2048) }))
  .handler(async ({ data }) => {
    const payload = verifyMarketingUnsubscribeToken(data.token);
    if (!payload) throw new Error("This unsubscribe link is invalid or has expired.");

    await prisma.marketingSuppression.upsert({
      where: { email: payload.email },
      create: {
        email: payload.email,
        clerk_user_id: payload.clerkUserId,
        reason: "unsubscribe",
      },
      update: { clerk_user_id: payload.clerkUserId, reason: "unsubscribe" },
    });

    if (payload.contactId) {
      await prisma.marketingContact.updateMany({
        where: { id: payload.contactId, email: payload.email },
        data: { marketing_consent: false },
      });
    }

    try {
      if (payload.clerkUserId) {
        const clerk = clerkClient();
        const user = await clerk.users.getUser(payload.clerkUserId);
        await clerk.users.updateUserMetadata(payload.clerkUserId, {
          publicMetadata: {
            ...user.publicMetadata,
            marketing_consent: false,
            marketing_consent_updated_at: new Date().toISOString(),
          },
        });
      }
    } catch (error) {
      console.error(
        "[unsubscribeFromMarketing] Suppression saved; Clerk metadata sync failed:",
        error,
      );
    }

    return { success: true };
  });