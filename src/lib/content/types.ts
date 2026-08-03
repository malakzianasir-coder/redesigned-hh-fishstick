export type HeroMedia =
  | {
      type: 'image'
      src: string
      alt?: string
    }
  | {
      type: 'illustration'
      preset: string
    }

export type HeroLink = {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
}

export type HeroStat = {
  value: string
  label: string
}

export type HeroConfig = {
  id?: string
  kicker?: string
  title: string
  tagline?: string
  excerpt?: string
  variant?: 'white' | 'navy' | 'red'
  media?: HeroMedia
  stat?: HeroStat
  links?: HeroLink[]
  taglineVariant?: 'body' | 'heading'
}

export type ContentSectionData = {
  type: 'content'
  id?: string
  kicker?: string
  heading: string
  body: string[]
  image?: {
    src: string
    alt?: string
  }
  background?: 'white' | 'muted' | 'red'
}

export type BulletItem =
  | string
  | {
      text: string
      icon?: string
    }

export type BulletsSectionData = {
  type: 'bullets'
  id?: string
  kicker?: string
  heading: string
  items: BulletItem[]
  background?: 'white' | 'muted'
}

export type ServiceGroup = {
  slug?: string
  icon?: string
  heading: string
  items: string[]
  href?: string
}

export type ServiceGroupsSectionData = {
  type: 'serviceGroups'
  id?: string
  kicker?: string
  heading: string
  intro?: string
  groups: ServiceGroup[]
  background?: 'white' | 'muted'
  layout?: 'finder' | 'stack' | 'links'
  footer?: string
}

export type IconGridItem = {
  icon: string
  label: string
}

export type IconGridSectionData = {
  type: 'iconGrid'
  id?: string
  kicker?: string
  heading: string
  intro?: string[]
  items: IconGridItem[]
  background?: 'white' | 'muted'
}

export type CalloutSectionData = {
  type: 'callout'
  id?: string
  kicker?: string
  heading: string
  body: string[]
  logo?: {
    src?: string
    alt?: string
  }
  background?: 'white' | 'muted'
}

export type AccommodationRoom = {
  count: string
  label: string
  image?: {
    src: string
    alt?: string
  }
}

export type AccommodationSectionData = {
  type: 'accommodation'
  id?: string
  kicker?: string
  heading: string
  intro?: string[]
  rooms: AccommodationRoom[]
  background?: 'white' | 'muted'
}

export type ClosingBandSectionData = {
  type: 'closingBand'
  id?: string
  kicker: string
  quote: string
}

export type PatientStoriesSectionData = {
  type: 'patientStories'
  id?: string
  kicker?: string
  heading: string
  intro?: string
  departmentName?: string
  background?: 'white' | 'muted'
}

export type CtaSectionData = {
  type: 'cta'
  kicker?: string
  heading: string
  body?: string
  button: {
    label: string
    href: string
  }
}

export type Section =
  | ContentSectionData
  | BulletsSectionData
  | ServiceGroupsSectionData
  | IconGridSectionData
  | CalloutSectionData
  | AccommodationSectionData
  | ClosingBandSectionData
  | PatientStoriesSectionData
  | CtaSectionData

export type PageRecord = {
  slug: string
  title: string
  category?: string
  categorySlug?: string
  description?: string
  excerpt?: string
  hero: HeroConfig
  jumpLinks?: JumpLink[]
  sections: Section[]
}

export type DepartmentRecord = PageRecord & {
  category: string
}

export type ServiceRecord = PageRecord

export type PatientCareRecord = PageRecord

export type JumpLink = {
  label: string
  href: string
}

export type MarketingHero = {
  kicker?: string
  title: string
  excerpt?: string
  media?: {
    type: 'image' | 'placeholder'
    src?: string
    alt?: string
    icon?: string
    placeholderLabel?: string
  }
  links?: HeroLink[]
}

export type ComplianceItem = {
  label: string
  title: string
  detail: string
  logo?: string
}

export type ComplianceGroup = {
  kicker: string
  icon: string
  items: ComplianceItem[]
}

export type JourneyMilestone = {
  year: string
  title: string
  body: string[]
}

export type ValueCard = {
  icon: string
  title: string
  body: string
}

export type TeaserCard = {
  title: string
  subtitle?: string
  body: string
  href?: string
}

export type ConsultantCard = {
  name: string
  role: string
  href?: string
}

export type HealthPartnerGroup = {
  label: string
  title: string
  icon?: string
  body: string[]
  partners?: { name: string; icon?: string }[]
}

export type HeadlineStat = {
  value: number
  label: string
  size?: 'lg' | 'md'
}

export type MedicalTower = {
  chips: string[]
  body: string[]
  cta: { label: string; href: string }
  placeholderLabel?: string
}

export type EventCalendarRow = {
  date: string
  event: string
}

export type CommitteeCard = {
  icon: string
  name: string
}

export type DepartmentTeaser = {
  title: string
  body: string
  href: string
}

export type PersonCard = {
  name: string
  role: string
  body: string[]
  href?: string
  image?: string
}

export type TenureEntry = {
  years: string
  name: string
  role: string
  href?: string
  note?: string
}

export type PersonGridMember = {
  name: string
  role: string
}

export type DonorEntry = {
  sn: number
  name: string
  href?: string
  logo?: string
}

export type MessageArticle = {
  id: string
  kicker: string
  title: string
  name: string
  role: string
  organization?: string
  body: string[]
  signature?: string
  signOff?: string
  roleLine?: string
  verse?: {
    arabic: string
    translation: string
    citation: string
  }
}

