When designing the page use the color scheme present in color_scheme.md and reuse the components from design-system(strict).
jab ko kisi question/knowledge article par comment karega aur wo logged in nahi hai tab hme use General Public wala user consider karenge aur unhe community member bolenge. Jab wo aise comment karega tab uske liye login ko Google wala hi karayenge lekin screen 0 wala ui use dikhega aur login karane ke baad wo screen 1 dekhega then wo screen 2 par apni details setup karega.
1. General public - these types aren't associated to any business, they are people who wants to give their opinion
2. Business who are the members of The Relay
3. Members who are associated with any business registered with Relay, like an HR manager from APLEX LLP company.

Ab jo bhe users hain platform par unke users data mein ek type key bhe add hogi jiski possible values hongi business | community_member | associate

in instructions ko strictly follow karna hai(strict)
//screen 0 - login form
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_blank" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-error-container":"#93000a","inverse-on-surface":"#eff1f3","inverse-surface":"#2d3133","tertiary":"#000712","on-secondary-container":"#54647a","on-primary-fixed-variant":"#3f4756","on-tertiary-container":"#79889c","surface-dim":"#d8dadc","primary":"#010611","on-surface-variant":"#45474c","primary-fixed-dim":"#bfc7d8","secondary-fixed-dim":"#b7c8e1","error-container":"#ffdad6","surface-container-lowest":"#ffffff","secondary":"#505f76","surface-container-highest":"#e0e3e5","on-primary-container":"#7f8797","surface-bright":"#f7f9fb","surface-container-high":"#e6e8ea","on-primary-fixed":"#141c29","on-secondary-fixed-variant":"#38485d","background":"#f7f9fb","on-error":"#ffffff","on-secondary-fixed":"#0b1c30","on-tertiary":"#ffffff","tertiary-fixed-dim":"#b9c8de","tertiary-fixed":"#d4e4fa","on-primary":"#ffffff","secondary-fixed":"#d3e4fe","on-surface":"#191c1e","error":"#ba1a1a","on-tertiary-fixed":"#0d1c2d","primary-container":"#171f2c","on-background":"#191c1e","on-tertiary-fixed-variant":"#39485a","outline":"#75777c","secondary-container":"#d0e1fb","surface-tint":"#575f6e","surface":"#f7f9fb","surface-variant":"#e0e3e5","outline-variant":"#c5c6cc","primary-fixed":"#dbe3f5","inverse-primary":"#bfc7d8","surface-container":"#eceef0","on-secondary":"#ffffff","surface-container-low":"#f2f4f6","tertiary-container":"#112030"},borderRadius:{DEFAULT:"0.125rem",lg:"0.25rem",xl:"0.5rem",full:"0.75rem"},spacing:{"space-xl":"2.5rem","gutter-lg":"2rem","gutter":"1.5rem","space-xs":"0.25rem","margin-mobile":"1rem","space-sm":"0.5rem","gutter-sm":"1rem","space-md":"1rem","space-lg":"1.5rem","margin":"2rem"},fontFamily:{"headline-md":["Plus Jakarta Sans"],"body-lg":["Inter"],"headline-lg":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"label-sm":["Inter"],"label-md":["Inter"],"body-md":["Inter"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"body-sm":["Inter"],"headline-lg-mobile":["Plus Jakarta Sans"]},fontSize:{"headline-md":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"600"}],"body-lg":["16px",{lineHeight:"24px",letterSpacing:"0em",fontWeight:"400"}],"headline-lg":["32px",{lineHeight:"40px",letterSpacing:"-0.015em",fontWeight:"600"}],"headline-sm":["18px",{lineHeight:"26px",letterSpacing:"-0.005em",fontWeight:"600"}],"label-sm":["11px",{lineHeight:"16px",letterSpacing:"0.04em",fontWeight:"600"}],"label-md":["13px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"500"}],"body-md":["14px",{lineHeight:"20px",letterSpacing:"0em",fontWeight:"400"}],"display-lg":["48px",{lineHeight:"56px",letterSpacing:"-0.02em",fontWeight:"700"}],"title-md":["15px",{lineHeight:"22px",letterSpacing:"-0.005em",fontWeight:"600"}],"body-sm":["12px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"400"}],"headline-lg-mobile":["26px",{lineHeight:"34px",letterSpacing:"-0.01em",fontWeight:"600"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-center items-center"><main class="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin bg-background"><div class="flex flex-col w-full">
<div class="w-full py-space-xl flex flex-col items-center justify-center">
<!-- Breadcrumb & Step Metadata -->
<div class="w-full max-w-2xl mb-space-md flex items-center justify-between">
<div class="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
<span>Knowledge Discussion</span>
<span class="material-symbols-outlined text-outline text-[14px]">chevron_right</span>
<span class="text-primary font-semibold">Contributor Access</span>
</div>
<div class="flex items-center gap-space-xs bg-surface-container px-3 py-1 rounded-full text-secondary font-label-sm text-label-sm">
<span class="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
<span>Step 01 / 03</span>
</div>
</div>
<!-- Main Registration Surface -->
<div class="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-sm p-space-lg md:p-space-xl transition-all duration-300">
<!-- Header Block -->
<div class="mb-space-lg">
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-secondary text-label-sm font-label-sm uppercase tracking-wide mb-space-sm">
<span class="material-symbols-outlined text-[14px]">shield_person</span>
<span>Individual Accreditation</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight mb-space-xs">
          Join as a Community Member
        </h1>
<p class="font-body-md text-body-md text-secondary leading-relaxed">
          Contribute perspectives, ask questions, and share operational lessons across verified industry playbooks.
        </p>
</div>
<!-- Quick Fast Auth -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-lg">
<button class="group flex items-center justify-center gap-space-sm h-11 px-4 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md transition-colors duration-150 shadow-sm" type="button">
<svg class="w-4 h-4 shrink-0" viewbox="0 0 24 24">
<path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
<path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
<path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
<path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
</svg>
<span>Continue with Google</span>
</button>
<button class="group flex items-center justify-center gap-space-sm h-11 px-4 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md transition-colors duration-150 shadow-sm" type="button">
<svg class="w-4 h-4 shrink-0 fill-[#0A66C2]" viewbox="0 0 24 24">
<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37z"></path>
</svg>
<span>Continue with LinkedIn</span>
</button>
</div>
<!-- Divider -->
<div class="relative flex items-center justify-center mb-space-lg">
<div class="w-full h-px bg-surface-container-high"></div>
<span class="absolute px-3 bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase tracking-wider">
          Or register with professional work email
        </span>
</div>
<!-- Form Inputs -->
<form class="space-y-space-md" id="registrationForm" onsubmit="event.preventDefault();">
<!-- Two Column Inputs -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div class="space-y-1.5">
<label class="block font-label-md text-label-md text-primary font-medium" for="fullName">
              Full Name
            </label>
<div class="relative">
<input class="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-primary font-body-md text-body-md placeholder:text-outline-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all" id="fullName" placeholder="e.g. Sarah Koenig" required="" type="text"/>
</div>
</div>
<div class="space-y-1.5">
<label class="block font-label-md text-label-md text-primary font-medium" for="workEmail">
              Work / Professional Email
            </label>
<div class="relative">
<input class="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-primary font-body-md text-body-md placeholder:text-outline-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all" id="workEmail" placeholder="e.g. sarah@designops.co" required="" type="email"/>
</div>
</div>
</div>
<!-- Role Title -->
<div class="space-y-1.5">
<label class="block font-label-md text-label-md text-primary font-medium" for="currentRole">
            Current Role / Title
          </label>
<div class="relative">
<input class="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-primary font-body-md text-body-md placeholder:text-outline-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all" id="currentRole" placeholder="e.g. Principal Systems Designer or Supply Chain Strategy Lead" required="" type="text"/>
</div>
</div>
<!-- Domain Selection -->
<div class="space-y-1.5">
<label class="block font-label-md text-label-md text-primary font-medium" for="expertiseDomain">
            Primary Expertise Domain
          </label>
<div class="relative">
<select class="w-full h-11 px-3.5 pr-10 rounded-lg bg-surface-container-lowest text-primary font-body-md text-body-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all cursor-pointer" id="expertiseDomain" required="">
<option class="text-outline-variant" disabled="" selected="" value="">Select verified domain of practice...</option>
<option value="logistics">Logistics &amp; Supply Chain</option>
<option value="engineering">Engineering &amp; Infrastructure</option>
<option value="talent">Hiring &amp; Executive Talent</option>
<option value="sales">Sales &amp; Distribution</option>
<option value="finance">Finance &amp; Capital</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-secondary">
<span class="material-symbols-outlined text-[20px]">unfold_more</span>
</div>
</div>
</div>
<!-- Operational Standards Box -->
<div class="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm mt-space-md">
<div class="pt-0.5">
<input class="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary" id="termsCheckbox" required="" type="checkbox"/>
</div>
<label class="font-body-sm text-body-sm text-secondary cursor-pointer select-none leading-snug" for="termsCheckbox">
            I agree to <span class="text-primary font-medium">The Relay Community Standards</span> (Strict zero-solicitation policy; factual operational commentary and vetted teardowns only).
          </label>
</div>
<!-- Submit Button -->
<div class="pt-space-sm">
<button class="w-full h-12 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors duration-150 shadow-md group" type="submit">
<span>Continue to Profile Details</span>
<span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</form>
<!-- Institutional Privacy Sub-text -->
<div class="mt-space-md pt-space-md border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between text-outline font-label-sm text-label-sm gap-2">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px]">lock</span>
<span>Enterprise SSO &amp; End-to-End Key Encryption</span>
</div>
<div>
<span>Verification SLA: &lt; 2 business hours</span>
</div>
</div>
</div>
<!-- Notice Badge for Commercial / Leadflow Users -->
<div class="w-full max-w-2xl mt-space-lg">
<div class="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm transition-all hover:bg-surface-container">
<div class="flex items-center gap-space-sm text-left">
<div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary shrink-0">
<span class="material-symbols-outlined text-[18px]">swap_horizontal_circle</span>
</div>
<div>
<p class="font-title-md text-title-md text-primary">Need commercial dealflow or trade capacity?</p>
<p class="font-body-sm text-body-sm text-secondary">Looking to post commercial dealflow or trade unserviceable leads?</p>
</div>
</div>
<a class="shrink-0 text-primary font-label-md text-label-md hover:underline inline-flex items-center gap-1 font-semibold" href="#switch-business">
<span>Switch to Verified Business</span>
<span class="material-symbols-outlined text-[16px]">arrow_outward</span>
</a>
</div>
</div>
</div>
</div></main></body></html>
//screen 1 - desktop view
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-error-container":"#93000a","inverse-on-surface":"#eff1f3","inverse-surface":"#2d3133","tertiary":"#000712","on-secondary-container":"#54647a","on-primary-fixed-variant":"#3f4756","on-tertiary-container":"#79889c","surface-dim":"#d8dadc","primary":"#010611","on-surface-variant":"#45474c","primary-fixed-dim":"#bfc7d8","secondary-fixed-dim":"#b7c8e1","error-container":"#ffdad6","surface-container-lowest":"#ffffff","secondary":"#505f76","surface-container-highest":"#e0e3e5","on-primary-container":"#7f8797","surface-bright":"#f7f9fb","surface-container-high":"#e6e8ea","on-primary-fixed":"#141c29","on-secondary-fixed-variant":"#38485d","background":"#f7f9fb","on-error":"#ffffff","on-secondary-fixed":"#0b1c30","on-tertiary":"#ffffff","tertiary-fixed-dim":"#b9c8de","tertiary-fixed":"#d4e4fa","on-primary":"#ffffff","secondary-fixed":"#d3e4fe","on-surface":"#191c1e","error":"#ba1a1a","on-tertiary-fixed":"#0d1c2d","primary-container":"#171f2c","on-background":"#191c1e","on-tertiary-fixed-variant":"#39485a","outline":"#75777c","secondary-container":"#d0e1fb","surface-tint":"#575f6e","surface":"#f7f9fb","surface-variant":"#e0e3e5","outline-variant":"#c5c6cc","primary-fixed":"#dbe3f5","inverse-primary":"#bfc7d8","surface-container":"#eceef0","on-secondary":"#ffffff","surface-container-low":"#f2f4f6","tertiary-container":"#112030"},borderRadius:{DEFAULT:"0.125rem",lg:"0.25rem",xl:"0.5rem",full:"0.75rem"},spacing:{"space-xl":"2.5rem","gutter-lg":"2rem","gutter":"1.5rem","space-xs":"0.25rem","margin-mobile":"1rem","space-sm":"0.5rem","gutter-sm":"1rem","space-md":"1rem","space-lg":"1.5rem","margin":"2rem"},fontFamily:{"headline-md":["Plus Jakarta Sans"],"body-lg":["Inter"],"headline-lg":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"label-sm":["Inter"],"label-md":["Inter"],"body-md":["Inter"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"body-sm":["Inter"],"headline-lg-mobile":["Plus Jakarta Sans"]},fontSize:{"headline-md":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"600"}],"body-lg":["16px",{lineHeight:"24px",letterSpacing:"0em",fontWeight:"400"}],"headline-lg":["32px",{lineHeight:"40px",letterSpacing:"-0.015em",fontWeight:"600"}],"headline-sm":["18px",{lineHeight:"26px",letterSpacing:"-0.005em",fontWeight:"600"}],"label-sm":["11px",{lineHeight:"16px",letterSpacing:"0.04em",fontWeight:"600"}],"label-md":["13px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"500"}],"body-md":["14px",{lineHeight:"20px",letterSpacing:"0em",fontWeight:"400"}],"display-lg":["48px",{lineHeight:"56px",letterSpacing:"-0.02em",fontWeight:"700"}],"title-md":["15px",{lineHeight:"22px",letterSpacing:"-0.005em",fontWeight:"600"}],"body-sm":["12px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"400"}],"headline-lg-mobile":["26px",{lineHeight:"34px",letterSpacing:"-0.01em",fontWeight:"600"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between"><div class="flex items-center gap-space-md"><img alt="the-relay-logo.png" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xyh03kvE5229vIVVy-0EnA56XDGog_5vhdZEqt9BowKxiWjM7SCAzD1qSuQjHKzx7D2CkGT3TF4BQPlHDE2LhRZOh2gatfiwsymztWwMEDMhYJDIIzj3WfP_c7W3AImDnidGRJ5XJwhz8aJu5eGsujyNMepAXnG1iU5raHzR8ESlJfGZZXCjbR5_upK7sbvSp3NyLKTZbEjlCFIEX2pVxzHdTQNNc3cocseJK9s7Fm_PQSUNq7VbzyeB4W6f-7OK3w3FtXwbej"><span class="font-title-md text-title-md text-primary tracking-tight">The Relay</span><span class="hidden lg:inline-block font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant">Executive Member Portal</span></div><nav class="hidden md:flex items-center gap-gutter" data-active-classes="text-primary font-title-md"><a aria-current="page" class="transition-colors text-primary font-title-md" data-path="knowledge-base" href="#">Knowledge Base</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="opportunities" href="#">Opportunities</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="insights" href="#">Insights</a></nav><div class="flex items-center gap-space-md"><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-1.5 transition-colors" data-path="sign-in" href="#">Sign In</a><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin pt-16 bg-background"><div class="flex flex-col w-full relative">
<!-- Underlay Knowledge Article Context (Simulated screen background with authentic financial syndication context) -->
<div aria-hidden="true" class="w-full pointer-events-none select-none opacity-40 filter blur-[1.5px] transition-all duration-300">
<!-- Breadcrumb & Article Header Context -->
<div class="flex flex-col gap-space-sm pb-space-lg">
<div class="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
<span class="">Knowledge Base</span>
<span class="">/</span>
<span class="">Cross-Border Buyouts</span>
<span class="">/</span>
<span class="text-primary font-semibold">Article #KB-8924</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-primary max-w-4xl">
        Navigating Bilateral Escrow Structuring in Multi-Jurisdiction Carve-Outs: Q1 Analysis
      </h1>
<div class="flex items-center gap-space-md font-label-md text-label-md text-secondary">
<span class="">Authored by M&amp;A Syndicate Group</span>
<span class="">•</span>
<span class="">Published 48 hours ago</span>
<span class="">•</span>
<span class="">26 Executive Responses</span>
</div>
</div>
<!-- Article Teaser Body -->
<div class="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col gap-space-md">
<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
        Cross-border divestitures involving target assets spanning UK, DACH, and North American tax structures require distinct escrow mechanisms to shield non-operating working capital holdbacks. When carve-out entities inherit legacy supplier obligations, syndicates must establish unified clearing accounts prior to preliminary CFIUS submission...
      </p>
<div class="h-px w-full bg-outline-variant opacity-40 my-space-sm"></div>
<!-- Simulated Discussion Head & Comment Mockups -->
<div class="flex items-center justify-between">
<h3 class="font-headline-sm text-headline-sm text-primary">Executive Discussions &amp; Peer Inquiry</h3>
<span class="font-label-sm text-label-sm uppercase bg-surface-container px-space-sm py-1 rounded text-on-surface-variant">Closed Peer Circle</span>
</div>
<!-- Comment Box Placeholder -->
<div class="bg-surface-container-low p-space-lg rounded flex flex-col gap-space-md">
<div class="h-20 bg-surface-container-lowest rounded p-space-md text-on-surface-variant font-body-md flex items-center justify-between">
<span class="">Draft your executive commentary or case citation...</span>
<span class="px-space-md py-2 bg-primary-container text-on-primary rounded font-label-md text-label-md">Post Commentary</span>
</div>
</div>
</div>
</div>
<!-- Executive Membership Selection Modal Overlay (Pinned rigorously over the view) -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-margin-mobile md:p-margin bg-primary-container/40">
<!-- Click Outside Dismiss Trap (Esc or Backdrop) -->
<div class="relative w-full max-w-4xl bg-surface-container-lowest rounded-lg shadow-xl overflow-hidden flex flex-col">
<!-- Top Monochromatic Accent Rail & Status Header -->
<div class="w-full bg-surface-container-low px-space-lg md:px-space-xl py-space-md flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Authentication Tier Verification Required</span>
</div>
<button class="flex items-center gap-1 font-label-sm text-label-sm uppercase text-secondary hover:text-primary transition-colors focus:outline-none" onclick="history.back()" title="Close modal" type="button">
<span class="">Cancel &amp; Return</span>
<span class="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
<!-- Modal Core Container -->
<div class="p-space-lg md:p-space-xl flex flex-col gap-space-lg">
<!-- Header Text Section -->
<div class="flex flex-col gap-space-xs text-left max-w-2xl"><h2 class="font-headline-lg text-headline-lg text-primary tracking-tight">Choose Your Account Type</h2><p class="font-body-md text-body-md text-on-surface-variant">Select your participation level to join the discussion.</p></div>
<!-- Tier Comparison Grid (Swiss Minimalist Structural Cards) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter items-stretch">
<!-- TIER 2: Community Member (Prominent Option on Left for Faster Frictionless Entry) -->
<div class="flex flex-col justify-between bg-surface-container-lowest p-space-lg rounded transition-all hover:bg-surface-bright flex-1 relative group"><div class="flex flex-col gap-space-md"><div class="flex items-start justify-between"><div class="flex flex-col"><span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Tier I</span><h3 class="font-headline-sm text-headline-sm text-primary mt-0.5">Community Member</h3></div><span class="font-label-sm text-label-sm uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary font-semibold">Instant</span></div><p class="font-body-md text-body-md text-on-surface-variant min-h-[48px]">Join as an individual to discuss playbooks, ask questions, and share insights.</p><div class="flex flex-col gap-space-xs pt-space-xs"><div class="flex items-center gap-space-sm font-label-md text-label-md text-on-surface"><span class="material-symbols-outlined text-[18px] text-primary">check</span><span class="">Unrestricted article discussion</span></div><div class="flex items-center gap-space-sm font-label-md text-label-md text-on-surface"><span class="material-symbols-outlined text-[18px] text-primary">check</span><span class="">Direct Q&amp;A with authors</span></div><div class="flex items-center gap-space-sm font-label-md text-label-md text-on-surface"><span class="material-symbols-outlined text-[18px] text-primary">check</span><span class="">Instant access (No KYB required)</span></div><div class="flex items-center gap-space-sm font-label-md text-label-md text-outline"><span class="material-symbols-outlined text-[18px] text-outline">remove</span><span class="">Excludes commercial dealrooms</span></div></div></div><div class="pt-space-lg mt-space-md"><a class="w-full flex items-center justify-between px-space-md py-3 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-primary-container transition-all group-hover:translate-x-1" data-path="onboarding-community" href="#"><span class="font-semibold tracking-wide">Join as Community Member</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span></a><span class="block text-center font-body-sm text-body-sm text-secondary mt-2">Instant activation</span></div></div>
<!-- TIER 1: Verified Business Account (Institutional Tier) -->
<div class="flex flex-col justify-between bg-surface-container-low p-space-lg rounded transition-all hover:bg-surface-container flex-1 relative group"><div class="flex flex-col gap-space-md"><div class="flex items-start justify-between"><div class="flex flex-col"><span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Tier II</span><h3 class="font-headline-sm text-headline-sm text-primary mt-0.5">Verified Business Account</h3></div><span class="font-label-sm text-label-sm uppercase px-2 py-0.5 rounded bg-primary text-on-primary font-semibold">KYB Required</span></div><p class="font-body-md text-body-md text-on-surface-variant min-h-[48px]">Represent a verified company to access bilateral dealrooms and post official responses.</p><div class="flex flex-col gap-space-xs pt-space-xs"><div class="flex items-center gap-space-sm font-label-md text-label-md text-on-surface"><span class="material-symbols-outlined text-[18px] text-primary">verified_user</span><span class="">Verified Entity badge</span></div><div class="flex items-center gap-space-sm font-label-md text-label-md text-on-surface"><span class="material-symbols-outlined text-[18px] text-primary">hub</span><span class="">Bilateral dealrooms &amp; LOI exchange</span></div><div class="flex items-center gap-space-sm font-label-md text-label-md text-on-surface"><span class="material-symbols-outlined text-[18px] text-primary">contract</span><span class="">Direct commercial proposals</span></div><div class="flex items-center gap-space-sm font-label-md text-label-md text-on-surface"><span class="material-symbols-outlined text-[18px] text-primary">shield</span><span class="">Multi-seat team access</span></div></div></div><div class="pt-space-lg mt-space-md"><a class="w-full flex items-center justify-between px-space-md py-3 bg-surface-container-lowest text-primary rounded font-label-md text-label-md hover:bg-surface-bright transition-all shadow-sm group-hover:translate-x-1" data-path="onboarding-corporate-kyb" href="#"><span class="font-semibold tracking-wide">Apply as Verified Business</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span></a><span class="block text-center font-body-sm text-body-sm text-secondary mt-2">Verification SLA: 24–48h</span></div></div>
</div>
<!-- Trust & Signal Footnote Microcopy -->
<div class="w-full bg-surface-container-low p-space-md rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-[20px] text-primary">gavel</span><span class="font-label-md text-label-md text-primary font-semibold">Syndicate Standard:</span><span class="font-body-md text-body-md text-on-surface-variant">Zero spam. Zero cold outreach. Real operators only.</span></div><div class="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary whitespace-nowrap"><span class="material-symbols-outlined text-[16px] text-outline">lock</span><span class="">256-bit Enclave</span></div></div>
<!-- Sign-In Transition for Existing Credentials -->
<div class="flex items-center justify-center gap-space-xs font-body-sm text-body-sm text-secondary pt-space-xs"><span class="">Already have an account?</span><a class="font-title-md text-body-sm text-primary hover:underline transition-all font-semibold" data-path="sign-in" href="#">Sign in</a></div>
</div>
</div>
</div>
</div></main><footer class="w-full bg-surface-container-low mt-space-xl py-space-xl"><div class="max-w-[1600px] mx-auto px-margin-mobile md:px-margin flex flex-col md:flex-row items-start md:items-center justify-between gap-gutter text-on-surface-variant"><div class="flex flex-col gap-space-xs"><span class="font-title-md text-title-md text-primary">The Relay Syndicate &amp; Executive Network</span><span class="font-body-sm text-body-sm max-w-xl">Confidentiality Notice: Material contained within this executive portal is intended strictly for vetted partners, sovereign allocators, and accredited syndicate fellows. Past deal velocity and co-investment returns do not guarantee forward syndication outcomes.</span></div><div class="flex flex-col items-start md:items-end gap-space-xs"><div class="flex items-center gap-space-md font-label-sm text-label-sm"><a class="text-on-surface-variant hover:text-on-surface transition-colors" data-path="membership-terms" href="#">Terms of Admission</a><a class="text-on-surface-variant hover:text-on-surface transition-colors" data-path="compliance-disclosures" href="#">Regulatory Disclosures</a><a class="text-on-surface-variant hover:text-on-surface transition-colors" data-path="governance" href="#">Syndicate Governance</a></div><span class="font-body-sm text-body-sm text-outline">© 2025 The Relay. All rights reserved. Registered private placement network.</span></div></div></footer>

</body></html>

//screeen 1 - mobile view 
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"><meta content="mobile_stack" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { colors: { "on-secondary-fixed-variant": "#38485d", "primary-fixed-dim": "#bfc7d8", "on-primary-container": "#7f8797", "tertiary-fixed": "#d4e4fa", "inverse-on-surface": "#eff1f3", "on-surface-variant": "#45474c", "tertiary": "#000712", "inverse-primary": "#bfc7d8", "on-tertiary": "#ffffff", "surface-tint": "#575f6e", "secondary-fixed-dim": "#b7c8e1", "outline-variant": "#c5c6cc", "outline": "#75777c", "surface-container-highest": "#e0e3e5", "surface-container-high": "#e6e8ea", "tertiary-container": "#112030", "background": "#f7f9fb", "surface-dim": "#d8dadc", "surface-variant": "#e0e3e5", "tertiary-fixed-dim": "#b9c8de", "on-tertiary-container": "#79889c", "surface": "#f7f9fb", "on-secondary-fixed": "#0b1c30", "on-secondary": "#ffffff", "on-background": "#191c1e", "on-error": "#ffffff", "on-error-container": "#93000a", "on-tertiary-fixed-variant": "#39485a", "on-primary-fixed-variant": "#3f4756", "error": "#ba1a1a", "surface-container-low": "#f2f4f6", "secondary-container": "#d0e1fb", "primary": "#010611", "on-surface": "#191c1e", "on-secondary-container": "#54647a", "primary-fixed": "#dbe3f5", "inverse-surface": "#2d3133", "surface-bright": "#f7f9fb", "on-primary": "#ffffff", "secondary": "#505f76", "surface-container": "#eceef0", "error-container": "#ffdad6", "primary-container": "#171f2c", "secondary-fixed": "#d3e4fe", "on-primary-fixed": "#141c29", "surface-container-lowest": "#ffffff", "on-tertiary-fixed": "#0d1c2d" }, borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, spacing: { "space-lg": "1.5rem", "margin-mobile": "1rem", "gutter-lg": "2rem", "space-xs": "0.25rem", "margin": "2rem", "gutter": "1.5rem", "gutter-sm": "1rem", "space-sm": "0.5rem", "space-xl": "2.5rem", "space-md": "1rem" }, fontFamily: { "body-sm": ["Inter"], "body-lg": ["Inter"], "title-md": ["Inter"], "headline-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Inter"], "headline-sm": ["Plus Jakarta Sans"], "label-md": ["Inter"], "headline-lg": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "body-md": ["Inter"] }, fontSize: { "body-sm": ["12px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "400" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "title-md": ["15px", { "lineHeight": "22px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "headline-lg-mobile": ["26px", { "lineHeight": "34px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "label-sm": ["11px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "600" }], "headline-sm": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "label-md": ["13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "600" }], "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400" }] } } } }</script><style>@layer base{html,body{width:100%;margin:0;padding:0;}body{overscroll-behavior-y:none;font-family:'Inter',sans-serif;}.pb-safe{padding-bottom:env(safe-area-inset-bottom,0px);}.pt-safe{padding-top:env(safe-area-inset-top,0px);}}::-webkit-scrollbar{display:none;}</style></head><body class="bg-surface text-on-surface antialiased flex flex-col min-h-screen"><header class="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe"><div class="h-14 px-4 flex items-center justify-between border-b border-surface-container-highest/60"><button aria-label="Close" class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors active:scale-95" onclick="history.back()" type="button"><span class="material-symbols-outlined text-[18px]">close</span></button><div class="flex items-center gap-2"><div class="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-on-primary font-bold text-[12px] tracking-wider">R</div><span class="font-headline-sm text-[15px] font-semibold text-primary tracking-tight">THE RELAY</span></div><div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-secondary text-[11px] font-medium tracking-wide"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span class="">Secure Auth</span></div></div></header><main class="flex flex-col relative w-full pt-14 pb-safe bg-surface"><div class="flex flex-col w-full min-h-[calc(100vh-3.5rem)] justify-between pb-32"><div class="px-4 pt-6 max-w-[460px] mx-auto w-full flex flex-col gap-6"><!-- Step & Title Header --><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-medium uppercase tracking-wider"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span>Step 1 of 2</span><span class="text-[11px] font-semibold text-secondary uppercase tracking-widest">Tier Selection</span></div><h1 class="font-headline-lg-mobile text-[26px] font-bold text-on-background tracking-tight mt-1">Select your workspace tier</h1><p class="font-body-sm text-[13px] text-secondary leading-relaxed">Choose an individual operator account or submit credentials for a corporate syndicate dealroom.</p></div><!-- Tier Cards Container --><div class="flex flex-col gap-3.5" id="tier-selector-group"><!-- Tier 1: Community Member (Default Selected) --><div id="tier-card-community" onclick="selectTier('community')" class="group relative flex flex-col p-4 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.995]"><div class="flex items-start justify-between gap-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 border border-surface-container-highest"><span class="material-symbols-outlined text-primary text-[20px]">person</span></div><div><div class="flex items-center gap-2"><h3 class="text-[15px] font-bold text-on-surface tracking-tight">Community Member</h3><span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase tracking-wide border border-emerald-200/60"><span class="material-symbols-outlined text-[11px]">bolt</span> Instant</span></div><p class="text-[12px] text-secondary font-normal">Individual Practitioner &amp; Operator</p></div></div><!-- Modern Radio Indicator --><div id="radio-community" class="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center shrink-0 mt-0.5 transition-colors"><div class="w-2 h-2 rounded-full bg-on-primary"></div></div></div><p class="text-[12.5px] text-on-surface-variant mt-3 leading-relaxed">Join bilateral article discussions, operational playbooks, and peer-to-peer Q&amp;A sessions without waiting for verification audits.</p><!-- Micro Capabilities List --><div class="mt-3 pt-3 border-t border-surface-container grid grid-cols-1 gap-1.5"><div class="flex items-center gap-2 text-[12px] text-on-surface"><span class="material-symbols-outlined text-emerald-600 text-[15px] shrink-0">check_circle</span><span class="">Full access to technical playbooks &amp; briefings</span></div><div class="flex items-center gap-2 text-[12px] text-on-surface"><span class="material-symbols-outlined text-emerald-600 text-[15px] shrink-0">check_circle</span><span class="">Direct commentary &amp; Q&amp;A with verified authors</span></div><div class="flex items-center gap-2 text-[12px] text-secondary"><span class="material-symbols-outlined text-outline-variant text-[15px] shrink-0">remove</span><span class="">Excludes bilateral LOI dealrooms &amp; syndicate syndication</span></div></div><div class="mt-3 flex items-center justify-between text-[11px] text-secondary pt-1"><span class="font-medium text-primary">Free Operator Access</span><span class="">Instant activation • 0s wait</span></div></div><!-- Tier 2: Verified Business --><div id="tier-card-business" onclick="selectTier('business')" class="group relative flex flex-col p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-highest hover:border-outline-variant shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.995]"><div class="flex items-start justify-between gap-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 border border-surface-container-highest"><span class="material-symbols-outlined text-primary text-[20px]">domain</span></div><div><div class="flex items-center gap-2"><h3 class="text-[15px] font-bold text-on-surface tracking-tight">Verified Business</h3><span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold uppercase tracking-wide border border-outline-variant/40"><span class="material-symbols-outlined text-[11px]">verified</span> KYB</span></div><p class="text-[12px] text-secondary font-normal">Corporate Syndicate &amp; Sponsor</p></div></div><!-- Modern Radio Indicator --><div id="radio-business" class="w-5 h-5 rounded-full border-2 border-outline-variant bg-transparent flex items-center justify-center shrink-0 mt-0.5 transition-colors"><div class="w-2 h-2 rounded-full bg-transparent"></div></div></div><p class="text-[12.5px] text-on-surface-variant mt-3 leading-relaxed">Represent a registered company to unlock private dealrooms, direct LOI negotiations, and institutional syndicate lead routing.</p><!-- Micro Capabilities List --><div class="mt-3 pt-3 border-t border-surface-container grid grid-cols-1 gap-1.5"><div class="flex items-center gap-2 text-[12px] text-on-surface"><span class="material-symbols-outlined text-primary text-[15px] shrink-0">verified</span><span class="font-medium">Verified Business Entity trust badge</span></div><div class="flex items-center gap-2 text-[12px] text-on-surface"><span class="material-symbols-outlined text-primary text-[15px] shrink-0">handshake</span><span class="">Bilateral dealrooms &amp; LOI negotiation</span></div><div class="flex items-center gap-2 text-[12px] text-on-surface"><span class="material-symbols-outlined text-primary text-[15px] shrink-0">group</span><span class="">Multi-seat executive and counsel access</span></div></div><div class="mt-3 flex items-center justify-between text-[11px] text-secondary pt-1"><span class="font-medium text-primary">Corporate Credentialing</span><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">schedule</span> 24–48h SLA</span></div></div></div><!-- Minimal Security Guarantee Note --><div class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface-container-low/70 border border-surface-container-highest/60 text-secondary"><span class="material-symbols-outlined text-primary text-[16px] shrink-0">verified_user</span><p class="text-[11.5px] leading-snug">Strict zero spam policy. Accredited entities &amp; verified operators only.</p></div></div><!-- Modern Executive Floating Action Sheet / Bottom Bar --><div class="fixed bottom-0 inset-x-0 bg-surface/90 backdrop-blur-xl border-t border-surface-container-highest/80 px-4 pt-3 pb-safe z-40"><div class="max-w-[460px] mx-auto flex flex-col gap-2.5 pb-2"><button id="cta-button" class="w-full h-12 rounded-xl bg-primary hover:bg-tertiary-container text-on-primary font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99]" type="button"><span id="cta-button-text" class="">Continue as Community Member</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span></button><div class="flex items-center justify-center gap-1 text-[12px] text-secondary"><span class="text-on-surface-variant">Already have an authorized credential?</span><a class="font-medium text-primary underline underline-offset-4 hover:text-on-surface ml-0.5" href="#">Sign In</a></div></div></div></div><script>function selectTier(type){const cardCommunity=document.getElementById('tier-card-community');const cardBusiness=document.getElementById('tier-card-business');const radioCommunity=document.getElementById('radio-community');const radioBusiness=document.getElementById('radio-business');const ctaText=document.getElementById('cta-button-text');if(type==='community'){cardCommunity.className='group relative flex flex-col p-4 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.995]';cardBusiness.className='group relative flex flex-col p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-highest hover:border-outline-variant shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.995]';radioCommunity.className='w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center shrink-0 mt-0.5 transition-colors';radioCommunity.innerHTML='<div class="w-2 h-2 rounded-full bg-on-primary"></div>';radioBusiness.className='w-5 h-5 rounded-full border-2 border-outline-variant bg-transparent flex items-center justify-center shrink-0 mt-0.5 transition-colors';radioBusiness.innerHTML='<div class="w-2 h-2 rounded-full bg-transparent"></div>';if(ctaText){ctaText.innerText='Continue as Community Member';}}else{cardBusiness.className='group relative flex flex-col p-4 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.995]';cardCommunity.className='group relative flex flex-col p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-highest hover:border-outline-variant shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.995]';radioBusiness.className='w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center shrink-0 mt-0.5 transition-colors';radioBusiness.innerHTML='<div class="w-2 h-2 rounded-full bg-on-primary"></div>';radioCommunity.className='w-5 h-5 rounded-full border-2 border-outline-variant bg-transparent flex items-center justify-center shrink-0 mt-0.5 transition-colors';radioCommunity.innerHTML='<div class="w-2 h-2 rounded-full bg-transparent"></div>';if(ctaText){ctaText.innerText='Apply as Verified Business';}}}</script></main>

</body></html>

//screen 2 - Set up your contributor identity
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_standard" name="shell-type"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-error-container":"#93000a","inverse-on-surface":"#eff1f3","inverse-surface":"#2d3133","tertiary":"#000712","on-secondary-container":"#54647a","on-primary-fixed-variant":"#3f4756","on-tertiary-container":"#79889c","surface-dim":"#d8dadc","primary":"#010611","on-surface-variant":"#45474c","primary-fixed-dim":"#bfc7d8","secondary-fixed-dim":"#b7c8e1","error-container":"#ffdad6","surface-container-lowest":"#ffffff","secondary":"#505f76","surface-container-highest":"#e0e3e5","on-primary-container":"#7f8797","surface-bright":"#f7f9fb","surface-container-high":"#e6e8ea","on-primary-fixed":"#141c29","on-secondary-fixed-variant":"#38485d","background":"#f7f9fb","on-error":"#ffffff","on-secondary-fixed":"#0b1c30","on-tertiary":"#ffffff","tertiary-fixed-dim":"#b9c8de","tertiary-fixed":"#d4e4fa","on-primary":"#ffffff","secondary-fixed":"#d3e4fe","on-surface":"#191c1e","error":"#ba1a1a","on-tertiary-fixed":"#0d1c2d","primary-container":"#171f2c","on-background":"#191c1e","on-tertiary-fixed-variant":"#39485a","outline":"#75777c","secondary-container":"#d0e1fb","surface-tint":"#575f6e","surface":"#f7f9fb","surface-variant":"#e0e3e5","outline-variant":"#c5c6cc","primary-fixed":"#dbe3f5","inverse-primary":"#bfc7d8","surface-container":"#eceef0","on-secondary":"#ffffff","surface-container-low":"#f2f4f6","tertiary-container":"#112030"},borderRadius:{DEFAULT:"0.125rem",lg:"0.25rem",xl:"0.5rem",full:"0.75rem"},spacing:{"space-xl":"2.5rem","gutter-lg":"2rem","gutter":"1.5rem","space-xs":"0.25rem","margin-mobile":"1rem","space-sm":"0.5rem","gutter-sm":"1rem","space-md":"1rem","space-lg":"1.5rem","margin":"2rem"},fontFamily:{"headline-md":["Plus Jakarta Sans"],"body-lg":["Inter"],"headline-lg":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"label-sm":["Inter"],"label-md":["Inter"],"body-md":["Inter"],"display-lg":["Plus Jakarta Sans"],"title-md":["Inter"],"body-sm":["Inter"],"headline-lg-mobile":["Plus Jakarta Sans"]},fontSize:{"headline-md":["24px",{lineHeight:"32px",letterSpacing:"-0.01em",fontWeight:"600"}],"body-lg":["16px",{lineHeight:"24px",letterSpacing:"0em",fontWeight:"400"}],"headline-lg":["32px",{lineHeight:"40px",letterSpacing:"-0.015em",fontWeight:"600"}],"headline-sm":["18px",{lineHeight:"26px",letterSpacing:"-0.005em",fontWeight:"600"}],"label-sm":["11px",{lineHeight:"16px",letterSpacing:"0.04em",fontWeight:"600"}],"label-md":["13px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"500"}],"body-md":["14px",{lineHeight:"20px",letterSpacing:"0em",fontWeight:"400"}],"display-lg":["48px",{lineHeight:"56px",letterSpacing:"-0.02em",fontWeight:"700"}],"title-md":["15px",{lineHeight:"22px",letterSpacing:"-0.005em",fontWeight:"600"}],"body-sm":["12px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"400"}],"headline-lg-mobile":["26px",{lineHeight:"34px",letterSpacing:"-0.01em",fontWeight:"600"}]}}}};</script></head><body class="bg-background font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between"><div class="flex items-center gap-space-md"><img alt="the-relay-logo.png" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xyh03kvE5229vIVVy-0EnA56XDGog_5vhdZEqt9BowKxiWjM7SCAzD1qSuQjHKzx7D2CkGT3TF4BQPlHDE2LhRZOh2gatfiwsymztWwMEDMhYJDIIzj3WfP_c7W3AImDnidGRJ5XJwhz8aJu5eGsujyNMepAXnG1iU5raHzR8ESlJfGZZXCjbR5_upK7sbvSp3NyLKTZbEjlCFIEX2pVxzHdTQNNc3cocseJK9s7Fm_PQSUNq7VbzyeB4W6f-7OK3w3FtXwbej"/><span class="font-title-md text-title-md text-primary tracking-tight">The Relay</span><span class="hidden lg:inline-block font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant">Executive Member Portal</span></div><nav class="hidden md:flex items-center gap-gutter" data-active-classes="text-primary font-title-md"><a aria-current="page" class="transition-colors text-primary font-title-md" data-path="knowledge-base" href="#">Knowledge Base</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="opportunities" href="#">Opportunities</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="insights" href="#">Insights</a></nav><div class="flex items-center gap-space-md"><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-1.5 transition-colors" data-path="sign-in" href="#">Sign In</a><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin pt-16 bg-background"><div class="flex flex-col w-full py-space-xl">
<!-- Progress Header & Context Anchor -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl pb-space-lg">
<div class="flex flex-col gap-space-xs max-w-2xl">
<div class="flex items-center gap-space-sm mb-space-xs">
<span class="font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded bg-primary text-on-primary">Step 2 of 2</span>
<span class="font-label-sm text-label-sm uppercase text-secondary tracking-widest">Identity Finalization</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">Set Up Your Contributor Identity</h1>
<p class="font-body-md text-body-md text-secondary">How your insights and commentary will appear to verified businesses and peers.</p>
</div>
<!-- Quick Status Pill -->
<div class="flex items-center gap-space-sm bg-surface-container px-space-md py-space-sm rounded-xl">
<span class="material-symbols-outlined text-primary text-[18px]">verified_user</span>
<span class="font-label-md text-label-md text-primary">Unrestricted Discussion Access</span>
</div>
</div>
<!-- Reassurance / Governance Notice Banner -->
<div class="bg-surface-container-low rounded-xl p-space-md mb-space-lg flex items-start gap-space-md shadow-sm">
<div class="w-8 h-8 rounded bg-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-on-primary text-[18px]">info</span>
</div>
<div class="flex flex-col gap-0.5">
<span class="font-title-md text-title-md text-primary">Instant Ecosystem Access</span>
<p class="font-body-sm text-body-sm text-secondary">
        Community Member accounts have instant access to discussions and knowledge playbooks. Business verification is only required for dealrooms.
      </p>
