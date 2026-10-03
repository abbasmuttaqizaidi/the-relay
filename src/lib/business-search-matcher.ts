/**
 * Business Search Matcher
 * 
 * Token-aware, word-boundary-aware search matching for business association.
 * Ensures precise word matching (e.g. "A H" matches "A H Mobile" or "AH Mobile",
 * but does NOT match arbitrary businesses like "Alphabet Healthcare" simply
 * because they contain the letters 'a' and 'h').
 */

export interface MatchableBusiness {
  company_name: string;
  industry?: string | null;
  hq_location?: string | null;
  website?: string | null;
  description?: string | null;
}

export interface MatchResult {
  matches: boolean;
  score: number;
}

/**
 * Normalizes text for comparison by stripping diacritics/accents, lowercasing, and trimming.
 * E.g. "Société Générale" -> "societe generale", "München" -> "munchen"
 */
export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Extracts distinct word tokens by splitting on whitespace and punctuation.
 * E.g., "A.H. Mobile, Inc." -> ["a", "h", "mobile", "inc"]
 */
export function extractWords(text: string): string[] {
  return normalizeText(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Collapses string into alphanumeric characters only without spaces or punctuation.
 * E.g., "A H Mobile" -> "ahmobile", "A.H." -> "ah"
 */
export function collapseAlphanumeric(text: string): string {
  return normalizeText(text).replace(/[^a-z0-9]/g, "");
}

/**
 * Checks if a search query matches a business entity using strict token and word-boundary rules.
 */
export function matchBusiness(
  query: string,
  business: MatchableBusiness
): MatchResult {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return { matches: true, score: 0 };
  }

  const normQuery = normalizeText(cleanQuery);
  const normName = normalizeText(business.company_name);
  const collapsedQuery = collapseAlphanumeric(cleanQuery);
  const collapsedName = collapseAlphanumeric(business.company_name);

  // 1. Exact match on company name (highest priority)
  if (normName === normQuery || collapsedName === collapsedQuery) {
    return { matches: true, score: 1000 };
  }

  // 2. Company name starts with exact query phrase
  if (normName.startsWith(normQuery)) {
    return { matches: true, score: 850 };
  }

  // Extract word tokens
  const queryTokens = extractWords(cleanQuery);
  const nameWords = extractWords(business.company_name);
  const industryWords = business.industry ? extractWords(business.industry) : [];
  const locationWords = business.hq_location ? extractWords(business.hq_location) : [];

  if (queryTokens.length === 0) {
    return { matches: false, score: 0 };
  }

  // 3. Normalized phrase match with word spacing
  // Checks if normalized name contains the exact space-separated query words sequence
  const queryPhrase = queryTokens.join(" ");
  const namePhrase = nameWords.join(" ");
  if (namePhrase === queryPhrase) {
    return { matches: true, score: 900 };
  }
  if (namePhrase.startsWith(queryPhrase + " ")) {
    return { matches: true, score: 820 };
  }
  if (namePhrase.includes(" " + queryPhrase + " ") || namePhrase.endsWith(" " + queryPhrase)) {
    return { matches: true, score: 780 };
  }

  // 4. Joined single-letter tokens matching target words
  // E.g. Query "A H" matching target word "AH",
  // or query "AH" matching target consecutive single-letter words ["a", "h"]
  if (queryTokens.length > 1 && queryTokens.every((t) => t.length === 1)) {
    const joinedSingleTokens = queryTokens.join("");
    // If target has a word exactly equal to joined single tokens (e.g. "ah" in "AH Mobile")
    if (nameWords.includes(joinedSingleTokens)) {
      return { matches: true, score: 720 };
    }
  }

  if (queryTokens.length === 1 && queryTokens[0].length >= 2) {
    // Check if target name has consecutive single-letter words that join to form this query token
    // E.g. Query "AH" and target words ["a", "h", "mobile"] -> "a" + "h" = "ah"
    const singleLetterWords = nameWords.filter((w) => w.length === 1).join("");
    if (singleLetterWords.startsWith(queryTokens[0])) {
      return { matches: true, score: 710 };
    }
  }

  // 5. Token-by-token strict word matching
  // Every token in queryTokens MUST match a distinct target word.
  // Single-letter tokens (e.g. "a", "h") MUST match an exact single-letter word (e.g. "a" matches "a"),
  // NOT arbitrary long words like "alphabet" or "healthcare".
  let nameMatches = 0;
  let otherMatches = 0;
  const usedTargetIndices = new Set<number>();

  for (const qToken of queryTokens) {
    let matched = false;

    // Try matching against company name words
    for (let i = 0; i < nameWords.length; i++) {
      if (usedTargetIndices.has(i)) continue;
      const tWord = nameWords[i];

      if (qToken.length === 1) {
        // Single character token: MUST match exact single character word
        if (tWord === qToken) {
          usedTargetIndices.add(i);
          nameMatches++;
          matched = true;
          break;
        }
      } else {
        // Multi-character token: match exact word OR prefix of word (e.g. "mob" matches "mobile")
        if (tWord === qToken || tWord.startsWith(qToken)) {
          usedTargetIndices.add(i);
          nameMatches++;
          matched = true;
          break;
        }
      }
    }

    if (matched) continue;

    // Check industry or location for remaining multi-character tokens
    if (qToken.length > 1) {
      const inIndustry = industryWords.some((w) => w === qToken || w.startsWith(qToken));
      const inLocation = locationWords.some((w) => w === qToken || w.startsWith(qToken));
      if (inIndustry || inLocation) {
        otherMatches++;
        matched = true;
      }
    }

    if (!matched) {
      // Query token was not matched to any target word
      return { matches: false, score: 0 };
    }
  }

  // All query tokens matched valid target words!
  const score = 500 + nameMatches * 50 + otherMatches * 20;
  return { matches: true, score };
}

/**
 * Filters and ranks a list of businesses by search query.
 */
export function searchAndRankBusinesses<T extends MatchableBusiness>(
  items: T[],
  query: string
): T[] {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return items;
  }

  const scored: { item: T; score: number }[] = [];

  for (const item of items) {
    const { matches, score } = matchBusiness(cleanQuery, item);
    if (matches) {
      scored.push({ item, score });
    }
  }

  // Sort descending by match score
  scored.sort((a, b) => b.score - a.score);

  return scored.map((s) => s.item);
}
