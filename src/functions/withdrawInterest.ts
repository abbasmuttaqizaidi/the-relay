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
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }

    // 3. Fetch interest request to verify ownership
    const interest = await InterestService.getRequestById(data.interest_id);
    if (!interest) {
      throw new Error("Interest request not found.");
    }

    if (interest.requesting_business_id !== business.id) {
      throw new Error("Forbidden: You can only withdraw your own interest requests.");
    }

    // 4. Delegate to Service Layer
    return await InterestService.withdrawInterest(data.interest_id);
  });
export type WithdrawInterestFn = typeof withdrawInterest;
