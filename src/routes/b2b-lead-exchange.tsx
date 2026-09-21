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
} from "lucide-react";
import { cn } from "@/lib/utils";

import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/b2b-lead-exchange")({
  head: () =>
    createSeoMeta({
      title: "B2B Lead Exchange — Exchange Leads You Cannot Fulfil | The Relay",
      description:
        "Explore a structured way to exchange B2B leads and commercial opportunities that your business cannot or does not want to fulfil.",
      path: "/b2b-lead-exchange",
    }),
  component: B2BLeadExchangePage,
});

export function B2BLeadExchangePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/b2b-lead-exchange#webpage`,
        url: `${SITE_URL}/b2b-lead-exchange`,
        name: "B2B Lead Exchange — Exchange Leads You Cannot Fulfil | The Relay",
        description:
          "Explore a structured way to exchange B2B leads and commercial opportunities that your business cannot or does not want to fulfil.",
        breadcrumb: {
          "@id": `${SITE_URL}/b2b-lead-exchange#breadcrumb`,
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
        "@id": `${SITE_URL}/b2b-lead-exchange#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "B2B Opportunity Exchange",
            "item": `${SITE_URL}/b2b-opportunity-exchange`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "B2B Lead Exchange",
            "item": `${SITE_URL}/b2b-lead-exchange`,
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

  const faqs = [
    {
      q: "What is a B2B lead exchange?",
      a: "A B2B lead exchange is a structured commercial mechanism that allows companies to take qualified inbound business enquiries they cannot fulfil—due to scope, geography, or capacity—and present them to verified peer businesses capable of servicing them.",
    },
    {
      q: "How do I monetize an out-of-scope lead on The Relay?",
      a: "When posting an unserviceable opportunity, you define your preferred exchange structure (such as a referral fee, ongoing revenue share, or reciprocal lead-swap). Counterparties review sanitized metadata, express interest, negotiate commercial terms, and upon mutual consent, execute the formal commercial introduction.",
    },
    {
      q: "Is customer contact information exposed publicly on the exchange?",
      a: "Never. The Relay operates under a strict Consent-Driven Opportunity Exchange (CDOE) protocol. Opportunities are posted with sanitized project scope, industry, and budget parameters. Proprietary customer names and contact details are only disclosed after both parties reach mutual agreement and give explicit consent.",
    },
    {
      q: "How does The Relay differ from standard lead brokerages?",
      a: "Lead brokerages typically sell scraped or multi-distributed contact lists to dozens of competing buyers. The Relay is an exclusive bilateral exchange: opportunities are originated from real inbound commercial intent and syndicated directly between verified executive counterparties.",
    },
    {
      q: "What types of unserviceable leads work best for exchange?",
      a: "High-value B2B opportunities perform best—such as agency project overflow, enterprise software implementations, compliance/licensing mismatches, specialized engineering requests, and regional inquiries outside your core operating territory.",
    },
    {
      q: "Are commercial referral agreements legally binding on Relay?",
      a: "Yes. Counterparties on The Relay operate under standardized Master Non-Circumvent & Non-Disclosure (NCND) covenants and programmatic bilateral agreements established during the negotiation phase prior to disclosure.",
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
                B2B Lead Exchange
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH BEFORE/AFTER PIPELINE VISUAL
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Unserviceable Dealflow Protocol
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  The lead you cannot fulfil may still be valuable.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    Every B2B business receives enquiries outside its service capabilities, target geography, delivery capacity, or commercial priorities.
                  </p>
                  <p className="text-[#334155]">
                    The default outcome is almost always rejection, a dead-end email, or lost enterprise value. The Relay gives businesses a structured, consent-driven marketplace to exchange unserviceable leads with verified peers who can execute them.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Post an Unserviceable Lead
                  </Link>
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Explore Lead Dealflow
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Sanitized discovery. Mutual commercial terms. Gated bilateral consent.
                </p>
              </div>

              {/* Visual Column: Before / After Pipeline Comparison (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Dealflow Transition Model
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      PROTOCOL-LEAD-01
                    </span>
                  </div>

                  {/* The Old Way */}
                  <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-rose-700 uppercase mb-2">
                      <span>Default Unmanaged Outcome</span>
                      <X className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <div className="text-[13px] font-medium text-[#171F2C] mb-1">
                      Inbound Lead ➔ Scope Mismatch ➔ Lead Discarded
                    </div>
                    <div className="text-xs text-[#64748B]">
                      Prospect is turned away. Zero monetization, broken relationship, wasted acquisition cost.
                    </div>
                  </div>

                  <div className="flex justify-center text-[#94A3B8] py-0.5">
                    <ArrowDown className="w-4 h-4" />
                  </div>

                  {/* The Relay Exchange Way */}
                  <div className="p-4 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-300 uppercase mb-2">
                      <span>The Relay Exchange Workflow</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="text-[13px] font-bold text-white mb-1.5">
                      Sanitized Post ➔ Peer Interest ➔ Term Agreement ➔ Consent Handshake
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      Lead is captured, evaluated by verified specialists, and monetized via agreed referral fee, rev-share, or reciprocal dealflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: 4 COMMERCIAL VALUE MODELS FOR UNSERVICEABLE LEADS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Value Realization Structures
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How Businesses Turn Unfulfilled Leads Into Value
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                You don't need to sell leads in bulk or enter risky brokerages. Relay lets participating businesses agree on bilateral commercial terms for every individual opportunity:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Model 1: Referral Fee */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Coins className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Referral Fee / Bounty
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Agreed flat commission or fixed percentage paid upon successful closing or contract milestone.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Immediate cash settlement
                </div>
              </div>

              {/* Model 2: Revenue Share */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Percent className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Ongoing Revenue Share
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Recurring percentage of project invoices or retainer fees over 6–24 month commercial horizons.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Long-term yield alignment
                </div>
              </div>

              {/* Model 3: Reciprocal Dealflow Swap */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Repeat className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Reciprocal Lead Swap
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Exchange an out-of-scope lead today in return for future dealflow matching your exact core services.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Balanced bilateral dealflow
                </div>
              </div>

              {/* Model 4: Strategic Co-Pitch */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Co-Pitch &amp; Subcontract
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Retain client relationship leadership while partnering with a specialist peer to deliver complex components.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Account retention &amp; expansion
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: PRACTICAL OPERATOR SCENARIOS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Real-World Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Common Scenarios Handled on The Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Unserviceable leads occur across every industry. Here is how leading B2B operators structure them:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Scenario 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Digital Agency
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Web Agency Receives Mobile App Enquiry
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A Shopify web development agency is approached by an existing enterprise client for native iOS/Android development.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0]">
                    <strong className="text-[#171F2C]">Relay Resolution:</strong> Originates an opportunity on Relay, matches with a vetted mobile engineering studio, and agrees on a 10% referral fee.
                  </p>
                </div>
                <Link
                  to="/agency-lead-exchange"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-3 mt-3 border-t border-[#E2E8F0]"
                >
                  <span>Explore Agency Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Scenario 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    SaaS Vendor
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Software Vendor Needs Deployment Integrator
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A B2B SaaS platform closes an enterprise license, but the customer requires legacy SAP on-premise migration services.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0]">
                    <strong className="text-[#171F2C]">Relay Resolution:</strong> Exchanges the implementation scope with a certified SAP systems integrator, preserving software ARR without professional services overhead.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-3 mt-3 border-t border-[#E2E8F0]">
                  Ecosystem implementation alignment
                </div>
              </div>

              {/* Scenario 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Consulting &amp; Legal
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Cross-Border Jurisdictional Mismatch
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A UK corporate compliance advisory receives an inquiry for SEC regulatory filings in the United States.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0]">
                    <strong className="text-[#171F2C]">Relay Resolution:</strong> Syndicates the lead to a verified US counterpart firm, establishing a bilateral reciprocal referral channel for transatlantic corporate clients.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-3 mt-3 border-t border-[#E2E8F0]">
                  Jurisdictional compliance exchange
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: CDOES GATED PRIVACY & ANONYMITY PIPELINE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                  Controlled Disclosure Protocol
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                  Exchange Leads Without Exposing Client Data
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                  <p>
                    Posting a lead should never compromise proprietary client confidentiality or client ownership.
                  </p>
                  <p className="text-[#171F2C] font-medium">
                    The Relay's Consent-Driven Opportunity Exchange (CDOE) protocol mandates a multi-stage gated pipeline:
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                    <EyeOff className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[13px] font-semibold text-[#171F2C]">1. Sanitized Context Only</div>
                      <div className="text-xs text-[#64748B] leading-relaxed">Opportunity title, budget bracket, industry vertical, and timeline are visible—identities remain completely shielded.</div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                    <FileCheck className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[13px] font-semibold text-[#171F2C]">2. Bilateral Term Alignment</div>
                      <div className="text-xs text-[#64748B] leading-relaxed">Both companies formalize commercial covenants (referral fee %, exclusivity, timeline) in private discussion.</div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                    <Lock className="w-4 h-4 text-[#171F2C] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[13px] font-semibold text-[#171F2C]">3. Cryptographic Consent &amp; Introduction</div>
                      <div className="text-xs text-[#64748B] leading-relaxed">Full contact info and direct introduction occur only after both authorized signatories trigger mutual consent.</div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/trust-and-safety"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors"
                >
                  <span>Read the Trust &amp; Safety Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Security Card Graphic */}
              <div className="lg:col-span-5">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Institutional Protection
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#171F2C]" />
                  </div>
                  <div className="text-xs text-[#64748B] leading-relaxed space-y-3">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="font-semibold text-[#171F2C] block mb-1">Master NCND Protection</span>
                      Every participant is bound by enterprise non-circumvention rules before viewing opportunity details.
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="font-semibold text-[#171F2C] block mb-1">Zero Public Contact Scraping</span>
                      No email addresses or phone numbers are ever indexed or accessible to automated crawlers.
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="font-semibold text-[#171F2C] block mb-1">Verified Entity Attribution</span>
                      Only authenticated corporations with confirmed executive credentials can express interest.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: TOPIC CLUSTER & ECOSYSTEM MESH
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Related Frameworks &amp; Guides
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Explore The Lead Exchange Knowledge Mesh
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Connect directly into dedicated vertical networks, operational guides, and architectural protocols:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: Agency Lead Exchange */}
              <Link
                to="/agency-lead-exchange"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Vertical Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Agency Lead Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    How digital, creative, and development agencies monetize out-of-scope enquiries.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Explore Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 2: What To Do With Unqualified Leads */}
              <Link
                to="/what-to-do-with-unqualified-leads"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Decision Framework
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Unqualified Lead Matrix
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Practical 4-step checklist to evaluate scope, geography, capacity, and referral value.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Matrix</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 3: How To Monetize Unqualified Leads */}
              <Link
                to="/how-to-monetize-unqualified-leads"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Commercial Guide
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Monetizing Out-of-Scope
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Standard commercial pricing covenants, referral percentages, and agreement terms.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 4: 8-Step Journey */}
              <Link
                to="/8-step-journey"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Lifecycle
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    How Relay Works
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The complete step-by-step transaction lifecycle from intent to final handshake.
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
              SECTION 7: FAQ ACCORDION (LEAD EXCHANGE QUESTIONS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Documentation &amp; Answers
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
              SECTION 8: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                B2B Lead Exchange
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Stop Discarding Unserviceable Inbound Dealflow
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Present your unfulfilled opportunities to verified corporate peers and monetize out-of-scope demand through consent-driven commercial handshakes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Post an Unserviceable Lead
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Explore Lead Dealflow
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
