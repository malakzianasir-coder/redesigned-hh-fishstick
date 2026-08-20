import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { heroGroup } from '@/fields/heroGroup'
import { jumpLinksField } from '@/fields/jumpLinksField'
import { pageSectionsField } from '@/blocks/pageBlocks'

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
      label: 'Service Name (e.g. Emergency, ICU, General OPD)',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category (e.g. Inpatient, Outpatient, Emergency)',
    },
    {
      name: 'categorySlug',
      type: 'text',
      label: 'Category Slug',
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
      name: 'keyProcedures',
      type: 'array',
      label: 'Key Procedures & Treatments',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Procedure / Test Name' },
        { name: 'description', type: 'textarea', label: 'Details' },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Frequently Asked Questions (Service FAQs)',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
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
