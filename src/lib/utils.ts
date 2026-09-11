import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates company initials based on naming rules:
 * - 1 word: First 2 characters (e.g., "Acme" -> "AC", "Google" -> "GO")
 * - 2 words: First character of both words (e.g., "Bulyam Web" -> "BW")
 * - 2+ words: First character of the first 2 words only (e.g., "Bulyam Web Studio" -> "BW")
 */
export function getCompanyInitials(name?: string | null): string {
  if (!name || !name.trim()) return "CO";

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "CO";

  if (words.length === 1) {
    const singleWord = words[0];
    if (singleWord.length >= 2) {
      return singleWord.slice(0, 2).toUpperCase();
    }
    return singleWord.toUpperCase();
  }

  // 2 or more words: first letters of first 2 words
  const first = words[0][0] || "";
  const second = words[1][0] || "";
  return (first + second).toUpperCase();
}

