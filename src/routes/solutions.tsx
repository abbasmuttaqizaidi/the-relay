import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ChevronDown,
  Repeat,
  Users,
  Building2,
  HelpCircle,
  ShieldCheck,
  Compass,
  Layers,
  Network,
  Handshake,
  Workflow,
  Share2,
  Target,
  CheckSquare2,
  XCircle,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOLUTIONS_DATA } from '@/design-system/solutions-menu';
import { createSeoMeta, SITE_URL } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/solutions')({
  component: SolutionsHubPage,
  head: () =>
    createSeoMeta({
      title: 'B2B Opportunity Exchange Solutions | The Relay',
      description:
        "Explore The Relay's B2B opportunity exchange solutions for lead exchange, referral partnerships, agency opportunities, channel relationships, distribution, and commercial dealflow discovery.",
      path: '/solutions',
    }),
});

const CATEGORY_ICONS: Record<string, typeof Repeat> = {
  Exchange: Repeat,
  Partnerships: Users,
  'For Businesses': Building2,
  Resources: HelpCircle,
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Exchange: 'Explore B2B opportunity and lead exchange workflows.',
  Partnerships:
    'Discover referral, channel, distribution, and broader commercial partnership models.',
  'For Businesses':
    'Explore business-specific routes for agency and service-provider opportunities.',
  Resources: 'Learn how to evaluate, route, and exchange commercial opportunities.',
};

