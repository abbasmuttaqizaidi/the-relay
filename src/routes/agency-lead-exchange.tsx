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
  Palette,
  Code2,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/agency-lead-exchange")({
  head: () =>
    createSeoMeta({
      title: "Agency Lead Exchange — Exchange Out-of-Scope Leads | The Relay",
      description:
        "A structured B2B lead-exchange workflow for agencies with out-of-scope, capacity-limited, or otherwise unfulfillable opportunities.",
      path: "/agency-lead-exchange",
    }),
  component: AgencyLeadExchangePage,
});

export function AgencyLeadExchangePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://usetherelay.com/agency-lead-exchange#webpage",
        url: "https://usetherelay.com/agency-lead-exchange",
        name: "Agency Lead Exchange — Exchange Out-of-Scope Leads | The Relay",
        description:
          "A structured B2B lead-exchange workflow for agencies with out-of-scope, capacity-limited, or otherwise unfulfillable opportunities.",
        breadcrumb: {
          "@id": "https://usetherelay.com/agency-lead-exchange#breadcrumb",
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
        "@id": "https://usetherelay.com/agency-lead-exchange#breadcrumb",
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
            "name": "Agency Lead Exchange",
            "item": "https://usetherelay.com/agency-lead-exchange",
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
      q: "What is the Agency Lead Exchange on The Relay?",
      a: "It is a dedicated marketplace workflow engineered specifically for creative, web development, marketing, and consulting agencies to monetize inbound project enquiries that fall outside their core services, current capacity, or target budget tiers.",
    },
    {
      q: "How does an agency monetize an out-of-scope lead?",
      a: "Agencies post sanitized project parameters on The Relay. Verified specialist partner agencies express interest, agree to standard commercial terms (such as a 10–15% referral bounty or recurring rev-share), and complete a formal consent-gated client introduction.",
    },
    {
      q: "How does The Relay prevent partner agencies from stealing clients?",
      a: "Every transaction operates under strict Master Non-Circumvent & Non-Disclosure (NCND) covenants. The client relationship remains protected by contract, and direct introductions only occur after mutual terms are signed.",
    },
    {
      q: "What if our agency has temporary capacity constraints rather than a service mismatch?",
      a: "You can exchange overflow dealflow with vetted peer agencies under subcontracting or reciprocal referral terms, ensuring clients are served without diluting your agency's delivery quality.",
    },
    {
      q: "Can agencies swap leads reciprocally without cash fees?",
      a: "Yes. Many design and development agencies establish bilateral reciprocal covenants on The Relay to exchange complementary dealflow throughout the year without exchanging cash commissions.",
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
                Agency Lead Exchange
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH AGENCY DEALFLOW DIAGRAM
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Agency Dealflow Monetization
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  An out-of-scope agency lead does not have to be a dead lead.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    Every agency routinely receives enquiries for services it does not offer, lacks capacity to deliver, or chooses not to prioritize.
                  </p>
                  <p className="text-[#334155]">
                    Instead of discarding valuable prospective clients, The Relay provides a structured route to present the opportunity to verified peer agencies—turning unserviceable demand into referral fees, revenue share, or reciprocal dealflow.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Post an Out-of-Scope Lead
                  </Link>
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Explore Agency Opportunities
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Design Studios. Engineering Boutiques. Performance Agencies. Consultancies.
                </p>
              </div>

              {/* Visual Column: Agency Dealflow Flow (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Agency Exchange Architecture
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-AGY-01
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Step 1 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#64748B] mb-1">
                        <span>1. Inbound Discovery</span>
                        <span className="text-rose-700">Out of Scope</span>
                      </div>
                      <div className="text-[13px] font-semibold text-[#171F2C]">Design Studio receives $60k Mobile App request</div>
                      <div className="text-xs text-[#64748B]">Agency does not build native iOS/Android in-house</div>
                    </div>

                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Step 2 */}
                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-300 mb-1">
                        <span>2. The Relay Exchange</span>
                        <span className="text-white">Sanitized Post</span>
                      </div>
                      <div className="text-[13px] font-bold text-white">Matches with Verified Mobile Engineering Studio</div>
                      <div className="text-xs text-slate-300">10% Referral Bounty ($6,000) agreed under Master NCND</div>
                    </div>

                    <div className="flex justify-center text-[#94A3B8] py-0.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>

                    {/* Step 3 */}
                    <div className="p-3 bg-white border border-[#171F2C] rounded-[4px]">
                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#171F2C] mb-1">
                        <span>3. Handshake &amp; Introduction</span>
                        <Check className="w-4 h-4 text-[#171F2C]" />
                      </div>
                      <div className="text-[13px] font-semibold text-[#171F2C]">Bilateral Consent Executed</div>
                      <div className="text-xs text-[#64748B]">Client introduced, commission settled on contract close</div>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Convert lead generation overhead into passive revenue loops.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: 4 AGENCY VERTICALS HANDLED
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Vertical Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How Different Agency Sectors Use The Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Specialized agencies focus on what they do best and exchange everything else with vetted peers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Vertical 1: Design & Brand */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Palette className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Design &amp; Branding
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Exchange complex engineering, backend infrastructure, and DevOps scope while retaining creative leadership.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Engineering handoffs
                </div>
              </div>

              {/* Vertical 2: Web & Software Dev */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Web &amp; Software Dev
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Monetize legacy ERP, custom CRM, or mobile app enquiries that don't fit your core modern JavaScript stack.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Stack specialization
                </div>
              </div>

              {/* Vertical 3: Performance & Marketing */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Growth &amp; Performance
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Exchange technical SEO audits, PR campaigns, or video production requirements with verified domain specialists.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Media &amp; PR co-pitching
                </div>
              </div>

              {/* Vertical 4: Consulting & Strategy */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Strategy &amp; Consulting
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Syndicate operational audits, technical staffing, or specialized compliance mandates outside your practice area.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Practice area expansion
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
                Decision Frameworks
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Operator Playbooks &amp; Lead Frameworks
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Explore dedicated decision frameworks for evaluating and pricing unqualified B2B enquiries:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: What To Do With Unqualified Leads */}
              <Link
                to="/what-to-do-with-unqualified-leads"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Operator Guide
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Unqualified Lead Matrix
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A practical 4-step framework to evaluate scope, geography, and referral fit.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 2: How To Monetize Unqualified Leads */}
              <Link
                to="/how-to-monetize-unqualified-leads"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Pricing Playbook
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Monetize Out-of-Scope
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Standard fee schedules, rev-share percentages, and contract terms.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Playbook</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 3: B2B Lead Exchange */}
              <Link
                to="/b2b-lead-exchange"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Parent Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    B2B Lead Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The core protocol for exchanging unserviceable enterprise dealflow.
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
                    The complete transaction lifecycle from opportunity to completed handshake.
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
                Agency Dealflow Hub
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Monetize Unserviceable Agency Dealflow
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Connect with verified digital agencies, engineering studios, and consulting practices to exchange out-of-scope opportunities under formal consent governance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Post an Out-of-Scope Lead
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Explore Agency Opportunities
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
