import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useState, useMemo } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@clerk/tanstack-react-start";
import { listNetworkBusinesses } from "../functions/listNetworkBusinesses";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import {
  Search,
  Building2,
  Globe,
  Linkedin,
  Twitter,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  X,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const networkSearchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  industry: fallback(z.string(), "All").default("All"),
  stage: fallback(z.string(), "All").default("All"),
  status: fallback(z.string(), "All").default("All"),
});

export const Route = createFileRoute("/network")({
  validateSearch: zodValidator(networkSearchSchema),
  component: NetworkDirectoryPage,
});

const INDUSTRIES = [
  "All",
  "SaaS",
  "Fintech",
  "AI / Machine Learning",
  "Healthcare",
  "E-commerce",
  "Agency & Services",
  "Cybersecurity",
  "DevTools",
  "EdTech",
  "HR Tech",
  "Manufacturing",
  "Media & Adtech",
];

const STAGES = [
  "All",
  "Bootstrapped",
  "Pre-Seed / Seed",
  "Series A",
  "Series B+",
  "Profitable / Established",
];

function NetworkDirectoryPage() {
  const { q, industry, stage, status } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(q);
  const [selectedBiz, setSelectedBiz] = useState<any | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Sync search query
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  // Load Network businesses
  const loadDirectory = async () => {
    try {
      setLoading(true);
      const data = await listNetworkBusinesses({
        data: {
          q: q || undefined,
          industry: industry !== "All" ? industry : undefined,
          stage: stage !== "All" ? stage : undefined,
          status: status !== "All" ? status : undefined,
        },
      });
      setBusinesses(data || []);
    } catch (err: any) {
      console.error("Failed to load network businesses:", err);
      toast.error("Failed to load network directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectory();
  }, [q, industry, stage, status]);

  // Handle Search Submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    navigate({
      search: (prev) => ({
        ...prev,
        q: searchInput.trim() || undefined,
      }),
    });
  };

  // Quick industry select
  const handleIndustrySelect = (ind: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        industry: ind === "All" ? undefined : ind,
      }),
    });
  };

  // Summary Metrics
  const stats = useMemo(() => {
    const totalEntities = businesses.length;
    const approvedEntities = businesses.filter((b) => b.status === "approved").length;
    const totalOppsLinked = businesses.reduce((acc, b) => acc + (b.active_opportunities_count || 0), 0);
    const uniqueIndustries = new Set(businesses.map((b) => b.industry)).size;

    return {
      totalEntities,
      approvedEntities,
      totalOppsLinked,
      uniqueIndustries,
    };
  }, [businesses]);

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 md:pt-8 md:pb-24 flex-1">
        {/* Header Hero */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-200/80">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white font-mono text-[9px] uppercase px-2 py-0.5 rounded-[2px] font-bold tracking-widest">
                Protocol Index
              </span>
              <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
                Live Ecosystem
              </span>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl uppercase">
              Verified Network
            </h1>
            <p className="text-slate-500 text-xs md:text-[13px] max-w-[58ch] leading-relaxed">
              Direct registry of vetted companies, founders, and enterprises trading deals,
              distribution, and strategic partnerships on The Relay.
            </p>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 shrink-0 bg-white border border-slate-200/80 p-2.5 sm:p-3 rounded-[4px] shadow-2xs">
            <div className="text-left px-2">
              <span className="text-slate-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold">
                Entities
              </span>
              <span className="font-display text-lg sm:text-2xl font-black text-slate-950">
                {stats.totalEntities}
              </span>
            </div>
            <div className="text-left border-l border-slate-100 pl-3 px-2">
              <span className="text-slate-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold">
                Sectors
              </span>
              <span className="font-display text-lg sm:text-2xl font-black text-slate-950">
                {stats.uniqueIndustries}
              </span>
            </div>
            <div className="text-left border-l border-slate-100 pl-3 px-2">
              <span className="text-slate-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold">
                Listings
              </span>
              <span className="font-display text-lg sm:text-2xl font-black text-slate-950">
                {stats.totalOppsLinked}
              </span>
            </div>
          </div>
        </header>

        {/* Search & Filter Section */}
        <section className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex-1 flex items-center bg-white border border-slate-200/90 rounded-[4px] shadow-2xs focus-within:border-slate-800 transition-colors"
            >
              <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                placeholder="Search companies by name, domain, bio, or location..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    navigate({ search: (p) => ({ ...p, q: undefined }) });
                  }}
                  className="p-1 mr-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono uppercase tracking-widest font-bold px-4 py-2.5 rounded-r-[3px] transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            {/* Stage Filter */}
            <div className="flex items-center gap-2 shrink-0">
              <Select
                value={stage || "All"}
                onValueChange={(val) =>
                  navigate({ search: (p) => ({ ...p, stage: val === "All" ? undefined : val }) })
                }
              >
                <SelectTrigger className="w-[140px] sm:w-[150px] text-[11px] font-mono uppercase font-bold tracking-wider bg-white border-slate-200/90 h-[38px] rounded-[4px]">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-xs">
                  {STAGES.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs font-sans">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={status || "All"}
                onValueChange={(val) =>
                  navigate({ search: (p) => ({ ...p, status: val === "All" ? undefined : val }) })
                }
              >
                <SelectTrigger className="w-[130px] sm:w-[140px] text-[11px] font-mono uppercase font-bold tracking-wider bg-white border-slate-200/90 h-[38px] rounded-[4px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-xs">
                  <SelectItem value="All" className="text-xs">
                    All Entities
                  </SelectItem>
                  <SelectItem value="approved" className="text-xs">
                    Approved
                  </SelectItem>
                  <SelectItem value="applied" className="text-xs">
                    Applied
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Industry Horizontal Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {INDUSTRIES.map((ind) => {
              const active = (industry || "All") === ind;
              return (
                <button
                  key={ind}
                  onClick={() => handleIndustrySelect(ind)}
                  className={`px-3 py-1.5 rounded-[3px] text-[11px] font-mono uppercase tracking-wider font-bold transition-all shrink-0 cursor-pointer ${
                    active
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </section>

        {/* Directory Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-slate-800" />
            <span className="text-xs font-mono text-slate-500 tracking-wider uppercase">
              Querying Network Directory...
            </span>
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[8px] p-8 space-y-4">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-slate-800 uppercase tracking-tight">
                No Entities Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No verified businesses match your selected filters. Try broadening your search or
                switching industries.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchInput("");
                navigate({ search: {} });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-[3px] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {businesses.map((biz) => {
              const isApproved = biz.status === "approved";
              const initials =
                biz.company_name
                  ?.split(" ")
                  .map((w: string) => w[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase() || "OP";

              return (
                <div
                  key={biz.id}
                  className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-[6px] p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Logo/Initials + Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-[6px] flex items-center justify-center font-mono font-extrabold text-xs shrink-0 border overflow-hidden ${
                            isApproved
                              ? "bg-amber-500/10 text-amber-800 border-amber-400/60"
                              : "bg-indigo-500/10 text-indigo-800 border-indigo-300/60"
                          }`}
                        >
                          {biz.logo_url ? (
                            <img
                              src={biz.logo_url}
                              alt={biz.company_name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-sans text-sm font-bold text-slate-900 truncate leading-tight group-hover:text-slate-950 transition-colors">
                            {biz.company_name}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-400 font-medium tracking-wide truncate block mt-0.5">
                            {biz.industry}
                          </span>
                        </div>
                      </div>

                      {/* Tier Badge */}
                      <span
                        className={`inline-flex items-center text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[3px] shrink-0 ${
                          isApproved
                            ? "bg-amber-100 text-amber-900 border border-amber-300/80"
                            : "bg-indigo-100 text-indigo-900 border border-indigo-300/80"
                        }`}
                      >
                        {isApproved ? "Approved" : "Applied"}
                      </span>
                    </div>

                    {/* Bio / Description */}
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed min-h-[36px]">
                      {biz.description ||
                        `Verified B2B entity operating in ${biz.industry}. Exploring mutual partnerships and ecosystem expansion.`}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
                      {biz.hq_location && (
                        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-[2px]">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {biz.hq_location}
                        </span>
                      )}
                      {biz.company_size && (
                        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-[2px]">
                          <Users className="w-3 h-3 text-slate-400" />
                          {biz.company_size}
                        </span>
                      )}
                      {biz.funding_stage && (
                        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-[2px]">
                          <TrendingUp className="w-3 h-3 text-slate-400" />
                          {biz.funding_stage}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-100/90 flex items-center justify-between gap-3">
                    {/* Active Opps Indicator */}
                    {biz.active_opportunities_count > 0 ? (
                      <Link
                        to="/opportunities"
                        search={{ q: biz.company_name }}
                        className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 hover:text-amber-800 bg-amber-50/80 hover:bg-amber-100 px-2 py-1 rounded-[2px] border border-amber-200/80 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>{biz.active_opportunities_count} Live Listing{biz.active_opportunities_count > 1 ? "s" : ""}</span>
                      </Link>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 font-medium">
                        0 Active Listings
                      </span>
                    )}

                    {/* Action trigger */}
                    <div className="flex items-center gap-2">
                      {biz.website && (
                        <a
                          href={biz.website.startsWith("http") ? biz.website : `https://${biz.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-[3px] transition-colors"
                          title="Visit Website"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {biz.linkedin_url && (
                        <a
                          href={
                            biz.linkedin_url.startsWith("http")
                              ? biz.linkedin_url
                              : `https://${biz.linkedin_url}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-[3px] transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setSelectedBiz(biz);
                          setDetailOpen(true);
                        }}
                        className="bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1.5 rounded-[3px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Profile</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Detail Dialog / Drawer for Selected Company */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-7 rounded-[8px] border border-slate-200/90 shadow-xl font-sans">
          {selectedBiz && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-[6px] flex items-center justify-center font-mono font-extrabold text-sm shrink-0 border overflow-hidden ${
                      selectedBiz.status === "approved"
                        ? "bg-amber-500/10 text-amber-800 border-amber-400/60"
                        : "bg-indigo-500/10 text-indigo-800 border-indigo-300/60"
                    }`}
                  >
                    {selectedBiz.logo_url ? (
                      <img
                        src={selectedBiz.logo_url}
                        alt={selectedBiz.company_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>
                        {selectedBiz.company_name
                          ?.split(" ")
                          .map((w: string) => w[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">
                      {selectedBiz.company_name}
                    </h2>
                    <span className="text-xs font-mono text-slate-500 block mt-0.5">
                      {selectedBiz.industry}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-[3px] shrink-0 ${
                    selectedBiz.status === "approved"
                      ? "bg-amber-100 text-amber-900 border border-amber-300/80"
                      : "bg-indigo-100 text-indigo-900 border border-indigo-300/80"
                  }`}
                >
                  {selectedBiz.status === "approved" ? "Approved Entity" : "Applied Operator"}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold tracking-widest block">
                  Company Overview
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedBiz.description ||
                    `${selectedBiz.company_name} is a verified business listed in The Relay Network under ${selectedBiz.industry}.`}
                </p>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50/80 border border-slate-100 p-3.5 rounded-[4px] text-xs">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                    Headquarters
                  </span>
                  <span className="font-medium text-slate-800 text-[11px] truncate block mt-0.5">
                    {selectedBiz.hq_location || "Confidential"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                    Company Size
                  </span>
                  <span className="font-medium text-slate-800 text-[11px] truncate block mt-0.5">
                    {selectedBiz.company_size || "11-50"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                    Funding Stage
                  </span>
                  <span className="font-medium text-slate-800 text-[11px] truncate block mt-0.5">
                    {selectedBiz.funding_stage || "Bootstrapped"}
                  </span>
                </div>
              </div>

              {/* Live Opportunities Section */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold tracking-widest block">
                  Live Exchange Memorandums ({selectedBiz.active_opportunities?.length || 0})
                </span>

                {selectedBiz.active_opportunities?.length > 0 ? (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {selectedBiz.active_opportunities.map((opp: any) => (
                      <Link
                        key={opp.id}
                        to="/opportunities"
                        search={{ q: opp.title }}
                        className="block p-2.5 bg-white border border-slate-200/80 hover:border-slate-400 rounded-[4px] transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                            {opp.title}
                          </span>
                          <span className="text-[8.5px] font-mono uppercase px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-[2px] shrink-0 font-semibold">
                            {opp.category}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-[4px] text-xs text-slate-500 text-center font-mono text-[11px]">
                    No active public listings currently. Check back soon.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {selectedBiz.website && (
                    <a
                      href={
                        selectedBiz.website.startsWith("http")
                          ? selectedBiz.website
                          : `https://${selectedBiz.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-[3px] transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                  {selectedBiz.linkedin_url && (
                    <a
                      href={
                        selectedBiz.linkedin_url.startsWith("http")
                          ? selectedBiz.linkedin_url
                          : `https://${selectedBiz.linkedin_url}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-[3px] transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>

                <Link
                  to="/opportunities"
                  search={{ q: selectedBiz.company_name }}
                  className="bg-slate-900 hover:bg-primary text-white text-xs font-mono uppercase tracking-widest font-bold px-4 py-2 rounded-[3px] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Explore Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
