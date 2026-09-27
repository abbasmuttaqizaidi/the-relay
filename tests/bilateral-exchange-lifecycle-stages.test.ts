import { describe, it, expect } from "vitest";
import {
  isExchangeCompleted,
  hasAtLeastOneAcceptedContact,
  getExchangeStageDetails,
  type ExchangeStatusEvaluationInput,
} from "../src/lib/exchange-status";

/**
 * COMPREHENSIVE BILATERAL EXCHANGE LIFECYCLE & INVARIANT SUITE
 * 
 * Verifies all 4 canonical stages of the Bilateral Exchange Flow:
 * - STAGE 1: Clearance, Intent, Isolation & Mutual Acknowledgement
 * - STAGE 2: Bilateral Negotiation, Turn Enforcement, Supersession & Zero-Leakage
 * - STAGE 3: Dual Sovereign Agreement, Ratification & State Locking
 * - STAGE 4: Reciprocal Blinded Contact Handshake & Final Exchange Completion
 */

interface BusinessEntity {
  id: string;
  company_name: string;
  status: "pending" | "approved" | "suspended";
  contact_email: string;
  phone_number?: string;
  linkedin_url?: string;
  custom_contacts?: Record<string, string>;
  owner_user_id: string;
}

interface OpportunityEntity {
  id: string;
  business_id: string;
  title: string;
  status: "active" | "archived";
}

interface InterestEntity {
  id: string;
  opportunity_id: string;
  requesting_business_id: string;
  status: "pending" | "accepted" | "declined" | "withdrawn";
  message?: string | null;
  requester_acknowledged_at?: string | null;
  owner_acknowledged_at?: string | null;
  last_follow_up_at?: string | null;
  created_at: string;
}

interface ProposalEntity {
  id: string;
  interest_id: string;
  opportunity_id: string;
  proposing_business_id: string;
  receiving_business_id: string;
  exchange_type: string;
  exchange_details: string;
  revenue_percentage?: number | null;
  fixed_amount?: number | null;
  currency: string;
  additional_terms?: string | null;
  version: number;
  status: "pending_response" | "accepted" | "declined" | "superseded" | "cancelled";
}

interface AgreementEntity {
  id: string;
  interest_id: string;
  opportunity_id: string;
  final_proposal_id: string;
  owner_business_id: string;
  interested_business_id: string;
  exchange_type: string;
  exchange_details: string;
  revenue_percentage?: number | null;
  fixed_amount?: number | null;
  currency: string;
  status: "draft" | "agreed" | "cancelled";
  owner_confirmed_at?: string | null;
  requester_confirmed_at?: string | null;
  agreed_at?: string | null;
}

interface ContactConsentEntity {
  id: string;
  interest_id: string;
  from_business_id: string;
  to_business_id: string;
  contact_field: string;
  status: "requested" | "accepted" | "declined";
  created_at: string;
  accepted_at?: string | null;
}

class BilateralExchangeStateMachine {
  businesses: Map<string, BusinessEntity> = new Map();
  opportunities: Map<string, OpportunityEntity> = new Map();
  interests: InterestEntity[] = [];
  proposals: ProposalEntity[] = [];
  agreements: AgreementEntity[] = [];
  consents: ContactConsentEntity[] = [];

  registerBusiness(biz: BusinessEntity) {
    this.businesses.set(biz.id, biz);
  }

  registerOpportunity(opp: OpportunityEntity) {
    this.opportunities.set(opp.id, opp);
  }

  // --- STAGE 1 METHODS ---

  expressInterest(opportunityId: string, requestingBusinessId: string, message?: string): InterestEntity {
    const opp = this.opportunities.get(opportunityId);
    if (!opp) throw new Error("Opportunity not found");

    const requester = this.businesses.get(requestingBusinessId);
    if (!requester || requester.status !== "approved") {
      throw new Error("Only approved businesses can express interest.");
    }

    if (opp.business_id === requestingBusinessId) {
      throw new Error("Cannot express interest in your own opportunity.");
    }

    const existing = this.interests.find(
      (i) => i.opportunity_id === opportunityId && i.requesting_business_id === requestingBusinessId
    );
    if (existing && existing.status !== "withdrawn") {
      throw new Error("You have already expressed active interest in this opportunity.");
    }

    const interest: InterestEntity = {
      id: `interest-${this.interests.length + 1}`,
      opportunity_id: opportunityId,
      requesting_business_id: requestingBusinessId,
      status: "pending",
      message: message || null,
      requester_acknowledged_at: new Date().toISOString(),
      owner_acknowledged_at: null,
      created_at: new Date().toISOString(),
    };
    this.interests.push(interest);
    return interest;
  }

