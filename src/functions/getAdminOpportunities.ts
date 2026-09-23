import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { prisma } from "../db/prisma.server";
import { verifyAdminSession } from "../lib/admin-auth.server";

export const getAdminOpportunities = createServerFn({ method: "GET" }).handler(async () => {
  // 1. Authenticate caller using secure HMAC session token
  const headers = getRequestHeaders();
  const cookieHeader = headers.get("cookie") || "";

  if (!verifyAdminSession(cookieHeader)) {
    throw new Error("Forbidden: Only the super admin can access this page.");
  }

  // 2. Fetch all opportunities with business and all attached interests/proposals/dealflow
  const opportunities = await prisma.opportunity.findMany({
    include: {
      business: true,
      interests: {
        include: {
          requesting_business: true,
          exchange_proposals: {
            orderBy: { version: "desc" },
          },
          exchange_agreement: true,
          contact_consents: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  // 3. Map to clean structured DTO with computed stage information
  return {
    opportunities: opportunities.map((opp) => ({
      id: opp.id,
      opportunity_number: opp.opportunity_number,
      title: opp.title,
      description: opp.description,
      category: opp.category,
      industry: opp.industry,
      location: opp.location,
      offer_text: opp.offer_text,
      status: opp.status,
      hide_company_name: opp.hide_company_name,
      promotion_status: opp.promotion_status,
      created_at: opp.created_at.toISOString(),
      business: {
        id: opp.business.id,
        company_name: opp.business.company_name,
        website: opp.business.website,
        industry: opp.business.industry,
      },
      interests: opp.interests.map((interest) => {
        const hasUnblinded = interest.contact_consents.some(
          (c) => c.status === "accepted",
        );
        const agreement = interest.exchange_agreement;
        const isAgreementAgreed = agreement?.status === "agreed";
        const hasProposals = interest.exchange_proposals.length > 0;

        let computedStage = 1;
        let stageLabel = "Stage 1: Acknowledgement";

        if (hasUnblinded || isAgreementAgreed) {
          computedStage = 4;
          stageLabel = "Stage 4: Handshake";
        } else if (agreement) {
          computedStage = 3;
          stageLabel = "Stage 3: Agreement";
        } else if (interest.status === "accepted" || hasProposals) {
          computedStage = 2;
          stageLabel = "Stage 2: Negotiation";
        } else {
          computedStage = 1;
          stageLabel = "Stage 1: Acknowledgement";
        }

        return {
          id: interest.id,
          requesting_business: {
            id: interest.requesting_business.id,
            company_name: interest.requesting_business.company_name,
            website: interest.requesting_business.website,
            industry: interest.requesting_business.industry,
          },
          message: interest.message,
          status: interest.status,
          created_at: interest.created_at.toISOString(),
          stage: computedStage,
          stage_label: stageLabel,
          proposals_count: interest.exchange_proposals.length,
          has_agreement: Boolean(agreement),
          agreement_status: agreement?.status || null,
          has_unblinded_consent: hasUnblinded,
        };
      }),
    })),
  };
});

export type GetAdminOpportunitiesFn = typeof getAdminOpportunities;
