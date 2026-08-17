import type { CollectionConfig } from 'payload'

export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'txnRefNo',
    defaultColumns: ['txnRefNo', 'donorName', 'amountPKR', 'status', 'createdAt'],
  },
  access: {
    // Contains donor PII and payment data: REST/GraphQL access must stay authenticated.
    // Server-side calls from the jazzcash routes use the Local API, which bypasses access control.
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: () => false,
  },
  fields: [
    {
      name: 'txnRefNo',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'donorName',
      type: 'text',
      required: true,
    },
    {
      name: 'donorMobile',
      type: 'text',
      required: true,
    },
    {
      name: 'causeSlug',
      type: 'text',
    },
    {
      name: 'causeTitle',
      type: 'text',
    },
    {
      name: 'amountPKR',
      type: 'number',
      required: true,
    },
    {
      name: 'billReference',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'responseCode',
      type: 'text',
    },
    {
      name: 'responseMessage',
      type: 'text',
    },
    {
      name: 'authCode',
      type: 'text',
    },
    {
      name: 'retrievalRefNo',
      type: 'text',
    },
    {
      name: 'ipnReceivedAt',
      type: 'date',
    },
    {
      name: 'ipnPayload',
      type: 'json',
    },
  ],
}
