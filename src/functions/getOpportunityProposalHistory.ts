import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuthenticatedUser } from "../lib/auth.server";
import { BusinessService } from "../services/business.service";
import { InterestService } from "../services/interest.service";
import { prisma } from "../db/prisma.server";

export const getOpportunityProposalHistory = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      opportunity_id: z.string().min(1),
    })
  )
  .handler(async ({ data }) => {
    try {
      const user = await getAuthenticatedUser();
      const opportunity = await prisma.opportunity.findUnique({
        where: { id: data.opportunity_id },
        include: { business: true },
      });

      if (!opportunity) {
        return [];
      }

      // Authorization check: Verify user owns or is a member of the business that posted this opportunity
      const businessIds = await BusinessService.getUserBusinessIds(user.id);
      const isOwner =
        businessIds.includes(opportunity.business_id) ||
        opportunity.business.owner_user_id === user.id;

      if (!isOwner) {
        return [];
      }

      return await InterestService.getOpportunityProposalHistory(data.opportunity_id);
    } catch (err: any) {
      console.warn("[getOpportunityProposalHistory] Unauthenticated or error:", err.message);
      return [];
    }
  });

export type GetOpportunityProposalHistoryFn = typeof getOpportunityProposalHistory;
