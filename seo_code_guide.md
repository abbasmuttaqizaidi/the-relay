When designing the page use the color scheme present in color_scheme.md and reuse the components from design-system(strict).

<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@600;700;800&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-tertiary":"#ffffff","surface-container-high":"#e2e8f0","surface-container-low":"#f1f5f9","inverse-on-surface":"#eff1f3","on-surface-variant":"#475569","surface-bright":"#f8fafc","on-background":"#0f172a","surface-variant":"#e2e8f0","primary-fixed-dim":"#bfc7d8","surface-tint":"#575f6e","on-error":"#ffffff","secondary-fixed-dim":"#b7c8e1","on-secondary-fixed":"#0b1c30","error":"#ba1a1a","surface-container-highest":"#cbd5e1","primary":"#0f172a","on-error-container":"#93000a","on-secondary-fixed-variant":"#38485d","on-secondary-container":"#334155","secondary-fixed":"#d3e4fe","primary-fixed":"#dbe3f5","on-primary-container":"#94a3b8","surface-dim":"#cbd5e1","inverse-surface":"#1e293b","on-secondary":"#ffffff","inverse-primary":"#cbd5e1","tertiary-fixed":"#d4e4fa","tertiary":"#0f172a","error-container":"#fee2e2","secondary":"#64748b","background":"#f8fafc","on-tertiary-fixed":"#0f172a","secondary-container":"#e2e8f0","on-surface":"#0f172a","tertiary-container":"#1e293b","on-primary-fixed":"#0f172a","on-tertiary-container":"#64748b","outline-variant":"#e2e8f0","on-primary-fixed-variant":"#334155","primary-container":"#0f172a","surface":"#f8fafc","outline":"#94a3b8","surface-container-lowest":"#ffffff","on-tertiary-fixed-variant":"#334155","on-primary":"#ffffff","surface-container":"#f8fafc","tertiary-fixed-dim":"#b9c8de"},borderRadius:{DEFAULT:"0.25rem",lg:"0.375rem",xl:"0.5rem",full:"9999px"},spacing:{"space-md":"1rem","space-xs":"0.25rem","space-lg":"1.5rem","margin-mobile":"1rem","gutter-sm":"1rem",margin:"2rem",gutter:"1.5rem","gutter-lg":"2rem","space-xl":"2.5rem","space-sm":"0.5rem"},fontFamily:{"headline-md":["Plus Jakarta Sans"],"headline-lg":["Plus Jakarta Sans"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"headline-lg-mobile":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"body-lg":["Inter"],"label-md":["Inter"],"label-sm":["Inter"],"body-sm":["Inter"],"body-md":["Inter"]},fontSize:{"headline-md":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"700"}],"headline-lg":["30px",{lineHeight:"38px",letterSpacing:"-0.02em",fontWeight:"800"}],"display-lg":["44px",{lineHeight:"52px",letterSpacing:"-0.025em",fontWeight:"800"}],"title-md":["15px",{lineHeight:"22px",letterSpacing:"-0.005em",fontWeight:"600"}],"headline-lg-mobile":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"700"}],"headline-sm":["17px",{lineHeight:"24px",letterSpacing:"-0.005em",fontWeight:"700"}],"body-lg":["16px",{lineHeight:"24px",letterSpacing:"0em",fontWeight:"400"}],"label-md":["13px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"500"}],"label-sm":["11px",{lineHeight:"16px",letterSpacing:"0.04em",fontWeight:"600"}],"body-sm":["12px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"400"}],"body-md":["14px",{lineHeight:"20px",letterSpacing:"0em",fontWeight:"400"}]}}}};</script></head><body class="bg-surface text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant z-50 px-gutter"><div class="h-16 w-full flex items-center justify-between gap-gutter"><div class="flex items-center gap-space-md"><img alt="the-relay-logo.png" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UPNNXGKevPy3Z9C8GaMyN-5Ri7DTuPTlNjk5j2uFFJNbEUMyd5A0KIDG1wLP4W-DwbQH3H7RxKK1J5wugTFs2l4_vbCl_zC1cTyTTnTaQLF33lyo4uyxJ8wQNEJ2UFMdV45IRPruBfmcBUV8JvNIcja28YE5x9pW_9YkzuXJCFAXQVtUWvvyPR44ZS5vS-r63HSwkOofnMGVSwGKcmLSDMP3QsmuOq1xeQWeDJdsWtgRZFbU5w9gjTjzYKOdINq1KRDgXu4Fk0TQ"><div class="hidden sm:flex flex-col"><span class="font-title-md text-title-md text-primary leading-tight uppercase tracking-tight">The Relay</span><span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">B2B Opportunity Exchange</span></div></div><div class="flex-1 max-w-xl mx-auto hidden md:block"><div class="relative flex items-center"><span class="material-symbols-outlined absolute left-space-md text-outline text-[18px]">search</span><input class="w-full h-10 pl-10 pr-12 bg-surface-container-low border border-outline-variant rounded text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" placeholder="Search opportunities, syndicates, enterprise assets..." type="text"><kbd class="absolute right-space-md px-1.5 py-0.5 border border-outline-variant rounded font-label-sm text-label-sm text-secondary bg-surface-container-lowest">⌘K</kbd></div></div><div class="flex items-center gap-space-md"><div class="hidden lg:flex items-center gap-space-xs px-2.5 py-1 bg-surface-container-low border border-outline-variant rounded"><span class="material-symbols-outlined text-[16px] text-emerald-600">verified</span><span class="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">Verified Member</span></div><button aria-label="Notifications" class="h-9 w-9 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" type="button"><span class="material-symbols-outlined text-[18px]">notifications</span></button><div class="flex items-center gap-space-sm pl-space-xs border-l border-outline-variant"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="hidden xl:flex flex-col text-left"><span class="font-label-md text-label-md text-on-surface font-semibold leading-tight">Aplex LLMP</span><span class="font-label-sm text-label-sm text-secondary">Corporate Advisory</span></div></div></div></div></header><aside class="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest border-r border-outline-variant z-40 flex flex-col justify-between overflow-y-auto"><div class="py-space-lg px-space-md"><div class="mb-space-lg"><div class="px-space-sm mb-space-xs font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Marketplace</div><nav class="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-semibold border-primary"><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="opportunities" href="#"><span class="material-symbols-outlined text-[18px]">travel_explore</span><span class="">Opportunities</span></a></nav></div><div class="mb-space-lg"><div class="px-space-sm mb-space-xs font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">My Relay</div><nav class="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-semibold border-primary"><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="listings" href="#"><span class="material-symbols-outlined text-[18px]">receipt_long</span><span class="">Listings</span></a><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="saved" href="#"><span class="material-symbols-outlined text-[18px]">bookmark</span><span class="">Saved</span></a><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="my-opportunities" href="#"><span class="material-symbols-outlined text-[18px]">swap_calls</span><span class="">My Opportunities</span></a><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="exchanges-hub" href="#"><span class="material-symbols-outlined text-[18px]">hub</span><span class="">Exchanges Hub</span></a></nav></div><div class="mb-space-lg"><div class="px-space-sm mb-space-xs font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Insights</div><nav class="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-semibold border-primary"><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="questions" href="#"><span class="material-symbols-outlined text-[18px]">forum</span><span class="">Questions</span></a><a aria-current="page" class="flex items-center gap-space-sm px-space-sm py-2 rounded transition-colors bg-primary text-on-primary font-semibold shadow-sm" data-path="knowledge-articles" href="#"><span class="material-symbols-outlined text-[18px]">menu_book</span><span class="">Knowledge Articles</span></a><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="faq" href="#"><span class="material-symbols-outlined text-[18px]">help_center</span><span class="">FAQ</span></a></nav></div><div class="mb-space-md"><div class="px-space-sm mb-space-xs font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Ecosystem</div><nav class="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-semibold border-primary"><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="verified-network" href="#"><span class="material-symbols-outlined text-[18px]">verified</span><span class="">Verified Network</span></a><a class="flex items-center gap-space-sm px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md border border-transparent transition-colors" data-path="directory" href="#"><span class="material-symbols-outlined text-[18px]">corporate_fare</span><span class="">Directory</span></a></nav></div></div><div class="p-space-md border-t border-outline-variant"><div class="p-space-sm rounded bg-surface-container-low border border-outline-variant flex items-center justify-between"><div class="flex flex-col"><span class="font-label-sm text-label-sm text-secondary uppercase">Protocol</span><span class="font-label-md text-label-md text-on-surface font-semibold">Institutional 3.1</span></div><span class="w-2 h-2 rounded-full bg-emerald-600"></span></div></div></aside><div class="pl-64"><main class="w-full min-h-[calc(100vh-4rem)] pt-16 bg-[#f8fafc] px-gutter py-space-lg"><div class="flex flex-col w-full max-w-7xl mx-auto space-y-6">
<!-- 1. HEADER & TOP ACTION STRIP -->
<div class="flex flex-col gap-4 pb-5 border-b border-[#e2e8f0]">
<div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
<div class="flex flex-col max-w-3xl">
<div class="flex items-center gap-2 mb-1.5">
<span class="font-label-sm text-[11px] font-bold text-slate-500 uppercase tracking-widest">INSIGHTS</span>
<span class="text-slate-300 text-xs">/</span>
<span class="font-label-sm text-[11px] font-bold text-slate-800 uppercase tracking-wider">OPERATIONAL KNOWLEDGE &amp; PLAYBOOKS</span>
</div>
<h1 class="font-headline-lg text-[32px] font-extrabold text-[#0f172a] tracking-tight leading-tight">Knowledge Articles &amp; Playbooks</h1>
<p class="font-body-md text-slate-600 text-[14px] leading-relaxed mt-1">
        Battle-tested commercial playbooks, bilateral deal frameworks, and barter templates authored by verified enterprise operators.
      </p>
