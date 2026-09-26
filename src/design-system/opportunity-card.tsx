import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Eye,
  EyeOff,
  Bookmark,
  Inbox,
  Lock,
  Pencil,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  Repeat,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn, getCompanyInitials } from "@/lib/utils";
import { CompanyLogo } from "@/components/company-logo";
import {
  DealCodeStamp,
  CategoryPill,
  UrgentBadge,
  VerifiedBadge,
  ParityScoreBadge,
  SemanticStatusPill,
} from "./badges";
import { Button } from "./button";
import { MiniStageStepper, MiniStageBarStepper } from "./lifecycle-stepper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface OpportunityCardData {
  id: string;
  opportunity_number?: string;
  type: string;
  category?: string;
  industry: string;
  geo?: string;
  location?: string | null;
  offer_text?: string | null;
  company: string;
  title: string;
  description: string;
  trustLevel?: "Basic" | "Applied" | "Approved";
  postedAt?: string;
  interested: number;
  views?: number;
  business_id?: string;
  hide_company_name?: boolean;
  status?: string;
  expires_at?: string;
  promotion_status?: string;
  logo_url?: string | null;
  parityScore?: number;
  exchangesCompleted?: number;
}

export interface OpportunityCardProps {
  opp: OpportunityCardData;
  isOwner?: boolean;
  isSaved?: boolean;
  isBlurred?: boolean;
  interestStatus?: "idle" | "pending" | "accepted" | "declined" | "withdrawn";
  defaultOpen?: boolean;
  onSaveToggle?: (oppId: string, shouldSave: boolean) => void;
  onExpressInterest?: (opp: OpportunityCardData) => void;
  onEdit?: (opp: OpportunityCardData) => void;
  onExpand?: (oppId: string) => void;
  className?: string;
}

function formatExpiryTime(expiresAt?: string | null): { text: string; urgent: boolean } {
  if (!expiresAt) return { text: "30 days", urgent: false };
  try {
    const exp = new Date(expiresAt).getTime();
    const now = Date.now();
    const diff = exp - now;
    if (diff <= 0) return { text: "Expired", urgent: true };
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 2) return { text: `${days * 24} hours`, urgent: true };
    if (days <= 7) return { text: `${days} days`, urgent: true };
    return { text: `${days} days`, urgent: false };
  } catch {
    return { text: "30 days", urgent: false };
  }
}

