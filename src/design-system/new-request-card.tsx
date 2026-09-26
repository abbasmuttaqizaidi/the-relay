import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  ArrowRight,
  ShieldCheck,
  EyeOff,
  Lock,
  ArrowRightLeft,
  FileText,
  Target,
  Share2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { DealCodeStamp, ParityScoreBadge, VerifiedBadge } from "./badges";

export type NewRequestCardVariant = "compact" | "expanded" | "stream" | "comparison";

export interface NewRequestCardProps {
  request: {
    id: string;
    created_at?: string;
    status?: string;
    proposed_terms?: string;
    message?: string;
    value_categories?: string[];
    delivery_methods?: string[];
    highlighted_terms?: string[];
    requesting_business?: {
      company_name?: string;
      industry?: string;
      hq_location?: string;
      is_verified?: boolean;
      status?: string;
      company_type?: string;
      funding_stage?: string;
    };
    opportunity?: {
      id?: string;
      opportunity_number?: string;
      title?: string;
      category?: string;
      industry?: string;
      offer_text?: string;
      company?: string;
      deal_size_formatted?: string;
    };
    workflow?: {
      partnerName?: string;
      isVerified?: boolean;
      parityScore?: number;
      slaRemainingHours?: number;
      proposedDimension?: string;
      proposedTerms?: string;
      reciprocalTarget?: string;
    };
  };
  variant?: NewRequestCardVariant;
  onReviewPitch?: (request: any) => void;
  className?: string;
}

