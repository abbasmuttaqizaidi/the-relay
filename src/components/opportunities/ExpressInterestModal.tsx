import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  CheckCircle2,
  Lock,
  ArrowRight,
  Highlighter,
  Loader2,
  Network,
  Banknote,
  BadgeCheck,
  Share2,
  Wrench,
  Cpu,
  UserPlus,
  Brain,
  Landmark,
  MoreHorizontal,
  Edit3,
  Sparkles,
  ChevronDown,
  Info,
  Send,
} from "lucide-react";
import { Modal, Button } from "@/design-system";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import { toast } from "@/components/ui/sonner";
import { expressInterest } from "@/functions/expressInterest";
import { useInterestStore } from "@/lib/interest-store";
import { cn } from "@/lib/utils";

export interface ValueCategoryDef {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  deliveryMethods: string[];
}

export const VALUE_CATEGORIES: ValueCategoryDef[] = [
  {
    id: "distribution",
    name: "Distribution & Sales",
    icon: Network,
    deliveryMethods: [
      "Direct Reseller / Partner",
      "Co-Selling Together",
      "Warm Client Handoff",
      "Commission / Rev-Share",
      "Advisory Support",
      "Other",
    ],
  },
  {
    id: "money",
    name: "Money / Rev-Share",
    icon: Banknote,
    deliveryMethods: [
      "% Revenue Share on Contract (First Invoice / ARR)",
      "Fixed Referral Fee / Success Bounty",
      "Recurring Co-Marketing Allocation",
      "Escrowed Milestone Payout",
      "Other",
    ],
  },
  {
    id: "warm_intros",
    name: "Warm Introductions",
    icon: BadgeCheck,
    deliveryMethods: [
      "C-Level / VP Executive Intro",
      "Target Account Warm Handoff (Account-Based)",
      "Investor / Syndicate Intro",
      "Procurement / Department Head Intro",
      "Other",
    ],
  },
  {
    id: "client_referrals",
    name: "Client Referrals",
    icon: Share2,
    deliveryMethods: [
      "1-to-1 Reciprocal Deal Swap",
      "Unserviceable Misfit Lead Handoff",
      "Regional / Geographical Account Pass-Through",
      "Pooled Dealflow Pipeline Access",
      "Other",
    ],
  },
  {
    id: "services",
    name: "Services & Work",
    icon: Wrench,
    deliveryMethods: [
      "Specialist Team Bandwidth / Billable Hours",
      "Technical Architecture & Systems Integration",
      "Regulatory / Compliance / Legal Advisory",
      "Design / Product Sprint Delivery",
      "Other",
    ],
  },
  {
    id: "technology",
    name: "Technology & Tools",
    icon: Cpu,
    deliveryMethods: [
      "API / Integration White-Label Access",
      "Enterprise SaaS Seat Licenses",
      "Compute / Cloud GPU Cluster Allocation",
      "Proprietary Dataset / Telemetry Access",
      "Other",
    ],
  },
  {
    id: "talent",
    name: "Talent & Hiring",
    icon: UserPlus,
    deliveryMethods: [
      "Executive Candidate Referral",
      "Vetted Contractor / Agency Bench Sharing",
      "Advisory Board Member Placement",
      "Specialist Recruiter Warm Network",
      "Other",
    ],
  },
  {
    id: "advice",
    name: "Advice & Expertise",
    icon: Brain,
    deliveryMethods: [
      "Go-To-Market / Expansion Strategy",
      "Technical Due Diligence & Architecture Review",
      "Fundraising / Capital Structuring Guidance",
      "Enterprise Security & SOC-2 / HIPAA Prep",
      "Other",
    ],
  },
  {
    id: "capital",
    name: "Capital / Investment",
    icon: Landmark,
    deliveryMethods: [
      "Direct Strategic Equity Co-Investment",
      "Special Purpose Vehicle (SPV) Allocation",
      "Convertible Note / SAFE Allocation",
      "Commercial Debt / Working Capital Facility",
      "Other",
    ],
  },
  {
    id: "other",
    name: "Other",
    icon: MoreHorizontal,
    deliveryMethods: [
      "Custom Barter Ratio",
      "IP Cross-Licensing",
      "Multi-Party Escrow Swap",
      "Asymmetric Terms",
      "Other",
    ],
  },
];

export function mapCategoryToExchangeType(categoryId: string): string {
  switch (categoryId) {
    case "money":
      return "revenue_share";
    case "warm_intros":
      return "introduction";
    case "client_referrals":
      return "qualified_lead";
    case "services":
      return "service_work";
    case "distribution":
      return "partnership";
    case "capital":
      return "fixed_amount";
    case "technology":
      return "business_opportunity";
    default:
      return "other";
  }
}

