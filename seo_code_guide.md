When designing the page use the color scheme present in color_scheme.md
I need a new about page, I need a clear design for that page. The details of the page are as follows. You have free hand in deciding how the page should look like but the details I am giving you contains SEO structured keywords and content writing. Make no change in the content not even a single word or alphabet should be altered in any means (strict). Here are the details,  SEO oriented content. I saying again dont make any change in the content(tex):


Rewrite ONLY:
src/routes/about.tsx

This is a FOUNDATIONAL BRAND / ENTITY PAGE.

Do NOT treat /about as another keyword landing page.

PRIMARY PURPOSE

The About page should clearly explain:

- what The Relay is
- why it exists
- what problem it is designed to address
- how the platform approaches commercial opportunity exchange
- what The Relay does not do
- the principles behind the product

SEO should support brand/entity understanding without keyword stuffing.

SEO METADATA

Title:
About The Relay — B2B Opportunity Exchange

Meta description:
Learn what The Relay is, why it exists, and how its B2B opportunity exchange helps businesses discover commercial opportunities and partnerships.

H1:
About The Relay

IMPORTANT:
The H1 should be the actual entity/topic, not a marketing slogan.

SECTION 1 — INTRODUCTION

Eyebrow:
ABOUT THE RELAY

H1:
About The Relay

Opening copy:

Explain plainly:

The Relay is a B2B opportunity exchange designed to help businesses discover and explore commercial opportunities, referrals, and partnerships.

The underlying problem:

A business may encounter a legitimate commercial requirement that it cannot fulfil because of:
- service scope
- specialization
- geography
- capacity
- commercial model
- distribution/channel limitations

Instead of treating every such opportunity as simply lost or irrelevant, The Relay provides a structured environment for businesses to surface and explore those opportunities.

Do not claim this happens at "millions" or any other unsupported scale.

SECTION 2 — WHY THE RELAY EXISTS

H2:
Why The Relay Exists

Explain the product philosophy.

Core idea:

Businesses interact with customers and commercial opportunities every day that do not always fit their current operating model.

Traditional options include:
- declining the opportunity
- referring it to a known partner
- storing it for later
- searching for another provider manually

The Relay is designed to provide another discovery route for those situations.

Do not claim The Relay replaces all traditional referral relationships.

SECTION 3 — WHAT THE RELAY IS

H2:
What The Relay Is

Define clearly:

The Relay is:
- a B2B opportunity exchange
- a commercial opportunity discovery environment
- a place to discover potentially relevant counterpart businesses
- a structured way to surface business requirements

Use plain language.

Avoid:
"institutional-grade"
"sovereign"
"cryptographic"
"financial infrastructure"
"deal execution infrastructure"
unless actually necessary and demonstrably accurate.

SECTION 4 — WHAT THE RELAY IS NOT

H2:
What The Relay Is Not

Explicitly state that The Relay is not:

- a CRM
- a lead-selling database
- a generic social network
- an agency fulfilment provider
- a logistics provider
- a payment processor
- legal counsel
- a guarantee of partner acceptance
- a guarantee of revenue
- a guarantee of lead conversion

This section is important for clarity.

SECTION 5 — HOW THE RELAY WORKS AT A HIGH LEVEL

H2:
How The Relay Works

Give a concise overview:

1. Businesses identify commercial opportunities or requirements.
2. Opportunities can be structured and posted.
3. Other businesses can discover relevant opportunities.
4. Interested businesses can signal interest.
5. The businesses assess fit.
6. Relevant parties can continue the commercial relationship directly.

Link to:
- /8-step-journey
- /b2b-opportunity-exchange
- /how-to-exchange-business-leads

Do not reproduce the full 8-step product page.

SECTION 6 — THE PROBLEM WE ARE SOLVING

H2:
The Commercial Opportunity Problem

Explain:

There is often a difference between:
"I cannot fulfil this opportunity"

and:
"This opportunity has no value."

A legitimate opportunity may be unsuitable for one business while being relevant to another.

Use this as the conceptual foundation of the company.

Do NOT claim every rejected lead has value.

SECTION 7 — OUR CORE PRINCIPLES

H2:
Our Core Commercial Principles

Use concise principle cards:

1. Relevance Before Volume
Commercial opportunities should be useful and contextually relevant.

2. Consent and Appropriate Disclosure
Businesses should control what information they share and when identifiable information is disclosed.

3. Business Fit Matters
A potential connection should be assessed for capability, market, geography, capacity, and commercial alignment.

4. Direct Commercial Relationships
The businesses involved remain responsible for negotiating and executing their own commercial relationships.

5. No Guarantee of Outcome
Opportunity discovery does not guarantee a partner, sale, revenue, or fulfilment.

6. Practical Business Utility
The platform should help businesses solve real commercial routing and discovery problems rather than create another social feed.

SECTION 8 — WHO THE RELAY IS FOR

