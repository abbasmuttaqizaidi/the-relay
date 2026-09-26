import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates company initials based on naming rules:
 * - If the first word has exactly 3 letters (e.g., "DHL Solutions", "IBM Corp", "BWS Studio"): Returns the 3-letter word directly (e.g., "DHL", "IBM", "BWS").
 * - If 1 word:
 *   - <= 3 letters: Returns full uppercase word (e.g., "X" -> "X", "Go" -> "GO", "DHL" -> "DHL").
 *   - > 3 letters: First 2 characters (e.g., "Acme" -> "AC", "Google" -> "GO", "Stripe" -> "ST").
 * - If 2+ words (and first word is not 3 letters): First character of the first 2 words only (e.g., "Bulyam Web Studio" -> "BW", "Apex Services" -> "AS").
 */
export function getCompanyInitials(name?: string | null): string {
  if (!name || !name.trim()) return "CO";

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "CO";

  const firstWord = words[0];

  // If the first word has exactly 3 letters, return the full 3-letter abbreviation
  if (firstWord.length === 3) {
    return firstWord.toUpperCase();
  }

  // Single word case
  if (words.length === 1) {
    if (firstWord.length >= 2) {
      return firstWord.slice(0, 2).toUpperCase();
    }
    return firstWord.toUpperCase();
  }

  // 2 or more words: first character of first 2 words only
  const first = words[0][0] || "";
  const second = words[1][0] || "";
  return (first + second).toUpperCase();
}

/**
 * Calculates a stable, realistic base view count for an opportunity based on its ID and interest count.
 * Typically 15x-30x the pitch/interest volume + deterministic hash.
 */
export function calculateBaseViews(oppId: string, interestedCount: number = 0): number {
  let hash = 0;
  for (let i = 0; i < oppId.length; i++) {
    hash = (hash << 5) - hash + oppId.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const base = Math.max(1, interestedCount) * 24 + (positiveHash % 60) + 48;
  return base;
}

/**
 * Calculates a dynamic, realistic Median Response Time that changes pseudo-randomly every 2 hours.
 * Ensures all sessions during the same 2-hour window see a consistent value, and shifts organically every 2 hours.
 */
export function getDynamicMedianResponseTime(timestamp: number = Date.now()): string {
  // 2-hour time window in milliseconds (2 * 60 * 60 * 1000 = 7,200,000 ms)
  const twoHourSlot = Math.floor(timestamp / (2 * 60 * 60 * 1000));
  
  // Deterministic pseudo-random formula for the 2-hour slot
  let t = (twoHourSlot ^ 0x6D2B79F5) + 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const rnd = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  
  // Produces realistic B2B turn-around hours between 2.1h and 4.6h with 1 decimal precision
  const hours = (2.1 + rnd * 2.5).toFixed(1);
  return `${hours}h`;
}

/**
 * Formats a date into a human-friendly relative time string (e.g. "5m ago", "2h ago", "Yesterday").
 */
export function formatTimeAgo(dateInput: string | Date | undefined): string {
  if (!dateInput) return "Recently";
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (isNaN(diffMs) || diffMs < 0) return "Just now";
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
