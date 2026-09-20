# The Relay — Opportunity Board Documentation
# Don't complicate the design and don't make it complex. The UI/UX should be easy for the user to understand make it not too complex like Apollo and not too simple like Facebook or Instagram.
Comprehensive technical, functional, and UX architectural guide for the **Opportunity Board** and Opportunity Lifecycle in **The Relay**.

---

## 1. System Overview & Core Purpose

The **Opportunity Board** is the primary B2B discovery and deal-flow engine in The Relay. It allows verified businesses to post high-intent commercial opportunities (distribution partnerships, revenue-sharing collaborations, vendor agreements, strategic referrals, and investments) and discover offerings posted by peer businesses.

### Key Tenets:
1. **Reciprocal Exchange First:** Every opportunity is structured to facilitate mutual commercial value rather than one-way lead generation.
2. **Privacy by Default:** Contact information (email, phone, LinkedIn, custom channels) is strictly hidden during browsing, filtering, and initial pitch submissions.
3. **Verified Business Identity:** Opportunities are tied to verified business profiles with domain validation and industry classification.

---

## 2. Route Architecture & Navigation

The Opportunity ecosystem is comprised of three primary routes powered by **TanStack Router**:

| Route Path | File Location | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/opportunities` | `src/routes/opportunities.index.tsx` | Public & Authenticated | Main Opportunity Discovery Board. Search, filter, view details, save opportunities, and submit initial interest pitches. |
| `/opportunities/my` | `src/routes/opportunities.my.tsx` | Authenticated (Business Owner) | Business dashboard for managing posted listings (Active, Closed, Expired) and saved bookmarked listings. |
| `/saved-opportunities` | `src/routes/saved-opportunities.tsx` | Authenticated (Business Owner) | Dedicated view for quickly accessing and managing bookmarked opportunities. |

---

## 3. Database Schema & Prisma Data Models

The Opportunity engine is backed by PostgreSQL via **Prisma ORM**.

```prisma
model Opportunity {
  id                String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  opportunity_number String   @unique // Format: RY-0001, RY-0002...
  business_id       String    @db.Uuid
  title             String
  description       String
  category          String    // partnership, referral, distribution, vendor, hiring, strategic_advice, investment
  industry          String
  location          String?
  offer_text        String?
  expires_at        DateTime? @db.Timestamptz(6)
  status            String    @default("active") // active, closed, expired
  hide_company_name Boolean   @default(false)
  promotion_status  String    @default("none") // none, featured, urgent
  created_at        DateTime  @default(now()) @db.Timestamptz(6)
  updated_at        DateTime  @default(now()) @updatedAt @db.Timestamptz(6)

  // Relations
  business          Business  @relation(fields: [business_id], references: [id], onDelete: Cascade)
  interests         Interest[]
  saved_by          SavedOpportunity[]

  @@index([business_id])
  @@index([status])
  @@index([category])
  @@index([industry])
  @@map("opportunities")
}

