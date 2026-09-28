import { useState, useEffect } from "react";
import { getCompanyInitials } from "../lib/utils";
import { defaultBusinessLogo as DefaultBusinessLogo } from "@/default_business_logo";

export interface CompanyLogoProps {
  src?: string | null;
  name?: string | null;
  className?: string;
  fallbackClassName?: string;
  textClassName?: string;
  alt?: string;
  preferInitials?: boolean;
}

/**
 * CompanyLogo component that safely displays a business logo according to seo_code_guide.md:
 * - If a logo is present, use it.
 * - Otherwise use ui/default_business_logo.tsx as the default business logo.
 * - The business initials will be used only as fallback (e.g. when image fails to load).
 */
export function CompanyLogo({
  src,
  name,
  className = "w-6 h-6 rounded object-contain border border-slate-200",
  fallbackClassName = "w-6 h-6 rounded bg-slate-950 text-white font-bold flex items-center justify-center border border-slate-900 uppercase",
  textClassName = "text-[10px] font-mono",
  alt,
  preferInitials = false,
}: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // 1. If custom logo is present and hasn't errored out, display it
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

  // 2. If a custom logo was provided but failed to load (onError), fallback to business initials
  if (src && hasError) {
    const initials = getCompanyInitials(name);
    return (
      <div
        className={`${fallbackClassName} shrink-0 select-none`}
        title={name || undefined}
      >
        <span className={textClassName}>{initials}</span>
      </div>
    );
  }

  // If explicitly requested to prefer initials over default logo
  if (preferInitials) {
    const initials = getCompanyInitials(name);
    return (
      <div
        className={`${fallbackClassName} shrink-0 select-none`}
        title={name || undefined}
      >
        <span className={textClassName}>{initials}</span>
      </div>
    );
  }

  // 3. Otherwise (no custom logo present), use ui/default_business_logo.tsx as the default business logo
  return (
    <div
      className={`${className} shrink-0 select-none flex items-center justify-center overflow-hidden`}
      title={name || "Default Business Logo"}
    >
      <DefaultBusinessLogo className="w-full h-full object-cover" />
    </div>
  );
}
