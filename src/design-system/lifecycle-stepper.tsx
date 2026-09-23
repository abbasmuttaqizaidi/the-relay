import * as React from "react";
import { ArrowUpRight, GitFork } from "lucide-react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   1. BILATERAL DEALROOM STATUS CARD (VERTICAL 4-STAGE STEPPER)
   ========================================================================== */

export interface DealroomStageItem {
  number: number;
  name: string;
  badge?: string;
  badgeActive?: boolean;
  description: string;
  status: "completed" | "active" | "pending";
}

export interface BilateralDealroomStatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  stages?: DealroomStageItem[];
  governanceHref?: string;
  onGovernanceClick?: () => void;
}

const defaultStages: DealroomStageItem[] = [
  {
    number: 1,
    name: "Acknowledgment",
    badge: "Blind Match",
    description: "Mutual NCND generation & handshake intent.",
    status: "completed",
  },
  {
    number: 2,
    name: "Negotiation",
    badge: "1 Active",
    badgeActive: true,
    description: "Reciprocal terms revisions & SLA timers.",
    status: "active",
  },
  {
    number: 3,
    name: "Agreement",
    badge: "1 In Escrow",
    description: "Dual sovereign escrow signing.",
    status: "pending",
  },
  {
    number: 4,
    name: "Handshake",
    badge: "4 Ratified",
    description: "Direct unblinded C-suite exchange.",
    status: "pending",
  },
];

export function BilateralDealroomStatusCard({
  title = "Bilateral Dealroom Status",
  description = "Every exchange proceeds under strict mutual assent. Identities remain blinded until Stage 4 agreement.",
  stages = defaultStages,
  governanceHref = "#",
  onGovernanceClick,
  className,
  ...props
}: BilateralDealroomStatusCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#c5c6cc]/70 rounded-xl p-6 space-y-4 shadow-none select-none",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#c5c6cc]/40">
        <h4 className="font-sans text-base font-bold text-[#010611] tracking-tight">{title}</h4>
        <GitFork className="w-5 h-5 text-[#505f76]" />
      </div>

      <p className="text-xs text-[#505f76] leading-relaxed">{description}</p>

      {/* Stepper Timeline */}
      <div className="relative pt-2 pb-1">
        {/* Continuous Line */}
        <div className="absolute left-[13px] top-5 bottom-6 w-0.5 bg-[#c5c6cc]/60 z-0"></div>

        <div className="space-y-5 relative z-10">
          {stages.map((stg) => {
            const isDoneOrActive = stg.status === "completed" || stg.status === "active";
            return (
              <div key={stg.number} className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ring-4 ring-white transition-colors",
                    isDoneOrActive
                      ? "bg-[#010611] text-white"
                      : "bg-[#e6e8ea] border border-[#c5c6cc] text-[#505f76]",
                  )}
                >
                  {stg.number}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-xs font-bold font-sans",
                        isDoneOrActive ? "text-[#010611]" : "text-[#505f76]",
                      )}
                    >
                      {stg.name}
                    </span>
                    {stg.badge && (
                      <span
                        className={cn(
                          "font-mono text-[11px] rounded-full px-2 py-0.5 font-medium",
                          stg.badgeActive
                            ? "bg-[#e6e8ea] text-[#010611] font-bold"
                            : "text-[#505f76] bg-slate-100/60",
                        )}
                      >
                        {stg.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#505f76] leading-snug mt-0.5">{stg.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Governance Link */}
      <div className="pt-2 border-t border-[#c5c6cc]/40">
        <a
          href={governanceHref}
          onClick={onGovernanceClick}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#010611] hover:underline group cursor-pointer"
        >
          <span>View Protocol Governance</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. DEAL LIFECYCLE PROGRESS BAR (CARD-LEVEL 4-SEGMENT BAR)
   ========================================================================== */

export interface DealLifecycleProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStage: 1 | 2 | 3 | 4;
  stageSubtitle?: string;
}

export function DealLifecycleProgressBar({
  currentStage,
  stageSubtitle,
  className,
  ...props
}: DealLifecycleProgressBarProps) {
  const getStageTitle = (stage: number) => {
    switch (stage) {
      case 1:
        return "Stage 1: Acknowledgement (Mutual NCND Pending)";
      case 2:
        return "Stage 2: Negotiation (Counter-Offer In Review)";
      case 3:
        return "Stage 3: Agreement (Dual Signing in Escrow)";
      case 4:
        return "Stage 4: Handshake Complete (All 4 Stages Ratified)";
      default:
        return `Stage ${stage}`;
    }
  };

  return (
    <div className={cn("space-y-2 select-none", className)} {...props}>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="uppercase tracking-wider text-[#505f76] font-semibold text-[11px]">
          Current Lifecycle Stage
        </span>
        <span className="font-semibold text-[#010611] text-xs">
          {stageSubtitle || getStageTitle(currentStage)}
        </span>
      </div>

      {/* 4 Segment Bars */}
      <div className="grid grid-cols-4 gap-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            currentStage >= 1 ? "bg-[#010611]" : "bg-[#e6e8ea]",
          )}
          title="Stage 1: Acknowledgement"
        />
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            currentStage >= 2 ? "bg-[#010611]" : "bg-[#e6e8ea]",
          )}
          title="Stage 2: Negotiation"
        />
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            currentStage >= 3 ? "bg-[#010611]" : "bg-[#e6e8ea]",
          )}
          title="Stage 3: Agreement"
        />
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            currentStage >= 4 ? "bg-[#010611]" : "bg-[#e6e8ea]",
          )}
          title="Stage 4: Handshake"
        />
      </div>

      {/* Sub-labels */}
      <div className="flex justify-between text-[11px] font-mono text-[#505f76] mt-1.5">
        <span className={cn(currentStage === 1 ? "text-[#010611] font-bold" : "font-medium")}>
          1. Acknowledged
        </span>
        <span className={cn(currentStage === 2 ? "text-[#010611] font-bold" : "font-medium")}>
          2. Negotiation
        </span>
        <span className={cn(currentStage === 3 ? "text-[#010611] font-bold" : "font-medium")}>
          3. Agreement
        </span>
        <span className={cn(currentStage === 4 ? "text-[#010611] font-bold" : "font-medium")}>
          4. Handshake
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. DEAL LIFECYCLE TABS (4-STAGE HORIZONTAL TAB STRIP)
   ========================================================================== */

