import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { verifyAdminSession } from "../lib/admin-auth.server";

/**
 * Admin-only server function to change the post time (created_at) of a
 * question or knowledge article.
 */
export const updateInsightPostTime = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { id: string; type: "question" | "knowledge" | "comment"; newDate: string }) => data
  )
  .handler(async ({ data }) => {
    // 1. Authenticate — admin session required
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can update post time.");
    }

    const parsedDate = new Date(data.newDate);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date provided.");
    }

    // 2. Update the created_at field based on type
    if (data.type === "question") {
      await prisma.question.update({
        where: { id: data.id },
        data: { created_at: parsedDate },
      });
    } else if (data.type === "knowledge") {
      await prisma.knowledgeInsight.update({
        where: { id: data.id },
        data: { created_at: parsedDate },
      });
    } else if (data.type === "comment") {
      await prisma.insightComment.update({
        where: { id: data.id },
        data: { created_at: parsedDate },
      });
    }

    return { success: true, newDate: parsedDate.toISOString() };
  });
