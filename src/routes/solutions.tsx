import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Repeat,
  Users,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOLUTIONS_DATA } from '@/design-system/solutions-menu';
import { createSeoMeta, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute('/solutions')({
  component: SolutionsHubPage,
  head: () => ({
    meta: createSeoMeta({
      title: 'Solutions Ecosystem — Opportunity Exchange & Strategic Partnerships | The Relay',
      description:
        'Explore The Relay’s full solutions ecosystem across opportunity exchange, strategic partnerships, agency dealflow, and operator decision guides.',
      canonicalPath: '/solutions',
      keywords:
        'b2b solutions directory, lead exchange solutions, b2b referral networks, channel partnerships, distribution discovery, agency dealflow',
    }),
  }),
});

const CATEGORY_ICONS: Record<string, typeof Repeat> = {
  Exchange: Repeat,
  Partnerships: Users,
  'For Businesses': Building2,
  Resources: HelpCircle,
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Exchange: 'Circulate and monetize out-of-scope dealflow.',
  Partnerships: 'Structured referral and distribution frameworks.',
  'For Businesses': 'Tailored dealflow workflows for service firms and agencies.',
  Resources: 'High-intent operator frameworks and playbooks.',
};

export function SolutionsHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'The Relay Solutions Ecosystem',
    description:
      'A comprehensive index of B2B opportunity exchange, referral networks, channel partnerships, and operator guides.',
    publisher: {
      '@type': 'Organization',
      name: 'The Relay',
      url: SITE_URL,
    },
  };

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
            <span className="text-foreground font-medium">Solutions Ecosystem</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-border/60 bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground bg-[#F8FAFC] border border-border/80 rounded-[4px] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Network Solutions Directory
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171F2C] mb-6 leading-tight">
              The B2B Opportunity &amp; Partnership Architecture.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you need to monetize out-of-scope dealflow, recruit regional distribution partners, establish bilateral agency referrals, or master lead exchange governance, discover the tailored solutions available across The Relay.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/opportunities">
                <Button className="h-11 px-6 rounded-[4px] bg-[#171F2C] hover:bg-[#171F2C]/90 text-white text-sm font-medium gap-2">
                  Explore open opportunities
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/8-step-journey">
                <Button variant="outline" className="h-11 px-6 rounded-[4px] border-border/80 hover:bg-muted/50 text-sm font-medium">
                  Review 8-Step Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Categorized Sections */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SOLUTIONS_DATA.map((cat, catIdx) => {
            const IconComponent = CATEGORY_ICONS[cat.category] || Sparkles;
            const categoryDesc = CATEGORY_DESCRIPTIONS[cat.category] || '';

            return (
              <div key={cat.category} className="space-y-6">
                <div className="border-b border-border/60 pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                      Pillar 0{catIdx + 1}
                    </span>
                    <h2 className="text-2xl font-semibold text-[#171F2C]">
                      {cat.category}
                    </h2>
                  </div>
                  {categoryDesc && (
                    <p className="text-xs text-muted-foreground max-w-md">
                      {categoryDesc}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="group p-6 bg-white border border-border/60 rounded-[4px] hover:border-foreground/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-[4px] bg-[#F8FAFC] border border-border/60 flex items-center justify-center mb-4 text-foreground group-hover:bg-slate-900 group-hover:text-white transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-semibold text-[#171F2C] mb-2 group-hover:text-foreground">
                          {item.title}
                        </h3>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-medium text-foreground group-hover:text-foreground">
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

      {/* Protocol Guarantee Banner */}
      <section className="py-16 bg-white border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-[#F8FAFC] border border-border/60 rounded-[4px] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground font-semibold">
                <ShieldCheck className="w-4 h-4 text-foreground" />
                <span>Double-Blind Platform Governance</span>
              </div>
              <h3 className="text-lg font-semibold text-[#171F2C]">
                Every solution operates under verified handshakes and non-circumvention rules.
              </h3>
              <p className="text-xs text-muted-foreground max-w-2xl">
                Client privacy, deal attribution, and mutual commercial agreements are cryptographically protected across every stage of the lifecycle.
              </p>
            </div>
            <Link to="/trust-and-safety" className="shrink-0">
              <Button variant="outline" className="h-10 px-5 rounded-[4px] border-border/80 text-xs font-medium">
                Review Trust &amp; Safety
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 lg:py-20 bg-[#171F2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Find or monetize commercial dealflow today.
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join hundreds of verified B2B enterprises, digital agencies, and technology vendors on The Relay.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/opportunities">
              <Button className="h-11 px-6 rounded-[4px] bg-white text-[#171F2C] hover:bg-slate-100 text-sm font-medium gap-2">
                Explore open opportunities
                <ArrowRight className="w-4 h-4 text-[#171F2C]" />
              </Button>
            </Link>
            <Link to="/post">
              <Button variant="outline" className="h-11 px-6 rounded-[4px] border-white/20 text-white hover:bg-white/10 text-sm font-medium">
                Post an opportunity brief
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
