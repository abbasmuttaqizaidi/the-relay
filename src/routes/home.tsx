import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Show, SignInButton } from "@clerk/tanstack-react-start";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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
  Building,
  MapPin,
  Briefcase,
  Layers,
  HeartHandshake,
  Terminal,
  Search,
  HelpCircle,
  Send,
  RefreshCw,
  Sliders
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

const MOCK_OPPORTUNITIES: MockOpp[] = [
  {
    type: "Partnership",
    company: "Demo",
    title: "Integration partners for last-mile fragile-goods API",
    description: "Seeking Shopify Plus brands and 3PL platforms to integrate our specialized last-mile delivery API for fragile e-commerce goods.",
    industry: "Logistics",
    geo: "India",
    interested: 9,
    badge: "Approved",
  },
  {
    type: "Referral",
    company: "Demo",
    title: "Mutual referral: Shopify Plus dev shop",
    description: "We frequently turn away development-only requests from Shopify Plus brands. Looking for a high-quality dev partner for ongoing handoffs.",
    industry: "Marketing Agency",
    geo: "India",
    interested: 11,
    badge: "Applied",
  },
  {
    type: "Distribution",
    company: "Demo",
    title: "Reseller partners for cloud automation suite",
    description: "Enterprise SaaS provider expanding into the DACH region. 20% recurring revenue share for active IT consultancies with SME books.",
    industry: "SaaS",
    geo: "DACH",
    interested: 4,
    badge: "Approved",
  },
  {
    type: "Vendor",
    company: "Demo",
    title: "ISO-certified biodegradable mailer vendor (10k/mo)",
    description: "Scaling premium wellness D2C line. Need ISO-certified biodegradable custom mailers at 10k units/month. EU manufacturing preferred.",
    industry: "D2C Brand",
    geo: "United Kingdom",
    interested: 6,
    badge: "Approved",
  },
  {
    type: "Partnership",
    company: "Demo",
    title: "Clinical trial patient recruitment channel partnership",
    description: "Seeking integrations with digital healthcare providers and patient management software platforms to scale our automated recruitment engine.",
    industry: "AI",
    geo: "USA",
    interested: 15,
    badge: "Approved",
  },
  {
    type: "Referral",
    company: "Demo",
    title: "Growth debt referrals for bootstrapped SaaS companies",
    description: "Looking for venture builders, incubators, and advisory firms who can refer founders looking for non-dilutive capital. 1% finder fee.",
    industry: "Finance",
    geo: "UAE",
    interested: 8,
    badge: "Approved",
  }
];

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Partnership: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  Referral: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  Distribution: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Vendor: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

