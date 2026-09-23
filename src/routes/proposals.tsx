import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { toast } from "sonner";
import {
  Check,
  X,
  Lock,
  Unlock,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
  Loader2,
  Trash2,
  Inbox,
  Send,
  Eye,
  FileText,
  BadgeCheck,
  AlertCircle,
  TrendingUp,
  History,
} from "lucide-react";
import { getIncomingRequests } from "../functions/getIncomingRequests";
import { getSentRequests } from "../functions/getSentRequests";
import { getRequestById } from "../functions/getRequestById";
import { acceptInterest } from "../functions/acceptInterest";
import { declineInterest } from "../functions/declineInterest";
import { withdrawInterest } from "../functions/withdrawInterest";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ExecutiveTabs } from "@/design-system";
import { ProposalHistorySheet } from "@/components/proposals/ProposalHistorySheet";

const searchParamsSchema = z.object({
  tab: fallback(z.enum(["received", "sent"]), "received").default("received"),
});

export const Route = createFileRoute("/proposals")({
  validateSearch: zodValidator(searchParamsSchema),
  head: () => ({
    meta: [
      { title: "Proposals — The Relay" },
      {
        name: "description",
        content: "Review received inquiries and track sent proposals across your institutional deal network.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ProposalsPage,
});

type TabType = "received" | "sent";

export function ProposalsPage() {
  const { tab: initialTab } = Route.useSearch();
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<TabType>(initialTab === "sent" ? "sent" : "received");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProposalForModal, setSelectedProposalForModal] = useState<any | null>(null);
  const [modalType, setModalType] = useState<"detail" | "accept" | "decline" | "withdraw" | null>(null);
  const [historyOpportunity, setHistoryOpportunity] = useState<{
    id: string;
    title: string;
    opportunity_number?: string;
  } | null>(null);

  // Sync tab with URL search if changed
  useEffect(() => {
    if (initialTab && ["received", "sent"].includes(initialTab)) {
      setActiveTab(initialTab as TabType);
    }
  }, [initialTab]);

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    navigate({
      search: (prev: any) => ({ ...prev, tab: newTab }),
      replace: true,
    });
  };

  // 1. Onboarding & Business Profile Query
  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      if (!isSignedIn) return null;
      return await checkOnboardingStatus();
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: "/login", replace: true });
    } else if (onboardingData && onboardingData.isAuthenticated && !onboardingData.hasBusiness) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [isLoaded, isSignedIn, onboardingData, navigate]);

  // 2. Incoming Proposals Query - ONLY fetched when Received tab is active
  const { data: incomingRequests = [], isLoading: loadingIncoming } = useQuery({
    queryKey: ["incoming-requests", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const data = await getIncomingRequests();
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn && activeTab === "received"),
    staleTime: 1000 * 30,
  });

  // 3. Sent Proposals Query - ONLY fetched when Sent tab is active
  const { data: rawSentRequests = [], isLoading: loadingSent } = useQuery({
    queryKey: ["sent-requests", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const data = await getSentRequests();
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn && activeTab === "sent"),
    staleTime: 1000 * 30,
  });

  // 4. On-demand Detail Query with caching when opening detail modal
  const selectedProposalId = selectedProposalForModal?.id;
  const { data: fetchedProposalDetail, isLoading: loadingDetail } = useQuery({
    queryKey: ["proposal-detail", selectedProposalId],
    queryFn: async () => {
      if (!selectedProposalId) return null;
      if (selectedProposalId.startsWith("local-req-")) {
        return selectedProposalForModal;
      }
      return await getRequestById({ data: { interest_id: selectedProposalId } });
    },
    enabled: Boolean(selectedProposalId && modalType === "detail"),
    staleTime: 1000 * 60 * 5,
  });

  const activeProposalDetail = fetchedProposalDetail || selectedProposalForModal;

  // Merged Sent Requests (Combines PostgreSQL requests with any local store entries)
  const sentRequests = useMemo(() => {
    const dbList = Array.isArray(rawSentRequests) ? [...rawSentRequests] : [];
    const dbOppIds = new Set<string>();

    dbList.forEach((r: any) => {
      if (r.opportunity_id) dbOppIds.add(r.opportunity_id);
      if (r.opportunity?.id) dbOppIds.add(r.opportunity.id);
      if (r.opportunity?.opportunity_number) dbOppIds.add(r.opportunity.opportunity_number);
    });

    if (typeof window !== "undefined") {
      try {
        const localStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
        Object.entries(localStore).forEach(([oppId, record]: [string, any]) => {
          if (!dbOppIds.has(oppId) && record && record.status) {
            const matchedMock = OPPORTUNITIES.find((o) => o.id === oppId);
            dbList.push({
              id: record.id || `local-req-${oppId}`,
              opportunity_id: oppId,
              status: record.status || "pending",
              message: record.pitch || "Reciprocal exchange proposal submitted.",
              created_at: record.requestedAt || new Date().toISOString(),
              opportunity: {
                id: oppId,
                title: matchedMock?.title || "Strategic Opportunity Mandate",
                opportunity_number: matchedMock?.opportunity_number || oppId,
                category: matchedMock?.type?.toLowerCase() || "partnership",
                business: {
                  company_name: matchedMock?.company || "Enterprise Partner",
                  status: "approved",
                },
                company: matchedMock?.company || "Enterprise Partner",
              },
            });
            dbOppIds.add(oppId);
          }
        });
      } catch (err) {
        console.error("Failed to parse local sent requests:", err);
      }
    }

    return dbList;
  }, [rawSentRequests]);

  // Derived Counts
  const pendingIncomingCount = useMemo(() => {
    if (!Array.isArray(incomingRequests)) return 0;
    return incomingRequests.filter((r: any) => r && r.status === "pending").length;
  }, [incomingRequests]);

  const activeSentCount = useMemo(() => {
    if (!Array.isArray(sentRequests)) return 0;
    return sentRequests.filter((r: any) => r && r.status === "pending").length;
  }, [sentRequests]);

  // Accept Mutation
  const acceptMutation = useMutation({
    mutationFn: async ({ interestId }: { interestId: string }) => {
      await acceptInterest({ data: { interest_id: interestId } });
    },
    onSuccess: () => {
      toast.success("Proposal Accepted — Handshake Complete", {
        description: "Direct contact information is now unlocked.",
      });
      queryClient.invalidateQueries({ queryKey: ["incoming-requests", userId] });
      queryClient.invalidateQueries({ queryKey: ["my-opportunities", userId] });
      setModalType(null);
      setSelectedProposalForModal(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to accept proposal.");
    },
  });

  // Decline Mutation
  const declineMutation = useMutation({
    mutationFn: async ({ interestId }: { interestId: string }) => {
      await declineInterest({ data: { interest_id: interestId } });
    },
    onSuccess: () => {
      toast.success("Proposal Declined", {
        description: "The proposal has been marked as declined.",
      });
      queryClient.invalidateQueries({ queryKey: ["incoming-requests", userId] });
      setModalType(null);
      setSelectedProposalForModal(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to decline proposal.");
    },
  });

  // Withdraw Mutation
  const withdrawMutation = useMutation({
    mutationFn: async ({ interestId, opportunityId }: { interestId: string; opportunityId?: string }) => {
      const isLocal = interestId.startsWith("local-req-");
      if (!isLocal) {
        await withdrawInterest({ data: { interest_id: interestId } });
      }
    },
    onSuccess: (_data, { interestId, opportunityId }) => {
      toast.success("Proposal Withdrawn", {
        description: "Your proposal pitch has been cancelled.",
      });

      // Clear from local storage
      if (typeof window !== "undefined") {
        try {
          const localStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
          if (opportunityId && localStore[opportunityId]) {
            delete localStore[opportunityId];
            localStorage.setItem("relay.interest.v1", JSON.stringify(localStore));
          }
        } catch (_) {}
      }

      queryClient.invalidateQueries({ queryKey: ["sent-requests", userId] });
      setModalType(null);
      setSelectedProposalForModal(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to withdraw proposal.");
    },
  });

  // Filtered lists
  const filteredIncoming = useMemo(() => {
    if (!Array.isArray(incomingRequests)) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return incomingRequests;
    return incomingRequests.filter((req: any) => {
      if (!req) return false;
      const oppTitle = req.opportunity?.title?.toLowerCase() || "";
      const company = req.requesting_business?.company_name?.toLowerCase() || "";
      const msg = req.message?.toLowerCase() || "";
      const status = req.status?.toLowerCase() || "";
      return oppTitle.includes(q) || company.includes(q) || msg.includes(q) || status.includes(q);
    });
  }, [incomingRequests, searchQuery]);

  const filteredSent = useMemo(() => {
    if (!Array.isArray(sentRequests)) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return sentRequests;
    return sentRequests.filter((req: any) => {
      if (!req) return false;
      const oppTitle = req.opportunity?.title?.toLowerCase() || "";
      const company =
        req.opportunity?.business?.company_name?.toLowerCase() ||
        req.opportunity?.company?.toLowerCase() ||
        "";
      const msg = req.message?.toLowerCase() || "";
      const status = req.status?.toLowerCase() || "";
      return oppTitle.includes(q) || company.includes(q) || msg.includes(q) || status.includes(q);
    });
  }, [sentRequests, searchQuery]);

  const formatDistance = (dateString: string | Date | undefined | null) => {
    if (!dateString) return "recently";
    try {
      const now = new Date();
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "recently";
      const diffMs = Math.max(0, now.getTime() - date.getTime());
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "1d ago";
      return `${diffDays}d ago`;
    } catch {
      return "recently";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white text-[11px] font-mono font-medium tracking-wide uppercase">
            Accepted
          </span>
        );
      case "declined":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-red-50 text-red-700 border border-red-200 text-[11px] font-mono font-medium tracking-wide uppercase">
            Declined
          </span>
        );
      case "withdrawn":
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-mono font-medium tracking-wide uppercase">
            Withdrawn
          </span>
        );
      case "pending":
      default:
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] text-slate-700 border border-[#E2E8F0] text-[11px] font-mono font-medium tracking-wide uppercase">
            Awaiting Review
          </span>
        );
    }
  };

  const isLoading = activeTab === "received" ? loadingIncoming : loadingSent;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-[#171F2C] selection:text-white">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col gap-8">
          {/* ═════════════════════════════════════════════════════════════════
              WORKSPACE HEADER & KPI STRIP
              ═════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-4 pb-4 border-b border-[#E2E8F0]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#171F2C] tracking-tight">
                  Proposals
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Review received inquiries and track sent proposals across your institutional deal network.
                </p>
              </div>

              {/* Dynamic KPI Strip based on active tab */}
              <div className="flex items-center gap-3">
                {activeTab === "received" ? (
                  <>
                    <div className="px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-[4px] flex items-center gap-2.5 shadow-xs">
                      <Inbox className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-[#64748B] font-medium">Total Received:</span>
                      <span className="text-xs font-bold text-[#171F2C] font-mono">{incomingRequests.length}</span>
                    </div>
                    <div className="px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-[4px] flex items-center gap-2.5 shadow-xs">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-xs text-[#64748B] font-medium">Awaiting Review:</span>
                      <span className="text-xs font-bold text-[#171F2C] font-mono">{pendingIncomingCount}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-[4px] flex items-center gap-2.5 shadow-xs">
                      <Send className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-[#64748B] font-medium">Total Sent:</span>
                      <span className="text-xs font-bold text-[#171F2C] font-mono">{sentRequests.length}</span>
                    </div>
                    <div className="px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-[4px] flex items-center gap-2.5 shadow-xs">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-[#64748B] font-medium">In Motion:</span>
                      <span className="text-xs font-bold text-[#171F2C] font-mono">{activeSentCount}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Filter Tabs & Search Bar (Only Received and Sent tabs) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <ExecutiveTabs
                variant="pill"
                activeTab={activeTab}
                onTabChange={(tabId) => handleTabChange(tabId as "received" | "sent")}
                tabs={[
                  { id: "received", label: "Received", count: incomingRequests.length },
                  { id: "sent", label: "Sent", count: sentRequests.length },
                ]}
              />

              {/* Search Box */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-white border border-[#E2E8F0] w-full sm:w-80 focus-within:border-[#171F2C] transition-colors shadow-xs">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search proposals, counterparties, terms..."
                  className="w-full bg-transparent text-xs text-[#171F2C] placeholder:text-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="w-full py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#171F2C]" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Loading {activeTab === "received" ? "Received" : "Sent"} Proposals...
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {/* ═══════════════════════════════════════════════════════════
                  SECTION 1: RECEIVED PROPOSALS / INBOUND PITCHES
                  ═══════════════════════════════════════════════════════════ */}
              {activeTab === "received" && (
                <section className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-display text-lg font-bold text-[#171F2C]">
                        Received Proposals
                      </h2>
                      <span className="px-2 py-0.5 rounded-[4px] bg-slate-100 border border-slate-200 text-[#171F2C] text-xs font-mono font-medium">
                        {incomingRequests.length} Total • {pendingIncomingCount} Awaiting Review
                      </span>
                    </div>
                  </div>

                  {filteredIncoming.length === 0 ? (
                    <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-8 text-center flex flex-col items-center justify-center gap-2 shadow-xs">
                      <Inbox className="w-8 h-8 text-slate-300 mb-1" />
                      <h3 className="font-display font-semibold text-sm text-[#171F2C]">
                        No Inbound Proposals Found
                      </h3>
                      <p className="text-xs text-[#64748B] max-w-sm">
                        {searchQuery
                          ? "No received proposals matched your search query."
                          : "When other verified businesses pitch on your active listings, their bilateral proposals will appear here."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredIncoming.map((req: any) => {
                        const companyName =
                          req.requesting_business?.company_name ||
                          req.requesting_business?.name ||
                          "Confidential Enterprise";
                        const isPending = req.status === "pending";
                        const isAccepted = req.status === "accepted";
                        const contactEmail =
                          req.requesting_business?.contact_email ||
                          req.requesting_business?.owner?.email;

                        return (
                          <div
                            key={req.id}
                            className="bg-white border border-[#E2E8F0] hover:border-[#171F2C] rounded-[4px] p-5 flex flex-col justify-between gap-4 shadow-xs transition-colors duration-200"
                          >
                            <div className="flex flex-col gap-3">
                              {/* Top Bar */}
                              <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono">
                                <span className="uppercase tracking-wider font-semibold text-slate-400">
                                  Your Listing
                                </span>
                                <span>{formatDistance(req.created_at)}</span>
                              </div>

                              {/* Listing Title */}
                              <h3 className="font-display font-semibold text-base text-[#171F2C] line-clamp-2">
                                {req.opportunity?.title || "Untitled Opportunity"}
                              </h3>

                              {/* Counterparty / Pitcher */}
                              <div className="flex items-center gap-1.5 pt-0.5">
                                <span className="text-xs text-[#64748B]">From:</span>
                                <span className="text-xs font-semibold text-[#171F2C] truncate">
                                  {companyName}
                                </span>
                                <span
                                  className="material-symbols-outlined text-[14px] text-[#059669] shrink-0"
                                  title="Verified Business"
                                >
                                  verified
                                </span>
                              </div>

                              {/* Offered Terms / Pitch Snippet */}
                              <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#171F2C] leading-relaxed">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-semibold block mb-1">
                                  Offered Terms:
                                </span>
                                <p className="line-clamp-3 whitespace-pre-line text-slate-700">
                                  {req.message || "Reciprocal exchange proposal submitted."}
                                </p>
                              </div>

                              {/* Status Badge (if not pending) */}
                              {!isPending && (
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-xs text-[#64748B]">Status:</span>
                                  {getStatusBadge(req.status)}
                                </div>
                              )}

                              {/* Unlocked Direct Contact if Accepted */}
                              {isAccepted && contactEmail && (
                                <div className="p-2.5 rounded-[4px] bg-emerald-50/70 border border-emerald-200 text-xs flex flex-col gap-1">
                                  <div className="flex items-center gap-1 text-emerald-800 font-semibold text-[11px] uppercase tracking-wide">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Direct Contact Unlocked</span>
                                  </div>
                                  <a
                                    href={`mailto:${contactEmail}`}
                                    className="text-emerald-900 font-mono text-[11px] hover:underline break-all"
                                  >
                                    {contactEmail}
                                  </a>
                                </div>
                              )}
                            </div>

                            {/* Actions for Received Proposals across all stages */}
                            <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
                              {/* Primary Row: Accept / Decline / View */}
                              <div className="flex items-center gap-2">
                                {isPending ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedProposalForModal(req);
                                        setModalType("accept");
                                      }}
                                      className="flex-1 py-2 px-3 rounded-[4px] bg-[#171F2C] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedProposalForModal(req);
                                        setModalType("decline");
                                      }}
                                      className="flex-1 py-2 px-3 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] text-[#64748B] hover:text-[#171F2C] text-xs font-semibold transition-colors cursor-pointer text-center"
                                    >
                                      Decline
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedProposalForModal(req);
                                        setModalType("detail");
                                      }}
                                      className="p-2 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] text-[#64748B] hover:text-[#171F2C] transition-colors cursor-pointer"
                                      title="View Full Pitch"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                  </>
                                ) : isAccepted ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedProposalForModal(req);
                                        setModalType("detail");
                                      }}
                                      className="flex-1 py-2 px-3 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] text-[#171F2C] text-xs font-semibold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>View Details</span>
                                    </button>
                                    <Link
                                      to="/my-relay"
                                      className="flex-1 py-2 px-3 rounded-[4px] bg-[#171F2C] hover:bg-black text-white text-xs font-semibold transition-colors text-center inline-flex items-center justify-center gap-1"
                                    >
                                      <span>Exchange</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedProposalForModal(req);
                                      setModalType("detail");
                                    }}
                                    className="w-full py-2 px-3 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] text-[#171F2C] text-xs font-semibold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>View Proposal Details</span>
                                  </button>
                                )}
                              </div>

                              {/* Secondary Row: Full-Width Proposal History button */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (req.opportunity?.id) {
                                    setHistoryOpportunity({
                                      id: req.opportunity.id,
                                      title: req.opportunity.title,
                                      opportunity_number: req.opportunity.opportunity_number,
                                    });
                                  }
                                }}
                                className="w-full py-1.5 px-3 rounded-[4px] bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-medium transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                              >
                                <div className="flex items-center gap-1.5">
                                  <History className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800 transition-colors" />
                                  <span className="font-semibold text-slate-800 text-[11px]">Proposal History</span>
                                </div>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-[3px] text-[9px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-300/80">
                                  PRO
                                </span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              )}

              {/* ═══════════════════════════════════════════════════════════
                  SECTION 2: SENT PROPOSALS / OUTBOUND DISPATCHED
                  ═══════════════════════════════════════════════════════════ */}
              {activeTab === "sent" && (
                <section className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-display text-lg font-bold text-[#171F2C]">
                        Sent Proposals
                      </h2>
                      <span className="px-2 py-0.5 rounded-[4px] bg-slate-100 border border-slate-200 text-[#171F2C] text-xs font-mono font-medium">
                        {sentRequests.length} Total • {activeSentCount} In Motion
                      </span>
                    </div>
                  </div>

                  {filteredSent.length === 0 ? (
                    <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-8 text-center flex flex-col items-center justify-center gap-2 shadow-xs">
                      <Send className="w-8 h-8 text-slate-300 mb-1" />
                      <h3 className="font-display font-semibold text-sm text-[#171F2C]">
                        No Outbound Proposals
                      </h3>
                      <p className="text-xs text-[#64748B] max-w-sm mb-2">
                        {searchQuery
                          ? "No sent proposals matched your search query."
                          : "Explore the Opportunity Board to pitch your services and reciprocal margin deals."}
                      </p>
                      <Link
                        to="/opportunities"
                        className="px-4 py-2 rounded-[4px] bg-[#171F2C] hover:bg-black text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Browse Opportunity Board</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="w-full bg-white rounded-[4px] border border-[#E2E8F0] overflow-x-auto shadow-xs">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] text-[11px] font-mono uppercase tracking-wider">
                            <th className="py-3 px-4 font-semibold">Target Opportunity</th>
                            <th className="py-3 px-4 font-semibold">Counterparty</th>
                            <th className="py-3 px-4 font-semibold">Proposed Terms</th>
                            <th className="py-3 px-4 font-semibold">Status</th>
                            <th className="py-3 px-4 text-right font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0] text-xs">
                          {filteredSent.map((req: any) => {
                            const targetCompany =
                              req.opportunity?.business?.company_name ||
                              req.opportunity?.company ||
                              "Verified Partner";
                            const isPending = req.status === "pending";
                            const isAccepted = req.status === "accepted";

                            return (
                              <tr
                                key={req.id}
                                className="hover:bg-[#F8FAFC] transition-colors"
                              >
                                <td className="py-3.5 px-4 align-middle font-semibold text-[#171F2C] max-w-xs">
                                  <div className="truncate" title={req.opportunity?.title}>
                                    {req.opportunity?.title || "Untitled Opportunity"}
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 align-middle">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-[#171F2C] truncate max-w-[180px]">
                                      {targetCompany}
                                    </span>
                                    <span
                                      className="material-symbols-outlined text-[14px] text-[#059669] shrink-0"
                                      title="Verified Partner"
                                    >
                                      verified
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 align-middle text-[#64748B] max-w-sm">
                                  <div className="line-clamp-1 truncate" title={req.message}>
                                    {req.message || "Standard reciprocal terms pitch"}
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 align-middle">
                                  {getStatusBadge(req.status)}
                                </td>
                                <td className="py-3.5 px-4 align-middle text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedProposalForModal(req);
                                        setModalType("detail");
                                      }}
                                      className="px-3 py-1 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] text-[#64748B] hover:text-[#171F2C] text-xs font-semibold transition-colors cursor-pointer"
                                    >
                                      View
                                    </button>

                                    {isPending && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedProposalForModal(req);
                                          setModalType("withdraw");
                                        }}
                                        className="px-2.5 py-1 rounded-[4px] bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                                        title="Withdraw Proposal"
                                      >
                                        Withdraw
                                      </button>
                                    )}

                                    {isAccepted && (
                                      <Link
                                        to="/my-relay"
                                        className="px-3 py-1 rounded-[4px] bg-[#171F2C] hover:bg-black text-white text-xs font-semibold transition-colors inline-flex items-center gap-1"
                                      >
                                        <span>Exchange</span>
                                        <ArrowRight className="w-3 h-3" />
                                      </Link>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          DETAIL PROPOSAL VIEW DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={modalType === "detail" && !!selectedProposalForModal}
        onOpenChange={(open) => {
          if (!open) {
            setModalType(null);
            setSelectedProposalForModal(null);
          }
        }}
      >
        <DialogContent className="max-w-xl bg-white border border-[#E2E8F0] p-6 rounded-[4px] shadow-xl">
          <DialogHeader>
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Proposal Mandate
              </span>
              {activeProposalDetail && getStatusBadge(activeProposalDetail.status)}
            </div>
            <DialogTitle className="font-display font-bold text-lg text-[#171F2C]">
              {activeProposalDetail?.opportunity?.title || "Opportunity Proposal"}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#64748B]">
              Created {activeProposalDetail ? formatDistance(activeProposalDetail.created_at) : ""}
            </DialogDescription>
          </DialogHeader>

          {loadingDetail ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#171F2C]" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Loading Proposal Details...
              </span>
            </div>
          ) : activeProposalDetail && (
            <div className="space-y-4 pt-2">
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Counterparty Institution
                </span>
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[#171F2C]">
                  <span>
                    {activeProposalDetail.requesting_business?.company_name ||
                      activeProposalDetail.opportunity?.business?.company_name ||
                      activeProposalDetail.opportunity?.company ||
                      "Verified Syndicate"}
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-[#059669]">
                    verified
                  </span>
                </div>
              </div>

              {/* If accepted, show unlocked contact details */}
              {activeProposalDetail.status === "accepted" &&
                (activeProposalDetail.requesting_business?.contact_email ||
                  activeProposalDetail.opportunity?.business?.contact_email) && (
                  <div className="p-3 rounded-[4px] bg-emerald-50 border border-emerald-200 text-xs flex flex-col gap-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Direct Contact Email
                    </span>
                    <span className="font-mono text-emerald-900 font-semibold text-xs break-all">
                      {activeProposalDetail.requesting_business?.contact_email ||
                        activeProposalDetail.opportunity?.business?.contact_email}
                    </span>
                  </div>
                )}

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  Full Proposal Pitch & Commercial Terms
                </span>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto">
                  {activeProposalDetail.message || "No custom pitch provided."}
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-[4px] text-[11px] text-[#64748B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Protected by Relay Zero-Knowledge Bilateral Escrow & Mutual Non-Circumvention.
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => {
                setModalType(null);
                setSelectedProposalForModal(null);
              }}
              className="px-4 py-2 rounded-[4px] bg-[#171F2C] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════════════════
          ACCEPT PROPOSAL CONFIRMATION DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={modalType === "accept" && !!selectedProposalForModal}
        onOpenChange={(open) => {
          if (!open) {
            setModalType(null);
            setSelectedProposalForModal(null);
          }
        }}
      >
        <DialogContent className="max-w-md bg-white border border-[#E2E8F0] p-6 rounded-[4px] shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-[#171F2C]">
              Accept Inbound Proposal?
            </DialogTitle>
            <DialogDescription className="text-xs text-[#64748B] pt-1 leading-relaxed">
              Accepting will execute the initial mutual handshake, unblind verified contact details,
              and initiate the Bilateral Dealroom exchange workflow.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setModalType(null);
                setSelectedProposalForModal(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#171F2C] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={acceptMutation.isPending}
              onClick={() => {
                if (selectedProposalForModal) {
                  acceptMutation.mutate({ interestId: selectedProposalForModal.id });
                }
              }}
              className="px-5 py-2 rounded-[4px] bg-[#171F2C] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {acceptMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Confirm & Accept</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════════════════
          DECLINE PROPOSAL CONFIRMATION DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={modalType === "decline" && !!selectedProposalForModal}
        onOpenChange={(open) => {
          if (!open) {
            setModalType(null);
            setSelectedProposalForModal(null);
          }
        }}
      >
        <DialogContent className="max-w-md bg-white border border-[#E2E8F0] p-6 rounded-[4px] shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-[#171F2C]">
              Decline Proposal?
            </DialogTitle>
            <DialogDescription className="text-xs text-[#64748B] pt-1 leading-relaxed">
              Are you sure you want to decline this proposal? The counterparty will be respectfully notified.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setModalType(null);
                setSelectedProposalForModal(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#171F2C] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={declineMutation.isPending}
              onClick={() => {
                if (selectedProposalForModal) {
                  declineMutation.mutate({ interestId: selectedProposalForModal.id });
                }
              }}
              className="px-5 py-2 rounded-[4px] bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {declineMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Confirm Decline</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════════════════
          WITHDRAW PROPOSAL CONFIRMATION DIALOG
          ═══════════════════════════════════════════════════════════════════ */}
      <Dialog
        open={modalType === "withdraw" && !!selectedProposalForModal}
        onOpenChange={(open) => {
          if (!open) {
            setModalType(null);
            setSelectedProposalForModal(null);
          }
        }}
      >
        <DialogContent className="max-w-md bg-white border border-[#E2E8F0] p-6 rounded-[4px] shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-[#171F2C]">
              Withdraw Proposal?
            </DialogTitle>
            <DialogDescription className="text-xs text-[#64748B] pt-1 leading-relaxed">
              Are you sure you want to cancel and withdraw this proposal pitch?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setModalType(null);
                setSelectedProposalForModal(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#171F2C] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={withdrawMutation.isPending}
              onClick={() => {
                if (selectedProposalForModal) {
                  withdrawMutation.mutate({
                    interestId: selectedProposalForModal.id,
                    opportunityId: selectedProposalForModal.opportunity_id,
                  });
                }
              }}
              className="px-5 py-2 rounded-[4px] bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {withdrawMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Confirm Withdrawal</span>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════════════════════════
          PROPOSAL HISTORY & DEAL INTELLIGENCE SIDE SHEET (PRO TIER)
          ═══════════════════════════════════════════════════════════════════ */}
      <ProposalHistorySheet
        open={!!historyOpportunity}
        onOpenChange={(open) => {
          if (!open) setHistoryOpportunity(null);
        }}
        opportunityId={historyOpportunity?.id || null}
        opportunityTitle={historyOpportunity?.title}
        opportunityNumber={historyOpportunity?.opportunity_number}
        onViewProposalDetail={(proposal) => {
          setSelectedProposalForModal(proposal);
          setModalType("detail");
        }}
      />
    </div>
  );
}
