import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'featured', 'slug'],
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
      label: 'Article Headline',
    },
    {
      name: 'tagLine',
      type: 'text',
      label: 'Tagline / Kicker',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description / Summary',
    },
    {
      name: 'heroImage',
      type: 'text',
      label: 'Article Hero / Featured Image (e.g. /media/news-1.webp)',
    },
    {
      name: 'articleBody',
      type: 'textarea',
      label: 'Article Body (Markdown / Text / Paragraphs)',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Structured Paragraphs',
      fields: [
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    {
      name: 'author',
      type: 'group',
      label: 'Article Author',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Hijaz Hospital Communications' },
        { name: 'role', type: 'text', defaultValue: 'Editorial Team' },
        { name: 'avatar', type: 'text' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'text',
      label: 'Publication Date (e.g. 2026-02-18)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Article (Highlighted on News Hub & Homepage)',
    },
    {
      name: 'categories',
      type: 'json',
      label: 'Categories (e.g. ["Hospital Updates", "Clinical Breakthroughs"])',
    },
    {
      name: 'tags',
      type: 'json',
      label: 'Tags (e.g. ["Healthcare", "Community", "Free Care"])',
    },
    {
      name: 'legacyContent',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
    {
      name: 'legacyMeta',
      type: 'json',
    },
    ...slugField(),
  ],
}
