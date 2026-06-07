import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Show, SignInButton } from "@clerk/tanstack-react-start";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import batonImg from "@/assets/baton.jpg";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  TrendingUp,
  Zap,
  Users,
  Check,
  Activity,
  Info,
  Lock,
  Unlock,
  Sparkles,
  Share2,
  Award,
  Clock,
  ChevronRight,
  Layers,
  HelpCircle,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "The Relay — Business Opportunity Network for Verified Businesses" },
      {
        name: "description",
        content:
          "Real businesses. Real opportunities. Real growth. An operator-grade network for verified businesses to exchange partnerships, referrals, vendors and hiring.",
      },
      { property: "og:title", content: "The Relay — Where growth finds momentum" },
      {
        property: "og:description",
        content:
          "A curated network of verified businesses exchanging partnerships, referrals, vendors and growth opportunities.",
      },
    ],
  }),
  component: Landing,
});

type Opportunity = {
  id: string;
  type: string;
  company: string;
  description: string;
  meta: { label: string; value: string }[];
  trust: { label: string; value: string };
};

const opportunities: Opportunity[] = [
  {
    id: "RY-9021",
    type: "Distribution Opportunity",
    company: "Cloudstack Systems",
    description:
      "Enterprise SaaS provider looking for reseller partners in the DACH region for automation suite.",
    meta: [
      { label: "Target", value: "IT Agencies" },
      { label: "Revenue", value: "$5M – $20M" },
    ],
    trust: { label: "Trust Score", value: "Lvl 3" },
  },
  {
    id: "RY-8842",
    type: "Strategic Partnership",
    company: "Nexus Logistics",
    description:
      "Seeking integration partners for last-mile delivery API specializing in fragile e-commerce goods.",
    meta: [
      { label: "Target", value: "Shopify Plus Brands" },
      { label: "Trust Level", value: "Established" },
    ],
    trust: { label: "Verified", value: "100%" },
  },
  {
    id: "RY-8721",
    type: "Vendor Sourcing",
    company: "Solvent Health",
    description:
      "Scaling premium wellness D2C line. Need ISO-certified biodegradable mailer vendor at 10k units/mo.",
    meta: [
      { label: "Volume", value: "10k / mo" },
      { label: "Region", value: "EU Preferred" },
    ],
    trust: { label: "Trust Score", value: "Lvl 3" },
  },
];

