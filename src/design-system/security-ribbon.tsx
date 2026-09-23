import * as React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DealroomSecurityRibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  orgKey?: string;
  protocolVersion?: string;
  isEscrowEnforced?: boolean;
}

/**
 * DealroomSecurityRibbon Component
 * High-assurance security and cryptographic non-circumvention protocol banner
 * Matches seo_code_guide.md specification
 */
export function DealroomSecurityRibbon({
  orgKey = "0x7F29...D8C4",
  protocolVersion = "v4.2",
  isEscrowEnforced = true,
  className,
  ...props
}: DealroomSecurityRibbonProps) {
  return (
    <div
      className={cn(
        "w-full bg-[#f2f4f6] border-b border-[#c5c6cc]/60 px-4 sm:px-8 py-2 transition-colors select-none",
        className,
      )}
      {...props}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-sans">
        <div className="flex flex-wrap items-center gap-2 font-mono uppercase tracking-wider text-[#45474c]">
          <span className="inline-flex items-center gap-1.5 font-bold text-[#010611]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#010611] animate-pulse"></span>
            VERIFIED PRIVATE DEALROOM
          </span>
          <span className="text-[#c5c6cc]">/</span>
          <span className="text-[#505f76] font-medium">ZERO OUTBOUND SPAM</span>
          <span className="text-[#c5c6cc] hidden md:inline">/</span>
          <span className="text-[#45474c] hidden md:inline">
            CRYPTOGRAPHIC NON-CIRCUMVENTION PROTOCOL {protocolVersion}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#505f76] shrink-0">
          {isEscrowEnforced && (
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#010611]" />
              <span>Escrow Enforced</span>
            </span>
          )}
          {orgKey && (
            <>
              <span className="text-[#c5c6cc]">|</span>
              <span>
                Org Key: <code className="font-mono text-[#010611] font-bold">{orgKey}</code>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
