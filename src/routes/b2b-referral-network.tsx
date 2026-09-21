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
} from "lucide-react";
import { cn } from "@/lib/utils";

import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/b2b-referral-network")({
  head: () =>
    createSeoMeta({
      title: "B2B Referral Network — Find Referral Partners | The Relay",
      description:
        "Discover a structured B2B referral network for businesses looking for complementary referral relationships and commercial opportunities.",
      path: "/b2b-referral-network",
    }),
  component: B2BReferralNetworkPage,
});

export function B2BReferralNetworkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/b2b-referral-network#webpage`,
        url: `${SITE_URL}/b2b-referral-network`,
        name: "B2B Referral Network — Find Referral Partners | The Relay",
        description:
          "Discover a structured B2B referral network for businesses looking for complementary referral relationships and commercial opportunities.",
        breadcrumb: {
          "@id": `${SITE_URL}/b2b-referral-network#breadcrumb`,
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
        "@id": `${SITE_URL}/b2b-referral-network#breadcrumb`,
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
            "name": "B2B Referral Network",
            "item": `${SITE_URL}/b2b-referral-network`,
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
      q: "What is a B2B referral network?",
      a: "A B2B referral network is a formal ecosystem connecting complementary, non-competing businesses that routinely encounter customer needs they cannot service internally, allowing them to pass qualified referrals under pre-agreed commercial terms.",
    },
    {
      q: "How does The Relay differ from informal networking groups (e.g. BNI or WhatsApp groups)?",
      a: "Informal groups rely on obligation, spam, and unpaid goodwill. The Relay operates as an institutional exchange: every referral opportunity is scoped with concrete commercial parameters, counterparties are corporate-verified, and transactions are protected by binding legal covenants.",
    },
    {
      q: "What commercial structures are supported for B2B referrals?",
      a: "Businesses can structure referrals as upfront fixed bounties, percentage of closed contract value (e.g., 5–15%), recurring monthly revenue share on retainers, or bilateral dealflow swaps where counterparties return reciprocal opportunities.",
    },
    {
      q: "How does The Relay protect my client relationships when making a referral?",
      a: "Through our gated Consent-Driven Opportunity Exchange (CDOE) protocol. Sanitized deal metadata is shared first. Counterparties sign bilateral terms before any customer identities or direct introductions are unmasked.",
    },
    {
      q: "Who qualifies as an ideal referral partner on The Relay?",
      a: "Complementary firms serving the same customer demographic without overlapping service offerings—for example, design studios and custom software engineering firms, or corporate tax attorneys and M&A advisory practices.",
    },
    {
      q: "Is there any cost to join and explore referral opportunities?",
      a: "Verified corporate entities can browse opportunities and originate referral dealflow directly. Structured marketplace fee schedules and transaction settlement terms are agreed upfront upon handshake.",
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
                B2B Referral Network
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH TWO-SIDED COMPLEMENTARY VISUAL
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Bilateral Referral Network
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  Find businesses that can become meaningful referral partners.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    A B2B referral network connects complementary businesses around commercial opportunities and qualified referrals.
                  </p>
                  <p className="text-[#334155]">
                    When a customer needs a capability you don't provide, passing that opportunity to a trusted, verified partner creates revenue, strengthens customer retention, and builds reciprocal dealflow—without awkward cold outreach or unvetted introductions.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Referral Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post a Referral Request
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Structured opportunity matching. Pre-agreed commercial terms. Zero social feed spam.
                </p>
              </div>

              {/* Visual Column: Two-Sided Complementary Pairing Diagram (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Reciprocal Pairing Mesh
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-REF-01
                    </span>
                  </div>

                  {/* Two-Sided Matrix Visual */}
                  <div className="space-y-2.5">
                    {/* Originator Node */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[4px] bg-white border border-[#E2E8F0] flex items-center justify-center font-mono font-bold text-xs text-[#171F2C]">
                          A
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Design &amp; Branding Studio</div>
                          <div className="text-xs text-[#64748B]">Originates custom software demand</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Originator
                      </span>
                    </div>

                    {/* Central Exchange Handshake Hub */}
                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <ArrowLeftRight className="w-4 h-4 text-white shrink-0" />
                        <div>
                          <div className="text-[13px] font-bold text-white">The Relay Referral Protocol</div>
                          <div className="text-xs text-slate-300">Sanitized Discovery ➔ 10% Rev Share ➔ Consent</div>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    </div>

                    {/* Complementary Partner Node */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[4px] bg-white border border-[#E2E8F0] flex items-center justify-center font-mono font-bold text-xs text-[#171F2C]">
                          B
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Cloud Engineering Firm</div>
                          <div className="text-xs text-[#64748B]">Executes enterprise backend scope</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Fulfilment
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Mutual revenue realization without cold pitching or unvetted brokers.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHY COMPLEMENTARY PARTNERSHIPS MATTER
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                The Complementary Advantage
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Why Non-Competing, Complementary Partners Win
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Direct competitors rarely share dealflow. Complementary businesses, however, serve the exact same buyers at different points in their corporate lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Pillar 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Identical ICP Overlap
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Partners target the same Ideal Customer Profile (e.g. Series B SaaS or Mid-Market Healthcare) with zero service overlap.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  High conversion probability
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Coins className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Continuous Inbound Loops
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    As client needs evolve, referrals flow naturally in both directions over the lifetime of the partnership.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Predictable organic pipeline
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Client Trust Retention
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Introducing a vetted partner protects your client from bad actors and elevates your role as a trusted strategic advisor.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Zero reputational risk
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: 6-POINT PARTNER-FIT SELECTION CHECKLIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Evaluation Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                6-Point Referral Partner Selection Checklist
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before initiating a referral handshake on The Relay, evaluate potential counterparties against these core operational criteria:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  num: "01",
                  title: "Customer Segment Overlap",
                  desc: "Do they serve the same company sizes, industry sectors, and buyer personas without directly competing?",
                },
                {
                  num: "02",
                  title: "Capability Complementarity",
                  desc: "Does their service offering naturally precede, follow, or augment your core commercial deliveries?",
                },
                {
                  num: "03",
                  title: "Geographic & Regulatory Scope",
                  desc: "Do they possess the jurisdictional licenses, regional infrastructure, and compliance standing required?",
                },
                {
                  num: "04",
                  title: "Capacity & Delivery Velocity",
                  desc: "Do they have current team bandwidth to service inbound referrals with executive-level quality and speed?",
                },
                {
                  num: "05",
                  title: "Commercial Model Alignment",
                  desc: "Are both parties aligned on commission structures, attribution windows, and contract milestones?",
                },
                {
                  num: "06",
                  title: "Verified Entity Standing",
                  desc: "Has the counterparty completed KYB verification and LEI entity attribution on The Relay protocol?",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold text-[#64748B]">
                        CRITERION {item.num}
                      </span>
                      <CheckSquare2 className="w-4 h-4 text-[#171F2C]" />
                    </div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex-wrap gap-3">
              <span className="text-xs sm:text-[13px] text-[#334155] font-medium">
                Want a deeper dive into establishing reciprocal referral loops?
              </span>
              <Link
                to="/how-to-find-b2b-referral-partners"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors"
              >
                <span>Read the Operator Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: REFERRAL NETWORK VS SOCIAL NETWORK COMPARISON
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Architecture Contrast
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Referral Network vs. Social Network
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Traditional platforms optimize for attention and vanity engagement. The Relay optimizes for verified commercial exchange.
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 py-3 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                <div>Social Network / Informal Referral Groups</div>
                <div className="hidden md:block">The Relay Referral Network</div>
              </div>
              <div className="divide-y divide-[#E2E8F0] text-[13px]">
                {[
                  {
                    bad: "Unsolicited cold DMs and automated outreach bots",
                    good: "Inbound demand matching based on verified capabilities",
                  },
                  {
                    bad: "Informal, untracked introductions without commercial covenants",
                    good: "Master NCND protection and programmatic agreement covenants",
                  },
                  {
                    bad: "Uncompensated goodwill or vague referral expectations",
                    good: "Pre-agreed referral bounties, rev shares, or deal swaps",
                  },
                  {
                    bad: "Public contact exposure vulnerable to scraper bots",
                    good: "Cryptographic gated disclosure with bilateral consent",
                  },
                  {
                    bad: "Algorithmic vanity feeds and continuous content posting",
                    good: "Direct opportunity-to-handshake transaction pipeline",
                  },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 px-5 py-3.5 hover:bg-[#F8FAFC] transition-colors">
                    <div className="text-[#64748B] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#94A3B8]"></span>
                      {row.bad}
                    </div>
                    <div className="text-[#171F2C] font-semibold flex items-center gap-2 mt-1 md:mt-0">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                      {row.good}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: TOPIC CLUSTER & INTERNAL LINKING
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Related Networks &amp; Guides
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Explore The Referral Ecosystem
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Connect into adjacent exchange protocols and partnership frameworks:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: Referral Partnerships */}
              <Link
                to="/referral-partnerships"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Use Case Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Referral Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Formal structures for fee schedules, ongoing commissions, and contract agreements.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Explore Network</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 2: How To Find Referral Partners */}
              <Link
                to="/how-to-find-b2b-referral-partners"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Operator Guide
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Find Referral Partners
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    A practical playbook for identifying, vetting, and agreeing on referral loops.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Playbook</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 3: B2B Opportunity Exchange */}
              <Link
                to="/b2b-opportunity-exchange"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Parent Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Opportunity Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The core umbrella framework for all transaction formats across The Relay.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Core Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 4: Trust & Safety */}
              <Link
                to="/trust-and-safety"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Protocol Governance
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Trust &amp; Safety
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    KYB screening, gated disclosure states, and institutional security covenants.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Protocol</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: FAQ ACCORDION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Documentation &amp; Answers
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
              SECTION 8: FINAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                B2B Referral Network
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Build High-Converting Referral Partnerships
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Connect with verified, complementary corporate peers and establish bilateral commercial referral channels with explicit terms and consent-driven introductions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Referral Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post a Referral Request
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
