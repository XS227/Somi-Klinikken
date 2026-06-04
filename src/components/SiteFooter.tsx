import React from 'react'
import Image from 'next/image'

export type FooterNavLink = { label: string; url: string; id?: string }

export type FooterData = {
  address?:        string | null
  phone?:          string | null
  email?:          string | null
  hours?:          string | null
  footerNavLinks?: FooterNavLink[]
  instagram?:      string | null
  facebook?:       string | null
  copyrightText?:  string | null
  creditsText?:    string | null
}

const DEFAULT_MENU: FooterNavLink[] = [
  { label: 'Om',           url: '/om'          },
  { label: 'Behandlinger', url: '/behandlinger' },
  { label: 'Team',         url: '/team'         },
  { label: 'Priser',       url: '/priser'       },
  { label: 'Booking',      url: '/booking'      },
  { label: 'Resultater',   url: '/resultater'   },
  { label: 'Gavekort',     url: '/gavekort'     },
  { label: 'Blogg',        url: '/blogg'        },
  { label: 'Kontakt',      url: '/kontakt'      },
]

export function SiteFooter({ data }: { data?: FooterData }) {
  const year      = new Date().getFullYear()
  const address   = data?.address   ?? 'Langgata 31, 4306 Sandnes'
  const phone     = data?.phone     ?? '+47 929 39 171'
  const email     = data?.email     ?? 'post@somiklinikken.no'
  const hours     = data?.hours     ?? 'Åpent etter avtale'
  const navLinks  = data?.footerNavLinks?.length ? data.footerNavLinks : DEFAULT_MENU
  const instagram = data?.instagram ?? 'https://www.instagram.com/somiklinikken'
  const facebook  = data?.facebook  ?? 'https://www.facebook.com/share/1ChUJG29T3/'
  const copyright = data?.copyrightText ?? `© ${year} SOMI Klinikken – Sandnes`

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">

        {/* 3-column grid */}
        <div className="footer3-grid">

          {/* Col 1 – Om oss */}
          <div>
            <Image
              src="/img/brand/somi-klinikken-logo-horizontal.png"
              alt="SOMI Klinikken"
              width={240}
              height={68}
              style={{ height: 'auto', width: 120, opacity: 0.9, filter: 'brightness(0) invert(1)', marginBottom: 16, display: 'block' }}
            />
            <p className="footer3-desc">
              SOMI Klinikken er et spesialisert skjønnhetssenter i Sandnes. Vi tilbyr
              microblading, permanent makeup, hudpleie og laserbehandlinger.
            </p>
            <div className="footer3-social">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span>Instagram</span>
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span>Facebook</span>
                </a>
              )}
            </div>
          </div>

          {/* Col 2 – Meny */}
          <div>
            <p className="footer3-heading">Meny</p>
            <ul className="footer3-links">
              {navLinks.map((l) => (
                <li key={l.url}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Kontakt */}
          <div>
            <p className="footer3-heading">Kontakt</p>
            <ul className="footer3-contact">
              <li>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?q=Langgata+31,+4306+Sandnes"
                  target="_blank"
                  rel="noopener"
                >
                  {address}
                </a>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.55)' }}>{hours}</li>
            </ul>
            <a className="btn btn--accent" href="/booking" style={{ marginTop: 20, display: 'inline-flex' }}>
              Book time
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer3-bottom">
          <p>{copyright.includes(String(year)) ? copyright : copyright.replace(/\d{4}/, String(year))}</p>
          <a
            href="https://www.setai.no"
            target="_blank"
            rel="noopener"
            className="footer3-credits"
          >
            Bygget av SETai
          </a>
        </div>

      </div>
    </footer>
  )
}

export default SiteFooter
