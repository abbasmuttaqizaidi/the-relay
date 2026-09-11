import { prisma } from "../db/prisma.server";
import {
  KnowledgeInsight,
  CreateKnowledgeInsightDTO,
  UpdateKnowledgeInsightDTO,
  ListKnowledgeInsightsFilters,
} from "../types";

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

export class KnowledgeService {
  /**
   * Publishes a new Knowledge Insight.
   * ONLY approved businesses can publish Knowledge Insights.
   */
  static async createKnowledgeInsight(
    dto: CreateKnowledgeInsightDTO,
  ): Promise<KnowledgeInsight> {
    try {
      // 1. Verify business is approved
      const business = await prisma.business.findUnique({
        where: { id: dto.business_id },
      });

      if (!business) {
        throw new Error("Business not found");
      }

      if (business.status !== "approved") {
        throw new Error(
          `Forbidden: Your business profile is "${business.status}". Only approved businesses can publish Knowledge Insights.`,
        );
      }

      // 2. Create Knowledge Insight in database
      const insight = await prisma.knowledgeInsight.create({
        data: {
          business_id: dto.business_id,
          title: dto.title.trim(),
          content: dto.content.trim(),
          topic: dto.topic,
          based_on: dto.based_on || null,
          status: dto.status || "published",
        },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      // 3. Log activity
      try {
        await prisma.activityLog.create({
          data: {
            action: "knowledge_insight_created",
            details: JSON.stringify({
              knowledge_insight_id: insight.id,
              business_id: dto.business_id,
              title: insight.title,
            }),
          },
        });
      } catch (logErr) {
        console.warn(
          "[KnowledgeService.createKnowledgeInsight] Failed to log activity:",
          logErr,
        );
      }

      return KnowledgeService.mapInsightModel(insight);
    } catch (error: any) {
      console.error(
        "[KnowledgeService.createKnowledgeInsight] Error:",
        error,
      );
      throw new Error(error.message || "Failed to publish insight");
    }
  }

  /**
   * Lists Knowledge Insights with optional topic and search query.
   * Always sorted newest first (no engagement or trending algorithms).
   */
  static async getKnowledgeInsights(
    filters?: ListKnowledgeInsightsFilters,
  ): Promise<KnowledgeInsight[]> {
    try {
      const where: any = {};

      // Filter by status (default is 'published'; 'archived' is hidden from normal list)
      if (filters?.status && filters.status !== "all") {
        where.status = filters.status;
      } else if (!filters?.status) {
        where.status = "published";
      }

      // Topic filter
      if (filters?.topic && filters.topic !== "All") {
        where.topic = filters.topic;
      }

      // Specific business filter
      if (filters?.business_id) {
        where.business_id = filters.business_id;
      }

      // Keyword search across title AND content
      if (filters?.search && filters.search.trim()) {
        const query = filters.search.trim();
        where.OR = [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ];
      }

      const insights = await prisma.knowledgeInsight.findMany({
        where,
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
        orderBy: {
          created_at: "desc",
        },
        take: filters?.limit || 20,
        skip: filters?.offset || 0,
      });

      return insights.map(KnowledgeService.mapInsightModel);
    } catch (error: any) {
      console.error(
        "[KnowledgeService.getKnowledgeInsights] Error:",
        error,
      );
      throw new Error(error.message || "Failed to load knowledge insights");
    }
  }

  /**
   * Retrieves a single Knowledge Insight by ID.
   */
  static async getKnowledgeInsightById(id: string): Promise<KnowledgeInsight> {
    try {
      const insight = await prisma.knowledgeInsight.findUnique({
        where: { id },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      if (!insight) {
        throw new Error("Knowledge insight not found");
      }

      return KnowledgeService.mapInsightModel(insight);
    } catch (error: any) {
      console.error(
        "[KnowledgeService.getKnowledgeInsightById] Error:",
        error,
      );
      throw new Error(error.message || "Failed to get knowledge insight");
    }
  }

  /**
   * Updates an existing Knowledge Insight.
   * Only the author business can update their insight.
   */
  static async updateKnowledgeInsight(
    dto: UpdateKnowledgeInsightDTO,
  ): Promise<KnowledgeInsight> {
    try {
      const existing = await prisma.knowledgeInsight.findUnique({
        where: { id: dto.knowledge_insight_id },
      });

      if (!existing) {
        throw new Error("Knowledge insight not found");
      }

      if (existing.business_id !== dto.business_id) {
        throw new Error("Forbidden: You can only edit your own insights.");
      }

      const updateData: any = {};
      if (dto.title !== undefined) updateData.title = dto.title.trim();
      if (dto.content !== undefined) updateData.content = dto.content.trim();
      if (dto.topic !== undefined) updateData.topic = dto.topic;
      if (dto.based_on !== undefined) updateData.based_on = dto.based_on || null;
      if (dto.status !== undefined) updateData.status = dto.status;

      const updated = await prisma.knowledgeInsight.update({
        where: { id: dto.knowledge_insight_id },
        data: updateData,
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      // Log activity
      try {
        await prisma.activityLog.create({
          data: {
            action: "knowledge_insight_updated",
            details: JSON.stringify({
              knowledge_insight_id: updated.id,
              business_id: dto.business_id,
            }),
          },
        });
      } catch (logErr) {
        console.warn(
          "[KnowledgeService.updateKnowledgeInsight] Failed to log activity:",
          logErr,
        );
      }

      return KnowledgeService.mapInsightModel(updated);
    } catch (error: any) {
      console.error(
        "[KnowledgeService.updateKnowledgeInsight] Error:",
        error,
      );
      throw new Error(error.message || "Failed to update insight");
    }
  }

  /**
   * Archives a Knowledge Insight.
   * Remains in database but hidden from normal listing.
   * Only author business can archive.
   */
  static async archiveKnowledgeInsight(
    id: string,
    business_id: string,
  ): Promise<KnowledgeInsight> {
    try {
      const existing = await prisma.knowledgeInsight.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Knowledge insight not found");
      }

      if (existing.business_id !== business_id) {
        throw new Error("Forbidden: You can only archive your own insights.");
      }

      const archived = await prisma.knowledgeInsight.update({
        where: { id },
        data: { status: "archived" },
        include: {
          business: {
            select: SAFE_BUSINESS_SELECT,
          },
        },
      });

      // Log activity
      try {
        await prisma.activityLog.create({
          data: {
            action: "knowledge_insight_archived",
            details: JSON.stringify({
              knowledge_insight_id: id,
              business_id,
            }),
          },
        });
      } catch (logErr) {
        console.warn(
          "[KnowledgeService.archiveKnowledgeInsight] Failed to log activity:",
          logErr,
        );
      }

      return KnowledgeService.mapInsightModel(archived);
    } catch (error: any) {
      console.error(
        "[KnowledgeService.archiveKnowledgeInsight] Error:",
        error,
      );
      throw new Error(error.message || "Failed to archive insight");
    }
  }

  /**
   * Deletes a Knowledge Insight.
   * Only author business can delete.
   */
  static async deleteKnowledgeInsight(
    id: string,
    business_id: string,
  ): Promise<{ success: boolean }> {
    try {
      const existing = await prisma.knowledgeInsight.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Knowledge insight not found");
      }

      if (existing.business_id !== business_id) {
        throw new Error("Forbidden: You can only delete your own insights.");
      }

      await prisma.knowledgeInsight.delete({
        where: { id },
      });

      // Log activity
      try {
        await prisma.activityLog.create({
          data: {
            action: "knowledge_insight_deleted",
            details: JSON.stringify({
              knowledge_insight_id: id,
              business_id,
            }),
          },
        });
      } catch (logErr) {
        console.warn(
          "[KnowledgeService.deleteKnowledgeInsight] Failed to log activity:",
          logErr,
        );
      }

      return { success: true };
    } catch (error: any) {
      console.error(
        "[KnowledgeService.deleteKnowledgeInsight] Error:",
        error,
      );
      throw new Error(error.message || "Failed to delete insight");
    }
  }

  /**
   * Formats raw Prisma model into strongly-typed KnowledgeInsight.
   */
  private static mapInsightModel(insight: any): KnowledgeInsight {
    return {
      id: insight.id,
      business_id: insight.business_id,
      title: insight.title,
      content: insight.content,
      topic: insight.topic,
      based_on: insight.based_on || null,
      status: insight.status,
      created_at:
        typeof insight.created_at === "string"
          ? insight.created_at
          : insight.created_at.toISOString(),
      updated_at:
        typeof insight.updated_at === "string"
          ? insight.updated_at
          : insight.updated_at.toISOString(),
      business: insight.business
        ? {
            ...insight.business,
            created_at: "",
            updated_at: "",
          }
        : null,
    };
  }
}
