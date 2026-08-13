import fs from 'node:fs'

const log = []

function polishFile(rel) {
  const data = JSON.parse(fs.readFileSync(rel, 'utf8'))
  const items = Array.isArray(data) ? data : [data]
  for (const item of items) {
    if (!item?.hero) continue
    const title = item.hero.title || item.title
    const excerpt = String(item.hero.excerpt || item.excerpt || '')
      .trim()
      .replace(/\.+$/, '')
    const cat = item.category || ''
    const desc = item.description || ''
    const mangled = / at Hijaz Hospital\.?$/i.test(desc) && desc.includes(`${title}:`)
    const same = desc.trim().toLowerCase() === String(item.hero.excerpt || '').trim().toLowerCase()
    if (mangled || same || !desc) {
      const next = cat
        ? `${title} — ${excerpt}. Part of ${cat} at Hijaz Hospital.`
        : `${title} at Hijaz Hospital — ${excerpt}.`
      if (next !== desc) {
        log.push({ file: rel, slug: item.slug || title, before: desc, after: next })
        item.description = next
      }
    }
  }
  fs.writeFileSync(rel, JSON.stringify(data, null, 2) + '\n')
}

for (const f of ['content/services.json', 'content/departments.json', 'content/patient-welfare.json']) {
  polishFile(f)
}

const rows = log.map(
  (r) =>
    `| \`${r.file}\` | \`${r.slug}.description\` | ${r.before.replace(/\|/g, '\\|').slice(0, 120)} | ${r.after.replace(/\|/g, '\\|')} | voice polish SEO |`,
)
fs.appendFileSync(
  'CONTENT-CHANGELOG.md',
  [
    '',
    '## SEO description polish',
    '',
    '| Page / file | Element path | Before | After | Note |',
    '| --- | --- | --- | --- | --- |',
    ...rows,
    '',
  ].join('\n'),
)

console.log('polished', log.length)
console.log(log[0])
