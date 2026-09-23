When designing the page use the color scheme present in color_scheme.md and reuse the components from design-system(strict).

<!DOCTYPE html>

<html lang="en" style=""><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}
::selection {
  background-color: #cbd5e1;
  color: #0f172a;
}
.selection-mock {
  background-color: #cbd5e1;
  color: #0f172a;
  border-radius: 2px;
}
</style><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "outline-variant": "#c5c6cc", "on-tertiary-container": "#79889c", "secondary-container": "#d0e1fb", "on-primary-fixed-variant": "#3f4756", "on-secondary-fixed-variant": "#38485d", "on-error": "#ffffff", "on-secondary-container": "#54647a", "on-surface-variant": "#45474c", "surface-container-low": "#f2f4f6", "surface-container-highest": "#e0e3e5", "on-surface": "#191c1e", "primary-container": "#171f2c", "secondary-fixed-dim": "#b7c8e1", "on-secondary-fixed": "#0b1c30", "on-error-container": "#93000a", "tertiary-container": "#112030", "surface-container": "#eceef0", "surface-tint": "#575f6e", "surface-container-lowest": "#ffffff", "surface-dim": "#d8dadc", "inverse-surface": "#2d3133", "on-primary-container": "#7f8797", "surface": "#f7f9fb", "error-container": "#ffdad6", "tertiary-fixed-dim": "#b9c8de", "inverse-primary": "#bfc7d8", "error": "#ba1a1a", "on-primary-fixed": "#141c29", "tertiary": "#000712", "on-background": "#191c1e", "tertiary-fixed": "#d4e4fa", "surface-bright": "#f7f9fb", "outline": "#75777c", "on-tertiary-fixed-variant": "#39485a", "inverse-on-surface": "#eff1f3", "on-secondary": "#ffffff", "surface-container-high": "#e6e8ea", "on-tertiary": "#ffffff", "secondary": "#505f76", "primary-fixed-dim": "#bfc7d8", "surface-variant": "#e0e3e5", "background": "#f7f9fb", "secondary-fixed": "#d3e4fe", "primary": "#010611", "primary-fixed": "#dbe3f5", "on-tertiary-fixed": "#0d1c2d", "on-primary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "gutter-sm": "1rem", "space-xl": "2.5rem", "space-sm": "0.5rem", "space-lg": "1.5rem", "space-xs": "0.25rem", "margin-mobile": "1rem", "margin": "2rem", "space-md": "1rem", "gutter-lg": "2rem", "gutter": "1.5rem" }, "fontFamily": { "body-md": [ "Inter" ], "label-md": [ "Inter" ], "label-sm": [ "Inter" ], "display-lg": [ "Plus Jakarta Sans" ], "body-lg": [ "Inter" ], "headline-md": [ "Plus Jakarta Sans" ], "body-sm": [ "Inter" ], "headline-sm": [ "Plus Jakarta Sans" ], "headline-lg-mobile": [ "Plus Jakarta Sans" ], "title-md": [ "Inter" ], "headline-lg": [ "Plus Jakarta Sans" ] }, "fontSize": { "body-md": [ "14px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400" } ], "label-md": [ "13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" } ], "label-sm": [ "11px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "600" } ], "display-lg": [ "48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], "body-lg": [ "16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" } ], "headline-md": [ "24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "body-sm": [ "12px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "400" } ], "headline-sm": [ "18px", { "lineHeight": "26px", "letterSpacing": "-0.005em", "fontWeight": "600" } ], "headline-lg-mobile": [ "26px", { "lineHeight": "34px", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "title-md": [ "15px", { "lineHeight": "22px", "letterSpacing": "-0.005em", "fontWeight": "600" } ], "headline-lg": [ "32px", { "lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "600" } ] } } } };</script></head><body class="bg-surface font-body-md text-on-surface antialiased min-h-screen"><header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full max-w-[1600px] mx-auto px-gutter-sm lg:px-margin flex items-center justify-between gap-space-lg"><div class="flex items-center gap-space-xl flex-shrink-0"><div class="flex items-center gap-space-sm"><img alt="the-relay-logo.png" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xp_29wJL9I7V4cKLA5cPWdS0MLAsfhli1gTt9m4xKefiVXiwx5n5Q11mVDn8TMlQBO0YiXve39gtFspvJ-lK3DJcd3JKgcaEEGt9ZJMSFqHcW1YQ0ztJtAsoGTpznoNvvhQNzRz_P1HmjklPc1S_DTd9_zCjfRgUH23M4YHn3ly-y_v5jlJ0RRtjsyst4suCCviMSGZNNvyG9cFX6UjMumw7RbW6Xk37nG9IKZUDbQCt1l5GDeXZ66lGMg8mKTdGPJivhXAU2D"/><span class="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">The Relay</span></div><nav class="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-surface-container-lowest font-medium px-space-md py-1.5 rounded-lg"><a aria-current="page" class="transition-colors bg-primary-container text-surface-container-lowest font-medium px-space-md py-1.5 rounded-lg" data-path="opportunities" href="#">Opportunities</a><a class="px-space-md py-1.5 text-on-surface-variant font-label-md text-label-md transition-colors" data-path="proposals" href="#">Proposals</a><a class="px-space-md py-1.5 text-on-surface-variant font-label-md text-label-md transition-colors" data-path="insights" href="#">Insights</a><a class="px-space-md py-1.5 text-on-surface-variant font-label-md text-label-md transition-colors" data-path="directory" href="#">Directory</a></nav></div><div class="flex-1 max-w-md hidden md:block"><div class="relative flex items-center w-full"><span class="material-symbols-outlined absolute left-space-md text-outline text-[18px] pointer-events-none">search</span><input class="w-full h-10 pl-10 pr-space-md bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors" placeholder="Search opportunities, syndicates, mandates..." type="text"/></div></div><div class="flex items-center gap-space-md flex-shrink-0"><button aria-label="Notifications" class="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" type="button"><span class="material-symbols-outlined text-[20px]">notifications</span></button><div class="flex items-center gap-space-md pl-space-xs"><div class="hidden sm:flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-1 rounded-full shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex flex-col text-left"><span class="font-title-md text-label-md text-on-surface leading-tight">Apex Logistics AG</span><span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">Verified Member</span></div></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div></header><main class="w-full pt-16 bg-surface"><div class="flex flex-col w-full">
<!-- Top Command Context Bar -->
<section class="w-full max-w-[1600px] mx-auto px-gutter-sm lg:px-margin pt-space-md pb-space-lg">
<div class="flex flex-col gap-space-xs">
<!-- Breadcrumbs & Clearance Level -->
<div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<div class="flex items-center gap-space-xs">
<a class="text-secondary hover:text-on-surface transition-colors" href="#">Opportunities</a>
<span class="">/</span>
<span class="text-on-surface font-semibold">Post Commercial Opportunity</span>
</div>
</div>
<!-- Main Header Row -->
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mt-space-xs">
<div class="max-w-3xl">
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            Post Commercial Opportunity
          </h1>
