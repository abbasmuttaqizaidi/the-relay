Design

<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>The Relay — Commercial Opportunity Board</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@500;600&amp;family=Plus+Jakarta+Sans:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
    @layer base {
      html, body { margin: 0; padding: 0; }
      body { overscroll-behavior: none; }
    }
    ::-webkit-scrollbar { display: none; }
  </style>
</head>
<body class="bg-[#F8FAFC] font-['Inter'] text-[#171F2C] antialiased min-h-screen flex flex-col">
<!-- Minimalist Clean Top Header -->
<header class="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
<div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
<!-- Brand & Main Nav -->
<div class="flex items-center gap-8">
<a class="flex items-center gap-2.5 group" href="#">
<div class="w-8 h-8 rounded-lg bg-[#000000] flex items-center justify-center text-white font-['Plus_Jakarta_Sans'] font-extrabold text-base tracking-tight shadow-sm group-hover:bg-[#171F2C] transition-colors">
            R
          </div>
<div class="flex items-baseline gap-1.5">
<span class="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#000000] tracking-tight">The Relay</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
</div>
</a>
<!-- Clean Navigation Links -->
<nav class="hidden md:flex items-center gap-1">
<a aria-current="page" class="px-3.5 py-1.5 text-sm font-medium rounded-md bg-[#F8FAFC] text-[#000000] transition-colors" href="#">Opportunity Board</a>
<a class="px-3.5 py-1.5 text-sm font-medium rounded-md text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] transition-colors" href="#">My Listings</a>
<a class="px-3.5 py-1.5 text-sm font-medium rounded-md text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] transition-colors" href="#">Saved</a>
<a class="px-3.5 py-1.5 text-sm font-medium rounded-md text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] transition-colors" href="#">Exchanges</a>
<a class="px-3.5 py-1.5 text-sm font-medium rounded-md text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] transition-colors" href="#">Network Directory</a>
</nav>
</div>
<!-- Search & Right Profile Actions -->
<div class="flex items-center gap-3">
<div class="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] w-64 hover:border-[#CBD5E1] transition-colors">
<span class="material-symbols-outlined text-[16px] text-[#94A3B8]">search</span>
<span class="flex-1">Search network...</span>
<kbd class="font-['JetBrains_Mono'] text-[10px] bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded text-[#94A3B8]">⌘K</kbd>
</div>
<button class="relative p-2 text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] rounded-lg transition-colors" title="Notifications">
<span class="material-symbols-outlined text-[20px]">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F97316]"></span>
</button>
<!-- Primary Post Button (Solid Black #000000) -->
<a class="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white font-medium text-sm px-4 py-2 rounded-lg transition-all shadow-sm" href="#">
<span class="material-symbols-outlined text-[18px]">add</span>
<span>Post Opportunity</span>
</a>
<!-- Account Avatar -->
<div class="w-8 h-8 rounded-full bg-[#171F2C] text-white font-medium text-xs flex items-center justify-center ml-1 cursor-pointer">
          AS
        </div>
</div>
</div>
</header>
<!-- Main Content Wrapper -->
<main class="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8">
<!-- Clean Header & Brief Subheading -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
<div>
<div class="flex items-center gap-2 mb-1.5">
<span class="text-xs font-semibold text-[#F97316] uppercase tracking-wider">Reciprocal Dealflow</span>
<span class="text-[#CBD5E1]">•</span>
<span class="text-xs text-[#64748B]">Zero Cold Outreach</span>
</div>
<h1 class="font-['Plus_Jakarta_Sans'] font-bold text-2xl md:text-3xl text-[#000000] tracking-tight">
          Commercial Opportunity Board
        </h1>
<p class="text-sm md:text-base text-[#64748B] mt-1.5 max-w-2xl leading-relaxed">
          Discover high-intent B2B partnerships, distribution deals, and reciprocal exchanges. Privacy-guaranteed until mutual agreement.
        </p>
</div>
<!-- Quick Action Pill / Help -->
<div class="flex items-center gap-2">
<button class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#171F2C] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg transition-colors" id="guidedTourBtn">
<span class="material-symbols-outlined text-[16px] text-[#64748B]">help_outline</span>
<span>How It Works</span>
</button>
</div>
</div>
<!-- Streamlined Metrics Strip (4 clean, uncluttered stats) -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
<div class="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between">
<span class="text-xs font-medium text-[#64748B]">Active Deals</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-['JetBrains_Mono'] text-2xl font-bold text-[#000000]">1,482</span>
<span class="text-[11px] text-[#64748B]">verified</span>
</div>
</div>
<div class="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between">
<span class="text-xs font-medium text-[#64748B]">Median Response</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-['JetBrains_Mono'] text-2xl font-bold text-[#000000]">3.4h</span>
<span class="text-[11px] text-[#64748B]">avg pitch turn</span>
</div>
</div>
<div class="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between">
<span class="text-xs font-medium text-[#64748B]">Reciprocity Rate</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-['JetBrains_Mono'] text-2xl font-bold text-[#000000]">97%</span>
<span class="text-[11px] text-[#059669] font-medium">Bilateral</span>
</div>
</div>
<div class="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between">
<span class="text-xs font-medium text-[#64748B]">Verified Businesses</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-['JetBrains_Mono'] text-2xl font-bold text-[#000000]">3,920</span>
<span class="text-[11px] text-[#64748B]">members</span>
</div>
</div>
</div>
<!-- Category Tabs Filter -->
<div class="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-[#000000] text-white text-xs font-medium transition-colors shadow-xs">
        All Deals <span class="ml-1 opacity-70">1,482</span>
</button>
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] text-xs font-medium transition-colors">
        Partnership <span class="ml-1 text-[#94A3B8]">412</span>
</button>
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] text-xs font-medium transition-colors">
        Referral <span class="ml-1 text-[#94A3B8]">320</span>
</button>
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] text-xs font-medium transition-colors">
        Distribution <span class="ml-1 text-[#94A3B8]">215</span>
</button>
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] text-xs font-medium transition-colors">
        Vendor <span class="ml-1 text-[#94A3B8]">198</span>
</button>
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] text-xs font-medium transition-colors">
        Hiring <span class="ml-1 text-[#94A3B8]">110</span>