  acknowledgeProcess(interestId: string, businessId: string): InterestEntity {
    const interest = this.interests.find((i) => i.id === interestId);
    if (!interest) throw new Error("Interest not found");

    const opp = this.opportunities.get(interest.opportunity_id);
    if (!opp) throw new Error("Opportunity not found");

    const isRequester = interest.requesting_business_id === businessId;
    const isOwner = opp.business_id === businessId;

    if (!isRequester && !isOwner) {
      throw new Error("Unauthorized: Business is not a participant in this exchange.");
    }

    const now = new Date().toISOString();
    if (isRequester) {
      interest.requester_acknowledged_at = now;
    } else {
      interest.owner_acknowledged_at = now;
    }
    return interest;
  }

  sendFollowUp(interestId: string, businessId: string, simulatedNowMs?: number): void {
    const interest = this.interests.find((i) => i.id === interestId);
    if (!interest) throw new Error("Interest not found");

    if (interest.requesting_business_id !== businessId) {
      throw new Error("Unauthorized: Only requesting business can send follow-up.");
    }
    if (!interest.requester_acknowledged_at) {
      throw new Error("Must acknowledge process before sending follow-up.");
    }
    if (interest.owner_acknowledged_at) {
      throw new Error("Partner has already acknowledged. Follow-up is unnecessary.");
    }

    const now = simulatedNowMs || Date.now();
    const ackTime = new Date(interest.requester_acknowledged_at).getTime();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

    if (now - ackTime < TWO_HOURS_MS) {
      throw new Error("Follow-up cooldown active: Must wait at least 2 hours after acknowledgement.");
    }

    if (interest.last_follow_up_at) {
      const lastFollowUp = new Date(interest.last_follow_up_at).getTime();
      const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
      if (now - lastFollowUp < TWENTY_FOUR_HOURS_MS) {
        throw new Error("Follow-up rate limit active: Must wait 24 hours between follow-ups.");
      }
    }

    interest.last_follow_up_at = new Date(now).toISOString();
  }

  withdrawInterest(interestId: string, businessId: string): InterestEntity {
    const interest = this.interests.find((i) => i.id === interestId);
    if (!interest) throw new Error("Interest not found");
    if (interest.requesting_business_id !== businessId) {
      throw new Error("Unauthorized to withdraw interest.");
    }
    interest.status = "withdrawn";
    return interest;
  }

  declineInterest(interestId: string, businessId: string): InterestEntity {
    const interest = this.interests.find((i) => i.id === interestId);
    if (!interest) throw new Error("Interest not found");
    const opp = this.opportunities.get(interest.opportunity_id);
    if (!opp || opp.business_id !== businessId) {
      throw new Error("Unauthorized: Only opportunity owner can decline interest.");
    }
    interest.status = "declined";
    return interest;
  }

  // --- STAGE 2 METHODS ---

  createProposal(params: {
    interestId: string;
    proposingBusinessId: string;
    exchangeType: string;
    exchangeDetails: string;
    revenuePercentage?: number;
    fixedAmount?: number;
    currency?: string;
    additionalTerms?: string;
  }): ProposalEntity {
    const interest = this.interests.find((i) => i.id === params.interestId);
    if (!interest) throw new Error("Interest not found");

    if (interest.status === "declined" || interest.status === "withdrawn") {
      throw new Error(`Cannot propose terms for an interest that is ${interest.status}.`);
    }

    if (!interest.requester_acknowledged_at || !interest.owner_acknowledged_at) {
      throw new Error("Both parties must acknowledge the exchange process before negotiation.");
    }

    const opp = this.opportunities.get(interest.opportunity_id);
    if (!opp) throw new Error("Opportunity not found");

    const isRequester = interest.requesting_business_id === params.proposingBusinessId;
    const isOwner = opp.business_id === params.proposingBusinessId;

    if (!isRequester && !isOwner) throw new Error("Unauthorized to propose terms.");

    const receivingBusinessId = isRequester ? opp.business_id : interest.requesting_business_id;

    const existingProps = this.proposals.filter((p) => p.interest_id === params.interestId);

    // Initial proposal MUST be submitted by the requesting business
    if (existingProps.length === 0 && isOwner) {
      throw new Error("The interested business must submit the initial exchange proposal.");
    }

    // Turn check: If there's an active pending proposal, the proposer cannot submit another without superseding
    const lastProposal = existingProps[existingProps.length - 1];
    if (lastProposal && lastProposal.status === "pending_response") {
      lastProposal.status = "superseded";
    }

    // Invalidate any unratified draft agreement confirmations
    const agreement = this.agreements.find((a) => a.interest_id === params.interestId);
    if (agreement && agreement.status === "draft") {
      agreement.owner_confirmed_at = null;
      agreement.requester_confirmed_at = null;
    }

    const proposal: ProposalEntity = {
      id: `prop-${this.proposals.length + 1}`,
      interest_id: params.interestId,
      opportunity_id: interest.opportunity_id,
      proposing_business_id: params.proposingBusinessId,
      receiving_business_id: receivingBusinessId,
      exchange_type: params.exchangeType,
      exchange_details: params.exchangeDetails,
      revenue_percentage: params.revenuePercentage ?? null,
      fixed_amount: params.fixedAmount ?? null,
      currency: params.currency || "USD",
      additional_terms: params.additionalTerms || null,
      version: existingProps.length + 1,
      status: "pending_response",
    };
    this.proposals.push(proposal);
    return proposal;
  }

