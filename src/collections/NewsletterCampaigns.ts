import type { CollectionConfig } from 'payload'

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const NewsletterCampaigns: CollectionConfig = {
  slug: 'newsletter-campaigns',
  labels: { singular: 'Nyhetsbrev-kampanje', plural: 'Nyhetsbrev-kampanjer' },
  admin: { useAsTitle: 'title', group: 'Nyhetsbrev', defaultColumns: ['title', 'status', 'scheduledAt'] },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subject', type: 'text', required: true },
    { name: 'preheader', type: 'text' },
    { name: 'body', type: 'textarea', admin: { description: 'Enkel markup: # overskrift, - liste, **fet**, [tekst](url), ![alt](url), [[knapp: Tekst | url]]' } },
    { name: 'template', type: 'select', defaultValue: 'somi', options: [
      { label: 'SOMI standard', value: 'somi' },
      { label: 'Tilbud/kampanje', value: 'offer' },
      { label: 'Enkel tekst', value: 'plain' },
    ] },
    { name: 'segment', type: 'text', admin: { description: 'Tom = alle aktive abonnenter' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      index: true,
      options: ['draft', 'scheduled', 'sending', 'sent', 'cancelled'].map((v) => ({ label: v, value: v })),
    },
    { name: 'scheduledAt', type: 'date' },
    { name: 'approvedBy', type: 'text', admin: { readOnly: true, description: 'Hvem som godkjente utsendelsen' } },
    { name: 'approvedAt', type: 'date', admin: { readOnly: true } },
    { name: 'sentAt', type: 'date', admin: { readOnly: true } },
    { name: 'recipientCount', type: 'number', defaultValue: 0 },
  ],
}