</button>
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] text-xs font-medium transition-colors">
        Strategic Advice <span class="ml-1 text-[#94A3B8]">142</span>
</button>
<button class="category-pill shrink-0 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#000000] hover:bg-[#F8FAFC] text-xs font-medium transition-colors">
        Investment <span class="ml-1 text-[#94A3B8]">85</span>
</button>
</div>
<!-- Search & Secondary Filter Controls -->
<div class="mt-4 mb-6 bg-white border border-[#E2E8F0] rounded-xl p-3 flex flex-col md:flex-row items-center gap-3">
<!-- Search Input -->
<div class="relative flex-1 w-full">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#94A3B8]">search</span>
<input class="w-full h-10 pl-9 pr-4 text-xs md:text-sm bg-[#F8FAFC] text-[#000000] placeholder-[#94A3B8] rounded-lg border-0 focus:ring-1 focus:ring-[#000000] transition-colors" id="dealSearchInput" placeholder="Search by title, exchange terms, or industry keywords..." type="text"/>
</div>
<!-- Filters & Sort -->
<div class="flex items-center gap-2 w-full md:w-auto shrink-0 flex-wrap sm:flex-nowrap">
<select class="h-10 px-3 bg-[#F8FAFC] text-xs font-medium text-[#171F2C] border-0 rounded-lg focus:ring-1 focus:ring-[#000000] cursor-pointer">
<option value="">Industry: All</option>
<option value="saas">SaaS &amp; Cloud</option>
<option value="ai">AI &amp; Data</option>
<option value="fintech">FinTech</option>
<option value="logistics">Logistics</option>
<option value="health">Healthcare</option>
</select>
<select class="h-10 px-3 bg-[#F8FAFC] text-xs font-medium text-[#171F2C] border-0 rounded-lg focus:ring-1 focus:ring-[#000000] cursor-pointer">
<option value="na">Region: Global</option>
<option value="na">North America</option>
<option value="eu">Europe</option>
<option value="apac">APAC</option>
</select>
<select class="h-10 px-3 bg-[#F8FAFC] text-xs font-medium text-[#171F2C] border-0 rounded-lg focus:ring-1 focus:ring-[#000000] cursor-pointer">
<option>Sort: Newest First</option>
<option>Sort: Expiring Soon</option>
<option>Sort: Highest Reciprocity</option>
</select>
</div>
</div>
<!-- 2-Column Main Feed Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<!-- Main Feed Column (8 Cols) -->
<div class="lg:col-span-8 space-y-4">
<!-- CARD 1: RY-0042 -->
<article class="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-4 group">
<!-- Card Header Bar -->
<div class="flex items-center justify-between gap-3 text-xs">
<div class="flex items-center gap-2 flex-wrap">
<span class="font-['JetBrains_Mono'] font-medium text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded">RY-0042</span>
<span class="font-semibold text-[11px] text-[#171F2C] bg-[#F1F5F9] px-2 py-0.5 rounded uppercase tracking-wider">Distribution</span>
<span class="text-[11px] font-semibold text-[#C2410C] bg-[#FFF7ED] border border-[#FFEDD5] px-2 py-0.5 rounded uppercase">Urgent</span>
</div>
<div class="flex items-center gap-1.5 text-[#94A3B8]">
<span class="material-symbols-outlined text-[14px]">schedule</span>
<span>Expires in 6 days</span>
</div>
</div>
<!-- Company Info Row -->
<div class="flex items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-[#171F2C] text-white flex items-center justify-center font-bold text-sm font-['Plus_Jakarta_Sans'] shrink-0">
                SX
              </div>