</div>
</div>
<!-- Main Split Architecture -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
<!-- LEFT PANEL: Contributor Profile Configuration (Col 1-7) -->
<div class="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-md flex flex-col gap-space-lg">
<div class="flex items-center justify-between pb-space-sm">
<div class="flex flex-col">
<span class="font-title-md text-title-md text-primary">Profile Configuration</span>
<span class="font-body-sm text-body-sm text-secondary">Present your operational background concisely.</span>
</div>
<span class="font-label-sm text-label-sm uppercase text-outline">Public Record</span>
</div>
<!-- Avatar Selector Section -->
<div class="flex flex-col gap-space-sm">
<label class="font-label-md text-label-md text-primary">Contributor Avatar</label>
<div class="flex flex-wrap items-center gap-space-md p-space-md bg-surface-container-low rounded-xl">
<div class="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm transition-transform duration-200" id="previewAvatarContainer">
            SK
          </div>
<div class="flex flex-col gap-space-xs">
<span class="font-label-md text-label-md text-primary">Executive Monogram or Photo</span>
<div class="flex items-center gap-space-xs">
<button class="px-space-sm py-1 rounded text-label-sm font-label-sm uppercase bg-primary text-on-primary shadow-sm transition-colors" id="btnInitials" type="button">
                Monogram (SK)
              </button>
