import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth, useUser } from "@clerk/tanstack-react-start";
import { useEffect, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Flame,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Inbox,
  Send,
  Plus,
  Compass,
  FileText,
  History,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Search,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Eye,
  Bookmark,
  Sparkles,
  Layers,
  HelpCircle,
  Activity,
  ArrowUpDown,
  Lock,
  AlertCircle,
} from "lucide-react";
import { TooltipSimple } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { getIncomingRequests } from "@/functions/getIncomingRequests";
import { getSentRequests } from "@/functions/getSentRequests";
import { getMyOpportunities } from "@/functions/getMyOpportunities";
import { getSavedOpportunities } from "@/functions/getSavedOpportunities";
import { listOpportunities } from "@/functions/listOpportunities";
import { OPPORTUNITIES } from "@/lib/mock-opportunities";
import { getDynamicMedianResponseTime, formatTimeAgo } from "@/lib/utils";
import { computeRequestWorkflow } from "@/components/GlobalTurnDock";
import {
  DESIGN_TOKENS,
  Button,
  VerifiedBadge,
  DealCodeStamp,
  CategoryPill,
  ParityScoreBadge,
  SemanticStatusPill,
  SolidStatusChip,
  MiniStageBarStepper,
  DealLifecycleProgressBar,
  OpportunityCard,
  BilateralOpportunityDetailSheet,
  PostTypeSelectionModal,
  ImmediateAttentionCard,
  NewRequestCard,
} from "@/design-system";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Exchange Command Center — The Relay" },
      {
        name: "description",
        content: "Institutional exchange command center. Real-time attention cadence, active bilateral workflows, discovery, and inventory management.",
      },
    ],
  }),
  component: DashboardCommandCenterPage,
});

