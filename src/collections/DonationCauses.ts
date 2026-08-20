import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { heroGroup } from '@/fields/heroGroup'
import { jumpLinksField } from '@/fields/jumpLinksField'
import { pageSectionsField } from '@/blocks/pageBlocks'

export const DonationCauses: CollectionConfig = {
  slug: 'donation-causes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'slug', 'zakatEligible'],
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
      label: 'Cause Title (e.g. Sponsor a Patient, Free Surgeries, Meal Program)',
    },
    {
      name: 'kind',
      type: 'text',
      label: 'Donation Kind / Type',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Full Description',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Short Summary Excerpt',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Name (e.g. Heart, FirstAid, HandsHolding, Utensils)',
    },
    {
      name: 'zakatEligible',
      type: 'checkbox',
      defaultValue: true,
      label: '100% Zakat Eligible',
    },
    {
      name: 'suggestedAmounts',
      type: 'array',
      label: 'Suggested Donation Tiers',
      fields: [
        { name: 'amount', type: 'number', required: true, label: 'Amount in PKR' },
        { name: 'label', type: 'text', required: true, label: 'Tier Label (e.g. One Month Dialysis)' },
        { name: 'impact', type: 'text', label: 'Impact Description' },
      ],
    },
    {
      name: 'bankAccounts',
      type: 'array',
      label: 'Designated Bank Accounts for this Cause',
      fields: [
        { name: 'bankName', type: 'text', required: true },
        { name: 'accountTitle', type: 'text', required: true },
        { name: 'accountNumber', type: 'text', required: true },
        { name: 'iban', type: 'text', required: true },
        { name: 'branch', type: 'text' },
      ],
    },
    heroGroup(),
    jumpLinksField(),
    pageSectionsField(),
    {
      name: 'bankAccountKeys',
      type: 'json',
      admin: { description: 'Legacy bank account keys array' },
    },
    {
      name: 'zakatCalculator',
      type: 'json',
      admin: { description: 'Zakat calculator configuration' },
    },
    {
      name: 'legacyHero',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
    {
      name: 'legacyJumpLinks',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
    {
      name: 'legacySections',
      type: 'json',
      admin: { description: 'Legacy raw JSON store for fallback compatibility.' },
    },
    ...slugField(),
  ],
}
