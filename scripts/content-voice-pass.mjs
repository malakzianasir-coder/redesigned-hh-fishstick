/**
 * One-shot content voice / anti-repetition pass.
 * - Never changes hero.title
 * - Skips doctors.json and lab-tests.json
 * - Merges hero.quote + hero.excerpt into one excerpt where both exist
 * - Differentiates description from hero.excerpt / card excerpt
 * - Fixes section kicker === heading (shortens kicker to role word when possible)
 * - Appends rows to CONTENT-CHANGELOG.md
 *
 * Run: node scripts/content-voice-pass.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const CHANGELOG = path.join(ROOT, 'CONTENT-CHANGELOG.md')
const SKIP = new Set(['doctors.json', 'lab-tests.json'])

const logRows = []

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function log(file, elementPath, before, after, note) {
  if (before === after) return
  logRows.push({ file, elementPath, before, after, note })
}

function roleKickerFromHeading(heading) {
  const h = String(heading || '').trim()
  const rules = [
    [/timings?/i, 'Timings'],
    [/^overview$/i, 'Overview'],
    [/why choose/i, 'Why Choose Us'],
    [/our (pathology|radiology|cardiac|nursing|pharmacy|blood bank|surgical|ent|urology|ophthalmology)/i, 'Services'],
    [/services$/i, 'Services'],
    [/facilities/i, 'Facilities'],
    [/quality/i, 'Quality'],
    [/team$/i, 'Our Team'],
    [/accessible|affordable|commitment|support for|accessing/i, 'Access'],
    [/specialized|advanced technology|evaluating/i, 'Care'],
    [/nursing services|pharmacy services|blood bank services|surgical services/i, 'Services'],
    [/^our commitment$/i, 'Commitment'],
  ]
  for (const [re, role] of rules) {
    if (re.test(h)) return role
  }
  // Generic: first word or short label
  if (h.length > 28) {
    const first = h.split(/[&—\-:]/)[0].trim()
    if (first && first.length < 24) return first
  }
  return 'Section'
}

/** Prefer fuller patient-facing line when merging quote + excerpt */
function mergeQuoteExcerpt(quote, excerpt) {
  const q = (quote || '').trim()
  const e = (excerpt || '').trim()
  if (!q) return e
  if (!e) return q.replace(/\.+$/, '.')
  // If nearly the same idea, prefer the longer/more specific
  const qn = norm(q).replace(/[.,]/g, '')
  const en = norm(e).replace(/[.,]/g, '')
  if (qn === en || qn.includes(en) || en.includes(qn)) {
    return e.length >= q.length ? e : q.endsWith('.') ? q : `${q}.`
  }
  // Distinct: keep excerpt (body), drop slogan quote
  return e
}

function seoFromExcerpt(title, excerpt, category) {
  const e = (excerpt || '').trim().replace(/\.$/, '')
  const cat = category ? ` ${category} at Hijaz Hospital.` : ' at Hijaz Hospital.'
  // Avoid identical: add institutional framing for meta
  return `${title}: ${e}${e.toLowerCase().includes('hijaz') ? '' : cat}`.replace(/\.\s*\./, '.')
}

function uniqueHeroExcerpt(title, excerpt, description) {
  // If excerpt equals description, polish excerpt toward patient benefit (light touch)
  let e = (excerpt || '').trim()
  if (!e && description) e = String(description).trim()
  return e
}

function processHero(hero, ctx, file, basePath) {
  if (!hero || typeof hero !== 'object') return
  const beforeQuote = hero.quote
  const beforeExcerpt = hero.excerpt
  if (hero.quote && hero.excerpt) {
    const merged = mergeQuoteExcerpt(hero.quote, hero.excerpt)
    log(file, `${basePath}.quote`, beforeQuote, '(removed)', 'hero quote+excerpt merged')
    log(file, `${basePath}.excerpt`, beforeExcerpt, merged, 'hero quote+excerpt merged')
    delete hero.quote
    hero.excerpt = merged
  } else if (hero.quote && !hero.excerpt) {
    // Keep scripture-style alone on donate; for services move to excerpt
    if (ctx.preferExcerpt) {
      log(file, `${basePath}.quote`, hero.quote, '(moved to excerpt)', 'hero quote→excerpt')
      hero.excerpt = hero.quote
      delete hero.quote
    }
  }
  if (ctx.forceExcerptVariantQuote) {
    if (hero.excerptVariant !== 'quote') {
      log(file, `${basePath}.excerptVariant`, hero.excerptVariant || '(none)', 'quote', 'Patient Care quote-style hero')
      hero.excerptVariant = 'quote'
    }
  }
}

