import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProfileContent } from '@/components/marketing/ProfileContent'
import { getProfile } from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const profile = getProfile(slug)

  if (!profile) {
    return { title: 'Profile Not Found' }
  }

  return {
    title: `${profile.name} | Hijaz Hospital`,
    description: profile.description,
  }
}

export default async function ProfilePage({ params }: Args) {
  const { slug } = await params
  const profile = getProfile(slug)

  if (!profile) {
    notFound()
  }

  return <ProfileContent profile={profile} />
}
