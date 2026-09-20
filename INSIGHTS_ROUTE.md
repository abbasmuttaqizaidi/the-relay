# Insights & Peer Intelligence Route (`/insights`)

## Overview & Architecture Specification

The Insights page is The Relay's B2B Peer Intelligence network. It follows an 8 + 4 column grid layout designed for high-density, trustworthy operator knowledge exchange with zero vendor pitches, pure white (`bg-white`) backgrounds, and crisp typographic hierarchy.

---

## 1. Layout Breakdown

### Hero Header
- **Eyebrow:** `PEER INTELLIGENCE • Verified Operator Logs`
- **Title:** `Insights & Peer Intelligence`
- **Subtitle:** `Tactical lessons and peer advice from verified B2B operators. Every perspective requires authenticated corporate attribution.`
- **Action Buttons:**
  - `Share Knowledge` (Secondary outline button — opens Knowledge article creator)
  - `+ Ask Question` (Primary black button with `hover:bg-slate-800` — opens operator question modal)

---

## 2. Controls, Tabs & Dynamic Filtering Bar

### Category Switcher Tabs (Fully Dynamic)
- **Questions Tab:** Active/Inactive state with real-time total questions count badge loaded from the database.
- **Knowledge Articles Tab:** Active/Inactive state with real-time total knowledge articles count badge loaded from the database.

### Search & Filters
- **Debounced Search Input:** Live 300ms debounced search query against questions, operational hurdles, and knowledge articles.
- **Topic Filter (11 Categories):**
  1. `All Topics` (`all`)
  2. `Partnerships & Alliances`
  3. `Sales & Pipeline`
  4. `Operations & Logistics`
  5. `Finance & Unit Economics`
  6. `Technology & Infrastructure`
  7. `Product Strategy`
  8. `Go-to-Market`
  9. `Legal & Compliance`
  10. `People & Talent`
  11. `Customer Success`
- **Sort Dropdown:**
  1. `Sort: Newest First` (`newest`)
  2. `Sort: Most Perspectives` (`perspectives`)

---

## 3. Feed Components (8-Column Main Column)

### Question Card Schema
- **Badge / Topic:** Category uppercase pill (e.g. `PARTNERSHIPS & ALLIANCES`)
- **Deal Code / Ref ID:** Dynamic `#RY-Q{id.slice(0, 4).toUpperCase()}`
- **Activity Timestamp:** Dynamic relative time (`formatTimeAgo(q.created_at)`)
- **Title:** Bold headline (`font-bold text-base md:text-lg text-slate-900`)
- **Excerpt:** Truncated preview of operator question context
- **Author Identity:**
  - Company logo with initials avatar fallback
  - Verified Business Name + Green checkmark icon
  - Location / Industry tag
- **Metrics & Engagement:**
  - Live Response Count (`q._count?.perspectives || 0`)
  - Bookmark state with localStorage persistence
- **CTA:** `View & Answer ->` button linking to `/insights/$id`

### Knowledge Article Card Schema
- **Badge:** `Case Study` badge (Orange `#C2410C` bg `#FFF7ED`) + Category pill + Read time computed dynamically from word count
- **Title:** Bold article headline
- **Summary:** Concise tactical breakdown
- **Attribution:** Verified enterprise or `#ANON` blinded enterprise avatar
- **CTA:** `Read Case Study ->`

### Dynamic Pagination Strip
- **Summary:** Dynamic `Showing X – Y of Z inquiries / articles`
- **Controls:** `Previous`, numbered page buttons, `Next`

---

## 4. Sidebar Components (4-Column Right Column)

### Card 1: How Peer Insights Work (3-Step Trust Protocol)
| Step | Title | Description |
|---|---|---|
| **1** | **Verified Operators Only** | Only authenticated business operators can post inquiries or respond with perspectives. |
| **2** | **Grounded Attribution** | Perspectives must declare operator qualification and provenance from real trials or metrics. |
| **3** | **Zero Vendor Pitching** | Self-promotion and vendor sales decks are strictly screened out by bilateral review. |

### Card 2: Trending Topics (Computed Dynamically from Active Records)
- Calculates live active count for each category from the live dataset (e.g. `X active`).
- Clicking any topic in the list immediately filters the feed and resets pagination to Page 1.

### Card 3: Reciprocal Dealflow Promo Card
- **Theme:** Dark slate card (`bg-[#171F2C]` text-white)
- **Eyebrow:** `RECIPROCAL DEALFLOW`
- **Headline:** `Need Strategic Partners?`
- **Body:** `The Relay connects vetted corporate teams through bilateral mutual unmasking on the live board.`
- **CTA:** `Go to Opportunity Board ->` (links to `/opportunities`)

---

## 5. Modal Dialogs

1. **Ask Question Dialog (`AskQuestionDialog`):**
   - Target Topic selector
   - Question Headline input
   - Context & Constraints textarea
   - Desired Perspective Type (Radio: `Same Industry & Geo` vs `Cross-Sector Relevant`)
   - Broadcast to Operators CTA
2. **Share Knowledge Dialog (`ShareInsightDialog`):**
   - Category selector
   - Title, Excerpt, Content markdown/editor
   - Tags input
   - Publishing CTA
3. **Admin Actions:**
   - Delete confirmation dialog
   - Edit dialog
4. **Share Modal:**
   - Public URL copy & social distribution