'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const BOOKING_URL = '/booking'

const results = [
  {
    src: '/img/resultater/pmu-permanent-makeup-resultat-somi-sandnes-1.webp',
    alt: 'PMU permanent makeup resultat – naturlige bryn hos SOMI Klinikken i Sandnes',
    w: 1000, h: 1000,
    label: 'Permanent Makeup',
    filter: 'permanent-makeup',
  },
  {
    src: '/img/resultater/microblading-foer-etter-resultat-somi-2.webp',
    alt: 'Microblading før og etter resultat – naturlige hårstreke-bryn hos SOMI Klinikken Sandnes',
    w: 1000, h: 1000,
    label: 'Microblading',
    filter: 'microblading',
  },
  {
    src: '/img/resultater/permanent-makeup-bryn-resultat-somi-3.webp',
    alt: 'Permanent makeup bryn resultat – presise og naturlige bryn hos SOMI Klinikken',
    w: 1000, h: 1000,
    label: 'Permanent Makeup',
    filter: 'permanent-makeup',
  },
  {
    src: '/img/resultater/microblading-naturlige-bryn-somi-sandnes-4.webp',
    alt: 'Microblading naturlige bryn – skreddersydd resultat hos SOMI Klinikken Sandnes',
    w: 1000, h: 1000,
    label: 'Microblading',
    filter: 'microblading',
  },
  {
    src: '/img/resultater/pmu-resultat-kvinner-somi-klinikken-5.webp',
    alt: 'PMU resultat kvinner – vakkert og naturlig permanent makeup hos SOMI Klinikken',
    w: 1000, h: 1000,
    label: 'Permanent Makeup',
    filter: 'permanent-makeup',
  },
  {
    src: '/img/resultater/behandlingsresultat-permanent-makeup-somi-6.webp',
    alt: 'Behandlingsresultat permanent makeup – profesjonelt resultat hos SOMI Klinikken i Sandnes',
    w: 1000, h: 1000,
    label: 'Permanent Makeup',
    filter: 'permanent-makeup',
  },
]

const filters = [
  { id: 'all', label: 'Alle' },
  { id: 'microblading', label: 'Microblading' },
  { id: 'permanent-makeup', label: 'Permanent Makeup' },
]

export function ResultaterGalleri() {
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? results : results.filter((r) => r.filter === active)

  return (
    <>
      <style>{`
        .res-card { transition: transform 200ms ease, box-shadow 200ms ease; }
        .res-card:hover { transform: scale(1.02); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
        .res-card img { transition: transform 300ms ease; }
        .res-card:hover img { transform: scale(1.05); }
      `}</style>

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            style={{
              padding: '8px 18px', borderRadius: 999, border: '1px solid',
              borderColor: active === f.id ? '#6B7B8D' : 'rgba(56,56,56,0.15)',
              background: active === f.id ? '#6B7B8D' : '#fff',
              color: active === f.id ? '#fff' : 'rgba(56,56,56,0.75)',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
              transition: 'background 160ms, color 160ms, border-color 160ms',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 4-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 14,
      }}
        className="res-grid"
      >
        <style>{`
          @media (max-width: 900px) { .res-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 500px) { .res-grid { grid-template-columns: 1fr !important; } }
        `}</style>
        {visible.map((r, i) => (
          <figure
            key={r.src}
            className="reveal res-card"
            style={{
              margin: 0, borderRadius: 14, overflow: 'hidden',
              border: '1px solid rgba(56,56,56,0.08)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              display: 'grid', alignContent: 'start',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <Image
                src={r.src}
                alt={r.alt}
                width={r.w}
                height={r.h}
                sizes="(max-width: 500px) 100vw, (max-width: 900px) 50vw, 25vw"
                priority={i < 4}
                style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
              />
            </div>
            <figcaption style={{
              padding: '8px 12px', fontSize: 12,
              color: 'rgba(56,56,56,0.62)', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              {r.label} · SOMI Klinikken Sandnes
            </figcaption>
          </figure>
        ))}
      </div>

      <div style={{
        marginTop: 48, padding: '32px 28px', borderRadius: 22,
        background: 'rgba(237,229,221,0.5)', border: '1px solid rgba(56,56,56,0.08)',
        display: 'grid', gap: 12, justifyItems: 'start',
      }}>
        <div className="kicker">Klar for din behandling?</div>
        <h2 className="h2" style={{ margin: 0 }}>Book en konsultasjon</h2>
        <p className="muted" style={{ maxWidth: '52ch' }}>
          Vi tar oss tid til å forstå dine ønsker og gi deg riktig behandling for et resultat
          du vil elske.
        </p>
        <div className="cta-row" style={{ marginTop: 6 }}>
          <a className="btn btn--primary" href={BOOKING_URL}>Book time nå</a>
          <a className="btn" href="/priser">Se priser</a>
        </div>
      </div>
    </>
  )
}
