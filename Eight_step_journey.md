<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="web_standard" name="shell-type"/>
<title>The Relay — 8-Step Journey</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            border: "#e2e8f0",
            background: "#f8fafc",
            surface: "#ffffff",
            "surface-subtle": "#f1f5f9",
            charcoal: "#0f172a",
            "charcoal-muted": "#1e293b",
            secondary: "#64748b",
            muted: "#94a3b8",
          },
          fontFamily: {
            sans: ["Inter", "sans-serif"],
            display: ["Plus Jakarta Sans", "sans-serif"],
          }
        }
      }
    }
  </script>
<style>
    @layer base {
      html, body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        color: #0f172a;
      }
    }
    ::-webkit-scrollbar { display: none; }
    .fade-transition {
      transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
    }
  </style>
</head>
<body class="bg-[#f8fafc] font-sans text-charcoal antialiased min-h-screen flex flex-col justify-between selection:bg-charcoal selection:text-white">
<!-- Minimalist Executive Header -->
<header class="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-border">
<div class="h-16 w-full max-w-6xl mx-auto px-6 flex items-center justify-between">
<div class="flex items-center gap-10">
<a class="flex items-center gap-2.5 group" href="#">
<img alt="The Relay Logo" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtnUymFeuWuUUK_nzFFJse1ZqrOdFuz9P61ww-pgCfcbTfHLvlBhmoNhzLVaVxjyjQSDpOhB8UJjMBsQ4KE5fy2uDeyIRw4nvLpAD0WsEj261DV-VCwFAx7LCyzziiKtc6VCRf5UMHup9Z5yS8-qCRHtHD1HDNmBlHoxf6UvZD1t54nus9VDpCKDvpF8sr0DBwbFn4gwwMbAdtqEOJf2mjDU4jYfk64zKgEri6XJHT0GuiSHmpz-UvVluo1aSjiqD8Yw"/>
<span class="font-display text-base font-bold tracking-tight text-charcoal">The Relay</span>
</a>
<nav class="hidden md:flex items-center gap-6">
<a class="text-sm font-medium text-secondary hover:text-charcoal transition-colors" data-path="opportunities" href="#">Opportunities</a>
<a class="text-sm font-medium text-secondary hover:text-charcoal transition-colors" data-path="how-it-works" href="#">How It Works</a>
<a class="text-sm font-medium text-secondary hover:text-charcoal transition-colors" data-path="core-pillars" href="#">Core Pillars</a>
<a class="text-sm font-medium text-charcoal border-b-2 border-charcoal pb-0.5" data-path="8-step-journey" href="#">8-Step Journey</a>
<a class="text-sm font-medium text-secondary hover:text-charcoal transition-colors" data-path="directory" href="#">Directory</a>
</nav>
</div>
<div class="flex items-center gap-4">
<a class="hidden sm:inline-flex text-sm font-medium text-secondary hover:text-charcoal transition-colors" data-path="sign-in" href="#">Sign In</a>
<a class="inline-flex items-center px-4 py-2 text-sm font-medium bg-charcoal text-white rounded-md hover:bg-charcoal-muted transition-colors shadow-sm" data-path="opportunities" href="#">Explore Opportunities</a>
</div>
</div>
</header>
<main class="w-full pt-28 pb-20 flex-1">
<!-- Hero Section -->
<section class="w-full max-w-5xl mx-auto px-6 pt-4 pb-8 text-center md:text-left">
<div class="flex flex-col gap-3">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle border border-border w-fit mx-auto md:mx-0 text-xs font-semibold text-secondary tracking-wider uppercase">
          PROTOCOL ARCHITECTURE • BILATERAL LIFECYCLE
        </div>
<h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight text-charcoal">
          The Relay Journey
        </h1>
<p class="font-display text-xl sm:text-2xl font-medium text-secondary">
          From opportunity to handshake.
        </p>
<p class="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Step through the 8 stages of consent-driven bilateral exchange. Relay gives verified enterprises complete control at every milestone without identity exposure or unsolicited outreach.
        </p>
