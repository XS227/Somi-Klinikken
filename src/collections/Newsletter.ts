import type { CollectionConfig, GlobalConfig, Access } from 'payload'
import { defaultSettings } from '../lib/newsletter/model'

const admin: Access = ({ req }) => req.user?.collection === 'users'
const no = () => false
const serverOnly = { create: no, update: no }

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers', labels: { singular: 'Nyhetsbrev – abonnent', plural: 'Nyhetsbrev – abonnenter' },
  admin: { useAsTitle: 'email', group: 'Nyhetsbrev', defaultColumns: ['email', 'firstName', 'status', 'createdAt'] },
  access: { read: admin, create: no, update: no, delete: no },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'firstName', type: 'text' }, { name: 'lastName', type: 'text' },
    { name: 'status', type: 'select', required: true, index: true, options: ['pending', 'active', 'unsubscribed', 'bounced'], defaultValue: 'pending' },
    { name: 'consentText', type: 'textarea', required: true }, { name: 'consentVersion', type: 'text', required: true },
    { name: 'consentedAt', type: 'date', required: true }, { name: 'confirmedAt', type: 'date' },
    { name: 'source', type: 'text', required: true }, { name: 'evidence', type: 'textarea' },
    { name: 'confirmationSentAt', type: 'date' }, { name: 'unsubscribedAt', type: 'date' },
    { name: 'confirmVersion', type: 'text', required: true, admin: { hidden: true }, access: { read: no } },
    { name: 'unsubscribeVersion', type: 'text', required: true, admin: { hidden: true }, access: { read: no } },
  ],
}
export const NewsletterCampaigns: CollectionConfig = {
  slug: 'newsletter-campaigns', labels: { singular: 'Nyhetsbrev – kampanje', plural: 'Nyhetsbrev – kampanjer' },
  admin: { useAsTitle: 'name', group: 'Nyhetsbrev', defaultColumns: ['name', 'status', 'scheduledAt', 'updatedAt'] },
  access: { read: admin, create: no, update: no, delete: no },
  fields: [
    ...['name', 'subject', 'preheader', 'heading', 'offer', 'cta', 'url', 'startDate', 'endDate'].map(name => ({ name, type: 'text' as const })),
    { name: 'body', type: 'textarea' }, { name: 'terms', type: 'textarea' }, { name: 'scheduledAt', type: 'date' },
    { name: 'status', type: 'select', defaultValue: 'draft', required: true, index: true, options: ['draft', 'queued', 'sending', 'finished', 'cancelled'], access: serverOnly, admin: { readOnly: true } },
    { name: 'audience', type: 'json', access: { read: no, ...serverOnly }, admin: { hidden: true } },
    { name: 'cursor', type: 'number', defaultValue: 0, access: serverOnly, admin: { readOnly: true } },
    { name: 'queuedAt', type: 'date', access: serverOnly, admin: { readOnly: true } },
    { name: 'totalRecipients', type: 'number', defaultValue: 0, access: serverOnly, admin: { readOnly: true } },
  ],
}
export const NewsletterDeliveries: CollectionConfig = {
  slug: 'newsletter-deliveries', labels: { singular: 'Nyhetsbrev – levering', plural: 'Nyhetsbrev – leveringslogg' },
  admin: { useAsTitle: 'key', group: 'Nyhetsbrev', defaultColumns: ['email', 'status', 'attempts', 'updatedAt'] },
  access: { read: admin, create: no, update: no, delete: no },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true }, { name: 'campaign', type: 'text', required: true, index: true },
    { name: 'subscriber', type: 'text', required: true }, { name: 'email', type: 'email', required: true },
    { name: 'status', type: 'select', required: true, options: ['pending', 'accepted', 'failed', 'skipped'], defaultValue: 'pending' },
    { name: 'attempts', type: 'number', defaultValue: 0 }, { name: 'providerId', type: 'text' },
    { name: 'lastError', type: 'text' }, { name: 'acceptedAt', type: 'date' },
  ],
}
export const NewsletterSettings: GlobalConfig = {
  slug: 'newsletter-settings', label: 'Nyhetsbrev – påmelding', admin: { group: 'Nyhetsbrev' },
  access: { read: admin, update: no },
  fields: [
    { name: 'enabled', type: 'checkbox', label: 'Aktiver påmelding', defaultValue: false },
    { name: 'title', type: 'text', defaultValue: defaultSettings.title },
    { name: 'intro', type: 'textarea', defaultValue: defaultSettings.intro },
    { name: 'button', type: 'text', defaultValue: defaultSettings.button },
    { name: 'trigger', type: 'select', defaultValue: 'delay', options: ['delay', 'scroll', 'manual'] },
    { name: 'delaySeconds', type: 'number', defaultValue: 15, min: 5, max: 120 },
    { name: 'workerSeenAt', type: 'date', admin: { hidden: true }, access: { read: no, create: no, update: no } },
  ],
}
