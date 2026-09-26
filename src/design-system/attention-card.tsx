import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Flame,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileEdit,
  Building2,
  ExternalLink,
  Lock,
} from "lucide-react";
import { VerifiedBadge, ParityScoreBadge, DealCodeStamp, CategoryPill } from "./badges";

export type AttentionCardVariant =
  | "urgent-amber"      // Variant 1: Immediate Action Required / Your Turn
  | "critical-crimson"  // Variant 2: Imminent Lapse (<2h SLA remaining)
  | "waiting-partner"   // Variant 3: Waiting on Counterparty Diligence
  | "ratified-handshake"; // Variant 4: Handshake Complete / Escrow Locked

export interface AttentionCardProps {
  deal: {
    id: string;
    direction?: "inbound" | "outbound";
    status?: string;
    message?: string;
    created_at?: string;
    requesting_business?: {
      company_name?: string;
      status?: string;
      is_verified?: boolean;
    };
    opportunity?: {
      id?: string;
      opportunity_number?: string;
      title?: string;
      category?: string;
      industry?: string;
      location?: string;
      deal_size_formatted?: string;
      description?: string;
      offer_text?: string;
      company?: string;
    };
    workflow?: {
      partnerName?: string;
      isVerified?: boolean;
      stageNum?: number;
      turnText?: string;
      slaText?: string;
      slaDueInHours?: number;
      urgent?: boolean;
      currentTurn?: "user" | "counterparty";
      pendingActionText?: string;
      parityScore?: number;
      escrowProof?: string;
    };
  };
  variant?: AttentionCardVariant;
  onViewMemorandum?: (deal: any) => void;
  onOpenDealroom?: (deal: any) => void;
  className?: string;
}

