import type { CollectionConfig } from 'payload'

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Nyhetsbrev-abonnent', plural: 'Nyhetsbrev-abonnenter' },
  admin: { useAsTitle: 'email', group: 'Nyhetsbrev', defaultColumns: ['email', 'name', 'status', 'segments'] },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'name', type: 'text' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'subscribed',
      index: true,
      options: [
        { label: 'Abonnent', value: 'subscribed' },
        { label: 'Avmeldt', value: 'unsubscribed' },
        { label: 'Blokkert (suppression)', value: 'suppressed' },
      ],
    },
    { name: 'segments', type: 'text', hasMany: true, admin: { description: 'Segmenter/tagger, f.eks. «botox», «kunde»' } },
    {
      name: 'consentBasis',
      type: 'select',
      required: true,
      options: [
        { label: 'Aktivt samtykke', value: 'consent' },
        { label: 'Eksisterende kunde (markedsføringsloven §15, med mulighet til å reservere seg)', value: 'existing-customer' },
      ],
    },
    { name: 'consentAt', type: 'date', required: true },
    { name: 'consentSource', type: 'text', required: true, admin: { description: 'Hvor/hvordan samtykket ble gitt' } },
    { name: 'unsubscribeToken', type: 'text', required: true, unique: true, index: true, admin: { readOnly: true } },
    { name: 'unsubscribedAt', type: 'date', admin: { readOnly: true } },
    { name: 'suppressionReason', type: 'text' },
  ],
}
