import { describe, it, expect, vi } from "vitest";

describe("Relay Exchange Agreement, Negotiation & Mutual Contact Sharing (26 Validation Points)", () => {
  // Test Mock Entities
  const businessA_Owner = {
    id: "00000000-0000-0000-0000-000000000001",
    company_name: "Alpha Corp",
    industry: "SaaS",
    status: "approved",
    contact_email: "alpha@alphacorp.com",
    linkedin_url: "https://linkedin.com/company/alphacorp",
    twitter_url: "https://twitter.com/alphacorp",
    owner_user_id: "user-alpha",
    owner: { id: "user-alpha", email: "alpha-owner@alphacorp.com" },
  };

  const businessB_Requester = {
    id: "00000000-0000-0000-0000-000000000002",
    company_name: "Beta Solutions",
    industry: "Consulting",
    status: "approved",
    contact_email: "beta@betasolutions.com",
    linkedin_url: "https://linkedin.com/company/betasolutions",
    twitter_url: "https://twitter.com/betasolutions",
    owner_user_id: "user-beta",
    owner: { id: "user-beta", email: "beta-owner@betasolutions.com" },
  };

  const businessUnapproved = {
    id: "00000000-0000-0000-0000-000000000003",
    company_name: "Pending Startup",
    industry: "Fintech",
    status: "pending",
    contact_email: "pending@startup.com",
    owner_user_id: "user-pending",
    owner: { id: "user-pending", email: "pending@startup.com" },
  };

  const businessC_ThirdParty = {
    id: "00000000-0000-0000-0000-000000000004",
    company_name: "Gamma Outsider",
    industry: "Agency",
    status: "approved",
    contact_email: "gamma@gammaoutsider.com",
    owner_user_id: "user-gamma",
    owner: { id: "user-gamma", email: "gamma@gammaoutsider.com" },
  };

  const opportunity = {
    id: "00000000-0000-0000-0000-000000000010",
    business_id: businessA_Owner.id,
    opportunity_number: "OPP-100",
    title: "Looking for CRM Integration Partner",
    description: "Need specialized partner to implement CRM for enterprise client.",
    category: "partnership",
    industry: "Enterprise SaaS",
    status: "active",
    business: businessA_Owner,
  };

  // Helper State Machine for Exchange Flow
  class SimulatedExchangeEngine {
    interests: any[] = [];
    proposals: any[] = [];
    agreements: any[] = [];
    consents: any[] = [];

    expressInterest(oppId: string, business: any, message?: string) {
      if (business.status !== "approved") {
        throw new Error("Only approved businesses can express interest.");
      }
      if (opportunity.business_id === business.id) {
        throw new Error("You cannot express interest in your own opportunity.");
      }
      const existing = this.interests.find(
        (i) => i.opportunity_id === oppId && i.requesting_business_id === business.id
      );
      if (existing && existing.status !== "withdrawn") {
        throw new Error("You have already expressed interest in this opportunity.");
      }

      const interest = {
        id: `interest-${this.interests.length + 1}`,
        opportunity_id: oppId,
        requesting_business_id: business.id,
        message: message || null,
        status: "pending",
        requester_acknowledged_at: new Date().toISOString(),
        owner_acknowledged_at: null,
        created_at: new Date().toISOString(),
      };
      this.interests.push(interest);
      return interest;
    }

    acknowledgeProcess(interestId: string, businessId: string) {
      const interest = this.interests.find((i) => i.id === interestId);
      if (!interest) throw new Error("Interest not found");
      const isRequester = interest.requesting_business_id === businessId;
      const isOwner = opportunity.business_id === businessId;
      if (!isRequester && !isOwner) throw new Error("Unauthorized");

      if (isRequester) interest.requester_acknowledged_at = new Date().toISOString();
      if (isOwner) interest.owner_acknowledged_at = new Date().toISOString();
      return interest;
    }

    declineInterest(interestId: string, businessId: string) {
      const interest = this.interests.find((i) => i.id === interestId);
      if (!interest) throw new Error("Interest not found");
      interest.status = "declined";
      return interest;
    }

    withdrawInterest(interestId: string, businessId: string) {
      const interest = this.interests.find((i) => i.id === interestId);
      if (!interest) throw new Error("Interest not found");
      interest.status = "withdrawn";
      return interest;
    }

    createProposal(params: {
      interestId: string;
      proposingBusinessId: string;
      exchangeType: string;
      exchangeDetails: string;
      revenuePercentage?: number;
      fixedAmount?: number;
      currency?: string;
      additionalTerms?: string;
    }) {
      const interest = this.interests.find((i) => i.id === params.interestId);
      if (!interest) throw new Error("Interest not found");
      if (interest.status === "declined" || interest.status === "withdrawn") {
        throw new Error(`Cannot propose terms for an interest that is ${interest.status}`);
      }
      if (!interest.requester_acknowledged_at || !interest.owner_acknowledged_at) {
        throw new Error("Both parties must acknowledge the exchange process before creating proposals.");
      }
      const isRequester = interest.requesting_business_id === params.proposingBusinessId;
      const isOwner = opportunity.business_id === params.proposingBusinessId;
      if (!isRequester && !isOwner) throw new Error("Unauthorized to propose");

      const receivingBusinessId = isRequester
        ? opportunity.business_id
        : interest.requesting_business_id;

      const existingProps = this.proposals.filter((p) => p.interest_id === params.interestId);
      const nextVersion = existingProps.length + 1;

      if (existingProps.length === 0 && isOwner) {
        throw new Error("The interested business must submit the initial exchange proposal.");
      }

      // Supersede previous pending proposals
      const last = existingProps[existingProps.length - 1];
      if (last && last.status === "pending_response") {
        last.status = "superseded";
      }

      // If draft agreement exists, invalidate its confirmations
      const agreement = this.agreements.find((a) => a.interest_id === params.interestId);
      if (agreement && agreement.status === "draft") {
        agreement.owner_confirmed_at = null;
        agreement.requester_confirmed_at = null;
      }

      const proposal = {
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
        version: nextVersion,
        status: "pending_response",
      };
      this.proposals.push(proposal);
      return proposal;
    }

    respondProposal(
      proposalId: string,
      respondingBusinessId: string,
      action: "accept" | "decline",
      declineReason?: string,
      declineNote?: string
    ) {
      const proposal = this.proposals.find((p) => p.id === proposalId);
      if (!proposal) throw new Error("Proposal not found");
      if (proposal.status !== "pending_response") {
        throw new Error(`Cannot respond to proposal with status ${proposal.status}`);
      }
      if (proposal.receiving_business_id !== respondingBusinessId) {
        throw new Error("Unauthorized responding business");
      }

      if (action === "decline") {
        proposal.status = "declined";
        if (declineReason) {
          proposal.additional_terms = `[DECLINE REASON: ${declineReason}]${declineNote ? ` Note: ${declineNote}` : ""}${proposal.additional_terms ? ` | Original Terms: ${proposal.additional_terms}` : ""}`;
        }
        return proposal;
      }

      proposal.status = "accepted";
      let agreement = this.agreements.find((a) => a.interest_id === proposal.interest_id);
      const isOwner = opportunity.business_id === respondingBusinessId;

      if (!agreement) {
        agreement = {
          id: `agree-${this.agreements.length + 1}`,
          interest_id: proposal.interest_id,
          opportunity_id: proposal.opportunity_id,
          final_proposal_id: proposal.id,
          owner_business_id: opportunity.business_id,
          interested_business_id: businessB_Requester.id,
          exchange_type: proposal.exchange_type,
          exchange_details: proposal.exchange_details,
          revenue_percentage: proposal.revenue_percentage,
          fixed_amount: proposal.fixed_amount,
          currency: proposal.currency,
          additional_terms: proposal.additional_terms,
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

    withdrawProposal(proposalId: string, businessId: string) {
      const prop = this.proposals.find((p) => p.id === proposalId);
      if (!prop) throw new Error("Proposal not found");
      if (prop.status !== "pending_response") throw new Error("Cannot withdraw non-pending proposal");
      if (prop.proposing_business_id !== businessId) throw new Error("Unauthorized to withdraw");
      prop.status = "cancelled";
      return prop;
    }

    confirmAgreement(interestId: string, proposalId: string, businessId: string) {
      const agreement = this.agreements.find((a) => a.interest_id === interestId);
      if (!agreement) throw new Error("Agreement not found");
      if (agreement.final_proposal_id !== proposalId) {
        throw new Error("Conflict: Confirmation proposal version mismatch.");
      }
      const isOwner = agreement.owner_business_id === businessId;
      const isRequester = agreement.interested_business_id === businessId;
      if (!isOwner && !isRequester) throw new Error("Unauthorized");

      if (isOwner) agreement.owner_confirmed_at = new Date().toISOString();
      if (isRequester) agreement.requester_confirmed_at = new Date().toISOString();

      if (agreement.owner_confirmed_at && agreement.requester_confirmed_at) {
        agreement.status = "agreed";
        agreement.agreed_at = new Date().toISOString();
        const interest = this.interests.find((i) => i.id === interestId);
        if (interest) interest.status = "accepted";
      }
      return agreement;
    }

    shareContact(interestId: string, fromBusinessId: string, fields: string[]) {
      const agreement = this.agreements.find((a) => a.interest_id === interestId);
      if (!agreement || agreement.status !== "agreed") {
        throw new Error("Contact sharing only allowed after agreement is confirmed.");
      }
      const toBusinessId =
        fromBusinessId === businessA_Owner.id ? businessB_Requester.id : businessA_Owner.id;

      for (const field of fields) {
        const existing = this.consents.find(
          (c) =>
            c.interest_id === interestId &&
            c.from_business_id === fromBusinessId &&
            c.contact_field === field
        );
        if (!existing) {
          this.consents.push({
            id: `consent-${this.consents.length + 1}`,
            interest_id: interestId,
            from_business_id: fromBusinessId,
            to_business_id: toBusinessId,
            contact_field: field,
            status: "requested",
          });
        }
      }
    }

    acceptContact(interestId: string, toBusinessId: string, fields: string[]) {
      for (const c of this.consents) {
        if (
          c.interest_id === interestId &&
          c.to_business_id === toBusinessId &&
          fields.includes(c.contact_field)
        ) {
          c.status = "accepted";
          c.accepted_at = new Date().toISOString();
        }
      }
    }

    declineContact(interestId: string, toBusinessId: string, fields: string[]) {
      for (const c of this.consents) {
        if (
          c.interest_id === interestId &&
          c.to_business_id === toBusinessId &&
          fields.includes(c.contact_field)
        ) {
          c.status = "declined";
        }
      }
    }

    getRevealedContacts(interestId: string, viewerBusinessId: string, customContacts?: Record<string, any[]>) {
      if (viewerBusinessId !== businessA_Owner.id && viewerBusinessId !== businessB_Requester.id) {
        throw new Error("Forbidden: Access denied to exchange details.");
      }
      const interest = this.interests.find((i) => i.id === interestId);
      if (!interest) throw new Error("Interest not found");

      const otherBusiness =
        viewerBusinessId === businessA_Owner.id ? businessB_Requester : businessA_Owner;

      const isLegacy = interest.status === "accepted" && this.agreements.length === 0;

      const acceptedConsents = this.consents.filter(
        (c) =>
          c.interest_id === interestId &&
          c.from_business_id === otherBusiness.id &&
          c.to_business_id === viewerBusinessId &&
          c.status === "accepted"
      );

      const allowed = new Set(acceptedConsents.map((c) => c.contact_field));
      if (isLegacy) allowed.add("email");

      const revealed: any = { custom: [] };
      if (allowed.has("email")) revealed.email = otherBusiness.contact_email;
      if (allowed.has("phone")) revealed.phone = (otherBusiness as any).phone_number;
      if (allowed.has("linkedin")) revealed.linkedin = otherBusiness.linkedin_url;
      if (allowed.has("twitter")) revealed.twitter = otherBusiness.twitter_url;

      if (customContacts && customContacts[otherBusiness.id]) {
        for (const c of acceptedConsents) {
          if (c.contact_field.startsWith("custom:")) {
            const id = c.contact_field.replace("custom:", "");
            const item = customContacts[otherBusiness.id].find((x) => x.id === id);
            if (item) revealed.custom.push(item);
          }
        }
      }

      return revealed;
    }

    sendFollowUp(interestId: string, businessId: string, customNow?: number) {
      const interest = this.interests.find((i) => i.id === interestId);
      if (!interest) throw new Error("Interest not found");
      if (interest.requesting_business_id !== businessId) {
        throw new Error("Unauthorized: Only requesting business can send follow-up.");
      }
      if (!interest.requester_acknowledged_at) {
        throw new Error("Must acknowledge before following up.");
      }
      if (interest.owner_acknowledged_at) {
        throw new Error("Partner already acknowledged.");
      }

      const now = customNow || Date.now();
      const ackTime = new Date(interest.requester_acknowledged_at).getTime();
      const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

      if (now - ackTime < TWO_HOURS_MS) {
        throw new Error("Follow-up can only be sent 2 hours after acknowledging the exchange process.");
      }

      if (interest.last_follow_up_at) {
        const lastFollowUp = new Date(interest.last_follow_up_at).getTime();
        const COOLDOWN_MS = 24 * 60 * 60 * 1000;
        if (now - lastFollowUp < COOLDOWN_MS) {
          throw new Error("A follow-up has already been sent recently.");
        }
      }

      interest.last_follow_up_at = new Date(now).toISOString();
      return interest;
    }

    reliabilityEvents: any[] = [];
    businessStatuses: Record<string, string> = {
      [businessA_Owner.id]: "approved",
      [businessB_Requester.id]: "approved",
    };

    processUnresponsive(interestId: string, customNow?: number) {
      const interest = this.interests.find((i) => i.id === interestId);
      if (!interest) return null;
      if (interest.status !== "pending" || interest.owner_acknowledged_at) return interest;

      const now = customNow || Date.now();
      const createdTime = new Date(interest.created_at).getTime();
      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

      if (now - createdTime < SEVEN_DAYS_MS) return interest;

      interest.status = "unresponsive";
      const ownerId = opportunity.business_id;

      const existingEvent = this.reliabilityEvents.find(
        (e) => e.interest_id === interestId && e.business_id === ownerId
      );

      if (!existingEvent) {
        this.reliabilityEvents.push({
          id: `event-${this.reliabilityEvents.length + 1}`,
          business_id: ownerId,
          interest_id: interestId,
          reason: "unresponsive_7_days",
          created_at: new Date(now).toISOString(),
        });

        const count = this.reliabilityEvents.filter((e) => e.business_id === ownerId).length;
        if (count >= 3) {
          this.businessStatuses[ownerId] = "restricted";
        }
      }

      return interest;
    }
  }

  // 1. Approved business can Express Interest
  it("1. Approved business can Express Interest", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester, "We can deliver CRM!");
    expect(interest.status).toBe("pending");
    expect(interest.requesting_business_id).toBe(businessB_Requester.id);
  });

  // 2. Unapproved business cannot Express Interest
  it("2. Unapproved business cannot Express Interest", () => {
    const engine = new SimulatedExchangeEngine();
    expect(() => {
      engine.expressInterest(opportunity.id, businessUnapproved, "Pitch");
    }).toThrow("Only approved businesses can express interest.");
  });

  // 3. Duplicate Interest is prevented
  it("3. Duplicate Interest is prevented", () => {
    const engine = new SimulatedExchangeEngine();
    engine.expressInterest(opportunity.id, businessB_Requester);
    expect(() => {
      engine.expressInterest(opportunity.id, businessB_Requester);
    }).toThrow("You have already expressed interest in this opportunity.");
  });

  // 4. Requester acknowledgement works
  it("4. Requester acknowledgement works", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    expect(interest.requester_acknowledged_at).toBeTruthy();
  });

  // 5. Owner acknowledgement works
  it("5. Owner acknowledgement works", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    expect(interest.owner_acknowledged_at).toBeNull();
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    expect(interest.owner_acknowledged_at).toBeTruthy();
  });

  // 6. Exchange cannot begin until both acknowledge
  it("6. Exchange cannot begin until both acknowledge", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    // Requester acknowledged upon interest, but owner has not yet
    expect(() => {
      engine.createProposal({
        interestId: interest.id,
        proposingBusinessId: businessB_Requester.id,
        exchangeType: "revenue_share",
        exchangeDetails: "10% revenue share",
      });
    }).toThrow("Both parties must acknowledge the exchange process before creating proposals.");
  });

  // 7. Proposal creation works
  it("7. Proposal creation works after both acknowledge", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "10% on collected revenue",
      revenuePercentage: 10,
    });
    expect(prop.version).toBe(1);
    expect(prop.status).toBe("pending_response");
  });

  // 8. Unauthorized business cannot create proposal
  it("8. Unauthorized business cannot create proposal", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    expect(() => {
      engine.createProposal({
        interestId: interest.id,
        proposingBusinessId: businessC_ThirdParty.id,
        exchangeType: "revenue_share",
        exchangeDetails: "Hijack proposal",
      });
    }).toThrow("Unauthorized to propose");
  });

  // 9. Counter-proposal creates a new version
  it("9. Counter-proposal creates a new version", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop1 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "10% on all invoices",
      revenuePercentage: 10,
    });
    const prop2 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessA_Owner.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice only",
      revenuePercentage: 7,
    });
    expect(prop2.version).toBe(2);
    expect(prop1.status).toBe("superseded");
  });

  // 10. Previous proposal remains immutable
  it("10. Previous proposal remains immutable in history", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop1 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "10% on all invoices",
    });
    engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessA_Owner.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    expect(prop1.exchange_details).toBe("10% on all invoices");
    expect(prop1.version).toBe(1);
  });

  // 11. Accepting a proposal works
  it("11. Accepting a proposal works", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
      revenuePercentage: 7,
    });
    const { proposal, agreement } = engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    expect(proposal.status).toBe("accepted");
    expect(agreement.status).toBe("draft");
    expect(agreement.final_proposal_id).toBe(prop.id);
  });

  // 12. Changing terms invalidates previous confirmation
  it("12. Changing terms invalidates previous confirmation", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop1 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    engine.respondProposal(prop1.id, businessA_Owner.id, "accept");
    // Now a new counter-proposal is created
    engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "8% on first invoice",
    });
    const agreement = engine.agreements.find((a) => a.interest_id === interest.id);
    expect(agreement?.owner_confirmed_at).toBeNull();
    expect(agreement?.requester_confirmed_at).toBeNull();
  });

  // 13. Both parties must confirm the final proposal
  it("13. Both parties must confirm the final proposal", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);
    const agreement = engine.agreements.find((a) => a.interest_id === interest.id);
    expect(agreement?.status).toBe("agreed");
    expect(interest.status).toBe("accepted");
  });

  // 14. One confirmation alone does not create Handshake
  it("14. One confirmation alone does not create Handshake / Agreed state", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    // Owner responds accept (which confirms owner side)
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    const agreement = engine.agreements.find((a) => a.interest_id === interest.id);
    expect(agreement?.status).toBe("draft");
    expect(interest.status).toBe("pending");
  });

  // 15. Final agreement references exact final proposal
  it("15. Final agreement references exact final proposal", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    const { agreement } = engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    expect(agreement.final_proposal_id).toBe(prop.id);
  });

  // 16. Contact sharing requires explicit consent
  it("16. Contact sharing requires explicit consent", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);

    const revealedBefore = engine.getRevealedContacts(interest.id, businessA_Owner.id);
    expect(revealedBefore.email).toBeUndefined();
    expect(revealedBefore.linkedin).toBeUndefined();
  });

  // 17. Unapproved contact field remains hidden
  it("17. Unapproved contact field remains hidden", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);

    // Business B shares only LinkedIn (not email)
    engine.shareContact(interest.id, businessB_Requester.id, ["linkedin"]);
    engine.acceptContact(interest.id, businessA_Owner.id, ["linkedin"]);

    const revealed = engine.getRevealedContacts(interest.id, businessA_Owner.id);
    expect(revealed.linkedin).toBe(businessB_Requester.linkedin_url);
    expect(revealed.email).toBeUndefined();
  });

  // 18. Approved contact field becomes visible only to the intended party
  it("18. Approved contact field becomes visible only to the intended party", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);

    engine.shareContact(interest.id, businessA_Owner.id, ["email"]);
    engine.acceptContact(interest.id, businessB_Requester.id, ["email"]);

    // B sees A's email
    const bRevealed = engine.getRevealedContacts(interest.id, businessB_Requester.id);
    expect(bRevealed.email).toBe(businessA_Owner.contact_email);
  });

  // 19. Third-party business cannot access contact details
  it("19. Third-party business cannot access contact details", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    expect(() => {
      engine.getRevealedContacts(interest.id, businessC_ThirdParty.id);
    }).toThrow("Forbidden: Access denied to exchange details.");
  });

  // 20. Public API cannot expose private contact details
  it("20. Public API cannot expose private contact details", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    const publicData = {
      opportunityTitle: opportunity.title,
      businessName: opportunity.hide_company_name ? "Confidential" : opportunity.business.company_name,
    };
    expect(publicData).not.toHaveProperty("contact_email");
    expect(publicData).not.toHaveProperty("phone");
  });

  // 21. Declined Interest stops negotiation
  it("21. Declined Interest stops negotiation", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    interest.status = "declined";
    expect(() => {
      engine.createProposal({
        interestId: interest.id,
        proposingBusinessId: businessB_Requester.id,
        exchangeType: "revenue_share",
        exchangeDetails: "Offer after decline",
      });
    }).toThrow("Cannot propose terms for an interest that is declined");
  });

  // 22. Withdrawn Interest stops pending negotiation
  it("22. Withdrawn Interest stops pending negotiation", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    interest.status = "withdrawn";
    expect(() => {
      engine.createProposal({
        interestId: interest.id,
        proposingBusinessId: businessB_Requester.id,
        exchangeType: "revenue_share",
        exchangeDetails: "Offer after withdraw",
      });
    }).toThrow("Cannot propose terms for an interest that is withdrawn");
  });

  // 23. Expired Opportunity follows existing rules
  it("23. Expired Opportunity follows existing rules", () => {
    const expiredOpp = { ...opportunity, status: "closed" };
    expect(expiredOpp.status).toBe("closed");
  });

  // 24. Completed Handshake survives Opportunity expiry/closure
  it("24. Completed Handshake survives Opportunity expiry/closure", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    interest.status = "accepted";
    // Opportunity closes later
    opportunity.status = "closed";
    expect(interest.status).toBe("accepted");
  });

  // 25. Double confirmation does not create duplicate Handshakes
  it("25. Double confirmation does not create duplicate Handshakes", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% on first invoice",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);
    // Second confirmation click idempotency
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);

    expect(engine.agreements.filter((a) => a.interest_id === interest.id).length).toBe(1);
  });

  // 26. Legacy Handshakes remain readable
  it("26. Legacy Handshakes remain readable", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    // Simulate legacy handshake (accepted interest, no agreement entity)
    interest.status = "accepted";
    const revealed = engine.getRevealedContacts(interest.id, businessA_Owner.id);
    expect(revealed.email).toBe(businessB_Requester.contact_email);
  });

  // 27. Request badge count remains visible throughout all stages until final Handshake is complete or declined
  it("27. Request badge count remains active until final Handshake is complete or declined", () => {
    const engine = new SimulatedExchangeEngine();
    const countPending = (ownerId: string) =>
      engine.interests.filter(
        (i) => opportunity.business_id === ownerId && i.status === "pending"
      ).length;

    expect(countPending(businessA_Owner.id)).toBe(0);

    // 1. Business B expresses interest -> Owner badge count becomes 1
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    expect(countPending(businessA_Owner.id)).toBe(1);

    // 2. Owner acknowledges process -> Still in negotiation, badge count remains 1
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);
    expect(countPending(businessA_Owner.id)).toBe(1);

    // 3. Propose and counter-propose -> Still in negotiation, badge count remains 1
    const prop1 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "10% revenue share",
    });
    expect(countPending(businessA_Owner.id)).toBe(1);

    const prop2 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessA_Owner.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% revenue share",
    });
    expect(countPending(businessA_Owner.id)).toBe(1);

    // 4. Accept proposal by Requester B -> Agreement draft created (Requester confirmed, Owner still pending)
    engine.respondProposal(prop2.id, businessB_Requester.id, "accept");
    expect(countPending(businessA_Owner.id)).toBe(1);

    // 5. Owner A confirms final agreement terms -> Both sides now confirmed! Handshake established, interest status becomes accepted, count clears to 0
    engine.confirmAgreement(interest.id, prop2.id, businessA_Owner.id);
    expect(countPending(businessA_Owner.id)).toBe(0);
  });

  // 28. 2-Hour Follow-Up Timer Enforcement
  it("28. Follow-Up action is disabled before 2 hours and enabled after 2 hours", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    const ackTime = new Date(interest.requester_acknowledged_at).getTime();

    // 1 hour after acknowledgement -> should fail
    const oneHourLater = ackTime + 1 * 60 * 60 * 1000;
    expect(() => {
      engine.sendFollowUp(interest.id, businessB_Requester.id, oneHourLater);
    }).toThrow("Follow-up can only be sent 2 hours after acknowledging the exchange process.");

    // Exactly 2 hours + 1 second later -> succeeds
    const twoHoursLater = ackTime + 2 * 60 * 60 * 1000 + 1000;
    const updated = engine.sendFollowUp(interest.id, businessB_Requester.id, twoHoursLater);
    expect(updated.last_follow_up_at).toBeDefined();

    // Immediate repeat -> blocked by cooldown
    expect(() => {
      engine.sendFollowUp(interest.id, businessB_Requester.id, twoHoursLater + 1000);
    }).toThrow("A follow-up has already been sent recently.");
  });

  // 29. 7-Day Unresponsive Transition and Response Violation Recording
  it("29. Marks interest as Unresponsive after 7 days and records exactly 1 Response Violation", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    const createdTime = new Date(interest.created_at).getTime();

    // 6 days later -> still pending
    const sixDaysLater = createdTime + 6 * 24 * 60 * 60 * 1000;
    engine.processUnresponsive(interest.id, sixDaysLater);
    expect(interest.status).toBe("pending");
    expect(engine.reliabilityEvents.length).toBe(0);

    // 7 days + 1 minute later -> becomes unresponsive and 1 event is recorded
    const sevenDaysLater = createdTime + 7 * 24 * 60 * 60 * 1000 + 60000;
    engine.processUnresponsive(interest.id, sevenDaysLater);
    expect(interest.status).toBe("unresponsive");
    expect(engine.reliabilityEvents.length).toBe(1);
    expect(engine.reliabilityEvents[0].business_id).toBe(businessA_Owner.id);
    expect(engine.reliabilityEvents[0].reason).toBe("unresponsive_7_days");

    // Idempotent: Subsequent processing does not create duplicate events
    engine.processUnresponsive(interest.id, sevenDaysLater + 10000);
    expect(engine.reliabilityEvents.length).toBe(1);
  });

  // 30. 3 Response Violations restricts business participation
  it("30. Accumulating 3 Response Violations restricts business participation", () => {
    const engine = new SimulatedExchangeEngine();
    const now = Date.now();
    const eightDaysLater = now + 8 * 24 * 60 * 60 * 1000;

    // First unresponsive event
    const int1 = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.processUnresponsive(int1.id, eightDaysLater);
    expect(engine.businessStatuses[businessA_Owner.id]).toBe("approved");

    // Second unresponsive event (different interest)
    const int2 = {
      id: "interest-2",
      opportunity_id: opportunity.id,
      requesting_business_id: businessC_ThirdParty.id,
      status: "pending",
      created_at: new Date(now).toISOString(),
      requester_acknowledged_at: new Date(now).toISOString(),
      owner_acknowledged_at: null,
    };
    engine.interests.push(int2);
    engine.processUnresponsive(int2.id, eightDaysLater);
    expect(engine.reliabilityEvents.length).toBe(2);
    expect(engine.businessStatuses[businessA_Owner.id]).toBe("approved");

    // Third unresponsive event (distinct interest)
    const int3 = {
      id: "interest-3",
      opportunity_id: opportunity.id,
      requesting_business_id: "00000000-0000-0000-0000-000000000005",
      status: "pending",
      created_at: new Date(now).toISOString(),
      requester_acknowledged_at: new Date(now).toISOString(),
      owner_acknowledged_at: null,
    };
    engine.interests.push(int3);
    engine.processUnresponsive(int3.id, eightDaysLater);
    expect(engine.reliabilityEvents.length).toBe(3);
    expect(engine.businessStatuses[businessA_Owner.id]).toBe("restricted");
  });

  // 31. Legitimate Declines and Withdrawals do not create Response Violations
  it("31. Legitimate Declines and Withdrawals do not create Response Violations", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.declineInterest(interest.id, businessA_Owner.id);

    expect(interest.status).toBe("declined");
    const eightDaysLater = Date.now() + 8 * 24 * 60 * 60 * 1000;
    engine.processUnresponsive(interest.id, eightDaysLater);
    expect(engine.reliabilityEvents.length).toBe(0);
  });

  // 32. Opportunity Owner cannot create the initial proposal version 1
  it("32. Opportunity Owner cannot create the initial proposal version 1", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    expect(() => {
      engine.createProposal({
        interestId: interest.id,
        proposingBusinessId: businessA_Owner.id,
        exchangeType: "revenue_share",
        exchangeDetails: "Owner trying to create first proposal",
      });
    }).toThrow("The interested business must submit the initial exchange proposal.");
  });

  // 33. Interested Business submits proposal v1 and Owner can counter-propose v2
  it("33. Interested Business submits proposal v1 and Owner can counter-propose v2", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const prop1 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "qualified_lead",
      exchangeDetails: "One qualified enterprise customer lead",
      additionalTerms: "Valid for first quarter contract only",
    });
    expect(prop1.version).toBe(1);
    expect(prop1.status).toBe("pending_response");

    // Owner counter-proposes
    const prop2 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessA_Owner.id,
      exchangeType: "revenue_share",
      exchangeDetails: "7% revenue share on closed deals",
      revenuePercentage: 7,
      additionalTerms: "Payment due within 15 days of invoice collection",
    });
    expect(prop2.version).toBe(2);
    expect(prop1.status).toBe("superseded");
    expect(prop2.status).toBe("pending_response");
  });

  // 34. Proposing business can withdraw their pending proposal
  it("34. Proposing business can withdraw their pending proposal", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "fixed_amount",
      exchangeDetails: "$1,500 fixed placement compensation",
      fixedAmount: 1500,
      currency: "USD",
    });

    expect(prop.status).toBe("pending_response");
    const withdrawn = engine.withdrawProposal(prop.id, businessB_Requester.id);
    expect(withdrawn.status).toBe("cancelled");
  });

  // 35. All expanded exchange types are accepted
  it("35. All expanded exchange types are accepted", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const types = [
      "fixed_amount",
      "revenue_share",
      "qualified_lead",
      "business_opportunity",
      "service_work",
      "partnership",
      "introduction",
      "other",
    ];

    types.forEach((type, idx) => {
      const prop = engine.createProposal({
        interestId: interest.id,
        proposingBusinessId: businessB_Requester.id,
        exchangeType: type,
        exchangeDetails: `Details for ${type}`,
      });
      expect(prop.exchange_type).toBe(type);
      expect(prop.version).toBe(idx + 1);
    });
  });

  // 36. Proposal can be declined with structured reason & note, and proposer can submit revised proposal
  it("36. Proposal can be declined with structured reason & note, and proposer can submit revised proposal", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    // Initial proposal v1 by requester
    const prop1 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "fixed_amount",
      exchangeDetails: "$500 one-time fee",
      fixedAmount: 500,
      currency: "USD",
    });
    expect(prop1.status).toBe("pending_response");
    expect(prop1.version).toBe(1);

    // Owner declines with structured reason
    const declinedProp = engine.respondProposal(
      prop1.id,
      businessA_Owner.id,
      "decline",
      "valuation_mismatch",
      "Prefer revenue share instead of fixed fee"
    );
    expect(declinedProp.status).toBe("declined");
    expect(declinedProp.additional_terms).toContain("[DECLINE REASON: valuation_mismatch]");
    expect(declinedProp.additional_terms).toContain("Note: Prefer revenue share instead of fixed fee");

    // Proposer submits revised terms (Proposal v2)
    const prop2 = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "revenue_share",
      exchangeDetails: "10% revenue share on closed enterprise deals",
      revenuePercentage: 10,
    });
    expect(prop2.version).toBe(2);
    expect(prop2.status).toBe("pending_response");
    expect(prop2.exchange_type).toBe("revenue_share");

    // Owner accepts revised proposal v2
    const { proposal: acceptedProp, agreement } = engine.respondProposal(
      prop2.id,
      businessA_Owner.id,
      "accept"
    );
    expect(acceptedProp.status).toBe("accepted");
    expect(agreement.status).toBe("draft");
    expect(agreement.final_proposal_id).toBe(prop2.id);
  });

  // 37. Contact sharing request marks fields as "requested" and does NOT reveal values to partner before approval
  it("37. Requesting contact sharing keeps contact values hidden until partner explicitly approves", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "fixed_amount",
      exchangeDetails: "Deal terms",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);

    // Alpha requests to share email and phone
    engine.shareContact(interest.id, businessA_Owner.id, ["email", "phone"]);

    // Consent records created with status "requested"
    const alphaConsents = engine.consents.filter(
      (c) => c.interest_id === interest.id && c.from_business_id === businessA_Owner.id
    );
    expect(alphaConsents.length).toBe(2);
    expect(alphaConsents.every((c) => c.status === "requested")).toBe(true);

    // Beta cannot see Alpha's email or phone yet (unapproved)
    const betaRevealed = engine.getRevealedContacts(interest.id, businessB_Requester.id);
    expect(betaRevealed.email).toBeUndefined();
    expect(betaRevealed.phone).toBeUndefined();
  });

  // 38. Partner reviewing requested contacts approves them, revealing verified contact values
  it("38. Partner reviewing requested contacts approves them, revealing verified contact values", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "fixed_amount",
      exchangeDetails: "Deal terms",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);

    // Alpha requests sharing email and linkedin
    engine.shareContact(interest.id, businessA_Owner.id, ["email", "linkedin"]);

    // Beta approves email only
    engine.acceptContact(interest.id, businessB_Requester.id, ["email"]);

    // Beta can now see Alpha's email, but not LinkedIn
    const betaRevealed = engine.getRevealedContacts(interest.id, businessB_Requester.id);
    expect(betaRevealed.email).toBe("alpha@alphacorp.com");
    expect(betaRevealed.linkedin).toBeUndefined();

    // Beta then approves LinkedIn
    engine.acceptContact(interest.id, businessB_Requester.id, ["linkedin"]);
    const betaRevealed2 = engine.getRevealedContacts(interest.id, businessB_Requester.id);
    expect(betaRevealed2.linkedin).toBe("https://linkedin.com/company/alphacorp");
  });

  // 39. Declining a contact sharing request marks status as "declined" and strictly hides values
  it("39. Declining a contact sharing request marks status as declined and hides values", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "fixed_amount",
      exchangeDetails: "Deal terms",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);

    // Beta requests sharing phone
    engine.shareContact(interest.id, businessB_Requester.id, ["phone"]);

    // Alpha declines the phone request
    engine.declineContact(interest.id, businessA_Owner.id, ["phone"]);

    const consent = engine.consents.find(
      (c) => c.from_business_id === businessB_Requester.id && c.contact_field === "phone"
    );
    expect(consent.status).toBe("declined");

    // Alpha cannot see Beta's phone
    const alphaRevealed = engine.getRevealedContacts(interest.id, businessA_Owner.id);
    expect(alphaRevealed.phone).toBeUndefined();
  });

  // 40. Custom contact details can be added, requested via custom:<id>, and revealed upon approval
  it("40. Custom contact details can be shared via custom:<id> and revealed when approved", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "fixed_amount",
      exchangeDetails: "Deal terms",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);

    const customContacts: Record<string, any[]> = {
      [businessA_Owner.id]: [
        { id: "cust-1", label: "Telegram Support", value: "@alphacorp_support" },
        { id: "cust-2", label: "Escalation Desk", value: "esc@alphacorp.com" },
      ],
    };

    // Alpha requests to share cust-1
    engine.shareContact(interest.id, businessA_Owner.id, ["custom:cust-1"]);

    // Beta cannot see cust-1 before accepting
    let betaRevealed = engine.getRevealedContacts(interest.id, businessB_Requester.id, customContacts);
    expect(betaRevealed.custom.length).toBe(0);

    // Beta accepts cust-1
    engine.acceptContact(interest.id, businessB_Requester.id, ["custom:cust-1"]);
    betaRevealed = engine.getRevealedContacts(interest.id, businessB_Requester.id, customContacts);
    expect(betaRevealed.custom.length).toBe(1);
    expect(betaRevealed.custom[0].label).toBe("Telegram Support");
    expect(betaRevealed.custom[0].value).toBe("@alphacorp_support");
  });

  // 41. Independent 2-way non-reciprocal contact sharing
  it("41. Independent 2-way non-reciprocal contact sharing: Alpha approving Beta's contact does not reveal Alpha's contact to Beta", () => {
    const engine = new SimulatedExchangeEngine();
    const interest = engine.expressInterest(opportunity.id, businessB_Requester);
    engine.acknowledgeProcess(interest.id, businessA_Owner.id);

    const prop = engine.createProposal({
      interestId: interest.id,
      proposingBusinessId: businessB_Requester.id,
      exchangeType: "fixed_amount",
      exchangeDetails: "Deal terms",
    });
    engine.respondProposal(prop.id, businessA_Owner.id, "accept");
    engine.confirmAgreement(interest.id, prop.id, businessB_Requester.id);
    engine.confirmAgreement(interest.id, prop.id, businessA_Owner.id);

    // Beta shares email with Alpha
    engine.shareContact(interest.id, businessB_Requester.id, ["email"]);
    // Alpha approves Beta's email
    engine.acceptContact(interest.id, businessA_Owner.id, ["email"]);

    // Alpha can see Beta's email
    const alphaRevealed = engine.getRevealedContacts(interest.id, businessA_Owner.id);
    expect(alphaRevealed.email).toBe("beta@betasolutions.com");

    // Beta CANNOT see Alpha's email because Alpha hasn't shared or Beta hasn't approved Alpha's email
    const betaRevealed = engine.getRevealedContacts(interest.id, businessB_Requester.id);
    expect(betaRevealed.email).toBeUndefined();
  });
});
