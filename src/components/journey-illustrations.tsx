import React from 'react';

export function Step01Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v1" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v1)" />

      {/* Step 01: Verify */}
      <g transform="translate(180, 55)">
        {/* Central Trust Shield & Seal */}
        <path
          d="M220 40 C220 40 340 10 340 140 C340 260 220 330 220 330 C220 330 100 260 100 140 C100 10 220 40 220 40 Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2.5"
          filter="drop-shadow(0 16px 30px rgba(15,23,42,0.06))"
        />
        <path
          d="M220 62 C220 62 318 36 318 142 C318 244 220 306 220 306 C220 306 122 244 122 142 C122 36 220 62 220 62 Z"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Central Verified Emblem */}
        <circle cx="220" cy="170" r="54" fill="#0F172A" />
        <path d="M200 170 L214 184 L244 154" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Left Credential Badge */}
        <rect
          x="-40"
          y="90"
          width="165"
          height="62"
          rx="10"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          filter="drop-shadow(0 8px 16px rgba(15,23,42,0.04))"
        />
        <circle cx="-14" cy="121" r="14" fill="#0F172A" />
        <path d="M-19 121 L-16 124 L-9 117" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="108" width="85" height="9" rx="4.5" fill="#0F172A" />
        <rect x="12" y="125" width="55" height="7" rx="3.5" fill="#94A3B8" />

        {/* Right LEI Verification Badge */}
        <rect
          x="315"
          y="195"
          width="175"
          height="64"
          rx="10"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          filter="drop-shadow(0 8px 16px rgba(15,23,42,0.04))"
        />
        <rect x="335" y="212" width="65" height="8" rx="4" fill="#0F172A" />
        <rect x="335" y="227" width="125" height="7" rx="3.5" fill="#64748B" />
        <rect x="335" y="240" width="90" height="6" rx="3" fill="#CBD5E1" />

        {/* Trust Tag Pill */}
        <rect x="140" y="350" width="160" height="34" rx="17" fill="#0F172A" />
        <text x="220" y="372" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">
          KYB &amp; LEI AUDITED
        </text>
      </g>
    </svg>
  );
}

export function Step02Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v2" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v2)" />

      {/* Step 02: Post */}
      <g transform="translate(150, 60)">
        {/* Back card layer */}
        <rect x="110" y="30" width="340" height="250" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" opacity="0.6" />

        {/* Main Card */}
        <rect
          x="70"
          y="60"
          width="360"
          height="280"
          rx="16"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2"
          filter="drop-shadow(0 20px 35px rgba(15,23,42,0.07))"
        />

        {/* Header of Card */}
        <rect x="100" y="90" width="120" height="24" rx="12" fill="#F1F5F9" />
        <text x="160" y="106" fill="#475569" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
          BLINDED DEAL
        </text>

        <rect x="350" y="90" width="50" height="24" rx="6" fill="#0F172A" />
        <text x="375" y="106" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="700" textAnchor="middle">
          NEW
        </text>

        {/* Deal Content Placeholder lines */}
        <rect x="100" y="132" width="240" height="14" rx="7" fill="#0F172A" />
        <rect x="100" y="156" width="285" height="8" rx="4" fill="#64748B" />
        <rect x="100" y="172" width="210" height="8" rx="4" fill="#94A3B8" />

        {/* Offering / Seeking Tags */}
        <g transform="translate(100, 204)">
          <rect width="140" height="46" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="14" y="20" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700">
            OFFERING
          </text>
          <text x="14" y="36" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="500">
            Tier-1 Cloud Infra
          </text>
        </g>

        <g transform="translate(255, 204)">
          <rect width="145" height="46" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="14" y="20" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700">
            SEEKING
          </text>
          <text x="14" y="36" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="500">
            EU B2B Resellers
          </text>
        </g>

        {/* Confidential Shield Footer */}
        <g transform="translate(100, 276)">
          <circle cx="10" cy="10" r="10" fill="#0F172A" />
          <path d="M7 10 V8 C7 6.5 8.5 5 10 5 C11.5 5 13 6.5 13 8 V10 M6 10 H14 V14 H6 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
          <text x="28" y="14" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="600">
            Proprietary Identifiers Blinded
          </text>
        </g>
      </g>
    </svg>
  );
}

