import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useSessions: false,   // Vipps callback issues stateless JWTs — no server-side session needed
    tokenExpiration: 7200,
  },
  fields: [
    {
      name: 'vippsSub',
      type: 'text',
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: 'phone',
      type: 'text',
      admin: { readOnly: true },
    },
  ],
}