const protocols = [
  {
    n: "01",
    title: "Referral",
    body: "Exchange qualified leads with trusted partners in complementary industries.",
    metric: "45s Avg Match",
    preview: {
      from: "Apex Marketing",
      to: "Cloud-Scale ERP",
      detail: "Warm handoff to Head of Sales looking for enterprise branding agency.",
      value: "10% Contract Commission",
    },
  },
  {
    n: "02",
    title: "Distribution",
    body: "Scale your reach by plugging into existing sales channels and reseller networks.",
    metric: "3.2d Reseller Cycle",
    preview: {
      from: "Solvent Health",
      to: "Integrity Pharma",
      detail: "Exclusive EU distribution rights for organic wellness supplement catalog.",
      value: "₹2.4M Initial Order Val",
    },
  },
  {
    n: "03",
    title: "Vendor",
    body: "Discover vetted service providers who actually deliver on enterprise requirements.",
    metric: "98% Deliverability",
    preview: {
      from: "Nexus Logistics",
      to: "BioPack India",
      detail: "ISO-9001 certified compostable mailers with customized operator branding.",
      value: "50k Units/Mo Contract",
    },
  },
  {
    n: "04",
    title: "Hiring",
    body: "Source high-level operators and specialized talent from within the ecosystem.",
    metric: "14d Avg Placement",
    preview: {
      from: "Alpha Automation",
      to: "Growth-Co Agency",
      detail: "Fractional COO experienced in scaling B2B agencies from $2M to $10M ARR.",
      value: "Part-time Retainer Contract",
    },
  },
  {
    n: "05",
    title: "Partnership",
    body: "Forge long-term strategic alliances between businesses with aligned customer bases.",
    metric: "12 Muturals / Yr",
    preview: {
      from: "FintechFlow",
      to: "LegalDocs Inc",
      detail: "API-level deep integration to auto-verify business tax registration records.",
      value: "Joint GTM Strategy Campaign",
    },
  },
  {
    n: "06",
    title: "Strategic Advice",
    body: "Tap operators who have already walked the path you are about to take.",
    metric: "24h Response Rate",
    preview: {
      from: "SaaS Scale Lab",
      to: "Pre-Seed AI Studio",
      detail: "Advisory session on structure and setup of Enterprise Pilot Contracts.",
      value: "Non-equity Operator Handoff",
    },
  },
  {
    n: "07",
    title: "Investment",
    body: "Connect with angels and operator-investors active in your sector.",
    metric: "₹4.5Cr Avg Ticket",
    preview: {
      from: "Capital Ventures",
      to: "DevOps Orchestrator",
      detail: "Seed-stage operator-led syndicates with strategic enterprise advisory.",
      value: "₹2.5Cr Tranche Allocation",
    },
  },
  {
    n: "08",
    title: "Introductions",
    body: "Warm handoffs from one verified business to another. The baton, passed cleanly.",
    metric: "94% Mutual Interest",
    preview: {
      from: "Logistics Direct",
      to: "EcoRetail Brands",
      detail: "Warm connection request to VP of Supply Chain for direct rate renegotiation.",
      value: "Baton Pass Approved",
    },
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(215_25%_12%/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(215_25%_12%/_0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <Nav />

      <main className="max-w-7xl mx-auto px-6 pt-4 pb-20 relative z-10">
        <Hero />
        <MetricStrip />
        <BatonPassSimulator />
        <ProtocolsSection />
        <Verification />
        <Reciprocity />
        {/* <Pricing /> */}
        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 md:h-18 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/home" className="flex items-center gap-2 group">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-10 md:h-14 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <div className="hidden md:flex gap-8 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            <a href="#opportunities" className="hover:text-primary transition-colors">
              Opportunities
            </a>
            <a href="#protocols" className="hover:text-primary transition-colors">
              Protocols
            </a>
            <a href="#trust" className="hover:text-primary transition-colors">
              Verification
            </a>
            <a href="#score" className="hover:text-primary transition-colors">
              Network Score
            </a>
            {/* <a href="#pricing" className="hover:text-primary transition-colors">
              Membership
            </a> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/opportunities"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest px-4 py-2 border border-border bg-card hover:border-primary hover:text-primary transition-all rounded-[2px]"
          >
            Explore Feed <ChevronRight className="w-3 h-3" />
          </Link>

          <Show when="signed-in">
            <UserAvatarDropdown />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/opportunities">
              <button className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer font-semibold">
                Sign In
              </button>
            </SignInButton>
            <Link
              to="/signup"
              className="bg-foreground text-background px-5 py-2 text-[11px] font-mono uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-[2px] shadow-sm font-semibold flex items-center justify-center"
            >
              Sign Up
            </Link>
          </Show>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="opportunities"
      className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-8 md:pt-16"
    >
      <div className="lg:col-span-5 space-y-8 animate-momentum">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold uppercase tracking-wider rounded-[2px]">
          Zero-Spam Business Network
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-[70px] font-extrabold tracking-tight text-balance leading-[0.9] text-foreground">
          Where growth finds{" "}
          <span className="text-primary italic relative">
            momentum
            <span className="absolute bottom-0 left-0 w-full h-[6px] bg-primary/10 -skew-x-12 -z-10" />
          </span>
          .
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-[45ch] text-pretty leading-relaxed">
          The Relay is an operator-grade, curated business opportunity network for verified
          businesses to exchange high-value partnerships, referrals, vendors and hiring.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            to="/opportunities"
            className="h-13 px-8 inline-flex items-center justify-center bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-all rounded-[2px] font-bold group shadow-md shadow-primary/20 border border-primary"
          >
            Enter Dashboard{" "}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex items-center gap-3 px-5 py-2.5 border border-border bg-card/50 backdrop-blur-sm rounded-[2px]">
            <div>
              <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                Active Relay Rate
              </div>
              <div className="text-sm font-display font-extrabold text-foreground">
                84.2% Passed Clean
              </div>
            </div>
          </div>
        </div>

        {/* Small Trust Seal */}
        <div className="flex items-center gap-6 pt-4 text-muted-foreground border-t border-border/50 max-w-[420px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono tracking-tight uppercase">
              100% Verified Founders
            </span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono tracking-tight uppercase">No Feeds. No Spam.</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6 animate-momentum" style={{ animationDelay: "150ms" }}>
        <div className="flex items-center justify-between px-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          <span>[ CORE PROTOCOL WORKFLOW ]</span>
          <span className="text-primary font-bold">THE BATON PASS</span>
        </div>

        {/* Feature Promo Panel Frame */}
        <div className="border border-border bg-card rounded-[2px] shadow-lg p-8 relative overflow-hidden space-y-8">
          {/* Subtle grid background for premium tech aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(215_25%_12%/_0.01)_1px,transparent_1px),linear-gradient(to_bottom,hsl(215_25%_12%/_0.01)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

          <div className="relative space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 relative">
              {/* Connecting line */}
              <div className="absolute top-8 bottom-[-32px] left-[15px] w-px border-l border-dashed border-border/80" />

              <div className="w-8 h-8 rounded-[2px] bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-xs font-bold text-primary flex-none z-10">
                01
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-base font-bold text-foreground">
                  Post Your Opportunity
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[55ch]">
                  Share exactly what you are looking for—a sales partner, a referral exchange, or a
                  verified vendor. Standard forms keep the listings clean and noise-free.
                </p>
                <div className="flex gap-2 pt-1.5 font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                  <span>[ Reseller Search ]</span>
                  <span>[ Verified Operator Only ]</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 relative">
              {/* Connecting line */}
              <div className="absolute top-8 bottom-[-32px] left-[15px] w-px border-l border-dashed border-border/80" />

              <div className="w-8 h-8 rounded-[2px] bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-xs font-bold text-primary flex-none z-10">
                02
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-base font-bold text-foreground">
                  Approve the Connection
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[55ch]">
                  If another operator wants to connect, both of you must review and accept first.
                  Direct contact info is only shared when both sides agree. Zero spam, zero noise.
                </p>
                <div className="flex items-center gap-2 pt-1.5 text-[9px] font-mono text-muted-foreground">
                  <span className="text-primary font-bold">MUTUAL APPROVAL REQUIRED</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 relative">
              <div className="w-8 h-8 rounded-[2px] bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-xs font-bold text-primary flex-none z-10">
                03
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-base font-bold text-foreground">
                  Direct Warm Introduction
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[55ch]">
                  Once matched, direct contact details (names, emails, roles) are unlocked
                  immediately so you can jump straight to outcomes.
                </p>
              </div>
            </div>
          </div>

          {/* Reciprocity Banner */}
          <div className="border-t border-border/40 pt-6 mt-6 bg-secondary/5 -mx-8 -mb-8 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                The Give-to-Get Rule
              </div>
              <p className="text-[11px] text-muted-foreground max-w-[45ch] leading-relaxed">
                To keep the community active, you earn points by responding to others or sharing
                deals. You use these points to unlock connections. No passive browsers allowed.
              </p>
            </div>
            <div className="px-4 py-2 border border-border/60 bg-card rounded-[2px] font-mono text-xs font-bold text-foreground shadow-sm flex-none">
              Active Participation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricStrip() {
  const metrics = [
    {
      label: "Total Pipeline Volume",
      value: "₹82.4 Cr",
      subtitle: "Exchanged in network",
      trend: "+14.8% MoM",
    },
    {
      label: "Verified Operators",
      value: "890 Founders",
      subtitle: "100% manual review",
      trend: "Zero spam",
    },
    {
      label: "Baton Handoffs",
      value: "4,240 Passes",
      subtitle: "Introductions accepted",
      trend: "84.2% rate",
    },
    {
      label: "Network Score Speed",
      value: "3.4 Hrs Avg",
      subtitle: "Response velocity",
      trend: "+24% faster",
      accent: true,
    },
  ];
  return (
    <section className="mt-24 md:mt-32 py-10 border-y border-border grid grid-cols-2 lg:grid-cols-4 gap-8 relative overflow-hidden bg-card/20 backdrop-blur-xs rounded-[2px]">
      <div className="absolute inset-0 bg-secondary/5 pointer-events-none" />
      {metrics.map((m, idx) => (
        <div
          key={m.label}
          className={`space-y-2.5 px-2 relative animate-momentum`}
          style={{ animationDelay: `${(idx + 1) * 75}ms` }}
        >
          {idx > 0 && (
            <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-border/50" />
          )}
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
            {m.label}
          </div>
          <div className="space-y-0.5">
            <div
              className={`text-3xl md:text-4xl font-display font-extrabold ${m.accent ? "text-primary" : "text-foreground"}`}
            >
              {m.value}
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
              <span>{m.subtitle}</span>
              <span className="text-primary font-bold">{m.trend}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function BatonPassSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      operator: "SaaS Founder (Bengaluru)",
      action: "Initiates Baton Pass",
      opportunity: "Referral: 10% commission on contract for AI customer service API integration",
      status: "Approved",
      points: "+5 Score",
    },
    {
      operator: "Agency Owner (Mumbai)",
      action: "Accepts & Intros Client",
      opportunity: "Introduces Enterprise Logistics client needing custom automation workflows",
      status: "Applied",
      points: "+15 Score",
    },
    {
      operator: "Network Router (concierge)",
      action: "Authenticates Handoff",
      opportunity: "Validates mutual alignment and unlocks double opt-in BD contacts",
      status: "Relay Protocol",
      points: "Match Sealed",
    },
    {
      operator: "Completed Partnership",
      action: "Baton Pass Successful",
      opportunity: "₹50k USD contract closed. Introduction success confirmed by both operators.",
      status: "Apex Outcome",
      points: "+30 Mutual Points",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="mt-24 md:mt-32 border border-border p-8 bg-card rounded-[2px] relative overflow-hidden">
      <div className="absolute top-0 right-0 px-4 py-2 border-b border-l border-border bg-secondary font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
        Live Protocol Visualization
      </div>

      <div className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-1.5 text-primary font-mono text-[10px] font-bold uppercase tracking-widest">
          <Share2 className="w-3.5 h-3.5 animate-spin" /> THE CORE METAPHOR
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
          Standardizing the <span className="text-primary italic">Baton Pass</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-[65ch] leading-relaxed">
          Growth relies on momentum. The Relay replaces noisy social media feeds with standard,
          highly structured introductions. See how a verified opportunity flows securely between
          active business operators.
        </p>
      </div>

      {/* Interactive Simulation Flow */}
      <div className="mt-12 grid lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            {steps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 border transition-all duration-300 flex items-start gap-4 rounded-[2px] ${isActive ? "border-primary bg-secondary/30 ring-1 ring-primary/20" : "border-border hover:border-muted bg-card"}`}
                >
                  <div
                    className={`w-7 h-7 flex-none font-mono text-xs flex items-center justify-center border rounded-[2px] transition-colors ${isActive ? "bg-primary text-white border-primary" : "bg-secondary text-muted-foreground"}`}
                  >
                    0{idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-widest font-bold ${isActive ? "text-primary" : "text-foreground"}`}
                      >
                        {s.operator}
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter">
                        {s.status}
                      </span>
                    </div>
                    <div className="font-display font-extrabold text-sm text-foreground mt-0.5">
                      {s.action}
                    </div>
                    {isActive && (
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed animate-momentum">
                        {s.opportunity}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-none">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase ${isActive ? "text-primary animate-pulse" : "text-muted-foreground"}`}
                    >
                      {s.points}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Graphic Board */}
        <div className="lg:col-span-5 border border-border bg-secondary/10 flex flex-col justify-between p-6 relative rounded-[2px] min-h-[300px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(24_95%_45%_/_0.03)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground border-b border-border/50 pb-3">
            <span>NETWORK SCHEMATIC</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" /> Auto-cycling
            </span>
          </div>

          {/* Visual animation of passing the baton */}
          <div className="my-8 flex flex-col items-center justify-center relative flex-1">
            <svg className="w-full h-40 max-w-[280px]" viewBox="0 0 100 100">
              {/* Central connection pathways */}
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border"
                strokeDasharray="3 3"
              />
              <line
                x1="50"
                y1="12"
                x2="50"
                y2="88"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border"
              />
              <line
                x1="12"
                y1="50"
                x2="88"
                y2="50"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border"
              />

              {/* Path Flow Highlight Dash */}
              <path
                d="M 50,12 A 38,38 0 1,1 49.9,12 Z"
                fill="none"
                stroke="hsl(24 95% 45% / 0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx={50 + 38 * Math.cos((activeStep * (360 / steps.length) - 90) * (Math.PI / 180))}
                cy={50 + 38 * Math.sin((activeStep * (360 / steps.length) - 90) * (Math.PI / 180))}
                r="6"
                className="fill-primary stroke-background stroke-2 transition-all duration-700 shadow-md"
              />

              {/* Outer nodes */}
              <circle
                cx="50"
                cy="12"
                r="5"
                className={`transition-all duration-300 ${activeStep === 0 ? "fill-primary stroke-foreground stroke-2" : "fill-background stroke-border"}`}
              />
              <circle
                cx="88"
                cy="50"
                r="5"
                className={`transition-all duration-300 ${activeStep === 1 ? "fill-primary stroke-foreground stroke-2" : "fill-background stroke-border"}`}
              />
              <circle
                cx="50"
                cy="88"
                r="5"
                className={`transition-all duration-300 ${activeStep === 2 ? "fill-primary stroke-foreground stroke-2" : "fill-background stroke-border"}`}
              />
              <circle
                cx="12"
                cy="50"
                r="5"
                className={`transition-all duration-300 ${activeStep === 3 ? "fill-primary stroke-foreground stroke-2" : "fill-background stroke-border"}`}
              />
            </svg>

            {/* Simulated Live Text overlay */}
            <div className="absolute bottom-0 inset-x-0 text-center font-mono text-[9px] text-muted-foreground uppercase bg-background border border-border px-3 py-1.5 rounded-[2px] shadow-xs">
              <span className="text-primary font-bold">PROTOCOL STATE:</span>{" "}
              {steps[activeStep].action}
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground border-t border-border/50 pt-3">
            <span>NODE HEALTH: ACTIVE</span>
            <span className="text-primary font-bold">₹50K USD NOMINAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProtocolsSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section id="protocols" className="mt-24 md:mt-32">
      <div className="mb-16 space-y-4">
        <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
          [ standard operational directives ]
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight">
          Opportunity Protocols
        </h2>
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          Standardizing business exchange to maximize velocity and prevent trust erosion.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Standard Grid Selectors */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-px bg-border border border-border">
          {protocols.map((p, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={p.n}
                onClick={() => setSelectedIdx(idx)}
                className={`text-left p-6 space-y-4 transition-all duration-300 ${isSelected ? "bg-secondary/40 ring-1 ring-primary" : "bg-card hover:bg-secondary/15"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-primary font-bold">{p.n}.</span>
                    <span className="font-display font-bold text-foreground">{p.title}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {p.body}
                </p>
                <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground pt-1">
                  <span>METRIC:</span>
                  <span className="text-foreground font-bold">{p.metric}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: High Fidelity Manifest Preview */}
        <div className="lg:col-span-6 border border-border bg-card p-8 rounded-[2px] space-y-6 relative min-h-[380px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 px-4 py-1.5 border-b border-l border-border bg-secondary font-mono text-[9px] text-muted-foreground uppercase tracking-widest rounded-bl-[2px]">
            Protocol Manifest #{protocols[selectedIdx].n}
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest border border-primary/20 px-2 py-0.5 bg-primary/5 rounded-[2px]">
                {protocols[selectedIdx].title} Protocol Standard
              </span>
              <h3 className="font-display text-2xl font-extrabold mt-3 text-foreground">
                Exchanging {protocols[selectedIdx].title} Partnerships
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {protocols[selectedIdx].body} Opportunities in this category are surfaced
                exclusively to operators who carry level-appropriate validation credentials.
              </p>
            </div>

            {/* Interactive Mock Baton Card representing the protocol */}
            <div className="border border-border/80 bg-secondary/15 p-5 rounded-[2px] space-y-4">
              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  LIVE TRANSACTION PREVIEW
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-500 font-bold">
                  STANDARDIZED
                </span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ORIGIN NODE:</span>
                  <span className="text-foreground font-bold">
                    {protocols[selectedIdx].preview.from}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TARGET SECTOR:</span>
                  <span className="text-foreground font-bold">
                    {protocols[selectedIdx].preview.to}
                  </span>
                </div>
                <div className="pt-2 border-t border-border/30">
                  <span className="text-[10px] text-muted-foreground block mb-1">MEMO DETAIL:</span>
                  <span className="text-foreground font-display font-medium font-sans text-sm block">
                    {protocols[selectedIdx].preview.detail}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/30 text-primary font-bold">
                  <span>RECIPROCITY VALUE:</span>
                  <span>{protocols[selectedIdx].preview.value}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Standardized Match Metric
            </span>
            <Link
              to="/opportunities"
              className="text-xs text-primary font-mono font-bold uppercase hover:underline flex items-center gap-1"
            >
              Examine live feed <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Verification() {
  const levels = [
    {
      tag: "Basic",
      style: "bg-secondary text-foreground border border-border",
      title: "Verified Business",
      body: "Domain email check, SSL validation, and core founder verification. Surfaces basic referral, vendor, and warm intro requests with standard surfacing priority.",
      req: "Email domain & Website lookup",
    },
    {
      tag: "Applied",
      style: "bg-foreground text-background border border-foreground font-bold",
      title: "Trusted Operator",
      body: "Founder identity & company LinkedIn registration validated manually. Unlocks direct connection unlocks, score boosts, and full access to private protocols.",
      req: "LinkedIn + Founder Identity Match",
    },
    {
      tag: "Approved",
      style: "border-4 border-primary text-primary font-extrabold bg-primary/5",
      title: "Established Entity",
      body: "Corporate registry (CIN/GST/Tax certificate) or revenue proof checked. surcharges highest trust, priority concierge matchmaking, and active surfacing top-tier listings.",
      req: "Tax registration / Active Revenue proof",
    },
  ];
  return (
    <section id="trust" className="mt-24 md:mt-32 flex flex-col lg:flex-row gap-16 items-center">
      <div className="lg:w-5/12 space-y-4">
        <div className="border border-border p-2 bg-card rounded-[2px] shadow-sm relative overflow-hidden group">
          <img
            src={batonImg}
            alt="A relay baton — the metaphor at the heart of The Relay"
            className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 rounded-[1px]"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-xs p-4 border border-border rounded-[1px] font-mono text-[9px] text-muted-foreground uppercase space-y-1">
            <div className="flex justify-between text-foreground font-bold">
              <span>METAPHOR SPECIFICATION</span>
              <span className="text-primary">V1.02</span>
            </div>
            <div className="flex justify-between">
              <span>BATON ID</span>
              <span>#RY-PROTOCOL-ALPHA</span>
            </div>
            <div className="flex justify-between">
              <span>FUNCTION</span>
              <span>VERIFIED INTRO</span>
            </div>
            <div className="flex justify-between text-emerald-500 font-bold">
              <span>DOUBLE OPT-IN</span>
              <span>ENFORCED SECURE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-7/12 flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest block">
            [ verified identity and high fidelity outcomes ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-foreground">
            Trust through active <br />
            <span className="text-primary italic">reputation credentials.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-[55ch] leading-relaxed mt-4">
            Stars are vanity. The Relay logs concrete structural outcomes — partnerships signed,
            warm handoffs accepted, high-value vendors verified. Your operational reputation grows
            securely over time.
          </p>
        </div>
        <div className="grid gap-6 pt-4">
          {levels.map((l) => (
            <div
              key={l.tag}
              className="flex gap-6 p-5 border border-border bg-card/60 backdrop-blur-sm rounded-[2px] hover:border-primary/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 flex-none font-mono text-sm flex items-center justify-center rounded-[2px] ${l.style}`}
              >
                {l.tag}
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex justify-between items-center flex-wrap gap-x-2">
                  <h4 className="font-extrabold font-display text-base text-foreground">
                    {l.title}
                  </h4>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                    REQ: {l.req}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[62ch]">
                  {l.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reciprocity() {
  const [batonsPassed, setBatonsPassed] = useState(3);
  const [reviews, setReviews] = useState(1);
  const [activeOpps, setActiveOpps] = useState(2);

  const calculateScore = () => {
    return Math.min(100, 30 + batonsPassed * 15 + reviews * 10 + activeOpps * 5);
  };

  const score = calculateScore();

  return (
    <section
      id="score"
      className="mt-24 md:mt-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
    >
      <div className="lg:col-span-5 space-y-6 animate-momentum">
        <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest block">
          [ NETWORK SCORE ENGINE ]
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight leading-tight">
          Help the network, <br />
          and the network <br />
          <span className="text-primary italic">relays back to you.</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Every profile demonstrates what you have given, not just what you have taken. The
          The Network Score incentives verified handoffs and warm intros. Maintain a high score to
          unlock priority features.
        </p>

        {/* Interactive Sliders for user to test */}
        <div className="border border-border/80 bg-card p-5 rounded-[2px] space-y-5">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold border-b border-border pb-2 flex justify-between">
            <span>Score Calculator Simulator</span>
            <span className="text-primary">Interactive</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-foreground">Batons Passed (+15pts)</span>
                <span className="text-primary font-bold">{batonsPassed}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={batonsPassed <= 0}
                  onClick={() => setBatonsPassed((p) => p - 1)}
                  className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary text-xs disabled:opacity-30 rounded-[2px]"
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={batonsPassed}
                  onChange={(e) => setBatonsPassed(Number(e.target.value))}
                  className="flex-1 accent-primary h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <button
                  disabled={batonsPassed >= 5}
                  onClick={() => setBatonsPassed((p) => p + 1)}
                  className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary text-xs disabled:opacity-30 rounded-[2px]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-foreground">Vetted Reviews Written (+10pts)</span>
                <span className="text-primary font-bold">{reviews}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={reviews <= 0}
                  onClick={() => setReviews((p) => p - 1)}
                  className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary text-xs disabled:opacity-30 rounded-[2px]"
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={reviews}
                  onChange={(e) => setReviews(Number(e.target.value))}
                  className="flex-1 accent-primary h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <button
                  disabled={reviews >= 3}
                  onClick={() => setReviews((p) => p + 1)}
                  className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary text-xs disabled:opacity-30 rounded-[2px]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-foreground">Active Opportunities Posted (+5pts)</span>
                <span className="text-primary font-bold">{activeOpps}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={activeOpps <= 0}
                  onClick={() => setActiveOpps((p) => p - 1)}
                  className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary text-xs disabled:opacity-30 rounded-[2px]"
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={activeOpps}
                  onChange={(e) => setActiveOpps(Number(e.target.value))}
                  className="flex-1 accent-primary h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <button
                  disabled={activeOpps >= 4}
                  onClick={() => setActiveOpps((p) => p + 1)}
                  className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary text-xs disabled:opacity-30 rounded-[2px]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reciprocity Dashboard Preview */}
      <div className="lg:col-span-7 bg-foreground text-background p-8 md:p-10 rounded-[2px] shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[380px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(24_95%_45%_/_0.06)_0%,transparent_60%)] pointer-events-none" />

        <div className="flex items-center justify-between border-b border-white/12 pb-6 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-background/60 flex items-center gap-1.5">
              apex hr solutions
              <span title="Verified by Platform">
                <BadgeCheck className="w-3.5 h-3.5 text-white fill-[#1877f2] shrink-0" />
              </span>
            </div>
            <div className="font-display text-2xl font-extrabold mt-1 text-white flex items-center gap-2">
              Established · Approved Entity
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-[2px]">
            <div className="text-right">
              <div className="font-mono text-[9px] uppercase tracking-widest text-background/60">
                Calculated Score
              </div>
              <div className="font-display text-3xl font-extrabold text-primary">
                {score.toFixed(1)}
              </div>
            </div>
            <div className="w-10 h-10 flex-none relative">
              {/* SVG circular progress */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="hsl(24 95% 45%)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="100.5"
                  strokeDashoffset={100.5 - (100.5 * score) / 100}
                  className="transition-all duration-700 ease-out-expo"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Dynamic Perks list based on simulator score */}
        <div className="my-8 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-4 font-bold">
            UNLOCKED PLATFORM BENEFITS:
          </div>

          <div className="flex items-center gap-3 text-xs font-mono transition-opacity duration-300">
            <Check className="w-4 h-4 text-emerald-500" />
            <span className="text-white">Basic Standard Surfacing & Feed access</span>
            <span className="ml-auto text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-[2px]">
              Active
            </span>
          </div>

          <div
            className={`flex items-center gap-3 text-xs font-mono transition-all duration-300 ${score >= 50 ? "opacity-100" : "opacity-40"}`}
          >
            {score >= 50 ? (
              <Unlock className="w-4 h-4 text-emerald-400" />
            ) : (
              <Lock className="w-4 h-4 text-background/40" />
            )}
            <span className={score >= 50 ? "text-white" : "text-background/60"}>
              Unlock direct BD Contact Details (+15 points per connection)
            </span>
            <span
              className={`ml-auto text-[9px] px-2 py-0.5 rounded-[2px] ${score >= 50 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-background/40 border border-white/5"}`}
            >
              {score >= 50 ? "Active" : "Locked < 50"}
            </span>
          </div>

          <div
            className={`flex items-center gap-3 text-xs font-mono transition-all duration-300 ${score >= 75 ? "opacity-100" : "opacity-40"}`}
          >
            {score >= 75 ? (
              <Unlock className="w-4 h-4 text-emerald-400" />
            ) : (
              <Lock className="w-4 h-4 text-background/40" />
            )}
            <span className={score >= 75 ? "text-white" : "text-background/60"}>
              Concierge Matching surf priority ( Surfaced to TOP 15% profiles)
            </span>
            <span
              className={`ml-auto text-[9px] px-2 py-0.5 rounded-[2px] ${score >= 75 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-background/40 border border-white/5"}`}
            >
              {score >= 75 ? "Active" : "Locked < 75"}
            </span>
          </div>

          <div
            className={`flex items-center gap-3 text-xs font-mono transition-all duration-300 ${score >= 90 ? "opacity-100" : "opacity-40"}`}
          >
            {score >= 90 ? (
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            ) : (
              <Lock className="w-4 h-4 text-background/40" />
            )}
            <span className={score >= 90 ? "text-white font-semibold" : "text-background/60"}>
              Apex Surfacing Premium surcharges ( Surface in TOP 5% feed )
            </span>
            <span
              className={`ml-auto text-[9px] px-2 py-0.5 rounded-[2px] ${score >= 90 ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-background/40 border border-white/5"}`}
            >
              {score >= 90 ? "Apex Tier" : "Locked < 90"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-white/12 text-[10px] font-mono text-background/60">
          <span>MEMO: REAL-TIME UPDATES VIA WINDOW EVENTS</span>
          <span className="text-primary font-bold">APPROVED REGISTERED ENTITY</span>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Standard Member",
      subtitle: "For verified founders & operational boutique agencies",
      price: billingCycle === "monthly" ? "₹999" : "₹799",
      period: "mo",
      detail: billingCycle === "annual" ? "billed annually as ₹9,588" : "billed monthly",
      badge: "CORE NETWORK ACCESS",
      features: [
        "Domain and website verified status",
        "Publish standard opportunities in feed",
        "Search & filter dynamic catalogue with schema type-safety",
        "Basic Network Score engine inclusion",
        "Send 5 direct intro contact requests per month",
      ],
      cta: "Apply for Membership",
      accent: false,
    },
    {
      name: "Growth Partner",
      subtitle: "For scale-up platforms, high-volume vendors & enterprise operators",
      price: billingCycle === "monthly" ? "₹4,999" : "₹3,999",
      period: "mo",
      detail: billingCycle === "annual" ? "billed annually as ₹47,988" : "billed monthly",
      badge: "CONCIERGE & PRIORITY SURFACING",
      features: [
        "Corporate verified Approved status credential",
        "Concierge matchmaking & verified double opt-in handoffs",
        "Priority SURFACING in top 5% of feed outcomes",
        "Custom window events real-time sync across multiple operator tabs",
        "Unlimited direct connection unlocks (upon mutual reciprocity)",
        "Dedicated corporate routing advisor",
      ],
      cta: "Apply for Growth Partnership",
      accent: true,
    },
  ];

  return (
    <section id="pricing" className="mt-24 md:mt-32 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto animate-momentum">
        <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest block">
          [ transparent, outcome-oriented pricing ]
        </span>
        {/* <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
          Apply for Membership
        </h2> */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          Relay is strictly restricted to operating, verified businesses. No passive profiles, no
          spam recruiters. We review every application manually within 24 hours.
        </p>

        {/* Pricing billing cycle toggle */}
        <div className="pt-6 flex justify-center">
          <div className="border border-border bg-card p-1 flex gap-1 rounded-[2px] shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-1.5 text-[11px] font-mono uppercase tracking-widest font-semibold rounded-[1px] transition-all ${billingCycle === "monthly" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-1.5 text-[11px] font-mono uppercase tracking-widest font-semibold rounded-[1px] transition-all flex items-center gap-1.5 ${billingCycle === "annual" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              Annual billing{" "}
              <span className="px-1.5 py-0.5 bg-white text-primary text-[8px] font-bold rounded-[2px] uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
        {plans.map((p, idx) => (
          <div
            key={p.name}
            className={`border p-8 md:p-10 flex flex-col justify-between relative rounded-[2px] transition-all duration-300 ${p.accent ? "border-primary bg-secondary/15 ring-1 ring-primary/20 shadow-md" : "border-border bg-card hover:border-muted-foreground/30 shadow-sm"}`}
          >
            {p.accent && (
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold rounded-[2px] shadow-sm">
                RECOMMENDED OPERATOR TIER
              </div>
            )}
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest border border-primary/20 px-2 py-0.5 bg-primary/5 rounded-[2px]">
                  {p.badge}
                </span>
                <h3 className="font-display text-2xl font-extrabold mt-4 text-foreground">
                  {p.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.subtitle}</p>
              </div>

              <div className="border-y border-border/60 py-5 my-6 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-display font-extrabold text-foreground">
                  {p.price}
                </span>
                <span className="text-sm font-mono text-muted-foreground font-normal">
                  /{p.period}
                </span>
                <span className="text-[10px] font-mono text-primary font-bold uppercase ml-auto">
                  {p.detail}
                </span>
              </div>

              <div className="space-y-4">
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
                  WHAT IS UNLOCKED:
                </div>
                <ul className="space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-none" />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-border/40">
              {p.cta === "Apply for Membership" ? null : (
                <button
                  className={`w-full py-4 font-mono text-xs uppercase tracking-widest transition-all rounded-[2px] font-bold ${p.accent ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/15" : "bg-foreground text-background hover:bg-primary hover:text-white"}`}
                >
                  {p.cta}
                </button>
              )}
              <div className="text-center mt-3 text-[9px] font-mono text-muted-foreground uppercase flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-primary" /> Setup in under 5 minutes
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-32 pt-12 border-t border-border flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative z-10">
      <div className="space-y-2">
        <Link
          to="/home"
          className="font-display font-extrabold text-xl uppercase tracking-tighter text-foreground flex items-center gap-1.5"
        >
          <span className="w-5.5 h-5.5 bg-primary flex items-center justify-center text-white text-[10px] font-mono tracking-normal font-semibold rounded-[1px]">
            R
          </span>
          <span>The Relay</span>
        </Link>
        <div className="text-xs text-muted-foreground max-w-[40ch]">
          Where growth finds momentum. A high-contrast, Swiss-inspired, curated operator network.
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-3">
        <div className="flex gap-6 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <Link to="/opportunities" className="hover:text-primary transition-colors">
            Opportunities
          </Link>
          <a href="#protocols" className="hover:text-primary transition-colors">
            Protocols
          </a>
          {/* <a href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </a> */}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          © 2026 The Relay Protocol · Operating with Total Type-Safety
        </div>
      </div>
    </footer>
  );
}
