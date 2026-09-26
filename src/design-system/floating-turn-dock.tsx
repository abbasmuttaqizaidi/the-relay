import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  Timer,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Minus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TurnDeckDeal {
  id: string;
  partnerName: string;
  isVerified?: boolean;
  stageNum?: number;
  stageName?: string;
  direction?: "inbound" | "outbound";
  headline?: string;
  description?: string;
  message?: string;
  created_at?: string | Date;
  status?: string;
  primaryActionLabel?: string;
  opportunityId?: string;
  opportunityTitle?: string;
}

export interface FloatingTurnDockProps extends React.HTMLAttributes<HTMLDivElement> {
  deals?: TurnDeckDeal[];
  onOpenExchangeHub?: (deal: TurnDeckDeal) => void;
  onOpenDealroom?: (deal: TurnDeckDeal) => void;
  onReviewDeal?: (deal: TurnDeckDeal) => void;
  onDeclineDeal?: (deal: TurnDeckDeal) => void;
  onOpenSheet?: (deal: TurnDeckDeal) => void;
  defaultMinimized?: boolean;
  className?: string;
}

function calculateSla(createdAt: string | Date | undefined) {
  if (!createdAt) {
    return {
      formatted: "24h : 00m remaining",
      isUrgent: false,
      hoursLeft: 24,
      isExpired: false,
    };
  }

  const createdMs = new Date(createdAt).getTime();
  const deadlineMs = createdMs + 48 * 60 * 60 * 1000; // 48h SLA window
  const nowMs = Date.now();
  const diffMs = deadlineMs - nowMs;

  if (diffMs <= 0) {
    return {
      formatted: "< 01h : 00m remaining",
      isUrgent: true,
      hoursLeft: 0,
      isExpired: true,
    };
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    formatted: `${pad(hours)}h : ${pad(minutes)}m remaining`,
    isUrgent: hours < 5,
    hoursLeft: hours,
    isExpired: false,
  };
}

