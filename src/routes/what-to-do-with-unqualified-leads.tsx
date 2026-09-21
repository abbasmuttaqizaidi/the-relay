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
  Filter,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, createBreadcrumbSchema, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/what-to-do-with-unqualified-leads")({
  head: () => ({
    meta: createSeoMeta({
      title: "What To Do With Unqualified B2B Leads | The Relay",
      description:
        "Practical ways to handle B2B leads your business cannot fulfil, including referral and structured opportunity exchange.",
      canonicalPath: "/what-to-do-with-unqualified-leads",
    }),
  }),
  component: WhatToDoWithUnqualifiedLeadsPage,
});

export function WhatToDoWithUnqualifiedLeadsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/what-to-do-with-unqualified-leads#webpage`,
        url: `${SITE_URL}/what-to-do-with-unqualified-leads`,
        name: "What To Do With Unqualified B2B Leads | The Relay",
        description:
          "Practical ways to handle B2B leads your business cannot fulfil, including referral and structured opportunity exchange.",
        breadcrumb: {
          "@id": `${SITE_URL}/what-to-do-with-unqualified-leads#breadcrumb`,
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
        { name: "Unqualified Leads Guide", item: "/what-to-do-with-unqualified-leads" },
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
      q: "What defines an 'unqualified' lead in B2B commerce?",
      a: "An unqualified lead is an inbound prospective client whose project parameters do not match your company's core service offerings, active capacity, geographic jurisdiction, or target deal size—yet remains a viable, paying opportunity for another specialized firm.",
    },
    {
      q: "Why shouldn't I just tell the client 'we don't do that' and move on?",
      a: "Dismissing an unserviceable inquiry destroys the marketing cost spent acquiring it and severs future client goodwill. Connecting the client with a vetted partner solves their problem, protects your professional reputation, and monetizes the dealflow.",
    },
    {
      q: "How do I ensure the receiving business doesn't damage my client relationship?",
      a: "Only syndicate unserviceable leads across verified corporate networks like The Relay, where counterparties operate under explicit Master NCND covenants, confirmed executive attribution, and agreed quality standards.",
    },
    {
      q: "What commercial terms should I request for referring an unqualified lead?",
      a: "Standard B2B referral terms range from 5% to 15% of the total first contract value, 5% to 10% monthly revenue share on retainers, or a bilateral commitment to reciprocate dealflow.",
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
                Unqualified Leads Guide
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH 4-STEP DECISION FRAMEWORK
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Operator Decision Playbook
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  What should you do with a lead your business cannot fulfil?
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    Every B2B company generates enquiries that don't fit its scope, capacity, or target market. The traditional response is rejection—wasting acquisition costs and leaving value on the table.
                  </p>
                  <p className="text-[#334155]">
                    A structured framework allows you to evaluate unserviceable leads, determine referral feasibility, define commercial terms, and exchange the opportunity with verified specialists.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/b2b-lead-exchange"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    See B2B Lead Exchange
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post an Unfulfilled Lead
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Evaluate scope. Preserve client trust. Monetize out-of-scope demand.
                </p>
              </div>

              {/* Visual Column: 4-Step Decision Flow (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Decision Framework Pipeline
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      OPERATOR-LEAD-01
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { num: "01", title: "Identify Mismatch Driver", desc: "Scope, geography, bandwidth, or deal size mismatch" },
                      { num: "02", title: "Assess Referral Viability", desc: "Determine if a specialist peer can legitimately service it" },
                      { num: "03", title: "Establish Commercial Model", desc: "Define referral bounty %, rev share, or lead swap terms" },
                      { num: "04", title: "Execute Structured Handshake", desc: "Gated disclosure & consent on The Relay protocol", active: true },
                    ].map((st, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-[4px] border flex items-center justify-between",
                          st.active
                            ? "bg-[#171F2C] text-white border-[#171F2C]"
                            : "bg-[#F8FAFC] border-[#E2E8F0] text-[#171F2C]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "w-6 h-6 rounded-[3px] flex items-center justify-center font-mono text-[11px] font-bold shrink-0",
                              st.active ? "bg-white text-[#171F2C]" : "bg-white border border-[#E2E8F0] text-[#171F2C]"
                            )}
                          >
                            {st.num}
                          </span>
                          <div>
                            <div className={cn("text-[13px] font-semibold", st.active ? "text-white" : "text-[#171F2C]")}>
                              {st.title}
                            </div>
                            <div className={cn("text-xs truncate max-w-[240px]", st.active ? "text-slate-300" : "text-[#64748B]")}>
                              {st.desc}
                            </div>
                          </div>
                        </div>
                        {st.active && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Convert lead rejection into a repeatable commercial channel.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: 4 PRACTICAL STAGES OF UNQUALIFIED LEAD EVALUATION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Detailed Evaluation Matrix
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                The 4-Step Operator Action Plan
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Follow this systematic approach whenever your business encounters an unserviceable inbound lead:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Step 1 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Step 01
                  </div>
                  <h3 className="text-lg font-semibold text-[#171F2C] mb-2">
                    1. Identify Why It Is Unqualified
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Is the enquiry outside your core technical services, beyond regional licensing boundaries, exceeding immediate team bandwidth, or below minimum revenue thresholds?
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Diagnose the precise mismatch driver
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Step 02
                  </div>
                  <h3 className="text-lg font-semibold text-[#171F2C] mb-2">
                    2. Decide Whether It Can Be Referred
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    If another verified business can legitimately execute the client's needs with excellence, referring the lead preserves client trust and creates mutual enterprise value.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Evaluate counterparty execution capability
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Step 03
                  </div>
                  <h3 className="text-lg font-semibold text-[#171F2C] mb-2">
                    3. Define the Commercial Relationship
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Clarify commercial expectations—referral fee percentage, ongoing rev-share, or reciprocal deal swap—and establish client ownership covenants before unmasking data.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Pre-agreed commercial covenants
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Step 04
                  </div>
                  <h3 className="text-lg font-semibold text-[#171F2C] mb-2">
                    4. Use a Structured Exchange
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    The Relay provides an opportunity-level workflow where verified peers review sanitized context, express interest, agree on terms, and complete a consent-driven handshake.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Consent-driven transaction protocol
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
                Explore The Lead Monetization Mesh
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Connect into adjacent commercial guides, agency workflows, and exchange hubs:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: How To Monetize Unqualified Leads */}
              <Link
                to="/how-to-monetize-unqualified-leads"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Pricing Playbook
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Monetize Out-of-Scope
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Standard fee schedules, rev-share percentages, and contract terms.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Playbook</span>
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
                    Specialized workflows for design, engineering, and consulting agency dealflow.
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
                Documentation &amp; FAQ
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
                Unqualified Leads
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Stop Discarding Unserviceable Inbound Dealflow
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Present your unfulfilled opportunities to verified corporate peers and monetize out-of-scope demand through consent-driven commercial handshakes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/b2b-lead-exchange"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  See B2B Lead Exchange
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post an Unfulfilled Lead
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
