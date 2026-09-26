import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X,
  Handshake,
  Megaphone,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export interface PostTypeSelectionModalProps {
  open?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  onSelect?: (type: "opportunity" | "offer") => void;
}

export function PostTypeSelectionModal({
  open,
  isOpen,
  onOpenChange,
  onClose,
  onSelect,
}: PostTypeSelectionModalProps) {
  const navigate = useNavigate();

  const isModalOpen = open !== undefined ? open : (isOpen ?? false);
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
    if (!newOpen && onClose) {
      onClose();
    }
  };

  const handleSelect = (type: "opportunity" | "offer") => {
    handleOpenChange(false);
    if (onSelect) {
      onSelect(type);
    } else {
      navigate({
        to: "/post",
        search: { type } as any,
      });
    }
  };

  return (
    <DialogPrimitive.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] sm:max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[780px] flex-col bg-white text-left font-sans shadow-2xl rounded-[4px] border border-[#E2E8F0] overflow-hidden duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#E2E8F0] px-5 py-4 sm:px-6 sm:py-5 bg-white shrink-0">
            <div className="space-y-1 pr-6">
              <DialogPrimitive.Title className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#171F2C]">
                What Do You Want to Post?
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Select the listing format matching your commercial intent. Precise categorization ensures appropriate institutional clearance and routing.
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              className="text-[#94A3B8] hover:text-[#171F2C] p-1.5 rounded-[2px] hover:bg-[#F8FAFC] transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          {/* Modal Body: 2 interactive selection cards */}
          <div className="p-5 sm:p-6 overflow-y-auto bg-[#F8FAFC]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              {/* Card 1: Business Opportunity (Bilateral Dealflow) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSelect("opportunity")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect("opportunity");
                  }
                }}
                className="group relative flex flex-col justify-between p-5 sm:p-6 bg-white border border-[#171F2C] rounded-[4px] shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#171F2C]"
              >
                {/* Core Dealflow Tag */}
                <div className="absolute -top-2.5 right-4">
                  <span className="inline-flex items-center gap-1 bg-[#171F2C] text-white text-[9px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px]">
                    CORE DEALFLOW
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pt-1">
                    <div className="w-9 h-9 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center shrink-0">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0] rounded-[2px]">
                      Reciprocal Exchange
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-[#171F2C] group-hover:text-[#000000]">
                      Business Opportunity
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Post a specific commercial situation, client need, co-selling initiative, or partner requirement for verified peers to fulfill.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold block">
                      Typical Use Cases:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {["Partnerships", "Referrals", "Distribution", "Vendors", "Hiring"].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3.5 flex items-center justify-between border-t border-[#E2E8F0]">
                  <span className="text-xs font-semibold text-[#171F2C] flex items-center gap-1.5 group-hover:underline">
                    <span>Create Opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#171F2C] transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#171F2C]" />
                    <span>NCND Protected</span>
                  </span>
                </div>
              </div>

              {/* Card 2: Product / Service Offer */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSelect("offer")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect("offer");
                  }
                }}
                className="group relative flex flex-col justify-between p-5 sm:p-6 bg-white border border-[#E2E8F0] hover:border-[#171F2C] rounded-[4px] shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#171F2C]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pt-1">
                    <div className="w-9 h-9 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center shrink-0">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] rounded-[2px]">
                      Direct Catalog
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-[#171F2C] group-hover:text-[#000000]">
                      Product / Service Offer
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Advertise a solution, SaaS platform, specialized advisory, or delivery service that your company provides.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold block">
                      Typical Categories:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {["SaaS & Software", "Consulting", "Agencies", "Data & AI", "Hardware"].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3.5 flex items-center justify-between border-t border-[#E2E8F0]">
                  <span className="text-xs font-semibold text-[#171F2C] flex items-center gap-1.5 group-hover:underline">
                    <span>Create Offer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#171F2C] transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Instant Board Listing</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
