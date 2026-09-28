import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { prisma } from "../db/prisma.server";
import { verifyAdminSession } from "../lib/admin-auth.server";
import { isUUID } from "../lib/slug";

const increaseAdminInsightViewsSchema = z.object({
  type: z.enum(["question", "knowledge"]),
  id: z.string().min(1, "ID or slug is required"),
  amount: z.number().int().positive("Amount must be a positive integer").default(1),
});

export const increaseAdminInsightViews = createServerFn({ method: "POST" })
  .inputValidator(increaseAdminInsightViewsSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC admin session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only an admin can increase insight views.");
    }

    const { type, id, amount } = data;
    const isIdUUID = isUUID(id);

    if (type === "question") {
      // Find question by id or slug
      const item = await prisma.question.findFirst({
        where: isIdUUID
          ? { OR: [{ id }, { slug: id }] }
          : { slug: id },
        select: { id: true, views: true },
      });

      if (!item) {
        throw new Error("Question not found.");
      }

      const updated = await prisma.question.update({
        where: { id: item.id },
        data: { views: { increment: amount } },
        select: { id: true, views: true, title: true },
      });

      return {
        success: true,
        type: "question",
        id: updated.id,
        newViews: updated.views,
        added: amount,
      };
    } else {
      // Find knowledge insight by id or slug
      const item = await prisma.knowledgeInsight.findFirst({
        where: isIdUUID
          ? { OR: [{ id }, { slug: id }] }
          : { slug: id },
        select: { id: true, views: true },
      });

      if (!item) {
        throw new Error("Knowledge article not found.");
      }

      const updated = await prisma.knowledgeInsight.update({
        where: { id: item.id },
        data: { views: { increment: amount } },
        select: { id: true, views: true, title: true },
      });

      return {
        success: true,
        type: "knowledge",
        id: updated.id,
        newViews: updated.views,
        added: amount,
      };
    }
  });

export type IncreaseAdminInsightViewsFn = typeof increaseAdminInsightViews;
