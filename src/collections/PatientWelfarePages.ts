import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'
import { heroGroup } from '@/fields/heroGroup'
import { jumpLinksField } from '@/fields/jumpLinksField'
import { pageSectionsField } from '@/blocks/pageBlocks'

export const PatientWelfarePages: CollectionConfig = {
  slug: 'patient-welfare-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title (e.g. Patient Welfare Process, Zakat Assessment)',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
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
      label: 'Summary Excerpt',
    },
    heroGroup(),
    jumpLinksField(),
    pageSectionsField(),
    {
      name: 'eligibilityCriteria',
      type: 'array',
      label: 'Eligibility Criteria & Requirements',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'requiredDocuments',
      type: 'array',
      label: 'Required Documents List',
      fields: [
        { name: 'documentName', type: 'text', required: true },
        { name: 'isMandatory', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'applicationSteps',
      type: 'array',
      label: 'Application Steps & Workflow',
      fields: [
        { name: 'stepNumber', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
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
