import type { DoctorRecord } from '@/lib/content/types'

export function doctorHasTag(doc: DoctorRecord, tag: string): boolean {
  return doc.tags.includes(tag as DoctorRecord['tags'][number])
}

export function isVisitingDoctor(doc: DoctorRecord): boolean {
  return doctorHasTag(doc, 'visiting') || doctorHasTag(doc, 'fmh-faculty')
}

export function isHeadOfDepartment(doc: DoctorRecord): boolean {
  return doctorHasTag(doc, 'head-of-department')
}
