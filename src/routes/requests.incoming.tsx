import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { toast } from "sonner";
import {
  Check,
  X,
  Lock,
  Unlock,
  MessageSquare,
  Building2,
  MapPin,
  Calendar,
  Activity,
  ArrowLeft,
  ArrowRight,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { getIncomingRequests } from "../functions/getIncomingRequests";
import { acceptInterest } from "../functions/acceptInterest";
import { declineInterest } from "../functions/declineInterest";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { ReciprocityBadge } from "@/components/reciprocity-badge";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

export const Route = createFileRoute("/requests/incoming")({
  component: IncomingRequestsPage,
});

function IncomingRequestsPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [incomingCount, setIncomingCount] = useState(0);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      popoverClass: "relay-tour-popover",
      steps: [
        {
          element: "#requests-header-info",
          popover: {
            title: "Handshake Pitches",
            description: "Yahan dusre businesses ke partners dwara aapki listing par bheje gaye pitch details review kar sakte hain.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#requests-tabs-row",
          popover: {
            title: "Incoming & Outbound Requests",
            description: "Inbound handshakes aur outbound pitch status sheets ke beech switch karne ke liye request links toggle karein.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#requests-list-container",
          popover: {
            title: "Pitches List",
            description: "Yahan pitch messages aur verification levels list hote hain. Pitches check karke aap interest Accept ya Decline kar sakte hain.",
            side: "top",
            align: "center"
          }
        }
      ]
    });
    driverObj.drive();
  };

  useEffect(() => {
    const handleTourEvent = () => startTour();
    window.addEventListener("relay:start-tour:requests", handleTourEvent);
    return () => {
      window.removeEventListener("relay:start-tour:requests", handleTourEvent);
    };
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await getIncomingRequests();
      setRequests(data || []);
      setIncomingCount((data || []).filter((r: any) => r.status === "pending").length);
    } catch (err: any) {
      console.error("Failed to load incoming requests:", err);
      toast.error("Failed to load incoming requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    // Safety timeout to clear loading screen after 3.5 seconds if network/Clerk hangs
    const safetyTimeout = setTimeout(() => {
      if (active) {
        console.warn("[Incoming Requests] Onboarding verification safety timeout triggered.");
        loadRequests();
      }
    }, 3500);

    async function verifyAndLoad() {
      if (!isLoaded) return;

      const proceedWithStatus = (status: any) => {
        if (!active) return;
        if (status.isAuthenticated && !status.hasBusiness) {
          clearTimeout(safetyTimeout);
          navigate({ to: "/onboarding", replace: true });
        } else {
          clearTimeout(safetyTimeout);
          loadRequests();
        }
      };

      if (isSignedIn) {
        try {
          const status = await checkOnboardingStatus();
          if (!active) return;
          if (status.isAuthenticated) {
            proceedWithStatus(status);
            return;
          }
        } catch (err) {
          console.error("Error verifying onboarding in incoming requests:", err);
          clearTimeout(safetyTimeout);
          loadRequests();
          return;
        }
      }

      // 2. Secondary check: If returning from OAuth callback, do NOT redirect to /login
      const isOAuthHandshake =
        typeof window !== "undefined" &&
        (window.location.search.includes("__clerk") ||
          window.location.hash.includes("__clerk") ||
          window.location.search.includes("status=") ||
          window.location.search.includes("created_session_id") ||
          window.location.search.includes("redirect_url"));

      if (isOAuthHandshake) {
        return;
      }

      // 3. Fallback server session check
      try {
        const status = await checkOnboardingStatus();
        if (!active) return;
        if (status.isAuthenticated) {
          proceedWithStatus(status);
          return;
        }
      } catch (err) {
        console.error("Fallback onboarding check error in incoming requests:", err);
      }

      clearTimeout(safetyTimeout);
      navigate({ to: "/login", replace: true });
    }

    verifyAndLoad();

    return () => {
      active = false;
      clearTimeout(safetyTimeout);
    };
  }, [isLoaded, isSignedIn, navigate]);

  const handleAccept = async (interestId: string, companyName: string) => {
    try {
      await acceptInterest({ data: { interest_id: interestId } });
      toast.success("Handshake Complete", {
        description: `You’ve been introduced to ${companyName} regarding this opportunity.`,
      });
      loadRequests();
      // Sync localStorage store
      const localStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
      // Find the request locally and update it
      const req = requests.find((r) => r.id === interestId);
      if (req) {
        localStore[req.opportunity_id] = {
          id: req.id,
          status: "accepted",
          pitch: req.message || "",
          requestedAt: req.created_at,
          respondedAt: new Date().toISOString(),
          contact: {
            name: req.requesting_business.company_name,
            role: "Owner",
            email: req.requesting_business.contact_email || req.requesting_business.owner?.email || "",
            website: req.requesting_business.website || "",
            linkedin: req.requesting_business.linkedin_url || "",
            description: req.requesting_business.description || "",
          },
        };
        localStorage.setItem("relay.interest.v1", JSON.stringify(localStore));
        window.dispatchEvent(new Event("relay:interest"));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to accept interest.");
    }
  };

  const handleDecline = async (interestId: string, companyName: string) => {
    try {
      await declineInterest({ data: { interest_id: interestId } });
      toast.success("Interest declined successfully", {
        description: `You declined the request from ${companyName}.`,
      });
      loadRequests();
      // Sync localStorage store
      const localStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
      const req = requests.find((r) => r.id === interestId);
      if (req) {
        localStore[req.opportunity_id] = {
          id: req.id,
          status: "declined",
          pitch: req.message || "",
          requestedAt: req.created_at,
          respondedAt: new Date().toISOString(),
        };
        localStorage.setItem("relay.interest.v1", JSON.stringify(localStore));
        window.dispatchEvent(new Event("relay:interest"));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to decline interest.");
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
      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-1.5 pb-8 md:py-12">
        {/* Breadcrumb Back */}
        <div className="mb-1.5 md:mb-6">
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Feed
          </Link>
        </div>

        {/* Title Section */}
        <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div id="requests-header-info" className="space-y-1.5">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Interest Requests
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-2xl">
              Review introduction pitches sent by other approved businesses to partner, refer, or trade on your posted opportunities.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div id="requests-tabs-row" className="w-full md:w-auto flex gap-1.5 bg-slate-100 p-1 rounded-[4px] border border-slate-200 font-mono text-[9.5px] uppercase tracking-wider font-bold">
            <Link
              to="/requests/incoming"
              className="flex-1 md:flex-initial text-center px-4 py-2 bg-white text-slate-900 border border-slate-200/50 shadow-sm rounded-[2px]"
            >
              Incoming ({requests.length})
            </Link>
            <Link
              to="/requests/sent"
              className="flex-1 md:flex-initial text-center px-4 py-2 text-slate-500 hover:text-slate-800 transition-colors"
            >
              Sent
            </Link>
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
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              No Incoming Requests
            </h3>
            <p className="text-sm text-slate-500 max-w-md mt-1 mb-6 leading-relaxed">
              When other businesses express interest in your active listings, you will receive notifications and review details here.
            </p>
            <Link
              to="/opportunities/my"
              className="inline-flex bg-slate-900 text-white px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow font-bold"
            >
              Manage My Listings <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
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

              return (
                <div
                  key={req.id}
                  className={`border rounded-[4px] p-5 sm:p-6 transition-all duration-200 bg-white shadow-sm hover:shadow-md ${isPending
                    ? "border-slate-200"
                    : isAccepted
                      ? "border-emerald-500/30 border-l-[4px] border-l-emerald-500"
                      : "border-slate-200/60 opacity-80"
                    }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-display font-extrabold text-lg text-slate-900">
                          {isPending || isWithdrawn ? "Confidential Business" : req.requesting_business.company_name}
                        </span>

                        {req.requesting_business.status === "approved" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] border border-emerald-100">
                            <Shield className="w-2.5 h-2.5" /> Approved
                          </span>
                        )}

                        <span className="font-mono text-[9px] text-slate-400 font-medium">
                          Submitted {formatDistance(req.created_at)}
                        </span>

                        {/* Status Badges */}
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

                      {/* Target Opportunity Meta */}
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                            Target Opportunity
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

                      {/* Request Message/Pitch Context */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-slate-400" /> Pitch Context
                        </span>
                        <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-[3px] text-xs text-slate-700 font-sans italic leading-relaxed line-clamp-3">
                          &ldquo;{req.message || "No pitch message provided."}&rdquo;
                        </div>
                      </div>

                    </div>

                    {/* Actions Panel */}
                    {!isAccepted && (
                      <div className="flex flex-row lg:flex-col gap-2.5 w-full lg:w-44 shrink-0 lg:border-l lg:border-slate-100 lg:pl-6 justify-end lg:justify-center">
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleAccept(req.id, req.requesting_business.company_name)}
                              className="flex-1 lg:flex-none py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-950/20"
                            >
                              <Check className="w-3.5 h-3.5" /> Accept
                            </button>
                            <button
                              onClick={() => handleDecline(req.id, req.requesting_business.company_name)}
                              className="flex-1 lg:flex-none py-2.5 px-4 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" /> Decline
                            </button>
                          </>
                        )}

                        {!isPending && (
                          <div className="w-full text-center py-2.5 px-3 border border-slate-200/80 bg-slate-50/50 text-[9px] font-mono uppercase tracking-widest font-bold text-slate-400 rounded-[2px] cursor-default">
                            {isDeclined ? "Declined" : "Withdrawn"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Full-width View Handshake Button at bottom */}
                  {isAccepted && (
                    <div className="pt-4 mt-2 border-t border-slate-100">
                      <Link
                        to="/connections/$id"
                        params={{ id: req.id }}
                        className="w-full text-center py-3 px-4 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow"
                      >
                        View Handshake <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
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
