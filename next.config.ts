import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  typescript: {
    // Type checking runs during `npm run dev` and in CI — skip in production builds to save RAM
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Top-level pages from the pre-migration static site
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/priser.html', destination: '/priser', permanent: true },
      { source: '/blogg.html', destination: '/blogg', permanent: true },
      { source: '/behandlinger.html', destination: '/behandlinger', permanent: true },
      { source: '/om.html', destination: '/om', permanent: true },
      { source: '/kontakt.html', destination: '/kontakt', permanent: true },
      // No direct current equivalent — send to the closest still-live page
      { source: '/faq.html', destination: '/', permanent: true },
      { source: '/kategorier/hudpleie.html', destination: '/behandlinger/medisinsk-hudpleie', permanent: true },
      // Treatment sub-pages, mapped to the current consolidated treatment pages
      { source: '/behandlinger/dermaplaning.html', destination: '/behandlinger/medisinsk-hudpleie', permanent: true },
      { source: '/behandlinger/tca-peel.html', destination: '/behandlinger/prx-t33', permanent: true },
      { source: '/behandlinger/laser-skin-rejuvenation-prx.html', destination: '/behandlinger/prx-t33', permanent: true },
      { source: '/behandlinger/somi-klassisk-anti-age.html', destination: '/behandlinger/klassisk-hudpleie', permanent: true },
      { source: '/behandlinger/led-lysterapi.html', destination: '/behandlinger/klassisk-hudpleie', permanent: true },
      { source: '/behandlinger/skjonnhetsflekk.html', destination: '/behandlinger/permanent-makeup', permanent: true },
      { source: '/behandlinger/vippeloft.html', destination: '/behandlinger/permanent-makeup', permanent: true },
      { source: '/behandlinger/rygg.html', destination: '/behandlinger/laser-harfjerning', permanent: true },
      { source: '/behandlinger/skjegglinje.html', destination: '/behandlinger/laser-harfjerning', permanent: true },
      { source: '/behandlinger/brasiliansk.html', destination: '/behandlinger/harfjerning-voks-elektrolyse', permanent: true },
      { source: '/behandlinger/bikinilinje.html', destination: '/behandlinger/harfjerning-voks-elektrolyse', permanent: true },
      // Blog post with no direct current equivalent
      { source: '/blogg/vippeloft-varighet.html', destination: '/blogg', permanent: true },
    ]
  },
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'somiklinikken.no', pathname: '/api/media/file/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/api/media/file/**' },
    ],
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/media/**' },
      { pathname: '/img/**' },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
