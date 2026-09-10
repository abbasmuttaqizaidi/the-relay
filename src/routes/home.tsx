import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Show } from "@clerk/tanstack-react-start";
import {
  ArrowRight,
  ShieldCheck,
  Check,
  Lock,
  Users,
  Layers,
  Handshake,
  Repeat,
  Briefcase,
  Calendar,
  MapPin,
  BadgeCheck,
  Search,
  Building2,
  Clock,
  Sparkles,
  ArrowDown,
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10 md:space-y-14 relative pb-16 pt-2 sm:pt-3 md:pt-4">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: The Core Value (Comparison) */}
        <CoreValueSection />

        {/* Section 3: What Can You Find on Relay? */}
        <CategoriesSection />

        {/* Section 4: How Relay Works */}
        <HowItWorksSection />

        {/* Section 5: Trust & Verification */}
        <TrustVerificationSection />

        {/* Section 6: Why Double Opt-In? */}
        <DoubleOptInSection />

        {/* Section 7: Two Sides of the Market */}
        <TwoSidesSection />

        {/* Section 8: Why Businesses Return */}
        <ReturnDemandSection />

        {/* Section 9: Outcome-Focused Section */}
        <OutcomesSection />

        {/* Section 10: Final CTA */}
        <FinalCtaSection />

        {/* Section 11: FAQ */}
        <FaqSection />

        {/* Section 12: Footer */}
        <Footer />
      </main>
    </div>
  );
}

/* ==================================================
   SECTION 1 — HERO
   ================================================== */
function HeroSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="home-hero-section"
      ref={ref}
      className={`pt-7 sm:pt-8 md:pt-10 pb-2 sm:pb-4 max-w-4xl mx-auto text-center space-y-5 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3.5 sm:space-y-5">
        <h1 className="font-display text-[40px] xs:text-[45px] sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-slate-950">
          Find businesses that are actively looking for what you offer.
        </h1>

        <p className="text-slate-600 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Discover real partnership, vendor, and growth opportunities from verified businesses —
          with{" "}
          <span className="bg-orange-500/10 text-orange-600 py-0.5 px-1.5 rounded-[2px] font-medium">
            100% manual human approval (no AI)
          </span>{" "}
          and{" "}
          <span className="bg-orange-500/10 text-orange-600 py-0.5 px-1.5 rounded-[2px] font-medium">
            no unnecessary noise
          </span>
          .
        </p>

        <p className="text-[9.5px] xs:text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-medium">
          See what businesses need · Respond with what you can offer · Connect when both sides agree
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 pt-1 sm:pt-2">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center">
          <Link
            to="/opportunities"
            className="h-11 sm:h-12 w-full sm:w-auto px-6 sm:px-8 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 rounded-[3px] font-bold shadow-xs cursor-pointer"
          >
            Explore Opportunities <ArrowRight className="ml-2 w-4 h-4" />
          </Link>

          <Show when="signed-out">
            <Link
              to="/signup"
              className="h-11 sm:h-12 w-full sm:w-auto px-6 sm:px-8 inline-flex items-center justify-center border border-slate-300 bg-white hover:border-slate-800 text-slate-800 font-mono text-xs uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 rounded-[3px] font-bold cursor-pointer"
            >
              Apply for Access
            </Link>
          </Show>

          <Show when="signed-in">
            <Link
              to="/onboarding"
              className="h-11 sm:h-12 w-full sm:w-auto px-6 sm:px-8 inline-flex items-center justify-center border border-slate-300 bg-white hover:border-slate-800 text-slate-800 font-mono text-xs uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 rounded-[3px] font-bold cursor-pointer"
            >
              Manage Business Profile
            </Link>
          </Show>
        </div>

        {/* Main Screen Highlight Cards (Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5 text-left pt-1 max-w-3xl mx-auto w-full">
          {/* Card 1: No Unnecessary Noise */}
          <div className="bg-orange-50/70 border border-orange-200/90 rounded-[4px] p-2.5 sm:p-3.5 shadow-2xs transition-all hover:border-orange-300">
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <h3 className="font-display font-bold text-xs sm:text-sm text-slate-950">
                No Unnecessary Noise
              </h3>
              <span className="ml-auto font-mono text-[9px] text-orange-800 font-bold uppercase tracking-wider bg-orange-100 px-1.5 py-0.5 rounded-[2px]">
                Zero Spam
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-sans leading-snug">
              No junk job/referral posts &amp; no cold DMs. Contacts stay locked until handshake.
            </p>
          </div>

          {/* Card 2: No AI Human Approval */}
          <div className="bg-orange-50/70 border border-orange-200/90 rounded-[4px] p-2.5 sm:p-3.5 shadow-2xs transition-all hover:border-orange-300">
            <div className="flex items-center gap-1.5 mb-1">
              <UserCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <h3 className="font-display font-bold text-xs sm:text-sm text-slate-950">
                100% Human Approval
              </h3>
              <span className="ml-auto font-mono text-[9px] text-orange-800 font-bold uppercase tracking-wider bg-orange-100 px-1.5 py-0.5 rounded-[2px]">
                No AI
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-sans leading-snug">
              Audited by real operators, never AI bots. Every company domain is manually verified.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 3 — THE CORE VALUE (Comparison)
   ================================================== */
function CoreValueSection() {
  const { ref, isVisible } = useReveal();

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
      className={`space-y-6 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          The Fundamental Shift
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Stop searching for businesses. Find business demand.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Traditional networking starts with people. Relay starts with what a business actually
          needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Traditional Outreach */}
        <div className="bg-slate-100/70 border border-slate-200 p-6 rounded-[4px] space-y-5 flex flex-col justify-between">
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
                className="flex items-center gap-2.5 text-xs text-slate-600 bg-white/80 border border-slate-200/60 px-3 py-2 rounded-[2px]"
              >
                <span className="font-mono text-[10px] text-slate-400 font-bold w-4">
                  0{idx + 1}
                </span>
                <span>{step}</span>
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
                className="flex items-center gap-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200/90 px-3 py-2 rounded-[2px] font-medium"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider font-bold pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Result: Warm introductions based on mutual agreement
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

  const categories = [
    {
      icon: <Handshake className="w-5 h-5 text-orange-600" />,
      title: "Partnerships",
      example: "Find complementary businesses to build a joint offering.",
      subtext: "Strategic alliances, product integrations, and joint co-marketing bundles.",
    },
    {
      icon: <Users className="w-5 h-5 text-orange-600" />,
      title: "Referral Partners",
      example: "Exchange qualified customer referrals with businesses serving the same market.",
      subtext: "Structured finder fees, reciprocal lead sharing, and agency partnerships.",
    },
    {
      icon: <Layers className="w-5 h-5 text-orange-600" />,
      title: "Distribution",
      example: "Find resellers, distributors, or channel partners.",
      subtext: "Regional expansion, software resellers, and established enterprise sales channels.",
    },
    {
      icon: <Building2 className="w-5 h-5 text-orange-600" />,
      title: "Vendors",
      example: "Discover businesses actively looking for your product or service.",
      subtext: "Real procurement briefs from operators who have defined budgets and scopes.",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-orange-600" />,
      title: "Hiring",
      example: "Find businesses looking for specific expertise or talent.",
      subtext: "Key contractor roles, specialized advisory, and fractional operator capacity.",
    },
  ];

  return (
    <section
      ref={ref}
      className={`space-y-6 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Commercial Categories
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Opportunities worth acting on.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Built around the ways businesses actually work with other businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-[4px] p-6 space-y-3 shadow-xs hover:border-slate-800 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-[2px] flex items-center justify-center">
                {cat.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-slate-950">{cat.title}</h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 font-sans leading-snug">
                “{cat.example}”
              </p>
            </div>
            <p className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 leading-relaxed">
              {cat.subtext}
            </p>
          </div>
        ))}

        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-[4px] p-6 flex flex-col justify-center text-center space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Focused on Outcomes
          </span>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Every category is designed to create verifiable commercial outcomes rather than vanity
            engagement.
          </p>
        </div>
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
      className={`space-y-6 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Structured Workflow
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          From opportunity to introduction.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Relay keeps the process structured so businesses can explore opportunities without opening
          themselves up to unwanted outreach.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
   SECTION 5 — TRUST & VERIFICATION (Strict Standards)
   ================================================== */
function TrustVerificationSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`space-y-6 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Strict Standards
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Zero Unnecessary Noise. 100% Human Approval.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          We protect platform quality at the gate and in the feed. No AI shortcuts, no junk posts,
          and no unsolicited DMs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Pillar 1: No Unnecessary Noise */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-6 sm:p-8 space-y-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-0.5 bg-orange-50 text-orange-700 border border-orange-200/60 rounded-[2px] font-bold">
                Quality Filter
              </span>
              <ShieldCheck className="w-5 h-5 text-orange-600" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-950">
                No Unnecessary Noise
              </h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Open business platforms deteriorate when inboxes are flooded and feeds become
                dumping grounds for spam. Relay enforces strict boundaries:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs font-sans leading-relaxed">
                  <strong className="font-semibold text-slate-900 block">No Junk Postings:</strong>
                  <span className="text-slate-600">
                    Vague job requests, generic referral links, and low-quality ads are prohibited.
                    Every listing must be a structured commercial brief with clear scope and terms.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs font-sans leading-relaxed">
                  <strong className="font-semibold text-slate-900 block">
                    No Flooded or Cold DMs:
                  </strong>
                  <span className="text-slate-600">
                    Contact details stay locked until both sides agree to a handshake. Cold sales
                    bots, scrapers, and uninvited messages cannot access your inbox.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs font-sans leading-relaxed">
                  <strong className="font-semibold text-slate-900 block">
                    No Social Media Distractions:
                  </strong>
                  <span className="text-slate-600">
                    Zero algorithmic feeds, follower counts, likes, or personal updates. You only
                    see active business demand that you can genuinely fulfill.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Protected from noise · 100% Intent-Driven
          </div>
        </div>

        {/* Pillar 2: 100% Human Approval (No AI) */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-6 sm:p-8 space-y-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-[2px] font-bold">
                Human Verification
              </span>
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-950">
                100% Manual Human Approval
              </h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Automated signups and AI verification scripts fail to catch shell companies,
                throwaway domains, and low-quality bots. We review every applicant manually:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs font-sans leading-relaxed">
                  <strong className="font-semibold text-slate-900 block">No AI Approvals:</strong>
                  <span className="text-slate-600">
                    We never outsource platform gatekeeping to automated AI bots or black-box
                    algorithms. A real human operations team member audits every business
                    application.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs font-sans leading-relaxed">
                  <strong className="font-semibold text-slate-900 block">
                    Authentic Domain &amp; Operator Vetting:
                  </strong>
                  <span className="text-slate-600">
                    Corporate email domains, active corporate websites, and operating credentials
                    are manually inspected before granting access.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs font-sans leading-relaxed">
                  <strong className="font-semibold text-slate-900 block">
                    Verified Counterparties Only:
                  </strong>
                  <span className="text-slate-600">
                    When you review an opportunity or receive a pitch, you have complete certainty
                    that you are interacting with a legitimate, operating business.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-emerald-700 uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Human-Audited at Onboarding
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 7 — WHY DOUBLE OPT-IN?
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
      className={`space-y-6 sm:space-y-8 max-w-4xl mx-auto text-center transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Mutual Consent Protocol
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Connect when both sides want to.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
          Your contact information stays private until an opportunity owner accepts your interest.
        </p>
      </div>

      {/* Visual Flow */}
      <div className="bg-white border border-slate-200 p-5 sm:p-7 rounded-[4px] space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold text-slate-800">
          {flowSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-[2px]">
                {step}
              </span>
              {idx < flowSteps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
              )}
            </div>
          ))}
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
   SECTION 8 — TWO SIDES OF THE MARKET
   ================================================== */