<button class="px-space-sm py-1 rounded text-label-sm font-label-sm uppercase bg-surface-container-highest text-secondary hover:text-primary transition-colors" id="btnUpload" type="button">
                Upload Photo
              </button>
</div>
</div>
<div class="ml-auto hidden sm:flex items-center gap-1.5 text-secondary">
<span class="material-symbols-outlined text-[16px]">visibility</span>
<span class="font-label-sm text-label-sm">High Discretion</span>
</div>
</div>
</div>
<!-- Form Inputs Group -->
<div class="flex flex-col gap-space-md">
<!-- Display Name -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center">
<label class="font-label-md text-label-md text-primary" for="inputName">Display Name</label>
<span class="font-body-sm text-body-sm text-outline">Legal / Operating</span>
</div>
<input class="h-10 px-space-md bg-surface-container-lowest rounded text-primary font-body-md text-body-md focus:outline-none bg-surface-container-low" id="inputName" placeholder="e.g. Sarah Koenig" type="text" value="Sarah Koenig"/>
</div>
<!-- Public Handle & Sub-credential -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-primary" for="inputHandle">Network Handle</label>
<div class="relative">
<input class="w-full h-10 px-space-md bg-surface-container-low rounded text-primary font-body-md text-body-md focus:outline-none" id="inputHandle" placeholder="@handle" type="text" value="@sarah_ops"/>
</div>
</div>
<div class="flex flex-col gap-1.5">
<label class="font-label-md text-label-md text-primary" for="inputRole">Professional Title</label>
<input class="h-10 px-space-md bg-surface-container-low rounded text-primary font-body-md text-body-md focus:outline-none" id="inputRole" placeholder="e.g. Head of Operations" type="text" value="Senior Product Designer"/>
</div>
</div>
<!-- Operating Focus / Bio -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center">
<label class="font-label-md text-label-md text-primary" for="inputBio">Short Bio / Operating Focus</label>
<span class="font-body-sm text-body-sm text-outline" id="bioCharCount">98 / 160</span>
</div>
<textarea class="p-space-sm px-space-md bg-surface-container-low rounded text-primary font-body-md text-body-md focus:outline-none resize-none leading-relaxed" id="inputBio" maxlength="160" placeholder="Summarize your primary operating scope and procurement/deal focus..." rows="3">10+ years scaling design systems and technical procurement at high-growth European tech firms.</textarea>
</div>
<!-- Portfolio / LinkedIn -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center">
<label class="font-label-md text-label-md text-primary" for="inputLink">Portfolio or LinkedIn (Optional)</label>
<span class="font-body-sm text-body-sm text-outline">Verified external link</span>
</div>
<div class="flex items-center bg-surface-container-low rounded px-space-md">
<span class="material-symbols-outlined text-outline text-[18px] mr-space-xs">link</span>
<input class="w-full h-10 bg-transparent text-primary font-body-md text-body-md focus:outline-none" id="inputLink" placeholder="https://linkedin.com/in/..." type="url" value="https://linkedin.com/in/sarah-koenig-ops"/>
</div>
</div>
</div>
<!-- Action Panel -->
<div class="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
<button class="w-full sm:w-auto h-11 px-space-lg rounded bg-surface-container-high text-primary hover:bg-surface-container-highest font-label-md text-label-md transition-colors text-center" id="btnSaveDraft" type="button">
          Save Profile &amp; Browse Knowledge
        </button>