export type ProfileRecord = {
  slug: string
  title: string
  description?: string
  kicker?: string
  name: string
  role: string
  organization?: string
  years?: string
  image?: string
  jumpLinks: JumpLink[]
  biography: string[]
  roles: string[]
  tribute?: {
    quote: string
    label: string
  }
}

export type OurPurposeRecord = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  vision: string
  mission: string
  journey: JourneyMilestone[]
  philosophy: {
    heading: string
    body: string
    image?: string
  }
  approach: ValueCard[]
  valuesIntro: string
  values: ValueCard[]
  valuesOutro: string
  complianceIntro: string
  compliance: ComplianceGroup[]
  foundersTeaser?: PersonCard[]
  foundersCta?: { label: string; href: string }
  leadershipMessagesTeaser?: {
    kicker: string
    title: string
    items: {
      title: string
      name: string
      role: string
      body: string[]
      href: string
      icon?: string
    }[]
  }
  consultants?: {
    kicker: string
    title: string
    lede?: string
    items: ConsultantCard[]
    cta?: { label: string; href: string }
  }
  impactTeaser?: {
    kicker: string
    title: string
    cards: TeaserCard[]
    cta?: { label: string; href: string }
  }
  departmentsTeaser?: {
    kicker: string
    title: string
    lede?: string
    items: DepartmentTeaser[]
    cta?: { label: string; href: string }
  }
}

export type LeadershipRecord = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  founders: PersonCard[]
  chairpersons: TenureEntry[]
  presidents: TenureEntry[]
  seniorManagement: PersonGridMember[]
  executiveCommittee: string[]
  executiveCommitteeLede?: string
  coreCommittees: CommitteeCard[]
}

export type LeadershipMessagesRecord = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  messages: MessageArticle[]
}

export type ServiceStatCard = {
  key: string
  label: string
  total: number
  freePercentage: number
  paidPercentage: number
}

export type OurImpactRecord = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  award?: {
    kicker: string
    title: string
    body: string[]
  }
  healthPartners?: {
    intro: string
    groups: HealthPartnerGroup[]
  }
  factsStatsLede?: string
  headlineStats?: HeadlineStat[]
  secondaryStats?: HeadlineStat[]
  partnersIntro?: string
  serviceStats: ServiceStatCard[]
  medicalTower?: MedicalTower
  eventsCalendar?: {
    lede?: string
    rows: EventCalendarRow[]
  }
  highlightsLede?: string
  highlights: {
    date: string
    title: string
    body: string
    image?: string
    href?: string
  }[]
}

export type OurSupportersRecord = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  intro: string
  donorWallHeading?: string
  donorWallLede?: string
  donors: DonorEntry[]
}

export type HomeEngageCard = {
  icon: string
  title: string
  body: string
  href: string
  cta: string
  external?: boolean
}

export type HomeBankField = {
  label: string
  value: string
  copyValue?: string
}

export type HomeBankAccount = {
  title: string
  bank: string
  logo?: string
  fields: HomeBankField[]
}

export type HomeWaysToGive = {
  kicker: string
  heading: string
  lede: string
  cta: { label: string; href: string }
  online: {
    kicker: string
    heading: string
    body: string
    amounts: { value: string; label: string }[]
    ctaLabel: string
    ctaHref: string
  }
  jazzcash: {
    kicker: string
    heading: string
    body: string
    accountTitle: string
    tillId: string
    qrNote: string
  }
  bankAccounts: HomeBankAccount[]
  otherWays: {
    icon: string
    title: string
    body: string
    href?: string
    linkLabel?: string
  }[]
  contact: {
    uan: string
    phone: string
    email: string
  }
}

export type HomeComplianceCard = {
  label: string
  title: string
  detail: string
}

export type HomeContent = {
  compliance: {
    kicker: string
    heading: string
    lede: string
    cta: { label: string; href: string }
    cards: HomeComplianceCard[]
  }
  intro: {
    kicker: string
    heading: string
    body: string
    quote: string
    cta: { label: string; href: string }
    images: { src: string; alt: string }[]
  }
  engage: {
    kicker: string
    heading: string
    lede: string
    cards: HomeEngageCard[]
  }
  services: {
    kicker: string
    heading: string
    lede: string
    cta: { label: string; href: string }
    cards: {
      href: string
      image: string
      kicker: string
      title: string
      body: string
    }[]
  }
  waysToGive: HomeWaysToGive
  founders: {
    kicker: string
    heading: string
    lede: string
    cta: { label: string; href: string }
    cards: {
      name: string
      role: string
      image: string
      body: string
      href: string
    }[]
  }
  stories: {
    kicker: string
    heading: string
    lede: string
    cta: { label: string; href: string }
    items: {
      title: string
      body: string
      image: string
      href: string
    }[]
  }
  team: {
    kicker: string
    heading: string
    lede: string
    cta: { label: string; href: string }
    doctors: { name: string; role: string; image: string }[]
  }
  news: {
    kicker: string
    heading: string
    lede: string
    cta: { label: string; href: string }
    items: {
      date: string
      title: string
      body: string
      image?: string
      href: string
    }[]
  }
  events: {
    kicker: string
    heading: string
    lede: string
    cta: { label: string; href: string }
    items: { day: string; month: string; title: string; body: string; href: string }[]
  }
  machinery: {
    kicker: string
    heading: string
    lede: string
    slides: { src: string; title: string; href: string }[]
  }
}
