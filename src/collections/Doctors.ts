import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialty', 'department', 'slug'],
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
      name: 'specialty',
      type: 'text',
    },
    {
      name: 'department',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'json',
    },
    {
      name: 'image',
      type: 'text',
    },
    ...slugField(),
  ],
}
