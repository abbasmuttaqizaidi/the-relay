import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { SavedOpportunityService } from "../services/saved-opportunity.service";
import { removeSavedOpportunitySchema } from "../validators";

export const removeSavedOpportunity = createServerFn({ method: "POST" })
  .inputValidator(removeSavedOpportunitySchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Delegate to Service Layer
    return await SavedOpportunityService.remove(user.id, data.opportunity_id);
  });
export type RemoveSavedOpportunityFn = typeof removeSavedOpportunity;
