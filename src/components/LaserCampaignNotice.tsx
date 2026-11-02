'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Kalenderdatoer i Norge (CET): 9. november 00:00 til 1. desember 00:00.
 * Behandlingsfristen (31. desember) omtales separat.
 */
const START = Date.parse('2026-11-08T23:00:00Z')
const END = Date.parse('2026-11-30T23:00:00Z')
const ELIGIBLE_PAGES = new Set([
  '/',
  '/behandlinger/laser-harfjerning',
  '/behandlinger/fjerning-permanent-makeup',
  '/behandlinger/laser-tattoo-removal',
])

export default function LaserCampaignNotice() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      setActive(now >= START && now < END)
    }
    update()
    // Kampanjen aktiveres / avsluttes også dersom siden blir stående åpen.
    const interval = window.setInterval(update, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  if (!active || !ELIGIBLE_PAGES.has(pathname)) return null

  return (
    <aside className="laser-campaign-notice" aria-label="Informasjon om laserpriser">
      <style>{`
        .laser-campaign-notice{background:#f2e9e4;border-bottom:1px solid #e4d5cb;color:#383838;padding:13px 22px}
        .laser-campaign-notice__inner{width:min(1120px,100%);margin:auto;display:flex;align-items:center;justify-content:center;gap:8px 20px;flex-wrap:wrap;text-align:center;font-size:14px;line-height:1.55}
        .laser-campaign-notice strong{font-weight:650}
        .laser-campaign-notice a{color:#6c3b49;text-decoration:underline;text-underline-offset:3px;font-weight:600}
        .laser-campaign-notice a:focus-visible{outline:2px solid #6c3b49;outline-offset:4px}
        @media(max-width:640px){.laser-campaign-notice{padding:12px 16px}.laser-campaign-notice__inner{font-size:13px}}
      `}</style>
      <div className="laser-campaign-notice__inner">
        <span><strong>November 2026:</strong> 40 % på enkeltbehandlinger innen laserhårfjerning, PMU- og tatoveringsfjerning.</span>
        <a href="/tilbud/laser">Se betingelser og behandlinger</a>
      </div>
    </aside>
  )
}
