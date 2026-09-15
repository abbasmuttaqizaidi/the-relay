import { createServerFn } from "@tanstack/react-start";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { ExchangeService } from "../services/exchange.service";
import { respondProposalSchema } from "../validators";

export const respondExchangeProposal = createServerFn({ method: "POST" })
  .inputValidator(respondProposalSchema)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();
    const business = await BusinessService.getBusinessByOwner(user.id);
    if (!business) {
      throw new Error("You must register a business profile first.");
    }
    return await ExchangeService.respondProposal(
      data.proposal_id,
      business.id,
      data.action,
      data.decline_reason,
      data.decline_note
    );
  });
