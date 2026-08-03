'use client'

import { useState } from 'react'

import type { JourneyMilestone } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

export function JourneyTimeline({ milestones }: { milestones: JourneyMilestone[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = milestones[activeIndex]

  if (!active) return null

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIndex((i) => Math.min(milestones.length - 1, i + 1))
  const progress = ((activeIndex + 1) / milestones.length) * 100

  return (
    <div className="flex flex-col gap-8">
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-1 lg:flex-col" role="tablist" aria-label="Journey years">
            {milestones.map((milestone, index) => (
              <button
                key={milestone.year}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-b14 font-semibold transition-all duration-300',
                  index === activeIndex
                    ? 'border-primary-red/40 bg-white text-primary-blue shadow-e2'
                    : 'border-transparent text-dark-gray hover:bg-cardbg hover:text-primary-blue',
                )}
              >
                <span
                  className={cn(
                    'h-2.5 w-2.5 shrink-0 rounded-full transition-all',
                    index === activeIndex
                      ? 'scale-125 bg-primary-red shadow-[0_0_0_4px_rgb(227_0_22/0.15)]'
                      : 'bg-dark-gray/40',
                  )}
                  aria-hidden
                />
                {milestone.year}
              </button>
            ))}
          </div>
          <div className="mt-6 hidden items-center gap-3 lg:flex">
            <button type="button" className="btn-ghost flex-1" onClick={goPrev} disabled={activeIndex === 0}>
              Prev
            </button>
            <button
              type="button"
              className="btn-ghost flex-1"
              onClick={goNext}
              disabled={activeIndex === milestones.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div className="relative min-h-[260px] lg:col-span-8" aria-live="polite">
          <article className="card p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div>
                <p className="kicker">Milestone</p>
                <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{active.year}</h3>
              </div>
              <span className="ml-auto text-b14 text-dark-gray">
                {activeIndex + 1} / {milestones.length}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {active.title && active.title !== active.year ? (
                <h4 className="text-h6 font-bold text-primary-blue">{active.title}</h4>
              ) : null}
              {active.body.map((paragraph) => (
                <p key={paragraph} className="text-b16 text-primary-blue/85">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button type="button" className="btn-ghost flex-1" onClick={goPrev} disabled={activeIndex === 0}>
            Prev
          </button>
          <button
            type="button"
            className="btn-primary min-h-[44px] flex-1 text-b14"
            onClick={goNext}
            disabled={activeIndex === milestones.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
