import * as React from "react";
import { Timer, Zap, PlusCircle, Download, KeyRound, ArrowDownToLine, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   1. ACTIVE SLA TELEMETRY CARD
   ========================================================================== */

export interface ActiveSlaTelemetryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  actionRequiredCount?: number;
  actionRequiredHoursLeft?: number;
  counterpartyCount?: number;
  averageTurnaroundHours?: number | string;
  percentileRank?: string;
}

export function ActiveSlaTelemetryCard({
  actionRequiredCount = 1,
  actionRequiredHoursLeft = 18,
  counterpartyCount = 2,
  averageTurnaroundHours = "3.2 hours",
  percentileRank = "Top 5% Network",
  className,
  ...props
}: ActiveSlaTelemetryCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#c5c6cc]/70 rounded-xl p-6 space-y-4 shadow-none select-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#c5c6cc]/40">
        <h4 className="font-sans text-base font-bold text-[#010611] tracking-tight">Active SLA Telemetry</h4>
        <Timer className="w-5 h-5 text-[#505f76]" />
      </div>

      <div className="space-y-3">
        {/* Action Required Row */}
        <div className="p-3 rounded-xl bg-[#f2f4f6] border border-[#c5c6cc]/40 flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#505f76] font-semibold">
              Action Required
            </div>
            <div className="font-sans text-xs sm:text-sm font-bold text-[#010611]">
              {actionRequiredCount} {actionRequiredCount === 1 ? "deal" : "deals"} awaiting your turn
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#010611] text-white font-mono text-[10px] sm:text-[11px] font-bold shrink-0">
            {actionRequiredHoursLeft}H REMAINING
          </span>
        </div>

        {/* Counterparty Turn Row */}
        <div className="p-3 rounded-xl bg-[#f2f4f6] border border-[#c5c6cc]/40 flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#505f76] font-semibold">
              Counterparty Turn
            </div>
            <div className="font-sans text-xs sm:text-sm font-bold text-[#010611]">
              {counterpartyCount} {counterpartyCount === 1 ? "deal" : "deals"} in review
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#e6e8ea] text-[#505f76] font-mono text-[10px] sm:text-[11px] font-medium shrink-0">
            WITHIN SLA
          </span>
        </div>

        {/* Average Turnaround Row */}
        <div className="p-3 rounded-xl bg-[#f2f4f6] border border-[#c5c6cc]/40 flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#505f76] font-semibold">
              Average Turnaround
            </div>
            <div className="font-sans text-xs sm:text-sm font-bold text-[#010611]">
              {averageTurnaroundHours}
            </div>
          </div>
          <span className="font-mono text-[#505f76] text-[11px] font-medium shrink-0">
            {percentileRank}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. WORKSPACE OPERATIONS CARD
   ========================================================================== */

export interface WorkspaceOperationsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onPostNewOpportunity?: () => void;
  onExportCsv?: () => void;
  onRotateKeys?: () => void;
}

export function WorkspaceOperationsCard({
  onPostNewOpportunity,
  onExportCsv,
  onRotateKeys,
  className,
  ...props
}: WorkspaceOperationsCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#c5c6cc]/70 rounded-xl p-6 space-y-4 shadow-none select-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#c5c6cc]/40">
        <h4 className="font-sans text-base font-bold text-[#010611] tracking-tight">Workspace Operations</h4>
        <Zap className="w-5 h-5 text-[#505f76]" />
      </div>

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={onPostNewOpportunity}
          className="w-full h-10 px-4 bg-[#010611] text-white font-sans text-xs font-semibold rounded-xl hover:bg-[#171f2c] transition-colors flex items-center justify-center gap-2 shadow-none cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>

        <button
          type="button"
          onClick={onExportCsv}
          className="w-full h-10 px-4 bg-white text-[#010611] font-sans text-xs font-semibold rounded-xl border border-[#c5c6cc]/70 hover:border-[#010611] hover:bg-[#f2f4f6] transition-colors flex items-center justify-center gap-2 shadow-none cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#505f76]" />
          <span>Export Deal Ledger (CSV)</span>
        </button>

        <button
          type="button"
          onClick={onRotateKeys}
          className="w-full h-10 px-4 bg-white text-[#505f76] hover:text-[#010611] font-sans text-xs font-semibold rounded-xl border border-[#c5c6cc]/70 hover:border-[#010611] hover:bg-[#f2f4f6] transition-colors flex items-center justify-center gap-2 shadow-none cursor-pointer"
        >
          <KeyRound className="w-4 h-4 text-[#505f76]" />
          <span>Rotate Cryptographic Keys</span>
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. EXECUTIVE WORKSPACE HEADER
   ========================================================================== */

export interface ExecutiveWorkspaceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sessionId?: string;
  tagline?: string;
  title?: string;
  description?: string;
  onExportSummary?: () => void;
  onProtocolRules?: () => void;
}

export function ExecutiveWorkspaceHeader({
  sessionId = "#RELAY-EXEC-99201",
  tagline = "WORKSPACE • BILATERAL LEDGER",
  title = "My Relay Workspace",
  description = "Track and manage your active bilateral opportunities, reciprocal requests, and verified lifecycle stages under strictly ratified NDAs.",
  onExportSummary,
  onProtocolRules,
  className,
  ...props
}: ExecutiveWorkspaceHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 select-none",
        className,
      )}
      {...props}
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 rounded bg-[#e6e8ea] text-[#010611] font-mono text-[10px] uppercase tracking-wider font-semibold">
            {tagline}
          </span>
          <span className="font-mono text-[11px] text-[#505f76] tracking-tight">
            SESSION ID {sessionId}
          </span>
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl text-[#010611] tracking-tight font-bold">
          {title}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#505f76] mt-1 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onExportSummary}
          className="h-10 px-4 bg-white text-[#010611] font-sans text-xs font-semibold rounded-xl border border-[#c5c6cc]/70 hover:border-[#010611] hover:bg-[#f2f4f6] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowDownToLine className="w-4 h-4 text-[#505f76]" />
          <span>Export Summary</span>
        </button>
        <button
          type="button"
          onClick={onProtocolRules}
          className="h-10 px-4 bg-white text-[#010611] font-sans text-xs font-semibold rounded-xl border border-[#c5c6cc]/70 hover:border-[#010611] hover:bg-[#f2f4f6] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#505f76]" />
          <span>Protocol Rules</span>
        </button>
      </div>
    </div>
  );
}
