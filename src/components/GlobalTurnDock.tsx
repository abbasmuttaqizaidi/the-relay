import * as React from "react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { getIncomingRequests } from "@/functions/getIncomingRequests";
import { getSentRequests } from "@/functions/getSentRequests";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { FloatingTurnDock, type TurnDeckDeal } from "@/design-system";

// Shared workflow calculator for calculating dealroom stages and pending turn actions
export function computeRequestWorkflow(req: any, currentBusinessId?: string) {
  const isInbound = req.direction === "inbound";
  const myBizId = currentBusinessId || (isInbound ? req.opportunity?.business_id : req.requesting_business_id);

  const partnerBusiness = isInbound
    ? req.requesting_business
    : req.opportunity?.business;

  const partnerName = isInbound
    ? req.requesting_business?.company_name || "Partner Business"
    : req.opportunity?.hide_company_name
    ? "Confidential Business"
    : partnerBusiness?.company_name || "Target Business";

  const isVerified = isInbound
    ? req.requesting_business?.status === "approved"
    : partnerBusiness?.status === "approved";

  // Requester is auto-acknowledged upon pitch submission
  const requesterAck = Boolean(req.requester_acknowledged_at) || !isInbound;
  const ownerAck = Boolean(req.owner_acknowledged_at);
  const bothAck = requesterAck && ownerAck;
  const myAck = isInbound ? ownerAck : true;
  const partnerAck = isInbound ? true : ownerAck;

  const proposals = req.exchange_proposals || [];
  const latestProposal = proposals.length > 0 ? proposals[0] : null;
  const hasProposals = proposals.length > 0;
  const agreement = req.exchange_agreement;
  const isAgreed = agreement?.status === "agreed";
  const isDraftAgreement = agreement?.status === "draft" || Boolean(agreement && !isAgreed);

  const ownerConfirmedAgreement = Boolean(agreement?.owner_confirmed_at);
  const requesterConfirmedAgreement = Boolean(agreement?.requester_confirmed_at);
  const myConfirmedAgreement = isInbound ? ownerConfirmedAgreement : requesterConfirmedAgreement;
  const partnerConfirmedAgreement = isInbound ? requesterConfirmedAgreement : ownerConfirmedAgreement;

  const consents = req.contact_consents || [];
  const myConsents = consents.filter((c: any) => c.from_business_id === myBizId);
  const acceptedIncomingConsents = consents.filter(
    (c: any) => c.to_business_id === myBizId && c.status === "accepted"
  );
  const hasSharedAnyContact = myConsents.length > 0;
  const hasAcceptedAnyContact = acceptedIncomingConsents.length > 0;

  const isLegacyHandshake =
    req.status === "accepted" &&
    !requesterAck &&
    !ownerAck &&
    !hasProposals &&
    !agreement &&
    consents.length === 0;

  const isHandshakeComplete =
    isLegacyHandshake ||
    (isAgreed && hasSharedAnyContact && hasAcceptedAnyContact) ||
    (isAgreed && (hasSharedAnyContact || hasAcceptedAnyContact));

  let stageNum = 1;
  let stageHeadline = "";
  let stageContext = "";
  let stateCategory: "action_needed" | "waiting" | "completed" | "archived" = "action_needed";
  let primaryActionLabel = "View Details";

  if (req.status === "declined") {
    stageNum = 1;
    stateCategory = "archived";
    stageHeadline = "Stage Closed: Pitch Declined";
    stageContext = "This request has been declined.";
  } else if (req.status === "withdrawn") {
    stageNum = 1;
    stateCategory = "archived";
    stageHeadline = "Stage Closed: Pitch Withdrawn";
    stageContext = "This pitch was withdrawn by the sender.";
  } else if (isHandshakeComplete) {
    stageNum = 4;
    stateCategory = "completed";
    stageHeadline = "Stage 4: Handshake — Bilateral Introduction Executed";
    stageContext = req.message ? `Introduction note: "${req.message}"` : "Handshake finalized.";
    primaryActionLabel = "Exchange Hub";
  } else if (isAgreed || isDraftAgreement) {
    stageNum = 3;
    if (!myConfirmedAgreement) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 3: Agreement — Waiting for signature";
      stageContext = partnerConfirmedAgreement
        ? `${partnerName} has counter-signed. Confirm your signature to finalize.`
        : "Exchange agreement draft is ready. Review and sign to finalize bilateral connection.";
      primaryActionLabel = "Review Agreement";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 3: Agreement — Waiting for partner signature";
      stageContext = `You have counter-signed the agreement. Awaiting signature from ${partnerName}.`;
      primaryActionLabel = "Exchange Hub";
    }
  } else if (hasProposals || bothAck) {
    stageNum = 2;
    if (latestProposal && latestProposal.status === "pending_response") {
      const isReceivingProposal = latestProposal.receiving_business_id === myBizId;
      if (isReceivingProposal) {
        stateCategory = "action_needed";
        stageHeadline = "Stage 2: Negotiation — Counter-offer received";
        stageContext = `Proposed: ${latestProposal.exchange_details || (latestProposal.revenue_percentage ? `${latestProposal.revenue_percentage}% revenue share` : "Exchange terms")}. Awaiting your response.`;
        primaryActionLabel = "Review Counter-Offer";
      } else {
        stateCategory = "waiting";
        stageHeadline = "Stage 2: Negotiation — Proposal sent";
        stageContext = `Proposed terms sent to ${partnerName}. Awaiting their counter-offer or acceptance.`;
        primaryActionLabel = "Exchange Hub";
      }
    } else if (bothAck && !hasProposals) {
      if (!isInbound) {
        // Requester (Party A): Waiting for owner review of the initial pitch
        stateCategory = "waiting";
        stageHeadline = "Stage 2: Negotiation — Awaiting Owner Response";
        stageContext = `You submitted your exchange pitch. Waiting for ${partnerName} to review and respond.`;
        primaryActionLabel = "Exchange Hub";
      } else {
        // Opportunity Owner (Party B): Action needed to review pitch and respond
        stateCategory = "action_needed";
        stageHeadline = "Stage 2: Negotiation — Review Pitch & Respond";
        stageContext = `${partnerName} submitted an exchange pitch for your opportunity. Review terms and respond.`;
        primaryActionLabel = "Review Pitch";
      }
    } else {
      stateCategory = "action_needed";
      stageHeadline = "Stage 2: Negotiation — Exchange negotiation active";
      stageContext = "Both parties acknowledged protocol. Discuss terms and submit exchange proposal.";
      primaryActionLabel = "Exchange Hub";
    }
  } else {
    stageNum = 1;
    if (isInbound) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 1: Acknowledgement — Inbound Pitch Awaiting Review";
      stageContext = req.message || "Partner has expressed interest in this opportunity. Review pitch context and accept to initiate exchange.";
      primaryActionLabel = "Acknowledge & Review";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 1: Acknowledgement — Waiting for Operator Review";
      stageContext = req.message ? `Your pitch: "${req.message}"` : "You submitted a pitch. Waiting for counterparty to acknowledge and respond.";
      primaryActionLabel = "Exchange Hub";
    }
  }

  return {
    isInbound,
    partnerName,
    isVerified,
    stageNum,
    stageHeadline,
    stageContext,
    stateCategory,
    primaryActionLabel,
    isHandshakeComplete,
  };
}

