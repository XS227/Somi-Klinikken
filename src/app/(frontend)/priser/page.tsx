'use client'

import React, { useEffect, useRef, useState } from 'react'

const BOOKING = '/booking'

interface Item {
  id: string
  name: string
  short?: string
  duration?: string
  price?: string
  tags?: string[]
}

interface Category {
  id: string
  title: string
  desc?: string
  items: Item[]
}

interface TreatmentsData {
  categories: Category[]
}

function norm(s: string) {
  return (s || '').toLowerCase().trim()
}

export default function PriserPage() {
  const [data, setData] = useState<TreatmentsData | null>(null)
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({})
  const year = new Date().getFullYear()

  useEffect(() => {
    fetch('/data/treatments.json', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: TreatmentsData) => {
        setData(d)
        // open all by default
        const all: Record<string, boolean> = {}
        d.categories.forEach((c) => { all[c.id] = false })
        setOpenCats(all)
      })
      .catch(() => setData({ categories: [] }))
  }, [])

  const filtered = data
    ? data.categories
        .map((c) => {
          const inCat = cat === 'all' || cat === c.id
          const items = c.items.filter((it) => {
            if (!inCat) return false
            if (!query) return true
            const hay = norm(`${it.name} ${it.short || ''} ${(it.tags || []).join(' ')} ${it.price || ''} ${it.duration || ''}`)
            return hay.includes(norm(query))
          })
          return { ...c, items }
        })
        .filter((c) => c.items.length > 0)
    : []

  const totalRows = filtered.reduce((s, c) => s + c.items.length, 0)
  const isFiltering = query !== '' || cat !== 'all'

  function toggleCat(id: string) {
    setOpenCats((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>

      <main style={{ paddingTop: '14px', paddingBottom: 42 }}>
        <div className="container">

          {/* Header */}
          <header className="section" style={{ paddingBottom: 0 }}>
            <div className="kicker">Priser</div>
            <h1 className="h1" style={{ marginTop: 8 }}>Ryddig oversikt over priser</h1>
            <p className="muted" style={{ marginTop: 10, maxWidth: '74ch' }}>
              Bruk søk eller kategori for rask oversikt over pris og varighet.
            </p>

            {/* Category jump chips */}
            {data && (
              <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }} aria-label="Hopp til kategori">
                {data.categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => { setCat(c.id); setOpenCats((p) => ({ ...p, [c.id]: true })) }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      border: '1px solid rgba(56,56,56,0.12)',
                      background: cat === c.id ? 'rgba(56,56,56,0.08)' : 'rgba(255,255,255,0.72)',
                      borderRadius: 999, padding: '5px 12px',
                      color: 'rgba(56,56,56,.86)', fontSize: 13,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {c.title}
                  </button>
                ))}
                {cat !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setCat('all')}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      border: '1px solid rgba(56,56,56,0.18)', borderRadius: 999,
                      padding: '5px 12px', background: 'transparent',
                      color: 'rgba(56,56,56,.7)', fontSize: 13,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    ✕ Vis alle
                  </button>
                )}
              </nav>
            )}
          </header>

          {/* Sticky toolbar */}
          <div style={{
            position: 'sticky', top: 'calc(var(--header-h,80px) + 10px)', zIndex: 20,
            backdropFilter: 'blur(10px)', background: 'rgba(248,248,248,0.88)',
            border: '1px solid rgba(56,56,56,0.12)', borderRadius: 12,
            boxShadow: '0 12px 30px rgba(0,0,0,0.06)', padding: '10px 12px',
            marginTop: 12, display: 'grid',
            gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,0.8fr) auto',
            gap: 8, alignItems: 'center',
          }}>
            <input
              className="field"
              type="search"
              placeholder="Søk etter behandling…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              style={{ borderRadius: 10 }}
            />
            <select
              className="field"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              aria-label="Velg kategori"
              style={{ borderRadius: 10 }}
            >
              <option value="all">Alle kategorier</option>
              {data?.categories.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <a className="btn btn--primary" href={BOOKING} style={{ whiteSpace: 'nowrap' }}>
              Book time
            </a>
          </div>

          {isFiltering && (
            <p style={{ marginTop: 8, color: 'rgba(56,56,56,.68)', fontSize: 14 }}>
              Viser {totalRows} behandling{totalRows === 1 ? '' : 'er'} i {filtered.length} kategori{filtered.length === 1 ? '' : 'er'}.
            </p>
          )}

          {/* Category cards */}
          <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
            {!data && (
              <div className="card" style={{ padding: 20, color: 'rgba(56,56,56,.6)' }}>Laster priser…</div>
            )}
            {data && filtered.length === 0 && (
              <div className="card" style={{ padding: 16 }}>Ingen treff. Prøv et annet søk.</div>
            )}
            {filtered.map((c) => (
              <div key={c.id} className="price-card" id={`k-${c.id}`}>
                {/* Summary row */}
                <button
                  type="button"
                  onClick={() => toggleCat(c.id)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '12px 14px', display: 'flex', alignItems: 'baseline',
                    justifyContent: 'space-between', gap: 10, fontFamily: 'inherit', textAlign: 'left',
                  }}
                  aria-expanded={openCats[c.id] ?? false}
                >
                  <div>
                    <div className="kicker">Kategori</div>
                    <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 19, lineHeight: 1.1, margin: '4px 0 0' }}>{c.title}</h2>
                    {c.desc && <p style={{ margin: '4px 0 0', color: 'rgba(56,56,56,.68)', lineHeight: 1.45, fontSize: 14, maxWidth: '80ch' }}>{c.desc}</p>}
                  </div>
                  <span style={{ color: 'rgba(56,56,56,.55)', fontSize: 13, whiteSpace: 'nowrap' }}>
                    {openCats[c.id] ? 'Lukk ▲' : 'Åpne ▼'}
                  </span>
                </button>

                {/* Item rows */}
                {openCats[c.id] && (
                  <div style={{ borderTop: '1px solid rgba(56,56,56,0.10)', padding: '6px 6px 8px', display: 'grid', gap: 5 }}>
                    {c.items.map((it) => (
                      <div key={it.id} className="price-row">
                        <div>
                          <div className="price-name">{it.name}</div>
                          {it.short && <div style={{ fontSize: 12, color: 'rgba(56,56,56,.6)', marginTop: 2 }}>{it.short}</div>}
                        </div>
                        <div className="price-time">{it.duration || '—'}</div>
                        <div className="price-amount">{it.price || ''}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <p style={{ marginTop: 14, color: 'rgba(56,56,56,.68)', lineHeight: 1.65, fontSize: 14 }}>
            Tips: Bruk søkefeltet for å finne behandling på sekunder. For detaljer om forberedelser og etterbehandling, gå til{' '}
            <a href="/behandlinger" style={{ textDecoration: 'underline' }}>Behandlinger</a>.
          </p>
        </div>
      </main>

    </>
  )
}
