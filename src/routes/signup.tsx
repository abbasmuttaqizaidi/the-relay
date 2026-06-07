import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SignUp, useAuth } from "@clerk/tanstack-react-start";
import { useEffect } from "react";
import { ShieldCheck, ArrowLeft, ArrowRight, Star, Users, Briefcase } from "lucide-react";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Apply for Membership — The Relay" },
      {
        name: "description",
        content:
          "Apply for a verified operator account on The Relay. Hand-vetted, high-trust B2B network.",
      },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-foreground font-sans flex flex-col justify-between selection:bg-primary selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-[#1f25301f] bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 md:h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-10 md:h-14 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <div>
            <Link
              to="/"
              className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content (Split Layout) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-20 grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Modern Editorial Brand Banner */}
        <section className="lg:col-span-6 space-y-8 animate-momentum">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 rounded-[1px] text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Hand-Vetted B2B Network
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-slate-900">
              Where growth <br />
              finds <span className="italic text-primary">momentum</span>.
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[48ch]">
              Join an operator-grade, curated business opportunity exchange designed for verified
              founders, operators, and B2B professionals. No spam, no feeds—just warm intros and
              partnerships.
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
            <span>Already have an account?</span>
            <Link
              to="/home"
              className="text-primary hover:text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"
            >
              Sign In <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Right Side: Centered Clerk SignUp Container */}
        <section className="lg:col-span-6 flex justify-center items-center">
          <div className="max-w-md w-full">
            <SignUp
              routing="path"
              path="/signup"
              signInUrl="/home" // Under TanStack Router, our Sign In is handled by home/landing
              forceRedirectUrl="/onboarding"
              appearance={clerkAppearance}
            />
          </div>
        </section>
      </main>

      {/* Modern Compact Footer */}
      <footer className="py-8 border-t border-[#1f253012] text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
        <span>© 2026 The Relay Protocol · Double Opt-In Verified B2B Network</span>
      </footer>
    </div>
  );
}