</div>
<!-- Clickable 8-Step Navigation Bar -->
<div class="mt-8">
<div class="flex items-center justify-between overflow-x-auto gap-2 pb-2 p-1.5 bg-white border border-border rounded-xl shadow-xs" id="step-tabs-container">
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-transparent bg-charcoal text-white shadow-xs" data-step-index="0" onclick="goToStep(0)">
<span class="text-[10px] uppercase font-mono tracking-wider opacity-70">Step 01</span>
<span class="truncate font-display">Verify</span>
</button>
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white" data-step-index="1" onclick="goToStep(1)">
<span class="text-[10px] uppercase font-mono tracking-wider text-muted">Step 02</span>
<span class="truncate font-display">Post</span>
</button>
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white" data-step-index="2" onclick="goToStep(2)">
<span class="text-[10px] uppercase font-mono tracking-wider text-muted">Step 03</span>
<span class="truncate font-display">Discover</span>
</button>
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white" data-step-index="3" onclick="goToStep(3)">
<span class="text-[10px] uppercase font-mono tracking-wider text-muted">Step 04</span>
<span class="truncate font-display">Interest</span>
</button>
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white" data-step-index="4" onclick="goToStep(4)">
<span class="text-[10px] uppercase font-mono tracking-wider text-muted">Step 05</span>
<span class="truncate font-display">Acknowledge</span>
</button>
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white" data-step-index="5" onclick="goToStep(5)">
<span class="text-[10px] uppercase font-mono tracking-wider text-muted">Step 06</span>
<span class="truncate font-display">Negotiate</span>
</button>
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white" data-step-index="6" onclick="goToStep(6)">
<span class="text-[10px] uppercase font-mono tracking-wider text-muted">Step 07</span>
<span class="truncate font-display">Agree</span>
</button>
<button class="step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white" data-step-index="7" onclick="goToStep(7)">
<span class="text-[10px] uppercase font-mono tracking-wider text-muted">Step 08</span>
<span class="truncate font-display">Handshake</span>
</button>
</div>
</div>
</section>
<!-- Main Interactive Slideshow Stage -->
<section class="w-full max-w-5xl mx-auto px-6 mb-12">
<div class="bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
<!-- Progress Indicator Bar -->
<div class="w-full bg-surface-subtle h-1.5 relative overflow-hidden">
<div class="h-full bg-charcoal transition-all duration-300 ease-out" id="slideshow-progress" style="width: 12.5%;"></div>
</div>
<!-- Main Slide Content Canvas (Responsive 2-column) -->
<div class="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
<!-- Visual Illustration Canvas (Left) -->
<div class="lg:col-span-6 bg-[#f8fafc] border-b lg:border-b-0 lg:border-r border-border p-6 sm:p-10 flex flex-col items-center justify-center relative select-none">
<div class="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-secondary bg-white/80 border border-border/80 px-2.5 py-1 rounded-md">
<span class="w-1.5 h-1.5 rounded-full bg-charcoal"></span>
<span id="diagram-label">DIAGRAM • ACCREDITATION</span>
</div>
<div class="w-full h-full max-w-[420px] aspect-[16/11] flex items-center justify-center transition-all duration-300" id="slide-image-wrapper">
<img alt="Step Illustration" class="w-full h-full object-contain rounded-xl shadow-xs transition-opacity duration-200" id="slide-image" src="https://lh3.googleusercontent.com/aida/AEtjO1XTq0qDGF849qFd8DH_pfhSIi0rw-CuRhv-cCJlHkI-DYHxLAXR3d1vS_-8kFVJ8-TFqiow3TVBghmoCQuBMb1Q6dvemccLBfZcL5QKwltHDu8Ndnv94q2zC92M2W9ItXY25va_ogsJHYEz-L64N9XVeiQl_t-nHUGocgRMMiRVOGAAxzypjzm8xF36fJmRH0BdMASZylOWGZFK_3fW11x05TA6Lt1yh_k3luQLA4J5evM_fhIBuE1JJQM"/>
</div>
<div class="mt-3 flex items-center gap-2 text-xs text-secondary/80">
<span class="material-symbols-outlined text-[16px]">verified_user</span>
<span class="font-mono text-[11px]" id="slide-visual-caption">Cryptographic KYB &amp; LEI Verification</span>
</div>
</div>
<!-- Stage Details & Specifications (Right) -->
<div class="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
<div class="flex flex-col gap-4">
<!-- Top metadata row -->
<div class="flex items-center justify-between gap-2 border-b border-border pb-4">
<div class="flex items-center gap-2">
<span class="px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase bg-charcoal text-white" id="phase-badge">
                PHASE 01 • ACCREDITATION
              </span>
<span class="text-xs font-mono font-medium text-secondary" id="step-counter-badge">
                STEP 01 OF 08
              </span>
</div>
<span class="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-surface-subtle text-secondary border border-border" id="cdoes-status-tag">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Identity Protected
            </span>
</div>
<!-- Slide Headline & Body -->
<div class="mt-1">
<h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-charcoal" id="slide-title">
              01. VERIFY
            </h2>
<p class="font-display text-base font-semibold text-secondary mt-1" id="slide-subtitle">
              Join a network of verified businesses.
            </p>
<p class="text-sm text-secondary leading-relaxed mt-3" id="slide-description">
              Create your profile and complete verification so counterparties negotiate with verified peers only. Relay screens organizational validity prior to granting marketplace participation.
            </p>
