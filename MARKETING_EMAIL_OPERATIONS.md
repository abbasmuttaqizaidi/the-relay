# Marketing Email Operations

## Required configuration

Set these server-side environment variables before sending campaigns:

- `RESEND_API_KEY`: Resend API key for the verified sending domain.
- `MARKETING_FROM_EMAIL`: optional verified marketing sender override; defaults to `Marlowe Wells <marlowe.wells@usetherelay.com>`.
- `MARKETING_UNSUBSCRIBE_SECRET`: random secret with at least 32 bytes, used to sign opt-out links.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`: all required for admin login; the session secret must be at least 32 bytes. There are no source-code fallback credentials.

Configure the chosen sender domain in Resend. Marketing sender configuration is separate from transactional email sender configuration. A physical mailing address is temporarily omitted from campaign footers; add a valid business mailing address before production marketing sends where required by applicable law.

## Database migration

Apply the additive marketing and address-book tables before deploying the feature:

```sh
npm run db:migrate:deploy
```

This migration is additive and does not alter existing user or notification records. The deployment build generates Prisma Client but does not apply migrations automatically.

## Sending workflow

The admin's Marketing Email tab sends one message directly to a manually entered list of up to 100 addresses. Separate address entries with commas, spaces, semicolons, or new lines. Each recipient is sent a private copy; the other addresses are not exposed. The admin must confirm permission to email the supplied recipients. Invalid addresses are rejected, duplicates are removed, and suppressed addresses are skipped.

The subject and HTML body are sanitized and submitted through Resend's batch API. Each message includes a signed unsubscribe link; confirmed opt-outs are saved in the global suppression table. The Address book remains available as a separate optional tool. Historical campaign tables remain in the database but are no longer part of the admin email sending flow.