<div>
<div class="flex items-center gap-1.5">
<span class="font-semibold text-sm text-[#000000]">Synthetix AI</span>
<span class="material-symbols-outlined text-[16px] text-[#059669]" title="Verified Business">check_circle</span>
</div>
<div class="text-xs text-[#64748B]">San Francisco, CA • AI &amp; Enterprise Data</div>
</div>
</div>
<div class="text-right hidden sm:block">
<div class="text-xs font-semibold text-[#059669]">98% Parity Score</div>
<div class="text-[11px] text-[#94A3B8]">42 Exchanges Completed</div>
</div>
</div>
<!-- Title & Description -->
<div class="space-y-2">
<h2 class="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#000000] group-hover:text-[#171F2C] transition-colors leading-snug">
              European Distribution Partner Needed for SOC-2 Compliant Enterprise Agent Platform
            </h2>
<p class="text-xs md:text-sm text-[#64748B] leading-relaxed">
              Seeking established system integrators and SaaS distributors in DACH &amp; UK regions with direct C-level buyer relationships in Tier-1 logistics or banking. Target transaction sizes $120k–$350k ACV. Solution is EU-hosted and GDPR compliant.
            </p>
</div>
<!-- What We Offer in Exchange Callout Box -->
<div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3.5 text-xs md:text-sm">
<div class="flex items-center gap-1.5 text-[#000000] font-semibold text-xs mb-1">
<span class="material-symbols-outlined text-[16px] text-[#F97316]">swap_horiz</span>
<span>What We Offer in Exchange:</span>
</div>
<p class="text-[#64748B] leading-relaxed">
              Direct reseller commission of 25% recurring for contract life + co-marketing budget allocation of $15,000 per enterprise account closed, plus dedicated solutions architect field support.
            </p>
</div>
<!-- Card Footer & Actions -->
<div class="flex items-center justify-between gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
<div class="flex items-center gap-4 text-[#64748B]">
<button class="bookmark-toggle inline-flex items-center gap-1 hover:text-[#000000] transition-colors">
<span class="material-symbols-outlined text-[16px]">bookmark_border</span>
<span>14 saves</span>
</button>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">inbox</span>
<span>6 pitches in review</span>
</div>
<div class="hidden sm:flex items-center gap-1 text-[#94A3B8]" title="Contact details unlocked at Stage 4">
<span class="material-symbols-outlined text-[15px]">lock</span>
<span>Stage 4 Reveal</span>
</div>
</div>
<!-- Primary Action (Black Button) -->
<button class="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs" onclick="openInterestModal('RY-0042', 'Synthetix AI', 'European Distribution Partner Needed for SOC-2 Compliant Enterprise Agent Platform', '25% recurring reseller commission + $15k co-op budget')">
<span>Express Interest</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</article>
<!-- CARD 2: RY-0089 -->
<article class="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-4 group">
<div class="flex items-center justify-between gap-3 text-xs">
<div class="flex items-center gap-2 flex-wrap">
<span class="font-['JetBrains_Mono'] font-medium text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded">RY-0089</span>
<span class="font-semibold text-[11px] text-[#171F2C] bg-[#F1F5F9] px-2 py-0.5 rounded uppercase tracking-wider">Referral</span>
<span class="text-[11px] font-semibold text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded uppercase">Featured</span>
</div>
<div class="flex items-center gap-1.5 text-[#94A3B8]">
<span class="material-symbols-outlined text-[14px]">schedule</span>
<span>Expires in 11 days</span>
</div>
</div>
<div class="flex items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-[#000000] text-white flex items-center justify-center font-bold text-sm font-['Plus_Jakarta_Sans'] shrink-0">
                AL
              </div>
