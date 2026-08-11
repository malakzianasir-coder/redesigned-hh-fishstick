import newsData from '../../../content/news.json'
import eventsData from '../../../content/events.json'
import successStoriesData from '../../../content/success-stories.json'
import doctorsData from '../../../content/doctors.json'
import donateData from '../../../content/donate.json'
import donationsData from '../../../content/donations.json'
import howToDonateData from '../../../content/how-to-donate.json'
import whatYouCanSupportData from '../../../content/what-you-can-support.json'
import formsData from '../../../content/forms.json'
import labTestsData from '../../../content/lab-tests.json'
import landingPagesData from '../../../content/landing-pages.json'
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
import profileInamElahiData from '../../../content/profiles/inam-elahi-asar.json'
import profileMianAbdulWaheedData from '../../../content/profiles/mian-abdul-waheed.json'
import servicesData from '../../../content/services.json'
import siteSettingsData from '../../../content/site-settings.json'

import {
  buildArticleSearchIndex,
  eventToRelatedItem,
  newsToRelatedItem,
  searchArticles,
  storyToRelatedItem,
} from './article-helpers'
import { DEFAULT_ARTICLE_PAGE_SIZE, paginate } from './pagination'
import type {
  ArticleSearchEntry,
  DepartmentRecord,
  DoctorsHubContent,
  DonateHubContent,
  DonationCauseRecord,
  EventsHubContent,
  FormsContent,
  HolidayEntry,
  HomeContent,
  HowToDonateContent,
  HowToDonateMethod,
  WhatYouCanSupportCause,
  WhatYouCanSupportContent,
  HospitalEvent,
  LandingPagesContent,
  LandingPageMockup,
  LabTestsHubContent,
  LeadershipMessagesRecord,
  LeadershipRecord,
  NewsArticle,
  NewsHubContent,
  OurImpactRecord,
  OurPurposeRecord,
  OurSupportersRecord,
  PaginatedResult,
  PatientCareHubRecord,
  PatientCareRecord,
  ProfileRecord,
  RelatedArticleItem,
  ServiceRecord,
  SiteSettings,
  SingleMessagePageRecord,
  SuccessStory,
  SuccessStoriesHubContent,
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
const profileInamElahi = profileInamElahiData as ProfileRecord
const profileMianAbdulWaheed = profileMianAbdulWaheedData as ProfileRecord
const profilesBySlug: Record<string, ProfileRecord> = {
  [profileInamElahi.slug]: profileInamElahi,
  [profileMianAbdulWaheed.slug]: profileMianAbdulWaheed,
}
const doctorsHub = doctorsData as DoctorsHubContent
const labTestsHub = labTestsData as LabTestsHubContent
const formsContent = formsData as FormsContent
const landingPagesContent = landingPagesData as LandingPagesContent
const siteSettings = siteSettingsData as SiteSettings

type NewsDataFile = { hub: NewsHubContent; articles: NewsArticle[] }
type EventsDataFile = {
  hub: EventsHubContent
  hospitalEvents: HospitalEvent[]
  holidayCalendar: HolidayEntry[]
}
type SuccessStoriesDataFile = { hub: SuccessStoriesHubContent; stories: SuccessStory[] }

const newsFile = newsData as NewsDataFile
const eventsFile = eventsData as EventsDataFile
const successStoriesFile = successStoriesData as SuccessStoriesDataFile

const publishedNews = newsFile.articles.filter((a) => a._status === 'published')
const publishedEvents = eventsFile.hospitalEvents.filter((e) => e._status === 'published')
const publishedStories = successStoriesFile.stories.filter((s) => s._status === 'published')

const articleSearchIndex = buildArticleSearchIndex(publishedNews, publishedEvents, publishedStories)

function sortByPublishedAt<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

function sortEventsByDate(events: HospitalEvent[]): HospitalEvent[] {
  return [...events].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
  )
}

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

export function getHowToDonate(): HowToDonateContent {
  return howToDonateData as HowToDonateContent
}

export function getHowToDonateMethods(): HowToDonateMethod[] {
  return getHowToDonate().methods
}

export function getHowToDonateMethod(slug: string): HowToDonateMethod | undefined {
  return getHowToDonateMethods().find((method) => method.slug === slug)
}

export function getWhatYouCanSupport(): WhatYouCanSupportContent {
  return whatYouCanSupportData as WhatYouCanSupportContent
}

export function getWhatYouCanSupportCauses(): WhatYouCanSupportCause[] {
  return getWhatYouCanSupport().causes
}

export function getWhatYouCanSupportCause(slug: string): WhatYouCanSupportCause | undefined {
  return getWhatYouCanSupportCauses().find((cause) => cause.slug === slug)
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
  return profilesBySlug[slug]
}

export function getDoctorsHub(): DoctorsHubContent {
  return doctorsHub
}

export function getDoctor(slug: string) {
  return doctorsHub.doctors.find((doctor) => doctor.slug === slug)
}

