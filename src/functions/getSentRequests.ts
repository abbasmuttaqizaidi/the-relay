import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { InterestService } from "../services/interest.service";

export const getSentRequests = createServerFn({ method: "GET" })
  .handler(async () => {
    const user = await getAuthenticatedUser();
    const businessIds = await BusinessService.getUserBusinessIds(user.id);
    if (businessIds.length === 0) {
      const business = await BusinessService.getBusinessByOwner(user.id);
      if (!business) return [];
      return await InterestService.getSent(business.id);
    }
    return await InterestService.getSentForBusinessIds(businessIds);
  });
export type GetSentRequestsFn = typeof getSentRequests;
