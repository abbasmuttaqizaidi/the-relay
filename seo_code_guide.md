When designing the page use the color scheme present in color_scheme.md

I checked the pushed version directly.

### Cluster 3 status

`/what-to-do-with-unqualified-leads` is now **done** and properly differentiated from the agency and monetization pages.

The latest monetization page is also structurally much better, but the remaining phrase about **“guaranteed returns” is inside a “common mistakes” warning**, so it is not actually making a guarantee. I would leave that.

However, there is now one page that clearly needs the next rewrite:

**`/how-to-exchange-business-leads`**

The current version still contains the old product-heavy claims around cryptographic handshakes, non-circumvention, fixed finder fees, “binding” commitments, and audit-log enforcement. It also has a very thin content structure compared with the other Cluster 3 pages.

This should become the **pure how-to/process page**.

### Cluster 3 architecture now

| URL | Owns |
|---|---|
| `/agency-lead-exchange` | Agency-specific commercial landing page |
| `/what-to-do-with-unqualified-leads` | What to do when a lead is unqualified |
| `/how-to-monetize-unqualified-leads` | How suitable unfulfilled leads may create commercial value |
| `/how-to-exchange-business-leads` | How the business-lead exchange process works |

So this is the final Cluster 3 rewrite.

Send the agent:

```text id="cluster3-page4"
Rewrite ONLY:
src/routes/how-to-exchange-business-leads.tsx

This is Cluster 3 — informational page #4 and the final page in this cluster.

PRIMARY SEARCH INTENT

Target:
how to exchange business leads

SECONDARY / SEMANTIC TERMS

- how to exchange business leads
- how to exchange B2B leads
- business lead exchange
- B2B lead exchange process
- lead sharing between businesses
- business referral process
- how to refer business leads
- B2B lead referral
- lead exchange workflow
- exchanging qualified business leads
- lead sharing best practices
- business lead referral agreement

CORE SEARCH PURPOSE

This page should answer:

"How does a business safely and practically exchange a genuine commercial lead with another business?"

It should be a PROCESS / HOW-TO guide.

Do NOT make this another:
- B2B lead exchange landing page
- agency lead exchange page
- lead monetization article
- unqualified lead decision guide

Those already exist.

SEO METADATA

Title:
How to Exchange Business Leads | The Relay

Meta description:
Learn how to exchange B2B leads through clear qualification, opportunity definition, counterpart evaluation, client consent, and agreed referral terms.

H1:
How to Exchange Business Leads: A Practical B2B Guide

SECTION 1 — HERO

Eyebrow:
B2B LEAD EXCHANGE GUIDE

H1:
How to Exchange Business Leads: A Practical B2B Guide

Opening:

Explain that lead exchange is not simply sending a contact to another company.

A useful B2B lead exchange requires:
- a legitimate business need
- enough context to understand the opportunity
- a suitable receiving business
- appropriate handling of client information
- clear expectations between the participating businesses
- a sensible handoff process

Emphasize:
The objective is to create a useful commercial introduction, not simply move an unwanted lead out of the pipeline.

CTA:
Explore B2B Lead Opportunities

Secondary:
Post an Opportunity

SECTION 2 — WHAT DOES IT MEAN TO EXCHANGE A BUSINESS LEAD?

H2:
What Does It Mean to Exchange a Business Lead?

Define lead exchange.

Explain the difference between:

Lead exchange:
Two businesses identify opportunities they cannot or do not want to fulfil themselves and connect them with potentially suitable counterparties.

Referral:
One business directly introduces an opportunity to a known partner.

Lead marketplace:
A system primarily focused on buying/selling access to lead information.

Do NOT describe Relay as a conventional lead-selling database.

Explain that the value of a lead exchange comes from opportunity/context + business fit, not merely contact information.

SECTION 3 — BEFORE YOU EXCHANGE A LEAD

H2:
Before You Exchange a Business Lead

Create a checklist:

1. Confirm the opportunity is genuine.
2. Understand the business requirement.
3. Determine why your company is not fulfilling it.
4. Decide whether another provider could plausibly fit.
5. Check whether referral is appropriate.
6. Identify what information is actually necessary to share.
7. Consider whether client consent is required before identifying information is disclosed.

Important:
Do not provide legal advice.
Do not claim a particular legal consent rule universally applies.

SECTION 4 — STEP-BY-STEP PROCESS

H2:
How to Exchange Business Leads Step by Step

Use 7–8 clear steps.

01 — Qualify the opportunity

Confirm that the enquiry represents a real business need and is sufficiently understood.

02 — Identify the reason for handoff

Examples:
- service mismatch
- specialization gap
- geographic limitation
- capacity constraint
- commercial model mismatch

03 — Prepare an opportunity summary

Describe:
- type of business
- broad requirement
- expected scope
- relevant technology/service
- geography
- timeline
- other non-sensitive context

Do not encourage unnecessary personal/contact information.

04 — Identify potential counterparties

Evaluate businesses based on:
- relevant capabilities
- industry experience
- geography
- capacity
- commercial fit

Do not claim Relay "guarantees" counterpart quality.

05 — Signal or communicate interest

Describe how both businesses can establish that there is enough mutual interest to continue.

06 — Agree the referral structure

Where relevant, discuss:
- referral arrangement
- attribution
- payment terms
- client ownership expectations
- introduction process

Do NOT provide arbitrary commission percentages.

07 — Handle client consent and disclosure appropriately

Explain that identifying client information should not be disclosed unnecessarily.
Where client permission is needed, obtain it before making an identifiable introduction.

08 — Make the introduction

Once both sides are comfortable proceeding, introduce the relevant parties and let them handle the client relationship and commercial execution.

SECTION 5 — WHAT INFORMATION SHOULD BE SHARED?

H2:
What Information Should You Share in a Business Lead Exchange?

Create a practical "share initially" vs "share later" structure.

Initial opportunity information may include:
- industry
- company type
- problem/requirement
- broad scope
- geography
- estimated timeline
- technology/service requirement

Avoid sharing initially:
- unnecessary personal contact information
- private internal notes
- confidential commercial documents
- sensitive customer details

Explain:
The principle is minimum necessary information until there is a legitimate reason for more disclosure.

Do not make legal/privacy claims you cannot substantiate.

SECTION 6 — HOW TO CHOOSE THE RECEIVING BUSINESS

H2:
How to Evaluate a Business Before Referring a Lead

Criteria:
- service capability
- relevant specialization
- geographic coverage
- delivery capacity
- experience with similar requirements
- communication quality
- willingness to accept the opportunity
- commercial alignment

Explain:
A referral should be based on plausible fit, not simply on finding someone willing to receive the lead.

SECTION 7 — WHAT SHOULD THE TWO BUSINESSES AGREE?

H2:
What Should Businesses Agree Before Exchanging a Lead?

Possible subjects:

- what counts as the referred opportunity
- who makes the introduction
- how attribution is handled
- whether a referral fee exists
- when payment would occur
- how long attribution remains relevant
- who communicates with the client
- what happens if the project changes
- what information may be shared

Important:
These are commercial topics to discuss and document between businesses.

Do NOT claim The Relay automatically creates legally enforceable agreements.
Do NOT mention NCND.
Do NOT mention cryptographic enforcement.
Do NOT mention immutable/audit-log enforcement unless actually implemented and documented.

SECTION 8 — COMMON LEAD EXCHANGE MISTAKES

H2:
Common Mistakes When Exchanging Business Leads

Cover:

1. Sending leads without understanding the requirement.
2. Referring a lead to a poor-fit provider.
3. Sharing too much information too early.
4. Failing to clarify who owns the client relationship.
5. Assuming another business has capacity.
6. Failing to discuss referral economics where relevant.
7. Treating the lead as a commodity rather than a real business opportunity.
8. Focusing on commission before client experience.
9. Referring a lead that is actually spam or fundamentally poor-fit.

SECTION 9 — REFERRAL VS EXCHANGE

H2:
Business Lead Referral vs Lead Exchange

Explain clearly:

Referral:
You already know exactly who should receive the opportunity.

Lead exchange:
You are looking to discover another business that may be suitable.

This distinction should link to:
- /b2b-referral-network
- /agency-lead-exchange
- /b2b-lead-exchange

SECTION 10 — WHERE THE RELAY FITS

H2:
Where The Relay Fits in the Lead Exchange Process

Describe Relay as:

- opportunity discovery
- structured opportunity presentation
- potential counterpart discovery
- interest signalling
- commercial relationship discovery

Process:

1. A business posts an opportunity.
2. Other businesses discover it.
3. Interested businesses review the requirement.
4. The businesses evaluate fit.
5. They decide whether to continue.
6. They manage any client introduction and commercial arrangement directly.

Explicit limitations:

The Relay does not guarantee:
- a receiving business
- a successful introduction
- a closed deal
- a referral fee
- a payout
- client conversion
- successful project fulfilment

The Relay does not replace:
- internal sales qualification
- CRM
- client consent
- legal review
- commercial negotiation

Internal links:
- /b2b-lead-exchange
- /agency-lead-exchange
- /what-to-do-with-unqualified-leads
- /how-to-monetize-unqualified-leads
- /b2b-opportunity-exchange
- /trust-and-safety
- /8-step-journey

SECTION 11 — ILLUSTRATIVE EXAMPLES

H2:
Illustrative Business Lead Exchange Examples

Use 5 hypothetical scenarios.

Example 1:
A web agency receives a mobile application requirement outside its technical specialization.
→ It identifies a specialist agency.

Example 2:
A consultancy receives a project in a geography it does not serve.
→ It explores a regional provider.

Example 3:
A software company receives a legitimate implementation requirement outside its service offering.
→ It identifies an implementation specialist.

Example 4:
A services firm has a valid opportunity but no immediate capacity.
→ It considers whether a suitable partner can fulfil it.

Example 5:
A company receives a spam enquiry.
→ It should not be exchanged.

Clearly label:
"Íllustrative examples"

No fake companies.
No fake case studies.
No exact revenue.
No commission percentages.

SECTION 12 — A SIMPLE LEAD EXCHANGE CHECKLIST

H2:
B2B Lead Exchange Checklist

Create a concise checklist:

□ Is the opportunity genuine?
□ Is the need sufficiently understood?
□ Why can't we fulfil it?
□ Who could realistically serve it?
□ What information is necessary to share?
□ Is client disclosure appropriate?
□ Have commercial expectations been discussed?
□ Is the receiving business actually interested?
□ Is the introduction beneficial to the client?

This gives the page a highly useful practical element.

SECTION 13 — FAQ

H2:
How to Exchange Business Leads FAQ

At least 9 questions:

1. What is a business lead exchange?
2. What is the difference between a lead referral and a lead exchange?
3. What information should I include when exchanging a lead?
4. Should I share the client's contact information immediately?
5. How do I choose a business to receive a lead?
6. Should businesses agree on referral terms before an introduction?
7. Can companies exchange leads without paying a referral fee?
8. What kinds of leads should not be exchanged?
9. Does The Relay guarantee that another company will accept a lead?
10. Does The Relay handle the client relationship?

FAQ answers MUST remain permanently in the DOM.

Do NOT use:
{isOpen && (...)}

Use CSS/display state only.

If FAQPage JSON-LD is used, ensure the schema matches the visible FAQ exactly.

SECTION 14 — FINAL CTA

H2:
Ready to Exchange a Business Opportunity?

Copy:
A useful lead exchange starts with a genuine opportunity, a clear requirement, and a business that is a plausible fit.

The Relay provides a structured environment for discovering and exploring those commercial connections.

CTA:
Explore B2B Lead Opportunities

Secondary:
Post a Business Opportunity

TECHNICAL REQUIREMENTS

Keep:
- TanStack route
- createSeoMeta
- canonical URL
- current design system
- responsive implementation
- structured data where appropriate

Use:
WebPage
BreadcrumbList
FAQPage where appropriate

REMOVE ALL LEGACY UNSUPPORTED CLAIMS

Completely remove:
- cryptographic handshake
- cryptographically logged handshake
- Master NCND
- non-circumvention safeguards as a guaranteed platform feature
- 10%–20% finder fees
- fixed referral percentages
- binding commercial commitments
- audit-log enforcement claims
- double-blind vetting unless this is actually implemented
- guaranteed partner quality
- guaranteed lead acceptance
- guaranteed commission
- guaranteed revenue
- guaranteed conversion

Do not invent statistics.

CANNIBALIZATION RULE

This page owns:
"How do I exchange business leads?"

It must NOT own:

/b2b-lead-exchange
= core B2B lead exchange category/product page

/agency-lead-exchange
= agency-specific application

/what-to-do-with-unqualified-leads
= what to do with an unqualified lead

/how-to-monetize-unqualified-leads
= how commercial value may be created from suitable unqualified opportunities

Keep the article procedural and educational.

FINAL QA

Before pushing:

1. Primary keyword is in title.
2. Primary keyword appears naturally in H1 and introduction.
3. Content is genuinely step-by-step.
4. No fixed commission percentages.
5. No unsupported legal/security claims.
6. No fake case studies/statistics.
7. FAQ answers are permanently in DOM.
8. Internal links to relevant Cluster 3 pages exist.
9. The Relay is presented as a discovery/exchange layer.
10. The page remains useful even without mentioning The Relay.

Push the completed file.
```

Once this is pushed, **Cluster 3 will be complete**. Then we can move to the next SEO cluster rather than endlessly polishing the same group.