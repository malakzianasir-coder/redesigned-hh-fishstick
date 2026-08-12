import { ChipRail } from '@/components/sections/ChipRail'
import {
  MARKETING_ICON_MAP,
  type MarketingIconName,
} from '@/components/marketing/marketingIcons'
import type { WhatYouCanSupportCause } from '@/lib/content/types'

type WhatYouCanSupportNavProps = {
  causes: WhatYouCanSupportCause[]
  activeSlug?: string
}

export function WhatYouCanSupportNav({ causes, activeSlug }: WhatYouCanSupportNavProps) {
  return (
    <ChipRail
      label="Support"
      ariaLabel="What you can support"
      items={[
        {
          label: 'Overview',
          href: '/donate/what-you-can-support',
          active: !activeSlug,
        },
        ...causes.map((cause) => ({
          label: cause.navLabel,
          href: `/donate/what-you-can-support/${cause.slug}`,
          active: activeSlug === cause.slug,
        })),
      ]}
      externals={[{ label: 'How to Donate', href: '/donate/how-to-donate' }]}
    />
  )
}

export function SupportCauseIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = MARKETING_ICON_MAP[name as MarketingIconName]
  if (!Icon) return null
  return <Icon size={size} weight="duotone" />
}
