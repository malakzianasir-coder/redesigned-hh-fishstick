import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const LegacySiteConfig: GlobalConfig = {
  slug: 'legacy-site-config',
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    { name: 'legacyNavigation', type: 'json' },
    { name: 'legacySettings', type: 'json' },
    { name: 'legacyForms', type: 'json' },
  ],
}
