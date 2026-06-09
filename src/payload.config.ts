import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Behandlinger } from './collections/Behandlinger'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_URL || 'https://somiklinikken.no',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: ['@/components/VippsLoginButton#VippsLoginButton'],
      beforeNavLinks: ['@/components/AdminBrandStyle#AdminBrandStyle'],
      beforeDashboard: ['@/components/AdminEditorialGuide#AdminEditorialGuide'],
    },
    meta: {
      titleSuffix: '- SOMI Klinikken Admin',
      favicon: '/img/brand/somi-klinikken-logo-horizontal.png',
      ogImage: '/img/brand/somi-klinikken-logo-horizontal.png',
    },
  },
  collections: [Users, Media, Pages, Posts, Behandlinger],
  globals: [Header, Footer, SiteSettings, Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
