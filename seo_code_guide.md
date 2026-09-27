When designing the page use the color scheme present in color_scheme.md and reuse the components from design-system(strict).

// arrival/initial stage
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base { html, body { margin: 0; padding: 0; } body { overscroll-behavior: none; } main > :first-child { margin-top: 0 !important; } main > :last-child { margin-bottom: 0 !important; } } ::-webkit-scrollbar { display: none; }</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "primary-fixed-dim": "#bfc7d8", "tertiary-container": "#112030", "on-error-container": "#93000a", "on-tertiary": "#ffffff", "outline": "#75777c", "primary": "#010611", "primary-fixed": "#dbe3f5", "on-primary-fixed-variant": "#3f4756", "on-tertiary-fixed-variant": "#39485a", "on-primary-container": "#7f8797", "on-secondary-fixed-variant": "#38485d", "background": "#f7f9fb", "surface-container-lowest": "#ffffff", "secondary-fixed-dim": "#b7c8e1", "inverse-surface": "#2d3133", "surface-container-low": "#f2f4f6", "inverse-primary": "#bfc7d8", "tertiary": "#000712", "primary-container": "#171f2c", "on-surface": "#191c1e", "on-secondary": "#ffffff", "on-error": "#ffffff", "on-background": "#191c1e", "surface-container": "#eceef0", "surface": "#f7f9fb", "on-secondary-container": "#54647a", "tertiary-fixed-dim": "#b9c8de", "on-secondary-fixed": "#0b1c30", "surface-dim": "#d8dadc", "surface-container-highest": "#e0e3e5", "surface-tint": "#575f6e", "on-tertiary-container": "#79889c", "surface-container-high": "#e6e8ea", "inverse-on-surface": "#eff1f3", "error": "#ba1a1a", "secondary-container": "#d0e1fb", "tertiary-fixed": "#d4e4fa", "on-primary-fixed": "#141c29", "surface-variant": "#e0e3e5", "outline-variant": "#c5c6cc", "on-surface-variant": "#45474c", "surface-bright": "#f7f9fb", "secondary": "#505f76", "error-container": "#ffdad6", "on-tertiary-fixed": "#0d1c2d", "secondary-fixed": "#d3e4fe", "on-primary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-sm": "0.5rem", "gutter-lg": "2rem", "space-xs": "0.25rem", "space-xl": "2.5rem", "gutter": "1.5rem", "space-lg": "1.5rem", "space-md": "1rem", "margin": "2rem", "gutter-sm": "1rem", "margin-mobile": "1rem" }, "fontFamily": { "label-md": ["Inter"], "headline-md": ["Plus Jakarta Sans"], "body-sm": ["Inter"], "headline-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Inter"], "body-lg": ["Inter"], "headline-lg": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "body-md": ["Inter"], "title-md": ["Inter"] }, "fontSize": { "label-md": ["13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "body-sm": ["12px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "400" }], "headline-lg-mobile": ["26px", { "lineHeight": "34px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "label-sm": ["11px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "600" }], "headline-sm": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400" }], "title-md": ["15px", { "lineHeight": "22px", "letterSpacing": "-0.005em", "fontWeight": "600" }] } } } };</script></head><body class="bg-background font-body-md text-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full max-w-[1600px] mx-auto px-margin flex items-center justify-between gap-gutter"><div class="flex items-center gap-space-lg"><div class="flex items-center gap-space-sm"><img alt="the-relay-logo.png" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xyh03kvE5229vIVVy-0EnA56XDGog_5vhdZEqt9BowKxiWjM7SCAzD1qSuQjHKzx7D2CkGT3TF4BQPlHDE2LhRZOh2gatfiwsymztWwMEDMhYJDIIzj3WfP_c7W3AImDnidGRJ5XJwhz8aJu5eGsujyNMepAXnG1iU5raHzR8ESlJfGZZXCjbR5_upK7sbvSp3NyLKTZbEjlCFIEX2pVxzHdTQNNc3cocseJK9s7Fm_PQSUNq7VbzyeB4W6f-7OK3w3FtXwbej"/><div class="flex flex-col"><span class="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">The Relay</span><span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest leading-none mt-1">Exchange</span></div></div><nav class="hidden lg:flex items-center gap-space-lg ml-space-md" data-active-classes="text-primary font-title-md"><a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-path="opportunities" href="#">Opportunities</a><a aria-current="page" class="uppercase tracking-wider transition-colors text-primary font-title-md" data-path="exchange-hub" href="#">Exchange Hub</a><a class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors" data-path="insights" href="#">Insights</a></nav></div><div class="flex items-center gap-space-md"><div class="hidden md:flex items-center bg-surface-container-low px-space-md py-space-xs rounded-lg w-72"><span class="material-symbols-outlined text-secondary text-[18px] mr-space-xs">search</span><input class="bg-transparent w-full text-on-surface placeholder:text-secondary font-body-sm text-body-sm focus:outline-none" placeholder="Search institutional deals, sponsors, mandates..." type="text"/></div><button aria-label="Notifications" class="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"><span class="material-symbols-outlined text-[20px]">notifications</span></button><div class="h-6 w-px bg-surface-container-high hidden sm:block"></div><div class="flex items-center gap-space-sm"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="hidden xl:flex flex-col"><span class="font-label-sm text-label-sm text-primary leading-none">M. Sterling</span><span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider leading-none mt-1">Syndicate Partner</span></div></div></div></div></header><main class="w-full pt-16 bg-background min-h-screen"><div class="flex flex-col w-full">
<!-- Top Command Context Bar -->
<section class="w-full bg-surface-container-lowest border-b border-outline-variant/60">
<div class="max-w-[1600px] mx-auto px-margin py-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-xs text-on-surface">
<div class="flex flex-wrap items-center gap-space-sm">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Mandate Dossier</span>
<span class="text-secondary/40 font-mono text-body-sm">/</span>
<span class="font-title-md text-title-md text-primary tracking-tight font-mono">#DEC318DA</span>
<span class="text-secondary/40 font-mono text-body-sm">/</span>
<span class="font-title-md text-title-md text-primary tracking-tight">Random Tech Ltd <span class="text-secondary font-normal font-sans text-body-sm px-1">vs</span> Aplex LLMP</span>
<span class="bg-surface-container px-space-xs py-0.5 rounded text-secondary font-label-sm text-label-sm uppercase tracking-widest font-mono">Handshake</span>
</div>
<div class="flex items-center gap-space-md">
<div class="flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-low rounded">
<span class="w-1.5 h-1.5 rounded-full bg-on-surface animate-pulse"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-primary">Bi-Directional Escrow Active</span>
</div>
<div class="flex items-center gap-1 text-secondary">
<span class="material-symbols-outlined text-[15px]">lock</span>
<span class="font-label-sm text-label-sm font-mono tracking-wider">AES-256-GCM</span>
</div>
</div>
</div>
</section>
<!-- Dossier Header & Linear Stepper -->
<section class="w-full bg-surface-container-lowest border-b border-outline-variant/50 pb-space-lg pt-space-md">
<div class="max-w-[1600px] mx-auto px-margin">
<!-- 4-Stage Institutional Progression Pipeline -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-gutter-sm relative">
<!-- Stage 01: Completed -->
<div class="flex flex-col gap-1.5 p-space-sm rounded-lg bg-surface-container-low/60 border border-outline-variant/40">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-mono">Stage 01</span>
<span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<span class="font-title-md text-title-md text-primary">Acknowledged</span>
<span class="font-body-sm text-body-sm text-secondary truncate">Mutual interest ratified &amp; verified</span>
</div>
<!-- Stage 02: Completed -->
<div class="flex flex-col gap-1.5 p-space-sm rounded-lg bg-surface-container-low/60 border border-outline-variant/40">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-mono">Stage 02</span>
<span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<span class="font-title-md text-title-md text-primary">Bilateral Negotiation</span>
<span class="font-body-sm text-body-sm text-secondary truncate">Fee schedule &amp; covenants cleared</span>
</div>
<!-- Stage 03: Completed & Sealed -->
<div class="flex flex-col gap-1.5 p-space-sm rounded-lg bg-surface-container-low/60 border border-outline-variant/40">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-mono">Stage 03</span>
<span class="bg-primary text-on-primary text-[9px] uppercase px-1 py-0.5 rounded tracking-widest font-mono">Sealed</span>
</div>
<span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<span class="font-title-md text-title-md text-primary">Term Agreement</span>
<span class="font-body-sm text-body-sm text-secondary truncate">60% Profit Lead • Bound legally</span>
</div>
<!-- Stage 04: Active Handshake -->
<div class="flex flex-col gap-1.5 p-space-sm rounded-lg bg-primary-container text-on-primary border border-primary">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-mono">Stage 04 (Final)</span>
<span class="bg-surface-container-lowest text-primary text-[9px] uppercase font-bold px-1.5 py-0.5 rounded tracking-widest font-mono">Active</span>
</div>
<span class="material-symbols-outlined text-[16px] text-primary-fixed animate-spin" style="animation-duration: 4s;">sync</span>
</div>
<span class="font-title-md text-title-md text-surface-container-lowest">Handshake Protocol</span>
<span class="font-body-sm text-body-sm text-on-primary-container truncate">Dual-Key Identity Unlocking</span>
</div>
</div>
</div>
</section>
<!-- Core Workspace Viewport -->
<main class="w-full max-w-[1600px] mx-auto px-margin py-space-xl">
<div class="grid grid-cols-1 xl:grid-cols-12 gap-gutter-lg items-start">
<!-- Primary Column: Protocol Activation & Channel Exchange Matrix -->
<section class="xl:col-span-8 flex flex-col gap-space-lg">
<!-- Welcome Protocol Activation Card -->
<article class="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-lg relative overflow-hidden">
<div class="absolute -right-8 -top-8 w-44 h-44 bg-surface-container-low rounded-full pointer-events-none opacity-60"></div>
<div class="flex flex-col sm:flex-row items-start gap-space-md relative z-10">
<div class="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">verified_user</span>
</div>
<div class="flex flex-col gap-space-xs">
<div class="flex flex-wrap items-center gap-space-sm">
<span class="font-headline-sm text-headline-sm text-primary">Stage 04: Bilateral Handshake &amp; Reciprocal Contact Exchange</span>
</div>
<p class="font-body-md text-body-md text-secondary leading-relaxed">
                Terms are legally locked under Stage 03. You are now in the blinded contact escrow room. Choose which coordinates you wish to exchange with <strong class="text-primary font-medium">Random Tech Ltd</strong>. Contact details are released strictly on a 1-to-1 reciprocal match: when you share an email, Random Tech Ltd is notified to match with theirs. No unilateral disclosure is ever executed.
              </p>
<div class="flex flex-wrap items-center gap-space-md pt-space-xs text-secondary">
<div class="flex items-center gap-1.5 font-label-sm text-label-sm font-mono uppercase tracking-wider">
<span class="material-symbols-outlined text-[15px] text-primary">shield</span>
<span>Reciprocal Escrow Active</span>
</div>
<span class="text-outline-variant">•</span>
<div class="flex items-center gap-1.5 font-label-sm text-label-sm font-mono uppercase tracking-wider">
<span class="material-symbols-outlined text-[15px] text-primary">visibility_off</span>
<span>Zero Premature Disclosure</span>
</div>
<span class="text-outline-variant">•</span>
<div class="flex items-center gap-1.5 font-label-sm text-label-sm font-mono uppercase tracking-wider">
<span class="material-symbols-outlined text-[15px] text-primary">history_toggle_off</span>
<span>72h Resolution Window</span>
</div>
</div>
</div>
</div>
</article>
<!-- Initial Arrival Warning / Info Banner -->
<aside class="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low border border-outline-variant/60">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[20px]">info</span>
<div class="flex flex-col">
<span class="font-title-md text-title-md text-primary">Initial Arrival State: No Channels Yet Requested</span>
<span class="font-body-sm text-body-sm text-secondary">Neither desk has initiated coordinate requests. Select an entry below to place your first blinded deposit.</span>
</div>
</div>
<span class="hidden sm:inline-block font-mono font-label-sm text-label-sm text-secondary uppercase bg-surface-container px-2 py-1 rounded">0 / 3 Exchanged</span>
</aside>
<!-- Main Exchange Channel Matrix -->
<section class="flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex flex-col">
<h2 class="font-headline-sm text-headline-sm text-primary">Select Channels to Exchange</h2>
<p class="font-body-sm text-body-sm text-secondary">Manage each coordinate independently. Contacts stay private until both sides consent.</p>
</div>
<span class="font-label-sm text-label-sm uppercase tracking-wider font-mono text-secondary">Protocol v2.4</span>
</div>
<div class="space-y-space-sm">
<!-- Channel 1: Corporate Executive Email -->
<article class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-space-lg hover:border-primary transition-all duration-200" id="channel-card-email">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div class="flex items-start gap-space-md">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
<span class="material-symbols-outlined text-[20px]">alternate_email</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<h3 class="font-title-md text-title-md text-primary">Business Email</h3>
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border border-outline-variant/80 text-secondary bg-surface-container-low" id="badge-email">
                        Not Shared • Ready to Request
                      </span>