<p class="font-body-md text-body-md text-secondary mt-1">
            Publish a blinded or direct commercial opportunity to verified institutional counterparties across the CDOE network.
          </p>
</div>
<!-- Action Group -->
<div class="flex items-center gap-space-sm flex-shrink-0">
<button class="h-10 px-space-md bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:bg-surface-container-low transition-colors flex items-center gap-1.5" id="saveDraftBtn" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary">bookmark</span>
<span class="">Save as Draft</span>
</button>
<button class="h-10 px-space-lg bg-primary-container text-surface-container-lowest font-label-md text-label-md rounded-lg shadow-md hover:bg-primary transition-colors flex items-center gap-2" id="publishBtn" type="button">
<span class="">Publish Opportunity</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>
<!-- Main Worksurface: 65% Structured Creation, 35% Live Deal Preview & Rail -->
<section class="w-full max-w-[1600px] mx-auto px-gutter-sm lg:px-margin pb-space-xl">
<div class="grid grid-cols-1 xl:grid-cols-12 gap-gutter-lg items-start">
<!-- LEFT COLUMN: Structured Form Creation Flow (65% -> col-span-7 or 8) -->
<div class="xl:col-span-7 flex flex-col gap-space-lg"><!-- Section: Primary Opportunity Definition & Masking -->
<div class="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/20 flex flex-col gap-space-md shadow-sm">
<div>
<h2 class="font-headline-sm text-headline-sm text-primary font-bold">Opportunity Overview</h2>
<p class="font-body-sm text-body-sm text-secondary mt-0.5">Define your headline and control company identity visibility for institutional counterparties.</p>
</div>
<!-- Title & Company Identity Escrow Row -->
<div class="flex flex-col gap-space-md">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<label class="font-label-md text-label-md text-on-surface font-semibold" for="headlineInput">Opportunity Title <span class="text-error">*</span></label>
<span class="font-label-sm text-label-sm text-secondary" id="headlineCounter">68 / 120 chars</span>
</div>
<input class="w-full h-11 px-space-md bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="headlineInput" maxlength="120" placeholder="e.g. Enterprise Cloud Distribution &amp; DACH Financial Sector Channel Access" type="text" value="Enterprise Cloud Distribution &amp; DACH Financial Sector Channel Access"/>
<span class="font-body-sm text-body-sm text-secondary">A clear, executive anchor summarizing the opportunity.</span>
</div>
<!-- Compact Secondary Metadata Row -->
<div class="grid grid-cols-1 gap-space-md pt-space-xs md:grid-cols-2">
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-medium" for="categorySelect">Exchange Category <span class="text-error">*</span></label>
<div class="relative">
<select class="w-full h-11 pl-space-md pr-10 bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md appearance-none border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="categorySelect">
<option value="Partnerships">Partnerships</option>
<option value="Referral">Referral</option>
<option value="Hiring">Hiring</option>
<option selected="" value="Distribution &amp; Channels">Distribution &amp; Channels</option>
<option value="Vendors &amp; Services">Vendors &amp; Services</option>
<option value="Co-Selling &amp; Joint Bids">Co-Selling &amp; Joint Bids</option>
<option value="Strategic Advice">Strategic Advice</option>
<option value="Investment">Investment</option>
<option value="Other">Other</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-secondary text-[20px]">expand_more</span>
</div>
</div>
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-medium" for="industrySelect">Industry Classification <span class="text-error">*</span></label>
<div class="relative">
<select class="w-full h-11 pl-space-md pr-10 bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md appearance-none border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="industrySelect">
<option value="SaaS &amp; Software">SaaS &amp; Software</option>
<option value="Marketing &amp; Digital Agency">Marketing &amp; Digital Agency</option>
<option selected="" value="Financial Services &amp; FinTech">Financial Services &amp; FinTech</option>
<option value="Healthcare &amp; HealthTech">Healthcare &amp; HealthTech</option>
<option value="Cloud Infrastructure &amp; DevOps">Cloud Infrastructure &amp; DevOps</option>
<option value="Supply Chain &amp; Logistics">Supply Chain &amp; Logistics</option>
<option value="Professional Services &amp; Consulting">Professional Services &amp; Consulting</option>
<option value="Other">Other</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-secondary text-[20px]">expand_more</span>
</div>
</div>
</div>
</div>
</div>
<!-- Section: What You Are Offering -->
<div class="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/20 flex flex-col gap-space-md shadow-sm">
<div>
<h2 class="font-headline-sm text-headline-sm text-primary font-bold">What You Are Offering</h2>
<p class="font-body-sm text-body-sm text-secondary mt-0.5">Articulate the commercial asset, reach, or pipeline capability you bring to the table.</p>
</div>
<div class="flex flex-col gap-1.5">
<!-- Header -->
<div class="flex items-center justify-between">
<label class="font-label-md text-label-md text-on-surface font-semibold" for="scopeEditor">Opportunity Description &amp; Narrative <span class="text-error">*</span></label>
<span class="font-body-sm text-[12px] text-secondary">Select any phrase to trigger highlight tool</span>
</div>
<!-- Rich Interactive Content Editable Container -->
<div class="relative group">
<div aria-multiline="true" class="w-full min-h-[96px] p-space-md bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md border border-outline-variant/30 focus-within:border-primary focus:outline-none focus:bg-surface-container-low transition-colors leading-relaxed select-text" contenteditable="true" id="scopeEditor" role="textbox">We maintain exclusive distributor relationships and existing master services frameworks with <mark class="relay-highlight bg-amber-100 text-amber-950 font-medium px-1.5 py-0.5 rounded cursor-pointer border border-amber-300/80 hover:bg-red-100 hover:text-red-800 hover:border-red-300 transition-all select-none" id="demoTargetHighlight" title="Click to unhighlight">4 of the top 7 universal private banking groups</mark> across Frankfurt, Zurich, and Vienna. We are opening our cleared sales pipeline for an enterprise-grade cyber telemetry or cloud compliance engine seeking accelerated German-speaking institutional deployment without traditional procurement latency.</div>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-medium" for="counterpartyInput">Ideal Counterparty Profile</label>
<input class="w-full h-11 px-space-md bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="counterpartyInput" placeholder="e.g. Certified SOC-2 enterprise vendors" type="text" value="Certified SOC-2 Type II enterprise software vendors with tier-1 banking clients"/>
</div>
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-medium" for="timelineSelect">Fulfillment Timeline</label>
<div class="relative">
<select class="w-full h-11 pl-space-md pr-10 bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md appearance-none border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="timelineSelect">
<option value="Immediate (within 14 days)">Immediate (within 14 days)</option>
<option selected="" value="Standard Q1/Q2 Deployment">Standard Q1/Q2 Deployment</option>
<option value="Flexible / Rolling Horizon">Flexible / Rolling Horizon</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-secondary text-[20px]">expand_more</span>
</div>
</div>
</div>
</div>
<!-- Section: What You Want in Return -->
<div class="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/20 flex flex-col gap-space-md shadow-sm">
<div>
<h2 class="font-headline-sm text-headline-sm text-primary font-bold">What You Want in Return</h2>
<p class="font-body-sm text-body-sm text-secondary mt-0.5">Specify your desired reciprocal compensation, engagement format, and baseline financial floor.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-semibold" for="reciprocalTypeSelect">Value Type <span class="text-error">*</span></label>
<div class="relative">
<select class="w-full h-11 pl-space-md pr-10 bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md appearance-none border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="reciprocalTypeSelect">
<option selected="" value="Distribution &amp; Channel Access">Distribution &amp; Channel Access</option>
<option value="Revenue Share / Commission (%)">Revenue Share / Commission (%)</option>
<option value="Warm Executive Client Introductions">Warm Executive Client Introductions</option>
<option value="Co-Selling &amp; Joint Bids">Co-Selling &amp; Joint Bids</option>
<option value="Specialized Services &amp; Barter">Specialized Services &amp; Barter</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-secondary text-[20px]">expand_more</span>
</div>
</div>
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-semibold" for="deliverySelect">Delivery Method <span class="text-error">*</span></label>
<div class="relative">
<select class="w-full h-11 pl-space-md pr-10 bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md appearance-none border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="deliverySelect">
<option selected="" value="Direct Reseller / Partner">Direct Reseller / Partner</option>
<option value="Co-Selling Together">Co-Selling Together</option>
<option value="Warm Client Handoff">Warm Client Handoff</option>
<option value="Commission Agreement">Commission Agreement</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-secondary text-[20px]">expand_more</span>
</div>
</div>
</div>
<div class="flex flex-col gap-1.5 pt-space-xs">
<!-- Header without static highlight button -->
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<label class="font-label-md text-label-md text-on-surface font-semibold" for="termsEditor">Proposed Value &amp; Terms Commitment <span class="text-error">*</span></label>
<span class="font-label-sm text-label-sm text-secondary">Pre-agreed floor</span>
</div>
<span class="font-body-sm text-[12px] text-secondary">Select phrase to highlight covenant terms</span>
</div>
<!-- Rich Interactive Content Editable Container for Terms -->
<div class="relative group">
<div aria-multiline="true" class="w-full min-h-[64px] p-space-md bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md border border-outline-variant/30 focus-within:border-primary focus:outline-none focus:bg-surface-container-low transition-colors leading-relaxed select-text" contenteditable="true" id="termsEditor" role="textbox"><mark class="relay-highlight bg-amber-100 text-amber-950 font-medium px-1.5 py-0.5 rounded cursor-pointer border border-amber-300/80 hover:bg-red-100 hover:text-red-800 hover:border-red-300 transition-all select-none" title="Click to unhighlight">22% recurring gross revenue share</mark> on closed annual contracts; guarantee warm executive introductory briefing <mark class="relay-highlight bg-amber-100 text-amber-950 font-medium px-1.5 py-0.5 rounded cursor-pointer border border-amber-300/80 hover:bg-red-100 hover:text-red-800 hover:border-red-300 transition-all select-none" title="Click to unhighlight">within 14 days of clearance</mark>.</div>
</div>
</div>
</div>
<!-- Section: Dealroom & Clearances -->
<div class="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/20 flex flex-col gap-space-md shadow-sm">
<div>
<h2 class="font-headline-sm text-headline-sm text-primary font-bold">Governance &amp; Clearances</h2>
<p class="font-body-sm text-body-sm text-secondary mt-0.5">Governed under institutional mutual non-disclosure and deal room safeguards.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-medium" for="expirySelect">Expiration Horizon</label>
<div class="relative">
<select class="w-full h-11 pl-space-md pr-10 bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md appearance-none border border-outline-variant/20 focus:bg-surface-container-low focus:outline-none transition-colors" id="expirySelect">
<option selected="" value="30 Days (Standard Horizon)">30 Days (Standard Horizon)</option>
<option value="14 Days (Urgent Clearance)">14 Days (Urgent Clearance)</option>
<option value="60 Days (Extended Horizon)">60 Days (Extended Horizon)</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-secondary text-[20px]">expand_more</span>
</div>
</div>
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-on-surface font-medium">NDA Framework</label>
<div class="h-11 px-space-md bg-surface-container-low text-on-surface rounded-lg font-body-sm text-body-sm flex items-center justify-between border border-outline-variant/20">
<span class="truncate text-secondary">Relay Standard Bilateral NCND</span>
<span class="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
</div>
</div>
</div>
</div>
<!-- Bottom Submission Bar -->
<div class="flex items-center justify-between p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm">
<div class="flex items-center gap-space-sm text-secondary">
<span class="material-symbols-outlined text-[20px] text-primary">verified</span>
<span class="font-body-sm text-body-sm">Deal Desk reviews and clears all postings within 4 hours.</span>
</div>
<button class="h-11 px-space-xl bg-primary-container text-surface-container-lowest font-label-md text-label-md rounded-lg shadow-md hover:bg-primary transition-colors flex items-center gap-2" id="publishBtnBottom" type="button">
<span class="">Publish to CDOE Network</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div></div>
<!-- RIGHT COLUMN: Sticky Deal Preview & Network Guardrails (35% -> col-span-5) -->
<div class="xl:col-span-5 flex flex-col gap-space-lg sticky top-20"><!-- 1. Compact Live Card Preview -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-space-lg flex flex-col gap-space-md">
<div class="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Live Exchange Preview</span>
</div>
<span class="font-label-sm text-label-sm text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-[12px] text-amber-700">stars</span>
      Highlighted Terms Active
    </span>
