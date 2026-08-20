import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'eventDate', 'eventVenue', 'slug'],
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
      label: 'Event Title',
    },
    {
      name: 'tagLine',
      type: 'text',
      label: 'Tagline / Kicker',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'heroImage',
      type: 'text',
      label: 'Event Banner Image (e.g. /media/event-1.webp)',
    },
    {
      name: 'eventType',
      type: 'text',
      defaultValue: 'Free Medical Camp',
      label: 'Event Type / Category (e.g. Free Medical Camp, Awareness Campaign, Ceremony)',
    },
    {
      name: 'eventDate',
      type: 'text',
      label: 'Event Date (e.g. March 25, 2026)',
    },
    {
      name: 'eventTime',
      type: 'text',
      label: 'Event Timing (e.g. 09:00 AM - 04:00 PM)',
    },
    {
      name: 'eventVenue',
      type: 'text',
      label: 'Event Location / Venue (e.g. Hijaz Hospital Auditorium)',
    },
    {
      name: 'eventEntry',
      type: 'text',
      defaultValue: 'Free & Open to All',
      label: 'Entry Policy (e.g. Free Entry, Registration Required)',
    },
    {
      name: 'eventBody',
      type: 'textarea',
      label: 'Event Overview & Schedule Body',
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
      name: 'registrationLink',
      type: 'text',
      label: 'Online Registration / RSVP Link',
    },
    {
      name: 'publishedAt',
      type: 'text',
      label: 'Published Date',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Event',
    },
    {
      name: 'categories',
      type: 'json',
      label: 'Event Categories',
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
