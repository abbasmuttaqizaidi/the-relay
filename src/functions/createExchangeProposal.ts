import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { createProposalSchema } from "../validators";

export const createExchangeProposal = createServerFn({ method: "POST" })
  .inputValidator(createProposalSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.createProposal({
      interest_id: data.interest_id,
      proposing_business_id: business.id,
      exchange_type: data.exchange_type,
      exchange_details: data.exchange_details,
      revenue_percentage: data.revenue_percentage,
      fixed_amount: data.fixed_amount,
      currency: data.currency,
      additional_terms: data.additional_terms,
    });
  });
