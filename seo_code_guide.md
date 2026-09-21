When designing the page use the color scheme present in color_scheme.md



Yes. I did the audit before moving the cluster forward, and there is a **clearer architecture now**.

I checked the updated `b2b-opportunity-exchange`, `b2b-lead-exchange`, `b2b-referral-network`, plus the current `referral-partnerships` route in the repo, and I also checked the current 2026 search landscape for referral-partnership queries.

## Audit result

### 1. `/b2b-opportunity-exchange` — now a proper parent page

This page is in the right position now.

Its job is:

> **What is a B2B opportunity exchange, and what kinds of commercial opportunities can be exchanged?**

It currently covers the parent concept, use cases, workflows, audiences, and links into the specialized pages.

One issue remains:

**The page currently describes a 7-stage workflow, while the actual Relay journey is 8 stages.**

The real product flow is:

**Verify → Post → Discover → Express Interest → Acknowledge → Negotiate → Agree → Handshake**

So we should correct the opportunity page before we consider this cluster fully clean.

Everything else about its keyword boundary is good.

---

### 2. `/b2b-lead-exchange` — strong, but keep it tightly constrained

This now owns:

> **“I have a B2B lead my company can't fulfil.”**

That is the right intent.

The page should not drift into becoming:

> “How to generate more B2B leads.”

That's a different search intent and belongs elsewhere.

The important boundary is:

**Lead Exchange**  
→ existing commercial lead/opportunity

**Lead Generation**  
→ creating new demand

That distinction is already reflected in the page structure, so I would keep it.

The current FAQ answers are now present in the DOM while being visually collapsed. That's the right implementation pattern.

---

### 3. `/b2b-referral-network` — good parent for referral relationships

This page should own:

> **Finding the right businesses to refer opportunities to and building a referral network.**

This is distinct from the lead-exchange page.

Current search results support that positioning: referral-network guidance consistently centers on complementary businesses serving overlapping customers, rather than simply buying/selling lead lists. :chatgpt-content-reference{index="0"}

So the semantic chain is now:

```text
B2B Opportunity Exchange
        ↓
B2B Lead Exchange
        ↓
B2B Referral Network
```

But there is a **fourth page** waiting underneath that creates the main cannibalization risk.

---

# 4. `/referral-partnerships` is currently too close to `/b2b-referral-network`

I inspected its current implementation.

Its current title is:

> **B2B Referral Partnerships — Find Referral Partners | The Relay**

That's the problem.

**“Find referral partners” belongs much more naturally to `/b2b-referral-network`.**

And its current body overlaps heavily with that page:

- complementary businesses
- referral partners
- partner fit
- referral examples
- referral network
- referral opportunities

So if we simply optimize it for:

> B2B referral partnerships

while keeping the same structure, we'd create two pages competing for essentially the same cluster.

We should **change the role of this page rather than just rewrite the words.**

---

# The new architecture

This is the structure I'd lock in:

| URL | Owns |
|---|---|
| `/b2b-opportunity-exchange` | What is an opportunity exchange? |
| `/b2b-lead-exchange` | Exchange leads your business can't fulfil |
| `/b2b-referral-network` | Find/build a referral network |
| `/referral-partnerships` | Structure and formalize a referral partnership |
| `/how-to-find-b2b-referral-partners` | Step-by-step guide to finding partners |

That is much cleaner.

### In plain English

**Referral Network**

> “Who should I partner with?”

**Referral Partnership**

> “How should this partnership actually work?”

**How To Find Referral Partners**

> “How do I go about finding them?”

That separation is exactly what we want for SEO.

Current search results reinforce this distinction: referral-partnership resources commonly focus on formal arrangements, commission/payment terms, qualified-referral definitions, tracking, confidentiality and agreement structure. :chatgpt-content-reference{index="1"}

---

# 5. What I found wrong with the current `/referral-partnerships`

This page needs a more substantial rewrite than the previous two.

It currently contains claims such as:

> “10% on the engineering contract”

> “15% First-Year ARR”

> “Standard 10% closed value commission”

and FAQ claims around:

> “5% to 20%”

> “5% to 10% ongoing revenue share”

plus claims around:

> Master NCND  
> binding terms  
> preventing poaching

We shouldn't make those into Relay facts unless the product actually implements those exact structures.

The current web landscape does show that referral programs commonly use commission/fee arrangements and formal agreements, but the actual rates and legal terms vary substantially by business and contract. :chatgpt-content-reference{index="2"}

So instead of telling users:

> “Relay's standard is 10%”

we should explain:

> **“Referral partnerships can use flat fees, percentage-based commissions, recurring shares, reciprocal referrals or other mutually agreed structures.”**

That's accurate and much safer.

---

# 6. Keyword strategy for `/referral-partnerships`

## Primary

**B2B referral partnerships**

## Secondary

`referral partnership`  
`B2B referral partner`  
`referral partnership agreement`  
`B2B referral agreement`  
`referral commission structure`  
`referral partnership terms`  
`business referral partnership`  
`referral partner agreement`  
`B2B referral program`

## Supporting concepts

`qualified referral`  
`referral fee`  
`commission`  
`attribution`  
`referral ownership`  
`client introduction`  
`referral tracking`  
`reciprocal referrals`  
`partner terms`

### Important

I would **not** make `find referral partners` a target term here.

That's owned by:

`/b2b-referral-network`

And:

`how to find B2B referral partners`

belongs to:

`/how-to-find-b2b-referral-partners`

---

# 7. New intent for the page

The page should answer:

> **“I've found a potential referral partner. How do we structure the relationship?”**

That means the content should focus on:

### What a referral partnership is

A formal relationship where one business introduces relevant opportunities to another under agreed expectations.

### What needs to be defined

Who qualifies as a referral?

How is the introduction made?

Who owns the client relationship?

What counts as a successful conversion?

When is compensation earned?

How long does attribution last?

What happens with duplicate/existing leads?

How are disputes handled?

What information is disclosed?

### Commercial models

We can explain:

**Flat referral fee**

**Percentage commission**

**Recurring revenue share**

**Reciprocal referral**

**Co-delivery / collaboration**

without claiming that one percentage or structure is "standard."

### Relay workflow

This is where we connect it back to the product:

**Opportunity → Interest → Terms → Agreement → Consent → Introduction**

That makes the page about **partnership structure**, not partner discovery.

---

# 8. Proposed SEO package

### Title

**B2B Referral Partnerships — Structure Referral Deals | The Relay**

### Meta description

**Learn how B2B referral partnerships work, what terms to define, and how businesses can structure referral relationships around real commercial opportunities on The Relay.**

### H1

**Structure B2B Referral Partnerships Around Real Opportunities**

That gives this page a completely different job from the referral-network page.

---

# 9. Recommended content structure

I'd make the page:

### 1. Hero
What a referral partnership is and why structured terms matter.

### 2. What is a B2B referral partnership?
Clear definition.

### 3. Referral network vs referral partnership
Very important for differentiating the two Relay pages.

### 4. What should a referral partnership define?
The actual operating terms.

### 5. Common referral partnership models
Flat fee, percentage, recurring, reciprocal, collaboration.

### 6. Qualified referral: define it before you start
Very useful commercial topic.

### 7. Client ownership and introduction rules
Who owns the relationship and what happens after introduction.

### 8. Attribution and payment
When compensation is earned and how businesses can define it.

### 9. How referral partnerships can work on Relay
Map actual Relay mechanics onto the concept.

### 10. Example partnership structures
Realistic examples without invented “standard” percentages.

### 11. Common mistakes
Undefined attribution, vague qualification, unclear payment triggers, etc.

### 12. FAQ

### 13. CTA

---

# 10. The internal-link structure becomes very clean

On `/referral-partnerships`:

**Parent**

`/b2b-opportunity-exchange`

**Discovery**

`/b2b-referral-network`

**How-to**

`/how-to-find-b2b-referral-partners`

**Lead-specific**

`/b2b-lead-exchange`

**Broader partnership**

`/b2b-partnership-network`

**Workflow**

`/8-step-journey`

This creates a proper topic cluster rather than four pages fighting over “referral partners.”

---

# 11. One more technical observation

The updated Opportunity and Lead pages have moved in the right direction, and the FAQ answers are now rendered in the HTML rather than only appearing after the answer is created client-side.

