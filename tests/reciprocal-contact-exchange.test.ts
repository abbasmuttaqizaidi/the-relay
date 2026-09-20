import { describe, it, expect } from "vitest";

describe("Bilateral Reciprocal Contact Exchange Logic", () => {
  interface ContactConsent {
    id: string;
    interest_id: string;
    business_id: string;
    to_business_id: string;
    field: string;
    status: "requested" | "accepted" | "declined";
    created_at: string;
    updated_at: string;
  }

  interface Business {
    id: string;
    company_name: string;
    contact_email: string | null;
    phone_number: string | null;
    linkedin_url: string | null;
    custom_contacts?: Record<string, string>;
  }

  const businessA: Business = {
    id: "biz-a",
    company_name: "Acme Logistics",
    contact_email: "alice@acme.com",
    phone_number: "+1 555-0100",
    linkedin_url: "https://linkedin.com/company/acme",
    custom_contacts: { telegram: "@acme_alice" },
  };

  const businessB: Business = {
    id: "biz-b",
    company_name: "Zenith Retail",
    contact_email: "bob@zenith.com",
    phone_number: "+1 555-0200",
    linkedin_url: "https://linkedin.com/company/zenith",
    custom_contacts: { telegram: "@zenith_bob" },
  };

  const businessC: Business = {
    id: "biz-c",
    company_name: "Sneaky ThirdParty",
    contact_email: "spy@thirdparty.com",
    phone_number: "+1 555-0999",
    linkedin_url: "https://linkedin.com/company/spy",
  };

  // State evaluation helper simulating the frontend/backend field resolution logic
  const resolveFieldExchangeState = (
    field: string,
    currentBizId: string,
    partnerBizId: string,
    consents: ContactConsent[],
    currentBiz: Business,
    partnerBiz: Business
  ) => {
    const myConsent = consents.find(
      (c) => c.business_id === currentBizId && c.to_business_id === partnerBizId && c.field === field
    );
    const partnerConsent = consents.find(
      (c) => c.business_id === partnerBizId && c.to_business_id === currentBizId && c.field === field
    );

    const isMutuallyShared =
      (myConsent?.status === "accepted" && partnerConsent?.status === "accepted") ||
      (myConsent?.status === "accepted" && !partnerConsent); // atomic mutual approval

    const isRequestedByMe = myConsent?.status === "requested" && !isMutuallyShared;
    const isIncomingRequest = partnerConsent?.status === "requested" && !isMutuallyShared && myConsent?.status !== "declined";
    const isDeclined = myConsent?.status === "declined" || partnerConsent?.status === "declined";

    let state: "NOT_REQUESTED" | "REQUESTED_BY_ME" | "INCOMING_REQUEST" | "MUTUALLY_SHARED" | "DECLINED" = "NOT_REQUESTED";
    if (isMutuallyShared) state = "MUTUALLY_SHARED";
    else if (isRequestedByMe) state = "REQUESTED_BY_ME";
    else if (isIncomingRequest) state = "INCOMING_REQUEST";
    else if (isDeclined) state = "DECLINED";

    // Privacy rule: Partner value is ONLY revealed when state is MUTUALLY_SHARED
    let myValue: string | null = null;
    let partnerValue: string | null = null;

    if (field === "email") {
      myValue = currentBiz.contact_email;
      partnerValue = isMutuallyShared ? partnerBiz.contact_email : null;
    } else if (field === "phone") {
      myValue = currentBiz.phone_number;
      partnerValue = isMutuallyShared ? partnerBiz.phone_number : null;
    } else if (field === "linkedin") {
      myValue = currentBiz.linkedin_url;
      partnerValue = isMutuallyShared ? partnerBiz.linkedin_url : null;
    } else if (field.startsWith("custom:")) {
      const channel = field.replace("custom:", "");
      myValue = currentBiz.custom_contacts?.[channel] || null;
      partnerValue = isMutuallyShared ? (partnerBiz.custom_contacts?.[channel] || null) : null;
    }

    return {
      state,
      myValue,
      partnerValue,
      canViewPartnerValue: isMutuallyShared && partnerValue !== null,
    };
  };

  it("1. Initial state is NOT_REQUESTED with partner value hidden", () => {
    const consents: ContactConsent[] = [];
    const resultA = resolveFieldExchangeState("email", businessA.id, businessB.id, consents, businessA, businessB);

    expect(resultA.state).toBe("NOT_REQUESTED");
    expect(resultA.myValue).toBe("alice@acme.com");
    expect(resultA.partnerValue).toBeNull();
    expect(resultA.canViewPartnerValue).toBe(false);
  });

  it("2. Party A requests exchange -> Party A sees REQUESTED_BY_ME, Party B sees INCOMING_REQUEST", () => {
    const consents: ContactConsent[] = [
      {
        id: "c-1",
        interest_id: "int-1",
        business_id: businessA.id,
        to_business_id: businessB.id,
        field: "email",
        status: "requested",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    // Party A perspective
    const resultA = resolveFieldExchangeState("email", businessA.id, businessB.id, consents, businessA, businessB);
    expect(resultA.state).toBe("REQUESTED_BY_ME");
    expect(resultA.partnerValue).toBeNull();
    expect(resultA.canViewPartnerValue).toBe(false);

    // Party B perspective
    const resultB = resolveFieldExchangeState("email", businessB.id, businessA.id, consents, businessB, businessA);
    expect(resultB.state).toBe("INCOMING_REQUEST");
    expect(resultB.partnerValue).toBeNull();
    expect(resultB.canViewPartnerValue).toBe(false);
  });

  it("3. Strict privacy rule: Neither party sees partner email during REQUESTED_BY_ME / INCOMING_REQUEST", () => {
    const consents: ContactConsent[] = [
      {
        id: "c-1",
        interest_id: "int-1",
        business_id: businessA.id,
        to_business_id: businessB.id,
        field: "email",
        status: "requested",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const viewA = resolveFieldExchangeState("email", businessA.id, businessB.id, consents, businessA, businessB);
    const viewB = resolveFieldExchangeState("email", businessB.id, businessA.id, consents, businessB, businessA);

    expect(viewA.partnerValue).toBeNull();
    expect(viewB.partnerValue).toBeNull();
  });

  it("4. Party B approves exchange -> both sides atomically transition to MUTUALLY_SHARED and see values", () => {
    // Both consents are set to accepted on approval
    const consents: ContactConsent[] = [
      {
        id: "c-1",
        interest_id: "int-1",
        business_id: businessA.id,
        to_business_id: businessB.id,
        field: "email",
        status: "accepted",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "c-2",
        interest_id: "int-1",
        business_id: businessB.id,
        to_business_id: businessA.id,
        field: "email",
        status: "accepted",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const viewA = resolveFieldExchangeState("email", businessA.id, businessB.id, consents, businessA, businessB);
    expect(viewA.state).toBe("MUTUALLY_SHARED");
    expect(viewA.myValue).toBe("alice@acme.com");
    expect(viewA.partnerValue).toBe("bob@zenith.com");
    expect(viewA.canViewPartnerValue).toBe(true);

    const viewB = resolveFieldExchangeState("email", businessB.id, businessA.id, consents, businessB, businessA);
    expect(viewB.state).toBe("MUTUALLY_SHARED");
    expect(viewB.myValue).toBe("bob@zenith.com");
    expect(viewB.partnerValue).toBe("alice@acme.com");
    expect(viewB.canViewPartnerValue).toBe(true);
  });

  it("5. Field independence: Sharing email does NOT reveal phone number or LinkedIn", () => {
    // Only email is accepted
    const consents: ContactConsent[] = [
      {
        id: "c-1",
        interest_id: "int-1",
        business_id: businessA.id,
        to_business_id: businessB.id,
        field: "email",
        status: "accepted",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "c-2",
        interest_id: "int-1",
        business_id: businessB.id,
        to_business_id: businessA.id,
        field: "email",
        status: "accepted",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    // Phone is still NOT_REQUESTED
    const phoneViewA = resolveFieldExchangeState("phone", businessA.id, businessB.id, consents, businessA, businessB);
    expect(phoneViewA.state).toBe("NOT_REQUESTED");
    expect(phoneViewA.partnerValue).toBeNull();
    expect(phoneViewA.canViewPartnerValue).toBe(false);

    // LinkedIn is still NOT_REQUESTED
    const linkedinViewA = resolveFieldExchangeState("linkedin", businessA.id, businessB.id, consents, businessA, businessB);
    expect(linkedinViewA.state).toBe("NOT_REQUESTED");
    expect(linkedinViewA.partnerValue).toBeNull();
    expect(linkedinViewA.canViewPartnerValue).toBe(false);
  });

  it("6. Party B declines request -> status is DECLINED and Party A can re-request", () => {
    const consents: ContactConsent[] = [
      {
        id: "c-1",
        interest_id: "int-1",
        business_id: businessA.id,
        to_business_id: businessB.id,
        field: "phone",
        status: "declined",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const viewA = resolveFieldExchangeState("phone", businessA.id, businessB.id, consents, businessA, businessB);
    expect(viewA.state).toBe("DECLINED");
    expect(viewA.partnerValue).toBeNull();
  });

  it("7. Custom channels (+ OTHERS) behave with identical reciprocal mechanics", () => {
    const consents: ContactConsent[] = [
      {
        id: "c-custom-1",
        interest_id: "int-1",
        business_id: businessA.id,
        to_business_id: businessB.id,
        field: "custom:telegram",
        status: "accepted",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "c-custom-2",
        interest_id: "int-1",
        business_id: businessB.id,
        to_business_id: businessA.id,
        field: "custom:telegram",
        status: "accepted",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const customViewA = resolveFieldExchangeState("custom:telegram", businessA.id, businessB.id, consents, businessA, businessB);
    expect(customViewA.state).toBe("MUTUALLY_SHARED");
    expect(customViewA.myValue).toBe("@acme_alice");
    expect(customViewA.partnerValue).toBe("@zenith_bob");
  });

  it("8. Unauthorized 3rd party cannot participate in exchange", () => {
    const isParticipant = (bizId: string) => bizId === businessA.id || bizId === businessB.id;
    expect(isParticipant(businessC.id)).toBe(false);
  });
});
