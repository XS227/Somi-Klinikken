/**
 * Seed CMS pages for SOMI Klinikken with layout blocks.
 * Run: node seed-pages.mjs
 */

import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const BOOKING = 'https://somi.bestille.no/'

const pages = [

  // ── Om oss ─────────────────────────────────────────────────────────────────
  {
    title: 'Om oss',
    slug: 'om',
    meta: {
      title: 'Om SOMI Klinikken i Sandnes | Trygg veiledning og naturlige resultater',
      description: 'Om SOMI Klinikken i Sandnes: Vi kombinerer medisinsk kompetanse med estetisk blikk og tilbyr trygg oppfølging og naturlige resultater.',
    },
    layout: [
      {
        blockType: 'hero',
        kicker: 'Om SOMI Klinikken',
        heading: 'where simplicity meets precision',
        subheading: 'Din trygghet, vår faglige styrke',
        body: 'Somi Klinikken er bygget på solid faglig kompetanse og et tett tverrfaglig samarbeid, hvor flere spesialister jobber tett sammen for å gi helhetlige og trygge vurderinger. Hos oss tilpasses hver behandling individuelt, med fokus på kvalitet, presisjon og naturlige resultater.',
        buttons: [
          { label: 'Book time', url: BOOKING, primary: true },
          { label: 'Møt teamet', url: '/team', primary: false },
          { label: 'Se priser', url: '/priser', primary: false },
        ],
        features: [
          {
            kicker: 'Naturlige resultater',
            title: 'Et uttrykk som passer deg',
            desc: 'Vi jobber i små steg og med helhetlig tilnærming for å fremheve det du allerede har – uten «overbehandlet» preg.',
          },
          {
            kicker: 'Trygg oppfølging',
            title: 'Kontroll og forutsigbarhet',
            desc: 'Journalføring, informasjon og etterkontroll er en del av behandlingsløpet – slik at du føler deg trygg hele veien.',
          },
          {
            kicker: 'Sentral beliggenhet',
            title: 'Midt i Sandnes',
            desc: 'Klinikken ligger i hjertet av Sandnes, med korte avstander til både parkering og kollektivtransport.',
          },
        ],
        quote: '«Altså hvordan skal jeg forklare at hver speil jeg passerer så må jeg se meg selv og beundrer meg selv! Formen er flott, den får ansiktet mitt til å gløde... Fantastisk service!! Tusen, tusen takk Katarina!!!»',
        quoteAuthor: 'Kasjost Asi · ★★★★★',
      },
      {
        blockType: 'contactInfo',
        phone: '+47 929 39 171',
        email: 'post@somiklinikken.no',
        address: 'Langgata 31',
        city: '4307 Sandnes',
        hours: 'Klinikken er åpen etter avtale.',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2046.3!2d5.735!3d58.852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463a35db!2sSandnes!5e0!3m2!1sno!2sno!4v1',
      },
    ],
  },

  // ── Team ───────────────────────────────────────────────────────────────────
  {
    title: 'Team',
    slug: 'team',
    meta: {
      title: 'Team | SOMI Klinikken',
      description: 'Møt menneskene bak SOMI Klinikken i Sandnes. Et dedikert fagteam med fokus på trygg veiledning, presise behandlinger og personlig oppfølging.',
    },
    layout: [
      {
        blockType: 'hero',
        kicker: 'Teamet vårt',
        heading: 'Møt menneskene bak SOMI',
        body: 'Hos SOMI møter du et dedikert fagteam som kombinerer trygg veiledning, presise behandlinger og personlig oppfølging.',
      },
      {
        blockType: 'teamGrid',
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
            bio2: 'Jeg legger stor vekt på presisjon, kvalitet og kontinuerlig faglig utvikling, og arbeider etter høye standarder for å sikre trygge, skreddersydde og effektive behandlinger.',
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
            imageSrc: '/assets/img/team/emma.svg',
            ctaLabel: 'Bestill konsultasjon hos Emma',
            ctaUrl: BOOKING,
            featured: false,
          },
        ],
      },
    ],
  },

  // ── Resultater ─────────────────────────────────────────────────────────────
  {
    title: 'Resultater',
    slug: 'resultater',
    meta: {
      title: 'Resultater behandling | SOMI Klinikken',
      description: 'Se resultater fra behandlinger hos SOMI Klinikken. Galleri med bilder og video fra ulike behandlinger.',
    },
    layout: [
      {
        blockType: 'hero',
        kicker: 'Resultater',
        heading: 'Se hva vi har skapt',
        body: 'Et utvalg bilder og videoer fra behandlinger utført hos SOMI Klinikken. Alle resultater er naturlige og tilpasset den enkelte kunde.',
      },
      {
        blockType: 'gallery',
        albums: [
          {
            title: 'Lipblush',
            items: [
              { mediaType: 'img', src: '/p/Lipblush1.jpg', alt: 'Lipblush resultat 1' },
              { mediaType: 'img', src: '/p/Lipblush.jpg', alt: 'Lipblush resultat 2' },
              { mediaType: 'video', src: '/v/Lipblush2.mp4' },
            ],
          },
          {
            title: 'PMU laser behandling',
            items: [
              { mediaType: 'img', src: '/p/pmu-laser.jpg', alt: 'PMU laser behandling' },
              { mediaType: 'img', src: '/p/Pmu-remove.jpg', alt: 'PMU removal' },
            ],
          },
          {
            title: 'Vipperstyling',
            items: [
              { mediaType: 'video', src: '/v/vipper.mp4' },
            ],
          },
          {
            title: 'Microblading',
            items: [
              { mediaType: 'img', src: '/p/microblading1.jpg', alt: 'Microblading resultat' },
              { mediaType: 'video', src: '/v/microblading.mp4' },
            ],
          },
          {
            title: 'Bryn PMU',
            items: [
              { mediaType: 'img', src: '/p/bryn-pmu.jpg', alt: 'Bryn PMU' },
              { mediaType: 'video', src: '/v/bryn-pmu.mp4' },
            ],
          },
        ],
      },
    ],
  },

  // ── Blogg ──────────────────────────────────────────────────────────────────
  {
    title: 'Blogg',
    slug: 'blogg',
    meta: {
      title: 'Blogg | SOMI Klinikken Sandnes',
      description: 'Blogg fra SOMI Klinikken i Sandnes: forberedelser, etterbehandling og vanlige spørsmål før du bestiller time.',
    },
    layout: [
      {
        blockType: 'hero',
        kicker: 'Blogg',
        heading: 'Tips, råd og innsikt',
        body: 'Her deler vi kunnskap om behandlingene våre, forberedelser, etterbehandling og vanlige spørsmål fra kunder.',
        buttons: [
          { label: 'Book time', url: BOOKING, primary: true },
        ],
      },
      {
        blockType: 'blogList',
        posts: [
          {
            kicker: 'Bryn',
            title: 'Microblading: før og etter behandling',
            desc: 'Hva du bør vite før du bestiller, og hvordan du tar vare på brynene etterpå.',
            href: '/blogg/microblading-for-og-etter',
          },
          {
            kicker: 'Permanent makeup',
            title: 'Permanent makeup: forventninger og resultat',
            desc: 'Hvordan prosessen foregår og hva som er normalt i helingsfasen.',
            href: '/blogg/permanent-makeup-forventninger',
          },
          {
            kicker: 'Vipper',
            title: 'Vippeløft: hvor lenge varer det?',
            desc: 'Varighet, vedlikehold og tips for best mulig resultat.',
            href: '/blogg/vippeloft-varighet',
          },
          {
            kicker: 'Laser',
            title: 'Laserbehandling: hva du bør vite',
            desc: 'Forberedelser, smertenivå og hva du kan forvente etter laserbehandling.',
            href: '/blogg/laserbehandling-guide',
          },
          {
            kicker: 'Hud',
            title: 'Hudpleie etter behandling',
            desc: 'Enkle rutiner som hjelper huden din å restituere seg best mulig.',
            href: '/blogg/hudpleie-etter-behandling',
          },
        ],
      },
    ],
  },

  // ── Kontakt ────────────────────────────────────────────────────────────────
  {
    title: 'Kontakt',
    slug: 'kontakt',
    meta: {
      title: 'Kontakt | SOMI Klinikken Sandnes – bestill time eller ta kontakt',
      description: 'Kontakt SOMI Klinikken i Sandnes. Finn adresse, telefon, e-post og åpningstider.',
    },
    layout: [
      {
        blockType: 'hero',
        kicker: 'Kontakt',
        heading: 'Ta kontakt eller bestill time',
        body: 'Klinikken er åpen etter avtale. For raskest mulig booking: bruk Book time.',
        buttons: [
          { label: 'Book time', url: BOOKING, primary: true },
        ],
      },
      {
        blockType: 'contactInfo',
        phone: '+47 929 39 171',
        email: 'post@somiklinikken.no',
        address: 'Langgata 31',
        city: '4307 Sandnes',
        hours: 'Klinikken er åpen etter avtale. Vi svarer på henvendelser i åpningstiden.',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2046.3!2d5.735!3d58.852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463a35db!2sSandnes!5e0!3m2!1sno!2sno!4v1',
      },
    ],
  },

  // ── Gavekort ───────────────────────────────────────────────────────────────
  {
    title: 'Gavekort',
    slug: 'gavekort',
    meta: {
      title: 'Gavekort | SOMI Klinikken',
      description: 'Gi bort en opplevelse hos SOMI Klinikken i Sandnes. Book et gavekort til noen du er glad i.',
    },
    layout: [
      {
        blockType: 'hero',
        kicker: 'Gavekort',
        heading: 'Gi bort en opplevelse',
        body: 'Et gavekort fra SOMI Klinikken er en gave som varer. Velg en behandling eller gi et beløp – mottakeren velger selv hva som passer best.',
      },
      {
        blockType: 'giftCard',
        intro: 'Alle gavekort er gyldige i 12 måneder fra kjøpsdato. Vi tilbyr gavekort på spesifikke behandlinger eller valgfritt beløp.',
        options: [
          {
            label: 'Valgfritt beløp',
            price: 'Fra kr 500',
            desc: 'Mottakeren velger behandling selv.',
          },
          {
            label: 'Lipblush',
            price: 'Kr 3 500',
            desc: 'Inkluderer grunnbehandling og etterfylling.',
          },
          {
            label: 'Microblading',
            price: 'Kr 3 800',
            desc: 'Naturlig fylt utseende for brynene.',
          },
          {
            label: 'Vippeløft',
            price: 'Kr 950',
            desc: 'Inkluderer vippefarging.',
          },
        ],
        note: 'Gavekort kan ikke løses inn mot kontanter og er ikke refunderbare. Gyldige i 12 måneder.',
        ctaLabel: 'Bestill gavekort',
        ctaUrl: BOOKING,
      },
    ],
  },

  // ── Priser (kept as dedicated route, just ensure Payload record exists) ────
  {
    title: 'Priser',
    slug: 'priser',
    meta: {
      title: 'Priser | SOMI Klinikken Sandnes',
      description: 'Oversikt over priser på behandlinger hos SOMI Klinikken i Sandnes.',
    },
    layout: [],
  },

  // ── Behandlinger (kept as dedicated route) ─────────────────────────────────
  {
    title: 'Behandlinger',
    slug: 'behandlinger',
    meta: {
      title: 'Behandlinger | SOMI Klinikken Sandnes',
      description: 'Oversikt over behandlinger hos SOMI Klinikken i Sandnes.',
    },
    layout: [],
  },
]

// ─── Upsert all pages ─────────────────────────────────────────────────────────

const payload = await getPayload({ config })

for (const page of pages) {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: page.slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: page,
    })
    console.log(`Updated: /${page.slug}`)
  } else {
    await payload.create({ collection: 'pages', data: page })
    console.log(`Created: /${page.slug}`)
  }
}

console.log('Done.')
process.exit(0)
