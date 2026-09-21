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
  Truck,
  Box,
  Store,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/how-to-find-distribution-partners")({
  head: () =>
    createSeoMeta({
      title: "How to Find B2B Distribution Partners | The Relay",
      description:
        "Learn how to find B2B distribution partners by defining your market, sourcing candidates, evaluating coverage and capability, and testing commercial fit.",
      path: "/how-to-find-distribution-partners",
    }),
  component: HowToFindDistributionPartnersPage,
});

export function HowToFindDistributionPartnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I find a B2B distribution partner?",
      a: "Finding a B2B distribution partner involves defining your target territory and buyer profile, identifying candidate distributors through industry directories and partner networks, evaluating their verified market access and operational bench, aligning on commercial expectations, and testing the relationship through a controlled initial pilot.",
    },
    {
      q: "Where can I find distribution partners?",
      a: "Legitimate sourcing channels include industry trade associations, vertical vendor directories, referrals from complementary non-competing manufacturers, regional business trade events, direct market research into firms carrying complementary product lines, and B2B opportunity exchanges like The Relay.",
    },
    {
      q: "What should I look for in a distributor?",
      a: "Look for documented access to your specific target buyer segment, active geographic coverage in the required region, technical pre-sales and support competence, downstream reseller or dealer relationships, operational logistics infrastructure where needed, and clear portfolio alignment without disabling conflicts of interest.",
    },
    {
      q: "How do I know whether a distributor has real market access?",
      a: "Evaluate evidence rather than promotional claims. Ask candidate distributors to detail which customer types they actively sell to, their existing account relationships, the complementary products they currently represent, and their actual sales coverage across target territories.",
    },
    {
      q: "What is the difference between a distributor and a reseller?",
      a: "A reseller typically purchases products to sell directly to the end business user. A distributor generally acts as an intermediary supplying, warehousing, and supporting a broader downstream network of resellers, dealers, systems integrators, or regional commercial accounts.",
    },
    {
      q: "Should I give a distributor exclusive territory immediately?",
      a: "Generally, no. Granting broad exclusivity before verifying a distributor's sales performance creates significant commercial risk. Best practice is to begin with a non-exclusive pilot in a defined region or product category, expanding territory rights only after performance expectations are met.",
    },
    {
      q: "What commercial terms should I discuss with a distributor?",
      a: "Key commercial terms include wholesale pricing structures, discount tiers, payment and credit terms, inventory and order fulfillment responsibilities, territory boundaries, marketing commitments, support escalation tiers, and termination conditions.",
    },
    {
      q: "How long should a distribution partner pilot last?",
      a: "Distribution pilots typically run for 3 to 6 months depending on the product sales cycle. This timeframe allows both companies to evaluate lead generation velocity, technical support onboarding, quoting efficiency, and operational collaboration.",
    },
    {
      q: "Can The Relay help me find distribution partners?",
      a: "Yes. The Relay provides a structured opportunity exchange where companies can publish their specific distribution requirements (such as target territory, product category, and partner profile) for relevant regional distributors to discover and evaluate.",
    },
    {
      q: "Does The Relay guarantee that a distributor will accept my opportunity?",
      a: "No. The Relay operates as an opportunity discovery layer. Acceptance and partnership formation depend entirely on mutual evaluation between the participating commercial entities.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/how-to-find-distribution-partners#webpage`,
        url: `${SITE_URL}/how-to-find-distribution-partners`,
        name: "How to Find B2B Distribution Partners | The Relay",
        description:
          "Learn how to find B2B distribution partners by defining your market, sourcing candidates, evaluating coverage and capability, and testing commercial fit.",
        breadcrumb: {
          "@id": `${SITE_URL}/how-to-find-distribution-partners#breadcrumb`,
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
        "@id": `${SITE_URL}/how-to-find-distribution-partners#breadcrumb`,
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
            name: "Distribution Partners",
            item: `${SITE_URL}/distribution-partners`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "How to Find Distribution Partners",
            item: `${SITE_URL}/how-to-find-distribution-partners`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/how-to-find-distribution-partners#faq`,
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
                <Link to="/distribution-partners" className="hover:text-[#171F2C] transition-colors">
                  Distribution Partners
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">
                How to Find Distribution Partners
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
                  B2B DISTRIBUTION PARTNER SEARCH
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-5">
                  How to Find B2B Distribution Partners
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    Finding a distribution partner is not simply locating a company willing to carry your product. A successful partnership requires alignment across target territory, customer segment, delivery capabilities, downstream channel access, and commercial models.
                  </p>
                  <p className="text-[#334155]">
                    This guide outlines a structured, repeatable process to define your market requirements, build a qualified distributor shortlist, validate actual buyer access, and test operational fit before scaling commitments.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Distribution Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post a Distribution Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Validate market access · Evaluate operational bench · Test with controlled pilots
                </p>
              </div>

              {/* Graphic Column: Process Topology */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Distributor Search Lifecycle
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      SEARCH-FRAMEWORK-V1
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">1. Market &amp; Model Definition</div>
                        <div className="text-[11px] text-[#64748B]">Target territory, buyer profile, partner role</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Define
                      </span>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#171F2C]">2. Due Diligence &amp; Vetting</div>
                        <div className="text-[11px] text-[#64748B]">Actual market access, capability, portfolio conflicts</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Evaluate
                      </span>
                    </div>

                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">3. Commercial Pilot &amp; Scale</div>
                        <div className="text-[11px] text-slate-300">Controlled initial scope before broad exclusivity</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#171F2C] bg-white px-2 py-0.5 rounded-[2px] font-bold">
                        Pilot
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Evidence-based partner selection for new territories.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: STEP 1 - DEFINE TARGET MARKET
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 01
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 1: Define Your Target Market Before Searching
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed">
                Distributor discovery is most effective when you define specific operational requirements rather than issuing broad, vague mandates:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="text-xs font-mono font-semibold text-[#171F2C] uppercase tracking-wider">
                  Parameters to Specify
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Target Country &amp; Region:</strong> Specific geographical boundaries and jurisdictions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Industry / Vertical:</strong> Core sectors (e.g., manufacturing, healthcare, enterprise IT).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Target Buyer Role:</strong> Engineering leads, procurement executives, or regional installers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Required Local Capabilities:</strong> Warehousing, physical fulfillment, or pre-sales engineering.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                  Illustrative Specification Contrast
                </div>
                <div className="space-y-3 text-[13px]">
                  <div>
                    <div className="font-semibold text-rose-800">Vague Search Mandate:</div>
                    <div className="text-[#64748B]">
                      "Find us a distributor in Europe to sell our software."
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0]">
                    <div className="font-semibold text-[#171F2C]">Disciplined Search Mandate:</div>
                    <div className="text-[#64748B]">
                      "We need a partner covering mid-market industrial buyers in Germany and Austria with established access to electrical contractors and local German-language support."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: STEP 2 - CHOOSE PARTNER TYPE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 02
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 2: Decide What Type of Distribution Partner You Need
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Distribution models vary significantly by industry. Define the functional role required rather than relying on generic titles:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Regional Distributor
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Focuses on dedicated territory coverage within a specific state, province, or country market.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  National / Master Distributor
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Manages nationwide trade relationships, supplying regional sub-distributors and dealer networks.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Wholesale Distributor
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Specializes in high-volume purchasing, centralized warehousing, and physical inventory logistics.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Value-Added Distributor (VAD)
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Provides technical pre-sales engineering, system architecture design, and specialized partner enablement.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Reseller / VAR Network
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Sells directly to end-user enterprises, bundling software and hardware with custom integration services.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Channel Sales Partner
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Acts as an authorized commercial representative driving pipeline without carrying physical inventory.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <Link to="/distribution-partners" className="text-[#171F2C] hover:underline flex items-center gap-1">
                <span>View Distribution Partners Hub</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/channel-partnerships" className="text-[#171F2C] hover:underline flex items-center gap-1">
                <span>View Channel Partnerships Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: STEP 3 - BUILD A SHORTLIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 03
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 3: Build a Distribution Partner Shortlist
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Source candidate distributors through multiple legitimate commercial channels:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">01 · Trade Associations</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Vertical trade bodies and industry dealer registries with established regional rosters.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">02 · Complementary Vendors</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Researching distributors carrying non-competing products in adjacent categories.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">03 · Industry Referrals</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Recommendations from existing enterprise clients, suppliers, and regional consultants.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">04 · Opportunity Exchanges</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Listing structured distribution requirements on B2B platforms like The Relay.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: STEP 4 - LOOK FOR RELEVANT MARKET ACCESS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 04
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 4: Look for Relevant Market Access
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Geographic presence alone does not establish active customer access. Validate whether the candidate actually sells to your target buyers:
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                Diagnostic Evaluation Questions
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">"Who do you already sell to?"</div>
                  <p className="text-[#64748B]">Verify whether their active accounts match your target company profile, procurement tiers, and buyer personas.</p>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">"Which regions do you actively cover?"</div>
                  <p className="text-[#64748B]">Determine active field sales coverage versus passive catalog listings across secondary territories.</p>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">"Which complementary products do you represent?"</div>
                  <p className="text-[#64748B]">Check whether their existing line card creates natural bundling opportunities for your solution.</p>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <div className="font-semibold text-[#171F2C] mb-1">"What is your downstream channel structure?"</div>
                  <p className="text-[#64748B]">Evaluate the size and activity level of their downstream dealer or value-added reseller network.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: STEP 5 - EVALUATE DISTRIBUTION CAPABILITY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 05
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 5: Evaluate Distribution Capability
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Depending on the industry and commercial model, assess the candidate's operational capabilities across relevant functions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  1. Sales &amp; Channel Bench
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Dedicated field reps, technical sales engineers, and structured reseller onboarding cadences.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  2. Technical Support
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  In-house solution architects capable of managing pre-sales demos and tier-1 support triage.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  3. Logistics &amp; Warehousing
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Regional inventory handling, shipping facilities, and return logistics where physically required.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  4. Local Compliance
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Regional entity registrations, tax compliance, and local language support capabilities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  5. Reporting &amp; Visibility
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Transparent sell-through reporting and visibility into pipeline velocity and account adoption.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  6. Enablement Resources
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Willingness to train downstream partners, co-host webinars, and participate in trade events.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: STEP 6 - CHECK PORTFOLIO CONFLICTS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 06
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 6: Check Portfolio Fit and Channel Conflicts
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Review the distributor's existing line card to identify direct conflicts and mutual growth opportunities:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C]" />
                  <span>Positive Portfolio Synergies</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Complementary Products:</strong> Your offering enhances the value of their existing lines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Shared Customer Base:</strong> Sells to the exact procurement decision-makers you target.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C] mt-1.5 shrink-0"></span>
                    <span><strong>Clear Investment Reason:</strong> The distributor sees an opportunity to increase average order values.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171F2C]">
                  <XCircle className="w-4 h-4 text-[#64748B]" />
                  <span>Potential Portfolio Conflicts</span>
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Dominant Direct Competitor:</strong> Represents a major incumbent generating majority revenue.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Overlapping Channel Territory:</strong> Conflicts with your existing regional channel partners.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span><strong>Catalog Dilution:</strong> A bloated product list where your offering risks receiving zero active attention.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: STEP 7 - DISCUSS COMMERCIAL EXPECTATIONS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 07
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 7: Discuss Commercial Expectations
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Commercial terms vary significantly by market and industry. Document mutual expectations across essential operational topics:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  1. Pricing &amp; Margin Tiers
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Wholesale discounts, resale margins, and volume discount structures negotiated between the parties.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  2. Payment &amp; Credit Terms
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Invoicing schedules, credit facilities, payment terms (e.g. Net 30/60), and collection ownership.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  3. Territory Boundaries
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Explicit geographic and vertical market boundaries to prevent channel conflict with other partners.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  4. Minimum Volume Commitments
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Performance targets tied to any potential territory protections or preferred pricing tiers.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  5. Customer Ownership &amp; Support
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Clear boundaries on who owns direct billing and manages customer success versus technical escalation.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  6. Marketing &amp; Co-Op Support
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Expectations regarding joint marketing funds, event sponsorships, and collateral localization.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: STEP 8 - TEST WITH CONTROLLED PILOT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Phase 08
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Step 8: Test the Partnership Before Expanding It
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before committing to broad territorial coverage or complex exclusivity agreements, run a structured commercial pilot:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">Limited Scope</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Focus on a defined territory, specific vertical, or selected product line.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">Defined Duration</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Establish a 3 to 6-month evaluation period to gauge pipeline velocity.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">Agreed Milestones</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Track quoting volume, partner enablement completion, and initial orders.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">Expansion Review</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Review operational performance before extending long-term commitments.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: HOW TO COMPARE CANDIDATES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Evaluation Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Compare Potential Distribution Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Use this structured diagnostic framework to compare candidate distributors objectively:
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono font-semibold text-[#64748B] uppercase">
                    <th className="p-4">Evaluation Criterion</th>
                    <th className="p-4">Core Diagnostic Questions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#171F2C]">
                  <tr>
                    <td className="p-4 font-semibold">Market Access</td>
                    <td className="p-4 text-[#64748B]">Do they actively sell to your target buyers and hold established commercial accounts?</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Geographic Coverage</td>
                    <td className="p-4 text-[#64748B]">Do they maintain active field sales and operations in the required territory?</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Product &amp; Category Fit</td>
                    <td className="p-4 text-[#64748B]">Do they represent complementary lines that create natural bundling opportunities?</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Sales Capability</td>
                    <td className="p-4 text-[#64748B]">Do they have dedicated commercial resources and technical pre-sales engineers?</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Operational Capability</td>
                    <td className="p-4 text-[#64748B]">Can they support the required logistics, fulfillment, tier-1 support, or local compliance?</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Portfolio Conflict</td>
                    <td className="p-4 text-[#64748B]">Are there conflicting direct competitor relationships that might dilute attention?</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Commercial Fit</td>
                    <td className="p-4 text-[#64748B]">Can both sides align on sustainable pricing, payment terms, and reporting cadences?</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Strategic Alignment</td>
                    <td className="p-4 text-[#64748B]">Is there a compelling economic reason for both organizations to invest in growth?</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: RED FLAGS TO WATCH FOR
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Risk Factors
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Distribution Partner Red Flags to Watch For
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Be cautious of these common indicators of poor operational fit:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Unverified Reach
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Broad claims of national market penetration without referenceable customer relationships.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Premature Exclusivity
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Demanding exclusive territory rights before demonstrating sales capability or volume commitments.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Unclear Support Model
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Inability to explain how technical questions, warranties, or customer onboarding will be handled.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Weak Reporting
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Reluctance to share regular sell-through visibility, pipeline status, or inventory levels.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: COMMON MISTAKES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Process Errors
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Common Mistakes When Finding Distribution Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Avoid these frequent missteps during the distributor discovery and onboarding process:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Choosing First Responder
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Signing with the first interested distributor rather than building a comparative candidate shortlist.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Equating Presence with Access
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Assuming that having an office in a country translates to active access to your target buyers.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Margin-Only Focus
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Selecting a partner solely on headline discounts rather than their capability to drive active volume.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Premature Territory Grants
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Granting large geographic territories without validating initial sales execution through a pilot.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 13: WHERE THE RELAY FITS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Discovery Venue
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where The Relay Fits in Distribution Partner Discovery
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay provides an opportunity-based discovery channel alongside traditional directories and trade events:
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
                    <span>A structured venue to post specific distribution mandates and territorial requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Discovery layer connecting manufacturers with regional and vertical distributors.</span>
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
                    <span>The Relay does not certify partner perfection or guarantee market penetration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not operate logistics, warehousing, or billing execution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not automatically negotiate or enforce distribution contracts.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Related Ecosystem Links */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Explore The Complete Distribution &amp; Channel Ecosystem
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link
                  to="/distribution-partners"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">Distribution Partners Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/channel-partnerships"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">Channel Partnerships</span>
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
                  to="/8-step-journey"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between sm:col-span-2 lg:col-span-2"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">8-Step Journey: Lifecycle Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 14: ILLUSTRATIVE SEARCH SCENARIOS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Hypothetical Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Illustrative Distribution Partner Search Scenarios
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Illustrative examples showing how different businesses structure their distributor search:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Scenario 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  SaaS Provider Seeking Regional Implementation Channel
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A software vendor expanding into European manufacturing sectors searches for regional value-added distributors with established systems integration teams capable of delivering local language onboarding.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategy:</strong> Evaluates VADs based on technical solution architects and local language support bench.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Scenario 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Hardware Manufacturer Seeking Wholesale Distribution
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  An IoT sensor manufacturer seeking North American retail and commercial reach partners with a tier-1 wholesale distributor with established central warehousing and relationships with regional electrical supply houses.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategy:</strong> Validates central warehousing capacity and downstream dealer network access.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Scenario 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Industrial Product Firm Targeting Contractor Networks
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A specialized industrial HVAC equipment producer identifies regional trade distributors holding existing commercial credit accounts with commercial mechanical contractors.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategy:</strong> Focuses on active trade credit relationships and branch counter availability.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Scenario 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  B2B Product Firm Testing Pilot Rollout
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A security appliance vendor structures a 6-month non-exclusive pilot in the DACH region with a candidate distributor before considering broader European territory agreements.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Strategy:</strong> Measures quoting activity and technical enablement velocity during a controlled pilot window.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 15: SEARCH CHECKLIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Action Checklist
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                B2B Distribution Partner Search Checklist
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Review this pre-commitment checklist before finalizing any distribution agreement:
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] text-[#171F2C]">
                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Target market and territory boundaries defined</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Target buyer and procurement persona specified</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Required partner model and functional role determined</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Comparative candidate shortlist compiled</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Actual customer reach and buyer access verified</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Operational bench and technical support capacity confirmed</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Portfolio alignment and competing lines evaluated</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Pricing, margin structures, and payment terms documented</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Controlled initial pilot structure considered</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                  <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span>Customer ownership and reporting cadences agreed</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 16: FAQ ACCORDION (DOM-RENDERED FOR CRAWLERS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Questions &amp; Answers
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                How to Find Distribution Partners FAQ
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
              SECTION 17: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Distribution Network Discovery
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Start Finding Distribution Partners That Fit Your Market
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                A useful distributor search starts with a clearly defined market, a clear partner profile, and evidence that potential partners can serve the intended customer segment. The Relay provides an opportunity-based discovery route for businesses looking to explore distribution relationships.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Distribution Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post a Distribution Opportunity
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
