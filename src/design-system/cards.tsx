import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Repeat, ArrowRight, Lock, SlidersHorizontal, Check, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { LivePulseBadge } from "./badges";

/* ==========================================================================
   1. CORE ELEVATED CARD & SUB-COMPONENTS
   ========================================================================== */

export type CardVariant =
  | "resting"
  | "default"
  | "float"
  | "hover"
  | "elevated"
  | "selected"
  | "active"
  | "locked"
  | "disabled"
  | "blinded"
  | "feature"
  | "pill"
  | "pill-active"
  | "pill-selected";

export type CardElevation = "rest" | "float" | "selected" | "locked";
export type CardRadius = "sm" | "md" | "lg" | "xl" | "full";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  elevation?: CardElevation;
  radius?: CardRadius;
}

const variantStyles: Record<CardVariant, string> = {
  resting:
    "bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4 hover:border-slate-300 transition",
  default:
    "bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4 hover:border-slate-300 transition",
  float:
    "bg-white rounded-2xl border border-slate-300 p-5 shadow-md hover:shadow-lg transition cursor-pointer hover:-translate-y-0.5 space-y-4",
  hover:
    "bg-white rounded-2xl border border-slate-300 p-5 shadow-md hover:shadow-lg transition cursor-pointer hover:-translate-y-0.5 space-y-4",
  elevated:
    "bg-white rounded-2xl border border-slate-300 p-5 shadow-md hover:shadow-lg transition cursor-pointer hover:-translate-y-0.5 space-y-4",
  selected:
    "bg-white rounded-2xl border-2 border-black p-5 shadow-md ring-2 ring-black/10 space-y-4 cursor-pointer",
  active:
    "bg-white rounded-2xl border-2 border-black p-5 shadow-md ring-2 ring-black/10 space-y-4 cursor-pointer",
  locked:
    "bg-slate-50/80 rounded-2xl border border-slate-200/70 p-5 shadow-none space-y-4 opacity-75",
  disabled:
    "bg-slate-50/80 rounded-2xl border border-slate-200/70 p-5 shadow-none space-y-4 opacity-75 cursor-not-allowed",
  blinded:
    "bg-slate-50/80 rounded-2xl border border-slate-200/70 p-5 shadow-none space-y-4 opacity-75",
  feature:
    "bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition",
  pill:
    "bg-white rounded-full border border-slate-200/80 px-4 py-2.5 shadow-sm flex items-center justify-between hover:border-slate-300 hover:shadow transition",
  "pill-active":
    "bg-white rounded-full border-2 border-black px-4 py-2.5 shadow-md flex items-center justify-between ring-2 ring-black/10",
  "pill-selected":
    "bg-white rounded-full border-2 border-black px-4 py-2.5 shadow-md flex items-center justify-between ring-2 ring-black/10",
};

const elevationStyles: Record<CardElevation, string> = {
  rest: "border border-slate-200/80 shadow-sm",
  float: "border border-slate-300 shadow-md hover:shadow-lg hover:-translate-y-0.5",
  selected: "border-2 border-black shadow-md ring-2 ring-black/10",
  locked: "border border-slate-200/60 shadow-none opacity-60",
};

const radiusStyles: Record<CardRadius, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", elevation, radius, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "transition-all",
          variantStyles[variant],
          elevation && elevationStyles[elevation],
          radius && radiusStyles[radius],
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export const ElevatedCard = Card;

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-sm font-bold text-[#171F2C] leading-snug tracking-tight font-sans", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-xs text-slate-500 leading-relaxed", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("pt-2 border-t border-slate-100 flex items-center justify-between text-xs", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

/* ==========================================================================
   2. PATTERN A: CIRCULAR STAT & METRIC PILL CARDS
   ========================================================================== */

export interface MetricPillCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  iconVariant?: "emerald" | "orange" | "slate" | "black";
  label: string;
  value: string | number;
  badgeText?: string;
  badgeVariant?: "emerald" | "orange" | "slate" | "black";
  selected?: boolean;
}

const iconVariantClasses = {
  emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  orange: "bg-orange-50 text-orange-600 border border-orange-200",
  slate: "bg-slate-100 text-slate-700 border border-slate-200",
  black: "bg-black text-white",
};

const badgeVariantClasses = {
  emerald: "text-emerald-700 bg-emerald-50 border border-emerald-200",
  orange: "text-orange-600 bg-orange-50 border border-orange-200",
  slate: "text-slate-500 bg-slate-100",
  black: "text-white bg-black",
};

