/**
 * Single Source of Truth for Exchange / Trade Lifecycle Status & Completion.
 *
 * Core Business Rule:
 * An Exchange is considered COMPLETED ("Handshake Sealed") if and only if:
 * 1. It is a legacy handshake (direct acceptance before workflow protocol), OR
 * 2. Stage 4 Agreement is ratified (`agreement.status === "agreed"`), AND
 *    AT LEAST ONE contact coordinate has been mutually shared & accepted
 *    under mutual consent (`consent.status === "accepted"`).
 */

export interface ExchangeStatusEvaluationInput {
  id?: string;
  status?: string | null;
  direction?: "inbound" | "outbound" | null;
  is_legacy_handshake?: boolean | null;
  requester_acknowledged_at?: string | Date | null;
  owner_acknowledged_at?: string | Date | null;
  exchange_agreement?: {
    status?: string | null;
    owner_confirmed_at?: string | Date | null;
    requester_confirmed_at?: string | Date | null;
    final_proposal_id?: string | null;
  } | null;
  agreement?: {
    status?: string | null;
    owner_confirmed_at?: string | Date | null;
    requester_confirmed_at?: string | Date | null;
    final_proposal_id?: string | null;
  } | null;
  exchange_agreements?: any[];
  exchange_proposals?: any[];
  proposals?: any[];
  contact_consents?: Array<{
    status?: string | null;
    contact_field?: string | null;
    from_business_id?: string | null;
    to_business_id?: string | null;
  }> | null;
  consents?: Array<{
    status?: string | null;
    contact_field?: string | null;
    from_business_id?: string | null;
    to_business_id?: string | null;
  }> | null;
  allowed_revealed_contacts?: Record<string, any> | null;
}

/**
 * Checks if at least one contact coordinate has been mutually exchanged & accepted.
 */
export function hasAtLeastOneAcceptedContact(
  exchangeData?: ExchangeStatusEvaluationInput | null
): boolean {
  if (!exchangeData) return false;

  const rawConsents =
    (exchangeData as any).contact_consents ||
    (exchangeData as any).contact_sharing_consents ||
    (exchangeData as any).contactSharingConsents ||
    (exchangeData as any).contactConsents ||
    (exchangeData as any).contact_shares ||
    (exchangeData as any).consents ||
    [];

  const consents = Array.isArray(rawConsents) ? rawConsents : [];

  if (consents.some((c) => c && (c.status === "accepted" || c.status === "approved" || c.status === "confirmed"))) {
    return true;
  }

  // Check if allowed_revealed_contacts or contact reveal is present
  if ((exchangeData as any).allowed_revealed_contacts) {
    const revealed = (exchangeData as any).allowed_revealed_contacts;
    if (typeof revealed === "object" && Object.keys(revealed).length > 0) {
      return true;
    }
  }

  return false;
}

/**
 * Authoritative check: returns true if the exchange is 100% completed.
 * Condition: (isAgreed && hasMutuallySharedContact >= 1) || isLegacyHandshake || status === "completed"
 */
export function isExchangeCompleted(
  exchangeData?: ExchangeStatusEvaluationInput | null
): boolean {
  if (!exchangeData) return false;

  // Direct completed status flags
  if (
    (exchangeData as any).status === "completed" ||
    (exchangeData as any).status === "handshake_sealed" ||
    (exchangeData as any).is_completed === true ||
    (exchangeData as any).isCompleted === true
  ) {
    return true;
  }

  const agreement =
    (exchangeData as any).exchange_agreement ||
    (exchangeData as any).agreement ||
    (exchangeData as any).exchangeAgreement ||
    (Array.isArray((exchangeData as any).exchange_agreements) ? (exchangeData as any).exchange_agreements[0] : null);

  const isAgreed = agreement?.status === "agreed" || (exchangeData as any).status === "agreed";

  // Check if at least one contact coordinate has been mutually shared & accepted
  const hasAcceptedContact = hasAtLeastOneAcceptedContact(exchangeData);

  // Check for legacy handshake
  const rawProposals =
    (exchangeData as any).exchange_proposals ||
    (exchangeData as any).proposals ||
    (exchangeData as any).exchangeProposals ||
    [];
  const hasProposals = Array.isArray(rawProposals) && rawProposals.length > 0;

  const rawConsents =
    (exchangeData as any).contact_consents ||
    (exchangeData as any).contact_sharing_consents ||
    (exchangeData as any).contactSharingConsents ||
    (exchangeData as any).contactConsents ||
    (exchangeData as any).contact_shares ||
    (exchangeData as any).consents ||
    [];
  const consents = Array.isArray(rawConsents) ? rawConsents : [];

  const isLegacyHandshake = Boolean(
    (exchangeData as any).is_legacy_handshake ||
      ((exchangeData as any).status === "accepted" &&
        !(exchangeData as any).requester_acknowledged_at &&
        !(exchangeData as any).owner_acknowledged_at &&
        !hasProposals &&
        !agreement &&
        consents.length === 0)
  );

  return isLegacyHandshake || (isAgreed && hasAcceptedContact);
}

/**
 * Resolves the numeric stage (1, 2, 3, 4) and stage status for any exchange.
 */
export function getExchangeStageDetails(
  exchangeData?: ExchangeStatusEvaluationInput | null,
  currentBusinessId?: string
) {
  if (!exchangeData) {
    return {
      stageNum: 1 as 1 | 2 | 3 | 4,
      stageLabel: "Stage 1: Acknowledging",
      isCompleted: false,
      stateCategory: "action_needed" as const,
    };
  }

  const isCompleted = isExchangeCompleted(exchangeData);

  const agreement =
    exchangeData.exchange_agreement ||
    exchangeData.agreement ||
    (Array.isArray(exchangeData.exchange_agreements) ? exchangeData.exchange_agreements[0] : null);

  const isAgreed = agreement?.status === "agreed";
  const isDraftAgreement = agreement?.status === "draft" || Boolean(agreement && !isAgreed);

  const rawProposals = exchangeData.exchange_proposals || exchangeData.proposals || [];
  const proposals = Array.isArray(rawProposals) ? rawProposals : [];
  const hasProposals = proposals.length > 0;

  const requesterAck = Boolean(exchangeData.requester_acknowledged_at);
  const ownerAck = Boolean(exchangeData.owner_acknowledged_at);
  const bothAck = requesterAck && ownerAck;

  if (isCompleted) {
    return {
      stageNum: 4 as 1 | 2 | 3 | 4,
      stageLabel: "Stage 4: Handshake Sealed",
      isCompleted: true,
      stateCategory: "completed" as const,
    };
  }

  if (isAgreed) {
    return {
      stageNum: 4 as 1 | 2 | 3 | 4,
      stageLabel: "Stage 4: Contact Exchange",
      isCompleted: false,
      stateCategory: "action_needed" as const,
    };
  }

  if (isDraftAgreement) {
    return {
      stageNum: 3 as 1 | 2 | 3 | 4,
      stageLabel: "Stage 3: Mutual Agreement",
      isCompleted: false,
      stateCategory: "action_needed" as const,
    };
  }

  if (hasProposals || bothAck || exchangeData.status === "negotiating" || exchangeData.status === "accepted") {
    return {
      stageNum: 2 as 1 | 2 | 3 | 4,
      stageLabel: "Stage 2: Active Negotiation",
      isCompleted: false,
      stateCategory: "action_needed" as const,
    };
  }

  return {
    stageNum: 1 as 1 | 2 | 3 | 4,
    stageLabel: "Stage 1: Acknowledging",
    isCompleted: false,
    stateCategory: "action_needed" as const,
  };
}
