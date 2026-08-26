import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gavekort | SOMI Klinikken i Sandnes',
  description:
    'Gi bort en opplevelse med gavekort fra SOMI Klinikken i Sandnes. Kan brukes på alle behandlinger – microblading, hudpleie, laser og mer.',
  openGraph: {
    type: 'website',
    title: 'Gavekort | SOMI Klinikken',
    description: 'Den perfekte gaven – et gavekort til SOMI Klinikken.',
    images: ['/img/brand/logo.png'],
  },
  alternates: {
    canonical: 'https://somiklinikken.no/gavekort',
  },
}

const GAVEKORT_URL = 'https://somi.bestille.no/OnCust2/#!/giftcertificatepurchase/'
const BOOKING_URL = '/booking'

const benefits = [
  {
    icon: '✦',
    title: 'Valgfri verdi',
    desc: 'Velg ønsket beløp – gavekortet dekker alle priser, store som små.',
  },
  {
    icon: '◇',
    title: 'Alle behandlinger',
    desc: 'Gjelder hele menyen: microblading, hudpleie, laser, bryn, vipper og mer.',
  },
  {
    icon: '◯',
    title: 'Enkelt å løse inn',
    desc: 'Mottakeren bruker gavekortet ved booking – raskt og enkelt online.',
  },
]

const steps = [
  { num: '01', title: 'Kjøp gavekortet', desc: 'Velg beløp og betal trygt online. Du mottar gavekortet på e-post.' },
  { num: '02', title: 'Send til mottaker', desc: 'Send gavekortet direkte eller skriv det ut og gi det i hånden.' },
  { num: '03', title: 'Nyt behandlingen', desc: 'Mottakeren bestiller time online og bruker gavekortet ved betaling.' },
]

