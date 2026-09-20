import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { declineContactConsentSchema } from "../validators";

export const declineContactConsent = createServerFn({ method: "POST" })
  .inputValidator(declineContactConsentSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.declineContactConsent(
      data.interest_id,
      business.id,
      data.fields
    );
  });
