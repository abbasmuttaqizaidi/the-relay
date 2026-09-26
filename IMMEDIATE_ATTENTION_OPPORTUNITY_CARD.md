<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"primary-container":"#171f2c","surface-container-highest":"#e0e3e5","on-secondary-container":"#54647a","outline-variant":"#c5c6cc","surface":"#f7f9fb","surface-bright":"#f7f9fb","on-secondary-fixed":"#0b1c30","background":"#f7f9fb","on-error":"#ffffff","secondary-fixed-dim":"#b7c8e1","on-tertiary":"#ffffff","primary-fixed":"#dbe3f5","surface-dim":"#d8dadc","on-primary-fixed-variant":"#3f4756","inverse-primary":"#bfc7d8","inverse-on-surface":"#eff1f3","surface-container-lowest":"#ffffff","surface-tint":"#575f6e","primary-fixed-dim":"#bfc7d8","on-secondary":"#ffffff","on-tertiary-fixed":"#0d1c2d","tertiary-fixed-dim":"#b9c8de","surface-container":"#eceef0","surface-container-low":"#f2f4f6","tertiary-container":"#112030","inverse-surface":"#2d3133","error":"#ba1a1a","on-secondary-fixed-variant":"#38485d","on-tertiary-fixed-variant":"#39485a","on-primary":"#ffffff","secondary":"#505f76","on-tertiary-container":"#79889c","secondary-container":"#d0e1fb","tertiary-fixed":"#d4e4fa","outline":"#75777c","on-error-container":"#93000a","on-primary-fixed":"#141c29","tertiary":"#000712","error-container":"#ffdad6","primary":"#010611","surface-variant":"#e0e3e5","secondary-fixed":"#d3e4fe","on-primary-container":"#7f8797","on-background":"#191c1e","on-surface":"#191c1e","on-surface-variant":"#45474c","surface-container-high":"#e6e8ea"},borderRadius:{DEFAULT:"0.125rem",lg:"0.25rem",xl:"0.5rem",full:"0.75rem"},spacing:{margin:"2rem","margin-mobile":"1rem","gutter-sm":"1rem","space-xl":"2.5rem","space-sm":"0.5rem",gutter:"1.5rem","gutter-lg":"2rem","space-lg":"1.5rem","space-md":"1rem","space-xs":"0.25rem"},fontFamily:{"body-md":["Inter"],"headline-lg-mobile":["Plus Jakarta Sans"],"display-lg":["Plus Jakarta Sans"],"label-sm":["Inter"],"headline-lg":["Plus Jakarta Sans"],"body-sm":["Inter"],"title-md":["Inter"],"body-lg":["Inter"],"headline-md":["Plus Jakarta Sans"],"label-md":["Inter"],"headline-sm":["Plus Jakarta Sans"]},fontSize:{"body-md":["14px",{lineHeight:"20px",letterSpacing:"0em",fontWeight:"400"}],"headline-lg-mobile":["26px",{lineHeight:"34px",letterSpacing:"-0.01em",fontWeight:"600"}],"display-lg":["48px",{lineHeight:"56px",letterSpacing:"-0.02em",fontWeight:"700"}],"label-sm":["11px",{lineHeight:"16px",letterSpacing:"0.04em",fontWeight:"600"}],"headline-lg":["32px",{lineHeight:"40px",letterSpacing:"-0.015em",fontWeight:"600"}],"body-sm":["12px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"400"}],"title-md":["15px",{lineHeight:"22px",letterSpacing:"-0.005em",fontWeight:"600"}],"body-lg":["16px",{lineHeight:"24px",letterSpacing:"0em",fontWeight:"400"}],"headline-md":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"600"}],"label-md":["13px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"500"}],"headline-sm":["18px",{lineHeight:"26px",letterSpacing:"-0.005em",fontWeight:"600"}]}}}}</script></head><body class="bg-surface font-body-md text-on-surface min-h-screen flex flex-col"><header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full px-margin flex items-center justify-between"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-sm"><div class="w-7 h-7 bg-primary flex items-center justify-center rounded"><span class="material-symbols-outlined text-on-primary text-[18px]">sync_alt</span></div><span class="font-headline-sm text-headline-sm text-primary tracking-tight font-semibold">The Relay</span></div><div class="h-4 w-px bg-surface-container-highest"></div><div class="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider"><span class="hover:text-on-surface transition-colors cursor-pointer">Component Specs</span><span class="text-outline-variant">/</span><span class="hover:text-on-surface transition-colors cursor-pointer">Opportunity Cards</span><span class="text-outline-variant">/</span><span class="text-on-surface font-medium">Action Required</span></div></div><nav class="hidden lg:flex items-center gap-space-sm" data-active-classes="bg-primary-container text-on-primary font-medium"><a aria-current="page" class="px-space-md py-1.5 rounded transition-colors bg-primary-container text-on-primary font-medium" data-path="opportunity-card-spec" href="#">Overview</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-md py-1.5 rounded transition-colors" data-path="token-matrix" href="#">Design Tokens</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-md py-1.5 rounded transition-colors" data-path="contrast-benchmarks" href="#">Accessibility Matrix</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-md py-1.5 rounded transition-colors" data-path="pattern-library" href="#">Pattern Library</a></nav><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs px-2.5 py-1 bg-surface-container-low rounded border border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm tracking-wider uppercase"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span><span>WCAG AAA Compliant</span></div><div class="h-4 w-px bg-surface-container-highest"></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full pt-16 bg-surface flex-1"><div class="flex flex-col w-full">
<!-- Spec System Ribbon -->
<section class="w-full bg-surface-container-lowest shadow-sm">
<div class="max-w-[1600px] mx-auto px-margin py-space-xl">
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-lg">
<div class="max-w-3xl">
<div class="flex items-center gap-space-sm mb-space-xs">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container rounded font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-medium">
<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Core Component Specification · REL-OPP-09
            </span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container rounded font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant">
              Approved Production Target
            </span>
