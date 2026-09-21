import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getExchangeDetails } from "@/functions/getExchangeDetails";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { ExchangeWorkflow } from "@/components/exchange/ExchangeWorkflow";
import { createPrivateMeta } from "@/lib/seo";

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
        toast.error(err.message || "Failed to load exchange details.");
        navigate({ to: "/opportunities", replace: true });
        return null;
      }
    },
    enabled: !!isSignedIn && isLoaded,
    staleTime: 1000 * 60 * 2,
  });

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

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["exchange-details", id] });
  };

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
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <Link
            to={backRoute}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to{" "}
            {isOwner ? "Incoming Requests" : "Sent Requests"}
          </Link>
        </div>

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
