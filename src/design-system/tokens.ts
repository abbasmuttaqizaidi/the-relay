/**
 * The Relay Design System — Core Design Tokens & Palette
 * Reference: seo_code_guide.md & design_system_components.md
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
    midnightContainer: "#0F172A",

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

    // Functional & Semantic Status Tokens (Triad)
    semantic: {
      success: {
        ink: "#15803D", // Mineral Sage
        surface: "#F0FDF4",
        border: "#DCFCE7",
        accent: "#16A34A",
        contrastRatio: "7.42:1 AAA",
      },
      warning: {
        ink: "#B45309", // Warm Honey Amber
        surface: "#FFFBEB",
        border: "#FDE68A",
        accent: "#D97706",
        contrastRatio: "5.88:1 AA",
      },
      danger: {
        crimson: {
          ink: "#991B1B", // Crimson Slate
          surface: "#FEF2F2",
          border: "#FECACA",
          accent: "#DC2626",
          contrastRatio: "6.95:1 AAA",
        },
        terracotta: {
          ink: "#9A3412", // Terracotta Rust
          surface: "#FFF1F2",
          border: "#FED7AA",
          accent: "#C2410C",
          contrastRatio: "6.12:1 AA",
        },
        ink: "#991B1B",
        surface: "#FEF2F2",
        border: "#FECACA",
        accent: "#DC2626",
      },
    },

    // Legacy Fallback Status Indicators
    verifiedFill: "#F0FDF4",
    verifiedText: "#15803D",
    verifiedBorder: "#DCFCE7",
    verifiedDot: "#16A34A",

    urgentFill: "#FFFBEB",
    urgentText: "#B45309",
    urgentBorder: "#FDE68A",

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
    fontSans: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif',
    fontDisplay: '"Plus Jakarta Sans", Inter Tight, Inter, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, monospace',
  },
} as const;
