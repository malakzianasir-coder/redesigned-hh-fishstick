import type { DoctorsHubContent as DoctorsHubData, DoctorRecord } from '@/lib/content/types'

import { DoctorsHubGrid, type DoctorsView } from './DoctorsHubGrid'

type DoctorsHubContentProps = {
  hub: DoctorsHubData
  doctors?: DoctorRecord[]
  initialView?: DoctorsView
  showViewTabs?: boolean
  heading?: string
  lede?: string
  kicker?: string
}

export function DoctorsHubContent({
  hub,
  doctors,
  initialView = 'all',
  showViewTabs = true,
  heading,
  lede,
  kicker,
}: DoctorsHubContentProps) {
  return (
    <DoctorsHubGrid
      doctors={doctors ?? hub.doctors}
      kicker={kicker ?? hub.kicker}
      heading={heading ?? hub.heading}
      lede={lede ?? hub.lede}
      initialView={initialView}
      showViewTabs={showViewTabs}
    />
  )
}
