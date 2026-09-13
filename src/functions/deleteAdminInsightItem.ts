import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { prisma } from "../db/prisma.server";
import { verifyAdminSession } from "../lib/admin-auth.server";

const deleteAdminInsightItemSchema = z.object({
  type: z.enum(["question", "knowledge"]),
  id: z.string().uuid("Invalid ID"),
});

export const deleteAdminInsightItem = createServerFn({ method: "POST" })
  .inputValidator(deleteAdminInsightItemSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can delete insights via admin.");
    }

    if (data.type === "question") {
      await prisma.question.delete({
        where: { id: data.id },
      });
    } else {
      await prisma.knowledgeInsight.delete({
        where: { id: data.id },
      });
    }

    return { success: true };
  });

export type DeleteAdminInsightItemFn = typeof deleteAdminInsightItem;
