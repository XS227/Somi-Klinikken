import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'

type Props = { params: Promise<{ slug: string }> }

type BehandlingData = {
  title: string
  tagline: string
  heroDesc: string
  hvaSer: string
  effektMot?: string[]
  hvemPasser: string
  fordeler?: string[]
  steps: string[]
  foer: string[]
  under: string
  etter: string[]
  faq: { q: string; a: string }[]
  images?: string[]
  ctaText?: string
  sammenligningLink?: { slug: string; title: string }
  beforeAfter?: { src: string; alt: string; heading: string; caption: string }
  video?: { src: string; heading: string; caption: string }
}

const peelingSammenligning = {
  title: 'Hva er forskjellen på PRX-T33 og BioRePeel CL3?',
  intro:
    'Både PRX-T33 og BioRePeel CL3 er moderne peelinger som forbedrer hudkvalitet, glød og hudstruktur med minimal nedetid. Begge behandlingene stimulerer hudens naturlige cellefornyelse og kollagenproduksjon, men de har ulike egenskaper og bruksområder.',
  prxPasser: [
    'Oppstramming og anti-age',
    'Slapp hud og tap av elastisitet',
    'Fine linjer og hudfornyelse',
    'Kunder som ønsker «lifting-effekt» uten nåler',
  ],
  prxForklaring:
    'PRX-T33 jobber dypere i huden og er spesielt populær for hudoppstramming og revitalisering.',
  biorepeelPasser: [
    'Akne og uren hud',
    'Store porer og hudtekstur',
    'Fet eller kombinert hud',
    'Glød og jevnere hudtone',
  ],
  biorepeelForklaring:
    'BioRePeel har sterk fokus på eksfoliering, hudforbedring og balansering av huden, samtidig som den er svært skånsom.',
  avslutning:
    'Valg av behandling avhenger av hudtype, hudtilstand og ønsket resultat. Vi hjelper deg gjerne med å finne den behandlingen som passer best for din hud.',
}

