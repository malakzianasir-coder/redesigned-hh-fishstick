import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'slug'],
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
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subHeading',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'format',
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'text',
    },
    {
      name: 'videoUrl',
      type: 'text',
    },
    {
      name: 'publishedDate',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
    },
    {
      name: 'departments',
      type: 'json',
    },
    {
      name: 'services',
      type: 'json',
    },
    {
      name: 'legacyContent',
      type: 'json',
    },
    ...slugField(),
  ],
}
