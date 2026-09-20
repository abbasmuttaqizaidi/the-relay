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
            background: "#ffffff",
            surface: "#f8fafc",
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
  </style>
</head>
<body class="bg-background font-sans text-charcoal antialiased min-h-screen flex flex-col justify-between selection:bg-charcoal selection:text-white">
<!-- Minimalist Executive Header -->
<header class="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-border">
<div class="h-16 w-full max-w-6xl mx-auto px-6 flex items-center justify-between">
<div class="flex items-center gap-10">
<a class="flex items-center gap-2.5 group" href="#">
<img alt="The Relay Logo" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xm5bWhQFWcDnuIhyyMBg9q0Rs184Pd60qb6O4-l9EoLscfxCGoWGryG_aUyQiWUzNc4DQvdv7QloZ7dVN2GfQ_9VMYbFmuKMoebHNHHKyEgGu-mTV8skGrGlmZnVMYhJ2YZlPwZWa_FYR9xHiBL9de7a5MA6E0o2TDnJSNkat_GCw-6_RzsFpiyxIYwGLkqGAWjB4oseQEE65joNBVbV3lmmtbBNgMqpknFBWPKARqXqU8KtVOPSaiRw8lILyyjbde22j_Ynn7"/>
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
<section class="w-full max-w-4xl mx-auto px-6 pt-6 pb-12 text-center md:text-left">
<div class="flex flex-col gap-4">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle border border-border w-fit mx-auto md:mx-0 text-xs font-medium text-secondary tracking-wide uppercase">
          Protocol Architecture
        </div>
<h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight text-charcoal">
          The Relay Journey
        </h1>
<p class="font-display text-xl sm:text-2xl font-medium text-secondary">
          From opportunity to handshake.
        </p>
<p class="text-base sm:text-lg text-secondary max-w-2xl leading-relaxed mt-1">
          Relay gives businesses a structured way to discover, exchange, and act on commercial opportunities — with both sides in full control.
        </p>
</div>
<!-- Clean Horizontal Sequence Bar -->
<div class="mt-10 py-3.5 px-4 bg-surface border border-border rounded-lg overflow-x-auto">
<div class="flex items-center justify-between min-w-[720px] text-xs font-medium text-secondary">
<span class="text-charcoal font-semibold">01 Verify</span>
<span class="text-muted">→</span>
<span class="text-charcoal font-semibold">02 Post</span>
<span class="text-muted">→</span>
<span class="text-charcoal font-semibold">03 Discover</span>
<span class="text-muted">→</span>
<span class="text-charcoal font-semibold">04 Interest</span>
<span class="text-muted">→</span>
<span class="text-charcoal font-semibold">05 Acknowledge</span>
<span class="text-muted">→</span>
<span class="text-charcoal font-semibold">06 Negotiate</span>
<span class="text-muted">→</span>
<span class="text-charcoal font-semibold">07 Agree</span>
<span class="text-muted">→</span>
<span class="text-charcoal font-semibold">08 Handshake</span>
</div>
</div>
</section>
<!-- The 8 Steps Section -->
<section class="w-full max-w-4xl mx-auto px-6 py-6">
<div class="divide-y divide-border border-y border-border">
<!-- STEP 01 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-muted">01</span>
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">VERIFY</h2>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Join a network of verified businesses.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Create your profile and complete verification so counterparties negotiate with verified peers only.
            </p>
</div>
</div>
<!-- STEP 02 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-muted">02</span>
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">POST</h2>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Put an opportunity on the table.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Share a lead, referral, distribution, hiring need, or partnership without exposing proprietary identifiers.
            </p>
</div>
</div>
<!-- STEP 03 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-muted">03</span>
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">DISCOVER</h2>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Find opportunities worth exploring.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Browse and filter verified opportunities across categories by deal size, scope, and industry.
            </p>
</div>
</div>
<!-- STEP 04 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-muted">04</span>
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">EXPRESS INTEREST</h2>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Signal interest with structured intent.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Send a focused proposal explaining why your business is relevant. Zero unsolicited outreach or scraping.
            </p>
</div>
</div>
<!-- STEP 05 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline bg-surface/50 -mx-6 px-6">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-charcoal">05</span>
<div class="flex flex-col">
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">ACKNOWLEDGE</h2>
<span class="text-[11px] font-medium text-secondary uppercase tracking-wider">CDOES Gateway</span>
</div>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Both sides understand the exchange.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Where CDOES activates: mutual clarity, bilateral consent, and explicit alignment before any identity or value reveal.
            </p>
</div>
</div>
<!-- STEP 06 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-muted">06</span>
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">NEGOTIATE</h2>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Decide what the exchange means to both sides.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Propose, counter-propose, and agree on commercial value (e.g. Lead ↔ Rev Share, Referral ↔ Referral, Intro ↔ Partnership).
            </p>
</div>
</div>
<!-- STEP 07 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-muted">07</span>
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">AGREE</h2>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Confirm the exact exchange terms.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Both businesses independently confirm final exchange terms. No assumed value. Double bilateral sign-off.
            </p>
</div>
</div>
<!-- STEP 08 -->
<div class="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
<div class="md:col-span-3 flex items-baseline gap-3">
<span class="font-mono text-sm font-semibold text-muted">08</span>
<h2 class="font-display text-lg font-bold text-charcoal tracking-tight">HANDSHAKE</h2>
</div>
<div class="md:col-span-9 flex flex-col gap-1.5">
<h3 class="text-base font-semibold text-charcoal">Connect and take it forward.</h3>
<p class="text-sm text-secondary leading-relaxed">
              Both businesses consent to unlock verified contact details. "Relay facilitates the connection. The businesses execute the exchange."
            </p>
</div>
</div>
</div>
</section>
<!-- The Resolution Section ("Then, connect.") -->
<section class="w-full max-w-4xl mx-auto px-6 pt-14 pb-8">
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
<img alt="The Relay Logo" class="h-5 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xm5bWhQFWcDnuIhyyMBg9q0Rs184Pd60qb6O4-l9EoLscfxCGoWGryG_aUyQiWUzNc4DQvdv7QloZ7dVN2GfQ_9VMYbFmuKMoebHNHHKyEgGu-mTV8skGrGlmZnVMYhJ2YZlPwZWa_FYR9xHiBL9de7a5MA6E0o2TDnJSNkat_GCw-6_RzsFpiyxIYwGLkqGAWjB4oseQEE65joNBVbV3lmmtbBNgMqpknFBWPKARqXqU8KtVOPSaiRw8lILyyjbde22j_Ynn7"/>
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
</body></html>