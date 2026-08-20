import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  const newsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'news.json'), 'utf8'))
  const eventsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'events.json'), 'utf8'))

  console.log('Seeding News...')
  for (const article of newsData.articles) {
    try {
      await payload.create({
        collection: 'news',
        data: {
          title: article.title,
          slug: article.slug,
          tagLine: article.tagLine,
          shortDescription: article.shortDescription,
          heroImage: article.heroImage,
          categories: article.categories,
          tags: article.tags,
          author: article.author,
          publishedAt: article.publishedAt,
          featured: article.featured,
          legacyContent: article.content,
          legacyMeta: article.meta,
        },
      })
      console.log(`- Created news article: ${article.title}`)
    } catch (e) {
      console.error(`- Error creating news article ${article.title}:`, e)
    }
  }

  console.log('Seeding Events...')
  for (const event of eventsData.hospitalEvents) {
    try {
      await payload.create({
        collection: 'events',
        data: {
          title: event.title,
          slug: event.slug,
          tagLine: event.tagLine,
          shortDescription: event.shortDescription,
          heroImage: event.heroImage,
          categories: event.categories,
          eventType: event.eventType,
          eventDate: event.eventDate,
          eventTime: event.eventTime,
          eventVenue: event.eventVenue,
          eventEntry: event.eventEntry,
          publishedAt: event.publishedAt,
          featured: event.featured,
          legacyContent: event.content,
          legacyMeta: event.meta,
        },
      })
      console.log(`- Created event: ${event.title}`)
    } catch (e) {
      console.error(`- Error creating event ${event.title}:`, e)
    }
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed()