function Landing() {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-orange-600 selection:text-white font-sans antialiased overflow-x-hidden relative">
      {/* Background Subtle Patterns */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(hsl(215 25% 12% / 0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <Nav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-12 pb-12 md:pb-24 space-y-16 md:space-y-28 relative">
        <HeroSection />
        <TickerSection />
        <InteractiveFeedPreview />
        <ValuePropositions />
        <ReciprocityCalculator />
        <OnboardingSteps />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "border-b border-slate-200 bg-white/85 backdrop-blur-md py-3 shadow-sm" 
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/home" className="flex items-center gap-3 group">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-9 md:h-11 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
          <div className="hidden md:flex gap-6 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-500 font-bold">
            <a href="#feed-simulator" className="hover:text-orange-600 transition-colors">
              Feed Simulator
            </a>
            <a href="#pillars" className="hover:text-orange-600 transition-colors">
              Ecosystem
            </a>
            <a href="#calculator" className="hover:text-orange-600 transition-colors">
              Reciprocity Calculator
            </a>
            <a href="#onboarding" className="hover:text-orange-600 transition-colors">
              Protocol Onboarding
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/opportunities"
            className="hidden sm:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-4 py-2 border border-slate-300 hover:border-slate-800 hover:text-slate-950 transition-all rounded-[2px] bg-white font-bold"
          >
            Explore Feed <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1" />
          </Link>

          <Show when="signed-in">
            <UserAvatarDropdown />
          </Show>

          <Show when="signed-out">
            <div className="hidden sm:flex items-center gap-3">
              <SignInButton mode="modal" forceRedirectUrl="/opportunities">
                <button className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors cursor-pointer font-bold px-3 py-2">
                  Sign In
                </button>
              </SignInButton>
              <Link
                to="/signup"
                className="bg-slate-900 hover:bg-orange-600 hover:border-orange-600 text-white px-5 py-2 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm font-bold flex items-center justify-center border border-slate-900"
              >
                Sign Up
              </Link>
            </div>
          </Show>

          {/* Mobile Hamburg Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="h-9 w-9 flex items-center justify-center border border-slate-200/80 rounded-[2px] bg-white hover:bg-slate-50 transition-colors cursor-pointer">
                  <Menu className="w-4 h-4 text-slate-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white p-6 w-[280px] flex flex-col justify-between border-l border-slate-200 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain mix-blend-multiply" />
                  </div>
                  
                  <div className="flex flex-col gap-5 text-[11px] font-mono uppercase tracking-[0.12em] text-slate-500 font-bold">
                    <SheetClose asChild>
                      <a href="#feed-simulator" className="hover:text-orange-600 transition-colors py-1">
                        Feed Simulator
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="#pillars" className="hover:text-orange-600 transition-colors py-1">
                        Ecosystem
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="#calculator" className="hover:text-orange-600 transition-colors py-1">
                        Reciprocity Calculator
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="#onboarding" className="hover:text-orange-600 transition-colors py-1">
                        Protocol Onboarding
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/opportunities" className="hover:text-orange-600 transition-colors py-1 border-t border-slate-100 pt-4 text-slate-900 flex items-center justify-between">
                        Explore Feed <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                    </SheetClose>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <Show when="signed-out">
                    <div className="flex flex-col gap-3">
                      <SheetClose asChild>
                        <SignInButton mode="modal" forceRedirectUrl="/opportunities">
                          <button className="w-full text-center text-[10px] font-mono uppercase tracking-widest text-slate-700 border border-slate-200 rounded-[2px] py-2.5 font-bold hover:bg-slate-50 transition-colors">
                            Sign In
                          </button>
                        </SignInButton>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          to="/signup"
                          className="w-full text-center bg-slate-900 hover:bg-orange-600 text-white py-2.5 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm font-bold flex items-center justify-center border border-slate-900"
                        >
                          Sign Up
                        </Link>
                      </SheetClose>
                    </div>
                  </Show>
                  <Show when="signed-in">
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-[2px] border border-slate-100">
                      <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-bold">Session Active</span>
                      <UserAvatarDropdown />
                    </div>
                  </Show>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [pipelineVal, setPipelineVal] = useState(82.4);
  const [matchCount, setMatchCount] = useState(1280);

  // Small live ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineVal((prev) => parseFloat((prev + Math.random() * 0.05).toFixed(2)));
      if (Math.random() > 0.8) {
        setMatchCount((prev) => prev + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-6 md:pt-10 space-y-12">
      {/* Decorative Blur Background Element */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 -right-12 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        {/* Left Heading Content */}
        <div className="lg:col-span-7 space-y-6 text-left">

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] text-slate-950 uppercase">
            OPERATOR-GRADE <br />
            PARTNERSHIP <br />
            <span className="text-orange-600 font-serif italic normal-case tracking-normal">protocol.</span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base max-w-[58ch] leading-relaxed font-sans pt-2">
            The Relay is a double-opt-in transaction and referral ecosystem built exclusively for verified founders, operators, and agencies. No general social feed noise. Only qualified pipelines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
            <Link
              to="/opportunities"
              className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/15 transition-all rounded-[2px] font-bold shadow-sm"
            >
              Enter Dashboard <ArrowRight className="ml-2.5 w-4 h-4" />
            </Link>
            <a
              href="#feed-simulator"
              className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center border border-slate-300 bg-white hover:border-slate-800 text-slate-700 font-mono text-xs uppercase tracking-widest transition-all rounded-[2px] font-bold"
            >
              View Simulator
            </a>
          </div>
        </div>

        {/* Right Live Statistics Dashboard Box */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 p-6 md:p-8 rounded-[4px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-yellow-500 to-emerald-500" />
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
              Network Metrics v1.2
            </div>

          </div>

          <div className="space-y-6">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-[2px] relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Encrouted Pipeline Volume</div>
              <div className="text-3xl font-display font-black text-slate-950 mt-1 flex items-baseline gap-2">
                ₹{pipelineVal.toFixed(2)} Cr
                <span className="text-emerald-600 text-[10px] font-mono font-bold tracking-tight">+14.8% MoM</span>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-12 pointer-events-none opacity-10">
                <svg viewBox="0 0 100 50" className="w-full h-full stroke-emerald-600 stroke-[4] fill-none">
                  <path d="M0,45 Q15,40 30,30 T60,20 T90,5 L100,5" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200/70 rounded-[2px]">
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Relay Match Rate</div>
                <div className="text-xl font-display font-black text-slate-950 mt-1">84.2%</div>
                <div className="text-[8px] font-mono text-slate-400 mt-1">Double Opt-In</div>
              </div>

              <div className="p-4 border border-slate-200/70 rounded-[2px]">
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Active Matches</div>
                <div className="text-xl font-display font-black text-slate-950 mt-1">{matchCount}</div>
                <div className="text-[8px] font-mono text-emerald-600 font-bold mt-1">Vetted Nodes</div>
              </div>
            </div>
            
            <div className="text-[9px] font-mono text-slate-400 text-center uppercase tracking-widest pt-2 border-t border-slate-100">
              ⚡ Verified via LinkedIn & Domain Vetting API
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerSection() {
  const tickerItems = [
    "SaaS Founder in Bengaluru matched with UK Agency for fragile goods logistics",
    "IT Consultant in Germany unlocked DACH regional reseller rights (+15 reputation points)",
    "Verified D2C wellness founder posted package vendor requirement (10k units/month)",
    "Shopify Dev Shop in Mumbai exchanged referral with London SaaS startup",
    "Apex Syndicate verified Node approved from UAE Finance sector"
  ];

  return (
    <section className="w-full border-y border-slate-200/70 py-4 bg-white/50 backdrop-blur-xs overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-orange-600 font-bold uppercase tracking-wider shrink-0 bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded-[2px] text-[10px]">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          Live Ledger
        </span>
        <div className="w-full overflow-hidden relative h-5">
          <div className="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap absolute">
            {tickerItems.concat(tickerItems).map((text, idx) => (
              <span key={idx} className="text-slate-600 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function InteractiveFeedPreview() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filterTypes = ["All", "Partnership", "Referral", "Distribution", "Vendor"];

  const filteredOpps = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesType = selectedType === "All" || opp.type === selectedType;
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleSimulatedAction = (index: number) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  return (
    <section id="feed-simulator" className="space-y-8 border-t border-slate-200 pt-10 md:pt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="font-mono text-[9px] text-orange-600 font-bold uppercase tracking-[0.2em] block">
            [ INTERACTIVE PREVIEW ]
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase leading-none">
            Dynamic Feed Workspace
          </h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Test drive the dashboard feed interface below. Change tabs or type to search and see how opportunities are filtered instantly.
          </p>
        </div>
      </div>

      {/* Simulator Frame */}
      <div className="border border-slate-200 bg-white rounded-[4px] shadow-sm relative overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="font-mono text-[10px] text-slate-400 font-bold ml-2">the_relay_live_feed_preview.exe</span>
          </div>

          <div className="relative w-full max-w-xs sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search by keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 focus:border-slate-800 focus:ring-0 text-xs rounded-[2px] font-mono outline-none"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="px-6 pt-4 border-b border-slate-100 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 border-b-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedType === type
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Opportunities Feed Simulator List */}
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto min-h-[300px]">
          {filteredOpps.length > 0 ? (
            filteredOpps.map((opp, index) => {
              const colorSet = TYPE_COLORS[opp.type] || { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 hover:border-slate-800 p-5 rounded-[4px] transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 relative group"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 border text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] ${colorSet.bg} ${colorSet.text} ${colorSet.border}`}>
                        {opp.type}
                      </span>
                      <span className="font-mono text-[9px] text-slate-400">#NODE-{1000 + index}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display text-base font-extrabold text-slate-950 group-hover:text-orange-600 transition-colors">
                        {opp.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-3xl">
                        {opp.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] text-slate-400 pt-2 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-[2px] bg-slate-100 border border-slate-200 flex items-center justify-center font-sans text-[8px] font-bold text-slate-500 uppercase">
                          {opp.company.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-slate-900 font-bold flex items-center gap-1">
                          {opp.company}
                          <BadgeCheck className="w-3.5 h-3.5 text-white fill-blue-500" />
                        </span>
                      </div>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                        {opp.industry}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-300" />
                        {opp.geo}
                      </span>
                    </div>
                  </div>

                  {/* Actions Right Side */}
                  <div className="md:w-44 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">

                    <button
                      onClick={() => handleSimulatedAction(index)}
                      className={`w-full py-2 px-3 text-[9px] font-mono uppercase tracking-widest text-center transition-all rounded-[2px] font-bold shadow-xs cursor-pointer ${
                        copiedIndex === index 
                          ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                          : "bg-slate-900 text-white hover:bg-orange-600"
                      }`}
                    >
                      {copiedIndex === index ? "Request Logged! ✓" : "Express Interest"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 border border-dashed border-slate-200 rounded-[4px] bg-slate-50/50">
              <HelpCircle className="w-8 h-8 text-slate-300" />
              <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">No matching opportunities found</div>
              <p className="text-slate-600 text-xs max-w-sm">Try modifying your query keywords or changing the category filter tab.</p>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between text-[9px] font-mono text-slate-400 flex-wrap gap-4">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-orange-600" /> 
            Showing {filteredOpps.length} protocol listings in the simulation.
          </span>
          <span className="font-bold text-slate-400 uppercase tracking-wider">• Real contact details require verified network reputation score</span>
        </div>
      </div>
    </section>
  );
}

function ValuePropositions() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
      title: "FOUNDER IDENTITY VERIFICATION",
      description: "Strictly verified membership. We vet each operator via LinkedIn lookup, tax registrar, and company domain to ensure only high-growth operators gain access."
    },
    {
      icon: <Layers className="w-6 h-6 text-orange-600" />,
      title: "DOUBLE OPT-IN PROTECTION",
      description: "Direct contact credentials stay hidden. Warm introductions are triggered only when both nodes review the exchange brief and accept the match."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-orange-600" />,
      title: "GIVE-TO-GET RECIPROCITY",
      description: "Reputation score prevents free-riding. You earn score metrics by responding to listings, making introductions, or sharing verified briefs."
    }
  ];

  return (
    <section id="pillars" className="space-y-8 border-t border-slate-200 pt-10 md:pt-16">
      <div className="max-w-2xl space-y-3">
        <span className="font-mono text-[9px] text-orange-600 font-bold uppercase tracking-[0.2em] block">
          [ DESIGN SYSTEM ]
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase leading-none">
          Ecosystem Guardrails
        </h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          The Relay is structured specifically to minimize noise. Every feature operates around verified mutual interest.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200/80 p-6 md:p-8 space-y-5 rounded-[4px] hover:border-slate-800 transition-all duration-300 flex flex-col justify-between hover:shadow-md"
          >
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 flex items-center justify-center rounded-[2px]">
              {p.icon}
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-xs font-black text-slate-950 uppercase tracking-wider">
                {p.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                {p.description}
              </p>
            </div>
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

  const getTier = (s: number) => {
    if (s < 50) return { name: "Observer Node", color: "text-slate-400 border-slate-300" };
    if (s < 75) return { name: "Verified Operator", color: "text-orange-600 border-orange-300" };
    if (s < 90) return { name: "Elite Partner", color: "text-indigo-600 border-indigo-300" };
    return { name: "Apex Syndicate", color: "text-emerald-600 border-emerald-300" };
  };

  const currentTier = getTier(score);

  return (
    <section id="calculator" className="border-t border-slate-200 pt-10 md:pt-16">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-orange-600 font-bold uppercase tracking-[0.2em] block">
              [ RECIPROCITY SCORE ]
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase leading-none">
              Reputation architect
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Adjust the sliders below to calculate how your network contributions build trust and unlock advanced platform access privileges.
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-6 rounded-[4px] space-y-6 shadow-xs">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-600 font-semibold">Introductions Made (+15 pts)</span>
                <span className="text-orange-600 font-bold">{passed}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={passed}
                onChange={(e) => setPassed(Number(e.target.value))}
                className="w-full accent-orange-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer border-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-600 font-semibold">Vetted Reviews Added (+10 pts)</span>
                <span className="text-orange-600 font-bold">{reviews}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                value={reviews}
                onChange={(e) => setReviews(Number(e.target.value))}
                className="w-full accent-orange-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer border-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-600 font-semibold">Active Listings Posted (+5 pts)</span>
                <span className="text-orange-600 font-bold">{posted}</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={posted}
                onChange={(e) => setPosted(Number(e.target.value))}
                className="w-full accent-orange-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer border-none"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Score card Display */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-5 md:p-8 rounded-[4px] shadow-sm flex flex-col justify-between min-h-[300px] md:min-h-[400px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 flex-wrap gap-4">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                Apex Growth Solutions
                <BadgeCheck className="w-3.5 h-3.5 text-white fill-blue-500" />
              </div>
              <div className="font-display text-xl font-extrabold mt-1 text-slate-950 uppercase">
                Node Trust tier
              </div>
            </div>

            {/* Radial SVG Score Circular Progress */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-[2px]">
              <div className="text-right">
                <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400 block font-bold">Calculated Score</span>
                <span className="font-display text-3xl font-black text-orange-600">{score}</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="3.5" fill="none" />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="hsl(24 95% 45%)"
                    strokeWidth="3.5"
                    fill="none"
                    strokeDasharray="100"
                    strokeDashoffset={100 - score}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Current Tier status block */}
          <div className="my-6 p-4 bg-slate-50 border border-slate-100 rounded-[2px] flex items-center justify-between flex-wrap gap-2">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Current Rating Rank:</span>
            <span className={`px-3 py-1 border text-[10px] font-mono font-bold uppercase tracking-wider rounded-full ${currentTier.color} bg-white shadow-xs`}>
              {currentTier.name}
            </span>
          </div>

          {/* Privileges Level Track */}
          <div className="space-y-4">
            <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">UNLOCKED PRIVILEGES:</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-slate-700 flex-1 min-w-0 break-words md:truncate text-left">Basic Opportunities Feed Browsing</span>
                <span className="ml-auto shrink-0 text-[8px] font-mono px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[2px] font-bold">
                  ACTIVE
                </span>
              </div>
              <div className={`flex items-center gap-3 text-xs font-mono transition-opacity duration-300 ${score >= 50 ? "opacity-100" : "opacity-30"}`}>
                {score >= 50 ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : <Lock className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className="text-slate-700 flex-1 min-w-0 break-words md:truncate text-left">Unlock direct BD Contact Details</span>
                <span className={`ml-auto shrink-0 text-[8px] font-mono px-2 py-0.5 rounded-[2px] font-bold border ${score >= 50 ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-100 border-slate-200 text-slate-400"}`}>
                  {score >= 50 ? "ACTIVE" : "LOCKED"}
                </span>
              </div>
              <div className={`flex items-center gap-3 text-xs font-mono transition-opacity duration-300 ${score >= 75 ? "opacity-100" : "opacity-30"}`}>
                {score >= 75 ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : <Lock className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className="text-slate-700 flex-1 min-w-0 break-words md:truncate text-left">Concierge Matching Priority (Top 15%)</span>
                <span className={`ml-auto shrink-0 text-[8px] font-mono px-2 py-0.5 rounded-[2px] font-bold border ${score >= 75 ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-100 border-slate-200 text-slate-400"}`}>
                  {score >= 75 ? "ACTIVE" : "LOCKED"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[8px] font-mono text-slate-400 mt-6">
            <span>HEALTH STATUS: EXCELLENT</span>
            <span className="text-orange-600 font-bold">MUTUAL RECIPROCITY METRIC DATA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function OnboardingSteps() {
  const steps = [
    {
      title: "Vetting Check",
      desc: "Connect your LinkedIn and specify corporate registration numbers. We manually check business domain authenticity."
    },
    {
      title: "Score Setup",
      desc: "Receive your initial starting reputation score (+30 pts). Activate standard dashboard access."
    },
    {
      title: "Share a Memo",
      desc: "Publish your specific partnership, vendor, or client referral criteria brief into the network."
    },
    {
      title: "Double Opt-In Match",
      desc: "Commence double-opt-in exchanges. Direct contact matches occur when interest is mutually accepted."
    }
  ];

  return (
    <section id="onboarding" className="space-y-8 border-t border-slate-200 pt-10 md:pt-16">
      <div className="max-w-2xl space-y-3">
        <span className="font-mono text-[9px] text-orange-600 font-bold uppercase tracking-[0.2em] block">
          [ PROTOCOL ]
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase leading-none">
          How to Join the Relay
        </h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          Our registration process prioritizes quality verification over speed. Every node onboarding is processed manually.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-6 rounded-[4px] relative space-y-4 hover:border-slate-800 transition-colors">
            <h3 className="font-display text-sm font-extrabold text-slate-950 uppercase tracking-tight">
              {s.title}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border border-slate-200 bg-slate-900 text-white p-8 sm:p-14 rounded-[4px] text-center space-y-6 max-w-7xl mx-auto shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="space-y-4 max-w-3xl mx-auto relative z-10">
        <span className="font-mono text-[9px] text-orange-500 font-bold uppercase tracking-[0.2em] block">
          [ PIPELINE ONBOARDING ]
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-none">
          Gain Verified Network Momentum
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Application takes 3 minutes. Every operator profile goes through standard manual identity checks to guarantee 100% spam-free match-making.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
        <Link
          to="/signup"
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center bg-orange-600 text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-700 hover:shadow-lg transition-all rounded-[2px] font-bold"
        >
          Create Vetted Account
        </Link>
        <Link
          to="/opportunities"
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all rounded-[2px] font-bold"
        >
          Explore Live Board
        </Link>
      </div>

      <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest pt-4 relative z-10">
        Setup in under 5 minutes · Manual verification within 24 hours
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-10 md:pt-16 border-t border-slate-200/80 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
      <div className="space-y-3">
        <Link
          to="/home"
          className="font-display font-extrabold text-xl uppercase tracking-tighter text-slate-950 flex items-center gap-2"
        >
          <span className="w-6 h-6 bg-slate-900 flex items-center justify-center text-white text-[11px] font-mono tracking-normal font-semibold rounded-[2px]">
            R
          </span>
          <span>The Relay</span>
        </Link>
        <div className="text-xs text-slate-500 max-w-[42ch] leading-relaxed">
          Where growth finds momentum. A high-contrast, Swiss-inspired, curated operator network.
        </div>
      </div>
      
      <div className="flex flex-col md:items-end gap-3">
        <div className="flex gap-6 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
          <Link to="/opportunities" className="hover:text-orange-600 transition-colors">
            Opportunities Feed
          </Link>
          <a href="#feed-simulator" className="hover:text-orange-600 transition-colors">
            Simulator
          </a>
          <a href="#pillars" className="hover:text-orange-600 transition-colors">
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
