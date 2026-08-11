import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProfileContent } from '@/components/marketing/ProfileContent'
import { getProfile } from '@/lib/content/loaders'

const SLUG = 'inam-elahi-asar'

export const metadata: Metadata = {
  title: 'Inam Elahi Asar | Hijaz Hospital',
  description: 'Founder & Honorary Project Director of Hijaz Hospital — biography and leadership roles.',
}

export default function InamElahiAsarPage() {
  const profile = getProfile(SLUG)

  if (!profile) {
    notFound()
  }

  return <ProfileContent profile={profile} />
}
