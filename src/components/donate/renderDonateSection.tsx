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
import type { Section } from '@/lib/content/types'

/** Shared JSON section → component map for donate cause / how-to pages. */
export function renderDonateSection(section: Section, index: number) {
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
