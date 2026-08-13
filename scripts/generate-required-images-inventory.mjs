import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const CONTENT = path.join(ROOT, 'content')
const DEPT_IMAGES_ROOT = 'C:\\hijaz-content-2026\\departments zip\\Department'
const OUTPUT = path.join(ROOT, 'temp-required-images-inventory.md')

const IMAGE_EXT = new Set(['.webp', '.jpeg', '.jpg', '.png'])

/** @type {Record<string, string[]>} */
const SLOT_KEYWORDS = {
  'general-surgery': ['surgery', 'general surgery', 'ot complex', 'operation theatre', 'operation theater', 'ot '],
  orthopedics: ['orthopedic', 'ortho'],
  urology: ['urology', 'urolog'],
  'plastic-reconstructive-surgery': ['plastic', 'reconstructive'],
  ophthalmology: ['ophthalm', 'eye'],
  'ent-ear-nose-throat': ['ent', 'ear nose', 'otolaryng'],
  dentistry: ['dental', 'dentistry'],
  'general-medicine': ['general medicine', 'medicine ward', 'medical ward'],
  gastroenterology: ['gastro', 'gi '],
  nephrology: ['nephro', 'kidney', 'dialysis', 'renal'],
  cardiology: ['cardio', 'heart', 'ecg'],
  pulmonology: ['pulmon', 'chest', 'respiratory', 'lung'],
  endocrinology: ['endocrin', 'diabetes', 'thyroid'],
  dermatology: ['dermat', 'skin'],
  'gynaecology-obstetrics': ['gynae', 'gynec', 'obstetric', 'labor room', 'female ward', 'maternity'],
  'pediatrics-neonatology': ['pediatric', 'paediatric', 'peads', 'nursery', 'neonat', 'child'],
  'dietetics-nutrition': ['diet', 'nutrition', 'food'],
  'physiotherapy-rehabilitation': ['physio', 'rehabilitation', 'rehab'],
  opd: ['opd', 'outpatient', 'waiting area', 'reception', 'ground floor'],
  ipd: ['ipd', 'inpatient', 'ward', 'female ward', 'male ward'],
  icu: ['icu', 'intensive care', 'critical care'],
  emergency: ['emergency', 'er ', 'casualty'],
  'ot-complex': ['operation theatre', 'operation theater', 'ot complex', 'gynae theater', 'surgery'],
  nursing: ['nursing', 'nurse', 'ward'],
  anesthesia: ['anesthesia', 'anaesthesia', 'anesthet'],
  ambulance: ['ambulance'],
  dialysis: ['dialysis', 'dailysis', 'kidney', 'renal'],
  pharmacy: ['pharmacy', 'pharmac'],
  'blood-bank': ['blood bank', 'blood'],
  cafeteria: ['cafeteria', 'canteen', 'meal', 'food'],
  pathology: ['pathology', 'laboratory', 'lab '],
  radiology: ['radiology', 'x-ray', 'xray', 'ultrasound', 'imaging'],
  'cardiac-diagnostics': ['cardiac', 'ecg', 'echo', 'heart'],
  donate: ['donat', 'zakat', 'appeal', 'bank detail', 'supporter', 'donor'],
  'donate-a-meal': ['meal', 'cafeteria', 'food', 'kitchen'],
  'donate-in-kind': ['machine', 'equipment', 'new machines'],
  'sponsor-a-patient': ['patient', 'dialysis patient', 'ward'],
  'sponsor-free-surgeries': ['surgery', 'operation theatre', 'ot '],
  'support-a-project': ['medical tower', 'construction', 'project', 'new machines'],
  leadership: ['faculty', 'visitor', 'opening', 'celebrity', 'donor', 'executive'],
  'our-purpose': ['ground floor', 'hospital', 'mosque', 'opening', 'visitor'],
  'our-impact': ['medical tower', 'opening', 'award', 'impact', 'visitor'],
  'our-supporters': ['donor', 'supporter', 'donors and friends'],
  home: ['ground floor', 'hospital', 'waiting', 'visitor', 'opening'],
  news: ['opening', 'visitor', 'event', 'celebrity'],
  events: ['opening', 'visitor', 'event', 'celebrity'],
  'success-stories': ['patient', 'dialysis', 'surgery', 'recovery'],
  chairman: ['chairman', 'asif waheed', 'waheed', 'faculty'],
  president: ['president', 'sohail', 'faculty'],
  profile: ['founder', 'inam elahi', 'asar', 'waheed'],
  accommodation: ['vip', 'private', 'room', 'female ward', 'gynae'],
  machinery: ['new machines', 'machine', 'laser', 'dialysis', 'ultrasound', 'x-ray'],
}

