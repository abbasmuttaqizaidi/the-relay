// RegistrationPending
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <!-- Executive Crisp Shadow -->
    <filter id="p-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#D97706" flood-opacity="0.12" />
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0F172A" flood-opacity="0.06" />
    </filter>
    <filter id="p-pill-shadow" x="-10%" y="-20%" width="120%" height="150%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#78350F" flood-opacity="0.25" />
    </filter>

    <linearGradient id="p-grad-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <linearGradient id="p-plaque" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#451A03" />
    </linearGradient>

    <linearGradient id="p-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>

  <!-- Outer Solid Card Canvas -->
  <circle cx="250" cy="250" r="236" fill="#FFFFFF" filter="url(#p-shadow)" />

  <!-- Outer Precision Technical Rim -->
  <circle cx="250" cy="250" r="234" fill="none" stroke="url(#p-grad-border)" stroke-width="4" />
  <circle cx="250" cy="250" r="222" fill="none" stroke="#E2E8F0" stroke-width="1.5" />
  <circle cx="250" cy="250" r="214" fill="#FFFDF5" stroke="#D97706" stroke-width="1" stroke-dasharray="4 3" opacity="0.6" />

  <!-- Calibrated Compass / Guilloché Pips -->
  <g stroke="#D97706" stroke-width="2" opacity="0.4">
    <line x1="250" y1="20" x2="250" y2="28" />
    <line x1="250" y1="472" x2="250" y2="480" />
    <line x1="20" y1="250" x2="28" y2="250" />
    <line x1="472" y1="250" x2="480" y2="250" />
  </g>

  <!-- Core White Field -->
  <circle cx="250" cy="250" r="198" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />

  <!-- TOP SECTION: Header & Chronometer Emblem -->
  <text x="250" y="96" 
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        font-size="11" 
        font-weight="700" 
        letter-spacing="4.5" 
        fill="#B45309" 
        text-anchor="middle">ACTIVE DESK AUDIT RUNNING</text>

  <!-- Central Emblem: Precision Radar / Chronometer Gauge -->
  <g transform="translate(250, 154)">
    <circle cx="0" cy="0" r="46" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5" />
    
    <!-- Inner Track -->
    <circle cx="0" cy="0" r="34" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />

    <!-- Active Segmented Progress Arc (Clockwise progress) -->
    <circle cx="0" cy="0" r="34" fill="none" stroke="url(#p-arc-grad)" stroke-width="5.5" 
            stroke-dasharray="150 70" stroke-linecap="round" transform="rotate(-90)" />

    <!-- Chronograph Hands indicating active time/audit -->
    <circle cx="0" cy="0" r="5" fill="#78350F" />
    <path d="M 0 -17 L 0 0 L 12 8" fill="none" stroke="#78350F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="0" cy="0" r="2" fill="#FDE68A" />

    <!-- 12-o'clock Active Status Pip -->
    <circle cx="0" cy="-34" r="2.5" fill="#B45309" />
  </g>

  <!-- CENTER BAND: High-Contrast Architectural Banner -->
  <g filter="url(#p-pill-shadow)">
    <!-- Banner Body -->
    <path d="M 55 222 L 445 222 L 428 282 L 72 282 Z" fill="url(#p-plaque)" />
    <!-- Top and Bottom Precision Trim -->
    <line x1="55" y1="223" x2="445" y2="223" stroke="#F59E0B" stroke-width="2.5" />
    <line x1="72" y1="281" x2="428" y2="281" stroke="#D97706" stroke-width="2" />
    
    <!-- Indicator Pips -->
    <circle cx="85" cy="252" r="3" fill="#FBBF24" />
    <circle cx="415" cy="252" r="3" fill="#FBBF24" />

    <!-- Center Typography -->
    <text x="250" y="263" 
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
          font-size="30" 
          font-weight="900" 
          letter-spacing="5" 
          fill="#FFFFFF" 
          text-anchor="middle">IN PROGRESS</text>
  </g>

  <!-- BOTTOM SECTION: Institutional Brand & Status -->
  <g transform="translate(250, 342)">
    <!-- Brand Lockup -->
    <g>
      <line x1="-96" y1="-2" x2="-44" y2="-2" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" />
      <text x="0" y="4" 
            font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
            font-size="16" 
            font-weight="800" 
            letter-spacing="5" 
            fill="#0F172A" 
            text-anchor="middle">THE RELAY</text>
      <line x1="44" y1="-2" x2="96" y2="-2" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" />
    </g>

    <!-- Credential Level -->
    <text x="0" y="28" 
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
          font-size="10.5" 
          font-weight="700" 
          letter-spacing="3.5" 
          fill="#B45309" 
          text-anchor="middle">KYB VERIFICATION DESK</text>

    <!-- Stage & SLA Pill Badge -->
    <rect x="-70" y="42" width="140" height="22" rx="4" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1" />
    <text x="0" y="57" 
          font-family="monospace" 
          font-size="9.5" 
          font-weight="700" 
          letter-spacing="1.5" 
          fill="#92400E" 
          text-anchor="middle">STAGE 2 • SLA &lt; 24H</text>
  </g>

  <!-- Subtle Bottom Stability Arc -->
  <path d="M 175 440 A 190 190 0 0 0 325 440" fill="none" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" opacity="0.4" />
