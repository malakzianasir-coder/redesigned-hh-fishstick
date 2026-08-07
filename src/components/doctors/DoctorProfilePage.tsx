import { User } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import { isHeadOfDepartment, isVisitingDoctor } from '@/components/hub/doctorTags'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import type { DoctorRecord } from '@/lib/content/types'

const DEFAULT_CTA = {
  type: 'cta' as const,
  kicker: 'Need Care',
  heading: 'Book a Consultation or Find Another Specialist',
  body: 'Browse our full consultant directory or contact the hospital for appointment guidance.',
  button: { label: 'Find a Doctor', href: '/doctors' },
}

function doctorKicker(doctor: DoctorRecord): string {
  if (isHeadOfDepartment(doctor)) return 'Head of Department'
  if (isVisitingDoctor(doctor)) {
    return doctor.tags.includes('fmh-faculty') ? 'FMH Faculty' : 'Visiting Consultant'
  }
  if (/jr\.?\s*consultant/i.test(doctor.specialty)) return 'Junior Consultant'
  if (/senior registrar/i.test(doctor.specialty)) return 'Senior Registrar'
  return 'Consultant'
}

function defaultQualifications(doctor: DoctorRecord): string[] {
  const { specialty } = doctor
  if (/consultant|registrar/i.test(specialty)) {
    return ['MBBS', specialty]
  }
  return ['MBBS', `Consultant ${specialty}`]
}

export function DoctorProfilePage({ doctor }: { doctor: DoctorRecord }) {
  const qualifications = doctor.qualifications?.length
    ? doctor.qualifications
    : defaultQualifications(doctor)
  const languages = doctor.languages?.length ? doctor.languages : ['Urdu', 'English']
  const head = isHeadOfDepartment(doctor)
  const visiting = isVisitingDoctor(doctor)
  const kicker = doctorKicker(doctor)

  return (
    <article className="bg-white">
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Doctors', href: '/doctors' },
          { label: doctor.name },
        ]}
      />

      <section>
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="card flex flex-col items-center gap-4 p-6 lg:p-8">
                <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl bg-cardbg">
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 1024px) 280px, 320px"
                    />
                  ) : (
                    <div className="photo-slot-lg">
                      <User size={44} weight="duotone" aria-hidden />
                      <span className="text-b12 text-dark-gray">Photo coming soon</span>
                    </div>
                  )}
                </div>
                <div className="flex w-full flex-col items-center gap-1 text-center">
                  <p className="kicker">{doctor.specialty}</p>
                  <p className="text-b14 text-dark-gray">{doctor.department}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-8">
              <div className="flex flex-col gap-[6px]">
                <p className="kicker">{kicker}</p>
                <h1 className="text-h2M font-bold leading-[110%] tracking-display text-primary-blue lg:text-h2">
                  {doctor.name}
                </h1>

                <div className="mt-2 flex flex-wrap gap-2">
                  {head ? <span className="group-badge">Head of Department</span> : null}
                  {visiting ? (
                    <span className="group-badge">
                      {doctor.tags.includes('fmh-faculty') ? 'FMH Faculty' : 'Visiting Consultant'}
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 max-w-2xl text-b16 leading-[150%] text-primary-blue/85">
                  {doctor.bio ||
                    `${doctor.name} provides patient-centered care in ${doctor.department} with a focus on safety and compassionate treatment.`}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="card p-6 lg:p-8">
                  <h2 className="text-h5M font-bold leading-[120%] text-primary-blue lg:text-h5">
                    Qualifications
                  </h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-b14 leading-[150%] text-primary-blue/85">
                    {qualifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="card p-6 lg:p-8">
                  <h2 className="text-h5M font-bold leading-[120%] text-primary-blue lg:text-h5">
                    Clinic information
                  </h2>
                  <div className="mt-4 flex flex-col gap-3 text-b14 leading-[150%] text-primary-blue/85">
                    <p>
                      <span className="field-label-text mb-1 block">Hours</span>
                      {doctor.clinicHours || 'Please call to confirm consultant availability.'}
                    </p>
                    <p>
                      <span className="field-label-text mb-1 block">Languages</span>
                      {languages.join(', ')}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link href="/doctors" className="btn-primary">
                      Back to Doctors
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalCtaSection section={DEFAULT_CTA} />
    </article>
  )
}
