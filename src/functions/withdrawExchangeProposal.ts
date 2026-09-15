import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { withdrawProposalSchema } from "../validators";

export const withdrawExchangeProposal = createServerFn({ method: "POST" })
  .inputValidator(withdrawProposalSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.withdrawProposal(data.proposal_id, business.id);
  });
