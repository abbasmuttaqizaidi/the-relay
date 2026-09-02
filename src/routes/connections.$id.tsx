import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ExternalLink,
  Mail,
  Linkedin,
  Globe,
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { getRequestById } from "../functions/getRequestById";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const Route = createFileRoute("/connections/$id")({
  component: ConnectionEstablishedPage,
});

function ConnectionEstablishedPage() {
  const { id } = Route.useParams();
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [interest, setInterest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myBusinessId, setMyBusinessId] = useState<string | null>(null);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      popoverClass: "relay-tour-popover",
      steps: [
        {
          element: "#connection-header",
          popover: {
            title: "Connection Unlocked",
            description: "Dono businesses ne mutual interest accept kar liya hai, isliye direct contact details ab accessible hain.",
            side: "bottom",
            align: "center"
          }
        },
        {
          element: "#connection-cards-row",
          popover: {
            title: "Operator Profiles",
            description: "Requester aur Listing Owner ke verification badge, LinkedIn profile, aur core domains check karein.",
            side: "top",
            align: "center"
          }
        },
        {
          element: "#connection-cta-box",
          popover: {
            title: "Initiate Communication",
            description: "Yahan click karke direct email thread open karein aur platform se bahar collaborate karna shuru karein.",
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
    window.addEventListener("relay:start-tour:connection", handleTourEvent);
    return () => {
      window.removeEventListener("relay:start-tour:connection", handleTourEvent);
    };
  }, []);

  const loadInterest = async () => {
    try {
      setLoading(true);
      const data = await getRequestById({ data: { interest_id: id } });
      if (data.status !== "accepted") {
        toast.error("Contact details for this introduction are not unlocked yet.");
        navigate({ to: "/opportunities", replace: true });
        return;
      }
      setInterest(data);
    } catch (err: any) {
      console.error("Failed to load connection details:", err);
      toast.error(err.message || "Failed to load connection details.");
      navigate({ to: "/opportunities", replace: true });
    } finally {
      setLoading(false);
    }
  };

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
        loadInterest();
      }
    });
  }, [isLoaded, isSignedIn, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-950 border-t-transparent mx-auto"></div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
            Establishing Connection Details...
          </span>
        </div>
      </div>
    );
  }

  if (!interest) return null;

  const requestingBusiness = interest.requesting_business;
  const ownerBusiness = interest.opportunity.business;

  const requestingEmail = requestingBusiness.contact_email || requestingBusiness.owner?.email || "";
  const ownerEmail = ownerBusiness.contact_email || ownerBusiness.owner?.email || "";

  // Pre-formatted external mailto link combining both contact emails
  const mailtoLink = `mailto:${requestingEmail},${ownerEmail}?subject=The Relay: Connection established between ${requestingBusiness.company_name} and ${ownerBusiness.company_name}&body=Hi team,%0D%0A%0D%0AWe established a mutual interest connection on The Relay regarding opportunity "${interest.opportunity.title}".%0D%0A%0D%0ALet's continue our conversation here.%0D%0A%0D%0ABest regards,`;

  const backRoute = myBusinessId === requestingBusiness.id ? "/requests/sent" : "/requests/incoming";

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col">

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-8 md:py-16 flex flex-col items-center">
        {/* Breadcrumb Back */}
        <div className="w-full mb-4 md:mb-6">
          <Link
            to={backRoute}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Requests
          </Link>
        </div>

        {/* Banner */}
        <div id="connection-header" className="w-full text-center space-y-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest font-extrabold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Connection Established
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">
            Introduction Active
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed px-2">
            Both operators have verified mutual interest. Direct channels are now unlocked for external communication.
          </p>
        </div>

        {/* Two Columns: Business Profiles */}
        <div id="connection-cards-row" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mb-8 md:mb-12">
          {/* Business A - Requesting */}
          <div className="bg-white border border-slate-200/80 rounded-[4px] p-5 sm:p-8 space-y-5 shadow-sm relative">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                  {requestingBusiness.industry} · {requestingBusiness.hq_location || "Global"}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-1.5 flex-wrap">
                  {requestingBusiness.company_name}
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                </h2>
              </div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold border border-slate-100 px-2 py-0.5 rounded-[2px] shrink-0 mt-0.5">
                Requester
              </div>
            </div>
            
            {requestingBusiness.description && (
              <p className="text-xs text-slate-500 leading-relaxed font-sans border-t border-slate-100/60 pt-4">
                {requestingBusiness.description}
              </p>
            )}

            <div className="border-t border-slate-100 pt-4 space-y-3.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-slate-50 gap-1.5 sm:gap-4">
                <span className="text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                  <Globe className="w-3.5 h-3.5" /> Website
                </span>
                <a
                  href={`https://${requestingBusiness.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:text-primary hover:underline flex items-center gap-1 font-mono break-all text-left sm:text-right self-start sm:self-auto max-w-full"
                >
                  {requestingBusiness.website} <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {requestingBusiness.linkedin_url && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-slate-50 gap-1.5 sm:gap-4">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </span>
                  <a
                    href={requestingBusiness.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-primary hover:underline flex items-center gap-1 text-left sm:text-right self-start sm:self-auto break-all max-w-full"
                  >
                    View Profile <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1.5 sm:gap-4">
                <span className="text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                  <Mail className="w-3.5 h-3.5" /> Email
                </span>
                <a
                  href={`mailto:${requestingEmail}`}
                  className="font-mono font-bold hover:text-primary hover:underline text-slate-900 break-all text-left sm:text-right self-start sm:self-auto max-w-full"
                >
                  {requestingEmail || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* Business B - Owner */}
          <div className="bg-white border border-slate-200/80 rounded-[4px] p-5 sm:p-8 space-y-5 shadow-sm relative">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                  {ownerBusiness.industry} · {ownerBusiness.hq_location || "Global"}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-1.5 flex-wrap">
                  {ownerBusiness.company_name}
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                </h2>
              </div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold border border-slate-100 px-2 py-0.5 rounded-[2px] shrink-0 mt-0.5">
                Listing Owner
              </div>
            </div>

            {ownerBusiness.description && (
              <p className="text-xs text-slate-500 leading-relaxed font-sans border-t border-slate-100/60 pt-4">
                {ownerBusiness.description}
              </p>
            )}

            <div className="border-t border-slate-100 pt-4 space-y-3.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-slate-50 gap-1.5 sm:gap-4">
                <span className="text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                  <Globe className="w-3.5 h-3.5" /> Website
                </span>
                <a
                  href={`https://${ownerBusiness.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:text-primary hover:underline flex items-center gap-1 font-mono break-all text-left sm:text-right self-start sm:self-auto max-w-full"
                >
                  {ownerBusiness.website} <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {ownerBusiness.linkedin_url && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-slate-50 gap-1.5 sm:gap-4">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </span>
                  <a
                    href={ownerBusiness.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-primary hover:underline flex items-center gap-1 text-left sm:text-right self-start sm:self-auto break-all max-w-full"
                  >
                    View Profile <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 gap-1.5 sm:gap-4">
                <span className="text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                  <Mail className="w-3.5 h-3.5" /> Email
                </span>
                <a
                  href={`mailto:${ownerEmail}`}
                  className="font-mono font-bold hover:text-primary hover:underline text-slate-900 break-all text-left sm:text-right self-start sm:self-auto max-w-full"
                >
                  {ownerEmail || "N/A"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div id="connection-cta-box" className="w-full bg-slate-900 border border-slate-800 p-5 sm:p-8 rounded-[4px] text-center text-white space-y-6">
          <div className="space-y-1.5 max-w-xl mx-auto">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold">
              [ DIRECT HANDOFF ACTIONS ]
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold">
              Ready to collaborate?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans px-2">
              Click the button below to draft an email thread with both company contact addresses. Continue your conversation and negotiate deals outside Relay.
            </p>
          </div>

          <div className="flex justify-center w-full px-2">
            <a
              href={mailtoLink}
              className="inline-flex w-full sm:w-auto bg-white text-slate-950 px-6 py-3 text-[10px] font-mono uppercase tracking-widest hover:bg-slate-200 transition-all rounded-[2px] shadow-sm hover:shadow font-bold items-center justify-center gap-2"
            >
              Continue Conversation Externally <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