export function SolutionsHubPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What solutions does The Relay provide?',
      a: 'The Relay provides structured discovery frameworks for commercial opportunity routing, B2B lead exchange, agency deal routing, referral partnerships, channel partner discovery, and distribution partner search.',
    },
    {
      q: 'What is the difference between B2B lead exchange and referral partnerships?',
      a: 'B2B lead exchange focuses on routing specific out-of-scope or unfulfilled client requirements to qualified counterparties. Referral partnerships focus on building ongoing relationships between complementary firms that serve similar buyers.',
    },
    {
      q: 'Which solution is relevant if my business cannot fulfil a lead?',
      a: 'If you have an out-of-scope, mismatched, or over-capacity lead, start with B2B Lead Exchange and read our guides on What To Do With Unqualified Leads and How to Monetize Unqualified Leads.',
    },
    {
      q: 'Which solution is relevant for agency opportunities?',
      a: 'Agencies managing specialized client inquiries outside their delivery scope should explore the Agency Lead Exchange solution page for agency-tailored deal routing.',
    },
    {
      q: 'How is a channel partnership different from distribution?',
      a: 'Channel partnerships encompass various indirect sales models including resellers, systems integrators, and MSPs. Distribution partnerships specifically involve partners holding inventory, regional fulfillment capabilities, or broad downstream dealer networks.',
    },
    {
      q: 'Where can I learn how to exchange business leads?',
      a: 'Our educational guide How to Exchange Business Leads details the end-to-end qualification, introduction protocol, attribution, and commercial agreement process.',
    },
    {
      q: 'Can The Relay guarantee a business opportunity or partner?',
      a: 'No. The Relay operates as an opportunity and partner discovery venue. Bilateral acceptance, commercial negotiations, and deal fulfillment depend entirely on the participating businesses.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/solutions#webpage`,
        url: `${SITE_URL}/solutions`,
        name: 'B2B Opportunity Exchange Solutions | The Relay',
        description:
          "Explore The Relay's B2B opportunity exchange solutions for lead exchange, referral partnerships, agency opportunities, channel relationships, distribution, and commercial dealflow discovery.",
        breadcrumb: {
          '@id': `${SITE_URL}/solutions#breadcrumb`,
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'The Relay',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/solutions#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Solutions',
            item: `${SITE_URL}/solutions`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/solutions#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'The Relay',
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
              <li className="text-[#171F2C] font-bold">
                Solutions
              </li>
            </ol>
          </nav>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: HERO
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-4">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#171F2C]"></span>
                B2B COMMERCIAL SOLUTIONS
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#171F2C] tracking-tight leading-[1.12] mb-5">
                B2B Opportunity Exchange Solutions
              </h1>
              <div className="space-y-3 text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-3xl mb-8">
                <p>
                  The Relay provides several related ways for businesses to discover and explore commercial opportunities and partnerships.
                </p>
                <p className="text-[#334155]">
                  Whether a business needs to route an opportunity it cannot fulfil, find a referral relationship, explore channel or distribution partners, or understand how business lead exchange works, the relevant solution begins with the business problem.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore B2B Opportunities
                </Link>
                <Link
                  to="/8-step-journey"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  How The Relay Works
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: CHOOSE YOUR SOLUTION (SOLUTIONS_DATA ARCHITECTURE)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14 space-y-12">
            <div className="max-w-3xl">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Directory
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-2">
                Choose the Solution That Matches Your Business Need
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Explore the solution that matches your situation across our core opportunity exchange, partnership, and educational pillars:
              </p>
            </div>

            <div className="space-y-12">
              {SOLUTIONS_DATA.map((cat, catIdx) => {
                const IconComponent = CATEGORY_ICONS[cat.category] || Repeat;
                const categoryDesc = CATEGORY_DESCRIPTIONS[cat.category] || '';

                return (
                  <div key={cat.category} className="space-y-5">
                    <div className="border-b border-[#E2E8F0] pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-0.5">
                          Pillar 0{catIdx + 1}
                        </span>
                        <h3 className="text-xl font-display font-bold text-[#171F2C]">
                          {cat.category}
                        </h3>
                      </div>
                      {categoryDesc && (
                        <p className="text-xs text-[#64748B] max-w-md">
                          {categoryDesc}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cat.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="group p-5 bg-white border border-[#E2E8F0] rounded-[4px] hover:border-[#171F2C] transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="w-8 h-8 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mb-3 text-[#171F2C] group-hover:bg-[#171F2C] group-hover:text-white transition-colors">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h4 className="text-[14px] font-semibold text-[#171F2C] mb-1">
                              {item.title}
                            </h4>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-medium text-[#64748B] group-hover:text-[#171F2C]">
                            <span>Explore Solution</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: HOW TO CHOOSE (DECISION FRAMEWORK)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Selection Guide
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Which The Relay Solution Fits Your Situation?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Use this simple decision framework to find the exact resource or workflow tailored to your commercial objective:
              </p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono font-semibold text-[#64748B] uppercase">
                    <th className="p-4">Your Situation</th>
                    <th className="p-4">Relevant Solutions &amp; Guides</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#171F2C]">
                  <tr>
                    <td className="p-4 font-medium">
                      "I have a legitimate business opportunity my company cannot fulfil"
                    </td>
                    <td className="p-4 space-x-2">
                      <Link to="/b2b-lead-exchange" className="text-[#171F2C] font-semibold underline underline-offset-2 hover:text-[#000000]">
                        B2B Lead Exchange
                      </Link>
                      <span className="text-[#94A3B8]">·</span>
                      <Link to="/what-to-do-with-unqualified-leads" className="text-[#171F2C] hover:underline">
                        What To Do With Unqualified Leads
                      </Link>
                      <span className="text-[#94A3B8]">·</span>
                      <Link to="/agency-lead-exchange" className="text-[#171F2C] hover:underline">
                        Agency Lead Exchange
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium">
                      "I want to find businesses that can refer complementary opportunities"
                    </td>
                    <td className="p-4 space-x-2">
                      <Link to="/b2b-referral-network" className="text-[#171F2C] font-semibold underline underline-offset-2 hover:text-[#000000]">
                        B2B Referral Network
                      </Link>
                      <span className="text-[#94A3B8]">·</span>
                      <Link to="/how-to-find-b2b-referral-partners" className="text-[#171F2C] hover:underline">
                        How to Find B2B Referral Partners
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium">
                      "I want to structure a referral relationship"
                    </td>
                    <td className="p-4">
                      <Link to="/referral-partnerships" className="text-[#171F2C] font-semibold underline underline-offset-2 hover:text-[#000000]">
                        Referral Partnerships
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium">
                      "I want to find broader commercial partners"
                    </td>
                    <td className="p-4">
                      <Link to="/b2b-partnership-network" className="text-[#171F2C] font-semibold underline underline-offset-2 hover:text-[#000000]">
                        B2B Partnership Network
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium">
                      "I need channel partners"
                    </td>
                    <td className="p-4">
                      <Link to="/channel-partnerships" className="text-[#171F2C] font-semibold underline underline-offset-2 hover:text-[#000000]">
                        Channel Partnerships
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium">
                      "I need distributors"
                    </td>
                    <td className="p-4 space-x-2">
                      <Link to="/distribution-partners" className="text-[#171F2C] font-semibold underline underline-offset-2 hover:text-[#000000]">
                        Distribution Partners
                      </Link>
                      <span className="text-[#94A3B8]">·</span>
                      <Link to="/how-to-find-distribution-partners" className="text-[#171F2C] hover:underline">
                        How to Find Distribution Partners
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-medium">
                      "I want to understand the mechanics of exchanging leads"
                    </td>
                    <td className="p-4">
                      <Link to="/how-to-exchange-business-leads" className="text-[#171F2C] font-semibold underline underline-offset-2 hover:text-[#000000]">
                        How to Exchange Business Leads
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: CORE BUSINESS PROBLEMS
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Use Cases
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Business Problems The Relay Helps Address
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Organizations use The Relay to resolve specific operational and commercial bottlenecks:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  1. Unfulfilled Business Opportunities
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Legitimate client inquiries that fall outside your service scope, budget floor, or delivery capacity can be routed to qualified counterparties rather than lost.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  2. Referral Partner Discovery
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Finding complementary, non-competing businesses that advise the same target customer profile and encounter natural referral triggers for your services.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  3. Commercial Partnership Discovery
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Identifying strategic technology vendors, systems integrators, or service firms for co-selling, joint bidding, or integration partnerships.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  4. Distribution Expansion
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Recruiting regional or master distributors with established warehousing, logistics, and local dealer networks in target jurisdictions.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  5. Agency Opportunity Routing
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Enabling creative, technical, and marketing agencies to monetize or exchange project inquiries that exceed team capacity or required technical scope.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E2E8F0] rounded-[4px]">
                <h3 className="text-base font-semibold text-[#171F2C] mb-1.5">
                  6. Lead Exchange Education
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  Providing clear operational playbooks on lead qualification, introduction protocols, attribution rules, and commercial agreement structures.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: SOLUTION RELATIONSHIPS (TOPICAL ARCHITECTURE)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Topical Structure
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                How The Relay's Solutions Relate
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay organizes commercial discovery into distinct, interconnected solution areas:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                  Opportunity Exchange
                </div>
                <div className="space-y-2 text-[13px]">
                  <Link to="/b2b-opportunity-exchange" className="block font-semibold text-[#171F2C] hover:underline">
                    B2B Opportunity Exchange (Parent Hub)
                  </Link>
                  <p className="text-xs text-[#64748B]">Central exchange layer for live commercial demand.</p>
                  <div className="pt-2 pl-3 border-l-2 border-[#E2E8F0] space-y-2">
                    <Link to="/b2b-lead-exchange" className="block text-[#171F2C] hover:underline">
                      → B2B Lead Exchange
                    </Link>
                    <Link to="/agency-lead-exchange" className="block text-[#171F2C] hover:underline">
                      → Agency Lead Exchange
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                  Partnership Networks
                </div>
                <div className="space-y-2 text-[13px]">
                  <Link to="/b2b-partnership-network" className="block font-semibold text-[#171F2C] hover:underline">
                    B2B Partnership Network (Parent Hub)
                  </Link>
                  <p className="text-xs text-[#64748B]">Broad commercial and strategic partnership models.</p>
                  <div className="pt-2 pl-3 border-l-2 border-[#E2E8F0] space-y-2">
                    <Link to="/b2b-referral-network" className="block text-[#171F2C] hover:underline">
                      → B2B Referral Network
                    </Link>
                    <Link to="/referral-partnerships" className="block text-[#171F2C] hover:underline">
                      → Referral Partnerships
                    </Link>
                    <Link to="/channel-partnerships" className="block text-[#171F2C] hover:underline">
                      → Channel Partnerships
                    </Link>
                    <Link to="/distribution-partners" className="block text-[#171F2C] hover:underline">
                      → Distribution Partners
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C] pb-2 border-b border-[#E2E8F0]">
                  Educational &amp; Discovery Guides
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="font-semibold text-[#171F2C]">
                    Operator Playbooks
                  </div>
                  <p className="text-xs text-[#64748B]">Step-by-step guidance on qualification and partner discovery.</p>
                  <div className="pt-2 pl-3 border-l-2 border-[#E2E8F0] space-y-2 text-xs">
                    <Link to="/what-to-do-with-unqualified-leads" className="block text-[#171F2C] hover:underline">
                      → What To Do With Unqualified Leads
                    </Link>
                    <Link to="/how-to-monetize-unqualified-leads" className="block text-[#171F2C] hover:underline">
                      → How to Monetize Unqualified Leads
                    </Link>
                    <Link to="/how-to-exchange-business-leads" className="block text-[#171F2C] hover:underline">
                      → How to Exchange Business Leads
                    </Link>
                    <Link to="/how-to-find-b2b-referral-partners" className="block text-[#171F2C] hover:underline">
                      → How to Find Referral Partners
                    </Link>
                    <Link to="/how-to-find-distribution-partners" className="block text-[#171F2C] hover:underline">
                      → How to Find Distribution Partners
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: WHERE TO START
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Entry Points
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                Where Should You Start?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Choose the entry path that matches your current business stage:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-[#64748B] uppercase">Path 01</div>
                  <h3 className="text-base font-semibold text-[#171F2C]">
                    For Businesses with an Opportunity
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    Have an active, unfulfilled, or out-of-scope client inquiry? Post your requirement or explore active opportunities.
                  </p>
                </div>
                <Link
                  to="/opportunities"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171F2C] hover:underline"
                >
                  <span>Explore B2B Opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-[#64748B] uppercase">Path 02</div>
                  <h3 className="text-base font-semibold text-[#171F2C]">
                    For Businesses Looking for Partners
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    Seeking regional distributors, channel resellers, or reciprocal referral partners in complementary verticals?
                  </p>
                </div>
                <Link
                  to="/b2b-partnership-network"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171F2C] hover:underline"
                >
                  <span>Explore Partnership Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-[#64748B] uppercase">Path 03</div>
                  <h3 className="text-base font-semibold text-[#171F2C]">
                    For Businesses Learning the Process
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">
                    Want to understand how lead qualification, exchange mechanics, and partnership attribution operate?
                  </p>
                </div>
                <Link
                  to="/what-to-do-with-unqualified-leads"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171F2C] hover:underline"
                >
                  <span>Read the B2B Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: WHAT THE RELAY DOES
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Platform Boundaries
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight mb-3">
                What The Relay Does
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                The Relay provides an infrastructure layer for commercial discovery and bilateral exploration:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  Core Platform Capabilities
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Structured discovery for unfulfilled B2B opportunities and requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Discovery layer connecting complementary commercial counterparties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Bilateral interest signaling and mutual evaluation workflows.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                    <span>Opportunity-led exploration for partnerships and lead routing.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-[#E2E8F0] rounded-[4px] space-y-3">
                <h3 className="text-base font-semibold text-[#171F2C]">
                  What The Relay Does Not Do
                </h3>
                <ul className="space-y-2 text-[13px] text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                    <span>The Relay does not guarantee referrals, partner matching, or closed revenue.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                    <span>The Relay does not guarantee lead acceptance or successful project fulfillment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                    <span>The Relay does not replace internal CRM systems, client consent protocols, or legal contract reviews.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                    <span>The Relay does not operate client billing or automatically enforce private agreements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: FAQ ACCORDION (DOM-RENDERED FOR CRAWLERS)
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="border-b border-[#E2E8F0] pb-14">
            <div className="max-w-3xl mb-8">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B] mb-1.5">
                Questions &amp; Answers
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                B2B Opportunity Exchange Solutions FAQ
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
                          'w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ml-3',
                          isOpen && 'rotate-180 text-[#171F2C]'
                        )}
                      />
                    </button>
                    {/* FAQ Answer permanently present in DOM for search crawlers */}
                    <div
                      className={cn(
                        'px-4 pb-4 pt-1 text-[13px] text-[#64748B] border-t border-[#E2E8F0] leading-relaxed',
                        !isOpen && 'hidden'
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
              SECTION 9: FINAL CTA
              ═══════════════════════════════════════════════════════════════════ */}
          <section className="pb-8">
            <div className="p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-[4px] text-center max-w-4xl mx-auto space-y-6">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#64748B]">
                Explore Solutions
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-[#171F2C] tracking-tight">
                Find the Right Starting Point for Your Business
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
                Explore the solution that matches the commercial opportunity, partnership, or business problem you are trying to solve.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/opportunities"
                  className="inline-flex items-center justify-center bg-[#171F2C] hover:bg-[#010611] text-white text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#171F2C] transition-colors"
                >
                  Explore B2B Opportunities
                </Link>
                <Link
                  to="/8-step-journey"
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F1F5F9] text-[#171F2C] text-[13px] font-medium px-6 h-[44px] rounded-[4px] border border-[#E2E8F0] transition-colors"
                >
                  Review the 8-Step Journey
                </Link>
              </div>
              <div className="pt-4 text-xs text-[#64748B]">
                Learn more about our operational standards in{' '}
                <Link to="/trust-and-safety" className="underline hover:text-[#171F2C]">
                  Trust &amp; Safety
                </Link>
                .
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
