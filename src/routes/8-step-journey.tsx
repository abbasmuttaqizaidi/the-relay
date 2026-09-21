import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Lock,
  Building2,
  FileCheck,
  Handshake,
  Shield,
  Layers,
  Sparkles,
  Network,
  Users,
  Repeat,
} from "lucide-react";
import { createSeoMeta, SITE_URL } from "@/lib/seo";
import { journeyIllustrations } from "@/components/journey-illustrations";

interface StepSpec {
  label: string;
  desc: string;
}

interface StepData {
  index: number;
  number: string;
  name: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  diagramLabel: string;
  caption: string;
  cdoesStatus: string;
  specs: StepSpec[];
}

const STEPS_DATA: StepData[] = [
  {
    index: 0,
    number: "01",
    name: "Verify",
    phase: "PHASE 01 • ACCREDITATION",
    title: "01. Verify",
    subtitle: "Join a network of verified businesses.",
    description:
      "Create your profile and complete B2B business verification so counterparties negotiate with verified peers only. Relay audits statutory corporate validity (KYB & LEI) prior to granting marketplace participation.",
    diagramLabel: "DIAGRAM • ACCREDITATION",
    caption: "Cryptographic KYB & LEI Business Verification",
    cdoesStatus: "Identity Protected",
    specs: [
      { label: "KYB & LEI Check", desc: "Enterprise entity validation" },
      { label: "Signatory Verify", desc: "Executive authority confirm" },
      { label: "Zero Solicitations", desc: "No cold outbound spam" },
    ],
  },
  {
    index: 1,
    number: "02",
    name: "Post",
    phase: "PHASE 02 • LISTING DISCRETION",
    title: "02. Post",
    subtitle: "Put an opportunity on the table.",
    description:
      "Share a commercial opportunity, out-of-scope lead, referral requirement, distribution channel, or strategic partnership in our B2B opportunity exchange without exposing proprietary trademarks or sensitive client records.",
    diagramLabel: "DIAGRAM • BLIND LISTING",
    caption: "Blinded Deal Specification & Parameters",
    cdoesStatus: "Identifiers Masked",
    specs: [
      { label: "Masked Entity", desc: "No competitor tipping" },
      { label: "Parameter Bounds", desc: "Clear value & scope tags" },
      { label: "Underwriting Check", desc: "Curated deal quality" },
    ],
  },
  {
    index: 2,
    number: "03",
    name: "Discover",
    phase: "PHASE 03 • MARKET DISCOVERY",
    title: "03. Discover",
    subtitle: "Find opportunities worth exploring.",
    description:
      "Conduct structured B2B opportunity discovery across commercial categories by deal size, scope, geography, and industry sector without alerting competitors or triggering market rumors.",
    diagramLabel: "DIAGRAM • BILATERAL DISCOVERY",
    caption: "Parametric Filtering & Discovery Engine",
    cdoesStatus: "Blinded Discovery",
    specs: [
      { label: "Multi-Filter Grid", desc: "Search deal sizes & sectors" },
      { label: "Zero Scraping", desc: "Bot & crawlers eliminated" },
      { label: "High Relevancy", desc: "Accredited peer counterparties" },
    ],
  },
  {
    index: 3,
    number: "04",
    name: "Express Interest",
    phase: "PHASE 04 • STRUCTURED INTENT",
    title: "04. Express Interest",
    subtitle: "Signal interest with structured intent.",
    description:
      "Signal mutual interest with a focused commercial proposal explaining why your business is relevant. Unsolicited outreach and aggressive sales pitching are structurally prevented by protocol design.",
    diagramLabel: "DIAGRAM • INTENT SUBMISSION",
    caption: "Structured Mutual Fit Application",
    cdoesStatus: "Intent Stamped",
    specs: [
      { label: "Structured Form", desc: "Formal relevancy statement" },
      { label: "Capability Proof", desc: "Vetted peer capability" },
      { label: "Discreet Delivery", desc: "Direct to decision-maker" },
    ],
  },
  {
    index: 4,
    number: "05",
    name: "Acknowledge",
    phase: "PHASE 05 • CDOES GATEWAY",
    title: "05. Acknowledge",
    subtitle: "Both sides understand the exchange.",
    description:
      "Where CDOES activates: mutual consent, bilateral alignment, and controlled disclosure before any corporate identity or value reveal occurs. Both parties formally acknowledge mutual fit.",
    diagramLabel: "DIAGRAM • CONSENT GATEWAY",
    caption: "CDOES Mutual Consent Protocol Activation",
    cdoesStatus: "CDOES Gateway Active",
    specs: [
      { label: "Bilateral Gate", desc: "Two-way verified handshake" },
      { label: "Pre-Reveal Consent", desc: "Explicit assent required" },
      { label: "Zero Leakage", desc: "Identities remain blind" },
    ],
  },
  {
    index: 5,
    number: "06",
    name: "Negotiate",
    phase: "PHASE 06 • BILATERAL ALIGNMENT",
    title: "06. Negotiate",
    subtitle: "Decide what the exchange means to both sides.",
    description:
      "Conduct commercial negotiation within parameterized bounds to agree on commercial terms (e.g., Lead ↔ Rev Share %, Referral ↔ Referral, Distribution ↔ Reseller) with total transparency.",
    diagramLabel: "DIAGRAM • VALUE RATIO MATRIX",
    caption: "Parametric Bilateral Counter-Offers",
    cdoesStatus: "Protected Terms",
    specs: [
      { label: "Terms Builder", desc: "Flexible reciprocal structures" },
      { label: "Counter-Offers", desc: "Structured terms revisions" },
      { label: "Real-Time Balance", desc: "Equal symmetry check" },
    ],
  },
  {
    index: 6,
    number: "07",
    name: "Agree",
    phase: "PHASE 07 • BILATERAL ACCORD",
    title: "07. Agree",
    subtitle: "Confirm the exact exchange terms.",
    description:
      "Both businesses independently confirm the final bilateral commercial agreement. No assumed value. Double digital sign-off locks non-circumvention terms before contact disclosure occurs.",
    diagramLabel: "DIAGRAM • DOUBLE ASSENT",
    caption: "Simultaneous Multi-Party Sign-Off",
    cdoesStatus: "Assent Locked",
    specs: [
      { label: "Double Sign-Off", desc: "Independent confirmation" },
      { label: "Term Locking", desc: "No scope or pricing drift" },
      { label: "Enforceable Accord", desc: "Protocol arbitration ready" },
    ],
  },
  {
    index: 7,
    number: "08",
    name: "Handshake",
    phase: "PHASE 08 • UNMASK & EXECUTION",
    title: "08. Handshake",
    subtitle: "Connect and take it forward.",
    description:
      "Both businesses consent to unlock verified executive contact details. Relay facilitates the connection; counterparties execute their commercial relationship directly and unmediated.",
    diagramLabel: "DIAGRAM • DIRECT UNMASKING",
    caption: "Contact Unlocked & Sovereign Execution",
    cdoesStatus: "Contacts Unlocked",
    specs: [
      { label: "Direct Contacts", desc: "Executive email & phone" },
      { label: "Relay Steps Out", desc: "Sovereign direct execution" },
      { label: "Reputation Boost", desc: "Network reciprocity score +" },
    ],
  },
];

