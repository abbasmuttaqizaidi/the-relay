import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Check,
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
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/how-to-find-b2b-referral-partners")({
  head: () =>
    createSeoMeta({
      title: "How to Find B2B Referral Partners | The Relay",
      description:
        "Learn how to find B2B referral partners by defining the right partner profile, sourcing candidates, evaluating fit, and building a practical referral relationship.",
      path: "/how-to-find-b2b-referral-partners",
    }),
  component: HowToFindB2BReferralPartnersPage,
});

export function HowToFindB2BReferralPartnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I find B2B referral partners?",
      a: "Finding B2B referral partners begins by mapping your customer journey to identify who serves your ideal clients before, during, or after your engagement. You can source candidates through existing client relationships, supplier ecosystems, professional networks, industry trade associations, LinkedIn research, and structured opportunity discovery platforms.",
    },
    {
      q: "What makes a good referral partner?",
      a: "A suitable referral partner typically shares your target customer profile without directly competing with your primary service, maintains a solid reputation for work quality, has reliable delivery capacity, communicates transparently, and has a clear operational or commercial reason to collaborate.",
    },
    {
      q: "Where can I find referral partners?",
      a: "Practical sourcing channels include existing client recommendations, non-competing vendors and suppliers, industry associations, partner directories in complementary software ecosystems, specialized founder communities, and opportunity exchange platforms like The Relay.",
    },
    {
      q: "Should a referral partner serve the same customers as me?",
      a: "Yes. Strong referral partnerships are generally built on shared customer overlap. When two businesses serve the same target buyer or industry vertical with complementary services, they encounter adjacent client needs that naturally create opportunities for introductions.",
    },
    {
      q: "Should referral partners be non-competing?",
      a: "Generally, yes. Referral partnerships work best when there is a clear division of capabilities. However, some firms with minor overlapping services can still partner successfully if they define distinct geographic boundaries, client tiers, or specialized sub-capabilities.",
    },
    {
      q: "How do I approach a potential referral partner?",
      a: "Approach potential partners by focusing on their clients rather than a generic partnership pitch. Reference a specific client problem where your capabilities solve an unmet need adjacent to their work, and suggest a brief exploratory conversation to see whether a referral relationship makes sense.",
    },
    {
      q: "Should referral partnerships involve commissions?",
      a: "It depends on the businesses and industry norms. Some partnerships operate with percentage or flat referral fees, while others operate entirely on reciprocal deal exchanges or joint co-marketing without financial compensation.",
    },
    {
      q: "How many referral partners should a business have?",
      a: "Most businesses benefit from starting with a small number of highly relevant, engaged referral relationships rather than managing a large, unfocused roster. Starting small allows you to test communication, evaluate client feedback, and refine handoff workflows.",
    },
    {
      q: "How should referral relationships be tracked?",
      a: "Track operational health indicators such as introductions sent and received, partner response times, lead qualification rates, closed opportunities, and qualitative feedback from referred clients.",
    },
    {
      q: "Can The Relay help businesses discover referral partners?",
      a: "Yes. The Relay provides an opportunity-based discovery route where businesses can post structured commercial requirements and connect with counterparties that hold complementary capabilities, enabling both sides to evaluate fit around live opportunities.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/how-to-find-b2b-referral-partners#webpage`,
        url: `${SITE_URL}/how-to-find-b2b-referral-partners`,
        name: "How to Find B2B Referral Partners | The Relay",
        description:
          "Learn how to find B2B referral partners by defining the right partner profile, sourcing candidates, evaluating fit, and building a practical referral relationship.",
        breadcrumb: {
          "@id": `${SITE_URL}/how-to-find-b2b-referral-partners#breadcrumb`,
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
        "@id": `${SITE_URL}/how-to-find-b2b-referral-partners#breadcrumb`,
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
            name: "B2B Referral Network",
            item: `${SITE_URL}/b2b-referral-network`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "How to Find B2B Referral Partners",
            item: `${SITE_URL}/how-to-find-b2b-referral-partners`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/how-to-find-b2b-referral-partners#faq`,
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
                <Link to="/b2b-referral-network" className="hover:text-[#171F2C] transition-colors">
                  Referral Network
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">
                How to Find B2B Referral Partners
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION: HERO
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  B2B REFERRAL PARTNER SOURCING
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-5">
                  How to Find B2B Referral Partners
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    Finding effective B2B referral partners is not about mass outreach or collecting generic agency contacts. A productive partnership forms when two businesses serve the same customer profile with complementary, non-competing capabilities.
                  </p>
                  <p className="text-[#334155]">
                    This guide details how to map your client journey, define an Ideal Partner Profile (IPP), research candidate firms, evaluate operational alignment, and structure a practical initial pilot.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Referral Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post a Referral Requirement
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Map customer journeys · Evaluate service complementarity · Start with focused pilots
                </p>
              </div>

              {/* Graphic Column: Process Topology */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Referral Discovery Framework
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      REFERRAL-MAP-V1
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">1. Journey &amp; Profile Mapping</div>
                        <div className="text-[11px] text-[#64748B]">Target buyer, adjacent needs, non-competing scope</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Profile
                      </span>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">2. Sourcing &amp; Due Diligence</div>
                        <div className="text-[11px] text-[#64748B]">Directories, networks, reputation, delivery capacity</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Verify
                      </span>
                    </div>

                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">3. Dialogue &amp; Focused Pilot</div>
                        <div className="text-[11px] text-slate-300">Problem-led outreach, agreed rules, initial test handoffs</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#171F2C] bg-white px-2 py-0.5 rounded-[2px] font-bold">
                        Pilot
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Complementary partnerships built on mutual client value.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: START WITH THE CUSTOMER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 01
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Start With the Customer, Not the Partner List
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed">
                Partner discovery becomes actionable when you trace the steps your customer takes before, during, and after engaging your services:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="text-xs font-mono font-semibold text-[#171F2C] uppercase tracking-wider">
                  Core Diagnostic Questions
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Who does the customer speak to before us?</strong> Upstream vendors who identify problems requiring your solution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Who do they need after us?</strong> Downstream specialists who implement or maintain the next phase of the project.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Which services are adjacent to ours?</strong> Parallel experts who share the same buyer without competing for budget.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Where do customer needs overlap cleanly?</strong> Intersections where handoffs feel natural and valuable to the client.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                  Illustrative Customer Journey Example
                </div>
                <div className="space-y-3 text-[13px]">
                  <div>
                    <div className="font-semibold text-[#171F2C]">Core Capability:</div>
                    <div className="text-[#64748B]">
                      B2B Software &amp; ERP Implementation Firm
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0]">
                    <div className="font-semibold text-[#171F2C]">Adjacent Referral Ecosystem:</div>
                    <div className="text-[#64748B] leading-relaxed">
                      Cybersecurity auditing firms (assessing system compliance before deployment), cloud infrastructure consultancies (managing server architecture), and workflow automation agencies (configuring downstream operational pipelines).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: DEFINE YOUR IDEAL REFERRAL PARTNER PROFILE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 02
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Define Your Ideal Referral Partner Profile
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Establishing a clear partner profile focuses your research on organizations with high strategic compatibility:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  1. Customer Overlap
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  They serve the same company sizes, industry sectors, and organizational maturity levels as your firm.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  2. Service Complementarity
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Their core offering naturally pairs with yours without conflicting over primary deliverables or billable scope.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  3. Target Buyer Alignment
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  They maintain active relationships with the specific decision-makers (e.g., CTO, CMO, COO) you target.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  4. Geographic Fit
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  They operate in the legal jurisdictions, compliance regimes, and regional markets relevant to your clients.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  5. Delivery Quality &amp; Bench
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  They maintain a reliable operational track record, protecting your reputation when introductions are made.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  6. Commercial Alignment
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Both organizations share compatible expectations regarding deal mechanics, client communication, and transparency.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHERE TO FIND B2B REFERRAL PARTNERS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 03
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where to Find B2B Referral Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Source candidate referral partners across a diverse mix of warm relationships, targeted research, and structured platforms:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">01 · Existing Client Inquiries</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Ask satisfied clients which other specialized agencies, software platforms, or consultancies they frequently work with.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">02 · Non-Competing Suppliers</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Connect with vendors and technology providers who sell adjacent tools or infrastructure into your target market.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">03 · Industry Associations</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Vertical trade bodies, regional chambers of commerce, and professional rosters organized by technical specialization.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">04 · Professional Networks (LinkedIn)</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Identify boutique agency founders, practice leaders, and partners who regularly publish insights on adjacent customer challenges.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">05 · Ecosystem Directories</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Explore partner rosters for major enterprise platforms (e.g., Salesforce, HubSpot, AWS, Snowflake) that your clients deploy.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">06 · Structured Exchanges (The Relay)</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Discover commercial counterparties by posting or evaluating structured B2B requirements around live customer demand.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: HOW TO RESEARCH A POTENTIAL REFERRAL PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 04
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Research a Potential Referral Partner
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before initiating outreach, gather verifiable evidence regarding their service scope and market positioning:
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                Key Research Areas to Review
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">Service Scope &amp; Line Card</div>
                  <p className="text-[#64748B]">Verify that their primary offering does not directly overlap with your core deliverables.</p>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">Target Industries &amp; Client Sizes</div>
                  <p className="text-[#64748B]">Review case studies and client logos to ensure they operate in compatible customer segments.</p>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">Ecosystem Participation</div>
                  <p className="text-[#64748B]">Check whether they actively maintain technology certifications or co-marketing initiatives.</p>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">Collaborative Track Record</div>
                  <p className="text-[#64748B]">Look for signs that they work alongside external specialists rather than attempting to deliver everything internally.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: SIGNALS OF A GOOD REFERRAL PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 05
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Signals Suggest a Business Could Be a Good Referral Partner?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Look for positive indicators that demonstrate strategic alignment and a collaborative mindset:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-sm font-semibold text-[#171F2C] mb-1">Dedicated Partner Pages</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Having an ecosystem or partner section indicates an established framework for working with outside firms.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-sm font-semibold text-[#171F2C] mb-1">Joint Case Studies</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Published work featuring complementary vendors confirms active multi-firm delivery experience.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-sm font-semibold text-[#171F2C] mb-1">Clear Scope Boundaries</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Explicit statements about services they choose not to deliver, signaling room for specialized partners.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-sm font-semibold text-[#171F2C] mb-1">Shared Buyer Personas</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Content and positioning directed at the same executive stakeholders you routinely advise.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-sm font-semibold text-[#171F2C] mb-1">Recurring Adjacent Needs</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Frequent client encounters with problems that naturally lead into your service capabilities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-sm font-semibold text-[#171F2C] mb-1">Clear Economic Rationale</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  A distinct benefit for both organizations—such as expanding project capabilities or trading deal flow.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: HOW TO EVALUATE A REFERRAL PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 06
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Evaluate a Referral Partner
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Use this 8-point diagnostic evaluation framework to assess candidate compatibility:
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono font-semibold text-[#64748B] uppercase">
                    <th className="p-4">Evaluation Factor</th>
                    <th className="p-4">Key Diagnostic Question</th>
                    <th className="p-4">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#171F2C]">
                  <tr>
                    <td className="p-4 font-semibold">1. Customer Overlap</td>
                    <td className="p-4 text-[#64748B]">Do you sell to the same buyer types and industry sectors?</td>
                    <td className="p-4 text-[#64748B]">Ensures referred leads fit your commercial criteria.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">2. Complementarity</td>
                    <td className="p-4 text-[#64748B]">Is there a distinct separation of billable scope?</td>
                    <td className="p-4 text-[#64748B]">Prevents scope friction and competition for client budget.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">3. Reputation &amp; Quality</td>
                    <td className="p-4 text-[#64748B]">Do they have referenceable case studies and work examples?</td>
                    <td className="p-4 text-[#64748B]">Protects client trust when making warm introductions.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">4. Domain Experience</td>
                    <td className="p-4 text-[#64748B]">Do they have depth in the specific technical problem area?</td>
                    <td className="p-4 text-[#64748B]">Ensures delivered work meets professional standards.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">5. Geographic Fit</td>
                    <td className="p-4 text-[#64748B]">Can they operate within the required jurisdictions and timezones?</td>
                    <td className="p-4 text-[#64748B]">Avoids regional compliance and delivery barriers.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">6. Delivery Capacity</td>
                    <td className="p-4 text-[#64748B]">Do they have bench bandwidth to service introduced clients promptly?</td>
                    <td className="p-4 text-[#64748B]">Prevents client dissatisfaction caused by onboarding delays.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">7. Communication</td>
                    <td className="p-4 text-[#64748B]">Are they prompt in responding to introductions and status updates?</td>
                    <td className="p-4 text-[#64748B]">Maintains transparency across the partnership lifecycle.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">8. Commercial Alignment</td>
                    <td className="p-4 text-[#64748B]">Are both sides aligned on attribution, terms, and expectations?</td>
                    <td className="p-4 text-[#64748B]">Establishes sustainable, long-term commercial clarity.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: IDENTIFY REFERRAL VS COMPETITOR RELATIONSHIPS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 07
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Identify Referral vs Competitor Relationships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Not all service overlap creates direct competition. Evaluate potential scope boundaries carefully:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C]" />
                  <span>Complementary Partner Characteristics</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Distinct Core Focus:</strong> Primary revenue comes from different services or technologies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Shared Client Account:</strong> Both firms can bill the same client simultaneously without conflict.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Mutual Handoff Value:</strong> Passing leads enhances project outcomes for both vendors.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <XCircle className="w-4 h-4 text-[#64748B]" />
                  <span>Direct Competitor Risks</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Direct Budget Competition:</strong> Pitching the exact same core capability to the same buyer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Scope Cannibalization:</strong> Temptation to expand into your deliverable during delivery.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Conflicting Client Positioning:</strong> Mixed messaging to the client regarding primary project ownership.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: CAN THE RELATIONSHIP BE RECIPROCAL?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 08
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Can the Referral Relationship Be Reciprocal?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Determine the operational flow of introductions between both organizations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  One-Way Referral Model
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  One partner primarily generates and routes opportunities to the other. Common when an upstream service provider (such as a legal or accounting firm) encounters client needs for specialized downstream technical implementation.
                </p>
                <div className="text-xs font-mono text-[#64748B] pt-2">
                  Best suited when customer lifecycles flow in a single direction.
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Reciprocal Exchange Model
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Both businesses routinely encounter out-of-scope opportunities that match the other's core capability. Introductions flow bidirectionally over time as complementary client needs arise.
                </p>
                <div className="text-xs font-mono text-[#64748B] pt-2">
                  Best suited when both firms share parallel touchpoints with the same buyer.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: HOW TO APPROACH A REFERRAL PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 09
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Approach a Potential Referral Partner
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Initiate discussions around specific client problem scenarios rather than broad partnership pitches:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="text-xs font-mono font-semibold text-[#171F2C] uppercase tracking-wider">
                  Outreach Best Practices
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Research First:</strong> Understand their client profile and core services before reaching out.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Highlight Shared Problems:</strong> Reference concrete client friction points you help solve.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Keep Initial Step Low-Friction:</strong> Propose a brief introductory conversation to compare notes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Avoid Immediate Demands:</strong> Do not ask for client introductions during the first exchange.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                  Illustrative Outreach Template
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] font-mono text-xs text-[#334155] leading-relaxed space-y-2">
                  <p>
                    <span className="text-[#64748B]">Subject:</span> Complementary client capabilities for [Their Company] &amp; [Your Company]
                  </p>
                  <p>
                    Hi [Name], we work with [customer type] on [specific problem]. I noticed your team helps those same businesses with [adjacent need].
                  </p>
                  <p>
                    There may be situations where our clients need each other&apos;s services. Would you be open to a short conversation about whether a referral relationship makes sense?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: DEFINE WHAT A REFERRAL MEANS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 10
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Define What a Referral Means Before Sending One
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Clarify operating ground rules and expectations before making introductions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  1. Qualification Criteria
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Establish what constitutes a qualified lead (e.g., verified budget, active timeline, direct decision-maker).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  2. Introduction Protocol
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Confirm how handoffs occur (e.g., double opt-in email introduction vs. scheduling an exploratory sync).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  3. Attribution Window
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Agree on the timeframe during which an introduced prospect qualifies for partnership recognition.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  4. Account Ownership
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Ensure clear boundaries so that neither firm pitches services outside the agreed handoff scope.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  5. Commercial Structure
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Agree whether the relationship operates via reciprocal introductions, finder fees, or joint co-selling.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  6. Duplicate Lead Handling
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Define how to verify whether a referred client is already in active pipeline discussions.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: START WITH A SMALL PILOT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 11
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Start With a Small Referral Pilot
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Rather than building a sprawling partner roster, start with a small number of highly relevant businesses:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">1. Test Real Handoffs</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Execute one or two live introductions to evaluate responsiveness, pitch quality, and onboarding clarity.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">2. Gather Client Feedback</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Check with the referred client to ensure the partner provided professional, timely, and valuable advice.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">3. Iterate or Expand</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Refine communication and handoff steps based on real operational experience before broadening collaboration.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: TRACK THE RELATIONSHIP
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 12
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Track Referral Activity and Relationship Health
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Monitor practical indicators to assess whether the partnership remains mutually productive:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Activity</span>
                <span className="text-xs font-bold text-[#171F2C] block">Intros Sent</span>
                <span className="text-[11px] text-[#64748B]">Volume routed</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Reciprocity</span>
                <span className="text-xs font-bold text-[#171F2C] block">Intros Received</span>
                <span className="text-[11px] text-[#64748B]">Inbound flow</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Alignment</span>
                <span className="text-xs font-bold text-[#171F2C] block">Acceptance Rate</span>
                <span className="text-[11px] text-[#64748B]">Lead qualification</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Velocity</span>
                <span className="text-xs font-bold text-[#171F2C] block">Response Time</span>
                <span className="text-[11px] text-[#64748B]">Follow-up speed</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Commercial</span>
                <span className="text-xs font-bold text-[#171F2C] block">Closed Deals</span>
                <span className="text-[11px] text-[#64748B]">Engagements won</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Satisfaction</span>
                <span className="text-xs font-bold text-[#171F2C] block">Client Feedback</span>
                <span className="text-[11px] text-[#64748B]">Quality score</span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 13: COMMON MISTAKES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 13
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Common Mistakes When Finding Referral Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Avoid these frequent missteps during partner research, outreach, and onboarding:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  1. Prioritizing Fame Over Fit
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Choosing large brand-name agencies whose frontline teams have no incentive to route leads to boutique specialists.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  2. Ignoring Customer Overlap
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Partnering with firms whose clients operate in different industries or maintain drastically different project budgets.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  3. Assuming Every Complement Fits
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Treating every non-competing firm as a natural partner without validating operational compatibility.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  4. Demanding Leads on Day One
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Asking for client introductions before demonstrating competence, reliability, or value.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  5. Overlooking Direct Competition
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Failing to notice that a candidate actively pitches the same core deliverables to the same stakeholders.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  6. Vague Referral Definitions
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Making introductions without agreeing on qualification criteria, attribution windows, or communication protocols.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  7. Premature Data Sharing
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Transmitting sensitive client details before obtaining explicit double opt-in consent from the buyer.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  8. Ghosting Pipeline Status
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Failing to update the referring partner on whether an introduced prospect converted or stalled.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  9. Expecting Exact Parity
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Expecting identical monthly lead volumes despite different project lifecycles and sales velocity.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 14: WHERE THE RELAY FITS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 14
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where The Relay Fits in Referral Partner Discovery
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Traditional partner search relies on speculative networking, cold messaging, and long delays. The Relay provides an opportunity-based discovery route:
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
                    <span>A structured venue to post specific, unfulfilled client requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Discovery mechanism connecting firms with complementary capabilities around active demand.</span>
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
                    <span>The Relay does not guarantee referrals, lead volume, or closed revenue.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not certify partner quality or guarantee project conversion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not automatically enforce legal agreements or operate client billing.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Related Ecosystem Links */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Explore The Complete Referral &amp; Partnership Ecosystem
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link
                  to="/b2b-referral-network"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Referral Network</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/referral-partnerships"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">Referral Partnerships Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/b2b-partnership-network"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Partnership Network</span>
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
                  to="/agency-lead-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">Agency Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/8-step-journey"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">8-Step Journey Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 15: ILLUSTRATIVE EXAMPLES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 15
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Illustrative B2B Referral Partner Examples
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Hypothetical scenarios illustrating how complementary firms structure referral relationships:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Web Development Company + Branding Studio
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A branding studio creates new visual identities for mid-market firms. When clients require custom web applications to launch the brand, they refer work to a trusted web development agency, which reciprocates when web clients need identity refreshes.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategic Rationale:</strong> Shared marketing leadership buyer; zero overlap in core technical delivery.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  ERP Consultancy + Cybersecurity Specialist
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  An enterprise ERP consultancy deploys back-office databases. To comply with regulatory audits, clients require third-party penetration testing and SOC-2 auditing, which the ERP firm routes to an independent security consultancy.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategic Rationale:</strong> Audit independence prevents the ERP firm from auditing itself, creating a natural handoff.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  SaaS Implementation Firm + Managed IT Provider (MSP)
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A specialized CRM configuration agency partners with regional MSPs. When the MSP manages client workstation support, they introduce the CRM specialist for revenue operations workflows.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategic Rationale:</strong> The MSP deepens client retention without having to build a dedicated CRM practice.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  B2B Marketing Agency + Specialist Video Production Studio
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A performance marketing agency managing paid acquisition campaigns partners with a high-end corporate video production studio to deliver broadcast-quality video assets for demand generation.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategic Rationale:</strong> The agency accesses high-tier creative assets while the video studio gains recurring campaign demand.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 05
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Compliance Consultancy + Technology Implementation Firm
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A healthcare compliance advisory firm identifies technical data privacy vulnerabilities in client workflows and refers technical remediation to an authorized cloud engineering partner.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategic Rationale:</strong> Advisory firm focuses on regulatory strategy while engineering firm handles code implementation.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 16: REFERRAL PARTNER CHECKLIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 16
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                B2B Referral Partner Checklist
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Review this pre-outreach and pre-commitment checklist before finalizing a referral partnership:
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] text-[#171F2C]">
                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Shared target customer profile verified</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Complementary offering with non-competing scope</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Clear operational rationale for collaboration identified</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Technical expertise and work examples reviewed</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>No direct conflict on core client deliverables</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Geographic and regulatory compliance fit confirmed</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Delivery capacity and team bandwidth evaluated</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Communication and status update expectations discussed</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Referral definition and qualification rules understood</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Commercial terms or reciprocal expectations aligned</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] md:col-span-2">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Client information and double opt-in protocol confirmed</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 17: FAQ ACCORDION (DOM-RENDERED FOR CRAWLERS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Questions &amp; Answers
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Referral Partner Sourcing FAQ
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
              SECTION 18: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Referral Network Discovery
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Start Finding Referral Partners That Complement Your Business
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                A sustainable referral network starts with understanding your customer journey, defining a clear partner profile, and validating operational fit before making commitments. The Relay provides an opportunity-based discovery venue for businesses looking to build collaborative partnerships.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Referral Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post a Referral Requirement
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
