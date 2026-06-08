import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { InterestService } from "../services/interest.service";

export const getIncomingRequests = createServerFn({ method: "GET" })
  .handler(async () => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      return [];
    }
    return await InterestService.getIncoming(business.id);
  });
export type GetIncomingRequestsFn = typeof getIncomingRequests;