</div>
<!-- Protocol Specs Micro Cards -->
<div class="mt-2">
<h4 class="text-[11px] font-bold uppercase tracking-wider text-charcoal mb-2 font-mono">Bilateral Protocol Covenants</h4>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5" id="specs-container">
<div class="p-2.5 rounded-lg border border-border bg-[#f8fafc]">
<p class="text-[11px] font-semibold text-charcoal">KYB &amp; LEI Check</p>
<p class="text-[10px] text-secondary mt-0.5">Enterprise entity validation</p>
</div>
<div class="p-2.5 rounded-lg border border-border bg-[#f8fafc]">
<p class="text-[11px] font-semibold text-charcoal">Signatory Verify</p>
<p class="text-[10px] text-secondary mt-0.5">Executive authority confirm</p>
</div>
<div class="p-2.5 rounded-lg border border-border bg-[#f8fafc]">
<p class="text-[11px] font-semibold text-charcoal">Zero Solicitations</p>
<p class="text-[10px] text-secondary mt-0.5">No cold outbound spam</p>
</div>
</div>
</div>
</div>
<!-- Carousel Navigation Controls Bar -->
<div class="pt-6 mt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
<div class="flex items-center gap-2">
<button class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-white text-xs font-semibold text-charcoal hover:bg-surface-subtle disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs" id="prev-btn" onclick="prevStep()">
<span class="material-symbols-outlined text-[16px]">arrow_back</span>
<span>Previous</span>
</button>
<button class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-charcoal text-white text-xs font-semibold hover:bg-charcoal-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs" id="next-btn" onclick="nextStep()">
<span>Next Step</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
<div class="flex items-center gap-3">
<button class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-secondary hover:text-charcoal hover:bg-surface-subtle transition-colors" id="autoplay-btn" onclick="toggleAutoPlay()">
<span class="material-symbols-outlined text-[16px]" id="autoplay-icon">play_arrow</span>
<span class="font-medium text-[11px]" id="autoplay-text">Auto-advance</span>
</button>
<span class="text-xs font-mono font-bold text-charcoal bg-surface-subtle px-2.5 py-1 rounded border border-border" id="step-numerical">
              01 / 08
            </span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- The Resolution Section ("Then, connect.") -->
<section class="w-full max-w-4xl mx-auto px-6 pt-6 pb-8">
<div class="mb-8">
<span class="text-xs font-semibold uppercase tracking-wider text-secondary">The Resolution</span>
<h2 class="font-display text-2xl sm:text-3xl font-bold text-charcoal mt-1">Then, connect.</h2>
<p class="text-sm sm:text-base text-secondary mt-1">
          Once bilateral terms are locked, Relay steps aside so counterparties direct their partnership freely.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Inside Relay -->
<div class="p-6 rounded-lg border border-border bg-surface flex flex-col justify-between">
<div>
<div class="flex items-center gap-2 mb-3">
<span class="w-2 h-2 rounded-full bg-charcoal"></span>
<h3 class="font-display text-base font-bold text-charcoal">Inside Relay</h3>
</div>
<p class="text-xs text-secondary mb-4 uppercase tracking-wider font-medium">The Protocol</p>
<ul class="space-y-3 text-sm text-charcoal">
<li class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">check</span>
<span>Blinded discovery and verified credentials</span>
</li>
<li class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">check</span>
<span>Structured mutual consent protocol</span>
</li>
<li class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">check</span>
<span>Bilateral term agreement without leakage</span>
</li>
</ul>
</div>
</div>
<!-- Outside Relay -->
<div class="p-6 rounded-lg border border-border bg-white flex flex-col justify-between">
<div>
<div class="flex items-center gap-2 mb-3">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<h3 class="font-display text-base font-bold text-charcoal">Outside Relay</h3>
</div>
<p class="text-xs text-secondary mb-4 uppercase tracking-wider font-medium">Direct Partnership</p>
<ul class="space-y-3 text-sm text-charcoal">
<li class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">arrow_forward</span>
<span>Direct executive contacts unlocked</span>
</li>
<li class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">arrow_forward</span>
<span>Sovereign contracts and legal agreements</span>
</li>
<li class="flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">arrow_forward</span>
<span>Long-term unmediated commercial relationship</span>
</li>
</ul>
</div>
</div>
</div>
</section>
<!-- Minimal Executive CTA -->
<section class="w-full max-w-4xl mx-auto px-6 py-12">
<div class="py-12 px-8 rounded-xl border border-border bg-surface text-center flex flex-col items-center gap-4">
<h2 class="font-display text-2xl sm:text-3xl font-bold text-charcoal">
          Ready to experience the 8-step journey?
        </h2>
<p class="text-sm sm:text-base text-secondary max-w-md">
          Turn unfulfillable pipeline into verified reciprocal partnerships.
        </p>
<div class="flex flex-col sm:flex-row items-center gap-3 mt-3">
<a class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-charcoal text-white rounded-md text-sm font-medium hover:bg-charcoal-muted transition-colors shadow-sm" data-path="opportunities" href="#">
            Explore Opportunities
          </a>
<a class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-white text-charcoal border border-border rounded-md text-sm font-medium hover:bg-surface-subtle transition-colors" data-path="post-opportunity" href="#">
            Post an Opportunity
          </a>
