import { renderDonateSection } from '@/components/donate/renderDonateSection'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { toMarketingHero } from '@/lib/content/toMarketingHero'
import type { DepartmentRecord } from '@/lib/content/types'

type DepartmentDetailContentProps = {
  page: DepartmentRecord
}

export function DepartmentDetailContent({ page }: DepartmentDetailContentProps) {
  const hero = toMarketingHero(page.hero)

  const marketingHero = {
    ...hero,
    excerptVariant: 'quote' as const,
    media:
      page.hero.media?.type === 'image'
        ? { type: 'image' as const, src: page.hero.media.src, alt: page.hero.media.alt || page.title }
        : hero.media,
    links:
      page.hero.links && page.hero.links.length > 0
        ? page.hero.links
        : [
            { label: 'Our Services', href: '#services', variant: 'primary' as const },
            { label: 'Why Choose Us', href: '#why-choose', variant: 'ghost' as const },
          ],
  }

  const jumpLinks =
    page.jumpLinks && page.jumpLinks.length > 0
      ? page.jumpLinks
      : [
          { label: 'Overview', href: '#overview' },
          { label: 'Services', href: '#services' },
          { label: 'Why Choose Us', href: '#why-choose' },
        ]

  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Medical Departments', href: '/departments' },
          {
            label: page.category,
            href: page.categorySlug ? `/departments#${page.categorySlug}` : '/departments',
          },
          { label: page.title },
        ]}
      />
      <MarketingHeroSection hero={marketingHero} />
      <JumpNav links={jumpLinks} />
      {page.sections.map(renderDonateSection)}
    </article>
  )
}
