import { prisma } from "../db/prisma.server";
import {
  Perspective,
  CreatePerspectiveDTO,
  UpdatePerspectiveDTO,
} from "../types";
import { NotificationService } from "./notification.service";

const SAFE_BUSINESS_SELECT = {
  id: true,
  company_name: true,
  industry: true,
  logo_url: true,
  hq_location: true,
  status: true,
  website: true,
  website_verified: true,
  founded_year: true,
  company_size: true,
  company_type: true,
  description: true,
};

export class PerspectiveService {
  /**
   * Shares a perspective on a question.
   * Rules:
   * - Only approved businesses can share perspectives.
   * - A business cannot answer its own question.
   * - Cannot share a perspective on a closed question.
   * - Exactly 1 perspective per business per question.
   */
  static async createPerspective(dto: CreatePerspectiveDTO): Promise<Perspective> {
    try {
      // 1. Fetch question and check status and owner
      const question = await prisma.question.findUnique({
        where: { id: dto.question_id },
        include: {
          business: {
            select: {
              ...SAFE_BUSINESS_SELECT,
              owner_user_id: true,
            },
          },
        },
      });

      if (!question) {
        throw new Error("Question not found");
      }

      if (question.status === "closed") {
        throw new Error("Cannot add perspective: this question is closed.");
      }

      if (question.business_id === dto.business_id) {
        throw new Error("Cannot share a perspective on your own question.");
      }

      // 2. Fetch author business and verify approved status
      const authorBusiness = await prisma.business.findUnique({
        where: { id: dto.business_id },
      });

      if (!authorBusiness) {
        throw new Error("Business not found");
      }

      if (authorBusiness.status !== "approved") {
        throw new Error("Only approved businesses can share perspectives.");
      }

      // 3. Check for existing perspective by this business on this question
      const existing = await prisma.perspective.findUnique({
        where: {
          question_id_business_id: {
            question_id: dto.question_id,
            business_id: dto.business_id,
          },
        },
      });

      if (existing) {
        throw new Error("You have already shared a perspective on this question.");
      }

      // 4. Create perspective
      const perspective = await prisma.perspective.create({
        data: {
          question_id: dto.question_id,
          business_id: dto.business_id,
          content: dto.content.trim(),
          qualification: dto.qualification.trim(),
          based_on: dto.based_on,
          relevant_experience: dto.relevant_experience?.trim() || null,
        },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      // 5. Notify question owner
      try {
        if (question.business?.owner_user_id) {
          await NotificationService.createNotification({
            user_id: question.business.owner_user_id,
            title: "New Perspective on your question",
            description: `${authorBusiness.company_name} shared a perspective on "${question.title}"`,
          });
        }
      } catch (notifErr) {
        console.warn("[PerspectiveService.createPerspective] Notification failed:", notifErr);
      }

      // 6. Log activity
      try {
        await prisma.activityLog.create({
          data: {
            action: "perspective_created",
            details: JSON.stringify({
              perspective_id: perspective.id,
              question_id: dto.question_id,
              business_id: dto.business_id,
            }),
          },
        });
      } catch (logErr) {
        console.warn("[PerspectiveService.createPerspective] Failed to log activity:", logErr);
      }

      return PerspectiveService.mapPerspectiveModel(perspective);
    } catch (error: any) {
      console.error("[PerspectiveService.createPerspective] Error:", error);
      throw new Error(error.message || "Failed to create perspective");
    }
  }

  /**
   * Fetches all perspectives for a question, sorted newest first.
   */
  static async getPerspectivesByQuestionId(questionId: string): Promise<Perspective[]> {
    try {
      const perspectives = await prisma.perspective.findMany({
        where: { question_id: questionId },
        orderBy: { created_at: "desc" },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      return perspectives.map(PerspectiveService.mapPerspectiveModel);
    } catch (error: any) {
      console.error("[PerspectiveService.getPerspectivesByQuestionId] Error:", error);
      throw new Error(error.message || "Failed to fetch perspectives");
    }
  }

  /**
   * Updates an existing perspective. Only the author business can edit.
   */
  static async updatePerspective(
    perspectiveId: string,
    businessId: string,
    dto: UpdatePerspectiveDTO,
  ): Promise<Perspective> {
    try {
      const existing = await prisma.perspective.findUnique({
        where: { id: perspectiveId },
      });

      if (!existing) {
        throw new Error("Perspective not found");
      }

      if (existing.business_id !== businessId) {
        throw new Error("Unauthorized: You can only edit your own perspective.");
      }

      const dataToUpdate: any = {};
      if (dto.content !== undefined) dataToUpdate.content = dto.content.trim();
      if (dto.qualification !== undefined) dataToUpdate.qualification = dto.qualification.trim();
      if (dto.based_on !== undefined) dataToUpdate.based_on = dto.based_on;
      if (dto.relevant_experience !== undefined) {
        dataToUpdate.relevant_experience = dto.relevant_experience?.trim() || null;
      }

      const updated = await prisma.perspective.update({
        where: { id: perspectiveId },
        data: dataToUpdate,
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      try {
        await prisma.activityLog.create({
          data: {
            action: "perspective_updated",
            details: JSON.stringify({
              perspective_id: perspectiveId,
              business_id: businessId,
            }),
          },
        });
      } catch (logErr) {
        console.warn("[PerspectiveService.updatePerspective] Failed to log activity:", logErr);
      }

      return PerspectiveService.mapPerspectiveModel(updated);
    } catch (error: any) {
      console.error("[PerspectiveService.updatePerspective] Error:", error);
      throw new Error(error.message || "Failed to update perspective");
    }
  }

  /**
   * Deletes a perspective. Only the author business can delete.
   */
  static async deletePerspective(perspectiveId: string, businessId: string): Promise<boolean> {
    try {
      const existing = await prisma.perspective.findUnique({
        where: { id: perspectiveId },
      });

      if (!existing) {
        throw new Error("Perspective not found");
      }

      if (existing.business_id !== businessId) {
        throw new Error("Unauthorized: You can only delete your own perspective.");
      }

      await prisma.perspective.delete({
        where: { id: perspectiveId },
      });

      try {
        await prisma.activityLog.create({
          data: {
            action: "perspective_deleted",
            details: JSON.stringify({
              perspective_id: perspectiveId,
              business_id: businessId,
            }),
          },
        });
      } catch (logErr) {
        console.warn("[PerspectiveService.deletePerspective] Failed to log activity:", logErr);
      }

      return true;
    } catch (error: any) {
      console.error("[PerspectiveService.deletePerspective] Error:", error);
      throw new Error(error.message || "Failed to delete perspective");
    }
  }

  /**
   * Maps a Prisma perspective entity to our Perspective interface.
   */
  private static mapPerspectiveModel(p: any): Perspective {
    return {
      id: p.id,
      question_id: p.question_id,
      business_id: p.business_id,
      content: p.content,
      qualification: p.qualification,
      based_on: p.based_on,
      relevant_experience: p.relevant_experience ?? null,
      created_at: p.created_at instanceof Date ? p.created_at.toISOString() : p.created_at,
      updated_at: p.updated_at instanceof Date ? p.updated_at.toISOString() : p.updated_at,
      business: p.business
        ? {
            ...p.business,
            created_at: p.business.created_at ? (p.business.created_at instanceof Date ? p.business.created_at.toISOString() : p.business.created_at) : "",
            updated_at: p.business.updated_at ? (p.business.updated_at instanceof Date ? p.business.updated_at.toISOString() : p.business.updated_at) : "",
          }
        : undefined,
    };
  }
}
