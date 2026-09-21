import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileText,
  Users,
  Coins,
  Handshake,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  EyeOff,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createSeoMeta } from '@/lib/seo';

export const Route = createFileRoute('/how-to-exchange-business-leads')({
  component: HowToExchangeBusinessLeadsPage,
  head: () => ({
    meta: createSeoMeta({
      title: 'How to Exchange Business Leads — B2B Lead Exchange | The Relay',
      description:
        'Learn a structured approach to exchanging B2B leads through opportunity definition, interest gating, commercial negotiation, client consent, and verified handshakes.',
      canonicalPath: '/how-to-exchange-business-leads',
      ogType: 'article',
      keywords: 'how to exchange business leads, b2b lead exchange workflow, lead sharing consent, lead governance protocol, verified client handshake',
    }),
  }),
});

export function HowToExchangeBusinessLeadsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Exchange Business Leads',
    description:
      'Learn a structured approach to exchanging B2B leads through opportunity definition, interest, negotiation, agreement, consent, and handshake.',
    step: [
      {
        '@type': 'HowToStep',
        name: '1. Describe the Opportunity Anonymously',
        text: 'Provide sufficient business context, industry, and budget range without exposing confidential prospect names or raw contact data.',
      },
      {
        '@type': 'HowToStep',
        name: '2. Define What You Need',
        text: 'Specify required partner capabilities, geographic jurisdiction, certifications, and target delivery timelines.',
      },
      {
        '@type': 'HowToStep',
        name: '3. Gate Interest from Relevant Operators',
        text: 'Allow qualified firms to review the sanitized scope and submit expressions of interest with capability proof.',
      },
      {
        '@type': 'HowToStep',
        name: '4. Negotiate the Commercial Terms',
        text: 'Agree on referral commission, revenue share, or mutual lead credit before disclosing proprietary information.',
      },
      {
        '@type': 'HowToStep',
        name: '5. Confirm Consent & Execute Handshake',
        text: 'Obtain verified client introduction consent and execute a cryptographically logged handshake before connecting the parties.',
      },
    ],
  };

  const steps = [
    {
      num: '01',
      title: 'Describe the Opportunity',
      desc: 'Provide enough business context for potential partners to assess relevance without exposing sensitive prospect identity or unvetted data.',
      details: [
        'Sanitize client entity names and direct contact details',
        'State scope parameters, tech stack, and approximate budget tier',
        'Describe project timeline and key delivery constraints',
      ],
      icon: EyeOff,
    },
    {
      num: '02',
      title: 'Define What You Need',
      desc: 'State the exact capability, geography, team size, certification, or operational criteria required to fulfill the client requirement.',
      details: [
        'Required industry expertise and compliance certs (HIPAA, SOC2, GDPR)',
        'Preferred partner location or time-zone overlap',
        'Target commercial structure (referral fee vs reciprocal exchange)',
      ],
      icon: FileText,
    },
    {
      num: '03',
      title: 'Let Relevant Businesses Express Interest',
      desc: 'Separate exploratory interest from binding commercial commitments. Evaluate interested firms based on verified track records.',
      details: [
        'Review incoming capability profiles and proof of work',
        'Filter out unqualified or non-responsive operators',
        'Maintain complete anonymity until you choose to engage',
      ],
      icon: Users,
    },
    {
      num: '04',
      title: 'Negotiate the Relationship Terms',
      desc: 'Discuss and formalize referral commissions, ongoing revenue sharing, or mutual co-delivery terms before any client data is transferred.',
      details: [
        'Standardize 10%–20% finder fee or recurring retainer share',
        'Define clear settlement triggers (on invoice payment vs signing)',
        'Establish non-circumvention covenants and attribution windows',
      ],
      icon: Coins,
    },
    {
      num: '05',
      title: 'Confirm Consent & Complete Handshake',
      desc: 'Move forward only after the client consents to the introduction and both businesses execute the formal platform handshake.',
      details: [
        'Verify prospect willingness to be introduced to the chosen partner',
        'Execute double-opt-in handshake protocol',
        'Unlock secure direct channel for formal warm introduction',
      ],
      icon: Handshake,
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
            <Link to="/b2b-lead-exchange" className="hover:text-foreground transition-colors">B2B Lead Exchange</Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span className="text-foreground font-medium">How to Exchange Business Leads</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-border/60 bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground bg-[#F8FAFC] border border-border/80 rounded-[4px] mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Governed B2B Lead Exchange Protocol
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171F2C] mb-6 leading-tight">
              How to exchange business leads without turning it into a free-for-all.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Trading commercial opportunities informally via email or unvetted group chats risks data privacy violations, broken client trust, and lost attribution. Here is the structured 5-step framework to exchange high-value business leads with total governance.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/8-step-journey">
                <Button className="h-11 px-6 rounded-[4px] bg-[#171F2C] hover:bg-[#171F2C]/90 text-white text-sm font-medium gap-2">
                  See the Relay workflow
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/trust-and-safety">
                <Button variant="outline" className="h-11 px-6 rounded-[4px] border-border/80 hover:bg-muted/50 text-sm font-medium">
                  Review Trust & Safety
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 5-Step Process */}
      <section className="py-16 lg:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">The 5-Step Explainer</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              A disciplined, stage-gated lead exchange architecture
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="p-8 bg-white border border-border/60 rounded-[4px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-1">
                    <span className="text-2xl font-mono font-bold text-muted-foreground/50">{step.num}</span>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-foreground" />
                      <h3 className="text-lg font-semibold text-[#171F2C]">{step.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="lg:col-span-6 lg:border-l lg:border-border/60 lg:pl-6">
                    <span className="text-xs font-mono uppercase text-muted-foreground block mb-2">Operational Controls</span>
                    <ul className="space-y-1.5">
                      {step.details.map((d, dIdx) => (
                        <li key={dIdx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Safety Highlights */}
      <section className="py-16 lg:py-20 border-b border-border/60 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-muted-foreground bg-[#F8FAFC] border border-border/80 rounded-[4px] mb-3">
              <Lock className="w-3 h-3" />
              Privacy & Protocol Standards
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171F2C]">
              Why ungoverned lead exchanges break trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8FAFC] border border-border/60 rounded-[4px]">
              <div className="w-9 h-9 rounded-[4px] bg-white border border-border/60 flex items-center justify-center mb-4 text-foreground">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#171F2C] mb-2">The Unsolicited Spam Trap</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                When contact details are broadcast indiscriminately, multiple vendors bombard the prospect simultaneously, damaging the originator's credibility and destroying deal value.
              </p>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-border/60 rounded-[4px]">
              <div className="w-9 h-9 rounded-[4px] bg-white border border-border/60 flex items-center justify-center mb-4 text-foreground">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#171F2C] mb-2">Confidentiality Breaches</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unsanitized postings expose internal strategic plans, budgets, and enterprise vulnerability details to competitors before any mutual NDA is executed.
              </p>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-border/60 rounded-[4px]">
              <div className="w-9 h-9 rounded-[4px] bg-white border border-border/60 flex items-center justify-center mb-4 text-foreground">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#171F2C] mb-2">Zero Attribution Protection</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Without a verifiable platform handshake and audit log, recipients frequently bypass the originating partner and refuse to honor agreed referral commissions upon close.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white border border-border/60 rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-[#171F2C]">Explore The Relay's Trust & Safety Architecture</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Learn how double-blind vetting, client consent protocols, and non-circumvention safeguards protect every participant.
              </p>
            </div>
            <Link to="/trust-and-safety">
              <Button variant="outline" className="h-9 px-4 rounded-[4px] border-border/80 hover:bg-muted/50 text-xs font-medium shrink-0">
                View Trust & Safety Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross Links to Commercial Hubs */}
      <section className="py-16 lg:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Connected Architecture</h2>
            <p className="text-xl sm:text-2xl font-semibold text-[#171F2C]">
              Continue exploring The Relay's dealflow infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/8-step-journey" className="block p-6 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2">
                <span>The 8-Step Journey</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">The full lifecycle from opportunity post to handshake and delivery settlement.</p>
            </Link>

            <Link to="/b2b-lead-exchange" className="block p-6 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2">
                <span>B2B Lead Exchange Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Monetize out-of-scope dealflow and discover high-intent enterprise requirements.</p>
            </Link>

            <Link to="/agency-lead-exchange" className="block p-6 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2">
                <span>Agency Lead Exchange</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Tailored workflow for creative, development, marketing, and consulting agencies.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-[#171F2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Start exchanging business leads with confidence.
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Protect client relationships and monetize out-of-scope opportunities through The Relay's stage-gated protocol.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/8-step-journey">
              <Button className="h-11 px-6 rounded-[4px] bg-white text-[#171F2C] hover:bg-slate-100 text-sm font-medium gap-2">
                See the Relay workflow
                <ArrowRight className="w-4 h-4 text-[#171F2C]" />
              </Button>
            </Link>
            <Link to="/opportunities">
              <Button variant="outline" className="h-11 px-6 rounded-[4px] border-white/20 text-white hover:bg-white/10 text-sm font-medium">
                Browse open opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
