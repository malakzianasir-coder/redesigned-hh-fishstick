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
  quote?: string
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
  heading?: string
  body: string | string[]
  image?: {
    src: string
    alt?: string
  }
  background?: 'white' | 'muted' | 'red'
  /** Text alignment. Default centers when no image; use `start` for long overview copy. */
  align?: 'center' | 'start'
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
  intro?: string
  items: BulletItem[]
  layout?: 'cards' | 'chips'
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
  intro?: string | string[]
  items: IconGridItem[]
  background?: 'white' | 'muted'
}

export type CalloutSectionData = {
  type: 'callout'
  id?: string
  kicker?: string
  heading: string
  body: string | string[]
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
  intro?: string | string[]
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

export type NumberedListItem = {
  title: string
  content: string
  bullets?: string[]
}

export type NumberedListSectionData = {
  type: 'numberedList'
  id?: string
  kicker?: string
  heading: string
  intro?: string
  items: NumberedListItem[]
  background?: 'white' | 'muted'
}

export type ProcessStep = {
  title: string
  items: string[]
}

export type ProcessStepsSectionData = {
  type: 'processSteps'
  id?: string
  kicker?: string
  heading: string
  intro?: string
  steps: ProcessStep[]
  background?: 'white' | 'muted'
}

export type StatItem = {
  value: string
  label: string
}

export type StatsRowSectionData = {
  type: 'stats'
  id?: string
  kicker?: string
  heading?: string
  stats: StatItem[]
  background?: 'white' | 'muted'
}

export type ImpactTableRow = {
  amount: string
  impact: string
}

export type ImpactTableSectionData = {
  type: 'impactTable'
  id?: string
  kicker?: string
  heading: string
  intro?: string
  rows: ImpactTableRow[]
  note?: string
  background?: 'white' | 'muted'
}

export type RecaptchaConfig = {
  enabled: boolean
  provider?: 'google-v2' | 'google-v3' | 'hcaptcha' | string
  siteKey?: string
}

export type FormFieldDefinition = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox'
  required?: boolean
  placeholder?: string
  width?: 'full' | 'half'
  options?: { label: string; value: string }[]
}

export type FormDefinition = {
  id: string
  title: string
  description?: string
  submitLabel: string
  successMessage: string
  fields: FormFieldDefinition[]
  recaptcha?: RecaptchaConfig
}

export type FormSubmissionDraft = {
  formId: string
  values: Record<string, string | boolean>
  recaptchaToken?: string
}

export type DynamicFormSectionData = {
  type: 'dynamicForm'
  id?: string
  kicker?: string
  heading?: string
  intro?: string
  formId: string
  background?: 'white' | 'muted'
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
  | NumberedListSectionData
  | ProcessStepsSectionData
  | StatsRowSectionData
  | ImpactTableSectionData
  | DynamicFormSectionData

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

export type PatientCareHubCard = {
  slug?: string
  title: string
  excerpt: string
  icon: string
  href: string
  linkLabel?: string
}

export type PatientCareHubGroup = {
  label: string
  id?: string
  cards: PatientCareHubCard[]
}

export type PatientCareHubRecord = {
  slug: string
  title: string
  description?: string
  hero: HeroConfig
  jumpLinks: JumpLink[]
  hub: {
    kicker: string
    heading: string
    lede: string
    groups: PatientCareHubGroup[]
  }
}

export type DonationCauseCard = {
  slug: string
  title: string
  excerpt: string
  icon: string
  href: string
  linkLabel?: string
  meta?: string
}

export type DonateHubContent = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  givingTypes: DonationCauseCard[]
  supportCauses: DonationCauseCard[]
  waysToGive: HomeWaysToGive
  receiptsNote: string
  contact: {
    uan: string
    phone: string
    email: string
  }
  zakatCalculator: {
    enabled: boolean
    heading: string
    body: string
  }
}

export type DonationCauseRecord = PageRecord & {
  kind: 'general' | 'cause'
  bankAccountKeys?: string[]
  amounts?: number[]
  zakatCalculator?: {
    enabled: boolean
    heading: string
    body: string
  }
}