export function FloatingTurnDock({
  deals = [],
  onOpenExchangeHub,
  onOpenDealroom,
  onReviewDeal,
  onDeclineDeal,
  onOpenSheet,
  defaultMinimized = false,
  className,
  ...props
}: FloatingTurnDockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);
  const [isDismissed, setIsDismissed] = useState(false);

  // Keep index within bounds if deals change dynamically
  useEffect(() => {
    if (currentIndex >= deals.length && deals.length > 0) {
      setCurrentIndex(deals.length - 1);
    }
  }, [deals.length, currentIndex]);

  const hasDeals = deals.length > 0;
  const currentDeal = hasDeals ? deals[currentIndex] || deals[0] : null;

  // Urgent counts (< 5 hours)
  const urgentCount = useMemo(() => {
    return deals.filter((d) => {
      const sla = calculateSla(d.created_at);
      return sla.isUrgent;
    }).length;
  }, [deals]);

  const currentSla = useMemo(() => {
    return calculateSla(currentDeal?.created_at);
  }, [currentDeal?.created_at]);

  if (isDismissed) {
    return null;
  }

  const nextSlide = () => {
    if (deals.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }
  };

  const prevSlide = () => {
    if (deals.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length);
    }
  };

  const pStage = currentDeal?.stageNum || 1;
  const stageTitle =
    currentDeal?.stageName ||
    (pStage === 1
      ? "Stage 1 · Acknowledgement"
      : pStage === 2
      ? "Stage 2 · Mutual Protocol"
      : pStage === 3
      ? "Stage 3 · Negotiation"
      : "Stage 4 · Handshake");

  const isInbound = currentDeal?.direction === "inbound";
  const partnerName = currentDeal?.partnerName || "Counterparty Node";
  const descText =
    currentDeal?.description ||
    currentDeal?.message ||
    currentDeal?.headline ||
    "Action item pending bilateral response.";

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] select-none transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* 1. Minimized Pill State */}
      {isMinimized ? (
        <div
          onClick={() => setIsMinimized(false)}
          className="flex items-center justify-between bg-[#171F2C] text-white px-4 py-3 rounded-lg shadow-2xl border border-slate-700/70 hover:bg-slate-900 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            {hasDeals ? (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            ) : (
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0" />
            )}
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-white">
              Turn-Deck
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span
              className={cn(
                "font-mono text-[11px] font-medium truncate",
                hasDeals
                  ? urgentCount > 0
                    ? "text-rose-300"
                    : "text-slate-300"
                  : "text-emerald-400"
              )}
            >
              {hasDeals
                ? urgentCount > 0
                  ? `${urgentCount} Urgent (<5h)`
                  : `${deals.length} Action Needed`
                : "All Caught Up"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold bg-white/10 border border-white/15 text-white shrink-0">
              {hasDeals ? `${deals.length} Pending` : "0 Pending"}
            </span>
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0" />
          </div>
        </div>
      ) : (
        /* 2. Expanded Card State */
        <div className="bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
          {/* Header Bar */}
          <div className="bg-[#171F2C] text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              {hasDeals ? (
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              )}
              <div className="flex items-baseline gap-1.5 truncate">
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-white">
                  Your Turn Pending
                </span>
                <span className="text-slate-500 text-[11px]">·</span>
                <span className="font-mono text-[11px] text-slate-300 truncate">
                  {hasDeals
                    ? `${urgentCount > 0 ? `${urgentCount} Urgent (<5h) · ` : ""}${deals.length} Total`
                    : "0 Total · All Clear"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Minimize to Pill"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close to Pill"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body Section */}
          {hasDeals && currentDeal ? (
            <div className="p-4 space-y-3">
              {/* Carousel Tabs + Arrow Controls */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-[280px]">
                  {deals.map((deal, idx) => {
                    const isActive = idx === currentIndex;
                    const shortName = deal.partnerName || `Deal ${idx + 1}`;
                    return (
                      <button
                        key={deal.id || idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                          "px-2.5 py-1 rounded-[4px] text-[11px] font-semibold tracking-tight transition-all shrink-0 cursor-pointer",
                          isActive
                            ? "bg-[#171F2C] text-white border border-[#171F2C]"
                            : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900"
                        )}
                      >
                        {idx + 1}. {shortName.length > 12 ? `${shortName.slice(0, 11)}…` : shortName}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={prevSlide}
                    disabled={deals.length <= 1}
                    className="w-6 h-6 rounded-[4px] flex items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Previous turn"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] text-slate-500 px-1">
                    {currentIndex + 1}/{deals.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextSlide}
                    disabled={deals.length <= 1}
                    className="w-6 h-6 rounded-[4px] flex items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Next turn"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Deal Card Content */}
              <div className="pt-1">
                {/* Stage & Status Badge */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-bold truncate max-w-[280px]">
                    {stageTitle}
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold border border-slate-900 text-slate-900 bg-slate-50 shrink-0">
                    Turn in Hand
                  </span>
                </div>

                {/* Partner & Headline */}
                <div className="py-2.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm font-bold text-[#171F2C] tracking-tight truncate">
                      {partnerName}
                    </h3>
                    {currentDeal?.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Syndicate Verified Node" />
                    )}
                    <span className="font-mono text-[10px] uppercase text-slate-400 font-semibold ml-auto shrink-0">
                      {isInbound ? "Inbound Pitch" : "Direct Intro"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {descText}
                  </p>

                  {/* Turn SLA Window Box */}
                  <div className="mt-3 p-2.5 rounded-[4px] bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Timer
                        className={cn(
                          "w-4 h-4 shrink-0",
                          currentSla.isUrgent ? "text-rose-600" : "text-slate-600"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 leading-tight">
                          Turn SLA Window
                        </span>
                        <span className="font-mono text-xs text-[#171F2C] font-bold">
                          {currentSla.formatted}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "font-sans text-[10px] font-semibold",
                        currentSla.isUrgent ? "text-rose-600" : "text-slate-500"
                      )}
                    >
                      {currentSla.isUrgent ? "Prevent turn decay" : "SLA Protected"}
                    </span>
                  </div>
                </div>

                {/* Action Button: Exclusive Exchange Hub > */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenExchangeHub) {
                        onOpenExchangeHub(currentDeal);
                      } else if (onOpenDealroom) {
                        onOpenDealroom(currentDeal);
                      } else if (onReviewDeal) {
                        onReviewDeal(currentDeal);
                      }
                    }}
                    className="w-full h-9 bg-[#171F2C] text-white rounded-[4px] font-sans text-xs font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Exchange Hub &gt;</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State: Zero Turns Awaiting Action */
            <div className="p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-[#171F2C]">
                  No Pending Turns Awaiting Action
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  You are all caught up! When a counterparty responds, submits a proposal, or signs an agreement, your turn will appear here.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="px-3 py-1.5 rounded-[4px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Minimize to Dock
                </button>
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 font-sans">
            <span className="text-[10px]">Relay Protocol · Non-circumvention active</span>
            <span className="text-[10px] font-mono font-medium text-slate-600">
              {hasDeals ? "SLA Encrypted" : "SLA Live"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
