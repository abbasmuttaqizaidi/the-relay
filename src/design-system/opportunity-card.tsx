import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Eye, EyeOff, Bookmark, Inbox, Lock, Pencil, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "@/components/company-logo";
import { DealCodeStamp, CategoryPill, UrgentBadge, VerifiedBadge, ParityScoreBadge } from "./badges";
import { ExchangeCalloutBox } from "./cards";
import { Button } from "./button";

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
  onSaveToggle?: (oppId: string, shouldSave: boolean) => void;
  onExpressInterest?: (opp: OpportunityCardData) => void;
  onEdit?: (opp: OpportunityCardData) => void;
  className?: string;
}

function formatExpiryTime(expiresAt?: string | null): { text: string; urgent: boolean } {
  if (!expiresAt) return { text: "No expiry", urgent: false };
  try {
    const exp = new Date(expiresAt).getTime();
    const now = Date.now();
    const diff = exp - now;
    if (diff <= 0) return { text: "Expired", urgent: true };
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 2) return { text: `Expires in ${days * 24}h`, urgent: true };
    if (days <= 7) return { text: `Expires in ${days} days`, urgent: true };
    return { text: `Expires in ${days} days`, urgent: false };
  } catch {
    return { text: "Active", urgent: false };
  }
}

export function OpportunityCard({
  opp,
  isOwner = false,
  isSaved = false,
  isBlurred = false,
  interestStatus = "idle",
  onSaveToggle,
  onExpressInterest,
  onEdit,
  className,
}: OpportunityCardProps) {
  const isPromoted = opp.promotion_status === "promoted";
  const expiryInfo = formatExpiryTime(opp.expires_at);
  const shouldHide = opp.hide_company_name && !isOwner;
  const displayCompany = shouldHide ? "Anonymous Verified Enterprise" : opp.company;

  return (
    <article
      className={cn(
        "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[4px] p-5 md:p-6 transition-all duration-200 hover:shadow-[0_1px_3px_0_rgba(23,31,44,0.06),0_1px_2px_-1px_rgba(23,31,44,0.04)] flex flex-col gap-4 group",
        className,
      )}
    >
      {/* 1. Card Header Bar */}
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <DealCodeStamp code={opp.opportunity_number || "RY-0042"} />
          <CategoryPill category={opp.type} />
          {isPromoted && <UrgentBadge label="Urgent Deal" />}
          {shouldHide && (
            <span className="text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] flex items-center gap-1 select-none">
              <EyeOff className="w-3 h-3 text-[#94A3B8]" />
              Anonymous Partner
            </span>
          )}
          {isOwner && (
            <span className="text-[11px] font-bold text-[#000000] bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-[4px] uppercase tracking-wider font-mono select-none">
              Your Listing
            </span>
          )}
        </div>

        <div
          className={cn(
            "flex items-center gap-1.5 text-xs font-mono",
            expiryInfo.urgent ? "text-[#C2410C] font-medium" : "text-[#94A3B8]",
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{expiryInfo.text}</span>
        </div>
      </div>

      {/* 2. Company Info Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <CompanyLogo
              src={shouldHide || isBlurred ? undefined : opp.logo_url}
              name={displayCompany}
              className={cn(
                "w-10 h-10 rounded-[4px] object-contain border border-[#E2E8F0] shrink-0",
                isBlurred && "filter blur-[3.5px] select-none opacity-60",
              )}
              fallbackClassName={cn(
                "w-10 h-10 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-bold text-sm shrink-0",
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
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {isBlurred ? (
                <span className="font-semibold text-sm text-[#171F2C] filter blur-[5px] select-none pointer-events-none truncate tracking-wide">
                  {opp.company || "Enterprise Corp Inc."}
                </span>
              ) : (
                <span className="font-semibold text-sm text-[#171F2C] truncate">
                  {displayCompany}
                </span>
              )}
              <VerifiedBadge />
              {isBlurred && (
                <span className="text-[10.5px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Protected
                </span>
              )}
            </div>
            <div className="text-xs text-[#64748B] truncate mt-0.5">
              {opp.location || opp.geo} • {opp.industry}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block shrink-0">
          <ParityScoreBadge score={opp.parityScore ?? 96} />
          <div className="text-[11px] text-[#94A3B8] font-mono">
            {opp.exchangesCompleted ?? 28} Exchanges Completed
          </div>
        </div>
      </div>

      {/* 3. Title & Description */}
      <div className="space-y-2">
        <h2 className="font-bold text-base md:text-lg text-[#171F2C] group-hover:text-[#000000] transition-colors leading-snug">
          {opp.title}
        </h2>
        <p className="text-xs md:text-sm text-[#64748B] leading-relaxed line-clamp-3">
          {opp.description}
        </p>
      </div>

      {/* 4. What We Offer in Exchange Callout */}
      {opp.offer_text && <ExchangeCalloutBox offerText={opp.offer_text} />}

      {/* 5. Card Footer Actions */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
        <div className="flex items-center gap-3.5 text-[#64748B] flex-wrap">
          {/* Unique Operator Views Counter */}
          <div
            className="flex items-center gap-1 font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
            title="Unique verified operators who reviewed this listing"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-800">
              {(opp.views ?? 0).toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-500">
              {(opp.views ?? 0) === 1 ? "view" : "views"}
            </span>
          </div>

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
                className={cn("w-4 h-4", isSaved ? "fill-[#000000] text-[#000000]" : "")}
              />
              <span>
                {opp.interested + (isSaved ? 1 : 0)} save
                {opp.interested + (isSaved ? 1 : 0) === 1 ? "" : "s"}
              </span>
            </button>
          )}

          <div className="flex items-center gap-1">
            <Inbox className="w-4 h-4 text-[#94A3B8]" />
            <span>
              {opp.interested + 2} pitch
              {opp.interested + 2 === 1 ? "" : "es"} in review
            </span>
          </div>

          <div
            className="hidden sm:flex items-center gap-1 text-[#94A3B8]"
            title="Contact details unlocked at Stage 4"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Stage 4 Bilateral Reveal</span>
          </div>
        </div>

        {/* Primary Action Button */}
        {isOwner && onEdit ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(opp)}
            className="gap-1.5"
          >
            <Pencil className="w-3.5 h-3.5 text-[#171F2C]" />
            <span>Edit Listing</span>
          </Button>
        ) : interestStatus === "pending" || interestStatus === "accepted" ? (
          <Link
            to="/my-relay"
            search={{ tab: "sent" }}
            className="inline-flex items-center gap-1.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs md:text-sm font-semibold px-4 py-2 rounded-[4px] transition-colors"
          >
            <CheckCircle className="w-4 h-4 text-[#059669]" />
            <span>Pitch Sent</span>
          </Link>
        ) : onExpressInterest ? (
          <Button
            variant="monochrome"
            size="sm"
            disabled={isBlurred}
            onClick={() => onExpressInterest(opp)}
            className="gap-1.5 font-semibold"
          >
            <span>Express Interest</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    </article>
  );
}
