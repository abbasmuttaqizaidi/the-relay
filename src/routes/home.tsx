import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Show } from "@clerk/tanstack-react-start";
import {
  ArrowRight,
  ShieldCheck,
  Check,
  Lock,
  Calendar,
  MapPin,
  Search,
  Clock,
  ArrowDown,
  Play,
  UserCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HowItWorksModal } from "@/components/how-it-works-modal";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "The Relay — Find Businesses Actively Looking For What You Offer" },
      {
        name: "description",
        content:
          "Discover real partnership, referral, distribution, vendor, and hiring opportunities from verified businesses — without the noise of social media",
      },
      {
        property: "og:title",
        content: "The Relay — Find Businesses Actively Looking For What You Offer",
      },
      {
        property: "og:description",
        content:
          "Discover real partnership, referral, distribution, vendor, and hiring opportunities from verified businesses — without the noise of social media",
      },
    ],
  }),
  component: Landing,
});

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Landing() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleTourEvent = () => {
      const driverObj = driver({
        showProgress: true,
        popoverClass: "relay-tour-popover",
        steps: [
          {
            element: "#home-hero-section",
            popover: {
              title: "Welcome to The Relay",
              description:
                "Discover active business opportunities from verified companies looking for what you offer.",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "#how-it-works",
            popover: {
              title: "Double Opt-In Mechanics",
              description:
                "Learn how structured double-opt-in handshakes keep introductions high-quality and spam-free.",
              side: "top",
              align: "center",
            },
          },
        ],
      });
      driverObj.drive();
    };
    window.addEventListener("relay:start-tour:home", handleTourEvent);
    return () => {
      window.removeEventListener("relay:start-tour:home", handleTourEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-orange-600 selection:text-white font-sans antialiased overflow-x-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(hsl(215 25% 12% / 0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 md:space-y-16 relative pb-16 pt-3 sm:pt-4 md:pt-6">
        {/* Section 1: Hero */}
        <HeroSection onWatchHowItWorks={() => setIsVideoModalOpen(true)} />

        {/* Section 2: Editorial Manifesto Banner */}
        <ManifestoBanner />

        {/* Section 3: The Core Value (Comparison) */}
        <CoreValueSection />

        {/* Section 4: What Can You Find on Relay? */}
        <CategoriesSection />

        {/* Section 5: How Relay Works */}
        <HowItWorksSection />

        {/* Section 6: Why Double Opt-In? */}
        <DoubleOptInSection />

        {/* Section 7: Two Sides of the Market */}
        <TwoSidesSection />

        {/* Section 8: Why Businesses Return */}
        <ReturnDemandSection />

        {/* Section 9: Final CTA */}
        <FinalCtaSection />

        {/* Section 10: FAQ */}
        <FaqSection />

        {/* Section 11: Footer */}
        <Footer />
      </main>

      {/* Interactive Video Walkthrough Modal */}
      <HowItWorksModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  );
}

/* ==================================================
   SECTION 1 — HERO
   ================================================== */
function HeroSection({ onWatchHowItWorks }: { onWatchHowItWorks: () => void }) {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="home-hero-section"
      ref={ref}
      className={`pt-4 sm:pt-8 md:pt-10 pb-2 sm:pb-4 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 sm:space-y-5">
        <h1 className="font-display text-[35px] xs:text-[42px] sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight leading-[1.08] text-slate-950">
          Find businesses that are actively looking for what you offer.
        </h1>

        <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Discover real partnership, vendor, and growth opportunities from verified businesses —
          with{" "}
          <span className="bg-orange-500/10 text-orange-600 py-0.5 px-1.5 rounded-[2px] font-medium inline-block">
            100% manual human approval (no AI)
          </span>{" "}
          and{" "}
          <span className="bg-orange-500/10 text-orange-600 py-0.5 px-1.5 rounded-[2px] font-medium inline-block">
            no unnecessary noise
          </span>
          .
        </p>

        <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-medium leading-normal max-w-xl mx-auto">
          See what businesses need · Respond with what you can offer · Connect when both sides agree
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 pt-1 sm:pt-2">
        {/* Buttons on mobile: Primary on top, Secondary side-by-side */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
          <Link
            to="/opportunities"
            className="h-11 sm:h-12 w-full sm:w-auto px-6 sm:px-8 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 rounded-[3px] font-bold shadow-xs cursor-pointer"
          >
            Explore Opportunities <ArrowRight className="ml-2 w-4 h-4" />
          </Link>

          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={onWatchHowItWorks}
              className="h-11 sm:h-12 w-full sm:w-auto px-3 sm:px-6 inline-flex items-center justify-center gap-1.5 sm:gap-2 border border-slate-300 bg-white hover:border-orange-500 hover:text-orange-600 text-slate-800 font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 rounded-[3px] font-bold cursor-pointer text-center whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-orange-600 text-orange-600 shrink-0" />
              <span>How It Works</span>
            </button>

            <Show when="signed-out">
              <Link
                to="/signup"
                className="h-11 sm:h-12 w-full sm:w-auto px-3 sm:px-8 inline-flex items-center justify-center border border-slate-300 bg-white hover:border-slate-800 text-slate-800 font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 rounded-[3px] font-bold cursor-pointer text-center whitespace-nowrap"
              >
                Apply for Access
              </Link>
            </Show>

            <Show when="signed-in">
              <Link
                to="/onboarding"
                className="h-11 sm:h-12 w-full sm:w-auto px-3 sm:px-8 inline-flex items-center justify-center border border-slate-300 bg-white hover:border-slate-800 text-slate-800 font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 rounded-[3px] font-bold cursor-pointer text-center whitespace-nowrap"
              >
                Manage Profile
              </Link>
            </Show>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 2 — EDITORIAL MANIFESTO BANNER
   ================================================== */
function ManifestoBanner() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      aria-label="Platform Philosophy"
      className={`border-y border-slate-200/90 py-7 sm:py-12 md:py-14 text-center max-w-4xl mx-auto px-4 space-y-2.5 sm:space-y-4 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-slate-950 leading-[1.18]">
        “Built for business outcomes, not engagement.”
      </h2>
      <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
        <span className="sm:hidden">No vanity metrics. Just verified commercial demand.</span>
        <span className="hidden sm:inline">
          No vanity metrics. No algorithm games. No unsolicited pitch spam. Just verified commercial
          demand and direct, high-intent introductions.
        </span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-6 text-[10px] sm:text-xs font-mono text-slate-500 font-semibold tracking-wide pt-1">
        <span>• No Public Feed</span>
        <span>• 100% Human Audited</span>
        <span>• Mutual Opt-In Only</span>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 3 — THE CORE VALUE (Comparison)
   ================================================== */
function CoreValueSection() {
  const { ref, isVisible } = useReveal();
  const [activeSlide, setActiveSlide] = useState(0);

  const traditionalSteps = [
    "Search businesses",
    "Find someone relevant",
    "Send cold message",
    "Wait",
    "Follow up",
    "Maybe get a response",
  ];

  const relaySteps = [
    "Find an active opportunity",
    "See what the business needs",
    "Show what you can offer",
    "Business reviews your interest",
    "Both sides agree",
    "Introduction",
  ];

  return (
    <section
      ref={ref}
      aria-label="Core Value Proposition"
      className={`transition-all duration-700 space-y-4 sm:space-y-8 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto px-2">
        <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded-[2px]">
          The Fundamental Shift
        </span>
        <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-black tracking-tight text-slate-950 leading-snug sm:leading-tight">
          Stop searching for businesses. Find business demand.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Traditional networking starts with people. Relay starts with what a business actually
          needs.
        </p>
      </div>

      {/* Mobile Segmented Switcher Tab */}
      <div className="md:hidden flex justify-center pt-0.5">
        <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200/80 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`px-3.5 py-1 text-xs font-mono font-bold rounded-full transition-all cursor-pointer ${
              activeSlide === 0
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Traditional
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`px-3.5 py-1 text-xs font-mono font-bold rounded-full transition-all cursor-pointer ${
              activeSlide === 1
                ? "bg-orange-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            The Relay
          </button>
        </div>
      </div>

      {/* Desktop side-by-side grid, Mobile clean tab switch */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Mobile View: Shows active tab smoothly */}
        <div className="md:hidden">
          {activeSlide === 0 ? (
            /* Traditional Card */
            <div className="w-full bg-slate-100/90 border border-slate-200/90 p-4.5 rounded-[4px] space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                  Traditional Outreach
                </span>
                <h3 className="font-display text-sm font-bold text-slate-800">
                  Starts with: “Who should I contact?”
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Blind searching, unverified interest, and cold inboxes that rarely convert.
                </p>
              </div>

              <div className="space-y-1.5">
                {traditionalSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-600 bg-white/80 border border-slate-200/60 px-3 py-1.5 rounded-[2px]"
                  >
                    <span className="font-mono text-[10px] text-slate-400 font-bold w-4 shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="leading-tight">{step}</span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider pt-2 border-t border-slate-200">
                Result: Low outcome, high friction
              </div>
            </div>
          ) : (
            /* The Relay Card */
            <div className="w-full bg-white border-2 border-slate-900 p-4.5 rounded-[4px] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-orange-600 font-bold block">
                  The Relay
                </span>
                <h3 className="font-display text-sm font-bold text-slate-950">
                  Starts with: “What business is already looking for what I offer?”
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Intent-driven discovery where active commercial briefs are already waiting for you.
                </p>
              </div>

              <div className="space-y-1.5">
                {relaySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-900 bg-slate-50 border border-slate-200/90 px-3 py-1.5 rounded-[2px] font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="leading-tight">{step}</span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider font-bold pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Result: Warm introductions based on mutual agreement
              </div>
            </div>
          )}
        </div>

        {/* Desktop View: Side-by-Side Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Traditional Outreach */}
          <div className="bg-slate-100/90 border border-slate-200/90 p-6 rounded-[4px] space-y-5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                Traditional Outreach
              </span>
              <h3 className="font-display text-base font-bold text-slate-800">
                Starts with: “Who should I contact?”
              </h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Blind searching, unverified interest, and cold inboxes that rarely convert.
              </p>
            </div>

            <div className="space-y-2">
              {traditionalSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-slate-600 bg-white/80 border border-slate-200/60 px-3 py-2 rounded-[2px]"
                >
                  <span className="font-mono text-[10px] text-slate-400 font-bold w-4 shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="leading-tight">{step}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider pt-2 border-t border-slate-200">
              Result: Low outcome, high friction
            </div>
          </div>

          {/* The Relay */}
          <div className="bg-white border-2 border-slate-900 p-6 rounded-[4px] space-y-5 flex flex-col justify-between shadow-xs">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-orange-600 font-bold block">
                The Relay
              </span>
              <h3 className="font-display text-base font-bold text-slate-950">
                Starts with: “What business is already looking for what I offer?”
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Intent-driven discovery where active commercial briefs are already waiting for you.
              </p>
            </div>

            <div className="space-y-2">
              {relaySteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-slate-900 bg-slate-50 border border-slate-200/90 px-3 py-2 rounded-[2px] font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="leading-tight">{step}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider font-bold pt-2 border-t border-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Result: Warm introductions based on mutual agreement
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 4 — WHAT CAN YOU FIND ON RELAY?
   ================================================== */
function CategoriesSection() {
  const { ref, isVisible } = useReveal();
  const [activeCategory, setActiveCategory] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      badge: "Co-Marketing & Tech",
      title: "Strategic Partnerships",
      desc: "Form complementary alliances to build joint product integrations or shared go-to-market bundles.",
      demand: "B2B SaaS seeking CRM integration & reciprocal co-selling partner",
      signal: "Active Demand",
      tags: ["Joint GTM", "Integration", "Co-Selling"],
    },
    {
      badge: "Revenue Share",
      title: "Referral Networks",
      desc: "Exchange pre-vetted customer leads and deal flow with non-competing firms targeting your ideal buyers.",
      demand: "Product design studio exchanging enterprise clients with Shopify developers",
      signal: "Verified Partners",
      tags: ["15-20% Rev Share", "Reciprocal Flow", "Warm Intros"],
    },
    {
      badge: "Channel Sales",
      title: "Distribution & Channel",
      desc: "Connect with software resellers, localized distributors, or trusted channel sales partners.",
      demand: "Cybersecurity vendor seeking certified enterprise reseller across UK & EU",
      signal: "Regional Reach",
      tags: ["Resellers", "VARs & MSPs", "Global Scale"],
    },
    {
      badge: "Active RFPs",
      title: "Vendor Procurement",
      desc: "Discover verified companies with allocated budgets who are actively seeking products and services.",
      demand: "Series B logistics operator evaluating SOC2 compliance & audit firms",
      signal: "Defined Budget",
      tags: ["Direct Buyer", "Verified Budget", "Immediate Need"],
    },
    {
      badge: "Fractional & Board",
      title: "Specialized Advisory",
      desc: "Access specialized fractional leadership, strategic advisors, or critical operator capacity.",
      demand: "AI robotics scale-up looking for fractional Chief Revenue Officer (CRO)",
      signal: "High Impact",
      tags: ["Fractional C-Suite", "Advisory Equity", "Key Operators"],
    },
    {
      badge: "Strategic Growth",
      title: "Joint Ventures & Expansion",
      desc: "Explore shared business entities, new market entry agreements, or strategic alliances.",
      demand: "E-commerce logistics firm seeking local joint venture partner for LATAM entry",
      signal: "Strategic Alliance",
      tags: ["Joint Venture", "Shared Entity", "Long-Term"],
    },
  ];

  const scrollToCategory = (idx: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const target = container.children[idx] as HTMLElement | undefined;
    if (target) {
      container.scrollTo({
        left: target.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
    setActiveCategory(idx);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPos = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.75;
    const newIdx = Math.round(scrollPos / itemWidth);
    if (newIdx !== activeCategory && newIdx >= 0 && newIdx < categories.length) {
      setActiveCategory(newIdx);
    }
  };

  return (
    <section
      ref={ref}
      aria-label="Commercial Categories"
      className={`space-y-5 sm:space-y-7 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Section Header */}
      <div className="space-y-1.5 sm:space-y-2 text-center max-w-2xl mx-auto px-2">
        <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded-[2px]">
          Commercial Categories
        </span>
        <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-black tracking-tight text-slate-950 leading-snug sm:leading-tight">
          Opportunities worth acting on.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-xl mx-auto">
          Built around how modern businesses actually collaborate, partner, and trade demand.
        </p>
      </div>

      {/* Grid on Desktop, Horizontal Snap Slider on Mobile */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-3.5 sm:gap-4 md:gap-5 w-full max-w-6xl mx-auto py-1 md:py-0 pb-3 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-auto sm:px-0 md:mx-auto md:px-0"
      >
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="w-[84vw] sm:w-[340px] md:w-full shrink-0 md:shrink snap-center md:snap-align-none group bg-white border border-slate-200/90 hover:border-slate-900 rounded-[4px] p-4 sm:p-5.5 space-y-3 shadow-md shadow-slate-200/80 md:shadow-xs hover:shadow-lg hover:shadow-slate-300/60 transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top Row: Index + Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold text-slate-400">
                  0{idx + 1}
                </span>
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/90 px-2 py-0.5 rounded-[2px]">
                  {cat.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display text-sm sm:text-base font-bold text-slate-950 group-hover:text-orange-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed mt-1">
                  {cat.desc}
                </p>
              </div>
            </div>

            {/* Live Demand Preview Card */}
            <div className="bg-slate-50/90 border border-slate-200/70 rounded-[4px] p-2.5 sm:p-3 space-y-1.5 group-hover:bg-orange-50/30 group-hover:border-orange-200/60 transition-colors">
              <div className="flex items-center justify-between text-[9.5px] font-mono">
                <span className="text-slate-400 font-bold uppercase tracking-wider">
                  Live Opportunity Brief
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {cat.signal}
                </span>
              </div>
              <p className="text-[11.5px] sm:text-xs font-semibold text-slate-900 font-sans leading-snug">
                “{cat.demand}”
              </p>
            </div>

            {/* Bottom Metadata Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              {cat.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="font-mono text-[9px] sm:text-[9.5px] px-1.5 py-0.5 rounded-[2px] bg-slate-100 text-slate-600 font-medium group-hover:bg-slate-200/80 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slide Dot Indicators */}
      <div className="md:hidden flex items-center justify-center gap-1.5 pt-0.5">
        {categories.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToCategory(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              activeCategory === idx ? "w-5 bg-orange-600" : "w-1.5 bg-slate-300"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 5 — HOW RELAY WORKS
   ================================================== */
function HowItWorksSection() {
  const { ref, isVisible } = useReveal();

  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Find an opportunity that matches what your business can offer.",
    },
    {
      num: "02",
      title: "Express Interest",
      desc: "Tell the opportunity owner why your business is a good fit.",
    },
    {
      num: "03",
      title: "Review",
      desc: "The business evaluates your interest and decides whether to connect.",
    },
    {
      num: "04",
      title: "Handshake",
      desc: "Both sides agree to the introduction.",
    },
    {
      num: "05",
      title: "Connect",
      desc: "Contact information is shared and the businesses continue the conversation directly.",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      aria-label="Structured Workflow"
      className={`space-y-5 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-1.5 sm:space-y-2 text-center max-w-3xl mx-auto px-2">
        <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded-[2px]">
          Structured Workflow
        </span>
        <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-black tracking-tight text-slate-950 leading-snug sm:leading-tight">
          From opportunity to introduction.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-xl mx-auto">
          Relay keeps the process structured so businesses can explore opportunities without opening
          themselves up to unwanted outreach.
        </p>
      </div>

      {/* Mobile & Tablet: Connected Vertical Timeline Stepper */}
      <div className="lg:hidden bg-white border border-slate-200/90 rounded-[4px] p-4 sm:p-6 shadow-xs max-w-lg mx-auto">
        <div className="space-y-1 relative">
          {steps.map((s, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <div key={idx} className="relative flex items-start gap-3.5">
                {/* Left Number Badge & Continuous Connector Line */}
                <div className="flex flex-col items-center shrink-0 self-stretch">
                  <span className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-mono text-[10px] font-black flex items-center justify-center shrink-0 z-10 shadow-2xs">
                    {s.num}
                  </span>
                  {!isLast && (
                    <div className="w-[1.5px] bg-slate-200 flex-1 my-1 rounded-full" />
                  )}
                </div>

                {/* Right Step Content */}
                <div className={isLast ? "pt-0.5" : "pt-0.5 pb-4"}>
                  <h3 className="font-display text-sm font-bold text-slate-950">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed mt-0.5">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: 5-Column Progression Grid */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-[4px] p-5 space-y-2.5 flex flex-col justify-between shadow-xs hover:border-slate-800 transition-colors"
          >
            <div className="space-y-2">
              <span className="font-mono text-xs text-orange-600 font-extrabold block">
                {s.num}
              </span>
              <h3 className="font-display text-base font-bold text-slate-950">{s.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans pt-2 border-t border-slate-100">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 6 — WHY DOUBLE OPT-IN?
   ================================================== */
function DoubleOptInSection() {
  const { ref, isVisible } = useReveal();

  const flowSteps = [
    "You discover an opportunity",
    "You express interest",
    "The business reviews your pitch",
    "They accept",
    "Handshake Complete",
    "Contact details become available",
  ];

  return (
    <section
      ref={ref}
      className={`space-y-5 sm:space-y-8 max-w-4xl mx-auto text-center transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-2 sm:space-y-3">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Mutual Consent Protocol
        </span>
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Connect when both sides want to.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
          Your contact information stays private until an opportunity owner accepts your interest.
        </p>
      </div>

      {/* Visual Flow Container */}
      <div className="bg-white border border-slate-200 p-4 sm:p-7 rounded-[4px] space-y-4 sm:space-y-6 shadow-xs">
        {/* Desktop: Horizontal steps with ArrowRight */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold text-slate-800">
          {flowSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-[2px]">
                {step}
              </span>
              {idx < flowSteps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Numbered structured cards showing clear progression */}
        <div className="sm:hidden space-y-2 text-left max-w-sm mx-auto">
          {flowSteps.map((step, idx) => {
            const isLast = idx === flowSteps.length - 1;
            const isHandshake = idx === 4;
            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[3px] border ${
                  isHandshake
                    ? "bg-emerald-50/80 border-emerald-300/80 text-emerald-950"
                    : "bg-slate-50 border-slate-200/80 text-slate-800"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full border text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                    isHandshake
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="text-xs font-mono font-semibold leading-tight flex-1">
                  {step}
                </span>
                {isHandshake && (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {!isLast && !isHandshake && (
                  <ArrowDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-600 max-w-xl mx-auto font-sans leading-relaxed pt-2 border-t border-slate-100">
          No cold contact exchange. No unsolicited outreach. The introduction happens only when
          there is mutual interest.
        </p>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 7 — TWO SIDES OF THE MARKET
   ================================================== */
function TwoSidesSection() {
  const { ref, isVisible } = useReveal();
  const [activeSide, setActiveSide] = useState<"need" | "offer">("need");

  const needItems = [
    "Need a distribution partner",
    "Looking for a vendor",
    "Need referral partners",
    "Hiring for a specific role",
    "Looking for a strategic business partner",
  ];

  const offerItems = [
    "We provide development services",
    "We have distribution capability",
    "We serve a specific customer segment",
    "We can provide referrals",
    "We have specialist expertise",
  ];

  return (
    <section
      ref={ref}
      className={`space-y-5 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-2 sm:space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Two-Way Participation
        </span>
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Whether you need something or have something to offer, Relay works both ways.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Businesses create opportunities and businesses discover them.
        </p>
      </div>

      {/* Mobile Interactive Segmented Switcher & Inline Card */}
      <div className="md:hidden space-y-3.5 max-w-lg mx-auto">
        {/* Toggle Pills */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-[4px] border border-slate-200/80 text-xs font-mono font-bold shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveSide("need")}
            className={`py-2 px-3 rounded-[3px] transition-all cursor-pointer text-center ${
              activeSide === "need"
                ? "bg-slate-950 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            I Need Something
          </button>
          <button
            type="button"
            onClick={() => setActiveSide("offer")}
            className={`py-2 px-3 rounded-[3px] transition-all cursor-pointer text-center ${
              activeSide === "offer"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            I Can Offer...
          </button>
        </div>

        {/* Inline Card Content on Mobile */}
        {activeSide === "need" ? (
          <div className="bg-white border border-slate-200/90 p-5 rounded-[4px] space-y-4 shadow-xs">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-orange-600 font-bold block">
                Demand Creator
              </span>
              <h3 className="font-display text-lg font-extrabold text-slate-950">
                “I need something.”
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Post requirements to connect with verified partners.
              </p>
            </div>

            <ul className="space-y-2 pt-1 border-t border-slate-100">
              {needItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/opportunities"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-[3px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Post an Opportunity <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 p-5 rounded-[4px] space-y-4 shadow-xs">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 font-bold block">
                Opportunity Discoverer
              </span>
              <h3 className="font-display text-lg font-extrabold text-slate-950">
                “I can offer something.”
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Discover commercial briefs matching your business capabilities.
              </p>
            </div>

            <ul className="space-y-2 pt-1 border-t border-slate-100">
              {offerItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/opportunities"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-[3px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Find Opportunities <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Desktop Side-by-Side Cards (hidden md:grid) */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Panel 1 */}
        <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-[4px] space-y-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-orange-600 font-bold block">
              Demand Creator
            </span>
            <h3 className="font-display text-xl font-extrabold text-slate-950">
              “I need something.”
            </h3>
            <ul className="space-y-2.5">
              {needItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/opportunities"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-[2px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Post an Opportunity <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Panel 2 */}
        <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-[4px] space-y-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-600 font-bold block">
              Opportunity Discoverer
            </span>
            <h3 className="font-display text-xl font-extrabold text-slate-950">
              “I can offer something.”
            </h3>
            <ul className="space-y-2.5">
              {offerItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/opportunities"
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-mono text-xs uppercase tracking-widest font-bold rounded-[2px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Find Opportunities <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 8 — WHY BUSINESSES RETURN
   ================================================== */
function ReturnDemandSection() {
  const { ref, isVisible } = useReveal();

  const timelineItems = [
    {
      time: "Today",
      title: "Looking for a distribution partner.",
      category: "Distribution",
      meta: "GCC / Regional Resellers",
    },
    {
      time: "Tomorrow",
      title: "Looking for a referral agency.",
      category: "Referral",
      meta: "E-Commerce / B2B SaaS",
    },
    {
      time: "Next week",
      title: "Looking for a technology vendor.",
      category: "Vendor",
      meta: "API Engineering & Architecture",
    },
  ];

  return (
    <section
      ref={ref}
      className={`space-y-5 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-2 sm:space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Dynamic Deal Flow
        </span>
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Your next opportunity may already be waiting.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Relay is built around active business demand. New opportunities create new reasons to come
          back.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 max-w-5xl mx-auto">
        {timelineItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-[4px] p-4 sm:p-5 space-y-2.5 sm:space-y-3 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-orange-600 uppercase font-bold tracking-widest block">
                {item.time}
              </span>
              <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                “{item.title}”
              </h3>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-2">
              <span className="uppercase font-semibold">{item.category}</span>
              <span>{item.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 9 — FINAL CTA
   ================================================== */
function FinalCtaSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-8 sm:py-10 md:py-12 bg-slate-900 text-white rounded-[4px] p-5 sm:p-10 text-center space-y-4 sm:space-y-5 max-w-5xl mx-auto border border-slate-800 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
          What is your business looking for?
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Find opportunities from verified businesses — or post what you need and let the right
          businesses discover you.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center pt-2">
        <Link
          to="/opportunities"
          className="h-11 sm:h-12 w-full sm:w-auto px-7 sm:px-8 inline-flex items-center justify-center bg-white text-slate-950 font-mono text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors rounded-[3px] font-bold shadow-xs cursor-pointer"
        >
          Explore Opportunities <ArrowRight className="ml-2 w-4 h-4" />
        </Link>

        <Show when="signed-out">
          <Link
            to="/signup"
            className="h-11 sm:h-12 w-full sm:w-auto px-7 sm:px-8 inline-flex items-center justify-center border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-widest transition-colors rounded-[3px] font-bold cursor-pointer"
          >
            Apply for Access
          </Link>
        </Show>
      </div>

      <p className="text-[11px] sm:text-xs text-slate-400 font-sans">
        Relay is for operating businesses looking for real commercial opportunities.
      </p>
    </section>
  );
}

/* ==================================================
   SECTION 10 — FAQ
   ================================================== */
function FaqSection() {
  const { ref, isVisible } = useReveal();

  const faqs = [
    {
      q: "What is The Relay?",
      a: "The Relay is a verified B2B opportunity network where operating businesses discover and post active commercial needs, including partnerships, customer referrals, distribution channels, vendors, and hiring.",
    },
    {
      q: "Who can join?",
      a: "Operating businesses, founders, agencies, consultancies, and operators with an active, verifiable business domain and corporate registration.",
    },
    {
      q: "Are businesses approved by AI or humans?",
      a: "100% manually by human operators — never by AI. We do not use automated AI scripts or bot approvals. Every single business application is reviewed by our operations team to confirm authentic company domains, active websites, and operating legitimacy before access is granted.",
    },
    {
      q: "What kinds of opportunities can I find?",
      a: "The platform supports structured opportunities across five core categories: Partnerships, Referral Partners, Distribution, Vendors, and Hiring.",
    },
    {
      q: "Can I post my own opportunity?",
      a: "Yes. Once your business profile is approved, you can create structured opportunity briefs specifying your exact requirements, terms, and location preferences.",
    },
    {
      q: "How does Express Interest work?",
      a: "When you find an opportunity matching what you offer, you submit a brief pitch explaining your fit. The opportunity owner reviews your submission confidentially.",
    },
    {
      q: "When is contact information shared?",
      a: "Contact information stays private until both sides agree to connect. Once the opportunity owner accepts your pitch, the handshake unlocks direct email addresses for both companies.",
    },
    {
      q: "Does Relay have messaging?",
      a: "No. Once both parties agree to the introduction, Relay provides unlocked verified business emails and pre-drafted context so you can continue the conversation directly in your own email client.",
    },
    {
      q: "What do you mean by 'No Unnecessary Noise'?",
      a: "It means zero junk postings, zero unsolicited DMs, and zero social media clutter. Opportunities cannot be vague promotional spam or low-quality job/referral ads—they must follow a structured commercial brief. Furthermore, direct messaging is disabled until both businesses explicitly agree to connect, protecting you from cold sales DMs.",
    },
    {
      q: "Is Relay a social network?",
      a: "No. There are no social feeds, public follower counts, likes, or vanity metrics. Every interaction revolves around a concrete commercial brief.",
    },
    {
      q: "Is Relay free?",
      a: "Browsing active opportunities and applying for membership access is free for verified operating businesses.",
    },
  ];

  return (
    <section
      id="faq"
      ref={ref}
      className={`space-y-5 sm:space-y-8 max-w-3xl mx-auto transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-2 sm:space-y-3 text-center">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Got Questions?
        </span>
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Questions, answered.
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-slate-200 rounded-[4px] bg-white px-3.5 sm:px-4 shadow-2xs"
          >
            <AccordionTrigger className="text-left font-display font-bold text-xs sm:text-base text-slate-900 py-3 sm:py-3.5 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1 pb-3 sm:pb-3.5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ==================================================
   SECTION 11 — FOOTER
   ================================================== */
function Footer() {
  return (
    <footer className="pt-6 sm:pt-8 pb-10 sm:pb-12 border-t border-slate-200/80 max-w-7xl mx-auto flex flex-col md:flex-row gap-5 sm:gap-6 justify-between items-center text-center md:text-left">
      <div className="space-y-1">
        <Link
          to="/home"
          className="font-display font-extrabold text-base uppercase tracking-tight text-slate-950 flex items-center justify-center md:justify-start gap-2"
        >
          <span className="w-5 h-5 bg-slate-900 flex items-center justify-center text-white text-[10px] font-mono rounded-[2px]">
            R
          </span>
          <span>The Relay</span>
        </Link>
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          Real Businesses. Real Opportunities. Real Growth.
        </div>
      </div>

      <div className="flex flex-wrap gap-3.5 sm:gap-5 justify-center text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
        <Link to="/opportunities" className="hover:text-slate-950 transition-colors py-1">
          Opportunities
        </Link>
        <a href="#how-it-works" className="hover:text-slate-950 transition-colors py-1">
          How It Works
        </a>
        <Link to="/signup" className="hover:text-slate-950 transition-colors py-1">
          Apply for Access
        </Link>
        <Link to="/home" className="hover:text-slate-950 transition-colors py-1">
          About
        </Link>
        <a href="#faq" className="hover:text-slate-950 transition-colors py-1">
          FAQ
        </a>
        <Link to="/home" className="hover:text-slate-950 transition-colors py-1">
          Privacy
        </Link>
        <Link to="/home" className="hover:text-slate-950 transition-colors py-1">
          Terms
        </Link>
      </div>
    </footer>
  );
}