export function Step03Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v3" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v3)" />

      {/* Step 03: Discover */}
      <g transform="translate(150, 60)">
        {/* Radar concentric rings */}
        <circle cx="250" cy="170" r="160" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="250" cy="170" r="105" stroke="#E2E8F0" strokeWidth="1.5" />
        <circle cx="250" cy="170" r="48" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Central Scanning Radar Node */}
        <circle cx="250" cy="170" r="26" fill="#0F172A" />
        {/* Magnifier icon inside central node */}
        <circle cx="248" cy="168" r="8" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        <line x1="254" y1="174" x2="259" y2="179" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Discovery Result Card Top-Left */}
        <g transform="translate(20, 45)">
          <rect
            width="165"
            height="72"
            rx="10"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="1.5"
            filter="drop-shadow(0 10px 20px rgba(15,23,42,0.06))"
          />
          <rect x="14" y="14" width="80" height="10" rx="5" fill="#0F172A" />
          <rect x="14" y="32" width="130" height="6" rx="3" fill="#64748B" />
          <rect x="14" y="44" width="65" height="16" rx="8" fill="#F1F5F9" />
          <text x="46" y="55" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">
            96% PARITY
          </text>
          {/* Connector line */}
          <line x1="165" y1="55" x2="225" y2="145" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Discovery Result Card Bottom-Right */}
        <g transform="translate(320, 190)">
          <rect
            width="175"
            height="76"
            rx="10"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="1.5"
            filter="drop-shadow(0 10px 20px rgba(15,23,42,0.06))"
          />
          <rect x="14" y="14" width="95" height="10" rx="5" fill="#0F172A" />
          <rect x="14" y="32" width="140" height="6" rx="3" fill="#64748B" />
          <rect x="14" y="46" width="70" height="16" rx="8" fill="#F1F5F9" />
          <text x="49" y="57" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">
            98% PARITY
          </text>
          {/* Connector line */}
          <line x1="14" y1="38" x2="-45" y2="-5" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Bottom Filter Tag */}
        <rect x="155" y="345" width="190" height="34" rx="17" fill="#0F172A" />
        <text x="250" y="367" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
          PARAMETRIC DISCOVERY
        </text>
      </g>
    </svg>
  );
}

export function Step04Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v4" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v4)" />

      {/* Step 04: Express Interest */}
      <g transform="translate(150, 50)">
        {/* Origin Opportunity Node (Left) */}
        <g transform="translate(30, 90)">
          <rect
            width="170"
            height="190"
            rx="12"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            filter="drop-shadow(0 10px 20px rgba(15,23,42,0.04))"
          />
          <rect x="18" y="24" width="70" height="10" rx="5" fill="#0F172A" />
          <rect x="18" y="44" width="130" height="6" rx="3" fill="#64748B" />
          <rect x="18" y="58" width="90" height="6" rx="3" fill="#94A3B8" />

          <rect x="18" y="85" width="134" height="44" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="28" y="103" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700">
            TARGET DEAL
          </text>
          <text x="28" y="118" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
            Enterprise Cloud Intro
          </text>

          <rect x="18" y="145" width="134" height="24" rx="6" fill="#F1F5F9" />
          <text x="85" y="161" fill="#475569" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="600" textAnchor="middle">
            Awaiting Intent
          </text>
        </g>

        {/* Directed Intent Flight & Encrypted Token Payload (Center) */}
        <g transform="translate(230, 130)">
          {/* Animated / Directed Arrow Beam */}
          <path d="M-15 45 H75" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="6 4" />

          {/* Central Structured Proposal Envelope Card */}
          <rect x="0" y="10" width="70" height="70" rx="14" fill="#0F172A" filter="drop-shadow(0 12px 24px rgba(15,23,42,0.18))" />
          {/* Paper Airplane / Intent Arrow */}
          <path d="M22 45 L50 25 L38 52 L31 46 Z" fill="#FFFFFF" />

          {/* Intent Badge below */}
          <rect x="-20" y="95" width="110" height="26" rx="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <text x="35" y="112" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            EXPRESS INTENT
          </text>
        </g>

        {/* Structured Pitch Card (Right) */}
        <g transform="translate(330, 80)">
          <rect
            width="180"
            height="210"
            rx="14"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            filter="drop-shadow(0 15px 30px rgba(15,23,42,0.08))"
          />
          <rect x="18" y="20" width="95" height="12" rx="6" fill="#0F172A" />
          <rect x="18" y="42" width="140" height="6" rx="3" fill="#64748B" />

          <rect x="18" y="65" width="144" height="50" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="28" y="85" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700">
            VALUE PROPOSITION
          </text>
          <text x="28" y="100" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
            Direct Reseller Intro
          </text>

          <rect x="18" y="130" width="144" height="52" rx="8" fill="#0F172A" />
          <text x="90" y="152" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="700" textAnchor="middle">
            SUBMIT INTENT →
          </text>
          <text x="90" y="169" fill="#94A3B8" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" textAnchor="middle">
            Zero Scrape Spam Guarantee
          </text>
        </g>

        {/* Bottom Status */}
        <rect x="155" y="345" width="190" height="34" rx="17" fill="#0F172A" />
        <text x="250" y="367" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
          STRUCTURED INTENT
        </text>
      </g>
    </svg>
  );
}

