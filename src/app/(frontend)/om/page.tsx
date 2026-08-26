import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Om SOMI Klinikken | Sandnes',
  description:
    'SOMI Klinikken er et spesialisert skjønnhetssenter i Sandnes. Vi tilbyr microblading, permanent makeup, hudpleie og laserbehandlinger med fokus på naturlige resultater.',
  openGraph: {
    title: 'Om SOMI Klinikken i Sandnes',
    description: 'Lær mer om klinikken, vår filosofi og teamet bak SOMI.',
    images: ['/img/klinikk/somi-klinikken-interior-sandnes.webp'],
  },
  alternates: {
    canonical: 'https://somiklinikken.no/om',
  },
}

const BOOKING_URL = '/booking'

export default function OmPage() {
  return (
    <main style={{ paddingTop: '48px', paddingBottom: 80 }}>
      <div className="container">

        {/* 1. Hero – tekst */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="kicker">Om klinikken</div>
          <h1 className="h1" style={{ marginTop: 8 }}>Om SOMI Klinikken</h1>
          <p style={{ marginTop: 14, maxWidth: '62ch', fontSize: 17, color: '#383838', lineHeight: 1.7 }}>
            Et dedikert klinikksenter i hjertet av Sandnes, med spesialisering i permanent makeup,
            microblading, hudpleie og laserbehandlinger.
          </p>
        </div>

        {/* 2. Filosofi – bilde venstre + tekst høyre */}
        <div className="about-grid reveal" style={{ marginBottom: 64 }}>
          <div className="about-image">
            <Image
              src="/img/team/katarina-hammer-konsultasjon-kunde-somi-klinikken.webp"
              alt="Katarina Hammer i konsultasjon med kunde hos SOMI Klinikken i Sandnes"
              width={1200}
              height={1600}
              sizes="(max-width: 940px) 100vw, 50vw"
              style={{ width: '100%', borderRadius: 18, display: 'block', maxHeight: 520, objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="about-copy" style={{ minWidth: 0 }}>
            <div className="kicker">Vår filosofi</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Naturlig skjønnhet – din beste versjon</h2>
            <p style={{ marginTop: 18 }}>
              Hos SOMI Klinikken tror vi at skjønnhet handler om å forsterke det du allerede har.
              Vi jobber aldri for dramatiske resultater – men for presise, naturlige og varige
              uttrykk som speiler deg.
            </p>
            <p style={{ marginTop: 12 }}>
              Vår tilnærming er alltid individuell. Hvert ansikt er unikt, og vi bruker tid på
              å forstå dine ønsker, din hudtype og din hverdag før vi anbefaler en behandling.
            </p>
            <p style={{ marginTop: 12 }}>
              Vi holder oss kontinuerlig oppdatert på teknikker og produkter – for å sikre at
              du alltid får det beste som finnes.
            </p>
            <div className="cta-row" style={{ marginTop: 28 }}>
              <a className="btn btn--accent" href={BOOKING_URL}>Book gratis konsultasjon</a>
              <a className="btn" href="/team">Møt teamet</a>
            </div>
          </div>
        </div>

        {/* 4. Statistikk */}
        <div
          className="reveal"
          style={{
            marginBottom: 64,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
            maxWidth: 720,
            margin: '0 auto 64px',
            textAlign: 'center',
          }}
        >
          {[
            { num: '13+', label: 'Års erfaring' },
            { num: '3', label: 'Spesialister' },
            { num: '100%', label: 'Individuell tilpasning' },
            { num: 'Sandnes', label: 'Langgata 31' },
          ].map(({ num, label }) => (
            <div
              key={label}
              style={{
                padding: '28px 24px', borderRadius: 16,
                background: 'rgba(237,229,221,0.45)', border: '1px solid rgba(56,56,56,0.07)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'Georgia,serif', fontSize: 32, color: '#383838', fontWeight: 400 }}>{num}</div>
              <div style={{ fontSize: 13, color: 'rgba(56,56,56,0.62)', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* 5. CTA */}
        <div
          className="reveal"
          style={{
            padding: '40px 32px', borderRadius: 22,
            background: 'rgba(237,229,221,0.5)',
            border: '1px solid rgba(56,56,56,0.08)',
            textAlign: 'center', color: '#383838',
            boxShadow: '0 8px 24px rgba(56,56,56,0.06)',
          }}
        >
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,32px)', margin: '0 0 14px', fontWeight: 400, color: '#383838' }}>
            Klar for din behandling?
          </h2>
          <p style={{ color: 'rgba(56,56,56,0.7)', margin: '0 0 28px', lineHeight: 1.65 }}>
            Book en gratis konsultasjon og finn ut hvilken behandling som passer for deg.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a className="btn" href={BOOKING_URL}
              style={{ background: '#DDB3B3', borderColor: 'rgba(221,179,179,0.4)', color: '#FFFFFF', fontWeight: 600 }}>
              Book konsultasjon
            </a>
            <a className="btn" href="/behandlinger"
              style={{ border: '1px solid #383838', color: '#383838', background: 'transparent' }}>
              Se behandlinger
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
