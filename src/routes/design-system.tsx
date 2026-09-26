import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Layers,
  Palette,
  Square,
  BadgeAlert,
  Bell,
  Sliders,
  CreditCard,
  FormInput,
  Table,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Inbox,
  ArrowRight,
  Code2,
  Copy,
  Check,
  Search,
  Eye,
  Plus,
  RefreshCw,
  ExternalLink,
  Shield,
  Filter,
  Flame,
  LayoutGrid,
  ChevronRight,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import {
  DESIGN_TOKENS,
  Button,
  VerifiedBadge,
  PendingBadge,
  RegistrationMark,
  UrgentBadge,
  DealCodeStamp,
  CategoryPill,
  ParityScoreBadge,
  LivePulseBadge,
  SemanticStatusPill,
  ExecutiveDarkBadge,
  SolidStatusChip,
  ExecutiveAlertBanner,
  TopicFilterPills,
  executiveToast,
  ExecutiveToastContainer,
  ExecutiveDealTable,
  LifecycleStepper,
  BilateralDealroomStatusCard,
  DealLifecycleProgressBar,
  MiniStageStepper,
  MiniStageBarStepper,
  OpportunityStageStepper,
  Input as DSInput,
  SearchInput,
  Textarea as DSTextarea,
  Label as DSLabel,
  Select as DSSelect,
  SelectContent as DSSelectContent,
  SelectItem as DSSelectItem,
  SelectTrigger as DSSelectTrigger,
  SelectValue as DSSelectValue,
  Checkbox as DSCheckbox,
  ExecutiveTabs,
  MetricCard,
  HowItWorksCard,
  TargetedPlacementCard,
  RecentHandshakesCard,
  ExchangeCalloutBox,
  OpportunityCard,
  ImmediateAttentionCard,
  NewRequestCard,
  SecurityRibbon,
  BilateralOpportunityDetailSheet,
  FloatingTurnDock,
  ExchangeActivityModal,
  showExchangeActivityModal,
  type ExchangeActivityModalData,
} from "@/design-system";

const VALID_TABS = [
  "overview",
  "tokens",
  "buttons",
  "badges",
  "banners",
  "toast",
  "filters",
  "stepper",
  "inputs",
  "cards",
  "table",
  "tabs",
  "dock",
  "sheet",
  "modal",
] as const;

type DesignSystemTab = (typeof VALID_TABS)[number];

const searchParamsSchema = z.object({
  tab: fallback(z.enum(VALID_TABS), "overview").default("overview"),
});

export const Route = createFileRoute("/design-system")({
  validateSearch: zodValidator(searchParamsSchema),
  head: () => ({
    meta: [
      { title: "Design System & Component Showcase — The Relay" },
      {
        name: "description",
        content: "Storybook-style interactive showcase of all components, tokens, and variations in The Relay Design System.",
      },
    ],
  }),
  component: DesignSystemStorybookPage,
});

const NAV_GROUPS = [
  {
    group: "Foundations",
    items: [
      { id: "overview", label: "Overview & Principles", icon: Layers },
      { id: "tokens", label: "Colors & Tokens", icon: Palette },
    ],
  },
  {
    group: "Actions & Indicators",
    items: [
      { id: "buttons", label: "Buttons & Actions", icon: Square },
      { id: "badges", label: "Badges & Status Pills", icon: BadgeAlert },
      { id: "filters", label: "Topic Filter Pills", icon: Filter },
      { id: "tabs", label: "Tabs & Switchers", icon: SlidersHorizontal },
    ],
  },
  {
    group: "Contextual Alerts & Feedback",
    items: [
      { id: "banners", label: "In-App Banners", icon: AlertTriangle },
      { id: "toast", label: "Toast Notifications", icon: Bell },
      { id: "stepper", label: "Lifecycle Steppers", icon: CheckCircle2 },
    ],
  },
  {
    group: "Forms & Data Display",
    items: [
      { id: "inputs", label: "Inputs & Selects", icon: FormInput },
      { id: "table", label: "High-Density Table", icon: Table },
      { id: "cards", label: "Cards & Deal Cards", icon: CreditCard },
    ],
  },
  {
    group: "Complex Overlays",
    items: [
      { id: "dock", label: "Floating Turn Dock", icon: Flame },
      { id: "sheet", label: "Deal Detail Sheet", icon: Maximize2 },
      { id: "modal", label: "Exchange Activity Modal", icon: MessageSquare },
    ],
  },
];

