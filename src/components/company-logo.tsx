import { useState, useEffect } from "react";
import { getCompanyInitials } from "../lib/utils";

interface CompanyLogoProps {
  src?: string | null;
  name?: string | null;
  className?: string;
  fallbackClassName?: string;
  textClassName?: string;
  alt?: string;
}

/**
 * CompanyLogo component that safely displays a company logo or falls back to
 * company initials if logo is missing or image fails to load (broken link).
 *
 * Initials logic:
 * - 1 word: First 2 letters (e.g., "Google" -> "GO")
 * - 2 words: First letters of both words (e.g., "Nova Logistics" -> "NL")
 * - 2+ words: First letters of the first 2 words only (e.g., "Bulyam Web Studio" -> "BW")
 */
export function CompanyLogo({
  src,
  name,
  className = "w-6 h-6 rounded object-contain border border-slate-200",
  fallbackClassName = "w-6 h-6 rounded bg-slate-950 text-white font-bold flex items-center justify-center border border-slate-900 uppercase",
  textClassName = "text-[10px] font-mono",
  alt,
}: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = getCompanyInitials(name);

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={alt || name || "Company Logo"}
        onError={() => setHasError(true)}
        className={`${className} shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${fallbackClassName} shrink-0 select-none`}
      title={name || undefined}
    >
      <span className={textClassName}>{initials}</span>
    </div>
  );
}
