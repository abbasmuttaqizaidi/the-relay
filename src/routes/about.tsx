import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Check,
  X,
  Layers,
  FileText,
  Handshake,
  Scale,
  Lock,
  ArrowLeftRight,
  Target,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  Repeat,
  CheckSquare2,
  XCircle,
  HelpCircle,
  Network,
  Briefcase,
} from "lucide-react";
import { createSeoMeta, SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () =>
    createSeoMeta({
      title: "About The Relay — B2B Opportunity Exchange",
      description:
        "Learn what The Relay is, why it exists, and how its B2B opportunity exchange helps businesses discover commercial opportunities and partnerships.",
      path: "/about",
    }),
  component: AboutPage,
});

export function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is The Relay?",
      a: "The Relay is a B2B opportunity exchange designed to help businesses discover and explore commercial opportunities, referrals, and partnerships.",
    },
    {
      q: "What problem does The Relay solve?",
      a: "The Relay addresses the unfulfilled commercial opportunity problem—enabling businesses to surface legitimate client inquiries or requirements they cannot service so relevant counterpart businesses can discover them.",
    },
    {
      q: "Who is The Relay for?",
      a: "The Relay is built for B2B service providers, agencies, software and technology companies, consultancies, distributors, and channel businesses looking to explore commercial opportunities or partner relationships.",
    },
    {
      q: "Is The Relay a lead marketplace?",
      a: "No. The Relay is not a lead broker, public database, or scraper. It is an opportunity discovery environment where businesses surface requirements and connect through structured bilateral interest workflows.",
    },
    {
      q: "Does The Relay fulfil projects for businesses?",
      a: "No. The Relay is not an agency or fulfilment provider. Participating businesses negotiate and execute their own commercial deliverables and contracts directly.",
    },
    {
      q: "Does The Relay guarantee partners, leads, or revenue?",
      a: "No. The Relay does not guarantee that an opportunity will receive interest, that a partner will be accepted, that referrals will close, or that revenue will be generated.",
    },
    {
      q: "How is The Relay different from a social network?",
      a: "The Relay does not have public feeds, vanity metrics, follower counts, or open cold messaging. Discovery is structured around concrete commercial opportunities and mutual business fit.",
    },
    {
      q: "Where can I learn how The Relay works?",
      a: "You can explore our interactive 8-Step Journey guide and read our foundational B2B Opportunity Exchange guides to understand the complete workflow.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: "About The Relay — B2B Opportunity Exchange",
        description:
          "Learn what The Relay is, why it exists, and how its B2B opportunity exchange helps businesses discover commercial opportunities and partnerships.",
        breadcrumb: {
          "@id": `${SITE_URL}/about#breadcrumb`,
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
        "@id": `${SITE_URL}/about#breadcrumb`,
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
            name: "About",
            item: `${SITE_URL}/about`,
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
        "@id": `${SITE_URL}/about#faq`,
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
              <li className="text-[#171F2C] font-bold">
                About The Relay
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: INTRODUCTION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                ABOUT THE RELAY
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#171F2C] tracking-tight leading-[1.12]">
                About The Relay
              </h1>
              <div className="space-y-4 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed pt-2">
                <p>
                  The Relay is a B2B opportunity exchange designed to help businesses discover and explore commercial opportunities, referrals, and partnerships.
                </p>
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3 text-sm sm:text-base text-[#171F2C]">
                  <div className="font-semibold text-xs font-mono uppercase tracking-wider text-[#64748B]">
                    The Underlying Problem
                  </div>
                  <p className="text-[#64748B]">
                    A business may encounter a legitimate commercial requirement that it cannot fulfil because of:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1 text-[13px]">
                    <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      <span>Service scope</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      <span>Specialization</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      <span>Geography</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      <span>Capacity</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      <span>Commercial model</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      <span>Distribution limitations</span>
                    </div>
                  </div>
                  <p className="text-[#64748B] pt-2">
                    Instead of treating every such opportunity as simply lost or irrelevant, The Relay provides a structured environment for businesses to surface and explore those opportunities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHY THE RELAY EXISTS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Purpose &amp; Thesis
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why The Relay Exists
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed">
                Businesses interact with customers and commercial opportunities every day that do not always fit their current operating model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="text-xs font-mono font-semibold text-[#171F2C] uppercase tracking-wider">
                  Traditional Options Available
                </div>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span>Declining the opportunity directly without next steps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span>Referring it informally to an existing known partner.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span>Storing it for potential future capacity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8] mt-1.5 shrink-0"></span>
                    <span>Searching for another provider manually through ad-hoc outreach.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C]">
                  The Relay's Approach
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The Relay is designed to provide another discovery route for those situations—giving organizations an intentional platform to surface unfulfilled requirements and connect with qualified counterparties through structured interest signaling.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3 & 4: WHAT THE RELAY IS VS WHAT IT IS NOT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SECTION 3: WHAT THE RELAY IS */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
                  <CheckSquare2 className="w-5 h-5 text-[#171F2C]" />
                  <h2 className="text-xl font-display font-bold text-[#171F2C]">
                    What The Relay Is
                  </h2>
                </div>
                <p className="text-xs text-[#64748B]">
                  The Relay provides clear operational functions:
                </p>
                <ul className="space-y-2.5 text-[13px] text-[#171F2C]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>A B2B opportunity exchange</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>A commercial opportunity discovery environment</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>A place to discover potentially relevant counterpart businesses</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>A structured way to surface business requirements</span>
                  </li>
                </ul>
              </div>

              {/* SECTION 4: WHAT THE RELAY IS NOT */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
                  <XCircle className="w-5 h-5 text-[#64748B]" />
                  <h2 className="text-xl font-display font-bold text-[#171F2C]">
                    What The Relay Is Not
                  </h2>
                </div>
                <p className="text-xs text-[#64748B]">
                  Explicit boundaries defining the platform scope:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-[#64748B]">
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>Not a CRM</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>Not a lead-selling database</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>Not a generic social network</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>Not an agency fulfilment provider</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>Not a logistics provider</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>Not a payment processor</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>Not legal counsel</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>No partner acceptance guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>No revenue guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                    <span>No lead conversion guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: HOW THE RELAY WORKS AT A HIGH LEVEL
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Process Overview
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How The Relay Works
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A high-level sequence from initial requirement to direct commercial collaboration:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">1. Identification</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Businesses identify commercial opportunities or requirements they cannot service.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">2. Requirement Posting</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Opportunities can be structured and posted with clear parameters and scope.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">3. Opportunity Discovery</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Other businesses can discover relevant opportunities matching their capabilities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">4. Interest Signaling</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Interested counterparties can signal interest on specific opportunities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">5. Mutual Assessment</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The participating businesses assess operational fit, capability, and commercial terms.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">6. Direct Execution</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Relevant parties continue the commercial relationship and project delivery directly.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <Link to="/8-step-journey" className="text-[#171F2C] hover:underline flex items-center gap-1">
                <span>Explore the Complete 8-Step Journey</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/b2b-opportunity-exchange" className="text-[#171F2C] hover:underline flex items-center gap-1">
                <span>View B2B Opportunity Exchange Hub</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/how-to-exchange-business-leads" className="text-[#171F2C] hover:underline flex items-center gap-1">
                <span>How to Exchange Business Leads Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: THE COMMERCIAL OPPORTUNITY PROBLEM
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B]">
                Core Problem Thesis
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                The Commercial Opportunity Problem
              </h2>
              <div className="space-y-3 text-base text-[#64748B] leading-relaxed max-w-3xl">
                <p>
                  There is often a meaningful difference between:
                </p>
                <div className="p-4 bg-[#F8FAFC] border-l-2 border-[#171F2C] text-[#171F2C] font-semibold text-sm sm:text-base space-y-1">
                  <div>"I cannot fulfil this opportunity"</div>
                  <div className="text-[#64748B] font-normal text-xs uppercase font-mono">and</div>
                  <div>"This opportunity has no value."</div>
                </div>
                <p>
                  A legitimate commercial inquiry may be unserviceable for one business due to capacity, technical specialization, or territory, while being precisely the right fit for another company.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: CORE PRINCIPLES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Foundation
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Our Core Commercial Principles
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The product principles governing how The Relay is designed and operated:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">1. Relevance Before Volume</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Commercial opportunities should be useful and contextually relevant rather than mass-distributed.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">2. Consent and Appropriate Disclosure</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Businesses should control what information they share and when identifiable information is disclosed.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">3. Business Fit Matters</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  A potential connection should be assessed for capability, market, geography, capacity, and commercial alignment.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">4. Direct Commercial Relationships</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The businesses involved remain responsible for negotiating and executing their own commercial relationships.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">5. No Guarantee of Outcome</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Opportunity discovery does not guarantee a partner, sale, revenue, or project fulfilment.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="text-xs font-mono font-semibold text-[#171F2C]">6. Practical Business Utility</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The platform should help businesses solve real commercial routing and discovery problems rather than create another social feed.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: WHO USES THE RELAY?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Audience
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Who Uses The Relay?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay is built for organizations seeking structured discovery for commercial requirements:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-[13px] text-[#171F2C]">
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <span className="font-semibold block">B2B Service Businesses</span>
                <span className="text-xs text-[#64748B]">Professional service providers</span>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <span className="font-semibold block">Agencies</span>
                <span className="text-xs text-[#64748B]">Digital, creative, and technical</span>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <span className="font-semibold block">Software &amp; Tech Companies</span>
                <span className="text-xs text-[#64748B]">SaaS and platform providers</span>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <span className="font-semibold block">Consultants</span>
                <span className="text-xs text-[#64748B]">Specialized domain advisors</span>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <span className="font-semibold block">Distributors</span>
                <span className="text-xs text-[#64748B]">Regional and wholesale partners</span>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <span className="font-semibold block">Channel Businesses</span>
                <span className="text-xs text-[#64748B]">VARs, integrators, and MSPs</span>
              </div>
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] col-span-2">
                <span className="font-semibold block">Commercial Organizations</span>
                <span className="text-xs text-[#64748B]">Companies seeking qualified B2B counterparties</span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: EXAMPLES OF OPPORTUNITIES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Use Case Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Examples of Opportunities The Relay Can Help Surface
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Illustrative examples of commercial situations where structured discovery applies:
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                <span className="text-[10px] font-mono font-semibold text-[#64748B] uppercase px-2 py-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] mt-0.5 shrink-0">
                  Illustrative
                </span>
                <div className="text-xs sm:text-[13px] text-[#171F2C]">
                  <strong>Agency Out-of-Scope Work:</strong> An agency receives a project inquiry outside its core technical specialization and surfaces it for relevant counterpart firms.
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                <span className="text-[10px] font-mono font-semibold text-[#64748B] uppercase px-2 py-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] mt-0.5 shrink-0">
                  Illustrative
                </span>
                <div className="text-xs sm:text-[13px] text-[#171F2C]">
                  <strong>SaaS Channel Expansion:</strong> A SaaS provider seeking regional integration partners posts structured channel requirements for systems integrators.
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                <span className="text-[10px] font-mono font-semibold text-[#64748B] uppercase px-2 py-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] mt-0.5 shrink-0">
                  Illustrative
                </span>
                <div className="text-xs sm:text-[13px] text-[#171F2C]">
                  <strong>Manufacturer Distribution:</strong> A hardware manufacturer seeking entry into a new geographic market connects with regional wholesale distributors.
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                <span className="text-[10px] font-mono font-semibold text-[#64748B] uppercase px-2 py-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] mt-0.5 shrink-0">
                  Illustrative
                </span>
                <div className="text-xs sm:text-[13px] text-[#171F2C]">
                  <strong>Consultancy Geographic Reach:</strong> A consulting firm encounters a client need in a jurisdiction outside its operational coverage.
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-3">
                <span className="text-[10px] font-mono font-semibold text-[#64748B] uppercase px-2 py-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2px] mt-0.5 shrink-0">
                  Illustrative
                </span>
                <div className="text-xs sm:text-[13px] text-[#171F2C]">
                  <strong>Commercial Requirements:</strong> A business surfaces a specific commercial requirement that another company is well positioned to fulfil.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: WHAT THE RELAY DOES NOT PROMISE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B]">
                Explicit Boundaries
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                What The Relay Does Not Promise
              </h2>
              <p className="text-sm text-[#64748B]">
                The Relay does not make speculative outcome commitments:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px] text-[#64748B]">
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                  <span>The Relay does not promise that every opportunity will receive interest.</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                  <span>The Relay does not promise that an interested business will be suitable.</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                  <span>The Relay does not promise that a referral will close.</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                  <span>The Relay does not promise that an opportunity will generate revenue.</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                  <span>The Relay does not promise that a partner will accept a requirement.</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#64748B] mt-0.5 shrink-0" />
                  <span>The Relay does not promise that a project will be successfully fulfilled.</span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: WHERE TO LEARN MORE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Ecosystem Links
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Explore The Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Learn more about specific solution areas, workflows, and operational standards:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Link
                to="/b2b-opportunity-exchange"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">B2B Opportunity Exchange</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/b2b-lead-exchange"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">B2B Lead Exchange</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/b2b-partnership-network"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">B2B Partnership Network</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/agency-lead-exchange"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">Agency Lead Exchange</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/distribution-partners"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">Distribution Partners</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/channel-partnerships"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">Channel Partnerships</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/referral-partnerships"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">Referral Partnerships</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/8-step-journey"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">How The Relay Works</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/trust-and-safety"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">Trust &amp; Safety</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>

              <Link
                to="/faq"
                className="p-3.5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between sm:col-span-2 lg:col-span-3"
              >
                <span className="text-[13px] font-medium text-[#171F2C]">Frequently Asked Questions (FAQ)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: FAQ ACCORDION (DOM-RENDERED FOR CRAWLERS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Questions &amp; Answers
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                About The Relay FAQ
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
              SECTION 13: FINAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto space-y-6">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B]">
                Discover The Relay
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight">
                Explore How The Relay Works
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
                Learn how businesses can discover opportunities, identify potentially relevant counterparties, and explore commercial relationships through The Relay.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/8-step-journey"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore The 8-Step Journey
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Explore B2B Opportunities
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
