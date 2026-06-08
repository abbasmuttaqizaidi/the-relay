import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { SavedOpportunityService } from "../services/saved-opportunity.service";

export const getSavedOpportunities = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      // 1. Authenticate user
      const user = await getAuthenticatedUser();

      // 2. Delegate to Service Layer
      return await SavedOpportunityService.listByUser(user.id);
    } catch (err) {
      console.error("[getSavedOpportunities] Error fetching saved opportunities:", err);
      return [];
    }
  });
export type GetSavedOpportunitiesFn = typeof getSavedOpportunities;
