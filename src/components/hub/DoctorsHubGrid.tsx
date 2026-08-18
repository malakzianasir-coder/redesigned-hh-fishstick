'use client'

import { MagnifyingGlass, User } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { useLenis } from 'lenis/react'
import { useMemo, useState } from 'react'

import type { DoctorRecord } from '@/lib/content/types'
import { scrollToSectionId } from '@/utilities/scrollToHash'
import { cn } from '@/utilities/ui'

import { isHeadOfDepartment, isVisitingDoctor } from './doctorTags'

export type DoctorsView = 'all' | 'consultants' | 'visiting' | 'heads'

type DoctorsHubGridProps = {
  doctors: DoctorRecord[]
  kicker: string
  heading: string
  lede: string
  initialView?: DoctorsView
  showViewTabs?: boolean
}

const VIEW_OPTIONS: { value: DoctorsView; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'consultants', label: 'Consultants' },
  { value: 'visiting', label: 'Visiting' },
  { value: 'heads', label: 'Heads of Departments' },
]

export function DoctorsHubGrid({
  doctors,
  kicker,
  heading,
  lede,
  initialView = 'all',
  showViewTabs = true,
}: DoctorsHubGridProps) {
  const lenis = useLenis()
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('all')
  const [group, setGroup] = useState<DoctorsView>(initialView)

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty).filter(Boolean))).sort(),
    [doctors],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return doctors.filter((doc) => {
      const visiting = isVisitingDoctor(doc)
      const head = isHeadOfDepartment(doc)

      if (group === 'heads' && !head) return false
      if (group === 'consultants' && visiting) return false
      if (group === 'visiting' && !visiting) return false
      if (specialty !== 'all' && doc.specialty !== specialty) return false
      if (q) {
        const hay = `${doc.name} ${doc.specialty} ${doc.department}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [doctors, search, specialty, group])

  const heads = filtered
    .filter((d) => isHeadOfDepartment(d))
    .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
  const consultants = filtered
    .filter((d) => !isVisitingDoctor(d))
    .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
  const visiting = filtered
    .filter((d) => isVisitingDoctor(d))
    .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))

  const viewCounts = useMemo(() => {
    const q = search.trim().toLowerCase()
    const pool = doctors.filter((doc) => {
      if (specialty !== 'all' && doc.specialty !== specialty) return false
      if (q) {
        const hay = `${doc.name} ${doc.specialty} ${doc.department}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
    return {
      all: pool.length,
      consultants: pool.filter((doc) => !isVisitingDoctor(doc)).length,
      visiting: pool.filter((doc) => isVisitingDoctor(doc)).length,
      heads: pool.filter((doc) => isHeadOfDepartment(doc)).length,
    }
  }, [doctors, search, specialty])

  function selectGroup(value: DoctorsView) {
    setGroup(value)
    scrollToSectionId('hub-results', lenis ?? null)
  }

  return (
    <div className="bg-white">
      <section>
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:pb-[30px] lg:pt-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">{kicker}</p>
            <h1 className="text-h1M font-bold leading-[110%] tracking-display text-primary-blue lg:text-h1">
              {heading}
            </h1>
            <p className="mx-auto max-w-2xl text-b16 leading-[150%] text-primary-blue/85">{lede}</p>
          </div>
        </div>
      </section>

      <div className="sticky-bar">
        <div className="container mx-auto px-6 py-3 lg:px-[30px]">
          <div className="flex flex-col gap-3">
            <p className="field-label-text text-center">Filters</p>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
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
                  placeholder="Search by name, specialty, or department…"
                  aria-label="Search doctors"
                  className="search-input"
                />
              </div>

              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                aria-label="Filter by specialty"
                className="min-h-[44px] rounded-full border border-dark-gray/25 bg-white px-4 text-b14 text-primary-blue focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/15 lg:min-w-[220px]"
              >
                <option value="all">All specialties</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {showViewTabs ? (
              <div
                className="flex flex-wrap justify-center gap-2"
                role="tablist"
                aria-label="Filter by consultant type"
              >
                {VIEW_OPTIONS.map(({ value, label }) => {
                  const count = viewCounts[value]
                  return (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={group === value}
                      aria-label={`${label}, ${count}`}
                      className={cn('chip', group === value && 'is-active')}
                      onClick={() => selectGroup(value)}
                    >
                      {label}
                      <span className="chip-count">{count}</span>
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section id="hub-results" className="section-anchor">
        <div className="container mx-auto flex flex-col gap-12 px-6 py-[30px] lg:gap-16 lg:px-[30px] lg:py-[60px]">
          {group === 'heads' ? (
            <DoctorSection
              title="Heads of Departments"
              doctors={heads}
              empty="No heads of departments match your filters."
            />
          ) : null}

          {group === 'all' || group === 'consultants' ? (
            <DoctorSection
              title="Consultants"
              doctors={consultants}
              empty="No consultants match your filters."
            />
          ) : null}

          {group === 'all' || group === 'visiting' ? (
            <DoctorSection
              title="Visiting Consultants"
              doctors={visiting}
              empty="No visiting consultants match your filters."
            />
          ) : null}

          <p className="text-center text-b14 text-dark-gray">
            Showing {filtered.length} of {doctors.length} consultants
          </p>
        </div>
      </section>
    </div>
  )
}

function DoctorSection({
  title,
  doctors,
  empty,
}: {
  title: string
  doctors: DoctorRecord[]
  empty: string
}) {
  return (
    <div>
      <div className="mb-6 flex flex-col items-center gap-[6px] text-center">
        <p className="kicker">Directory</p>
        <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">{title}</h2>
      </div>
      {doctors.length === 0 ? (
        <p className="text-center text-b16 leading-[150%] text-primary-blue/70">{empty}</p>
      ) : (
        <div className="card-grid card-grid--3">
          {doctors.map((doc) => (
            <DoctorCard key={`${doc.slug}-${doc.specialty}`} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  )
}

function DoctorCard({ doctor }: { doctor: DoctorRecord }) {
  const head = isHeadOfDepartment(doctor)
  const visiting = isVisitingDoctor(doctor)
  const fmh = doctor.tags.includes('fmh-faculty')
  const badge = head
    ? 'Head of Department'
    : visiting
      ? fmh
        ? 'FMH Faculty'
        : 'Visiting Consultant'
      : null

  return (
    <InteractiveCard
      href={`/doctors/${doctor.slug}`}
      className="flex items-center gap-4 overflow-hidden p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2"
    >
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dark-gray/15 bg-whitebg">
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
      <div className="min-w-0 flex-1">
        <p className="kicker">{doctor.specialty}</p>
        <h3 className="text-h6 font-bold leading-[120%] text-primary-blue transition-colors duration-200 group-hover:text-primary-red">
          {doctor.name}
        </h3>
        <p className="mt-1 text-b14 leading-[150%] text-primary-blue/85">{doctor.department}</p>
        {badge ? <span className="group-badge mt-2">{badge}</span> : null}
      </div>
    </InteractiveCard>
  )
}
