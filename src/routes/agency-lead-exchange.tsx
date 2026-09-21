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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/agency-lead-exchange")({
  head: () =>
    createSeoMeta({
      title: "Agency Lead Exchange — Exchange Out-of-Scope Leads | The Relay",
      description:
        "Exchange out-of-scope or unserviceable agency leads with businesses that can fulfil them. Discover and refer agency opportunities through The Relay.",
      path: "/agency-lead-exchange",
    }),
  component: AgencyLeadExchangePage,
});

export function AgencyLeadExchangePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is an agency lead exchange?",
      a: "An agency lead exchange is a structured process where marketing, design, engineering, or consulting agencies present genuine client enquiries they cannot fulfil internally, enabling suitable counterpart agencies or service providers to discover and express interest in fulfilling those opportunities.",
    },
    {
      q: "What kinds of leads can an agency exchange?",
      a: "Agencies commonly exchange commercial enquiries that involve services outside their core capabilities (e.g., native mobile app development for a web agency), specialized technical stacks, geographic markets outside their coverage, projects exceeding current delivery capacity, or engagements with scope requirements that do not fit their operational model.",
    },
    {
      q: "What is the difference between an out-of-scope lead and an unqualified lead?",
      a: "An unqualified lead often lacks genuine intent, legitimate project context, or realistic commercial requirements. An out-of-scope lead, by contrast, is often a genuine, high-intent client enquiry with defined business needs that simply falls outside your agency's specific service offerings, technical stack, or capacity constraints.",
    },
    {
      q: "Should agencies exchange every lead they cannot fulfil?",
      a: "No. Agencies should only refer opportunities that represent legitimate business needs with sufficient clarity for a receiving agency to evaluate fit. Unclear enquiries, spam requests, or opportunities where sharing information is inappropriate should not be submitted to an exchange.",
    },
    {
      q: "Can agencies exchange leads across different industry verticals?",
      a: "Yes. Many agencies exchange cross-disciplinary opportunities—such as a brand consultancy referring an enterprise software build to a development boutique, or an SEO agency referring video production to a creative studio.",
    },
    {
      q: "How does an agency assess another business before making a referral?",
      a: "Agencies evaluate prospective counterparts by reviewing their verified commercial profile, specific domain specialization, service portfolio, operating geographies, and historical delivery alignment before agreeing to progress a client introduction.",
    },
    {
      q: "Does The Relay fulfil referred client projects?",
      a: "No. The Relay functions solely as an opportunity discovery and counterpart connection layer. The participating agencies directly scope, contract, manage, and deliver client engagements according to their own standard commercial agreements.",
    },
    {
      q: "Can agencies agree on referral fees or other commercial arrangements?",
      a: "Yes. Participating agencies negotiate and establish their own bilateral commercial terms directly—whether structured as referral compensation, recurring revenue share, reciprocal opportunity exchange, or subcontracting arrangements.",
    },
    {
      q: "Does The Relay replace an agency's existing referral partnerships?",
      a: "No. The Relay complements existing agency relationships by providing an additional discovery venue when an agency encounters specialized, geographic, or capacity-constrained enquiries that their existing network cannot adequately serve.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/agency-lead-exchange#webpage`,
        url: `${SITE_URL}/agency-lead-exchange`,
        name: "Agency Lead Exchange — Exchange Out-of-Scope Leads | The Relay",
        description:
          "Exchange out-of-scope or unserviceable agency leads with businesses that can fulfil them. Discover and refer agency opportunities through The Relay.",
        breadcrumb: {
          "@id": `${SITE_URL}/agency-lead-exchange#breadcrumb`,
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
        "@id": `${SITE_URL}/agency-lead-exchange#breadcrumb`,
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
            name: "Agency Lead Exchange",
            item: `${SITE_URL}/agency-lead-exchange`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/agency-lead-exchange#faq`,
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
                Agency Lead Exchange
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
                  AGENCY-TO-AGENCY OPPORTUNITY EXCHANGE
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-5">
                  Agency Lead Exchange for Out-of-Scope Opportunities
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    Agencies regularly encounter genuine commercial enquiries they cannot fulfil due to service scope, technical stack, geography, or current team capacity.
                  </p>
                  <p className="text-[#334155]">
                    The Relay provides a structured environment where agencies can discover qualified counterpart businesses capable of fulfilling out-of-scope opportunities—turning unserviceable enquiries into collaborative business relationships.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Agency Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post an Agency Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Design Studios · Software Boutiques · Marketing Agencies · Management Consultancies
                </p>
              </div>

              {/* Graphic Column */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Structured Exchange Lifecycle
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      OPP-ROUTING-MODEL
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#64748B] mb-1">
                        <span>1. Inbound Enquiry</span>
                        <span className="text-[#171F2C] font-semibold">Scope Mismatch</span>
                      </div>
                      <div className="text-[13px] font-semibold text-[#171F2C]">Web studio receives specialized mobile app enquiry</div>
                      <div className="text-xs text-[#64748B] mt-0.5">Requirement falls outside internal engineering capabilities</div>
                    </div>

                    <div className="p-3.5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-300 mb-1">
                        <span>2. Opportunity Discovery</span>
                        <span className="text-white">Structured Listing</span>
                      </div>
                      <div className="text-[13px] font-bold text-white">Requirement published on The Relay</div>
                      <div className="text-xs text-slate-300 mt-0.5">Specialized mobile engineering firm reviews parameters &amp; expresses interest</div>
                    </div>

                    <div className="p-3.5 bg-white border border-[#171F2C] rounded-[4px]">
                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#171F2C] mb-1">
                        <span>3. Bilateral Alignment</span>
                        <Check className="w-4 h-4 text-[#171F2C]" />
                      </div>
                      <div className="text-[13px] font-semibold text-[#171F2C]">Direct Commercial Progression</div>
                      <div className="text-xs text-[#64748B] mt-0.5">Agencies agree on commercial structure and proceed directly with the prospective client</div>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Structured discovery for out-of-scope agency opportunities.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHAT IS AN AGENCY LEAD EXCHANGE?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Core Concept
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-4">
                What is an Agency Lead Exchange?
              </h2>
              <div className="space-y-3 text-base text-[#64748B] leading-relaxed">
                <p>
                  An agency lead exchange is a structured commercial mechanism where agencies present business opportunities they cannot fulfil themselves, allowing suitable counterpart agencies or service providers to discover and express interest in servicing those client requirements.
                </p>
                <p className="text-[#171F2C]">
                  Unlike a generic lead marketplace or cold contact list vendor, an agency lead exchange focuses specifically on matching authentic project requirements with specialized providers that possess the precise skills, capacity, and geographic presence required.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  01 · Lead Qualification
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Internal Filter
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Evaluating incoming enquiries against your agency's core competence, service boundaries, and commercial focus to determine delivery feasibility.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  02 · Direct Referral
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Known Introductions
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Passing an out-of-scope opportunity directly to an existing, pre-established partner within your agency's immediate informal network.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#171F2C] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold text-[#171F2C] uppercase tracking-wider mb-2">
                  03 · Lead Exchange
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Structured Discovery
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Presenting structured project parameters on an open B2B platform to discover capable counterparties when existing partner coverage is insufficient.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  04 · Partnership Network
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Long-Term Alliances
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Developing continuous bilateral co-marketing, co-pitching, and reciprocal dealflow arrangements between complementary agencies.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHY AGENCIES RECEIVE LEADS THEY CANNOT FULFIL
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Delivery Realities
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why Agencies Receive Leads They Cannot Fulfil
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Inbound enquiries that cannot be serviced internally are not necessarily low-quality prospects. Often they are genuine commercial needs that simply present an operational mismatch with your agency's delivery structure:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  1. Service Scope Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The client requests a discipline outside your core offering—such as custom mobile development for a web studio, or PR distribution for an SEO firm.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  2. Geographic Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The client requires on-site collaboration, localized legal compliance, or regional language support in a territory where your agency does not operate.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  3. Capacity Constraints
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Internal delivery teams are operating at peak utilization, making it impractical to take on immediate timelines without compromising existing engagements.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  4. Specialist Requirements
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The project demands niche technical expertise, legacy stack maintenance, or specialized regulatory certifications that your team does not maintain.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  5. Project-Size Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The engagement scope is either too large for a boutique studio or smaller than the operational minimum engagement threshold of an enterprise firm.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  6. Commercial Structure Constraints
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The client seeks a commercial framework (such as contingency, staff augmentation, or performance equity) that does not align with your standard billing model.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: NOT EVERY LEAD SHOULD BE EXCHANGED
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Qualification Standards
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Not Every Lead Should Be Exchanged
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Maintaining high exchange quality requires rigorous pre-filtering. Agencies should evaluate key governance and suitability criteria before introducing an opportunity:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C]" />
                  <span>Prerequisites for Referral</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Genuine Commercial Need:</strong> The prospect has an active project requirement and realistic timeline.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Understood Requirement:</strong> Basic project scope and deliverable expectations have been clearly defined.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Client Consent:</strong> The prospective client agrees to be connected with a capable specialist provider.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <XCircle className="w-4 h-4 text-[#64748B]" />
                  <span>When to Decline Referral</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Spam or Unverified Inquiries:</strong> Unsolicited messages with unverified contact details or unclear project context.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Unrealistic Expectations:</strong> Demands that no reputable service provider could reasonably deliver.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Confidentiality Restrictions:</strong> Scenarios where sharing project parameters violates existing client agreements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: WHAT MAKES AN AGENCY REFERRAL WORTH EXCHANGING?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Opportunity Quality
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Makes an Agency Opportunity Worth Referring?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                An opportunity becomes valuable for exchange when it possesses actionable clarity, allowing prospective counterparties to quickly determine delivery feasibility:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                    Defined Scope &amp; Technical Parameters
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    Clear specification of technical stack, platform requirements, integration boundaries, or creative deliverables.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                    Realistic Delivery Context
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A feasible timeline, identifiable project milestone structure, and reasonable stakeholder decision milestones.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                    Identifiable Specialization Gap
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A clear articulation of why the referring agency is passing the deal (e.g., specialized stack, geography, or bandwidth).
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                  Key Distinction: Unclear Lead vs. Out-of-Scope Opportunity
                </div>
                <div className="space-y-3 text-[13px]">
                  <div>
                    <div className="font-semibold text-rose-800">Unclear Lead:</div>
                    <div className="text-[#64748B]">
                      Vague brief, unresponsive client, undetermined commercial intent, or unrealistic expectations that make delivery unviable for any provider.
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0]">
                    <div className="font-semibold text-[#171F2C]">Out-of-Scope Opportunity:</div>
                    <div className="text-[#64748B]">
                      A well-defined requirement with authentic commercial backing that represents strong value for a specialist firm, but happens to sit outside your agency's business model.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: TYPES OF AGENCY OPPORTUNITIES COMMONLY EXCHANGED
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Common Use Cases
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Types of Agency Opportunities Commonly Exchanged
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Illustrative examples of client requirements agencies frequently present to counterparties:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                  DISCIPLINE 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Web Development Stack Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A React/Next.js studio receives an enterprise requirement for Adobe Experience Manager or legacy PHP infrastructure.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                  DISCIPLINE 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  SEO vs. Paid Media Specialization
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  An organic search agency receives requests for large-scale programmatic media buying or complex TikTok ad management.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                  DISCIPLINE 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Brand Identity vs. Performance Marketing
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A growth marketing boutique is approached for deep corporate identity rebrands, typography design, and packaging guidelines.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                  DISCIPLINE 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Native Mobile App Development
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A web application consultancy receives requests for native iOS Swift and Android Kotlin hardware-integrated applications.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                  DISCIPLINE 05
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Enterprise Implementation Overflow
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A mid-sized consultancy is invited to pitch an enterprise project requiring double their current engineering staffing capacity.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">
                  DISCIPLINE 06
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Cross-Border Geographic Coverage
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A domestic agency receives a client request for localized European regulatory compliance, German-language UX, or on-site support.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: HOW AGENCY LEAD EXCHANGE WORKS ON THE RELAY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How Agency Lead Exchange Works on The Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A clean 6-stage process designed for agencies to surface unserviceable requirements and discover capable counterparties:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  01 — Identify the Opportunity
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Assess Service Boundaries
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Determine whether an inbound client enquiry genuinely falls outside your agency's core competence, tech stack, or capacity.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  02 — Define the Requirement
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Structure Key Parameters
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Summarize the commercial need, timeline, and technical criteria without prematurely disclosing confidential client identifying data.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  03 — Post the Opportunity
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Publish to The Relay
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  List the structured opportunity on The Relay's B2B exchange for verified service providers to discover.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  04 — Receive Interest
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Counterparty Discovery
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Specialized agencies with matching capabilities review the requirement and signal formal interest in fulfilling the scope.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  05 — Assess Counterpart Fit
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Evaluate Capabilities
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Both agencies review track records, technical alignment, and commercial terms to ensure high delivery compatibility.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  06 — Progress the Relationship
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Direct Execution
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Where appropriate, agencies move forward directly to execute the client introduction and formalize their commercial agreement.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: AGENCY LEAD EXCHANGE VS OTHER MODELS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Model Comparison
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Agency Lead Exchange vs Referral Partner vs Lead Marketplace
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Understanding the functional differences between partnership models and discovery platforms:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-2">
                    Direct Referral
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Agency Referral
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    A bilateral introduction where a known firm passes a specific client to a trusted partner agency.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  <strong>Scope:</strong> Limited to existing contacts
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-2">
                    Open Exchange
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Lead Exchange
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    A structured venue where businesses present opportunities they cannot fulfil to discover suitable counterparties.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  <strong>Scope:</strong> Capability &amp; fit-driven
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-2">
                    Contact Reselling
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Lead Marketplace
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Commercial brokers selling access to bulk contact lists, raw web form fills, or syndicated scraping lists.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  <strong>Scope:</strong> Volume &amp; transactional leads
                </div>
              </div>

              <div className="p-5 bg-white border border-[#171F2C] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#171F2C] uppercase mb-2">
                    The Relay
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Opportunity Exchange
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                    A curated discovery layer matching structured commercial requirements with verified agency peers.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#171F2C] text-xs text-[#171F2C] font-medium">
                  <strong>Scope:</strong> Verified B2B counterpart matching
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: WHY THIS MATTERS TO AGENCIES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Agency Value
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why Agencies Exchange Out-of-Scope Opportunities
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Participating in a structured exchange can offer practical strategic advantages for specialized service firms:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Avoid Discarding Enquiries
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Instead of turning away inbound prospects empty-handed, agencies can provide a constructive path forward by connecting them with capable specialists.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Discover Specialist Counterparties
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Identify vetted domain experts in complementary disciplines—such as DevOps, mobile engineering, compliance, or international expansion.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Broaden Perceived Reach
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Support clients across broader requirements through collaborative partnerships without having to hire or build every capability in-house.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Reciprocal Inflow Potential
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Establishing productive referral relationships with other agencies frequently creates reciprocal opportunities over time.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Maintain Brand Focus
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Stay strictly focused on your high-margin core competencies rather than diluting delivery quality on tangential, unfamiliar services.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Structured Commercial Terms
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Establish transparent, mutually agreed-upon terms for introductions rather than relying on informal, unstructured arrangements.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: WHERE THE RELAY FITS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Platform Role &amp; Scope
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where The Relay Fits in Agency Lead Exchange
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay serves specifically as an opportunity discovery and counterpart connection layer:
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
                    <span>Structured listings for commercial agency opportunities and out-of-scope requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Discovery layer connecting verified agencies with specialized service providers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Bilateral interest signaling and mutual evaluation workflows.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  What Remains Between Agencies
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not fulfil client projects on behalf of the agency.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>Direct client relationships and commercial execution remain between the participating entities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>Relay is not a CRM, agency management tool, project fulfilment provider, or payment processor.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Related Topic Guides */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Related Commercial Ecosystem &amp; Decision Guides
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link
                  to="/b2b-opportunity-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Opportunity Exchange</span>
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
                  to="/b2b-referral-network"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Referral Network</span>
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
                  <span className="text-[13px] font-medium text-[#171F2C]">How To Monetize Unqualified Leads</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/how-to-exchange-business-leads"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">How To Exchange Business Leads</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/8-step-journey"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between sm:col-span-2 lg:col-span-3"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">8-Step Journey: The Opportunity Lifecycle on The Relay</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: ILLUSTRATIVE AGENCY SCENARIOS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Hypothetical Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Illustrative Agency Lead Exchange Scenarios
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The following hypothetical scenarios illustrate how specialized agencies might utilize an exchange to connect out-of-scope enquiries with capable counterparts:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="inline-block px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] uppercase">
                  Illustrative Scenario 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Web Design Agency &amp; Native Mobile App Requirement
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A digital design studio receives an enquiry from an existing client needing a dedicated iOS and Android application with Bluetooth peripheral integration. Because native mobile engineering is outside their core stack, the studio lists the requirement on The Relay to find a specialized mobile boutique.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="inline-block px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] uppercase">
                  Illustrative Scenario 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Technical SEO Firm &amp; Paid Media Campaign Request
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  An organic search consultancy receives an inbound request from an e-commerce brand seeking multi-channel performance advertising management across search and social. The SEO firm exchanges the opportunity with a performance media agency to ensure the client is served by a specialist.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="inline-block px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] uppercase">
                  Illustrative Scenario 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Boutique Studio &amp; Enterprise Capacity Overflow
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A five-person UX consultancy is invited to participate in a large corporate portal overhaul requiring twenty dedicated engineers. Rather than turning the client away, the boutique presents the opportunity to an enterprise systems integrator capable of handling the required delivery scale.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="inline-block px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] uppercase">
                  Illustrative Scenario 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Regional Agency &amp; International Market Request
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A North American agency receives an enquiry requiring local in-market media execution, regulatory compliance, and native translation across European territories. The agency connects with a European partner network to deliver localized capability.
                </p>
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
                Agency Lead Exchange FAQ
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
                Agency Opportunity Network
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Exchange the Agency Opportunities You Cannot Fulfil
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Post out-of-scope requirements, discover suitable counterparties, and build structured agency-to-agency commercial relationships on The Relay.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Agency Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post an Agency Opportunity
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
