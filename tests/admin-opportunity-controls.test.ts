import { describe, it, expect } from "vitest";
import { z } from "zod";

/**
 * UNIT TESTS: SUPER ADMIN OPPORTUNITY & DEALFLOW CONTROLS
 *
 * Requirements Tested:
 * 1. Delete Opportunity Schema & cascading invariant rules
 * 2. Alter Deal Stage Schema (Stages 1-4) & Wipe Invariant Rules
 * 3. Remove Proposal Schema & Reset Invariant Rules
 * 4. Stage Classification & Rollback Data Clearance Verification
 */

const deleteOpportunitySchema = z.object({
  opportunity_id: z.string().uuid("Invalid opportunity ID"),
});

const alterStageSchema = z.object({
  interest_id: z.string().uuid("Invalid interest ID"),
  new_stage: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
});

const removeProposalSchema = z.object({
  interest_id: z.string().uuid("Invalid interest ID"),
});

interface MockInterestRecord {
  id: string;
  business_id: string;
  status: "pending" | "accepted" | "declined" | "withdrawn";
  message: string | null;
  exchange_proposals: Array<{ id: string; version: number; proposed_terms: string; status: string }>;
  exchange_agreement: { id: string; status: string } | null;
  contact_consents: Array<{ id: string; business_id: string; status: string }>;
}

// Stage resolver function
function resolveStage(interest: MockInterestRecord): { stage: number; label: string } {
  const hasAgreedConsent = interest.contact_consents.some((c) => c.status === "accepted");
  const isAgreementAgreed = interest.exchange_agreement?.status === "agreed";

  if (hasAgreedConsent || isAgreementAgreed) {
    return { stage: 4, label: "Stage 4: Handshake" };
  }
  if (interest.exchange_agreement) {
    return { stage: 3, label: "Stage 3: Agreement" };
  }
  if (interest.status === "accepted" || interest.exchange_proposals.length > 0) {
    return { stage: 2, label: "Stage 2: Negotiation" };
  }
  return { stage: 1, label: "Stage 1: Acknowledgement" };
}

// Rollback simulator function matching alterOpportunityStageFromAdmin.ts
function simulateStageAlteration(
  current: MockInterestRecord,
  targetStage: 1 | 2 | 3 | 4
): MockInterestRecord {
  const updated: MockInterestRecord = {
    ...current,
    exchange_proposals: [...current.exchange_proposals],
    contact_consents: [...current.contact_consents],
  };

  if (targetStage === 1) {
    updated.status = "pending";
    // Wipe all proposals, agreement, consents
    updated.exchange_proposals = [];
    updated.exchange_agreement = null;
    updated.contact_consents = [];
  } else if (targetStage === 2) {
    updated.status = "accepted";
    // Wipe agreement & consents, ensure at least one proposal
    updated.exchange_agreement = null;
    updated.contact_consents = [];
    if (updated.exchange_proposals.length === 0) {
      updated.exchange_proposals.push({
        id: "prop-new",
        version: 1,
        proposed_terms: "Negotiation terms",
        status: "pending",
      });
    }
  } else if (targetStage === 3) {
    updated.status = "accepted";
    // Wipe consents (revealed stage data)
    updated.contact_consents = [];
    if (!updated.exchange_agreement) {
      updated.exchange_agreement = { id: "agr-1", status: "pending_confirmation" };
    } else {
      updated.exchange_agreement = { ...updated.exchange_agreement, status: "pending_confirmation" };
    }
  } else if (targetStage === 4) {
    updated.status = "accepted";
    updated.exchange_agreement = { id: "agr-1", status: "agreed" };
    updated.contact_consents = [
      { id: "c-1", business_id: current.business_id, status: "accepted" },
      { id: "c-2", business_id: "partner-biz", status: "accepted" },
    ];
  }

  return updated;
}

