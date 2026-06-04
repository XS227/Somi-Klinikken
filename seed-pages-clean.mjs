/**
 * seed-pages-clean.mjs
 * Seeder alle 9 Puck-sider med innhold som matcher live frontend.
 * Kjør: node seed-pages-clean.mjs
 */
import { MongoClient } from 'mongodb'

const BOOKING   = '/booking'
const BESTILLE  = 'https://somi.bestille.no/OnCust2/#!/'
const GAVEKORT_BESTILLE = 'https://somi.bestille.no/OnCust2/#!/giftcertificatepurchase/'

// ── Helpers ────────────────────────────────────────────────────────────────────
const puck = (content) => ({ root: { props: {} }, content })
const id   = (type, slug, n) => `${type}-${slug}-${n}`

// ── A) HOME ───────────────────────────────────────────────────────────────────
const homePage = {
  slug: 'home', title: 'Hjemside',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','home',1),
        kicker: 'where simplicity meets precision',
        heading: 'Skånsomme behandlinger med presisjon og naturlig uttrykk.',
        subheading: '',
        body: 'Vi legger vekt på kvalitet, veiledning og riktig behandling for et trygt og profesjonelt resultat.',
        buttons: [
          { label: 'Book gratis konsultasjon', url: BOOKING, primary: true },
          { label: 'Se behandlinger', url: '/behandlinger', primary: false },
        ],
        features: [
          { kicker: 'kr',  title: 'Priser',   desc: 'Tydelige priser på alle behandlinger.' },
          { kicker: '📅',  title: 'Booking',  desc: 'Book time direkte i vår kalender.' },
          { kicker: '🎁',  title: 'Gavekort', desc: 'Gi bort en opplevelse fra SOMI.' },
        ],
        quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'Hero',
      props: {
        id: id('Hero','home',2),
        kicker: 'Behandlinger',
        heading: 'Hva kan vi gjøre for deg?',
        subheading: '',
        body: '',
        buttons: [{ label: 'Se alle behandlinger', url: '/behandlinger', primary: false }],
        features: [
          { kicker: 'PMU',    title: 'Permanent Makeup',       desc: 'Microblading, Powderbrows, Lipblush, Eyeliner.' },
          { kicker: 'Laser',  title: 'Laser hårfjerning',      desc: 'Permanent og effektiv hårfjerning med laser.' },
          { kicker: 'Laser',  title: 'Laser tatovering',       desc: 'Fjern uønskede tatoveringer trygt og sikkert.' },
          { kicker: 'Injeks', title: 'Injeksjonsbehandlinger', desc: 'Botox og fillers for naturlig foryngelse.' },
          { kicker: 'Hud',    title: 'Medisinsk hudpleie',     desc: 'Profesjonell behandling med Dermalogica.' },
          { kicker: 'Hud',    title: 'Klassisk hudpleie',      desc: 'Ansiktsbehandlinger tilpasset din hudtype.' },
          { kicker: 'Bryn',   title: 'Bryn & vipper',          desc: 'Farging, forming og vippeløft.' },
          { kicker: 'Voks',   title: 'Hårfjerning voks',       desc: 'Voks og elektrolyse for glatt hud.' },
        ],
        quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'TeamGrid',
      props: {
        id: id('TeamGrid','home',3),
        members: [
          {
            name: 'Katarina Hammer', role: 'Eier & Permanent Makeup Artist', featured: true,
            bio:  'Katarina Hammer er eier og daglig leder av Somi Klinikken AS, med over 13 års erfaring innen permanent makeup. Hun er kjent for presis teknikk og naturlige, harmoniske resultater.',
            bio2: 'Hun spesialiserer seg i Microblading, Powderbrows, Lipblush og Eyeliner – alle utført med fokus på å fremheve klientens naturlige trekk.',
            quote: '', imageSrc: '/img/team/katarina-hammer-permanent-makeup-somi-klinikken.webp',
            ctaLabel: 'Book time', ctaUrl: BOOKING,
          },
          {
            name: 'Emma', role: 'Hudpleier · Dermalogica Expert', featured: false,
            bio:  'Emma er utdannet hudpleier med videreutdanning som Dermalogica Expert. Gjennom egne erfaringer med hudutfordringer har hun utviklet en dyp forståelse for hudhelse.',
            bio2: 'Hun tilpasser behandlinger etter hver enkelt kundes behov, og tilbyr også bryns- og vippebehandlinger.',
            quote: '', imageSrc: '/img/team/emma-hudpleier-dermalogica-somi-klinikken.webp',
            ctaLabel: 'Book time', ctaUrl: BOOKING,
          },
          {
            name: 'Arianna', role: 'Laserspesialist', featured: false,
            bio:  'Arianna er autorisert helsepersonell med videreutdanning som laserspesialist. Hun arbeider etter høye standarder med fokus på presisjon og kvalitet.',
            bio2: '', quote: '',
            imageSrc: '/img/team/arianna-laserspesialist-somi-klinikken.webp',
            ctaLabel: 'Book time', ctaUrl: BOOKING,
          },
        ],
      },
    },
    {
      type: 'BlogList',
      props: {
        id: id('BlogList','home',4),
        posts: [
          { kicker: 'Microblading',      title: 'Microblading i Sandnes – alt du trenger å vite',             desc: 'Hva er microblading og hvem passer det for? Vi svarer på de vanligste spørsmålene.',       href: '/blogg/microblading-sandnes' },
          { kicker: 'Permanent Makeup',  title: 'Permanent Makeup – naturlige bryn tilpasset deg',             desc: 'Forskjellen mellom microblading og powderbrows, og hva som passer best for deg.',          href: '/blogg/permanent-makeup-naturlige-bryn' },
          { kicker: 'Laser hårfjerning', title: 'Laser hårfjerning i Sandnes – permanent løsning',            desc: 'Alt du trenger å vite om laserbehandling for permanent hårfjerning.',                      href: '/blogg/laser-harfjerning-sandnes' },
          { kicker: 'Tattoo removal',    title: 'Fjern tatovering med laser i Sandnes',                        desc: 'Slik fungerer laserbehandling for tatoveringsfjerning hos SOMI Klinikken.',               href: '/blogg/laser-tattoo-removal-sandnes' },
          { kicker: 'Injeksjoner',       title: 'Injeksjonsbehandlinger i Sandnes – naturlig foryngelse',      desc: 'Botox og fillers for et naturlig og harmonisk resultat.',                                  href: '/blogg/injeksjonsbehandlinger-sandnes' },
          { kicker: 'Hudpleie',          title: 'Profesjonell hudpleie med Dermalogica i Sandnes',             desc: 'Hva gjør Dermalogica-behandlinger spesielle, og hvem passer de for?',                    href: '/blogg/hudpleie-dermalogica-sandnes' },
        ],
      },
    },
    {
      type: 'ContactInfo',
      props: {
        id: id('ContactInfo','home',5),
        phone: '+47 929 39 171', email: 'post@somiklinikken.no',
        address: 'Langgata 31', city: '4306 Sandnes', hours: 'Åpent etter avtale',
        mapEmbed: 'https://www.google.com/maps?q=Langgata+31,+4306+Sandnes&output=embed',
      },
    },
  ]),
}

