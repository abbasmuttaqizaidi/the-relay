import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
  Check,
  CheckCircle2,
  ChevronDown,
  Building2,
  Layers,
  ShieldCheck,
  Lock,
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
  Percent,
  CheckSquare2,
  Workflow,
  Globe,
  Truck,
  Box,
  FileText,
  AlertCircle,
  Target,
  BarChart3,
  Server,
  Warehouse,
  Package,
  Layers3,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/distribution-partners")({
  head: () =>
    createSeoMeta({
      title: "B2B Distribution Partners — Find Distribution Partners | The Relay",
      description:
        "Find B2B distribution partners that can help expand your product or service into new markets, territories and reseller networks. Explore distribution opportunities on The Relay.",
      path: "/distribution-partners",
    }),
  component: DistributionPartnersPage,
});

export function DistributionPartnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a B2B distribution partner?",
      a: "A B2B distribution partner is a commercial intermediary that helps a company take its products or services into new geographic markets, vertical industries, or downstream reseller networks through established distribution infrastructure, trade relationships, and localized market presence.",
    },
    {
      q: "What does a distribution partner do?",
      a: "Depending on the industry and commercial model, a distribution partner may provide downstream reseller network access, territory market coverage, centralized ordering and inventory management, local customer credit facilities, regional logistics, technical pre-sales support, and localized partner enablement.",
    },
    {
      q: "What is the difference between a distributor and a reseller?",
      a: "A reseller typically buys a product or service to sell directly to the end business buyer. In contrast, a distributor operates as an intermediary that supplies and supports a broader network of downstream resellers, dealers, or regional accounts across a defined territory.",
    },
    {
      q: "What is the difference between a distributor and a referral partner?",
      a: "A referral partner introduces specific individual customer leads in exchange for a referral fee, without holding inventory, managing billing, or executing sales. A distribution partner provides structural market access, commercial infrastructure, and ongoing channel representation.",
    },
    {
      q: "How do businesses find B2B distribution partners on The Relay?",
      a: "Businesses post structured distribution requirements detailing target territories, product categories, reseller criteria, and commercial models. Verified regional and vertical distributors discover these listings on The Relay, signal bilateral interest, discuss commercial terms, and establish a direct partnership.",
    },
    {
      q: "What should businesses evaluate before choosing a distributor?",
      a: "Key evaluation criteria include verified market coverage in the target territory, the quality and breadth of their downstream reseller network, existing customer access, operational and logistics capabilities, technical support bench, sell-through reporting visibility, and product category alignment.",
    },
    {
      q: "What should a B2B distribution agreement define?",
      a: "A comprehensive distribution agreement should define geographic or vertical territory boundaries, wholesale pricing and margin structures, minimum volume commitments, inventory and ordering procedures, payment and credit terms, technical support responsibilities, co-marketing expectations, reporting cadences, and termination clauses.",
    },
    {
      q: "Does The Relay manage inventory, logistics, or payment collection?",
      a: "No. The Relay operates strictly as an opportunity exchange and counterpart discovery layer. Operational execution—such as inventory dispatch, physical warehousing, localized fulfillment, invoicing, and contract governance—remains managed directly between the participating commercial entities.",
    },
    {
      q: "Can distribution partnerships be territory-specific or exclusive?",
      a: "Yes. Distribution partnerships are frequently structured around specific geographic territories (e.g., North America, DACH region, APAC) or specialized industry verticals, with exclusivity or non-exclusivity negotiated directly between the principal companies based on volume commitments.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/distribution-partners#webpage`,
        url: `${SITE_URL}/distribution-partners`,
        name: "B2B Distribution Partners — Find Distribution Partners | The Relay",
        description:
          "Find B2B distribution partners that can help expand your product or service into new markets, territories and reseller networks. Explore distribution opportunities on The Relay.",
        breadcrumb: {
          "@id": `${SITE_URL}/distribution-partners#breadcrumb`,
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
        "@id": `${SITE_URL}/distribution-partners#breadcrumb`,
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
            name: "B2B Partnership Network",
            item: `${SITE_URL}/b2b-partnership-network`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Distribution Partners",
            item: `${SITE_URL}/distribution-partners`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/distribution-partners#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
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
    <div className="min-h-screen bg-white text-[#171F2C] font-sans antialiased selection:bg-[#000000] selection:text-white flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full flex-1 pt-6 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
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
                <Link
                  to="/b2b-partnership-network"
                  className="hover:text-[#171F2C] transition-colors"
                >
                  B2B Partnership Network
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">Distribution Partners</li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#000000]"></span>
                  Market Expansion & Distribution Infrastructure
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-4">
                  Find B2B Distribution Partners for New Markets and Channels
                </h1>

                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    A competitive product can still struggle to scale when a company lacks the local
                    sales relationships, downstream reseller network, or market infrastructure
                    required to penetrate a new territory.
                  </p>
                  <p className="text-[#334155]">
                    The Relay connects product companies, SaaS providers, and manufacturers with
                    verified regional and vertical distributors ready to expand commercial reach
                    through structured, opportunity-led discovery.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-5 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#171F2C] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] transition-colors"
                  >
                    Explore Distribution Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors"
                  >
                    Post Distribution Requirement
                  </Link>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#64748B]">
                  <span>Regional Distributors</span>
                  <span>•</span>
                  <span>Master Distributors</span>
                  <span>•</span>
                  <span>Reseller Networks</span>
                  <span>•</span>
                  <span>Territory Channels</span>
                </div>
              </div>

              {/* Visual Column: Two-Tier Distribution Architecture (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Two-Tier Distribution Model
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">DIST-ARCH-01</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        tier: "01",
                        title: "Product Principal / Vendor",
                        desc: "Core software, hardware, or specialized manufacturing firm",
                        active: false,
                      },
                      {
                        tier: "02",
                        title: "Distribution Partner (Tier 1)",
                        desc: "Territory access, credit, logistics, and wholesale enablement",
                        active: true,
                      },
                      {
                        tier: "03",
                        title: "Downstream Reseller Network (Tier 2)",
                        desc: "Regional VARs, MSPs, dealers, and local solution providers",
                        active: false,
                      },
                      {
                        tier: "04",
                        title: "End Business Buyers",
                        desc: "Enterprise, mid-market, and institutional customer accounts",
                        active: false,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-[4px] border transition-colors",
                          item.active
                            ? "bg-[#000000] text-white border-[#000000]"
                            : "bg-[#F8FAFC] border-[#E2E8F0] text-[#171F2C]",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "w-6 h-6 rounded-[2px] flex items-center justify-center font-mono text-[11px] font-bold shrink-0",
                                item.active
                                  ? "bg-white text-[#000000]"
                                  : "bg-white border border-[#E2E8F0] text-[#171F2C]",
                              )}
                            >
                              {item.tier}
                            </span>
                            <div>
                              <div
                                className={cn(
                                  "text-[13px] font-semibold",
                                  item.active ? "text-white" : "text-[#171F2C]",
                                )}
                              >
                                {item.title}
                              </div>
                              <div
                                className={cn(
                                  "text-xs truncate max-w-[220px]",
                                  item.active ? "text-slate-300" : "text-[#64748B]",
                                )}
                              >
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          {item.active && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Opportunity discovery layer for commercial distribution scale.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHAT IS A B2B DISTRIBUTION PARTNER?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Core Definition
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What is a B2B Distribution Partner?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A B2B distribution partner acts as an intermediary commercial organization that
                facilitates the sale, movement, and market penetration of products or services into
                defined geographic territories or vertical segments. Unlike single resellers,
                distributors typically aggregate demand, support downstream reseller networks, and
                provide operational infrastructure:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Downstream Reseller Network",
                  desc: "Established relationships with dozens or hundreds of local VARs, MSPs, system integrators, and independent software vendors.",
                  icon: Network,
                },
                {
                  title: "Territory Market Access",
                  desc: "Deep commercial standing, regulatory compliance clearances, and localized buyer trust across specific regional markets.",
                  icon: Globe,
                },
                {
                  title: "Commercial Order Infrastructure",
                  desc: "Streamlined procurement systems handling centralized billing, currency settlement, order routing, and subscription management.",
                  icon: Warehouse,
                },
                {
                  title: "Credit & Financing Facilities",
                  desc: "Providing working capital credit lines and flexible payment terms to downstream resellers, reducing vendor credit risk.",
                  icon: Coins,
                },
                {
                  title: "Logistics & Physical Supply",
                  desc: "Warehousing, inventory staging, regional dispatch, and customs clearance for hardware, equipment, and packaged goods.",
                  icon: Truck,
                },
                {
                  title: "Partner Enablement & Training",
                  desc: "Conducting technical pre-sales briefings, product certifications, and sales training for downstream channel teams.",
                  icon: Workflow,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs hover:border-[#CBD5E1] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#171F2C] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: WHY BUSINESSES USE DISTRIBUTION PARTNERS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Strategic Drivers
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why Businesses Build Distribution Partnerships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Partnering with established distributors allows vendors to scale indirect sales
                while mitigating operational and overhead complexity:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  title: "Enter New Geographic Territories",
                  desc: "Penetrate international markets and regions without setting up local legal subsidiaries, tax registrations, or foreign sales offices.",
                },
                {
                  num: "02",
                  title: "Access Downstream Reseller Ecosystems",
                  desc: "Gain immediate access to an active network of certified VARs, MSPs, and dealers who regularly purchase through the distributor.",
                },
                {
                  num: "03",
                  title: "Consolidate Channel Complexity",
                  desc: "Manage a single distribution account contract and unified invoice rather than negotiating hundreds of disparate small reseller agreements.",
                },
                {
                  num: "04",
                  title: "Leverage Existing Commercial Trust",
                  desc: "Benefit from the long-standing procurement master agreements that regional enterprise buyers already maintain with established distributors.",
                },
                {
                  num: "05",
                  title: "Extend Localized Pre-Sales Coverage",
                  desc: "Rely on the distributor’s regional sales engineers to conduct demonstrations, RFPs, and customer architectural briefings in local timezones.",
                },
                {
                  num: "06",
                  title: "Support Rapid Volume Growth",
                  desc: "Scale order processing, inventory buffering, and multi-tier channel distribution smoothly as market demand accelerates.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2"
                >
                  <div className="text-[11px] font-mono font-bold text-[#64748B]">{item.num}</div>
                  <h3 className="text-[15px] font-semibold text-[#171F2C]">{item.title}</h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: TYPES OF DISTRIBUTION RELATIONSHIPS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Distribution Typology
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Types of B2B Distribution Relationships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Distribution relationships vary by product complexity, physical vs digital supply
                chains, and channel hierarchy:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Type 1: Regional Distributor */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    TERRITORY FOCUS
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Regional Distributor
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Focuses on a defined geographical territory (e.g. Western Europe, Southeast
                    Asia, Latin America) where they manage localized reseller channels and client
                    procurement.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Role: Regional market penetration & localization
                </div>
              </div>

              {/* Type 2: Master Distributor */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    PRIMARY INTERMEDIARY
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Master Distributor
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Holds comprehensive distribution rights for a broad market or nation, managing
                    sub-distributors, wholesale partners, and regional dealer tiers on the vendor’s
                    behalf.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Role: National channel hierarchy & wholesale governance
                </div>
              </div>

              {/* Type 3: Wholesale Distributor */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    BULK SUPPLY & INVENTORY
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Wholesale Distributor
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Purchases equipment, hardware, or inventory in high volume, maintains buffer
                    stock in regional warehouses, and handles fulfillment to commercial accounts.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Role: Volume purchasing, inventory & physical fulfillment
                </div>
              </div>

              {/* Type 4: Specialized / Vertical Distributor */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    INDUSTRY DOMAIN
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Vertical / Specialized Distributor
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Operates strictly within specialized sectors such as healthcare, defense,
                    industrial automation, or fintech, where specialized certifications are
                    mandatory.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Role: Domain compliance, specialized vetting & niche reach
                </div>
              </div>

              {/* Type 5: Technology Distributor */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    CLOUD & SOFTWARE AGGREGATION
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Technology & Cloud Distributor
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Aggregates software licenses, SaaS subscriptions, and cloud marketplace bundles,
                    providing automated billing and digital provisioning to MSPs and resellers.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Role: Digital provisioning & automated billing aggregation
                </div>
              </div>

              {/* Type 6: Two-Tier Distribution */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    MULTI-TIER CHANNEL
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Two-Tier Distribution Structure
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    The vendor sells strictly to distributors (Tier 1), who in turn sell to
                    resellers and integrators (Tier 2), who package the final solution for end
                    buyers.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Role: Structural separation of supply and retail delivery
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: DISTRIBUTOR VS RESELLER VS REFERRAL VS CHANNEL PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Comparative Taxonomy
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Distributor vs. Reseller vs. Referral Partner vs. Channel Partner
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Understanding where each partnership model sits within the commercial landscape
                ensures clear boundaries across your go-to-market strategy:
              </p>
            </div>

            <div className="overflow-x-auto border border-[#E2E8F0] rounded-[4px] bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                    <th className="p-4 sm:p-5">Relationship Type</th>
                    <th className="p-4 sm:p-5">Primary Commercial Role</th>
                    <th className="p-4 sm:p-5">Customer Interaction</th>
                    <th className="p-4 sm:p-5">Dedicated Page</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">Referral Partner</td>
                    <td className="p-4 sm:p-5">
                      Introduces an individual customer lead or commercial requirement in exchange
                      for an agreed fee.
                    </td>
                    <td className="p-4 sm:p-5">
                      Initial introduction only; vendor owns sales and delivery.
                    </td>
                    <td className="p-4 sm:p-5">
                      <Link
                        to="/referral-partnerships"
                        className="font-mono text-[11px] font-bold text-[#171F2C] underline hover:text-[#64748B]"
                      >
                        /referral-partnerships →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">Reseller</td>
                    <td className="p-4 sm:p-5">
                      Purchases products/services at wholesale discount to resell directly to end
                      customers.
                    </td>
                    <td className="p-4 sm:p-5">Direct customer relationship & sales contract.</td>
                    <td className="p-4 sm:p-5">
                      <Link
                        to="/channel-partnerships"
                        className="font-mono text-[11px] font-bold text-[#171F2C] underline hover:text-[#64748B]"
                      >
                        /channel-partnerships →
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">Channel Partner</td>
                    <td className="p-4 sm:p-5">
                      Broader indirect go-to-market relationship (VAR, SI, MSP) involving bundling,
                      customization, or delivery.
                    </td>
                    <td className="p-4 sm:p-5">
                      High-touch solution design, installation, and ongoing support.
                    </td>
                    <td className="p-4 sm:p-5">
                      <Link
                        to="/channel-partnerships"
                        className="font-mono text-[11px] font-bold text-[#171F2C] underline hover:text-[#64748B]"
                      >
                        /channel-partnerships →
                      </Link>
                    </td>
                  </tr>
                  <tr className="bg-[#F8FAFC]/50">
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">
                      Distribution Partner
                    </td>
                    <td className="p-4 sm:p-5">
                      Supplies and supports downstream reseller networks and manages territory
                      market access infrastructure.
                    </td>
                    <td className="p-4 sm:p-5">
                      Intermediary engagement with resellers, dealers, and territory channels.
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-[11px] font-bold text-[#171F2C]">
                      /distribution-partners (Current Page)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-[#64748B]">
              Note: Industry terminology can vary by sector and region. The Relay provides
              opportunity-led discovery across all these relationship structures.
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: HOW TO EVALUATE A DISTRIBUTION PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Qualification Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Evaluate a Potential Distribution Partner
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before granting distribution rights, thoroughly evaluate prospective counterparties
                across core operational dimensions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Territory Market Coverage",
                  desc: "Verify active commercial coverage and established account relationships in the specific geographic territory you are targeting.",
                },
                {
                  title: "Downstream Reseller Network",
                  desc: "Assess the number, tier levels, and technical certifications of the active resellers regularly purchasing from them.",
                },
                {
                  title: "End-Customer Access",
                  desc: "Determine whether their downstream accounts already serve your target enterprise, mid-market, or institutional buyer profiles.",
                },
                {
                  title: "Commercial Economics & Margins",
                  desc: "Review wholesale discount expectations, downstream margins, and credit terms to ensure mutual long-term viability.",
                },
                {
                  title: "Operational & Logistics Capacity",
                  desc: "Evaluate physical warehousing, customs handling, automated digital provisioning, and fulfillment responsiveness.",
                },
                {
                  title: "Technical Pre-Sales Support",
                  desc: "Examine whether their internal engineering team can conduct demonstrations, technical briefings, and RFP responses.",
                },
                {
                  title: "Sell-Through Reporting Visibility",
                  desc: "Confirm their willingness and systems capability to provide periodic sell-through data and point-of-sale reporting.",
                },
                {
                  title: "Product & Category Alignment",
                  desc: "Ensure your offering complements—rather than directly competes with—their existing master vendor lines.",
                },
                {
                  title: "Marketing & Demand Generation",
                  desc: "Check their proactive channel marketing programs, webinar cadences, and co-op marketing fund administration.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2"
                >
                  <div className="text-[11px] font-mono font-bold text-[#171F2C]">
                    CRITERIA 0{idx + 1}
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#171F2C]">{item.title}</h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: WHAT A DISTRIBUTION AGREEMENT MAY DEFINE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Contractual Topics
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What a B2B Distribution Agreement May Define
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Commercial agreements between vendors and distributors typically address several
                operational and financial terms:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: "Defined Territory & Market Scope",
                  detail:
                    "Precise geographic countries, states, or vertical industry segments granted under the agreement.",
                },
                {
                  label: "Exclusivity vs. Non-Exclusivity",
                  detail:
                    "Whether the distributor holds sole territory rights or shares representation with other authorized partners.",
                },
                {
                  label: "Wholesale Pricing & Margins",
                  detail:
                    "Structured wholesale discounts, volume rebate tiers, and currency settlement schedules.",
                },
                {
                  label: "Minimum Volume Commitments",
                  detail:
                    "Annual or quarterly revenue quotas required to maintain active distributor standing or territory rights.",
                },
                {
                  label: "Inventory & Stocking Terms",
                  detail:
                    "Buffer stock requirements, return policies, RMA handling, and obsolescence protection.",
                },
                {
                  label: "Ordering & Payment Procedures",
                  detail:
                    "Net payment windows, credit lines, currency conversion, and purchase order mechanics.",
                },
                {
                  label: "Technical Support Obligations",
                  detail:
                    "Division of responsibilities for Tier-1 vs Tier-2 partner support and warranty handling.",
                },
                {
                  label: "Sell-Through Reporting & Data",
                  detail:
                    "Required frequency and detail for point-of-sale data, account attribution, and pipeline reporting.",
                },
                {
                  label: "Marketing & Co-Op Advertising",
                  detail:
                    "Joint marketing funds, logo usage rights, and localized campaign responsibilities.",
                },
                {
                  label: "Intellectual Property Rights",
                  detail:
                    "Clear protections governing trademark usage, proprietary software, and trade secrets.",
                },
                {
                  label: "Term & Termination Governance",
                  detail:
                    "Notice periods, cause conditions, and transition handling for existing downstream customer accounts.",
                },
                {
                  label: "Compliance & Local Regulations",
                  detail:
                    "Adherence to export controls, anti-bribery regulations, and regional data privacy standards.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                    <h3 className="text-xs sm:text-[13px] font-semibold text-[#171F2C]">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed pl-3.5">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: WHEN A DISTRIBUTOR IS THE WRONG PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Strategic Boundary
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                When a Distributor is Not the Right Partner
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Distribution is not a universal fit for every B2B sales motion. A distribution model
                may be inappropriate when:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "You Need a Discrete Opportunity Introduction",
                  desc: "If your goal is simply connecting with a specific target enterprise buyer for a single deal, an introduction via a referral partner is far more direct and cost-effective than a formal distribution agreement.",
                  alt: "Better Model: B2B Referral Partner",
                  link: "/referral-partnerships",
                },
                {
                  title: "Your Product Requires Deep Custom Implementation",
                  desc: "Highly tailored software requiring weeks of on-site engineering, database migration, and custom API development is better served by specialized Systems Integrators (SIs) or VARs than high-volume distributors.",
                  alt: "Better Model: Value-Added Reseller or Systems Integrator",
                  link: "/channel-partnerships",
                },
                {
                  title: "You Require Direct Enterprise Co-Selling",
                  desc: "When pitching multi-million-dollar executive transformation deals alongside a complementary software vendor, a bilateral co-selling alliance provides tighter alignment than an intermediary distributor.",
                  alt: "Better Model: Strategic Alliance / Co-Selling",
                  link: "/b2b-partnership-network",
                },
                {
                  title: "Your Unit Economics Cannot Support Two-Tier Margins",
                  desc: "If product gross margins cannot accommodate both a distributor wholesale discount and a downstream reseller margin, a direct-to-reseller or direct-to-buyer sales model may be required.",
                  alt: "Better Model: Direct Channel Sales",
                  link: "/channel-partnerships",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-700">
                      <XCircle className="w-4 h-4" />
                      <h3 className="text-sm font-semibold text-[#171F2C]">{item.title}</h3>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0]">
                    <Link
                      to={item.link}
                      className="text-xs font-mono font-semibold text-[#171F2C] hover:underline flex items-center gap-1"
                    >
                      {item.alt} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: HOW DISTRIBUTION BEGINS ON THE RELAY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Platform Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How Distribution Opportunities Start on The Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Rather than cold outreach or high-friction trade shows, The Relay facilitates
                opportunity-first discovery where verified commercial needs initiate the dialogue:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  step: "01",
                  title: "Define Market Requirement",
                  desc: "A verified business posts a structured distribution requirement detailing target geography, product category, and channel model.",
                },
                {
                  step: "02",
                  title: "Discover Potential Counterparties",
                  desc: "Qualified regional distributors and master channels filter opportunities by territory, domain, and commercial specifications.",
                },
                {
                  step: "03",
                  title: "Express Bilateral Interest",
                  desc: "The interested distributor reviews sanitized parameters and formally signals interest to initiate commercial dialogue.",
                },
                {
                  step: "04",
                  title: "Discuss Commercial Alignment",
                  desc: "Both verified entities evaluate territory coverage, reseller network strength, margin expectations, and technical fit.",
                },
                {
                  step: "05",
                  title: "Agree on Partnership Terms",
                  desc: "The parties align on territory rights, minimum commitments, wholesale pricing, and ongoing support responsibilities.",
                },
                {
                  step: "06",
                  title: "Direct Operational Relationship",
                  desc: "Principals complete the discovery handshake and proceed directly into contract execution and localized go-to-market rollout.",
                },
              ].map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2 relative"
                >
                  <span className="text-xs font-mono font-bold text-[#171F2C]">STEP {st.step}</span>
                  <h3 className="text-[15px] font-semibold text-[#171F2C]">{st.title}</h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#64748B]">
              <span>Want to understand the complete transaction protocol across The Relay?</span>
              <Link
                to="/8-step-journey"
                className="font-mono font-semibold text-[#171F2C] hover:underline shrink-0 flex items-center gap-1"
              >
                View 8-Step Journey <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: REAL-WORLD DISTRIBUTION EXAMPLES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Real-World Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Examples of B2B Distribution Partnerships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Concrete collaboration models illustrating how companies scale through specialized
                distribution channels:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  type: "SaaS Vendor + Regional Technology Distributor",
                  scenario:
                    "A North American cybersecurity SaaS company partners with an established DACH-region technology distributor. The distributor manages local currency billing, GDPR compliance verification, and provisions cloud licenses through its existing network of 300+ regional MSPs.",
                },
                {
                  type: "Hardware Manufacturer + Wholesale Distributor",
                  scenario:
                    "An industrial sensor manufacturer partners with a national wholesale electrical distributor. The distributor maintains physical inventory across 12 regional warehouses, managing next-day delivery to local commercial contractors and industrial automation dealers.",
                },
                {
                  type: "Specialized Software + Vertical Reseller Distributor",
                  scenario:
                    "A dental practice management software company partners with a specialized healthcare supply distributor. The distributor bundles the software alongside clinical equipment, selling the unified package to newly opening dental clinics across the country.",
                },
                {
                  type: "B2B Product Company + Regional Master Channel",
                  scenario:
                    "A clean-tech industrial filtration manufacturer grants master distribution rights to an established APAC engineering group. The master distributor recruits, trains, and certifies sub-dealers across Japan, South Korea, and Australia.",
                },
              ].map((ex, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-mono font-bold text-[#171F2C] mb-1">
                      SCENARIO 0{idx + 1}
                    </div>
                    <h3 className="text-sm font-semibold text-[#171F2C] mb-2">{ex.type}</h3>
                    <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                      {ex.scenario}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#64748B]">
                    Structured Distribution Channel
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: WHERE THE RELAY FITS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                    Platform Scope & Positioning
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[#171F2C] tracking-tight">
                    The Relay is the Discovery Layer, Not the Logistics Operator
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                    The Relay helps businesses discover, qualify, and establish commercial
                    distribution relationships. Operational matters—including physical inventory
                    dispatch, warehousing, shipping logistics, customer billing, and contract
                    administration—remain managed directly between the participating commercial
                    entities.
                  </p>
                </div>
                <div className="lg:col-span-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-2 font-mono text-xs text-[#64748B]">
                  <div className="text-[11px] font-bold text-[#171F2C] uppercase tracking-wider">
                    Relay Capabilities:
                  </div>
                  <div>• Opportunity-led discovery</div>
                  <div>• Verified corporate counterparties</div>
                  <div>• Sanitized requirement posting</div>
                  <div>• Direct commercial progression</div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 13: CRAWLABLE FAQ ACCORDION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
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
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFC] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14px] font-semibold text-[#171F2C]">{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ml-3",
                          isOpen && "rotate-180 text-[#171F2C]",
                        )}
                      />
                    </button>
                    {/* Permanent DOM Rendering for SEO crawlers with visual toggle */}
                    <div
                      className={cn(
                        "px-4 pb-4 pt-1 text-[13px] text-[#64748B] border-t border-[#E2E8F0] leading-relaxed",
                        isOpen ? "block" : "hidden",
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
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto shadow-2xs">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                B2B Distribution Partners
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Scale into New Territories with Verified Distribution Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-8 leading-relaxed">
                Connect with established regional and vertical distributors to expand market access,
                downstream reseller coverage, and commercial volume on The Relay.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#171F2C] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] transition-colors"
                >
                  Explore Distribution Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors"
                >
                  Post Distribution Requirement
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