export function GlobalTurnDock() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  // 1. Fetch user onboarding & business info
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status"],
    queryFn: async () => await checkOnboardingStatus(),
    enabled: Boolean(isLoaded && isSignedIn),
  });

  const currentBusinessId = onboardingData?.business?.id;

  // 2. Fetch incoming and sent requests
  const { data: incomingRequests = [] } = useQuery({
    queryKey: ["incoming-requests"],
    queryFn: async () => {
      const data = await getIncomingRequests();
      return (data || []).map((r: any) => ({ ...r, direction: "inbound" }));
    },
    enabled: Boolean(isLoaded && isSignedIn && onboardingData?.hasBusiness),
  });

  const { data: sentRequests = [] } = useQuery({
    queryKey: ["sent-requests"],
    queryFn: async () => {
      const data = await getSentRequests();
      return (data || []).map((r: any) => ({ ...r, direction: "outbound" }));
    },
    enabled: Boolean(isLoaded && isSignedIn && onboardingData?.hasBusiness),
  });

  // 3. Compute dynamic action-needed turn deals
  const turnDeckDeals = useMemo<TurnDeckDeal[]>(() => {
    const all = [...incomingRequests, ...sentRequests];
    const actionDeals = all
      .filter((d: any) => d.status !== "declined" && d.status !== "withdrawn")
      .map((req: any) => {
        const workflow = computeRequestWorkflow(req, currentBusinessId);
        return {
          ...req,
          workflow,
        };
      })
      .filter((d: any) => d.workflow.stateCategory === "action_needed");

    return actionDeals.map((deal: any) => {
      const partnerName =
        deal.workflow?.partnerName ||
        deal.partnerBusiness?.company_name ||
        "Counterparty Enterprise";
      const headline =
        deal.opportunity?.title || deal.title || "Bilateral Exchange";
      const pStage = (deal.workflow?.stageNum || 1) as 1 | 2 | 3 | 4;
      const stageName = deal.workflow?.stageHeadline || `Stage ${pStage} · In Progress`;

      return {
        id: deal.id,
        partnerName,
        isVerified: deal.workflow?.isVerified ?? true,
        stageNum: pStage,
        stageName,
        direction: deal.direction as "inbound" | "outbound",
        headline,
        description: deal.opportunity?.description || deal.workflow?.stageContext || deal.message || "Action item pending your review.",
        message: deal.message || deal.opportunity?.description,
        created_at: deal.created_at,
        status: deal.status,
        primaryActionLabel: deal.workflow?.primaryActionLabel || "Review Request",
        opportunityId: deal.opportunity_id,
        opportunityTitle: headline,
      };
    });
  }, [incomingRequests, sentRequests, currentBusinessId]);

  if (!isLoaded || !isSignedIn || !onboardingData?.hasBusiness) {
    return null;
  }

  return (
    <FloatingTurnDock
      deals={turnDeckDeals}
      defaultMinimized={turnDeckDeals.length === 0}
      onOpenExchangeHub={(deal) => {
        if (deal.id) {
          navigate({ to: "/connections/$id", params: { id: deal.id } });
        }
      }}
    />
  );
}