  respondToProposal(params: {
    proposalId: string;
    respondingBusinessId: string;
    action: "accept" | "decline";
    declineReason?: string;
  }): { proposal: ProposalEntity; agreement?: AgreementEntity } {
    const proposal = this.proposals.find((p) => p.id === params.proposalId);
    if (!proposal) throw new Error("Proposal not found");

    if (proposal.status !== "pending_response") {
      throw new Error(`Cannot respond to proposal with status ${proposal.status}.`);
    }

    if (proposal.receiving_business_id !== params.respondingBusinessId) {
      throw new Error("Turn violation: Only the receiving party can respond to this proposal.");
    }

    if (params.action === "decline") {
      proposal.status = "declined";
      if (params.declineReason) {
        proposal.additional_terms = `[Declined: ${params.declineReason}] ${proposal.additional_terms || ""}`.trim();
      }
      return { proposal };
    }

    // Acceptance initiates Stage 3 Draft Agreement
    proposal.status = "accepted";
    const opp = this.opportunities.get(proposal.opportunity_id)!;
    const isOwner = opp.business_id === params.respondingBusinessId;

    let agreement = this.agreements.find((a) => a.interest_id === proposal.interest_id);
    if (!agreement) {
      agreement = {
        id: `agree-${this.agreements.length + 1}`,
        interest_id: proposal.interest_id,
        opportunity_id: proposal.opportunity_id,
        final_proposal_id: proposal.id,
        owner_business_id: opp.business_id,
        interested_business_id: isOwner ? proposal.proposing_business_id : proposal.receiving_business_id,
        exchange_type: proposal.exchange_type,
        exchange_details: proposal.exchange_details,
        revenue_percentage: proposal.revenue_percentage,
        fixed_amount: proposal.fixed_amount,
        currency: proposal.currency,
        status: "draft",
        owner_confirmed_at: isOwner ? new Date().toISOString() : null,
        requester_confirmed_at: !isOwner ? new Date().toISOString() : null,
        agreed_at: null,
      };
      this.agreements.push(agreement);
    } else {
      agreement.final_proposal_id = proposal.id;
      agreement.exchange_type = proposal.exchange_type;
      agreement.exchange_details = proposal.exchange_details;
      agreement.revenue_percentage = proposal.revenue_percentage;
      agreement.fixed_amount = proposal.fixed_amount;
      agreement.status = "draft";
      agreement.owner_confirmed_at = isOwner ? new Date().toISOString() : null;
      agreement.requester_confirmed_at = !isOwner ? new Date().toISOString() : null;
    }

    return { proposal, agreement };
  }

  // --- STAGE 3 METHODS ---

  confirmAgreement(interestId: string, proposalId: string, businessId: string): AgreementEntity {
    const agreement = this.agreements.find((a) => a.interest_id === interestId);
    if (!agreement) throw new Error("Agreement not found");

    if (agreement.final_proposal_id !== proposalId) {
      throw new Error("Stale Agreement Error: Final proposal ID mismatch.");
    }

    const isOwner = agreement.owner_business_id === businessId;
    const isRequester = agreement.interested_business_id === businessId;
    if (!isOwner && !isRequester) throw new Error("Unauthorized to confirm agreement.");

    const now = new Date().toISOString();
    if (isOwner) agreement.owner_confirmed_at = now;
    if (isRequester) agreement.requester_confirmed_at = now;

    // Both parties must confirm to ratify the agreement into "agreed"
    if (agreement.owner_confirmed_at && agreement.requester_confirmed_at) {
      agreement.status = "agreed";
      agreement.agreed_at = now;
      const interest = this.interests.find((i) => i.id === interestId);
      if (interest) interest.status = "accepted";
    }

    return agreement;
  }

  // --- STAGE 4 METHODS ---

  requestContactShare(interestId: string, fromBusinessId: string, contactField: string): ContactConsentEntity {
    const agreement = this.agreements.find((a) => a.interest_id === interestId);
    if (!agreement || agreement.status !== "agreed") {
      throw new Error("Stage 4 Locked: Mutual agreement must be ratified before requesting contact exchange.");
    }

    const isOwner = agreement.owner_business_id === fromBusinessId;
    const isRequester = agreement.interested_business_id === fromBusinessId;
    if (!isOwner && !isRequester) throw new Error("Unauthorized to request contact exchange.");

    const toBusinessId = isOwner ? agreement.interested_business_id : agreement.owner_business_id;

    const existing = this.consents.find(
      (c) =>
        c.interest_id === interestId &&
        c.from_business_id === fromBusinessId &&
        c.to_business_id === toBusinessId &&
        c.contact_field === contactField
    );
    if (existing) return existing;

    const consent: ContactConsentEntity = {
      id: `consent-${this.consents.length + 1}`,
      interest_id: interestId,
      from_business_id: fromBusinessId,
      to_business_id: toBusinessId,
      contact_field: contactField,
      status: "requested",
      created_at: new Date().toISOString(),
    };
    this.consents.push(consent);
    return consent;
  }

