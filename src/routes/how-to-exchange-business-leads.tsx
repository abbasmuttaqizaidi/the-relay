import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Building2,
  Layers,
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
  Coins,
  Percent,
  Ban,
  FileCheck,
  Sliders,
  ShieldCheck,
  Lock,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/how-to-exchange-business-leads")({
  head: () =>
    createSeoMeta({
      title: "How to Exchange Business Leads | The Relay",
      description:
        "Learn how to exchange B2B leads through clear qualification, opportunity definition, counterpart evaluation, client consent, and agreed referral terms.",
      path: "/how-to-exchange-business-leads",
    }),
  component: HowToExchangeBusinessLeadsPage,
});

export function HowToExchangeBusinessLeadsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a business lead exchange?",
      a: "A business lead exchange is a structured commercial process where organizations identify authentic client enquiries they cannot service internally and connect them with capable counterpart businesses that possess the right specialization, delivery capacity, and geographic footprint.",
    },
    {
      q: "What is the difference between a lead referral and a lead exchange?",
      a: "A lead referral is a direct introduction made to an already established, known partner. A lead exchange is a discovery environment used when an agency needs to find a suitable counterpart firm with specific capabilities outside their immediate personal network.",
    },
    {
      q: "What information should I include when exchanging a lead?",
      a: "Initial listings should summarize the industry vertical, core problem, project scope, technical requirements, approximate timeline, and geography. Sensitive client contact details should remain undisclosed until mutual interest and client consent are confirmed.",
    },
    {
      q: "Should I share the client's contact information immediately?",
      a: "No. Identifying prospect data should only be disclosed after you have evaluated the counterpart's delivery fit, agreed on commercial referral terms, and confirmed the client's consent to be introduced.",
    },
    {
      q: "How do I choose a business to receive a lead?",
      a: "Evaluate candidate firms based on verified capability in the required technical stack, past project experience in the client's sector, current delivery bandwidth, geographic proximity, and clear commercial alignment.",
    },
    {
      q: "Should businesses agree on referral terms before an introduction?",
      a: "Yes. Documenting basic commercial expectations—such as attribution duration, payment triggers upon invoice collection, and client communication ownership—prevents misunderstandings after the introduction is made.",
    },
    {
      q: "Can companies exchange leads without paying a referral fee?",
      a: "Yes. Many design and engineering agencies establish non-cash reciprocal exchange arrangements, trading complementary client enquiries throughout the year without exchanging cash finder fees.",
    },
    {
      q: "What kinds of leads should not be exchanged?",
      a: "Spam submissions, automated form fills, unverified contact requests, unfeasible client demands, or scenarios where the prospect has expressly declined third-party introductions should never be submitted to an exchange.",
    },
    {
      q: "Does The Relay guarantee that another company will accept a lead?",
      a: "No. The Relay provides an open discovery environment for structured listings. Acceptance depends entirely on receiving firms assessing the opportunity's commercial viability and their own operational bandwidth.",
    },
    {
      q: "Does The Relay handle the client relationship?",
      a: "No. The Relay functions strictly as a discovery and connection platform. Project scoping, contract execution, client communication, and service delivery remain entirely between the participating businesses and the end client.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/how-to-exchange-business-leads#webpage`,
        url: `${SITE_URL}/how-to-exchange-business-leads`,
        name: "How to Exchange Business Leads | The Relay",
        description:
          "Learn how to exchange B2B leads through clear qualification, opportunity definition, counterpart evaluation, client consent, and agreed referral terms.",
        breadcrumb: {
          "@id": `${SITE_URL}/how-to-exchange-business-leads#breadcrumb`,
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
        "@id": `${SITE_URL}/how-to-exchange-business-leads#breadcrumb`,
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
            name: "How to Exchange Business Leads",
            item: `${SITE_URL}/how-to-exchange-business-leads`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/how-to-exchange-business-leads#faq`,
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
                How to Exchange Business Leads
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
                  B2B LEAD EXCHANGE GUIDE
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-5">
                  How to Exchange Business Leads: A Practical B2B Guide
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    Exchanging business leads is not simply passing a phone number to another company. A productive B2B exchange requires genuine commercial intent, clear project context, appropriate counterpart evaluation, governed data sharing, and mutual alignment.
                  </p>
                  <p className="text-[#334155]">
                    The objective is to create a high-quality commercial introduction that solves the client's requirements while establishing a disciplined, collaborative partnership between participating businesses.
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
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post an Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Qualify scope · Protect confidential data · Execute structured introductions
                </p>
              </div>

              {/* Graphic Column: Process Overview */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Exchange Protocol Lifecycle
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      EXCHANGE-SOP-V1
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">1. Qualify &amp; Sanitize</div>
                        <div className="text-[11px] text-[#64748B]">Confirm scope and structure non-sensitive brief</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Phase 01
                      </span>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">2. Discover &amp; Evaluate</div>
                        <div className="text-[11px] text-[#64748B]">Match capabilities with verified peers</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Phase 02
                      </span>
                    </div>

                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">3. Consent &amp; Introduction</div>
                        <div className="text-[11px] text-slate-300">Agree commercial terms and introduce client</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#171F2C] bg-white px-2 py-0.5 rounded-[2px] font-bold">
                        Phase 03
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    A structured handoff protects client trust and pipeline value.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHAT DOES IT MEAN TO EXCHANGE A BUSINESS LEAD?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Core Definition
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Does It Mean to Exchange a Business Lead?
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed">
                A business lead exchange is a collaborative mechanism where companies identify genuine commercial opportunities they cannot service internally and connect them with suitable counterparties:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#171F2C] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">MODEL 01</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Lead Exchange
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Two businesses discover and route opportunities they cannot fulfil to capable peers based on capability, territory, and capacity alignment.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#171F2C] text-xs font-medium text-[#171F2C]">
                  <strong>Value:</strong> Capability &amp; context-driven matching
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">MODEL 02</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Direct Referral
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    A company introduces an opportunity directly to a known partner within their established professional circle.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  <strong>Value:</strong> Personal relationship network
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">MODEL 03</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Lead Marketplace
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    A high-volume transactional broker buying and reselling raw contact lists, form fills, or scraped directory data.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  <strong>Value:</strong> Raw contact information trading
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: BEFORE YOU EXCHANGE A LEAD (PRE-EXCHANGE CHECKLIST)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Pre-Flight Evaluation
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Before You Exchange a Business Lead
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before presenting an opportunity to external firms, evaluate these seven baseline readiness criteria:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">1. Confirm Genuine Need</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Verify that the inquiry represents an active business requirement rather than spam or non-commercial research.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">2. Understand Core Scope</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Ensure basic technical deliverables, integration parameters, and expected timelines are clearly outlined.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">3. Identify Handoff Reason</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Articulate why your firm is not fulfilling the work (e.g., technical stack, geography, or current utilization).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">4. Assess Market Feasibility</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Determine whether professional service providers in the broader market realistically service this project type.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">5. Verify Referral Fit</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Confirm that an introduction genuinely benefits the client by connecting them with a domain specialist.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">6. Sanitize Context</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Separate general project requirements from confidential client names, internal notes, and direct contact data.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: STEP-BY-STEP PROCESS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Standard Procedure
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Exchange Business Leads Step by Step
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Follow this systematic 8-stage procedure to execute professional B2B lead exchanges:
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
                      Qualify the Opportunity
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Confirm that the inbound enquiry represents an active, legitimate business requirement with clear objectives and a realistic decision timeframe.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Qualification
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Identify the Reason for Handoff
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Document the exact operational driver for passing the deal—such as a specialized technology stack, foreign geography, or peak delivery utilization.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Driver logging
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Prepare an Opportunity Summary
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Summarize company type, industry sector, deliverables, tech requirements, timeline, and geography without including personal contact details.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Context structuring
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    04
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Identify Potential Counterparties
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      List the structured opportunity on The Relay or evaluate candidate specialist firms based on past case studies, technical bench, and territory coverage.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Peer discovery
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    05
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Signal or Communicate Interest
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Candidate firms review the sanitized project parameters and express interest, confirming their current capacity to service the requirement.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Interest signaling
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    06
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Agree the Referral Structure
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Discuss commercial expectations—such as referral fee structures, attribution windows, and payment triggers—directly between the businesses.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Commercial alignment
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    07
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Handle Client Consent and Disclosure
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Confirm the prospective client's permission to make a warm introduction to the chosen specialist before sharing direct contact details.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Consent verification
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center font-mono text-xs font-bold text-[#171F2C] shrink-0">
                    08
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                      Execute the Warm Introduction
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed max-w-3xl">
                      Connect the client with the specialist provider via email or executive introduction, allowing them to manage scoping and delivery directly.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#64748B] shrink-0 md:text-right">
                  Warm introduction
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: WHAT INFORMATION SHOULD BE SHARED?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Information Governance
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Information Should You Share in a Business Lead Exchange?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Follow the principle of <em>minimum necessary disclosure</em> to protect prospect confidentiality while giving counterparties enough context to evaluate fit:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C]" />
                  <span>Share Initially (Sanitized Context)</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Industry Sector:</strong> e.g., Healthcare technology, logistics, B2B SaaS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Core Problem:</strong> Technical challenge or service need being addressed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Scope &amp; Tech Stack:</strong> Required platforms, languages, or compliance certs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Geography &amp; Timeline:</strong> General region and anticipated project start date.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <EyeOff className="w-4 h-4 text-[#64748B]" />
                  <span>Withhold Until Mutual Agreement &amp; Consent</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Client Identifying Data:</strong> Direct email addresses, phone numbers, and executive names.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Confidential Files:</strong> Internal architecture diagrams, security audits, or private memos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Proprietary Notes:</strong> Internal sales discovery logs containing unvetted commentary.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: HOW TO EVALUATE A BUSINESS BEFORE REFERRING A LEAD
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Counterparty Due Diligence
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Evaluate a Business Before Referring a Lead
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Referring a lead reflects directly on your reputation. Evaluate counterpart firms across core operational criteria:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  1. Capability Fit
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Demonstrated domain expertise and verified case studies in the client's technical stack.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  2. Delivery Bandwidth
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Available team capacity to meet the prospect's required timeline without scheduling delays.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  3. Geographic Coverage
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Jurisdictional licensing, regional presence, or time-zone overlap required by the client.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  4. Commercial Alignment
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Mutual agreement on attribution windows, fee mechanics, and client communication standards.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: WHAT SHOULD THE TWO BUSINESSES AGREE?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Bilateral Commercial Governance
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Should Businesses Agree Before Exchanging a Lead?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Prior to making an identifiable client introduction, document mutual expectations regarding these commercial topics:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  1. Scope of Introduction
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Define specifically which project or department requirements fall under the referral arrangement.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  2. Attribution Window
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The timeframe during which a converted engagement triggers referral recognition.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  3. Fee Structure &amp; Triggers
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Whether commercial compensation is based on contract close, initial deposit, or milestone billing.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  4. Client Relationship Governance
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Clarify who leads ongoing communication and establish boundaries around tangential services.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  5. Scope Adjustments
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  How referral economics adapt if the client expands or scales back the initial project brief.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  6. Communication Standards
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Cadence for updating the referring partner on deal progress, scoping milestones, and contract status.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: COMMON LEAD EXCHANGE MISTAKES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Process Pitfalls
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Common Mistakes When Exchanging Business Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Avoid these frequent operational breakdowns during the exchange process:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  1. Handoff Without Understanding
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Passing an opportunity before clarifying the client's actual technical deliverables.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  2. Referring to Poor-Fit Firms
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Routing deals to providers that lack verified experience in the required technical stack.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  3. Premature Data Exposure
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Broadcasting client contact details before confirming counterpart interest and client consent.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  4. Unclear Client Ownership
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Failing to define boundaries regarding ongoing account management and future cross-sell.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  5. Assuming Partner Capacity
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Introducing a time-sensitive client without confirming the receiving firm's current bandwidth.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  6. Prioritizing Fees Over Fit
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Focusing on commission percentages rather than ensuring the client receives exceptional delivery.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: BUSINESS LEAD REFERRAL VS LEAD EXCHANGE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Channel Selection
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Business Lead Referral vs Lead Exchange
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Choose the appropriate routing mechanism based on whether a verified partner is already identified:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Direct Lead Referral
                </h3>
                <div className="text-xs font-mono text-[#64748B]">
                  Known Relationships &amp; Established Trust
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Use when your existing network contains a trusted, verified provider with immediate capacity and precise technical specialization for the client's needs.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <Link
                    to="/b2b-referral-network"
                    className="text-xs font-mono font-semibold text-[#171F2C] flex items-center gap-1 hover:underline"
                  >
                    <span>Explore B2B Referral Network</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Structured Lead Exchange
                </h3>
                <div className="text-xs font-mono text-[#171F2C] font-semibold">
                  Open Discovery &amp; Capability Matching
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Use when your immediate network lacks the specific technology stack, geographic standing, or bandwidth required, and you need a platform to discover candidate firms.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <Link
                    to="/b2b-lead-exchange"
                    className="text-xs font-mono font-semibold text-[#171F2C] flex items-center gap-1 hover:underline"
                  >
                    <span>Explore B2B Lead Exchange</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: WHERE THE RELAY FITS IN THE LEAD EXCHANGE PROCESS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Role &amp; Scope
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where The Relay Fits in the Lead Exchange Process
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay serves as an opportunity discovery and counterpart connection layer:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  What The Relay Provides
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>A structured venue to list out-of-scope commercial requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Discovery layer connecting verified businesses with specialized peers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Bilateral interest signaling and mutual evaluation workflows.</span>
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
                    <span>The Relay does not guarantee lead acceptance, closed deals, or payouts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not fulfil client projects on behalf of participating firms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not replace client consent, CRM, or commercial negotiation.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Complete Cluster 3 Navigation */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Explore The Complete Cluster 3 Playbooks &amp; Hubs
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link
                  to="/b2b-lead-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Lead Exchange Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/agency-lead-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">Agency Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/what-to-do-with-unqualified-leads"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">What To Do With Unqualified Leads</span>
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
                Illustrative Business Lead Exchange Examples
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Hypothetical examples showing how organizations execute disciplined lead handoffs:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Web Agency Identifies Mobile Engineering Specialist
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A web development studio receives an inquiry for a native iOS and Android application with Bluetooth peripheral connectivity. Because mobile development falls outside their core stack, the studio structures a sanitized summary and identifies a specialist mobile engineering boutique.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Action:</strong> Structured partner referral under agreed commercial terms.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Consultancy Routes Foreign Geographic Requirement
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A North American strategy consultancy is approached for an on-site corporate restructuring audit in Germany. The firm connects the client with a vetted European partner network capable of providing German-language and local regulatory presence.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Action:</strong> Cross-border introduction matching localized market presence.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  SaaS Provider Involves Systems Integration Partner
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  An enterprise software company receives a customer request for custom legacy ERP data migration that its internal onboarding engineers do not deliver. The vendor introduces a certified systems integrator.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Action:</strong> Systems integrator manages implementation while vendor provides core software.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Service Firm Manages Delivery Capacity Overflow
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A high-demand UX boutique receives an RFP for a corporate portal overhaul requiring twenty engineers immediately. Rather than turning the client away, the boutique presents the opportunity to an enterprise peer with current capacity.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Action:</strong> Opportunity exchange with peer firm under structured referral terms.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 05
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Spam Submission or Automated Web Form
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A firm receives an unsolicited generic submission with unverified contact information and no actionable project context.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Action:</strong> Disqualified immediately; not submitted to any exchange.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: B2B LEAD EXCHANGE CHECKLIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Practical Tool
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                B2B Lead Exchange Checklist
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Review this pre-introduction checklist before completing any B2B opportunity exchange:
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] text-[#171F2C]">
                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Is the opportunity authentic and active?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Is the project scope sufficiently understood?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Is the reason for internal handoff documented?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Does the candidate firm possess verified capability?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Is the project summary properly sanitized?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Has prospect consent been verified for introduction?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Have commercial expectations been documented?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Does the counterpart have confirmed team bandwidth?</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] md:col-span-2">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Does the introduction genuinely benefit the prospective client?</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 13: FAQ ACCORDION (DOM-RENDERED FOR CRAWLERS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Questions &amp; Answers
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                How to Exchange Business Leads FAQ
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
              SECTION 14: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Business Opportunity Exchange
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Ready to Exchange a Business Opportunity?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                A useful lead exchange starts with a genuine opportunity, a clear requirement, and a business that is a plausible fit. The Relay provides a structured environment for discovering and exploring those commercial connections.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore B2B Lead Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post a Business Opportunity
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
