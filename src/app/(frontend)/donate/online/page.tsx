import type { Metadata } from 'next'

import { DonationCheckout } from '@/components/donate/DonationCheckout'
import { getSiteSettings } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Donate Online | Hijaz Hospital',
  description: 'Donate online securely via JazzCash.',
}

export default function DonateOnlinePage() {
  const siteSettings = getSiteSettings()
  const recaptchaEnabled = siteSettings.forms?.recaptcha?.enabled ?? true

  return <DonationCheckout title="Donate Online" recaptchaEnabled={recaptchaEnabled} />
}
