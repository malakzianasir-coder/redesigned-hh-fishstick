'use client'

import { useState } from 'react'

import { ArticleCard } from '@/components/articles/ArticleCard'
import {
  formatArticleDate,
  parseEventCardDate,
} from '@/lib/content/article-helpers'
import type { EventsHubContent, HolidayEntry, HospitalEvent } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { HolidayCalendarTable } from './HolidayCalendarTable'

type EventsHubContentProps = {
  hub: EventsHubContent
  hospitalEvents: HospitalEvent[]
  holidayCalendar: HolidayEntry[]
}

export function EventsHubContent({ hub, hospitalEvents, holidayCalendar }: EventsHubContentProps) {
  const [activeTab, setActiveTab] = useState<'hospital' | 'calendar'>('hospital')

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
              className={cn('chip', activeTab === 'hospital' && 'bg-primary-blue text-white')}
              onClick={() => setActiveTab('hospital')}
            >
              Hospital Events
            </button>
            <button
              type="button"
              className={cn('chip', activeTab === 'calendar' && 'bg-primary-blue text-white')}
              onClick={() => setActiveTab('calendar')}
            >
              Holiday Calendar
            </button>
          </div>

          {activeTab === 'hospital' ? (
            <div className="flex flex-col gap-6">
              {hospitalEvents.length > 0 ? (
                <div className="card-grid card-grid--3">
                  {hospitalEvents.map((event) => {
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
      </section>
    </div>
  )
}
