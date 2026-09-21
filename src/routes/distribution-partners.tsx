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
  CheckSquare2,
  Workflow,
  Globe,
  Truck,
  Box,
} from "lucide-react";
import { createSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/distribution-partners")({
  head: () =>
    createSeoMeta({
      title: "Find B2B Distribution Partners | The Relay",
      description:
        "Discover B2B distribution opportunities and potential commercial partners through The Relay's consent-driven opportunity exchange.",
      path: "/distribution-partners",
    }),
  component: DistributionPartnersPage,
});

export function DistributionPartnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://usetherelay.com/distribution-partners#webpage",
        url: "https://usetherelay.com/distribution-partners",
        name: "Find B2B Distribution Partners | The Relay",
        description:
          "Discover B2B distribution opportunities and potential commercial partners through The Relay's consent-driven opportunity exchange.",
        breadcrumb: {
          "@id": "https://usetherelay.com/distribution-partners#breadcrumb",
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://usetherelay.com/#website",
          url: "https://usetherelay.com",
          name: "The Relay",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://usetherelay.com/distribution-partners#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://usetherelay.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "B2B Opportunity Exchange",
            "item": "https://usetherelay.com/b2b-opportunity-exchange",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Distribution Partners",
            "item": "https://usetherelay.com/distribution-partners",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://usetherelay.com/#organization",
        name: "The Relay",
        url: "https://usetherelay.com",
      },
    ],
  };

  const faqs = [
    {
      q: "What is a B2B distribution partner?",
      a: "A distribution partner is a commercial entity that holds established market access, regional licenses, sales channels, or enterprise relationships capable of taking another company's product, software, or service to end buyers.",
    },
    {
      q: "How does The Relay facilitate distribution discovery?",
      a: "Relay enables businesses to post structured distribution requirements (e.g., target geography, buyer vertical, minimum volume capability). Verified distributors review sanitized deal parameters, signal interest, negotiate commercial terms, and complete a binding handshake.",
    },
    {
      q: "Does The Relay manage logistics, warehousing, or billing operations?",
      a: "No. The Relay focuses purely on the commercial discovery and handshake layer. Operational logistics, inventory dispatch, and ongoing customer billing are executed directly between the contracted commercial entities.",
    },
    {
      q: "What is the difference between a distributor and a referral partner?",
      a: "A referral partner simply introduces a lead in exchange for a fee. A distributor actively markets, resells, or bundles your offering into their existing sales infrastructure and customer contracts.",
    },
    {
      q: "How are territory rights and exclusivity agreements structured?",
      a: "Parties negotiate territory exclusivity, minimum annual sales quotas, and wholesale margin splits during the private negotiation stage on The Relay before confirming mutual consent.",
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
                Distribution Partners
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH BUSINESS ➔ DISTRIBUTOR ➔ MARKET FLOW
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Vertical Use Case • Market Expansion
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  Find businesses that can help take your offer further.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    A distribution partner helps a business reach enterprise customers, regional territories, or vertical markets that may be difficult or expensive to access directly.
                  </p>
                  <p className="text-[#334155]">
                    The Relay provides a structured exchange for discovering and evaluating distribution opportunities, allowing corporate principals to align on commercial covenants and complete a consent-driven handshake.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Distribution Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post Distribution Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Territory Resellers. Value-Added Distributors. Channel Integrators.
                </p>
              </div>

              {/* Visual Column: Business ➔ Distributor ➔ Market Diagram (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Distribution Flow Topology
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-DIST-01
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Node 1: Originating Business */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Box className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Your Business &amp; Offering</div>
                          <div className="text-xs text-[#64748B]">Proprietary B2B software, hardware, or IP</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0] text-[#64748B]">
                        Principal
                      </span>
                    </div>

                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Node 2: Central Distribution Partner Hub */}
                    <div className="p-3.5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Network className="w-4 h-4 text-white shrink-0" />
                        <div>
                          <div className="text-[13px] font-bold text-white">Verified Distribution Partner</div>
                          <div className="text-xs text-slate-300">Territory Access • Established Procurement Trust</div>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    </div>

                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Node 3: Target End Market */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Target Regional Enterprise Market</div>
                          <div className="text-xs text-[#64748B]">Immediate sales execution &amp; deployment</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0] text-[#64748B]">
                        End Buyers
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Focus on structured discovery and contractual alignment.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: 4 DISTRIBUTION PARTNER EVALUATION PILLARS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Evaluation Criteria
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Key Criteria for Evaluating Distribution Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before entering a distribution handshake, verify counterparty capability across four operational dimensions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Pillar 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Customer Access
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Existing commercial relationships with decision-makers in your target industry or territory.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Active buyer trust
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Territory Footprint
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Physical sales representation, localized compliance credentials, and regional market authority.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Localized execution
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Percent className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Commercial Economics
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Clear margin structures, minimum volume commitments, and programmatic settlement terms.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Predictable economics
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Delivery &amp; Support SLA
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Demonstrated operational capability to handle deployment, client onboarding, and Tier-1 support.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Reputational protection
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: TOPIC CLUSTER & INTERNAL LINKING
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Related Frameworks &amp; Guides
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Explore Distribution &amp; Channel Ecosystem
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Navigate between related distribution networks, operator playbooks, and channel frameworks:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: How To Find Distribution Partners */}
              <Link
                to="/how-to-find-distribution-partners"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Playbook
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Find Distribution Partners
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Practical guide to identifying, evaluating, and structuring distribution pacts.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 2: Channel Partnerships */}
              <Link
                to="/channel-partnerships"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Channel Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Channel Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Discover value-added resellers, systems integrators, and co-selling networks.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Channel Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 3: B2B Partnership Network */}
              <Link
                to="/b2b-partnership-network"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Parent Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Partnership Network
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The core umbrella framework for all strategic alliances across The Relay.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Core Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 4: How Relay Works */}
              <Link
                to="/8-step-journey"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Lifecycle
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    8-Step Journey
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The institutional transaction lifecycle from opportunity to completed handshake.
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
              SECTION 5: FAQ ACCORDION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
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
              SECTION 6: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Distribution Partners
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Accelerate Market Penetration with Verified Distributors
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Connect with verified B2B distributors, territory resellers, and channel partners on The Relay to scale your commercial distribution under strict consent governance.
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
                  Post Distribution Opportunity
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