<button class="w-full sm:w-auto h-11 px-space-lg rounded bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-md flex items-center justify-center gap-space-xs transition-colors" id="btnPublish" type="button">
<span>Publish Response &amp; Join Discussion</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
<!-- RIGHT PANEL: Live Contributor Preview & Context Simulation (Col 8-12) -->
<div class="lg:col-span-5 flex flex-col gap-space-md">
<!-- Sticky wrapper for real-time visual feedback -->
<div class="sticky top-20 flex flex-col gap-space-md">
<!-- Preview Indicator Header -->
<div class="flex items-center justify-between px-space-xs">
<div class="flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span class="font-label-sm text-label-sm uppercase text-secondary">Live Feed Preview</span>
</div>
<span class="font-label-sm text-label-sm text-outline">Article Context: Fintech Compensation Playbook</span>
</div>
<!-- Realistic Article Comment Thread Simulation Card -->
<div class="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md">
<!-- Originating Post Context -->
<div class="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase text-secondary">Parent Discussion</span>
<span class="font-body-sm text-body-sm text-outline">12 replies</span>
</div>
<p class="font-title-md text-title-md text-primary line-clamp-1">
              "The cost of 8-stage fintech interview loops on senior product retention."
            </p>
</div>
<!-- Pending Reply / Live Render Box -->
<div class="flex flex-col gap-space-md bg-surface-bright rounded-xl p-space-md shadow-sm">
<!-- Author Meta Row -->
<div class="flex items-start gap-space-md">
<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm shrink-0" id="liveAvatar">
                SK
              </div>
