import React from "react";
import { ArrowRight, Megaphone, Handshake, CheckCircle2 } from "lucide-react";

interface PostTypeSelectionProps {
  onSelect: (type: "opportunity" | "offer") => void;
}

export function PostTypeSelection({ onSelect }: PostTypeSelectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto py-4 md:py-8 font-sans">
      {/* Header section matching Opportunity Board & Network style */}
      <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14 space-y-2">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900">
          WHAT DO YOU WANT TO POST?
        </h1>
        <p className="text-slate-500 text-xs sm:text-[13px] max-w-[60ch] mx-auto leading-relaxed font-sans">
          Choose what you&apos;re sharing with other businesses. Selecting the right format ensures your listing reaches operators in the right context.
        </p>
      </div>

      {/* Two interactive cards with standard Relay border, shadow and radius */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Offer / Sale / Ad */}
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
          className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white border border-slate-200 hover:border-slate-400 rounded-[2px] shadow-xs hover:shadow-md transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-slate-900"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-[2px] bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition-colors">
                <Megaphone className="w-4 h-4 text-slate-700" />
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-[2px]">
                Product / Service
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                Offer / Sale / Ad
              </h2>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-sans">
                You&apos;re promoting something your business sells or provides.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                Typical examples:
              </span>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Product, service, software, consulting, agency delivery, etc.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-widest font-bold text-slate-700 group-hover:text-slate-950 flex items-center gap-2">
              Post an Offer
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-medium">
              Direct Promotion
            </span>
          </div>
        </div>

        {/* Card 2: Business Opportunity (Core emphasis) */}
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
          className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white border-2 border-slate-900 hover:border-primary rounded-[2px] shadow-sm hover:shadow-lg transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary"
        >
          {/* Subtle emphasis badge */}
          <div className="absolute -top-3 right-5">
            <span className="inline-flex items-center gap-1 bg-slate-900 text-white text-[9px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-[2px] shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Core Exchange
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-[2px] bg-slate-900 flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                <Handshake className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-[2px]">
                Collaborative
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-slate-950 group-hover:text-primary transition-colors">
                Business Opportunity
              </h2>
              <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed font-sans">
                You&apos;re sharing a specific business situation another business can act on.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                Typical examples:
              </span>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Partnership, referral, distribution, vendor, hiring, advice, or investment.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-widest font-bold text-slate-950 group-hover:text-primary flex items-center gap-2">
              Post an Opportunity
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Network Capital
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
