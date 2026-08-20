import type { Block, Field } from 'payload'

export const ContentSectionBlock: Block = {
  slug: 'contentSection',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section Anchor ID (e.g. overview, details)' },
    { name: 'kicker', type: 'text', label: 'Section Kicker / Subtitle' },
    { name: 'title', type: 'text', label: 'Section Heading' },
    { name: 'lede', type: 'textarea', label: 'Lead Paragraph' },
    { name: 'body', type: 'textarea', label: 'Body Content (Text / Markdown / HTML)' },
    {
      name: 'bullets',
      type: 'array',
      label: 'Key Bullet Points / List',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'actions',
      type: 'array',
      label: 'Action Buttons / Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'variant', type: 'text', defaultValue: 'default' },
      ],
    },
  ],
}

export const CardGridBlock: Block = {
  slug: 'cardGrid',
  labels: {
    singular: 'Card Grid Section',
    plural: 'Card Grid Sections',
  },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section Anchor ID' },
    { name: 'kicker', type: 'text', label: 'Kicker' },
    { name: 'title', type: 'text', label: 'Section Heading' },
    { name: 'lede', type: 'textarea', label: 'Lead Paragraph' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'href', type: 'text' },
        { name: 'icon', type: 'text', label: 'Icon Name (e.g. Heart, Stethoscope, Bed, Shield)' },
        { name: 'badge', type: 'text' },
        { name: 'image', type: 'text' },
      ],
    },
  ],
}

export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Accordion / FAQ Section',
    plural: 'Accordion / FAQ Sections',
  },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section Anchor ID' },
    { name: 'kicker', type: 'text', label: 'Kicker' },
    { name: 'title', type: 'text', label: 'Section Heading' },
    { name: 'lede', type: 'textarea', label: 'Lead Paragraph' },
    {
      name: 'items',
      type: 'array',
      label: 'Accordion Items',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Item Title / Question' },
        { name: 'content', type: 'textarea', required: true, label: 'Item Content / Answer' },
      ],
    },
  ],
}

export const StatsOrbitBlock: Block = {
  slug: 'statsOrbit',
  labels: {
    singular: 'Stats & Facts Section',
    plural: 'Stats & Facts Sections',
  },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section Anchor ID' },
    { name: 'kicker', type: 'text', label: 'Kicker' },
    { name: 'title', type: 'text', label: 'Section Heading' },
    { name: 'lede', type: 'textarea', label: 'Lead Paragraph' },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics & Metrics',
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value (e.g. 100K+, 24/7, 98%)' },
        { name: 'label', type: 'text', required: true, label: 'Metric Label' },
        { name: 'sublabel', type: 'text', label: 'Context / Subtitle' },
        { name: 'icon', type: 'text', label: 'Icon Name' },
      ],
    },
  ],
}

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
  },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section Anchor ID' },
    { name: 'kicker', type: 'text', label: 'Kicker' },
    { name: 'title', type: 'text', label: 'Heading' },
    { name: 'description', type: 'textarea', label: 'Description' },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'variant', type: 'text', defaultValue: 'default' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'variant', type: 'text', defaultValue: 'outline' },
      ],
    },
    {
      name: 'styleVariant',
      type: 'select',
      defaultValue: 'blue',
      options: [
        { label: 'Blue Gradient', value: 'blue' },
        { label: 'Red Accent', value: 'red' },
        { label: 'Light Background', value: 'light' },
      ],
    },
  ],
}

export const WaysToGiveBlock: Block = {
  slug: 'waysToGive',
  labels: {
    singular: 'Ways to Give Section',
    plural: 'Ways to Give Sections',
  },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section Anchor ID' },
    { name: 'kicker', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'lede', type: 'textarea' },
    {
      name: 'options',
      type: 'array',
      label: 'Giving Options',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'href', type: 'text' },
        { name: 'icon', type: 'text' },
        { name: 'badge', type: 'text' },
      ],
    },
  ],
}

export const DonorWallBlock: Block = {
  slug: 'donorWall',
  labels: {
    singular: 'Donor Wall Section',
    plural: 'Donor Wall Sections',
  },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Our Donor Wall' },
    { name: 'lede', type: 'textarea' },
    {
      name: 'donors',
      type: 'array',
      label: 'Donors List',
      fields: [
        { name: 'number', type: 'number', label: 'Donor Rank / Number' },
        { name: 'name', type: 'text', required: true, label: 'Donor / Organization Name' },
        { name: 'category', type: 'text', label: 'Category / Tier' },
      ],
    },
  ],
}

export const MilestonesBlock: Block = {
  slug: 'milestones',
  labels: {
    singular: 'Milestones & Timeline',
    plural: 'Milestones & Timeline',
  },
  fields: [
    { name: 'sectionId', type: 'text' },
    { name: 'kicker', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'lede', type: 'textarea' },
    {
      name: 'milestones',
      type: 'array',
      label: 'Milestone Events',
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export const ComplianceLogosBlock: Block = {
  slug: 'complianceLogos',
  labels: {
    singular: 'Compliance & Accreditations',
    plural: 'Compliance & Accreditations',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Our Compliance' },
    { name: 'lede', type: 'textarea' },
    {
      name: 'logos',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'src', type: 'text', required: true },
        { name: 'href', type: 'text' },
        { name: 'alt', type: 'text' },
      ],
    },
  ],
}

export const MachineryCarouselBlock: Block = {
  slug: 'machineryCarousel',
  labels: {
    singular: 'Machinery Showcase Carousel',
    plural: 'Machinery Showcase Carousels',
  },
  fields: [
    { name: 'kicker', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'lede', type: 'textarea' },
    {
      name: 'slides',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'text' },
        { name: 'specs', type: 'text' },
      ],
    },
  ],
}

export const allPageBlocks = [
  ContentSectionBlock,
  CardGridBlock,
  AccordionBlock,
  StatsOrbitBlock,
  CtaBannerBlock,
  WaysToGiveBlock,
  DonorWallBlock,
  MilestonesBlock,
  ComplianceLogosBlock,
  MachineryCarouselBlock,
]

export const pageSectionsField = (overrides: Partial<Field> = {}): Field => ({
  name: 'pageSections',
  type: 'blocks',
  label: 'Page Content Sections (Modular Page Builder)',
  blocks: allPageBlocks,
  ...overrides,
})