</div>
<!-- Top Action Buttons -->
<div class="flex items-center gap-2.5 flex-wrap shrink-0">
<button class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#e2e8f0] text-slate-700 hover:text-slate-900 hover:border-slate-400 font-label-md text-xs font-semibold shadow-sm transition-all" type="button">
<span class="material-symbols-outlined text-[17px] text-slate-500">download</span>
<span class="">Download Playbook Kit (PDF/CSV)</span>
</button>
<button class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#e2e8f0] text-slate-700 hover:text-slate-900 hover:border-slate-400 font-label-md text-xs font-semibold shadow-sm transition-all" type="button">
<span class="material-symbols-outlined text-[17px] text-slate-500">bookmark</span>
<span class="">Saved Articles</span>
<span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">4</span>
</button>
<button class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-label-md text-xs font-semibold shadow-sm transition-all" type="button">
<span class="material-symbols-outlined text-[18px]">add</span>
<span class="">Submit Playbook / Guide</span>
</button>
</div>
</div>
<!-- Telemetry Row -->
<div class="flex items-center gap-3 pt-1 flex-wrap">
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#e2e8f0] text-xs font-semibold text-slate-800 shadow-xs">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
<span class="">48 Verified Playbooks</span>
</div>
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#e2e8f0] text-xs font-semibold text-slate-800 shadow-xs">
<span class="material-symbols-outlined text-[14px] text-slate-500">description</span>
<span class="">12 Standard Legal Templates</span>
</div>
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-xs">
<span class="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
<span class="">100% Practitioner Tested</span>
</div>
</div>
</div>
<!-- 2. SEARCH & FORMAT FILTERS -->
<div class="flex flex-col gap-3">
<!-- Search Input with ⌘K -->
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
<input class="w-full h-10 pl-10 pr-16 bg-white border border-[#e2e8f0] rounded-lg text-slate-900 placeholder:text-slate-400 font-body-sm text-sm focus:outline-none focus:border-[#0f172a] shadow-xs transition-colors" placeholder="Search playbooks, deal formulas, escrow protocols, and term sheets..." type="text">
<kbd class="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 border border-[#e2e8f0] rounded text-[11px] font-semibold text-slate-400 bg-slate-50 shadow-xs">⌘K</kbd>
</div>
<!-- Format Filter Tabs & Read Time Pills -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
<!-- Format filter tabs -->
<div class="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-semibold">
<button class="px-3 py-1.5 rounded-md bg-[#0f172a] text-white shrink-0 shadow-xs" type="button">All Playbooks (48)</button>
<button class="px-3 py-1.5 rounded-md bg-white border border-[#e2e8f0] text-slate-700 hover:border-slate-400 hover:text-slate-900 shrink-0 transition-colors shadow-xs" type="button">Deal Structuring &amp; Rev-Share (14)</button>
<button class="px-3 py-1.5 rounded-md bg-white border border-[#e2e8f0] text-slate-700 hover:border-slate-400 hover:text-slate-900 shrink-0 transition-colors shadow-xs" type="button">Lead Monetization Models (11)</button>
<button class="px-3 py-1.5 rounded-md bg-white border border-[#e2e8f0] text-slate-700 hover:border-slate-400 hover:text-slate-900 shrink-0 transition-colors shadow-xs" type="button">Bilateral Barter Economics (9)</button>
<button class="px-3 py-1.5 rounded-md bg-white border border-[#e2e8f0] text-slate-700 hover:border-slate-400 hover:text-slate-900 shrink-0 transition-colors shadow-xs" type="button">Legal Covenants &amp; NDAs (8)</button>
<button class="px-3 py-1.5 rounded-md bg-white border border-[#e2e8f0] text-slate-700 hover:border-slate-400 hover:text-slate-900 shrink-0 transition-colors shadow-xs" type="button">Case Studies &amp; Real Closures (6)</button>
</div>
<!-- Read Time & Template Pills -->
<div class="flex items-center gap-1.5 shrink-0 flex-wrap">
<span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
<button class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors" type="button">&lt; 5 min read</button>
<button class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors" type="button">5–10 min deep-dive</button>
<button class="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-[11px] font-semibold flex items-center gap-1 transition-colors" type="button">
<span class="material-symbols-outlined text-[13px] text-emerald-600">attachment</span>
<span class="">Includes Downloadable Template</span>
</button>
</div>
</div>
</div>
<!-- 3. TWO-COLUMN CURATED LAYOUT -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
<!-- LEFT COLUMN (Main Content, ~68% width -> lg:col-span-8) -->
<div class="lg:col-span-8 flex flex-col gap-6">
<!-- FEATURED FLAGSHIP CASE STUDY HERO CARD -->
<article class="bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all p-6 flex flex-col gap-5 shadow-xs relative overflow-hidden group">
<div class="flex items-center justify-between gap-3">
  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
    <span class="material-symbols-outlined text-[14px] text-emerald-400">workspace_premium</span>
    <span class="">Flagship Blueprint • Bilateral Rev-Share</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="text-xs text-slate-500 font-medium">8 min read</span>
    <button aria-label="Save Playbook" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors" type="button">
      <span class="material-symbols-outlined text-[20px]">bookmark_border</span>
    </button>
  </div>
