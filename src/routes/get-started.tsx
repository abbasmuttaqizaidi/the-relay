import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-react-start";
import { useState, useEffect } from "react";
import { Building2, User, ArrowRight, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { setUserAccountType } from "../functions/communityProfile";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

export const Route = createFileRoute("/get-started")({
  beforeLoad: async () => {
    try {
      const status = await checkOnboardingStatus();
      if (!status?.isAuthenticated) {
        throw redirect({ to: "/login", replace: true });
      }

      // If onboarding is already completed, route directly to the active surface
      if (status.onboardingCompleted) {
        throw redirect({
          to: status.hasBusiness ? "/opportunities" : "/profile",
          replace: true,
        });
      }

      // If user has already chosen a role but left midway through onboarding, route back to finish it
      if (status.hasChosenRole) {
        if (status.userType === "business" && !status.hasBusiness) {
          throw redirect({ to: "/onboarding", replace: true });
        }
        if (status.userType === "community_member") {
          throw redirect({ to: "/profile", replace: true });
        }
      }
    } catch (err) {
      if (err && typeof err === "object" && "to" in err) {
        throw err;
      }
    }
  },
  head: () => ({
    meta: [
      { title: "Get Started — The Relay" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GetStartedPage,
});

function GetStartedPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"business" | "community_member" | null>(null);
  const [loading, setLoading] = useState(false);

  // Client-side verification guard
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkOnboardingStatus()
        .then((status) => {
          if (status?.onboardingCompleted) {
            navigate({ to: status.hasBusiness ? "/opportunities" : "/profile", replace: true });
          } else if (status?.hasChosenRole) {
            if (status.userType === "business" && !status.hasBusiness) {
              navigate({ to: "/onboarding", replace: true });
            } else if (status.userType === "community_member") {
              navigate({ to: "/profile", replace: true });
            }
          }
        })
        .catch(() => {});
    }
  }, [isLoaded, isSignedIn, navigate]);

  // Handle insights comment author signup auto-selection if indicated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingContributor = sessionStorage.getItem("relay_pending_contributor_onboarding");
      if (pendingContributor) {
        sessionStorage.removeItem("relay_pending_contributor_onboarding");
        handleSelectRole("community_member");
      }
    }
  }, []);

  const handleSelectRole = async (role: "business" | "community_member") => {
    if (loading) return;
    setSelectedRole(role);
    setLoading(true);

    try {
      await setUserAccountType({ data: { type: role } });

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("relay_account_mode", role);
        } catch {}
      }

      if (role === "business") {
        navigate({ to: "/onboarding" });
      } else {
        navigate({ to: "/profile" });
      }
    } catch (err: any) {
      console.error("[GetStarted] Role selection error:", err);
      toast.error(err?.message || "Failed to initialize role. Please try again.");
      setLoading(false);
      setSelectedRole(null);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-6 h-6 animate-spin text-slate-800" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] md:min-h-[calc(100dvh-4rem)] w-full bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-slate-900 selection:text-white">
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Brand Logo */}
        <div className="mb-6 sm:mb-8">
          <img
            src={logoUrl}
            alt="The Relay"
            className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply opacity-90"
          />
        </div>

        {/* Minimal Instruction (No big headings) */}
        <div className="space-y-2 mb-8 sm:mb-10 max-w-md">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
            Account Setup
          </span>
          <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-950 pt-1">
            How would you like to participate?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Choose your primary account type. You can switch or connect profiles later.
          </p>
        </div>

        {/* 2-Option Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
          {/* Card 1: Verified Business */}
          <button
            type="button"
            onClick={() => handleSelectRole("business")}
            disabled={loading}
            className={`group relative flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-200 cursor-pointer ${
              selectedRole === "business"
                ? "border-slate-950 ring-2 ring-slate-950 shadow-lg"
                : "border-slate-200 hover:border-slate-900 hover:shadow-xl hover:shadow-slate-900/5"
            }`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-200 flex items-center justify-center text-slate-900">
                {loading && selectedRole === "business" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Company / Agency / Founder
                </div>
                <div className="text-base sm:text-lg font-display font-bold text-slate-950">
                  Verified Business
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  Exchange commercial partnerships, monetize unserviceable leads, and connect in private bilateral dealrooms.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
              <span>{loading && selectedRole === "business" ? "Preparing..." : "Continue as Business"}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Community Member */}
          <button
            type="button"
            onClick={() => handleSelectRole("community_member")}
            disabled={loading}
            className={`group relative flex flex-col justify-between text-left p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-200 cursor-pointer ${
              selectedRole === "community_member"
                ? "border-slate-950 ring-2 ring-slate-950 shadow-lg"
                : "border-slate-200 hover:border-slate-900 hover:shadow-xl hover:shadow-slate-900/5"
            }`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-200 flex items-center justify-center text-slate-900">
                {loading && selectedRole === "community_member" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Individual Contributor
                </div>
                <div className="text-base sm:text-lg font-display font-bold text-slate-950">
                  Community Member
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  Participate in operator advisory, share tactical knowledge playbooks, and build peer reputation.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
              <span>{loading && selectedRole === "community_member" ? "Preparing..." : "Continue as Contributor"}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Quiet footer reassurance */}
        <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mt-8">
          Enterprise verification &amp; KYC required for commercial exchanges
        </p>
      </main>
    </div>
  );
}
