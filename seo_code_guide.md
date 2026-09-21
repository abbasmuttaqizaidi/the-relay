When designing the page use the color scheme present in color_scheme.md

I checked the pushed `/how-to-find-distribution-partners` directly in the repo.

### Cluster 4, Page 1: approved

It now has the correct **“how do I find/evaluate distributors?”** intent and is clearly separated from `/distribution-partners`.

One important issue remains elsewhere before we proceed: the next page, **`/how-to-find-b2b-referral-partners`**, still contains several legacy claims that we should remove rather than carry forward:

- “Most B2B organizations” should have a 3–7 partner optimum
- “high-performing” partner claims
- 24–48 hour response expectations presented as a standard
- “pre-vetted” ecosystem-directory language
- “zero deal flow” claims about large brands
- conversion-rate / win-rate framing
- “verified client references”
- some terminology that makes the page sound like a performance guarantee rather than a sourcing guide

The underlying structure is actually good. Current 2026 referral-partner guidance also emphasizes **starting with complementary businesses serving the same customer, defining an ideal partner profile, researching candidates, validating fit, and then building the relationship**. :chatgpt-content-reference{index="0"}

So we should **polish/rewrite the existing referral-partner guide**, not redesign its architecture.

### Next step: `/how-to-find-b2b-referral-partners`

Send this to the agent:

