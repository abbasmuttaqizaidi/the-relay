import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/tanstack-react-start";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { listOpportunities } from "../functions/listOpportunities";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { Loader2, BadgeCheck, Check, Search, MapPin, Briefcase, Calendar, Users, Building, ExternalLink, RefreshCw, SlidersHorizontal, Trash2, Lock } from "lucide-react";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { TooltipSimple } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useInterestStore,
  useReciprocity,
  RECIPROCITY_WEIGHTS,
  type InterestRecord,
} from "@/lib/interest-store";

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
  industry: fallback(z.string(), "All").default("All"),
  geo: fallback(z.string(), "All").default("All"),
  type: fallback(z.enum(TYPES), "All").default("All"),
  q: fallback(z.string(), "").default(""),
  minInterested: fallback(z.number(), 0).default(0),
  maxInterested: fallback(z.number(), 15).default(15),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/opportunities/")({
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
  opportunity_number?: string;
  type: (typeof TYPES)[number];
  industry: (typeof INDUSTRIES)[number];
  geo: (typeof GEOGRAPHIES)[number];
  company: string;
  title: string;
  description: string;
  trustLevel: "Basic" | "Applied" | "Approved";
  postedAt: string;
  interested: number;
  business_id?: string;
  hide_company_name?: boolean;
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
    trustLevel: "Approved",
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
    trustLevel: "Approved",
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
    trustLevel: "Approved",
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
    trustLevel: "Applied",
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
    trustLevel: "Applied",
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
    trustLevel: "Approved",
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
    trustLevel: "Approved",
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
    trustLevel: "Approved",
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
    trustLevel: "Applied",
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
    trustLevel: "Applied",
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
    trustLevel: "Approved",
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
    trustLevel: "Basic",
    postedAt: "1w ago",
    interested: 4,
  },
  {
    id: "RY-7901",
    type: "Partnership",
    industry: "AI & Automation",
    geo: "Remote / Global",
    company: "Synthetix Automations",
    title: "Co-marketing and integration partners for voice-agent SDK",
    description: "Seeking CRM and helpdesk SaaS platforms to integrate our real-time voice-agent SDK. Offering co-sell support and joint marketing pipeline.",
    trustLevel: "Approved",
    postedAt: "1w ago",
    interested: 5,
  },
  {
    id: "RY-7840",
    type: "Referral",
    industry: "Legal",
    geo: "United States",
    company: "Blackstone Counsel",
    title: "Corporate formation referral swap for European operators",
    description: "US-based corporate legal firm seeking EU law firms to swap inbound US expansion referrals. High quality, verified client flows only.",
    trustLevel: "Approved",
    postedAt: "2w ago",
    interested: 8,
  },
  {
    id: "RY-7732",
    type: "Distribution",
    industry: "SaaS",
    geo: "DACH",
    company: "Kaiser Cybersec",
    title: "German localization and reseller channel partners",
    description: "Enterprise zero-trust security vendor seeking German MSPs and resellers. 30% recurring margin, full training, and marketing collateral provided.",
    trustLevel: "Applied",
    postedAt: "2w ago",
    interested: 3,
  },
  {
    id: "RY-7650",
    type: "Vendor",
    industry: "D2C Brand",
    geo: "India",
    company: "Vedika Organics",
    title: "GMP-certified contract manufacturer for herbal supplements",
    description: "Scaling wellness D2C brand looking for GMP and AYUSH-certified manufacturers in India. Minimum run 5,000 units, contract packaging required.",
    trustLevel: "Approved",
    postedAt: "3w ago",
    interested: 7,
  },
  {
    id: "RY-7512",
    type: "Partnership",
    industry: "Development Agency",
    geo: "UAE",
    company: "Dubai Tech Architects",
    title: "Cross-border dev handoff: Web3 and Solidity projects",
    description: "We frequently get client inquiries for Web3 development which we don't specialize in. Looking for a trusted agency for outsourcing.",
    trustLevel: "Applied",
    postedAt: "3w ago",
    interested: 9,
  },
  {
    id: "RY-7489",
    type: "Referral",
    industry: "Recruitment",
    geo: "United Kingdom",
    company: "Oakridge Executive",
    title: "Executive search placement referral exchange",
    description: "UK executive search boutique looking for regional recruitment partners in UAE and APAC to handle global executive placements.",
    trustLevel: "Approved",
    postedAt: "4w ago",
    interested: 6,
  },
  {
    id: "RY-7321",
    type: "Distribution",
    industry: "AI & Automation",
    geo: "Singapore",
    company: "Aether Analytics",
    title: "APAC distributor for computer vision retail suite",
    description: "Enterprise computer vision SaaS looking for distributors with direct access to physical retail chains and malls in Southeast Asia.",
    trustLevel: "Approved",
    postedAt: "1m ago",
    interested: 12,
  },
  {
    id: "RY-7210",
    type: "Vendor",
    industry: "Marketing Agency",
    geo: "Remote / Global",
    company: "GrowthLoop Media",
    title: "White-label TikTok and UGC video creators",
    description: "Performance marketing agency seeking native English and German video creators for ongoing UGC ad campaigns. 50+ videos/month contract.",
    trustLevel: "Basic",
    postedAt: "1m ago",
    interested: 15,
  },
  {
    id: "RY-7150",
    type: "Strategic Advice",
    industry: "Healthcare",
    geo: "India",
    company: "MedPulse Systems",
    title: "Advisory: HIPAA-compliant cloud migrations for hospitals",
    description: "Seeking fractional health-tech consultants with deep expertise in cloud compliance for large diagnostic labs. Paid engagement.",
    trustLevel: "Approved",
    postedAt: "1m ago",
    interested: 4,
  },
  {
    id: "RY-7099",
    type: "Investment",
    industry: "SaaS",
    geo: "Remote / Global",
    company: "LeadFlow Technologies",
    title: "Bridge round — operators with outbound B2B distribution",
    description: "Closing $500k bridge round. Seeking strategic angel investors who can unlock enterprise outbound distribution channels in SaaS.",
    trustLevel: "Applied",
    postedAt: "1m ago",
    interested: 11,
  },
  {
    id: "RY-6990",
    type: "Hiring",
    industry: "AI & Automation",
    geo: "India",
    company: "Sentient Agents",
    title: "Lead Gen AI Engineer — Prompt flow & LangChain specialist",
    description: "Looking for an engineer experienced with complex Agentic workflows and LangChain/LangGraph. Full-time position, remote within India.",
    trustLevel: "Approved",
    postedAt: "2m ago",
    interested: 9,
  },
  {
    id: "RY-6842",
    type: "Partnership",
    industry: "D2C Brand",
    geo: "United States",
    company: "Luna Sleepwear",
    title: "Co-branded bundle partnership: organic bedding & tea",
    description: "Organic luxury sleepwear brand seeking premium herbal tea brands for a co-branded bundle campaign ahead of the holiday season.",
    trustLevel: "Basic",
    postedAt: "2m ago",
    interested: 5,
  },
];

