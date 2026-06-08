import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { InterestService } from "../services/interest.service";
import { expressInterestSchema } from "../validators";

export const expressInterest = createServerFn({ method: "POST" })
  .inputValidator(expressInterestSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate user
    const user = await getAuthenticatedUser();

    // 2. Fetch user's business profile
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("Precondition Failed: You must register a business profile first.");
    }

    // 3. ENFORCE USER STATE RULE: Only approved profiles can express interest
    if (business.status !== "approved") {
      throw new Error(
        `Forbidden: Your business status is "${business.status}". ` +
          "Expressing interest on listings is locked until your profile is approved.",
      );
    }

    // 4. Delegate to Service Layer
    return await InterestService.expressInterest({
      opportunity_id: data.opportunity_id,
      business_id: business.id,
      message: data.message,
    });
  });
export type ExpressInterestFn = typeof expressInterest;
