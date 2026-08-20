import type { Field } from 'payload'

export const heroGroup = (overrides: Partial<Field> = {}): Field => ({
  name: 'hero',
  type: 'group',
  label: 'Hero Section',
  fields: [
    {
      name: 'variant',
      type: 'text',
      defaultValue: 'brand',
      label: 'Hero Style Variant (e.g. brand, split, centered, white, story, image-bg)',
    },
    {
      name: 'kicker',
      type: 'text',
      label: 'Kicker (Top Eyebrow Text)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Hero Title / Heading',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline / Subtitle',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt / Lead Description',
    },
    {
      name: 'image',
      type: 'text',
      label: 'Image URL or Path',
      admin: {
        description: 'Static image path e.g. /media/doctor.webp or full URL',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Image Alt Text',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary Call to Action',
      fields: [
        { name: 'label', type: 'text', label: 'Button Label' },
        { name: 'href', type: 'text', label: 'Button Link (URL)' },
        { name: 'variant', type: 'text', label: 'Style Variant', defaultValue: 'default' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary Call to Action',
      fields: [
        { name: 'label', type: 'text', label: 'Button Label' },
        { name: 'href', type: 'text', label: 'Button Link (URL)' },
        { name: 'variant', type: 'text', label: 'Style Variant', defaultValue: 'outline' },
      ],
    },
    {
      name: 'supportLine',
      type: 'text',
      label: 'Support Line / Footer Notice',
    },
    {
      name: 'chips',
      type: 'array',
      label: 'Key Badges / Chips',
      fields: [
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Hero Metrics / Stats',
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value (e.g. 50K+, 24/7)' },
        { name: 'label', type: 'text', required: true, label: 'Metric Label' },
        { name: 'sublabel', type: 'text', label: 'Sub-label / Context' },
      ],
    },
    {
      name: 'sliderSlides',
      type: 'array',
      label: 'Hero Slider Slides (For Home Hero)',
      fields: [
        { name: 'kicker', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'image', type: 'text' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaHref', type: 'text' },
      ],
    },
  ],
  ...overrides,
})
