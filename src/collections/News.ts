import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'slug'],
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
      admin: { description: 'String path to media' }
    },
    {
      name: 'categories',
      type: 'json',
    },
    {
      name: 'tags',
      type: 'json',
    },
    {
      name: 'author',
      type: 'json',
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
