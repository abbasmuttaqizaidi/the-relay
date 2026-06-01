import { createFileRoute } from "@tanstack/react-router";
import batonImg from "@/assets/baton.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Relay — Business Opportunity Network for Verified Businesses" },
      {
        name: "description",
        content:
          "Real businesses. Real opportunities. Real growth. An operator-grade network for verified businesses to exchange partnerships, referrals, vendors and hiring.",
      },
      { property: "og:title", content: "The Relay — Where growth finds momentum" },
      {
        property: "og:description",
        content:
          "A curated network of verified businesses exchanging partnerships, referrals, vendors and growth opportunities.",
      },
    ],
  }),
  component: Landing,
});

type Opportunity = {
  id: string;
  type: string;
  company: string;
  description: string;
  meta: { label: string; value: string }[];
  trust: { label: string; value: string };
};

const opportunities: Opportunity[] = [
  {
    id: "RY-9021",
    type: "Distribution Opportunity",
    company: "Cloudstack Systems",
    description:
      "Enterprise SaaS provider looking for reseller partners in the DACH region for automation suite.",
    meta: [
      { label: "Target", value: "IT Agencies" },
      { label: "Revenue", value: "$5M – $20M" },
    ],
    trust: { label: "Trust Score", value: "Lvl 3" },
  },
  {
    id: "RY-8842",
    type: "Strategic Partnership",
    company: "Nexus Logistics",
    description:
      "Seeking integration partners for last-mile delivery API specializing in fragile e-commerce goods.",
    meta: [
      { label: "Target", value: "Shopify Plus Brands" },
      { label: "Trust Level", value: "Established" },
    ],
    trust: { label: "Verified", value: "100%" },
  },
  {
    id: "RY-8721",
    type: "Vendor Sourcing",
    company: "Solvent Health",
    description:
      "Scaling premium wellness D2C line. Need ISO-certified biodegradable mailer vendor at 10k units/mo.",
    meta: [
      { label: "Volume", value: "10k / mo" },
      { label: "Region", value: "EU Preferred" },
    ],
    trust: { label: "Trust Score", value: "Lvl 3" },
  },
];

const protocols = [
  { n: "01", title: "Referral", body: "Exchange qualified leads with trusted partners in complementary industries." },
  { n: "02", title: "Distribution", body: "Scale your reach by plugging into existing sales channels and reseller networks." },
  { n: "03", title: "Vendor", body: "Discover vetted service providers who actually deliver on enterprise requirements." },
  { n: "04", title: "Hiring", body: "Source high-level operators and specialized talent from within the ecosystem." },
  { n: "05", title: "Partnership", body: "Forge long-term strategic alliances between businesses with aligned customer bases." },
  { n: "06", title: "Strategic Advice", body: "Tap operators who have already walked the path you are about to take." },
  { n: "07", title: "Investment", body: "Connect with angels and operator-investors active in your sector." },
  { n: "08", title: "Introductions", body: "Warm handoffs from one verified business to another. The baton, passed cleanly." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <Hero />
        <MetricStrip />
        <Protocols />
        <Verification />
        <Reciprocity />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="font-display text-xl font-extrabold tracking-tighter uppercase">
            Relay
          </span>
          <div className="hidden md:flex gap-6 text-[11px] font-mono uppercase tracking-widest text-muted">
            <a href="#opportunities" className="hover:text-foreground transition-colors">Opportunities</a>
            <a href="#protocols" className="hover:text-foreground transition-colors">Network</a>
            <a href="#trust" className="hover:text-foreground transition-colors">Intelligence</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Membership</a>
          </div>
        </div>
        <a
          href="#apply"
          className="bg-foreground text-background px-4 py-2 text-[11px] font-mono uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Apply for Membership
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="opportunities" className="grid lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-5 space-y-8 animate-momentum">
        <div className="inline-flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Live Network Pulse
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[0.95]">
          Where growth finds <span className="text-primary italic">momentum</span>.
        </h1>
        <p className="text-lg text-muted max-w-[45ch] text-pretty leading-relaxed">
          The Relay is an operator-grade network for verified businesses to exchange
          high-value opportunities. No noise, no feeds — just outcomes passed
          cleanly from one business to another.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#apply"
            className="h-12 px-8 inline-flex items-center justify-center bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background transition-all"
          >
            Submit Application
          </a>
          <div className="flex flex-col justify-center px-4 border-l border-border">
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
              Active Relay Rate
            </span>
            <span className="text-lg font-display font-bold">84.2%</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4">
        {opportunities.map((opp, i) => (
          <OpportunityCard key={opp.id} opp={opp} delay={(i + 1) * 100} />
        ))}
      </div>
    </section>
  );
}

