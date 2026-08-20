import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  const doctorsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'doctors.json'), 'utf8'))

  console.log('Seeding Doctors (Updating images and missing ones)...')
  for (const doc of doctorsData.doctors) {
    try {
      // Check if doctor exists
      const existing = await payload.find({
        collection: 'doctors',
        where: { slug: { equals: doc.slug } }
      })
      
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'doctors',
          id: existing.docs[0]!.id,
          data: {
            image: doc.image,
            tags: doc.tags, // To fix the 7 doctors that failed before
          }
        })
        console.log(`- Updated doctor: ${doc.name}`)
      } else {
        await payload.create({
          collection: 'doctors',
          data: {
            name: doc.name,
            slug: doc.slug,
            specialty: doc.specialty,
            department: doc.department,
            role: doc.role,
            tags: doc.tags,
            image: doc.image,
          },
        })
        console.log(`- Created doctor: ${doc.name}`)
      }
    } catch (e) {
      console.error(`- Error creating/updating doctor ${doc.name}:`, e)
    }
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed()
