import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { OpportunityService } from "../services/opportunity.service";

export const getMyOpportunities = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const user = await getAuthenticatedUser();
      let businessIds = await BusinessService.getUserBusinessIds(user.id);
      if (businessIds.length === 0) {
        const business = await BusinessService.getBusinessByOwner(user.id);
        if (business) {
          businessIds = [business.id];
        }
      }
      if (businessIds.length === 0) return [];
      return await OpportunityService.getByBusinessIds(businessIds);
    } catch (err) {
      console.error("[getMyOpportunities] Error fetching my opportunities:", err);
      return [];
    }
  });
export type GetMyOpportunitiesFn = typeof getMyOpportunities;
