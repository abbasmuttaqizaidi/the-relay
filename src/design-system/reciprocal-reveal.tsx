import * as React from "react";
import { Building, Lock, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ReciprocalRevealMetric Component
 * Indicates bilateral unlock status (blinded vs revealed) between two business parties.
 */
export interface ReciprocalRevealMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  partyAName?: string;
  partyBName?: string;
  isUnlocked?: boolean;
  matchScore?: number;
}

export function ReciprocalRevealMetric({
  partyAName = "Your Business",
  partyBName = "Anonymous Enterprise",
  isUnlocked = false,
  matchScore = 94,
  className,
  ...props
}: ReciprocalRevealMetricProps) {
  return (
    <div
      className={cn(
        "bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-3 flex flex-col gap-2 select-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-xs font-semibold text-[#171F2C]">Bilateral Reveal State</span>
        <span
          className={cn(
            "font-mono text-[11px] font-semibold",
            isUnlocked ? "text-[#059669]" : "text-[#94A3B8]",
          )}
        >
          {isUnlocked ? "Unlocked · Contacts Released" : "Blinded · Stage 4 Reveal"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 py-1">
        {/* Party A */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
            <Building className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-medium text-[#171F2C] truncate max-w-[100px]">
            {partyAName}
          </span>
        </div>

        {/* Dynamic Connection Bar */}
        <div className="flex-1 flex flex-col items-center px-2">
          <div className="w-full relative flex items-center justify-center">
            <div
              className={cn(
                "w-full h-0.5",
                isUnlocked
                  ? "bg-[#059669]"
                  : "border-t border-dashed border-[#CBD5E1]",
              )}
            />
            <div
              className={cn(
                "absolute px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border",
                isUnlocked
                  ? "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]"
                  : "bg-white text-[#64748B] border-[#E2E8F0]",
              )}
            >
              {matchScore}% Parity
            </div>
          </div>
        </div>

        {/* Party B */}
        <div className="flex items-center gap-2 min-w-0 justify-end">
          <span className="text-xs font-medium text-[#64748B] truncate max-w-[100px]">
            {isUnlocked ? partyBName : "Blinded Partner"}
          </span>
          <div
            className={cn(
              "w-7 h-7 rounded-[4px] flex items-center justify-center font-mono font-bold text-xs shrink-0",
              isUnlocked
                ? "bg-[#059669] text-white"
                : "bg-white border border-[#E2E8F0] text-[#94A3B8]",
            )}
          >
            {isUnlocked ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
