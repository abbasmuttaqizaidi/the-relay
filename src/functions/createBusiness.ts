import { createServerFn } from "@tanstack/react-start";
import { resolveOrCreateUserDuringOnboarding } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { createBusinessSchema } from "../validators";

export const createBusiness = createServerFn({ method: "POST" })
  .inputValidator(createBusinessSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user and initialize DB record if needed
    const user = await resolveOrCreateUserDuringOnboarding();

    // 2. Check if user already owns a business profile
    const existingBusiness = await BusinessService.getBusinessByOwner(user.id);
    if (existingBusiness) {
      throw new Error("Conflict: You already own a registered business profile.");
    }

    // 3. Delegate to Service Layer
    return await BusinessService.createBusiness({
      owner_user_id: user.id,
      company_name: data.company_name,
      website: data.website,
      industry: data.industry,
      description: data.description || undefined,
      linkedin_url: data.linkedin_url || undefined,
      logo_url: data.logo_url || undefined,
      hq_location: data.hq_location || undefined,
      founded_year: data.founded_year || undefined,
      company_size: data.company_size || undefined,
      company_type: data.company_type || undefined,
      funding_stage: data.funding_stage || undefined,
      twitter_url: data.twitter_url || undefined,
    });
  });
export type CreateBusinessFn = typeof createBusiness;
