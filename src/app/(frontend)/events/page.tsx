import type { Metadata } from 'next'

import { EventsHubContent } from '@/components/hub/EventsHubContent'
import { getEventsHub, getHolidayCalendar, getHospitalEvents } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Events & Calendar | Hijaz Hospital',
  description: 'Hospital events, awareness campaigns, and the annual observance calendar at Hijaz Hospital.',
}

export default function EventsPage() {
  const hub = getEventsHub()
  const hospitalEvents = getHospitalEvents()
  const holidayCalendar = getHolidayCalendar()

  return (
    <EventsHubContent
      hub={hub}
      hospitalEvents={hospitalEvents}
      holidayCalendar={holidayCalendar}
    />
  )
}
