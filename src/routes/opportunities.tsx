import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useInterestStore, type InterestRecord } from "@/lib/interest-store";

function mockContact(company: string): NonNullable<InterestRecord["contact"]> {
  const first = company.split(/\s+/)[0] ?? "Ops";
  const slug = company.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return {
    name: `${first} Partnerships`,
    role: "BD Lead",
    email: `partnerships@${slug}.com`,
  };
}

const INDUSTRIES = [
  "All",
  "SaaS",
  "Marketing Agency",
  "Development Agency",
  "AI & Automation",
  "Recruitment",
  "D2C Brand",
  "Legal",
  "Healthcare",
  "Logistics",
] as const;

const GEOGRAPHIES = [
  "All",
  "India",
  "UAE",
  "United States",
  "United Kingdom",
  "DACH",
  "Singapore",
  "Remote / Global",
] as const;

const TYPES = [
  "All",
  "Partnership",
  "Referral",
  "Distribution",
  "Vendor",
  "Hiring",
  "Strategic Advice",
  "Investment",
] as const;

const searchSchema = z.object({
  industry: fallback(z.enum(INDUSTRIES), "All").default("All"),
  geo: fallback(z.enum(GEOGRAPHIES), "All").default("All"),
  type: fallback(z.enum(TYPES), "All").default("All"),
  q: fallback(z.string(), "").default(""),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/opportunities")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Opportunities — The Relay" },
      {
        name: "description",
        content:
          "Browse live business opportunities from verified operators — partnerships, referrals, vendors, hiring and distribution. Filter by industry, geography and type.",
      },
      { property: "og:title", content: "Opportunities — The Relay" },
      {
        property: "og:description",
        content:
          "Live opportunity feed from verified businesses. Filter by industry, geography and type.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

type Opportunity = {
  id: string;
  type: (typeof TYPES)[number];
  industry: (typeof INDUSTRIES)[number];
  geo: (typeof GEOGRAPHIES)[number];
  company: string;
  title: string;
  description: string;
  trustLevel: "L1" | "L2" | "L3";
  postedAt: string;
  interested: number;
};

const OPPORTUNITIES: Opportunity[] = [
  {
    id: "RY-9021",
    type: "Distribution",
    industry: "SaaS",
    geo: "DACH",
    company: "Cloudstack Systems",
    title: "Reseller partners for cloud automation suite",
    description:
      "Enterprise SaaS provider expanding into the DACH region. 20% recurring revenue share for active IT consultancies with SME books.",
    trustLevel: "L3",
    postedAt: "2h ago",
    interested: 4,
  },
  {
    id: "RY-8842",
    type: "Partnership",
    industry: "Logistics",
    geo: "India",
    company: "Nexus Logistics",
    title: "Integration partners for last-mile fragile-goods API",
    description:
      "Seeking Shopify Plus brands and 3PL platforms to integrate our specialized last-mile delivery API for fragile e-commerce goods.",
    trustLevel: "L3",
    postedAt: "5h ago",
    interested: 9,
  },
  {
    id: "RY-8721",
    type: "Vendor",
    industry: "D2C Brand",
    geo: "United Kingdom",
    company: "Solvent Health",
    title: "ISO-certified biodegradable mailer vendor (10k/mo)",
    description:
      "Scaling premium wellness D2C line. Need ISO-certified biodegradable custom mailers at 10k units/month. EU manufacturing preferred.",
    trustLevel: "L3",
    postedAt: "1d ago",
    interested: 6,
  },
  {
    id: "RY-8612",
    type: "Referral",
    industry: "Marketing Agency",
    geo: "India",
    company: "Stratos Design",
    title: "Mutual referral: Shopify Plus dev shop",
    description:
      "We frequently turn away development-only requests from Shopify Plus brands. Looking for a high-quality dev partner for ongoing handoffs.",
    trustLevel: "L2",
    postedAt: "1d ago",
    interested: 11,
  },
  {
    id: "RY-8540",
    type: "Hiring",
    industry: "AI & Automation",
    geo: "Remote / Global",
    company: "Nova AI",
    title: "Fractional COO — B2B SaaS scaling $1M → $5M ARR",
    description:
      "Need a fractional COO with proven experience scaling B2B SaaS from $1M to $5M ARR. 2–3 days/week, 6-month engagement.",
    trustLevel: "L2",
    postedAt: "2d ago",
    interested: 7,
  },
  {
    id: "RY-8488",
    type: "Strategic Advice",
    industry: "Healthcare",
    geo: "India",
    company: "Aarogya Labs",
    title: "Founders who scaled diagnostic chains from ₹10L → ₹1Cr",
    description:
      "Seeking 1:1 conversations with founders who have scaled a diagnostic chain from ₹10L to ₹1Cr monthly. Paid advisory available.",
    trustLevel: "L3",
    postedAt: "3d ago",
    interested: 5,
  },
  {
    id: "RY-8401",
    type: "Investment",
    industry: "AI & Automation",
    geo: "Singapore",
    company: "Helix Ops",
    title: "Angel round — operator-investors in vertical AI",
    description:
      "Closing a ₹3Cr angel round. Looking for operator-investors with distribution into mid-market manufacturing or supply chain.",
    trustLevel: "L3",
    postedAt: "3d ago",
    interested: 14,
  },
  {
    id: "RY-8377",
    type: "Partnership",
    industry: "Legal",
    geo: "United Kingdom",
    company: "Apex HR Solutions",
    title: "UK legal partners for SME HR clients",
    description:
      "Looking for boutique employment-law firms serving UK SMEs for a mutual client-referral and co-marketing arrangement.",
    trustLevel: "L3",
    postedAt: "4d ago",
    interested: 8,
  },
  {
    id: "RY-8312",
    type: "Vendor",
    industry: "Recruitment",
    geo: "India",
    company: "Beacon Talent",
    title: "ATS / CRM vendor for high-volume recruitment ops",
    description:
      "Evaluating ATS/CRM vendors capable of handling 5k+ candidate flow/month with strong API and India data residency.",
    trustLevel: "L2",
    postedAt: "5d ago",
    interested: 3,
  },
  {
    id: "RY-8240",
    type: "Referral",
    industry: "Development Agency",
    geo: "UAE",
    company: "Forge Digital",
    title: "Refer enterprise WordPress migrations",
    description:
      "Specialist in headless WordPress + Next.js migrations for UAE enterprises. Offering 10% lifetime referral on retainers.",
    trustLevel: "L2",
    postedAt: "6d ago",
    interested: 2,
  },
  {
    id: "RY-8198",
    type: "Distribution",
    industry: "SaaS",
    geo: "United States",
    company: "Tideway HRIS",
    title: "US channel partners for mid-market HRIS",
    description:
      "Mid-market HRIS seeking US-based benefits brokers and PEO consultants for a 25% first-year channel commission.",
    trustLevel: "L3",
    postedAt: "1w ago",
    interested: 6,
  },
  {
    id: "RY-8120",
    type: "Hiring",
    industry: "Marketing Agency",
    geo: "Remote / Global",
    company: "Loft Performance",
    title: "Senior paid-social strategist (DTC focus)",
    description:
      "Senior strategist with $1M+/mo Meta + TikTok experience across DTC. Remote, retainer-based engagement preferred.",
    trustLevel: "L1",
    postedAt: "1w ago",
    interested: 4,
  },
];

const TYPE_ACCENT: Record<string, string> = {
  Partnership: "bg-primary/10 text-primary",
  Referral: "bg-blue-500/10 text-blue-600",
  Distribution: "bg-emerald-500/10 text-emerald-700",
  Vendor: "bg-purple-500/10 text-purple-700",
  Hiring: "bg-amber-500/10 text-amber-700",
  "Strategic Advice": "bg-foreground/10 text-foreground",
  Investment: "bg-rose-500/10 text-rose-700",
};

function OpportunitiesPage() {
  const { industry, geo, type, q } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return OPPORTUNITIES.filter((o) => {
      if (industry !== "All" && o.industry !== industry) return false;
      if (geo !== "All" && o.geo !== geo) return false;
      if (type !== "All" && o.type !== type) return false;
      if (query) {
        const hay = `${o.company} ${o.title} ${o.description}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [industry, geo, type, q]);

  const reset = () =>
    navigate({ search: { industry: "All", geo: "All", type: "All", q: "" } });

  const activeCount =
    (industry !== "All" ? 1 : 0) +
    (geo !== "All" ? 1 : 0) +
    (type !== "All" ? 1 : 0) +
    (q ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageNav />
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <header className="space-y-4 mb-12">
          <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
            [ Discovery ]
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1]">
            Live opportunities, <span className="italic text-primary">filtered</span>{" "}
            to your network.
          </h1>
          <p className="text-muted max-w-[55ch] leading-relaxed">
            Every opportunity is posted by a verified business. Filter the feed by
            industry, geography or opportunity type to find the handoffs that fit.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Filters {activeCount > 0 && `(${activeCount})`}
              </span>
              {activeCount > 0 && (
                <button
                  onClick={reset}
                  className="font-mono text-[10px] uppercase tracking-widest text-primary hover:text-foreground transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            <SearchInput
              value={q}
              onChange={(v) =>
                navigate({ search: (prev: SearchParams) => ({ ...prev, q: v }) })
              }
            />

            <FilterGroup
              label="Opportunity Type"
              options={TYPES}
              value={type}
              onChange={(v) =>
                navigate({
                  search: (prev: SearchParams) => ({ ...prev, type: v as typeof type }),
                })
              }
            />
            <FilterGroup
              label="Industry"
              options={INDUSTRIES}
              value={industry}
              onChange={(v) =>
                navigate({
                  search: (prev: SearchParams) => ({ ...prev, industry: v as typeof industry }),
                })
              }
            />
            <FilterGroup
              label="Geography"
              options={GEOGRAPHIES}
              value={geo}
              onChange={(v) =>
                navigate({
                  search: (prev: SearchParams) => ({ ...prev, geo: v as typeof geo }),
                })
              }
            />
          </aside>

          <section className="lg:col-span-9 space-y-4">
            <div className="flex items-end justify-between border-b border-border pb-4">
              <div>
                <div className="font-display text-2xl font-extrabold">
                  {filtered.length}
                  <span className="text-muted font-normal text-sm font-mono ml-2 uppercase tracking-widest">
                    {filtered.length === 1 ? "Opportunity" : "Opportunities"}
                  </span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                Live · Sorted by recency
              </div>
            </div>

            {filtered.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              filtered.map((opp, i) => (
                <ResultCard key={opp.id} opp={opp} delay={i * 40} />
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function PageNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tighter uppercase">
            Relay
          </Link>
          <div className="hidden md:flex gap-6 text-[11px] font-mono uppercase tracking-widest text-muted">
            <Link
              to="/opportunities"
              activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground transition-colors"
            >
              Opportunities
            </Link>
            <span className="opacity-40">Network</span>
            <span className="opacity-40">Intelligence</span>
          </div>
        </div>
        <Link
          to="/"
          hash="apply"
          className="bg-foreground text-background px-4 py-2 text-[11px] font-mono uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Apply for Membership
        </Link>
      </div>
    </nav>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted block">
        Search
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Company, title, keyword…"
        className="w-full bg-background border border-border focus:border-primary focus:outline-none px-3 py-2.5 text-sm font-mono placeholder:text-muted/60 transition-colors"
      />
    </div>
  );
}

function FilterGroup<T extends readonly string[]>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T;
  value: T[number];
  onChange: (v: T[number]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </div>
      <div className="flex flex-col">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`text-left px-3 py-2 text-sm border-l-2 transition-all -ml-px ${
                active
                  ? "border-primary text-foreground font-medium bg-primary/5"
                  : "border-transparent text-muted hover:text-foreground hover:border-border"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({ opp, delay }: { opp: Opportunity; delay: number }) {
  return (
    <article
      className="bg-card border border-border ring-1 ring-black/5 p-6 flex flex-col md:flex-row gap-6 hover:border-primary transition-colors animate-momentum"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-tighter rounded-sm ${
                TYPE_ACCENT[opp.type] ?? "bg-foreground/10 text-foreground"
              }`}
            >
              {opp.type}
            </span>
            <span className="font-mono text-[10px] text-muted">#{opp.id}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {opp.postedAt}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-tight">
          {opp.title}
        </h3>

        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="text-foreground font-medium">{opp.company}</span>
          <span>·</span>
          <span>{opp.industry}</span>
          <span>·</span>
          <span>{opp.geo}</span>
        </div>

        <p className="text-sm text-muted leading-relaxed pt-1">
          {opp.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {opp.interested} verified businesses interested
          </span>
        </div>
      </div>

      <div className="md:w-32 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
        <div className="text-left md:text-center">
          <div className="font-mono text-[10px] text-muted uppercase tracking-tighter">
            Trust
          </div>
          <div className="font-display text-xl font-extrabold">
            {opp.trustLevel}
          </div>
        </div>
        <button className="flex-1 md:flex-none md:w-full py-2 px-3 bg-foreground text-background text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-colors">
          Express Interest
        </button>
      </div>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-dashed border-border p-16 text-center space-y-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
        No matches
      </div>
      <h3 className="font-display text-2xl font-bold">
        No opportunities match these filters.
      </h3>
      <p className="text-muted max-w-[40ch] mx-auto text-sm">
        Try widening industry or geography — or reset to view every live opportunity.
      </p>
      <button
        onClick={onReset}
        className="mt-4 px-6 py-2.5 bg-foreground text-background font-mono text-[11px] uppercase tracking-widest hover:bg-primary transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}
