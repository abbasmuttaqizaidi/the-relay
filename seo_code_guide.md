When designing the page use the color scheme present in color_scheme.md

I checked the pushed version directly in GitHub. The rewrite is largely on target, and the Cluster 3 architecture is now correctly separated.

There are **3 wording issues** I want fixed before we move on:

1. “qualified counterpart businesses capable of fulfilling” → too strong; Relay cannot guarantee capability.
2. “verified service providers” → this may overstate what verification establishes.
3. “ensure high delivery compatibility” → implies an outcome rather than an evaluation.

Send this final polish to the agent:

```text
Final micro-fix only in:
src/routes/agency-lead-exchange.tsx

Do not rewrite the page or change SEO structure.

1. Replace:
"The Relay provides a structured environment where agencies can discover qualified counterpart businesses capable of fulfilling out-of-scope opportunities—turning unserviceable enquiries into collaborative business relationships."

With:
"The Relay provides a structured environment where agencies can discover potentially suitable counterpart businesses for out-of-scope opportunities and explore collaborative business relationships."

2. Replace:
"List the structured opportunity on The Relay's B2B exchange for verified service providers to discover."

With:
"List the structured opportunity on The Relay's B2B exchange for relevant businesses to discover."

3. Replace:
"Both agencies review track records, technical alignment, and commercial terms to ensure high delivery compatibility."

With:
"Both agencies review capabilities, technical alignment, and commercial terms to assess whether the opportunity is a suitable fit."

Do not change:
- title
- meta description
- H1/H2 structure
- JSON-LD
- FAQ structure
- internal links
- layout
- routing

Push the change.
```

Once that is pushed, **`/agency-lead-exchange` is finished**.

Then our next page is:

**`/what-to-do-with-unqualified-leads`**

That one needs a different treatment: it should answer **“what should I do with a lead that isn't a fit?”** rather than simply selling the Relay.