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
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/referral-partnerships")({
  head: () =>
    createSeoMeta({
      title: "B2B Referral Partnerships — Find Referral Partners | The Relay",
      description:
        "Learn how businesses can discover and structure B2B referral partnerships through a consent-driven commercial opportunity workflow.",
      path: "/referral-partnerships",
    }),
  component: ReferralPartnershipsPage,
});

export function ReferralPartnershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/referral-partnerships#webpage`,
        url: `${SITE_URL}/referral-partnerships`,
        name: "B2B Referral Partnerships — Find Referral Partners | The Relay",
        description:
          "Learn how businesses can discover and structure B2B referral partnerships through a consent-driven commercial opportunity workflow.",
        breadcrumb: {
          "@id": `${SITE_URL}/referral-partnerships#breadcrumb`,
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
        "@id": `${SITE_URL}/referral-partnerships#breadcrumb`,
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
            "name": "Referral Partnerships",
            "item": `${SITE_URL}/referral-partnerships`,
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
      q: "What is a formal B2B referral partnership?",
      a: "A B2B referral partnership is an explicit commercial agreement between two non-competing businesses that routinely encounter each other's target customers, establishing standard referral fees, delivery expectations, and client ownership boundaries.",
    },
    {
      q: "What is the typical referral fee range in B2B transactions?",
      a: "Depending on contract margin and lifetime value, referral fees typically range from 5% to 20% of the first contract value, or 5% to 10% ongoing revenue share on recurring monthly retainers (typically capped at 12–24 months).",
    },
    {
      q: "How does The Relay ensure referral commissions are tracked and honored?",
      a: "Opportunities originate with programmatic deal covenants and standardized Master NCND terms. Both parties agree on attribution windows and milestone triggers before mutual consent is confirmed.",
    },
    {
      q: "Can businesses exchange referrals without exchanging cash fees?",
      a: "Yes. Many high-performing B2B partners operate reciprocal deal-swap covenants, where counterparties return equivalent commercial opportunities over time rather than cash commissions.",
    },
    {
      q: "How does The Relay prevent partners from poaching direct clients?",
      a: "Our protocol enforces strict Non-Circumvent & Non-Disclosure (NCND) covenants. Introducing entities retain client ownership and unmask customer contact info only after binding terms are established.",
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
                Referral Partnerships
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: HERO SECTION WITH REFERRAL ARCHITECTURE DIAGRAM
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  Vertical Use Case • Referral Agreements
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  Turn complementary customer needs into referral partnerships.
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    A useful referral partnership starts when two businesses serve complementary customer needs, clearly understand who is being referred, and agree on how commercial value is exchanged.
                  </p>
                  <p className="text-[#334155]">
                    The Relay provides a structured opportunity layer where businesses discover potential referral counterparties, establish clear commission covenants, and execute verified introductions with mutual consent.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore Referral Partnerships
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post a Referral Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Pre-agreed commission schedules. Attribution boundaries. Zero blind spam.
                </p>
              </div>

              {/* Visual Column: Referral Agreement Workflow (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Referral Protocol Flow
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      RELAY-COV-01
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Step 1 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-[13px] font-semibold text-[#171F2C]">1. Opportunity Origin</div>
                        <div className="text-xs text-[#64748B]">Sanitized inbound lead outside internal scope</div>
                      </div>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0] text-[#64748B]">
                        Step 01
                      </span>
                    </div>

                    {/* Step 2 */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-[13px] font-semibold text-[#171F2C]">2. Commercial Covenant</div>
                        <div className="text-xs text-[#64748B]">10% Commission • 12-Month Attribution Window</div>
                      </div>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0] text-[#64748B]">
                        Step 02
                      </span>
                    </div>

                    {/* Step 3 */}
                    <div className="p-3.5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div>
                        <div className="text-[13px] font-bold text-white">3. Gated Handshake</div>
                        <div className="text-xs text-slate-300">Bilateral Signatory Consent &amp; Direct Intro</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Programmatic agreement covenants legally protect both parties prior to disclosure.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: 4 CORE PARTNER-FIT CRITERIA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Core Pillars
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Makes a Referral Partnership Work
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Successful referral loops aren't random. They are founded on four strict operational pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Pillar 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Audience Overlap
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Both companies sell to the exact same buyer persona at similar deal sizes and budget tiers.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Shared customer base
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Complementary Services
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Capabilities sit adjacent without competing, enabling seamless handoffs and client trust.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Zero internal conflict
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <Percent className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Incentive Alignment
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Clear commercial terms—commission percentage, milestone triggers, and attribution duration.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Pre-agreed economics
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#171F2C] mb-3">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Repeatable Process
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    A formalized protocol for introduction, qualification, disclosure, and ongoing progress tracking.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  Operational discipline
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: REAL OPERATOR EXAMPLES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Operator Case Studies
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Proven B2B Referral Pairings
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Real-world examples of complementary businesses scaling through structured referral agreements:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Example 1 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Agency &amp; Engineering
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    UX Design Studio ↔ Custom Engineering Firm
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Design studio completes enterprise product research and passes backend engineering implementation to a vetted partner, earning 10% on the engineering contract.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Standard: 10% closed value commission
                </div>
              </div>

              {/* Example 2 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    SaaS &amp; Implementation
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    HR Tech SaaS ↔ Organizational Change Consultancy
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    Consultancy introduces corporate clients rolling out modern HR platforms, receiving recurring 15% ARR rev-share for the first 12 months.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Standard: 15% First-Year ARR
                </div>
              </div>

              {/* Example 3 */}
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between hover:border-[#171F2C] transition-colors">
                <div>
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                    Professional Advisory
                  </div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                    Corporate CPA Practice ↔ M&amp;A Law Firm
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                    CPA practice refers business owners preparing for exit transactions to specialized M&amp;A attorneys under a bilateral reciprocal deal-swap pact.
                  </p>
                </div>
                <div className="text-xs text-[#64748B] pt-3 border-t border-[#E2E8F0]">
                  Standard: Reciprocal dealflow loop
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: TOPIC CLUSTER & INTERNAL LINKING
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Knowledge Mesh
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Explore The Referral &amp; Partnership Mesh
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Connect into adjacent commercial networks, how-to guides, and protocol standards:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hub 1: B2B Referral Network */}
              <Link
                to="/b2b-referral-network"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Parent Network
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    B2B Referral Network
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    The broad reciprocal referral marketplace and pairing mesh across The Relay.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>View Network</span>
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
                    Playbook
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    How To Find Partners
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Step-by-step operator guide for vetting and aligning with complementary partners.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Hub 3: Agency Lead Exchange */}
              <Link
                to="/agency-lead-exchange"
                className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                    Vertical Hub
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#171F2C] group-hover:text-[#64748B] mb-1">
                    Agency Lead Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Tailored for agencies managing out-of-scope enquiries and project overflow.
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-mono font-semibold text-[#171F2C] flex items-center gap-1">
                  <span>Explore Hub</span>
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
                    The complete transaction lifecycle from opportunity discovery to handshake.
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
              SECTION 6: FAQ ACCORDION
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
              SECTION 7: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Referral Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Structure Commercial Referral Partnerships on The Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Connect with verified complementary businesses, define programmatic commission agreements, and exchange unserviceable client opportunities under strict consent governance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Referral Partnerships
                </Link>
                <Link
                  to="/post"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post a Referral Opportunity
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
