import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book time | SOMI Klinikken i Sandnes',
  description:
    'Book time hos SOMI Klinikken i Sandnes. Microblading, permanent makeup, hudpleie, laser og mer. Enkel og trygg online-booking.',
  openGraph: {
    type: 'website',
    title: 'Book time | SOMI Klinikken',
    description: 'Book time enkelt og trygt online hos SOMI Klinikken i Sandnes.',
    images: ['/img/brand/logo.png'],
  },
}

export default function BookingPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(148deg, #f4e3dc 0%, #eedede 55%, #f0e6e6 100%)',
          paddingTop: '48px',
          paddingBottom: 48,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', right: '-60px', top: 20,
            width: 'clamp(200px,30vw,400px)', height: 'clamp(140px,22vw,280px)',
            borderRadius: '999px 999px 0 0',
            border: '2px solid rgba(221,179,179,0.28)',
            borderBottom: 0, pointerEvents: 'none',
          }}
        />
        <div className="container reveal">
          <div className="kicker">SOMI Klinikken</div>
          <h1 className="h1" style={{ marginTop: 10, marginBottom: 16 }}>Book time</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: 'rgba(56,56,56,0.72)', maxWidth: '52ch', lineHeight: 1.7 }}>
            Velg behandling og tidspunkt som passer deg. Booking er enkel og trygg – direkte i kalenderen vår.
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14, color: 'rgba(56,56,56,0.65)' }}>
            <span>📍 Langgata 31, 4306 Sandnes</span>
            <span>📞 +47 929 39 171</span>
            <span>✉ post@somiklinikken.no</span>
          </div>
        </div>
      </section>

      {/* Booking iframe */}
      <section style={{ padding: '40px 0 64px', background: '#fff' }}>
        <div className="container">
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(56,56,56,0.09)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.05)',
              background: '#fff',
            }}
          >
            <iframe
              src="https://somi.bestille.no/OnCust2/#!/"
              title="Book time hos SOMI Klinikken"
              width="100%"
              style={{ minHeight: 900, border: 0, display: 'block' }}
              scrolling="yes"
              allow="payment"
            />
          </div>

          {/* Fallback contact */}
          <div style={{
            marginTop: 32, padding: '28px 32px',
            borderRadius: 18,
            background: 'rgba(244,227,220,0.35)',
            border: '1px solid rgba(221,179,179,0.2)',
            display: 'grid',
            gap: 8,
          }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>Kan du ikke booke online?</p>
            <p style={{ margin: 0, color: 'rgba(56,56,56,0.72)', fontSize: 15, lineHeight: 1.65 }}>
              Ring oss på{' '}
              <a href="tel:+4792939171" style={{ color: '#383838', fontWeight: 600 }}>+47 929 39 171</a>
              {' '}eller send en e-post til{' '}
              <a href="mailto:post@somiklinikken.no" style={{ color: '#383838', fontWeight: 600 }}>post@somiklinikken.no</a>
              {' '}– vi hjelper deg gjerne.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