function OpportunityCard({ opp, delay }: { opp: Opportunity; delay: number }) {
  return (
    <article
      className="group bg-card p-6 border border-border ring-1 ring-black/5 flex flex-col md:flex-row gap-6 hover:border-primary transition-colors animate-momentum"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-tighter">
            [ {opp.type} ]
          </span>
          <span className="font-mono text-[10px] text-muted">#{opp.id}</span>
        </div>
        <h3 className="font-display text-xl font-bold">{opp.company}</h3>
        <p className="text-sm text-muted leading-relaxed">{opp.description}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          {opp.meta.map((m) => (
            <div
              key={m.label}
              className="text-[10px] font-mono uppercase tracking-widest text-muted"
            >
              {m.label}: <span className="text-foreground">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-32 flex flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0">
        <div className="text-center">
          <div className="text-[10px] font-mono text-muted uppercase tracking-tighter">
            {opp.trust.label}
          </div>
          <div className="text-xl font-display font-extrabold">{opp.trust.value}</div>
        </div>
        <button className="w-full py-2 bg-secondary text-[10px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
          View Detail
        </button>
      </div>
    </article>
  );
}

function MetricStrip() {
  const metrics = [
    { label: "Total Opportunities", value: "1,482" },
    { label: "Verified Businesses", value: "890" },
    { label: "Introductions Made", value: "4.2k" },
    { label: "Success Velocity", value: "+24%", accent: true },
  ];
  return (
    <section className="mt-24 md:mt-32 py-12 border-y border-border grid grid-cols-2 md:grid-cols-4 gap-8">
      {metrics.map((m) => (
        <div key={m.label} className="space-y-1">
          <div className="text-[10px] font-mono text-muted uppercase tracking-widest">
            {m.label}
          </div>
          <div
            className={`text-4xl font-display font-extrabold ${
              m.accent ? "text-primary" : ""
            }`}
          >
            {m.value}
          </div>
        </div>
      ))}
    </section>
  );
}

function Protocols() {
  return (
    <section id="protocols" className="mt-24 md:mt-32">
      <div className="mb-16 space-y-4">
        <h2 className="font-display text-4xl font-extrabold tracking-tight">
          Opportunity Protocols
        </h2>
        <p className="text-muted font-mono text-sm uppercase tracking-widest">
          Standardizing business exchange for maximum speed.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
        {protocols.map((p) => (
          <div key={p.n} className="bg-background p-8 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono text-primary">{p.n}.</span>
              <span className="font-display font-bold">{p.title}</span>
            </div>
            <p className="text-sm text-muted text-balance leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Verification() {
  const levels = [
    {
      tag: "L1",
      style: "bg-foreground text-background",
      title: "Verified Business",
      body: "Domain email and website verification. Initial entry into the exchange.",
    },
    {
      tag: "L2",
      style: "border border-foreground text-foreground",
      title: "Trusted Operator",
      body: "Founder & company LinkedIn confirmed. Unlocks direct outreach across the network.",
    },
    {
      tag: "L3",
      style: "border-4 border-primary text-primary font-bold",
      title: "Established Entity",
      body: "Registration, GST or revenue proof. Priority surfacing and concierge matching.",
    },
  ];
  return (
    <section id="trust" className="mt-24 md:mt-32 flex flex-col lg:flex-row gap-16">
      <div className="lg:w-1/3">
        <img
          src={batonImg}
          alt="A relay baton — the metaphor at the heart of The Relay"
          className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
      <div className="lg:w-2/3 flex flex-col justify-center space-y-12">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
          Trust through active <br />
          <span className="text-primary">reputation recording.</span>
        </h2>
        <p className="text-muted max-w-[55ch] leading-relaxed -mt-6">
          Stars are vanity. We record outcomes — partnerships created, introductions
          made, businesses worked with. Reputation that compounds with every handoff.
        </p>
        <div className="grid gap-8">
          {levels.map((l) => (
            <div key={l.tag} className="flex gap-6">
              <div
                className={`w-12 h-12 flex-none font-mono flex items-center justify-center ${l.style}`}
              >
                {l.tag}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold font-display">{l.title}</h4>
                <p className="text-sm text-muted max-w-[60ch]">{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reciprocity() {
  const stats = [
    { k: "Opportunities Posted", v: "12" },
    { k: "Partnerships Created", v: "5" },
    { k: "Introductions Made", v: "27" },
    { k: "Businesses Worked With", v: "14" },
  ];
  return (
    <section className="mt-24 md:mt-32 grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 space-y-6">
        <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
          [ Reciprocity Engine ]
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight leading-tight">
          Businesses help each other when there is a record of it.
        </h2>
        <p className="text-muted leading-relaxed">
          Every profile shows what you've given, not just what you've taken. The more
          you relay, the more the network relays back to you.
        </p>
      </div>
      <div className="lg:col-span-7 bg-foreground text-background p-8 md:p-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-background/60">
              Apex HR Solutions
            </div>
            <div className="font-display text-2xl font-extrabold mt-1">
              Established · L3
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest text-background/60">
              Reciprocity Score
            </div>
            <div className="font-display text-3xl font-extrabold text-primary">98.4</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {stats.map((s) => (
            <div key={s.k}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-background/60">
                {s.k}
              </div>
              <div className="font-display text-2xl font-bold mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section
      id="apply"
      className="mt-24 md:mt-32 p-10 md:p-16 bg-foreground text-background text-center space-y-10"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
          Apply for membership.
        </h2>
        <p className="font-mono text-[11px] uppercase text-background/60 tracking-widest">
          Relay is exclusively for operational businesses. Applications are reviewed manually.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-10 md:gap-16 text-left">
        <div className="space-y-2">
          <span className="block text-primary font-mono text-[10px] uppercase tracking-widest">
            Member
          </span>
          <span className="text-3xl font-display font-extrabold">
            ₹999
            <span className="text-sm font-mono font-normal text-background/40">/mo</span>
          </span>
        </div>
        <div className="w-px bg-white/10" />
        <div className="space-y-2">
          <span className="block text-primary font-mono text-[10px] uppercase tracking-widest">
            Growth Partner
          </span>
          <span className="text-3xl font-display font-extrabold">
            ₹4,999
            <span className="text-sm font-mono font-normal text-background/40">/mo</span>
          </span>
        </div>
      </div>
      <button className="px-10 md:px-12 py-4 bg-primary text-white font-mono text-sm uppercase tracking-widest hover:bg-background hover:text-foreground transition-all">
        Start Membership Application
      </button>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 pt-12 border-t border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div>
        <div className="font-display font-extrabold text-lg uppercase tracking-tighter">
          Relay
        </div>
        <div className="text-sm text-muted mt-1">
          Real Businesses. Real Opportunities. Real Growth.
        </div>
      </div>
      <div className="text-[10px] font-mono text-muted uppercase tracking-widest">
        © 2026 The Relay Protocol · Built for Operators
      </div>
    </footer>
  );
}
