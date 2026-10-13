import type { Metadata } from 'next'
import Image from 'next/image'
import './profhilo.css'

export const metadata: Metadata = {
  title: 'Profhilo i Sandnes | Naturlig hudforbedring | SOMI Klinikken',
  description: 'Profhilo hos SOMI Klinikken i Sandnes. Hyaluronsyre for dyp fukt, elastisitet og bedre hudkvalitet uten å tilføre volum.',
  alternates: { canonical: 'https://somiklinikken.no/behandlinger/profhilo' },
}

const Drop=()=> <svg viewBox="0 0 48 48"><path d="M24 5S10 22 10 31a14 14 0 0 0 28 0C38 22 24 5 24 5Z"/></svg>
const Waves=()=> <svg viewBox="0 0 48 48"><path d="M5 17c7-7 13 7 20 0s13 7 18 0M5 25c7-7 13 7 20 0s13 7 18 0M5 33c7-7 13 7 20 0s13 7 18 0"/></svg>
const Spark=()=> <svg viewBox="0 0 48 48"><path d="m24 5 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Zm14 22 2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z"/></svg>
const Leaf=()=> <svg viewBox="0 0 48 48"><path d="M39 8C24 8 11 16 10 29c0 7 5 11 11 11 12 0 18-13 18-32ZM11 39c5-8 12-14 22-20"/></svg>

const benefits=[
  ['Dyp fukt','Øker fuktigheten i huden',<Drop key="d"/>],
  ['Bedre elastisitet','Bidrar til bedre spenst',<Waves key="w"/>],
  ['Naturlig glød','Jevnere og friskere hud',<Spark key="s"/>],
  ['Hudkvalitet','Et naturlig, uthvilt uttrykk',<Leaf key="l"/>],
]
const steps=[
  ['01','Konsultasjon og hudvurdering','Vi vurderer huden, kartlegger behov og ser om Profhilo er riktig behandling for deg.'],
  ['02','Behandling','Profhilo injiseres i et lite antall nøye utvalgte punkter. Behandlingen tar vanligvis ca. 15–30 minutter.'],
  ['03','Behandlingsserie','For best mulig resultat anbefales ofte 2 behandlinger med omtrent 4 ukers mellomrom.'],
  ['04','Vedlikehold','Resultatet utvikler seg gradvis. Vedlikehold vurderes individuelt over tid.'],
]
const areas=[
  ['Ansikt','Forbedrer hudkvalitet, glød og elastisitet.'],
  ['Hals','Bidrar til jevnere og mer hydrert hud.'],
  ['Dekolletasje','Forbedrer hudens struktur og fine linjer.'],
  ['Hender','Tilfører fukt og støtter hudkvaliteten.'],
]

