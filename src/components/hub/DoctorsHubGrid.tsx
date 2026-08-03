'use client'

import { MagnifyingGlass, User } from '@phosphor-icons/react'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import type { DoctorRecord } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { isHeadOfDepartment, isVisitingDoctor } from './doctorTags'

export type DoctorsView = 'all' | 'heads' | 'visiting'

type DoctorsHubGridProps = {
  doctors: DoctorRecord[]
  kicker: string
  heading: string
  lede: string
  initialView?: DoctorsView
  showViewTabs?: boolean
}

export function DoctorsHubGrid({
  doctors,
  kicker,
  heading,
  lede,
  initialView = 'all',
  showViewTabs = true,
}: DoctorsHubGridProps) {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<DoctorsView>(initialView)
  const [specialty, setSpecialty] = useState('all')

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty).filter(Boolean))).sort(),
    [doctors],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return doctors.filter((doc) => {
      if (view === 'heads' && !isHeadOfDepartment(doc)) return false
      if (view === 'visiting' && !isVisitingDoctor(doc)) return false
      if (specialty !== 'all' && doc.specialty !== specialty) return false
      if (q) {
        const hay = `${doc.name} ${doc.specialty} ${doc.department}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [doctors, search, specialty, view])

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mb-8 flex flex-col gap-[6px] text-center">
          <p className="kicker">{kicker}</p>
          <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">{heading}</h1>
          <p className="mx-auto max-w-2xl text-b16 text-primary-blue/85">{lede}</p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-[480px]">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or specialty…"
              aria-label="Search doctors"
              className="search-input"
            />
          </div>

          {showViewTabs ? (
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by consultant type">
              {(
                [
                  ['all', 'All Consultants'],
                  ['heads', 'Heads of Departments'],
                  ['visiting', 'Visiting Consultants'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={view === value}
                  className={cn('chip', view === value && 'is-active')}
                  onClick={() => setView(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by specialty">
            <button
              type="button"
              role="tab"
              aria-selected={specialty === 'all'}
              className={cn('chip', specialty === 'all' && 'is-active')}
              onClick={() => setSpecialty('all')}
            >
              All specialties
            </button>
            {specialties.map((spec) => (
              <button
                key={spec}
                type="button"
                role="tab"
                aria-selected={specialty === spec}
                className={cn('chip', specialty === spec && 'is-active')}
                onClick={() => setSpecialty(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-b16 text-primary-blue/70">No doctors match your filters.</p>
        ) : (
          <div className="card-grid card-grid--3-xl4">
            {filtered.map((doc) => (
              <DoctorCard key={`${doc.slug}-${doc.specialty}`} doctor={doc} />
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-b14 text-dark-gray">
          Showing {filtered.length} of {doctors.length} consultants
        </p>
      </div>
    </section>
  )
}

function DoctorCard({ doctor }: { doctor: DoctorRecord }) {
  const head = isHeadOfDepartment(doctor)
  const visiting = isVisitingDoctor(doctor)
  const fmh = doctor.tags.includes('fmh-faculty')

  return (
    <article className="card flex items-center gap-4 p-4">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-dark-gray/40 bg-whitebg">
        {doctor.image ? (
          <Image
            src={doctor.image}
            alt=""
            width={80}
            height={80}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <User size={28} weight="duotone" className="text-dark-gray" aria-hidden />
        )}
      </div>
      <div className="min-w-0">
        <h2 className="text-h6 font-bold text-primary-blue">{doctor.name}</h2>
        <p className="text-b14 text-dark-gray">{doctor.specialty}</p>
        {head ? (
          <span className="mt-1 inline-block rounded-full bg-redbg px-2 py-0.5 text-b12 font-bold uppercase tracking-kicker text-primary-red">
            Head of Department
          </span>
        ) : null}
        {visiting && !head ? (
          <span className="mt-1 inline-block rounded-full bg-redbg px-2 py-0.5 text-b12 font-bold uppercase tracking-kicker text-primary-red">
            {fmh ? 'FMH Faculty' : 'Visiting Consultant'}
          </span>
        ) : null}
      </div>
    </article>
  )
}
