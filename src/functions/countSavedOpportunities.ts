import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { SavedOpportunityService } from "../services/saved-opportunity.service";

export const countSavedOpportunities = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      // 1. Authenticate user
      const user = await getAuthenticatedUser();

      // 2. Delegate to Service Layer
      return await SavedOpportunityService.countSaved(user.id);
    } catch (err) {
      console.error("[countSavedOpportunities] Error:", err);
      return 0;
    }
  });
export type CountSavedOpportunitiesFn = typeof countSavedOpportunities;
