import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "@/components/ui/sonner";
import {
  Info,
  Tag,
  Briefcase,
  Layers,
  Globe,
  Link as LinkIcon,
  Users,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  Megaphone,
  AlertTriangle,
  Eye,
  ExternalLink,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipSimple } from "@/components/ui/tooltip";

const OFFER_TYPES = [
  "Software / SaaS",
  "Consulting & Services",
  "Agency & Creative",
  "Product & Hardware",
  "Data & Analytics",
  "Training & Coaching",
  "Other",
] as const;

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

interface OfferFormFlowProps {
  initialTitle?: string;
  initialDescription?: string;
  onBack: () => void;
}

export function OfferFormFlow({
  initialTitle = "",
  initialDescription = "",
  onBack,
}: OfferFormFlowProps) {
  const [title, setTitle] = useState(initialTitle);
  const [offerType, setOfferType] = useState<string>("Software / SaaS");
  const [industry, setIndustry] = useState<string>("SaaS");
  const [description, setDescription] = useState(initialDescription);
  const [targetAudience, setTargetAudience] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Offer title is required");
      return;
    }

    if (description.trim().length < 30) {
      toast.error(
        `Description must be at least 30 characters. Currently: ${description.trim().length}`
      );
      return;
    }

    try {
      setSubmitting(true);
      await new Promise((res) => setTimeout(res, 600));

      const storedOffers = JSON.parse(
        localStorage.getItem("relay.user_offers.v1") || "[]"
      );
      const newOffer = {
        id: `offer_${Date.now()}`,
        title: title.trim(),
        offerType,
        industry,
        description: description.trim(),
        targetAudience: targetAudience.trim() || null,
        location: location.trim() || "Global",
        website: website.trim() || null,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "relay.user_offers.v1",
        JSON.stringify([newOffer, ...storedOffers])
      );

      setSubmitted(true);
      toast.success("Offer submitted successfully");
    } catch (err: any) {
      toast.error("Failed to submit offer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 md:py-20 text-center">
        <div className="p-8 bg-white border border-slate-200 rounded-[2px] shadow-sm space-y-6">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-[2px] font-bold">
              Offer Recorded
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-950">
              Offer Published
            </h2>
            <p className="text-slate-600 text-xs md:text-sm max-w-md mx-auto leading-relaxed font-sans">
              Your offer has been recorded. As Relay expands our Offer catalog, we will notify relevant operators looking for this product or service.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-[2px] text-left text-xs font-mono space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Listing Title</div>
            <div className="text-slate-900 font-bold text-sm">{title}</div>
            <div className="text-slate-500 text-[11px] pt-1">
              Category: <span className="text-slate-700">{offerType}</span> • Industry: <span className="text-slate-700">{industry}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/opportunities"
              className="w-full sm:w-auto bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest px-6 py-2.5 rounded-[2px] font-bold transition-all shadow-sm"
            >
              Explore Opportunity Feed
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setTitle("");
                setDescription("");
                setTargetAudience("");
                setLocation("");
                setWebsite("");
              }}
              className="w-full sm:w-auto border border-slate-300 hover:border-slate-800 text-slate-700 text-[10px] font-mono uppercase tracking-widest px-6 py-2.5 rounded-[2px] font-bold transition-all"
            >
              Post Another Offer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Bar: Back button */}
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
          Product & Service Offer
        </span>
      </div>

      {/* Warning-styled Informational Banner spanning full desktop width */}
      <div className="p-4 sm:p-5 bg-amber-50 border border-amber-300/80 rounded-[2px] flex items-start gap-3.5 shadow-xs">
        <div className="w-8 h-8 rounded-[2px] bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="space-y-1 font-sans text-left">
          <h3 className="font-display text-sm font-bold uppercase tracking-tight text-amber-950">
            You&apos;re posting an Offer
          </h3>
          <p className="text-amber-800 text-xs sm:text-[12.5px] leading-relaxed font-sans">
            Offers are for promoting products or services your business provides. Relay&apos;s main focus is business opportunities, so Offers may receive different responses than Opportunity posts.
          </p>
        </div>
      </div>

      {/* 2-Column Responsive Layout covering desktop max-w-7xl */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Offer Form (Col 7 / 8) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200 rounded-[2px] shadow-xs p-6 sm:p-8">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2 text-[9.5px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
              <Megaphone className="w-3.5 h-3.5 text-slate-600" />
              Promotional Listing
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-slate-900">
              Create Business Offer
            </h1>
            <p className="text-slate-500 text-xs leading-relaxed font-sans mt-1">
              Promote your product, software, agency service, or professional solution to businesses on Relay.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Offer Title */}
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Offer Title *
                <TooltipSimple content="State what product or service you provide (e.g. 'Lead Execution System (no CRM)').">
                  <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                </TooltipSimple>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lead Execution System (no CRM) / Full-Stack Next.js Consulting"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Offer Type */}
              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  Offer Type *
                </label>
                <Select value={offerType} onValueChange={setOfferType}>
                  <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm rounded-[2px] font-mono">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {OFFER_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Industry */}
              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  Target Industry *
                </label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary text-sm rounded-[2px] font-mono">
                    <SelectValue placeholder="Select industry" />
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

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  What You Provide / Pitch *
                </span>
                <span className="text-[9px] text-slate-400 font-mono">
                  {description.length} / 30 min chars
                </span>
              </label>
              <textarea
                required
                rows={4}
                maxLength={3000}
                placeholder="Describe what your product or service delivers, key features, pricing model, or client deliverables in detail."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-border bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm rounded-[2px] font-mono resize-y outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Target Audience */}
              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Ideal Customers (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Seed to Series-A B2B SaaS, D2C Founders"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary transition-all text-sm rounded-[2px] font-mono outline-hidden"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Location / Coverage (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Global, US Only, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary transition-all text-sm rounded-[2px] font-mono outline-hidden"
                />
              </div>
            </div>

            {/* Website / Contact Link */}
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                Website or Demo Link (Optional)
              </label>
              <input
                type="url"
                placeholder="https://yourproduct.com/demo"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full h-11 px-3 border border-border bg-slate-50 focus:bg-white focus:border-primary transition-all text-sm rounded-[2px] font-mono outline-hidden"
              />
            </div>

            {/* Submission button */}
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
                disabled={submitting}
                className="bg-slate-900 hover:bg-primary text-white text-[10px] font-mono uppercase tracking-widest px-8 py-3 rounded-[2px] font-bold transition-all shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting Offer...
                  </>
                ) : (
                  "Post Offer"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Sidebar: Real-time Offer Preview (Col 5 / 4) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 sticky top-24">
          {/* Live Offer Preview Card */}
          <div className="bg-white border border-slate-200/80 rounded-[2px] shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-slate-400 font-bold">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                Live Offer Preview
              </span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-[2px]">
                #OFFER
              </span>
            </div>

            <div className="p-4 border border-slate-200 rounded-[2px] bg-white space-y-3 shadow-xs">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider rounded-[2px] bg-slate-100 text-slate-700">
                  {offerType}
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-400">
                  Direct Listing
                </span>
              </div>

              <div>
                <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {title.trim() || "Offer Title will appear here..."}
                </h4>
              </div>

              <div>
                <p className="text-xs leading-relaxed line-clamp-3 font-sans text-slate-600">
                  {description.trim() || "Detailed description of what you provide, deliverables, or software capabilities will be displayed here."}
                </p>
              </div>

              {targetAudience && (
                <div className="text-[11px] font-sans text-slate-500 bg-slate-50 p-2 rounded-[2px] border border-slate-100">
                  <span className="font-semibold text-slate-700">Audience:</span> {targetAudience}
                </div>
              )}

              <div className="pt-2.5 border-t border-slate-100 font-mono text-[9px] flex items-center justify-between gap-2 text-slate-500 flex-wrap">
                <span>Industry: {industry}</span>
                {website ? (
                  <span className="inline-flex items-center gap-1 text-primary">
                    <ExternalLink className="w-3 h-3" /> Link Attached
                  </span>
                ) : (
                  <span>{location.trim() || "Global"}</span>
                )}
              </div>
            </div>
          </div>

          {/* About Offers Info Box */}
          <div className="bg-white border border-slate-200/80 rounded-[2px] shadow-xs p-5 space-y-3">
            <div className="flex items-center gap-2 text-[9.5px] font-mono uppercase tracking-widest text-slate-500 font-bold border-b border-slate-100 pb-2">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              About Promotional Offers
            </div>
            <p className="text-xs font-sans text-slate-600 leading-relaxed">
              Offers are cataloged for businesses actively exploring software, consulting, or services. Unlike Opportunity briefs, Offers allow operators to connect directly with your team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
