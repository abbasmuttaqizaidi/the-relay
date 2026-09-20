import React from "react";
import { ArrowRight, Megaphone, Handshake, ShieldCheck, Sparkles } from "lucide-react";

interface PostTypeSelectionProps {
  onSelect: (type: "opportunity" | "offer") => void;
}

export function PostTypeSelection({ onSelect }: PostTypeSelectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 md:py-10 font-sans">
      {/* Header section matching Monochrome Executive typography */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FFFFFF] border border-[#E2E8F0] text-[#64748B] font-mono text-[11px] font-semibold uppercase tracking-[0.04em]">
          <Sparkles className="w-3.5 h-3.5 text-[#171F2C]" />
          <span>Listing Type Selector</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#171F2C]">
          What Do You Want to Post?
        </h1>
        <p className="text-[#64748B] text-xs sm:text-sm max-w-[62ch] mx-auto leading-relaxed font-sans">
          Select the listing format that matches your commercial intent. Precise categorization ensures your submission is surfaced to verified peers in the appropriate dealflow context.
        </p>
      </div>

      {/* Two interactive cards using Monochrome Executive 4px border structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
        {/* Card 1: Business Opportunity (Bilateral Dealflow) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect("opportunity")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect("opportunity");
            }
          }}
          className="group relative flex flex-col justify-between p-7 bg-[#FFFFFF] border border-[#171F2C] rounded-[4px] transition-all duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#171F2C]"
        >
          {/* Top Stamp */}
          <div className="absolute -top-3 right-5">
            <span className="inline-flex items-center gap-1 bg-[#171F2C] text-[#FFFFFF] text-[10px] font-mono uppercase tracking-[0.04em] font-semibold px-2.5 py-0.5 rounded-[4px] border border-[#171F2C]">
              <span>Core Dealflow</span>
            </span>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-[4px] bg-[#171F2C] flex items-center justify-center text-white shrink-0">
                <Handshake className="w-5 h-5 text-[#FFFFFF]" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] px-2.5 py-0.5 bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0] rounded-[4px]">
                Reciprocal Exchange
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#171F2C]">
                Business Opportunity
              </h2>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-sans">
                Post a specific commercial situation, client need, co-selling initiative, or partner requirement for verified peers to fulfill.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#94A3B8] font-semibold block">
                Typical Use Cases:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["Partnership", "Referrals", "Distribution", "Vendor Sourcing", "Hiring"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#E2E8F0]">
            <span className="text-xs font-mono uppercase tracking-[0.04em] font-semibold text-[#171F2C] flex items-center gap-2 group-hover:underline">
              Post an Opportunity
              <ArrowRight className="w-4 h-4 text-[#171F2C] transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#64748B] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#171F2C]" />
              CDOES Protected
            </span>
          </div>
        </div>

        {/* Card 2: Product / Service Offer */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect("offer")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect("offer");
            }
          }}
          className="group relative flex flex-col justify-between p-7 bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#171F2C] rounded-[4px] transition-all duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#171F2C]"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] shrink-0">
                <Megaphone className="w-5 h-5 text-[#171F2C]" />
              </div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] px-2.5 py-0.5 bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] rounded-[4px]">
                Direct Catalog
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#171F2C]">
                Product / Service Offer
              </h2>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-sans">
                Advertise a solution, SaaS platform, specialized advisory, or delivery service that your company provides.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#94A3B8] font-semibold block">
                Typical Use Cases:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["Software / SaaS", "Consulting", "Creative Agency", "Infrastructure", "Training"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#E2E8F0]">
            <span className="text-xs font-mono uppercase tracking-[0.04em] font-semibold text-[#171F2C] flex items-center gap-2 group-hover:underline">
              Post an Offer
              <ArrowRight className="w-4 h-4 text-[#171F2C] transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#94A3B8] font-medium">
              Catalog Directory
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
