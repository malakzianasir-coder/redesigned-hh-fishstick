import { ContentHubPage } from '@/components/hub/ContentHubPage'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { toMarketingHero } from '@/lib/content/toMarketingHero'
import type { PatientCareHubRecord } from '@/lib/content/types'

const GROUP_LEDE: Record<string, string> = {
  'financial-community':
    'Zakat, welfare programs, meals, medicines, and disaster relief for patients who cannot afford care.',
  'patient-resources': 'Admission guidance, rights, information, and stories of recovery.',
}

export function PatientCareHubContent({ page }: { page: PatientCareHubRecord }) {
  return (
    <ContentHubPage
      title={page.title}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: page.title }]}
      hero={toMarketingHero(page.hero)}
      groups={page.hub.groups.map((group) => ({
        id: group.id ?? group.label.toLowerCase().replace(/\s+/g, '-'),
        kicker: page.hub.kicker,
        heading: group.label,
        lede: GROUP_LEDE[group.id ?? ''],
        cards: group.cards.map((card) => ({
          slug: card.slug ?? card.href,
          title: card.title,
          excerpt: card.excerpt,
          icon: card.icon,
          href: card.href,
          linkLabel: card.linkLabel ?? card.title,
        })),
      }))}
      externals={[{ label: 'Patient Stories', href: '/success-stories' }]}
    >
      <MarketingSupportCTA />
    </ContentHubPage>
  )
}
