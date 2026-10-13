import type { Metadata } from 'next'
import NewsletterLanding from '@/components/newsletter/NewsletterLanding'
export const metadata: Metadata = { title: 'Nyhetsbrev | SOMI Klinikken', robots: { index: false, follow: false }, referrer: 'no-referrer' }
export default function NewsletterPage() { return <NewsletterLanding /> }
