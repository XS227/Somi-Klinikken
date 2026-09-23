import React from 'react'
import type { Metadata } from 'next'
import InternalPagesNav from '@/components/InternalPagesNav'

export const metadata: Metadata = {
  title: 'SEO og vekst (internt) | SOMI Klinikken',
  description: 'Kort oversikt over søkeord, konkurrenter og anmeldelser.',
  robots: { index: false, follow: false },
}

const pageStyles = `
.seo-wrap {
  --page:        #f7f2ee;
  --surface:     #fdfaf7;
  --surface-2:   #f1e6de;
  --ink:         #2b2320;
  --ink-2:       #6b5f59;
  --ink-muted:   #96897f;
  --hairline:    #e4d5c9;
  --brand-ink:   #7a3a4a;
  --series-tx:   #a8425f;
  --shadow: 0 1px 2px rgba(43,35,32,0.04), 0 6px 20px rgba(43,35,32,0.06);
  display: block;
  background: var(--page);
  color: var(--ink);
  font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
  line-height: 1.55;
}
@media (prefers-color-scheme: dark) {
  .seo-wrap {
    --page: #16120f; --surface: #201a17; --surface-2: #291f1b;
    --ink: #f5efe9; --ink-2: #c9bcb2; --ink-muted: #8f8279; --hairline: #3a2f29;
    --brand-ink: #eecfd4; --series-tx: #d1607f;
    --shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.3);
  }
}
.seo-wrap * { box-sizing: border-box; min-width: 0; }
.seo-wrap { max-width: 100%; overflow-x: hidden; overflow-wrap: break-word; }
.seo-wrap img, .seo-wrap svg { max-width: 100%; }
.seo-wrap .wrap { max-width: 780px; margin: 0 auto; padding: 56px 24px 96px; overflow-x: hidden; }
.seo-wrap h1, .seo-wrap h2, .seo-wrap h3 {
  font-family: Georgia, "Iowan Old Style", "Palatino Linotype", serif;
  font-weight: 400; color: var(--ink); margin: 0;
}
.seo-wrap header.hero {
  display: flex; flex-direction: column; gap: 10px;
  background: var(--surface-2); color: var(--ink);
  border: 1px solid var(--hairline);
  padding: 34px 32px 30px; border-radius: 18px;
  margin-bottom: 40px; box-shadow: var(--shadow);
}
.seo-wrap header.hero .eyebrow { font-size: 12.5px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--brand-ink); }
.seo-wrap header.hero h1 { font-size: 32px; letter-spacing: 0.01em; color: var(--ink); }
.seo-wrap header.hero p.lede { margin: 4px 0 0; color: var(--ink-2); font-size: 16.5px; max-width: 55ch; }
.seo-wrap header.hero .meta-row { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--hairline); font-size: 13px; color: var(--ink-muted); }
.seo-wrap header.hero a { color: var(--brand-ink); font-weight: 600; }
.seo-wrap section { margin-bottom: 48px; }
.seo-wrap section > .section-head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.seo-wrap section > .section-head h2 { font-size: 22px; }
.seo-wrap section > .section-head p { margin: 0; color: var(--ink-2); font-size: 15px; max-width: 60ch; }
.seo-wrap .card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 14px; padding: 22px 24px; box-shadow: var(--shadow); }
.seo-wrap .summary-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 14px; }
.seo-wrap .summary-list li { padding-left: 22px; position: relative; font-size: 15px; }
.seo-wrap .summary-list li::before { content: "→"; position: absolute; left: 0; color: var(--brand-ink); font-weight: 700; }
.seo-wrap .comp-group { margin-bottom: 22px; }
.seo-wrap .comp-group h3 { font-family: inherit; font-size: 12.5px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 10px; }
.seo-wrap table.comp-table { width: 100%; border-collapse: collapse; font-size: 14.5px; }
.seo-wrap table.comp-table th { text-align: left; font-size: 11.5px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink-muted); font-weight: 600; padding: 0 12px 8px; border-bottom: 1px solid var(--hairline); }
.seo-wrap table.comp-table td { padding: 11px 12px; border-bottom: 1px solid var(--hairline); vertical-align: top; }
.seo-wrap table.comp-table tr:last-child td { border-bottom: none; }
.seo-wrap table.comp-table td.name { font-weight: 600; white-space: nowrap; }
.seo-wrap table.comp-table td.note { color: var(--ink-2); }
.seo-wrap .tbl-wrap { overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; }
.seo-wrap .callout { display: flex; gap: 12px; padding: 14px 16px; border-radius: 10px; background: var(--surface-2); border: 1px solid var(--hairline); font-size: 14px; color: var(--ink-2); margin-top: 18px; }
.seo-wrap .callout .mark { color: var(--brand-ink); font-weight: 700; flex-shrink: 0; }
.seo-wrap .chart-card { padding: 24px 26px 20px; }
.seo-wrap .chart-title-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; flex-wrap: wrap; gap: 8px; }
.seo-wrap .chart-title-row h3 { font-family: inherit; font-size: 15px; font-weight: 600; color: var(--ink); }
.seo-wrap .legend { display: flex; gap: 16px; font-size: 12.5px; color: var(--ink-2); flex-wrap: wrap; }
.seo-wrap .legend .key { display: inline-flex; align-items: center; gap: 6px; }
.seo-wrap .legend .swatch { width: 10px; height: 10px; border-radius: 3px; }
.seo-wrap .bar-row {
  display: grid; grid-template-columns: 168px 1fr 92px; grid-template-areas: "label track value";
  align-items: center; gap: 12px; min-height: 30px; margin-bottom: 2px;
}
.seo-wrap .bar-row .rlabel { grid-area: label; font-size: 13.5px; color: var(--ink); text-align: right; overflow-wrap: break-word; }
.seo-wrap .bar-track { grid-area: track; position: relative; height: 22px; background: var(--surface-2); border-radius: 4px; overflow: hidden; }
.seo-wrap .bar-fill { height: 100%; border-radius: 4px 0 0 4px; position: relative; transition: filter 0.15s ease; }
.seo-wrap .bar-fill:hover { filter: brightness(1.08); }
.seo-wrap .bar-row .rvalue { grid-area: value; font-size: 13px; color: var(--ink-2); font-variant-numeric: tabular-nums; white-space: nowrap; text-align: right; }
.seo-wrap .rev-bars .bar-row { grid-template-columns: 190px 1fr 120px; }
.seo-wrap .note { font-size: 12.5px; color: var(--ink-muted); margin-top: 14px; line-height: 1.5; }
.seo-wrap .niche-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
.seo-wrap .niche-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 18px 20px; }
.seo-wrap .niche-card .tag { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--brand-ink); margin-bottom: 8px; }
.seo-wrap .niche-card h4 { font-family: inherit; font-size: 15.5px; font-weight: 600; margin: 0 0 6px; color: var(--ink); }
.seo-wrap .niche-card p { margin: 0; font-size: 13.5px; color: var(--ink-2); }
.seo-wrap .phase-list { display: flex; flex-direction: column; gap: 0; }
.seo-wrap .phase { display: grid; grid-template-columns: 96px 1fr; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--hairline); }
.seo-wrap .phase:last-child { border-bottom: none; padding-bottom: 0; }
.seo-wrap .phase:first-child { padding-top: 0; }
.seo-wrap .phase .when { font-size: 12.5px; color: var(--ink-muted); font-weight: 600; letter-spacing: 0.02em; padding-top: 3px; }
.seo-wrap .phase .when .num { display: block; font-family: Georgia, serif; font-size: 22px; color: var(--brand-ink); font-weight: 400; line-height: 1; margin-bottom: 4px; }
.seo-wrap .phase h3 { font-family: inherit; font-size: 16.5px; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
.seo-wrap .phase ul { margin: 0; padding-left: 18px; color: var(--ink-2); font-size: 14px; display: flex; flex-direction: column; gap: 5px; }
.seo-wrap .phase ul li::marker { color: var(--brand-ink); }
.seo-wrap footer.page-footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--hairline); font-size: 12.5px; color: var(--ink-muted); }
.seo-wrap .priority-list { display: flex; flex-direction: column; gap: 0; margin: 0; padding: 0; list-style: none; }
.seo-wrap .priority-item { display: flex; align-items: baseline; gap: 16px; padding: 13px 0; border-bottom: 1px solid var(--hairline); }
.seo-wrap .priority-item:last-child { border-bottom: none; }
.seo-wrap .priority-rank {
  flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%;
  background: var(--surface-2); color: var(--brand-ink);
  font-family: Georgia, serif; font-size: 13px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}
.seo-wrap .priority-text { font-size: 15.5px; color: var(--ink); font-weight: 600; }
.seo-wrap .priority-text .alt { color: var(--ink-muted); font-size: 13.5px; font-weight: 400; font-style: italic; margin-left: 6px; }
@media (max-width: 640px) {
  .seo-wrap .wrap { padding: 36px 16px 72px; }
  .seo-wrap header.hero { padding: 26px 20px 22px; border-radius: 14px; }
  .seo-wrap header.hero h1 { font-size: 25px; }
  .seo-wrap .card { padding: 18px 16px; }
  .seo-wrap .chart-card { padding: 20px 16px 16px; }

  .seo-wrap .bar-row, .seo-wrap .rev-bars .bar-row {
    grid-template-columns: 1fr auto;
    grid-template-areas: "label label" "track value";
    row-gap: 6px; column-gap: 10px; margin-bottom: 14px; min-height: 0;
  }
  .seo-wrap .bar-row .rlabel { text-align: left; font-size: 13px; }
  .seo-wrap .bar-row .rvalue { font-size: 12.5px; }

  .seo-wrap table.comp-table { font-size: 13px; }
  .seo-wrap table.comp-table td { padding: 9px 8px; }

  .seo-wrap .phase { grid-template-columns: 1fr; gap: 8px; }
}
`

