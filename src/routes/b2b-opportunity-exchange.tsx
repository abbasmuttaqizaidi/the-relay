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
} from "lucide-react";
import { createSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/b2b-opportunity-exchange")({
  head: () =>
    createSeoMeta({
      title: "B2B Opportunity Exchange — The Relay",
      description:
        "Discover and exchange B2B commercial opportunities through a structured, consent-driven workflow built for verified businesses.",
      path: "/b2b-opportunity-exchange",
    }),
  component: B2BOpportunityExchangePage,
});

export function B2BOpportunityExchangePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/b2b-opportunity-exchange#webpage`,
        url: `${SITE_URL}/b2b-opportunity-exchange`,
        name: "B2B Opportunity Exchange — The Relay",
        description:
          "A structured commercial environment for businesses to discover, exchange, and partner on valuable B2B opportunities they cannot fulfil themselves.",
        breadcrumb: {
          "@id": `${SITE_URL}/b2b-opportunity-exchange#breadcrumb`,
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
        "@id": `${SITE_URL}/b2b-opportunity-exchange#breadcrumb`,
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
      q: "What is a B2B opportunity exchange?",
      a: "A B2B opportunity exchange is a structured commercial environment where businesses can discover, share, and pursue business opportunities with other verified businesses. Rather than rejecting or ignoring opportunities that don't fit your core scope, capacity, or location, an exchange allows you to present the opportunity to peers who can service it.",
    },
    {
      q: "How is a B2B opportunity exchange different from a lead marketplace?",
      a: "Traditional lead marketplaces often sell scraped, unverified, or bulk contact lists to multiple competing buyers with little regard for delivery fit. In contrast, an opportunity exchange focuses on direct commercial relationships, structured qualification, controlled disclosure, and mutual consent between verified businesses for referrals, partnerships, distribution, and services.",
    },
    {
      q: "Can I exchange a lead my business cannot fulfil?",
      a: "Yes. This is one of the primary use cases of The Relay. When you receive an inbound lead that falls outside your technical expertise, geography, or current capacity, you can present the opportunity on the exchange with high-level sanitized details. Relevant businesses can express interest, discuss commercial terms with you, and proceed only when both sides consent.",
    },
    {
      q: "Is Relay a social network?",
      a: "No. Relay is not an algorithmic social media platform. There are no public news feeds, vanity follower counts, engagement algorithms, or content production requirements. Relay is strictly a structured commercial exchange built directly around real business opportunities and actionable partnerships.",
    },
    {
      q: "What types of opportunities can I find on Relay?",
      a: "Relay supports a wide range of B2B transactions: customer referrals, co-selling and strategic partnerships, distribution and reseller agreements, vendor search requests, and executive strategic collaborations where concrete value can be exchanged.",
    },
    {
      q: "Who can use Relay?",
      a: "Relay is designed for verified B2B enterprises, digital and creative agencies, professional service firms, software vendors, and company founders/operators who routinely originate or seek qualified commercial relationships.",
    },
    {
      q: "Does Relay guarantee that an opportunity will convert?",
      a: "No. Relay does not promise or guarantee that every exchanged opportunity will convert into completed revenue. Conversion depends on the individual companies, client requirements, commercial negotiations, and execution quality. Relay provides the structured, verified infrastructure for opportunities to be discovered, evaluated, and agreed upon efficiently.",
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
                <span className="text-[#64748B]">Platform</span>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">
                B2B Opportunity Exchange
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH ARCHITECTURE BLUEPRINT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  B2B Opportunity Exchange
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  The B2B Opportunity Exchange for Commercial Relationships
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    Every business encounters opportunities it cannot pursue.
                  </p>
                  <p className="text-[#334155]">
                    A lead may fall outside your services. A customer may need a capability you don't provide. A partnership may not fit your current priorities. A distribution opportunity may reach a business better equipped to act on it.
                  </p>
                  <p>
                    The Relay gives businesses a structured way to exchange those opportunities with other verified businesses.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Post an Opportunity
                  </Link>
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Explore Opportunities
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Discover opportunities. Express interest. Reach agreement. Exchange value.
                </p>
              </div>

              {/* Visual Column: Structural Blueprint Diagram (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Commercial Flow Architecture
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-SCHEMA-01
                    </span>
                  </div>

                  {/* Flow Stages */}
                  <div className="space-y-2">
                    {/* Stage 1 */}
                    <div className="flex items-center p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <div className="w-7 h-7 rounded-[4px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] font-mono font-bold text-xs shrink-0">
                        01
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#171F2C] truncate">
                          Business A
                        </div>
                        <div className="text-xs text-[#64748B] truncate">
                          Originates unserviceable demand
                        </div>
                      </div>
                    </div>

                    {/* Flow Arrow */}
                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Stage 2 */}
                    <div className="flex items-center p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <div className="w-7 h-7 rounded-[4px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] font-mono font-bold text-xs shrink-0">
                        02
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#171F2C] truncate">
                          Commercial Opportunity
                        </div>
                        <div className="text-xs text-[#64748B] truncate">
                          Structured metadata &amp; capability scope
                        </div>
                      </div>
                    </div>

                    {/* Flow Arrow */}
                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Stage 3 (The Relay Hub) */}
                    <div className="flex items-center p-3.5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                      <div className="w-7 h-7 rounded-[4px] bg-white text-[#171F2C] flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4 text-[#171F2C]" />
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-white">
                          The Relay Exchange
                        </div>
                        <div className="text-xs text-slate-300 truncate">
                          Discovery, qualification &amp; controlled consent
                        </div>
                      </div>
                    </div>

                    {/* Flow Arrow */}
                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Stage 4 */}
                    <div className="flex items-center p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <div className="w-7 h-7 rounded-[4px] bg-white border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] font-mono font-bold text-xs shrink-0">
                        03
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#171F2C] truncate">
                          Business B
                        </div>
                        <div className="text-xs text-[#64748B] truncate">
                          Expresses interest &amp; agrees to terms
                        </div>
                      </div>
                    </div>

                    {/* Flow Arrow */}
                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Stage 5 */}
                    <div className="flex items-center p-3 bg-white border border-[#171F2C] rounded-[4px]">
                      <div className="w-7 h-7 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#171F2C] truncate">
                          Commercial Relationship
                        </div>
                        <div className="text-xs text-[#64748B] truncate">
                          Direct alignment &amp; mutual value realized
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHAT IS A B2B OPPORTUNITY EXCHANGE? + 6 SCENARIOS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Is a B2B Opportunity Exchange?
              </h2>
              <div className="space-y-2 text-base text-[#64748B] leading-relaxed">
                <p>
                  A B2B opportunity exchange is a structured environment where businesses can discover, share, and pursue commercial opportunities with other businesses.
                </p>
                <p className="text-[#334155]">
                  Instead of treating every opportunity as something your company must either fulfil or reject, an opportunity exchange creates another possibility: <strong className="text-[#171F2C] font-semibold">Find a business that can act on it.</strong>
                </p>
              </div>
            </div>

            {/* 6 Practical Scenarios Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Scenario 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 01
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Agency Scope Overflow
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    An agency receives a qualified project outside its core capabilities or technical focus that it cannot take on in-house.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Outcome: Referral partner identification
                </div>
              </div>

              {/* Scenario 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 02
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Complementary Software Needs
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A software company encounters an enterprise customer in need of specialized deployment or integration services they don't provide.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Outcome: Implementation ecosystem match
                </div>
              </div>

              {/* Scenario 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 03
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Non-Fulfillable Referrals
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A business has a warm, vetted prospect that it cannot service due to licensing, jurisdictional limits, or regulatory restrictions.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Outcome: Direct referral exchange
                </div>
              </div>

              {/* Scenario 4 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 04
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Distribution Channel Search
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A commercial producer or vendor seeks established channel partners with existing enterprise trust in regional territories.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Outcome: Distribution agreement
                </div>
              </div>

              {/* Scenario 5 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 05
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Strategic Commercial Partnerships
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A business identifies an opportunity requiring dual-party credentialing or complementary domain expertise to execute.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Outcome: Joint strategic proposal
                </div>
              </div>

              {/* Scenario 6 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 06
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Temporary Capacity Constraints
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A company has inbound dealflow that doesn't fit its current quarter capacity, team bandwidth, or immediate deployment window.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Outcome: Syndication to verified peers
                </div>
              </div>
            </div>

            {/* Callout Quote Banner */}
            <div className="mt-6 p-4 sm:p-5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[4px] text-center">
              <blockquote className="text-base sm:text-lg text-[#171F2C] font-semibold tracking-tight">
                “The opportunity is the starting point. The commercial relationship is the outcome.”
              </blockquote>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: THE PROBLEM & COMPARISON
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                  The Efficiency Breakdown
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                  Valuable Opportunities Don't Always Fit the Business That Finds Them
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-5">
                  Businesses invest significant time and resources generating demand. But not every opportunity fits the business that receives it.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Outside your service scope",
                    "Outside your target market",
                    "Outside your geographic coverage",
                    "Beyond your current capacity",
                    "Too small or too large for your business",
                    "Relevant to a complementary service",
                    "Better suited to another specialist",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-[13px] text-[#334155]">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mr-2.5 shrink-0"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem vs Relay Visual Comparison */}
              <div className="lg:col-span-6 space-y-4">
                {/* Traditional Card */}
                <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-rose-700">
                      The Traditional Path
                    </span>
                    <X className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="text-[14px] font-semibold text-[#171F2C] mb-1.5">
                    Reject it. Ignore it. Refer it informally.
                  </div>
                  <p className="text-[13px] text-[#64748B] mb-4 leading-relaxed">
                    Leads are discarded or tossed into untracked emails. Reciprocal value is lost, time is wasted, and commercial context is completely severed.
                  </p>
                  <div className="flex items-center justify-between text-xs bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0] font-mono text-[#64748B]">
                    <span>Inbound Lead</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span>Cannot Fulfil</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="text-rose-700 font-semibold">Lost Value</span>
                  </div>
                </div>

                {/* The Relay Card */}
                <div className="p-5 bg-white border border-[#171F2C] rounded-[4px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#171F2C]">
                      The Relay Exchange
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#171F2C]" />
                  </div>
                  <div className="text-[14px] font-semibold text-[#171F2C] mb-1.5">
                    Exchange the opportunity in a structured environment.
                  </div>
                  <p className="text-[13px] text-[#64748B] mb-4 leading-relaxed">
                    A business presents the opportunity clearly and allows a verified, relevant business to express interest. This transforms an otherwise unusable opportunity into a potential commercial relationship.
                  </p>
                  <div className="flex items-center justify-between text-xs bg-[#171F2C] text-white p-2.5 rounded-[4px] font-mono">
                    <span>Inbound Lead</span>
                    <span className="text-slate-400">→</span>
                    <span>Relay Exchange</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-white font-semibold">Verified Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: PROTOCOL LIFECYCLE (7 STAGES)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div>
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1">
                  Protocol Lifecycle
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                  From Unused Opportunity to Commercial Exchange
                </h2>
              </div>
              <Link
                to="/8-step-journey"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors"
              >
                <span>See How Relay Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-sm sm:text-base text-[#64748B] max-w-3xl mb-6 leading-relaxed">
              Relay separates discovery from commitment. Businesses can evaluate an opportunity, express interest, discuss the relationship, and move forward only when the participating parties agree.
            </p>

            {/* Stepper / Horizontal Flow Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {[
                { num: "01", name: "Opportunity", desc: "Qualified commercial demand identified" },
                { num: "02", name: "Discovery", desc: "Targeted matching across peer network" },
                { num: "03", name: "Interest", desc: "Verified party signals delivery capability" },
                { num: "04", name: "Negotiation", desc: "Commercial parameters established" },
                { num: "05", name: "Agreement", desc: "Mutual alignment on governance" },
                { num: "06", name: "Consent", desc: "Bi-directional disclosure approval" },
                { num: "07", name: "Handshake", desc: "Live commercial collaboration begins", active: true },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3.5 rounded-[4px] border transition-colors flex flex-col justify-between",
                    step.active
                      ? "bg-[#171F2C] text-white border-[#171F2C]"
                      : "bg-white border-[#E2E8F0] text-[#171F2C]"
                  )}
                >
                  <div className="text-[10px] font-mono font-semibold mb-1 opacity-70">
                    {step.num}
                  </div>
                  <h3 className={cn("text-[13px] font-semibold mb-1", step.active ? "text-white" : "text-[#171F2C]")}>
                    {step.name}
                  </h3>
                  <p className={cn("text-[11px] leading-tight", step.active ? "text-slate-300" : "text-[#64748B]")}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: WHAT CAN BE EXCHANGED? (TAXONOMY OF VALUE)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Taxonomy of Value
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                More Than Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A B2B opportunity isn't limited to a traditional sales lead. Relay can support different types of commercial opportunities, including:
              </p>
            </div>

            {/* Scannable Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* 1. Referral Opportunities */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Referral Opportunities
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-3 leading-relaxed">
                    A customer or business need that another company may be able to fulfil.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0] mb-4">
                    <strong className="text-[#171F2C]">Example:</strong> A marketing agency receives an enquiry for accounting services and identifies an accounting firm that could serve the customer.
                  </p>
                </div>
                <Link
                  to="/b2b-referral-network"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-2 border-t border-[#E2E8F0]"
                >
                  <span>Explore B2B Referral Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 2. Partnership Opportunities */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Partnership Opportunities
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-3 leading-relaxed">
                    Potential relationships between businesses with complementary capabilities, customers, or markets looking to co-pitch or bundle.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0] mb-4">
                    <strong className="text-[#171F2C]">Example:</strong> A CRM vendor partner teaming with a systems integrator to target mid-market manufacturing enterprises.
                  </p>
                </div>
                <Link
                  to="/b2b-partnership-network"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-2 border-t border-[#E2E8F0]"
                >
                  <span>Explore Partnership Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3. Distribution Opportunities */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Network className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Distribution Opportunities
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-3 leading-relaxed">
                    Opportunities involving businesses that can help another company reach new customers, vertical industries, or geographic channels.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0] mb-4">
                    <strong className="text-[#171F2C]">Example:</strong> A B2B software vendor partnering with specialized value-added resellers in overseas territories.
                  </p>
                </div>
                <Link
                  to="/distribution-partners"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-2 border-t border-[#E2E8F0]"
                >
                  <span>Explore Distribution Partners</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 4. Vendor Opportunities */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Store className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Vendor Opportunities
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-3 leading-relaxed">
                    Businesses proactively looking for suppliers, service providers, technology partners, or specialist execution capabilities.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0] mb-4">
                    <strong className="text-[#171F2C]">Example:</strong> A scaling corporate procurement team publishing targeted requests for ISO-compliant infrastructure audits.
                  </p>
                </div>
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Direct Sourcing Scope
                </div>
              </div>

              {/* 5. Strategic Opportunities */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Strategic Opportunities
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-3 leading-relaxed">
                    Potential relationships involving executive expertise, market access, key stakeholder introductions, or long-term strategic collaboration.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0] mb-4">
                    <strong className="text-[#171F2C]">Example:</strong> Two specialized advisories forming an institutional joint-venture for cross-border transactions.
                  </p>
                </div>
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Advisory &amp; Executive Scope
                </div>
              </div>

              {/* 6. Other Commercial Opportunities */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Other Commercial Opportunities
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-3 leading-relaxed">
                    Relay also supports other opportunity formats where there is a clearly definable business need and established potential for mutually agreed commercial value.
                  </p>
                  <p className="text-xs text-[#64748B] bg-[#F8FAFC] p-2.5 rounded-[4px] border border-[#E2E8F0] mb-4">
                    Structured to ingest any well-parameterized commercial transaction without algorithmic interference.
                  </p>
                </div>
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Custom Syndication
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: TARGET PARTICIPANTS (4 COHORTS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Target Participants
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Built for Businesses That Exchange Commercial Value
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Persona 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Cohort 01
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">Agencies</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Turn relevant opportunities that fall outside your capabilities into potential referral or partnership relationships.
                  </p>
                </div>
                <Link
                  to="/agency-lead-exchange"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-2 border-t border-[#E2E8F0]"
                >
                  <span>Agency Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Persona 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Cohort 02
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">Service Businesses</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Discover complementary businesses and opportunities that align with what you actually deliver, without unvetted distractions.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Operational alignment &amp; capacity matching
                </div>
              </div>

              {/* Persona 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Cohort 03
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">B2B Companies</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Find potential referral, partnership, distribution, vendor, and other commercial opportunities directly with peer firms.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Multi-channel commercial discovery
                </div>
              </div>

              {/* Persona 4 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                    Cohort 04
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">Operators &amp; Founders</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Build commercial relationships around concrete opportunities rather than relying solely on continuous networking and cold outreach.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Direct executive-to-executive alignment
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: TWO-SIDED LIQUIDITY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Two-Sided Liquidity
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Whether You Have an Opportunity or Need One
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side: Have an Opportunity */}
              <div className="p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                    Originating Side
                  </div>
                  <h3 className="text-xl font-bold text-[#171F2C] mb-2">
                    I Have an Opportunity
                  </h3>
                  <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                    You have a lead, referral, partnership possibility, distribution opportunity, or another commercial opportunity that you cannot or do not want to pursue yourself.
                  </p>
                </div>
                <div>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors w-full sm:w-auto"
                  >
                    Post the opportunity →
                  </Link>
                </div>
              </div>

              {/* Right Side: Looking for Opportunities */}
              <div className="p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                    Executing Side
                  </div>
                  <h3 className="text-xl font-bold text-[#171F2C] mb-2">
                    I'm Looking for Opportunities
                  </h3>
                  <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                    You have capabilities, capacity, market access, or services that could help another business fulfil an opportunity.
                  </p>
                </div>
                <div>
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors w-full sm:w-auto"
                  >
                    Discover opportunities that fit your business →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: WHY RELAY? (STRUCTURED PHILOSOPHY)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                  A Structured Philosophy
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                  Built Around Opportunities, Not Social Noise
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                  Traditional professional networks are built around people, profiles, posts, followers, and conversations. Relay is built around something more specific: <strong className="text-[#171F2C]">Commercial opportunities.</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                    <div className="text-[13px] font-semibold text-[#171F2C] mb-1">Zero Audience Required</div>
                    <p className="text-xs text-[#64748B] leading-relaxed">No need to build an audience or generate impressions before finding a relevant commercial opportunity.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                    <div className="text-[13px] font-semibold text-[#171F2C] mb-1">No Content Publishing</div>
                    <p className="text-xs text-[#64748B] leading-relaxed">You don't need to write articles or publish continuous feeds to be discovered by serious peers.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                    <div className="text-[13px] font-semibold text-[#171F2C] mb-1">Zero Cold Spam</div>
                    <p className="text-xs text-[#64748B] leading-relaxed">You don't need to send dozens of unprompted cold messages to unvetted executive profiles.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                    <div className="text-[13px] font-semibold text-[#171F2C] mb-1">Concrete Fit</div>
                    <p className="text-xs text-[#64748B] leading-relaxed">The starting point is a concrete business opportunity and the tangible value it represents.</p>
                  </div>
                </div>
              </div>

              {/* Comparison Box */}
              <div className="lg:col-span-5">
                <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4 text-center">
                    Mechanism Comparison
                  </div>

                  {/* Social Media Noise Path */}
                  <div className="mb-4">
                    <div className="text-xs text-[#64748B] uppercase tracking-wider font-semibold mb-1.5">
                      Conventional Professional Social
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between font-mono text-xs text-[#64748B]">
                      <span>Post</span>
                      <span className="text-[#94A3B8]">→</span>
                      <span>Reach</span>
                      <span className="text-[#94A3B8]">→</span>
                      <span>Likes</span>
                      <span className="text-[#94A3B8]">→</span>
                      <span className="text-[#171F2C]">DMs</span>
                    </div>
                  </div>

                  <div className="flex justify-center text-[#94A3B8] my-1">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* The Relay Focused Path */}
                  <div>
                    <div className="text-xs text-[#171F2C] uppercase tracking-wider font-semibold mb-1.5">
                      The Relay Architecture
                    </div>
                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between font-mono text-xs font-semibold">
                      <span>Opportunity</span>
                      <span className="text-slate-400">→</span>
                      <span>Relevance</span>
                      <span className="text-slate-400">→</span>
                      <span>Interest</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-white">Agreement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: TRUST & CONTROLLED DISCLOSURE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                  Governance &amp; Protocol
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                  Commercial Intent Before Commercial Disclosure
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                  <p>
                    A commercial opportunity can contain sensitive information. That's why Relay's workflow separates interest from agreement and consent. Businesses can evaluate an opportunity before moving into a deeper commercial relationship.
                  </p>
                  <p className="text-[#171F2C] font-medium">
                    The objective is simple: Don't disclose more than is necessary before both sides have a reason to move forward.
                  </p>
                </div>
                <Link
                  to="/trust-and-safety"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors"
                >
                  <span>Learn about Trust &amp; Safety Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Disclosure Protocol Card */}
              <div className="lg:col-span-5">
                <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                    Disclosure Stages
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-start gap-2.5">
                      <EyeOff className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-[#171F2C] mb-0.5">1. Sanitized Context</div>
                        <div className="text-[#64748B] leading-relaxed">Scope, deal parameter, sector, and commercial requirements visible without revealing proprietary client identities.</div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-start gap-2.5">
                      <FileCheck className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-[#171F2C] mb-0.5">2. Qualified Expression</div>
                        <div className="text-[#64748B] leading-relaxed">Executing party verifies exact operational capability and preliminary agreement to terms.</div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-start gap-2.5">
                      <Lock className="w-4 h-4 text-[#171F2C] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-[#171F2C] mb-0.5">3. Bilateral Consent &amp; Reveal</div>
                        <div className="text-[#64748B] leading-relaxed">Direct introduction and sensitive data unmasked only when both entities confirm mutual intent.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: WALKTHROUGH EXAMPLE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Practical Execution
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                A Simple Example of B2B Opportunity Exchange
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Situation */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1">
                  Phase 1: Inbound
                </div>
                <h3 className="text-sm font-semibold text-[#171F2C] mb-2">The Situation</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A web development agency receives an enquiry for a mobile application. The agency doesn't provide mobile development.
                </p>
              </div>

              {/* Traditional */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-rose-700 mb-1">
                  Phase 2: Default
                </div>
                <h3 className="text-sm font-semibold text-[#171F2C] mb-2">The Traditional Outcome</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The agency rejects the opportunity or tells the prospect to search elsewhere. Zero enterprise value is captured.
                </p>
              </div>

              {/* With Relay */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#171F2C] mb-1">
                  Phase 3: The Exchange
                </div>
                <h3 className="text-sm font-semibold text-[#171F2C] mb-2">With Relay</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The agency identifies the opportunity as something another business can fulfil. A relevant mobile team expresses interest and reviews the scope.
                </p>
              </div>

              {/* The Result */}
              <div className="p-5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Phase 4: Alignment
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">The Result</h3>
                <p className="text-[13px] text-slate-300 leading-relaxed">
                  An opportunity that would otherwise have been lost becomes a referral, revenue-sharing arrangement, partnership, or new client relationship.
                </p>
              </div>
            </div>

            <div className="p-3 text-center text-xs text-[#64748B] font-mono">
              Relay doesn't promise that every opportunity will convert. It creates the infrastructure for the opportunity to be exchanged.
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: COMPARISON TABLE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Comparative Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                A Different Way to Build B2B Relationships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Relay isn't designed to replace every form of networking. It is designed for a specific problem: how businesses can exchange commercial opportunities with other businesses in a structured way.
              </p>
            </div>

            {/* Structured Comparison Table */}
            <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 py-3 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <div>Traditional Networking</div>
                <div className="hidden md:block">The Relay</div>
              </div>
              <div className="divide-y divide-[#E2E8F0] text-[13px]">
                {[
                  { trad: "Start with people", relay: "Start with opportunities" },
                  { trad: "Build an audience", relay: "Discover relevant opportunities" },
                  { trad: "Social feeds & algorithmic reach", relay: "Structured commercial opportunities" },
                  { trad: "Open-ended conversations", relay: "Structured interest & intent" },
                  { trad: "Cold outreach", relay: "Intent-based discovery" },
                  { trad: "Networking first", relay: "Commercial fit first" },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 px-5 py-3.5 hover:bg-[#F8FAFC] transition-colors">
                    <div className="text-[#64748B] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                      {row.trad}
                    </div>
                    <div className="text-[#171F2C] font-semibold flex items-center gap-2 mt-1 md:mt-0">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      {row.relay}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 13: HOW IT WORKS (7-STAGE EXECUTION SUMMARY)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div>
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1">
                  Execution Architecture
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                  How The Relay Works
                </h2>
              </div>
              <Link
                to="/8-step-journey"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors"
              >
                <span>Explore the 8-Step Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
              {[
                { num: "STEP 01", title: "Discover", desc: "Find opportunities relevant to your specific business capabilities." },
                { num: "STEP 02", title: "Evaluate", desc: "Review the available business context and determine fit." },
                { num: "STEP 03", title: "Express Interest", desc: "Signal that you can pursue or contribute to the opportunity." },
                { num: "STEP 04", title: "Negotiate", desc: "Discuss the potential commercial relationship parameters." },
                { num: "STEP 05", title: "Agree", desc: "Determine the terms that both businesses are comfortable with." },
                { num: "STEP 06", title: "Consent", desc: "Both sides explicitly agree to formal disclosure and next steps." },
                { num: "STEP 07", title: "Handshake", desc: "The relevant commercial relationship moves forward directly.", active: true },
              ].map((st, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3.5 rounded-[4px] border flex flex-col justify-between transition-colors",
                    st.active
                      ? "bg-[#171F2C] text-white border-[#171F2C]"
                      : "bg-white border-[#E2E8F0] text-[#171F2C]"
                  )}
                >
                  <div className="text-[10px] font-mono font-semibold mb-1 opacity-70">
                    {st.num}
                  </div>
                  <h3 className={cn("text-[13px] font-semibold mb-1", st.active ? "text-white" : "text-[#171F2C]")}>
                    {st.title}
                  </h3>
                  <p className={cn("text-[11px] leading-tight", st.active ? "text-slate-300" : "text-[#64748B]")}>
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 14: ECOSYSTEM ARCHITECTURE & NETWORK MATRIX (8 HUBS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Ecosystem Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                B2B Opportunity Exchange Network Matrix
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The B2B Opportunity Exchange serves as the foundational parent framework for specialized transaction networks, referral syndicates, and operational protocols across The Relay ecosystem.
              </p>
            </div>

            {/* Topic Hierarchy Map */}
            <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px]">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0] mb-4">
                <span className="w-2.5 h-2.5 bg-[#171F2C] rounded-[1px]"></span>
                <span className="text-[13px] font-bold text-[#171F2C]">
                  B2B Opportunity Exchange (Core Hub)
                </span>
                <span className="text-[10px] font-mono text-[#64748B] ml-auto">
                  PARENT NODE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Hub 1 */}
                <Link
                  to="/b2b-lead-exchange"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Specialized Exchange
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      B2B Lead Exchange
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Exchange qualified inbound leads your company cannot fulfill with verified peers.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Exchange</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                {/* Hub 2 */}
                <Link
                  to="/b2b-referral-network"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Syndicated Referrals
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      B2B Referral Network
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Establish formal, pre-agreed referral relationships with complementary specialists.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Network</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                {/* Hub 3 */}
                <Link
                  to="/b2b-partnership-network"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Alliance Formation
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      B2B Partnership Network
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Structure co-selling, strategic integrations, and reciprocal commercial agreements.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Network</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                {/* Hub 4 */}
                <Link
                  to="/distribution-partners"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Channel Expansion
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      Distribution Partners
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Connect with regional resellers, VARs, and authorized channel distributors.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Network</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                {/* Hub 5 */}
                <Link
                  to="/agency-lead-exchange"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Vertical Network
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      Agency Lead Exchange
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Specialized for marketing, development, creative, and consulting agency dealflow.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Exchange</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                {/* Hub 6 */}
                <Link
                  to="/8-step-journey"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Workflow Governance
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      How Relay Works
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      The step-by-step institutional transaction lifecycle from intent to final handshake.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Protocol</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                {/* Hub 7 */}
                <Link
                  to="/trust-and-safety"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Security &amp; Rules
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      Trust &amp; Safety
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Entity verification, consent barriers, and sensitive commercial data protection.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Standards</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>

                {/* Hub 8 */}
                <Link
                  to="/insights"
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                      Market Research
                    </div>
                    <div className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                      B2B Insights
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Institutional dealflow trends, partnership mechanics, and commercial exchange intelligence.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                    <span>View Intelligence</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 15: FAQ ACCORDION (7 CORE QUESTIONS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Answers &amp; Documentation
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
              SECTION 16: FINAL CTA SECTION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Structured Exchange
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Don't Let a Good Opportunity Stop at “We Don't Do That.”
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                If your business receives opportunities it cannot fulfil, or you're looking for commercial opportunities that match what you do, Relay gives you a structured place to exchange them.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Post an Opportunity
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Explore Opportunities
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
