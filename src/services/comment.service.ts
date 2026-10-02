import { prisma } from "../db/prisma.server";
import { CreateInsightCommentDTO, InsightComment } from "../types";

const SAFE_BUSINESS_SELECT = {
  id: true,
  company_name: true,
  industry: true,
  logo_url: true,
  website: true,
  status: true,
  website_verified: true,
};

export class CommentService {
  /**
   * Retrieves all published comments for a question or knowledge insight
   */
  static async getComments(itemType: "question" | "knowledge", itemId: string): Promise<InsightComment[]> {
    try {
      const comments = await prisma.insightComment.findMany({
        where: {
          item_type: itemType,
          item_id: itemId,
          status: "published",
          parent_id: null, // Top-level comments
        },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
          replies: {
            where: { status: "published" },
            include: {
              business: {
                select: SAFE_BUSINESS_SELECT,
              },
            },
            orderBy: { created_at: "asc" },
          },
        },
        orderBy: { created_at: "desc" },
      });

      return comments.map((c) => this.mapComment(c));
    } catch (error: any) {
      console.error("[CommentService.getComments] Error:", error);
      throw new Error(`Failed to fetch comments: ${error.message || error}`);
    }
  }

  /**
   * Creates a comment under an article with one of the 3 identity tiers:
   * 1. general_public
   * 2. relay_business
   * 3. business_member
   */
  static async createComment(
    dto: CreateInsightCommentDTO,
    context?: { userId?: string; userEmail?: string; clerkName?: string }
  ): Promise<InsightComment> {
    try {
      // 1. Verify target item exists
      if (dto.item_type === "question") {
        const question = await prisma.question.findUnique({ where: { id: dto.item_id } });
        if (!question) throw new Error("Question not found");
      } else {
        const knowledge = await prisma.knowledgeInsight.findUnique({ where: { id: dto.item_id } });
        if (!knowledge) throw new Error("Knowledge article not found");
      }

      // 2. Validate author identity rules
      let authorName = dto.author_name || context?.clerkName || "Public Contributor";
      let businessId: string | null = null;
      let authorTitle: string | null = null;

      if (dto.author_type === "relay_business") {
        if (!dto.business_id) {
          throw new Error("Business identity required for Relay Member comments.");
        }
        const biz = await prisma.business.findUnique({
          where: { id: dto.business_id },
          select: { id: true, company_name: true, status: true, owner_user_id: true },
        });
        if (!biz) throw new Error("Business not found.");

        if (context?.userId) {
          const isOwner = biz.owner_user_id === context.userId;
          let isMember = false;
          if (!isOwner) {
            const memberRecord = await prisma.businessMember.findUnique({
              where: {
                business_id_user_id: {
                  business_id: biz.id,
                  user_id: context.userId,
                },
              },
            });
            isMember = Boolean(memberRecord);
          }
          if (!isOwner && !isMember) {
            throw new Error("Unauthorized to comment on behalf of this business.");
          }
        }
        businessId = biz.id;
        authorName = biz.company_name;
      } else if (dto.author_type === "business_member") {
        if (!dto.business_id) {
          throw new Error("Associated business required for Business Member comments.");
        }
        const biz = await prisma.business.findUnique({
          where: { id: dto.business_id },
          select: { id: true, company_name: true, owner_user_id: true },
        });
        if (!biz) throw new Error("Associated business not found.");

        if (context?.userId) {
          const dbUser = await prisma.user.findUnique({
            where: { id: context.userId },
            select: { id: true, type: true },
          });
          const isOwner = biz.owner_user_id === context.userId;
          const isAssociate = dbUser?.type === "associate";
          let isMember = false;
          if (!isOwner) {
            const memberRecord = await prisma.businessMember.findUnique({
              where: {
                business_id_user_id: {
                  business_id: biz.id,
                  user_id: context.userId,
                },
              },
            });
            isMember = Boolean(memberRecord);
          }
          if (!isOwner && !isAssociate && !isMember) {
            throw new Error("Posting as a business associate requires verified company approval.");
          }
        } else {
          throw new Error("Authentication required to post as a verified business associate.");
        }

        businessId = biz.id;
        authorName = dto.author_name || context?.clerkName || "Team Member";
        authorTitle = dto.author_title || "Team Member";
      } else {
        // general_public
        authorName = dto.author_name || context?.clerkName || "Public Contributor";
        authorTitle = dto.author_title || "Community Member";
      }

      // 3. Validate parent comment integrity if replying to an existing thread
      let resolvedParentId: string | null = null;
      if (dto.parent_id) {
        const parentComment = await prisma.insightComment.findUnique({
          where: { id: dto.parent_id },
          select: { id: true, item_id: true, item_type: true, status: true, parent_id: true },
        });
        if (!parentComment) {
          throw new Error("Parent comment not found.");
        }
        if (parentComment.item_id !== dto.item_id || parentComment.item_type !== dto.item_type) {
          throw new Error("Parent comment does not belong to this discussion.");
        }
        // If the referenced comment is itself a reply, attach to root parent to maintain 1-level thread
        resolvedParentId = parentComment.parent_id || parentComment.id;
      }

      let authorAvatar = dto.author_avatar || null;
      if (!authorAvatar && context?.userId) {
        const u = await prisma.user.findUnique({
          where: { id: context.userId },
          select: { avatar_url: true },
        });
        if (u?.avatar_url) {
          authorAvatar = u.avatar_url;
        }
      }

      const comment = await prisma.insightComment.create({
        data: {
          item_type: dto.item_type,
          item_id: dto.item_id,
          user_id: context?.userId || null,
          author_type: dto.author_type,
          author_name: authorName,
          author_email: context?.userEmail || null,
          author_avatar: authorAvatar,
          author_title: authorTitle,
          business_id: businessId,
          parent_id: resolvedParentId,
          content: dto.content,
          status: "published",
        },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      return this.mapComment(comment);
    } catch (error: any) {
      console.error("[CommentService.createComment] Error:", error);
      throw new Error(`Failed to create comment: ${error.message || error}`);
    }
  }

  /**
   * Upvote a comment
   */
  static async upvoteComment(commentId: string): Promise<number> {
    try {
      const updated = await prisma.insightComment.update({
        where: { id: commentId },
        data: {
          upvotes: { increment: 1 },
        },
        select: { upvotes: true },
      });
      return updated.upvotes;
    } catch (error: any) {
      console.error("[CommentService.upvoteComment] Error:", error);
      throw new Error(`Failed to upvote comment: ${error.message || error}`);
    }
  }

  /**
   * Deletes a comment by ID with authorization checks (Author or Admin)
   */
  static async deleteComment(
    commentId: string,
    context?: { userId?: string; userEmail?: string; businessId?: string; isAdmin?: boolean }
  ): Promise<{ success: boolean; id: string }> {
    try {
      const comment = await prisma.insightComment.findUnique({
        where: { id: commentId },
        select: {
          id: true,
          user_id: true,
          author_email: true,
          business_id: true,
        },
      });

      if (!comment) {
        throw new Error("Comment not found.");
      }

      // Check authorization
      let isAuthorized = false;

      // 1. Super admin can delete any comment
      if (context?.isAdmin) {
        isAuthorized = true;
      }

      // 2. Direct user ID match
      if (!isAuthorized && context?.userId && comment.user_id && comment.user_id === context.userId) {
        isAuthorized = true;
      }

      // 3. User email match
      if (
        !isAuthorized &&
        context?.userEmail &&
        comment.author_email &&
        context.userEmail.toLowerCase() === comment.author_email.toLowerCase()
      ) {
        isAuthorized = true;
      }

      // 4. Business owner or member match
      if (!isAuthorized && comment.business_id && context?.userId) {
        const biz = await prisma.business.findUnique({
          where: { id: comment.business_id },
          select: { owner_user_id: true },
        });
        if (biz && biz.owner_user_id === context.userId) {
          isAuthorized = true;
        } else {
          const member = await prisma.businessMember.findUnique({
            where: {
              business_id_user_id: {
                business_id: comment.business_id,
                user_id: context.userId,
              },
            },
          });
          if (member) {
            isAuthorized = true;
          }
        }
      }

      if (!isAuthorized) {
        throw new Error("Unauthorized: You do not have permission to delete this comment.");
      }

      await prisma.insightComment.delete({
        where: { id: commentId },
      });

      return { success: true, id: commentId };
    } catch (error: any) {
      console.error("[CommentService.deleteComment] Error:", error);
      throw new Error(error.message || "Failed to delete comment");
    }
  }

  private static mapComment(record: any): InsightComment {
    return {
      id: record.id,
      item_type: record.item_type,
      item_id: record.item_id,
      user_id: record.user_id,
      author_type: record.author_type,
      author_name: record.author_name,
      author_email: record.author_email,
      author_avatar: record.author_avatar,
      author_title: record.author_title,
      business_id: record.business_id,
      parent_id: record.parent_id,
      content: record.content,
      status: record.status,
      upvotes: record.upvotes ?? 0,
      created_at: record.created_at.toISOString(),
      updated_at: record.updated_at.toISOString(),
      business: record.business || null,
      replies: record.replies ? record.replies.map((r: any) => this.mapComment(r)) : [],
    };
  }
}
