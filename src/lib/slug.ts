import { prisma } from "../db/prisma.server";

/**
 * Converts a text title into a URL-friendly slug.
 * Removes non-alphanumeric chars, replaces spaces with hyphens, trims dashes,
 * and restricts length to a reasonable maximum.
 */
export function generateBaseSlug(title: string): string {
  if (!title) return "insight";

  const slug = title
    .toLowerCase()
    .trim()
    // Replace accented/diacritic characters
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Replace non-alphanumeric characters with hyphens
    .replace(/[^a-z0-9\s-]/g, "")
    // Replace spaces and consecutive hyphens with single hyphen
    .replace(/[\s-]+/g, "-")
    // Trim leading/trailing hyphens
    .replace(/^-+|-+$/g, "");

  // Max 80 characters, cutting at hyphen boundary if possible
  if (slug.length <= 80) {
    return slug || "insight";
  }

  const truncated = slug.slice(0, 80);
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
    const existing = await prisma.question.findUnique({
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
    const existing = await prisma.knowledgeInsight.findUnique({
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
