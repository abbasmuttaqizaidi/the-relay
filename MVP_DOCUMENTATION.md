# The Relay — Product Architecture & MVP System Documentation

> **Version:** 1.0.0 (Production MVP)  
> **Last Updated:** September 2026  
> **Platform Classification:** Double Opt-In B2B Opportunity Exchange Protocol  
> **Target Audience:** Verified Founders, C-Level Operators, Enterprise Partners, and Vetted Businesses.

---

## 1. Executive Summary & Core Purpose

### 1.1 What is The Relay?
**The Relay** is a private, verified B2B collaboration and opportunity exchange protocol. It replaces noisy cold outreach, LinkedIn spam, and unverified broker channels with a structured **Double Opt-In Introduction Exchange** powered by **Business Verification Gates** and **Network Reciprocity Scoring**.

### 1.2 The Problem It Solves
- **Cold Outreach Fatigue:** Founders and operators receive dozens of unsolicited sales pitches daily.
- **Unverified Counterparties:** High friction in validating whether an entity is a legitimate operating business with real decision-makers.
- **Asymmetric Value Exchange:** Takers flood networks without contributing back.

### 1.3 The Relay Solution
1. **Mandatory Business Onboarding:** Every operator must register a verified business profile before accessing the live board.
2. **Double Opt-In Handshake:** Contact information (direct email, founder LinkedIn, phone) remains 100% encrypted/hidden until the opportunity owner reviews the pitch and explicitly accepts the introduction.
3. **Reciprocity Network Score:** Users earn network score by posting real opportunities and accepting quality introductions, ensuring mutual give-and-take.

---

## 2. System Roles & Verification Levels

The platform enforces 3 verification tiers that govern platform capabilities:

| Tier | Badge Display | Requirements | Permissions & Capabilities |
| :--- | :--- | :--- | :--- |
| **Approved** | Gold Badge (`Approved`) | Tax ID (EIN/GST/CIN), active revenue proof, or domain validation verified by Admin | **Full Unrestricted Access:** Post opportunities, express interest, accept introductions, unlock contacts, manage team. |
| **Applied (Pending)** | Indigo Badge (`Applied`) | Registered company profile with valid website and founder LinkedIn | **Browse & Save Access:** Browse live opportunity feed, bookmark listings, track application review. Posting requires approval. |
| **Rejected** | Slate / Red indicator | Failed domain or entity validation | Access blocked from active trading; can edit profile to request re-review. |

---

## 3. End-to-End User Flow & Lifecycle

```
[ Visitor Lands on /home ]
           │
           ▼
[ Sign In / Sign Up with Google/Email ]
           │
           ▼
[ Auth Guard Checks Business Profile in Database ]
      ├── (No Business Registered) ──────► Redirected to [/onboarding] Form
      │                                                │ (Submits Profile)
      │                                                ▼
      └── (Has Business Profile) ────────► Lands on [/opportunities] Board
                                                       │
                                 ┌─────────────────────┴─────────────────────┐
                                 ▼                                           ▼
                      [ Browse Live Feed ]                       [ Create Listing (Approved) ]
                                 │                                           │
                                 ▼                                           ▼
                    [ Express Interest (Pitch) ]                 [ Manage in /opportunities/my ]
                                 │                                           │
                                 ▼                                           ▼
                   [ Owner Receives Pitch ] ──────────────► [ Owner Accepts / Declines ]
                                                                             │
                                                                   (If Accepted)
                                                                             ▼
                                                                [ Mutual Contact Unlocked ]
                                                                [ +Reciprocity Score Boost ]
```

---

## 4. Comprehensive Tab-by-Tab & Page Specification

### 4.1 Home Landing Page (`/home`)
- **Hero & Mission Statement:** Introduces The Relay protocol, double opt-in mechanics, and privacy guarantees.
- **Live Ecosystem Metrics:** Real-time stats showing active listings, curated categories, and network activity.
- **Opportunity Types Showcase:** Interactive previews of Deal Categories (Partnerships, Referrals, Vendors, Hiring, Investment, Strategic Advice).
- **Security & Privacy Pillar:** Explains how contact info stays hidden until mutual handshake.
- **Operator FAQs:** Common questions regarding verification, pricing, and score mechanics.

### 4.2 Opportunities Board (`/opportunities`)
The central trading exchange where verified operators browse and pitch for live requirements.

- **Hero Header & Listing Counter:** Displays total active listings in the platform.
- **Search & Multi-Filter Bar:**
  - **Keyword Search:** Instant search across listing titles, descriptions, and industries.
  - **Category Tabs:** Filter by `All`, `Partnerships`, `Referrals`, `Distribution`, `Vendors`, `Hiring`, `Strategic Advice`, `Investment`.
  - **Filter Slider Sheet:** Advanced filters for Geography, Target Industries, and Interested Operator Limits.
- **Opportunity Cards (Compact Mobile & Desktop):**
  - **Category Tag & ID:** e.g., `PARTNERSHIP #OP-1042` with calendar posted time.
  - **Title & Description:** Summary with clean line-clamping on mobile viewport.
  - **Company & Trust Badge:** Displays verified company name (or `Confidential` with lock icon if anonymity requested) + Verification Badge.
  - **Metadata Row:** Industry, Location, and count of verified businesses interested.
  - **Action Button:**
    - `Express Interest`: Opens pitch submission dialog.
    - `Your Listing`: Read-only badge for listings posted by current operator.
    - `Pending`: Status badge when pitch is awaiting counterparty review.
    - `Contact Unlocked`: Displays direct name, role, and email once accepted.
