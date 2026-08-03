import React from 'react'

import { MediumHero } from '@/components/heros/MediumHero'
import { AccommodationSection } from '@/components/sections/AccommodationSection'
import { BulletsSection } from '@/components/sections/BulletsSection'
import { CalloutSection } from '@/components/sections/CalloutSection'
import { ClosingBandSection } from '@/components/sections/ClosingBandSection'
import { ContentSection } from '@/components/sections/ContentSection'
import { DetailJumpNav } from '@/components/sections/DetailJumpNav'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import { IconGridSection } from '@/components/sections/IconGridSection'
import { PatientStoriesSection } from '@/components/sections/PatientStoriesSection'
import { ServiceGroupsSection } from '@/components/sections/ServiceGroupsSection'
import type { PageRecord, Section } from '@/lib/content/types'

type DetailPageTemplateProps = {
  page: PageRecord
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
    case 'cta':
      return <GlobalCtaSection key={`cta-${index}`} section={section} />
    default:
      return null
  }
}

export const DetailPageTemplate: React.FC<DetailPageTemplateProps> = ({ page }) => {
  const hasCta = page.sections.some((section) => section.type === 'cta')
  const sections = hasCta ? page.sections : [...page.sections, DEFAULT_CTA]

  return (
    <article>
      <MediumHero hero={page.hero} />
      {page.jumpLinks && page.jumpLinks.length > 0 ? <DetailJumpNav links={page.jumpLinks} /> : null}
      {sections.map(renderSection)}
    </article>
  )
}
