import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ExternalLink,
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
} from "lucide-react";
import { getSentRequests } from "../functions/getSentRequests";
import { withdrawInterest } from "../functions/withdrawInterest";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { useReciprocity } from "@/lib/interest-store";

export const Route = createFileRoute("/requests/sent")({
  component: SentRequestsPage,
});

function ReciprocityBadge({ className }: { className?: string }) {
  const { score } = useReciprocity();
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-[10px] text-slate-600 font-bold ${className}`}
    >
      <Activity className="w-3.5 h-3.5 text-orange-500" />
      <span>Reciprocity: {score}</span>
    </div>
  );
}

function SentRequestsPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await getSentRequests();
      setRequests(data || []);
    } catch (err: any) {
      console.error("Failed to load sent requests:", err);
      toast.error("Failed to load sent requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        navigate({ to: "/signup", replace: true });
      } else {
        checkOnboardingStatus().then((status) => {
          if (status.isAuthenticated && !status.hasBusiness) {
            navigate({ to: "/onboarding", replace: true });
          } else {
            loadRequests();
          }
        });
      }
    }
  }, [isLoaded, isSignedIn]);

  const handleWithdraw = async (interestId: string, opportunityTitle: string) => {
    try {
      await withdrawInterest({ data: { interest_id: interestId } });
      toast.success("Interest request withdrawn successfully", {
        description: `You withdrew your interest in "${opportunityTitle}".`,
      });
      loadRequests();
      // Sync localStorage store
      const localStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
      const req = requests.find((r) => r.id === interestId);
      if (req) {
        delete localStore[req.opportunity_id];
        localStorage.setItem("relay.interest.v1", JSON.stringify(localStore));
        window.dispatchEvent(new Event("relay:interest"));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to withdraw request.");
    }
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
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-10">
            <Link to="/home" className="flex items-center gap-2 group">
              <span className="font-display font-extrabold text-lg tracking-tight group-hover:text-primary transition-colors">
                THE RELAY
              </span>
            </Link>
            <div className="hidden md:flex gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
              <Link
                to="/opportunities"
                activeProps={{ className: "text-slate-900 border-b-2 border-slate-900" }}
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                Opportunities
              </Link>
              <Link
                to="/opportunities/my"
                activeProps={{ className: "text-slate-900 border-b-2 border-slate-900" }}
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                My Opportunities
              </Link>
              <Link
                to="/requests/incoming"
                activeProps={{ className: "text-slate-900 border-b-2 border-slate-900" }}
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                Requests
              </Link>
              <span className="opacity-40 cursor-not-allowed">Network</span>
              <span className="opacity-40 cursor-not-allowed">Intelligence</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <ReciprocityBadge className="hidden md:flex" />
            <NotificationsDropdown />
            <UserAvatarDropdown />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Title Section */}
        <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
              [ OUTBOUND HANDSHAKES REVIEW ]
            </span>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Interest Requests
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-2xl">
              Track requests you have sent to other businesses expressing interest in their opportunities.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-[4px] border border-slate-200 font-mono text-[9.5px] uppercase tracking-wider font-bold">
            <Link
              to="/requests/incoming"
              className="px-4 py-2 text-slate-500 hover:text-slate-800 transition-colors"
            >
              Incoming
            </Link>
            <Link
              to="/requests/sent"
              className="px-4 py-2 bg-white text-slate-900 border border-slate-200/50 shadow-sm rounded-[2px]"
            >
              Sent ({requests.length})
            </Link>
          </div>
        </div>

        {/* Loading State */}
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
              className="inline-flex bg-slate-900 text-white px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow font-bold"
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
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500 text-white text-[9px] font-mono font-bold uppercase tracking-widest rounded-[2px]">
                            <Unlock className="w-2.5 h-2.5" /> Accepted & Unlocked
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
                        <div className="space-y-1">
                          <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                            Your Pitch Message
                          </span>
                          <p className="text-xs text-slate-600 bg-slate-50/80 border border-slate-100 p-3.5 rounded-[2px] italic leading-relaxed max-w-3xl">
                            &ldquo;{req.message}&ldquo;
                          </p>
                        </div>
                      )}

                      {/* Contact Reveal Box */}
                      {isConnected && (
                        <div className="border border-emerald-500/20 bg-emerald-50/20 p-4 rounded-[2px] space-y-3.5 max-w-3xl animate-momentum">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-700 font-bold block border-b border-emerald-500/10 pb-1">
                            [ Connection Contact Details Unlocked ]
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans">
                            <div className="space-y-0.5">
                              <span className="text-slate-400 text-[10px]">Website</span>
                              <a
                                href={`https://${targetBusiness.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-slate-900 hover:text-primary hover:underline flex items-center gap-1"
                              >
                                {targetBusiness.website} <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            {targetBusiness.linkedin_url && (
                              <div className="space-y-0.5">
                                <span className="text-slate-400 text-[10px]">LinkedIn</span>
                                <a
                                  href={targetBusiness.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-slate-900 hover:text-primary hover:underline flex items-center gap-1"
                                >
                                  Company Profile <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                            <div className="space-y-0.5">
                              <span className="text-slate-400 text-[10px]">Contact Email</span>
                              <a
                                href={`mailto:${targetBusiness.contact_email || "N/A"}`}
                                className="font-mono font-bold text-slate-900 hover:text-primary hover:underline"
                              >
                                {targetBusiness.contact_email || "N/A"}
                              </a>
                            </div>
                          </div>
                          {targetBusiness.description && (
                            <div className="space-y-1 pt-1.5 border-t border-emerald-500/10">
                              <span className="text-slate-400 text-[10px] block">Company Description</span>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {targetBusiness.description}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions Panel */}
                    <div className="flex flex-row lg:flex-col gap-2.5 w-full lg:w-44 shrink-0 lg:border-l lg:border-slate-100 lg:pl-6 justify-end lg:justify-center">
                      {isPending && (
                        <button
                          onClick={() => handleWithdraw(req.id, req.opportunity.title)}
                          className="flex-1 lg:flex-none py-2.5 px-4 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Withdraw
                        </button>
                      )}

                      {isAccepted && (
                        <Link
                          to="/connections/$id"
                          params={{ id: req.id }}
                          className="w-full text-center py-2.5 px-4 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          View Connection <ArrowRight className="w-3.5 h-3.5" />
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
      </main>
    </div>
  );
}
