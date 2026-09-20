import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { InterestService } from "../services/interest.service";

export const getIncomingRequestsCount = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const user = await getAuthenticatedUser();
      const businessIds = await BusinessService.getUserBusinessIds(user.id);
      if (businessIds.length === 0) {
        const business = await BusinessService.getBusinessByOwner(user.id);
        if (!business) {
          return { count: 0 };
        }
        const count = await InterestService.countIncoming(business.id);
        return { count };
      }
      const count = await InterestService.countIncomingForBusinessIds(businessIds);
      return { count };
    } catch (err) {
      return { count: 0 };
    }
  });

export type GetIncomingRequestsCountFn = typeof getIncomingRequestsCount;
