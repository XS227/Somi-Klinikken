'use client'
import React, { useEffect, useState } from 'react'

type MediaFile = { name: string; path: string; size: number }

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediebibliotekPage() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('/api/admin-media')
      .then((r) => r.json())
      .then((data) => { setFiles(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(filter.toLowerCase()) ||
    f.path.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div style={{ fontFamily: 'system-ui,sans-serif', minHeight: '100vh', background: '#f8f7f6', color: '#383838' }}>
      {/* Header */}
      <div style={{ background: '#383838', color: '#fff', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="/admin" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 14 }}>← Admin</a>
        <h1 style={{ margin: 0, fontFamily: 'Georgia,serif', fontSize: 22, fontWeight: 400 }}>Mediebibliotek</h1>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
          {files.length} filer
        </span>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <input
          type="search"
          placeholder="Søk på filnavn…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%', maxWidth: 480, padding: '10px 16px',
            borderRadius: 999, border: '1px solid rgba(56,56,56,0.2)',
            background: '#fff', fontSize: 15, outline: 'none',
            marginBottom: 24,
          }}
        />

        {loading ? (
          <p style={{ color: 'rgba(56,56,56,0.6)' }}>Laster bilder…</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {filtered.map((f) => (
              <div
                key={f.path}
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#fff',
                  border: '1px solid rgba(56,56,56,0.09)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                }}
              >
                <a href={f.path} target="_blank" rel="noopener">
                  <img
                    src={f.path}
                    alt={f.name}
                    style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </a>
                <div style={{ padding: '10px 12px' }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, wordBreak: 'break-all', lineHeight: 1.4 }}>
                    {f.name}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(56,56,56,0.55)' }}>
                    {formatSize(f.size)}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(56,56,56,0.4)', wordBreak: 'break-all' }}>
                    {f.path}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p style={{ color: 'rgba(56,56,56,0.55)' }}>
            {filter ? 'Ingen treff på søket.' : 'Ingen bilder funnet i /public/img/.'}
          </p>
        )}
      </div>
    </div>
  )
}
