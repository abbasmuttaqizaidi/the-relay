import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { confirmAgreementSchema } from "../validators";

export const confirmExchangeAgreement = createServerFn({ method: "POST" })
  .inputValidator(confirmAgreementSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.confirmAgreement(data.interest_id, data.proposal_id, business.id);
  });
