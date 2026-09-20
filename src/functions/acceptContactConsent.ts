import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { acceptContactConsentSchema, respondContactExchangeSchema } from "../validators";

export const respondContactExchange = createServerFn({ method: "POST" })
  .inputValidator(respondContactExchangeSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.respondContactExchange(
      data.interest_id,
      business.id,
      data.field,
      data.action,
      data.value,
      data.custom_label
    );
  });

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
