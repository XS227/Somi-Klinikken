import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Forsiden',
  admin: { group: 'Nettstedsinnstillinger' },
  fields: [
    {
      name: 'heroTagline',
      type: 'text',
      label: 'Hero – kicker-tekst',
      defaultValue: 'Velkommen til SOMI Klinikken',
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero – overskrift',
      defaultValue: 'Skånsomme behandlinger med presisjon og naturlig uttrykk.',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'Hero – undertekst',
      defaultValue:
        'Vi legger vekt på kvalitet, veiledning og riktig behandling for et trygt og profesjonelt resultat.',
    },
    {
      name: 'katarinaIntroText',
      type: 'richText',
      label: 'Om Katarina – introduksjonstekst',
    },
    {
      name: 'behandlingerSeksjonTittel',
      type: 'text',
      label: 'Behandlinger-seksjon – tittel',
      defaultValue: 'Hva kan vi hjelpe deg med?',
    },
    {
      name: 'teamSeksjonTittel',
      type: 'text',
      label: 'Team-seksjon – tittel',
      defaultValue: 'TEAM SOMI',
    },
    {
      name: 'googleAnalyticsId',
      type: 'text',
      label: 'Google Analytics Measurement ID',
      admin: {
        position: 'sidebar',
        description: 'F.eks. G-XXXXXXXXXX. Overskriver .env-variabelen.',
      },
    },
  ],
}
