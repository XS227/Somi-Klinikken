import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const BASE_URL = 'https://somiklinikken.no'

const STATIC_ROUTES = [
  '',
  '/om',
  '/behandlinger',
  '/priser',
  '/booking',
  '/resultater',
  '/gavekort',
  '/team',
  '/blogg',
]

const BEHANDLING_SLUGS = [
  'prx-t33',
  'biorepeel-cl3',
  'permanent-makeup',
  'laser-harfjerning',
  'laser-tattoo-removal',
  'injeksjonsbehandlinger',
  'medisinsk-hudpleie',
  'klassisk-hudpleie',
  'harfjerning-voks-elektrolyse',
  'gratis-konsultasjon',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))

  const behandlingEntries: MetadataRoute.Sitemap = BEHANDLING_SLUGS.map((slug) => ({
    url: `${BASE_URL}/behandlinger/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  let pageEntries: MetadataRoute.Sitemap = []
  let postEntries: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })

    const [pagesResult, postsResult] = await Promise.all([
      payload.find({ collection: 'pages', limit: 200, depth: 0 }),
      payload.find({ collection: 'posts', where: { published: { not_equals: false } }, limit: 200, depth: 0 }),
    ])

    // 'home' er duplikat av forsiden, og resten av de statiske rutene har egne
    // page.tsx-filer (med egen metadata) som vinner over [slug]-catch-all'en.
    const reservedSlugs = new Set(['home', ...STATIC_ROUTES.filter(Boolean).map((r) => r.slice(1))])

    pageEntries = pagesResult.docs
      .filter((page) => typeof page.slug === 'string' && page.slug.length > 0 && !reservedSlugs.has(page.slug))
      .map((page) => ({
        url: `${BASE_URL}/${page.slug}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : undefined,
        changeFrequency: 'monthly',
        priority: 0.6,
      }))

    postEntries = postsResult.docs
      .filter((post) => typeof post.slug === 'string' && post.slug.length > 0)
      .map((post) => ({
        url: `${BASE_URL}/blogg/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
        changeFrequency: 'monthly',
        priority: 0.6,
      }))
  } catch {
    // Payload utilgjengelig ved build – gå videre med statiske ruter
  }

  return [...staticEntries, ...behandlingEntries, ...pageEntries, ...postEntries]
}
