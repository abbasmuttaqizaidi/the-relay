IMPLEMENTATION TASK: Relay Exchange Agreement, Negotiation & Mutual Contact Sharing

You are implementing a core workflow change in The Relay.

IMPORTANT:
Do NOT start coding immediately.

First inspect the existing codebase thoroughly and understand:
- application architecture
- frontend framework and routing
- backend/API architecture
- database/schema/migrations
- Opportunity model and lifecycle
- Express Interest implementation
- current Interest statuses
- current Handshake implementation
- business approval/verification logic
- current contact/business profile fields
- notification system
- authentication and authorization
- Supabase/RLS policies if applicable
- existing UI components/design system
- existing modal/dialog patterns
- existing server actions/API endpoints
- existing tests

The existing application already has Opportunities, Express Interest, and Handshake concepts. EXTEND the existing implementation wherever possible. Do not create duplicate or parallel systems unnecessarily.

The objective is to introduce a structured:

Express Interest
→ Process Acknowledgement
→ Exchange Proposal
→ Negotiation
→ Final Exchange Agreement
→ Mutual Confirmation
→ Contact Sharing Consent
→ Handshake Complete

workflow.

============================================================
1. CORE PRODUCT PRINCIPLE
============================================================

Relay is a trusted environment where verified businesses can discover business opportunities, negotiate what they are willing to exchange, agree on terms, and connect.

Relay DOES NOT determine the monetary/commercial value of an opportunity.

Relay DOES NOT guarantee:
- conversion
- revenue
- payment
- commission
- fulfilment
- delivery
- performance
- business outcome

The businesses themselves decide what they exchange and how they execute the exchange.

Core product principle:

"Relay doesn't decide what an opportunity is worth. Businesses do."

Short explanation:

"Relay facilitates the connection — the businesses decide what they exchange and how they execute it."

The implementation must preserve this principle.

============================================================
2. IMPORTANT DISTINCTION
============================================================

There are three different concepts and they MUST NOT be conflated:

A. ACKNOWLEDGEMENT
Meaning:
"I understand how Relay's exchange process works."

B. EXCHANGE AGREEMENT
Meaning:
"I agree with this specific exchange and its final terms."

C. CONTACT SHARING CONSENT
Meaning:
"I agree to share these specific contact details with the other business."

These are separate states/actions.

Do not treat clicking "I Understand" as agreeing to the commercial exchange.

Do not treat agreeing to the exchange as automatically consenting to every contact field.

============================================================
3. CURRENT EXPRESS INTEREST FLOW
============================================================

Existing behavior:

Approved business discovers Opportunity
→ Express Interest
→ Opportunity owner reviews
→ Accept / Decline
→ Handshake

Change this flow without breaking existing functionality.

New conceptual flow:

Opportunity
↓
Express Interest
↓
Process Acknowledgement
↓
Both parties acknowledge
↓
Exchange Proposal
↓
Negotiation
↓
Final Exchange Terms
↓
Both parties confirm
↓
Contact Sharing Consent
↓
Handshake Complete
↓
Connection

Do NOT automatically reveal contact information immediately after Express Interest.

Do NOT automatically reveal contact information merely because an Opportunity owner accepts the Interest.

============================================================
4. STEP 1 — EXPRESS INTEREST
============================================================

When an approved business clicks "Express Interest", preserve the existing Express Interest behavior.

After successful Express Interest creation, show an explanation modal.

The interested business should see something conceptually like:

Title:
"How Relay Exchange Works"

Body:

"You're expressing interest in this business opportunity.

If the opportunity owner also wants to proceed, both businesses will first acknowledge how Relay's exchange process works. You'll then be able to discuss and negotiate what will be exchanged, agree on the final terms, and decide what contact information you want to share.

Relay facilitates the process but does not guarantee the commercial outcome."

CTA:

"I Understand"

Do not force the user to agree to commercial terms at this stage.

Only record acknowledgement.

============================================================
5. OPPORTUNITY OWNER ACKNOWLEDGEMENT
============================================================

When the Opportunity owner receives an Interest, they should be informed that:

"A business is interested in your opportunity."

Before the exchange process proceeds, show an equivalent explanation:

