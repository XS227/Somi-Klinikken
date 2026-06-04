import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Toppmeny (Header)',
  admin: { group: 'Nettstedsinnstillinger' },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigasjonslenker',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tekst' },
        { name: 'url',   type: 'text', required: true, label: 'URL'  },
      ],
    },
    {
      name: 'bookingLabel',
      type: 'text',
      label: 'Knappetekst (Book time)',
      defaultValue: 'Book time',
    },
    {
      name: 'bookingUrl',
      type: 'text',
      label: 'Bookinglenke',
      defaultValue: '/booking',
    },
  ],
}