<div>
<div class="flex items-center gap-1.5">
<span class="font-semibold text-sm text-[#000000]">Apex Logistics Group</span>
<span class="material-symbols-outlined text-[16px] text-[#059669]" title="Verified Business">check_circle</span>
</div>
<div class="text-xs text-[#64748B]">Chicago, IL • Enterprise Freight Systems (450+ Managed Fleets)</div>
</div>
</div>
<div class="text-right hidden sm:block">
<div class="text-xs font-semibold text-[#059669]">95% Parity Score</div>
<div class="text-[11px] text-[#94A3B8]">28 Exchanges Completed</div>
</div>
</div>
<div class="space-y-2">
<h2 class="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#000000] group-hover:text-[#171F2C] transition-colors leading-snug">
              Cross-Referral Pact: Mid-Market Salesforce Implementation for HubSpot Migration Agencies
            </h2>
<p class="text-xs md:text-sm text-[#64748B] leading-relaxed">
              We manage enterprise Salesforce instances for 300+ transportation leaders. Our clients regularly require dedicated inbound marketing migrations to HubSpot that fall outside our scope. Looking for a high-retention agency partner for reciprocal routing.
            </p>
</div>
<div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3.5 text-xs md:text-sm">
<div class="flex items-center gap-1.5 text-[#000000] font-semibold text-xs mb-1">
<span class="material-symbols-outlined text-[16px] text-[#F97316]">swap_horiz</span>
<span>What We Offer in Exchange:</span>
</div>
<p class="text-[#64748B] leading-relaxed">
              Direct reciprocal routing of 4–6 mid-market marketing automation setups per month ($45k average contract value) in exchange for enterprise Salesforce CRM advisory leads.
            </p>
</div>
<div class="flex items-center justify-between gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
<div class="flex items-center gap-4 text-[#64748B]">
<button class="bookmark-toggle inline-flex items-center gap-1 hover:text-[#000000] transition-colors">
<span class="material-symbols-outlined text-[16px]">bookmark_border</span>
<span>21 saves</span>
</button>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">inbox</span>
<span>9 pitches in review</span>
</div>
<div class="hidden sm:flex items-center gap-1 text-[#94A3B8]">
<span class="material-symbols-outlined text-[15px]">lock</span>
<span>Stage 4 Reveal</span>
</div>
</div>
<button class="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs" onclick="openInterestModal('RY-0089', 'Apex Logistics Group', 'Cross-Referral Pact: Mid-Market Salesforce Implementation', 'Reciprocal routing of 4-6 mid-market HubSpot accounts/mo')">
<span>Express Interest</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</article>
<!-- CARD 3: RY-0105 (Anonymous Verified Partner) -->
<article class="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-4 group">
<div class="flex items-center justify-between gap-3 text-xs">
<div class="flex items-center gap-2 flex-wrap">
<span class="font-['JetBrains_Mono'] font-medium text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded">RY-0105</span>
<span class="font-semibold text-[11px] text-[#171F2C] bg-[#F1F5F9] px-2 py-0.5 rounded uppercase tracking-wider">Partnership</span>
<span class="text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded flex items-center gap-1">
<span class="material-symbols-outlined text-[13px]">visibility_off</span> Anonymous Partner
              </span>
</div>
<div class="flex items-center gap-1.5 text-[#C2410C] font-medium">
<span class="material-symbols-outlined text-[14px]">warning</span>
<span>Expires in 48 hours</span>
</div>
</div>
<div class="flex items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] flex items-center justify-center font-bold text-xs font-['JetBrains_Mono'] shrink-0">
                #ANON
              </div>
<div>
<div class="flex items-center gap-1.5">
<span class="font-semibold text-sm text-[#000000]">Anonymous Verified Enterprise</span>
<span class="material-symbols-outlined text-[16px] text-[#059669]" title="Verified Business">check_circle</span>
</div>
<div class="text-xs text-[#64748B]">London, UK • FinTech &amp; Clearances</div>
</div>
</div>
<div class="text-right hidden sm:block">
<div class="text-xs font-semibold text-[#059669]">100% Parity Score</div>
<div class="text-[11px] text-[#94A3B8]">61 Exchanges Completed</div>
</div>
</div>
<div class="space-y-2">
<h2 class="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#000000] group-hover:text-[#171F2C] transition-colors leading-snug">
              Strategic Co-Selling: HIPAA-Ready Healthcare Data Lake with B2B Telehealth Vendors
            </h2>
<p class="text-xs md:text-sm text-[#64748B] leading-relaxed">
              We operate an FDA-vetted data aggregation warehouse servicing regional hospitals. Seeking mutual introduction covenants with remote clinic software providers to unlock joint RFPs across 14 state-level healthcare networks.
            </p>
