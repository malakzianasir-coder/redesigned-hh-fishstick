import { renderDonateSection } from '@/components/donate/renderDonateSection'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { withJumpExternals } from '@/components/sections/withJumpExternals'
import { toMarketingHero } from '@/lib/content/toMarketingHero'
import type { ServiceRecord } from '@/lib/content/types'

type ServiceDetailContentProps = {
  page: ServiceRecord
}

export function ServiceDetailContent({ page }: ServiceDetailContentProps) {
  const hero = toMarketingHero(page.hero)
  const whyChooseSection = page.sections.find((section) => {
    const id = 'id' in section ? section.id : undefined
    return id === 'why-choose' || Boolean(id?.startsWith('why-choose'))
  })
  const whyChooseId = whyChooseSection && 'id' in whyChooseSection ? whyChooseSection.id : undefined
  const whyChooseHref = whyChooseId ? `#${whyChooseId}` : null

  const marketingHero = {
    ...hero,
    // Patient Care (/services/*): quote-style single excerpt — no stacked hero.quote
    excerptVariant: 'quote' as const,
    quote: undefined,
    media:
      page.hero.media?.type === 'image'
        ? { type: 'image' as const, src: page.hero.media.src, alt: page.hero.media.alt || page.title }
        : hero.media,
    links:
      page.hero.links && page.hero.links.length > 0
        ? page.hero.links
        : [
            { label: 'Our Services', href: '#services', variant: 'primary' as const },
            whyChooseHref
              ? { label: 'Why Choose Us', href: whyChooseHref, variant: 'ghost' as const }
              : { label: 'Overview', href: '#overview', variant: 'ghost' as const },
          ],
  }

  const jumpLinks = withJumpExternals(
    page.jumpLinks && page.jumpLinks.length > 0
      ? page.jumpLinks
      : [
          { label: 'Overview', href: '#overview' },
          { label: 'Services', href: '#services' },
          ...(whyChooseHref ? [{ label: 'Why Choose Us', href: whyChooseHref }] : []),
        ],
    [{ label: 'All Services', href: '/services' }],
  )

  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          {
            label: page.category || 'Patient Care',
            href: page.categorySlug ? `/services#${page.categorySlug}` : '/services',
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
