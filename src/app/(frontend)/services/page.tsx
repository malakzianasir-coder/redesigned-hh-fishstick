import type { Metadata } from 'next'

import { ServicesHubContent } from '@/components/hub/ServicesHubContent'
import { getServices } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Hospital Services | Hijaz Hospital',
  description: 'Inpatient, outpatient, diagnostic, and support services at Hijaz Hospital.',
}

export default function ServicesHubPage() {
  const services = getServices()

  return <ServicesHubContent services={services} />
}
