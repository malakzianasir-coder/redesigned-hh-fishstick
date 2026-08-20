import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { heroGroup } from '@/fields/heroGroup'
import { jumpLinksField } from '@/fields/jumpLinksField'
import { pageSectionsField } from '@/blocks/pageBlocks'

export const Departments: CollectionConfig = {
  slug: 'departments',
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
      label: 'Department Name (e.g. Cardiology, General Surgery)',
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Department Category (e.g. Surgery & Allied Specialties)',
    },
    {
      name: 'categorySlug',
      type: 'text',
      label: 'Category Slug (e.g. surgery-allied)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Lead Excerpt',
    },
    heroGroup(),
    jumpLinksField(),
    pageSectionsField(),
    {
      name: 'servicesList',
      type: 'array',
      label: 'Department Services List',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Service Name' },
        { name: 'description', type: 'textarea', label: 'Brief Description' },
        { name: 'href', type: 'text', label: 'Link to Service Page' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Department Contact & Location',
      fields: [
        { name: 'location', type: 'text', label: 'Floor / Room Location' },
        { name: 'phone', type: 'text', label: 'Direct Helpline / Extension' },
        { name: 'timings', type: 'text', label: 'Operating Timings (e.g. 24/7 or 8 AM - 8 PM)' },
      ],
    },
    {
      name: 'legacyHero',
      type: 'json',
      admin: {
        description: 'Legacy raw JSON store for fallback compatibility.',
      },
    },
    {
      name: 'legacyJumpLinks',
      type: 'json',
      admin: {
        description: 'Legacy raw JSON store for fallback compatibility.',
      },
    },
    {
      name: 'legacySections',
      type: 'json',
      admin: {
        description: 'Legacy raw JSON store for fallback compatibility.',
      },
    },
    ...slugField(),
  ],
}
