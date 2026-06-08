import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, ReactNode } from "react";
import { Show, SignInButton } from "@clerk/tanstack-react-start";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Zap,
  Check,
  Lock,
  Award,
  MapPin
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

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
      { threshold: 0.05 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function StatCounter({ value, duration = 1500, trigger = false }: { value: number; duration?: number; trigger?: boolean }) {
  const [currentValue, setCurrentValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCurrentValue(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentValue(value);
        hasAnimated.current = true;
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, trigger]);

  return <span>{currentValue.toLocaleString()}</span>;
}

function Landing() {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-orange-600 selection:text-white font-sans antialiased overflow-x-hidden relative">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(hsl(215 25% 12% / 0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <Nav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-24 relative pb-16 pt-4">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <LiveBoardSection />
        <TrustSystemSection />
        <TestimonialsSection />
        <WhoIsItForSection />
        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-3 group">
          <img
            src={logoUrl}
            alt="The Relay Logo"
            className="h-12 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
        
        <div className="flex items-center gap-4">
          <Show when="signed-in">
            <Link
              to="/opportunities"
              className="h-10 px-4 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(234,88,12,0.15)] transition-all duration-300 rounded-[2px] font-bold shadow-sm"
            >
              Go to Feed
            </Link>
            <UserAvatarDropdown />
          </Show>

          <Show when="signed-out">
            <div className="flex items-center gap-2 sm:gap-3">
              <SignInButton mode="modal" forceRedirectUrl="/opportunities">
                <button className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors cursor-pointer font-bold px-3 py-2">
                  Sign In
                </button>
              </SignInButton>
              <Link
                to="/signup"
                className="bg-slate-900 hover:bg-orange-600 text-white px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 rounded-[2px] shadow-sm font-bold flex items-center justify-center border border-slate-900 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const { ref, isVisible } = useReveal();
  
  return (
    <div ref={ref} className="space-y-12 py-12 md:py-20 max-w-7xl mx-auto text-center">
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-slate-950 uppercase">
          The opportunity network <br />
          for verified businesses
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          A double-opt-in transaction board where verified B2B founders, operators, and agencies exchange high-value commercial relationships without social media noise.
        </p>
        <div className="text-slate-500 text-xs md:text-sm font-mono space-y-1 uppercase tracking-wider">
          <div>Built for exchanging referral partnerships, distribution deals, and vendor discovery.</div>
          <div>Facilitating warm introductions, channel agreements, and strategic alliances.</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Show when="signed-in">
          <Link
            to="/opportunities"
            className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 rounded-[2px] font-bold shadow-sm"
          >
            Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Show>
        <Show when="signed-out">
          <Link
            to="/signup"
            className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center bg-slate-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(234,88,12,0.15)] transition-all duration-300 rounded-[2px] font-bold shadow-sm"
          >
            Create Vetted Account <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Show>
        <button
          onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          className="h-12 w-full sm:w-auto px-8 inline-flex items-center justify-center border border-slate-300 bg-white hover:border-slate-800 text-slate-700 font-mono text-xs uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 rounded-[2px] font-bold cursor-pointer"
        >
          See how it works
        </button>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              <StatCounter value={1420} trigger={isVisible} />
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Verified Businesses</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              <StatCounter value={840} trigger={isVisible} />
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Partnerships Formed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              <StatCounter value={2150} trigger={isVisible} />
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Referral Deals Exchanged</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-display font-extrabold text-orange-600 tracking-tight">
              <StatCounter value={18} trigger={isVisible} />
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Spots Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const { ref, isVisible } = useReveal();

  const platforms = [
    {
      name: "LinkedIn",
      hope: "Targeted partnerships and qualified B2B leads.",
      fail: "Inboxes are overrun by automated sales bots, recruiters, and low-relevance pitches."
    },
    {
      name: "WhatsApp Groups",
      hope: "Immediate operator advice and real-time deal flow.",
      fail: "Critical opportunities are buried under continuous casual chatter and general conversation."
    },
    {
      name: "Facebook Groups",
      hope: "Peer-vetted vendor recommendations and niche industry insights.",
      fail: "Low barrier to entry leads to self-promotional spam and unregulated posting quality."
    },
    {
      name: "Founder Communities",
      hope: "Reseller agreements, referral swaps, and distribution partners.",
      fail: "Lack of transaction-focused structure keeps interactions conversational and low-outcome."
    }
  ];

  return (
    <div className="w-full bg-slate-950 text-white py-16 md:py-24 px-4 sm:px-6 rounded-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div ref={ref} className={`max-w-7xl mx-auto space-y-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="font-mono text-[10px] text-orange-500 font-bold uppercase tracking-[0.2em]">The Broken Channels</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Where B2B Networking Fails
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans">
            Founders and operators search for high-value business cooperation in spaces built for social noise.
          </p>
        </div>

        <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          {platforms.map((p, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[320px] md:w-auto shrink-0 snap-center bg-slate-900/60 border border-white/10 p-6 rounded-[4px] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="font-mono text-xs text-orange-500 uppercase tracking-widest font-bold">// {p.name}</div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Intent:</span>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">{p.hope}</p>
                </div>
              </div>
              <div className="border-t border-white/5 pt-3">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold">Why it fails:</span>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">{p.fail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const { ref, isVisible } = useReveal();

  const steps = [
    {
      num: "01",
      title: "Apply and get verified",
      desc: "Every applicant goes through human validation. We verify corporate registration, company domain, and operator credentials to maintain absolute trust."
    },
    {
      num: "02",
      title: "Post your opportunity",
      desc: "Create a structured post outlining a referral partnership, reseller deal, or vendor search. No personal status updates, only clear business requests."
    },
    {
      num: "03",
      title: "Get matched",
      desc: "Vetted members browse the dashboard and submit response pitches. Your direct contact details are kept strictly locked and hidden from view."
    },
    {
      num: "04",
      title: "Connect and close",
      desc: "Unlock contact credentials only when both parties manually accept the handshake. Proceed directly to external email with pre-filled context."
    }
  ];

  return (
    <div id="how-it-works" ref={ref} className={`space-y-12 py-12 md:py-16 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em] font-bold">The Process</span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-950">
          The Verification and Matching Protocol
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed font-sans">
          Relay is built on a structured double-opt-in progression, ensuring you only receive highly qualified responses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {steps.map((s, idx) => (
          <div key={idx} className="relative space-y-4 flex flex-col items-start text-left group">
            {/* Step Number */}
            <div className="text-4xl font-display font-black text-slate-200 group-hover:text-orange-500 transition-colors duration-300">
              {s.num}
            </div>
            
            {/* Title */}
            <h3 className="font-display text-sm font-extrabold uppercase tracking-tight text-slate-950 pt-1">
              {s.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              {s.desc}
            </p>

            {/* Connecting line */}
            {idx < 3 && (
              <div className="hidden md:block absolute top-5 left-[85%] w-[45%] h-[1px] bg-slate-200 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveBoardSection() {
  const { ref, isVisible } = useReveal();

  const mockCards = [
    {
      type: "Referral",
      company: "Shopify Dev Studio",
      badge: "Approved",
      title: "UX/UI agency referral partnership for custom storefront design briefs",
      desc: "We regularly reject front-end design enquiries from our Shopify Plus development clients. Seeking a reliable design studio for reciprocal client handoffs. Offering 10% contract value finder fees.",
      location: "Mumbai, India",
    },
    {
      type: "Partnership",
      company: "FragileRoute Logistics",
      badge: "Approved",
      title: "API integrations for fragile e-commerce cargo delivery service",
      desc: "Seeking mid-market D2C wellness brands and 3PL partners to integrate our automated last-mile shipping API. Specifically optimized for handling glass and liquid package configurations.",
      location: "London, UK",
    },
    {
      type: "Distribution",
      company: "CloudSync Platforms",
      badge: "Approved",
      title: "Regional reseller networks for cloud operations management suite",
      desc: "Expanding B2B SaaS platform looking to connect with active IT consultancies and system integrators with SME enterprise relationships in DACH. Offering 20% lifetime recurring commissions.",
      location: "Munich, Germany",
    },
    {
      type: "Vendor",
      company: "Aura Organics Group",
      badge: "Approved",
      title: "ISO-certified biodegradable shipping mailers and box manufacturer",
      desc: "Scaling organic D2C cosmetics line. Need custom printed biodegradable mailers at 10,000 units per month. Manufacturing facilities based in the EU or United Kingdom preferred.",
      location: "London, UK",
    }
  ];

  const handleRespond = () => {
    toast.success("Account Required", {
      description: "Please sign up or sign in to respond to opportunities.",
      duration: 4000,
    });
  };

  return (
    <div id="live-opportunities" ref={ref} className={`space-y-8 py-12 md:py-16 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em] font-bold">[ ACTIVE LEDGER ]</span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-950">
          Live Opportunities
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed font-sans">
          Preview real B2B opportunities currently active on the platform. Sign up to submit your response pitch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCards.map((card, idx) => {
          const typeColors = {
            Referral: "bg-indigo-50 border-indigo-200 text-indigo-700",
            Partnership: "bg-orange-50 border-orange-200 text-orange-700",
            Distribution: "bg-emerald-50 border-emerald-200 text-emerald-700",
            Vendor: "bg-purple-50 border-purple-200 text-purple-700",
          }[card.type as "Referral" | "Partnership" | "Distribution" | "Vendor"];

          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-slate-800 p-6 rounded-[4px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 group"
            >
              <div className="space-y-3">
                {/* Meta Row */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 border text-[9px] font-mono font-bold uppercase tracking-wider rounded-[2px] ${typeColors}`}>
                    {card.type}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      {card.company}
                      <BadgeCheck className="w-3.5 h-3.5 text-white fill-blue-500 shrink-0" />
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {card.location}
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="font-display text-base font-extrabold text-slate-950 group-hover:text-orange-600 transition-colors leading-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs leading-relaxed font-sans line-clamp-2">
                  {card.desc}
                </p>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Node #R-{2000 + idx}</span>
                <button
                  onClick={handleRespond}
                  className="px-4 py-2 bg-slate-900 text-white text-[9px] font-mono uppercase tracking-widest font-bold rounded-[2px] hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(234,88,12,0.2)] transition-all duration-300 cursor-pointer"
                >
                  Respond
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrustSystemSection() {
  const { ref, isVisible } = useReveal();

  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
      title: "Manual identity verification",
      desc: "Every operating node on the platform is validated by a human team member. We do not support automated signup scripts, unverified domain references, or ghost accounts."
    },
    {
      icon: <Award className="w-6 h-6 text-orange-600" />,
      title: "Outcome-based reputation",
      desc: "Platform status scales based on confirmed partnerships, not artificial likes or public reactions. Members earn trust score points purely through active reciprocity."
    },
    {
      icon: <Lock className="w-6 h-6 text-orange-600" />,
      title: "Mutual double-opt-in check",
      desc: "Your company contact details and introduction details remain completely locked. Warm handshakes are only facilitated when both business profiles manually accept."
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      title: "Opportunity-first structure",
      desc: "There are no general media feeds, follower lists, or likes. Every interaction revolves around a structured opportunity brief designed to produce commercial results."
    }
  ];

  return (
    <div ref={ref} className={`space-y-12 py-12 md:py-16 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em] font-bold">[ TRUST PROTOCOL ]</span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-950">
          The Trust System
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed font-sans">
          How we eliminate business networking spam and guarantee high-fidelity relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((p, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-[4px] flex gap-5 items-start">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200/60 rounded-[2px] flex items-center justify-center shrink-0">
              {p.icon}
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-display text-sm font-extrabold uppercase tracking-tight text-slate-950">
                {p.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-sans max-w-sm">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const { ref, isVisible } = useReveal();

  const items = [
    {
      quote: "Within 14 days of platform approval, we matched with an enterprise software reseller in Germany. That single introduction led to a contract worth €45,000 in under three months.",
      author: "Arnav S.",
      role: "Founder & CEO",
      company: "B2B SaaS Automation",
      location: "Bengaluru, India",
      initials: "AS"
    },
    {
      quote: "Finding an ISO-certified packaging vendor used to cost us weeks of cold outreach. On Relay, we posted our biodegradable mailer brief and received three validated bids within 48 hours.",
      author: "Sarah K.",
      role: "Head of Operations",
      company: "Vibe Wellness D2C",
      location: "London, UK",
      initials: "SK"
    }
  ];

  return (
    <div ref={ref} className={`space-y-12 py-12 md:py-16 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em] font-bold">[ TESTIMONIALS ]</span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-950">
          Verified Outcomes
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed font-sans">
          Read how verified operators are executing commercial partnerships on the network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((t, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-8 rounded-[4px] text-left space-y-6 flex flex-col justify-between shadow-sm relative">
            <p className="text-slate-700 text-xs md:text-sm italic leading-relaxed font-sans">
              "{t.quote}"
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-mono text-xs font-bold uppercase flex items-center justify-center">
                {t.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-950">{t.author}</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                  {t.role} · {t.company}
                </div>
                <div className="text-[9px] text-slate-400 font-sans">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoIsItForSection() {
  const { ref, isVisible } = useReveal();

  const forYou = [
    "You are a B2B founder, general partner, marketing agency owner, or corporate development operator.",
    "You possess an active, verifiable business domain and a registered business registration number.",
    "You have a specific, actionable commercial brief to post — such as distribution, hiring, or vendor search.",
    "You value low-noise, transactional communication and expect to verify your identity before communicating.",
    "You are willing to actively participate and confirm business introduction handshakes when appropriate."
  ];

  const notForYou = [
    "You intend to scrape email directories, harvest corporate leads, or conduct mass outbound cold sales outreach.",
    "You do not possess a registered business corporation, active email server domain, or verifiable profile.",
    "You are looking to publish self-promotional content, generic marketing updates, or spammy recruitment posts.",
    "You expect to passively browse directories without publishing your own commercial briefs or verifying.",
    "You prefer social feed algorithms, scrolling timelines, and chase likes over structured outcome networks."
  ];

  return (
    <div ref={ref} className={`space-y-12 py-12 md:py-16 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-[0.2em] font-bold">[ SELF SELECTION ]</span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-950">
          Onboarding Parameters
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed font-sans">
          We protect platform data quality. Please review our compliance requirements before beginning your application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {/* For You */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[4px] space-y-6">
          <h3 className="font-display text-base font-extrabold uppercase text-emerald-950 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            This is for you if:
          </h3>
          <ul className="space-y-4">
            {forYou.map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start text-xs font-sans text-emerald-900 leading-relaxed">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not For You */}
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[4px] space-y-6">
          <h3 className="font-display text-base font-extrabold uppercase text-red-950 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            This is not for you if:
          </h3>
          <ul className="space-y-4">
            {notForYou.map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start text-xs font-sans text-red-900 leading-relaxed">
                <span className="text-red-600 font-bold text-xs shrink-0 mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}



function Footer() {
  return (
    <footer className="pt-12 pb-16 border-t border-slate-200/80 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
      <div className="space-y-2">
        <Link to="/home" className="font-display font-extrabold text-base uppercase tracking-tight text-slate-950 flex items-center justify-center md:justify-start gap-2">
          <span className="w-5 h-5 bg-slate-900 flex items-center justify-center text-white text-[10px] font-mono rounded-[2px]">
            R
          </span>
          <span>Relay</span>
        </Link>
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          Real Businesses. Real Opportunities. Real Growth.
        </div>
      </div>
      
      <div className="flex gap-6 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
        <a href="#" className="hover:text-orange-600 transition-colors">About</a>
        <a href="#" className="hover:text-orange-600 transition-colors">Privacy</a>
        <a href="#" className="hover:text-orange-600 transition-colors">Terms</a>
        <a href="#" className="hover:text-orange-600 transition-colors">Contact</a>
      </div>
    </footer>
  );
}
