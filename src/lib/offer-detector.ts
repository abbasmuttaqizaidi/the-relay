export type PostIntent = "OPPORTUNITY" | "OFFER" | "AMBIGUOUS";

export interface DetectionResult {
  intent: PostIntent;
  confidence: number;
  matchedPhrases: string[];
  reason?: string;
}

// Strong phrases indicating someone is looking for / seeking / collaborating (Opportunity)
const OPPORTUNITY_PATTERNS: RegExp[] = [
  /\blooking for\b/i,
  /\bseeking\b/i,
  /\bin search of\b/i,
  /\bwe need\b/i,
  /\bneed an?\b/i,
  /\bneeds an?\b/i,
  /\bwanted\b/i,
  /\bhiring\b/i,
  /\blooking to hire\b/i,
  /\blooking to collaborate\b/i,
  /\bpartner(?:s)? wanted\b/i,
  /\blooking for partner(?:s)?\b/i,
  /\bseeking partner(?:s)?\b/i,
  /\blooking for (?:an?|agencies|vendors|distributors|developers|consultants|solutions?|systems?)\b/i,
  /\bseeking (?:an?|agencies|vendors|distributors|developers|consultants|solutions?|systems?)\b/i,
  /\brequest for proposal\b/i,
  /\brfp\b/i,
  /\blooking to invest\b/i,
  /\bseeking investment\b/i,
  /\bseeking advice\b/i,
  /\bseeking advisor(?:s)?\b/i,
  /\blooking to onboard partner(?:s)?\b/i,
  /\bopen to partner(?:s)?\b/i,
  /\bwe are looking for\b/i,
  /\bwe are seeking\b/i,
  /\bcan help us\b/i,
  /\bhelp us (?:build|scale|distribute|implement|reach)\b/i,
];

// Strong phrases indicating someone is selling / promoting their own product or service (Offer / Sale / Ad)
const OFFER_PATTERNS: RegExp[] = [
  /^(?:we\s+)?providing\b/i,
  /\bwe provide\b/i,
  /\bi provide\b/i,
  /\bproviding our\b/i,
  /\bproviding a\b/i,
  /^(?:we\s+)?selling\b/i,
  /\bwe sell\b/i,
  /\bfor sale\b/i,
  /\bbuy (?:our|now|this)\b/i,
  /\bpurchase our\b/i,
  /^(?:we\s+)?offering\b/i,
  /\bwe offer\b/i,
  /\boffering our\b/i,
  /\boffering a\b/i,
  /\bour (?:software|platform|app|tool) (?:provides|helps|allows|features|enables)\b/i,
  /\bour (?:services|agency) (?:include|provides|delivers)\b/i,
  /\bhire us\b/i,
  /\bhire our team\b/i,
  /\bbook a (?:demo|call with us)\b/i,
  /\bpricing starts at\b/i,
  /\bsubscription for\b/i,
  /\bdiscount on our\b/i,
  /\bget \d+%\s*off\b/i,
  /\btry our (?:software|platform|product)\b/i,
  /\bwe build and deliver for clients\b/i,
  /\bspecial offer\b/i,
  /\bexclusive deal\b/i,
];

/**
 * Classifies whether text intent is an Offer, Business Opportunity, or Ambiguous.
 * 
 * Rules:
 * - If clear collaboration / seeking intent is present (e.g. "Looking for a business partner for our Lead Execution System"),
 *   it is an OPPORTUNITY.
 * - If promoting/selling intent is present without explicit collaboration/need context
 *   (e.g. "Providing Lead Execution System (no CRM)"), it is flagged as an OFFER.
 * - If neither or balanced/unclear, returns AMBIGUOUS.
 */
export function detectPostIntent(
  title: string,
  description: string,
  _category?: string
): DetectionResult {
  const cleanTitle = (title || "").trim();
  const cleanDesc = (description || "").trim();
  const combined = `${cleanTitle}\n${cleanDesc}`;

  if (!cleanTitle && !cleanDesc) {
    return { intent: "AMBIGUOUS", confidence: 0, matchedPhrases: [] };
  }

  const oppMatches: string[] = [];
  for (const pat of OPPORTUNITY_PATTERNS) {
    const match = combined.match(pat);
    if (match) {
      oppMatches.push(match[0]);
    }
  }

  const offerMatches: string[] = [];
  for (const pat of OFFER_PATTERNS) {
    const match = combined.match(pat);
    if (match) {
      offerMatches.push(match[0]);
    }
  }

  // Check title prefix specifically
  const titleStartsProviding = /^(providing|offering|selling)\b/i.test(cleanTitle);

  // If title explicitly starts with "Providing", "Offering", "Selling" and oppMatches are low
  if (titleStartsProviding && oppMatches.length === 0) {
    return {
      intent: "OFFER",
      confidence: 0.95,
      matchedPhrases: offerMatches.length ? offerMatches : [cleanTitle.split(" ")[0]],
      reason: "The title indicates promoting or providing a product/service rather than seeking a partner or collaboration.",
    };
  }

  // If there are opportunity matches and NO offer matches
  if (oppMatches.length > 0 && offerMatches.length === 0) {
    return {
      intent: "OPPORTUNITY",
      confidence: 0.9,
      matchedPhrases: oppMatches,
      reason: "The post explicitly describes seeking a partner, provider, hire, or collaboration.",
    };
  }

  // If there are offer matches and NO opportunity matches
  if (offerMatches.length > 0 && oppMatches.length === 0) {
    return {
      intent: "OFFER",
      confidence: 0.85,
      matchedPhrases: offerMatches,
      reason: "The post appears to describe a product, software, or service your business sells or provides.",
    };
  }

  // If both exist, examine which is the primary subject in the title
  if (oppMatches.length > 0 && offerMatches.length > 0) {
    // E.g. "Looking for a business partner for our Lead Execution System"
    const titleIsOpportunity = OPPORTUNITY_PATTERNS.some((pat) => pat.test(cleanTitle));
    const titleIsOffer = OFFER_PATTERNS.some((pat) => pat.test(cleanTitle));

    if (titleIsOpportunity && !titleIsOffer) {
      return {
        intent: "OPPORTUNITY",
        confidence: 0.8,
        matchedPhrases: oppMatches,
        reason: "The opportunity intent in the title indicates a search for collaboration.",
      };
    }

    if (titleIsOffer && !titleIsOpportunity) {
      return {
        intent: "OFFER",
        confidence: 0.8,
        matchedPhrases: offerMatches,
        reason: "The title focuses on providing an offer or sale.",
      };
    }

    // If ambiguous between the two:
    return {
      intent: "AMBIGUOUS",
      confidence: 0.5,
      matchedPhrases: [...oppMatches, ...offerMatches],
      reason: "Post contains both seeking language and promotional details.",
    };
  }

  // Fallback if neither matched
  return {
    intent: "AMBIGUOUS",
    confidence: 0.3,
    matchedPhrases: [],
    reason: "No strong indicators of either Offer or Opportunity detected.",
  };
}