</div>
<div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3.5 text-xs md:text-sm">
<div class="flex items-center gap-1.5 text-[#000000] font-semibold text-xs mb-1">
<span class="material-symbols-outlined text-[16px] text-[#F97316]">swap_horiz</span>
<span>What We Offer in Exchange:</span>
</div>
<p class="text-[#64748B] leading-relaxed">
              Direct warm access to Procurement VP contacts across 22 multi-hospital regional networks, plus mutual OEM margin share on software bundles.
            </p>
</div>
<div class="flex items-center justify-between gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
<div class="flex items-center gap-4 text-[#64748B]">
<button class="bookmark-toggle inline-flex items-center gap-1 hover:text-[#000000] transition-colors">
<span class="material-symbols-outlined text-[16px]">bookmark_border</span>
<span>38 saves</span>
</button>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">inbox</span>
<span>14 pitches in review</span>
</div>
<div class="hidden sm:flex items-center gap-1 text-[#94A3B8]">
<span class="material-symbols-outlined text-[15px]">lock</span>
<span>Strict Bilateral Mask</span>
</div>
</div>
<button class="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs" onclick="openInterestModal('RY-0105', 'Anonymous Verified Enterprise', 'Strategic Co-Selling: HIPAA-Ready Healthcare Data Lake', 'Warm Procurement VP intros across 22 regional hospital networks')">
<span>Express Interest</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</article>
<!-- CARD 4: RY-0027 -->
<article class="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-5 md:p-6 transition-all duration-200 hover:shadow-sm flex flex-col gap-4 group">
<div class="flex items-center justify-between gap-3 text-xs">
<div class="flex items-center gap-2 flex-wrap">
<span class="font-['JetBrains_Mono'] font-medium text-[#171F2C] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded">RY-0027</span>
<span class="font-semibold text-[11px] text-[#171F2C] bg-[#F1F5F9] px-2 py-0.5 rounded uppercase tracking-wider">Vendor Agreement</span>
</div>
<div class="flex items-center gap-1.5 text-[#94A3B8]">
<span class="material-symbols-outlined text-[14px]">schedule</span>
<span>Expires in 18 days</span>
</div>
</div>
<div class="flex items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-[#000000] text-white flex items-center justify-center font-bold text-sm font-['Plus_Jakarta_Sans'] shrink-0">
                HC
              </div>
<div>
<div class="flex items-center gap-1.5">
<span class="font-semibold text-sm text-[#000000]">Hyperion Cloud</span>
<span class="material-symbols-outlined text-[16px] text-[#059669]" title="Verified Business">check_circle</span>
</div>
<div class="text-xs text-[#64748B]">Austin, TX • Bare Metal &amp; GPU Infrastructure</div>
</div>
</div>
<div class="text-right hidden sm:block">
<div class="text-xs font-semibold text-[#059669]">92% Parity Score</div>
<div class="text-[11px] text-[#94A3B8]">19 Exchanges Completed</div>
</div>
</div>
<div class="space-y-2">
<h2 class="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#000000] group-hover:text-[#171F2C] transition-colors leading-snug">
              Direct Compute Barter: High-Density H100 GPU Clusters for Certified Model Fine-Tuning Labs
            </h2>
<p class="text-xs md:text-sm text-[#64748B] leading-relaxed">
              Offering reserved 128x NVIDIA H100 pods on dedicated dark fiber lines. Seeking an experienced foundation model post-training group to provide fine-tuning pipeline orchestration for our internal platform clients.
            </p>
</div>
<div class="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3.5 text-xs md:text-sm">
<div class="flex items-center gap-1.5 text-[#000000] font-semibold text-xs mb-1">
<span class="material-symbols-outlined text-[16px] text-[#F97316]">swap_horiz</span>
<span>What We Offer in Exchange:</span>
</div>
<p class="text-[#64748B] leading-relaxed">
              Guaranteed 2,000 monthly GPU hours at zero cash cost in direct reciprocal exchange for 80 hours of Senior ML Engineering advisory and optimization weights.
            </p>
