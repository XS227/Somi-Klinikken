# SOMI newsletter module

Adds `Nyhetsbrev` as a real tab inside `/kampanje` (`/kampanje#nyhetsbrev`). The
existing campaign plan, website design and CMS login are retained. The module
uses the existing Payload/Mongo database; drafts are no longer browser storage.

## Behavior

- Popup title, description, button, delay/scroll/manual trigger and activation
  are saved in Payload. Signup is disabled by default and cannot be enabled
  before email delivery is configured.
- Subscriber consent is recorded with time, wording, version and source.
  New website subscribers must confirm a signed 24-hour email link before
  activation. Visiting a confirmation or unsubscribe link alone never changes
  the subscription, so email link scanners do not activate subscriptions.
- Subscriber data and campaign management require the existing `users` CMS
  session. Public REST/GraphQL writes to newsletter collections are disabled.
  All browser mutations require the configured site Origin and JSON body.
- Campaigns are drafts until an administrator confirms queueing. Start/end
  dates and terms are mandatory for queueing. November's 40% laser offer is
  prefilled without invented dates or terms.
- Queueing freezes the content and audience. Editing queued campaigns is
  prohibited. Immediately before each submission, the worker checks subscriber
  status again. Delivery idempotency keys and persistent progress permit resume.
- Acceptance from the email provider is labeled acceptance, not delivery or
  opening. No tracking pixels. Failed or ambiguous submissions are retained in
  the delivery log. Three attempts maximum, all within the provider's 24-hour
  idempotency window; later ambiguity requires manual inspection.
- CSV import accepts up to 200 rows / 50 kB, requires `email`, `consentedAt` and
  `evidence`, and skips all existing addresses, including suppressions. Export
  quotes cells and neutralizes spreadsheet formula injection.
- Signed individual unsubscribe links and RFC 8058 one-click POST are included.
  No campaign is queued or sent merely by deploying the code.

## Server configuration

Keep secrets in the server environment, never in the repository or browser.

```
NEWSLETTER_RESEND_API_KEY=<email sending API key>
NEWSLETTER_FROM=SOMI Klinikken <nyhetsbrev@somiklinikken.no>
NEWSLETTER_WORKER_SECRET=<random secret, at least 32 characters>
# Optional independent token-signing secret; falls back to PAYLOAD_SECRET:
NEWSLETTER_TOKEN_SECRET=<random secret, at least 32 characters>
```

The sender domain must be verified with the provider. These are delivery-only
credentials: audience, content and administration remain in Somi's own module.
The transport is Resend's REST API and does not add an external newsletter UI.
If no provider is connected, the UI explains why signup and sends are disabled.

## Deployment on the established Somi VPS

1. Preserve server changes and record the existing service config, revision and
   previous build. Apply this branch to `/apps/somi-klinikken`; do not replace
   `.env` or uploads and do not deploy over unreviewed live changes.
2. Generate Payload types if necessary, run the newsletter tests, and build in
   an isolated release directory. Keep the running Next process intact until
   the new build succeeds, then switch releases/restart `somi-klinikken`.
3. Confirm the service's Node path, Unix user, directory and app port. Adapt the
   two supplied systemd units to those observed values. Install the units,
   reload systemd, and enable/start `somi-newsletter-worker.timer`.
4. The worker runs as a serialized oneshot timer with a persistent heartbeat.
   Scheduled sending is enabled only after a heartbeat within the last 3 min.
   Keep one Next process for this worker implementation; a scaled multi-process
   deployment needs a database-backed worker lease.
5. Nginx must overwrite `X-Real-IP` with the remote address. Confirmation/token
   pages have `no-referrer`; GA configuration is skipped on `/nyhetsbrev` to
   avoid forwarding signed tokens to analytics.
6. Check `/kampanje#nyhetsbrev`, administrator access, unauthorized API access,
   saving a draft, popup preview and a testmail explicitly initiated by an
   administrator. Enable signup only when the sender and delivery are verified.
7. Do not import the booking customer list without documented newsletter
   permission. Do not queue November's draft before Katarina confirms dates
   and conditions.

## Limits

- This version supports 10,000 recipients per campaign, five submissions per
  worker invocation, a subscriber table paginated in groups of 50, and 100
  most recent campaigns in the editor.
- Provider acceptance is recorded. Delivery/bounce/complaint webhook ingestion
  is not included in this version. The provider suppression system remains
  effective; automatic reconciliation of those events is a separate extension.
- Changes to browser privacy settings may prevent remembering the seven-day
  popup dismissal. Signup and administrator data remain database-backed.
- This source was prepared while the Somi remote device was offline. Deployment
  and real provider delivery must be verified once that connection is restored.

## Verification performed

- 22 tests passed: eight input/token/template tests and fourteen tests with a
  real isolated MongoDB replica and the real Payload collections/APIs. Email
  provider requests were mocked; no real email was sent.
- Production `npm run build` completed successfully.
- Browser verification against the production build passed at 390, 768 and
  1440 pixels: anonymous/administrator access, popup modal, drafts and popup
  settings surviving reload, CSV export, all three tabs, no horizontal page
  overflow and no JavaScript page errors.
- TypeScript reported only two errors already present in the base revision:
  `Media.upload.staticURL` and `admin.meta.favicon`. No new module or test
  type errors remain. The existing production build skips type checking.

Run the suite with `npx vitest run --config vitest.newsletter.config.mts`.
Database tests require `NEWSLETTER_TEST_DATABASE_URL` and `DATABASE_URL` to
point to an isolated `somi_newsletter_test` database at `127.0.0.1`. Without
that variable, the database suite is explicitly skipped. Do not run it against
the production database.
