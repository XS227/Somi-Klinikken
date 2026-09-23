import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import InternalPagesNav from '@/components/InternalPagesNav'

export const metadata: Metadata = {
  title: 'Kampanjeplan (internt) | SOMI Klinikken',
  description: 'Markedsføringskampanjen samlet: ansatte, tjenester, plattformer, blogg, video-annonser og anmeldelser.',
  robots: { index: false, follow: false },
}

const pageStyles = `
.kmp-wrap {
  --page:        #f7f2ee;
  --surface:     #fdfaf7;
  --surface-2:   #f1e6de;
  --ink:         #2b2320;
  --ink-2:       #6b5f59;
  --ink-muted:   #96897f;
  --hairline:    #e4d5c9;
  --brand-ink:   #7a3a4a;
  --accent:      #ddb3b3;
  --shadow: 0 1px 2px rgba(43,35,32,0.04), 0 6px 20px rgba(43,35,32,0.06);
  display: block;
  background: var(--page);
  color: var(--ink);
  font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
  line-height: 1.55;
}
@media (prefers-color-scheme: dark) {
  .kmp-wrap {
    --page: #16120f; --surface: #201a17; --surface-2: #291f1b;
    --ink: #f5efe9; --ink-2: #c9bcb2; --ink-muted: #8f8279; --hairline: #3a2f29;
    --brand-ink: #eecfd4; --accent: #a8425f;
    --shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.3);
  }
}
.kmp-wrap * { box-sizing: border-box; min-width: 0; }
.kmp-wrap { max-width: 100%; overflow-x: hidden; overflow-wrap: break-word; }
.kmp-wrap img, .kmp-wrap svg { max-width: 100%; }
.kmp-wrap .wrap { max-width: 860px; margin: 0 auto; padding: 56px 24px 96px; overflow-x: hidden; }
.kmp-wrap h1, .kmp-wrap h2, .kmp-wrap h3, .kmp-wrap h4 {
  font-family: Georgia, "Iowan Old Style", "Palatino Linotype", serif;
  font-weight: 400; color: var(--ink); margin: 0;
}
.kmp-wrap header.hero {
  display: flex; flex-direction: column; gap: 10px;
  background: var(--surface-2); color: var(--ink);
  border: 1px solid var(--hairline);
  padding: 34px 32px 30px; border-radius: 18px;
  margin-bottom: 40px; box-shadow: var(--shadow);
}
.kmp-wrap header.hero .eyebrow { font-size: 12.5px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--brand-ink); }
.kmp-wrap header.hero h1 { font-size: 32px; letter-spacing: 0.01em; color: var(--ink); }
.kmp-wrap header.hero p.lede { margin: 4px 0 0; color: var(--ink-2); font-size: 16.5px; max-width: 60ch; }
.kmp-wrap header.hero .meta-row { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--hairline); font-size: 13px; color: var(--ink-muted); }
.kmp-wrap header.hero a { color: var(--brand-ink); font-weight: 600; }
.kmp-wrap section { margin-bottom: 52px; }
.kmp-wrap section > .section-head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.kmp-wrap section > .section-head h2 { font-size: 22px; }
.kmp-wrap section > .section-head p { margin: 0; color: var(--ink-2); font-size: 15px; max-width: 62ch; }
.kmp-wrap .card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 14px; padding: 22px 24px; box-shadow: var(--shadow); }
.kmp-wrap .summary-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 14px; }
.kmp-wrap .summary-list li { padding-left: 22px; position: relative; font-size: 15px; }
.kmp-wrap .summary-list li::before { content: "→"; position: absolute; left: 0; color: var(--brand-ink); font-weight: 700; }
.kmp-wrap .callout { display: flex; gap: 12px; padding: 14px 16px; border-radius: 10px; background: var(--surface-2); border: 1px solid var(--hairline); font-size: 14px; color: var(--ink-2); margin-top: 18px; }
.kmp-wrap .callout .mark { color: var(--brand-ink); font-weight: 700; flex-shrink: 0; }
.kmp-wrap .callout.pending { background: rgba(221,179,179,0.18); border-color: var(--accent); }
.kmp-wrap .note { font-size: 12.5px; color: var(--ink-muted); margin-top: 14px; line-height: 1.5; }

/* Visuell flyt: bokser koblet med piler — viser hvordan delene henger sammen */
.kmp-wrap .flow { display: flex; align-items: stretch; gap: 10px; overflow-x: auto; padding: 4px 2px 12px; }
.kmp-wrap .flow-box {
  flex: 1 1 150px; min-width: 150px; background: var(--surface); border: 1px solid var(--hairline);
  border-radius: 12px; padding: 16px 14px; box-shadow: var(--shadow);
}
.kmp-wrap .flow-box .step-num {
  display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px;
  border-radius: 50%; background: var(--surface-2); color: var(--brand-ink); font-family: Georgia, serif;
  font-size: 12px; font-weight: 600; margin-bottom: 8px;
}
.kmp-wrap .flow-box h4 { font-size: 14.5px; font-weight: 600; font-family: inherit; margin-bottom: 4px; }
.kmp-wrap .flow-box p { margin: 0; font-size: 12.5px; color: var(--ink-2); line-height: 1.45; }
.kmp-wrap .flow-arrow { flex: 0 0 auto; display: flex; align-items: center; color: var(--brand-ink); font-size: 20px; padding: 0 2px; }
.kmp-wrap .flow-loop {
  margin-top: 14px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  font-size: 13px; color: var(--ink-2); background: var(--surface-2); border-radius: 10px; padding: 12px 14px;
}
.kmp-wrap .flow-loop strong { color: var(--ink); }
.kmp-wrap .flow-loop .arw { color: var(--brand-ink); font-weight: 700; }
@media (max-width: 720px) {
  .kmp-wrap .flow { flex-direction: column; overflow-x: visible; }
  .kmp-wrap .flow-arrow { transform: rotate(90deg); padding: 4px 0; align-self: center; }
}

/* Ansatte */
.kmp-wrap .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.kmp-wrap .team-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 14px; overflow: hidden; box-shadow: var(--shadow); }
.kmp-wrap .team-card .photo { position: relative; width: 100%; aspect-ratio: 4 / 5; background: var(--surface-2); }
.kmp-wrap .team-card .photo img { object-fit: cover; }
.kmp-wrap .team-card .body { padding: 14px 16px 18px; }
.kmp-wrap .team-card .tag { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--brand-ink); margin-bottom: 6px; }
.kmp-wrap .team-card h4 { font-size: 17px; margin-bottom: 2px; }
.kmp-wrap .team-card .role { font-size: 12.5px; color: var(--ink-2); margin-bottom: 10px; }
.kmp-wrap .team-card .content-role { font-size: 12.5px; color: var(--ink-2); border-top: 1px solid var(--hairline); padding-top: 10px; margin-top: 10px; }
.kmp-wrap .team-card .content-role strong { color: var(--ink); }

/* Tjenester / plattformer */
.kmp-wrap .chip-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.kmp-wrap .chip-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 14px 16px; }
.kmp-wrap .chip-card h4 { font-size: 14.5px; font-weight: 600; font-family: inherit; margin-bottom: 4px; }
.kmp-wrap .chip-card p { margin: 0; font-size: 12.5px; color: var(--ink-2); }
.kmp-wrap .chip-card .kw { display: inline-block; margin-top: 8px; font-size: 11px; color: var(--brand-ink); background: var(--surface-2); border-radius: 999px; padding: 3px 9px; }

.kmp-wrap .platform-list { display: flex; flex-direction: column; gap: 0; }
.kmp-wrap .platform-item { display: grid; grid-template-columns: 130px 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--hairline); }
.kmp-wrap .platform-item:last-child { border-bottom: none; }
.kmp-wrap .platform-item .p-name { font-weight: 600; font-size: 14.5px; color: var(--ink); }
.kmp-wrap .platform-item p { margin: 0; font-size: 13.5px; color: var(--ink-2); }

.kmp-wrap .blog-list { display: flex; flex-direction: column; gap: 0; }
.kmp-wrap .blog-item { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--hairline); font-size: 14px; }
.kmp-wrap .blog-item:last-child { border-bottom: none; }
.kmp-wrap .blog-item a { color: var(--ink); font-weight: 600; text-decoration: none; }
.kmp-wrap .blog-item a:hover { color: var(--brand-ink); }
.kmp-wrap .blog-item .status { font-size: 11.5px; color: var(--ink-muted); white-space: nowrap; }
.kmp-wrap .blog-item .status.todo { color: var(--brand-ink); font-weight: 600; }

.kmp-wrap .phase-list { display: flex; flex-direction: column; gap: 0; }
.kmp-wrap .phase { display: grid; grid-template-columns: 96px 1fr; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--hairline); }
.kmp-wrap .phase:last-child { border-bottom: none; padding-bottom: 0; }
.kmp-wrap .phase:first-child { padding-top: 0; }
.kmp-wrap .phase .when { font-size: 12.5px; color: var(--ink-muted); font-weight: 600; letter-spacing: 0.02em; padding-top: 3px; }
.kmp-wrap .phase .when .num { display: block; font-family: Georgia, serif; font-size: 22px; color: var(--brand-ink); font-weight: 400; line-height: 1; margin-bottom: 4px; }
.kmp-wrap .phase h3 { font-family: inherit; font-size: 16.5px; font-weight: 600; margin-bottom: 8px; color: var(--ink); }
.kmp-wrap .phase ul { margin: 0; padding-left: 18px; color: var(--ink-2); font-size: 14px; display: flex; flex-direction: column; gap: 5px; }
.kmp-wrap .phase ul li::marker { color: var(--brand-ink); }
.kmp-wrap .phase li strong { color: var(--ink); }

/* Videomanus — knapp per video, minimert som standard (native <details>, ingen JS nødvendig) */
.kmp-wrap .video-toggle-row { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
.kmp-wrap .video-toggle { border: 1px solid var(--hairline); border-radius: 12px; background: var(--surface); overflow: hidden; }
.kmp-wrap .video-toggle[open] { background: var(--surface-2); }
.kmp-wrap .video-toggle summary {
  cursor: pointer; list-style: none; display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px; font-weight: 600; font-size: 15px; color: var(--ink);
}
.kmp-wrap .video-toggle summary::-webkit-details-marker { display: none; }
.kmp-wrap .video-toggle summary .chev { color: var(--brand-ink); transition: transform 0.15s ease; font-size: 13px; }
.kmp-wrap .video-toggle[open] summary .chev { transform: rotate(180deg); }
.kmp-wrap .video-toggle summary:hover { color: var(--brand-ink); }
.kmp-wrap .video-toggle > .card { margin: 0 14px 14px; }

.kmp-wrap footer.page-footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid var(--hairline); font-size: 12.5px; color: var(--ink-muted); }
.kmp-wrap footer.page-footer a { color: inherit; }

@media (max-width: 640px) {
  .kmp-wrap .wrap { padding: 36px 16px 72px; }
  .kmp-wrap header.hero { padding: 26px 20px 22px; border-radius: 14px; }
  .kmp-wrap header.hero h1 { font-size: 25px; }
  .kmp-wrap .card { padding: 18px 16px; }
  .kmp-wrap .phase { grid-template-columns: 1fr; gap: 8px; }
  .kmp-wrap .platform-item { grid-template-columns: 1fr; gap: 4px; }
}
`