</div>
<span class="font-label-sm text-label-sm text-secondary mt-0.5">Corporate Executive Direct Address</span>
<p class="font-body-sm text-body-sm text-secondary mt-1">
                      Primary verified business address for contractual, operational onboarding, and institutional NDAs.
                    </p>
</div>
</div>
<div class="flex items-center md:flex-col lg:flex-row gap-space-xs shrink-0 pt-space-xs md:pt-0">
<button class="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-space-md py-2 rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-slate-800 transition-colors" id="btn-email" onclick="handleRequest('email')">
<span class="material-symbols-outlined text-[16px]">add</span>
<span>Request &amp; Share Email</span>
</button>
</div>
</div>
</article>
<!-- Channel 2: Direct Institutional Phone -->
<article class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-space-lg hover:border-primary transition-all duration-200" id="channel-card-phone">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div class="flex items-start gap-space-md">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
<span class="material-symbols-outlined text-[20px]">call</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<h3 class="font-title-md text-title-md text-primary">Direct Institutional Phone</h3>
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border border-outline-variant/80 text-secondary bg-surface-container-low" id="badge-phone">
                        Not Shared
                      </span>
</div>
<span class="font-label-sm text-label-sm text-secondary mt-0.5">Direct Line / Mobile Desk</span>
<p class="font-body-sm text-body-sm text-secondary mt-1">
                      Direct partner phone coordinate for encrypted voice, WhatsApp coordination, and executive syncs.
                    </p>
</div>
</div>
<div class="flex items-center md:flex-col lg:flex-row gap-space-xs shrink-0 pt-space-xs md:pt-0">
<button class="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-space-md py-2 rounded bg-surface-container-lowest text-primary border border-outline-variant hover:border-primary font-label-md text-label-md transition-colors" id="btn-phone" onclick="handleRequest('phone')">
<span class="material-symbols-outlined text-[16px]">add</span>
<span>Request &amp; Share Phone</span>
</button>
</div>
</div>
</article>
<!-- Channel 3: Managing Partner Profile -->
<article class="bg-surface-container-lowest rounded-xl border border-outline-variant/70 p-space-lg hover:border-primary transition-all duration-200" id="channel-card-profile">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div class="flex items-start gap-space-md">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
<span class="material-symbols-outlined text-[20px]">badge</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm">
<h3 class="font-title-md text-title-md text-primary">Managing Partner Profile</h3>
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border border-outline-variant/80 text-secondary bg-surface-container-low" id="badge-profile">
                        Not Shared
                      </span>
</div>
<span class="font-label-sm text-label-sm text-secondary mt-0.5">Executive Identity Dossier</span>
<p class="font-body-sm text-body-sm text-secondary mt-1">
                      Verified professional accreditation record, LinkedIn identity, and compliance signatory dossier.
                    </p>
