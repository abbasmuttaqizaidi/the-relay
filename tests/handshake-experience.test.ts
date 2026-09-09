import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Handshake Experience & Mutual Introduction Logic", () => {
  // Mock data representing the entities
  const businessA_Owner = {
    id: "biz-a-id",
    company_name: "Alpha Dynamics",
    industry: "Logistics",
    hq_location: "Mumbai, India",
    status: "approved",
    website: "alphadynamics.com",
    description: "Pan-India freight network and warehousing.",
    contact_email: "contact@alphadynamics.com",
    owner_user_id: "user-a",
    owner: { email: "owner-a@alphadynamics.com" },
  };

  const businessB_Requester = {
    id: "biz-b-id",
    company_name: "Beta Retailers",
    industry: "E-Commerce",
    hq_location: "Delhi, India",
    status: "approved",
    website: "betaretail.com",
    description: "D2C omnichannel retail platform.",
    contact_email: "hello@betaretail.com",
    owner_user_id: "user-b",
    owner: { email: "owner-b@betaretail.com" },
  };

  const businessC_Unrelated = {
    id: "biz-c-id",
    company_name: "Gamma Software",
    industry: "SaaS",
    hq_location: "Bengaluru, India",
    status: "approved",
    website: "gammasoftware.io",
    description: "B2B SaaS suite.",
    contact_email: "hi@gammasoftware.io",
    owner_user_id: "user-c",
    owner: { email: "owner-c@gammasoftware.io" },
  };

  const opportunity = {
    id: "opp-123",
    business_id: businessA_Owner.id,
    opportunity_number: "OPP-501",
    title: "Looking for Regional Warehousing Partners",
    description: "Seeking 20,000 sqft warehouse capacity in Western Region.",
    category: "Logistics / Distribution",
    industry: "Supply Chain",
    location: "Mumbai & Pune",
    status: "active",
    business: businessA_Owner,
  };

  // Helper simulating server-side getRequestById authorization and email sanitization
  const simulateGetRequestById = (interest: any, requestingBusinessId: string) => {
    // Check authorization: only participants can access
    if (
      interest.requesting_business_id !== requestingBusinessId &&
      interest.opportunity.business_id !== requestingBusinessId
    ) {
      throw new Error("Forbidden: You do not have permission to view this request.");
    }

    // Deep copy
    const cloned = JSON.parse(JSON.stringify(interest));

    // Server-side email sanitization rule: Only reveal emails if status is accepted
    if (cloned.status !== "accepted") {
      cloned.requesting_business.contact_email = null;
      if (cloned.requesting_business.owner) cloned.requesting_business.owner.email = null;
      cloned.opportunity.business.contact_email = null;
      if (cloned.opportunity.business.owner) cloned.opportunity.business.owner.email = null;
    }

    return cloned;
  };

  // Helper simulating accepting an interest
  const simulateAcceptInterest = (
    interest: any,
    acceptingBusinessId: string,
    onNotify?: (notif: any) => void,
    onEmail?: (emailData: any) => void,
  ) => {
    if (interest.opportunity.business_id !== acceptingBusinessId) {
      throw new Error("Forbidden: You can only accept requests for your own opportunities.");
    }
    if (interest.status !== "pending") {
      throw new Error(`Cannot accept interest that is already ${interest.status}.`);
    }

    const updated = {
      ...interest,
      status: "accepted",
      updated_at: new Date().toISOString(),
    };

    if (onNotify) {
      onNotify({
        user_id: interest.requesting_business.owner_user_id,
        title: "Handshake Complete",
        description: `${interest.opportunity.business.company_name} accepted your interest in "${interest.opportunity.title}". You can now contact them directly by email.`,
      });
      onNotify({
        user_id: interest.opportunity.business.owner_user_id,
        title: "Handshake Complete",
        description: `You accepted ${interest.requesting_business.company_name}'s interest in "${interest.opportunity.title}". You can now contact them directly by email.`,
      });
    }

    if (onEmail) {
      const requesterEmail =
        interest.requesting_business.contact_email || interest.requesting_business.owner?.email;
      const ownerEmail =
        interest.opportunity.business.contact_email || interest.opportunity.business.owner?.email;

      onEmail({
        toEmail: requesterEmail,
        acceptingCompanyName: interest.opportunity.business.company_name,
        acceptingBusinessEmail: ownerEmail,
        opportunityTitle: interest.opportunity.title,
        pitchMessage: interest.message,
      });
    }

    return updated;
  };

  let pendingInterest: any;

  beforeEach(() => {
    pendingInterest = {
      id: "interest-789",
      opportunity_id: opportunity.id,
      requesting_business_id: businessB_Requester.id,
      message: "We operate 3 warehouse hubs in Western India and have spare capacity ready.",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      opportunity: JSON.parse(JSON.stringify(opportunity)),
      requesting_business: JSON.parse(JSON.stringify(businessB_Requester)),
    };
  });

  // 1. Pending Interest → email is NOT exposed
  it("1. Pending Interest: email is NOT exposed to either business before acceptance", () => {
    const asRequester = simulateGetRequestById(pendingInterest, businessB_Requester.id);
    expect(asRequester.opportunity.business.contact_email).toBeNull();
    expect(asRequester.opportunity.business.owner.email).toBeNull();

    const asOwner = simulateGetRequestById(pendingInterest, businessA_Owner.id);
    expect(asOwner.requesting_business.contact_email).toBeNull();
    expect(asOwner.requesting_business.owner.email).toBeNull();
  });

  // 2. Owner accepts Interest → status becomes accepted
  it("2. Owner accepts Interest: status transitions to accepted and triggers Handshake notifications", () => {
    const notifications: any[] = [];
    const emails: any[] = [];

    const accepted = simulateAcceptInterest(
      pendingInterest,
      businessA_Owner.id,
      (n) => notifications.push(n),
      (e) => emails.push(e),
    );

    expect(accepted.status).toBe("accepted");
    expect(notifications).toHaveLength(2);
    expect(notifications[0].title).toBe("Handshake Complete");
    expect(notifications[0].description).toContain("Alpha Dynamics accepted your interest");
    expect(notifications[1].title).toBe("Handshake Complete");

    expect(emails).toHaveLength(1);
    expect(emails[0].toEmail).toBe("hello@betaretail.com");
    expect(emails[0].acceptingCompanyName).toBe("Alpha Dynamics");
    expect(emails[0].acceptingBusinessEmail).toBe("contact@alphadynamics.com");
  });

  // 3. Requester can view Handshake after acceptance
  it("3. Requester can view Handshake after acceptance", () => {
    const acceptedInterest = { ...pendingInterest, status: "accepted" };
    const result = simulateGetRequestById(acceptedInterest, businessB_Requester.id);
    expect(result).toBeDefined();
    expect(result.status).toBe("accepted");
  });

  // 4. Owner can view Handshake after acceptance
  it("4. Owner can view Handshake after acceptance", () => {
    const acceptedInterest = { ...pendingInterest, status: "accepted" };
    const result = simulateGetRequestById(acceptedInterest, businessA_Owner.id);
    expect(result).toBeDefined();
    expect(result.status).toBe("accepted");
  });

  // 5. Both businesses can see each other's email after acceptance
  it("5. Mutual Email Reveal: both businesses can see each other's email after acceptance", () => {
    const acceptedInterest = { ...pendingInterest, status: "accepted" };

    // Requester views owner's email
    const requesterView = simulateGetRequestById(acceptedInterest, businessB_Requester.id);
    const ownerEmail =
      requesterView.opportunity.business.contact_email ||
      requesterView.opportunity.business.owner?.email;
    expect(ownerEmail).toBe("contact@alphadynamics.com");

    // Owner views requester's email
    const ownerView = simulateGetRequestById(acceptedInterest, businessA_Owner.id);
    const requesterEmail =
      ownerView.requesting_business.contact_email || ownerView.requesting_business.owner?.email;
    expect(requesterEmail).toBe("hello@betaretail.com");
  });

  // 6. Unrelated businesses cannot access either email
  it("6. Unrelated businesses cannot access the Handshake or any contact emails", () => {
    const acceptedInterest = { ...pendingInterest, status: "accepted" };
    expect(() => {
      simulateGetRequestById(acceptedInterest, businessC_Unrelated.id);
    }).toThrow("Forbidden: You do not have permission to view this request.");
  });

  // 7. Original Opportunity context is displayed
  it("7. Original Opportunity context (title, number, category, description, location) is preserved", () => {
    const acceptedInterest = { ...pendingInterest, status: "accepted" };
    const view = simulateGetRequestById(acceptedInterest, businessB_Requester.id);

    expect(view.opportunity.title).toBe("Looking for Regional Warehousing Partners");
    expect(view.opportunity.opportunity_number).toBe("OPP-501");
    expect(view.opportunity.category).toBe("Logistics / Distribution");
    expect(view.opportunity.description).toContain("20,000 sqft warehouse capacity");
    expect(view.opportunity.location).toBe("Mumbai & Pune");
  });

  // 8. Original Interest pitch is displayed
  it("8. Original Interest pitch is preserved and displayed; handles empty pitch gracefully", () => {
    const acceptedWithPitch = { ...pendingInterest, status: "accepted" };
    const viewWithPitch = simulateGetRequestById(acceptedWithPitch, businessA_Owner.id);
    expect(viewWithPitch.message).toBe(
      "We operate 3 warehouse hubs in Western India and have spare capacity ready.",
    );

    const acceptedWithoutPitch = { ...pendingInterest, status: "accepted", message: null };
    const viewWithoutPitch = simulateGetRequestById(acceptedWithoutPitch, businessA_Owner.id);
    const displayPitch = viewWithoutPitch.message?.trim() || "No additional message was provided.";
    expect(displayPitch).toBe("No additional message was provided.");
  });

  // 9. Accepted request appears as Handshake Complete in Requests
  it("9. Accepted request appears as Handshake Complete with 'View Handshake' action", () => {
    const acceptedInterest = { ...pendingInterest, status: "accepted" };
    const isAccepted = acceptedInterest.status === "accepted";
    const statusLabel = isAccepted ? "Handshake Complete" : "Pending";
    const actionLabel = isAccepted ? "View Handshake" : "Review Pitch";

    expect(statusLabel).toBe("Handshake Complete");
    expect(actionLabel).toBe("View Handshake");
  });

  // 10. Declined/withdrawn requests do not expose email
  it("10. Declined and Withdrawn requests do NOT expose private emails", () => {
    const declinedInterest = { ...pendingInterest, status: "declined" };
    const declinedView = simulateGetRequestById(declinedInterest, businessA_Owner.id);
    expect(declinedView.requesting_business.contact_email).toBeNull();
    expect(declinedView.requesting_business.owner.email).toBeNull();

    const withdrawnInterest = { ...pendingInterest, status: "withdrawn" };
    const withdrawnView = simulateGetRequestById(withdrawnInterest, businessB_Requester.id);
    expect(withdrawnView.opportunity.business.contact_email).toBeNull();
    expect(withdrawnView.opportunity.business.owner.email).toBeNull();
  });

  // 11. Expired/closed Opportunities do not invalidate an existing accepted Handshake
  it("11. Expired or closed opportunities do NOT invalidate an existing accepted Handshake", () => {
    const acceptedInterestWithClosedOpp = {
      ...pendingInterest,
      status: "accepted",
      opportunity: {
        ...opportunity,
        status: "closed",
        expires_at: new Date(Date.now() - 86400000).toISOString(), // expired yesterday
      },
    };

    // The handshake remains valid
    const view = simulateGetRequestById(acceptedInterestWithClosedOpp, businessB_Requester.id);
    expect(view.status).toBe("accepted");
    expect(view.opportunity.status).toBe("closed");

    // Contact emails remain accessible to both parties
    const ownerEmail =
      view.opportunity.business.contact_email || view.opportunity.business.owner?.email;
    expect(ownerEmail).toBe("contact@alphadynamics.com");
  });

  // 12. Role detection correctly distinguishes "Accepted by you" vs "Sent by you · Accepted"
  it("12. Role detection distinguishes whether the user accepted or sent the request", () => {
    const acceptedInterest = { ...pendingInterest, status: "accepted" };

    // Scenario A: Current user is the Opportunity Owner (accepted incoming request)
    const currentBusinessA = businessA_Owner.id;
    const isOwnerA = currentBusinessA === acceptedInterest.opportunity.business_id;
    const badgeLabelA = isOwnerA ? "Accepted by you" : "Sent by you · Accepted";
    const backRouteA = isOwnerA ? "/requests/incoming" : "/requests/sent";
    const pitchHeaderA = isOwnerA
      ? `Pitch from ${acceptedInterest.requesting_business.company_name}`
      : "Your Submitted Pitch";

    expect(isOwnerA).toBe(true);
    expect(badgeLabelA).toBe("Accepted by you");
    expect(backRouteA).toBe("/requests/incoming");
    expect(pitchHeaderA).toBe("Pitch from Beta Retailers");

    // Scenario B: Current user is the Requester / Pitch Sender (sent request that got accepted)
    const currentBusinessB = businessB_Requester.id;
    const isOwnerB = currentBusinessB === acceptedInterest.opportunity.business_id;
    const badgeLabelB = isOwnerB ? "Accepted by you" : "Sent by you · Accepted";
    const backRouteB = isOwnerB ? "/requests/incoming" : "/requests/sent";
    const pitchHeaderB = isOwnerB
      ? `Pitch from ${acceptedInterest.opportunity.business.company_name}`
      : "Your Submitted Pitch";

    expect(isOwnerB).toBe(false);
    expect(badgeLabelB).toBe("Sent by you · Accepted");
    expect(backRouteB).toBe("/requests/sent");
    expect(pitchHeaderB).toBe("Your Submitted Pitch");
  });
});