export function Step05Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v5" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v5)" />

      {/* Step 05: Acknowledge (CDOES Gateway Activation) */}
      <g transform="translate(150, 60)">
        {/* The CDOES Gateway Portal / Arch Frame */}
        <rect
          x="110"
          y="30"
          width="280"
          height="270"
          rx="18"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2.5"
          filter="drop-shadow(0 16px 32px rgba(15,23,42,0.08))"
        />
        <path d="M140 30 V300 M360 30 V300" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Central Secure Chamber */}
        <circle cx="250" cy="130" r="50" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
        {/* Lock & Gateway Keyhole */}
        <circle cx="250" cy="130" r="32" fill="#0F172A" />
        <path
          d="M243 128 V122 C243 118 246 115 250 115 C254 115 257 118 257 122 V128 M240 128 H260 V142 H240 Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
        />

        {/* Mutual Consent Checkpoints */}
        <g transform="translate(145, 195)">
          <rect width="210" height="34" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="20" cy="17" r="8" fill="#0F172A" />
          <path d="M16 17 L19 20 L24 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <text x="36" y="21" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="700">
            Party A Assent Registered
          </text>
        </g>

        <g transform="translate(145, 238)">
          <rect width="210" height="34" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="20" cy="17" r="8" fill="#0F172A" />
          <path d="M16 17 L19 20 L24 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <text x="36" y="21" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10" fontWeight="700">
            Party B Assent Registered
          </text>
        </g>

        {/* Side Entry / Handshake Tokens */}
        <rect x="25" y="110" width="70" height="42" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="60" y="134" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">
          PARTY A
        </text>
        <line x1="95" y1="131" x2="110" y2="131" stroke="#0F172A" strokeWidth="2" />

        <rect x="405" y="110" width="70" height="42" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="440" y="134" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">
          PARTY B
        </text>
        <line x1="390" y1="131" x2="405" y2="131" stroke="#0F172A" strokeWidth="2" />

        {/* Bottom CDOES Gateway Pill */}
        <rect x="145" y="340" width="210" height="34" rx="17" fill="#0F172A" />
        <text x="250" y="362" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
          CDOES GATEWAY ACTIVATION
        </text>
      </g>
    </svg>
  );
}

