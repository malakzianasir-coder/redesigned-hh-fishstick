import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'slug'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagLine',
      type: 'text',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'text',
    },
    {
      name: 'categories',
      type: 'json',
    },
    {
      name: 'eventType',
      type: 'text',
    },
    {
      name: 'eventDate',
      type: 'text',
    },
    {
      name: 'eventTime',
      type: 'text',
    },
    {
      name: 'eventVenue',
      type: 'text',
    },
    {
      name: 'eventEntry',
      type: 'text',
    },
    {
      name: 'publishedAt',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
    },
    {
      name: 'legacyContent',
      type: 'json',
      admin: {
        description: 'Temporary JSON store for the legacy rich text body.'
      }
    },
    {
      name: 'legacyMeta',
      type: 'json',
    },
    ...slugField(),
  ],
}
