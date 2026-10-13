'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { renderEmail, type Template } from '@/lib/newsletter/render'

type Campaign = {
  id: string; title: string; subject: string; preheader?: string; body?: string; template?: Template; segment?: string
  status: string; scheduledAt?: string; approvedBy?: string; sentAt?: string; recipientCount?: number
  delivered?: number; queued?: number; failedCount?: number
}
type Sub = { id: string; email: string; name?: string; status: string; segments?: string[]; consentBasis: string; consentAt: string; consentSource: string }
type Status = { smtpConfigured: boolean; sendingEnabled: boolean; testRecipients: string[]; ratePerMinute: number; counts: Record<string, number> }

const CSS = `
.nb{max-width:960px;margin:0 auto;padding:24px 24px 80px;font-family:-apple-system,"Segoe UI",system-ui,sans-serif;color:#2b2320;line-height:1.5}
.nb *{box-sizing:border-box;min-width:0}
.nb h1{font-family:Georgia,serif;font-weight:400;font-size:28px;margin:8px 0 4px}
.nb .card{background:#fdfaf7;border:1px solid #e4d5c9;border-radius:14px;padding:18px;margin:14px 0}
.nb .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.nb .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:760px){.nb .grid{grid-template-columns:1fr}.nb{padding:16px 16px 80px}}
.nb label{display:block;font-size:12.5px;font-weight:600;margin:10px 0 4px;color:#6b5f59}
.nb input,.nb select,.nb textarea{width:100%;padding:9px 11px;border:1px solid #d9c8ba;border-radius:8px;font:inherit;background:#fff;color:#2b2320}
.nb textarea{min-height:240px;font-family:ui-monospace,Menlo,monospace;font-size:13px}
.nb button{padding:8px 16px;border-radius:999px;border:1px solid #7a3a4a;background:#fff;color:#7a3a4a;font-weight:600;cursor:pointer;font-size:14px}
.nb button.primary{background:#7a3a4a;color:#fff}
.nb button.sm{padding:4px 10px;font-size:12px}
.nb button:disabled{opacity:.5;cursor:not-allowed}
.nb .tabs{display:flex;gap:6px;margin:12px 0;flex-wrap:wrap}
.nb .tabs button.on{background:#7a3a4a;color:#fff}
.nb .pill{display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;padding:2px 9px;border-radius:999px;background:#f1e6de;color:#7a3a4a}
.nb .pill.ok{background:#dff0e0;color:#2f6b34}.nb .pill.warn{background:#fbe6d0;color:#9a5a10}
.nb .msg{padding:10px 14px;border-radius:10px;background:#f1e6de;margin:10px 0;font-size:14px}
.nb .msg.err{background:#fbe0e0;color:#8a1f1f}
.nb table{width:100%;border-collapse:collapse;font-size:13.5px}
.nb td,.nb th{padding:8px 6px;border-bottom:1px solid #e4d5c9;text-align:left;vertical-align:top;word-break:break-word}
.nb iframe{width:100%;height:520px;border:1px solid #e4d5c9;border-radius:10px;background:#fff}
.nb .scroll{overflow-x:auto}
@media (prefers-color-scheme:dark){.nb{color:#f5efe9}.nb .card{background:#201a17;border-color:#3a2f29}.nb label{color:#c9bcb2}.nb input,.nb select,.nb textarea{background:#16120f;color:#f5efe9;border-color:#3a2f29}.nb button{background:#16120f;color:#eecfd4;border-color:#a8425f}.nb button.primary,.nb .tabs button.on{background:#a8425f;color:#fff}.nb td,.nb th{border-color:#3a2f29}.nb .msg{background:#291f1b}}
`

const TEMPLATES: { v: Template; l: string }[] = [{ v: 'somi', l: 'SOMI standard' }, { v: 'offer', l: 'Tilbud/kampanje' }, { v: 'plain', l: 'Enkel tekst' }]
const STARTER = `# Hei!

Skriv hovedbudskapet her. Bruk **fet tekst** og [lenker](https://somiklinikken.no/behandlinger).

- Punkt én
- Punkt to

[[knapp: Book time | https://somiklinikken.no/booking]]`