// ── B) GAVEKORT ───────────────────────────────────────────────────────────────
const gavekortPage = {
  slug: 'gavekort', title: 'Gavekort',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','gavekort',1),
        kicker: 'SOMI Klinikken',
        heading: 'Gavekort',
        subheading: '',
        body: 'Gi bort en opplevelse – et gavekort til SOMI Klinikken er den perfekte gaven til den som har alt.',
        buttons: [
          { label: 'Kjøp gavekort nå', url: GAVEKORT_BESTILLE, primary: true },
          { label: 'Se behandlinger',  url: '/behandlinger',   primary: false },
        ],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'GiftCard',
      props: {
        id: id('GiftCard','gavekort',2),
        intro: 'Alle gavekort er gyldige i 12 måneder fra kjøpsdato. Velg et spesifikt gavekort eller gi et valgfritt beløp – mottakeren bestemmer selv.',
        options: [
          { label: 'Valgfritt beløp',   price: 'Fra kr 500',  desc: 'Mottakeren velger behandling selv.' },
          { label: 'Lipblush',           price: 'Kr 3 500',    desc: 'Inkluderer grunnbehandling og etterfylling.' },
          { label: 'Microblading',       price: 'Kr 3 800',    desc: 'Naturlig fylt utseende for brynene.' },
          { label: 'Vippeløft',          price: 'Kr 950',      desc: 'Inkluderer vippefarging.' },
          { label: 'Hudpleiebehandling', price: 'Fra kr 800',  desc: 'Tilpasset din hudtype av Dermalogica Expert.' },
          { label: 'Laserbehandling',    price: 'Fra kr 900',  desc: 'Konsultasjon inkludert.' },
        ],
        note: 'Gavekort kan ikke løses inn mot kontanter og er ikke refunderbare. Gyldige i 12 måneder fra kjøpsdato.',
        ctaLabel: 'Bestill gavekort', ctaUrl: GAVEKORT_BESTILLE,
      },
    },
    {
      type: 'Hero',
      props: {
        id: id('Hero','gavekort',3),
        kicker: '',
        heading: 'Hvorfor gavekort?',
        subheading: '',
        body: '',
        buttons: [],
        features: [
          { kicker: '✦', title: 'Valgfri verdi',      desc: 'Velg ønsket beløp – gavekortet dekker alle priser, store som små.' },
          { kicker: '◇', title: 'Alle behandlinger',  desc: 'Gjelder hele menyen: microblading, hudpleie, laser, bryn, vipper og mer.' },
          { kicker: '◯', title: 'Enkelt å løse inn',  desc: 'Mottakeren bruker gavekortet ved booking – raskt og enkelt online.' },
        ],
        quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'Hero',
      props: {
        id: id('Hero','gavekort',4),
        kicker: 'Slik fungerer det',
        heading: 'Enkelt fra A til Å',
        subheading: '',
        body: '',
        buttons: [
          { label: 'Kjøp gavekort nå', url: GAVEKORT_BESTILLE, primary: true },
          { label: 'Book vanlig time',  url: BOOKING,           primary: false },
        ],
        features: [
          { kicker: '01', title: 'Kjøp gavekortet',   desc: 'Velg beløp og betal trygt online. Du mottar gavekortet på e-post.' },
          { kicker: '02', title: 'Send til mottaker', desc: 'Send gavekortet direkte eller skriv det ut og gi det i hånden.' },
          { kicker: '03', title: 'Nyt behandlingen',  desc: 'Mottakeren bestiller time online og bruker gavekortet ved betaling.' },
        ],
        quote: 'Kjøp gavekortet på under ett minutt',
        quoteAuthor: 'Betales trygt online – gavekortet sendes på e-post.',
      },
    },
  ]),
}

