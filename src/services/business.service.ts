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
            website: dto.website || "",
            industry: dto.industry,
            description: dto.description || null,
            linkedin_url: dto.linkedin_url || null,
            logo_url: dto.logo_url || null,
            hq_location: dto.hq_location || null,
            founded_year: dto.founded_year || null,
            company_size: dto.company_size || null,
            company_type: dto.company_type || null,
            funding_stage: dto.funding_stage || null,
            twitter_url: dto.twitter_url || null,
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
          phone_number: dto.phone_number,
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
   * Prioritizes valid non-test businesses with active listings/interests.
   */
  static async getBusinessByOwner(ownerUserId: string): Promise<Business | null> {
    const cacheKey = `business:owner:${ownerUserId}`;
    const cached = serverCache.get<Business>(cacheKey);
    if (cached) return cached;

    try {
      const businesses = await prisma.business.findMany({
        where: {
          OR: [
            { owner_user_id: ownerUserId },
            { members: { some: { user_id: ownerUserId } } },
          ],
        },
        include: {
          opportunities: {
            select: { id: true },
          },
          interests: {
            select: { id: true },
          },
        },
        orderBy: {
          created_at: "asc",
        },
      });

      if (!businesses || businesses.length === 0) return null;

      // Filter out test/audit temporary businesses if genuine businesses exist
      const validBusinesses = businesses.filter(
        (b) => !b.company_name.startsWith("__Audit") && !b.company_name.startsWith("__Test"),
      );
      const candidates = validBusinesses.length > 0 ? validBusinesses : businesses;

      // Prioritize business with existing opportunities/interests or approved status
      const activeBusiness =
        candidates.find(
          (b) =>
            (b.opportunities && b.opportunities.length > 0) ||
            (b.interests && b.interests.length > 0),
        ) ||
        candidates.find((b) => b.status === "approved") ||
        candidates[0];

      const result = BusinessService.mapBusinessModel(activeBusiness);
      serverCache.set(cacheKey, result, 300);
      return result;
    } catch (error: any) {
      console.error("[BusinessService.getBusinessByOwner] Error:", error);
      throw new Error(`Failed to fetch owner's business: ${error.message || error}`);
    }
  }

  /**
   * Retrieves all active business IDs associated with a user.
   */
  static async getUserBusinessIds(userId: string): Promise<string[]> {
    try {
      const businesses = await prisma.business.findMany({
        where: {
          OR: [
            { owner_user_id: userId },
            { members: { some: { user_id: userId } } },
          ],
        },
        select: {
          id: true,
          company_name: true,
        },
      });

      if (!businesses || businesses.length === 0) return [];

      const valid = businesses.filter(
        (b) => !b.company_name.startsWith("__Audit") && !b.company_name.startsWith("__Test"),
      );
      const target = valid.length > 0 ? valid : businesses;
      return target.map((b) => b.id);
    } catch (error) {
      console.error("[BusinessService.getUserBusinessIds] Error:", error);
      return [];
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
      phone_number: business.phone_number ?? null,
      status: business.status as any,
      website_verified: business.website_verified,
      website_verified_at: business.website_verified_at?.toISOString() ?? null,
      website_verified_domain: business.website_verified_domain ?? null,
      created_at: business.created_at.toISOString(),
      updated_at: business.updated_at.toISOString(),
      custom_contact_details: business.custom_contact_details
        ? business.custom_contact_details.map((c: any) => ({
            id: c.id,
            business_id: c.business_id,
            label: c.label,
            value: c.value,
            created_at: c.created_at.toISOString(),
            updated_at: c.updated_at.toISOString(),
          }))
        : undefined,
    };
  }

  /**
   * Adds a custom contact detail for a business.
   */
  static async createCustomContactDetail(businessId: string, label: string, value: string) {
    const created = await prisma.customContactDetail.create({
      data: {
        business_id: businessId,
        label: label.trim(),
        value: value.trim(),
      },
    });

    return {
      id: created.id,
      business_id: created.business_id,
      label: created.label,
      value: created.value,
      created_at: created.created_at.toISOString(),
      updated_at: created.updated_at.toISOString(),
    };
  }

  /**
   * Updates an existing custom contact detail.
   * If value is changed, resets any accepted consents back to requested to prevent leaking unconsented data.
   */
  static async updateCustomContactDetail(
    businessId: string,
    id: string,
    label: string,
    value: string
  ) {
    const existing = await prisma.customContactDetail.findUnique({
      where: { id },
    });

    if (!existing || existing.business_id !== businessId) {
      throw new Error("Custom contact detail not found or unauthorized.");
    }

    const valueChanged = existing.value !== value.trim();

    return await prisma.$transaction(async (tx) => {
      const updated = await tx.customContactDetail.update({
        where: { id },
        data: {
          label: label.trim(),
          value: value.trim(),
        },
      });

      // If value changed, reset active consents for this custom contact to 'requested'
      if (valueChanged) {
        await tx.contactSharingConsent.updateMany({
          where: {
            from_business_id: businessId,
            contact_field: `custom:${id}`,
          },
          data: {
            status: "requested",
            accepted_at: null,
          },
        });
      }

      return {
        id: updated.id,
        business_id: updated.business_id,
        label: updated.label,
        value: updated.value,
        created_at: updated.created_at.toISOString(),
        updated_at: updated.updated_at.toISOString(),
      };
    });
  }

  /**
   * Deletes a custom contact detail and removes any active/pending consents referencing it.
   */
  static async deleteCustomContactDetail(businessId: string, id: string) {
    const existing = await prisma.customContactDetail.findUnique({
      where: { id },
    });

    if (!existing || existing.business_id !== businessId) {
      throw new Error("Custom contact detail not found or unauthorized.");
    }

    return await prisma.$transaction(async (tx) => {
      // Remove consents referencing this field
      await tx.contactSharingConsent.deleteMany({
        where: {
          from_business_id: businessId,
          contact_field: `custom:${id}`,
        },
      });

      await tx.customContactDetail.delete({
        where: { id },
      });

      return { success: true, id };
    });
  }

  /**
   * Fetches all custom contact details for a business.
   */
  static async getCustomContactDetails(businessId: string) {
    if (!prisma.customContactDetail) {
      return [];
    }
    const details = await prisma.customContactDetail.findMany({
      where: { business_id: businessId },
      orderBy: { created_at: "asc" },
    });

    return details.map((d) => ({
      id: d.id,
      business_id: d.business_id,
      label: d.label,
      value: d.value,
      created_at: d.created_at.toISOString(),
      updated_at: d.updated_at.toISOString(),
    }));
  }

  /**
   * Returns total count of registered businesses in the database added to the base count of 745.
   */
  static async getVerifiedBusinessCount(baseCount: number = 745): Promise<number> {
    try {
      const count = await prisma.business.count();
      return baseCount + count;
    } catch (err) {
      console.error("[BusinessService.getVerifiedBusinessCount] Error:", err);
      return baseCount;
    }
  }
}