</div>
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold mt-1">
            Opportunity Card — Immediate Attention Specification
          </h1>
<p class="font-body-lg text-body-lg text-secondary mt-space-xs leading-relaxed">
            Purpose-built visual hierarchy to signal urgent bilateral turn ownership, binding SLA time windows, and required executive action without causing panic or visual glare in high-volume institutional deal pipelines.
          </p>
</div>
<!-- Metric Indicator Tile -->
<div class="flex items-center gap-space-md">
<div class="bg-surface-container-low p-space-md rounded shadow-sm text-right">
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Intervention Latency</span>
<span class="block font-display-lg text-display-lg text-primary font-bold tracking-tight">4.2<span class="text-headline-md font-medium text-secondary">m</span></span>
<span class="block font-body-sm text-body-sm text-secondary font-medium">Median partner response</span>
</div>
<div class="bg-surface-container-low p-space-md rounded shadow-sm text-right">
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Target SLA Integrity</span>
<span class="block font-display-lg text-display-lg text-primary font-bold tracking-tight">99.8<span class="text-headline-md font-medium text-secondary">%</span></span>
<span class="block font-body-sm text-body-sm text-secondary font-medium">Zero unauthorized lapses</span>
</div>
</div>
</div>
<!-- Approved Semantic Token Strip -->
<div class="bg-surface-container-low p-space-md rounded shadow-sm">
<div class="flex items-center justify-between pb-space-sm mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[18px]">palette</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Approved Semantic Token Ensembles (WCAG AAA Calibrated)</span>
</div>
<span class="font-label-sm text-label-sm text-secondary">Contrast verified on #FFFFFF surface canvas</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<!-- Warm Amber Spec Token -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-start justify-between">
<div>
<span class="inline-block px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold tracking-wider uppercase bg-[#FFFBEB] text-[#B45309]">
                  Urgent Action · Direction A
                </span>
<p class="font-headline-sm text-headline-sm text-primary mt-1 font-semibold">Warm Amber Ensemble</p>
</div>
<span class="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded">7.42:1 AAA</span>
</div>
<p class="font-body-sm text-body-sm text-secondary my-2">
              Assigned to pending bilateral response turns, counterparty revisions, and active counter-offer timers (&gt;2 hours).
            </p>
<div class="flex items-center gap-2 pt-2">
<span class="w-4 h-4 rounded bg-[#D97706] shadow-sm" title="Solid Accent #D97706"></span>
<span class="w-4 h-4 rounded bg-[#FFFBEB] shadow-sm" title="Surface Wash #FFFBEB"></span>
<span class="w-4 h-4 rounded bg-[#B45309] shadow-sm" title="Deep Text #B45309"></span>
<span class="font-label-sm text-label-sm text-secondary ml-auto">Tokens: #D97706 / #FFFBEB</span>
</div>
</div>
<!-- Crimson Slate Spec Token -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-start justify-between">
<div>
<span class="inline-block px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold tracking-wider uppercase bg-[#FEF2F2] text-[#991B1B]">
                  Breach Hazard · Direction B
                </span>
<p class="font-headline-sm text-headline-sm text-primary mt-1 font-semibold">Crimson Slate Ensemble</p>
</div>
<span class="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded">8.11:1 AAA</span>
</div>
<p class="font-body-sm text-body-sm text-secondary my-2">
              Restricted to critical SLA breaches, auto-lapse risks under 2 hours, or expiring covenant validations.
            </p>
<div class="flex items-center gap-2 pt-2">
<span class="w-4 h-4 rounded bg-[#DC2626] shadow-sm" title="Solid Accent #DC2626"></span>
<span class="w-4 h-4 rounded bg-[#FEF2F2] shadow-sm" title="Surface Wash #FEF2F2"></span>
<span class="w-4 h-4 rounded bg-[#991B1B] shadow-sm" title="Deep Text #991B1B"></span>
<span class="font-label-sm text-label-sm text-secondary ml-auto">Tokens: #DC2626 / #FEF2F2</span>
</div>
</div>
<!-- Mineral Sage Spec Token -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-start justify-between">
<div>
<span class="inline-block px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold tracking-wider uppercase bg-[#F0FDF4] text-[#15803D]">
                  Verified Parity · Direction C
                </span>
<p class="font-headline-sm text-headline-sm text-primary mt-1 font-semibold">Mineral Sage Ensemble</p>
</div>
<span class="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded">7.89:1 AAA</span>
</div>
<p class="font-body-sm text-body-sm text-secondary my-2">
              Indicates verified KYB status, binding mutual handshake locks, and fully ratified multi-party legal covenants.
            </p>
<div class="flex items-center gap-2 pt-2">
<span class="w-4 h-4 rounded bg-[#16A34A] shadow-sm" title="Solid Accent #16A34A"></span>
<span class="w-4 h-4 rounded bg-[#F0FDF4] shadow-sm" title="Surface Wash #F0FDF4"></span>
<span class="w-4 h-4 rounded bg-[#15803D] shadow-sm" title="Deep Text #15803D"></span>
<span class="font-label-sm text-label-sm text-secondary ml-auto">Tokens: #16A34A / #F0FDF4</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Interactive Sandbox & Architectural Variants -->
<section class="w-full max-w-[1600px] mx-auto px-margin py-space-xl">
<!-- Section Header with Variant Filter Tabs -->
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg pb-space-sm">
<div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm tracking-wider uppercase text-secondary font-semibold">Evaluation Suite</span>
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm text-secondary">Select implementation archetype</span>
</div>
<h2 class="font-headline-md text-headline-md text-primary font-semibold tracking-tight mt-0.5">
          Architectural Exploration Matrix
        </h2>
