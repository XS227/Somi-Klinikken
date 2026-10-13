import { beforeAll, afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config'
import { randomUUID } from 'node:crypto'
import { subscribe, consumeToken, queueCampaign, workQueue, updateCampaignIf, deliveryReady, siteOrigin } from '../../src/lib/newsletter/server'
import { defaultCampaign, CONSENT_TEXT, CONSENT_VERSION } from '../../src/lib/newsletter/model'
import { token } from '../../src/lib/newsletter/tokens'
import { GET as manageGET, POST as managePOST } from '../../src/app/api/nyhetsbrev/manage/route'
import { POST as tokenPOST, GET as tokenGET } from '../../src/app/api/nyhetsbrev/token/route'
import { POST as workerPOST } from '../../src/app/api/nyhetsbrev/worker/route'

const secret = 'newsletter-integration-test-secret-at-least-32-chars'
const enabled = Boolean(process.env.NEWSLETTER_TEST_DATABASE_URL)
let payload: Payload, auth: string
describe.skipIf(!enabled)('real Payload / Mongo persistence and API authorization', () => {
  beforeAll(async () => {
    const uri = process.env.NEWSLETTER_TEST_DATABASE_URL!
    if (!uri.includes('127.0.0.1') || !uri.includes('somi_newsletter_test')) throw Error('Use an isolated local somi_newsletter_test database only.')
    process.env.DATABASE_URL = uri; process.env.PAYLOAD_SECRET = secret; process.env.NEWSLETTER_TOKEN_SECRET = secret
    payload = await getPayload({ config })
    const email = `newsletter-test-${randomUUID()}@example.com`, password = randomUUID()
    await payload.create({ collection: 'users', data: { email, password }, overrideAccess: true })
    const login = await payload.login({ collection: 'users', data: { email, password } })
    auth = `payload-token=${login.token}`
  }, 30000)
  afterAll(async () => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); await payload?.destroy() })
  beforeEach(async () => {
    vi.unstubAllGlobals(); process.env.NEWSLETTER_RESEND_API_KEY = 'test-key-not-real'; process.env.NEWSLETTER_FROM = 'SOMI <test@example.com>'
    for (const collection of ['newsletter-deliveries', 'newsletter-campaigns', 'newsletter-subscribers'] as const) await payload.delete({ collection, where: { id: { exists: true } }, overrideAccess: true })
    await payload.updateGlobal({ slug: 'newsletter-settings', data: { enabled: true }, overrideAccess: true })
  })
  const request = (body: Record<string, unknown>, authenticated = true, origin = siteOrigin()) => new Request(`${siteOrigin()}/api/nyhetsbrev/manage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, ...(authenticated ? { Cookie: auth } : {}) }, body: JSON.stringify(body),
  })
  const provider = () => { const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'provider-test-id' }), { status: 200 })); vi.stubGlobal('fetch', fetch); return fetch }
  async function subscriber(status: 'active' | 'pending' | 'unsubscribed' = 'active') {
    return payload.create({ collection: 'newsletter-subscribers', data: { email: `${randomUUID()}@example.com`, status, consentText: CONSENT_TEXT, consentVersion: CONSENT_VERSION, consentedAt: new Date().toISOString(), source: 'test', confirmVersion: randomUUID(), unsubscribeVersion: randomUUID() }, overrideAccess: true })
  }
  async function campaign() {
    return payload.create({ collection: 'newsletter-campaigns', data: { ...defaultCampaign, startDate: '2026-11-01', endDate: '2026-11-30', terms: 'Terms confirmed for integration test.', scheduledAt: null, status: 'draft' }, overrideAccess: true })
  }
  it('saves drafts to the database and lists them only for an administrator', async () => {
    const res = await managePOST(request({ action: 'save', ...defaultCampaign })); expect(res.status).toBe(200)
    const data = await res.json(); const saved = await payload.findByID({ collection: 'newsletter-campaigns', id: data.campaign.id, overrideAccess: true }); expect(saved.subject).toBe(defaultCampaign.subject)
    const authorized = await manageGET(new Request(`${siteOrigin()}/api/nyhetsbrev/manage`, { headers: { Cookie: auth, 'Sec-Fetch-Site': 'same-origin' } })); expect(authorized.status).toBe(200)
    expect((await authorized.json()).campaigns).toHaveLength(1)
    expect((await manageGET(new Request(`${siteOrigin()}/api/nyhetsbrev/manage`))).status).toBe(401)
  })
  it('rejects anonymous mutations and cross-site requests', async () => {
    expect((await managePOST(request({ action: 'save', ...defaultCampaign }, false))).status).toBe(401)
    expect((await managePOST(request({ action: 'save', ...defaultCampaign }, true, 'https://other.example'))).status).toBe(403)
    expect((await payload.find({ collection: 'newsletter-campaigns', overrideAccess: true })).totalDocs).toBe(0)
  })
  it('protects subscriber collection data and writes in the native Payload API too', async () => {
    await subscriber()
    await expect(payload.find({ collection: 'newsletter-subscribers', overrideAccess: false })).rejects.toThrow()
    await expect(payload.create({ collection: 'newsletter-subscribers', data: { email: 'unauthorized@example.com', status: 'pending', source: 'test', consentText: CONSENT_TEXT, consentVersion: CONSENT_VERSION, consentedAt: new Date().toISOString(), confirmVersion: randomUUID(), unsubscribeVersion: randomUUID() }, overrideAccess: false })).rejects.toThrow()
  })
  it('records consent, sends confirmation, and activates only the signed subscription', async () => {
    const fetch = provider()
    await subscribe(payload, { email: 'Anne@example.com', firstName: 'Anne', consent: true })
    const sub = (await payload.find({ collection: 'newsletter-subscribers', overrideAccess: true })).docs[0]
    expect(sub.status).toBe('pending'); expect(sub.consentVersion).toBe(CONSENT_VERSION); expect(sub.consentText).toBe(CONSENT_TEXT)
    expect(fetch).toHaveBeenCalledOnce()
    const body = JSON.parse(fetch.mock.calls[0][1].body); expect(body.to).toEqual(['anne@example.com'])
    const link = new URL(body.text.match(/https?:\/\/\S+/)[0])
    await consumeToken(payload, link.searchParams.get('token')!, 'confirm')
    expect((await payload.findByID({ collection: 'newsletter-subscribers', id: sub.id, overrideAccess: true })).status).toBe('active')
    await consumeToken(payload, link.searchParams.get('token')!, 'confirm')
    expect((await payload.find({ collection: 'newsletter-subscribers', overrideAccess: true })).totalDocs).toBe(1)
  })
  it('does not overwrite active subscribers on a duplicate signup', async () => {
    const sub = await subscriber(), fetch = provider()
    await subscribe(payload, { email: sub.email, firstName: 'Changed without confirmation', consent: true })
    expect(fetch).not.toHaveBeenCalled(); expect((await payload.findByID({ collection: 'newsletter-subscribers', id: sub.id, overrideAccess: true })).firstName).not.toBe('Changed without confirmation')
  })
  it('does not falsely mark confirmation sent when the provider rejects it', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: 'not-verified' }), { status: 403 })))
    await expect(subscribe(payload, { email: 'failed@example.com', consent: true })).rejects.toThrow()
    const sub = (await payload.find({ collection: 'newsletter-subscribers', overrideAccess: true })).docs[0]
    expect(sub.status).toBe('pending'); expect(sub.confirmationSentAt).toBeFalsy()
  })
  it('blocks enrollment and sends when email delivery is unconfigured', async () => {
    const fetch = provider(); delete process.env.NEWSLETTER_RESEND_API_KEY
    expect(deliveryReady()).toBe(false)
    await expect(subscribe(payload, { email: 'not-open@example.com', consent: true })).rejects.toThrow()
    expect(fetch).not.toHaveBeenCalled()
  })
  it('viewing an unsubscribe link is read-only, but a valid one-click POST suppresses it', async () => {
    const sub = await subscriber(), value = token(secret, String(sub.id), 'unsubscribe', sub.unsubscribeVersion)
    const url = `${siteOrigin()}/api/nyhetsbrev/token?token=${encodeURIComponent(value)}`
    expect(tokenGET(new Request(url)).status).toBe(303)
    expect((await payload.findByID({ collection: 'newsletter-subscribers', id: sub.id, overrideAccess: true })).status).toBe('active')
    const post = await tokenPOST(new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'List-Unsubscribe=One-Click' }))
    expect(post.status).toBe(200); expect((await payload.findByID({ collection: 'newsletter-subscribers', id: sub.id, overrideAccess: true })).status).toBe('unsubscribed')
  })
  it('invalidates an old confirmation link after unsubscribe', async () => {
    const sub = await subscriber('pending'), confirm = token(secret, String(sub.id), 'confirm', sub.confirmVersion, Date.now() + 60000)
    await consumeToken(payload, token(secret, String(sub.id), 'unsubscribe', sub.unsubscribeVersion), 'unsubscribe')
    await expect(consumeToken(payload, confirm, 'confirm')).rejects.toThrow()
  })
  it('imports documented permission without reactivating an unsubscribe', async () => {
    const sub = await subscriber('unsubscribed')
    const csv = `email;firstName;consentedAt;evidence\n${sub.email};Old;2026-10-01;Written permission\nnew@example.com;New;2026-10-01;Written permission`
    const res = await managePOST(request({ action: 'import', csv, confirm: true })); expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({ imported: 1, skipped: 1 })
    expect((await payload.findByID({ collection: 'newsletter-subscribers', id: sub.id, overrideAccess: true })).status).toBe('unsubscribed')
    expect((await managePOST(request({ action: 'import', csv: 'email\nmissing@example.com', confirm: true }))).status).toBe(400)
  })
  it('queues a frozen audience, rechecks suppressions and resumes without duplicates', async () => {
    const a = await subscriber(), b = await subscriber(); await subscriber('pending'); await subscriber('unsubscribed')
    const draft = await campaign(); const fetch = provider()
    expect(await queueCampaign(payload, String(draft.id))).toBe(2)
    await expect(queueCampaign(payload, String(draft.id))).rejects.toThrow()
    expect(await updateCampaignIf(payload, String(draft.id), ['draft'], { subject: 'Cannot change' })).toBeNull()
    await payload.update({ collection: 'newsletter-subscribers', id: b.id, data: { status: 'unsubscribed' }, overrideAccess: true })
    const result = await workQueue(payload); expect(result.processed).toBe(2); expect(fetch).toHaveBeenCalledOnce()
    const logs = await payload.find({ collection: 'newsletter-deliveries', overrideAccess: true }); expect(logs.docs.map(d => d.status).sort()).toEqual(['accepted', 'skipped'])
    expect((await payload.findByID({ collection: 'newsletter-campaigns', id: draft.id, overrideAccess: true })).status).toBe('finished')
    await workQueue(payload); expect(fetch).toHaveBeenCalledOnce()
    expect(JSON.parse(fetch.mock.calls[0][1].body).to).toEqual([a.email])
  })
  it('allows just one concurrent queue transition on the same campaign', async () => {
    await subscriber(); const draft = await campaign(); provider()
    const results = await Promise.allSettled([queueCampaign(payload, String(draft.id)), queueCampaign(payload, String(draft.id))])
    expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1)
  })
  it('persists failed attempts and uses the same idempotency key on retry', async () => {
    await subscriber(); const draft = await campaign(); await queueCampaign(payload, String(draft.id))
    const fetch = vi.fn().mockResolvedValueOnce(new Response('{}', { status: 503 })).mockResolvedValueOnce(new Response('{"id":"retry-id"}', { status: 200 })); vi.stubGlobal('fetch', fetch)
    await workQueue(payload); expect((await payload.find({ collection: 'newsletter-deliveries', overrideAccess: true })).docs[0].status).toBe('pending')
    await workQueue(payload); expect((await payload.find({ collection: 'newsletter-deliveries', overrideAccess: true })).docs[0].status).toBe('accepted')
    expect(fetch.mock.calls[0][1].headers['Idempotency-Key']).toBe(fetch.mock.calls[1][1].headers['Idempotency-Key'])
  })
  it('rejects unauthorized worker requests', async () => {
    expect((await workerPOST(new Request(`${siteOrigin()}/api/nyhetsbrev/worker`, { method: 'POST' }))).status).toBe(401)
  })
})
