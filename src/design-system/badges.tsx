import * as React from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertCircle } from "lucide-react";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";

/**
 * VerifiedBadge / VerifiedMark
 * Displays crisp executive verified enterprise indicator with RelayVerificationSeal
 */
export interface VerifiedBadgeProps extends React.SVGProps<SVGSVGElement> {
  label?: string;
  variant?: "pill" | "solid" | "subtle" | string;
  size?: number | string;
  className?: string;
}

export function VerifiedBadge({
  label,
  variant,
  size = 14,
  className,
  ...props
}: VerifiedBadgeProps) {
  return (
    <RelayVerificationSeal
      size={size}
      className={cn("w-3.5 h-3.5 shrink-0 inline-block align-middle", className)}
      title="Verified Business"
      {...props}
    />
  );
}

export const VerifiedMark = VerifiedBadge;

/**
 * PendingBadge / PendingMark
 * Displays warm amber pending verification indicator
 */
export interface PendingBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  variant?: "pill" | "solid" | "subtle";
}

export function PendingBadge({
  label = "Pending Review",
  variant = "pill",
  className,
  ...props
}: PendingBadgeProps) {
  if (variant === "solid") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#92400e] border border-amber-300 text-[11px] font-semibold tracking-wide shadow-2xs shrink-0 select-none",
          className,
        )}
        title="Pending Verification"
        {...props}
      >
        <Clock className="w-3.5 h-3.5 text-[#d97706]" />
        <span>{label}</span>
      </span>
    );
  }

  if (variant === "subtle") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white text-[#92400e] border border-[#fde68a] text-[10px] font-bold uppercase tracking-wider shrink-0 select-none",
          className,
        )}
        title="Pending Verification"
        {...props}
      >
        <Clock className="w-3 h-3 text-[#d97706]" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-[#92400e] border border-[#fde68a] shadow-2xs shrink-0 select-none",
        className,
      )}
      title="Pending Verification"
      {...props}
    >
      <Clock className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
      <span>{label}</span>
    </span>
  );
}

export const PendingMark = PendingBadge;

/**
 * RegistrationMark
 * Comprehensive reusable registration status badge switching between Approved, Pending, Rejected and Draft
 */
export interface RegistrationMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "approved" | "pending" | "rejected" | "unregistered" | string;
  label?: string;
  variant?: "pill" | "solid" | "subtle";
}

export function RegistrationMark({
  status,
  label,
  variant = "pill",
  className,
  ...props
}: RegistrationMarkProps) {
  if (status === "approved") {
    return (
      <VerifiedBadge
        label={label || (variant === "subtle" ? "VERIFIED" : "Approved")}
        variant={variant === "subtle" ? "subtle" : variant === "solid" ? "solid" : "pill"}
        className={className}
        {...props}
      />
    );
  }

  if (status === "rejected") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-white text-red-700 border border-red-200 shadow-2xs shrink-0 select-none",
          variant === "subtle" && "uppercase text-[10px] px-2 py-0.5 rounded shadow-none",
          className,
        )}
        title="Application Rejected"
        {...props}
      >
        <AlertCircle className="w-3.5 h-3.5 text-red-600" />
        <span>{label || (variant === "subtle" ? "REJECTED" : "Rejected")}</span>
      </span>
    );
  }

  return (
    <PendingBadge
      label={label || (variant === "subtle" ? "PENDING" : "Pending Review")}
      variant={variant === "subtle" ? "subtle" : variant === "solid" ? "solid" : "pill"}
      className={className}
      {...props}
    />
  );
}

/**
 * UrgentBadge / ProprietaryBadge
 * #FFF7ED background, #9A3412 text, #FED7AA border, label-caps typography
 */
export interface UrgentBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

export function UrgentBadge({
  label = "Urgent Deal",
  className,
  ...props
}: UrgentBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA] shrink-0 select-none",
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}

/**
 * DealCodeStamp
 * Monospaced (JetBrains Mono), #0F172A text on #F1F5F9 fill, 1px #E2E8F0 border. Format: [RY-XXXX]
 */
export interface DealCodeStampProps extends React.HTMLAttributes<HTMLSpanElement> {
  code: string;
}

export function DealCodeStamp({ code, className, ...props }: DealCodeStampProps) {
  const formattedCode = code.startsWith("[") && code.endsWith("]") ? code : `[${code}]`;
  return (
    <span
      className={cn(
        "font-mono font-medium text-xs text-[#0F172A] bg-[#F1F5F9] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] shrink-0 select-none",
        className,
      )}
      {...props}
    >
      {formattedCode}
    </span>
  );
}

/**
 * CategoryPill
 * Structural Category chip for listings (e.g. PARTNERSHIP, REFERRAL, DISTRIBUTION)
 */
export interface CategoryPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
}

export function CategoryPill({ category, className, ...props }: CategoryPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider text-[#171F2C] bg-[#F1F5F9] border border-[#E2E8F0] shrink-0 select-none",
        className,
      )}
      {...props}
    >
      {category}
    </span>
  );
}

/**
 * ParityScoreBadge
 * Green monospaced reciprocal parity percentage rating
 */
export interface ParityScoreBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  score: number;
}

export function ParityScoreBadge({ score, className, ...props }: ParityScoreBadgeProps) {
  return (
    <span
      className={cn("text-xs font-semibold text-[#059669] font-mono", className)}
      {...props}
    >
      {score}% Parity Score
    </span>
  );
}

/**
 * LivePulseBadge
 * Green animated dot live activity indicator
 */
export function LivePulseBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full select-none",
        className,
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
      <span>LIVE</span>
    </span>
  );
}
