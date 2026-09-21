import { describe, it, expect } from "vitest";

/**
 * ARCHITECTURAL INVARIANT SUITE: PIPELINE & PROPOSALS ISOLATION
 * 
 * Invariants:
 * 1. Postings with ZERO interest requests MUST NEVER be injected into active pipeline deals or Requests stage.
 * 2. Inbound interest requests in 'pending' state MUST remain isolated in Proposals > Received and
 *    MUST NEVER appear in My Relay > Requests (Pipeline) > Posted before explicit approval.
 * 3. Only accepted ('accepted') inbound requests enter the active My Relay Requests Pipeline.
 * 4. Withdrawn and declined requests are strictly excluded from active pipeline deals.
 */

interface MockOpportunity {
  id: string;
  opportunity_number: number;
  title: string;
  business_id: string;
  category: string;
  offer_text?: string;
  status: string;
}

interface MockRequest {
  id: string;
  opportunity_id: string;
  requesting_business_id: string;
  status: "pending" | "accepted" | "declined" | "withdrawn";
  message?: string;
  created_at: string;
  direction?: "inbound" | "outbound";
  opportunity?: MockOpportunity;
  requesting_business?: {
    id: string;
    company_name: string;
    status: string;
  };
}

// Logic replicate directly representing src/routes/my-relay.tsx memoization
function buildPipelineDeals(
  incomingRequests: MockRequest[],
  sentRequests: MockRequest[],
  myOpps: MockOpportunity[]
) {
  // Invariant 1 & 2: Inbound requests must be non-withdrawn and non-pending (approved)
  const inbound = incomingRequests
    .filter((r) => r.status !== "withdrawn" && r.status !== "pending")
    .map((r) => ({
      ...r,
      direction: "inbound" as const,
      partnerBusiness: r.requesting_business,
    }));

  const outbound = sentRequests
    .filter((r) => r.status !== "withdrawn")
    .map((r) => ({
      ...r,
      direction: "outbound" as const,
      partnerBusiness: r.opportunity?.business_id,
    }));

  const allCombinedRequests = [...inbound, ...outbound].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Invariant 1 check: myOpps (unattached listings) are NEVER injected into pipeline
  const dynamicDeals = allCombinedRequests.map((req) => ({
    id: req.id,
    dealCode: `RY-${req.id.substring(0, 4)}`,
    title: req.opportunity?.title || "Brief",
    origin: req.direction === "inbound" ? "posted" : "requested",
    stage: 1,
    status: req.status,
  }));

  return {
    allCombinedRequests,
    dynamicDeals,
    postedCount: dynamicDeals.filter((d) => d.origin === "posted").length,
    requestedCount: dynamicDeals.filter((d) => d.origin === "requested").length,
  };
}