export function DesignSystemStorybookPage({ initialTab = "overview" }: { initialTab?: DesignSystemTab } = {}) {
  let searchTab: DesignSystemTab = initialTab;
  try {
    const search = Route.useSearch();
    if (search?.tab) searchTab = search.tab as DesignSystemTab;
  } catch {
    // Fallback when rendered outside RouterProvider
  }

  const [activeTab, setActiveTab] = useState<DesignSystemTab>(searchTab);

  let navigate: any = () => {};
  try {
    navigate = useNavigate();
  } catch {
    // Fallback
  }

  const handleTabChange = (newTab: DesignSystemTab) => {
    setActiveTab(newTab);
    try {
      navigate({
        search: (prev: any) => ({ ...prev, tab: newTab }),
        replace: true,
      });
    } catch {
      // ignore in isolated tests
    }
  };

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success("Code snippet copied to clipboard");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#171F2C] flex flex-col font-sans selection:bg-[#171F2C] selection:text-white">
      {/* ── TOP STORYBOOK HEADER ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E2E8F0] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#171F2C] text-white flex items-center justify-center font-bold text-sm shadow-xs font-mono">
            DS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-[#171F2C]">
                The Relay Design System
              </span>
              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-bold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                v2.4.0 • Interactive Showcase
              </span>
            </div>
            <p className="text-xs text-[#64748B] hidden sm:block">
              Living component specification, interactive playground &amp; code guidelines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/opportunities"
            className="text-xs font-medium text-[#64748B] hover:text-[#171F2C] px-3 py-1.5 rounded-[4px] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] transition inline-flex items-center gap-1.5"
          >
            <span>Back to App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ── 2-COLUMN STORYBOOK LAYOUT ── */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row min-h-[calc(100vh-60px)]">
        {/* ── LEFT NAVIGATION SIDEBAR ── */}
        <aside className="w-full md:w-64 bg-white border-r border-[#E2E8F0] p-4 flex flex-col gap-6 shrink-0">
          <div className="space-y-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.group} className="space-y-1">
                <span className="px-2 text-[10px] font-mono uppercase tracking-wider font-bold text-[#94A3B8]">
                  {group.group}
                </span>
                <nav className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTabChange(item.id as DesignSystemTab)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs font-medium transition cursor-pointer text-left ${
                          isActive
                            ? "bg-[#171F2C] text-white font-semibold shadow-2xs"
                            : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#171F2C]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#64748B]"}`} />
                          <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </aside>

        {/* ── MAIN COMPONENT CANVAS ── */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-full">
          {activeTab === "overview" && <OverviewSection onSelectTab={handleTabChange} />}
          {activeTab === "tokens" && <TokensSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "buttons" && <ButtonsSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "badges" && <BadgesSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "banners" && <BannersSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "toast" && <ToastSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "filters" && <FiltersSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "stepper" && <StepperSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "inputs" && <InputsSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "table" && <TableSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "cards" && <CardsSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "tabs" && <TabsSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "dock" && <DockSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "sheet" && <SheetSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
          {activeTab === "modal" && <ExchangeActivityModalSection onCopy={copyToClipboard} copiedCode={copiedCode} />}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. OVERVIEW SECTION
// ─────────────────────────────────────────────────────────────────────────────
function OverviewSection({ onSelectTab }: { onSelectTab: (tab: DesignSystemTab) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
            Architecture Guide
          </span>
          <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
            Monochrome Executive Triad
          </span>
        </div>
        <h1 className="text-3xl font-display font-bold text-[#171F2C] tracking-tight mt-1">
          The Relay Design System
        </h1>
        <p className="text-sm text-[#64748B] mt-2 max-w-3xl leading-relaxed">
          The Relay’s UI is built on high-assurance, operator-grade aesthetics. It balances
          monochrome executive restraint with purposeful semantic triad cues (Mineral Sage, Warm Amber, Crimson Slate) to signal commercial certainty without sensory panic.
        </p>
      </div>

      {/* Triad Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#DCFCE7] rounded-xl p-5 space-y-2 shadow-xs bg-gradient-to-br from-[#F0FDF4]/50 to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider font-mono">
              Success Triad
            </span>
            <span className="text-[10px] font-mono text-[#15803D] bg-white px-2 py-0.5 rounded border border-[#DCFCE7]">
              7.42:1 AAA
            </span>
          </div>
          <p className="text-sm font-bold text-[#171F2C]">Mineral Sage (#15803D)</p>
          <p className="text-xs text-[#64748B]">
            Calm, organic mineral green for verified businesses, handshake completions &amp; signed covenants.
          </p>
        </div>

        <div className="bg-white border border-[#FDE68A] rounded-xl p-5 space-y-2 shadow-xs bg-gradient-to-br from-[#FFFBEB]/50 to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider font-mono">
              Warning Triad
            </span>
            <span className="text-[10px] font-mono text-[#B45309] bg-white px-2 py-0.5 rounded border border-[#FDE68A]">
              5.88:1 AA
            </span>
          </div>
          <p className="text-sm font-bold text-[#171F2C]">Warm Honey Amber (#B45309)</p>
          <p className="text-xs text-[#64748B]">
            Warm honey slate signaling active negotiation turns, counter-proposals &amp; SLA timers without alarm.
          </p>
        </div>

        <div className="bg-white border border-[#FECACA] rounded-xl p-5 space-y-2 shadow-xs bg-gradient-to-br from-[#FEF2F2]/50 to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#991B1B] uppercase tracking-wider font-mono">
              Danger Triad
            </span>
            <span className="text-[10px] font-mono text-[#991B1B] bg-white px-2 py-0.5 rounded border border-[#FECACA]">
              6.95:1 AAA
            </span>
          </div>
          <p className="text-sm font-bold text-[#171F2C]">Crimson Slate (#991B1B)</p>
          <p className="text-xs text-[#64748B]">
            Executive crimson for SLA breaches, voided escrows, and definitive legally-binding terminations.
          </p>
        </div>
      </div>

      {/* Quick Jump Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#64748B]">
          Component Directory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: "tokens", title: "Colors & Tokens", desc: "Hex tokens, contrast audits & typography" },
            { id: "buttons", title: "Buttons & Actions", desc: "6 variants with sizes & loading states" },
            { id: "badges", title: "Badges & Pills", desc: "3 standardized levels (Subtle, Dark, Solid)" },
            { id: "banners", title: "In-App Banners", desc: "Handshake, Turn SLA & Termination alerts" },
            { id: "toast", title: "Toast System", desc: "Midnight #0F172A notifications with inline CTAs" },
            { id: "filters", title: "Topic Filter Pills", desc: "Quick-filter button groups with counts" },
            { id: "stepper", title: "Lifecycle Steppers", desc: "4-stage bilateral negotiation tracker" },
            { id: "table", title: "Deal Tables", desc: "High-density zero-glare dealroom rows" },
            { id: "cards", title: "Opportunity Cards", desc: "Collapsed & expanded deal listing cards" },
            { id: "dock", title: "Turn Dock", desc: "Floating sticky widget with active SLA badges" },
            { id: "sheet", title: "Detail Sheet", desc: "90% height bilateral opportunity bottom sheet" },
            { id: "inputs", title: "Inputs & Selects", desc: "Form controls with labels and states" },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectTab(c.id as DesignSystemTab)}
              className="p-4 bg-white border border-[#E2E8F0] hover:border-[#171F2C] rounded-lg text-left transition shadow-xs group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#171F2C] group-hover:text-black">
                  {c.title}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#171F2C] transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-xs text-[#64748B] mt-1">{c.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. TOKENS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function TokensSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const tokenList = [
    { name: "Success Ink", hex: DESIGN_TOKENS.colors.semantic.success.ink, usage: "Text on green surface", ratio: "7.42:1 AAA" },
    { name: "Success Surface", hex: DESIGN_TOKENS.colors.semantic.success.surface, usage: "Card / Pill background", ratio: "WCAG Base" },
    { name: "Success Border", hex: DESIGN_TOKENS.colors.semantic.success.border, usage: "1px Hairline border", ratio: "Border" },
    { name: "Success Accent", hex: DESIGN_TOKENS.colors.semantic.success.accent, usage: "Solid button / live dot", ratio: "Accent" },
    { name: "Warning Ink", hex: DESIGN_TOKENS.colors.semantic.warning.ink, usage: "Text on amber surface", ratio: "5.88:1 AA" },
    { name: "Warning Surface", hex: DESIGN_TOKENS.colors.semantic.warning.surface, usage: "Card / Pill background", ratio: "WCAG Base" },
    { name: "Warning Border", hex: DESIGN_TOKENS.colors.semantic.warning.border, usage: "1px Hairline border", ratio: "Border" },
    { name: "Warning Accent", hex: DESIGN_TOKENS.colors.semantic.warning.accent, usage: "Solid button / live dot", ratio: "Accent" },
    { name: "Danger Ink", hex: DESIGN_TOKENS.colors.semantic.danger.ink, usage: "Text on red surface", ratio: "6.95:1 AAA" },
    { name: "Danger Surface", hex: DESIGN_TOKENS.colors.semantic.danger.surface, usage: "Card / Pill background", ratio: "WCAG Base" },
    { name: "Danger Border", hex: DESIGN_TOKENS.colors.semantic.danger.border, usage: "1px Hairline border", ratio: "Border" },
    { name: "Danger Accent", hex: DESIGN_TOKENS.colors.semantic.danger.accent, usage: "Solid button / breach dot", ratio: "Accent" },
    { name: "Midnight Container", hex: DESIGN_TOKENS.colors.midnightContainer, usage: "High-contrast container", ratio: "Dark Spec" },
    { name: "Deep Charcoal", hex: DESIGN_TOKENS.colors.onSurface, usage: "Primary text & headings", ratio: "14.2:1 AAA" },
    { name: "Slate Gray", hex: DESIGN_TOKENS.colors.onSurfaceVariant, usage: "Subheadings & secondary", ratio: "4.8:1 AA" },
    { name: "Canvas Surface", hex: DESIGN_TOKENS.colors.surface, usage: "App body background", ratio: "Base" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Specification 00
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Semantic Status Tokens &amp; Foundation Palette
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Harmonized tokens ensuring WCAG 2.1 AA and AAA readability across light and dark surfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tokenList.map((t) => (
          <div
            key={t.name}
            className="bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-3 shadow-xs hover:border-[#CBD5E1] transition"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-lg border border-black/10 shadow-2xs"
                style={{ backgroundColor: t.hex }}
              />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                {t.ratio}
              </span>
            </div>
            <div>
              <span className="font-bold text-xs text-[#171F2C] block">{t.name}</span>
              <span className="text-[11px] font-mono text-[#64748B] block mt-0.5">{t.hex}</span>
              <span className="text-[11px] text-slate-400 block mt-1">{t.usage}</span>
            </div>
            <button
              type="button"
              onClick={() => onCopy(t.hex, t.name)}
              className="w-full text-center py-1 bg-slate-50 hover:bg-slate-100 rounded text-[11px] font-mono font-medium text-slate-700 transition cursor-pointer flex items-center justify-center gap-1"
            >
              {copiedCode === t.name ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy Hex</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BUTTONS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ButtonsSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const [variant, setVariant] = useState<"monochrome" | "primary" | "outline" | "ghost" | "secondary" | "destructive">("monochrome");
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg">("sm");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Execute Commercial Action");

  const sampleJsx = `<Button
  variant="${variant}"
  size="${size}"${isLoading ? "\n  loading" : ""}${isDisabled ? "\n  disabled" : ""}
>
  ${btnText}
</Button>`;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Component
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Button Component
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Precision interactive triggers supporting 6 visual variants, 4 sizes, loading spinners, and disabled states.
        </p>
      </div>

      {/* Interactive Playground Canvas */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            Interactive Playground
          </span>
          <span className="text-[11px] text-slate-500 font-mono">&lt;Button /&gt;</span>
        </div>

        {/* Live Preview Area */}
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center min-h-[120px]">
          <Button
            variant={variant}
            size={size}
            loading={isLoading}
            disabled={isDisabled}
            onClick={() => toast.info("Button clicked!")}
          >
            <span>{btnText}</span>
          </Button>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Variant</label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded p-2 text-xs font-mono outline-none"
            >
              <option value="monochrome">monochrome (default)</option>
              <option value="primary">primary (operator orange)</option>
              <option value="outline">outline</option>
              <option value="secondary">secondary</option>
              <option value="ghost">ghost</option>
              <option value="destructive">destructive</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded p-2 text-xs font-mono outline-none"
            >
              <option value="xs">xs (micro compact)</option>
              <option value="sm">sm (standard)</option>
              <option value="md">md (spacious)</option>
              <option value="lg">lg (prominent)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Label Text</label>
            <input
              type="text"
              value={btnText}
              onChange={(e) => setBtnText(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded p-2 text-xs outline-none"
            />
          </div>

          <div className="flex items-center gap-4 pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isLoading}
                onChange={(e) => setIsLoading(e.target.checked)}
                className="rounded"
              />
              <span>Loading</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="rounded"
              />
              <span>Disabled</span>
            </label>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-[#0F172A] rounded-xl p-4 text-white font-mono text-xs flex items-center justify-between gap-4">
          <pre className="overflow-x-auto text-slate-200">{sampleJsx}</pre>
          <button
            type="button"
            onClick={() => onCopy(sampleJsx, "button-code")}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-semibold transition shrink-0 flex items-center gap-1.5"
          >
            {copiedCode === "button-code" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode === "button-code" ? "Copied" : "Copy JSX"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. BADGES & STATUS PILLS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function BadgesSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Specification 01
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Badges, Status Pills &amp; Chips
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          3 standardized levels for table cells, cards, dark executive containers, and solid markers.
        </p>
      </div>

      {/* Level 1: Light Subtle-Tint Status Pills */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Level 1: Light Subtle-Tint Pills (Default Inline &amp; Table Display)
          </span>
          <span className="text-[10px] font-mono text-slate-400">&lt;SemanticStatusPill /&gt;</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-[10px] font-bold text-[#15803D] uppercase font-mono block">Success Variant</span>
            <div className="flex flex-wrap gap-2">
              <SemanticStatusPill variant="success" showDot pulseDot>Verified Corporate</SemanticStatusPill>
              <SemanticStatusPill variant="success" format="rounded">✓ Handshake Complete</SemanticStatusPill>
              <SemanticStatusPill variant="success" format="mono">98% Parity Match</SemanticStatusPill>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-[10px] font-bold text-[#B45309] uppercase font-mono block">Warning Variant</span>
            <div className="flex flex-wrap gap-2">
              <SemanticStatusPill variant="warning" showDot pulseDot>Action Required (18h SLA)</SemanticStatusPill>
              <SemanticStatusPill variant="warning" format="rounded">Response SLA: 41h</SemanticStatusPill>
              <SemanticStatusPill variant="warning" format="mono">Counter Pending</SemanticStatusPill>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-[10px] font-bold text-[#991B1B] uppercase font-mono block">Danger Variant</span>
            <div className="flex flex-wrap gap-2">
              <SemanticStatusPill variant="danger" showDot>Terminated: SLA Breached</SemanticStatusPill>
              <SemanticStatusPill variant="danger" format="rounded">✕ Proposal Declined</SemanticStatusPill>
              <SemanticStatusPill variant="danger" format="mono">Expired</SemanticStatusPill>
            </div>
          </div>
        </div>
      </div>

      {/* Level 2: Dark Executive Badges */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Level 2: Dark Executive Badges (Midnight #0F172A Containers)
          </span>
          <span className="text-[10px] font-mono text-slate-400">&lt;ExecutiveDarkBadge /&gt;</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-[#DCFCE7] uppercase font-mono block">Executive Success</span>
            <div className="flex flex-wrap gap-2">
              <ExecutiveDarkBadge variant="success" showDot>Verified Corporate</ExecutiveDarkBadge>
              <ExecutiveDarkBadge variant="success" format="mono">KYC Validated</ExecutiveDarkBadge>
            </div>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-[#FDE68A] uppercase font-mono block">Executive Warning</span>
            <div className="flex flex-wrap gap-2">
              <ExecutiveDarkBadge variant="warning" showDot>Action Required</ExecutiveDarkBadge>
              <ExecutiveDarkBadge variant="warning" format="mono">18h SLA</ExecutiveDarkBadge>
            </div>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-[#FECACA] uppercase font-mono block">Executive Danger</span>
            <div className="flex flex-wrap gap-2">
              <ExecutiveDarkBadge variant="danger" showDot>SLA Breached</ExecutiveDarkBadge>
              <ExecutiveDarkBadge variant="danger" format="mono">Deal Void</ExecutiveDarkBadge>
            </div>
          </div>
        </div>
      </div>

      {/* Specialized Legacy Domain Badges */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Domain-Specific Identifiers &amp; Stamps
          </span>
          <span className="text-[10px] font-mono text-slate-400">Stamps, Categories &amp; Parity</span>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <DealCodeStamp code="RY-0042" />
          <CategoryPill category="Partnership" />
          <CategoryPill category="Distribution" />
          <UrgentBadge label="Urgent Deal" />
          <ParityScoreBadge score={98} />
          <LivePulseBadge />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. IN-APP CONTEXTUAL BANNERS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function BannersSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const [activeBanner, setActiveBanner] = useState<"success" | "warning" | "danger">("warning");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Specification 02
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          In-App Contextual Alert Banners
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          High-conviction banner alerts for sovereign handshakes, counter-offer SLA timers, and escrow terminations.
        </p>
      </div>

      <div className="space-y-4">
        {/* Success Banner */}
        <ExecutiveAlertBanner
          variant="success"
          title="Stage 4 Handshake Verified & Sovereign Dealroom Unmasked"
          badgeText="Bilateral Assent Confirmed"
          description="Both parties executed sovereign digital signatures. Identity masking has been lifted and bilateral dealroom contact dossier is now fully accessible."
          primaryAction={{
            label: "Open Deal Dossier",
            onClick: () => toast.success("Opening Deal Dossier..."),
          }}
          onDismiss={() => toast.info("Dismissed")}
        />

        {/* Warning Banner */}
        <ExecutiveAlertBanner
          variant="warning"
          title="Bilateral Turn Active: Counter-Offer Awaiting Your Review"
          badgeText="18:14:02 SLA Remaining"
          badgeFormat="mono"
          description="Synthetix AI proposed an adjustment to Clause 8.2 (25% rev-share + $15k co-marketing budget). Response required within protocol window."
          primaryAction={{
            label: "Review Counter-Terms",
            onClick: () => toast.warning("Opening Counter-Terms modal..."),
          }}
          secondaryAction={{
            label: "Snooze 2h",
            onClick: () => toast.info("Snoozed SLA reminder"),
          }}
          onDismiss={() => toast.info("Dismissed")}
        />

        {/* Danger Banner */}
        <ExecutiveAlertBanner
          variant="danger"
          title="Bilateral Escrow Terminated: Counter-Offer Expired Unsigned"
          badgeText="HASH #0x82f..901"
          badgeFormat="mono"
          description="Apex Logistics did not execute protocol endorsement within the mandatory 48-hour diligence window. Syndicate capital allocation lock dissolved."
          primaryAction={{
            label: "Review Breach Audit",
            onClick: () => toast.error("Opening Breach Audit dossier..."),
          }}
          onDismiss={() => toast.info("Dismissed")}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. TOAST NOTIFICATION SYSTEM SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ToastSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Specification 03
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Executive Toast Notification System
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Midnight #0F172A floating notifications with luminous halo icons, monospace tag badges, and interactive inline action buttons.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Live Interactive Toast Dispatcher
          </span>
          <span className="text-[10px] font-mono text-slate-400">executiveToast.*</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <span className="font-bold text-xs text-[#15803D] uppercase font-mono block">Success Toast</span>
              <p className="text-xs text-slate-600 mt-1">
                Triggered upon proposal dispatch or handshake completion.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                executiveToast.success("Interest Proposal Dispatched", {
                  description: "Transmitted to Synthetix AI under strict CDOE bilateral covenant.",
                  badge: "Encrypted",
                  action: {
                    label: "View Dealroom",
                    onClick: () => toast.info("Navigating to Dealroom..."),
                  },
                })
              }
              className="w-full justify-center gap-1.5 text-[#15803D] border-[#DCFCE7] hover:bg-[#F0FDF4]"
            >
              <span>Trigger Success Toast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <span className="font-bold text-xs text-[#B45309] uppercase font-mono block">Warning Toast</span>
              <p className="text-xs text-slate-600 mt-1">
                Triggered for upcoming SLA expiration or counter-offer turns.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                executiveToast.warning("SLA Window Expiring Soon", {
                  description: "Immediate review required for Apex Logistics counter-proposal terms.",
                  badge: "4h Left",
                  action: {
                    label: "Open Counter-Terms",
                    onClick: () => toast.warning("Opening Counter-Terms..."),
                  },
                })
              }
              className="w-full justify-center gap-1.5 text-[#B45309] border-[#FDE68A] hover:bg-[#FFFBEB]"
            >
              <span>Trigger Warning Toast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <span className="font-bold text-xs text-[#991B1B] uppercase font-mono block">Danger Toast</span>
              <p className="text-xs text-slate-600 mt-1">
                Triggered on security breaches, session revocations, or deal drops.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                executiveToast.danger("Session Key Deprecated", {
                  description: "Hardware security key challenge failed on bilateral escrow vault.",
                  badge: "Vault Lock",
                  action: {
                    label: "Re-Authenticate",
                    onClick: () => toast.error("Prompting Hardware Security Key..."),
                  },
                })
              }
              className="w-full justify-center gap-1.5 text-[#991B1B] border-[#FECACA] hover:bg-[#FEF2F2]"
            >
              <span>Trigger Danger Toast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. TOPIC FILTERS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function FiltersSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const sampleFilters = [
    { id: "all", label: "All Deals", count: 14, variant: "all" as const },
    { id: "verified", label: "Verified Corporate", count: 8, variant: "success" as const },
    { id: "action", label: "Action Required", count: 3, variant: "warning" as const },
    { id: "expired", label: "Expired Term", count: 1, variant: "danger" as const },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Specification 01 - Level 3
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Active Topic Filter Pills
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Interactive category and deal status switchers with real-time numeric badges and status dots.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Interactive Filter Specimen
          </span>
          <span className="text-[10px] font-mono text-slate-400">&lt;TopicFilterPills /&gt;</span>
        </div>

        <TopicFilterPills
          filters={sampleFilters}
          activeFilter={activeFilter}
          onFilterChange={(id) => {
            setActiveFilter(id);
            toast.info(`Active filter changed to: ${id}`);
          }}
        />

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono">
          <span className="text-slate-500">Selected Filter State:</span>{" "}
          <span className="font-bold text-[#171F2C]">"{activeFilter}"</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. LIFECYCLE STEPPER SECTION
// ─────────────────────────────────────────────────────────────────────────────
function StepperSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const [currentStage, setCurrentStage] = useState<number>(2);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Workflow Architecture
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Bilateral Lifecycle Steppers
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          The 4-stage sovereign deal workflow: Stage 1 (Acknowledgement) → Stage 2 (Negotiation) → Stage 3 (Agreement) → Stage 4 (Handshake).
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Interactive Stage Stepper
          </span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setCurrentStage(s)}
                className={`w-6 h-6 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  currentStage === s
                    ? "bg-[#171F2C] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Large Lifecycle Stepper */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <DealLifecycleProgressBar currentStage={currentStage as any} />
        </div>

        {/* Mini Stage Stepper */}
        <div className="pt-2">
          <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block mb-2">
            Compact Mini Stage Bar
          </span>
          <MiniStageBarStepper stage={currentStage} />
        </div>

        {/* Vertical Dealroom Status Card */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block mb-2">
            Bilateral Dealroom Status Card (Vertical Timeline)
          </span>
          <BilateralDealroomStatusCard />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. INPUTS & SELECTS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function InputsSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Forms &amp; Controls
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Inputs, Selects &amp; Textareas
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Precision inputs with crisp 1px borders, subtle focus rings, and clear validation states.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <DSLabel>Standard Text Input</DSLabel>
            <DSInput placeholder="e.g. Enterprise Cloud Integration" />
          </div>

          <div className="space-y-2">
            <DSLabel>Search Input with Icon</DSLabel>
            <SearchInput placeholder="Search counterparties or deal codes..." />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <DSLabel>Bilateral Opportunity Memorandum (Textarea)</DSLabel>
            <DSTextarea rows={3} placeholder="Detail reciprocal requirements and commercial terms..." />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. HIGH-DENSITY DEAL TABLE SECTION
// ─────────────────────────────────────────────────────────────────────────────
function TableSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const sampleDeals = [
    {
      id: "deal-1",
      reference: "RY-0024",
      title: "European Cloud Distribution & DACH Access",
      counterparty: "Synthetix AI",
      location: "Zurich, CH",
      commercialTerm: "€420,000 / YR",
      statusBadge: (
        <SemanticStatusPill variant="success" showDot>
          Handshake Ratified (Stage 4)
        </SemanticStatusPill>
      ),
      action: {
        label: "View Dealroom",
        onClick: () => toast.success("Opening Dealroom for RY-0024"),
      },
    },
    {
      id: "deal-2",
      reference: "RY-0089",
      title: "Cross-Referral Pact: Mid-Market Salesforce",
      counterparty: "Vanguard Capital",
      location: "London, UK",
      commercialTerm: "4-6 Deals / Qtr",
      statusBadge: (
        <SemanticStatusPill variant="warning" showDot>
          Action Required (18h SLA)
        </SemanticStatusPill>
      ),
      action: {
        label: "Respond Now",
        onClick: () => toast.warning("Opening response editor for RY-0089"),
      },
    },
    {
      id: "deal-3",
      reference: "RY-0042",
      title: "Syndicated Compute Cloud Cluster",
      counterparty: "Apex Logistics AG",
      location: "Zurich, CH",
      commercialTerm: "2,000 GPU Hours",
      statusBadge: (
        <SemanticStatusPill variant="danger" showDot>
          Terminated: SLA Breached
        </SemanticStatusPill>
      ),
      action: {
        label: "View Breach Audit",
        variant: "secondary" as const,
        onClick: () => toast.error("Opening breach audit for RY-0042"),
      },
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Specification 04
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          High-Density Deal Table &amp; Rows
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Zero chromatic glare table layout presenting complex counterparties, terms, and action buttons cleanly.
        </p>
      </div>

      <ExecutiveDealTable deals={sampleDeals} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. CARDS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function CardsSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const mockOpp = {
    id: "opp-specimen",
    opportunity_number: "RY-0091",
    type: "Distribution",
    industry: "Fintech & Banking",
    geo: "United States",
    location: "New York, USA",
    offer_text: "Can offer direct banking sponsorship and merchant acquiring rails under strict non-circumvention covenants.",
    company: "Apex Global FinTech",
    title: "Tier-1 Enterprise Payment Gateway Integration",
    description: "Seeking high-throughput payment routing and gateway infrastructure partners for global cross-border treasury expansion.",
    interested: 4,
    views: 142,
    parityScore: 98,
    exchangesCompleted: 18,
    postedAt: "2h ago",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Data Containers
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Opportunity Cards &amp; Metric Widgets
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Standardized deal cards with collapsible details, verified tags, and reciprocal expectation callouts.
        </p>
      </div>

      <div className="space-y-6">
        <OpportunityCard
          opp={mockOpp}
          defaultOpen={false}
          onExpressInterest={() => toast.success("Express Interest Modal Triggered")}
          onSaveToggle={() => toast.info("Bookmark toggled")}
        />

        <div className="pt-6 border-t border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                Spec REL-OPP-09 · Immediate Attention Architecture
              </span>
              <h3 className="text-lg font-bold text-[#171F2C]">
                Immediate Attention Opportunity Cards (In-Situ Pipeline Context)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
              WCAG AAA Calibrated
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Purpose-built visual hierarchy to signal urgent bilateral turn ownership, binding SLA time windows, and required executive action without causing panic or visual glare in high-volume institutional deal pipelines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Urgent Amber */}
            <ImmediateAttentionCard
              variant="urgent-amber"
              deal={{
                id: "deal-var-1",
                requesting_business: { company_name: "Synthetix AI", is_verified: true },
                opportunity: {
                  opportunity_number: "RY-0042",
                  title: "European Cloud Distribution & DACH Enterprise Channel Access",
                  industry: "B2B SaaS / Infra",
                  deal_size_formatted: "€420,000 / YR",
                },
                workflow: {
                  slaText: "03h 42m Left",
                  pendingActionText: "Clause 8.2 Redline",
                  parityScore: 98,
                },
                message: "Counterparty revised exclusivity scope. Protocol requires your formal turn response before 18:00 UTC.",
              }}
              onViewMemorandum={() => toast.info("Opening Memorandum bottom sheet")}
            />

            {/* Card 2: Waiting on Counterparty */}
            <ImmediateAttentionCard
              variant="waiting-partner"
              deal={{
                id: "deal-var-2",
                requesting_business: { company_name: "Helix Life Sciences", is_verified: true },
                opportunity: {
                  opportunity_number: "RY-0056",
                  title: "Cellular Therapeutics IP Licensing & APAC Co-Development",
                  industry: "Pharma / BioTech",
                  deal_size_formatted: "$3,800,000 Cap",
                },
                workflow: {
                  slaText: "SLA: 22h remaining",
                  pendingActionText: "Legal Counsel Review",
                  parityScore: 91,
                },
                message: "Proposal submitted 4 hours ago. Helix primary signatory was notified and is currently performing initial diligence.",
              }}
              onViewMemorandum={() => toast.info("Opening Memorandum bottom sheet")}
            />

            {/* Card 3: Ratified Handshake */}
            <ImmediateAttentionCard
              variant="ratified-handshake"
              deal={{
                id: "deal-var-3",
                requesting_business: { company_name: "Beacon Logistics", is_verified: true },
                opportunity: {
                  opportunity_number: "RY-0088",
                  title: "North American Fleet Electrification Mandate & Depot Access",
                  industry: "Fleet & Mobility",
                  deal_size_formatted: "$18.2M Total Mandate",
                },
                workflow: {
                  escrowProof: "0x5c7f8921e201",
                  pendingActionText: "Bilateral escrow terms locked & sealed",
                  parityScore: 100,
                },
                message: "Sovereign digital handshake complete. Cryptographic token exchange verified under CDOE protocol.",
              }}
              onViewMemorandum={() => toast.info("Opening Memorandum bottom sheet")}
            />
          </div>
        </div>

        {/* ── NEW REQUEST SYSTEM CARDS (SPEC OPP-CARD-NEW-REQ) ─────────────── */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Opportunity Card — New Request System (Spec: OPP-CARD-NEW-REQ)
              </h3>
              <p className="text-xs text-slate-500">
                Enforces strict zero-leakage protocol: single decisive routing action (Exchange Hub →) with complete suppression of premature inline commitments.
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Stage 01 Triage
            </span>
          </div>

          {/* Primary Specimen: Full Width Expanded State */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Primary Specimen • Expanded Executive State
            </span>
            <NewRequestCard
              variant="expanded"
              request={{
                id: "req-hero-specimen",
                created_at: new Date(Date.now() - 1000 * 60 * 84).toISOString(),
                requesting_business: {
                  company_name: "Confidential Tier-1 IT Integrator",
                  industry: "Cloud Distribution",
                  hq_location: "Zurich / London",
                  is_verified: true,
                },
                opportunity: {
                  opportunity_number: "REQ-8942-EU",
                  title: "European Cloud Distribution & DACH Enterprise Channel",
                  category: "Channel Partnership",
                  offer_text: "Procurement Introductions (DACH Tier-1 MSA Accounts)",
                },
                workflow: {
                  parityScore: 98.4,
                  proposedDimension: "Distribution & Sales Channel Access",
                  proposedTerms: "Authorized Reseller + 20% Net Margin",
                  reciprocalTarget: "Procurement Introductions (28 Financial Institutions)",
                },
                message: "Our enterprise distribution syndicate holds active master vendor service agreements across 28 DACH financial institutions and can immediately syndicate your SOC-2 platform into live Q3 RFP pipelines.",
              }}
              onReviewPitch={(r) => toast.info(`Reviewing scope for ${r.id}`)}
            />
          </div>

          {/* Form Factors Comparison Grid: Compact Tile, High-Density Stream, Comparison Tile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
            {/* Variant A: Compact Tile */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Variant A • Compact Board Tile (380px)
              </span>
              <NewRequestCard
                variant="compact"
                request={{
                  id: "req-spec-compact",
                  created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
                  requesting_business: {
                    company_name: "Confidential Tier-1 Integrator",
                    is_verified: true,
                  },
                  opportunity: {
                    opportunity_number: "RY-8942",
                    title: "DACH Enterprise Procurement Syndicate",
                    category: "Channel Partnership",
                    offer_text: "28 Banking Introductions",
                  },
                  workflow: {
                    parityScore: 98.4,
                    proposedTerms: "20% Gross Margin Reseller",
                    reciprocalTarget: "28 Banking Introductions",
                  },
                  message: "Active master vendor agreements across 28 financial institutions in Zurich.",
                }}
                onReviewPitch={(r) => toast.info(`Viewing scope for ${r.id}`)}
              />
            </div>

            {/* Variant B: High-Density Stream Rows */}
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Variant B • High-Density Stream Rows (Fluid Width)
              </span>
              <div className="space-y-2.5">
                <NewRequestCard
                  variant="stream"
                  request={{
                    id: "req-stream-1",
                    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
                    requesting_business: { company_name: "Blinded Tier-1 Integrator (Zurich)", is_verified: true },
                    opportunity: {
                      opportunity_number: "REQ-8942",
                      title: "DACH Enterprise Cloud Channel Expansion",
                    },
                    workflow: {
                      parityScore: 98.4,
                      proposedTerms: "20% Reseller Margin",
                      slaRemainingHours: 46,
                    },
                  }}
                />
                <NewRequestCard
                  variant="stream"
                  request={{
                    id: "req-stream-2",
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString(),
                    requesting_business: { company_name: "Blinded Hyper-Scaler Partner (Stockholm)", is_verified: true },
                    opportunity: {
                      opportunity_number: "REQ-8919",
                      title: "Sovereign LLM Private Cluster Colocation Exchange",
                    },
                    workflow: {
                      parityScore: 94.1,
                      proposedTerms: "Compute Capacity Barter",
                      slaRemainingHours: 31,
                    },
                  }}
                />
                <NewRequestCard
                  variant="stream"
                  request={{
                    id: "req-stream-3",
                    created_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
                    requesting_business: { company_name: "Blinded Tier-1 Telecom Carrier", is_verified: true },
                    opportunity: {
                      opportunity_number: "REQ-8894",
                      title: "North America Telemetry Data Licensing Mandate",
                    },
                    workflow: {
                      parityScore: 91.8,
                      proposedTerms: "Annual Royalty Basis",
                      slaRemainingHours: 18,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Total Network Volume"
            value="$4.8M"
            change="+18.4%"
            trend="up"
          />
          <MetricCard
            title="Active Handshakes"
            value="34"
            change="+6"
            trend="up"
          />
          <MetricCard
            title="Median SLA Response"
            value="18h"
            change="Target 24h"
            trend="up"
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. TABS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function TabsSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const [activeSegment, setActiveSegment] = useState("received");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Navigation
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Executive Navigation Tabs
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Clean tabbed switchers available in pill, underline, and segmented styles.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 font-mono block">Segmented Switcher</span>
          <ExecutiveTabs
            variant="segmented"
            activeTab={activeSegment}
            onTabChange={setActiveSegment}
            tabs={[
              { id: "received", label: "Received Inquiries", count: 12 },
              { id: "sent", label: "Sent Proposals", count: 5 },
            ]}
          />
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 font-mono block">Underline Switcher</span>
          <ExecutiveTabs
            variant="underline"
            activeTab={activeSegment}
            onTabChange={setActiveSegment}
            tabs={[
              { id: "received", label: "Received Inquiries", count: 12 },
              { id: "sent", label: "Sent Proposals", count: 5 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. FLOATING TURN DOCK SECTION
// ─────────────────────────────────────────────────────────────────────────────
function DockSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const mockDockDeals = [
    {
      id: "dock-deal-1",
      title: "Tier-1 Enterprise Payment Gateway Integration",
      partnerName: "Apex Global FinTech",
      stage: "Stage 2: Negotiation",
      turnText: "Your Turn: Counter-proposal awaiting your response",
      slaText: "18h SLA remaining",
      direction: "inbound" as const,
      isVerified: true,
      lastActive: "15m ago",
    },
    {
      id: "dock-deal-2",
      title: "European Cloud Distribution",
      partnerName: "Synthetix AI",
      stage: "Stage 3: Agreement",
      turnText: "Your Turn: Confirm bilateral NDA & schedule handshake",
      slaText: "6h SLA remaining",
      direction: "outbound" as const,
      isVerified: true,
      lastActive: "1h ago",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Persistent Floating Widget
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Floating Turn Dock (Action SLA)
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Dock component that automatically highlights pending turns requiring user intervention across the network.
        </p>
      </div>

      <div className="p-6 bg-slate-100/70 border border-slate-200 rounded-2xl relative min-h-[360px] flex items-center justify-center">
        <FloatingTurnDock
          deals={mockDockDeals}
          onOpenDeal={(dealId) => toast.info(`Navigating to deal: ${dealId}`)}
          onDismiss={() => toast.info("Dock minimized")}
          className="relative bottom-auto right-auto shadow-xl"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. BILATERAL DETAIL SHEET SECTION
// ─────────────────────────────────────────────────────────────────────────────
function SheetSection({ onCopy, copiedCode }: { onCopy: (c: string, id: string) => void; copiedCode: string | null }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const mockDeal = {
    id: "deal-101",
    direction: "inbound",
    status: "pending",
    message: "We would like to introduce a leading fintech client looking for enterprise payments.",
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    workflow: {
      partnerName: "Apex Global FinTech",
      isVerified: true,
      stageNum: 1,
    },
    opportunity: {
      title: "Tier-1 Enterprise Payment Gateway Integration",
      category: "strategic_advice",
      industry: "FinTech & Banking",
      location: "New York, USA",
      deal_size_formatted: "$100,000 - $250,000",
      description: "Seeking high-throughput payment routing and gateway infrastructure partners for global treasury expansion.",
      offer_text: "Can offer direct banking sponsorship and merchant acquiring rails under strict CDOE covenants.",
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Drawer / Modal Container
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Bilateral Opportunity Detail Bottom Sheet
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Unified 90% height bottom sheet used across Inbound, Outbound, Received, and Sent opportunity views.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-[#171F2C]">
          Test Live Bilateral Detail Sheet (90% Height)
        </h3>
        <p className="text-xs text-[#64748B] max-w-md mx-auto">
          Opens the bottom drawer containing the 4-stage stepper, reciprocal expectations, partner metadata, and exchange hub actions.
        </p>
        <Button
          variant="monochrome"
          size="md"
          onClick={() => setSheetOpen(true)}
          className="gap-2 mx-auto"
        >
          <Maximize2 className="w-4 h-4" />
          <span>Open Live Detail Sheet</span>
        </Button>
      </div>

      <BilateralOpportunityDetailSheet
        deal={mockDeal}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onOpenExchangeHub={(dealId) => {
          toast.success(`Opening Exchange Hub for ${dealId}`);
          setSheetOpen(false);
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. BILATERAL EXCHANGE ACTIVITY MODAL SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ExchangeActivityModalSection({
  onCopy,
  copiedCode,
}: {
  onCopy: (c: string, id: string) => void;
  copiedCode: string | null;
}) {
  const [activeModalData, setActiveModalData] = useState<ExchangeActivityModalData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const scenarios: {
    id: string;
    title: string;
    stage: string;
    description: string;
    data: ExchangeActivityModalData;
  }[] = [
    {
      id: "interest",
      title: "1. Expressed Interest (Party A → Party B)",
      stage: "Stage 1: Clearance",
      description: "Triggered when Party A expresses interest on Party B's opportunity. Party B receives this modal.",
      data: {
        eventType: "interest_received",
        partnerName: "Apex Global FinTech",
        partnerIsVerified: true,
        opportunityTitle: "Tier-1 Enterprise Payment Gateway Integration",
        stageNum: 1,
        details: "We have 12 enterprise clients needing high-volume payment processing rails. Can offer immediate referral volume.",
        timestamp: "Just now",
      },
    },
    {
      id: "ack",
      title: "2. Protocol Acknowledged (Party B → Party A)",
      stage: "Stage 2: Negotiation",
      description: "Triggered when Party B acknowledges. Party A receives modal stating exchange moved to Stage 2 Negotiation.",
      data: {
        eventType: "acknowledged",
        partnerName: "Nexus Enterprise Solutions",
        partnerIsVerified: true,
        opportunityTitle: "Tier-1 Enterprise Payment Gateway Integration",
        stageNum: 2,
        details: "Nexus Enterprise Solutions has reviewed your pitch and acknowledged Relay exchange protocol. Mutual negotiation unlocked.",
        timestamp: "Just now",
      },
    },
    {
      id: "proposal",
      title: "3. Proposal / Counter-Offer Received",
      stage: "Stage 2: Negotiation",
      description: "Triggered when counterparty submits proposed terms or counter-proposal in negotiation.",
      data: {
        eventType: "proposal_received",
        partnerName: "Apex Global FinTech",
        partnerIsVerified: true,
        opportunityTitle: "B2B SaaS Cross-Selling Network",
        stageNum: 2,
        details: "Offered 8.5% recurring revenue share on closed pipeline contracts for 12 months.",
        timestamp: "2 mins ago",
      },
    },
    {
      id: "declined",
      title: "4. Proposal Rejected / Declined",
      stage: "Stage 2: Negotiation",
      description: "Triggered when counterparty declines an offer with reason notes.",
      data: {
        eventType: "proposal_declined",
        partnerName: "Vanguard Growth Partners",
        partnerIsVerified: true,
        opportunityTitle: "Healthcare Logistics Fleet Distribution",
        stageNum: 2,
        details: "Decline Reason: Terms not aligned. Seeking minimum 12% revenue share or upfront retainer.",
        timestamp: "10 mins ago",
      },
    },
    {
      id: "agreement",
      title: "5. Proposal Accepted / Agreement Phase",
      stage: "Stage 3: Agreement",
      description: "Triggered when proposal is accepted. Both parties proceed to final sovereign confirmation.",
      data: {
        eventType: "agreement_ready",
        partnerName: "Nexus Enterprise Solutions",
        partnerIsVerified: true,
        opportunityTitle: "Enterprise AI Security Audit Co-Marketing",
        stageNum: 3,
        details: "Terms accepted: 10% Revenue share + Co-branded whitepaper placement. Counter-signature required.",
        timestamp: "Just now",
      },
    },
    {
      id: "contact",
      title: "6. Contact Sharing Requested / Handshake",
      stage: "Stage 4: Reveal",
      description: "Triggered when counterparty shares phone/email/LinkedIn for bilateral executive introduction.",
      data: {
        eventType: "contact_approved",
        partnerName: "Apex Global FinTech",
        partnerIsVerified: true,
        opportunityTitle: "Tier-1 Enterprise Payment Gateway Integration",
        stageNum: 4,
        details: "Direct C-suite contact coordinates revealed: Phone + Direct Email unlocked in Exchange Hub.",
        timestamp: "Just now",
      },
    },
  ];

  const handleLaunchModal = (data: ExchangeActivityModalData) => {
    setActiveModalData(data);
    setModalOpen(true);
  };

  const sampleCode = `// Launch Exchange Activity Popup Modal from anywhere
import { showExchangeActivityModal } from "@/design-system";

showExchangeActivityModal({
  eventType: "interest_received", // "acknowledged" | "proposal_received" | "agreement_ready" | "contact_approved"
  partnerName: "Apex Global FinTech",
  partnerIsVerified: true,
  opportunityTitle: "Tier-1 Enterprise Payment Gateway Integration",
  stageNum: 1,
  details: "We have 12 enterprise clients needing high-volume payment processing rails.",
  timestamp: "Just now",
});`;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
          Bilateral Dealroom Overlay
        </span>
        <h1 className="text-2xl font-bold text-[#171F2C] tracking-tight mt-0.5">
          Exchange Activity Action Modal
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Real-time executive popup modal displayed to counterparty when any action is taken across the 4-stage exchange lifecycle (Interest, Acknowledged, Counter-Offer, Rejected, Agreement, Contact Reveal). Features exactly 2 action buttons: <strong>Close</strong> and <strong>Exchange Hub &gt;</strong>.
        </p>
      </div>

      {/* Interactive Scenario Launchers */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
          Interactive Scenario Triggers
        </h3>
        <p className="text-xs text-slate-500">
          Click any scenario button below to launch the live modal with full stage context, counterparty pill, and dual actions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="border border-slate-200 hover:border-slate-300 rounded-[4px] p-4 flex flex-col justify-between space-y-3 bg-slate-50/40 hover:bg-slate-50 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-slate-500">
                    {sc.stage}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <h4 className="font-sans text-xs font-bold text-slate-900">
                  {sc.title}
                </h4>
                <p className="font-sans text-[11px] text-slate-500 leading-normal">
                  {sc.description}
                </p>
              </div>

              <Button
                variant="authoritative"
                size="sm"
                onClick={() => handleLaunchModal(sc.data)}
                className="w-full text-xs font-mono font-semibold uppercase tracking-wider justify-between bg-slate-900 hover:bg-slate-800 text-white"
              >
                <span>Launch Modal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-[#0F172A] rounded-xl p-5 text-white space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Usage & Integration
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(sampleCode, "modal-code")}
            className="h-7 px-2.5 text-[10px] font-mono uppercase bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
          >
            {copiedCode === "modal-code" ? (
              <>
                <Check className="w-3 h-3 text-emerald-400 mr-1" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" /> Copy Code
              </>
            )}
          </Button>
        </div>
        <pre className="text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
          {sampleCode}
        </pre>
      </div>

      {/* Live Modal Render Instance */}
      {activeModalData && (
        <ExchangeActivityModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          data={activeModalData}
          onClose={() => setModalOpen(false)}
          onOpenExchangeHub={(interestId, data) => {
            toast.success("Exchange Hub Selected", {
              description: `Navigating to bilateral dealroom for "${data?.opportunityTitle || "Opportunity"}"`,
            });
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
