import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "@/components/ui/sonner";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Highlighter,
  Check,
  Bookmark,
  Lock,
  EyeOff,
  Sparkles,
  CheckCircle2,
  FileText,
  Shield,
  Clock,
  Briefcase,
  ChevronDown,
  Info,
} from "lucide-react";
import { Button } from "@/design-system/button";
import { Input, Label } from "@/design-system/inputs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/select";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import { createOpportunity } from "@/functions/createOpportunity";
import { updateOpportunity } from "@/functions/updateOpportunity";
import { getOpportunityById } from "@/functions/getOpportunityById";
import { detectPostIntent } from "@/lib/offer-detector";
import { OfferDetectionWarningDialog } from "./OfferDetectionWarningDialog";
import { cn } from "@/lib/utils";

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
}[] = [
  { value: "partnership", label: "Partnerships" },
  { value: "referral", label: "Referral" },
  { value: "hiring", label: "Hiring & Talent" },
  { value: "distribution", label: "Distribution & Channels" },
  { value: "vendor", label: "Vendors & Services" },
  { value: "strategic_advice", label: "Strategic Advice" },
  { value: "investment", label: "Investment" },
];

const INDUSTRIES = [
  "SaaS & Software",
  "Marketing & Digital Agency",
  "Financial Services & FinTech",
  "Healthcare & HealthTech",
  "Cloud Infrastructure & DevOps",
  "Supply Chain & Logistics",
  "Professional Services & Consulting",
  "AI & Machine Learning",
  "E-Commerce & Retail",
  "Cybersecurity & Compliance",
  "Other",
] as const;

const VALUE_TYPES = [
  "Distribution & Channel Access",
  "Revenue Share / Commission (%)",
  "Warm Executive Client Introductions",
  "Co-Selling & Joint Bids",
  "Specialized Services & Barter",
  "Technology Integration & API",
  "Strategic Advisory & Board Seat",
  "Capital / Co-Investment",
  "Other",
];

const DELIVERY_METHODS = [
  "Direct Reseller / Partner",
  "Co-Selling Together",
  "Warm Client Handoff",
  "Commission Agreement",
  "Milestone-based SLA Delivery",
  "Dedicated Integration Sprint",
  "Executive Intro Call",
  "Custom Terms",
  "Other",
];

const TIMELINE_OPTIONS = [
  "Immediate (within 14 days)",
  "Standard Q1/Q2 Deployment",
  "Flexible / Rolling Horizon",
];

const EXPIRY_OPTIONS = [
  { label: "30 Days (Standard Horizon)", value: "30" },
  { label: "14 Days (Urgent Clearance)", value: "14" },
  { label: "60 Days (Extended Horizon)", value: "60" },
  { label: "Never (No Expiration)", value: "never" },
];

interface OpportunityFormFlowProps {
  business: any;
  isSignedIn: boolean;
  isLoadingBusiness?: boolean;
  initialTitle?: string;
  initialDescription?: string;
  editId?: string;
  onBack: () => void;
  onSwitchToOffer: (title: string, description: string) => void;
}