// ── C) KONTAKT ────────────────────────────────────────────────────────────────
const kontaktPage = {
  slug: 'kontakt', title: 'Kontakt',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','kontakt',1),
        kicker: 'Vi hører fra deg',
        heading: 'Kontakt oss',
        subheading: '',
        body: 'Ta kontakt med SOMI Klinikken – vi svarer raskt og hjelper deg gjerne med spørsmål om behandlinger og booking.',
        buttons: [{ label: 'Book time', url: BOOKING, primary: true }],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'ContactInfo',
      props: {
        id: id('ContactInfo','kontakt',2),
        phone: '+47 929 39 171', email: 'post@somiklinikken.no',
        address: 'Langgata 31', city: '4306 Sandnes', hours: 'Åpent etter avtale',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2039.4!2d5.7358005!3d58.8526394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463a35b4e6e9d8b9%3A0x1234567890abcdef!2sLanggata%2031%2C%204306%20Sandnes!5e0!3m2!1sno!2sno!4v1234567890',
      },
    },
  ]),
}

// ── D) OM OSS ─────────────────────────────────────────────────────────────────
const omPage = {
  slug: 'om', title: 'Om oss',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','om',1),
        kicker: 'Om klinikken',
        heading: 'Om SOMI Klinikken',
        subheading: '',
        body: 'Et dedikert klinikksenter i hjertet av Sandnes, med spesialisering i permanent makeup, microblading, hudpleie og laserbehandlinger.',
        buttons: [
          { label: 'Book konsultasjon', url: BOOKING,  primary: true },
          { label: 'Møt teamet',        url: '/team',  primary: false },
        ],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'Gallery',
      props: {
        id: id('Gallery','om',2),
        albums: [{
          title: 'SOMI Klinikken',
          items: [
            { mediaType: 'img', src: '/img/klinikk/somi-klinikken-interior-sandnes.webp',          alt: 'SOMI Klinikken interiør – moderne klinikk i Sandnes sentrum' },
            { mediaType: 'img', src: '/img/klinikk/somi-klinikken-behandlingsrom.webp',             alt: 'Behandlingsrom hos SOMI Klinikken' },
            { mediaType: 'img', src: '/img/klinikk/somi-klinikken-kunde-microblading-behandling.webp', alt: 'Kunde under microblading-behandling' },
          ],
        }],
      },
    },
    {
      type: 'Hero',
      props: {
        id: id('Hero','om',3),
        kicker: 'Tall og fakta',
        heading: 'Erfaring du kan stole på',
        subheading: '',
        body: '',
        buttons: [],
        features: [
          { kicker: '13+',    title: 'Års erfaring',            desc: 'Katarina Hammer har over 13 år innen permanent makeup.' },
          { kicker: '3',      title: 'Spesialister',            desc: 'Dedikerte fagpersoner med spesialkompetanse.' },
          { kicker: '100%',   title: 'Individuell tilpasning',  desc: 'Hver behandling tilpasses din hudtype og dine ønsker.' },
          { kicker: '4306',   title: 'Sandnes',                 desc: 'Langgata 31, sentralt i Sandnes.' },
        ],
        quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'Hero',
      props: {
        id: id('Hero','om',4),
        kicker: 'Vår filosofi',
        heading: 'Naturlig skjønnhet – din beste versjon',
        subheading: '',
        body: 'Hos SOMI Klinikken tror vi at skjønnhet handler om å forsterke det du allerede har. Vi jobber aldri for dramatiske resultater – men for presise, naturlige og varige uttrykk som speiler deg.',
        buttons: [{ label: 'Book gratis konsultasjon', url: BOOKING, primary: true }],
        features: [], quote: '', quoteAuthor: '',
      },
    },
  ]),
}