const whyItWorks = [
  'Vi starter der konkurrentene ikke er, ikke der de er sterkest: PRX-T33 og BioRePeel er nesten uclaimed i Sandnes — de raske gevinstene finansierer troverdigheten til å ta de tyngre søkeordene (microblading, permanent makeup) senere.',
  'Anmeldelsesgapet (24 mot Velbehags 264) er den største enkeltbremsen for Google Maps-synlighet — og den billigste å tette, siden SOMI allerede har best snittscore (5,0★). Det handler om volum, ikke kvalitet.',
  'Fem ansatte med reelle spesialistområder gir fem naturlige innholdsspor i stedet for én generisk klinikk-konto — hver video/blogginnlegg kobles til én ansatt, én behandling og ett prioritert søkeord, så innsatsen aldri spres tynt.',
  'Alt peker samme vei: blogg og video driver søketrafikk → anmeldelses-QR-en bygger tillit på Google Maps → begge drar folk mot booking. Ingen av delene står alene.',
]

const teamContent: {
  name: string
  role: string
  specialty: string
  photo: string
  contentRole: string
  status?: string
}[] = [
  {
    name: 'Katarina Hammer',
    role: 'Eier & daglig leder',
    specialty: 'Permanent makeup · Microblading, Powderbrows, Lipblush, Eyeliner',
    photo: '/img/team/katarina-hammer-permanent-makeup-somi-klinikken.webp',
    contentRole: 'Ansiktet utad i video 1 (klinikkintro) — naturlig neste steg er egen video/blogg om permanent makeup og microblading, de tyngste søkeordene på lang sikt.',
  },
  {
    name: 'Emma',
    role: 'Hudpleier',
    specialty: 'Dermalogica Expert · Medisinsk/klassisk hudpleie, PRX-T33, BioRePeel',
    photo: '/img/team/emma-hudpleier-dermalogica-somi-klinikken.webp',
    contentRole: 'Neste i videoserien etter Jane og Arianna — kobler direkte til de to nesten uclaimed søkeordene (PRX-T33, BioRePeel).',
  },
  {
    name: 'Arianna',
    role: 'Laserspesialist',
    specialty: 'Autorisert helsepersonell · Laser tatoveringsfjerning, laser hårfjerning',
    photo: '/img/team/arianna-laserspesialist-somi-klinikken.webp',
    contentRole: 'Video 3 (manus klart under) — laser tatoveringsfjerning er Katarinas høyest prioriterte søkeord.',
  },
  {
    name: 'Jane',
    role: 'Sykepleier',
    specialty: 'Kosmetisk sykepleie · Injeksjonsbehandlinger, naturlig foryngelse',
    photo: '/img/team/jane-sykepleier-kosmetisk-somi-klinikken.webp',
    contentRole: 'Ny ansatt. Bilde og bio er allerede live på /team. Video 2 (manus klart under) introduserer henne først — det haster mest å gi en helt ny ansatt egne kunder.',
    status: 'Ny — synlighet i gang',
  },
  {
    name: 'Irena',
    role: 'Intensivsykepleier',
    specialty: 'Estetisk medisin · Injeksjonsbehandlinger',
    photo: '/img/team/irena-intensivsykepleier-somi-klinikken.webp',
    contentRole: 'Ny ansatt. Bilde og bio er allerede live på /team. Egen video og blogginnlegg gjenstår — foreslått rekkefølge: rett etter Emma i videoserien.',
    status: 'Ny — synlighet i gang',
  },
]

