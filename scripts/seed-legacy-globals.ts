import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding Legacy Site Config...')
  const navData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'navigation.json'), 'utf8'))
  const settingsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'site-settings.json'), 'utf8'))
  const formsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'forms.json'), 'utf8'))

  await payload.updateGlobal({
    slug: 'legacy-site-config',
    data: {
      legacyNavigation: navData,
      legacySettings: settingsData,
      legacyForms: formsData,
    },
  })

  console.log('Seeding Legacy Pages...')
  const pages = [
    'home.json',
    'about-us.json',
    'how-to-donate.json',
    'our-purpose.json',
    'our-impact.json',
    'our-supporters.json',
    'chairmans-message.json',
    'presidents-message.json',
    'patient-welfare-hub.json',
    'donate.json',
    'leadership.json',
    'leadership-messages.json'
  ]

  for (const page of pages) {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', page), 'utf8'))
    try {
      await payload.create({
        collection: 'legacy-pages',
        data: {
          slug: data.slug || page.replace('.json', ''),
          title: data.title || data.hero?.title || data.heading,
          description: data.description || data.hero?.excerpt || data.lede,
          legacyHero: data.hero,
          legacyJumpLinks: data.jumpLinks,
          legacySections: data.sections,
          legacyGroups: data.groups,
          legacyExternals: data.externals,
          legacyStats: data.stats,
          legacyRawData: data,
        },
      })
      console.log(`- Created legacy page: ${page}`)
    } catch (e) {
      console.error(`- Error creating legacy page ${page}:`, e)
    }
  }

  console.log(`Seeding complete!`)
  process.exit(0)
}

seed()