export function Step06Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v6" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v6)" />

      {/* Step 06: Negotiate (Bilateral Term Parity & Balancing) */}
      <g transform="translate(140, 60)">
        {/* Scale / Balance Mechanism in center */}
        <line x1="260" y1="50" x2="260" y2="280" stroke="#0F172A" strokeWidth="3" />
        <circle cx="260" cy="50" r="8" fill="#0F172A" />
        <line x1="120" y1="90" x2="400" y2="90" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

        {/* Left Balance Pan: Offer Terms */}
        <g transform="translate(30, 100)">
          <line x1="90" y1="-10" x2="25" y2="40" stroke="#64748B" strokeWidth="1.5" />
          <line x1="90" y1="-10" x2="155" y2="40" stroke="#64748B" strokeWidth="1.5" />

          {/* Left Card (Party A Offer) */}
          <rect
            x="15"
            y="40"
            width="160"
            height="150"
            rx="12"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            filter="drop-shadow(0 10px 20px rgba(15,23,42,0.06))"
          />
          <rect x="30" y="56" width="70" height="10" rx="5" fill="#0F172A" />
          <rect x="30" y="74" width="120" height="6" rx="3" fill="#64748B" />

          <rect x="30" y="94" width="130" height="40" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="40" y="112" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700">
            PROPOSED TERMS
          </text>
          <text x="40" y="126" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
            20% Rev Share / Lead
          </text>

          <rect x="30" y="146" width="130" height="26" rx="6" fill="#F1F5F9" />
          <text x="95" y="163" fill="#475569" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">
            OFFER #1
          </text>
        </g>

        {/* Right Balance Pan: Counter-Offer Terms */}
        <g transform="translate(310, 100)">
          <line x1="90" y1="-10" x2="25" y2="40" stroke="#64748B" strokeWidth="1.5" />
          <line x1="90" y1="-10" x2="155" y2="40" stroke="#64748B" strokeWidth="1.5" />

          {/* Right Card (Party B Counter) */}
          <rect
            x="15"
            y="40"
            width="160"
            height="150"
            rx="12"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            filter="drop-shadow(0 10px 20px rgba(15,23,42,0.06))"
          />
          <rect x="30" y="56" width="80" height="10" rx="5" fill="#0F172A" />
          <rect x="30" y="74" width="120" height="6" rx="3" fill="#64748B" />

          <rect x="30" y="94" width="130" height="40" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="40" y="112" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700">
            COUNTER TERMS
          </text>
          <text x="40" y="126" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
            15% Net + Co-Sell Pact
          </text>

          <rect x="30" y="146" width="130" height="26" rx="6" fill="#0F172A" />
          <text x="95" y="163" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">
            ACTIVE TURN
          </text>
        </g>

        {/* Center Fulcrum Balance Base */}
        <polygon points="260,260 240,290 280,290" fill="#0F172A" />

        {/* Bottom Status */}
        <rect x="165" y="340" width="190" height="34" rx="17" fill="#0F172A" />
        <text x="260" y="362" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
          RECIPROCAL CALIBRATION
        </text>
      </g>
    </svg>
  );
}

export function Step07Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v7" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v7)" />

      {/* Step 07: Agree (Dual Ratification & Signed Legal Accord) */}
      <g transform="translate(150, 55)">
        {/* Central Legal Document Sheet */}
        <rect
          x="90"
          y="25"
          width="320"
          height="285"
          rx="16"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2.5"
          filter="drop-shadow(0 20px 40px rgba(15,23,42,0.08))"
        />

        {/* Document Header */}
        <rect x="130" y="55" width="120" height="12" rx="6" fill="#0F172A" />
        <rect x="130" y="76" width="240" height="6" rx="3" fill="#64748B" />
        <rect x="130" y="90" width="210" height="6" rx="3" fill="#CBD5E1" />

        {/* Agreement Term Box */}
        <rect x="130" y="115" width="240" height="50" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <text x="145" y="135" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700">
          RATIFIED RECIPROCAL TERMS
        </text>
        <text x="145" y="150" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
          15% Net Rev Share • 12-Mo Non-Circumvention
        </text>

        {/* Bilateral Signatures Section */}
        {/* Party A Signature Box */}
        <g transform="translate(130, 185)">
          <rect width="112" height="74" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="14" y="22" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700">
            PARTY A SIGNATURE
          </text>
          {/* Stylized signature vector */}
          <path d="M16 48 Q32 32 46 44 T76 38" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="94" cy="52" r="10" fill="#0F172A" />
          <path d="M90 52 L93 55 L98 50" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Party B Signature Box */}
        <g transform="translate(258, 185)">
          <rect width="112" height="74" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="14" y="22" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700">
            PARTY B SIGNATURE
          </text>
          {/* Stylized signature vector */}
          <path d="M16 48 Q34 35 50 46 T80 40" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="94" cy="52" r="10" fill="#0F172A" />
          <path d="M90 52 L93 55 L98 50" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Top Floating Stamp / Seal */}
        <circle cx="370" cy="40" r="28" fill="#0F172A" filter="drop-shadow(0 6px 14px rgba(15,23,42,0.15))" />
        <path d="M358 40 L366 48 L382 32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Bottom Status */}
        <rect x="155" y="340" width="190" height="34" rx="17" fill="#0F172A" />
        <text x="250" y="362" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
          DUAL RATIFICATION
        </text>
      </g>
    </svg>
  );
}

