export interface DefaultBusinessLogoProps {
    className?: string;
}

export const defaultBusinessLogo = ({ className = "w-full h-full" }: DefaultBusinessLogoProps = {}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%" fill="none" className={className}>
            <defs>
                <linearGradient id="bgGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>

                <linearGradient id="borderGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#475569" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#334155" stopOpacity="0.3" />
                </linearGradient>
            </defs>

            <rect x="8" y="8" width="184" height="184" rx="36" fill="url(#bgGrad)" />
            <rect x="8" y="8" width="184" height="184" rx="36" stroke="url(#borderGrad)" strokeWidth="2" />

            <g opacity="0.08" stroke="#FFFFFF" strokeWidth="1.5">
                <line x1="8" y1="68" x2="192" y2="68" />
                <line x1="8" y1="132" x2="192" y2="132" />
                <line x1="68" y1="8" x2="68" y2="192" />
                <line x1="132" y1="8" x2="132" y2="192" />
            </g>

            <g transform="translate(100, 100)">
                <path d="M -26 38.5 V -29.5 C -26 -34.5 -22 -38.5 -17 -38.5 H 17 C 22 -38.5 26 -34.5 26 -29.5 V 38.5 Z" fill="#F8FAFC" opacity="0.95" />

                <path d="M -46 38.5 V -7 C -46 -11.5 -42.5 -15 -38 -15 H -30 V 38.5 Z" fill="#94A3B8" opacity="0.85" />

                <path d="M 30 38.5 V -15 H 38 C 42.5 -15 46 -11.5 46 -7 V 38.5 Z" fill="#94A3B8" opacity="0.85" />

                <rect x="-14" y="-26.5" width="8" height="9" rx="1.5" fill="#0F172A" />
                <rect x="6" y="-26.5" width="8" height="9" rx="1.5" fill="#0F172A" />

                <rect x="-14" y="-10.5" width="8" height="9" rx="1.5" fill="#0F172A" />
                <rect x="6" y="-10.5" width="8" height="9" rx="1.5" fill="#0F172A" />

                <rect x="-14" y="5.5" width="8" height="9" rx="1.5" fill="#0F172A" />
                <rect x="6" y="5.5" width="8" height="9" rx="1.5" fill="#0F172A" />

                <rect x="-40" y="0.5" width="6" height="8" rx="1" fill="#0F172A" opacity="0.9" />
                <rect x="-40" y="15.5" width="6" height="8" rx="1" fill="#0F172A" opacity="0.9" />

                <rect x="34" y="0.5" width="6" height="8" rx="1" fill="#0F172A" opacity="0.9" />
                <rect x="34" y="15.5" width="6" height="8" rx="1" fill="#0F172A" opacity="0.9" />

                <path d="M -8 38.5 V 25.5 C -8 23 -6 21 -3.5 21 H 3.5 C 6 21 8 23 8 25.5 V 38.5 Z" fill="#0F172A" />
            </g>
        </svg>
    );
};

export const DefaultBusinessLogo = defaultBusinessLogo;
export default defaultBusinessLogo;