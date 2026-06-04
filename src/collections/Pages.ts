import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    // Title øverst, full bredde, alltid synlig uavhengig av tab
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Sidetittel',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Innhold (Puck-editor)',
          fields: [
            {
              name: 'puckData',
              type: 'json',
              admin: { hidden: true },
            },
            {
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
}
