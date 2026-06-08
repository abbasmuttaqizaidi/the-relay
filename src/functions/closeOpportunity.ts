import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { OpportunityService } from "../services/opportunity.service";
import { z } from "zod";

export const closeOpportunity = createServerFn({ method: "POST" })
  .inputValidator(z.object({ opportunity_id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const opportunity = await OpportunityService.getOpportunityById(data.opportunity_id);
    if (!opportunity) {
      throw new Error("Not Found: Opportunity listing not found.");
    }
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business || opportunity.business_id !== business.id) {
      throw new Error("Unauthorized: You do not have permission to close this opportunity.");
    }
    return await OpportunityService.closeOpportunity(data.opportunity_id);
  });
export type CloseOpportunityFn = typeof closeOpportunity;