</div>
<!-- Filter Controls (Active JS toggling) -->
<div class="flex items-center bg-surface-container-high p-1 rounded gap-1 shadow-sm">
<button class="variant-tab active px-3 py-1.5 rounded font-label-md text-label-md text-primary font-semibold bg-surface-container-lowest shadow-sm transition-all" id="tab-all" onclick="switchVariant('all')">
          Comparative View (All 3)
        </button>
<button class="variant-tab px-3 py-1.5 rounded font-label-md text-label-md text-secondary hover:text-primary transition-all" id="tab-var1" onclick="switchVariant('var1')">
          1. Amber Horizon
        </button>
<button class="variant-tab px-3 py-1.5 rounded font-label-md text-label-md text-secondary hover:text-primary transition-all" id="tab-var2" onclick="switchVariant('var2')">
          2. Crimson SLA
        </button>
<button class="variant-tab px-3 py-1.5 rounded font-label-md text-label-md text-secondary hover:text-primary transition-all" id="tab-var3" onclick="switchVariant('var3')">
          3. Split Deck
        </button>
</div>
</div>
<!-- Variant Containers -->
<div class="grid grid-cols-1 gap-space-xl">
<!-- ========================================== -->
<!-- VARIANT 1: THE AMBER HORIZON (RECOMMENDED) -->
<!-- ========================================== -->
<div class="variant-panel transition-all duration-300" id="wrapper-var1">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-semibold bg-primary text-on-primary">Variant 01</span>
<span class="font-title-md text-title-md text-primary font-semibold">The Amber Horizon (Balanced Executive Urgency)</span>
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-medium bg-[#FFFBEB] text-[#B45309]">Recommended Baseline</span>
</div>
<span class="font-body-sm text-body-sm text-secondary">Structure: Integrated SLA Header + Term Table Grid + Primary Action Anchor</span>
</div>
<!-- The Actual Component: Variant 1 -->
<div class="relative bg-surface-container-lowest rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden group">
<!-- Top Warm Amber Indicator Strip (Active Pulse) -->
<div class="w-full bg-[#FFFBEB] px-space-lg py-2.5 flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex items-center gap-2.5">
<span class="relative flex h-2.5 w-2.5">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75"></span>
<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D97706]"></span>
</span>
<span class="font-label-sm text-label-sm uppercase font-semibold tracking-wider text-[#B45309]">
                Action Required · Your Turn to Act
              </span>
<span class="text-[#D97706] font-body-sm text-body-sm">•</span>
<span class="font-label-sm text-label-sm font-semibold tracking-wide text-[#92400E]">
                SLA Window Closing in 03h 42m (18:00 UTC)
              </span>
</div>
<div class="flex items-center gap-space-sm font-label-sm text-label-sm text-[#B45309]">
<span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[15px]">history_toggle_off</span> Turn Latency: 42m elapsed</span>
<span class="text-secondary/30">|</span>
<span class="flex items-center gap-1 font-medium"><span class="material-symbols-outlined text-[15px]">verified_user</span> Escrow Stage 02</span>
</div>
</div>
<!-- Main Body Section -->
<div class="p-space-lg">
<!-- Counterparty & High-Level Metadata Bar -->
<div class="flex flex-wrap items-start justify-between gap-space-md mb-space-md">
<div class="flex items-center gap-space-md">
<!-- Counterparty Monogram Avatar -->
<div class="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-headline-sm font-bold text-primary">
                  SX
                </div>