</div>
</div>
<div class="flex items-center md:flex-col lg:flex-row gap-space-xs shrink-0 pt-space-xs md:pt-0">
<button class="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-space-md py-2 rounded bg-surface-container-lowest text-primary border border-outline-variant hover:border-primary font-label-md text-label-md transition-colors" id="btn-profile" onclick="handleRequest('profile')">
<span class="material-symbols-outlined text-[16px]">add</span>
<span>Request &amp; Share Profile</span>
</button>
</div>
</div>
</article>
<!-- Channel 4: Add Custom Channel (Dotted/Ghost State) -->
<div class="p-space-md rounded-xl border border-dashed border-outline-variant/80 hover:border-primary flex items-center justify-between transition-colors cursor-pointer bg-surface-container-lowest/50" onclick="alert('Custom Coordinate Protocol: Select Signal, Calendly, or Enterprise Dealroom coordinate.')">
<div class="flex items-center gap-space-md">
<div class="w-9 h-9 rounded bg-surface-container-low flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
</div>
<div class="flex flex-col">
<span class="font-title-md text-title-md text-primary">Add Custom Coordination Endpoint</span>
<span class="font-body-sm text-body-sm text-secondary">E.g., Encrypted Signal ID, Slack Connect, Calendly Link, or Secure Vault</span>
</div>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]">chevron_right</span>
</div>
</div>
</section>
<!-- Cryptographic Audit Feed -->
<section class="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center justify-between border-b border-outline-variant/50 pb-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-primary">terminal</span>
<h3 class="font-title-md text-title-md text-primary">Cryptographic Audit Feed</h3>
</div>
<span class="font-mono text-label-sm text-label-sm text-secondary">EPOCH 1741270935</span>
</div>
<div class="space-y-2 pt-1 font-mono text-body-sm text-on-surface" id="audit-feed">
<div class="flex items-start justify-between gap-space-sm p-1.5 rounded hover:bg-surface-container-low">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span class="text-secondary">[14:02:15 UTC]</span>
<span class="text-primary font-medium">Stage 03 Term Agreement mutually confirmed &amp; hashed</span>
</div>
<span class="text-secondary text-[11px]">SIG: 0x9f..2b41</span>
</div>
<div class="flex items-start justify-between gap-space-sm p-1.5 rounded hover:bg-surface-container-low">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span class="text-secondary">[14:02:18 UTC]</span>
<span class="text-primary">Blinded Handshake Escrow room initialized (Room ID: #HSH-889)</span>
</div>
<span class="text-secondary text-[11px]">ACK: BOTH</span>
</div>
<div class="flex items-start justify-between gap-space-sm p-1.5 rounded bg-surface-container-low/50">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
<span class="text-secondary">[14:02:22 UTC]</span>
<span class="text-secondary italic">Awaiting initial coordinate request from either counterparty</span>
</div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-primary">READY</span>
</div>
</div>
</section>
</section>
<!-- Sidebar / Institutional Metadata & Handshake Guardrails -->
<aside class="xl:col-span-4 flex flex-col gap-space-md">
<!-- Card 1: Agreed Exchange Summary (Stage 03 Sealed) -->
<article class="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center justify-between border-b border-outline-variant/40 pb-space-sm">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-mono">Governing Covenant</span>
<span class="bg-primary text-on-primary text-[10px] uppercase px-2 py-0.5 rounded font-mono tracking-wider font-semibold">
              Sealed &amp; Binding
            </span>
</div>
<div class="pt-space-xs">
<h3 class="font-headline-sm text-headline-sm text-primary">Confirmed 60% Profit Lead</h3>
<span class="font-mono text-label-sm text-label-sm text-secondary">Ref: RL-889-01-MND</span>
</div>
<dl class="divide-y divide-outline-variant/40 pt-space-xs text-body-sm">
<div class="py-2 flex items-center justify-between">
<dt class="text-secondary">Originator Desk</dt>
<dd class="font-medium text-primary text-right">Random Tech Ltd</dd>
</div>
<div class="py-2 flex items-center justify-between">
<dt class="text-secondary">Counterparty Desk</dt>
<dd class="font-medium text-primary text-right">Aplex LLMP</dd>
</div>
<div class="py-2 flex items-center justify-between">
<dt class="text-secondary">Execution Window</dt>
<dd class="font-mono font-medium text-primary text-right">72 Hours Post-Handshake</dd>
</div>
<div class="py-2 flex items-center justify-between">
<dt class="text-secondary">Governing Law</dt>
<dd class="font-medium text-primary text-right">England &amp; Wales (LMA)</dd>
</div>
</dl>
<div class="pt-space-xs border-t border-outline-variant/40 flex items-center justify-between">
<a class="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline" href="#">
<span>View Certified Term Docket</span>
<span class="material-symbols-outlined text-[15px]">arrow_outward</span>
</a>
<span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
</div>
</article>
<!-- Card 2: The Reciprocal Escrow Rule -->
<article class="bg-surface-container-low/70 rounded-xl border border-outline-variant/60 p-space-lg flex flex-col gap-space-xs">
<div class="flex items-center gap-2 text-primary">
<span class="material-symbols-outlined text-[20px]">enhanced_encryption</span>
<h4 class="font-title-md text-title-md text-primary">The Reciprocal Escrow Rule</h4>
</div>
<span class="font-label-sm text-label-sm uppercase font-mono tracking-wider text-secondary">Zero Contact Leakage Guarantee</span>
<p class="font-body-sm text-body-sm text-secondary leading-relaxed pt-space-xs">
            No unilateral disclosure: If you deposit an email, <strong class="text-primary font-normal">Random Tech Ltd</strong> only observes that a business email is ready for mutual unlock. They cannot view your coordinate until their representative pledges their corresponding business email.
          </p>
<div class="mt-space-xs pt-space-xs border-t border-outline-variant/40 flex items-center justify-between text-secondary">
<span class="font-label-sm text-label-sm font-mono">Mutual Consent Required</span>
<span class="font-label-sm text-label-sm font-mono text-primary font-bold">1:1 PARITY</span>
</div>
</article>
<!-- Card 3: Handshake Completion Requirement -->
<article class="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-lg flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<h4 class="font-title-md text-title-md text-primary">Completion Requirements</h4>
<span class="font-mono text-label-sm text-label-sm text-secondary" id="req-progress">0 of 2 Satisfied</span>
</div>
<!-- Requirements Checklist -->
<div class="space-y-space-sm font-body-sm">
<div class="flex items-start gap-space-sm" id="req-item-channel">
<span class="material-symbols-outlined text-[18px] text-secondary/60 shrink-0" id="req-icon-channel">radio_button_unchecked</span>
<div class="flex flex-col">
<span class="font-medium text-primary">At least 1 reciprocal channel unlocked</span>
<span class="text-body-sm text-secondary" id="req-desc-channel">0 of 1 minimum matched</span>
</div>
</div>
<div class="flex items-start gap-space-sm opacity-50" id="req-item-sig">
<span class="material-symbols-outlined text-[18px] text-secondary/60 shrink-0">lock</span>
<div class="flex flex-col">
<span class="font-medium text-primary">Cryptographic handshake mutual signature</span>
<span class="text-body-sm text-secondary">Unlocks upon contact parity</span>
</div>
</div>
</div>
<!-- Master Action Execution Button -->
<div class="pt-space-xs flex flex-col gap-space-xs">
<button class="w-full flex items-center justify-center gap-2 py-3 px-space-md rounded bg-surface-container-high text-secondary/50 font-label-md text-label-md cursor-not-allowed transition-all" disabled="" id="btn-complete-handshake">
<span class="material-symbols-outlined text-[18px]">lock</span>
<span>Complete Handshake (Locked)</span>
</button>
<p class="font-label-sm text-label-sm text-secondary text-center">
              Awaiting minimum of one reciprocal contact exchange.
            </p>
</div>
</article>
<!-- Counterparty Verification Meta Card -->
<div class="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between text-secondary">
<div class="flex items-center gap-space-sm">
<div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm uppercase font-mono tracking-wider text-primary">Random Tech Ltd</span>
<span class="text-[11px] text-secondary">Desk Active • London GMT</span>
</div>
</div>
<span class="font-mono text-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded">ONLINE</span>
</div>
</aside>
</div>
</main>
</div>
<script>
  // Handshake Baseline Interactive Mock
  let sharedCount = 0;

  function handleRequest(channelType) {
    const card = document.getElementById(`channel-card-${channelType}`);
    const badge = document.getElementById(`badge-${channelType}`);
    const btn = document.getElementById(`btn-${channelType}`);
    const auditFeed = document.getElementById(`audit-feed`);
    const reqChannel = document.getElementById(`req-item-channel`);
    const reqProgress = document.getElementById(`req-progress`);
    const reqIconChannel = document.getElementById(`req-icon-channel`);
    const reqDescChannel = document.getElementById(`req-desc-channel`);
    const mainBtn = document.getElementById(`btn-complete-handshake`);

    if (btn.dataset.state === 'requested') {
      return;
    }

    // Update Button State
    btn.dataset.state = 'requested';
    btn.className = "w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-space-md py-2 rounded bg-surface-container-low text-secondary border border-outline-variant font-label-md text-label-md cursor-default";
    btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">hourglass_top</span><span>Awaiting Counterparty Match</span>`;

    // Update Badge State
    badge.className = "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border border-primary text-primary bg-surface-container-lowest";
    badge.innerText = "DEPOSITED • PENDING RECIPROCAL MATCH";

    sharedCount++;

    // Add Audit Log Entry
    const now = new Date();
    const timeStr = now.toISOString().substring(11, 19) + " UTC";
    const logDiv = document.createElement('div');
    logDiv.className = "flex items-start justify-between gap-space-sm p-1.5 rounded bg-surface-container-low/40 animate-fade-in";
    logDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
        <span class="text-secondary">[${timeStr}]</span>
        <span class="text-primary font-medium">Aplex LLMP deposited coordinate: ${channelType.toUpperCase()} (Blinded)</span>
      </div>
      <span class="text-secondary text-[11px]">NOTIFIED</span>
    `;
    auditFeed.appendChild(logDiv);

    // Update Progress Sidebar
    if (sharedCount >= 1) {
      reqIconChannel.innerText = "check_circle";
      reqIconChannel.classList.remove("text-secondary/60");
      reqIconChannel.classList.add("text-primary");
      reqDescChannel.innerText = `${sharedCount} coordinate requested (Awaiting Random Tech response)`;
      reqProgress.innerText = `1 of 2 Satisfied`;
    }
  }
</script></main><footer class="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-space-xl"><div class="w-full max-w-[1600px] mx-auto px-margin py-space-xl"><div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg pb-space-lg"><div class="flex items-center gap-space-sm"><img alt="the-relay-logo.png" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xyh03kvE5229vIVVy-0EnA56XDGog_5vhdZEqt9BowKxiWjM7SCAzD1qSuQjHKzx7D2CkGT3TF4BQPlHDE2LhRZOh2gatfiwsymztWwMEDMhYJDIIzj3WfP_c7W3AImDnidGRJ5XJwhz8aJu5eGsujyNMepAXnG1iU5raHzR8ESlJfGZZXCjbR5_upK7sbvSp3NyLKTZbEjlCFIEX2pVxzHdTQNNc3cocseJK9s7Fm_PQSUNq7VbzyeB4W6f-7OK3w3FtXwbej"/><span class="font-title-md text-title-md text-primary tracking-tight">The Relay Platform</span><span class="font-label-sm text-label-sm text-secondary uppercase ml-space-sm">Institutional Network</span></div><div class="flex flex-wrap items-center gap-space-lg text-secondary"><a class="font-label-sm text-label-sm uppercase tracking-wider hover:text-on-surface transition-colors" data-path="governance" href="#">Platform Governance</a><a class="font-label-sm text-label-sm uppercase tracking-wider hover:text-on-surface transition-colors" data-path="regulatory-disclosures" href="#">Regulatory Disclosures</a><a class="font-label-sm text-label-sm uppercase tracking-wider hover:text-on-surface transition-colors" data-path="clearing-protocols" href="#">Clearing Protocols</a><a class="font-label-sm text-label-sm uppercase tracking-wider hover:text-on-surface transition-colors" data-path="privacy-charter" href="#">Privacy Charter</a></div></div><div class="pt-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md text-secondary"><p class="font-body-sm text-body-sm max-w-4xl text-on-surface-variant">The Relay is an invitation-only marketplace for verified private markets participants, institutional allocators, and accredited syndicates. Secondary clearing and transaction execution are governed by participant syndicate master agreements and applicable jurisdictional securities regulations.</p><span class="font-label-sm text-label-sm text-secondary tracking-wider whitespace-nowrap">© 2025 THE RELAY INC. ALL RIGHTS RESERVED.</span></div></div></footer></body></html>

// when a party decides to share a detail but have to wait for the other party. Means this is the UI for requester end for sharing a contact detail
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-container-highest":"#e0e3e5","inverse-on-surface":"#eff1f3","on-secondary-fixed":"#0b1c30","primary-fixed-dim":"#bfc7d8","on-primary-container":"#7f8797","surface-bright":"#f7f9fb","tertiary-container":"#112030","outline":"#75777c","primary-fixed":"#dbe3f5","on-background":"#191c1e","on-primary-fixed":"#141c29","surface-tint":"#575f6e","inverse-surface":"#2d3133","on-error":"#ffffff","surface-container-lowest":"#ffffff","surface-variant":"#e0e3e5","on-tertiary":"#ffffff","on-secondary":"#ffffff","secondary-fixed-dim":"#b7c8e1","on-surface":"#191c1e","on-primary-fixed-variant":"#3f4756","tertiary-fixed-dim":"#b9c8de","on-secondary-container":"#54647a","on-tertiary-fixed-variant":"#39485a","inverse-primary":"#bfc7d8","on-tertiary-fixed":"#0d1c2d","on-error-container":"#93000a","error":"#ba1a1a","background":"#f7f9fb","surface":"#f7f9fb","surface-container":"#eceef0","primary":"#010611","primary-container":"#171f2c","error-container":"#ffdad6","surface-container-low":"#f2f4f6","surface-container-high":"#e6e8ea","secondary-container":"#d0e1fb","on-primary":"#ffffff","on-surface-variant":"#45474c","tertiary":"#000712","secondary":"#505f76","secondary-fixed":"#d3e4fe","on-secondary-fixed-variant":"#38485d","tertiary-fixed":"#d4e4fa","surface-dim":"#d8dadc","outline-variant":"#c5c6cc","on-tertiary-container":"#79889c"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"gutter-sm":"1rem","margin-mobile":"1rem","space-xl":"2.5rem","space-lg":"1.5rem","space-sm":"0.5rem","space-xs":"0.25rem","gutter-lg":"2rem","margin":"2rem","space-md":"1rem","gutter":"1.5rem"},"fontFamily":{"headline-md":["Plus Jakarta Sans"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"headline-lg-mobile":["Plus Jakarta Sans"],"body-md":["Inter"],"body-sm":["Inter"],"headline-sm":["Plus Jakarta Sans"],"label-sm":["Inter"],"label-md":["Inter"],"headline-lg":["Plus Jakarta Sans"],"body-lg":["Inter"]},"fontSize":{"headline-md":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"600"}],"display-lg":["48px",{"lineHeight":"56px","letterSpacing":"-0.02em","fontWeight":"700"}],"title-md":["15px",{"lineHeight":"22px","letterSpacing":"-0.005em","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","letterSpacing":"-0.01em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"400"}],"body-sm":["12px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"400"}],"headline-sm":["18px",{"lineHeight":"26px","letterSpacing":"-0.005em","fontWeight":"600"}],"label-sm":["11px",{"lineHeight":"16px","letterSpacing":"0.04em","fontWeight":"600"}],"label-md":["13px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"500"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"-0.015em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}]}}}}</script></head><body class="bg-surface font-body-md text-on-surface antialiased"><header class="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-surface-container-highest"><div class="h-28 w-full"><div class="h-16 w-full max-w-[1600px] mx-auto px-margin flex items-center justify-between gap-gutter border-b border-surface-container-high"><div class="flex items-center gap-space-lg"><div class="flex flex-col"><span class="font-headline-sm text-headline-sm uppercase tracking-tight text-primary leading-none">The Relay</span><span class="font-label-sm text-label-sm uppercase tracking-wider text-outline leading-tight mt-0.5">Opportunity Exchange</span></div><div class="h-6 w-px bg-surface-container-highest"></div><nav class="hidden lg:flex items-center gap-space-lg" data-active-classes="text-primary font-title-md border-b-2 border-primary-container pb-4 pt-4"><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="opportunities" href="#">OPPORTUNITIES</a><a aria-current="page" class="transition-colors text-primary font-title-md border-b-2 border-primary-container pb-4 pt-4" data-path="exchange-hub" href="#">EXCHANGE HUB</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="insights" href="#">INSIGHTS</a></nav></div><div class="flex items-center gap-space-md"><div class="relative hidden md:flex items-center"><span class="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span><input class="h-[38px] w-80 pl-9 pr-12 bg-surface-container-lowest border border-surface-container-highest rounded text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:border-primary-container" placeholder="Search institutional mandates..." type="text"><kbd class="absolute right-2.5 px-1.5 py-0.5 border border-surface-container-highest bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded">⌘K</kbd></div><button aria-label="Notifications" class="w-9 h-9 flex items-center justify-center border border-surface-container-highest rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:border-primary-container transition-all"><span class="material-symbols-outlined text-[20px]">notifications</span></button><div class="h-6 w-px bg-surface-container-highest"></div><div class="flex items-center gap-space-sm pl-space-xs"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="hidden xl:flex flex-col"><span class="font-label-md text-label-md text-primary leading-none">Morgan Sterling</span><span class="font-label-sm text-label-sm text-outline leading-tight mt-0.5">Apex Syndicate</span></div></div></div></div><div class="h-12 w-full max-w-[1600px] mx-auto px-margin flex items-center justify-between text-body-sm font-body-sm bg-surface-container-lowest"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-outline text-[16px]">folder_open</span><span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">Mandate Dossier</span><span class="text-outline">/</span><span class="font-title-md text-title-md text-primary tracking-tight">#DEC318DA: Random Tech Ltd vs Aplex LLMP</span><span class="px-2 py-0.5 border border-primary-container bg-surface-container-lowest font-label-sm text-label-sm uppercase text-primary rounded">HANDSHAKE</span></div><div class="flex items-center gap-space-lg"><div class="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-surface-container-highest rounded"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span><span class="font-label-sm text-label-sm uppercase tracking-wider text-primary">BI-DIRECTIONAL ESCROW ACTIVE</span></div><div class="flex items-center gap-1 text-outline"><span class="material-symbols-outlined text-[15px]">lock</span><span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">CIPHER: AES-256-GCM</span></div></div></div></div></header><main class="w-full pt-28 bg-surface min-h-[calc(100vh-140px)]"><div class="max-w-[1600px] mx-auto px-margin py-space-lg"><div class="flex flex-col w-full">
<!-- Stepper Breadcrumb Protocol Navigation -->
<section class="w-full bg-surface-container-lowest p-space-md mb-space-lg border border-surface-container-high rounded-xl">
<div class="flex items-center justify-between gap-space-md overflow-x-auto">
<div class="flex items-center gap-space-sm min-w-max">
<span class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px]">check</span>
</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline tracking-wider uppercase">Stage 01</span>
<span class="font-title-md text-title-md text-primary font-medium">Acknowledged</span>
</div>
</div>
<div class="h-px w-12 bg-surface-container-highest hidden sm:block flex-shrink-0"></div>
<div class="flex items-center gap-space-sm min-w-max">
<span class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px]">check</span>
</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline tracking-wider uppercase">Stage 02</span>
<span class="font-title-md text-title-md text-primary font-medium">Bilateral Negotiation</span>
</div>
</div>
<div class="h-px w-12 bg-surface-container-highest hidden sm:block flex-shrink-0"></div>
<div class="flex items-center gap-space-sm min-w-max">
<span class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px]">check</span>
</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline tracking-wider uppercase">Stage 03</span>
<span class="font-title-md text-title-md text-primary font-medium">Term Agreement</span>
</div>
</div>
<div class="h-px w-12 bg-surface-container-highest hidden sm:block flex-shrink-0"></div>
<div class="flex items-center gap-space-sm min-w-max px-space-md py-2 bg-primary text-on-primary rounded-xl border border-primary-container">
<span class="w-7 h-7 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center font-label-sm text-label-sm font-semibold">
04
</span>
<div class="flex flex-col">
<div class="flex items-center gap-1.5">
<span class="font-label-sm text-label-sm text-primary-fixed tracking-wider uppercase font-semibold">Stage 04 • Final</span>
<span class="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
</div>
<span class="font-title-md text-title-md text-on-primary tracking-tight font-medium">Handshake Protocol</span>
</div>
</div>
</div>
</section>
<!-- Main Asymmetric 12-Column Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
<!-- Left Column: Handshake Interaction Console (8 cols) -->
<div class="lg:col-span-8 flex flex-col gap-space-lg">
<!-- Section Header -->
<div class="bg-surface-container-lowest p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-container-high rounded-xl">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="font-label-sm text-label-sm tracking-wider uppercase text-outline font-semibold">
Dual-Key Identity Unlocking
</span>
<span class="px-2 py-0.2 bg-surface-container-low border border-surface-container-high text-outline text-[11px] font-label-sm rounded uppercase">Bilateral Mutual Vault</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
Handshake &amp; Contact Exchange
</h1>
<p class="font-body-md text-body-md text-on-surface-variant mt-1.5">
Choose which corporate contact coordinates you authorize to release to <span class="font-semibold text-primary">Random Tech Ltd</span>.
</p>
</div>
<div class="flex items-center gap-space-sm self-start md:self-auto flex-shrink-0">
<button class="h-10 px-space-md bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high text-primary font-label-md text-label-md flex items-center gap-2 rounded-lg transition-colors" id="refresh-state-btn" title="Sync live cryptographic state">
<span class="material-symbols-outlined text-[18px] text-outline" id="refresh-icon">sync</span>
<span class="font-medium">Refresh Status</span>
</button>
</div>
</div>
<!-- Escrow Waiting Banner (Direction A Warm Amber theme via semantic surface shift) -->
<div class="p-space-lg flex flex-col sm:flex-row gap-space-md rounded-xl border border-amber-200/80 bg-[#fffbeb] transition-all">
<div class="w-11 h-11 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0 text-amber-900">
<span class="material-symbols-outlined text-[24px]">hourglass_top</span>
</div>
<div class="flex-1 flex flex-col gap-space-xs">
<div class="flex flex-wrap items-center justify-between gap-space-xs">
<h2 class="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
Your Email is Locked in Escrow — Waiting for Random Tech Ltd
</h2>
<span class="px-2.5 py-1 bg-surface-container-lowest text-amber-900 border border-amber-200 font-label-sm text-label-sm uppercase rounded font-semibold flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
1 Detail In Escrow
</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
You have submitted and authorized your Business Email (<code class="bg-surface-container-lowest border border-surface-container-highest px-1.5 py-0.5 font-label-sm text-label-sm text-primary font-mono rounded">aplex-desk@aplexllmp.partner</code>). It is securely encrypted in custody. Once Random Tech Ltd deposits their corresponding corporate email, yours will be automatically and reciprocally released to them. Until then, your email remains private.
</p>
<div class="pt-space-xs flex flex-wrap items-center gap-space-sm text-outline font-label-sm text-label-sm uppercase tracking-wider">
<div class="flex items-center gap-1 text-amber-800">
<span class="material-symbols-outlined text-[16px]">verified_user</span>
<span class="font-medium">Reciprocal Cipher Lock #ESC-8921-X</span>
</div>
<span class="">•</span>
<span class="text-on-surface-variant" id="live-timer">Polled 4 seconds ago</span>
<span class="">•</span>
<span class="text-outline">Zero unilateral exposure guaranteed</span>
</div>
</div>
</div>
<!-- Contact Exchange Table & Selection Rows -->
<div class="bg-surface-container-lowest p-space-lg flex flex-col gap-space-md border border-surface-container-high rounded-xl">
<div class="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
<div>
<h3 class="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">Designated Direct Coordinates</h3>
<p class="font-body-sm text-body-sm text-outline mt-0.5">Reciprocal unlocking strictly applies channel-by-channel.</p>
</div>
<span class="px-2.5 py-1 bg-surface-container-low border border-surface-container-high font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider rounded font-medium">3 Direct Channels</span>
</div>
<!-- Row 1: Business Email (Locked in Escrow) -->
<div class="bg-[#fffef8] border border-amber-200/90 p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md rounded-xl transition-all">
<div class="flex items-start gap-space-md">
<div class="pt-1">
<div class="w-5 h-5 rounded bg-primary text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[15px]">check</span>
</div>
</div>
<div class="w-9 h-9 rounded-lg bg-surface-container-lowest border border-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span class="material-symbols-outlined text-[19px]">mail</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-space-sm flex-wrap">
<span class="font-title-md text-title-md text-primary font-semibold">Business Email</span>
<span class="px-2 py-0.2 bg-surface-container-low border border-surface-container-high text-outline font-label-sm text-label-sm rounded uppercase">Primary Desk</span>
</div>
<div class="flex items-center gap-2 mt-1">
<span class="font-body-md text-body-md text-primary font-mono select-all">aplex-desk@aplexllmp.partner</span>
<span class="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-label-sm text-label-sm rounded font-medium">Escrow Active</span>
</div>
</div>
</div>
<div class="flex items-center justify-between md:justify-end gap-space-md pt-2 md:pt-0">
<div class="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 font-label-sm text-label-sm uppercase tracking-wide rounded font-semibold flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
Awaiting Random Tech Ltd's Email
</div>
<button class="h-9 px-3.5 bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high text-primary font-label-md text-label-md rounded-lg transition-colors flex items-center gap-1.5">
<span class="font-medium">Manage</span>
<span class="material-symbols-outlined text-[16px] text-outline">tune</span>
</button>
</div>
</div>
<!-- Row 2: Direct Institutional Phone (Unshared) -->
<div class="bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md rounded-xl transition-colors" id="row-phone">
<div class="flex items-start gap-space-md">
<div class="pt-1">
<button aria-label="Toggle Phone Sharing" class="w-5 h-5 rounded border border-surface-container-highest bg-surface-container-highest flex items-center justify-center text-transparent hover:text-outline transition-colors" id="toggle-phone">
<span class="material-symbols-outlined text-[15px] check-icon">check</span>
</button>
</div>
<div class="w-9 h-9 rounded-lg bg-surface-container-low border border-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span class="material-symbols-outlined text-[19px]">call</span>
</div>
<div class="flex flex-col">
<span class="font-title-md text-title-md text-primary font-semibold">Direct Institutional Phone</span>
<span class="font-body-md text-body-md text-on-surface-variant mt-0.5 font-mono">+44 (0) 20 7946 0912 (Desk Lead)</span>
</div>
</div>
<div class="flex items-center justify-between md:justify-end gap-space-md pt-2 md:pt-0">
<span class="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide rounded font-medium" id="phone-status">
Not Shared
</span>
<button class="h-9 px-space-md bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg border border-surface-container-high transition-colors font-medium" id="btn-share-phone">
Share Phone
</button>
</div>
</div>
<!-- Row 3: Managing Partner LinkedIn Profile (Unshared) -->
<div class="bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md rounded-xl transition-colors" id="row-linkedin">
<div class="flex items-start gap-space-md">
<div class="pt-1">
<button aria-label="Toggle LinkedIn Sharing" class="w-5 h-5 rounded border border-surface-container-highest bg-surface-container-highest flex items-center justify-center text-transparent hover:text-outline transition-colors" id="toggle-linkedin">
<span class="material-symbols-outlined text-[15px] check-icon">check</span>
</button>
</div>
<div class="w-9 h-9 rounded-lg bg-surface-container-low border border-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
<span class="material-symbols-outlined text-[19px]">public</span>
</div>
<div class="flex flex-col">
<span class="font-title-md text-title-md text-primary font-semibold">Managing Partner LinkedIn Profile</span>
<span class="font-body-md text-body-md text-on-surface-variant mt-0.5 font-mono">linkedin.com/in/aplex-exec-syndicate</span>
</div>
</div>
<div class="flex items-center justify-between md:justify-end gap-space-md pt-2 md:pt-0">
<span class="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide rounded font-medium" id="linkedin-status">
Not Shared
</span>
<button class="h-9 px-space-md bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg border border-surface-container-high transition-colors font-medium" id="btn-share-linkedin">
Share Profile
</button>
</div>
</div>
<!-- Add Custom Channels Button -->
<button class="w-full py-3 bg-surface hover:bg-surface-container-low border border-dashed border-surface-container-high text-on-surface-variant hover:text-primary font-label-md text-label-md rounded-xl flex items-center justify-center gap-2 transition-colors font-medium">
<span class="material-symbols-outlined text-[18px]">add</span>
<span class="">+ OTHERS (CUSTOM DIRECT SECURE CHANNELS)</span>
</button>
</div>
<!-- Action & Dual-Lock Seal Console -->
<div class="bg-surface-container-lowest p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border border-surface-container-high rounded-xl">
<div class="flex items-center gap-space-md">
<div class="w-10 h-10 rounded-lg bg-surface-container-low border border-surface-container-high flex items-center justify-center text-outline flex-shrink-0">
<span class="material-symbols-outlined text-[22px]">fingerprint</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Automated Cryptographic Seal</span>
<span class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Cryptographic timestamp will bind with SHA-512 seal upon mutual bilateral unlock.</span>
</div>
</div>
<div class="flex items-center gap-space-sm flex-shrink-0">
<button class="h-11 px-space-lg bg-surface-container-highest text-outline cursor-not-allowed font-label-md text-label-md rounded-xl flex items-center gap-2 opacity-80 border border-surface-container-highest font-medium" disabled="" title="Counterparty reciprocal key required to execute handshake seal">
<span class="material-symbols-outlined text-[18px]">lock</span>
<span class="">Seal &amp; Complete Handshake</span>
</button>
</div>
</div>
<!-- Cryptographic Ledger Visual Audit Sub-strip -->
<div class="bg-surface-container-lowest p-space-md flex flex-wrap items-center justify-between gap-space-sm text-outline font-label-sm text-label-sm border border-surface-container-high rounded-xl">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="">ESCROW BLOCK REF: <span class="font-mono text-primary font-semibold">#ESC-0092-B7A</span></span>
</div>
<div class="font-mono text-body-sm text-primary">KEY-ID: 7f83b165...e92f (RECURSIVE-BLAKE3)</div>
<div class="px-2 py-0.5 bg-surface-container-low border border-surface-container-high rounded text-primary font-mono text-[11px]">SIGNATURE: APLEX-LEDGER-VALIDATED</div>
</div>
</div>
<!-- Right Column: Summary, Mandate Overview & Security Architecture (4 cols) -->
<div class="lg:col-span-4 flex flex-col gap-space-md">
<!-- Card 1: Agreed Exchange Terms (Stage 03 Sealed) -->
<div class="bg-surface-container-lowest p-space-lg flex flex-col gap-space-md border border-surface-container-high rounded-xl shadow-xs">
<div class="flex items-center justify-between pb-space-xs">
<span class="font-label-sm text-label-sm tracking-wider uppercase text-outline font-semibold">Exchange Summary</span>
<span class="px-2.5 py-0.5 bg-primary text-on-primary font-label-sm text-label-sm uppercase rounded-md flex items-center gap-1 font-semibold">
<span class="material-symbols-outlined text-[13px]">verified</span>
Stage 03 Sealed
</span>
</div>
<div>
<span class="font-headline-sm text-headline-sm text-primary block leading-snug font-semibold">
Confirmed 60% Profit Lead
</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
Underwriting fee split locked via Bilateral Covenant <span class="font-mono text-primary font-semibold">#RL-889-01</span>.
</p>
</div>
<div class="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm border border-surface-container-high">
<div class="flex items-center justify-between text-body-sm">
<span class="text-on-surface-variant font-label-md">Originator Desk</span>
<span class="font-title-md text-title-md text-primary font-semibold">Random Tech Ltd</span>
</div>
<div class="flex items-center justify-between text-body-sm">
<span class="text-on-surface-variant font-label-md">Counterparty Desk</span>
<span class="font-title-md text-title-md text-primary font-semibold">Aplex LLMP (Requester)</span>
</div>
<div class="flex items-center justify-between text-body-sm">
<span class="text-on-surface-variant font-label-md">Settlement Window</span>
<span class="font-title-md text-title-md text-primary font-semibold">72 Hours Post-Handshake</span>
</div>
<div class="flex items-center justify-between text-body-sm">
<span class="text-on-surface-variant font-label-md">Governing Jurisdiction</span>
<span class="font-title-md text-title-md text-primary font-semibold">England &amp; Wales (LMA)</span>
</div>
<div class="flex items-center justify-between text-body-sm">
<span class="text-on-surface-variant font-label-md">Deposit Guarantee</span>
<span class="font-mono font-semibold text-primary">100% Escrow Collateralized</span>
</div>
</div>
<div class="pt-space-xs flex items-center justify-between border-t border-surface-container-high">
<button class="font-label-sm text-label-sm text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1.5 font-semibold transition-colors">
<span class="material-symbols-outlined text-[16px]">description</span>
View Certified Term Docket
</button>
<span class="font-mono text-[11px] text-outline px-1.5 py-0.5 bg-surface-container-low rounded border border-surface-container-high">v2.4.1 SIGNED</span>
</div>
</div>
<!-- Card 2: Zero Contact Leakage Guarantee -->
<div class="bg-surface-container-lowest p-space-lg flex flex-col gap-space-sm border border-surface-container-high rounded-xl">
<div class="flex items-center gap-2">
<div class="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[16px]">shield</span>
</div>
<h4 class="font-title-md text-title-md text-primary font-semibold">Zero Contact Leakage Guarantee</h4>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
No private contact payload will be exposed to either party without mutual reciprocal deposit of the exact corresponding channel. If either party terminates negotiation, all deposited coordinates are permanently purged from the cryptographic enclave.
</p>
<div class="pt-2 flex items-center gap-2 text-outline font-label-sm text-label-sm border-t border-surface-container-high">
<span class="material-symbols-outlined text-[16px] text-primary">terminal</span>
<span class="font-mono text-primary font-medium text-[11px]">ENCLAVE SECURE ATTESTATION VALID</span>
</div>
</div>
<!-- Card 3: Mandate Participant Entity Brief -->
<div class="bg-surface-container-lowest p-space-lg flex flex-col gap-space-sm border border-surface-container-high rounded-xl">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm tracking-wider uppercase text-outline font-semibold">Partner Mandate Profile</span>
<span class="px-2 py-0.5 bg-surface-container border border-surface-container-high text-primary font-label-sm text-label-sm uppercase rounded font-semibold">KYB Verified</span>
</div>
<div class="flex items-center gap-space-sm mt-1">
<div class="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-semibold">
RT
</div>
<div class="flex flex-col">
<span class="font-title-md text-title-md text-primary font-semibold">Random Tech Ltd</span>
<span class="font-body-sm text-body-sm text-outline">Venture Growth Capital • London Desk</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant pt-1 leading-normal">
Authorized representative actively reviewing the handshake protocol payload. Expected turnaround is within standard trading hours.
</p>
</div>
<!-- Card 4: Concierge Mediation Support Link -->
<div class="bg-surface-container-lowest p-space-md flex items-center justify-between gap-space-sm border border-surface-container-high rounded-xl">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded-lg bg-surface-container-low border border-surface-container-high flex items-center justify-center text-outline flex-shrink-0">
<span class="material-symbols-outlined text-[19px]">support_agent</span>
</div>
<div class="flex flex-col">
<span class="font-title-md text-title-md text-primary font-medium">Settlement Concierge</span>
<span class="font-body-sm text-body-sm text-outline">Need bilateral escrow assistance?</span>
</div>
</div>
<button class="h-8 px-space-sm bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider rounded-lg border border-surface-container-high transition-colors font-semibold">
Contact Desk
</button>
</div>
</div>
</div>
</div>
<script>
  (function initHandshakePage() {
    let refreshSeconds = 4;
    const timerEl = document.getElementById('live-timer');
    const refreshBtn = document.getElementById('refresh-state-btn');
    const refreshIcon = document.getElementById('refresh-icon');

    // Update poll timer
    setInterval(() => {
      refreshSeconds++;
      if (timerEl) {
        timerEl.textContent = `Polled ${refreshSeconds} seconds ago`;
      }
    }, 1000);

    // Refresh interaction
    if (refreshBtn && refreshIcon) {
      refreshBtn.addEventListener('click', () => {
        refreshIcon.classList.add('animate-spin');
        setTimeout(() => {
          refreshIcon.classList.remove('animate-spin');
          refreshSeconds = 0;
          if (timerEl) timerEl.textContent = 'Polled just now';
        }, 700);
      });
    }

    // Phone toggling logic
    const btnSharePhone = document.getElementById('btn-share-phone');
    const togglePhone = document.getElementById('toggle-phone');
    const phoneStatus = document.getElementById('phone-status');
    const rowPhone = document.getElementById('row-phone');
    let phoneShared = false;

    function updatePhoneState() {
      phoneShared = !phoneShared;
      if (phoneShared) {
        phoneStatus.textContent = 'Awaiting Partner Phone';
        phoneStatus.className = 'px-2.5 py-1 bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wide rounded';
        btnSharePhone.textContent = 'Revoke Deposit';
        btnSharePhone.className = 'h-9 px-space-md bg-surface text-on-surface-variant hover:text-primary font-label-md text-label-md rounded transition-colors';
        togglePhone.classList.remove('bg-surface-container-highest', 'text-transparent');
        togglePhone.classList.add('bg-primary', 'text-on-primary');
        rowPhone.classList.add('bg-surface-container-low');
      } else {
        phoneStatus.textContent = 'Not Shared';
        phoneStatus.className = 'px-2.5 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide rounded';
        btnSharePhone.textContent = 'Share Phone';
        btnSharePhone.className = 'h-9 px-space-md bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded transition-colors';
        togglePhone.classList.add('bg-surface-container-highest', 'text-transparent');
        togglePhone.classList.remove('bg-primary', 'text-on-primary');
        rowPhone.classList.remove('bg-surface-container-low');
      }
    }

    if (btnSharePhone) btnSharePhone.addEventListener('click', updatePhoneState);
    if (togglePhone) togglePhone.addEventListener('click', updatePhoneState);

    // LinkedIn toggling logic
    const btnShareLinkedin = document.getElementById('btn-share-linkedin');
    const toggleLinkedin = document.getElementById('toggle-linkedin');
    const linkedinStatus = document.getElementById('linkedin-status');
    const rowLinkedin = document.getElementById('row-linkedin');
    let linkedinShared = false;

    function updateLinkedinState() {
      linkedinShared = !linkedinShared;
      if (linkedinShared) {
        linkedinStatus.textContent = 'Awaiting Partner Profile';
        linkedinStatus.className = 'px-2.5 py-1 bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wide rounded';
        btnShareLinkedin.textContent = 'Revoke Deposit';
        btnShareLinkedin.className = 'h-9 px-space-md bg-surface text-on-surface-variant hover:text-primary font-label-md text-label-md rounded transition-colors';
        toggleLinkedin.classList.remove('bg-surface-container-highest', 'text-transparent');
        toggleLinkedin.classList.add('bg-primary', 'text-on-primary');
        rowLinkedin.classList.add('bg-surface-container-low');
      } else {
        linkedinStatus.textContent = 'Not Shared';
        linkedinStatus.className = 'px-2.5 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide rounded';
        btnShareLinkedin.textContent = 'Share Profile';
        btnShareLinkedin.className = 'h-9 px-space-md bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded transition-colors';
        toggleLinkedin.classList.add('bg-surface-container-highest', 'text-transparent');
        toggleLinkedin.classList.remove('bg-primary', 'text-on-primary');
        rowLinkedin.classList.remove('bg-surface-container-low');
      }
    }

    if (btnShareLinkedin) btnShareLinkedin.addEventListener('click', updateLinkedinState);
    if (toggleLinkedin) toggleLinkedin.addEventListener('click', updateLinkedinState);
  })();
</script></div></main><footer class="w-full bg-surface-container-lowest border-t border-surface-container-highest py-space-lg"><div class="max-w-[1600px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-sm text-label-sm"><div class="flex flex-wrap items-center gap-space-lg"><span class="font-headline-sm text-headline-sm uppercase text-primary tracking-tight leading-none">The Relay</span><span class="text-outline">Institutional B2B Mandate Settlement Platform</span><span class="">Institutional Disclosures</span><span class="">Non-Disclosure Agreements</span><span class="">Custody Architecture</span></div><div class="flex items-center gap-space-md text-outline"><span class="font-label-sm text-label-sm">STRICTLY CONFIDENTIAL • CLEARING REF #774-NX</span><span class="">© 2025 The Relay Inc. All rights reserved.</span></div></div></footer>

</body></html>

//when a party is notified that the other party has shared their contact details
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-container-highest":"#e0e3e5","inverse-on-surface":"#eff1f3","on-secondary-fixed":"#0b1c30","primary-fixed-dim":"#bfc7d8","on-primary-container":"#7f8797","surface-bright":"#f7f9fb","tertiary-container":"#112030","outline":"#75777c","primary-fixed":"#dbe3f5","on-background":"#191c1e","on-primary-fixed":"#141c29","surface-tint":"#575f6e","inverse-surface":"#2d3133","on-error":"#ffffff","surface-container-lowest":"#ffffff","surface-variant":"#e0e3e5","on-tertiary":"#ffffff","on-secondary":"#ffffff","secondary-fixed-dim":"#b7c8e1","on-surface":"#191c1e","on-primary-fixed-variant":"#3f4756","tertiary-fixed-dim":"#b9c8de","on-secondary-container":"#54647a","on-tertiary-fixed-variant":"#39485a","inverse-primary":"#bfc7d8","on-tertiary-fixed":"#0d1c2d","on-error-container":"#93000a","error":"#ba1a1a","background":"#f7f9fb","surface":"#f7f9fb","surface-container":"#eceef0","primary":"#010611","primary-container":"#171f2c","error-container":"#ffdad6","surface-container-low":"#f2f4f6","surface-container-high":"#e6e8ea","secondary-container":"#d0e1fb","on-primary":"#ffffff","on-surface-variant":"#45474c","tertiary":"#000712","secondary":"#505f76","secondary-fixed":"#d3e4fe","on-secondary-fixed-variant":"#38485d","tertiary-fixed":"#d4e4fa","surface-dim":"#d8dadc","outline-variant":"#c5c6cc","on-tertiary-container":"#79889c"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"gutter-sm":"1rem","margin-mobile":"1rem","space-xl":"2.5rem","space-lg":"1.5rem","space-sm":"0.5rem","space-xs":"0.25rem","gutter-lg":"2rem","margin":"2rem","space-md":"1rem","gutter":"1.5rem"},"fontFamily":{"headline-md":["Plus Jakarta Sans"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"headline-lg-mobile":["Plus Jakarta Sans"],"body-md":["Inter"],"body-sm":["Inter"],"headline-sm":["Plus Jakarta Sans"],"label-sm":["Inter"],"label-md":["Inter"],"headline-lg":["Plus Jakarta Sans"],"body-lg":["Inter"]},"fontSize":{"headline-md":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"600"}],"display-lg":["48px",{"lineHeight":"56px","letterSpacing":"-0.02em","fontWeight":"700"}],"title-md":["15px",{"lineHeight":"22px","letterSpacing":"-0.005em","fontWeight":"600"}],"headline-lg-mobile":["26px",{"lineHeight":"34px","letterSpacing":"-0.01em","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","letterSpacing":"0em","fontWeight":"400"}],"body-sm":["12px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"400"}],"headline-sm":["18px",{"lineHeight":"26px","letterSpacing":"-0.005em","fontWeight":"600"}],"label-sm":["11px",{"lineHeight":"16px","letterSpacing":"0.04em","fontWeight":"600"}],"label-md":["13px",{"lineHeight":"18px","letterSpacing":"0.01em","fontWeight":"500"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"-0.015em","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"24px","letterSpacing":"0em","fontWeight":"400"}]}}}}</script></head><body class="bg-surface font-body-md text-on-surface antialiased"><header class="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-surface-container-highest"><div class="h-28 w-full"><div class="h-16 w-full max-w-[1600px] mx-auto px-margin flex items-center justify-between gap-gutter border-b border-surface-container-high"><div class="flex items-center gap-space-lg"><div class="flex flex-col"><span class="font-headline-sm text-headline-sm uppercase tracking-tight text-primary leading-none">The Relay</span><span class="font-label-sm text-label-sm uppercase tracking-wider text-outline leading-tight mt-0.5">Opportunity Exchange</span></div><div class="h-6 w-px bg-surface-container-highest"></div><nav class="hidden lg:flex items-center gap-space-lg" data-active-classes="text-primary font-title-md border-b-2 border-primary-container pb-4 pt-4"><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="opportunities" href="#">OPPORTUNITIES</a><a aria-current="page" class="transition-colors text-primary font-title-md border-b-2 border-primary-container pb-4 pt-4" data-path="exchange-hub" href="#">EXCHANGE HUB</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="insights" href="#">INSIGHTS</a></nav></div><div class="flex items-center gap-space-md"><div class="relative hidden md:flex items-center"><span class="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span><input class="h-[38px] w-80 pl-9 pr-12 bg-surface-container-lowest border border-surface-container-highest rounded text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:border-primary-container" placeholder="Search institutional mandates..." type="text"><kbd class="absolute right-2.5 px-1.5 py-0.5 border border-surface-container-highest bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded">⌘K</kbd></div><button aria-label="Notifications" class="w-9 h-9 flex items-center justify-center border border-surface-container-highest rounded bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:border-primary-container transition-all"><span class="material-symbols-outlined text-[20px]">notifications</span></button><div class="h-6 w-px bg-surface-container-highest"></div><div class="flex items-center gap-space-sm pl-space-xs"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="hidden xl:flex flex-col"><span class="font-label-md text-label-md text-primary leading-none">Morgan Sterling</span><span class="font-label-sm text-label-sm text-outline leading-tight mt-0.5">Apex Syndicate</span></div></div></div></div><div class="h-12 w-full max-w-[1600px] mx-auto px-margin flex items-center justify-between text-body-sm font-body-sm bg-surface-container-lowest"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-outline text-[16px]">folder_open</span><span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">Mandate Dossier</span><span class="text-outline">/</span><span class="font-title-md text-title-md text-primary tracking-tight">#DEC318DA: Random Tech Ltd vs Aplex LLMP</span><span class="px-2 py-0.5 border border-primary-container bg-surface-container-lowest font-label-sm text-label-sm uppercase text-primary rounded">HANDSHAKE</span></div><div class="flex items-center gap-space-lg"><div class="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-surface-container-highest rounded"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span><span class="font-label-sm text-label-sm uppercase tracking-wider text-primary">BI-DIRECTIONAL ESCROW ACTIVE</span></div><div class="flex items-center gap-1 text-outline"><span class="material-symbols-outlined text-[15px]">lock</span><span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">CIPHER: AES-256-GCM</span></div></div></div></div></header><main class="w-full pt-28 bg-surface min-h-[calc(100vh-140px)]"><div class="max-w-[1600px] mx-auto px-margin py-space-lg"><div class="flex flex-col w-full">
<!-- Stepper Protocol Tracker -->
<div class="w-full bg-surface-container-lowest p-space-md lg:px-space-lg lg:py- space-md rounded-xl border border-surface-container-high mb-space-lg shadow-sm"><div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"><div class="flex items-center gap-2 sm:gap-4 flex-wrap flex-1"><!-- Stage 01 --><div class="flex items-center gap-2.5"><div class="w-7 h-7 rounded-full bg-surface-container-high border border-surface-container-highest flex items-center justify-center text-primary flex-shrink-0"><span class="material-symbols-outlined text-[15px]">check</span></div><div class="flex flex-col"><span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-semibold">Stage 01</span><span class="font-label-md text-label-md text-on-surface font-medium">Acknowledged</span></div></div><div class="h-px w-6 lg:w-10 bg-surface-container-highest hidden sm:block"></div><!-- Stage 02 --><div class="flex items-center gap-2.5"><div class="w-7 h-7 rounded-full bg-surface-container-high border border-surface-container-highest flex items-center justify-center text-primary flex-shrink-0"><span class="material-symbols-outlined text-[15px]">check</span></div><div class="flex flex-col"><span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-semibold">Stage 02</span><span class="font-label-md text-label-md text-on-surface font-medium">Bilateral Negotiation</span></div></div><div class="h-px w-6 lg:w-10 bg-surface-container-highest hidden sm:block"></div><!-- Stage 03 --><div class="flex items-center gap-2.5"><div class="w-7 h-7 rounded-full bg-surface-container-high border border-surface-container-highest flex items-center justify-center text-primary flex-shrink-0"><span class="material-symbols-outlined text-[15px]">check</span></div><div class="flex flex-col"><span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-semibold">Stage 03</span><span class="font-label-md text-label-md text-on-surface font-medium">Term Agreement</span></div></div><div class="h-px w-6 lg:w-10 bg-surface-container-highest hidden sm:block"></div><!-- Stage 04 Active --><div class="flex items-center gap-2.5"><div class="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary flex items-center gap-2 shadow-sm"><span class="w-2 h-2 rounded-full bg-surface-container-lowest animate-pulse"></span><span class="font-label-sm text-[12px] font-semibold uppercase tracking-wider text-on-primary">Stage 04: Handshake</span></div></div></div><div class="flex items-center gap-3 self-end lg:self-center border-t lg:border-t-0 pt-2 lg:pt-0 border-surface-container-high w-full lg:w-auto justify-between lg:justify-end"><div class="flex items-center gap-2 font-mono text-[11px] text-outline uppercase tracking-wider bg-surface-container-low px-2.5 py-1 rounded border border-surface-container-highest"><span class="">SESSION KEY</span><span class="font-semibold text-primary">#HEX-7718</span></div><button class="p-1.5 rounded bg-surface-container-low border border-surface-container-highest text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center" id="refreshBtn" onclick="triggerRefreshAnimation()" title="Sync Escrow Ledger"><span class="material-symbols-outlined text-[18px] text-on-surface-variant" id="refreshIcon">sync</span></button></div></div></div>
<!-- Primary 2-Column Institutional Grid -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
<!-- Left Column: Handshake Interaction Zone (8 Columns) -->
<div class="xl:col-span-8 flex flex-col gap-space-lg">
<!-- Section Header -->
<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm bg-surface-container-lowest p-space-lg rounded-xl">
<div>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Dual-Key Identity Unlocking</span>
<h1 class="font-headline-md text-headline-md text-primary tracking-tight">Handshake &amp; Contact Exchange</h1>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Select and authorize specific corporate contact coordinates for cryptographically verified disclosure to Aplex LLMP.</p>
</div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-outline">PROTOCOL SYNC:</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-primary uppercase font-semibold">Live Socket</span>
</div>
</div>
<!-- Action Banner: Partner Has Deposited -->
<div class="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-high shadow-sm relative overflow-hidden flex flex-col lg:flex-row gap-space-md items-start lg:items-center justify-between"><div class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div><div class="flex items-start gap-space-md pl-1"><div class="w-12 h-12 rounded-xl bg-surface-container-low border border-surface-container-highest flex-shrink-0 flex items-center justify-center text-primary shadow-xs"><span class="material-symbols-outlined text-[26px]">key</span></div><div class="flex flex-col"><div class="flex items-center gap-2.5 flex-wrap mb-1.5"><h2 class="font-headline-sm text-[18px] font-semibold text-primary tracking-tight">Aplex LLMP Has Shared Their Business Email</h2><span class="font-label-sm text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase font-semibold tracking-wider flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Ready To Unlock</span></div><p class="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">The counterparty desk has deposited their verified Business Email into bilateral escrow. Their identity clears immediately upon reciprocal confirmation. Zero unilateral disclosure occurs.</p></div></div><button class="flex-shrink-0 px-space-lg py-3 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2.5 transition-all shadow-sm hover:shadow self-stretch lg:self-center justify-center" onclick="toggleModal(true)"><span class="">Share Email &amp; Unlock</span><span class="material-symbols-outlined text-[17px]">arrow_forward</span></button></div>
<!-- Contact Exchange Registry -->
<div class="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md shadow-sm"><div class="flex items-center justify-between pb-space-xs border-b border-surface-container-high"><div><h2 class="font-headline-sm text-headline-sm text-primary tracking-tight font-semibold">Escrow Coordinates Matrix</h2><p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Bilateral verification level: Tier-1 Prime Brokerage Multi-Party Clearance</p></div><div class="flex items-center gap-2"><span class="font-label-sm text-[11px] px-2.5 py-1 rounded bg-surface-container-low border border-surface-container-highest text-primary uppercase tracking-wider font-semibold font-mono">1 OF 3 RELEASED</span></div></div><!-- Row 1: Business Email (Active Unlock Pending) --><div class="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-all hover:border-surface-container-highest"><div class="flex items-start gap-space-md"><div class="w-11 h-11 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs"><span class="material-symbols-outlined text-[20px]">mail</span></div><div class="flex flex-col"><div class="flex items-center gap-2.5 flex-wrap"><span class="font-title-md text-title-md text-primary font-semibold">Business Email</span><span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase font-semibold flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Ready To Unlock (Partner Agreed)</span></div><span class="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">Aplex LLMP's institutional email is cryptographically escrowed • Awaiting your reciprocal release</span><div class="mt-2 flex items-center gap-2 font-mono text-[11px] text-outline"><span class="material-symbols-outlined text-[14px]">lock_clock</span><span class="">SHA-256 Digest: <span class="text-primary font-semibold">8f4a...d91c</span></span></div></div></div><button class="px-space-md py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md font-semibold transition-all self-start md:self-center flex items-center gap-2 whitespace-nowrap shadow-xs" onclick="toggleModal(true)"><span class="material-symbols-outlined text-[16px]">lock_open</span><span class="">Share Your Email &amp; Unlock</span></button></div><!-- Row 2: Institutional Phone --><div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-all hover:bg-surface-container-low/50"><div class="flex items-start gap-space-md"><div class="w-11 h-11 rounded-lg bg-surface-container-high border border-surface-container-highest text-primary flex items-center justify-center flex-shrink-0 mt-0.5"><span class="material-symbols-outlined text-[20px]">call</span></div><div class="flex flex-col"><div class="flex items-center gap-2.5 flex-wrap"><span class="font-title-md text-title-md text-primary font-semibold">Direct Institutional Phone</span><span class="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-outline uppercase font-medium">Not Shared</span></div><span class="font-body-sm text-body-sm text-on-surface-variant mt-1">Neither counterparty has deposited a direct institutional trading desk line.</span></div></div><button class="px-space-md py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface border border-surface-container-highest rounded-lg font-label-md text-label-md font-medium transition-all self-start md:self-center whitespace-nowrap" onclick="promptCoordinate('Direct Desk Phone')">Share Phone</button></div><!-- Row 3: Managing Partner Profile --><div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-all hover:bg-surface-container-low/50"><div class="flex items-start gap-space-md"><div class="w-11 h-11 rounded-lg bg-surface-container-high border border-surface-container-highest text-primary flex items-center justify-center flex-shrink-0 mt-0.5"><span class="material-symbols-outlined text-[20px]">badge</span></div><div class="flex flex-col"><div class="flex items-center gap-2.5 flex-wrap"><span class="font-title-md text-title-md text-primary font-semibold">Managing Partner Profile</span><span class="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-outline uppercase font-medium">Not Shared</span></div><span class="font-body-sm text-body-sm text-on-surface-variant mt-1">Optional verified corporate leadership dossier and network credentials.</span></div></div><button class="px-space-md py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface border border-surface-container-highest rounded-lg font-label-md text-label-md font-medium transition-all self-start md:self-center whitespace-nowrap" onclick="promptCoordinate('Partner LinkedIn Profile')">Share Profile</button></div><!-- Add Custom Channel --><button class="p-space-md rounded-lg bg-surface-container-low border border-dashed border-surface-container-highest hover:bg-surface-container-high text-on-surface-variant hover:text-primary font-label-md text-label-md font-medium flex items-center justify-center gap-2 transition-all" onclick="promptCoordinate('Custom Secured Channel')"><span class="material-symbols-outlined text-[18px]">add</span><span class="">Add Custom Authorized Channel (Secure Telegram, Bloomberg Chat, SFTP)</span></button></div>
<!-- Bilateral Vault Timeline Graphic / Activity Log -->
<div class="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md shadow-sm"><div class="flex items-center justify-between"><span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-semibold">Real-Time Cryptographic Handshake Audit</span><span class="flex items-center gap-1.5 font-label-sm text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Ledger Synchronized</span></div><div class="flex flex-col gap-2 font-body-sm text-body-sm"><div class="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest"><div class="flex items-center gap-2.5"><span class="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span><span class="text-on-surface font-semibold">Aplex LLMP</span><span class="text-on-surface-variant">deposited verified routing hash for Business Email</span></div><span class="font-mono text-[11px] text-outline font-medium">14:02:18 UTC</span></div><div class="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest"><div class="flex items-center gap-2.5"><span class="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span><span class="text-on-surface font-semibold">The Relay Core Engine</span><span class="text-on-surface-variant">authenticated Aplex institutional domain integrity</span></div><span class="font-mono text-[11px] text-outline font-medium">14:02:19 UTC</span></div><div class="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest"><div class="flex items-center gap-2.5"><span class="w-2 h-2 rounded-full bg-outline flex-shrink-0 animate-pulse"></span><span class="text-on-surface font-semibold">Random Tech Ltd (Receiver)</span><span class="text-on-surface-variant">handshake prompt queued for recipient authorization</span></div><span class="font-label-sm text-[11px] text-primary font-semibold uppercase bg-surface-container-high px-2 py-0.5 rounded">Awaiting Action</span></div></div></div>
</div>
<!-- Right Column: Deal Summary & Security Enclave (4 Columns) -->
<div class="xl:col-span-4 flex flex-col gap-space-lg">
<!-- Card 1: Agreed Exchange Terms -->
<div class="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md shadow-sm"><div class="flex items-start justify-between"><div class="flex flex-col"><span class="font-label-sm text-[11px] uppercase text-outline tracking-wider font-semibold">Stage 03 Settlement Base</span><h3 class="font-headline-sm text-headline-sm text-primary font-semibold mt-1 tracking-tight">Confirmed 60% Profit Lead</h3></div><span class="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold shadow-xs flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">verified</span>Sealed</span></div><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Underwriting syndicate fee allocation legally bounded by Bilateral Covenant Ref <span class="text-primary font-mono font-semibold">#RL-889-01</span>.</p><div class="h-px w-full bg-surface-container-high"></div><div class="flex flex-col gap-space-sm font-body-sm text-body-sm"><div class="flex justify-between items-center py-1 border-b border-surface-container-high/60"><span class="text-on-surface-variant">Mandate Originator:</span><span class="font-title-md text-title-md text-primary font-semibold">Random Tech Ltd (You)</span></div><div class="flex justify-between items-center py-1 border-b border-surface-container-high/60"><span class="text-on-surface-variant">Counterparty Syndicate:</span><span class="font-title-md text-title-md text-primary font-semibold">Aplex LLMP</span></div><div class="flex justify-between items-center py-1 border-b border-surface-container-high/60"><span class="text-on-surface-variant">Settlement Window:</span><span class="font-title-md text-title-md text-primary font-semibold">72 Hours Post-Handshake</span></div><div class="flex justify-between items-center py-1 border-b border-surface-container-high/60"><span class="text-on-surface-variant">Governing Framework:</span><span class="text-on-surface font-medium">England &amp; Wales (LMA Standard)</span></div><div class="flex justify-between items-center py-1"><span class="text-on-surface-variant">Dispute Escrow Custody:</span><span class="text-on-surface font-medium">The Relay Master Safe</span></div></div><div class="p-space-sm rounded-lg bg-surface-container-low border border-surface-container-highest flex items-center justify-between text-outline font-label-sm text-[11px]"><span class="font-semibold uppercase tracking-wider">COVENANT CHECKSUM</span><span class="font-mono font-semibold text-primary">4CA8-E29B-9910</span></div></div>
<!-- Card 2: Reciprocal Escrow Protection Guarantee -->
<div class="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md shadow-sm"><div class="flex items-center gap-space-sm text-primary"><div class="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary"><span class="material-symbols-outlined text-[20px]">verified_user</span></div><span class="font-title-md text-title-md font-semibold text-primary">Zero Unilateral Disclosure</span></div><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Reciprocal Escrow Guarantee: Information is released strictly in synchronized pairs. If you decline to share a direct contact vector, your corresponding coordinate remains completely shielded and inaccessible to the counterparty.</p><div class="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low border border-surface-container-highest"><span class="material-symbols-outlined text-outline text-[18px]">lock</span><span class="font-label-sm text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Cryptographic Two-Phase Commit Active</span></div></div>
<!-- Card 3: Concierge Escrow Support -->
<div class="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">Institutional Support</span>
<span class="material-symbols-outlined text-outline text-[18px]">support_agent</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Require legal escrow oversight or an authorized settlement agent to sit on the clearing call?
        </p>
<a class="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 pt-1" href="javascript:void(0)" onclick="openSupportModal()">
<span class="">Request Concierge Escrow Officer</span>
<span class="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</div>
</div>
<!-- Interactive Dual-Key Unlock Drawer / Modal Overlay -->
<div class="fixed inset-0 z-50 bg-primary/40 backdrop-blur-[2px] hidden items-center justify-center p-space-md" id="unlockModal">
<div class="bg-surface-container-lowest rounded-xl max-w-xl w-full p-space-xl flex flex-col gap-space-lg animate-in fade-in zoom-in-95 duration-200">
<div class="flex items-start justify-between">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[22px]">swap_horiz</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-primary">Confirm Bilateral Email Release</h3>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">Stage 04 Execution Step</span>
</div>
</div>
<button class="text-outline hover:text-primary p-1" onclick="toggleModal(false)">
<span class="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-1.5 font-body-sm text-body-sm">
<div class="flex items-center justify-between text-outline">
<span class="">COUNTERPARTY PAYLOAD</span>
<span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-primary uppercase">Escrow Locked</span>
</div>
<div class="font-mono text-primary text-body-md truncate">aplex-desk@aplexllmp.partner</div>
<span class="text-on-surface-variant text-body-sm">This email will instantly unmask on your screen once authorized.</span>
</div>
<form class="flex flex-col gap-space-md" onsubmit="handleFinalUnlock(event)">
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-primary">Your Authorized Corporate Email</label>
<input class="h-10 px-space-md rounded bg-surface-container-lowest text-primary font-body-md focus:outline-none focus:ring-1 focus:ring-primary" id="receiverEmailInput" placeholder="name@yourcompany.com" required="" type="email" value="contact@randomtech.com">
<span class="font-body-sm text-body-sm text-on-surface-variant">Default verified institutional address associated with mandate #DEC318DA.</span>
</div>
<div class="p-space-sm rounded bg-surface-container-low flex items-start gap-2 text-on-surface-variant text-body-sm">
<span class="material-symbols-outlined text-outline text-[18px] mt-0.5">verified</span>
<p class="">By proceeding, you grant mutual decryption permission for business emails only. All other direct coordinates remain locked.</p>
</div>
<div class="flex items-center justify-end gap-space-sm pt-space-xs">
<button class="px-space-md py-2.5 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" onclick="toggleModal(false)" type="button">
            Cancel
          </button>
<button class="px-space-md py-2.5 rounded bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-2 transition-all" id="unlockSubmitBtn" type="submit">
<span class="">Authorize &amp; Decrypt Reciprocally</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</form>
</div>
</div>
<!-- Notification Toast Container -->
<div class="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-md py-3 rounded-lg shadow-xl hidden items-center gap-3 transition-opacity" id="toastNotification">
<span class="material-symbols-outlined text-[20px]" id="toastIcon">check_circle</span>
<span class="font-label-md text-label-md" id="toastMessage">Escrow sync complete.</span>
</div>
</div>
<script>
  function toggleModal(show) {
    const modal = document.getElementById('unlockModal');
    if (show) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function showToast(message, isError = false) {
    const toast = document.getElementById('toastNotification');
    const msg = document.getElementById('toastMessage');
    const icon = document.getElementById('toastIcon');
    
    msg.textContent = message;
    icon.textContent = isError ? 'error' : 'check_circle';
    
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    }, 3800);
  }

  function triggerRefreshAnimation() {
    const icon = document.getElementById('refreshIcon');
    icon.classList.add('animate-spin');
    setTimeout(() => {
      icon.classList.remove('animate-spin');
      showToast('Escrow ledger synced with Aplex LLMP enclave.');
    }, 750);
  }

  function promptCoordinate(coordinateName) {
    showToast(`Bilateral request protocol initiated for: ${coordinateName}. Counterparty desk notified.`);
  }

  function openSupportModal() {
    showToast('Escrow Officer dispatched to session room. ETA < 3 minutes.');
  }

  function handleFinalUnlock(e) {
    e.preventDefault();
    const btn = document.getElementById('unlockSubmitBtn');
    btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Decrypting Cryptographic Cipher...</span>`;
    btn.disabled = true;

    setTimeout(() => {
      toggleModal(false);
      btn.innerHTML = `<span>Authorize &amp; Decrypt Reciprocally</span><span class="material-symbols-outlined text-[16px]">arrow_forward</span>`;
      btn.disabled = false;
      showToast('Handshake complete: Aplex LLMP verified address: aplex-desk@aplexllmp.partner unmasked.');
    }, 1200);
  }
</script></div></main><footer class="w-full bg-surface-container-lowest border-t border-surface-container-highest py-space-lg"><div class="max-w-[1600px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-sm text-label-sm"><div class="flex flex-wrap items-center gap-space-lg"><span class="font-headline-sm text-headline-sm uppercase text-primary tracking-tight leading-none">The Relay</span><span class="text-outline">Institutional B2B Mandate Settlement Platform</span><span class="">Institutional Disclosures</span><span class="">Non-Disclosure Agreements</span><span class="">Custody Architecture</span></div><div class="flex items-center gap-space-md text-outline"><span class="font-label-sm text-label-sm">STRICTLY CONFIDENTIAL • CLEARING REF #774-NX</span><span class="">© 2025 The Relay Inc. All rights reserved.</span></div></div></footer>

</body></html>

//when clicking on manage a sheet will appear. This contains the code for that sheet. Dont pick other code just the sheet.
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-secondary-fixed": "#0b1c30", "outline": "#75777c", "error-container": "#ffdad6", "surface-container-high": "#e6e8ea", "background": "#f7f9fb", "outline-variant": "#c5c6cc", "secondary-fixed": "#d3e4fe", "on-secondary": "#ffffff", "surface-container-highest": "#e0e3e5", "surface-bright": "#f7f9fb", "surface": "#f7f9fb", "tertiary-fixed-dim": "#b9c8de", "primary-fixed": "#dbe3f5", "on-primary-fixed-variant": "#3f4756", "on-background": "#191c1e", "inverse-primary": "#bfc7d8", "primary": "#010611", "on-primary-fixed": "#141c29", "secondary-fixed-dim": "#b7c8e1", "on-tertiary-fixed": "#0d1c2d", "on-surface-variant": "#45474c", "primary-container": "#171f2c", "inverse-on-surface": "#eff1f3", "error": "#ba1a1a", "surface-container-lowest": "#ffffff", "tertiary": "#000712", "on-tertiary-container": "#79889c", "secondary-container": "#d0e1fb", "primary-fixed-dim": "#bfc7d8", "on-tertiary-fixed-variant": "#39485a", "secondary": "#505f76", "on-error-container": "#93000a", "on-primary-container": "#7f8797", "surface-tint": "#575f6e", "surface-variant": "#e0e3e5", "on-primary": "#ffffff", "on-secondary-container": "#54647a", "on-secondary-fixed-variant": "#38485d", "tertiary-container": "#112030", "tertiary-fixed": "#d4e4fa", "surface-dim": "#d8dadc", "surface-container-low": "#f2f4f6", "on-tertiary": "#ffffff", "inverse-surface": "#2d3133", "on-surface": "#191c1e", "surface-container": "#eceef0", "on-error": "#ffffff" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "gutter": "1.5rem", "space-lg": "1.5rem", "space-sm": "0.5rem", "space-md": "1rem", "gutter-sm": "1rem", "space-xl": "2.5rem", "margin-mobile": "1rem", "margin": "2rem", "gutter-lg": "2rem", "space-xs": "0.25rem" }, "fontFamily": { "label-sm": ["Inter"], "label-md": ["Inter"], "body-lg": ["Inter"], "headline-md": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "title-md": ["Inter"], "headline-sm": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "body-sm": ["Inter"], "body-md": ["Inter"] }, "fontSize": { "label-sm": ["11px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "600" }], "label-md": ["13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-lg-mobile": ["26px", { "lineHeight": "34px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "title-md": ["15px", { "lineHeight": "22px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "headline-sm": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "600" }], "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-sm": ["12px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "400" }], "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400" }] } } } }</script></head><body class="bg-surface font-body-md text-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-outline-variant"><div class="h-16 w-full max-w-[1600px] mx-auto px-margin flex items-center justify-between gap-space-lg"><div class="flex items-center gap-space-lg shrink-0"><div class="flex items-center gap-space-sm"><img alt="the-relay-logo.png" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xyh03kvE5229vIVVy-0EnA56XDGog_5vhdZEqt9BowKxiWjM7SCAzD1qSuQjHKzx7D2CkGT3TF4BQPlHDE2LhRZOh2gatfiwsymztWwMEDMhYJDIIzj3WfP_c7W3AImDnidGRJ5XJwhz8aJu5eGsujyNMepAXnG1iU5raHzR8ESlJfGZZXCjbR5_upK7sbvSp3NyLKTZbEjlCFIEX2pVxzHdTQNNc3cocseJK9s7Fm_PQSUNq7VbzyeB4W6f-7OK3w3FtXwbej"><div class="flex flex-col leading-none"><span class="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">THE RELAY</span><span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Opportunity Exchange</span></div></div><div class="h-6 w-[1px] bg-outline-variant hidden lg:block"></div><nav class="hidden lg:flex items-center gap-space-md" data-active-classes="text-primary font-title-md border-b-2 border-primary"><a class="h-16 flex items-center px-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" data-path="opportunities" href="#">Opportunities</a><a aria-current="page" class="h-16 flex items-center px-space-xs uppercase tracking-wider transition-colors text-primary font-title-md border-b-2 border-primary" data-path="exchange-hub" href="#">Exchange Hub</a><a class="h-16 flex items-center px-space-xs font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" data-path="deal-intelligence" href="#">Insights</a></nav></div><div class="flex items-center gap-space-md flex-1 max-w-md justify-end"><div class="relative w-full max-w-xs hidden sm:block"><div class="absolute inset-y-0 left-0 pl-space-sm flex items-center pointer-events-none text-on-surface-variant"><span class="material-symbols-outlined text-[18px]">search</span></div><input class="w-full h-9 pl-8 pr-12 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" placeholder="Search institutional mandates..." type="text"><div class="absolute inset-y-0 right-0 pr-space-xs flex items-center pointer-events-none"><kbd class="px-1.5 py-0.5 font-label-sm text-label-sm text-on-surface-variant bg-surface-container border border-outline-variant rounded">⌘K</kbd></div></div><button aria-label="Notifications" class="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:border-primary transition-colors shrink-0"><span class="material-symbols-outlined text-[20px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full max-w-[1600px] mx-auto px-margin pt-16 pb-28 min-h-screen"><div class="flex flex-col w-full text-on-surface">
<!-- Top Session Meta Bar -->
<div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg"><div class="flex flex-col gap-1"><div class="flex items-center gap-space-sm"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Deal Handshake</span><span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span><span class="font-label-sm text-label-sm text-on-surface-variant font-mono">Ref #DEC318DA</span></div><div class="flex items-center gap-space-md flex-wrap"><h1 class="font-headline-lg text-headline-lg tracking-tight text-primary">Random Tech Ltd <span class="font-normal text-on-surface-variant">&amp;</span> Aplex LLMP</h1><span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-medium"><span class="w-2 h-2 rounded-full bg-primary"></span>Stage 04: Handshake</span></div></div><div class="flex items-center gap-space-sm shrink-0"><button class="h-9 px-space-md flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md"><span class="material-symbols-outlined text-[18px]">download</span><span class="">Export Term Sheet</span></button></div></div>
<!-- 4-Stage Institutional Stepper Tracker -->
<div class="w-full bg-surface-container-lowest rounded-lg p-space-lg shadow-sm mb-space-xl"><div class="grid grid-cols-1 md:grid-cols-4 gap-space-md items-center"><div class="flex items-center gap-space-sm"><div class="w-7 h-7 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-label-sm text-label-sm shrink-0 font-semibold"><span class="material-symbols-outlined text-[16px]">check</span></div><div class="flex flex-col leading-tight"><span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Step 1</span><span class="font-title-md text-title-md text-primary font-medium">Acknowledged</span></div><div class="h-0.5 flex-1 bg-surface-container-high hidden md:block"></div></div><div class="flex items-center gap-space-sm"><div class="w-7 h-7 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-label-sm text-label-sm shrink-0 font-semibold"><span class="material-symbols-outlined text-[16px]">check</span></div><div class="flex flex-col leading-tight"><span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Step 2</span><span class="font-title-md text-title-md text-primary font-medium">Negotiated</span></div><div class="h-0.5 flex-1 bg-surface-container-high hidden md:block"></div></div><div class="flex items-center gap-space-sm"><div class="w-7 h-7 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-label-sm text-label-sm shrink-0 font-semibold"><span class="material-symbols-outlined text-[16px]">check</span></div><div class="flex flex-col leading-tight"><span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Step 3</span><span class="font-title-md text-title-md text-primary font-medium">Agreed</span></div><div class="h-0.5 flex-1 bg-surface-container-high hidden md:block"></div></div><div class="flex items-center gap-space-sm"><div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm shrink-0 font-semibold shadow-sm"><span class="">4</span></div><div class="flex flex-col leading-tight"><span class="font-label-sm text-label-sm uppercase text-primary font-semibold">Step 4 • Current</span><span class="font-title-md text-title-md text-primary font-bold">Handshake</span></div></div></div></div>
<!-- Main Grid: Left Execution Workspace & Secondary Intelligence Column -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
<!-- Core Workspace (8 Cols) -->
<div class="lg:col-span-8 flex flex-col gap-space-lg"><div class="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md"><div class="flex flex-col gap-1"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Contact Exchange</span><h2 class="font-headline-sm text-headline-sm text-primary">Select details to exchange with Random Tech Ltd</h2><p class="font-body-sm text-body-sm text-on-surface-variant">Information is exchanged mutually. Details are disclosed only when both sides confirm.</p></div><button class="h-9 px-space-md flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md shrink-0 transition-colors" id="refreshBtn"><span class="material-symbols-outlined text-[18px]" id="refreshIcon">sync</span><span id="refreshText" class="">Refresh Status</span></button></div><div class="bg-surface-container-low rounded-lg p-space-md border border-outline-variant/30 flex items-start gap-space-md"><div class="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary border border-outline-variant/30"><span class="material-symbols-outlined text-[18px]">lock</span></div><div class="flex flex-col"><span class="font-title-md text-title-md text-primary">Mutual Privacy Protection</span><p class="font-body-sm text-body-sm text-on-surface-variant">Each contact parameter is exchanged individually. Your email or phone will only be visible once Random Tech Ltd also provides theirs.</p></div></div><div class="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md"><div class="flex items-center justify-between"><span class="font-title-md text-title-md text-primary font-semibold">Exchange Items</span><span class="font-label-sm text-label-sm text-on-surface-variant">3 items configured</span></div><div class="divide-y divide-outline-variant/30"><div class="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md"><div class="flex items-center gap-space-md"><div class="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0 border border-outline-variant/30"><span class="material-symbols-outlined text-[20px]">mail</span></div><div class="flex flex-col"><div class="flex items-center gap-space-sm"><span class="font-title-md text-title-md text-primary font-medium">Business Email</span><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-label-sm bg-surface-container-high text-primary font-medium" id="badgeEmailStatus"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span>Waiting for counterpart</span></div><span class="font-body-md text-body-md text-primary font-medium">yam.evilzaidi@gmail.com</span><span class="font-body-sm text-body-sm text-on-surface-variant">Ready to exchange</span></div></div><div class="flex items-center gap-space-sm shrink-0"><button class="h-9 px-space-md rounded-lg bg-primary text-on-primary hover:bg-surface-variant hover:text-primary transition-colors font-label-md text-label-md flex items-center gap-1.5" onclick="openSideSheet()"><span class="material-symbols-outlined text-[16px]">tune</span><span class="">Manage</span></button></div></div><div class="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md"><div class="flex items-center gap-space-md"><div class="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 border border-outline-variant/30"><span class="material-symbols-outlined text-[20px]">call</span></div><div class="flex flex-col"><div class="flex items-center gap-space-sm"><span class="font-title-md text-title-md text-primary font-medium">Direct Phone Line</span><span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-label-sm bg-surface-container text-on-surface-variant">Not Shared</span></div><span class="font-body-sm text-body-sm text-on-surface-variant">No phone number added</span></div></div><div class="flex items-center gap-space-sm shrink-0"><button class="h-9 px-space-md rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface transition-colors font-label-md text-label-md flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">add</span><span class="">Add Phone</span></button></div></div><div class="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md"><div class="flex items-center gap-space-md"><div class="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 border border-outline-variant/30"><span class="material-symbols-outlined text-[20px]">link</span></div><div class="flex flex-col"><div class="flex items-center gap-space-sm"><span class="font-title-md text-title-md text-primary font-medium">Executive LinkedIn</span><span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-label-sm bg-surface-container text-on-surface-variant">Not Shared</span></div><span class="font-body-sm text-body-sm text-on-surface-variant">No profile connected</span></div></div><div class="flex items-center gap-space-sm shrink-0"><button class="h-9 px-space-md rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface transition-colors font-label-md text-label-md flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">add</span><span class="">Connect</span></button></div></div></div></div><div class="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md"><div class="flex items-center justify-between"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-primary text-[20px]">verified</span><h3 class="font-title-md text-title-md text-primary font-bold">Ratified Agreement Terms</h3></div><span class="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-medium">Agreed</span></div><div class="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm border border-outline-variant/30"><p class="font-body-md text-body-md text-primary font-medium">Qualified Lead / Referral — 60% of the total profit earned in current fiscal cycle for subsequent 2 operating years.</p><div class="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs border-t border-outline-variant/30"><div class="flex flex-col"><span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Lead Entity</span><span class="font-body-sm text-body-sm text-primary font-semibold">Random Tech Ltd</span></div><div class="flex flex-col"><span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Originator</span><span class="font-body-sm text-body-sm text-primary font-semibold">Aplex LLMP</span></div><div class="flex flex-col"><span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Governing Desk</span><span class="font-body-sm text-body-sm text-primary font-semibold">London Institutional</span></div></div></div></div></div>
<!-- Secondary Intelligence Column (4 Cols) -->
<div class="lg:col-span-4 flex flex-col gap-space-lg"><div class="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md"><div class="flex items-center justify-between"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Counterparty</span><span class="px-2 py-0.5 rounded-full text-[11px] font-label-sm bg-surface-container-low text-primary font-medium">Verified</span></div><div class="flex items-center gap-space-md pb-space-sm border-b border-outline-variant/30"><div class="w-10 h-10 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-title-md text-title-md font-bold">RT</div><div class="flex flex-col"><span class="font-title-md text-title-md text-primary font-semibold">Random Tech Ltd</span><span class="font-body-sm text-body-sm text-on-surface-variant">Enterprise Infrastructure</span></div></div><div class="space-y-space-sm font-body-sm text-body-sm"><div class="flex items-center justify-between"><span class="text-on-surface-variant">Location:</span><span class="text-primary font-medium">United Kingdom</span></div><div class="flex items-center justify-between"><span class="text-on-surface-variant">Exchange Status:</span><span class="text-primary font-medium">Terms Ratified</span></div><div class="flex items-center justify-between"><span class="text-on-surface-variant">Desk Officer:</span><span class="text-primary font-medium">H. Sterling</span></div></div></div><div class="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Handshake Progress</span><div class="flex flex-col gap-3 font-body-sm text-body-sm"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">check_circle</span><span class="font-medium text-primary">Terms agreed &amp; signed</span></div><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">check_circle</span><span class="font-medium text-primary">Your email submitted</span></div><div class="flex items-center gap-2"><span class="material-symbols-outlined text-outline text-[18px]">radio_button_unchecked</span><span class="text-on-surface-variant">Random Tech email pending</span></div><div class="flex items-center gap-2"><span class="material-symbols-outlined text-outline text-[18px]">radio_button_unchecked</span><span class="text-on-surface-variant">Direct connection opens</span></div></div></div></div>
</div>
<!-- Persistent / Controlled RIGHT SIDE SHEET SLIDEOUT -->
<div class="fixed inset-0 bg-primary/40 z-50 transition-opacity duration-300 opacity-0 pointer-events-none" id="sideSheetBackdrop" onclick="closeSideSheet()"></div>
<aside class="fixed top-0 right-0 h-full w-full max-w-lg bg-surface-container-lowest z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 translate-x-full" id="sideSheetPanel"><div class="p-space-lg border-b border-outline-variant/30 flex items-center justify-between shrink-0"><div class="flex flex-col"><h3 class="font-headline-sm text-headline-sm text-primary font-semibold">Exchange Business Email</h3><span class="font-body-sm text-body-sm text-on-surface-variant">With Random Tech Ltd</span></div><button aria-label="Close Slideout" class="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors" onclick="closeSideSheet()"><span class="material-symbols-outlined text-[20px]">close</span></button></div><div class="p-space-lg flex-1 overflow-y-auto flex flex-col gap-space-lg"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><label class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold" for="userEmailInput">Your Email</label><button class="font-label-sm text-label-sm text-primary hover:underline">Change</button></div><div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant"><span class="material-symbols-outlined text-[18px]">mail</span></div><input class="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md font-body-md text-primary font-medium focus:outline-none focus:border-primary" id="userEmailInput" type="email" value="yam.evilzaidi@gmail.com"></div><span class="font-body-sm text-body-sm text-on-surface-variant">Primary business address for Aplex LLMP</span></div><div class="rounded-lg p-space-md bg-surface-container-low border border-outline-variant/30 flex items-start gap-space-md"><div class="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary border border-outline-variant/30"><span class="material-symbols-outlined text-[16px]">lock</span></div><p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">Your email is only unlocked to <strong class="font-semibold text-primary">Random Tech Ltd</strong> once they agree to share theirs. Until then, it stays private.</p></div><div class="p-space-md rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-between"><div class="flex flex-col"><span class="font-label-sm text-label-sm uppercase text-on-surface-variant">Exchange Status</span><span class="font-title-md text-title-md text-primary font-medium" id="sheetStatusLabel">Awaiting their email</span></div><span class="px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-high text-primary font-medium">Pending counterpart</span></div></div><div class="p-space-lg border-t border-outline-variant/30 bg-surface-container-lowest flex flex-col gap-space-sm shrink-0"><button class="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-surface-variant hover:text-primary transition-all font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-sm" id="actionExchangeBtn" onclick="requestExchangeAction()"><span class="material-symbols-outlined text-[18px]">send</span><span class="">Share Email</span></button><button class="w-full h-10 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" onclick="closeSideSheet()">Cancel</button></div></aside>
<!-- Notification Toast Container -->
<div class="fixed top-20 right-6 z-50 bg-primary text-on-primary px-space-md py-space-sm rounded shadow-2xl flex items-center gap-space-sm transition-all duration-300 opacity-0 translate-y-2 pointer-events-none" id="toastNotification">
<span class="material-symbols-outlined text-[18px]">task_alt</span>
<span class="font-label-md text-label-md" id="toastMessage">Status refreshed: Synchronized with Exchange Node.</span>
</div>
<script>
    // Sheet State Management
    function openSideSheet() {
      const backdrop = document.getElementById('sideSheetBackdrop');
      const panel = document.getElementById('sideSheetPanel');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    }

    function closeSideSheet() {
      const backdrop = document.getElementById('sideSheetBackdrop');
      const panel = document.getElementById('sideSheetPanel');
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }

    // Toast helper
    function showToast(text) {
      const toast = document.getElementById('toastNotification');
      const msg = document.getElementById('toastMessage');
      msg.textContent = text;
      toast.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
      toast.classList.add('opacity-100', 'translate-y-0');
      setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
      }, 3500);
    }

    // Refresh Action
    document.getElementById('refreshBtn').addEventListener('click', function() {
      const icon = document.getElementById('refreshIcon');
      const text = document.getElementById('refreshText');
      icon.classList.add('animate-spin');
      text.textContent = 'POLLING NODE...';
      
      setTimeout(() => {
        icon.classList.remove('animate-spin');
        text.textContent = 'REFRESH STATUS';
        showToast('Escrow status updated: Awaiting Random Tech reciprocal consent.');
      }, 900);
    });

    // Exchange Action Simulation
    function requestExchangeAction() {
      const btn = document.getElementById('actionExchangeBtn');
      const statusLabel = document.getElementById('sheetStatusLabel');
      const badge = document.getElementById('badgeEmailStatus');
      
      btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span><span>DISPATCHING PROOF...</span>';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span><span>EXCHANGE COMMITMENT RENEWED</span>';
        btn.classList.remove('bg-primary-container');
        btn.classList.add('bg-primary');
        statusLabel.textContent = 'Reciprocal Ping Transmitted to Random Tech Ltd';
        badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span> Ping Transmitted';
        showToast('Cryptographic handshake request resent to Random Tech Ltd.');
        
        setTimeout(() => {
          btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">send</span><span>REQUEST BUSINESS EMAIL EXCHANGE</span>';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    }

    // Automatically trigger sheet open on initial arrival to directly reflect the prompt specification state
    window.addEventListener('DOMContentLoaded', () => {
      // Open immediately for immediate workflow fidelity
      setTimeout(() => {
        openSideSheet();
      }, 400);
    });
  </script>
</div></main><footer class="w-full bg-surface-container-low border-t border-outline-variant"><div class="w-full max-w-[1600px] mx-auto px-margin py-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md"><div class="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant"><span class="font-title-md text-title-md text-primary uppercase">THE RELAY</span><span class="">Institutional Opportunity Exchange</span><span class="">© 2025 All Rights Reserved</span></div><div class="flex items-center gap-space-lg font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant"><a class="hover:text-primary transition-colors" href="#">Securities Protocol</a><a class="hover:text-primary transition-colors" href="#">Execution Desk</a><a class="hover:text-primary transition-colors" href="#">Compliance &amp; Vault</a><a class="hover:text-primary transition-colors" href="#">Disclosures</a></div></div></footer>

</body></html>