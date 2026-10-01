import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { UserService } from "../services/user.service";
import { prisma } from "../db/prisma.server";

export interface UserContribution {
  id: string;
  item_type: "question" | "knowledge";
  item_id: string;
  item_title: string;
  item_slug?: string | null;
  content: string;
  upvotes: number;
  created_at: Date;
  is_reply: boolean;
}

export const getMyContributions = createServerFn({ method: "GET" })
  .handler(async (): Promise<UserContribution[]> => {
    const authSession = await auth();
    if (!authSession.userId) {
      return [];
    }

    const dbUser = await UserService.getUserByClerkId(authSession.userId);
    if (!dbUser) {
      return [];
    }

    try {
      const comments = await prisma.insightComment.findMany({
        where: { user_id: dbUser.id },
        orderBy: { created_at: "desc" },
        take: 50,
      });

      if (comments.length === 0) {
        return [];
      }

      const knowledgeIds = comments
        .filter((c) => c.item_type === "knowledge")
        .map((c) => c.item_id);
      const questionIds = comments
        .filter((c) => c.item_type === "question")
        .map((c) => c.item_id);

      const [knowledgeList, questionList] = await Promise.all([
        knowledgeIds.length > 0
          ? prisma.knowledgeInsight.findMany({
              where: { id: { in: knowledgeIds } },
              select: { id: true, title: true, slug: true, topic: true },
            })
          : [],
        questionIds.length > 0
          ? prisma.question.findMany({
              where: { id: { in: questionIds } },
              select: { id: true, title: true, topic: true },
            })
          : [],
      ]);

      return comments.map((c) => {
        const item =
          c.item_type === "knowledge"
            ? knowledgeList.find((k) => k.id === c.item_id)
            : questionList.find((q) => q.id === c.item_id);

        return {
          id: c.id,
          item_type: c.item_type as "question" | "knowledge",
          item_id: c.item_id,
          item_title: item?.title || "Community Discussion",
          item_slug: (item as any)?.slug || null,
          content: c.content,
          upvotes: c.upvotes,
          created_at: c.created_at,
          is_reply: Boolean(c.parent_id),
        };
      });
    } catch (error) {
      console.error("[getMyContributions] Error:", error);
      return [];
    }
  });
