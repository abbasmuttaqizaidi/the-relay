import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { OpportunityService } from "../services/opportunity.service";
import { z } from "zod";

export const deleteOpportunity = createServerFn({ method: "POST" })
  .inputValidator(z.object({ opportunity_id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const opportunity = await OpportunityService.getOpportunityById(data.opportunity_id);
    if (!opportunity) {
      throw new Error("Not Found: Opportunity listing not found.");
    }
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business || opportunity.business_id !== business.id) {
      throw new Error("Unauthorized: You do not have permission to modify this opportunity.");
    }
    throw new Error("Constraint Restriction: Posted opportunities cannot be deleted permanently. You can only close them.");
  });
export type DeleteOpportunityFn = typeof deleteOpportunity;
