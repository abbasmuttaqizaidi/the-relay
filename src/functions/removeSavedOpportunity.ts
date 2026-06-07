import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { OpportunityService } from "../services/opportunity.service";
import { removeSavedOpportunitySchema } from "../validators";

export const removeSavedOpportunity = createServerFn({ method: "POST" })
  .inputValidator(removeSavedOpportunitySchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Delegate to Service Layer
    await OpportunityService.removeSavedOpportunity(user.id, data.opportunity_id);

    return { success: true, opportunity_id: data.opportunity_id };
  });
export type RemoveSavedOpportunityFn = typeof removeSavedOpportunity;
