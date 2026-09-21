import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Check,
  Lock,
  Clock,
  Zap,
  Shield,
  FileCheck,
  Building2,
  Users,
  CheckCircle2,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  FileText,
  Handshake,
  MessageSquare,
  FileSpreadsheet,
  UserCheck,
  Briefcase,
  Share2,
  Repeat,
  RotateCcw,
  ChevronLeft,
  MousePointerClick,
  Send,
  Unlock,
} from "lucide-react";
import { RelayVerificationSeal } from "@/components/relay-verification-seal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDynamicMedianResponseTime } from "@/lib/utils";
import { createSeoMeta, createOrganizationSchema, createWebsiteSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    createSeoMeta({
      title: "The Relay — B2B Opportunity Exchange",
      description:
        "Monetize leads you can't fulfill, or source verified commercial partnerships—all within a private, zero-spam dealroom.",
      path: "/",
      ogType: "website",
    }),
  component: LandingPage,
});

const PILLARS_DATA = [
  {
    num: "PILLAR 01",
    label: "What Relay Creates",
    badgeClass: "text-slate-800 bg-slate-100 border-slate-200",
    title: "Turn Unused Leads into Revenue",
    body: "Trade client leads, referrals, introductions, distribution, and services you can't fulfill for cash commissions, reciprocal leads, or expert services.",
    quote: "“I have a lead I can't take. What can I get in return?”",
    cardClass: "shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
  },
  {
    num: "PILLAR 02",
    label: "How Relay Works · CDOES",
    badgeClass: "text-white bg-slate-950 border-slate-950",
    title: "100% Mutual Consent (CDOES)",
    body: "Every deal follows a clear, two-way consent flow. Both businesses negotiate terms and agree on value before any confidential identity or contact is unlocked.",
    quote: "“No forced deals. Nothing unlocks without mutual agreement.”",
    cardClass: "shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
  },
  {
    num: "PILLAR 03",
    label: "Why Relay is Different",
    badgeClass: "text-slate-700 bg-slate-100 border-slate-200",
    title: "Strictly Business. Zero Spam.",
    body: "No social feeds. No fake vanity metrics. No cold scrape spam. Relay is strictly a private, verified network built for closing real B2B deals quickly.",
    quote: "“Less socializing. More business deals.”",
    cardClass: "shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
  },
];

const SCENARIOS_DATA = [
  {
    tag: "01 / GEOGRAPHY",
    title: "Wrong Location",
    desc: "A client needs on-site support in a region you don't cover.",
    relayFix: "Refer to a local partner for a 15% ongoing cut.",
  },
  {
    tag: "02 / CAPACITY",
    title: "Team is Too Busy",
    desc: "A qualified client wants to start now, but your team has zero capacity.",
    relayFix: "Hand off the project in exchange for future referrals.",
  },
  {
    tag: "03 / SPECIALIZATION",
    title: "Not What You Do",
    desc: "A client asks for mobile development, but your agency only builds web apps.",
    relayFix: "Refer a trusted mobile partner and collect a direct commission.",
  },
  {
    tag: "04 / SIZING",
    title: "Budget Doesn't Fit",
    desc: "The project budget is too small or too large for your team.",
    relayFix: "Pass to an ideal boutique firm for revenue share.",
  },
  {
    tag: "05 / REFERRALS",
    title: "Unrewarded Favors",
    desc: "You introduce friends and clients casually, but never get anything back.",
    relayFix: "Turn casual introductions into formal, tracked agreements.",
  },
  {
    tag: "06 / SPECIFICATIONS",
    title: "Missing Requirements",
    desc: "A prospect needs special certifications you don't have yet.",
    relayFix: "Co-sell with a certified partner and split the contract value.",
  },
];

