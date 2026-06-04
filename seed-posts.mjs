// Seed script – 6 blogginnlegg for SOMI Klinikken
// Run: node seed-posts.mjs
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
    title: 'Microblading i Sandnes – alt du trenger å vite',
    slug: 'microblading-sandnes',
    excerpt: 'Microblading gir deg naturlige, hårstrekbaserte bryn som varer 1–2 år. Les alt du trenger å vite om behandlingen hos SOMI Klinikken i Sandnes.',
    author: 'Katarina Hammer – SOMI Klinikken',
    publishedDate: '2025-04-01T08:00:00.000Z',
    content: makeContent([
      { text: 'Ønsker du naturlige, velformede bryn uten å bruke tid på sminke hver morgen? Microblading er en av de mest populære behandlingene hos SOMI Klinikken i Sandnes, og med god grunn: teknikken gir et resultat som ser ut som naturlige brynskjær – hårstrek for hårstrek.' },
      { heading: 'Hva er microblading?' },
      { text: 'Microblading er en form for permanent makeup der en spesialist bruker et fint blad med mikroskopiske nåler til å lage hårstreklignende tegninger i huden. Pigment settes inn i de øverste lagene av dermis, noe som gir et naturlig og dybdefullt utseende. Resultatet ligner ekte brynskjær så godt at selv eksperter kan ha vanskelig for å se forskjellen.' },
      { heading: 'Hvem passer microblading for?' },
      { text: 'Microblading passer spesielt godt for deg med tørr til normal hud, sparse eller ujevne bryn, eller for deg som vil spare tid på sminke. Det er ikke anbefalt for deg med veldig fet hud, siden pigmentet kan spre seg raskere.' },
      { text: 'Hos SOMI Klinikken starter vi alltid med en gratis konsultasjon der Katarina vurderer din hudtype, tegner opp fasong og diskuterer ønsket resultat. Ingen to bryn er like, og vi skreddersyr alltid behandlingen etter ditt ansikt og dine ønsker.' },
      { heading: 'Slik foregår behandlingen' },
      { list: [
        'Konsultasjon og fasongtegning (30 min): Vi diskuterer ønsket fasong og fargetone, og tegner opp brynet for forhåndsgodkjenning.',
        'Numbing-krem påføres i 20–30 minutter for å minimere ubehag.',
        'Selve microbladingen tar ca. 60–90 minutter. Vi lager hårstrek for hårstrek med høy presisjon.',
        'Etterbehandlingsinformasjon: du går hjem med skriftlig guide for helingsperioden.',
      ]},
      { heading: 'Før behandlingen – dette bør du vite' },
      { text: 'Unngå alkohol, blodfortynnende medisiner og koffeinholdige drikker 24 timer før behandlingen. Ikke voks eller tråd brynene 2 uker i forveien. Kom uten makeup på brynene.' },
      { heading: 'Etter behandlingen – etterpleie' },
      { text: 'De første 2–3 dagene vil brynene se mørkere ut enn det endelige resultatet. Dette er helt normalt og skyldes helingsprocessen. Unngå lange dusjer, badstu og svetting de første 7 dagene. Rens forsiktig med en tørr bomullsdott. Ikke riv eller plukk på skorper – la dem falle av naturlig.' },
      { text: 'Fullt resultat ser du etter ca. 4 uker. Da er en oppfriskning (touch-up) tilgjengelig dersom det trengs. Resultatet varer typisk 12–18 måneder avhengig av hud og livsstil.' },
      { heading: 'Pris og booking hos SOMI Klinikken Sandnes' },
      { text: 'Vi tilbyr microblading i Sandnes med gratis konsultasjon inkludert. Se komplett prisliste på vår prisside, eller book din konsultasjon direkte. Klinikken ligger sentralt i Langgata 31, 4306 Sandnes.' },
    ]),
  },
  {
    title: 'Permanent Makeup – naturlige bryn tilpasset deg',
    slug: 'permanent-makeup-naturlige-bryn',
    excerpt: 'Hos SOMI Klinikken er målet å gi deg et naturlig resultat som passer akkurat deg. Les om microblading og powder brows med Katarinas egne ord.',
    author: 'Katarina Hammer – SOMI Klinikken',
    publishedDate: '2025-04-10T08:00:00.000Z',
    content: makeContent([
      { text: 'Hos oss er målet at du skal oppnå et resultat du er fornøyd med – samtidig som vi tar hensyn til at alle har ulike utgangspunkt. De fleste ønsker et naturlig resultat, men hva som oppleves som naturlig varierer fra person til person.' },
      { heading: 'Microblading vs. Powder Brows – hva er forskjellen?' },
      { text: 'Microblading gir et naturlig hårstrå-resultat og passer best for deg med tørr hud. Teknikken etterligner individuelle brynskjær og gir et svært naturlig utseende.' },
      { text: 'Shading (Powder Brows) gir en myk, pudderaktig look som ligner på lett sminket bryn. Denne teknikken passer alle hudtyper – inkludert fet hud – og gir et litt mer definert utseende.' },
      { heading: 'Gratis konsultasjon – for deg' },
      { text: 'Hos SOMI Klinikken starter vi alltid med en gratis konsultasjon. Her vurderer vi din hudtype, anbefaler den best egnede teknikken, tegner opp brynfasong tilpasset ditt ansikt og visualiserer resultatet.' },
      { heading: 'Har du tidligere permanent makeup?' },
      { text: 'Dersom du har hatt permanent makeup hos et annet sted før, er det viktig at du sender oss et bilde på forhånd, eller booker en konsultasjon. Eksisterende pigment kan påvirke valg av teknikk og farge.' },
      { heading: 'Under behandlingen' },
      { text: 'Vi bruker alltid sterilt, engangsutstyr. Bedøvelseskrem påføres for å minimere ubehag. Hele behandlingen tar 1,5–2 timer.' },
      { heading: 'Etter behandlingen – viktige råd' },
      { list: [
        'De første 2–3 dagene vil brynene se mørkere ut enn det endelige resultatet.',
        'Unngå lange dusjer, badstu og trening de første 7 dagene.',
        'Rens forsiktig med en tørr bomullsdott – ikke gni.',
        'Unngå sminke på behandlingsområdet i minimum 7 dager.',
        'La eventuelle skorper falle av naturlig – ikke plukk!',
      ]},
      { text: 'Fullt resultat sees etter ca. 4 uker. En oppfriskning kan være aktuelt etter 6–8 uker.' },
      { heading: 'Book hos SOMI i Sandnes' },
      { text: 'Vi holder til i Langgata 31, 4306 Sandnes. Book din gratis konsultasjon i dag og ta det første steget mot bryn du vil elske.' },
    ]),
  },
  {
    title: 'Laser hårfjerning i Sandnes – permanent løsning',
    slug: 'laser-harfjerning-sandnes',
    excerpt: 'Laser hårfjerning gir deg permanent reduksjon av uønsket hår. Arianna er laserspesialist hos SOMI Klinikken i Sandnes.',
    author: 'Arianna – SOMI Klinikken',
    publishedDate: '2025-04-20T08:00:00.000Z',
    content: makeContent([
      { text: 'Er du lei av barbering, voksing og stadig tilbakevendende hår? Laser hårfjerning er den mest effektive og permanente løsningen for uønsket hår – og hos SOMI Klinikken i Sandnes har vi Arianna, autorisert helsepersonell og erfaren laserspesialist.' },
      { heading: 'Hvordan fungerer laser hårfjerning?' },
      { text: 'Laserbehandling bruker konsentrert lys som absorberes av pigmentet (melanin) i håret. Energien varmes opp i hårfollikelen og hemmer videre vekst. Behandlingen er mest effektiv på mørkt hår mot lys hud, men med riktig laserteknologi behandles de fleste hudtyper trygt.' },
      { heading: 'Behandlingsforløp og antall sesjoner' },
      { text: 'De fleste trenger mellom 6 og 8 behandlinger for å oppnå permanent reduksjon. Hår vokser i ulike faser, og laser er kun effektivt i vekstfasen. Behandlingene settes med 4–8 ukers mellomrom avhengig av behandlingsområde.' },
      { heading: 'Er det smertefullt?' },
      { text: 'De fleste kunder beskriver laser hårfjerning som en lett sviende eller prikkende følelse. Arianna bruker teknikker og innstillinger tilpasset din hudtype og smerteterskel for maksimal komfort.' },
      { heading: 'Behandlingsområder' },
      { list: ['Bikiniline og brasiliansk', 'Legg og lår', 'Armhuler', 'Overleppen og hake', 'Bryst og mage', 'Rygg og skuldre', 'Ansikt'] },
      { heading: 'Book laser hårfjerning i Sandnes' },
      { text: 'Ta kontakt med SOMI Klinikken på Langgata 31, 4306 Sandnes for å booke din gratis konsultasjon.' },
    ]),
  },
  {
    title: 'Fjern tatovering med laser i Sandnes',
    slug: 'laser-tattoo-removal-sandnes',
    excerpt: 'SOMI Klinikken tilbyr fjerning av tatoveringer med laser i Sandnes. Les om behandlingsforløpet, antall sesjoner og hva du kan forvente.',
    author: 'SOMI Klinikken',
    publishedDate: '2025-05-01T08:00:00.000Z',
    content: makeContent([
      { text: 'Angrer du på en tatovering? SOMI Klinikken i Sandnes tilbyr tatoveringsfjerner med laser og saline tattoo removal for de som ønsker å fjerne eller lysne en tatovering.' },
      { heading: 'Saline tattoo removal – naturlig metode' },
      { text: 'Saline removal bruker en spesiell saltvannsløsning som injiseres i tatoveringen. Metoden er skånsom og særlig populær for å fjerne permanent makeup, brows og eyeliner.' },
      { heading: 'Laser tattoo removal – effektiv fjerning' },
      { text: 'Laserbehandling bruker intense lyspulser som bryter ned blekket i tatoveringen til partikler som kroppen absorberer naturlig. Laser er særlig effektivt på svart og mørke farger.' },
      { heading: 'Antall sesjoner – hva kan du forvente?' },
      { text: 'En profesjonell tatovering kan kreve 8–15 sesjoner, mens amatørtattoos eller permanent makeup typisk trenger 3–6 behandlinger. Behandlingene settes med 6–8 ukers mellomrom.' },
      { heading: 'Book gratis konsultasjon i Sandnes' },
      { text: 'Start med en gratis konsultasjon hos SOMI Klinikken i Sandnes. Vi ser på tatoveringen og gir deg et realistisk estimat.' },
    ]),
  },
  {
    title: 'Injeksjonsbehandlinger i Sandnes – naturlig foryngelse',
    slug: 'injeksjonsbehandlinger-sandnes',
    excerpt: 'SOMI Klinikken tilbyr injeksjonsbehandlinger i Sandnes med fokus på naturlige resultater. Konsultasjon er alltid inkludert.',
    author: 'SOMI Klinikken',
    publishedDate: '2025-05-10T08:00:00.000Z',
    content: makeContent([
      { text: 'Injeksjonsbehandlinger er en av de mest populære og effektive metodene for å oppnå en friskere og mer ungdommelig utseende uten kirurgi. Hos SOMI Klinikken i Sandnes tilbyr vi injeksjoner utført av erfarne behandlere med fokus på naturlige og harmoniske resultater.' },
      { heading: 'Hva tilbyr SOMI Klinikken?' },
      { text: 'Vi tilbyr ulike former for injeksjonsbehandlinger tilpasset dine behov og ønsker. Under konsultasjonen vurderer behandleren ditt ansikt, din hudtype og dine mål.' },
      { heading: 'Konsultasjon alltid inkludert' },
      { text: 'Vi tilbyr alltid gratis konsultasjon før injeksjonsbehandlinger. Ingen behandling utføres uten at du er trygg og godt informert.' },
      { heading: 'Trygghet og kompetanse' },
      { text: 'Alle injeksjonsbehandlinger hos SOMI Klinikken utføres av erfarne og sertifiserte behandlere. Vi bruker kun godkjente produkter av høy kvalitet.' },
      { heading: 'Book konsultasjon i Sandnes' },
      { text: 'Ta kontakt med oss på Langgata 31, 4306 Sandnes for å booke din gratis konsultasjon.' },
    ]),
  },
  {
    title: 'Profesjonell hudpleie med Dermalogica i Sandnes',
    slug: 'hudpleie-dermalogica-sandnes',
    excerpt: 'Emma er sertifisert Dermalogica Expert hos SOMI Klinikken. Les om medisinsk og klassisk hudpleie tilpasset akkurat deg i Sandnes.',
    author: 'Emma – SOMI Klinikken',
    publishedDate: '2025-05-20T08:00:00.000Z',
    content: makeContent([
      { text: 'God hudpleie handler om mer enn vakre produkter – det handler om riktig behandling for din spesifikke hud. Hos SOMI Klinikken i Sandnes har vi Emma, utdannet hudpleier og sertifisert Dermalogica Expert.' },
      { heading: 'Emma – Dermalogica Expert' },
      { text: 'Emma har gjennom egne erfaringer med hudutfordringer og behandling med isotretinoin utviklet en dyp forståelse for hudhelse.' },
      { heading: 'Medisinsk hudpleie vs. klassisk hudpleie' },
      { text: 'Medisinsk hudpleie bruker aktive ingredienser med dokumentert effekt på hudens struktur. Klassisk hudpleie fokuserer på dyprengjøring, fuktbalanse og velværeopplevelsen.' },
      { heading: 'Face Mapping – hudanalyse tilpasset deg' },
      { text: 'Emma bruker Dermalogica sin Face Mapping-metode for å kartlegge din hud i 14 ulike soner. Dette gir en presis analyse som danner grunnlaget for en behandlingsplan tilpasset akkurat din hud.' },
      { heading: 'Behandlinger vi tilbyr' },
      { list: ['Dermalogica ansiktsbehandlinger', 'PRX-T33 biorestrukturering', 'Dyprens og poreminimering', 'Kjemisk peel', 'Microneedling', 'Behandlinger for sensitiv og aknetrøblet hud'] },
      { heading: 'Book hudkonsultasjon i Sandnes' },
      { text: 'Vi tilbyr gratis hudkonsultasjon med Emma på SOMI Klinikken, Langgata 31, 4306 Sandnes.' },
    ]),
  },
]

async function run() {
  console.log('Seeder blogginnlegg direkte i MongoDB...')
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
