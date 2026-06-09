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
} from "lucide-react";
import { getRequestById } from "../functions/getRequestById";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";

export const Route = createFileRoute("/connections/$id")({
  component: ConnectionEstablishedPage,
});

function ConnectionEstablishedPage() {
  const { id } = Route.useParams();
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [interest, setInterest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    if (isLoaded) {
      if (!isSignedIn) {
        navigate({ to: "/signup", replace: true });
      } else {
        checkOnboardingStatus().then((status) => {
          if (status.isAuthenticated && !status.hasBusiness) {
            navigate({ to: "/onboarding", replace: true });
          } else {
            loadInterest();
          }
        });
      }
    }
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

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col">
      {/* Header */}
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
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                Opportunities
              </Link>
              <Link
                to="/opportunities/my"
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                My Opportunities
              </Link>
              <Link
                to="/requests/incoming"
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                Requests
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <NotificationsDropdown />
            <UserAvatarDropdown />
          </div>
        </div>
      </nav>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-10 md:py-16 flex flex-col items-center">
        {/* Banner */}
        <div className="w-full text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest font-extrabold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Connection Established
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Introduction Active
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Both operators have verified mutual interest. Direct channels are now unlocked for external communication.
          </p>
        </div>

        {/* Two Columns: Business Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
          {/* Business A - Requesting */}
          <div className="bg-white border border-slate-200/80 rounded-[4px] p-6 sm:p-8 space-y-6 shadow-sm relative">
            <div className="absolute top-6 right-6 font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold border border-slate-100 px-2 py-0.5 rounded-[2px]">
              Requester
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                  {requestingBusiness.industry} · {requestingBusiness.hq_location || "Global"}
                </span>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 flex items-center gap-1.5">
                  {requestingBusiness.company_name}
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </h2>
              </div>

              {requestingBusiness.description && (
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {requestingBusiness.description}
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Website</span>
                <a
                  href={`https://${requestingBusiness.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:text-primary hover:underline flex items-center gap-1 font-mono"
                >
                  {requestingBusiness.website} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {requestingBusiness.linkedin_url && (
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</span>
                  <a
                    href={requestingBusiness.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-primary hover:underline flex items-center gap-1"
                  >
                    View Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</span>
                <a
                  href={`mailto:${requestingEmail}`}
                  className="font-mono font-bold hover:text-primary hover:underline text-slate-900"
                >
                  {requestingEmail || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* Business B - Owner */}
          <div className="bg-white border border-slate-200/80 rounded-[4px] p-6 sm:p-8 space-y-6 shadow-sm relative">
            <div className="absolute top-6 right-6 font-mono text-[8px] uppercase tracking-wider text-slate-400 font-bold border border-slate-100 px-2 py-0.5 rounded-[2px]">
              Listing Owner
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                  {ownerBusiness.industry} · {ownerBusiness.hq_location || "Global"}
                </span>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 flex items-center gap-1.5">
                  {ownerBusiness.company_name}
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </h2>
              </div>

              {ownerBusiness.description && (
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {ownerBusiness.description}
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Website</span>
                <a
                  href={`https://${ownerBusiness.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:text-primary hover:underline flex items-center gap-1 font-mono"
                >
                  {ownerBusiness.website} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {ownerBusiness.linkedin_url && (
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</span>
                  <a
                    href={ownerBusiness.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-primary hover:underline flex items-center gap-1"
                  >
                    View Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</span>
                <a
                  href={`mailto:${ownerEmail}`}
                  className="font-mono font-bold hover:text-primary hover:underline text-slate-900"
                >
                  {ownerEmail || "N/A"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[4px] text-center text-white space-y-6">
          <div className="space-y-1.5 max-w-xl mx-auto">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold">
              [ DIRECT HANDOFF ACTIONS ]
            </span>
            <h3 className="font-display text-xl font-bold">
              Ready to collaborate?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Click the button below to draft an email thread with both company contact addresses. Continue your conversation and negotiate deals outside Relay.
            </p>
          </div>

          <a
            href={mailtoLink}
            className="inline-flex bg-white text-slate-950 px-6 py-3 text-[10px] font-mono uppercase tracking-widest hover:bg-slate-200 transition-all rounded-[2px] shadow-sm hover:shadow font-bold items-center gap-2"
          >
            Continue Conversation Externally <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>
    </div>
  );
}
