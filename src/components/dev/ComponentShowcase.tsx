import React from 'react'
import Link from 'next/link'

import { ArticleHero } from '@/components/articles/ArticleHero'
import { CategoryHubGrid, type HubCardItem, type HubFilterCategory } from '@/components/hub/CategoryHubGrid'
import { DoctorsHubGrid } from '@/components/hub/DoctorsHubGrid'
import { LabTestsTable } from '@/components/hub/LabTestsTable'
import { AccommodationSection } from '@/components/sections/AccommodationSection'
import { BulletsSection } from '@/components/sections/BulletsSection'
import { CalloutSection } from '@/components/sections/CalloutSection'
import { ClosingBandSection } from '@/components/sections/ClosingBandSection'
import { ContentSection } from '@/components/sections/ContentSection'
import { DynamicFormSection } from '@/components/sections/DynamicFormSection'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import { IconGridSection } from '@/components/sections/IconGridSection'
import { ImpactTableSection } from '@/components/sections/ImpactTableSection'
import { NumberedListSection } from '@/components/sections/NumberedListSection'
import { PatientStoriesSection } from '@/components/sections/PatientStoriesSection'
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection'
import { ServiceGroupsSection } from '@/components/sections/ServiceGroupsSection'
import { StatsRowSection } from '@/components/sections/StatsRowSection'
import { MediumHero } from '@/components/heros/MediumHero'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { DetailPageTemplate } from '@/components/templates/DetailPageTemplate'
import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate'
import type {
  ContentSectionData,
  BulletsSectionData,
  ServiceGroupsSectionData,
  IconGridSectionData,
  CalloutSectionData,
  AccommodationSectionData,
  ClosingBandSectionData,
  PatientStoriesSectionData,
  CtaSectionData,
  NumberedListSectionData,
  ProcessStepsSectionData,
  StatsRowSectionData,
  ImpactTableSectionData,
  DynamicFormSectionData,
  HeroConfig,
  MarketingHero,
  JumpLink,
  DoctorRecord,
  LabTestRecord,
  PageRecord,
} from '@/lib/content/types'

/* ------------------------------------------------------------------ */
/* Helper components for labeling                                      */
/* ------------------------------------------------------------------ */

function ShowcaseLabel({
  title,
  usedBy,
  warning,
}: {
  title: string
  usedBy: string
  warning?: string
}) {
  return (
    <div className="border-b-2 border-primary-red/30 bg-whitebg px-6 py-4">
      <div className="container mx-auto flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-b16 font-bold text-primary-blue">{title}</code>
          {warning ? (
            <span className="rounded-full bg-warning/15 px-3 py-0.5 text-b12 font-bold text-warning">
              ⚠ {warning}
            </span>
          ) : null}
        </div>
        <p className="text-b12 text-dark-gray">
          <span className="font-semibold">Used by:</span> {usedBy}
        </p>
      </div>
    </div>
  )
}

function ShowcaseSection({
  id,
  label,
  usedBy,
  warning,
  children,
}: {
  id: string
  label: string
  usedBy: string
  warning?: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="border-b border-dark-gray/15">
      <ShowcaseLabel title={label} usedBy={usedBy} warning={warning} />
      <div>{children}</div>
    </div>
  )
}

