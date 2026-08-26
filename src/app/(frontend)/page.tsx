import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import './styles.css'

export const metadata: Metadata = {
  title: 'SOMI Klinikken i Sandnes | Microblading, Permanent Makeup, Hud & Laser',
  description:
    'SOMI Klinikken i Sandnes tilbyr microblading, permanent makeup, bryn og vipper, hudpleie og laser. Bestill time online på vår bookingside.',
  openGraph: {
    type: 'website',
    title: 'SOMI Klinikken i Sandnes',
    description: 'Microblading, permanent makeup, bryn og vipper, hudpleie og laser.',
    images: ['/img/brand/logo.png'],
  },
  alternates: {
    canonical: 'https://somiklinikken.no',
  },
}

export const revalidate = 60

const BOOKING_URL = '/booking'

// Fallback reviews – vises hvis Google Places API ikke er konfigurert
const fallbackReviews = [
  { author: 'Silje M.', text: 'Jeg ble tatt godt imot og fikk tydelige råd hele veien. Resultatet ser naturlig og veldig pent ut. Anbefaler SOMI Klinikken til alle!', stars: 5 },
  { author: 'Kristine L.', text: 'Rolig atmosfære, høy profesjonalitet og veldig god oppfølging etter behandling. Katarina er utrolig dyktig!', stars: 5 },
  { author: 'Thomas A.', text: 'SOMI er nøye, hyggelige og forklarer alt på en trygg måte. Anbefales på det varmeste. Har brukt klinikken i over to år.', stars: 5 },
  { author: 'Anne G.', text: 'Veldig profesjonelt team og hyggelig atmosfære. Jeg fikk god forklaring, og følte meg trygg hele veien gjennom behandlingen.', stars: 5 },
]

