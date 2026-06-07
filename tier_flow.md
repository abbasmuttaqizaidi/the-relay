# The Relay — Tier & Verification Flow

This document describes the complete tier system, verification logic, and badge display rules for The Relay platform.

---

## 1. Business `status` Field (Database)

Every business in the `businesses` table has a `status` column with one of three values:

| `status` value | How it is set |
| -------------- | ------------- |
| `pending`      | **Default** — automatically assigned when a business registers via `/onboarding` |
| `approved`     | Set **manually** by an admin via the `/admin` control panel |
| `rejected`     | Set **manually** by an admin via the `/admin` control panel |

> **Important:** The `status` field is never changed automatically by any user-facing action
> (e.g. website verification). It requires an explicit admin decision.

---

## 2. Tier Label Mapping

The `status` value is mapped to a human-readable **Tier Label** in the UI.

### In `src/routes/business-profile.tsx`

```ts
const tierMap = {
  pending:  "Applied",
  approved: "Approved",
  rejected: "Basic",
};
const tierLabel = tierMap[business.status] || "Applied";
```

### In `src/components/user-avatar-dropdown.tsx` (includes legacy L1/L2/L3 mapping)

```ts
const tierMap = {
  L1: "Basic",
  L2: "Applied",
  L3: "Approved",
};
// Falls back to raw value if not found in map (e.g. "Applied", "Approved")
const tierLabel = tierMap[rawTier] || rawTier;
```

The `verificationLevel` stored in `localStorage` under key `relay.profile.v1` feeds the avatar dropdown tier display.

---

## 3. Tier Labels — What They Mean

| Tier Label   | DB `status` | Meaning |
| ------------ | ----------- | ------- |
| **Basic**    | `rejected`  | Application reviewed and not approved. Minimal trust level. |
| **Applied**  | `pending`   | Business registered and awaiting admin review. |
| **Approved** | `approved`  | Admin has manually verified and approved the business. Highest trust. |

---

## 4. Blue Badge (BadgeCheck) — Display Rules

The blue verification badge (`BadgeCheck` from Lucide, styled with `fill-[#1877f2]`) appears in two places:

### A. `/opportunities` feed — `src/routes/opportunities.tsx` (~line 750)

```tsx
{opp.trustLevel === "Approved" && (
  <TooltipSimple content="Approved with Relay">
    <BadgeCheck className="w-4 h-4 text-white fill-[#1877f2]" />
  </TooltipSimple>
)}
```

**Condition:** The opportunity's posting business must have `trustLevel === "Approved"`
(i.e. their DB `status` is `approved`).

### B. `/home` landing page — `src/routes/home.tsx` (~line 1066)

Used as a **decorative/demo element** to illustrate what verified businesses look like in the feed.
It is **not** driven by real live data.

---

## 5. Website Domain Verification — Separate from Tier

Website verification (`verifyWebsite` server function) is **completely independent** of the
`status`/tier system.

| DB Field                  | Type        | Purpose |
| ------------------------- | ----------- | ------- |
| `website_verified`        | `Boolean`   | Whether domain passed DNS + reachability + SSL checks |
| `website_verified_at`     | `DateTime?` | Timestamp of when verification succeeded |
| `website_verified_domain` | `String?`   | The resolved domain that was verified |

### What website verification does NOT do:
- Does NOT change `status` from `pending` → `approved`
- Does NOT trigger the blue badge
- Does NOT send any admin notification (currently)

### What it DOES do:
- Saves verification result permanently to the `businesses` table in DB
- Shows "Verified ✓" in the Verification Steps panel on `/business-profile`
- Acts as a trust signal for the admin when reviewing applications manually

---

## 6. Complete Approval Flow (Current)

```
User registers at /onboarding
        │
        ▼
Business created in DB
  status = "pending"
  Tier displayed = "Applied"
        │
        ▼
User optionally verifies website at /business-profile
  website_verified = true  (saved to DB)
  Status is UNCHANGED → still "pending" / "Applied"
        │
        ▼
Admin reviews at /admin control panel
        │
     ┌──┴──┐
  Approve  Reject
     │        │
     ▼        ▼
status =    status =
"approved"  "rejected"
Tier =      Tier =
"Approved"  "Basic"
Blue badge  No badge
shown in
/opportunities feed
```

---

## 7. Where Each Piece Lives in Code

| Concern | File |
| ------- | ---- |
| DB schema (`status`, `website_verified` fields) | `prisma/schema.prisma` |
| Tier label mapping (profile page) | `src/routes/business-profile.tsx` |
| Tier label mapping (avatar dropdown) | `src/components/user-avatar-dropdown.tsx` |
| Blue badge display | `src/routes/opportunities.tsx` |
| Admin approve / reject actions | `src/routes/admin.tsx` |
| Website verify server function | `src/functions/verifyWebsite.ts` |
| DB save on verify | `src/services/business.service.ts` → `markWebsiteVerified()` |

---

## 8. Potential Future Improvements

- [ ] Auto-promote to `approved` after website verification passes (removes manual admin step for basic tier)
- [ ] Send admin notification email when a new business completes website verification
- [ ] Add LinkedIn verification as a second step → auto-promote to a mid-tier
- [ ] Surface `website_verified` as a secondary green domain badge on the opportunities feed card

---

*Last updated: June 2026*
