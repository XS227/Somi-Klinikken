import { describe, it, expect } from 'vitest'
import { campaignInput, defaultCampaign, readyToSend, emailAddress, parseCSV, csvCell, emailHTML, NewsletterError } from '../../src/lib/newsletter/model'
import { token, verifyToken } from '../../src/lib/newsletter/tokens'

describe('newsletter inputs and templates', () => {
  it('normalizes emails and rejects header injection', () => {
    expect(emailAddress(' Person@Example.com ')).toBe('person@example.com')
    expect(() => emailAddress('person@example.com\r\nBcc: other@example.com')).toThrow(NewsletterError)
  })
  it('keeps the November proposal unsendable until dates and terms are confirmed', () => {
    expect(() => readyToSend(campaignInput(defaultCampaign))).toThrow()
    expect(() => readyToSend(campaignInput({ ...defaultCampaign, startDate: '2026-11-01', endDate: '2026-11-30', terms: 'Agreed terms' }))).not.toThrow()
  })
  it('rejects reversed, impossible and malformed dates and unsafe URLs', () => {
    for (const changes of [{ startDate: '2026-13-01' }, { startDate: '2026-02-30' }, { startDate: '2026-11-30', endDate: '2026-11-01' }, { url: 'javascript:alert(1)' }, { url: 'https://user:password@example.com' }]) expect(() => campaignInput({ ...defaultCampaign, ...changes })).toThrow(NewsletterError)
  })
  it('escapes every inserted field rather than trusting campaign HTML', () => {
    const html = emailHTML({ ...defaultCampaign, heading: '<script>alert(1)</script>', body: '<img src=x onerror=alert(1)>', terms: '" & <' }, 'https://somiklinikken.no/nyhetsbrev')
    expect(html).not.toContain('<script>'); expect(html).not.toContain('<img src=x'); expect(html).toContain('&lt;script&gt;')
  })
  it('parses CSV with delimiters, quotes and embedded line breaks', () => {
    const rows = parseCSV('\uFEFFemail;firstName;evidence\r\na@example.com;"Anne; Marie";"Yes\nconfirmed"\r\n')
    expect(rows).toEqual([{ email: 'a@example.com', firstname: 'Anne; Marie', evidence: 'Yes\nconfirmed' }])
    expect(() => parseCSV('name\nAnne')).toThrow(); expect(() => parseCSV('email\n"x')).toThrow()
  })
  it('neutralizes exported spreadsheet formulas', () => {
    expect(csvCell('=WEBSERVICE("https://example.com")')).toBe('"\'=WEBSERVICE(""https://example.com"")"')
    expect(csvCell('Anne')).toBe('"Anne"')
  })
})
describe('signed subscription tokens', () => {
  const secret = 'test-key-with-at-least-thirty-two-characters'
  it('is tied to purpose, subscriber and subscription version', () => {
    const value = token(secret, 'id123', 'confirm', 'version123', Date.now() + 10000)
    expect(verifyToken(secret, value, 'confirm')).toEqual({ id: 'id123', version: 'version123' })
    expect(() => verifyToken(secret, value, 'unsubscribe')).toThrow()
    expect(() => verifyToken(secret, value + 'x', 'confirm')).toThrow()
    expect(() => verifyToken(secret + 'x', value, 'confirm')).toThrow()
  })
  it('rejects expired links and missing production secrets', () => {
    expect(() => verifyToken(secret, token(secret, 'id', 'confirm', 'v', Date.now() - 1000), 'confirm')).toThrow()
    expect(() => token('', 'id', 'confirm', 'v')).toThrow()
  })
})