</svg>
// registrationVerified
< !--The Relay — Executive In Progress Seal(Crisp)-- >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <!-- Executive Crisp Shadow -->
    <filter id="p-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#D97706" flood-opacity="0.12" />
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0F172A" flood-opacity="0.06" />
    </filter>
    <filter id="p-pill-shadow" x="-10%" y="-20%" width="120%" height="150%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#78350F" flood-opacity="0.25" />
    </filter>

    <linearGradient id="p-grad-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <linearGradient id="p-plaque" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#451A03" />
    </linearGradient>

    <linearGradient id="p-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>

  <!-- Outer Solid Card Canvas -->
  <circle cx="250" cy="250" r="236" fill="#FFFFFF" filter="url(#p-shadow)" />

  <!-- Outer Precision Technical Rim -->
  <circle cx="250" cy="250" r="234" fill="none" stroke="url(#p-grad-border)" stroke-width="4" />
  <circle cx="250" cy="250" r="222" fill="none" stroke="#E2E8F0" stroke-width="1.5" />
  <circle cx="250" cy="250" r="214" fill="#FFFDF5" stroke="#D97706" stroke-width="1" stroke-dasharray="4 3" opacity="0.6" />

  <!-- Calibrated Compass / Guilloché Pips -->
  <g stroke="#D97706" stroke-width="2" opacity="0.4">
    <line x1="250" y1="20" x2="250" y2="28" />
    <line x1="250" y1="472" x2="250" y2="480" />
    <line x1="20" y1="250" x2="28" y2="250" />
    <line x1="472" y1="250" x2="480" y2="250" />
  </g>

  <!-- Core White Field -->
  <circle cx="250" cy="250" r="198" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />

  <!-- TOP SECTION: Header & Chronometer Emblem -->
  <text x="250" y="96" 
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        font-size="11" 
        font-weight="700" 
        letter-spacing="4.5" 
        fill="#B45309" 
        text-anchor="middle">ACTIVE DESK AUDIT RUNNING</text>

  <!-- Central Emblem: Precision Radar / Chronometer Gauge -->
  <g transform="translate(250, 154)">
    <circle cx="0" cy="0" r="46" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5" />
    
    <!-- Inner Track -->
    <circle cx="0" cy="0" r="34" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />

    <!-- Active Segmented Progress Arc (Clockwise progress) -->
    <circle cx="0" cy="0" r="34" fill="none" stroke="url(#p-arc-grad)" stroke-width="5.5" 
            stroke-dasharray="150 70" stroke-linecap="round" transform="rotate(-90)" />

    <!-- Chronograph Hands indicating active time/audit -->
    <circle cx="0" cy="0" r="5" fill="#78350F" />
    <path d="M 0 -17 L 0 0 L 12 8" fill="none" stroke="#78350F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="0" cy="0" r="2" fill="#FDE68A" />

    <!-- 12-o'clock Active Status Pip -->
    <circle cx="0" cy="-34" r="2.5" fill="#B45309" />
  </g>

  <!-- CENTER BAND: High-Contrast Architectural Banner -->
  <g filter="url(#p-pill-shadow)">
    <!-- Banner Body -->
    <path d="M 55 222 L 445 222 L 428 282 L 72 282 Z" fill="url(#p-plaque)" />
    <!-- Top and Bottom Precision Trim -->
    <line x1="55" y1="223" x2="445" y2="223" stroke="#F59E0B" stroke-width="2.5" />
    <line x1="72" y1="281" x2="428" y2="281" stroke="#D97706" stroke-width="2" />
    
    <!-- Indicator Pips -->
    <circle cx="85" cy="252" r="3" fill="#FBBF24" />
    <circle cx="415" cy="252" r="3" fill="#FBBF24" />

    <!-- Center Typography -->
    <text x="250" y="263" 
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
          font-size="30" 
          font-weight="900" 
          letter-spacing="5" 
          fill="#FFFFFF" 
          text-anchor="middle">IN PROGRESS</text>
  </g>

  <!-- BOTTOM SECTION: Institutional Brand & Status -->
  <g transform="translate(250, 342)">
    <!-- Brand Lockup -->
    <g>
      <line x1="-96" y1="-2" x2="-44" y2="-2" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" />
      <text x="0" y="4" 
            font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
            font-size="16" 
            font-weight="800" 
            letter-spacing="5" 
            fill="#0F172A" 
            text-anchor="middle">THE RELAY</text>
      <line x1="44" y1="-2" x2="96" y2="-2" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" />
    </g>

    <!-- Credential Level -->
    <text x="0" y="28" 
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
          font-size="10.5" 
          font-weight="700" 
          letter-spacing="3.5" 
          fill="#B45309" 
          text-anchor="middle">KYB VERIFICATION DESK</text>

    <!-- Stage & SLA Pill Badge -->
    <rect x="-70" y="42" width="140" height="22" rx="4" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1" />
    <text x="0" y="57" 
          font-family="monospace" 
          font-size="9.5" 
          font-weight="700" 
          letter-spacing="1.5" 
          fill="#92400E" 
          text-anchor="middle">STAGE 2 • SLA &lt; 24H</text>
  </g>

  <!-- Subtle Bottom Stability Arc -->
  <path d="M 175 440 A 190 190 0 0 0 325 440" fill="none" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" opacity="0.4" />
