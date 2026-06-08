import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { OpportunityService } from "../services/opportunity.service";
import { updateOpportunitySchema } from "../validators";

export const updateOpportunity = createServerFn({ method: "POST" })
  .inputValidator(updateOpportunitySchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch opportunity to find associated business
    const opportunity = await OpportunityService.getOpportunityById(data.opportunity_id);
    if (!opportunity) {
      throw new Error("Not Found: Opportunity listing not found.");
    }

    // 3. Verify that current user owns the business associated with this opportunity
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business || opportunity.business_id !== business.id) {
      throw new Error("Unauthorized: You do not have permission to modify this opportunity.");
    }

    const finalPromote = data.promote !== undefined ? data.promote : (opportunity.promotion_status !== "none");
    const finalHide = data.hide_company_name !== undefined && data.hide_company_name !== null 
      ? data.hide_company_name 
      : opportunity.hide_company_name;

    if (finalPromote && finalHide) {
      throw new Error("Bad Request: Promoted opportunities cannot be confidential. Please disable 'Hide company name' or promotion.");
    }

    // 4. Delegate to Service Layer
    return await OpportunityService.updateOpportunity(data.opportunity_id, {
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      offer_text: data.offer_text,
      expires_at: data.expires_at,
      status: data.status,
      hide_company_name: data.hide_company_name !== null ? data.hide_company_name : undefined,
      promotion_status: data.promote !== undefined
        ? (data.promote ? "pending_promotion" : "none")
        : undefined,
    });
  });
export type UpdateOpportunityFn = typeof updateOpportunity;