const priorityKeywords = [
  { primary: 'Laser tatoveringsfjerning', alt: 'tattoo removal' },
  { primary: 'Rynkebehandling', alt: 'filler' },
  { primary: 'Hudpleie', alt: 'hudbehandling / hudveiledning' },
  { primary: 'Vippeløft', alt: 'korean lashlift' },
  { primary: 'Permanent makeup', alt: 'kosmetisk tatovering' },
  { primary: 'Laser hårfjerning', alt: null },
  { primary: 'Hudklinikk', alt: null },
  { primary: 'Brynstyling', alt: 'browlamination' },
  { primary: 'Injeksjonsbehandling', alt: null },
  { primary: 'Microblading', alt: 'powderbrows' },
  { primary: 'Laserfjerning bryn', alt: null },
]

const summary = [
  'Anmeldelsesgapet mot Velbehag er uendret siden sist sjekk (264 vs. våre 24) — ingen bevegelse ennå, den operative anmeldelsesplanen (QR-kode m.m.) må faktisk startes for at tallet skal endre seg. Se /kampanje for planen.',
  'Ny konkurrent-info: Sandnes Hud og Laserklinikk har 4,8★ på Google og fremhever laser tatoveringsfjerning aktivt — enda en reell konkurrent på søkeord #1, ikke bare Velbehag.',
  '«PRX-T33 vs BioRePeel»-artikkelen er publisert på bloggen. Selve behandlingene er fortsatt uclaimed lokalt i Sandnes — ingen konkurrent har egen landingsside for dem ennå, vinduet er fortsatt åpent.',
  'Jane og Irena, de to nye ansatte, har nå egne profiler med bilde på /team. Synlighetsplanen videre (bookinglenke, blogginnlegg, video) ligger i kampanjeplanen — se /kampanje.',
  'Presentasjonsinnleggene for Jane og Irena er publisert i dag (20. september) og ligger nå ute på /blogg. Ingen av dem har eget bilde satt i blogglisten ennå (featuredImage mangler) — kan fikses ved å koble på samme foto som brukes på /team.',
  'Uformell websøk-sjekk i dag — ikke ekte rangeringsdata, vi har ingen Search Console/ranktracker-tilgang: somiklinikken.no dukker ikke opp i søket for «laser tatoveringsfjerning Sandnes» (Sandnes Hud og Laserklinikk gjør) eller «gratis konsultasjon hudpleie Sandnes», til tross for egne artikler om begge. For «microblading Sandnes» og «PRX-T33 Sandnes» ser det bedre ut. Bør bekreftes med ordentlig rank-tracking før vi konkluderer noe.',
]

