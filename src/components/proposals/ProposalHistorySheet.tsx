import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  History,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Building2,
  Calendar,
  Lock,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  Eye,
  Crown,
  Zap,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { getOpportunityProposalHistory } from "@/functions/getOpportunityProposalHistory";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import { Button } from "@/design-system";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export interface ProposalHistorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityId: string | null;
  opportunityTitle?: string;
  opportunityNumber?: string;
  onViewProposalDetail?: (proposal: any) => void;
  isPro?: boolean;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export function ProposalHistorySheet({
  open,
  onOpenChange,
  opportunityId,
  opportunityTitle,
  opportunityNumber,
  onViewProposalDetail,
  isPro = false,
}: ProposalHistorySheetProps) {
  const isMobile = useIsMobile();

  const {
    data: history = [],
    isLoading,
  } = useQuery({
    queryKey: ["opportunity-proposal-history", opportunityId],
    queryFn: async () => {
      if (!opportunityId) return [];
      return await getOpportunityProposalHistory({
        data: { opportunity_id: opportunityId },
      });
    },
    enabled: open && !!opportunityId,
    staleTime: 1000 * 30, // 30 seconds
  });

  const stats = React.useMemo(() => {
    const total = history.length;
    const pending = history.filter((h) => h.status === "pending").length;
    const accepted = history.filter((h) => h.status === "accepted").length;
    const withdrawn = history.filter((h) => h.status === "withdrawn").length;
    const declined = history.filter((h) => h.status === "declined").length;
    return { total, pending, accepted, withdrawn, declined };
  }, [history]);

  const formatDate = (isoString: string | Date) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Accepted</span>
          </span>
        );
      case "withdrawn":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-purple-50 text-purple-700 border border-purple-200">
            <Clock className="w-3 h-3 text-purple-600" />
            <span>Withdrawn</span>
          </span>
        );
      case "declined":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200">
            <XCircle className="w-3 h-3 text-slate-500" />
            <span>Declined</span>
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Pending</span>
          </span>
        );
    }
  };

  // Render Single Proposal Card
  const renderProposalCard = (item: any, isBlurred = false) => {
    const business = item.requesting_business;
    const isWithdrawn = item.status === "withdrawn";
    const isAccepted = item.status === "accepted";
    const isDeclined = item.status === "declined";

    return (
      <div
        key={item.id}
        className={cn(
          "p-4 rounded-xl border transition-all duration-150 relative text-left select-none",
          isBlurred ? "filter blur-[5px] opacity-40 pointer-events-none" : "shadow-xs",
          isWithdrawn
            ? "bg-purple-50/30 border-purple-200/80"
            : isAccepted
              ? "bg-emerald-50/20 border-emerald-200/80"
              : isDeclined
                ? "bg-slate-50/50 border-slate-200 opacity-80"
                : "bg-white border-slate-200",
        )}
      >
        {/* Header: Company & Status */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-slate-900 font-display">
                {business?.company_name || "Verified Enterprise Counterparty"}
              </span>
              <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" />
            </div>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {business?.industry || "B2B Technology"} • {business?.hq_location || "Global"}
            </span>
          </div>
          <div className="shrink-0">{getStatusBadge(item.status)}</div>
        </div>

        {/* Proposed Terms Snippet */}
        <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs my-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">
              Proposed Commercials:
            </span>
            {item.delivery_methods && item.delivery_methods.length > 0 && (
              <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                {item.delivery_methods.join(", ")}
              </span>
            )}
          </div>
          <p className="text-slate-700 leading-relaxed italic text-xs font-serif line-clamp-3">
            &ldquo;{item.proposed_terms || item.message || "Standard bilateral exchange terms."}&rdquo;
          </p>
        </div>

        {/* Value Categories Badges */}
        {item.value_categories && item.value_categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mb-2.5">
            {item.value_categories.map((cat: string, cIdx: number) => (
              <span
                key={cIdx}
                className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp & Withdrawal Audit Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Submitted {formatDate(item.created_at)}</span>
          </div>

          {isWithdrawn && (
            <div className="flex items-center gap-1 text-purple-700 font-medium bg-purple-100/60 px-2 py-0.5 rounded text-[10px]">
              <Clock className="w-3 h-3" />
              <span>Withdrawn: {formatDate(item.updated_at)}</span>
            </div>
          )}

          {!isBlurred && onViewProposalDetail && (
            <button
              type="button"
              onClick={() => onViewProposalDetail(item)}
              className="ml-auto inline-flex items-center gap-1 text-slate-800 hover:text-black font-semibold text-[11px] hover:underline cursor-pointer"
            >
              <Eye className="w-3 h-3" />
              <span>View Pitch</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "bg-white p-0 flex flex-col shadow-2xl overflow-hidden",
          isMobile
            ? "w-full max-h-[88vh] rounded-t-2xl border-t border-slate-200"
            : "w-full sm:max-w-xl md:max-w-2xl h-full border-l border-slate-200",
        )}
      >
        {/* Mobile Drag Indicator */}
        {isMobile && (
          <div className="pt-3 pb-1 flex items-center justify-center shrink-0 bg-slate-50/50">
            <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
          </div>
        )}

        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#171F2C] text-white">
                <History className="w-3 h-3 text-amber-400" />
                <span>Proposal History</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-300">
                PRO INTEL
              </span>
            </div>
            {opportunityNumber && (
              <span className="text-xs font-mono font-medium text-slate-500">
                {opportunityNumber}
              </span>
            )}
          </div>

          <SheetTitle className="text-base sm:text-lg font-bold font-display text-slate-900 tracking-tight leading-snug">
            {opportunityTitle || "Opportunity Proposal Audit Trail"}
          </SheetTitle>
          <SheetDescription className="text-xs text-slate-500 mt-1 leading-relaxed">
            Track all historical proposals, active negotiations, and counterparties who expressed or withdrew intent.
          </SheetDescription>

          {/* Quick Metrics Ribbon (LinkedIn Style) */}
          <div className="grid grid-cols-4 gap-2 mt-3.5 pt-3 border-t border-slate-200/70">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-[10px] font-medium text-slate-500 block uppercase tracking-wider">
                Total
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-slate-900">
                {stats.total}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-200/70 text-center shadow-2xs">
              <span className="text-[10px] font-medium text-amber-700 block uppercase tracking-wider">
                Pending
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-amber-800">
                {stats.pending}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/70 text-center shadow-2xs">
              <span className="text-[10px] font-medium text-emerald-700 block uppercase tracking-wider">
                Accepted
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-emerald-800">
                {stats.accepted}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-purple-50/60 border border-purple-200/70 text-center shadow-2xs">
              <span className="text-[10px] font-medium text-purple-700 block uppercase tracking-wider">
                Withdrawn
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-purple-800">
                {stats.withdrawn}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-slate-800" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Loading Proposal History...
              </span>
            </div>
          ) : history.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 p-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <History className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                No Proposal History Yet
              </h4>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                When verified businesses pitch on your opportunity or withdraw proposals, the entire timeline will be archived here.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {/* If User is PRO: Render all cards unlocked */}
              {isPro ? (
                history.map((item) => renderProposalCard(item, false))
              ) : (
                /* Free Tier Experience (LinkedIn Style: 1 visible teaser + blurred remainder + Upgrade CTA) */
                <>
                  {/* First Proposal Card (Free Preview / Teaser) */}
                  {history.length > 0 && renderProposalCard(history[0], false)}

                  {/* If there are more proposals or withdrawn intent, show blurred cards + Overlay */}
                  {history.length > 1 ? (
                    <div className="relative mt-3">
                      {/* Blurred Cards in Background */}
                      <div className="space-y-3">
                        {history.slice(1, 3).map((item) => renderProposalCard(item, true))}
                      </div>

                      {/* LinkedIn Style Frosted Glass Paywall Card Overlay */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center p-2">
                        <div className="w-full p-4 sm:p-5 rounded-xl border border-amber-200/90 bg-white/95 backdrop-blur-md shadow-xl text-left space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-lg bg-[#0F172A] text-amber-400 flex items-center justify-center shadow-xs shrink-0">
                                <Crown className="w-5 h-5 text-amber-400" />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-slate-900 font-display">
                                  Unlock All {history.length} Pitches & Withdrawn Intent
                                </h4>
                                <span className="text-[11px] text-slate-500 font-medium">
                                  {history.length - 1} historical {history.length - 1 === 1 ? "pitch" : "pitches"} locked on Free Tier
                                </span>
                              </div>
                            </div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                              RELAY PRO
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            See which verified companies pitched on this listing, why they withdrew, and re-engage dropped counterparties directly.
                          </p>

                          <div className="space-y-1.5 text-xs text-slate-700 py-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Reveal counterparty names and verified company identities</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>View withdrawn terms, commercial offers & exact drop-off timestamps</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Send counter-offers and re-invite counterparties</span>
                            </div>
                          </div>

                          <Button
                            type="button"
                            variant="monochrome"
                            size="sm"
                            onClick={() => {
                              toast.info("Relay Pro billing portal will be active in the next release.");
                            }}
                            className="w-full py-2.5 font-semibold text-xs bg-[#0F172A] hover:bg-slate-800 text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Upgrade to Relay Pro</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Single proposal on free plan: Show mini upgrade banner below */
                    <div className="p-4 rounded-xl border border-amber-200/70 bg-amber-50/40 text-left space-y-2 mt-3">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-900 font-display">
                          Relay Pro Deal Intelligence
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Upgrade to Relay Pro to access comprehensive counterparty intent analytics, withdrawal logs, and automated deal re-engagement across all your listings.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast.info("Relay Pro upgrade portal will be available shortly.");
                        }}
                        className="text-xs font-semibold mt-1 cursor-pointer bg-white"
                      >
                        Learn About Relay Pro
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Encrypted double opt-in protocol history</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs font-medium cursor-pointer"
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
