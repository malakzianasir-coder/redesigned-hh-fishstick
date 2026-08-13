import fs from 'node:fs'

const files = [
  'content/donate.json',
  'content/donations.json',
  'content/how-to-donate.json',
  'content/what-you-can-support.json',
]

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function scan(obj, trail, file, acc) {
  if (!obj || typeof obj !== 'object') return
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => scan(v, `${trail}[${i}]`, file, acc))
    return
  }
  const k = obj.kicker
  const t = obj.title || obj.heading
  if (k && t && norm(k) === norm(t)) {
    acc.push(`${file} ${trail}: kicker/title = ${JSON.stringify(k)}`)
  }
  for (const [key, val] of Object.entries(obj)) {
    scan(val, trail ? `${trail}.${key}` : key, file, acc)
  }
}

for (const f of files) {
  const acc = []
  scan(JSON.parse(fs.readFileSync(f, 'utf8')), '', f, acc)
  console.log('\n' + f)
  ;[...new Set(acc)].forEach((x) => console.log(' ', x))
  if (!acc.length) console.log('  (none)')
}
