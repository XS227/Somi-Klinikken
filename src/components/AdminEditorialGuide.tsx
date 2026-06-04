import React from 'react'

export function AdminEditorialGuide() {
  return (
    <div style={{
      margin: '24px 0 0',
      padding: '20px 24px',
      borderRadius: 10,
      background: '#f8f7f5',
      border: '1px solid #e8e4de',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 14px', color: '#222' }}>
        📋 Hva kan jeg redigere selv?
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>

        <div style={{ padding: '12px 16px', borderRadius: 8, background: '#edf7ed', border: '1px solid #b7dfb7' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#2a7a2a', marginBottom: 6 }}>✅ Du kan redigere</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: '#333', lineHeight: 1.8 }}>
            <li><strong>Blogg</strong> – Innhold → Blogg-innlegg</li>
            <li><strong>Behandlinger</strong> – Innhold → Behandlinger</li>
            <li><strong>Forsidetekster</strong> – Nettstedsinnstillinger → Hjemside</li>
            <li><strong>Footer</strong> – Nettstedsinnstillinger → Bunntekst</li>
            <li><strong>Under arbeid</strong> – Nettstedsinnstillinger → Nettstedsinnstillinger</li>
            <li><strong>Mediebibliotek</strong> – Last opp bilder her</li>
          </ul>
        </div>

        <div style={{ padding: '12px 16px', borderRadius: 8, background: '#fef3f0', border: '1px solid #f5c6bb' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#c0392b', marginBottom: 6 }}>🔧 Redigeres via kode</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: '#333', lineHeight: 1.8 }}>
            <li><strong>Forsidens layout</strong> – Team, kategorier, hero-video</li>
            <li><strong>Team-siden</strong> (/team)</li>
            <li><strong>Om oss</strong> (/om)</li>
            <li><strong>Resultater</strong> (/resultater) – bilder + grid</li>
            <li><strong>Behandlinger-oversikt</strong> (/behandlinger)</li>
            <li><strong>Priser</strong> – /public/data/treatments.json</li>
          </ul>
        </div>

      </div>

      <div style={{ fontSize: 12, color: '#888', borderTop: '1px solid #e8e4de', paddingTop: 10 }}>
        For endringer i layout, bilder eller sider markert som &quot;redigeres via kode&quot; — kontakt{' '}
        <a href="mailto:post@setai.no" style={{ color: '#6B7B8D' }}>SETai (post@setai.no)</a>.
      </div>
    </div>
  )
}