const services: { name: string; slug: string; keyword?: string }[] = [
  { name: 'Gratis konsultasjon', slug: 'gratis-konsultasjon', keyword: 'Gratis konsultasjon hudpleie Sandnes' },
  { name: 'PRX-T33', slug: 'prx-t33', keyword: 'PRX-T33 Sandnes — nesten uclaimed' },
  { name: 'BioRePeel CL3', slug: 'biorepeel-cl3', keyword: 'BioRePeel Sandnes — nesten uclaimed' },
  { name: 'Laser tatoveringsfjerning', slug: 'laser-tattoo-removal', keyword: 'Laser tatoveringsfjerning — søkeord #1' },
  { name: 'Permanent makeup', slug: 'permanent-makeup', keyword: 'Permanent makeup / microblading' },
  { name: 'Injeksjonsbehandlinger', slug: 'injeksjonsbehandlinger', keyword: 'Rynkebehandling / filler' },
  { name: 'Laser hårfjerning', slug: 'laser-harfjerning', keyword: 'Laser hårfjerning' },
  { name: 'Medisinsk hudpleie', slug: 'medisinsk-hudpleie', keyword: 'Hudklinikk / hudpleie' },
  { name: 'Klassisk hudpleie', slug: 'klassisk-hudpleie' },
  { name: 'Hårfjerning — voks/elektrolyse', slug: 'harfjerning-voks-elektrolyse' },
]

