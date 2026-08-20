import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  const departmentsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'departments.json'), 'utf8'))
  const servicesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'services.json'), 'utf8'))
  const doctorsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'doctors.json'), 'utf8'))

  console.log('Seeding Departments...')
  for (const dept of departmentsData) {
    try {
      await payload.create({
        collection: 'departments',
        data: {
          title: dept.title,
          slug: dept.slug,
          category: dept.category,
          categorySlug: dept.categorySlug,
          description: dept.description,
          excerpt: dept.excerpt,
          legacyHero: dept.hero,
          legacyJumpLinks: dept.jumpLinks,
          legacySections: dept.sections,
        },
      })
      console.log(`- Created department: ${dept.title}`)
    } catch (e) {
      console.error(`- Error creating department ${dept.title}:`, e)
    }
  }

  console.log('Seeding Services...')
  for (const svc of servicesData) {
    try {
      await payload.create({
        collection: 'services',
        data: {
          title: svc.title,
          slug: svc.slug,
          category: svc.category,
          categorySlug: svc.categorySlug,
          description: svc.description,
          excerpt: svc.excerpt,
          legacyHero: svc.hero,
          legacyJumpLinks: svc.jumpLinks,
          legacySections: svc.sections,
        },
      })
      console.log(`- Created service: ${svc.title}`)
    } catch (e) {
      console.error(`- Error creating service ${svc.title}:`, e)
    }
  }

  console.log('Seeding Doctors...')
  for (const doc of doctorsData.doctors) {
    try {
      await payload.create({
        collection: 'doctors',
        data: {
          name: doc.name,
          slug: doc.slug,
          specialty: doc.specialty,
          department: doc.department,
          role: doc.role,
          tags: doc.tags,
          // Images are currently skipped to avoid file handling complexity in this quick seed script
        },
      })
      console.log(`- Created doctor: ${doc.name}`)
    } catch (e) {
      console.error(`- Error creating doctor ${doc.name}:`, e)
    }
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed()