export type JumpLink = {
  label: string
  href: string
}

export type MarketingHero = {
  kicker?: string
  title: string
  excerpt?: string
  /** Optional pull-quote (e.g. Qur’an verse on Ways to Give hub). */
  quote?: string
  media?: {
    type: 'image' | 'placeholder' | 'illustration'
    src?: string
    alt?: string
    icon?: string
    placeholderLabel?: string
    preset?: string
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
  image?: string
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
  editorialNote?: string
}

export type TenureEntry = {
  years: string
  name: string
  role: string
  href?: string
  image?: string
  note?: string
}

export type PersonGridMember = {
  name: string
  role: string
  image?: string
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
  image?: string
  body: string[]
  signature?: string
  signOff?: string
  roleLine?: string
  organizationLine?: string
  editorialNote?: string
  href?: string
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
  chairpersonsNote?: string
  presidents: TenureEntry[]
  presidentsNote?: string
  seniorManagement: PersonGridMember[]
  seniorManagementNote?: string
  executiveCommittee: string[]
  executiveCommitteeLede?: string
  coreCommittees: CommitteeCard[]
  coreCommitteesNote?: string
}

export type LeadershipMessagesRecord = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  messages: MessageArticle[]
}

export type SingleMessagePageRecord = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  jumpLinks: JumpLink[]
  message: MessageArticle
  otherMessage?: {
    title: string
    name: string
    role: string
    href: string
  }
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
    image?: string
    imageAlt?: string
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
  key?: string
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

export type HowToDonateBankField = {
  label: string
  value: string
  copyValue?: string
}

export type HowToDonateBankAccount = {
  title: string
  bank: string
  logo?: string
  fields: HowToDonateBankField[]
}

export type HowToDonateMethod = {
  slug: string
  navLabel: string
  title: string
  icon: string
  excerpt: string
  hero: MarketingHero
  body?: string[]
  intro?: string
  cta?: { label: string; href: string }
  wallet?: {
    provider: string
    accountTitle: string
    tillId: string
    qrNote: string
  }
  bankAccounts?: HowToDonateBankAccount[]
  categoriesHeading?: string
  categories?: { title: string; body: string }[]
  qr?: {
    heading: string
    body: string
    placeholderNote: string
  }
  payableTo?: string
  addressLines?: string[]
  footer?: string
  itemsIntro?: string
  items?: string[]
  arrange?: string
  closing?: string
}

export type HowToDonateContent = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  receipts: {
    heading: string
    body: string
  }
  assistance: {
    heading: string
    body: string
    uan: string
    phone: string
    email: string
  }
  methods: HowToDonateMethod[]
}

export type WhatYouCanSupportOption = {
  title: string
  body: string
}

export type WhatYouCanSupportCause = {
  slug: string
  navLabel: string
  title: string
  icon: string
  excerpt: string
  tagline: string
  hero: MarketingHero
  body: string[]
  listHeading?: string
  items?: string[]
  optionItems?: WhatYouCanSupportOption[]
  impactTable?: {
    heading: string
    intro: string
    rows: { amount: string; impact: string }[]
    note?: string
  }
  closing: string[]
}

export type WhatYouCanSupportContent = {
  slug: string
  title: string
  description?: string
  hero: MarketingHero
  causes: WhatYouCanSupportCause[]
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

export type DoctorTag = 'visiting' | 'head-of-department' | 'fmh-faculty' | 'photo-needed'

export type DoctorRecord = {
  slug: string
  name: string
  specialty: string
  department: string
  tags: DoctorTag[]
  image: string | null
  bio?: string
  qualifications?: string[]
  experienceYears?: number
  clinicHours?: string
  languages?: string[]
  services?: string[]
}

export type DoctorsHubContent = {
  kicker: string
  heading: string
  lede: string
  doctors: DoctorRecord[]
}

export type SiteSettings = {
  newsletter: {
    enabled: boolean
    label: string
    placeholder: string
    buttonLabel: string
    successMessage: string
    errorMessage: string
    source: string
  }
  forms: {
    recaptcha: RecaptchaConfig
  }
  lenis: {
    enabled: boolean
    duration: number
    lerp: number
    smoothWheel: boolean
    syncTouch: boolean
    anchors: boolean
  }
}

export type FormsContent = {
  forms: FormDefinition[]
}

export type LandingPageMockup = {
  slug: string
  title: string
  _status: 'published' | 'draft'
  publishedAt: string
  headerVariant: 'minimal'
  footerVariant: 'minimal'
  meta?: ArticleMeta
  hero: {
    kicker?: string
    heading: string
    body?: string
    primaryCta?: { label: string; href: string }
    secondaryCta?: { label: string; href: string }
  }
  sections: { heading: string; body: string }[]
  ctaBand?: CtaSectionData
}

export type LandingPagesContent = {
  pages: LandingPageMockup[]
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 3 | 4; text: string }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'quote'; text: string }

