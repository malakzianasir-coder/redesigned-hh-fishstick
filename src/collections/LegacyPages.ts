import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const LegacyPages: CollectionConfig = {
  slug: 'legacy-pages',
  admin: {
    useAsTitle: 'slug',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'legacyHero', type: 'json' },
    { name: 'legacyJumpLinks', type: 'json' },
    { name: 'legacySections', type: 'json' },
    { name: 'legacyGroups', type: 'json' },
    { name: 'legacyExternals', type: 'json' },
    { name: 'legacyStats', type: 'json' },
    { name: 'legacyRawData', type: 'json' },
  ],
}