export function LandingPage() {
  const [medianResponse, setMedianResponse] = useState(() => getDynamicMedianResponseTime());
  const [selectedNeed, setSelectedNeed] = useState<string>("Hiring");
  const [expandedMobileEngine, setExpandedMobileEngine] = useState<"exchange" | "discover" | null>(null);
  const [expandedViewMode, setExpandedViewMode] = useState<"flow" | "text">("flow");
  const [animStep, setAnimStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [activePillarMobile, setActivePillarMobile] = useState<number>(1);
  const pillarsScrollRef = useRef<HTMLDivElement>(null);
  const [activeScenarioMobile, setActiveScenarioMobile] = useState<number>(0);
  const [diffTabMobile, setDiffTabMobile] = useState<"difference" | "trade">("difference");

  useEffect(() => {
    const update = () => setMedianResponse(getDynamicMedianResponseTime());
    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const FLOW_STEP_DURATIONS = [4000, 6000, 7200, 5600];
  const TEXT_STEP_DURATION = 3500;

  useEffect(() => {
    if (!expandedMobileEngine || !isAutoPlaying) return;

    const currentDuration =
      expandedViewMode === "flow"
        ? FLOW_STEP_DURATIONS[animStep] || 4000
        : TEXT_STEP_DURATION;

    const timer = setTimeout(() => {
      setAnimStep((prev) => (prev + 1) % 4);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [expandedMobileEngine, isAutoPlaying, animStep, expandedViewMode]);

  const handleOpenOverlay = (engine: "exchange" | "discover") => {
    setExpandedMobileEngine(engine);
    setAnimStep(0);
    setIsAutoPlaying(true);
  };

  const handleCloseOverlay = () => {
    setExpandedMobileEngine(null);
  };

  useEffect(() => {
    if (!expandedMobileEngine) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-expanded-card='true']")) {
        handleCloseOverlay();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [expandedMobileEngine]);

  useEffect(() => {
    // Center the 2nd pillar card by default on mobile mount
    if (pillarsScrollRef.current) {
      const container = pillarsScrollRef.current;
      const card = container.children[1] as HTMLElement | undefined;
      if (card) {
        const targetLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
        container.scrollTo({ left: Math.max(0, targetLeft), behavior: "instant" });
      }
    }
  }, []);

  const needsOptions = [
    "Distribution",
    "Hiring",
    "Partnership",
    "Vendors / Services",
    "Investment",
    "Strategic Advice",
    "Referrals",
  ];

  const exchangeSteps = [
    {
      stepNum: "01",
      label: "Post an Offer",
      title: "1. Post an Offer",
      desc: "Tap the Post button to publish your confidential offer with zero spam.",
      mockup: (
        <div className="relative py-2 flex flex-col items-center justify-center min-h-[95px] w-full">
          <style>{`
            @keyframes postButtonStage1 {
              0% { opacity: 0; transform: scale(0.88); }
              14% { opacity: 1; transform: scale(1); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
              44% { opacity: 1; transform: scale(1); }
              52% { opacity: 1; transform: scale(0.94); box-shadow: 0 2px 6px rgba(0,0,0,0.25); }
              60% { opacity: 1; transform: scale(1); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
              100% { opacity: 1; transform: scale(1); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
            }
            @keyframes cursorGlideAndClick {
              0% { opacity: 0; transform: translate(32px, 32px); }
              18% { opacity: 1; transform: translate(16px, 16px); }
              44% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              52% { opacity: 1; transform: translate(0px, 0px) scale(0.8); }
              60% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              78% { opacity: 1; transform: translate(8px, 8px) scale(1); }
              100% { opacity: 0; transform: translate(16px, 16px) scale(1); }
            }
            @keyframes clickRipple {
              0%, 46% { opacity: 0; transform: scale(0.6); }
              52% { opacity: 0.6; transform: scale(1.05); }
              66% { opacity: 0; transform: scale(1.4); }
              100% { opacity: 0; transform: scale(1.4); }
            }
          `}</style>

          <div className="relative inline-flex items-center justify-center">
            {/* Click Ripple Effect */}
            <div
              className="absolute inset-0 rounded-md bg-slate-400/25 pointer-events-none"
              style={{ animation: "clickRipple 4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            />

            {/* Post Button */}
            <div
              className="h-9 px-4 rounded-md bg-slate-950 text-white font-mono text-[11px] uppercase tracking-wider font-bold inline-flex items-center justify-center gap-1.5 shadow-sm select-none"
              style={{ animation: "postButtonStage1 4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            >
              <span className="text-sm font-normal leading-none mb-0.5">+</span>
              <span>Post an Offer</span>
            </div>

            {/* Real OS Pointer Cursor */}
            <div
              className="absolute -bottom-1 -right-1 pointer-events-none z-20"
              style={{ animation: "cursorGlideAndClick 4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              >
                <path
                  d="M5.5 3.5L18.5 11.5L12 13.5L9.5 19.5L5.5 3.5Z"
                  fill="#0F172A"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNum: "02",
      label: "Review Partner Offers",
      title: "2. Review Partner Offers",
      desc: "Verified businesses express interest and submit structured commercial proposals.",
      mockup: (
        <div className="relative py-2 flex flex-col items-center justify-center min-h-[140px] w-full overflow-hidden">
          <style>{`
            /* Step 2 Stage 1: Card view with pronounced zoom-in focus on Express Interest */
            @keyframes oppCardStage {
              0% { opacity: 1; transform: scale(1) translate(0, 0); }
              10% { opacity: 1; transform: scale(1) translate(0, 0); }
              16% { opacity: 1; transform: scale(1.18) translate(-14px, -10px); box-shadow: 0 10px 25px rgba(0,0,0,0.12); }
              28% { opacity: 1; transform: scale(1.18) translate(-14px, -10px); box-shadow: 0 10px 25px rgba(0,0,0,0.12); }
              33% { opacity: 0; transform: scale(1.22) translate(-16px, -12px); pointer-events: none; }
              100% { opacity: 0; pointer-events: none; }
            }

            /* Step 2 Cursor 1: Glides to Express Interest button */
            @keyframes cursor1Glide {
              0% { opacity: 0; transform: translate(30px, 30px); }
              10% { opacity: 1; transform: translate(16px, 16px); }
              18% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              24% { opacity: 1; transform: translate(0px, 0px) scale(0.78); }
              30% { opacity: 0; transform: translate(0px, 0px) scale(1); }
              100% { opacity: 0; }
            }

            /* Step 2 Stage 2: Express Interest Modal with zoom-in focus on Send Proposal */
            @keyframes modalStage {
              0%, 30% { opacity: 0; transform: scale(0.92) translate(0, 0); pointer-events: none; }
              35% { opacity: 1; transform: scale(1) translate(0, 0); pointer-events: auto; }
              45% { opacity: 1; transform: scale(1) translate(0, 0); }
              51% { opacity: 1; transform: scale(1.2) translate(-16px, -10px); box-shadow: 0 14px 35px rgba(0,0,0,0.2); }
              63% { opacity: 1; transform: scale(1.2) translate(-16px, -10px); box-shadow: 0 14px 35px rgba(0,0,0,0.2); }
              69% { opacity: 0; transform: scale(1.24) translate(-18px, -12px); pointer-events: none; }
              100% { opacity: 0; pointer-events: none; }
            }

            /* Step 2 Cursor 2: Glides to Send Proposal button */
            @keyframes cursor2Glide {
              0%, 34% { opacity: 0; transform: translate(30px, 20px); }
              42% { opacity: 1; transform: translate(14px, 10px); }
              52% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              58% { opacity: 1; transform: translate(0px, 0px) scale(0.78); }
              65% { opacity: 0; transform: translate(0px, 0px) scale(1); }
              100% { opacity: 0; }
            }

            /* Step 2 Stage 3: Success Outcome Notification */
            @keyframes successStage {
              0%, 66% { opacity: 0; transform: scale(0.92) translateY(6px); pointer-events: none; }
              71% { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          <div className="relative w-full max-w-[290px] h-[130px] flex items-center justify-center">
            {/* ─── 1. REAL APP OPPORTUNITY CARD PREVIEW ─── */}
            <div
              className="absolute inset-0 bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-left"
              style={{ animation: "oppCardStage 6s ease-in-out forwards" }}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] font-mono font-bold bg-slate-100 text-slate-700 px-1 py-0.2 rounded border border-slate-200">
                      RY-8821
                    </span>
                    <span className="text-[8px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded">
                      Partnership
                    </span>
                  </div>
                  <span className="text-[8px] text-slate-400 font-mono">15% Rev-Share</span>
                </div>
                <h4 className="text-[10.5px] font-bold text-slate-950 tracking-tight leading-snug line-clamp-1">
                  Enterprise SaaS Lead: FinTech Core
                </h4>
                <p className="text-[9px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                  Verified buyer looking for deployment partner in UK region.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                <span className="text-[8.5px] text-slate-400 flex items-center gap-0.5 font-medium">
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                  <span>Blinded NDA</span>
                </span>

                <div className="relative">
                  <div className="h-6 px-2.5 rounded-[4px] bg-slate-950 text-white font-medium text-[9px] inline-flex items-center gap-1 shadow-xs">
                    <span>Express Interest</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>

                  {/* Cursor 1 for Express Interest */}
                  <div
                    className="absolute -bottom-1 -right-1 pointer-events-none z-30"
                    style={{ animation: "cursor1Glide 6s ease-in-out forwards" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                    >
                      <path
                        d="M5.5 3.5L18.5 11.5L12 13.5L9.5 19.5L5.5 3.5Z"
                        fill="#0F172A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 2. REAL APP EXPRESS INTEREST PROPOSAL MODAL ─── */}
            <div
              className="absolute inset-0 bg-white border border-slate-300 rounded-lg p-2.5 shadow-md flex flex-col justify-between text-left z-20"
              style={{ animation: "modalStage 6s ease-in-out forwards" }}
            >
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-900">Structure Proposal</span>
                    <span className="text-[7.5px] font-mono text-slate-400">• RY-8821</span>
                  </div>
                  <span className="text-[8px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-mono">
                    Mutual NDA
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                  <div className="p-1 rounded bg-slate-950 text-white text-center font-mono text-[8px] font-bold shadow-2xs">
                    <div className="text-[6.5px] text-slate-400 uppercase">Your Offer</div>
                    <span>15% Rev-Share</span>
                  </div>
                  <div className="p-1 rounded bg-slate-100 text-slate-700 text-center font-mono text-[8px] border border-slate-200">
                    <div className="text-[6.5px] text-slate-400 uppercase">Commitment</div>
                    <span>12 Months</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                <span className="text-[8px] text-slate-400">Cancel</span>

                <div className="relative">
                  <div className="h-6 px-3 rounded-[4px] bg-slate-950 text-white font-bold text-[9px] inline-flex items-center gap-1 shadow-xs">
                    <span>Send Proposal</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>

                  {/* Cursor 2 for Send Proposal */}
                  <div
                    className="absolute -bottom-1 -right-1 pointer-events-none z-30"
                    style={{ animation: "cursor2Glide 6s ease-in-out forwards" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                    >
                      <path
                        d="M5.5 3.5L18.5 11.5L12 13.5L9.5 19.5L5.5 3.5Z"
                        fill="#0F172A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 3. REAL SUCCESS OUTCOME UPON SENDING PROPOSAL ─── */}
            <div
              className="absolute inset-0 bg-slate-950 text-white border border-slate-800 rounded-lg p-3 shadow-md flex flex-col items-center justify-center text-center z-25"
              style={{ animation: "successStage 6s ease-in-out forwards" }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mb-1.5 shadow-sm">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h5 className="text-[11px] font-bold text-white tracking-tight leading-snug">
                Proposal Sent Successfully!
              </h5>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] font-mono font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Pending In Dealroom • Protected</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNum: "03",
      label: "Lock or Counter Terms",
      title: "3. Lock or Counter Terms",
      desc: "Dictate mutually agreed value: 15% revenue share, referral fee, or cash payout.",
      mockup: (
        <div className="relative py-2 flex flex-col items-center justify-center min-h-[140px] w-full overflow-hidden">
          <style>{`
            /* ─── SCENE 1: DEALROOM ACCEPT FLOW ─── */
            @keyframes dealroomStage1 {
              0% { opacity: 1; transform: translateX(0) scale(1); pointer-events: auto; }
              8% { opacity: 1; transform: translateX(0) scale(1); }
              14% { opacity: 1; transform: translateX(0) scale(1.16) translate(-10px, -8px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
              22% { opacity: 1; transform: translateX(0) scale(1.16) translate(-10px, -8px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
              26% { opacity: 0; transform: translateX(0) scale(1.2) translate(-12px, -10px); pointer-events: none; }
              100% { opacity: 0; pointer-events: none; }
            }

            @keyframes cursorNegotiate1 {
              0% { opacity: 0; transform: translate(32px, 32px); }
              10% { opacity: 1; transform: translate(16px, 16px); }
              16% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              21% { opacity: 1; transform: translate(0px, 0px) scale(0.78); }
              25% { opacity: 0; transform: translate(0px, 0px) scale(1); }
              100% { opacity: 0; }
            }

            @keyframes agreedOutcomeStage1 {
              0%, 25% { opacity: 0; transform: scale(0.92) translateY(6px); pointer-events: none; }
              28% { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
              36% { opacity: 1; transform: translateX(0) scale(1); }
              41% { opacity: 0; transform: translateX(-120%) scale(0.95); pointer-events: none; }
              100% { opacity: 0; pointer-events: none; }
            }

            /* ─── SCENE 2: 'OR COUNTER THE OFFER' TRANSITION ─── */
            @keyframes orCounterTransition {
              0%, 39% { opacity: 0; transform: scale(0.85) translateY(4px); pointer-events: none; }
              43% { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
              51% { opacity: 1; transform: scale(1) translateY(0); }
              54% { opacity: 0; transform: scale(0.9) translateY(-4px); pointer-events: none; }
              100% { opacity: 0; pointer-events: none; }
            }

            /* ─── SCENE 3: REAL COUNTER-PROPOSAL FORM MODAL ─── */
            @keyframes counterModalStage {
              0%, 52% { opacity: 0; transform: translateX(100%) scale(0.95); pointer-events: none; }
              56% { opacity: 1; transform: translateX(0) scale(1); pointer-events: auto; }
              63% { opacity: 1; transform: translateX(0) scale(1); }
              68% { opacity: 1; transform: scale(1.18) translate(-14px, -10px); box-shadow: 0 14px 35px rgba(0,0,0,0.18); }
              75% { opacity: 1; transform: scale(1.18) translate(-14px, -10px); box-shadow: 0 14px 35px rgba(0,0,0,0.18); }
              79% { opacity: 0; transform: scale(1.22) translate(-16px, -12px); pointer-events: none; }
              100% { opacity: 0; pointer-events: none; }
            }

            @keyframes cursorCounterGlide {
              0%, 55% { opacity: 0; transform: translate(32px, 32px); }
              64% { opacity: 1; transform: translate(16px, 16px); }
              70% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              74% { opacity: 1; transform: translate(0px, 0px) scale(0.78); }
              78% { opacity: 0; transform: translate(0px, 0px) scale(1); }
              100% { opacity: 0; }
            }

            /* ─── SCENE 4: COUNTER-PROPOSAL SUBMITTED OUTCOME ─── */
            @keyframes counterOutcomeStage {
              0%, 77% { opacity: 0; transform: scale(0.92) translateY(6px); pointer-events: none; }
              81% { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          <div className="relative w-full max-w-[290px] h-[130px] flex items-center justify-center">
            {/* ─── 1. REAL DEALROOM INITIAL TERMS CARD ─── */}
            <div
              className="absolute inset-0 bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-left z-10"
              style={{ animation: "dealroomStage1 7.2s ease-in-out forwards" }}
            >
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-900">Dealroom RY-8821</span>
                    <span className="text-[7.5px] font-mono text-slate-400">• Bilateral</span>
                  </div>
                  <span className="text-[8px] bg-amber-50 text-amber-700 border border-amber-200/80 px-1.5 py-0.2 rounded font-mono font-bold">
                    In Negotiation
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                  <div className="p-1 rounded bg-slate-950 text-white text-center font-mono text-[8px] font-bold shadow-2xs border border-slate-900">
                    <div className="text-[6.5px] text-slate-400 uppercase tracking-wider">Active Offer</div>
                    <span>15% Rev-Share</span>
                  </div>
                  <div className="p-1 rounded bg-slate-50 text-slate-600 text-center font-mono text-[8px] border border-slate-200">
                    <div className="text-[6.5px] text-slate-400 uppercase tracking-wider">Alt Option</div>
                    <span>$5,000 Upfront</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                <span className="text-[8px] text-slate-400 flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                  <span>Confidential</span>
                </span>

                <div className="relative">
                  <div className="h-6 px-2.5 rounded-[4px] bg-slate-950 text-white font-medium text-[9px] inline-flex items-center gap-1 shadow-xs">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Accept &amp; Lock Terms</span>
                  </div>

                  {/* OS Cursor 1 */}
                  <div
                    className="absolute -bottom-1 -right-1 pointer-events-none z-30"
                    style={{ animation: "cursorNegotiate1 7.2s ease-in-out forwards" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                    >
                      <path
                        d="M5.5 3.5L18.5 11.5L12 13.5L9.5 19.5L5.5 3.5Z"
                        fill="#0F172A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 2. DEALROOM ACCEPTED OUTCOME (SLIDES OUT TO LEFT) ─── */}
            <div
              className="absolute inset-0 bg-slate-950 text-white border border-slate-800 rounded-lg p-3 shadow-md flex flex-col items-center justify-center text-center z-20"
              style={{ animation: "agreedOutcomeStage1 7.2s ease-in-out forwards" }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mb-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h5 className="text-[11px] font-bold text-white tracking-tight leading-snug">
                Terms Mutually Agreed &amp; Locked!
              </h5>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] font-mono font-bold">
                <span>15% Rev-Share Confirmed • Double Sign-Off Pending</span>
              </div>
            </div>

            {/* ─── 3. 'OR COUNTER THE OFFER' BOLD PROMINENT TEXT ─── */}
            <div
              className="absolute z-25 flex items-center justify-center pointer-events-none px-4 text-center"
              style={{ animation: "orCounterTransition 7.2s ease-in-out forwards" }}
            >
              <h4 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-950 uppercase leading-none">
                OR Counter The Offer
              </h4>
            </div>

            {/* ─── 4. REAL APP COUNTER-PROPOSAL MODAL (SLIDES IN FROM RIGHT) ─── */}
            <div
              className="absolute inset-0 bg-white border border-slate-300 rounded-lg p-2.5 shadow-md flex flex-col justify-between text-left z-30"
              style={{ animation: "counterModalStage 7.2s ease-in-out forwards" }}
            >
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] bg-slate-950 text-white px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                      Counter-Proposal
                    </span>
                    <span className="text-[8px] font-mono text-slate-500">v2</span>
                  </div>
                  <span className="text-[8px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-mono">
                    RY-8821
                  </span>
                </div>

                {/* Counter Input / Value Selection */}
                <div className="mt-1.5 bg-slate-50 border border-slate-200 rounded p-1.5 flex items-center justify-between">
                  <div>
                    <span className="text-[6.5px] uppercase font-mono text-slate-400 block">Proposed Value</span>
                    <span className="text-[9.5px] font-mono font-bold text-slate-950">20% Rev-Share</span>
                  </div>
                  <span className="text-[7.5px] font-mono bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-semibold">
                    +5% Revised
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                <span className="text-[8px] text-slate-400">Cancel</span>

                <div className="relative">
                  <div className="h-6 px-2.5 rounded-[4px] bg-slate-950 text-white font-medium text-[9px] inline-flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    <span>Send Counter-Offer</span>
                  </div>

                  {/* OS Cursor 2 for Counter-Offer */}
                  <div
                    className="absolute -bottom-1 -right-1 pointer-events-none z-40"
                    style={{ animation: "cursorCounterGlide 7.2s ease-in-out forwards" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                    >
                      <path
                        d="M5.5 3.5L18.5 11.5L12 13.5L9.5 19.5L5.5 3.5Z"
                        fill="#0F172A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 5. COUNTER-PROPOSAL SUBMITTED OUTCOME ─── */}
            <div
              className="absolute inset-0 bg-slate-950 text-white border border-slate-800 rounded-lg p-3 shadow-md flex flex-col items-center justify-center text-center z-40"
              style={{ animation: "counterOutcomeStage 7.2s ease-in-out forwards" }}
            >
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center mb-1.5 shadow-sm">
                <Send className="w-3.5 h-3.5" />
              </div>
              <h5 className="text-[11px] font-bold text-white tracking-tight leading-snug">
                Counter-Offer Submitted!
              </h5>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[8px] font-mono font-bold">
                <span>Version v2 Recorded • Awaiting Partner Review</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNum: "04",
      label: "Handshake & Monetize",
      title: "4. Handshake & Exchange!",
      desc: "Double sign-off locked. Client identity unmasked with 100% legal protection.",
      mockup: (
        <div className="relative py-2 flex flex-col items-center justify-center min-h-[140px] w-full overflow-hidden">
          <style>{`
            /* Step 4 Stage 1: Bilateral Sign-Off Pending with Zoom-in on Sign button */
            @keyframes signPendingStage {
              0% { opacity: 1; transform: scale(1) translate(0, 0); }
              12% { opacity: 1; transform: scale(1) translate(0, 0); }
              18% { opacity: 1; transform: scale(1.16) translate(-12px, -8px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
              40% { opacity: 1; transform: scale(1.16) translate(-12px, -8px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
              46% { opacity: 0; transform: scale(1.2) translate(-14px, -10px); pointer-events: none; }
              100% { opacity: 0; pointer-events: none; }
            }

            /* Step 4 Cursor: Glides to Sign & Execute button */
            @keyframes cursorSignGlide {
              0% { opacity: 0; transform: translate(32px, 32px); }
              14% { opacity: 1; transform: translate(18px, 18px); }
              26% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              34% { opacity: 1; transform: translate(0px, 0px) scale(0.78); }
              42% { opacity: 0; transform: translate(0px, 0px) scale(1); }
              100% { opacity: 0; }
            }

            /* Step 4 Stage 2: Unmasked Handshake & Value Monitization Celebration */
            @keyframes handshakeCelebrationStage {
              0%, 44% { opacity: 0; transform: scale(0.92) translateY(6px); pointer-events: none; }
              50% { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          <div className="relative w-full max-w-[290px] h-[130px] flex items-center justify-center">
            {/* ─── 1. REAL BILATERAL SIGNING & BLINDED IDENTITY CARD ─── */}
            <div
              className="absolute inset-0 bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between text-left"
              style={{ animation: "signPendingStage 5.6s ease-in-out forwards" }}
            >
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-900">Bilateral Sign-Off</span>
                    <span className="text-[7.5px] font-mono text-slate-400">• RY-8821</span>
                  </div>
                  <span className="text-[8px] bg-amber-50 text-amber-700 border border-amber-200/80 px-1.5 py-0.2 rounded font-mono font-bold">
                    1 of 2 Signed
                  </span>
                </div>

                {/* Parties Sign Status & Masked Identity */}
                <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 text-left">
                    <div className="flex items-center justify-between text-[7px] font-mono text-slate-500">
                      <span>Party A</span>
                      <span className="text-emerald-600 font-bold">Signed ✓</span>
                    </div>
                    <span className="text-[8.5px] font-bold text-slate-900 truncate block mt-0.5">
                      Apex Media Ltd.
                    </span>
                  </div>

                  <div className="p-1 rounded bg-slate-950 text-white text-left shadow-2xs border border-slate-900">
                    <div className="flex items-center justify-between text-[7px] font-mono text-amber-400">
                      <span>Party B (You)</span>
                      <span className="text-amber-300 font-bold">Pending</span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-300 flex items-center gap-0.5 mt-0.5">
                      <Lock className="w-2 h-2 text-amber-400" />
                      <span>Masked Identity</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Bottom Row with Focus Button */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                <span className="text-[7.5px] text-slate-400 font-mono flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5 text-slate-400" />
                  <span>15% Rev-Share</span>
                </span>

                <div className="relative">
                  <div className="h-6 px-2.5 rounded-[4px] bg-slate-950 text-white font-medium text-[9px] inline-flex items-center gap-1 shadow-xs">
                    <Handshake className="w-2.5 h-2.5" />
                    <span>Sign &amp; Execute</span>
                  </div>

                  {/* OS Cursor pointing to Sign button */}
                  <div
                    className="absolute -bottom-1 -right-1 pointer-events-none z-30"
                    style={{ animation: "cursorSignGlide 5.6s ease-in-out forwards" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                    >
                      <path
                        d="M5.5 3.5L18.5 11.5L12 13.5L9.5 19.5L5.5 3.5Z"
                        fill="#0F172A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 2. CLEAN & MINIMAL SUCCESSFUL OUTCOME SCREEN ─── */}
            <div
              className="absolute inset-0 bg-slate-950 text-white border border-slate-800 rounded-lg p-3.5 shadow-md flex flex-col items-center justify-center text-center z-25"
              style={{ animation: "handshakeCelebrationStage 5.6s ease-in-out forwards" }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mb-2 shadow-sm">
                <Check className="w-4.5 h-4.5 stroke-[3]" />
              </div>
              <h5 className="text-[12px] font-bold text-white tracking-tight leading-snug">
                Exchange Completed Successfully!
              </h5>
              <p className="text-[8.5px] text-slate-400 mt-0.5 font-mono">
                Identity Unmasked • Protected by Bilateral NDA
              </p>
              <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[8px] font-mono font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>15% Rev-Share Locked</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const discoverSteps = [
    {
      stepNum: "01",
      label: "Discover Opportunities",
      title: "1. Discover Opportunities",
      desc: "Explore high-intent, confidential business opportunities across sectors.",
      mockup: (
        <div className="relative py-2 flex flex-col items-center justify-center min-h-[95px] w-full">
          <style>{`
            @keyframes exploreButtonStage1 {
              0% { opacity: 0; transform: scale(0.88); }
              14% { opacity: 1; transform: scale(1); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
              44% { opacity: 1; transform: scale(1); }
              52% { opacity: 1; transform: scale(0.94); box-shadow: 0 2px 6px rgba(0,0,0,0.25); }
              60% { opacity: 1; transform: scale(1); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
              100% { opacity: 1; transform: scale(1); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
            }
            @keyframes cursorExploreGlide {
              0% { opacity: 0; transform: translate(32px, 32px); }
              18% { opacity: 1; transform: translate(16px, 16px); }
              44% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              52% { opacity: 1; transform: translate(0px, 0px) scale(0.8); }
              60% { opacity: 1; transform: translate(0px, 0px) scale(1); }
              78% { opacity: 1; transform: translate(8px, 8px) scale(1); }
              100% { opacity: 0; transform: translate(16px, 16px) scale(1); }
            }
            @keyframes clickRippleExplore {
              0%, 46% { opacity: 0; transform: scale(0.6); }
              52% { opacity: 0.6; transform: scale(1.05); }
              66% { opacity: 0; transform: scale(1.4); }
              100% { opacity: 0; transform: scale(1.4); }
            }
          `}</style>

          <div className="relative inline-flex items-center justify-center">
            {/* Click Ripple Effect */}
            <div
              className="absolute inset-0 rounded-md bg-slate-400/25 pointer-events-none"
              style={{ animation: "clickRippleExplore 4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            />

            {/* Explore Button */}
            <div
              className="h-9 px-4 rounded-md bg-slate-950 text-white font-mono text-[11px] uppercase tracking-wider font-bold inline-flex items-center justify-center gap-1.5 shadow-sm select-none"
              style={{ animation: "exploreButtonStage1 4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Explore Opportunities</span>
            </div>

            {/* Real OS Pointer Cursor */}
            <div
              className="absolute -bottom-1 -right-1 pointer-events-none z-20"
              style={{ animation: "cursorExploreGlide 4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              >
                <path
                  d="M5.5 3.5L18.5 11.5L12 13.5L9.5 19.5L5.5 3.5Z"
                  fill="#0F172A"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNum: "02",
      label: "Express Interest",
      title: "2. Express Interest",
      desc: "Review opportunity details and submit your structured capability proposal.",
      mockup: exchangeSteps[1].mockup,
    },
    {
      stepNum: "03",
      label: "Agree or Counter",
      title: "3. Agree or Counter Terms",
      desc: "Accept terms or counter with custom rev-share in an encrypted deal room.",
      mockup: exchangeSteps[2].mockup,
    },
    {
      stepNum: "04",
      label: "Handshake & Win",
      title: "4. Handshake & Execute",
      desc: "Double sign-off locked. Client identity unmasked with 100% legal protection.",
      mockup: exchangeSteps[3].mockup,
    },
  ];

  return (
    <div className="bg-white text-slate-800 font-sans selection:bg-slate-200 selection:text-slate-900 min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createWebsiteSchema()) }}
      />
      <main className="flex-grow">
        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: HeroSection (Faithfully matching LANDINGPAGE.md)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#FAFAFA] border-b border-slate-200/80 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ─── MOBILE VIEW (< lg): Strict Step-by-Step 2-Engine Cards with Centered OR ─── */}
            <div className="lg:hidden">
              {/* Top Eyebrow & Platform Headline for Mobile */}
              <div className="text-center max-w-3xl mx-auto mb-6">
                <p className="text-xs font-mono tracking-widest text-slate-500 uppercase font-semibold">
                  Same Network. MORE POSSIBILITIES
                </p>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 font-display mt-2 uppercase leading-[1.08]">
                  <span>ONE PLATFORM.</span>
                  <br />
                  <span>TWO GROWTH ENGINES.</span>
                </h1>
                <p className="text-sm text-slate-600 mt-2.5 max-w-xl mx-auto leading-relaxed">
                  Turn opportunities into value or find the right partners to grow - all in one place
                </p>
              </div>

              {/* Full-screen backdrop click catcher when card is expanded */}
              {expandedMobileEngine && (
                <div
                  className="fixed inset-0 z-20 bg-black/10 backdrop-blur-[0.5px] transition-opacity animate-in fade-in duration-200"
                  onClick={handleCloseOverlay}
                />
              )}

              {/* Mobile 2-Engine Single-Row Cards Grid with Left->Right and Right->Left White Box-Shadow Expansion */}
              <div className="relative max-w-4xl mx-auto mt-6">
                <div className="relative min-h-[295px] sm:min-h-[305px] w-full">
                  {/* ─── LEFT CARD (Engine 01 - Exchange) ─── */}
                  <div
                    data-expanded-card={expandedMobileEngine === "exchange" ? "true" : undefined}
                    className={`absolute left-0 top-0 bottom-0 rounded-2xl bg-white p-3.5 sm:p-4.5 flex flex-col justify-between text-left transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                      expandedMobileEngine === "exchange"
                        ? "w-full border-0 shadow-[0_32px_80px_-10px_rgba(0,0,0,0.30),0_16px_40px_-5px_rgba(0,0,0,0.16)] z-30 opacity-100"
                        : expandedMobileEngine === "discover"
                        ? "w-[calc(50%-7px)] sm:w-[calc(50%-12px)] opacity-0 scale-95 pointer-events-none z-0 border border-slate-200/90"
                        : "w-[calc(50%-7px)] sm:w-[calc(50%-12px)] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-slate-300 cursor-pointer active:scale-[0.98] z-10 opacity-100"
                    }`}
                    onClick={(e) => {
                      if (expandedMobileEngine === "exchange") {
                        e.stopPropagation();
                      } else if (expandedMobileEngine === null) {
                        handleOpenOverlay("exchange");
                      }
                    }}
                  >
                    {expandedMobileEngine === "exchange" ? (
                      /* EXPANDED VIEW FOR ENGINE 01 (WHITE THEME + BLACK DETAILS + NO BORDER) */
                      <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-300">
                        <style>{`
                          @keyframes progressBarFill {
                            0% { width: 0%; }
                            100% { width: 100%; }
                          }
                          @keyframes stepContainerLifecycle {
                            0% { opacity: 0; }
                            3% { opacity: 1; }
                            92% { opacity: 1; transform: scale(1) translateY(0); }
                            100% { opacity: 0; transform: scale(0.96) translateY(-4px); }
                          }
                          @keyframes headingCenterToTop {
                            0% {
                              opacity: 0;
                              transform: translateY(56px) scale(1.4);
                            }
                            8% {
                              opacity: 1;
                              transform: translateY(56px) scale(1.4);
                            }
                            24% {
                              opacity: 1;
                              transform: translateY(56px) scale(1.4);
                            }
                            36% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                            }
                            100% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                            }
                          }
                          @keyframes mockupEntranceAfterShift {
                            0%, 30% {
                              opacity: 0;
                              transform: translateY(14px) scale(0.92);
                              pointer-events: none;
                            }
                            38% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                              pointer-events: auto;
                            }
                            100% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                              pointer-events: auto;
                            }
                          }
                        `}</style>
                        {/* Top Header */}
                        <div className="flex items-center justify-between pb-1.5">
                          <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedViewMode("flow");
                                setIsAutoPlaying(true);
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold transition-all cursor-pointer ${
                                expandedViewMode === "flow"
                                  ? "bg-slate-950 text-white shadow-2xs"
                                  : "text-slate-600 hover:text-slate-950"
                              }`}
                            >
                              Flow
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedViewMode("text");
                                setIsAutoPlaying(false);
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold transition-all cursor-pointer ${
                                expandedViewMode === "text"
                                  ? "bg-slate-950 text-white shadow-2xs"
                                  : "text-slate-600 hover:text-slate-950"
                              }`}
                            >
                              Steps
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {expandedViewMode === "flow" && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAnimStep(0);
                                  setIsAutoPlaying(true);
                                }}
                                className="w-6.5 h-6.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                                title="Replay flow animation"
                                aria-label="Replay animation"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseOverlay();
                              }}
                              className="w-6.5 h-6.5 rounded-full bg-slate-950 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                              title="Close and collapse back"
                              aria-label="Close"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Indicators with Live Fill Timer */}
                        <div className="grid grid-cols-4 gap-1.5 pt-0.5 pb-1.5">
                          {[0, 1, 2, 3].map((idx) => {
                            const isCurrent = idx === animStep;
                            const isPast = idx < animStep;
                            const currentDuration =
                              expandedViewMode === "flow"
                                ? FLOW_STEP_DURATIONS[animStep] || 4000
                                : TEXT_STEP_DURATION;

                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAnimStep(idx);
                                  setIsAutoPlaying(false);
                                }}
                                className="h-1 rounded-full bg-slate-200 overflow-hidden relative cursor-pointer block p-0 border-0"
                                aria-label={`Jump to step ${idx + 1}`}
                              >
                                <div
                                  key={`${idx}-${animStep}-${isAutoPlaying}-${expandedViewMode}`}
                                  className={`h-full rounded-full ${
                                    isPast
                                      ? "w-full bg-slate-950"
                                      : isCurrent
                                      ? "bg-slate-950"
                                      : "w-0"
                                  }`}
                                  style={
                                    isCurrent && isAutoPlaying
                                      ? {
                                          animation: `progressBarFill ${currentDuration}ms linear forwards`,
                                        }
                                      : isCurrent
                                      ? { width: "100%" }
                                      : undefined
                                  }
                                />
                              </button>
                            );
                          })}
                        </div>

                        {/* Animated Center Stage with Right-to-Left Swipe */}
                        <div className="my-auto py-1 text-center flex flex-col items-center justify-center min-h-[145px] overflow-hidden w-full">
                          {expandedViewMode === "flow" ? (
                            (() => {
                              const current = exchangeSteps[animStep];
                              const stepDuration = FLOW_STEP_DURATIONS[animStep] || 4000;
                              return (
                                <div
                                  key={`exchange-flow-${animStep}`}
                                  className="w-full relative flex flex-col items-center justify-center will-change-transform min-h-[140px]"
                                  style={{
                                    animation: `stepContainerLifecycle ${stepDuration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                  }}
                                >
                                  {/* Step Heading: Starts Centered & Large on Pure White Background -> Shifts up & scales down */}
                                  <div
                                    className="flex items-center justify-center mb-1.5 origin-center z-20 text-center w-full px-2"
                                    style={{
                                      animation: `headingCenterToTop ${stepDuration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                    }}
                                  >
                                    <h4 className="text-[15px] sm:text-[17px] font-black text-slate-950 font-display uppercase tracking-tight text-center leading-tight">
                                      {current.title}
                                    </h4>
                                  </div>

                                  {/* Related Screen Mockup Renders after Heading reaches top */}
                                  <div
                                    className="w-full transform transition-transform duration-300 z-10"
                                    style={{
                                      animation: `mockupEntranceAfterShift ${stepDuration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                    }}
                                  >
                                    {current.mockup}
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            /* SWIPING RIGHT-TO-LEFT TEXT STEP CARD (EXTRA LARGE BOLD HEADING + ZERO EXTRA HEIGHT) */
                            (() => {
                              const current = exchangeSteps[animStep];
                              return (
                                <div
                                  key={`exchange-text-swipe-${animStep}`}
                                  className="w-full max-w-[290px] bg-white text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-12 duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] py-0 px-1 mx-auto"
                                >
                                  <h3 className="text-[24px] sm:text-[28px] font-black text-slate-950 font-display tracking-tight leading-[1.04] uppercase text-center w-full mx-auto">
                                    {current.title}
                                  </h3>
                                  <p className="text-[12.5px] sm:text-[13.5px] text-slate-600 leading-snug mt-2 font-normal max-w-[280px] text-center mx-auto">
                                    {current.desc}
                                  </p>
                                </div>
                              );
                            })()
                          )}
                        </div>

                        {/* Bottom Action Controls */}
                        <div className="pt-1.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnimStep((prev) => (prev === 0 ? 3 : prev - 1));
                                setIsAutoPlaying(false);
                              }}
                              className="h-6.5 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-900 text-[9.5px] font-mono font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-3 h-3" />
                              <span>Prev</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnimStep((prev) => (prev + 1) % 4);
                                setIsAutoPlaying(false);
                              }}
                              className="h-6.5 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-900 text-[9.5px] font-mono font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenOverlay("discover");
                              }}
                              className="h-6.5 px-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[9.5px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-200/80"
                              title="Switch to Discover Flow"
                            >
                              <Search className="w-3 h-3 text-slate-700" />
                              <span>Discover</span>
                            </button>

                            <Link
                              to="/opportunities"
                              className="h-6.5 px-3 rounded bg-slate-950 hover:bg-black text-white text-[9.5px] font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors shadow-xs"
                            >
                              <span>Explore</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* NORMAL COLLAPSED VIEW FOR ENGINE 01 */
                      <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-300">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                            Engine 01
                          </span>
                          <span className="text-[8.5px] font-mono font-semibold uppercase text-slate-400 group-hover:text-slate-900 transition-colors">
                            Tap Flow
                          </span>
                        </div>

                        {/* Main Centered Content */}
                        <div className="my-auto py-1 flex flex-col items-center text-center">
                          <div className="text-slate-950 mb-2 group-hover:scale-105 transition-transform flex items-center justify-center">
                            <Repeat className="w-8 h-8 text-slate-950 stroke-[2.2]" />
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-display tracking-tight mb-1.5 uppercase leading-none text-center">
                            Exchange
                          </h2>
                          <p className="text-[11px] sm:text-[12px] text-slate-600 leading-relaxed text-center">
                            Have valuable leads you cannot fulfill? Exchange them confidentially and earn agreed value.
                          </p>

                          <div className="mt-2.5 flex flex-wrap justify-center gap-1">
                            <span className="text-[7.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              100% Confidential
                            </span>
                            <span className="text-[7.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              Set Your Cut
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[9.5px] font-mono font-bold uppercase text-slate-500 group-hover:text-slate-950 transition-colors">
                            Watch flow
                          </span>
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-950 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center shadow-xs transition-all">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── RIGHT CARD (Engine 02 - Discover) ─── */}
                  <div
                    data-expanded-card={expandedMobileEngine === "discover" ? "true" : undefined}
                    className={`absolute right-0 top-0 bottom-0 rounded-2xl bg-white p-3.5 sm:p-4.5 flex flex-col justify-between text-left transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                      expandedMobileEngine === "discover"
                        ? "w-full border-0 shadow-[0_32px_80px_-10px_rgba(0,0,0,0.30),0_16px_40px_-5px_rgba(0,0,0,0.16)] z-30 opacity-100"
                        : expandedMobileEngine === "exchange"
                        ? "w-[calc(50%-7px)] sm:w-[calc(50%-12px)] opacity-0 scale-95 pointer-events-none z-0 border border-slate-200/90"
                        : "w-[calc(50%-7px)] sm:w-[calc(50%-12px)] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-slate-300 cursor-pointer active:scale-[0.98] z-10 opacity-100"
                    }`}
                    onClick={(e) => {
                      if (expandedMobileEngine === "discover") {
                        e.stopPropagation();
                      } else if (expandedMobileEngine === null) {
                        handleOpenOverlay("discover");
                      }
                    }}
                  >
                    {expandedMobileEngine === "discover" ? (
                      /* EXPANDED VIEW FOR ENGINE 02 (WHITE THEME + BLACK DETAILS + NO BORDER) */
                      <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-300">
                        <style>{`
                          @keyframes progressBarFill {
                            0% { width: 0%; }
                            100% { width: 100%; }
                          }
                          @keyframes stepContainerLifecycle {
                            0% { opacity: 0; }
                            3% { opacity: 1; }
                            92% { opacity: 1; transform: scale(1) translateY(0); }
                            100% { opacity: 0; transform: scale(0.96) translateY(-4px); }
                          }
                          @keyframes headingCenterToTop {
                            0% {
                              opacity: 0;
                              transform: translateY(56px) scale(1.4);
                            }
                            8% {
                              opacity: 1;
                              transform: translateY(56px) scale(1.4);
                            }
                            24% {
                              opacity: 1;
                              transform: translateY(56px) scale(1.4);
                            }
                            36% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                            }
                            100% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                            }
                          }
                          @keyframes mockupEntranceAfterShift {
                            0%, 30% {
                              opacity: 0;
                              transform: translateY(14px) scale(0.92);
                              pointer-events: none;
                            }
                            38% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                              pointer-events: auto;
                            }
                            100% {
                              opacity: 1;
                              transform: translateY(0px) scale(1.0);
                              pointer-events: auto;
                            }
                          }
                        `}</style>
                        {/* Top Header */}
                        <div className="flex items-center justify-between pb-1.5">
                          <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedViewMode("flow");
                                setIsAutoPlaying(true);
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold transition-all cursor-pointer ${
                                expandedViewMode === "flow"
                                  ? "bg-slate-950 text-white shadow-2xs"
                                  : "text-slate-600 hover:text-slate-950"
                              }`}
                            >
                              Flow
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedViewMode("text");
                                setIsAutoPlaying(false);
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold transition-all cursor-pointer ${
                                expandedViewMode === "text"
                                  ? "bg-slate-950 text-white shadow-2xs"
                                  : "text-slate-600 hover:text-slate-950"
                              }`}
                            >
                              Steps
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {expandedViewMode === "flow" && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAnimStep(0);
                                  setIsAutoPlaying(true);
                                }}
                                className="w-6.5 h-6.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                                title="Replay flow animation"
                                aria-label="Replay animation"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseOverlay();
                              }}
                              className="w-6.5 h-6.5 rounded-full bg-slate-950 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                              title="Close and collapse back"
                              aria-label="Close"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Indicators with Live Fill Timer */}
                        <div className="grid grid-cols-4 gap-1.5 pt-0.5 pb-1.5">
                          {[0, 1, 2, 3].map((idx) => {
                            const isCurrent = idx === animStep;
                            const isPast = idx < animStep;
                            const currentDuration =
                              expandedViewMode === "flow"
                                ? FLOW_STEP_DURATIONS[animStep] || 4000
                                : TEXT_STEP_DURATION;

                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAnimStep(idx);
                                  setIsAutoPlaying(false);
                                }}
                                className="h-1 rounded-full bg-slate-200 overflow-hidden relative cursor-pointer block p-0 border-0"
                                aria-label={`Jump to step ${idx + 1}`}
                              >
                                <div
                                  key={`${idx}-${animStep}-${isAutoPlaying}-${expandedViewMode}`}
                                  className={`h-full rounded-full ${
                                    isPast
                                      ? "w-full bg-slate-950"
                                      : isCurrent
                                      ? "bg-slate-950"
                                      : "w-0"
                                  }`}
                                  style={
                                    isCurrent && isAutoPlaying
                                      ? {
                                          animation: `progressBarFill ${currentDuration}ms linear forwards`,
                                        }
                                      : isCurrent
                                      ? { width: "100%" }
                                      : undefined
                                  }
                                />
                              </button>
                            );
                          })}
                        </div>

                        {/* Animated Center Stage with Right-to-Left Swipe */}
                        <div className="my-auto py-1 text-center flex flex-col items-center justify-center min-h-[145px] overflow-hidden w-full">
                          {expandedViewMode === "flow" ? (
                            (() => {
                              const current = discoverSteps[animStep];
                              const stepDuration = FLOW_STEP_DURATIONS[animStep] || 4000;
                              return (
                                <div
                                  key={`discover-flow-${animStep}`}
                                  className="w-full relative flex flex-col items-center justify-center will-change-transform min-h-[140px]"
                                  style={{
                                    animation: `stepContainerLifecycle ${stepDuration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                  }}
                                >
                                  {/* Step Heading: Starts Centered & Large on Pure White Background -> Shifts up & scales down */}
                                  <div
                                    className="flex items-center justify-center mb-1.5 origin-center z-20 text-center w-full px-2"
                                    style={{
                                      animation: `headingCenterToTop ${stepDuration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                    }}
                                  >
                                    <h4 className="text-[15px] sm:text-[17px] font-black text-slate-950 font-display uppercase tracking-tight text-center leading-tight">
                                      {current.title}
                                    </h4>
                                  </div>

                                  {/* Related Screen Mockup Renders after Heading reaches top */}
                                  <div
                                    className="w-full transform transition-transform duration-300 z-10"
                                    style={{
                                      animation: `mockupEntranceAfterShift ${stepDuration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                    }}
                                  >
                                    {current.mockup}
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            /* SWIPING RIGHT-TO-LEFT TEXT STEP CARD (EXTRA LARGE BOLD HEADING + ZERO EXTRA HEIGHT) */
                            (() => {
                              const current = discoverSteps[animStep];
                              return (
                                <div
                                  key={`discover-text-swipe-${animStep}`}
                                  className="w-full max-w-[290px] bg-white text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-12 duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] py-0 px-1 mx-auto"
                                >
                                  <h3 className="text-[24px] sm:text-[28px] font-black text-slate-950 font-display tracking-tight leading-[1.04] uppercase text-center w-full mx-auto">
                                    {current.title}
                                  </h3>
                                  <p className="text-[12.5px] sm:text-[13.5px] text-slate-600 leading-snug mt-2 font-normal max-w-[280px] text-center mx-auto">
                                    {current.desc}
                                  </p>
                                </div>
                              );
                            })()
                          )}
                        </div>

                        {/* Bottom Action Controls */}
                        <div className="pt-1.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnimStep((prev) => (prev === 0 ? 3 : prev - 1));
                                setIsAutoPlaying(false);
                              }}
                              className="h-6.5 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-900 text-[9.5px] font-mono font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-3 h-3" />
                              <span>Prev</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnimStep((prev) => (prev + 1) % 4);
                                setIsAutoPlaying(false);
                              }}
                              className="h-6.5 px-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-900 text-[9.5px] font-mono font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenOverlay("exchange");
                              }}
                              className="h-6.5 px-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[9.5px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-200/80"
                              title="Switch to Exchange Flow"
                            >
                              <Repeat className="w-3 h-3 text-slate-700" />
                              <span>Exchange</span>
                            </button>

                            <Link
                              to="/opportunities"
                              className="h-6.5 px-3 rounded bg-slate-950 hover:bg-black text-white text-[9.5px] font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors shadow-xs"
                            >
                              <span>Explore</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* NORMAL COLLAPSED VIEW FOR ENGINE 02 */
                      <div className="w-full h-full flex flex-col justify-between animate-in fade-in duration-300">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                            Engine 02
                          </span>
                          <span className="text-[8.5px] font-mono font-semibold uppercase text-slate-400 group-hover:text-slate-900 transition-colors">
                            Tap Flow
                          </span>
                        </div>

                        {/* Main Centered Content */}
                        <div className="my-auto py-1 flex flex-col items-center text-center">
                          <div className="text-slate-950 mb-2 group-hover:scale-105 transition-transform flex items-center justify-center">
                            <Search className="w-8 h-8 text-slate-950 stroke-[2.2]" />
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-display tracking-tight mb-1.5 uppercase leading-none text-center">
                            Discover
                          </h2>
                          <p className="text-[11px] sm:text-[12px] text-slate-600 leading-relaxed text-center">
                            Need hiring, partnerships, vendors or tips? Discover verified businesses and connect directly.
                          </p>

                          <div className="mt-2.5 flex flex-wrap justify-center gap-1">
                            <span className="text-[7.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              Verified Leads
                            </span>
                            <span className="text-[7.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              Direct Connect
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[9.5px] font-mono font-bold uppercase text-slate-500 group-hover:text-slate-950 transition-colors">
                            Watch flow
                          </span>
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-950 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center shadow-xs transition-all">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Central OR Badge - smoothly fades when card is expanded */}
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-200 ${
                      expandedMobileEngine ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-950 font-bold text-[10px] font-mono flex items-center justify-center border-0 shadow-[0_4px_16px_rgba(0,0,0,0.14)] select-none tracking-wider">
                      OR
                    </div>
                  </div>
                </div>
              </div>

                {/* Mobile Micro-Trust Metrics below Cards - Guaranteed Single Line, Centered with no cropping */}
                <div className="mt-5 sm:mt-6 pt-1 flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-4 text-[8px] xs:text-[9.5px] sm:text-xs font-medium text-slate-700 tracking-tight whitespace-nowrap w-full">
                  <span className="flex items-center gap-0.5 xs:gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-slate-800 shrink-0" />
                    <span>Verified Businesses</span>
                  </span>
                  <div className="h-2.5 w-px bg-slate-300/80 shrink-0 select-none" />
                  <span className="flex items-center gap-0.5 xs:gap-1 shrink-0">
                    <Lock className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-slate-800 shrink-0" />
                    <span>100% Confidential</span>
                  </span>
                  <div className="h-2.5 w-px bg-slate-300/80 shrink-0 select-none" />
                  <span className="flex items-center gap-0.5 xs:gap-1 shrink-0">
                    <Users className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-slate-800 shrink-0" />
                    <span>You Decide the Value</span>
                  </span>
                </div>

                {/* Mobile Action Buttons */}
                <div className="mt-6 flex flex-col gap-2.5 w-full max-w-md mx-auto">
                  {/* Top Row: Primary Explore Opportunities Button */}
                  <Link
                    to="/opportunities"
                    className="h-11 w-full px-6 inline-flex items-center justify-center bg-slate-950 text-white font-mono text-xs uppercase tracking-widest hover:bg-black transition-all rounded-md font-bold shadow-sm"
                  >
                    <span>Explore Opportunities</span>
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>

                  {/* Bottom Row: Sign In and Apply Buttons Side-by-Side */}
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <Link
                      to="/login"
                      className="h-10 w-full px-4 inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-mono text-[11px] uppercase tracking-wider transition-all rounded-md font-bold shadow-xs text-center"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/signup"
                      className="h-10 w-full px-4 inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-950 hover:text-white text-slate-900 font-mono text-[11px] uppercase tracking-wider transition-all rounded-md font-bold shadow-xs text-center"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              </div>

            {/* ─── DESKTOP VIEW (>= lg): Original Faithful 2-Column Engine Layout ─── */}
            <div className="hidden lg:block">
              {/* Top Headline for Desktop */}
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h1 className="text-5xl xl:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] font-display">
                  One Platform. Two Engines.
                </h1>
                <p className="text-base text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
                  Monetize leads you can't fulfill, or source verified commercial partnerships—all within a private, zero-spam dealroom.
                </p>
              </div>

              {/* Split 2-column Hero Grid for Desktop */}
              <div className="grid grid-cols-12 gap-12 items-center">
                {/* Left Column (Engine 01) */}
                <div className="col-span-6 pr-6 flex flex-col items-center text-center">
                  <div className="flex items-center justify-center gap-2 mb-4 mx-auto">
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-2.5 py-1 rounded uppercase tracking-wider shadow-xs">
                      ENGINE 01 • MONETIZE MISFIT DEALS
                    </span>
                  </div>
                  <h2 className="text-4xl xl:text-[46px] font-black text-slate-950 tracking-tight leading-[1.08] font-display text-center">
                    CAN’T FULFILL AN OPPORTUNITY?
                  </h2>
                  <h3 className="text-3xl xl:text-[36px] font-normal text-slate-400 tracking-tight mt-2.5 leading-snug font-display text-center">
                    EXCHANGE IT. GET VALUE IN RETURN.
                  </h3>
                  <div className="w-16 h-[2px] bg-slate-200 mt-6 mb-6 mx-auto"></div>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto mb-8 text-center">
                    Don’t let valuable leads, referrals or business opportunities go stale. Exchange them with verified businesses and receive mutually agreed value.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 mx-auto">
                    <Link
                      to="/opportunities"
                      className="px-6 py-3.5 rounded-md bg-slate-950 hover:bg-black text-white text-[13.5px] font-medium tracking-wide shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <span>Explore Opportunities</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/opportunities"
                      className="px-6 py-3.5 rounded-md bg-white hover:bg-slate-50 text-slate-900 text-[13.5px] font-medium border border-slate-300 shadow-xs transition-all flex items-center justify-center"
                    >
                      Post an Opportunity
                    </Link>
                  </div>

                  {/* Micro-Trust Signals */}
                  <div className="flex flex-wrap items-center justify-center gap-3.5 xl:gap-5 text-[12px] xl:text-[12.5px] font-medium text-slate-700 mx-auto w-full">
                    <span className="flex items-center gap-1.5 shrink-0">
                      <ShieldCheck className="w-4 h-4 text-slate-700" />
                      <span>Verified Businesses</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Lock className="w-4 h-4 text-slate-700" />
                      <span>100% Confidential</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Users className="w-4 h-4 text-slate-700" />
                      <span>You Decide the Value</span>
                    </span>
                  </div>
                </div>

                {/* Right Column (Engine 02 with Divider & Interactive Needs Dropdown) */}
                <div className="col-span-6 relative pl-10 border-l border-slate-200 flex flex-col justify-center items-center text-center py-4">
                  {/* Central OR Badge for Desktop */}
                  <div className="hidden lg:flex absolute top-1/2 -left-[18px] -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950 text-white font-bold text-xs items-center justify-center border-2 border-white shadow-md z-10 select-none tracking-wider pointer-events-none">
                    OR
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4 mx-auto">
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-2.5 py-1 rounded uppercase tracking-wider shadow-xs">
                      ENGINE 02 • DISCOVER &amp; EXPAND
                    </span>
                  </div>

                  <div className="relative max-w-sm mb-9 w-full text-left mx-auto">
                    {/* Select Card Component */}
                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-3">
                      {/* Search bar header inside dropdown */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                        <div className="flex items-center gap-2.5 text-slate-700">
                          <Search className="w-4 h-4 text-slate-500" />
                          <span className="text-[15px] text-slate-900 font-bold">Need</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      </div>

                      {/* Options List */}
                      <div className="mt-2 space-y-0.5 text-[14px]">
                        {needsOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedNeed(opt)}
                            className={`w-full text-left px-3.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                              selectedNeed === opt
                                ? "bg-slate-100/90 text-slate-950 font-medium"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <span>{opt}</span>
                            {selectedNeed === opt && (
                              <Check className="w-3.5 h-3.5 text-slate-700" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hand-drawn curved arrow & 'And more...' text */}
                    <div className="absolute left-[88%] xl:left-[92%] top-20 pointer-events-none flex items-start gap-1">
                      <svg
                        className="w-14 h-16 text-slate-900 -scale-x-100 transform rotate-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 70 80"
                      >
                        <path
                          d="M12 70 C 25 35, 50 15, 62 10"
                          fill="none"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M52 8 L 63 10 L 61 22"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span className="font-serif italic text-[20px] text-slate-800 -mt-2.5 whitespace-nowrap pl-1 font-semibold">
                        And more...
                      </span>
                    </div>
                  </div>

                  {/* Bottom Headline & Paragraph in Right Column */}
                  <h3 className="text-xl xl:text-[22px] font-black tracking-tight text-slate-950 font-display mb-2 text-center">
                    SHARE IT. FIND THE RIGHT BUSINESS.
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed max-w-lg mx-auto text-center">
                    Whether it’s distribution, hiring, partnerships, services or any other{" "}
                    <span className="font-semibold text-slate-800">business opportunity</span> — connect with verified businesses and exchange mutually agreed value.
                  </p>
                </div>
              </div>
            </div>

            {/* BEGIN: 3. A Simple Exchange Process Strip (8-Step Alignment) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs mt-10">
              {/* DESKTOP VIEW: Sleek Horizontal Chain (hidden on mobile) */}
              <div className="hidden md:flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
                {/* Left Label with divider on desktop */}
                <div className="xl:border-r xl:border-slate-100 xl:pr-8 flex items-center shrink-0">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      THE 8-STEP
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">
                      EXCHANGE PROCESS
                    </span>
                  </div>
                </div>

                {/* Process Steps (8 Steps) */}
                <div className="flex-1 flex items-center justify-between gap-1.5 py-1">
                  {/* Step 1: Verify */}
                  <div className="flex flex-col items-center text-center min-w-[55px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 group-hover:border-slate-800 transition-colors">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-900">Verify</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />

                  {/* Step 2: Post */}
                  <div className="flex flex-col items-center text-center min-w-[55px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 group-hover:border-slate-800 transition-colors">
                      <FileText className="w-3.5 h-3.5 text-slate-800" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-900">Post</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />

                  {/* Step 3: Discover */}
                  <div className="flex flex-col items-center text-center min-w-[55px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 group-hover:border-slate-800 transition-colors">
                      <Search className="w-3.5 h-3.5 text-slate-800" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-900">Discover</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />

                  {/* Step 4: Express Interest */}
                  <div className="flex flex-col items-center text-center min-w-[70px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 group-hover:border-slate-800 transition-colors">
                      <Zap className="w-3.5 h-3.5 text-slate-800" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-900">Express</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />

                  {/* Step 5: Acknowledge */}
                  <div className="flex flex-col items-center text-center min-w-[70px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 group-hover:border-slate-800 transition-colors">
                      <Lock className="w-3.5 h-3.5 text-slate-800" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-900">Acknowledge</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />

                  {/* Step 6: Negotiate */}
                  <div className="flex flex-col items-center text-center min-w-[55px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 group-hover:border-slate-800 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-800" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-900">Negotiate</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />

                  {/* Step 7: Agree */}
                  <div className="flex flex-col items-center text-center min-w-[55px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 group-hover:border-slate-800 transition-colors">
                      <FileCheck className="w-3.5 h-3.5 text-slate-800" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-900">Agree</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />

                  {/* Step 8: Handshake */}
                  <div className="flex flex-col items-center text-center min-w-[65px] group">
                    <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-950 flex items-center justify-center mb-1.5 shadow-xs">
                      <Handshake className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-slate-950">Handshake</span>
                  </div>
                </div>
              </div>

              {/* MOBILE VIEW: Beautiful, Connected Vertical Timeline / Cards (hidden on md+) */}
              <div className="block md:hidden">
                {/* Mobile Header */}
                <div className="pb-4 mb-4 border-b border-slate-100">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    HOW IT WORKS
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-950">
                    A Simple 8-Step Exchange Process
                  </h3>
                </div>

                {/* Mobile Steps List */}
                <div className="relative pl-6 space-y-3.5">
                  {/* Vertical Connecting Line */}
                  <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-slate-200" />

                  {/* Step 1: Verify */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      1
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950">Verify Identity</div>
                        <div className="text-[11px] text-slate-500 truncate">KYB &amp; executive verification</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Post */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      2
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950">Post Opportunity</div>
                        <div className="text-[11px] text-slate-500 truncate">List unfulfilled lead or service anonymously</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Discover */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      3
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950">Discover Deals</div>
                        <div className="text-[11px] text-slate-500 truncate">Browse verified partner mandates</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Express Interest */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      4
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950">Express Interest</div>
                        <div className="text-[11px] text-slate-500 truncate">Submit structured bilateral intent</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Acknowledge */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      5
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950">Acknowledge</div>
                        <div className="text-[11px] text-slate-500 truncate">CDOES mutual consent gate</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 6: Negotiate */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      6
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950">Negotiate</div>
                        <div className="text-[11px] text-slate-500 truncate">Calibrate rev-share &amp; scope</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 7: Agree */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      7
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950">Agree on Terms</div>
                        <div className="text-[11px] text-slate-500 truncate">Lock bilateral commercial terms</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 8: Handshake */}
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-[10px] font-bold flex items-center justify-center ring-4 ring-white shrink-0">
                      8
                    </div>
                    <div className="flex-1 bg-slate-950 text-white border border-slate-900 rounded-xl p-3 flex items-center gap-3 shadow-xs">
                      <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                        <Handshake className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white">Handshake &amp; Connect</div>
                        <div className="text-[11px] text-slate-300 truncate">Direct contacts &amp; dealroom unlocked</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: Three Core Pillars Section (#pillars)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200 py-12 sm:py-16" id="pillars">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full inline-block mb-3">
                THE THREE PILLARS OF RELAY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 tracking-tight leading-tight font-display">
                What Relay Does. How It Works. Why It's Different.
              </h2>
              <p className="text-sm sm:text-base font-medium text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
                The three foundations of a focused, zero-noise business network.
              </p>
            </div>

            {/* DESKTOP VIEW: 3-Column Grid (hidden on mobile) */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {PILLARS_DATA.map((pillar, idx) => (
                <div
                  key={pillar.num}
                  className={`bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all flex flex-col justify-between ${
                    idx === 1 ? "border-2 border-slate-950" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-3 py-1 rounded">
                        0{idx + 1} / {pillar.num}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${pillar.badgeClass}`}
                      >
                        {pillar.label}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4 leading-snug font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                  <div className="pt-6 mt-8 border-t border-slate-100">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 italic font-mono leading-snug">
                      {pillar.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE VIEW: Horizontal Swipeable Card Carousel (visible on < lg) */}
            <div className="block lg:hidden">
              <div
                ref={pillarsScrollRef}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const cardWidth = el.offsetWidth * 0.85;
                  const newIndex = Math.round(el.scrollLeft / cardWidth);
                  if (newIndex !== activePillarMobile && newIndex >= 0 && newIndex < PILLARS_DATA.length) {
                    setActivePillarMobile(newIndex);
                  }
                }}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 pt-1"
              >
                {PILLARS_DATA.map((pillar, idx) => (
                  <div
                    key={pillar.num}
                    className={`w-[85vw] sm:w-[380px] shrink-0 snap-center bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all flex flex-col justify-between ${
                      idx === 1 ? "border-2 border-slate-950" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                          0{idx + 1} / {pillar.num}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${pillar.badgeClass}`}
                        >
                          {pillar.label}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-3 leading-snug font-display">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.body}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-100">
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                        <p className="text-xs font-medium text-slate-900 italic font-mono leading-snug">
                          {pillar.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots & Navigation Buttons */}
              <div className="flex items-center justify-between pt-2 px-1">
                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {PILLARS_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActivePillarMobile(idx);
                        if (pillarsScrollRef.current) {
                          const container = pillarsScrollRef.current;
                          const card = container.children[idx] as HTMLElement | undefined;
                          if (card) {
                            const targetLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
                            container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
                          }
                        }
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activePillarMobile === idx
                          ? "w-7 bg-slate-950"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Swipe Helper Text / Arrows */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    Swipe {activePillarMobile + 1} of {PILLARS_DATA.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={activePillarMobile === 0}
                      onClick={() => {
                        const newIdx = Math.max(0, activePillarMobile - 1);
                        setActivePillarMobile(newIdx);
                        if (pillarsScrollRef.current) {
                          const container = pillarsScrollRef.current;
                          const card = container.children[newIdx] as HTMLElement | undefined;
                          if (card) {
                            const targetLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
                            container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
                          }
                        }
                      }}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={activePillarMobile === PILLARS_DATA.length - 1}
                      onClick={() => {
                        const newIdx = Math.min(PILLARS_DATA.length - 1, activePillarMobile + 1);
                        setActivePillarMobile(newIdx);
                        if (pillarsScrollRef.current) {
                          const container = pillarsScrollRef.current;
                          const card = container.children[newIdx] as HTMLElement | undefined;
                          if (card) {
                            const targetLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
                            container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
                          }
                        }
                      }}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: ProblemSection (The Lost Opportunity Problem)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                The Lost Opportunity Problem
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
                Businesses generate great opportunities they can't always pursue.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                When an inbound lead doesn't fit, it usually gets dropped or ignored. Relay turns those lost deals into steady revenue.
              </p>
            </div>

            {/* DESKTOP VIEW: 6-Grid Real-World Scenarios (hidden on mobile) */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
              {SCENARIOS_DATA.map((scenario) => (
                <div
                  key={scenario.tag}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        {scenario.tag}
                      </span>
                      <span className="text-[10px] font-mono bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-100 font-semibold">
                        Usually Lost
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-950 mb-1.5">
                      {scenario.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {scenario.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-[11.5px] font-mono text-emerald-800 bg-emerald-50/50 p-2 rounded-lg">
                    <strong>Relay Fix:</strong> {scenario.relayFix}
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE VIEW: Horizontal Snap Carousel (visible on < md) */}
            <div className="block md:hidden">
              {/* Carousel Swipe Hint */}
              <div className="flex items-center justify-between pb-2.5 mb-1 text-slate-500">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  REAL-WORLD SCENARIOS
                </span>
                <span className="text-[11px] font-mono font-semibold text-slate-500 flex items-center gap-1">
                  Swipe deals <span className="text-xs">→</span>
                </span>
              </div>

              {/* Snap Carousel Track */}
              <div
                className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-4 -mx-4 px-4 scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onScroll={(e) => {
                  const target = e.currentTarget;
                  const cardWidth = target.offsetWidth * 0.85;
                  const newIndex = Math.round(target.scrollLeft / cardWidth);
                  if (newIndex >= 0 && newIndex < SCENARIOS_DATA.length) {
                    setActiveScenarioMobile(newIndex);
                  }
                }}
              >
                {SCENARIOS_DATA.map((scenario, idx) => (
                  <div
                    key={scenario.tag}
                    className="min-w-[84vw] max-w-[84vw] snap-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between shrink-0"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          {scenario.tag}
                        </span>
                        <span className="text-[10px] font-mono bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100 font-bold">
                          Usually Lost
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 mb-2 font-display">
                        {scenario.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {scenario.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 text-[12px] font-mono text-emerald-900 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100/80 leading-snug">
                      <strong className="text-emerald-950 block mb-0.5">Relay Fix:</strong>
                      {scenario.relayFix}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {SCENARIOS_DATA.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeScenarioMobile === idx
                        ? "w-6 bg-slate-900"
                        : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: DifferentiatorSection (#exchange-model)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200 py-12 sm:py-16" id="exchange-model">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* DESKTOP VIEW: 12-Column Grid (hidden on mobile) */}
            <div className="hidden lg:grid grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-wider block mb-2">
                  How We're Different
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-5 leading-tight">
                  We Don’t Sell Leads.<br />
                  We Help Real Companies Trade Value.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  Lead brokers scrape outdated contact lists and spam them to ten competitors at once. That creates spam, damages your reputation, and burns trust. On Relay, you work directly with verified company leaders. Both sides agree on fair terms before any contact info is unlocked.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  <strong className="text-slate-950">You remain in full control.</strong> You decide what your deal is worth, choose who to work with, and only proceed when terms make business sense for you.
                </p>
                <div className="p-4 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-slate-800">
                  <span className="text-slate-400 block mb-1">Our Golden Rule:</span>
                  "No cold spam. No scraped lists. Just real business leaders making fair agreements."
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8">
                  <h3 className="text-sm font-mono uppercase tracking-wide text-slate-950 font-bold mb-4">
                    What You Can Trade on Relay
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Unlike rigid platforms, Relay allows flexible commercial agreements that fit your business:
                  </p>

                  {/* Multi-Value Pill Matrix */}
                  <div className="space-y-3">
                    <div className="p-3.5 bg-white border border-slate-200 rounded flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-slate-950 text-white flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold">
                        01
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-950 block">1. Unserviceable Leads</span>
                        <span className="text-xs text-slate-500">Refer deals you can't take and earn 10%–25% of collected revenue.</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-slate-950 text-white flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold">
                        02
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-950 block">2. Co-Selling &amp; Joint Bids</span>
                        <span className="text-xs text-slate-500">Team up with complementary firms to win projects neither could do alone.</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-slate-950 text-white flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold">
                        03
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-950 block">3. 1-to-1 Client Referrals</span>
                        <span className="text-xs text-slate-500">Introduce an ideal client to a partner, get an ideal client introduced back.</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-slate-950 text-white flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold">
                        04
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-950 block">4. Sales Distribution &amp; Resellers</span>
                        <span className="text-xs text-slate-500">Give a partner rights to sell your product in their home market.</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-slate-950 text-white flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold">
                        05
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-950 block">5. Team Skills &amp; Technology</span>
                        <span className="text-xs text-slate-500">Trade expert developer or advisory time for services your company needs.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE VIEW: Improved Interactive Segmented Bento (visible on < lg) */}
            <div className="block lg:hidden">
              {/* Header */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full inline-block mb-3">
                  HOW WE'RE DIFFERENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  We Don’t Sell Leads.<br />
                  We Trade Mutual Value.
                </h2>
              </div>

              {/* Segmented Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200/90 rounded-2xl mb-5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setDiffTabMobile("difference")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-center font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    diffTabMobile === "difference"
                      ? "bg-white text-slate-950 shadow-xs border border-slate-200/90"
                      : "text-slate-500 hover:text-slate-900 bg-transparent"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                  <span>The Difference</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDiffTabMobile("trade")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-center font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    diffTabMobile === "trade"
                      ? "bg-white text-slate-950 shadow-xs border border-slate-200/90"
                      : "text-slate-500 hover:text-slate-900 bg-transparent"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                  <span>What You Can Trade</span>
                </button>
              </div>

              {/* Tab 1: The Difference (Lead Brokers vs Relay Comparison) */}
              {diffTabMobile === "difference" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Visual Comparison Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3.5">
                    {/* Lead Brokers */}
                    <div className="p-3.5 bg-slate-100/90 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
                          <X className="w-3 h-3 text-slate-950" />
                        </span>
                        <span className="text-xs font-bold text-slate-950 font-display">
                          Traditional Lead Brokers
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600 pl-7 list-disc">
                        <li>Scraped &amp; outdated contact lists</li>
                        <li>Sold to multiple competitors at once</li>
                        <li>Low reply rates &amp; wasted budget</li>
                      </ul>
                    </div>

                    {/* Relay Exchange */}
                    <div className="p-3.5 bg-slate-950 text-white border border-slate-900 rounded-xl shadow-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
                          <Check className="w-3 h-3 text-slate-950" />
                        </span>
                        <span className="text-xs font-bold text-white font-display">
                          The Relay Model
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300 pl-7 list-disc">
                        <li>Direct verified business leaders</li>
                        <li>Both sides agree before contacts unlock</li>
                        <li>100% control over terms &amp; pricing</li>
                      </ul>
                    </div>
                  </div>

                  {/* Golden Rule Luxury Callout */}
                  <div className="bg-slate-950 text-white rounded-2xl p-4.5 shadow-md border border-slate-800">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      OUR GOLDEN RULE
                    </span>
                    <p className="text-xs font-medium text-slate-200 italic font-mono leading-relaxed">
                      “No cold spam. No scraped lists. Real businesses making fair deals.”
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: What You Can Trade (5 Trade Assets) */}
              {diffTabMobile === "trade" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">
                          01
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 font-display">
                          Unserviceable Leads
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        10%–25% Cut
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      Refer deals you can't take and earn ongoing collected revenue share.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">
                          02
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 font-display">
                          Co-Selling &amp; Joint Bids
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        Joint Contract
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      Team up with complementary firms to win projects neither could do alone.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">
                          03
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 font-display">
                          1-to-1 Client Referrals
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        Reciprocal
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      Introduce an ideal client to a partner, get an ideal client introduced back.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">
                          04
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 font-display">
                          Sales Distribution
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        Resellers
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      Give a partner rights to sell your product in their local home market.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">
                          05
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 font-display">
                          Team Skills &amp; Tech Barter
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        Expert Barter
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      Trade expert developer or advisory time for services your company needs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: EightStepJourney (#how-it-works)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#FAFAFA] border-b border-slate-200 py-12 sm:py-16" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                THE 8-STEP BILATERAL JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-3 mb-3 font-display">
                From Blinded Discovery to Delivered Value
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mb-6">
                From initial verification to final commercial handshake. Every step requires mutual confirmation and bilateral agreement.
              </p>
              <div className="flex items-center justify-center">
                <Link
                  to="/8-step-journey"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-medium tracking-tight shadow-md hover:shadow-xl transition-all duration-200 group border border-slate-800 hover:border-slate-700"
                >
                  <span>Explore Full 8-Step Interactive Journey</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: RealWorldWalkthrough (#real-walkthrough)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="hidden md:block bg-white border-b border-slate-200 py-12 sm:py-16" id="real-walkthrough">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-wider">
                Walkthrough Example
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2 mb-3">
                How a Live Exchange Actually Works
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                How two non-competing businesses turn a lost lead into guaranteed revenue.
              </p>
            </div>

            {/* Walkthrough Container */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Business A Box */}
                <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">Party A (The Introducer)</span>
                    <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-800 font-medium">
                      Verified B2B Agency
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 mb-2">The Situation:</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Received an inbound client request for a <strong>$35,000 CRM setup</strong>, but engineering is fully booked for 4 months.
                  </p>
                  <div className="text-xs font-mono text-slate-800 bg-white p-2.5 rounded border border-slate-200">
                    Action on Relay: Posted anonymously on Relay for a 12% revenue share.
                  </div>
                </div>

                {/* Business B Box */}
                <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">Party B (The Implementer)</span>
                    <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-800 font-medium">
                      Certified Tech Partner
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 mb-2">The Opportunity:</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Has available team members ready to start next week with verified skills and capacity.
                  </p>
                  <div className="text-xs font-mono text-slate-800 bg-white p-2.5 rounded border border-slate-200">
                    Action on Relay: Accepted the lead on Relay and agreed to the 12% referral fee.
                  </div>
                </div>
              </div>

              {/* The Resolution Banner */}
              <div className="p-5 bg-slate-950 text-white rounded-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                    The Mutual Outcome
                  </span>
                  <h4 className="text-base font-bold">
                    Party B wins and delivers the project. Party A receives $4,200 in revenue share for a lead they couldn't take anyway.
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Total cold outreach: Zero. Spam: Zero. Both sides worked through a secure, private dealroom.
                  </p>
                </div>
                <div className="shrink-0 font-mono text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-200">
                  Revenue Created: <span className="text-emerald-400 font-bold">+$4,200 from Zero</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: TrustAndVerificationDesk (#trust-verification)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50/80 border-b border-slate-200 py-10 sm:py-16" id="trust-verification">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Heading, Privacy Box & Verification Seals */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase text-slate-700 bg-slate-200/70 border border-slate-300/60 px-2.5 py-1 rounded-full mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Trust &amp; Safety Protocol
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    Real Businesses Only. Zero Spam.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                    Every member is verified by business registration and leadership identity before joining. Your client contacts and personal identity remain protected until both sides sign an agreement.
                  </p>
                </div>

                {/* Built-in Privacy & Protection Card */}
                <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-950">
                      Bilateral Privacy &amp; Protection
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1">
                      Direct phone numbers, corporate email addresses, and LinkedIn profiles are never public. Contact details are only unmasked after both sides accept mutual deal terms.
                    </p>
                  </div>
                </div>

                {/* Authentic Badges / Trust Seals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border border-slate-200 rounded-lg p-3 bg-white flex items-center gap-3 shadow-2xs">
                    <RelayVerificationSeal className="w-9 h-9 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-950 block font-mono">Verified Company</span>
                      <span className="text-[10px] text-slate-500 font-mono">Registry Checked</span>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-3 bg-white flex items-center gap-3 shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                      KYB
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-950 block font-mono">Executive Identity</span>
                      <span className="text-[10px] text-slate-500 font-mono">Human-Audited ID</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Clear Rules Comparison Tiles */}
              <div className="lg:col-span-6 bg-white p-5 sm:p-7 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wide text-slate-950 font-bold">
                    Clear Rules of Engagement
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Strict Protocol
                  </span>
                </div>

                {/* What Relay Does Tile */}
                <div className="bg-emerald-50/40 border border-emerald-200/70 rounded-lg p-3.5 sm:p-4 space-y-2.5">
                  <span className="text-xs font-bold text-emerald-800 uppercase font-mono flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    What Relay Guarantees:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>Verifies real corporate entities and leadership identities.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>Keeps opportunities 100% anonymous until mutual agreement.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>Provides structured templates for negotiation and rev-share.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>Maintains immutable records to protect against circumvention.</span>
                    </li>
                  </ul>
                </div>

                {/* What Relay Does NOT Do Tile */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 sm:p-4 space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase font-mono flex items-center gap-1.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0" />
                    Zero Tolerance Policies:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>Does not hold customer escrow or take hidden transaction fees.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>Does not interfere with how you deliver client work.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>Does not sell or share contact details with advertisers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>Does not allow cold spam, automated bot messages, or scraping.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: TargetAudienceSection
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                Designed for Commercial Operators
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Relay serves professionals with legitimate dealflow looking to establish high-integrity partnerships.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              <div className="bg-slate-50 p-4 rounded border border-slate-200">
                <span className="text-xs font-bold text-slate-950 block font-mono">B2B Founders</span>
                <span className="text-[11px] text-slate-500">Unlocking non-core pipeline</span>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-200">
                <span className="text-xs font-bold text-slate-950 block font-mono">Agency Leaders</span>
                <span className="text-[11px] text-slate-500">Offloading over-capacity</span>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-200">
                <span className="text-xs font-bold text-slate-950 block font-mono">SaaS Alliances</span>
                <span className="text-[11px] text-slate-500">Co-selling and integration</span>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-200">
                <span className="text-xs font-bold text-slate-950 block font-mono">Consultants</span>
                <span className="text-[11px] text-slate-500">Trading specialized deals</span>
              </div>
              <div className="col-span-2 md:col-span-1 bg-slate-50 p-4 rounded border border-slate-200">
                <span className="text-xs font-bold text-slate-950 block font-mono">BD &amp; Partner VPs</span>
                <span className="text-[11px] text-slate-500">Structured partner trades</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: LiveOpportunitiesPreview (#commercial-directory)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16" id="commercial-directory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-wider">
                  Live Board Preview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
                  Active Opportunities Ready for Review
                </h2>
              </div>
              <Link
                to="/opportunities"
                className="text-xs font-semibold text-slate-900 hover:text-black border border-slate-300 px-3 py-2 rounded hover:bg-white transition-all font-mono"
              >
                View All 1,482 Listings →
              </Link>
            </div>

            {/* 3 Opportunity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="border border-slate-200 rounded-lg p-5 bg-white hover:border-slate-300 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded font-medium">CO-SELLING PACT</span>
                    <span className="text-slate-500 font-bold">Match: 95%</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 mb-1">
                    Enterprise CRM Implementation
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mb-4">
                    Apex Logistics • Enterprise Practice • Verified Company
                  </p>
                  <div className="space-y-2 text-xs mb-4">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Seeking:</span>
                      <span className="text-slate-800">4-6 qualified enterprise migrations per quarter from certified partners.</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Offering in Return:</span>
                      <span className="text-slate-800">Reciprocal enterprise supply chain IT intros + 20% deal referral fees.</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Accepting Proposals
                  </span>
                  <Link
                    to="/opportunities"
                    className="text-xs bg-slate-950 hover:bg-black text-white px-3 py-1.5 rounded font-medium font-mono"
                  >
                    Propose Terms
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-slate-200 rounded-lg p-5 bg-white hover:border-slate-300 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded font-medium">RESOURCE TRADE</span>
                    <span className="text-slate-500 font-bold">Match: 92%</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 mb-1">
                    High-Performance Cloud GPU Clusters
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mb-4">
                    Hyperion Cloud Infrastructure • Verified Tech Firm
                  </p>
                  <div className="space-y-2 text-xs mb-4">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Seeking:</span>
                      <span className="text-slate-800">80 hours/month bespoke machine learning tuning &amp; advisory.</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Offering in Return:</span>
                      <span className="text-slate-800">2,000 GPU-hours dedicated cluster compute with ultra-fast interconnects.</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-600">
                    2 Proposals in Review
                  </span>
                  <Link
                    to="/opportunities"
                    className="text-xs bg-slate-950 hover:bg-black text-white px-3 py-1.5 rounded font-medium font-mono"
                  >
                    Propose Terms
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border border-slate-200 rounded-lg p-5 bg-white hover:border-slate-300 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded font-medium">MARKET ACCESS</span>
                    <span className="text-slate-500 font-bold">Match: 100%</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 mb-1">
                    Healthcare Compliance &amp; Data Integration
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mb-4">
                    Masked Enterprise Partner • Verified Corporation
                  </p>
                  <div className="space-y-2 text-xs mb-4">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Seeking:</span>
                      <span className="text-slate-800">Direct integration with electronic health record platforms across North America.</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Offering in Return:</span>
                      <span className="text-slate-800">Direct VP of Procurement introductions across 22 regional healthcare networks.</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold">
                    Active Dealroom
                  </span>
                  <Link
                    to="/opportunities"
                    className="text-xs bg-slate-950 hover:bg-black text-white px-3 py-1.5 rounded font-medium font-mono"
                  >
                    Propose Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BEGIN: FinalInstitutionalCTA (#explore)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-950 text-white relative overflow-hidden py-14 sm:py-20" id="explore">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-medium mb-6 uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-white">VERIFIED NETWORK</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-200 font-semibold">PRIVATE DEALROOMS</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-semibold">ZERO COLD OUTREACH</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-display">
                Stop Forfeiting Out-of-Scope Pipeline.<br />
                <span className="text-slate-400 font-normal text-2xl sm:text-3xl lg:text-4xl block mt-3 leading-relaxed">
                  Monetize leads you can't service. Partner with verified businesses to grow your revenue—without spam or cold outreach.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                Join verified business leaders trading misfit deals, strategic distribution, and specialist capacity.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5">
                <Link
                  to="/opportunities"
                  className="w-full sm:w-auto px-6 py-3.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Opportunities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/post"
                  className="w-full sm:w-auto px-6 py-3.5 rounded bg-white hover:bg-slate-100 text-slate-950 text-sm font-semibold border border-slate-300 shadow-xs transition-all flex items-center justify-center"
                >
                  Post an Opportunity
                </Link>
              </div>
            </div>

            {/* Three Simple Core Principles (Mirrored Pillars in Dark CTA) */}
            <div className="max-w-5xl mx-auto mt-10">
              <div className="text-center mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                  THE THREE PILLARS OF RELAY
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Pillar 1 */}
                <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs transition-all flex flex-col justify-between group hover:shadow-md text-slate-950">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider mb-3 inline-block">
                      PILLAR 01 · VALUE CREATION
                    </span>
                    <h3 className="text-base font-bold text-slate-950 mb-2 leading-snug">
                      Turn Unused Opportunities into Value
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Businesses can turn opportunities they can't use, don't need, or can't fulfil into value by exchanging them for revenue share, referrals, barter, or partnerships.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 bg-emerald-50/60 p-2 rounded">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reciprocal • Mutually agreed commercial upside</span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white p-5 sm:p-6 rounded-xl border-2 border-slate-900 shadow-xl shadow-black/20 hover:shadow-2xl transition-all flex flex-col justify-between group relative text-slate-950">
                  <div className="absolute -top-3 right-4 bg-slate-950 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider shadow-xs font-bold">
                    CDOES Standard
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded uppercase tracking-wider mb-3 inline-block">
                      PILLAR 02 · STRUCTURED CDOES
                    </span>
                    <h3 className="text-base font-bold text-slate-950 mb-2 leading-snug">
                      Structured Bilateral Control at Every Step
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Nothing is unlocked until both businesses independently acknowledge, negotiate, agree, and consent. Complete mutual control from start to finish.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-slate-900 bg-slate-100 p-2 rounded font-medium">
                    <Lock className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>No forced deals • Mutual digital handshake</span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs transition-all flex flex-col justify-between group hover:shadow-md text-slate-950">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider mb-3 inline-block">
                      PILLAR 03 · NO NOISE
                    </span>
                    <h3 className="text-base font-bold text-slate-950 mb-2 leading-snug">
                      Pure Commercial Exchange, Zero Distraction
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      No social network feeds, no followers, no likes, and zero spam. Verified businesses come strictly to exchange real commercial opportunities.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Zero cold outreach • Pure commercial exchange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            RETAINED: "Questions, answered." FAQ SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200" id="faq">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-2 text-center">
              <span className="font-mono text-[10px] text-[#F97316] font-bold uppercase tracking-[0.2em]">
                Got Questions?
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight">
                Questions, answered.
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2 pt-4">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-slate-200 rounded-[4px] bg-white px-3.5 sm:px-4 shadow-2xs"
                >
                  <AccordionTrigger className="text-left font-display font-bold text-xs sm:text-base text-slate-900 py-3 sm:py-3.5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1 pb-3 sm:pb-3.5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          BEGIN: MainFooter
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Summary */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-slate-950 text-white flex items-center justify-center font-mono font-bold text-xs rounded-[4px]">
                  R
                </div>
                <span className="font-extrabold tracking-widest text-slate-950 uppercase">THE RELAY</span>
              </Link>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                The governed B2B opportunity exchange where verified companies turn out-of-scope leads and strategic capacity into structured revenue.
              </p>
              <span className="font-mono text-[11px] text-slate-400 block">
                Zero Cold Outreach Network
              </span>
            </div>

            {/* Platform & Protocol */}
            <div>
              <h4 className="font-mono font-bold text-slate-950 uppercase tracking-wider text-[11px] mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><Link className="hover:text-slate-950 transition-colors" to="/8-step-journey">8-Step Journey</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/core-pillars">Core Pillars</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/trust-and-safety">Trust &amp; Safety</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/faq">Platform FAQ</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/about">About The Relay</Link></li>
              </ul>
            </div>

            {/* Commercial Hubs */}
            <div>
              <h4 className="font-mono font-bold text-slate-950 uppercase tracking-wider text-[11px] mb-3">Commercial Hubs</h4>
              <ul className="space-y-2">
                <li><Link className="hover:text-slate-950 transition-colors" to="/b2b-opportunity-exchange">Opportunity Exchange</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/b2b-lead-exchange">Lead Exchange</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/b2b-referral-network">Referral Network</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/b2b-partnership-network">Partnership Network</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/insights">Insights &amp; Knowledge</Link></li>
              </ul>
            </div>

            {/* Solutions & Vertical Hubs */}
            <div>
              <h4 className="font-mono font-bold text-slate-950 uppercase tracking-wider text-[11px] mb-3">Vertical Solutions</h4>
              <ul className="space-y-2">
                <li><Link className="hover:text-slate-950 transition-colors" to="/referral-partnerships">Referral Partnerships</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/channel-partnerships">Channel Partnerships</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/distribution-partners">Distribution Partners</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/agency-lead-exchange">Agency Dealflow Exchange</Link></li>
              </ul>
            </div>

            {/* Guides & Frameworks */}
            <div>
              <h4 className="font-mono font-bold text-slate-950 uppercase tracking-wider text-[11px] mb-3">Operator Guides</h4>
              <ul className="space-y-2">
                <li><Link className="hover:text-slate-950 transition-colors" to="/what-to-do-with-unqualified-leads">Unqualified Leads Decision</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/how-to-monetize-unqualified-leads">Monetize Unqualified Leads</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/how-to-find-b2b-referral-partners">Find B2B Referral Partners</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/how-to-find-distribution-partners">Find Distribution Partners</Link></li>
                <li><Link className="hover:text-slate-950 transition-colors" to="/how-to-exchange-business-leads">How to Exchange Leads</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
            <div>
              © 2025 The Relay. All rights reserved. Zero Cold Outreach Network.
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center gap-1 text-slate-500">
                <Check className="w-3 h-3 text-slate-900" />
                Private Dealrooms Active
              </span>
              <span>Verified Network</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FAQS = [
  {
    q: "How does Relay protect my company's identity?",
    a: "Every opportunity posted on Relay is double-blind by default. Your company name, contact details, and sensitive parameters remain masked. Only when you explicitly review and accept an inbound match does Relay facilitate the Step 07 Handshake to unmask executive contact details under bilateral non-circumvention terms.",
  },
  {
    q: "How do reciprocal exchanges and revenue shares work?",
    a: "When proposing on an opportunity, businesses structure reciprocal parity terms—such as a 10%-25% contract fee on closed business, direct reciprocal lead trades, or specialized technical barter. Both parties mutually sign off before any contact information is exchanged.",
  },
  {
    q: "Who can join The Relay?",
    a: "Relay is strictly reserved for operating B2B businesses, SaaS companies, specialized agencies, and verified enterprise leaders. Every entity undergoes automated and desk verification against business registries and corporate domain identity.",
  },
  {
    q: "Does Relay have direct messaging or spam?",
    a: "No. There are zero unsolicited DMs, cold outreach, or social feeds. Relay operates purely as an institutional deal arbitrage protocol. Once mutual handshake terms are finalized, parties communicate directly through their authenticated corporate channels.",
  },
  {
    q: "Is Relay a social network?",
    a: "No. There are no followers, likes, vanity metrics, or algorithm feeds. Every record revolves around a concrete, high-intent commercial brief.",
  },
  {
    q: "How do I get started?",
    a: "You can immediately explore live opportunities on the board or post an opportunity brief. Verified members can propose terms and execute handshakes instantly.",
  },
];
