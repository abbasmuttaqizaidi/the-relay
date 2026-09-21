import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  TrendingUp,
  MapPin,
  Cpu,
  Coins,
  ChevronRight,
  Sparkles,
  GitMerge,
  Scale,
  Award,
  Layers,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createSeoMeta, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute('/how-to-find-b2b-referral-partners')({
  component: HowToFindB2BReferralPartnersPage,
  head: () => ({
    meta: createSeoMeta({
      title: 'How to Find B2B Referral Partners | The Relay',
      description:
        'A practical guide to identifying complementary B2B referral partners and structuring referral opportunities through customer overlap, commercial fit, and governed exchange.',
      canonicalPath: '/how-to-find-b2b-referral-partners',
      ogType: 'article',
      keywords: 'how to find b2b referral partners, b2b referral partner checklist, complementary b2b partnerships, strategic referral network, partner vetting framework',
    }),
  }),
});

export function HowToFindB2BReferralPartnersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find B2B Referral Partners',
    description:
      'A practical guide to identifying complementary B2B referral partners and structuring referral opportunities.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Identify Customer Overlap',
        text: 'Look for businesses serving the same or adjacent buyer personas without directly competing for the same service.',
      },
      {
        '@type': 'HowToStep',
        name: 'Verify Operational & Service Complementarity',
        text: 'Map natural upstream and downstream handoffs where one firm repeatedly encounters needs the other fulfills.',
      },
      {
        '@type': 'HowToStep',
        name: 'Agree on Commercial Models & Referral Terms',
        text: 'Establish clear qualifying criteria, commission percentages, recurring revenue terms, or mutual deal exchange expectations.',
      },
      {
        '@type': 'HowToStep',
        name: 'Structure Introductions with Consent & Governance',
        text: 'Transition from informal mentions to structured opportunity listings, double-blind vetting, and verified client handshakes.',
      },
    ],
  };

  const checklistItems = [
    {
      category: '1. Customer Overlap',
      title: 'Shared Buyer Persona & Market Segment',
      desc: 'Does the potential partner sell to the exact same decision-maker (e.g., VP of Sales, CTO, CMO) at similar company sizes without offering duplicate solutions?',
      icon: Users,
    },
    {
      category: '2. Service Complementarity',
      title: 'Natural Lifecycle Handoffs',
      desc: 'Does their service naturally precede, succeed, or sit alongside yours in the customer journey (e.g., CRM consultant → Sales training firm)?',
      icon: GitMerge,
    },
    {
      category: '3. Geographic & Regulatory Reach',
      title: 'Jurisdiction & Operating Radius',
      desc: 'Can they execute in the specific states, countries, or compliance environments (GDPR, HIPAA, SOC2) where your out-of-scope opportunities originate?',
      icon: MapPin,
    },
    {
      category: '4. Delivery Capacity & SLA',
      title: 'Bandwidth & Turnaround Reliability',
      desc: 'Does the firm have the team depth and availability to respond to referred prospects within 24 hours without creating delivery bottlenecks?',
      icon: Cpu,
    },
    {
      category: '5. Brand Reputation & Quality Benchmark',
      title: 'Verified Track Record & Case Proof',
      desc: 'Would introducing this firm elevate or endanger your client trust? Inspect recent client references, delivery proof, and domain credibility.',
      icon: Award,
    },
    {
      category: '6. Commercial Alignment',
      title: 'Equitable Value & Incentive Model',
      desc: 'Is there explicit clarity on whether the relationship operates via 10–25% referral fees, reciprocal deal trading, or strategic co-marketing?',
      icon: Coins,
    },
  ];

  const complementarityExamples = [
    {
      originator: 'Design & UI/UX Studio',
      receives: 'Custom Software & Cloud Engineering Firm',
      scenario: 'Client completes product discovery and wireframes, now requiring deep backend enterprise architecture.',
      benefit: 'Agency earns a referral commission or reciprocal design referrals when engineering clients rebrand.',
    },
    {
      originator: 'SEO & Inbound Marketing Agency',
      receives: 'HubSpot / Salesforce Implementation Partner',
      scenario: 'Inbound campaigns generate massive lead volume, but the client lacks CRM automation and pipeline infrastructure.',
      benefit: 'Marketing agency protects campaign ROI by handing off CRM plumbing to a certified technical specialist.',
    },
    {
      originator: 'Cybersecurity Compliance Auditor',
      receives: 'Managed Cloud & IT Infrastructure Provider',
      scenario: 'Audit surfaces remediation requirements that the auditing firm cannot legally execute due to compliance neutrality.',
      benefit: 'Compliant handoff to a vetted IT partner while maintaining audit impartiality and client satisfaction.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171F2C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Bar */}
      <div className="border-b border-border/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            <Link to="/b2b-referral-network" className="hover:text-foreground transition-colors">B2B Referral Network</Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span className="text-foreground font-medium">Finding Referral Partners</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-border/60 bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground bg-[#F8FAFC] border border-border/80 rounded-[4px] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Strategic Partner Identification Framework
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171F2C] mb-6 leading-tight">
              How to find B2B referral partners that actually fit.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Most B2B referral partnerships fail because they are built on casual verbal promises rather than customer overlap, operational complementarity, and clear commercial covenants. Here is the operational framework to identify, evaluate, and establish high-yield referral relationships.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/opportunities">
                <Button className="h-11 px-6 rounded-[4px] bg-[#171F2C] hover:bg-[#171F2C]/90 text-white text-sm font-medium gap-2">
                  Explore B2B referral opportunities
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/post">
                <Button variant="outline" className="h-11 px-6 rounded-[4px] border-border/80 hover:bg-muted/50 text-sm font-medium">
                  List an opportunity
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Partner Fit */}
      <section className="py-16 lg:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Core Evaluation Stages</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              The four foundational pillars of sustainable referral alliances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-border/60 rounded-[4px]">
              <div className="w-10 h-10 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-6 text-foreground">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#171F2C] mb-3">1. Start with Customer Overlap</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Look for businesses serving the exact same or adjacent customer segments without directly competing for the same scope. If you both sell to Series B CFOs, enterprise HR leaders, or Shopify Plus merchants, you already share trust anchors and operational vocabulary.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/40 pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Identical ideal customer profile (ICP) firmographics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Shared budget authority tier (e.g. $50k–$250k enterprise spend)
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 border border-border/60 rounded-[4px]">
              <div className="w-10 h-10 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-6 text-foreground">
                <GitMerge className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#171F2C] mb-3">2. Check Complementarity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                A sustainable referral relationship exists where one business repeatedly encounters client needs that another business fulfills as a core competence. When services are strictly complementary, referrals strengthen client retention rather than creating vendor friction.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/40 pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Sequential lifecycle handoffs (Strategy → Implementation)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Zero overlapping core revenue lines
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 border border-border/60 rounded-[4px]">
              <div className="w-10 h-10 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-6 text-foreground">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#171F2C] mb-3">3. Agree on the Commercial Model</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Pre-define what constitutes a qualified introduction, how attribution is tracked, and whether value is returned via finder fees (10–20%), recurring contract share, or bilateral lead volume balance before exchanging client data.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/40 pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Standardized payment milestones upon client settlement
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Defined dispute resolution and non-circumvention rules
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 border border-border/60 rounded-[4px]">
              <div className="w-10 h-10 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-6 text-foreground">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#171F2C] mb-3">4. Use a Structured Exchange</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Instead of emailing sensitive prospect details over unencrypted channels, utilize a double-blind exchange where opportunities are posted anonymously, vetted for intent, and only unlocked once mutual commercial covenants are sealed.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/40 pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Double-opt-in handshake protocol
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Governed client consent & privacy protection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Point Partner-Fit Checklist */}
      <section className="py-16 lg:py-20 border-b border-border/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Vetting Framework</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              The 6-Point B2B Referral Partner Checklist
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Use this checklist before finalizing any bilateral referral agreement or sending client dealflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklistItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 bg-[#F8FAFC] border border-border/60 rounded-[4px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-muted-foreground uppercase">{item.category}</span>
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-semibold text-[#171F2C] mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-medium text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Mandatory Verification Criterion</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complementarity in Action / Case Matrix */}
      <section className="py-16 lg:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Real-World Models</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              High-yielding partner pairings across professional verticals
            </p>
          </div>

          <div className="space-y-4">
            {complementarityExamples.map((ex, idx) => (
              <div key={idx} className="p-6 bg-white border border-border/60 rounded-[4px] grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div>
                  <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">Originating Firm</span>
                  <p className="text-sm font-semibold text-[#171F2C]">{ex.originator}</p>
                  <div className="mt-2 text-xs text-muted-foreground">Hands off to: <strong className="text-foreground">{ex.receives}</strong></div>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">The Trigger Scenario</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ex.scenario}</p>
                </div>
                <div className="lg:border-l lg:border-border/60 lg:pl-6">
                  <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">Commercial Outcome</span>
                  <p className="text-xs font-medium text-foreground leading-relaxed">{ex.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Relay Fits */}
      <section className="py-16 lg:py-20 border-b border-border/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">The Relay Solution</h2>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C] mb-6">
                Replace ad-hoc networking with a governed opportunity exchange.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Finding referral partners manually through LinkedIn messaging or networking breakfasts has an extremely low conversion rate. The Relay gives B2B operators a structured protocol to discover partners based on live dealflow.
              </p>
              <div className="space-y-4 text-xs text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Zero cold outreach:</strong> Discover partners through live opportunity listings that match your specific capabilities.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Anonymous until agreed:</strong> Protect client confidences and commercial terms until both parties sign the handshake.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Enforceable attribution:</strong> Complete journey audit trails from submission to delivery settlement.</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#F8FAFC] border border-border/60 rounded-[4px] space-y-6">
              <h4 className="text-sm font-semibold text-[#171F2C] uppercase font-mono">Related Commercial Hubs</h4>
              <div className="space-y-3">
                <Link to="/b2b-referral-network" className="block p-4 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1">
                    <span>B2B Referral Network</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Explore bilateral pairing mechanisms and referral fee standards.</p>
                </Link>
                <Link to="/referral-partnerships" className="block p-4 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1">
                    <span>Referral Partnerships Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">How to design recurring referral commission agreements and covenants.</p>
                </Link>
                <Link to="/how-to-monetize-unqualified-leads" className="block p-4 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1">
                    <span>Monetizing Unqualified Leads</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Practical models for unlocking revenue from rejected pipeline leads.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 lg:py-20 bg-[#171F2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Ready to find vetted B2B referral partners?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join operators across digital agencies, consulting firms, SaaS providers, and technology vendors exchanging verified dealflow on The Relay.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/opportunities">
              <Button className="h-11 px-6 rounded-[4px] bg-white text-[#171F2C] hover:bg-slate-100 text-sm font-medium gap-2">
                Explore B2B referral opportunities
                <ArrowRight className="w-4 h-4 text-[#171F2C]" />
              </Button>
            </Link>
            <Link to="/post">
              <Button variant="outline" className="h-11 px-6 rounded-[4px] border-white/20 text-white hover:bg-white/10 text-sm font-medium">
                Post an opportunity
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
