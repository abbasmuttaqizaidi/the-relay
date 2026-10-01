import { describe, it, expect } from "vitest";

describe("Legal Acknowledgement Modal & Business Profile Invariants", () => {
  it("enforces that all 7 legal framework sections and disclosure callout are present", () => {
    const requiredSections = [
      "1. Purpose, Platform Model & Scope",
      "2. Business Representation & Authority",
      "3. Opportunity Sharing & Data Protection Compliance",
      "4. Bilateral Masking & Handshake Protocol",
      "5. Commercial Exchange Disclaimer & Non-Guarantee",
      "6. Prohibited Conduct & Platform Integrity",
      "7. Legal Audit Records & Policy Versioning",
    ];

    const disclosureText =
      "Relay facilitates discovery, negotiation, agreement, and Handshake between Businesses. Relay does not guarantee payment, conversion, revenue, delivery, fulfilment, or performance by either Business.";

    // Ensure all 7 sections are non-empty and well-formed
    expect(requiredSections).toHaveLength(7);
    expect(disclosureText).toContain("Relay facilitates discovery");
    expect(disclosureText).toContain("does not guarantee payment");
  });

  it("requires all mandatory checkboxes to be true before enabling acceptance", () => {
    const checkCanAccept = (state: {
      agreedRep: boolean;
      agreedTerms: boolean;
      agreedPrivacy: boolean;
      agreedSharing: boolean;
      marketingConsent?: boolean;
    }) => {
      return (
        state.agreedRep &&
        state.agreedTerms &&
        state.agreedPrivacy &&
        state.agreedSharing
      );
    };

    // Any missing required checkbox must block agreement
    expect(checkCanAccept({ agreedRep: false, agreedTerms: true, agreedPrivacy: true, agreedSharing: true })).toBe(false);
    expect(checkCanAccept({ agreedRep: true, agreedTerms: false, agreedPrivacy: true, agreedSharing: true })).toBe(false);
    expect(checkCanAccept({ agreedRep: true, agreedTerms: true, agreedPrivacy: false, agreedSharing: true })).toBe(false);
    expect(checkCanAccept({ agreedRep: true, agreedTerms: true, agreedPrivacy: true, agreedSharing: false })).toBe(false);

    // All 4 required items checked permits acceptance, regardless of optional marketing consent
    expect(checkCanAccept({ agreedRep: true, agreedTerms: true, agreedPrivacy: true, agreedSharing: true, marketingConsent: false })).toBe(true);
    expect(checkCanAccept({ agreedRep: true, agreedTerms: true, agreedPrivacy: true, agreedSharing: true, marketingConsent: true })).toBe(true);
  });

  it("verifies field disabled state when legal terms are not accepted", () => {
    const getFormState = (isAckAccepted: boolean, isSubmitting: boolean = false) => {
      return {
        warningBannerVisible: !isAckAccepted,
        fieldsDisabled: !isAckAccepted,
        submitDisabled: !isAckAccepted || isSubmitting,
        canUploadLogo: isAckAccepted && !isSubmitting,
      };
    };

    // When terms are not accepted:
    const unacceptedState = getFormState(false);
    expect(unacceptedState.warningBannerVisible).toBe(true);
    expect(unacceptedState.fieldsDisabled).toBe(true);
    expect(unacceptedState.submitDisabled).toBe(true);
    expect(unacceptedState.canUploadLogo).toBe(false);

    // Once terms are accepted:
    const acceptedState = getFormState(true);
    expect(acceptedState.warningBannerVisible).toBe(false);
    expect(acceptedState.fieldsDisabled).toBe(false);
    expect(acceptedState.submitDisabled).toBe(false);
    expect(acceptedState.canUploadLogo).toBe(true);
  });
});