"How Relay Exchange Works"

Explain that:

- both businesses must acknowledge the process
- they will discuss what is being exchanged
- they may negotiate
- both parties must confirm the final exchange terms
- they will separately decide what contact information to share
- Relay facilitates the connection but does not guarantee the commercial outcome

CTA:

"I Understand"

Record owner acknowledgement.

============================================================
6. ACKNOWLEDGEMENT DATA
============================================================

Inspect the existing Interest model first.

If appropriate, extend it with fields conceptually equivalent to:

requester_acknowledged_at
owner_acknowledged_at

Use existing naming conventions.

Do not create a separate acknowledgement table unless the existing architecture strongly suggests it.

Rules:

- Only the relevant business can acknowledge its own side.
- Acknowledgement must be server-side validated.
- Both parties must acknowledge before the Exchange Proposal/Negotiation stage becomes active.
- Acknowledgement is not commercial agreement.

If one party has acknowledged and the other has not:

Show:

"Waiting for the other business to acknowledge."

============================================================
7. STEP 2 — EXCHANGE PROPOSAL
============================================================

Once both parties acknowledge the process, unlock the Exchange Proposal stage.

The system should clearly show:

Opportunity:
[original opportunity]

Opportunity owner:
[Business A]

Interested business:
[Business B]

Then:

"What will be exchanged?"

Businesses should be able to propose what they are willing to exchange.

Initial supported exchange types:

1. Business Opportunity
2. Qualified Lead / Customer Introduction
3. Revenue Share / Percentage
4. Fixed Amount
5. Other Mutually Agreed Value

These are categories, not mandatory Relay-defined valuations.

The system must NOT imply that Relay determines the worth of the exchange.

============================================================
8. EXCHANGE TYPE DETAILS
============================================================

If "Business Opportunity" is selected:

Fields:
- Description of opportunity/value being offered

Example:
"I will provide a qualified website-development opportunity."

If "Qualified Lead / Customer Introduction":

Fields:
- Description
- Optional qualification/context

If "Revenue Share / Percentage":

Fields:
- percentage
- basis/description

Example:
"7% of the first collected invoice from the resulting project."

IMPORTANT:
Do not automatically calculate or enforce the amount.

If "Fixed Amount":

Fields:
- amount
- currency
- description/terms

IMPORTANT:
This does NOT create a payment obligation enforced by Relay.

If "Other":

Fields:
- free-text description

Maximum reasonable character limits should be implemented.

Use existing validation conventions.

============================================================
9. PROPOSAL STRUCTURE
============================================================

The Exchange Proposal must identify:

- interest_id
- opportunity_id
- proposing business
- receiving business
- exchange type
- exchange details
- optional percentage
- optional fixed amount
- optional currency
- proposal status
- created_at
- updated_at

Adapt field names to the existing database conventions.

Do not blindly copy this structure if the existing schema has an appropriate equivalent.

============================================================
10. NEGOTIATION
============================================================

Negotiation is a first-class stage.

Do NOT implement negotiation as a single mutable text field where each party overwrites the previous proposal.

Every new proposal/counter-proposal must be stored as a separate version/record.

Example:

Proposal #1
Business A:
"10% of collected revenue."

Proposal #2
Business B:
"10% of first invoice only."

Proposal #3
Business A:
"7% of first invoice."

Proposal #4
Business B:
"Accepted."

The backend must retain the proposal history.

The UI should show the current proposal prominently.

Proposal history can be collapsed/expandable.

============================================================
11. NEGOTIATION ACTIONS
============================================================

For the active proposal, the relevant business can:

- Accept
- Counter Proposal
- Decline
- Cancel/withdraw where appropriate

Do not allow unauthorized businesses to manipulate proposals.

If a party counter-proposes:

The previous proposal remains immutable.

Create a new proposal version.

Example:

previous status:
superseded

new status:
pending_response

If a proposal is modified after one party has confirmed it, all affected confirmations must be invalidated.

There must never be a situation where:

Business A confirmed Version 3
and
Business B confirms Version 2

The final agreement must reference exactly one final proposal/version.

============================================================
12. NEGOTIATION UI
============================================================

