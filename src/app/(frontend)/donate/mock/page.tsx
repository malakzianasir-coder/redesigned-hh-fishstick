import type { Metadata } from 'next'

import { MockDonationFlow } from '@/components/donate/MockDonationFlow'

export const metadata: Metadata = {
  title: 'Donate Mockup | Hijaz Hospital',
  description: 'Prototype donation flow for mock external payment handoff.',
}

export default function DonateMockPage() {
  return <MockDonationFlow title="Mock Donation Checkout" />
}
