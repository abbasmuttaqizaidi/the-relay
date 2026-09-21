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
  FileText,
  AlertCircle,
  Target,
  BarChart3,
  Server,
  Cpu,
  Laptop,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/channel-partnerships")({
  head: () =>
    createSeoMeta({
      title: "B2B Channel Partnerships — Find Channel Partners | The Relay",
      description:
        "Build B2B channel partnerships with resellers, VARs, systems integrators and other partners that can help you reach and serve new customers and markets.",
      path: "/channel-partnerships",
    }),
  component: ChannelPartnershipsPage,
});

export function ChannelPartnershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a B2B channel partnership?",
      a: "A B2B channel partnership is a commercial relationship where an external organization—such as a reseller, value-added reseller (VAR), systems integrator (SI), or managed service provider (MSP)—helps a company market, sell, implement, or support its products and services to customers.",
    },
    {
      q: "What types of channel partners exist in B2B markets?",
      a: "Major channel partner types include resellers (who sell products directly to their accounts), Value-Added Resellers or VARs (who package products with consulting, customization, or services), Systems Integrators (who connect software into enterprise environments), Managed Service Providers (who operate solutions on an ongoing basis), regional channel distributors, and co-selling partners.",
    },
    {
      q: "What is the difference between a channel partner and a referral partner?",
      a: "A referral partner introduces an individual lead or opportunity ('I know a customer who needs what you provide'), whereas a channel partner plays an ongoing operational role in marketing, selling, bundling, implementing, or supporting solutions through their own commercial channels.",
    },
    {
      q: "What is the difference between a channel partner and a distributor?",
      a: "While terminology can overlap across industries, channel partnerships broadly encompass all third-party go-to-market selling and implementation relationships. In contrast, distributors typically act as intermediaries managing wholesale logistics, territory access, inventory, credit, or broad reseller networks.",
    },
    {
      q: "What is a Value-Added Reseller (VAR)?",
      a: "A Value-Added Reseller (VAR) is a business partner that takes a third-party product and adds value through specialized services—such as custom implementation, hardware integration, workflow consulting, or localized technical support—before delivering a complete solution to the end customer.",
    },
    {
      q: "What is a Systems Integrator (SI)?",
      a: "A Systems Integrator is an engineering or consulting firm that specializes in combining disparate hardware, software, cloud services, and legacy enterprise infrastructure into unified, operational systems for business clients.",
    },
    {
      q: "How do businesses find potential channel partners?",
      a: "Businesses typically find channel partners through industry ecosystems, partner directories, referral introductions, technology integration marketplaces, and opportunity networks like The Relay where commercial requirements highlight natural counterparties.",
    },
    {
      q: "Is The Relay a Partner Relationship Management (PRM) software?",
      a: "No. The Relay is an opportunity exchange and discovery network where businesses find and connect around verified commercial requirements. Dedicated PRM systems (which manage ongoing partner portals, deal registration, training certifications, and collateral distribution) are separate operational tools that businesses use after establishing a relationship.",
    },
    {
      q: "What should a channel partnership agreement define?",
      a: "A comprehensive channel agreement should define clear commercial terms including sales roles, customer relationship ownership, implementation responsibilities, ongoing support obligations, margins and commission schedules, territory boundaries, account attribution rules, training expectations, and dispute resolution processes.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/channel-partnerships#webpage`,
        url: `${SITE_URL}/channel-partnerships`,
        name: "B2B Channel Partnerships — Find Channel Partners | The Relay",
        description:
          "Build B2B channel partnerships with resellers, VARs, systems integrators and other partners that can help you reach and serve new customers and markets.",
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
            name: "Channel Partnerships",
            item: `${SITE_URL}/channel-partnerships`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/channel-partnerships#faq`,
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
              <li className="text-[#171F2C] font-bold">Channel Partnerships</li>
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
                  Go-To-Market & Channel Distribution
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-4">
                  Build B2B Channel Partnerships That Extend Your Reach
                </h1>

                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    A channel partnership is a commercial relationship where another business helps
                    you reach, sell to, implement for, or support customers through its existing
                    market access and operational capabilities.
                  </p>
                  <p className="text-[#334155]">
                    Designed for SaaS companies, technology vendors, agencies, manufacturers, and
                    service providers looking to expand their go-to-market reach through trusted
                    third-party channels.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-5 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#171F2C] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] transition-colors"
                  >
                    Explore Channel Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors"
                  >
                    Post a Channel Requirement
                  </Link>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#64748B]">
                  <span>Resellers</span>
                  <span>•</span>
                  <span>Value-Added Resellers</span>
                  <span>•</span>
                  <span>Systems Integrators</span>
                  <span>•</span>
                  <span>MSPs</span>
                </div>
              </div>

              {/* Visual Column: Channel Value Stack (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Channel Partnership Stack
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">INDIRECT GTM</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        layer: "01",
                        title: "Primary Solution / Vendor",
                        desc: "Core software, hardware, or specialized service offering",
                        active: false,
                      },
                      {
                        layer: "02",
                        title: "Channel Intermediary",
                        desc: "Reseller, VAR, SI, or MSP providing sales & delivery",
                        active: true,
                      },
                      {
                        layer: "03",
                        title: "Commercial Value-Add",
                        desc: "Integration, localized support, bundling, and account trust",
                        active: false,
                      },
                      {
                        layer: "04",
                        title: "End Business Customer",
                        desc: "Receives comprehensive solution suited to their environment",
                        active: false,
                      },
                    ].map((st, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-[4px] border transition-colors",
                          st.active
                            ? "bg-[#000000] text-white border-[#000000]"
                            : "bg-[#F8FAFC] border-[#E2E8F0] text-[#171F2C]",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "w-6 h-6 rounded-[2px] flex items-center justify-center font-mono text-[11px] font-bold shrink-0",
                                st.active
                                  ? "bg-white text-[#000000]"
                                  : "bg-white border border-[#E2E8F0] text-[#171F2C]",
                              )}
                            >
                              {st.layer}
                            </span>
                            <div>
                              <div
                                className={cn(
                                  "text-[13px] font-semibold",
                                  st.active ? "text-white" : "text-[#171F2C]",
                                )}
                              >
                                {st.title}
                              </div>
                              <div
                                className={cn(
                                  "text-xs truncate max-w-[220px]",
                                  st.active ? "text-slate-300" : "text-[#64748B]",
                                )}
                              >
                                {st.desc}
                              </div>
                            </div>
                          </div>
                          {st.active && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Opportunity-first discovery for B2B commercial collaboration.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHAT IS A B2B CHANNEL PARTNERSHIP?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Core Concept
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What is a B2B Channel Partnership?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A B2B channel partnership occurs when a company collaborates with an independent
                third-party organization that actively participates in taking its products or
                services to market. Rather than relying solely on direct internal sales, the company
                leverages the channel partner’s existing operational assets:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Established Customer Access",
                  desc: "Partners bring pre-existing commercial relationships with target buyers who already trust their advice and procurement guidance.",
                  icon: Users,
                },
                {
                  title: "Sales & Account Management",
                  desc: "Channel partners maintain dedicated sales teams that pitch, demonstrate, and negotiate solutions directly with local clients.",
                  icon: Target,
                },
                {
                  title: "Technical Implementation",
                  desc: "Integrators and VARs configure software, migrate legacy databases, and customize workflows so the solution works seamlessly.",
                  icon: Cpu,
                },
                {
                  title: "Localized Domain Expertise",
                  desc: "Partners navigate regional business practices, language nuances, industry compliance standards, and local tax requirements.",
                  icon: Globe,
                },
                {
                  title: "Complementary Service Bundling",
                  desc: "Products are packaged alongside hardware, consulting, security audits, and ongoing support for a complete end-to-end offer.",
                  icon: Layers,
                },
                {
                  title: "Ongoing Account Support",
                  desc: "Managed service providers deliver tier-1 and tier-2 client support, ensuring sustained adoption and recurring account retention.",
                  icon: Server,
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
              SECTION 4: WHY BUSINESSES USE CHANNEL PARTNERS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Strategic Rationale
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why Businesses Build Channel Partnerships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Developing an indirect sales channel allows growing and enterprise businesses to
                solve real operational constraints:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  num: "01",
                  title: "Reach New Customer Segments",
                  desc: "Access enterprise, mid-market, or specialized vertical accounts that rarely respond to cold direct outreach.",
                },
                {
                  num: "02",
                  title: "Enter New Geographic Markets",
                  desc: "Expand into international territories and regions without establishing expensive physical branch offices or hiring local legal teams.",
                },
                {
                  num: "03",
                  title: "Add Implementation Capacity",
                  desc: "Scale customer onboarding rapidly by relying on certified integration partners rather than stretching internal services teams.",
                },
                {
                  num: "04",
                  title: "Sell Through Trusted Relationships",
                  desc: "Leverage the established advisory credibility that IT consultants, MSPs, and VARs have built over years with their clientele.",
                },
                {
                  num: "05",
                  title: "Bundle Complementary Offerings",
                  desc: "Combine products with essential hardware, cloud infrastructure, or managed services to meet complex RFP specifications.",
                },
                {
                  num: "06",
                  title: "Align Economic Incentives",
                  desc: "Structure sustainable margin splits and reseller discounts where both organizations benefit from customer success.",
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
              SECTION 5: TYPES OF CHANNEL PARTNERS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Channel Typology
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Key Types of B2B Channel Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Channel partners operate under different commercial models and service depths.
                Understanding these distinctions ensures proper partner alignment:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Type 1: Resellers */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    COMMERCIAL RESELLING
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">Resellers</h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Commercial partners who sell your product or service directly to their customer
                    base, typically receiving a wholesale discount, reseller margin, or transaction
                    margin.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Focus: Sales execution & direct account access
                </div>
              </div>

              {/* Type 2: VARs */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    CUSTOM VALUE-ADD
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Value-Added Resellers (VARs)
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Organizations that bundle your solution with specialized services, including
                    custom installation, training, workflow configuration, and legacy hardware
                    integration.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Focus: Tailored implementation & consulting
                </div>
              </div>

              {/* Type 3: Systems Integrators */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    ENTERPRISE ARCHITECTURE
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Systems Integrators (SIs)
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Engineering and consulting firms that connect your platform into complex,
                    multi-vendor IT ecosystems and enterprise client backends.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Focus: High-scale technical architecture & deployment
                </div>
              </div>

              {/* Type 4: MSPs */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    MANAGED OPERATIONS
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Managed Service Providers (MSPs)
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Service firms that manage infrastructure, cybersecurity, or business software on
                    behalf of their clients under ongoing subscription contracts.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Focus: Continuous operation & recurring support
                </div>
              </div>

              {/* Type 5: Regional / Channel Distributors */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    TERRITORY INFRASTRUCTURE
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Regional / Channel Distributors
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Intermediary entities that manage sub-reseller ecosystems, local compliance,
                    billing consolidation, and territorial distribution pipelines.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Focus: Broad market access & intermediary networks
                </div>
              </div>

              {/* Type 6: Co-Selling Partners */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold text-[#64748B] mb-3">
                    JOINT COMMERCIAL PURSUIT
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Co-Selling Partners
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Non-competing software or service providers that jointly pitch integrated
                    solutions to mutual prospective buyers without taking over full reselling
                    rights.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  Focus: Unified procurement proposals & shared pipeline
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: CHANNEL PARTNER VS REFERRAL PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Boundary Distinction
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Channel Partner vs. Referral Partner
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                While both models expand customer acquisition through third parties, their
                operational scope and commercial commitment differ significantly:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Referral Box */}
              <div className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                    Referral Relationship
                  </span>
                  <Link
                    to="/referral-partnerships"
                    className="text-xs font-mono font-semibold text-[#171F2C] hover:underline flex items-center gap-1"
                  >
                    Referral Hub <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="text-lg font-serif italic text-[#171F2C]">
                  &ldquo;I know a specific customer who needs what you provide.&rdquo;
                </div>

                <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Focuses on discrete introductions and lead handoffs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>The primary vendor owns the sales cycle, contract, and delivery.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>
                      Compensated via one-time introduction fees or percentage referral fees.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>
                      Requires minimal technical enablement or ongoing support from partner.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Channel Box */}
              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#171F2C]">
                    Channel Relationship
                  </span>
                  <span className="text-[10px] font-mono bg-[#000000] text-white px-2 py-0.5 rounded-[2px]">
                    Current Focus
                  </span>
                </div>

                <div className="text-lg font-serif italic text-[#171F2C]">
                  &ldquo;I can help you reach, sell to, implement for, or serve customers through my
                  commercial channel.&rdquo;
                </div>

                <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#334155]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Involves an ongoing indirect sales, bundling, or delivery motion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>
                      Partner often holds the direct client relationship or contract paper.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Compensated through wholesale discounts, margins, and service fees.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Requires partner training, certification, and commercial alignment.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 text-xs text-[#64748B] flex items-center gap-2">
              <span>Looking specifically for reciprocal introduction loops?</span>
              <Link
                to="/b2b-referral-network"
                className="font-medium text-[#171F2C] underline hover:text-[#64748B]"
              >
                Visit B2B Referral Network
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: CHANNEL PARTNER VS DISTRIBUTOR
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Distribution Alignment
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Channel Partner vs. Distributor
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Although industry terminology sometimes uses these terms interchangeably,
                understanding their operational distinction avoids channel conflict:
              </p>
            </div>

            <div className="overflow-x-auto border border-[#E2E8F0] rounded-[4px] bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                    <th className="p-4 sm:p-5">Dimension</th>
                    <th className="p-4 sm:p-5">Channel Partner (VAR / SI / MSP)</th>
                    <th className="p-4 sm:p-5">Distributor (Wholesale / Master Channel)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">Primary Role</td>
                    <td className="p-4 sm:p-5">
                      Sells, customizes, integrates, or manages solutions for end business clients.
                    </td>
                    <td className="p-4 sm:p-5">
                      Acts as an intermediary supplying inventory, credit, and access to reseller
                      networks.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">Customer Touchpoint</td>
                    <td className="p-4 sm:p-5">
                      High-touch direct engagement with the end buyer / user.
                    </td>
                    <td className="p-4 sm:p-5">
                      Primarily interacts with resellers, dealers, and sub-distributors.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">Value Addition</td>
                    <td className="p-4 sm:p-5">
                      Configuration, custom code, training, local SLA support, workflow design.
                    </td>
                    <td className="p-4 sm:p-5">
                      Billing consolidation, currency exchange, financing, logistics, territory
                      clearing.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#171F2C]">Dedicated Route</td>
                    <td className="p-4 sm:p-5">
                      <span className="font-mono text-[11px] font-bold text-[#171F2C]">
                        /channel-partnerships
                      </span>{" "}
                      (Current Page)
                    </td>
                    <td className="p-4 sm:p-5">
                      <Link
                        to="/distribution-partners"
                        className="font-mono text-[11px] font-bold text-[#171F2C] underline hover:text-[#64748B]"
                      >
                        /distribution-partners →
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: HOW TO CHOOSE A CHANNEL PARTNER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Evaluation Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Evaluate Potential Channel Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Successful channel programs depend on qualifying partners against objective
                operational criteria rather than volume of sign-ups:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Target Buyer Overlap",
                  question: "Does the partner already sell to your ideal customer profile?",
                  desc: "Examine whether their existing client accounts match your target vertical, company size, and executive buyer persona.",
                },
                {
                  title: "Sales Motion Alignment",
                  question: "Does your offering fit how they naturally sell?",
                  desc: "A transactional self-serve tool rarely fits a high-touch enterprise consulting firm, and vice versa.",
                },
                {
                  title: "Technical Delivery Capability",
                  question: "Can they deliver, configure, and support what customers require?",
                  desc: "Assess their engineering bench strength, implementation track record, and willingness to certify team members.",
                },
                {
                  title: "Geographic / Vertical Reach",
                  question: "Do they provide meaningful access to the targeted market?",
                  desc: "Verify that the partner has established standing in the specific geography or specialized sector you want to penetrate.",
                },
                {
                  title: "Commercial Economics",
                  question: "Is the relationship mutually profitable?",
                  desc: "Ensure margins, service billing rates, and recurring revenue splits justify the partner’s active sales effort.",
                },
                {
                  title: "Operational Commitment",
                  question:
                    "Are they willing to integrate your product into their standard process?",
                  desc: "Look for partners willing to include your offering in their standard customer proposals rather than on a passive basis.",
                },
              ].map((crit, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2.5"
                >
                  <div className="text-[11px] font-mono font-bold text-[#171F2C]">
                    CRITERIA 0{idx + 1}
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#171F2C]">{crit.title}</h3>
                  <div className="text-xs font-semibold text-[#334155] italic">{crit.question}</div>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                    {crit.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: WHAT A CHANNEL PARTNERSHIP SHOULD DEFINE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Commercial Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What a Channel Partnership Agreement Should Define
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before transacting, participating companies should define clear operational
                boundaries to prevent misunderstandings:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: "Sales Roles & Deal Registration",
                  detail:
                    "Who identifies the lead, who conducts demos, and how deal conflict is managed.",
                },
                {
                  label: "Customer Contract Ownership",
                  detail:
                    "Whether the customer contracts directly with the vendor or through the reseller.",
                },
                {
                  label: "Implementation Delivery",
                  detail:
                    "Clear division between partner service delivery and vendor product onboarding.",
                },
                {
                  label: "Ongoing Support & SLAs",
                  detail:
                    "Definition of Tier-1 vs Tier-2 support responsibilities and escalation channels.",
                },
                {
                  label: "Pricing, Margins & Discounts",
                  detail: "Wholesale discount schedules, payment terms, and margin structures.",
                },
                {
                  label: "Referral / Commission Rules",
                  detail:
                    "Commission percentages, payout frequency, and renewal attribution windows.",
                },
                {
                  label: "Territory & Market Rights",
                  detail: "Defined geographic regions or vertical market boundaries.",
                },
                {
                  label: "Lead & Account Attribution",
                  detail:
                    "Clear timeframes for deal registration expiration and account renewal credit.",
                },
                {
                  label: "Marketing & Co-Branding",
                  detail:
                    "Guidelines for collateral usage, joint press releases, and co-marketing budgets.",
                },
                {
                  label: "Training & Enablement",
                  detail: "Required product certifications, sales playbooks, and update briefings.",
                },
                {
                  label: "Dispute Resolution & Exit",
                  detail:
                    "Governance mechanisms for account transitions if either party terminates.",
                },
                {
                  label: "Post-First-Deal Expansion",
                  detail:
                    "Roadmap for scaling partner tier levels and margin incentives upon proven volume.",
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
              SECTION 10: HOW A CHANNEL OPPORTUNITY BEGINS ON THE RELAY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Product Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How Channel Opportunities Start on The Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Rather than cold partner recruitment or endless directory browsing, The Relay
                enables opportunity-led discovery where real commercial needs bring partners
                together:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  step: "01",
                  title: "Requirement Appears",
                  desc: "A verified business posts a specific channel need (e.g. European SI partner for CRM rollout or regional reseller for security software).",
                },
                {
                  step: "02",
                  title: "Potential Partner Discovers",
                  desc: "Relevant resellers, VARs, or integrators filter the opportunity board by industry, category, and target geography.",
                },
                {
                  step: "03",
                  title: "Express Commercial Interest",
                  desc: "The interested partner reviews the structured parameters and expresses formal bilateral interest through The Relay.",
                },
                {
                  step: "04",
                  title: "Commercial Discussion",
                  desc: "Both verified counterparties review background profiles and evaluate commercial alignment, customer fit, and delivery capacity.",
                },
                {
                  step: "05",
                  title: "Terms Agreed",
                  desc: "Participating businesses negotiate specific margins, service boundaries, attribution rules, and support expectations.",
                },
                {
                  step: "06",
                  title: "Direct Partnership Handshake",
                  desc: "Upon mutual agreement, principals proceed directly into an operational channel relationship.",
                },
              ].map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#171F2C]">
                      STEP {st.step}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#171F2C]">{st.title}</h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#64748B]">
              <span>
                Want to see the complete end-to-end transaction journey from post to handshake?
              </span>
              <Link
                to="/8-step-journey"
                className="font-mono font-semibold text-[#171F2C] hover:underline shrink-0 flex items-center gap-1"
              >
                View 8-Step Journey <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: RELAY IS NOT PRM SOFTWARE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-[4px] shadow-2xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                    Platform Scope & Positioning
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[#171F2C] tracking-tight">
                    The Relay is an Opportunity Discovery Layer, Not PRM Software
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                    The Relay is not a Partner Relationship Management (PRM) system. It is an
                    opportunity exchange where businesses discover commercial requirements and
                    qualified counterparties. Ongoing CRM integration, partner onboarding portals,
                    training certification management, and incentive administration remain separate
                    operational activities managed directly by the businesses.
                  </p>
                </div>
                <div className="lg:col-span-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-2 font-mono text-xs text-[#64748B]">
                  <div className="text-[11px] font-bold text-[#171F2C] uppercase tracking-wider">
                    Relay Focus:
                  </div>
                  <div>• Opportunity discovery</div>
                  <div>• Verified B2B counterparties</div>
                  <div>• Initial commercial handshake</div>
                  <div>• Zero mandatory portal lock-in</div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: REAL-WORLD CHANNEL EXAMPLES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Real-World Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Examples of B2B Channel Partnerships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Practical examples illustrating how different B2B organizations structure channel
                collaborations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  type: "SaaS Vendor + Systems Integrator",
                  scenario:
                    "An enterprise procurement SaaS partners with global ERP integrators. The integrator recommends and installs the SaaS during large-scale enterprise transformation projects, charging clients implementation fees while the SaaS vendor secures subscription licensing.",
                },
                {
                  type: "Software Company + Value-Added Reseller",
                  scenario:
                    "A specialized CAD software developer establishes a channel with regional engineering VARs. The VARs bundle the software with certified training, custom workstation hardware, and local language support.",
                },
                {
                  type: "Cybersecurity Vendor + MSP",
                  scenario:
                    "A threat-detection platform partners with regional Managed Service Providers (MSPs). The MSP integrates the software into their multi-tenant monitoring stack, billing small-and-midsize clients on a monthly per-seat basis.",
                },
                {
                  type: "Enterprise Platform + Regional Partner",
                  scenario:
                    "A North American logistics software provider establishes channel representation with an established APAC enterprise consulting agency to navigate local tax regulations, client procurement, and on-site support.",
                },
                {
                  type: "Technology Vendor + Consulting Firm",
                  scenario:
                    "A business analytics vendor partners with a financial consulting advisory. The consultancy co-pitches the software during CFO advisory audits, integrating the analytics dashboards directly into their management reporting deliverables.",
                },
                {
                  type: "Hardware Manufacturer + Regional VAR",
                  scenario:
                    "An industrial IoT hardware manufacturer partners with regional automation specialists who install sensor telemetry across local manufacturing facilities under long-term service maintenance contracts.",
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
                    Collaborative Go-To-Market
                  </div>
                </div>
              ))}
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
                B2B Channel Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Scale Your Reach with Qualified Channel Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-8 leading-relaxed">
                Connect with verified resellers, systems integrators, VARs, and MSPs to expand
                commercial distribution around live commercial opportunities.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#171F2C] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] transition-colors"
                >
                  Explore Channel Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors"
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
