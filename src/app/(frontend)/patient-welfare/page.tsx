import type { Metadata } from 'next'

import { PatientCareHubContent } from '@/components/patient-care/PatientCareHubContent'
import { getPatientWelfareHub } from '@/lib/content/loaders'

const page = getPatientWelfareHub()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function PatientWelfareHubPage() {
  return <PatientCareHubContent page={page} />
}
