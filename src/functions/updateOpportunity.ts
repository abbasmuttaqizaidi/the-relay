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

    // 4. Delegate to Service Layer
    return await OpportunityService.updateOpportunity(data.opportunity_id, {
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status,
    });
  });
export type UpdateOpportunityFn = typeof updateOpportunity;
