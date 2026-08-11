import React from 'react'

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
        <div className="flex flex-col gap-[6px] text-center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          {intro ? (
            <p className="mx-auto mt-2 max-w-2xl text-b16 text-primary-blue/85">{intro}</p>
          ) : null}
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {steps.map((step, index) => (
            <article key={step.title} className="card flex items-start gap-4 p-6">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
