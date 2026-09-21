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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/channel-partnerships")({
  head: () =>
    createSeoMeta({
      title: "B2B Channel Partnerships — Find Channel Partners | The Relay",
      description:
        "Discover B2B channel partnership opportunities for referrals, distribution, introductions, and other agreed commercial relationships.",
      path: "/channel-partnerships",
    }),
  component: ChannelPartnershipsPage,
});

export function ChannelPartnershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/channel-partnerships#webpage`,
        url: `${SITE_URL}/channel-partnerships`,
        name: "B2B Channel Partnerships — Find Channel Partners | The Relay",
        description:
          "Discover B2B channel partnership opportunities for referrals, distribution, introductions, and other agreed commercial relationships.",
        breadcrumb: {
          "@id": `${SITE_URL}/channel-partnerships#breadcrumb`,
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
        "@id": `${SITE_URL}/channel-partnerships#breadcrumb`,
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
            "name": "Channel Partnerships",
            "item": `${SITE_URL}/channel-partnerships`,
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
      q: "What is a B2B channel partnership on The Relay?",
      a: "A channel partnership is a commercial relationship where one verified business (e.g. a reseller, VAR, or systems integrator) helps another company reach customers, new geographic markets, or institutional distribution channels.",
    },
    {
      q: "Is The Relay a Partner Relationship Management (PRM) software?",
      a: "No. The Relay is not an operational PRM or portal tool. Relay serves as the institutional opportunity exchange layer for discovering, qualifying, negotiating, and executing the commercial handshake between principals.",
    },
    {
      q: "What channel structures can be discovered on The Relay?",
      a: "Businesses can discover value-added resellers (VARs), regional distributors, co-selling alliances, systems integrators, and specialized vertical referral channels.",
    },
    {
      q: "How are commission structures and territory rights governed?",
      a: "Commercial terms—such as wholesale margins, commission splits, geographic exclusivity, and customer attribution—are negotiated directly between the participating corporate principals prior to bilateral consent.",
    },
    {
      q: "How does The Relay protect direct customer relationships in channel partnerships?",
      a: "Every transaction operates under binding Master NCND covenants and programmatic disclosure boundaries, preventing partner circumvention or unauthorized poaching.",
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
                Channel Partnerships
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH CHANNEL LIFECYCLE DIAGRAM
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Vertical Use Case • Channel Distribution
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  Find businesses that can extend your commercial reach.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    A channel partnership is a commercial relationship where one business helps another reach customers, territory markets, or specialized distribution pipelines.
                  </p>
                  <p className="text-[#334155]">
                    The Relay provides the opportunity exchange layer to discover, vet, and execute verified channel agreements—while commercial parameters, margins, and SLAs remain strictly between participating businesses.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Channel Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post a Channel Requirement
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Value-Added Resellers. Territory Distributors. Systems Integrators.
                </p>
              </div>

              {/* Visual Column: Channel-Partner Lifecycle Flow (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Channel Partner Lifecycle
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-CHAN-01
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { step: "01", title: "Target Market Identification", desc: "Define geography, customer segment, or distribution tier" },
                      { step: "02", title: "Channel Counterparty Match", desc: "Discover verified VARs, integrators, or territory brokers" },
                      { step: "03", title: "Commercial Governance Alignment", desc: "Agree on margins, attribution windows, and support SLAs" },
                      { step: "04", title: "Bilateral Consent Handshake", desc: "Cryptographic reveal & formal channel agreement launch", active: true },
                    ].map((st, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-[4px] border flex items-center justify-between",
                          st.active
                            ? "bg-[#171F2C] text-white border-[#171F2C]"
                            : "bg-[#F8FAFC] border-[#E2E8F0] text-[#171F2C]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "w-6 h-6 rounded-[3px] flex items-center justify-center font-mono text-[11px] font-bold shrink-0",
                              st.active ? "bg-white text-[#171F2C]" : "bg-white border border-[#E2E8F0] text-[#171F2C]"
                            )}
                          >
                            {st.step}
                          </span>
                          <div>
                            <div className={cn("text-[13px] font-semibold", st.active ? "text-white" : "text-[#171F2C]")}>
                              {st.title}
                            </div>
                            <div className={cn("text-xs truncate max-w-[240px]", st.active ? "text-slate-300" : "text-[#64748B]")}>
                              {st.desc}
                            </div>
                          </div>
                        </div>
                        {st.active && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Marketplace discovery layer without rigid software lock-in.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: POTENTIAL CHANNEL STRUCTURES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Channel Typology
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Key Channel Partnership Structures
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Relay accommodates diverse go-to-market channels depending on product complexity and market requirements:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Type 1: VARs */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Value-Added Resellers
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Partners who bundle your software or product with custom onboarding, implementation, and consulting.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  High-touch solution sales
                </div>
              </div>

              {/* Type 2: Systems Integrators */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Systems Integrators (SI)
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Enterprise engineering firms connecting your platform with complex client legacy stacks.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Enterprise deal scale
                </div>
              </div>

              {/* Type 3: Regional Distributors */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Territory Distributors
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Established regional commercial entities holding existing buyer trust, logistics, and compliance access.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Rapid geographical expansion
                </div>
              </div>

              {/* Type 4: Co-Selling Alliances */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Co-Selling Alliances
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Non-competing B2B software and service vendors co-pitching unified procurement proposals.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Accelerated win rates
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
                Adjacent Networks
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Explore The Channel &amp; Distribution Mesh
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Navigate between related distribution hubs, referral protocols, and discovery networks:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: Distribution Partners */}
              <Link
                to="/distribution-partners"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Direct Distribution
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Distribution Partners
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Connect with established regional distributors and enterprise channels.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Explore Network</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 2: B2B Partnership Network */}
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

              {/* Hub 3: Referral Partnerships */}
              <Link
                to="/referral-partnerships"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Reciprocal Loops
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Referral Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Structure fee covenants and bilateral dealflow swaps between complementary firms.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Hub</span>
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
                    Protocol Flow
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    8-Step Journey
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The end-to-end commercial transaction lifecycle from opportunity to handshake.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Journey</span>
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
                Channel Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Scale Your Reach with Verified Channel Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Discover qualified resellers, territory distributors, and systems integrators to expand commercial distribution under institutional consent covenants.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Channel Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post a Channel Requirement
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
