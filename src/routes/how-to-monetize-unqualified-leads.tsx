import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Building2,
  Layers,
  FileText,
  Handshake,
  Share2,
  Network,
  Users,
  Briefcase,
  Search,
  PlusCircle,
  HelpCircle,
  Scale,
  Compass,
  ArrowLeftRight,
  Repeat,
  CheckSquare2,
  Workflow,
  Globe,
  Palette,
  Code2,
  TrendingUp,
  AlertCircle,
  Target,
  BarChart3,
  Layers3,
  XCircle,
  Coins,
  Percent,
  Ban,
  FileCheck,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/how-to-monetize-unqualified-leads")({
  head: () =>
    createSeoMeta({
      title: "How to Monetize Unqualified Leads | The Relay",
      description:
        "Learn how to monetize suitable unqualified B2B leads through referrals, opportunity exchanges, and other agreed commercial arrangements without treating every lead as valuable.",
      path: "/how-to-monetize-unqualified-leads",
    }),
  component: HowToMonetizeUnqualifiedLeadsPage,
});

export function HowToMonetizeUnqualifiedLeadsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can every unqualified lead be monetized?",
      a: "No. Monetization requires that an enquiry represents an authentic, active commercial requirement that a capable counterpart can legitimately fulfil. Spam enquiries, unverified inquiries, or fundamentally poor-fit prospects with unrealistic expectations have no meaningful referral or commercial value.",
    },
    {
      q: "What makes an unqualified lead worth referring?",
      a: "An opportunity is viable for referral when the underlying business need is clearly understood, the prospect has genuine commercial intent, the opportunity is currently active, and there is a plausible capability fit with a specialized receiving provider.",
    },
    {
      q: "What is the difference between an unqualified lead and an out-of-scope opportunity?",
      a: "An unqualified lead is a broad category encompassing any enquiry failing sales qualification. An out-of-scope opportunity is a high-intent, legitimate project enquiry that simply requires technical skills, domain expertise, delivery bandwidth, or geographic coverage that your specific company does not offer.",
    },
    {
      q: "How can businesses monetize leads they cannot fulfil?",
      a: "Businesses commonly monetize suitable out-of-scope leads by negotiating bilateral referral compensation, agreeing on recurring revenue share arrangements, establishing reciprocal lead exchange relationships, or routing the opportunity to specialist subcontracting partners.",
    },
    {
      q: "What is a referral fee?",
      a: "A referral fee is a mutually agreed commercial payment made by the receiving business to the referring company when a referred opportunity successfully converts into a signed client contract or billable engagement.",
    },
    {
      q: "What is revenue sharing in a lead referral?",
      a: "Revenue sharing is a commercial structure where the receiving business shares an agreed proportion of ongoing retainer or invoice revenue generated from the referred client engagement for a specified duration.",
    },
    {
      q: "Should referral terms be agreed before making an introduction?",
      a: "Yes. Participating businesses should establish clear commercial expectations regarding attribution windows, payment triggers, and client relationship boundaries prior to disclosing confidential prospect contact information.",
    },
    {
      q: "Is selling a lead the same as referring a lead?",
      a: "No. A referral is a curated, consent-driven introduction connecting an active client with a specialized provider capable of delivering the work. Selling a lead typically involves brokering access to contact lists or form fills without active provider alignment.",
    },
    {
      q: "Does The Relay guarantee payment or commissions?",
      a: "No. The Relay functions as an opportunity discovery and counterpart connection layer. All commercial terms, fee structures, payment timing, and settlement governance are negotiated and executed directly between the participating commercial entities.",
    },
    {
      q: "Does The Relay fulfil the referred opportunity?",
      a: "No. The Relay is not an agency, fulfilment provider, or project manager. The actual scoping, contract execution, delivery, and client relationship management remain strictly between the participating businesses and the end client.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/how-to-monetize-unqualified-leads#webpage`,
        url: `${SITE_URL}/how-to-monetize-unqualified-leads`,
        name: "How to Monetize Unqualified Leads | The Relay",
        description:
          "Learn how to monetize suitable unqualified B2B leads through referrals, opportunity exchanges, and other agreed commercial arrangements without treating every lead as valuable.",
        breadcrumb: {
          "@id": `${SITE_URL}/how-to-monetize-unqualified-leads#breadcrumb`,
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
        "@id": `${SITE_URL}/how-to-monetize-unqualified-leads#breadcrumb`,
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
            name: "B2B Opportunity Exchange",
            item: `${SITE_URL}/b2b-opportunity-exchange`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "How to Monetize Unqualified Leads",
            item: `${SITE_URL}/how-to-monetize-unqualified-leads`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/how-to-monetize-unqualified-leads#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
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
              <li>
                <Link to="/b2b-opportunity-exchange" className="hover:text-[#171F2C] transition-colors">
                  B2B Opportunity Exchange
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">
                Monetizing Unqualified Leads
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: HERO
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                  B2B LEAD MONETIZATION
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.16] mb-5">
                  How to Monetize Unqualified B2B Leads
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-8">
                  <p>
                    Businesses invest substantial resources generating inbound demand, yet many enquiries do not match their current service offerings, team capacity, or geographic focus.
                  </p>
                  <p className="text-[#334155]">
                    While poor-fit or spam leads hold no commercial value, legitimate out-of-scope opportunities can often support referral fees, revenue share, reciprocal opportunity exchange, or collaborative partner introductions.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4 w-full sm:w-auto">
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                  >
                    Explore B2B Lead Opportunities
                  </Link>
                  <Link
                    to="/post"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post an Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Evaluate suitability first · Agree commercial structures · Protect client trust
                </p>
              </div>

              {/* Graphic Column: Commercial Models */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Commercial Monetization Models
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      VAL-STRUCT-V1
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Coins className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Agreed Referral Fee</div>
                          <div className="text-xs text-[#64748B]">Bilateral commercial compensation on contract close</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Direct
                      </span>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Percent className="w-4 h-4 text-[#171F2C]" />
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">Revenue Share</div>
                          <div className="text-xs text-[#64748B]">Ongoing percentage on retained client billings</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Retainer
                      </span>
                    </div>

                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Repeat className="w-4 h-4 text-white" />
                        <div>
                          <div className="text-[13px] font-bold text-white">Reciprocal Deal Exchange</div>
                          <div className="text-xs text-slate-300">Bilateral exchange of complementary opportunities</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#171F2C] bg-white px-2 py-0.5 rounded-[2px] font-bold">
                        Deal Swap
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Commercial terms negotiated directly between participating entities.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: NOT EVERY UNQUALIFIED LEAD IS MONETIZABLE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Core Distinction
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Not Every Unqualified Lead Is Monetizable
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed">
                Commercial monetization is only feasible when an enquiry represents an authentic business need that another provider can realistically execute:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-rose-700 mb-2">CATEGORY A</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Poor-Fit Lead
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    Spam submissions, academic inquiries, or unrealistic demands that no legitimate provider could service.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                  <strong>Value:</strong> Zero monetization potential (Disqualify)
                </div>
              </div>

              <div className="p-5 bg-white border border-[#171F2C] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#171F2C] mb-2">CATEGORY B</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Out-of-Scope Opportunity
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A genuine project enquiry requiring specific services or technical stacks your firm does not offer.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#171F2C]">
                  <strong>Value:</strong> Strong referral / exchange potential
                </div>
              </div>

              <div className="p-5 bg-white border border-[#171F2C] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#171F2C] mb-2">CATEGORY C</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Capacity Mismatch
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A well-defined project your team could deliver, but cannot schedule during the client's mandatory timeline.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#171F2C]">
                  <strong>Value:</strong> Strong referral / exchange potential
                </div>
              </div>

              <div className="p-5 bg-white border border-[#171F2C] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#171F2C] mb-2">CATEGORY D</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Specialist Requirement
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    An engagement demanding specialized regulatory licensing, niche compliance, or dedicated industry expertise.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#171F2C]">
                  <strong>Value:</strong> High specialist referral value
                </div>
              </div>

              <div className="p-5 bg-white border border-[#171F2C] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#171F2C] mb-2">CATEGORY E</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Geographic Mismatch
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    A legitimate commercial requirement located in a foreign country or jurisdiction outside your operating footprint.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs font-mono text-[#171F2C]">
                  <strong>Value:</strong> Strong cross-border referral value
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#64748B] mb-2">DECISION GUIDE</div>
                  <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                    Need Help Routing?
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    Explore our comprehensive guide on diagnosing root causes before attempting monetization.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <Link
                    to="/what-to-do-with-unqualified-leads"
                    className="text-xs font-mono font-semibold text-[#171F2C] flex items-center gap-1 hover:underline"
                  >
                    <span>Read Decision Framework</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: WHEN CAN AN UNQUALIFIED LEAD HAVE COMMERCIAL VALUE?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Viability Criteria
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                When Can an Unqualified Lead Have Commercial Value?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Before exploring referral or exchange avenues, assess whether the opportunity satisfies key viability criteria:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">01 · Genuine Requirement</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The prospect possesses an active project need and authentic commercial backing rather than an exploratory concept.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">02 · Understood Scope</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Basic deliverables, technical parameters, and timeline context are sufficiently clear for a receiving firm to evaluate feasibility.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">03 · Plausible Provider Fit</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The requirement aligns with recognizable service models in the broader market where specialist providers operate.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">04 · Active Opportunity</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The initiative is currently moving forward, ensuring the receiving provider is engaging with an active buying cycle.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">05 · Appropriate Referral</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Connecting the client with a specialist solves their problem constructively and protects your professional reputation.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#171F2C] mb-1">06 · Governed Information</div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Project parameters can be reviewed anonymously, with client identifying data shared only after mutual interest and consent.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: WAYS TO CREATE COMMERCIAL VALUE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Commercial Structures
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How Businesses Can Monetize Suitable Unqualified Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Organizations utilize several commercial arrangements to structure value from unserviceable dealflow:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-base font-semibold text-[#171F2C]">
                  <Coins className="w-5 h-5 text-[#171F2C]" />
                  <span>A. Referral Fee</span>
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The referring company and receiving business establish a direct agreement for compensation upon contract close. The exact amount, trigger milestones, duration, and payment timing are determined and agreed directly between the participating commercial entities.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-base font-semibold text-[#171F2C]">
                  <Percent className="w-5 h-5 text-[#171F2C]" />
                  <span>B. Revenue Share</span>
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A recurring commercial structure where both parties agree to share a defined proportion of revenue arising from an ongoing retainer or managed service contract for an agreed duration.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-base font-semibold text-[#171F2C]">
                  <Repeat className="w-5 h-5 text-[#171F2C]" />
                  <span>C. Reciprocal Lead Exchange</span>
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Rather than exchanging cash commissions, complementary businesses (such as design and engineering boutiques) establish ongoing bilateral arrangements to trade out-of-scope opportunities throughout the year.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <div className="flex items-center gap-2 text-base font-semibold text-[#171F2C]">
                  <Handshake className="w-5 h-5 text-[#171F2C]" />
                  <span>D. Strategic Subcontracting &amp; Partnerships</span>
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A lead can serve as the foundation for a formal subcontracting relationship where the originating agency maintains client management while engaging a specialist partner for technical delivery.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: REFERRAL VS SELLING A LEAD
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Market Integrity
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Referral vs Selling a Lead
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Understanding the fundamental operational and ethical difference between genuine B2B referrals and commercial contact brokering:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#171F2C] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Structured B2B Referral
                </h3>
                <div className="text-xs font-mono text-[#171F2C] font-semibold">
                  Curated Match &amp; Problem Solving
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A consultative process where an agency introduces an active prospective client to a vetted counterpart with the precise capability, capacity, and standing to execute the client's requirements with excellence.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0] text-xs text-[#171F2C]">
                  Focus: High delivery fit, client consent, and long-term commercial relationships.
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Lead Sale / Contact Brokering
                </h3>
                <div className="text-xs font-mono text-[#64748B]">
                  Bulk Data Asset Trading
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The commercial resale of personal contact details, web form fills, or syndicated lists to multiple buyers with little regard for delivery compatibility or client experience.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                  Focus: Transactional data monetization rather than tailored delivery matching.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: HOW TO EVALUATE A LEAD BEFORE TRYING TO MONETIZE IT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Evaluation Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How to Evaluate a Lead Before Trying to Monetize It
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Monetization should always follow disciplined suitability evaluation:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">01. Understand Need</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Clarify the core project requirements, deliverables, and commercial objectives.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">02. Confirm Active Status</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Verify that the initiative has current budget backing and an active decision timeline.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">03. Identify Internal Gap</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Document why your business cannot service the work (scope, bandwidth, or territory).
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">04. Define Required Skills</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Specify the exact domain expertise, certifications, or technical stack needed.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">05. Assess Peer Fit</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Determine whether standard service firms could realistically execute the project.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">06. Sanitize Context</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Structure the project parameters without prematurely exposing identifying data.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">07. Select Channel</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Decide whether a direct partner introduction or open exchange listing is appropriate.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-1">08. Agree Terms</div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Establish clear commercial expectations with the receiving partner prior to introduction.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: WHAT SHOULD A LEAD REFERRAL ARRANGEMENT DEFINE?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Agreement Standards
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Should a Lead Referral Arrangement Define?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Participating businesses should document clear bilateral expectations across key commercial dimensions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  1. Definition of Valid Referral
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Explicit criteria for what constitutes a recognized introduction versus an existing prospect.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  2. Client Relationship Ownership
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Clear boundaries regarding client communication and cross-selling limitations.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  3. Attribution Period
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The defined timeframe during which a closed deal qualifies for referral recognition.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  4. Payment Trigger &amp; Timing
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Whether compensation triggers on contract signing, invoice issuance, or cash collection.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  5. Information Disclosure Boundaries
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Governance on handling confidential prospect data and obtaining client introduction consent.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  6. Termination &amp; Dispute Terms
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Mechanisms for concluding the arrangement and resolving pipeline attribution questions.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: WHERE THE RELAY FITS IN LEAD MONETIZATION
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Role &amp; Scope
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where The Relay Fits in Lead Monetization
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay serves as an opportunity discovery and counterpart connection layer for businesses managing unserviceable demand:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  What The Relay Provides
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>A structured venue to list out-of-scope commercial requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Discovery layer connecting verified businesses with specialized peers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Bilateral interest signaling and mutual capability evaluation workflows.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  What The Relay Does Not Do
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not guarantee a closed sale, buyer match, or payout.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not fulfil client projects on behalf of participating firms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                    <span>The Relay does not replace direct commercial agreements or client consent.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Topic Hub Links */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                Explore The Complete Opportunity Architecture
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link
                  to="/b2b-lead-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/what-to-do-with-unqualified-leads"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">What To Do With Unqualified Leads</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/agency-lead-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">Agency Lead Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/how-to-exchange-business-leads"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">How to Exchange Business Leads</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/b2b-opportunity-exchange"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">B2B Opportunity Exchange</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>

                <Link
                  to="/8-step-journey"
                  className="p-3 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors flex items-center justify-between"
                >
                  <span className="text-[13px] font-medium text-[#171F2C]">8-Step Journey: Lifecycle Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 9: EXAMPLES OF MONETIZING SUITABLE UNQUALIFIED LEADS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Hypothetical Scenarios
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Examples of Monetizing Suitable Unqualified Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Illustrative examples showing how businesses navigate unserviceable enquiries:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Web Studio &amp; Native Mobile App Requirement
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A web design agency receives an inbound enquiry from an existing client for native iOS and Android development. Because mobile engineering sits outside their core service offering, the agency introduces the opportunity to a specialized mobile boutique under an agreed bilateral referral arrangement.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Outcome:</strong> Structured partner referral under agreed commercial terms.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Consulting Firm &amp; International Geographic Mismatch
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A North American management consultancy receives an engagement request requiring on-site audit delivery in Germany. The firm connects the client with a regional European consulting partner capable of providing local language and regulatory presence.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Outcome:</strong> Regional counterpart introduction solving client requirements.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  SaaS Provider &amp; Custom Implementation Services
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A software vendor receives enterprise requests for bespoke systems integration that its internal customer success team does not deliver. The vendor routes the project to a certified systems integration partner.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Outcome:</strong> Systems integrator handles implementation while vendor closes software subscription.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Boutique Agency &amp; Peak Delivery Bandwidth
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A creative studio is invited to pitch an active brand identity project but is fully committed for the upcoming quarter. The studio lists the requirement on The Relay to discover an aligned peer studio for a reciprocal deal exchange.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Outcome:</strong> Reciprocal dealflow alignment between peer agencies.
                </div>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[10px] font-mono font-semibold text-[#64748B] uppercase mb-1">
                  Illustrative Example 05
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1">
                  Spam Submission or Unverified Form Fill
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-2">
                  A business receives an automated spam enquiry containing invalid contact information and non-existent company parameters.
                </p>
                <div className="text-xs font-mono text-[#171F2C]">
                  <strong>Outcome:</strong> Disqualified immediately; holds zero referral or commercial value.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 10: COMMON MISTAKES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Operational Pitfalls
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Common Mistakes When Trying to Monetize Unqualified Leads
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Avoid these frequent operational missteps when structuring referral opportunities:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Treating All as Valuable
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Assuming every unqualified submission has monetary value rather than filtering for authentic project demand.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Referring Without Checking Fit
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Passing an opportunity to a receiving firm without evaluating their specific domain capability.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Premature Data Disclosure
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Sharing sensitive client contact details before establishing mutual interest and client consent.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Failing to Agree Terms
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Making introductions without clear, documented expectations regarding fee timing and attribution.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Prioritizing Fees Over Fit
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Focusing on commission percentages rather than ensuring the client receives high-quality service.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Assuming Partner Acceptance
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Assuming a counterpart will accept an unverified lead without giving them room to assess fit.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Confusing Out-of-Scope with Spam
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Failing to distinguish between illegitimate noise and genuine high-intent out-of-scope opportunities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Promising Unilateral Revenue
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Promising internal stakeholders guaranteed returns before commercial terms are formally finalized.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 11: DECISION MATRIX
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Routing Reference
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Should You Monetize, Refer, Nurture, or Disqualify?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A quick reference guide for evaluating common inbound scenarios:
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono font-semibold text-[#64748B] uppercase">
                    <th className="p-4">Inbound Scenario</th>
                    <th className="p-4">Characteristics</th>
                    <th className="p-4">Possible Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#171F2C]">
                  <tr>
                    <td className="p-4 font-semibold">Poor-Fit Prospect</td>
                    <td className="p-4 text-[#64748B]">Fundamental mismatch in scale, industry, or use case</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Disqualify</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Spam / Fake Enquiry</td>
                    <td className="p-4 text-[#64748B]">Invalid contact data, automated bot submission</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Disqualify</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Missing Information</td>
                    <td className="p-4 text-[#64748B]">Incomplete brief or undetermined project parameters</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Qualify further</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Good Fit, Not Ready</td>
                    <td className="p-4 text-[#64748B]">Target account with delayed budget or future roadmap</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Nurture / recycle</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Good Opportunity, Wrong Service</td>
                    <td className="p-4 text-[#64748B]">Active project requiring technical skills outside your stack</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white">Refer / exchange</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Good Opportunity, Wrong Geography</td>
                    <td className="p-4 text-[#64748B]">Clear demand located in an unsupported jurisdiction</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white">Refer / exchange</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Good Opportunity, Temporary Capacity Issue</td>
                    <td className="p-4 text-[#64748B]">Active need coinciding with internal team over-utilization</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Refer / exchange / revisit</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Specialist Requirement</td>
                    <td className="p-4 text-[#64748B]">Niche regulatory or platform certification required</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#171F2C] text-white">Refer / exchange</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Commercial Model Mismatch</td>
                    <td className="p-4 text-[#64748B]">Conflict with standard minimums or billing models</td>
                    <td className="p-4"><span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]">Disqualify, renegotiate, or refer</span></td>
                  </tr>
                </tbody>
              </table>
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
                How to Monetize Unqualified Leads FAQ
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
              SECTION 13: FINAL DUAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                Unfulfilled Opportunities
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight mb-4">
                Have a Lead Your Business Cannot Fulfil?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Some unqualified leads have no meaningful next step. Others represent legitimate opportunities that simply do not fit your current capabilities. When there is a plausible business fit elsewhere, referral or opportunity exchange may create commercial value for both sides.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore B2B Lead Opportunities
                </Link>
                <Link
                  to="/how-to-exchange-business-leads"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Learn How to Exchange Business Leads
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
