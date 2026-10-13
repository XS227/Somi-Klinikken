import { createHmac, timingSafeEqual } from 'node:crypto'
import { NewsletterError } from './model'

export function token(secret: string, id: string, purpose: 'confirm' | 'unsubscribe', version: string, expires = 0): string {
  if (secret.length < 32) throw new NewsletterError('Nyhetsbrevets sikkerhetsnøkkel er ikke konfigurert.', 503)
  const body = Buffer.from(JSON.stringify({ id, purpose, version, expires })).toString('base64url')
  return `${body}.${createHmac('sha256', secret).update(body).digest('base64url')}`
}
export function verifyToken(secret: string, input: string, purpose: 'confirm' | 'unsubscribe'): { id: string; version: string } {
  try {
    if (secret.length < 32 || input.length > 1200) throw Error()
    const parts = input.split('.'); if (parts.length !== 2) throw Error()
    const [body, signature] = parts
    const expected = createHmac('sha256', secret).update(body).digest()
    const actual = Buffer.from(signature, 'base64url')
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw Error()
    const data = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (data.purpose !== purpose || typeof data.id !== 'string' || typeof data.version !== 'string' || typeof data.expires !== 'number' || (data.expires && data.expires < Date.now())) throw Error()
    return { id: data.id, version: data.version }
  } catch { throw new NewsletterError('Lenken er ugyldig eller har utløpt.') }
}
