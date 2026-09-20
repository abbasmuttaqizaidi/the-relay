import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "@/components/ui/sonner";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Loader2,
  MapPin,
  Tag,
  AlertCircle,
  Eye,
  ShieldCheck,
  Globe,
  Building2,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/select";
import { Checkbox } from "@/design-system/checkbox";
import { Input, Textarea } from "@/design-system/inputs";
import { Button } from "@/design-system/button";
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
    label: "Vendor Sourcing",
    description: "Scaling pipeline & service provider requirements",
  },
  {
    value: "hiring",
    label: "Hiring & Talent",
    description: "Recruitment, specialized engineering talent",
  },
  {
    value: "strategic_advice",
    label: "Strategic Advisory",
    description: "Board positions, industry advisory, mentorship",
  },
  {
    value: "investment",
    label: "Investment",
    description: "Syndicates, strategic capital, coinvestment",
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

  // Unified Form State
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState<OpportunityCategory>("partnership");
  const [industry, setIndustry] = useState<string>(business?.industry || "SaaS");
  const [description, setDescription] = useState(initialDescription);
  const [location, setLocation] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [offerText, setOfferText] = useState("");
  const [hideCompanyName, setHideCompanyName] = useState(false);
  const [promote, setPromote] = useState(false);

  // Mobile Step State (1: Overview, 2: Scope & Context, 3: Terms & Privacy, 4: Review)
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
      try {
        window.dispatchEvent(new CustomEvent("relay:opportunity_created"));
      } catch (_) {}
      navigate({ to: "/my-relay", search: { tab: "listings" } });
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
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={onBack}
          className="gap-1.5 font-mono text-[11px] uppercase tracking-[0.04em] text-[#64748B] hover:text-[#171F2C] px-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#171F2C]" />
          <span>Change Listing Type</span>
        </Button>
        <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-[#64748B] font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#171F2C]" />
          <span>Bilateral Opportunity Protocol</span>
        </span>
      </div>

      {/* Account / Approval Guard Notice if not approved */}
      {!isApproved && (
        <div className="p-4 bg-[#FFFFFF] border border-[#171F2C] rounded-[4px] flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-[#171F2C] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-[#171F2C] font-sans">
            <span className="font-semibold uppercase tracking-[0.04em] font-mono text-[11px] block">
              Profile Verification Required
            </span>
            <p className="text-[#64748B] leading-relaxed font-sans text-xs">
              {!isSignedIn
                ? "You must sign in with an approved business profile to publish live opportunities to the bilateral network."
                : `Your business profile status is currently "${business?.status || "pending"}". Only approved operators can publish live marketplace listings.`}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          DESKTOP 2-COLUMN VIEW: FORM (LEFT) + LIVE PREVIEW (RIGHT)
          ========================================================================= */}
      <div className="hidden md:grid grid-cols-12 gap-8 items-start">
        {/* Form Column (Left 7 Cols) */}
        <div className="col-span-7 space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171F2C]">
              Post Opportunity Brief
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-sans">
              Specify your commercial requirement. Opportunities are blinded by default to protect proprietary identity until bilateral consent is established.
            </p>
          </div>

          <form onSubmit={handleInitiateSubmit} className="space-y-6">
            {/* Section 1: Overview & Categorization */}
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-6 space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#171F2C] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#171F2C]" />
                  01. Overview &amp; Type
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] font-medium">Required</span>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                  Opportunity Title *
                </label>
                <Input
                  focusAccent="black"
                  placeholder="e.g. Scaling enterprise pipeline: Seeking certified AWS DevOps co-seller"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <span className="text-[11px] text-[#64748B] font-sans block leading-tight">
                  Concise summary of the situation or counterparty capability you need.
                </span>
              </div>

              {/* Category & Industry */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Category *
                  </label>
                  <Select value={category} onValueChange={(val) => setCategory(val as OpportunityCategory)}>
                    <SelectTrigger focusAccent="black" className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label} ({c.description})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Industry Domain *
                  </label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger focusAccent="black" className="w-full">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
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

            {/* Section 2: Scope & Requirements */}
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-6 space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#171F2C] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#171F2C]" />
                  02. Commercial Context &amp; Scope
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] font-medium">50–3000 chars</span>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C]">
                    Brief Specification *
                  </label>
                  <span
                    className={`font-mono text-[11px] ${
                      description.trim().length >= 50 ? "text-[#171F2C] font-semibold" : "text-[#94A3B8]"
                    }`}
                  >
                    {description.trim().length} / 50 min
                  </span>
                </div>
                <Textarea
                  focusAccent="black"
                  rows={6}
                  maxLength={3000}
                  placeholder="Detail the background context, client requirements, commercial structure (e.g. rev share, fee split, referral terms), and ideal counterparty criteria..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Seeking in Exchange */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                  Seeking in Exchange (Optional Reciprocity)
                </label>
                <Input
                  focusAccent="black"
                  placeholder="e.g. 20% ongoing revenue share on signed contract, or reciprocal enterprise lead exchange"
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                />
                <span className="text-[11px] text-[#64748B] font-sans block leading-tight">
                  State what you are seeking or expecting from the counterparty in exchange.
                </span>
              </div>
            </div>

            {/* Section 3: Targeting, Expiry & Privacy */}
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-6 space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#171F2C] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#171F2C]" />
                  03. Parameters &amp; Discretion Settings
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] font-medium">Controls</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Target Geography
                  </label>
                  <Input
                    focusAccent="black"
                    placeholder="e.g. Global, North America, India, Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Listing Expiry
                  </label>
                  <Select value={expiryDays} onValueChange={setExpiryDays}>
                    <SelectTrigger focusAccent="black" className="w-full">
                      <SelectValue placeholder="Select Expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Days</SelectItem>
                      <SelectItem value="30">30 Days (Standard)</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="never">Never (Persistent)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Privacy Checkboxes */}
              <div className="pt-3 border-t border-[#E2E8F0] space-y-3">
                <label className="flex items-start gap-3 p-3.5 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] cursor-pointer hover:border-[#171F2C] transition-colors">
                  <Checkbox
                    checked={hideCompanyName}
                    onCheckedChange={(checked) => setHideCompanyName(!!checked)}
                    accent="black"
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5 text-xs">
                    <span className="font-semibold text-[#171F2C] font-mono text-[11px] block">
                      Blinded Listing (Mask Business Name)
                    </span>
                    <p className="text-[#64748B] leading-relaxed font-sans text-xs">
                      Displays your business as a verified anonymous peer until bilateral consent is exchanged.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] cursor-pointer hover:border-[#171F2C] transition-colors">
                  <Checkbox
                    checked={promote}
                    onCheckedChange={(checked) => {
                      if (checked) setHideCompanyName(false);
                      setPromote(!!checked);
                    }}
                    accent="black"
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5 text-xs">
                    <span className="font-semibold text-[#171F2C] font-mono text-[11px] block flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#171F2C]" />
                      Promote Listing Across Verified Feed
                    </span>
                    <p className="text-[#64748B] leading-relaxed font-sans text-xs">
                      Pins listing to top of discovery board. Requires unmasked company identity.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={onBack}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                variant="authoritative"
                type="submit"
                disabled={submitting}
                className="gap-2 px-6"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Publishing Opportunity...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Opportunity</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Live Preview Column (Right 5 Cols Sticky) */}
        <div className="col-span-5 sticky top-20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#64748B] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#171F2C]" />
              Live Marketplace Preview
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] px-2 py-0.5 rounded-[4px] bg-[#FFFFFF] text-[#171F2C] border border-[#E2E8F0]">
              {hideCompanyName ? "Masked Mode" : "Public Mode"}
            </span>
          </div>

          {/* Live Preview Card */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-5 space-y-4">
            {/* Top Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0]">
                  {selectedCategoryObj?.label || "Partnership"}
                </span>
                <span className="text-[11px] font-mono font-medium text-[#64748B]">
                  {industry}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#94A3B8]">
                Just Now
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="font-display text-base font-bold text-[#171F2C] line-clamp-2">
                {title.trim() || "Your Opportunity Headline Will Appear Here..."}
              </h3>
            </div>

            {/* Description Preview */}
            <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed font-sans">
              {description.trim() ||
                "As you type your description, a live simulation of how operators will see your deal card in the bilateral marketplace is displayed here."}
            </p>

            {/* Seeking in exchange tag if set */}
            {offerText.trim() && (
              <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.04em] text-[#94A3B8] block mb-0.5">
                  Seeking in Exchange
                </span>
                <p className="text-[#171F2C] font-sans line-clamp-1">{offerText}</p>
              </div>
            )}

            {/* Footer Row */}
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-[#171F2C] font-semibold">
                <Building2 className="w-3.5 h-3.5 text-[#171F2C]" />
                <span>{hideCompanyName ? "Verified Operator" : business?.company_name || "Your Company"}</span>
              </div>
              <span className="text-[#64748B] flex items-center gap-1 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#171F2C]" />
                {location.trim() || "Global"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-[4px] bg-[#FFFFFF] border border-[#E2E8F0] text-xs text-[#64748B] space-y-1.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#171F2C] block flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#171F2C]" />
              CDOES Bilateral Shield
            </span>
            <p className="leading-relaxed font-sans">
              Counterparties cannot message, pitch, or reveal identities without mutual consent through the 8-step protocol.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE 4-STEP WIZARD (Visible on mobile < md)
          ========================================================================= */}
      <div className="block md:hidden space-y-5">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold tracking-tight text-[#171F2C]">
            Post Opportunity
          </h1>
          <p className="text-[#64748B] text-xs leading-relaxed font-sans">
            Specify your requirements in 4 streamlined steps.
          </p>
        </div>

        {/* Progress Bar & Header */}
        <div className="space-y-2 bg-[#FFFFFF] p-4 border border-[#E2E8F0] rounded-[4px]">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.04em] font-semibold">
            <span className="text-[#171F2C]">Step {mobileStep} of 4</span>
            <span className="text-[#64748B]">
              {mobileStep === 1 && "Overview"}
              {mobileStep === 2 && "Scope & Context"}
              {mobileStep === 3 && "Settings & Privacy"}
              {mobileStep === 4 && "Review & Submit"}
            </span>
          </div>
          <div className="w-full bg-[#F8FAFC] h-1.5 rounded-[2px] overflow-hidden border border-[#E2E8F0]">
            <div
              className="bg-[#171F2C] h-full transition-all duration-200"
              style={{ width: `${(mobileStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Overview */}
        {mobileStep === 1 && (
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                Opportunity Title *
              </label>
              <Input
                focusAccent="black"
                placeholder="e.g. Scaling enterprise pipeline: Seeking certified AWS DevOps co-seller"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                Exchange Category *
              </label>
              <Select value={category} onValueChange={(val) => setCategory(val as OpportunityCategory)}>
                <SelectTrigger focusAccent="black" className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
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

        {/* STEP 2: Scope & Context */}
        {mobileStep === 2 && (
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                Industry Domain *
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger focusAccent="black" className="w-full">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C]">
                  Brief Specification *
                </label>
                <span
                  className={`font-mono text-[11px] ${
                    description.trim().length >= 50 ? "text-[#171F2C] font-semibold" : "text-[#94A3B8]"
                  }`}
                >
                  {description.trim().length} / 50 min
                </span>
              </div>
              <Textarea
                focusAccent="black"
                rows={5}
                maxLength={3000}
                placeholder="Describe your request in detail. Provide background context, scope, timeline, and expectations (min 50 chars)."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: Settings & Privacy */}
        {mobileStep === 3 && (
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                Target Geography
              </label>
              <Input
                focusAccent="black"
                placeholder="e.g. India, USA, Global, Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                Listing Expiry
              </label>
              <Select value={expiryDays} onValueChange={setExpiryDays}>
                <SelectTrigger focusAccent="black" className="w-full">
                  <SelectValue placeholder="Select Expiry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] space-y-2.5">
              <label className="flex items-start gap-3 p-3 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC]">
                <Checkbox
                  checked={hideCompanyName}
                  onCheckedChange={(checked) => setHideCompanyName(!!checked)}
                  accent="black"
                  className="mt-0.5"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="font-semibold text-[#171F2C] font-mono text-[11px] block">
                    Blinded Listing (Mask Name)
                  </span>
                  <p className="text-[#64748B] font-sans text-xs">
                    Shield identity until bilateral mutual consent.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {mobileStep === 4 && (
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-5 space-y-4">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#64748B] block border-b border-[#E2E8F0] pb-2">
              Summary Confirmation
            </span>

            <div className="space-y-2">
              <h3 className="font-display text-base font-bold text-[#171F2C]">
                {title}
              </h3>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E2E8F0] text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0]">
                {selectedCategoryObj?.label}
              </span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0]">
                {industry}
              </span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0]">
                {location || "Global"}
              </span>
            </div>
          </div>
        )}

        {/* Mobile Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <Button
            variant="outline"
            type="button"
            onClick={handleMobilePrev}
            className="flex-1"
          >
            {mobileStep === 1 ? "Change Type" : "Back"}
          </Button>

          {mobileStep < 4 ? (
            <Button
              variant="authoritative"
              type="button"
              onClick={handleMobileNext}
              className="flex-1"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4 ml-1 text-white" />
            </Button>
          ) : (
            <Button
              variant="authoritative"
              type="button"
              onClick={handleInitiateSubmit}
              disabled={submitting}
              className="flex-1"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Publish</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-white" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Offer Warning Modal */}
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
