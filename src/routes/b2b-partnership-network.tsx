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
  Hub,
  GitMerge,
  Workflow,
} from "lucide-react";
import { createSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/b2b-partnership-network")({
  head: () =>
    createSeoMeta({
      title: "B2B Partnership Network — Find Commercial Partners | The Relay",
      description:
        "Discover B2B partnership opportunities across referrals, distribution, vendors, strategic relationships, and other commercial collaborations.",
      path: "/b2b-partnership-network",
    }),
  component: B2BPartnershipNetworkPage,
});

export function B2BPartnershipNetworkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/b2b-partnership-network#webpage`,
        url: `${SITE_URL}/b2b-partnership-network`,
        name: "B2B Partnership Network — Find Commercial Partners | The Relay",
        description:
          "Discover B2B partnership opportunities across referrals, distribution, vendors, strategic relationships, and other commercial collaborations.",
        breadcrumb: {
          "@id": `${SITE_URL}/b2b-partnership-network#breadcrumb`,
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
        "@id": `${SITE_URL}/b2b-partnership-network#breadcrumb`,
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
            "name": "B2B Partnership Network",
            "item": `${SITE_URL}/b2b-partnership-network`,
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
      q: "What is a B2B partnership network?",
      a: "A B2B partnership network is a structured commercial discovery ecosystem where verified enterprises form strategic alliances, distribution agreements, co-selling pacts, and joint-venture opportunities built around concrete, active market demand.",
    },
    {
      q: "How does The Relay facilitate strategic partnerships?",
      a: "Instead of open-ended exploratory coffee chats, partnerships on Relay begin with explicit opportunities—such as a joint RFP pitch, technology integration requirement, or channel co-marketing campaign. Businesses express interest, align on commercial governance, and complete a verified handshake.",
    },
    {
      q: "What types of B2B partnerships can be structured on Relay?",
      a: "Relay supports referral networks, channel distributor agreements, technology vendor co-pitching, reseller agreements, cross-border jurisdictional pacts, and executive advisory alliances.",
    },
    {
      q: "How are intellectual property and client ownership protected?",
      a: "All counterparties operate under standard Master Non-Circumvent & Non-Disclosure (NCND) covenants. Sensitive project details and proprietary client accounts remain shielded until both parties complete mutual commercial agreement and explicit cryptographic consent.",
    },
    {
      q: "Can SaaS platforms and service agencies collaborate on Relay?",
      a: "Yes. Software vendors routinely originate implementation and systems-integration opportunities on Relay to match with specialized systems integrators and digital service providers.",
    },
    {
      q: "How does a partnership move from discovery to execution?",
      a: "Participants move through The Relay's 8-step lifecycle: Opportunity ➔ Review ➔ Interest ➔ Negotiation ➔ Agreement ➔ Consent ➔ Handshake ➔ Commercial Collaboration.",
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
                B2B Partnership Network
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH STRATEGIC ALLIANCE VISUAL
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Strategic Alliances &amp; Co-Selling
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  Find businesses to build commercial partnerships with.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    A useful B2B partnership starts with a concrete commercial opportunity, shared economic value, and unambiguous operational expectations.
                  </p>
                  <p className="text-[#334155]">
                    The Relay connects complementary enterprises across distribution channels, co-selling alliances, systems integration, and specialized joint offerings—without endless introductory calls or unaligned interests.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Partnership Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post a Partnership Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Structured commercial intent. Bilateral consent. Cryptographic covenants.
                </p>
              </div>

              {/* Visual Column: Alliance Architecture Diagram (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Strategic Alliance Matrix
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-PARTNER-01
                    </span>
                  </div>

                  {/* Visual Node Alignment */}
                  <div className="space-y-2.5">
                    {/* Enterprise Partner 1 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Enterprise SaaS Provider</div>
                          <div className="text-xs text-[#64748B]">Core platform software &amp; licensing</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Entity 01
                      </span>
                    </div>

                    {/* Central Integration Hub */}
                    <div className="p-3.5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Handshake className="w-4 h-4 text-white shrink-0" />
                        <div>
                          <div className="text-[13px] font-bold text-white">Commercial Partnership Covenant</div>
                          <div className="text-xs text-slate-300">Co-Selling • Revenue Share • Gated Introductions</div>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    </div>

                    {/* Enterprise Partner 2 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Network className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Systems Integration Practice</div>
                          <div className="text-xs text-[#64748B]">Implementation, migration &amp; bespoke SLA</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Entity 02
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Coordinated market access with verified attribution and contract boundaries.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: PARTNERSHIPS, NOT JUST INTRODUCTIONS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Commercial Discipline
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Partnerships Built Around Real Opportunities, Not Chat
              </h2>
              <div className="space-y-2 text-base text-[#64748B] leading-relaxed">
                <p>
                  Most B2B partnerships fail because they start with open-ended relationship building instead of concrete commercial alignment.
                </p>
                <p className="text-[#334155]">
                  On The Relay, partnerships originate from <strong className="text-[#171F2C] font-semibold">actionable demand</strong>: a customer looking for a bundled offering, a market requiring localized distribution, or an RFP demanding joint vendor qualifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Advantage 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Opportunity-Led Formation
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Partnerships form around specific, immediate dealflow rather than speculative theoretical alignment.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Immediate commercial traction
                </div>
              </div>

              {/* Advantage 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Economic Symmetry
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Both counterparties establish clear revenue splits, attribution rules, and client boundaries upfront.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Pre-agreed financial clarity
                </div>
              </div>

              {/* Advantage 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Account Protection
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Institutional NCND covenants ensure neither party can bypass or directly solicit shared accounts.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Zero partner circumvention
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: 6 PARTNERSHIP FORMATS SUPPORTED ON THE RELAY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Taxonomy of Alliances
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Supported B2B Partnership Formats
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Relay's structured protocol accommodates various bilateral and multilateral commercial relationship models:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Card 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Referral Alliances
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Bilateral pacts between complementary service firms to pass unserviceable dealflow under pre-agreed commission structures.
                  </p>
                </div>
                <Link
                  to="/b2b-referral-network"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-3 border-t border-[#E2E8F0]"
                >
                  <span>Explore Referral Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Card 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Network className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Distribution &amp; Channel
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Agreements with value-added resellers (VARs), territory distributors, and localized channel partners to expand market reach.
                  </p>
                </div>
                <Link
                  to="/distribution-partners"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-3 border-t border-[#E2E8F0]"
                >
                  <span>Explore Distribution Partners</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Card 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Co-Selling &amp; Bundling
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Strategic alignment between complementary technology and service providers to joint-pitch enterprise prospects.
                  </p>
                </div>
                <Link
                  to="/channel-partnerships"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] transition-colors pt-3 border-t border-[#E2E8F0]"
                >
                  <span>Explore Channel Partnerships</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Card 4 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Store className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Vendor Co-Sourcing
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Direct sourcing relationships for specialized technical, regulatory, or infrastructure subcontracting.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Specialist execution scope
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Strategic Advisory
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Collaborations involving board advisory, executive domain guidance, M&amp;A transaction support, and market entry.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Executive domain alignment
                </div>
              </div>

              {/* Card 6 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Custom Syndications
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Tailored commercial joint ventures, multi-entity consortium bids, and specialized cross-border commercial transactions.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Structured custom terms
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: STRATEGIC PARTNERSHIP-FIT CHECKLIST
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Vetting Standard
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Strategic Partner Evaluation Checklist
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Ensure commercial durability and operational alignment before committing to a strategic partnership:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Audience Symmetry",
                  desc: "Do both companies target equivalent decision-maker personas (e.g. VP Engineering, CFO) in overlapping sectors?",
                },
                {
                  step: "02",
                  title: "Product Non-Overlap",
                  desc: "Are product boundaries distinct to prevent internal sales friction or competitive cannibalization?",
                },
                {
                  step: "03",
                  title: "Commercial Economics",
                  desc: "Are revenue share percentages, co-selling incentives, and referral fees mutually motivating and sustainable?",
                },
                {
                  step: "04",
                  title: "Operational SLA",
                  desc: "Can both entities meet technical response, onboarding, and customer delivery standards reliably?",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold text-[#64748B]">
                        CRITERION {item.step}
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
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: TOPIC CLUSTER & INTERNAL LINKING
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Related Frameworks &amp; Use Cases
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Explore The Partnership Ecosystem
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Dive deeper into specific partnership verticals and operational guidelines across The Relay:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: Channel Partnerships */}
              <Link
                to="/channel-partnerships"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Channel Expansion
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Channel Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Build reseller networks, VAR programs, and co-selling agreements.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Explore Channel Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 2: Distribution Partners */}
              <Link
                to="/distribution-partners"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Territory Access
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Distribution Partners
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Connect with established regional distributors and enterprise channels.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Distribution Hub</span>
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
                    Dealflow Loops
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Referral Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Structure reciprocal deal sharing, commission models, and partner selection.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Referral Hub</span>
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
                    Execution Architecture
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    8-Step Journey
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Review the institutional transaction lifecycle from intent to completed handshake.
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
              SECTION 7: FAQ ACCORDION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Documentation &amp; Governance
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
              SECTION 8: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Strategic Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Build Partnerships Around Real Market Opportunities
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Connect with verified B2B enterprises to structure co-selling alliances, channel distribution agreements, and strategic subcontracting relationships with full consent governance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Partnership Opportunities
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post a Partnership Opportunity
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
