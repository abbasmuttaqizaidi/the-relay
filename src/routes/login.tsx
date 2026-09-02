import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { SignIn, useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useMemo } from "react";
import { ShieldCheck, ArrowLeft, ArrowRight, Star, Users, Briefcase, Loader2 } from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => search,
  beforeLoad: async ({ search }) => {
    // If Clerk OAuth params are present, allow page mount so Clerk SDK can process ticket
    const hasClerkParam = Object.keys(search || {}).some(
      (k) => k.startsWith("__clerk") || k === "status" || k === "created_session_id"
    );
    if (hasClerkParam) {
      return;
    }

    // If no OAuth params, check if already authenticated on server
    try {
      const authData = await checkOnboardingStatus();
      if (authData?.isAuthenticated) {
        throw redirect({
          to: "/opportunities",
          replace: true,
        });
      }
    } catch (err) {
      if (err && typeof err === "object" && "to" in err) {
        throw err;
      }
    }
  },
  head: () => ({
    meta: [
      { title: "Sign In — The Relay" },
      {
        name: "description",
        content:
          "Sign in to your verified operator account on The Relay B2B network.",
      },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const isReturningFromOAuth = useMemo(() => {
    // Check search params on both SSR and Client
    const searchKeys = Object.keys(search || {});
    const hasSearchClerkParam = searchKeys.some(
      (k) =>
        k.startsWith("__clerk") ||
        k === "status" ||
        k === "created_session_id" ||
        k === "redirect_url"
    );
    if (hasSearchClerkParam) return true;

    if (typeof window !== "undefined") {
      const locationSearch = window.location.search || "";
      const locationHash = window.location.hash || "";
      return (
        locationSearch.includes("__clerk") ||
        locationHash.includes("__clerk") ||
        locationSearch.includes("status=") ||
        locationSearch.includes("created_session_id") ||
        locationSearch.includes("redirect_url")
      );
    }
    return false;
  }, [search]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: "/opportunities" });
    }
  }, [isLoaded, isSignedIn, navigate]);

  // Appearance overrides to align Clerk elements with The Relay's Swiss-inspired Operator Orange aesthetic
  const clerkAppearance = {
    layout: { shadow: "none" },
    variables: {
      colorPrimary: "hsl(24 95% 45%)", // Operator Orange
      colorBackground: "white",
      colorText: "hsl(215 25% 12%)",
      colorTextSecondary: "hsl(215 25% 40%)",
      colorInputText: "hsl(215 25% 12%)",
      colorInputBackground: "hsl(210 15% 98%)",
      borderRadius: "2px", // Sharp Swiss edges
    },
    elements: {
      rootBox: "w-full shadow-none",
      card: "shadow-none border border-[#1f25301f] bg-white p-8 w-full rounded-[2px]",
      headerTitle: "text-2xl font-display font-extrabold tracking-tight text-[#111827]",
      headerSubtitle: "text-slate-500 font-sans mt-1 text-sm leading-relaxed",
      socialButtonsBlockButton:
        "rounded-[2px] border border-[#1f25301f] bg-[#fafafa] hover:bg-[#f3f3f3] transition-all h-12 shadow-none font-mono text-xs uppercase tracking-wider text-slate-700",
      socialButtonsBlockButtonText: "font-bold tracking-wide",
      formButtonPrimary:
        "bg-[hsl(24_95%_45%)] hover:bg-orange-700 text-white rounded-[2px] h-12 text-xs font-mono font-bold uppercase tracking-widest shadow-none transition-all active:scale-[0.98]",
      formFieldInput:
        "h-12 rounded-[2px] border border-[#1f25301f] bg-slate-50 focus:bg-white focus:border-[hsl(24_95%_45%)] focus:ring-1 focus:ring-[hsl(24_95%_45%)] transition-all text-slate-800 font-mono text-sm",
      formFieldLabel:
        "text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1 ml-0.5",
      footerActionLink:
        "text-[hsl(24_95%_45%)] font-bold hover:text-orange-700 transition-colors font-mono text-xs",
      dividerLine: "bg-[#1f25300d]",
      dividerText: "text-slate-400 font-mono text-[9px] uppercase tracking-wider",
      footer: "hidden",
    },
  };

  // Dynamic conditional check
  const showLoader = isReturningFromOAuth || (isLoaded && isSignedIn);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-foreground font-sans flex flex-col justify-between selection:bg-primary selection:text-white relative">
      {/* 1. Branded Loading Screen (Shown during OAuth resolution or active session) */}
      <div
        className={`clerk-auth-loading-overlay min-h-screen flex-1 flex flex-col items-center justify-center px-6 selection:bg-primary selection:text-white ${
          showLoader ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 animate-momentum">
          <div className="relative">
            <div className="absolute -inset-4 bg-slate-900/5 rounded-full blur-xl animate-pulse" />
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="relative h-12 w-auto object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
                {isSignedIn ? "Authenticating Session" : "Completing Handshake"}
              </span>
            </div>
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest animate-pulse">
              {isSignedIn
                ? "Redirecting to opportunities feed..."
                : "Verifying credentials with Google..."}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Content (Split Layout - Hidden during OAuth resolution) */}
      <main
        className={`clerk-auth-layout flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-1.5 pb-12 md:py-20 ${
          showLoader ? "opacity-0 pointer-events-none absolute -top-[9999px] -left-[9999px]" : ""
        }`}
      >
        <div className="mb-1.5 md:mb-6">
          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Side: Modern Editorial Brand Banner */}
          <section className="lg:col-span-6 space-y-8 animate-momentum order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 rounded-[1px] text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> Hand-Vetted B2B Network
              </div>
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-slate-900">
                Where growth <br />
                finds <span className="italic text-primary">momentum</span>.
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[48ch]">
                Sign in to access the operator-grade, curated business opportunity exchange.
                Review inbound pitches, post referral swaps, or coordinate channel partnerships.
              </p>
            </div>

            {/* Key Value Propositions */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-[#1f253012]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#111827]">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Double Opt-In
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Connect only when both businesses accept. Zero cold calls, zero unwanted messaging.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#111827]">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Reciprocity Engine
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Express interest, establish connections, and boost your trust scores automatically.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#111827]">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Operator Vetting
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Manual domain verification checks preserve a high-trust network ecosystem.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#111827]">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Secure RLS
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your data is protected by secondary Row Level Security policies at all layers.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>Don't have an account yet?</span>
              <Link
                to="/signup"
                className="text-primary hover:text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"
              >
                Apply for Vetting <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Right Side: Centered Clerk SignIn Container */}
          <section className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2">
            <div className="max-w-md w-full">
              <SignIn
                routing="path"
                path="/login"
                signUpUrl="/signup"
                forceRedirectUrl="/opportunities"
                appearance={clerkAppearance}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Modern Compact Footer */}
      <footer className="py-8 border-t border-[#1f253012] text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
        <span>© 2026 The Relay Protocol · Double Opt-In Verified B2B Network</span>
      </footer>
    </div>
  );
}
