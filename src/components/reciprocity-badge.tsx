import { useState, useEffect, useRef } from "react";
import { useReciprocity } from "@/lib/interest-store";
import { Activity } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export function ReciprocityBadge({ className = "hidden sm:flex" }: { className?: string }) {
  // Score / Reciprocity badge functionality temporarily disabled as requested
  return null;

  /*
  const { score, introductionsMade, mutualAcceptances, pending, declined } = useReciprocity();
  const prev = useRef(score);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (score !== prev.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1200);
      prev.current = score;
      return () => clearTimeout(t);
    }
  }, [score]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-2.5 border rounded-[4px] px-3.5 py-2 transition-all cursor-pointer hover:bg-slate-50 hover:border-slate-350 active:scale-95 select-none ${
            pulse ? "border-primary bg-primary/10" : "border-slate-200 bg-white"
          } ${className}`}
        >
          <Activity className="w-3.5 h-3.5 text-orange-500" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold text-left">
            Score
          </span>
          <span
            className={`font-display text-sm font-extrabold tabular-nums leading-none ${
              pulse ? "text-primary" : "text-slate-900"
            }`}
          >
            {score}
          </span>
          <span className="font-mono text-[9px] text-slate-400 font-bold">
            · {mutualAcceptances}/{introductionsMade}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[380px] p-0 overflow-hidden bg-white border border-slate-200 shadow-xl rounded-[4px] flex flex-col z-[100]"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span className="font-display font-extrabold text-xs uppercase tracking-wide text-slate-900">
              Network Reciprocity Score
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4 text-xs leading-relaxed font-sans text-slate-600 max-h-[380px] overflow-y-auto">
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-[2px] space-y-1.5">
            <h4 className="font-bold text-slate-900 uppercase font-mono text-[9px] tracking-wider">
              What is Reciprocity?
            </h4>
            <p className="text-slate-650">
              The Relay uses a participation-based access model. Your score shows your level of contribution to the network.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase font-mono text-[9px] tracking-wider">
              Score Allocation Rules
            </h4>
            <div className="border border-slate-100 rounded-[2px] divide-y divide-slate-100">
              <div className="flex justify-between p-2 items-center">
                <span className="text-slate-600 font-medium">Express Interest (Pitch Sent)</span>
                <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-[2px] text-[9.5px]">
                  +5 Points
                </span>
              </div>
              <div className="flex justify-between p-2 items-center">
                <span className="text-slate-650 font-medium">Introduction Accepted (Connected)</span>
                <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-[2px] text-[9.5px]">
                  +15 Points
                </span>
              </div>
              <div className="flex justify-between p-2 items-center">
                <span className="text-slate-650 font-medium">Request Declined</span>
                <span className="font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-[2px] text-[9.5px]">
                  Neutral (0)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase font-mono text-[9px] tracking-wider">
              Your Network Footprint
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-slate-100 p-2.5 rounded-[2px] bg-slate-50/50">
                <span className="text-[9px] text-slate-400 block font-mono uppercase tracking-wider">Pitches Sent</span>
                <span className="text-base font-display font-extrabold text-slate-950 block">{introductionsMade}</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-[2px] bg-slate-50/50">
                <span className="text-[9px] text-slate-400 block font-mono uppercase tracking-wider">Mutual Connections</span>
                <span className="text-base font-display font-extrabold text-slate-950 block">{mutualAcceptances}</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-[2px] bg-slate-50/50">
                <span className="text-[9px] text-slate-400 block font-mono uppercase tracking-wider">Pending Review</span>
                <span className="text-base font-display font-extrabold text-slate-950 block">{pending}</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-[2px] bg-slate-50/50">
                <span className="text-[9px] text-slate-400 block font-mono uppercase tracking-wider">Total Score</span>
                <span className="text-base font-display font-extrabold text-orange-500 block">{score}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 text-center">
          <p className="text-[9px] text-slate-450 font-mono">
            A higher score increases your trust rating across the network.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
  */
}
