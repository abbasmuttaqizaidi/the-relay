import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Check,
  CheckCircle2,
  FileText,
  Handshake,
  Network,
  Users,
  Briefcase,
  ShieldCheck,
  Percent,
  Coins,
  Repeat,
  Scale,
  Compass,
  ArrowLeftRight,
  SlidersHorizontal,
  Layers,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Clock,
  Lock,
  ExternalLink,
  Search,
  Target,
  Mail,
  BarChart3,
  Building,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/how-to-find-b2b-referral-partners")({
  head: () =>
    createSeoMeta({
      title: "How to Find B2B Referral Partners | The Relay",
      description:
        "Learn how to find B2B referral partners, evaluate partner fit, start the conversation, and build referral relationships that create value for both businesses.",
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
      a: "Finding effective B2B referral partners starts by mapping your customer journey to identify who serves your ideal clients before or after your service. You can discover candidates through existing client relationships, search engines, industry associations, LinkedIn, and ecosystem partner directories.",
    },
    {
      q: "What makes a good B2B referral partner?",
      a: "A strong referral partner shares your ideal customer profile (ICP) without offering competing services, maintains a high standard of work quality, possesses reliable delivery capacity, communicates transparently, and has a clear operational reason to exchange client introductions.",
    },
    {
      q: "How many referral partners should a business have?",
      a: "Most B2B organizations achieve the highest ROI by focusing on 3 to 7 active, highly engaged referral relationships. Managing a small group of high-trust partners yields better deal flow and higher conversion rates than attempting to maintain dozens of superficial partnerships.",
    },
    {
      q: "How do I approach a potential referral partner?",
      a: "Begin by focusing on their clients rather than a generic partnership pitch. Reach out with specific scenarios where your capabilities can solve unmet problems for their clients, or propose a brief exploratory call to discuss shared customer challenges.",
    },
    {
      q: "Should referral partnerships always involve a financial commission?",
      a: "No. While monetary referral fees (flat fees or percentage commissions) are common in many industries, many high-performing B2B partners prefer reciprocal deal exchanges where counterparties trade qualified commercial opportunities rather than managing cash commissions and vendor onboarding.",
    },
    {
      q: "How do I know whether a referral partner is a good operational fit?",
      a: "Evaluate candidates against six core criteria: target buyer overlap, service complementarity, domain reputation and client trust, delivery capacity and turnaround velocity, geographic/regulatory reach, and commercial alignment on expectations.",
    },
    {
      q: "What should be defined before sending the first client referral?",
      a: "Before making an introduction, establish what qualifies as an eligible referral, the introduction protocol (such as warm double-opt-in), the attribution timeframe, client relationship ownership boundaries, payment triggers (if applicable), and duplicate lead verification rules.",
    },
    {
      q: "How should a business track referral relationships?",
      a: "Track key operational metrics including referrals sent and received, partner response velocity, lead acceptance rates, closed-won conversion rates, and total realized commercial or reciprocal value generated across each partnership.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}/how-to-find-b2b-referral-partners#article`,
        url: `${SITE_URL}/how-to-find-b2b-referral-partners`,
        headline: "How to Find B2B Referral Partners",
        name: "How to Find B2B Referral Partners | The Relay",
        description:
          "Learn how to find B2B referral partners, evaluate partner fit, start the conversation, and build referral relationships that create value for both businesses.",
        publisher: {
          "@type": "Organization",
          name: "The Relay",
          url: SITE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/how-to-find-b2b-referral-partners`,
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
            item: `${SITE_URL}`,
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
            name: "How to Find B2B Referral Partners",
            item: `${SITE_URL}/how-to-find-b2b-referral-partners`,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "The Relay",
        url: SITE_URL,
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
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: BREADCRUMB & HERO (DIRECT ANSWER)
              ═══════════════════════════════════════════════════════════════════ */}
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]">
              <li>
                <Link to="/" className="hover:text-[#171F2C] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#CBD5E1]">/</li>
              <li>
                <Link
                  to="/b2b-opportunity-exchange"
                  className="hover:text-[#171F2C] transition-colors"
                >
                  Opportunity Exchange
                </Link>
              </li>
              <li className="text-[#CBD5E1]">/</li>
              <li className="text-[#171F2C] font-bold">How to Find Referral Partners</li>
            </ol>
          </nav>

          <header className="border-b border-[#E2E8F0] pb-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-white border border-[#E2E8F0] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#F97316]" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#171F2C]">
                Educational Strategy Guide
              </span>
            </div>

            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171F2C] tracking-tight leading-[1.12]">
                How to Find B2B Referral Partners
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
                Finding high-performing B2B referral partners starts with knowing who already serves
                the clients you want, identifying adjacent customer problems you solve, and
                establishing a genuine commercial reason to exchange warm introductions.
              </p>
            </div>

            {/* Direct Answer Summary Box */}
            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4 max-w-4xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C]">
                <Target className="w-4 h-4 text-[#F97316]" />
                <span>The 6-Phase Partner Discovery Process</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">
                    Phase 1
                  </span>
                  <p className="text-xs font-bold text-[#171F2C]">Map Customer Journey</p>
                  <p className="text-[11px] text-[#64748B]">
                    Identify upstream and downstream service providers.
                  </p>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">
                    Phase 2
                  </span>
                  <p className="text-xs font-bold text-[#171F2C]">Define Partner Profile</p>
                  <p className="text-[11px] text-[#64748B]">
                    Establish ICP, industry, size, and geography criteria.
                  </p>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">
                    Phase 3
                  </span>
                  <p className="text-xs font-bold text-[#171F2C]">Discover Candidates</p>
                  <p className="text-[11px] text-[#64748B]">
                    Source via client networks, directories, and search.
                  </p>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">
                    Phase 4
                  </span>
                  <p className="text-xs font-bold text-[#171F2C]">Qualify &amp; Verify Fit</p>
                  <p className="text-[11px] text-[#64748B]">
                    Evaluate complementarity, trust, and capacity.
                  </p>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">
                    Phase 5
                  </span>
                  <p className="text-xs font-bold text-[#171F2C]">Initiate Dialogue</p>
                  <p className="text-[11px] text-[#64748B]">
                    Approach around shared client problem scenarios.
                  </p>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">
                    Phase 6
                  </span>
                  <p className="text-xs font-bold text-[#171F2C]">Pilot &amp; Agree Terms</p>
                  <p className="text-[11px] text-[#64748B]">
                    Define qualification, attribution, and introduction rules.
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: START WITH THE CUSTOMER, NOT THE PARTNER LIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>01</span>
                <span>•</span>
                <span>Journey Mapping</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Start with the Customer, Not the Partner List
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                The most common partner discovery mistake is compiling a random list of companies
                and pitching them cold. Effective referral architecture begins by mapping your ideal
                client&apos;s lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#F97316]" />
                  <h3 className="text-base font-bold text-[#171F2C]">Upstream Service Providers</h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Who does your ideal customer hire <em>immediately before</em> they realize they
                  need your solution? Upstream providers encounter the exact pain point that
                  triggers demand for your core capabilities.
                </p>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#334155] space-y-1">
                  <strong>Example:</strong> A branding agency designs a new corporate identity. The
                  client immediately needs a <em>web engineering firm</em> and an{" "}
                  <em>SEO consultancy</em> to build and rank the digital experience.
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#171F2C]" />
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Downstream &amp; Parallel Providers
                  </h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Who does your client work with <em>after</em> or <em>alongside</em> your
                  engagement? Parallel providers share the same executive budget holder while
                  operating in complementary technical or creative domains.
                </p>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#334155] space-y-1">
                  <strong>Example:</strong> A cybersecurity auditing firm identifies compliance gaps
                  that they cannot remediate themselves due to audit independence. They hand off
                  remediation to a <em>managed cloud infrastructure provider</em>.
                </div>
              </div>
            </div>

            {/* Process Flow Ribbon */}
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-[#64748B]">
                <span className="font-bold text-[#171F2C]">The Discovery Chain:</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs text-[#334155] font-medium">
                <span className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  Target Buyer
                </span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  Core Problem
                </span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  Adjacent Provider
                </span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-[#171F2C] text-white rounded-[4px] font-semibold">
                  Ideal Referral Partner
                </span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: DEFINE YOUR IDEAL REFERRAL PARTNER (IPP)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>02</span>
                <span>•</span>
                <span>Profile Specification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Define Your Ideal Referral Partner Profile
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Just as your sales team maintains an Ideal Customer Profile (ICP), your partnerships
                effort requires a concrete Ideal Partner Profile (IPP) to avoid wasting time on
                mismatched organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 1
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Target Buyer Alignment</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  They sell directly to your exact decision-maker (e.g., VP of Engineering, CMO,
                  Head of Procurement) at similar company stages.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 2
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Deal Size &amp; ACV Parity</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Their average contract value (ACV) and client sophistication match your commercial
                  tier (e.g., $50k–$250k enterprise engagements).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 3
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Non-Competing Scope</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Zero commercial overlap in your primary service line. You complement their
                  deliverable rather than compete for the same budget line.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 4
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Natural Referral Trigger</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Their standard delivery process routinely uncovers client friction that only your
                  solution resolves (e.g., migrations, audits, scaling).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 5
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Geographic &amp; Legal Fit</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  They operate in the territories, regulatory jurisdictions, or compliance regimes
                  relevant to your client base.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 6
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Reputation &amp; Standards</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Introducing them enhances your client trust. They maintain verifiable case
                  studies, strong client retention, and verified domain authority.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 7
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Delivery Capacity</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  They possess the team depth and operational bandwidth to respond to introduced
                  leads rapidly without causing delivery bottlenecks.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Criteria 8
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">Communication &amp; SLAs</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  A commitment to transparent pipeline reporting, prompt prospect follow-up, and
                  honoring agreed attribution rules.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: PRACTICAL DISCOVERY CHANNELS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>03</span>
                <span>•</span>
                <span>Sourcing Strategy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Where to Find Businesses That Fit the Profile
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                The objective is not to build a database of thousands of random names, but to
                identify the 10 to 20 highly relevant businesses that genuinely share your
                commercial orbit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Users className="w-4 h-4 text-[#F97316]" />
                  <span>1. Existing Client Inquiries</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Ask your current best clients which other software, agencies, or consultancies
                  they rely on. A firm that your happiest clients already trust is an instant
                  top-tier partner candidate.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Search className="w-4 h-4 text-[#171F2C]" />
                  <span>2. Solution &amp; Ecosystem Queries</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Search for complementary B2B services combined with your industry and geography
                  (e.g., &ldquo;Healthcare HubSpot implementation agency UK&rdquo; or &ldquo;SOC-2
                  penetration testing firm DACH&rdquo;).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Building className="w-4 h-4 text-[#171F2C]" />
                  <span>3. Industry &amp; Trade Associations</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Specialized B2B trade bodies, chambers of commerce, and vertical directories list
                  vetted service providers categorized by sub-specialty.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Network className="w-4 h-4 text-[#171F2C]" />
                  <span>4. Professional Networks (LinkedIn)</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Search by firm capabilities and shared client personas rather than generic
                  &ldquo;Partner Manager&rdquo; titles. Look for boutique agency founders, practice
                  heads, and managing partners.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Layers className="w-4 h-4 text-[#171F2C]" />
                  <span>5. Ecosystem &amp; Marketplace Directories</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Inspect certified partner directories of major platforms your clients use (e.g.,
                  AWS, Salesforce, Shopify Plus, Snowflake). These firms are pre-vetted for quality.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Handshake className="w-4 h-4 text-[#059669]" />
                  <span>6. Executive Roundtables &amp; Communities</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Participate in specialized founder networks, agency collectives, and niche
                  industry events where B2B leaders actively discuss co-selling and mutual deal
                  flow.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: LOOK FOR REAL REFERRAL & PARTNERSHIP SIGNALS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>04</span>
                <span>•</span>
                <span>Candidate Research</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Look for Real Referral &amp; Partnership Signals
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Before reaching out, review the target business for tangible evidence that they
                value and understand collaborative partnerships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Dedicated Partner or Ecosystem Page</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Companies with an explicit &ldquo;Partners&rdquo; or &ldquo;Ecosystem&rdquo; page
                  on their website already have an established mental model for working with
                  external agencies and consultants.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Co-Marketing &amp; Joint Case Studies</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Look for published content, webinars, or case studies co-authored with
                  complementary providers. This confirms an active culture of collaborative
                  delivery.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Complementary Service Packaging</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Inspect their service menu. If they explicitly state that they do not offer your
                  core service (e.g., &ldquo;We focus strictly on backend dev and partner with
                  leading UX agencies&rdquo;), the fit is natural.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  <span>Evidence of Mutual Introductions</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Client testimonials mentioning how the firm seamlessly brought in trusted
                  specialists demonstrates that they regularly introduce their clients to vetted
                  counterparties.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: QUALIFY THE PARTNER (6-POINT FRAMEWORK)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>05</span>
                <span>•</span>
                <span>Vetting Framework</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Qualify the Partner: A 6-Point Evaluation Framework
              </h2>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-[#171F2C]">Customer Overlap</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Do they routinely work with the same company sizes, growth stages, and executive
                    stakeholders that comprise your primary customer segment?
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-[#171F2C]">Complementarity</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Is the division of scope crystal clear? Will your respective service offerings
                    fit together cleanly without competing for the same client budget?
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-[#171F2C]">Trust &amp; Reputation</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Would introducing this firm to your most valuable client elevate or endanger
                    your relationship? Inspect verified client references and work samples.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                      4
                    </span>
                    <h3 className="text-sm font-bold text-[#171F2C]">Capacity &amp; Velocity</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Do they have the available team bandwidth to follow up with an introduced
                    prospect within 24 to 48 hours and deliver quality execution?
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                      5
                    </span>
                    <h3 className="text-sm font-bold text-[#171F2C]">Geography &amp; Compliance</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Can they legally and operationally deliver services in the jurisdictions (e.g.,
                    GDPR, HIPAA, SOC2, US/UK/EU states) where your clients operate?
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                      6
                    </span>
                    <h3 className="text-sm font-bold text-[#171F2C]">Commercial Fit</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Are both organizations aligned on how value is exchanged—whether through
                    reciprocal deal parity, revenue-share percentages, or joint co-selling?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: DETERMINE RECIPROCITY ("WHAT CAN I SEND THEM?")
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>06</span>
                <span>•</span>
                <span>Bilateral Economics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Determine Whether the Relationship Can Be Reciprocal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-[#171F2C]">
                  The Golden Question: &ldquo;What Can I Send Them?&rdquo;
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The fastest way to kill a prospective referral partnership is to approach another
                  business expecting them to supply you with clients while offering nothing in
                  return. Before reaching out, identify your concrete value proposition to their
                  business.
                </p>
                <div className="space-y-2 pt-1 text-xs text-[#334155]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#059669]" />
                    <span>
                      <strong>Direct Reciprocal Leads:</strong> Client opportunities you can route
                      back to them.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#059669]" />
                    <span>
                      <strong>Co-Marketing / Joint Bidding:</strong> Including them in enterprise
                      RFPs and proposals.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#059669]" />
                    <span>
                      <strong>Commercial Revenue Share:</strong> Fair compensation on closed
                      referred revenue.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Realistic Reciprocity
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Reciprocity Does Not Mean Exact Monthly Parity
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Different industries have different project cadences. A branding agency might
                    send 3 web dev referrals per year, while an engineering firm might send 1 major
                    rebrand client. What matters is long-term mutual commercial respect and fair
                    value alignment.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#059669]">
                  Aligned Incentives • Sustainable Relationships
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: APPROACH THE RIGHT PERSON
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>07</span>
                <span>•</span>
                <span>Outreach Protocol</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                How to Approach the Right Person
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Do not open with a generic &ldquo;We&apos;d love to partner with you&rdquo; pitch.
                Make the initial conversation about <em>their clients</em> and common friction
                points they encounter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Rule 1
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">
                  Target Executive Decision-Makers
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  In boutique and mid-market B2B firms, reach out to Managing Directors, Agency
                  Founders, VP of Partnerships, or Practice Heads who have authority over client
                  routing.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Rule 2
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">
                  Lead with Specific Problem Scenarios
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Frame the message around client scenarios you frequently solve: &ldquo;When your
                  enterprise clients require custom SOC-2 remediation after audits, how do you
                  currently handle that handoff?&rdquo;
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                  Rule 3
                </span>
                <h3 className="text-sm font-bold text-[#171F2C]">
                  Keep the First Step Low Friction
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Do not send a 10-page partnership agreement. Propose a brief 15-minute
                  introductory discussion to compare client profiles and see if a referral
                  collaboration makes sense.
                </p>
              </div>
            </div>

            {/* Practical Email Framework */}
            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#171F2C]">
                <Mail className="w-4 h-4 text-[#F97316]" />
                <span>Effective Outreach Framework (Client-Centric Model)</span>
              </div>
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] font-mono text-xs text-[#334155] leading-relaxed space-y-2">
                <p>
                  <span className="text-[#64748B]">Subject:</span> Complementary client handoffs for
                  [Their Company] &amp; [Your Company]
                </p>
                <p>
                  <span className="text-[#64748B]">Body:</span> Hi [Name], I run [Your Company]. We
                  specialize in [Your Niche] for [Target ICP].
                </p>
                <p>
                  We frequently encounter clients needing [Their Core Specialty], which sits outside
                  our delivery scope. Looking at your work with [Client Type], our capabilities seem
                  highly complementary.
                </p>
                <p>
                  Are you open to a brief 15-minute call next week to see how we handle out-of-scope
                  client needs and whether a structured referral channel makes sense?
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: DEFINE WHAT A REFERRAL MEANS BEFORE SENDING ONE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>08</span>
                <span>•</span>
                <span>Governance &amp; Terms</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Define What a Referral Means Before Sending One
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Before facilitating the first introduction, ensure both counterparties have explicit
                clarity on operating rules, client ownership, and attribution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <FileText className="w-4 h-4 text-[#F97316]" />
                  <span>Qualification Criteria</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Explicitly define what counts as an eligible lead (budget verified, need
                  confirmed, authority established).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Handshake className="w-4 h-4 text-[#171F2C]" />
                  <span>Double-Opt-In Protocol</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Client consent must be secured in advance. No unsolicited contact transfers.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Clock className="w-4 h-4 text-[#171F2C]" />
                  <span>Attribution Window</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Agreed timeframe (e.g., 90 to 180 days) during which an intro qualifies for credit
                  if it closes.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <ShieldCheck className="w-4 h-4 text-[#171F2C]" />
                  <span>Account Ownership</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Scope boundaries ensuring the receiving firm does not pitch overlapping services
                  to the client.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Coins className="w-4 h-4 text-[#059669]" />
                  <span>Commercial Compensation</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Agreement on whether the deal operates via revenue-share, flat fee, or reciprocal
                  deal exchange.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Users className="w-4 h-4 text-[#171F2C]" />
                  <span>Duplicate Lead Rule</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Process for confirming whether a referred client is already an active pipeline
                  lead in their CRM.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-[#64748B]">
                Need a complete breakdown of referral contract terms and structures?
              </span>
              <Link
                to="/referral-partnerships"
                className="font-semibold text-[#171F2C] underline underline-offset-4 flex items-center gap-1"
              >
                <span>Read our Guide on Structuring Referral Partnerships</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: START WITH A SMALL PILOT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>09</span>
                <span>•</span>
                <span>Execution Strategy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Start with a Small Pilot (3 to 5 Partners)
              </h2>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
              <p className="text-sm text-[#334155] leading-relaxed">
                Do not attempt to sign 50 referral partners in your first quarter. High-performing
                partner networks are built incrementally. Begin by piloting with{" "}
                <strong>2 to 4 highly relevant businesses</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-xs font-bold text-[#171F2C]">1. Test the Handoff</span>
                  <p className="text-xs text-[#64748B]">
                    Execute 1 or 2 live introductions to observe partner response time and pitch
                    quality.
                  </p>
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-xs font-bold text-[#171F2C]">
                    2. Gather Client Feedback
                  </span>
                  <p className="text-xs text-[#64748B]">
                    Check in with your client to verify that the partner was professional,
                    responsive, and helpful.
                  </p>
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-xs font-bold text-[#171F2C]">3. Deepen or Iterate</span>
                  <p className="text-xs text-[#64748B]">
                    If the pilot succeeds, establish regular syncs. If communication falters, adjust
                    before expanding.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: TRACK THE RELATIONSHIP
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>10</span>
                <span>•</span>
                <span>Operational Health</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Track the Relationship: Key Operational Metrics
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  Metric 1
                </span>
                <span className="text-xs font-bold text-[#171F2C] block">Intros Sent</span>
                <span className="text-[11px] text-[#64748B]">Volume routed</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  Metric 2
                </span>
                <span className="text-xs font-bold text-[#171F2C] block">Intros Received</span>
                <span className="text-[11px] text-[#64748B]">Reciprocal flow</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  Metric 3
                </span>
                <span className="text-xs font-bold text-[#171F2C] block">Accept Rate</span>
                <span className="text-[11px] text-[#64748B]">Lead fit %</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  Metric 4
                </span>
                <span className="text-xs font-bold text-[#171F2C] block">Win Rate</span>
                <span className="text-[11px] text-[#64748B]">Closed deals</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  Metric 5
                </span>
                <span className="text-xs font-bold text-[#171F2C] block">Velocity</span>
                <span className="text-[11px] text-[#64748B]">Response SLA</span>
              </div>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  Metric 6
                </span>
                <span className="text-xs font-bold text-[#059669] block">Total Value</span>
                <span className="text-[11px] text-[#64748B]">Revenue / Deals</span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: COMMON MISTAKES TO AVOID
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>11</span>
                <span>•</span>
                <span>Pitfalls &amp; Traps</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Common Mistakes When Sourcing Referral Partners
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>1. Chasing Brand Fame Over Client Overlap</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Partnering with a giant enterprise brand usually results in zero deal flow because
                  their sales team has no incentive to route leads to boutique firms. Focus on agile
                  peers.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>2. Partnering with Hidden Competitors</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Failing to inspect their full service offering can lead to scope cannibalization
                  where the partner attempts to cross-sell into your primary client deliverables.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>3. Asking for Referrals Before Providing Value</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Demanding client leads on day one creates immediate resistance. Lead with an
                  introduction, industry insight, or client scenario to demonstrate goodwill first.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>4. Zero Follow-Up &amp; Ghosting Pipeline</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Failing to update a referring partner on introduced prospect progress ruins trust.
                  Maintain regular pipeline status communication.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 13: WHERE THE RELAY FITS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>12</span>
                <span>•</span>
                <span>The Modern Paradigm</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Where The Relay Fits in Partner Discovery
              </h2>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
              <p className="text-sm text-[#334155] leading-relaxed">
                Traditional partner discovery requires finding companies, cold outreach, assessing
                fit, initiating speculative conversations, and then waiting months hoping a client
                opportunity emerges.
              </p>
              <p className="text-sm text-[#334155] leading-relaxed">
                <strong>
                  The Relay puts an active commercial opportunity in the middle of that process.
                </strong>{" "}
                Instead of speculative networking, businesses discover vetted counterparties around
                live, unfulfilled client requirements—enabling both organizations to evaluate
                operational fit and commercial terms around a tangible commercial transaction.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/b2b-opportunity-exchange"
                  className="px-3.5 py-2 rounded-[4px] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#171F2C] transition-colors"
                >
                  Opportunity Exchange Overview
                </Link>
                <Link
                  to="/b2b-referral-network"
                  className="px-3.5 py-2 rounded-[4px] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#171F2C] transition-colors"
                >
                  B2B Referral Network
                </Link>
                <Link
                  to="/referral-partnerships"
                  className="px-3.5 py-2 rounded-[4px] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#171F2C] transition-colors"
                >
                  Structuring Referral Deals
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 14: FAQ SECTION (CRAWLER-FRIENDLY DOM)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>13</span>
                <span>•</span>
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Referral Partner Sourcing FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "bg-white border rounded-[4px] transition-colors overflow-hidden",
                      isOpen
                        ? "border-[#171F2C] shadow-2xs"
                        : "border-[#E2E8F0] hover:border-[#CBD5E1]",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-bold text-[#171F2C]">{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0",
                          isOpen && "rotate-180 text-[#171F2C]",
                        )}
                      />
                    </button>

                    {/* Crawler-Friendly: Rendered in HTML DOM */}
                    <div
                      className={cn(
                        "px-4 sm:px-5 pb-5 pt-0 transition-all duration-200",
                        isOpen ? "block" : "hidden",
                      )}
                    >
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] pt-3">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 15: FINAL CTA & TOPIC CLUSTER DIRECTORY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-8 pt-4">
            {/* CTA Box */}
            <div className="bg-[#171F2C] text-white rounded-[4px] p-8 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
              <div className="max-w-2xl space-y-3 relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F97316]">
                  Verified B2B Dealflow
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Discover High-Intent Referral Partners on The Relay
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  Join verified executive operators exchanging live client requirements, aligning on
                  bilateral parameters, and scaling partnership revenue with complete clarity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 relative z-10">
                <Link
                  to="/opportunities"
                  className="bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-xs sm:text-sm font-semibold px-6 py-3 rounded-[4px] transition-colors shadow-xs"
                >
                  Explore Opportunity Board
                </Link>
                <Link
                  to="/post"
                  className="bg-[#000000] hover:bg-[#334155] text-white border border-[#334155] text-xs sm:text-sm font-semibold px-6 py-3 rounded-[4px] transition-colors shadow-xs"
                >
                  Post a Client Requirement
                </Link>
              </div>
            </div>

            {/* Topic Cluster Cross-Links */}
            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                Referral &amp; Opportunity Cluster
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                <Link
                  to="/b2b-opportunity-exchange"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>B2B Opportunity Exchange (Parent)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#171F2C]" />
                </Link>
                <Link
                  to="/b2b-referral-network"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>B2B Referral Network</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#171F2C]" />
                </Link>
                <Link
                  to="/referral-partnerships"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>Structure Referral Deals</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#171F2C]" />
                </Link>
                <Link
                  to="/b2b-lead-exchange"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>B2B Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#171F2C]" />
                </Link>
                <Link
                  to="/b2b-partnership-network"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>B2B Partnership Network</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#171F2C]" />
                </Link>
                <Link
                  to="/8-step-journey"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>The 8-Step Relay Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#171F2C]" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
