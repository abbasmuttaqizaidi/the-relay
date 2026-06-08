import { prisma } from "../db/prisma.server";
import {
  Opportunity,
  CreateOpportunityDTO,
  UpdateOpportunityDTO,
  ListOpportunitiesFilters,
} from "../types";
import { serverCache } from "../lib/server-cache";

export class OpportunityService {
  /**
   * Generates a unique sequential opportunity number in format RY-0001, RY-0002...
   */
  static async generateOpportunityNumber(): Promise<string> {
    try {
      const latestOpp = await prisma.opportunity.findFirst({
        orderBy: { created_at: "desc" },
      });
      let nextNum = 1;
      if (latestOpp && latestOpp.opportunity_number) {
        const match = latestOpp.opportunity_number.match(/RY-(\d+)/);
        if (match && match[1]) {
          nextNum = parseInt(match[1], 10) + 1;
        }
      }
      return `RY-${String(nextNum).padStart(4, "0")}`;
    } catch (error) {
      console.error("[OpportunityService.generateOpportunityNumber] Error:", error);
      // Fallback count in case of error
      const count = await prisma.opportunity.count();
      return `RY-${String(count + 1).padStart(4, "0")}`;
    }
  }

  /**
   * Creates a new opportunity listing for a business using Prisma.
   */
  static async createOpportunity(dto: CreateOpportunityDTO): Promise<Opportunity> {
    try {
      const opportunity_number = await this.generateOpportunityNumber();
      const opportunity = await prisma.opportunity.create({
        data: {
          business_id: dto.business_id,
          opportunity_number,
          title: dto.title,
          description: dto.description,
          category: dto.category,
          location: dto.location || null,
          offer_text: dto.offer_text || null,
          expires_at: dto.expires_at ? new Date(dto.expires_at) : null,
          status: "active",
          hide_company_name: dto.hide_company_name ?? false,
          promotion_status: dto.promotion_status || "none",
        },
      });

      return {
        ...opportunity,
        category: opportunity.category as any,
        status: opportunity.status as any,
        location: opportunity.location,
        offer_text: opportunity.offer_text,
        expires_at: opportunity.expires_at ? opportunity.expires_at.toISOString() : null,
        created_at: opportunity.created_at.toISOString(),
        updated_at: opportunity.updated_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[OpportunityService.createOpportunity] Error:", error);
      throw new Error(`Failed to create opportunity: ${error.message || error}`);
    }
  }

  /**
   * Updates an existing opportunity listing.
   */
  static async updateOpportunity(
    opportunityId: string,
    dto: UpdateOpportunityDTO,
  ): Promise<Opportunity> {
    try {
      const dataToUpdate: any = {};
      if (dto.title !== undefined) dataToUpdate.title = dto.title;
      if (dto.description !== undefined) dataToUpdate.description = dto.description;
      if (dto.category !== undefined) dataToUpdate.category = dto.category;
      if (dto.location !== undefined) dataToUpdate.location = dto.location;
      if (dto.offer_text !== undefined) dataToUpdate.offer_text = dto.offer_text;
      if (dto.expires_at !== undefined) {
        dataToUpdate.expires_at = dto.expires_at ? new Date(dto.expires_at) : null;
      }
      if (dto.status !== undefined) dataToUpdate.status = dto.status;
      if (dto.hide_company_name !== undefined) {
        dataToUpdate.hide_company_name = dto.hide_company_name;
      }
      if (dto.promotion_status !== undefined) {
        dataToUpdate.promotion_status = dto.promotion_status;
      }

      const opportunity = await prisma.opportunity.update({
        where: { id: opportunityId },
        data: dataToUpdate,
      });

      const result = {
        ...opportunity,
        category: opportunity.category as any,
        status: opportunity.status as any,
        location: opportunity.location,
        offer_text: opportunity.offer_text,
        expires_at: opportunity.expires_at ? opportunity.expires_at.toISOString() : null,
        created_at: opportunity.created_at.toISOString(),
        updated_at: opportunity.updated_at.toISOString(),
      };

      // Invalidate opportunity cache
      serverCache.delete(`opportunity:id:${opportunityId}`);
      return result;
    } catch (error: any) {
      console.error("[OpportunityService.updateOpportunity] Error:", error);
      throw new Error(`Failed to update opportunity: ${error.message || error}`);
    }
  }

  /**
   * Closes an opportunity.
   */
  static async closeOpportunity(opportunityId: string): Promise<Opportunity> {
    return this.updateOpportunity(opportunityId, { status: "closed" });
  }

  /**
   * Updates the promotion status of an opportunity (admin-only operation).
   */
  static async updatePromotionStatus(
    opportunityId: string,
    promotionStatus: string,
  ): Promise<Opportunity> {
    try {
      const opportunity = await prisma.opportunity.update({
        where: { id: opportunityId },
        data: { promotion_status: promotionStatus },
      });

      // Invalidate opportunity cache
      serverCache.delete(`opportunity:id:${opportunityId}`);

      return {
        ...opportunity,
        category: opportunity.category as any,
        status: opportunity.status as any,
        location: opportunity.location,
        offer_text: opportunity.offer_text,
        expires_at: opportunity.expires_at ? opportunity.expires_at.toISOString() : null,
        created_at: opportunity.created_at.toISOString(),
        updated_at: opportunity.updated_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[OpportunityService.updatePromotionStatus] Error:", error);
      throw new Error(`Failed to update promotion status: ${error.message || error}`);
    }
  }

  /**
   * Get opportunity by ID.
   */
  static async getById(opportunityId: string) {
    return this.getOpportunityById(opportunityId);
  }

  /**
   * Retrieves a specific opportunity by its ID.
   */
  static async getOpportunityById(opportunityId: string) {
    const cacheKey = `opportunity:id:${opportunityId}`;
    const cached = serverCache.get<any>(cacheKey);
    if (cached) return cached;

    try {
      const opp = await prisma.opportunity.findUnique({
        where: { id: opportunityId },
        include: {
          business: true,
          _count: {
            select: { interests: true }
          }
        },
      });
      if (!opp) return null;

      const result = {
        ...opp,
        category: opp.category as any,
        status: opp.status as any,
        location: opp.location,
        offer_text: opp.offer_text,
        expires_at: opp.expires_at ? opp.expires_at.toISOString() : null,
        created_at: opp.created_at.toISOString(),
        updated_at: opp.updated_at.toISOString(),
        interestedCount: opp._count?.interests || 0,
        business: opp.business
          ? {
              ...opp.business,
              company_name: opp.business.company_name,
              logo_url: opp.business.logo_url,
              linkedin_url: opp.business.linkedin_url,
              status: opp.business.status as any,
              created_at: opp.business.created_at.toISOString(),
              updated_at: opp.business.updated_at.toISOString(),
            }
          : null,
      };

      serverCache.set(cacheKey, result, 300); // Cache for 5 minutes
      return result;
    } catch (error: any) {
      console.error("[OpportunityService.getOpportunityById] Error:", error);
      throw new Error(`Failed to get opportunity: ${error.message || error}`);
    }
  }

  /**
   * Retrieves all opportunities belonging to a specific business.
   */
  static async getByBusiness(businessId: string) {
    try {
      const opportunities = await prisma.opportunity.findMany({
        where: { business_id: businessId },
        include: {
          _count: {
            select: { interests: true }
          }
        },
        orderBy: { created_at: "desc" },
      });

      return opportunities.map((opp) => ({
        ...opp,
        category: opp.category as any,
        status: opp.status as any,
        location: opp.location,
        offer_text: opp.offer_text,
        expires_at: opp.expires_at ? opp.expires_at.toISOString() : null,
        created_at: opp.created_at.toISOString(),
        updated_at: opp.updated_at.toISOString(),
        interestedCount: opp._count?.interests || 0,
      }));
    } catch (error: any) {
      console.error("[OpportunityService.getByBusiness] Error:", error);
      throw new Error(`Failed to get business opportunities: ${error.message || error}`);
    }
  }

  /**
   * Lists active opportunities with optional search filters.
   */
  static async listActive(filters?: ListOpportunitiesFilters) {
    try {
      const whereClause: any = { status: "active" };

      if (filters?.category && filters.category !== "All") {
        whereClause.category = filters.category;
      }

      if (filters?.industry && filters.industry !== "All") {
        whereClause.business = {
          industry: filters.industry,
        };
      }

      const opportunities = await prisma.opportunity.findMany({
        where: whereClause,
        include: {
          business: true,
          _count: {
            select: { interests: true }
          }
        },
        orderBy: {
          created_at: "desc",
        },
        skip: filters?.offset ?? 0,
        take: filters?.limit ?? 100,
      });

      return opportunities.map((opp) => ({
        ...opp,
        category: opp.category as any,
        status: opp.status as any,
        location: opp.location,
        offer_text: opp.offer_text,
        expires_at: opp.expires_at ? opp.expires_at.toISOString() : null,
        created_at: opp.created_at.toISOString(),
        updated_at: opp.updated_at.toISOString(),
        interestedCount: opp._count?.interests || 0,
        business: opp.business
          ? {
              ...opp.business,
              company_name: opp.business.company_name,
              logo_url: opp.business.logo_url,
              linkedin_url: opp.business.linkedin_url,
              status: opp.business.status as any,
              created_at: opp.business.created_at.toISOString(),
              updated_at: opp.business.updated_at.toISOString(),
            }
          : null,
      }));
    } catch (error: any) {
      console.error("[OpportunityService.listActive] Error:", error);
      throw new Error(`Failed to list active opportunities: ${error.message || error}`);
    }
  }

  /**
   * Legacy list method (optional mapping for backward compatibility).
   */
  static async listOpportunities(filters: ListOpportunitiesFilters) {
    return this.listActive(filters);
  }

  /**
   * Bookmarks/Saves an opportunity for a user.
   */
  static async saveOpportunity(userId: string, opportunityId: string): Promise<void> {
    try {
      await prisma.savedOpportunity.create({
        data: {
          user_id: userId,
          opportunity_id: opportunityId,
        },
      });
    } catch (error: any) {
      console.error("[OpportunityService.saveOpportunity] Error:", error);
      throw new Error(`Failed to save opportunity: ${error.message || error}`);
    }
  }

  /**
   * Removes a bookmarked/saved opportunity for a user.
   */
  static async removeSavedOpportunity(userId: string, opportunityId: string): Promise<void> {
    try {
      await prisma.savedOpportunity.deleteMany({
        where: {
          user_id: userId,
          opportunity_id: opportunityId,
        },
      });
    } catch (error: any) {
      console.error("[OpportunityService.removeSavedOpportunity] Error:", error);
      throw new Error(`Failed to remove saved opportunity: ${error.message || error}`);
    }
  }
}
