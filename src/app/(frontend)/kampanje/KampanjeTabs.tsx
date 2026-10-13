'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/kampanje', label: 'Kampanjeplan' },
  { href: '/kampanje/nyhetsbrev', label: 'Nyhetsbrev' },
]

export default function KampanjeTabs() {
  const path = usePathname()
  return (
    <nav aria-label="Kampanje" className="kmp-tabs">
      <style>{`
.kmp-tabs{display:flex;gap:8px;max-width:860px;margin:0 auto;padding:16px 24px 0;font-family:-apple-system,"Segoe UI",system-ui,sans-serif}
.kmp-tabs a{padding:8px 18px;border-radius:999px;border:1px solid #e4d5c9;color:#6b5f59;text-decoration:none;font-size:14px;font-weight:600;background:#fdfaf7}
.kmp-tabs a[aria-current=page]{background:#7a3a4a;border-color:#7a3a4a;color:#fff}
@media (prefers-color-scheme:dark){.kmp-tabs a{background:#201a17;border-color:#3a2f29;color:#c9bcb2}.kmp-tabs a[aria-current=page]{background:#a8425f;border-color:#a8425f;color:#fff}}
.kmp-tabs{background:var(--kmp-bg,transparent)}
`}</style>
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} aria-current={path === t.href ? 'page' : undefined}>{t.label}</Link>
      ))}
    </nav>
  )
}
