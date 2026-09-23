import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { z } from "zod";
import { serverCache } from "../lib/server-cache";
import { verifyAdminSession } from "../lib/admin-auth.server";

const removeProposalSchema = z.object({
  interest_id: z.string().uuid(),
});

export const removeProposalFromAdmin = createServerFn({ method: "POST" })
  .inputValidator(removeProposalSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can perform this action.");
    }

    const { interest_id } = data;

    // 2. Fetch interest with opportunity details
    const interest = await prisma.interest.findUnique({
      where: { id: interest_id },
      include: {
        opportunity: true,
        requesting_business: true,
      },
    });

    if (!interest) {
      throw new Error("Proposal/Interest record not found or already removed.");
    }

    // 3. Atomically remove proposal and all linked stage data
    await prisma.$transaction(async (tx) => {
      // Delete contact consents
      await tx.contactSharingConsent.deleteMany({
        where: { interest_id: interest_id },
      });

      // Delete exchange agreements
      await tx.exchangeAgreement.deleteMany({
        where: { interest_id: interest_id },
      });

      // Delete exchange proposals
      await tx.exchangeProposal.deleteMany({
        where: { interest_id: interest_id },
      });

      // Delete reliability events
      await tx.reliabilityEvent.deleteMany({
        where: { interest_id: interest_id },
      });

      // Delete interest itself
      await tx.interest.delete({
        where: { id: interest_id },
      });

      // Log activity
      await tx.activityLog.create({
        data: {
          action: "Admin Proposal Removed",
          details: `Admin removed proposal (${interest_id}) from ${interest.requesting_business.company_name} on Opportunity ${interest.opportunity.opportunity_number}.`,
        },
      });
    });

    // 4. Invalidate cache
    try {
      serverCache.clear();
    } catch (e) {
      console.warn("[removeProposalFromAdmin] Cache clear error:", e);
    }

    return {
      success: true,
      message: `Proposal from "${interest.requesting_business.company_name}" and its associated workflow stages were completely removed.`,
    };
  });

export type RemoveProposalFromAdminFn = typeof removeProposalFromAdmin;
