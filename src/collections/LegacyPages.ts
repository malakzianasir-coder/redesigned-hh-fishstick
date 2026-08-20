import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { heroGroup } from '@/fields/heroGroup'
import { jumpLinksField } from '@/fields/jumpLinksField'
import { pageSectionsField } from '@/blocks/pageBlocks'

export const LegacyPages: CollectionConfig = {
  slug: 'legacy-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      label: 'Page Title (e.g. Home, About Us, Donate)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Page URL Slug (e.g. home, about-us, our-purpose)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta Description / Summary',
    },
    heroGroup(),
    jumpLinksField(),
    pageSectionsField(),
    {
      name: 'homeSlider',
      type: 'array',
      label: 'Home Hero Image Slider (Only for Home page)',
      fields: [
        { name: 'kicker', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'image', type: 'text', required: true },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Donate Now' },
        { name: 'ctaHref', type: 'text', defaultValue: '/donate' },
      ],
    },
    {
      name: 'statsOrbit',
      type: 'array',
      label: 'Key Facts & Statistics (Orbit Section)',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'sublabel', type: 'text' },
        { name: 'icon', type: 'text' },
      ],
    },
    {
      name: 'donorWall',
      type: 'array',
      label: 'Donor Wall Entries (Only for Our Supporters page)',
      fields: [
        { name: 'number', type: 'number' },
        { name: 'name', type: 'text', required: true },
        { name: 'category', type: 'text' },
      ],
    },
    {
      name: 'leadershipTeam',
      type: 'array',
      label: 'Leadership Profiles (Only for Leadership page)',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'text' },
      ],
    },
    {
      name: 'complianceLogos',
      type: 'array',
      label: 'Compliance & Accreditations (Only for Our Purpose page)',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'src', type: 'text', required: true },
        { name: 'href', type: 'text' },
        { name: 'alt', type: 'text' },
      ],
    },
    {
      name: 'legacyHero',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
    {
      name: 'legacyJumpLinks',
      type: 'json',
    },
    {
      name: 'legacySections',
      type: 'json',
    },
    {
      name: 'legacyGroups',
      type: 'json',
    },
    {
      name: 'legacyExternals',
      type: 'json',
    },
    {
      name: 'legacyStats',
      type: 'json',
    },
    {
      name: 'legacyRawData',
      type: 'json',
    },
  ],
}