const platforms: { name: string; role: string }[] = [
  { name: 'Google Søk', role: 'Hovedmålet for SEO-arbeidet — blogginnlegg og behandlingssider optimalisert mot de prioriterte søkeordene.' },
  { name: 'Google Business Profile / Maps', role: 'Der anmeldelsesgapet mot Velbehag faktisk avgjør synlighet — QR-koden under mater rett inn her.' },
  { name: 'Instagram (@somiklinikken)', role: 'Hovedkanal for de 30-sekunders videoene og korte behandlingsklipp.' },
  { name: 'Facebook', role: 'Samme innhold distribuert videre, når delvis en annen/eldre målgruppe enn Instagram.' },
  { name: 'Blogg (somiklinikken.no/blogg)', role: 'Dybdeinnhold som driver SEO og gir noe konkret å dele/lenke til i sosiale medier.' },
  { name: 'Booking (somi.bestille.no)', role: 'Der alt til slutt skal konvertere — hver video/blogginnlegg lenker hit, ikke bare forsiden.' },
]

const publishedPosts: { title: string; slug: string }[] = [
  { title: 'Laser tatoveringsfjerning i Sandnes', slug: 'laser-tattoo-removal-sandnes' },
  { title: 'Gratis konsultasjon hudpleie i Sandnes', slug: 'gratis-konsultasjon-hudpleie-sandnes' },
  { title: 'Microblading i Sandnes', slug: 'microblading-sandnes' },
  { title: 'Hudpleie med Dermalogica i Sandnes', slug: 'hudpleie-dermalogica-sandnes' },
  { title: 'PRX-T33 vs BioRePeel i Sandnes', slug: 'prx-t33-vs-biorepeel-sandnes' },
  { title: 'Injeksjonsbehandlinger i Sandnes', slug: 'injeksjonsbehandlinger-sandnes' },
  { title: 'Permanent makeup — naturlige bryn', slug: 'permanent-makeup-naturlige-bryn' },
  { title: 'Laser hårfjerning i Sandnes', slug: 'laser-harfjerning-sandnes' },
]

const draftPosts: { title: string; slug: string }[] = [
  { title: 'Møt Jane — kosmetisk sykepleie hos SOMI', slug: 'moet-jane-kosmetisk-sykepleie-somi' },
  { title: 'Møt Irena — estetisk medisin hos SOMI', slug: 'moet-irena-estetisk-medisin-somi' },
]

