import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import { checkOnboardingStatus } from "../functions/checkOnboardingStatus";
import { getMyOpportunities } from "../functions/getMyOpportunities";
import { createOpportunity } from "../functions/createOpportunity";
import { updateOpportunity } from "../functions/updateOpportunity";
import { closeOpportunity } from "../functions/closeOpportunity";
import logoUrl from "../../assets/icons/white-transparent-horizontal.png";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import {
  ArrowLeft,
  Plus,
  Edit2,
  XCircle,
  Lock,
  Check,
  Loader2,
  Calendar,
  MapPin,
  Users,
  Tag,
  Briefcase,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Info,
  HelpCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipSimple } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/opportunities/my")({
  head: () => ({
    meta: [
      { title: "My Opportunities — The Relay" },
      {
        name: "description",
        content: "Manage your B2B opportunity listings on The Relay network.",
      },
    ],
  }),
  component: MyOpportunitiesPage,
});

const CATEGORIES = ["partnership", "referral", "distribution", "vendor"] as const;

function MyOpportunitiesPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [business, setBusiness] = useState<any>(null);
  const [myOpps, setMyOpps] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  // Form Dialog States
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("partnership");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [offerText, setOfferText] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [submitting, setSubmitting] = useState(false);
  const [hideCompanyName, setHideCompanyName] = useState(false);

  // Fetch list of owner's opportunities
  const loadMyOpportunities = async () => {
    try {
      setLoadingList(true);
      const data = await getMyOpportunities();
      setMyOpps(data || []);
    } catch (err) {
      console.error("Error loading my opportunities:", err);
      toast.error("Failed to load your opportunities.");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    async function verifyAndLoad() {
      if (isLoaded) {
        if (!isSignedIn) {
          toast.error("Please sign in to access this page.", { id: "my-opps-auth-required" });
          navigate({ to: "/home", replace: true });
          return;
        }

        try {
          const status = await checkOnboardingStatus();
          if (status.isAuthenticated && !status.hasBusiness) {
            toast.error("Please register your business profile first.", {
              id: "my-opps-onboarding-redirect",
            });
            navigate({ to: "/onboarding", replace: true });
          } else {
            setBusiness(status.business);
            setIsValidating(false);
            await loadMyOpportunities();
          }
        } catch (error) {
          console.error("Error verifying onboarding status:", error);
          setIsValidating(false);
        }
      }
    }
    verifyAndLoad();
  }, [isLoaded, isSignedIn, navigate]);

  // Open Create Dialog
  const handleOpenCreate = () => {
    if (!business || business.status !== "approved") {
      toast.error(`Forbidden: Your business profile status is "${business?.status || "pending"}". Only approved businesses can create opportunities.`, {
        duration: 5000,
      });
      return;
    }
    setTitle("");
    setCategory("partnership");
    setDescription("");
    setLocation("");
    setOfferText("");
    setExpiryDays("30");
    setHideCompanyName(false);
    setCreateOpen(true);
  };

  // Open Edit Dialog
  const handleOpenEdit = (opp: any) => {
    if (!business || business.status !== "approved") {
      toast.error("Forbidden: Only approved businesses can edit opportunities.");
      return;
    }
    setSelectedOpp(opp);
    setTitle(opp.title);
    setCategory(opp.category);
    setDescription(opp.description);
    setLocation(opp.location || "");
    setOfferText(opp.offer_text || "");
    setExpiryDays("30"); // default, calculation will be made if modified
    setHideCompanyName(opp.hide_company_name ?? false);
    setEditOpen(true);
  };

  // Submit Create Opportunity
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(`Description must be between 50 and 3000 characters. Currently: ${description.length}`);
      return;
    }

    try {
      setSubmitting(true);
      // Calculate expires_at Date
      let expires_at: string | null = null;
      if (expiryDays !== "never") {
        const days = parseInt(expiryDays, 10);
        expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      }

      await createOpportunity({
        data: {
          title,
          category,
          description,
          location: location.trim() || null,
          offer_text: offerText.trim() || null,
          expires_at,
          hide_company_name: hideCompanyName,
        },
      });

      toast.success("Opportunity Created Successfully");
      setCreateOpen(false);
      await loadMyOpportunities();
    } catch (err: any) {
      console.error("Create opportunity error:", err);
      toast.error(err.message || "Failed to create opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit Opportunity
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    if (title.trim().length === 0) {
      toast.error("Title is required");
      return;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(`Description must be between 50 and 3000 characters. Currently: ${description.length}`);
      return;
    }

    try {
      setSubmitting(true);
      let expires_at: string | null = selectedOpp.expires_at;
      if (expiryDays !== "keep" && expiryDays !== "never") {
        const days = parseInt(expiryDays, 10);
        expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      } else if (expiryDays === "never") {
        expires_at = null;
      }

      await updateOpportunity({
        data: {
          opportunity_id: selectedOpp.id,
          title,
          category,
          description,
          location: location.trim() || null,
          offer_text: offerText.trim() || null,
          expires_at,
          hide_company_name: hideCompanyName,
        },
      });

      toast.success("Opportunity Updated Successfully");
      setEditOpen(false);
      await loadMyOpportunities();
    } catch (err: any) {
      console.error("Update opportunity error:", err);
      toast.error(err.message || "Failed to update opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  // Close Opportunity
  const handleClose = async (opportunityId: string) => {
    if (!confirm("Are you sure you want to close this opportunity? It will be hidden from the explore feed.")) return;

    try {
      await closeOpportunity({
        data: { opportunity_id: opportunityId },
      });
      toast.success("Opportunity Closed Successfully");
      await loadMyOpportunities();
    } catch (err: any) {
      console.error("Close opportunity error:", err);
      toast.error(err.message || "Failed to close opportunity");
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-6">
          <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
              Loading Operator Dashboard
            </span>
          </div>
        </div>
      </div>
    );
  }

  const isApproved = business?.status === "approved";

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/home" className="flex items-center gap-2 group">
              <img src={logoUrl} alt="Logo" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
            </Link>
            <div className="hidden md:flex gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400 font-bold">
              <Link to="/opportunities" className="hover:text-slate-800 pb-1 transition-colors">
                Opportunities
              </Link>
              <Link
                to="/opportunities/my"
                activeProps={{ className: "text-slate-900 border-b-2 border-slate-900" }}
                className="hover:text-slate-800 pb-1 transition-colors"
              >
                My Opportunities
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserAvatarDropdown />
          </div>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="max-w-5xl mx-auto px-6 pt-6 pb-24">
        {/* Breadcrumb Back */}
        <div className="mb-6">
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Feed
          </Link>
        </div>

        {/* Header Title & Action button */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="font-display text-2xl font-black text-slate-950 uppercase tracking-tight">
              My Opportunities
            </h1>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl">
              Post, edit, and close opportunity exchange memos. Only approved businesses can publish new requests.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            disabled={!isApproved}
            className={`inline-flex items-center gap-2 h-11 px-5 font-mono text-xs uppercase tracking-widest transition-all rounded-[2px] font-bold shadow-xs cursor-pointer ${
              isApproved
                ? "bg-slate-900 text-white hover:bg-primary"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Plus className="w-4 h-4" /> Post Opportunity
          </button>
        </header>

        {/* Business Status Check Alert banner */}
        {!isApproved && (
          <div className="mb-8 border border-amber-500/20 bg-amber-50 p-5 rounded-[2px] flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-left">
              <h4 className="font-mono text-xs font-bold uppercase text-amber-800 tracking-wider">
                Operator Approval Required
              </h4>
              <p className="text-xs text-amber-700 leading-relaxed max-w-[80ch]">
                Your business profile current verification state is <span className="font-bold uppercase">&ldquo;{business?.status || "pending"}&rdquo;</span>. 
                Opportunity creation, editing, and closing operations are restricted to approved network nodes. Profiles are typically hand-vetted within 24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Opportunities Table */}
        <div className="border border-slate-200/80 bg-white rounded-[4px] overflow-hidden shadow-xs">
          {loadingList ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Fetching opportunities from secure ledger...
              </span>
            </div>
          ) : myOpps.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
              <Info className="w-8 h-8 text-slate-300" />
              <div className="space-y-1">
                <h4 className="font-display font-extrabold text-sm text-slate-900 uppercase">No Opportunities Posted</h4>
                <p className="text-slate-500 text-xs max-w-sm">
                  You haven't posted any B2B partnerships or referral requests yet. Click &ldquo;Post Opportunity&rdquo; to begin.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">Title & Category</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Created Date</th>
                    <th className="py-4 px-6">Interested Count</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myOpps.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* ID */}
                      <td className="py-4 px-6 font-mono font-bold text-slate-600">
                        #{opp.opportunity_number}
                      </td>

                      {/* Title & Category */}
                      <td className="py-4 px-6 space-y-1 max-w-[280px]">
                        <div className="font-display font-bold text-slate-900 text-sm leading-snug">
                          {opp.title}
                        </div>
                        <div className="inline-flex gap-1.5">
                          <span className="px-2 py-0.5 border border-slate-200 bg-slate-100 text-[8px] font-mono font-bold uppercase tracking-wider text-slate-600 rounded-[2px]">
                            {opp.category}
                          </span>
                          {opp.hide_company_name && (
                            <span className="px-2 py-0.5 border border-amber-200 bg-amber-50 text-[8px] font-mono font-bold uppercase tracking-wider text-amber-700 rounded-[2px] inline-flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> Anonymous
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                            opp.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              opp.status === "active" ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          {opp.status}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-6 font-mono text-slate-500">
                        {new Date(opp.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Interested Count */}
                      <td className="py-4 px-6 font-mono text-slate-700 font-bold">
                        {opp.interestedCount} Operators
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-2 shrink-0 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(opp)}
                          disabled={!isApproved}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 hover:border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-all bg-white cursor-pointer ${
                            isApproved ? "text-slate-700 hover:text-slate-900" : "opacity-30 cursor-not-allowed"
                          }`}
                        >
                          <Edit2 className="w-3 h-3 text-slate-400" /> Edit
                        </button>
                        {opp.status === "active" && (
                          <button
                            onClick={() => handleClose(opp.id)}
                            disabled={!isApproved}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 border border-red-100 hover:border-red-600 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-all bg-white cursor-pointer ${
                              isApproved ? "text-red-600 hover:bg-red-50/50" : "opacity-30 cursor-not-allowed"
                            }`}
                          >
                            <XCircle className="w-3 h-3 text-red-400" /> Close
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* CREATE DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-xl bg-white border border-slate-200 p-6 shadow-xl rounded-[4px] font-sans text-left">
          <DialogHeader className="border-b border-slate-100 pb-3 mb-4">
            <DialogTitle className="font-display text-lg font-black uppercase tracking-tight text-slate-950">
              Post Opportunity Brief
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs">
              Outline your requirements. Memos are distributed to verified operators matches.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Opportunity Title *</span>
                <TooltipSimple content="Write a short, clear summary of what you are looking for (e.g. 'Looking for SEO Agency').">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Looking for SEO Agency / Shopify Dev Shop"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> Exchange Category *</span>
                <TooltipSimple content="Select the type of partnership layout (e.g. client referral exchange, distribution partner, or vendor).">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <Select value={category} onValueChange={(val) => setCategory(val as any)}>
                <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="partnership">Partnership (Integrations, API merges)</SelectItem>
                  <SelectItem value="referral">Referral (Client exchanges, Mutual handoffs)</SelectItem>
                  <SelectItem value="distribution">Distribution (IT Consultancies, Resellers)</SelectItem>
                  <SelectItem value="vendor">Vendor (Scaling pipeline requirements)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Brief Description *</span>
                  <TooltipSimple content="Provide detailed context, scope, requirements, and target timeline for this growth request (50 to 3000 chars).">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </span>
                <span className="text-[8px] text-slate-400 font-normal lowercase">{description.length} / 50 min chars</span>
              </label>
              <textarea
                required
                rows={4}
                maxLength={3000}
                placeholder="Describe your request in detail. Provide background context, scope of work, timeline, and expectations. Min 50 characters required."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono resize-y outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Location */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Location Target (Optional)</span>
                  <TooltipSimple content="Optionally restrict your target partners to a specific country, region, or specify 'Remote' / 'Global'.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  placeholder="e.g. India, USA, Global, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
                />
              </div>

              {/* Expiry */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Expiry Period (Optional)</span>
                  <TooltipSimple content="Select when this listing will be automatically closed and hidden from the public feed.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <Select value={expiryDays} onValueChange={setExpiryDays}>
                  <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer">
                    <SelectValue placeholder="Select Expiry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="never">No Expiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* What Can You Offer */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> What Can You Offer in Return? (Optional)</span>
                <TooltipSimple content="Explain what value, referral pipeline, or resources you can provide to the partner in return.">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                placeholder="e.g. Can introduce D2C brands / Provide recurring referrals"
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Post Anonymously Checkbox */}
            <div className="flex items-center space-x-2.5 pt-2 pb-1">
              <Checkbox
                id="hide_company_name_create"
                checked={hideCompanyName}
                onCheckedChange={(checked) => setHideCompanyName(!!checked)}
              />
              <label
                htmlFor="hide_company_name_create"
                className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 cursor-pointer flex items-center gap-1.5 select-none"
              >
                <span>Post anonymously (Hide company name from public feed)</span>
                <TooltipSimple content="If checked, your company name is displayed as 'Confidential' and logo/LinkedIn links are hidden from non-owners in the public directories.">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="px-4 py-2 border border-slate-200 hover:border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-colors cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest rounded-[2px] font-bold shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Publish brief
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-xl bg-white border border-slate-200 p-6 shadow-xl rounded-[4px] font-sans text-left">
          <DialogHeader className="border-b border-slate-100 pb-3 mb-4">
            <DialogTitle className="font-display text-lg font-black uppercase tracking-tight text-slate-950 flex items-center justify-between">
              <span>Edit Opportunity Brief</span>
              {selectedOpp && (
                <span className="font-mono text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                  #{selectedOpp.opportunity_number}
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs">
              Modify details for this listing. Sequence number cannot be edited.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Opportunity Title *</span>
                <TooltipSimple content="Write a short, clear summary of what you are looking for (e.g. 'Looking for SEO Agency').">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Looking for SEO Agency"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> Exchange Category *</span>
                <TooltipSimple content="Select the type of partnership layout (e.g. client referral exchange, distribution partner, or vendor).">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <Select value={category} onValueChange={(val) => setCategory(val as any)}>
                <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="partnership">Partnership (Integrations, API merges)</SelectItem>
                  <SelectItem value="referral">Referral (Client exchanges, Mutual handoffs)</SelectItem>
                  <SelectItem value="distribution">Distribution (IT Consultancies, Resellers)</SelectItem>
                  <SelectItem value="vendor">Vendor (Scaling pipeline requirements)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Brief Description *</span>
                  <TooltipSimple content="Provide detailed context, scope, requirements, and target timeline for this growth request (50 to 3000 chars).">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </span>
                <span className="text-[8px] text-slate-400 font-normal lowercase">{description.length} / 50 min chars</span>
              </label>
              <textarea
                required
                rows={4}
                maxLength={3000}
                placeholder="Describe your request in detail. Min 50 characters required."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono resize-y outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Location */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Location Target (Optional)</span>
                  <TooltipSimple content="Optionally restrict your target partners to a specific country, region, or specify 'Remote' / 'Global'.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  placeholder="e.g. India, USA, Global, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
                />
              </div>

              {/* Expiry */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Extend Expiry Period (Optional)</span>
                  <TooltipSimple content="Extend when this listing will automatically close and be removed from the public directory.">
                    <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                  </TooltipSimple>
                </label>
                <Select value={expiryDays} onValueChange={setExpiryDays}>
                  <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none cursor-pointer">
                    <SelectValue placeholder="Select Expiry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="keep">Keep Current Expiry</SelectItem>
                    <SelectItem value="30">Add 30 Days</SelectItem>
                    <SelectItem value="60">Add 60 Days</SelectItem>
                    <SelectItem value="90">Add 90 Days</SelectItem>
                    <SelectItem value="never">Remove Expiry (Never)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* What Can You Offer */}
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> What Can You Offer in Return? (Optional)</span>
                <TooltipSimple content="Explain what value, referral pipeline, or resources you can provide to the partner in return.">
                  <HelpCircle className="w-3 h-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                placeholder="e.g. Can introduce D2C brands / Provide recurring referrals"
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-none"
              />
            </div>

            {/* Post Anonymously Checkbox */}
            <div className="flex items-center space-x-2.5 pt-2 pb-1">
              <Checkbox
                id="hide_company_name_edit"
                checked={hideCompanyName}
                onCheckedChange={(checked) => setHideCompanyName(!!checked)}
              />
              <label
                htmlFor="hide_company_name_edit"
                className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 cursor-pointer flex items-center gap-1.5 select-none"
              >
                <span>Post anonymously (Hide company name from public feed)</span>
                <TooltipSimple content="If checked, your company name is displayed as 'Confidential' and logo/LinkedIn links are hidden from non-owners in the public directories.">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
                </TooltipSimple>
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 border border-slate-200 hover:border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded-[2px] transition-colors cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest rounded-[2px] font-bold shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Save Changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