</div>
<!-- Preview Card -->
<div class="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/20 flex flex-col gap-space-sm">
<div class="flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-xs">
<span class="bg-primary-container text-surface-container-lowest font-label-sm text-label-sm uppercase tracking-wider px-2 py-0.5 rounded" id="previewCategoryBadge">DISTRIBUTION</span>
<span class="bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider px-2 py-0.5 rounded">#OPP-NEW</span>
</div>
<div class="flex items-center gap-1 text-label-sm font-label-sm text-secondary bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/20" id="previewEscrowBadge">
<span class="material-symbols-outlined text-[14px]">lock</span>
<span class="" id="previewEscrowText">Identity Masked</span>
</div>
</div>
<div class="flex flex-col gap-1">
<h3 class="font-title-md text-title-md text-primary font-bold line-clamp-2 leading-snug" id="previewHeadline">Enterprise Cloud Distribution &amp; DACH Financial Sector Channel Access</h3>
<div class="font-body-sm text-body-sm text-secondary leading-relaxed line-clamp-3" id="previewScopeSnippet">We maintain exclusive distributor relationships and existing master services frameworks with <mark class="bg-amber-100 text-amber-950 font-semibold px-1 py-0.5 rounded border border-amber-200">4 of the top 7 universal private banking groups</mark> across Frankfurt, Zurich, and Vienna...</div>
</div>
<div class="grid gap-2 bg-surface-container-lowest rounded p-2 text-on-surface border border-outline-variant/20">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-secondary uppercase">Timeline</span>
<span class="font-label-md text-label-md font-semibold text-primary truncate" id="previewTimeline">Q1/Q2 Deployment</span>
</div>
</div>
<div class="bg-surface-container-lowest rounded p-space-sm flex flex-col gap-1 border border-outline-variant/20">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Reciprocal Ask</span>
<span class="font-label-sm text-label-sm text-primary font-bold">Masked Floor</span>
</div>
<div class="font-body-sm text-body-sm text-on-surface font-medium leading-relaxed" id="previewTermsText"><span class="text-secondary">Asking: Distribution &amp; Channel Access (Direct Reseller / Partner) • </span><mark class="bg-amber-100 text-amber-950 font-semibold px-1 py-0.5 rounded border border-amber-200">22% recurring gross revenue share</mark> on closed annual contracts; guarantee warm executive introductory briefing <mark class="bg-amber-100 text-amber-950 font-semibold px-1 py-0.5 rounded border border-amber-200">within 14 days of clearance</mark>.</div>
</div>
<div class="flex items-center justify-between pt-1">
<div class="flex items-center gap-space-xs">
<div class="w-6 h-6 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center font-label-sm font-bold">◆</div>
<span class="font-label-md text-label-md font-semibold text-primary leading-tight truncate" id="previewEntityTitle">Institutional Member #4812</span>
</div>
<span class="font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/20">Verified</span>
</div>
</div>
</div>
<!-- 2. Condensed Zero Contact Leakage Guarantee Card -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-[18px] text-primary">shield_with_heart</span>
<h3 class="font-title-md text-title-md text-primary font-bold">Zero Contact Leakage Guarantee</h3>
</div>
<p class="font-body-sm text-body-sm text-secondary leading-relaxed">All executive identities, company registrations, and commercial covenants remain blinded until bilateral mutual clearance.</p>
<div class="flex flex-col gap-2 pt-1 font-body-sm text-body-sm">
<div class="flex items-center gap-2 text-on-surface">
<span class="material-symbols-outlined text-[16px] text-primary">check</span>
<span class="">Deterministic cryptographic identity masking</span>
</div>
<div class="flex items-center gap-2 text-on-surface">
<span class="material-symbols-outlined text-[16px] text-primary">check</span>
<span class="">Unilateral dealroom disclosure veto power</span>
</div>
<div class="flex items-center gap-2 text-on-surface">
<span class="material-symbols-outlined text-[16px] text-primary">check</span>
<span class="">Auto-ratified institutional NCND covenants</span>
</div>
</div>
</div></div>
</div>
</section>
<!-- Inline Contextual Floating Popup Toolbar -->
<div class="fixed z-50 transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-2 pointer-events-auto" id="contextualToolbar" style="display: none;">
<div class="relative bg-[#0F172A] text-white rounded-full px-2.5 py-1.5 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.35),0_4px_6px_-2px_rgba(15,23,42,0.2)] border border-slate-700/60 flex items-center gap-1.5 backdrop-blur-md">
<!-- Highlight Action Button -->
<button class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold tracking-wide text-white hover:bg-slate-800 transition-colors focus:outline-none" id="popupActionBtn" type="button">
<span class="material-symbols-outlined text-[15px] text-amber-400" id="popupActionIcon">ink_highlighter</span>
<span id="popupActionLabel">Highlight Term</span>
</button>
<div class="w-px h-3.5 bg-slate-700/80" id="popupDivider"></div>
<!-- Badge / Status indicator -->
<span class="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-slate-800 text-slate-300 border border-slate-700/50 flex items-center gap-1" id="popupBadge">
<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
<span id="popupBadgeText">Key Covenant</span>
</span>
<!-- Subtle arrow tip pointing to anchor -->
<div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#0F172A]"></div>
</div>
</div>
<!-- Notification Toast Simulation Container -->
<div class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none" id="toastNotification">
<div class="bg-primary-container text-surface-container-lowest px-space-lg py-space-md rounded-xl shadow-xl flex items-center gap-space-md border border-outline-variant/20">
<span class="material-symbols-outlined text-[20px] text-primary-fixed">task_alt</span>
<div class="flex flex-col">
<span class="font-title-md text-title-md font-bold text-surface-container-lowest" id="toastTitle">Opportunity Published</span>
<span class="font-body-sm text-body-sm text-on-primary-container" id="toastDesc">Escrow ID #OPP-7492 queued for institutional syndication.</span>
</div>
</div>
</div>
</div>
<script>
  (function() {
    // Interactive Elements
    const headlineInput = document.getElementById('headlineInput');
    const headlineCounter = document.getElementById('headlineCounter');
    const categorySelect = document.getElementById('categorySelect');
    const timelineSelect = document.getElementById('timelineSelect');
    
    // Rich Editable Elements
    const scopeEditor = document.getElementById('scopeEditor');
    const termsEditor = document.getElementById('termsEditor');
    const demoTargetHighlight = document.getElementById('demoTargetHighlight');

    // Contextual Toolbar Elements
    const contextualToolbar = document.getElementById('contextualToolbar');
    const popupActionBtn = document.getElementById('popupActionBtn');
    const popupActionIcon = document.getElementById('popupActionIcon');
    const popupActionLabel = document.getElementById('popupActionLabel');
    const popupBadge = document.getElementById('popupBadge');
    const popupBadgeText = document.getElementById('popupBadgeText');

    const reciprocalTypeSelect = document.getElementById('reciprocalTypeSelect');
    const deliverySelect = document.getElementById('deliverySelect');

    // Live Preview Elements
    const previewHeadline = document.getElementById('previewHeadline');
    const previewScopeSnippet = document.getElementById('previewScopeSnippet');
    const previewCategoryBadge = document.getElementById('previewCategoryBadge');
    const previewTimeline = document.getElementById('previewTimeline');
    const previewTermsText = document.getElementById('previewTermsText');

    // Action Triggers
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const publishBtn = document.getElementById('publishBtn');
    const publishBtnBottom = document.getElementById('publishBtnBottom');
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastDesc = document.getElementById('toastDesc');

    // State Tracking
    let currentSelectionRange = null;
    let currentTargetContainer = null;
    let clickedExistingMark = null;

    // Helper: Clean & convert innerHTML with highlights for preview
    function cleanHtmlForPreview(html) {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      // Convert relay-highlight marks to preview mark style
      temp.querySelectorAll('mark').forEach(m => {
        m.className = 'bg-amber-100 text-amber-950 font-semibold px-1 py-0.5 rounded border border-amber-200';
        m.removeAttribute('title');
      });
      return temp.innerHTML;
    }

    // Update Scope Snippet in Live Preview
    function updateScopePreview() {
      if (!scopeEditor || !previewScopeSnippet) return;
      const html = cleanHtmlForPreview(scopeEditor.innerHTML);
      previewScopeSnippet.innerHTML = html || '<span class="text-secondary italic">Opportunity narrative will appear here...</span>';
    }

    // Update Terms in Live Preview
    function updateTermsPreview() {
      if (!termsEditor || !previewTermsText) return;
      const type = reciprocalTypeSelect ? reciprocalTypeSelect.value : 'Distribution & Channel Access';
      const delivery = deliverySelect ? deliverySelect.value : 'Direct Reseller / Partner';
      const termsHtml = cleanHtmlForPreview(termsEditor.innerHTML);
      previewTermsText.innerHTML = '<span class="text-secondary">Asking: ' + type + ' (' + delivery + ') • </span>' + (termsHtml || 'Baseline Terms');
    }

    // Unhighlight a given mark element
    function removeMarkElement(mark) {
      if (!mark || !mark.parentNode) return;
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
      updateScopePreview();
      updateTermsPreview();
    }

    // Position popup toolbar relative to a DOMRect
    function positionToolbarOverRect(rect, isUnhighlight) {
      if (!contextualToolbar || !rect || rect.width === 0) return;
      
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      
      const centerX = rect.left + (rect.width / 2);
      const topY = rect.top - 8;

      contextualToolbar.style.left = centerX + 'px';
      contextualToolbar.style.top = topY + 'px';
      contextualToolbar.style.display = 'block';

      if (isUnhighlight) {
        popupActionLabel.textContent = 'Unhighlight Term';
        popupActionIcon.textContent = 'ink_highlighter_move';
        popupActionIcon.className = 'material-symbols-outlined text-[15px] text-slate-400';
        popupBadgeText.textContent = 'Highlighted';
        popupBadge.className = 'px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-amber-950/60 text-amber-300 border border-amber-700/50 flex items-center gap-1';
      } else {
        popupActionLabel.textContent = 'Highlight Term';
        popupActionIcon.textContent = 'ink_highlighter';
        popupActionIcon.className = 'material-symbols-outlined text-[15px] text-amber-400';
        popupBadgeText.textContent = 'Key Covenant';
        popupBadge.className = 'px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-slate-800 text-slate-300 border border-slate-700/50 flex items-center gap-1';
      }
    }

    function hideToolbar() {
      if (contextualToolbar) {
        contextualToolbar.style.display = 'none';
      }
      clickedExistingMark = null;
    }

    // Apply Highlight to current text selection
    function applyHighlightToCurrentRange() {
      if (!currentSelectionRange || !currentTargetContainer) return false;

      const selectedText = currentSelectionRange.toString().trim();
      if (!selectedText) return false;

      const mark = document.createElement('mark');
      mark.className = 'relay-highlight bg-amber-100 text-amber-950 font-medium px-1.5 py-0.5 rounded cursor-pointer border border-amber-300/80 hover:bg-red-100 hover:text-red-800 hover:border-red-300 transition-all select-none';
      mark.title = 'Click to unhighlight';

      try {
        const contents = currentSelectionRange.extractContents();
        mark.appendChild(contents);
        currentSelectionRange.insertNode(mark);
        
        const sel = window.getSelection();
        if (sel) sel.removeAllRanges();

        hideToolbar();
        updateScopePreview();
        updateTermsPreview();
        showToast('Term Highlighted', 'Added key covenant highlight to Opportunity Board.');
        return true;
      } catch (e) {
        console.warn('Highlight failed', e);
        return false;
      }
    }

    // Selection listener across the document
    function checkSelection() {
      const selection = window.getSelection();
      if (!selection.rangeCount || selection.isCollapsed) {
        // If clicking existing mark, toolbar may still be visible for unhighlight
        if (!clickedExistingMark) {
          hideToolbar();
        }
        return;
      }

      const range = selection.getRangeAt(0);
      const inScope = scopeEditor && scopeEditor.contains(range.commonAncestorContainer);
      const inTerms = termsEditor && termsEditor.contains(range.commonAncestorContainer);

      if ((inScope || inTerms) && selection.toString().trim().length > 0) {
        currentTargetContainer = inScope ? scopeEditor : termsEditor;
        currentSelectionRange = range.cloneRange();
        clickedExistingMark = null;

        const rect = range.getBoundingClientRect();
        positionToolbarOverRect(rect, false);
      } else if (!clickedExistingMark) {
        hideToolbar();
      }
    }

    document.addEventListener('selectionchange', checkSelection);
    window.addEventListener('scroll', function() {
      // Reposition or dismiss on scroll
      if (contextualToolbar.style.display !== 'none' && clickedExistingMark) {
        positionToolbarOverRect(clickedExistingMark.getBoundingClientRect(), true);
      }
    }, true);

    // Setup direct click & hover interactions on editor marks
    function setupEditorMarkListeners(container) {
      if (!container) return;

      container.addEventListener('click', function(e) {
        const mark = e.target.closest('mark.relay-highlight');
        if (mark && container.contains(mark)) {
          e.preventDefault();
          e.stopPropagation();

          // Show contextual popup anchored to this mark offering unhighlight
          clickedExistingMark = mark;
          currentSelectionRange = null;
          currentTargetContainer = container;

          const rect = mark.getBoundingClientRect();
          positionToolbarOverRect(rect, true);
        }
      });
    }

    setupEditorMarkListeners(scopeEditor);
    setupEditorMarkListeners(termsEditor);

    // Popup action button click handler
    if (popupActionBtn) {
      popupActionBtn.addEventListener('mousedown', function(e) {
        e.preventDefault(); // maintain selection focus
      });
      popupActionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (clickedExistingMark) {
          removeMarkElement(clickedExistingMark);
          hideToolbar();
          showToast('Highlight Removed', 'Key covenant un-highlighted from Opportunity Board.');
        } else if (currentSelectionRange && currentTargetContainer) {
          applyHighlightToCurrentRange();
        }
      });
    }

    // Dismiss toolbar if clicking outside
    document.addEventListener('mousedown', function(e) {
      if (contextualToolbar && contextualToolbar.contains(e.target)) return;
      if (e.target.closest('mark.relay-highlight')) return;
      if (scopeEditor && scopeEditor.contains(e.target)) return;
      if (termsEditor && termsEditor.contains(e.target)) return;
      hideToolbar();
    });

    // On Load: display the realistic active floating popup directly above the anchor highlight
    setTimeout(function() {
      const initialAnchor = document.getElementById('demoTargetHighlight');
      if (initialAnchor) {
        clickedExistingMark = initialAnchor;
        currentTargetContainer = scopeEditor;
        const rect = initialAnchor.getBoundingClientRect();
        positionToolbarOverRect(rect, true);
      }
    }, 200);

    // Input listening on contenteditables
    if (scopeEditor) {
      scopeEditor.addEventListener('input', updateScopePreview);
    }
    if (termsEditor) {
      termsEditor.addEventListener('input', updateTermsPreview);
    }

    // Sync Headline
    if (headlineInput && previewHeadline && headlineCounter) {
      headlineInput.addEventListener('input', function(e) {
        const val = e.target.value.trim();
        const len = e.target.value.length;
        headlineCounter.textContent = len + ' / 120 chars';
        previewHeadline.textContent = val || 'Untitled Commercial Opportunity';
      });
    }

    // Sync Category
    if (categorySelect && previewCategoryBadge) {
      categorySelect.addEventListener('change', function(e) {
        const val = e.target.value;
        if (val.includes('Distribution')) {
          previewCategoryBadge.textContent = 'DISTRIBUTION';
        } else if (val.includes('Co-Selling')) {
          previewCategoryBadge.textContent = 'CO-SELLING';
        } else if (val.includes('Referral')) {
          previewCategoryBadge.textContent = 'REFERRAL';
        } else if (val.includes('Partnerships')) {
          previewCategoryBadge.textContent = 'PARTNERSHIP';
        } else {
          previewCategoryBadge.textContent = val.toUpperCase().split(' ')[0];
        }
      });
    }

    // Sync Timeline
    if (timelineSelect && previewTimeline) {
      timelineSelect.addEventListener('change', function(e) {
        previewTimeline.textContent = e.target.value.split(' ')[0] + ' Deployment';
      });
    }

    // Sync Reciprocal Selects
    if (reciprocalTypeSelect) reciprocalTypeSelect.addEventListener('change', updateTermsPreview);
    if (deliverySelect) deliverySelect.addEventListener('change', updateTermsPreview);

    // Toast Trigger Helper
    function showToast(title, desc) {
      if (!toast) return;
      if (toastTitle) toastTitle.textContent = title;
      if (toastDesc) toastDesc.textContent = desc;
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(function() {
        toast.classList.add('translate-y-20', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }, 3500);
    }

    if (saveDraftBtn) {
      saveDraftBtn.addEventListener('click', function() {
        showToast('Draft Saved', 'Your opportunity parameters and highlighted terms have been saved.');
      });
    }

    function handlePublish() {
      showToast('Opportunity Published', 'Bilateral Room #OPP-9104 dispatched to Deal Desk with highlighted terms intact.');
    }

    if (publishBtn) publishBtn.addEventListener('click', handlePublish);
    if (publishBtnBottom) publishBtnBottom.addEventListener('click', handlePublish);

    // Initial sync
    updateScopePreview();
    updateTermsPreview();
  })();
