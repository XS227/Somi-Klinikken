import type { CollectionConfig } from 'payload'

export const Behandlinger: CollectionConfig = {
  slug: 'behandlinger',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Innhold',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Innhold',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Behandlingsnavn',
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Kort beskrivelse (vises i oversikten)',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Forsidebilde',
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Innhold',
            },
          ],
        },
        {
          label: 'SEO & Synlighet',
          fields: [
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'URL-slug',
            },
            {
              name: 'meta',
              type: 'group',
              label: 'SEO-metadata',
              fields: [
                { name: 'title',       type: 'text',     label: 'SEO-tittel' },
                { name: 'description', type: 'textarea', label: 'Meta-beskrivelse' },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