<div class="flex flex-col min-w-0 flex-1">
<div class="flex flex-wrap items-center gap-x-space-xs gap-y-1">
<span class="font-title-md text-title-md text-primary truncate" id="liveName">Sarah Koenig</span>
<!-- Community Badge Token -->
<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[12px]">group</span>
                    Community Member
                  </span>
<span class="text-outline text-body-sm">•</span>
<span class="font-body-sm text-body-sm text-secondary truncate" id="liveRole">Senior Product Designer</span>
</div>
<div class="flex items-center gap-space-xs mt-0.5">
<span class="font-body-sm text-body-sm text-secondary" id="liveHandle">@sarah_ops</span>
<span class="text-outline text-body-sm">•</span>
<span class="font-body-sm text-body-sm text-outline">Just now</span>
</div>
</div>
</div>
<!-- Dynamic Body of the Comment -->
<div class="flex flex-col gap-space-xs pl-0 sm:pl-[52px]">
<p class="font-body-md text-body-md text-on-surface leading-relaxed">
                "As a candidate who walked away from an 8-stage fintech loop last month, this hits home. When diligence expectations bleed into core engineering interviews without clear calibration checkpoints, you end up self-selecting for process tolerance rather than execution velocity."
              </p>
<!-- Author Micro-Bio Pill inside discussion -->
<div class="mt-space-sm p-space-sm rounded bg-surface-container-low flex items-start gap-space-xs">
<span class="material-symbols-outlined text-outline text-[16px] mt-0.5">badge</span>
<p class="font-body-sm text-body-sm text-secondary italic" id="liveBio">
                  10+ years scaling design systems and technical procurement at high-growth European tech firms.
                </p>
</div>
<!-- Comment Actions Simulation -->
<div class="flex items-center gap-space-lg mt-space-sm text-secondary font-label-sm text-label-sm">
<button class="flex items-center gap-1 hover:text-primary transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">thumb_up</span>
<span>14 Upvotes</span>
</button>
<button class="flex items-center gap-1 hover:text-primary transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">chat_bubble</span>
<span>Reply</span>
</button>
<button class="flex items-center gap-1 hover:text-primary transition-colors ml-auto" type="button">
<span class="material-symbols-outlined text-[16px]">bookmark</span>
</button>
</div>
</div>
</div>
<!-- Network Metrics & Trust Footprint Card -->
<div class="grid grid-cols-2 gap-space-sm pt-space-xs">
<div class="bg-surface-container-low rounded-xl p-space-sm flex flex-col">
<span class="font-label-sm text-label-sm text-outline uppercase">Network Reach</span>
<span class="font-headline-sm text-headline-sm text-primary mt-1">4,200+</span>
<span class="font-body-sm text-body-sm text-secondary">Verified Execs</span>
</div>
<div class="bg-surface-container-low rounded-xl p-space-sm flex flex-col">
<span class="font-label-sm text-label-sm text-outline uppercase">Syndicate Tier</span>
<span class="font-headline-sm text-headline-sm text-primary mt-1">Peer Level 1</span>
<span class="font-body-sm text-body-sm text-secondary">Active Voice</span>
</div>
</div>
</div>
<!-- Identity Verification Assurance Note -->
<div class="bg-surface-container rounded-xl p-space-md flex items-center justify-between text-secondary">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-primary text-[20px]">shield_person</span>
<span class="font-body-sm text-body-sm">Your professional identity is tied to your cryptographic ledger record.</span>
</div>
<span class="font-label-sm text-label-sm uppercase font-semibold text-primary">SEC 506(c)</span>
</div>
</div>
</div>
</div>
<!-- Inline Micro-Interactions Script -->
<script>
    (function initContributorSetup() {
      const inputName = document.getElementById('inputName');
      const inputHandle = document.getElementById('inputHandle');
      const inputRole = document.getElementById('inputRole');
      const inputBio = document.getElementById('inputBio');
      const bioCharCount = document.getElementById('bioCharCount');

      const liveName = document.getElementById('liveName');
      const liveHandle = document.getElementById('liveHandle');
      const liveRole = document.getElementById('liveRole');
      const liveBio = document.getElementById('liveBio');
      const liveAvatar = document.getElementById('liveAvatar');
      const previewAvatarContainer = document.getElementById('previewAvatarContainer');

      const btnInitials = document.getElementById('btnInitials');
      const btnUpload = document.getElementById('btnUpload');
      const btnPublish = document.getElementById('btnPublish');
      const btnSaveDraft = document.getElementById('btnSaveDraft');

      function getInitials(name) {
        if (!name || !name.trim()) return '??';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }

      function updateInitials() {
        const initials = getInitials(inputName.value);
        liveAvatar.textContent = initials;
        previewAvatarContainer.textContent = initials;
        btnInitials.textContent = 'Monogram (' + initials + ')';
      }

      inputName.addEventListener('input', (e) => {
        const val = e.target.value.trim() || 'Anonymous Fellow';
        liveName.textContent = val;
        updateInitials();
      });

      inputHandle.addEventListener('input', (e) => {
        let val = e.target.value.trim();
        if (val && !val.startsWith('@')) {
          val = '@' + val;
        }
        liveHandle.textContent = val || '@contributor';
      });

      inputRole.addEventListener('input', (e) => {
        liveRole.textContent = e.target.value.trim() || 'Executive Fellow';
      });

      inputBio.addEventListener('input', (e) => {
        const len = e.target.value.length;
        bioCharCount.textContent = len + ' / 160';
        liveBio.textContent = e.target.value.trim() || 'No operating focus listed.';
      });

      btnInitials.addEventListener('click', () => {
        btnInitials.className = 'px-space-sm py-1 rounded text-label-sm font-label-sm uppercase bg-primary text-on-primary shadow-sm transition-colors';
        btnUpload.className = 'px-space-sm py-1 rounded text-label-sm font-label-sm uppercase bg-surface-container-highest text-secondary hover:text-primary transition-colors';
        updateInitials();
      });

      btnUpload.addEventListener('click', () => {
        btnUpload.className = 'px-space-sm py-1 rounded text-label-sm font-label-sm uppercase bg-primary text-on-primary shadow-sm transition-colors';
        btnInitials.className = 'px-space-sm py-1 rounded text-label-sm font-label-sm uppercase bg-surface-container-highest text-secondary hover:text-primary transition-colors';
        liveAvatar.innerHTML = '<span class="material-symbols-outlined text-[20px]">person</span>';
        previewAvatarContainer.innerHTML = '<span class="material-symbols-outlined text-[24px]">person</span>';
      });

      btnPublish.addEventListener('click', () => {
        const originalContent = btnPublish.innerHTML;
        btnPublish.innerHTML = '<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span><span>Publishing &amp; Redirecting...</span>';
        btnPublish.disabled = true;
        setTimeout(() => {
          btnPublish.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Joined &amp; Published!</span>';
          setTimeout(() => {
            btnPublish.innerHTML = originalContent;
            btnPublish.disabled = false;
          }, 2000);
        }, 800);
      });

      btnSaveDraft.addEventListener('click', () => {
        const originalText = btnSaveDraft.textContent;
        btnSaveDraft.textContent = 'Identity Preserved ✓';
        setTimeout(() => {
          btnSaveDraft.textContent = originalText;
        }, 1500);
      });
    })();
  </script>
