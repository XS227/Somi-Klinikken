import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Bunntekst (Footer)',
  admin: { group: 'Nettstedsinnstillinger' },
  fields: [
    { name: 'address',       type: 'text',    label: 'Adresse' },
    { name: 'phone',         type: 'text',    label: 'Telefon' },
    { name: 'email',         type: 'email',   label: 'E-post' },
    { name: 'hours',         type: 'text',    label: 'Åpningstider' },
    {
      name: 'footerNavLinks',
      type: 'array',
      label: 'Meny-lenker (Meny-kolonne)',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tekst' },
        { name: 'url',   type: 'text', required: true, label: 'URL'  },
      ],
    },
    {
      name: 'infoLinks',
      type: 'array',
      label: 'Info-lenker (Info-kolonne)',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tekst' },
        { name: 'url',   type: 'text', required: true, label: 'URL'  },
      ],
    },
    { name: 'instagram',     type: 'text',    label: 'Instagram URL' },
    { name: 'facebook',      type: 'text',    label: 'Facebook URL'  },
    { name: 'socialTagline', type: 'text',    label: 'Sosiale medier – beskrivelsestekst' },
    { name: 'copyrightText', type: 'text',    label: 'Copyright-tekst (nederst til venstre)' },
    { name: 'creditsText',   type: 'text',    label: 'Credits-tekst (nederst til høyre)'    },
  ],
}
