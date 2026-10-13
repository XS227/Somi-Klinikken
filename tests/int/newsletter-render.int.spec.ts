import { describe, expect, it } from 'vitest'
import { bodyToHtml, renderEmail } from '@/lib/newsletter/render'

const sender = { name: 'SOMI Klinikken', address: 'Langgata 31, 4306 Sandnes' }

describe('newsletter render', () => {
  it('escapes HTML and blocks javascript: urls', () => {
    const h = bodyToHtml('<script>alert(1)</script> [x](javascript:alert(1))')
    expect(h).not.toContain('<script>')
    expect(h).toContain('href="#"')
  })
  it('renders headings, lists, bold, buttons', () => {
    const h = bodyToHtml('# Hei\n\n- a\n- b\n\n**fet** tekst\n\n[[knapp: Book | https://somiklinikken.no/booking]]')
    expect(h).toContain('<h2')
    expect(h.match(/<li/g)).toHaveLength(2)
    expect(h).toContain('<strong>fet</strong>')
    expect(h).toContain('href="https://somiklinikken.no/booking"')
  })
  it('always includes unsubscribe link and sender identity', () => {
    const r = renderEmail({ subject: 'S', body: 'x', unsubscribeUrl: 'https://x/u?t=1', sender })
    expect(r.html).toContain('https://x/u?t=1')
    expect(r.html).toContain('Langgata 31')
    expect(r.text).toContain('Meld deg av: https://x/u?t=1')
  })
})
