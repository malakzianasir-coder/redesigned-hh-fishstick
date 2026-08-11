import type { DepartmentRecord } from '@/lib/content/types'

import { CategoryHubGrid, type HubCardItem, type HubFilterCategory } from './CategoryHubGrid'
import { DEPARTMENT_ICON_MAP } from './hubIcons'

const HUB_CATEGORY_LABELS: Record<string, string> = {
  'surgery-allied': 'Surgery & Allied',
  'internal-medicine': 'Internal Medicine',
  'mother-child': 'Mother & Child',
  specialized: 'Specialized Care',
}

const DEPARTMENT_HUB_FILTERS: HubFilterCategory[] = [
  { slug: 'all', label: 'All' },
  { slug: 'surgery-allied', label: 'Surgery & Allied' },
  { slug: 'internal-medicine', label: 'Internal Medicine' },
  { slug: 'mother-child', label: 'Mother & Child' },
  { slug: 'specialized', label: 'Specialized Care' },
]

function toHubCard(dept: DepartmentRecord): HubCardItem {
  const categorySlug = dept.categorySlug ?? 'surgery-allied'
  return {
    id: dept.slug,
    title: dept.title,
    excerpt: dept.excerpt,
    categoryLabel: HUB_CATEGORY_LABELS[categorySlug] ?? dept.category,
    categorySlug,
    href: `/departments/${dept.slug}`,
    icon: dept.slug in DEPARTMENT_ICON_MAP ? dept.slug : 'general-surgery',
    linkLabel: 'View department',
  }
}

type DepartmentsHubContentProps = {
  departments: DepartmentRecord[]
}

export function DepartmentsHubContent({ departments }: DepartmentsHubContentProps) {
  const cards = departments.map(toHubCard).sort((a, b) => a.title.localeCompare(b.title))
  const count = departments.length

  return (
    <CategoryHubGrid
      kicker="Departments"
      heading="Medical Departments"
      lede={`Specialist departments delivering comprehensive care across surgery, internal medicine, mother & child, and allied specialties — ${count} departments in 4 categories.`}
      filters={DEPARTMENT_HUB_FILTERS}
      cards={cards}
      showFilterCounts
    />
  )
}