export function ImmediateAttentionCard({
  deal,
  variant: explicitVariant,
  onViewMemorandum,
  onOpenDealroom,
  className = "",
}: AttentionCardProps) {
  const opp = deal.opportunity || {};
  const workflow = deal.workflow || {};
  const dealIdSuffix = (deal.id || "").replace(/[^a-zA-Z0-9]/g, "").slice(-4).toUpperCase() || "0042";
  const refCode = opp.opportunity_number || `RY-${dealIdSuffix}`;
  const title = opp.title || "Strategic Commercial Mandate";
  const partnerName =
    deal.requesting_business?.company_name ||
    workflow.partnerName ||
    opp.company ||
    "Verified Counterparty";
  const industry = opp.industry || opp.category || "Commercial Exchange";
  const dealValue = opp.deal_size_formatted || "Reciprocal Terms";

  // Compute dynamic SLA time remaining from creation timestamp if not explicitly passed
  const dynamicSlaHours = useMemo(() => {
    if (workflow.slaDueInHours !== undefined) return workflow.slaDueInHours;
    if (deal.created_at) {
      const elapsedMs = Date.now() - new Date(deal.created_at).getTime();
      const elapsedHours = Math.max(0, Math.floor(elapsedMs / (1000 * 60 * 60)));
      const totalSla = 48; // 48-hour institutional SLA window
      return Math.max(1, totalSla - elapsedHours);
    }
    return 18;
  }, [workflow.slaDueInHours, deal.created_at]);

  const dynamicSlaText = useMemo(() => {
    if (workflow.slaText) return workflow.slaText;
    if (dynamicSlaHours <= 2) return `${dynamicSlaHours}h remaining (Critical)`;
    if (dynamicSlaHours < 24) return `${dynamicSlaHours}h SLA remaining`;
    const days = Math.floor(dynamicSlaHours / 24);
    const remHours = dynamicSlaHours % 24;
    return `${days}d ${remHours}h SLA remaining`;
  }, [workflow.slaText, dynamicSlaHours]);

  const parityScore = useMemo(() => {
    if (workflow.parityScore) return workflow.parityScore;
    const isVer = deal.requesting_business?.is_verified ?? workflow.isVerified ?? true;
    return isVer ? 98 : 94;
  }, [workflow.parityScore, deal.requesting_business, workflow.isVerified]);

  // Auto-detect variant if not passed explicitly
  const variant: AttentionCardVariant =
    explicitVariant ||
    (dynamicSlaHours <= 2
      ? "critical-crimson"
      : deal.status === "completed" || workflow.stageNum === 4
      ? "ratified-handshake"
      : workflow.currentTurn === "counterparty"
      ? "waiting-partner"
      : "urgent-amber");

  // Format header styles & text based on archetype
  const config = {
    "urgent-amber": {
      stripBg: "bg-[#FFFBEB] border-b border-[#FDE68A]",
      dotBg: "bg-[#D97706]",
      labelColor: "text-[#B45309]",
      subLabelColor: "text-[#92400E]",
      labelText: "Immediate Action Required · Your Turn",
      slaText: dynamicSlaText,
      pendingAction: workflow.pendingActionText || workflow.turnText || "Review counterparty terms",
      primaryCta: "Respond to Counter-Offer",
      primaryCtaBg: "bg-[#171F2C] hover:bg-black text-white",
      pulse: true,
    },
    "critical-crimson": {
      stripBg: "bg-[#FEF2F2] border-b border-[#FECACA]",
      dotBg: "bg-[#DC2626]",
      labelColor: "text-[#991B1B]",
      subLabelColor: "text-[#7F1D1D]",
      labelText: "Critical SLA Breach Risk · Immediate Response Needed",
      slaText: dynamicSlaText,
      pendingAction: workflow.pendingActionText || "Execute binding clearance or forfeit priority",
      primaryCta: "Execute Emergency Clearance",
      primaryCtaBg: "bg-[#991B1B] hover:bg-[#7F1D1D] text-white",
      pulse: true,
    },
    "waiting-partner": {
      stripBg: "bg-slate-100 border-b border-slate-200",
      dotBg: "bg-slate-500",
      labelColor: "text-slate-700",
      subLabelColor: "text-slate-500",
      labelText: "Waiting on Counterparty",
      slaText: dynamicSlaText,
      pendingAction: "Legal & technical diligence in progress",
      primaryCta: "Open Dealroom Context",
      primaryCtaBg: "bg-slate-800 hover:bg-slate-900 text-white",
      pulse: false,
    },
    "ratified-handshake": {
      stripBg: "bg-[#F0FDF4] border-b border-[#DCFCE7]",
      dotBg: "bg-[#16A34A]",
      labelColor: "text-[#15803D]",
      subLabelColor: "text-[#166534]",
      labelText: "Handshake Complete · Ratified",
      slaText: workflow.escrowProof ? `Proof: ${workflow.escrowProof.slice(0, 8)}...` : "Fully Bound",
      pendingAction: "Bilateral escrow terms locked & sealed",
      primaryCta: "Access Sovereign Escrow Room",
      primaryCtaBg: "bg-[#15803D] hover:bg-[#166534] text-white",
      pulse: false,
    },
  }[variant];

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top Operational Status Strip */}
        <div className={`px-4 py-2.5 flex items-center justify-between gap-2 ${config.stripBg}`}>
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              {config.pulse && (
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotBg} opacity-75`}
                />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotBg}`} />
            </span>
            <span
              className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate ${config.labelColor}`}
            >
              {config.labelText}
            </span>
          </div>
          <span
            className={`font-mono text-[10px] sm:text-[11px] font-bold shrink-0 ${config.subLabelColor}`}
          >
            {config.slaText}
          </span>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-xs text-slate-600 truncate">
                {partnerName}
              </span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {industry}
              </span>
            </div>
            <ParityScoreBadge score={parityScore} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DealCodeStamp code={refCode} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#171F2C] leading-snug line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Quick Term & Pending Action Chip Grid */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs">
            <div className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Commercial Value
              </span>
              <span className="font-mono font-bold text-slate-900 truncate block">
                {dealValue}
              </span>
            </div>
            <div className="text-right min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Action Mandate
              </span>
              <span
                className={`font-medium text-[11px] truncate block ${
                  variant === "critical-crimson"
                    ? "text-red-700 font-bold"
                    : variant === "urgent-amber"
                    ? "text-amber-800 font-semibold"
                    : "text-slate-600"
                }`}
              >
                {config.pendingAction}
              </span>
            </div>
          </div>

          {deal.message && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed italic">
              "{deal.message}"
            </p>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={() => onViewMemorandum?.(deal)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          View Memorandum
        </button>

        <Link
          to="/my-relay"
          search={{ tab: deal.direction === "outbound" ? "outbound" : "inbound", deal: deal.id } as any}
          className={`px-3.5 py-1.5 rounded-[4px] font-semibold text-xs transition inline-flex items-center gap-1.5 shadow-xs ${config.primaryCtaBg}`}
        >
          <span>{config.primaryCta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
