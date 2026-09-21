When designing the page use the color scheme present in color_scheme.md

Checked the latest push. **`/agency-lead-exchange` is now finished.** The final version has the right agency-specific intent, crawlable FAQ, internal links, and no unsupported NCND/percentage/cryptographic claims.

Now we move to **Cluster 3 — Page 2: `/what-to-do-with-unqualified-leads`**.

I also checked current search results for this query. The dominant informational intent is not “monetize every bad lead”; it is to **determine why a lead is unqualified, distinguish poor fit from temporary lack of readiness, and then decide whether to disqualify, nurture, recycle, or otherwise route it**. :chatgpt-content-reference{index="0"}

That gives us a very important SEO distinction:

**`/what-to-do-with-unqualified-leads` = decision/process guide**  
**`/how-to-monetize-unqualified-leads` = monetization guide**  
**`/agency-lead-exchange` = agency commercial landing page**

Send this to the agent:

```text id="cluster3-page2"
Rewrite ONLY:
src/routes/what-to-do-with-unqualified-leads.tsx

This is Cluster 3, informational page #2.

PRIMARY SEARCH INTENT

Target:
what to do with unqualified leads

SECONDARY / SEMANTIC TERMS

- what to do with unqualified leads
- what to do with unqualified B2B leads
- how to handle unqualified leads
- unqualified lead management
- unqualified B2B leads
- lead qualification
- lead disqualification
- lead nurturing
- lead recycling
- out-of-scope leads
- leads your business cannot fulfil
- what to do with leads you cannot serve

Do NOT keyword stuff.

CORE PURPOSE OF THIS PAGE

This page must answer the practical question:

"What should a business do when a lead does not qualify for its current sales or delivery process?"

The answer should NOT be:
"Send every unqualified lead to The Relay."

Instead, teach the reader to first determine WHY the lead is unqualified.

The page should distinguish between:

1. Poor fit
2. Not ready yet
3. Missing information
4. Outside current service capability
5. Outside geography
6. Capacity constraint
7. Commercial mismatch
8. No genuine buying intent

This distinction is central to the page.

SEO METADATA

Title:
What To Do With Unqualified B2B Leads | The Relay

Meta description:
Learn what to do with unqualified B2B leads, including when to disqualify, nurture, recycle, refer, or exchange opportunities your business cannot fulfil.

H1:
What Should You Do With an Unqualified B2B Lead?

Do NOT use a salesy H1.

SECTION 1 — HERO

Eyebrow:
B2B LEAD QUALIFICATION & ROUTING

H1:
What Should You Do With an Unqualified B2B Lead?

Opening copy:

Explain that "unqualified" is not a single category.

A lead may be:
- a poor fit for the business,
- too early,
- missing important information,
- outside the company's service scope,
- outside geographic coverage,
- beyond available delivery capacity,
- or simply not showing enough buying intent.

The correct next action depends on the reason.

Important:
Do not say that an unqualified lead is automatically worthless.
Do not say that every unqualified lead can become qualified.
Do not promise conversion.

SECTION 2 — FIRST QUESTION: WHY IS THE LEAD UNQUALIFIED?

H2:
Why Is the Lead Unqualified?

This should be the main conceptual section.

Explain:

"Unqualified" should be treated as a disposition, not an explanation.

Create a clear framework:

A. Fit problem
The company, requirement, industry, geography, or use case does not match what you serve.

Typical action:
Disqualify or route elsewhere.

B. Readiness problem
The business could be a good fit, but timing, budget, internal priorities, or project readiness is not there yet.

Typical action:
Nurture or recycle.

C. Information problem
There is not enough information to determine whether the opportunity fits.

Typical action:
Ask follow-up questions.

D. Capability problem
The need is legitimate but outside your current technical/service capability.

Typical action:
Consider a specialist referral or opportunity exchange where appropriate.

E. Capacity problem
The business can fulfil the work but cannot take it on at the required time.

Typical action:
Consider a referral, later follow-up, or another delivery partner.

F. Commercial problem
The project does not fit the company's pricing, engagement model, minimum project size, or other commercial parameters.

Typical action:
Disqualify, renegotiate, or route to another provider if appropriate.

SECTION 3 — DECISION FRAMEWORK

H2:
What Should You Do With an Unqualified Lead?

Create a practical decision tree or 5-step framework:

01 — Confirm the qualification failure
Identify the actual reason rather than using "unqualified" as a catch-all.

02 — Decide whether the problem is permanent or temporary
Poor fit may remain poor fit.
Timing or missing information can change.

03 — Choose the appropriate disposition
Possible outcomes:
- disqualify
- nurture
- recycle
- request more information
- refer
- exchange

04 — Protect the prospect relationship
Do not send the lead somewhere else simply to move it off your pipeline.
The referral should make sense for the prospect.

05 — Record why the decision was made
The reason should be clear enough that another team member understands the disposition later.

Do not invent CRM features or specific software workflows.

SECTION 4 — UNQUALIFIED DOES NOT ALWAYS MEAN BAD

H2:
Unqualified Does Not Always Mean a Bad Lead

This section is critical.

Explain:

A lead can be:
"good company + genuine need + wrong timing"

versus:
"wrong company + wrong use case + no realistic fit"

These two situations need different treatment.

Introduce the concept:

Fit failure vs readiness failure.

This is useful because current B2B search content also emphasizes separating permanent fit failures from temporary readiness failures. :chatgpt-content-reference{index="1"}

Do not copy external wording.

SECTION 5 — WHEN TO DISQUALIFY

H2:
When Should You Disqualify a Lead?

Explain examples such as:

- clearly outside ICP
- incompatible service requirement
- unsupported geography
- unrealistic requirements
- no legitimate business need
- clear lack of authority or buying intent
- commercial model fundamentally incompatible

Be careful with budget:
A lack of current budget can sometimes be a timing issue, not necessarily permanent disqualification.

Explain that businesses should define their own qualification criteria.

SECTION 6 — WHEN TO NURTURE OR RECYCLE

H2:
When Should You Nurture or Recycle a Lead?

Cover situations such as:

- project timing is later
- budget cycle has not opened
- implementation is postponed
- prospect needs education
- business fits but the requirement is not active
- decision process is incomplete

Make it clear:
Nurturing is appropriate when there is a plausible future fit.

Do not use unsupported percentage claims about nurture performance.

SECTION 7 — WHEN TO REFER OR EXCHANGE

H2:
When Should You Refer or Exchange an Unqualified Lead?

This is where The Relay enters naturally.

Explain:

A referral or opportunity exchange can make sense when the lead is not a fit for YOUR business but may still represent a legitimate business requirement.

Examples:
- wrong technical specialization
- wrong geography
- insufficient delivery capacity
- project outside normal service scope
- specialist service your company does not provide

But emphasize:

A lead should not be referred merely because it is difficult.
The opportunity should be sufficiently understood and there should be a plausible fit with the receiving business.

Also explain the distinction:

Referral:
You already know a suitable counterpart and intentionally introduce the opportunity.

Opportunity exchange:
You need to discover a potentially suitable business for the opportunity.

This should internally link to:
- /agency-lead-exchange
- /b2b-lead-exchange
- /how-to-exchange-business-leads

SECTION 8 — WHAT NOT TO DO

H2:
What Not to Do With Unqualified Leads

Cover:

1. Do not treat every unqualified lead as permanently dead.
2. Do not keep genuinely poor-fit leads in active sales pipelines indefinitely.
3. Do not send every rejected lead to another company without checking fit.
4. Do not disclose unnecessary client information when exploring a referral.
5. Do not describe a lead as qualified simply because another provider might accept it.
6. Do not use "unqualified" as a substitute for documenting the actual reason.

This gives the page useful practical depth rather than becoming an advertisement.

SECTION 9 — PRACTICAL DISPOSITION MATRIX

H2:
Unqualified Lead Disposition Matrix

Create a clean table/card structure:

Situation | Appropriate next step

Poor ICP fit | Disqualify
Wrong geography | Disqualify or refer
Wrong service capability | Refer/exchange
Temporary capacity shortage | Refer, recycle, or revisit
Wrong timing | Nurture/recycle
Missing information | Follow up
Commercial mismatch | Disqualify or renegotiate
Unclear buying intent | Qualify further or nurture
Legitimate opportunity but outside scope | Consider referral/exchange

Be careful:
These are practical examples, not universal rules.

Use wording like "may be appropriate."

SECTION 10 — HOW THE RELAY FITS

H2:
Where The Relay Fits When You Cannot Fulfil a Lead

Position The Relay as one possible path, not the answer to every unqualified lead.

Explain:

The Relay can be relevant when:
- the underlying opportunity appears legitimate,
- the current business cannot fulfil it,
- another business may have a better capability fit,
- the opportunity can be described without unnecessary confidential information,
- and the relevant parties are comfortable progressing the opportunity.

The Relay provides opportunity discovery and structured counterpart discovery.

The Relay does NOT:
- determine whether every lead is qualified,
- guarantee that an opportunity will be accepted,
- guarantee a referral fee,
- guarantee a sale,
- fulfil the project,
- replace CRM or sales qualification,
- replace the businesses' own client consent and commercial decisions.

Internal links:
- /agency-lead-exchange
- /b2b-lead-exchange
- /how-to-monetize-unqualified-leads
- /how-to-exchange-business-leads
- /b2b-opportunity-exchange
- /8-step-journey

SECTION 11 — ILLUSTRATIVE EXAMPLES

H2:
Examples of What to Do With Unqualified Leads

Use 5 hypothetical examples:

Example 1:
A software company receives a lead from an industry it does not support.
→ Disqualify or refer depending on fit.

Example 2:
A consulting firm receives a genuine enterprise requirement but lacks delivery capacity this quarter.
→ Consider referral, exchange, or later follow-up.

Example 3:
A prospect fits the ICP but the project is delayed until next quarter.
→ Nurture/recycle.

Example 4:
An enquiry lacks enough detail to understand whether the company can help.
→ Ask clarifying questions.

Example 5:
An agency receives a legitimate project outside its technical specialization.
→ Consider a specialist referral or opportunity exchange.

Label them:
"Illustrative example"

Do NOT fabricate customer stories.
Do NOT use fake company names.
Do NOT use exact revenue figures.
Do NOT use percentage claims.

SECTION 12 — FAQ

H2:
Unqualified B2B Lead FAQ

At least 8 questions:

1. What is an unqualified B2B lead?
2. Does unqualified mean the lead is bad?
3. What should you do with an unqualified lead?
4. Should unqualified leads be deleted?
5. When should you nurture an unqualified lead?
6. When should you refer an unqualified lead?
7. What is the difference between an unqualified lead and an out-of-scope lead?
8. Can you exchange a lead that your business cannot fulfil?
9. How should businesses protect client information when referring an opportunity?

FAQ answers MUST ALWAYS be present in the DOM.

Use visual accordion behavior with CSS/display state only.

Do NOT render answers conditionally with:
{isOpen && ...}

If FAQPage JSON-LD exists, keep it aligned exactly with the visible FAQ content.

SECTION 13 — FINAL CTA

H2:
Have a Lead Your Business Cannot Fulfil?

Copy:

Some leads should be disqualified. Some should be nurtured. Others may represent legitimate opportunities that simply fall outside your current capabilities.

For those situations, The Relay provides a structured way to explore potential business-to-business opportunities.

CTA:
Explore B2B Lead Opportunities

Secondary:
Learn How to Exchange Business Leads

TECHNICAL REQUIREMENTS

Keep:
- current TanStack route
- createSeoMeta
- canonical path
- current visual design system
- responsive layout
- structured data pattern

Use:
WebPage
BreadcrumbList
FAQPage where appropriate

IMPORTANT CLAIM RULES

Remove all current claims involving:
- Master NCND
- guaranteed confidentiality
- guaranteed revenue
- fixed referral percentages
- guaranteed monetization
- guaranteed conversion
- guaranteed client protection
- legally enforceable Relay agreements
- cryptographic handshakes
- guaranteed quality standards

Do not invent statistics.

Do not claim:
"X% of leads..."
unless a reliable source is explicitly cited and the statistic is genuinely necessary.

FINAL CANNIBALIZATION CHECK

This page owns:
"what should I do with an unqualified lead?"

It must NOT become primarily:
- an agency lead exchange landing page
- a monetization guide
- a generic how-to-exchange-leads guide

Keep these distinctions:

/agency-lead-exchange
= agencies exchanging out-of-scope opportunities

/what-to-do-with-unqualified-leads
= decision framework for handling unqualified leads

/how-to-monetize-unqualified-leads
= how commercial value may be created from suitable unfulfilled opportunities

/how-to-exchange-business-leads
= mechanics/process of exchanging business leads

Push the completed file.
```

The key change here is conceptual: **we don't want “unqualified = monetize.”** We want **“unqualified = diagnose the reason → choose the appropriate disposition → referral/exchange is one possible outcome.”** That matches the actual informational intent much better. :chatgpt-content-reference{index="2"}