const videoFormat = [
  'Kildemateriale: Katarina har allerede en god del profesjonelt filmet video av ansatte, klinikken og behandlingene — Khabat har bedt henne dele filene. Dette bygges videre på i Higgsfield (klippes om, tekst/CTA byttes ut) i stedet for å animeres fra stillbilder — raskere og bedre kvalitet enn å begynne fra bunnen.',
  'Format: 9:16 vertikal (Reels/TikTok/Shorts), 30 sekunder, tekst brent inn på skjermen (de fleste ser uten lyd)',
  'Der det ikke finnes egnet råopptak for en scene, animeres et ekte stillbilde i stedet (subtil bevegelse, kamera-pan) — aldri syntetiske mennesker. Det skal se ekte ut, ikke kunstig',
  'Hver video kobler: 1 ansatt + deres spesialistområde + 1–2 av de prioriterte søkeordene, og avsluttes alltid med en tydelig book-time-CTA',
  'Fra og med video 2 lenker CTA til den ansattes egen bookinglenke/behandlingsside — ikke bare forsiden',
  'Rolig, varm musikk uten vokal (ikke konkurrere med voice-over), samme tone som resten av merkevaren',
]

const videoOneScript = [
  { when: '0:00–0:03', title: 'Åpning — logo over resepsjonen', visual: 'Ekte foto av inngang/resepsjon, animert med subtil kamerabevegelse', text: '«SOMI Klinikken – Sandnes»', vo: '«Velkommen til SOMI Klinikken.»' },
  { when: '0:03–0:08', title: 'Klinikken', visual: 'Rolig pan gjennom behandlingsrom/interiør', text: '—', vo: '«Et sted for trygge, skreddersydde behandlinger — midt i Sandnes.»' },
  { when: '0:08–0:13', title: 'Katarina — Permanent makeup', visual: 'Ekte bilde av Katarina i arbeid, animert til naturlig bevegelse', text: '«Permanent Makeup · Katarina»', vo: '«Fra permanent makeup…»' },
  { when: '0:13–0:18', title: 'Arianna — Laser tattoofjerning', visual: 'Klipp av laserbehandling, glir over i før/etter-bilde', text: '«Laser tatoveringsfjerning»', vo: '«…til laser tatoveringsfjerning…»' },
  { when: '0:18–0:22', title: 'Emma — PRX-T33 / BioRePeel', visual: 'Nærbilde av hudbehandling, myk glød-effekt', text: '«PRX-T33 · BioRePeel»', vo: '«…og avansert hudpleie.»' },
  { when: '0:22–0:26', title: 'Møt teamet', visual: 'Rask montasje: Jane, Irena og resten av teamet', text: '«Møt hele teamet»', vo: '«Hele teamet er klare for deg.»' },
  { when: '0:26–0:30', title: 'Avslutning — CTA', visual: 'Logo + roligt fade, bookinglenke vises på skjermen', text: '«Book time i dag → somiklinikken.no»', vo: '«Book din time hos SOMI Klinikken i Sandnes.»' },
]

const videoTwoScript = [
  { when: '0:00–0:03', title: 'Hook — møt den nye', visual: 'Ekte bilde av Jane, animert til et naturlig smil/nikk mot kamera', text: '«Ny hos SOMI 👋»', vo: '—' },
  { when: '0:03–0:10', title: 'Ansatt introduseres', visual: 'Ekte bilde/klipp av Jane på klinikken', text: '«Jane · Sykepleier, kosmetisk sykepleie»', vo: '«Jeg er Jane, sykepleier med videreutdanning i kosmetisk sykepleie.»' },
  { when: '0:10–0:20', title: 'Behandlingen', visual: 'Klipp/bilder av behandlingsrom og produkter knyttet til injeksjonsbehandling', text: '«Injeksjonsbehandling · Naturlig foryngelse»', vo: '«Jeg jobber med små, gjennomtenkte justeringer som fremhever dine egne trekk — aldri overdrevent, alltid naturlig.»' },
  { when: '0:20–0:26', title: 'Trygghet', visual: 'Rolig nærbilde, blikk mot kamera', text: '«Klinisk trygghet · Estetisk blikk»', vo: '«Med min helsefaglige bakgrunn får du klinisk trygghet gjennom hele behandlingen.»' },
  { when: '0:26–0:30', title: 'CTA', visual: 'Bookinglenke til Janes egen kalender vises (må hentes fra Katarina)', text: '«Book time hos Jane → somiklinikken.no»', vo: '«Book time hos Jane i dag.»' },
]