</div>
<div class="flex flex-col gap-2">
  <h2 class="text-xl lg:text-2xl font-headline-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-slate-700 transition-colors cursor-pointer">
    Converting Unserviceable Inbound Leads into 15–25% Ongoing ARR via Bilateral Escrow
  </h2>
  <p class="font-body-md text-slate-600 text-sm leading-relaxed">
    An institutional framework for monetizing regional misfit opportunities without channel friction or client churn, backed by automated CDOE reciprocal covenants.
  </p>
</div>
<div class="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
  <div class="flex flex-col gap-0.5 text-center">
    <span class="text-lg lg:text-xl font-headline-md font-bold text-slate-900">€3.4M</span>
    <span class="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Contracted Dealflow</span>
  </div>
  <div class="flex flex-col gap-0.5 text-center border-x border-slate-200">
    <span class="text-lg lg:text-xl font-headline-md font-bold text-emerald-700">84% Faster</span>
    <span class="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Sales Cycle Close</span>
  </div>
  <div class="flex flex-col gap-0.5 text-center">
    <span class="text-lg lg:text-xl font-headline-md font-bold text-slate-900">0% Leakage</span>
    <span class="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Lead Attribution</span>
  </div>
</div>
<div class="flex items-center justify-between gap-4 pt-1 flex-wrap">
  <div class="flex items-center gap-2 text-xs">
    <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[11px] text-slate-700">HS</div>
    <span class="font-semibold text-slate-900">Henrik Sjöberg</span>
    <span class="text-slate-300">•</span>
    <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
      <span class="material-symbols-outlined text-[12px]">verified</span> Klarna Co-Invest
    </span>
  </div>
  <div class="flex items-center gap-2 flex-wrap">
    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
      <span class="material-symbols-outlined text-[13px] text-slate-500">description</span> SOW Covenant v4.2
    </span>
    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
      <span class="material-symbols-outlined text-[13px] text-emerald-600">table_chart</span> Rev-Share Model (.xlsx)
    </span>
  </div>
