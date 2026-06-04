import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
            },
            {
              // Stores the Puck canvas JSON — hidden from admin, edited via the UI field below
              name: 'puckData',
              type: 'json',
              admin: { hidden: true },
            },
            {
              // The visual Puck editor — reads/writes puckData via useField
              name: 'puckEditor',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/PuckEditorField#PuckEditorField',
                },
              },
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
}
