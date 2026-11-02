import type { Metadata } from 'next'
import Image from 'next/image'
import LaserBookingLink from '@/components/LaserBookingLink'
import '../tilbud/laser/laser.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'November hos SOMI | SOMI Klinikken',
  description:
    'November hos SOMI. 40 % prisfordel på laserhårfjerning, fjerning av permanent makeup og tatoveringsfjerning. Gjelder enkeltbehandlinger.',
  robots: { index: false, follow: true },
}

const behandlinger = [
  {
    number: '01',
    name: 'Laserhårfjerning',
    description:
      'Informasjon om laserbehandling for hårreduksjon, hvem behandlingen kan passe for og hva du bør vite før en konsultasjon.',
    href: '/behandlinger/laser-harfjerning',
    label: 'Les om laserhårfjerning',
  },
  {
    number: '02',
    name: 'Fjerning av permanent makeup',
    description:
      'Laserfjerning av PMU, for eksempel pigment i bryn. Hud og pigment vurderes individuelt før eventuell behandling.',
    href: '/behandlinger/fjerning-permanent-makeup',
    label: 'Les om PMU-fjerning',
  },
  {
    number: '03',
    name: 'Fjerning av tatoveringer',
    description:
      'Laserbehandling for gradvis reduksjon av tatoveringspigment. Behandlingsforløp og resultat avhenger av flere faktorer.',
    href: '/behandlinger/laser-tattoo-removal',
    label: 'Les om tatoveringsfjerning',
  },
]

const vilkar = [
  '40 % gjelder ordinære priser på enkeltbehandlinger innen de tre oppgitte laserkategoriene.',
  'Eksisterende pakkepriser og klippekort omfattes ikke av prisfordelen.',
  'Timebestilling må gjennomføres fra 9. til og med 30. november 2026.',
  'Selve behandlingen må gjennomføres senest 31. desember 2026.',
  'Priser, ledige timer og eventuelle tillegg fremgår av SOMIs bookingsystem.',
  'Behandlingen forutsetter individuell vurdering av egnethet og eventuelle risikofaktorer.',
]

type Props = { searchParams: Promise<{ forhandsvisning?: string }> }

export default async function SomiNovemberPage({ searchParams }: Props) {
  // Før 9. november vises novemberprisen kun via lenke til forhåndsvisning.
  const preview = (await searchParams).forhandsvisning === '1'
  const now = Date.now()
  const notStarted = now < Date.parse('2026-11-08T23:00:00Z')
  const ended = now >= Date.parse('2026-11-30T23:00:00Z')
  if (ended) {
    return (
      <main className="laser-offer">
        <section className="laser-offer__section laser-offer__closed">
          <p className="laser-offer__eyebrow">SOMI KLINIKKEN · SANDNES</p>
          <h1>November hos SOMI er avsluttet</h1>
          <p>Novemberprisene gjaldt bestillinger til og med 30. november 2026. Du finner informasjon om SOMIs ordinære behandlinger og priser på nettsiden.</p>
          <a className="laser-offer__button" href="/behandlinger">Se behandlinger</a>
        </section>
      </main>
    )
  }
  if (notStarted && !preview) {
    return (
      <main className="laser-offer">
        <section className="laser-offer__section laser-offer__closed">
          <p className="laser-offer__eyebrow">SOMI KLINIKKEN · SANDNES</p>
          <h1>Informasjon om laserbehandlinger</h1>
          <p>Du kan lese om behandlingene og tilgjengelige timer på våre ordinære sider.</p>
          <a className="laser-offer__button" href="/behandlinger">Se behandlinger</a>
        </section>
      </main>
    )
  }

  return (
    <main className="laser-offer">
      <section className="laser-offer__hero">
        <div className="laser-offer__hero-content">
          <p className="laser-offer__eyebrow">SOMI KLINIKKEN · NOVEMBER 2026</p>
          <h1>November hos SOMI</h1>
          <div className="laser-offer__discount">
            <span className="laser-offer__discount-number">−40 %</span>
            <span>prisfordel på alle laserbehandlinger</span>
          </div>
          <p className="laser-offer__intro">
            En anledning til å prioritere behandlingene du har vurdert.<br />
            Gjelder laserhårfjerning, fjerning av permanent makeup og tatoveringsfjerning.
          </p>
          <p className="laser-offer__dates">
            Bestill innen 30. november. <span aria-hidden="true">·</span>
            {' '}Behandling utføres innen 31. desember 2026.
          </p>
          <div className="laser-offer__actions">
            <LaserBookingLink className="laser-offer__button" placement="hero">
              Se behandlinger og priser <span aria-hidden="true">↗</span>
            </LaserBookingLink>
            <a className="laser-offer__secondary" href="#vilkar">Les vilkårene</a>
          </div>
        </div>
        <div className="laser-offer__visual">
          <Image
            src="/img/klinikk/somi-klinikken-interior-sandnes.webp"
            alt="Behandlingsrom hos SOMI Klinikken i Sandnes"
            width={840}
            height={1050}
            sizes="(max-width: 800px) 100vw, 44vw"
            priority
          />
        </div>
      </section>

      <section className="laser-offer__section laser-offer__section--services" aria-labelledby="laser-services-title">
        <div className="laser-offer__section-heading">
          <p className="laser-offer__eyebrow">BEHANDLINGENE</p>
          <h2 id="laser-services-title">Tre behandlingsområder</h2>
          <p>Les om behandlingen før du tar stilling til timebestilling. SOMI gjør en individuell faglig vurdering.</p>
        </div>
        <div className="laser-offer__cards">
          {behandlinger.map((b) => (
            <article className="laser-offer__card" key={b.href}>
              <span className="laser-offer__card-number">{b.number}</span>
              <h3>{b.name}</h3>
              <p>{b.description}</p>
              <a href={b.href}>{b.label} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="laser-offer__section laser-offer__details" id="vilkar" aria-labelledby="laser-terms-title">
        <div>
          <p className="laser-offer__eyebrow">PRAKTISK INFORMASJON</p>
          <h2 id="laser-terms-title">Praktisk om novemberprisen</h2>
          <p>
            Novemberprisene gjelder bare i den angitte perioden. En behandling kan kreve flere timer over tid,
            og resultater kan variere. Klinikken vurderer alltid hva som er egnet.
          </p>
        </div>
        <ul className="laser-offer__terms">
          {vilkar.map((v) => <li key={v}>{v}</li>)}
        </ul>
      </section>

      <section className="laser-offer__bottom" aria-label="Kontakt og timebestilling">
        <div>
          <p className="laser-offer__eyebrow">SOMI KLINIKKEN · SANDNES</p>
          <h2>Spørsmål om laserbehandling?</h2>
          <p>Ta kontakt med klinikken for vurdering av behandlingsmuligheter, priser og eventuelle kontraindikasjoner.</p>
        </div>
        <div className="laser-offer__bottom-actions">
          <LaserBookingLink className="laser-offer__button" placement="footer">
            Timebestilling <span aria-hidden="true">↗</span>
          </LaserBookingLink>
          <a className="laser-offer__secondary" href="/kontakt">Kontakt SOMI</a>
        </div>
      </section>
    </main>
  )
}
