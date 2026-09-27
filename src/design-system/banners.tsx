import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  ArrowRight,
  ShieldCheck,
  Hourglass,
  Gavel,
  Verified,
  Sparkles,
  Send,
  Lock,
  Radio,
  FileCheck,
} from "lucide-react";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * IN-APP CONTEXTUAL ALERT NOTICE CARDS (Specification 02)
 * Universal alert banners for handshakes, warnings, errors, and informational notices
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface ExecutiveAlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "danger" | "neutral" | "info";
  title: string;
  badgeText?: string;
  badgeFormat?: "pill" | "mono";
  description: React.ReactNode;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
  };
  onDismiss?: () => void;
  dismissLabel?: string;
}

export function ExecutiveAlertBanner({
  variant = "success",
  title,
  badgeText,
  badgeFormat = "pill",
  description,
  icon,
  primaryAction,
  secondaryAction,
  onDismiss,
  dismissLabel = "Dismiss Alert",
  className,
  ...props
}: ExecutiveAlertBannerProps) {
  const stylesMap = {
    success: {
      container: "bg-[#F0FDF4] border-[#DCFCE7] text-[#15803D]",
      iconBg: "bg-[#DCFCE7] text-[#15803D]",
      title: "text-[#15803D]",
      badge: "bg-[#DCFCE7] text-[#15803D] border-[#16A34A]/20",
      description: "text-[#15803D]/90",
      primaryBtn: "bg-[#0F172A] hover:bg-[#1E293B] text-white",
      dismissBtn: "text-[#15803D] hover:underline",
      defaultIcon: <Check className="w-5 h-5 stroke-[2.5]" />,
    },
    warning: {
      container: "bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]",
      iconBg: "bg-[#FEF3C7] text-[#B45309]",
      title: "text-[#B45309]",
      badge: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
      description: "text-[#B45309]/90",
      primaryBtn: "bg-[#0F172A] hover:bg-[#1E293B] text-white",
      dismissBtn: "text-[#B45309] hover:underline",
      defaultIcon: <Clock className="w-5 h-5 stroke-[2.2]" />,
    },
    danger: {
      container: "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]",
      iconBg: "bg-[#FEE2E2] text-[#991B1B]",
      title: "text-[#991B1B]",
      badge: "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]",
      description: "text-[#991B1B]/90",
      primaryBtn: "bg-[#991B1B] hover:bg-[#7F1D1D] text-white",
      dismissBtn: "text-[#991B1B] hover:underline",
      defaultIcon: <AlertTriangle className="w-5 h-5 stroke-[2.2]" />,
    },
    neutral: {
      container: "bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]",
      iconBg: "bg-[#F1F5F9] text-[#475569]",
      title: "text-[#0F172A]",
      badge: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
      description: "text-[#64748B]",
      primaryBtn: "bg-[#0F172A] hover:bg-[#1E293B] text-white",
      dismissBtn: "text-[#64748B] hover:underline",
      defaultIcon: <Clock className="w-5 h-5 stroke-[2.2]" />,
    },
    info: {
      container: "bg-[#F0F9FF] border-[#BAE6FD] text-[#0369A1]",
      iconBg: "bg-[#E0F2FE] text-[#0369A1]",
      title: "text-[#0369A1]",
      badge: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
      description: "text-[#0369A1]/90",
      primaryBtn: "bg-[#0284C7] hover:bg-[#0369A1] text-white",
      dismissBtn: "text-[#0369A1] hover:underline",
      defaultIcon: <Clock className="w-5 h-5 stroke-[2.2]" />,
    },
  };

  const styles = stylesMap[variant as keyof typeof stylesMap] || stylesMap.warning;

  return (
    <div
      role="alert"
      className={cn(
        "border rounded-[6px] p-4 sm:p-5 flex flex-col md:flex-row items-start justify-between gap-4 text-xs shadow-xs transition",
        styles.container,
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className={cn("p-2.5 rounded-[4px] shrink-0 mt-0.5", styles.iconBg)}>
          {icon || styles.defaultIcon}
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className={cn("font-bold text-sm tracking-tight", styles.title)}>{title}</span>
            {badgeText && (
              <span
                className={cn(
                  "border font-semibold",
                  badgeFormat === "mono"
                    ? "px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider"
                    : "px-2 py-0.5 rounded-full text-[10px] font-bold",
                  styles.badge
                )}
              >
                {badgeText}
              </span>
            )}
          </div>
          <div className={cn("leading-relaxed text-xs max-w-3xl", styles.description)}>
            {description}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 pt-1 md:pt-0 self-end md:self-center">
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn("font-semibold text-xs px-2.5 py-1.5 cursor-pointer transition", styles.dismissBtn)}
          >
            {dismissLabel}
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.disabled}
            className={cn(
              "font-semibold text-xs px-3 py-1.5 rounded-[4px] border border-transparent transition inline-flex items-center gap-1.5",
              secondaryAction.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
              styles.dismissBtn
            )}
          >
            {secondaryAction.icon}
            <span>{secondaryAction.label}</span>
          </button>
        )}
        {primaryAction &&
          (primaryAction.href ? (
            <a
              href={primaryAction.href}
              className={cn(
                "h-8.5 px-3.5 py-1.5 font-medium rounded-[4px] text-xs transition shadow-2xs inline-flex items-center gap-1.5 shrink-0",
                primaryAction.disabled ? "opacity-60 pointer-events-none" : "",
                styles.primaryBtn
              )}
            >
              {primaryAction.icon}
              <span>{primaryAction.label}</span>
              {!primaryAction.icon && <ArrowRight className="w-3.5 h-3.5" />}
            </a>
          ) : (
            <button
              type="button"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className={cn(
                "h-8.5 px-3.5 py-1.5 font-medium rounded-[4px] text-xs transition shadow-2xs inline-flex items-center gap-1.5 shrink-0",
                primaryAction.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                styles.primaryBtn
              )}
            >
              {primaryAction.icon}
              <span>{primaryAction.label}</span>
              {!primaryAction.icon && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          ))}
      </div>
    </div>
  );
}

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * WAITING BANNER SYSTEM (seo_code_guide.md - Specification 01 Direction A)
 * Calibrated warm amber scale formulated to signal latency, SLA countdowns,
 * partner review cycles, and non-blocking ratification holds.
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface WaitingBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "strip" | "midnight" | "dismissible";
  stage?: "01" | "02" | "03" | "04" | string;
  counterparty?: string;
  slaRemaining?: string;
  protocolHash?: string;
  channelStatus?: string;
  title?: string;
  badgeText?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  onDismiss?: () => void;
}

