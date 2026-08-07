/**
 * Transforms Surgery & Allied Specialty departments:
 * - paraphrased MarketingHero excerpt
 * - verbatim overview body (from previous hero copy + tagline)
 * - serviceGroups layout: stack (not finder)
 * - why-choose as bullets cards (not iconGrid)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, '..', 'content', 'departments.json')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))

const SURGERY_SLUGS = new Set([
  'general-surgery',
  'orthopedics',
  'urology',
  'plastic-reconstructive-surgery',
  'ophthalmology',
  'ent-ear-nose-throat',
  'dentistry',
])

const PARAPHRASE = {
  'general-surgery':
    'Elective and emergency surgical care with modern techniques, experienced teams, and support before, during, and after surgery.',
  orthopedics:
    'Bone, joint, trauma, and spine care — from emergency fractures and joint replacement to rehabilitation for patients of all ages.',
  urology:
    'Specialist care for kidney, bladder, prostate, and male reproductive conditions using minimally invasive and open surgical techniques.',
  'plastic-reconstructive-surgery':
    'Reconstructive, burn, congenital, and aesthetic surgery focused on restoring function, appearance, and quality of life.',
  ophthalmology:
    'Complete eye care — from routine exams and emergencies to cataract, glaucoma, and vision-restoring surgery.',
  'ent-ear-nose-throat':
    'Medical and surgical treatment for ear, nose, throat, head, and neck conditions in adults and children.',
  dentistry:
    'Preventive, restorative, surgical, and specialist dental care to protect oral health and restore function.',
}

const SERVICE_INTRO = {
  'general-surgery': 'The department performs a broad range of surgical procedures, including:',
  orthopedics: 'Our department offers a wide range of orthopedic services, including:',
  urology: undefined,
  'plastic-reconstructive-surgery': undefined,
  ophthalmology: undefined,
  'ent-ear-nose-throat': undefined,
  dentistry: undefined,
}

const WHY_HEADING = {
  'general-surgery': 'Why Choose Hijaz Hospital General Surgery?',
  orthopedics: 'Why Choose Hijaz Hospital Orthopedics?',
  urology: 'Why Choose Hijaz Hospital Urology?',
  'plastic-reconstructive-surgery': 'Why Choose Hijaz Hospital Plastic & Reconstructive Surgery?',
  ophthalmology: 'Why Choose Hijaz Hospital Ophthalmology?',
  'ent-ear-nose-throat': 'Why Choose Hijaz Hospital ENT?',
  dentistry: 'Why Choose Hijaz Hospital Dentistry?',
}

function splitHeroExcerpt(excerpt) {
  if (!excerpt) return []
  return excerpt
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

const next = data.map((dept) => {
  if (!SURGERY_SLUGS.has(dept.slug)) return dept

  const tagline = dept.hero?.tagline || dept.title
  const overviewBody = splitHeroExcerpt(dept.hero?.excerpt)
  const paraphrase = PARAPHRASE[dept.slug]

  const sections = []

  sections.push({
    type: 'content',
    id: 'overview',
    kicker: 'Overview',
    heading: tagline,
    background: 'white',
    body: overviewBody,
  })

  for (const section of dept.sections || []) {
    if (section.type === 'serviceGroups') {
      const groups = [...section.groups]
      let miniInvasiveNote = null

      // Orthopedics: move prose "Minimally Invasive..." out of a fake procedure group
      if (dept.slug === 'orthopedics') {
        const idx = groups.findIndex((g) => g.heading === 'Minimally Invasive Orthopedic Procedures')
        if (idx >= 0) {
          miniInvasiveNote = groups[idx].items?.[0]
          groups.splice(idx, 1)
        }
      }

      sections.push({
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Services',
        heading: section.heading,
        intro: SERVICE_INTRO[dept.slug] || section.intro,
        groups,
      })

      if (miniInvasiveNote) {
        sections.push({
          type: 'content',
          id: 'minimally-invasive',
          kicker: 'Techniques',
          heading: 'Minimally Invasive Orthopedic Procedures',
          background: 'white',
          body: [miniInvasiveNote],
        })
      }
    } else if (section.type === 'iconGrid') {
      sections.push({
        type: 'bullets',
        id: 'why-choose',
        layout: 'cards',
        background: 'white',
        kicker: 'Why Choose Us',
        heading: WHY_HEADING[dept.slug] || section.heading,
        items: section.items.map((item) => (typeof item === 'string' ? item : item.label)),
      })
    } else {
      sections.push(section)
    }
  }

  return {
    ...dept,
    description: paraphrase,
    excerpt: paraphrase,
    hero: {
      kicker: dept.category,
      title: dept.title,
      excerpt: paraphrase,
      media: dept.hero.media,
      links: [
        { label: 'Our Services', href: '#services', variant: 'primary' },
        { label: 'Why Choose Us', href: '#why-choose', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Services', href: '#services' },
      { label: 'Why Choose Us', href: '#why-choose' },
    ],
    sections,
  }
})

fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n')
console.log('Updated Surgery & Allied departments:', [...SURGERY_SLUGS].join(', '))
