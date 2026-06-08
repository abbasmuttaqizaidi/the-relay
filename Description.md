# The Relay — Technical & Architectural Description

Welcome to **The Relay**, an operator-grade, curated business opportunity network designed for verified businesses to exchange high-value partnerships, referrals, vendors, and hiring opportunities.

This document provides a comprehensive technical, architectural, and structural breakdown of the repository.

---

## 🏗️ 1. Project Overview & Branding

**The Relay** is built on a simple premise: **"Where growth finds momentum"**. It replaces the noise of traditional social feeds with a high-fidelity, high-trust ecosystem.

- **The Core Metaphor:** A clean "baton pass" (the exchange of qualified business opportunities, warm introductions, and reseller partnerships).
- **Target Audience:** Verified B2B SaaS founders, operators, marketing agencies, wellness brands, logistics providers, and high-growth startups.
- **Design Philosophy:** High-contrast, Swiss-inspired modernist layout with a focus on data density, clean spacing, and structural borders.
- **The Visual Theme & Color Palette:**
  - **Primary / Accent:** Vibrant Operator Orange (`hsl(24 95% 45%)`) — representing momentum, action, and energy.
  - **Background:** Soft Slate Off-White (`hsl(210 15% 98%)`) — offering a premium, comfortable reading contrast.
  - **Foreground / Text:** Deep Charcoal/Navy (`hsl(215 25% 12%)`) — for strong readability.
  - **Borders / Separators:** Semi-transparent matching borders (`hsl(215 25% 12% / 0.12)`) that feel extremely thin and clean.
- **Typography:**
  - **Body Copy:** Sans-serif **Inter** (`'Inter', ui-sans-serif, system-ui, sans-serif`) for crisp, readable UI elements.
  - **Display & Titles:** Bold **Inter Tight** (`'Inter Tight', 'Inter', sans-serif`) for authoritative, balanced headings.
  - **Monospaced Items:** Clean **JetBrains Mono** (`'JetBrains Mono', ui-monospace, monospace`) for metadata, status tags, protocols, and technical values.
- **Micro-Animations & Motion:**
  - **Expo Ease:** Employs an ultra-smooth custom timing function: `var(--ease-out-expo)` / `cubic-bezier(0.16, 1, 0.3, 1)`.
  - **Momentum Slide (`.animate-momentum`):** Custom keyframe animations (`slide-in` from `-20px` X-axis with opacity) that make page entries feel alive, responsive, and tactile.

---

## 🛠️ 2. Core Technological Stack

The application leverages a cutting-edge modern JavaScript/TypeScript stack:

| Technology                                                               | Role                 | Details                                                                                                                   |
| ------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **[React 19](https://react.dev/)**                                       | Component Library    | Leverages the latest React 19 capabilities, running in an SSR-first environment.                                          |
| **[TanStack Start](https://tanstack.com/router/v1/docs/start/overview)** | Full-Stack Framework | An SSR-first framework powered by **Nitro** and **Vite**, combining server-side routing, streaming, and client rendering. |
| **[TanStack Router](https://tanstack.com/router)**                       | Routing Engine       | Type-safe, file-based routing with full path-parameter and query-parameter schema validation.                             |
| **[Vite 7](https://vite.dev/)**                                          | Frontend Tooling     | High-speed module bundling, Hot Module Replacement (HMR), and server-side bundling.                                       |
| **[Tailwind CSS v4.0](https://tailwindcss.com/)**                        | Styling Engine       | Uses `@tailwindcss/vite` to support CSS-first configurations, theme variables, and optimized compiling.                   |
| **[TanStack Query v5](https://tanstack.com/query)**                      | Server State         | Handles asynchronous data queries, caching, and server-side state synchronization.                                        |
| **[Radix UI Primitives](https://www.radix-ui.com/)**                     | UI Elements          | Accessible, unstyled primitives utilized for core user interface elements.                                                |
| **[Zod](https://zod.dev/)**                                              | Schema Validation    | Provides runtime type validation for routing search queries, inputs, and reciprocity models.                              |
| **[Bun](https://bun.sh/)**                                               | Package / Runtime    | Configured with `bun.lock` and `bunfig.toml` for exceptionally fast package resolution and scripts.                       |

---

## 📁 3. File & Directory Structure

```
.
├── .git/                       # Git repository metadata
├── .gitignore                  # Git untracked file configurations
├── .prettierignore             # Prettier format rules exclusion
├── .prettierrc                 # Prettier configuration rules
├── .tanstack/                  # TanStack compiler metadata
├── bun.lock                    # Bun package lock file
├── bunfig.toml                 # Bun configuration file
├── components.json             # Shadcn/Radix components layout schema
├── eslint.config.js            # ESLint static code analysis rules
├── node_modules/               # Installed dependencies
├── package-lock.json           # npm dependency lock file
├── package.json                # Project dependencies, metadata, and scripts
├── tsconfig.json               # TypeScript compiler options
├── vite.config.ts              # Vite configuration with TanStack & Tailwind integration
└── src/                        # Main Application Code
    ├── assets/                 # Static visual resources (e.g. baton.jpg)
    ├── components/             # Custom interface components
    │   └── ui/                 # 46 Radix-based UI primitive components (Button, Dialog, etc.)
    ├── hooks/                  # Custom React hooks (e.g. use-mobile.tsx)
    ├── lib/                    # Shared modules, APIs, and stores
    │   ├── api/                # Mock or live API endpoint interfaces
    │   ├── config.server.ts    # Server-side configurations
    │   ├── error-capture.ts    # Catastrophic SSR error grabber
    │   ├── error-page.ts       # Fallback error HTML template
    │   ├── interest-store.ts   # LocalStorage interest registry & Reciprocity engine
    │   └── utils.ts            # Tailwind classes utility merger (clsx + tailwind-merge)
    ├── routes/                 # File-Based Routing System
    │   ├── __root.tsx          # Application shell layout
    │   ├── index.tsx           # Product landing page route
    │   └── opportunities.tsx   # Opportunity dashboard route (validated parameters)
    ├── routeTree.gen.ts        # AUTO-GENERATED type-safe route mapping
    ├── router.tsx              # TanStack router setup & QueryClient instantiator
    ├── server.ts               # SSR entrypoint & h3 server integration
    ├── start.ts                # Client entrypoint & start configuration middleware
    └── styles.css              # Custom global styles and Tailwind v4 directives
```

---

## ⚡ 4. Code & Architecture Highlights

### A. The SSR & Error Handling Engine

The repository contains custom modules designed to capture SSR errors before the server engine (powered by H3/Nitro) swallows them:

- **`src/lib/error-capture.ts`**: Implements an out-of-band logger using `globalThis.addEventListener("error")` and `unhandledrejection`. This ensures stack traces are preserved.
- **`src/lib/error-page.ts`**: Houses a barebones, high-performance HTML error screen.
- **`src/server.ts`**: Intercepts swallowed SSR crashes, formats them, and returns a clean 500 error page using the HTML template.

### B. Gamified Reciprocity Engine (`src/lib/interest-store.ts`)

Rather than relying on paid plans alone, access in The Relay is incentivized via a **Network Score** (historically referred to as **Reciprocity Score** in technical contexts).

1. **Actions & Statuses:** Users can express interest in opportunities. Records exist in states: `idle`, `pending`, `accepted`, or `declined`.
2. **Contact Unlocking:** A target business’s BD contact details (name, email, role) are strictly hidden until the interest status is set to `accepted` (a successful baton pass).
3. **Score Calculation:**
   - Expressing Interest (Request Sent): **+5 Points**
   - Mutual Connection (Request Accepted): **+15 Points**
   - Decline: **Neutral (0 Points)**
4. **Synchronization:** Uses custom window events (`relay:interest` and `storage`) to sync scores in real-time across multiple open tabs.

### C. Type-Safe Dynamic Filtering (`src/routes/opportunities.tsx`)

The Opportunities feed operates a data-dense workspace:

- **Filtering Criteria:** Industry (SaaS, AI, Agency, etc.), Geography (USA, India, UAE, DACH, etc.), and Opportunity Type (Hiring, Vendor, Partnership, Distribution, etc.).
- **Search Param Validation:** All query states (`q`, `industry`, `geo`, `type`) are bound strictly to the browser URL and validated using **Zod schema integration** inside the Route definition:

  ```typescript
  const searchSchema = z.object({
    industry: fallback(z.enum(INDUSTRIES), "All").default("All"),
    geo: fallback(z.enum(GEOGRAPHIES), "All").default("All"),
    type: fallback(z.enum(TYPES), "All").default("All"),
    q: fallback(z.string(), "").default(""),
  });

  export const Route = createFileRoute("/opportunities")({
    validateSearch: zodValidator(searchSchema),
    // ...
  });
  ```

  This ensures that bookmarks, refreshes, and back/forward browser navigation preserve the exact filter state with total type-safety.

### D. UI Component Primitives (`src/components/ui/`)

The system comes with **46 highly polished UI primitives** that act as the design system's foundation:

- **`sidebar.tsx`**: A feature-rich collapsible layout for dashboards.
- **`chart.tsx`**: Layout helper wrapping Recharts, customized with Tailwind classes.
- **`carousel.tsx`**: Dynamic slide layouts powered by `embla-carousel-react`.
- **`dialog.tsx` / `drawer.tsx` / `sheet.tsx`**: Interactive overlays powered by Radix primitives and styled with seamless entry/exit animations.

---

## 🏃 5. Local Development Guide

Ensure you have [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/) installed.

### 📦 1. Installation

Using Bun (recommended):

```bash
bun install
```

Using npm:

```bash
npm install
```

### 🚀 2. Run Development Server

Spins up the Vite development server with SSR support:

```bash
bun run dev
# or
npm run dev
```

The server will start at `http://localhost:3000` (or the default TanStack Start port).

### 🏗️ 3. Production Build

Compile the codebase into a production-ready bundle optimized with Nitro:

```bash
bun run build
# or
npm run build
```

### 🧹 4. Linting & Formatting

To keep the codebase clean:

```bash
# Check code style with ESLint
bun run lint

# Automatically format code with Prettier
bun run format
```

---

## 📋 6. Key Routes Overview

1. **`/` (Landing Page)**:
   - Contains a gorgeous hero component showcasing verified network metrics.
   - Lists the different business cooperation protocols (distribution, referrals, hiring, warm intros).
   - Displays the reciprocity system preview and transparent membership pricing packages.
2. **`/opportunities` (The Feed)**:
   - The core interactive dashboard.
   - Renders the opportunities catalogue, filters, trust score badges, and search bars.
   - Includes the slide-out panels to pitch an introduction or view unlocked contact details.

---

## 🔔 7. Notifications & Global Layout Rules

### A. B2B Notifications & Interest Expression
- **Database Trigger**: When a user expresses interest in another user's opportunity on `/opportunities`, the submit handler triggers the backend `expressInterest` server action (`src/functions/expressInterest.ts`).
- **Notification Generation**: This records the interest in the database and automatically triggers a notification record inside the `Notification` model using `NotificationService.createNotification` for the owner of the opportunity. It also queues a mock email to alert the user.
- **Notification Dropdown**: Rendered next to the `UserAvatarDropdown` component in the main navigation headers for routes `/opportunities` and `/opportunities/my`. It polls every 30 seconds for live notification counts and allows users to mark notifications as read.

### B. App Sizing & Layout Constraints (Width Guidelines)
- **Unified Sizing**: All main views of the application (Home page `/`, Opportunities feed `/opportunities`, Dashboard `/opportunities/my`, profile editing, and onboarding) must use **`max-w-7xl`** (`1280px`) layout containers.
- **Consistent Grid Sizing**: Do **not** use `max-w-5xl` or `max-w-6xl` containers for main page or header elements, as this results in mismatched borders and excessive unused screen real estate on wider desktop displays.

---

## 🚀 8. Recent Feature Implementations & Promotions Flow

In the recent release, we introduced the **Opportunity Promotion Flow**, giving verified business profiles the option to request a promotion on their listings for maximum traction, moderated by the superadmin, and distinctively highlighted on the feed.

### A. Superadmin Promotion Control Loop
- **Server Action (`src/functions/getAdminOpportunities.ts`)**: Retrieves all platform listings with their current `promotion_status` (`none`, `pending_promotion`, `promoted`).
- **Admin Portal (`src/routes/admin.tsx`)**: Integrates dedicated admin control tabs where the superadmin can approve promotion requests (marking them `promoted`), reject requests, or revoke active promotions (marking them `none`).
- **Promotion Status Change Notifications**: When the superadmin changes the status of a promotion request, the server action triggers the database state transition and calls `NotificationService.createNotification` to alert the opportunity owner in real-time (e.g., notifying them when their promotion request is approved or rejected).

### B. Curated & Separated Opportunities Feed (`src/routes/opportunities.index.tsx`)
We decoupled the opportunities feed list to draw strict visual focus toward high-value, promoted listings:
- **Featured & Standard Feed Sections**: Split the feed list into a top shelf (`Featured Partnerships & Opportunities` with a custom orange border/gradient divider) and a bottom feed (`Standard Listings` with a slate hairline separator).
- **Dynamic Grid Layout**: 
  - If there is only `1` promoted opportunity, it renders full-width.
  - If there are `multiple` promoted opportunities, they automatically rearrange into a responsive 2-column grid layout (`grid-cols-1 lg:grid-cols-2 gap-6`) on desktop and wrap cleanly to 1-column on mobile.
- **Premium Dark-Mode Theming for Featured Cards (`ResultCard`)**:
  - **Visuals**: Dark charcoal/slate gradient background (`bg-slate-950 border-orange-500/40 border-l-[4.5px] border-l-orange-500`), high-contrast white text (`text-slate-50` titles, `text-slate-300` descriptions), and custom multi-color gradient `Featured` badges.
  - **Buttons**: Bright glowing Operator Orange CTA buttons (`bg-orange-600 hover:bg-orange-500 text-white`) for high click-through traction.
  - **Adaptive Card Breakpoints**: When multiple cards are tiled side-by-side in the desktop grid, they automatically render as vertical cards to prevent horizontal squeezing, only converting to side-by-side rows on wide displays (`xl` >= 1280px).