export function MetricPillCard({
  icon,
  iconVariant = "slate",
  label,
  value,
  badgeText,
  badgeVariant = "slate",
  selected = false,
  className,
  ...props
}: MetricPillCardProps) {
  return (
    <div
      className={cn(
        "rounded-full px-4 py-2.5 shadow-sm flex items-center justify-between transition-all",
        selected
          ? "bg-white border-2 border-black ring-2 ring-black/10 shadow-md"
          : "bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        {icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
              iconVariantClasses[iconVariant],
            )}
          >
            {icon}
          </div>
        )}
        <div>
          <span
            className={cn(
              "text-[10px] uppercase font-semibold block leading-tight",
              selected ? "text-slate-500 font-bold" : "text-slate-400",
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "text-xs font-bold font-sans",
              selected ? "text-black" : "text-[#171F2C]",
            )}
          >
            {value}
          </span>
        </div>
      </div>
      {badgeText && (
        <span
          className={cn(
            "text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold",
            badgeVariantClasses[badgeVariant],
          )}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
}

/* ==========================================================================
   3. PATTERN B: OPPORTUNITY LISTING CARD
   ========================================================================== */

export interface OpportunityListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: string;
  tagVariant?: "default" | "orange" | "black" | "locked";
  code: string;
  title: string;
  description: string;
  metricLeft: string;
  metricRight?: React.ReactNode;
  variant?: "resting" | "float" | "selected" | "locked";
}

const tagStyles = {
  default: "bg-slate-100 text-slate-700 border border-slate-200",
  orange: "bg-orange-50 text-orange-700 border border-orange-200",
  black: "bg-black text-white",
  locked: "bg-slate-200 text-slate-500",
};

export function OpportunityListingCard({
  tag,
  tagVariant = "default",
  code,
  title,
  description,
  metricLeft,
  metricRight,
  variant = "resting",
  className,
  ...props
}: OpportunityListingCardProps) {
  return (
    <Card variant={variant} className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold",
            tagStyles[tagVariant],
          )}
        >
          {tag}
        </span>
        <span
          className={cn(
            "text-[11px] font-mono",
            variant === "float"
              ? "text-orange-600 font-semibold"
              : variant === "selected"
                ? "text-slate-800 font-bold"
                : "text-slate-400",
          )}
        >
          {code}
        </span>
      </div>

      <div className="space-y-1">
        <h4
          className={cn(
            "text-sm font-bold leading-snug font-sans",
            variant === "locked" ? "text-slate-500 font-semibold" : "text-[#171F2C]",
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            "text-xs leading-relaxed",
            variant === "locked" ? "text-slate-400" : "text-slate-500",
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={cn(
          "pt-2 border-t flex items-center justify-between text-xs",
          variant === "selected"
            ? "border-slate-200"
            : variant === "locked"
              ? "border-slate-200/60"
              : "border-slate-100",
        )}
      >
        <span
          className={cn(
            "font-mono font-bold",
            variant === "selected"
              ? "text-black"
              : variant === "locked"
                ? "text-slate-400 font-medium"
                : "text-[#171F2C]",
          )}
        >
          {metricLeft}
        </span>
        {metricRight}
      </div>
    </Card>
  );
}

/* ==========================================================================
   4. PATTERN 3: FEATURE ACTION CARD
   ========================================================================== */

export interface FeatureActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  badgeText?: string;
  description: string;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
}

export function FeatureActionCard({
  icon,
  title,
  badgeText,
  description,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: FeatureActionCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#171F2C] shrink-0">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#171F2C] font-sans">{title}</h4>
            {badgeText && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {badgeText}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{description}</p>
        </div>
      </div>

      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3 shrink-0">
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 transition shadow-xs cursor-pointer"
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="px-4 py-2 bg-black text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition shadow-xs cursor-pointer"
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   5. PRE-EXISTING COMPONENT APIS (PRESERVED FOR FULL BACKWARDS COMPATIBILITY)
   ========================================================================== */

/**
 * MetricCard Component
 * Surface Elevation 1 card showing title, large monospaced metric, and verification sub-label
 */
export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  subLabel?: string;
  subLabelColor?: string;
}

export function MetricCard({
  label,
  value,
  subLabel,
  subLabelColor = "text-[#64748B]",
  className,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[4px] p-4 flex flex-col justify-between shadow-2xs transition-all",
        className,
      )}
      {...props}
    >
      <span className="text-xs font-medium text-[#64748B]">{label}</span>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="font-mono text-2xl font-bold text-[#171F2C]">{value}</span>
        {subLabel && <span className={cn("text-[11px]", subLabelColor)}>{subLabel}</span>}
      </div>
    </div>
  );
}

/**
 * HowItWorksCard Component
 * Educational 3-step walkthrough banner card
 */
