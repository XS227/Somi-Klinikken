import React from 'react'
import type { Metadata } from 'next'
import { ResultaterGalleri } from './ResultaterGalleri'

export const metadata: Metadata = {
  title: 'Resultater | SOMI Klinikken i Sandnes',
  description:
    'Se resultater fra microblading, permanent makeup, powderbrows og lipblush hos SOMI Klinikken i Sandnes. Naturlige og presise resultater.',
  openGraph: {
    type: 'website',
    title: 'Resultater – SOMI Klinikken',
    description: 'Microblading, permanent makeup og hudbehandling – se resultatene.',
    images: ['/img/resultater/pmu-permanent-makeup-resultat-somi-sandnes-1.webp'],
  },
  alternates: {
    canonical: 'https://somiklinikken.no/resultater',
  },
}

const BOOKING_URL = '/booking'

export default function ResultaterPage() {
  return (
    <main style={{ paddingTop: '48px', paddingBottom: 64 }}>
      <div className="container">

        <header style={{ marginBottom: 36 }}>
          <div className="kicker">Galleri</div>
          <h1 className="h1" style={{ marginTop: 8 }}>Resultater</h1>
          <p className="muted" style={{ marginTop: 12, maxWidth: '60ch' }}>
            Naturlige, harmoniske resultater er kjernen i alt vi gjør. Her ser du et utvalg fra
            behandlingene våre – microblading, permanent makeup og mer.
          </p>
          <div className="cta-row" style={{ marginTop: 20 }}>
            <a className="btn btn--primary" href={BOOKING_URL}>Book time</a>
            <a className="btn" href="/behandlinger">Se behandlinger</a>
          </div>
        </header>

        <ResultaterGalleri />

      </div>
    </main>
  )
}