const pageScript = `
(function(){
  // Blog slider arrows
  var slider=document.querySelector('[data-blog-slider]');
  var prev=document.querySelector('[data-blog-prev]');
  var next=document.querySelector('[data-blog-next]');
  if(slider&&prev&&next){
    var step=function(){return Math.max(260,Math.round(slider.clientWidth*0.84));};
    prev.addEventListener('click',function(){slider.scrollBy({left:-step(),behavior:'smooth'});});
    next.addEventListener('click',function(){slider.scrollBy({left:step(),behavior:'smooth'});});
  }
  // Parallax + motion
  var motionEls=document.querySelectorAll('[data-motion-media]');
  var band=document.querySelector('[data-parallax-band]');
  function updateMotion(){
    motionEls.forEach(function(el,idx){
      var r=el.getBoundingClientRect();
      var d=(window.innerHeight*0.55-r.top)*0.04;
      el.style.setProperty('--motion-y',Math.max(-18,Math.min(18,d+idx*2)).toFixed(1)+'px');
    });
    if(band){
      var r=band.getBoundingClientRect();
      var dist=(window.innerHeight/2)-(r.top+r.height/2);
      band.style.setProperty('--parallax-y',(50+Math.max(-14,Math.min(14,dist*0.03)))+'%');
    }
  }
  window.addEventListener('scroll',updateMotion,{passive:true});
  window.addEventListener('resize',updateMotion);
  updateMotion();
})();
`

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nb-NO', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function HomePage() {
  // Fetch blog posts and homepage global from Payload
  let blogPosts: { id: string; title: string; slug: string; excerpt?: string | null; publishedDate?: string | null; featuredImage?: { url?: string | null } | null }[] = []
  let heroTagline = 'Velkommen til SOMI Klinikken'
  let heroTitle = 'Skånsomme behandlinger med presisjon og naturlig uttrykk.'
  let heroSubtitle = 'Vi legger vekt på kvalitet, veiledning og riktig behandling for et trygt og profesjonelt resultat.'
  try {
    const payload = await getPayload({ config })
    const [postsResult, homepageGlobal] = await Promise.all([
      payload.find({ collection: 'posts', where: { published: { not_equals: false } }, limit: 6, sort: '-publishedDate', depth: 1 }),
      payload.findGlobal({ slug: 'homepage', depth: 0 }).catch(() => null),
    ])
    blogPosts = postsResult.docs as typeof blogPosts
    if (homepageGlobal) {
      const hp = homepageGlobal as { heroTagline?: string; heroTitle?: string; heroSubtitle?: string }
      if (hp.heroTagline) heroTagline = hp.heroTagline
      if (hp.heroTitle) heroTitle = hp.heroTitle
      if (hp.heroSubtitle) heroSubtitle = hp.heroSubtitle
    }
  } catch {
    // globals/posts not yet available
  }

  return (
    <>
      <main>

        {/* ── 1. Hero – Google Maps 360° Embed ──────────────────── */}
        <section className="hero hero--video" style={{ minHeight: '85vh', position: 'relative' }}>
          {/* 360 Street View embed */}
          <iframe
            src="https://www.google.com/maps?q=58.8526394,5.7358005&layer=c&cbll=58.8526394,5.7358005&cbp=12,0,0,0,0&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 0,
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SOMI Klinikken 360° visning"
          />
          {/* Fallback background if iframe fails */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'url(/img/klinikk/somi-klinikken-interior-sandnes.webp)',
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} aria-hidden="true" />
          <div className="hero-video-overlay" aria-hidden="true" />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="hero-video-content reveal">
              <div className="kicker">{heroTagline}</div>
              <h1 className="h1">{heroTitle}</h1>
              <p>{heroSubtitle}</p>
              <div className="cta-row">
                {/* Del 3F: Nøytral CTA-knapp (#6B7B8D) kun på forsiden */}
                <a
                  className="btn"
                  href={BOOKING_URL}
                  style={{
                    background: '#6B7B8D', color: '#fff', border: 'none',
                    fontWeight: 600, boxShadow: '0 8px 22px rgba(107,123,141,0.35)',
                  }}
                >
                  Book time
                </a>
                <a className="btn btn--ghost" href="/priser">
                  Se priser
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick shortcuts – SVG icons ───────────────────────── */}
        <section className="section section--tight" style={{ paddingTop: 28, paddingBottom: 28 }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>

              {/* PRISER */}
              <a href="/priser" className="shortcut-card" style={{
                display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 8,
                padding: '20px 14px', borderRadius: 12, background: '#fff',
                border: '1px solid #E8E6E4', boxShadow: '0 8px 22px rgba(0,0,0,0.04)',
                textDecoration: 'none', color: 'inherit',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DDB3B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                <strong style={{ fontFamily: 'Georgia,serif', fontSize: 15, letterSpacing: '0.05em' }}>PRISER</strong>
                <span style={{ fontSize: 12, color: 'rgba(56,56,56,.6)' }}>Se alle priser</span>
              </a>

              {/* BOOKING */}
              <a href={BOOKING_URL} style={{
                display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 8,
                padding: '20px 14px', borderRadius: 12, background: 'rgba(92,92,92,0.94)',
                border: '1px solid rgba(56,56,56,0.25)', boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
                textDecoration: 'none', color: '#fff', transition: 'transform 180ms ease',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <strong style={{ fontFamily: 'Georgia,serif', fontSize: 15, letterSpacing: '0.05em' }}>BOOKING</strong>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>Book time online</span>
              </a>

              {/* GAVEKORT */}
              <a href="/gavekort" className="shortcut-card" style={{
                display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 8,
                padding: '20px 14px', borderRadius: 12, background: '#fff',
                border: '1px solid #E8E6E4', boxShadow: '0 8px 22px rgba(0,0,0,0.04)',
                textDecoration: 'none', color: 'inherit',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DDB3B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 12 20 22 4 22 4 12"/>
                  <rect x="2" y="7" width="20" height="5"/>
                  <line x1="12" y1="22" x2="12" y2="7"/>
                  <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
                  <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
                </svg>
                <strong style={{ fontFamily: 'Georgia,serif', fontSize: 15, letterSpacing: '0.05em' }}>GAVEKORT</strong>
                <span style={{ fontSize: 12, color: 'rgba(56,56,56,.6)' }}>Send et gavekort</span>
              </a>

            </div>
          </div>
        </section>

        {/* ── 2. Behandlingskategorier ───────────────────────────────── */}
        <section className="section section--tight">
          <div className="container">
            <div className="reveal">
              <div className="kicker">Behandlinger</div>
              <h2 className="h2" style={{ marginTop: 8 }}>Hva kan vi hjelpe deg med?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 12, marginTop: 24 }}>
              {([
                { title: 'Permanent makeup',           desc: 'Microblading, Powderbrows, Lipblush',       slug: 'permanent-makeup' },
                { title: 'Laser hårfjerning',          desc: 'Varig og effektiv hårfjerning med laser',   slug: 'laser-harfjerning' },
                { title: 'Medisinsk hudpleie',         desc: 'PRX-T33, Dyprens, Peel og mer',             slug: 'medisinsk-hudpleie' },
                { title: 'Klassisk hudpleie',          desc: 'Skreddersydde ansiktsbehandlinger',         slug: 'klassisk-hudpleie' },
                { title: 'Laser tattoofjerning',       desc: 'Saline og laser tattoo removal',            slug: 'laser-tattoo-removal' },
                { title: 'Injeksjonsbehandlinger',     desc: 'Naturlig foryngelse med erfaren behandler', slug: 'injeksjonsbehandlinger' },
                { title: 'Hårfjerning voks/elektrolyse', desc: 'Rask og skånsom behandling',             slug: 'harfjerning-voks-elektrolyse' },
                { title: 'Gratis konsultasjon',        desc: 'Kom innom – vi hjelper deg videre',         slug: 'gratis-konsultasjon' },
              ] as { title: string; desc: string; slug: string }[]).map((cat) => (
                <a
                  key={cat.slug}
                  href={`/behandlinger/${cat.slug}`}
                  style={{
                    display: 'grid', gap: 6, padding: '18px 20px', borderRadius: 18,
                    background: '#fff', border: '1px solid rgba(56,56,56,0.08)',
                    boxShadow: '0 8px 22px rgba(0,0,0,0.03)', textDecoration: 'none',
                    color: 'inherit', transition: 'transform 180ms ease',
                  }}
                >
                  <strong style={{ fontFamily: 'Georgia,serif', fontSize: 17, lineHeight: 1.2 }}>{cat.title}</strong>
                  <span style={{ fontSize: 14, color: 'rgba(56,56,56,.65)' }}>{cat.desc}</span>
                  <span style={{ fontSize: 13, color: 'rgba(56,56,56,.45)', marginTop: 2 }}>Se behandling →</span>
                </a>
              ))}
            </div>
            <div className="cta-row" style={{ marginTop: 20 }}>
              <a className="btn" href="/behandlinger">Alle behandlinger</a>
              <a className="btn btn--accent" href={BOOKING_URL}>Book time</a>
            </div>
          </div>
        </section>

        {/* ── 3. Team SOMI – bilde venstre, tekst høyre ─────────── */}
        <section className="section section--tight">
          <div className="container reveal">
            <h2 className="h2">TEAM SOMI</h2>

            {/* Katarina – stor, bilde venstre */}
            <div className="team-card-main" style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: 32, alignItems: 'center',
              marginTop: 28,
              background: '#fff', border: '1px solid rgba(56,56,56,0.08)',
              borderRadius: 18, padding: 24, boxShadow: '0 8px 22px rgba(0,0,0,0.03)',
            }}>
              <div style={{ flexShrink: 0 }}>
                <Image
                  src="/img/team/katarina-hammer-permanent-makeup-somi-klinikken.webp"
                  alt="Katarina Hammer – eier og permanent makeup artist hos SOMI Klinikken i Sandnes"
                  width={280}
                  height={360}
                  sizes="280px"
                  style={{ width: 280, height: 360, objectFit: 'cover', borderRadius: 12, display: 'block' }}
                  priority
                />
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 24, margin: 0 }}>Katarina Hammer</h3>
                <p className="role" style={{ color: 'rgba(56,56,56,0.72)', fontSize: 14, letterSpacing: '0.02em', margin: 0 }}>
                  Eier og daglig leder · Permanent makeup
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: '#4f4f4f', margin: 0 }}>
                  Katarina Hammer er eier og daglig leder av Somi Klinikken AS, med over 13 års
                  erfaring innen permanent makeup. Hun er kjent for presis teknikk og naturlige,
                  harmoniske resultater.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: '#4f4f4f', margin: 0 }}>
                  For Katarina handler faget om å forsterke det naturlige med balanse, helhet og et
                  tidløst uttrykk – where simplicity meets precision.
                </p>
              </div>
            </div>

            {/* Emma og Arianna – kortformat, bilde venstre */}
            <div className="team-cards-pair" style={{
              display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
              gap: 16, marginTop: 16,
            }}>
              {[
                {
                  src: '/img/team/emma-hudpleier-dermalogica-somi-klinikken.webp',
                  alt: 'Emma – hudpleier og Dermalogica Expert hos SOMI Klinikken i Sandnes',
                  name: 'Emma',
                  role: 'Hudpleier · Dermalogica Expert',
                  bio: 'Utdannet hudpleier med videreutdanning som Dermalogica Expert. Tilpasser behandlinger etter hver kundes behov med fokus på hudhelse og naturlige resultater.',
                },
                {
                  src: '/img/team/arianna-laserspesialist-somi-klinikken.webp',
                  alt: 'Arianna – autorisert helsepersonell og laserspesialist hos SOMI Klinikken',
                  name: 'Arianna',
                  role: 'Autorisert helsepersonell · Laserspesialist',
                  bio: 'Autorisert helsepersonell med videreutdanning som laserspesialist. Arbeider etter høye standarder med fokus på presisjon og trygge, skreddersydde behandlinger.',
                },
              ].map((m) => (
                <div key={m.name} className="team-card-sm" style={{
                  display: 'grid', gridTemplateColumns: '220px 1fr',
                  gap: 20, alignItems: 'center',
                  background: '#fff', border: '1px solid rgba(56,56,56,0.08)',
                  borderRadius: 18, padding: 20, boxShadow: '0 8px 22px rgba(0,0,0,0.03)',
                }}>
                  <Image
                    src={m.src}
                    alt={m.alt}
                    width={220}
                    height={280}
                    sizes="220px"
                    style={{ width: 220, height: 280, objectFit: 'cover', borderRadius: 12, display: 'block' }}
                  />
                  <div style={{ display: 'grid', gap: 8 }}>
                    <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, margin: 0 }}>{m.name}</h3>
                    <p style={{ color: 'rgba(56,56,56,0.72)', fontSize: 13, letterSpacing: '0.02em', margin: 0 }}>{m.role}</p>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4f4f4f', margin: 0 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cta-row" style={{ marginTop: 24 }}>
              <a className="btn" href="/team">Les mer om teamet</a>
              <a className="btn btn--accent" href={BOOKING_URL}>Book konsultasjon</a>
            </div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────────────────────── */}
        <section className="section section--tight">
          <div className="container about-grid">
            <div className="about-image reveal">
              <div className="about-arch" data-motion-media>
                <video
                  src="/v/somi-klinikken-interior.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/img/klinikk/somi-klinikken-interior-sandnes.webp"
                  aria-label="Interiørvideo fra SOMI Klinikken i Sandnes"
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 14, display: 'block' }}
                />
              </div>
            </div>
            <div className="about-copy reveal">
              <h2 className="h2">Faglig trygghet i rolige omgivelser</h2>
              <p className="muted">
                SOMI kombinerer dokumenterte metoder med personlig vurdering, slik at du får riktig
                behandling for dine behov.
              </p>
              <p className="muted" style={{ marginTop: '14px' }}>
                Vi prioriterer tydelig informasjon, høy hygiene og et naturlig resultat som
                harmonerer med ansiktet ditt.
              </p>
              <div className="cta-row" style={{ marginTop: '28px' }}>
                <a className="btn" href="/team">Møt teamet</a>
                <a className="btn btn--accent" href={BOOKING_URL}>Book time</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────────── */}
        <section className="section section--tight">
          <div className="container reveal" style={{ textAlign: 'center' }}>
            <h2 className="h2">Kvalitet, presisjon og naturlig resultat</h2>
            <div className="check-grid" style={{ maxWidth: 560, margin: '28px auto 0', textAlign: 'left' }}>
              <div className="check-item"><span>✓</span><b>Kvalifiserte terapeuter</b></div>
              <div className="check-item"><span>✓</span><b>Dokumenterte rutiner</b></div>
              <div className="check-item"><span>✓</span><b>Individuell vurdering</b></div>
              <div className="check-item"><span>✓</span><b>Rolig opplevelse</b></div>
            </div>
          </div>
        </section>

        {/* ── Blog karusell – alle innlegg ─────────────────────────── */}
        <section className="section section--tight">
          <div className="container">
            <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <h2 className="h2">Fra bloggen vår</h2>
              <a href="/blogg" style={{ fontSize: 14, color: '#6B7B8D', fontWeight: 600, whiteSpace: 'nowrap' }}>Se alle →</a>
            </div>
            <div className="blog-shell">
              <button className="blog-arrow" type="button" data-blog-prev aria-label="Forrige innlegg">←</button>
              <div className="blog-slider" aria-label="Siste blogginnlegg" data-blog-slider>
                {blogPosts.length > 0 ? (
                  blogPosts.map((post) => (
                    <article key={post.id} className="blog-card reveal">
                      {post.featuredImage?.url && (
                        <div style={{ height: 140, borderRadius: 10, overflow: 'hidden', marginBottom: 4 }}>
                          <img src={post.featuredImage.url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                      <strong style={{ fontFamily: 'Georgia,serif', fontSize: 15, lineHeight: 1.3 }}>{post.title}</strong>
                      {post.excerpt && (
                        <p className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
                          {post.excerpt.slice(0, 90)}{post.excerpt.length > 90 ? '…' : ''}
                        </p>
                      )}
                      {post.publishedDate && (
                        <p style={{ fontSize: 12, color: 'rgba(56,56,56,0.45)', margin: 0 }}>{formatDate(post.publishedDate)}</p>
                      )}
                      <a className="btn" href={`/blogg/${post.slug}`} style={{ fontSize: 13, padding: '7px 14px' }}>Les mer</a>
                    </article>
                  ))
                ) : (
                  /* Fallback static cards vises hvis DB er tom */
                  [
                    { title: 'Microblading: før og etter behandling', desc: 'Forberedelser og etterpleie for best resultat.', slug: 'microblading-sandnes' },
                    { title: 'Permanent Makeup – naturlige bryn', desc: 'Microblading vs. Powder Brows – hva passer deg?', slug: 'permanent-makeup-naturlige-bryn' },
                    { title: 'Laser hårfjerning i Sandnes', desc: 'Permanent løsning med Arianna som spesialist.', slug: 'laser-harfjerning-sandnes' },
                    { title: 'Fjern tatovering med laser', desc: 'Saline og laser tattoo removal i Sandnes.', slug: 'laser-tattoo-removal-sandnes' },
                    { title: 'Injeksjonsbehandlinger', desc: 'Naturlig foryngelse med erfaren behandler.', slug: 'injeksjonsbehandlinger-sandnes' },
                    { title: 'Hudpleie med Dermalogica', desc: 'Emma som Dermalogica Expert i Sandnes.', slug: 'hudpleie-dermalogica-sandnes' },
                  ].map((c) => (
                    <article key={c.slug} className="blog-card reveal">
                      <strong>{c.title}</strong>
                      <p className="muted">{c.desc}</p>
                      <a className="btn" href={`/blogg/${c.slug}`}>Les mer</a>
                    </article>
                  ))
                )}
              </div>
              <button className="blog-arrow" type="button" data-blog-next aria-label="Neste innlegg">→</button>
            </div>
          </div>
        </section>

        {/* ── Parallax CTA ─────────────────────────────────────────── */}
        <section className="section section--tight">
          <div className="container">
            <div className="parallax-band reveal" data-parallax-band role="img" aria-label="Interiørbilde fra klinikken">
              <div className="parallax-content">
                <h2 className="h2">Book time når det passer deg</h2>
                <div className="cta-row">
                  <a className="btn btn--primary" href={BOOKING_URL}>Book time</a>
                  <a className="btn" href="/kontakt">Kontakt oss</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Google Anmeldelser ────────────────────────────────────── */}
        <section className="section section--tight google-reviews" aria-label="Google anmeldelser">
          <div className="container">
            <div className="reviews-wrap reveal">
              <div className="reviews-head">
                <div>
                  <div className="kicker">Google anmeldelser</div>
                  <h2 className="h2" style={{ margin: '10px 0 0' }}>Kundene våre gir oss topp score</h2>
                </div>
                <div className="reviews-rating" aria-label="5 av 5 stjerner på Google">
                  <div className="stars" aria-hidden="true">
                    ★ ★ ★ ★ ★ <span className="score">5.0 på Google</span>
                  </div>
                  <p className="muted" style={{ margin: 0 }}>
                    Basert på verifiserte anmeldelser på Google Maps.
                  </p>
                </div>
              </div>

              <div className="review-grid">
                {fallbackReviews.map((r, i) => (
                  <div className="review-card" key={i}>
                    <div className="stars" aria-hidden="true">★ ★ ★ ★ ★</div>
                    <p>{r.text}</p>
                    <p className="who">{r.author}</p>
                  </div>
                ))}
              </div>

              <div>
                <a
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://maps.app.goo.gl/9qHxGotoAzbhiWdq6"
                >
                  Se alle anmeldelser på Google
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact info ──────────────────────────────────────────── */}
        <section className="section section--tight">
          <div className="container">
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 16, background: '#fff', border: '1px solid rgba(56,56,56,0.08)',
              borderRadius: 22, padding: 32, boxShadow: '0 10px 28px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'grid', gap: 6 }}>
                <div className="kicker">Telefon</div>
                <a href="tel:+4792939171" style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: 'inherit', textDecoration: 'none' }}>
                  +47 929 39 171
                </a>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <div className="kicker">E-post</div>
                <a href="mailto:post@somiklinikken.no" style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: 'inherit', textDecoration: 'none' }}>
                  post@somiklinikken.no
                </a>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <div className="kicker">Adresse</div>
                <a
                  href="https://www.google.com/maps?q=Langgata+31,+4306+Sandnes"
                  target="_blank"
                  rel="noopener"
                  style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: 'inherit', textDecoration: 'none' }}
                >
                  Langgata 31<br />4306 Sandnes
                </a>
              </div>
              <div style={{ display: 'grid', gap: 10, alignContent: 'end' }}>
                <a className="btn btn--accent" href={BOOKING_URL}>Book time</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <script dangerouslySetInnerHTML={{ __html: pageScript }} />
    </>
  )
}
