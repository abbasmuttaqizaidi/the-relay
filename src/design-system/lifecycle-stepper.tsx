import * as React from "react";
import { ArrowUpRight, GitFork, Check } from "lucide-react";
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

/* ==========================================================================
   4. MINI STAGE STEPPER (COMPACT 4-STEP TRACKER FOR CARDS & BADGES)
   ========================================================================== */

export interface MiniStageStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  stage: 1 | 2 | 3 | 4;
  showLabel?: boolean;
}

export function MiniStageStepper({
  stage,
  showLabel = true,
  className,
  ...props
}: MiniStageStepperProps) {
  const stageFullNames: Record<1 | 2 | 3 | 4, string> = {
    1: "Stage 1 • Acknowledgement",
    2: "Stage 2 • Negotiation",
    3: "Stage 3 • Agreement",
    4: "Stage 4 • Handshake",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs font-mono select-none",
        className,
      )}
      title={stageFullNames[stage]}
      {...props}
    >
      {/* 4 Connected Mini Steps */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((stepNum, idx) => {
          const isPassed = stepNum < stage;
          const isCurrent = stepNum === stage;
          return (
            <React.Fragment key={stepNum}>
              {idx > 0 && (
                <span
                  className={cn(
                    "w-2 h-0.5 rounded-full transition-colors",
                    stepNum <= stage ? "bg-[#171F2C]" : "bg-[#CBD5E1]",
                  )}
                />
              )}
              <span
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all",
                  isCurrent && "bg-[#171F2C] text-white shadow-xs ring-1 ring-[#171F2C] ring-offset-1 ring-offset-white",
                  isPassed && "bg-emerald-600 text-white font-bold",
                  !isCurrent && !isPassed && "bg-[#E2E8F0] text-[#94A3B8]",
                )}
              >
                {isPassed ? "✓" : stepNum}
              </span>
            </React.Fragment>
          );
        })}
      </div>

      {showLabel && (
        <span className="text-[11px] font-semibold text-[#171F2C] pl-1.5 border-l border-[#CBD5E1] tracking-tight">
          {stageFullNames[stage]}
        </span>
      )}
    </div>
  );
}

/* ==========================================================================
   5. MINI STAGE BAR STEPPER (4 COMPACT BARS WITH SHORT STAGE LABELS: ack, neg, agr, shake)
   ========================================================================== */

