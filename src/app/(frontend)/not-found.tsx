import type { Metadata } from 'next'
import {
  FirstAid,
  HandsPraying,
  Heart,
  Hospital,
  House,
  Phone,
} from '@phosphor-icons/react/dist/ssr'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import { InteractiveCard } from '@/components/ui/InteractiveCard'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page could not be found. Return home or browse Hijaz Hospital departments, services, and ways to give.',
}

const DESTINATIONS = [
  {
    title: 'Home',
    href: '/',
    excerpt: 'Return to the Hijaz Hospital homepage.',
    linkLabel: 'Go to homepage',
    Icon: House,
  },
  {
    title: 'Medical Departments',
    href: '/departments',
    excerpt: 'Browse specialties and clinical departments.',
    linkLabel: 'View all departments',
    Icon: Hospital,
  },
  {
    title: 'Patient Care',
    href: '/services',
    excerpt: 'Hospital facilities, support services, and diagnostics.',
    linkLabel: 'View all services',
    Icon: FirstAid,
  },
  {
    title: 'Donate',
    href: '/donate',
    excerpt: 'Support free care for deserving patients.',
    linkLabel: 'Ways to give',
    Icon: Heart,
  },
  {
    title: 'Patient Welfare',
    href: '/patient-welfare',
    excerpt: 'Assistance programmes, resources, and patient rights.',
    linkLabel: 'Patient Welfare',
    Icon: HandsPraying,
  },
  {
    title: 'Contact',
    href: '/contact',
    excerpt: 'Reach the hospital or donations office.',
    linkLabel: 'Contact Hijaz Hospital',
    Icon: Phone,
  },
]

export default function NotFound() {
  return (
    <article>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Page not found' }]} />
      <MarketingHeroSection
        hero={{
          kicker: 'Error 404',
          title: 'This page could not be found',
          excerpt:
            'The page you are looking for may have moved, or the address may be incorrect. You can return home or continue from one of the destinations below.',
          media: { type: 'illustration', preset: 'page/404' },
          links: [
            { label: 'Go to homepage', href: '/', variant: 'primary' },
            { label: 'Contact Hijaz Hospital', href: '/contact', variant: 'ghost' },
          ],
        }}
      />

      <section className="border-t border-dark-gray/15 bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Helpful links"
            title="Where would you like to go?"
            lede="Common starting points across the Hijaz Hospital website."
          />
          <div className="card-grid card-grid--3">
            {DESTINATIONS.map(({ title, href, excerpt, linkLabel, Icon }) => (
              <InteractiveCard
                key={href}
                href={href}
                className="flex flex-col gap-3 p-6"
              >
                <span className="icon-tile">
                  <Icon size={22} weight="duotone" />
                </span>
                <h3 className="text-h6M font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                  {title}
                </h3>
                <p className="text-b14 leading-[150%] text-primary-blue/85">{excerpt}</p>
                <span className="mt-auto text-b14 font-bold text-primary-red">{linkLabel}</span>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      <MarketingSupportCTA />
    </article>
  )
}
