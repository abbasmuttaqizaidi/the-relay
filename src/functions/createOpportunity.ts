import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { OpportunityService } from "../services/opportunity.service";
import { createOpportunitySchema } from "../validators";

export const createOpportunity = createServerFn({ method: "POST" })
  .inputValidator(createOpportunitySchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: You must register a business profile first.");
    }

    // 3. ENFORCE USER STATE RULE: Only approved profiles can create opportunities
    if (business.status !== "approved") {
      throw new Error(
        `Forbidden: Your business profile is "${business.status}". ` +
          "Opportunity creation requires a hand-vetted 'approved' status.",
      );
    }

    // 4. Delegate to Service Layer
    return await OpportunityService.createOpportunity({
      business_id: business.id,
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      offer_text: data.offer_text,
      expires_at: data.expires_at,
      hide_company_name: data.hide_company_name,
    });
  });
export type CreateOpportunityFn = typeof createOpportunity;