export function MiniStageBarStepper({
  stage = 1,
  className,
  ...props
}: MiniStageBarStepperProps) {
  const safeStage = Math.max(1, Math.min(4, Number(stage) || 1));
  const steps = [
    { num: 1, label: "ack" },
    { num: 2, label: "neg" },
    { num: 3, label: "agr" },
    { num: 4, label: "shake" },
  ];

  return (
    <div className={cn("flex flex-col gap-1 select-none", className)} {...props}>
      {/* 4 horizontal mini bars */}
      <div className="grid grid-cols-4 gap-1 w-full min-w-[140px] sm:min-w-[160px]">
        {steps.map((s) => {
          const isActive = s.num <= safeStage;
          return (
            <div
              key={s.num}
              className={cn(
                "h-1.5 rounded-[2px] transition-colors",
                isActive ? "bg-[#171F2C]" : "bg-[#E2E8F0]",
              )}
            />
          );
        })}
      </div>

      {/* 4 labels below bars */}
      <div className="grid grid-cols-4 gap-1 w-full text-[9px] font-mono uppercase tracking-wider text-center">
        {steps.map((s) => {
          const isActive = s.num <= safeStage;
          const isCurrent = s.num === safeStage;
          return (
            <span
              key={s.num}
              className={cn(
                "transition-colors truncate",
                isCurrent
                  ? "font-bold text-[#171F2C]"
                  : isActive
                    ? "font-semibold text-[#475569]"
                    : "font-medium text-[#94A3B8]",
              )}
            >
              {s.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
   6. EXCHANGE PIPELINE RIBBON (SPEC SEO-EXCHANGE: 4-STAGE CONNECTED RIBBON)
   ========================================================================== */

export interface ExchangePipelineRibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStage: 1 | 2 | 3 | 4;
  isStep1Done?: boolean;
  isStep2Done?: boolean;
  isStep3Done?: boolean;
  isStep4Done?: boolean;
}

export function ExchangePipelineRibbon({
  currentStage,
  isStep1Done = currentStage > 1,
  isStep2Done = currentStage > 2,
  isStep3Done = currentStage > 3,
  isStep4Done = currentStage >= 4,
  className,
  ...props
}: ExchangePipelineRibbonProps) {
  return (
    <div
      className={cn(
        "bg-slate-50 border border-slate-200 px-5 sm:px-8 py-3.5 rounded-xl shadow-xs flex flex-wrap md:flex-nowrap items-center justify-between gap-4 select-none",
        className,
      )}
      {...props}
    >
      {/* Step 1 */}
      <div
        className={cn(
          "flex items-center gap-2.5 min-w-0",
          isStep1Done || currentStage === 1
            ? "text-slate-900 font-bold"
            : "text-slate-400 font-medium opacity-60",
        )}
      >
        <span
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs",
            isStep1Done
              ? "bg-slate-900 text-white"
              : currentStage === 1
              ? "bg-slate-900 text-white font-bold"
              : "bg-slate-200 text-slate-500",
          )}
        >
          {isStep1Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "01"}
        </span>
        <div className="flex flex-col min-w-0">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
            Stage 01
          </span>
          <span className="font-sans text-xs sm:text-sm font-semibold truncate">
            Acknowledged
          </span>
        </div>
      </div>

      <div
        className={cn(
          "hidden md:block flex-1 h-[2px] mx-2",
          isStep1Done ? "bg-slate-900" : "bg-slate-200",
        )}
      />

      {/* Step 2 */}
      <div
        className={cn(
          "flex items-center gap-2.5 min-w-0",
          currentStage === 2 || isStep2Done
            ? "text-slate-900 font-bold"
            : "text-slate-400 font-medium opacity-60",
        )}
      >
        <span
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs",
            isStep2Done
              ? "bg-slate-900 text-white"
              : currentStage === 2
              ? "bg-slate-900 text-white font-bold shadow-xs"
              : "bg-slate-200 text-slate-500",
          )}
        >
          {isStep2Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "02"}
        </span>
        <div className="flex flex-col min-w-0">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
            {currentStage === 2 ? "Stage 02 • Active" : "Stage 02"}
          </span>
          <span className="font-sans text-xs sm:text-sm font-semibold truncate">
            Bilateral Negotiation
          </span>
        </div>
      </div>

      <div
        className={cn(
          "hidden md:block flex-1 h-[2px] mx-2",
          isStep2Done ? "bg-slate-900" : "bg-slate-200",
        )}
      />

      {/* Step 3 */}
      <div
        className={cn(
          "flex items-center gap-2.5 min-w-0",
          currentStage === 3 || isStep3Done
            ? "text-slate-900 font-bold"
            : "text-slate-400 font-medium opacity-60",
        )}
      >
        <span
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs",
            isStep3Done
              ? "bg-slate-900 text-white"
              : currentStage === 3
              ? "bg-slate-900 text-white font-bold"
              : "bg-slate-200 text-slate-500",
          )}
        >
          {isStep3Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "03"}
        </span>
        <div className="flex flex-col min-w-0">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
            Stage 03
          </span>
          <span className="font-sans text-xs sm:text-sm font-semibold truncate">
            Term Agreement
          </span>
        </div>
      </div>

      <div
        className={cn(
          "hidden md:block flex-1 h-[2px] mx-2",
          isStep3Done ? "bg-slate-900" : "bg-slate-200",
        )}
      />

      {/* Step 4 */}
      <div
        className={cn(
          "flex items-center gap-2.5 min-w-0",
          currentStage === 4 || isStep4Done
            ? "text-slate-900 font-bold"
            : "text-slate-400 font-medium opacity-60",
        )}
      >
        <span
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs",
            isStep4Done
              ? "bg-slate-900 text-white"
              : currentStage === 4
              ? "bg-slate-900 text-white font-bold"
              : "bg-slate-200 text-slate-500",
          )}
        >
          {isStep4Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "04"}
        </span>
        <div className="flex flex-col min-w-0">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
            Stage 04
          </span>
          <span className="font-sans text-xs sm:text-sm font-semibold truncate">
            Handshake Protocol
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   7. EXECUTIVE GRID STEPPER (SPEC SEO-SIMPLIFIED: 4-STEP GRID PROGRESS BAR)
   ========================================================================== */