export function Step08Illustration({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none" className={className}>
      <rect width="800" height="500" rx="16" fill="#F8FAFC" />
      <defs>
        <pattern id="grid_v8" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect width="800" height="500" rx="16" fill="url(#grid_v8)" />

      {/* Step 08: Handshake (Contact Unlock & Unmediated Direct Connection) */}
      <g transform="translate(130, 60)">
        {/* Left Executive Contact Card (Unmasked) */}
        <g transform="translate(20, 50)">
          <rect
            width="180"
            height="210"
            rx="14"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            filter="drop-shadow(0 12px 24px rgba(15,23,42,0.06))"
          />
          <circle cx="45" cy="40" r="18" fill="#0F172A" />
          <path d="M38 40 C38 35 52 35 52 40 M45 32 A4 4 0 1 0 45 40" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />

          <rect x="75" y="30" width="90" height="10" rx="5" fill="#0F172A" />
          <rect x="75" y="46" width="60" height="6" rx="3" fill="#64748B" />

          <rect x="20" y="80" width="140" height="46" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="32" y="98" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700">
            EXECUTIVE DIRECT
          </text>
          <text x="32" y="112" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9">
            vp@enterprise.com
          </text>

          <rect x="20" y="145" width="140" height="28" rx="6" fill="#0F172A" />
          <text x="90" y="163" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">
            UNBLINDED ✓
          </text>
        </g>

        {/* Center Clasp Handshake Emblem */}
        <g transform="translate(235, 100)">
          <circle cx="35" cy="35" r="42" fill="#0F172A" filter="drop-shadow(0 12px 24px rgba(15,23,42,0.2))" />
          {/* Crisp vector Handshake Graphic */}
          <path d="M16 38 L26 28 C29 25 34 25 37 28 L42 33 L49 26 L55 32 L44 43 C41 46 36 46 33 43 Z" fill="#FFFFFF" />
          <path d="M22 42 L29 49 L36 42" stroke="#0F172A" strokeWidth="2" />

          {/* Horizontal connection beams */}
          <line x1="-35" y1="35" x2="-8" y2="35" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="4 3" />
          <line x1="78" y1="35" x2="105" y2="35" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="4 3" />

          {/* Milestone Badge */}
          <rect x="-35" y="96" width="140" height="28" rx="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <text x="35" y="114" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            CONTACTS UNLOCKED
          </text>
        </g>

        {/* Right Executive Contact Card (Unmasked) */}
        <g transform="translate(340, 50)">
          <rect
            width="180"
            height="210"
            rx="14"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
            filter="drop-shadow(0 12px 24px rgba(15,23,42,0.06))"
          />
          <circle cx="45" cy="40" r="18" fill="#0F172A" />
          <path d="M38 40 C38 35 52 35 52 40 M45 32 A4 4 0 1 0 45 40" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />

          <rect x="75" y="30" width="90" height="10" rx="5" fill="#0F172A" />
          <rect x="75" y="46" width="60" height="6" rx="3" fill="#64748B" />

          <rect x="20" y="80" width="140" height="46" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <text x="32" y="98" fill="#0F172A" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="700">
            EXECUTIVE DIRECT
          </text>
          <text x="32" y="112" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9">
            ceo@partner.io
          </text>

          <rect x="20" y="145" width="140" height="28" rx="6" fill="#0F172A" />
          <text x="90" y="163" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">
            UNBLINDED ✓
          </text>
        </g>

        {/* Bottom Status */}
        <rect x="175" y="330" width="190" height="34" rx="17" fill="#0F172A" />
        <text x="270" y="352" fill="#FFFFFF" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
          CULMINATION HANDSHAKE
        </text>
      </g>
    </svg>
  );
}

export const journeyIllustrations = [
  Step01Illustration,
  Step02Illustration,
  Step03Illustration,
  Step04Illustration,
  Step05Illustration,
  Step06Illustration,
  Step07Illustration,
  Step08Illustration,
];
