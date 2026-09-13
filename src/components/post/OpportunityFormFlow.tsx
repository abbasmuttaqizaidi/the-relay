import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "@/components/ui/sonner";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  HelpCircle,
  Info,
  Loader2,
  MapPin,
  Sparkles,
  Tag,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Calendar,
  Globe,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipSimple } from "@/components/ui/tooltip";
import { createOpportunity } from "@/functions/createOpportunity";
import { detectPostIntent } from "@/lib/offer-detector";
import { OfferDetectionWarningDialog } from "./OfferDetectionWarningDialog";

export type OpportunityCategory =
  | "partnership"
  | "referral"
  | "distribution"
  | "vendor"
  | "hiring"
  | "strategic_advice"
  | "investment";

const CATEGORIES: {
  value: OpportunityCategory;
  label: string;
  description: string;
}[] = [
  {
    value: "partnership",
    label: "Partnership",
    description: "Integrations, API merges, co-marketing",
  },
  {
    value: "referral",
    label: "Referral",
    description: "Client exchanges, mutual deal handoffs",
  },
  {
    value: "distribution",
    label: "Distribution",
    description: "IT Consultancies, resellers, channel partners",
  },
  {
    value: "vendor",
    label: "Vendor",
    description: "Scaling pipeline & service provider requirements",
  },
  {
    value: "hiring",
    label: "Hiring",
    description: "Recruitment, talent pipeline requests",
  },
  {
    value: "strategic_advice",
    label: "Strategic Advice",
    description: "Advisory, board positions, mentorship",
  },
  {
    value: "investment",
    label: "Investment",
    description: "Funding requests, capital raises",
  },
];