export default function GavekortPage() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(148deg, #ede5dd 0%, #eedede 55%, #f0e6e6 100%)',
          paddingTop: '64px',
          paddingBottom: 80,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative arc – top right */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', right: '-60px', top: 20,
            width: 'clamp(240px,34vw,460px)', height: 'clamp(160px,26vw,320px)',
            borderRadius: '999px 999px 0 0',
            border: '2px solid rgba(221,179,179,0.28)',
            borderBottom: 0, pointerEvents: 'none',
          }}
        />
        {/* Decorative arc – smaller inner */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', right: '-20px', top: 48,
            width: 'clamp(180px,26vw,360px)', height: 'clamp(120px,20vw,260px)',
            borderRadius: '999px 999px 0 0',
            border: '1px solid rgba(221,179,179,0.18)',
            borderBottom: 0, pointerEvents: 'none',
          }}
        />

        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,auto)',
              gap: 40,
              alignItems: 'center',
            }}
          >
            {/* Copy */}
            <div className="reveal" style={{ maxWidth: 580 }}>
              <div className="kicker">SOMI Klinikken</div>
              <h1
                className="h1"
                style={{ marginTop: 10, marginBottom: 20 }}
              >
                Gavekort
              </h1>
              <p
                style={{
                  fontSize: 'clamp(17px,2vw,20px)',
                  color: 'rgba(56,56,56,0.76)',
                  lineHeight: 1.68,
                  marginBottom: 36,
                  maxWidth: '52ch',
                }}
              >
                Gi bort en opplevelse – et gavekort til Somi Klinikken er den perfekte gaven.
              </p>

              <div
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
              >
                <a
                  href={GAVEKORT_URL}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '15px 34px', borderRadius: 999,
                    background: '#DDB3B3',
                    color: '#383838',
                    fontWeight: 700, fontSize: 16,
                    textDecoration: 'none',
                    border: '1px solid rgba(56,56,56,0.10)',
                    boxShadow: '0 14px 36px rgba(221,179,179,0.42)',
                    letterSpacing: '0.01em',
                  }}
                >
                  Kjøp gavekort nå
                </a>
                <a className="btn" href="/behandlinger">
                  Se behandlinger
                </a>
              </div>
            </div>

            {/* Decorative gift card mockup */}
            <div
              className="reveal"
              aria-hidden="true"
              style={{
                width: 'clamp(220px,28vw,340px)',
                aspectRatio: '16/10',
                borderRadius: 22,
                background: 'linear-gradient(135deg, #383838 0%, #555 100%)',
                boxShadow: '0 28px 56px rgba(56,56,56,0.22), 0 8px 20px rgba(56,56,56,0.14)',
                padding: '28px 28px 22px',
                display: 'grid',
                alignContent: 'space-between',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {/* Card shine */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%)',
                borderRadius: 22,
              }} />
              {/* Pink accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 4, borderRadius: '22px 22px 0 0',
                background: 'linear-gradient(90deg, #DDB3B3, #e8c9c9)',
              }} />

              <div>
                <p style={{
                  margin: 0, fontSize: 10, letterSpacing: '0.14em',
                  textTransform: 'uppercase', opacity: 0.62, color: '#DDB3B3',
                }}>
                  Somi Klinikken
                </p>
                <p style={{
                  margin: '6px 0 0', fontFamily: 'Georgia,serif',
                  fontSize: 'clamp(15px,1.8vw,22px)', fontWeight: 400,
                  letterSpacing: '0.01em', lineHeight: 1.1,
                }}>
                  Gavekort
                </p>
              </div>

              <div>
                <p style={{
                  margin: 0, fontSize: 9, letterSpacing: '0.12em',
                  textTransform: 'uppercase', opacity: 0.5,
                }}>
                  Langgata 31, 4306 Sandnes
                </p>
                <div style={{
                  display: 'flex', gap: 6, marginTop: 8, alignItems: 'center',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(221,179,179,0.22)',
                    border: '1px solid rgba(221,179,179,0.40)',
                  }} />
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(221,179,179,0.14)',
                    border: '1px solid rgba(221,179,179,0.30)',
                    marginLeft: -12,
                  }} />
                  <p style={{
                    margin: 0, fontSize: 11, opacity: 0.5,
                    letterSpacing: '0.04em',
                  }}>
                    somiklinikken.no
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────── */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <h2 className="h2 reveal" style={{ marginBottom: 28 }}>Hvorfor gavekort?</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 16,
            }}
          >
            {benefits.map((b) => (
              <div
                key={b.title}
                className="reveal"
                style={{
                  borderRadius: 20,
                  background: '#fff',
                  border: '1px solid rgba(56,56,56,0.08)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  padding: '26px 24px',
                  display: 'grid',
                  gap: 12,
                  alignContent: 'start',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: 14,
                    background: 'rgba(221,179,179,0.15)',
                    color: '#DDB3B3', fontSize: 20,
                    border: '1px solid rgba(221,179,179,0.22)',
                  }}
                >
                  {b.icon}
                </span>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, margin: 0, fontWeight: 400 }}>
                  {b.title}
                </h3>
                <p className="muted" style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section
        style={{
          background: 'rgba(237,229,221,0.28)',
          borderTop: '1px solid rgba(56,56,56,0.06)',
          borderBottom: '1px solid rgba(56,56,56,0.06)',
          padding: '64px 0',
        }}
      >
        <div className="container">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <div className="kicker">Slik fungerer det</div>
            <h2 className="h2" style={{ marginTop: 8 }}>Enkelt fra A til Å</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 2,
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="reveal"
                style={{
                  display: 'grid', gap: 12, padding: '28px 24px',
                  background: '#fff',
                  borderRadius: i === 0 ? '18px 0 0 18px' : i === steps.length - 1 ? '0 18px 18px 0' : 0,
                  border: '1px solid rgba(56,56,56,0.08)',
                  borderLeft: i > 0 ? 'none' : '1px solid rgba(56,56,56,0.08)',
                  alignContent: 'start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Georgia,serif', fontSize: 13,
                    color: '#DDB3B3', letterSpacing: '0.08em',
                    fontWeight: 400,
                  }}
                >
                  {s.num}
                </span>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, margin: 0, fontWeight: 400 }}>
                  {s.title}
                </h3>
                <p className="muted" style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '72px 0 80px' }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              borderRadius: 24,
              background: 'linear-gradient(145deg, #383838 0%, #4a4a4a 100%)',
              padding: 'clamp(36px,6vw,64px)',
              display: 'grid',
              gap: 20,
              justifyItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(56,56,56,0.18)',
            }}
          >
            {/* Soft pink glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', bottom: -60, right: -40,
                width: 280, height: 280, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(221,179,179,0.16) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div className="kicker" style={{ color: 'rgba(221,179,179,0.8)' }}>Klar til å gi en gave?</div>
            <h2
              style={{
                fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,4vw,42px)',
                color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 560,
                fontWeight: 400,
              }}
            >
              Kjøp gavekortet på under ett minutt
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.65, maxWidth: '44ch', margin: 0 }}>
              Betales trygt online. Du mottar gavekortet på e-post og kan videresende eller skrive det ut.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
              <a
                href={GAVEKORT_URL}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '16px 38px', borderRadius: 999,
                  background: '#DDB3B3', color: '#383838',
                  fontWeight: 700, fontSize: 16,
                  textDecoration: 'none',
                  border: '1px solid rgba(221,179,179,0.3)',
                  boxShadow: '0 12px 32px rgba(221,179,179,0.35)',
                  letterSpacing: '0.01em',
                }}
              >
                Kjøp gavekort nå
              </a>
              <a
                href={BOOKING_URL}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '16px 28px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.10)',
                  color: '#fff',
                  fontWeight: 500, fontSize: 15,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                Book vanlig time
              </a>
            </div>

            <p
              style={{
                color: 'rgba(255,255,255,0.42)', fontSize: 13,
                margin: 0, lineHeight: 1.5,
              }}
            >
              Spørsmål? Ring oss på{' '}
              <a
                href="tel:+4792939171"
                style={{ color: 'rgba(221,179,179,0.8)', textDecoration: 'underline' }}
              >
                +47 929 39 171
              </a>
              {' '}eller send e-post til{' '}
              <a
                href="mailto:post@somiklinikken.no"
                style={{ color: 'rgba(221,179,179,0.8)', textDecoration: 'underline' }}
              >
                post@somiklinikken.no
              </a>
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
