import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "@/components/ui/sonner";
import {
  Tag,
  Layers,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Megaphone,
  Eye,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/select";
import { Input, Textarea } from "@/design-system/inputs";
import { Button } from "@/design-system/button";

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
      <div className="w-full max-w-2xl mx-auto px-4 py-12 md:py-16 text-center font-sans">
        <div className="p-8 md:p-10 bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] space-y-6">
          <div className="w-12 h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] flex items-center justify-center text-[#171F2C] mx-auto">
            <CheckCircle2 className="w-6 h-6 text-[#171F2C]" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.04em] px-2.5 py-0.5 bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0] rounded-[4px] font-semibold">
              Offer Published to Catalog
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#171F2C]">
              Listing Indexed
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-sans">
              Your capability listing has been indexed. The Relay automatically routes relevant inbound inquiries when operators post matching commercial opportunities.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="authoritative"
              onClick={() => {
                setTitle("");
                setDescription("");
                setTargetAudience("");
                setWebsite("");
                setSubmitted(false);
              }}
              className="w-full sm:w-auto"
            >
              <span>Post Another Offer</span>
              <ArrowRight className="w-4 h-4 ml-1.5 text-white" />
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link to="/opportunities">
                <span>Explore Opportunities</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Bar: Back Button */}
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
          <Megaphone className="w-3.5 h-3.5 text-[#171F2C]" />
          <span>Product &amp; Service Catalog</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form Column (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171F2C]">
              Post Product / Service Offer
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-sans">
              Publish your capabilities, software, or delivery services to be matched with operator requirements across the network.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Offer Specification */}
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-6 space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#171F2C] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#171F2C]" />
                  01. Offer Headline &amp; Type
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] font-medium">Required</span>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                  Offer Title *
                </label>
                <Input
                  focusAccent="black"
                  placeholder="e.g. Enterprise SOC-2 Compliance Automation Platform for SaaS"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Type & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Offer Format *
                  </label>
                  <Select value={offerType} onValueChange={setOfferType}>
                    <SelectTrigger focusAccent="black" className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {OFFER_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Target Industry *
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

            {/* Section 2: Capability Details */}
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-6 space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#171F2C] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#171F2C]" />
                  02. Capability Description &amp; Scope
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] font-medium">Min 30 chars</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C]">
                    Offer Description *
                  </label>
                  <span
                    className={`font-mono text-[11px] ${
                      description.trim().length >= 30 ? "text-[#171F2C] font-semibold" : "text-[#94A3B8]"
                    }`}
                  >
                    {description.trim().length} / 30 min
                  </span>
                </div>
                <Textarea
                  focusAccent="black"
                  rows={5}
                  placeholder="Detail your product or service specifications, pricing tiers, integration requirements, and primary business value delivered..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Ideal ICP / Target Buyer
                  </label>
                  <Input
                    focusAccent="black"
                    placeholder="e.g. Series A SaaS CTOs, Agency Founders"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                    Service Geography
                  </label>
                  <Input
                    focusAccent="black"
                    placeholder="e.g. Global, US/Canada, APAC"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] text-[#171F2C] block">
                  Product URL / Deck Link (Optional)
                </label>
                <Input
                  focusAccent="black"
                  type="url"
                  placeholder="https://yourcompany.com/product"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
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
                    <span>Publishing Offer...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Offer</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Live Preview Column (5 cols) */}
        <div className="md:col-span-5 sticky top-20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#64748B] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#171F2C]" />
              Live Catalog Preview
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">
              Direct Offer
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[4px] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.04em] px-2 py-0.5 rounded-[4px] bg-[#F8FAFC] text-[#171F2C] border border-[#E2E8F0]">
                  {offerType}
                </span>
                <span className="text-[11px] font-mono font-medium text-[#64748B]">
                  {industry}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#94A3B8]">
                Direct
              </span>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-[#171F2C] line-clamp-2">
                {title.trim() || "Your Offer Title Will Appear Here..."}
              </h3>
            </div>

            <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed font-sans">
              {description.trim() ||
                "Live simulation of how peer operators will view your product or service offering across the catalog."}
            </p>

            {targetAudience.trim() && (
              <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.04em] text-[#94A3B8] block mb-0.5">
                  Target ICP
                </span>
                <p className="text-[#171F2C] font-sans line-clamp-1">{targetAudience}</p>
              </div>
            )}

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#64748B] font-medium">Catalog Indexed</span>
              <span className="text-[#64748B] flex items-center gap-1 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#171F2C]" />
                {location.trim() || "Global"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
