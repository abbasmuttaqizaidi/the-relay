import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Handshake,
  ArrowRight,
  Search,
  ArrowLeftRight,
  Clock,
  Sparkles,
  Building2,
  Lock,
  CheckCircle2,
  Check,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getIncomingRequests } from "@/functions/getIncomingRequests";
import { getSentRequests } from "@/functions/getSentRequests";
import { createPrivateMeta } from "@/lib/seo";
import { Button, Input } from "@/design-system";
import { cn, formatOpportunityCode, formatExchangeCode } from "@/lib/utils";
import { isExchangeCompleted } from "@/lib/exchange-status";

export const Route = createFileRoute("/connections/")({
  head: () => ({
    meta: createPrivateMeta("Exchange Hub — The Relay"),
  }),
  component: ExchangeHubListingPage,
});

function ExchangeHubListingPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      return await checkOnboardingStatus();
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 3,
  });

  const myBusinessId = onboardingData?.business?.id || null;

  // Inbound requests (pitches on listings user posted)
  const { data: incomingReqs = [], isLoading: loadingIncoming } = useQuery({
    queryKey: ["incoming-requests"],
    queryFn: async () => {
      const d = await getIncomingRequests();
      return (d || []).map((r: any) => ({ ...r, direction: "inbound" as const }));
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 5000,
    refetchInterval: 6000,
  });

  // Outbound requests (pitches sent by user to other listings)
  const { data: sentReqs = [], isLoading: loadingSent } = useQuery({
    queryKey: ["sent-requests"],
    queryFn: async () => {
      const d = await getSentRequests();
      return (d || []).map((r: any) => ({ ...r, direction: "outbound" as const }));
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 5000,
    refetchInterval: 6000,
  });

  // Authentication & Onboarding Guards
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      const isOAuthHandshake =
        typeof window !== "undefined" &&
        (window.location.search.includes("__clerk") ||
          window.location.hash.includes("__clerk") ||
          window.location.search.includes("status=") ||
          window.location.search.includes("created_session_id") ||
          window.location.search.includes("redirect_url"));

      if (isOAuthHandshake) return;

      navigate({ to: "/login", replace: true });
      return;
    }

    if (onboardingData && onboardingData.isAuthenticated && !onboardingData.hasBusiness) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [isLoaded, isSignedIn, onboardingData, navigate]);

  // Combine and deduplicate ALL bilateral exchange sessions (both active in-flight and completed handshakes)
  const allExchanges = useMemo(() => {
    const combined = [...incomingReqs, ...sentReqs].filter(
      (r: any) => r && r.status !== "declined" && r.status !== "withdrawn"
    );

    const seen = new Set<string>();
    const list: Array<{
      id: string;
      opportunityTitle: string;
      opportunityNumber?: string;
      exchangeCode: string;
      category?: string;
      partnerName: string;
      direction: "inbound" | "outbound";
      status: string;
      createdAt: string;
      lastFollowUpAt?: string | null;
      stage: number;
      stageLabel: string;
      badgeClass: string;
      isCompleted: boolean;
      proposedTerms?: string;
    }> = [];

    combined.forEach((item: any) => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        const isOwner = item.direction === "inbound";
        const partner = isOwner
          ? item.requesting_business?.company_name || "Prospective Partner"
          : item.opportunity?.business?.company_name || item.opportunity?.company || "Opportunity Owner";

        // Accurate stage determination using exchange_proposals, agreements, and acknowledgements
        const proposals = item.exchange_proposals || item.proposals || [];
        const agreement = item.exchange_agreement || item.agreement || null;
        const consents = item.contact_consents || item.consents || [];

        const myAck = isOwner ? item.owner_acknowledged_at : item.requester_acknowledged_at;
        const partnerAck = isOwner ? item.requester_acknowledged_at : item.owner_acknowledged_at;
        const bothAcknowledged = Boolean(item.owner_acknowledged_at && item.requester_acknowledged_at);

        const isAgreed = agreement?.status === "agreed";
        const isAgreementDraft = agreement?.status === "draft";
        const hasProposals = proposals.length > 0;

        const isCompleted = isExchangeCompleted(item);

        let stage = 1;
        let stageLabel = "Stage 1: Acknowledging";
        let badgeClass = "bg-slate-950 text-white";

        if (isCompleted) {
          stage = 4;
          stageLabel = "Stage 4: Handshake Sealed";
          badgeClass = "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
        } else if (isAgreed) {
          stage = 4;
          stageLabel = "Stage 4: Contact Exchange";
          badgeClass = "bg-emerald-900 text-white";
        } else if (isAgreementDraft) {
          stage = 3;
          stageLabel = "Stage 3: Mutual Agreement";
          badgeClass = "bg-slate-900 text-white";
        } else if (hasProposals || bothAcknowledged || item.status === "negotiating" || item.status === "accepted") {
          stage = 2;
          const latestProp = proposals[0];
          const versionNum = latestProp?.version || (proposals.length > 1 ? proposals.length : 1);
          const isCounter = versionNum > 1;
          stageLabel = isCounter ? `Stage 2: Counter-Offer (R0${versionNum})` : "Stage 2: Active Negotiation";
          badgeClass = "bg-slate-950 text-white";
        } else if (myAck && !partnerAck) {
          stage = 1;
          stageLabel = "Stage 1: Awaiting Partner Ack";
          badgeClass = "bg-slate-800 text-slate-100";
        } else if (!myAck && partnerAck) {
          stage = 1;
          stageLabel = "Stage 1: Your Ack Needed";
          badgeClass = "bg-slate-900 text-white";
        }

        list.push({
          id: item.id,
          opportunityTitle: item.opportunity?.title || "Bilateral Exchange Session",
          opportunityNumber: formatOpportunityCode(item.opportunity?.opportunity_number || item.opportunity_id),
          exchangeCode: formatExchangeCode(item.opportunity?.opportunity_number || item.opportunity_id, item.id),
          category: item.opportunity?.category || "Commercial Exchange",
          partnerName: partner,
          direction: item.direction,
          status: item.status,
          createdAt: item.created_at,
          lastFollowUpAt: item.last_follow_up_at,
          stage,
          stageLabel,
          badgeClass,
          isCompleted,
          proposedTerms: item.proposed_terms || item.message,
        });
      }
    });

    // Sort: active negotiations first, completed handshakes second, then by latest created
    return list.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }, [incomingReqs, sentReqs]);

  // Search Filter
  const filteredExchanges = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allExchanges;
    return allExchanges.filter(
      (ex) =>
        ex.opportunityTitle.toLowerCase().includes(q) ||
        ex.partnerName.toLowerCase().includes(q) ||
        ex.exchangeCode.toLowerCase().includes(q) ||
        ex.opportunityNumber?.toLowerCase().includes(q) ||
        (ex.category && ex.category.toLowerCase().includes(q)) ||
        ex.stageLabel.toLowerCase().includes(q)
    );
  }, [allExchanges, searchQuery]);

  const activeCount = useMemo(() => allExchanges.filter((e) => !e.isCompleted).length, [allExchanges]);
  const completedCount = useMemo(() => allExchanges.filter((e) => e.isCompleted).length, [allExchanges]);

  const isLoading = (loadingIncoming || loadingSent) && allExchanges.length === 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-950 mx-auto"></div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
            Loading Exchange Hub...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full max-w-full overflow-x-hidden">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16 md:pt-8 md:pb-24 flex flex-col space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Operational Command · Bilateral Dealrooms
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Exchange Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-950 text-white uppercase tracking-wider">
                {allExchanges.length} Total Exchanges
              </span>
              {completedCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#171F2C] text-emerald-400 border border-[#334155] uppercase tracking-wider inline-flex items-center gap-1">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                  {completedCount} Completed
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 max-w-2xl font-sans leading-relaxed">
              Secure bilateral workspaces for executing mutual commercial transactions, reviewing proposals, and unlocking direct contact details.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              to="/opportunities"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold font-sans transition-colors cursor-pointer"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar (Only shown when user has exchanges) */}
        {allExchanges.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search dealrooms by ID, partner, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded border-slate-200 focus:border-slate-950 font-sans"
              />
            </div>
            <span className="text-xs font-mono text-slate-400 self-end sm:self-auto">
              Showing {filteredExchanges.length} of {allExchanges.length} exchanges ({activeCount} active · {completedCount} completed)
            </span>
          </div>
        )}

        {/* Content Section */}
        {allExchanges.length === 0 ? (
          /* ═══════════════════════════════════════════════════════════════════
             OFFICIAL DESIGN SYSTEM EMPTY STATE
             ═══════════════════════════════════════════════════════════════════ */
          <div className="border border-slate-200/90 bg-white rounded-lg p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs space-y-6 my-6">
            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center mx-auto text-slate-900 shadow-2xs">
              <Handshake className="w-7 h-7 text-slate-900 stroke-[1.75]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[9.5px] uppercase tracking-widest text-slate-400 font-bold block">
                Bilateral Negotiation Space
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                No Bilateral Exchanges Yet
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-sans">
                You currently have no ongoing exchange negotiations or active deal rooms. Discover commercial listings on the Marketplace and pitch bilateral terms to start an exchange.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-widest px-6 py-3 rounded font-bold shadow-xs transition-colors w-full sm:w-auto justify-center"
              >
                <span>Explore Commercial Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick 3-Pillar Security Note */}
            <div className="border-t border-slate-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-900 block">
                  1. Blinded Terms
                </span>
                <p className="text-[11px] text-slate-500 font-sans leading-tight">
                  Propose commercial terms and barter parity safely.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-900 block">
                  2. Bilateral Agreement
                </span>
                <p className="text-[11px] text-slate-500 font-sans leading-tight">
                  Both parties align on delivery and escrow parameters.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-900 block">
                  3. Consensual Reveal
                </span>
                <p className="text-[11px] text-slate-500 font-sans leading-tight">
                  Direct executive contacts unlock only on mutual consent.
                </p>
              </div>
            </div>
          </div>
        ) : filteredExchanges.length === 0 ? (
          /* Search Empty State */
          <div className="border border-slate-200 bg-white rounded-lg p-10 text-center max-w-md mx-auto space-y-3">
            <Search className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-sm text-slate-900">
              No matching dealrooms found
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              No exchange session matches &ldquo;{searchQuery}&rdquo;.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="font-mono text-[10px] uppercase font-bold tracking-wider"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════
             EXCHANGES VERTICAL STACKED LIST
             ═══════════════════════════════════════════════════════════════════ */
          <div className="flex flex-col gap-3.5">
            {filteredExchanges.map((ex) => {
              const isOwner = ex.direction === "inbound";

              if (ex.isCompleted) {
                // ═══════════════════════════════════════════════════════════════════
                // COMPLETED EXCHANGE CARD (Dark Theme with White Circular Black Tick)
                // ═══════════════════════════════════════════════════════════════════
                return (
                  <div
                    key={ex.id}
                    className="relative bg-[#171F2C] text-white border border-[#334155] hover:border-slate-500 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                  >
                    {/* Top Right Circular Tick Indicator: White Background with Black Tick */}
                    <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md z-10">
                      <Check className="w-3.5 h-3.5 text-[#171F2C] stroke-[3]" />
                    </div>

                    {/* Left / Info Section */}
                    <div className="space-y-2.5 flex-1 min-w-0 pr-8 md:pr-0">
                      {/* Top Metadata Strip */}
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold uppercase tracking-wider border border-white/20">
                          {ex.exchangeCode}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200 font-bold uppercase tracking-wider border border-white/10">
                          Opp #{ex.opportunityNumber}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-medium uppercase tracking-wider">
                          {ex.category}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-300 uppercase font-semibold">
                          {isOwner ? "Your Opportunity" : "Partner Opportunity"}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">
                          {ex.createdAt
                            ? new Date(ex.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Completed"}
                        </span>
                      </div>

                      {/* Opportunity Title */}
                      <h3 className="font-display font-bold text-base text-white group-hover:text-slate-100 leading-snug">
                        {ex.opportunityTitle}
                      </h3>

                      {/* Counterparty Partner & Terms Preview */}
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/80 text-slate-200">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-400 text-[11px]">Partner:</span>
                          <span className="font-semibold text-white truncate">
                            {ex.partnerName}
                          </span>
                        </div>

                        {ex.proposedTerms && (
                          <p className="text-xs text-slate-300 font-sans line-clamp-1 italic max-w-lg">
                            &ldquo;{ex.proposedTerms}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right / Status & Actions Section */}
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                      <span className="px-2.5 py-1 rounded font-mono font-bold uppercase text-[9.5px] tracking-wider shrink-0 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ✓ Handshake Sealed
                      </span>

                      <Link
                        to="/connections/$id"
                        params={{ id: ex.id }}
                        className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-[#171F2C] font-mono text-[10.5px] uppercase font-bold tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-xs group-hover:translate-x-0.5"
                      >
                        <span>Open Dealroom</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              }

              // ═══════════════════════════════════════════════════════════════════
              // ACTIVE IN-FLIGHT NEGOTIATION CARD (Light Theme)
              // ═══════════════════════════════════════════════════════════════════
              return (
                <div
                  key={ex.id}
                  className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:shadow-sm transition-all group"
                >
                  {/* Left / Info Section */}
                  <div className="space-y-2.5 flex-1 min-w-0">
                    {/* Top Metadata Strip */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold uppercase tracking-wider">
                        {ex.exchangeCode}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border border-slate-200">
                        Opp #{ex.opportunityNumber}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100/80 text-slate-600 font-medium uppercase tracking-wider">
                        {ex.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 uppercase font-semibold">
                        {isOwner ? "Your Opportunity" : "Partner Opportunity"}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">
                        {ex.createdAt
                          ? new Date(ex.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Active"}
                      </span>
                    </div>

                    {/* Opportunity Title */}
                    <h3 className="font-display font-bold text-base text-slate-950 group-hover:text-slate-800 leading-snug">
                      {ex.opportunityTitle}
                    </h3>

                    {/* Counterparty Partner & Terms Preview */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200/70 text-slate-700">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-slate-400 text-[11px]">Partner:</span>
                        <span className="font-semibold text-slate-900 truncate">
                          {ex.partnerName}
                        </span>
                      </div>

                      {ex.proposedTerms && (
                        <p className="text-xs text-slate-500 font-sans line-clamp-1 italic max-w-lg">
                          &ldquo;{ex.proposedTerms}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right / Status & Actions Section */}
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <span className={cn("px-2.5 py-1 rounded font-mono font-bold uppercase text-[9.5px] tracking-wider shrink-0", ex.badgeClass)}>
                      {ex.stageLabel}
                    </span>

                    <Link
                      to="/connections/$id"
                      params={{ id: ex.id }}
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10.5px] uppercase font-bold tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-xs group-hover:translate-x-0.5"
                    >
                      <span>Open Dealroom</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