model SavedOpportunity {
  id             String      @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  business_id    String      @db.Uuid
  opportunity_id String      @db.Uuid
  created_at     DateTime    @default(now()) @db.Timestamptz(6)

  business       Business    @relation(fields: [business_id], references: [id], onDelete: Cascade)
  opportunity    Opportunity @relation(fields: [opportunity_id], references: [id], onDelete: Cascade)

  @@unique([business_id, opportunity_id])
  @@index([business_id])
  @@index([opportunity_id])
  @@map("saved_opportunities")
}
```

---

## 4. Backend Services & Server Functions

All opportunity business logic is encapsulated in `OpportunityService` (`src/services/opportunity.service.ts`) and exposed via TanStack Start Server Functions (`createServerFn`).

### 4.1 OpportunityService Core Methods

1. **`generateOpportunityNumber(): Promise<string>`**
   - Automatically generates a sequential unique ID formatted as `RY-0001`, `RY-0002`, etc.

2. **`createOpportunity(dto: CreateOpportunityDTO): Promise<Opportunity>`**
   - Validates input, generates sequential number, assigns `status: "active"`, and creates record in PostgreSQL.

3. **`updateOpportunity(id: string, dto: UpdateOpportunityDTO): Promise<Opportunity>`**
   - Updates title, description, category, industry, location, expiration, status, and privacy settings.

4. **`closeOpportunity(opportunityId: string, businessId: string): Promise<Opportunity>`**
   - Sets status to `"closed"`, preventing new interest pitches while preserving existing exchange history.

5. **`deleteOpportunity(opportunityId: string, businessId: string): Promise<{ success: boolean }>`**
   - Authorizes business ownership and cascades deletion.

6. **`listOpportunities(filters: ListOpportunitiesFilters): Promise<{ opportunities: Opportunity[]; total: number }>`**
   - Supports search across titles/descriptions, category filtering, industry filtering, location filtering, pagination, and sorting (`newest`, `expiring_soon`, `popular`).

7. **`getMyOpportunities(businessId: string): Promise<Opportunity[]>`**
   - Retrieves all opportunities posted by the authenticated business.

### 4.2 Server Functions Mapping

| Server Function | File Path | Method | Purpose |
| :--- | :--- | :--- | :--- |
| `listOpportunities` | `src/functions/listOpportunities.ts` | POST | Queries discovery board opportunities with search and filter parameters. |
| `createOpportunity` | `src/functions/createOpportunity.ts` | POST | Validates payload via Zod and creates a new listing. |
| `updateOpportunity` | `src/functions/updateOpportunity.ts` | POST | Updates existing opportunity properties. |
| `closeOpportunity` | `src/functions/closeOpportunity.ts` | POST | Closes listing to incoming pitches. |
| `deleteOpportunity` | `src/functions/deleteOpportunity.ts` | POST | Deletes opportunity from database. |
| `saveOpportunity` | `src/functions/saveOpportunity.ts` | POST | Adds opportunity to business's saved bookmarks. |
| `removeSavedOpportunity` | `src/functions/removeSavedOpportunity.ts` | POST | Removes bookmark. |
| `getSavedOpportunities` | `src/functions/getSavedOpportunities.ts` | POST | Retrieves bookmarked opportunities for current user. |
| `expressInterest` | `src/functions/expressInterest.ts` | POST | Submits initial exchange pitch, instantiating Stage 1 of the Exchange Workflow. |

---

## 5. UI Features & User Workflows

### 5.1 Main Discovery Board (`/opportunities`)
- **Top Intelligence Strip:** 4 live metrics (Active Deals, Response Time, Reciprocity Rate, Verified Businesses).
- **Category Filter Tabs:**
  - `All`, `Partnership`, `Referral`, `Distribution`, `Vendor`, `Hiring`, `Strategic Advice`, `Investment`.
- **Search & Advanced Filters:**
  - Real-time text search (opportunity title, company name, description).
  - Industry filter dropdown (SaaS, AI & Automation, D2C, Logistics, Legal, etc.).
  - Geographic region filter.
  - Sorting (Newest, Parity Score, Urgency).
- **2-Column Layout:**
  - 8-Column listing feed.
  - 4-Column persistent sidebar with "How The Relay Works", "Need a Custom Partner?" callout, and "Recent Handshakes" pulse stream.
- **Numbered Pagination:** Clean footer pagination.

### 5.2 Opportunity Card Anatomy
Each opportunity card is rendered in the pure monochrome design system:
1. **Header:** Sequential Opportunity ID (`RY-0042`), Parity score pill (`98% Parity`), and urgency badges.
2. **Company Header:** Logo / Company initials, Verified badge, Company Name (or "Anonymous Business" if `hide_company_name` is active), and Location.
3. **Content Body:** Bold Opportunity Title and 3-line truncated description.
4. **Offer / Exchange Value:** Dedicated callout highlighting what the posting company offers in exchange.
5. **Action Bar:**
   - `[ Save ]` bookmark icon button.
   - `[ Express Interest ]` or `[ View Details ]` primary action button.

### 5.3 Express Interest & Pitch Submission (Streamlined V2 Modal)
When a business expresses interest:
1. Opens the **Streamlined Single-Column Express Interest Modal**.
2. Displays baseline seeking and offering summary.
3. Allows drafting a reciprocal pitch with dynamic 500-char counter.
4. Selects interactive commercial terms (Proposed Rev Share `25%` / `27.5%` / `30%`, Commitment Period `6 Months` / `12 Months`).
5. Highlights automatic bilateral mutual NDA & blinded privacy protections.
6. On submit, calls `expressInterest`, creating an `Interest` record in `status: "pending"` and alerting the Opportunity Owner.

### 5.4 My Opportunities Dashboard (`/opportunities/my`)
- **Tabs:**
  - `Posted Opportunities`: Lists active, draft, and closed listings created by the user.
  - `Saved Opportunities`: Lists all opportunities bookmarked by the user.
- **Management Actions:**
  - `[ + Post New Opportunity ]`: Opens multi-step creation modal.
  - `[ Edit ]`: Update title, description, category, and expiration.
  - `[ Close Listing ]`: Mark as closed.
  - `[ Delete ]`: Permanently delete with confirmation dialog.
  - `[ View Inbound Pitches ]`: Direct link to `/requests/incoming` for that specific opportunity.

---

## 6. Validation Schemas (Zod)

All payloads are strictly validated client-side and server-side:

```typescript
export const createOpportunitySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(120),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  category: z.enum([
    "partnership",
    "referral",
    "distribution",
    "vendor",
    "hiring",
    "strategic_advice",
    "investment",
  ]),
  industry: z.string().min(2, "Industry is required"),
  location: z.string().optional().nullable(),
  offer_text: z.string().optional().nullable(),
  expires_at: z.string().datetime().optional().nullable(),
  hide_company_name: z.boolean().default(false),
  promotion_status: z.enum(["none", "featured", "urgent"]).default("none"),
});
```

---

## 7. Integration with the 4-Stage Exchange Workflow

Once an interest is submitted on an Opportunity, it seamlessly transitions into the core **Exchange Workflow** (`/connections/$id`):

```
Opportunity Listing (/opportunities)
        ↓
