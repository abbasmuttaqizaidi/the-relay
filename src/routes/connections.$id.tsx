import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getExchangeDetails } from "@/functions/getExchangeDetails";
import { checkOnboardingStatus } from "@/functions/checkOnboardingStatus";
import { ExchangeWorkflow } from "@/components/exchange/ExchangeWorkflow";

export const Route = createFileRoute("/connections/$id")({
  component: HandshakeDetailPage,
});

function HandshakeDetailPage() {
  const { id } = Route.useParams();
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [exchangeData, setExchangeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myBusinessId, setMyBusinessId] = useState<string | null>(null);

  const loadExchange = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getExchangeDetails({ data: { interest_id: id } });
      setExchangeData(data);
    } catch (err: any) {
      console.error("Failed to load exchange details:", err);
      toast.error(err.message || "Failed to load exchange details.");
      navigate({ to: "/opportunities", replace: true });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

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

    checkOnboardingStatus().then((status) => {
      if (status.isAuthenticated && !status.hasBusiness) {
        navigate({ to: "/onboarding", replace: true });
      } else {
        if (status.business) {
          setMyBusinessId(status.business.id);
        }
        loadExchange();
      }
    });
  }, [isLoaded, isSignedIn, loadExchange, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-950 border-t-transparent mx-auto"></div>
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
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col w-full max-w-full overflow-x-hidden">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-16 md:pt-6 md:pb-24 flex flex-col space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
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
          onRefresh={loadExchange}
        />
      </main>
    </div>
  );
}