function ShowcaseIntro() {
  return (
    <section className="bg-primary-blue text-white">
      <div className="container mx-auto px-6 py-[60px] lg:px-[30px] lg:py-[80px]">
        <div className="flex flex-col gap-4">
          <p className="kicker text-white/70">Dev Reference</p>
          <h1 className="text-h1M font-bold tracking-display lg:text-h1">
            Component Showcase
          </h1>
          <p className="max-w-3xl text-b18 text-white/85">
            A living reference page rendering every component variant with mock data.
            Inconsistencies are flagged with ⚠ warnings. Use this page to verify
            visual consistency before wiring pages to Payload CMS.
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {[
              { href: '#breadcrumbs', label: 'Breadcrumbs' },
              { href: '#heroes', label: 'Heroes' },
              { href: '#jumpnav', label: 'JumpNav' },
              { href: '#ctas', label: 'Bottom CTAs' },
              { href: '#hub-grids', label: 'Hub Grids' },
              { href: '#detail-sections', label: 'Detail Sections' },
              { href: '#templates', label: 'Templates' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/25 px-4 py-2 text-b14 font-semibold text-white transition-colors hover:bg-white hover:text-primary-blue"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */

const mockHeroWhite: HeroConfig = {
  id: 'hero-medium-white',
  kicker: 'Service Detail',
  title: 'Inpatient Department',
  tagline: 'Comprehensive 24/7 inpatient care',
  excerpt:
    'Hijaz Hospital provides comprehensive inpatient care with 25–35 daily admissions across general wards, private rooms, and ICU.',
  variant: 'white',
  links: [
    { label: 'View departments', href: '/departments', variant: 'primary' },
    { label: 'Contact us', href: '/contact', variant: 'ghost' },
  ],
}

const mockHeroNavy: HeroConfig = {
  id: 'hero-medium-navy',
  kicker: 'Patient Welfare',
  title: 'Financial Support Programs',
  tagline: 'Care within reach for every patient',
  excerpt:
    'Our welfare programs ensure that financial hardship never stands in the way of treatment.',
  variant: 'navy',
  links: [{ label: 'Donate now', href: '/donate', variant: 'primary' }],
}

const mockMarketingHero: MarketingHero = {
  kicker: 'About Us',
  title: 'Our Purpose',
  excerpt:
    'Hijaz Hospital Trust has served the community since 1979, providing free and subsidized healthcare to deserving patients.',
  media: {
    type: 'placeholder',
    placeholderLabel: 'Hospital campus photo',
  },
  links: [
    { label: 'Read our story', href: '/our-purpose', variant: 'primary' },
    { label: 'Meet our leaders', href: '/leadership', variant: 'ghost' },
  ],
}

const mockJumpLinks: JumpLink[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-choose' },
  { label: 'Patient Stories', href: '#stories' },
  { label: 'All Departments', href: '/departments' },
]

/* ------------------------------------------------------------------ */
/* Detail section mock data                                            */
/* ------------------------------------------------------------------ */

const mockContentSection: ContentSectionData = {
  type: 'content',
  id: 'overview',
  kicker: 'Overview',
  heading: 'About this service',
  body: [
    'Hijaz Hospital provides comprehensive inpatient care with 25–35 daily admissions across general wards, private rooms, and ICU facilities.',
    'Our dedicated team of consultants, nurses, and support staff ensure compassionate, patient-centered care 24 hours a day, 7 days a week.',
  ],
  background: 'white',
}

const mockBulletsSection: BulletsSectionData = {
  type: 'bullets',
  id: 'bullets-cards',
  kicker: 'What we offer',
  heading: 'Service highlights',
  intro: 'Key features of our inpatient department.',
  items: [
    { text: '24/7 emergency admission', icon: 'first-aid-kit' },
    { text: 'General, semi-private, and private rooms', icon: 'bed' },
    { text: 'Dedicated nursing staff', icon: 'nurse' },
    { text: 'Daily consultant rounds', icon: 'stethoscope' },
    { text: 'In-house pharmacy', icon: 'pharmacy' },
    { text: 'Free meals for patients', icon: 'food' },
  ],
  layout: 'cards',
  background: 'muted',
}

const mockBulletsChipsSection: BulletsSectionData = {
  type: 'bullets',
  id: 'bullets-chips',
  kicker: 'Conditions treated',
  heading: 'Common conditions (chip layout)',
  items: [
    'Hypertension',
    'Diabetes',
    'Respiratory infections',
    'Gastroenteritis',
    'Cardiac conditions',
    'Post-operative recovery',
  ],
  layout: 'chips',
  background: 'white',
}

const mockServiceGroupsSection: ServiceGroupsSectionData = {
  type: 'serviceGroups',
  id: 'service-groups',
  kicker: 'Procedures',
  heading: 'Services & Procedures',
  intro: 'Common procedures performed in this department.',
  groups: [
    {
      slug: 'minor',
      heading: 'Minor Procedures',
      items: ['Wound suturing', 'Incision & drainage', 'Fracture reduction', 'Biopsy'],
    },
    {
      slug: 'major',
      heading: 'Major Procedures',
      items: ['Appendectomy', 'Hernia repair', 'Gallbladder surgery', 'Thyroid surgery'],
    },
  ],
  layout: 'stack',
  background: 'white',
}

const mockIconGridSection: IconGridSectionData = {
  type: 'iconGrid',
  id: 'icon-grid',
  kicker: 'Facilities',
  heading: 'Our Facilities',
  intro: 'Supporting infrastructure available in this department.',
  items: [
    { icon: 'first-aid-kit', label: 'Emergency' },
    { icon: 'bed', label: 'Inpatient' },
    { icon: 'nurse', label: 'Nursing' },
    { icon: 'pharmacy', label: 'Pharmacy' },
    { icon: 'lab', label: 'Laboratory' },
    { icon: 'x-ray', label: 'Radiology' },
  ],
  background: 'muted',
}

const mockCalloutSection: CalloutSectionData = {
  type: 'callout',
  id: 'callout',
  kicker: 'External Lab',
  heading: 'Reference Laboratory Partnership',
  body: 'Specialized tests (Histopathology, PCR) are processed through our partner reference laboratories to ensure accurate, timely results.',
  background: 'white',
}

const mockAccommodationSection: AccommodationSectionData = {
  type: 'accommodation',
  id: 'accommodation',
  kicker: 'Accommodation',
  heading: 'Room Options',
  intro: 'We offer a range of accommodation options to suit patient needs and preferences.',
  rooms: [
    { count: '40', label: 'General Wards' },
    { count: '12', label: 'Semi-Private Rooms' },
    { count: '8', label: 'Private Rooms' },
    { count: '6', label: 'ICU Beds' },
  ],
  background: 'muted',
}

const mockClosingBandSection: ClosingBandSectionData = {
  type: 'closingBand',
  id: 'closing-band',
  kicker: 'Our Promise',
  quote: 'Compassionate care for all — regardless of ability to pay.',
}

const mockPatientStoriesSection: PatientStoriesSectionData = {
  type: 'patientStories',
  id: 'patient-stories',
  kicker: 'Patient Stories',
  heading: 'Recovery Stories',
  intro: 'Real stories from patients treated in this department.',
  departmentName: 'Inpatient Department',
  background: 'white',
}

const mockCtaSection: CtaSectionData = {
  type: 'cta',
  kicker: 'Support Our Mission',
  heading: 'Help Us Keep Care Within Reach for Every Patient',
  body: 'Your donation supports free treatment, medicines, and welfare programs for deserving patients.',
  button: { label: 'Donate Now', href: '/donate' },
}

const mockNumberedListSection: NumberedListSectionData = {
  type: 'numberedList',
  id: 'numbered-list',
  kicker: 'Patient Rights',
  heading: 'Your Rights as a Patient',
  intro: 'We are committed to upholding these rights for every patient who walks through our doors.',
  items: [
    {
      title: 'Right to respectful care',
      content: 'Receive considerate and respectful care without discrimination.',
    },
    {
      title: 'Right to information',
      content: 'Receive complete, understandable information about your diagnosis and treatment.',
      bullets: ['Diagnosis details', 'Treatment options', 'Expected outcomes'],
    },
    {
      title: 'Right to privacy',
      content: 'Have your medical records and communications kept confidential.',
    },
    {
      title: 'Right to refuse treatment',
      content: 'Refuse treatment to the extent permitted by law and be informed of the consequences.',
    },
  ],
  background: 'muted',
}

const mockProcessStepsSection: ProcessStepsSectionData = {
  type: 'processSteps',
  id: 'process-steps',
  kicker: 'Admission Process',
  heading: 'How to Get Admitted',
  intro: 'Follow these steps to access our financial support programs.',
  steps: [
    {
      title: 'Visit the hospital',
      items: ['Bring your CNIC', 'Bring previous medical records if available'],
    },
    {
      title: 'Meet the welfare officer',
      items: ['Complete the welfare application form', 'Provide income documentation'],
    },
    {
      title: 'Get approval',
      items: ['Application reviewed within 24 hours', 'Receive welfare approval letter'],
    },
  ],
  background: 'white',
}

const mockStatsRowSection: StatsRowSectionData = {
  type: 'stats',
  id: 'stats-row',
  kicker: 'By the Numbers',
  heading: 'Department Statistics',
  stats: [
    { value: '30+', label: 'Daily admissions' },
    { value: '50+', label: 'Nursing staff' },
    { value: '24/7', label: 'Emergency care' },
  ],
  background: 'muted',
}

const mockImpactTableSection: ImpactTableSectionData = {
  type: 'impactTable',
  id: 'impact-table',
  kicker: 'Your Impact',
  heading: 'What Your Donation Provides',
  intro: 'See how different donation amounts directly support patient care.',
  rows: [
    { amount: 'Rs. 500', impact: 'Provides a meal for 5 patients' },
    { amount: 'Rs. 1,500', impact: 'Covers one day of ICU care for a patient' },
    { amount: 'Rs. 3,500', impact: 'Funds a complete blood panel for 3 patients' },
    { amount: 'Rs. 15,000', impact: 'Sponsors a minor surgery for a deserving patient' },
  ],
  note: 'All amounts are approximate and based on 2025 costs.',
  background: 'white',
}

const mockDynamicFormSectionData: DynamicFormSectionData = {
  type: 'dynamicForm',
  id: 'contact-form',
  kicker: 'Get in Touch',
  heading: 'Send Us a Message',
  intro: 'Fill out the form below and our team will get back to you.',
  formId: 'general-contact',
  background: 'white',
}

/* ------------------------------------------------------------------ */
/* Hub grid mock data                                                  */
/* ------------------------------------------------------------------ */

const mockServiceHubFilters: HubFilterCategory[] = [
  { slug: 'all', label: 'All' },
  { slug: 'facilities', label: 'Hospital Facilities' },
  { slug: 'clinical', label: 'Clinical Support' },
]

const mockServiceHubCards: HubCardItem[] = [
  {
    id: 'ipd',
    title: 'Inpatient Department',
    excerpt: 'Comprehensive 24/7 inpatient care across general wards, private rooms, and ICU.',
    categoryLabel: 'Hospital Facilities',
    categorySlug: 'facilities',
    href: '/services/ipd',
    icon: 'ipd',
    linkLabel: 'View service',
  },
  {
    id: 'opd',
    title: 'Outpatient Department',
    excerpt: '40+ daily outpatient consultations across all specialties.',
    categoryLabel: 'Hospital Facilities',
    categorySlug: 'facilities',
    href: '/services/opd',
    icon: 'opd',
    linkLabel: 'View service',
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    excerpt: 'Free and subsidized medicines for deserving patients.',
    categoryLabel: 'Clinical Support',
    categorySlug: 'clinical',
    href: '/services/pharmacy',
    icon: 'pharmacy',
    linkLabel: 'View service',
  },
]

const mockDeptHubFilters: HubFilterCategory[] = [
  { slug: 'all', label: 'All' },
  { slug: 'clinical', label: 'Clinical Departments' },
  { slug: 'support', label: 'Diagnostic & Support' },
]

const mockDeptHubCards: HubCardItem[] = [
  {
    id: 'cardiology',
    title: 'Cardiology Department',
    excerpt: 'Comprehensive cardiac care including ECG, Echocardiography, and ETT.',
    categoryLabel: 'Clinical Departments',
    categorySlug: 'clinical',
    href: '/departments/cardiology',
    icon: 'heart-pulse',
    linkLabel: 'View department',
  },
  {
    id: 'radiology',
    title: 'Radiology & Imaging',
    excerpt: '24/7 diagnostic imaging including Digital X-Ray, Ultrasound, and CT Scan.',
    categoryLabel: 'Diagnostic & Support',
    categorySlug: 'support',
    href: '/departments/radiology',
    icon: 'x-ray',
    linkLabel: 'View department',
  },
]

const mockDoctors: DoctorRecord[] = [
  {
    slug: 'dr-ahmed-khan',
    name: 'Dr. Ahmed Khan',
    specialty: 'Cardiology',
    department: 'Cardiology Department',
    tags: ['head-of-department'],
    image: null,
    bio: 'Senior Consultant Cardiologist with over 15 years of experience in clinical and interventional cardiology.',
    qualifications: ['MBBS', 'FCPS (Cardiology)'],
    experienceYears: 15,
    clinicHours: 'Mon, Wed, Fri (9:00 AM – 1:00 PM)',
    languages: ['English', 'Urdu'],
  },
  {
    slug: 'dr-fatima-ali',
    name: 'Dr. Fatima Ali',
    specialty: 'Pediatrics',
    department: 'Pediatric Department',
    tags: ['visiting'],
    image: null,
    bio: 'Visiting Consultant Pediatrician specializing in neonatal care and general child health.',
    qualifications: ['MBBS', 'MRCPCH (UK)'],
    experienceYears: 10,
    clinicHours: 'Tue, Thu (2:00 PM – 5:00 PM)',
    languages: ['English', 'Urdu', 'Punjabi'],
  },
]

const mockLabCategories: string[] = ['Hematology', 'Biochemistry', 'Microbiology']

const mockLabTests: LabTestRecord[] = [
  {
    slug: 'cbc',
    name: 'Complete Blood Count (CBC)',
    category: 'Hematology',
    reportingTime: 'Same Day (4 Hours)',
    specimen: 'Blood (EDTA)',
    isOutsourced: false,
    alsoKnownAs: [{ name: 'Blood CP' }, { name: 'Full Blood Count' }],
    sampleInstructions: 'Fasting not required.',
    reportDelivery: 'Available online and physical pickup.',
    availability: '24/7',
  },
  {
    slug: 'lft',
    name: 'Liver Function Tests (LFT)',
    category: 'Biochemistry',
    reportingTime: 'Same Day (6 Hours)',
    specimen: 'Blood (Serum)',
    isOutsourced: false,
    alsoKnownAs: [{ name: 'Hepatic Panel' }],
    sampleInstructions: '10–12 hours fasting required.',
    reportDelivery: 'Available online and physical pickup.',
    availability: 'Mon – Sat (8:00 AM – 8:00 PM)',
  },
]

/* ------------------------------------------------------------------ */
/* Full Page Template Mock Data                                        */
/* ------------------------------------------------------------------ */

const mockDetailPageRecord: PageRecord = {
  slug: 'inpatient-department',
  title: 'Inpatient Department (IPD)',
  category: 'Hospital Services',
  description: 'Comprehensive 24/7 inpatient care across general wards, private rooms, and ICU.',
  hero: mockHeroWhite,
  jumpLinks: mockJumpLinks,
  sections: [
    mockContentSection,
    mockBulletsSection,
    mockStatsRowSection,
    mockCtaSection,
  ],
}

const mockArticleNewsData = {
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'News', href: '/news' },
    { label: 'New Cardiac Diagnostics Unit' },
  ],
  variant: 'news' as const,
  title: 'Hijaz Hospital Launches New Cardiac Diagnostics Unit',
  tagLine: 'Hospital News',
  subtitle: 'The new unit provides ECG, echocardiography, and stress testing for deserving patients.',
  author: 'Hijaz Hospital',
  date: 'Jan 15, 2025',
  body: [
    {
      type: 'paragraph' as const,
      text: 'Hijaz Hospital has officially opened its upgraded Cardiac Diagnostics Unit to serve the community with modern diagnostic facilities.',
    },
    {
      type: 'heading' as const,
      level: 3 as const,
      text: 'State-of-the-Art Equipment',
    },
    {
      type: 'paragraph' as const,
      text: 'The facility is equipped with high-precision echocardiography machines and 24-hour Holter monitoring systems.',
    },
  ],
  related: [
    {
      slug: 'free-medical-camp',
      title: 'Free Health Camp Organised at Campus',
      excerpt: 'Over 500 patients received free consultations and medicines.',
      href: '/events/free-medical-camp',
      date: 'Feb 20, 2025',
      category: 'Community Event',
      variant: 'event' as const,
    },
  ],
  relatedHeading: 'Related News & Updates',
}

/* ------------------------------------------------------------------ */
/* Main showcase component                                             */
/* ------------------------------------------------------------------ */

export function ComponentShowcase() {
  return (
    <article className="bg-white">
      <ShowcaseIntro />

      {/* ========================================================= */}
      {/* BREADCRUMBS                                                */}
      {/* ========================================================= */}
      <ShowcaseSection
        id="breadcrumbs"
        label="MarketingBreadcrumb"
        usedBy="All interior hubs and subpages (content hubs, catalogue hubs, marketing, donate, articles, details)"
        warning="3 detail pages still use inline markup instead of this component"
      >
        <div className="py-8">
          <p className="container mx-auto mb-4 px-6 text-b14 font-semibold text-dark-gray lg:px-[30px]">
            Variant 1 — 3 levels (marketing page):
          </p>
          <MarketingBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about-us' },
              { label: 'Our Purpose' },
            ]}
          />
          <p className="container mx-auto mb-4 mt-8 px-6 text-b14 font-semibold text-dark-gray lg:px-[30px]">
            Variant 2 — 2 levels (hub page):
          </p>
          <MarketingBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services' },
            ]}
          />
          <p className="container mx-auto mb-4 mt-8 px-6 text-b14 font-semibold text-dark-gray lg:px-[30px]">
            Variant 3 — lengthy trail (defaults to the end, pinned edge fades, scrollable):
          </p>
          <MarketingBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about-us' },
              { label: 'Leadership & Governance', href: '/leadership' },
              { label: 'Messages', href: '/leadership/messages' },
              { label: 'Chairman’s Message', href: '/leadership/messages/chairman' },
              { label: 'Haji Inam Elahi Asar — Founder & Honorary Project Director' },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* Inline breadcrumb pattern (duplicated) */}
      <ShowcaseSection
        id="breadcrumb-inline"
        label="Inline Breadcrumb Markup (DUPLICATED PATTERN)"
        usedBy="services/[slug], departments/[slug], patient-welfare/[slug]"
        warning="Should be replaced with MarketingBreadcrumb component"
      >
        <div className="py-8">
          <nav aria-label="Breadcrumb" className="bg-white border-b border-dark-gray/15">
            <div className="container mx-auto px-6 lg:px-[30px] py-2">
              <ol className="flex flex-wrap items-center gap-2 text-b12 leading-[150%] text-dark-gray">
                <li>
                  <Link href="/" className="text-primary-blue hover:text-primary-red transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-dark-gray/40">/</li>
                <li>
                  <Link
                    href="/services"
                    className="text-primary-blue hover:text-primary-red transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li className="text-dark-gray/40">/</li>
                <li aria-current="page" className="font-semibold text-primary-blue">
                  Inpatient Department
                </li>
              </ol>
            </div>
          </nav>
        </div>
      </ShowcaseSection>

      {/* ========================================================= */}
      {/* HEROES                                                     */}
      {/* ========================================================= */}
      <ShowcaseSection
        id="heroes"
        label="MediumHero (white variant)"
        usedBy="DetailPageTemplate (services, departments, patient-welfare, donations), DonatePage, PatientCareHubContent"
      >
        <MediumHero hero={mockHeroWhite} underHeader />
      </ShowcaseSection>

      <ShowcaseSection
        id="hero-medium-navy"
        label="MediumHero (navy variant)"
        usedBy="DetailPageTemplate (dark variant), DonatePage"
      >
        <MediumHero hero={mockHeroNavy} underHeader />
      </ShowcaseSection>

      <ShowcaseSection
        id="hero-marketing"
        label="MarketingHeroSection"
        usedBy="OurPurposeContent, OurImpactContent, LeadershipContent, OurSupportersContent, LeadershipMessagesContent, SingleMessageContent"
        warning="Different API from MediumHero — uses MarketingHero type instead of HeroConfig"
      >
        <MarketingHeroSection hero={mockMarketingHero} />
      </ShowcaseSection>

      <ShowcaseSection
        id="hero-article-news"
        label="ArticleHero (news variant)"
        usedBy="ArticlePageTemplate → news/[slug], events/[slug], success-stories/[slug]"
        warning="Third hero variant — different API from MediumHero and MarketingHeroSection"
      >
        <ArticleHero
          variant="news"
          title="Hijaz Hospital Launches New Cardiac Diagnostics Unit"
          tagLine="Hospital News"
          subtitle="The new unit provides ECG, echocardiography, and stress testing for deserving patients."
          author="Hijaz Hospital"
          date="Jan 15, 2025"
        />
      </ShowcaseSection>

      <ShowcaseSection
        id="hero-article-event"
        label="ArticleHero (event variant)"
        usedBy="ArticlePageTemplate → events/[slug]"
      >
        <ArticleHero
          variant="event"
          title="Free Medical Camp at Hijaz Hospital"
          tagLine="Community Event"
          subtitle="Join us for a free health screening camp open to all community members."
          date="Feb 20, 2025"
          eventType="Health Camp"
          eventDate="Feb 20, 2025"
          eventTime="9:00 AM – 2:00 PM"
          eventVenue="Hijaz Hospital Campus"
          eventEntry="Free entry"
        />
      </ShowcaseSection>

      <ShowcaseSection
        id="hero-article-story"
        label="ArticleHero (story variant)"
        usedBy="ArticlePageTemplate → success-stories/[slug]"
      >
        <ArticleHero
          variant="story"
          title="A New Lease on Life: Muhammad's Story"
          tagLine="Patient Story"
          subtitle="After a successful surgery, Muhammad can now work and support his family again."
          date="Jan 10, 2025"
          categoryLabel="Successful Surgeries"
        />
      </ShowcaseSection>

      <ShowcaseSection
        id="hero-profile-inline"
        label="ProfileContent Custom Inline Hero (CUSTOM INLINE)"
        usedBy="ProfileContent → /leadership/inam-elahi-asar"
        warning="Should be replaced with MediumHero for consistency"
      >
        <section className="bg-white">
          <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="card flex flex-col items-center gap-4 p-6">
                  <div className="photo-slot-lg">Portrait photograph placeholder</div>
                  <p className="field-label-text">Founder · Hijaz Hospital</p>
                </div>
              </div>
              <div className="flex flex-col gap-[6px] text-center lg:col-span-8 lg:text-start">
                <p className="kicker">Founder & Honorary Project Director</p>
                <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">
                  Inam Elahi Asar
                </h1>
                <span className="group-badge inline-flex self-center lg:self-start">
                  1979 – Present
                </span>
                <p className="mt-2 text-b18 font-semibold text-primary-blue">
                  Founder & Honorary Project Director
                </p>
              </div>
            </div>
          </div>
        </section>
      </ShowcaseSection>

      <ShowcaseSection
        id="hero-thankyou-inline"
        label="ThankYou Page Custom Inline Hero (CUSTOM INLINE)"
        usedBy="/thank-you"
        warning="Should be replaced with MediumHero for consistency"
      >
        <section className="bg-white">
          <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-[6px] text-center lg:col-span-6 lg:text-start">
                <p className="kicker">Thank You</p>
                <h1 className="text-h1M font-bold leading-[110%] tracking-display text-primary-blue lg:text-h1">
                  Your Generosity Saves Lives
                </h1>
                <p className="mt-2 max-w-xl text-b16 leading-[150%] text-primary-blue/85 lg:mx-0 mx-auto">
                  Thank you for supporting Hijaz Hospital Trust.
                </p>
              </div>
              <div className="lg:col-span-6">
                <div className="mx-auto aspect-square w-full max-w-[320px] lg:max-h-[320px] bg-whitebg rounded-xl flex items-center justify-center text-dark-gray">
                  Illustration placeholder
                </div>
              </div>
            </div>
          </div>
        </section>
      </ShowcaseSection>

      {/* ========================================================= */}
      {/* JUMP NAV                                                   */}
      {/* ========================================================= */}
      <ShowcaseSection
        id="jumpnav"
        label="JumpNav"
        usedBy="Content-full pages (Our Purpose, Leadership, departments, services, welfare, donate causes). Sibling donate navs use the same ChipRail."
      >
        <div className="py-4">
          <JumpNav links={mockJumpLinks} />
        </div>
      </ShowcaseSection>

      {/* ========================================================= */}
      {/* BOTTOM CTAs                                                */}
      {/* ========================================================= */}
      <ShowcaseSection
        id="ctas"
        label="MarketingSupportCTA"
        usedBy="Marketing pages (OurPurpose, OurImpact, Leadership, Supporters, Messages), PatientCareHubContent, DonatePage"
        warning="6 hub pages (Services, Departments, Doctors, Events, News, Success Stories) are missing a bottom CTA"
      >
        <MarketingSupportCTA />
      </ShowcaseSection>

      <ShowcaseSection
        id="cta-global"
        label="GlobalCtaSection"
        usedBy="DetailPageTemplate, ArticlePageTemplate, DoctorProfilePage, Lab Tests page"
        warning="Nearly identical to MarketingSupportCTA — two CTA components with same visual output"
      >
        <GlobalCtaSection section={mockCtaSection} />
      </ShowcaseSection>

      {/* ========================================================= */}
      {/* HUB GRIDS                                                  */}
      {/* ========================================================= */}
      <ShowcaseSection
        id="hub-grids"
        label="CategoryHubGrid (Services style)"
        usedBy="ServicesHubContent"
      >
        <CategoryHubGrid
          kicker="Patient Care & Facilities"
          heading="Hospital Services"
          lede="From inpatient care to diagnostics and emergency services — comprehensive support for every stage of your healthcare journey."
          filters={mockServiceHubFilters}
          cards={mockServiceHubCards}
        />
      </ShowcaseSection>

      <ShowcaseSection
        id="hub-grid-departments"
        label="CategoryHubGrid (Departments style)"
        usedBy="DepartmentsHubContent"
      >
        <CategoryHubGrid
          kicker="Specialized Care"
          heading="Clinical Departments"
          lede="Our medical and clinical departments provide specialized care powered by experienced consultants and modern diagnostics."
          filters={mockDeptHubFilters}
          cards={mockDeptHubCards}
        />
      </ShowcaseSection>

      <ShowcaseSection
        id="hub-grid-doctors"
        label="DoctorsHubGrid"
        usedBy="DoctorsHubContent → /doctors"
      >
        <DoctorsHubGrid
          kicker="Our Medical Team"
          heading="Find a Specialist"
          lede="Search our team of qualified consultants and visiting specialists by name or department."
          doctors={mockDoctors}
        />
      </ShowcaseSection>

      <ShowcaseSection
        id="hub-grid-lab-tests"
        label="LabTestsTable"
        usedBy="LabTestsHubContent → /lab-tests"
      >
        <LabTestsTable
          kicker="Diagnostics & Pathology"
          heading="Lab Tests Directory"
          lede="Search for diagnostic tests, specimen requirements, and turnaround times."
          categories={mockLabCategories}
          tests={mockLabTests}
        />
      </ShowcaseSection>

      {/* ========================================================= */}
      {/* DETAIL PAGE SECTIONS                                       */}
      {/* ========================================================= */}
      <ShowcaseSection
        id="detail-sections"
        label="Detail Page Sections (14 section types from DetailPageTemplate)"
        usedBy="services/[slug], departments/[slug], patient-welfare/[slug], donations/[slug]"
      >
        <div className="flex flex-col">
          <ContentSection section={mockContentSection} />
          <BulletsSection section={mockBulletsSection} />
          <BulletsSection section={mockBulletsChipsSection} />
          <ServiceGroupsSection section={mockServiceGroupsSection} />
          <IconGridSection section={mockIconGridSection} />
          <CalloutSection section={mockCalloutSection} />
          <AccommodationSection section={mockAccommodationSection} />
          <ClosingBandSection section={mockClosingBandSection} />
          <PatientStoriesSection section={mockPatientStoriesSection} />
          <NumberedListSection section={mockNumberedListSection} />
          <ProcessStepsSection section={mockProcessStepsSection} />
          <StatsRowSection section={mockStatsRowSection} />
          <ImpactTableSection section={mockImpactTableSection} />
          <DynamicFormSection section={mockDynamicFormSectionData} />
          <GlobalCtaSection section={mockCtaSection} />
        </div>
      </ShowcaseSection>

      {/* ========================================================= */}
      {/* TEMPLATES                                                  */}
      {/* ========================================================= */}
      <ShowcaseSection
        id="templates"
        label="DetailPageTemplate (with mock service data)"
        usedBy="services/[slug], departments/[slug], patient-welfare/[slug], donations/[slug]"
      >
        <div className="bg-whitebg p-4 border-2 border-dashed border-primary-blue/20 rounded-lg my-4">
          <p className="text-b14 font-bold text-primary-blue mb-4 text-center">
            Template Output Preview: DetailPageTemplate
          </p>
          <DetailPageTemplate page={mockDetailPageRecord} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        id="template-article"
        label="ArticlePageTemplate (with mock news data)"
        usedBy="news/[slug], events/[slug], success-stories/[slug]"
      >
        <div className="bg-whitebg p-4 border-2 border-dashed border-primary-blue/20 rounded-lg my-4">
          <p className="text-b14 font-bold text-primary-blue mb-4 text-center">
            Template Output Preview: ArticlePageTemplate
          </p>
          <ArticlePageTemplate {...mockArticleNewsData} />
        </div>
      </ShowcaseSection>

      {/* Footer note */}
      <section className="bg-whitebg">
        <div className="container mx-auto px-6 py-[60px] lg:px-[30px] lg:py-[80px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker">Summary</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">
              Consistency Issues to Fix
            </h2>
            <ul className="mt-6 flex flex-col gap-3 text-start text-b16 text-primary-blue/85">
              <li>
                <strong>3 hero variants</strong> + 2 custom inline heroes → consolidate to{' '}
                <code>MediumHero</code>, <code>MarketingHeroSection</code>, and{' '}
                <code>ArticleHero</code>
              </li>
              <li>
                <strong>2 breadcrumb patterns</strong> (component + inline) → replace all inline
                with <code>MarketingBreadcrumb</code>
              </li>
              <li>
                <strong>Hub breadcrumbs</strong> — content and catalogue hubs use{' '}
                <code>MarketingBreadcrumb</code> (<code>Home / Current</code>)
              </li>
              <li>
                <strong>6 hub pages missing bottom CTA</strong> → add{' '}
                <code>MarketingSupportCTA</code>
              </li>
              <li>
                <strong>2 CTA components</strong> (<code>MarketingSupportCTA</code> and{' '}
                <code>GlobalCtaSection</code>) with near-identical output → evaluate consolidation
              </li>
              <li>
                <strong>Inconsistent h1 vs h2</strong> on hub pages (Events, News, Success Stories
                use h2; others use h1)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </article>
  )
}