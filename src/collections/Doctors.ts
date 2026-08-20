import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialty', 'department', 'role', 'slug'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Doctor Name (e.g. Dr. Jane Doe)',
    },
    {
      name: 'specialty',
      type: 'text',
      label: 'Medical Specialty / Field',
    },
    {
      name: 'department',
      type: 'text',
      label: 'Clinical Department',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role / Designation (e.g. Consultant, Head of Department, Visiting Specialist)',
    },
    {
      name: 'qualifications',
      type: 'text',
      label: 'Qualifications & Degrees (e.g. MBBS, FCPS, FRCS)',
    },
    {
      name: 'experience',
      type: 'text',
      label: 'Years of Experience',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Doctor Bio / Summary',
    },
    {
      name: 'opdSchedule',
      type: 'array',
      label: 'OPD Clinic Schedule',
      fields: [
        { name: 'day', type: 'text', required: true, label: 'Day (e.g. Monday - Friday, Saturday)' },
        { name: 'timing', type: 'text', required: true, label: 'Timing (e.g. 09:00 AM - 02:00 PM)' },
        { name: 'room', type: 'text', label: 'Room / Clinic Number' },
      ],
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Clinic / Appointment Phone',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
    },
    {
      name: 'image',
      type: 'text',
      label: 'Doctor Photo Path (e.g. /media/doctor.webp)',
    },
    {
      name: 'tags',
      type: 'json',
      label: 'Legacy Tags (e.g. ["head-of-department", "visiting"])',
    },
    ...slugField(),
  ],
}
