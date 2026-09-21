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
  Repeat,
  CheckSquare2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSeoMeta, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/b2b-referral-network")({
  head: () =>
    createSeoMeta({
      title: "B2B Referral Network — Find Referral Partners | The Relay",
      description:
        "Find and build B2B referral partnerships with businesses that serve complementary customers. Discover referral opportunities and exchange qualified business introductions on The Relay.",
      path: "/b2b-referral-network",
      keywords:
        "B2B referral network, business referral network, B2B referral partners, find referral partners, B2B referral partnerships, business referral partners, referral network for businesses, B2B referrals, business referral program, find B2B partners, business networking referrals",
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
          "Find and build B2B referral partnerships with businesses that serve complementary customers. Discover referral opportunities and exchange qualified business introductions on The Relay.",
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
            name: "B2B Referral Network",
            item: `${SITE_URL}/b2b-referral-network`,
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
        "@id": `${SITE_URL}/b2b-referral-network#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a B2B referral network?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A B2B referral network is a group or platform that connects complementary businesses so they can exchange relevant customer introductions and commercial opportunities.",
            },
          },
          {
            "@type": "Question",
            name: "How do I find B2B referral partners?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Start with businesses that serve similar customers but offer complementary services. Define the situations where a referral would naturally occur, then approach businesses that fit that profile. The Relay provides a structured environment for discovering and discussing those opportunities.",
            },
          },
          {
            "@type": "Question",
            name: "What makes a good referral partner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Good referral partners usually have complementary capabilities, overlapping customer profiles, clear referral situations and confidence in each other's ability to serve the customer.",
            },
          },
          {
            "@type": "Question",
            name: "Is a referral network the same as a lead exchange?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. A lead exchange is primarily about exchanging individual opportunities or leads. A referral network is about establishing relationships through which relevant opportunities can be referred over time.",
            },
          },
          {
            "@type": "Question",
            name: "Do referral partners have to be competitors?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Generally, referral relationships are more natural between businesses with complementary rather than overlapping services. The specific relationship depends on the businesses involved.",
            },
          },
          {
            "@type": "Question",
            name: "Can agencies use a B2B referral network?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Agencies frequently encounter customer needs outside their own services, making complementary relationships with development firms, consultants, specialists and other service providers potentially useful.",
            },
          },
          {
            "@type": "Question",
            name: "Does Relay guarantee referrals or revenue?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Relay provides a structured environment for discovering opportunities and connecting businesses. Referral volume, revenue and conversion depend on the participating businesses and the opportunities involved.",
            },
          },
        ],
      },
    ],
  };

  const faqs = [
    {
      q: "What is a B2B referral network?",
      a: "A B2B referral network is a group or platform that connects complementary businesses so they can exchange relevant customer introductions and commercial opportunities.",
    },
    {
      q: "How do I find B2B referral partners?",
      a: "Start with businesses that serve similar customers but offer complementary services. Define the situations where a referral would naturally occur, then approach businesses that fit that profile. The Relay provides a structured environment for discovering and discussing those opportunities.",
    },
    {
      q: "What makes a good referral partner?",
      a: "Good referral partners usually have complementary capabilities, overlapping customer profiles, clear referral situations and confidence in each other's ability to serve the customer.",
    },
    {
      q: "Is a referral network the same as a lead exchange?",
      a: "No. A lead exchange is primarily about exchanging individual opportunities or leads. A referral network is about establishing relationships through which relevant opportunities can be referred over time.",
    },
    {
      q: "Do referral partners have to be competitors?",
      a: "Generally, referral relationships are more natural between businesses with complementary rather than overlapping services. The specific relationship depends on the businesses involved.",
    },
    {
      q: "Can agencies use a B2B referral network?",
      a: "Yes. Agencies frequently encounter customer needs outside their own services, making complementary relationships with development firms, consultants, specialists and other service providers potentially useful.",
    },
    {
      q: "Does Relay guarantee referrals or revenue?",
      a: "No. Relay provides a structured environment for discovering opportunities and connecting businesses. Referral volume, revenue and conversion depend on the participating businesses and the opportunities involved.",
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
                <Link
                  to="/b2b-opportunity-exchange"
                  className="hover:text-[#171F2C] transition-colors"
                >
                  B2B Opportunity Exchange
                </Link>
              </li>
              <li className="text-[#94A3B8]">/</li>
              <li className="text-[#171F2C] font-bold">B2B Referral Network</li>
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
                  Complementary Referral Relationships
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#171F2C] tracking-tight leading-[1.18] mb-4">
                  Find B2B Referral Partners That Complement Your Business
                </h1>
                <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-2xl mb-6">
                  <p>
                    The best referral relationships are often between businesses that serve the same
                    customers but solve different problems.
                  </p>
                  <p>
                    A software company may need an implementation partner. An agency may need a
                    specialist developer. A consultant may regularly meet clients who need services
                    outside their expertise.
                  </p>
                  <p className="text-[#171F2C] font-medium">
                    The Relay gives businesses a structured place to discover complementary
                    companies and build referral relationships around real opportunities.
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
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-5 h-[42px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                  >
                    Post an Opportunity
                  </Link>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-medium tracking-wide">
                  Find relevant businesses. Exchange opportunities. Build relationships that make
                  commercial sense.
                </p>
              </div>

              {/* Visual Pairing Mesh Graphic */}
              <div className="lg:col-span-5 w-full">
                <div className="p-5 sm:p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                      Complementary Pairing Model
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">RELAY-REF-MESH</span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Originator Node */}
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[4px] bg-white border border-[#E2E8F0] flex items-center justify-center font-mono font-bold text-xs text-[#171F2C]">
                          A
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-[#171F2C]">
                            Design &amp; Branding Studio
                          </div>
                          <div className="text-xs text-[#64748B]">
                            Regularly encounters custom software needs
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Shared ICP
                      </span>
                    </div>

                    {/* Central Exchange Hub */}
                    <div className="p-3 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <ArrowLeftRight className="w-4 h-4 text-white shrink-0" />
                        <div>
                          <div className="text-[13px] font-bold text-white">
                            Reciprocal Opportunity Exchange
                          </div>
                          <div className="text-xs text-slate-300">
                            Opportunity-First Discovery ➔ Bilateral Agreement
                          </div>
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
                          <div className="text-[13px] font-semibold text-[#171F2C]">
                            Custom Software Engineering Firm
                          </div>
                          <div className="text-xs text-[#64748B]">
                            Regularly encounters branding &amp; UI requests
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                        Shared ICP
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-[#64748B]">
                    Ongoing two-way referral flow based on complementary core capabilities.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              2. WHAT IS A B2B REFERRAL NETWORK?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Definition &amp; Structure
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Is a B2B Referral Network?
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                <p>
                  A <strong className="text-[#171F2C]">B2B referral network</strong> connects
                  businesses that can refer relevant customers, prospects or commercial
                  opportunities to one another.
                </p>
                <p>
                  The strongest relationships are usually complementary rather than competitive. Two
                  businesses may serve the same customer type while offering different services.
                  That creates an opportunity for both sides to introduce work that fits the other
                  business.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  A Web Development Company &amp; Branding Agency
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A web development company refers branding and identity projects to a creative
                  agency, while the branding agency refers technical implementation and custom
                  software development.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  A Tax Advisor &amp; Legal Practice
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A corporate tax advisor regularly identifies clients needing corporate
                  restructuring, SEC regulatory compliance, or specialized commercial contracts
                  handled by an aligned law firm.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  A SaaS Vendor &amp; Systems Integrator
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A software vendor closes product subscriptions but refers complex legacy migration
                  and custom workflow integration to certified implementation specialists.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  A Management Consultant &amp; Specialist Agency
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A strategic advisor diagnoses marketing or technology operational gaps and
                  introduces dedicated specialist providers to execute the recommended roadmap.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
              The relationship works because each business encounters needs the other business can
              address. This complementary model is a common foundation of business referral
              networks.
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              3. WHY BUILD A REFERRAL NETWORK?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                  Core Rationale
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                  Why Build a Referral Network?
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                  <p className="text-base sm:text-lg text-[#171F2C] font-semibold">
                    A referral relationship can solve a simple problem: Your customers don&apos;t
                    only need what you sell.
                  </p>
                  <p>
                    A customer might need several services across their business lifecycle. You may
                    provide one part of that solution while another company provides another.
                  </p>
                  <p>
                    Instead of treating that additional need as someone else&apos;s problem, you can
                    develop a relationship with a business that can help.
                  </p>
                  <p>
                    Over time, the relationship can work in both directions: You refer relevant
                    opportunities to them, and they refer relevant opportunities to you.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                  <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider pb-2 border-b border-[#E2E8F0]">
                    Two-Way Lifecycle Flow
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#64748B] space-y-1.5">
                    <div className="font-semibold text-[#171F2C]">1. Customer Trust Expansion</div>
                    <div>
                      Solve adjacent customer problems by introducing vetted specialists rather than
                      turning them away.
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs text-[#64748B] space-y-1.5">
                    <div className="font-semibold text-[#171F2C]">2. Reciprocal Deal Inflow</div>
                    <div>
                      Establish consistent inbound dealflow from partners encountering requirements
                      aligned with your core focus.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              4. WHAT MAKES A GOOD REFERRAL PARTNER?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Partner Qualification
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Makes a Good Referral Partner?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A good referral partner isn&apos;t simply another business that wants more leads.
                The relationship usually works better when the businesses have:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">01</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Complementary Services
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  You solve different problems for the same or similar buyers without competing
                  directly for the same service line.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">02</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">Customer Overlap</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Both businesses encounter the same kinds of companies, buyer personas, deal sizes,
                  or decision-makers.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">03</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Clear Referral Situations
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  You can identify concrete, recurring situations where one business naturally needs
                  the other&apos;s capabilities.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">04</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Reasonable Commercial Alignment
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Both sides understand how introductions, referrals or commercial arrangements will
                  work in practice.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">05</div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  Confidence in Delivery
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  You are comfortable putting another business in front of your customer and
                  trusting their quality of execution.
                </p>
              </div>

              <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex flex-col justify-center">
                <div className="text-xs font-mono uppercase text-[#64748B] mb-1">
                  Quality Over Quantity
                </div>
                <p className="text-[13px] font-medium text-[#171F2C] leading-relaxed">
                  The goal isn&apos;t to collect hundreds of contacts. It&apos;s to find businesses
                  you have a genuine reason to refer to.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              5. EXAMPLES OF COMPLEMENTARY B2B REFERRAL PARTNERS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Practical Combinations
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Examples of Complementary B2B Referral Partners
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Real-world combinations of complementary businesses exchanging recurring
                opportunities:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase text-[#64748B] mb-1.5">
                  Pairing 01
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Agency + Software Company
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A creative agency wins a project requiring custom software development. A software
                  company can fulfil the technical work while the agency provides the creative
                  relationship. Both businesses serve the same client without providing the exact
                  same service.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase text-[#64748B] mb-1.5">
                  Pairing 02
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Consultant + Specialist Provider
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A business consultant identifies a customer that needs specialist compliance
                  support. A specialist provider can take the requirement, allowing the consultant
                  to refer the opportunity rather than attempting work outside their expertise.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase text-[#64748B] mb-1.5">
                  Pairing 03
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  SaaS Company + Implementation Partner
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A software company sells the product but doesn&apos;t provide every implementation
                  service customers may need. An implementation or integration specialist fills that
                  gap, establishing a referral relationship around recurring deployment needs.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-[11px] font-mono font-semibold uppercase text-[#64748B] mb-1.5">
                  Pairing 04
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Regional Business + Local Partner
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A company receives an enquiry from a geographic market it doesn&apos;t currently
                  serve. A suitable regional partner already operates there. The relationship
                  creates a path for the opportunity without requiring a new local operation.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              6. REFERRAL NETWORK VS LEAD EXCHANGE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Topical Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Referral Network vs. Lead Exchange
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                These concepts are closely connected, but they serve distinct operational needs:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-[#64748B] uppercase mb-1">
                  B2B Lead Exchange
                </div>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">
                  Focuses on the Individual Opportunity
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-3">
                  <em>
                    &ldquo;I received this lead and need another business that can pursue it.&rdquo;
                  </em>{" "}
                  Transactional discovery and routing for a specific out-of-scope inquiry.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0]">
                  <Link
                    to="/b2b-lead-exchange"
                    className="text-xs font-mono font-semibold text-[#171F2C] hover:text-[#64748B] flex items-center gap-1"
                  >
                    <span>Explore the B2B Lead Exchange</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-5 bg-[#171F2C] text-white border border-[#171F2C] rounded-[4px]">
                <div className="text-xs font-mono font-semibold text-slate-300 uppercase mb-1">
                  B2B Referral Network
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Focuses on the Relationship Between Businesses
                </h3>
                <p className="text-[13px] text-slate-300 leading-relaxed mb-3">
                  <em>
                    &ldquo;We serve similar customers and can regularly refer relevant opportunities
                    to each other.&rdquo;
                  </em>{" "}
                  Ongoing alignment between complementary providers.
                </p>
                <div className="text-xs font-mono text-slate-300 pt-2 border-t border-slate-700">
                  Recurring bilateral ecosystem
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              The Relay supports both: lead exchange and referral network are separate parts of the
              broader Relay opportunity ecosystem.
            </p>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              7. HOW A B2B REFERRAL RELATIONSHIP CAN WORK ON RELAY
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Step-by-Step Flow
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How a B2B Referral Relationship Can Work on Relay
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Relay provides an opportunity-driven pipeline to initiate and formalize referral
                partnerships:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  01 — Identify the opportunity
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  A business posts or discovers a commercial opportunity that sits outside its
                  immediate delivery scope.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  02 — Determine the right capability
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The originating business identifies what type of complementary company or
                  specialist could help.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  03 — Find a relevant business
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Another business with complementary capabilities discovers the listing on the
                  opportunities board.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  04 — Express interest
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The potential referral partner indicates that the opportunity matches their core
                  service offerings.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  05 — Discuss the relationship
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Both sides review context, evaluate mutual fit, and discuss how they want to work
                  together.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <div className="text-xs font-mono font-bold text-[#171F2C] mb-2">
                  06 — Agree on the next step
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  The businesses decide whether to make an introduction, collaborate, refer the
                  lead, or establish an ongoing channel.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-xs sm:text-[13px] text-[#171F2C]">
              The Relay facilitates the connection.{" "}
              <strong>The businesses decide the relationship.</strong>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              8. WHAT REFERRAL NETWORKS ARE NOT
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Clarity &amp; Focus
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What Referral Networks Are Not
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                A referral network doesn&apos;t need to be a giant directory. It doesn&apos;t have
                to mean:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
              {[
                "Collecting thousands of business cards",
                "Sending random unsolicited introductions",
                "Asking everyone for generic referrals",
                "Joining endless networking groups",
                "Accepting every business as a partner",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-[#E2E8F0] rounded-[4px] flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#64748B] mt-1.5 shrink-0"></span>
                  <span className="text-xs sm:text-[13px] text-[#171F2C] font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border border-[#171F2C] rounded-[4px] text-xs sm:text-[13px] text-[#171F2C] leading-relaxed">
              The value comes from <strong>relevance and trust</strong>, not network size.
              Relay&apos;s approach is to put the <strong>commercial opportunity itself</strong> at
              the center of the interaction.
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              9. WHO CAN BENEFIT FROM A B2B REFERRAL NETWORK?
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Target Operators
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Who Can Benefit from a B2B Referral Network?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Complementary partnerships create structured growth across multiple business models:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">Agencies</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Find complementary design, dev, or marketing firms for customer projects outside
                  your core services.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">Consultants</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Build relationships with specialists and execution partners your advisory clients
                  frequently need.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">Software Companies</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Create referral relationships around implementation, custom integrations, and
                  complementary products.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Professional Service Firms
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Exchange opportunities with legal, accounting, and advisory firms serving similar
                  client profiles.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-sm font-semibold text-[#171F2C] mb-1">
                  Founders and Operators
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Discover businesses that can complement your core offering or open relevant
                  customer relationships.
                </p>
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex flex-col justify-center">
                <div className="text-[11px] font-mono text-[#64748B] uppercase mb-0.5">
                  Shared Objective
                </div>
                <div className="text-xs font-semibold text-[#171F2C]">
                  Exchange opportunities that solve real client needs without competing.
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              10. REFERRAL PARTNERSHIPS WORK BEST WHEN FIT IS SPECIFIC
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Precision Matching
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Referral Partnerships Work Best When the Fit Is Specific
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                <p>
                  &ldquo;Any business owner&rdquo; isn&apos;t a useful referral-partner profile.
                </p>
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-[4px]">
                  <div className="text-xs font-mono uppercase text-[#64748B] mb-1">
                    Example of a Specific Profile
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#171F2C]">
                    &ldquo;A software company serving mid-market ecommerce brands that doesn&apos;t
                    provide paid acquisition.&rdquo;
                  </div>
                </div>
                <p>
                  Now there is a clear reason for the relationship. The businesses share a customer
                  context. Their services don&apos;t directly compete. And each can recognize
                  situations where the other may be relevant.
                </p>
                <p className="text-[#171F2C] font-medium">
                  That&apos;s the type of specificity a referral network needs.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              11. REFERRAL OPPORTUNITIES CAN WORK BOTH WAYS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                  Reciprocity
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                  Referral Opportunities Can Work Both Ways
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-4">
                  <p>
                    A healthy referral relationship isn&apos;t necessarily a one-way pipeline where
                    Business A sends leads and Business B only receives them.
                  </p>
                  <p className="text-base sm:text-lg text-[#171F2C] font-semibold">
                    It can become: Business A ↔ Business B
                  </p>
                  <p>
                    A marketing agency may refer custom development work, while the development
                    company refers branding and marketing. A consultant may refer legal work, while
                    the legal firm refers management consulting.
                  </p>
                  <p>
                    That reciprocal structure is one reason complementary businesses can benefit
                    from deliberate referral relationships.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3 text-xs text-[#64748B]">
                  <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase pb-2 border-b border-[#E2E8F0]">
                    Balanced Exchange Archetypes
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="font-semibold text-[#171F2C]">Marketing Agency</span>
                    <ArrowLeftRight className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-semibold text-[#171F2C]">Dev Studio</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="font-semibold text-[#171F2C]">SaaS Vendor</span>
                    <ArrowLeftRight className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-semibold text-[#171F2C]">Integrator</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px]">
                    <span className="font-semibold text-[#171F2C]">Advisory Firm</span>
                    <ArrowLeftRight className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-semibold text-[#171F2C]">Legal Counsel</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              12. BUILD AROUND REAL OPPORTUNITIES, NOT NETWORKING FOR ITS OWN SAKE
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-12">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Opportunity-First Model
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Build Around Real Opportunities, Not Networking for Its Own Sake
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                <p>
                  Traditional networking can be useful. But a conversation that starts with:{" "}
                  <em className="text-[#171F2C]">&ldquo;What do you do?&rdquo;</em> is very
                  different from:{" "}
                  <strong className="text-[#171F2C]">
                    &ldquo;I have a customer who needs something you provide.&rdquo;
                  </strong>
                </p>
                <p>
                  The second conversation already has commercial context. That&apos;s where The
                  Relay fits. The platform is designed around <strong>opportunities first</strong>,
                  with referral relationships developing around those opportunities.
                </p>
              </div>
            </div>

            {/* Internal Topic Mesh */}
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
              <div className="text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                Explore The Referral Ecosystem &amp; Guides
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link
                  to="/referral-partnerships"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Referral Partnerships
                  </div>
                  <div className="text-xs text-[#64748B]">Partnership structures &amp; models</div>
                </Link>

                <Link
                  to="/how-to-find-b2b-referral-partners"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Find Partners Guide
                  </div>
                  <div className="text-xs text-[#64748B]">Operator identification playbook</div>
                </Link>

                <Link
                  to="/b2b-partnership-network"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Partnership Network
                  </div>
                  <div className="text-xs text-[#64748B]">
                    Co-selling &amp; distribution channels
                  </div>
                </Link>

                <Link
                  to="/distribution-partners"
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-colors"
                >
                  <div className="text-[11px] font-mono font-semibold text-[#171F2C] mb-0.5">
                    Distribution Partners
                  </div>
                  <div className="text-xs text-[#64748B]">Channel &amp; reseller networks</div>
                </Link>
              </div>

              <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B]">
                <Link
                  to="/b2b-opportunity-exchange"
                  className="hover:text-[#171F2C] underline underline-offset-4"
                >
                  B2B Opportunity Exchange Hub
                </Link>
                <Link
                  to="/8-step-journey"
                  className="hover:text-[#171F2C] underline underline-offset-4"
                >
                  8-Step Journey
                </Link>
                <Link
                  to="/trust-and-safety"
                  className="hover:text-[#171F2C] underline underline-offset-4"
                >
                  Trust &amp; Safety
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
                Find the Businesses Your Customers May Need Next.
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto mb-6 leading-relaxed">
                Your customers don&apos;t only need your service. They need everything around it.
                Find complementary businesses, exchange relevant opportunities and build referral
                relationships around real commercial needs.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore Referral Opportunities
                </Link>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Post an Opportunity
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
