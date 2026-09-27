import * as React from "react";
import { useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/tanstack-react-start";
import { useNavigate } from "@tanstack/react-router";
import { getIncomingRequests } from "@/functions/getIncomingRequests";
import { getSentRequests } from "@/functions/getSentRequests";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getSupabaseClientConfig } from "@/functions/getSupabaseClientConfig";
import { createClient } from "@supabase/supabase-js";
import { FloatingTurnDock, type TurnDeckDeal, exchangeActivityBus } from "@/design-system";
import { isExchangeCompleted } from "@/lib/exchange-status";

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

  const rawProposals = Array.isArray(req.exchange_proposals) ? req.exchange_proposals : [];
  const proposals = [...rawProposals].sort(
    (a: any, b: any) => ((b.version ?? b.round_number) || 0) - ((a.version ?? a.round_number) || 0)
  );
  const latestProposal = proposals.length > 0 ? proposals[0] : null;
  const hasProposals = proposals.length > 0;

  const rawAgreement = req.exchange_agreement || (Array.isArray(req.exchange_agreements) ? req.exchange_agreements[0] : null);
  const agreement = rawAgreement;
  const isAgreed = agreement?.status === "agreed";
  const isDraftAgreement = agreement?.status === "draft" || Boolean(agreement && !isAgreed);

  const ownerConfirmedAgreement = Boolean(agreement?.owner_confirmed_at);
  const requesterConfirmedAgreement = Boolean(agreement?.requester_confirmed_at);
  const myConfirmedAgreement = isInbound ? ownerConfirmedAgreement : requesterConfirmedAgreement;
  const partnerConfirmedAgreement = isInbound ? requesterConfirmedAgreement : ownerConfirmedAgreement;

  const consents = Array.isArray(req.contact_consents) ? req.contact_consents : [];
  const myConsents = consents.filter((c: any) => c.from_business_id === myBizId);
  const incomingConsents = consents.filter((c: any) => c.to_business_id === myBizId);
  const acceptedIncomingConsents = incomingConsents.filter((c: any) => c.status === "accepted");
  const pendingIncomingConsents = incomingConsents.filter((c: any) => c.status === "pending");

  const hasSharedAnyContact = myConsents.length > 0;
  const hasAcceptedAnyContact = acceptedIncomingConsents.length > 0;
  const hasPendingIncomingConsent = pendingIncomingConsents.length > 0;

  const isHandshakeComplete = isExchangeCompleted(req);

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
  } else if (isAgreed && bothAck && (myConfirmedAgreement && partnerConfirmedAgreement)) {
    stageNum = 4;
    if (!hasSharedAnyContact) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 4: Handshake — Share Contact Details";
      stageContext = "Agreement ratified by both parties. Share your communication coordinates to complete the handshake.";
      primaryActionLabel = "Share Contact";
    } else if (hasPendingIncomingConsent) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 4: Handshake — Approve Contact Reveal";
      stageContext = `${partnerName} requested mutual contact sharing. Confirm approval to reveal details.`;
      primaryActionLabel = "Approve Contact";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 4: Handshake — Awaiting Partner Coordinates";
      stageContext = `You shared contact coordinates. Awaiting reciprocal confirmation from ${partnerName}.`;
      primaryActionLabel = "Exchange Hub";
    }
  } else if (isAgreed || isDraftAgreement) {
    stageNum = 3;
    if (!myConfirmedAgreement) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 3: Agreement — Confirm Bilateral Agreement";
      stageContext = partnerConfirmedAgreement
        ? `${partnerName} has signed. Confirm your ratification to unlock contact exchange.`
        : "Exchange terms accepted. Review and confirm agreement ratification.";
      primaryActionLabel = "Review & Sign";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 3: Agreement — Waiting for Partner Ratification";
      stageContext = `You confirmed the agreement. Awaiting signature from ${partnerName}.`;
      primaryActionLabel = "Exchange Hub";
    }
  } else if (hasProposals || bothAck) {
    stageNum = 2;
    if (latestProposal && latestProposal.status === "pending_response") {
      const isReceivingProposal = latestProposal.receiving_business_id === myBizId;
      if (isReceivingProposal) {
        stateCategory = "action_needed";
        stageHeadline = ((latestProposal.version ?? latestProposal.round_number) || 1) > 1
          ? "Stage 2: Negotiation — Counter-Offer Received"
          : "Stage 2: Negotiation — Exchange Proposal Received";
        stageContext = `Proposed: ${latestProposal.exchange_details || (latestProposal.revenue_percentage ? `${latestProposal.revenue_percentage}% revenue share` : "Exchange terms")}. Awaiting your response.`;
        primaryActionLabel = "Review Proposal";
      } else {
        stateCategory = "waiting";
        stageHeadline = "Stage 2: Negotiation — Proposal Sent";
        stageContext = `Proposed terms sent to ${partnerName}. Awaiting their counter-offer or acceptance.`;
        primaryActionLabel = "Exchange Hub";
      }
    } else if (latestProposal && latestProposal.status === "declined") {
      const didPartnerDeclineMyOffer = latestProposal.proposing_business_id === myBizId;
      if (didPartnerDeclineMyOffer) {
        stateCategory = "action_needed";
        stageHeadline = "Stage 2: Negotiation — Offer Declined · Send Revised Terms";
        stageContext = `${partnerName} declined your previous exchange terms. You can submit a revised offer.`;
        primaryActionLabel = "Propose Terms";
      } else {
        stateCategory = "waiting";
        stageHeadline = "Stage 2: Negotiation — Offer Declined";
        stageContext = `You declined the counter-offer. Awaiting revised terms or new proposal from ${partnerName}.`;
        primaryActionLabel = "Exchange Hub";
      }
    } else if (latestProposal && latestProposal.status === "withdrawn") {
      stateCategory = "waiting";
      stageHeadline = "Stage 2: Negotiation — Proposal Withdrawn";
      stageContext = "You or the partner withdrew the proposal. You can submit revised bilateral terms.";
      primaryActionLabel = "Exchange Hub";
    } else if (bothAck && !hasProposals) {
      if (!isInbound) {
        // Requester (Party A): Waiting for owner review of the initial pitch
        stateCategory = "waiting";
        stageHeadline = "Stage 2: Negotiation — Awaiting Owner Review";
        stageContext = `You submitted your exchange pitch. Waiting for ${partnerName} to review and respond.`;
        primaryActionLabel = "Exchange Hub";
      } else {
        // Opportunity Owner (Party B): Action needed to review pitch and respond
        stateCategory = "action_needed";
        stageHeadline = "Stage 2: Negotiation — Review Pitch & Propose Terms";
        stageContext = `${partnerName} submitted an exchange pitch for your opportunity. Review terms and propose bilateral terms.`;
        primaryActionLabel = "Review Pitch";
      }
    } else {
      stateCategory = "action_needed";
      stageHeadline = "Stage 2: Negotiation — Exchange Negotiation Active";
      stageContext = "Both parties acknowledged protocol. Discuss terms and submit exchange proposal.";
      primaryActionLabel = "Exchange Hub";
    }
  } else {
    stageNum = 1;
    if (isInbound) {
      stateCategory = "action_needed";
      stageHeadline = "Stage 1: Clearance — Inbound Pitch Awaiting Review";
      stageContext = req.message || "Partner has expressed interest in this opportunity. Review pitch context and accept to initiate exchange.";
      primaryActionLabel = "Acknowledge & Review";
    } else {
      stateCategory = "waiting";
      stageHeadline = "Stage 1: Clearance — Waiting for Operator Review";
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
  const queryClient = useQueryClient();

  // 1. Fetch user onboarding & business info
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status"],
    queryFn: async () => await checkOnboardingStatus(),
    enabled: Boolean(isLoaded && isSignedIn),
  });

  const currentBusinessId = onboardingData?.business?.id;

  // 2. Fetch incoming and sent requests with auto-polling & real-time sync
  const { data: incomingRequests = [] } = useQuery({
    queryKey: ["incoming-requests"],
    queryFn: async () => {
      const data = await getIncomingRequests();
      return (data || []).map((r: any) => ({ ...r, direction: "inbound" }));
    },
    enabled: Boolean(isLoaded && isSignedIn && onboardingData?.hasBusiness),
    staleTime: 0,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  });

  const { data: sentRequests = [] } = useQuery({
    queryKey: ["sent-requests"],
    queryFn: async () => {
      const data = await getSentRequests();
      return (data || []).map((r: any) => ({ ...r, direction: "outbound" }));
    },
    enabled: Boolean(isLoaded && isSignedIn && onboardingData?.hasBusiness),
    staleTime: 0,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  });

  // 3. Listen to local event dispatchers and activity bus
  useEffect(() => {
    const handleSync = () => {
      queryClient.refetchQueries({ queryKey: ["incoming-requests"], type: "all" });
      queryClient.refetchQueries({ queryKey: ["sent-requests"], type: "all" });
    };

    window.addEventListener("relay:interest", handleSync);
    const unsubActivity = exchangeActivityBus.subscribe(() => handleSync());

    return () => {
      window.removeEventListener("relay:interest", handleSync);
      unsubActivity();
    };
  }, [queryClient]);

  // 4. Listen to Supabase Realtime changes on exchange tables
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let activeChannel: any = null;
    let isMounted = true;

    const setupRealtime = async () => {
      try {
        const config = await getSupabaseClientConfig();
        if (!config.supabaseUrl || !config.supabaseAnonKey || !isMounted) return;

        const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

        const handleTableChange = () => {
          if (!isMounted) return;
          queryClient.refetchQueries({ queryKey: ["incoming-requests"], type: "all" });
          queryClient.refetchQueries({ queryKey: ["sent-requests"], type: "all" });
        };

        activeChannel = supabase
          .channel("global-turn-dock-realtime-live")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "exchange_proposals" },
            handleTableChange
          )
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "exchange_agreements" },
            handleTableChange
          )
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "interests" },
            handleTableChange
          )
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "contact_consents" },
            handleTableChange
          )
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "notifications" },
            handleTableChange
          )
          .subscribe();
      } catch (err) {
        console.error("Failed to setup Realtime sync for GlobalTurnDock:", err);
      }
    };

    setupRealtime();

    return () => {
      isMounted = false;
      if (activeChannel) {
        activeChannel.unsubscribe();
      }
    };
  }, [isLoaded, isSignedIn, queryClient]);

  // 5. Compute dynamic action-needed turn deals
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