</div>
<div class="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
  <div class="flex items-center gap-3 text-slate-500 font-medium">
    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">thumb_up</span> 184 endorsements</span>
    <span class="">•</span>
    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">bookmark</span> 342 saves</span>
  </div>
  <a class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-label-md text-xs font-semibold shadow-xs transition-colors" href="#">
    <span class="">Read Full Blueprint &amp; Templates</span>
    <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
  </a>
</div>
</article>
<!-- CURATED PLAYBOOK GRID / STREAM -->
<div class="flex flex-col gap-3.5">
<!-- Card 1: Enterprise Barter Matrix -->
<article class="bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all p-5 flex flex-col gap-3 shadow-xs group">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
        Compute &amp; Barter
      </span>
      <span class="text-slate-300">•</span>
      <span class="text-xs text-slate-500 font-medium">7 min read</span>
      <span class="text-slate-300">•</span>
      <span class="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
        <span class="material-symbols-outlined text-[13px]">verified</span> 98% Recommended
      </span>
    </div>
    <button aria-label="Bookmark" class="text-slate-400 hover:text-slate-800 transition-colors" type="button">
      <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
    </button>
  </div>
  <div>
    <h3 class="text-base font-headline-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors cursor-pointer">
      The Enterprise Barter Matrix: Exchanging Idle GPU Infrastructure for Enterprise B2B Distribution
    </h3>
    <p class="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
      Surplus compute clusters converted into commercial pipeline access without cash outlay, governed by verified bilateral capacity credits.
    </p>
  </div>
  <div class="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100 text-xs flex-wrap">
    <div class="flex items-center gap-2 text-slate-600">
      <span class="font-semibold text-slate-900">Hyperion Cloud Architecture</span>
      <span class="text-slate-300">•</span>
      <span class="text-slate-500">412 downloads</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
        Zero-Cash Outlay
      </span>
      <a class="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-slate-700 transition-colors" href="#">
        <span class="">Read Playbook</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>
  </div>
