import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Team SOMI | SOMI Klinikken i Sandnes',
  description:
    'Møt teamet hos SOMI Klinikken. Katarina Hammer (eier, permanent makeup), Emma (hudpleier, Dermalogica Expert), Arianna (laserspesialist) og Irena (intensivsykepleier).',
  alternates: {
    canonical: 'https://somiklinikken.no/team',
  },
}

const BOOKING_URL = '/booking'

export default function TeamPage() {
  return (
    <main style={{ paddingTop: '40px', paddingBottom: 80 }}>
      <div className="container">
        <div className="reveal">
          <div className="kicker">Menneskene bak SOMI</div>
          <h1 className="h1" style={{ marginTop: 10, marginBottom: 48 }}>TEAM SOMI</h1>
        </div>

        {/* Katarina */}
        <div className="about-grid reveal" style={{ marginBottom: 72 }}>
          <div className="about-image">
            <Image
              src="/img/team/katarina-hammer-permanent-makeup-somi-klinikken.webp"
              alt="Katarina Hammer – eier og permanent makeup artist hos SOMI Klinikken i Sandnes"
              width={1459}
              height={2188}
              sizes="260px"
              style={{
                width: '100%',
                maxWidth: 320,
                height: 400,
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block',
              }}
              priority
            />
          </div>
          <div className="about-copy">
            <div className="kicker">Eier & Daglig leder</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Katarina Hammer</h2>
            <p className="muted" style={{ marginTop: 6, fontSize: 15, letterSpacing: '0.02em' }}>
              Permanent makeup · Over 13 års erfaring
            </p>
            <p style={{ marginTop: 18 }}>
              Katarina Hammer er eier og daglig leder av Somi Klinikken AS, med over 13 års
              erfaring innen permanent makeup. Hun er kjent for presis teknikk og naturlige,
              harmoniske resultater.
            </p>
            <p style={{ marginTop: 12 }}>
              For Katarina handler faget om å forsterke det naturlige med balanse, helhet og et
              tidløst uttrykk. Arbeidet hennes er preget av høy faglig kvalitet, estetisk
              forståelse og et gjennomført øye for detaljer.
            </p>
            <p style={{ marginTop: 12 }}>
              Hun spesialiserer seg i Microblading, Powderbrows, Lipblush og Eyeliner – alle
              utført med fokus på å fremheve klientens naturlige trekk.
            </p>
            <div className="cta-row" style={{ marginTop: 28 }}>
              <a className="btn btn--accent" href={BOOKING_URL}>Book time</a>
              <a className="btn" href="/behandlinger">Se behandlinger</a>
            </div>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid rgba(56,56,56,0.08)', marginBottom: 72 }} />

        {/* Emma */}
        <div
          className="about-grid reveal"
          style={{ marginBottom: 72, direction: 'rtl' }}
        >
          <div className="about-image" style={{ direction: 'ltr' }}>
            <Image
              src="/img/team/emma-hudpleier-dermalogica-somi-klinikken.webp"
              alt="Emma – hudpleier og Dermalogica Expert hos SOMI Klinikken i Sandnes"
              width={3648}
              height={5472}
              sizes="220px"
              style={{
                width: '100%',
                maxWidth: 280,
                height: 360,
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block',
              }}
            />
          </div>
          <div className="about-copy" style={{ direction: 'ltr' }}>
            <div className="kicker">Hudpleier</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Emma</h2>
            <p className="muted" style={{ marginTop: 6, fontSize: 15, letterSpacing: '0.02em' }}>
              Hudpleier · Dermalogica Expert
            </p>
            <p style={{ marginTop: 18 }}>
              Emma er utdannet hudpleier med videreutdanning som Dermalogica Expert. Gjennom
              egne erfaringer med hudutfordringer og behandling med isotretinoin har hun utviklet
              en dyp forståelse for hudhelse.
            </p>
            <p style={{ marginTop: 12 }}>
              Hun tilpasser behandlinger etter hver enkelt kundes behov, og tilbyr også bryns-
              og vippebehandlinger samt permanent makeup med fokus på naturlige og harmoniske
              resultater.
            </p>
            <div className="cta-row" style={{ marginTop: 28 }}>
              <a className="btn btn--accent" href={BOOKING_URL}>Book time</a>
              <a className="btn" href="/behandlinger">Se behandlinger</a>
            </div>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid rgba(56,56,56,0.08)', marginBottom: 72 }} />

        {/* Arianna */}
        <div className="about-grid reveal" style={{ marginBottom: 72 }}>
          <div className="about-image">
            <Image
              src="/img/team/arianna-laserspesialist-somi-klinikken.webp"
              alt="Arianna – autorisert helsepersonell og laserspesialist hos SOMI Klinikken"
              width={1170}
              height={1696}
              sizes="220px"
              style={{
                width: '100%',
                maxWidth: 280,
                height: 360,
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block',
              }}
            />
          </div>
          <div className="about-copy">
            <div className="kicker">Laserspesialist</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Arianna</h2>
            <p className="muted" style={{ marginTop: 6, fontSize: 15, letterSpacing: '0.02em' }}>
              Autorisert helsepersonell · Laserspesialist
            </p>
            <p style={{ marginTop: 18 }}>
              Arianna er autorisert helsepersonell med videreutdanning som laserspesialist.
              Hun har fordypet seg gjennom avanserte kurs innen laserbehandling.
            </p>
            <p style={{ marginTop: 12 }}>
              Hun arbeider etter høye standarder med fokus på presisjon, kvalitet og
              kontinuerlig faglig utvikling for å sikre trygge, skreddersydde og effektive
              behandlinger.
            </p>
            <div className="cta-row" style={{ marginTop: 28 }}>
              <a className="btn btn--accent" href={BOOKING_URL}>Book time</a>
              <a className="btn" href="/behandlinger">Se behandlinger</a>
            </div>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid rgba(56,56,56,0.08)', marginBottom: 72 }} />

        {/* Irena */}
        <div
          className="about-grid reveal"
          style={{ marginBottom: 72, direction: 'rtl' }}
        >
          <div className="about-image" style={{ direction: 'ltr' }}>
            <Image
              src="/img/team/irena-intensivsykepleier-somi-klinikken.svg"
              alt="Irena – intensivsykepleier og estetisk behandler hos SOMI Klinikken i Sandnes"
              width={720}
              height={900}
              sizes="220px"
              style={{
                width: '100%',
                maxWidth: 280,
                height: 360,
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block',
              }}
            />
          </div>
          <div className="about-copy" style={{ direction: 'ltr' }}>
            <div className="kicker">Intensivsykepleier</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Irena</h2>
            <p className="muted" style={{ marginTop: 6, fontSize: 15, letterSpacing: '0.02em' }}>
              Intensivsykepleier · Estetisk medisin
            </p>
            <p style={{ marginTop: 18 }}>
              Irena er utdannet intensivsykepleier med lang klinisk erfaring og solid videreutdanning
              innen estetisk medisin. I en bransje preget av trender og ofte unaturlige idealer,
              brenner hun for å fremme naturlig skjønnhet og god hudhelse.
            </p>
            <p style={{ marginTop: 12 }}>
              Irena er opptatt av at estetiske behandlinger skal gjøres med måte. Hun fokuserer på
              subtile justeringer som harmonerer med kundens egne trekk. Ofte kan en liten endring
              på det rette stedet utgjøre en enorm forskjell – både for det fysiske utseendet og
              det psykiske velværet.
            </p>
            <p style={{ marginTop: 12 }}>
              Irena mener at en kvinne som er fornøyd med seg selv er den vakreste kvinnen, og det
              er nettopp dette som er hennes mål.
            </p>
            <div className="cta-row" style={{ marginTop: 28 }}>
              <a className="btn btn--accent" href={BOOKING_URL}>Book time</a>
              <a className="btn" href="/behandlinger">Se behandlinger</a>
            </div>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid rgba(56,56,56,0.08)', marginBottom: 72 }} />

        {/* Plassholder – ny behandler 1 */}
        {/* TODO: Bytt ut navn, tittel, beskrivelse og bilde når behandleren er klar */}
        <div className="about-grid reveal" style={{ marginBottom: 72 }}>
          <div className="about-image">
            <Image
              src="/img/team/kommer-snart-behandler-somi-klinikken.svg"
              alt="Ny behandler kommer snart til SOMI Klinikken"
              width={720}
              height={900}
              sizes="220px"
              style={{
                width: '100%',
                maxWidth: 280,
                height: 360,
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block',
              }}
            />
          </div>
          <div className="about-copy">
            <div className="kicker">Estetisk behandler</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Kommer snart</h2>
            <p className="muted" style={{ marginTop: 6, fontSize: 15, letterSpacing: '0.02em' }}>
              Ny behandler · SOMI Klinikken
            </p>
            <p style={{ marginTop: 18 }}>
              Presentasjon kommer snart.
            </p>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid rgba(56,56,56,0.08)', marginBottom: 72 }} />

        {/* Plassholder – ny behandler 2 */}
        {/* TODO: Bytt ut navn, tittel, beskrivelse og bilde når behandleren er klar */}
        <div className="about-grid reveal" style={{ marginBottom: 40, direction: 'rtl' }}>
          <div className="about-image" style={{ direction: 'ltr' }}>
            <Image
              src="/img/team/kommer-snart-behandler-somi-klinikken.svg"
              alt="Ny behandler kommer snart til SOMI Klinikken"
              width={720}
              height={900}
              sizes="220px"
              style={{
                width: '100%',
                maxWidth: 280,
                height: 360,
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block',
              }}
            />
          </div>
          <div className="about-copy" style={{ direction: 'ltr' }}>
            <div className="kicker">Estetisk behandler</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Kommer snart</h2>
            <p className="muted" style={{ marginTop: 6, fontSize: 15, letterSpacing: '0.02em' }}>
              Ny behandler · SOMI Klinikken
            </p>
            <p style={{ marginTop: 18 }}>
              Presentasjon kommer snart.
            </p>
          </div>
        </div>

        {/* CTA band */}
        <div
          className="reveal"
          style={{
            marginTop: 64,
            padding: '40px 32px',
            borderRadius: 22,
            background: 'linear-gradient(145deg, #383838 0%, #4a4a4a 100%)',
            textAlign: 'center',
            color: '#fff',
            boxShadow: '0 16px 40px rgba(56,56,56,0.18)',
          }}
        >
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,32px)', margin: '0 0 14px', fontWeight: 400 }}>
            Klar til å booke?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 28px', lineHeight: 1.65 }}>
            Velg behandling og book time direkte i vår kalender.
          </p>
          <a
            className="btn"
            href={BOOKING_URL}
            style={{ background: '#DDB3B3', borderColor: 'rgba(221,179,179,0.4)', color: '#383838', fontWeight: 600 }}
          >
            Book time hos SOMI
          </a>
        </div>
      </div>
    </main>
  )
}