export function OpportunityCard({
  opp,
  isOwner = false,
  isSaved = false,
  isBlurred = false,
  interestStatus = "idle",
  defaultOpen = false,
  onSaveToggle,
  onExpressInterest,
  onEdit,
  onExpand,
  className,
}: OpportunityCardProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const isPromoted = opp.promotion_status === "promoted";
  const expiryInfo = formatExpiryTime(opp.expires_at);
  const shouldHide = opp.hide_company_name && !isOwner;
  const displayCompany = shouldHide ? "Anonymous Verified Enterprise" : opp.company;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !isOwner && onExpand) {
      onExpand(opp.id);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpenChange} asChild>
      <article
        className={cn(
          "bg-white rounded-[4px] border border-[#E2E8F0] shadow-2xs overflow-hidden transition-all hover:border-[#CBD5E1] flex flex-col select-none",
          isOpen && "border-[#171F2C]/20 shadow-xs",
          className,
        )}
      >
        {/* ══════════════════════════════════════════════════════════════════
            1. COLLAPSED STATE (CLICKABLE CARD HEADER)
            ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleTrigger asChild>
          <div className="w-full p-4 sm:p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-[#F8FAFC]/70 transition-colors text-left">
            <div className="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
              {/* Company Logo / Initials Avatar */}
              <div className="relative shrink-0 mt-0.5 md:mt-0">
                <CompanyLogo
                  src={shouldHide || isBlurred ? undefined : opp.logo_url}
                  name={displayCompany}
                  className={cn(
                    "w-9 h-9 rounded-[4px] object-contain border border-[#E2E8F0] shrink-0 bg-white",
                    isBlurred && "filter blur-[3.5px] select-none opacity-60",
                  )}
                  fallbackClassName={cn(
                    "w-9 h-9 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#171F2C]",
                    isBlurred && "filter blur-[3.5px] select-none opacity-60",
                  )}
                  textClassName="text-xs font-mono font-bold"
                />
                {isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-[#171F2C]" />
                  </div>
                )}
              </div>

              {/* Core 3-Row Content Block */}
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                {/* ── ROW 1: Opportunity ID & Category Tags (Left) ── */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <DealCodeStamp code={opp.opportunity_number || "RY-0042"} />
                  <CategoryPill category={opp.type} />
                  {isPromoted && <SemanticStatusPill variant="warning" format="mono">Urgent</SemanticStatusPill>}
                  {shouldHide && (
                    <span className="text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] flex items-center gap-1 select-none">
                      <EyeOff className="w-3 h-3 text-[#94A3B8]" />
                      Anonymous Partner
                    </span>
                  )}
                  {isOwner && (
                    <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white inline-flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Your Listing
                    </span>
                  )}
                </div>

                {/* ── ROW 2: Opportunity Title ── */}
                <h2 className="font-display font-semibold text-[15px] sm:text-[16px] text-[#171F2C] truncate tracking-tight pt-0.5">
                  {opp.title}
                </h2>

                {/* ── ROW 3: Business Name | Verified Icon | Location ── */}
                <div className="flex items-center gap-2 text-xs text-[#64748B] truncate">
                  {isBlurred ? (
                    <span className="font-medium text-[#171F2C] filter blur-[5px] select-none pointer-events-none truncate">
                      {opp.company || "Enterprise Corp Inc."}
                    </span>
                  ) : (
                    <span className="font-medium text-[#171F2C] truncate">{displayCompany}</span>
                  )}

                  <SemanticStatusPill
                    variant="success"
                    format="rounded"
                    className="text-[10px] px-1.5 py-0 leading-tight font-semibold"
                  >
                    Verified
                  </SemanticStatusPill>

                  <span className="text-[#CBD5E1]">|</span>

                  <span className="truncate">{opp.location || opp.geo || "Remote / Global"}</span>

                  {opp.industry && (
                    <>
                      <span className="text-[#CBD5E1]">•</span>
                      <span className="truncate text-[#64748B]">{opp.industry}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Parity Score, Expiry & Expand/Collapse Icon */}
            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E2E8F0]">
              <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                    Parity Score
                  </span>
                  <span className="font-mono text-xs font-bold text-[#171F2C]">
                    {opp.parityScore ?? 96}%
                  </span>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                    Expires
                  </span>
                  <span className="text-xs text-[#64748B] font-medium font-mono">
                    {expiryInfo.text}
                  </span>
                </div>
              </div>

              {/* Chevron Expand/Collapse Indicator */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full bg-[#171F2C] hover:bg-black border border-[#171F2C] flex items-center justify-center text-white transition-transform duration-200 shrink-0 shadow-xs",
                  isOpen && "rotate-180",
                )}
              >
                <ChevronDown className="w-4 h-4 text-white stroke-[2.2]" />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        {/* ══════════════════════════════════════════════════════════════════
            2. EXPANDED STATE (COLLAPSIBLE DETAILS BODY)
            ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleContent className="border-t border-[#E2E8F0] p-5 sm:p-6 flex flex-col gap-4 bg-white transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
          {/* Opportunity Description & Requirements */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
              Opportunity Overview &amp; Requirements
            </span>
            <p className="text-sm text-[#334155] leading-relaxed">{opp.description}</p>
          </div>

          {/* C. Bilateral Value Proposition (What We Are Expecting) */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C]">
              <Repeat className="w-4 h-4 text-[#F97316]" />
              <span>What We Are Expecting</span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {opp.offer_text ||
                "Direct reciprocal margin & revenue split under sovereign non-circumvention covenants."}
            </p>
          </div>

          {/* D. Bottom Actions & Metadata */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap">
              {/* Unique Operator Views Counter */}
              <span className="flex items-center gap-1 font-mono text-[#171F2C] bg-[#F8FAFC] px-2 py-0.5 rounded-[4px] border border-[#E2E8F0]">
                <Eye className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="font-semibold">{(opp.views ?? 0).toLocaleString()}</span>
                <span className="text-[11px] text-[#64748B]">
                  {(opp.views ?? 0) === 1 ? "view" : "views"}
                </span>
              </span>

              {/* Save / Bookmark Toggle */}
              {onSaveToggle && (
                <button
                  type="button"
                  disabled={isBlurred}
                  onClick={() => onSaveToggle(opp.id, !isSaved)}
                  className={cn(
                    "inline-flex items-center gap-1 transition-colors cursor-pointer",
                    isBlurred && "opacity-50 cursor-not-allowed pointer-events-none",
                    isSaved ? "text-[#000000] font-semibold" : "hover:text-[#171F2C]",
                  )}
                >
                  <Bookmark
                    className={cn("w-3.5 h-3.5", isSaved ? "fill-[#000000] text-[#000000]" : "")}
                  />
                  <span>
                    {opp.interested + (isSaved ? 1 : 0)} save
                    {opp.interested + (isSaved ? 1 : 0) === 1 ? "" : "s"}
                  </span>
                </button>
              )}

              {/* Pitch Count */}
              <span className="flex items-center gap-1 font-mono text-xs">
                <Inbox className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>
                  {opp.interested + 2} pitch
                  {opp.interested + 2 === 1 ? "" : "es"} in review
                </span>
              </span>

              <span className="text-[#CBD5E1]">•</span>

              <span className="text-[11px] font-medium text-[#64748B] uppercase font-mono">
                Stage 4 Bilateral Reveal
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {isOwner && onEdit ? (
                <Button variant="outline" size="sm" onClick={() => onEdit(opp)} className="gap-1.5">
                  <Pencil className="w-3.5 h-3.5 text-[#171F2C]" />
                  <span>Manage Listing</span>
                </Button>
              ) : interestStatus === "pending" || interestStatus === "accepted" ? (
                <Link
                  to="/my-relay"
                  search={{ tab: "sent" }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold hover:bg-[#D1FAE5] transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Proposal Sent</span>
                </Link>
              ) : onExpressInterest ? (
                <Button
                  variant="monochrome"
                  size="sm"
                  disabled={isBlurred}
                  onClick={() => onExpressInterest(opp)}
                  className="gap-1.5 self-end sm:self-center"
                >
                  <span>Express Interest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : null}
            </div>
          </div>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
}

/* ==========================================================================
   2. BILATERAL DEAL OPPORTUNITY CARD (INBOUND / OUTBOUND STREAM)
   ========================================================================== */

export function formatTimeAgo(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return "Recently";
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (!date || isNaN(date.getTime())) return "Recently";
    const diffMs = Date.now() - date.getTime();
    const seconds = Math.floor(diffMs / 1000);
    if (isNaN(seconds) || seconds < 0) return "Recently";
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

export interface BilateralDealOpportunityCardProps {
  dealCode: string;
  pStage: 1 | 2 | 3 | 4;
  receivedAt?: string | Date;
  category?: string;
  isInbound: boolean;
  headline: string;
  partnerName: string;
  isVerified?: boolean;
  location?: string | null;
  industry?: string | null;
  logoUrl?: string | null;
  onView: () => void;
  onExchangeHub: () => void;
  className?: string;
}

export function BilateralDealOpportunityCard({
  dealCode,
  pStage,
  receivedAt,
  category,
  isInbound,
  headline,
  partnerName,
  isVerified,
  location,
  industry,
  logoUrl,
  onView,
  onExchangeHub,
  className,
}: BilateralDealOpportunityCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-[4px] border border-[#E2E8F0] shadow-2xs overflow-hidden transition-all hover:border-[#CBD5E1] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none",
        className,
      )}
    >
      <div className="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
        {/* Company Logo / Initials Avatar */}
        <div className="relative shrink-0 mt-0.5 md:mt-0">
          <CompanyLogo
            src={logoUrl || undefined}
            name={partnerName}
            className="w-9 h-9 rounded-[4px] object-contain border border-[#E2E8F0] shrink-0 bg-white"
            fallbackClassName="w-9 h-9 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#171F2C]"
            textClassName="text-xs font-mono font-bold"
          />
        </div>

        {/* Core 3-Row Content Block */}
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          {/* ── ROW 1: Type / Category & Received Time Only ── */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Category / Type */}
            {category && <CategoryPill category={category} />}

            {/* Received Time */}
            {receivedAt && (
              <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1 bg-[#F8FAFC] px-2 py-0.5 rounded-[4px] border border-[#E2E8F0]">
                <Clock className="w-3 h-3 text-[#94A3B8]" />
                <span>Received {formatTimeAgo(receivedAt)}</span>
              </span>
            )}
          </div>

          {/* ── ROW 2: Opportunity Title ── */}
          <h2 className="font-display font-semibold text-[15px] sm:text-[16px] text-[#171F2C] truncate tracking-tight pt-0.5">
            {headline}
          </h2>

          {/* ── ROW 3: Business Name | Verified Icon | Location ── */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] truncate">
            <span className="font-medium text-[#171F2C] truncate">{partnerName}</span>

            {isVerified && (
              <span className="inline-flex items-center gap-1 text-emerald-700 text-[10px] font-medium shrink-0">
                <VerifiedBadge size={14} /> Verified
              </span>
            )}

            <span className="text-[#CBD5E1]">|</span>

            <span className="truncate">{location || "Remote / Global"}</span>

            {industry && (
              <>
                <span className="text-[#CBD5E1]">•</span>
                <span className="truncate text-[#64748B]">{industry}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: 4 Mini Stage Bars directly above Action Buttons */}
      <div className="flex flex-col sm:items-end gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E2E8F0] justify-center">
        {/* 4 Mini Stepper Bars (Black for passed/current, greyed out for future, with ack, neg, agr, shake labels) */}
        <MiniStageBarStepper stage={pStage} className="w-full sm:w-[170px]" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onView}
            className="gap-1.5 font-medium"
          >
            <Eye className="w-3.5 h-3.5 text-[#64748B]" />
            <span>View</span>
          </Button>
          <Button
            type="button"
            variant="monochrome"
            size="sm"
            onClick={onExchangeHub}
            className="gap-1.5 font-medium"
          >
            <span>Exchange Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
