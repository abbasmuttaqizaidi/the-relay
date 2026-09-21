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
  Building2,
  Share2,
  Cpu,
  Store,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/b2b-partnership-network")({
  head: () =>
    createSeoMeta({
      title: "B2B Partnership Network | The Relay",
      description:
        "Find B2B partnership opportunities with businesses that complement your capabilities. Explore referrals, co-selling, integrations, channel relationships and commercial collaborations on The Relay.",
      path: "/b2b-partnership-network",
    }),
  component: B2BPartnershipNetworkPage,
});

export function B2BPartnershipNetworkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a B2B partnership network?",
      a: "A B2B partnership network is an ecosystem of commercial relationships connecting businesses with complementary capabilities, customer access, technologies, distribution channels, or strategic offerings to create mutual commercial growth.",
    },
    {
      q: "What types of B2B partnerships exist?",
      a: "Major models include referral partnerships (client introductions), technology and integration partnerships (software and data connectivity), co-selling partnerships (joint bidding and account pursuit), channel partnerships (selling through a partner's channel), distribution partnerships (moving products into territories or reseller networks), and strategic alliances (broad joint market development).",
    },
    {
      q: "What is the difference between a partnership and a referral?",
      a: "A referral is focused on introducing a specific client opportunity from one business to another. A partnership represents a broader, ongoing collaborative relationship that may encompass joint delivery, co-marketing, technical integrations, or shared distribution channels.",
    },
    {
      q: "What is the difference between a channel partner and a distributor?",
      a: "A channel partner typically helps market, sell, or deliver solutions through their existing sales channels or client relationships. A distributor generally occupies an intermediary role in supply chains or reseller networks, holding inventory, managing territory rights, or handling regional logistics.",
    },
    {
      q: "How do businesses find potential B2B partners?",
      a: "Businesses discover partners through customer journey mapping, client recommendations, industry associations, partner directories, and opportunity exchange platforms like The Relay, where collaboration begins around active commercial requirements.",
    },
    {
      q: "What makes a good B2B partner?",
      a: "A strong partner shares your target audience without competing for the same service scope, maintains high execution quality and client reputation, possesses reliable capacity, and shares clear alignment on commercial expectations and communication.",
    },
    {
      q: "Can technology companies form partnerships with service businesses?",
      a: "Yes. SaaS and technology vendors routinely form partnerships with digital agencies, consultancies, and systems integrators who handle client implementation, customization, and ongoing management, creating substantial recurring value for both parties.",
    },
    {
      q: "How does The Relay help businesses discover partnerships?",
      a: "Traditional discovery relies on speculative outreach. The Relay puts active commercial opportunities at the center of discovery, enabling businesses to discover vetted counterparties around live client requirements and evaluate commercial fit based on real demand.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/b2b-partnership-network#webpage`,
        url: `${SITE_URL}/b2b-partnership-network`,
        name: "B2B Partnership Network — Find Commercial Partners | The Relay",
        description:
          "Find B2B partnership opportunities with businesses that complement your capabilities. Explore referrals, co-selling, integrations, channel relationships and commercial collaborations on The Relay.",
        breadcrumb: {
          "@id": `${SITE_URL}/b2b-partnership-network#breadcrumb`,
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
        "@id": `${SITE_URL}/b2b-partnership-network#breadcrumb`,
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
            name: "B2B Partnership Network",
            item: `${SITE_URL}/b2b-partnership-network`,
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
        "@id": `${SITE_URL}/b2b-partnership-network#faq`,
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
              SECTION 1: BREADCRUMB & HERO
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
              <li className="text-[#171F2C] font-bold">B2B Partnership Network</li>
            </ol>
          </nav>

          <header className="border-b border-[#E2E8F0] pb-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-white border border-[#E2E8F0] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-[#F97316]" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#171F2C]">
                Commercial Collaboration Ecosystem
              </span>
            </div>

            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171F2C] tracking-tight leading-[1.12]">
                Find B2B Partners for Commercial Growth and Collaboration
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
                Businesses frequently have capabilities, audience reach, and customer opportunities
                that another business can complement. Explore structured B2B partnership models
                across referrals, integrations, channel distribution, and strategic alliances on The
                Relay.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/opportunities"
                className="inline-flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#171F2C] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-[4px] transition-all shadow-xs"
              >
                <span>Explore Partnership Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/post"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#171F2C] text-xs sm:text-sm font-semibold px-6 py-3 rounded-[4px] transition-colors shadow-2xs"
              >
                <span>Post a Commercial Need</span>
              </Link>
            </div>

            {/* Quick Assurance Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <Network className="w-4 h-4 text-[#171F2C] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">Broad Collaboration</span>
              </div>
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">
                  Verified Counterparties
                </span>
              </div>
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <Handshake className="w-4 h-4 text-[#F97316] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">Structured Alignment</span>
              </div>
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex items-center gap-2.5">
                <Target className="w-4 h-4 text-[#171F2C] shrink-0" />
                <span className="text-xs font-semibold text-[#171F2C]">Opportunity-First</span>
              </div>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHAT IS A B2B PARTNERSHIP NETWORK?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>01</span>
                <span>•</span>
                <span>Definition &amp; Scope</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                What is a B2B Partnership Network?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  A <strong>B2B partnership network</strong> is a collaborative business ecosystem
                  that connects independent commercial organizations to create shared market value.
                  Rather than relying exclusively on internal hiring, massive marketing spend, or
                  unilateral direct sales, businesses within a partnership network leverage each
                  other&apos;s strengths to expand market reach, enhance client delivery, and unlock
                  new revenue streams.
                </p>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Importantly, a partnership network encompasses far more than simple referral
                  swaps. It includes technical product integrations, agency implementation networks,
                  reseller and distributor ecosystems, co-marketing alliances, and joint venture
                  co-selling.
                </p>
              </div>

              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Strategic Value
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">Beyond Lead Generation</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Partnerships create durable commercial infrastructure. When two businesses align
                    on complementary value, each partner gains access to vetted enterprise accounts
                    with established trust.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#171F2C]">
                  Collaborative Scale • Shared Distribution
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHY BUSINESSES BUILD PARTNERSHIPS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>02</span>
                <span>•</span>
                <span>Commercial Objectives</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Why Businesses Build Commercial Partnerships
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Modern B2B enterprises leverage partnerships to solve six critical operational and
                go-to-market challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Users className="w-4 h-4 text-[#F97316]" />
                  <span>1. Reach New Customer Segments</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Access buyer personas, industries, or enterprise tiers that are difficult or
                  expensive to penetrate through standard outbound marketing.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Layers className="w-4 h-4 text-[#171F2C]" />
                  <span>2. Add Complementary Capabilities</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Deliver comprehensive client solutions by pairing your core domain with
                  specialized technical, legal, or creative partners without building in-house
                  teams.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Briefcase className="w-4 h-4 text-[#171F2C]" />
                  <span>3. Create Bundled Offerings</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Combine software platforms with implementation services or strategy consulting to
                  package high-margin, end-to-end turnkey packages.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Compass className="w-4 h-4 text-[#171F2C]" />
                  <span>4. Enter New Geographic Markets</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Partner with regional distributors, agencies, or local operators who understand
                  local regulations, language nuances, and enterprise buying dynamics.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <Cpu className="w-4 h-4 text-[#171F2C]" />
                  <span>5. Improve Delivery Capacity</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Scale project volume and handle overflow demand by routing unfulfilled contracts
                  to trusted delivery partners under subcontracting agreements.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                  <TrendingUp className="w-4 h-4 text-[#059669]" />
                  <span>6. Generate Inbound Deal Flow</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Create recurring pipelines of high-intent customer introductions originating from
                  partners who encounter client problems outside their scope.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: TYPES OF B2B PARTNERSHIPS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>03</span>
                <span>•</span>
                <span>Taxonomy &amp; Framework</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Types of B2B Commercial Partnerships
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                B2B partnerships take multiple operational forms depending on whether the
                relationship centers on client introductions, joint selling, technology
                connectivity, or channel reach.
              </p>
            </div>

            <div className="space-y-4">
              {/* Type 1: Referral */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Type 1
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">Referral Partnerships</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    One business introduces relevant commercial opportunities to another under
                    defined qualification criteria and agreed compensation or reciprocal deal terms.
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <Link
                      to="/b2b-referral-network"
                      className="font-semibold text-[#171F2C] hover:underline flex items-center gap-1"
                    >
                      <span>Referral Network Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[#CBD5E1]">•</span>
                    <Link
                      to="/referral-partnerships"
                      className="text-[#64748B] hover:text-[#171F2C] hover:underline"
                    >
                      Structuring Referral Deals
                    </Link>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Primary Focus</span>
                  <span className="text-sm font-bold text-[#171F2C]">Client Introductions</span>
                </div>
              </div>

              {/* Type 2: Technology & Integration */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Type 2
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">
                      Technology &amp; Integration Partnerships
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Two software products, platforms, or technical architectures integrate their
                    systems to deliver seamless data flow, joint functionality, and shared customer
                    retention.
                  </p>
                  <p className="text-[11px] font-mono text-[#334155]">
                    <strong>Example:</strong> A B2B billing engine integrating with an enterprise
                    CRM to synchronize account invoices.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Primary Focus</span>
                  <span className="text-sm font-bold text-[#171F2C]">
                    Technical Interoperability
                  </span>
                </div>
              </div>

              {/* Type 3: Co-Selling */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Type 3
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">
                      Co-Selling &amp; Joint Bidding
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Two independent businesses collaborate to pitch, bid on, and win shared
                    enterprise contracts, presenting a unified solution while contracting
                    independently or via joint venture.
                  </p>
                  <p className="text-[11px] font-mono text-[#334155]">
                    <strong>Example:</strong> A strategy consulting firm and a cloud software
                    development agency pitching an enterprise digital transformation RFP together.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Primary Focus</span>
                  <span className="text-sm font-bold text-[#171F2C]">Joint Account Pursuit</span>
                </div>
              </div>

              {/* Type 4: Channel Partnerships */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Type 4
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">Channel Partnerships</h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A company leverages another organization&apos;s established sales, agency, or
                    consultative channel infrastructure to distribute and resell its products or
                    services.
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/channel-partnerships"
                      className="font-semibold text-xs text-[#171F2C] hover:underline flex items-center gap-1"
                    >
                      <span>Explore Channel Partnerships Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Primary Focus</span>
                  <span className="text-sm font-bold text-[#171F2C]">Channel Selling</span>
                </div>
              </div>

              {/* Type 5: Distribution Partnerships */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Type 5
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">
                      Distribution Partnerships
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A commercial agreement where a specialized distributor, value-added reseller
                    (VAR), or intermediary manages the physical or digital pipeline into specific
                    markets or reseller networks.
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/distribution-partners"
                      className="font-semibold text-xs text-[#171F2C] hover:underline flex items-center gap-1"
                    >
                      <span>Explore Distribution Partners Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Primary Focus</span>
                  <span className="text-sm font-bold text-[#171F2C]">
                    Market &amp; Territory Reach
                  </span>
                </div>
              </div>

              {/* Type 6: Strategic Alliances */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                      Type 6
                    </span>
                    <h3 className="text-base font-bold text-[#171F2C]">
                      Strategic Alliances &amp; Joint Offerings
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    High-level, executive collaborations involving joint IP development, shared
                    go-to-market budgets, co-branded market studies, and long-term industry
                    alignment.
                  </p>
                  <p className="text-[11px] font-mono text-[#334155]">
                    <strong>Example:</strong> An AI infrastructure provider co-authoring specialized
                    vertical models with a global healthcare advisory group.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#64748B] block">Primary Focus</span>
                  <span className="text-sm font-bold text-[#171F2C]">
                    Long-Term Market Development
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: WHAT MAKES A GOOD B2B PARTNER?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>04</span>
                <span>•</span>
                <span>Partner Fit Principles</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                What Makes a Good B2B Partner?
              </h2>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                    <Users className="w-4 h-4 text-[#F97316]" />
                    <span>Customer Overlap</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    They sell to the exact same executive buyer persona without offering overlapping
                    or competing services.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                    <Layers className="w-4 h-4 text-[#171F2C]" />
                    <span>Complementarity</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Their product or deliverable seamlessly bridges a gap in your client workflow,
                    enhancing overall client satisfaction.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                    <ShieldCheck className="w-4 h-4 text-[#059669]" />
                    <span>Reputation &amp; Trust</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    They maintain proven client case references, enterprise-grade delivery
                    standards, and uncompromising integrity.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171F2C]">
                    <Scale className="w-4 h-4 text-[#171F2C]" />
                    <span>Clear Incentives</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Both parties understand the commercial rationale and maintain mutual incentives
                    to actively nurture the collaboration.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: TAXONOMY COMPARISON TABLE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>05</span>
                <span>•</span>
                <span>Taxonomy Matrix</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Partnership vs. Referral vs. Channel vs. Distribution
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                While industry terminology is sometimes used informally, each commercial model
                serves a distinct operational function.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="p-4 font-mono font-bold uppercase text-[#171F2C]">Model</th>
                    <th className="p-4 font-mono font-bold uppercase text-[#171F2C]">
                      Main Purpose
                    </th>
                    <th className="p-4 font-mono font-bold uppercase text-[#171F2C]">
                      Core Mechanism
                    </th>
                    <th className="p-4 font-mono font-bold uppercase text-[#171F2C]">
                      Primary Asset
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                  <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#171F2C]">Referral</td>
                    <td className="p-4">Introduce an opportunity</td>
                    <td className="p-4">Lead handoff &amp; attribution</td>
                    <td className="p-4">Client trust &amp; timing</td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#171F2C]">Partnership</td>
                    <td className="p-4">Collaborate commercially</td>
                    <td className="p-4">Co-selling, joint delivery, tech integration</td>
                    <td className="p-4">Complementary capabilities</td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#171F2C]">Channel</td>
                    <td className="p-4">Help sell / reach buyers</td>
                    <td className="p-4">Reseller, agency, or consultative sales</td>
                    <td className="p-4">Sales &amp; consulting reach</td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#171F2C]">Distribution</td>
                    <td className="p-4">Move products/services into markets</td>
                    <td className="p-4">Wholesale, territory rights, logistics</td>
                    <td className="p-4">Regional &amp; market infrastructure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: HOW A PARTNERSHIP OPPORTUNITY BEGINS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>06</span>
                <span>•</span>
                <span>The Partnership Lifecycle</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                How a B2B Partnership Opportunity Begins
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                Partnership opportunities can originate from active client demand rather than
                unsolicited outreach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-xs font-mono font-bold text-[#F97316]">Phase 1</span>
                <h3 className="text-sm font-bold text-[#171F2C]">Opportunity Surfaces</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  A business encounters an unfulfilled client need, a joint RFP requirement, or a
                  market expansion scenario requiring external capabilities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-xs font-mono font-bold text-[#F97316]">Phase 2</span>
                <h3 className="text-sm font-bold text-[#171F2C]">Partner Discovers Need</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  A complementary provider discovers the requirement, evaluates the scope, and
                  expresses interest with their proven domain credentials.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-xs font-mono font-bold text-[#F97316]">Phase 3</span>
                <h3 className="text-sm font-bold text-[#171F2C]">Commercial Discussion</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Executives discuss scope boundaries, operational responsibilities, delivery SLAs,
                  and commercial split terms.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-xs font-mono font-bold text-[#F97316]">Phase 4</span>
                <h3 className="text-sm font-bold text-[#171F2C]">Agreement Lock</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Terms are formalized in a structured deal memo covering attribution, client
                  ownership, and milestone deliverables.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-xs font-mono font-bold text-[#F97316]">Phase 5</span>
                <h3 className="text-sm font-bold text-[#171F2C]">Client Handshake</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  With client consent secured, the counterparties execute a warm introduction and
                  commence collaborative execution.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2">
                <span className="text-xs font-mono font-bold text-[#F97316]">Phase 6</span>
                <h3 className="text-sm font-bold text-[#171F2C]">Ongoing Collaboration</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Successful execution creates a trusted channel for continuous, reciprocal dealflow
                  across future enterprise accounts.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: EXAMPLES OF B2B PARTNERSHIP MODELS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>07</span>
                <span>•</span>
                <span>Practical Case Models</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Examples of B2B Partnership Models in Practice
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-[4px]">
                    SaaS &amp; SI Firm
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Platform &amp; Certified Integrator
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    An enterprise analytics SaaS platform partners with certified systems
                    integrators. The SaaS company closes software subscriptions while the integrator
                    sells multi-month data onboarding services.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#334155]">
                  Software Retention + Professional Services Revenue
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#059669] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-[4px]">
                    Agency &amp; Tech
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Marketing Agency &amp; CRM Platform
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A performance growth agency partners with a marketing automation platform. The
                    agency bundles the software into its retainer deliverables, creating sticky
                    recurring client setups.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#059669]">
                  Co-Marketing &amp; Tiered Client Value
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#F97316] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-[4px]">
                    Channel Expansion
                  </span>
                  <h3 className="text-base font-bold text-[#171F2C]">
                    Product Company &amp; Regional VAR
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A cybersecurity software developer partners with regional Value-Added Resellers
                    (VARs) in the DACH region, leveraging their existing enterprise relationships
                    and localized compliance expertise.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#334155]">
                  Regional Market Penetration with Zero Local Overhead
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: HOW BUSINESSES EVALUATE PARTNERSHIP OPPORTUNITIES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>08</span>
                <span>•</span>
                <span>Evaluation Checklist</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                How Businesses Evaluate Partnership Opportunities
              </h2>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
              <p className="text-sm text-[#334155] leading-relaxed">
                Before entering an ongoing partnership, executive teams ask seven fundamental
                commercial questions:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs text-[#334155]">
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <strong>1. Target Buyer Reach:</strong> Does the potential partner have active,
                  trusted relationships with the decision-makers you want to reach?
                </div>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <strong>2. Capability Complementarity:</strong> Do your combined offerings create
                  a distinct, compelling advantage for the end customer?
                </div>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <strong>3. Tangible Commercial Need:</strong> Is there a live, active customer
                  opportunity or demand scenario driving this partnership today?
                </div>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <strong>4. Account Ownership Boundaries:</strong> Is it clear who manages the
                  primary client relationship and contracts the client?
                </div>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <strong>5. Equitable Contribution:</strong> What does each organization contribute
                  in terms of domain expertise, sales effort, or delivery resources?
                </div>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <strong>6. Success Metrics:</strong> How will both parties measure success (e.g.,
                  closed revenue, joint accounts won, reciprocal volume)?
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: WHERE THE RELAY FITS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>09</span>
                <span>•</span>
                <span>The Opportunity-First Model</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                Where The Relay Fits in Partnership Discovery
              </h2>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
              <p className="text-sm text-[#334155] leading-relaxed">
                Traditional partnership discovery typically begins with a broad, speculative search
                for companies, followed by dozens of introductory calls trying to invent a
                theoretical reason to collaborate.
              </p>
              <p className="text-sm text-[#334155] leading-relaxed">
                <strong>
                  The Relay reverses this dynamic by placing live commercial opportunities at the
                  center of discovery.
                </strong>{" "}
                When a business originates a requirement—such as an out-of-scope enterprise lead, a
                regional distribution need, or a joint co-pitch scenario—counterparties evaluate
                mutual fit based on a tangible, active commercial transaction.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/b2b-opportunity-exchange"
                  className="px-3.5 py-2 rounded-[4px] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#171F2C] transition-colors"
                >
                  Opportunity Exchange Hub
                </Link>
                <Link
                  to="/channel-partnerships"
                  className="px-3.5 py-2 rounded-[4px] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#171F2C] transition-colors"
                >
                  Channel Partnerships
                </Link>
                <Link
                  to="/distribution-partners"
                  className="px-3.5 py-2 rounded-[4px] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#171F2C] transition-colors"
                >
                  Distribution Partners
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: FREQUENTLY ASKED QUESTIONS (CRAWLER-FRIENDLY DOM)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span>10</span>
                <span>•</span>
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-tight">
                B2B Partnership Network FAQ
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
              SECTION 12: FINAL CTA & CLUSTER NAVIGATION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-8 pt-4">
            {/* CTA Box */}
            <div className="bg-[#171F2C] text-white rounded-[4px] p-8 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
              <div className="max-w-2xl space-y-3 relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F97316]">
                  Verified B2B Collaboration
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Discover Strategic Commercial Partners on The Relay
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  Join verified executive operators discovering high-intent partnership
                  requirements, aligning on commercial parameters, and building profitable
                  collaborative channels.
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
                  Post a Partnership Opportunity
                </Link>
              </div>
            </div>

            {/* Cluster Navigation Grid */}
            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                B2B Partnership &amp; Channel Ecosystem
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
                  to="/channel-partnerships"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>Channel Partnerships Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#171F2C]" />
                </Link>
                <Link
                  to="/distribution-partners"
                  className="p-3.5 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] rounded-[4px] text-xs text-[#171F2C] font-semibold transition-all hover:border-[#171F2C] flex items-center justify-between group"
                >
                  <span>Distribution Partners Hub</span>
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
