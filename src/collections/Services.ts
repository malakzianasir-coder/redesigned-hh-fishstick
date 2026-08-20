import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'updatedAt'],
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
      name: 'category',
      type: 'text',
    },
    {
      name: 'categorySlug',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'legacyHero',
      type: 'json',
      admin: {
        description: 'Temporary JSON store for the Hero data.'
      }
    },
    {
      name: 'legacyJumpLinks',
      type: 'json',
      admin: {
        description: 'Temporary JSON store for jump links.'
      }
    },
    {
      name: 'legacySections',
      type: 'json',
      admin: {
        description: 'Temporary JSON store for the legacy section blocks.'
      }
    },
    ...slugField(),
  ],
}
