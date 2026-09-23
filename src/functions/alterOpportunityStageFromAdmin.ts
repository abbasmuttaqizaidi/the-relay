import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { z } from "zod";
import { serverCache } from "../lib/server-cache";
import { verifyAdminSession } from "../lib/admin-auth.server";

const alterOpportunityStageSchema = z.object({
  interest_id: z.string().uuid(),
  target_stage: z.number().int().min(1).max(4),
});

export const alterOpportunityStageFromAdmin = createServerFn({ method: "POST" })
  .inputValidator(alterOpportunityStageSchema)
  .handler(async ({ data }) => {
    // 1. Authenticate caller using secure HMAC session token
    const headers = getRequestHeaders();
    const cookieHeader = headers.get("cookie") || "";

    if (!verifyAdminSession(cookieHeader)) {
      throw new Error("Forbidden: Only the super admin can perform this action.");
    }

    const { interest_id, target_stage } = data;

    // 2. Fetch interest with opportunity and participating businesses
    const interest = await prisma.interest.findUnique({
      where: { id: interest_id },
      include: {
        opportunity: {
          include: {
            business: true,
          },
        },
        requesting_business: true,
        exchange_proposals: {
          orderBy: { version: "desc" },
        },
        exchange_agreement: true,
        contact_consents: true,
      },
    });

    if (!interest) {
      throw new Error("Interest/Deal record not found.");
    }

    const now = new Date();
    const ownerBusinessId = interest.opportunity.business_id;
    const requesterBusinessId = interest.requesting_business_id;

    // 3. Execute atomic stage alteration and clean stage data wiping
    await prisma.$transaction(async (tx) => {
      switch (target_stage) {
        case 1: {
          // STAGE 1: Acknowledgement
          // Reset interest status to pending
          await tx.interest.update({
            where: { id: interest_id },
            data: {
              status: "pending",
              owner_acknowledged_at: null,
              requester_acknowledged_at: null,
            },
          });

          // WIPE: Delete all proposals
          await tx.exchangeProposal.deleteMany({
            where: { interest_id: interest_id },
          });

          // WIPE: Delete agreement
          await tx.exchangeAgreement.deleteMany({
            where: { interest_id: interest_id },
          });

          // WIPE: Delete contact consents
          await tx.contactSharingConsent.deleteMany({
            where: { interest_id: interest_id },
          });

          break;
        }

        case 2: {
          // STAGE 2: Negotiation
          // Set interest status to accepted and mark acknowledged
          await tx.interest.update({
            where: { id: interest_id },
            data: {
              status: "accepted",
              owner_acknowledged_at: now,
              requester_acknowledged_at: now,
            },
          });

          // WIPE forward stage data: Delete agreement & consents
          await tx.exchangeAgreement.deleteMany({
            where: { interest_id: interest_id },
          });
          await tx.contactSharingConsent.deleteMany({
            where: { interest_id: interest_id },
          });

          // Ensure at least one active proposal exists for negotiation
          const existingProposal = await tx.exchangeProposal.findFirst({
            where: { interest_id: interest_id },
          });

          if (!existingProposal) {
            await tx.exchangeProposal.create({
              data: {
                interest_id: interest_id,
                opportunity_id: interest.opportunity_id,
                proposing_business_id: requesterBusinessId,
                receiving_business_id: ownerBusinessId,
                exchange_type: interest.opportunity.category || "General Collaboration",
                exchange_details: interest.message || "Initial negotiation terms under bilateral NCND.",
                status: "pending_response",
                version: 1,
              },
            });
          } else {
            // Reset existing latest proposal to pending_response if needed
            await tx.exchangeProposal.update({
              where: { id: existingProposal.id },
              data: { status: "pending_response" },
            });
          }

          break;
        }

        case 3: {
          // STAGE 3: Agreement / Escrow Signing
          // Set interest status to accepted and mark acknowledged
          await tx.interest.update({
            where: { id: interest_id },
            data: {
              status: "accepted",
              owner_acknowledged_at: now,
              requester_acknowledged_at: now,
            },
          });

          // WIPE forward stage data: Delete contact consents (lock contact information)
          await tx.contactSharingConsent.deleteMany({
            where: { interest_id: interest_id },
          });

          // Ensure proposals exist
          let latestProposal = await tx.exchangeProposal.findFirst({
            where: { interest_id: interest_id },
            orderBy: { version: "desc" },
          });

          if (!latestProposal) {
            latestProposal = await tx.exchangeProposal.create({
              data: {
                interest_id: interest_id,
                opportunity_id: interest.opportunity_id,
                proposing_business_id: requesterBusinessId,
                receiving_business_id: ownerBusinessId,
                exchange_type: interest.opportunity.category || "General Collaboration",
                exchange_details: interest.message || "Bilateral covenants drafted for dual sovereign execution.",
                status: "accepted",
                version: 1,
              },
            });
          }

          // Create or reset agreement to draft (pending dual signatures)
          const existingAgreement = await tx.exchangeAgreement.findUnique({
            where: { interest_id: interest_id },
          });

          if (existingAgreement) {
            await tx.exchangeAgreement.update({
              where: { id: existingAgreement.id },
              data: {
                status: "draft",
                owner_confirmed_at: null,
                requester_confirmed_at: null,
                agreed_at: null,
              },
            });
          } else {
            await tx.exchangeAgreement.create({
              data: {
                interest_id: interest_id,
                opportunity_id: interest.opportunity_id,
                final_proposal_id: latestProposal.id,
                owner_business_id: ownerBusinessId,
                interested_business_id: requesterBusinessId,
                exchange_type: latestProposal.exchange_type,
                exchange_details: latestProposal.exchange_details,
                revenue_percentage: latestProposal.revenue_percentage,
                fixed_amount: latestProposal.fixed_amount,
                currency: latestProposal.currency,
                additional_terms: latestProposal.additional_terms,
                status: "draft",
                owner_confirmed_at: null,
                requester_confirmed_at: null,
                agreed_at: null,
              },
            });
          }

          break;
        }

        case 4: {
          // STAGE 4: Handshake Complete / Unblinded Dealroom
          // Set interest status to accepted and mark acknowledged
          await tx.interest.update({
            where: { id: interest_id },
            data: {
              status: "accepted",
              owner_acknowledged_at: now,
              requester_acknowledged_at: now,
            },
          });

          // Ensure proposals exist
          let latestProposal = await tx.exchangeProposal.findFirst({
            where: { interest_id: interest_id },
            orderBy: { version: "desc" },
          });

          if (!latestProposal) {
            latestProposal = await tx.exchangeProposal.create({
              data: {
                interest_id: interest_id,
                opportunity_id: interest.opportunity_id,
                proposing_business_id: requesterBusinessId,
                receiving_business_id: ownerBusinessId,
                exchange_type: interest.opportunity.category || "General Collaboration",
                exchange_details: interest.message || "Bilateral covenants fully ratified.",
                status: "accepted",
                version: 1,
              },
            });
          }

          // Ensure agreement is fully ratified
          const existingAgreement = await tx.exchangeAgreement.findUnique({
            where: { interest_id: interest_id },
          });

          if (existingAgreement) {
            await tx.exchangeAgreement.update({
              where: { id: existingAgreement.id },
              data: {
                status: "agreed",
                owner_confirmed_at: now,
                requester_confirmed_at: now,
                agreed_at: now,
              },
            });
          } else {
            await tx.exchangeAgreement.create({
              data: {
                interest_id: interest_id,
                opportunity_id: interest.opportunity_id,
                final_proposal_id: latestProposal.id,
                owner_business_id: ownerBusinessId,
                interested_business_id: requesterBusinessId,
                exchange_type: latestProposal.exchange_type,
                exchange_details: latestProposal.exchange_details,
                revenue_percentage: latestProposal.revenue_percentage,
                fixed_amount: latestProposal.fixed_amount,
                currency: latestProposal.currency,
                additional_terms: latestProposal.additional_terms,
                status: "agreed",
                owner_confirmed_at: now,
                requester_confirmed_at: now,
                agreed_at: now,
              },
            });
          }

          // Unlock bilateral contact sharing consents
          // 1. From Owner to Requester
          await tx.contactSharingConsent.upsert({
            where: {
              interest_id_from_business_id_contact_field: {
                interest_id: interest_id,
                from_business_id: ownerBusinessId,
                contact_field: "all",
              },
            },
            create: {
              interest_id: interest_id,
              from_business_id: ownerBusinessId,
              to_business_id: requesterBusinessId,
              contact_field: "all",
              status: "accepted",
              accepted_at: now,
            },
            update: {
              status: "accepted",
              accepted_at: now,
            },
          });

          // 2. From Requester to Owner
          await tx.contactSharingConsent.upsert({
            where: {
              interest_id_from_business_id_contact_field: {
                interest_id: interest_id,
                from_business_id: requesterBusinessId,
                contact_field: "all",
              },
            },
            create: {
              interest_id: interest_id,
              from_business_id: requesterBusinessId,
              to_business_id: ownerBusinessId,
              contact_field: "all",
              status: "accepted",
              accepted_at: now,
            },
            update: {
              status: "accepted",
              accepted_at: now,
            },
          });

          break;
        }
      }

      // Log admin stage transition
      await tx.activityLog.create({
        data: {
          action: "Admin Altered Deal Stage",
          details: `Admin changed deal (${interest_id}) on Opportunity ${interest.opportunity.opportunity_number} to Stage ${target_stage}.`,
        },
      });
    });

    // 4. Invalidate cache
    try {
      serverCache.clear();
    } catch (e) {
      console.warn("[alterOpportunityStageFromAdmin] Cache clear error:", e);
    }

    const stageNames: Record<number, string> = {
      1: "Stage 1: Acknowledgement",
      2: "Stage 2: Negotiation",
      3: "Stage 3: Agreement",
      4: "Stage 4: Handshake",
    };

    return {
      success: true,
      stage: target_stage,
      message: `Deal stage successfully changed to ${stageNames[target_stage]}. Higher stage data was cleanly wiped.`,
    };
  });

export type AlterOpportunityStageFromAdminFn = typeof alterOpportunityStageFromAdmin;
