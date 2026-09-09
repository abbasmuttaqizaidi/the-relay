import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ExternalLink,
  Mail,
  Globe,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { getRequestById } from "../functions/getRequestById";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";

export const Route = createFileRoute("/connections/$id")({
  component: HandshakeDetailPage,
});

function HandshakeDetailPage() {
  const { id } = Route.useParams();
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [interest, setInterest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myBusinessId, setMyBusinessId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadInterest = async () => {
    try {
      setLoading(true);
      const data = await getRequestById({ data: { interest_id: id } });
      if (data.status !== "accepted") {
        toast.error("Handshake details are only available once the interest request is accepted.");
        navigate({ to: "/opportunities", replace: true });
        return;
      }
      setInterest(data);
    } catch (err: any) {
      console.error("Failed to load handshake details:", err);
      toast.error(err.message || "Failed to load handshake details.");
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

  const handleCopyEmail = (email: string) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-950 border-t-transparent mx-auto"></div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
            Loading Handshake Details...
          </span>
        </div>
      </div>
    );
  }

  if (!interest) return null;

  const isOwner = myBusinessId === interest.opportunity.business_id;
  const connectedBusiness = isOwner ? interest.requesting_business : interest.opportunity.business;
  const myBusiness = isOwner ? interest.opportunity.business : interest.requesting_business;
  const connectedEmail = connectedBusiness.contact_email || connectedBusiness.owner?.email || "";
  const opp = interest.opportunity;

  // Navigation back route based on user's role in this interest
  const backRoute = isOwner ? "/requests/incoming" : "/requests/sent";

  // Pre-formatted external mailto link for direct communication
  const mailtoSubject = encodeURIComponent(
    `The Relay Handshake: ${connectedBusiness.company_name} & ${myBusiness?.company_name || "Partner"} — ${opp.title}`,
  );
  const mailtoBody = encodeURIComponent(
    `Hi ${connectedBusiness.company_name} team,\n\nWe connected on The Relay regarding the opportunity "${opp.title}".\n\nLet's continue the conversation here.\n\nBest regards,\n${myBusiness?.company_name || ""}`,
  );
  const mailtoLink = `mailto:${connectedEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col">
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col space-y-6">
        {/* Navigation Bar & Status */}
        <div className="flex items-center justify-between gap-3">
          <Link
            to={backRoute}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to{" "}
            {isOwner ? "Incoming Requests" : "Sent Requests"}
          </Link>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
              isOwner
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                : "bg-blue-50 text-blue-700 border border-blue-200/80"
            }`}
          >
            {isOwner ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Accepted by you
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-blue-600" /> Sent by you · Accepted
              </>
            )}
          </span>
        </div>

        {/* 1. Partner Profile & Direct Contact Card */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 shadow-xs space-y-5">
          {/* Header & Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {connectedBusiness.company_name}
              </h1>
              {connectedBusiness.status === "approved" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold uppercase tracking-wider rounded border border-emerald-100">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                </span>
              )}
            </div>

            {/* Quick Details Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
              {connectedBusiness.industry && (
                <span className="font-medium text-slate-700">{connectedBusiness.industry}</span>
              )}

              {connectedBusiness.hq_location && (
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{connectedBusiness.hq_location}</span>
                </div>
              )}

              {connectedBusiness.website && (
                <a
                  href={`https://${connectedBusiness.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-700 hover:text-primary hover:underline inline-flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{connectedBusiness.website}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
            </div>

            {connectedBusiness.description && (
              <p className="text-xs text-slate-600 leading-relaxed pt-2">
                {connectedBusiness.description}
              </p>
            )}
          </div>

          {/* Unlocked Contact Box (Clean, light, integrated) */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-md p-3.5 sm:p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-800">Direct Contact Unlocked</span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Reach out to continue the conversation
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <div className="flex-1 flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded text-xs font-mono text-slate-800">
                <span className="truncate select-all">{connectedEmail || "Email unavailable"}</span>
                {connectedEmail && (
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(connectedEmail)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 font-sans font-medium pl-2 shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {connectedEmail ? (
                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded transition-colors shrink-0 cursor-pointer shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email {connectedBusiness.company_name}
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-200 text-slate-400 text-xs font-medium rounded cursor-not-allowed"
                >
                  Email Unavailable
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Opportunity & Strategic Pitch Card */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 shadow-xs space-y-5">
          {/* Opportunity Header */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Opportunity Context
              </span>
              {opp.opportunity_number && (
                <span className="font-mono text-[10px] text-slate-400 uppercase font-medium">
                  #{opp.opportunity_number}
                </span>
              )}
            </div>

            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
              {opp.title}
            </h2>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                {opp.category}
              </span>
              {opp.industry && (
                <span className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                  {opp.industry}
                </span>
              )}
              {opp.location && (
                <span className="text-xs px-2.5 py-0.5 bg-slate-50 text-slate-600 rounded font-medium border border-slate-200/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {opp.location}
                </span>
              )}
            </div>
          </div>

          {/* Opportunity Description */}
          <div className="space-y-1 text-xs">
            <span className="text-slate-400 font-medium block">Opportunity Brief</span>
            <p className="text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
              {opp.description}
            </p>
          </div>

          {opp.offer_text && (
            <div className="space-y-1 text-xs pt-3 border-t border-slate-100">
              <span className="text-slate-400 font-medium block">Terms / Offer</span>
              <p className="text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded border border-slate-100">
                {opp.offer_text}
              </p>
            </div>
          )}

          {/* Pitch Submitted */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-800">
                {isOwner ? `Pitch from ${connectedBusiness.company_name}` : "Your Submitted Pitch"}
              </span>
              <span className="text-[11px] text-slate-400">
                {isOwner ? "Accepted by you" : "Accepted by partner"}
              </span>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/70 p-3.5 rounded-md">
              {interest.message && interest.message.trim() ? (
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed italic whitespace-pre-wrap select-all">
                  &ldquo;{interest.message}&rdquo;
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic font-sans">
                  No additional pitch message was provided.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
