import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt-tekst (for tilgjengelighet og SEO)',
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    staticURL: '/media',
  },
}
