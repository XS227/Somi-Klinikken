'use client'
import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Signup, type SignupSettings } from './Signup'
import './newsletter.css'

export default function PublicNewsletter() {
  const path = usePathname(), dialog = useRef<HTMLDialogElement>(null)
  const [settings, setSettings] = useState<SignupSettings | null>(null)
  const excluded = /^\/(admin|api|kampanje|seo|branding|nyhetsbrev)(\/|$)/.test(path)
  useEffect(() => {
    if (excluded) return
    let gone = false
    fetch('/api/nyhetsbrev/settings', { cache: 'no-store' }).then(r => r.json()).then(data => { if (!gone && data.enabled === true) setSettings(data) }).catch(() => {})
    return () => { gone = true }
  }, [excluded])
  useEffect(() => {
    if (!settings?.enabled || excluded) return
    let dismissed = false
    try { dismissed = localStorage.getItem('somi-newsletter-subscribed') === '1' || Date.now() - Number(localStorage.getItem('somi-newsletter-dismissed') || 0) < 7 * 86400000 } catch { /* optional storage */ }
    if (dismissed || settings.trigger === 'manual') return
    let shown = false
    const open = () => { if (!shown && dialog.current && !dialog.current.open) { shown = true; dialog.current.showModal() } }
    const scroll = () => { const available = document.documentElement.scrollHeight - window.innerHeight; if (available > 0 && window.scrollY / available >= .5) open() }
    const timeout = settings.trigger === 'delay' ? setTimeout(open, settings.delaySeconds * 1000) : undefined
    if (settings.trigger === 'scroll') window.addEventListener('scroll', scroll, { passive: true })
    return () => { clearTimeout(timeout); window.removeEventListener('scroll', scroll) }
  }, [settings, excluded])
  function dismissed() { try { localStorage.setItem('somi-newsletter-dismissed', String(Date.now())) } catch { /* optional storage */ } }
  if (!settings?.enabled || excluded) return null
  return <div className="nl-public"><button className="nl-open" onClick={() => dialog.current?.showModal()}>Nyhetsbrev</button><dialog ref={dialog} className="nl-dialog" onClose={dismissed} aria-label="Meld deg på Somis nyhetsbrev"><button className="nl-close" aria-label="Lukk" onClick={() => dialog.current?.close()}>×</button><Signup settings={settings} /></dialog></div>
}