</div>
</div>
</section>
</main>
<!-- Clean Minimalist Footer -->
<footer class="w-full border-t border-border bg-white">
<div class="w-full max-w-6xl mx-auto px-6 py-10">
<div class="grid grid-cols-2 md:grid-cols-5 gap-8 pb-8 text-sm">
<div class="col-span-2 flex flex-col gap-3 pr-4">
<div class="flex items-center gap-2">
<img alt="The Relay Logo" class="h-5 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0uhD-qvXser1R0cl2ZN2Q7C7YTf8EM1PXMI2Bn_u816d2XJFHgLYoJCIdAdISXkb2Uhxj6JLEng0-Q0HaIF_-DsUlGGutJBP5cmMa_xuSocD4yg_KOdpqFERGEZEmSrlZ44sRPrexjDpZLOGUQ_C3sWSHEVokjOgQ6KqD_03YpMGx_kkunKrT21j9wImv131wJbQPZcrvyNlO9iaFcg1OJlYniuj8uVnhBqNztU7NC-GPU28-3oH6wXtMprTgPPQMnQ"/>
<span class="font-display text-sm font-bold text-charcoal">The Relay</span>
</div>
<p class="text-xs text-secondary leading-relaxed max-w-sm">
            Structured bilateral acquisition network engineered for verified counterparties and discreet consent-driven commercial exchanges.
          </p>
