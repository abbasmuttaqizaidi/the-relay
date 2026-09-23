import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { z } from "zod";
import { serverCache } from "../lib/server-cache";
import { verifyAdminSession } from "../lib/admin-auth.server";

const deleteOpportunitySchema = z.object({
  opportunity_id: z.string().uuid(),
});

export const deleteOpportunityFromAdmin = createServerFn({ method: "POST" })
  .inputValidator(deleteOpportunitySchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can perform this action.");
    }

    const { opportunity_id } = data;

    // 2. Fetch the target opportunity
    const opp = await prisma.opportunity.findUnique({
      where: { id: opportunity_id },
      include: {
        business: true,
        interests: {
          select: { id: true },
        },
      },
    });

    if (!opp) {
      throw new Error("Opportunity not found or already deleted.");
    }

    const interestIds = opp.interests.map((i) => i.id);

    // 3. Perform atomic native transactional deletion of everything related
    await prisma.$transaction(async (tx) => {
      if (interestIds.length > 0) {
        // Delete all contact consents
        await tx.contactSharingConsent.deleteMany({
          where: { interest_id: { in: interestIds } },
        });

        // Delete all exchange agreements
        await tx.exchangeAgreement.deleteMany({
          where: {
            OR: [
              { interest_id: { in: interestIds } },
              { opportunity_id: opportunity_id },
            ],
          },
        });

        // Delete all exchange proposals
        await tx.exchangeProposal.deleteMany({
          where: {
            OR: [
              { interest_id: { in: interestIds } },
              { opportunity_id: opportunity_id },
            ],
          },
        });

        // Delete reliability events
        await tx.reliabilityEvent.deleteMany({
          where: { interest_id: { in: interestIds } },
        });

        // Delete all interests
        await tx.interest.deleteMany({
          where: { id: { in: interestIds } },
        });
      }

      // Delete all saved bookmarks for this opportunity
      await tx.savedOpportunity.deleteMany({
        where: { opportunity_id: opportunity_id },
      });

      // Delete custom contact details linked if any
      await tx.customContactDetail.deleteMany({
        where: { opportunity_id: opportunity_id },
      });

      // Delete the opportunity record itself
      await tx.opportunity.delete({
        where: { id: opportunity_id },
      });

      // Log activity
      await tx.activityLog.create({
        data: {
          action: "Admin Opportunity Deleted",
          details: `Opportunity ${opp.opportunity_number} ("${opp.title}") and all related dealflow records deleted by Admin.`,
        },
      });
    });

    // 4. Invalidate caches
    try {
      serverCache.clear();
    } catch (e) {
      console.warn("[deleteOpportunityFromAdmin] Cache clear error:", e);
    }

    return {
      success: true,
      message: `Opportunity ${opp.opportunity_number} and all associated ongoing records were permanently deleted.`,
    };
  });

export type DeleteOpportunityFromAdminFn = typeof deleteOpportunityFromAdmin;
