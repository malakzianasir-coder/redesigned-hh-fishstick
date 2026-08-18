import React from 'react'

import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { BlockHeader } from '@/components/site/BlockHeader'
import type { ProcessStepsSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function ProcessStepsSection({ section }: { section: ProcessStepsSectionData }) {
  const { id, kicker, heading, intro, steps, background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker={kicker} title={heading} lede={intro} />
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {steps.map((step, index) => (
            <InteractiveCard as="article" key={step.title} className="flex items-start gap-4 p-6">
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-red font-display text-b18 font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-h6 font-bold text-primary-blue">{step.title}</p>
                {step.items.map((item) => (
                  <div key={item} className="proc-item">
                    {item}
                  </div>
                ))}
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  )
}
