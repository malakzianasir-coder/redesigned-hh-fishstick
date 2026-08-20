import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const DonationCauses: CollectionConfig = {
  slug: 'donation-causes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'slug'],
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
      name: 'kind',
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
      name: 'bankAccountKeys',
      type: 'json',
    },
    {
      name: 'zakatCalculator',
      type: 'json',
    },
    {
      name: 'legacyHero',
      type: 'json',
      admin: { description: 'Temporary JSON store for the Hero data.' }
    },
    {
      name: 'legacyJumpLinks',
      type: 'json',
    },
    {
      name: 'legacySections',
      type: 'json',
    },
    ...slugField(),
  ],
}
