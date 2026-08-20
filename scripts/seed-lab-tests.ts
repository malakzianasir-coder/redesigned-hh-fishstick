import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'lab-tests.json'), 'utf8'))

  console.log('Seeding Lab Tests...')
  let count = 0
  for (const test of data.tests) {
    try {
      await payload.create({
        collection: 'lab-tests',
        data: {
          name: test.name,
          slug: test.slug,
          category: test.category,
          reportingTime: test.reportingTime,
          specimen: test.specimen,
          isOutsourced: test.isOutsourced,
          alsoKnownAs: test.alsoKnownAs,
          legacyDescription: test.description,
          legacyPreparation: test.preparation,
        },
      })
      count++
      if (count % 25 === 0) console.log(`- Created ${count} tests...`)
    } catch (e) {
      console.error(`- Error creating test ${test.name}:`, e)
    }
  }

  console.log(`Seeding complete! Total: ${count}`)
  process.exit(0)
}

seed()
