import { z } from "zod";

export const MAX_DIRECT_RECIPIENTS = 100;

export function parseDirectEmailRecipients(input: string): string[] {
  const entries = input
    .split(/[\s,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const unique = [...new Set(entries)];
  if (unique.length > MAX_DIRECT_RECIPIENTS) {
    throw new Error(`Send to at most ${MAX_DIRECT_RECIPIENTS} addresses at a time.`);
  }

  const invalid = unique.filter((email) => !z.string().email().safeParse(email).success);
  if (invalid.length > 0) {
    throw new Error(`Invalid email address(es): ${invalid.slice(0, 5).join(", ")}`);
  }
  return unique;
}