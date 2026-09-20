import * as React from "react";

export interface RegistrationMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * RegistrationPendingMark
 * The Relay — Executive In Progress Seal (Amber/Gold Desk Audit)
 */
export function RegistrationPendingMark({
  size = 48,
  className,
  ...props
}: RegistrationMarkProps) {
  const idSuffix = React.useId().replace(/:/g, "_");
  const shadowId = `p-shadow-${idSuffix}`;
  const pillShadowId = `p-pill-shadow-${idSuffix}`;
  const gradBorderId = `p-grad-border-${idSuffix}`;
  const plaqueId = `p-plaque-${idSuffix}`;
  const arcGradId = `p-arc-grad-${idSuffix}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <defs>
        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#D97706" floodOpacity="0.12" />
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.06" />
        </filter>
        <filter id={pillShadowId} x="-10%" y="-20%" width="120%" height="150%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#78350F" floodOpacity="0.25" />
        </filter>

        <linearGradient id={gradBorderId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id={plaqueId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        <linearGradient id={arcGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Outer Solid Card Canvas */}
      <circle cx="250" cy="250" r="236" fill="#FFFFFF" filter={`url(#${shadowId})`} />

      {/* Outer Precision Technical Rim */}
      <circle cx="250" cy="250" r="234" fill="none" stroke={`url(#${gradBorderId})`} strokeWidth="4" />
      <circle cx="250" cy="250" r="222" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="214" fill="#FFFDF5" stroke="#D97706" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

      {/* Calibrated Compass / Guilloché Pips */}
      <g stroke="#D97706" strokeWidth="2" opacity="0.4">
        <line x1="250" y1="20" x2="250" y2="28" />
        <line x1="250" y1="472" x2="250" y2="480" />
        <line x1="20" y1="250" x2="28" y2="250" />
        <line x1="472" y1="250" x2="480" y2="250" />
      </g>

      {/* Core White Field */}
      <circle cx="250" cy="250" r="198" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

      {/* TOP SECTION: Header & Chronometer Emblem */}
      <text
        x="250"
        y="96"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="4.5"
        fill="#B45309"
        textAnchor="middle"
      >
        ACTIVE DESK AUDIT RUNNING
      </text>

      {/* Central Emblem: Precision Radar / Chronometer Gauge */}
      <g transform="translate(250, 154)">
        <circle cx="0" cy="0" r="46" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="34" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <circle
          cx="0"
          cy="0"
          r="34"
          fill="none"
          stroke={`url(#${arcGradId})`}
          strokeWidth="5.5"
          strokeDasharray="150 70"
          strokeLinecap="round"
          transform="rotate(-90)"
        />
        <circle cx="0" cy="0" r="5" fill="#78350F" />
        <path
          d="M 0 -17 L 0 0 L 12 8"
          fill="none"
          stroke="#78350F"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="0" r="2" fill="#FDE68A" />
        <circle cx="0" cy="-34" r="2.5" fill="#B45309" />
      </g>

      {/* CENTER BAND: High-Contrast Architectural Banner */}
      <g filter={`url(#${pillShadowId})`}>
        <path d="M 55 222 L 445 222 L 428 282 L 72 282 Z" fill={`url(#${plaqueId})`} />
        <line x1="55" y1="223" x2="445" y2="223" stroke="#F59E0B" strokeWidth="2.5" />
        <line x1="72" y1="281" x2="428" y2="281" stroke="#D97706" strokeWidth="2" />
        <circle cx="85" cy="252" r="3" fill="#FBBF24" />
        <circle cx="415" cy="252" r="3" fill="#FBBF24" />
        <text
          x="250"
          y="263"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
          fontSize="30"
          fontWeight="900"
          letterSpacing="5"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          IN PROGRESS
        </text>
      </g>

      {/* BOTTOM SECTION: Institutional Brand & Status */}
      <g transform="translate(250, 342)">
        <g>
          <line x1="-96" y1="-2" x2="-44" y2="-2" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <text
            x="0"
            y="4"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            fontSize="16"
            fontWeight="800"
            letterSpacing="5"
            fill="#0F172A"
            textAnchor="middle"
          >
            THE RELAY
          </text>
          <line x1="44" y1="-2" x2="96" y2="-2" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        <text
          x="0"
          y="28"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="3.5"
          fill="#B45309"
          textAnchor="middle"
        >
          KYB VERIFICATION DESK
        </text>

        <rect x="-70" y="42" width="140" height="22" rx="4" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
        <text
          x="0"
          y="57"
          fontFamily="monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#92400E"
          textAnchor="middle"
        >
          STAGE 2 • SLA &lt; 24H
        </text>
      </g>

      {/* Subtle Bottom Stability Arc */}
      <path d="M 175 440 A 190 190 0 0 0 325 440" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/**
 * RegistrationVerifiedMark
 * The Relay — Executive Verified Seal (Emerald Attestation)
 */
export function RegistrationVerifiedMark({
  size = 48,
  className,
  ...props
}: RegistrationMarkProps) {
  const idSuffix = React.useId().replace(/:/g, "_");
  const shadowId = `v-shadow-${idSuffix}`;
  const pillShadowId = `v-pill-shadow-${idSuffix}`;
  const gradBorderId = `v-grad-border-${idSuffix}`;
  const plaqueId = `v-plaque-${idSuffix}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <defs>
        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#059669" floodOpacity="0.12" />
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.06" />
        </filter>
        <filter id={pillShadowId} x="-10%" y="-20%" width="120%" height="150%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#064E3B" floodOpacity="0.25" />
        </filter>

        <linearGradient id={gradBorderId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <linearGradient id={plaqueId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>

      {/* Outer Solid Card Canvas */}
      <circle cx="250" cy="250" r="236" fill="#FFFFFF" filter={`url(#${shadowId})`} />

      {/* Outer Precision Technical Rim */}
      <circle cx="250" cy="250" r="234" fill="none" stroke={`url(#${gradBorderId})`} strokeWidth="4" />
      <circle cx="250" cy="250" r="222" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="214" fill="#F8FAFC" stroke="#059669" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

      {/* Calibrated Compass / Guilloché Pips */}
      <g stroke="#047857" strokeWidth="2" opacity="0.4">
        <line x1="250" y1="20" x2="250" y2="28" />
        <line x1="250" y1="472" x2="250" y2="480" />
        <line x1="20" y1="250" x2="28" y2="250" />
        <line x1="472" y1="250" x2="480" y2="250" />
      </g>

      {/* Core White Field */}
      <circle cx="250" cy="250" r="198" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

      {/* TOP SECTION: Attestation Header & Shield Emblem */}
      <text
        x="250"
        y="96"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="4.5"
        fill="#047857"
        textAnchor="middle"
      >
        OFFICIAL KYB ATTESTATION
      </text>

      {/* Central Emblem: Precision Shield with Checkmark */}
      <g transform="translate(250, 154)">
        <circle cx="0" cy="0" r="46" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5" />
        <path
          d="M 0 -30 C 18 -30 27 -26 27 -14 C 27 12 14 28 0 34 C -14 28 -27 12 -27 -14 C -27 -26 -18 -30 0 -30 Z"
          fill="#059669"
        />
        <path
          d="M 0 -26 C 14 -26 22 -23 22 -12 C 22 10 11 23 0 28 C -11 23 -22 10 -22 -12 C -22 -23 -14 -26 0 -26 Z"
          fill="none"
          stroke="#6EE7B7"
          strokeWidth="1.2"
          opacity="0.6"
        />
        <path
          d="M -11 -2 L -3 6 L 11 -8"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* CENTER BAND: High-Contrast Architectural Banner */}
      <g filter={`url(#${pillShadowId})`}>
        <path d="M 55 222 L 445 222 L 428 282 L 72 282 Z" fill={`url(#${plaqueId})`} />
        <line x1="55" y1="223" x2="445" y2="223" stroke="#10B981" strokeWidth="2.5" />
        <line x1="72" y1="281" x2="428" y2="281" stroke="#047857" strokeWidth="2" />
        <circle cx="85" cy="252" r="3" fill="#34D399" />
        <circle cx="415" cy="252" r="3" fill="#34D399" />
        <text
          x="250"
          y="263"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
          fontSize="32"
          fontWeight="900"
          letterSpacing="6"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          VERIFIED
        </text>
      </g>

      {/* BOTTOM SECTION: Institutional Brand & Validation */}
      <g transform="translate(250, 342)">
        <g>
          <line x1="-96" y1="-2" x2="-44" y2="-2" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <text
            x="0"
            y="4"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
            fontSize="16"
            fontWeight="800"
            letterSpacing="5"
            fill="#0F172A"
            textAnchor="middle"
          >
            THE RELAY
          </text>
          <line x1="44" y1="-2" x2="96" y2="-2" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        <text
          x="0"
          y="28"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="3.5"
          fill="#047857"
          textAnchor="middle"
        >
          INSTITUTIONAL TRUST • TIER 1
        </text>

        <rect x="-70" y="42" width="140" height="22" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
        <text
          x="0"
          y="57"
          fontFamily="monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#475569"
          textAnchor="middle"
        >
          GLEIF / LEI AUDITED
        </text>
      </g>

      {/* Subtle Bottom Stability Arc */}
      <path d="M 175 440 A 190 190 0 0 0 325 440" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/**
 * Universal RegistrationMark Component
 * Renders either RegistrationVerifiedMark or RegistrationPendingMark based on status
 */
export function DynamicRegistrationMark({
  status,
  size = 32,
  className,
  ...props
}: {
  status: "approved" | "pending" | string;
  size?: number | string;
  className?: string;
}) {
  if (status === "approved") {
    return <RegistrationVerifiedMark size={size} className={className} {...props} />;
  }
  return <RegistrationPendingMark size={size} className={className} {...props} />;
}
