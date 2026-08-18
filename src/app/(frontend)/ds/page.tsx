import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System Catalogs',
  robots: { index: false, follow: false },
}

const CATALOGS = [
  { href: '/ds/elements', title: 'Elements Inventory', description: 'Tokens, recipes, and UI primitives.' },
  {
    href: '/ds/dept-service-patterns',
    title: 'Department & Service Patterns',
    description: 'Page templates and section patterns for dept/service pages.',
  },
  {
    href: '/ds/hub-page-patterns',
    title: 'Hub & Content Pages',
    description: 'Content hubs (Donate / About Us), catalogue hubs, and slug pages with centered §9 titles.',
  },
  {
    href: '/ds/hero-quote',
    title: 'Hero Quote Excerpt',
    description: 'Toggle MarketingHero excerptVariant: body vs italic quote style (no quotation marks). Live on departments.',
  },
  { href: '/ds/mega-menu', title: 'Mega Menu', description: 'Navigation chrome and mega-menu panels.' },
  {
    href: '/ds/illustrations',
    title: 'Illustrations',
    description: 'Live Illustration presets used on patient welfare and donate heroes.',
  },
  {
    href: '/ds/at-a-glance',
    title: 'At a Glance',
    description: '5-year totals: original orbit type, outer rings, tap a figure to focus the orb.',
  },
]

import { InteractiveCard } from '@/components/ui/InteractiveCard'

export default function DsIndexPage() {
  return (
    <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
      <div className="flex flex-col gap-[6px]">
        <p className="kicker">Dev only</p>
        <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">Design System Catalogs</h1>
      </div>
      <p className="mt-2 max-w-2xl text-b16 text-primary-blue/85">
        Design-system catalogs. Illustrations uses the live React renderer; other entries are HTML mockups.
      </p>
      <ul className="card-grid card-grid--3 mt-8">
        {CATALOGS.map((catalog) => (
          <li key={catalog.href}>
            <InteractiveCard href={catalog.href} className="flex flex-col gap-2 p-6">
              <h2 className="text-h6 font-bold text-primary-blue">{catalog.title}</h2>
              <p className="text-b14 text-primary-blue/85">{catalog.description}</p>
            </InteractiveCard>
          </li>
        ))}
      </ul>
    </div>
  )
}