```text id="cluster4-referral-guide"
Rewrite ONLY:
src/routes/how-to-find-b2b-referral-partners.tsx

This is Cluster 4 — Partner Discovery Guides, page #2.

IMPORTANT:
Preserve the existing overall page structure and visual design where practical.
This is a content/SEO quality rewrite, not a visual redesign.

PRIMARY SEARCH INTENT

Target:
how to find B2B referral partners

SECONDARY / SEMANTIC TERMS

- how to find B2B referral partners
- how to find referral partners
- B2B referral partners
- referral partner network
- find referral partners
- B2B partner discovery
- referral partner sourcing
- referral partner outreach
- referral partnership
- complementary business partners
- referral partner evaluation

SEO METADATA

Title:
How to Find B2B Referral Partners | The Relay

Meta description:
Learn how to find B2B referral partners by defining the right partner profile, sourcing candidates, evaluating fit, and building a practical referral relationship.

H1:
How to Find B2B Referral Partners

CORE POSITIONING

This is a practical partner-discovery guide.

It should answer:

"How does a business identify, evaluate, approach, and start working with the right referral partners?"

The fundamental model:

Your ideal referral partner often:
- serves a similar customer
- offers a complementary product or service
- does not directly compete with you
- encounters customer needs adjacent to yours
- has a reason to make relevant introductions
- is capable of delivering a good customer experience

Do not imply that every complementary company will become a referral partner.

SECTION 1 — START WITH THE CUSTOMER

H2:
Start With the Customer, Not the Partner List

Explain that partner discovery should start with the customer journey.

Ask:
- Who does the customer speak to before us?
- Who do they need after us?
- Which services are adjacent to ours?
- Which businesses already work with our target customer?
- Where do customer needs overlap without direct competition?

Give one or two illustrative examples.

Example:
A B2B software implementation company may identify cybersecurity consultants, cloud consultants, or ERP specialists as adjacent businesses depending on its customer journey.

Do not claim any category is universally ideal.

SECTION 2 — DEFINE THE IDEAL REFERRAL PARTNER

H2:
Define Your Ideal Referral Partner Profile

Create a framework around:

- customer overlap
- service complementarity
- industry expertise
- geography
- company size
- target buyer
- delivery quality
- capacity
- willingness to collaborate
- commercial compatibility

Explain that a partner profile makes research more focused.

Do not use a numerical "ideal score."

SECTION 3 — WHERE TO FIND THEM

H2:
Where to Find B2B Referral Partners

Cover practical sourcing channels:

1. Existing client relationships
2. Suppliers and vendors
3. Professional networks
4. LinkedIn
5. Industry associations
6. Trade groups and events
7. Technology/ecosystem directories
8. Search engines and niche directories
9. Partner communities
10. Structured opportunity/discovery platforms

Explain the trade-off between:
- warm existing relationships
- researched cold candidates
- structured discovery platforms

Do not claim one channel is universally best.

Current 2026 referral-partner guidance commonly emphasizes complementary businesses, customer overlap, systematic candidate research, and relationship development. :chatgpt-content-reference{index="1"}

SECTION 4 — RESEARCH THE CANDIDATE

H2:
How to Research a Potential Referral Partner

Look for evidence such as:

- services offered
- target industries
- target customers
- geographic coverage
- existing partnerships
- ecosystem participation
- case studies/work examples
- customer reviews where relevant
- leadership/contact information
- signs that they actually collaborate with outside businesses

Important:
Research evidence is not proof that a company will refer business.

Do NOT say directories are "pre-vetted" unless the specific directory's verification process is actually known.

Do not claim reviews are definitive evidence of quality.

SECTION 5 — CHECK FOR REFERRAL SIGNALS

H2:
What Signals Suggest a Business Could Be a Good Referral Partner?

Useful signals:

- complementary offering
- shared customer base
- visible partner ecosystem
- existing strategic partnerships
- content discussing adjacent services
- repeat exposure to the same customer problems
- clear reason for both businesses to collaborate

Avoid:
"signals that predict referrals."

We are identifying plausible fit, not predicting outcomes.

SECTION 6 — QUALIFY THE PARTNER

H2:
How to Evaluate a Referral Partner

Use a practical evaluation framework:

1. Customer overlap
2. Service complementarity
3. Reputation and delivery quality
4. Relevant experience
5. Geographic fit
6. Capacity
7. Communication
8. Commercial alignment

For each, provide:
- the question to ask
- why it matters
- what evidence might help

Do not turn this into a ranking or scorecard with arbitrary numbers.

SECTION 7 — CHECK FOR COMPETITION

H2:
How to Identify Referral vs Competitor Relationships

Explain that not all overlap means direct competition.

Check:
- core services
- target buyer
- customer segment
- geographic market
- adjacent services
- potential scope conflicts

A company can be partially overlapping and still have a useful complementary relationship.

Do not claim large companies or small firms are inherently better partners.

SECTION 8 — DECIDE WHETHER THE RELATIONSHIP CAN BE RECIPROCAL

H2:
Can the Referral Relationship Be Reciprocal?

Explain two models:

One-way:
A partner primarily refers opportunities to you.

Reciprocal:
Both businesses can identify relevant opportunities for one another.

Explain that reciprocity is useful only when customer journeys naturally overlap.

Do not imply every partnership should produce equal volumes of referrals.

SECTION 9 — HOW TO APPROACH A REFERRAL PARTNER

H2:
How to Approach a Potential Referral Partner

Give an actual practical process:

1. Research the business.
2. Identify the shared customer problem.
3. Explain why the relationship makes sense.
4. Offer a concrete referral scenario.
5. Suggest a short exploratory conversation.
6. Avoid asking for client leads immediately.
7. Give the relationship a chance to develop.

Include a short example outreach structure, but do not write spammy mass-outreach copy.

Example:

"Hi [Name], we work with [customer type] on [specific problem]. I noticed your team helps those same businesses with [adjacent need]. There may be situations where our clients need each other's services. Would you be open to a short conversation about whether a referral relationship makes sense?"

SECTION 10 — DEFINE THE FIRST REFERRAL

H2:
Define What a Referral Means Before Sending One

Explain that businesses may want to clarify:

- what qualifies as a referral
- how introductions happen
- who communicates with the client
- attribution
- whether compensation exists
- payment timing if compensation exists
- what happens with duplicate leads
- customer ownership expectations

Do not prescribe commission percentages.

Do not claim these terms are automatically enforced by Relay.

Do not use NCND or cryptographic/legal-enforcement language.

SECTION 11 — START SMALL

H2:
Start With a Small Referral Pilot

The existing page contains "3 to 5" and "2 to 4" partner recommendations. Remove arbitrary numeric prescriptions.

Instead say:

"Start with a small number of highly relevant businesses."

Explain:
- test one or a few real introductions
- observe communication
- gather feedback
- assess customer fit
- improve the process
- expand only when the relationship is working

Do not claim a pilot guarantees better results.

SECTION 12 — TRACK THE RELATIONSHIP

H2:
Track Referral Activity and Relationship Health

Useful metrics:

- referrals sent
- referrals received
- accepted introductions
- response time
- qualified opportunities
- closed opportunities
- commercial value generated
- qualitative partner/client feedback

Important:
Do not present "win rate" or conversion rate as evidence that a partner will perform in the future.

Avoid arbitrary benchmarks.

"Response SLA" should be replaced with:
"response time" or "agreed response expectations."

SECTION 13 — COMMON MISTAKES

H2:
Common Mistakes When Finding Referral Partners

Cover:

1. Choosing businesses simply because they are well known.
2. Ignoring customer overlap.
3. Treating every complementary business as a potential partner.
4. Asking for referrals before establishing value.
5. Ignoring competitive overlap.
6. Failing to define what a referral actually means.
7. Sharing too much client information too early.
8. Never following up after an introduction.
9. Expecting equal referral volume from both sides.

Remove absolute statements such as:
- "giant enterprise brands result in zero deal flow"
- "high-performing networks are..."
- "the best partners always..."

Use evidence-based, conditional language.

SECTION 14 — WHERE THE RELAY FITS

H2:
Where The Relay Fits in Referral Partner Discovery

Explain:

Businesses can traditionally find referral partners through:
- existing relationships
- associations
- professional networks
- directories
- LinkedIn
- direct outreach
- events

The Relay provides another discovery route:
businesses can discover structured commercial opportunities and potentially identify businesses with complementary capabilities.

The Relay does NOT:
- guarantee a referral partner
- guarantee referrals
- guarantee lead volume
- guarantee revenue
- guarantee partner quality
- guarantee conversion

Position Relay as a discovery layer, not a referral-performance guarantee.

Internal links:
- /b2b-referral-network
- /referral-partnerships
- /b2b-partnership-network
- /b2b-opportunity-exchange
- /agency-lead-exchange
- /8-step-journey

SECTION 15 — ILLUSTRATIVE EXAMPLES

H2:
Illustrative B2B Referral Partner Examples

Use 5 hypothetical examples:

1. Web development company + branding studio
2. ERP consultancy + cybersecurity specialist
3. SaaS implementation firm + managed IT provider
4. B2B marketing agency + specialist video/creative agency
5. Compliance consultancy + technology implementation firm

For each:
- shared customer
- complementary need
- why the relationship could make sense

Clearly label:
"Illustrative example"

Do not fabricate results or revenue.

SECTION 16 — REFERRAL PARTNER CHECKLIST

H2:
B2B Referral Partner Checklist

Create:

□ Shared target customer
□ Complementary offering
□ Clear reason to collaborate
□ Relevant expertise
□ No unacceptable conflict
□ Geographic fit
□ Capacity considered
□ Communication expectations discussed
□ Referral definition understood
□ Commercial terms discussed where relevant
□ Client information handled appropriately

SECTION 17 — FAQ

H2:
Referral Partner Sourcing FAQ

At least 9 questions:

1. How do I find B2B referral partners?
2. What makes a good referral partner?
3. Where can I find referral partners?
4. Should a referral partner serve the same customers as me?
5. Should referral partners be non-competing?
6. How do I approach a potential referral partner?
7. Should referral partnerships involve commissions?
8. How many referral partners should a business have?
9. How should referral relationships be tracked?
10. Can The Relay help businesses discover referral partners?

FAQ answers MUST ALWAYS exist in the DOM.

Do NOT use:
{isOpen && (...)}

Use CSS/display state only.

FAQPage JSON-LD must match visible FAQ questions and answers exactly.

TECHNICAL REQUIREMENTS

Keep:
- TanStack route
- createSeoMeta
- canonical URL
- responsive design
- existing visual system

Schema:
- WebPage
- BreadcrumbList
- FAQPage
- Article if appropriate

REMOVE / REWRITE LEGACY CLAIMS

Remove:
- arbitrary "3 to 7" optimal partner claims
- arbitrary "2 to 4" or "3 to 5" partner prescriptions
- 24–48 hour universal response claims
- "pre-vetted" directory claims
- "zero deal flow" claims
- conversion-rate promises
- high-performing partner guarantees
- high-intent outcome promises
- claims that specific partner types are inherently better
- any legal enforcement/NCND/cryptographic language if present

Do not introduce replacement statistics.

CANNIBALIZATION RULE

This page owns:
"How do I find B2B referral partners?"

It must remain distinct from:

/b2b-referral-network
= what a B2B referral network is / finding referral relationships

/referral-partnerships
= how to structure and govern referral partnerships

/b2b-partnership-network
= broad commercial partnership discovery

/how-to-exchange-business-leads
= mechanics of exchanging a business opportunity

/agency-lead-exchange
= agency-specific lead exchange

Keep this page focused on:
DISCOVERY → RESEARCH → EVALUATION → OUTREACH → PILOT

Push the completed file.
```

After this page is pushed and audited, **Cluster 4 will be complete** because its two guides will have clear ownership:

`/how-to-find-distribution-partners` → finding/evaluating distributors  
`/how-to-find-b2b-referral-partners` → finding/evaluating referral partners

That distinction is also consistent with current referral-partner guidance, which centers on customer overlap, complementary capabilities, partner research, and deliberate relationship building.