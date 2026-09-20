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
  CheckCircle2,
  ChevronDown,
  Repeat,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn, getCompanyInitials } from "@/lib/utils";
import { CompanyLogo } from "@/components/company-logo";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import { DealCodeStamp, CategoryPill, UrgentBadge, VerifiedBadge, ParityScoreBadge } from "./badges";
import { ExchangeCalloutBox } from "./cards";
import { Button } from "./button";
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
          "bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)] overflow-hidden transition-all hover:border-slate-300 flex flex-col select-none",
          isOpen && "border-slate-300 ring-1 ring-slate-200/50",
          className,
        )}
      >
        {/* ══════════════════════════════════════════════════════════════════
            1. COLLAPSED STATE (CLICKABLE CARD HEADER)
            ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleTrigger asChild>
          <div className="w-full p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-slate-50/50 transition-colors text-left">
            <div className="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
              {/* Optional Company Logo Avatar */}
              <div className="relative shrink-0 mt-0.5 md:mt-0">
                <CompanyLogo
                  src={shouldHide || isBlurred ? undefined : opp.logo_url}
                  name={displayCompany}
                  className={cn(
                    "w-9 h-9 rounded-xl object-contain border border-slate-200 shrink-0",
                    isBlurred && "filter blur-[3.5px] select-none opacity-60",
                  )}
                  fallbackClassName={cn(
                    "w-9 h-9 rounded-xl bg-[#171F2C] text-white flex items-center justify-center font-bold text-xs shrink-0",
                    isBlurred && "filter blur-[3.5px] select-none opacity-60",
                  )}
                  textClassName="text-xs font-mono font-bold"
                />
                {isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                )}
              </div>

              {/* Core 3-Row Content Block */}
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                {/* ── ROW 1: Opportunity ID & Category Tags (Left) ── */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-[#171F2C] border border-slate-200/75">
                    {opp.opportunity_number || "RY-0042"}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                    {opp.type}
                  </span>
                  {isPromoted && (
                    <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200">
                      Urgent
                    </span>
                  )}
                  {shouldHide && (
                    <span className="text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-lg flex items-center gap-1 select-none">
                      <EyeOff className="w-3 h-3 text-[#94A3B8]" />
                      Anonymous Partner
                    </span>
                  )}
                  {isOwner && (
                    <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-lg bg-[#171F2C] text-white inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Your Listing
                    </span>
                  )}
                </div>

                {/* ── ROW 2: Opportunity Title (Ellipsed if long) ── */}
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
                    <span className="font-medium text-[#171F2C] truncate">
                      {displayCompany}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 text-emerald-700 text-[10px] font-medium shrink-0">
                    <RelayVerificationSeal className="w-3.5 h-3.5" size={14} /> Verified
                  </span>

                  <span className="text-slate-300">|</span>

                  <span className="truncate">
                    {opp.location || opp.geo || "Remote / Global"}
                  </span>

                  {opp.industry && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="truncate text-slate-500">{opp.industry}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Parity Score, Expiry & Expand/Collapse Icon */}
            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
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
                  <span className="text-xs text-slate-600 font-medium">
                    {expiryInfo.text}
                  </span>
                </div>
              </div>

              {/* Circular Chevron Expand/Collapse Indicator */}
              <div
                className={cn(
                  "w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 flex items-center justify-center text-slate-700 transition-transform duration-300 shrink-0",
                  isOpen && "rotate-180 bg-slate-200/80",
                )}
              >
                <ChevronDown className="w-4 h-4 text-slate-700 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        {/* ══════════════════════════════════════════════════════════════════
            2. EXPANDED STATE (COLLAPSIBLE DETAILS BODY)
            ══════════════════════════════════════════════════════════════════ */}
        <CollapsibleContent className="border-t border-slate-100 p-6 flex flex-col gap-4 bg-white transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
          {/* A. Counterparty Detail Strip */}
          <div className="flex items-center justify-between gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#171F2C] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                {getCompanyInitials(displayCompany)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-xs sm:text-sm text-[#171F2C] truncate">
                    {displayCompany}
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-medium shrink-0">
                    <RelayVerificationSeal className="w-3.5 h-3.5" size={14} /> Verified
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-[#64748B] shrink-0">
                    {shouldHide ? "Blinded Mode Active" : "Direct Bilateral Partner"}
                  </span>
                </div>
                <div className="text-xs text-[#64748B] truncate">
                  {opp.location || opp.geo || "Remote / Global"} • {opp.industry}
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-[#64748B] shrink-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                Turnaround
              </span>
              <span className="font-medium text-[#171F2C]">&lt; 2 hours</span>
            </div>
          </div>

          {/* B. Opportunity Description & Requirements */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
              Opportunity Overview &amp; Requirements
            </span>
            <p className="text-sm text-[#475569] leading-relaxed">
              {opp.description}
            </p>
          </div>

          {/* C. Bilateral Value Proposition (What We Offer) */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C]">
              <Repeat className="w-4 h-4 text-slate-500" />
              <span>What We Offer in Bilateral Exchange</span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {opp.offer_text || "Direct reciprocal margin & revenue split under sovereign non-circumvention covenants."}
            </p>
          </div>

          {/* D. Bottom Actions & Metadata */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap">
              {/* Unique Operator Views Counter */}
              <span className="flex items-center gap-1 font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-800">
                  {(opp.views ?? 0).toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500">
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
              <span className="flex items-center gap-1">
                <Inbox className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>
                  {opp.interested + 2} pitch
                  {opp.interested + 2 === 1 ? "" : "es"} in review
                </span>
              </span>

              <span className="text-slate-300">•</span>

              <span className="text-[11px] font-medium text-slate-500 uppercase">
                Stage 4 Bilateral Reveal
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {isOwner && onEdit ? (
                <button
                  type="button"
                  onClick={() => onEdit(opp)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[#171F2C] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#171F2C]" />
                  <span>Manage Listing</span>
                </button>
              ) : interestStatus === "pending" || interestStatus === "accepted" ? (
                <Link
                  to="/my-relay"
                  search={{ tab: "sent" }}
                  className="px-4 py-2 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Proposal Sent</span>
                </Link>
              ) : onExpressInterest ? (
                <button
                  type="button"
                  disabled={isBlurred}
                  onClick={() => onExpressInterest(opp)}
                  className="px-4 py-2 rounded-xl bg-[#171F2C] hover:bg-[#2C374A] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 self-end sm:self-center shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <span>Express Interest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
}
