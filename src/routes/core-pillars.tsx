import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Lock,
  ArrowLeftRight,
  FilterX,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Network,
  Users,
  Building2,
  Share2,
  Workflow,
} from "lucide-react";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/core-pillars")({
  head: () =>
    createSeoMeta({
      title: "B2B Opportunity Exchange Principles & Core Pillars | The Relay",
      description:
        "Explore the core principles behind The Relay's B2B opportunity exchange, including value exchange, mutual consent, commercial relationships, and a focused business network.",
      path: "/core-pillars",
    }),
  component: CorePillarsPage,
});

export function CorePillarsPage() {
  const [activePillar, setActivePillar] = useState(1);
  const pillarsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center the 2nd card (CDOES) by default on mobile screens
    if (pillarsScrollRef.current) {
      const container = pillarsScrollRef.current;
      const card = container.children[1] as HTMLElement | undefined;
      if (card) {
        const targetLeft =
          card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
        container.scrollTo({ left: Math.max(0, targetLeft), behavior: "instant" });
      }
    }
  }, []);

  const handlePillarsScroll = () => {
    if (!pillarsScrollRef.current) return;
    const { scrollLeft, clientWidth } = pillarsScrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActivePillar(Math.min(Math.max(index, 0), 2));
  };

  const scrollPillarsTo = (idx: number) => {
    if (!pillarsScrollRef.current) return;
    const container = pillarsScrollRef.current;
    const card = container.children[idx] as HTMLElement | undefined;
    if (card) {
      const targetLeft =
        card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
    setActivePillar(idx);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/core-pillars#webpage`,
        url: `${SITE_URL}/core-pillars`,
        name: "B2B Opportunity Exchange Principles & Core Pillars | The Relay",
        description:
          "Explore the core principles behind The Relay's B2B opportunity exchange, including value exchange, mutual consent, commercial relationships, and a focused business network.",
        breadcrumb: {
          "@id": `${SITE_URL}/core-pillars#breadcrumb`,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "The Relay",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/core-pillars#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Platform",
            item: `${SITE_URL}/solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Core Pillars",
            item: `${SITE_URL}/core-pillars`,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "The Relay",
        url: SITE_URL,
      },
    ],
  };

  return (
    <div className="bg-[#F8FAFC] text-[#171F2C] font-sans antialiased min-h-screen flex flex-col selection:bg-[#171F2C] selection:text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        {/* ═══════════════════════════════════════════════════════════════════
            1. HERO SECTION: PRINCIPLES & FOUNDATIONAL CONTEXT
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full pt-10 pb-10 sm:pt-14 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto flex flex-col gap-3.5 text-center items-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]"
            >
              <Link to="/" className="hover:text-[#171F2C] transition-colors">
                Platform
              </Link>
              <span className="text-[#94A3B8]">/</span>
              <span className="text-[#64748B]">Architecture</span>
              <span className="text-[#94A3B8]">/</span>
              <span className="text-[#171F2C] font-bold">Core Pillars</span>
            </nav>

            {/* Main H1 Headline */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#171F2C] tracking-tight leading-[1.18]">
              Core Principles of a B2B Opportunity Exchange
            </h1>

            {/* Supporting Subheading */}
            <p className="text-base sm:text-lg font-semibold text-[#171F2C]">
              Three Core Pillars. One Clean Exchange.
            </p>

            {/* Context Narrative */}
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              The Relay is designed around foundational principles for exchanging commercial opportunities between verified businesses. By combining structured value creation, gated bilateral consent, and a focused commercial environment, our{" "}
              <Link
                to="/b2b-opportunity-exchange"
                className="text-[#171F2C] underline underline-offset-2 hover:text-[#000000] font-medium"
              >
                B2B opportunity exchange
              </Link>{" "}
              enables companies to monetize out-of-scope dealflow, form strategic referral partnerships, and build high-trust commercial relationships without the noise of public social feeds.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            2. THE 3 CORE PILLARS (UNIFIED EXECUTIVE CARDS)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div
            ref={pillarsScrollRef}
            onScroll={handlePillarsScroll}
            className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-6 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          >
            {/* CARD 1: PILLAR 01 — VALUE CREATION */}
            <article className="w-[85vw] max-w-[380px] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-[4px] p-6 sm:p-7 border border-[#E2E8F0] hover:border-[#171F2C] transition-all flex flex-col justify-between relative group">
              <div className="space-y-4">
                {/* Tag */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] text-[11px] font-mono font-bold tracking-wider uppercase">
                    <span>PIL-01</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="text-[#171F2C]">Value Creation</span>
                  </div>
                  <ArrowLeftRight className="w-5 h-5 text-[#64748B] group-hover:text-[#171F2C] transition-colors" />
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h2 className="font-display font-bold text-xl text-[#171F2C] tracking-tight leading-snug">
                    Value Exchange for Unfulfilled B2B Opportunities
                  </h2>
                  <p className="text-[#64748B] text-[13px] leading-relaxed">
                    Don't waste client leads or commercial opportunities you cannot fulfill. Trade them with trusted counterparties in our B2B opportunity exchange for contracted revenue shares, reciprocal warm introductions, or valuable services.
                  </p>
                </div>

                {/* Core Idea Callout */}
                <div className="bg-[#F8FAFC] border-l-2 border-l-[#171F2C] rounded-r-[4px] p-4">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Simple Rule
                  </span>
                  <p className="text-[13px] font-semibold text-[#171F2C] leading-snug italic">
                    "I have a commercial opportunity I cannot take — what can I exchange it for?"
                  </p>
                </div>

                {/* Quick Exchange List */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] block">
                    What You Can Get:
                  </span>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>10%–25% revenue share from won client deals</span>
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Direct warm client referrals through opportunity sharing</span>
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Specialized team skills, engineering, or tech barter</span>
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Long-term co-selling &amp; distribution partnerships</span>
                  </div>
                </div>
              </div>

              {/* Footer Tag */}
              <div className="pt-4 mt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-medium">Asset Liquidity</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#171F2C] bg-[#F8FAFC] px-2 py-0.5 rounded-[4px] border border-[#E2E8F0]">
                  Zero wasted opportunities
                </span>
              </div>
            </article>

            {/* CARD 2: PILLAR 02 — CDOES & MUTUAL CONSENT */}
            <article className="w-[85vw] max-w-[380px] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-[4px] p-6 sm:p-7 border-2 border-[#171F2C] transition-all flex flex-col justify-between relative group">
              <div className="space-y-4">
                {/* Tag */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#171F2C] text-white text-[11px] font-mono font-bold tracking-wider uppercase">
                    <span>PIL-02</span>
                    <span className="text-slate-400">•</span>
                    <span>Protected Protocol</span>
                  </div>
                  <Lock className="w-5 h-5 text-[#171F2C]" />
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h2 className="font-display font-bold text-xl text-[#171F2C] tracking-tight leading-snug">
                    Mutual Consent in B2B Opportunity Exchange
                  </h2>
                  <p className="text-[#64748B] text-[13px] leading-relaxed">
                    You retain complete sovereign control. In our consent-driven opportunity exchange (CDOES), contact details and confidential deal parameters are unmasked only after both parties mutually ratify terms.
                  </p>
                </div>

                {/* Core Idea Callout */}
                <div className="bg-[#F8FAFC] border-l-2 border-l-[#171F2C] rounded-r-[4px] p-4">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Simple Rule
                  </span>
                  <p className="text-[13px] font-semibold text-[#171F2C] leading-snug italic">
                    "No forced interactions. Nothing unlocks without mutual bilateral agreement."
                  </p>
                </div>

                {/* Compact 8-Step Bilateral Sequence Chips */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      8-Step Bilateral Journey:
                    </span>
                    <Link
                      to="/8-step-journey"
                      className="text-[11px] font-mono text-[#171F2C] underline hover:text-[#000000]"
                    >
                      how it works
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] text-[#171F2C]">
                      1. Verify
                    </span>
                    <span className="text-[#94A3B8] text-xs">→</span>
                    <span className="text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] text-[#171F2C]">
                      2. Post
                    </span>
                    <span className="text-[#94A3B8] text-xs">→</span>
                    <span className="text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] text-[#171F2C]">
                      3. Discover
                    </span>
                    <span className="text-[#94A3B8] text-xs">→</span>
                    <span className="text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] text-[#171F2C]">
                      4. Interest
                    </span>
                    <span className="text-[#94A3B8] text-xs">→</span>
                    <span className="text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] text-[#171F2C]">
                      5. Ack
                    </span>
                    <span className="text-[#94A3B8] text-xs">→</span>
                    <span className="text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] text-[#171F2C]">
                      6. Terms
                    </span>
                    <span className="text-[#94A3B8] text-xs">→</span>
                    <span className="text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px] text-[#171F2C]">
                      7. Agree
                    </span>
                    <span className="text-[#94A3B8] text-xs">→</span>
                    <span className="text-[11px] font-bold bg-[#171F2C] border border-[#171F2C] px-2 py-0.5 rounded-[4px] text-white">
                      8. Handshake
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Tag */}
              <div className="pt-4 mt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-medium">Full Privacy</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#171F2C] bg-[#F8FAFC] px-2 py-0.5 rounded-[4px] border border-[#E2E8F0]">
                  Gated until ratified
                </span>
              </div>
            </article>

            {/* CARD 3: PILLAR 03 — ZERO SOCIAL NOISE */}
            <article className="w-[85vw] max-w-[380px] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-[4px] p-6 sm:p-7 border border-[#E2E8F0] hover:border-[#171F2C] transition-all flex flex-col justify-between relative group">
              <div className="space-y-4">
                {/* Tag */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] text-[11px] font-mono font-bold tracking-wider uppercase">
                    <span>PIL-03</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="text-[#171F2C]">Zero Noise</span>
                  </div>
                  <FilterX className="w-5 h-5 text-[#64748B] group-hover:text-[#171F2C] transition-colors" />
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h2 className="font-display font-bold text-xl text-[#171F2C] tracking-tight leading-snug">
                    A Focused B2B Business Network
                  </h2>
                  <p className="text-[#64748B] text-[13px] leading-relaxed">
                    The Relay is engineered exclusively for verified commercial collaboration and dealmaking — not algorithmic social feeds, follower counts, vanity posts, or uninvited outbound sales pitches.
                  </p>
                </div>

                {/* Core Idea Callout */}
                <div className="bg-[#F8FAFC] border-l-2 border-l-[#171F2C] rounded-r-[4px] p-4">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Simple Rule
                  </span>
                  <p className="text-[13px] font-semibold text-[#171F2C] leading-snug italic">
                    "Businesses join to execute commercial transactions, not to scroll social feeds."
                  </p>
                </div>

                {/* What Relay Eliminates List */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] block">
                    What We Eliminate:
                  </span>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <X className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>No cold emails, bot spam, or automated scraping</span>
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <X className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>No algorithmic feeds, vanity likes, or promotional posts</span>
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <X className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>No uninvited sales DMs or aggressive unsolicited pitching</span>
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-[#171F2C]">
                    <X className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>No endless casual back-and-forth chat without contracts</span>
                  </div>
                </div>
              </div>

              {/* Footer Tag */}
              <div className="pt-4 mt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-medium">Dealroom Speed</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#171F2C] bg-[#F8FAFC] px-2 py-0.5 rounded-[4px] border border-[#E2E8F0]">
                  Direct verified partners
                </span>
              </div>
            </article>
          </div>

          {/* Mobile Pagination Controls */}
          <div className="flex lg:hidden items-center justify-between pt-4">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollPillarsTo(idx)}
                  className={`h-2 rounded-[2px] transition-all duration-300 ${
                    activePillar === idx ? "w-6 bg-[#171F2C]" : "w-2 bg-[#E2E8F0]"
                  }`}
                  aria-label={`Go to pillar ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollPillarsTo(Math.max(activePillar - 1, 0))}
                disabled={activePillar === 0}
                className="w-8 h-8 rounded-[4px] border border-[#E2E8F0] bg-white flex items-center justify-center text-[#171F2C] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F8FAFC] transition-colors"
                aria-label="Previous pillar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollPillarsTo(Math.min(activePillar + 1, 2))}
                disabled={activePillar === 2}
                className="w-8 h-8 rounded-[4px] border border-[#E2E8F0] bg-white flex items-center justify-center text-[#171F2C] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F8FAFC] transition-colors"
                aria-label="Next pillar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            3. AT-A-GLANCE ARCHITECTURAL SUMMARY (MONOCHROME EXECUTIVE)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#171F2C] text-white">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[#94A3B8] font-mono text-xs uppercase tracking-widest font-bold block">
                The Three Pillars in One Sentence
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
                VALUE EXCHANGE • BILATERAL CONSENT • COMMERCIAL FOCUS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Block 1 */}
              <div className="bg-[#112030] border border-slate-700/80 rounded-[4px] p-5 sm:p-6 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#94A3B8]">
                    <span className="font-mono text-xs font-bold text-white">01.</span>
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#94A3B8]">
                      What We Create
                    </span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-white mb-1.5 font-display">
                    Real Asset Liquidity
                  </h3>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">
                    Monetize unfulfillable commercial opportunities &amp; surplus capacity, converting discarded inquiries into active rev-share and barter through our{" "}
                    <Link to="/b2b-lead-exchange" className="text-white underline underline-offset-2 hover:text-slate-200">
                      B2B lead exchange
                    </Link>.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 text-[11px] font-mono text-slate-400">
                  Economic Monetization
                </div>
              </div>

              {/* Block 2 */}
              <div className="bg-[#112030] border border-slate-700/80 rounded-[4px] p-5 sm:p-6 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#94A3B8]">
                    <span className="font-mono text-xs font-bold text-white">02.</span>
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#94A3B8]">
                      How We Enable It
                    </span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-white mb-1.5 font-display">
                    Total Control Protocol
                  </h3>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">
                    Bilateral consent sequence with zero premature exposure, unmasking parties only after mutual commercial confirmation across the{" "}
                    <Link to="/8-step-journey" className="text-white underline underline-offset-2 hover:text-slate-200">
                      8-step journey
                    </Link>.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 text-[11px] font-mono text-slate-400">
                  Dual-Gated Disclosure
                </div>
              </div>

              {/* Block 3 */}
              <div className="bg-[#112030] border border-slate-700/80 rounded-[4px] p-5 sm:p-6 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#94A3B8]">
                    <span className="font-mono text-xs font-bold text-white">03.</span>
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#94A3B8]">
                      Why It Works
                    </span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-white mb-1.5 font-display">
                    Pure Signal Integrity
                  </h3>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">
                    100% consensual commercial environment without outbound spam, feeds, or vanity algorithms, supported by verified{" "}
                    <Link to="/trust-and-safety" className="text-white underline underline-offset-2 hover:text-slate-200">
                      trust and safety
                    </Link>{" "}
                    standards.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 text-[11px] font-mono text-slate-400">
                  KYB-Verified Dealroom
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            4. HOW THE CORE PILLARS SHAPE THE RELAY (REQUIRED SECTION)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2E8F0]">
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                System Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                How the Core Pillars Shape The Relay
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                The three foundational principles directly dictate the architecture of our B2B opportunity exchange, ensuring every commercial interaction creates measurable value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Relationship 1: Value Exchange */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-[#171F2C]" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C] font-display">
                  1. Value Exchange Directs Dealflow
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Businesses can surface commercial opportunities that may be unsuitable for their own business scope, creating economic value from previously lost dealflow via structured{" "}
                  <Link to="/b2b-lead-exchange" className="text-[#171F2C] underline hover:text-[#000000]">
                    B2B lead exchange
                  </Link>{" "}
                  and ongoing{" "}
                  <Link to="/referral-partnerships" className="text-[#171F2C] underline hover:text-[#000000]">
                    referral partnerships
                  </Link>.
                </p>
              </div>

              {/* Relationship 2: Mutual Consent */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Lock className="w-4 h-4 text-[#171F2C]" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C] font-display">
                  2. Mutual Consent Secures Interaction
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Commercial interaction is strictly based on deliberate, bilateral interest rather than generic social engagement. Neither party is exposed until commercial parameters and legal terms are mutually accepted.
                </p>
              </div>

              {/* Relationship 3: Business Focus */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Network className="w-4 h-4 text-[#171F2C]" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C] font-display">
                  3. Business Focus Preserves Integrity
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  The platform is built exclusively around commercial opportunity discovery, verified referrals,{" "}
                  <Link to="/b2b-partnership-network" className="text-[#171F2C] underline hover:text-[#000000]">
                    B2B commercial partnerships
                  </Link>, and long-term business relationships rather than open, noisy social feeds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            5. WHEN THIS MODEL IS USEFUL (REQUIRED SECTION)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2E8F0]">
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Practical Applications
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                When a B2B Opportunity Exchange Is Useful
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Organizations leverage The Relay across diverse commercial requirements to monetize surplus dealflow, source trusted delivery partners, and scale reciprocal distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Use Case 1 */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Lead Monetization
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171F2C]">
                    Out-of-Scope Client Inquiries
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A business receives a qualified inbound client inquiry outside its service scope, geography, or budget tier and monetizes it through our{" "}
                    <Link to="/b2b-lead-exchange" className="text-[#171F2C] underline font-medium">
                      B2B lead exchange
                    </Link>.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#171F2C] font-semibold">
                  Benefit: 10%–25% Rev-Share
                </div>
              </div>

              {/* Use Case 2 */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Agency Capacity
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171F2C]">
                    Specialized Agency Project Routing
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A specialist digital agency receives a project requirement it cannot fulfill due to capacity constraints or technical stack differences and safely routes it via the{" "}
                    <Link to="/agency-lead-exchange" className="text-[#171F2C] underline font-medium">
                      agency lead exchange
                    </Link>.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#171F2C] font-semibold">
                  Benefit: Preserved Client Trust
                </div>
              </div>

              {/* Use Case 3 */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Referral Expansion
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171F2C]">
                    Reciprocal Referral Relationships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A high-growth service provider connects with complementary non-competing firms to establish ongoing{" "}
                    <Link to="/referral-partnerships" className="text-[#171F2C] underline font-medium">
                      referral partnerships
                    </Link>{" "}
                    and expand its{" "}
                    <Link to="/b2b-referral-network" className="text-[#171F2C] underline font-medium">
                      B2B referral network
                    </Link>.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#171F2C] font-semibold">
                  Benefit: Consistent Inbound Pipeline
                </div>
              </div>

              {/* Use Case 4 */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Channel Scale
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171F2C]">
                    Distribution &amp; Channel Expansion
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A product or platform company identifies qualified{" "}
                    <Link to="/distribution-partners" className="text-[#171F2C] underline font-medium">
                      distribution partners
                    </Link>{" "}
                    and{" "}
                    <Link to="/channel-partnerships" className="text-[#171F2C] underline font-medium">
                      channel partnerships
                    </Link>{" "}
                    to scale into new enterprise verticals.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#171F2C] font-semibold">
                  Benefit: Scaled Market Access
                </div>
              </div>

              {/* Use Case 5 */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-5 sm:p-6 space-y-2.5 flex flex-col justify-between lg:col-span-2">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Commercial Collaboration
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171F2C]">
                    Cross-Sector Commercial Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A enterprise encounters complex client requirements requiring specialized external software, advisory, or implementation capability, partnering through our verified{" "}
                    <Link to="/b2b-partnership-network" className="text-[#171F2C] underline font-medium">
                      B2B partnership network
                    </Link>.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#171F2C] font-semibold">
                  Benefit: Sovereign Handshake Execution
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            6. CROSS NAVIGATION & PLATFORM LINKING
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#171F2C] font-display">
                  Explore The Relay Ecosystem
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  Understand how the core principles translate into real-world workflows across our directory and partnership hubs.
                </p>
              </div>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171F2C] hover:bg-[#1E293B] text-white rounded-[4px] text-xs font-semibold transition-colors shrink-0"
              >
                <span>Browse Live Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/8-step-journey"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Workflow
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  how The Relay works
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Interactive walkthrough from verification to completed handshake.
                </p>
              </Link>

              <Link
                to="/b2b-opportunity-exchange"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Exchange
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  B2B opportunity exchange
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Primary framework for monetizing commercial opportunities.
                </p>
              </Link>

              <Link
                to="/b2b-partnership-network"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Network
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  B2B partnership network
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Discover verified commercial partners and co-selling alliances.
                </p>
              </Link>

              <Link
                to="/trust-and-safety"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                    Security
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  trust &amp; safety protocols
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  KYB verification desk, non-circumvention, and data masking.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            7. CALL TO ACTION SECTION (EXECUTIVE MONOCHROME)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#171F2C] tracking-tight mb-3">
              Ready to exchange commercial value without cold outreach?
            </h2>
            <p className="text-[#64748B] text-[15px] max-w-xl mx-auto mb-8 leading-relaxed">
              Join high-performing B2B enterprises and specialist agencies turning untapped commercial opportunities into verified reciprocal growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                to="/opportunities"
                className="w-full sm:w-auto h-11 px-7 bg-[#171F2C] hover:bg-[#1E293B] active:bg-[#000000] text-white font-medium text-[14px] rounded-[4px] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Explore Live Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/8-step-journey"
                className="w-full sm:w-auto h-11 px-7 bg-white hover:bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0] font-medium text-[14px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer"
              >
                See The 8-Step Workflow
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <ShieldCheck className="w-4 h-4 text-[#171F2C] shrink-0" />
              <span>100% Mutual Consent Guarantee • Zero Cold Outbound • Verified Businesses Only</span>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          8. CLEAN MONOCHROME FOOTER
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="w-full bg-white border-t border-[#E2E8F0]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#E2E8F0]">
            {/* Col 1 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-mono font-bold text-[#171F2C] uppercase tracking-wider mb-3">
                Protocol Architecture
              </h4>
              <ul className="space-y-2 text-[13px] text-[#64748B]">
                <li>
                  <Link to="/core-pillars" className="hover:text-[#171F2C] transition-colors">
                    Core Principles
                  </Link>
                </li>
                <li>
                  <Link to="/8-step-journey" className="hover:text-[#171F2C] transition-colors">
                    8-Step Journey
                  </Link>
                </li>
                <li>
                  <Link to="/trust-and-safety" className="hover:text-[#171F2C] transition-colors">
                    Bilateral Non-Circumvention
                  </Link>
                </li>
                <li>
                  <Link to="/b2b-opportunity-exchange" className="hover:text-[#171F2C] transition-colors">
                    Opportunity Exchange
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-mono font-bold text-[#171F2C] uppercase tracking-wider mb-3">
                Solutions Hub
              </h4>
              <ul className="space-y-2 text-[13px] text-[#64748B]">
                <li>
                  <Link to="/b2b-lead-exchange" className="hover:text-[#171F2C] transition-colors">
                    B2B Lead Exchange
                  </Link>
                </li>
                <li>
                  <Link to="/agency-lead-exchange" className="hover:text-[#171F2C] transition-colors">
                    Agency Lead Exchange
                  </Link>
                </li>
                <li>
                  <Link to="/referral-partnerships" className="hover:text-[#171F2C] transition-colors">
                    Referral Partnerships
                  </Link>
                </li>
                <li>
                  <Link to="/b2b-referral-network" className="hover:text-[#171F2C] transition-colors">
                    B2B Referral Network
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-mono font-bold text-[#171F2C] uppercase tracking-wider mb-3">
                Commercial Alliances
              </h4>
              <ul className="space-y-2 text-[13px] text-[#64748B]">
                <li>
                  <Link to="/b2b-partnership-network" className="hover:text-[#171F2C] transition-colors">
                    B2B Partnership Network
                  </Link>
                </li>
                <li>
                  <Link to="/channel-partnerships" className="hover:text-[#171F2C] transition-colors">
                    Channel Partnerships
                  </Link>
                </li>
                <li>
                  <Link to="/distribution-partners" className="hover:text-[#171F2C] transition-colors">
                    Distribution Partners
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="hover:text-[#171F2C] transition-colors">
                    All Solutions Directory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-mono font-bold text-[#171F2C] uppercase tracking-wider mb-3">
                Trust &amp; Governance
              </h4>
              <ul className="space-y-2 text-[13px] text-[#64748B]">
                <li>
                  <Link to="/trust-and-safety" className="hover:text-[#171F2C] transition-colors">
                    KYB Business Verification
                  </Link>
                </li>
                <li>
                  <Link to="/trust-and-safety" className="hover:text-[#171F2C] transition-colors">
                    Controlled Information Disclosure
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-[#171F2C] transition-colors">
                    FAQ &amp; Governance Standards
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#171F2C] transition-colors">
                    About The Relay
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <p>© 2025 The Relay. All rights reserved. Zero Cold Outreach Protocol.</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
              <Lock className="w-3.5 h-3.5 text-[#171F2C]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#171F2C]">
                Secured Enclave • SHA-256
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
