'use client'

import { useLenis } from 'lenis/react'
import { useState } from 'react'

import { ArticleCard } from '@/components/articles/ArticleCard'
import {
  formatArticleDate,
  parseEventCardDate,
} from '@/lib/content/article-helpers'
import type { EventsHubContent, HolidayEntry, HospitalEvent } from '@/lib/content/types'
import { scrollToSectionId } from '@/utilities/scrollToHash'
import { cn } from '@/utilities/ui'

import { HolidayCalendarTable } from './HolidayCalendarTable'

type EventsHubContentProps = {
  hub: EventsHubContent
  hospitalEvents: HospitalEvent[]
  holidayCalendar: HolidayEntry[]
}

export function EventsHubContent({ hub, hospitalEvents, holidayCalendar }: EventsHubContentProps) {
  const lenis = useLenis()
  const [activeTab, setActiveTab] = useState<'hospital' | 'calendar'>('hospital')
  const sortedHospitalEvents = [...hospitalEvents].sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))

  function selectTab(tab: 'hospital' | 'calendar') {
    setActiveTab(tab)
    scrollToSectionId('hub-results', lenis ?? null)
  }

  return (
    <div className="bg-white">
      <section>
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">{hub.kicker}</p>
            <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">{hub.heading}</h1>
            <p className="mx-auto max-w-3xl text-b16 text-primary-blue/85">{hub.lede}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              className={cn('chip', activeTab === 'hospital' && 'is-active')}
              onClick={() => selectTab('hospital')}
            >
              Hospital Events
              <span className="chip-count">{hospitalEvents.length}</span>
            </button>
            <button
              type="button"
              className={cn('chip', activeTab === 'calendar' && 'is-active')}
              onClick={() => selectTab('calendar')}
            >
              Holiday Calendar
              <span className="chip-count">{holidayCalendar.length}</span>
            </button>
          </div>

          <div id="hub-results" className="section-anchor">
          {activeTab === 'hospital' ? (
            <div className="flex flex-col gap-6">
              {hospitalEvents.length > 0 ? (
                <div className="card-grid card-grid--3">
                  {sortedHospitalEvents.map((event) => {
                    const cardDate = parseEventCardDate(event.eventDate)
                    return (
                      <ArticleCard
                        key={event.slug}
                        variant="event"
                        title={event.title}
                        excerpt={event.shortDescription || ''}
                        href={`/events/${event.slug}`}
                        image={event.heroImage}
                        date={formatArticleDate(event.eventDate)}
                        category={event.categories[0] || event.eventType}
                        eventDay={cardDate?.day}
                        eventMonth={cardDate?.month}
                      />
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-b16 text-primary-blue/85">No hospital events listed yet.</p>
              )}
            </div>
          ) : (
            <HolidayCalendarTable entries={holidayCalendar} />
          )}
          </div>
        </div>
      </section>
    </div>
  )
}
