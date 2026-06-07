import { prisma } from "../db/prisma.server";
import {
  Opportunity,
  CreateOpportunityDTO,
  UpdateOpportunityDTO,
  ListOpportunitiesFilters,
} from "../types";

export class OpportunityService {
  /**
   * Creates a new opportunity listing for a business using Prisma.
   */
  static async createOpportunity(dto: CreateOpportunityDTO): Promise<Opportunity> {
    try {
      const opportunity = await prisma.opportunity.create({
        data: {
          business_id: dto.business_id,
          title: dto.title,
          description: dto.description,
          type: dto.type,
          status: "active",
        },
      });

      return {
        ...opportunity,
        type: opportunity.type as any,
        status: opportunity.status as any,
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
      const opportunity = await prisma.opportunity.update({
        where: { id: opportunityId },
        data: {
          title: dto.title,
          description: dto.description,
          type: dto.type,
          status: dto.status,
        },
      });

      return {
        ...opportunity,
        type: opportunity.type as any,
        status: opportunity.status as any,
        created_at: opportunity.created_at.toISOString(),
        updated_at: opportunity.updated_at.toISOString(),
      };
    } catch (error: any) {
      console.error("[OpportunityService.updateOpportunity] Error:", error);
      throw new Error(`Failed to update opportunity: ${error.message || error}`);
    }
  }

  /**
   * Lists opportunities with dynamic search filters using Prisma.
   */
  static async listOpportunities(filters: ListOpportunitiesFilters) {
    try {
      const whereClause: any = {};

      if (filters.status) {
        whereClause.status = filters.status;
      }

      if (filters.type) {
        whereClause.type = filters.type;
      }

      if (filters.industry) {
        whereClause.business = {
          industry: filters.industry,
        };
      }

      const opportunities = await prisma.opportunity.findMany({
        where: whereClause,
        include: {
          business: true,
        },
        orderBy: {
          created_at: "desc",
        },
        skip: filters.offset ?? 0,
        take: filters.limit ?? 20,
      });

      return opportunities.map((opp) => ({
        ...opp,
        type: opp.type as any,
        status: opp.status as any,
        created_at: opp.created_at.toISOString(),
        updated_at: opp.updated_at.toISOString(),
        business: opp.business
          ? {
              ...opp.business,
              status: opp.business.status as any,
              created_at: opp.business.created_at.toISOString(),
              updated_at: opp.business.updated_at.toISOString(),
            }
          : null,
      }));
    } catch (error: any) {
      console.error("[OpportunityService.listOpportunities] Error:", error);
      throw new Error(`Failed to list opportunities: ${error.message || error}`);
    }
  }

  /**
   * Retrieves a specific opportunity by its ID.
   */
  static async getOpportunityById(opportunityId: string) {
    try {
      const opp = await prisma.opportunity.findUnique({
        where: { id: opportunityId },
        include: {
          business: true,
        },
      });
      if (!opp) return null;

      return {
        ...opp,
        type: opp.type as any,
        status: opp.status as any,
        created_at: opp.created_at.toISOString(),
        updated_at: opp.updated_at.toISOString(),
        business: opp.business
          ? {
              ...opp.business,
              status: opp.business.status as any,
              created_at: opp.business.created_at.toISOString(),
              updated_at: opp.business.updated_at.toISOString(),
            }
          : null,
      };
    } catch (error: any) {
      console.error("[OpportunityService.getOpportunityById] Error:", error);
      throw new Error(`Failed to get opportunity: ${error.message || error}`);
    }
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