export function getLabTestsHub(): LabTestsHubContent {
  return labTestsHub
}

export function getSiteSettings(): SiteSettings {
  return siteSettings
}

export function getForms() {
  return formsContent.forms
}

export function getFormById(id: string) {
  return formsContent.forms.find((form) => form.id === id)
}

export function getLandingPages(): LandingPageMockup[] {
  return landingPagesContent.pages.filter((page) => page._status === 'published')
}

export function getLandingPage(slug: string): LandingPageMockup | undefined {
  return getLandingPages().find((page) => page.slug === slug)
}

export function getNewsHub(): NewsHubContent {
  return newsFile.hub
}

export function getNewsArticles(): NewsArticle[] {
  return sortByPublishedAt(publishedNews)
}

export function getNewsCategories(): string[] {
  const set = new Set<string>()
  publishedNews.forEach((article) => article.categories.forEach((c) => set.add(c)))
  return Array.from(set).sort()
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return publishedNews.find((article) => article.slug === slug)
}

export function getNewsByCategory(category?: string): NewsArticle[] {
  const sorted = sortByPublishedAt(publishedNews)
  if (!category) return sorted
  return sorted.filter((article) => article.categories.includes(category))
}

export function getNewsPage(
  page = 1,
  pageSize = DEFAULT_ARTICLE_PAGE_SIZE,
  category?: string,
): PaginatedResult<NewsArticle> {
  return paginate(getNewsByCategory(category), page, pageSize)
}

export function getFeaturedNews(limit = 2): NewsArticle[] {
  return sortByPublishedAt(publishedNews.filter((a) => a.featured)).slice(0, limit)
}

export function getRelatedNews(article: NewsArticle, limit = 3): RelatedArticleItem[] {
  const related = sortByPublishedAt(
    publishedNews.filter(
      (item) =>
        item.slug !== article.slug &&
        item.categories.some((category) => article.categories.includes(category)),
    ),
  )
  return related.slice(0, limit).map(newsToRelatedItem)
}

export function getEventsHub(): EventsHubContent {
  return eventsFile.hub
}

export function getHospitalEvents(): HospitalEvent[] {
  return sortEventsByDate(publishedEvents)
}

export function getHospitalEvent(slug: string): HospitalEvent | undefined {
  return publishedEvents.find((event) => event.slug === slug)
}

export function getHolidayCalendar(): HolidayEntry[] {
  return eventsFile.holidayCalendar
}

export function getHospitalEventsPage(
  page = 1,
  pageSize = DEFAULT_ARTICLE_PAGE_SIZE,
): PaginatedResult<HospitalEvent> {
  return paginate(getHospitalEvents(), page, pageSize)
}

export function getFeaturedHospitalEvents(limit = 2): HospitalEvent[] {
  return sortEventsByDate(publishedEvents.filter((e) => e.featured)).slice(0, limit)
}

export function getRelatedHospitalEvents(event: HospitalEvent, limit = 3): RelatedArticleItem[] {
  const related = sortEventsByDate(
    publishedEvents.filter(
      (item) =>
        item.slug !== event.slug &&
        (item.categories.some((c) => event.categories.includes(c)) || item.eventType === event.eventType),
    ),
  )
  return related.slice(0, limit).map(eventToRelatedItem)
}

export function getSuccessStoriesHub(): SuccessStoriesHubContent {
  return successStoriesFile.hub
}

export function getSuccessStories(): SuccessStory[] {
  return sortByPublishedAt(publishedStories)
}

export function getSuccessStory(slug: string): SuccessStory | undefined {
  return publishedStories.find((story) => story.slug === slug)
}

export function getSuccessStoriesByCategory(category?: SuccessStory['category']): SuccessStory[] {
  const sorted = sortByPublishedAt(publishedStories)
  if (!category) return sorted
  return sorted.filter((story) => story.category === category)
}

export function getFeaturedSuccessStories(limit = 1): SuccessStory[] {
  return sortByPublishedAt(publishedStories.filter((s) => s.featured)).slice(0, limit)
}

export function getSuccessStoriesByDept(deptSlug: string): SuccessStory[] {
  return sortByPublishedAt(
    publishedStories.filter((story) => story.departments?.includes(deptSlug)),
  )
}

export function getSuccessStoriesByService(serviceSlug: string): SuccessStory[] {
  return sortByPublishedAt(
    publishedStories.filter((story) => story.services?.includes(serviceSlug)),
  )
}

export function getRelatedSuccessStories(story: SuccessStory, limit = 3): RelatedArticleItem[] {
  const related = sortByPublishedAt(
    publishedStories.filter(
      (item) => item.slug !== story.slug && item.category === story.category,
    ),
  )
  return related.slice(0, limit).map(storyToRelatedItem)
}

export function searchSiteArticles(query: string, limit = 24): ArticleSearchEntry[] {
  return searchArticles(articleSearchIndex, query, limit)
}
