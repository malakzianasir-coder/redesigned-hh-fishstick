import type { Metadata } from 'next'

import { ComponentShowcase } from '@/components/dev/ComponentShowcase'

export const metadata: Metadata = {
  title: 'Component Showcase | Hijaz Hospital Dev',
  description:
    'Living reference page rendering every component variant with mock data. Used to verify visual consistency before wiring pages to Payload CMS.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ComponentsShowcasePage() {
  return <ComponentShowcase />
}