function walkImages(dir, base = dir) {
  /** @type {string[]} */
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkImages(full, base))
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full.slice(base.length + 1).replace(/\\/g, '/'))
    }
  }
  return files
}

function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
}

function scoreCandidate(relPath, keywords, aspectHint) {
  const normPath = normalize(relPath)
  let score = 0
  for (const kw of keywords) {
    const n = normalize(kw)
    if (!n) continue
    if (normPath.includes(n)) score += n.split(' ').length >= 2 ? 4 : 2
  }
  if (aspectHint === 'hor' && relPath.includes('/_hor/')) score += 3
  if (aspectHint === 'sq' && relPath.includes('/_sq/')) score += 3
  if (aspectHint === 'ver' && relPath.includes('/_ver/')) score += 3
  if (aspectHint === 'portrait' && relPath.includes('/_ver/')) score += 2
  if (aspectHint === 'banner' && relPath.includes('/_hor/')) score += 2
  if (aspectHint === 'card' && relPath.includes('/_sq/')) score += 2
  return score
}

function getCandidates(keywords, aspectHint = 'banner', limit = 8) {
  const scored = allDeptImages
    .map((rel) => ({ rel, score: scoreCandidate(rel, keywords, aspectHint) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.rel.localeCompare(b.rel))

  const unique = []
  const seen = new Set()
  for (const item of scored) {
    const key = path.basename(item.rel)
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(item.rel)
    if (unique.length >= limit) break
  }
  return unique
}

function doctorCandidates(name) {
  const parts = normalize(name).split(' ').filter((p) => p.length > 2 && !['dr', 'prof'].includes(p))
  const matches = allDeptImages.filter((rel) => {
    const base = normalize(path.basename(rel, path.extname(rel)))
    return parts.some((p) => base.includes(p))
  })
  return [...new Set(matches)].slice(0, 6)
}

/** @type {Array<{id:string, category:string, page:string, url:string, slot:string, aspect:string, status:string, current?:string, notes?:string, keywords:string[]}>} */
const slots = []

function addSlot(slot) {
  slots.push({
    aspect: 'banner',
    status: 'PLACEHOLDER',
    keywords: [],
    ...slot,
  })
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function loadContentFiles() {
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.json')) files.push(full)
    }
  }
  walk(CONTENT)
  return files
}

// --- Collect slots from content ---

const departments = readJson(path.join(CONTENT, 'departments.json'))
for (const dept of departments) {
  addSlot({
    id: `dept-hero-${dept.slug}`,
    category: 'Departments',
    page: dept.title,
    url: `/departments/${dept.slug}`,
    slot: 'Hero banner',
    aspect: 'banner',
    status: dept.hero?.media?.type === 'placeholder' ? 'PLACEHOLDER' : 'CURRENT',
    current: dept.hero?.media?.src,
    keywords: SLOT_KEYWORDS[dept.slug] || [dept.title, dept.slug],
  })
}

const services = readJson(path.join(CONTENT, 'services.json'))
for (const svc of services) {
  addSlot({
    id: `svc-hero-${svc.slug}`,
    category: 'Services',
    page: svc.title,
    url: `/services/${svc.slug}`,
    slot: 'Hero banner',
    aspect: 'banner',
    status: svc.hero?.media?.src?.includes('services-hero-banner') ? 'GENERIC_REUSE' : 'CURRENT',
    current: svc.hero?.media?.src,
    keywords: SLOT_KEYWORDS[svc.slug] || [svc.title, svc.slug],
    notes: svc.hero?.media?.src?.includes('services-hero-banner')
      ? 'All services currently share the same generic hero image.'
      : undefined,
  })

  for (const section of svc.sections || []) {
    if (section.type === 'accommodation' && section.rooms) {
      for (const room of section.rooms) {
        addSlot({
          id: `svc-accommodation-${svc.slug}-${normalize(room.label).replace(/\s+/g, '-')}`,
          category: 'Services',
          page: `${svc.title} — ${room.label}`,
          url: `/services/${svc.slug}#accommodation`,
          slot: `Accommodation photo (${room.count} × ${room.label})`,
          aspect: 'banner',
          status: 'UI_PLACEHOLDER',
          keywords: [...(SLOT_KEYWORDS.accommodation || []), room.label],
          notes: 'Rendered as photo-slot-wide placeholder in AccommodationSection.',
        })
      }
    }
  }
}

const marketingPlaceholders = [
  ['donate.json', 'donate', 'Donate hub', '/donate', 'Hero banner', SLOT_KEYWORDS.donate],
  ['how-to-donate.json', 'how-to-donate-hub', 'How to Donate hub', '/donate/how-to-donate', 'Hero banner', SLOT_KEYWORDS.donate],
  ['what-you-can-support.json', 'wys-hub', 'What You Can Support hub', '/donate/what-you-can-support', 'Hero banner', SLOT_KEYWORDS.donate],
  ['leadership.json', 'leadership', 'Leadership & Governance', '/leadership', 'Hero banner', SLOT_KEYWORDS.leadership],
  ['our-supporters.json', 'our-supporters', 'Our Supporters', '/our-supporters', 'Hero banner', SLOT_KEYWORDS['our-supporters']],
  ['chairmans-message.json', 'chairman', "Chairman's Message", '/leadership/messages/chairman', 'Hero banner', SLOT_KEYWORDS.chairman],
  ['presidents-message.json', 'president', "President's Message", '/leadership/messages/president', 'Hero banner', SLOT_KEYWORDS.president],
  ['leadership-messages.json', 'leadership-messages', 'Leadership Messages hub', '/leadership/messages', 'Hero banner', SLOT_KEYWORDS.leadership],
]

for (const [file, id, page, url, slot, keywords] of marketingPlaceholders) {
  const data = readJson(path.join(CONTENT, file))
  const media = data.hero?.media
  addSlot({
    id: `mkt-${id}`,
    category: 'Marketing / Donate',
    page,
    url,
    slot,
    aspect: media?.type === 'placeholder' ? 'banner' : 'banner',
    status: media?.type === 'placeholder' ? 'PLACEHOLDER' : 'CURRENT',
    current: media?.src,
    keywords,
    notes: media?.placeholderLabel,
  })
}

const wys = readJson(path.join(CONTENT, 'what-you-can-support.json'))
for (const cause of wys.causes || []) {
  const media = cause.hero?.media
  addSlot({
    id: `wys-${cause.slug}`,
    category: 'Donate Causes',
    page: cause.title,
    url: `/donate/what-you-can-support/${cause.slug}`,
    slot: 'Hero banner',
    aspect: 'banner',
    status: media?.type === 'placeholder' ? 'PLACEHOLDER' : 'CURRENT',
    current: media?.src,
    keywords: SLOT_KEYWORDS[cause.slug] || [cause.title, cause.slug],
    notes: media?.placeholderLabel,
  })
}

const htd = readJson(path.join(CONTENT, 'how-to-donate.json'))
for (const method of htd.methods || []) {
  const media = method.hero?.media
  addSlot({
    id: `htd-${method.slug}`,
    category: 'How to Donate',
    page: method.title,
    url: `/donate/how-to-donate/${method.slug}`,
    slot: 'Hero banner',
    aspect: 'banner',
    status: media?.type === 'placeholder' ? 'PLACEHOLDER' : 'CURRENT',
    current: media?.src,
    keywords: SLOT_KEYWORDS.donate,
    notes: media?.placeholderLabel,
  })
}

addSlot({
  id: 'htd-meezan-qr',
  category: 'How to Donate',
  page: 'Meezan App & QR',
  url: '/donate/how-to-donate/meezan-app',
  slot: 'Donation QR code image',
  aspect: 'square',
  status: 'MISSING_ASSET',
  keywords: ['bank', 'meezan', 'qr'],
  notes: htd.methods?.find((m) => m.slug === 'meezan-app')?.qr?.placeholderNote,
})

const ourPurpose = readJson(path.join(CONTENT, 'our-purpose.json'))
addSlot({
  id: 'purpose-hero',
  category: 'About',
  page: 'Our Purpose',
  url: '/our-purpose',
  slot: 'Hero banner',
  aspect: 'banner',
  status: 'CURRENT',
  current: ourPurpose.hero?.media?.src,
  keywords: SLOT_KEYWORDS['our-purpose'],
})
addSlot({
  id: 'purpose-philosophy',
  category: 'About',
  page: 'Our Purpose',
  url: '/our-purpose#our-philosophy',
  slot: 'Philosophy section image',
  aspect: 'banner',
  status: 'CURRENT',
  current: ourPurpose.philosophy?.image,
  keywords: SLOT_KEYWORDS['our-purpose'],
})

const ourImpact = readJson(path.join(CONTENT, 'our-impact.json'))
addSlot({
  id: 'impact-hero',
  category: 'About',
  page: 'Our Impact',
  url: '/our-impact',
  slot: 'Hero banner',
  aspect: 'banner',
  status: 'CURRENT',
  current: ourImpact.hero?.media?.src,
  keywords: SLOT_KEYWORDS['our-impact'],
})
addSlot({
  id: 'impact-medical-tower',
  category: 'About',
  page: 'Our Impact — Our Projects',
  url: '/our-impact#our-projects',
  slot: 'Medical Tower photograph',
  aspect: 'banner',
  status: 'UI_PLACEHOLDER',
  keywords: ['medical tower', 'itw', 'inam tasneem', 'construction'],
  notes: ourImpact.medicalTower?.placeholderLabel,
})
for (const item of ourImpact.highlights || []) {
  addSlot({
    id: `impact-highlight-${normalize(item.title).slice(0, 40).replace(/\s+/g, '-')}`,
    category: 'About',
    page: `Our Impact — ${item.title}`,
    url: '/our-impact#highlights',
    slot: 'Highlight card image',
    aspect: 'card',
    status: item.image ? 'CURRENT' : 'UI_PLACEHOLDER',
    current: item.image,
    keywords: [item.title, 'news', 'event'],
  })
}

const home = readJson(path.join(CONTENT, 'home.json'))
for (const [i, img] of (home.intro?.images || []).entries()) {
  addSlot({
    id: `home-intro-${i + 1}`,
    category: 'Home (not slider)',
    page: 'Home — About Hijaz intro',
    url: '/',
    slot: `Intro split image ${i + 1}`,
    aspect: 'banner',
    status: 'CURRENT',
    current: img.src,
    keywords: SLOT_KEYWORDS.home,
    notes: img.alt,
  })
}
for (const card of home.services?.cards || []) {
  addSlot({
    id: `home-service-${card.href?.split('/').pop()}`,
    category: 'Home (not slider)',
    page: `Home — Services: ${card.title}`,
    url: '/',
    slot: 'Service media card',
    aspect: 'card',
    status: 'CURRENT',
    current: card.image,
    keywords: SLOT_KEYWORDS[card.href?.split('/').pop()] || [card.title],
  })
}
for (const card of home.founders?.cards || []) {
  addSlot({
    id: `home-founder-${normalize(card.name).slice(0, 30).replace(/\s+/g, '-')}`,
    category: 'Home (not slider)',
    page: `Home — Founders: ${card.name}`,
    url: '/',
    slot: 'Founder media card',
    aspect: 'card',
    status: 'CURRENT',
    current: card.image,
    keywords: ['founder', 'inam elahi', 'waheed', 'opening', card.name],
  })
}
for (const [i, story] of (home.stories?.items || []).entries()) {
  addSlot({
    id: `home-story-${i + 1}`,
    category: 'Home (not slider)',
    page: `Home — Story: ${story.title}`,
    url: '/',
    slot: 'Success story media card',
    aspect: 'card',
    status: story.image?.includes('pexels') ? 'STOCK' : 'CURRENT',
    current: story.image,
    keywords: SLOT_KEYWORDS['success-stories'],
  })
}
for (const member of home.team?.doctors || []) {
  addSlot({
    id: `home-team-${normalize(member.name).replace(/\s+/g, '-')}`,
    category: 'Home (not slider)',
    page: `Home — Team: ${member.name}`,
    url: '/',
    slot: 'Team portrait',
    aspect: 'portrait',
    status: member.image?.includes('doctor-placeholder') ? 'PLACEHOLDER' : 'CURRENT',
    current: member.image,
    keywords: [member.name, member.role, 'faculty', 'our faculty'],
    notes: member.role,
  })
}
for (const [i, item] of (home.news?.items || []).entries()) {
  addSlot({
    id: `home-news-${i + 1}`,
    category: 'Home (not slider)',
    page: `Home — News: ${item.title}`,
    url: '/',
    slot: 'News media card',
    aspect: 'card',
    status: item.image ? 'CURRENT' : 'MISSING',
    current: item.image,
    keywords: ['news', 'event', 'opening', item.title],
  })
}
for (const [i, item] of (home.events?.items || []).entries()) {
  addSlot({
    id: `home-event-${i + 1}`,
    category: 'Home (not slider)',
    page: `Home — Event: ${item.title}`,
    url: '/',
    slot: 'Event card image (optional)',
    aspect: 'card',
    status: item.image ? 'CURRENT' : 'MISSING',
    current: item.image,
    keywords: ['event', 'opening', 'visitor', item.title],
  })
}
for (const [i, item] of (home.machinery?.slides || []).entries()) {
  addSlot({
    id: `home-machinery-${i + 1}`,
    category: 'Home (not slider)',
    page: `Home — Machinery: ${item.title}`,
    url: '/',
    slot: 'Machinery carousel image',
    aspect: 'card',
    status: 'CURRENT',
    current: item.src,
    keywords: SLOT_KEYWORDS.machinery,
    notes: item.href,
  })
}
addSlot({
  id: 'home-jazzcash-qr',
  category: 'Home (not slider)',
  page: 'Home — Ways to Give / JazzCash',
  url: '/#ways-to-give',
  slot: 'JazzCash QR code image',
  aspect: 'square',
  status: 'MISSING_ASSET',
  keywords: ['jazzcash', 'qr', 'donation'],
  notes: home.waysToGive?.jazzcash?.qrNote,
})

const doctors = readJson(path.join(CONTENT, 'doctors.json'))
for (const doc of doctors.doctors || []) {
  addSlot({
    id: `doctor-${doc.slug}`,
    category: 'Doctors directory',
    page: doc.name,
    url: `/doctors/${doc.slug}`,
    slot: 'Doctor portrait',
    aspect: 'portrait',
    status: doc.image ? 'CURRENT' : 'MISSING',
    current: doc.image || undefined,
    keywords: [doc.name, doc.department, doc.specialty, 'our faculty'],
    notes: `${doc.specialty} · ${doc.department}`,
  })
}

const leadership = readJson(path.join(CONTENT, 'leadership.json'))
for (const founder of leadership.founders || []) {
  addSlot({
    id: `leadership-founder-${normalize(founder.name).slice(0, 30).replace(/\s+/g, '-')}`,
    category: 'Leadership portraits',
    page: founder.name,
    url: '/leadership#our-founders',
    slot: 'Founder passport photo',
    aspect: 'portrait',
    status: 'UI_PLACEHOLDER',
    keywords: [founder.name, 'founder', 'faculty'],
    notes: founder.role,
  })
}
for (const entry of leadership.chairpersons || []) {
  addSlot({
    id: `leadership-chair-${normalize(entry.name).replace(/\s+/g, '-')}`,
    category: 'Leadership portraits',
    page: entry.name,
    url: '/leadership#our-chairpersons',
    slot: 'Chairperson portrait',
    aspect: 'portrait',
    status: 'UI_PLACEHOLDER',
    keywords: [entry.name, 'chairperson', 'waheed', 'faculty'],
    notes: `${entry.role} · ${entry.years}`,
  })
}
for (const entry of leadership.presidents || []) {
  addSlot({
    id: `leadership-president-${normalize(entry.name).replace(/\s+/g, '-')}`,
    category: 'Leadership portraits',
    page: entry.name,
    url: '/leadership#our-presidents',
    slot: 'President portrait',
    aspect: 'portrait',
    status: 'UI_PLACEHOLDER',
    keywords: [entry.name, 'president', 'faculty'],
    notes: `${entry.role} · ${entry.years}`,
  })
}
for (const member of leadership.seniorManagement || []) {
  addSlot({
    id: `leadership-mgmt-${normalize(member.name).replace(/\s+/g, '-')}`,
    category: 'Leadership portraits',
    page: member.name,
    url: '/leadership#senior-management',
    slot: 'Senior management portrait',
    aspect: 'portrait',
    status: 'UI_PLACEHOLDER',
    keywords: [member.name, member.role, 'faculty'],
    notes: member.role,
  })
}

const profilePath = path.join(CONTENT, 'profiles', 'inam-elahi-asar.json')
if (fs.existsSync(profilePath)) {
  const profile = readJson(profilePath)
  addSlot({
    id: 'profile-founder',
    category: 'Leadership portraits',
    page: profile.name,
    url: '/leadership/inam-elahi-asar',
    slot: 'Founder profile portrait',
    aspect: 'portrait',
    status: 'CURRENT',
    current: profile.image,
    keywords: ['inam elahi', 'asar', 'founder', 'faculty'],
    notes: profile.role,
  })
}

for (const file of ['chairmans-message.json', 'presidents-message.json']) {
  const data = readJson(path.join(CONTENT, file))
  const msg = data.message
  if (!msg) continue
  addSlot({
    id: `message-portrait-${msg.id || file}`,
    category: 'Leadership portraits',
    page: msg.name,
    url: data.slug === 'chairman' ? '/leadership/messages/chairman' : '/leadership/messages/president',
    slot: 'Message author portrait',
    aspect: 'portrait',
    status: 'UI_PLACEHOLDER',
    keywords: [msg.name, msg.role, 'faculty'],
    notes: `${msg.role} · ${msg.organization}`,
  })
}

const donations = readJson(path.join(CONTENT, 'donations.json'))
for (const page of donations) {
  addSlot({
    id: `donation-type-${page.slug}`,
    category: 'Donation type pages',
    page: page.title,
    url: `/donate/${page.slug}`,
    slot: 'Hero illustration → replace with photo',
    aspect: 'banner',
    status: 'ILLUSTRATION',
    current: page.hero?.media?.preset,
    keywords: SLOT_KEYWORDS.donate,
    notes: `Currently illustration preset: ${page.hero?.media?.preset}`,
  })
}

const patientWelfare = readJson(path.join(CONTENT, 'patient-welfare.json'))
for (const page of patientWelfare) {
  addSlot({
    id: `welfare-${page.slug}`,
    category: 'Patient welfare',
    page: page.title,
    url: `/patient-welfare/${page.slug}`,
    slot: 'Hero illustration → replace with photo',
    aspect: 'banner',
    status: 'ILLUSTRATION',
    current: page.hero?.media?.preset,
    keywords: ['patient', 'welfare', 'zakat', 'financial'],
    notes: `Currently illustration preset: ${page.hero?.media?.preset}`,
  })
}

const patientWelfareHub = readJson(path.join(CONTENT, 'patient-welfare-hub.json'))
addSlot({
  id: 'welfare-hub',
  category: 'Patient welfare',
  page: patientWelfareHub.title || 'Patient Welfare hub',
  url: '/patient-welfare',
  slot: 'Hero illustration → replace with photo',
  aspect: 'banner',
  status: 'ILLUSTRATION',
  current: patientWelfareHub.hero?.media?.preset,
  keywords: ['patient', 'welfare', 'zakat'],
})

for (const file of ['news.json', 'events.json', 'success-stories.json']) {
  const data = readJson(path.join(CONTENT, file))
  const key = file.replace('.json', '')
  const items =
    key === 'news' ? data.articles : key === 'events' ? data.hospitalEvents : data.stories
  for (const item of items || []) {
    const image = item.heroImage || item.thumbnail
    addSlot({
      id: `${key}-${item.slug}`,
      category: key === 'success-stories' ? 'Success stories' : key.charAt(0).toUpperCase() + key.slice(1),
      page: item.title,
      url: `/${key}/${item.slug}`,
      slot: key === 'success-stories' ? 'Story thumbnail / hero' : 'Article / event hero',
      aspect: 'banner',
      status: image?.includes('pexels') ? 'STOCK' : image ? 'CURRENT' : 'MISSING',
      current: image,
      keywords: SLOT_KEYWORDS[key] || [item.title, item.category].filter(Boolean),
    })
  }
}

function scanCalloutSections(filePath, parentSlug, parentTitle, urlPrefix) {
  const data = readJson(filePath)
  const pages = Array.isArray(data) ? data : [data]
  for (const page of pages) {
    const slug = page.slug || parentSlug
    const title = page.title || parentTitle
    const baseUrl = urlPrefix || `/patient-welfare/${slug}`
    for (const section of page.sections || []) {
      if (section.type !== 'callout' || section.logo?.src) continue
      addSlot({
        id: `callout-${slug}-${section.id || normalize(section.heading).slice(0, 30).replace(/\s+/g, '-')}`,
        category: 'Callout logos',
        page: `${title} — ${section.heading}`,
        url: `${baseUrl}#${section.id || ''}`,
        slot: 'Callout partner / program logo',
        aspect: 'square',
        status: 'UI_PLACEHOLDER',
        keywords: [section.heading, section.kicker, 'sehat', 'welfare', 'zakat'].filter(Boolean),
        notes: 'CalloutSection shows icon placeholder when no logo.src is set.',
      })
    }
  }
}

scanCalloutSections(path.join(CONTENT, 'services.json'), 'ipd', 'Inpatient Department (IPD)', '/services/ipd')
scanCalloutSections(path.join(CONTENT, 'patient-welfare.json'), null, null, null)

// --- Build markdown ---

const allDeptImages = walkImages(DEPT_IMAGES_ROOT)

const statusOrder = {
  PLACEHOLDER: 0,
  UI_PLACEHOLDER: 1,
  ILLUSTRATION: 2,
  MISSING: 3,
  MISSING_ASSET: 4,
  STOCK: 5,
  GENERIC_REUSE: 6,
  CURRENT: 7,
}

const grouped = new Map()
for (const slot of slots.sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9))) {
  if (!grouped.has(slot.category)) grouped.set(slot.category, [])
  grouped.get(slot.category).push(slot)
}

