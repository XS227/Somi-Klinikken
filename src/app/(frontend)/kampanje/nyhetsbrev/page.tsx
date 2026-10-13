import React from 'react'
import type { Metadata } from 'next'
import { getAdmin } from '@/lib/newsletter/server'
import NewsletterDashboard from './NewsletterDashboard'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Nyhetsbrev (internt) | SOMI Klinikken',
  robots: { index: false, follow: false },
}

export default async function NyhetsbrevPage() {
  const admin = await getAdmin()
  if (!admin) {
    return (
      <div style={{ maxWidth: 520, margin: '48px auto', padding: '0 24px', fontFamily: 'system-ui, sans-serif', color: '#2b2320' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>Nyhetsbrev</h1>
        <p>Denne siden er kun for administratorer. Logg inn i Payload-admin og kom tilbake hit.</p>
        <p><a href="/admin/login?redirect=/kampanje/nyhetsbrev" style={{ color: '#7a3a4a', fontWeight: 600 }}>Logg inn →</a></p>
      </div>
    )
  }
  return <NewsletterDashboard />
}
