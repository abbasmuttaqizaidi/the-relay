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
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

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
  cdoesColor: string;
  specs: StepSpec[];
}

const STEPS_DATA: StepData[] = [
  {
    index: 0,
    number: "01",
    name: "Verify",
    phase: "PHASE 01 • ACCREDITATION",
    title: "01. VERIFY",
    subtitle: "Join a network of verified businesses.",
    description:
      "Create your profile and complete verification so counterparties negotiate with verified peers only. Relay screens organizational validity prior to granting marketplace participation.",
    diagramLabel: "DIAGRAM • ACCREDITATION",
    caption: "Cryptographic KYB & LEI Verification",
    cdoesStatus: "Identity Protected",
    cdoesColor: "bg-emerald-600",
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
    title: "02. POST",
    subtitle: "Put an opportunity on the table.",
    description:
      "Share a lead, referral, distribution channel, hiring requirement, or strategic partnership without exposing proprietary identifiers. Keep sensitive client data shielded.",
    diagramLabel: "DIAGRAM • BLIND LISTING",
    caption: "Blinded Deal Specification & Parameters",
    cdoesStatus: "Identifiers Masked",
    cdoesColor: "bg-emerald-600",
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
    title: "03. DISCOVER",
    subtitle: "Find opportunities worth exploring.",
    description:
      "Browse and filter verified opportunities across categories by deal size, scope, geography, and industry without alerting competitors or triggering market rumors.",
    diagramLabel: "DIAGRAM • BILATERAL MATCHING",
    caption: "Parametric Filtering & Match Engine",
    cdoesStatus: "Blinded Discovery",
    cdoesColor: "bg-blue-600",
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
    title: "04. EXPRESS INTEREST",
    subtitle: "Signal interest with structured intent.",
    description:
      "Send a focused proposal explaining why your business is relevant. Unsolicited outreach and aggressive sales pitching are strictly prevented by protocol design.",
    diagramLabel: "DIAGRAM • INTENT SUBMISSION",
    caption: "Structured Mutual Fit Application",
    cdoesStatus: "Intent Stamped",
    cdoesColor: "bg-blue-600",
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
    title: "05. ACKNOWLEDGE",
    subtitle: "Both sides understand the exchange.",
    description:
      "Where CDOES activates: mutual clarity, bilateral consent, and explicit alignment before any identity or value reveal occurs. Both parties acknowledge mutual fit.",
    diagramLabel: "DIAGRAM • CONSENT GATEWAY",
    caption: "CDOES Mutual Consent Protocol Activation",
    cdoesStatus: "CDOES Gateway Active",
    cdoesColor: "bg-indigo-600",
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
    title: "06. NEGOTIATE",
    subtitle: "Decide what the exchange means to both sides.",
    description:
      "Propose, counter-propose, and agree on commercial value (e.g., Lead ↔ Rev Share, Referral ↔ Referral, Intro ↔ Partnership) within clean parameterized bounds.",
    diagramLabel: "DIAGRAM • VALUE RATIO MATRIX",
    caption: "Parametric Bilateral Counter-Offers",
    cdoesStatus: "Escrow Protected",
    cdoesColor: "bg-indigo-600",
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
    title: "07. AGREE",
    subtitle: "Confirm the exact exchange terms.",
    description:
      "Both businesses independently confirm final exchange terms. No assumed value. Double bilateral sign-off commits both sides before disclosure occurs.",
    diagramLabel: "DIAGRAM • DOUBLE ASSENT",
    caption: "Simultaneous Multi-Party Sign-Off",
    cdoesStatus: "Assent Locked",
    cdoesColor: "bg-slate-900",
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
    title: "08. HANDSHAKE",
    subtitle: "Connect and take it forward.",
    description:
      "Both businesses consent to unlock verified contact details. Relay facilitates the connection; the businesses execute the commercial exchange direct and unmediated.",
    diagramLabel: "DIAGRAM • DIRECT UNMASKING",
    caption: "Contact Unlocked & Sovereign Execution",
    cdoesStatus: "Contacts Unlocked",
    cdoesColor: "bg-emerald-600",
    specs: [
      { label: "Direct Contacts", desc: "Executive email & phone" },
      { label: "Relay Steps Out", desc: "Sovereign direct execution" },
      { label: "Reputation Boost", desc: "Network reciprocity score +" },
    ],
  },
];

