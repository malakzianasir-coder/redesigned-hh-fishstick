import doctorsData from '../../../content/doctors.json'
import donateData from '../../../content/donate.json'
import donationsData from '../../../content/donations.json'
import labTestsData from '../../../content/lab-tests.json'
import chairmansMessageData from '../../../content/chairmans-message.json'
import patientWelfareHubData from '../../../content/patient-welfare-hub.json'
import departmentsData from '../../../content/departments.json'
import homeData from '../../../content/home.json'
import leadershipData from '../../../content/leadership.json'
import leadershipMessagesData from '../../../content/leadership-messages.json'
import ourImpactData from '../../../content/our-impact.json'
import ourPurposeData from '../../../content/our-purpose.json'
import ourSupportersData from '../../../content/our-supporters.json'
import patientWelfareData from '../../../content/patient-welfare.json'
import presidentsMessageData from '../../../content/presidents-message.json'
import profileHajiInamData from '../../../content/profiles/haji-inam-elahi-asar.json'
import servicesData from '../../../content/services.json'

import type {
  DepartmentRecord,
  DoctorsHubContent,
  DonateHubContent,
  DonationCauseRecord,
  HomeContent,
  LabTestsHubContent,
  LeadershipMessagesRecord,
  LeadershipRecord,
  OurImpactRecord,
  OurPurposeRecord,
  OurSupportersRecord,
  PatientCareHubRecord,
  PatientCareRecord,
  ProfileRecord,
  ServiceRecord,
  SingleMessagePageRecord,
} from './types'

const departments = departmentsData as DepartmentRecord[]
const services = servicesData as ServiceRecord[]
const patientWelfarePages = patientWelfareData as PatientCareRecord[]
const patientWelfareHub = patientWelfareHubData as PatientCareHubRecord
const donateContent = donateData as DonateHubContent
const donations = donationsData as DonationCauseRecord[]
const homeContent = homeData as HomeContent
const ourPurpose = ourPurposeData as OurPurposeRecord
const leadership = leadershipData as LeadershipRecord
const leadershipMessages = leadershipMessagesData as LeadershipMessagesRecord
const chairmansMessage = chairmansMessageData as SingleMessagePageRecord
const presidentsMessage = presidentsMessageData as SingleMessagePageRecord
const ourImpact = ourImpactData as OurImpactRecord
const ourSupporters = ourSupportersData as OurSupportersRecord
const profileHajiInam = profileHajiInamData as ProfileRecord
const doctorsHub = doctorsData as DoctorsHubContent
const labTestsHub = labTestsData as LabTestsHubContent

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

export function getPatientWelfarePages(): PatientCareRecord[] {
  return patientWelfarePages
}

export function getPatientWelfare(slug: string): PatientCareRecord | undefined {
  return patientWelfarePages.find((p) => p.slug === slug)
}

export function getPatientWelfareHub(): PatientCareHubRecord {
  return patientWelfareHub
}

/** @deprecated Use getPatientWelfarePages */
export function getPatientCarePages(): PatientCareRecord[] {
  return getPatientWelfarePages()
}

/** @deprecated Use getPatientWelfare */
export function getPatientCare(slug: string): PatientCareRecord | undefined {
  return getPatientWelfare(slug)
}

/** @deprecated Use getPatientWelfareHub */
export function getPatientCareHub(): PatientCareHubRecord {
  return getPatientWelfareHub()
}

export function getDonateContent(): DonateHubContent {
  return donateContent
}

export function getDonations(): DonationCauseRecord[] {
  return donations
}

export function getDonation(slug: string): DonationCauseRecord | undefined {
  return donations.find((d) => d.slug === slug)
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

export function getChairmansMessage(): SingleMessagePageRecord {
  return chairmansMessage
}

export function getPresidentsMessage(): SingleMessagePageRecord {
  return presidentsMessage
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

export function getDoctorsHub(): DoctorsHubContent {
  return doctorsHub
}

export function getLabTestsHub(): LabTestsHubContent {
  return labTestsHub
}
