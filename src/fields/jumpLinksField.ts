import type { Field } from 'payload'

export const jumpLinksField = (overrides: Partial<Field> = {}): Field => ({
  name: 'jumpLinks',
  type: 'array',
  label: 'Page Jump Links (Sub-navigation)',
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      label: 'Section ID (Anchor Target, e.g. overview, services)',
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Nav Label (e.g. Overview, Clinical Services)',
    },
  ],
  ...overrides,
})