</div>
<div class="flex items-center justify-between gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
<div class="flex items-center gap-4 text-[#64748B]">
<button class="bookmark-toggle inline-flex items-center gap-1 hover:text-[#000000] transition-colors">
<span class="material-symbols-outlined text-[16px]">bookmark_border</span>
<span>49 saves</span>
</button>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">inbox</span>
<span>11 pitches in review</span>
</div>
<div class="hidden sm:flex items-center gap-1 text-[#94A3B8]">
<span class="material-symbols-outlined text-[15px]">lock</span>
<span>Stage 4 Reveal</span>
</div>
</div>
<button class="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs" onclick="openInterestModal('RY-0027', 'Hyperion Cloud', 'Direct Compute Barter: High-Density H100 GPU Clusters', '2,000 monthly GPU hours at zero cost in exchange for ML engineering advisory')">
<span>Express Interest</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</article>
<!-- Clean Streamlined Pagination -->
<div class="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-xl px-5 py-3.5 text-xs text-[#64748B]">
<div>
            Showing <span class="font-semibold text-[#000000]">1 – 4</span> of <span class="font-semibold text-[#000000]">1,482</span> listings
          </div>
<div class="flex items-center gap-1">
<button class="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] disabled:opacity-40" disabled="">Previous</button>
<button class="px-3 py-1.5 rounded-lg bg-[#000000] text-white font-medium">1</button>
<button class="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#171F2C]">2</button>
<button class="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#171F2C]">3</button>
<span class="px-1 text-[#94A3B8]">...</span>
<button class="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#171F2C]">Next</button>
</div>
</div>
</div>
<!-- Right Column: Secondary Sidebar (4 Cols) -->
<aside class="lg:col-span-4 space-y-5">
<!-- 1. 'How The Relay Works' - Simple 3-step vertical card -->
<div class="bg-white border border-[#E2E8F0] rounded-xl p-5">
<div class="flex items-center gap-2 mb-3">
<span class="material-symbols-outlined text-[20px] text-[#000000]">sync_alt</span>
<h3 class="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#000000]">How The Relay Works</h3>
</div>
<p class="text-xs text-[#64748B] mb-4 leading-relaxed">
            The Relay connects verified enterprises on mutual reciprocity. Identity is strictly obscured until terms are agreed.
          </p>
<div class="space-y-3">
<!-- Step 1 -->
<div class="flex items-start gap-3">
<div class="w-6 h-6 rounded-full bg-[#000000] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
<div>
<div class="text-xs font-semibold text-[#000000]">Blinded Discovery</div>
<div class="text-[11px] text-[#64748B] mt-0.5">Browse listings and submit reciprocal value pitches without exposing contact data.</div>
</div>
</div>
<!-- Step 2 -->
<div class="flex items-start gap-3">
<div class="w-6 h-6 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#171F2C] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
<div>
<div class="text-xs font-semibold text-[#000000]">Negotiate Terms</div>
<div class="text-[11px] text-[#64748B] mt-0.5">Parties align on commercial exchange terms and verify parity inside the sandbox.</div>
</div>
</div>
<!-- Step 3 -->
<div class="flex items-start gap-3">
<div class="w-6 h-6 rounded-full bg-[#059669] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
<div>
<div class="text-xs font-semibold text-[#000000]">Contact Unlock on Agreement</div>
<div class="text-[11px] text-[#64748B] mt-0.5">Simultaneous release of executive contacts, calendars, and legal NDAs.</div>
</div>
</div>
</div>
</div>
<!-- 2. 'Need a Custom Partner?' - Clean callout card -->
<div class="bg-[#171F2C] text-white rounded-xl p-5 shadow-sm">
<span class="text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase">Targeted Placement</span>
<h4 class="font-['Plus_Jakarta_Sans'] font-bold text-base text-white mt-1">Need a Custom Partner?</h4>
<p class="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
            Broadcast what you need and what you offer in exchange. Your company identity remains completely confidential.
          </p>
<a class="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-[#F8FAFC] text-[#000000] text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors" href="#">
<span>Post Blinded Request</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
<!-- 3. Simple Recent Exchange Activity Widget -->
<div class="bg-white border border-[#E2E8F0] rounded-xl p-5">
<div class="flex items-center justify-between mb-3">
<h3 class="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#000000]">Recent Handshakes</h3>
<span class="text-[10px] font-semibold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded">LIVE</span>
</div>
<div class="space-y-3">
<div class="pb-2.5 border-b border-[#F1F5F9] last:border-0 last:pb-0">
<div class="flex items-center justify-between text-[11px] text-[#94A3B8]">
<span class="font-['JetBrains_Mono'] text-[#171F2C] font-medium">[RY-0012] Handshake Sealed</span>
<span>4m ago</span>
</div>
<p class="text-xs text-[#000000] font-medium mt-1">Payment Gateway ↔ ERP Migration Firm</p>
<span class="inline-flex items-center gap-1 text-[11px] text-[#059669] mt-0.5">
<span class="material-symbols-outlined text-[13px]">lock_open</span> Contacts released
              </span>
