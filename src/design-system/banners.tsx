import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Clock, AlertTriangle, X, ArrowRight } from "lucide-react";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * IN-APP BANNERS & CONTEXTUAL ALERT NOTICE CARDS (Specification 02)
 * Contextual Alert Architecture for Handshake, Active Turn & Termination States
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
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
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
        "border rounded-xl p-5 flex flex-col md:flex-row items-start justify-between gap-4 text-xs shadow-xs transition",
        styles.container,
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className={cn("p-2.5 rounded-lg shrink-0 mt-0.5", styles.iconBg)}>
          {icon || styles.defaultIcon}
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className={cn("font-bold text-sm", styles.title)}>{title}</span>
            {badgeText && (
              <span
                className={cn(
                  "border font-semibold",
                  badgeFormat === "mono"
                    ? "px-2 py-0.5 rounded text-[10px] font-mono font-bold"
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

      <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0 self-end md:self-center">
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn("font-semibold text-xs px-2 py-1 cursor-pointer transition", styles.dismissBtn)}
          >
            {dismissLabel}
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className={cn("font-semibold text-xs px-2 py-1 cursor-pointer transition", styles.dismissBtn)}
          >
            {secondaryAction.label}
          </button>
        )}
        {primaryAction && (
          primaryAction.href ? (
            <a
              href={primaryAction.href}
              className={cn(
                "px-4 py-2 font-semibold rounded-lg text-xs transition shadow-sm inline-flex items-center gap-1.5 shrink-0",
                styles.primaryBtn
              )}
            >
              <span>{primaryAction.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className={cn(
                "px-4 py-2 font-semibold rounded-lg text-xs transition shadow-sm inline-flex items-center gap-1.5 cursor-pointer shrink-0",
                styles.primaryBtn
              )}
            >
              <span>{primaryAction.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )
        )}
      </div>
    </div>
  );
}
