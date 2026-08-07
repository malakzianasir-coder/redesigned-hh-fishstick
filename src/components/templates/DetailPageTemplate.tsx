import React from 'react'

import { MediumHero } from '@/components/heros/MediumHero'
import { AccommodationSection } from '@/components/sections/AccommodationSection'
import { BulletsSection } from '@/components/sections/BulletsSection'
import { CalloutSection } from '@/components/sections/CalloutSection'
import { ClosingBandSection } from '@/components/sections/ClosingBandSection'
import { ContentSection } from '@/components/sections/ContentSection'
import { JumpNav } from '@/components/sections/JumpNav'
import { DynamicFormSection } from '@/components/sections/DynamicFormSection'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import { IconGridSection } from '@/components/sections/IconGridSection'
import { NumberedListSection } from '@/components/sections/NumberedListSection'
import { ImpactTableSection } from '@/components/sections/ImpactTableSection'
import { PatientStoriesSection } from '@/components/sections/PatientStoriesSection'
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection'
import { StatsRowSection } from '@/components/sections/StatsRowSection'
import { ServiceGroupsSection } from '@/components/sections/ServiceGroupsSection'
import type { PageRecord, Section } from '@/lib/content/types'

type DetailPageTemplateProps = {
  page: PageRecord
  /** When false, skips appending the default support CTA. Default true. */
  includeDefaultCta?: boolean
  /** When true, skips MediumHero — use with MarketingHeroSection on donate/marketing pages. */
  hideHero?: boolean
}

const DEFAULT_CTA = {
  type: 'cta' as const,
  kicker: 'Support Our Mission',
  heading: 'Help Us Keep Care Within Reach for Every Patient',
  body: 'Your donation supports free treatment, medicines, and welfare programs for deserving patients — fulfilling our mission that financial hardship never stands in the way of care.',
  button: { label: 'Donate Now', href: '/donate' },
}

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case 'content':
      return <ContentSection key={section.id || index} section={section} />
    case 'bullets':
      return <BulletsSection key={section.id || index} section={section} />
    case 'serviceGroups':
      return <ServiceGroupsSection key={section.id || index} section={section} />
    case 'iconGrid':
      return <IconGridSection key={section.id || index} section={section} />
    case 'callout':
      return <CalloutSection key={section.id || index} section={section} />
    case 'accommodation':
      return <AccommodationSection key={section.id || index} section={section} />
    case 'closingBand':
      return <ClosingBandSection key={section.id || index} section={section} />
    case 'patientStories':
      return <PatientStoriesSection key={section.id || index} section={section} />
    case 'numberedList':
      return <NumberedListSection key={section.id || index} section={section} />
    case 'processSteps':
      return <ProcessStepsSection key={section.id || index} section={section} />
    case 'stats':
      return <StatsRowSection key={section.id || index} section={section} />
    case 'impactTable':
      return <ImpactTableSection key={section.id || index} section={section} />
    case 'dynamicForm':
      return <DynamicFormSection key={section.id || index} section={section} />
    case 'cta':
      return <GlobalCtaSection key={`cta-${index}`} section={section} />
    default:
      return null
  }
}

export const DetailPageTemplate: React.FC<DetailPageTemplateProps> = ({
  page,
  includeDefaultCta = true,
  hideHero = false,
}) => {
  const hasCta = page.sections.some((section) => section.type === 'cta')
  const sections =
    hasCta || !includeDefaultCta ? page.sections : [...page.sections, DEFAULT_CTA]

  return (
    <article>
      {hideHero ? null : <MediumHero hero={page.hero} underHeader />}
      {page.jumpLinks && page.jumpLinks.length > 0 ? <JumpNav links={page.jumpLinks} /> : null}
      {sections.map(renderSection)}
    </article>
  )
}