</div>
<div class="flex flex-col gap-2.5">
<span class="text-xs font-semibold uppercase tracking-wider text-charcoal">Architecture</span>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="protocol-spec" href="#">Protocol Spec</a>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="zero-knowledge-escrow" href="#">Zero-Knowledge Escrow</a>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="reciprocal-unmasking" href="#">Reciprocal Unmasking</a>
</div>
<div class="flex flex-col gap-2.5">
<span class="text-xs font-semibold uppercase tracking-wider text-charcoal">Governance</span>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="curation-committee" href="#">Curation Committee</a>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="underwriting-rules" href="#">Underwriting Rules</a>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="arbitration-charter" href="#">Arbitration Charter</a>
</div>
<div class="flex flex-col gap-2.5">
<span class="text-xs font-semibold uppercase tracking-wider text-charcoal">Legal</span>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="bilateral-nda-framework" href="#">Bilateral NDA</a>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="privacy-policy" href="#">Privacy &amp; Anonymity</a>
<a class="text-xs text-secondary hover:text-charcoal transition-colors" data-path="terms-of-protocol" href="#">Terms of Protocol</a>
</div>
</div>
<div class="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
<p>© 2025 The Relay Network Inc. All rights reserved.</p>
<div class="flex items-center gap-4">
<span>Verified Protocol</span>
<span>•</span>
<span>Sovereign Execution</span>
</div>
</div>
</div>
</footer>
<!-- Interactive Slideshow Controller Script -->
<script>
  const stepsData = [
    {
      index: 0,
      number: "01",
      name: "Verify",
      phase: "PHASE 01 • ACCREDITATION",
      title: "01. VERIFY",
      subtitle: "Join a network of verified businesses.",
      description: "Create your profile and complete verification so counterparties negotiate with verified peers only. Relay screens organizational validity prior to granting marketplace participation.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1XTq0qDGF849qFd8DH_pfhSIi0rw-CuRhv-cCJlHkI-DYHxLAXR3d1vS_-8kFVJ8-TFqiow3TVBghmoCQuBMb1Q6dvemccLBfZcL5QKwltHDu8Ndnv94q2zC92M2W9ItXY25va_ogsJHYEz-L64N9XVeiQl_t-nHUGocgRMMiRVOGAAxzypjzm8xF36fJmRH0BdMASZylOWGZFK_3fW11x05TA6Lt1yh_k3luQLA4J5evM_fhIBuE1JJQM",
      diagramLabel: "DIAGRAM • ACCREDITATION",
      caption: "Cryptographic KYB & LEI Verification",
      cdoesStatus: "Identity Protected",
      cdoesColor: "bg-emerald-600",
      specs: [
        { label: "KYB & LEI Check", desc: "Enterprise entity validation" },
        { label: "Signatory Verify", desc: "Executive authority confirm" },
        { label: "Zero Solicitations", desc: "No cold outbound spam" }
      ]
    },
    {
      index: 1,
      number: "02",
      name: "Post",
      phase: "PHASE 02 • LISTING DISCRETION",
      title: "02. POST",
      subtitle: "Put an opportunity on the table.",
      description: "Share a lead, referral, distribution channel, hiring requirement, or strategic partnership without exposing proprietary identifiers. Keep sensitive client data shielded.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1U9jyrWiv9sUhNsfWyxnahn-tcdVtW83W6PAVx9y-F98P1VrrRCDrr7N2N-jAFJBSEvM3oe8oaag6EushGDWAuuuGIaT87NOWDQ9RFZle8_TKjIlLhgUWAtvtFcAbBymEvCZJEDiD2KFOLR-8s6aDMVV28KrvMxZAI0KXeg4PM9HIwMnsiKNV2SRV1gtBtTCjVXLY6hoNOYutmnhuFIE5-MoyPdmva1z4XxIJpnF1vLFiohMhKunybIvS4",
      diagramLabel: "DIAGRAM • BLIND LISTING",
      caption: "Blinded Deal Specification & Parameters",
      cdoesStatus: "Identifiers Masked",
      cdoesColor: "bg-emerald-600",
      specs: [
        { label: "Masked Entity", desc: "No competitor tipping" },
        { label: "Parameter Bounds", desc: "Clear value & scope tags" },
        { label: "Underwriting Check", desc: "Curated deal quality" }
      ]
    },
    {
      index: 2,
      number: "03",
      name: "Discover",
      phase: "PHASE 03 • MARKET DISCOVERY",
      title: "03. DISCOVER",
      subtitle: "Find opportunities worth exploring.",
      description: "Browse and filter verified opportunities across categories by deal size, scope, geography, and industry without alerting competitors or triggering market rumors.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1Uqikky_PTAD953VqyflUJsRa8DpyfGYrcKZT0_NigEXb-QPdS3ASaMtCMtvniueehRDZbySUtSFxGigelX5dAz-dn-sdpK4eFD21CVUd4dnemqlO8fZ4ucFghm2RC_ZnwtsXYcPZL-6nmnggQZLUQxMFQE8iLnK4zke9VSC8L5kKCgyUdAzaxEOXd7-vVlmVPHn9LnSNeRu1N_sfv2TkrcUSpRuSr5CPyQpM5mx1-9Xstx09KlJ7Gj2TQ",
      diagramLabel: "DIAGRAM • BILATERAL MATCHING",
      caption: "Parametric Filtering & Match Engine",
      cdoesStatus: "Blinded Discovery",
      cdoesColor: "bg-blue-600",
      specs: [
        { label: "Multi-Filter Grid", desc: "Search deal sizes & sectors" },
        { label: "Zero Scraping", desc: "Bot & crawlers eliminated" },
        { label: "High Relevancy", desc: "Accredited peer counterparties" }
      ]
    },
    {
      index: 3,
      number: "04",
      name: "Express Interest",
      phase: "PHASE 04 • STRUCTURED INTENT",
      title: "04. EXPRESS INTEREST",
      subtitle: "Signal interest with structured intent.",
      description: "Send a focused proposal explaining why your business is relevant. Unsolicited outreach and aggressive sales pitching are strictly prevented by protocol design.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1Uqikky_PTAD953VqyflUJsRa8DpyfGYrcKZT0_NigEXb-QPdS3ASaMtCMtvniueehRDZbySUtSFxGigelX5dAz-dn-sdpK4eFD21CVUd4dnemqlO8fZ4ucFghm2RC_ZnwtsXYcPZL-6nmnggQZLUQxMFQE8iLnK4zke9VSC8L5kKCgyUdAzaxEOXd7-vVlmVPHn9LnSNeRu1N_sfv2TkrcUSpRuSr5CPyQpM5mx1-9Xstx09KlJ7Gj2TQ",
      diagramLabel: "DIAGRAM • INTENT SUBMISSION",
      caption: "Structured Mutual Fit Application",
      cdoesStatus: "Intent Stamped",
      cdoesColor: "bg-blue-600",
      specs: [
        { label: "Structured Form", desc: "Formal relevancy statement" },
        { label: "Capability Proof", desc: "Vetted peer capability" },
        { label: "Discreet Delivery", desc: "Direct to decision-maker" }
      ]
    },
    {
      index: 4,
      number: "05",
      name: "Acknowledge",
      phase: "PHASE 05 • CDOES GATEWAY",
      title: "05. ACKNOWLEDGE",
      subtitle: "Both sides understand the exchange.",
      description: "Where CDOES activates: mutual clarity, bilateral consent, and explicit alignment before any identity or value reveal occurs. Both parties acknowledge mutual fit.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1Wq66TuUovwf_AyqLAqjFCgg5Sz-3A6fu5c2NfwMSmHY66r88KMl6GkMu8sguUyCwwePI2N7rlRrC5cz2ohZw5d4QOByrYetLaQ889S-mLfK_pbEb51JNg5vkSgIyH1QM7l9F43qv0snHAevTTrw2CjrZejwp8G4KhTZ0PdGWibYIEvL_kGQBXJrv5rnQPVpKtHJE3JWTRzO-95camWpgpjPJ5262AAwfnIvK0aIMQEWm3YEw8UDivLPRM",
      diagramLabel: "DIAGRAM • CONSENT GATEWAY",
      caption: "CDOES Mutual Consent Protocol Activation",
      cdoesStatus: "CDOES Gateway Active",
      cdoesColor: "bg-indigo-600",
      specs: [
        { label: "Bilateral Gate", desc: "Two-way verified handshake" },
        { label: "Pre-Reveal Consent", desc: "Explicit assent required" },
        { label: "Zero Leakage", desc: "Identities remain blind" }
      ]
    },
    {
      index: 5,
      number: "06",
      name: "Negotiate",
      phase: "PHASE 06 • BILATERAL ALIGNMENT",
      title: "06. NEGOTIATE",
      subtitle: "Decide what the exchange means to both sides.",
      description: "Propose, counter-propose, and agree on commercial value (e.g., Lead ↔ Rev Share, Referral ↔ Referral, Intro ↔ Partnership) within clean parameterized bounds.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1Wq66TuUovwf_AyqLAqjFCgg5Sz-3A6fu5c2NfwMSmHY66r88KMl6GkMu8sguUyCwwePI2N7rlRrC5cz2ohZw5d4QOByrYetLaQ889S-mLfK_pbEb51JNg5vkSgIyH1QM7l9F43qv0snHAevTTrw2CjrZejwp8G4KhTZ0PdGWibYIEvL_kGQBXJrv5rnQPVpKtHJE3JWTRzO-95camWpgpjPJ5262AAwfnIvK0aIMQEWm3YEw8UDivLPRM",
      diagramLabel: "DIAGRAM • VALUE RATIO MATRIX",
      caption: "Parametric Bilateral Counter-Offers",
      cdoesStatus: "Escrow Protected",
      cdoesColor: "bg-indigo-600",
      specs: [
        { label: "Terms Builder", desc: "Flexible reciprocal structures" },
        { label: "Counter-Offers", desc: "Structured terms revisions" },
        { label: "Real-Time Balance", desc: "Equal symmetry check" }
      ]
    },
    {
      index: 6,
      number: "07",
      name: "Agree",
      phase: "PHASE 07 • BILATERAL ACCORD",
      title: "07. AGREE",
      subtitle: "Confirm the exact exchange terms.",
      description: "Both businesses independently confirm final exchange terms. No assumed value. Double bilateral sign-off commits both sides before disclosure occurs.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1Wq66TuUovwf_AyqLAqjFCgg5Sz-3A6fu5c2NfwMSmHY66r88KMl6GkMu8sguUyCwwePI2N7rlRrC5cz2ohZw5d4QOByrYetLaQ889S-mLfK_pbEb51JNg5vkSgIyH1QM7l9F43qv0snHAevTTrw2CjrZejwp8G4KhTZ0PdGWibYIEvL_kGQBXJrv5rnQPVpKtHJE3JWTRzO-95camWpgpjPJ5262AAwfnIvK0aIMQEWm3YEw8UDivLPRM",
      diagramLabel: "DIAGRAM • DOUBLE ASSENT",
      caption: "Simultaneous Multi-Party Sign-Off",
      cdoesStatus: "Assent Locked",
      cdoesColor: "bg-charcoal",
      specs: [
        { label: "Double Sign-Off", desc: "Independent confirmation" },
        { label: "Term Locking", desc: "No scope or pricing drift" },
        { label: "Enforceable Accord", desc: "Protocol arbitration ready" }
      ]
    },
    {
      index: 7,
      number: "08",
      name: "Handshake",
      phase: "PHASE 08 • UNMASK & EXECUTION",
      title: "08. HANDSHAKE",
      subtitle: "Connect and take it forward.",
      description: "Both businesses consent to unlock verified contact details. Relay facilitates the connection; the businesses execute the commercial exchange direct and unmediated.",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1Wq66TuUovwf_AyqLAqjFCgg5Sz-3A6fu5c2NfwMSmHY66r88KMl6GkMu8sguUyCwwePI2N7rlRrC5cz2ohZw5d4QOByrYetLaQ889S-mLfK_pbEb51JNg5vkSgIyH1QM7l9F43qv0snHAevTTrw2CjrZejwp8G4KhTZ0PdGWibYIEvL_kGQBXJrv5rnQPVpKtHJE3JWTRzO-95camWpgpjPJ5262AAwfnIvK0aIMQEWm3YEw8UDivLPRM",
      diagramLabel: "DIAGRAM • DIRECT UNMASKING",
      caption: "Contact Unlocked & Sovereign Execution",
      cdoesStatus: "Contacts Unlocked",
      cdoesColor: "bg-emerald-600",
      specs: [
        { label: "Direct Contacts", desc: "Executive email & phone" },
        { label: "Relay Steps Out", desc: "Sovereign direct execution" },
        { label: "Reputation Boost", desc: "Network reciprocity score +" }
      ]
    }
  ];

  let currentStep = 0;
  let autoPlayTimer = null;

  function renderStep(idx) {
    currentStep = idx;
    const data = stepsData[idx];

    // Update Text Elements
    document.getElementById('phase-badge').innerText = data.phase;
    document.getElementById('step-counter-badge').innerText = `STEP ${data.number} OF 08`;
    document.getElementById('slide-title').innerText = data.title;
    document.getElementById('slide-subtitle').innerText = data.subtitle;
    document.getElementById('slide-description').innerText = data.description;
    document.getElementById('diagram-label').innerText = data.diagramLabel;
    document.getElementById('slide-visual-caption').innerText = data.caption;
    document.getElementById('step-numerical').innerText = `${data.number} / 08`;

    // Update Status Tag
    const statusTag = document.getElementById('cdoes-status-tag');
    statusTag.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${data.cdoesColor}"></span>${data.cdoesStatus}`;

    // Update Specs
    const specsContainer = document.getElementById('specs-container');
    specsContainer.innerHTML = data.specs.map(spec => `
      <div class="p-2.5 rounded-lg border border-border bg-[#f8fafc]">
        <p class="text-[11px] font-semibold text-charcoal">${spec.label}</p>
        <p class="text-[10px] text-secondary mt-0.5">${spec.desc}</p>
      </div>
    `).join('');

    // Smooth Image Swap
    const imgElement = document.getElementById('slide-image');
    imgElement.classList.add('opacity-40');
    setTimeout(() => {
      imgElement.src = data.image;
      imgElement.alt = `Illustration for Step ${data.number}: ${data.name}`;
      imgElement.classList.remove('opacity-40');
    }, 120);

    // Update Progress Bar
    const progressPercent = ((idx + 1) / 8) * 100;
    document.getElementById('slideshow-progress').style.width = `${progressPercent}%`;

    // Update Tab Buttons
    const tabs = document.querySelectorAll('.step-tab');
    tabs.forEach((tab, i) => {
      if (i === idx) {
        tab.className = "step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-transparent bg-charcoal text-white shadow-xs";
        const prefix = tab.querySelector('span:first-child');
        if (prefix) prefix.className = "text-[10px] uppercase font-mono tracking-wider opacity-70";
      } else {
        tab.className = "step-tab flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all flex flex-col gap-0.5 border border-border/70 hover:border-charcoal/40 text-secondary hover:text-charcoal bg-white";
        const prefix = tab.querySelector('span:first-child');
        if (prefix) prefix.className = "text-[10px] uppercase font-mono tracking-wider text-muted";
      }
    });

    // Update Button Disabled States
    document.getElementById('prev-btn').disabled = (idx === 0);
    const nextBtn = document.getElementById('next-btn');
    if (idx === 7) {
      nextBtn.innerHTML = `<span>Restart</span><span class="material-symbols-outlined text-[16px]">restart_alt</span>`;
    } else {
      nextBtn.innerHTML = `<span>Next Step</span><span class="material-symbols-outlined text-[16px]">arrow_forward</span>`;
    }
  }

  function goToStep(idx) {
    renderStep(idx);
  }

  function nextStep() {
    if (currentStep < 7) {
      renderStep(currentStep + 1);
    } else {
      renderStep(0);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      renderStep(currentStep - 1);
    }
  }

  function toggleAutoPlay() {
    const icon = document.getElementById('autoplay-icon');
    const text = document.getElementById('autoplay-text');
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
      icon.innerText = "play_arrow";
      text.innerText = "Auto-advance";
    } else {
      autoPlayTimer = setInterval(nextStep, 4500);
      icon.innerText = "pause";
      text.innerText = "Pause";
    }
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextStep();
    if (e.key === 'ArrowLeft') prevStep();
  });

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderStep(0);
  });