const keywordTimeline = [
  {
    when: 'Nå', title: 'Aktivt fokus denne perioden',
    items: [
      { kw: 'PRX-T33 Sandnes', why: 'Nesten ingen lokal konkurranse — bør ta denne raskt' },
      { kw: 'BioRePeel Sandnes', why: 'Samme situasjon, åpent for oss å ta i Sandnes' },
      { kw: 'Gratis konsultasjon hudpleie Sandnes', why: 'Fanger folk som sammenligner priser før de bestemmer seg' },
      { kw: 'Laser tattoo fjerning Sandnes', why: 'Prioritert av deg — trenger flere kunder her, nye ansatte gir kapasiteten' },
    ],
  },
  {
    when: 'Snart', title: 'Neste 1–2 måneder',
    items: [
      { kw: 'Lipblush Sandnes', why: 'Lite konkurranse, naturlig neste steg' },
      { kw: 'Powder brows Sandnes', why: 'Lite til middels konkurranse' },
    ],
  },
  {
    when: 'Senere', title: 'Når de over er på plass',
    items: [
      { kw: 'Permanent makeup Sandnes', why: 'Middels konkurranse, tar lengre tid å vinne' },
      { kw: 'Laser hårfjerning Sandnes', why: 'Flere sterke konkurrenter, forsvarsposisjon' },
      { kw: 'Microblading Sandnes', why: 'Flest søk av alle, men også mest konkurranse — den vi må vinne på sikt' },
    ],
  },
]

