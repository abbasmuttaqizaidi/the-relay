import { useState, useMemo, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/design-system";
import { createSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    createSeoMeta({
      title: "The Relay FAQ — B2B Opportunity Exchange Questions | The Relay",
      description:
        "Answers to common questions about The Relay, B2B opportunity exchange, lead exchange, referrals, verification, consent, and the Relay workflow.",
      path: "/faq",
    }),
  component: FAQPage,
});

type CategoryKey = "all" | "engines" | "protocol" | "verification" | "governance";

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
  // SECTION 1: Core Concepts & The Two Engines
  {
    id: "relay-what-is",
    qNum: "Q.01",
    group: "engines",
    sectionName: "The Two Engines",
    sectionNum: "Section 01",
    question: "What exactly is The Relay?",
    answer: (
      <p>
        The Relay is the world's first{" "}
        <strong className="text-slate-950 font-semibold">
          Consent-Driven Opportunity Exchange (CDOE)
        </strong>
        . It is an institutional, verified commercial network engineered specifically for
        high-velocity B2B enterprises to monetize unserviceable inbound demand, transfer
        out-of-scope opportunities, and source verified distribution partners—without cold
        outreach, scraping, or unwanted sales spam.
      </p>
    ),
    tags: ["relay", "what is", "cdoe", "concept", "lead exchange", "monetize", "out of scope"],
  },
  {
    id: "two-engines-breakdown",
    qNum: "Q.02",
    group: "engines",
    sectionName: "The Two Engines",
    sectionNum: "Section 01",
    question: 'What are the "Two Engines" of The Relay?',
    answer: (
      <div className="space-y-2.5">
        <p>
          <strong className="text-slate-950 font-semibold">Engine 01 (Exchange):</strong> Operates
          as a transactional opportunity market. When your organization receives inbound requests
          you cannot service (due to sub-threshold budget, geographic limitations, tech-stack
          conflicts, or capacity exhaustion), you publish blinded deal teasers. Pre-vetted
          counterparties tender contracted rev-shares, reciprocal qualified referrals, or specialist
          barters to take over the client.
        </p>
        <p>
          <strong className="text-slate-950 font-semibold">Engine 02 (Discover):</strong> Operates
          as a strategic partner directory. Enterprises identify and initiate bilateral discussions
          with verified peer organizations for programmatic reseller agreements, co-marketing,
          corporate procurement, and agency-to-agency syndication.
        </p>
      </div>
    ),
    tags: ["two engines", "exchange", "discover", "reciprocal", "referral", "barter"],
  },
  {
    id: "lead-gen-vs-broker",
    qNum: "Q.03",
    group: "engines",
    sectionName: "The Two Engines",
    sectionNum: "Section 01",
    question: "Is The Relay a lead generation or broker tool?",
    answer: (
      <p>
        <strong className="text-slate-950 font-semibold">Categorically no.</strong> Traditional lead
        brokers scrape public rosters and broadcast unqualified contacts to multiple bidding
        parties. The Relay is an institutional infrastructure layer facilitating 1-to-1 bilateral
        agreements. Neither company's brand identity, contact executives, or underlying lead records
        are exposed until mutual covenants and commercial terms are executed in Stage 3.
      </p>
    ),
    tags: ["lead generation", "broker", "scrape", "spam", "data privacy", "cold outreach"],
  },
  {
    id: "social-network-comparison",
    qNum: "Q.04",
    group: "engines",
    sectionName: "The Two Engines",
    sectionNum: "Section 01",
    question: "Is Relay a social network?",
    answer: (
      <p>
        <strong className="text-slate-950 font-semibold">No.</strong> There are no followers, likes,
        vanity metrics, or algorithm feeds. Every record revolves around a concrete, high-intent
        commercial brief with measurable economic value.
      </p>
    ),
    tags: ["social network", "feed", "vanity metrics", "algorithm", "commercial brief"],
  },

  // SECTION 2: Bilateral Lifecycle & CDOE Protocol
  {
    id: "four-stage-lifecycle",
    qNum: "Q.05",
    group: "protocol",
    sectionName: "Bilateral Lifecycle & Protocol",
    sectionNum: "Section 02",
    question: "How does the 4-Stage Exchange Lifecycle work?",
    answer: (
      <div className="space-y-3">
        <p>All deal routing strictly complies with the 4-phase CDOE sequence:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-bold text-slate-950">Stage 1: Acknowledgement</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Counterparty verifies initial interest; blinded metadata shared.
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-bold text-slate-950">Stage 2: Negotiation</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Counter-proposals on rev-share %, upfront baseline, or barter terms.
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-bold text-slate-950">Stage 3: Agreement</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Dual digital ratification of non-circumvention terms.
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-bold text-slate-950">Stage 4: Handshake</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Mutual cryptographic identity reveal and out-of-band delivery.
            </div>
          </div>
        </div>
      </div>
    ),
    tags: [
      "stages",
      "lifecycle",
      "protocol",
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
    sectionName: "Bilateral Lifecycle & Protocol",
    sectionNum: "Section 02",
    question: 'What happens when I click "Express Interest"?',
    answer: (
      <p>
        Triggering <strong className="text-slate-950 font-semibold">Express Interest</strong>{" "}
        transmits a formal, blinded economic proposal to the opportunity creator. You specify your
        trade terms—such as your preferred revenue-share percentage (e.g., 10% on closed contract),
        an immediate referral exchange, or reciprocal agency services. The recipient reviews your
        attested tier and track record, choosing to either accept into Stage 1, decline quietly
        without reputation penalty, or submit a counter-offer.
      </p>
    ),
    tags: ["express interest", "proposal terms", "counter offer", "value dimension"],
  },
  {
    id: "direct-messaging-spam",
    qNum: "Q.07",
    group: "protocol",
    sectionName: "Bilateral Lifecycle & Protocol",
    sectionNum: "Section 02",
    question: "Does Relay have direct messaging or spam?",
    answer: (
      <p>
        <strong className="text-slate-950 font-semibold">No.</strong> There are zero unsolicited
        DMs, cold outreach, or social feeds. Relay operates purely as an institutional deal
        arbitrage protocol. Once mutual handshake terms are finalized in Stage 4, parties
        communicate directly through their authenticated corporate channels.
      </p>
    ),
    tags: ["direct messaging", "spam", "cold outreach", "dms", "authenticated channels"],
  },
  {
    id: "getting-started-flow",
    qNum: "Q.08",
    group: "protocol",
    sectionName: "Bilateral Lifecycle & Protocol",
    sectionNum: "Section 02",
    question: "How do I get started?",
    answer: (
      <p>
        You can immediately explore live opportunities on the board or post an opportunity brief.
        Verified members can propose terms and execute handshakes instantly. Onboarding takes less
        than 2 minutes to verify your corporate domain.
      </p>
    ),
    tags: ["getting started", "how to start", "explore", "post brief", "onboarding"],
  },

  // SECTION 3: Privacy, Blinded Mode & Verification
  {
    id: "why-blinded-initially",
    qNum: "Q.09",
    group: "verification",
    sectionName: "Privacy, Blinded Mode & Audits",
    sectionNum: "Section 03",
    question: "Why is my company blinded initially?",
    answer: (
      <p>
        Blinded discovery protects deal pipeline discretion and enterprise intellectual property.
        Counterparties only see your verified industry vertical, accredited turnover bracket, and
        geographic footprint—not corporate trademarks or individual personnel names. This ensures
        discussions are evaluated purely on economic synergy and deal merit, preventing market
        front-running or leaked competitive intelligence.
      </p>
    ),
    tags: [
      "blinded mode",
      "privacy",
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
    sectionName: "Privacy, Blinded Mode & Audits",
    sectionNum: "Section 03",
    question: "How does business verification work?",
    answer: (
      <p>
        Every applicant is audited against statutory corporate registries (Know Your Business -
        KYB), Global Legal Entity Identifier (GLEIF LEI) databases, and authorized corporate email
        DNS records (DMARC/DKIM validation). Sole proprietors, shell entities, and automated scrapers
        are permanently prevented from accessing the pool.
      </p>
    ),
    tags: ["verification", "kyb", "lei", "corporate domain", "attestation", "vetting"],
  },
  {
    id: "identity-protection-details",
    qNum: "Q.11",
    group: "verification",
    sectionName: "Privacy, Blinded Mode & Audits",
    sectionNum: "Section 03",
    question: "How does Relay protect my company's identity?",
    answer: (
      <p>
        Every opportunity posted on Relay is double-blind by default. Your company name, contact
        details, and sensitive parameters remain masked. Only when you explicitly review and accept
        an inbound match does Relay facilitate the Step 07 Handshake to unmask executive contact
        details under bilateral non-circumvention terms.
      </p>
    ),
    tags: ["identity protection", "double blind", "masking", "sensitive parameters", "handshake"],
  },
  {
    id: "membership-eligibility",
    qNum: "Q.12",
    group: "verification",
    sectionName: "Privacy, Blinded Mode & Audits",
    sectionNum: "Section 03",
    question: "Who can join The Relay?",
    answer: (
      <p>
        Relay is strictly reserved for operating B2B businesses, SaaS companies, specialized
        agencies, and verified enterprise leaders. Every entity undergoes automated and desk
        verification against business registries and corporate domain identity.
      </p>
    ),
    tags: ["who can join", "eligibility", "saas", "agencies", "enterprise leaders"],
  },

  // SECTION 4: Economics & Legal Covenants
  {
    id: "enforce-agreements-covenants",
    qNum: "Q.13",
    group: "governance",
    sectionName: "Economics & Legal Covenants",
    sectionNum: "Section 04",
    question: "How does The Relay enforce agreements?",
    answer: (
      <p>
        Transactions on The Relay are governed by standard institutional bilateral non-circumvention
        (NCND) master agreements, executed digitally in Stage 3. In the event of contract breach or
        circumvention, verifiable cryptographic handshake logs are admissible for expedited
        arbitration under International Chamber of Commerce (ICC) commercial covenants.
      </p>
    ),
    tags: [
      "legal covenants",
      "non circumvention",
      "nda",
      "enforcement",
      "agreement",
      "arbitration",
      "icc",
    ],
  },
  {
    id: "pricing-and-fees",
    qNum: "Q.14",
    group: "governance",
    sectionName: "Economics & Legal Covenants",
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
    tags: ["cost", "fees", "governance", "price", "membership", "syndicate pricing"],
  },
  {
    id: "reciprocal-terms-revshare",
    qNum: "Q.15",
    group: "governance",
    sectionName: "Economics & Legal Covenants",
    sectionNum: "Section 04",
    question: "How do reciprocal exchanges and revenue shares work?",
    answer: (
      <p>
        When proposing on an opportunity, businesses structure reciprocal parity terms—such as a
        10%-25% contract fee on closed business, direct reciprocal lead trades, or specialized
        technical barter. Both parties mutually sign off before any contact information is
        exchanged.
      </p>
    ),
    tags: ["reciprocal exchanges", "revenue shares", "revshare", "parity terms", "contract fee"],
  },
];

const SECTIONS = [
  { group: "engines" as const, num: "Section 01", title: "The Two Engines & Core Concepts" },
  { group: "protocol" as const, num: "Section 02", title: "Bilateral Lifecycle & Protocol" },
  { group: "verification" as const, num: "Section 03", title: "Privacy, Blinded Mode & Audits" },
  { group: "governance" as const, num: "Section 04", title: "Economics & Legal Covenants" },
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

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 font-sans antialiased selection:bg-slate-950 selection:text-white flex flex-col">
      <main className="w-full flex-1 pt-6 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ═══════════════════════════════════════════════════════════════════
              BREADCRUMB & HEADER GRID
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                <span>Platform</span>
                <span className="text-slate-300">/</span>
                <span>Knowledge Base</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-950 font-bold">FAQ &amp; Protocol Standards</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Everything you need to know about The Relay, the Consent-Driven Opportunity
                Exchange (CDOE) protocol, blinded bilateral matching, and programmatic commercial
                covenants.
              </p>
            </div>

            {/* Quick Status Metric Widget */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-6 w-full lg:w-auto">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Protocol Standard
                  </div>
                  <div className="text-sm text-slate-950 font-bold mt-0.5">
                    CDOE v2.4 Compliant
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Network Integrity
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs text-slate-950 font-semibold">100% KYB Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              SEARCH & FILTER CONTROLS
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, covenants, LEI audits, or CDOE rules..."
                  className="w-full h-11 pl-10 pr-9 bg-slate-50 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 rounded-xl border border-slate-200/60 focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-900 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-slate-400 uppercase hidden xl:inline-block">
                  Query Index:
                </span>
                <span className="text-xs font-medium text-slate-700 px-3 py-1.5 bg-slate-100 rounded-lg">
                  {totalVisibleCount} {totalVisibleCount === 1 ? "Topic" : "Topics"} Cataloged
                </span>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "all"
                    ? "bg-slate-950 text-white shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/60",
                )}
              >
                All Records
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("protocol")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "protocol"
                    ? "bg-slate-950 text-white shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/60",
                )}
              >
                CDOE Protocol
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("engines")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "engines"
                    ? "bg-slate-950 text-white shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/60",
                )}
              >
                The Two Engines
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("verification")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "verification"
                    ? "bg-slate-950 text-white shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/60",
                )}
              >
                Verification &amp; Privacy
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("governance")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  selectedFilter === "governance"
                    ? "bg-slate-950 text-white shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/60",
                )}
              >
                Fees &amp; Governance
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              QUICK KNOWLEDGE PILLARS GRID (4 TOP CARDS)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Pillar 1 */}
            <div
              onClick={() => applyQuickFilter("engines")}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                    <ArrowLeftRight className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Engine 01 &amp; 02
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-950 mb-1">
                  The Two Engines
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Bilateral trade of unserviceable dealflow and institutional partner discovery.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-slate-950">
                <span>4 Articles</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onClick={() => applyQuickFilter("protocol")}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                    <FileCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Consent Rule
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-950 mb-1">
                  CDOE Protocol
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The 4-stage bilateral handshake guaranteeing zero unsolicited cold outbound.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-slate-950">
                <span>4 Articles</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onClick={() => applyQuickFilter("verification")}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    LEI &amp; KYB
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-950 mb-1">
                  Enterprise Verification
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Institutional attestation, sovereign blinded states, and privacy protection.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-slate-950">
                <span>4 Articles</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              onClick={() => applyQuickFilter("governance")}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                    <Scale className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Dual-Signing
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-950 mb-1">
                  Commercial Covenants
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Standard bilateral non-circumvention rules locking rev-share and referral
                  integrity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-slate-950">
                <span>3 Articles</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              MAIN CONTENT LAYOUT: FAQ LIST & PROTOCOL EXPLAINER SIDE PANEL
              ═══════════════════════════════════════════════════════════════════ */}
          <div ref={faqContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FAQ Accordion List (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {totalVisibleCount === 0 ? (
                <div className="bg-white p-10 rounded-2xl border border-slate-200/80 text-center shadow-2xs space-y-3">
                  <SearchX className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-950">
                    No matching questions identified
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Adjust your search keyword or reset the category filter to view platform
                    guidance.
                  </p>
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                SECTIONS.map((sec) => {
                  const itemsInSec = filteredData.filter((item) => item.group === sec.group);
                  if (itemsInSec.length === 0) return null;

                  return (
                    <div key={sec.group} className="space-y-3">
                      {/* Section Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          {sec.num}
                        </span>
                        <span className="h-px flex-1 bg-slate-200"></span>
                        <span className="text-xs font-bold text-slate-700">{sec.title}</span>
                      </div>

                      {/* Items */}
                      <div className="flex flex-col gap-2.5">
                        {itemsInSec.map((faq) => {
                          const isOpen = !!openItems[faq.id];
                          return (
                            <div
                              key={faq.id}
                              className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
                            >
                              <button
                                type="button"
                                onClick={() => toggleItem(faq.id)}
                                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <span className="text-xs font-mono font-bold text-slate-400 mt-0.5 shrink-0">
                                    {faq.qNum}
                                  </span>
                                  <span className="text-sm sm:text-base font-bold text-slate-950 leading-snug">
                                    {faq.question}
                                  </span>
                                </div>
                                <ChevronDown
                                  className={cn(
                                    "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mt-0.5",
                                    isOpen && "rotate-180 text-slate-900",
                                  )}
                                />
                              </button>

                              {isOpen && (
                                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                                  <div className="pt-2 bg-slate-50/80 p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm text-slate-600 leading-relaxed border border-slate-100">
                                    {faq.answer}
                                  </div>
                                </div>
                              )}
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
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    CDOE Execution State
                  </span>
                  <span className="text-xs font-semibold text-slate-950">Sovereign Flow</span>
                </div>

                {/* Minimal Protocol State Diagram */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 mb-3.5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-950 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      01
                    </span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-950">
                        Mutual Blinded Teaser
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Anonymized scope, sector &amp; deal bracket
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center -my-1 text-slate-300">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-950 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      02
                    </span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-950">
                        Bilateral Covenants Lock
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Non-circumvention terms agreed
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center -my-1 text-slate-300">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-950 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      03
                    </span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-950">Simultaneous Reveal</div>
                      <div className="text-[11px] text-slate-500">
                        Direct enterprise handover outside Relay
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  The Relay never intercepts customer invoices or arbitrates servicing
                  deliverables. Our covenant layer solely binds the introducing parties.
                </p>
              </div>

              {/* Security & Legal Badges Panel */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-950 mb-3">Governance Assurances</h3>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-2.5">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-950">GLEIF LEI Certified</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        Every trading entity carries an active Global Legal Entity Identifier.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-950">
                        Blind Identity Shield
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        Zero discoverable footprint prior to dual-party signed agreement.
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-950">Zero-Spam Covenant</div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        Unsolicited broadcasts trigger immediate forfeiture of protocol access.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Access Documentation Links */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                  Institutional Specs
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link
                    to="/core-pillars"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-950 group-hover:underline">
                      CDOE Whitepaper &amp; Pillars
                    </span>
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                  <Link
                    to="/8-step-journey"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-950 group-hover:underline">
                      8-Step Handshake Guide
                    </span>
                    <Gavel className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                  <Link
                    to="/onboarding"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-950 group-hover:underline">
                      Enterprise Onboarding Checklist
                    </span>
                    <ListChecks className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              BOTTOM REASSURANCE / SUPPORT BOX
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm mt-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-emerald-700">
                    Enterprise Protocol Support
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-slate-950 tracking-tight">
                  Still have questions about institutional dealflow?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Our protocol desk is available to assist enterprise executive teams with bespoke
                  onboarding, high-volume blinded routing, and bilateral dealroom customization.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
                <a
                  href="mailto:support@therelay.exchange?subject=Inquiry%20regarding%20The%20Relay%20Protocol"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                >
                  Contact Protocol Desk
                </a>
                <Link
                  to="/opportunities"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold transition-colors"
                >
                  Explore Opportunity Board
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