- **In-Place Opportunity Creation Modal (`Post Opportunity`):**
  - Instant modal dialog (zero page jumps) for Approved businesses.
  - Fields: Title, Category, Industry, Detailed Description (50–3000 chars), Expiration Days (7, 14, 30, 60, 90, Never), Anonymous flag (`Hide Company Name`), and Promotion flag.
- **Interactive Guided Tour (Driver.js):**
  - Automated interactive tour for first-time logged-in operators highlighting key features.

### 4.3 My Opportunities Dashboard (`/opportunities/my`)
Operator control room to manage published listings, saved bookmarks, and outgoing pitches.

- **Tabs:**
  1. **Posted Listings Tab:**
     - Desktop table & mobile card views.
     - Actions: `Edit Listing`, `Close Listing`, `Delete Listing`.
     - Direct status badges (`Active`, `Closed`, `Expired`, `Promoted`).
  2. **Saved Bookmarks Tab:**
     - Collection of bookmarked opportunities with quick detail drawer and remove options.
  3. **Pending Handshakes Tab:**
     - Live overview of all outbound pitches sent to other businesses.
- **Header Actions:** Quick `Post Opportunity` button triggering the in-place creation dialog.

### 4.4 Requests Hub (`/requests/incoming` & `/requests/sent`)
The communication protocol where double opt-in introductions are negotiated.

- **Incoming Requests (`/requests/incoming`):**
  - Lists pitches sent by other operators to your posted opportunities.
  - Details: Pitch message, applicant business name, industry, verification tier, and timestamp.
  - Actions:
    - **Accept Handshake:** Unlocks mutual direct contact info and awards reciprocity points.
    - **Decline Handshake:** Rejects pitch politely without revealing sensitive contact info.
  - Live unread notification counter badge in Navbar.
- **Sent Requests (`/requests/sent`):**
  - Tracks all outgoing pitch requests with live statuses: `Pending Review`, `Accepted (Contact Unlocked)`, or `Declined`.
  - Option to withdraw pitch while pending.

### 4.5 Connection Detail View (`/connections/$id`)
- Dedicated verified handshake page accessible after mutual acceptance.
- Displays: Unlocked counterpart contact card (Name, Role, Direct Email, Verified Website, LinkedIn URL), original deal memorandum, and email thread launcher.

### 4.6 Business Profile (`/business-profile`)
- Company details management (Company Name, Website, Industry, Description, HQ Location, Team Size, Funding Stage, Founded Year, Social Links).
- **Website Domain Verification Tool:** Checks domain SSL and DNS validity.
- **Network Reciprocity Card:** Visualizes operator score and platform footprint.

### 4.7 Onboarding Gate (`/onboarding`)
- Automatic entry point for newly authenticated accounts.
- Collects initial company profile and website to register business record in database.

### 4.8 Admin Review Console (`/admin`)
- Accessible only to authorized protocol administrators.
- Allows approving, rejecting (with custom email notification reason), or placing business applications into review.

---

## 5. Network Reciprocity & Gamification Engine

The Relay uses an automated score engine to ensure active community reciprocity:

| Action | Reciprocity Score Impact | Rationale |
| :--- | :--- | :--- |
| **Post Quality Opportunity** | `+5 Points` | Contributes fresh deal flow to the ecosystem |
| **Accept Introduction Pitch** | `+15 Points` | Rewards responsive operators for closing handshakes |
| **Complete Business Profile** | `+10 Points` | Increases network data integrity |
| **Withdraw Stale Pitch** | `0 Points` | Keeps request queues clean |

---

## 6. Technical Stack & Infrastructure Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│  FRONTEND & SSR LAYER                                                  │
│  • TanStack Start (Full-stack SSR) + TanStack Router                   │
│  • React 19 + TypeScript (Strict mode)                                 │
│  • Tailwind CSS v4 + Lucide Icons + Driver.js + Sonner Toasts          │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  AUTHENTICATION & IDENTITY LAYER                                       │
│  • Clerk Auth (Google OAuth + Email Magic Links)                       │
│  • Zero-Latency Head Detection Script (Flicker prevention)             │
│  • Resilient Ref-Based Session Hydration Timer (Cancelable 2.5s buffer)│
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  DATA & BACKEND LAYER                                                  │
│  • Prisma ORM 7 + PostgreSQL (Supabase Connection Pooling)             │
│  • Server Functions (createServerFn) with Zod Input Validation         │
│  • Resend API (Transactional notification emails)                      │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  QUALITY & AUTOMATION LAYER                                            │
│  • Vitest + React Testing Library + JSDOM (Automated Test Suite)       │
│  • Husky Git Hooks (Pre-commit & Pre-push automated test execution)    │
│  • GitHub Actions CI Workflow (Automated cloud testing & build checks) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Automated Safety Nets & CI/CD Pipeline

To ensure future codebase modifications never break critical flows:

1. **Local Git Hooks (Husky):**
   - `.husky/pre-commit` and `.husky/pre-push` automatically run `npm run test`.
   - Any failing test aborts git commit/push locally before code leaves the machine.
2. **Cloud CI (GitHub Actions):**
   - `.github/workflows/ci.yml` runs clean Ubuntu tests and full production build verification on every push and pull request.
3. **Core Test Suites:**
   - `tests/auth-flow.test.ts`: Validates OAuth query detection, zero-latency script, cancelable timers, and route protection.
   - `tests/onboarding-guards.test.ts`: Validates onboarding gate redirects, approved business posting permissions, and guest redirection.

---

## 8. Summary of Active Navigation

- **Opportunities:** Live Exchange Feed (`/opportunities`)
- **My Opportunities:** Operator Listing Manager (`/opportunities/my`)
- **Requests:** Double Opt-In Handshakes (`/requests/incoming`)
- **Saved:** Bookmarked Opportunities (Mobile Sheet)
- **Profile:** Business Identity & Verification Status (`/business-profile`)
