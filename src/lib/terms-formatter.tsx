import * as React from "react";

/**
 * Normalizes and formats delivery methods.
 * Recognizes "Other", "others", "OTHER", "OTHERS" with optional custom string values.
 */
export interface FormattedDeliveryMethod {
  label: string;
  isOther: boolean;
  customValue?: string;
}

export function isOtherDeliveryMethod(method: string): boolean {
  if (!method) return false;
  const trimmed = method.trim().toLowerCase();
  return (
    trimmed === "other" ||
    trimmed === "others" ||
    trimmed.startsWith("other:") ||
    trimmed.startsWith("others:") ||
    trimmed.startsWith("other (") ||
    trimmed.startsWith("others (")
  );
}

export function formatDeliveryMethods(
  methods?: (string | { method?: string; custom?: string })[] | string | null,
  fallbackOtherText?: string
): FormattedDeliveryMethod[] {
  if (!methods) return [];

  let rawList: (string | { method?: string; custom?: string })[] = [];
  if (Array.isArray(methods)) {
    rawList = methods;
  } else if (typeof methods === "string") {
    try {
      const parsed = JSON.parse(methods);
      rawList = Array.isArray(parsed) ? parsed : [methods];
    } catch {
      rawList = methods.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  return rawList
    .map((item) => {
      if (typeof item === "object" && item !== null) {
        const baseMethod = item.method || "Other";
        const isOther = isOtherDeliveryMethod(baseMethod);
        const custom = item.custom || fallbackOtherText;
        return {
          label: isOther && custom ? `Other: ${custom}` : baseMethod,
          isOther,
          customValue: custom,
        };
      }

      if (typeof item === "string") {
        const trimmed = item.trim();
        if (!trimmed) return null;

        const isOther = isOtherDeliveryMethod(trimmed);
        if (isOther) {
          // Check if it has a custom string like "Other: Custom Webhook" or "Other (Custom Webhook)"
          const colonMatch = trimmed.match(/^others?:\s*(.+)$/i);
          const parenMatch = trimmed.match(/^others?\s*\((.+)\)$/i);
          const customStr = colonMatch ? colonMatch[1] : parenMatch ? parenMatch[1] : fallbackOtherText;

          return {
            label: customStr ? `Other: ${customStr}` : "Other",
            isOther: true,
            customValue: customStr,
          };
        }

        return {
          label: trimmed,
          isOther: false,
        };
      }

      return null;
    })
    .filter((x): x is FormattedDeliveryMethod => x !== null);
}

/**
 * Normalizes value categories from dropdown (array of strings, no "other" custom string).
 */
export function formatValueCategories(
  categories?: string[] | string | null
): string[] {
  if (!categories) return [];
  if (Array.isArray(categories)) {
    return categories.map((c) => String(c).trim()).filter(Boolean);
  }
  if (typeof categories === "string") {
    try {
      const parsed = JSON.parse(categories);
      if (Array.isArray(parsed)) {
        return parsed.map((c) => String(c).trim()).filter(Boolean);
      }
    } catch {
      // split by comma if comma separated string
      return categories.split(",").map((c) => c.trim()).filter(Boolean);
    }
    return [categories.trim()].filter(Boolean);
  }
  return [];
}

/**
 * Safely highlights matching strings within a text string.
 * Finds occurrences of highlightedTerms inside text and replaces non-highlighted text
 * with highlighted <mark> tokens.
 */
export function highlightMatchedText(
  text: string | null | undefined,
  highlightedTerms?: string[] | null,
  highlightClassName = "bg-yellow-200 text-slate-900 px-1 py-0.5 rounded-xs font-normal"
): React.ReactNode {
  if (!text) return null;
  if (!highlightedTerms || highlightedTerms.length === 0) {
    return text;
  }

  // Filter out empty or whitespace-only terms and deduplicate
  const cleanTerms = Array.from(
    new Set(
      highlightedTerms
        .map((t) => (typeof t === "string" ? t.trim() : ""))
        .filter((t) => t.length > 0)
    )
  );

  if (cleanTerms.length === 0) {
    return text;
  }

  // Sort terms by descending length so longer phrases match first before sub-phrases
  cleanTerms.sort((a, b) => b.length - a.length);

  // Escape special regex characters in terms
  const escapedTerms = cleanTerms.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  const regex = new RegExp(`(${escapedTerms.join("|")})`, "gi");
  const parts = text.split(regex);

  if (parts.length <= 1) {
    return text;
  }

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = cleanTerms.some(
          (term) => term.toLowerCase() === part.toLowerCase()
        );

        if (isMatch) {
          return (
            <mark key={index} className={highlightClassName}>
              {part}
            </mark>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

export interface ExtractedTermsMetadata {
  cleanText: string;
  highlightedTerms: string[];
  valueCategories: string[];
  deliveryMethods: FormattedDeliveryMethod[];
}

/**
 * Extracts highlighted terms, value categories, and delivery methods
 * from structured message annotations or HTML marks (handles both inline and multiline).
 */
export function extractTermsMetadataFromText(
  text?: string | null
): ExtractedTermsMetadata {
  if (!text) {
    return {
      cleanText: "",
      highlightedTerms: [],
      valueCategories: [],
      deliveryMethods: [],
    };
  }

  const highlightedTerms: string[] = [];
  const valueCategories: string[] = [];
  let deliveryMethods: FormattedDeliveryMethod[] = [];

  // Extract from HTML <mark> tags if present
  const markRegex = /<mark[^>]*>(.*?)<\/mark>/gi;
  let markMatch;
  while ((markMatch = markRegex.exec(text)) !== null) {
    if (markMatch[1] && markMatch[1].trim()) {
      highlightedTerms.push(markMatch[1].trim());
    }
  }

  // Extract from [Value Categories]: cat1, cat2
  const valCatsMatch = text.match(/\[Value Categories\]:\s*([^\[\n]+)/i);
  if (valCatsMatch && valCatsMatch[1]) {
    const cats = valCatsMatch[1].split(",").map((c) => c.trim()).filter(Boolean);
    valueCategories.push(...cats);
  }

  // Extract from [Delivery Methods]: dm1, dm2
  const delMethodsMatch = text.match(/\[Delivery Methods\]:\s*([^\[\n]+)/i);
  if (delMethodsMatch && delMethodsMatch[1]) {
    deliveryMethods = formatDeliveryMethods(delMethodsMatch[1]);
  }

  // Extract from [Key Highlighted Terms]: term1; term2
  const keyTermsMatch = text.match(/\[Key Highlighted Terms\]:\s*([^\[\n]+)/i);
  if (keyTermsMatch && keyTermsMatch[1]) {
    const raw = keyTermsMatch[1].trim();
    const terms = raw.includes(";")
      ? raw.split(";").map((t) => t.trim()).filter(Boolean)
      : [raw].filter(Boolean);
    highlightedTerms.push(...terms);
  }

  // Extract from Key terms: term1; term2
  const simpleKeyTermsMatch = text.match(/Key terms:\s*([^\[\n]+)/i);
  if (simpleKeyTermsMatch && simpleKeyTermsMatch[1]) {
    const raw = simpleKeyTermsMatch[1].trim();
    const terms = raw.includes(";")
      ? raw.split(";").map((t) => t.trim()).filter(Boolean)
      : [raw].filter(Boolean);
    highlightedTerms.push(...terms);
  }

  // Remove annotations cleanly even if inline (stopping before next bracket or end of string)
  const cleanText = text
    .replace(/<[^>]*>/g, "")
    .replace(/\[Value Categories\]:\s*([^\[\n]+)/gi, "")
    .replace(/\[Delivery Methods\]:\s*([^\[\n]+)/gi, "")
    .replace(/\[Key Highlighted Terms\]:\s*([^\[\n]+)/gi, "")
    .replace(/\[Accepted Terms\]:\s*([^\[\n]+)/gi, "")
    .replace(/Key terms:\s*([^\[\n]+)/gi, "")
    .trim();

  return {
    cleanText,
    highlightedTerms: Array.from(new Set(highlightedTerms)),
    valueCategories: formatValueCategories(valueCategories),
    deliveryMethods,
  };
}

/**
 * Backward compatibility wrapper for extractHighlightedTermsFromText.
 */
export function extractHighlightedTermsFromText(
  text?: string | null
): { cleanText: string; highlightedTerms: string[] } {
  const meta = extractTermsMetadataFromText(text);
  return {
    cleanText: meta.cleanText,
    highlightedTerms: meta.highlightedTerms,
  };
}