const videoThreeScript = [
  { when: '0:00–0:03', title: 'Hook — resultatet først', visual: 'Close-up av før/etter-bildet fra laser tattoofjerning-siden', text: '«Etter kun 2 behandlinger»', vo: '—' },
  { when: '0:03–0:10', title: 'Ansatt introduseres', visual: 'Ekte bilde/klipp av Arianna på klinikken', text: '«Arianna · Laserspesialist, autorisert helsepersonell»', vo: '«Jeg er Arianna, laserspesialist hos SOMI Klinikken.»' },
  { when: '0:10–0:20', title: 'Behandlingen', visual: 'Klipp av laserbehandling i praksis', text: '«Laser tattoofjerning Sandnes»', vo: '«Vi fjerner uønskede tatoveringer trygt og skånsomt — tilpasset din hud.»' },
  { when: '0:20–0:26', title: 'Trygghet', visual: 'Rolig nærbilde, blikk mot kamera', text: '«Huden først, alltid»', vo: '«Hudens helse er alltid førsteprioritet hos oss.»' },
  { when: '0:26–0:30', title: 'CTA', visual: 'Bookinglenke til laser tattoofjerning-siden vises', text: '«Book time hos Arianna → somiklinikken.no/behandlinger/laser-tattoo-removal»', vo: '«Book time hos Arianna i dag.»' },
]

const reviewGrowthPlan = [
  {
    when: 'Uke 1', title: 'Sett opp innsamlingen',
    items: [
      'QR-kode til Google-anmeldelser ved resepsjon/kortterminal — Katarinas eget forslag, og riktig plassering: det er akkurat der kunden står rett etter en god opplevelse',
      'Samme lenke i SMS/e-post rett etter fullført behandling, ikke bare ved booking',
      'Et kort standardmanus ansatte kan si muntlig rett etter behandling — dobler responsraten',
    ],
  },
  {
    when: 'Løpende', title: 'Timing',
    items: [
      'Spør 2–4 timer etter timen (når tilfredsheten er høyest), aldri i samme øyeblikk som betaling',
      'Én vennlig påminnelse etter 5 dager til de som ikke har svart',
    ],
  },
  {
    when: 'Husk', title: 'Innenfor Googles regler',
    items: [
      'Aldri tilby rabatt mot anmeldelse — det er brudd på Googles regler',
      'Spør alle systematisk, ikke bare de du tror blir fornøyde',
    ],
  },
  {
    when: 'Mål', title: 'Konkrete tall',
    items: [
      '+8–10 nye anmeldelser per måned er realistisk',
      '40 anmeldelser innen utgangen av oktober, 60 innen årsslutt',
    ],
  },
]

const plan = [
  {
    when: 'Uke 1–2', title: 'Nå',
    items: [
      'Skriv ut og sett opp QR-plakaten ved resepsjon/kortterminal — klar til utskrift, se under',
      'Publiser video 2 (Jane) og video 3 (Arianna) — manus er klare, se under',
      'Skriv «Møt Jane»- og «Møt Irena»-blogginnleggene',
    ],
  },
  {
    when: 'Uke 3–6', title: 'Snart',
    items: [
      'Video 4 — Emma (PRX-T33/BioRePeel), samme formel',
      'Første SMS/e-post-flow for anmeldelser satt opp',
      'Følg med på om PRX-T33/BioRePeel-artikkelen begynner å rangere (publisert, se /seo)',
    ],
  },
  {
    when: 'Måned 2–3', title: 'Bygg videre',
    items: [
      'Video 5 — Katarina (permanent makeup/microblading), video 6 — Irena (injeksjonsbehandlinger)',
      'Utvid kjernesidene (permanent makeup, microblading, laser hårfjerning) med FAQ og kundehistorier',
      'Jevnlig publisering fortsetter, ikke som enkeltstående kampanje',
    ],
  },
  {
    when: 'Løpende', title: 'Følg med',
    items: [
      'Anmeldelsestall og søkeordposisjoner spores på /seo',
      'Juster prioritet basert på hva som faktisk gir bookinger, ikke bare visninger',
    ],
  },
]

