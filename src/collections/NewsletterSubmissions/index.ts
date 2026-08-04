import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const NewsletterSubmissions: CollectionConfig<'newsletter-submissions'> = {
  slug: 'newsletter-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'createdAt'],
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'source',
      type: 'text',
      required: true,
      defaultValue: 'site-footer',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'subscribed',
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
