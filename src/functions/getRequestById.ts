import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { InterestService } from "../services/interest.service";
import { uuidSchema } from "../validators";

export const getRequestById = createServerFn({ method: "GET" })
  .inputValidator(z.object({ interest_id: uuidSchema }))
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }

    const interest = await InterestService.getRequestById(data.interest_id);
    if (!interest) {
      throw new Error("Interest request not found.");
    }

    // A business can only view a request if they are either the sender or the opportunity owner
    if (
      interest.requesting_business_id !== business.id &&
      interest.opportunity.business_id !== business.id
    ) {
      throw new Error("Forbidden: You do not have permission to view this request.");
    }

    // Server-side authorization check:
    // Only reveal contact emails if the interest request has been accepted (Handshake Complete)
    if (interest.status !== "accepted") {
      interest.requesting_business.contact_email = null;
      if (interest.requesting_business.owner) {
        interest.requesting_business.owner.email = null;
      }
      interest.opportunity.business.contact_email = null;
      if (interest.opportunity.business.owner) {
        interest.opportunity.business.owner.email = null;
      }
    }

    return interest;
  });
export type GetRequestByIdFn = typeof getRequestById;
