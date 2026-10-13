import type { CollectionConfig } from 'payload'

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Send queue + log: one row per campaign/recipient. */
export const NewsletterDeliveries: CollectionConfig = {
  slug: 'newsletter-deliveries',
  labels: { singular: 'Utsendelse', plural: 'Utsendelser (kø/logg)' },
  admin: { useAsTitle: 'email', group: 'Nyhetsbrev', defaultColumns: ['email', 'campaign', 'status', 'attempts'] },
  access: { read: adminOnly, create: () => false, update: () => false, delete: adminOnly },
  fields: [
    { name: 'campaign', type: 'relationship', relationTo: 'newsletter-campaigns', required: true, index: true },
    { name: 'email', type: 'email', required: true },
    { name: 'status', type: 'select', required: true, defaultValue: 'queued', index: true,
      options: ['queued', 'sent', 'failed'].map((v) => ({ label: v, value: v })) },
    { name: 'attempts', type: 'number', defaultValue: 0 },
    { name: 'nextAttemptAt', type: 'date', index: true },
    { name: 'sentAt', type: 'date' },
    { name: 'error', type: 'text' },
  ],
}
