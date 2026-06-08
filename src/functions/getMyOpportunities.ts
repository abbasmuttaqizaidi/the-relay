import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { OpportunityService } from "../services/opportunity.service";

export const getMyOpportunities = createServerFn({ method: "GET" })
  .handler(async () => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      return [];
    }
    return await OpportunityService.getByBusiness(business.id);
  });
export type GetMyOpportunitiesFn = typeof getMyOpportunities;