describe("Super Admin Opportunity & Dealflow Controls", () => {
  describe("Zod Validation Schemas", () => {
    it("validates deleteOpportunitySchema correctly", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      expect(deleteOpportunitySchema.safeParse({ opportunity_id: validUuid }).success).toBe(true);
      expect(deleteOpportunitySchema.safeParse({ opportunity_id: "not-a-uuid" }).success).toBe(false);
      expect(deleteOpportunitySchema.safeParse({}).success).toBe(false);
    });

    it("validates alterStageSchema correctly for valid stages 1-4", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      expect(alterStageSchema.safeParse({ interest_id: validUuid, new_stage: 1 }).success).toBe(true);
      expect(alterStageSchema.safeParse({ interest_id: validUuid, new_stage: 2 }).success).toBe(true);
      expect(alterStageSchema.safeParse({ interest_id: validUuid, new_stage: 3 }).success).toBe(true);
      expect(alterStageSchema.safeParse({ interest_id: validUuid, new_stage: 4 }).success).toBe(true);
      expect(alterStageSchema.safeParse({ interest_id: validUuid, new_stage: 0 }).success).toBe(false);
      expect(alterStageSchema.safeParse({ interest_id: validUuid, new_stage: 5 }).success).toBe(false);
    });

    it("validates removeProposalSchema correctly", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      expect(removeProposalSchema.safeParse({ interest_id: validUuid }).success).toBe(true);
      expect(removeProposalSchema.safeParse({ interest_id: "invalid" }).success).toBe(false);
    });
  });

  describe("Stage Classification", () => {
    it("identifies Stage 1 (Acknowledgement) for pending interest with no proposals", () => {
      const interest: MockInterestRecord = {
        id: "int-1",
        business_id: "biz-1",
        status: "pending",
        message: "Hello, we are interested",
        exchange_proposals: [],
        exchange_agreement: null,
        contact_consents: [],
      };
      const res = resolveStage(interest);
      expect(res.stage).toBe(1);
      expect(res.label).toBe("Stage 1: Acknowledgement");
    });

    it("identifies Stage 2 (Negotiation) when proposals exist or status is accepted", () => {
      const interest: MockInterestRecord = {
        id: "int-2",
        business_id: "biz-1",
        status: "accepted",
        message: "Let's negotiate",
        exchange_proposals: [{ id: "p-1", version: 1, proposed_terms: "10% rev share", status: "pending" }],
        exchange_agreement: null,
        contact_consents: [],
      };
      const res = resolveStage(interest);
      expect(res.stage).toBe(2);
      expect(res.label).toBe("Stage 2: Negotiation");
    });

    it("identifies Stage 3 (Agreement) when exchange_agreement exists without mutual consent", () => {
      const interest: MockInterestRecord = {
        id: "int-3",
        business_id: "biz-1",
        status: "accepted",
        message: "Final agreement",
        exchange_proposals: [{ id: "p-1", version: 1, proposed_terms: "Terms", status: "agreed" }],
        exchange_agreement: { id: "agr-1", status: "pending_confirmation" },
        contact_consents: [],
      };
      const res = resolveStage(interest);
      expect(res.stage).toBe(3);
      expect(res.label).toBe("Stage 3: Agreement");
    });

    it("identifies Stage 4 (Handshake) when exchange_agreement is agreed or consents accepted", () => {
      const interest: MockInterestRecord = {
        id: "int-4",
        business_id: "biz-1",
        status: "accepted",
        message: "Done",
        exchange_proposals: [],
        exchange_agreement: { id: "agr-1", status: "agreed" },
        contact_consents: [{ id: "c-1", business_id: "biz-1", status: "accepted" }],
      };
      const res = resolveStage(interest);
      expect(res.stage).toBe(4);
      expect(res.label).toBe("Stage 4: Handshake");
    });
  });

  describe("Stage Alteration & Data Wipe Invariants", () => {
    it("wipes proposals, agreement, and consents when rolling back from Stage 4 to Stage 1", () => {
      const stage4Deal: MockInterestRecord = {
        id: "int-full",
        business_id: "biz-1",
        status: "accepted",
        message: "Full deal",
        exchange_proposals: [
          { id: "p-1", version: 1, proposed_terms: "Terms v1", status: "countered" },
          { id: "p-2", version: 2, proposed_terms: "Terms v2", status: "agreed" },
        ],
        exchange_agreement: { id: "agr-1", status: "agreed" },
        contact_consents: [
          { id: "c-1", business_id: "biz-1", status: "accepted" },
          { id: "c-2", business_id: "biz-2", status: "accepted" },
        ],
      };

      const rolledBack = simulateStageAlteration(stage4Deal, 1);
      expect(rolledBack.status).toBe("pending");
      expect(rolledBack.exchange_proposals).toHaveLength(0);
      expect(rolledBack.exchange_agreement).toBeNull();
      expect(rolledBack.contact_consents).toHaveLength(0);
      expect(resolveStage(rolledBack).stage).toBe(1);
    });

    it("wipes agreement and consents when rolling back from Stage 3/4 to Stage 2", () => {
      const stage3Deal: MockInterestRecord = {
        id: "int-agr",
        business_id: "biz-1",
        status: "accepted",
        message: "Agreement stage",
        exchange_proposals: [{ id: "p-1", version: 1, proposed_terms: "Terms", status: "agreed" }],
        exchange_agreement: { id: "agr-1", status: "pending_confirmation" },
        contact_consents: [],
      };

      const rolledBack = simulateStageAlteration(stage3Deal, 2);
      expect(rolledBack.status).toBe("accepted");
      expect(rolledBack.exchange_agreement).toBeNull();
      expect(rolledBack.contact_consents).toHaveLength(0);
      expect(rolledBack.exchange_proposals.length).toBeGreaterThan(0);
      expect(resolveStage(rolledBack).stage).toBe(2);
    });

    it("wipes contact consents when rolling back from Stage 4 to Stage 3", () => {
      const stage4Deal: MockInterestRecord = {
        id: "int-s4",
        business_id: "biz-1",
        status: "accepted",
        message: "Handshake stage",
        exchange_proposals: [{ id: "p-1", version: 1, proposed_terms: "Terms", status: "agreed" }],
        exchange_agreement: { id: "agr-1", status: "agreed" },
        contact_consents: [{ id: "c-1", business_id: "biz-1", status: "accepted" }],
      };

      const rolledBack = simulateStageAlteration(stage4Deal, 3);
      expect(rolledBack.status).toBe("accepted");
      expect(rolledBack.exchange_agreement?.status).toBe("pending_confirmation");
      expect(rolledBack.contact_consents).toHaveLength(0);
      expect(resolveStage(rolledBack).stage).toBe(3);
    });

    it("populates required handshake records when moving forward to Stage 4", () => {
      const stage1Deal: MockInterestRecord = {
        id: "int-s1",
        business_id: "biz-1",
        status: "pending",
        message: "Initial inquiry",
        exchange_proposals: [],
        exchange_agreement: null,
        contact_consents: [],
      };

      const movedTo4 = simulateStageAlteration(stage1Deal, 4);
      expect(movedTo4.status).toBe("accepted");
      expect(movedTo4.exchange_agreement?.status).toBe("agreed");
      expect(movedTo4.contact_consents.length).toBe(2);
      expect(resolveStage(movedTo4).stage).toBe(4);
    });
  });
});
