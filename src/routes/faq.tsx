import { useState, useMemo, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Lock,
  ArrowLeftRight,
  FileCheck,
  Gavel,
  FileText,
  ListChecks,
  SearchX,
  ArrowDown,
  X,
  BadgeCheck,
  ShieldAlert,
  Scale,
  Sparkles,
  Network,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    createSeoMeta({
      title: "B2B Opportunity Exchange FAQ — The Relay",
      description:
        "Get answers about The Relay, B2B opportunity exchange, lead exchange, referral partnerships, business verification, consent, commercial relationships, and how the platform works.",
      path: "/faq",
    }),
  component: FAQPage,
});

type CategoryKey = "all" | "basics" | "protocol" | "verification" | "commercial";

interface FAQItem {
  id: string;
  qNum: string;
  group: Exclude<CategoryKey, "all">;
  sectionName: string;
  sectionNum: string;
  question: string;
  answer: React.ReactNode;
  tags: string[];
}

const FAQ_DATA: FAQItem[] = [
  // SECTION 1: B2B Opportunity Exchange Basics
  {
    id: "relay-what-is",
    qNum: "Q.01",
    group: "basics",
    sectionName: "B2B Opportunity Exchange Basics",
    sectionNum: "Section 01",
    question: "What is The Relay's B2B opportunity exchange?",
    answer: (
      <p>
        The Relay is a{" "}
        <strong className="text-[#171F2C] font-semibold">
          Consent-Driven Opportunity Exchange (CDOE)
        </strong>
        . It is an institutional, verified commercial network engineered specifically for
        operating B2B enterprises to monetize unserviceable inbound demand, transfer
        out-of-scope commercial opportunities, and source verified referral and distribution partners—without cold
        outreach, scraping, or unwanted sales spam.
      </p>
    ),
    tags: ["relay", "what is", "b2b opportunity exchange", "cdoe", "concept", "lead exchange", "monetize", "out of scope"],
  },
  {
    id: "two-engines-breakdown",
    qNum: "Q.02",
    group: "basics",
    sectionName: "B2B Opportunity Exchange Basics",
    sectionNum: "Section 01",
    question: "What are the two engines of The Relay's B2B opportunity exchange?",
    answer: (
      <div className="space-y-2.5">
        <p>
          <strong className="text-[#171F2C] font-semibold">Engine 01 (Exchange):</strong> Operates
          as a transactional opportunity market. When your organization receives inbound requests
          you cannot service (due to sub-threshold budget, geographic limitations, tech-stack
          conflicts, or capacity exhaustion), you publish blinded deal teasers. Pre-vetted
          counterparties tender contracted rev-shares, reciprocal qualified referrals, or specialist
          barters to take over the client.
        </p>
        <p>
          <strong className="text-[#171F2C] font-semibold">Engine 02 (Discover):</strong> Operates
          as a strategic partner directory. Enterprises identify and initiate bilateral discussions
          with verified peer organizations for programmatic reseller agreements, co-marketing,
          corporate procurement, and agency-to-agency syndication.
        </p>
      </div>
    ),
    tags: ["two engines", "exchange", "discover", "reciprocal", "referral partnerships", "barter", "b2b opportunity exchange"],
  },
  {
    id: "lead-gen-vs-broker",
    qNum: "Q.03",
    group: "basics",
    sectionName: "B2B Opportunity Exchange Basics",
    sectionNum: "Section 01",
    question: "Is The Relay a lead generation or broker tool?",
    answer: (
      <p>
        <strong className="text-[#171F2C] font-semibold">Categorically no.</strong> Traditional lead
        brokers scrape public rosters and broadcast unqualified contacts to multiple bidding
        parties. The Relay is an institutional infrastructure layer facilitating 1-to-1 bilateral
        agreements. Neither company's brand identity, contact executives, or underlying lead records
        are exposed until mutual covenants and commercial terms are executed.
      </p>
    ),
    tags: ["lead generation", "broker", "scrape", "spam", "data privacy", "cold outreach", "b2b lead exchange"],
  },
  {
    id: "social-network-comparison",
    qNum: "Q.04",
    group: "basics",
    sectionName: "B2B Opportunity Exchange Basics",
    sectionNum: "Section 01",
    question: "Is The Relay a social network?",
    answer: (
      <p>
        <strong className="text-[#171F2C] font-semibold">No.</strong> There are no followers, likes,
        vanity metrics, or algorithmic feeds. Every interaction revolves around a concrete, high-intent
        commercial brief with measurable economic value and bilateral non-circumvention terms.
      </p>
    ),
    tags: ["social network", "feed", "vanity metrics", "algorithm", "commercial brief", "b2b business network"],
  },

  // SECTION 2: How The B2B Opportunity Exchange Works
  {
    id: "four-stage-lifecycle",
    qNum: "Q.05",
    group: "protocol",
    sectionName: "How The B2B Opportunity Exchange Works",
    sectionNum: "Section 02",
    question: "How does the exchange lifecycle work in The Relay?",
    answer: (
      <div className="space-y-3">
        <p>All deal routing strictly complies with the bilateral CDOE sequence:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-[4px] border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#171F2C]">Stage 1: Acknowledgement</div>
            <div className="text-xs text-[#64748B] mt-0.5">
              Counterparty verifies initial interest; blinded metadata shared.
            </div>
          </div>
          <div className="bg-white p-3 rounded-[4px] border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#171F2C]">Stage 2: Negotiation</div>
            <div className="text-xs text-[#64748B] mt-0.5">
              Counter-proposals on rev-share %, upfront baseline, or barter terms.
            </div>
          </div>
          <div className="bg-white p-3 rounded-[4px] border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#171F2C]">Stage 3: Agreement</div>
            <div className="text-xs text-[#64748B] mt-0.5">
              Dual digital ratification of non-circumvention terms.
            </div>
          </div>
          <div className="bg-white p-3 rounded-[4px] border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#171F2C]">Stage 4: Handshake</div>
            <div className="text-xs text-[#64748B] mt-0.5">
              Mutual cryptographic identity reveal and out-of-band delivery.
            </div>
          </div>
        </div>
      </div>
    ),
    tags: [
      "stages",
      "lifecycle",
      "how the relay works",
      "acknowledgement",
      "negotiation",
      "agreement",
      "handshake",
      "bilateral",
    ],
  },
  {
    id: "express-interest-action",
    qNum: "Q.06",
    group: "protocol",
    sectionName: "How The B2B Opportunity Exchange Works",
    sectionNum: "Section 02",
    question: 'What happens when a business clicks "Express Interest"?',
    answer: (
      <p>
        Triggering <strong className="text-[#171F2C] font-semibold">Express Interest</strong>{" "}
        transmits a formal, blinded economic proposal to the opportunity creator. You specify your
        trade terms—such as your preferred revenue-share percentage (e.g., 10%–25% on closed contract),
        an immediate reciprocal referral exchange, or specialized agency services. The recipient reviews your
        attested tier and track record, choosing to either accept into Stage 1, decline quietly
        without reputation penalty, or submit a counter-offer.
      </p>
    ),
    tags: ["express interest", "proposal terms", "counter offer", "opportunity sharing", "how the relay works"],
  },
  {
    id: "direct-messaging-spam",
    qNum: "Q.07",
    group: "protocol",
    sectionName: "How The B2B Opportunity Exchange Works",
    sectionNum: "Section 02",
    question: "Does The Relay have direct messaging or unsolicited outreach?",
    answer: (
      <p>
        <strong className="text-[#171F2C] font-semibold">No.</strong> There are zero unsolicited
        DMs, cold outreach campaigns, or public message boards. The Relay operates purely as an institutional deal
        arbitrage protocol. Once mutual handshake terms are finalized in Stage 4, counterparties
        communicate directly through their authenticated corporate channels.
      </p>
    ),
    tags: ["direct messaging", "spam", "cold outreach", "dms", "authenticated channels", "b2b business network"],
  },
  {
    id: "getting-started-flow",
    qNum: "Q.08",
    group: "protocol",
    sectionName: "How The B2B Opportunity Exchange Works",
    sectionNum: "Section 02",
    question: "How do businesses get started on The Relay?",
    answer: (
      <p>
        You can immediately explore live commercial opportunities on the board or post an opportunity brief.
        Verified member organizations can propose terms and execute handshakes instantly. Onboarding takes less
        than 2 minutes to verify your corporate domain and business identity.
      </p>
    ),
    tags: ["getting started", "how to start", "explore", "post brief", "onboarding", "how the relay works"],
  },

  // SECTION 3: B2B Opportunity Privacy, Verification & Disclosure
  {
    id: "why-blinded-initially",
    qNum: "Q.09",
    group: "verification",
    sectionName: "B2B Opportunity Privacy, Verification & Disclosure",
    sectionNum: "Section 03",
    question: "Why is company identity blinded during initial discovery?",
    answer: (
      <p>
        Blinded discovery protects deal pipeline discretion and enterprise intellectual property.
        Counterparties only see your verified industry vertical, accredited turnover bracket, and
        geographic footprint—not corporate trademarks or individual executive names. This ensures
        discussions are evaluated purely on economic synergy and deal merit, preventing market
        front-running or leaked competitive intelligence.
      </p>
    ),
    tags: [
      "blinded mode",
      "opportunity privacy",
      "anonymized",
      "reputation",
      "deal confidentiality",
      "intellectual property",
    ],
  },
  {
    id: "verification-audits-kyb",
    qNum: "Q.10",
    group: "verification",
    sectionName: "B2B Opportunity Privacy, Verification & Disclosure",
    sectionNum: "Section 03",
    question: "How does B2B business verification work on The Relay?",
    answer: (
      <p>
        Every applicant is audited against statutory corporate registries (Know Your Business -
        KYB), Global Legal Entity Identifier (GLEIF LEI) databases, and authorized corporate email
        DNS records (DMARC/DKIM validation). Sole proprietors, shell entities, and automated scrapers
        are permanently prevented from accessing the opportunity pool.
      </p>
    ),
    tags: ["business verification", "b2b business verification", "kyb", "lei", "corporate domain", "vetting"],
  },
  {
    id: "identity-protection-details",
    qNum: "Q.11",
    group: "verification",
    sectionName: "B2B Opportunity Privacy, Verification & Disclosure",
    sectionNum: "Section 03",
    question: "How does The Relay protect company identity and opportunity privacy?",
    answer: (
      <p>
        Every opportunity posted on Relay is double-blind by default. Your company name, contact
        details, and sensitive parameters remain masked. Only when you explicitly review and accept
        an inbound match does Relay facilitate the Step 08 Handshake to unmask executive contact
        details under bilateral non-circumvention terms.
      </p>
    ),
    tags: ["identity protection", "double blind", "masking", "opportunity privacy", "mutual consent", "handshake"],
  },
  {
    id: "membership-eligibility",
    qNum: "Q.12",
    group: "verification",
    sectionName: "B2B Opportunity Privacy, Verification & Disclosure",
    sectionNum: "Section 03",
    question: "Who is eligible to join The Relay's B2B business network?",
    answer: (
      <p>
        The Relay is strictly reserved for operating B2B businesses, SaaS enterprises, specialized
        agencies, and verified enterprise leaders. Every entity undergoes automated and desk
        verification against business registries and corporate domain identity.
      </p>
    ),
    tags: ["who can join", "eligibility", "b2b business network", "saas", "agencies", "enterprise leaders"],
  },

  // SECTION 4: B2B Commercial Terms, Partnerships & Covenants
  {
    id: "enforce-agreements-covenants",
    qNum: "Q.13",
    group: "commercial",
    sectionName: "B2B Commercial Terms, Partnerships & Covenants",
    sectionNum: "Section 04",
    question: "How does The Relay enforce commercial agreements and covenants?",
    answer: (
      <p>
        Transactions on The Relay are governed by standard institutional bilateral non-circumvention
        (NCND) master agreements, executed digitally prior to identity reveal. In the event of contract breach or
        circumvention, verifiable cryptographic handshake logs are admissible for expedited
        arbitration under International Chamber of Commerce (ICC) commercial covenants.
      </p>
    ),
    tags: [
      "legal covenants",
      "non circumvention",
      "nda",
      "enforcement",
      "commercial partnerships",
      "arbitration",
      "icc",
    ],
  },
  {
    id: "pricing-and-fees",
    qNum: "Q.14",
    group: "commercial",
    sectionName: "B2B Commercial Terms, Partnerships & Covenants",
    sectionNum: "Section 04",
    question: "What does it cost to use The Relay?",
    answer: (
      <p>
        Platform access operates on an institutional enterprise subscription with transparent
        basis-point exchange fees on successfully settled cash revenue-shares. Pure reciprocal trades
        and client swaps carry no settlement charges. Detailed tiered plans are presented following
        successful KYB attestation.
      </p>
    ),
    tags: ["cost", "fees", "commercial terms", "price", "membership", "b2b opportunity exchange"],
  },
  {
    id: "reciprocal-terms-revshare",
    qNum: "Q.15",
    group: "commercial",
    sectionName: "B2B Commercial Terms, Partnerships & Covenants",
    sectionNum: "Section 04",
    question: "How do reciprocal exchanges, referral partnerships, and revenue shares work?",
    answer: (
      <p>
        When proposing on an opportunity, businesses structure reciprocal parity terms—such as a
        10%–25% contract fee on closed business, direct reciprocal lead trades, or specialized
        technical barter. Both parties mutually sign off on terms before any executive contact information is
        exchanged.
      </p>
    ),
    tags: ["reciprocal exchanges", "referral partnerships", "revenue shares", "b2b commercial partnerships", "b2b lead exchange"],
  },
];

