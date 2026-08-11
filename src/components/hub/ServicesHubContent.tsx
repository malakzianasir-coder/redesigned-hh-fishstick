import type { ServiceRecord } from '@/lib/content/types'

import { CategoryHubGrid, type HubCardItem, type HubFilterCategory } from './CategoryHubGrid'
import { SERVICE_ICON_MAP } from './hubIcons'

const HUB_CATEGORY_LABELS: Record<string, string> = {
  facilities: 'Hospital Facilities',
  clinical: 'Clinical Support',
  support: 'Support Services',
  diagnostics: 'Diagnostics',
}

const SERVICE_HUB_FILTERS: HubFilterCategory[] = [
  { slug: 'all', label: 'All' },
  { slug: 'facilities', label: 'Hospital Facilities' },
  { slug: 'clinical', label: 'Clinical Support' },
  { slug: 'support', label: 'Support Services' },
  { slug: 'diagnostics', label: 'Diagnostics' },
]

const LAB_TESTS_CARD: HubCardItem = {
  id: 'lab-tests',
  title: 'List of Tests Available',
  excerpt: 'Searchable lab test directory — rates withheld from public UI.',
  categoryLabel: 'Diagnostics',
  categorySlug: 'diagnostics',
  href: '/lab-tests',
  icon: 'lab-tests',
  linkLabel: 'Browse lab tests',
  variant: 'outlined',
}

function toHubCard(service: ServiceRecord): HubCardItem {
  const categorySlug = service.categorySlug ?? 'facilities'
  return {
    id: service.slug,
    title: service.title,
    excerpt: service.excerpt,
    categoryLabel: HUB_CATEGORY_LABELS[categorySlug] ?? service.category ?? 'Services',
    categorySlug,
    href: `/services/${service.slug}`,
    icon: service.slug in SERVICE_ICON_MAP ? service.slug : 'ipd',
    linkLabel: 'View service',
  }
}

type ServicesHubContentProps = {
  services: ServiceRecord[]
}

export function ServicesHubContent({ services }: ServicesHubContentProps) {
  const cards = [...services.map(toHubCard), LAB_TESTS_CARD].sort((a, b) => a.title.localeCompare(b.title))

  return (
    <CategoryHubGrid
      kicker="Patient Care & Facilities"
      heading="Hospital Services"
      lede="From inpatient care to diagnostics and emergency services — comprehensive support for every stage of your healthcare journey."
      filters={SERVICE_HUB_FILTERS}
      cards={cards}
    />
  )
}