const sandnesCompetitors = [
  { name: 'Velbehag Medisinsk Hudklinikk', focus: 'Laser, hud, botox/filler', note: 'Sterkeste rival — nesten samme tilbud som SOMI. 264 anmeldelser, 4,9★.' },
  { name: 'Sandnes Hud og Laserklinikk', focus: 'Laser, hud', note: '4,8★ på Google. Egen anmeldelsesside og navngir behandlere — aktiv omdømmestrategi. Fremhever laser tatoveringsfjerning, direkte konkurrent på søkeord #1.' },
  { name: 'Rein Klinikken', focus: 'Microblading, lash lift, brudemakeup', note: 'Smalere fokus, trolig sterk på «microblading Sandnes».' },
  { name: 'Skin Illusion', focus: 'Botox, filler, hud, voks', note: 'Drives av sykepleiere med estetisk videreutdanning + lege.' },
  { name: 'Vital Hudklinikk', focus: 'Botox', note: 'Smalt tilbud.' },
]

const stavangerCompetitors = [
  { name: 'Silkehud AS', focus: 'Permanent makeup, filler, Dermapen', note: 'Best anmeldte klinikk i regionen: 61 anmeldelser, 4,9★ — uendret siden juli.' },
  { name: 'Fab.Lounge Medispa', focus: 'BioRePeel, PMU-fjerning, makeup', note: 'Viser BioRePeel-priser åpent (1500–7500 kr).' },
  { name: 'Stavanger Hudpleie', focus: 'BioRePeel, OxyGeneo, mesoterapi', note: 'Tilbyr BioRePeel — SOMI kan eie samme behandling i Sandnes.' },
]

const niches = [
  { tag: 'Nesten uclaimed', title: 'PRX-T33 i Sandnes', text: 'Ingen lokal konkurrent funnet — bare leverandører og et legekontor i nabolaget.' },
  { tag: 'Åpent lokalt', title: 'BioRePeel i Sandnes', text: 'Tilbys i Stavanger, men ikke synlig i Sandnes ennå.' },
  { tag: 'Tillit', title: 'Anmeldelser-/tillitsside', text: 'Konkurrenter fremhever anmeldelser aktivt — SOMI har ikke noe tilsvarende ennå.' },
  { tag: 'Unikt innhold', title: 'PRX-T33 vs BioRePeel', text: 'Publisert — ingen konkurrent har en sammenligningsartikkel. Kan rangere nasjonalt.' },
]

function Bar({ label, pct, color, value, title }: { label: string; pct: number; color: string; value: string; title: string }) {
  return (
    <div className="bar-row">
      <span className="rlabel">{label}</span>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, background: color }} title={title} />
      </div>
      <span className="rvalue">{value}</span>
    </div>
  )
}

