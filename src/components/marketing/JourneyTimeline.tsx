'use client'

import { useRef, useState, useEffect } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'

import type { JourneyMilestone } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

export function JourneyTimeline({ milestones }: { milestones: JourneyMilestone[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const active = milestones[activeIndex]

  // Auto-scroll the node track to center the active node
  useEffect(() => {
    if (trackRef.current) {
      const track = trackRef.current
      const activeNode = track.children[activeIndex] as HTMLElement
      if (activeNode) {
        const scrollLeft =
          activeNode.offsetLeft - track.offsetWidth / 2 + activeNode.offsetWidth / 2
        track.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }, [activeIndex])

  if (!active || milestones.length === 0) return null

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () => setActiveIndex((i) => Math.min(milestones.length - 1, i + 1))
  const progressPercent = ((activeIndex + 1) / milestones.length) * 100

  return (
    <div className="flex flex-col gap-8">
      {/* Top Controls & Navigation Bar */}
      <div className="card bg-whitebg p-4 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-dark-gray/15 pb-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-redbg px-3 py-1 text-b12 font-bold text-primary-red">
              {String(activeIndex + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous milestone"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-blue/25 text-primary-blue transition-all duration-300 hover:border-primary-red hover:bg-primary-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"
            >
              <CaretLeft size={20} color="currentColor" />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === milestones.length - 1}
              aria-label="Next milestone"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-blue/25 text-primary-blue transition-all duration-300 hover:border-primary-red hover:bg-primary-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"
            >
              <CaretRight size={20} color="currentColor" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Horizontal Node Rail */}
        <div className="relative pt-6 pb-2">
          {/* Progress Track Line */}
          <div className="absolute top-[42px] left-0 right-0 h-1.5 rounded-full bg-dark-gray/15 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-red via-primary-red to-primary-blue transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Node Buttons Track */}
          <div
            ref={trackRef}
            className="no-scrollbar relative flex items-start justify-between gap-4 overflow-x-auto px-2 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {milestones.map((milestone, index) => {
              const isActive = index === activeIndex
              const isPassed = index < activeIndex

              return (
                <button
                  key={`${milestone.year}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative z-10 flex min-w-[76px] flex-col items-center gap-2.5 focus-visible:outline-none"
                >
                  {/* Node Circle */}
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-b12 font-bold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2',
                      isActive
                        ? 'scale-110 bg-primary-red text-white shadow-e2 ring-4 ring-primary-red/20'
                        : isPassed
                          ? 'bg-primary-red/85 text-white hover:scale-105'
                          : 'border border-dark-gray/25 bg-white text-dark-gray hover:border-primary-red hover:text-primary-red hover:scale-105',
                    )}
                  >
                    {index + 1}
                  </div>

                  {/* Year Tag Label */}
                  <span
                    className={cn(
                      'whitespace-nowrap text-b14 font-semibold transition-colors duration-300',
                      isActive
                        ? 'font-bold text-primary-red'
                        : 'text-dark-gray group-hover:text-primary-blue',
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

      {/* Active Milestone Card */}
      <article className="card relative overflow-hidden p-6 lg:p-10 shadow-e2 transition-all duration-500">
        {/* Top Gradient Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-red via-primary-red to-primary-blue" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 border-b border-dark-gray/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="group-badge self-start">{active.year}</span>
              <h3 className="text-h4M font-bold text-primary-blue lg:text-h4">
                {active.title}
              </h3>
            </div>
            <span className="text-b14 font-semibold text-dark-gray">
              Step {activeIndex + 1} of {milestones.length}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {active.body.map((paragraph) => (
              <p key={paragraph} className="text-b16 leading-[150%] text-primary-blue/85">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Card Footer Action Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dark-gray/15 pt-5">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="btn-ghost text-b14 min-h-[44px] px-4 disabled:opacity-40 disabled:pointer-events-none"
            >
              ← Previous Milestone
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === milestones.length - 1}
              className="btn-primary text-b14 min-h-[44px] px-5 disabled:opacity-40 disabled:pointer-events-none"
            >
              Next Milestone →
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