export function OpportunityFormFlow({
  business,
  isSignedIn,
  isLoadingBusiness = false,
  initialTitle = "",
  initialDescription = "",
  editId,
  onBack,
  onSwitchToOffer,
}: OpportunityFormFlowProps) {
  const navigate = useNavigate();

  // Core Form State
  const [title, setTitle] = useState(initialTitle || "");
  const [category, setCategory] = useState<OpportunityCategory>("distribution");
  const [industry, setIndustry] = useState<string>(
    business?.industry || INDUSTRIES[0],
  );
  const [counterpartyProfile, setCounterpartyProfile] = useState("");
  const [timeline, setTimeline] = useState("Immediate (within 14 days)");
  const [valueType, setValueType] = useState("Distribution & Channel Access");
  const [deliveryMethod, setDeliveryMethod] = useState("Direct Reseller / Partner");
  const [expiryDays, setExpiryDays] = useState("30");
  const [location, setLocation] = useState(business?.hq_location || "Remote / Global");

  // Sync default industry & location once business profile loads from cache
  useEffect(() => {
    if (business?.industry && !industry) {
      setIndustry(business.industry);
    }
    if (business?.hq_location && (!location || location === "Remote / Global")) {
      setLocation(business.hq_location);
    }
  }, [business]);

  // Privacy & Listing Promotion Toggles
  const [hideCompanyName, setHideCompanyName] = useState(false);
  const [promote, setPromote] = useState(false);

  // Submitting and Warnings
  const [submitting, setSubmitting] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [loadingOpp, setLoadingOpp] = useState(Boolean(editId));
  const [oppNumber, setOppNumber] = useState<number | string>("");

  // Rich text editors
  const scopeEditorRef = useRef<HTMLDivElement | null>(null);
  const termsEditorRef = useRef<HTMLDivElement | null>(null);

  // Live preview HTML state (synced with editors)
  const [scopeHtml, setScopeHtml] = useState(initialDescription || "");
  const [termsHtml, setTermsHtml] = useState("");

  // Contextual Floating Toolbar for Highlighting
  const [activeEditor, setActiveEditor] = useState<"scope" | "terms" | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [isSelectionHighlighted, setIsSelectionHighlighted] = useState(false);

  // Fetch opportunity data if editId is present
  useEffect(() => {
    if (!editId) return;
    let mounted = true;

    async function loadOpportunity() {
      try {
        setLoadingOpp(true);
        const data = await getOpportunityById({ data: { opportunity_id: editId! } });
        if (mounted && data) {
          setTitle(data.title || "");
          if (data.category) setCategory(data.category as any);
          if (data.industry) setIndustry(data.industry);
          if (data.location) setLocation(data.location);
          if (data.hide_company_name !== undefined) setHideCompanyName(Boolean(data.hide_company_name));
          if (data.promotion_status) setPromote(data.promotion_status === "pending_promotion" || data.promotion_status === "promoted");
          if (data.opportunity_number) setOppNumber(data.opportunity_number);

          const desc = data.description || "";
          setScopeHtml(desc);
          if (scopeEditorRef.current) {
            scopeEditorRef.current.innerHTML = desc;
          }

          const offer = data.offer_text || "";
          const match = offer.match(/^([^(]+)\s*\(([^)]+)\)\s*—\s*(.*)$/s);
          if (match) {
            const valType = match[1].trim();
            const delMethod = match[2].trim();
            const terms = match[3].trim();
            if (VALUE_TYPES.includes(valType)) setValueType(valType);
            if (DELIVERY_METHODS.includes(delMethod)) setDeliveryMethod(delMethod);
            setTermsHtml(terms);
            if (termsEditorRef.current) termsEditorRef.current.innerHTML = terms;
          } else {
            setTermsHtml(offer);
            if (termsEditorRef.current) termsEditorRef.current.innerHTML = offer;
          }
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to load opportunity for editing");
      } finally {
        if (mounted) {
          setLoadingOpp(false);
        }
      }
    }

    loadOpportunity();
    return () => {
      mounted = false;
    };
  }, [editId]);

  // Initialize editor contents on mount (only if not editId)
  useEffect(() => {
    if (editId) return;

    // Try to load draft from localStorage if present
    try {
      const savedDraft = localStorage.getItem("relay_opportunity_draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.category) setCategory(parsed.category);
        if (parsed.industry) setIndustry(parsed.industry);
        if (parsed.counterpartyProfile) setCounterpartyProfile(parsed.counterpartyProfile);
        if (parsed.timeline) setTimeline(parsed.timeline);
        if (parsed.valueType) setValueType(parsed.valueType);
        if (parsed.deliveryMethod) setDeliveryMethod(parsed.deliveryMethod);
        if (parsed.expiryDays) setExpiryDays(parsed.expiryDays);
        if (parsed.hideCompanyName !== undefined) setHideCompanyName(parsed.hideCompanyName);
        if (parsed.promote !== undefined) setPromote(parsed.promote);

        if (scopeEditorRef.current) {
          scopeEditorRef.current.innerHTML = parsed.scopeHtml || "";
          setScopeHtml(scopeEditorRef.current.innerHTML);
        }
        if (termsEditorRef.current) {
          termsEditorRef.current.innerHTML = parsed.termsHtml || "";
          setTermsHtml(termsEditorRef.current.innerHTML);
        }
        return;
      }
    } catch (_) {}

    // Clean defaults
    if (scopeEditorRef.current) {
      scopeEditorRef.current.innerHTML = initialDescription || "";
      setScopeHtml(scopeEditorRef.current.innerHTML);
    }
    if (termsEditorRef.current) {
      termsEditorRef.current.innerHTML = "";
      setTermsHtml("");
    }
  }, [initialDescription, editId]);

  // Sync editor innerHTML to preview on input
  const handleScopeInput = () => {
    if (scopeEditorRef.current) {
      setScopeHtml(scopeEditorRef.current.innerHTML);
    }
  };

  const handleTermsInput = () => {
    if (termsEditorRef.current) {
      setTermsHtml(termsEditorRef.current.innerHTML);
    }
  };

  // Selection change listener for contextual highlighting toolbar
  const checkSelection = useCallback((editorType: "scope" | "terms") => {
    const editor = editorType === "scope" ? scopeEditorRef.current : termsEditorRef.current;
    if (!editor) {
      setShowToolbar(false);
      return;
    }

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      setShowToolbar(false);
      return;
    }

    const range = sel.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) {
      setShowToolbar(false);
      return;
    }

    const rect = range.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      setShowToolbar(false);
      return;
    }

    // Check if selection is currently visible within the viewport
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      setShowToolbar(false);
      return;
    }

    // Check if the selected text contains or is inside a <mark>
    const parentMark = range.startContainer.parentElement?.closest("mark");
    const isMarked = !!parentMark && editor.contains(parentMark);

    setIsSelectionHighlighted(isMarked);
    setActiveEditor(editorType);
    setToolbarPos({
      left: Math.max(90, Math.min(rect.left + rect.width / 2, window.innerWidth - 90)),
      top: rect.top - 8,
    });
    setShowToolbar(true);
  }, []);

  // Listen for selection collapse across the document & dynamic position tracking on scroll/resize
  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        setShowToolbar(false);
      }
    };

    const handleScrollOrResize = () => {
      if (activeEditor) {
        checkSelection(activeEditor);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    window.addEventListener("scroll", handleScrollOrResize, { capture: true, passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      window.removeEventListener("scroll", handleScrollOrResize, { capture: true });
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [activeEditor, checkSelection]);

  const handleEditorMouseUp = (editorType: "scope" | "terms") => {
    setTimeout(() => checkSelection(editorType), 10);
  };

  const handleEditorKeyUp = (editorType: "scope" | "terms") => {
    setTimeout(() => checkSelection(editorType), 10);
  };

  // Toggle Highlight Action
  const handleToggleHighlight = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!activeEditor) return;
    const editor = activeEditor === "scope" ? scopeEditorRef.current : termsEditorRef.current;
    if (!editor) return;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      setShowToolbar(false);
      return;
    }

    const range = sel.getRangeAt(0);
    const existingMark = range.startContainer.parentElement?.closest("mark");

    if (existingMark && editor.contains(existingMark)) {
      // Unhighlight
      const parent = existingMark.parentNode;
      while (existingMark.firstChild) {
        parent?.insertBefore(existingMark.firstChild, existingMark);
      }
      parent?.removeChild(existingMark);
    } else {
      // Highlight in amber
      const mark = document.createElement("mark");
      mark.className =
        "bg-amber-100 text-amber-950 font-semibold px-1.5 py-0.5 rounded border border-amber-300/80 cursor-pointer";
      mark.title = "Key Covenant Term";
      try {
        range.surroundContents(mark);
      } catch {
        const wrapper = document.createElement("span");
        wrapper.appendChild(range.cloneContents());
        mark.innerHTML = wrapper.innerHTML;
        range.deleteContents();
        range.insertNode(mark);
      }
    }

    sel.removeAllRanges();
    setShowToolbar(false);
    handleScopeInput();
    handleTermsInput();
  };

  // Save Draft
  const handleSaveDraft = () => {
    try {
      const draft = {
        title,
        category,
        industry,
        counterpartyProfile,
        timeline,
        valueType,
        deliveryMethod,
        expiryDays,
        hideCompanyName,
        promote,
        scopeHtml: scopeEditorRef.current?.innerHTML || "",
        termsHtml: termsEditorRef.current?.innerHTML || "",
      };
      localStorage.setItem("relay_opportunity_draft", JSON.stringify(draft));
      toast.success("Opportunity draft saved locally.");
    } catch (_) {
      toast.error("Failed to save draft.");
    }
  };

  // Validation
  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Opportunity Title is required");
      return false;
    }

    const scopeText = scopeEditorRef.current?.innerText.trim() || "";
    if (scopeText.length < 50 || scopeText.length > 3000) {
      toast.error(
        `Description must be between 50 and 3000 characters. Currently: ${scopeText.length}`,
      );
      return false;
    }

    const termsText = termsEditorRef.current?.innerText.trim() || "";
    if (!termsText) {
      toast.error("Proposed Value and Terms are required.");
      return false;
    }

    if (promote && hideCompanyName) {
      toast.error(
        "Promoted opportunities cannot be confidential. Please disable either 'Post Anonymously' or 'Promote Listing'.",
      );
      return false;
    }

    return true;
  };

  // Initiation & Intent Classification
  const handleInitiateSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    const scopeText = scopeEditorRef.current?.innerText.trim() || "";
    const detection = detectPostIntent(title, scopeText, category);
    if (detection.intent === "OFFER") {
      setWarningOpen(true);
      return;
    }

    executeSubmit();
  };

  // Execute Submission
  const executeSubmit = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to publish an opportunity.");
      return;
    }

    if (!business || business.status !== "approved") {
      toast.error(
        `Forbidden: Your business profile status is "${business?.status || "pending"}". Only approved businesses can create opportunities.`,
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

      const scopeText = scopeEditorRef.current?.innerText.trim() || "";
      const termsText = termsEditorRef.current?.innerText.trim() || "";

      if (editId) {
        await updateOpportunity({
          data: {
            opportunity_id: editId,
            title: title.trim(),
            category,
            industry,
            description: scopeText,
            location: location.trim() || null,
            offer_text: `${valueType} (${deliveryMethod}) — ${termsText}`,
            expires_at,
            hide_company_name: hideCompanyName,
            promote,
          },
        });

        toast.success("Opportunity Updated Successfully");
        try {
          window.dispatchEvent(new CustomEvent("relay:opportunity_created"));
        } catch (_) {}
        navigate({ to: "/opportunities/my", search: { tab: "posted" } as any });
      } else {
        await createOpportunity({
          data: {
            title: title.trim(),
            category,
            industry,
            description: scopeText,
            location: location.trim() || null,
            offer_text: `${valueType} (${deliveryMethod}) — ${termsText}`,
            expires_at,
            hide_company_name: hideCompanyName,
            promote,
          },
        });

        // Clear draft on successful creation
        try {
          localStorage.removeItem("relay_opportunity_draft");
        } catch (_) {}

        toast.success("Opportunity Published to CDOE Network");
        try {
          window.dispatchEvent(new CustomEvent("relay:opportunity_created"));
        } catch (_) {}
        navigate({ to: "/my-relay", search: { tab: "listings" } });
      }
    } catch (err: any) {
      console.error(editId ? "Update opportunity error:" : "Create opportunity error:", err);
      toast.error(err.message || (editId ? "Failed to update opportunity" : "Failed to create opportunity"));
    } finally {
      setSubmitting(false);
    }
  };

  const isApproved = isSignedIn && business?.status === "approved";
  const displayCompany =
    business?.company_name || business?.name || (isLoadingBusiness ? "Loading profile..." : "Your Company");

  if (loadingOpp) {
    return (
      <div className="w-full max-w-[1600px] mx-auto min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#171F2C]" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#64748B] font-semibold">
          Loading Opportunity Memo...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-6 font-sans text-[#171F2C] pb-16">
      {/* ═══════════════════════════════════════════════════════════════════
          TOP COMMAND CONTEXT BAR
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full pt-1 pb-2">
        <div className="flex flex-col gap-1">
          {/* Breadcrumbs & Listing Type Navigation */}
          <div className="flex items-center justify-between text-[#64748B] font-mono text-[11px] uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onBack}
                className="text-[#64748B] hover:text-[#171F2C] transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Opportunities</span>
              </button>
              <span className="text-[#CBD5E1]">/</span>
              <span className="text-[#171F2C] font-semibold">
                {editId ? "Edit Opportunity Brief" : "Post Commercial Opportunity"}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[#64748B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#171F2C]" />
              <span>Institutional Bilateral Clearance</span>
            </div>
          </div>

          {/* Main Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-2">
            <div className="max-w-3xl space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171F2C]">
                {editId ? "Edit Opportunity Brief" : "Post Commercial Opportunity"}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {editId
                  ? "Modify your blinded or direct opportunity memo parameters, covenants, and counterparty requirements."
                  : "Publish a blinded or direct commercial opportunity to verified institutional counterparties across the CDOE network."}
              </p>
            </div>

            {/* Action Buttons Header */}
            <div className="flex items-center gap-2.5 shrink-0">
              {editId ? (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={() => navigate({ to: "/opportunities/my" })}
                  className="gap-1.5"
                >
                  <span>Cancel</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={handleSaveDraft}
                  className="gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Save as Draft</span>
                </Button>
              )}
              <Button
                type="button"
                variant="monochrome"
                size="default"
                onClick={handleInitiateSubmit}
                disabled={submitting}
                className="gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>{editId ? "Save Changes" : "Publish Opportunity"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Account Verification Warning Banner if not approved and done loading */}
      {!isLoadingBusiness && !isApproved && (
        <div className="p-4 bg-white border border-amber-300 rounded-[4px] flex items-start gap-3 shadow-2xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs text-[#171F2C]">
            <span className="font-bold text-xs uppercase tracking-wider block text-amber-900">
              Profile Verification Required
            </span>
            <p className="text-[#64748B] text-xs leading-relaxed">
              {!isSignedIn
                ? "You must sign in with an approved business profile to publish live opportunities to the bilateral network."
                : `Your business profile status is currently "${business?.status || "pending"}". Only approved operators can publish live marketplace listings.`}
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN WORKSURFACE: 65% STRUCTURED CREATION (LEFT) + 35% STICKY RAIL (RIGHT)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ── LEFT COLUMN: Structured Form Creation Flow (xl:col-span-7) ── */}
        <div className="xl:col-span-7 space-y-5">
          {/* SECTION 1: Opportunity Overview */}
          <div className="bg-white rounded-[4px] p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-sm md:text-base font-bold text-[#171F2C]">
                1. Opportunity Overview
              </h2>
              <p className="text-xs text-[#64748B]">
                Define your headline and control company identity visibility for institutional counterparties.
              </p>
            </div>

            {/* Opportunity Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label required>Opportunity Title</Label>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  {title.length} / 120 chars
                </span>
              </div>
              <Input
                type="text"
                maxLength={120}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Enterprise Cloud Distribution & DACH Financial Sector Channel Access"
                className="h-10"
              />
              <span className="text-[11px] text-[#94A3B8] block">
                A clear, executive anchor summarizing the opportunity.
              </span>
            </div>

            {/* Category & Industry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Category */}
              <div className="space-y-1.5">
                <Label required>Exchange Category</Label>
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v as OpportunityCategory)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Industry */}
              <div className="space-y-1.5">
                <Label required>Industry Classification</Label>
                <Select
                  value={industry}
                  onValueChange={(v) => setIndustry(v)}
                >
                  <SelectTrigger className="h-10">
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

          {/* SECTION 2: What You Are Offering */}
          <div className="bg-white rounded-[4px] p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-sm md:text-base font-bold text-[#171F2C]">
                2. What You Are Offering
              </h2>
              <p className="text-xs text-[#64748B]">
                Articulate the commercial asset, reach, or pipeline capability you bring to the table.
              </p>
            </div>

            {/* Scope / Description Rich Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label required>Opportunity Description &amp; Narrative</Label>
                <span className="text-[11px] text-[#94A3B8] font-mono">
                  Select phrase to trigger highlight tool
                </span>
              </div>

              <div className="relative">
                <div
                  ref={scopeEditorRef}
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="Describe your commercial asset, market reach, customer access, or strategic opportunity in detail (min 50 chars)..."
                  onInput={handleScopeInput}
                  onMouseUp={() => handleEditorMouseUp("scope")}
                  onKeyUp={() => handleEditorKeyUp("scope")}
                  className="w-full min-h-[120px] p-3.5 bg-white text-[#171F2C] rounded-[4px] text-xs md:text-sm border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20 focus:outline-none leading-relaxed transition-colors shadow-2xs overflow-y-auto before:text-[#94A3B8] empty:before:content-[attr(data-placeholder)] empty:before:pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: What You Want in Return */}
          <div className="bg-white rounded-[4px] p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-sm md:text-base font-bold text-[#171F2C]">
                3. What You Want in Return
              </h2>
              <p className="text-xs text-[#64748B]">
                Specify your desired reciprocal compensation, engagement format, and baseline financial floor.
              </p>
            </div>

            {/* Value Type & Delivery Method Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label required>Value Type</Label>
                <Select
                  value={valueType}
                  onValueChange={(v) => setValueType(v)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Value Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {VALUE_TYPES.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label required>Delivery Method</Label>
                <Select
                  value={deliveryMethod}
                  onValueChange={(v) => setDeliveryMethod(v)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Delivery Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {DELIVERY_METHODS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Guidance Banner when "Other" delivery method is selected */}
            {deliveryMethod === "Other" && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-[4px] flex items-start gap-2.5 text-xs text-amber-900 shadow-2xs">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-left">
                  <span className="font-bold text-xs block text-amber-950">
                    Custom Delivery Method Specified
                  </span>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    Since you selected &ldquo;Other&rdquo;, please clearly detail your proposed fulfillment structure and terms in the Proposed Value &amp; Terms Commitment section below.
                  </p>
                </div>
              </div>
            )}

            {/* Proposed Value & Terms Commitment Editor */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <Label required>Proposed Value &amp; Terms Commitment</Label>
                <span className="text-[11px] text-[#94A3B8] font-mono">
                  Select phrase to highlight terms
                </span>
              </div>

              <div className="relative">
                <div
                  ref={termsEditorRef}
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="e.g. 20% recurring commission on closed annual contracts, or warm intro within 14 days..."
                  onInput={handleTermsInput}
                  onMouseUp={() => handleEditorMouseUp("terms")}
                  onKeyUp={() => handleEditorKeyUp("terms")}
                  className="w-full min-h-[90px] p-3.5 bg-white text-[#171F2C] rounded-[4px] text-xs md:text-sm border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#000000] focus:ring-1 focus:ring-[#000000]/20 focus:outline-none leading-relaxed transition-colors shadow-2xs overflow-y-auto before:text-[#94A3B8] empty:before:content-[attr(data-placeholder)] empty:before:pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Governance & Clearances */}
          <div className="bg-white rounded-[4px] p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-sm md:text-base font-bold text-[#171F2C]">
                4. Governance &amp; Clearances
              </h2>
              <p className="text-xs text-[#64748B]">
                Governed under institutional mutual non-disclosure and deal room safeguards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Expiration Horizon */}
              <div className="space-y-1.5">
                <Label>Expiration Horizon</Label>
                <Select
                  value={expiryDays}
                  onValueChange={(v) => setExpiryDays(v)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPIRY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* NDA Framework */}
              <div className="space-y-1.5">
                <Label>NDA Framework</Label>
                <div className="h-10 px-3.5 bg-[#F8FAFC] text-[#171F2C] rounded-[4px] text-xs font-medium flex items-center justify-between border border-[#E2E8F0]">
                  <span className="truncate text-[#171F2C]">Relay Standard Bilateral NCND</span>
                  <RelayVerificationSeal className="w-4 h-4 shrink-0" title="Auto-ratified NCND" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Listing Visibility & Promotion (Anonymously & Promote) */}
          <div className="bg-white rounded-[4px] p-5 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="space-y-0.5">
              <h2 className="font-display text-sm md:text-base font-bold text-[#171F2C]">
                5. Listing Visibility &amp; Promotion
              </h2>
              <p className="text-xs text-[#64748B]">
                Control anonymity safeguards and accelerate pipeline syndication across verified operators.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Card 1: Post Anonymously */}
              <div
                onClick={() => {
                  const nextVal = !hideCompanyName;
                  setHideCompanyName(nextVal);
                  if (nextVal) setPromote(false); // Can't promote if anonymous
                }}
                className={cn(
                  "p-4 rounded-[4px] border text-left cursor-pointer transition-all duration-150 select-none flex flex-col justify-between space-y-3",
                  hideCompanyName
                    ? "border-[#000000] bg-[#F8FAFC] ring-1 ring-[#000000] shadow-xs"
                    : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]/40",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-[#171F2C]" />
                    <span className="text-xs font-bold text-[#171F2C]">Post Anonymously</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                    IDENTITY ESCROW
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-snug">
                  Blinds your company name and branding from public listings. Your verified identity will only be revealed upon bilateral mutual clearance (Stage 4).
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[#F1F5F9] text-[11px] font-semibold text-[#171F2C]">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors shrink-0",
                      hideCompanyName
                        ? "border-[#000000] bg-[#000000] text-white"
                        : "border-[#CBD5E1] bg-white",
                    )}
                  >
                    {hideCompanyName && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span>{hideCompanyName ? "Masking Active" : "Direct Identity"}</span>
                </div>
              </div>

              {/* Card 2: Promote Listing */}
              <div
                onClick={() => {
                  const nextVal = !promote;
                  setPromote(nextVal);
                  if (nextVal) setHideCompanyName(false); // Can't be anonymous if promoted
                }}
                className={cn(
                  "p-4 rounded-[4px] border text-left cursor-pointer transition-all duration-150 select-none flex flex-col justify-between space-y-3",
                  promote
                    ? "border-[#000000] bg-[#F8FAFC] ring-1 ring-[#000000] shadow-xs"
                    : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]/40",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-[#171F2C]">Promote Listing</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] bg-[#000000] text-white">
                    3X VISIBILITY
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-snug">
                  Feature this opportunity at the top of the exchange board with an &lsquo;Urgent / Promoted&rsquo; indicator for maximum counterparty engagement.
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[#F1F5F9] text-[11px] font-semibold text-[#171F2C]">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors shrink-0",
                      promote
                        ? "border-[#000000] bg-[#000000] text-white"
                        : "border-[#CBD5E1] bg-white",
                    )}
                  >
                    {promote && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span>{promote ? "Promoted to Top" : "Standard Listing"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: Bottom Submission Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-[4px] border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center gap-2 text-[#64748B] text-xs">
              <RelayVerificationSeal className="w-4 h-4 shrink-0" />
              <span>Deal Desk reviews and clears all postings within 4 hours.</span>
            </div>
            <Button
              type="button"
              variant="monochrome"
              size="default"
              onClick={handleInitiateSubmit}
              disabled={submitting}
              className="w-full sm:w-auto h-10 px-6 gap-2"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{editId ? "Save Changes" : "Publish to CDOE Network"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Sticky Live Preview & Network Guardrails (xl:col-span-5) ── */}
        <div className="xl:col-span-5 space-y-5 xl:sticky xl:top-24">
          {/* Card 1: Compact Live Card Preview */}
          <div className="bg-white rounded-[4px] shadow-xs border border-[#E2E8F0] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#171F2C]">
                  Live Exchange Preview
                </span>
              </div>
              <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-[2px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Highlighted Terms Active
              </span>
            </div>

            {/* Embedded Live Preview Card */}
            <div className="bg-[#F8FAFC] rounded-[4px] p-4 border border-[#E2E8F0] space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#000000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] font-mono">
                    {category.toUpperCase()}
                  </span>
                  <span className="bg-[#E2E8F0] text-[#64748B] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px] font-mono">
                    {oppNumber ? `#OPP-${oppNumber}` : editId ? `#${editId.slice(0, 8)}` : "#OPP-NEW"}
                  </span>
                  {promote && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] flex items-center gap-0.5 font-mono">
                      <Zap className="w-2.5 h-2.5 fill-white" />
                      PROMOTED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] font-medium text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                  {hideCompanyName ? (
                    <>
                      <Lock className="w-3 h-3 text-[#94A3B8]" />
                      <span>Identity Masked</span>
                    </>
                  ) : (
                    <>
                      <RelayVerificationSeal className="w-3 h-3" />
                      <span>Direct Listing</span>
                    </>
                  )}
                </div>
              </div>

              {/* Title & Scope */}
              <div className="space-y-1.5">
                <h3 className="font-display text-sm font-bold text-[#171F2C] line-clamp-2 leading-snug">
                  {title || (
                    <span className="text-[#94A3B8] font-normal italic">
                      Opportunity headline will appear here...
                    </span>
                  )}
                </h3>
                <div
                  className="text-xs text-[#64748B] leading-relaxed line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      scopeHtml ||
                      '<span class="text-[#94A3B8] italic">Opportunity narrative will appear here...</span>',
                  }}
                />
              </div>

              {/* Reciprocal Terms Box */}
              <div className="bg-white rounded-[4px] p-3 text-xs border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Reciprocal Ask
                  </span>
                  <span className="text-[10px] font-bold text-[#171F2C] uppercase font-mono">
                    Masked Floor
                  </span>
                </div>
                <div className="text-xs text-[#171F2C] leading-relaxed font-medium">
                  <span className="text-[#64748B]">
                    Asking: {valueType} ({deliveryMethod}) •{" "}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        termsHtml ||
                        '<span class="text-[#94A3B8] italic">Proposed terms commitment...</span>',
                    }}
                  />
                </div>
              </div>

              {/* Entity Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-[2px] bg-[#171F2C] text-white flex items-center justify-center font-bold text-[10px]">
                    {hideCompanyName ? "◆" : displayCompany.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-semibold text-[#171F2C] truncate max-w-[180px]">
                    {hideCompanyName ? "Institutional Member #4812" : displayCompany}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-[#64748B] bg-white px-2 py-0.5 rounded-[2px] border border-[#E2E8F0]">
                  <RelayVerificationSeal className="w-3 h-3 shrink-0" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Zero Contact Leakage Guarantee Card */}
          <div className="bg-white rounded-[4px] shadow-xs border border-[#E2E8F0] p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#171F2C]" />
              <h3 className="font-display text-sm font-bold text-[#171F2C]">
                Zero Contact Leakage Guarantee
              </h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              All executive identities, company registrations, and commercial covenants remain blinded until bilateral mutual clearance.
            </p>
            <div className="space-y-2 pt-1 text-xs text-[#171F2C]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#171F2C] stroke-[2.5]" />
                <span>Deterministic cryptographic identity masking</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#171F2C] stroke-[2.5]" />
                <span>Unilateral dealroom disclosure veto power</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#171F2C] stroke-[2.5]" />
                <span>Auto-ratified institutional NCND covenants</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTEXTUAL FLOATING TOOLBAR FOR TEXT HIGHLIGHTING
          ═══════════════════════════════════════════════════════════════════ */}
      {showToolbar && (
        <div
          style={{
            left: `${toolbarPos.left}px`,
            top: `${toolbarPos.top}px`,
            transform: "translate(-50%, -100%)",
          }}
          className="fixed z-50 pointer-events-auto transition-all duration-150 select-none animate-in fade-in zoom-in-95"
        >
          <div className="relative bg-[#0F172A] text-white rounded-full px-2.5 py-1.5 shadow-2xl border border-slate-700 flex items-center gap-1.5 backdrop-blur-md">
            <button
              type="button"
              onMouseDown={handleToggleHighlight}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Highlighter
                className={cn(
                  "w-3.5 h-3.5",
                  isSelectionHighlighted ? "text-slate-400" : "text-amber-400",
                )}
              />
              <span>{isSelectionHighlighted ? "Unhighlight Term" : "Highlight Term"}</span>
            </button>
            <div className="w-px h-3.5 bg-slate-700" />
            <span
              className={cn(
                "px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full flex items-center gap-1",
                isSelectionHighlighted
                  ? "bg-amber-950/60 text-amber-300 border border-amber-700/50"
                  : "bg-slate-800 text-slate-300 border border-slate-700/50",
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{isSelectionHighlighted ? "Highlighted" : "Key Covenant"}</span>
            </span>

            {/* Downward triangle arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#0F172A]" />
          </div>
        </div>
      )}

      {/* Offer Detection Warning Dialog */}
      <OfferDetectionWarningDialog
        open={warningOpen}
        onOpenChange={setWarningOpen}
        onEditOpportunity={() => setWarningOpen(false)}
        onSwitchToOffer={() => {
          setWarningOpen(false);
          const scopeText = scopeEditorRef.current?.innerText.trim() || "";
          onSwitchToOffer(title, scopeText);
        }}
        onProceedAnyway={() => {
          setWarningOpen(false);
          executeSubmit();
        }}
      />
    </div>
  );
}