const SECTIONS = [
  { group: "basics" as const, num: "Section 01", title: "B2B Opportunity Exchange Basics" },
  { group: "protocol" as const, num: "Section 02", title: "How The B2B Opportunity Exchange Works" },
  { group: "verification" as const, num: "Section 03", title: "B2B Opportunity Privacy, Verification & Disclosure" },
  { group: "commercial" as const, num: "Section 04", title: "B2B Commercial Terms, Partnerships & Covenants" },
];

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CategoryKey>("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "relay-what-is": true,
  });

  const faqContainerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const applyQuickFilter = (filterKey: CategoryKey) => {
    setSelectedFilter(filterKey);
    if (faqContainerRef.current) {
      faqContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
  };

  // Filter questions based on query and category filter
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FAQ_DATA.filter((item) => {
      const matchesFilter = selectedFilter === "all" || item.group === selectedFilter;
      if (!matchesFilter) return false;

      if (!q) return true;

      const questionMatch = item.question.toLowerCase().includes(q);
      const tagMatch = item.tags.some((t) => t.toLowerCase().includes(q));
      const sectionMatch = item.sectionName.toLowerCase().includes(q);

      return questionMatch || tagMatch || sectionMatch;
    });
  }, [searchQuery, selectedFilter]);

  const totalVisibleCount = filteredData.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/faq#webpage`,
        url: `${SITE_URL}/faq`,
        name: "B2B Opportunity Exchange FAQ — The Relay",
        description:
          "Get answers about The Relay, B2B opportunity exchange, lead exchange, referral partnerships, business verification, consent, commercial relationships, and how the platform works.",
        breadcrumb: {
          "@id": `${SITE_URL}/faq#breadcrumb`,
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
        "@id": `${SITE_URL}/faq#breadcrumb`,
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
            name: "Platform",
            item: `${SITE_URL}/solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "FAQ",
            item: `${SITE_URL}/faq`,
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171F2C] font-sans antialiased selection:bg-[#171F2C] selection:text-white flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full flex-1 pt-6 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* ═══════════════════════════════════════════════════════════════════
              BREADCRUMB & HERO HEADER
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2.5">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]"
              >
                <Link to="/" className="hover:text-[#171F2C] transition-colors">
                  Platform
                </Link>
                <span className="text-[#94A3B8]">/</span>
                <span className="text-[#64748B]">Knowledge Base</span>
                <span className="text-[#94A3B8]">/</span>
                <span className="text-[#171F2C] font-bold">FAQ &amp; Protocol Standards</span>
              </nav>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18]">
                B2B Opportunity Exchange FAQ
              </h1>

              <p className="text-xs font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Frequently Asked Questions &amp; Governance Guidance
              </p>

              <p className="text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed">
                This B2B opportunity exchange FAQ answers common questions about The Relay, including{" "}
                <Link to="/b2b-opportunity-exchange" className="text-[#171F2C] underline hover:text-[#000000]">
                  opportunity exchange
                </Link>
                ,{" "}
                <Link to="/b2b-lead-exchange" className="text-[#171F2C] underline hover:text-[#000000]">
                  lead exchange
                </Link>
                ,{" "}
                <Link to="/referral-partnerships" className="text-[#171F2C] underline hover:text-[#000000]">
                  referral partnerships
                </Link>
                ,{" "}
                <Link to="/trust-and-safety" className="text-[#171F2C] underline hover:text-[#000000]">
                  business verification
                </Link>
                , consent, privacy, and the platform workflow.
              </p>
            </div>

            {/* Quick Status Metric Widget */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-white p-4 rounded-[4px] border border-[#E2E8F0] flex items-center justify-between gap-6 w-full lg:w-auto">
                <div>
                  <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                    Protocol Standard
                  </div>
                  <div className="text-sm text-[#171F2C] font-bold mt-0.5">
                    CDOE v2.4 Compliant
                  </div>
                </div>
                <div className="h-8 w-px bg-[#E2E8F0]"></div>
                <div>
                  <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                    Network Integrity
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#171F2C]" />
                    <span className="text-xs text-[#171F2C] font-semibold">100% KYB Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              SEARCH & CATEGORY CONTROLS
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="bg-white p-4 sm:p-5 rounded-[4px] border border-[#E2E8F0]">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, covenants, LEI audits, or CDOE rules..."
                  className="w-full h-11 pl-10 pr-9 bg-[#F8FAFC] text-[#171F2C] text-xs sm:text-sm placeholder:text-[#94A3B8] rounded-[4px] border border-[#E2E8F0] focus:outline-none focus:bg-white focus:border-[#171F2C] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#171F2C] p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-[#64748B] uppercase hidden xl:inline-block">
                  Query Index:
                </span>
                <span className="text-xs font-mono font-medium text-[#171F2C] px-3 py-1.5 bg-[#F8FAFC] rounded-[4px] border border-[#E2E8F0]">
                  {totalVisibleCount} {totalVisibleCount === 1 ? "Topic" : "Topics"} Cataloged
                </span>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "all"
                    ? "bg-[#171F2C] text-white border border-[#171F2C]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#171F2C] hover:bg-white border border-[#E2E8F0]"
                )}
              >
                All Records
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("basics")}
                className={cn(
                  "px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "basics"
                    ? "bg-[#171F2C] text-white border border-[#171F2C]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#171F2C] hover:bg-white border border-[#E2E8F0]"
                )}
              >
                Exchange Basics
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("protocol")}
                className={cn(
                  "px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "protocol"
                    ? "bg-[#171F2C] text-white border border-[#171F2C]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#171F2C] hover:bg-white border border-[#E2E8F0]"
                )}
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("verification")}
                className={cn(
                  "px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "verification"
                    ? "bg-[#171F2C] text-white border border-[#171F2C]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#171F2C] hover:bg-white border border-[#E2E8F0]"
                )}
              >
                Verification &amp; Privacy
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("commercial")}
                className={cn(
                  "px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "commercial"
                    ? "bg-[#171F2C] text-white border border-[#171F2C]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:text-[#171F2C] hover:bg-white border border-[#E2E8F0]"
                )}
              >
                Commercial Terms &amp; Covenants
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              QUICK KNOWLEDGE PILLARS GRID (4 TOP CARDS)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pillar 1 */}
            <div
              onClick={() => applyQuickFilter("basics")}
              className="bg-white p-5 rounded-[4px] border border-[#E2E8F0] flex flex-col justify-between hover:border-[#171F2C] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] group-hover:bg-[#171F2C] group-hover:text-white transition-colors">
                    <ArrowLeftRight className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">
                    Engine 01 &amp; 02
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#171F2C] mb-1 font-display">
                  Exchange Basics
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Bilateral trade of unserviceable dealflow and strategic partner discovery.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-1 text-xs font-semibold text-[#171F2C]">
                <span>4 Topics</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onClick={() => applyQuickFilter("protocol")}
              className="bg-white p-5 rounded-[4px] border border-[#E2E8F0] flex flex-col justify-between hover:border-[#171F2C] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] group-hover:bg-[#171F2C] group-hover:text-white transition-colors">
                    <FileCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">
                    Consent Rule
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#171F2C] mb-1 font-display">
                  How It Works
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  The 4-stage bilateral handshake guaranteeing zero unsolicited cold outbound.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-1 text-xs font-semibold text-[#171F2C]">
                <span>4 Topics</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onClick={() => applyQuickFilter("verification")}
              className="bg-white p-5 rounded-[4px] border border-[#E2E8F0] flex flex-col justify-between hover:border-[#171F2C] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] group-hover:bg-[#171F2C] group-hover:text-white transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">
                    LEI &amp; KYB
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#171F2C] mb-1 font-display">
                  Verification &amp; Privacy
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Institutional attestation, sovereign blinded states, and privacy protection.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-1 text-xs font-semibold text-[#171F2C]">
                <span>4 Topics</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              onClick={() => applyQuickFilter("commercial")}
              className="bg-white p-5 rounded-[4px] border border-[#E2E8F0] flex flex-col justify-between hover:border-[#171F2C] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] group-hover:bg-[#171F2C] group-hover:text-white transition-colors">
                    <Scale className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">
                    Dual-Signing
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#171F2C] mb-1 font-display">
                  Commercial Covenants
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Standard bilateral non-circumvention rules locking rev-share and referral integrity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-1 text-xs font-semibold text-[#171F2C]">
                <span>3 Topics</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              MAIN CONTENT: FAQ ACCORDION (DOM-RENDERED) + SIDE PANEL
              ═══════════════════════════════════════════════════════════════════ */}
          <div ref={faqContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FAQ Accordion List (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {totalVisibleCount === 0 ? (
                <div className="bg-white p-10 rounded-[4px] border border-[#E2E8F0] text-center space-y-3">
                  <SearchX className="w-10 h-10 text-[#64748B] mx-auto" />
                  <h3 className="text-base font-bold text-[#171F2C]">
                    No matching questions identified
                  </h3>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                    Adjust your search keyword or reset the category filter to view platform guidance.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#171F2C] text-white rounded-[4px] text-xs font-semibold hover:bg-[#1E293B] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                SECTIONS.map((sec) => {
                  const itemsInSec = filteredData.filter((item) => item.group === sec.group);
                  if (itemsInSec.length === 0) return null;

                  return (
                    <div key={sec.group} className="space-y-3">
                      {/* Section Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                          {sec.num}
                        </span>
                        <span className="h-px flex-1 bg-[#E2E8F0]"></span>
                        <h2 className="text-xs font-bold font-mono uppercase text-[#171F2C]">
                          {sec.title}
                        </h2>
                      </div>

                      {/* Items */}
                      <div className="flex flex-col gap-2.5">
                        {itemsInSec.map((faq) => {
                          const isOpen = !!openItems[faq.id];
                          return (
                            <div
                              key={faq.id}
                              className="bg-white rounded-[4px] border border-[#E2E8F0] overflow-hidden transition-all"
                            >
                              <button
                                type="button"
                                id={`faq-question-${faq.id}`}
                                aria-expanded={isOpen}
                                aria-controls={`faq-answer-${faq.id}`}
                                onClick={() => toggleItem(faq.id)}
                                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <span className="text-xs font-mono font-bold text-[#64748B] mt-0.5 shrink-0">
                                    {faq.qNum}
                                  </span>
                                  <span className="text-sm sm:text-base font-bold text-[#171F2C] leading-snug">
                                    {faq.question}
                                  </span>
                                </div>
                                <ChevronDown
                                  className={cn(
                                    "w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 mt-0.5",
                                    isOpen && "rotate-180 text-[#171F2C]"
                                  )}
                                />
                              </button>

                              {/* CRITICAL TECHNICAL SEO FIX: Answer ALWAYS exists in DOM */}
                              <div
                                id={`faq-answer-${faq.id}`}
                                role="region"
                                aria-labelledby={`faq-question-${faq.id}`}
                                className={cn(
                                  "px-4 sm:px-5 pb-4 sm:pb-5 pt-0 transition-all",
                                  !isOpen && "hidden"
                                )}
                              >
                                <div className="pt-2 bg-[#F8FAFC] p-3.5 sm:p-4 rounded-[4px] text-xs sm:text-sm text-[#64748B] leading-relaxed border border-[#E2E8F0]">
                                  {faq.answer}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Protocol Architecture & Executive Reference Cards (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Architecture Visual Box */}
              <div className="bg-white p-5 rounded-[4px] border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E8F0]">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    CDOE Execution State
                  </span>
                  <span className="text-xs font-semibold text-[#171F2C]">Sovereign Flow</span>
                </div>

                {/* Protocol State Diagram */}
                <div className="bg-[#F8FAFC] p-3.5 rounded-[4px] border border-[#E2E8F0] mb-3.5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-[4px] bg-[#171F2C] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      01
                    </span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#171F2C]">
                        Blinded Opportunity Teaser
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Anonymized scope, sector &amp; deal bracket
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center -my-1 text-[#94A3B8]">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-[4px] bg-[#171F2C] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      02
                    </span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#171F2C]">
                        Bilateral Covenants Lock
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Non-circumvention terms agreed
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center -my-1 text-[#94A3B8]">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-[4px] bg-[#171F2C] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      03
                    </span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#171F2C]">Simultaneous Reveal</div>
                      <div className="text-[11px] text-[#64748B]">
                        Direct enterprise handover outside Relay
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  The Relay never intercepts customer invoices or arbitrates servicing
                  deliverables. Our covenant layer solely binds the introducing parties.
                </p>
              </div>

              {/* Security & Legal Badges Panel */}
              <div className="bg-white p-5 rounded-[4px] border border-[#E2E8F0]">
                <h3 className="text-sm font-bold text-[#171F2C] mb-3 font-display">
                  Governance Assurances
                </h3>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-2.5">
                    <BadgeCheck className="w-4 h-4 text-[#171F2C] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#171F2C]">GLEIF LEI Certified</div>
                      <div className="text-[11px] text-[#64748B] leading-relaxed">
                        Every trading entity carries an active Global Legal Entity Identifier.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-[#171F2C] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#171F2C]">
                        Blind Identity Shield
                      </div>
                      <div className="text-[11px] text-[#64748B] leading-relaxed">
                        Zero discoverable footprint prior to dual-party signed agreement.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-[#171F2C] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#171F2C]">Zero-Spam Covenant</div>
                      <div className="text-[11px] text-[#64748B] leading-relaxed">
                        Unsolicited broadcasts trigger immediate forfeiture of protocol access.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Access Documentation Links */}
              <div className="bg-white p-5 rounded-[4px] border border-[#E2E8F0]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-bold mb-3">
                  Institutional Specs
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link
                    to="/core-pillars"
                    className="flex items-center justify-between p-2.5 rounded-[4px] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors group"
                  >
                    <span className="text-xs font-semibold text-[#171F2C] group-hover:underline">
                      Core Pillars &amp; Principles
                    </span>
                    <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                  </Link>
                  <Link
                    to="/8-step-journey"
                    className="flex items-center justify-between p-2.5 rounded-[4px] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors group"
                  >
                    <span className="text-xs font-semibold text-[#171F2C] group-hover:underline">
                      8-Step Handshake Guide
                    </span>
                    <Gavel className="w-3.5 h-3.5 text-[#64748B]" />
                  </Link>
                  <Link
                    to="/trust-and-safety"
                    className="flex items-center justify-between p-2.5 rounded-[4px] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors group"
                  >
                    <span className="text-xs font-semibold text-[#171F2C] group-hover:underline">
                      Trust &amp; Safety Protocol
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#64748B]" />
                  </Link>
                  <Link
                    to="/solutions"
                    className="flex items-center justify-between p-2.5 rounded-[4px] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors group"
                  >
                    <span className="text-xs font-semibold text-[#171F2C] group-hover:underline">
                      Solutions Hub Directory
                    </span>
                    <ListChecks className="w-3.5 h-3.5 text-[#64748B]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              CROSS NAVIGATION LINKS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-white border border-[#E2E8F0] rounded-[4px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#171F2C] font-display">
                  Explore The Relay Solutions
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                  Review our targeted frameworks for lead monetization, referral networks, channel partnerships, and distribution.
                </p>
              </div>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171F2C] hover:bg-[#1E293B] text-white rounded-[4px] text-xs font-semibold transition-colors shrink-0"
              >
                <span>Browse Live Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/b2b-opportunity-exchange"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">Platform</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  B2B opportunity exchange
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Monetize unfulfilled client inquiries with verified businesses.
                </p>
              </Link>

              <Link
                to="/b2b-lead-exchange"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  B2B lead exchange
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Contracted rev-share routing for out-of-scope enterprise leads.
                </p>
              </Link>

              <Link
                to="/referral-partnerships"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">Partnerships</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  referral partnerships
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Establish non-competing reciprocal referral alliances.
                </p>
              </Link>

              <Link
                to="/b2b-partnership-network"
                className="p-4 rounded-[4px] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">Network</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                  B2B partnership network
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Co-selling, distribution, and cross-sector commercial partnerships.
                </p>
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              BOTTOM SUPPORT / PROTOCOL DESK BOX
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="bg-[#171F2C] text-white p-6 sm:p-8 rounded-[4px] border border-[#171F2C]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#112030] border border-slate-700 text-[#94A3B8] text-[11px] font-mono uppercase tracking-wider font-bold">
                  Enterprise Protocol Support
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  Still have questions about institutional dealflow?
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Our protocol desk is available to assist enterprise executive teams with bespoke
                  onboarding, high-volume blinded routing, and bilateral dealroom customization.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
                <a
                  href="mailto:support@therelay.exchange?subject=Inquiry%20regarding%20The%20Relay%20Protocol"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-[4px] bg-white text-[#171F2C] hover:bg-[#F8FAFC] text-xs font-bold transition-colors cursor-pointer"
                >
                  Contact Protocol Desk
                </a>
                <Link
                  to="/opportunities"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-[4px] bg-[#112030] hover:bg-[#1E293B] text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Explore Opportunity Board
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
