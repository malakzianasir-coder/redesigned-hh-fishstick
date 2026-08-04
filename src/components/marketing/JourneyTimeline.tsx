'use client'

import { useEffect, useRef, useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'

import type { JourneyMilestone } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

export function JourneyTimeline({ milestones }: { milestones: JourneyMilestone[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const active = milestones[activeIndex]

  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    const activeNode = track.children[activeIndex] as HTMLElement | undefined
    if (!activeNode) return
    const scrollLeft = activeNode.offsetLeft - track.offsetWidth / 2 + activeNode.offsetWidth / 2
    track.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' })
  }, [activeIndex])

  if (!active || milestones.length === 0) return null

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIndex((i) => Math.min(milestones.length - 1, i + 1))
  const progressPercent = ((activeIndex + 1) / milestones.length) * 100

  return (
    <div className="card overflow-hidden shadow-e1">
      {/* Step rail */}
      <div className="border-b border-dark-gray/15 bg-whitebg p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="shrink-0 rounded-full bg-redbg px-2.5 py-0.5 text-b12 font-bold text-primary-red">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(milestones.length).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1 truncate text-b14 font-semibold text-primary-blue lg:hidden">
            {active.year}
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous milestone"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-blue/25 text-primary-blue transition-colors duration-200 hover:border-primary-red hover:bg-primary-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 disabled:pointer-events-none disabled:opacity-40"
            >
              <CaretLeft size={14} color="currentColor" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === milestones.length - 1}
              aria-label="Next milestone"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-blue/25 text-primary-blue transition-colors duration-200 hover:border-primary-red hover:bg-primary-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 disabled:pointer-events-none disabled:opacity-40"
            >
              <CaretRight size={14} color="currentColor" />
            </button>
          </div>
        </div>

        <div className="relative px-1 lg:hidden">
          <div className="pointer-events-none absolute inset-x-4 top-1/2 h-px -translate-y-1/2 overflow-hidden rounded-full bg-dark-gray/15">
            <div
              className="h-full rounded-full bg-primary-red transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div
            ref={trackRef}
            role="tablist"
            aria-label="Journey milestones"
            className="no-scrollbar relative flex items-center justify-between overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {milestones.map((milestone, index) => {
              const isActive = index === activeIndex
              const isPassed = index < activeIndex
              return (
                <button
                  key={`m-${milestone.year}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${milestone.year}: ${milestone.title}`}
                  onClick={() => setActiveIndex(index)}
                  className="relative z-[1] flex h-7 min-w-7 flex-1 items-center justify-center focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      'rounded-full transition-all duration-200',
                      isActive
                        ? 'h-5 w-5 bg-primary-red text-center text-b12 font-bold leading-5 text-white ring-2 ring-primary-red/25'
                        : isPassed
                          ? 'h-2.5 w-2.5 bg-primary-red'
                          : 'h-2.5 w-2.5 border border-dark-gray/40 bg-white',
                    )}
                  >
                    {isActive ? index + 1 : null}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute inset-x-5 top-[11px] h-px overflow-hidden rounded-full bg-dark-gray/15">
            <div
              className="h-full rounded-full bg-primary-red transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div
            role="tablist"
            aria-label="Journey milestones"
            className="relative flex items-start justify-between"
          >
            {milestones.map((milestone, index) => {
              const isActive = index === activeIndex
              const isPassed = index < activeIndex

              return (
                <button
                  key={`d-${milestone.year}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  className="group relative z-[1] flex min-w-0 flex-1 flex-col items-center gap-1.5 focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      'flex h-[22px] w-[22px] items-center justify-center rounded-full text-b12 font-bold transition-colors duration-200',
                      isActive
                        ? 'bg-primary-red text-white ring-2 ring-primary-red/25'
                        : isPassed
                          ? 'bg-primary-red text-white'
                          : 'border border-dark-gray/25 bg-white text-dark-gray group-hover:border-primary-red group-hover:text-primary-red',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      'max-w-full truncate px-0.5 text-center text-b14 font-semibold leading-[120%] transition-colors duration-200',
                      isActive ? 'text-primary-red' : 'text-dark-gray group-hover:text-primary-blue',
                    )}
                  >
                    {milestone.year}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detail content */}
      <div className="relative bg-white p-4 lg:p-5">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-primary-red" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border-b border-dark-gray/15 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="group-badge self-start">{active.year}</span>
              <h3 className="text-h6 font-bold leading-[120%] text-primary-blue lg:text-h5">
                {active.title}
              </h3>
            </div>
            <span className="text-b12 font-semibold text-dark-gray">
              Step {activeIndex + 1} of {milestones.length}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {active.body.map((paragraph) => (
              <p key={paragraph} className="text-b14 leading-[150%] text-primary-blue/85">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dark-gray/15 pt-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="inline-flex h-9 items-center rounded-full px-4 text-b14 font-bold text-primary-blue transition-colors duration-200 hover:bg-cardbg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 disabled:pointer-events-none disabled:opacity-40"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === milestones.length - 1}
              className="inline-flex h-9 items-center rounded-full bg-primary-red px-4 text-b14 font-bold text-white transition-colors duration-300 hover:bg-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 disabled:pointer-events-none disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