const TYPE_ACCENT: Record<string, string> = {
  Partnership: "bg-primary/10 text-primary",
  Referral: "bg-indigo-500/10 text-indigo-600",
  Distribution: "bg-emerald-500/10 text-emerald-700",
  Vendor: "bg-purple-500/10 text-purple-700",
  Hiring: "bg-amber-500/10 text-amber-700",
  "Strategic Advice": "bg-slate-500/10 text-slate-700",
  Investment: "bg-rose-500/10 text-rose-700",
};

function formatPostedAt(dateString: string): string {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function OpportunitiesPage() {
  const { industry, geo, type, q, minInterested, maxInterested } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [dbOpps, setDbOpps] = useState<any[]>([]);
  const [loadingOpps, setLoadingOpps] = useState(true);
  const [myBusinessId, setMyBusinessId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoadingOpps(true);
      const data = await listOpportunities({});
      const mapped = (data || []).map((opp: any) => ({
        id: opp.id,
        opportunity_number: opp.opportunity_number,
        type: (opp.category.charAt(0).toUpperCase() + opp.category.slice(1)) as any,
        industry: opp.business?.industry || "SaaS",
        geo: opp.location || "Remote",
        company: opp.business?.company_name || "Demo",
        title: opp.title,
        description: opp.description,
        trustLevel: opp.business?.status === "approved" ? "Approved" : opp.business?.status === "rejected" ? "Basic" : "Applied",
        postedAt: formatPostedAt(opp.created_at),
        interested: opp.interestedCount || 0,
        business_id: opp.business_id,
        hide_company_name: opp.hide_company_name ?? false,
      }));
      setDbOpps([...mapped, ...OPPORTUNITIES]);
    } catch (err) {
      console.error("Failed to load opportunities from database:", err);
      toast.error("Failed to load opportunities.");
    } finally {
      setLoadingOpps(false);
    }
  };

  useEffect(() => {
    async function verifyOnboarding() {
      if (isLoaded) {
        if (isSignedIn) {
          try {
            const status = await checkOnboardingStatus();
            if (status.isAuthenticated && !status.hasBusiness) {
              toast.error("Please register your business profile to access the opportunities board.", {
                id: "opportunities-onboarding-redirect",
              });
              navigate({ to: "/onboarding", replace: true });
            } else {
              if (status.business) {
                setMyBusinessId(status.business.id);
                let score = 0;
                try {
                  const stored = localStorage.getItem("relay.profile.v1");
                  if (stored) {
                    score = JSON.parse(stored).score || 0;
                  }
                } catch (_) {}

                const mappedProfile = {
                  companyName: status.business.company_name,
                  verificationLevel: status.business.status === "approved" ? "Approved" : "Applied",
                  logoUrl: status.business.logo_url || undefined,
                  score,
                };
                localStorage.setItem("relay.profile.v1", JSON.stringify(mappedProfile));
                window.dispatchEvent(new Event("relay:profile"));
              }
              await loadData();
              setIsValidating(false);
            }
          } catch (error) {
            console.error("Error checking onboarding status:", error);
            setIsValidating(false);
          }
        } else {
          await loadData();
          setIsValidating(false);
        }
      }
    }
    verifyOnboarding();
  }, [isLoaded, isSignedIn, navigate]);

  const activeIndustries = useMemo<string[]>(() => {
    return industry === "All" || !industry ? [] : industry.split(",");
  }, [industry]);

  const activeGeos = useMemo<string[]>(() => {
    return geo === "All" || !geo ? [] : geo.split(",");
  }, [geo]);

  const toggleIndustry = (val: string) => {
    let next: string[];
    if (activeIndustries.includes(val)) {
      next = activeIndustries.filter((item: string) => item !== val);
    } else {
      next = [...activeIndustries, val];
    }
    const searchStr = next.length === 0 ? "All" : next.join(",");
    navigate({ search: (prev: SearchParams) => ({ ...prev, industry: searchStr }) });
  };

  const toggleGeo = (val: string) => {
    let next: string[];
    if (activeGeos.includes(val)) {
      next = activeGeos.filter((item: string) => item !== val);
    } else {
      next = [...activeGeos, val];
    }
    const searchStr = next.length === 0 ? "All" : next.join(",");
    navigate({ search: (prev: SearchParams) => ({ ...prev, geo: searchStr }) });
  };

  const filtered = useMemo(() => {
    const query = (q || "").trim().toLowerCase();
    return dbOpps.filter((o) => {
      if (activeIndustries.length > 0 && !activeIndustries.includes(o.industry)) return false;
      if (activeGeos.length > 0 && !activeGeos.includes(o.geo)) return false;
      if (type !== "All" && o.type !== type) return false;
      if (o.interested < minInterested || o.interested > maxInterested) return false;
      if (query) {
        const hay = `${o.company} ${o.title} ${o.description}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [dbOpps, activeIndustries, activeGeos, type, q, minInterested, maxInterested]);

  if (isValidating || loadingOpps) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 selection:bg-slate-900 selection:text-white">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-slate-900/5 rounded-full blur-xl animate-pulse" />
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="relative h-12 w-auto object-contain mix-blend-multiply transition-transform hover:scale-105 duration-300"
            />
          </div>
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
                Verifying Operator Identity
              </span>
            </div>
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest animate-pulse">
              Connecting to secure router...
            </span>
          </div>
        </div>
      </div>
    );
  }

  const reset = () =>
    navigate({
      search: {
        industry: "All",
        geo: "All",
        type: "All",
        q: "",
        minInterested: 0,
        maxInterested: 15,
      },
    });

  const activeCount =
    (industry !== "All" ? 1 : 0) +
    (geo !== "All" ? 1 : 0) +
    (q ? 1 : 0) +
    (minInterested !== 0 || maxInterested !== 15 ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-slate-900 selection:text-white">
      <PageNav />
      <main className="max-w-5xl mx-auto px-6 pt-5 pb-16 md:pt-6 md:pb-24">
        {/* Header Hero Section */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <p className="text-slate-500 text-xs md:text-[13px] max-w-[55ch] leading-relaxed">
            Direct collaboration hub for verified founders and partners. Handshake directly, lock intros, and share network capital.
          </p>
          <div className="flex flex-wrap items-center gap-4 shrink-0 sm:justify-end">
            {isSignedIn && (
              <Link
                to="/opportunities/my"
                className="bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2 border border-slate-900 transition-all rounded-[2px] font-bold shadow-sm hover:shadow"
              >
                Post Opportunity
              </Link>
            )}
            <div className="flex items-baseline gap-2 shrink-0 text-right">
              <span className="font-display text-2xl font-extrabold text-slate-950">
                {filtered.length}
              </span>
              <span className="text-slate-400 font-mono text-[9px] uppercase tracking-widest font-bold">
                Listings Curated for you
              </span>
            </div>
          </div>
        </header>

        {/* Opportunity Types Tabs & Filter Row */}
        <div className="flex items-center justify-between border-b border-slate-200 mb-8 gap-4">
          <div className="overflow-x-auto scrollbar-none flex gap-2 md:gap-6 pb-px">
            {TYPES.map((t) => {
              const active = t === type;
              return (
                <button
                  key={t}
                  onClick={() => navigate({ search: (prev: SearchParams) => ({ ...prev, type: t }) })}
                  className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest px-1 pb-3.5 border-b-2 transition-all shrink-0 cursor-pointer ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="pb-3 shrink-0">
            {/* Filter Slider Sheet Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="cursor-pointer group flex items-center gap-2 border border-slate-200/80 hover:border-slate-300 rounded-full px-4 py-1.5 transition-all bg-white hover:shadow-sm font-mono text-[9px] uppercase tracking-widest font-bold text-slate-700">
                  <SlidersHorizontal className="w-3 h-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <span>Filters</span>
                  {activeCount > 0 && (
                    <span className="w-4.5 h-4.5 rounded-full bg-primary text-white text-[9px] font-sans flex items-center justify-center font-bold">
                      {activeCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md bg-white border-l border-slate-200/50 flex flex-col h-full p-0 shadow-2xl">
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-slate-600" />
                    <span className="font-display font-extrabold text-slate-900">Filters</span>
                  </div>
                  {activeCount > 0 && (
                    <button
                      onClick={reset}
                      className="font-mono text-[10px] uppercase tracking-widest text-primary hover:text-slate-950 transition-colors flex items-center gap-1 font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Drawer Body (Flipkart style accordions) */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                  {/* Search Section */}
                  <div className="space-y-2.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                      Search Keyword
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        value={q}
                        onChange={(e) => navigate({ search: (prev: SearchParams) => ({ ...prev, q: e.target.value }) })}
                        placeholder="Company, title, keyword…"
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:outline-none pl-9 pr-3 py-2 text-sm font-mono placeholder:text-slate-400/80 transition-all rounded-[2px]"
                      />
                    </div>
                  </div>

                  {/* Range Slider for interested operators */}
                  <div className="space-y-4 border-b border-slate-100 pb-6">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                        Interested Businesses
                      </label>
                      <span className="font-mono text-[10px] text-primary font-bold">
                        {minInterested} - {maxInterested === 15 ? "15+" : maxInterested}
                      </span>
                    </div>

                    <div className="px-2">
                      <Slider
                        min={0}
                        max={15}
                        step={1}
                        value={[minInterested, maxInterested]}
                        onValueChange={([min, max]) => {
                          navigate({
                            search: (prev: SearchParams) => ({
                              ...prev,
                              minInterested: min,
                              maxInterested: max,
                            }),
                          });
                        }}
                        className="my-2"
                      />
                    </div>

                    {/* Flipkart-style Min/Max displays */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div className="flex-1 border border-slate-200 rounded-[2px] p-2 bg-slate-50 flex flex-col">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Min Operators</span>
                        <span className="text-sm font-mono font-bold text-slate-900">{minInterested}</span>
                      </div>
                      <div className="text-slate-400 font-mono text-xs">—</div>
                      <div className="flex-1 border border-slate-200 rounded-[2px] p-2 bg-slate-50 flex flex-col">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Max Operators</span>
                        <span className="text-sm font-mono font-bold text-slate-900">{maxInterested === 15 ? "15+" : maxInterested}</span>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Panels */}
                  <Accordion type="multiple" defaultValue={["industry", "geography"]} className="w-full">
                    <AccordionItem value="industry" className="border-b border-slate-100 py-1">
                      <AccordionTrigger className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold hover:no-underline hover:text-slate-900 py-3 cursor-pointer">
                        Industry
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                          {INDUSTRIES.filter((opt) => opt !== "All").map((opt) => {
                            const active = activeIndustries.includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-3 px-1 py-1.5 hover:bg-slate-50/50 rounded cursor-pointer transition-colors"
                              >
                                <Checkbox
                                  checked={active}
                                  onCheckedChange={() => toggleIndustry(opt)}
                                />
                                <span className={`text-xs font-medium font-sans ${active ? "text-slate-900 font-bold" : "text-slate-600"}`}>
                                  {opt}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="geography" className="border-b border-slate-100 py-1">
                      <AccordionTrigger className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold hover:no-underline hover:text-slate-900 py-3 cursor-pointer">
                        Geography
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                          {GEOGRAPHIES.filter((opt) => opt !== "All").map((opt) => {
                            const active = activeGeos.includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-3 px-1 py-1.5 hover:bg-slate-50/50 rounded cursor-pointer transition-colors"
                              >
                                <Checkbox
                                  checked={active}
                                  onCheckedChange={() => toggleGeo(opt)}
                                />
                                <span className={`text-xs font-medium font-sans ${active ? "text-slate-900 font-bold" : "text-slate-600"}`}>
                                  {opt}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Drawer Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
                  <SheetClose asChild>
                    <button className="w-full py-2.5 bg-slate-950 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer text-center font-bold">
                      Apply Filters
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Opportunity Card List (Full-Width) */}
        {filtered.length === 0 ? (
          <EmptyState onReset={reset} />
        ) : (
          <div className="space-y-4">
            {filtered.map((opp, i) => (
              <ResultCard key={opp.id} opp={opp} delay={i * 40} myBusinessId={myBusinessId} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function TierTooltipContent({ level }: { level: string }) {
  const levelKey = level === "Approved" ? "Approved" : level === "Applied" ? "Applied" : "Basic";

  const details = {
    Basic: {
      title: "Verified Business",
      badge: "Basic",
      body: "Domain email check, SSL validation, and core founder verification. Surfaces basic referral, vendor, and warm intro requests with standard priority.",
      req: "Email domain & Website lookup",
    },
    Applied: {
      title: "Trusted Operator",
      badge: "Applied",
      body: "Founder identity & company LinkedIn registration validated manually. Unlocks direct connection unlocks, score boosts, and full access to private protocols.",
      req: "LinkedIn + Founder Identity Match",
    },
    Approved: {
      title: "Established Entity",
      badge: "Approved",
      body: "Corporate registry (CIN/GST/Tax certificate) or revenue proof checked. Highest trust, priority concierge matchmaking, and active surfacing top-tier listings.",
      req: "Tax registration / Active Revenue proof",
    },
  }[levelKey];

  return (
    <div className="p-2.5 max-w-[260px] space-y-2 text-left font-sans leading-normal">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 gap-4">
        <span className="font-display font-extrabold text-[12px] text-white">
          {details.title}
        </span>
        <span className="font-mono text-[8px] px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded-[2px] font-bold uppercase tracking-wider">
          {details.badge}
        </span>
      </div>
      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
        {details.body}
      </p>
      <div className="pt-1.5 border-t border-slate-800 flex flex-col gap-0.5 font-mono text-[8px] text-slate-500">
        <span className="uppercase text-[7.5px] font-bold text-slate-400">Requirement:</span>
        <span>{details.req}</span>
      </div>
    </div>
  );
}

function PageNav() {
  const { isSignedIn } = useAuth();
  const [profile, setProfile] = useState<{
    companyName: string;
    email: string;
    verificationLevel: string;
  } | null>(null);

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem("relay.profile.v1");
        if (stored) {
          setProfile(JSON.parse(stored));
        } else {
          setProfile(null);
        }
      } catch (_) {
        setProfile(null);
      }
    };
    load();
    window.addEventListener("relay:profile", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("relay:profile", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/home" className="flex items-center gap-2 group">
            <img
              src={logoUrl}
              alt="The Relay Logo"
              className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <div className="hidden md:flex gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
            <Link
              to="/opportunities"
              activeProps={{ className: "text-slate-900 border-b-2 border-slate-900" }}
              className="hover:text-slate-800 pb-1 transition-colors"
            >
              Opportunities
            </Link>
            {isSignedIn && (
              <Link
                to="/opportunities/my"
                activeProps={{ className: "text-slate-900 border-b-2 border-slate-900" }}
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                My Opportunities
              </Link>
            )}
            <span className="opacity-40 cursor-not-allowed">Network</span>
            <span className="opacity-40 cursor-not-allowed">Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ReciprocityBadge />
          {(!isSignedIn || !profile) && (
            <Link
              to={isSignedIn ? "/onboarding" : "/signup"}
              className="bg-slate-900 text-white px-5 py-2 text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow"
            >
              Apply
            </Link>
          )}
          {isSignedIn && <UserAvatarDropdown />}
        </div>
      </div>
    </nav>
  );
}

function ReciprocityBadge() {
  const { score, introductionsMade, mutualAcceptances, pending, declined } = useReciprocity();
  const prev = useRef(score);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (score !== prev.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1200);
      prev.current = score;
      return () => clearTimeout(t);
    }
  }, [score]);

  return (
    <div
      title={`Introductions made: ${introductionsMade} · Mutual acceptances: ${mutualAcceptances} · Pending: ${pending} · Declined: ${declined}`}
      className={`hidden sm:flex items-center gap-2.5 border rounded-[4px] px-3.5 py-2 transition-colors ${
        pulse ? "border-primary bg-primary/10" : "border-slate-200/80 bg-white"
      }`}
    >
      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">Score</span>
      <span
        className={`font-display text-sm font-extrabold tabular-nums ${
          pulse ? "text-primary" : "text-slate-900"
        }`}
      >
        {score}
      </span>
      <span className="font-mono text-[9px] text-slate-400 font-bold">
        · {mutualAcceptances}/{introductionsMade}
      </span>
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2.5">
      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
        Search
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Company, title, keyword…"
          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:outline-none pl-9 pr-3 py-2 text-sm font-mono placeholder:text-slate-400/80 transition-all rounded-[2px]"
        />
      </div>
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
    <div className="space-y-2.5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">{label}</div>
      <div className="flex flex-col border border-slate-100 rounded-[2px] overflow-hidden">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`text-left px-3 py-2 text-xs border-l-2 transition-all ${
                active
                  ? "border-primary text-primary font-bold bg-primary/5"
                  : "border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-50/50"
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

function ResultCard({ opp, delay, myBusinessId }: { opp: Opportunity; delay: number; myBusinessId: string | null }) {
  const { store, request, respond, withdraw } = useInterestStore();
  const record = store[opp.id];
  const status = record?.status ?? "idle";

  const [open, setOpen] = useState(false);
  const [pitch, setPitch] = useState("");

  const submit = () => {
    const trimmed = pitch.trim();
    if (trimmed.length < 20) {
      toast.error("Add a short context note (20+ characters).");
      return;
    }
    request(opp.id, trimmed);
    setOpen(false);
    setPitch("");
    toast.success("Interest sent. Awaiting mutual acceptance.");
  };

  const onAccept = () => {
    respond(opp.id, "accepted", mockContact(opp.company));
    toast.success(
      `${opp.company} accepted. Contact unlocked. +${RECIPROCITY_WEIGHTS.accepted} reciprocity.`,
    );
  };

  const onDecline = () => {
    respond(opp.id, "declined");
    toast(`${opp.company} declined this introduction.`);
  };

  const isConnected = opp.business_id === myBusinessId || status === "accepted";
  const shouldHide = opp.hide_company_name && !isConnected;
  const displayName = shouldHide ? "Confidential" : opp.company;

  // Compute initials for building avatar logo placeholder
  const initials = shouldHide
    ? "🔒"
    : displayName
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

  return (
    <article
      className="bg-white border border-slate-200 hover:border-primary p-6 flex flex-col md:flex-row gap-6 hover:shadow-md rounded-[4px] transition-all duration-300 animate-momentum relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-1 space-y-3.5">
        {/* Top bar tags */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-[2px] ${
                TYPE_ACCENT[opp.type] ?? "bg-slate-100 text-slate-600"
              }`}
            >
              {opp.type}
            </span>
            <span className="font-mono text-[9px] text-slate-400 font-medium">#{opp.opportunity_number || opp.id}</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {opp.postedAt}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="font-display text-xl font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors">
            {opp.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">{opp.description}</p>
        </div>

        {/* Company & Meta Info Row */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400 border-t border-slate-50 pt-3 flex-wrap">
          <div className="flex items-center gap-2">
            {/* Minimal company logo placeholder */}
            <div className="w-5 h-5 rounded-[2px] bg-slate-100 border border-slate-200 flex items-center justify-center font-sans text-[8px] font-bold text-slate-600 uppercase">
              {initials}
            </div>
            <span className="text-slate-900 font-bold flex items-center gap-1.5">
              {displayName}
              {opp.trustLevel === "Approved" && (
                <TooltipSimple content="Approved with Relay">
                  <BadgeCheck className="w-3.5 h-3.5 text-white fill-[#1877f2] shrink-0 cursor-default animate-badge-shine" />
                </TooltipSimple>
              )}
            </span>
          </div>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-300" />
            {opp.industry}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-300" />
            {opp.geo}
          </span>
        </div>

        {/* Connection unlocked area */}
        {status === "accepted" && record?.contact && (
          <div className="mt-4 border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2 rounded-[2px] shadow-sm animate-momentum">
            <div className="flex items-center justify-between gap-4 flex-wrap border-b border-emerald-500/10 pb-1.5">
              <div className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 font-bold">
                [ Contact unlocked · mutual acceptance ]
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 font-bold">
                + {RECIPROCITY_WEIGHTS.accepted} reciprocity
              </div>
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-display text-sm font-bold text-slate-900">{record.contact.name}</span>
              <span className="font-mono text-[10px] text-slate-400 font-bold">· {record.contact.role}</span>
            </div>
            <a
              href={`mailto:${record.contact.email}`}
              className="font-mono text-[11px] text-emerald-600 hover:underline transition-colors break-all flex items-center gap-1.5"
            >
              {record.contact.email}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Demo Pitch and Simulators */}
        {status === "pending" && (
          <div className="mt-4 border border-dashed border-slate-200 bg-slate-50/50 p-4 space-y-3 rounded-[2px]">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
              [ Pitch sent · awaiting {opp.company} ]
            </div>
            <p className="text-xs text-slate-600 italic font-mono bg-white border border-slate-100 px-3 py-2 rounded-[2px]">
              &ldquo;{record?.pitch}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-1 font-mono text-[9px]">
              <span className="text-slate-400 font-bold">Demo actions:</span>
              <button
                onClick={onAccept}
                className="text-emerald-600 font-bold hover:underline"
              >
                Accept introduction
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={onDecline}
                className="text-slate-500 hover:text-red-600 hover:underline transition-colors"
              >
                Decline introduction
              </button>
            </div>
          </div>
        )}

        {/* Declined Status */}
        {status === "declined" && (
          <div className="mt-4 border border-red-200 bg-red-50/30 p-4 space-y-2 rounded-[2px]">
            <div className="font-mono text-[9px] uppercase tracking-widest text-red-600 font-bold">
              [ Handoff declined ]
            </div>
            <p className="text-xs text-slate-600">
              {opp.company} chose not to accept this introduction. You can withdraw this pitch and try again later.
            </p>
          </div>
        )}

        {/* Bottom meta stats */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-300" />
            {opp.interested + (status !== "idle" ? 1 : 0)} verified businesses interested
          </span>
        </div>
      </div>

      {/* Right Column: Trust Badge & Actions */}
      <div className="md:w-40 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
        <div className="text-left md:text-center space-y-1">
          <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">Verification</div>
          <TooltipSimple content={<TierTooltipContent level={opp.trustLevel} />}>
            <div className="inline-flex items-center justify-center bg-slate-900 text-white text-[8px] font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm cursor-default">
              {opp.trustLevel}
            </div>
          </TooltipSimple>
        </div>

        {opp.business_id === myBusinessId ? (
          <div className="flex-1 md:flex-none md:w-full text-center py-2.5 px-3 border border-slate-200 text-slate-400 text-[9px] font-mono uppercase tracking-widest font-bold rounded-[2px] cursor-default bg-slate-50/50 flex items-center justify-center gap-1.5">
            {opp.hide_company_name && <Lock className="w-3 h-3 text-amber-500" />}
            <span>Your Listing {opp.hide_company_name && "(Private)"}</span>
          </div>
        ) : (
          <>
            {status === "idle" && (
              <button
                onClick={() => setOpen(true)}
                className="flex-1 md:flex-none md:w-full py-2.5 px-3 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer"
              >
                Express Interest
              </button>
            )}

            {status === "pending" && (
              <div className="flex-1 md:flex-none md:w-full flex flex-col gap-2">
                <div className="text-center py-2 px-3 border border-amber-500/30 bg-amber-500/10 text-amber-600 text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px]">
                  Pending
                </div>
                <button
                  onClick={() => withdraw(opp.id)}
                  className="text-[9px] font-mono uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors font-bold"
                >
                  Withdraw Pitch
                </button>
              </div>
            )}

            {status === "accepted" && (
              <div className="flex-1 md:flex-none md:w-full text-center py-2 px-3 bg-primary text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] shadow-sm">
                Connected
              </div>
            )}

            {status === "declined" && (
              <button
                onClick={() => withdraw(opp.id)}
                className="flex-1 md:flex-none md:w-full py-2 px-3 border border-slate-200 text-slate-600 text-[10px] font-mono uppercase tracking-widest hover:border-slate-800 hover:text-slate-800 transition-all rounded-[2px] shadow-sm cursor-pointer"
              >
                Reset Card
              </button>
            )}
          </>
        )}
      </div>

      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-white border border-[#1f25301f] rounded-[4px] p-6 shadow-xl font-sans">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
              Request introducing context
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 leading-relaxed font-sans">
              Contact info will be unlocked only after{" "}
              <span className="text-slate-900 font-bold">{opp.company}</span> accepts your handshake. Add a short context note on why this is a strategic fit.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100 pb-1">
              <span>Selected Handoff</span>
              <span>#{opp.id}</span>
            </div>
            <div className="text-sm font-bold text-slate-800">{opp.title}</div>
            <textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              rows={5}
              maxLength={500}
              placeholder="Provide context on who you are, what you ship, and why this is a mutual win..."
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-950 focus:outline-none px-3.5 py-3 text-sm font-mono placeholder:text-slate-400/80 resize-none rounded-[2px] transition-all"
            />
            <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
              <span>Operator network verification active</span>
              <span className={pitch.length >= 20 ? "text-slate-700" : "text-amber-500"}>
                {pitch.length}/500 chars (min 20)
              </span>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors font-bold"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow"
            >
              Submit Request
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-dashed border-slate-200 bg-white p-16 text-center space-y-5 rounded-[4px]">
      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <Building className="w-6 h-6" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-2xl font-bold text-slate-800">No opportunities found</h3>
        <p className="text-slate-400 max-w-[40ch] mx-auto text-xs font-mono uppercase tracking-wider">
          Try adjusting or resetting your filter configurations.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-slate-900 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
}