</script>
</body></html>

// design.md
---
name: Monochrome Executive
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#575f6e'
  primary: '#010611'
  on-primary: '#ffffff'
  primary-container: '#171f2c'
  on-primary-container: '#7f8797'
  inverse-primary: '#bfc7d8'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000712'
  on-tertiary: '#ffffff'
  tertiary-container: '#112030'
  on-tertiary-container: '#79889c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe3f5'
  primary-fixed-dim: '#bfc7d8'
  on-primary-fixed: '#141c29'
  on-primary-fixed-variant: '#3f4756'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#d4e4fa'
  tertiary-fixed-dim: '#b9c8de'
  on-tertiary-fixed: '#0d1c2d'
  on-tertiary-fixed-variant: '#39485a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-refined, institutional-grade digital atmosphere tailored for top-tier private equity, venture syndicates, and M&A advisory teams handling high-velocity dealflow. The design philosophy draws on strict Swiss-influenced minimalism combined with high-finance restraint. 

Interactions must communicate discretion, certainty, and absolute clarity. We avoid decorative distractions, expressive gradients, whimsical micro-interactions, or vibrant signaling colors. Depth and state changes rely on typography weight shifts, hairline borders, and calculated spatial gaps. The resulting aesthetic feels closer to a private wealth prospectus or architectural blueprint than a conventional SaaS tool.

