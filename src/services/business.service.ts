import { prisma } from "../db/prisma.server";
import { Business, CreateBusinessDTO, UpdateBusinessDTO } from "../types";
import { EmailService } from "./email.service";
import { serverCache } from "../lib/server-cache";
import { NotificationService } from "./notification.service";

export class BusinessService {
  /**
   * Creates a new business profile and automatically adds the creator as the "owner" member via Prisma transaction.
   */
  static async createBusiness(dto: CreateBusinessDTO): Promise<Business> {
    try {
      const business = await prisma.$transaction(async (tx) => {
        // 1. Create the business record
        const biz = await tx.business.create({
          data: {
            owner_user_id: dto.owner_user_id,
            company_name: dto.company_name,
            website: dto.website,
            industry: dto.industry,
            description: dto.description || null,
            linkedin_url: dto.linkedin_url || null,
            logo_url: dto.logo_url || null,
            status: "pending",
          },
        });

        // 2. Add owner membership
        await tx.businessMember.create({
          data: {
            business_id: biz.id,
            user_id: dto.owner_user_id,
            role: "owner",
          },
        });

        return biz;
      });

      const result = BusinessService.mapBusinessModel(business);
      // Cache the newly created business
      serverCache.set(`business:id:${result.id}`, result, 300);
      serverCache.set(`business:owner:${result.owner_user_id}`, result, 300);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.createBusiness] Error:", error);
      throw new Error(`Failed to create business: ${error.message || error}`);
    }
  }

  /**
   * Updates an existing business profile.
   */
  static async updateBusiness(businessId: string, dto: UpdateBusinessDTO): Promise<Business> {
    try {
      const business = await prisma.business.update({
        where: { id: businessId },
        data: {
          company_name: dto.company_name,
          website: dto.website,
          industry: dto.industry,
          description: dto.description,
          linkedin_url: dto.linkedin_url,
          logo_url: dto.logo_url,
          hq_location: dto.hq_location,
          founded_year: dto.founded_year,
          company_size: dto.company_size,
          company_type: dto.company_type,
          funding_stage: dto.funding_stage,
          twitter_url: dto.twitter_url,
          contact_email: dto.contact_email,
        },
      });

      const result = BusinessService.mapBusinessModel(business);
      // Invalidate and write new cache
      BusinessService.invalidateBusinessCache(result.id, result.owner_user_id);
      serverCache.set(`business:id:${result.id}`, result, 300);
      serverCache.set(`business:owner:${result.owner_user_id}`, result, 300);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.updateBusiness] Error:", error);
      throw new Error(`Failed to update business: ${error.message || error}`);
    }
  }

  /**
   * Retrieves a business profile by ID.
   */
  static async getBusinessById(businessId: string): Promise<Business | null> {
    const cacheKey = `business:id:${businessId}`;
    const cached = serverCache.get<Business>(cacheKey);
    if (cached) return cached;

    try {
      const business = await prisma.business.findUnique({
        where: { id: businessId },
      });
      if (!business) return null;

      const result = BusinessService.mapBusinessModel(business);
      serverCache.set(cacheKey, result, 300);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.getBusinessById] Error:", error);
      throw new Error(`Failed to fetch business: ${error.message || error}`);
    }
  }

  /**
   * Retrieves a business profile by Owner User ID.
   */
  static async getBusinessByOwner(ownerUserId: string): Promise<Business | null> {
    const cacheKey = `business:owner:${ownerUserId}`;
    const cached = serverCache.get<Business>(cacheKey);
    if (cached) return cached;

    try {
      const business = await prisma.business.findFirst({
        where: { owner_user_id: ownerUserId },
      });
      if (!business) return null;

      const result = BusinessService.mapBusinessModel(business);
      serverCache.set(cacheKey, result, 300);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.getBusinessByOwner] Error:", error);
      throw new Error(`Failed to fetch owner's business: ${error.message || error}`);
    }
  }

  /**
   * Marks a business's website as verified in the database.
   */
  static async markWebsiteVerified(
    businessId: string,
    verifiedDomain: string,
  ): Promise<Business> {
    try {
      const business = await prisma.business.update({
        where: { id: businessId },
        data: {
          website_verified: true,
          website_verified_at: new Date(),
          website_verified_domain: verifiedDomain,
        },
      });

      const result = BusinessService.mapBusinessModel(business);
      BusinessService.invalidateBusinessCache(result.id, result.owner_user_id);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.markWebsiteVerified] Error:", error);
      throw new Error(`Failed to save website verification: ${error.message || error}`);
    }
  }

  /**
   * Approves a business profile and triggers verification emails.
   */
  static async approveBusiness(businessId: string, ownerEmail?: string): Promise<Business> {
    try {
      const business = await prisma.business.update({
        where: { id: businessId },
        data: { status: "approved" },
      });

      if (ownerEmail) {
        await EmailService.sendBusinessApproved(ownerEmail, business.company_name);
      }

      try {
        await NotificationService.createNotification({
          user_id: business.owner_user_id,
          title: "Business Profile Approved",
          description: `Congratulations! Your business profile "${business.company_name}" has been approved. You now have full access to participate, express interest, and post opportunities.`,
        });
      } catch (notifErr) {
        console.error("[BusinessService.approveBusiness] Failed to create approval notification:", notifErr);
      }

      const result = BusinessService.mapBusinessModel(business);
      BusinessService.invalidateBusinessCache(result.id, result.owner_user_id);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.approveBusiness] Error:", error);
      throw new Error(`Failed to approve business: ${error.message || error}`);
    }
  }

  /**
   * Rejects a business profile and triggers verification emails.
   */
  static async rejectBusiness(
    businessId: string,
    reason?: string,
    ownerEmail?: string,
  ): Promise<Business> {
    try {
      const business = await prisma.business.update({
        where: { id: businessId },
        data: { status: "rejected" },
      });

      if (ownerEmail) {
        await EmailService.sendBusinessRejected(ownerEmail, business.company_name, reason);
      }

      const result = BusinessService.mapBusinessModel(business);
      BusinessService.invalidateBusinessCache(result.id, result.owner_user_id);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.rejectBusiness] Error:", error);
      throw new Error(`Failed to reject business: ${error.message || error}`);
    }
  }

  /**
   * Sets a business profile status back to pending.
   */
  static async setBusinessStatusToPending(businessId: string): Promise<Business> {
    try {
      const business = await prisma.business.update({
        where: { id: businessId },
        data: { status: "pending" },
      });

      const result = BusinessService.mapBusinessModel(business);
      BusinessService.invalidateBusinessCache(result.id, result.owner_user_id);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.setBusinessStatusToPending] Error:", error);
      throw new Error(`Failed to set business status to pending: ${error.message || error}`);
    }
  }

  /**
   * Lists verified network businesses with active opportunity counts and search/filter support.
   */
  static async listNetworkBusinesses(filter: {
    q?: string;
    industry?: string;
    stage?: string;
    size?: string;
    status?: string;
  } = {}): Promise<any[]> {
    try {
      const where: any = {
        status: filter.status && filter.status !== "All" ? filter.status : { in: ["approved", "applied"] },
      };

      if (filter.industry && filter.industry !== "All") {
        where.industry = filter.industry;
      }

      if (filter.stage && filter.stage !== "All") {
        where.funding_stage = filter.stage;
      }

      if (filter.size && filter.size !== "All") {
        where.company_size = filter.size;
      }

      if (filter.q && filter.q.trim()) {
        const term = filter.q.trim();
        where.OR = [
          { company_name: { contains: term, mode: "insensitive" } },
          { description: { contains: term, mode: "insensitive" } },
          { website: { contains: term, mode: "insensitive" } },
          { industry: { contains: term, mode: "insensitive" } },
          { hq_location: { contains: term, mode: "insensitive" } },
        ];
      }

      const businesses = await prisma.business.findMany({
        where,
        include: {
          opportunities: {
            where: { status: "active" },
            select: {
              id: true,
              opportunity_number: true,
              title: true,
              category: true,
              industry: true,
              created_at: true,
            },
          },
        },
        orderBy: [
          { created_at: "desc" },
        ],
      });

      return businesses.map((b) => ({
        ...BusinessService.mapBusinessModel(b),
        active_opportunities: b.opportunities.map((o) => ({
          id: o.id,
          opportunity_number: o.opportunity_number,
          title: o.title,
          category: o.category,
          industry: o.industry,
          created_at: o.created_at.toISOString(),
        })),
        active_opportunities_count: b.opportunities.length,
      }));
    } catch (error: any) {
      console.error("[BusinessService.listNetworkBusinesses] Error:", error);
      throw new Error(`Failed to list network businesses: ${error.message || error}`);
    }
  }

  private static invalidateBusinessCache(businessId: string, ownerUserId: string) {
    serverCache.delete(`business:id:${businessId}`);
    serverCache.delete(`business:owner:${ownerUserId}`);
  }

  private static mapBusinessModel(business: any): Business {
    return {
      id: business.id,
      owner_user_id: business.owner_user_id,
      company_name: business.company_name,
      website: business.website,
      industry: business.industry,
      description: business.description,
      linkedin_url: business.linkedin_url,
      logo_url: business.logo_url,
      hq_location: business.hq_location,
      founded_year: business.founded_year,
      company_size: business.company_size,
      company_type: business.company_type,
      funding_stage: business.funding_stage,
      twitter_url: business.twitter_url,
      contact_email: business.contact_email,
      status: business.status as any,
      website_verified: business.website_verified,
      website_verified_at: business.website_verified_at?.toISOString() ?? null,
      website_verified_domain: business.website_verified_domain ?? null,
      created_at: business.created_at.toISOString(),
      updated_at: business.updated_at.toISOString(),
    };
  }
}
