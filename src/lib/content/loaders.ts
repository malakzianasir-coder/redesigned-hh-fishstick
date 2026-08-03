import departmentsData from '../../../content/departments.json'
import homeData from '../../../content/home.json'
import leadershipData from '../../../content/leadership.json'
import leadershipMessagesData from '../../../content/leadership-messages.json'
import ourImpactData from '../../../content/our-impact.json'
import ourPurposeData from '../../../content/our-purpose.json'
import ourSupportersData from '../../../content/our-supporters.json'
import patientCareData from '../../../content/patient-care.json'
import profileHajiInamData from '../../../content/profiles/haji-inam-elahi-asar.json'
import servicesData from '../../../content/services.json'

import type {
  DepartmentRecord,
  HomeContent,
  LeadershipMessagesRecord,
  LeadershipRecord,
  OurImpactRecord,
  OurPurposeRecord,
  OurSupportersRecord,
  PatientCareRecord,
  ProfileRecord,
  ServiceRecord,
} from './types'

const departments = departmentsData as DepartmentRecord[]
const services = servicesData as ServiceRecord[]
const patientCarePages = patientCareData as PatientCareRecord[]
const homeContent = homeData as HomeContent
const ourPurpose = ourPurposeData as OurPurposeRecord
const leadership = leadershipData as LeadershipRecord
const leadershipMessages = leadershipMessagesData as LeadershipMessagesRecord
const ourImpact = ourImpactData as OurImpactRecord
const ourSupporters = ourSupportersData as OurSupportersRecord
const profileHajiInam = profileHajiInamData as ProfileRecord

export function getDepartments(): DepartmentRecord[] {
  return departments
}

export function getDepartment(slug: string): DepartmentRecord | undefined {
  return departments.find((d) => d.slug === slug)
}

export function getServices(): ServiceRecord[] {
  return services
}

export function getService(slug: string): ServiceRecord | undefined {
  return services.find((s) => s.slug === slug)
}

export function getPatientCarePages(): PatientCareRecord[] {
  return patientCarePages
}

export function getPatientCare(slug: string): PatientCareRecord | undefined {
  return patientCarePages.find((p) => p.slug === slug)
}

export function getHomeContent(): HomeContent {
  return homeContent
}

export function getOurPurpose(): OurPurposeRecord {
  return ourPurpose
}

export function getLeadership(): LeadershipRecord {
  return leadership
}

export function getLeadershipMessages(): LeadershipMessagesRecord {
  return leadershipMessages
}

export function getOurImpact(): OurImpactRecord {
  return ourImpact
}

export function getOurSupporters(): OurSupportersRecord {
  return ourSupporters
}

export function getProfile(slug: string): ProfileRecord | undefined {
  if (slug === profileHajiInam.slug) return profileHajiInam
  return undefined
}