</script></main>
</body></html>

//POSSIBLE VALUES FOR "WHAT TYPE OF VALUE ARE YOU OFFERING" select.

1. Distribution & Sales
How it's delivered:

Direct Reseller / Partner
Co-Selling Together
Warm Client Handoff
Commission / Rev-Share
Advisory Support
2. Money / Rev-Share
How it's delivered:

% Revenue Share on Contract (First Invoice / ARR)
Fixed Referral Fee / Success Bounty
Recurring Co-Marketing Allocation
Escrowed Milestone Payout
3. Warm Introductions
How it's delivered:

C-Level / VP Executive Intro
Target Account Warm Handoff (Account-Based)
Investor / Syndicate Intro
Procurement / Department Head Intro
4. Client Referrals
How it's delivered:

1-to-1 Reciprocal Deal Swap
Unserviceable Misfit Lead Handoff
Regional / Geographical Account Pass-Through
Pooled Dealflow Pipeline Access
5. Services & Work
How it's delivered:

Specialist Team Bandwidth / Billable Hours
Technical Architecture & Systems Integration
Regulatory / Compliance / Legal Advisory
Design / Product Sprint Delivery
6. Technology & Tools
How it's delivered:

API / Integration White-Label Access
Enterprise SaaS Seat Licenses
Compute / Cloud GPU Cluster Allocation
Proprietary Dataset / Telemetry Access
7. Talent & Hiring
How it's delivered:

Executive Candidate Referral
Vetted Contractor / Agency Bench Sharing
Advisory Board Member Placement
Specialist Recruiter Warm Network
8. Advice & Expertise
How it's delivered:

Go-To-Market / Expansion Strategy
Technical Due Diligence & Architecture Review
Fundraising / Capital Structuring Guidance
Enterprise Security & SOC-2 / HIPAA Prep
9. Capital / Investment
How it's delivered:

Direct Strategic Equity Co-Investment
Special Purpose Vehicle (SPV) Allocation
Convertible Note / SAFE Allocation
Commercial Debt / Working Capital Facility
10. Other
How it's delivered:
