import React from 'react'
import Image from 'next/image'

export type NavLink = { label: string; url: string; id?: string }

export type HeaderData = {
  logo?: { url?: string | null; alt?: string | null } | null
  navLinks?: NavLink[]
  bookingLabel?: string | null
  bookingUrl?: string | null
}

const DEFAULT_NAV: NavLink[] = [
  { label: 'Om',           url: '/om'           },
  { label: 'Behandlinger', url: '/behandlinger'  },
  { label: 'Team',         url: '/team'          },
  { label: 'Priser',       url: '/priser'        },
  { label: 'Booking',      url: '/booking'       },
  { label: 'Resultater',   url: '/resultater'    },
  { label: 'Gavekort',     url: '/gavekort'      },
  { label: 'Kontakt',      url: '/kontakt'       },
]

export function SiteHeader({ data }: { data?: HeaderData }) {
  const logoUrl      = data?.logo?.url ?? '/img/brand/somi-klinikken-logo-horizontal.png'
  const logoAlt      = data?.logo?.alt ?? 'SOMI Klinikken'
  const links        = data?.navLinks?.length ? data.navLinks : DEFAULT_NAV
  const bookingLabel = data?.bookingLabel ?? 'Book time'
  const bookingUrl   = data?.bookingUrl   ?? '/booking'

  const isExternal = bookingUrl.startsWith('http')

  return (
    <header className="site-header" role="banner" data-site-header>
      <div className="container">
        <div className="header__row">
          <a className="brand" href="/" aria-label="SOMI Klinikken">
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={160}
              height={46}
              className="brand__logo"
              priority
              style={{ height: 46, width: 'auto' }}
            />
          </a>

          <nav className="nav" aria-label="Hovedmeny">
            {links.map((link) => (
              <a key={link.url} href={link.url}>{link.label}</a>
            ))}
          </nav>

          <div className="header__actions">
            <a
              className="btn btn--booking"
              href={bookingUrl}
              {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {bookingLabel}
            </a>
            <button
              className="menu-btn"
              type="button"
              aria-label="Åpne meny"
              aria-expanded="false"
              data-menu-toggle
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-overlay" data-mobile-overlay aria-hidden="true" />

      <div className="mobile-panel" data-mobile-panel aria-hidden="true">
        <div className="container">
          <div className="mobile-panel__inner">
            {links.map((link) => (
              <a key={link.url} className="mnav" href={link.url}>{link.label}</a>
            ))}
            <a
              className="btn btn--booking"
              href={bookingUrl}
              {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {bookingLabel}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