</svg>

<!--The Relay — Executive Verified Seal(Crisp)-- >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <defs>
            <!-- Executive Crisp Shadow -->
            <filter id="v-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#059669" flood-opacity="0.12" />
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0F172A" flood-opacity="0.06" />
            </filter>
            <filter id="v-pill-shadow" x="-10%" y="-20%" width="120%" height="150%" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#064E3B" flood-opacity="0.25" />
            </filter>

            <linearGradient id="v-grad-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#10B981" />
                <stop offset="100%" stop-color="#047857" />
            </linearGradient>

            <linearGradient id="v-plaque" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#064E3B" />
                <stop offset="100%" stop-color="#022C22" />
            </linearGradient>
        </defs>

        <!-- Outer Solid Card Canvas -->
        <circle cx="250" cy="250" r="236" fill="#FFFFFF" filter="url(#v-shadow)" />

        <!-- Outer Precision Technical Rim -->
        <circle cx="250" cy="250" r="234" fill="none" stroke="url(#v-grad-border)" stroke-width="4" />
        <circle cx="250" cy="250" r="222" fill="none" stroke="#E2E8F0" stroke-width="1.5" />
        <circle cx="250" cy="250" r="214" fill="#F8FAFC" stroke="#059669" stroke-width="1" stroke-dasharray="4 3" opacity="0.6" />

        <!-- Calibrated Compass / Guilloché Pips -->
        <g stroke="#047857" stroke-width="2" opacity="0.4">
            <line x1="250" y1="20" x2="250" y2="28" />
            <line x1="250" y1="472" x2="250" y2="480" />
            <line x1="20" y1="250" x2="28" y2="250" />
            <line x1="472" y1="250" x2="480" y2="250" />
        </g>

        <!-- Core White Field -->
        <circle cx="250" cy="250" r="198" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />

        <!-- TOP SECTION: Attestation Header & Shield Emblem -->
        <text x="250" y="96"
            font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            font-size="11"
            font-weight="700"
            letter-spacing="4.5"
            fill="#047857"
            text-anchor="middle">OFFICIAL KYB ATTESTATION</text>

        <!-- Central Emblem: Precision Shield with Checkmark -->
        <g transform="translate(250, 154)">
            <circle cx="0" cy="0" r="46" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
            <!-- Shield Shape -->
            <path d="M 0 -30 
             C 18 -30 27 -26 27 -14 
             C 27 12 14 28 0 34 
             C -14 28 -27 12 -27 -14 
             C -27 -26 -18 -30 0 -30 Z"
                fill="#059669" />
            <!-- Micro Bevel Rim inside Shield -->
            <path d="M 0 -26 
             C 14 -26 22 -23 22 -12 
             C 22 10 11 23 0 28 
             C -11 23 -22 10 -22 -12 
             C -22 -23 -14 -26 0 -26 Z"
                fill="none" stroke="#6EE7B7" stroke-width="1.2" opacity="0.6" />
            <!-- Crisp Bold White Checkmark -->
            <path d="M -11 -2 L -3 6 L 11 -8"
                fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>

        <!-- CENTER BAND: High-Contrast Architectural Banner -->
        <!-- Note: Using pure path geometry and clean standard SVG text -->
        <g filter="url(#v-pill-shadow)">
            <!-- Banner Body -->
            <path d="M 55 222 L 445 222 L 428 282 L 72 282 Z" fill="url(#v-plaque)" />
            <!-- Top and Bottom Precision Trim -->
            <line x1="55" y1="223" x2="445" y2="223" stroke="#10B981" stroke-width="2.5" />
            <line x1="72" y1="281" x2="428" y2="281" stroke="#047857" stroke-width="2" />

            <!-- Security Anchor Screws -->
            <circle cx="85" cy="252" r="3" fill="#34D399" />
            <circle cx="415" cy="252" r="3" fill="#34D399" />

            <!-- Center Typography -->
            <text x="250" y="263"
                font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                font-size="32"
                font-weight="900"
                letter-spacing="6"
                fill="#FFFFFF"
                text-anchor="middle">VERIFIED</text>
        </g>

        <!-- BOTTOM SECTION: Institutional Brand & Validation -->
        <g transform="translate(250, 342)">
            <!-- Brand Lockup -->
            <g>
                <line x1="-96" y1="-2" x2="-44" y2="-2" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" />
                <text x="0" y="4"
                    font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                    font-size="16"
                    font-weight="800"
                    letter-spacing="5"
                    fill="#0F172A"
                    text-anchor="middle">THE RELAY</text>
                <line x1="44" y1="-2" x2="96" y2="-2" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" />
            </g>

            <!-- Credential Level -->
            <text x="0" y="28"
                font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                font-size="10.5"
                font-weight="700"
                letter-spacing="3.5"
                fill="#047857"
                text-anchor="middle">INSTITUTIONAL TRUST • TIER 1</text>

            <!-- GLEIF / LEI Pill Badge -->
            <rect x="-70" y="42" width="140" height="22" rx="4" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1" />
            <text x="0" y="57"
                font-family="monospace"
                font-size="9.5"
                font-weight="700"
                letter-spacing="1.5"
                fill="#475569"
                text-anchor="middle">GLEIF / LEI AUDITED</text>
        </g>

        <!-- Subtle Bottom Stability Arc -->
        <path d="M 175 440 A 190 190 0 0 0 325 440" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" opacity="0.4" />
    </svg>