function processItem(item, file, basePath, opts = {}) {
  if (!item || typeof item !== 'object') return

  if (item.hero) {
    processHero(item.hero, opts, file, `${basePath}.hero`)
    const desc = item.description
    const hex = item.hero.excerpt
    if (desc && hex && norm(desc) === norm(hex)) {
      const next = seoFromExcerpt(item.hero.title || item.title || 'Page', hex, item.category)
      log(file, `${basePath}.description`, desc, next, 'deduped desc/excerpt')
      item.description = next
    }
  }

  // Top-level excerpt twin of description (patient-welfare cards)
  if (item.description && item.excerpt && norm(item.description) === norm(item.excerpt)) {
    const next = seoFromExcerpt(item.title || 'Page', item.excerpt, item.category)
    log(file, `${basePath}.description`, item.description, next, 'deduped desc/excerpt')
    item.description = next
  }

  if (Array.isArray(item.sections)) {
    item.sections.forEach((section, i) => {
      if (!section || typeof section !== 'object') return
      const sp = `${basePath}.sections[${i}]`
      if (section.kicker && section.heading && norm(section.kicker) === norm(section.heading)) {
        const role = roleKickerFromHeading(section.heading)
        if (norm(role) !== norm(section.kicker)) {
          log(file, `${sp}.kicker`, section.kicker, role, 'kicker kept as section orient')
          section.kicker = role
        } else {
          // heading must change if kicker already is role-like — rare
          const newHeading = `${section.heading} at Hijaz`
          log(file, `${sp}.heading`, section.heading, newHeading, 'deduped kicker/heading')
          section.heading = newHeading
        }
      }
      // Closing quotes that twin hero excerpt
      if (section.quote && item.hero?.excerpt && norm(section.quote) === norm(item.hero.excerpt)) {
        log(file, `${sp}.quote`, section.quote, '(removed — twin of hero excerpt)', 'deduped section quote')
        delete section.quote
      }
    })
  }
}

function walkContentFiles(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walkContentFiles(p, out)
    else if (ent.name.endsWith('.json') && !SKIP.has(ent.name)) out.push(p)
  }
  return out
}

// --- Manual high-quality copy patches (hero.title never changes) ---

const MANUAL = {
  'content/about-us.json': (data) => {
    const patches = [
      ['groups[0].heading', data.groups[0].heading, 'Why Hijaz exists', 'kicker kept as section orient'],
      ['groups[1].heading', data.groups[1].heading, 'Who stewards the Trust', 'kicker kept as section orient'],
      ['groups[2].heading', data.groups[2].heading, 'From our leaders', 'kicker kept as section orient'],
      ['groups[3].heading', data.groups[3].heading, 'Results & recognition', 'kicker kept as section orient'],
    ]
    data.groups[0].heading = 'Why Hijaz exists'
    data.groups[1].heading = 'Who stewards the Trust'
    data.groups[2].heading = 'From our leaders'
    data.groups[3].heading = 'Results & recognition'
    for (const [el, before, after, note] of patches) {
      log('content/about-us.json', el, before, after, note)
    }
    if (norm(data.description) === norm(data.hero.excerpt)) {
      const next =
        'Explore Hijaz Hospital Trust — purpose, leadership, messages, and impact behind care within reach.'
      log('content/about-us.json', 'description', data.description, next, 'deduped desc/excerpt')
      data.description = next
    }
  },
  'content/our-purpose.json': (data) => {
    const nextExcerpt =
      'The vision, journey, and values that keep quality care within reach for every patient who walks through our doors.'
    log('content/our-purpose.json', 'hero.excerpt', data.hero.excerpt, nextExcerpt, 'deduped desc/excerpt')
    data.hero.excerpt = nextExcerpt
    // description can stay as broader SEO meta (already long) — ensure distinct
    if (norm(data.description) === norm(data.hero.excerpt)) {
      const nextDesc =
        'Vision, mission, journey, philosophy, values, and compliance that guide Hijaz Hospital Trust.'
      log('content/our-purpose.json', 'description', data.description, nextDesc, 'deduped desc/excerpt')
      data.description = nextDesc
    }
  },
  'content/leadership.json': (data) => {
    const nextExcerpt =
      'The founders, chairpersons, presidents, and teams who steward Hijaz Hospital’s mission of care within reach.'
    log('content/leadership.json', 'hero.excerpt', data.hero.excerpt, nextExcerpt, 'deduped desc/excerpt')
    data.hero.excerpt = nextExcerpt
  },
  'content/our-impact.json': (data) => {
    // already distinct excerpt vs description in scan for our-impact? description different — skip if ok
    if (norm(data.description) === norm(data.hero.excerpt)) {
      const next =
        'Awards, partnerships, facts, and community programmes that show Hijaz Hospital’s reach.'
      log('content/our-impact.json', 'description', data.description, next, 'deduped desc/excerpt')
      data.description = next
    }
  },
  'content/chairmans-message.json': (data) => {
    const nextExcerpt =
      'A message of gratitude, resolve, and service from the Chairman of Hijaz Hospital Trust.'
    log('content/chairmans-message.json', 'hero.excerpt', data.hero.excerpt, nextExcerpt, 'deduped desc/excerpt')
    data.hero.excerpt = nextExcerpt
  },
  'content/presidents-message.json': (data) => {
    if (!data.hero) return
    const nextExcerpt =
      'A message from the President on clinical excellence, compassion, and care without financial barriers.'
    log('content/presidents-message.json', 'hero.excerpt', data.hero.excerpt, nextExcerpt, 'deduped desc/excerpt')
    data.hero.excerpt = nextExcerpt
  },
  'content/leadership-messages.json': (data) => {
    const nextExcerpt =
      'Letters from the Chairman and the President on the Trust’s call to serve humanity.'
    log('content/leadership-messages.json', 'hero.excerpt', data.hero.excerpt, nextExcerpt, 'deduped desc/excerpt')
    data.hero.excerpt = nextExcerpt
  },
  'content/our-supporters.json': (data) => {
    const nextExcerpt =
      'Friends and partners whose generosity keeps free and subsidised care possible at Hijaz Hospital.'
    log('content/our-supporters.json', 'hero.excerpt', data.hero.excerpt, nextExcerpt, 'deduped desc/excerpt')
    data.hero.excerpt = nextExcerpt
  },
  'content/donate.json': (data) => {
    // Keep Qur'an as sole hero support (quote); remove long excerpt twin idea
    if (data.hero?.quote && data.hero?.excerpt) {
      log('content/donate.json', 'hero.excerpt', data.hero.excerpt, '(removed — quote kept as sole support)', 'hero quote+excerpt merged')
      delete data.hero.excerpt
    }
  },
  'content/thank-you.json': (data) => {
    // thank-you uses top-level quote — leave if no dual
  },
}