export function findCategory(catNameOrId?: string | null): ValueCategoryDef | undefined {
  if (!catNameOrId) return undefined;
  const lower = catNameOrId.toLowerCase().trim();
  return VALUE_CATEGORIES.find(
    (c) =>
      c.id.toLowerCase() === lower ||
      c.name.toLowerCase() === lower ||
      c.name.toLowerCase().includes(lower) ||
      lower.includes(c.id.toLowerCase())
  );
}

export interface ExpressInterestModalOpportunity {
  id: string;
  opportunity_number?: string;
  title: string;
  category?: string;
  type?: string;
  company?: string;
  industry?: string;
  geo?: string;
  location?: string | null;
  offer_text?: string | null;
  description?: string;
  business?: {
    company_name?: string;
    name?: string;
    status?: string;
  };
}

export interface ExpressInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: ExpressInterestModalOpportunity | null;
  onSuccess?: (referenceCode?: string) => void;
  mode?: "express_interest" | "counter_proposal" | "propose_terms";
  customSubmitHandler?: (payload: {
    message: string;
    proposed_terms: string;
    value_categories: string[];
    delivery_methods: string[];
    highlighted_terms: string[];
    exchange_type: any;
  }) => Promise<void>;
  initialProposedTerms?: string;
  initialValueCategories?: string[];
  initialDeliveryMethods?: (string | any)[];
  initialHighlightedTerms?: string[];
  proposalVersion?: number;
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
  counterpartyName?: string;
}