// ── E) PRISER ─────────────────────────────────────────────────────────────────
const priserPage = {
  slug: 'priser', title: 'Priser',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','priser',1),
        kicker: 'Transparent prissetting',
        heading: 'Ryddig oversikt over priser',
        subheading: '',
        body: 'Vi har tydelige priser på alle behandlinger. Book en gratis konsultasjon hvis du er usikker på hva som passer for deg.',
        buttons: [{ label: 'Book gratis konsultasjon', url: BOOKING, primary: true }],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'Hero',
      props: {
        id: id('Hero','priser',2),
        kicker: 'Behandlingskategorier',
        heading: 'Hva koster det?',
        subheading: '',
        body: '',
        buttons: [{ label: 'Se alle behandlinger', url: '/behandlinger', primary: false }],
        features: [
          { kicker: 'PMU',       title: 'Permanent Makeup',       desc: 'Microblading fra kr 3 800 · Powderbrows fra kr 3 800 · Lipblush fra kr 3 500' },
          { kicker: 'Laser',     title: 'Laser hårfjerning',      desc: 'Fra kr 500 per sone – pakker tilgjengelig.' },
          { kicker: 'Laser',     title: 'Laser tatovering',       desc: 'Fra kr 500 per behandling.' },
          { kicker: 'Injeks',    title: 'Injeksjonsbehandlinger', desc: 'Botox fra kr 1 500 · Fillers fra kr 2 500' },
          { kicker: 'Hudpleie',  title: 'Hudpleie',               desc: 'Klassisk fra kr 800 · Medisinsk fra kr 900' },
          { kicker: 'Bryn',      title: 'Bryn & vipper',          desc: 'Vippeløft kr 950 · Brynlaminering kr 850' },
        ],
        quote: '', quoteAuthor: '',
      },
    },
  ]),
}

