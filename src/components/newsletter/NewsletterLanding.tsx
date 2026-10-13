'use client'
import React, { useEffect, useState } from 'react'
import { Signup, type SignupSettings } from './Signup'
import './newsletter.css'
export default function NewsletterLanding() {
  const [params, setParams] = useState<{ action: string; token: string } | null>(null), [settings, setSettings] = useState<SignupSettings | null>(null)
  const [message, setMessage] = useState(''), [busy, setBusy] = useState(false), [done, setDone] = useState(false)
  useEffect(() => { const p = new URLSearchParams(location.search); setParams({ action: p.get('action') || '', token: p.get('token') || '' }); fetch('/api/nyhetsbrev/settings', { cache: 'no-store' }).then(r => r.json()).then(setSettings).catch(() => setMessage('Påmelding er ikke tilgjengelig akkurat nå.')) }, [])
  async function apply() {
    if (!params) return
    setBusy(true)
    try { const r = await fetch('/api/nyhetsbrev/token', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params) }); const data = await r.json(); if (!r.ok) throw Error(data.error); setMessage(data.message); setDone(true); history.replaceState(null, '', '/nyhetsbrev') } catch (e) { setMessage(e instanceof Error ? e.message : 'Prøv igjen.') } finally { setBusy(false) }
  }
  return <main className="nl-page">{params?.token && ['confirm', 'unsubscribe'].includes(params.action) ? <div className="nl-card"><div className="nl-logo">SOMI<small>KLINIKKEN</small></div><h1>{params.action === 'confirm' ? 'Bekreft påmeldingen din.' : 'Meld deg av nyhetsbrevet.'}</h1><p>{params.action === 'confirm' ? 'Trykk på knappen for å motta nyheter og tilbud fra SOMI Klinikken.' : 'Trykk på knappen for å stoppe nyheter og tilbud fra SOMI Klinikken.'}</p>{!done && <button className="nl-button" disabled={busy} onClick={apply}>{busy ? 'Et øyeblikk …' : params.action === 'confirm' ? 'Bekreft påmelding' : 'Meld meg av'}</button>}<p role="status">{message}</p><a href="/">Tilbake til SOMI</a></div> : settings?.enabled ? <Signup settings={settings} /> : <div className="nl-card"><h1>Nyhetsbrev fra SOMI.</h1><p>{message || 'Påmelding åpner snart.'}</p><a href="/">Tilbake til SOMI</a></div>}</main>
}
