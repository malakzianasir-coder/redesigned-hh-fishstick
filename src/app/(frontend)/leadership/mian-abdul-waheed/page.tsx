import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProfileContent } from '@/components/marketing/ProfileContent'
import { getProfile } from '@/lib/content/loaders'

const SLUG = 'mian-abdul-waheed'

export const metadata: Metadata = {
  title: 'Mian Abdul Waheed | Hijaz Hospital',
  description: 'Co-Founder and Lifetime Chairman of Hijaz Hospital — biography and community leadership.',
}

export default function MianAbdulWaheedPage() {
  const profile = getProfile(SLUG)

  if (!profile) {
    notFound()
  }

  return <ProfileContent profile={profile} />
}
