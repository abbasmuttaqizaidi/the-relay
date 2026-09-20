import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { InterestService } from "../services/interest.service";
import { uuidSchema } from "../validators";

export const withdrawInterest = createServerFn({ method: "POST" })
  .inputValidator(z.object({ interest_id: uuidSchema }))
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business profile
    const businessIds = await BusinessService.getUserBusinessIds(user.id);
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business && businessIds.length === 0) {
      throw new Error("You must register a business profile first.");
    }

    const allUserBizIds = business ? Array.from(new Set([...businessIds, business.id])) : businessIds;

    // 3. Fetch interest request to verify ownership
    const interest = await InterestService.getRequestById(data.interest_id);
    if (!interest) {
      throw new Error("Interest request not found.");
    }

    if (!allUserBizIds.includes(interest.requesting_business_id)) {
      throw new Error("Forbidden: You can only withdraw your own interest requests.");
    }

    // 4. Delegate to Service Layer
    return await InterestService.withdrawInterest(data.interest_id);
  });
export type WithdrawInterestFn = typeof withdrawInterest;
