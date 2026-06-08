import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@clerk/tanstack-react-start";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { listOpportunities } from "../functions/listOpportunities";
import { expressInterest } from "../functions/expressInterest";
import { saveOpportunity } from "../functions/saveOpportunity";
import { removeSavedOpportunity } from "../functions/removeSavedOpportunity";
import { getSavedOpportunities } from "../functions/getSavedOpportunities";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { Loader2, BadgeCheck, Check, Search, MapPin, Briefcase, Calendar, Users, Building, ExternalLink, RefreshCw, SlidersHorizontal, Trash2, Lock, Bookmark, Menu, ChevronRight } from "lucide-react";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
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
  "E-commerce",
  "Real Estate",
  "Fintech",
  "Cybersecurity",
  "Cloud & DevOps",
  "Edtech",
  "Consulting & Advisory",
  "Web3 & Blockchain",
  "HR Tech",
  "Manufacturing",
  "Media & Adtech",
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
  status?: string;
  expires_at?: string;
};

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
  const { isSignedIn, isLoaded, userId } = useAuth();
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
        status: opp.status,
        expires_at: opp.expires_at,
      }));
      setDbOpps([...mapped, ...OPPORTUNITIES]);
    } catch (err) {
      console.error("Failed to load opportunities from database:", err);
      toast.error("Failed to load opportunities.");
    } finally {
      setLoadingOpps(false);
    }
  };

  const [myBusinessStatus, setMyBusinessStatus] = useState<"applied" | "approved" | "rejected" | null>(null);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<Set<string>>(new Set());

  const mockStorageKey = userId ? `relay_saved_mocks_${userId}` : "relay_saved_mocks";

  const loadSaved = async () => {
    if (isSignedIn) {
      try {
        const saved = await getSavedOpportunities();
        const dbIds = (saved || []).map((item: any) => item.opportunity_id);

        let mockIds: string[] = [];
        try {
          console.log("[Explore Page] Reading mock saves from key:", mockStorageKey);
          const stored = localStorage.getItem(mockStorageKey);
          console.log("[Explore Page] Raw stored value in localStorage:", stored);
          if (stored) {
            mockIds = JSON.parse(stored);
          }
        } catch (err) {
          console.error("[Explore Page] Error reading mock saves:", err);
        }
        console.log("[Explore Page] Resolved mock IDs:", mockIds);

        setSavedOpportunityIds(new Set([...dbIds, ...mockIds]));
      } catch (err) {
        console.error("Failed to load saved opportunities:", err);
      }
    }
  };

  const handleSaveToggle = async (oppId: string, shouldSave: boolean) => {
    const isMock = oppId.startsWith("RY-");
    try {
      if (shouldSave) {
        if (!isMock) {
          await saveOpportunity({ data: { opportunity_id: oppId } });
        } else {
          let mockIds: string[] = [];
          try {
            const stored = localStorage.getItem(mockStorageKey);
            if (stored) mockIds = JSON.parse(stored);
          } catch (_) {}
          if (!mockIds.includes(oppId)) {
            mockIds.push(oppId);
            localStorage.setItem(mockStorageKey, JSON.stringify(mockIds));
          }
        }
        setSavedOpportunityIds((prev) => {
          const next = new Set(prev);
          next.add(oppId);
          return next;
        });
        if (myBusinessStatus === "approved") {
          toast.success("Opportunity saved to your bookmarks.", {
            action: {
              label: "View",
              onClick: () => navigate({ to: "/opportunities/my", search: { tab: "saved" } }),
            },
          });
        } else {
          toast.success("Opportunity Saved. You can review this opportunity after your business is approved.", {
            action: {
              label: "View",
              onClick: () => navigate({ to: "/opportunities/my", search: { tab: "saved" } }),
            },
          });
        }
      } else {
        if (!isMock) {
          await removeSavedOpportunity({ data: { opportunity_id: oppId } });
        } else {
          let mockIds: string[] = [];
          try {
            const stored = localStorage.getItem(mockStorageKey);
            if (stored) mockIds = JSON.parse(stored);
          } catch (_) {}
          mockIds = mockIds.filter(id => id !== oppId);
          localStorage.setItem(mockStorageKey, JSON.stringify(mockIds));
        }
        setSavedOpportunityIds((prev) => {
          const next = new Set(prev);
          next.delete(oppId);
          return next;
        });
        toast.success("Opportunity removed from saved.");
      }
    } catch (err: any) {
      console.error("Failed to toggle save opportunity:", err);
      toast.error(err.message || "Failed to update saved opportunity.");
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
                const s = status.business.status as string;
                setMyBusinessStatus(s === "pending" || s === "applied" ? "applied" : s as any);
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
              await loadSaved();
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-16 md:pt-6 md:pb-24">
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
              <ResultCard
                key={opp.id}
                opp={opp}
                delay={i * 40}
                myBusinessId={myBusinessId}
                myBusinessStatus={myBusinessStatus}
                isSaved={savedOpportunityIds.has(opp.id)}
                onSaveToggle={handleSaveToggle}
              />
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
        <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded-[2px] font-bold uppercase tracking-wider border ${
            levelKey === "Approved"
              ? "bg-primary/20 text-primary border-primary/30"
              : levelKey === "Applied"
              ? "bg-amber-500/15 text-amber-600 border-amber-500/25"
              : "bg-slate-700/20 text-slate-400 border-slate-600/30"
          }`}>
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10">
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
        <div className="flex items-center gap-2 md:gap-4">
          <ReciprocityBadge className="hidden md:flex" />
          {(!isSignedIn || !profile) && (
            <Link
              to={isSignedIn ? "/onboarding" : "/signup"}
              className="hidden sm:inline-flex bg-slate-900 text-white px-5 py-2 text-[10px] font-mono uppercase tracking-widest hover:bg-primary transition-all rounded-[2px] shadow-sm hover:shadow"
            >
              Apply
            </Link>
          )}
          {isSignedIn && (
            <div className="hidden md:flex items-center gap-4">
              <NotificationsDropdown />
              <UserAvatarDropdown />
            </div>
          )}

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center gap-2">
            {isSignedIn && <NotificationsDropdown />}
            <Sheet>
              <SheetTrigger asChild>
                <button className="h-9 w-9 flex items-center justify-center border border-slate-200/80 rounded-[2px] bg-white hover:bg-slate-50 transition-colors cursor-pointer">
                  <Menu className="w-4 h-4 text-slate-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white p-6 w-[280px] flex flex-col justify-between border-l border-slate-200 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain mix-blend-multiply" />
                  </div>
                  
                  <div className="flex flex-col gap-5 text-[11px] font-mono uppercase tracking-[0.12em] text-slate-500 font-bold">
                    <SheetClose asChild>
                      <Link
                        to="/opportunities"
                        activeProps={{ className: "text-slate-900 font-extrabold" }}
                        className="hover:text-slate-800 py-1 transition-colors flex items-center justify-between"
                      >
                        Opportunities <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>
                    </SheetClose>
                    {isSignedIn && (
                      <SheetClose asChild>
                        <Link
                          to="/opportunities/my"
                          activeProps={{ className: "text-slate-900 font-extrabold" }}
                          className="hover:text-slate-800 py-1 transition-colors flex items-center justify-between"
                        >
                          My Opportunities <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                        </Link>
                      </SheetClose>
                    )}
                    <span className="opacity-30 py-1 cursor-not-allowed">Network</span>
                    <span className="opacity-30 py-1 cursor-not-allowed">Intelligence</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  {isSignedIn && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-[2px] border border-slate-100">
                        <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-bold">Account</span>
                        <UserAvatarDropdown />
                      </div>
                      <ReciprocityBadge className="flex w-full justify-between" />
                    </div>
                  )}
                  {(!isSignedIn || !profile) && (
                    <div className="flex flex-col gap-3">
                      <SheetClose asChild>
                        <Link
                          to={isSignedIn ? "/onboarding" : "/signup"}
                          className="w-full text-center bg-slate-900 hover:bg-orange-600 text-white py-2.5 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm font-bold flex items-center justify-center border border-slate-900"
                        >
                          Apply Now
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ReciprocityBadge({ className = "hidden sm:flex" }: { className?: string }) {
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
      className={`items-center gap-2.5 border rounded-[4px] px-3.5 py-2 transition-colors ${
        pulse ? "border-primary bg-primary/10" : "border-slate-200/80 bg-white"
      } ${className}`}
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

function ResultCard({
  opp,
  delay,
  myBusinessId,
  myBusinessStatus,
  isSaved,
  onSaveToggle,
}: {
  opp: Opportunity;
  delay: number;
  myBusinessId: string | null;
  myBusinessStatus: "applied" | "approved" | "rejected" | null;
  isSaved: boolean;
  onSaveToggle: (oppId: string, shouldSave: boolean) => void;
}) {
  const { store, request, respond, withdraw } = useInterestStore();
  const record = store[opp.id];
  const status = record?.status ?? "idle";

  const [open, setOpen] = useState(false);
  const [pitch, setPitch] = useState("");

  const submit = async () => {
    const trimmed = pitch.trim();
    if (trimmed.length < 20) {
      toast.error("Add a short context note (20+ characters).");
      return;
    }
    try {
      await expressInterest({ data: { opportunity_id: opp.id } });
      request(opp.id, trimmed);
      setOpen(false);
      setPitch("");
      toast.success("Interest sent. Awaiting mutual acceptance.");
    } catch (err: any) {
      console.error("Failed to express interest:", err);
      toast.error(err.message || "Failed to express interest.");
    }
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
      className={`bg-white border p-4 sm:p-6 flex flex-col md:flex-row gap-6 hover:shadow-md rounded-[4px] transition-all duration-300 animate-momentum relative overflow-hidden ${
        opp.trustLevel === "Approved"
          ? "border-slate-300/80 shadow-xs border-l-[3.5px] border-l-slate-900 bg-gradient-to-br from-slate-50/20 via-white to-white"
          : "border-slate-200 hover:border-primary"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top-Right Bookmark Button */}
      {opp.business_id !== myBusinessId && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onSaveToggle(opp.id, !isSaved);
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer z-10"
          title={isSaved ? "Remove from saved" : "Save opportunity"}
        >
          <Bookmark
            className={`w-4 h-4 transition-all duration-200 ${
              isSaved
                ? "fill-orange-500 text-orange-500 scale-110"
                : "text-slate-300 hover:text-slate-500"
            }`}
          />
        </button>
      )}

      <div className="flex-1 space-y-3.5">
        {/* Top bar tags */}
        <div className="flex items-center justify-between gap-4 flex-wrap pr-8">
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
              {opp.trustLevel === "Approved" && !shouldHide && (
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

      {/* Right Column: Actions */}
      <div className="md:w-40 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">

        {opp.business_id === myBusinessId ? (
          <div className="flex-1 md:flex-none md:w-full text-center py-2.5 px-3 border border-slate-200 text-slate-400 text-[9px] font-mono uppercase tracking-widest font-bold rounded-[2px] cursor-default bg-slate-50/50 flex items-center justify-center gap-1.5">
            {opp.hide_company_name && <Lock className="w-3 h-3 text-amber-500" />}
            <span>Your Listing {opp.hide_company_name && "(Private)"}</span>
          </div>
        ) : (opp.status === "closed" || (opp.expires_at ? new Date(opp.expires_at) < new Date() : false)) ? (
          <div className="flex-1 md:flex-none md:w-full text-center py-2 px-3 border border-red-200 bg-red-50 text-red-600 text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px]">
            {opp.status === "closed" ? "Closed" : "Expired"}
          </div>
        ) : myBusinessStatus !== "approved" ? (
          <div className="flex-1 md:flex-none md:w-full flex flex-col gap-2">
            <div className="text-center py-2 px-3 border border-slate-200 text-slate-400 text-[9px] font-mono uppercase tracking-widest font-bold rounded-[2px] cursor-default bg-slate-50/50">
              Vetting Required
            </div>
          </div>
        ) : (
          <div className="flex-1 md:flex-none md:w-full flex flex-col gap-2">
            {status === "idle" && (
              <button
                onClick={() => setOpen(true)}
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer font-bold"
              >
                Express Interest
              </button>
            )}

            {status === "pending" && (
              <div className="flex flex-col gap-2">
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
              <div className="text-center py-2 px-3 bg-primary text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] shadow-sm">
                Connected
              </div>
            )}

            {status === "declined" && (
              <button
                onClick={() => withdraw(opp.id)}
                className="py-2 px-3 border border-slate-200 text-slate-600 text-[10px] font-mono uppercase tracking-widest hover:border-slate-800 hover:text-slate-800 transition-all rounded-[2px] shadow-sm cursor-pointer"
              >
                Reset Card
              </button>
            )}
          </div>
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
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold border-b border-slate-100 pb-1">
              <span>Selected Handoff</span>
              <span>#{opp.id}</span>
            </div>
            <div className="text-sm font-bold text-slate-800 break-words">{opp.title}</div>
            <textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              rows={5}
              maxLength={500}
              placeholder="Provide context on who you are, what you ship, and why this is a mutual win..."
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-950 focus:outline-none px-3.5 py-3 text-sm font-mono placeholder:text-slate-400/80 resize-none rounded-[2px] transition-all"
            />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold">
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
    <div className="border border-dashed border-slate-200 bg-white p-6 sm:p-10 md:p-16 text-center space-y-5 rounded-[4px]">
      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <Building className="w-6 h-6" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-xl md:text-2xl font-bold text-slate-800">No opportunities found</h3>
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