function VideoScript({
  button,
  title,
  note,
  scenes,
}: {
  button: string
  title: string
  note: string
  scenes: typeof videoOneScript
}) {
  return (
    <details className="video-toggle">
      <summary>
        <span>{button}</span>
        <span className="chev" aria-hidden="true">▾</span>
      </summary>
      <div className="card" style={{ marginTop: 12 }}>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, marginBottom: 4 }}>{title}</h3>
        <p className="note" style={{ marginTop: 0, marginBottom: 18 }}>{note}</p>
        <div className="phase-list">
          {scenes.map((scene) => (
            <div className="phase" key={scene.when}>
              <div className="when"><span className="num" style={{ fontSize: 15 }}>{scene.when}</span></div>
              <div>
                <h3>{scene.title}</h3>
                <ul>
                  <li><strong>Bilde:</strong> {scene.visual}</li>
                  <li><strong>Tekst på skjerm:</strong> {scene.text}</li>
                  <li><strong>Voice-over:</strong> {scene.vo}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </details>
  )
}

export default function KampanjePage() {
  return (
    <div className="kmp-wrap">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div className="wrap">
        <InternalPagesNav current="kampanje" />

        <header className="hero">
          <span className="eyebrow">For Katarina — hele kampanjen samlet</span>
          <h1>Kampanjeplan — vekst for SOMI Klinikken</h1>
          <p className="lede">
            Ansatte, tjenester, plattformer, blogg, video-annonser og anmeldelser — hvordan alt henger
            sammen, og hvorfor vi tror på denne planen. Tall og søkeordstatus ligger på{' '}
            <a href="/seo">/seo</a>.
          </p>
          <div className="meta-row">
            <span>somiklinikken.no</span>
            <span>Oppdatert 2. september 2026</span>
          </div>
        </header>

        <section>
          <div className="section-head">
            <h2>Hvordan planen henger sammen</h2>
            <p>Innhold og anmeldelser er to separate motorer som begge drar mot samme mål: flere bookinger.</p>
          </div>
          <div className="card">
            <div className="flow">
              <div className="flow-box">
                <span className="step-num">1</span>
                <h4>Ansatte + tjenester</h4>
                <p>5 ansatte, hver med eget spesialistområde koblet til et prioritert søkeord.</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-box">
                <span className="step-num">2</span>
                <h4>Innhold</h4>
                <p>Blogginnlegg + 30-sek. video, én ansatt og ett søkeord av gangen.</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-box">
                <span className="step-num">3</span>
                <h4>Synlighet i søk</h4>
                <p>Google Søk (SEO) og Instagram/Facebook — se /seo for status.</p>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-box">
                <span className="step-num">4</span>
                <h4>Booking</h4>
                <p>Hver video/artikkel lenker til riktig bookingside, ikke bare forsiden.</p>
              </div>
            </div>
            <div className="flow-loop">
              <strong>Den andre motoren:</strong>
              <span>Behandling</span><span className="arw">→</span>
              <span>QR-kode ved resepsjon</span><span className="arw">→</span>
              <span>Google-anmeldelse</span><span className="arw">→</span>
              <span>tetter gapet til Velbehag, styrker steg 3 over</span>
            </div>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Hvorfor denne planen vil funke</h2>
          </div>
          <div className="card">
            <ul className="summary-list">
              {whyItWorks.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Ansatte vi bruker</h2>
            <p>Fem ekte ansatte, fem ekte spesialistområder — ikke én generisk klinikk-stemme. Bilder er de samme som på /team.</p>
          </div>
          <div className="team-grid">
            {teamContent.map((t) => (
              <div className="team-card" key={t.name}>
                <div className="photo">
                  <Image src={t.photo} alt={t.name} fill sizes="220px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="body">
                  {t.status && <span className="tag">{t.status}</span>}
                  <h4>{t.name}</h4>
                  <p className="role">{t.role} · {t.specialty}</p>
                  <p className="content-role"><strong>Rolle i kampanjen:</strong> {t.contentRole}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="callout">
            <span className="mark">→</span>
            <span>En sjette behandler er fortsatt «kommer snart» på /team (navn/bilde ikke klart) — legges til her så snart det er avklart.</span>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Tjenester</h2>
            <p>De faktiske behandlingssidene på somiklinikken.no/behandlinger, med søkeordet de er koblet til der det finnes.</p>
          </div>
          <div className="chip-grid">
            {services.map((s) => (
              <div className="chip-card" key={s.slug}>
                <h4>{s.name}</h4>
                {s.keyword && <span className="kw">{s.keyword}</span>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Plattformer</h2>
            <p>Hvor kampanjen faktisk leves ut, og hvilken jobb hver kanal gjør.</p>
          </div>
          <div className="card">
            <div className="platform-list">
              {platforms.map((p) => (
                <div className="platform-item" key={p.name}>
                  <span className="p-name">{p.name}</span>
                  <p>{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Blogginnlegg</h2>
            <p>8 innlegg er allerede publisert. To er skrevet ferdig som kladd — introduksjon av de nye ansatte — og venter kun på et klarsignal.</p>
          </div>
          <div className="card">
            <div className="blog-list">
              {publishedPosts.map((p) => (
                <div className="blog-item" key={p.slug}>
                  <a href={`/blogg/${p.slug}`}>{p.title}</a>
                  <span className="status">Publisert</span>
                </div>
              ))}
              {draftPosts.map((p) => (
                <div className="blog-item" key={p.slug}>
                  <a href={`/blogg/${p.slug}`}>{p.title}</a>
                  <span className="status todo">Kladd — kun synlig via denne lenken</span>
                </div>
              ))}
            </div>
          </div>
          <div className="callout">
            <span className="mark">→</span>
            <span>
              Begge er skrevet ferdig og lagt inn i /admin som «Publisert offentlig: av» — de vises altså
              ikke i blogglisten, på forsiden eller i sitemap ennå, kun via lenkene over. Kryss av «Publisert
              offentlig» i Payload-admin (Innhold → Posts) når dere vil at de skal gå live, og juster
              publiseringsdatoen samtidig.
            </span>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>30-sekunders videoannonser</h2>
            <p>
              Video 1 er en gratis «se hva som er mulig»-video som viser frem klinikken bredt. Fra video 2
              følger vi en fast formel: én ansatt, deres spesialistområde og de prioriterte søkeordene,
              alltid med en direkte bookinglenke.
            </p>
          </div>
          <div className="card">
            <ul className="summary-list">
              {videoFormat.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="video-toggle-row">
            <VideoScript
              button="Video 1 — Klinikkintro"
              title="Video 1 — «Se hva SOMI kan gjøre» (gratis demo)"
              note="Formål: vise frem hele klinikken og teamet bredt, før vi går videre til den faste serien."
              scenes={videoOneScript}
            />
            <VideoScript
              button="Video 2 — Jane"
              title="Video 2 — Jane · Kosmetisk sykepleie (første i den faste serien)"
              note="Ny ansatt introduseres først — haster mest akkurat nå. Bruker Janes ekte bilde. Mangler: Janes egen bookinglenke og litt råvideo av henne på klinikken."
              scenes={videoTwoScript}
            />
            <VideoScript
              button="Video 3 — Arianna"
              title="Video 3 — Arianna · Laser tattoofjerning Sandnes"
              note="Bruker før/etter-bildet fra behandlingssiden. Neste i serien: Emma (PRX-T33/BioRePeel) → Katarina (permanent makeup/microblading) → Irena (injeksjonsbehandlinger)."
              scenes={videoThreeScript}
            />
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Anmeldelser og QR-koden</h2>
            <p>Katarinas eget forslag: en QR-kode ved resepsjonen som kundene kan skanne rett etter behandling for å legge igjen en Google-anmeldelse.</p>
          </div>
          <div className="card" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <Image
              src="/branding/qr/anmeldelse-plakat-a5.png"
              alt="Oppslagsplakat med QR-kode til Google-anmeldelser"
              width={220}
              height={312}
              style={{ width: 140, height: 'auto', borderRadius: 8, border: '1px solid var(--hairline)' }}
            />
            <div style={{ flex: '1 1 260px' }}>
              <strong style={{ display: 'block', marginBottom: 6 }}>Klar til utskrift.</strong>
              <span>
                QR-koden går rett til «skriv anmeldelse»-siden for Somi Klinikken AS (ikke bare Maps-oppføringen)
                — hentet fra Google-stedets egen ID, testet at den faktisk avkoder korrekt til riktig lenke.
                Ferdig A5-plakat i SOMI-farger, pluss selve QR-koden alene, ligger klare til nedlasting på{' '}
                <a href="/branding" style={{ color: 'inherit', fontWeight: 600 }}>/branding</a>.
              </span>
            </div>
          </div>
          <div className="card" style={{ marginTop: 16 }}>
            <div className="phase-list">
              {reviewGrowthPlan.map((p) => (
                <div className="phase" key={p.title}>
                  <div className="when"><span className="num" style={{ fontSize: 15 }}>{p.when}</span></div>
                  <div>
                    <h3>{p.title}</h3>
                    <ul>
                      {p.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Plan fremover</h2>
            <p>I rekkefølge — hver bygger på at forrige er på plass.</p>
          </div>
          <div className="card">
            <div className="phase-list">
              {plan.map((p, i) => (
                <div className="phase" key={p.title}>
                  <div className="when"><span className="num">{i + 1}</span>{p.when}</div>
                  <div>
                    <h3>{p.title}</h3>
                    <ul>
                      {p.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="page-footer">
          Sist oppdatert 2. september 2026 · Intern side, vises ikke i søk · Søkeordstatus: <a href="/seo">/seo</a> · Merkevare og nedlastinger: <a href="/branding">/branding</a>
        </footer>

      </div>
    </div>
  )
}