Create a clear Exchange/Negotiation interface consistent with the existing Relay UI.

Suggested structure:

------------------------------------------------
Exchange Negotiation
------------------------------------------------

Opportunity:
"Company looking for CRM"

Current proposal:

Business A is offering:
"CRM business opportunity"

In return:
"Revenue Share"

Terms:
"7% of the first collected invoice"

[Accept]
[Counter Proposal]
[Decline]

------------------------------------------------

Proposal History
------------------------------------------------

Proposal 3 — Current
Proposal 2
Proposal 1

------------------------------------------------

Do not make this feel like a social chat application.

This is a structured business negotiation.

If the existing Relay product does not have messaging/chat, DO NOT introduce a generic chat system merely for this feature.

Negotiation can be structured around proposal/counter-proposal records and optional explanation fields.

============================================================
13. PROPOSAL EXPLANATION
============================================================

When submitting a proposal/counter-proposal, optionally allow:

"Additional terms / explanation"

Example:

"I can agree to revenue share on the first invoice only."

This is NOT a social chat message.

It belongs to the proposal record.

============================================================
14. FINAL EXCHANGE AGREEMENT
============================================================

When both businesses agree on the same proposal:

The UI must transition to:

"Final Exchange Terms"

Show the exact final terms clearly.

Example:

Opportunity:
CRM requirement

Exchange:
Revenue Share

Terms:
7% of the first collected invoice.

Additional terms:
[exact agreed text]

Then show:

"Both businesses must confirm these final terms before the Handshake can be completed."

Each party must explicitly confirm.

CTA:

"I Agree to These Exchange Terms"

Do not use vague copy such as:

"Continue"

The user should understand exactly what they are agreeing to.

============================================================
15. FINAL CONFIRMATION
============================================================

Both parties must independently confirm the same final proposal/version.

Backend must record:

- final proposal/version ID
- owner_confirmed_at
- requester_confirmed_at
- confirmation timestamps
- agreement status

Only when BOTH have confirmed:

Exchange Agreement = ACTIVE / AGREED

Do not create a Handshake before this condition is satisfied.

============================================================
16. EXCHANGE AGREEMENT STATUS
============================================================

Use the project's existing conventions where possible.

Conceptual statuses:

draft
pending_response
countered
accepted
superseded
declined
cancelled
agreed

The exact implementation may differ.

The key requirement:

There must be one identifiable final agreed exchange.

============================================================
17. AGREEMENT RECORD
============================================================

If the existing Interest model cannot cleanly store the final agreement, create/extend an Exchange Agreement entity.

Conceptually:

exchange_agreements

Possible fields:

id
interest_id
opportunity_id
final_proposal_id
owner_business_id
interested_business_id
exchange_type
exchange_details
revenue_percentage
fixed_amount
currency
additional_terms
status
owner_confirmed_at
requester_confirmed_at
agreed_at
created_at
updated_at

IMPORTANT:

Do not create unnecessary duplicate data.

The final agreement should reference the exact final proposal/version that both parties approved.

============================================================
18. IMMUTABILITY OF FINAL AGREEMENT
============================================================

Once both parties have confirmed the final Exchange Agreement:

The final terms should become immutable.

Do not allow either party to silently edit them.

If either party wants different terms:

They must initiate a new negotiation/change process.

Never silently overwrite an already agreed agreement.

============================================================
19. STEP 3 — CONTACT SHARING
============================================================

After the Exchange Agreement is mutually confirmed, start a separate Contact Sharing stage.

This is NOT automatic.

Each business independently chooses what contact information it wants to share.

Example:

"Choose what you want to share with [Business Name]"

Available fields:

☐ Business Email
☐ Phone Number
☐ WhatsApp
☐ Alternate Phone
☐ Office Number

Use only contact fields that actually exist in the current Business/Profile schema.

Do not invent database fields if equivalent existing fields already exist.

============================================================
20. CONTACT SHARING IS TWO-SIDED CONSENT
============================================================

If Business A selects:

☑ Phone Number
☑ Business Email

do NOT immediately expose those fields to Business B.

Instead:

Business B sees:

"[Business A] wants to share the following contact information with you:

☑ Business Email
☑ Phone Number

Accept these contact details?"

Actions:

[Accept]
[Choose What I Share]
[Decline]

The same process applies in reverse.

Contact information becomes visible only according to explicit consent.

============================================================
21. IMPORTANT CONTACT SHARING LOGIC
============================================================

Do NOT interpret:

"Contact field selected"

as:

"Contact field shared."

There are separate states:

selected
→ requested
→ accepted
→ revealed

For each contact field, track consent appropriately.

Example:

Business A selects:
Phone

Business B accepts:
Phone

Only then:
A's phone becomes visible to B.

Business B may independently select:
Email + WhatsApp

Business A accepts:
Email + WhatsApp

Then:

A sees B's Email + WhatsApp.

B sees A's Phone.

Neither side sees unapproved fields.

============================================================
22. CONTACT SHARING DATA
============================================================

Inspect the existing database.

Do not store duplicate contact information inside the Exchange Agreement if the canonical business profile already stores it.

Instead, store references/consent records.

Conceptually:

contact_sharing_consents

id
interest_id / exchange_agreement_id
from_business_id
to_business_id
contact_field
status
requested_at
accepted_at
created_at
updated_at

Use the project's naming conventions and architecture.

Possible statuses:

pending
accepted
declined
revoked

If the product does not need per-field revocation after sharing, do not over-engineer it.

IMPORTANT:
Never expose a contact value just because the field exists in the Business table.

Server-side authorization must check that the specific field has been mutually approved for sharing.

============================================================
23. CONTACT REVEAL SECURITY
============================================================

This is security-sensitive.

Frontend hiding is NOT sufficient.

Every API/server action that returns private contact information must verify:

1. Current authenticated user belongs to a business.
2. That business is one of the two businesses in the Exchange Agreement.
3. Exchange Agreement is valid.
4. The specific contact field has been mutually approved.
5. The requested contact belongs to the other participating business.

If any condition fails:
Do not return the contact value.

If using Supabase:
Review and update RLS policies carefully.

Do not expose private contact information through:
- public Opportunity API
- public business profile API
- Opportunity cards
- search endpoints
- server-rendered public pages
- client-side payloads
- preloaded profile objects

============================================================
24. HANDSHAKE
============================================================

Handshake should now represent the completion of the structured exchange process.

Handshake should occur only after:

1. Interest exists
2. Both parties acknowledged the process
3. Exchange was negotiated
4. Final exchange terms were mutually confirmed
5. Contact sharing consent process has been completed sufficiently according to the selected product rules

The Handshake page should show:

"Handshake Complete"

Participants:
Business A
Business B

Opportunity:
[original opportunity]

Exchange Agreement:
[final agreed exchange]

Contact Information:
[only mutually approved fields]

============================================================
25. CONTACT SHARING COMPLETION RULE
============================================================

Implement a clear product rule for when the Handshake becomes "Complete".

Recommended initial rule:

Both businesses must complete their contact-sharing choice.

A business may choose:
- specific fields to share
- or choose not to share optional fields

The system should not force either party to reveal phone/WhatsApp/etc.

At minimum, require each side to explicitly complete the contact-sharing decision.

If the existing product requires email to facilitate the connection, inspect current requirements before enforcing this.

Do NOT silently make all contact fields mandatory.

============================================================
26. WHAT RELAY RECORDS
============================================================

Relay should record:

- who expressed interest
- who acknowledged the process
- proposals
- counter-proposals
- proposal history
- final agreed terms
- who confirmed
- confirmation timestamps
- what contact fields each side consented to share
- Handshake completion
- relevant notifications

This creates a reliable record of the interaction.

============================================================
27. WHAT RELAY DOES NOT RECORD / GUARANTEE
============================================================

Do NOT build revenue tracking.

Do NOT build automatic commission tracking.

Do NOT build conversion tracking.

Do NOT build automatic payment verification.

Do NOT build escrow.

Do NOT build payment collection.

Do NOT build automatic enforcement.

Example:

A and B agree:

"10% of revenue."

Relay records:

"10% of revenue."

Relay does NOT verify:

- whether B made revenue
- how much B made
- whether B paid A
- whether B fulfilled the opportunity
- whether the customer converted

