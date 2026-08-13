/**
 * Fail on content anti-patterns for in-scope JSON.
 * Exempt: doctors.json, lab-tests.json
 *
 * Run: node scripts/check-content-repetition.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SKIP = new Set(['doctors.json', 'lab-tests.json'])
const issues = []

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (ent.name.endsWith('.json') && !SKIP.has(ent.name)) out.push(p)
  }
  return out
}

function checkObj(obj, file, trail) {
  if (!obj || typeof obj !== 'object') return
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => checkObj(v, file, `${trail}[${i}]`))
    return
  }

  const kicker = obj.kicker
  const title = obj.title || obj.heading
  if (kicker && title && norm(kicker) === norm(title)) {
    issues.push(`${file} ${trail}: kicker === title/heading (${JSON.stringify(kicker)})`)
  }

  if (obj.quote && obj.excerpt && String(obj.quote).trim() && String(obj.excerpt).trim()) {
    // Only flag hero-like objects (have title + media or links) or explicit hero path
    if (obj.title || trail.endsWith('.hero') || trail.includes('.hero')) {
      issues.push(`${file} ${trail}: hero has both quote and excerpt`)
    }
  }

  if (obj.description && obj.excerpt && norm(obj.description) === norm(obj.excerpt)) {
    issues.push(`${file} ${trail}: description === excerpt`)
  }

  if (obj.description && obj.hero?.excerpt && norm(obj.description) === norm(obj.hero.excerpt)) {
    issues.push(`${file} ${trail}: description === hero.excerpt`)
  }

  if (obj.heading && Array.isArray(obj.body) && obj.body[0] && norm(obj.body[0]) === norm(obj.heading)) {
    issues.push(`${file} ${trail}: heading === first body paragraph`)
  }

  if (obj.type === 'serviceGroups' && Array.isArray(obj.groups) && obj.heading) {
    for (const [i, group] of obj.groups.entries()) {
      if (group?.heading && norm(group.heading) === norm(obj.heading)) {
        issues.push(
          `${file} ${trail}.groups[${i}]: group.heading === section.heading (${JSON.stringify(group.heading)})`,
        )
      }
    }
  }

  for (const [key, val] of Object.entries(obj)) {
    checkObj(val, file, trail ? `${trail}.${key}` : key)
  }
}

for (const abs of walk(path.join(ROOT, 'content'))) {
  const rel = path.relative(ROOT, abs).replace(/\\/g, '/')
  try {
    checkObj(JSON.parse(fs.readFileSync(abs, 'utf8')), rel, '')
  } catch (e) {
    issues.push(`${rel}: parse error ${e.message}`)
  }
}

if (issues.length) {
  console.error(`Found ${issues.length} content repetition issue(s):\n`)
  issues.forEach((i) => console.error(' -', i))
  process.exit(1)
}

console.log('OK — no in-scope content repetition issues')