  respondToContactShare(interestId: string, respondingBusinessId: string, contactField: string, action: "accept" | "decline"): ContactConsentEntity {
    const incomingConsent = this.consents.find(
      (c) =>
        c.interest_id === interestId &&
        c.to_business_id === respondingBusinessId &&
        c.contact_field === contactField
    );
    if (!incomingConsent) throw new Error("Contact request not found.");

    const now = new Date().toISOString();
    if (action === "accept") {
      incomingConsent.status = "accepted";
      incomingConsent.accepted_at = now;

      // Reciprocal consent: Responding business also shares their contact with the requester
      let reciprocal = this.consents.find(
        (c) =>
          c.interest_id === interestId &&
          c.from_business_id === respondingBusinessId &&
          c.to_business_id === incomingConsent.from_business_id &&
          c.contact_field === contactField
      );
      if (!reciprocal) {
        reciprocal = {
          id: `consent-${this.consents.length + 1}`,
          interest_id: interestId,
          from_business_id: respondingBusinessId,
          to_business_id: incomingConsent.from_business_id,
          contact_field: contactField,
          status: "accepted",
          created_at: now,
          accepted_at: now,
        };
        this.consents.push(reciprocal);
      } else {
        reciprocal.status = "accepted";
        reciprocal.accepted_at = now;
      }
      return reciprocal;
    } else {
      incomingConsent.status = "declined";
      return incomingConsent;
    }
  }

  getRevealedContactDetails(interestId: string, viewerBusinessId: string): Record<string, string | null> {
    const interest = this.interests.find((i) => i.id === interestId);
    if (!interest) throw new Error("Interest not found");

    const opp = this.opportunities.get(interest.opportunity_id)!;
    const isOwner = opp.business_id === viewerBusinessId;
    const isRequester = interest.requesting_business_id === viewerBusinessId;

    if (!isOwner && !isRequester) {
      throw new Error("Access Denied: Third-party businesses cannot view exchange contacts.");
    }

    const partnerBusinessId = isOwner ? interest.requesting_business_id : opp.business_id;
    const partner = this.businesses.get(partnerBusinessId)!;

    // Contact is revealed to viewer if partner has an accepted consent to this viewer
    const acceptedConsents = this.consents.filter(
      (c) =>
        c.interest_id === interestId &&
        c.from_business_id === partnerBusinessId &&
        c.to_business_id === viewerBusinessId &&
        c.status === "accepted"
    );

    const revealedFields = new Set(acceptedConsents.map((c) => c.contact_field));

    const result: Record<string, string | null> = {
      email: revealedFields.has("email") ? partner.contact_email : null,
      phone: revealedFields.has("phone") ? (partner.phone_number || null) : null,
      linkedin: revealedFields.has("linkedin") ? (partner.linkedin_url || null) : null,
    };

    return result;
  }

  exportEvaluationPayload(interestId: string): ExchangeStatusEvaluationInput {
    const interest = this.interests.find((i) => i.id === interestId);
    if (!interest) throw new Error("Interest not found");

    const agreement = this.agreements.find((a) => a.interest_id === interestId);
    const props = this.proposals.filter((p) => p.interest_id === interestId);
    const relConsents = this.consents.filter((c) => c.interest_id === interestId);

    return {
      id: interest.id,
      status: interest.status,
      requester_acknowledged_at: interest.requester_acknowledged_at,
      owner_acknowledged_at: interest.owner_acknowledged_at,
      exchange_agreement: agreement
        ? {
            status: agreement.status,
            owner_confirmed_at: agreement.owner_confirmed_at,
            requester_confirmed_at: agreement.requester_confirmed_at,
            final_proposal_id: agreement.final_proposal_id,
          }
        : null,
      exchange_proposals: props,
      contact_consents: relConsents.map((c) => ({
        status: c.status,
        contact_field: c.contact_field,
        from_business_id: c.from_business_id,
        to_business_id: c.to_business_id,
      })),
    };
  }
}

