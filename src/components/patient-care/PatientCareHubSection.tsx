import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { PatientCareHubGroup } from '@/lib/content/types'

import { PATIENT_CARE_ICON_MAP } from '@/components/patient-care/patientCareIcons'

type PatientCareHubSectionProps = {
  kicker: string
  heading: string
  lede: string
  groups: PatientCareHubGroup[]
}

export function PatientCareHubSection({ kicker, heading, lede, groups }: PatientCareHubSectionProps) {
  return (
    <section id="hub" className="section-anchor bg-whitebg">
      <div className="container mx-auto flex flex-col gap-10 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker={kicker} title={heading} lede={lede} />
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <div key={group.label} id={group.id}>
              <p className="field-label-text mb-4">{group.label}</p>
              <div className="card-grid card-grid--3">
                {group.cards.map((card) => {
                  const IconComponent = PATIENT_CARE_ICON_MAP[card.icon as keyof typeof PATIENT_CARE_ICON_MAP]
                  return (
                    <Link
                      key={card.href}
                      href={card.href}
                      className="card-interactive group flex flex-col gap-3 p-6"
                    >
                      {IconComponent ? (
                        <span className="icon-tile">
                          <IconComponent size={22} weight="duotone" />
                        </span>
                      ) : null}
                      <h3 className="text-h6M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                        {card.title}
                      </h3>
                      <p className="text-b14 text-primary-blue/85">{card.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                        {card.linkLabel ?? 'Learn more'}
                        <ArrowRight
                          size={16}
                          weight="bold"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
