// Pure rendering (no Node deps) — used both by the server mailer and the client-side live preview.

export type Template = 'somi' | 'offer' | 'plain'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const safeUrl = (u: string) => (/^(https?:\/\/|mailto:|\/)/i.test(u.trim()) ? esc(u.trim()) : '#')

function inline(raw: string): string {
  let s = esc(raw)
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt, url) =>
    `<img src="${safeUrl(url.replace(/&amp;/g, '&'))}" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:12px 0" />`)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, url) =>
    `<a href="${safeUrl(url.replace(/&amp;/g, '&'))}" style="color:#7a3a4a">${text}</a>`)
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  return s
}

export function bodyToHtml(body: string, accent = '#7a3a4a'): string {
  const blocks = body.replace(/\r\n/g, '\n').split(/\n{2,}/)
  const out: string[] = []
  for (const block of blocks) {
    const b = block.trim()
    if (!b) continue
    const btn = b.match(/^\[\[knapp:\s*(.+?)\s*\|\s*(\S+?)\s*\]\]$/i)
    if (btn) {
      out.push(`<p style="margin:20px 0"><a href="${safeUrl(btn[2])}" style="background:${accent};color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:999px;display:inline-block;font-weight:600">${esc(btn[1])}</a></p>`)
    } else if (/^#{1,3}\s/.test(b)) {
      out.push(`<h2 style="font-family:Georgia,serif;font-weight:400;font-size:22px;margin:24px 0 8px;color:#2b2320">${inline(b.replace(/^#{1,3}\s+/, ''))}</h2>`)
    } else if (b.split('\n').every((l) => /^[-*]\s+/.test(l))) {
      out.push(`<ul style="padding-left:20px;margin:12px 0">${b.split('\n').map((l) => `<li style="margin:4px 0">${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`)
    } else {
      out.push(`<p style="margin:12px 0">${inline(b).replace(/\n/g, '<br>')}</p>`)
    }
  }
  return out.join('\n')
}

export interface RenderInput {
  subject: string
  preheader?: string
  body: string
  template?: Template
  unsubscribeUrl: string
  sender: { name: string; address: string }
}

export function renderEmail(i: RenderInput): { html: string; text: string } {
  const t = i.template || 'somi'
  const accent = t === 'offer' ? '#a8425f' : '#7a3a4a'
  const bg = t === 'plain' ? '#ffffff' : '#f7f2ee'
  const content = bodyToHtml(i.body, accent)
  const header = t === 'plain' ? '' : `<tr><td style="padding:24px 32px;background:${t === 'offer' ? '#f1d9d9' : '#f1e6de'};text-align:center;font-family:Georgia,serif;font-size:22px;letter-spacing:.04em;color:#2b2320">SOMI Klinikken</td></tr>`
  const pre = i.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(i.preheader)}</div>` : ''
  const html = `<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(i.subject)}</title></head>
<body style="margin:0;background:${bg};font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#2b2320;line-height:1.55">${pre}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
${header}
<tr><td style="padding:24px 32px;font-size:16px">${content}</td></tr>
<tr><td style="padding:20px 32px;background:#faf6f2;font-size:12px;color:#6b5f59;text-align:center">
${esc(i.sender.name)} · ${esc(i.sender.address)}<br>
Du mottar denne e-posten fordi du har samtykket til markedsføring fra oss eller er kunde hos oss.<br>
<a href="${esc(i.unsubscribeUrl)}" style="color:#7a3a4a">Meld deg av nyhetsbrevet</a>
</td></tr></table></td></tr></table></body></html>`
  const text = [
    i.body.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[\[knapp:\s*(.+?)\s*\|\s*(\S+?)\s*\]\]/gi, '$1: $2')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1 ($2)').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/^#{1,3}\s+/gm, ''),
    '',
    '--',
    `${i.sender.name}, ${i.sender.address}`,
    `Meld deg av: ${i.unsubscribeUrl}`,
  ].join('\n')
  return { html, text }
}