Express Interest Pitch Submitted
        ↓
Stage 1: Acknowledgment (Mutual understanding of exchange rules)
        ↓
Stage 2: Proposal Negotiation (Multi-version counter-proposals)
        ↓
Stage 3: Agreement Confirmation (Binding confirmation of commercial terms)
        ↓
Stage 4: Handshake & Reciprocal Contact Exchange (Field-by-field bilateral approval)
```

---

## 8. Security, Privacy & Access Control

1. **Unauthenticated Users:**
   - Can browse the public opportunity directory.
   - Prompted to sign in / register a business profile before expressing interest or posting.
2. **Business Approval Requirement:**
   - Only businesses with `status === "approved"` can post new opportunities or submit exchange proposals.
3. **Strict Contact Isolation:**
   - Poster's private contact email, phone, and direct links are **never** returned in the opportunity query payload. They are only resolved in Stage 4 after mutual bilateral consent.

---

## 9. Design System & Palette

| Role | Color | Hex |
|---|---|---|
| **Primary Black** | Pure / Near-Pure Black | `#000000` |
| **Dark Surface / Banner** | Charcoal | `#171F2C` |
| **White** | White | `#FFFFFF` |
| **Light Background** | Very Light Gray | `#F8FAFC` |
| **Border** | Light Gray | `#E2E8F0` |
| **Secondary Text** | Slate | `#64748B` |
| **Muted Text** | Muted Slate | `#94A3B8` |
| **Accent Orange** | Amber / Orange | `#F97316` / `#C2410C` |
| **Verified Green** | Emerald | `#059669` / `#ECFDF5` |

---

## 10. COMPREHENSIVE LIST OF STATIC FUNCTIONALITIES (MAIN BOARD & MODAL)

Below is the complete, consolidated registry of all UI components, mock feeds, benchmarks, and display-only features that are currently **static or preset** across the Opportunity Board and its Express Interest workflow:

### A. Main Opportunity Board (`/opportunities`)

1. **Top Intelligence Metric Strip (Platform Benchmarks):**
   - **Median Response Time:** Fixed benchmark display metric (`3.4h avg pitch turn`).
   - **Reciprocity Rate:** Fixed platform performance standard (`97% Bilateral`).
   - **Verified Businesses:** Member count benchmark display (`3,920 members`).
   *(Note: Active Deals count dynamically reflects verified database and seed listing volumes).*

2. **Sidebar — "How The Relay Works" Educational Card:**
   - Permanent 3-step walkthrough illustrating the core protocol (`1. Blinded Discovery`, `2. Negotiate Terms`, `3. Contact Unlock on Agreement`).

3. **Sidebar — "Need a Custom Partner?" Marketing Callout:**
   - Dark `#171F2C` promo card with static marketing copy (*"Broadcast what you need and what you offer in exchange. Your company identity remains completely confidential."*) and direct button routing to `/post`.

4. **Sidebar — "Recent Handshakes" Live Activity Pulse Stream:**
   - Simulated stream of recent B2B handshakes and stage unlocks:
     - `[RY-0012] Handshake Sealed: Payment Gateway ↔ ERP Migration Firm (4m ago · Contacts released)`
     - `[RY-0188] Pitch Accepted: Autonomous Drone Fleet ↔ Defense Contractor (21m ago · Terms harmonization)`
     - `[RY-0204] Handshake Sealed: B2B Telehealth ↔ HIPAA Cloud Provider (54m ago · Contacts released)`

5. **Listing Trust & Reliability Badges:**
   - **Parity Score Badge:** (e.g., `98% Parity`, `95% Parity`, `91% Parity`) display indicators on individual listing cards.
   - **Completed Exchanges Counter:** (e.g., `42 Exchanges Completed`, `28 Exchanges Completed`) benchmark counters on cards.

---

### B. Express Interest Modal

1. **Reciprocity Match Compatibility Badge:**
   - The `94% Match` pill with green indicator dot in the modal header is a fixed benchmark rating.

2. **Rev-Share Preset Tiers:**
   - The proposed commission selector pills (`25%`, `27.5%`, `30%`) are standardized percentage presets.

3. **Commitment Period Presets:**
   - The duration options (`6 Months`, `12 Months`) are fixed contract interval buttons.

4. **Legal / Governance Compliance Disclaimer:**
   - The footer assurance text (*"Bilateral mutual NDA automatically included. Identity remains blinded until accepted."*) is a standard protocol guarantee notice.

5. **Character Constraint:**
   - Hardcoded `500` maximum character constraint on the reciprocal pitch textarea.