const behandlingerData: Record<string, BehandlingData> = {
  'prx-t33': {
    title: 'PRX-T33 – Biorevitalisering uten nåler',
    tagline: 'Strammer opp, gir glød og forbedrer hudkvaliteten – uten nåler',
    heroDesc:
      'Gi huden nytt liv med PRX-T33 – en behandling som strammer opp, gir glød og forbedrer hudkvaliteten uten flassing eller lang nedetid.',
    hvaSer:
      'PRX-T33 stimulerer hudens naturlige kollagenproduksjon og passer perfekt for deg som ønsker fastere, jevnere og friskere hud.',
    effektMot: [
      'Fine linjer og rynker',
      'Slapp og gusten hud',
      'Aknearr og arr',
      'Pigmentering og solskader',
      'Store porer',
      'Strekkmerker',
    ],
    hvemPasser:
      'PRX-T33 kan brukes på ansikt, hals og bryst, og passer for de fleste hudtyper. Mange ser umiddelbar glød allerede etter første behandling.',
    fordeler: [
      'Ingen nåler',
      'Minimal nedetid',
      'Synlige resultater raskt',
      'Stimulerer kollagen og elastin',
      'Perfekt «glow treatment» før eventer',
    ],
    steps: [
      'Konsultasjon: Vi vurderer din hud og diskuterer ønsket resultat.',
      'Huden renses og forberedes for behandlingen.',
      'PRX-T33 påføres og masseres forsiktig inn i huden (ca. 30 minutter).',
      'Avsluttende pleie og hjemmepleieplan.',
    ],
    foer: [
      'Unngå aktive ingredienser (retinol, syrer) 3–5 dager før.',
      'Ikke vær i sterkt sol 2 dager før behandlingen.',
      'Kom med ren hud uten sminke.',
    ],
    under:
      'PRX-T33 påføres og masseres forsiktig inn i huden. Det kan kjennes lett kribling. Ingen nåler benyttes og behandlingen er i stor grad smertefri.',
    etter: [
      'Bruk SPF 50+ daglig etter behandlingen.',
      'Unngå sterkt sollys og solarium.',
      'Lett rødhet kan forekomme de første timene – dette er normalt.',
      'Huden kan bli litt sensitiv de første dagene.',
    ],
    faq: [
      {
        q: 'Hva er PRX-T33?',
        a: 'PRX-T33 er en biorevitaliseringsbehandling som stimulerer kollagenproduksjonen uten å skade hudoverflaten. Behandlingen er unik fordi den gir effektiv biostimulering uten bruk av nåler.',
      },
      {
        q: 'Gjør PRX-T33 vondt?',
        a: 'Nei, behandlingen er i stor grad smertefri. Du kan kjenne litt kribling, men det er ikke smertefullt.',
      },
      {
        q: 'Hvor mange behandlinger trenger jeg?',
        a: 'Mange ser resultater etter første behandling. For optimal effekt anbefales 4–6 behandlinger med 1–2 ukers mellomrom.',
      },
      {
        q: 'Kan jeg bruke sminke etter behandlingen?',
        a: 'Du kan bruke mineral sminke dagen etter. Vi anbefaler å unngå tung sminke de første 24 timene.',
      },
    ],
    ctaText:
      'Bestill din PRX-T33 behandling i dag og opplev en sunnere, fastere og mer ungdommelig hud.',
    sammenligningLink: { slug: 'biorepeel-cl3', title: 'BioRePeel CL3' },
  },
  'biorepeel-cl3': {
    title: 'BioRePeel CL3 – Skånsom peeling med glød og hudfornyelse',
    tagline: 'Innovativ medisinsk peeling som kombinerer eksfoliering og biostimulering',
    heroDesc:
      'BioRePeel CL3 er en innovativ og skånsom medisinsk peeling som kombinerer eksfoliering, biostimulering og hudfornyelse i én behandling.',
    hvaSer:
      'Peelingen forbedrer hudkvaliteten i dybden samtidig som den gir minimal flassing og lite nedetid. BioRePeel CL3 inneholder blant annet TCA, aminosyrer og vitaminer som stimulerer hudens naturlige cellefornyelse og kollagenproduksjon. Resultatet er en klarere, jevnere og mer glødende hud. Behandlingen passer alle hudtyper og kan utføres året rundt.',
    effektMot: [
      'Gusten og livløs hud',
      'Fine linjer og tidlige aldringstegn',
      'Akne og aknearr',
      'Store porer og ujevn hudstruktur',
      'Pigmentering og solskader',
      'Fet og uren hud',
      'Tørr og dehydrert hud',
    ],
    hvemPasser:
      'BioRePeel CL3 passer alle hudtyper. Mange opplever en jevnere hudtone, forbedret tekstur og mer glød allerede etter første behandling. For optimal effekt anbefales en kur på 4–6 behandlinger tilpasset hudens behov.',
    fordeler: [
      'Gir umiddelbar glød og friskhet',
      'Stimulerer kollagen og elastin',
      'Minimal flassing og nedetid',
      'Passer sensitiv hud',
      'Kan brukes på ansikt, hals og kropp',
      'Perfekt som kurbehandling',
    ],
    steps: [
      'Konsultasjon: Vi vurderer din hud og velger riktig behandlingsprotokoll.',
      'Huden renses og avfettes grundig.',
      'BioRePeel CL3 påføres og virker i huden (ca. 30–45 minutter).',
      'Avsluttende pleie og hjemmepleieplan.',
    ],
    foer: [
      'Unngå aktive ingredienser (retinol, syrer) 3–5 dager før.',
      'Ikke vær i sterkt sol 2 dager før behandlingen.',
      'Kom med ren hud uten sminke.',
      'Informer om allergier og aktuelle hudproblemer.',
    ],
    under:
      'BioRePeel CL3 påføres av hudterapeut og virker i hudoverflaten. Det kan kjennes lett kribling eller varme. Behandlingen er trygg og godt tolerert av de fleste.',
    etter: [
      'Bruk SPF 50+ daglig etter behandlingen.',
      'Unngå sterkt sollys og solarium i 7 dager.',
      'Noe avskalling kan forekomme de første dagene – dette er normalt.',
      'Hold huden godt fuktet med anbefalt produkt.',
    ],
    faq: [
      {
        q: 'Hva inneholder BioRePeel CL3?',
        a: 'BioRePeel CL3 inneholder TCA (trikloreddiksyre), aminosyrer, vitaminer og gamma-aminosmørsyre (GABA). Disse ingrediensene jobber sammen for å eksfoliere, biostimulere og forynge huden.',
      },
      {
        q: 'Er det mye flassing etter BioRePeel CL3?',
        a: 'BioRePeel CL3 er kjent for minimal flassing sammenlignet med tradisjonelle peelingbehandlinger. Noe lett avskalling kan forekomme de første 3–5 dagene.',
      },
      {
        q: 'Kan jeg ta BioRePeel CL3 om sommeren?',
        a: 'Ja, BioRePeel CL3 kan utføres året rundt. Det er viktig å beskytte huden mot sol med SPF 50+ etter behandlingen.',
      },
      {
        q: 'Hvor mange behandlinger anbefales?',
        a: 'For optimale resultater anbefales en kur på 4–6 behandlinger med 1–2 ukers mellomrom. Enkeltbehandlinger gir også synlig glød og friskhet.',
      },
    ],
    ctaText:
      'Bestill BioRePeel CL3 hos oss og gi huden en effektiv, trygg og moderne hudfornyelse.',
    sammenligningLink: { slug: 'prx-t33', title: 'PRX-T33 – Biorevitalisering uten nåler' },
  },
  'permanent-makeup': {
    title: 'Permanent Makeup',
    tagline: 'Naturlige bryn og liner – skreddersydd for deg',
    heroDesc: 'Hos SOMI Klinikken er målet at du skal oppnå et resultat du er fornøyd med – med teknikk tilpasset din hudtype og ditt ansikt.',
    hvaSer: 'Permanent makeup er en kosmetisk behandling der pigment festes i hudens øvre lag for å etterligne naturlig sminke. Vi tilbyr Microblading (hårstrek-metoden), Powder Brows (pudder-look) og Lipblush.',
    hvemPasser: 'Permanent makeup passer for deg som ønsker å spare tid på daglig sminke, har sparse eller ujevne bryn, eller som ønsker en friskere og mer definert look. Microblading passer best for tørr hud, mens Powder Brows passer alle hudtyper.',
    steps: [
      'Gratis konsultasjon: Katarina tegner opp fasong og diskuterer ønsket farge og teknikk.',
      'Numbing-krem påføres i 20–30 minutter.',
      'Behandlingen utføres (1,5–2 timer) med sterilt, engangsutstyr.',
      'Etterbehandlingsinformasjon og oppfølging er alltid inkludert.',
    ],
    foer: [
      'Unngå alkohol 24 timer før behandlingen.',
      'Ikke ta blodfortynnende medisiner (uten legesamtale).',
      'Ikke voks eller tråd brynene 2 uker i forveien.',
      'Kom uten makeup på brynene.',
    ],
    under: 'Vi bruker alltid sterilt engangsutstyr og bedøvelseskrem for å minimere ubehag. Behandlingen tar 1,5–2 timer.',
    etter: [
      'Brynene ser mørkere ut de første 2–3 dagene – dette er normalt.',
      'Unngå lange dusjer, badstu og trening i 7 dager.',
      'Rens forsiktig med tørr bomullsdott – ikke gni.',
      'Fullt resultat sees etter ca. 4 uker.',
    ],
    faq: [
      { q: 'Hvor lenge varer permanent makeup?', a: 'Resultatet varer typisk 12–24 måneder avhengig av hudtype, pleie og livsstil. Touch-up kan gjøres etter behov.' },
      { q: 'Gjør det vondt?', a: 'Vi bruker bedøvelseskrem og de fleste kunder opplever kun lett trykk eller stikk. De aller fleste tolererer behandlingen godt.' },
      { q: 'Kan jeg ha permanent makeup hvis jeg har sensitiv hud?', a: 'Ja, vi vurderer alltid hudtype under konsultasjonen og tilpasser teknikk og pigment deretter.' },
      { q: 'Hva er forskjellen på microblading og powder brows?', a: 'Microblading gir hårstrek-look (mest naturlig), powder brows gir myk pudder-effekt. Powder brows passer alle hudtyper inkludert fet hud.' },
      { q: 'Er konsultasjon gratis?', a: 'Ja, gratis konsultasjon er alltid inkludert.' },
    ],
    images: [
      '/img/resultater/microblading-foer-etter-somi-klinikken-sandnes-1.webp',
      '/img/resultater/permanent-makeup-powder-brows-somi-sandnes-3.webp',
    ],
  },
  'laser-harfjerning': {
    title: 'Laser hårfjerning',
    tagline: 'Permanent løsning – trygg og effektiv',
    heroDesc: 'SOMI Klinikken tilbyr laser hårfjerning i Sandnes med Arianna, autorisert helsepersonell og sertifisert laserspesialist.',
    hvaSer: 'Laser hårfjerning bruker konsentrert lys som absorberes av pigmentet i håret. Energien ødelegger hårfollikelen og hindrer fremtidig vekst. De fleste trenger 6–8 behandlinger for permanent reduksjon.',
    hvemPasser: 'Laser hårfjerning passer for de fleste som ønsker å redusere eller fjerne uønsket hår permanent. Det er most effektivt på mørkt hår. Arianna vurderer din hudtype og hårtype under konsultasjonen.',
    video: {
      src: '/v/laser-harfjerning-behandling.mp4',
      heading: 'Se hvordan behandlingen foregår',
      caption: 'Et lite glimt av hvordan du blir tatt imot og hvordan en laserbehandling foregår hos SOMI Klinikken.',
    },
    steps: [
      'Gratis konsultasjon: Arianna vurderer hudtype og hårtype og lager en behandlingsplan.',
      'Huden forberedes og laser kalibreres etter din hudtype.',
      'Behandlingen utføres (varierende tid basert på område).',
      'Etterveiledning og påfølgende sesjoner planlegges.',
    ],
    foer: [
      'Barbér behandlingsområdet 24 timer før (ikke voks!).',
      'Unngå sol og solarium 2 uker før og etter.',
      'Ikke bruk selvbruning på behandlingsområdet.',
      'Informer om medisiner som øker lysømfintlighet.',
    ],
    under: 'Arianna kalibrerer laseren nøyaktig for din hudtype. Behandlingen er rask og de fleste opplever bare et lett stikk. Vi bruker kjøling for å minimere ubehag.',
    etter: [
      'Unngå sol i 2 uker etter behandlingen.',
      'Bruk høy solfaktor (SPF 50+) på behandlingsområdet.',
      'Litt rødhet og hevelse er normalt og forsvinner i løpet av timer.',
      'Neste behandling settes 4–8 uker etter.',
    ],
    faq: [
      { q: 'Hvor mange behandlinger trenger jeg?', a: 'De fleste trenger 6–8 behandlinger for varig effekt. Hormoner og genetikk kan kreve vedlikeholdsbehandlinger.' },
      { q: 'Gjør laser hårfjerning vondt?', a: 'De aller fleste opplever kun et lett stikk eller varme. Arianna bruker teknikker og kjøling for å minimere ubehag.' },
      { q: 'Hvilke områder kan behandles?', a: 'Vi behandler ansikt, underarmer, bikiniline, ben, armhuler, rygg, bryst og mage.' },
      { q: 'Hvor lang tid tar en behandling?', a: 'Fra 15 minutter (ansikt/armhuler) til 60 minutter (rygg/ben).' },
      { q: 'Er det trygt for alle hudtyper?', a: 'Ja, med riktig laserteknologi og innstillinger behandles alle hudtyper trygt. Vi vurderer alltid individuelt.' },
    ],
  },
  'laser-tattoo-removal': {
    title: 'Laser tattoofjerning',
    tagline: 'Trygg og skånsom fjerning av tatovering med laser',
    heroDesc: 'Ønsker du å fjerne en uønsket tatovering? Med moderne laserteknologi kan tatoveringsblekk gradvis brytes ned gjennom en serie behandlinger, samtidig som vi har stort fokus på å ivareta huden.',
    hvaSer: 'Laser tattoo removal bruker intense lyspulser som bryter ned tatoveringspigmentet til partikler kroppen absorberer naturlig. Vi tilbyr også saline removal – en skånsom metode spesielt egnet for permanent makeup.',
    hvemPasser: 'Hvor mange behandlinger som er nødvendig varierer fra person til person og avhenger blant annet av tatoveringens størrelse, farger, blekkmengde, plassering og hudtype. En kroppstatovering kan normalt ikke fjernes med kun én behandling, og prosessen krever derfor tid og flere behandlinger.',
    beforeAfter: {
      src: '/img/resultater/laser-tattoofjerning-for-etter-2-behandlinger-somi-klinikken-sandnes.webp',
      alt: 'Før og etter kun to laserbehandlinger for tatoveringsfjerning hos SOMI Klinikken i Sandnes',
      heading: 'Resultat etter kun 2 behandlinger',
      caption: 'Bildet viser resultatet etter kun to laserbehandlinger, hvor tatoveringen allerede har blitt betydelig svakere. Hos SOMI er hudens helse alltid førsteprioritet. Vi legger vekt på en trygg, skånsom og individuelt tilpasset behandling, og gir deg realistisk informasjon om hva du kan forvente gjennom hele prosessen.',
    },
    steps: [
      'Konsultasjon: Vi vurderer tatoveringen og estimerer antall sesjoner.',
      'Huden forberedes og behandlingsparametere settes.',
      'Laserbehandlingen utføres (minutter til 30 min etter størrelse).',
      'Etterpleie gis og neste sesjon planlegges.',
    ],
    foer: [
      'Unngå sol og solarium på tatoveringsområdet 2 uker i forveien.',
      'Ikke påfør kremsminke på tatoveringen behandlingsdagen.',
      'Fortell om alle medisiner du bruker.',
      'God fuktighet på huden de dagene/ukene før.',
    ],
    under: 'Vi påfører bedøvelseskrem og jobber systematisk over tatoveringen. De fleste beskriver det som et lett stikk. Behandlingstiden varierer etter størrelse.',
    etter: [
      'Beskytt behandlingsområdet mot sol i minimum 4 uker.',
      'Fukt huden daglig med uparfymert krem.',
      'Ikke plukk på skorper – la dem falle av naturlig.',
      'Neste sesjon tidligst 6–8 uker etter.',
    ],
    faq: [
      { q: 'Kan alle tatoveringer fjernes fullstendig?', a: 'De fleste tatoveringer kan fjernes eller lysnes vesentlig. Svart og mørke farger responderer best. Noen farger (gult, hvitt) er mer krevende.' },
      { q: 'Hvor mange sesjoner trenger jeg?', a: 'Typisk 6–15 sesjoner for en profesjonell tatovering, 3–6 for permanent makeup. Vi estimerer under konsultasjonen.' },
      { q: 'Gjør det vondt?', a: 'Vi bruker bedøvelseskrem og de fleste tolererer behandlingen godt. Det kan minne om et lett stikk.' },
      { q: 'Hva er saline removal?', a: 'En naturlig metode med saltvannsbasert løsning som settes inn i tatoveringen. Skånsom og effektiv, spesielt for permanent makeup.' },
    ],
  },
  'injeksjonsbehandlinger': {
    title: 'Injeksjonsbehandlinger',
    tagline: 'Naturlig foryngelse med erfaren behandler',
    heroDesc: 'SOMI Klinikken tilbyr injeksjonsbehandlinger i Sandnes med gratis konsultasjon og fokus på naturlige, harmoniske resultater.',
    hvaSer: 'Injeksjonsbehandlinger er en av de mest effektive metodene for naturlig foryngelse uten kirurgi. Vi tilbyr behandlinger tilpasset dine behov og ønsker, alltid med fokus på naturlig resultat.',
    hvemPasser: 'Injeksjoner passer for voksne som ønsker å redusere linjer, rynker eller gjenopprette volum på en skånsom og midlertidig måte. Konsultasjon er alltid første steg.',
    steps: [
      'Gratis konsultasjon: Vi lytter til dine ønsker og vurderer ansikt og hudtype.',
      'Behandlingsplan diskuteres og godkjennes.',
      'Behandlingen utføres av erfaren behandler.',
      'Oppfølging og informasjon om etterpleie gis.',
    ],
    foer: [
      'Unngå alkohol 24 timer før.',
      'Unngå blodfortynnende medisiner og kosttilskudd uten legesamtale.',
      'Informer om allergier og medisiner.',
      'Kom uten kraftig sminke på behandlingsområdet.',
    ],
    under: 'Alle injeksjoner utføres av erfarne og sertifiserte behandlere med godkjente produkter av høy kvalitet. Vi setter aldri mer enn nødvendig.',
    etter: [
      'Unngå sterkt sollys og varme (badstu) i 24 timer.',
      'Ikke massér behandlingsområdet.',
      'Lett hevelse/blåmerker kan forekomme og forsvinner innen dager.',
      'Resultatet vises gradvis over 1–2 uker.',
    ],
    faq: [
      { q: 'Er konsultasjon inkludert?', a: 'Ja, gratis konsultasjon er alltid inkludert og gjennomføres alltid før behandling.' },
      { q: 'Gjør det vondt?', a: 'Behandlingen gir minimalt ubehag. Vi bruker teknikker som minimerer smerte.' },
      { q: 'Hvor lenge varer resultatet?', a: 'Avhenger av behandlingstype – typisk 4–12 måneder. Vi informerer alltid om dette under konsultasjonen.' },
      { q: 'Ser det naturlig ut?', a: 'Ja – vi legger alltid stor vekt på naturlige og harmoniske resultater.' },
    ],
  },
  'medisinsk-hudpleie': {
    title: 'Medisinsk hudpleie',
    tagline: 'Dokumenterte resultater for din hud',
    heroDesc: 'Hos SOMI Klinikken tilbyr vi medisinsk hudpleie med behandlinger som gir dokumentert effekt på hudens struktur og utseende.',
    hvaSer: 'Medisinsk hudpleie bruker aktive ingredienser og avanserte teknikker med dokumentert effekt på hudens struktur, pigmentering og aldring. Vi tilbyr PRX-T33, microneedling, kjemisk peel og mer.',
    hvemPasser: 'Medisinsk hudpleie passer for deg med rosacea, hyperpigmentering, akne, arr eller tegn på aldring. Emma vurderer din hud og anbefaler riktig behandling.',
    steps: [
      'Konsultasjon med Face Mapping-analyse.',
      'Behandlingsplan tilpasset din hudtype.',
      'Behandlingen utføres (30–60 min).',
      'Hjemmepleieplan og oppfølgingsplan.',
    ],
    foer: [
      'Unngå aktive ingredienser (retinol, syrer) 3–5 dager før.',
      'Ikke vær i sterkt sol 2 dager før.',
      'Kom med ren hud uten tung sminke.',
    ],
    under: 'Emma bruker Dermalogica-produkter og avanserte teknikker tilpasset din hud. Behandlingen er grundig og resultatorientert.',
    etter: [
      'Bruk SPF 50+ daglig etter behandlingen.',
      'Unngå sterkt sollys og solarium.',
      'Fukt huden regelmessig med anbefalt produkt.',
      'Unngå kraftige aktive ingredienser i 3–5 dager.',
    ],
    faq: [
      { q: 'Hva er PRX-T33?', a: 'PRX-T33 er en revolusjonerende biorestrukturering som stimulerer kollagenproduksjon uten å skade huden. Gir umiddelbart synlig resultat.' },
      { q: 'Hva passer for akne?', a: 'Vi anbefaler konsultasjon for å vurdere huden. Dermalogica Clear Start og spesifikke peel-behandlinger er vanlig.' },
      { q: 'Kan jeg bruke sminke etter behandling?', a: 'Avhenger av behandlingstype – Emma informerer alltid om dette.' },
    ],
  },
  'klassisk-hudpleie': {
    title: 'Klassisk hudpleie',
    tagline: 'Skreddersydd ansiktsbehandling med Dermalogica',
    heroDesc: 'Emma er sertifisert Dermalogica Expert hos SOMI Klinikken og tilbyr skreddersydde ansiktsbehandlinger i Sandnes.',
    hvaSer: 'Klassisk hudpleie fokuserer på dyprengjøring, fuktbalanse og velvære. Med Dermalogica som grunnlag tilbyr vi behandlinger som er tilpasset nettopp din hud – for øyeblikkelig glød og langsiktig hudhelse.',
    hvemPasser: 'Passer for alle som ønsker å vedlikeholde god hudhelse, gi huden en boost eller rett og slett unne seg en god opplevelse. Anbefalt for alle hudtyper og aldre.',
    steps: [
      'Konsultasjon og Face Mapping-analyse.',
      'Rensing, eksfoliering og ekstraksjon ved behov.',
      'Skreddersydd maske og serum.',
      'Avsluttende fuktighetspleie og SPF.',
    ],
    foer: [
      'Kom med ren hud.',
      'Informer om allergier og aktuelle hudproblemer.',
      'Unngå eksfolierende produkter 2 dager i forveien.',
    ],
    under: 'Emma bruker Dermalogica Face Mapping for en presis hudanalyse i 14 soner, og velger produkter tilpasset akkurat deg.',
    etter: [
      'Bruk SPF 30+ daglig.',
      'Hold huden godt fuktet med anbefalte produkter.',
      'Unngå makeup de første timene for best resultat.',
    ],
    faq: [
      { q: 'Hva er Dermalogica?', a: 'Verdens ledende profesjonelle hudpleiemerke, grunnlagt av hudterapister. Uten fargestoffer, parfyme eller lanolin.' },
      { q: 'Hvor ofte bør jeg komme?', a: 'Vi anbefaler behandling hver 4.–6. uke for optimal hudhelse.' },
      { q: 'Passer det for sensitiv hud?', a: 'Ja, Dermalogica er spesielt kjent for å fungere godt på sensitiv hud.' },
    ],
  },
  'harfjerning-voks-elektrolyse': {
    title: 'Hårfjerning – voks og elektrolyse',
    tagline: 'Rask og skånsom behandling',
    heroDesc: 'SOMI Klinikken tilbyr voksbehandling og elektrolyse for effektiv hårfjerning i Sandnes.',
    hvaSer: 'Voksbehandling fjerner hår ved roten for glatt hud i 3–6 uker. Elektrolyse er en permanent metode som ødelegger hårfollikelens vekstceller med elektrisk strøm.',
    hvemPasser: 'Voks passer for de fleste som ønsker raskere og lengre holdbarhet enn barbering. Elektrolyse passer for deg som ønsker permanent hårfjerning på mindre områder.',
    steps: [
      'Konsultasjon og valg av metode.',
      'Huden forberedes og renses.',
      'Behandlingen utføres (5–45 min etter område).',
      'Etterpleie påføres og råd gis.',
    ],
    foer: [
      'Hår bør være minst 5–6 mm langt for voksbehandling.',
      'Unngå sol og solarium 24 timer i forveien.',
      'Ikke bruk eksfolierende produkter behandlingsdagen.',
    ],
    under: 'Vi bruker profesjonelt voks av høy kvalitet og teknikker som minimerer ubehag. Behandlingen er rask og effektiv.',
    etter: [
      'Unngå sol, badstu og trening 24 timer etter.',
      'Fukt huden for å forhindre inngrodd hår.',
      'Unngå eksfolierende produkter de første dagene.',
    ],
    faq: [
      { q: 'Gjør voksing vondt?', a: 'Det kan gi lett ubehag, men behandlingen er rask. Vi bruker teknikker som minimerer smerte.' },
      { q: 'Hvor lenge varer voksing?', a: 'Typisk 3–6 uker avhengig av hårvekst.' },
      { q: 'Hva er elektrolyse?', a: 'En permanent hårfjerningsteknikk der elektrisk strøm ødelegger hårfollikelens vekstcelle. Effektivt for permanente resultater på enkeltfollikler.' },
    ],
  },
  'gratis-konsultasjon': {
    title: 'Gratis konsultasjon',
    tagline: 'La oss hjelpe deg finne riktig behandling',
    heroDesc: 'Usikker på hvilken behandling som passer deg? Book en gratis, uforpliktende konsultasjon hos SOMI Klinikken i Sandnes.',
    hvaSer: 'En gratis konsultasjon er et møte med en av våre behandlere der vi lytter til dine ønsker, vurderer din hudtype og anbefaler den beste behandlingen for deg. Ingen forpliktelser.',
    hvemPasser: 'Alle er velkomne til konsultasjon. Det er særlig nyttig for nye kunder og for alle som er usikre på hvilken behandling som passer best.',
    steps: [
      'Vi tar oss god tid til å lytte til dine ønsker og behov.',
      'Behandleren vurderer din hudtype og eventuell eksisterende tilstand.',
      'Vi anbefaler passende behandlinger med realistiske forventninger.',
      'Du bestemmer selv om du ønsker å gå videre – ingen forpliktelser.',
    ],
    foer: [
      'Ingen spesiell forberedelse nødvendig.',
      'Kom gjerne med bilder eller eksempler på ønsket resultat.',
      'List opp medisiner du bruker dersom relevant.',
    ],
    under: 'Et hyggelig og avslappet møte i trygge omgivelser. Vi svarer på alle spørsmål og gir deg den informasjonen du trenger.',
    etter: [
      'Du mottar skriftlig anbefaling pr. e-post.',
      'Ingen forpliktelse til kjøp eller videre behandling.',
    ],
    faq: [
      { q: 'Er konsultasjonen virkelig gratis?', a: 'Ja, alltid 100% gratis og uten forpliktelser.' },
      { q: 'Hvor lang tid tar det?', a: 'Typisk 20–30 minutter.' },
      { q: 'Kan jeg booke direkte etterpå?', a: 'Ja, det er mulig å booke behandling direkte etter konsultasjon.' },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(behandlingerData).map((slug) => ({ slug }))
}

const customMetaTitles: Record<string, { title: string; description: string }> = {
  'prx-t33': {
    title: 'PRX-T33 i Sandnes | Biorevitalisering uten nåler | SOMI Klinikken',
    description:
      'PRX-T33 biorevitalisering uten nåler i Sandnes. Strammer opp, gir glød og forbedrer hudkvaliteten. Minimal nedetid. Book tid hos SOMI Klinikken.',
  },
  'biorepeel-cl3': {
    title: 'BioRePeel CL3 i Sandnes | Skånsom peeling og hudfornyelse | SOMI Klinikken',
    description:
      'BioRePeel CL3 skånsom medisinsk peeling i Sandnes. Kombinerer eksfoliering, biostimulering og hudfornyelse. Passer alle hudtyper. Book tid hos SOMI Klinikken.',
  },
  'laser-tattoo-removal': {
    title: 'Laser tatoveringsfjerning i Sandnes | SOMI Klinikken',
    description:
      'Trygg og skånsom laser tattoofjerning i Sandnes. Se resultat etter kun 2 behandlinger. Vi tilbyr også saline removal. Book gratis konsultasjon hos SOMI Klinikken.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const d = behandlingerData[slug]
  if (!d) return {}
  const custom = customMetaTitles[slug]
  return {
    title: custom?.title ?? `${d.title} i Sandnes | SOMI Klinikken`,
    description: custom?.description ?? d.heroDesc.slice(0, 155),
    openGraph: {
      type: 'website',
      title: custom?.title ?? `${d.title} i Sandnes | SOMI Klinikken`,
      description: custom?.description ?? d.heroDesc,
    },
    alternates: {
      canonical: `https://somiklinikken.no/behandlinger/${slug}`,
    },
  }
}

// Resultater bilder for relevante behandlinger
const resultaterImages: Record<string, { src: string; alt: string }[]> = {
  'permanent-makeup': [
    { src: '/img/resultater/microblading-foer-etter-somi-klinikken-sandnes-1.webp', alt: 'Microblading resultat SOMI Klinikken Sandnes' },
    { src: '/img/resultater/permanent-makeup-powder-brows-somi-sandnes-3.webp', alt: 'Powder Brows resultat SOMI Klinikken' },
    { src: '/img/resultater/permanent-makeup-naturlige-bryn-somi-4.webp', alt: 'Permanent makeup naturlige bryn SOMI' },
  ],
}

export default async function BehandlingPage({ params }: Props) {
  const { slug } = await params
  const d = behandlingerData[slug]
  if (!d) notFound()

  const imgs = resultaterImages[slug] ?? []
  const displayTitle = d.title.includes('Sandnes') ? d.title : `${d.title} i Sandnes`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: displayTitle,
    description: d.heroDesc,
    procedureType: 'https://schema.org/CosmeticProcedure',
    provider: {
      '@type': 'MedicalOrganization',
      name: 'SOMI Klinikken',
      address: { '@type': 'PostalAddress', streetAddress: 'Langgata 31', addressLocality: 'Sandnes', postalCode: '4306', addressCountry: 'NO' },
    },
    url: `https://somiklinikken.no/behandlinger/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ paddingTop: 0, paddingBottom: 64 }}>

        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg,#383838 0%,#4a4540 100%)',
          padding: '80px 0',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/img/klinikk/somi-klinikken-interior-sandnes.webp)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.15,
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <nav style={{ marginBottom: 20 }}>
              <a href="/behandlinger" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, textDecoration: 'none' }}>
                ← Alle behandlinger
              </a>
            </nav>
            <div className="kicker" style={{ color: 'rgba(255,255,255,0.7)' }}>SOMI Klinikken Sandnes</div>
            <h1 className="h1" style={{ color: '#fff', marginTop: 10 }}>{displayTitle}</h1>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 18, maxWidth: '56ch', marginTop: 14 }}>
              {d.heroDesc}
            </p>
            <div className="cta-row" style={{ marginTop: 28 }}>
              <a href="/booking" style={{
                display: 'inline-flex', alignItems: 'center', padding: '12px 22px',
                borderRadius: 999, background: '#6B7B8D', color: '#fff',
                border: 'none', fontWeight: 600, textDecoration: 'none', fontSize: 15,
              }}>
                Book gratis konsultasjon
              </a>
              <a href="/priser" className="btn btn--ghost">Se priser</a>
            </div>
          </div>
        </section>

        <div className="container" style={{ maxWidth: 820, marginTop: 56 }}>

          {/* Video (valgfritt) */}
          {d.video && (
            <section style={{ marginBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="h2" style={{ marginBottom: 16, alignSelf: 'flex-start' }}>{d.video.heading}</h2>
              <div style={{
                borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(56,56,56,0.08)',
                width: '100%', maxWidth: 420,
              }}>
                <video
                  src={d.video.src}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={d.video.heading}
                  style={{ width: '100%', aspectRatio: '9/16', objectFit: 'cover', display: 'block', background: '#000' }}
                />
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4f4f4f', marginTop: 14, alignSelf: 'flex-start' }}>{d.video.caption}</p>
            </section>
          )}

          {/* Hva er behandlingen */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>Hva er {d.title.split('–')[0].trim().toLowerCase()}?</h2>
            <p style={{ fontSize: 17, lineHeight: 1.75 }}>{d.hvaSer}</p>
          </section>

          {/* Effektiv mot (valgfritt – vises kun for peeling-behandlinger) */}
          {d.effektMot && (
            <section style={{ marginBottom: 48, padding: '24px 28px', borderRadius: 18, background: 'rgba(237,229,221,0.4)', border: '1px solid rgba(56,56,56,0.08)' }}>
              <h2 className="h2" style={{ marginBottom: 14 }}>Behandlingen er effektiv mot:</h2>
              <ul style={{ paddingLeft: 20, display: 'grid', gap: 8, margin: 0 }}>
                {d.effektMot.map((item, i) => (
                  <li key={i} style={{ fontSize: 16, lineHeight: 1.65 }}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Hvem passer det for */}
          <section style={{ marginBottom: 48, padding: '28px 32px', borderRadius: 18, background: 'rgba(237,229,221,0.4)', border: '1px solid rgba(56,56,56,0.08)' }}>
            <h2 className="h2" style={{ marginBottom: 14 }}>Hvem passer det for?</h2>
            <p style={{ fontSize: 17, lineHeight: 1.75 }}>{d.hvemPasser}</p>
          </section>

          {/* Før / etter (valgfritt) */}
          {d.beforeAfter && (
            <section style={{ marginBottom: 48 }}>
              <h2 className="h2" style={{ marginBottom: 16 }}>{d.beforeAfter.heading}</h2>
              <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(56,56,56,0.08)' }}>
                <Image
                  src={d.beforeAfter.src}
                  alt={d.beforeAfter.alt}
                  width={1400}
                  height={1053}
                  sizes="(max-width: 820px) 100vw, 780px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4f4f4f', marginTop: 14 }}>{d.beforeAfter.caption}</p>
            </section>
          )}

          {/* Fordeler (valgfritt) */}
          {d.fordeler && (
            <section style={{ marginBottom: 48, padding: '24px 28px', borderRadius: 18, background: 'rgba(107,123,141,0.06)', border: '1px solid rgba(107,123,141,0.18)' }}>
              <h2 className="h2" style={{ marginBottom: 14 }}>Fordeler</h2>
              <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 10, margin: 0 }}>
                {d.fordeler.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16, lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0, color: '#6B7B8D', fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Slik foregår behandlingen */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="h2" style={{ marginBottom: 20 }}>Slik foregår behandlingen</h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
              {d.steps.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
                    background: '#6B7B8D', color: '#fff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700,
                  }}>{i + 1}</span>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, paddingTop: 4 }}>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Før / Under / Etter */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="h2" style={{ marginBottom: 24 }}>Forberedelse og etterpleie</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
              <div style={{ padding: '20px 24px', borderRadius: 14, border: '1px solid rgba(56,56,56,0.08)', background: '#fff' }}>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, margin: '0 0 12px' }}>Før behandlingen</h3>
                <ul style={{ paddingLeft: 18, display: 'grid', gap: 8 }}>
                  {d.foer.map((tip, i) => (
                    <li key={i} style={{ fontSize: 15, lineHeight: 1.6 }}>{tip}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px 24px', borderRadius: 14, border: '1px solid rgba(56,56,56,0.08)', background: '#fff' }}>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, margin: '0 0 12px' }}>Under behandlingen</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>{d.under}</p>
              </div>
              <div style={{ padding: '20px 24px', borderRadius: 14, border: '1px solid rgba(56,56,56,0.08)', background: '#fff' }}>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, margin: '0 0 12px' }}>Etter behandlingen</h3>
                <ul style={{ paddingLeft: 18, display: 'grid', gap: 8 }}>
                  {d.etter.map((tip, i) => (
                    <li key={i} style={{ fontSize: 15, lineHeight: 1.6 }}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Resultater */}
          {imgs.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <h2 className="h2" style={{ marginBottom: 20 }}>Resultater</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
                {imgs.map((img) => (
                  <div key={img.src} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(56,56,56,0.08)' }}>
                    <Image src={img.src} alt={img.alt} width={400} height={500}
                      style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
              <a href="/resultater" style={{ display: 'inline-block', marginTop: 12, fontSize: 14, color: '#6B7B8D', fontWeight: 600 }}>
                Se alle resultater →
              </a>
            </section>
          )}

          {/* Priser */}
          <section style={{ marginBottom: 48, padding: '24px 28px', borderRadius: 18, background: 'rgba(107,123,141,0.08)', border: '1px solid rgba(107,123,141,0.2)' }}>
            <h2 className="h2" style={{ marginBottom: 10 }}>Priser</h2>
            <p style={{ fontSize: 16, lineHeight: 1.65 }}>
              Se fullstendig prisliste for alle behandlinger hos SOMI Klinikken.
            </p>
            <a href="/priser" className="btn" style={{ marginTop: 14, display: 'inline-flex' }}>
              Se fullstendig prisliste →
            </a>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 48 }}>
            <h2 className="h2" style={{ marginBottom: 24 }}>Ofte stilte spørsmål</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {d.faq.map((item, i) => (
                <div key={i} style={{ padding: '18px 22px', borderRadius: 14, border: '1px solid rgba(56,56,56,0.08)', background: '#fff' }}>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, margin: '0 0 8px', fontWeight: 400 }}>{item.q}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: '#4f4f4f', margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sammenligning PRX-T33 vs BioRePeel (vises når sammenligningLink er satt) */}
          {d.sammenligningLink && (
            <section style={{ marginBottom: 48, padding: '32px', borderRadius: 20, background: 'rgba(237,229,221,0.5)', border: '1px solid rgba(56,56,56,0.1)' }}>
              <h2 className="h2" style={{ marginBottom: 16 }}>{peelingSammenligning.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 24 }}>{peelingSammenligning.intro}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 22 }}>
                <div style={{ padding: '20px 22px', borderRadius: 14, background: '#fff', border: '1px solid rgba(56,56,56,0.08)' }}>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, margin: '0 0 12px' }}>PRX-T33 passer best for:</h3>
                  <ul style={{ paddingLeft: 18, display: 'grid', gap: 6, marginBottom: 12 }}>
                    {peelingSammenligning.prxPasser.map((item, i) => (
                      <li key={i} style={{ fontSize: 14, lineHeight: 1.6 }}>{item}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 13, color: '#4f4f4f', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
                    {peelingSammenligning.prxForklaring}
                  </p>
                </div>
                <div style={{ padding: '20px 22px', borderRadius: 14, background: '#fff', border: '1px solid rgba(56,56,56,0.08)' }}>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 17, margin: '0 0 12px' }}>BioRePeel CL3 passer best for:</h3>
                  <ul style={{ paddingLeft: 18, display: 'grid', gap: 6, marginBottom: 12 }}>
                    {peelingSammenligning.biorepeelPasser.map((item, i) => (
                      <li key={i} style={{ fontSize: 14, lineHeight: 1.6 }}>{item}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 13, color: '#4f4f4f', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
                    {peelingSammenligning.biorepeelForklaring}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{peelingSammenligning.avslutning}</p>
              <a
                href={`/behandlinger/${d.sammenligningLink.slug}`}
                style={{ color: '#6B7B8D', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
              >
                Les mer om {d.sammenligningLink.title} →
              </a>
            </section>
          )}

          {/* CTA bunn */}
          <div style={{
            padding: '36px 32px', borderRadius: 22,
            background: 'linear-gradient(135deg,rgba(237,229,221,0.6),rgba(107,123,141,0.12))',
            border: '1px solid rgba(107,123,141,0.2)', display: 'grid', gap: 12,
          }}>
            <div className="kicker">Klar for neste steg?</div>
            <h2 className="h2" style={{ margin: 0 }}>Book time hos SOMI Klinikken</h2>
            <p className="muted" style={{ maxWidth: '50ch' }}>
              {d.ctaText ?? 'Vi gir deg en gratis konsultasjon der vi vurderer hva som passer best for deg og svarer på alle spørsmål.'}
            </p>
            <div className="cta-row" style={{ marginTop: 6 }}>
              <a href="/booking" style={{
                display: 'inline-flex', alignItems: 'center', padding: '12px 22px',
                borderRadius: 999, background: '#6B7B8D', color: '#fff',
                border: 'none', fontWeight: 600, textDecoration: 'none', fontSize: 15,
              }}>
                Book time nå
              </a>
              <a className="btn" href="/priser">Se priser</a>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