const INDUSTRIES = [
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

interface OpportunityFormFlowProps {
  business: any;
  isSignedIn: boolean;
  initialTitle?: string;
  initialDescription?: string;
  onBack: () => void;
  onSwitchToOffer: (title: string, description: string) => void;
}

export function OpportunityFormFlow({
  business,
  isSignedIn,
  initialTitle = "",
  initialDescription = "",
  onBack,
  onSwitchToOffer,
}: OpportunityFormFlowProps) {
  const navigate = useNavigate();

  // Unified Form State (Shared between Desktop & Mobile)
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState<OpportunityCategory>("partnership");
  const [industry, setIndustry] = useState<string>(business?.industry || "SaaS");
  const [description, setDescription] = useState(initialDescription);
  const [location, setLocation] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [offerText, setOfferText] = useState("");
  const [hideCompanyName, setHideCompanyName] = useState(false);
  const [promote, setPromote] = useState(false);

  // Mobile Step State (1: Start, 2: Context, 3: Details, 4: Review)
  const [mobileStep, setMobileStep] = useState<1 | 2 | 3 | 4>(1);

  // Submission & Warning State
  const [submitting, setSubmitting] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  // Validation helper
  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Opportunity Title is required");
      return false;
    }
    if (description.trim().length < 50 || description.trim().length > 3000) {
      toast.error(
        `Description must be between 50 and 3000 characters. Currently: ${description.trim().length}`
      );
      return false;
    }
    if (promote && hideCompanyName) {
      toast.error(
        "Promoted opportunities cannot be confidential. Please uncheck 'Hide company name' or 'Promote this listing'."
      );
      return false;
    }
    return true;
  };

  // Perform Intent Classification and Initiate Submission
  const handleInitiateSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) return;

    // Check intent
    const detection = detectPostIntent(title, description, category);
    if (detection.intent === "OFFER") {
      setWarningOpen(true);
      return;
    }

    // Direct submit
    executeSubmit();
  };

  // Actual Server Submission
  const executeSubmit = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to post an opportunity");
      return;
    }

    if (!business || business.status !== "approved") {
      toast.error(
        `Forbidden: Your business profile status is "${business?.status || "pending"}". Only approved businesses can create opportunities.`
      );
      return;
    }

    try {
      setSubmitting(true);
      let expires_at: string | null = null;
      if (expiryDays !== "never") {
        const days = parseInt(expiryDays, 10);
        expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      }

      await createOpportunity({
        data: {
          title: title.trim(),
          category,
          industry,
          description: description.trim(),
          location: location.trim() || null,
          offer_text: offerText.trim() || null,
          expires_at,
          hide_company_name: hideCompanyName,
          promote,
        },
      });

      toast.success("Opportunity Created Successfully");
      navigate({ to: "/opportunities/my" });
    } catch (err: any) {
      console.error("Create opportunity error:", err);
      toast.error(err.message || "Failed to create opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  // Mobile navigation handlers
  const handleMobileNext = () => {
    if (mobileStep === 1) {
      if (!title.trim()) {
        toast.error("Please enter an opportunity title");
        return;
      }
      setMobileStep(2);
    } else if (mobileStep === 2) {
      if (description.trim().length < 50) {
        toast.error(
          `Description must be at least 50 characters. Currently: ${description.trim().length}`
        );
        return;
      }
      setMobileStep(3);
    } else if (mobileStep === 3) {
      if (promote && hideCompanyName) {
        toast.error("Promoted opportunities cannot be confidential");
        return;
      }
      setMobileStep(4);
    }
  };

  const handleMobilePrev = () => {
    if (mobileStep > 1) {
      setMobileStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    } else {
      onBack();
    }
  };

  const isApproved = isSignedIn && business?.status === "approved";
  const selectedCategoryObj = CATEGORIES.find((c) => c.value === category);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Bar: Back Button & Context indicator */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Change Post Type
        </button>
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
          Business Opportunity Brief
        </span>
      </div>

      {/* Account / Approval Guard Notice if not approved */}
      {!isApproved && (
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-[2px] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-900 font-sans">
            <span className="font-bold uppercase tracking-widest font-mono text-[10px] block">
              Profile Approval Required
            </span>
            <p className="text-amber-800 leading-relaxed font-sans text-xs">
              {!isSignedIn
                ? "You must sign in with an approved business profile to publish opportunities to the network."
                : `Your business profile status is currently "${business?.status || "pending"}". Only approved operator profiles can publish live listings.`}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE-FIRST 4-STEP WIZARD (Visible on mobile < md)
          ========================================================================= */}
      <div className="block md:hidden space-y-5">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-slate-900">
            Post Opportunity Brief
          </h1>
          <p className="text-slate-500 text-xs leading-relaxed font-sans mt-1">
            Outline your requirements. Memos are vetted and distributed to verified operators.
          </p>
        </div>

        {/* Progress Bar & Header */}
        <div className="space-y-2 bg-slate-50 p-3.5 border border-slate-200 rounded-[2px]">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold">
            <span className="text-slate-500">Step {mobileStep} of 4</span>
            <span className="text-slate-900">
              {mobileStep === 1 && "Start with the opportunity"}
              {mobileStep === 2 && "Add the context"}
              {mobileStep === 3 && "Set the details"}
              {mobileStep === 4 && "Review & submit"}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-slate-900 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(mobileStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Start with the opportunity */}
        {mobileStep === 1 && (
          <div className="bg-white border border-slate-200 rounded-[2px] p-5 space-y-4 shadow-xs">
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Opportunity Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Looking for SEO Agency / Shopify Dev Shop"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm rounded-[2px] font-mono outline-hidden"
              />
              <span className="text-[9px] text-slate-400 font-mono block">
                Clear summary of what you are looking for.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Exchange Category *
              </label>
              <Select value={category} onValueChange={(val) => setCategory(val as OpportunityCategory)}>
                <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label} ({c.description})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* STEP 2: Add the context */}
        {mobileStep === 2 && (
          <div className="bg-white border border-slate-200 rounded-[2px] p-5 space-y-4 shadow-xs">
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Industry Type *
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60 overflow-y-auto">
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  Brief Description *
                </span>
                <span className="text-[9px] text-slate-400 font-mono">
                  {description.length} / 50 min
                </span>
              </label>
              <textarea
                rows={5}
                maxLength={3000}
                placeholder="Describe your request in detail. Provide background context, scope, timeline, and expectations (min 50 chars)."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono resize-y outline-hidden"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Set the details */}
        {mobileStep === 3 && (
          <div className="bg-white border border-slate-200 rounded-[2px] p-5 space-y-4 shadow-xs">
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Location Target (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. India, USA, Global, Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Expiry Period (Optional)
              </label>
              <Select value={expiryDays} onValueChange={setExpiryDays}>
                <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono">
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

            <div className="space-y-1 pt-1">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                What Can You Offer in Return? (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Can introduce D2C brands / Recurring referrals"
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono outline-hidden"
              />
            </div>

            <div className="pt-2 space-y-3 border-t border-slate-100">
              <div className="flex items-start space-x-2.5">
                <Checkbox
                  id="mobile_hide_company"
                  checked={hideCompanyName}
                  onCheckedChange={(checked) => setHideCompanyName(!!checked)}
                  disabled={promote}
                  className="mt-0.5"
                />
                <label
                  htmlFor="mobile_hide_company"
                  className={`text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                    promote ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                  }`}
                >
                  Post anonymously (Hide company name)
                </label>
              </div>

              <div className="flex items-start space-x-2.5">
                <Checkbox
                  id="mobile_promote"
                  checked={promote}
                  onCheckedChange={(checked) => setPromote(!!checked)}
                  disabled={hideCompanyName}
                  className="mt-0.5"
                />
                <label
                  htmlFor="mobile_promote"
                  className={`text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                    hideCompanyName ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                  }`}
                >
                  Promote listing across network
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & submit */}
        {mobileStep === 4 && (
          <div className="bg-white border border-slate-200 rounded-[2px] p-5 space-y-5 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Summary Review
              </span>
              <h2 className="font-display text-lg font-bold uppercase text-slate-900 mt-1">
                {title || "(No title provided)"}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[2px]">
                <div className="text-[9px] uppercase text-slate-400 font-bold">Category</div>
                <div className="text-slate-800 font-semibold uppercase mt-0.5">{category}</div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[2px]">
                <div className="text-[9px] uppercase text-slate-400 font-bold">Industry</div>
                <div className="text-slate-800 font-semibold mt-0.5">{industry}</div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[2px]">
                <div className="text-[9px] uppercase text-slate-400 font-bold">Target Location</div>
                <div className="text-slate-800 font-semibold mt-0.5">{location || "Global / Remote"}</div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[2px]">
                <div className="text-[9px] uppercase text-slate-400 font-bold">Expiry</div>
                <div className="text-slate-800 font-semibold mt-0.5">
                  {expiryDays === "never" ? "No Expiry" : `${expiryDays} Days`}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                Description
              </span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-[2px] text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">
                {description}
              </p>
            </div>

            {offerText && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Offered in Return
                </span>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-[2px] text-xs text-slate-700 font-mono">
                  {offerText}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs font-mono text-slate-600 pt-1">
              <span>{hideCompanyName ? "🔒 Confidential" : "🏢 Public Company Name"}</span>
              <span>{promote ? "⭐ Promoted" : "Standard"}</span>
            </div>
          </div>
        )}

        {/* Mobile Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleMobilePrev}
            className="border border-slate-300 text-slate-700 text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-[2px] font-bold"
          >
            {mobileStep === 1 ? "Cancel" : "Back"}
          </button>

          {mobileStep < 4 ? (
            <button
              type="button"
              onClick={handleMobileNext}
              className="bg-slate-900 text-white text-xs font-mono uppercase tracking-wider px-6 py-2.5 rounded-[2px] font-bold flex items-center gap-1.5"
            >
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileStep(1)}
                className="border border-slate-300 text-slate-700 text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-[2px] font-bold"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleInitiateSubmit()}
                disabled={submitting || !isApproved}
                className="bg-slate-900 text-white text-xs font-mono uppercase tracking-wider px-6 py-2.5 rounded-[2px] font-bold flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Review"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          DESKTOP FULL WIDTH 2-COLUMN LAYOUT (Visible on desktop md+)
          Covers full desktop width (max-w-7xl) with live preview on the right
          ========================================================================= */}
      <form onSubmit={handleInitiateSubmit} className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Fields (Col 7 / 8) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-[2px] shadow-xs p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
                Post Opportunity Brief
              </h1>
              <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed font-sans mt-1">
                Outline your requirements. Memos are vetted and distributed to verified operator matches.
              </p>
            </div>

            {/* Section 1: Core Opportunity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  01. Core Opportunity
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Opportunity Title *
                  <TooltipSimple content="Write a short, clear summary of what you are looking for (e.g. 'Looking for SEO Agency').">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Looking for SEO Agency / Shopify Dev Shop"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm rounded-[2px] font-mono outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    Exchange Category *
                  </label>
                  <Select value={category} onValueChange={(val) => setCategory(val as OpportunityCategory)}>
                    <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label} ({c.description})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    Industry Type *
                  </label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-60 overflow-y-auto">
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 2: Context & Requirements */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  02. Context & Requirements
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    Brief Description *
                    <TooltipSimple content="Provide detailed context, scope, requirements, and target timeline for this growth request (50 to 3000 chars).">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer" />
                    </TooltipSimple>
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {description.length} / 50 min chars
                  </span>
                </label>
                <textarea
                  required
                  rows={5}
                  maxLength={3000}
                  placeholder="Describe your request in detail. Provide background context, scope of work, timeline, and expectations. Min 50 characters required."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm rounded-[2px] font-mono resize-y outline-hidden"
                />
              </div>
            </div>

            {/* Section 3: Terms & Visibility */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                  03. Terms & Visibility
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Location Target (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. India, USA, Global, Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Expiry Period (Optional)
                  </label>
                  <Select value={expiryDays} onValueChange={setExpiryDays}>
                    <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono">
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

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  What Can You Offer in Return? (Optional)
                  <TooltipSimple content="Explain what value, referral pipeline, or resources you can provide to the partner in return.">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-900 cursor-pointer" />
                  </TooltipSimple>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Can introduce D2C brands / Provide recurring referrals"
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white text-sm rounded-[2px] font-mono outline-hidden"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-2.5">
                  <Checkbox
                    id="desktop_hide_company"
                    checked={hideCompanyName}
                    onCheckedChange={(checked) => setHideCompanyName(!!checked)}
                    disabled={promote}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor="desktop_hide_company"
                    className={`text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer select-none ${
                      promote ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                    }`}
                  >
                    Post anonymously (Hide company name from public feed)
                  </label>
                </div>

                <div
                  className={`p-3.5 border rounded-[2px] transition-all flex items-start space-x-3 ${
                    hideCompanyName
                      ? "bg-slate-50 border-slate-200/60 opacity-60 cursor-not-allowed"
                      : promote
                        ? "bg-amber-50/50 border-amber-200"
                        : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Checkbox
                    id="desktop_promote"
                    checked={promote}
                    onCheckedChange={(checked) => setPromote(!!checked)}
                    disabled={hideCompanyName}
                    className="mt-1 cursor-pointer"
                  />
                  <div className="space-y-0.5">
                    <label
                      htmlFor="desktop_promote"
                      className={`text-xs font-mono font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 select-none ${
                        hideCompanyName ? "text-slate-400 cursor-not-allowed" : "text-slate-900"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Promote this Opportunity across the Relay Network
                    </label>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Featured placement at top of feed and included in email digests to verified operators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Submission Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !isApproved}
                className="bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest px-8 py-3 rounded-[2px] font-bold transition-all shadow-sm hover:shadow disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting Brief...
                  </>
                ) : (
                  "Submit Opportunity Brief"
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Real-time Opportunity Feed Preview & Standards (Col 5 / 4) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5 sticky top-24">
            {/* Live Card Preview */}
            <div className="bg-white border border-slate-200/80 rounded-[2px] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-slate-400 font-bold">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  Live Feed Preview
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-[2px]">
                  #DRAFT
                </span>
              </div>

              {/* Card visual mock identical to Relay board card */}
              <div className={`p-4 border rounded-[2px] space-y-3 transition-all ${
                promote
                  ? "bg-slate-950 text-white border-slate-900 shadow-md"
                  : "bg-white border-slate-200"
              }`}>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider rounded-[2px] ${
                      promote ? "bg-orange-500/20 text-orange-400" : "bg-slate-100 text-slate-700"
                    }`}>
                      {selectedCategoryObj?.label || "Partnership"}
                    </span>
                    {promote && (
                      <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider rounded-[2px] bg-gradient-to-r from-orange-600 to-amber-500 text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <span className={`font-mono text-[8.5px] uppercase tracking-widest flex items-center gap-1 ${
                    promote ? "text-slate-400" : "text-slate-400"
                  }`}>
                    <Calendar className="w-3 h-3" />
                    Today
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h4 className={`font-display text-sm sm:text-base font-bold leading-snug ${
                    promote ? "text-white" : "text-slate-900"
                  }`}>
                    {title.trim() || "Your Opportunity Title will appear here..."}
                  </h4>
                </div>

                {/* Description snippet */}
                <div>
                  <p className={`text-xs leading-relaxed line-clamp-3 font-sans ${
                    promote ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {description.trim() || "Detailed brief description, requirements, scope of work, and timelines will be displayed to matching operators in this section."}
                  </p>
                </div>

                {/* Meta details footer */}
                <div className={`pt-2.5 border-t font-mono text-[9px] flex items-center justify-between gap-2 flex-wrap ${
                  promote ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"
                }`}>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">
                      {hideCompanyName ? "🔒 Confidential" : (business?.company_name || "Your Company")}
                    </span>
                    <span>• {industry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span>{location.trim() || "Remote / Global"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Opportunity Protocol & Standards Card */}
            <div className="bg-white border border-slate-200/80 rounded-[2px] shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-2 text-[9.5px] font-mono uppercase tracking-widest text-slate-500 font-bold border-b border-slate-100 pb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Relay Exchange Protocol
              </div>
              <ul className="space-y-2 text-xs font-sans text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Collaboration focus:</strong> State what partner you seek, not just what you sell.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Double Opt-In:</strong> Both parties must agree before direct contact details are unlocked.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Manual review:</strong> Briefs are vetted by operators before being distributed to feed.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>

      {/* Offer Detection Pre-Submission Warning Modal */}
      <OfferDetectionWarningDialog
        open={warningOpen}
        onOpenChange={setWarningOpen}
        onEditOpportunity={() => setWarningOpen(false)}
        onSwitchToOffer={() => {
          setWarningOpen(false);
          onSwitchToOffer(title, description);
        }}
        onProceedAnyway={() => {
          setWarningOpen(false);
          executeSubmit();
        }}
      />
    </div>
  );
}