</div>
<div class="pb-2.5 border-b border-[#F1F5F9] last:border-0 last:pb-0">
<div class="flex items-center justify-between text-[11px] text-[#94A3B8]">
<span class="font-['JetBrains_Mono'] text-[#171F2C] font-medium">[RY-0188] Pitch Accepted</span>
<span>21m ago</span>
</div>
<p class="text-xs text-[#000000] font-medium mt-1">Autonomous Drone Fleet ↔ Defense Contractor</p>
<span class="inline-flex items-center gap-1 text-[11px] text-[#64748B] mt-0.5">
<span class="material-symbols-outlined text-[13px]">tune</span> Terms harmonization
              </span>
</div>
<div class="last:pb-0">
<div class="flex items-center justify-between text-[11px] text-[#94A3B8]">
<span class="font-['JetBrains_Mono'] text-[#171F2C] font-medium">[RY-0204] Handshake Sealed</span>
<span>54m ago</span>
</div>
<p class="text-xs text-[#000000] font-medium mt-1">B2B Telehealth ↔ HIPAA Cloud Provider</p>
<span class="inline-flex items-center gap-1 text-[11px] text-[#059669] mt-0.5">
<span class="material-symbols-outlined text-[13px]">lock_open</span> Contacts released
              </span>
</div>
</div>
</div>
</aside>
</div>
</main>
<!-- Clean, Minimal Footer -->
<footer class="w-full bg-white border-t border-[#E2E8F0] mt-12">
<div class="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded bg-[#000000] text-white flex items-center justify-center font-bold text-xs">R</div>
<span class="font-semibold text-[#000000]">The Relay</span>
<span class="text-[#CBD5E1]">|</span>
<span>B2B Reciprocal Exchange Architecture</span>
</div>
<div class="flex items-center gap-6">
<a class="hover:text-[#000000] transition-colors" href="#">Opportunity Board</a>
<a class="hover:text-[#000000] transition-colors" href="#">Network Directory</a>
<a class="hover:text-[#000000] transition-colors" href="#">Exchange Protocol</a>
<a class="hover:text-[#000000] transition-colors" href="#">Privacy Framework</a>
</div>
<div class="text-[#94A3B8]">
        Privacy Guaranteed • Bilateral Release Only
      </div>
</div>
</footer>
<!-- Clean Express Interest Modal Dialog -->
<div aria-modal="true" class="fixed inset-0 z-50 hidden" id="expressInterestModal" role="dialog">
<!-- Backdrop -->
<div class="absolute inset-0 bg-[#000000]/50 backdrop-blur-xs transition-opacity" onclick="closeInterestModal()"></div>
<!-- Modal Container -->
<div class="relative min-h-screen flex items-center justify-center p-4">
<div class="relative w-full max-w-xl bg-white border border-[#E2E8F0] rounded-xl shadow-xl overflow-hidden">
<!-- Modal Top Bar -->
<div class="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
<div>
<h3 class="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#000000]" id="modalHeaderTitle">Express Commercial Interest</h3>
<p class="text-xs text-[#64748B]">Stage 1: Blinded value proposition</p>
</div>
<button class="w-8 h-8 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#000000] flex items-center justify-center transition-colors" onclick="closeInterestModal()">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<!-- Privacy Assurance Banner -->
<div class="px-6 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center gap-2 text-xs text-[#64748B]">
<span class="material-symbols-outlined text-[16px] text-[#000000]">lock</span>
<span>Your corporate identity remains blinded until mutual Stage 3 agreement.</span>
</div>
<!-- Form Body -->
<form class="p-6 space-y-4" id="interestForm" onsubmit="handleFormSubmit(event)">
<!-- Deal Recap Box -->
<div class="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-1 text-xs">
<div class="flex items-center justify-between">
<span class="font-['JetBrains_Mono'] font-medium text-[#000000]" id="modalListingCode">[RY-0042]</span>
<span class="text-[#64748B]" id="modalTargetCompany">Target: Synthetix AI</span>
</div>
<div class="font-medium text-[#000000]" id="modalListingTitle">European Distribution Partner Needed</div>
<div class="text-[#64748B]">They Offer: <span class="text-[#171F2C]" id="modalListingOffer">25% recurring margin</span></div>
</div>
<!-- Input: Reciprocal Offer -->
<div class="space-y-1">
<label class="block text-xs font-semibold text-[#000000]" for="proposedValue">
              What do you offer in exchange? <span class="text-[#F97316]">*</span>
