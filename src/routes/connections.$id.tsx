import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { isSigningOutActive } from "@/lib/logout";
import { useEffect, useCallback, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { executiveToast, exchangeActivityBus, showExchangeActivityModal } from "@/design-system";
import { ArrowLeft } from "lucide-react";
import { getExchangeDetails } from "@/functions/getExchangeDetails";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { ExchangeWorkflow } from "@/components/exchange/ExchangeWorkflow";
import { createPrivateMeta } from "@/lib/seo";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseClientConfig } from "@/functions/getSupabaseClientConfig";

export const Route = createFileRoute("/connections/$id")({
  head: () => ({
    meta: createPrivateMeta("Connection Details — The Relay"),
  }),
  component: HandshakeDetailPage,
});

function HandshakeDetailPage() {
  const { id } = Route.useParams();
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: onboardingData } = useQuery({
    queryKey: ["onboarding-status", userId],
    queryFn: async () => {
      return await checkOnboardingStatus();
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 3,
  });

  const myBusinessId = onboardingData?.business?.id || null;
  const myBusinessIdRef = useRef(myBusinessId);
  myBusinessIdRef.current = myBusinessId;

  const {
    data: exchangeData,
    isLoading: loading,
  } = useQuery({
    queryKey: ["exchange-details", id],
    queryFn: async () => {
      try {
        return await getExchangeDetails({ data: { interest_id: id } });
      } catch (err: any) {
        console.error("Failed to load exchange details:", err);
        executiveToast.danger("Failed to load exchange details", {
          description: err.message || "Could not retrieve exchange details.",
        });
        navigate({ to: "/opportunities", replace: true });
        return null;
      }
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 0,
    refetchInterval: 4000,
    refetchOnWindowFocus: true,
  });

  const exchangeDataRef = useRef(exchangeData);
  exchangeDataRef.current = exchangeData;

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["exchange-details", id] });
  }, [queryClient, id]);

  // Real-time Event Subscriptions: Activity Bus + Window Events + Supabase WebSocket
  useEffect(() => {
    if (!isSignedIn || !id) return;

    // 1. Listen to Global Exchange Activity Bus (triggered when notifications arrive)
    const unsubscribeBus = exchangeActivityBus.subscribe((activityData) => {
      // If notification belongs to this connection or in general, refresh terms immediately
      if (!activityData.interestId || activityData.interestId === id) {
        handleRefresh();
      }
    });

    // 2. Custom window event listeners
    window.addEventListener("relay:interest", handleRefresh);
    window.addEventListener("relay:refresh", handleRefresh);

    let activeChannel: any = null;
    const setupRealtime = async () => {
      try {
        const config = await getSupabaseClientConfig();
        if (!config.supabaseUrl || !config.supabaseAnonKey) return;

        const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

        activeChannel = supabase
          .channel(`connection-live-${id}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "exchange_proposals",
              filter: `interest_id=eq.${id}`,
            },
            (payload: any) => {
              handleRefresh();
              if (!payload?.new) return;
              const newProp = payload.new;
              const oldProp = payload.old;
              const currentMyBizId = myBusinessIdRef.current;
              const currentData = exchangeDataRef.current;
              const partnerName = currentData?.target_business?.company_name || "Counterparty Partner";
              const oppTitle = currentData?.opportunity?.title || "Bilateral Exchange";

              if (payload.eventType === "UPDATE") {
                // 1. Accepted: if this user was the proposer and partner accepted it
                if (newProp.status === "accepted" && oldProp?.status !== "accepted") {
                  if (currentMyBizId && newProp.proposing_business_id === currentMyBizId) {
                    showExchangeActivityModal({
                      eventType: "agreement_ready",
                      stageNum: 3,
                      title: "Proposal Accepted — Agreement Ready",
                      description: `${partnerName} accepted your proposal terms! An agreement has been drafted.`,
                      partnerName,
                      opportunityTitle: oppTitle,
                      interestId: id,
                      details: newProp.exchange_details || (newProp.revenue_percentage ? `${newProp.revenue_percentage}% Revenue Share` : undefined),
                    });
                  }
                }
                // 2. Declined: if this user was the proposer and partner declined it
                else if (newProp.status === "declined" && oldProp?.status !== "declined") {
                  if (currentMyBizId && newProp.proposing_business_id === currentMyBizId) {
                    showExchangeActivityModal({
                      eventType: "proposal_declined",
                      stageNum: 2,
                      title: "Proposal Declined",
                      description: `${partnerName} declined your exchange proposal. You can review their notes and submit revised terms.`,
                      partnerName,
                      opportunityTitle: oppTitle,
                      interestId: id,
                      details: newProp.additional_terms || newProp.decline_note || (newProp.decline_reason ? `Reason: ${newProp.decline_reason.replace(/_/g, " ")}` : undefined),
                    });
                  }
                }
                // 3. Withdrawn: if partner withdrew their proposal, notify the receiver
                else if (newProp.status === "cancelled" && oldProp?.status !== "cancelled") {
                  if (currentMyBizId && newProp.receiving_business_id === currentMyBizId) {
                    showExchangeActivityModal({
                      eventType: "proposal_withdrawn",
                      stageNum: 2,
                      title: "Proposal Withdrawn by Partner",
                      description: `${partnerName} withdrew their exchange proposal. You can draft and submit new bilateral terms whenever you are ready.`,
                      partnerName,
                      opportunityTitle: oppTitle,
                      interestId: id,
                    });
                  }
                }
              } else if (payload.eventType === "INSERT") {
                // 3. Counter-Offer or New Proposal from partner
                if (currentMyBizId && newProp.proposing_business_id !== currentMyBizId) {
                  showExchangeActivityModal({
                    eventType: "proposal_received",
                    stageNum: 2,
                    title: newProp.version > 1 ? "Counter-Proposal Received" : "New Exchange Proposal Received",
                    description: `${partnerName} sent ${newProp.version > 1 ? `a counter-proposal (Round 0${newProp.version})` : "a proposal"} for your review.`,
                    partnerName,
                    opportunityTitle: oppTitle,
                    interestId: id,
                    details: newProp.exchange_details || (newProp.revenue_percentage ? `${newProp.revenue_percentage}% Revenue Share` : undefined),
                  });
                }
              }
            }
          )
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "exchange_agreements",
              filter: `interest_id=eq.${id}`,
            },
            () => {
              handleRefresh();
            }
          )
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "interests",
              filter: `id=eq.${id}`,
            },
            () => {
              handleRefresh();
            }
          )
          .subscribe();
      } catch (err) {
        console.error("Failed to initialize connection realtime channel:", err);
      }
    };

    setupRealtime();

    return () => {
      unsubscribeBus();
      window.removeEventListener("relay:interest", handleRefresh);
      window.removeEventListener("relay:refresh", handleRefresh);
      if (activeChannel) {
        activeChannel.unsubscribe();
      }
    };
  }, [isSignedIn, id, handleRefresh]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      if (isSigningOutActive()) return;
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

  if (isLoaded && !isSignedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-900 mx-auto" />
      </div>
    );
  }

  if (loading && !exchangeData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-900 mx-auto"></div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
            Loading Exchange Hub...
          </span>
        </div>
      </div>
    );
  }

  if (!exchangeData || !myBusinessId) return null;

  const isOwner = exchangeData.is_owner;
  const backRoute = isOwner ? "/requests/incoming" : "/requests/sent";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full max-w-full overflow-x-hidden">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-16 md:pt-6 md:pb-24 flex flex-col space-y-6">
        {/* Exchange Workflow Hub */}
        <ExchangeWorkflow
          data={exchangeData}
          myBusinessId={myBusinessId}
          onRefresh={handleRefresh}
        />
      </main>
    </div>
  );
}
