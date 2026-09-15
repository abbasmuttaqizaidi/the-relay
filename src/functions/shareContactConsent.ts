import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { shareContactConsentSchema } from "../validators";

export const shareContactConsent = createServerFn({ method: "POST" })
  .inputValidator(shareContactConsentSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.shareContactConsent(data.interest_id, business.id, data.fields);
  });