</article>

<!-- Card 2: Non-Circumvention Enforcement -->
<article class="bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all p-5 flex flex-col gap-3 shadow-xs group">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="px-2.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
        Legal Protocol
      </span>
      <span class="text-slate-300">•</span>
      <span class="text-xs text-slate-500 font-medium">5 min read</span>
      <span class="text-slate-300">•</span>
      <span class="text-[11px] text-emerald-700 font-semibold">Relay Whitepaper</span>
    </div>
    <button aria-label="Bookmark" class="text-slate-400 hover:text-slate-800 transition-colors" type="button">
      <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
    </button>
  </div>
  <div>
    <h3 class="text-base font-headline-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors cursor-pointer">
      Non-Circumvention Enforcement: Protecting Proprietary Client Contacts Until Stage 4 Handshake
    </h3>
    <p class="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
      Cryptographic blinding mechanisms and automated escrow covenants preventing client lead leakage before bilateral handshake consent.
    </p>
  </div>
  <div class="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100 text-xs flex-wrap">
    <div class="flex items-center gap-2 text-slate-600">
      <span class="font-semibold text-slate-900">Relay Governance Board</span>
      <span class="text-slate-300">•</span>
      <span class="text-slate-500">620 downloads</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold">
        Blinded Escrow Spec
      </span>
      <a class="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-slate-700 transition-colors" href="#">
        <span class="">Read Whitepaper</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>
  </div>
