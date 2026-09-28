---
name: Monochrome Executive
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#575f6e'
  primary: '#010611'
  on-primary: '#ffffff'
  primary-container: '#171f2c'
  on-primary-container: '#7f8797'
  inverse-primary: '#bfc7d8'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000712'
  on-tertiary: '#ffffff'
  tertiary-container: '#112030'
  on-tertiary-container: '#79889c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe3f5'
  primary-fixed-dim: '#bfc7d8'
  on-primary-fixed: '#141c29'
  on-primary-fixed-variant: '#3f4756'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#d4e4fa'
  tertiary-fixed-dim: '#b9c8de'
  on-tertiary-fixed: '#0d1c2d'
  on-tertiary-fixed-variant: '#39485a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-refined, institutional-grade digital atmosphere tailored for top-tier private equity, venture syndicates, and M&A advisory teams handling high-velocity dealflow. The design philosophy draws on strict Swiss-influenced minimalism combined with high-finance restraint. 

Interactions must communicate discretion, certainty, and absolute clarity. We avoid decorative distractions, expressive gradients, whimsical micro-interactions, or vibrant signaling colors. Depth and state changes rely on typography weight shifts, hairline borders, and calculated spatial gaps. The resulting aesthetic feels closer to a private wealth prospectus or architectural blueprint than a conventional SaaS tool.

## Colors

The system employs an uncompromising, disciplined monochrome palette. No chromatic alerts, green yields, or amber warnings are permitted.

- **Primary Canvas & Foreground:** 
  - Canvas Base: `#F8FAFC`
  - High-Emphasis Neutral / Primary Surfaces: `#FFFFFF`
  - Deep Anchor / Primary Foreground: `#171F2C` (used for structural fills, dominant text, primary active states)
- **Secondary & Muted Tiers:**
  - Structural Hairlines & Dividers: `#E2E8F0`
  - Secondary Data / Metadata: `#64748B`
  - Tertiary Muted / Placeholders / Inactive Ticks: `#94A3B8`

States (success, caution, destructive) are distinguished entirely through semantic text copy, typographic styling, structural icons, or contrasting neutral badges (`#171F2C` against `#FFFFFF` or `#E2E8F0`), never through color-coded status chips.

## Typography

The type system blends the confident, structured geometry of Plus Jakarta Sans for executive titles with the neutral, hyper-legible utility of Inter for data density and operational flows.

- **Headlines (Plus Jakarta Sans):** Tightly tracked display and headline styles set an authoritative tone. Never use italic variants or soft weights for headers; keep them firmly anchored in medium, semibold, or bold.
- **Body & Data (Inter):** Tabular figures (`tnum`) must be enforced for all deal volumes, currency amounts, timestamps, and pipeline stages to ensure strict columnar scanability across financial models.
- **Labels (Inter):** High-density labels utilize uppercase tracking (`0.04em`) at the smallest scale (`label-sm`) for metric tags, stage descriptors, and ledger items.

## Layout & Spacing

The layout is built on a 12-column responsive fluid grid with precise, proportional bounds to comfortably support deal tables, pipeline swimlanes, and executive summaries.

- **Desktop (1280px and above):** 12-column grid, `margin: 2rem`, `gutter: 1.5rem`. Maximum layout container width is capped at 1600px for optimal line-length discipline.
- **Tablet (768px – 1279px):** 8-column grid, `margin: 1.5rem`, `gutter: 1rem`. Side panels and multi-column comparison tables collapse into stacked, tabbed views.
- **Mobile (< 768px):** 4-column grid, `margin-mobile: 1rem`, `gutter-sm: 1rem`. Data grids shift to linear card-row patterns with hairline horizontal separations.
- **Rhythm & Padding:** Structural white space is generous. Cards and operational blocks avoid dense, claustrophobic inner margins, defaulting to `space-lg` internally to ensure high-value transactions are viewed with breathing room.

## Elevation & Depth

