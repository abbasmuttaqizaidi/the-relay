import { prisma } from "../db/prisma.server";

/**
 * Converts a text title into a URL-friendly slug.
 * Any non-alphanumeric characters (em dashes, punctuation, symbols) are treated as spaces,
 * intra-word apostrophes are preserved (e.g. they're, don't), spaces are replaced with hyphens,
 * and length is restricted to a reasonable maximum.
 */
export function generateBaseSlug(title: string): string {
  if (!title) return "insight";

  // 1. Normalize unicode diacritics
  let s = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // 2. Normalize smart/curly apostrophes to standard single quote
  s = s.replace(/[\u2019\u2018\u0060\u00B4]/g, "'");

  // 3. Lowercase
  s = s.toLowerCase();

  // 4. Any character other than letters, numbers, and intra-word apostrophes is treated as space.
  // First, convert apostrophes that are NOT between alphanumeric characters (e.g. quotes around words) into space
  s = s.replace(/(^|[^a-z0-9])'+|'+([^a-z0-9]|$)/g, "$1 $2");

  // Next, replace any character that is not alphanumeric or apostrophe with space
  s = s.replace(/[^a-z0-9']+/g, " ");

  // 5. Replace spaces and consecutive hyphens with single hyphen
  s = s.trim().replace(/[\s-]+/g, "-");

  // 6. Trim leading/trailing hyphens
  s = s.replace(/^-+|-+$/g, "");

  // 7. Max 100 characters, cutting at hyphen boundary if possible
  if (s.length <= 100) {
    return s || "insight";
  }

  const truncated = s.slice(0, 100);
  const lastHyphen = truncated.lastIndexOf("-");
  return (lastHyphen > 40 ? truncated.slice(0, lastHyphen) : truncated) || "insight";
}

/**
 * Generates a guaranteed unique slug for a Question.
 * If collision occurs, appends -2, -3, etc.
 */
export async function generateUniqueQuestionSlug(
  title: string,
  excludeId?: string
): Promise<string> {
  const base = generateBaseSlug(title);
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await prisma.question.findFirst({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || (excludeId && existing.id === excludeId)) {
      return candidate;
    }

    candidate = `${base}-${counter}`;
    counter++;
  }
}

/**
 * Generates a guaranteed unique slug for a Knowledge Insight.
 * If collision occurs, appends -2, -3, etc.
 */
export async function generateUniqueKnowledgeSlug(
  title: string,
  excludeId?: string
): Promise<string> {
  const base = generateBaseSlug(title);
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await prisma.knowledgeInsight.findFirst({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || (excludeId && existing.id === excludeId)) {
      return candidate;
    }

    candidate = `${base}-${counter}`;
    counter++;
  }
}

/**
 * Helper to check if a string is a valid UUID
 */
export function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str
  );
}
