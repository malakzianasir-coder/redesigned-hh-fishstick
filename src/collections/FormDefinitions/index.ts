import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'

export const FormDefinitions: CollectionConfig<'form-definitions'> = {
  slug: 'form-definitions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Submit',
      required: true,
    },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: 'Thanks, your message has been received.',
      required: true,
    },
    {
      name: 'fields',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'tel' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Radio', value: 'radio' },
            { label: 'Checkbox', value: 'checkbox' },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Half', value: 'half' },
          ],
        },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.fieldType === 'select' || siblingData?.fieldType === 'radio',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'recaptcha',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'provider',
          type: 'select',
          defaultValue: 'google-v2',
          options: [
            { label: 'Google reCAPTCHA v2', value: 'google-v2' },
            { label: 'Google reCAPTCHA v3', value: 'google-v3' },
            { label: 'hCaptcha', value: 'hcaptcha' },
          ],
        },
        {
          name: 'siteKey',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
}