const lines = []
lines.push('# Required Website Images — Selection Worksheet')
lines.push('')
lines.push(`Generated: ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`)
lines.push('')
lines.push('**Purpose:** Every image slot on the website that needs a final photograph (or QR asset).')
lines.push('**Excluded:** Home page hero slider only (`HomeHeroSlider`).')
lines.push('**Also excluded from photo candidates:** Site logo, compliance logos, Meezan bank logo.')
lines.push('')
lines.push('## How to use')
lines.push('')
lines.push('1. For each slot below, review the **candidate images** from `C:\\hijaz-content-2026\\departments zip\\Department`.')
lines.push('2. Mark your **FINAL CHOICE** in the checkbox column (or note the filename).')
lines.push('3. Status key:')
lines.push('   - `PLACEHOLDER` — explicit CMS placeholder, no image yet')
lines.push('   - `UI_PLACEHOLDER` — hardcoded empty photo slot in React component')
lines.push('   - `ILLUSTRATION` — illustration preset, should become real photo')
lines.push('   - `STOCK` — temporary Pexels stock photo')
lines.push('   - `GENERIC_REUSE` — real file but shared/generic across many pages')
lines.push('   - `CURRENT` — has an image path; review and replace with final hospital photography')
lines.push('   - `MISSING` / `MISSING_ASSET` — no image (doctors, QR codes)')
lines.push('')
lines.push('## Summary')
lines.push('')
lines.push(`| Metric | Count |`)
lines.push(`|--------|-------|`)
lines.push(`| Total image slots | ${slots.length} |`)
for (const [status, count] of Object.entries(
  slots.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1
    return acc
  }, {}),
).sort((a, b) => (statusOrder[a[0]] ?? 9) - (statusOrder[b[0]] ?? 9))) {
  lines.push(`| ${status} | ${count} |`)
}
lines.push(`| Candidate source images indexed | ${allDeptImages.length} |`)
lines.push('')