</article>

<!-- Card 3: Co-Selling & Joint Bids -->
<article class="bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all p-5 flex flex-col gap-3 shadow-xs group">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
        Co-Selling
      </span>
      <span class="text-slate-300">•</span>
      <span class="text-xs text-slate-500 font-medium">9 min read</span>
      <span class="text-slate-300">•</span>
      <span class="inline-flex items-center gap-1 text-[11px] text-slate-700 font-semibold">
        <span class="material-symbols-outlined text-[13px] text-slate-500">attach_file</span> 2 Templates
      </span>
    </div>
    <button aria-label="Bookmark" class="text-slate-400 hover:text-slate-800 transition-colors" type="button">
      <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
    </button>
  </div>
  <div>
    <h3 class="text-base font-headline-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors cursor-pointer">
      Co-Selling &amp; Joint Bids for Tier-1 Enterprise RFPs: Margin Distribution &amp; Risk Splitting
    </h3>
    <p class="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
      Structuring an escrowed consortium vehicle with milestone disbursements that enabled two boutique partners to close an $18.9M infrastructure bid.
    </p>
  </div>
  <div class="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100 text-xs flex-wrap">
    <div class="flex items-center gap-2 text-slate-600">
      <span class="font-semibold text-slate-900">Aplex LLMP &amp; Strata Syndicate</span>
      <span class="text-slate-300">•</span>
      <span class="text-slate-500">328 downloads</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
        $18.9M RFP Win Case
      </span>
      <a class="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-slate-700 transition-colors" href="#">
        <span class="">Read Playbook</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>
  </div>
</article>

<!-- Card 4: Cross-Referral Pact Architecture -->
<article class="bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all p-5 flex flex-col gap-3 shadow-xs group">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
        Growth Strategy
      </span>
      <span class="text-slate-300">•</span>
      <span class="text-xs text-slate-500 font-medium">6 min read</span>
      <span class="text-slate-300">•</span>
      <span class="text-[11px] text-slate-500">Updated 2d ago</span>
    </div>
    <button aria-label="Bookmark" class="text-slate-400 hover:text-slate-800 transition-colors" type="button">
      <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
    </button>
  </div>
  <div>
    <h3 class="text-base font-headline-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors cursor-pointer">
      Cross-Referral Pact Architecture: Establishing Recurring 4–6 Enterprise Warm Intros Per Quarter
    </h3>
    <p class="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
      The operational quota cadence and non-compete account matching matrix used to build predictable high-conviction C-level introductions.
    </p>
  </div>
  <div class="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100 text-xs flex-wrap">
    <div class="flex items-center gap-2 text-slate-600">
      <span class="font-semibold text-slate-900">Apex Logistics Partnerships</span>
      <span class="text-slate-300">•</span>
      <span class="text-slate-500">289 downloads</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold">
        4–6 Intros / Quarter
      </span>
      <a class="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-slate-700 transition-colors" href="#">
        <span class="">Read Playbook</span>
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>
  </div>
