import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  const welfareData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'patient-welfare.json'), 'utf8'))
  const supportData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'what-you-can-support.json'), 'utf8'))
  const generalData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'donations.json'), 'utf8'))
  const successStoriesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'success-stories.json'), 'utf8'))

  console.log('Seeding Patient Welfare...')
  for (const page of welfareData) {
    try {
      await payload.create({
        collection: 'patient-welfare-pages',
        data: {
          title: page.title,
          slug: page.slug,
          category: page.category,
          categorySlug: page.categorySlug,
          description: page.description,
          excerpt: page.excerpt,
          legacyHero: page.hero,
          legacyJumpLinks: page.jumpLinks,
          legacySections: page.sections,
        },
      })
      console.log(`- Created welfare page: ${page.title}`)
    } catch (e) {
      console.error(`- Error creating welfare page ${page.title}:`, e)
    }
  }

  console.log('Seeding Donation Causes...')
  for (const cause of generalData) {
    try {
      await payload.create({
        collection: 'donation-causes',
        data: {
          title: cause.title,
          slug: cause.slug,
          kind: cause.kind || 'general',
          description: cause.description,
          excerpt: cause.excerpt,
          bankAccountKeys: cause.bankAccountKeys,
          zakatCalculator: cause.zakatCalculator,
          legacyHero: cause.hero,
          legacyJumpLinks: cause.jumpLinks,
          legacySections: cause.sections,
        },
      })
      console.log(`- Created general cause: ${cause.title}`)
    } catch (e) {
      console.error(`- Error creating general cause ${cause.title}:`, e)
    }
  }

  for (const cause of supportData.causes) {
    try {
      await payload.create({
        collection: 'donation-causes',
        data: {
          title: cause.title,
          slug: cause.slug,
          kind: 'support',
          description: cause.description,
          excerpt: cause.excerpt,
          legacyHero: cause.hero,
          legacyJumpLinks: cause.jumpLinks,
          legacySections: cause.sections,
        },
      })
      console.log(`- Created support cause: ${cause.title}`)
    } catch (e) {
      console.error(`- Error creating support cause ${cause.title}:`, e)
    }
  }

  console.log('Seeding Success Stories...')
  for (const story of successStoriesData.stories) {
    try {
      await payload.create({
        collection: 'success-stories',
        data: {
          title: story.title,
          slug: story.slug,
          heading: story.heading,
          subHeading: story.subHeading,
          category: story.category,
          format: story.format,
          thumbnail: story.thumbnail,
          videoUrl: story.videoUrl,
          publishedDate: story.publishedDate,
          featured: story.featured,
          departments: story.departments,
          services: story.services,
          legacyContent: story.articleContent,
        },
      })
      console.log(`- Created success story: ${story.title}`)
    } catch (e) {
      console.error(`- Error creating success story ${story.title}:`, e)
    }
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed()