export interface ExecutiveGridStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStage: 1 | 2 | 3 | 4;
  isStep1Done?: boolean;
  isStep2Done?: boolean;
  isStep3Done?: boolean;
  isStep4Done?: boolean;
}

export function ExecutiveGridStepper({
  currentStage,
  isStep1Done = currentStage > 1,
  isStep2Done = currentStage > 2,
  isStep3Done = currentStage > 3,
  isStep4Done = currentStage >= 4,
  className,
  ...props
}: ExecutiveGridStepperProps) {
  return (
    <div
      className={cn(
        "w-full bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm select-none",
        className,
      )}
      {...props}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        {/* Stage 01 */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0",
              isStep1Done
                ? "bg-slate-900 text-white"
                : currentStage === 1
                ? "bg-slate-900 text-white font-bold"
                : "bg-slate-100 text-slate-400 font-medium",
            )}
          >
            {isStep1Done ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
              Stage 01
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
              Acknowledged
            </span>
          </div>
        </div>

        {/* Stage 02 */}
        <div
          className={cn(
            "flex items-center gap-3",
            currentStage < 2 && !isStep2Done && "opacity-50",
          )}
        >
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0",
              isStep2Done
                ? "bg-slate-900 text-white"
                : currentStage === 2
                ? "border-2 border-slate-900 text-slate-900 font-bold bg-slate-50"
                : "bg-slate-100 text-slate-400 font-medium",
            )}
          >
            {isStep2Done ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              {currentStage === 2 && (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
              )}
              {currentStage === 2 ? "Active" : "Stage 02"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              Negotiation
            </span>
          </div>
        </div>

        {/* Stage 03 */}
        <div
          className={cn(
            "flex items-center gap-3",
            currentStage < 3 && !isStep3Done && "opacity-40",
          )}
        >
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0",
              isStep3Done
                ? "bg-slate-900 text-white"
                : currentStage === 3
                ? "border-2 border-slate-900 text-slate-900 font-bold bg-slate-50"
                : "bg-slate-100 text-slate-400 font-medium",
            )}
          >
            {isStep3Done ? <Check className="w-4 h-4 stroke-[3]" /> : "3"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-500">
              Stage 03
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
              Agreement
            </span>
          </div>
        </div>

        {/* Stage 04 */}
        <div
          className={cn(
            "flex items-center gap-3",
            currentStage < 4 && !isStep4Done && "opacity-40",
          )}
        >
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0",
              isStep4Done
                ? "bg-slate-900 text-white"
                : currentStage === 4
                ? "border-2 border-slate-900 text-slate-900 font-bold bg-slate-50"
                : "bg-slate-100 text-slate-400 font-medium",
            )}
          >
            {isStep4Done ? <Check className="w-4 h-4 stroke-[3]" /> : "4"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-500">
              Stage 04
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
              Handshake
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Aliases for flexible design-system naming */
export const LifecycleStepper = BilateralDealroomStatusCard;
export const OpportunityStageStepper = DealLifecycleProgressBar;
export const StageProgressBar = DealLifecycleProgressBar;
