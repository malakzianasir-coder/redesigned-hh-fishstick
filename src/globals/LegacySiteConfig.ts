import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const LegacySiteConfig: GlobalConfig = {
  slug: 'legacy-site-config',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'legacyNavigation', type: 'json' },
    { name: 'legacySettings', type: 'json' },
    { name: 'legacyForms', type: 'json' },
  ],
}