export function ExpressInterestModal({
  isOpen,
  onClose,
  opportunity,
  onSuccess,
  mode = "express_interest",
  customSubmitHandler,
  initialProposedTerms,
  initialValueCategories,
  initialDeliveryMethods,
  initialHighlightedTerms,
  proposalVersion,
  title,
  subtitle,
  submitButtonText,
  counterpartyName,
}: ExpressInterestModalProps) {
  const navigate = useNavigate();
  const { request: requestInterest } = useInterestStore();
  const isCounterMode = mode === "counter_proposal" || mode === "propose_terms";

  const handleGoToSentProposals = () => {
    onClose();
    navigate({ to: "/proposals", search: { tab: "sent" } });
  };

  // Offer Mode: 'accept_listed' (default) or 'propose_custom'
  const [offerMode, setOfferMode] = React.useState<"accept_listed" | "propose_custom">(
    isCounterMode ? "propose_custom" : "accept_listed",
  );

  // Selected Categories and Sub-delivery points
  const [selectedCategoryNames, setSelectedCategoryNames] = React.useState<string[]>([
    "Distribution & Sales",
  ]);
  const [activeCategoryId, setActiveCategoryId] = React.useState<string>("distribution");
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = React.useState<string[]>([
    "Direct Reseller / Partner",
  ]);
  const [customOtherDeliveryText, setCustomOtherDeliveryText] = React.useState<string>("");

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [referenceCode, setReferenceCode] = React.useState<string>("ESC-9921-X");

  // Rich Text & Highlight Tooltip state
  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const [showHighlightTooltip, setShowHighlightTooltip] = React.useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = React.useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });
  const [isSelectionHighlighted, setIsSelectionHighlighted] = React.useState<boolean>(false);

  // Default initial content
  const defaultHtml = `<mark class="bg-emerald-50 text-emerald-800 border-b border-emerald-300 px-1 py-0.5 rounded font-medium" title="Highlighted for Receiver">25% recurring gross rev-share + $15k co-marketing budget</mark> across all closed accounts, alongside dedicated technical integration sprints and bi-weekly pipeline review meetings.`;

  // Ref to track if modal is open to only initialize once per open action
  const prevIsOpenRef = React.useRef(false);

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      prevIsOpenRef.current = true;
      setOfferMode(isCounterMode ? "propose_custom" : "accept_listed");

      // Initialize Value Categories
      let initCatNames: string[] = [];
      let initCatId = "distribution";

      if (initialValueCategories && initialValueCategories.length > 0) {
        initCatNames = initialValueCategories
          .map((c: any) => (typeof c === "string" ? c : c?.name || c?.label || ""))
          .filter(Boolean);
        const firstMatched = findCategory(initCatNames[0]);
        if (firstMatched) {
          initCatId = firstMatched.id;
        }
      } else if (opportunity?.category) {
        const matched = findCategory(opportunity.category);
        if (matched) {
          initCatNames = [matched.name];
          initCatId = matched.id;
        } else {
          initCatNames = [opportunity.category];
        }
      }

      if (initCatNames.length === 0) {
        initCatNames = ["Distribution & Sales"];
        initCatId = "distribution";
      }

      setSelectedCategoryNames(initCatNames);
      setActiveCategoryId(initCatId);

      // Initialize Delivery Methods
      let initDelMethods: string[] = [];
      let initOtherText = "";

      if (initialDeliveryMethods && initialDeliveryMethods.length > 0) {
        initDelMethods = initialDeliveryMethods.map((dm: any) => {
          if (typeof dm === "string") {
            if (dm.startsWith("Other:") || dm.startsWith("Other -")) {
              initOtherText = dm.replace(/^Other[:\-]\s*/, "");
              return "Other";
            }
            return dm;
          } else if (dm && typeof dm === "object") {
            if (dm.otherText) initOtherText = dm.otherText;
            return dm.name || dm.label || "Direct Reseller / Partner";
          }
          return "Direct Reseller / Partner";
        });
      } else {
        const catObj = VALUE_CATEGORIES.find((c) => c.id === initCatId) || VALUE_CATEGORIES[0];
        initDelMethods = [catObj.deliveryMethods[0] || "Direct Reseller / Partner"];
      }

      setSelectedDeliveryMethods(initDelMethods);
      setCustomOtherDeliveryText(initOtherText);
      setIsSubmitting(false);
      setIsSuccess(false);
      setShowHighlightTooltip(false);

      if (opportunity?.id) {
        setReferenceCode(
          isCounterMode
            ? `PROP-v${proposalVersion || 1}`
            : `ESC-${opportunity.id.slice(0, 4).toUpperCase()}-X`,
        );
      } else {
        setReferenceCode("ESC-9921-X");
      }

      // Populate editor HTML on next tick
      setTimeout(() => {
        if (editorRef.current) {
          if (initialProposedTerms) {
            if (initialProposedTerms.includes("<mark")) {
              editorRef.current.innerHTML = initialProposedTerms;
            } else if (initialHighlightedTerms && initialHighlightedTerms.length > 0) {
              let formatted = initialProposedTerms;
              initialHighlightedTerms.forEach((hl) => {
                if (hl && formatted.includes(hl)) {
                  formatted = formatted.replaceAll(
                    hl,
                    `<mark class="bg-emerald-50 text-emerald-800 border-b border-emerald-300 px-1 py-0.5 rounded font-medium" title="Highlighted for Receiver">${hl}</mark>`
                  );
                }
              });
              if (!formatted.includes("<mark")) {
                formatted = `<mark class="bg-emerald-50 text-emerald-800 border-b border-emerald-300 px-1 py-0.5 rounded font-medium" title="Highlighted for Receiver">${initialProposedTerms}</mark>`;
              }
              editorRef.current.innerHTML = formatted;
            } else {
              editorRef.current.innerHTML = `<mark class="bg-emerald-50 text-emerald-800 border-b border-emerald-300 px-1 py-0.5 rounded font-medium" title="Highlighted for Receiver">${initialProposedTerms}</mark>`;
            }
          } else if (opportunity?.offer_text) {
            editorRef.current.innerHTML = `<mark class="bg-emerald-50 text-emerald-800 border-b border-emerald-300 px-1 py-0.5 rounded font-medium" title="Highlighted for Receiver">${opportunity.offer_text}</mark> alongside dedicated integration support and bilateral co-operation.`;
          } else {
            editorRef.current.innerHTML = defaultHtml;
          }
        }
      }, 50);
    } else if (!isOpen) {
      prevIsOpenRef.current = false;
    }
  }, [
    isOpen,
    opportunity?.id,
    opportunity?.offer_text,
    opportunity?.category,
    initialProposedTerms,
    initialValueCategories,
    initialDeliveryMethods,
    initialHighlightedTerms,
    isCounterMode,
    proposalVersion,
  ]);

  // Auto-fill listed terms quick button
  const handleAutoFillListedTerms = () => {
    if (!opportunity) return;
    const listedTerms = opportunity.offer_text || "Standard bilateral exchange terms as listed.";
    if (editorRef.current) {
      editorRef.current.innerHTML = `<mark class="bg-emerald-50 text-emerald-800 border-b border-emerald-300 px-1 py-0.5 rounded font-medium" title="Highlighted for Receiver">${listedTerms}</mark> — matching the listed commercial requirements exactly as posted.`;
    }
    toast.info("Listed terms auto-filled into offer editor.");
  };

  // Handle Text Selection Popup calculation
  const updateHighlightPopup = React.useCallback(() => {
    const editor = editorRef.current;
    if (!editor) {
      setShowHighlightTooltip(false);
      return;
    }

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      setShowHighlightTooltip(false);
      return;
    }

    const range = sel.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) {
      setShowHighlightTooltip(false);
      return;
    }

    const rect = range.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      setShowHighlightTooltip(false);
      return;
    }

    // Check if selection is currently visible within the viewport
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      setShowHighlightTooltip(false);
      return;
    }

    const parentMark = range.startContainer.parentElement?.closest("mark");
    const isMarked = !!parentMark && editor.contains(parentMark);

    setIsSelectionHighlighted(isMarked);
    setTooltipPosition({
      left: Math.max(90, Math.min(rect.left + rect.width / 2, window.innerWidth - 90)),
      top: rect.top - 8,
    });
    setShowHighlightTooltip(true);
  }, []);

  // Listen for selection collapse & dynamic position tracking on scroll/resize
  React.useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        setShowHighlightTooltip(false);
      }
    };

    const handleScrollOrResize = () => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
        updateHighlightPopup();
      } else {
        setShowHighlightTooltip(false);
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
  }, [updateHighlightPopup]);

  const handleEditorMouseUp = () => {
    setTimeout(updateHighlightPopup, 10);
  };

  const handleEditorKeyUp = () => {
    setTimeout(updateHighlightPopup, 10);
  };

  // Toggle Highlight on selected text
  const applyHighlight = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const editor = editorRef.current;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed && editor && editor.contains(sel.anchorNode)) {
      const range = sel.getRangeAt(0);
      const selectedContent = range.cloneContents();
      const existingMark = range.startContainer.parentElement?.closest("mark");

      if (existingMark && editor.contains(existingMark)) {
        // Unwrap mark
        const parent = existingMark.parentNode;
        while (existingMark.firstChild) {
          parent?.insertBefore(existingMark.firstChild, existingMark);
        }
        parent?.removeChild(existingMark);
      } else {
        const mark = document.createElement("mark");
        mark.className =
          "bg-emerald-50 text-emerald-800 border-b border-emerald-300 px-1 py-0.5 rounded font-medium";
        mark.title = "Highlighted for Receiver";
        try {
          range.surroundContents(mark);
        } catch {
          // Fallback if cross-boundary
          const wrapper = document.createElement("span");
          wrapper.appendChild(selectedContent);
          mark.innerHTML = wrapper.innerHTML;
          range.deleteContents();
          range.insertNode(mark);
        }
      }
      sel.removeAllRanges();
      setShowHighlightTooltip(false);
    }
  };

  // Category Toggle Handler
  const handleToggleCategory = (category: ValueCategoryDef) => {
    setActiveCategoryId(category.id);
    setSelectedCategoryNames((prev) => {
      if (prev.includes(category.name)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((name) => name !== category.name);
      } else {
        return [...prev, category.name];
      }
    });

    // Auto-select first delivery method of this category if none selected and Other is not active
    if (!selectedDeliveryMethods.includes("Other")) {
      const hasAnyInCat = category.deliveryMethods.some((m) =>
        selectedDeliveryMethods.includes(m),
      );
      if (!hasAnyInCat && category.deliveryMethods.length > 0) {
        const firstMethod = category.deliveryMethods.find((m) => m !== "Other") || category.deliveryMethods[0];
        setSelectedDeliveryMethods((prev) => [...prev, firstMethod]);
      }
    }
  };

  // Delivery Method Toggle Handler
  const handleToggleDeliveryMethod = (method: string) => {
    setSelectedDeliveryMethods((prev) => {
      // If clicking "Other"
      if (method === "Other") {
        if (prev.includes("Other")) {
          return [];
        } else {
          // Selecting Other removes all other options
          return ["Other"];
        }
      }

      // If clicking any non-Other method when "Other" was selected, remove "Other"
      const withoutOther = prev.filter((m) => m !== "Other");
      if (withoutOther.includes(method)) {
        if (withoutOther.length === 1 && prev.length === 1) return withoutOther; // Keep at least one
        return withoutOther.filter((m) => m !== method);
      } else {
        return [...withoutOther, method];
      }
    });
  };

  // Active category object
  const activeCategory =
    VALUE_CATEGORIES.find((c) => c.id === activeCategoryId) || VALUE_CATEGORIES[0];

  // Submit Handler
  const handleSubmit = async () => {
    if (!opportunity) return;

    let payloadCategories: string[] = [];
    let payloadDelivery: string[] = [];
    let payloadTerms = "";
    let payloadHighlights: string[] = [];
    let structuredMessage = "";

    if (offerMode === "accept_listed") {
      const listedTerms = opportunity.offer_text || "Standard bilateral exchange terms as listed.";
      payloadTerms = `Accepted listed terms: ${listedTerms}`;
      payloadCategories = [opportunity.category || "Distribution & Sales"];
      payloadDelivery = ["Direct Reseller / Partner"];
      payloadHighlights = [listedTerms];
      structuredMessage = `Accepting listed terms directly without negotiation.\n\n[Accepted Terms]: ${listedTerms}\n[Value Categories]: ${payloadCategories.join(", ")}`;
    } else {
      const editor = editorRef.current;
      const rawText = editor ? editor.innerText.trim() : "";
      if (!rawText) {
        toast.error("Please describe your proposed value and terms.");
        return;
      }

      if (selectedCategoryNames.length === 0) {
        toast.error("Please select at least one value category.");
        return;
      }

      if (selectedDeliveryMethods.length === 0) {
        toast.error("Please select at least one delivery method.");
        return;
      }

      // Extract highlighted terms
      if (editor) {
        const marks = editor.querySelectorAll("mark");
        marks.forEach((m) => {
          const text = m.textContent?.trim();
          if (text && !payloadHighlights.includes(text)) {
            payloadHighlights.push(text);
          }
        });
      }

      payloadTerms = rawText;
      payloadCategories = selectedCategoryNames;
      payloadDelivery = selectedDeliveryMethods.map((method) => {
        const lower = method.toLowerCase();
        if ((lower === "other" || lower === "others") && customOtherDeliveryText.trim()) {
          return `Other: ${customOtherDeliveryText.trim()}`;
        }
        return method;
      });
      structuredMessage = `${rawText}\n\n[Value Categories]: ${payloadCategories.join(", ")}\n[Delivery Methods]: ${payloadDelivery.join(", ")}${payloadHighlights.length > 0 ? `\n[Key Highlighted Terms]: ${payloadHighlights.join("; ")}` : ""}`;
    }

    if (customSubmitHandler) {
      try {
        setIsSubmitting(true);
        const exchangeType = mapCategoryToExchangeType(activeCategoryId);
        await customSubmitHandler({
          message: structuredMessage,
          proposed_terms: payloadTerms,
          value_categories: payloadCategories,
          delivery_methods: payloadDelivery,
          highlighted_terms: payloadHighlights,
          exchange_type: exchangeType,
        });

        const refCode = isCounterMode ? `PROP-v${proposalVersion || 1}` : `ESC-${opportunity.id.slice(0, 4).toUpperCase()}-X`;
        setReferenceCode(refCode);
        setIsSuccess(true);

        if (onSuccess) {
          onSuccess(refCode);
        }
      } catch (err: any) {
        console.error("Failed to submit custom proposal:", err);
        toast.error(err.message || "Failed to submit proposal offer.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await expressInterest({
        data: {
          opportunity_id: opportunity.id,
          message: structuredMessage,
          value_categories: payloadCategories,
          delivery_methods: payloadDelivery,
          proposed_terms: payloadTerms,
          highlighted_terms: payloadHighlights,
        },
      });

      // Update interest store
      requestInterest(opportunity.id, structuredMessage);

      // Save to local storage for backward compatibility
      try {
        const currentStore = JSON.parse(localStorage.getItem("relay.interest.v1") || "{}");
        if (currentStore[opportunity.id]) {
          currentStore[opportunity.id].id = res?.id;
          localStorage.setItem("relay.interest.v1", JSON.stringify(currentStore));
        }
      } catch (_) {}

      const refCode = res?.id
        ? `ESC-${res.id.slice(-6).toUpperCase()}`
        : `ESC-${opportunity.id.slice(0, 4).toUpperCase()}-X`;
      setReferenceCode(refCode);
      setIsSuccess(true);

      if (onSuccess) {
        onSuccess(refCode);
      }
    } catch (err: any) {
      console.error("Failed to express interest:", err);
      toast.error(err.message || "Failed to submit proposal offer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const targetCompanyName =
    counterpartyName ||
    opportunity?.company ||
    opportunity?.business?.company_name ||
    opportunity?.business?.name ||
    "Counterparty";

  const oppNumber = opportunity?.opportunity_number || "SYN-8842-EU";

  const modalTitle = !isSuccess ? (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-200">
          {isCounterMode
            ? mode === "counter_proposal"
              ? "Stage 2: Counter-Proposal"
              : "Stage 2: Propose Terms"
            : "Step 1 of 2: Send Offer"}
        </span>
        {isCounterMode && proposalVersion ? (
          <>
            <span className="text-slate-300">•</span>
            <span className="text-[12px] font-mono font-medium text-slate-500">v{proposalVersion}</span>
          </>
        ) : null}
        <span className="text-slate-300">•</span>
        <span className="text-[12px] font-mono font-medium text-slate-500">{oppNumber}</span>
      </div>
      <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-slate-900 block">
        {title || (mode === "counter_proposal" ? "Propose Counter-Offer Terms" : "What can you offer in exchange?")}
      </span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
      </div>
      <span className="text-base font-bold font-display text-slate-900">
        {isCounterMode ? "Counter-Proposal Transmitted" : "Offer Submitted"}
      </span>
    </div>
  );

  const modalFooter = !isSuccess ? (
    <div className="w-full flex items-center justify-between">
      <span className="text-[11px] text-slate-500 hidden sm:inline flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        No commitment required
      </span>
      <div className="flex items-center gap-2.5 ml-auto">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="monochrome"
          size="sm"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="gap-2 font-semibold bg-[#0F172A] hover:bg-slate-800 text-white cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>
                {submitButtonText ||
                  (offerMode === "accept_listed"
                    ? "Accept & Proceed to Stage 1"
                    : isCounterMode
                    ? mode === "counter_proposal"
                      ? "Submit Counter-Proposal"
                      : "Send Proposal"
                    : "Submit Custom Offer")}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  ) : null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={modalTitle}
      maxWidth={isSuccess ? "max-w-[440px]" : "max-w-2xl"}
      className={
        isSuccess
          ? "!h-auto !max-h-fit"
          : "h-[620px] max-h-[calc(100dvh-2rem)] sm:max-h-[88vh]"
      }
      footer={modalFooter}
    >
      {!isSuccess ? (
        <div className="space-y-5">
          {/* Target Deal Info Summary Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px] mb-0.5">
                  You are replying to:
                </span>
                <div className="flex items-center gap-1.5 font-medium text-slate-900">
                  <span className="truncate">{targetCompanyName}</span>
                  <RelayVerificationSeal
                    className="w-4 h-4 shrink-0"
                    title="Relay Verified Business"
                  />
                </div>
                <p className="text-slate-600 truncate text-[11px] mt-0.5">
                  {opportunity?.industry || "Enterprise"} •{" "}
                  {opportunity?.geo || opportunity?.location || "Remote / Global"}
                </p>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] mb-0.5">
                  What they are looking for:
                </span>
                <p className="font-medium text-slate-900 truncate">
                  {opportunity?.title || "Strategic Deal Collaboration"}
                </p>
                <span className="text-slate-500 text-[11px] truncate block">
                  {opportunity?.offer_text || "Direct reciprocal partner or co-sell channel"}
                </span>
              </div>
            </div>
          </div>

          {/* Mode Selection Cards (Hidden in Counter Proposal / Propose Terms Mode) */}
          {!isCounterMode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Card 1: Accept Listed Terms (Default & Recommended) */}
              <div
                onClick={() => setOfferMode("accept_listed")}
                className={cn(
                  "relative flex flex-col p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 select-none",
                  offerMode === "accept_listed"
                    ? "border-slate-900 bg-slate-50/80 ring-1 ring-slate-900 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40",
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs sm:text-sm font-bold font-display text-slate-900 truncate">
                    Accept Listed Terms
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[3px] text-[9px] font-bold tracking-wider uppercase bg-[#0F172A] text-white">
                      RECOMMENDED
                    </span>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0",
                        offerMode === "accept_listed"
                          ? "border-slate-900 bg-[#0F172A] text-white"
                          : "border-slate-300 bg-white",
                      )}
                    >
                      {offerMode === "accept_listed" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Accept the counterparty's listed terms without alteration.
                </p>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 font-medium text-emerald-700">
                  Fast-tracks pipeline & automatically initiates Stage 1.
                </p>
              </div>

              {/* Card 2: Propose Custom Offer */}
              <div
                onClick={() => setOfferMode("propose_custom")}
                className={cn(
                  "relative flex flex-col p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 select-none",
                  offerMode === "propose_custom"
                    ? "border-slate-900 bg-slate-50/80 ring-1 ring-slate-900 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40",
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs sm:text-sm font-bold font-display text-slate-900 truncate">
                    Propose Custom Offer
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[3px] text-[9px] font-medium tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-200">
                      NEGOTIATED
                    </span>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0",
                        offerMode === "propose_custom"
                          ? "border-slate-900 bg-[#0F172A] text-white"
                          : "border-slate-300 bg-white",
                      )}
                    >
                      {offerMode === "propose_custom" && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Propose custom value categories, delivery formats, and terms.
                </p>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  Counterparty will review and negotiate terms before confirmation.
                </p>
              </div>
            </div>
          )}

          {/* Conditional Content based on selected mode */}
          {!isCounterMode && offerMode === "accept_listed" ? (
            /* Banner & Listed Terms Info when Accept Listed Terms is selected */
            <div className="space-y-3">
              {/* Informational Banner */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block text-xs">
                    Instant Stage 1 Progression
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Kyuki aap in terms ko accept kar rahe hain, is opportunity ke liye aap khud hi{" "}
                    <strong className="text-slate-900 font-semibold">Stage 1 (Initial Match & Discovery)</strong>{" "}
                    par move ho jayenge without negotiation friction.
                  </p>
                </div>
              </div>

              {/* Listed Terms Confirmation Box */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Terms being accepted as listed:</span>
                  <span className="font-mono text-[10px] text-slate-400">Fixed Terms</span>
                </div>
                <div className="text-xs font-medium text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                  {opportunity?.offer_text ||
                    "Direct bilateral reciprocal exchange terms as listed on the opportunity board."}
                </div>
              </div>
            </div>
          ) : (
            /* Custom Offer Form (Category Dropdown, Delivery Method Dropdown, Terms Input) */
            <div className="space-y-4 pt-1">
              {/* Step 1: Category Selector Dropdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    1. What type of value are you offering?
                  </label>
                  <span className="text-[11px] font-medium text-slate-500">
                    {selectedCategoryNames.length} selected
                  </span>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-medium text-slate-900 shadow-xs focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {React.createElement(activeCategory.icon, {
                          className: "w-4 h-4 text-slate-700 shrink-0",
                        })}
                        <span className="truncate font-semibold">{activeCategory.name}</span>
                        {selectedCategoryNames.length > 1 && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono shrink-0">
                            +{selectedCategoryNames.length - 1} more
                          </span>
                        )}
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-[9999] max-h-72 overflow-y-auto"
                  >
                    <div className="space-y-1">
                      {VALUE_CATEGORIES.map((cat) => {
                        const isSelected = selectedCategoryNames.includes(cat.name);
                        const isActive = activeCategoryId === cat.id;
                        const IconComp = cat.icon;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleToggleCategory(cat)}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left",
                              isActive
                                ? "bg-[#0F172A] text-white font-semibold"
                                : isSelected
                                  ? "bg-slate-100 text-slate-900 font-medium"
                                  : "text-slate-700 hover:bg-slate-50",
                            )}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <IconComp
                                className={cn(
                                  "w-4 h-4 shrink-0",
                                  isActive
                                    ? "text-white"
                                    : isSelected
                                      ? "text-slate-900"
                                      : "text-slate-500",
                                )}
                              />
                              <span className="truncate">{cat.name}</span>
                            </div>
                            {isSelected && (
                              <Check
                                className={cn(
                                  "w-4 h-4 shrink-0 ml-2",
                                  isActive ? "text-white" : "text-slate-900",
                                )}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Selected Categories Badges */}
                {selectedCategoryNames.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedCategoryNames.map((name) => {
                      const catDef = VALUE_CATEGORIES.find((c) => c.name === name);
                      const isActive = activeCategory.name === name;
                      return (
                        <span
                          key={name}
                          onClick={() => catDef && setActiveCategoryId(catDef.id)}
                          className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer transition-colors",
                            isActive
                              ? "bg-[#0F172A] text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
                          )}
                        >
                          <span>{name}</span>
                          {selectedCategoryNames.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (catDef) handleToggleCategory(catDef);
                              }}
                              className="hover:opacity-75 cursor-pointer ml-0.5"
                            >
                              ×
                            </button>
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 2: Delivery Methods Dropdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    2. How will this be delivered?
                  </label>
                  <span className="text-[11px] font-medium text-slate-500">
                    {selectedDeliveryMethods.length} selected
                  </span>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-medium text-slate-900 shadow-xs focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors text-left cursor-pointer"
                    >
                      <span className="truncate">
                        {selectedDeliveryMethods.length === 0
                          ? "Select delivery methods..."
                          : selectedDeliveryMethods.length === 1
                            ? selectedDeliveryMethods[0]
                            : `${selectedDeliveryMethods[0]} (+${selectedDeliveryMethods.length - 1} more)`}
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-[9999] max-h-72 overflow-y-auto"
                  >
                    <div className="space-y-1">
                      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Options for {activeCategory.name}
                      </div>
                      {activeCategory.deliveryMethods.map((method) => {
                        const isSelected = selectedDeliveryMethods.includes(method);
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => handleToggleDeliveryMethod(method)}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left",
                              isSelected
                                ? "bg-[#0F172A] text-white font-medium"
                                : "text-slate-700 hover:bg-slate-50",
                            )}
                          >
                            <span className="pr-2 leading-tight">{method}</span>
                            {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Selected Delivery Methods Badges */}
                {selectedDeliveryMethods.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedDeliveryMethods.map((method) => (
                      <span
                        key={method}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        <span className="truncate max-w-[200px] sm:max-w-xs">{method}</span>
                        {selectedDeliveryMethods.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleToggleDeliveryMethod(method)}
                            className="text-slate-400 hover:text-slate-700 cursor-pointer text-xs leading-none font-bold"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                )}

                {/* Guidance Banner & Custom Input when "Other" is selected */}
                {selectedDeliveryMethods.some((m) => m.toLowerCase().includes("other")) && (
                  <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex flex-col gap-2 text-xs text-amber-900 shadow-2xs mt-2 text-left">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-left">
                        <span className="font-bold text-xs block text-amber-950">
                          Custom &ldquo;Other&rdquo; Delivery Method
                        </span>
                        <p className="text-amber-800 text-[11px] leading-relaxed">
                          Please specify your custom delivery format or integration mechanism below:
                        </p>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Dedicated SFTP synchronization & weekly sync"
                      value={customOtherDeliveryText}
                      onChange={(e) => setCustomOtherDeliveryText(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-amber-300/80 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 placeholder:text-slate-400 mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Terms Input */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      3. Proposed Value and Terms
                    </label>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      Single String Input
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoFillListedTerms}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
                    title="Click to automatically fill the counterparty's listed terms"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Auto-fill listed terms</span>
                  </button>
                </div>

                <div className="relative">
                  {/* Floating Tooltip / Highlight Action Popup (iOS style directly over selected text) */}
                  {showHighlightTooltip && (
                    <div
                      style={{
                        position: "fixed",
                        left: `${tooltipPosition.left}px`,
                        top: `${tooltipPosition.top}px`,
                        transform: "translate(-50%, -100%)",
                        zIndex: 99999,
                      }}
                      className="pointer-events-auto transition-all duration-150 select-none animate-in fade-in zoom-in-95"
                    >
                      <div className="relative bg-[#0F172A] text-white rounded-full px-3 py-1.5 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.4),0_4px_6px_-2px_rgba(15,23,42,0.2)] border border-slate-700 flex items-center gap-1.5 backdrop-blur-md">
                        <button
                          type="button"
                          onMouseDown={applyHighlight}
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Highlighter
                            className={cn(
                              "w-3.5 h-3.5",
                              isSelectionHighlighted ? "text-slate-400" : "text-emerald-400",
                            )}
                          />
                          <span className="text-[11px] font-semibold tracking-wide">
                            {isSelectionHighlighted ? "Unhighlight Term" : "Highlight for Receiver"}
                          </span>
                        </button>
                        <div className="w-px h-3.5 bg-slate-700" />
                        <span
                          className={cn(
                            "px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full flex items-center gap-1",
                            isSelectionHighlighted
                              ? "bg-emerald-950/60 text-emerald-300 border border-emerald-700/50"
                              : "bg-slate-800 text-slate-300 border border-slate-700/50",
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{isSelectionHighlighted ? "Highlighted" : "Key Term"}</span>
                        </span>

                        {/* Downward pointing arrow directly at selected text */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#0F172A]" />
                      </div>
                    </div>
                  )}

                  {/* Rich Editable String Container */}
                  <div className="relative">
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      onMouseUp={handleEditorMouseUp}
                      onKeyUp={handleEditorKeyUp}
                      className="w-full min-h-[96px] text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 outline-none leading-relaxed transition font-normal shadow-xs overflow-y-auto"
                    />
                    <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2 pointer-events-none text-slate-400">
                      <span className="text-[10px] font-mono text-slate-400">
                        Text selection enabled
                      </span>
                      <Edit3 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Helper badge and instructions */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-0.5 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>
                        Selected text will be highlighted for the counterparty on the Exchange Hub.
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px]">100% Confidential until confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Success State - Compact & Content-fitted */
        <div className="space-y-3.5 text-left py-0.5">
          <p className="text-xs text-slate-600 leading-relaxed">
            {isCounterMode
              ? `Your commercial terms have been securely transmitted to `
              : `Your proposal has been securely sent to `}
            <strong className="font-semibold text-slate-900">{targetCompanyName}</strong>. They will review your terms and reply.
          </p>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Ref:</span>
              <span className="font-mono font-semibold text-slate-800 text-xs">{referenceCode}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Awaiting Review
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {isCounterMode ? (
              <Button
                type="button"
                variant="monochrome"
                size="sm"
                onClick={onClose}
                className="w-full text-xs font-semibold h-9 gap-1.5 bg-[#0F172A] hover:bg-slate-800 text-white cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Return to Exchange</span>
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="flex-1 text-xs font-medium h-9 cursor-pointer"
                >
                  Return to Deals
                </Button>
                <Button
                  type="button"
                  variant="monochrome"
                  size="sm"
                  onClick={handleGoToSentProposals}
                  className="flex-1 text-xs font-semibold h-9 gap-1.5 bg-[#0F172A] hover:bg-slate-800 text-white cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>View Sent</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
