import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { createBusinessSchema } from "../validators";

export const createBusiness = createServerFn({ method: "POST" })
  .inputValidator(createBusinessSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user and auto-create DB record if needed
    const user = await getAuthenticatedUser();

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
      description: data.description,
      linkedin_url: data.linkedin_url,
      logo_url: data.logo_url,
    });
  });
export type CreateBusinessFn = typeof createBusiness;
