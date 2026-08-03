import type { LabTestsHubContent as LabTestsHubData } from '@/lib/content/types'

import { LabTestsTable } from './LabTestsTable'

type LabTestsHubContentProps = {
  hub: LabTestsHubData
}

export function LabTestsHubContent({ hub }: LabTestsHubContentProps) {
  return (
    <LabTestsTable
      kicker={hub.kicker}
      heading={hub.heading}
      lede={hub.lede}
      categories={hub.categories}
      tests={hub.tests}
    />
  )
}
