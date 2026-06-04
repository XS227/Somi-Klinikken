/**
 * Populates puckData for each page from the original HTML source content.
 * Run: node seed-puck.mjs
 */

import { MongoClient } from 'mongodb'

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1/somi-klinikken'
const DB_NAME = DATABASE_URL.split('/').pop().split('?')[0]
const BOOKING = 'https://somi.bestille.no/'

let _id = 1
const uid = (type) => `${type}-${_id++}`

// ─── Page definitions ─────────────────────────────────────────────────────────

const pages = {

  // ── Om oss ─────────────────────────────────────────────────────────────────
  om: {
    content: [
      {
        type: 'Hero',
        props: {
          id: uid('Hero'),
          kicker: 'Om SOMI Klinikken',
          heading: 'where simplicity meets precision',
          subheading: 'Din trygghet, vår faglige styrke',
          body: 'Somi Klinikken er bygget på solid faglig kompetanse og et tett tverrfaglig samarbeid, hvor flere spesialister jobber tett sammen for å gi helhetlige og trygge vurderinger. Hos oss tilpasses hver behandling individuelt, med fokus på kvalitet, presisjon og naturlige resultater.',
          buttons: [
            { label: 'Book time',      url: BOOKING,            primary: true  },
            { label: 'Møt teamet',     url: '/team',            primary: false },
            { label: 'Se priser',      url: '/priser',          primary: false },
          ],
          features: [
            { kicker: 'Naturlige resultater', title: 'Et uttrykk som passer deg',      desc: 'Vi jobber i små steg og med helhetlig tilnærming for å fremheve det du allerede har – uten «overbehandlet» preg.' },
            { kicker: 'Trygg oppfølging',     title: 'Kontroll og forutsigbarhet',     desc: 'Journalføring, informasjon og etterkontroll er en del av behandlingsløpet – slik at du føler deg trygg hele veien.' },
            { kicker: 'Sentral beliggenhet',  title: 'Midt i Sandnes',                 desc: 'Klinikken ligger i hjertet av Sandnes, med korte avstander til både parkering og kollektivtransport.' },
          ],
          quote: '«Altså hvordan skal jeg forklare at hver speil jeg passerer så må jeg se meg selv og beundrer meg selv! Formen er flott, den får ansiktet mitt til å gløde... Fantastisk service!! Tusen, tusen takk Katarina!!!»',
          quoteAuthor: 'Kasjost Asi · ★★★★★',
        },
      },
      {
        type: 'RichText',
        props: {
          id: uid('RichText'),
          content: `
<div style="display:grid;grid-template-columns:420px 1fr;gap:18px;align-items:center;border-radius:22px;background:rgba(255,255,255,0.76);border:1px solid rgba(56,56,56,0.12);box-shadow:0 14px 34px rgba(0,0,0,0.08);overflow:hidden;">
  <div style="overflow:hidden;">
    <img src="/assets/img/Katarina-jobber.jpg" alt="Katarina i arbeid hos SOMI Klinikken i Sandnes" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;min-height:280px;" />
  </div>
  <div style="padding:18px;">
    <div style="letter-spacing:.18em;font-size:12px;text-transform:uppercase;color:rgba(56,56,56,.62);">Katarina · eier og daglig leder</div>
    <h2 style="font-family:Georgia,serif;font-size:34px;line-height:1.08;margin:8px 0 10px;">Trygg veiledning og faglig presisjon</h2>
    <p style="color:rgba(56,56,56,.74);line-height:1.65;margin:0;">SOMI ble etablert for å gi et rolig, trygt og faglig sterkt tilbud innen estetisk medisin. Vi legger vekt på tydelig informasjon og riktig forventningsstyring, slik at du vet hva som er realistisk – og hva som passer deg.</p>
    <p style="color:rgba(56,56,56,.74);line-height:1.65;margin:10px 0 0;">Vi følger gjeldende retningslinjer, benytter dokumenterte produkter og deltar jevnlig på kurs og faglige samlinger. Det sikrer oppdaterte teknikker og gode sikkerhetsrutiner.</p>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
      <a href="${BOOKING}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;padding:9px 18px;border-radius:999px;background:rgba(92,92,92,0.95);color:#fff;text-decoration:none;font-size:14px;">Bestill time</a>
      <a href="/kontakt" style="display:inline-flex;align-items:center;padding:9px 18px;border-radius:999px;background:rgba(255,255,255,0.80);border:1px solid rgba(56,56,56,0.15);color:rgba(56,56,56,.9);text-decoration:none;font-size:14px;">Kontakt</a>
      <a href="/team" style="display:inline-flex;align-items:center;padding:9px 18px;border-radius:999px;background:rgba(255,255,255,0.80);border:1px solid rgba(56,56,56,0.15);color:rgba(56,56,56,.9);text-decoration:none;font-size:14px;">Bli kjent med teamet</a>
    </div>
  </div>
</div>`,
        },
      },
      {
        type: 'RichText',
        props: {
          id: uid('RichText'),
          content: `
<div style="border-radius:22px;background:rgba(255,255,255,0.76);border:1px solid rgba(56,56,56,0.12);box-shadow:0 14px 34px rgba(0,0,0,0.08);padding:18px;">
  <div style="letter-spacing:.18em;font-size:12px;text-transform:uppercase;color:rgba(56,56,56,.62);">Klinikken</div>
  <h2 style="font-family:Georgia,serif;font-size:34px;line-height:1.08;margin:8px 0 10px;">Et rolig miljø – rent og profesjonelt</h2>
  <p style="color:rgba(56,56,56,.74);line-height:1.65;margin:0 0 14px;">Et glimt fra lokalene og behandlingene hos oss – lyst, rolig og tilpasset deg.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
    <figure style="margin:0;border-radius:18px;overflow:hidden;border:1px solid rgba(56,56,56,0.10);background:rgba(255,255,255,0.70);">
      <img src="/p/produktveg.JPG" alt="Lyst og rolig klinikkinteriør" loading="lazy" style="width:100%;height:220px;object-fit:cover;display:block;" />
      <figcaption style="padding:10px 12px;color:rgba(56,56,56,.68);font-size:14px;">Klinikkinteriør</figcaption>
    </figure>
    <figure style="margin:0;border-radius:18px;overflow:hidden;border:1px solid rgba(56,56,56,0.10);background:rgba(255,255,255,0.70);">
      <img src="/p/pmukatarina.JPG" alt="Illustrasjon av skjønnhetsbehandling" loading="lazy" style="width:100%;height:220px;object-fit:cover;display:block;" />
      <figcaption style="padding:10px 12px;color:rgba(56,56,56,.68);font-size:14px;">Behandling</figcaption>
    </figure>
    <figure style="margin:0;border-radius:18px;overflow:hidden;border:1px solid rgba(56,56,56,0.10);background:rgba(255,255,255,0.70);">
      <img src="/p/somifolk.jpg" alt="Illustrasjon av konsultasjon" loading="lazy" style="width:100%;height:220px;object-fit:cover;display:block;" />
      <figcaption style="padding:10px 12px;color:rgba(56,56,56,.68);font-size:14px;">Konsultasjon</figcaption>
    </figure>
  </div>
</div>`,
        },
      },
      {
        type: 'ContactInfo',
        props: {
          id: uid('ContactInfo'),
          phone: '+47 929 39 171',
          email: 'post@somiklinikken.no',
          address: 'Langgata 31',
          city: '4306 Sandnes',
          hours: 'Klinikken er åpen etter avtale.',
          mapEmbed: 'https://www.google.com/maps?q=Langgata%2031%2C%204306%20Sandnes&output=embed',
        },
      },
    ],
    root: { props: {} },
  },

  // ── Team ───────────────────────────────────────────────────────────────────
  team: {
    content: [
      {
        type: 'Hero',
        props: {
          id: uid('Hero'),
          kicker: 'Teamet vårt',
          heading: 'Møt menneskene bak SOMI',
          subheading: '',
          body: 'Hos SOMI møter du et dedikert fagteam som kombinerer trygg veiledning, presise behandlinger og personlig oppfølging.',
          buttons: [],
          features: [],
          quote: '',
          quoteAuthor: '',
        },
      },
      {
        type: 'TeamGrid',
        props: {
          id: uid('TeamGrid'),
          members: [
            {
              name: 'Katarina Hammer',
              role: 'Eier og daglig leder',
              bio: 'Katarina Hammer er eier og daglig leder av Somi Klinikken AS, med over 13 års erfaring innen permanent makeup. Hun er kjent for presis teknikk og naturlige, harmoniske resultater.',
              bio2: 'For Katarina handler permanent makeup om å forsterke det naturlige – aldri å dominere, men å skape balanse, helhet og et tidløst uttrykk. Hennes arbeid er preget av høy faglig kvalitet, estetisk forståelse og et gjennomført øye for detaljer.',
              quote: '«For meg er dette mer enn et yrke – det er en lidenskap. Jeg er til stede i hvert eneste arbeid, med et sterkt engasjement for å skape resultater som oppleves som både naturlige og selvtillitsstyrkende.»',
              imageSrc: '/assets/img/team/katarina.svg',
              ctaLabel: 'Bestill time hos Katarina',
              ctaUrl: BOOKING,
              featured: true,
            },
            {
              name: 'Arianna',
              role: 'Laserspesialist',
              bio: 'Jeg er autorisert helsepersonell med videreutdanning som laserspesialist i henhold til strålevernforskriften §13. Jeg har videre fordypet meg gjennom avanserte kurs innen laserbehandling, under veiledning av anerkjente fagpersoner med lang klinisk erfaring.',
              bio2: 'Jeg legger stor vekt på presisjon, kvalitet og kontinuerlig faglig utvikling, og arbeider etter høye standarder for å sikre trygge, skreddersydde og effektive behandlinger. Min filosofi er å kombinere faglig ekspertise med en rolig og tillitsfull tilnærming.',
              quote: '',
              imageSrc: '/assets/img/team/arianna.svg',
              ctaLabel: 'Bestill konsultasjon hos Arianna',
              ctaUrl: BOOKING,
              featured: false,
            },
            {
              name: 'Emma',
              role: 'Hudterapeut',
              bio: 'Jeg er utdannet hudpleier med videreutdanning som Dermalogica Expert. Gjennom egne erfaringer med hudutfordringer og behandling med isotretinoin har jeg utviklet en dyp forståelse og et sterkt engasjement for hudhelse.',
              bio2: 'Jeg har en brennende interesse for faget og er opptatt av å tilpasse behandlinger etter hver enkelt kundes behov. I tillegg tilbyr jeg bryns- og vippebehandlinger samt permanent makeup, med fokus på naturlige og harmoniske resultater.',
              quote: '',
              imageSrc: '/assets/img/team/emma.svg',
              ctaLabel: 'Bestill konsultasjon hos Emma',
              ctaUrl: BOOKING,
              featured: false,
            },
          ],
        },
      },
    ],
    root: { props: {} },
  },

  // ── Resultater ─────────────────────────────────────────────────────────────
  resultater: {
    content: [
      {
        type: 'Hero',
        props: {
          id: uid('Hero'),
          kicker: 'Resultater',
          heading: 'Resultater behandling',
          subheading: '',
          body: 'Et galleri med bilder og video fra ulike behandlinger hos SOMI Klinikken.',
          buttons: [],
          features: [],
          quote: '',
          quoteAuthor: '',
        },
      },
      {
        type: 'Gallery',
        props: {
          id: uid('Gallery'),
          albums: [
            {
              title: 'Lipblush',
              items: [
                { mediaType: 'img',   src: '/p/Lipblush1.jpg',   alt: 'Lipblush resultat 1' },
                { mediaType: 'img',   src: '/p/Lipblush.jpg',    alt: 'Lipblush resultat 2' },
                { mediaType: 'video', src: '/v/Lipblush2.mp4',   alt: '' },
              ],
            },
            {
              title: 'PMU laser behandling',
              items: [
                { mediaType: 'img',   src: '/p/pmu-laser.jpg',   alt: 'PMU laser behandling' },
                { mediaType: 'img',   src: '/p/Pmu-remove.jpg',  alt: 'PMU removal' },
              ],
            },
            {
              title: 'Vipperstyling',
              items: [
                { mediaType: 'video', src: '/v/vipper.mp4',       alt: '' },
              ],
            },
            {
              title: 'Brynstyling',
              items: [
                { mediaType: 'video', src: '/v/brynstyling.mp4',  alt: '' },
              ],
            },
            {
              title: 'Tattoo removal laser behandling',
              items: [
                { mediaType: 'video', src: '/v/tattolaser.mp4',   alt: '' },
              ],
            },
          ],
        },
      },
    ],
    root: { props: {} },
  },

  // ── Blogg ──────────────────────────────────────────────────────────────────
  blogg: {
    content: [
      {
        type: 'Hero',
        props: {
          id: uid('Hero'),
          kicker: 'Blogg',
          heading: 'Nyttig før du bestiller',
          subheading: '',
          body: 'Korte artikler om forberedelser, etterbehandling og ofte stilte spørsmål.',
          buttons: [
            { label: 'Book time', url: BOOKING, primary: true },
          ],
          features: [],
          quote: '',
          quoteAuthor: '',
        },
      },
      {
        type: 'BlogList',
        props: {
          id: uid('BlogList'),
          posts: [
            { kicker: 'Bryn',         title: 'Microblading: før og etter behandling',       desc: 'Hva du bør vite før du bestiller, og hvordan du tar vare på brynene etterpå.',                         href: '/blogg/microblading-for-og-etter' },
            { kicker: 'Permanent makeup', title: 'Permanent makeup: forventninger og resultat', desc: 'Hvordan prosessen foregår og hva som er normalt i helingsfasen.',                                   href: '/blogg/permanent-makeup-forventninger' },
            { kicker: 'Vipper',       title: 'Vippeløft: hvor lenge varer det?',             desc: 'Varighet, vedlikehold og tips for best mulig resultat.',                                               href: '/blogg/vippeloft-varighet' },
            { kicker: 'Hudpleie',     title: 'Få maks ut av Dermalogica-behandlingen din',   desc: 'Rutiner og produkter som forlenger gløden etter klinikkbesøket.',                                     href: '/blogg/dermalogica-etterbehandling' },
            { kicker: 'Trygghet',     title: 'Slik jobber vi med hygiene og sikkerhet',      desc: 'Fra sterile nåler til hudanalyse – dette gjør vi for at du skal føle deg trygg.',                    href: '/blogg/hygiene-og-sikkerhet' },
            { kicker: 'Forberedelser',title: 'Velg riktig brynbehandling for deg',           desc: 'Når passer microblading, hybrid-bryn eller farging – og hva bør du spørre om?',                      href: '/blogg/velg-riktig-brynbehandling' },
          ],
        },
      },
    ],
    root: { props: {} },
  },

  // ── Kontakt ────────────────────────────────────────────────────────────────
  kontakt: {
    content: [
      {
        type: 'Hero',
        props: {
          id: uid('Hero'),
          kicker: 'Kontakt',
          heading: 'Ta kontakt eller bestill time',
          subheading: '',
          body: 'Klinikken er åpen etter avtale. For raskest mulig booking: bruk Book time. Ønsker du hjelp til å velge behandling? Ta kontakt – vi svarer så fort vi kan.',
          buttons: [
            { label: 'Book time',       url: BOOKING,                       primary: true  },
            { label: 'Send e-post',     url: 'mailto:post@somiklinikken.no', primary: false },
            { label: 'Se priser',       url: '/priser',                     primary: false },
            { label: 'Behandlinger',    url: '/behandlinger',               primary: false },
          ],
          features: [],
          quote: '',
          quoteAuthor: '',
        },
      },
      {
        type: 'ContactInfo',
        props: {
          id: uid('ContactInfo'),
          phone: '+47 929 39 171',
          email: 'post@somiklinikken.no',
          address: 'Langgata 31',
          city: '4306 Sandnes',
          hours: 'Klinikken er åpen etter avtale. Se alle tilgjengelige tider i onlinebooking eller ta kontakt for timebestilling.',
          mapEmbed: 'https://www.google.com/maps?q=Langgata%2031%2C%204306%20Sandnes&output=embed',
        },
      },
    ],
    root: { props: {} },
  },

  // ── Gavekort ───────────────────────────────────────────────────────────────
  gavekort: {
    content: [
      {
        type: 'Hero',
        props: {
          id: uid('Hero'),
          kicker: 'Gavekort',
          heading: 'Gi bort en opplevelse',
          subheading: '',
          body: 'Et gavekort fra SOMI Klinikken er en gave som varer. Velg en behandling eller gi et beløp – mottakeren velger selv hva som passer best.',
          buttons: [
            { label: 'Bestill gavekort', url: BOOKING, primary: true },
          ],
          features: [],
          quote: '',
          quoteAuthor: '',
        },
      },
      {
        type: 'GiftCard',
        props: {
          id: uid('GiftCard'),
          intro: 'Alle gavekort er gyldige i 12 måneder fra kjøpsdato. Vi tilbyr gavekort på spesifikke behandlinger eller valgfritt beløp.',
          options: [
            { label: 'Valgfritt beløp',  price: 'Fra kr 500',  desc: 'Mottakeren velger behandling selv.' },
            { label: 'Lipblush',          price: 'Kr 3 500',   desc: 'Inkluderer grunnbehandling og etterfylling.' },
            { label: 'Microblading',      price: 'Kr 3 800',   desc: 'Naturlig fylt utseende for brynene.' },
            { label: 'Vippeløft',         price: 'Kr 950',     desc: 'Inkluderer vippefarging.' },
            { label: 'Hudpleiebehandling',price: 'Fra kr 800', desc: 'Tilpasset din hudtype av Dermalogica Expert.' },
            { label: 'Laserbehandling',   price: 'Fra kr 900', desc: 'Konsultasjon inkludert.' },
          ],
          note: 'Gavekort kan ikke løses inn mot kontanter og er ikke refunderbare. Gyldige i 12 måneder fra kjøpsdato.',
          ctaLabel: 'Bestill gavekort',
          ctaUrl: BOOKING,
        },
      },
    ],
    root: { props: {} },
  },
}

// ─── Write to MongoDB ─────────────────────────────────────────────────────────

const client = new MongoClient(DATABASE_URL)
await client.connect()
const col = client.db(DB_NAME).collection('pages')

for (const [slug, puckData] of Object.entries(pages)) {
  const result = await col.updateOne(
    { slug },
    { $set: { puckData } },
  )
  if (result.matchedCount === 0) {
    console.log(`⚠  No page found with slug "${slug}" — skipping`)
  } else {
    console.log(`✓  ${slug} — ${puckData.content.length} components`)
  }
}

await client.close()
console.log('\nDone. Open /admin → Pages to see the populated canvases.')
process.exit(0)
