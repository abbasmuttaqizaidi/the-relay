import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeftRight,
  FilterX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/core-pillars")({
  head: () => ({
    meta: [
      { title: "Core Pillars | The Relay — B2B Reciprocal Exchange Architecture" },
      {
        name: "description",
        content:
          "The foundational principles of The Relay: Value Creation, Consent-Driven Opportunity Exchange (CDOES), and Commercial Discipline.",
      },
      {
        property: "og:title",
        content: "Core Pillars | The Relay — B2B Reciprocal Exchange Architecture",
      },
      {
        property: "og:description",
        content:
          "What Relay creates, how Relay enables it, and what makes Relay different.",
      },
      { property: "og:type", content: "website" },
    ],
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
        const targetLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
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
      const targetLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
    setActivePillar(idx);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-sans antialiased min-h-screen flex flex-col selection:bg-slate-900/10 selection:text-slate-900">
      {/* MAIN CONTENT */}
      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="w-full pt-12 pb-10 md:pt-16 md:pb-12 px-6 bg-white border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Punchy Main Headline */}
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-[46px] text-slate-950 tracking-tight leading-[1.15] mb-3">
              Three Core Pillars. One Clean Exchange.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              What Relay creates, how Relay enables it, and what makes Relay different.
            </p>
          </div>
        </section>

        {/* 2. THE 3 PILLARS IN A UNIFIED 3-COLUMN GRID */}
        <section className="w-full py-12 md:py-16 px-6 max-w-7xl mx-auto">
          <div
            ref={pillarsScrollRef}
            onScroll={handlePillarsScroll}
            className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-6 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            {/* CARD 1: PILLAR 01 — VALUE CREATION */}
            <article className="w-[85vw] max-w-[380px] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all flex flex-col justify-between relative group">
              <div>
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-mono font-bold tracking-wider uppercase">
                    <span>PIL-01</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-900">Value Creation</span>
                  </div>
                  <ArrowLeftRight className="w-5 h-5 text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-bold text-xl text-slate-950 tracking-tight leading-snug mb-2">
                  Trade Unused Leads into Real Revenue
                </h2>
                <p className="text-slate-600 text-[13.5px] leading-relaxed mb-5">
                  Don't waste client leads you can't take. Trade them with trusted businesses for cash cuts or valuable services.
                </p>

                {/* Core Idea Callout */}
                <div className="bg-slate-50 border-l-2 border-l-slate-900 rounded-r-xl p-4 mb-5">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Simple Rule
                  </span>
                  <p className="text-[13px] font-semibold text-slate-900 leading-snug italic">
                    "I have a deal I can't take — what can I get in return?"
                  </p>
                </div>

                {/* Quick Exchange List */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    What You Can Get:
                  </span>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>10%–25% revenue share from won deals</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct warm client referrals in return</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Expert team skills or tech barter</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Co-selling &amp; distribution partners</span>
                  </div>
                </div>
              </div>

              {/* Footer Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Extra Income</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  Zero wasted opportunities
                </span>
              </div>
            </article>

            {/* CARD 2: PILLAR 02 — CDOES */}
            <article className="w-[85vw] max-w-[380px] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-950 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all flex flex-col justify-between relative group">
              <div>
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-mono font-bold tracking-wider uppercase">
                    <span>PIL-02</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-900">Protected System</span>
                  </div>
                  <Lock className="w-5 h-5 text-slate-700" />
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-bold text-xl text-slate-950 tracking-tight leading-snug mb-2">
                  100% Mutual Consent (CDOES)
                </h2>
                <p className="text-slate-600 text-[13.5px] leading-relaxed mb-5">
                  You stay completely in control. Contact details and identities are revealed only after both sides agree.
                </p>

                {/* Core Idea Callout */}
                <div className="bg-slate-50 border-l-2 border-l-slate-900 rounded-r-xl p-4 mb-5">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Simple Rule
                  </span>
                  <p className="text-[13px] font-semibold text-slate-900 leading-snug italic">
                    "No forced deals. Nothing unlocks without mutual agreement."
                  </p>
                </div>

                {/* Compact 8-Step Bilateral Sequence Chips */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Simple 8-Step Journey:
                  </span>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      1. Verify
                    </span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      2. Post
                    </span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      3. Discover
                    </span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      4. Express Interest
                    </span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      5. Acknowledge
                    </span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      6. Negotiate
                    </span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-[11px] font-medium bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700">
                      7. Agree
                    </span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-[11px] font-bold bg-slate-900 border border-slate-900 px-2.5 py-1 rounded text-white shadow-xs">
                      8. Handshake
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Full Privacy</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Hidden until you approve
                </span>
              </div>
            </article>

            {/* CARD 3: PILLAR 03 — ZERO SOCIAL NOISE */}
            <article className="w-[85vw] max-w-[380px] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all flex flex-col justify-between relative group">
              <div>
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-mono font-bold tracking-wider uppercase">
                    <span>PIL-03</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-900">Zero Noise</span>
                  </div>
                  <FilterX className="w-5 h-5 text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-bold text-xl text-slate-950 tracking-tight leading-snug mb-2">
                  Strictly Business. Zero Spam.
                </h2>
                <p className="text-slate-600 text-[13.5px] leading-relaxed mb-5">
                  Relay is built for real business deals — not social feeds, likes, or endless unsolicited sales pitches.
                </p>

                {/* Core Idea Callout */}
                <div className="bg-slate-50 border-l-2 border-l-slate-900 rounded-r-xl p-4 mb-5">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Simple Rule
                  </span>
                  <p className="text-[13px] font-semibold text-slate-900 leading-snug italic">
                    "Businesses come to make deals, not to scroll social feeds."
                  </p>
                </div>

                {/* What Relay Eliminates List */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    What We Eliminate:
                  </span>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-900">
                    <span className="text-red-600 font-bold text-[14px] leading-tight shrink-0 mt-0.5">✕</span>
                    <span>No cold emails, bot spam, or scraping</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-900">
                    <span className="text-red-600 font-bold text-[14px] leading-tight shrink-0 mt-0.5">✕</span>
                    <span>No algorithmic feeds, likes, or vanity posts</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-900">
                    <span className="text-red-600 font-bold text-[14px] leading-tight shrink-0 mt-0.5">✕</span>
                    <span>No uninvited sales DMs or aggressive pitching</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[13px] text-slate-900">
                    <span className="text-red-600 font-bold text-[14px] leading-tight shrink-0 mt-0.5">✕</span>
                    <span>No endless casual back-and-forth chat</span>
                  </div>
                </div>
              </div>

              {/* Footer Tag */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Dealroom Speed</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  Direct verified partners
                </span>
              </div>
            </article>
          </div>

          {/* Mobile Pagination Dots & Controls */}
          <div className="flex lg:hidden items-center justify-between pt-4">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollPillarsTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activePillar === idx
                      ? "w-6 bg-slate-900"
                      : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to pillar ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollPillarsTo(Math.max(activePillar - 1, 0))}
                disabled={activePillar === 0}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-xs"
                aria-label="Previous pillar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollPillarsTo(Math.min(activePillar + 1, 2))}
                disabled={activePillar === 2}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-xs"
                aria-label="Next pillar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. AT-A-GLANCE SUMMARY SECTION */}
        <section className="w-full py-12 md:py-16 px-6 bg-[#0f172a] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-slate-400 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                The Three Pillars in One Sentence
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl tracking-tight text-white">
                VALUE EXCHANGE • CDOES • NO-NOISE BUSINESS NETWORK
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Block 1 */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 sm:p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2.5 text-slate-400">
                  <span className="font-mono text-xs font-bold text-white">01.</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                    What We Create
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-white mb-1.5">
                  Real Asset Liquidity
                </h3>
                <p className="text-slate-400 text-[13.5px] leading-relaxed">
                  Monetize unfulfillable leads &amp; surplus capacity, converting discarded inquiries into active rev-share and barter.
                </p>
              </div>

              {/* Block 2 */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 sm:p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2.5 text-slate-400">
                  <span className="font-mono text-xs font-bold text-white">02.</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                    How We Enable It
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-white mb-1.5">
                  Total Control Protocol
                </h3>
                <p className="text-slate-400 text-[13.5px] leading-relaxed">
                  Bilateral consent sequence with zero premature exposure, unmasking parties only after mutual commercial confirmation.
                </p>
              </div>

              {/* Block 3 */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 sm:p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2.5 text-slate-400">
                  <span className="font-mono text-xs font-bold text-white">03.</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                    Why It Works
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-white mb-1.5">
                  Pure Signal Integrity
                </h3>
                <p className="text-slate-400 text-[13.5px] leading-relaxed">
                  100% consensual, zero outbound spam, feeds, or vanity algorithms. Verified commercial entities only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION SECTION */}
        <section className="w-full py-16 px-6 bg-white border-t border-slate-200/80">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-950 tracking-tight mb-3">
              Ready to exchange value without cold outreach?
            </h2>
            <p className="text-slate-600 text-[15px] max-w-xl mx-auto mb-8">
              Join high-performing B2B enterprises and specialist agencies turning untapped opportunities into verified reciprocal growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                to="/opportunities"
                className="w-full sm:w-auto h-11 px-7 bg-slate-900 hover:bg-black active:bg-slate-950 text-white font-medium text-[14px] rounded-md flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/post"
                className="w-full sm:w-auto h-11 px-7 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 border border-slate-200 font-medium text-[14px] rounded-md flex items-center justify-center transition-all"
              >
                Post an Opportunity
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Mutual Consent Guarantee • Zero Cold Outbound • Verified Businesses Only</span>
            </div>
          </div>
        </section>
      </main>

      {/* 5. CLEAN FOOTER */}
      <footer className="w-full bg-white border-t border-slate-200/80">
        <div className="w-full max-w-7xl mx-auto px-6 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200/80">
            {/* Col 1 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-3">
                Protocol Architecture
              </h4>
              <ul className="space-y-2 text-[13px] text-slate-600">
                <li>
                  <Link to="/core-pillars" className="hover:text-slate-950 transition-colors">
                    Blinded Discovery
                  </Link>
                </li>
                <li>
                  <Link to="/core-pillars" className="hover:text-slate-950 transition-colors">
                    Reciprocal Parity
                  </Link>
                </li>
                <li>
                  <Link to="/core-pillars" className="hover:text-slate-950 transition-colors">
                    Bilateral NDA
                  </Link>
                </li>
                <li>
                  <Link to="/core-pillars" className="hover:text-slate-950 transition-colors">
                    Stage 4 Handshake
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-3">
                Governance
              </h4>
              <ul className="space-y-2 text-[13px] text-slate-600">
                <li>
                  <a href="#governance" className="hover:text-slate-950 transition-colors">
                    GLEIF / LEI Attestation
                  </a>
                </li>
                <li>
                  <a href="#governance" className="hover:text-slate-950 transition-colors">
                    KYB Verification Desk
                  </a>
                </li>
                <li>
                  <a href="#governance" className="hover:text-slate-950 transition-colors">
                    Encryption Standards
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-3">
                Dealflow
              </h4>
              <ul className="space-y-2 text-[13px] text-slate-600">
                <li>
                  <Link to="/opportunities" className="hover:text-slate-950 transition-colors">
                    Distribution Partnerships
                  </Link>
                </li>
                <li>
                  <Link to="/opportunities" className="hover:text-slate-950 transition-colors">
                    Co-Selling Pacts
                  </Link>
                </li>
                <li>
                  <Link to="/opportunities" className="hover:text-slate-950 transition-colors">
                    Tech Integration
                  </Link>
                </li>
                <li>
                  <Link to="/opportunities" className="hover:text-slate-950 transition-colors">
                    Infrastructure Barter
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-[13px] text-slate-600">
                <li>
                  <a href="#legal" className="hover:text-slate-950 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#legal" className="hover:text-slate-950 transition-colors">
                    Bilateral NDA Governance
                  </a>
                </li>
                <li>
                  <a href="#legal" className="hover:text-slate-950 transition-colors">
                    SOC-2 Attestation
                  </a>
                </li>
                <li>
                  <a href="#legal" className="hover:text-slate-950 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2025 The Relay Exchange Inc. All rights reserved. Zero Cold Outreach Protocol.</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Secured Enclave • SHA-256
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
