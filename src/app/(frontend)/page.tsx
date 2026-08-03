import type { Metadata } from 'next'

import { HomePage } from '@/components/home/HomePage'

export const metadata: Metadata = {
  title: 'Hijaz Hospital — Compassionate Care for All',
  description:
    'Hijaz Hospital provides free and subsidized healthcare to deserving patients across Lahore. Donate, explore services, and learn about our mission.',
}

export default function Page() {
  return <HomePage />
}
