Design

<!DOCTYPE html><html lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; }
      main > :first-child { margin-top: 0 !important; }
      main > :last-child { margin-bottom: 0 !important; }
    }
    ::-webkit-scrollbar { display: none; }
  </style>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "canvas": "#F8FAFC",
            "charcoal": "#171F2C",
            "charcoal-dark": "#0B111A",
            "charcoal-muted": "#2C374A",
            "body-text": "#475569",
            "muted-label": "#64748B",
            "subtle-meta": "#94A3B8",
            "card-border": "rgba(226, 232, 240, 0.8)",
            "primary": "#171F2C",
            "surface": "#F8FAFC"
          },
          borderRadius: {
            "2xl": "1rem",
            "xl": "0.75rem",
            "lg": "0.5rem"
          },
          fontFamily: {
            sans: ["Inter", "sans-serif"],
            display: ["Plus Jakarta Sans", "sans-serif"],
            mono: ["JetBrains Mono", "monospace"]
          }
        }
      }
    };
  </script>
</head>
<body class="bg-[#F8FAFC] font-sans text-[#171F2C] antialiased">
<!-- Top Navigation Bar -->
<header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
<div class="h-16 w-full max-w-[1600px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
<div class="flex items-center gap-8 shrink-0">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-[#171F2C] flex items-center justify-center text-white shadow-xs">
<span class="material-symbols-outlined text-[19px]">swap_horiz</span>
</div>
<span class="font-display font-bold text-lg text-[#171F2C] tracking-tight">The Relay</span>
</div>
<div class="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/70 border border-emerald-100 rounded-full">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
<span class="text-[11px] font-medium text-emerald-700 tracking-wide uppercase">Verified Business Network</span>
</div>
</div>
<nav class="hidden lg:flex items-center gap-7 h-16 text-sm font-medium">
<a class="text-[#171F2C] font-semibold border-b-2 border-[#171F2C] py-[1.35rem]" href="#">Opportunity Board</a>
<a class="text-slate-500 hover:text-[#171F2C] transition-colors py-2" href="#">My Listings</a>
<a class="text-slate-500 hover:text-[#171F2C] transition-colors py-2" href="#">Saved</a>
<a class="text-slate-500 hover:text-[#171F2C] transition-colors py-2" href="#">Proposals</a>
<a class="text-slate-500 hover:text-[#171F2C] transition-colors py-2" href="#">Exchanges</a>
<a class="text-slate-500 hover:text-[#171F2C] transition-colors py-2" href="#">Directory</a>
</nav>
<div class="flex items-center gap-3 shrink-0">
<div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-500 text-xs hover:border-slate-300 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-[16px]">search</span>
<span class="">Search network</span>
<kbd class="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 ml-1">⌘K</kbd>
</div>
<button aria-label="Notifications" class="relative p-2 text-slate-500 hover:text-[#171F2C] rounded-lg hover:bg-slate-50 transition-colors">
<span class="material-symbols-outlined text-[20px]">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-[#171F2C] rounded-full ring-2 ring-white"></span>
</button>
<button class="inline-flex items-center gap-1.5 bg-[#171F2C] hover:bg-[#2C374A] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-xs">
<span class="material-symbols-outlined text-[16px]">add</span>
<span class="">Post Opportunity</span>
</button>
<div class="flex items-center gap-2.5 pl-2 border-l border-slate-200">
<div class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-semibold text-xs">
            AL
          </div>
</div>
</div>
</div>
</header>
<main class="w-full pt-20 pb-16 min-h-screen">
<div class="max-w-[1600px] mx-auto px-6 sm:px-8 flex flex-col gap-6">
<!-- Elegant Soft Dismissible Toast/Banner -->
<div class="w-full bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-300" id="publish-banner">
<div class="flex items-center gap-3 min-w-0">
<div class="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<p class="text-sm text-[#475569]">
            Listing <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#171F2C] border border-slate-200/60">#RY-0098</span> successfully published in blinded mode • Matching verified counterparties.
          </p>
</div>
<div class="flex items-center gap-4 self-end sm:self-center shrink-0">
<a class="text-xs font-semibold text-[#171F2C] hover:text-slate-600 underline underline-offset-4 flex items-center gap-1 transition-colors" href="#">
<span class="">View in My Listings</span>
<span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
<button aria-label="Dismiss banner" class="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors" onclick="document.getElementById('publish-banner').style.display='none'">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
<!-- Page Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
<div>
<div class="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
<span class="">Reciprocal Dealflow</span>
<span class="">•</span>
<span class="">Zero Cold Outreach</span>
<span class="">•</span>
<span class="text-slate-600 font-semibold">Bilateral Parity Protocol</span>
</div>
<h1 class="font-display font-bold text-2xl sm:text-3xl text-[#171F2C] tracking-tight">Commercial Opportunity Board</h1>
<p class="text-sm text-[#64748B] mt-1 max-w-2xl">Discover high-intent B2B partnerships, distribution pacts, and reciprocal agreements. Blinded until mutual handshake.</p>
</div>
<div class="flex items-center gap-2 self-start md:self-end px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-500 shadow-xs">
<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
<span class="font-medium text-slate-700 uppercase tracking-wide text-[11px]">Realtime Bilateral Feed</span>
</div>
</div>
<!-- Executive Minimalist Metrics Strip -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
<div class="bg-white p-5 rounded-2xl border border-slate-200/75 shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="text-xs font-medium uppercase tracking-wider text-[#64748B]">Active Deals</span>
<span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">+1 new</span>
</div>
<div class="mt-3">
<div class="font-display font-bold text-2xl sm:text-3xl text-[#171F2C] tracking-tight">1,483</div>
<div class="text-xs text-[#94A3B8] mt-0.5">+4.2% week-over-week</div>
</div>
</div>
<div class="bg-white p-5 rounded-2xl border border-slate-200/75 shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="text-xs font-medium uppercase tracking-wider text-[#64748B]">Median Response</span>
<span class="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
</div>
<div class="mt-3">
<div class="font-display font-bold text-2xl sm:text-3xl text-[#171F2C] tracking-tight">3.4<span class="font-sans text-base font-normal text-slate-400 ml-0.5">h</span></div>
<div class="text-xs text-[#94A3B8] mt-0.5">Average counterpart turnaround</div>
</div>
</div>
<div class="bg-white p-5 rounded-2xl border border-slate-200/75 shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="text-xs font-medium uppercase tracking-wider text-[#64748B]">Reciprocity Rate</span>
<span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">Bilateral</span>
</div>
<div class="mt-3">
<div class="font-display font-bold text-2xl sm:text-3xl text-[#171F2C] tracking-tight">97%</div>
<div class="text-xs text-[#94A3B8] mt-0.5">Submissions offer equal value</div>
</div>
</div>
<div class="bg-white p-5 rounded-2xl border border-slate-200/75 shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="text-xs font-medium uppercase tracking-wider text-[#64748B]">Verified Network</span>
<span class="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
</div>
<div class="mt-3">
<div class="font-display font-bold text-2xl sm:text-3xl text-[#171F2C] tracking-tight">3,920</div>
<div class="text-xs text-[#94A3B8] mt-0.5">Strict KYC &amp; revenue vetted</div>
</div>
</div>
</div>
<!-- Filter Tabs & Clean Search Row -->
<div class="flex flex-col gap-3">
<!-- Category Pill Tabs -->
<div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
<button class="px-3.5 py-1.5 rounded-xl bg-[#171F2C] text-white text-xs font-medium shrink-0 flex items-center gap-2 shadow-xs">
<span class="">All Deals</span>
<span class="bg-white/20 text-white px-1.5 py-0.2 rounded-full text-[10px]">1,483</span>
</button>
<button class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors">
<span class="">Partnership</span>
<span class="text-slate-400 text-[11px]">412</span>
</button>
<button class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors">
<span class="">Referral</span>
<span class="text-slate-400 text-[11px]">320</span>
</button>
<button class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors">
<span class="">Distribution</span>
<span class="text-slate-400 text-[11px]">216</span>
</button>
<button class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors">
<span class="">Vendor</span>
<span class="text-slate-400 text-[11px]">198</span>
</button>
<button class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors">
<span class="">Strategic Advice</span>
<span class="text-slate-400 text-[11px]">142</span>
</button>
<button class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors">
<span class="">Hiring</span>
<span class="text-slate-400 text-[11px]">110</span>
</button>
<button class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors">
<span class="">Investment</span>
<span class="text-slate-400 text-[11px]">85</span>
</button>
</div>
<!-- Search, Sector & Sorting Bar -->
<div class="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
<div class="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl flex-1">
<span class="material-symbols-outlined text-[18px] text-slate-400">search</span>
<input class="bg-transparent border-0 outline-none text-slate-800 text-xs sm:text-sm w-full placeholder:text-slate-400 focus:ring-0" placeholder="Search keywords, industries, reciprocal offers, or deal IDs..." type="text">
<kbd class="hidden sm:inline-block font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
</div>
<div class="flex items-center gap-2 shrink-0">
<div class="relative">
<select class="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium pl-3 pr-8 py-2 rounded-xl border border-slate-200/60 outline-none cursor-pointer transition-colors">
<option>Industry: All Sectors</option>
<option>SaaS &amp; Enterprise Cloud</option>
<option>Supply Chain &amp; Logistics</option>
<option>Fintech &amp; Capital Markets</option>
<option>Healthcare &amp; AI</option>
</select>
<span class="material-symbols-outlined text-[16px] text-slate-400 absolute right-2.5 top-2.5 pointer-events-none">expand_more</span>
</div>
<div class="relative">
<select class="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium pl-3 pr-8 py-2 rounded-xl border border-slate-200/60 outline-none cursor-pointer transition-colors">
<option>Sort: Newest First</option>
<option>Sort: Parity Score</option>
<option>Sort: Expiry Soonest</option>
</select>
<span class="material-symbols-outlined text-[16px] text-slate-400 absolute right-2.5 top-2.5 pointer-events-none">expand_more</span>
</div>
</div>
</div>
</div>
<!-- Main Columns: Feed (8 cols) & Sidebar (4 cols) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<!-- Opportunity Feed Column -->
<div class="lg:col-span-8 flex flex-col gap-4"><!-- Feed Bulk Controls & Status Header -->
<div class="flex items-center justify-between px-1 py-0.5 text-xs text-[#64748B]">
  <div class="flex items-center gap-2">
    <span class="font-medium text-[#171F2C]">Commercial Listings</span>
    <span class="text-slate-300">•</span>
    <span class="">Click any card header to expand or collapse details</span>
  </div>
  <div class="flex items-center gap-2">
    
  </div>
</div>

<!-- Listing 1: RY-0098 (Initial open preview for owner listing) -->
<article class="listing-card bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)] overflow-hidden transition-all hover:border-slate-300" data-expanded="true" id="listing-ry-0098">
  <!-- Collapsible Header Button -->
  <div onclick="toggleListing('listing-ry-0098')" class="w-full p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-slate-50/50 transition-colors select-none text-left">
    <div class="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
      <div class="w-9 h-9 rounded-xl bg-[#171F2C] text-white text-sm font-semibold flex items-center justify-center shrink-0">
        A
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-[#171F2C] border border-slate-200/75">RY-0098</span>
          <span class="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">Distribution &amp; Reseller</span>
          <span class="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-lg bg-[#171F2C] text-white flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Your Listing
          </span>
        </div>
        <h2 class="font-display font-semibold text-[15px] sm:text-[16px] text-[#171F2C] truncate tracking-tight">
          European SOC-2 Compliant Enterprise Agent Platform &amp; Cross-Referral Pact
        </h2>
        <div class="flex items-center gap-2 text-xs text-[#64748B] mt-0.5 truncate">
          <span class="font-medium text-[#171F2C]">Apex Logistics AG</span>
          <span class="inline-flex items-center gap-0.5 text-emerald-700 text-[10px] font-medium">
            <span class="material-symbols-outlined text-[12px]">verified</span> Verified
          </span>
          <span class="text-slate-300">•</span>
          <span class="">Chicago, IL &amp; Zurich</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
      <div class="flex items-center gap-3 text-right">
        <div class="flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Parity Match</span>
          <span class="font-mono text-xs font-bold text-[#171F2C]">96% <span class="font-normal text-[11px] text-[#94A3B8]">(28)</span></span>
        </div>
        <div class="hidden sm:flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Expires</span>
          <span class="text-xs text-slate-600 font-medium">30 days</span>
        </div>
      </div>
      <div class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 flex items-center justify-center text-slate-700 transition-transform duration-300 shrink-0 chevron-indicator rotate-180">
        <span class="material-symbols-outlined text-[18px]">expand_more</span>
      </div>
    </div>
  </div>
  <!-- Collapsible Details Body -->
  <div class="collapsible-body border-t border-slate-100 p-6 flex flex-col gap-4 bg-white">
    <!-- Counterparty Detail Strip -->
    <div class="flex items-center justify-between gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#171F2C] text-white text-xs font-semibold flex items-center justify-center">
          A
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-semibold text-xs sm:text-sm text-[#171F2C]">Apex Logistics AG</span>
            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-medium">
              <span class="material-symbols-outlined text-[12px]">verified</span> Verified
            </span>
            <span class="text-slate-300">•</span>
            <span class="text-xs text-[#64748B]">Blinded Mode Active</span>
          </div>
          <div class="text-xs text-[#64748B]">Chicago, IL &amp; Zurich • Supply Chain &amp; Logistics Infrastructure</div>
        </div>
      </div>
      <div class="text-right text-xs text-[#64748B]">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Turnaround</span>
        <span class="font-medium text-[#171F2C]">&lt; 2 hours</span>
      </div>
    </div>
    <!-- Description -->
    <div class="flex flex-col gap-1.5">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Opportunity Overview &amp; Requirements</span>
      <p class="text-sm text-[#475569] leading-relaxed">
        Seeking European SOC-2 certified systems integrators, enterprise AI distribution partners, and B2B cloud infrastructure providers for bilateral cross-referral routing and mid-market co-selling in DACH and UK.
      </p>
    </div>
    <!-- Bilateral Value Proposition -->
    <div class="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-1.5">
      <div class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C]">
        <span class="material-symbols-outlined text-[16px] text-slate-500">swap_horiz</span>
        <span class="">What We Offer in Bilateral Exchange</span>
      </div>
      <p class="text-xs sm:text-sm text-[#475569] leading-relaxed">
        Direct reciprocal intro: 10 qualified enterprise intros / mo, 25% recurring rev-share, and mutual co-selling assistance under sovereign non-circumvention covenants.
      </p>
    </div>
    <!-- Bottom Actions & Meta -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
      <div class="flex items-center gap-3 text-xs text-[#64748B]">
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">visibility</span> 4 views</span>
        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">send</span> 0 pitches received</span>
        <span class="text-slate-300">•</span>
        <span class="text-[11px] font-medium text-slate-500 uppercase">Stage 4 Reveal</span>
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[#171F2C] text-xs font-semibold transition-colors flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">edit_note</span>
          <span class="">Manage Listing</span>
        </button>
        <button class="px-3.5 py-2 rounded-xl bg-[#171F2C] hover:bg-[#2C374A] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
          <span class="material-symbols-outlined text-[16px]">open_in_new</span>
          <span class="">View Full Listing</span>
        </button>
      </div>
    </div>
  </div>
</article>

<!-- Listing 2: RY-8842 (Synthetix AI) -->
<article class="listing-card bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)] overflow-hidden transition-all hover:border-slate-300" data-expanded="false" id="listing-ry-8842">
  <div onclick="toggleListing('listing-ry-8842')" class="w-full p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-slate-50/50 transition-colors select-none text-left">
    <div class="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
      <div class="w-9 h-9 rounded-xl bg-slate-200 text-slate-800 text-sm font-semibold flex items-center justify-center shrink-0">
        S
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-[#171F2C] border border-slate-200/75">RY-8842</span>
          <span class="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">Distribution</span>
          <span class="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">Urgent</span>
        </div>
        <h2 class="font-display font-semibold text-[15px] sm:text-[16px] text-[#171F2C] truncate tracking-tight">
          European Distribution Partner Needed for SOC-2 Compliant Enterprise Agent Platform
        </h2>
        <div class="flex items-center gap-2 text-xs text-[#64748B] mt-0.5 truncate">
          <span class="font-medium text-[#171F2C]">Synthetix AI</span>
          <span class="inline-flex items-center gap-0.5 text-emerald-700 text-[10px] font-medium">
            <span class="material-symbols-outlined text-[12px]">verified</span> Verified
          </span>
          <span class="text-slate-300">•</span>
          <span class="">San Francisco, CA</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
      <div class="flex items-center gap-3 text-right">
        <div class="flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Parity Score</span>
          <span class="font-mono text-xs font-bold text-[#171F2C]">98%</span>
        </div>
        <div class="hidden sm:flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Expires</span>
          <span class="text-xs text-slate-600 font-medium">6 days</span>
        </div>
      </div>
      <div class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 flex items-center justify-center text-slate-700 transition-transform duration-300 shrink-0 chevron-indicator">
        <span class="material-symbols-outlined text-[18px]">expand_more</span>
      </div>
    </div>
  </div>
  <!-- Collapsible Details Body -->
  <div class="collapsible-body border-t border-slate-100 p-6 flex flex-col gap-4 bg-white hidden">
    <div class="flex items-center justify-between gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center">
          S
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-semibold text-xs sm:text-sm text-[#171F2C]">Synthetix AI</span>
            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-medium">
              <span class="material-symbols-outlined text-[12px]">verified</span> Verified
            </span>
            <span class="text-slate-300">•</span>
            <span class="text-xs text-[#64748B]">San Francisco, CA</span>
          </div>
          <div class="text-xs text-[#64748B]">AI Infrastructure &amp; Enterprise Foundation Models</div>
        </div>
      </div>
      <div class="text-right text-xs text-[#64748B]">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Network Tier</span>
        <span class="font-medium text-[#171F2C]">Enterprise AI</span>
      </div>
    </div>
    <div class="flex flex-col gap-1.5">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Detailed Requirements</span>
      <p class="text-sm text-[#475569] leading-relaxed">
        Seeking established DACH and Benelux software distributors with active enterprise contracts in Tier-1 banking, pharmaceuticals, and manufacturing. Must maintain localized on-prem or hybrid data jurisdiction capabilities.
      </p>
    </div>
    <div class="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-1.5">
      <div class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C]">
        <span class="material-symbols-outlined text-[16px] text-slate-500">currency_exchange</span>
        <span class="">What We Offer in Bilateral Exchange</span>
      </div>
      <p class="text-xs sm:text-sm text-[#475569] leading-relaxed">
        Direct reseller commission of 25% recurring for contract life + co-marketing budget allocation of $15,000 per enterprise account closed. Immediate lead handoff in target territories.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
      <div class="flex items-center gap-3 text-xs text-[#64748B]">
        <span class="">18 saves</span>
        <span class="">7 pitches submitted</span>
        <span class="text-slate-300">•</span>
        <span class="text-[11px] font-medium text-slate-500 uppercase">Blinded Mask Active</span>
      </div>
      <button class="px-4 py-2 rounded-xl bg-[#171F2C] hover:bg-[#2C374A] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 self-end sm:self-center shadow-xs cursor-pointer">
        <span class="">Express Interest</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>
  </div>
</article>

<!-- Listing 3: RY-0089 (Apex Logistics Group) -->
<article class="listing-card bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)] overflow-hidden transition-all hover:border-slate-300" data-expanded="false" id="listing-ry-0089">
  <div onclick="toggleListing('listing-ry-0089')" class="w-full p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-slate-50/50 transition-colors select-none text-left">
    <div class="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
      <div class="w-9 h-9 rounded-xl bg-slate-200 text-slate-800 text-sm font-semibold flex items-center justify-center shrink-0">
        A
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-[#171F2C] border border-slate-200/75">RY-0089</span>
          <span class="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">Referral</span>
          <span class="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">Featured</span>
        </div>
        <h2 class="font-display font-semibold text-[15px] sm:text-[16px] text-[#171F2C] truncate tracking-tight">
          Cross-Referral Pact: Mid-Market Salesforce Implementation for HubSpot Migration Agencies
        </h2>
        <div class="flex items-center gap-2 text-xs text-[#64748B] mt-0.5 truncate">
          <span class="font-medium text-[#171F2C]">Apex Logistics Group</span>
          <span class="inline-flex items-center gap-0.5 text-emerald-700 text-[10px] font-medium">
            <span class="material-symbols-outlined text-[12px]">verified</span> Verified
          </span>
          <span class="text-slate-300">•</span>
          <span class="">Chicago, IL</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
      <div class="flex items-center gap-3 text-right">
        <div class="flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Parity Score</span>
          <span class="font-mono text-xs font-bold text-[#171F2C]">95%</span>
        </div>
        <div class="hidden sm:flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Expires</span>
          <span class="text-xs text-slate-600 font-medium">11 days</span>
        </div>
      </div>
      <div class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 flex items-center justify-center text-slate-700 transition-transform duration-300 shrink-0 chevron-indicator">
        <span class="material-symbols-outlined text-[18px]">expand_more</span>
      </div>
    </div>
  </div>
  <!-- Collapsible Details Body -->
  <div class="collapsible-body border-t border-slate-100 p-6 flex flex-col gap-4 bg-white hidden">
    <div class="flex items-center justify-between gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center">
          A
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-semibold text-xs sm:text-sm text-[#171F2C]">Apex Logistics Group</span>
            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-medium">
              <span class="material-symbols-outlined text-[12px]">verified</span> Verified
            </span>
            <span class="text-slate-300">•</span>
            <span class="text-xs text-[#64748B]">Chicago, IL</span>
          </div>
          <div class="text-xs text-[#64748B]">Enterprise CRM Implementation &amp; Architecture</div>
        </div>
      </div>
      <div class="text-right text-xs text-[#64748B]">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Deal Category</span>
        <span class="font-medium text-[#171F2C]">Enterprise CPQ</span>
      </div>
    </div>
    <div class="flex flex-col gap-1.5">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Opportunity Thesis</span>
      <p class="text-sm text-[#475569] leading-relaxed">
        We exclusively handle enterprise-grade Salesforce migrations and custom CPQ deployments. We consistently encounter inbound inquiries from SMB and mid-market accounts seeking pure-play HubSpot setups that fall below our engagement minimums.
      </p>
    </div>
    <div class="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-1.5">
      <div class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C]">
        <span class="material-symbols-outlined text-[16px] text-slate-500">swap_horiz</span>
        <span class="">What We Offer in Bilateral Exchange</span>
      </div>
      <p class="text-xs sm:text-sm text-[#475569] leading-relaxed">
        Direct reciprocal routing of 4–6 mid-market marketing automation setups per month ($45k average contract value) in exchange for exclusive Salesforce CPQ handoffs.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
      <div class="flex items-center gap-3 text-xs text-[#64748B]">
        <span class="">32 saves</span>
        <span class="">12 pitches submitted</span>
        <span class="text-slate-300">•</span>
        <span class="text-[11px] font-medium text-slate-500 uppercase">Direct Escrow Terms</span>
      </div>
      <button class="px-4 py-2 rounded-xl bg-[#171F2C] hover:bg-[#2C374A] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 self-end sm:self-center shadow-xs cursor-pointer">
        <span class="">Express Interest</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>
  </div>
</article>

<!-- Listing 4: RY-0105 (Anonymous Verified Enterprise) -->
<article class="listing-card bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)] overflow-hidden transition-all hover:border-slate-300" data-expanded="false" id="listing-ry-0105">
  <div onclick="toggleListing('listing-ry-0105')" class="w-full p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:bg-slate-50/50 transition-colors select-none text-left">
    <div class="flex items-start md:items-center gap-3.5 min-w-0 flex-1">
      <div class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[18px]">lock</span>
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-[#171F2C] border border-slate-200/75">RY-0105</span>
          <span class="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">Partnership</span>
          <span class="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">Closing Soon</span>
        </div>
        <h2 class="font-display font-semibold text-[15px] sm:text-[16px] text-[#171F2C] truncate tracking-tight">
          Strategic Co-Selling: HIPAA-Ready Healthcare Data Lake with B2B Telehealth Vendors
        </h2>
        <div class="flex items-center gap-2 text-xs text-[#64748B] mt-0.5 truncate">
          <span class="font-medium text-[#171F2C]">Anonymous Verified Enterprise</span>
          <span class="inline-flex items-center gap-0.5 text-emerald-700 text-[10px] font-medium">
            <span class="material-symbols-outlined text-[12px]">verified</span> Verified
          </span>
          <span class="text-slate-300">•</span>
          <span class="">Series B ($28M ARR)</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
      <div class="flex items-center gap-3 text-right">
        <div class="flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Parity Score</span>
          <span class="font-mono text-xs font-bold text-[#171F2C]">94%</span>
        </div>
        <div class="hidden sm:flex flex-col items-end">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Expires</span>
          <span class="text-xs text-slate-600 font-medium">48 hours</span>
        </div>
      </div>
      <div class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 flex items-center justify-center text-slate-700 transition-transform duration-300 shrink-0 chevron-indicator">
        <span class="material-symbols-outlined text-[18px]">expand_more</span>
      </div>
    </div>
  </div>
  <!-- Collapsible Details Body -->
  <div class="collapsible-body border-t border-slate-100 p-6 flex flex-col gap-4 bg-white hidden">
    <div class="flex items-center justify-between gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">lock</span>
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-semibold text-xs sm:text-sm text-[#171F2C]">Anonymous Verified Enterprise</span>
            <span class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-medium">
              <span class="material-symbols-outlined text-[12px]">verified</span> Verified
            </span>
          </div>
          <div class="text-xs text-[#64748B]">Series B ($28M ARR) • Healthcare Cloud Data Infrastructure</div>
        </div>
      </div>
      <div class="text-right text-xs text-[#64748B]">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Status</span>
        <span class="font-medium text-emerald-700">Stage 2 Blinded</span>
      </div>
    </div>
    <div class="flex flex-col gap-1.5">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Opportunity Thesis</span>
      <p class="text-sm text-[#475569] leading-relaxed">
        Seeking certified telehealth applications, EHR integrators, and clinical analytics platforms seeking integrated data storage solutions. Opportunity to co-bid on multi-hospital system RFPs across 14 state networks.
      </p>
    </div>
    <div class="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-1.5">
      <div class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171F2C]">
        <span class="material-symbols-outlined text-[16px] text-slate-500">swap_horiz</span>
        <span class="">What We Offer in Bilateral Exchange</span>
      </div>
      <p class="text-xs sm:text-sm text-[#475569] leading-relaxed">
        Direct vendor bundle pricing, shared security audit underwriting ($60k cost saved), and mutual non-compete distribution guarantee.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
      <div class="flex items-center gap-3 text-xs text-[#64748B]">
        <span class="">41 saves</span>
        <span class="">19 pitches submitted</span>
        <span class="text-slate-300">•</span>
        <span class="text-[11px] font-medium text-slate-500 uppercase">Blinded Review</span>
      </div>
      <button class="px-4 py-2 rounded-xl bg-[#171F2C] hover:bg-[#2C374A] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 self-end sm:self-center shadow-xs cursor-pointer">
        <span class="">Express Interest</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>
  </div>
</article>

<!-- Minimalist Pagination -->
<div class="flex items-center justify-between py-3 px-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
  <span class="text-xs text-[#64748B]">Showing 1–4 of 1,483 commercial listings</span>
  <div class="flex items-center gap-1.5 text-xs">
    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed" disabled="">Previous</button>
    <button class="px-3 py-1.5 rounded-lg bg-[#171F2C] text-white font-medium">1</button>
    <button class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer">2</button>
    <button class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer">3</button>
    <span class="text-slate-400 px-1">...</span>
    <button class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer">149</button>
    <button class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer">Next</button>
  </div>
</div>

<script class="">
function toggleListing(cardId) {
  var card = document.getElementById(cardId);
  if (!card) return;
  var body = card.querySelector('.collapsible-body');
  var chevron = card.querySelector('.chevron-indicator');
  var isExpanded = card.getAttribute('data-expanded') === 'true';

  if (isExpanded) {
    body.classList.add('hidden');
    card.setAttribute('data-expanded', 'false');
    chevron.classList.remove('rotate-180');
  } else {
    body.classList.remove('hidden');
    card.setAttribute('data-expanded', 'true');
    chevron.classList.add('rotate-180');
  }
  updateBulkButtonState();
}

function toggleAllListings() {
  var cards = document.querySelectorAll('.listing-card');
  var anyCollapsed = Array.from(cards).some(function(c) { return c.getAttribute('data-expanded') !== 'true'; });

  cards.forEach(function(card) {
    var body = card.querySelector('.collapsible-body');
    var chevron = card.querySelector('.chevron-indicator');
    if (anyCollapsed) {
      body.classList.remove('hidden');
      card.setAttribute('data-expanded', 'true');
      chevron.classList.add('rotate-180');
    } else {
      body.classList.add('hidden');
      card.setAttribute('data-expanded', 'false');
      chevron.classList.remove('rotate-180');
    }
  });
  updateBulkButtonState();
}

function updateBulkButtonState() {
  var cards = document.querySelectorAll('.listing-card');
  var allExpanded = Array.from(cards).every(function(c) { return c.getAttribute('data-expanded') === 'true'; });
  var btnText = document.getElementById('bulk-toggle-text');
  var btnIcon = document.getElementById('bulk-toggle-icon');
  if (!btnText || !btnIcon) return;
  if (allExpanded) {
    btnText.textContent = 'Collapse All';
    btnIcon.textContent = 'unfold_less';
  } else {
    btnText.textContent = 'Expand All';
    btnIcon.textContent = 'unfold_more';
  }
}
</script></div>
<!-- Refined Right Sidebar -->
<aside class="lg:col-span-4 flex flex-col gap-4">
<!-- How The Relay Works -->
<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[#171F2C] text-[20px]">shield</span>
<h3 class="font-display font-semibold text-base text-[#171F2C]">How The Relay Works</h3>
</div>
<p class="text-xs text-[#64748B] leading-relaxed">
              Every transaction adheres strictly to Sovereign Reciprocal Architecture to ensure equal leverage and total confidentiality.
            </p>
<div class="flex flex-col gap-3.5 pt-1">
<div class="flex items-start gap-3">
<span class="w-6 h-6 rounded-lg bg-slate-100 text-[#171F2C] font-mono text-xs font-semibold flex items-center justify-center shrink-0 border border-slate-200/60">1</span>
<div>
<span class="text-xs font-semibold text-[#171F2C]">Blinded Discovery</span>
<p class="text-xs text-[#64748B] mt-0.5 leading-relaxed">Listings display commercial terms and verified revenue tier without leaking corporate identity.</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="w-6 h-6 rounded-lg bg-slate-100 text-[#171F2C] font-mono text-xs font-semibold flex items-center justify-center shrink-0 border border-slate-200/60">2</span>
<div>
<span class="text-xs font-semibold text-[#171F2C]">Negotiate Terms</span>
<p class="text-xs text-[#64748B] mt-0.5 leading-relaxed">Submit reciprocal terms through blinded channels. Parity scores quantify bilateral commitment balance.</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="w-6 h-6 rounded-lg bg-slate-100 text-[#171F2C] font-mono text-xs font-semibold flex items-center justify-center shrink-0 border border-slate-200/60">3</span>
<div>
<span class="text-xs font-semibold text-[#171F2C]">Contact Unlock on Mutual Agreement</span>
<p class="text-xs text-[#64748B] mt-0.5 leading-relaxed">Direct sovereign executive contacts and deal rooms reveal only after mutual bilateral handshake.</p>
</div>
</div>
</div>
</div>
<!-- Need a Custom Partner -->
<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-3">
<div class="flex items-center justify-between">
<span class="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Direct Procurement</span>
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
</div>
<h3 class="font-display font-semibold text-base text-[#171F2C]">Need a Custom Partner?</h3>
<p class="text-xs text-[#64748B] leading-relaxed">
              Broadcast a bespoke request to our private syndicate network of 3,920+ verified B2B enterprises.
            </p>
<button class="mt-2 w-full py-2.5 rounded-xl bg-[#171F2C] hover:bg-[#2C374A] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs">
<span class="">Post Blinded Request</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
<!-- Recent Handshakes Live Stream -->
<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-slate-700 text-[18px]">handshake</span>
<span class="font-display font-semibold text-sm text-[#171F2C]">Recent Handshakes</span>
</div>
<span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Live Feed</span>
</div>
<div class="flex flex-col gap-2.5">
<!-- Item 1 -->
<div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
<div class="flex items-center justify-between text-xs">
<span class="font-mono text-[11px] font-semibold text-[#171F2C]">RY-0012</span>
<span class="text-[#94A3B8] text-[11px]">4m ago</span>
</div>
<span class="text-xs font-semibold text-[#171F2C]">Handshake Sealed</span>
<p class="text-xs text-[#64748B]">Payment Gateway ↔ ERP Migration Firm</p>
<div class="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
<span class="material-symbols-outlined text-[13px]">lock_open</span>
<span class="">Stage 4 Contact Revealed</span>
</div>
</div>
<!-- Item 2 -->
<div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
<div class="flex items-center justify-between text-xs">
<span class="font-mono text-[11px] font-semibold text-[#171F2C]">RY-0188</span>
<span class="text-[#94A3B8] text-[11px]">21m ago</span>
</div>
<span class="text-xs font-semibold text-[#171F2C]">Pitch Accepted</span>
<p class="text-xs text-[#64748B]">Autonomous Drone Fleet ↔ Defense Contractor</p>
<div class="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
<span class="material-symbols-outlined text-[13px]">history_edu</span>
<span class="">Terms in Escrow Review</span>
</div>
</div>
<!-- Item 3 -->
<div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
<div class="flex items-center justify-between text-xs">
<span class="font-mono text-[11px] font-semibold text-[#171F2C]">RY-0204</span>
<span class="text-[#94A3B8] text-[11px]">54m ago</span>
</div>
<span class="text-xs font-semibold text-[#171F2C]">Handshake Sealed</span>
<p class="text-xs text-[#64748B]">B2B Telehealth ↔ HIPAA Cloud Provider</p>
<div class="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
<span class="material-symbols-outlined text-[13px]">lock_open</span>
<span class="">Stage 4 Contact Revealed</span>
</div>
</div>
</div>
</div>
<!-- Enforceable Covenants Notice -->
<div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
<span class="material-symbols-outlined text-slate-600 text-[18px] shrink-0 mt-0.5">gavel</span>
<div class="flex flex-col gap-0.5">
<span class="text-xs font-semibold text-[#171F2C]">Enforceable Covenants</span>
<p class="text-xs text-[#64748B] leading-relaxed">
                All member participants are legally bound by reciprocal non-circumvention clauses prior to confidential disclosure.
              </p>
</div>
</div>
</aside>
</div>
</div>
</main>
<!-- Clean Institutional Footer -->
<footer class="w-full bg-white border-t border-slate-200/80 mt-12">
<div class="max-w-[1600px] mx-auto px-6 sm:px-8 py-10">
<div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
<div class="flex items-center gap-3">
<div class="w-7 h-7 rounded-lg bg-[#171F2C] flex items-center justify-center text-white text-xs font-bold">
<span class="material-symbols-outlined text-[16px]">swap_horiz</span>
</div>
<span class="font-display font-bold text-sm text-[#171F2C]">The Relay</span>
<span class="text-xs text-[#94A3B8] ml-2">B2B Reciprocal Exchange Architecture</span>
</div>
<div class="flex flex-wrap items-center gap-6 text-xs text-[#64748B]">
<a class="hover:text-[#171F2C] transition-colors" href="#">Opportunity Board</a>
<a class="hover:text-[#171F2C] transition-colors" href="#">Directory</a>
<a class="hover:text-[#171F2C] transition-colors" href="#">Exchange Protocol</a>
<a class="hover:text-[#171F2C] transition-colors" href="#">Privacy Framework</a>
</div>
</div>
<div class="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-xs text-[#94A3B8]">
<p class="">Privacy by Default • Bilateral Contact Release in Stage 4 • Verified Enterprise Identity</p>
<div class="flex items-center gap-2 font-mono text-[11px]">
<span class="">SECURED PROTOCOL</span>
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
<span class="">STATUS 200 OK</span>
</div>
</div>
</div>
</footer>


</body></html>


---

## 9. Design System & Palette

| Role | Color | Hex |
|---|---|---|
| **Primary Black** | Pure / Near-Pure Black | `#000000` |
| **Dark Surface / Banner** | Charcoal | `#171F2C` |
| **White** | White | `#FFFFFF` |
| **Light Background** | Very Light Gray | `#F8FAFC` |
| **Border** | Light Gray | `#E2E8F0` |
| **Secondary Text** | Slate | `#64748B` |
| **Muted Text** | Muted Slate | `#94A3B8` |
| **Accent Orange** | Amber / Orange | `#F97316` / `#C2410C` |
| **Verified Green** | Emerald | `#059669` / `#ECFDF5` |

---

## 10. COMPREHENSIVE LIST OF STATIC FUNCTIONALITIES (MAIN BOARD & MODAL)

Below is the complete, consolidated registry of all UI components, mock feeds, benchmarks, and display-only features that are currently **static or preset** across the Opportunity Board and its Express Interest workflow:

### A. Main Opportunity Board (`/opportunities`)

1. **Top Intelligence Metric Strip (Platform Benchmarks):**
   - **Median Response Time:** Fixed benchmark display metric (`3.4h avg pitch turn`).
   - **Reciprocity Rate:** Fixed platform performance standard (`97% Bilateral`).
   - **Verified Businesses:** Member count benchmark display (`3,920 members`).
   *(Note: Active Deals count dynamically reflects verified database and seed listing volumes).*

2. **Sidebar — "How The Relay Works" Educational Card:**
   - Permanent 3-step walkthrough illustrating the core protocol (`1. Blinded Discovery`, `2. Negotiate Terms`, `3. Contact Unlock on Agreement`).

3. **Sidebar — "Need a Custom Partner?" Marketing Callout:**
   - Dark `#171F2C` promo card with static marketing copy (*"Broadcast what you need and what you offer in exchange. Your company identity remains completely confidential."*) and direct button routing to `/post`.

4. **Sidebar — "Recent Handshakes" Live Activity Pulse Stream:**
   - Simulated stream of recent B2B handshakes and stage unlocks:
     - `[RY-0012] Handshake Sealed: Payment Gateway ↔ ERP Migration Firm (4m ago · Contacts released)`
     - `[RY-0188] Pitch Accepted: Autonomous Drone Fleet ↔ Defense Contractor (21m ago · Terms harmonization)`
     - `[RY-0204] Handshake Sealed: B2B Telehealth ↔ HIPAA Cloud Provider (54m ago · Contacts released)`

5. **Listing Trust & Reliability Badges:**
   - **Parity Score Badge:** (e.g., `98% Parity`, `95% Parity`, `91% Parity`) display indicators on individual listing cards.
   - **Completed Exchanges Counter:** (e.g., `42 Exchanges Completed`, `28 Exchanges Completed`) benchmark counters on cards.

---

### B. Express Interest Modal

1. **Reciprocity Match Compatibility Badge:**
   - The `94% Match` pill with green indicator dot in the modal header is a fixed benchmark rating.

2. **Rev-Share Preset Tiers:**
   - The proposed commission selector pills (`25%`, `27.5%`, `30%`) are standardized percentage presets.

3. **Commitment Period Presets:**
   - The duration options (`6 Months`, `12 Months`) are fixed contract interval buttons.

4. **Legal / Governance Compliance Disclaimer:**
   - The footer assurance text (*"Bilateral mutual NDA automatically included. Identity remains blinded until accepted."*) is a standard protocol guarantee notice.

5. **Character Constraint:**
   - Hardcoded `500` maximum character constraint on the reciprocal pitch textarea.

---

//Express Interest Modal
//Design
<!DOCTYPE html>

<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; }
      main > :first-child { margin-top: 0 !important; }
      main > :last-child { margin-bottom: 0 !important; }
    }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
  </style>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary-black": "#000000",
            "dark-surface": "#171F2C",
            "light-bg": "#F8FAFC",
            "border-ui": "#E2E8F0",
            "text-secondary": "#64748B",
            "text-muted": "#94A3B8",
            "success-green": "#10B981",
            "success-light": "#ECFDF5",
            "success-text": "#047857"
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    };
  </script>
</head>
<body class="bg-[#F8FAFC] font-sans text-[#0F172A] antialiased overflow-hidden">
<!-- Header Navigation -->
<header class="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
<div class="h-16 w-full px-6 md:px-8 flex items-center justify-between gap-4">
<div class="flex items-center gap-8 shrink-0">
<div class="flex items-center gap-2.5">
<img alt="The Relay Logo" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VHU9L0EaIYNTuBCavqCXcTykNv3v8CyBoF_WwXHZ3xVV9On-6CzVPDHY8PpWi4hy2Wd0tysbWUnIk8B3qwvJVjNv0I-e9_oAX8Zr05nwc2exGMcDOg42TCDTFJht4vBI2rw5DkTlAfljAFJ0YgWv1tv3KyDJ3QTnY1Y661dVBkArByT44fhECYu0ovAR-MYDi_wUy_HL1YZvHAzfozpYTmnHVoD_vNeX_mM6NTK-lqfDAFEFUBjiTv5g">
<span class="font-display font-bold text-[17px] text-[#0F172A] tracking-tight">The Relay</span>
</div>
<div class="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-[#F8FAFC] rounded-md border border-[#E2E8F0]">
<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
<span class="text-[11px] font-semibold tracking-wider text-slate-700 uppercase">Verified Business Network</span>
</div>
</div>
<nav class="hidden lg:flex items-center gap-8 h-16">
<a class="text-[14px] font-semibold text-[#171F2C] border-b-2 border-[#171F2C] h-full flex items-center" href="#">Opportunity Board</a>
<a class="text-[14px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors h-full flex items-center" href="#">My Listings</a>
<a class="text-[14px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors h-full flex items-center" href="#">Saved</a>
<a class="text-[14px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors h-full flex items-center" href="#">Exchanges &amp; Handshakes</a>
<a class="text-[14px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors h-full flex items-center" href="#">Network Directory</a>
</nav>
<div class="flex items-center gap-3 shrink-0">
<div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#64748B] text-xs cursor-pointer hover:border-slate-400 transition-colors">
<span class="material-symbols-outlined text-[16px]">search</span>
<span class="">Search opportunities...</span>
<kbd class="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0] text-slate-500">⌘K</kbd>
</div>
<div class="relative p-2 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
<span class="material-symbols-outlined text-[20px]">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-[#171F2C] rounded-full"></span>
</div>
<button class="inline-flex items-center gap-1.5 bg-[#171F2C] hover:bg-black text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[15px]">add</span>
<span class="">Post Opportunity</span>
</button>
<div class="flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
<div class="w-8 h-8 rounded-full bg-[#171F2C] flex items-center justify-center text-white text-xs font-semibold">AS</div>
</div>
</div>
</div>
</header>
<!-- Main Background Container -->
<main class="w-full pt-16 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
<!-- Blurred Backdrop Opportunity Board Simulation -->
<div class="w-full px-8 py-8 select-none opacity-40 blur-[5px] pointer-events-none filter">
<div class="flex items-center justify-between pb-6 mb-6 border-b border-[#E2E8F0]">
<div>
<h1 class="text-2xl font-bold font-display text-slate-900">Institutional Opportunity Board</h1>
<p class="text-sm text-slate-500 mt-0.5">142 verified blinded deal mandates available</p>
</div>
<div class="flex items-center gap-3">
<div class="h-9 px-3 bg-white border border-[#E2E8F0] rounded-lg flex items-center gap-2 text-xs text-slate-600">
<span class="material-symbols-outlined text-[18px]">filter_list</span>
<span class="">Filters: Enterprise SaaS, DACH/UK, Parity &gt; 90%</span>
</div>
</div>
</div>
<!-- Sample Cards in Background -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col gap-3">
<div class="flex items-center justify-between">
<span class="font-mono text-xs text-[#171F2C] bg-slate-100 px-2 py-0.5 rounded font-semibold">[RY-0042]</span>
<span class="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">98% Parity</span>
</div>
<h3 class="font-display font-semibold text-slate-900 text-base">Synthetix AI — Distribution Partner</h3>
<p class="text-xs text-slate-500">Autonomous cognitive copilot requiring trusted enterprise channels in EMEA.</p>
<div class="grid grid-cols-3 gap-2 bg-[#F8FAFC] p-3 rounded-lg text-xs mt-2 border border-[#E2E8F0]">
<div><span class="text-slate-400 block text-[10px] uppercase font-semibold">ACV BAND</span><span class="font-semibold text-slate-800 font-mono">$120k-$350k</span></div>
<div><span class="text-slate-400 block text-[10px] uppercase font-semibold">TERRITORY</span><span class="font-semibold text-slate-800">UK &amp; DACH</span></div>
<div><span class="text-slate-400 block text-[10px] uppercase font-semibold">COMMISSION</span><span class="font-semibold text-slate-800 font-mono">25% Recur</span></div>
</div>
</div>
<div class="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col gap-3">
<div class="flex items-center justify-between">
<span class="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">[RY-0043]</span>
<span class="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">84% Parity</span>
</div>
<h3 class="font-display font-semibold text-slate-900 text-base">BioKite Data Pipeline Integration</h3>
<p class="text-xs text-slate-500">Clinical trial automation API seeking co-licensing with US hospital networks.</p>
</div>
<div class="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm flex flex-col gap-3">
<div class="flex items-center justify-between">
<span class="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">[RY-0044]</span>
<span class="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">91% Parity</span>
</div>
<h3 class="font-display font-semibold text-slate-900 text-base">Veloce Cloud Zero-Trust Gateway</h3>
<p class="text-xs text-slate-500">Direct hardware OEM joint venture in Nordic defense supply chain.</p>
</div>
</div>
</div>
<!-- Express Interest Modal Overlay Layer -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-sm">
<!-- Simplified, Clean, Breathable Modal Container -->
<div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-150">
<!-- 1. Minimal Clean Modal Header -->
<div class="px-8 pt-7 pb-5 border-b border-[#E2E8F0] bg-white shrink-0 flex items-start justify-between gap-4"><div class="space-y-1"><div class="flex items-center gap-2.5"><h2 class="font-display text-xl font-bold text-[#171F2C] tracking-tight">Express Interest: Synthetix AI</h2><span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>94% Match</span></div><p class="text-xs text-[#64748B]">European Distribution Partner</p></div><button aria-label="Close modal" class="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer shrink-0" type="button"><span class="material-symbols-outlined text-[20px]">close</span></button></div>
<!-- 2. Clean Single-Column Modal Content -->
<div class="px-8 py-6 space-y-5 overflow-y-auto max-h-[calc(88vh-140px)]"><div class="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-lg text-xs text-slate-600"><span class="material-symbols-outlined text-[15px] text-slate-400">info</span><span class=""><strong class="font-semibold text-slate-800">Seeking:</strong> Tier-1 DACH &amp; UK intros • <strong class="font-semibold text-slate-800">Offering:</strong> 25% recurring rev-share</span></div><div class="space-y-2"><div class="flex items-center justify-between"><label class="text-xs font-semibold text-[#171F2C]" for="pitch-input">Your Reciprocal Pitch</label><span class="text-[11px] text-[#94A3B8] font-mono">188/500</span></div><textarea class="w-full bg-white border border-[#E2E8F0] text-slate-900 text-sm rounded-xl p-3.5 focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-[#000000] leading-relaxed transition-all shadow-xs resize-none placeholder-slate-400" id="pitch-input" placeholder="Describe your reciprocal value or reach..." rows="3">We manage 42 Tier-1 logistics &amp; financial relationships across Frankfurt, Zurich, and London. We will bundle Synthetix AI into our Q3 enterprise migration framework.</textarea></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"><div class="space-y-1.5"><div class="flex items-center justify-between text-xs"><span class="text-xs font-semibold text-[#171F2C]">Proposed Rev Share</span><span class="font-mono font-bold text-xs text-[#171F2C]" id="split-val">27.5%</span></div><div class="grid grid-cols-3 gap-1.5"><button class="rev-option py-1.5 text-center text-xs font-medium rounded-lg border border-[#E2E8F0] text-slate-600 hover:bg-slate-50 transition-colors" data-val="25.0%" type="button">25%</button><button class="rev-option py-1.5 text-center text-xs font-semibold rounded-lg bg-[#000000] text-white transition-colors" data-val="27.5%" type="button">27.5%</button><button class="rev-option py-1.5 text-center text-xs font-medium rounded-lg border border-[#E2E8F0] text-slate-600 hover:bg-slate-50 transition-colors" data-val="30.0%" type="button">30%</button></div></div><div class="space-y-1.5"><div class="flex items-center justify-between text-xs"><span class="text-xs font-semibold text-[#171F2C]">Commitment Period</span><span class="text-slate-400 text-[11px]">12 mo.</span></div><div class="grid grid-cols-2 gap-1.5"><button class="duration-btn py-1.5 text-center text-xs font-medium rounded-lg border border-[#E2E8F0] text-slate-600 hover:bg-slate-50 transition-colors" type="button">6 Months</button><button class="duration-btn py-1.5 text-center text-xs font-semibold rounded-lg bg-[#000000] text-white transition-colors" type="button">12 Months</button></div></div></div><div class="pt-1 flex items-center gap-2 text-xs text-slate-500"><span class="material-symbols-outlined text-[15px] text-slate-400">lock</span><span class="">Bilateral mutual NDA automatically included. Identity remains blinded until accepted.</span></div></div>
<!-- 3. Modal Clean Direct Footer -->
<div class="px-8 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]/50 flex items-center justify-end gap-3 shrink-0"><button class="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-[#E2E8F0] transition-colors cursor-pointer" type="button">Cancel</button><button class="px-5 py-2 rounded-lg bg-[#000000] hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer" type="button"><span class="">Send Proposal</span><span class="material-symbols-outlined text-[15px]">arrow_forward</span></button></div>
</div>
</div>
</main>
<!-- Global Footer -->
<footer class="w-full bg-white border-t border-[#E2E8F0]">
<div class="w-full px-8 py-4">
<div class="flex flex-col md:flex-row items-center justify-between gap-2">
<div class="flex items-center gap-2">
<img alt="The Relay Logo" class="h-4 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VHU9L0EaIYNTuBCavqCXcTykNv3v8CyBoF_WwXHZ3xVV9On-6CzVPDHY8PpWi4hy2Wd0tysbWUnIk8B3qwvJVjNv0I-e9_oAX8Zr05nwc2exGMcDOg42TCDTFJht4vBI2rw5DkTlAfljAFJ0YgWv1tv3KyDJ3QTnY1Y661dVBkArByT44fhECYu0ovAR-MYDi_wUy_HL1YZvHAzfozpYTmnHVoD_vNeX_mM6NTK-lqfDAFEFUBjiTv5g">
<span class="text-xs font-semibold text-slate-800">The Relay</span>
<span class="text-xs text-slate-400 ml-2">B2B Reciprocal Exchange Architecture</span>
</div>
<div class="flex items-center gap-6 text-xs text-slate-500">
<a class="hover:text-slate-900 transition-colors" href="#">Opportunity Board</a>
<a class="hover:text-slate-900 transition-colors" href="#">Directory</a>
<a class="hover:text-slate-900 transition-colors" href="#">Exchange Protocol</a>
<a class="hover:text-slate-900 transition-colors" href="#">Privacy Framework</a>
</div>
<div class="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
<span class="">STATUS 200 OK</span>
</div>
</div>
</div>
</footer>
<script>
    // Segment pill selectors interaction
    const revButtons = document.querySelectorAll('.rev-option');
    const splitValDisplay = document.getElementById('split-val');
    revButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        revButtons.forEach(b => {
          b.className = "rev-option py-2 text-center text-xs font-medium rounded-lg border border-[#E2E8F0] text-slate-600 hover:bg-slate-50 transition-colors";
        });
        btn.className = "rev-option py-2 text-center text-xs font-semibold rounded-lg bg-[#000000] text-white transition-colors";
        if (splitValDisplay) {
          splitValDisplay.textContent = btn.getAttribute('data-val');
        }
      });
    });

    const durationButtons = document.querySelectorAll('.duration-btn');
    durationButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        durationButtons.forEach(b => {
          b.className = "duration-btn py-2 text-center text-xs font-medium rounded-lg border border-[#E2E8F0] text-slate-600 hover:bg-slate-50 transition-colors";
        });
        btn.className = "duration-btn py-2 text-center text-xs font-semibold rounded-lg bg-[#000000] text-white transition-colors";
      });
    });
  </script>


</body></html>