<div>
<div class="flex items-center gap-2">
<span class="font-title-md text-title-md text-primary font-semibold">Synthetix AI</span>
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-[#F0FDF4] text-[#15803D]">
<span class="material-symbols-outlined text-[13px]">verified</span> KYB Verified
                    </span>
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm font-medium bg-surface-container text-secondary">
                      B2B SaaS / Infra
                    </span>
</div>
<h3 class="font-headline-md text-headline-md text-primary font-semibold mt-1 tracking-tight">
                    European Cloud Distribution &amp; DACH Enterprise Channel Access
                  </h3>
</div>
</div>
<!-- Match Parity & Score -->
<div class="flex items-center gap-space-md bg-surface-container-low px-space-md py-2 rounded shadow-sm">
<div class="text-right">
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Relay Match Parity</span>
<span class="block font-title-md text-title-md font-bold text-primary">98.4% Symmetric</span>
</div>
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span class="material-symbols-outlined text-[18px]">sync_alt</span>
</div>
</div>
</div>
<!-- Core Financial and Transaction Matrix -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-space-sm bg-surface-container-low p-space-md rounded shadow-sm mb-space-md">
<div>
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Annual Contract ARR</span>
<span class="block font-headline-sm text-headline-sm text-primary font-bold mt-0.5">€420,000 <span class="text-body-sm font-normal text-secondary">/ yr</span></span>
</div>
<div>
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Value Exchange Terms</span>
<span class="block font-body-md text-body-md text-primary font-semibold mt-0.5">25% Gross Rev-Share + $15k SLA</span>
</div>
<div>
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Pipeline Stage</span>
<span class="block font-body-md text-body-md text-primary font-semibold mt-0.5 flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-primary"></span>
                  02 · Bilateral Term Lock
                </span>
</div>
<div>
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Jurisdiction / Venue</span>
<span class="block font-body-md text-body-md text-primary font-semibold mt-0.5">Frankfurt (GDPR Prime)</span>
</div>
</div>
<!-- Immediate Attention Trigger Box -->
<div class="bg-[#FFFBEB] p-space-md rounded shadow-sm mb-space-lg flex items-start gap-space-md">
<div class="w-8 h-8 rounded bg-[#FEF3C7] text-[#B45309] flex-shrink-0 flex items-center justify-center mt-0.5">
<span class="material-symbols-outlined text-[20px]">notification_important</span>
</div>
<div class="flex-1">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-[#92400E] font-semibold">Immediate Attention Trigger · Revision #2 Received</span>
<span class="font-label-sm text-label-sm text-[#B45309] font-medium">Auto-Escrow Enforced</span>
</div>
<p class="font-body-md text-body-md text-[#78350F] mt-1 leading-relaxed">
                  Synthetix AI Legal adjusted Clause 8.2 (Exclusivity territory narrowed to Germany &amp; Austria, removing Switzerland). Protocol consensus escrow mandates your explicit approval or revised counter-redline before 18:00 UTC to maintain deal priority.
                </p>
</div>
</div>
<!-- Action Command Footer -->
<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md pt-space-xs">
<div class="flex items-center gap-space-md text-secondary font-label-md text-label-md">
<span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">visibility</span> Viewed by Marcus V. (Principal)</span>
<span class="text-secondary/40">•</span>
<span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">attachment</span> 3 Redlines attached</span>
</div>
<!-- High Contrast Button Group -->
<div class="flex items-center gap-space-sm">
<button class="px-space-md h-10 rounded font-label-md text-label-md font-medium text-secondary hover:text-primary hover:bg-surface-container transition-colors">
                  Decline / Pass Turn
                </button>
<button class="px-space-md h-10 rounded font-label-md text-label-md font-semibold text-primary bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px]">edit_document</span>
                  Review Redlines
                </button>
<button class="px-space-lg h-10 rounded font-label-md text-label-md font-semibold text-on-primary bg-primary hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm">
<span>Respond to Counter-Offer</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</div>
<!-- ============================================== -->
<!-- VARIANT 2: CRIMSON SLA BREACH (CRITICAL < 2H) -->
<!-- ============================================== -->
<div class="variant-panel transition-all duration-300" id="wrapper-var2">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-semibold bg-[#991B1B] text-on-error">Variant 02</span>
<span class="font-title-md text-title-md text-primary font-semibold">The Crimson SLA Breach Warning (Critical &lt; 2h Expiration)</span>
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-medium bg-[#FEF2F2] text-[#991B1B]">Imminent Lapse State</span>
</div>
<span class="font-body-sm text-body-sm text-secondary">Structure: Hairline Warning Scrim + Binary Execution Anchor</span>
</div>
<!-- The Actual Component: Variant 2 -->
<div class="relative bg-surface-container-lowest rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
<!-- Critical Red Alert Strip -->
<div class="w-full bg-[#FEF2F2] px-space-lg py-2.5 flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex items-center gap-2.5">
<span class="relative flex h-2.5 w-2.5">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-90"></span>
<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC2626]"></span>
</span>
<span class="font-label-sm text-label-sm uppercase font-bold tracking-wider text-[#991B1B]">
                CRITICAL SLA DEADLINE · 01h 14m REMAINING
              </span>
<span class="text-[#DC2626] font-body-sm text-body-sm">•</span>
<span class="font-label-sm text-label-sm font-semibold text-[#7F1D1D]">
                Auto-Lapse Scheduled at 15:30 UTC
              </span>
</div>
<div class="flex items-center gap-space-sm font-label-sm text-label-sm text-[#991B1B]">
<span class="font-medium bg-[#FEE2E2] px-2 py-0.5 rounded flex items-center gap-1">
<span class="material-symbols-outlined text-[15px]">timer</span> Final Escalation Notice
              </span>
</div>
</div>
<div class="p-space-lg">
<div class="flex flex-wrap items-start justify-between gap-space-md mb-space-md">
<div class="flex items-center gap-space-md">
<div class="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-headline-sm font-bold text-primary">
                  CF
                </div>
<div>
<div class="flex items-center gap-2">
<span class="font-title-md text-title-md text-primary font-semibold">Crestview Capital &amp; Apex Clearing</span>
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-[#F0FDF4] text-[#15803D]">
<span class="material-symbols-outlined text-[13px]">verified</span> Institutional Tier 1
                    </span>
</div>
<h3 class="font-headline-md text-headline-md text-primary font-semibold mt-1 tracking-tight">
                    Cross-Border Settlement Liquidity Facility (Tranche B Mandate)
                  </h3>
</div>
</div>
<!-- Deal Size Gauge -->
<div class="text-right bg-surface-container-low px-space-md py-2 rounded shadow-sm">
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Allocated Mandate</span>
<span class="block font-headline-md text-headline-md font-bold text-primary">$12,500,000 <span class="font-normal text-headline-sm text-secondary">USD</span></span>
</div>
</div>
<!-- Two-Column Urgency Briefing -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-space-md mb-space-lg">
<!-- Left 2 Cols: Details -->
<div class="lg:col-span-2 space-y-space-sm">
<div class="bg-surface-container-low p-space-md rounded shadow-sm">
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary mb-1">Required Intervention</span>
<p class="font-body-md text-body-md text-primary font-medium">
                    Covenant Ratification Pending Your Countersignature. Both institutional general partners have signed. As designated Relay Principal, your execution will release capital escrow into the execution pool.
                  </p>
</div>
<div class="flex items-center gap-space-lg text-secondary font-label-sm text-label-sm px-1">
<span>Signatory: John Doe (Managing Partner)</span>
<span>•</span>
<span>Escrow Hash: 0x8a92...b41e</span>
<span>•</span>
<span>Jurisdiction: Delaware Commercial Court</span>
</div>
</div>
<!-- Right Col: Risk Consequence -->
<div class="bg-[#FEF2F2] p-space-md rounded shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center gap-1.5 text-[#991B1B] font-label-sm text-label-sm uppercase font-semibold">
<span class="material-symbols-outlined text-[16px]">warning</span> Consequence of Default
                  </div>
<p class="font-body-sm text-body-sm text-[#7F1D1D] mt-1">
                    If unratified by 15:30 UTC, Tranche B releases automatically to alternate syndicate syndicate queue. Priority position will be permanently forfeited.
                  </p>
</div>
<div class="pt-2">
<span class="font-label-sm text-label-sm text-[#991B1B] font-semibold underline cursor-pointer hover:text-[#7F1D1D]">
                    Review Escrow Covenant Bylaws →
                  </span>
</div>
</div>
</div>
<!-- Binary Decisive Actions -->
<div class="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
<button class="w-full sm:w-auto px-space-md h-10 rounded font-label-md text-label-md font-medium text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5">
<span class="material-symbols-outlined text-[18px]">more_time</span>
                Request 24h SLA Extension
              </button>
<div class="flex items-center gap-space-sm w-full sm:w-auto">
<button class="w-full sm:w-auto px-space-md h-10 rounded font-label-md text-label-md font-semibold text-primary bg-surface-container hover:bg-surface-container-high transition-colors">
                  Delegate to Signatory
                </button>
<button class="w-full sm:w-auto px-space-xl h-10 rounded font-label-md text-label-md font-semibold text-on-error bg-[#DC2626] hover:bg-[#B91C1C] transition-colors flex items-center justify-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-[18px]">draw</span>
<span>Countersign &amp; Complete Handshake</span>
</button>
</div>
</div>
</div>
</div>
</div>
<!-- ============================================== -->
<!-- VARIANT 3: SPLIT-SURFACE CARD (DECK ARCHITECTURE) -->
<!-- ============================================== -->
<div class="variant-panel transition-all duration-300" id="wrapper-var3">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-space-xs">
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-semibold bg-secondary text-on-secondary">Variant 03</span>
<span class="font-title-md text-title-md text-primary font-semibold">The Integrated Split-Surface Card (Turn Indicator + Terms Breakdown)</span>
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-medium bg-surface-container text-on-surface-variant">Analytical Layout</span>
</div>
<span class="font-body-sm text-body-sm text-secondary">Structure: Dual Compartment (70% Opportunity Intel / 30% Dedicated Action Deck)</span>
</div>
<!-- The Actual Component: Variant 3 -->
<div class="bg-surface-container-lowest rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
<!-- Left Compartment: Opportunity Deep Dive (8 Cols) -->
<div class="p-space-lg lg:col-span-8 flex flex-col justify-between">
<div>
<!-- Micro Badge Bar -->
<div class="flex items-center gap-space-sm mb-space-sm">
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-semibold bg-surface-container text-primary">
                  Syndicate Turn ID #849-B
                </span>
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
<span class="material-symbols-outlined text-[15px]">timer</span> Published 2.5 hours ago
                </span>
<span class="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-[#F0FDF4] text-[#15803D]">
<span class="material-symbols-outlined text-[14px]">shield_with_heart</span> Zero Leakage Verified
                </span>
</div>
<!-- Deal Title & Counterparty -->
<h3 class="font-headline-md text-headline-md text-primary font-semibold tracking-tight">
                Joint Venture Commercial Real Estate Tokenization Engine
              </h3>
<p class="font-body-md text-body-md text-secondary mt-1">
                Initiated by <strong>Nordic FinTech Partners</strong> · Multi-asset yield distributor with regulatory clearance across FINMA &amp; BaFin jurisdictions.
              </p>
<!-- Inline Metric Grid -->
<div class="grid grid-cols-3 gap-space-sm my-space-md py-space-sm bg-surface-container-low p-space-md rounded">
<div>
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Underlying AUM</span>
<span class="block font-title-md text-title-md font-bold text-primary mt-0.5">€85,000,000</span>
</div>
<div>
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Target Fee Spread</span>
<span class="block font-title-md text-title-md font-bold text-primary mt-0.5">38 bps net</span>
</div>
<div>
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">Syndicate Allocation</span>
<span class="block font-title-md text-title-md font-bold text-primary mt-0.5">40% Co-General Partner</span>
</div>
</div>
<!-- Terms Synopsis -->
<p class="font-body-sm text-body-sm text-secondary leading-relaxed">
                Counterparty has satisfied Step 1 (KYB and Non-Solicitation). The process now halts pending your affirmative validation of mutual disclosure protocols before virtual data room (VDR) decryption keys are exchanged.
              </p>
</div>
<!-- Footer Meta -->
<div class="flex items-center gap-space-md pt-space-md font-label-sm text-label-sm text-secondary">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">folder_shared</span> Data Room ID: #VDR-9201</span>
<span>•</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">verified</span> Safe-Harbor Compliant</span>
</div>
</div>
<!-- Right Compartment: Dedicated Action Deck (4 Cols) -->
<div class="lg:col-span-4 bg-surface-container-low p-space-lg flex flex-col justify-between">
<div>
<!-- Urgent Turn Header -->
<div class="flex items-center justify-between pb-space-sm mb-space-sm">
<span class="px-2.5 py-1 rounded font-label-sm text-label-sm uppercase font-bold tracking-wider bg-[#FFFBEB] text-[#B45309] shadow-sm flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span> Action Required
                </span>
<span class="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
                  Turn #02
                </span>
</div>
<!-- SLA Countdown Dial Visual -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm text-center mb-space-md">
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary mb-1">Time Remaining to Respond</span>
<div class="flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[#D97706] text-[22px]">hourglass_top</span>
<span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">04h 15m 22s</span>
</div>
<div class="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div class="bg-[#D97706] h-full rounded-full" style="width: 68%;"></div>
</div>
<span class="block font-label-sm text-label-sm text-secondary mt-1.5">Expires today at 19:00 UTC</span>
</div>
<!-- Mandatory Action Notice -->
<div class="mb-space-md">
<span class="block font-label-sm text-label-sm uppercase tracking-wider text-secondary mb-1">Mandatory Next Action</span>
<p class="font-body-sm text-body-sm text-primary font-medium">
                  Execute bilateral Non-Circumvent &amp; Non-Disclosure Agreement (NCND v3.1) to open encrypted VDR.
                </p>
</div>
</div>
<!-- Decisive Deck Buttons -->
<div class="space-y-space-xs pt-space-sm">
<button class="w-full h-11 rounded font-label-md text-label-md font-semibold text-on-primary bg-primary hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-[18px]">verified</span>
<span>Sign NCND &amp; Unlock Stage 2</span>
</button>
<button class="w-full h-9 rounded font-label-md text-label-md font-medium text-secondary hover:text-primary hover:bg-surface-container transition-colors">
                Pass to Authorized Delegate
              </button>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- ============================================== -->
<!-- REAL WORKSPACE CONTEXT: IN-SITU BOARD VIEW     -->
<!-- ============================================== -->
<section class="w-full bg-surface-container-low py-space-xl">
<div class="max-w-[1600px] mx-auto px-margin">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
<div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">In-Situ Verification</span>
<h2 class="font-headline-md text-headline-md text-primary font-semibold tracking-tight mt-0.5">
            Real Pipeline Queue Context
          </h2>
<p class="font-body-md text-body-md text-secondary mt-1">
            Observe how the Urgent Attention Card effortlessly captures immediate executive focus when placed alongside standard "Waiting on Partner" and "Completed Handshake" states without visual clutter.
          </p>
</div>
<div class="flex items-center gap-space-sm font-label-sm text-label-sm text-secondary">
<span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-[#D97706]"></span> Urgent Turn (1)</span>
<span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-surface-variant"></span> Waiting External (1)</span>
<span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-[#16A34A]"></span> Ratified (1)</span>
</div>
</div>
<!-- In-Situ 3-Card Comparison Row -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-space-md items-start">
<!-- CARD 1: IMMEDIATE ATTENTION CARD (THE HERO) -->
<div class="bg-surface-container-lowest rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
<div>
<!-- Warm Amber Header Strip -->
<div class="bg-[#FFFBEB] px-space-md py-2 flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
<span class="font-label-sm text-label-sm font-bold uppercase tracking-wider text-[#B45309]">
                  Immediate Action Required
                </span>
</div>
<span class="font-label-sm text-label-sm font-bold text-[#92400E]">03h 42m Left</span>
</div>
<!-- Content Area -->
<div class="p-space-md">
<div class="flex items-center justify-between gap-2 mb-2">
<span class="font-label-sm text-label-sm uppercase font-semibold text-secondary">Synthetix AI · SaaS Infra</span>
<span class="font-label-sm text-label-sm font-bold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded">98% Parity</span>
</div>
<h4 class="font-title-md text-title-md text-primary font-bold">
                European Cloud Distribution &amp; DACH Enterprise Channel
              </h4>
<!-- Quick Term Chip -->
<div class="my-space-md p-2 rounded bg-surface-container-low flex items-center justify-between">
<div>
<span class="block font-label-sm text-label-sm text-secondary">Contract Value</span>
<span class="font-label-md text-label-md font-bold text-primary">€420,000 / YR</span>
</div>
<div class="text-right">
<span class="block font-label-sm text-label-sm text-secondary">Pending Action</span>
<span class="font-label-md text-label-md font-bold text-[#B45309]">Clause 8.2 Redline</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-secondary line-clamp-2">
                Counterparty revised exclusivity scope. Protocol requires your formal turn response before 18:00 UTC.
              </p>
</div>
</div>
<!-- Bottom Action Group -->
<div class="p-space-md pt-0">
<button class="w-full h-10 rounded font-label-md text-label-md font-semibold text-on-primary bg-primary hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm">
<span>Respond to Counter-Offer</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
<!-- CARD 2: WAITING ON PARTNER (NEUTRAL / PASSIVE) -->
<div class="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
<div>
<!-- Neutral Header Strip -->
<div class="bg-surface-container px-space-md py-2 flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
                  Waiting on Counterparty
                </span>
</div>
<span class="font-label-sm text-label-sm text-secondary">SLA: 22h remaining</span>
</div>
<!-- Content Area -->
<div class="p-space-md">
<div class="flex items-center justify-between gap-2 mb-2">
<span class="font-label-sm text-label-sm uppercase font-semibold text-secondary">Helix Life Sciences · Pharma</span>
<span class="font-label-sm text-label-sm font-semibold text-secondary bg-surface-container px-1.5 py-0.5 rounded">91% Parity</span>
</div>
<h4 class="font-title-md text-title-md text-primary font-bold">
                Cellular Therapeutics IP Licensing &amp; APAC Co-Development
              </h4>
<div class="my-space-md p-2 rounded bg-surface-container-low flex items-center justify-between">
<div>
<span class="block font-label-sm text-label-sm text-secondary">Milestone Deal</span>
<span class="font-label-md text-label-md font-bold text-primary">$3,800,000 Cap</span>
</div>
<div class="text-right">
<span class="block font-label-sm text-label-sm text-secondary">Turn Status</span>
<span class="font-label-md text-label-md font-medium text-secondary">Legal Counsel Review</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-secondary line-clamp-2">
                Proposal submitted 4 hours ago. Helix primary signatory was notified and is currently performing initial diligence.
              </p>
</div>
</div>
<!-- Bottom Action Group -->
<div class="p-space-md pt-0 flex items-center gap-space-sm">
<button class="w-full h-10 rounded font-label-md text-label-md font-medium text-secondary bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">notifications_paused</span>
              Send Gentle Ping
            </button>
<button class="h-10 px-3 rounded font-label-md text-label-md text-secondary bg-surface-container-low hover:bg-surface-container" title="View Dossier">
<span class="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</div>
</div>
<!-- CARD 3: COMPLETED HANDSHAKE (ARCHIVED / RATIFIED) -->
<div class="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
<div>
<!-- Verified Success Strip -->
<div class="bg-[#F0FDF4] px-space-md py-2 flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#16A34A]"></span>
<span class="font-label-sm text-label-sm font-bold uppercase tracking-wider text-[#15803D]">
                  Handshake Complete · Ratified
                </span>
</div>
<span class="font-label-sm text-label-sm font-semibold text-[#15803D]">Fully Bound</span>
</div>
<!-- Content Area -->
<div class="p-space-md">
<div class="flex items-center justify-between gap-2 mb-2">
<span class="font-label-sm text-label-sm uppercase font-semibold text-secondary">Beacon Logistics · Fleet</span>
<span class="font-label-sm text-label-sm font-bold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded">100% Locked</span>
</div>
<h4 class="font-title-md text-title-md text-primary font-bold">
                North American Fleet Electrification Mandate &amp; Depot Access
              </h4>
<div class="my-space-md p-2 rounded bg-surface-container-low flex items-center justify-between">
<div>
<span class="block font-label-sm text-label-sm text-secondary">Final Agreement</span>
<span class="font-label-md text-label-md font-bold text-primary">$18.2M Total Mandate</span>
</div>
<div class="text-right">
<span class="block font-label-sm text-label-sm text-secondary">Escrow Proof</span>
<span class="font-label-md text-label-md font-semibold text-[#15803D]">0x5c7f...e201</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-secondary line-clamp-2">
                All 4 covenants countersigned. Virtual Data Room transitioned to permanent custodial audit record.
              </p>
</div>
</div>
<!-- Bottom Action Group -->
<div class="p-space-md pt-0">
<button class="w-full h-10 rounded font-label-md text-label-md font-medium text-primary bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">file_download</span>
              Export Executed Deal Vault
            </button>
</div>
</div>
</div>
</div>
</section>
<!-- ============================================== -->
<!-- INTERACTIVE STATE MATRIX & EXPAND/COLLAPSE SPEC -->
<!-- ============================================== -->
<section class="w-full max-w-[1600px] mx-auto px-margin py-space-xl">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
<div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">State Dynamics</span>
<h2 class="font-headline-md text-headline-md text-primary font-semibold tracking-tight mt-0.5">
          Density Adaptation: Expanded vs Collapsed Stream State
        </h2>
<p class="font-body-md text-body-md text-secondary mt-1">
          When managing high-volume portfolio views, the Opportunity Card collapses into a compact hairline ledger row while preserving instant glanceability of urgent turn ownership.
        </p>
</div>
<div class="flex items-center gap-space-xs">
<button class="px-space-md py-2 bg-primary text-on-primary rounded font-label-md text-label-md font-semibold hover:bg-primary-container transition-all flex items-center gap-2" id="btn-toggle-demo" onclick="toggleDensityDemo()">
<span class="material-symbols-outlined text-[18px]">unfold_more</span>
<span id="density-btn-label">Toggle Compact Stream Mode</span>
</button>
</div>
</div>
<!-- Density Comparison Demonstrator -->
<div class="space-y-space-md" id="density-container">
<!-- Item 1: Urgent -->
<div class="density-row bg-surface-container-lowest rounded-lg shadow-sm p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-all">
<div class="flex items-center gap-space-md min-w-0">
<!-- Amber Left Dot -->
<div class="w-2.5 h-10 rounded-full bg-[#D97706] flex-shrink-0"></div>
<div class="min-w-0">
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-bold bg-[#FFFBEB] text-[#B45309]">
                Action Required · 03h 42m
              </span>
<span class="font-label-sm text-label-sm text-secondary truncate">Synthetix AI</span>
<span class="text-secondary/40">•</span>
<span class="font-label-sm text-label-sm font-semibold text-[#15803D]">98% Parity</span>
</div>
<h4 class="font-title-md text-title-md text-primary font-bold truncate mt-0.5">
              European Cloud Distribution &amp; DACH Enterprise Channel Access
            </h4>
</div>
</div>
<div class="flex items-center gap-space-lg flex-shrink-0 self-end md:self-center">
<div class="text-right hidden sm:block">
<span class="block font-label-sm text-label-sm uppercase text-secondary">Turn Mandate</span>
<span class="font-title-md text-title-md font-bold text-primary">€420k / YR</span>
</div>
<button class="px-space-md h-9 rounded font-label-md text-label-md font-semibold text-on-primary bg-primary hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-sm">
<span>Respond</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
<!-- Item 2: Critical Expiration -->
<div class="density-row bg-surface-container-lowest rounded-lg shadow-sm p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-all">
<div class="flex items-center gap-space-md min-w-0">
<!-- Red Left Dot -->
<div class="w-2.5 h-10 rounded-full bg-[#DC2626] flex-shrink-0"></div>
<div class="min-w-0">
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-bold bg-[#FEF2F2] text-[#991B1B]">
                Critical SLA · 01h 14m
              </span>
<span class="font-label-sm text-label-sm text-secondary truncate">Crestview Capital</span>
<span class="text-secondary/40">•</span>
<span class="font-label-sm text-label-sm font-semibold text-primary">$12.5M Mandate</span>
</div>
<h4 class="font-title-md text-title-md text-primary font-bold truncate mt-0.5">
              Cross-Border Settlement Liquidity Facility (Tranche B Mandate)
            </h4>
</div>
</div>
<div class="flex items-center gap-space-lg flex-shrink-0 self-end md:self-center">
<div class="text-right hidden sm:block">
<span class="block font-label-sm text-label-sm uppercase text-secondary">Pending Step</span>
<span class="font-title-md text-title-md font-bold text-[#991B1B]">Countersignature</span>
</div>
<button class="px-space-md h-9 rounded font-label-md text-label-md font-semibold text-on-error bg-[#DC2626] hover:bg-[#B91C1C] transition-colors flex items-center gap-1.5 shadow-sm">
<span>Sign Handshake</span>
<span class="material-symbols-outlined text-[16px]">draw</span>
</button>
</div>
</div>
<!-- Item 3: Neutral Partner Turn -->
<div class="density-row bg-surface-container-lowest rounded-lg shadow-sm p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md opacity-75 transition-all">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-2.5 h-10 rounded-full bg-surface-variant flex-shrink-0"></div>
<div class="min-w-0">
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-medium bg-surface-container text-secondary">
                Partner Turn · 22h
              </span>
<span class="font-label-sm text-label-sm text-secondary truncate">Helix Life Sciences</span>
</div>
<h4 class="font-title-md text-title-md text-primary font-bold truncate mt-0.5">
              Cellular Therapeutics IP Licensing &amp; APAC Co-Development
            </h4>
</div>
</div>
<div class="flex items-center gap-space-lg flex-shrink-0 self-end md:self-center">
<div class="text-right hidden sm:block">
<span class="block font-label-sm text-label-sm uppercase text-secondary">Status</span>
<span class="font-title-md text-title-md font-medium text-secondary">External Review</span>
</div>
<button class="px-space-md h-9 rounded font-label-md text-label-md font-medium text-secondary bg-surface-container-low hover:bg-surface-container transition-colors">
            Details
          </button>
</div>
</div>
</div>
</section>
<!-- ============================================== -->
<!-- DESIGN SYSTEM SPECIFICATION LEDGER / FOOTNOTES -->
<!-- ============================================== -->
<section class="w-full bg-surface-container-lowest py-space-xl shadow-inner">
<div class="max-w-[1600px] mx-auto px-margin">
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg text-secondary">
<div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">
            01 · Human Ergonomics &amp; Calm Urgency
          </span>
<p class="font-body-sm text-body-sm leading-relaxed">
            The Relay eliminates screaming alarm colors and strobe animations. We implement Warm Amber (#D97706) as an authoritative, professional prompt. Critical Crimson is withheld exclusively for transactions with fewer than 120 minutes until permanent lapse.
          </p>
</div>
<div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">
            02 · Bilateral SLA Protocol Compliance
          </span>
<p class="font-body-sm text-body-sm leading-relaxed">
            Every "Immediate Attention" card anchors a clear counter-turn rationale callout box. Partners are never presented with an ambiguous "Action Required" status without an accompanying explanation of what revision occurred and the exact UTC deadline.
          </p>
</div>
<div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">
            03 · High Contrast Monochromatic Rigor
          </span>
<p class="font-body-sm text-body-sm leading-relaxed">
            Cards leverage the Monochrome Executive foundation: Midnight Charcoal (#171F2C) primary buttons ensure uncompromised action affordance, while subtle surface tints (#FFFBEB, #FEF2F2) preserve ambient serenity during 10-hour deal shifts.
          </p>
</div>
</div>
</div>
</section>
<!-- Vanilla Client Interactive Logic for Exploration Sandbox -->
<script>
    function switchVariant(variant) {
      const v1 = document.getElementById('wrapper-var1');
      const v2 = document.getElementById('wrapper-var2');
      const v3 = document.getElementById('wrapper-var3');
      
      const tabs = document.querySelectorAll('.variant-tab');
      tabs.forEach(t => {
        t.classList.remove('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        t.classList.add('text-secondary');
      });

      if (variant === 'all') {
        v1.classList.remove('hidden');
        v2.classList.remove('hidden');
        v3.classList.remove('hidden');
        document.getElementById('tab-all').classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        document.getElementById('tab-all').classList.remove('text-secondary');
      } else if (variant === 'var1') {
        v1.classList.remove('hidden');
        v2.classList.add('hidden');
        v3.classList.add('hidden');
        document.getElementById('tab-var1').classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        document.getElementById('tab-var1').classList.remove('text-secondary');
      } else if (variant === 'var2') {
        v1.classList.add('hidden');
        v2.classList.remove('hidden');
        v3.classList.add('hidden');
        document.getElementById('tab-var2').classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        document.getElementById('tab-var2').classList.remove('text-secondary');
      } else if (variant === 'var3') {
        v1.classList.add('hidden');
        v2.classList.add('hidden');
        v3.classList.remove('hidden');
        document.getElementById('tab-var3').classList.add('bg-surface-container-lowest', 'text-primary', 'font-semibold', 'shadow-sm');
        document.getElementById('tab-var3').classList.remove('text-secondary');
      }
    }

    let isCompact = false;
    function toggleDensityDemo() {
      isCompact = !isCompact;
      const rows = document.querySelectorAll('.density-row');
      const btnLabel = document.getElementById('density-btn-label');

      rows.forEach(r => {
        if (isCompact) {
          r.classList.remove('p-space-md');
          r.classList.add('py-2', 'px-3');
          btnLabel.textContent = 'Restore Standard Density';
        } else {
          r.classList.remove('py-2', 'px-3');
          r.classList.add('p-space-md');
          btnLabel.textContent = 'Toggle Compact Stream Mode';
        }
      });
    }
  </script>
</div></main><footer class="w-full bg-surface-container-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.03)] mt-auto"><div class="w-full px-margin py-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-surface-variant"><div><span class="font-label-md text-label-md text-primary font-semibold">The Relay Design System</span><span class="mx-2 text-outline-variant">·</span><span>Institutional Deal Architecture Standard v4.2</span></div><div class="flex items-center gap-space-lg font-label-sm text-label-sm uppercase tracking-wider"><span class="hover:text-on-surface cursor-pointer transition-colors">Strict Spec</span><span class="text-outline-variant">·</span><span class="hover:text-on-surface cursor-pointer transition-colors">Zero-Elevation Core</span><span class="text-outline-variant">·</span><span class="hover:text-on-surface cursor-pointer transition-colors">Verified Ratios</span></div></div></footer></body></html>