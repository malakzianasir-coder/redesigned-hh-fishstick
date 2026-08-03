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
  { href: '/ds/mega-menu', title: 'Mega Menu', description: 'Navigation chrome and mega-menu panels.' },
  { href: '/ds/illustrations', title: 'Illustrations', description: 'Illustration system presets and usage.' },
]

export default function DsIndexPage() {
  return (
    <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
      <p className="kicker">Dev only</p>
      <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">Design System Catalogs</h1>
      <p className="mt-2 max-w-2xl text-b16 text-primary-blue/85">
        Static reference pages ported from the hijaz design-system HTML mockups.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CATALOGS.map((catalog) => (
          <li key={catalog.href}>
            <a href={catalog.href} className="card-interactive flex flex-col gap-2 p-6">
              <h2 className="text-h6 font-bold text-primary-blue">{catalog.title}</h2>
              <p className="text-b14 text-primary-blue/85">{catalog.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
