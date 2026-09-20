import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { updateBusinessSchema } from "../validators";

export const updateBusiness = createServerFn({ method: "POST" })
  .inputValidator(updateBusinessSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch business to verify ownership
    const business = await BusinessService.getBusinessById(data.business_id);
    if (!business) {
      throw new Error("Not Found: Business profile not found.");
    }

    // Check if the current user is the owner or member
    const userBizIds = await BusinessService.getUserBusinessIds(user.id);
    if (business.owner_user_id !== user.id && !userBizIds.includes(business.id)) {
      throw new Error("Unauthorized: You do not own this business profile.");
    }

    // 3. Delegate to Service Layer
    return await BusinessService.updateBusiness(data.business_id, {
      company_name: data.company_name,
      website: data.website,
      industry: data.industry,
      description: data.description,
      linkedin_url: data.linkedin_url,
      logo_url: data.logo_url,
      hq_location: data.hq_location ?? undefined,
      founded_year: data.founded_year ?? undefined,
      company_size: data.company_size ?? undefined,
      company_type: data.company_type ?? undefined,
      funding_stage: data.funding_stage ?? undefined,
      twitter_url: data.twitter_url ?? undefined,
      contact_email: data.contact_email ?? undefined,
      phone_number: data.phone_number ?? undefined,
    });
  });
export type UpdateBusinessFn = typeof updateBusiness;
