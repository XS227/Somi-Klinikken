import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import InternalPagesNav from '@/components/InternalPagesNav'

export const metadata: Metadata = {
  title: 'Merkevare og nedlastinger (internt) | SOMI Klinikken',
  description: 'Farger, typografi og logo for SOMI Klinikken, samlet til nedlasting.',
  robots: { index: false, follow: false },
}

const pageStyles = `
.brd-wrap {
  --page:        #f7f2ee;
  --surface:     #fdfaf7;
  --surface-2:   #f1e6de;
  --ink:         #2b2320;
  --ink-2:       #6b5f59;
  --ink-muted:   #96897f;
  --hairline:    #e4d5c9;
  --brand-ink:   #7a3a4a;
  --shadow: 0 1px 2px rgba(43,35,32,0.04), 0 6px 20px rgba(43,35,32,0.06);
  display: block;
  background: var(--page);
  color: var(--ink);
  font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
  line-height: 1.55;
}
@media (prefers-color-scheme: dark) {
  .brd-wrap {
    --page: #16120f; --surface: #201a17; --surface-2: #291f1b;
    --ink: #f5efe9; --ink-2: #c9bcb2; --ink-muted: #8f8279; --hairline: #3a2f29;
    --brand-ink: #eecfd4;
    --shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.3);
  }
}
.brd-wrap * { box-sizing: border-box; min-width: 0; }
.brd-wrap { max-width: 100%; overflow-x: hidden; overflow-wrap: break-word; }
.brd-wrap img, .brd-wrap svg { max-width: 100%; }
.brd-wrap .wrap { max-width: 820px; margin: 0 auto; padding: 56px 24px 96px; overflow-x: hidden; }
.brd-wrap h1, .brd-wrap h2, .brd-wrap h3 {
  font-family: Georgia, "Iowan Old Style", "Palatino Linotype", serif;
  font-weight: 400; color: var(--ink); margin: 0;
}
.brd-wrap header.hero {
  display: flex; flex-direction: column; gap: 10px;
  background: var(--surface-2); color: var(--ink);
  border: 1px solid var(--hairline);
  padding: 34px 32px 30px; border-radius: 18px;
  margin-bottom: 40px; box-shadow: var(--shadow);
}
.brd-wrap header.hero .eyebrow { font-size: 12.5px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--brand-ink); }
.brd-wrap header.hero h1 { font-size: 32px; letter-spacing: 0.01em; color: var(--ink); }
.brd-wrap header.hero p.lede { margin: 4px 0 0; color: var(--ink-2); font-size: 16.5px; max-width: 60ch; }
.brd-wrap section { margin-bottom: 48px; }
.brd-wrap section > .section-head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.brd-wrap section > .section-head h2 { font-size: 22px; }
.brd-wrap section > .section-head p { margin: 0; color: var(--ink-2); font-size: 15px; max-width: 62ch; }
.brd-wrap .callout { display: flex; gap: 12px; padding: 14px 16px; border-radius: 10px; background: var(--surface-2); border: 1px solid var(--hairline); font-size: 14px; color: var(--ink-2); margin-top: 18px; }
.brd-wrap .callout .mark { color: var(--brand-ink); font-weight: 700; flex-shrink: 0; }

.brd-wrap .color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 14px; }
.brd-wrap .color-card { border: 1px solid var(--hairline); border-radius: 14px; overflow: hidden; background: var(--surface); box-shadow: var(--shadow); }
.brd-wrap .swatch { height: 76px; display: flex; align-items: flex-end; padding: 10px; }
.brd-wrap .swatch span { font-family: ui-monospace, monospace; font-size: 11.5px; background: rgba(255,255,255,0.65); padding: 2px 6px; border-radius: 6px; }
.brd-wrap .color-card .body { padding: 12px 14px 14px; }
.brd-wrap .color-card .name { font-weight: 600; font-size: 14px; }
.brd-wrap .color-card .note { font-size: 12px; color: var(--ink-2); margin-top: 3px; }

.brd-wrap .font-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 14px; padding: 20px 22px; box-shadow: var(--shadow); margin-bottom: 14px; }
.brd-wrap .font-card .row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px; }
.brd-wrap .font-card .fam { font-size: 12px; color: var(--ink-muted); }
.brd-wrap .font-card p.desc { margin: 8px 0 0; font-size: 13.5px; color: var(--ink-2); }

.brd-wrap .logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
.brd-wrap .logo-card { border: 1px solid var(--hairline); border-radius: 14px; overflow: hidden; background: var(--surface); box-shadow: var(--shadow); }
.brd-wrap .logo-preview { display: flex; align-items: center; justify-content: center; padding: 28px; min-height: 140px; }
.brd-wrap .logo-preview.checker {
  background-image: repeating-conic-gradient(var(--surface-2) 0% 25%, transparent 0% 50%);
  background-size: 16px 16px;
}
.brd-wrap .logo-card .body { padding: 14px 18px 18px; }
.brd-wrap .logo-card .title { font-weight: 600; font-size: 14.5px; }
.brd-wrap .logo-card .note { font-size: 12.5px; color: var(--ink-2); margin-top: 4px; }
.brd-wrap .dl-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.brd-wrap .dl-row a {
  font-size: 12.5px; font-weight: 600; text-decoration: none; color: var(--ink);
  border: 1px solid var(--hairline); border-radius: 999px; padding: 6px 12px;
}
.brd-wrap .dl-row a:hover { border-color: var(--brand-ink); color: var(--brand-ink); }
.brd-wrap .dl-row a.primary { background: var(--brand-ink); border-color: var(--brand-ink); color: #fff; }

footer.page-footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--hairline); font-size: 12.5px; color: var(--ink-muted); }
footer.page-footer a { color: inherit; }

@media (max-width: 640px) {
  .brd-wrap .wrap { padding: 36px 16px 72px; }
  .brd-wrap header.hero { padding: 26px 20px 22px; border-radius: 14px; }
  .brd-wrap header.hero h1 { font-size: 25px; }
}
`

