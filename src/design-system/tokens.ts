/**
 * The Relay Design System — Core Design Tokens & Palette
 * Reference: design_system_components.md
 */

export const DESIGN_TOKENS = {
  colors: {
    // Canvas & Surfaces
    surface: "#F8FAFC",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#F1F5F9",
    surfaceContainer: "#E2E8F0",
    surfaceContainerHigh: "#CBD5E1",
    surfaceContainerHighest: "#94A3B8",

    // Typography & Content
    onSurface: "#171F2C", // Deep Charcoal
    onSurfaceVariant: "#64748B", // Slate Gray
    onSurfaceMuted: "#94A3B8", // Muted Gray
    inverseSurface: "#171F2C",
    inverseOnSurface: "#F8FAFC",

    // Primary Accents
    primaryAccent: "#F97316", // Operator / Relay Orange
    primaryAccentHover: "#EA580C",
    primaryAccentDark: "#9A3412",
    primaryContainer: "#FFF7ED",
    onPrimaryContainer: "#9A3412",

    // Foundation & Structural
    primaryFoundation: "#171F2C", // Deep Charcoal
    primaryFoundationHover: "#334155",
    pureBlack: "#000000",

    // Borders
    border: "#E2E8F0",
    borderHover: "#CBD5E1",
    borderDark: "#334155",

    // Functional & Status Indicators
    verifiedFill: "#ECFDF5",
    verifiedText: "#065F46",
    verifiedBorder: "#A7F3D0",
    verifiedDot: "#10B981",

    urgentFill: "#FFF7ED",
    urgentText: "#9A3412",
    urgentBorder: "#FED7AA",

    errorFill: "#FEF2F2",
    errorText: "#991B1B",
    errorBorder: "#FECACA",
  },
  radius: {
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    full: "9999px",
  },
  typography: {
    fontSans: "Inter, ui-sans-serif, system-ui, sans-serif",
    fontDisplay: "Inter Tight, Inter, sans-serif",
    fontMono: "JetBrains Mono, ui-monospace, monospace",
  },
} as const;
