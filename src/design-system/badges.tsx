import * as React from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertCircle, Check, Zap, X, Shield, ShieldCheck } from "lucide-react";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * LEVEL 1: LIGHT SUBTLE-TINT STATUS PILLS (Specification 01 - Level 1)
 * Default Inline & Table Display (Surface Tint + 1px Hairline Border)
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface SemanticStatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "terracotta" | "neutral";
  format?: "pill" | "rounded" | "mono";
  showDot?: boolean;
  pulseDot?: boolean;
  icon?: React.ReactNode;
}

export function SemanticStatusPill({
  variant = "success",
  format = "pill",
  showDot = false,
  pulseDot = false,
  icon,
  className,
  children,
  ...props
}: SemanticStatusPillProps) {
  const variantStyles = {
    success: "bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]",
    warning: "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]",
    danger: "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]",
    terracotta: "bg-[#FFF1F2] text-[#9A3412] border-[#FED7AA]",
    neutral: "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]",
  }[variant];

  const dotColor = {
    success: "bg-[#16A34A]",
    warning: "bg-[#D97706]",
    danger: "bg-[#DC2626]",
    terracotta: "bg-[#C2410C]",
    neutral: "bg-[#94A3B8]",
  }[variant];

  const formatStyles = {
    pill: "rounded-full px-2.5 py-1 text-xs font-semibold",
    rounded: "rounded px-2.5 py-0.5 text-[11px] font-semibold",
    mono: "rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
  }[format];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border select-none shrink-0 transition-colors",
        variantStyles,
        formatStyles,
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColor,
            pulseDot && "animate-pulse"
          )}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * LEVEL 2: DARK EXECUTIVE BADGES (Specification 01 - Level 2)
 * High-Contrast Midnight #0F172A Container Badges
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface ExecutiveDarkBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "terracotta";
  format?: "pill" | "rounded" | "mono";
  showDot?: boolean;
  pulseDot?: boolean;
  icon?: React.ReactNode;
}

export function ExecutiveDarkBadge({
  variant = "success",
  format = "pill",
  showDot = false,
  pulseDot = false,
  icon,
  className,
  children,
  ...props
}: ExecutiveDarkBadgeProps) {
  const variantStyles = {
    success: "bg-[#0F172A] text-[#DCFCE7] border-[#15803D]/50",
    warning: "bg-[#0F172A] text-[#FDE68A] border-[#B45309]/50",
    danger: "bg-[#0F172A] text-[#FECACA] border-[#991B1B]/50",
    terracotta: "bg-[#0F172A] text-[#FED7AA] border-[#C2410C]/50",
  }[variant];

  const dotColor = {
    success: "bg-[#16A34A]",
    warning: "bg-[#D97706]",
    danger: "bg-[#DC2626]",
    terracotta: "bg-[#C2410C]",
  }[variant];

  const formatStyles = {
    pill: "rounded-full px-2.5 py-1 text-xs font-semibold",
    rounded: "rounded px-2.5 py-0.5 text-[11px] font-semibold",
    mono: "rounded px-2 py-0.5 text-[10px] font-mono font-medium bg-black/40",
  }[format];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border select-none shrink-0 transition-colors shadow-2xs",
        variantStyles,
        formatStyles,
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColor,
            pulseDot && "animate-pulse"
          )}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * LEVEL 3: SOLID HIGH-DENSITY CHIPS (Specification 01 - Level 3)
 * High-Emphasis Solid Accent Markers
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface SolidStatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "terracotta" | "dark";
  icon?: React.ReactNode;
}

export function SolidStatusChip({
  variant = "success",
  icon,
  className,
  children,
  ...props
}: SolidStatusChipProps) {
  const variantStyles = {
    success: "bg-[#16A34A] text-white",
    warning: "bg-[#D97706] text-white",
    danger: "bg-[#DC2626] text-white",
    terracotta: "bg-[#C2410C] text-white",
    dark: "bg-[#0F172A] text-white",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold shadow-2xs select-none shrink-0",
        variantStyles,
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * LEGACY & SPECIALIZED DOMAIN BADGES
 * ═════════════════════════════════════════════════════════════════════════════
 */

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
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-[11px] font-semibold tracking-wide shadow-2xs shrink-0 select-none",
          className
        )}
        title="Pending Verification"
        {...props}
      >
        <Clock className="w-3.5 h-3.5 text-[#D97706]" />
        <span>{label}</span>
      </span>
    );
  }

  if (variant === "subtle") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-[10px] font-bold uppercase tracking-wider shrink-0 select-none",
          className
        )}
        title="Pending Verification"
        {...props}
      >
        <Clock className="w-3 h-3 text-[#D97706]" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] shadow-2xs shrink-0 select-none",
        className
      )}
      title="Pending Verification"
      {...props}
    >
      <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
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
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] shadow-2xs shrink-0 select-none",
          variant === "subtle" && "uppercase text-[10px] px-2 py-0.5 rounded shadow-none",
          className
        )}
        title="Application Rejected"
        {...props}
      >
        <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />
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
        className
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
        className
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
        className
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
      className={cn("text-xs font-semibold text-[#15803D] font-mono", className)}
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
        "inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-2 py-0.5 rounded-full select-none",
        className
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
      <span>LIVE</span>
    </span>
  );
}