</article>
</div>
<!-- CLEAN STRICT PAGINATION -->
<div class="flex items-center justify-between pt-3 border-t border-[#e2e8f0] text-xs text-slate-600">
<div class="">
        Showing <span class="font-bold text-slate-900">1–5</span> of <span class="font-bold text-slate-900">48</span> articles
      </div>
<div class="flex items-center gap-1">
<button class="w-8 h-8 rounded border border-[#e2e8f0] bg-white text-slate-400 flex items-center justify-center cursor-not-allowed" disabled="" type="button">
<span class="material-symbols-outlined text-[16px]">chevron_left</span>
</button>
<button class="w-8 h-8 rounded bg-[#0f172a] text-white font-bold flex items-center justify-center shadow-xs" type="button">1</button>
<button class="w-8 h-8 rounded border border-[#e2e8f0] bg-white hover:border-slate-400 text-slate-700 font-semibold flex items-center justify-center transition-colors" type="button">2</button>
<button class="w-8 h-8 rounded border border-[#e2e8f0] bg-white hover:border-slate-400 text-slate-700 font-semibold flex items-center justify-center transition-colors" type="button">3</button>
<span class="px-1 text-slate-400">…</span>
<button class="w-8 h-8 rounded border border-[#e2e8f0] bg-white hover:border-slate-400 text-slate-700 font-semibold flex items-center justify-center transition-colors" type="button">10</button>
<button class="px-2.5 h-8 rounded border border-[#e2e8f0] bg-white hover:border-slate-400 text-slate-700 font-semibold flex items-center gap-1 transition-colors" type="button">
<span class="">Next</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- RIGHT COLUMN (Editorial & Resource Rail, ~32% width -> lg:col-span-4) -->
<aside class="lg:col-span-4 flex flex-col gap-5">
<!-- 1. EDITORIAL STANDARDS MODULE -->
<div class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 shadow-xs">
  <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-[18px] text-emerald-600">verified</span>
      <h3 class="font-bold text-xs uppercase tracking-wider text-slate-900">The Relay Standard</h3>
    </div>
    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">Rigid Vetting</span>
  </div>
  <p class="text-xs text-slate-600 leading-relaxed">
    All playbooks must fulfill verified practitioner requirements before syndicate publication:
  </p>
  <ul class="flex flex-col gap-2.5 pt-0.5 text-xs">
    <li class="flex items-start gap-2.5">
      <span class="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-[10px] text-slate-800 shrink-0 mt-0.5">1</span>
      <div>
        <strong class="font-semibold text-slate-900 block">Zero Vendor Fluff</strong>
        <span class="text-slate-500 leading-normal text-[11px]">Audited commercial numbers or real balance sheet impact.</span>
      </div>
    </li>
    <li class="flex items-start gap-2.5">
      <span class="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-[10px] text-slate-800 shrink-0 mt-0.5">2</span>
      <div>
        <strong class="font-semibold text-slate-900 block">Verified Execution</strong>
        <span class="text-slate-500 leading-normal text-[11px]">C-level partners with active deal closures on The Relay.</span>
      </div>
    </li>
    <li class="flex items-start gap-2.5">
      <span class="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-[10px] text-slate-800 shrink-0 mt-0.5">3</span>
      <div>
        <strong class="font-semibold text-slate-900 block">Plug-and-Play Artifacts</strong>
        <span class="text-slate-500 leading-normal text-[11px]">Mandatory downloadable SOWs, formulas, or covenants.</span>
      </div>
    </li>
  </ul>
</div>