</label>
<textarea class="w-full text-xs md:text-sm p-3 bg-white border border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#000000] focus:border-[#000000] placeholder-[#94A3B8] resize-none" id="proposedValue" placeholder="Be specific: mutual client referrals, territory access, compute, engineering hours, or co-selling agreements..." required="" rows="3"></textarea>
</div>
<!-- Input: Capabilities -->
<div class="space-y-1">
<label class="block text-xs font-semibold text-[#000000]" for="synergyCapabilities">
              Relevant Capability / Reach <span class="text-[#F97316]">*</span>
</label>
<input class="w-full h-10 px-3 text-xs md:text-sm bg-white border border-[#E2E8F0] rounded-lg focus:ring-1 focus:ring-[#000000] focus:border-[#000000] placeholder-[#94A3B8]" id="synergyCapabilities" placeholder="e.g. 15 Tier-1 Enterprise Banking clients in DACH, ISO27001 accredited" required="" type="text"/>
</div>
<!-- Bilateral Notice Checkbox -->
<div class="flex items-start gap-2 pt-1">
<input class="mt-0.5 rounded text-[#000000] focus:ring-0 cursor-pointer" id="bilateralConsent" required="" type="checkbox"/>
<label class="text-xs text-[#64748B] cursor-pointer select-none" for="bilateralConsent">
              I agree to The Relay Protocol. Direct corporate contacts are shared only after both parties accept commercial terms.
            </label>
</div>
<!-- Modal Actions -->
<div class="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
<button class="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#000000] transition-colors" onclick="closeInterestModal()" type="button">
              Cancel
            </button>
<button class="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#171F2C] text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs" type="submit">
<span class="material-symbols-outlined text-[16px]">send</span>
<span>Submit Interest Pitch</span>
</button>
</div>
</form>
</div>
</div>
</div>
<!-- Minimal Toast -->
<div class="fixed bottom-6 right-6 z-50 hidden bg-[#000000] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all transform translate-y-2 text-xs" id="successToast">
<span class="material-symbols-outlined text-[#059669] text-[20px]">check_circle</span>
<div>
<span class="font-semibold block">Interest Pitch Sent</span>
<span class="text-[#94A3B8]">The partner has been notified. Check Exchanges for replies.</span>
</div>
</div>
<!-- Interactive JavaScript -->
<script>
    function openInterestModal(code, company, title, offer) {
      document.getElementById('modalListingCode').textContent = '[' + code + ']';
      document.getElementById('modalTargetCompany').textContent = 'Target: ' + company;
      document.getElementById('modalListingTitle').textContent = title;
      document.getElementById('modalListingOffer').textContent = offer;
      document.getElementById('modalHeaderTitle').textContent = 'Express Interest — ' + code;
      
      const modal = document.getElementById('expressInterestModal');
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeInterestModal() {
      const modal = document.getElementById('expressInterestModal');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      closeInterestModal();
      
      const toast = document.getElementById('successToast');
      toast.classList.remove('hidden');
      toast.classList.remove('translate-y-2');
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.add('translate-y-2');
      }, 4000);

      document.getElementById('interestForm').reset();
    }

    // Bookmark toggle interactivity
    document.querySelectorAll('.bookmark-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const icon = this.querySelector('.material-symbols-outlined');
        if (icon.textContent === 'bookmark_border') {
          icon.textContent = 'bookmark';
          icon.classList.add('text-[#000000]');
        } else {
          icon.textContent = 'bookmark_border';
          icon.classList.remove('text-[#000000]');
        }
      });
    });

    // Category pills active state
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        document.querySelectorAll('.category-pill').forEach(p => {
          p.classList.remove('bg-[#000000]', 'text-white');
          p.classList.add('bg-white', 'text-[#64748B]', 'border', 'border-[#E2E8F0]');
        });
        this.classList.remove('bg-white', 'text-[#64748B]', 'border', 'border-[#E2E8F0]');
        this.classList.add('bg-[#000000]', 'text-white');
      });
    });

    // Simple Guide trigger
    const guidedTourBtn = document.getElementById('guidedTourBtn');
    if (guidedTourBtn) {
      guidedTourBtn.addEventListener('click', () => {
        alert("The Relay Bilateral Protocol:\n\n1. Browse high-intent listings.\n2. Submit a mutual value pitch (Stage 1).\n3. Reconcile terms inside the sandbox (Stage 2 & 3).\n4. Direct contacts unlock automatically once both agree (Stage 4).");
      });
    }
  </script>
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