import Link from 'next/link'

import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import type { DoctorRecord } from '@/lib/content/types'

import { isHeadOfDepartment, isVisitingDoctor } from '@/components/hub/doctorTags'

const DEFAULT_CTA = {
  type: 'cta' as const,
  kicker: 'Need Care',
  heading: 'Book a Consultation or Find Another Specialist',
  body: 'Browse our full consultant directory or contact the hospital for appointment guidance.',
  button: { label: 'Find a Doctor', href: '/doctors' },
}

export function DoctorProfilePage({ doctor }: { doctor: DoctorRecord }) {
  const qualifications = doctor.qualifications?.length
    ? doctor.qualifications
    : ['MBBS', `Specialist in ${doctor.specialty}`]
  const languages = doctor.languages?.length ? doctor.languages : ['Urdu', 'English']
  const head = isHeadOfDepartment(doctor)
  const visiting = isVisitingDoctor(doctor)

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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="card p-6 lg:col-span-4 lg:p-8">
              <p className="kicker">Consultant</p>
              <h1 className="mt-2 text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">
                {doctor.name}
              </h1>
              <p className="mt-2 text-b16 leading-[150%] text-primary-blue/85">{doctor.specialty}</p>
              <p className="text-b14 leading-[150%] text-dark-gray">{doctor.department}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {head ? <span className="group-badge">Head of Department</span> : null}
                {visiting ? (
                  <span className="group-badge">
                    {doctor.tags.includes('fmh-faculty') ? 'FMH Faculty' : 'Visiting Consultant'}
                  </span>
                ) : null}
              </div>

              <p className="mt-6 text-b14 leading-[150%] text-primary-blue/85">
                {doctor.bio ||
                  `${doctor.name} provides patient-centered care in ${doctor.department} with a focus on safety and compassionate treatment.`}
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-8">
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
      </section>

      <GlobalCtaSection section={DEFAULT_CTA} />
    </article>
  )
}