This is an agreement between the businesses.

============================================================
28. LEGAL / TERMS COPY
============================================================

Add a clear but concise disclosure in the Exchange Agreement confirmation UI.

Suggested text:

"Both businesses independently agree to the exchange terms. Relay facilitates the connection and records the agreed terms but does not guarantee payment, conversion, revenue, delivery, fulfilment, or performance by either business."

Do NOT describe the agreement as legally binding unless existing legal documentation specifically supports that claim.

Do NOT invent legal obligations.

Do NOT claim that Relay is an escrow provider, broker, payment processor, guarantor, or enforcement authority.

This product copy is not a substitute for legal review.

============================================================
29. TRUST MODEL
============================================================

The product should clearly distinguish:

Relay verifies:
WHO is participating.

Businesses decide:
WHAT they exchange.

Businesses negotiate:
HOW the exchange works.

Businesses execute:
THE COMMERCIAL ARRANGEMENT.

Relay facilitates:
DISCOVERY + NEGOTIATION STRUCTURE + AGREEMENT RECORD + CONNECTION.

This distinction should appear naturally throughout the UX.

============================================================
30. NOTIFICATIONS
============================================================

Use the existing notification infrastructure.

Relevant events:

- Interest received
- Acknowledgement required
- Other party acknowledged
- Exchange Proposal received
- Counter Proposal received
- Proposal accepted
- Proposal declined
- Final confirmation required
- Other party confirmed final terms
- Exchange Agreement completed
- Contact sharing request received
- Contact sharing accepted
- Handshake completed

Do not create a new notification architecture if one already exists.

============================================================
31. UI STATES
============================================================

The UI must clearly communicate the current state.

Examples:

Interest:
"Waiting for the opportunity owner"

Acknowledgement:
"Waiting for [Business] to acknowledge the exchange process"

Negotiation:
"Negotiation in progress"

Counter proposal:
"Counter proposal received"

Final confirmation:
"Waiting for your confirmation"

One party confirmed:
"[Business] has confirmed the exchange terms. Your confirmation is required."

Agreement:
"Exchange Agreement confirmed"

Contact sharing:
"Choose what contact information you want to share"

Handshake:
"Handshake Complete"

============================================================
32. PREVENT CONFUSION BETWEEN INTEREST AND AGREEMENT
============================================================

Expressing Interest means:

"I am interested in this opportunity."

It does NOT mean:

"I agree to the exchange terms."

Accepting an Interest by the opportunity owner means:

"I want to proceed with this business."

It does NOT mean:

"I accept whatever exchange terms are proposed."

Final confirmation means:

"I agree to these exact exchange terms."

Handshake means:

"The exchange process has been mutually agreed and the businesses can connect."

Make the UI reflect these distinctions.

============================================================
33. EXISTING OPPORTUNITY EXPIRY / CLOSURE
============================================================

Respect existing Opportunity lifecycle.

Handle:

- Opportunity expires before Interest
- Opportunity expires after Interest
- Opportunity expires during negotiation
- Opportunity closes during negotiation
- Opportunity expires after Exchange Agreement
- Opportunity closes after Handshake

Do not invent new behavior without inspecting current business rules.

At minimum:
An already completed Handshake should not become invalid merely because the original Opportunity later expires/closes.

============================================================
34. WITHDRAW / DECLINE
============================================================

Existing Interest behavior should remain supported.

If Interest is:

declined
withdrawn
cancelled

then active negotiation must not continue.

Any pending proposals should become inactive.

If an Exchange Agreement has already been finalized, follow a separate cancellation state rather than silently deleting it.

Do not delete historical agreement records merely because the relationship later ends.

============================================================
35. DATABASE INTEGRITY
============================================================

Use foreign keys where appropriate.

Ensure:

- Exchange Agreement belongs to one Interest
- Interest belongs to one Opportunity
- participating businesses match the Interest
- proposals belong to the correct Exchange Agreement/Interest
- only valid participating businesses can act
- final agreement references a valid final proposal

Use transactions where multiple records must change atomically.

Especially for:

- final agreement confirmation
- Handshake completion
- contact-sharing consent