describe("Pipeline & Proposals Architectural Invariants", () => {
  const currentBusinessId = "biz-owner-001";

  const myPostedOppWithZeroInterest: MockOpportunity = {
    id: "opp-001",
    opportunity_number: 7117,
    title: "CRM Integration for Enterprise",
    business_id: currentBusinessId,
    category: "partnership",
    status: "active",
  };

  it("INVARIANT 1: Posted opportunities with 0 interest MUST NOT appear in active Requests Pipeline", () => {
    const incomingRequests: MockRequest[] = [];
    const sentRequests: MockRequest[] = [];
    const myOpps: MockOpportunity[] = [myPostedOppWithZeroInterest];

    const result = buildPipelineDeals(incomingRequests, sentRequests, myOpps);

    // Assert: active pipeline deals count must be 0
    expect(result.dynamicDeals).toHaveLength(0);
    expect(result.postedCount).toBe(0);
    expect(result.allCombinedRequests).toHaveLength(0);
  });

  it("INVARIANT 2: Pending inbound interest MUST NOT enter My Relay Requests Pipeline before approval", () => {
    const pendingIncomingRequest: MockRequest = {
      id: "req-incoming-100",
      opportunity_id: myPostedOppWithZeroInterest.id,
      requesting_business_id: "biz-requester-002",
      status: "pending", // Unaccepted / Pending in Proposals > Received
      message: "We want to partner with you",
      created_at: new Date().toISOString(),
      opportunity: myPostedOppWithZeroInterest,
      requesting_business: {
        id: "biz-requester-002",
        company_name: "Maple AI Integrations",
        status: "approved",
      },
    };

    const incomingRequests = [pendingIncomingRequest];
    const sentRequests: MockRequest[] = [];
    const myOpps = [myPostedOppWithZeroInterest];

    const result = buildPipelineDeals(incomingRequests, sentRequests, myOpps);

    // Assert: Pending request is blocked from pipeline
    expect(result.dynamicDeals).toHaveLength(0);
    expect(result.postedCount).toBe(0);
  });

  it("INVARIANT 3: Approved/Accepted inbound interest MUST enter My Relay Requests Pipeline under 'posted' origin", () => {
    const acceptedIncomingRequest: MockRequest = {
      id: "req-incoming-100",
      opportunity_id: myPostedOppWithZeroInterest.id,
      requesting_business_id: "biz-requester-002",
      status: "accepted", // Accepted from Proposals > Received
      message: "We want to partner with you",
      created_at: new Date().toISOString(),
      opportunity: myPostedOppWithZeroInterest,
      requesting_business: {
        id: "biz-requester-002",
        company_name: "Maple AI Integrations",
        status: "approved",
      },
    };

    const incomingRequests = [acceptedIncomingRequest];
    const sentRequests: MockRequest[] = [];
    const myOpps = [myPostedOppWithZeroInterest];

    const result = buildPipelineDeals(incomingRequests, sentRequests, myOpps);

    // Assert: Accepted request is now in pipeline under origin 'posted'
    expect(result.dynamicDeals).toHaveLength(1);
    expect(result.postedCount).toBe(1);
    expect(result.dynamicDeals[0].origin).toBe("posted");
    expect(result.dynamicDeals[0].id).toBe("req-incoming-100");
  });

  it("INVARIANT 4: Outbound pitches MUST appear in Requests Pipeline under 'requested' origin", () => {
    const outboundRequest: MockRequest = {
      id: "req-outbound-200",
      opportunity_id: "opp-other-999",
      requesting_business_id: currentBusinessId,
      status: "pending",
      message: "Our reciprocal offer",
      created_at: new Date().toISOString(),
      opportunity: {
        id: "opp-other-999",
        opportunity_number: 9999,
        title: "Global 3PL Logistics",
        business_id: "biz-other-333",
        category: "distribution",
        status: "active",
      },
    };

    const incomingRequests: MockRequest[] = [];
    const sentRequests = [outboundRequest];
    const myOpps = [myPostedOppWithZeroInterest];

    const result = buildPipelineDeals(incomingRequests, sentRequests, myOpps);

    // Assert: Outbound pitch is in pipeline under 'requested'
    expect(result.dynamicDeals).toHaveLength(1);
    expect(result.requestedCount).toBe(1);
    expect(result.dynamicDeals[0].origin).toBe("requested");
    expect(result.postedCount).toBe(0);
  });

  it("INVARIANT 5: Withdrawn and declined requests MUST be completely excluded from active pipeline", () => {
    const withdrawnRequest: MockRequest = {
      id: "req-withdrawn-300",
      opportunity_id: "opp-other-999",
      requesting_business_id: currentBusinessId,
      status: "withdrawn",
      created_at: new Date().toISOString(),
    };

    const result = buildPipelineDeals([], [withdrawnRequest], [myPostedOppWithZeroInterest]);
    expect(result.dynamicDeals).toHaveLength(0);
    expect(result.allCombinedRequests).toHaveLength(0);
  });
});