export type LabTestAlias = {
  name: string
}

export type LabTestIncludedItem = {
  name: string
}

export type LabTestRecord = {
  slug: string
  name: string
  category: string
  reportingTime: string
  specimen: string
  isOutsourced?: boolean
  alsoKnownAs?: LabTestAlias[]
  description?: ContentBlock[]
  preparation?: ContentBlock[]
  includedTests?: LabTestIncludedItem[]
  sampleInstructions?: string
  reportDelivery?: string
  availability?: string
}

export type LabTestsHubContent = {
  kicker: string
  heading: string
  lede: string
  categories: string[]
  tests: LabTestRecord[]
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level?: 2 | 3 | 4; text: string }
  | { type: 'image'; src: string; alt?: string; caption?: string }
  | { type: 'quote'; text: string; attribution?: string }

export type ArticleMeta = {
  title?: string
  description?: string
  image?: string
}

export type ArticleAuthor = {
  name: string
  slug?: string
}

export type NewsArticle = {
  slug: string
  title: string
  tagLine?: string
  shortDescription?: string
  heroImage?: string
  content: ArticleBlock[]
  categories: string[]
  tags: string[]
  author?: ArticleAuthor
  featured?: boolean
  _status: 'published' | 'draft'
  publishedAt: string
  meta?: ArticleMeta
}

export type NewsHubContent = {
  kicker: string
  heading: string
  lede: string
}

export type HospitalEvent = {
  slug: string
  title: string
  tagLine?: string
  shortDescription?: string
  heroImage?: string
  content: ArticleBlock[]
  categories: string[]
  tags?: string[]
  eventType: string
  eventDate: string
  eventTime?: string
  eventVenue?: string
  eventEntry?: string
  featured?: boolean
  _status: 'published' | 'draft'
  publishedAt: string
  meta?: ArticleMeta
}

export type HolidayEntry = {
  date: string
  title: string
  type: 'Public Holiday' | 'Celebration' | 'National Day' | string
  description?: string
}

export type EventsHubContent = {
  kicker: string
  heading: string
  lede: string
}

export type SuccessStoryCategory =
  | 'successful-surgeries'
  | 'life-saving-treatments'
  | 'dialysis-recovery'

export type SuccessStory = {
  slug: string
  title: string
  heading: string
  subHeading?: string
  category: SuccessStoryCategory
  format: 'video' | 'article'
  videoUrl?: string
  articleContent?: ArticleBlock[]
  thumbnail?: string
  publishedDate: string
  featured?: boolean
  departments?: string[]
  services?: string[]
  _status: 'published' | 'draft'
  publishedAt: string
  meta?: ArticleMeta
}

export type SuccessStoriesHubContent = {
  kicker: string
  heading: string
  lede: string
}

export type PaginatedResult<T> = {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export type RelatedArticleItem = {
  slug: string
  title: string
  excerpt: string
  href: string
  image?: string
  date?: string
  category?: string
  variant: 'news' | 'event' | 'story'
}

export type ArticleSearchEntry = {
  slug: string
  title: string
  excerpt: string
  href: string
  type: 'news' | 'event' | 'story'
  image?: string
  date?: string
  categories?: string[]
}
