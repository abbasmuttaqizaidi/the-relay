When designing the page use the color scheme present in color_scheme.md and reuse the components from design-system(strict).

// waiting-for-replay
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><title>The Relay</title><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={"darkMode":"class","theme":{"extend":{"colors":{"surface-bright":"#f7f9fb","surface-variant":"#e0e3e5","inverse-on-surface":"#eff1f3","on-surface-variant":"#45474c","surface":"#f7f9fb","primary-fixed":"#dbe3f5","tertiary":"#000712","secondary-container":"#d0e1fb","secondary-fixed-dim":"#b7c8e1","on-tertiary-fixed-variant":"#39485a","error-container":"#ffdad6","surface-tint":"#575f6e","on-secondary-fixed-variant":"#38485d","secondary-fixed":"#d3e4fe","surface-container-low":"#f2f4f6","on-surface":"#191c1e","surface-container-highest":"#e0e3e5","inverse-primary":"#bfc7d8","secondary":"#505f76","outline":"#75777c","on-primary-fixed-variant":"#3f4756","on-tertiary-fixed":"#0d1c2d","outline-variant":"#c5c6cc","on-secondary":"#ffffff","background":"#f7f9fb","surface-container-high":"#e6e8ea","primary":"#010611","on-error-container":"#93000a","primary-container":"#171f2c","error":"#ba1a1a","on-tertiary":"#ffffff","on-primary-fixed":"#141c29","on-background":"#191c1e","on-secondary-fixed":"#0b1c30","primary-fixed-dim":"#bfc7d8","on-secondary-container":"#54647a","on-error":"#ffffff","surface-container":"#eceef0","tertiary-container":"#112030","inverse-surface":"#2d3133","tertiary-fixed":"#d4e4fa","surface-dim":"#d8dadc","tertiary-fixed-dim":"#b9c8de","on-primary":"#ffffff","on-tertiary-container":"#79889c","surface-container-lowest":"#ffffff","on-primary-container":"#7f8797"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"gutter":"1.5rem","margin":"2rem","space-sm":"0.5rem","space-xs":"0.25rem","margin-mobile":"1rem","gutter-sm":"1rem","space-xl":"2.5rem","gutter-lg":"2rem","space-lg":"1.5rem","space-md":"1rem"},"fontFamily":{"body-sm":["Inter"],"headline-md":["Plus Jakarta Sans"],"headline-lg-mobile":["Plus Jakarta Sans"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"body-md":["Inter"],"label-md":["Inter"],"headline-lg":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"label-sm":["Inter"],"body-lg":["Inter"]},"fontSize":{"body-sm":["12px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"400"}],"headline-md":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","letterSpacing":"-0.01em","fontWeight":"600"}],"display-lg":["48px",{"lineHeight":"56px","letterSpacing":"-0.02em","fontWeight":"700"}],"title-md":["15px",{"lineHeight":"22px","letterSpacing":"-0.005em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"400"}],"label-md":["13px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"500"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"-0.015em","fontWeight":"600"}],"headline-sm":["18px",{"lineHeight":"26px","letterSpacing":"-0.005em","fontWeight":"600"}],"label-sm":["11px",{"lineHeight":"16px","letterSpacing":"0.04em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"></header><main class="w-full max-w-[1600px] mx-auto px-margin pt-16 min-h-[calc(100vh-140px)] bg-background"><div class="flex flex-col w-full">
<!-- Deal Header Bar -->
<div class="w-full bg-surface-container-lowest rounded-xl shadow-sm mb-space-md">

<!-- Stepper Pipeline Ribbon -->

</div>
<!-- Workspace Container: Messaging Channel + Side Panel Drawer Layout -->
<div class="w-full bg-surface-container-low border border-surface-variant/60 rounded-xl p-space-md mb-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm"><div class="flex items-start md:items-center gap-space-sm"><div class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5 md:mt-0 text-primary"><span class="material-symbols-outlined text-[20px]">hourglass_top</span></div><div class="flex flex-col gap-0.5"><div class="flex items-center gap-2"><span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Awaiting Counterparty Turn</span><span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span><span class="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-secondary font-medium">41h SLA Remaining</span></div><p class="font-body-sm text-body-sm text-secondary">XYZ Digital holds the active decision turn. Your Round 04 proposal (6.0% Rev Share) is pending their review. You may edit your proposal at any time before they respond.</p></div></div><div class="flex items-center gap-space-sm shrink-0"><button class="px-space-md py-1.5 rounded bg-surface-container-lowest border border-surface-variant/60 font-label-md text-label-md text-primary hover:bg-surface-container transition-colors flex items-center gap-1.5 font-medium"><span class="material-symbols-outlined text-[16px]">edit</span>Edit Proposal</button><button class="px-space-md py-1.5 rounded text-secondary hover:text-error hover:bg-error-container/20 font-label-md text-label-md transition-colors flex items-center gap-1 font-medium" onclick="handleDecline()"><span class="material-symbols-outlined text-[16px]">cancel</span>Withdraw</button></div></div><div class="relative w-full grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start pb-space-xl">
<!-- Central Feed (8 cols on large screens, expands naturally) -->
<div class="w-full xl:col-span-8 flex flex-col gap-space-md transition-all duration-300" id="feed-container">
<!-- Session Timestamp Marker -->
<div class="flex items-center justify-center my-space-xs">
<span class="px-space-md py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm uppercase tracking-wider text-secondary">
          Negotiation History • October 24
        </span>
</div>
<!-- Message 1: Initial Mandate (XYZ Digital - Oct 24, 09:15 UTC) -->

<!-- Message 2: Counter 1 (ABC Technologies - Oct 24, 10:20 UTC - Declined) -->
<div class="w-full max-w-3xl mr-auto flex flex-col items-start"><div class="flex items-center gap-space-xs mb-1"><span class="font-label-sm text-label-sm font-semibold text-primary">XYZ Digital (Receiver)</span><span class="text-surface-variant text-[10px]">•</span><span class="font-body-sm text-body-sm text-secondary">Oct 24, 09:15 UTC</span></div><div class="w-full bg-surface-container-low rounded-xl p-space-md shadow-sm border border-surface-variant/40"><div class="flex items-center justify-between gap-space-sm mb-space-xs"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Round 01 • Originating Mandate</span><span class="px-2 py-0.5 rounded bg-surface-variant font-label-sm text-label-sm text-on-surface-variant uppercase">Superseded</span></div><div class="flex items-baseline gap-space-sm"><span class="font-headline-sm text-headline-sm text-secondary line-through opacity-70">10.0% Revenue Share</span><span class="font-body-sm text-body-sm text-secondary">Mandate Requested: EMEA VAR Placement</span></div><div class="mt-space-sm pt-space-xs flex items-center justify-between text-secondary border-t border-surface-variant/40"><div class="flex items-center gap-space-sm font-body-sm text-body-sm"><span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">VAR Reseller</span><span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">Net 30 Days</span></div><button class="font-label-md text-label-md text-primary hover:underline inline-flex items-center gap-0.5" onclick="openDrawer(1)">View Mandate <span class="material-symbols-outlined text-[14px]">arrow_forward</span></button></div></div></div>
<!-- Message 3: Adjusted Proposal (ABC Technologies - Oct 24, 11:08 UTC) -->
<div class="w-full max-w-3xl mr-auto flex flex-col items-start">
<div class="flex items-center gap-space-xs mb-1">
<span class="font-label-sm text-label-sm font-semibold text-primary">ABC Technologies</span>
<span class="text-surface-variant text-[10px]">•</span>
<span class="font-body-sm text-body-sm text-secondary">Oct 24, 11:08 UTC</span>
</div>
<div class="w-full bg-surface-container-low rounded-xl p-space-md shadow-sm transition-all hover:bg-surface-container">
<div class="flex items-center justify-between gap-space-sm mb-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Round 03 • Adjusted Proposal</span>
<span class="px-2 py-0.5 rounded bg-surface-variant font-label-sm text-label-sm text-on-surface-variant uppercase">
              Superseded
            </span>
</div>
<div class="flex items-baseline gap-space-sm">
<span class="font-headline-sm text-headline-sm text-secondary line-through opacity-70">
              5.0% Revenue Share
            </span>
<span class="font-body-sm text-body-sm text-secondary">Standard Co-sell Support Included</span>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between text-secondary">
<div class="flex items-center gap-space-sm font-body-sm text-body-sm">
<span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">VAR Model</span>
<span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">Net 45 Days</span>
</div>
<button class="font-label-md text-label-md text-primary hover:underline inline-flex items-center gap-0.5" onclick="openDrawer(3)">
              View Details <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Session Timestamp Marker: Active Turn -->
<div class="flex items-center justify-center my-space-xs">
<span class="px-space-md py-0.5 rounded-full bg-primary font-label-sm text-label-sm uppercase tracking-wider text-on-primary">Awaiting Counterparty Decision • Dispatched by You</span>
</div>
<!-- Message 4: CURRENT ACTIVE TURN (ABC Technologies - Today, 11:32 UTC) -->
<div class="w-full max-w-3xl mr-auto flex flex-col items-start">
<div class="flex items-center gap-space-xs mb-1">
<span class="font-label-sm text-label-sm font-semibold text-primary">ABC Technologies</span>
<span class="text-surface-variant text-[10px]">•</span>
<span class="font-body-sm text-body-sm text-secondary">Today, 11:32 AM UTC</span>
<span class="w-1.5 h-1.5 rounded-full bg-primary ml-1"></span>
</div>
<!-- High-Impact Elevated Card -->
<div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-md transition-shadow"><div class="flex flex-wrap items-center justify-between gap-space-sm mb-space-sm"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span><span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Round 04 Specification • In XYZ Digital's Court</span></div><span class="px-2.5 py-0.5 rounded bg-surface-container font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold flex items-center gap-1.5"><span class="material-symbols-outlined text-[14px]">schedule</span>Pending Counterparty Review</span></div><div class="my-space-sm"><h2 class="font-headline-lg text-headline-lg text-primary tracking-tight">ABC Technologies Proposed 6% Revenue Share</h2><p class="font-body-md text-body-md text-secondary mt-1 max-w-2xl leading-relaxed">Terms upgraded to match VAR Tier-1 commitment with primary co-marketing guarantee, quarterly joint governance, and Net 30 settlement.</p></div><div class="flex flex-wrap items-center gap-space-sm py-space-sm border-y border-surface-variant/40 my-space-sm"><div class="px-space-md py-1.5 rounded bg-surface-container font-label-md text-label-md text-primary font-medium flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-secondary">domain_verification</span>Distribution &amp; Sales</div><div class="px-space-md py-1.5 rounded bg-surface-container font-label-md text-label-md text-primary font-medium flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-secondary">handshake</span>Authorized VAR Reseller</div><div class="px-space-md py-1.5 rounded bg-surface-container font-label-md text-label-md text-primary font-medium flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-secondary">calendar_today</span>Net 30 Days</div><button class="px-space-md py-1.5 rounded bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-primary transition-colors flex items-center gap-1 font-medium ml-auto" onclick="openDrawer(4)">Specification Details <span class="material-symbols-outlined text-[16px]">visibility</span></button></div><div class="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm border border-surface-variant/40"><div class="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs border-b border-surface-variant/40"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-[18px] text-primary">hourglass_empty</span><span class="font-title-md text-title-md text-primary font-semibold">Waiting for XYZ Digital's Response</span></div><span class="px-2.5 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>Active SLA: 41h remaining</span></div><p class="font-body-sm text-body-sm text-secondary leading-relaxed">XYZ Digital currently holds the active decision turn. While their bilateral review window is open, you can revise the commercial terms or withdraw the proposition.</p><div class="pt-space-xs flex flex-wrap items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm"><button class="px-space-lg py-2 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-1.5 font-semibold shadow-sm"><span class="material-symbols-outlined text-[16px]">edit</span>Edit Active Proposal</button><button class="px-space-md py-2 bg-surface-container-lowest border border-surface-variant text-secondary hover:text-error hover:border-error rounded font-label-md text-label-md transition-colors flex items-center gap-1.5 font-medium" onclick="handleDecline()"><span class="material-symbols-outlined text-[16px]">cancel</span>Withdraw Offer</button></div><button class="font-label-md text-label-md text-primary font-semibold hover:underline inline-flex items-center gap-1" onclick="openDrawer(4)">Open Full Specification <span class="material-symbols-outlined text-[16px]">open_in_new</span></button></div></div></div>
</div>
<!-- Quick Message / Propose Input Bar for Active Deal -->
<div class="w-full max-w-3xl ml-auto flex flex-col items-end"><div class="w-full bg-surface-container-lowest border border-surface-variant/60 rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm"><div class="flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-variant/40 pb-space-xs"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span><span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-secondary">lock_clock</span>Bilateral Turn Locked</span></div><span class="px-2.5 py-0.5 rounded bg-surface-container font-label-sm text-label-sm font-medium text-secondary flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">hourglass_empty</span>XYZ Digital Turn</span></div><div class="flex flex-col gap-1"><p class="font-title-md text-title-md text-primary font-semibold">Waiting for XYZ Digital's response</p><p class="font-body-sm text-body-sm text-secondary leading-relaxed">You cannot submit a new offer until XYZ Digital responds (Accepts, Declines, or Counters). You may update the current active proposal terms or withdraw the offer before their decision.</p></div><div class="pt-space-xs flex flex-wrap items-center justify-between gap-space-sm border-t border-surface-variant/40"><div class="flex items-center gap-space-sm"><button class="px-space-lg py-2.5 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-2 font-semibold shadow-sm"><span class="material-symbols-outlined text-[16px]">edit</span>Edit Active Proposal</button><button class="px-space-md py-2.5 bg-surface-container-lowest border border-surface-variant/60 text-secondary hover:text-error hover:border-error rounded font-label-md text-label-md transition-colors flex items-center gap-1.5 font-medium" onclick="handleDecline()"><span class="material-symbols-outlined text-[16px]">cancel</span>Withdraw Offer</button></div><div class="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm"><span class="material-symbols-outlined text-[15px]">verified_user</span><span class="">Bilateral SLA Active: 41h</span></div></div></div></div>
</div>
<!-- Side Sheet / Drawer Panel (4 cols on desktop, responsive drawer) -->
<aside class="w-full xl:col-span-4 bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md sticky top-20 transition-all duration-300" id="detail-drawer"><!-- Header -->
<div class="flex items-start justify-between pb-space-sm border-b border-surface-variant/40">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[11px] font-semibold text-secondary uppercase tracking-wider" id="drawer-badge">Round 04 (Pending Counterparty Review)</span>
<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary tracking-tight font-semibold mt-1" id="drawer-title">
      Round 04 Proposal Specification
    </h3>
<span class="font-body-sm text-[12px] text-secondary" id="drawer-timestamp">Recorded Today, 11:32 AM UTC</span>
</div>
<button class="w-8 h-8 rounded-full border border-surface-variant/60 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container-low transition-colors shrink-0" onclick="closeDrawer()" title="Close Drawer">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<!-- Counterparty Lockup -->
<div class="flex items-center justify-between p-space-md bg-surface-container-low rounded-lg border border-surface-variant/40"><div class="flex items-center gap-space-sm"><div class="w-9 h-9 rounded bg-primary text-on-primary flex items-center justify-center font-headline-sm text-[12px] font-bold shrink-0">ABC</div><div class="flex flex-col min-w-0"><div class="flex items-center gap-1.5"><span class="font-title-md text-title-md text-primary font-semibold truncate">ABC Technologies</span><span class="material-symbols-outlined text-[15px] text-primary" style="font-variation-settings: 'FILL' 1;">verified</span></div><span class="font-body-sm text-[12px] text-secondary truncate">Zurich, Switzerland • Enterprise Integrator</span></div></div><div class="flex flex-col items-end gap-0.5 shrink-0"><span class="px-2 py-0.5 rounded bg-surface-container-lowest font-label-sm text-[11px] font-semibold text-primary uppercase border border-surface-variant/60 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span>LEI Verified</span><span class="text-[10px] text-secondary font-mono tracking-wider">#529900X...</span></div></div><div class="p-space-md bg-surface-container-low rounded-lg border-l-2 border-primary flex flex-col gap-space-xs"><div class="flex items-center justify-between gap-space-xs"><div class="flex items-center gap-1.5 font-label-sm text-[11px] uppercase tracking-wider text-primary font-bold"><span class="material-symbols-outlined text-[15px]">hourglass_empty</span><span class="">Turn Status: Awaiting Counterparty</span></div><span class="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[10px] font-semibold text-secondary uppercase">41h SLA</span></div><p class="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">XYZ Digital currently holds the active turn to Accept, Decline, or Counter. As the sender, you may modify terms via <strong>Edit Active Proposal</strong> or retract using <strong>Withdraw Offer</strong> at any point prior to their reply.</p></div>
<!-- Commercial Terms Breakdown -->
<div class="flex flex-col gap-space-xs">
<span class="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">Commercial Terms Breakdown</span>
<div class="bg-surface-container-low rounded-lg divide-y divide-surface-variant/40">
<div class="px-space-md py-2.5 flex items-center justify-between">
<span class="font-body-sm text-body-sm text-secondary">Value Dimension</span>
<span class="font-title-md text-title-md text-primary font-semibold" id="drawer-dimension">Distribution &amp; Sales</span>
</div>
<div class="px-space-md py-2.5 flex items-center justify-between">
<span class="font-body-sm text-body-sm text-secondary">Delivery Archetype</span>
<span class="font-title-md text-title-md text-primary font-medium" id="drawer-archetype">Authorized VAR Reseller</span>
</div>
<div class="px-space-md py-2.5 flex items-center justify-between">
<span class="font-body-sm text-body-sm text-secondary">Settlement Schedule</span>
<span class="font-title-md text-title-md text-primary font-medium" id="drawer-settlement">Net 30 Days</span>
</div>
<div class="px-space-md py-2.5 flex items-center justify-between">
<span class="font-body-sm text-body-sm text-secondary">Target Share / Rate</span>
<span class="font-title-md text-title-md text-primary font-bold" id="drawer-rate">6.0% Revenue Share</span>
</div>
</div>
</div>
<!-- Commercial Narrative Excerpt -->
<div class="flex flex-col gap-1">
<span class="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">Commercial Narrative</span>
<div class="p-space-md bg-surface-container-low rounded-lg border-l-2 border-primary">
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="drawer-narrative">
      6.0% Revenue Share on first invoice and subsequent recurring annual retainers for all referred enterprise clients, executed via Authorized VAR Reseller model with dedicated regional co-selling support.
    </p>
</div>
</div>
<!-- Offer Trajectory -->
<div class="flex flex-col gap-space-xs">
<span class="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">Offer Trajectory</span>
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-2 font-body-sm text-body-sm">
<div class="flex items-center justify-between text-secondary">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-secondary opacity-40"></span>
<span class="">R1 (Your Mandate)</span>
</div>
<span class="line-through opacity-60 font-mono text-[12px]">10.0%</span>
</div>
<div class="flex items-center justify-between text-error">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>
<span class="">R2 (ABC Tech Counter)</span>
</div>
<span class="line-through font-mono text-[12px]">4.0% (Declined)</span>
</div>
<div class="flex items-center justify-between text-secondary">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-secondary opacity-40"></span>
<span class="">R3 (ABC Tech Adjust)</span>
</div>
<span class="line-through opacity-60 font-mono text-[12px]">5.0%</span>
</div>
<div class="flex items-center justify-between font-semibold text-primary pt-1 border-t border-surface-variant/40">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<span class="">R4 (Current Proposal)</span>
</div>
<span class="font-bold">6.0% Active</span>
</div>
</div>
</div>
<!-- Discreet Integrity Note -->
<div class="flex items-center gap-2 text-secondary text-[12px]">
<span class="material-symbols-outlined text-[16px] text-primary">shield</span>
<span class="">Zero Contact Leakage Guarantee: counterparty details masked until Stage 04.</span>
</div>
<!-- Footer Actions -->
<div class="flex flex-col gap-2 pt-space-xs mt-auto" id="drawer-actions"><button class="w-full h-11 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2 font-semibold"><span class="material-symbols-outlined text-[16px]">edit</span><span class="">Edit Active Proposal</span></button><button class="w-full h-10 bg-surface-container-lowest border border-surface-variant text-error rounded font-label-md text-label-md hover:bg-error-container/20 transition-colors flex items-center justify-center gap-1.5 font-medium" onclick="handleDecline()"><span class="material-symbols-outlined text-[16px]">cancel</span><span class="">Withdraw Offer</span></button><button class="w-full py-1 text-center font-label-sm text-secondary hover:text-primary transition-colors" onclick="closeDrawer()">Close Specification Sheet</button></div></aside>
</div>
</div>
<!-- Inline Interactive Script for Drawer & Feed Switching -->
<script>
  const roundData = {
    1: {
      badge: "Round 01 (Superseded)",
      title: "Round 01 Originating Mandate",
      timestamp: "Oct 24, 09:15 AM UTC",
      dimension: "Distribution & Sales",
      archetype: "Authorized VAR Reseller",
      settlement: "Net 30 Days",
      rate: "10.0% Revenue Share",
      narrative: "Original mandate submitted by XYZ Digital seeking 10.0% recurring revenue share on all introduced enterprise accounts across EMEA.",
      isCurrent: false
    },
    2: {
      badge: "Round 02 (Declined)",
      title: "Round 02 Counter-Offer",
      timestamp: "Oct 24, 10:20 AM UTC",
      dimension: "Referral Placement",
      archetype: "Lead Referral Fee",
      settlement: "Net 60 Days",
      rate: "4.0% Revenue Share",
      narrative: "Declined by XYZ Digital: 4.0% share fell below mandatory 5.0% hurdle rate for multi-tier technical VAR commitment.",
      isCurrent: false
    },
    3: {
      badge: "Round 03 (Superseded)",
      title: "Round 03 Adjusted Proposal",
      timestamp: "Oct 24, 11:08 AM UTC",
      dimension: "Distribution & Sales",
      archetype: "Co-Selling Partner",
      settlement: "Net 45 Days",
      rate: "5.0% Revenue Share",
      narrative: "ABC Technologies offered standard co-selling partner agreement at 5.0% flat margin with Net 45 disbursement.",
      isCurrent: false
    },
    4: {
      badge: "Round 04 (Current Active)",
      title: "Round 04 Proposal Specification",
      timestamp: "Today, 11:32 AM UTC",
      dimension: "Distribution & Sales",
      archetype: "Authorized VAR Reseller",
      settlement: "Net 30 Days",
      rate: "6.0% Revenue Share",
      narrative: "6% Revenue Share on first invoice and subsequent recurring annual retainers for all referred enterprise clients, executed via Authorized VAR Reseller model with dedicated regional co-selling support.",
      isCurrent: true
    }
  };

  function openDrawer(roundNum) {
    const data = roundData[roundNum] || roundData[4];
    
    document.getElementById("drawer-badge").innerText = data.badge;
    document.getElementById("drawer-title").innerText = data.title;
    document.getElementById("drawer-timestamp").innerText = "Recorded " + data.timestamp;
    document.getElementById("drawer-dimension").innerText = data.dimension;
    document.getElementById("drawer-archetype").innerText = data.archetype;
    document.getElementById("drawer-settlement").innerText = data.settlement;
    document.getElementById("drawer-rate").innerText = data.rate;
    document.getElementById("drawer-narrative").innerText = data.narrative;

    const drawer = document.getElementById("detail-drawer");
    drawer.classList.remove("opacity-50", "pointer-events-none");
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function closeDrawer() {
    const drawer = document.getElementById("detail-drawer");
    drawer.classList.add("opacity-50");
  }

  function handleAccept() {
    if (confirm("Proceed to Stage 03 (Term Agreement) on 6.0% Revenue Share specification with ABC Technologies?")) {
      alert("Agreement recorded. Handshake protocols and signature locks initialized.");
    }
  }

  function handleDecline() {
    if (confirm("Are you sure you want to decline this 6.0% counter-offer? This will notify the counterparty.")) {
      alert("Counter-offer marked as declined. You may submit an alternative proposal.");
    }
  }

  function focusQuickInput() {
    const input = document.getElementById("quick-counter-input");
    input.focus();
    input.scrollIntoView({ behavior: "smooth" });
  }

  function dispatchProposal() {
    const input = document.getElementById("quick-counter-input");
    if (!input.value.trim()) {
      alert("Please specify proposal terms before dispatching.");
      return;
    }
    alert("Bilateral Dispatch transmitted: '" + input.value + "'");
    input.value = "";
  }
</script></main><footer class="w-full bg-surface-container-lowest"></footer>


</body></html>

 // Default
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><title>The Relay</title><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={"darkMode":"class","theme":{"extend":{"colors":{"surface-bright":"#f7f9fb","surface-variant":"#e0e3e5","inverse-on-surface":"#eff1f3","on-surface-variant":"#45474c","surface":"#f7f9fb","primary-fixed":"#dbe3f5","tertiary":"#000712","secondary-container":"#d0e1fb","secondary-fixed-dim":"#b7c8e1","on-tertiary-fixed-variant":"#39485a","error-container":"#ffdad6","surface-tint":"#575f6e","on-secondary-fixed-variant":"#38485d","secondary-fixed":"#d3e4fe","surface-container-low":"#f2f4f6","on-surface":"#191c1e","surface-container-highest":"#e0e3e5","inverse-primary":"#bfc7d8","secondary":"#505f76","outline":"#75777c","on-primary-fixed-variant":"#3f4756","on-tertiary-fixed":"#0d1c2d","outline-variant":"#c5c6cc","on-secondary":"#ffffff","background":"#f7f9fb","surface-container-high":"#e6e8ea","primary":"#010611","on-error-container":"#93000a","primary-container":"#171f2c","error":"#ba1a1a","on-tertiary":"#ffffff","on-primary-fixed":"#141c29","on-background":"#191c1e","on-secondary-fixed":"#0b1c30","primary-fixed-dim":"#bfc7d8","on-secondary-container":"#54647a","on-error":"#ffffff","surface-container":"#eceef0","tertiary-container":"#112030","inverse-surface":"#2d3133","tertiary-fixed":"#d4e4fa","surface-dim":"#d8dadc","tertiary-fixed-dim":"#b9c8de","on-primary":"#ffffff","on-tertiary-container":"#79889c","surface-container-lowest":"#ffffff","on-primary-container":"#7f8797"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"gutter":"1.5rem","margin":"2rem","space-sm":"0.5rem","space-xs":"0.25rem","margin-mobile":"1rem","gutter-sm":"1rem","space-xl":"2.5rem","gutter-lg":"2rem","space-lg":"1.5rem","space-md":"1rem"},"fontFamily":{"body-sm":["Inter"],"headline-md":["Plus Jakarta Sans"],"headline-lg-mobile":["Plus Jakarta Sans"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"body-md":["Inter"],"label-md":["Inter"],"headline-lg":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"label-sm":["Inter"],"body-lg":["Inter"]},"fontSize":{"body-sm":["12px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"400"}],"headline-md":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","letterSpacing":"-0.01em","fontWeight":"600"}],"display-lg":["48px",{"lineHeight":"56px","letterSpacing":"-0.02em","fontWeight":"700"}],"title-md":["15px",{"lineHeight":"22px","letterSpacing":"-0.005em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"400"}],"label-md":["13px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"500"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"-0.015em","fontWeight":"600"}],"headline-sm":["18px",{"lineHeight":"26px","letterSpacing":"-0.005em","fontWeight":"600"}],"label-sm":["11px",{"lineHeight":"16px","letterSpacing":"0.04em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 max-w-[1600px] mx-auto px-margin flex items-center justify-between gap-space-lg"><div class="flex items-center gap-space-xl"><a class="flex items-center gap-space-sm text-primary no-underline" data-path="opportunities" href="#"><span class="w-7 h-7 bg-primary flex items-center justify-center rounded"><span class="material-symbols-outlined text-on-primary text-[18px]">sync_alt</span></span><span class="font-headline-sm text-headline-sm uppercase tracking-wider text-primary">The Relay</span></a><nav class="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary text-on-primary rounded"><a class="px-space-md py-space-xs font-label-md text-label-md rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" data-path="opportunities" href="#">Opportunities</a><a aria-current="page" class="px-space-md py-space-xs font-label-md transition-colors bg-primary text-on-primary rounded" data-path="my-relay" href="#">My Relay</a><a class="px-space-md py-space-xs font-label-md text-label-md rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" data-path="proposals" href="#">Proposals</a><a class="px-space-md py-space-xs font-label-md text-label-md rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" data-path="directory" href="#">Directory</a><a class="px-space-md py-space-xs font-label-md text-label-md rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" data-path="insights" href="#">Insights</a></nav></div><div class="flex items-center gap-space-md"><div class="relative hidden md:flex items-center"><span class="material-symbols-outlined absolute left-space-sm text-secondary text-[18px]">search</span><input class="w-64 lg:w-80 h-[38px] pl-9 pr-14 bg-surface-container-lowest font-body-sm text-body-sm text-primary placeholder:text-outline focus:outline-none rounded" placeholder="Search bilateral deals, counterparties..." type="text"><div class="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-surface-container font-label-sm text-label-sm text-secondary rounded">⌘K</div></div><div class="flex items-center gap-space-sm pl-space-sm"><div class="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-1.5 rounded"><span class="font-label-sm text-label-sm text-primary">XYZ Digital (XD)</span><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span><span class="font-label-sm text-label-sm uppercase text-secondary">Verified LP</span></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div></header><main class="w-full max-w-[1600px] mx-auto px-margin pt-16 min-h-[calc(100vh-140px)] bg-background"><div class="flex flex-col w-full">
<!-- Deal Header Bar -->
<div class="w-full bg-surface-container-lowest rounded-xl shadow-sm mb-space-md">
<div class="p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<!-- Left Metadata & Breadcrumb -->
<div class="flex flex-col gap-space-xs">
<a class="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-primary transition-colors mb-1" href="#">
<span class="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to My Opportunities
        </a>
<div class="flex flex-wrap items-center gap-space-sm">
<h1 class="font-headline-md text-headline-md text-primary tracking-tight">CRM Implementation Required</h1>
<span class="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm font-mono text-secondary tracking-wider">#RL-1024</span>
</div>
<div class="flex flex-wrap items-center gap-space-md mt-1">
<div class="flex items-center gap-1.5 font-body-sm text-body-sm text-secondary">
<span class="font-semibold text-primary">ABC Technologies</span>
<span class="text-outline-variant">vs</span>
<span class="font-semibold text-primary">XYZ Digital (You)</span>
</div>
<span class="text-surface-variant font-body-sm">•</span>
<div class="flex items-center gap-1.5 font-body-sm text-body-sm text-secondary">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span class="">Action SLA: <strong class="text-primary font-medium">41h remaining</strong></span>
</div>
</div>
</div>
<!-- Right Deal Stats & Context Badges -->
<div class="flex items-center gap-space-sm">
<div class="px-space-md py-space-xs rounded bg-surface-container-low flex flex-col">
<span class="font-label-sm text-label-sm text-secondary uppercase">Counterparty Status</span>
<span class="font-title-md text-title-md text-primary flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-primary" style="font-variation-settings: 'FILL' 1;">verified</span>
            Institutional Tier-1
          </span>
</div>
<div class="px-space-md py-space-xs rounded bg-surface-container-low flex flex-col">
<span class="font-label-sm text-label-sm text-secondary uppercase">Integrity Safeguard</span>
<span class="font-title-md text-title-md text-primary flex items-center gap-1">
<span class="material-symbols-outlined text-[15px] text-primary">shield</span>
            Zero Leakage Active
          </span>
</div>
</div>
</div>
<!-- Stepper Pipeline Ribbon -->
<div class="bg-surface-container-low px-space-lg py-space-md rounded-b-xl flex flex-wrap md:flex-nowrap items-center justify-between gap-space-md">
<!-- Step 1 -->
<div class="flex items-center gap-space-xs text-primary min-w-0">
<span class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[14px]">check</span>
</span>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm uppercase tracking-wide text-secondary">Stage 01</span>
<span class="font-title-md text-title-md text-primary truncate">Acknowledged</span>
</div>
</div>
<div class="hidden md:block flex-1 h-[2px] bg-primary mx-space-xs"></div>
<!-- Step 2 (Active) -->
<div class="flex items-center gap-space-xs text-primary min-w-0">
<span class="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold shrink-0 shadow-sm">
          02
        </span>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm uppercase tracking-wide text-primary font-bold">Stage 02 • Active</span>
<span class="font-title-md text-title-md text-primary truncate font-bold">Bilateral Negotiation</span>
</div>
</div>
<div class="hidden md:block flex-1 h-[2px] bg-surface-variant mx-space-xs"></div>
<!-- Step 3 -->
<div class="flex items-center gap-space-xs text-secondary min-w-0 opacity-60">
<span class="w-6 h-6 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm flex items-center justify-center shrink-0">
          03
        </span>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm uppercase tracking-wide">Stage 03</span>
<span class="font-title-md text-title-md truncate">Term Agreement</span>
</div>
</div>
<div class="hidden md:block flex-1 h-[2px] bg-surface-variant mx-space-xs"></div>
<!-- Step 4 -->
<div class="flex items-center gap-space-xs text-secondary min-w-0 opacity-60">
<span class="w-6 h-6 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm flex items-center justify-center shrink-0">
          04
        </span>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm uppercase tracking-wide">Stage 04</span>
<span class="font-title-md text-title-md truncate">Handshake Protocol</span>
</div>
</div>
</div>
</div>
<!-- Workspace Container: Messaging Channel + Side Panel Drawer Layout -->
<div class="relative w-full grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start pb-space-xl">
<!-- Central Feed (8 cols on large screens, expands naturally) -->
<div class="w-full xl:col-span-8 flex flex-col gap-space-md transition-all duration-300" id="feed-container">
<!-- Session Timestamp Marker -->
<div class="flex items-center justify-center my-space-xs">
<span class="px-space-md py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm uppercase tracking-wider text-secondary">
          Negotiation History • October 24
        </span>
</div>
<!-- Message 1: Initial Mandate (XYZ Digital - Oct 24, 09:15 UTC) -->
<div class="w-full max-w-3xl ml-auto flex flex-col items-end">
<div class="flex items-center gap-space-xs mb-1">
<span class="font-label-sm text-label-sm font-semibold text-primary">XYZ Digital (You)</span>
<span class="text-surface-variant text-[10px]">•</span>
<span class="font-body-sm text-body-sm text-secondary">Oct 24, 09:15 UTC</span>
</div>
<div class="w-full bg-surface-container-low rounded-xl p-space-md shadow-sm transition-all hover:bg-surface-container">
<div class="flex items-center justify-between gap-space-sm mb-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Round 01 • Originating Mandate</span>
<span class="px-2 py-0.5 rounded bg-surface-variant font-label-sm text-label-sm text-on-surface-variant uppercase">
              Superseded
            </span>
</div>
<div class="flex items-baseline gap-space-sm">
<span class="font-headline-sm text-headline-sm text-secondary line-through opacity-70">
              10.0% Revenue Share
            </span>
<span class="font-body-sm text-body-sm text-secondary">Gross First-Year</span>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between text-secondary">
<div class="flex items-center gap-space-sm font-body-sm text-body-sm">
<span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">Authorized VAR</span>
<span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">Net 30 Days</span>
</div>
<button class="font-label-md text-label-md text-primary hover:underline inline-flex items-center gap-0.5" onclick="openDrawer(1)">
              View Terms &amp; Audit Sheet <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Message 2: Counter 1 (ABC Technologies - Oct 24, 10:20 UTC - Declined) -->
<div class="w-full max-w-3xl mr-auto flex flex-col items-start">
<div class="flex items-center gap-space-xs mb-1">
<span class="font-label-sm text-label-sm font-semibold text-primary">ABC Technologies</span>
<span class="text-surface-variant text-[10px]">•</span>
<span class="font-body-sm text-body-sm text-secondary">Oct 24, 10:20 UTC</span>
</div>
<div class="w-full bg-error-container/20 rounded-xl p-space-md shadow-sm transition-all hover:bg-error-container/30">
<div class="flex items-center justify-between gap-space-sm mb-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Round 02 • Counter-Offer</span>
<span class="px-2 py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm text-error uppercase font-medium">
              Declined By You
            </span>
</div>
<div class="flex flex-wrap items-baseline gap-space-sm">
<span class="font-headline-sm text-headline-sm text-secondary line-through opacity-70">
              4.0% Revenue Share
            </span>
<span class="font-body-sm text-body-sm text-error font-medium">Below internal 5.0% hurdle rate requirement</span>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between text-secondary">
<div class="flex items-center gap-space-sm font-body-sm text-body-sm">
<span class="px-1.5 py-0.5 rounded bg-surface-container-lowest font-label-sm text-label-sm">Referral Only</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-lowest font-label-sm text-label-sm">Net 60 Days</span>
</div>
<button class="font-label-md text-label-md text-primary hover:underline inline-flex items-center gap-0.5" onclick="openDrawer(2)">
              View Reason &amp; Terms <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Message 3: Adjusted Proposal (ABC Technologies - Oct 24, 11:08 UTC) -->
<div class="w-full max-w-3xl mr-auto flex flex-col items-start">
<div class="flex items-center gap-space-xs mb-1">
<span class="font-label-sm text-label-sm font-semibold text-primary">ABC Technologies</span>
<span class="text-surface-variant text-[10px]">•</span>
<span class="font-body-sm text-body-sm text-secondary">Oct 24, 11:08 UTC</span>
</div>
<div class="w-full bg-surface-container-low rounded-xl p-space-md shadow-sm transition-all hover:bg-surface-container">
<div class="flex items-center justify-between gap-space-sm mb-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Round 03 • Adjusted Proposal</span>
<span class="px-2 py-0.5 rounded bg-surface-variant font-label-sm text-label-sm text-on-surface-variant uppercase">
              Superseded
            </span>
</div>
<div class="flex items-baseline gap-space-sm">
<span class="font-headline-sm text-headline-sm text-secondary line-through opacity-70">
              5.0% Revenue Share
            </span>
<span class="font-body-sm text-body-sm text-secondary">Standard Co-sell Support Included</span>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between text-secondary">
<div class="flex items-center gap-space-sm font-body-sm text-body-sm">
<span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">VAR Model</span>
<span class="px-1.5 py-0.5 rounded bg-surface font-label-sm text-label-sm">Net 45 Days</span>
</div>
<button class="font-label-md text-label-md text-primary hover:underline inline-flex items-center gap-0.5" onclick="openDrawer(3)">
              View Details <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Session Timestamp Marker: Active Turn -->
<div class="flex items-center justify-center my-space-xs">
<span class="px-space-md py-0.5 rounded-full bg-primary font-label-sm text-label-sm uppercase tracking-wider text-on-primary">
          Current Actionable Turn • Today
        </span>
</div>
<!-- Message 4: CURRENT ACTIVE TURN (ABC Technologies - Today, 11:32 UTC) -->
<div class="w-full max-w-3xl mr-auto flex flex-col items-start">
<div class="flex items-center gap-space-xs mb-1">
<span class="font-label-sm text-label-sm font-semibold text-primary">ABC Technologies</span>
<span class="text-surface-variant text-[10px]">•</span>
<span class="font-body-sm text-body-sm text-secondary">Today, 11:32 AM UTC</span>
<span class="w-1.5 h-1.5 rounded-full bg-primary ml-1"></span>
</div>
<!-- High-Impact Elevated Card -->
<div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-md transition-shadow">
<div class="flex flex-wrap items-center justify-between gap-space-sm mb-space-sm">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Round 04 Specification • In Your Court
              </span>
</div>
<span class="px-2.5 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider">
              Awaiting Your Decision
            </span>
</div>
<div class="my-space-sm">
<h2 class="font-headline-lg text-headline-lg text-primary tracking-tight">
              ABC Technologies Proposed 6% Revenue Share
            </h2>
<p class="font-body-md text-body-md text-secondary mt-1 max-w-2xl">
              Terms upgraded to match VAR Tier-1 commitment with primary co-marketing guarantee, quarterly joint governance, and Net 30 settlement.
            </p>
</div>
<!-- Minimal Summary Badges -->
<div class="flex flex-wrap items-center gap-space-sm py-space-sm">
<div class="px-space-md py-1.5 rounded bg-surface-container font-label-md text-label-md text-primary font-medium flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">domain_verification</span>
              Distribution &amp; Sales
            </div>
<div class="px-space-md py-1.5 rounded bg-surface-container font-label-md text-label-md text-primary font-medium flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">handshake</span>
              Authorized VAR Reseller
            </div>
<div class="px-space-md py-1.5 rounded bg-surface-container font-label-md text-label-md text-primary font-medium flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">schedule</span>
              Net 30 Days
            </div>
<button class="px-space-md py-1.5 rounded bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-primary transition-colors flex items-center gap-1" onclick="openDrawer(4)">
              Full Breakdown <span class="material-symbols-outlined text-[16px]">visibility</span>
</button>
</div>
<!-- Embedded Direct Action Bar -->
<div class="mt-space-md pt-space-md flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low p-space-md rounded-lg">
<div class="flex flex-wrap items-center gap-space-sm">
<button class="px-space-lg py-space-sm bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-1.5" onclick="handleAccept()">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
                Accept 6% Counter-Offer
              </button>
<button class="px-space-md py-space-sm bg-surface-container-lowest text-primary rounded font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-1.5" onclick="openDrawer(4)">
<span class="material-symbols-outlined text-[16px]">edit_note</span>
                Propose Counter-Offer
              </button>
</div>
<div class="flex items-center gap-space-md">
<button class="font-label-md text-label-md text-secondary hover:text-error transition-colors" onclick="handleDecline()">
                Decline Offer
              </button>
<button class="font-label-md text-label-md text-primary font-semibold hover:underline inline-flex items-center gap-0.5" onclick="openDrawer(4)">
                Open Specification Drawer <span class="material-symbols-outlined text-[16px]">open_in_new</span>
</button>
</div>
</div>
</div>
</div>
<!-- Quick Message / Propose Input Bar for Active Deal -->
<div class="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm mt-space-md">
<div class="flex items-center justify-between gap-space-sm mb-space-xs">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Direct Bilateral Dispatch</span>
<span class="font-label-sm text-label-sm text-secondary flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">lock</span>
            Encrypted Bilateral Session
          </span>
</div>
<div class="flex flex-col sm:flex-row gap-space-sm items-center">
<input class="w-full h-11 px-space-md bg-surface-container-low font-body-md text-body-md text-primary rounded placeholder:text-outline focus:outline-none" id="quick-counter-input" placeholder="Type counter-terms (e.g. 'Proposing 7.5% with Net 15 days settlement')..." type="text">
<button class="w-full sm:w-auto px-space-lg h-11 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary-container transition-colors whitespace-nowrap flex items-center justify-center gap-1.5" onclick="dispatchProposal()">
<span class="">Send Proposal</span>
<span class="material-symbols-outlined text-[16px]">send</span>
</button>
</div>
</div>
</div>
<!-- Side Sheet / Drawer Panel (4 cols on desktop, responsive drawer) -->
<aside class="w-full xl:col-span-4 bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md sticky top-20 transition-all duration-300" id="detail-drawer"><!-- Header -->
<div class="flex items-start justify-between pb-space-sm border-b border-surface-variant/40">
  <div class="flex flex-col gap-0.5">
    <div class="flex items-center gap-2">
      <span class="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[11px] font-semibold text-secondary uppercase tracking-wider" id="drawer-badge">Round 04 (Current Active)</span>
      <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
    </div>
    <h3 class="font-headline-sm text-headline-sm text-primary tracking-tight font-semibold mt-1" id="drawer-title">
      Round 04 Proposal Specification
    </h3>
    <span class="font-body-sm text-[12px] text-secondary" id="drawer-timestamp">Recorded Today, 11:32 AM UTC</span>
  </div>
  <button class="w-8 h-8 rounded-full border border-surface-variant/60 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container-low transition-colors shrink-0" onclick="closeDrawer()" title="Close Drawer">
    <span class="material-symbols-outlined text-[18px]">close</span>
  </button>
</div>

<!-- Counterparty Lockup -->
<div class="flex items-center justify-between p-space-md bg-surface-container-low rounded-lg">
  <div class="flex items-center gap-space-sm">
    <div class="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-headline-sm text-[12px] font-bold shrink-0">
      ABC
    </div>
    <div class="flex flex-col min-w-0">
      <div class="flex items-center gap-1.5">
        <span class="font-title-md text-title-md text-primary font-semibold truncate">ABC Technologies</span>
        <span class="material-symbols-outlined text-[15px] text-primary" style="font-variation-settings: 'FILL' 1;">verified</span>
      </div>
      <span class="font-body-sm text-[12px] text-secondary truncate">Zurich, Switzerland • Enterprise Integrator</span>
    </div>
  </div>
  <span class="px-2 py-0.5 rounded bg-surface-container-lowest font-label-sm text-[11px] font-semibold text-secondary uppercase border border-surface-variant/40 shrink-0">Verified</span>
</div>

<!-- Commercial Terms Breakdown -->
<div class="flex flex-col gap-space-xs">
  <span class="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">Commercial Terms Breakdown</span>
  <div class="bg-surface-container-low rounded-lg divide-y divide-surface-variant/40">
    <div class="px-space-md py-2.5 flex items-center justify-between">
      <span class="font-body-sm text-body-sm text-secondary">Value Dimension</span>
      <span class="font-title-md text-title-md text-primary font-semibold" id="drawer-dimension">Distribution &amp; Sales</span>
    </div>
    <div class="px-space-md py-2.5 flex items-center justify-between">
      <span class="font-body-sm text-body-sm text-secondary">Delivery Archetype</span>
      <span class="font-title-md text-title-md text-primary font-medium" id="drawer-archetype">Authorized VAR Reseller</span>
    </div>
    <div class="px-space-md py-2.5 flex items-center justify-between">
      <span class="font-body-sm text-body-sm text-secondary">Settlement Schedule</span>
      <span class="font-title-md text-title-md text-primary font-medium" id="drawer-settlement">Net 30 Days</span>
    </div>
    <div class="px-space-md py-2.5 flex items-center justify-between">
      <span class="font-body-sm text-body-sm text-secondary">Target Share / Rate</span>
      <span class="font-title-md text-title-md text-primary font-bold" id="drawer-rate">6.0% Revenue Share</span>
    </div>
  </div>
</div>

<!-- Commercial Narrative Excerpt -->
<div class="flex flex-col gap-1">
  <span class="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">Commercial Narrative</span>
  <div class="p-space-md bg-surface-container-low rounded-lg border-l-2 border-primary">
    <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed" id="drawer-narrative">
      6.0% Revenue Share on first invoice and subsequent recurring annual retainers for all referred enterprise clients, executed via Authorized VAR Reseller model with dedicated regional co-selling support.
    </p>
  </div>
</div>

<!-- Offer Trajectory -->
<div class="flex flex-col gap-space-xs">
  <span class="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">Offer Trajectory</span>
  <div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-2 font-body-sm text-body-sm">
    <div class="flex items-center justify-between text-secondary">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-secondary opacity-40"></span>
        <span class="">R1 (Your Mandate)</span>
      </div>
      <span class="line-through opacity-60 font-mono text-[12px]">10.0%</span>
    </div>
    <div class="flex items-center justify-between text-error">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-error"></span>
        <span class="">R2 (ABC Tech Counter)</span>
      </div>
      <span class="line-through font-mono text-[12px]">4.0% (Declined)</span>
    </div>
    <div class="flex items-center justify-between text-secondary">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-secondary opacity-40"></span>
        <span class="">R3 (ABC Tech Adjust)</span>
      </div>
      <span class="line-through opacity-60 font-mono text-[12px]">5.0%</span>
    </div>
    <div class="flex items-center justify-between font-semibold text-primary pt-1 border-t border-surface-variant/40">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-primary"></span>
        <span class="">R4 (Current Proposal)</span>
      </div>
      <span class="font-bold">6.0% Active</span>
    </div>
  </div>
</div>

<!-- Discreet Integrity Note -->
<div class="flex items-center gap-2 text-secondary text-[12px]">
  <span class="material-symbols-outlined text-[16px] text-primary">shield</span>
  <span class="">Zero Contact Leakage Guarantee: counterparty details masked until Stage 04.</span>
</div>

<!-- Footer Actions -->
<div class="flex flex-col gap-2 pt-space-xs mt-auto" id="drawer-actions">
  <button class="w-full h-11 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2 font-semibold" onclick="handleAccept()">
    <span class="material-symbols-outlined text-[16px]">check_circle</span>
    <span class="">Accept Terms</span>
  </button>
  <button class="w-full h-10 bg-surface-container-lowest border border-surface-variant text-primary rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5 font-medium" onclick="focusQuickInput()">
    <span class="material-symbols-outlined text-[16px]">edit_note</span>
    <span class="">Propose Counter</span>
  </button>
  <button class="w-full py-1 text-center font-label-sm text-secondary hover:text-primary transition-colors" onclick="closeDrawer()">
    Close Specification Sheet
  </button>
</div></aside>
</div>
</div>
<!-- Inline Interactive Script for Drawer & Feed Switching -->
<script>
  const roundData = {
    1: {
      badge: "Round 01 (Superseded)",
      title: "Round 01 Originating Mandate",
      timestamp: "Oct 24, 09:15 AM UTC",
      dimension: "Distribution & Sales",
      archetype: "Authorized VAR Reseller",
      settlement: "Net 30 Days",
      rate: "10.0% Revenue Share",
      narrative: "Original mandate submitted by XYZ Digital seeking 10.0% recurring revenue share on all introduced enterprise accounts across EMEA.",
      isCurrent: false
    },
    2: {
      badge: "Round 02 (Declined)",
      title: "Round 02 Counter-Offer",
      timestamp: "Oct 24, 10:20 AM UTC",
      dimension: "Referral Placement",
      archetype: "Lead Referral Fee",
      settlement: "Net 60 Days",
      rate: "4.0% Revenue Share",
      narrative: "Declined by XYZ Digital: 4.0% share fell below mandatory 5.0% hurdle rate for multi-tier technical VAR commitment.",
      isCurrent: false
    },
    3: {
      badge: "Round 03 (Superseded)",
      title: "Round 03 Adjusted Proposal",
      timestamp: "Oct 24, 11:08 AM UTC",
      dimension: "Distribution & Sales",
      archetype: "Co-Selling Partner",
      settlement: "Net 45 Days",
      rate: "5.0% Revenue Share",
      narrative: "ABC Technologies offered standard co-selling partner agreement at 5.0% flat margin with Net 45 disbursement.",
      isCurrent: false
    },
    4: {
      badge: "Round 04 (Current Active)",
      title: "Round 04 Proposal Specification",
      timestamp: "Today, 11:32 AM UTC",
      dimension: "Distribution & Sales",
      archetype: "Authorized VAR Reseller",
      settlement: "Net 30 Days",
      rate: "6.0% Revenue Share",
      narrative: "6% Revenue Share on first invoice and subsequent recurring annual retainers for all referred enterprise clients, executed via Authorized VAR Reseller model with dedicated regional co-selling support.",
      isCurrent: true
    }
  };

  function openDrawer(roundNum) {
    const data = roundData[roundNum] || roundData[4];
    
    document.getElementById("drawer-badge").innerText = data.badge;
    document.getElementById("drawer-title").innerText = data.title;
    document.getElementById("drawer-timestamp").innerText = "Recorded " + data.timestamp;
    document.getElementById("drawer-dimension").innerText = data.dimension;
    document.getElementById("drawer-archetype").innerText = data.archetype;
    document.getElementById("drawer-settlement").innerText = data.settlement;
    document.getElementById("drawer-rate").innerText = data.rate;
    document.getElementById("drawer-narrative").innerText = data.narrative;

    const drawer = document.getElementById("detail-drawer");
    drawer.classList.remove("opacity-50", "pointer-events-none");
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function closeDrawer() {
    const drawer = document.getElementById("detail-drawer");
    drawer.classList.add("opacity-50");
  }

  function handleAccept() {
    if (confirm("Proceed to Stage 03 (Term Agreement) on 6.0% Revenue Share specification with ABC Technologies?")) {
      alert("Agreement recorded. Handshake protocols and signature locks initialized.");
    }
  }

  function handleDecline() {
    if (confirm("Are you sure you want to decline this 6.0% counter-offer? This will notify the counterparty.")) {
      alert("Counter-offer marked as declined. You may submit an alternative proposal.");
    }
  }

  function focusQuickInput() {
    const input = document.getElementById("quick-counter-input");
    input.focus();
    input.scrollIntoView({ behavior: "smooth" });
  }

  function dispatchProposal() {
    const input = document.getElementById("quick-counter-input");
    if (!input.value.trim()) {
      alert("Please specify proposal terms before dispatching.");
      return;
    }
    alert("Bilateral Dispatch transmitted: '" + input.value + "'");
    input.value = "";
  }
</script></main><footer class="w-full bg-surface-container-lowest"><div class="max-w-[1600px] mx-auto px-margin py-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md"><div class="flex items-center gap-space-md"><span class="font-label-sm text-label-sm uppercase tracking-wider text-primary">The Relay Network</span><span class="font-body-sm text-body-sm text-on-surface-variant">© 2025 Bilateral Exchange Systems AG. All rights reserved.</span></div><nav class="flex items-center gap-space-lg" data-active-classes="text-primary font-semibold"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="governance" href="#">Governance</a><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="security-and-audits" href="#">Security &amp; Audits</a><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="protocol-disclosures" href="#">Protocol Disclosures</a></nav></div></footer>

</body></html>
 // Simplified
 <!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-surface":"#0f172a","primary-fixed":"#dbe3f5","surface-dim":"#f1f5f9","secondary-fixed-dim":"#b7c8e1","on-error-container":"#991b1b","tertiary-container":"#112030","on-secondary":"#ffffff","on-primary":"#ffffff","outline-variant":"#e2e8f0","error-container":"#fef2f2","surface-variant":"#f8fafc","surface-container-highest":"#e2e8f0","surface-container-lowest":"#ffffff","error":"#dc2626","surface":"#f8fafc","surface-tint":"#475569","secondary":"#64748b","on-surface-variant":"#475569","primary":"#0f172a","surface-bright":"#ffffff","outline":"#94a3b8","surface-container-high":"#edf2f7","on-primary-container":"#334155","surface-container":"#f8fafc","surface-container-low":"#f8fafc"},borderRadius:{DEFAULT:"0.25rem",lg:"0.5rem",xl:"0.75rem",full:"9999px"},fontFamily:{headline:["Plus Jakarta Sans", "sans-serif"],body:["Inter", "sans-serif"]}}}};</script></head><body class="bg-[#F8FAFC] font-body text-slate-900 antialiased selection:bg-slate-900 selection:text-white"><!-- Navigation Header --><header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200"><div class="h-16 w-full max-w-7xl mx-auto px-6 flex items-center justify-between gap-6"><div class="flex items-center gap-8"><a class="font-headline text-lg font-bold text-slate-900 tracking-tight" data-path="opportunities" href="#">THE RELAY</a><div class="h-4 w-px bg-slate-200 hidden md:block"></div><nav class="hidden md:flex items-center gap-6"><a class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors" data-path="opportunities" href="#">Opportunities</a><a aria-current="page" class="text-sm font-semibold text-slate-900 border-b-2 border-slate-900 py-5 -mb-px" data-path="my-relay" href="#">My Relay</a><a class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors" data-path="proposals" href="#">Proposals</a><a class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors" data-path="directory" href="#">Directory</a><a class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors" data-path="insights" href="#">Insights</a></nav></div><div class="flex items-center gap-4"><div class="hidden lg:flex items-center border border-slate-200 rounded-lg bg-slate-50/60 px-3 h-9 w-60 text-slate-400 focus-within:border-slate-400 transition-all"><span class="material-symbols-outlined text-[18px] mr-2">search</span><span class="text-xs select-none">Search deals, counterparty...</span></div><div class="flex items-center gap-3"><span class="text-xs text-slate-500 hidden sm:inline-block">XYZ Digital</span><div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium text-xs">XD</div></div></div></div></header><main class="w-full pt-16 min-h-screen bg-[#F8FAFC] pb-16"><div class="w-full max-w-7xl mx-auto px-6 pt-8"><div class="flex flex-col gap-8"><!-- Header & Deal Meta --><div class="flex flex-col gap-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div class="flex flex-col gap-1.5"><a class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit mb-1" data-path="my-opportunities" href="#"><span class="material-symbols-outlined text-[16px]">arrow_back</span>Back to My Opportunities</a><div class="flex flex-wrap items-center gap-3"><h1 class="text-2xl font-bold font-headline text-slate-900 tracking-tight">CRM Implementation Required</h1><span class="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">#RL-1024</span></div><p class="text-sm text-slate-500 flex items-center gap-2">Counterparties:<span class="font-medium text-slate-800">ABC Technologies</span><span class="text-slate-400">vs</span><span class="font-medium text-slate-800">XYZ Digital (You)</span></p></div><div class="flex items-center gap-3 self-start sm:self-center"><div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 shadow-sm"><span class="w-2 h-2 rounded-full bg-emerald-500"></span><span class="text-slate-500">Action SLA:</span><span class="font-mono font-semibold text-slate-900">41h remaining</span></div></div></div><!-- 4-Step Executive Progress Bar --><div class="w-full bg-white rounded-xl border border-slate-200 p-4 shadow-sm"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative"><div class="flex items-center gap-3"><div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shrink-0"><span class="material-symbols-outlined text-[16px]">check</span></div><div class="flex flex-col"><span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Stage 01</span><span class="text-sm font-semibold text-slate-900">Acknowledged</span></div></div><div class="flex items-center gap-3"><div class="w-7 h-7 rounded-full border-2 border-slate-900 text-slate-900 font-bold flex items-center justify-center text-xs shrink-0 bg-slate-50">2</div><div class="flex flex-col"><span class="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-slate-900"></span>Active</span><span class="text-sm font-bold text-slate-900">Negotiation</span></div></div><div class="flex items-center gap-3 opacity-40"><div class="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-medium shrink-0">3</div><div class="flex flex-col"><span class="text-[11px] font-medium uppercase tracking-wider text-slate-500">Stage 03</span><span class="text-sm font-medium text-slate-700">Agreement</span></div></div><div class="flex items-center gap-3 opacity-40"><div class="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-medium shrink-0">4</div><div class="flex flex-col"><span class="text-[11px] font-medium uppercase tracking-wider text-slate-500">Stage 04</span><span class="text-sm font-medium text-slate-700">Handshake</span></div></div></div></div></div><!-- Main Two-Column Layout --><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><!-- LEFT: Current Offer + Clean History --><div class="lg:col-span-8 flex flex-col gap-8"><!-- PRIMARY FOCUS: Round 04 Active Offer --><div class="bg-white rounded-xl border-2 border-slate-900 p-6 sm:p-7 shadow-sm"><div class="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-slate-100"><div class="flex items-center gap-2"><span class="px-2.5 py-1 rounded bg-slate-900 text-white text-xs font-semibold tracking-wide uppercase">Active Offer</span><span class="text-xs text-slate-400 font-medium">• Round 04 of 04</span></div><span class="text-xs text-slate-500">Received Today, 11:32 AM UTC</span></div><div class="mt-6 flex flex-col gap-6"><div><span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Current Proposal</span><h2 class="text-2xl font-bold font-headline text-slate-900 mt-1">ABC Technologies Proposed 6% Revenue Share</h2></div><!-- Terms Grid --><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200/80"><div><span class="text-xs text-slate-500 block">Value Dimension</span><span class="text-sm font-semibold text-slate-900 mt-0.5 block">Distribution &amp; Sales</span></div><div><span class="text-xs text-slate-500 block">Delivery Archetype</span><span class="text-sm font-semibold text-slate-900 mt-0.5 block">Authorized VAR Reseller</span></div><div><span class="text-xs text-slate-500 block">Settlement Period</span><span class="text-sm font-semibold text-slate-900 mt-0.5 block font-mono">Net 30 Days</span></div></div><!-- Covenant Specification --><div class="text-slate-700 text-sm leading-relaxed"><p class="bg-slate-50/50 p-4 rounded-lg border border-slate-200/60"><span class="font-semibold text-slate-900">Proposed Terms:</span> “6% Revenue Share on first invoice and subsequent recurring annual retainers for all referred enterprise clients, executed via Authorized VAR Reseller model with dedicated regional co-selling support.”</p></div><!-- Clear, Bold Action Buttons --><div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"><button class="h-11 px-6 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer" type="button"><span class="material-symbols-outlined text-[18px]">check</span>Accept 6% Counter-Offer</button><button class="h-11 px-5 rounded-lg bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer" type="button"><span class="material-symbols-outlined text-[18px]">edit_note</span>Propose Counter-Offer</button><button class="h-11 px-4 text-slate-500 hover:text-rose-600 text-sm font-medium transition-colors flex items-center justify-center cursor-pointer ml-auto" type="button">Decline Offer</button></div></div></div><!-- Negotiation History (Past Rounds) --><div class="flex flex-col gap-4"><div class="flex items-center justify-between"><h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Negotiation History</h3><span class="text-xs text-slate-400">3 Previous Rounds</span></div><div class="flex flex-col gap-3"><!-- Round 03: Superseded --><div class="bg-[#FEF2F2]/60 rounded-xl border border-rose-200/70 p-4 transition-all"><div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200/50"><div class="flex items-center gap-2"><span class="text-xs font-mono font-bold text-slate-500">Round 03</span><span class="text-xs font-medium text-slate-700">Proposed by ABC Technologies</span><span class="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-100 text-rose-700 border border-rose-200">Superseded</span></div><span class="text-xs text-slate-400 font-mono">Oct 24, 11:08 UTC</span></div><div class="mt-2.5 flex flex-wrap items-center justify-between text-sm text-slate-600 gap-2"><div><span class="text-xs text-slate-500 mr-2">Proposed Terms:</span><span class="line-through font-mono text-slate-500">5.0% Revenue Share</span><span class="text-slate-400 text-xs ml-2">• Dedicated AE Co-Sell</span></div><span class="text-xs text-slate-400 italic">Replaced by Round 04 counter-proposal</span></div></div><!-- Round 02: Declined by XYZ Digital --><div class="bg-[#FEF2F2] rounded-xl border border-rose-200 p-4 transition-all"><div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200/60"><div class="flex items-center gap-2"><span class="text-xs font-mono font-bold text-slate-500">Round 02</span><span class="text-xs font-medium text-slate-700">Proposed by ABC Technologies</span><span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">Declined by You</span></div><span class="text-xs text-slate-400 font-mono">Oct 24, 10:20 UTC</span></div><div class="mt-2.5 flex flex-col gap-1.5 text-sm"><div class="flex flex-wrap items-center justify-between gap-2"><div><span class="text-xs text-slate-500 mr-2">Proposed Terms:</span><span class="line-through font-mono font-medium text-rose-900">4.0% Revenue Share</span><span class="text-slate-400 text-xs ml-2">• Lead Ingestion Only</span></div><span class="text-xs font-semibold text-rose-700">Below 5.0% hurdle rate</span></div><p class="text-xs text-slate-500 italic bg-white/70 p-2.5 rounded border border-rose-100">Note: 4.0% flat fee falls below syndicate hurdle requirement. Counter-requested with co-sell tiering.</p></div></div><!-- Round 01: Superseded --><div class="bg-[#FEF2F2]/60 rounded-xl border border-rose-200/70 p-4 transition-all"><div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-200/50"><div class="flex items-center gap-2"><span class="text-xs font-mono font-bold text-slate-500">Round 01</span><span class="text-xs font-medium text-slate-700">Initial Mandate by XYZ Digital (You)</span><span class="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-100 text-rose-700 border border-rose-200">Superseded</span></div><span class="text-xs text-slate-400 font-mono">Oct 24, 09:15 UTC</span></div><div class="mt-2.5 flex flex-wrap items-center justify-between text-sm text-slate-600 gap-2"><div><span class="text-xs text-slate-500 mr-2">Initial Request:</span><span class="line-through font-mono text-slate-500">10.0% Revenue Share</span><span class="text-slate-400 text-xs ml-2">• Tier-1 Banking Access</span></div><span class="text-xs text-slate-400 italic">Adjusted during syndicate scoping</span></div></div></div></div></div><!-- RIGHT: Clean Side Panel --><div class="lg:col-span-4 flex flex-col gap-6"><!-- Counterparty Profile --><div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4"><div class="flex items-center justify-between pb-3 border-b border-slate-100"><span class="text-xs font-bold uppercase tracking-wider text-slate-500">Counterparty Summary</span><span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><span class="material-symbols-outlined text-[14px]">verified</span>Verified</span></div><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm font-mono shrink-0">ABC</div><div class="flex flex-col"><h4 class="text-sm font-bold text-slate-900 leading-snug">ABC Technologies</h4><span class="text-xs text-slate-500">Zurich, Switzerland • Enterprise Integrator</span></div></div><div class="grid grid-cols-2 gap-3 pt-1"><div class="p-3 rounded-lg bg-slate-50 border border-slate-100"><span class="text-[11px] text-slate-500 block uppercase">Match Score</span><span class="text-base font-bold text-slate-900 font-mono">98%</span></div><div class="p-3 rounded-lg bg-slate-50 border border-slate-100"><span class="text-[11px] text-slate-500 block uppercase">Track Record</span><span class="text-base font-bold text-slate-900 font-mono">42 Deals</span></div></div></div><!-- Negotiation Trajectory Audit Trail --><div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4"><div class="flex items-center justify-between pb-3 border-b border-slate-100"><span class="text-xs font-bold uppercase tracking-wider text-slate-500">Offer Trajectory</span><span class="text-xs font-mono text-slate-400">R1 → R4</span></div><div class="flex flex-col gap-3 font-mono text-xs"><div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 text-slate-400 line-through"><span>R1: 10.0%</span><span class="text-[11px] font-sans">XYZ • Initial</span></div><div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-rose-50 border border-rose-200/60 text-rose-700"><span>R2: 4.0%</span><span class="text-[11px] font-sans font-semibold">ABC • Declined</span></div><div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 text-slate-400 line-through"><span>R3: 5.0%</span><span class="text-[11px] font-sans">ABC • Superseded</span></div><div class="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900 text-white font-bold shadow-sm"><span>R4: 6.0%</span><span class="text-[11px] font-sans font-medium text-slate-300">ABC • Current</span></div></div></div><!-- Zero Contact Leakage Guarantee --><div class="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3 shadow-sm"><span class="material-symbols-outlined text-slate-600 text-[20px] shrink-0 mt-0.5">lock</span><div class="text-xs text-slate-600"><span class="font-bold text-slate-900 block mb-0.5">Zero Contact Leakage Guarantee</span><p class="leading-relaxed text-slate-500">Direct contacts and sensitive credentials remain protected and are unlocked only upon mutual Stage 4 agreement.</p></div></div></div></div></div></div></main><!-- Minimal Footer --><footer class="w-full bg-white border-t border-slate-200 py-8"><div class="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500"><div class="flex items-center gap-6"><span class="font-headline font-bold text-slate-900">THE RELAY</span><span>© 2025 The Relay Network Ltd.</span></div><div class="flex items-center gap-6"><a class="hover:text-slate-900 transition-colors" data-path="governance" href="#">Governance</a><a class="hover:text-slate-900 transition-colors" data-path="security" href="#">Security &amp; Audits</a><a class="hover:text-slate-900 transition-colors" data-path="disclosures" href="#">Protocol Disclosures</a></div></div></footer></body></html>