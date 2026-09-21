import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Building2,
  Layers,
  ShieldCheck,
  FileText,
  Handshake,
  Share2,
  Network,
  Users,
  Briefcase,
  Search,
  PlusCircle,
  HelpCircle,
  Scale,
  Compass,
  ArrowLeftRight,
  Repeat,
  CheckSquare2,
  Workflow,
  Globe,
  Palette,
  Code2,
  TrendingUp,
  AlertCircle,
  Target,
  BarChart3,
  Layers3,
  XCircle,
  Clock,
  MessageSquare,
  RefreshCw,
  Ban,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/what-to-do-with-unqualified-leads")({
  head: () =>
    createSeoMeta({
      title: "What To Do With Unqualified B2B Leads | The Relay",
      description:
        "Learn what to do with unqualified B2B leads, including when to disqualify, nurture, recycle, refer, or exchange opportunities your business cannot fulfil.",
      path: "/what-to-do-with-unqualified-leads",
    }),
  component: WhatToDoWithUnqualifiedLeadsPage,
});

export function WhatToDoWithUnqualifiedLeadsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is an unqualified B2B lead?",
      a: "An unqualified B2B lead is an inbound enquiry or prospect that does not meet a company's specific criteria for active sales pursuit or delivery. This may be due to a fundamental mismatch in industry, service requirements, or geography, or a temporary factor such as timing, budget readiness, or incomplete project detail.",
    },
    {
      q: "Does unqualified mean the lead is bad?",
      a: "No. 'Unqualified' is a disposition relative to your specific company's service offerings, capacity, and target market—not an absolute judgment of the prospect's legitimacy. A lead that is a poor operational fit for your business may be an ideal client for a specialized counterpart.",
    },
    {
      q: "What should you do with an unqualified lead?",
      a: "The correct disposition depends on why the lead failed qualification. Permanent fit failures should be disqualified or referred to a specialist provider. Temporary timing or budget constraints should be placed into marketing nurture or lead recycling workflows. Incomplete enquiries should receive follow-up clarifying questions.",
    },
    {
      q: "Should unqualified leads simply be deleted from your pipeline?",
      a: "Generally, no. Deleting unqualified leads prevents your organization from learning about marketing acquisition patterns or maintaining future touchpoints. Categorizing them properly allows you to nurture future buyers, recycle delayed opportunities, or explore referral partnerships.",
    },
    {
      q: "When should you nurture an unqualified lead?",
      a: "Nurturing is appropriate when there is a plausible future fit—such as when the company matches your ideal profile, but the project timeline is delayed, the budget cycle has not opened, or internal stakeholder approval is pending.",
    },
    {
      q: "When should you refer an unqualified lead?",
      a: "Referring an opportunity is appropriate when the prospect has a clear, genuine business requirement that falls outside your agency's service capabilities, technical stack, delivery bandwidth, or geographic coverage, and where a capable counterpart provider can legitimately serve the need.",
    },
    {
      q: "What is the difference between an unqualified lead and an out-of-scope lead?",
      a: "An unqualified lead is an overarching category describing any enquiry that fails sales criteria (including spam, unverified queries, or poor budget fit). An out-of-scope lead is often a qualified, legitimate project enquiry that simply requires services, technologies, or operational capacity that your business does not offer.",
    },
    {
      q: "Can you exchange a lead that your business cannot fulfil?",
      a: "Yes. When an enquiry represents a genuine commercial opportunity that falls outside your delivery capabilities, you can list the structured requirements on a B2B opportunity exchange like The Relay to discover suitable counterparties interested in fulfilling the work.",
    },
    {
      q: "How should businesses protect client information when referring an opportunity?",
      a: "Agencies should describe project parameters, technical requirements, and general commercial context without disclosing identifying client contact details until mutual interest, suitability, and client consent have been established.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/what-to-do-with-unqualified-leads#webpage`,
        url: `${SITE_URL}/what-to-do-with-unqualified-leads`,
        name: "What To Do With Unqualified B2B Leads | The Relay",
        description:
          "Learn what to do with unqualified B2B leads, including when to disqualify, nurture, recycle, refer, or exchange opportunities your business cannot fulfil.",
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
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/what-to-do-with-unqualified-leads#breadcrumb`,
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
            name: "B2B Opportunity Exchange",
            item: `${SITE_URL}/b2b-opportunity-exchange`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "What To Do With Unqualified Leads",
            item: `${SITE_URL}/what-to-do-with-unqualified-leads`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/what-to-do-with-unqualified-leads#faq`,
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

      <main className="w-full flex-1 pt-6 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* ═══════════════════════════════════════════════════════════════════
              BREADCRUMB STRIP
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
              SECTION 1: HERO
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  B2B LEAD QUALIFICATION &amp; ROUTING
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-5">
                  What Should You Do With an Unqualified B2B Lead?
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    "Unqualified" is not a single bucket. An inbound enquiry may be a poor structural fit, temporarily unready, missing critical detail, outside your delivery scope, outside your territory, or constrained by capacity.
                  </p>
                  <p className="text-[#334155]">
                    The right operational response depends entirely on diagnosing why the lead failed qualification—whether that means disqualifying, nurturing, requesting clarification, referring, or exchanging the opportunity.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore B2B Lead Opportunities
                  </Link>
                  <Link
                    to="/how-to-exchange-business-leads"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Learn How to Exchange Business Leads
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Diagnose root causes · Route with intention · Protect prospect goodwill
                </p>
              </div>

              {/* Graphic Column: Diagnosis Matrix Overview */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Disposition Routing Matrix
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      QUAL-ROUTER-V1
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">Structural Fit Failure</div>
                        <div className="text-[11px] text-[#64748B]">Wrong industry, unsupported model</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-white border border-[#E2E8F0] text-[#64748B]">
                        Disqualify
                      </span>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">Readiness / Timing Gap</div>
                        <div className="text-[11px] text-[#64748B]">Budget pending, future roadmap</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-white border border-[#E2E8F0] text-[#171F2C]">
                        Nurture / Recycle
                      </span>
                    </div>

                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">Scope / Capability Mismatch</div>
                        <div className="text-[11px] text-slate-300">Valid need, unserviceable internally</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-white text-[#171F2C] font-bold">
                        Refer / Exchange
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Every disposition begins with accurate diagnosis.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHY IS THE LEAD UNQUALIFIED?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Root Cause Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Why Is the Lead Unqualified?
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed">
                Treat "unqualified" as a status disposition rather than an explanation. To determine the correct next step, sales and operations teams must first identify the underlying root cause:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Problem A */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                    ROOT CAUSE A
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Fit Problem
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    The prospect's company size, industry, technology environment, or core use case fundamentally does not match what your business serves.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#171F2C] font-mono">
                  <strong>Typical Action:</strong> Disqualify or route elsewhere
                </div>
              </div>

              {/* Problem B */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                    ROOT CAUSE B
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Readiness Problem
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    The company is an ideal fit, but active budget, internal organizational priority, or project start dates are scheduled for a future period.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#171F2C] font-mono">
                  <strong>Typical Action:</strong> Nurture or recycle
                </div>
              </div>

              {/* Problem C */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                    ROOT CAUSE C
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Information Problem
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    The enquiry contains insufficient detail regarding scope, timeline, or stakeholder authority to make an accurate qualification decision.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#171F2C] font-mono">
                  <strong>Typical Action:</strong> Request clarifying information
                </div>
              </div>

              {/* Problem D */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                    ROOT CAUSE D
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Capability Problem
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    The prospect has a legitimate commercial requirement, but the specific technical stack or domain discipline lies outside your capabilities.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#171F2C] font-mono">
                  <strong>Typical Action:</strong> Consider specialist referral / exchange
                </div>
              </div>

              {/* Problem E */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                    ROOT CAUSE E
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Capacity Problem
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Your team possesses the technical skill to deliver the work, but current delivery bandwidth is at maximum utilization for the required delivery window.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#171F2C] font-mono">
                  <strong>Typical Action:</strong> Referral, future follow-up, or delivery partner
                </div>
              </div>

              {/* Problem F */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                    ROOT CAUSE F
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Commercial Problem
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    The project requirements conflict with your firm's minimum engagement size, contract duration, billing mechanics, or commercial terms.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#171F2C] font-mono">
                  <strong>Typical Action:</strong> Disqualify, renegotiate, or route to counterpart
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: 5-STEP DECISION FRAMEWORK
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Standard Operating Procedure
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Should You Do With an Unqualified Lead?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A structured 5-step operational workflow to process and route leads that do not meet active pipeline criteria:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Confirm the Specific Qualification Failure
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Avoid using "unqualified" as a catch-all tag. Identify whether the hurdle is service capability, delivery timeline, budget mismatch, or geography.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Diagnosis phase
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Determine Permanent vs. Temporary Constraint
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      A company requesting an unsupported tech stack is a permanent fit failure; a target enterprise whose budget unlocks in Q3 is a temporary readiness gap.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Temporal evaluation
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Select the Appropriate Operational Disposition
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Assign the lead to an explicit path: disqualify completely, route to educational nurture, queue for future recycling, request missing detail, or refer/exchange.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Routing execution
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    04
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Protect Prospect Trust and Brand Reputation
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Never offload an enquiry simply to clear CRM backlog. Any referral or handoff should represent a genuine, high-quality solution for the prospective client.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Relationship governance
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    05
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Document the Decision Context
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Record concise notes explaining the disposition rationale so that future account executives and marketing teams have complete operational clarity.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Operational logging
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: UNQUALIFIED DOES NOT ALWAYS MEAN A BAD LEAD
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Conceptual Distinction
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Unqualified Does Not Always Mean a Bad Lead
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                One of the most expensive mistakes in B2B sales is conflating a <em>fit failure</em> with a <em>readiness failure</em>. These two situations require fundamentally different strategies:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <Clock className="w-4 h-4 text-[#171F2C]" />
                  <span>Temporary Readiness Failure</span>
                </div>
                <div className="text-xs font-mono text-[#64748B]">
                  Ideal Profile + Genuine Need + Timing Gap
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The prospect matches your ideal customer profile and has a legitimate future requirement, but cannot buy today due to procurement cycles, internal reorganization, or roadmap delays.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0] text-xs font-medium text-[#171F2C]">
                  <strong>Recommended Strategy:</strong> Retain in marketing nurture or schedule a formal calendar review.
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <Ban className="w-4 h-4 text-[#64748B]" />
                  <span>Structural Fit Failure</span>
                </div>
                <div className="text-xs font-mono text-[#64748B]">
                  Wrong Profile + Unsupported Requirements + Permanent Mismatch
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The prospect operates in an unsupported industry, requires technical capabilities your firm does not offer, or operates under an incompatible commercial structure.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0] text-xs font-medium text-[#171F2C]">
                  <strong>Recommended Strategy:</strong> Disqualify from internal sales, or explore a partner referral / opportunity exchange.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: WHEN SHOULD YOU DISQUALIFY A LEAD?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Disqualification Standards
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                When Should You Disqualify a Lead?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Disqualification is a positive sales discipline that protects team focus and prevents wasted resources. Typical triggers for disqualification include:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Clear ICP Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The company falls outside your target market segment, organizational structure, or sector focus.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Incompatible Service Need
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The client seeks capabilities, proprietary technologies, or services that your organization does not provide.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Unsupported Territory
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The engagement demands local on-site presence or regulatory licensing in jurisdictions you cannot serve.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Unrealistic Parameters
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The prospect's scope or timeline expectations are fundamentally unachievable for any standard professional provider.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Lack of Buying Intent
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Enquiries driven by student research, competitor intelligence, or academic inquiries with no commercial backing.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Incompatible Commercials
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The prospect demands engagement terms (e.g. pure contingency or unbacked equity) outside your standard policies.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: WHEN SHOULD YOU NURTURE OR RECYCLE A LEAD?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Nurturing Strategy
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                When Should You Nurture or Recycle a Lead?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Nurture workflows maintain commercial engagement with prospects that represent a plausible future fit, ensuring your brand remains top of mind when conditions change:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">SCENARIO 01</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Future Project Horizon
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The prospect is actively planning an initiative, but execution is scheduled for two to four quarters in the future.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">SCENARIO 02</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Pending Budget Cycle
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The executive team endorses the initiative, but capital allocation will not open until the subsequent fiscal year.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">SCENARIO 03</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Education &amp; Evaluation Stage
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The buyer is still formulating internal requirements and requires market insights and framework guidance before RFP issuance.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">SCENARIO 04</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Internal Postponement
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  An active RFP was paused due to leadership changes, corporate mergers, or reprioritized enterprise roadmaps.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">SCENARIO 05</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Incomplete Stakeholder Buy-In
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A department champion has identified a challenge, but cross-functional consensus is still being established.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">SCENARIO 06</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Contractual Lock-In
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The prospect is dissatisfied with an incumbent vendor, but remains bound by contract for the next six months.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: WHEN SHOULD YOU REFER OR EXCHANGE AN UNQUALIFIED LEAD?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Referral &amp; Exchange Pathways
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                When Should You Refer or Exchange an Unqualified Lead?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                An opportunity referral or structured lead exchange is appropriate when a prospect represents an authentic, high-intent commercial need that happens to sit outside your agency's delivery capabilities:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Direct Partner Referral
                </h3>
                <div className="text-xs font-mono text-[#64748B]">
                  Known Relationships &amp; Direct Introductions
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Appropriate when you already maintain an established relationship with a specialized agency or firm whose competence and delivery standards you personally know and trust.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Structured Opportunity Exchange
                </h3>
                <div className="text-xs font-mono text-[#171F2C] font-semibold">
                  Open Discovery &amp; Counterparty Matching
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Appropriate when your existing network lacks the specialized capability, territory presence, or bandwidth required, and you need a platform to discover suitable corporate peers.
                </p>
              </div>
            </div>

            {/* Supporting Cluster Links */}
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                Explore Cluster 3 Opportunity Pathways
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to="/agency-lead-exchange"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-xs font-medium text-[#171F2C]">Agency Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/b2b-lead-exchange"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-xs font-medium text-[#171F2C]">B2B Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/how-to-exchange-business-leads"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-xs font-medium text-[#171F2C]">How to Exchange Business Leads</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: WHAT NOT TO DO WITH UNQUALIFIED LEADS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Common Operational Pitfalls
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Not to Do With Unqualified Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Disciplined pipeline management requires avoiding common lead-routing errors that damage prospect trust or pollute sales data:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-rose-700 mb-1.5">PITFALL 01</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Treating All As Permanently Dead
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Do not discard leads whose unreadiness is merely a temporal timing or budgeting constraint.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-rose-700 mb-1.5">PITFALL 02</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Lingering in Active Pipeline
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Do not keep structural fit failures in active pipeline stages, inflating sales forecasts and misdirecting rep attention.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-rose-700 mb-1.5">PITFALL 03</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Blindly Offloading Rejections
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Do not syndicate rejected enquiries to partners without first verifying basic project legitimacy and suitability.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-rose-700 mb-1.5">PITFALL 04</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Premature Data Disclosure
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Do not expose confidential prospect contact details to third parties without prior mutual agreement and client consent.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-rose-700 mb-1.5">PITFALL 05</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Mislabeling as Qualified
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Do not claim a lead is qualified for your firm simply because another specialized business might be willing to accept it.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-rose-700 mb-1.5">PITFALL 06</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Generic Categorization
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Do not use "unqualified" as a generic tag without logging the specific underlying commercial or technical reason.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: PRACTICAL DISPOSITION MATRIX
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Reference Table
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Unqualified Lead Disposition Matrix
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A quick reference guide outlining practical next steps based on common qualification scenarios:
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono font-semibold text-[#64748B] uppercase">
                    <th className="p-4">Qualification Scenario</th>
                    <th className="p-4">Underlying Driver</th>
                    <th className="p-4">Appropriate Next Step</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#171F2C]">
                  <tr>
                    <td className="p-4 font-semibold">Poor ICP Fit</td>
                    <td className="p-4 text-[#64748B]">Industry, company size, or business model mismatch</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Disqualify</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Wrong Geography</td>
                    <td className="p-4 text-[#64748B]">Outside regional market, licensing, or timezone boundaries</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Disqualify or refer</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Wrong Service Capability</td>
                    <td className="p-4 text-[#64748B]">Client requires service or tech stack outside core capabilities</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white">Refer / exchange</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Temporary Capacity Shortage</td>
                    <td className="p-4 text-[#64748B]">Full utilization during the client's mandatory timeline</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Refer, recycle, or revisit</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Wrong Timing / Delayed Roadmap</td>
                    <td className="p-4 text-[#64748B]">Active interest but delayed start date or pending budget</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Nurture / recycle</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Missing Information</td>
                    <td className="p-4 text-[#64748B]">Vague brief or unconfirmed scope parameters</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Follow up for detail</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Commercial Model Mismatch</td>
                    <td className="p-4 text-[#64748B]">Conflict with standard billing terms or minimum project size</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Disqualify or renegotiate</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Unclear Buying Intent</td>
                    <td className="p-4 text-[#64748B]">Research enquiry with unconfirmed decision authority</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Qualify further or nurture</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Legitimate Opportunity Outside Scope</td>
                    <td className="p-4 text-[#64748B]">Clear budget and intent, but unserviceable internally</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white">Consider referral / exchange</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: WHERE THE RELAY FITS WHEN YOU CANNOT FULFIL A LEAD
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Role &amp; Boundaries
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where The Relay Fits When You Cannot Fulfil a Lead
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay is one possible path when an unserviceable lead represents a legitimate commercial opportunity:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  When The Relay is Relevant
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>The underlying opportunity is authentic with legitimate commercial backing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Your company cannot fulfil the work due to scope, capacity, or territory.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>The requirement can be structured without prematurely sharing confidential client data.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  What The Relay Does Not Do
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not guarantee that an opportunity will be accepted or close.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not fulfil client projects or replace internal sales qualification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not replace the participating companies' own client consent decisions.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Topic Links */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Explore The Complete Opportunity Architecture
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link
                  to="/agency-lead-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">Agency Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/b2b-lead-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/how-to-monetize-unqualified-leads"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">How to Monetize Unqualified Leads</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/how-to-exchange-business-leads"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">How to Exchange Business Leads</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/b2b-opportunity-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Opportunity Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/8-step-journey"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">8-Step Journey: Lifecycle Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: ILLUSTRATIVE EXAMPLES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Practical Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Examples of What to Do With Unqualified Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Hypothetical illustrative scenarios showing how different B2B organizations route unserviceable enquiries:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Software Company Receives Lead From Unsupported Industry
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A vertical SaaS company built exclusively for commercial construction receives an enquiry from a healthcare clinic seeking clinical scheduling. Because the product architecture cannot support healthcare compliance, the company disqualifies the lead from sales.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Disposition:</strong> Disqualify from pipeline.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Consulting Firm Facing Delivery Capacity Constraints
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A strategy consultancy receives an RFP for an operational audit requiring start within two weeks. The firm's partners and senior consultants are fully booked through the quarter.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Disposition:</strong> Consider a specialist partner referral, opportunity exchange, or scheduled future review.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Target Account With Delayed Project Timeline
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  An enterprise prospect matches ideal account criteria, but leadership has postponed budget execution until the following fiscal year.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Disposition:</strong> Move to marketing nurture and schedule a calendar re-engagement.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Incomplete Inbound Form Submission
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A prospect submits a contact request with vague requirements such as "need assistance with system upgrade" without technical scope or timeline context.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Disposition:</strong> Follow up with structured clarifying questions to complete qualification.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 05
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Agency Receives Project Outside Technical Specialization
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A web development agency receives an enquiry for a complex native iOS and Android application requiring Bluetooth hardware connectivity.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Disposition:</strong> List the structured requirement on The Relay to find a specialized mobile engineering firm.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: FAQ ACCORDION (DOM-RENDERED FOR CRAWLERS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Questions &amp; Clarifications
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Unqualified B2B Lead FAQ
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
              SECTION 13: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Unfulfilled Opportunities
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Have a Lead Your Business Cannot Fulfil?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Some leads should be disqualified. Some should be nurtured. Others represent legitimate opportunities that simply fall outside your current capabilities. For those situations, The Relay provides a structured way to discover suitable counterparties.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore B2B Lead Opportunities
                </Link>
                <Link
                  to="/how-to-exchange-business-leads"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Learn How to Exchange Business Leads
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