export function WaitingBanner({
  variant = "standard",
  stage = "03",
  counterparty = "Counterparty",
  slaRemaining = "36h",
  protocolHash,
  channelStatus = "Institutional Channel Sync: Confirmed",
  title,
  badgeText,
  description,
  icon,
  primaryAction,
  secondaryAction,
  onDismiss,
  className,
  ...props
}: WaitingBannerProps) {
  // ── VARIANT B: Compact Turn-State Strip ───────────────────────────────────
  if (variant === "strip") {
    return (
      <div
        role="status"
        className={cn(
          "w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-lg px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D97706]" />
          </span>
          {title ? (
            <span className="font-semibold text-[#0F172A] whitespace-nowrap">
              {title}
            </span>
          ) : title === undefined ? (
            <span className="font-semibold text-[#0F172A] whitespace-nowrap">
              Turn In {counterparty}&apos;s Court:
            </span>
          ) : null}
          <span className="text-[#78350F] truncate">
            {description || (
              <>
                Counterparty has{" "}
                <span className="font-semibold font-mono text-[#B45309]">{slaRemaining}</span> remaining to respond.
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="text-[#B45309] hover:underline font-semibold cursor-pointer text-xs"
            >
              {secondaryAction.label}
            </button>
          )}
          {secondaryAction && primaryAction && <span className="h-3 w-[1px] bg-[#FDE68A]" />}
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className="text-[#505F76] hover:text-[#0F172A] font-medium transition-colors cursor-pointer text-xs"
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── VARIANT C: Executive Midnight Waiting Banner ──────────────────────────
  if (variant === "midnight") {
    return (
      <div
        role="status"
        className={cn(
          "w-full bg-[#0F172A] border border-slate-800 rounded-xl p-5 text-white relative overflow-hidden shadow-md",
          className
        )}
        {...props}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D97706]" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-1">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#FDE68A] font-mono text-[11px] tracking-wider uppercase font-semibold">
                SOVEREIGN TRANSACTION QUEUE
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1E293B] text-[#FDE68A] font-mono text-[11px] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
                ⏱ {slaRemaining} SLA REMAINING
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {title || `Waiting for ${counterparty} to review & counter-ratify`}
            </h3>
            <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed">
              {description ||
                `The institutional vault remains locked in escrow. Identity masking safeguards are strictly enforced until ${counterparty} executes their verified security challenge.`}
            </p>
            {protocolHash && (
              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[#FDE68A]">
                <span>HASH PROTOCOL: {protocolHash}</span>
                <span>•</span>
                <span className="text-slate-400">{channelStatus}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="px-3.5 py-2 rounded-lg bg-[#1E293B] text-white text-xs font-semibold hover:bg-[#334155] transition-colors cursor-pointer"
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
                className="px-4 py-2 rounded-lg bg-[#D97706] text-white text-xs font-bold hover:bg-[#B45309] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {primaryAction.icon || <Send className="w-3.5 h-3.5" />}
                <span>{primaryAction.label}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── VARIANT D: Dismissible Actionable Banner ──────────────────────────────
  if (variant === "dismissible") {
    return (
      <div
        role="status"
        className={cn(
          "w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex items-center justify-between gap-4 transition-all shadow-xs",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#FDE68A] flex items-center justify-center shrink-0 text-[#B45309]">
            {icon || <Clock className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-xs sm:text-sm text-[#0F172A] truncate">
              {title || "Pending Turnaround Review"}
            </p>
            <p className="text-xs text-[#78350F] truncate">
              {description || `Awaiting next step from ${counterparty}. SLA estimated in ${slaRemaining}.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="px-2.5 py-1.5 rounded-lg text-[#B45309] font-semibold text-xs hover:bg-[#FDE68A] transition-colors cursor-pointer"
            >
              {primaryAction.label}
            </button>
          )}
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              title="Dismiss"
              className="w-7 h-7 flex items-center justify-center text-[#B45309] hover:bg-[#FDE68A] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── VARIANT A: Standard Inline Contextual Banner (Default) ─────────────────
  return (
    <div
      role="status"
      className={cn(
        "w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs shadow-xs",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-lg bg-white border border-[#FDE68A] flex items-center justify-center shrink-0 text-[#B45309] shadow-2xs mt-0.5">
          {icon || <Clock className="w-5 h-5 text-[#B45309]" />}
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-sm text-[#0F172A] tracking-tight">
              {title || `Waiting for ${counterparty} to review & agree`}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold bg-[#FDE68A] text-[#B45309]">
              {badgeText || "Awaiting Signature"}
            </span>
          </div>
          <p className="text-xs text-[#78350F] leading-relaxed">
            {description || (
              <>
                <span className="font-semibold text-[#92400E]">{slaRemaining}</span> remaining in counterparty SLA window.
                Stage 04 sovereign unlock settles automatically upon dual confirmation.
              </>
            )}
          </p>
          {(protocolHash || channelStatus) && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-[#92400E]">
              {protocolHash && <span className="font-semibold uppercase">HASH PROTOCOL: {protocolHash}</span>}
              {protocolHash && channelStatus && <span className="h-2 w-[1px] bg-[#FDE68A]" />}
              {channelStatus && <span>{channelStatus}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="px-3.5 py-2 rounded-lg bg-white border border-slate-200/80 text-[#0F172A] font-semibold text-xs hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            {secondaryAction.label}
          </button>
        )}
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            className="px-4 py-2 rounded-lg bg-[#D97706] text-white font-bold text-xs hover:bg-[#B45309] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {primaryAction.icon || <Send className="w-3.5 h-3.5" />}
            <span>{primaryAction.label}</span>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * CONFIRMATION BANNER SYSTEM (seo_code_guide.md - Section 02 / Stage 03 Ratification)
 * Strict institutional legal pre-confirmation, bilateral turn holding, and
 * mutual dual-signature confirmation banner architecture for Stage 03 Agreement.
 * ═════════════════════════════════════════════════════════════════════════════
 */

export interface ConfirmationBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "strip" | "midnight";
  stage?: "03" | string;
  bilateralState?:
    | "pending"
    | "waiting"
    | "ratified"
    | "action_required"
    | "awaiting_counterparty"
    | "mutual_complete";
  counterpartyName?: string;
  isCounterpartyConfirmed?: boolean;
  title?: string;
  description?: React.ReactNode;
  badgeText?: string;
  stageBadgeText?: string;
  protocolHash?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  onConfirm?: () => Promise<void> | void;
  onRevision?: () => void;
  isConfirming?: boolean;
  confirmButtonLabel?: string;
  revisionButtonLabel?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  disclosureNote?: React.ReactNode;
  showStatusNotice?: boolean;
}

export function ConfirmationBanner({
  variant = "standard",
  stage = "03",
  bilateralState = "action_required",
  counterpartyName = "Partner",
  isCounterpartyConfirmed = false,
  title,
  description,
  badgeText,
  stageBadgeText = "Stage 03 Ratification",
  protocolHash,
  timestamp,
  icon,
  onConfirm,
  onRevision,
  isConfirming = false,
  confirmButtonLabel,
  revisionButtonLabel,
  primaryAction,
  secondaryAction,
  disclosureNote = "Disclosure: Relay records agreed terms and facilitates connection without guaranteeing performance.",
  showStatusNotice = true,
  className,
  ...props
}: ConfirmationBannerProps) {
  // Normalize bilateralState
  const isActionRequired =
    bilateralState === "pending" || bilateralState === "action_required";
  const isWaitingOnPartner =
    bilateralState === "waiting" || bilateralState === "awaiting_counterparty";
  const isMutualRatified =
    bilateralState === "ratified" || bilateralState === "mutual_complete";

  // ── PERSPECTIVE B: WAITING ON COUNTERPARTY ────────────────────────────────
  if (isWaitingOnPartner) {
    return (
      <WaitingBanner
        variant={variant === "midnight" ? "midnight" : "standard"}
        counterparty={counterpartyName}
        protocolHash={protocolHash}
        title={title || `Waiting for ${counterpartyName} to review & agree`}
        badgeText={badgeText || "Awaiting Counterparty Signature"}
        icon={icon || <Clock className="w-5 h-5 text-[#B45309] animate-pulse" />}
        description={
          description || (
            <div className="space-y-1">
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                <strong className="font-bold text-amber-950">You have confirmed these exchange terms.</strong> Notification
                dispatched to authorized signatory at {counterpartyName}. 36 hours remaining in SLA window. Stage 04:
                Handshake Protocol unlocks automatically upon mutual confirmation.
              </p>
              {timestamp && (
                <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] font-mono text-amber-900/80">
                  <span>Confirmed: {timestamp}</span>
                </div>
              )}
            </div>
          )
        }
        secondaryAction={
          secondaryAction ||
          (onRevision
            ? {
                label: revisionButtonLabel || "View Submitted Assent",
                onClick: onRevision,
              }
            : undefined)
        }
        primaryAction={
          primaryAction ||
          (onConfirm
            ? {
                label: confirmButtonLabel || "Signal Readiness",
                onClick: onConfirm,
                disabled: isConfirming,
              }
            : undefined)
        }
        className={className}
        {...props}
      />
    );
  }

  // ── PERSPECTIVE C: MUTUALLY RATIFIED ───────────────────────────────────────
  if (isMutualRatified) {
    return (
      <div
        role="status"
        className={cn(
          "w-full bg-[#F0FDF4] border border-[#DCFCE7] border-l-4 border-l-[#15803D] rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3.5 min-w-0 max-w-3xl">
          <div className="w-10 h-10 rounded bg-[#15803D] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-[#15803D] text-white font-mono text-[10.5px] uppercase font-semibold">
                MUTUAL STAGE 03 RATIFIED
              </span>
              <span className="font-mono text-[11px] text-emerald-800">
                Ledger Sealed • Stage 04 Unlocked
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base text-[#15803D] tracking-tight">
              {title || "Mutual Binding Agreement Verified. Stage 03 Complete."}
            </h4>
            <p className="text-xs text-emerald-900/90 leading-relaxed">
              {description ||
                "Both principals have executed digital ratification. Stage 03 is officially archived. You are cleared to proceed directly to Stage 04: Handshake Protocol."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white rounded-[4px] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span>{primaryAction.label || "Enter Stage 04"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── VARIANT 02: HIGH-DENSITY INLINE TURN STRIP ────────────────────────────
  if (variant === "strip") {
    return (
      <div
        role="alert"
        className={cn(
          "w-full bg-white border border-[#E2E8F0] border-l-4 border-l-[#010611] rounded-lg px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          <span className="px-2 py-0.5 rounded bg-[#010611] text-white font-mono text-[10px] uppercase font-semibold flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {badgeText || "Confirmation Required"}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#010611] tracking-tight">
            {title || "Confirm to Finalize Agreement & Move to Stage 04"}
          </span>
          <span className="hidden md:inline-block text-[#64748B] text-xs">
            — Your confirmation activates mutual binding legal lock.
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
          {onRevision && (
            <button
              type="button"
              onClick={onRevision}
              className="text-[#64748B] hover:text-[#010611] font-medium text-xs px-2 py-1 transition-colors cursor-pointer"
            >
              {revisionButtonLabel || "Review Terms"}
            </button>
          )}
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isConfirming || primaryAction?.disabled}
              className="px-4 py-1.5 bg-[#010611] hover:bg-[#171F2C] text-white rounded font-mono text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {isConfirming ? (
                <span className="animate-spin text-xs">⏳</span>
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>{confirmButtonLabel || "Confirm Agreement"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── VARIANT 03: EXECUTIVE MIDNIGHT DEALROOM VAULT BANNER ──────────────────
  if (variant === "midnight") {
    return (
      <div
        role="alert"
        className={cn(
          "w-full bg-[#171F2C] text-white rounded-xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 shadow-md border border-slate-700 relative",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3.5 max-w-3xl min-w-0">
          <div className="w-10 h-10 rounded bg-[#010611] flex items-center justify-center shrink-0 border border-slate-700 mt-1 shadow-sm text-white">
            {icon || <Gavel className="w-5 h-5 text-white" />}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-white text-[#010611] font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#010611] animate-pulse" />
                {badgeText || "Confirmation Gate Active"}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#010611] text-white font-mono text-[11px] border border-slate-700">
                STAGE 03 SEAL
              </span>
              {isCounterpartyConfirmed && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10.5px] border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {counterpartyName} Confirmed
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {title || "Confirm to Finalize Agreement & Move to Stage 04"}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {description ||
                "Your confirmation activates the mutual binding agreement and automatically unlocks Stage 04: Handshake Protocol. This cryptographic commitment is non-repudiable."}
            </p>
            {protocolHash && (
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-slate-400">
                <span>TX: #{protocolHash}</span>
                <span>•</span>
                <span>TIMESTAMP: {timestamp || "2025-10-24T14:32:09Z"}</span>
                <span>•</span>
                <span className="text-emerald-400">ESCROW: UNLOCKED</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full lg:w-auto">
          {onRevision && (
            <button
              type="button"
              onClick={onRevision}
              className="px-3.5 py-2 text-slate-300 hover:text-white font-medium text-xs transition-colors text-center border border-transparent hover:border-slate-700 rounded-[4px] cursor-pointer"
            >
              {revisionButtonLabel || "Review Terms or Decline"}
            </button>
          )}
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isConfirming || primaryAction?.disabled}
              className="px-4 py-2 bg-white text-[#010611] hover:bg-slate-100 rounded-[4px] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              {isConfirming ? (
                <span>Locking Seal...</span>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#010611]" />
                  <span>{confirmButtonLabel || "✓ Confirm & Proceed to Stage 04"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── VARIANT 01: STANDARD BILATERAL CALLOUT BANNER (Default Pre-Confirmation) ─
  return (
    <div
      role="alert"
      className={cn(
        "w-full bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5 shadow-xs border-l-4 border-l-[#010611] relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3.5 max-w-3xl min-w-0">
        <div className="w-10 h-10 rounded bg-[#010611] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          {icon || <ShieldCheck className="w-5 h-5 text-white" />}
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#010611] text-white font-mono text-[10.5px] uppercase font-semibold tracking-wider flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {badgeText || "Action Required to Finalize"}
            </span>

            {isCounterpartyConfirmed ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600/10 text-emerald-800 font-mono text-[10.5px] font-semibold border border-emerald-600/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                {counterpartyName} Confirmed
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#171F2C] font-mono text-[10.5px] uppercase font-semibold">
                {stageBadgeText}
              </span>
            )}

            {showStatusNotice && (
              <span className="font-mono text-[11px] text-[#64748B]">
                {isCounterpartyConfirmed
                  ? "• Digital signature locked"
                  : "• Both parties must independently confirm"}
              </span>
            )}
          </div>

          <h4 className="font-bold text-sm sm:text-base text-[#010611] tracking-tight">
            {title || "Confirm to Finalize Agreement & Move to Stage 04"}
          </h4>

          <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
            {description || (
              <>
                Your confirmation activates the mutual binding agreement and automatically unlocks{" "}
                <strong className="text-[#010611] font-semibold">Stage 04: Handshake Protocol</strong>. Once submitted,
                this covenant is sealed on the institutional ledger.
              </>
            )}
          </p>

          {disclosureNote && (
            <p className="text-[10.5px] text-[#64748B]/80 pt-0.5 leading-normal">
              {disclosureNote}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto self-end md:self-center">
        {secondaryAction ? (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="px-3.5 py-2 text-[#64748B] hover:text-[#010611] hover:bg-slate-100 transition-colors font-medium text-xs text-center border border-slate-200 rounded-lg cursor-pointer"
          >
            {secondaryAction.label}
          </button>
        ) : (
          onRevision && (
            <button
              type="button"
              onClick={onRevision}
              className="font-mono text-[11px] font-semibold text-[#64748B] hover:text-[#BA1A1A] hover:underline transition-colors flex items-center justify-center gap-1 cursor-pointer py-1.5 px-2"
            >
              <X className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <span>{revisionButtonLabel || "Request Revision or Decline"}</span>
            </button>
          )
        )}

        {primaryAction ? (
          <button
            type="button"
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled || primaryAction.loading}
            className="px-5 py-2.5 bg-[#010611] hover:bg-[#171F2C] text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.99] border border-[#010611] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {primaryAction.loading ? (
              <span className="animate-spin text-xs">⏳</span>
            ) : (
              primaryAction.icon || <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            )}
            <span>{primaryAction.label}</span>
          </button>
        ) : (
          onConfirm && (
            <button
              id="agree-terms-btn"
              type="button"
              onClick={onConfirm}
              disabled={isConfirming}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#010611] hover:bg-[#171F2C] text-white rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.99] border border-[#010611] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {isConfirming ? (
                <>
                  <span className="animate-spin text-xs">⏳</span>
                  <span>CONFIRMING...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                  <span>{confirmButtonLabel || "I AGREE TO THESE EXCHANGE TERMS"}</span>
                </>
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// Named exports for specific variant components
export function WaitingBannerStandard(props: Omit<WaitingBannerProps, "variant">) {
  return <WaitingBanner variant="standard" {...props} />;
}

export function WaitingBannerStrip(props: Omit<WaitingBannerProps, "variant">) {
  return <WaitingBanner variant="strip" {...props} />;
}

export function WaitingBannerMidnight(props: Omit<WaitingBannerProps, "variant">) {
  return <WaitingBanner variant="midnight" {...props} />;
}

export function WaitingBannerDismissible(props: Omit<WaitingBannerProps, "variant">) {
  return <WaitingBanner variant="dismissible" {...props} />;
}

export function ConfirmationBannerStandard(props: Omit<ConfirmationBannerProps, "variant">) {
  return <ConfirmationBanner variant="standard" {...props} />;
}

export function ConfirmationBannerStrip(props: Omit<ConfirmationBannerProps, "variant">) {
  return <ConfirmationBanner variant="strip" {...props} />;
}

export function ConfirmationBannerMidnight(props: Omit<ConfirmationBannerProps, "variant">) {
  return <ConfirmationBanner variant="midnight" {...props} />;
}