<!-- 2. DOWNLOADABLE ASSET VAULT -->
<div class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 shadow-xs">
  <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-[18px] text-slate-900">folder_zip</span>
      <h3 class="font-bold text-xs uppercase tracking-wider text-slate-900">Legal Asset Vault</h3>
    </div>
    <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Pre-Approved</span>
  </div>
  <div class="flex flex-col gap-2 pt-0.5">
    <a class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group" href="#">
      <div class="flex items-center gap-2.5">
        <span class="w-7 h-7 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">DOC</span>
        <div>
          <span class="text-xs font-semibold text-slate-900 group-hover:text-blue-700 block">CDOE Bilateral NDA v4.2</span>
          <span class="text-[10px] text-slate-500">Mutual covenant • 142 KB</span>
        </div>
      </div>
      <span class="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-slate-800 transition-colors">download</span>
    </a>
    <a class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group" href="#">
      <div class="flex items-center gap-2.5">
        <span class="w-7 h-7 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">XLS</span>
        <div>
          <span class="text-xs font-semibold text-slate-900 group-hover:text-emerald-800 block">Rev-Share Audit Model</span>
          <span class="text-[10px] text-slate-500">Dynamic tier calc • 318 KB</span>
        </div>
      </div>
      <span class="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-slate-800 transition-colors">download</span>
    </a>
    <a class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group" href="#">
      <div class="flex items-center gap-2.5">
        <span class="w-7 h-7 rounded bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">PDF</span>
        <div>
          <span class="text-xs font-semibold text-slate-900 group-hover:text-red-700 block">Non-Circumvention SLA</span>
          <span class="text-[10px] text-slate-500">Protective covenants • 85 KB</span>
        </div>
      </div>
      <span class="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-slate-800 transition-colors">download</span>
    </a>
  </div>
</div>

<!-- 3. PLAYBOOK SERIES -->
<div class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 shadow-xs">
  <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-[18px] text-slate-900">account_tree</span>
      <h3 class="font-bold text-xs uppercase tracking-wider text-slate-900">Playbook Series</h3>
    </div>
    <span class="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">4 Parts</span>
  </div>
  <div>
    <h4 class="text-sm font-bold text-slate-900">Mastering The 4 Deal Stages</h4>
    <p class="text-xs text-slate-500 mt-0.5">Structured institutional pipeline execution.</p>
  </div>
  <div class="flex flex-col gap-1.5 pt-1 text-xs">
    <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
        <span class="font-medium text-slate-800">Stage 1: Acknowledge</span>
      </div>
      <span class="text-[10px] text-slate-400">Completed</span>
    </div>
    <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
        <span class="font-medium text-slate-800">Stage 2: Negotiate</span>
      </div>
      <span class="text-[10px] text-slate-400">Completed</span>
    </div>
    <div class="flex items-center justify-between p-2 rounded bg-slate-100 border border-slate-300">
      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">3</span>
        <span class="font-semibold text-slate-900">Stage 3: Agree (Covenants)</span>
      </div>
      <span class="text-[10px] font-bold text-emerald-700">Current</span>
    </div>
    <div class="flex items-center justify-between p-2 rounded bg-white border border-slate-200 opacity-60">
      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">4</span>
        <span class="text-slate-500">Stage 4: Handshake</span>
      </div>
      <span class="text-[10px] text-slate-400">Next</span>
    </div>
  </div>
  <a class="mt-1 text-center py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors" href="#">
    Continue Series (Part 3) →
  </a>
</div>

<!-- 4. SUBMIT CALLOUT -->
<div class="bg-slate-900 text-white rounded-xl p-5 flex flex-col gap-3 shadow-md relative overflow-hidden">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-[18px] text-emerald-400">publish</span>
    <span class="text-xs font-bold uppercase tracking-wider text-slate-300">Syndicate Contribution</span>
  </div>
  <h4 class="text-sm font-bold text-white leading-snug">
    Have an established deal framework?
  </h4>
  <p class="text-xs text-slate-300 leading-relaxed">
    Submit your validated playbook to earn verified contributor ranking and priority dealflow matching.
  </p>
  <button class="w-full mt-1 py-2 px-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs transition-colors shadow-xs" type="button">
    Submit Framework for Review
  </button>
</div>
</aside>
</div>
</div></main></div>


</body></html>