// ── F) RESULTATER ─────────────────────────────────────────────────────────────
const resultaterPage = {
  slug: 'resultater', title: 'Resultater',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','resultater',1),
        kicker: 'Galleri',
        heading: 'Resultater',
        subheading: '',
        body: 'Naturlige, harmoniske resultater er kjernen i alt vi gjør. Her ser du et utvalg fra behandlingene våre – microblading, permanent makeup og mer.',
        buttons: [
          { label: 'Book time',       url: BOOKING,          primary: true  },
          { label: 'Se behandlinger', url: '/behandlinger',  primary: false },
        ],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'Gallery',
      props: {
        id: id('Gallery','resultater',2),
        albums: [{
          title: 'Behandlingsresultater',
          items: [
            { mediaType: 'img', src: '/img/resultater/pmu-permanent-makeup-resultat-somi-sandnes-1.webp',    alt: 'PMU permanent makeup resultat – naturlige bryn hos SOMI Klinikken i Sandnes' },
            { mediaType: 'img', src: '/img/resultater/microblading-foer-etter-resultat-somi-2.webp',         alt: 'Microblading før og etter resultat hos SOMI Klinikken Sandnes' },
            { mediaType: 'img', src: '/img/resultater/permanent-makeup-bryn-resultat-somi-3.webp',           alt: 'Permanent makeup bryn resultat hos SOMI Klinikken' },
            { mediaType: 'img', src: '/img/resultater/microblading-naturlige-bryn-somi-sandnes-4.webp',      alt: 'Microblading naturlige bryn hos SOMI Klinikken Sandnes' },
            { mediaType: 'img', src: '/img/resultater/pmu-resultat-kvinner-somi-klinikken-5.webp',           alt: 'PMU resultat kvinner hos SOMI Klinikken' },
            { mediaType: 'img', src: '/img/resultater/behandlingsresultat-permanent-makeup-somi-6.webp',     alt: 'Behandlingsresultat permanent makeup hos SOMI Klinikken i Sandnes' },
          ],
        }],
      },
    },
  ]),
}

// ── G) TEAM ───────────────────────────────────────────────────────────────────
const teamPage = {
  slug: 'team', title: 'Team',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','team',1),
        kicker: 'Menneskene bak SOMI',
        heading: 'TEAM SOMI',
        subheading: '',
        body: 'Møt teamet hos SOMI Klinikken – eksperter innen permanent makeup, hudpleie og laserbehandlinger.',
        buttons: [{ label: 'Book time', url: BOOKING, primary: true }],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'TeamGrid',
      props: {
        id: id('TeamGrid','team',2),
        members: [
          {
            name: 'Katarina Hammer', role: 'Eier & Daglig leder', featured: true,
            bio:  'Katarina Hammer er eier og daglig leder av Somi Klinikken AS, med over 13 års erfaring innen permanent makeup. Hun er kjent for presis teknikk og naturlige, harmoniske resultater.',
            bio2: 'For Katarina handler faget om å forsterke det naturlige med balanse, helhet og et tidløst uttrykk. Hun spesialiserer seg i Microblading, Powderbrows, Lipblush og Eyeliner.',
            quote: '', imageSrc: '/img/team/katarina-hammer-permanent-makeup-somi-klinikken.webp',
            ctaLabel: 'Book time', ctaUrl: BOOKING,
          },
          {
            name: 'Emma', role: 'Hudpleier · Dermalogica Expert', featured: false,
            bio:  'Emma er utdannet hudpleier med videreutdanning som Dermalogica Expert. Gjennom egne erfaringer med hudutfordringer og behandling med isotretinoin har hun utviklet en dyp forståelse for hudhelse.',
            bio2: 'Hun tilpasser behandlinger etter hver enkelt kundes behov, og tilbyr også bryns- og vippebehandlinger samt permanent makeup.',
            quote: '', imageSrc: '/img/team/emma-hudpleier-dermalogica-somi-klinikken.webp',
            ctaLabel: 'Book time', ctaUrl: BOOKING,
          },
          {
            name: 'Arianna', role: 'Autorisert helsepersonell · Laserspesialist', featured: false,
            bio:  'Arianna er autorisert helsepersonell med videreutdanning som laserspesialist. Hun har fordypet seg gjennom avanserte kurs innen laserbehandling.',
            bio2: 'Hun arbeider etter høye standarder med fokus på presisjon, kvalitet og kontinuerlig faglig utvikling.',
            quote: '', imageSrc: '/img/team/arianna-laserspesialist-somi-klinikken.webp',
            ctaLabel: 'Book time', ctaUrl: BOOKING,
          },
        ],
      },
    },
  ]),
}