const colors: { name: string; hex: string; note: string }[] = [
  { name: 'Aksent — dus rosa', hex: '#ddb3b3', note: 'Farger «O»-en i logoen. Knapper, markeringer, det som skal peke seg ut.' },
  { name: 'Tekst — kull', hex: '#383838', note: 'Primær tekstfarge på hele siden.' },
  { name: 'Varm grå', hex: '#e8e6e4', note: 'Sekundær bakgrunn — nøytral, litt varmere enn ren hvit.' },
  { name: 'Beige', hex: '#ede5dd', note: 'Kort og paneler som skal skille seg litt fra hvit bakgrunn.' },
  { name: 'Hvit', hex: '#ffffff', note: 'Hovedbakgrunn på nettsiden.' },
]

export default function BrandingPage() {
  return (
    <div className="brd-wrap">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div className="wrap">
        <InternalPagesNav current="branding" />

        <header className="hero">
          <span className="eyebrow">For Katarina — ikke offentlig</span>
          <h1>Merkevare og nedlastinger</h1>
          <p className="lede">
            Fargene, fontene og logoen som brukes på somiklinikken.no, samlet ett sted — last ned
            logoen i den størrelsen og formatet du trenger.
          </p>
        </header>

        <section>
          <div className="section-head">
            <h2>Farger</h2>
            <p>Rolig, varm og nøytral palett med én aksentfarge — dus rosa, hentet rett fra «O»-en i logoen.</p>
          </div>
          <div className="color-grid">
            {colors.map((c) => (
              <div className="color-card" key={c.hex}>
                <div className="swatch" style={{ background: c.hex }}>
                  <span style={{ color: '#2b2320' }}>{c.hex}</span>
                </div>
                <div className="body">
                  <div className="name">{c.name}</div>
                  <div className="note">{c.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Typografi</h2>
            <p>Begge er systemfonter — ingen ekstern fontlasting, alltid tilgjengelig.</p>
          </div>
          <div className="font-card">
            <div className="row">
              <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26 }}>Georgia</span>
              <span className="fam">Overskrifter</span>
            </div>
            <p className="desc">Serif — brukes på alle h1/h2/h3 på nettsiden, gir det rolige, klinikk-aktige preget.</p>
          </div>
          <div className="font-card">
            <div className="row">
              <span style={{ fontFamily: 'Corbel, system-ui, sans-serif', fontSize: 22 }}>Corbel</span>
              <span className="fam">Brødtekst</span>
            </div>
            <p className="desc">Sans-serif — all løpende tekst og knapper.</p>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Logo</h2>
            <p>Én lockup («SOMI», med rosa «O»), i ulike størrelser og formater.</p>
          </div>
          <div className="logo-grid">
            <div className="logo-card">
              <div className="logo-preview">
                <Image
                  src="/branding/logo/logo-800px.png"
                  alt="SOMI Klinikken-logo"
                  width={280}
                  height={288}
                  style={{ width: '100%', maxWidth: 220, height: 'auto' }}
                />
              </div>
              <div className="body">
                <div className="title">Full logo, PNG</div>
                <div className="note">Original oppsett, hvit bakgrunn.</div>
                <div className="dl-row">
                  <a href="/branding/logo/logo-1600px.png" download>1600px</a>
                  <a href="/branding/logo/logo-800px.png" download>800px</a>
                  <a href="/branding/logo/logo-400px.png" download>400px</a>
                  <a href="/branding/logo/logo-1600px.jpg" download>JPG, 1600px</a>
                </div>
              </div>
            </div>

            <div className="logo-card">
              <div className="logo-preview checker">
                <Image
                  src="/branding/logo/logo-transparent-900px.png"
                  alt="SOMI Klinikken-logo, gjennomsiktig bakgrunn"
                  width={280}
                  height={288}
                  style={{ width: '100%', maxWidth: 220, height: 'auto' }}
                />
              </div>
              <div className="body">
                <div className="title">Kompakt, gjennomsiktig bakgrunn</div>
                <div className="note">Beskåret tett inntil motivet — til e-post, dokumenter, mørke bakgrunner. Rutemønsteret er kun for å vise gjennomsiktigheten, ikke en del av filen.</div>
                <div className="dl-row">
                  <a href="/branding/logo/logo-transparent-900px.png" download className="primary">Last ned (900px)</a>
                  <a href="/branding/logo/logo-transparent-450px.png" download>Last ned (450px)</a>
                </div>
              </div>
            </div>
          </div>
          <div className="callout">
            <span className="mark">→</span>
            <span>
              Det finnes ingen ekte vektorversjon (SVG) av denne logoen ennå — filen som heter
              <code style={{ margin: '0 4px' }}>logo.svg</code> i prosjektet er en enkel tekst-plassholder, ikke en
              sporet versjon av det virkelige merket. PNG-ene over er høyoppløste nok til det meste (trykk opptil
              ca. A4 ved 1600px), men si ifra om dere trenger en ekte vektorversjon (f.eks. til et stort banner eller
              skilt) — det krever at noen tegner den på nytt i et vektorprogram, det kan ikke genereres automatisk
              fra en PNG.
            </span>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>QR-kode for Google-anmeldelser</h2>
            <p>Til oppslag ved resepsjonen — Katarinas eget forslag, se kampanjeplanen.</p>
          </div>
          <div className="logo-grid">
            <div className="logo-card">
              <div className="logo-preview" style={{ background: '#f7f2ee' }}>
                <Image
                  src="/branding/qr/anmeldelse-plakat-a5.png"
                  alt="Oppslagsplakat med QR-kode til Google-anmeldelser"
                  width={220}
                  height={312}
                  style={{ width: '100%', maxWidth: 200, height: 'auto' }}
                />
              </div>
              <div className="body">
                <div className="title">Oppslagsplakat, A5</div>
                <div className="note">Ferdig til utskrift til resepsjon/kortterminal — logo, hyggelig invitasjon og QR-kode i SOMI-farger.</div>
                <div className="dl-row">
                  <a href="/branding/qr/anmeldelse-plakat-a5.png" download className="primary">Last ned plakat (A5, 300 dpi)</a>
                </div>
              </div>
            </div>

            <div className="logo-card">
              <div className="logo-preview checker">
                <Image
                  src="/branding/qr/qr-review-raw.png"
                  alt="QR-kode alene, gjennomsiktig bakgrunn"
                  width={200}
                  height={200}
                  style={{ width: '100%', maxWidth: 180, height: 'auto' }}
                />
              </div>
              <div className="body">
                <div className="title">Kun QR-koden</div>
                <div className="note">Gjennomsiktig bakgrunn — til bruk i egne design, kvitteringer, SMS-bilde e.l.</div>
                <div className="dl-row">
                  <a href="/branding/qr/qr-review-raw.png" download>Last ned (1000px, transparent)</a>
                </div>
              </div>
            </div>
          </div>
          <div className="callout">
            <span className="mark">→</span>
            <span>
              Går rett til «skriv anmeldelse»-siden for Somi Klinikken AS, ikke bare Maps-oppføringen —
              hentet fra Googles egen sted-ID, sjekket at koden faktisk avkoder til riktig lenke før den ble
              lagt ut her. Full plan for bruk (timing, manus, mål) ligger på <a href="/kampanje">/kampanje</a>.
            </span>
          </div>
        </section>

        <footer className="page-footer">
          Sist oppdatert 2. september 2026 · Intern side, vises ikke i søk · Kampanjeplan: <a href="/kampanje">/kampanje</a> · Søkeordstatus: <a href="/seo">/seo</a>
        </footer>

      </div>
    </div>
  )
}
