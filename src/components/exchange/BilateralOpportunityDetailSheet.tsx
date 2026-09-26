import * as React from "react";
import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Clock,
  ArrowDown,
  ArrowUp,
  MapPin,
  Repeat,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Button,
  CategoryPill,
  VerifiedBadge,
  MiniStageBarStepper,
} from "@/design-system";
import { cn, formatTimeAgo } from "@/lib/utils";

export interface NormalizedSheetDeal {
  id?: string;
  dealId?: string;
  headline: string;
  partnerName: string;
  isVerified?: boolean;
  isInbound: boolean;
  pStage: 1 | 2 | 3 | 4;
  status?: string;
  category?: string;
  industry?: string;
  location?: string;
  dealSize?: string;
  description?: string;
  offerText?: string;
  message?: string;
  createdAt?: string | Date;
  contactEmail?: string;
  deal?: any;
}

export function normalizeDealForSheet(rawDeal: any): NormalizedSheetDeal | null {
  if (!rawDeal) return null;

  const dealObj = rawDeal.deal || rawDeal;
  const opp = dealObj.opportunity || rawDeal.opportunity || {};

  const isInbound =
    typeof rawDeal.isInbound === "boolean"
      ? rawDeal.isInbound
      : dealObj.direction === "inbound" ||
        Boolean(dealObj.requesting_business && !dealObj.opportunity?.business_id) ||
        true;

  const partnerName =
    rawDeal.partnerName ||
    dealObj.workflow?.partnerName ||
    dealObj.requesting_business?.company_name ||
    dealObj.partnerBusiness?.company_name ||
    opp.business?.company_name ||
    opp.company ||
    "Counterparty Enterprise";

  const isVerified =
    dealObj.workflow?.isVerified ??
    Boolean(
      dealObj.requesting_business?.status === "approved" ||
      opp.business?.status === "approved"
    );

  const headline =
    rawDeal.headline ||
    opp.title ||
    dealObj.title ||
    "Bilateral Opportunity Memorandum";

  const rawStage =
    rawDeal.pStage ||
    dealObj.workflow?.stageNum ||
    (dealObj.status === "accepted" ? 4 : 1);
  const pStage = Math.max(1, Math.min(4, Number(rawStage) || 1)) as 1 | 2 | 3 | 4;

  const category =
    opp.category === "strategic_advice"
      ? "Strategic Advice"
      : opp.category || opp.type || "Partnership";

  const industry = opp.industry;
  const location = opp.location || opp.geo;
  const dealSize = opp.deal_size_formatted || opp.deal_size;
  const description = opp.description;
  const offerText = opp.offer_text;
  const message = dealObj.message;
  const status = dealObj.status;
  const createdAt = dealObj.created_at;
  const contactEmail =
    dealObj.requesting_business?.contact_email ||
    opp.business?.contact_email;

  const id = dealObj.id || rawDeal.id;

  return {
    id,
    dealId: id,
    headline,
    partnerName,
    isVerified,
    isInbound,
    pStage,
    status,
    category,
    industry,
    location,
    dealSize,
    description,
    offerText,
    message,
    createdAt,
    contactEmail,
    deal: dealObj,
  };
}

export interface BilateralOpportunityDetailContentProps {
  deal: any;
  onClose: () => void;
  onOpenExchangeHub?: (dealId: string) => void;
}