Prevent race conditions where both parties confirm at the same time.

============================================================
36. AUTHORIZATION
============================================================

All important rules must be enforced server-side.

Do not trust:

- business_id from client
- user_id from client
- agreement_id alone
- frontend status
- hidden UI buttons

Server must derive the current business from the authenticated session.

Verify that the current user belongs to the participating business.

Verify business approval status where applicable.

============================================================
37. IDEMPOTENCY / DUPLICATE ACTIONS
============================================================

Handle repeated requests safely.

Examples:

- user clicks Express Interest twice
- user clicks Accept twice
- user clicks Confirm twice
- user submits the same counter proposal twice
- both parties confirm simultaneously
- contact consent is submitted twice

Use database constraints and/or server-side idempotency where appropriate.

Do not create duplicate Agreements or Handshakes.

============================================================
38. AUDITABILITY
============================================================

The system should preserve an internal history of:

- proposal versions
- who proposed
- who countered
- who accepted
- who declined
- timestamps
- final agreed version

This is important because Relay is facilitating a business agreement.

Do not expose unnecessary internal/audit information publicly.

============================================================
39. PUBLIC PRIVACY
============================================================

Never expose:

- exchange terms
- revenue percentage
- fixed amount
- negotiation history
- private contact details
- contact-sharing consent
- private agreement information

on public Opportunity pages or public business profiles.

Only the participating businesses can access this information.

============================================================
40. UX COPY
============================================================

Use these core messages where appropriate.

PROCESS INTRO:

"Relay helps verified businesses discover opportunities, agree on what they are willing to exchange, and connect."

ACKNOWLEDGEMENT:

"Before you proceed, make sure you understand how Relay's exchange process works."

EXCHANGE:

"What are you willing to exchange for this opportunity?"

NEGOTIATION:

"Discuss and agree on what each business will exchange."

FINAL AGREEMENT:

"Review the final exchange terms before confirming."

CONFIRMATION:

"I agree to these Exchange Terms."

CONTACT SHARING:

"Choose what contact information you want to share."

HANDSHAKE:

"Handshake Complete"

DISCLOSURE:

"Both businesses independently agree to the exchange terms. Relay facilitates the connection and records the agreed terms but does not guarantee payment, conversion, revenue, delivery, fulfilment, or performance by either business."

============================================================
41. DO NOT ADD A GENERIC CHAT SYSTEM
============================================================

Very important:

Do not turn negotiation into:

- Messenger
- WhatsApp clone
- LinkedIn DM
- generic chat

The purpose is business negotiation around a specific opportunity.

Use structured proposals/counter-proposals.

If the existing application already has a communication mechanism, inspect it and reuse it only where appropriate.

============================================================
42. MOBILE UX
============================================================

The entire flow must work well on mobile.

Pay particular attention to:

- Exchange Proposal forms
- counter-proposal forms
- final agreement review
- contact sharing selection
- acknowledgement modals
- long terms
- proposal history

Avoid horizontal overflow.

============================================================
43. ACCESSIBILITY
============================================================

Use existing accessibility patterns.

Ensure:

- dialogs have proper titles
- keyboard navigation works
- buttons have clear labels
- checkboxes have associated labels
- status changes are understandable
- destructive actions have confirmation where appropriate

============================================================
44. LEGACY HANDSHAKES
============================================================

There may already be Handshakes created under the previous system.

Do NOT break them.

Do not fabricate Exchange Agreement data for old Handshakes.

Support a legacy state such as:

"Legacy Handshake"

or display the available historical information gracefully.

Inspect the current schema/data before deciding the exact implementation.

============================================================
45. MIGRATION STRATEGY
============================================================

Before changing schema:

Inspect current production/local schema and migrations.

Create proper migrations.

Do not manually alter production data.

Do not delete existing Interest or Handshake records.

If new fields are nullable for backward compatibility, use appropriate defaults.

============================================================
46. TESTING REQUIREMENTS
============================================================

Add automated tests where the existing project supports them.

At minimum test:

1. Approved business can Express Interest.
2. Unapproved business cannot Express Interest.
3. Duplicate Interest is prevented.
4. Requester acknowledgement works.
5. Owner acknowledgement works.
6. Exchange cannot begin until both acknowledge.
7. Proposal creation works.
8. Unauthorized business cannot create proposal.
9. Counter-proposal creates a new version.
10. Previous proposal remains immutable.
11. Accepting a proposal works.
12. Changing terms invalidates previous confirmation.
13. Both parties must confirm the final proposal.
14. One confirmation alone does not create Handshake.
15. Final agreement references exact final proposal.
16. Contact sharing requires explicit consent.
17. Unapproved contact field remains hidden.
18. Approved contact field becomes visible only to the intended party.
19. Third-party business cannot access contact details.
20. Public API cannot expose private contact details.
21. Declined Interest stops negotiation.
22. Withdrawn Interest stops pending negotiation.
23. Expired Opportunity follows existing rules.
24. Completed Handshake survives Opportunity expiry/closure according to existing rules.
25. Double confirmation does not create duplicate Handshakes.
26. Legacy Handshakes remain readable.

============================================================
47. IMPLEMENTATION PROCESS
============================================================

Follow this order:

PHASE 1:
Inspect codebase and document current architecture internally.

PHASE 2:
Identify the minimum schema changes.

PHASE 3:
Implement database migrations.

PHASE 4:
Implement server-side authorization/business rules.

PHASE 5:
Implement Exchange Proposal + negotiation logic.

PHASE 6:
Implement final agreement confirmation.

PHASE 7:
Implement contact-sharing consent.

PHASE 8:
Update Handshake creation.

PHASE 9:
Update UI.

PHASE 10:
Update notifications.

PHASE 11:
Add tests.

PHASE 12:
Run:
- type checking
- lint
- tests
- build

Fix all regressions caused by the implementation.

============================================================
48. IMPORTANT DESIGN CONSTRAINT
============================================================

Do NOT over-engineer this feature.

Relay is NOT currently trying to become:

- payment infrastructure
- escrow
- CRM
- contract management platform
- commission accounting platform
- dispute resolution platform
- marketplace settlement system

The goal is:

Verified businesses
→ discover opportunity
→ express interest
→ acknowledge process
→ negotiate exchange
→ mutually agree
→ consent to contact sharing
→ connect
→ execute the exchange independently.

============================================================
49. FINAL ACCEPTANCE CRITERIA
============================================================

The implementation is complete only when this end-to-end scenario works:

Business A posts:

"Company X needs a CRM."

Business B, an approved CRM company, sees the Opportunity and clicks:

"Express Interest."

B receives the process explanation and acknowledges it.

A receives the Interest and acknowledges the process.

Both acknowledgements are recorded.

The Exchange stage becomes available.

B proposes:

"I will fulfil the CRM requirement in exchange for 10% of the first collected invoice."

A counter-proposes:

"7% of the first collected invoice."

B accepts.

The system shows the exact final terms.

A confirms.

B confirms.

The Exchange Agreement becomes ACTIVE.

Now contact sharing begins.

A chooses:

☑ Business Email
☑ Phone

B chooses:

☑ Business Email
☑ WhatsApp

Each side sees the other's requested fields and explicitly accepts them.

Only the mutually approved fields are revealed.

Handshake becomes:

"Handshake Complete"

Both businesses can now contact each other and independently execute the agreed exchange.

Relay records the agreement and the connection.

Relay does NOT:
- collect money
- verify the eventual revenue
- guarantee the 7%
- enforce payment
- guarantee conversion
- expose private information to anyone else.

============================================================
50. FINAL RESPONSE AFTER IMPLEMENTATION
============================================================

After implementation, report:

1. What you inspected.
2. Database changes.
3. Backend/API/server-action changes.
4. Frontend changes.
5. Negotiation implementation.
6. Exchange Agreement implementation.
7. Contact-sharing implementation.
8. Handshake changes.
9. Authorization/security changes.
10. Notification changes.
11. Tests added/run.
12. Build/lint/type-check results.
13. Any unresolved assumptions or product decisions.

Do not claim something is implemented unless it actually exists in the codebase and has been tested.

Again: inspect first, then implement. Reuse the existing Relay architecture and avoid unnecessary rewrites.