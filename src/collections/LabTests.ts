import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const LabTests: CollectionConfig = {
  slug: 'lab-tests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'reportingTime', 'slug'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'reportingTime',
      type: 'text',
    },
    {
      name: 'specimen',
      type: 'text',
    },
    {
      name: 'isOutsourced',
      type: 'checkbox',
    },
    {
      name: 'alsoKnownAs',
      type: 'json',
    },
    {
      name: 'legacyDescription',
      type: 'json',
    },
    {
      name: 'legacyPreparation',
      type: 'json',
    },
    ...slugField(),
  ],
}