// ── H) BLOGG ──────────────────────────────────────────────────────────────────
const bloggPage = {
  slug: 'blogg', title: 'Blogg',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','blogg',1),
        kicker: 'Faglige artikler og råd',
        heading: 'Nyttig før du bestiller',
        subheading: '',
        body: 'Les om behandlinger, råd og tips fra teamet hos SOMI Klinikken i Sandnes.',
        buttons: [{ label: 'Book time', url: BOOKING, primary: true }],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'BlogList',
      props: {
        id: id('BlogList','blogg',2),
        posts: [
          { kicker: 'Microblading',      title: 'Microblading i Sandnes – alt du trenger å vite',             desc: 'Hva er microblading, og hvem passer det for? Vi svarer på de vanligste spørsmålene.',       href: '/blogg/microblading-sandnes' },
          { kicker: 'Permanent Makeup',  title: 'Permanent Makeup – naturlige bryn tilpasset deg',             desc: 'Forskjellen mellom microblading og powderbrows.',                                          href: '/blogg/permanent-makeup-naturlige-bryn' },
          { kicker: 'Laser hårfjerning', title: 'Laser hårfjerning i Sandnes – permanent løsning',            desc: 'Alt du trenger å vite om laserbehandling for permanent hårfjerning.',                      href: '/blogg/laser-harfjerning-sandnes' },
          { kicker: 'Tattoo removal',    title: 'Fjern tatovering med laser i Sandnes',                        desc: 'Slik fungerer laserbehandling for tatoveringsfjerning.',                                   href: '/blogg/laser-tattoo-removal-sandnes' },
          { kicker: 'Injeksjoner',       title: 'Injeksjonsbehandlinger i Sandnes – naturlig foryngelse',      desc: 'Botox og fillers for et naturlig og harmonisk resultat.',                                  href: '/blogg/injeksjonsbehandlinger-sandnes' },
          { kicker: 'Hudpleie',          title: 'Profesjonell hudpleie med Dermalogica i Sandnes',             desc: 'Hva gjør Dermalogica-behandlinger spesielle?',                                            href: '/blogg/hudpleie-dermalogica-sandnes' },
        ],
      },
    },
  ]),
}

// ── I) BOOKING ────────────────────────────────────────────────────────────────
const bookingPage = {
  slug: 'booking', title: 'Booking',
  puckData: puck([
    {
      type: 'Hero',
      props: {
        id: id('Hero','booking',1),
        kicker: 'SOMI Klinikken',
        heading: 'Book time',
        subheading: '',
        body: 'Velg behandling og book time direkte i vår kalender. Gratis konsultasjon inkludert ved første besøk.',
        buttons: [{ label: 'Åpne booking', url: BESTILLE, primary: true }],
        features: [], quote: '', quoteAuthor: '',
      },
    },
    {
      type: 'RichText',
      props: {
        id: id('RichText','booking',2),
        content: `<div style="margin:0 0 8px;font-size:13px;color:rgba(56,56,56,0.6);letter-spacing:0.04em;text-transform:uppercase">Booking-system</div>
<iframe
  src="${BESTILLE}"
  width="100%"
  height="900"
  style="border:0;border-radius:16px;min-height:900px;display:block"
  title="Book time hos SOMI Klinikken"
  loading="lazy"
></iframe>`,
      },
    },
  ]),
}

// ── Write to MongoDB ──────────────────────────────────────────────────────────
const pages = [homePage, gavekortPage, kontaktPage, omPage, priserPage, resultaterPage, teamPage, bloggPage, bookingPage]

async function run() {
  const client = new MongoClient('mongodb://127.0.0.1/somi-klinikken')
  await client.connect()
  const col = client.db('somi-klinikken').collection('pages')

  const now = new Date()
  for (const page of pages) {
    const doc = {
      slug:      page.slug,
      title:     page.title,
      puckData:  page.puckData,
      createdAt: now,
      updatedAt: now,
    }
    await col.insertOne(doc)
    const sections = page.puckData.content.map(s => s.type).join(', ')
    console.log(`✓ ${page.slug.padEnd(12)} (${page.puckData.content.length} seksjoner: ${sections})`)
  }

  const total = await col.countDocuments()
  console.log(`\nTotalt ${total} pages i MongoDB.`)
  await client.close()
}
run().catch(console.error)
