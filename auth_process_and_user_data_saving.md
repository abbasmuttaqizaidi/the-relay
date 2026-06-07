# The Relay — Authentication Process and Database Syncing Documentation

This document explains how **Clerk Authentication** integrates with **Supabase PostgreSQL** via **Prisma ORM** when a user signs up and interacts with "The Relay" B2B platform.

---

## 🔄 1. Overview Workflow

```
[User Signs Up / Logs In] (Clerk System)
              ↓
[Auth Token Passed to Server Function] (Authorization Header)
              ↓
[Lazy-Sync User Check] (auth.server.ts)
  - Checks if clerk_user_id exists in 'users' table.
  - If NOT: Creates User row in Supabase.
              ↓
[Business Registration (Onboarding)] (createBusiness Server Function)
  - Inserts Business profile in 'businesses' table (status: 'pending').
  - Inserts Owner Membership in 'business_members' table.
```

---

## 🔑 2. Phase 1: Authentication & User Registration (Clerk)

1. **Sign Up Page**: The user visits the `/signup` route and fills in the Clerk `<SignUp />` form.
2. **Account Creation**: Clerk verifies the credentials (email verification code, Google oauth, etc.) and registers the user in **Clerk's Database** (Source of Truth).
3. **Session Generation**: Clerk issues a secure JSON Web Token (JWT) containing the unique Clerk User ID (which starts with `user_...`).
4. **Client-Side Authorization**: The frontend intercepts all subsequent database/action requests and attaches this Clerk JWT to the request headers:
   ```http
   Authorization: Bearer user_2Npx...
   ```

---

## 💾 3. Phase 2: Lazy Syncing to Supabase (`users` Table)

To optimize database operations, a user row is created in Supabase **on-demand (lazily)** when the user makes their first interaction that requires database write/reads.

Inside the server function utility ([`auth.server.ts`](file:///Users/syedabbasmuttaqizaidi/Desktop/development/bulyam-web-studio/bws-apps/the-relay/ui/src/lib/auth.server.ts#L10-L40)), `getAuthenticatedUser()` executes the following steps:

1. **Extract Identity**: Reads the request headers to extract the Clerk User ID (`user_...`).
2. **Lookup Table**: Queries the `users` table via Prisma:
   ```typescript
   const user = await prisma.user.findUnique({
     where: { clerk_user_id: clerkUserId },
   });
   ```
3. **Auto-Provisioning**: If the query returns `null` (meaning this is a newly registered Clerk user who hasn't been saved in our DB yet), Prisma automatically inserts a new row:
   - **Table**: `users`
   - **Columns Saved**:
     - `id`: Automatically generated UUID (e.g. `d3b07384-d113-4a1e-8120-22c60c23b8f1`)
     - `clerk_user_id`: The Clerk User ID string (`user_...`)
     - `created_at`: Current server timestamp (`NOW()`)
4. **Output Context**: The function returns the resolved database User object containing the internal database UUID (`id`).

---

## 🏢 4. Phase 3: Onboarding & Business Registration (`businesses` & `business_members` Tables)

Once authenticated, the user registers their business profile. This triggers the `createBusiness()` Server Function which calls [**`business.service.ts`**](file:///Users/syedabbasmuttaqizaidi/Desktop/development/bulyam-web-studio/bws-apps/the-relay/ui/src/services/business.service.ts).

Both writes are executed inside a **Prisma Database Transaction (`$transaction`)** to guarantee database integrity (atomic operation):

### Step 1: Save Business Profile

- **Table**: `businesses`
- **Columns Saved**:
  - `id`: Automatically generated UUID
  - `owner_user_id`: The user's internal database UUID (referenced from `users.id`)
  - `company_name`: Name of the company (e.g. "Acme Corp")
  - `website`: URL of the business website
  - `industry`: Select industry categorizations (SaaS, AI, etc.)
  - `description`: Details of company services
  - `linkedin_url` & `logo_url`: URLs for profile representation
  - `status`: Defaults to `'pending'` (requires admin review)

### Step 2: Establish Membership (Owner Role)

- **Table**: `business_members`
- **Columns Saved**:
  - `id`: Automatically generated UUID
  - `business_id`: References the newly created business UUID (`businesses.id`)
  - `user_id`: References the user UUID (`users.id`)
  - `role`: Hardcoded as `'owner'` (since they created the profile)

If any of the steps fail (e.g. a database validation error), the entire transaction rolls back, leaving no orphaned rows.

---

## 📊 5. Summary Table

| Operation            | Trigger Event                        | Destination Table  | Key Fields Saved                                     | Status Enforced |
| :------------------- | :----------------------------------- | :----------------- | :--------------------------------------------------- | :-------------- |
| **User Sync**        | First server function call post-auth | `users`            | `id` (UUID), `clerk_user_id`                         | Active          |
| **Profile Creation** | User submits Onboarding Form         | `businesses`       | `owner_user_id`, `company_name`, `website`, `status` | `pending`       |
| **Owner Mapping**    | Automatic during profile creation    | `business_members` | `business_id`, `user_id`, `role`                     | `owner`         |