export const Route = createFileRoute("/8-step-journey")({
  head: () => ({
    meta: [
      { title: "The Relay — 8-Step Journey" },
      {
        name: "description",
        content:
          "Step through the 8 stages of consent-driven bilateral exchange. Relay gives verified enterprises complete control at every milestone without identity exposure.",
      },
      {
        property: "og:title",
        content: "The Relay — 8-Step Journey",
      },
      {
        property: "og:description",
        content: "From opportunity to handshake in 8 structured, bilateral steps.",
      },
      { property: "og:type", content: "website" },
    ],
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

  // Keyboard navigation
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

  return (
    <div className="bg-[#f8fafc] font-sans text-slate-900 antialiased min-h-screen flex flex-col justify-between selection:bg-slate-900 selection:text-white">
      <main className="w-full pt-8 pb-20 flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-5xl mx-auto px-6 pt-4 pb-8 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
              The Relay Journey
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600">
              From opportunity to handshake.
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Step through the 8 stages of consent-driven bilateral exchange. Relay gives verified enterprises complete control at every milestone without identity exposure or unsolicited outreach.
            </p>
          </div>

          {/* Clickable 8-Step Navigation Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2 p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              {STEPS_DATA.map((s, idx) => {
                const isActive = idx === currentStep;
                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => goToStep(idx)}
                    className={`flex-1 min-w-[105px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 cursor-pointer ${
                      isActive
                        ? "border border-transparent bg-slate-900 text-white shadow-xs"
                        : "border border-slate-200/80 hover:border-slate-400 text-slate-600 hover:text-slate-900 bg-white"
                    }`}
                  >
                    <span
                      className={`text-[10px] uppercase font-mono tracking-wider ${
                        isActive ? "text-slate-300" : "text-slate-400"
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
        </section>

        {/* Main Interactive Slideshow Stage */}
        <section className="w-full max-w-5xl mx-auto px-6 mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {/* Progress Indicator Bar */}
            <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
              <div
                className="h-full bg-slate-900 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Main Slide Content Canvas (Responsive 2-column) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Visual Illustration Canvas (Left) */}
              <div className="lg:col-span-6 bg-[#f8fafc] border-b lg:border-b-0 lg:border-r border-slate-200 p-6 sm:p-10 flex flex-col items-center justify-center relative select-none">
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-600 bg-white/90 border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
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
                      return <StepIllustration className="w-full h-full object-contain rounded-xl shadow-xs" />;
                    })()}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono text-[11px]">{step.caption}</span>
                </div>
              </div>

              {/* Stage Details & Specifications (Right) */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <span className="px-2.5 py-1 rounded text-[10.5px] font-bold tracking-wider uppercase bg-slate-900 text-white font-mono">
                      {step.phase}
                    </span>
                  </div>

                  {/* Slide Headline & Body */}
                  <div className="mt-1">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                      {step.title}
                    </h2>
                    <p className="text-base font-semibold text-slate-600 mt-1">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Protocol Specs Micro Cards */}
                  <div className="mt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">
                      Bilateral Protocol Covenants
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {step.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="p-2.5 rounded-lg border border-slate-200 bg-[#f8fafc]"
                        >
                          <p className="text-[11px] font-semibold text-slate-900">
                            {spec.label}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                            {spec.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Carousel Navigation Controls Bar */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentStep === 0}
                      onClick={prevStep}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
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
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                        isPlaying
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {step.number} / 08
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Resolution Section ("Then, connect.") */}
        <section className="w-full max-w-4xl mx-auto px-6 pt-6 pb-8">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
              The Resolution
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-1">
              Then, connect.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Once bilateral terms are locked, Relay steps aside so counterparties direct their partnership freely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inside Relay */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                  <h3 className="text-base font-bold text-slate-950">Inside Relay</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-mono font-medium">
                  The Protocol
                </p>
                <ul className="space-y-3 text-sm text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>Blinded discovery and verified credentials</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>Structured mutual consent protocol</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>Bilateral term agreement without leakage</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Outside Relay */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <h3 className="text-base font-bold text-slate-950">Outside Relay</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-mono font-medium">
                  Direct Partnership
                </p>
                <ul className="space-y-3 text-sm text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>Direct executive contacts unlocked</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>Sovereign contracts and legal agreements</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>Long-term unmediated commercial relationship</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Executive CTA */}
        <section className="w-full max-w-4xl mx-auto px-6 py-8">
          <div className="py-12 px-8 rounded-2xl border border-slate-200 bg-white text-center flex flex-col items-center gap-4 shadow-2xs">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Ready to experience the 8-step journey?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-md">
              Turn unfulfillable pipeline into verified reciprocal partnerships.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-3 w-full sm:w-auto">
              <Link
                to="/opportunities"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-black transition-colors shadow-2xs"
              >
                Explore Opportunities
              </Link>
              <Link
                to="/post"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-white text-slate-800 border border-slate-200 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Post an Opportunity
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="w-full max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-8 text-sm">
            <div className="col-span-2 flex flex-col gap-3 pr-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 tracking-tight">The Relay</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Structured bilateral acquisition network engineered for verified counterparties and discreet consent-driven commercial exchanges.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
                Architecture
              </span>
              <Link to="/core-pillars" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Protocol Spec
              </Link>
              <Link to="/core-pillars" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Zero-Knowledge Escrow
              </Link>
              <Link to="/core-pillars" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Reciprocal Unmasking
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
                Governance
              </span>
              <a href="#governance" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Curation Committee
              </a>
              <a href="#governance" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Underwriting Rules
              </a>
              <a href="#governance" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Arbitration Charter
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
                Legal
              </span>
              <a href="#legal" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Bilateral NDA
              </a>
              <a href="#legal" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Privacy &amp; Anonymity
              </a>
              <a href="#legal" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Terms of Protocol
              </a>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2025 The Relay Network Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Protocol
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
