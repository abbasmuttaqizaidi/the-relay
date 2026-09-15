import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { acceptContactConsentSchema } from "../validators";

export const acceptContactConsent = createServerFn({ method: "POST" })
  .inputValidator(acceptContactConsentSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.acceptContactConsent(data.interest_id, business.id, data.fields);
  });
