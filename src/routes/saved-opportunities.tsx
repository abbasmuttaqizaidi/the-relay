import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { toast } from "@/components/ui/sonner";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { OPPORTUNITIES } from "../lib/mock-opportunities";
import { getSavedOpportunities } from "../functions/getSavedOpportunities";
import { removeSavedOpportunity } from "../functions/removeSavedOpportunity";
import { expressInterest } from "../functions/expressInterest";
import { Navbar } from "@/components/navbar";
import { useInterestStore, RECIPROCITY_WEIGHTS } from "@/lib/interest-store";
import {
  ArrowLeft,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Briefcase,
  Lock,
  Tag,
  Loader2,
  AlertTriangle,
  Info,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  BookmarkCheck
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/saved-opportunities")({
  head: () => ({
    meta: [
      { title: "Saved Opportunities — The Relay" },
      {
        name: "description",
        content: "Review and manage your saved business opportunities on The Relay network.",
      },
    ],
  }),
  component: SavedOpportunitiesPage,
});

function SavedOpportunitiesPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [business, setBusiness] = useState<any>(null);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  // Detail Dialog States
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  
  // Handshake Interest flow states (from useInterestStore)
  const { store, request, respond } = useInterestStore();
  const [pitch, setPitch] = useState("");
  const [interestOpen, setInterestOpen] = useState(false);

  const mockStorageKey = userId ? `relay_saved_mocks_${userId}` : "relay_saved_mocks";

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      popoverClass: "relay-tour-popover",
      steps: [
        {
          element: "#saved-opportunities-header-info",
          popover: {
            title: "Saved Memos",
            description: "Yahan aapke dwara save ya bookmark kiye gaye business opportunities memorandums showcase hote hain.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#saved-opportunities-list",
          popover: {
            title: "Bookmarked Listings",
            description: "Aap save kiye gaye items ko click karke details dekh sakte hain, interest pitch submit kar sakte hain, ya list se remove kar sakte hain.",
            side: "top",
            align: "center"
          }
        }
      ]
    });
    driverObj.drive();
  };

  useEffect(() => {
    const handleTourEvent = () => startTour();
    window.addEventListener("relay:start-tour:saved-opportunities", handleTourEvent);
    return () => {
      window.removeEventListener("relay:start-tour:saved-opportunities", handleTourEvent);
    };
  }, []);

  const loadData = async () => {
    try {
      setLoadingList(true);
      const items = await getSavedOpportunities();

      // Load mock saves from localStorage
      let mockIds: string[] = [];
      try {
        console.log("[Saved Opps Page] Reading mock saves from key:", mockStorageKey);
        const stored = localStorage.getItem(mockStorageKey);
        console.log("[Saved Opps Page] Raw stored value in localStorage:", stored);
        if (stored) {
          mockIds = JSON.parse(stored);
        }
      } catch (err) {
        console.error("[Saved Opps Page] Error reading mock saves:", err);
      }
      console.log("[Saved Opps Page] Resolved mock IDs:", mockIds);

      const mockItems = mockIds
        .map((id) => {
          const opp = OPPORTUNITIES.find((o) => o.id === id);
          if (!opp) return null;
          return {
            id: `mock-saved-${opp.id}`,
            opportunity_id: opp.id,
            opportunity: {
              ...opp,
              category: opp.type,
              location: opp.geo,
              postedAt: opp.postedAt,
              interestedCount: opp.interested,
              business: {
                company_name: opp.company,
                status: opp.trustLevel === "Approved" ? "approved" : opp.trustLevel === "Applied" ? "applied" : "pending",
                industry: opp.industry,
              }
            }
          };
        })
        .filter(Boolean);

      setSavedItems([...(items || []), ...mockItems]);
    } catch (err) {
      console.error("Failed to load saved opportunities:", err);
      toast.error("Failed to load saved opportunities.");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    async function verifyUser() {
      if (isLoaded) {
        if (!isSignedIn) {
          navigate({ to: "/login", replace: true });
          return;
        }
        try {
          const status = await checkOnboardingStatus();
          if (status.isAuthenticated && !status.hasBusiness) {
            toast.error("Please register your business profile first.");
            navigate({ to: "/onboarding", replace: true });
          } else {
            setBusiness(status.business);
            if (status.business?.status === "approved") {
              navigate({ to: "/opportunities/my", search: { tab: "saved" }, replace: true });
              return;
            }
            await loadData();
          }
        } catch (err) {
          console.error("Error verifying onboarding status:", err);
        } finally {
          setIsValidating(false);
        }
      }
    }
    verifyUser();
  }, [isLoaded, isSignedIn, navigate]);

  const handleRemove = async (oppId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isMock = oppId.startsWith("RY-");
    try {
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
      setSavedItems(prev => prev.filter(item => item.opportunity_id !== oppId));
      toast.success("Opportunity removed from saved.");
      if (selectedOpp?.id === oppId) {
        setDetailOpen(false);
      }
    } catch (err: any) {
      console.error("Failed to remove saved opportunity:", err);
      toast.error(err.message || "Failed to remove opportunity.");
    }
  };

  const handleExpressInterest = async () => {
    if (!selectedOpp) return;
    const trimmed = pitch.trim();
    if (trimmed.length < 20) {
      toast.error("Add a short context note (20+ characters).");
      return;
    }
    try {
      await expressInterest({ data: { opportunity_id: selectedOpp.id } });
      request(selectedOpp.id, trimmed);
      setInterestOpen(false);
      setPitch("");
      toast.success("Interest sent. Awaiting mutual acceptance.");
    } catch (err: any) {
      console.error("Failed to express interest:", err);
      toast.error(err.message || "Failed to express interest.");
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Verifying secure credentials...
          </span>
        </div>
      </div>
    );
  }

  const isApproved = business?.status === "approved";

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-slate-900 selection:text-white">

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-1.5 pb-24 md:pt-6">
        {/* Back Link */}
        <div className="mb-1.5 md:mb-6">
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Opportunities
          </Link>
        </div>

        {/* Page Title & Status Banner */}
        <div id="saved-opportunities-header-info" className="space-y-4 mb-8">
          <div className="flex items-baseline justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
              Saved Opportunities
            </h1>
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Shortlist ({savedItems.length} listings)
            </div>
          </div>

          {!isApproved && (
            <div className="border border-amber-500/20 bg-amber-500/5 p-4 rounded-[2px] flex items-start gap-3.5 animate-momentum">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                  Business Status: Applied (Verification Pending)
                </h3>
                <p className="text-xs text-amber-700 leading-relaxed max-w-[80ch]">
                  Your profile is currently waiting for manual approval. You can build a shortlist by saving opportunities here. Expressing interest and unlocking contact details will be enabled once your account is fully verified.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Saved List Table */}
        <div id="saved-opportunities-list">
          {loadingList ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                Loading shortlist...
              </span>
            </div>
          ) : savedItems.length === 0 ? (
            /* Empty State */
            <div className="border border-slate-200 bg-white/60 backdrop-blur-xs py-20 px-8 text-center rounded-[4px] max-w-2xl mx-auto shadow-sm space-y-5 animate-momentum">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                <BookmarkCheck className="w-6 h-6 text-slate-400" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-xl font-bold text-slate-900 uppercase tracking-tight">
                  No Saved Opportunities
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Save opportunities while exploring The Relay and revisit them later.
                </p>
              </div>
              <Link
                to="/opportunities"
                className="inline-block bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest px-5 py-2.5 rounded-[2px] font-bold shadow-sm transition-all"
              >
                Explore Feed
              </Link>
            </div>
          ) : (
            /* Responsive Table Layout */
            <div className="border border-slate-200 bg-white rounded-[4px] shadow-sm overflow-hidden animate-momentum">
              <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      <th className="py-3.5 px-6 font-bold">Opportunity #</th>
                      <th className="py-3.5 px-4 font-bold">Title</th>
                      <th className="py-3.5 px-4 font-bold">Category</th>
                      <th className="py-3.5 px-4 font-bold">Company</th>
                      <th className="py-3.5 px-4 font-bold">Industry / Location</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-6 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {savedItems.map((item) => {
                      const opp = item.opportunity;
                      const isClosed = opp.status === "closed";
                      const isExpired = opp.expires_at ? new Date(opp.expires_at) < new Date() : false;
                      const isInactive = isClosed || isExpired;
                      const isConnected = store[opp.id]?.status === "accepted";
                      const shouldHide = opp.hide_company_name && !isConnected && !isApproved;
                      const displayName = shouldHide ? "Confidential" : opp.company;

                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          onClick={() => {
                            setSelectedOpp(opp);
                            setDetailOpen(true);
                          }}
                        >
                          <td className="py-4 px-6 font-mono text-slate-400 font-semibold">
                            #{opp.opportunity_number || opp.id.substring(0, 8)}
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-900 max-w-xs truncate">
                            {opp.title}
                          </td>
                          <td className="py-4 px-4 font-mono text-[9px] uppercase tracking-wider font-bold">
                            <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-600 border border-slate-200/40">
                              {opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-700">
                            {displayName}
                          </td>
                          <td className="py-4 px-4 space-y-0.5 text-slate-500 font-mono text-[10px]">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                              {opp.industry}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-300" />
                              {opp.location || "Remote"}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {isInactive ? (
                              <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-200/60 rounded-[2px] text-[8.5px] font-mono font-bold uppercase tracking-wider">
                                {isClosed ? "Closed" : "Expired"}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-[2px] text-[8.5px] font-mono font-bold uppercase tracking-wider">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedOpp(opp);
                                  setDetailOpen(true);
                                }}
                                className="p-1.5 border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 rounded-[2px] transition-all cursor-pointer bg-white"
                                title="View Opportunity"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleRemove(opp.id, e)}
                                className="p-1.5 border border-slate-200 hover:border-red-600 text-slate-400 hover:text-red-600 rounded-[2px] transition-all cursor-pointer bg-white"
                                title="Remove From Saved"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="block md:hidden divide-y divide-slate-100 bg-white">
                {savedItems.map((item) => {
                  const opp = item.opportunity;
                  const isClosed = opp.status === "closed";
                  const isExpired = opp.expires_at ? new Date(opp.expires_at) < new Date() : false;
                  const isInactive = isClosed || isExpired;
                  const isConnected = store[opp.id]?.status === "accepted";
                  const shouldHide = opp.hide_company_name && !isConnected && !isApproved;
                  const displayName = shouldHide ? "Confidential" : opp.company;

                  return (
                    <div 
                      key={item.id} 
                      className="p-4 space-y-3 cursor-pointer hover:bg-slate-50/50 transition-colors"
                      onClick={() => {
                        setSelectedOpp(opp);
                        setDetailOpen(true);
                      }}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="font-bold text-slate-600">#{opp.opportunity_number || opp.id.substring(0, 8)}</span>
                        {isInactive ? (
                          <span className="px-1.5 py-0.5 bg-red-50 text-red-600 border border-red-200/60 rounded-[2px] text-[8px] font-mono font-bold uppercase">
                            {isClosed ? "Closed" : "Expired"}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-[2px] text-[8px] font-mono font-bold uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-slate-900 text-sm leading-snug">{opp.title}</h4>
                        <p className="text-[11px] font-bold text-slate-700">{displayName}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="px-2 py-0.5 border border-slate-200 bg-slate-100 text-[8px] font-mono font-bold uppercase tracking-wider text-slate-600 rounded-[2px]">
                            {opp.category === "strategic_advice" ? "Strategic Advice" : opp.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 text-slate-500 font-mono text-[9px]">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                            {opp.industry}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-300" />
                            {opp.location || "Remote"}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOpp(opp);
                              setDetailOpen(true);
                            }}
                            className="p-1.5 border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 rounded-[2px] transition-all cursor-pointer bg-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleRemove(opp.id, e)}
                            className="p-1.5 border border-slate-200 hover:border-red-600 text-slate-400 hover:text-red-600 rounded-[2px] transition-all cursor-pointer bg-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          </div>
        )}
      </div>
    </main>

      {/* Opportunity Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-xl bg-white border border-[#1f25301f] rounded-[4px] p-6 shadow-xl font-sans text-left">
          {selectedOpp && (() => {
            const isClosed = selectedOpp.status === "closed";
            const isExpired = selectedOpp.expires_at ? new Date(selectedOpp.expires_at) < new Date() : false;
            const isInactive = isClosed || isExpired;
            
            const isConnected = store[selectedOpp.id]?.status === "accepted";
            const shouldHide = selectedOpp.hide_company_name && !isConnected && !isApproved;
            const displayName = shouldHide ? "Confidential" : selectedOpp.company;
            const initials = shouldHide ? "🔒" : displayName.split(/\s+/).map((w: string) => w[0]).join("").substring(0, 2).toUpperCase();

            const interestStatus = store[selectedOpp.id]?.status ?? "idle";

            return (
              <>
                <DialogHeader className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold">
                      Opportunity Details
                    </span>
                    <span className="font-mono text-[9px] text-slate-400 font-semibold">
                      #{selectedOpp.opportunity_number || selectedOpp.id.substring(0, 8)}
                    </span>
                  </div>
                  <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                    {selectedOpp.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]">
                      {selectedOpp.category === "strategic_advice" ? "Strategic Advice" : selectedOpp.category}
                    </span>
                    {isInactive ? (
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]">
                        {isClosed ? "Closed" : "Expired"}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9.5px] uppercase font-bold tracking-wider rounded-[2px]">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50 p-4 border border-slate-200/40 rounded-[2px]">
                    {selectedOpp.description}
                  </p>

                  {selectedOpp.offer_text && (
                    <div className="space-y-1">
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">What is offered:</h4>
                      <p className="text-xs text-slate-600 font-sans">{selectedOpp.offer_text}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-100 py-3.5">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">Company</span>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-[2px] bg-slate-100 border border-slate-200 flex items-center justify-center font-sans text-[8px] font-bold text-slate-600 uppercase">
                          {initials}
                        </div>
                        <span className="text-xs font-bold text-slate-900 break-words">{displayName}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">Industry</span>
                      <span className="text-xs text-slate-700 font-mono">{selectedOpp.industry}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">Location</span>
                      <span className="text-xs text-slate-700 font-mono">{selectedOpp.location || "Remote"}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold block">Expires</span>
                      <span className="text-xs text-slate-700 font-mono">
                        {selectedOpp.expires_at ? new Date(selectedOpp.expires_at).toLocaleDateString() : "Never"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Unlocked Contact Details for accepted handshakes */}
                  {interestStatus === "accepted" && store[selectedOpp.id]?.contact && (
                    <div className="border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2 rounded-[2px] shadow-sm animate-momentum">
                      <div className="flex items-center justify-between gap-4 border-b border-emerald-500/10 pb-1.5">
                        <div className="font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-emerald-600 font-bold break-words">
                          [ Contact unlocked · mutual acceptance ]
                        </div>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="font-display text-sm font-bold text-slate-900">{store[selectedOpp.id]?.contact?.name}</span>
                        <span className="font-mono text-[10px] text-slate-400 font-bold">· {store[selectedOpp.id]?.contact?.role}</span>
                      </div>
                      <a
                        href={`mailto:${store[selectedOpp.id]?.contact?.email}`}
                        className="font-mono text-[11px] text-emerald-600 hover:underline transition-colors break-all flex items-center gap-1.5"
                      >
                        {store[selectedOpp.id]?.contact?.email}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                <DialogFooter className="border-t border-slate-100 pt-4 flex flex-row items-center justify-between gap-3 flex-wrap">
                  <button
                    onClick={() => handleRemove(selectedOpp.id)}
                    className="py-2.5 px-4 border border-slate-200 text-slate-500 hover:border-red-600 hover:text-red-600 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] font-bold cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setDetailOpen(false)}
                      className="py-2.5 px-4 border border-slate-200 hover:border-slate-800 text-slate-700 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] font-bold cursor-pointer"
                    >
                      Close
                    </button>

                    {/* Conditional Action based on approval status */}
                    {!isInactive && (
                      isApproved ? (
                        <>
                          {interestStatus === "idle" && (
                            <button
                              onClick={() => {
                                setDetailOpen(false);
                                setInterestOpen(true);
                              }}
                              className="py-2.5 px-4 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer font-bold"
                            >
                              Express Interest
                            </button>
                          )}
                          {interestStatus === "pending" && (
                            <span className="px-3.5 py-2.5 border border-amber-500/20 bg-amber-500/5 text-amber-600 text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] cursor-default">
                              Pending Handshake
                            </span>
                          )}
                          {interestStatus === "accepted" && (
                            <span className="px-3.5 py-2.5 bg-primary text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-[2px] cursor-default">
                              Connected
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[9.5px] font-mono text-slate-400 font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 px-3 py-2 rounded-[2px]">
                          Interest locked (Applied)
                        </span>
                      )
                    )}
                  </div>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Express Interest Modal (For Approved Users) */}
      <Dialog open={interestOpen} onOpenChange={setInterestOpen}>
        <DialogContent className="sm:max-w-lg bg-white border border-[#1f25301f] rounded-[4px] p-6 shadow-xl font-sans">
          {selectedOpp && (
            <>
              <DialogHeader className="space-y-2">
                <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                  Request Introducing Context
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500 leading-relaxed font-sans">
                  Contact details will be unlocked once <span className="text-slate-950 font-bold">{selectedOpp.company}</span> accepts your handshake. Add a short context note on why this is a strategic fit.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold border-b border-slate-100 pb-1">
                  <span>Selected Listing</span>
                  <span>#{selectedOpp.opportunity_number || selectedOpp.id.substring(0, 8)}</span>
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider sm:tracking-widest text-slate-400 font-bold">
                    Strategic Context Pitch (20+ chars)
                  </label>
                  <textarea
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    placeholder="e.g., We have organic distribution channels in India matching your apparel requirements..."
                    className="w-full h-32 px-3.5 py-2.5 border border-slate-200 focus:border-slate-800 focus:ring-0 font-mono text-xs rounded-[2px] transition-all bg-slate-50/20 outline-none resize-none"
                    maxLength={300}
                  />
                  <div className="flex flex-wrap justify-between items-center font-mono text-[9px] text-slate-400 font-medium gap-1">
                    <span>{pitch.trim().length} / 300 characters</span>
                    <span>Min 20 characters</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setInterestOpen(false);
                    setPitch("");
                    setDetailOpen(true);
                  }}
                  className="py-2.5 px-4 border border-slate-200 hover:border-slate-800 text-slate-700 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExpressInterest}
                  className="py-2.5 px-5 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-sm hover:shadow cursor-pointer font-bold"
                >
                  Submit Handshake
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