This design system deliberately eliminates drop shadows, floating blurs, and skeuomorphic layering. Hierarchy is communicated exclusively via **low-contrast outlines, hairline borders, and pure surface shifts**.

- **Surfaces:** The canvas background is fixed at `#F8FAFC`. Elevated modules (cards, deal panels, flyouts, and toolbars) sit on crisp `#FFFFFF` surfaces.
- **Outlines:** All bounded elements use a crisp 1px solid border (`#E2E8F0`). Borders do not soften on hover; interactions are indicated by shifting border contrast from `#E2E8F0` to `#171F2C` or background fills to `#F8FAFC`.
- **Modals & Drawers:** High-priority overlays maintain flat white `#FFFFFF` fills bounded by a 1px `#171F2C` border. Backdrops use an unblurred, clean solid overlay of `#171F2C` with a fixed opacity of 40%.

## Shapes

The geometric form factor relies on razor-sharp precision. Roundedness is strictly constrained to standard 4px corners (`0.25rem`) across all actionable elements, inputs, and containment modules.

- **Base Radius (4px):** Applied to buttons, text input fields, selection boxes, chips, and data cards.
- **Strict Prohibition:** Full pills (`border-radius: 9999px`), circular status dots, and heavy rounded card corners are strictly disallowed. The UI reflects institutional architectural drafting, characterized by squared discipline and exact 90-degree rhythm slightly softened only to prevent visual artifacting on high-DPI displays.

## Components

### Buttons
- **Primary:** Solid `#171F2C` background, `#FFFFFF` text, 1px border (`#171F2C`), 4px corner radius. Hover state transitions to `#1E293B` background.
- **Secondary / Outline:** Pure `#FFFFFF` background, `#171F2C` text, 1px border (`#E2E8F0`). Hover transitions to `#F8FAFC` background and `#171F2C` border.
- **Tertiary / Ghost:** Transparent background, `#64748B` text, no border. Hover transitions to `#171F2C` text and `#F8FAFC` background fill.
- **Size & Padding:** Standard height is 36px (compact) and 42px (default) with `space-md` horizontal padding. Typography is strictly `label-md`.

### Status & Deal Stage Chips
- **Structure:** 4px radius, 1px solid border, 22px fixed height, `label-sm` uppercase text.
- **Palette Rules:** Absolutely no red, green, blue, or yellow badges.
  - *Active / Sourced:* `#FFFFFF` background, `#171F2C` border, `#171F2C` text.
  - *Under Review / Diligence:* `#F8FAFC` background, `#E2E8F0` border, `#64748B` text.
  - *Archived / Closed:* `#171F2C` background, `#171F2C` border, `#FFFFFF` text.

### Inputs & Controls
- **Text Inputs:** Height 40px, `#FFFFFF` background, 1px `#E2E8F0` border, 4px corner radius, `#171F2C` text, `#94A3B8` placeholder. Focus state transitions border to 1px `#171F2C` with zero shadow ring.
- **Checkboxes & Radios:** Sharp 4px boxes (and 4px softened radio marks). Inactive: `#FFFFFF` fill, 1px `#E2E8F0` border. Checked: `#171F2C` fill, solid white check/dot indicator.

### Cards & Deal Rows
- **Deal Card:** `#FFFFFF` background, 1px solid `#E2E8F0` border, 4px corner radius, padded with `space-lg`. Hover effect is a border transition to `#171F2C`.
- **Data Tables:** Outer border 1px `#E2E8F0`. Header row uses `#F8FAFC` with uppercase `label-sm` text in `#64748B`. Row dividers are 1px `#E2E8F0`. Hover row state is a subtle switch to `#F8FAFC`.

### Executive Metrics (KPI Tiles)
- Clean card container with a split-level hierarchy: uppercase `label-sm` in `#64748B` on top, followed by large tabular display figures (`display-lg`) in `#171F2C`, completed by secondary variance text denoted via standard typography symbols (e.g., `+14.2% YOY` in `#64748B`).