import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Priser | SOMI Klinikken i Sandnes',
  description:
    'Se priser på microblading, permanent makeup, laser hårfjerning, hudpleie og injeksjonsbehandlinger hos SOMI Klinikken i Sandnes.',
  openGraph: {
    type: 'website',
    title: 'Priser | SOMI Klinikken',
    description: 'Oversikt over priser på alle behandlinger hos SOMI Klinikken i Sandnes.',
    images: ['/img/brand/logo.png'],
  },
  alternates: {
    canonical: 'https://somiklinikken.no/priser',
  },
}

export default function PriserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
