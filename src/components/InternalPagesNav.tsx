import React from 'react'

const pages: { href: string; label: string }[] = [
  { href: '/seo', label: 'SEO-status' },
  { href: '/kampanje', label: 'Kampanjeplan' },
  { href: '/branding', label: 'Merkevare' },
]

const styles = `
.internal-nav {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px;
}
.internal-nav a {
  font-size: 13px; font-weight: 600; text-decoration: none;
  padding: 7px 16px; border-radius: 999px;
  border: 1px solid rgba(43,35,32,0.14);
  color: #6b5f59;
  background: #fdfaf7;
}
.internal-nav a:hover { border-color: #7a3a4a; color: #7a3a4a; }
.internal-nav a[data-current="true"] {
  background: #7a3a4a; border-color: #7a3a4a; color: #fff;
}
`

// Delt mellom /seo, /kampanje og /branding — kun disse tre interne sidene, ikke
// den offentlige hovednavigasjonen. Serverkomponent (ingen "use client"): hvilken
// side som er aktiv sendes inn som prop i stedet for å lese pathname i nettleseren.
export default function InternalPagesNav({ current }: { current: 'seo' | 'kampanje' | 'branding' }) {
  return (
    <nav className="internal-nav" aria-label="Interne sider">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {pages.map((p) => (
        <a key={p.href} href={p.href} data-current={p.href === `/${current}`}>
          {p.label}
        </a>
      ))}
    </nav>
  )
}