export function BilateralOpportunityDetailContent({
  deal: rawDeal,
  onClose,
  onOpenExchangeHub,
}: BilateralOpportunityDetailContentProps) {
  const navigate = useNavigate();
  const deal = useMemo(() => normalizeDealForSheet(rawDeal), [rawDeal]);

  if (!deal) return null;

  const handleOpenDealroom = () => {
    const targetId = deal.id || deal.dealId;
    onClose();
    if (onOpenExchangeHub && targetId) {
      onOpenExchangeHub(targetId);
    } else if (targetId) {
      navigate({ to: "/connections/$id", params: { id: targetId } });
    }
  };

  return (
    <>
      {/* Radix Accessible Header */}
      <SheetHeader className="sr-only">
        <SheetTitle>{deal.headline || "Opportunity Details"}</SheetTitle>
        <SheetDescription>Bilateral opportunity memorandum and dealroom summary</SheetDescription>
      </SheetHeader>

      {/* Top Drag Handle */}
      <div className="flex justify-center pt-3 pb-1 shrink-0 bg-slate-50 border-b border-slate-100">
        <div className="w-12 h-1.5 rounded-full bg-slate-300" />
      </div>

      {/* Sheet Main Header */}
      <div className="px-6 py-4 border-b border-[#E2E8F0] bg-white shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category / Type */}
            <CategoryPill category={deal.category || "Partnership"} />

            {/* Received Time */}
            {deal.createdAt && (
              <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1 bg-[#F8FAFC] px-2 py-0.5 rounded-[4px] border border-[#E2E8F0]">
                <Clock className="w-3 h-3 text-[#94A3B8]" />
                <span>Received {formatTimeAgo(deal.createdAt)}</span>
              </span>
            )}

            {/* Inbound / Outbound Direction */}
            <span
              className={cn(
                "text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] inline-flex items-center gap-1 border",
                deal.isInbound
                  ? "bg-[#171F2C] text-white border-[#171F2C]"
                  : "bg-[#F1F5F9] text-[#171F2C] border-[#E2E8F0]"
              )}
            >
              {deal.isInbound ? (
                <ArrowDown className="w-2.5 h-2.5 text-white" />
              ) : (
                <ArrowUp className="w-2.5 h-2.5 text-[#171F2C]" />
              )}
              <span>{deal.isInbound ? "Inbound" : "Outbound"}</span>
            </span>

            {/* Proposal Status */}
            {deal.status && (
              <span
                className={cn(
                  "text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border",
                  deal.status === "accepted"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : deal.status === "declined"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-slate-100 text-[#475569] border-[#CBD5E1]"
                )}
              >
                Status: {deal.status}
              </span>
            )}
          </div>

          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#171F2C] tracking-tight truncate">
            {deal.headline}
          </h2>

          <div className="flex items-center gap-2 text-xs text-[#64748B] flex-wrap">
            <span className="font-semibold text-[#171F2C]">{deal.partnerName}</span>

            {deal.isVerified && (
              <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-medium">
                <VerifiedBadge size={14} /> Verified Enterprise
              </span>
            )}

            {deal.location && (
              <>
                <span className="text-[#CBD5E1]">|</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                  {deal.location}
                </span>
              </>
            )}

            {deal.industry && (
              <>
                <span className="text-[#CBD5E1]">•</span>
                <span>{deal.industry}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
          <MiniStageBarStepper stage={deal.pStage} className="w-full sm:w-[170px]" />
          <Button
            type="button"
            variant="monochrome"
            size="sm"
            onClick={handleOpenDealroom}
            className="gap-2 font-medium"
          >
            <span>Open Exchange Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Sheet Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
        {/* Dynamic Metadata Attributes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
              Category
            </div>
            <div className="text-xs font-bold text-[#171F2C] truncate">
              {deal.category}
            </div>
          </div>

          {deal.industry && (
            <div className="bg-white p-3.5 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                Industry
              </div>
              <div className="text-xs font-bold text-[#171F2C] truncate">
                {deal.industry}
              </div>
            </div>
          )}

          {deal.location && (
            <div className="bg-white p-3.5 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                Location / Region
              </div>
              <div className="text-xs font-bold text-[#171F2C] truncate">
                {deal.location}
              </div>
            </div>
          )}

          {deal.dealSize && (
            <div className="bg-white p-3.5 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                Commercial Size / Value
              </div>
              <div className="text-xs font-bold text-[#171F2C] truncate">
                {deal.dealSize}
              </div>
            </div>
          )}
        </div>

        {/* 4-Stage Dealroom Lifecycle Stepper */}
        <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="space-y-0.5">
              <h3 className="font-display font-bold text-sm sm:text-base text-[#171F2C]">
                Dealroom Lifecycle Progress
              </h3>
              <p className="text-xs text-[#64748B]">
                Current Status: Stage {deal.pStage} of 4
              </p>
            </div>
            <MiniStageBarStepper stage={deal.pStage} className="w-[160px]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {[
              { stage: 1, name: "Stage 1: Acknowledgement", desc: "Mutual intent declared & verified." },
              { stage: 2, name: "Stage 2: Negotiation", desc: "Digital covenants & terms in review." },
              { stage: 3, name: "Stage 3: Agreement", desc: "Dual-authorized terms ratified." },
              { stage: 4, name: "Stage 4: Handshake", desc: "Direct unblinded exchange complete." },
            ].map((step) => {
              const isCompleted = step.stage < deal.pStage;
              const isCurrent = step.stage === deal.pStage;
              return (
                <div
                  key={step.stage}
                  className={cn(
                    "p-3 rounded-[4px] border transition-all space-y-1.5",
                    isCurrent && "border-[#171F2C] bg-white ring-1 ring-[#171F2C] shadow-xs",
                    isCompleted && "border-emerald-200 bg-emerald-50/40",
                    !isCurrent && !isCompleted && "border-[#E2E8F0] bg-[#F8FAFC] opacity-70"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "w-5 h-5 rounded-[4px] flex items-center justify-center font-mono font-bold text-[10px]",
                        isCurrent && "bg-[#171F2C] text-white",
                        isCompleted && "bg-emerald-600 text-white",
                        !isCurrent && !isCompleted && "bg-[#E2E8F0] text-[#64748B]"
                      )}
                    >
                      {isCompleted ? "✓" : step.stage}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#171F2C] bg-[#F1F5F9] px-1.5 py-0.5 rounded-[3px]">
                        Current
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded-[3px]">
                        Done
                      </span>
                    )}
                  </div>
                  <div className="font-semibold text-xs text-[#171F2C]">{step.name}</div>
                  <p className="text-[11px] text-[#64748B] leading-snug">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Opportunity Description */}
        {deal.description && (
          <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-2.5">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#171F2C] pb-2.5 border-b border-[#E2E8F0]">
              Opportunity Description &amp; Scope
            </h3>
            <div className="text-xs sm:text-sm text-[#334155] leading-relaxed whitespace-pre-line">
              {deal.description}
            </div>
          </div>
        )}

        {/* Dynamic Reciprocal Expectation (What We Are Expecting) */}
        {deal.offerText && (
          <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
              <Repeat className="w-3.5 h-3.5 text-[#F97316]" />
              <span>What We Are Expecting</span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {deal.offerText}
            </p>
          </div>
        )}

        {/* Dynamic Proposal Pitch Message (if available) */}
        {deal.message && (
          <div className="bg-white p-5 sm:p-6 rounded-[4px] border border-[#E2E8F0] shadow-2xs space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-semibold flex items-center gap-1.5 pb-2 border-b border-[#E2E8F0]">
              <MessageSquare className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Introduction Message / Pitch</span>
            </div>
            <p className="text-xs sm:text-sm text-[#171F2C] italic leading-relaxed bg-[#F8FAFC] p-3.5 rounded-[4px] border border-[#E2E8F0]">
              "{deal.message}"
            </p>
          </div>
        )}

        {/* If accepted & direct contact unlocked */}
        {deal.status === "accepted" && deal.contactEmail && (
          <div className="p-4 rounded-[4px] bg-emerald-50 border border-emerald-200 text-xs flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Direct Bilateral Contact Unlocked</span>
            </div>
            <a
              href={`mailto:${deal.contactEmail}`}
              className="text-emerald-900 font-mono text-xs hover:underline font-semibold"
            >
              {deal.contactEmail}
            </a>
          </div>
        )}
      </div>

      {/* Sheet Footer */}
      <div className="px-6 py-3.5 border-t border-[#E2E8F0] bg-white shrink-0 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
        >
          Close Sheet
        </Button>

        <Button
          type="button"
          variant="monochrome"
          size="sm"
          onClick={handleOpenDealroom}
          className="gap-2 font-medium"
        >
          <span>Exchange Hub &gt;</span>
        </Button>
      </div>
    </>
  );
}

export interface BilateralOpportunityDetailSheetProps {
  deal: any | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  onOpenExchangeHub?: (dealId: string) => void;
}

export function BilateralOpportunityDetailSheet({
  deal,
  open,
  onOpenChange,
  onClose,
  onOpenExchangeHub,
}: BilateralOpportunityDetailSheetProps) {
  const isSheetOpen = typeof open === "boolean" ? open : Boolean(deal);

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
        } else if (onOpenChange) {
          onOpenChange(true);
        }
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[90vh] max-h-[90vh] rounded-t-2xl bg-white p-0 border-t border-[#CBD5E1] shadow-2xl flex flex-col overflow-hidden outline-none z-[100]"
      >
        {deal && (
          <BilateralOpportunityDetailContent
            deal={deal}
            onClose={handleClose}
            onOpenExchangeHub={onOpenExchangeHub}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