export default function ProfhiloPage(){
  return <main className="profhilo-page">
    <section className="prof-hero">
      <div className="prof-hero__copy" data-scroll-fade>
        <div className="prof-kicker">Behandling · Profhilo®</div>
        <h1>Naturlig hudforbedring innenfra</h1>
        <p className="prof-lead">En innovativ injeksjonsbehandling med hyaluronsyre som gir dyp fukt, bedre elastisitet og en friskere, jevnere hud – uten å tilføre volum.</p>
        <div className="prof-actions"><a className="prof-btn prof-btn--primary" href="/booking">Book konsultasjon →</a><a className="prof-btn prof-btn--ghost" href="#slik-fungerer">Les mer</a></div>
      </div>
      <div className="prof-hero__media" data-scroll-fade>
        <Image src="/img/profhilo/profhilo-portrait.webp" alt="Kvinne med naturlig glød og hydrert hud – Profhilo hos SOMI Klinikken" fill priority sizes="(max-width:900px) 100vw,52vw"/>
        <div className="prof-orb prof-orb--one"><Drop/></div><div className="prof-orb prof-orb--two"><Spark/></div><div className="prof-orb prof-orb--three"><Leaf/></div>
      </div>
    </section>
    <section className="prof-benefits" aria-label="Fordeler med Profhilo">
      {benefits.map(([title,text,icon],i)=><article className="prof-benefit" data-scroll-fade style={{'--delay':`${i*90}ms`} as React.CSSProperties} key={String(title)}>
        <div className="prof-icon">{icon}</div><div><strong>{title}</strong><span>{text}</span></div>
      </article>)}
    </section>

    <section className="prof-split prof-section" id="slik-fungerer">
      <div className="prof-copy" data-scroll-fade>
        <div className="prof-kicker">Hva er Profhilo?</div>
        <h2>Hyaluronsyre som arbeider med hudens egne prosesser</h2>
        <p>Profhilo er en injeksjonsbehandling med høy konsentrasjon av hyaluronsyre. Behandlingen er utviklet for å spre seg i vevet og støtte hudens fuktighet, elastisitet og generelle kvalitet.</p>
        <p>Den er ikke ment å bygge volum eller endre ansiktstrekk. Målet er en gradvis forbedring av hudkvaliteten og et mer naturlig, friskt uttrykk.</p>
      </div>
      <div className="prof-molecule" data-scroll-fade>
        <div className="prof-molecule__blob"/>
        <div className="prof-callout prof-callout--a"><b>Ren hyaluronsyre</b><span>Høy konsentrasjon som fordeles i huden</span></div>
        <div className="prof-callout prof-callout--b"><b>Stimulerer</b><span>Hudens egne prosesser</span></div>
        <div className="prof-callout prof-callout--c"><b>Forbedrer</b><span>Fuktighet, elastisitet og hudkvalitet</span></div>
      </div>
    </section>

    <section className="prof-section prof-process">
      <div className="prof-section__head" data-scroll-fade><div className="prof-kicker">Behandlingsforløp</div><h2>Slik foregår Profhilo-behandlingen</h2><p>En trygg og oversiktlig behandling i fire enkle steg.</p></div>
      <div className="prof-timeline">{steps.map(([n,title,text],i)=><article className="prof-step" data-scroll-fade style={{'--delay':`${i*100}ms`} as React.CSSProperties} key={n}>
        <span className="prof-step__num">{n}</span><div><h3>{title}</h3><p>{text}</p></div>
      </article>)}</div>
    </section>
    <section className="prof-areas prof-section">
      <div className="prof-areas__visual" data-scroll-fade>
        <Image src="/img/profhilo/profhilo-portrait.webp" alt="Profhilo kan brukes i ansikt, hals, dekolletasje og på hender" fill sizes="(max-width:900px) 100vw,48vw"/>
        {areas.map(([title],i)=><span key={title} className={`prof-area-dot prof-area-dot--${i+1}`}><span>{title}</span></span>)}
      </div>
      <div className="prof-areas__copy">
        <div className="prof-kicker" data-scroll-fade>Behandlingsområder</div>
        <h2 data-scroll-fade>Profhilo kan brukes der huden trenger fornyet fukt og spenst</h2>
        <div className="prof-area-list">{areas.map(([title,text],i)=><article data-scroll-fade style={{'--delay':`${i*80}ms`} as React.CSSProperties} key={title}>
          <span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div>
        </article>)}</div>
      </div>
    </section>

    <section className="prof-facts prof-section">
      <div className="prof-section__head" data-scroll-fade><div className="prof-kicker">Kort fortalt</div><h2>Hva kan du forvente?</h2></div>
      <div className="prof-fact-grid">
        <article data-scroll-fade><h3>Passer spesielt for</h3><p>Tørr eller dehydrert hud, redusert spenst og elastisitet, fine linjer og ønske om mer glød og bedre hudkvalitet.</p></article>
        <article data-scroll-fade><h3>Behandlingstid</h3><p>Vanligvis ca. 15–30 minutter. Små hevelser ved injeksjonspunktene kan forekomme kort tid etter behandling.</p></article>
        <article data-scroll-fade><h3>Når ser man resultat?</h3><p>Mange opplever økt fukt og glød etter noen uker. Resultatet utvikler seg gradvis over de neste månedene.</p></article>
        <article data-scroll-fade><h3>Når behandles man ikke?</h3><p>Behandling utføres ikke ved graviditet eller amming, eller ved aktiv hudinfeksjon i behandlingsområdet. Endelig vurdering gjøres i konsultasjon.</p></article>
      </div>
    </section>

    <section className="prof-cta" data-scroll-fade>
      <div><div className="prof-kicker">Sunn hud · naturlig uttrykk</div><h2>Usikker på om Profhilo passer for deg?</h2><p>Vi vurderer huden din og lager en individuell plan i konsultasjonen.</p></div>
      <a className="prof-btn prof-btn--primary" href="/booking">Book konsultasjon →</a>
    </section>
  </main>
}