export const Route = createFileRoute("/8-step-journey")({
  head: () =>
    createSeoMeta({
      title: "How a B2B Opportunity Exchange Works | The Relay",
      description:
        "Learn how a B2B opportunity exchange works through The Relay's 8-step workflow, from verification and discovery to interest, negotiation, agreement, and connection.",
      path: "/8-step-journey",
    }),
  component: EightStepJourneyPage,
});

export function EightStepJourneyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);

  const step = STEPS_DATA[currentStep];

  const goToStep = useCallback((idx: number) => {
    setIsImageFading(true);
    setTimeout(() => {
      setCurrentStep(idx);
      setIsImageFading(false);
    }, 120);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const nextIdx = prev < 7 ? prev + 1 : 0;
      goToStep(nextIdx);
      return nextIdx;
    });
  }, [goToStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      const prevIdx = prev > 0 ? prev - 1 : 0;
      goToStep(prevIdx);
      return prevIdx;
    });
  }, [goToStep]);

  const toggleAutoPlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Autoplay timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        nextStep();
      }, 4500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, nextStep]);

  // Keyboard navigation for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextStep();
      } else if (e.key === "ArrowLeft") {
        prevStep();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep, prevStep]);

  const progressPercent = ((currentStep + 1) / 8) * 100;

  const scrollToMobileStep = (num: string) => {
    const el = document.getElementById(`mobile-step-${num}`);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/8-step-journey#webpage`,
        url: `${SITE_URL}/8-step-journey`,
        name: "How a B2B Opportunity Exchange Works | The Relay",
        description:
          "Learn how a B2B opportunity exchange works through The Relay's 8-step workflow, from verification and discovery to interest, negotiation, agreement, and connection.",
        breadcrumb: {
          "@id": `${SITE_URL}/8-step-journey#breadcrumb`,
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "The Relay",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/8-step-journey#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Platform",
            item: `${SITE_URL}/solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "8-Step Workflow",
            item: `${SITE_URL}/8-step-journey`,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "The Relay",
        url: SITE_URL,
      },
    ],
  };

  return (
    <div className="bg-[#F8FAFC] font-sans text-[#171F2C] antialiased min-h-screen flex flex-col justify-between selection:bg-[#171F2C] selection:text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full pt-8 pb-20 flex-1">
        
        {/* ═══════════════════════════════════════════════════════════════════
            1. HERO SECTION & WORKFLOW CONTEXT
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-2 pb-8">
          <div className="flex flex-col gap-3.5">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#64748B] uppercase tracking-[0.04em]"
            >
              <Link to="/" className="hover:text-[#171F2C] transition-colors">
                Platform
              </Link>
              <span className="text-[#94A3B8]">/</span>
              <span className="text-[#64748B]">Workflow</span>
              <span className="text-[#94A3B8]">/</span>
              <span className="text-[#171F2C] font-bold">8-Step Journey</span>
            </nav>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171F2C]">
              How The Relay Works
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-[#171F2C]">
              From commercial opportunity to handshake — without the noise.
            </p>
            <p className="text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed">
              Learn how a B2B opportunity exchange works step-by-step through our consent-driven{" "}
              <Link
                to="/b2b-opportunity-exchange"
                className="text-[#171F2C] underline underline-offset-2 hover:text-[#000000] font-medium"
              >
                B2B opportunity exchange workflow
              </Link>
              . Whether managing a B2B lead exchange process or initiating a strategic B2B partnership process, this 8-step framework gives verified enterprises complete control at every milestone without premature identity exposure, data leakage, or unsolicited cold outreach.
            </p>

            {/* Introductory SEO Context Box */}
            <div className="mt-4 p-5 rounded-[4px] bg-white border border-[#E2E8F0] text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                  Protocol Architecture
                </span>
                <span className="text-[#94A3B8]">•</span>
                <h2 className="text-xs font-bold text-[#171F2C]">
                  How the B2B Opportunity Exchange Workflow Works
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                The Relay organizes commercial opportunity discovery into a structured sequence that moves from{" "}
                <Link to="/trust-and-safety" className="text-[#171F2C] underline hover:text-[#000000]">
                  business verification
                </Link>{" "}
                and opportunity posting through discovery, interest, acknowledgment, negotiation, agreement, and direct commercial connection. Separating discovery from negotiation and agreement ensures every exchange is verified, uncompromised, and spam-free.
              </p>
            </div>
          </div>

          {/* DESKTOP: Clickable 8-Step Navigation Bar (hidden on mobile) */}
          <div className="mt-8 hidden lg:block">
            <div className="flex items-center justify-between overflow-x-auto gap-2 p-1.5 bg-white border border-[#E2E8F0] rounded-[4px]">
              {STEPS_DATA.map((s, idx) => {
                const isActive = idx === currentStep;
                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => goToStep(idx)}
                    className={`flex-1 min-w-[105px] py-2 px-3 rounded-[4px] text-xs font-semibold text-left transition-all flex flex-col gap-0.5 cursor-pointer ${
                      isActive
                        ? "bg-[#171F2C] text-white border border-[#171F2C]"
                        : "border border-transparent hover:border-[#E2E8F0] text-[#64748B] hover:text-[#171F2C] bg-white hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span
                      className={`text-[10px] uppercase font-mono tracking-wider ${
                        isActive ? "text-[#94A3B8]" : "text-[#94A3B8]"
                      }`}
                    >
                      Step {s.number}
                    </span>
                    <span className="truncate font-semibold">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE: Quick-Jump Step Pills (visible only on < lg) */}
          <div className="mt-6 block lg:hidden overflow-x-auto scrollbar-none pb-1">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-white border border-[#E2E8F0] rounded-[4px]">
              {STEPS_DATA.map((s) => {
                const isActive = s.index === currentStep;
                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => scrollToMobileStep(s.number)}
                    className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      isActive
                        ? "text-white bg-[#171F2C] border border-[#171F2C]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] border border-transparent"
                    }`}
                  >
                    <span>{s.number}.</span>
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            2. DESKTOP VIEW: INTERACTIVE 2-COLUMN SLIDESHOW (LG SCREENS)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-12 hidden lg:block">
          <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden flex flex-col">
            {/* Progress Indicator Bar */}
            <div className="w-full bg-[#F8FAFC] h-1.5 relative overflow-hidden border-b border-[#E2E8F0]">
              <div
                className="h-full bg-[#171F2C] transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Main Slide Content Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Visual Illustration Canvas (Left) */}
              <div className="lg:col-span-6 bg-[#F8FAFC] border-b lg:border-b-0 lg:border-r border-[#E2E8F0] p-6 sm:p-10 flex flex-col items-center justify-center relative select-none">
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#64748B] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-[4px]">
                  <span className="w-1.5 h-1.5 rounded-[2px] bg-[#171F2C]"></span>
                  <span>{step.diagramLabel}</span>
                </div>

                <div className="w-full h-full max-w-[440px] aspect-[16/10] flex items-center justify-center transition-all duration-300">
                  <div
                    className={`w-full h-full transition-opacity duration-200 ${
                      isImageFading ? "opacity-30 scale-98" : "opacity-100 scale-100"
                    }`}
                  >
                    {(() => {
                      const StepIllustration = journeyIllustrations[currentStep];
                      return (
                        <StepIllustration className="w-full h-full object-contain rounded-[4px]" />
                      );
                    })()}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-[#64748B]">
                  <ShieldCheck className="w-4 h-4 text-[#171F2C] shrink-0" />
                  <span className="font-mono text-[11px]">{step.caption}</span>
                </div>
              </div>

              {/* Stage Details & Specifications (Right) */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                    <span className="px-2.5 py-1 rounded-[4px] text-[10.5px] font-bold tracking-wider uppercase bg-[#171F2C] text-white font-mono">
                      {step.phase}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#171F2C] bg-[#F8FAFC] px-2.5 py-1 rounded-[4px] border border-[#E2E8F0]">
                      {step.number} / 08
                    </span>
                  </div>

                  {/* Slide Headline & Body */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171F2C] font-display">
                      {step.title}
                    </h3>
                    <p className="text-base font-semibold text-[#64748B]">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-[#64748B] leading-relaxed pt-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Protocol Specs Micro Cards */}
                  <div className="pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#171F2C] mb-2 font-mono">
                      Bilateral Protocol Covenants
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {step.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="p-2.5 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC]"
                        >
                          <p className="text-[11px] font-semibold text-[#171F2C]">
                            {spec.label}
                          </p>
                          <p className="text-[10px] text-[#64748B] mt-0.5 leading-snug">
                            {spec.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Carousel Navigation Controls Bar */}
                <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentStep === 0}
                      onClick={prevStep}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] border border-[#E2E8F0] bg-white text-xs font-semibold text-[#171F2C] hover:bg-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-[#171F2C] text-white text-xs font-semibold hover:bg-[#1E293B] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <span>{currentStep === 7 ? "Restart" : "Next Step"}</span>
                      {currentStep === 7 ? (
                        <RotateCcw className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleAutoPlay}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] border text-xs transition-colors cursor-pointer ${
                        isPlaying
                          ? "border-[#171F2C] bg-[#171F2C] text-white"
                          : "border-[#E2E8F0] text-[#64748B] hover:text-[#171F2C] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-3 h-3" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                      <span className="font-medium text-[11px]">
                        {isPlaying ? "Pause" : "Auto-advance"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            3. MOBILE VIEW: VERTICAL TIMELINE UI (< LG SCREENS)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full px-4 sm:px-6 mb-16 block lg:hidden relative">
          {/* Vertical Spine */}
          <div className="absolute left-7 sm:left-9 top-4 bottom-8 w-0.5 bg-[#E2E8F0] z-0" />

          {/* Timeline Items */}
          <div className="space-y-8 relative z-10">
            {STEPS_DATA.map((s, idx) => {
              const StepIllustration = journeyIllustrations[idx];

              return (
                <div
                  key={s.number}
                  id={`mobile-step-${s.number}`}
                  className="relative flex items-start gap-3.5 sm:gap-5"
                >
                  {/* Timeline Node Badge */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-[4px] flex items-center justify-center font-mono font-bold text-xs sm:text-sm tracking-wider bg-[#171F2C] text-white border border-[#171F2C]">
                      {s.number}
                    </div>
                  </div>

                  {/* Timeline Card */}
                  <div className="flex-1 rounded-[4px] p-4 sm:p-5 bg-white text-[#171F2C] border border-[#E2E8F0]">
                    <h3 className="text-base font-bold font-display tracking-tight text-[#171F2C]">
                      {s.number}. {s.name}
                    </h3>
                    <p className="text-xs font-medium text-[#64748B] mt-0.5 mb-3">
                      {s.subtitle}
                    </p>

                    <div className="p-3 rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] mb-3">
                      <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider block mb-1 text-[#171F2C]">
                        Protocol Action
                      </span>
                      <p className="text-xs leading-relaxed font-sans">
                        {s.description}
                      </p>
                    </div>

                    <div className="w-full aspect-[16/9] max-h-[190px] flex items-center justify-center bg-white rounded-[4px] p-1.5 border border-[#E2E8F0] overflow-hidden">
                      <StepIllustration className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            4. WHY THE 8-STEP STRUCTURE MATTERS (REQUIRED SECTION)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-12 border-t border-[#E2E8F0]">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Architectural Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                Why the 8-Step Structure Matters
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-3xl leading-relaxed">
                By intentionally separating business verification, opportunity posting, discovery, interest evaluation, acknowledgment, commercial negotiation, bilateral agreement, and final handshake, The Relay enforces a structured{" "}
                <Link to="/b2b-opportunity-exchange" className="text-[#171F2C] underline hover:text-[#000000]">
                  B2B opportunity exchange workflow
                </Link>
                . This ensures mutual consent, prevents premature data leakage, and establishes sovereign commercial relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Inside Relay */}
              <div className="p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] bg-white flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#171F2C]"></span>
                    <h3 className="text-base font-bold text-[#171F2C] font-display">Inside The Relay Protocol</h3>
                  </div>
                  <p className="text-xs text-[#64748B] mb-4 uppercase tracking-wider font-mono font-medium">
                    Gated Bilateral Security
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#64748B]">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>Blinded opportunity discovery with verified business credentials</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>Structured bilateral consent before any contact disclosure</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>Digital bilateral non-circumvention terms locked in Stage 7</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#171F2C]">
                  Protocol Level: 100% Gated &amp; Blinded
                </div>
              </div>

              {/* Outside Relay */}
              <div className="p-6 sm:p-7 rounded-[4px] border border-[#E2E8F0] bg-white flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#171F2C]"></span>
                    <h3 className="text-base font-bold text-[#171F2C] font-display">Outside The Relay Protocol</h3>
                  </div>
                  <p className="text-xs text-[#64748B] mb-4 uppercase tracking-wider font-mono font-medium">
                    Direct Commercial Execution
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#64748B]">
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>Direct executive email lines and phone contacts unlocked</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>Sovereign contracts, invoices, and service agreements executed directly</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ArrowRight className="w-4 h-4 text-[#171F2C] shrink-0 mt-0.5" />
                      <span>Long-term unmediated commercial partnerships and referral networks</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#171F2C]">
                  Execution Level: Sovereign &amp; Unmediated
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            5. WHAT BUSINESSES CAN USE THE RELAY FOR (RELATED USE CASES)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-12 border-t border-[#E2E8F0]">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#64748B]">
                Supported Exchange Models
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#171F2C] tracking-tight">
                What Businesses Can Use The Relay For
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-3xl leading-relaxed">
                The 8-step workflow accommodates various commercial exchange and partnership models across B2B verticals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/b2b-lead-exchange"
                className="p-5 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                      Lead Monetization
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                    B2B Lead Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Route out-of-scope client requirements for contracted rev-shares.
                  </p>
                </div>
              </Link>

              <Link
                to="/referral-partnerships"
                className="p-5 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                      Referral Network
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                    Referral Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Establish bilateral referral arrangements with non-competing peers.
                  </p>
                </div>
              </Link>

              <Link
                to="/b2b-partnership-network"
                className="p-5 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                      Strategic Alliances
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                    B2B Partnership Network
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Source co-selling partners and cross-sector commercial alliances.
                  </p>
                </div>
              </Link>

              <Link
                to="/channel-partnerships"
                className="p-5 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                      Channel Scale
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                    Channel Partnerships
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Scale commercial distribution via value-added resellers and integrators.
                  </p>
                </div>
              </Link>

              <Link
                to="/distribution-partners"
                className="p-5 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                      Market Access
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                    Distribution Partners
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Connect with specialized distributors and regional commercial partners.
                  </p>
                </div>
              </Link>

              <Link
                to="/agency-lead-exchange"
                className="p-5 rounded-[4px] bg-white border border-[#E2E8F0] hover:border-[#171F2C] transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">
                      Agency Capacity
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-[#171F2C] group-hover:underline">
                    Agency Lead Exchange
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Monetize out-of-scope agency briefs and source trusted execution peers.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            6. EXECUTIVE CTA SECTION (MONOCHROME EXECUTIVE)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4">
          <div className="py-12 px-6 sm:px-10 rounded-[4px] border border-[#171F2C] bg-[#171F2C] text-white text-center flex flex-col items-center gap-4">
            <span className="inline-flex text-[11px] font-mono font-bold uppercase tracking-[0.04em] text-[#94A3B8] bg-[#112030] px-3 py-1 rounded-[4px] border border-slate-700">
              Verified Bilateral Exchange
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              Ready to experience the 8-step journey?
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md leading-relaxed">
              Turn unfulfillable commercial opportunities into verified reciprocal partnerships.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
              <Link
                to="/opportunities"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#171F2C] rounded-[4px] text-xs sm:text-sm font-bold hover:bg-[#F8FAFC] transition-all cursor-pointer"
              >
                <span>Explore Live Opportunities</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link
                to="/core-pillars"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#171F2C] hover:bg-[#1E293B] text-white border border-slate-700 rounded-[4px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Read Core Pillars &amp; CDOES
              </Link>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#94A3B8] font-mono">
              <Link to="/trust-and-safety" className="hover:text-white underline underline-offset-4 transition-colors">
                Trust &amp; Safety Protocols
              </Link>
              <span>•</span>
              <Link to="/faq" className="hover:text-white underline underline-offset-4 transition-colors">
                View Protocol FAQ &amp; Standards
              </Link>
              <span>•</span>
              <Link to="/solutions" className="hover:text-white underline underline-offset-4 transition-colors">
                Solutions Directory
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          7. CLEAN MONOCHROME FOOTER
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 text-sm border-b border-[#E2E8F0]">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C]">
                Architecture
              </span>
              <Link to="/core-pillars" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                Core Principles
              </Link>
              <Link to="/8-step-journey" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                8-Step Workflow
              </Link>
              <Link to="/b2b-opportunity-exchange" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                Opportunity Exchange
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C]">
                Solutions
              </span>
              <Link to="/b2b-lead-exchange" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                B2B Lead Exchange
              </Link>
              <Link to="/referral-partnerships" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                Referral Partnerships
              </Link>
              <Link to="/b2b-partnership-network" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                B2B Partnership Network
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C]">
                Governance
              </span>
              <Link to="/trust-and-safety" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                KYB Verification Desk
              </Link>
              <Link to="/trust-and-safety" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                Controlled Disclosure
              </Link>
              <Link to="/faq" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                Protocol FAQ
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171F2C]">
                Company
              </span>
              <Link to="/about" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                About The Relay
              </Link>
              <Link to="/solutions" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                All Solutions
              </Link>
              <Link to="/opportunities" className="text-xs text-[#64748B] hover:text-[#171F2C] transition-colors">
                Live Opportunities
              </Link>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <p>© 2025 The Relay. All rights reserved. Zero Cold Outreach Protocol.</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-[#171F2C]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#171F2C]" />
                100% Verified Protocol
              </span>
              <span>•</span>
              <span>Sovereign Execution</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
