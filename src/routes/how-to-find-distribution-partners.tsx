import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  TrendingUp,
  Globe2,
  Layers,
  Network,
  ChevronRight,
  Sparkles,
  Scale,
  Briefcase,
  Boxes,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createSeoMeta } from '@/lib/seo';

export const Route = createFileRoute('/how-to-find-distribution-partners')({
  component: HowToFindDistributionPartnersPage,
  head: () => ({
    meta: createSeoMeta({
      title: 'How to Find B2B Distribution Partners | The Relay',
      description:
        'A practical guide to finding B2B distribution partners and evaluating distribution opportunities through structured discovery, partner fit criteria, and route-to-market validation.',
      canonicalPath: '/how-to-find-distribution-partners',
      ogType: 'article',
      keywords: 'how to find distribution partners, b2b distribution network, channel partner discovery, value-added distributor vetting, route to market strategy',
    }),
  }),
});

export function HowToFindDistributionPartnersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Find B2B Distribution Partners',
    description:
      'A practical guide to finding B2B distribution partners and evaluating distribution opportunities through a structured exchange.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Define the Route to Market',
        text: 'Determine whether your product or service requires a stocking distributor, value-added reseller (VAR), OEM integrator, or strategic channel partner.',
      },
      {
        '@type': 'HowToStep',
        name: 'Evaluate Established Market Access',
        text: 'Validate if the prospective distributor holds active contracts, compliance clearances, and trusted relationships with your target buyer group.',
      },
      {
        '@type': 'HowToStep',
        name: 'Clarify Commercial Expectations & Margins',
        text: 'Establish wholesale discount pricing, gross margins (20–40%), support tiering, warranties, and explicit customer ownership covenants.',
      },
      {
        '@type': 'HowToStep',
        name: 'Discover Partners via Governed Opportunity Exchange',
        text: 'List distribution mandates and evaluate incoming partner proposals securely before executing binding channel handshakes.',
      },
    ],
  };

  const relationshipTypes = [
    {
      title: 'Distributor (Wholesale / Tier-1)',
      scope: 'Purchases, inventories, and resells large volumes; manages billing, logistics, and tier-2 dealer networks.',
      margin: '15% – 30% Wholesale Margin',
      fit: 'Physical hardware, packaged software, enterprise appliances, commoditized supplies.',
    },
    {
      title: 'Value-Added Reseller (VAR)',
      scope: 'Packages software/hardware with custom consulting, installation, integration, and ongoing support.',
      margin: '25% – 45% Gross Resale Margin',
      fit: 'Complex enterprise software, cyber infrastructure, industrial automation, telecommunications.',
    },
    {
      title: 'Channel Sales Partner / Agency',
      scope: 'Acts as an authorized commercial agent driving pipeline without carrying inventory or taking title to goods.',
      margin: '15% – 30% Closed Contract Value',
      fit: 'B2B SaaS, Managed Service Providers (MSPs), specialized compliance platforms.',
    },
    {
      title: 'Referral & Co-Sell Partner',
      scope: 'Introduces qualified buyers in exchange for a finder fee or revenue share while you handle direct contracting.',
      margin: '10% – 20% First Year ACV',
      fit: 'Bespoke professional services, custom development, boutique advisory.',
    },
  ];

  const vettingCriteria = [
    {
      criterion: '1. Existing Buyer Reach & Penetration',
      question: 'Do they actively sell to your target procurement heads today?',
      detail: 'A strong distributor must already possess established vendor codes, master service agreements (MSAs), and account relationships with your ideal target enterprises.',
    },
    {
      criterion: '2. Technical & Service Competence',
      question: 'Can they handle pre-sales engineering and tier-1 support?',
      detail: 'Evaluate whether the distributor has in-house solution architects capable of demoing, deploying, and maintaining your product without burdening your core engineering team.',
    },
    {
      criterion: '3. Geographic & Regulatory Clearance',
      question: 'Are they certified in regional compliance jurisdictions?',
      detail: 'Confirm their local entity registrations, import/export licenses, cross-border tax compliance, and local language support capabilities.',
    },
    {
      criterion: '4. Non-Compete & Portfolio Alignment',
      question: 'Does their line card contain conflicting competitor products?',
      detail: 'Ensure your product receives dedicated sales attention rather than being buried in a bloated catalog of direct alternatives.',
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
            <Link to="/distribution-partners" className="hover:text-foreground transition-colors">Distribution Partners</Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span className="text-foreground font-medium">Finding Distribution Partners</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-border/60 bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground bg-[#F8FAFC] border border-border/80 rounded-[4px] mb-6">
              <Compass className="w-3.5 h-3.5" />
              Route-to-Market & Channel Discovery
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171F2C] mb-6 leading-tight">
              How to find the right B2B distribution partners.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Expanding into new geographic territories, enterprise segments, or vertical industries requires partners with active market access. Here is how to define your distribution model, evaluate partner criteria, and discover verified distributors.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/opportunities">
                <Button className="h-11 px-6 rounded-[4px] bg-[#171F2C] hover:bg-[#171F2C]/90 text-white text-sm font-medium gap-2">
                  Explore distribution opportunities
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/post">
                <Button variant="outline" className="h-11 px-6 rounded-[4px] border-border/80 hover:bg-muted/50 text-sm font-medium">
                  List a distribution opportunity
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Model Taxonomy */}
      <section className="py-16 lg:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Step 1 — Route-to-Market Definition</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              Distinguish between distribution and partnership formats
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Choosing the wrong channel model creates channel conflict, misaligned margins, and slow adoption. Select the structure that matches your operational capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relationshipTypes.map((item, idx) => (
              <div key={idx} className="p-6 bg-white border border-border/60 rounded-[4px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-[#171F2C]">{item.title}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 bg-[#F8FAFC] border border-border/60 rounded-[4px] text-muted-foreground">
                      {item.margin}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.scope}</p>
                </div>
                <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Best Suited For: </span>
                  {item.fit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Evaluation Matrix */}
      <section className="py-16 lg:py-20 border-b border-border/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Step 2 — Vetting Market Access</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              Key criteria for assessing distributor capability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vettingCriteria.map((c, idx) => (
              <div key={idx} className="p-6 bg-[#F8FAFC] border border-border/60 rounded-[4px]">
                <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">{c.criterion}</span>
                <h3 className="text-base font-semibold text-[#171F2C] mb-2">{c.question}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3: Commercial & Operational Expectations */}
      <section className="py-16 lg:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Step 3 — Commercial Alignment</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              Define commercial covenants before executing agreements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-border/60 rounded-[4px]">
              <div className="w-9 h-9 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-4 text-foreground">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#171F2C] mb-2">Customer Ownership & Billing</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Clarify whether the distributor invoices the end client directly on their own paper or acts as an agent while you maintain direct contractual billing relationships.
              </p>
            </div>

            <div className="p-6 bg-white border border-border/60 rounded-[4px]">
              <div className="w-9 h-9 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-4 text-foreground">
                <Boxes className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#171F2C] mb-2">Minimum Quota & Exclusivity</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Never grant territory or vertical exclusivity without enforceable minimum quarterly sales volume commitments and clawback provisions.
              </p>
            </div>

            <div className="p-6 bg-white border border-border/60 rounded-[4px]">
              <div className="w-9 h-9 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-4 text-foreground">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#171F2C] mb-2">Support & SLA Escalation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Establish precise operational boundary lines between tier-1 customer issue triage handled by the partner and tier-2/3 technical escalation handled by you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Relay Fits */}
      <section className="py-16 lg:py-20 border-b border-border/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Discovery Platform</h2>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C] mb-6">
                Discover distribution partners through live market requirements.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Traditional distributor recruitment relies on static directory listings or expensive trade show booths with unpredictable ROI. The Relay provides an active exchange where vendors and distributors connect through structured opportunities.
              </p>
              <div className="space-y-4 text-xs text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Structured requirement posting:</strong> Specify target territories, client sizes, and delivery capacities clearly.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Governed interest expressions:</strong> Review prospective distributors before disclosing sensitive IP or terms.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span><strong>Verified handshakes:</strong> Execute binding operational handshakes with clear audit histories.</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#F8FAFC] border border-border/60 rounded-[4px] space-y-6">
              <h4 className="text-sm font-semibold text-[#171F2C] uppercase font-mono">Related Commercial Hubs</h4>
              <div className="space-y-3">
                <Link to="/distribution-partners" className="block p-4 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1">
                    <span>Distribution Partners Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Explore market access, territorial expansion, and distribution mechanics.</p>
                </Link>
                <Link to="/channel-partnerships" className="block p-4 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1">
                    <span>Channel Partnerships</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Managing VAR, SI, and reseller ecosystems across enterprise markets.</p>
                </Link>
                <Link to="/b2b-opportunity-exchange" className="block p-4 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1">
                    <span>B2B Opportunity Exchange</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">The central protocol for circulating and fulfilling commercial dealflow.</p>
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
            Accelerate your route to market today.
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Discover vetted distributors, channel partners, and value-added resellers ready to take your solution into new enterprise territories.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/opportunities">
              <Button className="h-11 px-6 rounded-[4px] bg-white text-[#171F2C] hover:bg-slate-100 text-sm font-medium gap-2">
                Explore distribution opportunities
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
