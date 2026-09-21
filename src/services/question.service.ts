import { prisma } from "../db/prisma.server";
import {
  Question,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  ListQuestionsFilters,
} from "../types";
import { submitToIndexNow } from "../lib/indexnow.server";
import { SITE_URL } from "../lib/seo";

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

export class QuestionService {
  /**
   * Creates a new business question.
   * Only approved businesses can post questions.
   */
  static async createQuestion(dto: CreateQuestionDTO): Promise<Question> {
    try {
      // 1. Verify business is approved
      const business = await prisma.business.findUnique({
        where: { id: dto.business_id },
      });

      if (!business) {
        throw new Error("Business not found");
      }

      if (business.status !== "approved") {
        throw new Error("Only approved businesses can ask questions.");
      }

      // 2. Create question in database
      const question = await prisma.question.create({
        data: {
          business_id: dto.business_id,
          title: dto.title.trim(),
          description: dto.description.trim(),
          topic: dto.topic,
          desired_perspective: dto.desired_perspective || null,
          context_content_json: dto.context_content_json || null,
          status: "open",
        },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
          _count: {
            select: { perspectives: true },
          },
        },
      });

      // 3. Log activity
      try {
        await prisma.activityLog.create({
          data: {
            action: "question_created",
            details: JSON.stringify({
              question_id: question.id,
              business_id: dto.business_id,
              title: question.title,
            }),
          },
        });
      } catch (logErr) {
        console.warn("[QuestionService.createQuestion] Failed to log activity:", logErr);
      }

      // 4. Notify search engines via IndexNow asynchronously
      submitToIndexNow(`${SITE_URL}/insights/${question.id}`).catch((err) => {
        console.warn("[QuestionService.createQuestion] IndexNow notification failed:", err);
      });

      return QuestionService.mapQuestionModel(question);
    } catch (error: any) {
      console.error("[QuestionService.createQuestion] Error:", error);
      throw new Error(error.message || "Failed to create question");
    }
  }

  /**
   * Lists questions with optional topic, industry, and search filters.
   * Questions are always sorted newest first.
   */
  static async getQuestions(filters?: ListQuestionsFilters): Promise<Question[]> {
    try {
      const where: any = {};

      if (filters?.topic && filters.topic !== "All") {
        where.topic = filters.topic;
      }

      if (filters?.status) {
        where.status = filters.status;
      }

      if (filters?.industry && filters.industry !== "All") {
        where.business = {
          industry: {
            contains: filters.industry,
            mode: "insensitive",
          },
        };
      }

      if (filters?.search && filters.search.trim()) {
        const query = filters.search.trim();
        where.OR = [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ];
      }

      const orderBy =
        filters?.sortBy === "perspectives"
          ? [
              { perspectives: { _count: "desc" as const } },
              { created_at: "desc" as const },
            ]
          : { created_at: "desc" as const };

      const questions = await prisma.question.findMany({
        where,
        orderBy,
        take: filters?.limit ?? 50,
        skip: filters?.offset ?? 0,
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
          _count: {
            select: { perspectives: true },
          },
        },
      });

      return questions.map(QuestionService.mapQuestionModel);
    } catch (error: any) {
      console.error("[QuestionService.getQuestions] Error:", error);
      throw new Error(error.message || "Failed to fetch questions");
    }
  }

  /**
   * Fetches a single question by ID along with its perspectives.
   */
  static async getQuestionById(questionId: string): Promise<Question | null> {
    try {
      const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
          _count: {
            select: { perspectives: true },
          },
          perspectives: {
            orderBy: { created_at: "desc" },
            include: {
              business: {
                select: SAFE_BUSINESS_SELECT,
              },
            },
          },
        },
      });

      if (!question) {
        return null;
      }

      return QuestionService.mapQuestionModel(question);
    } catch (error: any) {
      console.error("[QuestionService.getQuestionById] Error:", error);
      throw new Error(error.message || "Failed to fetch question");
    }
  }

  /**
   * Updates an existing question. Only the owning business can update.
   */
  static async updateQuestion(
    questionId: string,
    businessId: string,
    dto: UpdateQuestionDTO,
  ): Promise<Question> {
    try {
      const existing = await prisma.question.findUnique({
        where: { id: questionId },
      });

      if (!existing) {
        throw new Error("Question not found");
      }

      if (existing.business_id !== businessId) {
        throw new Error("Unauthorized: You can only edit your own questions.");
      }

      const dataToUpdate: any = {};
      if (dto.title !== undefined) dataToUpdate.title = dto.title.trim();
      if (dto.description !== undefined) dataToUpdate.description = dto.description.trim();
      if (dto.topic !== undefined) dataToUpdate.topic = dto.topic;
      if (dto.desired_perspective !== undefined) {
        dataToUpdate.desired_perspective = dto.desired_perspective || null;
      }
      if (dto.context_content_json !== undefined) {
        dataToUpdate.context_content_json = dto.context_content_json || null;
      }
      if (dto.status !== undefined) dataToUpdate.status = dto.status;

      const updated = await prisma.question.update({
        where: { id: questionId },
        data: dataToUpdate,
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
          _count: {
            select: { perspectives: true },
          },
        },
      });

      try {
        await prisma.activityLog.create({
          data: {
            action: "question_updated",
            details: JSON.stringify({
              question_id: questionId,
              business_id: businessId,
            }),
          },
        });
      } catch (logErr) {
        console.warn("[QuestionService.updateQuestion] Failed to log activity:", logErr);
      }

      // Notify search engines via IndexNow asynchronously
      submitToIndexNow(`${SITE_URL}/insights/${updated.id}`).catch((err) => {
        console.warn("[QuestionService.updateQuestion] IndexNow notification failed:", err);
      });

      return QuestionService.mapQuestionModel(updated);
    } catch (error: any) {
      console.error("[QuestionService.updateQuestion] Error:", error);
      throw new Error(error.message || "Failed to update question");
    }
  }

  /**
   * Closes a question. Closed questions remain visible but reject new perspectives.
   * Only the question owner can close the question.
   */
  static async closeQuestion(questionId: string, businessId: string): Promise<Question> {
    try {
      const existing = await prisma.question.findUnique({
        where: { id: questionId },
      });

      if (!existing) {
        throw new Error("Question not found");
      }

      if (existing.business_id !== businessId) {
        throw new Error("Unauthorized: You can only close your own questions.");
      }

      const closed = await prisma.question.update({
        where: { id: questionId },
        data: { status: "closed" },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
          _count: {
            select: { perspectives: true },
          },
        },
      });

      try {
        await prisma.activityLog.create({
          data: {
            action: "question_closed",
            details: JSON.stringify({
              question_id: questionId,
              business_id: businessId,
            }),
          },
        });
      } catch (logErr) {
        console.warn("[QuestionService.closeQuestion] Failed to log activity:", logErr);
      }

      return QuestionService.mapQuestionModel(closed);
    } catch (error: any) {
      console.error("[QuestionService.closeQuestion] Error:", error);
      throw new Error(error.message || "Failed to close question");
    }
  }

  /**
   * Maps a Prisma question entity to our Question interface.
   */
  private static mapQuestionModel(q: any): Question {
    return {
      id: q.id,
      business_id: q.business_id,
      title: q.title,
      description: q.description,
      topic: q.topic,
      desired_perspective: q.desired_perspective ?? null,
      status: q.status,
      context_content_json: q.context_content_json ?? null,
      created_at: q.created_at instanceof Date ? q.created_at.toISOString() : q.created_at,
      updated_at: q.updated_at instanceof Date ? q.updated_at.toISOString() : q.updated_at,
      business: q.business
        ? {
            ...q.business,
            created_at: q.business.created_at ? (q.business.created_at instanceof Date ? q.business.created_at.toISOString() : q.business.created_at) : "",
            updated_at: q.business.updated_at ? (q.business.updated_at instanceof Date ? q.business.updated_at.toISOString() : q.business.updated_at) : "",
          }
        : undefined,
      _count: q._count,
      perspectives: q.perspectives
        ? q.perspectives.map((p: any) => ({
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
          }))
        : undefined,
    };
  }
}