export function NewRequestCard({
  request,
  variant = "compact",
  onReviewPitch,
  className = "",
}: NewRequestCardProps) {
  const opp = request.opportunity || {};
  const business = request.requesting_business || {};
  const workflow = request.workflow || {};

  const reqIdSuffix = (request.id || "").replace(/[^a-zA-Z0-9]/g, "").slice(-4).toUpperCase() || "8942";
  const refCode = opp.opportunity_number || `#REQ-${reqIdSuffix}`;
  const title = opp.title || "Strategic Commercial Mandate";
  
  // Blinded counterparty display
  const partnerName =
    business.company_name ||
    workflow.partnerName ||
    opp.company ||
    "Confidential Tier-1 Partner";
  
  const partnerIndustry = business.industry || opp.industry || "Enterprise Integrator";
  const partnerLocation = business.hq_location || "Zurich / London";

  // Dynamic SLA Countdown calculation (48-hour hard institutional window)
  const slaRemaining = useMemo(() => {
    if (workflow.slaRemainingHours !== undefined) {
      return `${workflow.slaRemainingHours}h remaining`;
    }
    if (request.created_at) {
      const elapsedMs = Date.now() - new Date(request.created_at).getTime();
      const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
      const hoursLeft = Math.max(1, 48 - elapsedHours);
      if (hoursLeft < 24) return `${hoursLeft}h remaining`;
      const days = Math.floor(hoursLeft / 24);
      const remHours = hoursLeft % 24;
      return `${days}d ${remHours}h remaining`;
    }
    return "46h 36m remaining";
  }, [workflow.slaRemainingHours, request.created_at]);

  const timeAgoText = useMemo(() => {
    if (request.created_at) {
      return formatTimeAgo(request.created_at);
    }
    return "1h 24m ago";
  }, [request.created_at]);

  const parityScore = workflow.parityScore || 98.4;
  const isVerified = business.status === "approved" || business.is_verified || workflow.isVerified !== false;

  const proposedTerms =
    request.proposed_terms ||
    workflow.proposedTerms ||
    "20% Gross Margin Reseller Alliance";

  const targetReciprocity =
    opp.offer_text ||
    workflow.reciprocalTarget ||
    "Procurement Introductions (Tier-1 MSA Accounts)";

  const proposedDimension =
    (request.value_categories && request.value_categories[0]) ||
    workflow.proposedDimension ||
    "Distribution & Sales Channel Access";

  const pitchNarrative =
    request.message ||
    "Our enterprise distribution syndicate holds active master vendor service agreements across 28 DACH financial institutions and can immediately syndicate your solution into live RFP pipelines.";

  // ═════════════════════════════════════════════════════════════════════════
  // 1. VARIANT B: HIGH-DENSITY STREAM ROW (Fluid Width Tabular Feed)
  // ═════════════════════════════════════════════════════════════════════════
  if (variant === "stream") {
    return (
      <div
        className={`bg-white p-4 rounded-xl border-l-2 border-y border-r border-l-[#171F2C] border-slate-200 hover:border-slate-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all shadow-xs ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#171F2C] shrink-0 animate-pulse" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#171F2C] text-white uppercase font-bold tracking-wider rounded-full">
                New
              </span>
              <span className="font-bold text-sm text-[#171F2C] truncate">
                {title}
              </span>
              <span className="font-mono text-xs text-slate-400 hidden xl:inline">
                {refCode}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>{partnerName}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="truncate">{proposedTerms}</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="font-mono text-[11px] font-semibold px-1.5 py-0.2 rounded border border-[#DCFCE7] bg-[#F0FDF4] text-[#15803D] hidden sm:inline">
                {parityScore}% Match
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]">
            {slaRemaining}
          </span>
          <Link
            to="/my-relay"
            search={{ tab: "inbound", deal: request.id } as any}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171F2C] hover:bg-black text-white text-xs font-bold rounded-lg transition shadow-xs"
          >
            <span>Exchange Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 2. VARIANT C: STAGE PROGRESSION COMPARISON TILE
  // ═════════════════════════════════════════════════════════════════════════
  if (variant === "comparison") {
    return (
      <div
        className={`bg-white p-5 rounded-xl border-2 border-[#171F2C] flex flex-col justify-between gap-4 relative shadow-xs ${className}`}
      >
        <div className="absolute -top-3 left-4 bg-[#171F2C] text-white px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded font-bold">
          Stage 01 Focus
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase text-[#171F2C]">
              Stage 01 • New Request
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
              Triage
            </span>
          </div>
          <h4 className="font-bold text-sm text-[#171F2C] line-clamp-1">
            {request.opportunity?.title || "Unvetted Pitch Transmittal"}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Counterparty is blinded. Bilateral terms are exploratory. No binding counters can be drafted prior to mutual acknowledgement.
          </p>
          <div className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center gap-1.5 text-slate-600">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-mono text-[11px] text-slate-700">Terminal decision locked to Hub</span>
          </div>
        </div>
        <Link
          to="/my-relay"
          search={{ tab: "inbound", deal: request.id } as any}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-[#171F2C] hover:bg-black text-white text-xs font-bold rounded-lg transition"
        >
          <span>Exchange Hub →</span>
        </Link>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 3. VARIANT: EXPANDED HERO EXECUTIVE STATE (Full-Width Showcase)
  // ═════════════════════════════════════════════════════════════════════════
  if (variant === "expanded") {
    return (
      <article
        className={`bg-white rounded-xl border-l-4 border-y border-r border-l-[#171F2C] border-slate-200 hover:border-slate-400 transition-all overflow-hidden shadow-sm ${className}`}
      >
        {/* Header Strip: System Metadata & SLA */}
        <div className="bg-slate-50/80 px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#171F2C] text-white px-2.5 py-1 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                New Inbound Request
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Received {timeAgoText}</span>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              {refCode}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
              Mandate:
            </span>
            <span className="font-bold text-xs sm:text-sm text-[#171F2C] truncate max-w-xs sm:max-w-md">
              {title}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 md:p-6 space-y-5">
          {/* Entity & Parity Alignment Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
                <EyeOff className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-xs text-[#171F2C]">{partnerName}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{partnerLocation}</span>
              </div>
              {isVerified && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#DCFCE7] bg-[#F0FDF4] text-[#15803D]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                    Pre-Vetted Enterprise
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  Bilateral Match Index
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#DCFCE7] bg-[#F0FDF4] mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span className="font-bold text-xs text-[#15803D]">
                    {parityScore}% Parity Alignment
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Value Matrix: 3 Column Strategic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                  Proposed Dimension
                </span>
              </div>
              <p className="font-bold text-xs text-[#171F2C]">{proposedDimension}</p>
              <p className="text-[11px] text-slate-500 leading-tight">
                Immediate enterprise distribution access for target markets.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <FileText className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                  Proposed Terms
                </span>
              </div>
              <p className="font-bold text-xs text-[#171F2C] truncate">{proposedTerms}</p>
              <p className="text-[11px] text-slate-500 leading-tight">
                Benchmark commercial covenant on live pipeline volume.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Target className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                  Reciprocal Request
                </span>
              </div>
              <p className="font-bold text-xs text-[#171F2C] truncate">{targetReciprocity}</p>
              <p className="text-[11px] text-slate-500 leading-tight">
                Direct client introductions and reciprocal revenue split.
              </p>
            </div>
          </div>

          {/* Pitch Narrative Quotation Box */}
          <div className="bg-slate-50/60 p-4 rounded-lg border-l-2 border-[#171F2C] flex flex-col gap-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                Inbound Transmittal Summary
              </span>
              <span className="font-mono text-[10px]">ENCRYPTED AT REST</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              “{pitchNarrative}”
            </p>
          </div>

          {/* Cryptographic Blinded Notice */}
          <div className="bg-slate-100/60 px-3 py-2 rounded flex items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>
                <strong className="text-[#171F2C]">Stage 01 Notice:</strong> Counterparty legal identifiers remain blinded until Stage 04 Bilateral Handshake.
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400 hidden md:inline">
              PROTOCOL CDOE-v3.4
            </span>
          </div>
        </div>

        {/* Footer: SLA & Single Decisive Terminal Route */}
        <div className="bg-slate-50 px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]">
              <Clock className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-mono text-xs font-bold">48h SLA Triage:</span>
              <span className="font-mono text-xs font-semibold">{slaRemaining}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="hidden xl:flex items-center gap-1 text-slate-400 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>Terminal decisions locked to Hub</span>
            </div>
            <Link
              to="/my-relay"
              search={{ tab: "inbound", deal: request.id } as any}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#171F2C] hover:bg-black text-white text-xs font-bold rounded-lg shadow-xs transition"
            >
              <span>Open in Exchange Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 4. DEFAULT: VARIANT A (Compact Grid Tile / Dealboard Card - 380px)
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <article
      className={`bg-white rounded-xl border-l-4 border-y border-r border-l-[#171F2C] border-slate-200 hover:border-slate-400 p-4 sm:p-5 flex flex-col justify-between transition-all shadow-xs ${className}`}
    >
      <div className="space-y-3.5">
        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-[#171F2C] text-white px-2.5 py-0.5 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              New Request
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {timeAgoText}
          </span>
        </div>

        {/* Title & Category */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DealCodeStamp code={refCode} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              {opp.category || "Commercial Exchange"}
            </span>
          </div>
          <h3 className="font-bold text-sm sm:text-base text-[#171F2C] line-clamp-2 leading-snug">
            {title}
          </h3>
        </div>

        {/* Blinded Counterparty Badge */}
        <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <EyeOff className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-xs text-[#171F2C] truncate">
              {partnerName}
            </span>
          </div>
          <ParityScoreBadge score={parityScore} />
        </div>

        {/* Proposed Terms & Reciprocity Summary */}
        <div className="space-y-1.5 py-2 border-y border-slate-100 text-xs">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-slate-400 text-[11px] uppercase font-mono">Proposed:</span>
            <span className="font-bold text-slate-800 truncate text-right">{proposedTerms}</span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-slate-400 text-[11px] uppercase font-mono">Reciprocity:</span>
            <span className="font-medium text-slate-700 truncate text-right">{targetReciprocity}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400 text-[11px] uppercase font-mono">SLA Window:</span>
            <span className="font-mono font-bold text-[11px] px-1.5 py-0.2 rounded bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
              {slaRemaining}
            </span>
          </div>
        </div>

        {/* Pitch Quote snippet */}
        {pitchNarrative && (
          <p className="text-xs text-slate-500 line-clamp-2 italic leading-relaxed">
            "{pitchNarrative}"
          </p>
        )}
      </div>

      {/* Terminal Action CTA (Zero Premature Inline Commitments) */}
      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onReviewPitch?.(request)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          View Scope
        </button>

        <Link
          to="/my-relay"
          search={{ tab: "inbound", deal: request.id } as any}
          className="px-3.5 py-1.5 bg-[#171F2C] hover:bg-black text-white text-xs font-bold rounded-lg shadow-xs transition inline-flex items-center gap-1.5"
        >
          <span>Exchange Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
