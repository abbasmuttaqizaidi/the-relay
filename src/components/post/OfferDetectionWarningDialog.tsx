import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertCircle, Megaphone, Edit3, ArrowRight } from "lucide-react";

interface OfferDetectionWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditOpportunity: () => void;
  onSwitchToOffer: () => void;
  onProceedAnyway?: () => void;
}

export function OfferDetectionWarningDialog({
  open,
  onOpenChange,
  onEditOpportunity,
  onSwitchToOffer,
  onProceedAnyway,
}: OfferDetectionWarningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-[4px] border border-slate-200 shadow-xl">
        <DialogHeader className="space-y-3 text-left">
          <div className="w-10 h-10 rounded-[2px] bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <AlertCircle className="w-5 h-5" />
          </div>
          <DialogTitle className="font-display text-lg font-black uppercase tracking-tight text-slate-950">
            THIS LOOKS LIKE AN OFFER
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-xs leading-relaxed space-y-2">
            <span className="block font-medium text-slate-800">
              Your post appears to describe a product or service your business provides rather than a specific business opportunity.
            </span>
            <span className="block text-slate-500">
              Relay Opportunities are for situations where another business can participate, help, provide something, collaborate, refer, distribute, hire, advise, or invest.
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Suggestion comparison box */}
        <div className="my-3 p-3.5 bg-slate-50 border border-slate-200 rounded-[2px] text-xs space-y-2 font-mono">
          <div className="flex items-start gap-2">
            <span className="text-[9px] uppercase px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-[2px] shrink-0">
              Detected Offer
            </span>
            <span className="text-slate-600 text-[11px] leading-tight">
              &ldquo;Providing [Product/Service]...&rdquo;
            </span>
          </div>
          <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
            <span className="text-[9px] uppercase px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-[2px] shrink-0">
              Opportunity Style
            </span>
            <span className="text-slate-700 text-[11px] leading-tight">
              &ldquo;Looking for [Partner / Vendor / Reseller] for...&rdquo;
            </span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2 pt-2">
          {/* Primary Action: Switch to Offer */}
          <button
            type="button"
            onClick={onSwitchToOffer}
            className="w-full bg-slate-900 hover:bg-primary text-white text-[11px] font-mono uppercase tracking-wider py-2.5 px-4 rounded-[2px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Megaphone className="w-3.5 h-3.5" />
            Post as Offer Instead
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>

          {/* Secondary Action: Edit Opportunity */}
          <button
            type="button"
            onClick={onEditOpportunity}
            className="w-full border border-slate-300 hover:border-slate-900 hover:bg-slate-50 text-slate-700 text-[11px] font-mono uppercase tracking-wider py-2.5 px-4 rounded-[2px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Opportunity
          </button>

          {/* Tertiary Action: Submit Anyway (if user insists) */}
          {onProceedAnyway && (
            <button
              type="button"
              onClick={onProceedAnyway}
              className="w-full text-center text-[10px] font-mono uppercase tracking-wider text-slate-400 hover:text-slate-700 pt-1 transition-colors cursor-pointer"
            >
              I believe this is an opportunity &mdash; Submit anyway
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