function processFile(absPath) {
  const rel = path.relative(ROOT, absPath).replace(/\\/g, '/')
  let data = JSON.parse(fs.readFileSync(absPath, 'utf8'))

  if (MANUAL[rel]) MANUAL[rel](data)

  const isServices = rel.endsWith('services.json')
  const isDepartments = rel.includes('departments')
  const opts = {
    preferExcerpt: isServices || isDepartments,
    forceExcerptVariantQuote: isServices,
  }

  if (Array.isArray(data)) {
    data.forEach((item, i) => processItem(item, rel, `[${i}]`, opts))
  } else {
    processItem(data, rel, '', opts)
    // nested pages in hubs
    if (Array.isArray(data.pages)) data.pages.forEach((p, i) => processItem(p, rel, `pages[${i}]`, opts))
    if (Array.isArray(data.causes)) data.causes.forEach((p, i) => processItem(p, rel, `causes[${i}]`, opts))
    if (Array.isArray(data.methods)) data.methods.forEach((p, i) => processItem(p, rel, `methods[${i}]`, opts))
  }

  // donations.json is array of cause pages
  if (rel.endsWith('donations.json') && Array.isArray(data)) {
    data.forEach((item, i) => {
      if (item.hero?.excerpt && item.description && norm(item.hero.excerpt) === norm(item.description)) {
        // Make hero excerpt the campaign line; description SEO
        const title = item.hero.title || item.title
        const campaign = item.hero.excerpt
        // If description is the short campaign slogan, expand description for SEO and keep excerpt as campaign OR swap
        const nextDesc = `${title} donations to Hijaz Hospital Trust — support deserving patients with Zakat, Sadaqah, and general giving.`
        // Better: keep evocative line as excerpt; rewrite description
        if (campaign.length < 80) {
          log(rel, `[${i}].description`, item.description, nextDesc, 'deduped desc/excerpt')
          item.description = nextDesc
        } else {
          const nextEx = campaign.split('.')[0] + '.'
          if (norm(nextEx) !== norm(item.description)) {
            log(rel, `[${i}].hero.excerpt`, item.hero.excerpt, nextEx, 'deduped desc/excerpt')
            item.hero.excerpt = nextEx
          } else {
            log(rel, `[${i}].description`, item.description, nextDesc, 'deduped desc/excerpt')
            item.description = nextDesc
          }
        }
      }
    })
  }

  fs.writeFileSync(absPath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

const contentDir = path.join(ROOT, 'content')
const files = walkContentFiles(contentDir)
for (const f of files) processFile(f)

// Append changelog
const section = [
  '',
  '## Automated + manual voice pass',
  '',
  '| Page / file | Element path | Before | After | Note |',
  '| --- | --- | --- | --- | --- |',
  ...logRows.map((r) => {
    const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
    return `| \`${r.file}\` | \`${esc(r.elementPath)}\` | ${esc(r.before)} | ${esc(r.after)} | ${esc(r.note)} |`
  }),
  '',
]

fs.appendFileSync(CHANGELOG, section.join('\n'), 'utf8')
console.log(`Updated ${files.length} files; logged ${logRows.length} changes`)
