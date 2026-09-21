import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
  Check,
  CheckCircle2,
  X,
  ChevronDown,
  Building2,
  Layers,
  ShieldCheck,
  Lock,
  EyeOff,
  FileCheck,
  Handshake,
  Share2,
  Network,
  Users,
  Briefcase,
  Store,
  Sparkles,
  Search,
  PlusCircle,
  HelpCircle,
  Scale,
  Compass,
  ArrowLeftRight,
  Coins,
  Repeat,
  ShieldAlert,
  Percent,
  CheckSquare2,
  Workflow,
  Globe,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, createBreadcrumbSchema, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/how-to-monetize-unqualified-leads")({
  head: () => ({
    meta: createSeoMeta({
      title: "How to Monetize Unqualified Leads — B2B Opportunity Exchange | The Relay",
      description:
        "Learn how businesses can potentially create commercial value from unfulfilled opportunities through referrals, revenue share, or other agreed exchanges.",
      canonicalPath: "/how-to-monetize-unqualified-leads",
    }),
  }),
  component: HowToMonetizeUnqualifiedLeadsPage,
});

export function HowToMonetizeUnqualifiedLeadsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/how-to-monetize-unqualified-leads#webpage`,
        url: `${SITE_URL}/how-to-monetize-unqualified-leads`,
        name: "How to Monetize Unqualified Leads — B2B Opportunity Exchange | The Relay",
        description:
          "Learn how businesses can potentially create commercial value from unfulfilled opportunities through referrals, revenue share, or other agreed exchanges.",
        breadcrumb: {
          "@id": `${SITE_URL}/how-to-monetize-unqualified-leads#breadcrumb`,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "The Relay",
        },
      },
      createBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "B2B Opportunity Exchange", item: "/b2b-opportunity-exchange" },
        { name: "Monetizing Unqualified Leads", item: "/how-to-monetize-unqualified-leads" },
      ]),
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "The Relay",
        url: SITE_URL,
      },
    ],
  };

  const faqs = [
    {
      q: "Can every unqualified B2B lead be monetized?",
      a: "No. Monetization requires that the opportunity has genuine commercial viability, verified buyer intent, and an accredited peer business with delivery capacity. Relay provides the structured infrastructure for exchange rather than guaranteeing fixed monetary value for every lead.",
    },
    {
      q: "What is the most common commercial model for lead monetization?",
      a: "A percentage-based referral fee on the first contract (typically 5% to 15%), or a recurring revenue-sharing percentage (5% to 10%) on monthly retainers for the first 12 to 24 months.",
    },
    {
      q: "When does the referring company receive payment?",
      a: "Settlement terms are agreed upfront between both parties. Payment typically triggers upon the receiving company executing the client contract, collecting initial invoice funds, or achieving project milestones.",
    },
    {
      q: "How does The Relay ensure agreement compliance?",
      a: "Every transaction is bound by Master Non-Circumvent & Non-Disclosure (NCND) covenants and programmatic handshake terms, establishing legal attribution and preventing partner circumvention.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171F2C] font-sans antialiased selection:bg-[#171F2C] selection:text-white flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full flex-1 pt-6 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: BREADCRUMB STRIP
              ═══════════════════════════════════════════════════════════════════ */}
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]">
              <li>
                <Link to="/" className="hover:text-[#171F2C] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li>
                <Link to="/b2b-opportunity-exchange" className="hover:text-[#171F2C] transition-colors">
                  B2B Opportunity Exchange
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">
                Monetizing Unqualified Leads
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH MONETIZATION TOPOLOGY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Commercial Monetization Playbook
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  An unfulfilled lead can still have commercial value.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    Depending on the companies and mutual agreement, an unserviceable opportunity might support a referral fee, revenue share, reciprocal lead swap, or strategic subcontracting partnership.
                  </p>
                  <p className="text-[#334155]">
                    Relay provides a structured opportunity exchange process rather than promising a fixed monetary payout—ensuring commercial terms remain fully transparent, consented, and agreed by participants.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/b2b-lead-exchange"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore B2B Lead Exchange
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post an Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Grounded monetization frameworks. Bilateral pricing covenants. Zero hype.
                </p>
              </div>

              {/* Visual Column: Commercial Value Realization (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Commercial Value Realization
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-VAL-01
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Model 1 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Coins className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Fixed Referral Bounty</div>
                          <div className="text-xs text-[#64748B]">5% – 15% of initial closed contract</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Upfront
                      </span>
                    </div>

                    {/* Model 2 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Percent className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Recurring Revenue Share</div>
                          <div className="text-xs text-[#64748B]">5% – 10% on retainers (12–24 mos)</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Recurring
                      </span>
                    </div>

                    {/* Model 3 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Repeat className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Reciprocal Deal Swap</div>
                          <div className="text-xs text-[#64748B]">Bilateral exchange of in-scope dealflow</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Deal Swap
                      </span>
                    </div>

                    {/* Relay Guarantee Banner */}
                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                        <div>
                          <div className="text-[13px] font-bold text-white">Master NCND Protected</div>
                          <div className="text-xs text-slate-300">Contractual attribution &amp; anti-circumvention</div>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Clear terms established prior to unmasking proprietary data.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHAT MATTERS FIRST (THE 3 PREREQUISITES)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Prerequisites to Value
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Matters First in Lead Monetization
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before attempting to monetize an unserviceable opportunity, three baseline operational conditions must be satisfied:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Condition 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <CheckSquare2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    1. Relevance &amp; Intent
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    The opportunity must represent a legitimate, active business requirement with realistic budget expectations.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Genuine commercial demand
                </div>
              </div>

              {/* Condition 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    2. Delivery Capability
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    The receiving business must possess verified expertise, team bandwidth, and jurisdictional standing to execute.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Verified counterparty capacity
                </div>
              </div>

              {/* Condition 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    3. Explicit Agreement
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Both counterparties must agree on commercial covenants, attribution windows, and client boundaries upfront.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Binding commercial alignment
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: TOPIC CLUSTER & INTERNAL LINKING
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Related Frameworks &amp; Guides
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Explore The Dealflow Monetization Mesh
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Connect into adjacent decision matrices, agency workflows, and exchange hubs:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: What To Do With Unqualified Leads */}
              <Link
                to="/what-to-do-with-unqualified-leads"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Decision Matrix
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Unqualified Lead Guide
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A 4-step framework to evaluate scope, geography, and referral feasibility.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 2: B2B Lead Exchange */}
              <Link
                to="/b2b-lead-exchange"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Primary Exchange
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    B2B Lead Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The core marketplace protocol for exchanging unserviceable enterprise dealflow.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Exchange</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 3: Agency Lead Exchange */}
              <Link
                to="/agency-lead-exchange"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Agency Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Agency Lead Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Specialized monetization workflows for design, engineering, and consulting firms.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Agency Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 4: How Relay Works */}
              <Link
                to="/8-step-journey"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Lifecycle
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    8-Step Journey
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The institutional transaction lifecycle from opportunity to completed handshake.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Lifecycle</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: FAQ ACCORDION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Documentation &amp; Pricing
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Frequently Asked Questions
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
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-[13px] text-[#64748B] border-t border-[#E2E8F0] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Monetize Unserviceable Leads
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Structure Commercial Value from Out-of-Scope Inquiries
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Explore The Relay's structured opportunity exchange to turn unfulfilled enquiries into referral fees, revenue share, and reciprocal dealflow.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/b2b-lead-exchange"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore B2B Lead Exchange
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post an Opportunity
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
