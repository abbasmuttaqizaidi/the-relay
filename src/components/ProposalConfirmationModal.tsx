import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, X, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProposalConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCompanyName?: string;
  opportunityTitle?: string;
  onTrackInMyRelay?: () => void;
  backButtonText?: string;
}

export function ProposalConfirmationModal({
  isOpen,
  onClose,
  targetCompanyName = "Counterparty",
  opportunityTitle,
  onTrackInMyRelay,
  backButtonText = "Back to Opportunity Board",
}: ProposalConfirmationModalProps) {
  const navigate = useNavigate();

  const handleTrackClick = () => {
    onClose();
    if (onTrackInMyRelay) {
      onTrackInMyRelay();
    } else {
      navigate({ to: "/my-relay" });
    }
  };

  const displayName = targetCompanyName && targetCompanyName.trim().length > 0
    ? targetCompanyName.trim()
    : "the business operator";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-0 overflow-hidden border border-[#E2E8F0] gap-0 sm:rounded-2xl"
      >
        {/* Accessible hidden title & description for screen readers */}
        <DialogTitle className="sr-only">Proposal Submitted</DialogTitle>
        <DialogDescription className="sr-only">
          Your pitch has been securely delivered to {displayName} under Relay Bilateral Escrow.
        </DialogDescription>

        {/* Close Button */}
        <button
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer z-10"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Content */}
        <div className="p-6 md:p-8 flex flex-col items-center text-center">
          {/* Emerald Success Icon */}
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>

          <h2 className="font-display text-2xl font-bold text-[#171F2C] tracking-tight">
            Proposal Submitted
          </h2>
          
          <p className="text-xs md:text-sm text-[#64748B] mt-1.5 max-w-sm leading-relaxed">
            Your pitch has been securely delivered to <span className="font-semibold text-slate-800">{displayName}</span> under Relay Bilateral Escrow.
          </p>

          {/* Timeline Section */}
          <div className="w-full mt-6 text-left pt-6 border-t border-[#E2E8F0]">
            <h3 className="text-xs font-semibold text-[#171F2C] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>What happens next</span>
            </h3>

            <div className="space-y-3.5">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-[#171F2C] font-mono text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Counterparty Review
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {displayName} has 48 hours to review your proposal and respond.
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-[#171F2C] font-mono text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Blinded Dealroom
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Your identities and contact details remain confidential while terms are calibrated.
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-[#171F2C] font-mono text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">
                    Mutual Handshake
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Direct contacts and verified identity are unlocked only once both sides confirm terms.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 md:px-8 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]/50 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-[#E2E8F0] transition-colors cursor-pointer text-center"
            type="button"
          >
            {backButtonText}
          </button>
          <button
            onClick={handleTrackClick}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#000000] hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            type="button"
          >
            <span>Track in My Relay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
