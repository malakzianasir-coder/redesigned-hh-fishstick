import { ChipRail } from '@/components/sections/ChipRail'
import {
  MARKETING_ICON_MAP,
  type MarketingIconName,
} from '@/components/marketing/marketingIcons'
import type { HowToDonateMethod } from '@/lib/content/types'

type HowToDonateMethodNavProps = {
  methods: HowToDonateMethod[]
  activeSlug?: string
}

export function HowToDonateMethodNav({ methods, activeSlug }: HowToDonateMethodNavProps) {
  return (
    <ChipRail
      className="jump-nav-rail"
      label="Methods"
      ariaLabel="Donation methods"
      items={[
        {
          label: 'Overview',
          href: '/donate/how-to-donate',
          active: !activeSlug,
        },
        ...methods.map((method) => ({
          label: method.navLabel,
          href: `/donate/how-to-donate/${method.slug}`,
          active: activeSlug === method.slug,
        })),
      ]}
      externals={[
        { label: 'Donate', href: '/donate' },
        { label: 'What You Can Support', href: '/donate/what-you-can-support' },
      ]}
    />
  )
}

export function HowToDonateMethodIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = MARKETING_ICON_MAP[name as MarketingIconName]
  if (!Icon) return null
  return <Icon size={size} weight="duotone" />
}