## Colors

The system employs an uncompromising, disciplined monochrome palette. No chromatic alerts, green yields, or amber warnings are permitted.

- **Primary Canvas & Foreground:** 
  - Canvas Base: `#F8FAFC`
  - High-Emphasis Neutral / Primary Surfaces: `#FFFFFF`
  - Deep Anchor / Primary Foreground: `#171F2C` (used for structural fills, dominant text, primary active states)
- **Secondary & Muted Tiers:**
  - Structural Hairlines & Dividers: `#E2E8F0`
  - Secondary Data / Metadata: `#64748B`
  - Tertiary Muted / Placeholders / Inactive Ticks: `#94A3B8`

States (success, caution, destructive) are distinguished entirely through semantic text copy, typographic styling, structural icons, or contrasting neutral badges (`#171F2C` against `#FFFFFF` or `#E2E8F0`), never through color-coded status chips.

## Typography

The type system blends the confident, structured geometry of Plus Jakarta Sans for executive titles with the neutral, hyper-legible utility of Inter for data density and operational flows.

- **Headlines (Plus Jakarta Sans):** Tightly tracked display and headline styles set an authoritative tone. Never use italic variants or soft weights for headers; keep them firmly anchored in medium, semibold, or bold.
- **Body & Data (Inter):** Tabular figures (`tnum`) must be enforced for all deal volumes, currency amounts, timestamps, and pipeline stages to ensure strict columnar scanability across financial models.
- **Labels (Inter):** High-density labels utilize uppercase tracking (`0.04em`) at the smallest scale (`label-sm`) for metric tags, stage descriptors, and ledger items.

