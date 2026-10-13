
export const CONSENT_TEXT = 'Jeg ønsker nyheter og tilbud fra SOMI Klinikken på e-post. Jeg kan melde meg av når som helst.'
export const CONSENT_VERSION = 'somi-newsletter-2026-10-13'
export const defaultSettings = {
  enabled: false,
  title: 'Litt mer SOMI i innboksen',
  intro: 'Meld deg på og få nyheter fra klinikken, utvalgte tilbud og inspirasjon til din neste behandling.',
  button: 'MELD MEG PÅ',
  trigger: 'delay' as 'delay' | 'scroll' | 'manual',
  delaySeconds: 15,
}
export const defaultCampaign = {
  name: 'November 2026 – laser',
  subject: 'November hos SOMI: 40 % på laserbehandlinger',
  preheader: 'Vi feirer fullførte laserkurs med et tilbud til deg.',
  heading: 'En god anledning til å bli kjent med laser.',
  offer: '−40 %',
  body: 'I november fullfører behandlerne våre laserkursene. I den forbindelse ønsker vi å gi deg 40 % rabatt på alle laserbehandlinger hos SOMI Klinikken.\n\nEr du usikker på hvilken behandling som passer for deg? Ta kontakt med oss for en individuell vurdering.',
  terms: '', startDate: '', endDate: '', cta: 'Se behandlinger og bestill time',
  url: 'https://somi.bestille.no/', scheduledAt: '',
}
export type CampaignInput = typeof defaultCampaign
export class NewsletterError extends Error {
  constructor(message: string, public status = 400) { super(message) }
}
export function clean(value: unknown, max = 200): string {
  if (typeof value !== 'string' || value.length > max) throw new NewsletterError('Ugyldig tekst eller for langt innhold.')
  return value.trim()
}
export function emailAddress(value: unknown): string {
  const email = clean(value, 254).toLowerCase()
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email)) throw new NewsletterError('Skriv inn en gyldig e-postadresse.')
  return email
}
export function webUrl(value: unknown): string {
  const input = clean(value, 600)
  try { const u = new URL(input); if (u.protocol === 'https:' && !u.username && !u.password) return u.href } catch { /* invalid URL */ }
  throw new NewsletterError('Lenken må være en gyldig HTTPS-adresse.')
}
export function campaignInput(raw: Record<string, unknown>): CampaignInput {
  const data = Object.fromEntries(Object.keys(defaultCampaign).map(key => [key, clean(raw[key] ?? '', key === 'body' ? 10000 : key === 'terms' ? 3000 : 600)])) as CampaignInput
  if (!data.name || !data.subject || !data.heading || !data.body || !data.cta) throw new NewsletterError('Fyll inn navn, emne, overskrift, tekst og knappetekst.')
  if (/[\r\n]/.test(data.subject)) throw new NewsletterError('Emnefeltet kan ikke inneholde linjeskift.')
  data.url = webUrl(data.url)
  for (const date of [data.startDate, data.endDate]) if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) throw new NewsletterError('Ugyldig kampanjedato.')
  if (data.startDate && data.endDate && data.endDate < data.startDate) throw new NewsletterError('Sluttdato må være etter startdato.')
  if (data.scheduledAt && !Number.isFinite(Date.parse(data.scheduledAt))) throw new NewsletterError('Ugyldig tidspunkt.')
  return data
}
export function readyToSend(data: CampaignInput): void {
  if (!data.startDate || !data.endDate || !data.terms) throw new NewsletterError('Bekreft kampanjeperiode og vilkår før utsending.')
  if (data.scheduledAt && Date.parse(data.scheduledAt) <= Date.now()) throw new NewsletterError('Planlagt tidspunkt må være i fremtiden.')
}
export function escapeHTML(value: string): string {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}
export function emailHTML(data: CampaignInput, unsubscribe: string): string {
  const e = escapeHTML
  return `<!doctype html><html lang="nb"><body style="margin:0;background:#f3f1ee;color:#383838;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">${e(data.preheader)}</div><table role="presentation" width="100%"><tr><td align="center"><table role="presentation" width="100%" style="max-width:600px;background:#fffdfa"><tr><td style="padding:32px;text-align:center;font-family:Georgia,serif;font-size:32px">SOMI<br><span style="font:11px Arial;letter-spacing:4px">KLINIKKEN</span></td></tr><tr><td style="padding:32px"><h1 style="font:32px Georgia,serif">${e(data.heading)}</h1><p style="font:52px Georgia,serif;color:#976565">${e(data.offer)}</p><p style="line-height:1.7">${e(data.body).replace(/\n/g, '<br>')}</p><p style="font-size:13px">Periode: ${e(data.startDate)} – ${e(data.endDate)}</p><p style="font-size:13px">${e(data.terms).replace(/\n/g, '<br>')}</p><p style="padding:15px 0"><a href="${e(webUrl(data.url))}" style="display:inline-block;background:#ddb3b3;color:#383838;padding:15px 24px;text-decoration:none">${e(data.cta)}</a></p></td></tr><tr><td style="padding:24px;text-align:center;background:#f3f1ee;font-size:12px">SOMI Klinikken · Langgata 31 · 4306 Sandnes<br>Du har meldt deg på nyheter og tilbud fra SOMI.<br><a href="${e(unsubscribe)}">Meld meg av</a> · <a href="https://somiklinikken.no/nyhetsbrev/personvern">Personvern</a></td></tr></table></td></tr></table></body></html>`
}
export function csvCell(value: unknown): string {
  let text = String(value ?? '')
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}
export function parseCSV(input: string): Record<string, string>[] {
  if (input.length > 50000) throw new NewsletterError('Importer høyst 50 kB om gangen.')
  const text = input.replace(/^\uFEFF/, '')
  const delimiter = text.split(/\r?\n/)[0].includes(';') ? ';' : ','
  const rows: string[][] = []; let row: string[] = [], field = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '"') { if (quoted && text[i + 1] === '"') { field += '"'; i++ } else quoted = !quoted }
    else if (c === delimiter && !quoted) { row.push(field); field = '' }
    else if (c === '\n' && !quoted) { row.push(field.replace(/\r$/, '')); if (row.some(Boolean)) rows.push(row); row = []; field = '' }
    else field += c
  }
  if (quoted) throw new NewsletterError('CSV-filen har uavsluttede anførselstegn.')
  row.push(field.replace(/\r$/, '')); if (row.some(Boolean)) rows.push(row)
  if (rows.length < 2 || rows.length > 201) throw new NewsletterError('CSV må ha overskrifter og 1–200 kontakter.')
  const headers = rows.shift()!.map(h => h.trim().toLowerCase())
  if (!headers.includes('email')) throw new NewsletterError('CSV må inneholde kolonnen email.')
  return rows.map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ''])))
}
