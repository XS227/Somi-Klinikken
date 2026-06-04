import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedDate', 'updatedAt'],
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
              label: 'Tittel',
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Ingress (vises i listevisning og SEO)',
              admin: {
                description: 'Maks 155 tegn anbefalt for SEO',
              },
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
              required: true,
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
              admin: {
                description: 'F.eks. microblading-sandnes (auto-genereres fra tittel)',
              },
            },
            {
              name: 'publishedDate',
              type: 'date',
              label: 'Publiseringsdato',
              admin: {
                date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
              },
            },
            {
              name: 'author',
              type: 'text',
              label: 'Forfatter',
              defaultValue: 'SOMI Klinikken',
            },
            {
              name: 'meta',
              type: 'group',
              label: 'SEO-metadata',
              fields: [
                { name: 'title',       type: 'text',     label: 'SEO-tittel' },
                { name: 'description', type: 'textarea', label: 'Meta-beskrivelse (maks 155 tegn)' },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
