import React from "react";
import { AlertCircle, Megaphone, Edit3, ArrowRight } from "lucide-react";
import { Modal } from "@/design-system/modal";
import { Button } from "@/design-system/button";

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
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center gap-2 font-display text-base sm:text-lg font-bold text-[#171F2C]">
          <AlertCircle className="w-5 h-5 text-[#171F2C]" />
          <span>Commercial Intent Notice</span>
        </span>
      }
      description="Your brief appears to describe a direct capability or service your business delivers rather than an unfulfilled partner need."
      maxWidth="max-w-[540px]"
    >
      <div className="space-y-4 font-sans text-xs">
        <p className="text-[#64748B] leading-relaxed">
          Relay <strong className="text-[#171F2C]">Opportunities</strong> are reserved for bilateral arrangements where counterparty peers can co-sell, refer, distribute, advise, or partner.
        </p>

        {/* Comparison Box */}
        <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-2.5 font-mono text-[11px]">
          <div className="flex items-start gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.04em] px-2 py-0.5 bg-[#FFFFFF] text-[#64748B] font-semibold border border-[#E2E8F0] rounded-[4px] shrink-0">
              Detected Pattern
            </span>
            <span className="text-[#171F2C] leading-snug">
              &ldquo;Providing [Product / Service / Agency Deliverables]...&rdquo;
            </span>
          </div>
          <div className="flex items-start gap-2.5 pt-2 border-t border-[#E2E8F0]">
            <span className="text-[10px] uppercase tracking-[0.04em] px-2 py-0.5 bg-[#171F2C] text-[#FFFFFF] font-semibold rounded-[4px] shrink-0">
              Opportunity Format
            </span>
            <span className="text-[#171F2C] font-semibold leading-snug">
              &ldquo;Seeking [Partner / Vendor / Reseller] to co-deliver...&rdquo;
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 space-y-2">
          <Button
            variant="authoritative"
            onClick={onSwitchToOffer}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-white" />
              <span>Post as Product / Service Offer Instead</span>
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Button>

          <Button
            variant="outline"
            onClick={onEditOpportunity}
            className="w-full justify-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-[#171F2C]" />
            <span>Edit Opportunity Requirements</span>
          </Button>

          {onProceedAnyway && (
            <button
              type="button"
              onClick={onProceedAnyway}
              className="w-full text-center text-[11px] font-mono uppercase tracking-[0.04em] text-[#94A3B8] hover:text-[#171F2C] pt-1.5 transition-colors cursor-pointer"
            >
              Continue as Opportunity Brief &mdash; Submit anyway
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
