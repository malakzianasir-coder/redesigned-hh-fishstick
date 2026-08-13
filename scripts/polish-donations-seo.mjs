import fs from 'node:fs'

const data = JSON.parse(fs.readFileSync('content/donations.json', 'utf8'))
const log = []

const seo = {
  zakat: 'Give Zakat to Hijaz Hospital Trust — Shariah-compliant support that funds care for eligible patients.',
  general: 'Make a general donation to Hijaz Hospital Trust and help provide treatment for patients who cannot afford care.',
  sadaqah: 'Give Sadaqah through Hijaz Hospital Trust — voluntary charity that brings healing and hope to those in need.',
  'eidi-fitrana': 'Share Eidi and Fitrana with Hijaz Hospital Trust to support patients during Ramadan and Eid.',
  'donate-a-meal': 'Donate a meal at Hijaz Hospital — fund nutritious meals for patients and attendants.',
  'donate-in-kind': 'Donate medicines, equipment, and supplies in kind to support patient care at Hijaz Hospital.',
  'sponsor-a-patient': 'Sponsor a patient’s treatment at Hijaz Hospital Trust — dialysis, surgery, maternity, and more.',
  'sponsor-free-surgeries': 'Sponsor free surgeries at Hijaz Hospital so deserving patients can receive life-changing operations.',
  'support-a-project': 'Support a capital or development project at Hijaz Hospital Trust and help expand care for the community.',
}

for (const item of data) {
  const next = seo[item.slug]
  if (next && item.description !== next) {
    log.push([item.slug, item.description, next])
    item.description = next
  }
}

fs.writeFileSync('content/donations.json', JSON.stringify(data, null, 2) + '\n')
const rows = log.map(
  ([slug, b, a]) =>
    `| \`content/donations.json\` | \`${slug}.description\` | ${b.replace(/\|/g, '\\|')} | ${a.replace(/\|/g, '\\|')} | voice polish SEO |`,
)
fs.appendFileSync(
  'CONTENT-CHANGELOG.md',
  '\n## Donations SEO polish\n\n| Page / file | Element path | Before | After | Note |\n| --- | --- | --- | --- | --- |\n' +
    rows.join('\n') +
    '\n',
)
console.log('donations polished', log.length)
