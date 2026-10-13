import React from 'react'
import type { InternalLink } from '@/lib/internalLinks'

export function InternalLinkList({ links }: { links: InternalLink[] }) {
  if (links.length === 0) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          style={{
            display: 'grid', gap: 6, padding: '18px 20px', borderRadius: 16,
            background: '#fff', border: '1px solid rgba(56,56,56,0.08)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.04)', textDecoration: 'none', color: 'inherit',
          }}
        >
          <strong style={{ fontFamily: 'Georgia,serif', fontSize: 16, lineHeight: 1.3 }}>{l.anchor}</strong>
          <span style={{ fontSize: 13, color: 'rgba(56,56,56,0.65)', lineHeight: 1.5 }}>{l.desc}</span>
          <span style={{ fontSize: 13, color: '#6B7B8D', fontWeight: 600 }}>Les mer →</span>
        </a>
      ))}
    </div>
  )
}
