import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'utilityBar',
      type: 'group',
      label: 'Top Utility Bar Links & Helplines',
      fields: [
        { name: 'helpline', type: 'text', defaultValue: '+92 42 111 044 529' },
        { name: 'emergency', type: 'text', defaultValue: '24/7 Emergency: +92 42 111 044 529' },
        { name: 'patientReportsLabel', type: 'text', defaultValue: 'Online Patient Reports' },
        { name: 'patientReportsUrl', type: 'text', defaultValue: 'http://110.39.146.42:82/Patient/Login.aspx' },
        { name: 'donateButtonLabel', type: 'text', defaultValue: 'Donate Now' },
        { name: 'donateButtonHref', type: 'text', defaultValue: '/donate' },
      ],
    },
    {
      name: 'mainNavItems',
      type: 'array',
      label: 'Main Mega Menu Navigation Items',
      fields: [
        { name: 'id', type: 'text', required: true, label: 'Menu ID (e.g. about, patient-care, services, doctors, donate)' },
        { name: 'label', type: 'text', required: true, label: 'Navigation Label' },
        { name: 'href', type: 'text', required: true, label: 'Target URL' },
        { name: 'badge', type: 'text', label: 'Optional Badge (e.g. 24/7, New)' },
        {
          name: 'moreLink',
          type: 'group',
          label: 'View All / More Link',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'groups',
          type: 'array',
          label: 'Dropdown Sub-Column Groups',
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Group Title' },
            {
              name: 'links',
              type: 'array',
              label: 'Group Links',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
                { name: 'badge', type: 'text' },
                { name: 'icon', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'legacyNavigation',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
  ],
}
