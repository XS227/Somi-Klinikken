import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Nettstedsinnstillinger',
  admin: { group: 'Nettstedsinnstillinger' },
  fields: [
    {
      name: 'underArbeid',
      type: 'checkbox',
      label: '"Under arbeid"-modus (vedlikeholdsside)',
      defaultValue: false,
      admin: {
        description:
          'Når aktivert vises en vedlikeholdsside for alle besøkende. Admin-panelet (/admin) er alltid tilgjengelig.',
      },
      hooks: {
        // Ensure it never defaults to truthy value — Payload checkbox bug workaround
        beforeChange: [({ value }) => value === true],
      },
    },
  ],
}