let slotNum = 0
for (const [category, items] of grouped) {
  lines.push(`---`)
  lines.push('')
  lines.push(`## ${category} (${items.length})`)
  lines.push('')

  for (const slot of items) {
    slotNum++
    const keywords =
      slot.keywords.length > 0
        ? slot.keywords
        : SLOT_KEYWORDS[slot.id.split('-').pop()] || [slot.page]

    let candidates
    if (slot.aspect === 'portrait' && (slot.page.startsWith('Dr.') || slot.category.includes('portrait') || slot.category.includes('Doctors'))) {
      candidates = doctorCandidates(slot.page)
      if (candidates.length === 0) candidates = getCandidates(keywords, 'portrait')
    } else if (slot.status === 'MISSING_ASSET') {
      candidates = []
    } else {
      candidates = getCandidates(keywords, slot.aspect)
    }

    if (candidates.length === 0 && slot.status !== 'MISSING_ASSET') {
      candidates = getCandidates(['ground floor', 'hospital', 'visitor', 'opening'], slot.aspect, 5)
    }

    lines.push(`### ${slotNum}. ${slot.page}`)
    lines.push('')
    lines.push(`| Field | Value |`)
    lines.push(`|-------|-------|`)
    lines.push(`| **ID** | \`${slot.id}\` |`)
    lines.push(`| **URL** | ${slot.url} |`)
    lines.push(`| **Slot** | ${slot.slot} |`)
    lines.push(`| **Aspect** | ${slot.aspect} (prefer \`_${slot.aspect === 'portrait' ? 'ver' : slot.aspect === 'card' ? 'sq' : 'hor'}_\` crops where available) |`)
    lines.push(`| **Status** | ${slot.status} |`)
    if (slot.current) lines.push(`| **Current** | \`${slot.current}\` |`)
    if (slot.notes) lines.push(`| **Notes** | ${slot.notes} |`)
    lines.push(`| **FINAL CHOICE** | _[ mark here ]_ |`)
    lines.push('')
    lines.push('**Candidate images:**')
    lines.push('')
    if (candidates.length === 0) {
      lines.push('_No matching candidates in department folder — provide asset separately (e.g. QR code scan, official portrait)._')
    } else {
      for (const [i, rel] of candidates.entries()) {
        lines.push(`${i + 1}. [ ] \`${rel}\``)
      }
    }
    lines.push('')
  }
}

fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf8')
console.log(`Wrote ${OUTPUT}`)
console.log(`Slots: ${slots.length}`)
console.log(`Dept images indexed: ${allDeptImages.length}`)
