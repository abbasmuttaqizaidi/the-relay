import React from "react";

export interface RelayVerificationSealProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

export function RelayVerificationSeal({
  className,
  size,
  width = size ?? "100%",
  height = size ?? "100%",
  ...props
}: RelayVerificationSealProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={width}
      height={height}
      fill="none"
      className={className}
      {...props}
    >
      {/* Minimalist Executive Monochrome / Emerald Checkmark Icon (Clean Verified Seal) */}
      <circle cx="60" cy="60" r="50" fill="#0F172A" />
      <circle cx="60" cy="60" r="44" stroke="#10B981" strokeWidth="2.5" />

      {/* Clean, bold verified checkmark without the chevron/arrow terminal */}
      <path
        d="M40 60 L53 73 L82 44"
        stroke="#FFFFFF"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RelayVerificationSeal;
