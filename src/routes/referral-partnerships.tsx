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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/referral-partnerships")({
  head: () =>
    createSeoMeta({
      title: "B2B Referral Partnerships — Structure Referral Deals | The Relay",
      description:
        "Learn how B2B referral partnerships work, what terms to define, and how businesses can structure referral relationships around real commercial opportunities on The Relay.",
      path: "/referral-partnerships",
    }),
  component: ReferralPartnershipsPage,
});

export function ReferralPartnershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a B2B referral partnership?",
      a: "A B2B referral partnership is a formal commercial relationship where one business introduces qualified prospective clients to another under explicitly agreed operational guidelines, qualification criteria, and commercial compensation terms.",
    },
    {
      q: "How does a referral partnership differ from a referral network?",
      a: "A referral network refers to the broader ecosystem of complementary businesses you identify and maintain relationships with ('who to partner with'). A referral partnership refers to the specific structured agreement and operating terms between two counterparties ('how the deal actually works').",
    },
    {
      q: "What commercial models are commonly used in B2B referral partnerships?",
      a: "Common models include flat referral fees (fixed fee per closed deal or qualified opportunity), percentage commissions (percentage of contract value or first-year ARR), recurring revenue shares (ongoing percentage for an agreed duration), reciprocal referral exchanges (deal-for-deal parity), and joint delivery collaborations.",
    },
    {
      q: "What defines a 'qualified referral' in a B2B partnership?",
      a: "A qualified referral generally requires verified decision-maker authority, an explicit commercial need and timeline, client budget fit, prior consent to be introduced, and verification that the prospect is not already an active lead in the receiving partner's sales pipeline.",
    },
    {
      q: "How long should an attribution window last?",
      a: "Attribution windows vary based on the average B2B sales cycle length. Short sales cycles often use 60 to 90-day attribution windows, while enterprise software and complex agency contracts commonly use 6 to 12-month attribution periods from the initial introduction date.",
    },
    {
      q: "When should referral compensation be paid?",
      a: "Payment triggers should be explicitly agreed in advance. Best practice is to tie referral payouts to collected client revenue (such as within 30 days of client invoice settlement) rather than contract signing, ensuring cash-flow alignment for both parties.",
    },
    {
      q: "How does The Relay support structured referral partnerships?",
      a: "The Relay provides a structured opportunity exchange layer where businesses post unfulfilled client requirements, discover potential counterparties, align on commercial parameters in a deal memo, secure client consent, and execute warm executive introductions.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/referral-partnerships#webpage`,
        url: `${SITE_URL}/referral-partnerships`,
        name: "B2B Referral Partnerships — Structure Referral Deals | The Relay",
        description:
          "Learn how B2B referral partnerships work, what terms to define, and how businesses can structure referral relationships around real commercial opportunities on The Relay.",
        breadcrumb: {
          "@id": `${SITE_URL}/referral-partnerships#breadcrumb`,
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
        "@id": `${SITE_URL}/referral-partnerships#breadcrumb`,
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
            name: "Referral Partnerships",
            item: `${SITE_URL}/referral-partnerships`,
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
        "@id": `${SITE_URL}/referral-partnerships#faq`,
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
              SECTION 1: BREADCRUMB & HERO SECTION
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
              <li className="text-[#171F2C] font-bold">Referral Partnerships</li>
            </ol>
          </nav>

          <header className="border-b border-[#E2E8F0] pb-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-white border border-[#E2E8F0] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#F97316]" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#171F2C]">
                Commercial Partnership Architecture
              </span>
            </div>

            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171F2C] tracking-tight leading-[1.12]">
                Structure B2B Referral Partnerships Around Real Opportunities
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
                Discover how modern B2B referral partnerships operate, what governance terms to
                establish, and how counterparties align on commercial compensation and client
                introduction protocols before making introductions.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/opportunities"
                className="inline-flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#171F2C] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-[4px] transition-all shadow-xs"
              >
                <span>Explore Referral Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/b2b-referral-network"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] text-xs sm:text-sm font-semibold px-6 py-3 rounded-[4px] transition-colors shadow-2xs"
              >
                <span>Build a Referral Network</span>
              </Link>
            </div>

            {/* Executive Assurance Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">Clear Attribution</span>
              </div>
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">Defined Scope</span>
              </div>
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <Coins className="w-4 h-4 text-[#F97316] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">Agreed Payouts</span>
              </div>
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <Handshake className="w-4 h-4 text-[#171F2C] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">Client Consent</span>
              </div>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHAT IS A B2B REFERRAL PARTNERSHIP?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>01</span>
                <span>•</span>
                <span>Definition &amp; Operational Core</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                What is a B2B Referral Partnership?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  A <strong>B2B referral partnership</strong> is a formal commercial relationship
                  between two independent businesses that routinely encounter each other&apos;s
                  ideal client profile. Rather than relying on informal or verbal &ldquo;word of
                  mouth,&rdquo; a structured referral partnership establishes explicit rules for how
                  opportunities are qualified, how introductions are executed, who manages the
                  relationship, and how compensation or reciprocal value is settled.
                </p>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  In high-value B2B markets—such as SaaS platforms, enterprise consulting, digital
                  agencies, and logistics infrastructure—referrals carry immense commercial trust.
                  Formalizing the partnership protects that client trust while ensuring both
                  counterparties receive transparent attribution and fair commercial compensation.
                </p>
              </div>

              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Key Distinguishing Trait
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Intentional, Agreed Parameters
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Unlike casual introductions, structured referral deals establish defined
                    qualification gates, attribution windows, and compensation schedules before
                    client contact information is transferred.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#171F2C]">
                  Zero Ambiguity • Bilateral Alignment
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: REFERRAL NETWORK VS. REFERRAL PARTNERSHIP
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>02</span>
                <span>•</span>
                <span>Taxonomy &amp; Scope Boundary</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Referral Network vs. Referral Partnership
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Understanding the distinct role between building a partner network and formalizing
                an individual partnership arrangement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Referral Network Box */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-[4px]">
                      Macro Ecosystem
                    </span>
                    <Network className="w-4 h-4 text-[#64748B]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#171F2C]">B2B Referral Network</h3>
                  <p className="text-xs font-mono text-[#059669] font-medium">
                    &ldquo;Who should I partner with?&rdquo;
                  </p>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Focuses on discovering complementary, non-competing businesses that share your
                    buyer persona. It is about ecosystem mapping, industry synergy, and identifying
                    trustworthy organizations for potential deal flow.
                  </p>
                  <ul className="text-xs text-[#334155] space-y-1.5 pt-1">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#059669]" />
                      Partner identification &amp; vetting
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#059669]" />
                      Ecosystem &amp; audience overlap mapping
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#059669]" />
                      Relationship maintenance across sectors
                    </li>
                  </ul>
                </div>
                <Link
                  to="/b2b-referral-network"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171F2C] hover:text-[#000000] underline underline-offset-4 pt-2"
                >
                  <span>Explore B2B Referral Networks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Referral Partnership Box */}
              <div className="p-6 bg-white border-2 border-[#171F2C] rounded-[4px] shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#171F2C] px-2.5 py-1 rounded-[4px]">
                      Active Agreement
                    </span>
                    <Handshake className="w-4 h-4 text-[#171F2C]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#171F2C]">B2B Referral Partnership</h3>
                  <p className="text-xs font-mono text-[#F97316] font-medium">
                    &ldquo;How should this relationship actually work?&rdquo;
                  </p>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Focuses on the operational mechanics between two counterparties: commission
                    schedules, client introduction rules, attribution tracking, non-circumvention
                    commitments, and delivery expectations.
                  </p>
                  <ul className="text-xs text-[#334155] space-y-1.5 pt-1">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#171F2C]" />
                      Defined commercial terms &amp; fee triggers
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#171F2C]" />
                      Explicit qualified referral criteria
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#171F2C]" />
                      Attribution windows &amp; client ownership
                    </li>
                  </ul>
                </div>
                <div className="pt-2 text-xs font-mono text-[#64748B]">
                  Governed on an opportunity-by-opportunity basis
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: WHAT SHOULD A REFERRAL PARTNERSHIP DEFINE?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>03</span>
                <span>•</span>
                <span>Governance &amp; Terms</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                What Should a Referral Partnership Define?
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Before sending client introductions, mature B2B organizations establish clarity
                across seven fundamental operational pillars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <FileText className="w-4 h-4 text-[#F97316]" />
                  <span>1. Qualified Referral Scope</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Clear definition of which customer profiles, deal sizes, industries, and project
                  requirements qualify for referral attribution.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Handshake className="w-4 h-4 text-[#171F2C]" />
                  <span>2. Introduction &amp; Consent Rules</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Requirement that the client provides explicit prior consent before contact
                  information is transferred, preventing unsolicited cold outreach.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Coins className="w-4 h-4 text-[#059669]" />
                  <span>3. Commercial Model &amp; Payouts</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Explicit structure for fees (flat fee, percentage, recurring rev-share, or
                  reciprocal swap) and the exact payment trigger.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Clock className="w-4 h-4 text-[#64748B]" />
                  <span>4. Attribution Window</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The active timeframe (e.g., 90 days, 6 months) during which an introduction
                  qualifies for compensation if the deal closes.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Users className="w-4 h-4 text-[#171F2C]" />
                  <span>5. Duplicate Lead Handling</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Protocol for verifying whether the prospective client is already an active
                  pipeline contact of the receiving party.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <ShieldCheck className="w-4 h-4 text-[#171F2C]" />
                  <span>6. Relationship Ownership</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Scope boundaries ensuring the partner does not pitch conflicting services or
                  disrupt the referring entity&apos;s primary client account.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: COMMON REFERRAL PARTNERSHIP MODELS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>04</span>
                <span>•</span>
                <span>Commercial Compensation Structures</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Common B2B Referral Partnership Models
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                There is no universal &ldquo;standard&rdquo; referral rate across B2B industries.
                Partnerships adopt one of five primary commercial structures based on business
                margins, deal complexity, and reciprocity.
              </p>
            </div>

            <div className="space-y-4">
              {/* Model 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Model A
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">Flat Referral Fee</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A fixed monetary payment awarded upon successful qualification or contract
                    signing, regardless of total final invoice size.
                  </p>
                  <p className="text-[11px] font-mono text-[#334155]">
                    <strong>Best for:</strong> Standardized SaaS products, advisory assessments,
                    fixed-scope audits.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Typical Mechanism</span>
                  <span className="text-sm font-bold text-[#171F2C]">Fixed USD per Deal</span>
                </div>
              </div>

              {/* Model 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Model B
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">
                      Percentage Commission (Closed Contract Value)
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A percentage of the initial closed contract or first-year Annual Recurring
                    Revenue (ARR), agreed mutually based on gross margins.
                  </p>
                  <p className="text-[11px] font-mono text-[#334155]">
                    <strong>Best for:</strong> High-ticket custom development, enterprise software,
                    consultancy projects.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Typical Mechanism</span>
                  <span className="text-sm font-bold text-[#171F2C]">
                    % of First Contract Value
                  </span>
                </div>
              </div>

              {/* Model 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Model C
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">Recurring Revenue Share</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    An ongoing monthly or quarterly percentage distributed as long as the referred
                    client retains the receiving firm&apos;s retainer or subscription.
                  </p>
                  <p className="text-[11px] font-mono text-[#334155]">
                    <strong>Best for:</strong> Managed services (MSP), retained marketing agencies,
                    cloud infrastructure.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Typical Mechanism</span>
                  <span className="text-sm font-bold text-[#171F2C]">% of Monthly Retainer</span>
                </div>
              </div>

              {/* Model 4 */}
              <div className="p-5 bg-white border-2 border-[#171F2C] rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-white bg-[#171F2C] px-2 py-0.5 rounded-[4px]">
                      Model D (Zero Cash)
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">
                      Reciprocal Referrals (Deal Parity)
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Zero cash fee exchange. Counterparties maintain a reciprocal handshake where
                    qualified customer opportunities of equivalent commercial value are returned
                    over time.
                  </p>
                  <p className="text-[11px] font-mono text-[#059669] font-medium">
                    <strong>The Relay Native Protocol:</strong> Avoids vendor onboarding, commission
                    tracking overhead, and tax complications.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Typical Mechanism</span>
                  <span className="text-sm font-bold text-[#059669]">Opportunity Parity (1:1)</span>
                </div>
              </div>

              {/* Model 5 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Model E
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">
                      Co-Delivery &amp; Subcontracting
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The referring partner stays involved in the delivery phase, providing
                    complementary domain consulting or strategic oversight while the partner
                    executes technical scope.
                  </p>
                  <p className="text-[11px] font-mono text-[#334155]">
                    <strong>Best for:</strong> Strategic consulting firms partnering with technical
                    systems integrators.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Typical Mechanism</span>
                  <span className="text-sm font-bold text-[#171F2C]">Joint Delivery Split</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: WHAT IS A QUALIFIED REFERRAL?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>05</span>
                <span>•</span>
                <span>Opportunity Quality Assurance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                What is a Qualified Referral?
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                A shared contact is not a referral. High-performing partnerships enforce a 4-point
                qualification checklist before logging an introduction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Decision Authority</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The referred contact possesses executive decision-making or budget oversight for
                  the requested commercial solution.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Active Commercial Need</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The client has confirmed an active requirement, defined project timeline, and
                  allocated commercial budget.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Explicit Consent</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The prospective client has explicitly agreed to be introduced to the specific
                  partner firm for discovery.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-[4px] bg-[#171F2C] text-white flex items-center justify-center font-mono font-bold text-xs">
                  04
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Net-New Status</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Verification that the prospective client is not an active sales lead already in
                  the receiving partner&apos;s CRM pipeline.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: CLIENT OWNERSHIP & INTRODUCTION RULES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>06</span>
                <span>•</span>
                <span>Account Protection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Client Ownership and Introduction Rules
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#059669]" />
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Preserving Primary Client Ownership
                  </h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  When you introduce an existing client to a partner, you are extending your
                  hard-won reputation. Structured agreements clearly define that the referring
                  business retains the primary account relationship. The partner operates strictly
                  within the scoped domain they were introduced for.
                </p>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#334155] space-y-1">
                  <strong>Scope Fence Rule:</strong> The receiving partner agrees not to pitch
                  services that directly compete with the referring firm without prior mutual
                  written consent.
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-[#171F2C]" />
                  <h3 className="text-base font-bold text-[#171F2C]">
                    The Warm Double-Opt-In Protocol
                  </h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Never hand over client emails or phone numbers without first briefing the client
                  and securing their buy-in. A warm, double-opt-in email or calendar invite ensures
                  the introduction begins on high-trust footing, resulting in dramatically higher
                  pipeline conversion rates.
                </p>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#334155] space-y-1">
                  <strong>Conversion Metric:</strong> Warm double-opt-in introductions convert at
                  over 4x the rate of passive contact exchanges.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: ATTRIBUTION & PAYMENT RULES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>07</span>
                <span>•</span>
                <span>Settlement &amp; Transparency</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Attribution and Payment Schedules
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#64748B]">
                  Timing Window
                </span>
                <h3 className="text-base font-bold text-[#171F2C]">Attribution Duration</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Establish a clear window (e.g., 90 to 180 days) during which an introduction is
                  attributed to the referring partner if a deal closes. If a deal closes after the
                  window expires without active engagement, attribution terms may lapse.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#64748B]">
                  Payment Trigger
                </span>
                <h3 className="text-base font-bold text-[#171F2C]">Cash-Collected Alignment</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Compensation should trigger upon verified cash receipt from the client (e.g., Net
                  15 or Net 30 after customer invoice settlement), ensuring the executing partner is
                  never paying commissions on unpaid accounts.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#64748B]">
                  Reporting Cadence
                </span>
                <h3 className="text-base font-bold text-[#171F2C]">Pipeline Transparency</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Partners should provide regular pipeline status updates (Discovery, Proposal,
                  Negotiation, Closed-Won) so referring teams maintain visibility into introduced
                  deal progress.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: HOW REFERRAL PARTNERSHIPS WORK ON THE RELAY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>08</span>
                <span>•</span>
                <span>The Relay Opportunity Protocol</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                How Referral Partnerships Work on The Relay
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                The Relay provides an institutional dealflow layer where verified operators discover
                unfulfilled client requirements, agree on bilateral parameters, and execute warm
                handshakes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F97316]">Step 1</span>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Post Need</span>
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Post Unfulfilled Requirement</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Publish a blinded commercial requirement describing the client&apos;s need and
                  your desired exchange parameters (rev-share, fee, or reciprocal deal).
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F97316]">Step 2</span>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">
                    Express Interest
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Discover &amp; Pitch Terms</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Qualified counterparties discover the listing and express interest with their
                  specific delivery capabilities and reciprocal value offer.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F97316]">Step 3</span>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">
                    Align Terms
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Negotiate Commercial Split</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Parties agree on the commission percentage, attribution period, and qualification
                  criteria within a clean structured deal memo.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F97316]">Step 4</span>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Agreement</span>
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Mutual Agreement Lock</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Both executives confirm the structured terms. Blinded company identities unmask
                  safely only after mutual alignment is reached.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F97316]">Step 5</span>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">
                    Client Consent
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Client Double-Opt-In</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The referring partner informs the client of the vetted counterparty and secures
                  explicit permission to facilitate the introduction.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F97316]">Step 6</span>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Handshake</span>
                </div>
                <h3 className="text-sm font-bold text-[#171F2C]">Executive Introduction</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Warm introduction executed. Commercial deal progresses under the agreed parameters
                  with zero friction or vague expectations.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#64748B] flex items-center justify-between flex-wrap gap-2">
              <span>Want to see the entire end-to-end platform workflow in detail?</span>
              <Link
                to="/8-step-journey"
                className="font-semibold text-[#171F2C] underline underline-offset-4 flex items-center gap-1"
              >
                <span>Read the 8-Step Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: EXAMPLE B2B REFERRAL PARTNERSHIP STRUCTURES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>09</span>
                <span>•</span>
                <span>Practical Case Studies</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Example B2B Referral Partnership Structures
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Example 1 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#F97316] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-[4px]">
                    SaaS &amp; SI Agency
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Cloud Platform &amp; Integration Partner
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A B2B SaaS platform encounters enterprise clients needing custom ERP migration.
                    They refer clients to a certified Systems Integrator under a
                    percentage-of-first-year contract commission + co-marketing attribution.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#334155]">
                  Revenue Share on Services + Annual Software Subscription
                </div>
              </div>

              {/* Example 2 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#059669] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-[4px]">
                    Agency Deal Parity
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Performance Media &amp; Brand Strategy
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A paid acquisition agency and a brand identity studio maintain a reciprocal deal
                    exchange. When brand clients request media scaling, they route to the media
                    agency, which reciprocates with rebrand requirements.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#059669]">
                  1:1 Opportunity Exchange • Zero Cash Tracking
                </div>
              </div>

              {/* Example 3 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                    FinTech &amp; Advisory
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Corporate Advisory &amp; Credit Platform
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A corporate M&amp;A advisory firm refers venture-backed mid-market companies
                    seeking non-dilutive credit lines to a specialized B2B FinTech lender for a flat
                    origination fee upon credit facility closing.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#334155]">
                  Milestone Fee Paid Upon Facility Drawdown
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: COMMON MISTAKES WHEN STRUCTURING PARTNERSHIPS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>10</span>
                <span>•</span>
                <span>Risk Management</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Common Mistakes When Structuring Referral Partnerships
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>1. Subjective or Vague Qualification</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Failing to write down exact criteria for what counts as an attributed lead leads
                  to disputes over casual contact sharing versus genuine sales opportunities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>2. Unspecified Attribution Duration</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Without an agreed attribution window, parties argue over whether a deal that
                  closed 18 months after a single email introduction is still commission-eligible.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>3. Commission on Booking vs. Cash Collected</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Triggering referral fees upon contract signing before the customer pays creates
                  serious cash-flow liability if the client defaults or cancels early.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#FECACA] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>4. Unconsented Cold Handoffs</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Passing client details without prior client permission damages trust and produces
                  hostile first interactions with the referred partner.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: FREQUENTLY ASKED QUESTIONS (CRAWLER-FRIENDLY DOM)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>11</span>
                <span>•</span>
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Referral Partnership Governance FAQ
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

                    {/* Crawler-Friendly: Always rendered in HTML DOM */}
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
              SECTION 13: FINAL CTA & TOPIC CLUSTER DIRECTORY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-8 pt-4">
            {/* CTA Box */}
            <div className="bg-[#171F2C] text-white rounded-[4px] p-8 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
              <div className="max-w-2xl space-y-3 relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F97316]">
                  Verified Operator Network
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Structure Your Next B2B Referral Deal on The Relay
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  Join verified business executives who exchange high-intent customer requirements,
                  align on bilateral parameters, and execute warm introductions with total
                  commercial clarity.
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
                  Post a Commercial Opportunity
                </Link>
              </div>
            </div>

            {/* Topic Cluster Cross-Links */}
            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                Related Commercial Exchange Resources
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
                  <span>Build a B2B Referral Network</span>
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
                  to="/how-to-find-b2b-referral-partners"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>How to Find Referral Partners</span>
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
