import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Show, SignInButton } from "@clerk/tanstack-react-start";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
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
  Lock,
  Unlock,
  Sparkles,
  Share2,
  Award,
  Clock,
  ChevronRight,
  SlidersHorizontal,
  Building,
  MapPin,
  Briefcase,
  Layers,
  HeartHandshake
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

type MockOpp = {
  type: string;
  company: string;
  title: string;
  description: string;
  industry: string;
  geo: string;
  interested: number;
  badge: "Basic" | "Applied" | "Approved";
};

const MOCK_OPPORTUNITIES: Record<string, MockOpp> = {
  Partnership: {
    type: "Partnership",
    company: "Nexus Logistics",
    title: "Integration partners for last-mile fragile-goods API",
    description: "Seeking Shopify Plus brands and 3PL platforms to integrate our specialized last-mile delivery API for fragile e-commerce goods.",
    industry: "Logistics",
    geo: "India",
    interested: 9,
    badge: "Approved",
  },
  Referral: {
    type: "Referral",
    company: "Stratos Design",
    title: "Mutual referral: Shopify Plus dev shop",
    description: "We frequently turn away development-only requests from Shopify Plus brands. Looking for a high-quality dev partner for ongoing handoffs.",
    industry: "Marketing Agency",
    geo: "India",
    interested: 11,
    badge: "Applied",
  },
  Distribution: {
    type: "Distribution",
    company: "Cloudstack Systems",
    title: "Reseller partners for cloud automation suite",
    description: "Enterprise SaaS provider expanding into the DACH region. 20% recurring revenue share for active IT consultancies with SME books.",
    industry: "SaaS",
    geo: "DACH",
    interested: 4,
    badge: "Approved",
  },
  Vendor: {
    type: "Vendor",
    company: "Solvent Health",
    title: "ISO-certified biodegradable mailer vendor (10k/mo)",
    description: "Scaling premium wellness D2C line. Need ISO-certified biodegradable custom mailers at 10k units/month. EU manufacturing preferred.",
    industry: "D2C Brand",
    geo: "United Kingdom",
    interested: 6,
    badge: "Approved",
  },
};

const TYPE_ACCENT: Record<string, string> = {
  Partnership: "bg-primary/10 text-primary",
  Referral: "bg-indigo-500/10 text-indigo-600",
  Distribution: "bg-emerald-500/10 text-emerald-700",
  Vendor: "bg-purple-500/10 text-purple-700",
};

function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased overflow-x-hidden relative">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 pt-10 pb-24 space-y-24">
        <HeroSection />
        <InteractiveFeedPreview />
        <ValuePropositions />
        <ReciprocityCalculator />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/home" className="flex items-center gap-2 group">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <div className="hidden md:flex gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
            <a href="#demo" className="hover:text-slate-800 transition-colors">
              Live Demo
            </a>
            <a href="#pillars" className="hover:text-slate-800 transition-colors">
              Ecosystem
            </a>
            <a href="#calculator" className="hover:text-slate-800 transition-colors">
              Reciprocity
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/opportunities"
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-4 py-2 border border-slate-200 hover:border-slate-800 hover:text-slate-950 transition-all rounded-[2px]"
          >
            Explore Feed <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <Show when="signed-in">
            <UserAvatarDropdown />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/opportunities">
              <button className="text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors cursor-pointer font-bold">
                Sign In
              </button>
            </SignInButton>
            <Link
              to="/signup"
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm font-bold flex items-center justify-center border border-slate-900"
            >
              Sign Up
            </Link>
          </Show>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="space-y-6 pt-6 md:pt-10 max-w-4xl">

      
      <h1 className="font-display text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-slate-950 uppercase">
        OPERATOR-GRADE <br className="hidden sm:inline" />
        BUSINESS DIRECTORY. <br className="hidden sm:inline" />
        <span className="text-primary italic font-serif normal-case tracking-normal">Zero Spam.</span>
      </h1>

      <p className="text-slate-600 text-sm md:text-base max-w-[62ch] leading-relaxed font-sans pt-2">
        An ecosystem for verified businesses to exchange high-value partnerships, referrals, and vendor relationships. No noisy social feeds. Manual onboarding and double opt-in verification protect every operator node.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center pt-4 w-full">
        <Link
          to="/opportunities"
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] font-bold shadow-sm"
        >
          Enter Dashboard <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
        <a
          href="#demo"
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center border border-slate-200 bg-white hover:border-slate-800 hover:bg-slate-50 text-slate-700 font-mono text-xs uppercase tracking-widest transition-all rounded-[2px] font-bold"
        >
          See Live Demo
        </a>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-slate-200 w-full max-w-3xl mt-12 text-left">
        <div>
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Pipeline Volume</div>
          <div className="text-2xl font-display font-extrabold text-slate-950 mt-0.5">₹82.4 Cr+</div>
          <div className="text-[9px] font-mono text-primary font-semibold mt-0.5">+14.8% MoM</div>
        </div>
        <div>
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Relay Rate</div>
          <div className="text-2xl font-display font-extrabold text-slate-950 mt-0.5">84.2%</div>
          <div className="text-[9px] font-mono text-emerald-600 font-semibold mt-0.5">Acceptance Rate</div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Manual Onboarding</div>
          <div className="text-2xl font-display font-extrabold text-slate-950 mt-0.5">Vetted Only</div>
          <div className="text-[9px] font-mono text-slate-400 mt-0.5">LinkedIn + Company Lookup</div>
        </div>
      </div>
    </section>
  );
}

