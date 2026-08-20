import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const LabTests: CollectionConfig = {
  slug: 'lab-tests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'reportingTime', 'isOutsourced', 'slug'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Test Name (e.g. Complete Blood Count - CBC, Lipid Profile)',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Lab Category (e.g. Hematology, Biochemistry, Microbiology)',
    },
    {
      name: 'reportingTime',
      type: 'text',
      label: 'Reporting Turnaround Time (e.g. Same Day, 24 Hours, 3 Days)',
    },
    {
      name: 'specimen',
      type: 'text',
      label: 'Sample / Specimen Required (e.g. EDTA Blood, Serum, Urine)',
    },
    {
      name: 'isOutsourced',
      type: 'checkbox',
      defaultValue: false,
      label: 'Outsourced Reference Test',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Clinical Purpose & Description',
    },
    {
      name: 'preparation',
      type: 'textarea',
      label: 'Patient Preparation & Fasting Instructions',
    },
    {
      name: 'alsoKnownAs',
      type: 'array',
      label: 'Alternative Test Names / Aliases',
      fields: [
        { name: 'alias', type: 'text', required: true },
      ],
    },
    {
      name: 'legacyDescription',
      type: 'json',
    },
    {
      name: 'legacyPreparation',
      type: 'json',
    },
    ...slugField(),
  ],
}
