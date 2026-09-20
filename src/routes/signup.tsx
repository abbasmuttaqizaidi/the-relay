import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { SignUp, useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useMemo } from "react";
import { ArrowRight, Loader2, ShieldCheck, EyeOff, Handshake } from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";

export const Route = createFileRoute("/signup")({
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
      { title: "Apply for Access — The Relay" },
      {
        name: "description",
        content:
          "Trade commercial value without cold outreach. Apply for institutional membership on The Relay.",
      },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const isReturningFromOAuth = useMemo(() => {
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

  // Appearance overrides strictly following sign_up.MD & Monochrome Executive design tokens
  const clerkAppearance = {
    layout: {
      shadow: "none",
      socialButtonsVariant: "blockButton" as const,
      socialButtonsPlacement: "top" as const,
    },
    variables: {
      colorPrimary: "#0F172A",
      colorBackground: "white",
      colorText: "#0F172A",
      colorTextSecondary: "#64748B",
      colorInputText: "#0F172A",
      colorInputBackground: "#F8FAFC",
      borderRadius: "0.75rem",
    },
    elements: {
      rootBox: "w-full flex justify-center items-center my-0",
      card: "w-full max-w-[440px] mx-auto my-0 shadow-xl shadow-slate-900/5 border border-slate-200/80 bg-white p-5 sm:p-8 rounded-2xl flex flex-col items-center justify-center text-center",
      header: "w-full text-center flex flex-col items-center",
      headerTitle: "text-2xl font-display font-bold tracking-tight text-slate-900 text-center w-full",
      headerSubtitle: "text-slate-500 font-sans mt-1.5 text-sm leading-relaxed text-center w-full",
      socialButtonsBlockButton:
        "w-full h-12 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150 rounded-xl border border-slate-200 flex items-center justify-center px-4 shadow-xs cursor-pointer gap-3 text-[13px] font-medium text-slate-700",
      socialButtonsBlockButtonText: "text-[13px] font-medium text-slate-700 font-sans tracking-normal",
      socialButtonsProviderIcon: "w-4 h-4 shrink-0",
      dividerRow: "my-5 w-full",
      dividerLine: "bg-slate-200",
      dividerText:
        "bg-white px-3 text-[10.5px] font-semibold text-slate-400 tracking-wider uppercase font-mono",
      form: "w-full flex flex-col",
      formField: "w-full text-left",
      formFieldLabel:
        "text-xs font-semibold text-slate-700 tracking-wider uppercase mb-1.5 block font-sans",
      formFieldInput:
        "w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all font-sans",
      formButtonPrimary:
        "w-full h-12 mt-3 bg-[#0F172A] hover:bg-slate-800 active:scale-[0.99] text-white rounded-xl text-sm font-medium tracking-wide shadow-sm hover:shadow transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 font-sans font-semibold",
      footer: "w-full flex justify-center text-center",
      footerAction: "w-full flex justify-center text-center",
      footerActionLink: "text-slate-900 hover:text-slate-700 font-medium text-xs text-center",
    },
  };

  const showLoader = isReturningFromOAuth || (isLoaded && isSignedIn);

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] md:min-h-[calc(100dvh-4rem)] w-full bg-white text-slate-900 font-sans flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-slate-900 selection:text-white relative">
      {/* ─── Branded Loading Screen (OAuth Resolution) ─── */}
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 selection:bg-slate-900 selection:text-white">
          <div className="flex flex-col items-center space-y-6">
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
      )}

      {/* ─── Main Content (Strictly Centered & Responsive) ─── */}
      <main className="w-full max-w-7xl mx-auto flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center justify-items-center">
          {/* Left Column: Value Proposition & Institutional Standards (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col max-w-[680px] justify-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] lg:leading-[1.15] font-black text-slate-950 tracking-tight font-display">
              Trade commercial value without cold outreach. Apply for institutional membership.
            </h1>
            <p className="max-w-xl text-slate-600 text-base leading-relaxed font-normal">
              The Relay is an invite-only and verified network for commercial leaders. Turn unserviceable pipeline into revenue share and discover qualified distribution partners within an encrypted, bilateral dealroom.
            </p>

            {/* Three Institutional Vetting Micro-Cards */}
            <div className="space-y-3 pt-2">
              {/* Criteria 1 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-900 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-slate-800" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Criterion 01
                    </span>
                    <span className="text-slate-300 font-mono text-xs">/</span>
                    <span className="font-display text-xs font-bold text-slate-900">
                      Corporate Identity Verification
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Beneficial ownership, institutional registry checks (LEI / KYB), and verifiable executive signatory authorization required for every account.
                  </p>
                </div>
              </div>

              {/* Criteria 2 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-900 mt-0.5">
                  <EyeOff className="w-4 h-4 text-slate-800" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Criterion 02
                    </span>
                    <span className="text-slate-300 font-mono text-xs">/</span>
                    <span className="font-display text-xs font-bold text-slate-900">
                      Strict Confidentiality & Blinded Dealrooms
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No cold outreach, scraping, or indexed contact lists. Identity and client specifics remain blinded until mutual bilateral agreement is ratified.
                  </p>
                </div>
              </div>

              {/* Criteria 3 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-900 mt-0.5">
                  <Handshake className="w-4 h-4 text-slate-800" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Criterion 03
                    </span>
                    <span className="text-slate-300 font-mono text-xs">/</span>
                    <span className="font-display text-xs font-bold text-slate-900">
                      Fair Exchange Covenant
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enforceable commercial rules governing transparent revenue share covenants (10%–25%), co-selling, and direct reciprocal distribution introductions.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column Footer Prompt */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-600">
              <span>Already have an authenticated corporate account?</span>
              <Link
                to="/login"
                className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4 inline-flex items-center gap-1"
              >
                Sign In <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Centered SignUp Container */}
          <div className="w-full lg:col-span-5 flex flex-col items-center justify-center max-w-[440px] mx-auto">
            <SignUp
              routing="path"
              path="/signup"
              signInUrl="/login"
              forceRedirectUrl="/onboarding"
              appearance={clerkAppearance}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
