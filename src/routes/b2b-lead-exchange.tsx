import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Building2,
  Layers,
  ShieldCheck,
  Handshake,
  Share2,
  Network,
  Users,
  Briefcase,
  Compass,
  ArrowLeftRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  FileText,
  Search,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/b2b-lead-exchange")({
  head: () =>
    createSeoMeta({
      title: "B2B Lead Exchange — Exchange Leads Your Business Can't Fulfil | The Relay",
      description:
        "Exchange B2B leads your business cannot fulfil with businesses that can. Discover a structured way to share referrals, out-of-scope opportunities and commercial leads.",
      path: "/b2b-lead-exchange",
      keywords:
        "B2B lead exchange, lead exchange, B2B lead sharing, business lead exchange, exchange business leads, unqualified leads, unserviceable leads, out-of-scope leads, B2B lead referrals, referral leads, lead referral network",
    }),
  component: B2BLeadExchangePage,
});

export function B2BLeadExchangePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/b2b-lead-exchange#webpage`,
        url: `${SITE_URL}/b2b-lead-exchange`,
        name: "B2B Lead Exchange — Exchange Leads Your Business Can't Fulfil | The Relay",
        description:
          "Exchange B2B leads your business cannot fulfil with businesses that can. Discover a structured way to share referrals, out-of-scope opportunities and commercial leads.",
        breadcrumb: {
          "@id": `${SITE_URL}/b2b-lead-exchange#breadcrumb`,
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
        "@id": `${SITE_URL}/b2b-lead-exchange#breadcrumb`,
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
            name: "B2B Lead Exchange",
            item: `${SITE_URL}/b2b-lead-exchange`,
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
        "@id": `${SITE_URL}/b2b-lead-exchange#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a B2B lead exchange?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A B2B lead exchange allows businesses to share or exchange commercial leads with other businesses that may be better positioned to pursue them.",
            },
          },
          {
            "@type": "Question",
            name: "Can I exchange a lead my business cannot fulfil?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A core use case is sharing an opportunity that falls outside your services, geography, capabilities or capacity.",
            },
          },
          {
            "@type": "Question",
            name: "Is a lead exchange the same as buying leads?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Some lead exchanges operate as buyer/seller marketplaces. Relay is focused on helping businesses surface opportunities they already have and connect them with businesses that may be able to pursue them.",
            },
          },
          {
            "@type": "Question",
            name: "What types of leads can be exchanged?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Examples include agency project enquiries, specialist service requests, regional opportunities, implementation needs, referrals and other B2B commercial opportunities.",
            },
          },
          {
            "@type": "Question",
            name: "Should every lead be exchanged?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. An opportunity should only be shared when there is a legitimate business reason to do so and the participating businesses can appropriately handle the relationship.",
            },
          },
          {
            "@type": "Question",
            name: "Does Relay guarantee a lead will convert?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Relay facilitates discovery and connection. Whether a lead converts depends on the businesses involved, customer requirements and the resulting commercial relationship.",
            },
          },
          {
            "@type": "Question",
            name: "How is lead exchange different from lead generation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Lead generation creates new demand or enquiries. Lead exchange helps businesses find a suitable path for existing opportunities that may not fit their own operation.",
            },
          },
        ],
      },
    ],
  };

  const faqs = [
    {
      q: "What is a B2B lead exchange?",
      a: "A B2B lead exchange allows businesses to share or exchange commercial leads with other businesses that may be better positioned to pursue them.",
    },
    {
      q: "Can I exchange a lead my business cannot fulfil?",
      a: "Yes. A core use case is sharing an opportunity that falls outside your services, geography, capabilities or capacity.",
    },
    {
      q: "Is a lead exchange the same as buying leads?",
      a: "No. Some lead exchanges operate as buyer/seller marketplaces. Relay is focused on helping businesses surface opportunities they already have and connect them with businesses that may be able to pursue them.",
    },
    {
      q: "What types of leads can be exchanged?",
      a: "Examples include agency project enquiries, specialist service requests, regional opportunities, implementation needs, referrals and other B2B commercial opportunities.",
    },
    {
      q: "Should every lead be exchanged?",
      a: "No. An opportunity should only be shared when there is a legitimate business reason to do so and the participating businesses can appropriately handle the relationship.",
    },
    {
      q: "Does Relay guarantee a lead will convert?",
      a: "No. Relay facilitates discovery and connection. Whether a lead converts depends on the businesses involved, customer requirements and the resulting commercial relationship.",
    },
    {
      q: "How is lead exchange different from lead generation?",
      a: "Lead generation creates new demand or enquiries. Lead exchange helps businesses find a suitable path for existing opportunities that may not fit their own operation.",
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
              BREADCRUMB
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
                  to="/b2b-opportunity-exchange"
                  className="hover:text-[#171F2C] transition-colors"
                >
                  B2B Opportunity Exchange
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">B2B Lead Exchange</li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              1. HERO SECTION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  B2B Lead Exchange &amp; Referral Protocol
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  Exchange the B2B Leads Your Business Can&apos;t Fulfil
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>Not every lead is the right lead for your business.</p>
                  <p>
                    A prospect may need a service you don&apos;t offer. A project may fall outside
                    your capabilities. The customer may be in a market you don&apos;t serve. Or your
                    team may simply not have the capacity to take it on.
                  </p>
                  <p className="text-[#171F2C] font-medium">
                    Instead of letting that opportunity disappear, The Relay gives you a structured
                    way to exchange it with another business that may be able to act on it.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Post a Lead
                  </Link>
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Explore Opportunities
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Share relevant context. Find interested businesses. Decide whether the opportunity
                  should move forward.
                </p>
              </div>

              {/* Hero Visual Card */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Commercial Exchange Model
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">RELAY-LEAD-FLOW</span>
                  </div>

                  <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                      Originating Opportunity
                    </div>
                    <div className="text-[13px] font-medium text-[#171F2C]">
                      Qualified Commercial Lead Received
                    </div>
                    <div className="text-xs text-[#64748B] mt-1">
                      Identified service, scope, regional, or capacity mismatch.
                    </div>
                  </div>

                  <div className="flex justify-center text-[#94A3B8] py-0.5">
                    <ArrowLeftRight className="w-4 h-4 text-[#171F2C]" />
                  </div>

                  <div className="p-4 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                    <div className="text-[11px] font-mono font-semibold text-slate-300 uppercase mb-1">
                      Structured Exchange
                    </div>
                    <div className="text-[13px] font-bold text-white mb-1">
                      B2B Peer Discovery &amp; Controlled Introduction
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      Connect with vetted businesses capable of fulfilling the project under agreed
                      bilateral arrangements.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              2. WHAT IS A B2B LEAD EXCHANGE?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-6">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Definition &amp; Concept
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Is a B2B Lead Exchange?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
                A <strong className="text-[#171F2C]">B2B lead exchange</strong> is a system that
                helps businesses share leads or commercial enquiries with other businesses that may
                be better positioned to pursue them.
              </p>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                This can happen when a lead falls outside a company&apos;s:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
              {[
                { title: "Service Offering", desc: "Outside core capabilities" },
                { title: "Geographic Coverage", desc: "Outside operating regions" },
                { title: "Technical Capability", desc: "Specialist requirements" },
                { title: "Target Market", desc: "Non-ICP client profile" },
                { title: "Current Capacity", desc: "Timeline or bandwidth limits" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between"
                >
                  <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">0{idx + 1}</div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-[#171F2C] mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#64748B] leading-relaxed max-w-3xl">
              Instead of simply rejecting the enquiry, the business can look for a relevant
              counterpart. That is the basic idea behind a lead exchange.
            </p>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              3. WHY BUSINESSES HAVE LEADS THEY CANNOT FULFIL
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Core Realities
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why Businesses Have Leads They Cannot Fulfil
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A lead can be genuine and valuable without being right for your business. Common
                mismatches include:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">Service Mismatch</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A prospect needs a capability your company doesn&apos;t provide, such as
                  complementary tooling, custom coding, or distinct advisory.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Geography Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The customer is outside your operating market or requires local jurisdictional
                  compliance and on-the-ground support.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">Capacity Mismatch</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Your team could fulfil the work, but not within the required delivery timeline or
                  resource availability.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">Industry Mismatch</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The opportunity requires specialist vertical experience, compliance
                  certifications, or domain depth outside your normal client base.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Commercial Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The opportunity is real, but the required engagement structure, contract size, or
                  billing model doesn&apos;t fit your current operations.
                </p>
              </div>

              <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex flex-col justify-center">
                <div className="text-xs font-mono uppercase text-[#64748B] mb-1">Key Takeaway</div>
                <p className="text-[13px] font-medium text-[#171F2C] leading-relaxed">
                  In each case, the lead does not necessarily have to become a dead end.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              4. WHAT CAN YOU DO WITH A LEAD YOU CANNOT FULFIL?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Strategic Options
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Can You Do with a Lead You Cannot Fulfil?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                When an out-of-scope opportunity arrives, there are several possible outcomes:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Option A
                </div>
                <h3 className="text-[14px] font-semibold text-[#171F2C] mb-1">
                  Refer to Complementary Business
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Pass the lead to a trusted provider with the right capabilities.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Option B
                </div>
                <h3 className="text-[14px] font-semibold text-[#171F2C] mb-1">Find a Specialist</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Look for a dedicated partner who can fulfil specific components of the
                  requirement.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Option C
                </div>
                <h3 className="text-[14px] font-semibold text-[#171F2C] mb-1">
                  Explore a Partnership
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Collaborate around customer needs to maintain relationship value.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Option D
                </div>
                <h3 className="text-[14px] font-semibold text-[#171F2C] mb-1">Decline Directly</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Turn down the enquiry when no suitable counterpart or alignment exists.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-[#171F2C] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase text-[#64748B] block mb-1">
                  The Relay Approach
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#171F2C]">
                  The Relay creates another option: put the opportunity in front of businesses that
                  may be able to use it.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/what-to-do-with-unqualified-leads"
                  className="text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] underline underline-offset-4"
                >
                  Unqualified Lead Guide
                </Link>
                <Link
                  to="/how-to-monetize-unqualified-leads"
                  className="text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] underline underline-offset-4"
                >
                  Monetization Options
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              5. HOW THE RELAY LEAD EXCHANGE WORKS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Exchange Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How the Relay Lead Exchange Works
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The exchange follows a structured, transparent 6-step lifecycle:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  01 — Describe the opportunity
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Provide the relevant business context and explain what the prospect needs.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  02 — Define what kind of business fits
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Identify the capability, service, market or partner profile that would be
                  relevant.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  03 — Publish the opportunity
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The opportunity becomes discoverable by businesses looking for relevant commercial
                  opportunities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  04 — Businesses express interest
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A business that believes it can help can indicate interest.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  05 — Discuss the opportunity
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The parties can evaluate fit and determine how they want to proceed.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  06 — Make the introduction
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The originating and receiving businesses decide whether to move forward with the
                  relationship.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-[13px]">
              <div className="text-[#171F2C]">
                The Relay provides the exchange mechanism.{" "}
                <strong>The participating businesses determine the commercial arrangement.</strong>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/how-to-exchange-business-leads"
                  className="font-mono font-semibold text-[#171F2C] hover:text-[#64748B] underline underline-offset-4"
                >
                  Step-by-Step Guide
                </Link>
                <Link
                  to="/8-step-journey"
                  className="font-mono font-semibold text-[#171F2C] hover:text-[#64748B] underline underline-offset-4"
                >
                  Full Journey
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              6. LEAD EXCHANGE IS NOT THE SAME AS BUYING LEAD LISTS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Crucial Distinction
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Lead Exchange Is Not the Same as Buying Lead Lists
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                This distinction is important. A traditional lead marketplace can involve buyers
                purchasing leads according to criteria such as industry, geography, volume or
                pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-2">
                  Traditional Lead Marketplaces
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Scraped &amp; Bulk Multi-Distributed Lists
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                  Operates around generic buyers and sellers exchanging commoditized contact
                  databases. Often results in cold outreach to unverified prospects without existing
                  intent.
                </p>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  High friction, low context
                </div>
              </div>

              <div className="p-5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-slate-300 uppercase mb-2">
                  The Relay Starting Point
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  A Business Already Has a Commercial Opportunity
                </h3>
                <p className="text-[13px] text-slate-300 leading-relaxed mb-3">
                  The question is:{" "}
                  <strong className="text-white">
                    &ldquo;Who else could legitimately pursue it?&rdquo;
                  </strong>{" "}
                  That makes Relay closer to a structured B2B lead-sharing and referral environment
                  than a generic lead-list marketplace.
                </p>
                <div className="text-xs font-mono text-slate-300 pt-2 border-t border-slate-700">
                  Organic business origin, high context
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
              <span>Learn about verification &amp; safeguards:</span>
              <Link
                to="/trust-and-safety"
                className="font-semibold text-[#171F2C] hover:text-[#64748B] underline underline-offset-4"
              >
                Trust &amp; Safety Overview
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              7. COMMON B2B LEAD EXCHANGE SCENARIOS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Real Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Common B2B Lead Exchange Scenarios
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Practical examples of commercial opportunities exchanged between operators:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Scenario 1: Agency */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 01
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    An agency gets a project outside its services
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A web agency receives a qualified request for a service it doesn&apos;t provide.
                    Rather than simply turning the prospect away, the agency can look for a
                    complementary business that can handle the requirement.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#171F2C]">
                    Possible outcome: referral or partnership
                  </span>
                  <Link
                    to="/agency-lead-exchange"
                    className="text-xs font-mono text-[#64748B] hover:text-[#171F2C] flex items-center gap-1"
                  >
                    <span>Agency Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Scenario 2: Software Company */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 02
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    A software company receives an implementation request
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A software vendor has a customer that needs implementation or integration
                    expertise beyond its internal team. The vendor can look for a specialist capable
                    of handling the requirement.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <span className="text-xs font-mono font-semibold text-[#171F2C]">
                    Possible outcome: implementation partnership
                  </span>
                </div>
              </div>

              {/* Scenario 3: Consultant */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 03
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    A consultant receives a request outside their specialty
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A client asks for a service that sits outside the consultant&apos;s area of
                    expertise. The consultant can look for another specialist while preserving the
                    possibility of a useful client relationship.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <span className="text-xs font-mono font-semibold text-[#171F2C]">
                    Possible outcome: referral relationship
                  </span>
                </div>
              </div>

              {/* Scenario 4: Geography */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Scenario 04
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    A business receives a lead outside its geography
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A company receives an enquiry from a market it doesn&apos;t currently serve.
                    Instead of discarding it, the company can look for an appropriate regional
                    counterpart.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <span className="text-xs font-mono font-semibold text-[#171F2C]">
                    Possible outcome: regional referral or channel relationship
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              8. WHAT MAKES A LEAD WORTH EXCHANGING?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Qualification Criteria
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Makes a Lead Worth Exchanging?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Not every enquiry makes sense as an exchange opportunity. A useful B2B lead
                generally has:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  A Real Business Need
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  There is an identifiable requirement rather than generic or exploratory curiosity.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">A Clear Fit</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Another business could reasonably provide the required service or capability.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">Enough Context</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A potential counterpart can understand the opportunity before deciding whether to
                  pursue it.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Commercial Relevance
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  There is a plausible referral, service, partnership or other business relationship
                  involved.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
              The goal isn&apos;t to pass around every contact you receive.{" "}
              <strong className="text-[#171F2C]">
                It&apos;s to surface opportunities that another business can realistically act on.
              </strong>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              9. FOR BUSINESSES THAT GENERATE LEADS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Supply Side
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                For Businesses That Generate Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay can help businesses that regularly receive enquiries outside their normal
                scope. That includes:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">Agencies</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Receive client projects you cannot fulfil internally due to scope or technical
                  requirements.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">Consultancies</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Encounter specialist domain requirements outside your firm&apos;s core advisory
                  practice.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">Software Companies</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Need implementation, integration, migration or specialized systems partners for
                  customer deals.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Professional Services Firms
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Receive corporate requests outside your practice area or jurisdictional licensing.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">B2B Service Providers</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Generate demand in geographies, time zones, or customer tiers you don&apos;t
                  currently cover.
                </p>
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex flex-col justify-center">
                <div className="text-[11px] font-mono text-[#64748B] uppercase mb-0.5">
                  Core Principle
                </div>
                <div className="text-xs font-semibold text-[#171F2C]">
                  You generated the opportunity, but you&apos;re not the right business to fulfil
                  it.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              10. FOR BUSINESSES LOOKING FOR LEADS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                  Demand Side
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                  For Businesses Looking for Leads
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                  <p>Lead exchange also works from the other side.</p>
                  <p>
                    Instead of only asking:{" "}
                    <strong className="text-[#171F2C]">
                      &ldquo;How do I generate more leads?&rdquo;
                    </strong>{" "}
                    a business can ask:{" "}
                    <strong className="text-[#171F2C]">
                      &ldquo;Which leads already exist that match what we do?&rdquo;
                    </strong>
                  </p>
                  <p>
                    That can create a different acquisition channel built around opportunities
                    originating from other businesses. Businesses can discover opportunities based
                    on their capabilities and decide which ones are worth pursuing.
                  </p>
                </div>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors"
                >
                  <span>Explore Existing Inbound Dealflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="lg:col-span-5">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                  <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider pb-2 border-b border-[#E2E8F0]">
                    Inbound Discovery Channel
                  </div>
                  <div className="text-xs text-[#64748B] space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>
                        Opportunities originated by businesses with direct prospect contact.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>Contextual details provided upfront before committing resources.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>
                        Direct discussions with originating operators to evaluate mutual fit.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              11. WHY EXCHANGE LEADS INSTEAD OF SIMPLY REJECTING THEM?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Value Retention
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why Exchange Leads Instead of Simply Rejecting Them?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
                Because a lead can be commercially relevant even when it isn&apos;t operationally
                relevant <strong className="text-[#171F2C]">to your company</strong>.
              </p>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
                Rejecting an opportunity may be the correct decision. But sometimes the better
                outcome is to find a business that can actually serve the need.
              </p>
              <p className="text-sm sm:text-base text-[#171F2C] font-semibold">
                That&apos;s where a structured lead exchange can be useful.
              </p>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              12. B2B LEAD EXCHANGE VS REFERRAL NETWORK
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Structural Comparison
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                B2B Lead Exchange vs. Referral Network
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                These concepts are related, but they aren&apos;t identical:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Lead Exchange
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Focuses on the Opportunity Itself
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                  <em>&ldquo;I have an opportunity I cannot fulfil.&rdquo;</em> Transaction-level
                  discovery and routing for individual inbound enquiries.
                </p>
                <div className="text-xs font-mono text-[#171F2C] pt-2 border-t border-[#E2E8F0]">
                  Single-deal resolution
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Referral Network
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Focuses on Ongoing Relationships
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                  <em>&ldquo;We regularly refer relevant opportunities to each other.&rdquo;</em>{" "}
                  Long-term strategic alignment between complementary service providers.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <Link
                    to="/b2b-referral-network"
                    className="text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] flex items-center gap-1"
                  >
                    <span>Explore B2B Referral Network</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Ecosystem Topic Mesh */}
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
              <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                Related Network Models &amp; Guides
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link
                  to="/b2b-opportunity-exchange"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Opportunity Exchange
                  </div>
                  <div className="text-xs text-[#64748B]">Broad parent ecosystem model</div>
                </Link>

                <Link
                  to="/b2b-partnership-network"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Partnership Network
                  </div>
                  <div className="text-xs text-[#64748B]">Co-selling &amp; distribution</div>
                </Link>

                <Link
                  to="/agency-lead-exchange"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Agency Lead Exchange
                  </div>
                  <div className="text-xs text-[#64748B]">Out-of-scope agency overflow</div>
                </Link>

                <Link
                  to="/how-to-exchange-business-leads"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Exchange Guide
                  </div>
                  <div className="text-xs text-[#64748B]">Practical operator instructions</div>
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              13. FAQ ACCORDION (SEO CRAWLER FRIENDLY)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Questions &amp; Answers
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
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    >
                      <span className="text-[14px] font-semibold text-[#171F2C]">{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ml-3",
                          isOpen && "rotate-180 text-[#171F2C]",
                        )}
                      />
                    </button>
                    {/* Rendered in HTML for search engines and crawlers regardless of client toggle */}
                    <div
                      className={cn(
                        "px-4 pb-4 pt-1 text-[13px] text-[#64748B] border-t border-[#E2E8F0] leading-relaxed",
                        !isOpen && "hidden",
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
              14. FINAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                The Relay
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Don&apos;t Discard a Lead Just Because You Can&apos;t Fulfil It.
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Your business doesn&apos;t have to deliver every opportunity it receives. Sometimes
                the right move is to find the business that can.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Post an Opportunity
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Explore Opportunities
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
