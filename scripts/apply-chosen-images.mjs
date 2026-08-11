/**
 * Copy chosen department photos into public/media and wire content JSON.
 * Based on temp-required-images-inventory.md selections.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = 'C:\\hijaz-content-2026\\departments zip\\Department'
const MEDIA = path.join(ROOT, 'public', 'media')
const CONTENT = path.join(ROOT, 'content')

function copy(relSrc, destName) {
  const from = path.join(SRC, relSrc)
  const to = path.join(MEDIA, destName)
  if (!fs.existsSync(from)) throw new Error(`Missing source: ${from}`)
  fs.copyFileSync(from, to)
  console.log(`copy ${destName}`)
  return `/media/${destName}`
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(CONTENT, file), 'utf8'))
}

function writeJson(file, data) {
  fs.writeFileSync(path.join(CONTENT, file), JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`write ${file}`)
}

// --- Copy assets with stable site names ---
const assets = {
  'general-surgery-department-banner.webp': '3rd Floor/GOT/_hor/DSC_0075.webp',
  'orthopedics-department-banner.webp': '3rd Floor/Dental Unit/_hor/DSC09947.webp',
  'urology-department-banner.webp': '2nd Floor/Dialysis Ward/_hor/DSC_3635.webp',
  'plastic-reconstructive-surgery-department-banner.webp': '3rd Floor/GOT/_hor/DSC_0075.webp',
  'ophthalmology-department-banner.webp': '3rd Floor/Eye/_hor/DSC_4304.webp',
  'ent-ear-nose-throat-department-banner.webp': 'Department/_hor/DSC08856.webp',
  'dentistry-department-banner.webp': '3rd Floor/Dental Unit/_hor/DSC09945.webp',
  'general-medicine-department-banner.webp': 'Ground Floor/Waiting Area/_hor/DSC_9541.webp',
  'gastroenterology-department-banner.webp': 'Department/_hor/DSC08860.webp',
  'nephrology-department-banner.webp': '2nd Floor/Dialysis Ward/_hor/DSC_3639.webp',
  'cardiology-department-banner.webp': 'Ground Floor/Cardiologist/_hor/DSC09983.webp',
  'pulmonology-department-banner.webp': '2nd Floor/Male Ward/_hor/DSC_3624.webp',
  'endocrinology-department-banner.webp': 'Department/_hor/DSC08868.webp',
  'dermatology-department-banner.webp': 'Department/_hor/DSC08891.webp',
  'gynaecology-obstetrics-department-banner.webp': '1st Floor/Gynae Theater/_hor/DSC_8747.webp',
  'pediatrics-neonatology-department-banner.webp': 'Ground Floor/Peads Ward/_hor/NIKON D5100238.webp',
  'dietetics-nutrition-department-banner.webp': '3rd Floor/Waiting Area/_hor/DSC_8993.webp',
  'physiotherapy-rehabilitation-department-banner.webp': '2nd Floor/Physio/_hor/DSC09966.webp',

  'opd-service-banner.webp': '3rd Floor/Waiting Area/_hor/DSC_8993.webp',
  'ipd-service-banner.webp': '2nd Floor/Male Ward/_hor/DSC09971.webp',
  'icu-service-banner.webp': '3rd Floor/ICU/_hor/DSC_8760.webp',
  'emergency-service-banner.webp': 'Ground Floor/Emergency/_hor/DSC_4071.webp',
  'ot-complex-service-banner.webp': '3rd Floor/GOT/_hor/DSC_8991.webp',
  'nursing-service-banner.webp': 'Department/_hor/DSC08848.webp',
  'anesthesia-service-banner.webp': '3rd Floor/ICU/_hor/DSC_8764.webp',
  'ambulance-service-banner.webp': '3rd Floor/ICU/_hor/DSC_8771.webp',
  'dialysis-service-banner.webp': '2nd Floor/Dialysis Ward/_hor/DSC_3487.webp',
  'pharmacy-service-banner.webp': 'Basement/Pharmacy/_hor/DSC09998.webp',
  'blood-bank-service-banner.webp': 'Basement/Blood Bank/_hor/bb pic copy.webp',
  'pathology-service-banner.webp': 'Basement/Lab/_hor/lab1.webp',
  'radiology-service-banner.webp': 'Basement/X-Ray/_hor/DSC00033.webp',
  'cardiac-diagnostics-service-banner.webp': 'Basement/ultrasound/_hor/DSC00021.webp',

  'our-purpose-philosophy.webp': '2nd Floor/Dialysis Ward/_hor/DSC_3487.webp',
  'our-impact-hero-banner.webp': '2nd Floor/Male Ward/_hor/DSC09971.webp',
  'medical-tower.webp': 'I.T.W Inam Tasneem Waheed Medical Tower/_hor/2.0.webp',
  'our-supporters-hero-banner.webp': 'Visitors/M. Ali Youtuh Club/_hor/20221019_102519.webp',

  'general-surgery-content-banner.webp': '3rd Floor/GOT/_hor/DSC_0075.webp',
  'dialysis-care-unit-content-banner.webp': '2nd Floor/Dialysis Ward/_hor/DSC_3487.webp',
  'Physiotherapy-1.webp': '2nd Floor/Physio/_hor/DSC09966.webp',

  'home-story-dialysis.webp': '2nd Floor/Dialysis Ward/_hor/DSC_3635.webp',
  'home-story-emergency.webp': 'Ground Floor/Emergency/_hor/DSC_4050.webp',
  'home-story-nursery.webp': '1st Floor/Nursery/_hor/DSC_9664.webp',

  'ultraSound.webp': 'Basement/ultrasound/_hor/DSC00020.webp',
  'x-rays.webp': 'Basement/X-Ray/_hor/DSC00032.webp',
  'Dialysis.webp': '2nd Floor/Dialysis Ward/_hor/DSC_9093.webp',
  'anesthesiology-details-banner.webp': '3rd Floor/ICU/_hor/DSC_8768.webp',
  'laboratory-content-banner.webp': 'Basement/Lab/_hor/lab4.webp',

  'news-dialysis.webp': '2nd Floor/Dialysis Ward/_hor/DSC_9086.webp',
  'news-emergency.webp': 'Ground Floor/Emergency/_hor/DSC_4040.webp',
  'news-visitors.webp': 'Visitors/Mufti Tariq Masood/_hor/DSC_0638.webp',
  'news-opening-peads.webp': 'Opening peads/_hor/C0209.MP4.07_27_35_44.Still001.webp',
  'news-gynae.webp': '1st Floor/Gynae Theater/_hor/DSC_8744.webp',
  'news-icu.webp': '3rd Floor/ICU/_hor/DSC_9537.webp',
}

for (const [dest, src] of Object.entries(assets)) {
  copy(src, dest)
}

// Faculty portraits — copy with URL-safe names where needed; existing Dr.* files already in media
const facultyMap = [
  ['dr-faisal-farrukh-rana', 'Dr. Faisal Farrukh Rana (Consultant Anesthetist).webp'],
  ['dr-mehmood-ul-hassan', 'Dr. Mahmood Ul Hassan (Consultant Anesthetist).webp'],
  ['dr-najam-us-saher', 'Dr. Najam U Sehar (Consultant Anesthetist).webp'],
  ['dr-nighat-yasmin', 'Dr. Nighat Yasim (Consultant Anesthetist).webp'],
  ['dr-sheikh-ziarat-ali', 'Dr. Sheikh Ziyarat Ali (Consultant Anesthetist).webp'],
  ['dr-aftab-ahmad-tarique', 'Dr. Aftab Ahmad Tarique (Cardiologist).webp'],
  ['dr-fawad-tariq', 'Dr. Fawad Tariq (Dental Surgeon).webp'],
  ['dr-muhammad-hamza-khan', 'Dr. Muhammad Hamza Khan (Dental Surgeon).webp'],
  ['dr-damish-arsalan', 'Dr. Damish Arsalan (ENT Surgeon).webp'],
  ['dr-agha-nasarullah-khan', 'Dr. Agha Nasarullah Khan (Dermatologist).webp'],
  ['dr-ahsan-masud-chaudhry', 'Dr. Ahsan Masud Chaudhry (General Surgeon).webp'],
  ['dr-asad-ullah-khawaja', 'Dr. Asad Ullah Khawaja (General Surgeon).webp'],
  ['dr-faraukh-shahzad', 'Dr. Faraukh Shahzad (General Surgeon).webp'],
  ['dr-wajahat-amir', 'Dr. Wajahat Amir (General Surgeon).webp'],
  ['dr-ambreen-ijaz', 'Dr. Ambreen Ijaz (Gynacologist).webp'],
  ['dr-ambreen-rafique', 'Dr. Ambreen Rafique (Gynacologist).webp'],
  ['dr-nadeem-iqbal', 'Dr. Nadeem Iqbal (Medical Specialist).webp'],
  ['dr-jawad-bin-yamin', 'Dr. Jawad bin Yamin (Ophthalmologist).webp'],
  ['dr-maqsoob-ahmed', 'Dr. Maqsoob Ahmed (Orthopedic Surgeon).webp'],
  ['dr-muhammad-afaq', 'Dr. Muhammad Afaq (Orthopedic Surgeon).webp'],
  ['dr-fozia-sharif', 'Dr. Fozia Sharif (Consultant Pediatric).webp'],
  ['dr-hassan-ali-sarwar', 'Dr. Hassan Ali Sarwar ( Consultant Pediatric).webp'],
  ['dr-riffat-nazer', 'Dr. Riffat Nazer (Physiotherapist).webp'],
  ['dr-jamil-akhter', 'Dr. Jamil Akhter (Radiologist).webp'],
  ['dr-najma-naeem', 'Dr. Najma Naeem (Sonologist).webp'],
  ['dr-sara-salman', 'Dr. Sara Salman (Sonologist).webp'],
  ['dr-wajid-ali', 'Dr. Wajid Ali (Urologist).webp'],
  ['dr-moeena-baig', 'Dr. Moeena Baig (Nutrionist).webp'],
  ['dr-hashmat-rao', 'Dr. Hashmat Rao (Hemagologist).webp'],
]

const doctorImageBySlug = {}
for (const [slug, file] of facultyMap) {
  const src = path.join(SRC, 'Our faculty', '_sq', file)
  // Public media may already have slightly different spellings
  const existingVariants = [
    file,
    file.replace('Damish', 'Danish'),
    file.replace('Faraukh', 'Farukh'),
    file.replace('Maqsoob', 'Maqsood'),
  ]
  let destFile = null
  for (const v of existingVariants) {
    if (fs.existsSync(path.join(MEDIA, v))) {
      destFile = v
      break
    }
  }
  if (!destFile && fs.existsSync(src)) {
    destFile = file
    fs.copyFileSync(src, path.join(MEDIA, destFile))
    console.log(`copy faculty ${destFile}`)
  }
  if (destFile) {
    doctorImageBySlug[slug] = `/media/${destFile}`
  } else {
    console.warn(`No faculty image for ${slug} (${file})`)
  }
}

// --- Update departments ---
const departments = readJson('departments.json')
const deptSrc = {
  'general-surgery': '/media/general-surgery-department-banner.webp',
  orthopedics: '/media/orthopedics-department-banner.webp',
  urology: '/media/urology-department-banner.webp',
  'plastic-reconstructive-surgery': '/media/plastic-reconstructive-surgery-department-banner.webp',
  ophthalmology: '/media/ophthalmology-department-banner.webp',
  'ent-ear-nose-throat': '/media/ent-ear-nose-throat-department-banner.webp',
  dentistry: '/media/dentistry-department-banner.webp',
  'general-medicine': '/media/general-medicine-department-banner.webp',
  gastroenterology: '/media/gastroenterology-department-banner.webp',
  nephrology: '/media/nephrology-department-banner.webp',
  cardiology: '/media/cardiology-department-banner.webp',
  pulmonology: '/media/pulmonology-department-banner.webp',
  endocrinology: '/media/endocrinology-department-banner.webp',
  dermatology: '/media/dermatology-department-banner.webp',
  'gynaecology-obstetrics': '/media/gynaecology-obstetrics-department-banner.webp',
  'pediatrics-neonatology': '/media/pediatrics-neonatology-department-banner.webp',
  'dietetics-nutrition': '/media/dietetics-nutrition-department-banner.webp',
  'physiotherapy-rehabilitation': '/media/physiotherapy-rehabilitation-department-banner.webp',
}
for (const d of departments) {
  if (deptSrc[d.slug] && d.hero?.media) {
    d.hero.media = { type: 'image', src: deptSrc[d.slug], alt: d.title }
  }
}
writeJson('departments.json', departments)

// --- Update services ---
const services = readJson('services.json')
const svcSrc = {
  opd: '/media/opd-service-banner.webp',
  ipd: '/media/ipd-service-banner.webp',
  icu: '/media/icu-service-banner.webp',
  emergency: '/media/emergency-service-banner.webp',
  'ot-complex': '/media/ot-complex-service-banner.webp',
  nursing: '/media/nursing-service-banner.webp',
  anesthesia: '/media/anesthesia-service-banner.webp',
  ambulance: '/media/ambulance-service-banner.webp',
  dialysis: '/media/dialysis-service-banner.webp',
  pharmacy: '/media/pharmacy-service-banner.webp',
  'blood-bank': '/media/blood-bank-service-banner.webp',
  pathology: '/media/pathology-service-banner.webp',
  radiology: '/media/radiology-service-banner.webp',
  'cardiac-diagnostics': '/media/cardiac-diagnostics-service-banner.webp',
  // cafeteria stays generic until photo available
}
for (const s of services) {
  if (svcSrc[s.slug] && s.hero?.media) {
    s.hero.media = { type: 'image', src: svcSrc[s.slug], alt: s.title }
  }
}
writeJson('services.json', services)

// --- About ---
const ourPurpose = readJson('our-purpose.json')
ourPurpose.hero.media = {
  type: 'image',
  src: '/media/476945069_970781975161220_6789087496260085071_n.webp',
  alt: 'Hijaz Hospital — Our Purpose',
}
ourPurpose.philosophy.image = '/media/our-purpose-philosophy.webp'
writeJson('our-purpose.json', ourPurpose)

const ourImpact = readJson('our-impact.json')
ourImpact.hero.media = {
  type: 'image',
  src: '/media/our-impact-hero-banner.webp',
  alt: 'Our Impact at Hijaz Hospital',
}
ourImpact.medicalTower.image = '/media/medical-tower.webp'
delete ourImpact.medicalTower.placeholderLabel
// Highlights — replace reused news banners with clinical where possible
if (ourImpact.highlights?.length) {
  const highlightImgs = [
    '/media/news-visitors.webp',
    '/media/news-opening-peads.webp',
    '/media/news-dialysis.webp',
  ]
  ourImpact.highlights.forEach((h, i) => {
    h.image = highlightImgs[i % highlightImgs.length]
  })
}
writeJson('our-impact.json', ourImpact)

const ourSupporters = readJson('our-supporters.json')
ourSupporters.hero.media = {
  type: 'image',
  src: '/media/our-supporters-hero-banner.webp',
  alt: 'Friends and supporters of Hijaz Hospital',
}
writeJson('our-supporters.json', ourSupporters)

// --- Doctors ---
const doctors = readJson('doctors.json')
for (const doc of doctors.doctors) {
  if (doctorImageBySlug[doc.slug]) {
    doc.image = doctorImageBySlug[doc.slug]
  }
}
writeJson('doctors.json', doctors)

// --- Home ---
const home = readJson('home.json')
if (home.services?.cards) {
  for (const card of home.services.cards) {
    if (card.title === 'General Surgery') card.image = '/media/general-surgery-content-banner.webp'
    if (card.title === 'Dialysis Care Unit') card.image = '/media/dialysis-care-unit-content-banner.webp'
    if (card.title === 'Physiotherapy') card.image = '/media/Physiotherapy-1.webp'
  }
}
if (home.founders?.cards) {
  home.founders.cards[0].image = '/media/inam-elahi-asar.jpg'
  if (home.founders.cards[1]) home.founders.cards[1].image = '/media/mian-abdul-waheed.jpg'
}
if (home.stories?.items) {
  const storyImgs = [
    '/media/home-story-dialysis.webp',
    '/media/home-story-emergency.webp',
    '/media/home-story-nursery.webp',
  ]
  home.stories.items.forEach((item, i) => {
    item.image = storyImgs[i % storyImgs.length]
  })
}
if (home.team?.doctors) {
  // Map home team to faculty where possible; leave missing as placeholder
  for (const member of home.team.doctors) {
    if (member.name === 'Dr. Nadeem Iqbal' && doctorImageBySlug['dr-nadeem-iqbal']) {
      member.image = doctorImageBySlug['dr-nadeem-iqbal']
    }
    // Prefer matching specialty faculty for demos when names aren't in pack
    if (member.name === 'Dr. Sana Malik' && doctorImageBySlug['dr-ambreen-ijaz']) {
      // Don't substitute wrong person — leave placeholder
    }
  }
}
if (home.news?.items) {
  const newsImgs = [
    '/media/news-opening-peads.webp',
    '/media/news-visitors.webp',
    '/media/news-icu.webp',
    '/media/news-visitors.webp',
    '/media/news-dialysis.webp',
  ]
  home.news.items.forEach((item, i) => {
    if (!item.image || item.image.includes('pexels') || item.image.includes('first-news') || item.image.includes('news-two') || item.image.includes('event-one')) {
      item.image = newsImgs[i % newsImgs.length]
    }
    if (!item.image) item.image = newsImgs[i % newsImgs.length]
  })
}
if (home.machinery?.slides) {
  home.machinery.slides = [
    { src: '/media/Dialysis.webp', title: 'Dialysis Machine', href: '/services/dialysis' },
    { src: '/media/ultraSound.webp', title: 'Ultrasound', href: '/services/radiology' },
    { src: '/media/x-rays.webp', title: 'Digital X-Ray', href: '/services/radiology' },
    { src: '/media/anesthesiology-details-banner.webp', title: 'ICU Monitoring', href: '/services/icu' },
    { src: '/media/dialysis-care-unit-content-banner.webp', title: 'Dialysis Care Unit', href: '/services/dialysis' },
    { src: '/media/laboratory-content-banner.webp', title: 'Laboratory', href: '/services/pathology' },
    { src: '/media/icu-service-banner.webp', title: 'Critical Care', href: '/services/icu' },
    { src: '/media/cardiac-diagnostics-service-banner.webp', title: 'Cardiac Diagnostics', href: '/services/cardiac-diagnostics' },
  ]
}
writeJson('home.json', home)

// --- News / events / success stories ---
const news = readJson('news.json')
const newsPool = [
  '/media/news-opening-peads.webp',
  '/media/news-visitors.webp',
  '/media/news-dialysis.webp',
  '/media/news-emergency.webp',
  '/media/news-gynae.webp',
  '/media/news-icu.webp',
]
;(news.articles || []).forEach((a, i) => {
  const stock = !a.heroImage || a.heroImage.includes('pexels') || a.heroImage.includes('first-news') || a.heroImage.includes('news-two') || a.heroImage.includes('event-one') || a.heroImage.includes('Dialysis.webp')
  if (stock) a.heroImage = newsPool[i % newsPool.length]
  if (Array.isArray(a.content)) {
    for (const block of a.content) {
      if (block.type === 'image' && block.image && (String(block.image).includes('pexels') || stock)) {
        block.image = a.heroImage
      }
    }
  }
})
writeJson('news.json', news)

const events = readJson('events.json')
;(events.hospitalEvents || []).forEach((e, i) => {
  const stock = !e.heroImage || e.heroImage.includes('pexels') || e.heroImage.includes('first-news') || e.heroImage.includes('news-two') || e.heroImage.includes('event-one')
  if (stock) e.heroImage = newsPool[i % newsPool.length]
  if (Array.isArray(e.content)) {
    for (const block of e.content) {
      if (block.type === 'image' && block.image && (String(block.image).includes('pexels') || stock)) {
        block.image = e.heroImage
      }
    }
  }
})
writeJson('events.json', events)

const stories = readJson('success-stories.json')
const storyPool = [
  '/media/home-story-emergency.webp',
  '/media/home-story-dialysis.webp',
  '/media/news-gynae.webp',
  '/media/ot-complex-service-banner.webp',
  '/media/home-story-nursery.webp',
  '/media/news-visitors.webp',
  '/media/dialysis-service-banner.webp',
  '/media/news-icu.webp',
  '/media/emergency-service-banner.webp',
]
;(stories.stories || []).forEach((s, i) => {
  const img = storyPool[i % storyPool.length]
  s.thumbnail = img
  if (Array.isArray(s.articleContent)) {
    for (const block of s.articleContent) {
      if (block.type === 'image') block.image = img
    }
  }
})
writeJson('success-stories.json', stories)

// Profile founder image if present
const profilePath = path.join(CONTENT, 'profiles', 'inam-elahi-asar.json')
if (fs.existsSync(profilePath)) {
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'))
  profile.image = '/media/inam-elahi-asar.jpg'
  fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2) + '\n', 'utf8')
  console.log('write profiles/inam-elahi-asar.json')
}

console.log('Done.')