export interface DealLifecycleTabsProps {
  activeStage: number;
  onStageChange: (stage: number) => void;
  counts?: { [stage: number]: number };
  className?: string;
}

export function DealLifecycleTabs({
  activeStage,
  onStageChange,
  counts = { 1: 0, 2: 0, 3: 0, 4: 0 },
  className,
}: DealLifecycleTabsProps) {
  const tabs = [
    { stage: 1, name: "1. Acknowledgement" },
    { stage: 2, name: "2. Negotiation" },
    { stage: 3, name: "3. Agreement" },
    { stage: 4, name: "4. Handshake" },
  ];

  return (
    <div
      className={cn(
        "w-full border-b border-[#c5c6cc]/70 bg-white rounded-xl px-2 shadow-none select-none",
        className,
      )}
    >
      <div className="grid grid-cols-4 w-full">
        {tabs.map((tab) => {
          const isActive = activeStage === tab.stage;
          const count = counts[tab.stage] ?? 0;
          return (
            <button
              key={tab.stage}
              type="button"
              onClick={() => onStageChange(tab.stage)}
              className={cn(
                "py-3.5 border-b-2 font-sans text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap w-full transition-colors cursor-pointer",
                isActive
                  ? "border-[#010611] text-[#010611] font-bold"
                  : "border-transparent text-[#505f76] hover:text-[#010611] hover:border-[#c5c6cc] group",
              )}
            >
              <span>{tab.name}</span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[11px] font-mono transition-colors",
                  isActive
                    ? "bg-[#010611] text-white font-bold"
                    : "bg-[#e6e8ea] text-[#505f76] group-hover:bg-[#d8dadc] group-hover:text-[#010611] font-medium",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
