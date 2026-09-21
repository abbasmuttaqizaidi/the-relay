import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Scale,
  ArrowRight,
  Check,
  Layers,
  Shield,
  BadgeCheck,
  Gavel,
  ChevronDown,
} from "lucide-react";
import { createSeoMeta, SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trust-and-safety")({
  head: () =>
    createSeoMeta({
      title: "Trust & Safety for B2B Opportunity Exchange | The Relay",
      description:
        "Learn how The Relay approaches trust and safety for B2B opportunity exchange, including business verification, controlled disclosure, consent, and commercial security.",
      path: "/trust-and-safety",
    }),
  component: TrustAndSafetyPage,
});

export function TrustAndSafetyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does The Relay verify businesses participating in the exchange?",
      a: "Every participant is audited against statutory corporate registries (Know Your Business - KYB) and authorized corporate email DNS records to confirm corporate identity and prevent unauthorized or shell accounts.",
    },
    {
      q: "How is confidential business and opportunity data protected?",
      a: "Company brand trademarks, executive contacts, and underlying client details remain strictly masked during exploration and preliminary evaluation through gated, controlled information disclosure.",
    },
    {
      q: "When are contact details and company identities revealed?",
      a: "Contact channels and company identities are only unmasked after both parties mutually ratify commercial terms and agree to bilateral non-circumvention covenants.",
    },
    {
      q: "How does The Relay prevent unsolicited cold outreach?",
      a: "The Relay is built strictly around verified opportunities and structured bilateral workflows rather than open social feeds or public messaging, making cold unsolicited prospecting structurally impossible.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/trust-and-safety#webpage`,
        url: `${SITE_URL}/trust-and-safety`,
        name: "Trust & Safety for B2B Opportunity Exchange | The Relay",
        description:
          "Learn how The Relay approaches trust and safety for B2B opportunity exchange, including business verification, controlled disclosure, consent, and commercial security.",
        breadcrumb: {
          "@id": `${SITE_URL}/trust-and-safety#breadcrumb`,
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
        "@id": `${SITE_URL}/trust-and-safety#breadcrumb`,
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
            name: "Trust & Safety",
            item: `${SITE_URL}/trust-and-safety`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/trust-and-safety#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#171F2C] font-sans antialiased selection:bg-[#171F2C] selection:text-white flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full flex-1 pt-8 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* ═══════════════════════════════════════════════════════════════════
              HERO SECTION: BRAND STATEMENT & TRUST POSITIONING
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pt-2 pb-2">
            <div className="flex flex-col gap-3.5 max-w-4xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]">
                <Link to="/" className="hover:text-[#171F2C] transition-colors">
                  Platform
                </Link>
                <span className="text-[#94A3B8]">/</span>
                <span className="text-[#64748B]">Trust &amp; Safety</span>
                <span className="text-[#94A3B8]">/</span>
                <span className="text-[#171F2C] font-bold">B2B Opportunity Exchange</span>
              </nav>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18]">
                Trust &amp; Safety for B2B Opportunity Exchange
              </h1>

              <div className="space-y-2">
                <p className="text-lg sm:text-xl font-semibold text-[#171F2C]">
                  Commercial exchange needs clear boundaries.
                </p>
                <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed">
                  The Relay is built on the premise that high-value B2B opportunities cannot thrive in open, noisy environments. We enforce authenticated entity verification, controlled information disclosure, strict stage gating, and legally binding bilateral covenants to protect enterprise reputations at every milestone across the <Link to="/b2b-opportunity-exchange" className="text-[#171F2C] underline underline-offset-2 hover:text-[#000000]">B2B opportunity exchange</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: THE FOUR CORE TRUST PILLARS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center text-xs font-mono font-bold">
                    01
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#64748B] font-semibold">
                    Attestation
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-display font-bold text-[#171F2C]">
                  B2B Business Verification and Identity
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Relay is designed around authenticated corporate attribution. Every participant is audited against statutory corporate registries (Know Your Business - KYB) and authorized corporate email DNS records. Sole proprietors, shell entities, and automated scrapers are permanently prevented from accessing platform dealflow.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-[11px] font-mono text-[#171F2C] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#171F2C]" />
                <span>100% Entity Verification Required</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center text-xs font-mono font-bold">
                    02
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#64748B] font-semibold">
                    Privacy Shield
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-display font-bold text-[#171F2C]">
                  Controlled Information Disclosure for B2B Opportunities
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Personal and sensitive commercial details are never exposed simply because someone is browsing an opportunity. Company brand trademarks, executive names, and underlying client records remain strictly masked during exploration and preliminary evaluation. Disclosure is a deliberate, gated milestone.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-[11px] font-mono text-[#171F2C] font-semibold">
                <Lock className="w-4 h-4 text-[#171F2C]" />
                <span>Double-Blinded Parameter Masking</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center text-xs font-mono font-bold">
                    03
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#64748B] font-semibold">
                    Gated Consent
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-display font-bold text-[#171F2C]">
                  Consent Before B2B Commercial Interaction
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Interest is distinct from negotiation, and negotiation is distinct from agreement. The C-DOES workflow enforces clear separation between states. Neither party receives unlocked contact channels until commercial terms and bilateral covenants are mutually ratified in writing.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-[11px] font-mono text-[#171F2C] font-semibold">
                <FileCheck className="w-4 h-4 text-[#171F2C]" />
                <span>Dual Digital Ratification Required</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center text-xs font-mono font-bold">
                    04
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#64748B] font-semibold">
                    Zero Spam
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-display font-bold text-[#171F2C]">
                  A Focused B2B Opportunity Exchange
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Relay is built strictly around verified opportunities and contractual actions rather than social feeds, followers, or open-ended chat rooms. Cold outbound prospecting and unsolicited sales pitches are structurally impossible within the network.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2 text-[11px] font-mono text-[#171F2C] font-semibold">
                <Scale className="w-4 h-4 text-[#171F2C]" />
                <span>Anti-Solicitation Covenant Enforced</span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: TRUST ARCHITECTURE & GATED DISCLOSURE PIPELINE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-10 lg:p-12">
            <div className="space-y-8">
              <div className="max-w-2xl space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                  Protocol Execution
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                  Trust and Safety in the B2B Opportunity Exchange
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  How information transitions securely from initial blinded discovery to final sovereign handshake.
                </p>
              </div>

              {/* 4-Phase Architecture Pipeline Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Stage 1 */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#171F2C]">Phase 01</span>
                      <span className="text-[10px] font-mono text-[#64748B] uppercase">Public</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#171F2C]">Blinded Opportunity Teaser</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Opportunity scope, industry sector, deal size bounds, and tier requirements are published anonymously.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[10px] font-mono text-[#171F2C] font-semibold">
                    State: 100% Blinded
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#171F2C]">Phase 02</span>
                      <span className="text-[10px] font-mono text-[#64748B] uppercase">Gated</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#171F2C]">Blinded Proposal &amp; Terms</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Counterparties express interest with structured trade terms (rev-share %, barter scope). Identities remain masked.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[10px] font-mono text-[#171F2C] font-semibold">
                    State: Economic Alignment
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#171F2C]">Phase 03</span>
                      <span className="text-[10px] font-mono text-[#64748B] uppercase">Binding</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#171F2C]">Non-Circumvention Lock</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Both companies dual-sign master bilateral non-circumvention (NCND) covenants binding their commercial conduct.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[10px] font-mono text-[#171F2C] font-semibold">
                    State: Legal Ratification
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="bg-white border border-[#171F2C] rounded-[4px] p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#171F2C]">Phase 04</span>
                      <span className="text-[10px] font-mono text-[#171F2C] font-bold uppercase">Sovereign</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#171F2C]">Mutual Handshake Reveal</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Direct executive emails, phone lines, and corporate identities are unmasked simultaneously for external handover.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#171F2C] text-[10px] font-mono text-[#171F2C] font-bold">
                    State: Sovereign Execution
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: LEGAL COVENANTS & ENFORCEMENT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Legal Enforcement
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Commercial Safeguards and B2B Due Diligence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Covenant 1 */}
              <div className="bg-white p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Gavel className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C]">Master NCND Covenants</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Every mutual agreement triggers standardized bilateral non-circumvention terms that strictly prevent counterparties from bypassing the introducing party or cutting out contracted rev-shares.
                </p>
              </div>

              {/* Covenant 2 */}
              <div className="bg-white p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <BadgeCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C]">Cryptographic Audit Trail</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Stage transitions, proposal submissions, and handshake consent actions produce tamper-evident timestamped logs admissible for expedited dispute arbitration under International Chamber of Commerce (ICC) rules.
                </p>
              </div>

              {/* Covenant 3 */}
              <div className="bg-white p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] flex items-center justify-center font-bold text-sm">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#171F2C]">Permanent Revocation Policy</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Entities attempting unsolicited cold outreach, unauthorized deal leaking, or bad-faith negotiations are permanently banned from accessing the verified exchange pool.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: TRUST & SAFETY FAQ (DOM-RENDERED FOR SEARCH CRAWLERS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-t border-[#E2E8F0] pt-12 space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Security &amp; Governance Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Trust &amp; Safety for B2B Opportunity Exchange FAQ
              </h2>
            </div>

            <div className="max-w-4xl space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFC] transition-colors"
                    >
                      <span className="text-[14px] font-semibold text-[#171F2C]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ml-3",
                          isOpen && "rotate-180 text-[#171F2C]"
                        )}
                      />
                    </button>
                    {/* FAQ Answer permanently present in DOM for search crawlers */}
                    <div
                      className={cn(
                        "px-4 pb-4 pt-1 text-[13px] text-[#64748B] border-t border-[#E2E8F0] leading-relaxed",
                        !isOpen && "hidden"
                      )}
                    >
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: CROSS NAVIGATION LINKS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#171F2C] font-display">
                  Explore The Relay Framework
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  Review the complete <Link to="/8-step-journey" className="underline hover:text-[#171F2C]">8-step workflow</Link>, explore the <Link to="/b2b-lead-exchange" className="underline hover:text-[#171F2C]">B2B lead exchange</Link>, connect via the <Link to="/b2b-partnership-network" className="underline hover:text-[#171F2C]">B2B partnership network</Link>, or evaluate <Link to="/referral-partnerships" className="underline hover:text-[#171F2C]">referral partnerships</Link>, <Link to="/channel-partnerships" className="underline hover:text-[#171F2C]">channel partnerships</Link>, and <Link to="/distribution-partners" className="underline hover:text-[#171F2C]">distribution partners</Link>.
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
                  how The Relay works
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Interactive walkthrough from verification to completed handshake.
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
                  Exchange value, consent governance, and commercial discipline.
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
                  Answers to bilateral covenants, KYB audits, and pricing.
                </p>
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              BOTTOM CTA CARD (MONOCHROME EXECUTIVE)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-[#171F2C] text-white rounded-[4px] p-8 sm:p-12 text-center space-y-5 border border-[#171F2C]">
            <span className="inline-flex text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#94A3B8] bg-[#112030] px-3 py-1 rounded-[4px] border border-slate-700">
              Responsible B2B Exchange
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              Ready to trade commercial opportunities with confidence?
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Experience bilateral dealmaking with complete privacy, verified counterparties, and zero cold outreach.
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
                <span>See The 8-Step Workflow</span>
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
