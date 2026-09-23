import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  X,
  Lock,
  Unlock,
  MessageSquare,
  Building2,
  MapPin,
  Calendar,
  ArrowRight,
  Shield,
  Activity,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getSentRequests } from "../functions/getSentRequests";
import { withdrawInterest } from "../functions/withdrawInterest";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { ReciprocityBadge } from "@/components/reciprocity-badge";
import { createPrivateMeta } from "@/lib/seo";
import { ExecutiveTabs } from "@/design-system";

export const Route = createFileRoute("/requests/sent")({
  head: () => ({
    meta: createPrivateMeta("Sent Requests — The Relay"),
  }),
  component: SentRequestsPage,
});

function SentRequestsPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Onboarding Query
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

  // 2. Sent Requests Query
  const { data: requests = [], isLoading: loading } = useQuery({
    queryKey: ["sent-requests", userId],
    queryFn: async () => {
      if (!isSignedIn) return [];
      const data = await getSentRequests();
      return data || [];
    },
    enabled: Boolean(isLoaded && isSignedIn),
    staleTime: 1000 * 60, // 1 minute
  });

  // Withdraw Mutation
  const withdrawMutation = useMutation({
    mutationFn: async ({ interestId, opportunityTitle }: { interestId: string; opportunityTitle: string }) => {
      await withdrawInterest({ data: { interest_id: interestId } });
    },
    onSuccess: (_data, { interestId, opportunityTitle }) => {
      toast.success("Interest request withdrawn successfully", {
        description: `You withdrew your interest in "${opportunityTitle}".`,
      });
      queryClient.invalidateQueries({ queryKey: ["sent-requests", userId] });

      const localStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
      const req = requests.find((r: any) => r.id === interestId);
      if (req) {
        delete localStore[req.opportunity_id];
        localStorage.setItem("relay.interest.v1", JSON.stringify(localStore));
        window.dispatchEvent(new Event("relay:interest"));
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to withdraw request.");
    },
  });

  const handleWithdraw = (interestId: string, opportunityTitle: string) => {
    withdrawMutation.mutate({ interestId, opportunityTitle });
  };

  const formatDistance = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col overflow-x-hidden w-full max-w-full">

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-6 pb-8 md:py-12">
        {/* Title Section */}
        <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div id="requests-header-info" className="space-y-1.5">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Interest Requests
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-2xl">
              Track requests you have sent to other businesses expressing interest in their opportunities.
            </p>
          </div>

          {/* Sub Navigation Tabs using Design System */}
          <div id="requests-tabs-row" className="w-full md:w-auto">
            <ExecutiveTabs
              variant="pill"
              activeTab="sent"
              onTabChange={(tabId) => {
                if (tabId === "incoming") navigate({ to: "/requests/incoming" });
              }}
              tabs={[
                {
                  id: "incoming",
                  label: "Incoming",
                },
                {
                  id: "sent",
                  label: "Sent",
                  count: requests.length,
                },
              ]}
            />
          </div>
        </div>

        {/* Loading State */}
        <div id="requests-list-container">
          {loading ? (
          <div className="flex flex-col items-center justify-center py-20 border border-slate-200/80 bg-white rounded-[4px] shadow-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-950 border-t-transparent mb-4"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Loading requests...
            </span>
          </div>
        ) : requests.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-6 border border-slate-200/80 bg-white rounded-[4px] shadow-sm text-center">
            <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 mb-4">
              <Activity className="w-5 h-5 animate-pulse text-orange-500" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              No Sent Requests
            </h3>
            <p className="text-sm text-slate-500 max-w-md mt-1 mb-6 leading-relaxed">
              When you express interest in opportunities posted by other verified businesses on the network, they will appear here.
            </p>
            <Link
              to="/opportunities"
              className="inline-flex bg-slate-900 text-white px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest hover:bg-slate-800 transition-all rounded-[2px] shadow-sm hover:shadow font-bold"
            >
              Browse Opportunities <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        ) : (
          /* Requests Grid */
          <div className="grid grid-cols-1 gap-6">
            {requests.map((req) => {
              const isPending = req.status === "pending";
              const isAccepted = req.status === "accepted";
              const isDeclined = req.status === "declined";
              const isWithdrawn = req.status === "withdrawn";

              const targetBusiness = req.opportunity.business;
              const isConnected = isAccepted;

              return (
                <div
                  key={req.id}
                  className={`border rounded-[4px] p-5 sm:p-6 transition-all duration-200 bg-white shadow-sm hover:shadow-md ${
                    isPending
                      ? "border-slate-200"
                      : isAccepted
                        ? "border-emerald-500/30 border-l-[4px] border-l-emerald-500"
                        : "border-slate-200/60 opacity-85"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-display font-extrabold text-lg text-slate-900">
                          {isConnected ? targetBusiness.company_name : (req.opportunity.hide_company_name ? "Confidential Business" : targetBusiness.company_name)}
                        </span>
                        
                        <span className="font-mono text-[9px] text-slate-400 font-medium">
                          Sent {formatDistance(req.created_at)}
                        </span>

                        {/* Status Badges */}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] border border-amber-100">
                            Pending Review
                          </span>
                        )}
                        {isAccepted && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-600 text-white text-[9px] font-mono font-bold uppercase tracking-widest rounded-[2px] shadow-2xs">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Handshake Complete
                          </span>
                        )}
                        {isDeclined && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-mono font-bold uppercase tracking-widest rounded-[2px]">
                            <X className="w-2.5 h-2.5" /> Declined
                          </span>
                        )}
                        {isWithdrawn && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-mono font-bold uppercase tracking-widest rounded-[2px]">
                            Withdrawn
                          </span>
                        )}
                      </div>

                      {/* Associated Opportunity Box */}
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                            Opportunity Title
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {req.opportunity.title}
                          </span>
                        </div>
                        <Link
                          to="/opportunities"
                          search={{ q: req.opportunity.opportunity_number }}
                          className="font-mono text-[9.5px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors font-bold underline flex items-center self-start sm:self-auto"
                        >
                          View Listing <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </div>

                      {/* Pitch message info */}
                      {req.message && (
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-slate-400" /> Your Pitch Message
                          </span>
                          <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-[3px] text-xs text-slate-700 font-sans italic leading-relaxed line-clamp-3">
                            &ldquo;{req.message}&rdquo;
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Actions Panel */}
                    <div className="flex flex-row lg:flex-col gap-2.5 w-full lg:w-44 shrink-0 lg:border-l lg:border-slate-100 lg:pl-6 justify-end lg:justify-center">
                      {isPending && (
                        <>
                          <Link
                            to="/connections/$id"
                            params={{ id: req.id }}
                            className="flex-1 lg:flex-none py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            Exchange Hub <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleWithdraw(req.id, req.opportunity.title)}
                            className="flex-1 lg:flex-none py-2 px-3 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 text-[9.5px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Withdraw
                          </button>
                        </>
                      )}

                      {isAccepted && (
                        <Link
                          to="/connections/$id"
                          params={{ id: req.id }}
                          className="w-full text-center py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          View Handshake <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {!isPending && !isAccepted && (
                        <div className="w-full text-center py-2.5 px-3 border border-slate-200/80 bg-slate-50/50 text-[9px] font-mono uppercase tracking-widest font-bold text-slate-400 rounded-[2px] cursor-default">
                          {isDeclined ? "Declined" : "Withdrawn"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