The **Referral Partnerships** page has not had that cleanup yet; its current FAQ still uses conditional rendering:

```tsx
{isOpen && (
  <div>
    {faq.a}
  </div>
)}
```

So when we rewrite it, we'll fix that too.

---

# Next route

I would now move directly to:

## `/referral-partnerships`

But **not** using the old page's positioning.

We're going to make it the **“formalize the relationship”** page.

This is the prompt I'd give your agent:

```text
Rewrite /referral-partnerships.tsx as a distinct commercial-intent SEO page.

IMPORTANT:
This page must NOT compete with /b2b-referral-network.

PAGE ROLE:
- /b2b-referral-network = find/build a network of referral partners
- /referral-partnerships = structure/formalize the referral relationship itself
- /how-to-find-b2b-referral-partners = educational guide for finding partners

PRIMARY KEYWORD:
B2B referral partnerships

SECONDARY KEYWORDS:
referral partnership
B2B referral partner
referral partnership agreement
B2B referral agreement
referral commission structure
referral partnership terms
business referral partnership
referral partner agreement
B2B referral program
qualified referral
referral fee
referral tracking
reciprocal referrals

SEO TITLE:
B2B Referral Partnerships — Structure Referral Deals | The Relay

META DESCRIPTION:
Learn how B2B referral partnerships work, what terms to define, and how businesses can structure referral relationships around real commercial opportunities on The Relay.

H1:
Structure B2B Referral Partnerships Around Real Opportunities

CORE SEARCH INTENT:
The reader has found or is considering a referral partner and wants to understand how the partnership should actually be structured.

DO NOT optimize this page around:
- find referral partners
- referral network
- how to find referral partners

Those are owned by separate pages.

CONTENT SECTIONS:

1. Hero
2. What is a B2B referral partnership?
3. Referral network vs. referral partnership
4. What should a referral partnership define?
5. Common referral partnership models
6. What is a qualified referral?
7. Client ownership and introduction rules
8. Attribution and payment
9. How referral partnerships can work on The Relay
10. Example B2B referral partnership structures
11. Common mistakes when structuring referral partnerships
12. FAQ
13. Final CTA

IMPORTANT CLAIM RULES:
Remove unsupported existing claims about:
- fixed 10%/15% commissions
- "standard" commission percentages
- guaranteed revenue
- binding legal covenants
- Master NCND
- cryptographic consent
- automatic enforcement
- legal enforceability
- guaranteed protection from client poaching

Do NOT invent legal or commercial standards.

Explain that referral terms vary by business and should be agreed explicitly between the participating parties.

Useful commercial concepts to explain:
- flat referral fee
- percentage commission
- recurring revenue share
- reciprocal referrals
- co-delivery/collaboration
- qualified-referral definition
- attribution window
- duplicate/existing lead handling
- payment trigger
- client ownership
- confidentiality/information sharing

Do not state a universal or Relay-standard commission percentage.

RELAY POSITIONING:
Explain that The Relay provides a structured opportunity layer where businesses can discover potential counterparties, discuss opportunities, agree commercial terms, and proceed toward an introduction.
Do not claim that Relay itself guarantees payment, enforces legal agreements, or guarantees conversion unless the actual product implementation supports that.

INTERNAL LINKS:
- /b2b-opportunity-exchange
- /b2b-referral-network
- /how-to-find-b2b-referral-partners
- /b2b-lead-exchange
- /b2b-partnership-network
- /8-step-journey

FAQ:
Keep answers in the rendered HTML even when the accordion is visually collapsed.
Do not conditionally remove the FAQ answer from the DOM.

STRUCTURED DATA:
Keep WebPage/Breadcrumb/Organization structured data.
Do not add unsupported claims to structured data.

CANONICAL:
https://www.usetherelay.com/referral-partnerships

Keep the existing design language.

Run build/typecheck and commit/push.
```

This is the point where the architecture becomes much stronger:

**Opportunity → Lead → Referral Network → Referral Partnership → How-to**

And we haven't yet touched the broader **partnership/channel/distribution** cluster, so we're keeping the taxonomy clean before moving there.