</div></main><footer class="w-full bg-surface-container-low mt-space-xl py-space-xl"><div class="max-w-[1600px] mx-auto px-margin-mobile md:px-margin flex flex-col md:flex-row items-start md:items-center justify-between gap-gutter text-on-surface-variant"><div class="flex flex-col gap-space-xs"><span class="font-title-md text-title-md text-primary">The Relay Syndicate &amp; Executive Network</span><span class="font-body-sm text-body-sm max-w-xl">Confidentiality Notice: Material contained within this executive portal is intended strictly for vetted partners, sovereign allocators, and accredited syndicate fellows. Past deal velocity and co-investment returns do not guarantee forward syndication outcomes.</span></div><div class="flex flex-col items-start md:items-end gap-space-xs"><div class="flex items-center gap-space-md font-label-sm text-label-sm"><a class="text-on-surface-variant hover:text-on-surface transition-colors" data-path="membership-terms" href="#">Terms of Admission</a><a class="text-on-surface-variant hover:text-on-surface transition-colors" data-path="compliance-disclosures" href="#">Regulatory Disclosures</a><a class="text-on-surface-variant hover:text-on-surface transition-colors" data-path="governance" href="#">Syndicate Governance</a></div><span class="font-body-sm text-body-sm text-outline">© 2025 The Relay. All rights reserved. Registered private placement network.</span></div></div></footer></body></html>

