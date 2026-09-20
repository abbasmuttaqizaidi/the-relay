import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Layers,
  FileText,
  Handshake,
  Scale,
  Lock,
  ArrowLeftRight,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About The Relay — B2B Opportunity Exchange" },
      {
        name: "description",
        content:
          "Learn why The Relay exists and how its consent-driven B2B opportunity exchange helps businesses turn unused commercial opportunities into value.",
      },
      {
        property: "og:title",
        content: "About The Relay — B2B Opportunity Exchange",
      },
      {
        property: "og:description",
        content:
          "Business opportunities should not disappear just because one business cannot fulfil them. Discover the mission and architecture of The Relay.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171F2C] font-sans antialiased selection:bg-[#171F2C] selection:text-white flex flex-col">
      <main className="w-full flex-1 pt-8 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* ═══════════════════════════════════════════════════════════════════
              HERO SECTION: BRAND STATEMENT & EXECUTIVE MISSION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pt-2 pb-2">
            <div className="flex flex-col gap-3.5 max-w-4xl">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]">
                <span>Platform</span>
                <span className="text-[#94A3B8]">/</span>
                <span>Company</span>
                <span className="text-[#94A3B8]">/</span>
                <span className="text-[#171F2C] font-bold">About The Relay</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18]">
                Business opportunities should not disappear just because one company cannot fulfil them.
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed">
                The Relay is an institutional-grade <strong className="text-[#171F2C] font-semibold">Consent-Driven Opportunity Exchange (CDOE)</strong> engineered for verified B2B enterprises to monetize unserviceable inbound demand, discover reciprocal partners, and execute sovereign handshakes—without noise, spam, or social feeds.
              </p>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: THE ORIGIN STORY (WHY RELAY EXISTS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                  Millions in qualified commercial demand evaporate in unread inboxes every day.
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-[#64748B] leading-relaxed font-normal">
                  <p>
                    Every day, high-performing agencies, SaaS founders, and enterprise operators receive inbound requests they simply cannot service. The budget might be below tier, the tech stack might conflict, the geographic jurisdiction might fall outside their focus, or internal capacity is simply exhausted.
                  </p>
                  <p>
                    Traditionally, that client lead is politely declined or quietly discarded. The introducing business earns nothing, the client is left stranded, and a complementary provider loses an ideal engagement.
                  </p>
                  <p className="text-[#171F2C] font-medium border-l-2 border-[#171F2C] pl-4 py-0.5">
                    The Relay creates a structured, confidential route for that opportunity to transfer to an accredited peer business under enforceable revenue-share, referral, or reciprocal agreements.
                  </p>
                </div>
              </div>

              {/* Visual Card / Highlights */}
              <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 space-y-6">
                <div className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#64748B] font-bold">
                  The Value Arbitrage
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#171F2C]">Monetize Out-of-Scope Deals</h4>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        Convert unserviceable leads into contracted 10%–25% closed revenue shares.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#171F2C]">Discreet Bilateral Discovery</h4>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        Shield client identities and company trademarks until terms are ratified.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#171F2C]">Zero Cold Outbound Outreach</h4>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        Eliminate scraped lead lists and unsolicited DM spam permanently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHAT RELAY IS VS WHAT RELAY IS NOT (MONOCHROME MATRIX)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Clarity &amp; Positioning
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                What The Relay Is — And What It Is Not.
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                We built Relay deliberately against the conventions of social media, lead scrapers, and open noise networks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CARD 1: WHAT RELAY IS */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-[#171F2C]">
                      What Relay IS
                    </h3>
                  </div>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-[#171F2C] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">A Verified Commercial Exchange:</strong>
                        <span className="text-[#64748B]">100% KYB audited B2B entities trading qualified leads, distribution channels, and capacity.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">Structured C-DOES Protocol:</strong>
                        <span className="text-[#64748B]">A strict bilateral sequence (Opportunity ➔ Interest ➔ Negotiation ➔ Agreement ➔ Consent ➔ Handshake).</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">Double-Blinded Privacy Shield:</strong>
                        <span className="text-[#64748B]">Proprietary trademarks and executive details remain masked until non-circumvention terms are locked.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">Sovereign Direct Execution:</strong>
                        <span className="text-[#64748B]">Relay enables the connection and steps aside—never intercepting invoices or client deliverables.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-[11px] font-mono text-[#171F2C] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#171F2C]" />
                  <span>Institutional Grade • High-Fidelity Network</span>
                </div>
              </div>

              {/* CARD 2: WHAT RELAY IS NOT */}
              <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center">
                      <X className="w-3.5 h-3.5 text-[#171F2C]" />
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-[#171F2C]">
                      What Relay IS NOT
                    </h3>
                  </div>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-[#171F2C] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">NOT a Social Feed:</strong>
                        <span className="text-[#64748B]">No followers, likes, vanity engagement algorithms, or infinite scrolling feeds.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">NOT an Open-Ended DM Chat:</strong>
                        <span className="text-[#64748B]">Zero cold outreach, unsolicited pitches, automated spam bots, or unwanted sales DMs.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">NOT a Lead Brokerage or Scraper:</strong>
                        <span className="text-[#64748B]">We never scrape public registers, auction contact data, or blast leads to multiple bidders.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                      <div>
                        <strong className="text-[#171F2C] font-bold block">NOT a Middleman Tax:</strong>
                        <span className="text-[#64748B]">No arbitration tax or revenue capture on downstream client relationship longevity.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-[11px] font-mono text-[#64748B] font-semibold">
                  <Lock className="w-4 h-4 text-[#64748B]" />
                  <span>Zero Cold Outreach Covenant Active</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: THREE FOUNDATIONAL PRINCIPLES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Product Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Our Core Commercial Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Principle 1 */}
              <div className="bg-white p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C]">1. Conservation of Value</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Every qualified inbound client represents trust and effort. B2B value should be conserved and transferred to accredited partners rather than left to go cold.
                </p>
              </div>

              {/* Principle 2 */}
              <div className="bg-white p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Scale className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C]">2. Bilateral Discipline</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Interest is distinct from negotiation, and negotiation is distinct from agreement. Strict phase gating protects both parties from one-sided exploitation.
                </p>
              </div>

              {/* Principle 3 */}
              <div className="bg-white p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Handshake className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C]">3. Sovereign Execution</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Relay is an introduction engine. Once a mutual handshake is ratified, businesses direct their agreements, contracts, and delivery outside the platform freely.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: EXPLORE PLATFORM ARCHITECTURE LINKS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#171F2C] font-display">
                  Explore The Relay Architecture
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  Deep-dive into the technical protocols, step-by-step journeys, and governance standards.
                </p>
              </div>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171F2C] hover:bg-[#1E293B] text-white rounded-[4px] text-xs font-semibold transition-colors shrink-0"
              >
                <span>Browse Live Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <Link
                to="/8-step-journey"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  How Relay Works (8-Step Journey)
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Interactive timeline of the 8 bilateral milestones from verify to handshake.
                </p>
              </Link>

              <Link
                to="/core-pillars"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">CDOES Engine</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  Core Pillars &amp; Architecture
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The foundational thesis: Value Creation, Consent Governance, and Commercial Discipline.
                </p>
              </Link>

              <Link
                to="/faq"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">Governance</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  FAQ &amp; Protocol Standards
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  15 cataloged topics covering bilateral covenants, KYB audits, and pricing.
                </p>
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              BOTTOM CTA CARD (MONOCHROME EXECUTIVE)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-[#171F2C] text-white rounded-[4px] p-8 sm:p-12 text-center space-y-5 border border-[#171F2C]">
            <span className="inline-flex text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#94A3B8] bg-[#112030] px-3 py-1 rounded-[4px] border border-slate-700">
              Verified B2B Network
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              Ready to turn unserviceable demand into commercial momentum?
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Join verified B2B companies discovering high-intent partnerships and unmediated dealflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/opportunities"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#171F2C] hover:bg-[#F8FAFC] rounded-[4px] text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <span>Explore Opportunity Board</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link
                to="/8-step-journey"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#171F2C] hover:bg-[#1E293B] text-white border border-slate-700 rounded-[4px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>See How It Works</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
