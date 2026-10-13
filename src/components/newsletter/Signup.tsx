'use client'
import React, { useState } from 'react'
import { CONSENT_TEXT, defaultSettings } from '@/lib/newsletter/model'

export type SignupSettings = typeof defaultSettings
export function Signup({ settings, preview = false }: { settings: SignupSettings; preview?: boolean }) {
  const [busy, setBusy] = useState(false), [message, setMessage] = useState('')
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget
    if (preview) { setMessage('Forhåndsvisning: ingen opplysninger lagres. I den aktive modulen sendes en bekreftelsesmail.'); form.reset(); return }
    const data = new FormData(form); setBusy(true); setMessage('')
    try {
      const res = await fetch('/api/nyhetsbrev/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: data.get('email'), firstName: data.get('firstName'), lastName: data.get('lastName'), consent: data.get('consent') === 'on', website: data.get('website') }) })
      const result = await res.json(); if (!res.ok) throw Error(result.error || 'Kunne ikke melde deg på.')
      setMessage(result.message); form.reset()
      try { localStorage.setItem('somi-newsletter-subscribed', '1') } catch { /* storage may be disabled */ }
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Prøv igjen senere.') } finally { setBusy(false) }
  }
  return <div className="nl-signup"><div className="nl-logo">SOMI<small>KLINIKKEN</small></div><h2>{settings.title}</h2><p>{settings.intro}</p>
    <form onSubmit={submit}><label>Fornavn<input name="firstName" autoComplete="given-name" maxLength={80} placeholder="Fornavn" /></label><label>Etternavn<input name="lastName" autoComplete="family-name" maxLength={80} placeholder="Etternavn" /></label><label>E-post<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="din@epost.no" /></label>
      <label className="nl-honeypot" aria-hidden="true">Nettside<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="nl-consent"><input name="consent" type="checkbox" required />{CONSENT_TEXT}</label><p className="nl-small">Les <a href="/nyhetsbrev/personvern">personverninformasjonen</a>.</p>
      <button className="nl-button" disabled={busy} type="submit">{busy ? 'Et øyeblikk …' : settings.button}</button><p className="nl-feedback" role="status">{message}</p>
    </form></div>
}