export default function SeoStrategiPage() {
  return (
    <div className="seo-wrap">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div className="wrap">
        <InternalPagesNav current="seo" />

        <header className="hero">
          <span className="eyebrow">For Katarina — kort oversikt</span>
          <h1>SEO og vekst — hvor vi står nå</h1>
          <p className="lede">
            Søkeord, konkurrenter og anmeldelser. Den fulle kampanjeplanen — ansatte, tjenester,
            blogg, video-annonser og QR-kode for anmeldelser — ligger på{' '}
            <a href="/kampanje">/kampanje</a>.
          </p>
          <div className="meta-row">
            <span>somiklinikken.no</span>
            <span>Oppdatert 20. september 2026</span>
          </div>
        </header>

        <section>
          <div className="section-head">
            <h2>Prioriterte søkeord — fra Katarina</h2>
            <p>Rekkefølgen Katarina har satt selv. Disse styrer hva vi jobber med først, uavhengig av konkurransenivå.</p>
          </div>
          <div className="card">
            <ol className="priority-list">
              {priorityKeywords.map((k, i) => (
                <li className="priority-item" key={k.primary}>
                  <span className="priority-rank">{i + 1}</span>
                  <span className="priority-text">
                    {k.primary}
                    {k.alt && <span className="alt">{k.alt}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <div className="card">
            <ul className="summary-list">
              {summary.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Øvrige søkeord — nå, snart, senere</h2>
            <p>Research-basert prioritering utenom Katarinas liste over — hvilke søk vi jobber med når, og hvorfor.</p>
          </div>
          <div className="card">
            <div className="phase-list">
              {keywordTimeline.map((group) => (
                <div className="phase" key={group.when}>
                  <div className="when"><span className="num">{group.when}</span></div>
                  <div>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((it) => <li key={it.kw}><strong>{it.kw}</strong> — {it.why}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Konkurrenter</h2>
            <p>Hvem vi måler oss mot i Sandnes og Stavanger.</p>
          </div>
          <div className="card">
            <div className="comp-group">
              <h3>Sandnes</h3>
              <div className="tbl-wrap">
                <table className="comp-table">
                  <tbody>
                    <tr><th>Klinikk</th><th>Fokus</th><th>Notat</th></tr>
                    {sandnesCompetitors.map((c) => (
                      <tr key={c.name}><td className="name">{c.name}</td><td>{c.focus}</td><td className="note">{c.note}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="comp-group">
              <h3>Stavanger</h3>
              <div className="tbl-wrap">
                <table className="comp-table">
                  <tbody>
                    <tr><th>Klinikk</th><th>Fokus</th><th>Notat</th></tr>
                    {stavangerCompetitors.map((c) => (
                      <tr key={c.name}><td className="name">{c.name}</td><td>{c.focus}</td><td className="note">{c.note}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Anmeldelser</h2>
            <p>Antall Google-anmeldelser målt mot konkurrentene. Hvordan vi henter inn flere står i kampanjeplanen.</p>
          </div>
          <div className="card chart-card">
            <div className="chart-title-row">
              <h3>Antall Google-anmeldelser</h3>
              <div className="legend">
                <span className="key"><span className="swatch" style={{ background: 'var(--series-tx)' }} />SOMI Klinikken</span>
                <span className="key"><span className="swatch" style={{ background: 'var(--ink-muted)' }} />Konkurrent</span>
              </div>
            </div>
            <div className="rev-bars">
              <Bar label="Velbehag (Sandnes)" pct={100} color="var(--ink-muted)" value="264 · 4,9★" title="Velbehag: 264 anmeldelser, 4,9 stjerner" />
              <Bar label="Silkehud (Stavanger)" pct={23.1} color="var(--ink-muted)" value="61 · 4,9★" title="Silkehud: 61 anmeldelser, 4,9 stjerner" />
              <Bar label="SOMI Klinikken" pct={9.1} color="var(--series-tx)" value="24 · 5,0★" title="SOMI: 24 anmeldelser, 5,0 stjerner" />
            </div>
            <p className="note">
              SOMI har best snittscore, men Velbehag har mye høyere volum nå — det påvirker synligheten på
              Google Maps, ikke bare tilliten. Tallene er sist sjekket manuelt 27. august (ikke hentet via
              API — vi har ingen automatisk tilgang til Google sine tall) — gi beskjed om ferske tall når du
              har dem, så oppdaterer vi. Mål: +8–10 nye anmeldelser per måned, 40 innen utgangen av oktober,
              60 innen årsslutt. Se /kampanje for hvordan.
            </p>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Uutnyttede muligheter</h2>
            <p>Åpninger vi har funnet ved å se på hva konkurrentene faktisk synes for i søk.</p>
          </div>
          <div className="niche-grid">
            {niches.map((n) => (
              <div className="niche-card" key={n.title}>
                <span className="tag">{n.tag}</span>
                <h4>{n.title}</h4>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="page-footer">
          Sist oppdatert 20. september 2026 · Anmeldelsestall/konkurrentdata sist manuelt sjekket 27. august (uendret siden da) · Intern side, vises ikke i søk · Full kampanjeplan: <a href="/kampanje" style={{ color: 'inherit' }}>/kampanje</a>
        </footer>

      </div>
    </div>
  )
}
