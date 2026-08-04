import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DoctorProfilePage } from '@/components/doctors/DoctorProfilePage'
import { getDoctor, getDoctorsHub } from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Array.from(new Set(getDoctorsHub().doctors.map((doctor) => doctor.slug))).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const doctor = getDoctor(slug)

  if (!doctor) return { title: 'Doctor Not Found' }

  return {
    title: `${doctor.name} | Hijaz Hospital`,
    description: `${doctor.specialty} consultant at Hijaz Hospital.`,
  }
}

export default async function DoctorDetailPage({ params }: Args) {
  const { slug } = await params
  const doctor = getDoctor(slug)
  if (!doctor) notFound()

  return <DoctorProfilePage doctor={doctor} />
}
