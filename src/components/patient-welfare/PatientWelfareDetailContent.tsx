import { renderDonateSection } from '@/components/donate/renderDonateSection'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { toMarketingHero } from '@/lib/content/toMarketingHero'
import type { PatientCareRecord } from '@/lib/content/types'

type PatientWelfareDetailContentProps = {
  page: PatientCareRecord
}

export function PatientWelfareDetailContent({ page }: PatientWelfareDetailContentProps) {
  const hero = toMarketingHero(page.hero)

  const marketingHero = {
    ...hero,
    quote: page.hero.quote || hero.quote,
    media: hero.media,
    links:
      page.hero.links && page.hero.links.length > 0
        ? page.hero.links
        : [
            { label: 'Overview', href: '#overview', variant: 'primary' as const },
            { label: 'Patient Welfare Hub', href: '/patient-welfare', variant: 'ghost' as const },
          ],
  }

  const jumpLinks =
    page.jumpLinks && page.jumpLinks.length > 0
      ? page.jumpLinks
      : [{ label: 'Overview', href: '#overview' }]

  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Patient Welfare', href: '/patient-welfare' },
          {
            label: page.category || 'Patient Welfare',
            href: page.categorySlug ? `/patient-welfare#${page.categorySlug}` : '/patient-welfare',
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
