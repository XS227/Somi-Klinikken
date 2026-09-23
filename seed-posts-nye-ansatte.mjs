// Seed script – 2 blogginnlegg som introduserer de nye ansatte Jane og Irena.
// Satt inn som UPUBLISERT (published: false) — synlig kun via direkte lenke,
// ikke i blogglisten/forsiden/sitemap før Katarina/Khabat gir klarsignal, se
// planen i /kampanje. Sett `published: true` (eller kryss av i /admin) og
// juster publishedDate når dere er klare til å publisere.
// Run: node seed-posts-nye-ansatte.mjs
import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb'

const url = process.env.DATABASE_URL || 'mongodb://127.0.0.1/somi-klinikken'
const dbName = new URL(url.replace('mongodb://', 'http://')).pathname.slice(1) || 'somi-klinikken'

function makeContent(sections) {
  const children = []
  for (const sec of sections) {
    if (sec.heading) {
      children.push({
        type: 'heading',
        tag: sec.tag ?? 'h2',
        version: 1,
        children: [{ type: 'text', text: sec.heading, version: 1, format: 0, style: '', mode: 'normal', detail: 0 }],
        direction: 'ltr', format: '', indent: 0,
      })
    }
    if (sec.text) {
      children.push({
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', text: sec.text, version: 1, format: 0, style: '', mode: 'normal', detail: 0 }],
        direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '',
      })
    }
    if (sec.list) {
      children.push({
        type: 'list',
        tag: 'ul', listType: 'bullet', version: 1, start: 1,
        children: sec.list.map((item, i) => ({
          type: 'listitem', version: 1, value: i + 1, checked: undefined,
          children: [{ type: 'text', text: item, version: 1, format: 0, style: '', mode: 'normal', detail: 0 }],
          direction: 'ltr', format: '', indent: 0,
        })),
        direction: 'ltr', format: '', indent: 0,
      })
    }
  }
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

const posts = [
  {
    title: 'Møt Jane – kosmetisk sykepleie hos SOMI Klinikken',
    slug: 'moet-jane-kosmetisk-sykepleie-somi',
    excerpt: 'Jane er utdannet sykepleier med videreutdanning i kosmetisk sykepleie. Møt vår nyeste ansatte og les om hva hun brenner for.',
    author: 'SOMI Klinikken',
    publishedDate: '2026-09-16T08:00:00.000Z',
    published: false,
    content: makeContent([
      { text: 'Vi har gleden av å ønske Jane velkommen til teamet hos SOMI Klinikken. Jane er utdannet sykepleier med videreutdanning innen kosmetisk sykepleie, og bringer med seg en kombinasjon av klinisk trygghet og estetisk forståelse som vi vet mange av dere kommer til å sette pris på.' },
      { heading: 'Hvem er Jane?' },
      { text: 'Med sin helsefaglige bakgrunn kombinerer Jane klinisk trygghet med et godt øye for naturlige resultater. Hun jobber med små, gjennomtenkte justeringer som fremhever dine egne trekk, i stedet for å forandre dem — målet er alltid et harmonisk resultat, ikke et påfallende.' },
      { heading: 'Hva jobber Jane med?' },
      { text: 'Jane har injeksjonsbehandlinger som sitt spesialistområde, med fokus på naturlig foryngelse. Hun er også opptatt av god hudhelse og individuell veiledning, og tar seg alltid god tid til å forklare hva som faktisk skjer i huden — ikke bare hva som gjøres.' },
      { heading: 'Trygghet gjennom hele behandlingen' },
      { text: 'Som sykepleier har Jane et helsefaglig fundament som gir deg klinisk trygghet fra første samtale til etterkontroll. Kombinert med et estetisk blikk er hun opptatt av at resultatet skal se ut som deg — bare uthvilt og frisk.' },
      { heading: 'Book time hos Jane i Sandnes' },
      { text: 'Nysgjerrig på hva Jane kan hjelpe akkurat deg med? Ta kontakt med SOMI Klinikken på Langgata 31, 4306 Sandnes, for en gratis og uforpliktende konsultasjon.' },
    ]),
  },
  {
    title: 'Møt Irena – estetisk medisin hos SOMI Klinikken',
    slug: 'moet-irena-estetisk-medisin-somi',
    excerpt: 'Irena er intensivsykepleier med videreutdanning i estetisk medisin. Møt vår nyeste ansatte og filosofien hun tar med seg inn i faget.',
    author: 'SOMI Klinikken',
    publishedDate: '2026-09-23T08:00:00.000Z',
    published: false,
    content: makeContent([
      { text: 'SOMI Klinikken ønsker Irena velkommen til teamet. Irena er utdannet intensivsykepleier med lang klinisk erfaring, og har i tillegg solid videreutdanning innen estetisk medisin — en kombinasjon som gir en sjelden grundig faglig ballast inn i behandlingsrommet.' },
      { heading: 'Hvem er Irena?' },
      { text: 'I en bransje som ofte preges av trender og noen ganger unaturlige idealer, brenner Irena for å fremme naturlig skjønnhet og god hudhelse. Hun er opptatt av at estetiske behandlinger skal gjøres med måte — subtile justeringer som harmonerer med dine egne trekk, ikke overkjører dem.' },
      { heading: 'Hva jobber Irena med?' },
      { text: 'Irenas spesialistområde er injeksjonsbehandlinger innen estetisk medisin. Hun tror på at en liten, riktig plassert endring kan utgjøre en stor forskjell — både for det fysiske uttrykket og for hvordan man kjenner seg selv etterpå.' },
      { heading: 'Filosofien hennes' },
      { text: 'Irena mener at en kvinne som er fornøyd med seg selv er den vakreste kvinnen — og det er nettopp dét som er målet med enhver behandling hun utfører: ikke å skape en ny person, men å fremheve den som allerede er der.' },
      { heading: 'Book time hos Irena i Sandnes' },
      { text: 'Vil du vite mer om hva Irena kan tilby? Ta kontakt med SOMI Klinikken på Langgata 31, 4306 Sandnes, for en gratis og uforpliktende konsultasjon.' },
    ]),
  },
]

async function run() {
  console.log('Seeder blogginnlegg (Jane, Irena) som upublisert kladd...')
  const client = new MongoClient(url)
  await client.connect()
  const db = client.db(dbName)
  const col = db.collection('posts')

  for (const post of posts) {
    const existing = await col.findOne({ slug: post.slug })
    const now = new Date()
    if (existing) {
      await col.updateOne({ slug: post.slug }, { $set: { ...post, updatedAt: now } })
      console.log(`  Oppdatert: ${post.slug}`)
    } else {
      await col.insertOne({ ...post, _id: new ObjectId(), createdAt: now, updatedAt: now })
      console.log(`  Opprettet: ${post.slug}`)
    }
  }

  await client.close()
  console.log('Ferdig!')
}

run().catch((err) => { console.error(err); process.exit(1) })
