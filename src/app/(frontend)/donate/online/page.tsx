import type { Metadata } from 'next'

import { DonationCheckout } from '@/components/donate/DonationCheckout'

export const metadata: Metadata = {
  title: 'Donate Online | Hijaz Hospital',
  description: 'Donate online securely via JazzCash.',
}

export default function DonateOnlinePage() {
  return <DonationCheckout title="Donate Online" />
}