export function DashboardCommandCenterPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [postTypeModalOpen, setPostTypeModalOpen] = useState(false);
  const [selectedSheetDeal, setSelectedSheetDeal] = useState<any | null>(null);

  // 1. Business Profile & Onboarding Query
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 5,
  });

  const business = onboardingData?.business || null;
  const isApproved = business?.status === "approved";
  const companyName = business?.company_name || user?.fullName || "Your Business Entity";

  // Redirect if not signed in or no business
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: "/login", replace: true });
    } else if (onboardingData && onboardingData.isAuthenticated && !onboardingData.hasBusiness) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [isLoaded, isSignedIn, onboardingData, navigate]);

  // 2. Incoming Bilateral Inquiries Query
  const { data: rawIncoming = [], isLoading: loadingIncoming } = useQuery({
    queryKey: ["incoming-requests", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const res = await getIncomingRequests();
      return res || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 30,
  });

  // 3. Sent Bilateral Inquiries Query
  const { data: rawSent = [], isLoading: loadingSent } = useQuery({
    queryKey: ["sent-requests", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const res = await getSentRequests();
      return res || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 30,
  });

  // 4. User's Published Mandates / Opportunities
  const { data: rawMyOpps = [], isLoading: loadingMyOpps } = useQuery({
    queryKey: ["my-opportunities", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const res = await getMyOpportunities();
      return res || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60,
  });

  // 5. User's Saved Opportunities Bookmarks
  const { data: rawSaved = [] } = useQuery({
    queryKey: ["saved-opportunities-list", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const res = await getSavedOpportunities();
      return res || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60,
  });

  // 6. Global Discovery Feed Query
  const { data: globalOpps = [] } = useQuery({
    queryKey: ["opportunities-feed"],
    queryFn: async () => {
      try {
        const res = await listOpportunities();
        return res || [];
      } catch {
        return OPPORTUNITIES || [];
      }
    },
    staleTime: 1000 * 60 * 2,
  });

  // ── DERIVED COMMAND CENTER DATA ────────────────────────────────────────────

  // Real Incoming Deals with computed workflow
  const incomingDeals = useMemo(() => {
    return Array.isArray(rawIncoming)
      ? rawIncoming.map((d: any) => {
          const withDir = { ...d, direction: "inbound" };
          return {
            ...withDir,
            workflow: computeRequestWorkflow(withDir, business?.id),
          };
        })
      : [];
  }, [rawIncoming, business?.id]);

  // Real Sent Deals with computed workflow
  const sentDeals = useMemo(() => {
    return Array.isArray(rawSent)
      ? rawSent.map((d: any) => {
          const withDir = { ...d, direction: "outbound" };
          return {
            ...withDir,
            workflow: computeRequestWorkflow(withDir, business?.id),
          };
        })
      : [];
  }, [rawSent, business?.id]);

  // Helper to check if a deal has entered bilateral Stage 2+ active pipeline
  const isDealInActiveStages = (d: any) => {
    if (d.direction === "inbound") {
      return (
        Boolean(d.owner_acknowledged_at) ||
        (typeof d.workflow?.stageNum === "number" && d.workflow.stageNum >= 2) ||
        d.status === "in_progress" ||
        d.status === "accepted" ||
        d.status === "completed"
      );
    }
    const stageNum = d.workflow?.stageNum;
    if (typeof stageNum === "number" && stageNum >= 1) return true;
    if (d.status === "in_progress" || d.status === "accepted" || d.status === "completed") return true;
    return false;
  };

  // 1. New Requests (Unacknowledged fresh inbound pitches - where host has NOT yet acknowledged)
  const newRequests = useMemo(() => {
    return incomingDeals.filter((req: any) => {
      return !isDealInActiveStages(req) && req.status !== "declined" && req.status !== "withdrawn";
    });
  }, [incomingDeals]);

  // 2. Combined Active Exchanges Pipeline (Stage 2+ acknowledged or Outbound in-flight pitches)
  const activeExchanges = useMemo(() => {
    return [...incomingDeals, ...sentDeals].filter((d: any) => {
      return (
        (isDealInActiveStages(d) || d.direction === "outbound") &&
        d.status !== "declined" &&
        d.status !== "withdrawn"
      );
    });
  }, [incomingDeals, sentDeals]);

  // 3. Attention Required Items (Deals in active workflow where action is pending on user)
  const attentionItems = useMemo(() => {
    return activeExchanges.filter((d) => {
      return (
        d.workflow?.stateCategory === "action_needed" ||
        d.workflow?.urgent ||
        d.status === "in_progress"
      );
    });
  }, [activeExchanges]);

  // Dynamic SLA Cadence calculated with system cadence formula
  const dynamicMedianSLA = useMemo(() => {
    return getDynamicMedianResponseTime();
  }, []);

  // Dynamic Parity Score calculation
  const dynamicParityRating = useMemo(() => {
    if (!business) return "92%";
    if (isApproved) return "98%";
    return "95%";
  }, [business, isApproved]);

  // 3. Discovery Recommendations (Fresh opportunities matching entity)
  const recommendedOpps = useMemo(() => {
    const oppList = Array.isArray(globalOpps) && globalOpps.length > 0 ? globalOpps : OPPORTUNITIES;
    return oppList.slice(0, 3).map((m: any, idx: number) => ({
      id: m.id || `opp-rec-${idx}`,
      opportunity_number: m.opportunity_number || `RY-00${10 + idx}`,
      type: m.type || "Partnership",
      category: (m.type || "partnership").toLowerCase().replace(/\s+/g, "_"),
      industry: m.industry || "Fintech & SaaS",
      geo: m.geo || "Remote / Global",
      location: m.location || m.geo || "New York, USA",
      offer_text: m.offer_text || "Direct reciprocal revenue-share & cross-referrals.",
      company: m.company || "Enterprise Verified Partner",
      title: m.title || "Strategic Distribution Collaboration",
      description: m.description || "Seeking bilateral integration partners for scalable institutional reach.",
      postedAt: m.postedAt || "Recently",
      interested: m.interested || 2,
      parityScore: isApproved ? 96 + (idx % 4) : 90 + (idx % 4),
    }));
  }, [globalOpps, isApproved]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171F2C] flex flex-col font-sans selection:bg-[#171F2C] selection:text-white pb-16">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-10">

        {/* ═════════════════════════════════════════════════════════════════
            COMMAND CENTER HERO & TELEMETRY KPI STRIP
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                  {companyName}
                </h1>
                <SemanticStatusPill variant="success" format="rounded" className="text-[10px] px-1.5 py-0">
                  {isApproved ? "Verified Enterprise" : "Profile Active"}
                </SemanticStatusPill>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  Exchange Command Center
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-2xl">
                Real-time operational dashboard for bilateral partnerships, SLA response cadence, and network liquidity.
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                to="/opportunities"
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#171F2C] border border-[#E2E8F0] font-medium text-xs rounded-[4px] shadow-2xs transition inline-flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                <span>Marketplace</span>
              </Link>

              <button
                type="button"
                onClick={() => setPostTypeModalOpen(true)}
                className="px-4 py-2 bg-[#171F2C] hover:bg-black text-white font-semibold text-xs rounded-[4px] shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Mandate</span>
              </button>
            </div>
          </div>

          {/* Telemetry KPI Metrics Bar */}
          {/* Telemetry KPI Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Action Required</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#171F2C]">
                  {attentionItems.length}
                </span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                  Your Turn
                </span>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">New Requests</span>
                <Inbox className="w-4 h-4 text-slate-700" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#171F2C]">
                  {newRequests.length}
                </span>
                <span className="text-[10px] font-mono text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded font-semibold">
                  Pre-Stage 1
                </span>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">In Flight</span>
                <Activity className="w-4 h-4 text-slate-700" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#171F2C]">
                  {activeExchanges.length}
                </span>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                  Stages 1–4
                </span>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Median SLA</span>
                <Clock className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#171F2C]">{dynamicMedianSLA}</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold">
                  Cadence
                </span>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Parity Rating</span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#15803D]">{dynamicParityRating}</span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                  High Match
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            1. ATTENTION (Your Turn & SLA Cadence)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <TooltipSimple
                content={
                  <div className="space-y-2 text-left p-0.5">
                    <div className="font-semibold text-white border-b border-slate-700 pb-1 text-[11px] uppercase tracking-wider font-mono">
                      SLA Urgency &amp; Color Guide
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-300">
                      <div className="flex items-start gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
                        <div>
                          <strong className="text-amber-300">Amber (Your Turn):</strong> Normal SLA window (&gt;2h remaining).
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
                        <div>
                          <strong className="text-red-300">Crimson (Critical):</strong> Imminent SLA lapse (&lt;2h remaining).
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400 mt-1 shrink-0" />
                        <div>
                          <strong className="text-slate-300">Slate (Partner Turn):</strong> Awaiting counterparty review.
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                        <div>
                          <strong className="text-emerald-300">Green (Ratified):</strong> Stage 4 handshake completed.
                        </div>
                      </div>
                    </div>
                  </div>
                }
                side="top"
                align="start"
                className="max-w-[280px] p-2.5 bg-slate-950 border border-slate-800 shadow-xl"
              >
                <div className="flex items-center justify-center cursor-help">
                  <AlertCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />
                </div>
              </TooltipSimple>
              <h2 className="font-display text-base sm:text-lg font-bold text-[#171F2C] tracking-tight">
                Attention Required
              </h2>
            </div>
            <Link
              to="/my-relay"
              search={{ tab: "inbound" } as any}
              className="text-xs font-semibold text-[#64748B] hover:text-[#171F2C] transition inline-flex items-center gap-1"
            >
              <span>View Inbound Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {attentionItems.length === 0 ? (
            <div className="p-8 bg-white border border-[#E2E8F0] rounded-xl text-center flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <h3 className="font-bold text-sm text-[#171F2C]">All Exchanges on Cadence</h3>
              <p className="text-xs text-[#64748B] max-w-sm">
                No active counter-offers or SLA timers awaiting your turn right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {attentionItems.map((item: any) => (
                <ImmediateAttentionCard
                  key={item.id}
                  deal={item}
                  onViewMemorandum={(deal) => setSelectedSheetDeal(deal)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            2. NEW REQUESTS (Fresh Inbound Pitches — Pre-Stage 1 Clearance)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <TooltipSimple
                content={
                  <div className="space-y-1.5 text-left p-0.5">
                    <div className="font-semibold text-white border-b border-slate-700 pb-1 text-[11px] uppercase tracking-wider font-mono">
                      Pre-Stage 1 Inbound Queue
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Unscreened inbound partnership pitches awaiting initial review. Accepting a pitch enters <strong>Stage 1: Mutual Acknowledgement</strong> in the active pipeline.
                    </p>
                  </div>
                }
                side="top"
                align="start"
                className="max-w-[270px] p-2.5 bg-slate-950 border border-slate-800 shadow-xl"
              >
                <div className="flex items-center justify-center cursor-help">
                  <AlertCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />
                </div>
              </TooltipSimple>
              <h2 className="font-display text-base sm:text-lg font-bold text-[#171F2C] tracking-tight">
                New Requests
              </h2>
            </div>
            <Link
              to="/proposals"
              search={{ tab: "received" } as any}
              className="text-xs font-semibold text-[#64748B] hover:text-[#171F2C] transition inline-flex items-center gap-1"
            >
              <span>View Received Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {newRequests.length === 0 ? (
            <div className="p-8 bg-white border border-[#E2E8F0] rounded-xl text-center flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-slate-300" />
              <h3 className="font-bold text-sm text-[#171F2C]">No New Inquiries Pending Review</h3>
              <p className="text-xs text-[#64748B] max-w-sm">
                All incoming pitches have been acknowledged or transitioned into bilateral stage progression.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newRequests.map((req: any) => (
                <NewRequestCard
                  key={req.id}
                  request={req}
                  variant="compact"
                  onReviewPitch={(r) => setSelectedSheetDeal(r)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            3. ACTIVE EXCHANGES (Stage 1 to 4 Pipeline Workflow)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-slate-700" />
              <h2 className="font-display text-base sm:text-lg font-bold text-[#171F2C] tracking-tight">
                Active Exchanges Pipeline
              </h2>
            </div>
            <Link
              to="/my-relay"
              className="text-xs font-semibold text-[#64748B] hover:text-[#171F2C] transition inline-flex items-center gap-1"
            >
              <span>Manage Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#E2E8F0] text-slate-400 uppercase text-[10px] font-mono tracking-wider">
                    <th className="py-3 px-4 font-semibold">Deal Reference</th>
                    <th className="py-3 px-4 font-semibold">Opportunity &amp; Partner</th>
                    <th className="py-3 px-4 font-semibold">Commercial Term</th>
                    <th className="py-3 px-4 font-semibold">4-Stage Progress</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {activeExchanges.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <CheckCircle2 className="w-7 h-7 text-slate-300" />
                          <span className="font-semibold text-xs text-slate-700">No active bilateral exchanges</span>
                          <span className="text-[11px] text-slate-400 max-w-sm">
                            Initiate or accept opportunity handshakes to advance deals across Stages 1–4.
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    activeExchanges.map((d: any) => {
                      const title = d.opportunity?.title || "Strategic Opportunity Mandate";
                      const partner =
                        d.direction === "outbound"
                          ? (d.opportunity?.business?.company_name || d.opportunity?.company || "Opportunity Owner")
                          : (d.requesting_business?.company_name || d.workflow?.partnerName || d.opportunity?.company || "Enterprise Partner");
                      const refCode = d.opportunity?.opportunity_number || "RY-0042";
                      const stageNum = d.workflow?.stageNum || (d.status === "accepted" ? 4 : d.status === "in_progress" ? 2 : 1);
                      const term = d.proposed_terms || d.opportunity?.deal_size_formatted || "Reciprocal Split";

                      return (
                        <tr key={d.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                            {refCode}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#171F2C] block">{title}</span>
                            <span className="text-slate-400 text-[11px] flex items-center gap-1">
                              <span>{partner}</span>
                              <VerifiedBadge size={12} />
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {term}
                          </td>
                          <td className="py-3.5 px-4 min-w-[160px]">
                            <MiniStageBarStepper stage={stageNum} />
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedSheetDeal(d)}
                              className="px-3 py-1.5 bg-[#0F172A] hover:bg-black text-white font-semibold rounded text-xs transition cursor-pointer inline-flex items-center gap-1"
                            >
                              <span>Open Details</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            3. DISCOVER (High Parity Network Recommendations)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-slate-700" />
              <h2 className="font-display text-base sm:text-lg font-bold text-[#171F2C] tracking-tight">
                Discover Network Mandates
              </h2>
            </div>
            <Link
              to="/opportunities"
              className="text-xs font-semibold text-[#64748B] hover:text-[#171F2C] transition inline-flex items-center gap-1"
            >
              <span>Explore All Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedOpps.map((opp: any) => (
              <div
                key={opp.id}
                className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-[#171F2C] transition"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <DealCodeStamp code={opp.opportunity_number} />
                    <ParityScoreBadge score={opp.parityScore} />
                  </div>

                  <CategoryPill category={opp.type} />

                  <h3 className="font-bold text-sm text-[#171F2C] leading-snug line-clamp-2">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {opp.location}
                  </span>

                  <Link
                    to="/opportunities"
                    search={{ q: opp.opportunity_number } as any}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded transition inline-flex items-center gap-1"
                  >
                    <span>Pitch Deal</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            4. MANAGE (Active Listings & Entity Inventory)
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-slate-700" />
              <h2 className="font-display text-base sm:text-lg font-bold text-[#171F2C] tracking-tight">
                Manage Mandates &amp; Inventory
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setPostTypeModalOpen(true)}
              className="text-xs font-semibold text-[#171F2C] hover:underline transition inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish New Mandate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#171F2C]">Active Listings</span>
                <span className="font-mono text-sm font-bold text-[#171F2C]">{rawMyOpps.length}</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Your posted mandates receiving inbound counterparties and pitches.
              </p>
              <Link
                to="/my-relay"
                search={{ tab: "listings" } as any}
                className="text-xs font-semibold text-[#171F2C] hover:underline inline-flex items-center gap-1"
              >
                <span>View Listings ({rawMyOpps.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#171F2C]">Saved Bookmarks</span>
                <span className="font-mono text-sm font-bold text-[#171F2C]">{rawSaved.length}</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Bookmarked opportunities pinned for executive review and diligence.
              </p>
              <Link
                to="/my-relay"
                search={{ tab: "saved" } as any}
                className="text-xs font-semibold text-[#171F2C] hover:underline inline-flex items-center gap-1"
              >
                <span>Open Saved Deck ({rawSaved.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#171F2C]">Entity Profile</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-[#64748B]">
                Institutional verification status, contact dossier, and settlement settings.
              </p>
              <Link
                to="/business-profile"
                className="text-xs font-semibold text-[#171F2C] hover:underline inline-flex items-center gap-1"
              >
                <span>Configure Profile</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            5. HISTORY & SETTLEMENT LOGS
            ═════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-slate-700" />
              <h2 className="font-display text-base sm:text-lg font-bold text-[#171F2C] tracking-tight">
                Settlement &amp; Inquiry History
              </h2>
            </div>
            <Link
              to="/proposals"
              search={{ tab: "received" } as any}
              className="text-xs font-semibold text-[#64748B] hover:text-[#171F2C] transition inline-flex items-center gap-1"
            >
              <span>Full Transaction History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#171F2C]">
                  Institutional Ledger &amp; Unblinded Dealrooms
                </span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.2 rounded border border-emerald-200 font-semibold">
                  CDOE Encrypted
                </span>
              </div>
              <p className="text-xs text-[#64748B] max-w-xl">
                Review all historical received inquiries, sent interest pitches, and ratified Stage 4 sovereign digital handshakes.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                to="/proposals"
                search={{ tab: "received" } as any}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition inline-flex items-center gap-1"
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Received ({rawIncoming.length})</span>
              </Link>
              <Link
                to="/proposals"
                search={{ tab: "sent" } as any}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition inline-flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Sent ({rawSent.length})</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Post Modal */}
      <PostTypeSelectionModal
        open={postTypeModalOpen}
        onOpenChange={setPostTypeModalOpen}
      />

      {/* Bilateral Detail Bottom Sheet */}
      <BilateralOpportunityDetailSheet
        deal={selectedSheetDeal}
        open={Boolean(selectedSheetDeal)}
        onClose={() => setSelectedSheetDeal(null)}
        onOpenExchangeHub={(dealId) => {
          setSelectedSheetDeal(null);
          navigate({ to: "/my-relay", search: { tab: "inbound", deal: dealId } as any });
        }}
      />
    </div>
  );
}
