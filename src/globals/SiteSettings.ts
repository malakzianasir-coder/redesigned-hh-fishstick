import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'hospitalName',
      type: 'text',
      defaultValue: 'Hijaz Social Welfare Society (Hijaz Hospital)',
      label: 'Official Hospital Name',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Excellence in Care · Dignity in Service · Access for All',
      label: 'Official Slogan / Tagline',
    },
    {
      name: 'missionStatement',
      type: 'textarea',
      defaultValue: 'To care for the ailing with compassion, respect, dignity, and professional excellence, while ensuring that financial hardship never stands in the way of receiving care.',
      label: 'Footer Mission Statement',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Hospital Contact Information',
      fields: [
        { name: 'uan', type: 'text', defaultValue: '+92 42 111 044 529', label: 'UAN Helpline' },
        { name: 'phone', type: 'text', defaultValue: '0321-4045125', label: 'Direct Phone / Mobile' },
        { name: 'emergencyPhone', type: 'text', defaultValue: '+92 42 111 044 529', label: '24/7 Emergency Phone' },
        { name: 'generalEmail', type: 'text', defaultValue: 'info@hijazhospital.org.pk', label: 'General Inquiries Email' },
        { name: 'donationsEmail', type: 'text', defaultValue: 'Donations@hijazhospital.org.pk', label: 'Donations Office Email' },
        { name: 'address', type: 'textarea', defaultValue: '27-D-1, Sir Syed Road, Gulberg III, Lahore, Pakistan', label: 'Physical Address' },
        { name: 'patientReportsUrl', type: 'text', defaultValue: 'http://110.39.146.42:82/Patient/Login.aspx', label: 'Online Patient Reports Portal URL' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Channels',
      fields: [
        { name: 'facebook', type: 'text', defaultValue: 'https://www.facebook.com/HijazHospitalTrust/' },
        { name: 'youtube', type: 'text', defaultValue: 'https://www.youtube.com/channel/UCIzVtxEnDTJsdIcCokl_paQ' },
        { name: 'linkedin', type: 'text', defaultValue: 'https://www.linkedin.com/company/hijaz-hospital-trust' },
        { name: 'twitter', type: 'text', defaultValue: 'https://twitter.com/HijazHospital' },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Footer Newsletter Settings',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'label', type: 'text', defaultValue: 'Stay updated with our medical camps and impact' },
        { name: 'placeholder', type: 'text', defaultValue: 'Enter your email address' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Subscribe' },
        { name: 'successMessage', type: 'text', defaultValue: 'Thank you for subscribing to Hijaz Hospital updates.' },
        { name: 'errorMessage', type: 'text', defaultValue: 'Please enter a valid email address.' },
      ],
    },
    {
      name: 'legacySettings',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
  ],
}