async function api<T = any>(url: string, method = 'GET', body?: unknown): Promise<T> {
  const r = await fetch(url, { method, headers: body ? { 'content-type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined, credentials: 'same-origin' })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error || `Feil ${r.status}`)
  return j
}

export default function NewsletterDashboard() {
  const [tab, setTab] = useState<'campaigns' | 'subs' | 'status'>('campaigns')
  const [status, setStatus] = useState<Status | null>(null)
  const [msg, setMsg] = useState<{ text: string; err?: boolean } | null>(null)
  const say = (text: string, err = false) => setMsg({ text, err })
  const loadStatus = useCallback(() => api<Status>('/api/newsletter/status').then(setStatus).catch((e) => say(e.message, true)), [])
  useEffect(() => { loadStatus() }, [loadStatus])

  return (
    <div className="nb">
      <style>{CSS}</style>
      <h1>Nyhetsbrev</h1>
      <p style={{ margin: 0, color: '#6b5f59' }}>Lag, forhåndsvis, test og planlegg nyhetsbrev. Ingenting sendes før en kampanje er eksplisitt godkjent.</p>
      <div className="tabs">
        {([['campaigns', 'Kampanjer'], ['subs', 'Abonnenter'], ['status', 'Status og regler']] as const).map(([k, l]) => (
          <button key={k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); setMsg(null) }}>{l}</button>
        ))}
      </div>
      {msg && <div className={`msg ${msg.err ? 'err' : ''}`} role="status">{msg.text}</div>}
      {tab === 'campaigns' && <Campaigns say={say} status={status} reload={loadStatus} />}
      {tab === 'subs' && <Subscribers say={say} reload={loadStatus} />}
      {tab === 'status' && <StatusPanel status={status} />}
    </div>
  )
}

function StatusPanel({ status }: { status: Status | null }) {
  if (!status) return <div className="card">Laster…</div>
  return (
    <div className="card">
      <p><span className={`pill ${status.smtpConfigured ? 'ok' : 'warn'}`}>{status.smtpConfigured ? 'SMTP konfigurert' : 'SMTP mangler'}</span>{' '}
        <span className={`pill ${status.sendingEnabled ? 'ok' : 'warn'}`}>{status.sendingEnabled ? 'Utsendelse aktiv' : 'Utsendelse av (sikker modus)'}</span></p>
      <p>Aktive abonnenter: <b>{status.counts.subscribed}</b> · Avmeldt: {status.counts.unsubscribed} · Blokkert: {status.counts.suppressed}</p>
      <p>Hastighetsgrense: {status.ratePerMinute} e-poster/minutt, maks 3 forsøk per mottaker.</p>
      <p>Godkjente testadresser: {status.testRecipients.length ? status.testRecipients.join(', ') : 'ingen satt'}</p>
      <h3>Regler</h3>
      <ul>
        <li>Kun mottakere med samtykke, eller eksisterende kunder (markedsføringsloven §15) med mulighet til å reservere seg, kan importeres.</li>
        <li>Hver e-post har avmeldingslenke og List-Unsubscribe-header. Avmeldte og blokkerte får aldri mer e-post, og kan ikke legges inn igjen via import.</li>
        <li>Utsendelse krever eksplisitt godkjenning per kampanje, og at serveren er satt opp for det.</li>
        <li>Bruk en transaksjons-/nyhetsbrevleverandør (SMTP-relay) for store utsendelser, ikke en vanlig postboks.</li>
      </ul>
    </div>
  )
}

function Campaigns({ say, status, reload }: { say: (t: string, e?: boolean) => void; status: Status | null; reload: () => void }) {
  const [list, setList] = useState<Campaign[]>([])
  const [cur, setCur] = useState<Campaign | null>(null)
  const [busy, setBusy] = useState(false)
  const load = useCallback(() => api<{ docs: Campaign[] }>('/api/newsletter/campaigns').then((r) => setList(r.docs)).catch((e) => say(e.message, true)), [say])
  useEffect(() => { load() }, [load])

  const wrap = async (f: () => Promise<void>) => { setBusy(true); try { await f() } catch (e) { say((e as Error).message, true) } finally { setBusy(false) } }
  const create = () => wrap(async () => { const r = await api<{ doc: Campaign }>('/api/newsletter/campaigns', 'POST', { title: 'Nytt nyhetsbrev', subject: 'Nytt fra SOMI Klinikken', body: STARTER }); setCur(r.doc); load() })

  if (cur) return <Editor key={cur.id} c={cur} status={status} say={say} busy={busy} wrap={wrap} onClose={() => { setCur(null); load(); reload() }} />
  return (
    <>
      <div className="row"><button className="primary" onClick={create} disabled={busy}>+ Ny kampanje</button></div>
      <div className="card scroll">
        {list.length === 0 ? <p>Ingen kampanjer ennå. Opprett den første.</p> : (
          <table><thead><tr><th>Tittel</th><th>Status</th><th>Tidspunkt</th><th>Mottakere</th><th></th></tr></thead><tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <td><b>{c.title}</b><br /><span style={{ color: '#6b5f59' }}>{c.subject}</span></td>
                <td><span className="pill">{c.status}</span></td>
                <td>{c.sentAt ? `Sendt ${new Date(c.sentAt).toLocaleString('nb-NO')}` : c.scheduledAt ? new Date(c.scheduledAt).toLocaleString('nb-NO') : '–'}</td>
                <td>{c.recipientCount ? `${c.delivered ?? 0} sendt · ${c.queued ?? 0} i kø · ${c.failedCount ?? 0} feilet` : '–'}</td>
                <td><button className="sm" onClick={() => setCur(c)}>{c.status === 'draft' ? 'Rediger' : 'Åpne'}</button>{' '}
                  {c.status !== 'sending' && c.status !== 'sent' && <button className="sm" onClick={() => confirm('Slette kampanjen?') && wrap(async () => { await api(`/api/newsletter/campaigns/${c.id}`, 'DELETE'); load() })}>Slett</button>}</td>
              </tr>))}
          </tbody></table>)}
      </div>
    </>
  )
}

