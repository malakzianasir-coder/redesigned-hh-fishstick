import { DONATION_ICON_MAP } from '@/components/donate/donationIcons'
import { MARKETING_ICON_MAP } from '@/components/marketing/marketingIcons'
import { PATIENT_CARE_ICON_MAP } from '@/components/patient-care/patientCareIcons'

export const CONTENT_HUB_ICON_MAP = {
  ...MARKETING_ICON_MAP,
  ...PATIENT_CARE_ICON_MAP,
  ...DONATION_ICON_MAP,
} as const

export type ContentHubIconName = keyof typeof CONTENT_HUB_ICON_MAP
