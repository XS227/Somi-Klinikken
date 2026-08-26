import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import type { HeaderData } from '@/components/SiteHeader'
import type { FooterData } from '@/components/SiteFooter'
import './styles.css'

export const metadata = {
  metadataBase: new URL('https://somiklinikken.no'),
  title: 'SOMI Klinikken',
  description: 'SOMI Klinikken i Sandnes tilbyr microblading, permanent makeup, hudpleie og laser.',
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-PYBZF9C8E0'

const siteScript = `
(function(){
  // Header scroll
  window.addEventListener('scroll',function(){
    var h=document.querySelector('[data-site-header]');
    if(h)h.classList.toggle('is-scrolled',window.scrollY>6);
  },{passive:true});

  // Mobile menu
  function closeMenu(){
    var btn=document.querySelector('[data-menu-toggle]');
    var panel=document.querySelector('[data-mobile-panel]');
    var ov=document.querySelector('[data-mobile-overlay]');
    if(!btn||!panel)return;
    btn.setAttribute('aria-expanded','false');
    panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');
    if(ov){ov.classList.remove('is-open');ov.setAttribute('aria-hidden','true');}
    document.body.classList.remove('no-scroll');
  }
  function openMenu(){
    var btn=document.querySelector('[data-menu-toggle]');
    var panel=document.querySelector('[data-mobile-panel]');
    var ov=document.querySelector('[data-mobile-overlay]');
    if(!btn||!panel)return;
    btn.setAttribute('aria-expanded','true');
    panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');
    if(ov){ov.classList.add('is-open');ov.setAttribute('aria-hidden','false');}
    document.body.classList.add('no-scroll');
  }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-menu-toggle]')){e.preventDefault();
      var panel=document.querySelector('[data-mobile-panel]');
      if(panel&&panel.classList.contains('is-open'))closeMenu(); else openMenu();
      return;}
    if(e.target.closest('[data-mobile-overlay]')){closeMenu();return;}
    if(e.target.closest('[data-mobile-panel] a')){closeMenu();}
  });
  window.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});
  window.addEventListener('resize',function(){if(window.innerWidth>980)closeMenu();});

  // Scroll reveal
  var fadeEls=document.querySelectorAll('[data-scroll-fade],.reveal');
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    var obs=new IntersectionObserver(function(entries,o){
      entries.forEach(function(en){
        if(!en.isIntersecting)return;
        en.target.classList.add('is-in');o.unobserve(en.target);
      });
    },{threshold:0.15});
    fadeEls.forEach(function(el){obs.observe(el);});
  }else{
    fadeEls.forEach(function(el){el.classList.add('is-in');});
  }
})();
`

const gaScript = GA_ID
  ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`
  : ''

function UnderArbeidPage() {
  return (
    <html lang="no">
      <body style={{
        margin: 0, fontFamily: 'system-ui,-apple-system,sans-serif',
        background: '#383838', color: '#fff',
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 24,
      }}>
        <div style={{ maxWidth: 480, textAlign: 'center', display: 'grid', gap: 22 }}>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: 30, letterSpacing: '0.06em', color: '#DDB3B3' }}>
            SOMI Klinikken
          </div>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
            Vi gjør nettstedet enda bedre.<br />Vi er snart tilbake!
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://somi.bestille.no/OnCust2/#!/" style={{
              display: 'inline-block', padding: '13px 28px', borderRadius: 999,
              fontWeight: 600, textDecoration: 'none', background: '#DDB3B3', color: '#383838',
            }}>Book time nå</a>
            <a href="mailto:post@somiklinikken.no" style={{
              display: 'inline-block', padding: '13px 24px', borderRadius: 999,
              textDecoration: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
            }}>Kontakt oss</a>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.52)', lineHeight: 1.9 }}>
            <p><a href="tel:+4792939171" style={{ color: '#DDB3B3', textDecoration: 'none' }}>+47 929 39 171</a></p>
            <p>Langgata 31, 4306 Sandnes</p>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
            Admin: <a href="/admin" style={{ color: 'rgba(221,179,179,0.55)', textDecoration: 'none' }}>/admin</a>
          </p>
        </div>
      </body>
    </html>
  )
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let headerData: HeaderData | undefined
  let footerData: FooterData | undefined
  let underArbeid = false

  try {
    const payload = await getPayload({ config })
    const [hRaw, fRaw, sRaw] = await Promise.all([
      payload.findGlobal({ slug: 'header', depth: 1 }),
      payload.findGlobal({ slug: 'footer', depth: 0 }),
      payload.findGlobal({ slug: 'site-settings', depth: 0 }).catch(() => null),
    ])
    headerData = hRaw as HeaderData
    footerData = fRaw as FooterData
    underArbeid = (sRaw as { underArbeid?: boolean } | null)?.underArbeid === true
  } catch {
    // Globals not yet seeded — components will use built-in defaults
  }

  if (underArbeid) {
    return <UnderArbeidPage />
  }

  const address   = footerData?.address   ?? 'Langgata 31, 4306 Sandnes'
  const phone     = footerData?.phone     ?? '+47 929 39 171'
  const email     = footerData?.email     ?? 'post@somiklinikken.no'
  const instagram = footerData?.instagram ?? 'https://www.instagram.com/somiklinikken'
  const facebook  = footerData?.facebook  ?? 'https://www.facebook.com/share/1ChUJG29T3/'

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'SOMI Klinikken',
    image: 'https://somiklinikken.no/img/brand/logo.png',
    url: 'https://somiklinikken.no',
    telephone: phone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.split(',')[0]?.trim(),
      postalCode: address.split(',')[1]?.trim().split(' ')[0],
      addressLocality: 'Sandnes',
      addressCountry: 'NO',
    },
    sameAs: [instagram, facebook].filter(Boolean),
  }

  return (
    <html lang="no">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <SiteHeader data={headerData} />
        {children}
        <SiteFooter data={footerData} />
        <script dangerouslySetInnerHTML={{ __html: siteScript }} />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: gaScript }} />
          </>
        )}
      </body>
    </html>
  )
}
