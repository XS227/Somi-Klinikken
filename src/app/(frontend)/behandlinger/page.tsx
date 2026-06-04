import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Behandlinger | SOMI Klinikken Sandnes',
  description:
    'Utforsk alle behandlinger hos SOMI Klinikken i Sandnes: permanent makeup, laser hårfjerning, hudpleie, injeksjoner og mer. Gratis konsultasjon inkludert.',
  openGraph: {
    type: 'website',
    title: 'Behandlinger – SOMI Klinikken Sandnes',
    description: 'Alle behandlinger hos SOMI Klinikken – microblading, laser, hudpleie og mer.',
  },
}

const categories = [
  {
    slug: 'gratis-konsultasjon',
    title: 'Gratis konsultasjon',
    desc: 'Kom innom for en uforpliktende prat. Vi vurderer din hudtype, anbefaler behandling og svarer på alle spørsmål.',
    icon: '☕',
  },
  {
    slug: 'laser-tattoo-removal',
    title: 'Laser tattoofjerning',
    desc: 'Fjern tatoveringer effektivt med laser eller saline tattoo removal. Alle hudtyper.',
    icon: '⚡',
  },
  {
    slug: 'permanent-makeup',
    title: 'Permanent makeup',
    desc: 'Microblading, Powder Brows, Lipblush og Eyeliner – naturlige resultater tilpasset deg.',
    icon: '✨',
  },
  {
    slug: 'injeksjonsbehandlinger',
    title: 'Injeksjonsbehandlinger',
    desc: 'Naturlig foryngelse med erfaren behandler og gratis konsultasjon alltid inkludert.',
    icon: '💉',
  },
  {
    slug: 'laser-harfjerning',
    title: 'Laser hårfjerning',
    desc: 'Permanent og effektiv hårfjerning med Arianna som sertifisert laserspesialist.',
    icon: '🔬',
  },
  {
    slug: 'medisinsk-hudpleie',
    title: 'Medisinsk hudpleie',
    desc: 'PRX-T33, microneedling, peel og dyprengjøring – dokumenterte resultater.',
    icon: '🔬',
  },
  {
    slug: 'klassisk-hudpleie',
    title: 'Klassisk hudpleie',
    desc: 'Skreddersydde ansiktsbehandlinger med Dermalogica – for alle hudtyper.',
    icon: '🌿',
  },
  {
    slug: 'harfjerning-voks-elektrolyse',
    title: 'Hårfjerning voks/elektrolyse',
    desc: 'Rask og skånsom voksbehandling og elektrolyse for alle hudtyper.',
    icon: '✂️',
  },
]

export default function BehandlingerPage() {
  return (
    <main style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="container">

        <header style={{ marginBottom: 40 }}>
          <div className="kicker">Behandlinger</div>
          <h1 className="h1" style={{ marginTop: 8 }}>Finn riktig behandling</h1>
          <p className="muted" style={{ marginTop: 12, maxWidth: '64ch' }}>
            Velg en kategori under for å lese mer om behandlingen, hva du kan forvente og
            hvordan vi jobber. Priser finner du på{' '}
            <a href="/priser" style={{ color: '#6B7B8D', textDecoration: 'underline' }}>prissiden</a>.
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
          gap: 16,
        }}>
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/behandlinger/${cat.slug}`}
              style={{
                display: 'grid', gap: 10, padding: '24px 26px', borderRadius: 18,
                background: '#fff', border: '1px solid rgba(56,56,56,0.08)',
                boxShadow: '0 8px 22px rgba(0,0,0,0.04)', textDecoration: 'none',
                color: 'inherit', transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                alignContent: 'start',
              }}
            >
              <strong style={{ fontFamily: 'Georgia,serif', fontSize: 19, lineHeight: 1.25 }}>
                {cat.title}
              </strong>
              <p style={{ fontSize: 14, color: 'rgba(56,56,56,0.68)', lineHeight: 1.55, margin: 0 }}>
                {cat.desc}
              </p>
              <span style={{ fontSize: 13, color: '#6B7B8D', fontWeight: 600, marginTop: 4 }}>
                Les mer →
              </span>
            </a>
          ))}
        </div>

        <div style={{
          marginTop: 48, padding: '28px 24px', borderRadius: 18,
          background: 'rgba(237,229,221,0.5)', border: '1px solid rgba(56,56,56,0.08)',
          display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1 }}>
            <strong style={{ fontFamily: 'Georgia,serif', fontSize: 18 }}>Usikker på hva som passer?</strong>
            <p className="muted" style={{ margin: '6px 0 0', fontSize: 14 }}>
              Book en gratis konsultasjon så hjelper vi deg.
            </p>
          </div>
          <a className="btn btn--primary" href="/booking">Book gratis konsultasjon</a>
        </div>

      </div>
    </main>
  )
}
