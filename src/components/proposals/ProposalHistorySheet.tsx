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
  TrendingUp,
  BarChart3,
  Unlock,
  RefreshCw,
  Info,
  Hourglass,
  X,
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
            <span>Pending Review</span>
          </span>
        );
    }
  };

  // Render Proposal Card (Following exact style from seo_code_guide.md lines 313-350)
  const renderProposalCard = (item: any, isBlurred = false, isPreviewBadge = false) => {
    const business = item.requesting_business;
    const isWithdrawn = item.status === "withdrawn";

    return (
      <div
        key={item.id}
        className={cn(
          "bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2.5 transition-all text-left relative",
          isBlurred
            ? "filter blur-[6px] opacity-40 pointer-events-none select-none"
            : "hover:bg-slate-50/50",
        )}
      >
        {/* Preview Badge Pill */}
        {isPreviewBadge && (
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>UNLOCKED PREVIEW (1ST RECORD)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">1 of {Math.max(history.length, 3)} revealed</span>
          </div>
        )}

        {/* Counterparty Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                {business?.company_name || "Verified Enterprise Counterparty"}
              </h3>
              <RelayVerificationSeal className="w-3.5 h-3.5 shrink-0" />
            </div>
            <span className="text-xs text-slate-500 mt-0.5 block">
              {business?.hq_location || "Global"} • {business?.industry || "Enterprise Sector"}
            </span>
          </div>
          <div className="shrink-0">{getStatusBadge(item.status)}</div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {isWithdrawn
              ? `Withdrawn on ${formatDate(item.updated_at || item.created_at)}`
              : `Submitted on ${formatDate(item.created_at)}`}
          </span>
        </div>

        {/* Commercial Terms Box (seo_code_guide.md style) */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-slate-500 uppercase tracking-wider font-semibold">
              Terms Offered
            </span>
            {item.delivery_methods && item.delivery_methods.length > 0 && (
              <span className="font-mono text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                {item.delivery_methods.join(", ")}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-serif italic">
            &ldquo;{item.proposed_terms || item.message || "Standard bilateral institutional terms offered."}&rdquo;
          </p>
        </div>

        {/* Retraction Rationale / Value Tags */}
        <div className="flex flex-col gap-1.5 pt-1">
          {isWithdrawn && (
            <div className="flex items-start gap-1.5 text-xs text-slate-600">
              <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
              <span>
                <strong className="text-slate-900">Withdrawal Reason:</strong>{" "}
                Counterparty self-withdrew: {item.withdrawal_reason || "Retracted due to bilateral scope / capacity adjustment."}
              </span>
            </div>
          )}

          {item.value_categories && item.value_categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {item.value_categories.map((cat: string, cIdx: number) => (
                <span
                  key={cIdx}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action button if active */}
        {!isBlurred && onViewProposalDetail && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onViewProposalDetail(item)}
              className="inline-flex items-center gap-1 text-slate-800 hover:text-black font-semibold text-xs hover:underline cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Details →</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render Ghost Blurred Pro Teaser Card
  const renderGhostLockedCard = (title: string, location: string, reason: string, terms: string, timeAgo: string) => (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2.5 text-left filter blur-[6px] opacity-40 pointer-events-none select-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">{title}</h3>
            <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
          </div>
          <span className="text-xs text-slate-500 mt-0.5 block">{location}</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold uppercase">
          Withdrawn
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span>Withdrawn {timeAgo}</span>
      </div>
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
          Terms Offered
        </span>
        <p className="text-xs text-slate-800 leading-relaxed font-serif italic">&ldquo;{terms}&rdquo;</p>
      </div>
      <div className="flex items-start gap-1.5 text-xs text-slate-600">
        <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
        <span>
          <strong className="text-slate-900">Withdrawal Reason:</strong> {reason}
        </span>
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "bg-slate-50 p-0 flex flex-col shadow-2xl overflow-hidden text-slate-900",
          isMobile
            ? "w-full max-h-[92vh] rounded-t-2xl border-t border-slate-200"
            : "w-full sm:max-w-xl md:max-w-[590px] h-full border-l border-slate-200",
        )}
      >
        {/* Mobile Drag Indicator */}
        {isMobile && (
          <div className="pt-3 pb-1 flex items-center justify-center shrink-0 bg-white">
            <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TOP NAVIGATION HEADER (seo_code_guide.md Lines 278-310)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 bg-white flex flex-col gap-3 border-b border-slate-200 shrink-0 text-left">
          {/* Top Tag & Meta */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider">
                LISTING AUDIT #{opportunityNumber || "OPP-8910"}
              </span>
              <span className="text-slate-500 text-xs">• Confidential Vault</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <SheetTitle className="text-lg sm:text-xl font-bold font-display text-slate-900 tracking-tight leading-snug">
              {opportunityTitle || "Opportunity Proposal Audit Trail"}
            </SheetTitle>
            <SheetDescription className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Counterparty interest retraction log & institutional telemetry across active mandates.
            </SheetDescription>
          </div>

          {/* Summary Notice Box (seo_code_guide.md Line 301-307) */}
          <div className="px-3 py-2 rounded-lg bg-slate-100 flex items-start gap-2.5 text-xs">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div className="text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">
                {stats.total > 0 ? `${stats.total} Proposals / Interests Recorded:` : "Audit Ledger Active:"}
              </span>{" "}
              Proposals, active terms, and retracted bids recorded on institutional ledger.
            </div>
          </div>

          {/* Active Tier Status Indicator Banner (seo_code_guide.md Line 309) */}
          <div
            className="rounded-xl p-3 border border-slate-700/70 shadow-lg flex items-center justify-between gap-2"
            style={{
              background: "linear-gradient(135deg, rgb(9, 13, 22) 0%, rgb(15, 23, 42) 100%)",
            }}
          >
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/10 border border-amber-500/30 shrink-0">
                <Lock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-white uppercase tracking-wider">
                    {isPro ? "Relay Pro Active" : "Free Trial Preview"}
                  </span>
                  {!isPro && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold tracking-wide uppercase">
                      1 of {Math.max(history.length, 4)} Unlocked
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-300">
                  {isPro
                    ? "Full counterparty audit trail unmasked"
                    : "Remaining counterparties & telemetry are gated"}
                </span>
              </div>
            </div>

            {!isPro && (
              <button
                type="button"
                onClick={() => {
                  toast.info("Relay Pro billing portal will be active in the next release.", {
                    description: "Includes unlimited counterparty intent logs, verified badges, and deal intelligence across all listings.",
                  });
                }}
                className="h-8 px-3 rounded-lg bg-white text-slate-950 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1 shadow-sm shrink-0 cursor-pointer"
              >
                <span>Upgrade</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SCROLLABLE BODY (seo_code_guide.md Lines 312-461)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 flex flex-col gap-4 relative">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-slate-800" />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Decrypting Counterparty Telemetry...
              </span>
            </div>
          ) : isPro ? (
            /* Paid Mode: All Cards Fully Unmasked */
            history.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 bg-white rounded-xl border border-dashed border-slate-300 p-6 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <History className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-display">
                  No Proposal History Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  When counterparties express interest or withdraw bids, the complete timeline and contact records will appear here.
                </p>
              </div>
            ) : (
              history.map((item) => renderProposalCard(item, false))
            )
          ) : (
            /* Free Mode: 1 Unlocked Entry + Gated Blurred Stack + High-Converting Modal */
            <>
              {/* ENTRY 1: Unlocked First Proposal Record */}
              {history.length > 0 ? (
                renderProposalCard(history[0], false, true)
              ) : (
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs text-left">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Active Mandate Ledger</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Awaiting Inbound</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    No active inbound bids currently recorded on this listing. As soon as counterparties submit terms, your first proposal is unlocked free.
                  </p>
                </div>
              )}

              {/* GATED CONTAINER WITH BLURRED STACK & OVERLAY MODAL (seo_code_guide.md line 352-460) */}
              <div className="flex flex-col gap-4 relative mt-2">
                {/* Blurred Stack in Background */}
                <div className="space-y-3 pointer-events-none select-none">
                  {history.length > 1
                    ? history.slice(1, 4).map((item) => renderProposalCard(item, true))
                    : (
                      <>
                        {renderGhostLockedCard(
                          "BioMed Global Technologies Ltd",
                          "London, UK • HealthTech & Enterprise Telemetry",
                          "Counterparty reached capacity on another bilateral exchange.",
                          "Reciprocal enterprise lead swap across Nordic healthcare provider pipeline (4 accounts/quarter).",
                          "3 days ago",
                        )}
                        {renderGhostLockedCard(
                          "Nordic Trade Bank Solutions",
                          "Stockholm, Sweden • Tier-2 Financial Institution",
                          "Listing timeline expired without response from listing operator.",
                          "Bilateral settlement license + £40,000 co-marketing infrastructure allocation.",
                          "5 days ago",
                        )}
                        {renderGhostLockedCard(
                          "Aura Biosystems GmbH",
                          "Munich, Germany • Diagnostics & SaaS",
                          "Internal restructuring of partner operations in Central Europe.",
                          "Joint RFP bidding agreement for DACH medical technology network access.",
                          "6 days ago",
                        )}
                      </>
                    )}
                </div>

                {/* GATED UPGRADE OVERLAY MODAL (seo_code_guide.md lines 458-460) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center p-1 sm:p-2 backdrop-blur-[4px] bg-slate-950/40 rounded-xl">
                  <div
                    className="relative w-full max-w-[460px] rounded-xl overflow-hidden shadow-2xl p-5 sm:p-6 border border-slate-700/70 flex flex-col items-center text-center text-white"
                    style={{
                      background: "linear-gradient(145deg, #090d16 0%, #0f172a 100%)",
                    }}
                  >
                    {/* Ambient Glow */}
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Current Plan Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[11px] font-semibold tracking-wider uppercase mb-3">
                      <Hourglass className="w-3 h-3 text-amber-400" />
                      <span>Current Plan: Free Trial Preview</span>
                    </div>

                    {/* Center Lock Icon Circle */}
                    <div className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-800/80 border border-slate-700/70 text-slate-100 shadow-inner mb-2.5">
                      <Lock className="w-5 h-5 text-amber-400" />
                    </div>

                    {/* Headline */}
                    <h4 className="text-white font-display text-base sm:text-lg font-semibold tracking-tight leading-snug mb-1.5">
                      Unlock All Listings & Complete Intent Telemetry
                    </h4>

                    {/* Body */}
                    <p className="text-xs leading-relaxed text-slate-300 mb-4 px-1">
                      You are viewing a Free Trial audit preview. Upgrade to <strong className="text-white font-semibold">Relay Pro</strong> to immediately unmask all counterparties, commercial terms, and complete retraction telemetry across all your listings.
                    </p>

                    {/* Feature Matrix Box */}
                    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-lg p-3 mb-4 text-left flex flex-col gap-2 text-xs text-slate-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 font-semibold" />
                        <span>Full Counterparty Legal Identity & Verification status</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 font-semibold" />
                        <span>Exact Reciprocal Commercial Terms & Royalty Clauses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 font-semibold" />
                        <span>Real-Time Internal Withdrawal Reasons across ALL listings</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => {
                        toast.info("Relay Pro billing portal will be active in the next release.", {
                          description: "Includes unlimited counterparty intent logs, verified badges, and deal intelligence across all listings.",
                        });
                      }}
                      className="w-full py-2.5 px-4 rounded-lg bg-white text-slate-950 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Upgrade to Relay Pro — Unlock All ($199/mo)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Trust Guarantees */}
                    <div className="flex items-center justify-center gap-3 mt-2.5 text-[11px] text-slate-400">
                      <span>• Instant unmasking</span>
                      <span>• Cancel anytime</span>
                      <span>• Institutional SLA</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SIDE SHEET FOOTER (seo_code_guide.md Lines 463-471)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 text-xs shrink-0 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero-Knowledge Attestation Enabled</span>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-8 px-3.5 rounded bg-white text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors shadow-2xs border border-slate-200 cursor-pointer"
          >
            Close Side Sheet
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}