describe("Bilateral Exchange Lifecycle - Full Stage 1 to Stage 4 Invariant Suite", () => {
  let engine: BilateralExchangeStateMachine;

  const ownerBiz: BusinessEntity = {
    id: "biz-owner-001",
    company_name: "Sovereign Cloud Networks",
    status: "approved",
    contact_email: "contact@sovereigncloud.io",
    phone_number: "+1-415-555-0101",
    linkedin_url: "https://linkedin.com/company/sovereign-cloud",
    owner_user_id: "user-owner-1",
  };

  const requesterBiz: BusinessEntity = {
    id: "biz-requester-002",
    company_name: "Apex AI Solutions",
    status: "approved",
    contact_email: "deals@apexai.dev",
    phone_number: "+1-415-555-0202",
    linkedin_url: "https://linkedin.com/company/apex-ai",
    owner_user_id: "user-requester-2",
  };

  const unapprovedBiz: BusinessEntity = {
    id: "biz-unapproved-003",
    company_name: "Unverified Shadow Corp",
    status: "pending",
    contact_email: "shadow@unverified.org",
    owner_user_id: "user-unapproved-3",
  };

  const thirdPartyBiz: BusinessEntity = {
    id: "biz-thirdparty-004",
    company_name: "Inquisitive Outsider Ltd",
    status: "approved",
    contact_email: "intel@outsider.com",
    owner_user_id: "user-thirdparty-4",
  };

  const primaryOpp: OpportunityEntity = {
    id: "opp-cloud-101",
    business_id: ownerBiz.id,
    title: "Zero-Knowledge Enterprise Cloud Gateway",
    status: "active",
  };

  const secondaryOpp: OpportunityEntity = {
    id: "opp-cloud-102",
    business_id: ownerBiz.id,
    title: "Multi-Region Distributed Data Hub",
    status: "active",
  };

  beforeEach(() => {
    engine = new BilateralExchangeStateMachine();
    engine.registerBusiness(ownerBiz);
    engine.registerBusiness(requesterBiz);
    engine.registerBusiness(unapprovedBiz);
    engine.registerBusiness(thirdPartyBiz);
    engine.registerOpportunity(primaryOpp);
    engine.registerOpportunity(secondaryOpp);
  });

  // ==========================================
  // STAGE 1: INTENT, CLEARANCE & ACKNOWLEDGEMENT
  // ==========================================
  describe("Stage 1 Invariants: Intent Expression, Isolation & Dual Acknowledgement", () => {
    it("1.1 Prevents unapproved businesses from pitching or expressing interest", () => {
      expect(() => {
        engine.expressInterest(primaryOpp.id, unapprovedBiz.id, "Attempting unverified pitch");
      }).toThrowError("Only approved businesses can express interest.");
    });

    it("1.2 Prevents opportunity owners from pitching their own listing", () => {
      expect(() => {
        engine.expressInterest(primaryOpp.id, ownerBiz.id, "Pitching self");
      }).toThrowError("Cannot express interest in your own opportunity.");
    });

    it("1.3 Strictly prevents duplicate active pitches on the same opportunity", () => {
      engine.expressInterest(primaryOpp.id, requesterBiz.id, "First pitch");
      expect(() => {
        engine.expressInterest(primaryOpp.id, requesterBiz.id, "Duplicate pitch");
      }).toThrowError("You have already expressed active interest in this opportunity.");
    });

    it("1.4 Allows the same business to independently express interest on different opportunities", () => {
      const interest1 = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Pitch on Opp 1");
      const interest2 = engine.expressInterest(secondaryOpp.id, requesterBiz.id, "Pitch on Opp 2");

      expect(interest1.id).not.toBe(interest2.id);
      expect(interest1.opportunity_id).toBe(primaryOpp.id);
      expect(interest2.opportunity_id).toBe(secondaryOpp.id);
    });

    it("1.5 Initial expression places deal in Stage 1 (Acknowledging) with partner contacts shielded", () => {
      const interest = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Initial Pitch");
      const payload = engine.exportEvaluationPayload(interest.id);

      const stageInfo = getExchangeStageDetails(payload);
      expect(stageInfo.stageNum).toBe(1);
      expect(stageInfo.stageLabel).toBe("Stage 1: Acknowledging");
      expect(stageInfo.isCompleted).toBe(false);

      // Contact coordinates must remain completely hidden
      const revealed = engine.getRevealedContactDetails(interest.id, requesterBiz.id);
      expect(revealed.email).toBeNull();
      expect(revealed.phone).toBeNull();
      expect(revealed.linkedin).toBeNull();
    });

    it("1.6 Dual acknowledgement gateway: Stage 2 is unlocked ONLY when BOTH parties acknowledge", () => {
      const interest = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Initial Pitch");
      // Requester already auto-acknowledged upon submission
      expect(interest.requester_acknowledged_at).toBeTruthy();
      expect(interest.owner_acknowledged_at).toBeNull();

      // Stage must still be Stage 1 before Owner acknowledges
      let payload = engine.exportEvaluationPayload(interest.id);
      expect(getExchangeStageDetails(payload).stageNum).toBe(1);

      // Owner acknowledges
      engine.acknowledgeProcess(interest.id, ownerBiz.id);
      payload = engine.exportEvaluationPayload(interest.id);

      // Now Stage 2 is unlocked
      expect(getExchangeStageDetails(payload).stageNum).toBe(2);
      expect(getExchangeStageDetails(payload).stageLabel).toBe("Stage 2: Active Negotiation");
    });

    it("1.7 Follow-up cooldown: Enforces 2-hour minimum wait and 24-hour rate limit", () => {
      const interest = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Initial Pitch");
      const initialAckTime = new Date(interest.requester_acknowledged_at!).getTime();

      // Attempt immediate follow-up (30 mins after ack) -> Should Fail
      expect(() => {
        engine.sendFollowUp(interest.id, requesterBiz.id, initialAckTime + 30 * 60 * 1000);
      }).toThrowError(/Follow-up cooldown active: Must wait at least 2 hours/);

      // Follow-up after 2.5 hours -> Should Succeed
      expect(() => {
        engine.sendFollowUp(interest.id, requesterBiz.id, initialAckTime + 2.5 * 3600 * 1000);
      }).not.toThrow();

      // Immediate second follow-up (1 hour later) -> Should Fail 24-hour rate limit
      expect(() => {
        engine.sendFollowUp(interest.id, requesterBiz.id, initialAckTime + 3.5 * 3600 * 1000);
      }).toThrowError(/Follow-up rate limit active: Must wait 24 hours/);

      // Follow-up after 28 hours from ack (25.5 hours after previous follow-up) -> Should Succeed
      expect(() => {
        engine.sendFollowUp(interest.id, requesterBiz.id, initialAckTime + 28 * 3600 * 1000);
      }).not.toThrow();
    });

    it("1.8 Early withdrawal / decline blocks progression to negotiation", () => {
      const interest = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Initial Pitch");
      engine.declineInterest(interest.id, ownerBiz.id);
      expect(interest.status).toBe("declined");

      expect(() => {
        engine.createProposal({
          interestId: interest.id,
          proposingBusinessId: requesterBiz.id,
          exchangeType: "revenue_share",
          exchangeDetails: "15% revenue share",
        });
      }).toThrowError(/Cannot propose terms for an interest that is declined/);
    });
  });

  // ==========================================
  // STAGE 2: BILATERAL NEGOTIATION & TURN ENFORCEMENT
  // ==========================================
  describe("Stage 2 Invariants: Turn Enforcements, Counter-Proposals & Non-Circumvention", () => {
    let interestId: string;

    beforeEach(() => {
      const interest = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Initial Pitch");
      engine.acknowledgeProcess(interest.id, ownerBiz.id);
      interestId = interest.id;
    });

    it("2.1 Requesting business must submit the initial proposal (V1)", () => {
      expect(() => {
        engine.createProposal({
          interestId,
          proposingBusinessId: ownerBiz.id, // Owner trying to initiate V1
          exchangeType: "fixed_fee",
          exchangeDetails: "$10,000 upfront integration fee",
        });
      }).toThrowError("The interested business must submit the initial exchange proposal.");

      const prop1 = engine.createProposal({
        interestId,
        proposingBusinessId: requesterBiz.id,
        exchangeType: "revenue_share",
        exchangeDetails: "15% recurring revenue share",
        revenuePercentage: 15,
      });

      expect(prop1.version).toBe(1);
      expect(prop1.status).toBe("pending_response");
      expect(prop1.proposing_business_id).toBe(requesterBiz.id);
      expect(prop1.receiving_business_id).toBe(ownerBiz.id);
    });

    it("2.2 Proposer cannot accept their own proposal (Turn enforcement)", () => {
      const prop1 = engine.createProposal({
        interestId,
        proposingBusinessId: requesterBiz.id,
        exchangeType: "revenue_share",
        exchangeDetails: "15% recurring revenue share",
      });

      expect(() => {
        engine.respondToProposal({
          proposalId: prop1.id,
          respondingBusinessId: requesterBiz.id, // Requester trying to self-accept
          action: "accept",
        });
      }).toThrowError("Turn violation: Only the receiving party can respond to this proposal.");
    });

    it("2.3 Counter-proposal automatically supersedes prior proposal and updates version", () => {
      const prop1 = engine.createProposal({
        interestId,
        proposingBusinessId: requesterBiz.id,
        exchangeType: "revenue_share",
        exchangeDetails: "15% rev share",
      });

      // Owner counters with V2 (20% rev share + $2,000 setup)
      const prop2 = engine.createProposal({
        interestId,
        proposingBusinessId: ownerBiz.id,
        exchangeType: "revenue_share",
        exchangeDetails: "20% rev share + $2,000 setup fee",
        revenuePercentage: 20,
        fixedAmount: 2000,
      });

      expect(prop1.status).toBe("superseded");
      expect(prop2.version).toBe(2);
      expect(prop2.status).toBe("pending_response");
      expect(prop2.receiving_business_id).toBe(requesterBiz.id);
    });

    it("2.4 Zero coordinate leakage during Stage 2 negotiation", () => {
      engine.createProposal({
        interestId,
        proposingBusinessId: requesterBiz.id,
        exchangeType: "revenue_share",
        exchangeDetails: "15% rev share",
      });

      const payload = engine.exportEvaluationPayload(interestId);
      expect(getExchangeStageDetails(payload).stageNum).toBe(2);

      const requesterView = engine.getRevealedContactDetails(interestId, requesterBiz.id);
      const ownerView = engine.getRevealedContactDetails(interestId, ownerBiz.id);

      expect(requesterView.email).toBeNull();
      expect(requesterView.phone).toBeNull();
      expect(ownerView.email).toBeNull();
      expect(ownerView.phone).toBeNull();
    });

    it("2.5 Declining a proposal captures reason and terminates proposal without opening agreement", () => {
      const prop1 = engine.createProposal({
        interestId,
        proposingBusinessId: requesterBiz.id,
        exchangeType: "fixed_fee",
        exchangeDetails: "$1,000 fee",
      });

      const res = engine.respondToProposal({
        proposalId: prop1.id,
        respondingBusinessId: ownerBiz.id,
        action: "decline",
        declineReason: "Budget too low for enterprise SLA",
      });

      expect(res.proposal.status).toBe("declined");
      expect(res.proposal.additional_terms).toContain("Budget too low for enterprise SLA");
      expect(res.agreement).toBeUndefined();
    });
  });

  // ==========================================
  // STAGE 3: DUAL SOVEREIGN AGREEMENT & RATIFICATION
  // ==========================================
  describe("Stage 3 Invariants: Dual Ratification, State Locking & Agreement Transitions", () => {
    let interestId: string;
    let prop1Id: string;

    beforeEach(() => {
      const interest = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Initial Pitch");
      engine.acknowledgeProcess(interest.id, ownerBiz.id);
      interestId = interest.id;

      const prop = engine.createProposal({
        interestId,
        proposingBusinessId: requesterBiz.id,
        exchangeType: "revenue_share",
        exchangeDetails: "18% net revenue share",
        revenuePercentage: 18,
      });
      prop1Id = prop.id;
    });

    it("3.1 Proposal acceptance transitions exchange to Stage 3 (Mutual Agreement) in draft state", () => {
      const { proposal, agreement } = engine.respondToProposal({
        proposalId: prop1Id,
        respondingBusinessId: ownerBiz.id,
        action: "accept",
      });

      expect(proposal.status).toBe("accepted");
      expect(agreement).toBeDefined();
      expect(agreement?.status).toBe("draft");
      expect(agreement?.final_proposal_id).toBe(prop1Id);

      // Owner accepted, so owner_confirmed_at is populated, but requester_confirmed_at is pending
      expect(agreement?.owner_confirmed_at).toBeTruthy();
      expect(agreement?.requester_confirmed_at).toBeNull();

      const payload = engine.exportEvaluationPayload(interestId);
      const stageInfo = getExchangeStageDetails(payload);

      expect(stageInfo.stageNum).toBe(3);
      expect(stageInfo.stageLabel).toBe("Stage 3: Mutual Agreement");
      expect(stageInfo.isCompleted).toBe(false);
    });

    it("3.2 Single-party confirmation cannot ratify the agreement; dual signatures required", () => {
      engine.respondToProposal({
        proposalId: prop1Id,
        respondingBusinessId: ownerBiz.id,
        action: "accept",
      });

      // Attempting to request contact exchange before requester confirms should throw
      expect(() => {
        engine.requestContactShare(interestId, ownerBiz.id, "email");
      }).toThrowError(/Stage 4 Locked: Mutual agreement must be ratified/);

      // Requester ratifies agreement
      const agreement = engine.confirmAgreement(interestId, prop1Id, requesterBiz.id);
      expect(agreement.status).toBe("agreed");
      expect(agreement.agreed_at).toBeTruthy();

      const payload = engine.exportEvaluationPayload(interestId);
      const stageInfo = getExchangeStageDetails(payload);

      // Once ratified, transitions to Stage 4 (Contact Exchange)
      expect(stageInfo.stageNum).toBe(4);
      expect(stageInfo.stageLabel).toBe("Stage 4: Contact Exchange");
      expect(stageInfo.isCompleted).toBe(false); // Unsealed until at least 1 contact is exchanged
    });

    it("3.3 Stale version rejection: Prevents ratification of an outdated or superseded proposal", () => {
      engine.respondToProposal({
        proposalId: prop1Id,
        respondingBusinessId: ownerBiz.id,
        action: "accept",
      });

      expect(() => {
        engine.confirmAgreement(interestId, "prop-stale-999", requesterBiz.id);
      }).toThrowError("Stale Agreement Error: Final proposal ID mismatch.");
    });
  });

  // ==========================================
  // STAGE 4: RECIPROCAL BLINDED HANDSHAKE & COMPLETION
  // ==========================================
  describe("Stage 4 Invariants: Reciprocal Coordinate Exchange & Handshake Completion", () => {
    let interestId: string;

    beforeEach(() => {
      const interest = engine.expressInterest(primaryOpp.id, requesterBiz.id, "Initial Pitch");
      engine.acknowledgeProcess(interest.id, ownerBiz.id);
      interestId = interest.id;

      const prop = engine.createProposal({
        interestId,
        proposingBusinessId: requesterBiz.id,
        exchangeType: "revenue_share",
        exchangeDetails: "20% net revenue share",
        revenuePercentage: 20,
      });

      engine.respondToProposal({
        proposalId: prop.id,
        respondingBusinessId: ownerBiz.id,
        action: "accept",
      });

      engine.confirmAgreement(interestId, prop.id, requesterBiz.id);
    });

    it("4.1 Bilateral blinding: Requesting a contact channel does NOT unilaterally disclose it", () => {
      engine.requestContactShare(interestId, requesterBiz.id, "email");

      // Requester requested email, but Owner has NOT accepted yet
      const requesterView = engine.getRevealedContactDetails(interestId, requesterBiz.id);
      expect(requesterView.email).toBeNull();

      // Handshake is NOT complete yet
      const payload = engine.exportEvaluationPayload(interestId);
      expect(hasAtLeastOneAcceptedContact(payload)).toBe(false);
      expect(isExchangeCompleted(payload)).toBe(false);

      const stageInfo = getExchangeStageDetails(payload);
      expect(stageInfo.stageNum).toBe(4);
      expect(stageInfo.stageLabel).toBe("Stage 4: Contact Exchange");
      expect(stageInfo.isCompleted).toBe(false);
    });

    it("4.2 Single-contact mutual consent completion invariant: 1 accepted contact seals the exchange", () => {
      // Owner requests email from Requester
      engine.requestContactShare(interestId, ownerBiz.id, "email");
      // Requester accepts Owner's email request
      engine.respondToContactShare(interestId, requesterBiz.id, "email", "accept");

      const ownerView = engine.getRevealedContactDetails(interestId, ownerBiz.id);
      expect(ownerView.email).toBe("deals@apexai.dev");
      expect(ownerView.phone).toBeNull(); // Phone was not consented

      // Check authorative completion functions
      const payload = engine.exportEvaluationPayload(interestId);
      expect(hasAtLeastOneAcceptedContact(payload)).toBe(true);
      expect(isExchangeCompleted(payload)).toBe(true);

      const stageInfo = getExchangeStageDetails(payload);
      expect(stageInfo.stageNum).toBe(4);
      expect(stageInfo.stageLabel).toBe("Stage 4: Handshake Sealed");
      expect(stageInfo.isCompleted).toBe(true);
      expect(stageInfo.stateCategory).toBe("completed");
    });

    it("4.3 Multi-channel granular consent: Channels remain blinded until specifically accepted", () => {
      // Owner requests email and phone
      engine.requestContactShare(interestId, ownerBiz.id, "email");
      engine.requestContactShare(interestId, ownerBiz.id, "phone");

      // Requester accepts email but declines phone
      engine.respondToContactShare(interestId, requesterBiz.id, "email", "accept");
      engine.respondToContactShare(interestId, requesterBiz.id, "phone", "decline");

      const ownerView = engine.getRevealedContactDetails(interestId, ownerBiz.id);
      expect(ownerView.email).toBe("deals@apexai.dev");
      expect(ownerView.phone).toBeNull();
      expect(ownerView.linkedin).toBeNull();
    });

    it("4.4 Third-party access denial: Non-participating entities cannot inspect contacts", () => {
      engine.requestContactShare(interestId, ownerBiz.id, "email");
      engine.respondToContactShare(interestId, requesterBiz.id, "email", "accept");

      expect(() => {
        engine.getRevealedContactDetails(interestId, thirdPartyBiz.id);
      }).toThrowError("Access Denied: Third-party businesses cannot view exchange contacts.");
    });
  });

  // ==========================================
  // AUTHORITATIVE HELPER & EDGE CASE INVARIANTS
  // ==========================================
  describe("Exchange Status Helper & Legacy Invariants", () => {
    it("5.1 Legacy handshakes without workflow protocol are immediately recognized as completed", () => {
      const legacyPayload: ExchangeStatusEvaluationInput = {
        id: "legacy-deal-001",
        status: "accepted",
        is_legacy_handshake: true,
      };

      expect(isExchangeCompleted(legacyPayload)).toBe(true);
      const stageInfo = getExchangeStageDetails(legacyPayload);
      expect(stageInfo.stageNum).toBe(4);
      expect(stageInfo.stageLabel).toBe("Stage 4: Handshake Sealed");
      expect(stageInfo.isCompleted).toBe(true);
    });

    it("5.2 Completed status flag or handshake_sealed status immediately resolves to completed", () => {
      const completedPayload: ExchangeStatusEvaluationInput = {
        id: "deal-sealed-002",
        status: "handshake_sealed",
      };

      expect(isExchangeCompleted(completedPayload)).toBe(true);
      const stageInfo = getExchangeStageDetails(completedPayload);
      expect(stageInfo.stageNum).toBe(4);
      expect(stageInfo.isCompleted).toBe(true);
    });

    it("5.3 Null or undefined exchange payload gracefully resolves to Stage 1 Acknowledging", () => {
      expect(isExchangeCompleted(null)).toBe(false);
      expect(hasAtLeastOneAcceptedContact(null)).toBe(false);

      const stageInfo = getExchangeStageDetails(null);
      expect(stageInfo.stageNum).toBe(1);
      expect(stageInfo.stageLabel).toBe("Stage 1: Acknowledging");
      expect(stageInfo.isCompleted).toBe(false);
    });
  });
});