// comment section UI
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface-bright": "#f7f9fb", "surface": "#f7f9fb", "primary-fixed-dim": "#bfc7d8", "on-surface-variant": "#45474c", "surface-container-highest": "#e0e3e5", "on-error": "#ffffff", "surface-variant": "#e0e3e5", "surface-container-high": "#e6e8ea", "secondary-fixed": "#d3e4fe", "on-primary": "#ffffff", "outline": "#75777c", "surface-tint": "#575f6e", "on-tertiary-container": "#79889c", "surface-container-lowest": "#ffffff", "tertiary-fixed": "#d4e4fa", "on-secondary-fixed": "#0b1c30", "on-surface": "#191c1e", "primary": "#010611", "tertiary": "#000712", "on-secondary-container": "#54647a", "on-tertiary-fixed": "#0d1c2d", "surface-dim": "#d8dadc", "on-background": "#191c1e", "on-primary-fixed-variant": "#3f4756", "on-tertiary": "#ffffff", "on-primary-fixed": "#141c29", "on-primary-container": "#7f8797", "inverse-on-surface": "#eff1f3", "on-secondary-fixed-variant": "#38485d", "inverse-surface": "#2d3133", "primary-fixed": "#dbe3f5", "tertiary-fixed-dim": "#b9c8de", "error": "#ba1a1a", "secondary-fixed-dim": "#b7c8e1", "surface-container": "#eceef0", "tertiary-container": "#112030", "surface-container-low": "#f2f4f6", "primary-container": "#171f2c", "on-secondary": "#ffffff", "on-error-container": "#93000a", "secondary-container": "#d0e1fb", "background": "#f7f9fb", "outline-variant": "#c5c6cc", "inverse-primary": "#bfc7d8", "on-tertiary-fixed-variant": "#39485a", "secondary": "#505f76", "error-container": "#ffdad6" }, "borderRadius": { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" }, "spacing": { "space-md": "1rem", "gutter-sm": "1rem", "space-lg": "1.5rem", "gutter": "1.5rem", "space-xl": "2.5rem", "space-xs": "0.25rem", "margin-mobile": "1rem", "space-sm": "0.5rem", "margin": "2rem", "gutter-lg": "2rem" }, "fontFamily": { "title-md": ["Inter"], "headline-lg-mobile": ["Plus Jakarta Sans"], "body-sm": ["Inter"], "label-md": ["Inter"], "body-md": ["Inter"], "headline-sm": ["Plus Jakarta Sans"], "label-sm": ["Inter"], "body-lg": ["Inter"], "display-lg": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"] }, "fontSize": { "title-md": ["15px", { "lineHeight": "22px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "headline-lg-mobile": ["26px", { "lineHeight": "34px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "body-sm": ["12px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "400" }], "label-md": ["13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" }], "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400" }], "headline-sm": ["18px", { "lineHeight": "26px", "letterSpacing": "-0.005em", "fontWeight": "600" }], "label-sm": ["11px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "600" }], "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400" }], "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "600" }] } } } };</script></head><body class="bg-surface font-body-md text-on-surface antialiased"><header class="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-outline-variant"><div class="h-16 max-w-[1600px] mx-auto px-gutter flex items-center justify-between gap-gutter"><div class="flex items-center gap-gutter"><a class="flex items-center gap-space-sm" href="#"><img alt="the-relay-logo.png" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UPNNXGKevPy3Z9C8GaMyN-5Ri7DTuPTlNjk5j2uFFJNbEUMyd5A0KIDG1wLP4W-DwbQH3H7RxKK1J5wugTFs2l4_vbCl_zC1cTyTTnTaQLF33lyo4uyxJ8wQNEJ2UFMdV45IRPruBfmcBUV8JvNIcja28YE5x9pW_9YkzuXJCFAXQVtUWvvyPR44ZS5vS-r63HSwkOofnMGVSwGKcmLSDMP3QsmuOq1xeQWeDJdsWtgRZFbU5w9gjTjzYKOdINq1KRDgXu4Fk0TQ"><span class="font-headline-sm text-headline-sm tracking-tight text-primary font-semibold">The Relay</span></a><nav class="hidden md:flex items-center gap-space-lg" data-active-classes="text-primary font-semibold"><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="solutions" href="#">Solutions</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="opportunities" href="#">Opportunities</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="insights" href="#">Insights</a><a aria-current="page" class="transition-colors text-primary font-semibold" data-path="knowledge-article-view" href="#">Knowledge Base</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="faq" href="#">FAQ</a></nav></div><div class="flex items-center gap-space-md"><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-md py-space-xs transition-colors" data-path="sign-in" href="#">Sign In</a><a class="bg-primary-container text-on-primary border border-primary-container px-space-md py-space-xs rounded-lg font-label-md text-label-md hover:bg-on-surface-variant transition-colors" data-path="join-the-relay" href="#">Join The Relay</a><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full pt-16 bg-surface min-h-[calc(100vh-4rem)]"><div class="flex flex-col w-full">
<!-- Article Reader & Discussion Viewport -->
<div class="w-full max-w-[1240px] mx-auto px-margin-mobile md:px-margin py-space-xl"><div class="flex items-center justify-between gap-space-md mb-space-lg"><a class="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined text-[18px]">arrow_back</span><span class="">BACK TO KNOWLEDGE</span></a><div class="flex items-center gap-space-sm"><button class="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-lowest text-primary border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors" type="button"><span class="material-symbols-outlined text-[16px]">bookmark_border</span><span class="">Save</span></button><button class="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-lowest text-primary border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors" type="button"><span class="material-symbols-outlined text-[16px]">ios_share</span><span class="">SHARE</span></button></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start"><div class="lg:col-span-8 flex flex-col"><article class="bg-surface-container-lowest rounded-lg border border-outline-variant p-space-lg md:p-space-xl"><div class="flex items-center gap-space-sm mb-space-md"><span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#ffedd5] text-[#c2410c] border border-[#fed7aa]">HIRING</span><span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">• EXECUTIVE PERSPECTIVE</span></div><h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-bold mb-space-lg leading-tight">Your hiring process is scaring away your best candidates—and they're not even telling you why.</h1><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md py-space-md border-y border-outline-variant mb-space-xl"><div class="flex items-center gap-space-md"><div class="relative w-12 h-12 rounded-lg overflow-hidden bg-primary-container flex-shrink-0"><img alt="Emirates Freight Connect" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1U78Jvket8Piy6t3iiwscIUIyFk3uLanLKwXU5UqMr2qzJPOL49QQQvCZfe0_UyLb2R8C5oVEJihGFXaZj1dhRrhaVMhvYHlRCidP8kpcJB_-qHs4HX-LauMlqS8i4VhMKVqBs_-pSxt14s2aitjA4x8BmWcSXPRF38zLmwcLB3DLzECQyX4tH2F97vdw0oH8BBCtzOwW7e9Nzg8So6_56UiBTAKe7DKmvafPRldM-ce0fElQb_kMQ_ZvU"></div><div class="flex flex-col"><div class="flex items-center gap-1.5"><span class="font-title-md text-title-md text-primary font-semibold">Emirates Freight Connect</span><img alt="Relay Verified Seal" class="w-4 h-4 object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WSQ_XPKBRDMNps-OzP9U4ghsTQX-P3onnrkXlWzz33QXhCF33-NEl5vyEjNL2YugO6GEMs3mExxBzUmbYoidh_Kf6dtpoJ7wjv9bQ5Egonz0Mc6Hy8WMTGAB_4HyfvP5OAmQHjrIDhXRoIXWLtW2VFCvKxBaPLjFVyCeknrsYSQ15fLasE_BuTx-c4cEyK-lTeI2ZZi3XiNp9rs2EDfi1KvgnNfXaDtGs3SLp1gEidyxSdeDGXokCyTLQ" title="Relay Verified Business"><span class="text-[11px] font-semibold text-[#047857] bg-[#ecfdf5] border border-[#a7f3d0] px-1.5 py-0.5 rounded">Approved Business</span></div><div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-secondary font-body-sm text-body-sm mt-0.5"><span class="">Logistics</span><span class="">•</span><span class="">28-Sept-26</span><span class="">•</span><span class="">2 min read</span></div></div></div><div class="inline-flex items-center gap-1.5 self-start sm:self-center px-space-md py-1 bg-surface-container-low rounded-lg text-secondary font-label-md text-label-md"><span class="material-symbols-outlined text-[16px]">visibility</span><span class="font-semibold text-primary">1.8k</span><span class="text-secondary font-normal">verified reads</span></div></div><div class="space-y-space-md text-on-surface font-body-lg text-body-lg leading-relaxed max-w-4xl"><p class="font-medium text-primary text-[17px] leading-relaxed">I've been talking to incredible candidates who are quietly bowing out of hiring processes entirely because of interview bloat.</p><p class="">We're seeing: 6–7 rounds of interviews, personality tests that feel like therapy sessions, 10-hour take-home projects that look like free consulting, and committee reviews that take a month between callbacks.</p><p class="text-secondary">The best performers already have options. When you demand 15 cumulative hours of uncompensated trial runs before presenting a term sheet, they interpret it as institutional indecision, risk aversion, and lack of internal trust.</p><div class="bg-surface-container-low p-space-lg rounded-lg my-space-lg border-l-4 border-primary"><p class="font-headline-sm text-headline-sm text-primary font-semibold mb-1">"Fix the process. Respect candidates' time. And watch your quality of hire—and your employer brand—go up."</p><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Operational Principle #419</span></div><p class="">High-velocity teams operate with high trust. If a director and two team leads cannot calibrate an executive hire in 3 structured hours, adding four more interviews will not produce clarity—it will only dilute responsibility.</p></div><div class="mt-space-xl pt-space-lg border-t border-outline-variant flex flex-wrap items-center justify-between gap-space-md"><div class="flex items-center gap-space-xs text-secondary font-label-md text-label-md"><span class="uppercase tracking-wider font-semibold text-primary font-label-sm text-label-sm">Based On:</span><span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded text-primary text-[12px] font-medium"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Business Experience</span><span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded text-primary text-[12px] font-medium"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Executive Hiring</span></div><div class="flex items-center gap-space-sm"><button class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface text-secondary hover:text-primary rounded text-label-sm font-label-sm border border-outline-variant" type="button"><span class="material-symbols-outlined text-[15px]">thumb_up</span><span class="">Helpful (142)</span></button></div></div></article><section class="mt-space-xl pt-space-lg" id="discussion-system"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-md border-b border-outline-variant mb-space-lg"><div><div class="flex items-center gap-2"><h2 class="font-headline-md text-headline-md font-bold text-primary tracking-tight">Discussion &amp; Perspectives</h2><span class="text-body-sm font-label-md text-secondary">• 24 responses</span></div><p class="font-body-sm text-body-sm text-secondary mt-0.5">Insights and commentary from verified operators and practitioners.</p></div><div class="flex items-center gap-1 border-b border-transparent sm:border-0 overflow-x-auto text-[13px] font-label-md"><button type="button" class="px-3 py-1.5 rounded-lg bg-surface-container-high text-primary font-semibold transition-colors">All (24)</button><button type="button" class="px-3 py-1.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-container-low transition-colors whitespace-nowrap">Verified (14)</button><button type="button" class="px-3 py-1.5 rounded-lg text-secondary hover:text-primary hover:bg-surface-container-low transition-colors whitespace-nowrap">Team (7)</button></div></div><div class="bg-surface-container-lowest rounded-lg border border-outline-variant p-space-md mb-space-xl"><div class="flex items-center justify-between gap-space-sm mb-space-sm"><div class="flex items-center gap-2"><div class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">MV</div><span class="text-body-sm font-body-sm text-secondary">Responding as <span class="font-semibold text-primary">Marcus Vance</span></span></div><button type="button" class="text-[11px] font-label-sm text-secondary hover:text-primary transition-colors">Switch</button></div><textarea class="w-full bg-surface-container-low/50 border border-outline-variant rounded-lg p-space-md text-primary font-body-md text-body-md placeholder:text-secondary focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all resize-y" placeholder="Add your perspective or experience..." rows="3"></textarea><div class="flex items-center justify-between gap-space-md mt-space-sm pt-space-xs"><span class="text-[11px] font-label-sm text-secondary">Markdown supported</span><div class="flex items-center gap-space-sm"><button type="button" class="px-space-md py-1.5 text-secondary hover:text-primary rounded font-label-md text-label-md transition-colors">Cancel</button><button type="button" class="px-space-lg py-1.5 bg-primary text-on-primary font-medium rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors">Respond</button></div></div></div><div class="border-t border-outline-variant/60 divide-y divide-outline-variant/60"><div class="py-space-lg"><div class="flex items-start justify-between gap-space-md"><div class="flex items-start gap-3"><div class="w-9 h-9 rounded-lg overflow-hidden bg-primary-container flex-shrink-0"><img alt="TalentForge Global Logo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1X48V6P7K7-OLqXPYX2rqwMSUGwRRGOjXqCmhcsf09huw2r4ZFQvPZHlFIl6R2GIObemch11N93Qy4EXWjM9uYCFXMiGBVmWejPBq_VDJBmu2vpEHpA3-M0D9-IlxcAbn-UHI5i1VhWiLU7E-thhw0Nse-4fSHfW9ZYfL29_w3sqbI93WWIP5nXbbyVF8t85WHu_95af8NI_cx5muufWljhgHP6MlL_DtqqXzZ6bE2z1cXjrA6poJUY-Q"></div><div><div class="flex flex-wrap items-center gap-1.5"><span class="font-title-md text-title-md text-primary font-semibold">TalentForge Global</span><span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]">Relay Verified</span></div><div class="flex items-center gap-1.5 text-body-sm text-secondary mt-0.5"><span class="">Enterprise Member</span><span class="">•</span><span class="">3h ago</span></div></div></div><button type="button" class="text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">more_horiz</span></button></div><div class="mt-space-md text-on-surface font-body-md text-body-md leading-relaxed"><p class="">We capped all internal client referral interviews to maximum 3 touchpoints: a 30-min culture screen, a 45-min technical review, and a final offer calibration. The drop-off rate fell from 41% to under 6% in Q3.</p><p class="mt-2 text-secondary">If an organization cannot calibrate talent within 120 minutes of high-density focus, the deficiency sits with the evaluation rubric, not candidate discovery.</p></div><div class="flex items-center gap-space-lg mt-space-md font-label-md text-label-md text-secondary"><button type="button" class="inline-flex items-center gap-1.5 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[15px]">arrow_upward</span><span class="font-medium text-primary">42</span></button><button type="button" class="inline-flex items-center gap-1 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[15px]">chat_bubble_outline</span><span class="">Reply</span></button></div></div><div class="py-space-lg"><div class="flex items-start justify-between gap-space-md"><div class="flex items-start gap-3"><div class="w-9 h-9 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">MV</div><div><div class="flex flex-wrap items-center gap-1.5"><span class="font-title-md text-title-md text-primary font-semibold">Marcus Vance</span><span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-container text-primary border border-outline-variant">Apex LLMP</span></div><div class="flex items-center gap-1.5 text-body-sm text-secondary mt-0.5"><span class="">VP of People &amp; Talent</span><span class="">•</span><span class="">5h ago</span></div></div></div><button type="button" class="text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">more_horiz</span></button></div><div class="mt-space-md text-on-surface font-body-md text-body-md leading-relaxed"><p class="">From an in-house perspective, interview bloat is usually cover for lack of managerial conviction. If 3 seniors cannot evaluate a candidate in 3 hours, adding 4 more interviews will not fix the ambiguity—it just spreads the blame if the hire doesn't pan out.</p></div><div class="flex items-center gap-space-lg mt-space-md font-label-md text-label-md text-secondary"><button type="button" class="inline-flex items-center gap-1.5 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[15px]">arrow_upward</span><span class="font-medium text-primary">89</span></button><button type="button" class="inline-flex items-center gap-1 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[15px]">chat_bubble_outline</span><span class="">Reply</span></button></div><div class="mt-space-md ml-4 pl-space-md border-l-2 border-outline-variant/80 space-y-space-sm pt-space-xs"><div class="py-space-xs"><div class="flex items-center gap-2 mb-1"><div class="w-6 h-6 rounded overflow-hidden bg-primary-container flex-shrink-0"><img alt="Apex Logistics AG" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1Wi-t9pujbad8mUGJSJniN39SDDgKHJZD9MUZ-5xfartkdtogGrSoH-xMmuD3f7co67yU49of_-3jUT7RgwB_s-wQpq13GsjsNrneKIoKgJpferdm84yotqtwx3OSUGipbwOgbv5dPxnM4049Ke21nKfIZwdxH-T9pG0dAiSH7fANZAZW3IwdQJcnrYtKb4fei4c6Nr7IQXvfH0NmKtAXza_gUsISqVwwyBhdDpAgv_sTFLp2qiZpTvxtc"></div><span class="font-title-md text-title-md text-primary font-semibold text-[13px]">Apex Logistics AG</span><span class="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-medium bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]">Verified</span><span class="text-secondary text-[11px]">• 4h ago</span></div><p class="text-on-surface font-body-sm text-body-sm leading-relaxed"><span class="text-primary font-semibold">@Marcus Vance</span> Fully aligned. We instituted an "ownership single-decider" mandate last year. One designated partner owns the outcome. Interview volume dropped by half and retention hit 94%.</p><div class="flex items-center gap-space-md mt-2 font-label-sm text-label-sm text-secondary"><button type="button" class="inline-flex items-center gap-1 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[13px]">arrow_upward</span><span class="font-medium text-primary">19</span></button><button type="button" class="hover:text-primary transition-colors">Reply</button></div></div></div></div><div class="py-space-lg"><div class="flex items-start justify-between gap-space-md"><div class="flex items-start gap-3"><div class="w-9 h-9 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold text-xs border border-outline-variant flex-shrink-0">SK</div><div><div class="flex flex-wrap items-center gap-1.5"><span class="font-title-md text-title-md text-primary font-semibold">Sarah Koenig</span><span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-container-low text-secondary border border-outline-variant">Contributor</span></div><div class="flex items-center gap-1.5 text-body-sm text-secondary mt-0.5"><span class="">Senior Product Designer</span><span class="">•</span><span class="">7h ago</span></div></div></div><button type="button" class="text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">more_horiz</span></button></div><div class="mt-space-md text-on-surface font-body-md text-body-md leading-relaxed"><p class="">As a candidate who walked away from an 8-stage fintech loop last month, this hits home. When asked to do an unpaid 12-hour audit after 4 rounds, it felt disrespectful. Respecting time builds immense goodwill—and firms that do it instantly win the talent war.</p></div><div class="flex items-center gap-space-lg mt-space-md font-label-md text-label-md text-secondary"><button type="button" class="inline-flex items-center gap-1.5 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[15px]">arrow_upward</span><span class="font-medium text-primary">31</span></button><button type="button" class="inline-flex items-center gap-1 hover:text-primary transition-colors"><span class="material-symbols-outlined text-[15px]">chat_bubble_outline</span><span class="">Reply</span></button></div></div></div><div class="flex items-center justify-between gap-space-md pt-space-lg border-t border-outline-variant/60"><span class="font-body-sm text-body-sm text-secondary">Showing 3 of 24 perspectives</span><button type="button" class="px-space-md py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-label-md text-label-md text-primary hover:bg-surface-container-low transition-colors font-medium">Load Remaining Contributions</button></div></section></div><aside class="lg:col-span-4 flex flex-col gap-space-lg"><div class="bg-surface-container-lowest rounded-lg border border-outline-variant p-space-lg"><div class="flex items-start gap-space-md"><div class="w-12 h-12 rounded-lg overflow-hidden bg-primary-container flex-shrink-0"><img alt="Emirates Freight Connect" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1U78Jvket8Piy6t3iiwscIUIyFk3uLanLKwXU5UqMr2qzJPOL49QQQvCZfe0_UyLb2R8C5oVEJihGFXaZj1dhRrhaVMhvYHlRCidP8kpcJB_-qHs4HX-LauMlqS8i4VhMKVqBs_-pSxt14s2aitjA4x8BmWcSXPRF38zLmwcLB3DLzECQyX4tH2F97vdw0oH8BBCtzOwW7e9Nzg8So6_56UiBTAKe7DKmvafPRldM-ce0fElQb_kMQ_ZvU"></div><div class="flex flex-col flex-1 min-w-0"><div class="flex items-center gap-1.5 flex-wrap"><span class="font-title-md text-title-md text-primary font-bold truncate">Emirates Freight Connect</span><img alt="Verified" class="w-3.5 h-3.5 object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WSQ_XPKBRDMNps-OzP9U4ghsTQX-P3onnrkXlWzz33QXhCF33-NEl5vyEjNL2YugO6GEMs3mExxBzUmbYoidh_Kf6dtpoJ7wjv9bQ5Egonz0Mc6Hy8WMTGAB_4HyfvP5OAmQHjrIDhXRoIXWLtW2VFCvKxBaPLjFVyCeknrsYSQ15fLasE_BuTx-c4cEyK-lTeI2ZZi3XiNp9rs2EDfi1KvgnNfXaDtGs3SLp1gEidyxSdeDGXokCyTLQ"></div><span class="text-[11px] font-semibold text-[#047857] mt-0.5">Relay Verified Business</span></div></div><p class="mt-space-md text-body-sm font-body-sm text-secondary leading-relaxed">Regional freight forwarding &amp; supply chain syndication across EMEA. Verified Relay operator since 2024.</p><div class="flex items-center gap-space-lg my-space-md py-space-sm border-y border-outline-variant/60 text-[12px]"><div class="flex flex-col"><span class="font-bold text-primary text-[14px]">1.4k</span><span class="text-secondary text-[11px]">Followers</span></div><div class="h-6 w-px bg-outline-variant/60"></div><div class="flex flex-col"><span class="font-bold text-primary text-[14px]">89</span><span class="text-secondary text-[11px]">Exchanges</span></div><div class="h-6 w-px bg-outline-variant/60"></div><div class="flex flex-col"><span class="font-bold text-primary text-[14px]">99.2%</span><span class="text-secondary text-[11px]">SLA Rate</span></div></div><div class="flex items-center gap-space-sm"><button class="flex-1 py-1.5 bg-primary text-on-primary rounded font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors" type="button">Follow Entity</button><button class="px-3 py-1.5 border border-outline-variant text-primary rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors" type="button">Connect</button></div></div><div class="bg-surface-container-lowest rounded-lg border border-outline-variant p-space-lg"><div class="flex items-center justify-between gap-space-sm mb-space-md"><span class="font-headline-sm text-headline-sm font-bold text-primary">Discussion</span><a class="font-label-sm text-label-sm text-primary underline" href="#discussion-system">View all (24)</a></div><div class="flex items-center justify-between bg-surface-container-low p-space-md rounded-lg border border-outline-variant mb-space-md"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-[20px] text-primary">forum</span><div><div class="font-bold text-primary text-[13px]">24 Responses</div><div class="text-[11px] text-secondary">14 Verified Operators</div></div></div><div class="flex -space-x-1.5 overflow-hidden"><div class="w-6 h-6 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-[9px] border border-white">MV</div><div class="w-6 h-6 rounded-lg overflow-hidden bg-primary-container border border-white"><img alt="TF" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1X48V6P7K7-OLqXPYX2rqwMSUGwRRGOjXqCmhcsf09huw2r4ZFQvPZHlFIl6R2GIObemch11N93Qy4EXWjM9uYCFXMiGBVmWejPBq_VDJBmu2vpEHpA3-M0D9-IlxcAbn-UHI5i1VhWiLU7E-thhw0Nse-4fSHfW9ZYfL29_w3sqbI93WWIP5nXbbyVF8t85WHu_95af8NI_cx5muufWljhgHP6MlL_DtqqXzZ6bE2z1cXjrA6poJUY-Q"></div><div class="w-6 h-6 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold text-[9px] border border-white">SK</div></div></div><a class="block text-center w-full py-1.5 bg-surface text-secondary hover:text-primary rounded font-label-md text-label-md border border-outline-variant transition-colors" href="#discussion-system">Jump to Responses</a></div><div class="bg-surface-container-lowest rounded-lg border border-outline-variant p-space-lg"><h3 class="font-headline-sm text-headline-sm font-bold text-primary mb-space-md">More from Knowledge</h3><div class="space-y-space-md"><a class="group block pb-space-md border-b border-outline-variant/60 last:border-b-0 last:pb-0" href="#"><div class="flex items-center gap-1.5 mb-1"><div class="w-4 h-4 rounded bg-primary-container overflow-hidden flex-shrink-0"><img alt="AeroTrans" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1Wi-t9pujbad8mUGJSJniN39SDDgKHJZD9MUZ-5xfartkdtogGrSoH-xMmuD3f7co67yU49of_-3jUT7RgwB_s-wQpq13GsjsNrneKIoKgJpferdm84yotqtwx3OSUGipbwOgbv5dPxnM4049Ke21nKfIZwdxH-T9pG0dAiSH7fANZAZW3IwdQJcnrYtKb4fei4c6Nr7IQXvfH0NmKtAXza_gUsISqVwwyBhdDpAgv_sTFLp2qiZpTvxtc"></div><span class="font-label-sm text-label-sm text-secondary font-medium">AeroTrans Global</span></div><h4 class="font-title-md text-title-md text-primary font-semibold group-hover:underline leading-snug">Why You're Profitable on Paper But Broke in the Bank</h4><div class="flex items-center gap-2 text-[11px] text-secondary mt-1"><span class="">4 min read</span><span class="">•</span><span class="inline-flex items-center gap-0.5"><span class="material-symbols-outlined text-[13px]">thumb_up</span> 284</span></div></a><a class="group block pb-space-md border-b border-outline-variant/60 last:border-b-0 last:pb-0" href="#"><div class="flex items-center gap-1.5 mb-1"><div class="w-4 h-4 rounded bg-primary text-white flex items-center justify-center text-[8px] font-bold flex-shrink-0">TF</div><span class="font-label-sm text-label-sm text-secondary font-medium">TalentForge Global</span></div><h4 class="font-title-md text-title-md text-primary font-semibold group-hover:underline leading-snug">Cross-Border Clearing SLA Best Practices for Q4</h4><div class="flex items-center gap-2 text-[11px] text-secondary mt-1"><span class="">3 min read</span><span class="">•</span><span class="inline-flex items-center gap-0.5"><span class="material-symbols-outlined text-[13px]">thumb_up</span> 196</span></div></a><a class="group block pb-space-md border-b border-outline-variant/60 last:border-b-0 last:pb-0" href="#"><div class="flex items-center gap-1.5 mb-1"><div class="w-4 h-4 rounded bg-[#1e293b] text-white flex items-center justify-center text-[8px] font-bold flex-shrink-0">EF</div><span class="font-label-sm text-label-sm text-secondary font-medium">Emirates Freight Connect</span></div><h4 class="font-title-md text-title-md text-primary font-semibold group-hover:underline leading-snug">Structuring Reciprocal Margin in DACH Freight corridors</h4><div class="flex items-center gap-2 text-[11px] text-secondary mt-1"><span class="">5 min read</span><span class="">•</span><span class="inline-flex items-center gap-0.5"><span class="material-symbols-outlined text-[13px]">thumb_up</span> 412</span></div></a></div></div><div class="bg-surface-container-lowest rounded-lg border border-outline-variant p-space-lg"><h3 class="font-headline-sm text-headline-sm font-bold text-primary mb-space-md">Recommended Topics</h3><div class="flex flex-wrap gap-1.5"><a class="px-2.5 py-1 bg-surface-container text-primary rounded-full text-[12px] font-medium hover:bg-surface-container-high transition-colors" href="#">Executive Hiring</a><a class="px-2.5 py-1 bg-surface-container text-primary rounded-full text-[12px] font-medium hover:bg-surface-container-high transition-colors" href="#">Logistics</a><a class="px-2.5 py-1 bg-surface-container text-primary rounded-full text-[12px] font-medium hover:bg-surface-container-high transition-colors" href="#">Deal Structuring</a><a class="px-2.5 py-1 bg-surface-container text-primary rounded-full text-[12px] font-medium hover:bg-surface-container-high transition-colors" href="#">Talent Retention</a><a class="px-2.5 py-1 bg-surface-container text-primary rounded-full text-[12px] font-medium hover:bg-surface-container-high transition-colors" href="#">Operational Playbooks</a></div></div><div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-secondary px-space-xs"><a class="hover:text-primary transition-colors" href="#">Help</a><a class="hover:text-primary transition-colors" href="#">Status</a><a class="hover:text-primary transition-colors" href="#">Writers</a><a class="hover:text-primary transition-colors" href="#">Blog</a><a class="hover:text-primary transition-colors" href="#">Careers</a><a class="hover:text-primary transition-colors" href="#">Privacy</a><a class="hover:text-primary transition-colors" href="#">Terms</a><a class="hover:text-primary transition-colors" href="#">About</a></div></aside></div></div>
</div></main><footer class="w-full bg-surface-container-lowest border-t border-outline-variant py-gutter"><div class="max-w-[1600px] mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md"><div class="flex items-center gap-space-sm"><span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">© 2025 The Relay. Institutional Syndicate &amp; Intelligence Infrastructure.</span></div><div class="flex items-center gap-space-lg"><a class="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Statement</a><a class="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Syndicate</a><a class="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Regulatory Disclosures</a></div></div></footer>


</body></html>