H2:
Who Uses The Relay?

Explain the broad categories without inventing user counts:

- B2B service businesses
- agencies
- software and technology companies
- consultants
- distributors
- channel businesses
- other organizations looking for commercial opportunities or counterparties

Do not claim:
"hundreds of companies"
"thousands of users"
"verified enterprises"
unless actual current data is available and explicitly supplied.

SECTION 9 — EXAMPLES OF THE PROBLEM

H2:
Examples of Opportunities The Relay Can Help Surface

Use clearly illustrative examples:

- Agency receives a project outside its technical specialization.
- SaaS provider needs a regional channel partner.
- Manufacturer seeks a distribution partner in a new market.
- Consultancy encounters a requirement outside its geography.
- Business has a legitimate commercial requirement that another company may be positioned to fulfil.

Label:
"Illustrative examples"

Do not create fake customer stories.

SECTION 10 — WHAT THE RELAY DOES NOT PROMISE

H2:
What The Relay Does Not Promise

Be explicit:

The Relay does not promise:
- that every opportunity will receive interest
- that an interested business will be suitable
- that a referral will close
- that an opportunity will generate revenue
- that a partner will accept a requirement
- that a project will be successfully fulfilled

This is good trust-building content and avoids marketing overclaiming.

SECTION 11 — WHERE TO LEARN MORE

H2:
Explore The Relay

Link users to:

B2B Opportunity Exchange
/b2b-opportunity-exchange

B2B Lead Exchange
/b2b-lead-exchange

B2B Partnership Network
/b2b-partnership-network

Agency Lead Exchange
/agency-lead-exchange

Distribution Partners
/distribution-partners

Channel Partnerships
/channel-partnerships

Referral Partnerships
/referral-partnerships

How The Relay Works
/8-step-journey

Trust & Safety
/trust-and-safety

FAQ
/faq

Use concise cards rather than lengthy duplicated content.

SECTION 12 — FAQ

H2:
About The Relay FAQ

At least 7 questions:

1. What is The Relay?
2. What problem does The Relay solve?
3. Who is The Relay for?
4. Is The Relay a lead marketplace?
5. Does The Relay fulfil projects for businesses?
6. Does The Relay guarantee partners, leads, or revenue?
7. How is The Relay different from a social network?
8. Where can I learn how The Relay works?

FAQ answers MUST permanently exist in the DOM.

If an accordion is used:
Do NOT use:
{isOpen && (...)}

Use CSS/display state only.

FAQPage schema may be used if appropriate and must exactly match visible content.

SECTION 13 — FINAL CTA

H2:
Explore How The Relay Works

Copy:

Learn how businesses can discover opportunities, identify potentially relevant counterparties, and explore commercial relationships through The Relay.

CTA:
Explore The 8-Step Journey

Secondary:
Explore B2B Opportunities

TECHNICAL REQUIREMENTS

Keep:
- TanStack route
- createSeoMeta
- canonical URL
- current visual system
- responsive layout

Schema:
- AboutPage if appropriate
- Organization
- WebSite relationship where appropriate
- BreadcrumbList
- FAQPage if FAQ is included

The page should strengthen entity understanding rather than target a large collection of generic keywords.

REMOVE ALL LEGACY UNSUPPORTED CLAIMS

Completely remove:

- "Millions in qualified commercial demand evaporate..."
- "institutional-grade"
- "verified B2B enterprises" when used as a broad user-count/quality claim
- "accredited peer business"
- "enforceable revenue-share"
- fixed 10–25% revenue-share claims
- "sovereign handshakes"
- cryptographic guarantees
- legal enforceability claims
- guaranteed commercial outcomes
- fabricated user/customer counts
- fabricated transaction volume

Do NOT replace them with new statistics.

IMPORTANT ENTITY/SEO RULE

Do not turn About into another ranking page for:

"b2b opportunity exchange"
"b2b lead exchange"
"b2b referral network"
etc.

Those dedicated pages already exist.

About should support the brand/entity:
The Relay

and explain:
IDENTITY → PURPOSE → PRODUCT → PRINCIPLES → SCOPE

INTERNAL LINKS

Include natural links to:

/b2b-opportunity-exchange
/b2b-lead-exchange
/b2b-partnership-network
/agency-lead-exchange
/distribution-partners
/channel-partnerships
/referral-partnerships
/8-step-journey
/trust-and-safety
/faq

FINAL QA

Before pushing:

1. H1 is "About The Relay".
2. Page clearly explains what The Relay is.
3. Page clearly explains why it exists.
4. No unsupported statistics.
5. No financial percentage claims.
6. No legal/enforceability claims.
7. No cryptographic/security guarantees.
8. FAQ answers are permanently in DOM.
9. Organization/AboutPage schema is accurate.
10. The page does not cannibalize commercial keyword landing pages.
11. The tone is factual and confident, not hype-heavy.

Push the completed file.