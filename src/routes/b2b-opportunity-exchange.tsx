import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Building2,
  ShieldCheck,
  Lock,
  Handshake,
  Share2,
  Network,
  Users,
  Briefcase,
  Sparkles,
  ArrowLeftRight,
  TrendingUp,
  Compass,
  Layers,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/b2b-opportunity-exchange")({
  head: () =>
    createSeoMeta({
      title: "B2B Opportunity Exchange — The Relay",
      description:
        "Exchange B2B commercial opportunities with verified businesses. Discover referrals, partnerships, distribution opportunities and leads your business can act on.",
      path: "/b2b-opportunity-exchange",
    }),
  component: B2BOpportunityExchangePage,
});

export function B2BOpportunityExchangePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/b2b-opportunity-exchange#webpage`,
        url: `${SITE_URL}/b2b-opportunity-exchange`,
        name: "B2B Opportunity Exchange — The Relay",
        description:
          "Exchange B2B commercial opportunities with verified businesses. Discover referrals, partnerships, distribution opportunities and leads your business can act on.",
        breadcrumb: {
          "@id": `${SITE_URL}/b2b-opportunity-exchange#breadcrumb`,
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
        "@id": `${SITE_URL}/b2b-opportunity-exchange#breadcrumb`,
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
            name: "Solutions",
            item: `${SITE_URL}/solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "B2B Opportunity Exchange",
            item: `${SITE_URL}/b2b-opportunity-exchange`,
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
      q: "What is a B2B opportunity exchange?",
      a: "A B2B opportunity exchange is a structured environment where businesses share and discover commercial opportunities that other businesses may be able to pursue, including referrals, partnerships, distribution opportunities, vendor needs and business leads.",
    },
    {
      q: "Is a B2B opportunity exchange the same as a lead marketplace?",
      a: "Not necessarily. A lead marketplace typically focuses on buying, selling or distributing leads. An opportunity exchange can cover a broader range of commercial relationships, including referrals, partnerships, distribution and vendor relationships.",
    },
    {
      q: "Can I post a lead that my business cannot fulfil?",
      a: "Yes. That's one of the use cases Relay is designed for. A business can surface an opportunity that falls outside its capabilities, capacity or scope and allow another relevant business to express interest.",
    },
    {
      q: "Is Relay a social network?",
      a: "No. Relay is designed around commercial opportunities rather than social feeds, follower counts or content engagement.",
    },
    {
      q: "Does Relay guarantee that an opportunity will convert?",
      a: "No. Relay facilitates discovery and the path toward a commercial relationship, but the participating businesses determine whether an opportunity is suitable and whether they ultimately reach an agreement.",
    },
  ];

  const exchangeTypes = [
    {
      title: "Referrals",
      desc: "Pass relevant customers or business opportunities to complementary providers.",
      href: "/b2b-referral-network",
      subHref: "/referral-partnerships",
      subLabel: "Referral Partnerships Guide",
      icon: Handshake,
    },
    {
      title: "Partnerships",
      desc: "Find businesses for co-selling, collaboration, integrations or other strategic relationships.",
      href: "/b2b-partnership-network",
      subHref: "/channel-partnerships",
      subLabel: "Channel Partnerships Guide",
      icon: Network,
    },
    {
      title: "Distribution",
      desc: "Discover businesses that can help take products or services into new markets or channels.",
      href: "/distribution-partners",
      subHref: "/distribution-partners",
      subLabel: "Distribution Partners Hub",
      icon: Compass,
    },
    {
      title: "Vendor opportunities",
      desc: "Find businesses with capabilities your company or customers need.",
      href: "/opportunities",
      subHref: "/opportunities",
      subLabel: "Explore Listings",
      icon: Briefcase,
    },
    {
      title: "Business leads",
      desc: "Surface qualified opportunities that your company cannot fulfil but another business may be able to pursue.",
      href: "/b2b-lead-exchange",
      subHref: "/agency-lead-exchange",
      subLabel: "Agency Lead Exchange",
      icon: ArrowLeftRight,
    },
  ];

  const workflows = [
    {
      num: "01",
      title: "Verify",
      desc: "Verify your business identity and establish verified platform status before transacting.",
    },
    {
      num: "02",
      title: "Post",
      desc: "Publish a blinded commercial requirement with explicit exchange parameters.",
    },
    {
      num: "03",
      title: "Discover",
      desc: "Discover verified opportunities matching your industry, capabilities, and geography.",
    },
    {
      num: "04",
      title: "Express Interest",
      desc: "Propose a structured reciprocal offer or commercial terms to the listing owner.",
    },
    {
      num: "05",
      title: "Acknowledge",
      desc: "The listing creator reviews your incoming proposal and confirms operational interest.",
    },
    {
      num: "06",
      title: "Negotiate",
      desc: "Both counterparties discuss fit, refine commercial terms, and align on delivery scope.",
    },
    {
      num: "07",
      title: "Agree",
      desc: "Lock bilateral terms in a structured deal memo before identities unmask.",
    },
    {
      num: "08",
      title: "Handshake",
      desc: "Secure client consent and execute the warm executive introduction directly.",
    },
  ];

  const audienceCategories = [
    {
      title: "Agencies",
      desc: "Receive projects outside your core services and find businesses that can fulfil them.",
      link: "/agency-lead-exchange",
      linkLabel: "Agency Lead Exchange →",
    },
    {
      title: "Consultants",
      desc: "Build relationships with specialists whose capabilities complement your own.",
      link: "/b2b-referral-network",
      linkLabel: "Referral Network →",
    },
    {
      title: "Software companies",
      desc: "Find referral, implementation, integration and distribution opportunities.",
      link: "/b2b-partnership-network",
      linkLabel: "Partnership Network →",
    },
    {
      title: "Professional service firms",
      desc: "Exchange relevant business opportunities with complementary providers.",
      link: "/referral-partnerships",
      linkLabel: "Referral Partnerships →",
    },
    {
      title: "Founders and operators",
      desc: "Discover commercial relationships that may not surface through your existing network.",
      link: "/opportunities",
      linkLabel: "Explore Opportunities →",
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
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
          {/* Breadcrumb Strip */}
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]">
              <li>
                <Link to="/" className="hover:text-[#171F2C] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li>
                <Link to="/solutions" className="hover:text-[#171F2C] transition-colors">
                  Solutions
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold" aria-current="page">
                B2B Opportunity Exchange
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              HERO SECTION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative pt-4 pb-12 border-b border-[#E2E8F0]">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#171F2C] rounded-[4px]">
                <span className="text-[11px] font-mono font-semibold text-[#171F2C] uppercase tracking-[0.04em]">
                  The Governed Commercial Protocol
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171F2C] tracking-[-0.02em] leading-[1.12]">
                The B2B Opportunity Exchange for Commercial Relationships
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
                <p>Every business receives opportunities it cannot pursue.</p>
                <p>
                  A project may fall outside your capabilities. A customer may need a service you
                  don't offer. Your team may be at capacity. A potential partnership may make more
                  sense for another company in your network.
                </p>
                <p className="font-semibold text-[#171F2C] border-l-2 border-[#171F2C] pl-4 py-0.5">
                  The Relay gives businesses a structured way to exchange those opportunities with
                  other verified businesses.
                </p>
                <p className="text-sm sm:text-base text-[#64748B]">
                  Discover opportunities that fit your business. Express interest. Discuss the
                  relationship. Share the relevant information only when both sides are ready.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#1E293B] text-white border border-[#171F2C] px-6 py-3 text-[13px] font-mono uppercase tracking-[0.04em] font-semibold transition-all rounded-[4px]"
                >
                  Post an Opportunity
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0] hover:border-[#171F2C] px-6 py-3 text-[13px] font-mono uppercase tracking-[0.04em] font-semibold transition-all rounded-[4px]"
                >
                  Explore Opportunities
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: WHAT IS A B2B OPPORTUNITY EXCHANGE?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Category Definition
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                What is a B2B opportunity exchange?
              </h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed">
                <p className="text-base sm:text-lg">
                  A{" "}
                  <strong className="text-[#171F2C] font-semibold">B2B opportunity exchange</strong>{" "}
                  is a structured environment where businesses can share commercial opportunities
                  with other businesses that may be able to pursue them.
                </p>
                <p>
                  Instead of every business opportunity ending in either{" "}
                  <strong className="text-[#171F2C] font-semibold">"we'll take it"</strong> or{" "}
                  <strong className="text-[#171F2C] font-semibold">"we can't help,"</strong> there
                  is another option:
                </p>
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <p className="text-lg font-bold text-[#171F2C]">Find a business that can.</p>
                </div>
                <p>
                  That could mean referring a customer to a complementary provider, finding a
                  partner for a project, discovering a distribution relationship, locating a vendor,
                  or passing an opportunity to another business because it falls outside your
                  current scope.
                </p>
                <p className="font-semibold text-[#171F2C]">
                  The Relay is built around that exchange.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: TURN OPPORTUNITIES YOU CANNOT PURSUE INTO FIT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Everyday Scenarios
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                Turn opportunities you cannot pursue into opportunities someone else can
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                Businesses regularly encounter commercial demand that doesn't fit their current
                operation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scenario 1 */}
              <div className="p-6 bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-colors rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-[#171F2C]">
                  <Briefcase className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-base">
                    An agency receives the wrong type of project
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  The client is genuine and the project is valuable, but the required capability
                  isn't part of the agency's service offering.
                </p>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Instead of simply declining it, the opportunity can be surfaced to a business that
                  provides the required service.
                </p>
                <Link
                  to="/agency-lead-exchange"
                  className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C] hover:underline pt-2"
                >
                  Agency Lead Exchange Guide →
                </Link>
              </div>

              {/* Scenario 2 */}
              <div className="p-6 bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-colors rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-[#171F2C]">
                  <Users className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-base">
                    A customer needs a complementary service
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  A company may be able to solve one part of a customer's problem while another
                  business is better suited to solve the next part.
                </p>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  The opportunity can become a referral or partnership instead of a dead end.
                </p>
                <Link
                  to="/b2b-referral-network"
                  className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C] hover:underline pt-2"
                >
                  B2B Referral Network →
                </Link>
              </div>

              {/* Scenario 3 */}
              <div className="p-6 bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-colors rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-[#171F2C]">
                  <Compass className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-base">
                    A business needs help entering a new market
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  A company may have the product but lack distribution, local expertise,
                  implementation capability or channel relationships.
                </p>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Finding the right business partner can turn that gap into a commercial
                  opportunity.
                </p>
                <Link
                  to="/distribution-partners"
                  className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C] hover:underline pt-2"
                >
                  Distribution Partnerships →
                </Link>
              </div>

              {/* Scenario 4 */}
              <div className="p-6 bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-colors rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-[#171F2C]">
                  <Network className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-base">
                    A partnership opportunity doesn't fit right now
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  The opportunity may be valuable but poorly timed, geographically unsuitable or
                  outside the company's current priorities.
                </p>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Another business may be better positioned to pursue it.
                </p>
                <Link
                  to="/b2b-partnership-network"
                  className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C] hover:underline pt-2"
                >
                  Partnership Network →
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: WHAT CAN BUSINESSES EXCHANGE ON RELAY?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="max-w-3xl space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Supported Arrangements
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                What can businesses exchange on Relay?
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                The Relay isn't limited to one type of lead. Businesses can use the exchange for
                different types of commercial relationships, including:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exchangeTypes.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-colors rounded-[4px] flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="w-9 h-9 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#171F2C]">{item.title}</h3>
                      <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono">
                      <Link
                        to={item.href as any}
                        className="font-bold text-[#171F2C] hover:underline"
                      >
                        Explore →
                      </Link>
                      {item.subHref && (
                        <Link
                          to={item.subHref as any}
                          className="text-[#64748B] hover:text-[#171F2C] transition-colors"
                        >
                          {item.subLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs font-mono text-[#64748B] pt-2">
              The specific commercial arrangement is decided by the businesses involved.
            </p>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: HOW A B2B OPPORTUNITY EXCHANGE WORKS (01-07)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Core Mechanism
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                How a B2B opportunity exchange works
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                The Relay keeps the process structured around the opportunity rather than around
                social networking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflows.map((step) => (
                <div
                  key={step.num}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-2 shadow-2xs"
                >
                  <span className="text-xl font-mono font-bold text-[#171F2C]">{step.num}</span>
                  <h3 className="font-bold text-[#171F2C] text-sm">{step.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* 8-Step Complete Workflow Link Strip */}
            <div className="p-5 bg-[#171F2C] text-white rounded-[4px] border border-[#171F2C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F97316]">
                  Complete Operational Specification
                </span>
                <h3 className="font-bold text-sm text-white">
                  Want the detailed step-by-step breakdown?
                </h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Read the complete architecture from origin posting and consensus to bilateral
                  handshake execution.
                </p>
              </div>
              <Link
                to="/8-step-journey"
                className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#171F2C] px-5 py-2.5 rounded-[4px] text-xs font-mono font-bold uppercase tracking-[0.04em] transition-colors"
              >
                <span>The 8-Step Relay Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: OPPORTUNITY EXCHANGE VS LEAD LIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="p-8 bg-white border border-[#E2E8F0] rounded-[4px] space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Intent vs. Scraping
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                An opportunity exchange is different from a lead list
              </h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed text-sm sm:text-base">
                <p>A lead list gives you contacts.</p>
                <p className="text-lg font-bold text-[#171F2C]">
                  An opportunity exchange starts with commercial intent.
                </p>
                <p>
                  That distinction matters. A business opportunity can carry context about what is
                  needed, what type of capability is relevant and what kind of relationship may make
                  sense.
                </p>
                <p>
                  The Relay is designed around that context and the businesses' decision to engage.
                </p>
                <p className="text-xs sm:text-sm font-mono text-[#64748B] bg-[#F8FAFC] p-3.5 border border-[#E2E8F0] rounded-[4px]">
                  It's not intended to be a directory of random contacts or a feed of promotional
                  posts.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: BUILT FOR BUSINESSES THAT CREATE & RECEIVE OPPORTUNITIES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Audience & Operator Profiles
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                Built for businesses that create and receive commercial opportunities
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                Relay can be useful for businesses that regularly work through partners, referrals
                or complementary providers. That includes:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audienceCategories.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-colors rounded-[4px] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#171F2C] text-base">{item.title}</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                  </div>
                  <Link
                    to={item.link as any}
                    className="text-xs font-mono font-bold text-[#171F2C] hover:underline pt-2 border-t border-[#E2E8F0]"
                  >
                    {item.linkLabel}
                  </Link>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border border-[#171F2C] rounded-[4px]">
              <p className="text-xs sm:text-sm font-semibold text-[#171F2C]">
                The common factor is simple: Your business has commercial relationships worth
                exchanging.
              </p>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: WHY USE AN OPPORTUNITY EXCHANGE INSTEAD OF SOCIAL MEDIA?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Zero Noise Protocol
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                Why use an opportunity exchange instead of social media?
              </h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed">
                <p>Social platforms are designed around people, content and engagement.</p>
                <p className="text-lg font-bold text-[#171F2C]">
                  Relay is designed around commercial opportunities.
                </p>
                <p>
                  There is no requirement to build an audience, publish content every day or compete
                  for attention in a feed.
                </p>
                <p className="font-semibold text-[#171F2C]">The objective is more direct:</p>
                <ul className="space-y-2 text-sm text-[#171F2C] pl-2 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#171F2C]" />
                    <span>Find something relevant.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#171F2C]" />
                    <span>Express interest.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#171F2C]" />
                    <span>Connect around the opportunity.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#171F2C]" />
                    <span>Decide whether there is a business relationship worth pursuing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: THE RELAY OPPORTUNITY EXCHANGE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="p-8 bg-white border border-[#E2E8F0] rounded-[4px] space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Governance & Facilitation
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                The Relay opportunity exchange
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                The Relay combines opportunity discovery with a structured path toward a commercial
                relationship. Businesses can:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C]">
                    Publish
                  </span>
                  <p className="text-xs text-[#64748B]">
                    Opportunities you want another business to pursue.
                  </p>
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C]">
                    Discover
                  </span>
                  <p className="text-xs text-[#64748B]">
                    Opportunities relevant to your capabilities.
                  </p>
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C]">
                    Express interest
                  </span>
                  <p className="text-xs text-[#64748B]">
                    Without immediately exposing sensitive underlying client information.
                  </p>
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#171F2C]">
                    Discuss & Agree
                  </span>
                  <p className="text-xs text-[#64748B]">
                    Evaluate commercial fit and decide how to proceed.
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#171F2C] pt-2">
                The platform facilitates the process. The businesses decide what relationship they
                actually want.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <Link to="/trust-and-safety" className="text-[#171F2C] hover:underline font-bold">
                  Trust & Safety Architecture →
                </Link>
                <Link to="/insights" className="text-[#171F2C] hover:underline font-bold">
                  Operator Insights Hub →
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: WHAT MAKES AN OPPORTUNITY WORTH EXCHANGING?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Quality Criteria
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                What makes an opportunity worth exchanging?
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                Not every lead belongs on an opportunity exchange. A useful opportunity usually has
                some combination of:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-sm">A defined business need</h3>
                </div>
                <p className="text-xs text-[#64748B] pl-6">Someone actually needs something.</p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-sm">A potential business fit</h3>
                </div>
                <p className="text-xs text-[#64748B] pl-6">
                  Another company could realistically fulfil that need.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-sm">Commercial relevance</h3>
                </div>
                <p className="text-xs text-[#64748B] pl-6">
                  There is a possible referral, project, partnership, distribution or vendor
                  relationship.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <h3 className="font-bold text-[#171F2C] text-sm">
                    Enough context to evaluate it
                  </h3>
                </div>
                <p className="text-xs text-[#64748B] pl-6">
                  The receiving business can understand the opportunity without requiring
                  unnecessary disclosure upfront.
                </p>
              </div>
            </div>

            <p className="text-xs font-mono text-[#64748B]">
              That's why Relay focuses on structured opportunities rather than simply collecting
              contact details.
            </p>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: FREQUENTLY ASKED QUESTIONS (SEO DOM-PRESERVED)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Clarifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171F2C] tracking-[-0.015em]">
                Frequently asked questions
              </h2>
            </div>

            <div className="space-y-3 max-w-4xl">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E2E8F0] bg-white rounded-[4px] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      type="button"
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#171F2C]">{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180 text-[#171F2C]",
                        )}
                      />
                    </button>

                    {/* DOM-Preserved for Search Crawlers with CSS-driven expansion */}
                    <div
                      className={cn(
                        "grid transition-all duration-200 ease-in-out px-5",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 pb-5 pt-1 border-t border-[#E2E8F0]"
                          : "grid-rows-[0fr] opacity-0 pointer-events-none",
                      )}
                    >
                      <div className="overflow-hidden text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 12: FINAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="p-8 sm:p-12 bg-[#171F2C] text-white rounded-[4px] border border-[#171F2C] space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#94A3B8]">
                Start Exchanging
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[-0.02em] leading-tight">
                Don't let a good opportunity stop at "we don't do that."
              </h2>
              <div className="space-y-3 text-[#E2E8F0] text-sm sm:text-base leading-relaxed">
                <p>Some opportunities aren't wrong for your business.</p>
                <p className="text-white font-bold">
                  They're simply better suited to another business.
                </p>
                <p>
                  The Relay gives you a structured way to exchange those opportunities and discover
                  commercial relationships that fit what you can actually do.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] border border-white px-6 py-3 text-[13px] font-mono uppercase tracking-[0.04em] font-semibold transition-all rounded-[4px]"
                >
                  Post an Opportunity
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white px-6 py-3 text-[13px] font-mono uppercase tracking-[0.04em] font-semibold transition-all rounded-[4px]"
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