function InteractiveFeedPreview() {
  const [selectedTab, setSelectedTab] = useState<string>("Partnership");
  const currentOpp = MOCK_OPPORTUNITIES[selectedTab];

  return (
    <section id="demo" className="space-y-8 border-t border-slate-200 pt-16">
      <div className="max-w-2xl space-y-3">
        <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-[0.2em] block">
          [ DEMONSTRATION ]
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
          Dynamic Feed Interface
        </h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          Test drive our standardized layout. Switch between types to see how opportunities are presented to verified members.
        </p>
      </div>

      {/* Light Theme Swiss Window */}
      <div className="border border-slate-200 bg-white rounded-[4px] shadow-sm p-6 md:p-8 max-w-4xl relative overflow-hidden">
        {/* Top bar mimicking real client */}
        <div className="absolute top-4 left-6 flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="absolute top-3.5 right-6 font-mono text-[8px] text-slate-400 uppercase tracking-widest">
          dashboard_feed_demo.sh
        </div>

        <div className="mt-6 space-y-6 pt-4 border-t border-slate-100">
          {/* Tabs header mimicking opportunities page */}
          <div className="flex border-b border-slate-200 pb-px overflow-x-auto scrollbar-none gap-6">
            {Object.keys(MOCK_OPPORTUNITIES).map((tab) => {
              const active = selectedTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`pb-3 font-mono text-[10px] font-bold uppercase tracking-widest border-b-2 cursor-pointer transition-all ${
                    active ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Standardized Card layout */}
          <div className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md rounded-[4px] relative transition-all duration-300">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-[2px] ${TYPE_ACCENT[currentOpp.type] || "bg-slate-100 text-slate-600"}`}>
                  {currentOpp.type}
                </span>
                <span className="font-mono text-[9px] text-slate-400 font-medium">#DEMO-CARD</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-lg font-bold leading-tight text-slate-950">
                  {currentOpp.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{currentOpp.description}</p>
              </div>

              <div className="flex items-center gap-3 font-mono text-[9px] text-slate-400 border-t border-slate-50 pt-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-[2px] bg-slate-50 border border-slate-200 flex items-center justify-center font-sans text-[8px] font-bold text-slate-500 uppercase">
                    {currentOpp.company.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-slate-900 font-bold flex items-center gap-1.5">
                    {currentOpp.company}
                    <BadgeCheck className="w-3.5 h-3.5 text-white fill-[#1877f2]" />
                  </span>
                </div>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                  {currentOpp.industry}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-300" />
                  {currentOpp.geo}
                </span>
              </div>
            </div>

            {/* Right trust tier & Action details */}
            <div className="md:w-40 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <div className="text-left md:text-center space-y-1">
                <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">Verification</div>
                <div className="inline-flex items-center justify-center bg-slate-900 text-white text-[8px] font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm cursor-default">
                  {currentOpp.badge}
                </div>
              </div>
              <Link
                to="/opportunities"
                className="flex-1 md:flex-none md:w-full py-2.5 px-3 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest text-center transition-all rounded-[2px] font-bold shadow-sm"
              >
                Express Interest
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-300" /> {currentOpp.interested} verified operators interested
            </span>
            <span className="text-slate-400 font-bold uppercase tracking-widest shrink-0">• Double Opt-in Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuePropositions() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      title: "FOUNDER IDENTITY VERIFIED",
      description: "No recruitment agents, cold sales, or bots. Every operator profile goes through direct manual verification and company checks before listing access."
    },
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      title: "DOUBLE OPT-IN CONTRACTS",
      description: "Direct contact credentials remain hidden. Introductions are only initiated when both parties have reviewed the target memo and accepted the strategic match."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-primary" />,
      title: "GIVE-TO-GET RECIPROCITY",
      description: "No passive observers allowed. Earning points through responding to others or sharing qualified handoffs increases your score, which unlocks direct access."
    }
  ];

  return (
    <section id="pillars" className="space-y-8 border-t border-slate-200 pt-16">
      <div className="max-w-2xl space-y-3">
        <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-[0.2em] block">
          [ ARCHITECTURE ]
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
          Ecosystem Design
        </h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          The Relay is structured to prevent network erosion by enforcing mutual accountability standards.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="bg-white p-6 md:p-8 space-y-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="w-10 h-10 bg-slate-50 border border-slate-200 flex items-center justify-center rounded-[2px] text-primary">
              {p.icon}
            </div>
            <h3 className="font-display text-sm font-extrabold text-slate-950 uppercase tracking-tight">
              {p.title}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-sans">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReciprocityCalculator() {
  const [passed, setPassed] = useState<number>(3);
  const [reviews, setReviews] = useState<number>(1);
  const [posted, setPosted] = useState<number>(2);

  const score = Math.min(100, 30 + passed * 15 + reviews * 10 + posted * 5);

  return (
    <section id="calculator" className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center border-t border-slate-200 pt-16">
      <div className="lg:col-span-5 space-y-6">
        <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-[0.2em] block">
          [ RECIPROCITY SCORE ]
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase leading-none">
          REPUTATION DRIVES <br />
          PLATFORM VELOCITY.
        </h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          Maintain a positive give-to-get ratio. Earning points through introductions and sharing listing assets climbs your business up trust tiers.
        </p>

        {/* Sliders Container */}
        <div className="border border-slate-200 bg-white p-6 rounded-[2px] space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-600">Introductions Made (+15 pts)</span>
              <span className="text-primary font-bold">{passed}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={passed}
              onChange={(e) => setPassed(Number(e.target.value))}
              className="w-full accent-primary h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer border-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-600">Vetted Reviews Added (+10 pts)</span>
              <span className="text-primary font-bold">{reviews}</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              value={reviews}
              onChange={(e) => setReviews(Number(e.target.value))}
              className="w-full accent-primary h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer border-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-600">Active Listings Posted (+5 pts)</span>
              <span className="text-primary font-bold">{posted}</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={posted}
              onChange={(e) => setPosted(Number(e.target.value))}
              className="w-full accent-primary h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer border-none"
            />
          </div>
        </div>
      </div>

      {/* Calculator Score Card */}
      <div className="lg:col-span-7 bg-white border border-slate-200 p-8 rounded-[4px] shadow-sm flex flex-col justify-between min-h-[380px]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              Apex Growth Solutions
              <BadgeCheck className="w-3.5 h-3.5 text-white fill-[#1877f2]" />
            </div>
            <div className="font-display text-xl font-extrabold mt-1 text-slate-950 uppercase">
              Reputation Level
            </div>
          </div>

          {/* SVG Score Circle */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-2 rounded-[2px]">
            <div className="text-right">
              <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400 block">Calculated Score</span>
              <span className="font-display text-2xl font-extrabold text-primary">{score}</span>
            </div>
            <div className="w-9 h-9 flex items-center justify-center relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="14" stroke="#f1f5f9" strokeWidth="2.5" fill="none" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="hsl(24 95% 45%)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="88"
                  strokeDashoffset={88 - (88 * score) / 100}
                  className="transition-all duration-500 ease-out"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Privileges */}
        <div className="my-8 space-y-4">
          <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">UNLOCKED PRIVILEGES:</div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-700">Basic Standard Surfacing & Feed access</span>
              <span className="ml-auto shrink-0 text-[8px] font-mono px-2 py-0.5 bg-emerald-50 text-white rounded-[2px] font-bold">
                ACTIVE
              </span>
            </div>
            <div className={`flex items-center gap-3 text-xs font-mono transition-opacity duration-300 ${score >= 50 ? "opacity-100" : "opacity-30"}`}>
              {score >= 50 ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : <Lock className="w-4 h-4 text-slate-400 shrink-0" />}
              <span className="text-slate-700">Unlock direct BD Contact Details</span>
              <span className={`ml-auto shrink-0 text-[8px] font-mono px-2 py-0.5 rounded-[2px] font-bold ${score >= 50 ? "bg-emerald-50 text-white" : "bg-slate-100 text-slate-400"}`}>
                {score >= 50 ? "ACTIVE" : "LOCKED"}
              </span>
            </div>
            <div className={`flex items-center gap-3 text-xs font-mono transition-opacity duration-300 ${score >= 75 ? "opacity-100" : "opacity-30"}`}>
              {score >= 75 ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : <Lock className="w-4 h-4 text-slate-400 shrink-0" />}
              <span className="text-slate-700">Concierge Matching Priority (Top 15%)</span>
              <span className={`ml-auto shrink-0 text-[8px] font-mono px-2 py-0.5 rounded-[2px] font-bold ${score >= 75 ? "bg-emerald-50 text-white" : "bg-slate-100 text-slate-400"}`}>
                {score >= 75 ? "ACTIVE" : "LOCKED"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[8px] font-mono text-slate-400">
          <span>HEALTH RATING: EXCELLENT</span>
          <span className="text-primary font-bold">VERIFIED REPUTATION DATA</span>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border border-slate-200 bg-slate-50 p-6 sm:p-12 rounded-[4px] text-center space-y-6 max-w-4xl shadow-sm">
      <div className="space-y-4 max-w-2xl mx-auto">
        <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-[0.2em] block">
          [ VERIFICATION PIPELINE ]
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tighter uppercase">
          Ready to join the network?
        </h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          Application takes 3 minutes. Every operator profile goes through manual identity verification to ensure 100% spam-free match-making.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/signup"
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] font-bold shadow-sm"
        >
          Create Vetted Account
        </Link>
        <Link
          to="/opportunities"
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center border border-slate-200 bg-white hover:border-slate-800 text-slate-700 font-mono text-xs uppercase tracking-widest transition-all rounded-[2px] font-bold"
        >
          Explore Live Board
        </Link>
      </div>

      <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest pt-4">
        Setup in under 5 minutes · Manual review within 24 hours
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-12 border-t border-slate-200 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
      <div className="space-y-2">
        <Link
          to="/home"
          className="font-display font-extrabold text-lg uppercase tracking-tighter text-slate-950 flex items-center gap-1.5"
        >
          <span className="w-5.5 h-5.5 bg-slate-900 flex items-center justify-center text-white text-[10px] font-mono tracking-normal font-semibold rounded-[1px]">
            R
          </span>
          <span>The Relay</span>
        </Link>
        <div className="text-xs text-slate-500 max-w-[40ch]">
          Where growth finds momentum. A high-contrast, Swiss-inspired, curated operator network.
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-3">
        <div className="flex gap-6 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <Link to="/opportunities" className="hover:text-primary transition-colors">
            Opportunities Feed
          </Link>
          <a href="#demo" className="hover:text-primary transition-colors">
            Demo
          </a>
          <a href="#pillars" className="hover:text-primary transition-colors">
            Ecosystem
          </a>
        </div>
        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
          © 2026 The Relay Protocol · Operating with Total Type-Safety
        </div>
      </div>
    </footer>
  );
}