function Editor({ c, status, say, busy, wrap, onClose }: { c: Campaign; status: Status | null; say: (t: string, e?: boolean) => void; busy: boolean; wrap: (f: () => Promise<void>) => void; onClose: () => void }) {
  const [f, setF] = useState<Campaign>(c)
  const [testTo, setTestTo] = useState(status?.testRecipients[0] || '')
  const [when, setWhen] = useState('')
  const [approved, setApproved] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const locked = f.status !== 'draft'
  const set = (k: keyof Campaign, v: string) => setF((p) => ({ ...p, [k]: v }))

  const preview = useMemo(() => renderEmail({ subject: f.subject, preheader: f.preheader, body: f.body || '', template: f.template || 'somi',
    unsubscribeUrl: '#avmelding', sender: { name: 'SOMI Klinikken', address: 'Langgata 31, 4306 Sandnes' } }).html, [f])

  const save = async () => { const r = await api<{ doc: Campaign }>(`/api/newsletter/campaigns/${f.id}`, 'PATCH', f); setF((p) => ({ ...p, ...r.doc })); say('Lagret.') }
  const act = (body: object) => api<{ doc?: Campaign; warning?: string; recipients?: number }>(`/api/newsletter/campaigns/${f.id}/action`, 'POST', body)
  useEffect(() => { act({ action: 'count' }).then((r) => setCount(r.recipients ?? null)).catch(() => {}) /* eslint-disable-next-line */ }, [f.segment])
  const insert = (s: string) => set('body', (f.body || '') + '\n\n' + s)

  return (
    <div>
      <div className="row"><button onClick={onClose}>← Tilbake</button><span className="pill">{f.status}</span></div>
      <div className="grid">
        <div className="card">
          <label>Intern tittel</label><input disabled={locked} value={f.title} onChange={(e) => set('title', e.target.value)} />
          <label>Emnelinje</label><input disabled={locked} value={f.subject} onChange={(e) => set('subject', e.target.value)} />
          <label>Preheader</label><input disabled={locked} value={f.preheader || ''} onChange={(e) => set('preheader', e.target.value)} />
          <div className="row">
            <div style={{ flex: 1 }}><label>Mal</label><select disabled={locked} value={f.template || 'somi'} onChange={(e) => set('template', e.target.value)}>{TEMPLATES.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}</select></div>
            <div style={{ flex: 1 }}><label>Segment (tom = alle)</label><input disabled={locked} value={f.segment || ''} onChange={(e) => set('segment', e.target.value)} placeholder="f.eks. botox" /></div>
          </div>
          <label>Innhold</label>
          {!locked && <div className="row" style={{ marginBottom: 6 }}>
            <button className="sm" onClick={() => insert('# Overskrift')}>Overskrift</button>
            <button className="sm" onClick={() => insert('- Punkt én\n- Punkt to')}>Liste</button>
            <button className="sm" onClick={() => insert('[[knapp: Book time | https://somiklinikken.no/booking]]')}>Knapp</button>
            <button className="sm" onClick={() => insert('![Beskrivelse](https://somiklinikken.no/img/...)')}>Bilde</button>
          </div>}
          <textarea disabled={locked} value={f.body || ''} onChange={(e) => set('body', e.target.value)} />
          {!locked && <div className="row" style={{ marginTop: 10 }}><button className="primary" disabled={busy} onClick={() => wrap(save)}>Lagre kladd</button></div>}
        </div>
        <div>
          <div className="card"><b>Forhåndsvisning</b><iframe title="Forhåndsvisning" sandbox="" srcDoc={preview} /></div>
          <div className="card">
            <b>Testmail</b>
            <div className="row"><input style={{ flex: 1 }} type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="godkjent@testadresse.no" />
              <button disabled={busy || !testTo} onClick={() => wrap(async () => { await save().catch(() => {}); await act({ action: 'test', to: testTo }); say(`Testmail sendt til ${testTo}.`) })}>Send test</button></div>
            <small>Kun godkjente testadresser: {status?.testRecipients.join(', ') || 'ingen satt – testsending er av'}</small>
          </div>
          <div className="card">
            <b>Planlegg og send</b>
            <p style={{ margin: '6px 0' }}>Mottakere nå: <b>{count ?? '…'}</b> aktive abonnenter{f.segment ? ` i «${f.segment}»` : ''}.</p>
            {f.status === 'draft' && <>
              <label>Tidspunkt (tomt = så snart som mulig)</label><input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontWeight: 400 }}><input type="checkbox" style={{ width: 'auto', marginTop: 4 }} checked={approved} onChange={(e) => setApproved(e.target.checked)} />
                Katarina/eier har godkjent innhold og utsendelse til {count ?? '…'} mottakere.</label>
              <div className="row" style={{ marginTop: 10 }}><button className="primary" disabled={busy || !approved || !count}
                onClick={() => wrap(async () => { await save(); const r = await act({ action: 'schedule', approved: true, scheduledAt: when ? new Date(when).toISOString() : undefined }); say(r.warning || 'Kampanjen er godkjent og planlagt.', Boolean(r.warning)); onClose() })}>Godkjenn og planlegg</button></div></>}
            {f.status === 'scheduled' && <><p>Godkjent av {f.approvedBy}. Planlagt {f.scheduledAt && new Date(f.scheduledAt).toLocaleString('nb-NO')}.</p>
              <button disabled={busy} onClick={() => wrap(async () => { await act({ action: 'unschedule' }); say('Planlegging avbrutt – tilbake til kladd.'); onClose() })}>Avbryt planlegging</button></>}
            {f.status === 'sending' && <button disabled={busy} onClick={() => confirm('Stoppe utsendelsen?') && wrap(async () => { await act({ action: 'cancel' }); onClose() })}>Stopp utsendelse</button>}
            {(f.status === 'sent' || f.status === 'cancelled') && <p>{f.delivered ?? 0} sendt · {f.failedCount ?? 0} feilet.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

function Subscribers({ say, reload }: { say: (t: string, e?: boolean) => void; reload: () => void }) {
  const [subs, setSubs] = useState<Sub[]>([])
  const [q, setQ] = useState('')
  const [csv, setCsv] = useState('')
  const [basis, setBasis] = useState('consent')
  const [source, setSource] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [seg, setSeg] = useState('')
  const load = useCallback(() => api<{ docs: Sub[] }>(`/api/newsletter/subscribers?q=${encodeURIComponent(q)}`).then((r) => setSubs(r.docs)).catch((e) => say(e.message, true)), [q, say])
  useEffect(() => { load() }, [load])

  const doImport = async () => {
    const rows = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).map((l) => {
      const [email, name] = l.split(/[;,\t]/).map((x) => x.trim().replace(/^"|"$/g, ''))
      return { email, name, segments: seg ? seg.split(',').map((s) => s.trim()) : [] }
    }).filter((r) => r.email.toLowerCase() !== 'email' && r.email.toLowerCase() !== 'e-post')
    try {
      const r = await api<{ added: number; skippedExisting: number; skippedSuppressed: number; invalid: string[] }>('/api/newsletter/subscribers', 'POST', { rows, consentBasis: basis, consentSource: source, consentConfirmed: confirmed })
      say(`Importert ${r.added}. Allerede abonnent: ${r.skippedExisting}. Avmeldt/blokkert (hoppet over): ${r.skippedSuppressed}. Ugyldige: ${r.invalid.length}.`)
      setCsv(''); load(); reload()
    } catch (e) { say((e as Error).message, true) }
  }
  const patch = (id: string, body: object) => api(`/api/newsletter/subscribers/${id}`, 'PATCH', body).then(() => { load(); reload() }).catch((e) => say(e.message, true))

  return (
    <>
      <div className="card">
        <b>Importer abonnenter</b>
        <label>Én per linje: e-post, navn (valgfritt)</label>
        <textarea style={{ minHeight: 100 }} value={csv} onChange={(e) => setCsv(e.target.value)} placeholder="ola@example.no, Ola Nordmann" />
        <div className="grid">
          <div><label>Rettslig grunnlag</label><select value={basis} onChange={(e) => setBasis(e.target.value)}>
            <option value="consent">Aktivt samtykke</option><option value="existing-customer">Eksisterende kunde (§15, kunden kunne reservere seg)</option></select></div>
          <div><label>Kilde for samtykket</label><input value={source} onChange={(e) => setSource(e.target.value)} placeholder="f.eks. Påmeldingsskjema i resepsjon, jan 2026" /></div>
        </div>
        <label>Segmenter (kommaseparert, valgfritt)</label><input value={seg} onChange={(e) => setSeg(e.target.value)} />
        <label style={{ display: 'flex', gap: 8, fontWeight: 400 }}><input type="checkbox" style={{ width: 'auto' }} checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />Jeg bekrefter at personene har samtykket eller oppfyller kravene i §15, og at samtykket kan dokumenteres.</label>
        <div className="row" style={{ marginTop: 10 }}><button className="primary" disabled={!csv.trim() || !source.trim() || !confirmed} onClick={doImport}>Importer</button></div>
      </div>
      <div className="card scroll">
        <div className="row"><input style={{ maxWidth: 280 }} placeholder="Søk e-post/navn" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <table><thead><tr><th>E-post</th><th>Status</th><th>Segmenter</th><th>Samtykke</th><th></th></tr></thead><tbody>
          {subs.map((s) => (
            <tr key={s.id}><td>{s.email}<br /><small>{s.name}</small></td><td><span className={`pill ${s.status === 'subscribed' ? 'ok' : 'warn'}`}>{s.status}</span></td>
              <td>{(s.segments || []).join(', ')}</td><td><small>{s.consentBasis === 'consent' ? 'Samtykke' : '§15 kunde'} · {new Date(s.consentAt).toLocaleDateString('nb-NO')}<br />{s.consentSource}</small></td>
              <td>{s.status === 'subscribed' && <><button className="sm" onClick={() => patch(s.id, { status: 'suppressed', reason: 'Manuelt blokkert' })}>Blokker</button>{' '}
                <button className="sm" onClick={() => confirm('Slette helt (GDPR-sletting)?') && api(`/api/newsletter/subscribers/${s.id}`, 'DELETE').then(() => { load(); reload() }).catch((e) => say(e.message, true))}>Slett</button></>}</td></tr>))}
          {subs.length === 0 && <tr><td colSpan={5}>Ingen abonnenter.</td></tr>}
        </tbody></table>
      </div>
    </>
  )
}