function TwoSidesSection() {
  const { ref, isVisible } = useReveal();

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
      className={`space-y-6 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Two-Way Participation
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Whether you need something or have something to offer, Relay works both ways.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Businesses create opportunities and businesses discover them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
   SECTION 9 — WHY BUSINESSES RETURN
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
      className={`space-y-6 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Dynamic Deal Flow
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Your next opportunity may already be waiting.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Relay is built around active business demand. New opportunities create new reasons to come
          back.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {timelineItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-[4px] p-5 space-y-3 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-orange-600 uppercase font-bold tracking-widest block">
                {item.time}
              </span>
              <h3 className="font-display text-base font-bold text-slate-900 leading-snug">
                “{item.title}”
              </h3>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-2.5">
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
   SECTION 10 — OUTCOME-FOCUSED SECTION
   ================================================== */
function OutcomesSection() {
  const { ref, isVisible } = useReveal();

  const progressionBlocks = [
    { step: "01", label: "Discover an opportunity", subtext: "Browse verified active briefs" },
    { step: "02", label: "Express interest", subtext: "Explain your commercial fit" },
    { step: "03", label: "Make an introduction", subtext: "Both sides review and accept" },
    {
      step: "04",
      label: "Create a business relationship",
      subtext: "Direct email contact unlocked",
    },
  ];

  const outcomePills = [
    "Partnerships",
    "Referrals",
    "Distribution",
    "Vendor relationships",
    "Hiring",
  ];

  return (
    <section
      ref={ref}
      className={`space-y-6 sm:space-y-8 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Clear Progression
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Built for business outcomes, not engagement.
        </h2>
        <p className="text-slate-500 sm:text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Relay is designed to move businesses from discovery to meaningful commercial
          conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {progressionBlocks.map((b, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-[4px] p-5 space-y-2 shadow-xs flex flex-col justify-between"
          >
            <span className="font-mono text-xs text-orange-600 font-bold">{b.step}</span>
            <div className="space-y-1">
              <h3 className="font-display text-sm font-bold text-slate-950">{b.label}</h3>
              <p className="text-xs text-slate-500 font-sans">{b.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Outcome labels */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto pt-2">
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold mr-1">
          Outcome Areas:
        </span>
        {outcomePills.map((pill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200/80"
          >
            {pill}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   SECTION 11 — FINAL CTA
   ================================================== */
function FinalCtaSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-8 sm:py-10 md:py-12 bg-slate-900 text-white rounded-[4px] p-6 sm:p-10 text-center space-y-5 max-w-5xl mx-auto border border-slate-800 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 max-w-2xl mx-auto">
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
          What is your business looking for?
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
          Find opportunities from verified businesses — or post what you need and let the right
          businesses discover you.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
        <Link
          to="/opportunities"
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center bg-white text-slate-950 font-mono text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors rounded-[3px] font-bold shadow-xs cursor-pointer"
        >
          Explore Opportunities <ArrowRight className="ml-2 w-4 h-4" />
        </Link>

        <Show when="signed-out">
          <Link
            to="/signup"
            className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-widest transition-colors rounded-[3px] font-bold cursor-pointer"
          >
            Apply for Access
          </Link>
        </Show>
      </div>

      <p className="text-xs text-slate-400 font-sans">
        Relay is for operating businesses looking for real commercial opportunities.
      </p>
    </section>
  );
}

/* ==================================================
   SECTION 12 — FAQ
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
      className={`space-y-6 sm:space-y-8 max-w-3xl mx-auto transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="space-y-3 text-center">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em]">
          Got Questions?
        </span>
        <h2 className="font-display text-[22px] sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
          Questions, answered.
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-slate-200 rounded-[4px] bg-white px-4 shadow-2xs"
          >
            <AccordionTrigger className="text-left font-display font-bold text-sm sm:text-base text-slate-900 py-3.5 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1 pb-3.5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ==================================================
   SECTION 13 — FOOTER
   ================================================== */
function Footer() {
  return (
    <footer className="pt-6 sm:pt-8 pb-10 sm:pb-12 border-t border-slate-200/80 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
      <div className="space-y-1.5">
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

      <div className="flex flex-wrap gap-5 justify-center text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
        <Link to="/opportunities" className="hover:text-slate-950 transition-colors">
          Opportunities
        </Link>
        <a href="#how-it-works" className="hover:text-slate-950 transition-colors">
          How It Works
        </a>
        <Link to="/signup" className="hover:text-slate-950 transition-colors">
          Apply for Access
        </Link>
        <Link to="/home" className="hover:text-slate-950 transition-colors">
          About
        </Link>
        <a href="#faq" className="hover:text-slate-950 transition-colors">
          FAQ
        </a>
        <Link to="/home" className="hover:text-slate-950 transition-colors">
          Privacy
        </Link>
        <Link to="/home" className="hover:text-slate-950 transition-colors">
          Terms
        </Link>
      </div>
    </footer>
  );
}