export function HowItWorksCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-white border border-[#E2E8F0] rounded-[4px] p-5 shadow-2xs", className)}
      {...props}
    >
      <div className="flex items-center gap-2 mb-3">
        <Repeat className="w-5 h-5 text-[#000000]" />
        <h3 className="font-bold text-sm text-[#171F2C]">How The Relay Works</h3>
      </div>
      <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
        The Relay connects verified enterprises on mutual reciprocity. Identity is strictly
        obscured until terms are agreed.
      </p>
      <div className="space-y-3">
        {/* Step 1 */}
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#000000] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">
            1
          </div>
          <div>
            <div className="text-xs font-semibold text-[#171F2C]">Blinded Discovery</div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              Browse listings and submit reciprocal value pitches without exposing contact data.
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#171F2C] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">
            2
          </div>
          <div>
            <div className="text-xs font-semibold text-[#171F2C]">Negotiate Terms</div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              Parties align on commercial exchange terms and verify parity inside the sandbox.
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#059669] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 font-mono">
            3
          </div>
          <div>
            <div className="text-xs font-semibold text-[#171F2C]">Contact Unlock on Agreement</div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              Simultaneous release of executive contacts, calendars, and legal NDAs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * TargetedPlacementCard Component
 * Deep Charcoal (#171F2C) callout card for posting requests
 */
export interface TargetedPlacementCardProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonHref?: string;
  onButtonClick?: () => void;
  disabled?: boolean;
}

export function TargetedPlacementCard({
  buttonHref = "/post",
  onButtonClick,
  disabled = false,
  className,
  ...props
}: TargetedPlacementCardProps) {
  return (
    <div
      className={cn(
        "bg-[#171F2C] border border-[#334155] text-white rounded-[4px] p-5 shadow-sm",
        className,
      )}
      {...props}
    >
      <span className="text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase font-mono">
        Targeted Placement
      </span>
      <h4 className="font-bold text-base text-white mt-1">Need a Custom Partner?</h4>
      <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
        Broadcast what you need and what you offer in exchange. Your company identity remains
        completely confidential.
      </p>
      {disabled ? (
        <button
          type="button"
          disabled
          className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-slate-800 text-slate-500 text-xs font-semibold py-2.5 px-4 rounded-[4px] cursor-not-allowed select-none opacity-60 border border-slate-700"
        >
          <span>Post Blinded Request</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : buttonHref ? (
        <Link
          to={buttonHref}
          className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-[#F8FAFC] text-[#000000] text-xs font-semibold py-2.5 px-4 rounded-[4px] transition-colors cursor-pointer shadow-xs"
        >
          <span>Post Blinded Request</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <button
          type="button"
          onClick={onButtonClick}
          className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-[#F8FAFC] text-[#000000] text-xs font-semibold py-2.5 px-4 rounded-[4px] transition-colors cursor-pointer shadow-xs"
        >
          <span>Post Blinded Request</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/**
 * RecentHandshakesCard Component
 * Live activity pulse widget displaying real-time deal stage transitions
 */
export function RecentHandshakesCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-white border border-[#E2E8F0] rounded-[4px] p-5 shadow-2xs", className)}
      {...props}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-[#171F2C]">Recent Handshakes</h3>
        <LivePulseBadge />
      </div>
      <div className="space-y-3">
        <div className="pb-2.5 border-b border-[#F1F5F9]">
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
            <span className="font-mono text-[#0F172A] font-semibold">[RY-0012] Handshake Sealed</span>
            <span className="font-mono">4m ago</span>
          </div>
          <p className="text-xs text-[#171F2C] font-medium mt-1">
            Payment Gateway ↔ ERP Migration Firm
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#059669] mt-0.5">
            <Lock className="w-3 h-3" /> Contacts released
          </span>
        </div>

        <div className="pb-2.5 border-b border-[#F1F5F9]">
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
            <span className="font-mono text-[#0F172A] font-semibold">[RY-0188] Pitch Accepted</span>
            <span className="font-mono">21m ago</span>
          </div>
          <p className="text-xs text-[#171F2C] font-medium mt-1">
            Autonomous Drone Fleet ↔ Defense Contractor
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#64748B] mt-0.5">
            <SlidersHorizontal className="w-3 h-3" /> Terms harmonization
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
            <span className="font-mono text-[#0F172A] font-semibold">[RY-0204] Handshake Sealed</span>
            <span className="font-mono">54m ago</span>
          </div>
          <p className="text-xs text-[#171F2C] font-medium mt-1">
            B2B Telehealth ↔ HIPAA Cloud Provider
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#059669] mt-0.5">
            <Lock className="w-3 h-3" /> Contacts released
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * ExchangeCalloutBox Component
 * "What We Offer in Exchange" callout envelope
 */
export interface ExchangeCalloutBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  offerText: string;
}

export function ExchangeCalloutBox({ offerText, className, ...props }: ExchangeCalloutBoxProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-[4px] p-3.5 text-xs md:text-sm shadow-2xs",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5 text-[#171F2C] font-semibold text-xs mb-1">
        <Repeat className="w-4 h-4 text-[#F97316]" />
        <span>What We Offer in Exchange:</span>
      </div>
      <p className="text-[#64748B] leading-relaxed">{offerText}</p>
    </div>
  );
}