## Layout & Spacing

The layout is built on a 12-column responsive fluid grid with precise, proportional bounds to comfortably support deal tables, pipeline swimlanes, and executive summaries.

- **Desktop (1280px and above):** 12-column grid, `margin: 2rem`, `gutter: 1.5rem`. Maximum layout container width is capped at 1600px for optimal line-length discipline.
- **Tablet (768px – 1279px):** 8-column grid, `margin: 1.5rem`, `gutter: 1rem`. Side panels and multi-column comparison tables collapse into stacked, tabbed views.
- **Mobile (< 768px):** 4-column grid, `margin-mobile: 1rem`, `gutter-sm: 1rem`. Data grids shift to linear card-row patterns with hairline horizontal separations.
- **Rhythm & Padding:** Structural white space is generous. Cards and operational blocks avoid dense, claustrophobic inner margins, defaulting to `space-lg` internally to ensure high-value transactions are viewed with breathing room.

## Elevation & Depth

This design system deliberately eliminates drop shadows, floating blurs, and skeuomorphic layering. Hierarchy is communicated exclusively via **low-contrast outlines, hairline borders, and pure surface shifts**.

- **Surfaces:** The canvas background is fixed at `#F8FAFC`. Elevated modules (cards, deal panels, flyouts, and toolbars) sit on crisp `#FFFFFF` surfaces.
- **Outlines:** All bounded elements use a crisp 1px solid border (`#E2E8F0`). Borders do not soften on hover; interactions are indicated by shifting border contrast from `#E2E8F0` to `#171F2C` or background fills to `#F8FAFC`.
- **Modals & Drawers:** High-priority overlays maintain flat white `#FFFFFF` fills bounded by a 1px `#171F2C` border. Backdrops use an unblurred, clean solid overlay of `#171F2C` with a fixed opacity of 40%.

## Shapes

The geometric form factor relies on razor-sharp precision. Roundedness is strictly constrained to standard 4px corners (`0.25rem`) across all actionable elements, inputs, and containment modules.

- **Base Radius (4px):** Applied to buttons, text input fields, selection boxes, chips, and data cards.
- **Strict Prohibition:** Full pills (`border-radius: 9999px`), circular status dots, and heavy rounded card corners are strictly disallowed. The UI reflects institutional architectural drafting, characterized by squared discipline and exact 90-degree rhythm slightly softened only to prevent visual artifacting on high-DPI displays.

## Components

### Buttons
- **Primary:** Solid `#171F2C` background, `#FFFFFF` text, 1px border (`#171F2C`), 4px corner radius. Hover state transitions to `#1E293B` background.
- **Secondary / Outline:** Pure `#FFFFFF` background, `#171F2C` text, 1px border (`#E2E8F0`). Hover transitions to `#F8FAFC` background and `#171F2C` border.
- **Tertiary / Ghost:** Transparent background, `#64748B` text, no border. Hover transitions to `#171F2C` text and `#F8FAFC` background fill.
- **Size & Padding:** Standard height is 36px (compact) and 42px (default) with `space-md` horizontal padding. Typography is strictly `label-md`.

### Status & Deal Stage Chips
- **Structure:** 4px radius, 1px solid border, 22px fixed height, `label-sm` uppercase text.
- **Palette Rules:** Absolutely no red, green, blue, or yellow badges.
  - *Active / Sourced:* `#FFFFFF` background, `#171F2C` border, `#171F2C` text.
  - *Under Review / Diligence:* `#F8FAFC` background, `#E2E8F0` border, `#64748B` text.
  - *Archived / Closed:* `#171F2C` background, `#171F2C` border, `#FFFFFF` text.

### Inputs & Controls
- **Text Inputs:** Height 40px, `#FFFFFF` background, 1px `#E2E8F0` border, 4px corner radius, `#171F2C` text, `#94A3B8` placeholder. Focus state transitions border to 1px `#171F2C` with zero shadow ring.
- **Checkboxes & Radios:** Sharp 4px boxes (and 4px softened radio marks). Inactive: `#FFFFFF` fill, 1px `#E2E8F0` border. Checked: `#171F2C` fill, solid white check/dot indicator.

### Cards & Deal Rows
- **Deal Card:** `#FFFFFF` background, 1px solid `#E2E8F0` border, 4px corner radius, padded with `space-lg`. Hover effect is a border transition to `#171F2C`.
- **Data Tables:** Outer border 1px `#E2E8F0`. Header row uses `#F8FAFC` with uppercase `label-sm` text in `#64748B`. Row dividers are 1px `#E2E8F0`. Hover row state is a subtle switch to `#F8FAFC`.

### Executive Metrics (KPI Tiles)
- Clean card container with a split-level hierarchy: uppercase `label-sm` in `#64748B` on top, followed by large tabular display figures (`display-lg`) in `#171F2C`, completed by secondary variance text denoted via standard typography symbols (e.g., `+14.2% YOY` in `#64748B`).