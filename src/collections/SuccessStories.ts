import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'featured', 'slug'],
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
      label: 'Story Tagline / Catchphrase (e.g. Life After Trauma)',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Full Story Heading (e.g. How Timely Orthopedic Care Saved Ali’s Livelihood)',
    },
    {
      name: 'subHeading',
      type: 'textarea',
      label: 'Subheading / Summary Lead',
    },
    {
      name: 'patientName',
      type: 'text',
      label: 'Patient Name (or pseudonym)',
    },
    {
      name: 'patientQuote',
      type: 'textarea',
      label: 'Featured Patient Quote',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category (e.g. life-saving-treatments, dialysis-recovery, pediatric-care)',
    },
    {
      name: 'format',
      type: 'select',
      defaultValue: 'article',
      options: [
        { label: 'Article / Written Story', value: 'article' },
        { label: 'Video Story', value: 'video' },
      ],
    },
    {
      name: 'storyParagraphs',
      type: 'array',
      label: 'Story Content & Quotes',
      fields: [
        { name: 'type', type: 'text', defaultValue: 'paragraph' },
        { name: 'text', type: 'textarea' },
        { name: 'attribution', type: 'text' },
      ],
    },
    {
      name: 'thumbnail',
      type: 'text',
      label: 'Thumbnail / Hero Image Path (e.g. /media/story.webp)',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (YouTube or MP4, if Video Format)',
    },
    {
      name: 'publishedDate',
      type: 'text',
      label: 'Published Date (e.g. 2026-02-10)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature on Hub & Homepage',
    },
    {
      name: 'departments',
      type: 'json',
      label: 'Related Department Slugs',
    },
    {
      name: 'services',
      type: 'json',
      label: 'Related Service Slugs',
    },
    {
      name: 'legacyContent',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
    ...slugField(),
  ],
}
