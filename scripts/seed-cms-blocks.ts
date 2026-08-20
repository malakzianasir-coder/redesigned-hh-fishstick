import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import fs from 'fs'
import path from 'path'

function readJson(filename: string) {
  const filePath = path.join(process.cwd(), 'content', filename)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function mapImage(img: any): string {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (typeof img === 'object') {
    if (img.src) return img.src
    if (img.preset) return `illustration:${img.preset}`
    return JSON.stringify(img)
  }
  return String(img)
}

function mapBody(bodyOrParagraphs: any): string {
  if (!bodyOrParagraphs) return ''
  if (Array.isArray(bodyOrParagraphs)) {
    return bodyOrParagraphs.map(p => typeof p === 'string' ? p : (p.text || '')).join('\n\n')
  }
  if (typeof bodyOrParagraphs === 'string') return bodyOrParagraphs
  return JSON.stringify(bodyOrParagraphs)
}

function mapLede(lede: any): string {
  if (!lede) return ''
  if (Array.isArray(lede)) return lede.join('\n\n')
  if (typeof lede === 'string') return lede
  return String(lede)
}

function mapHero(hero: any) {
  if (!hero) return undefined
  return {
    variant: hero.variant || 'brand',
    kicker: hero.kicker || '',
    title: hero.title || '',
    tagline: hero.tagline || hero.subtitle || '',
    excerpt: hero.excerpt || hero.description || '',
    image: mapImage(hero.image || hero.media),
    imageAlt: hero.imageAlt || hero.title || '',
    primaryCta: hero.primaryCta ? {
      label: hero.primaryCta.label || '',
      href: hero.primaryCta.href || '',
      variant: hero.primaryCta.variant || 'default',
    } : (hero.links?.[0] ? {
      label: hero.links[0].label || '',
      href: hero.links[0].href || '',
      variant: hero.links[0].variant || 'default',
    } : undefined),
    secondaryCta: hero.secondaryCta ? {
      label: hero.secondaryCta.label || '',
      href: hero.secondaryCta.href || '',
      variant: hero.secondaryCta.variant || 'outline',
    } : (hero.links?.[1] ? {
      label: hero.links[1].label || '',
      href: hero.links[1].href || '',
      variant: hero.links[1].variant || 'outline',
    } : undefined),
    supportLine: hero.supportLine || hero.notice || '',
    chips: Array.isArray(hero.chips) ? hero.chips.map((c: any) => typeof c === 'string' ? { label: c } : { label: c.label || '' }) : [],
    stats: Array.isArray(hero.stats) ? hero.stats.map((s: any) => ({
      value: s.value || '',
      label: s.label || '',
      sublabel: s.sublabel || '',
    })) : [],
  }
}

function mapJumpLinks(jumpLinks: any[]) {
  if (!Array.isArray(jumpLinks)) return []
  return jumpLinks.map((j) => ({
    id: j.id || j.href?.replace('#', '') || '',
    label: j.label || j.title || '',
  }))
}

function mapSections(sections: any[]) {
  if (!Array.isArray(sections)) return []
  return sections.map((sec) => {
    const type = sec.type || sec.blockType || 'content'
    if (type === 'cards' || type === 'grid' || type === 'cardGrid') {
      return {
        blockType: 'cardGrid',
        sectionId: sec.id || '',
        kicker: sec.kicker || '',
        title: sec.title || sec.heading || 'Overview',
        lede: mapLede(sec.lede || sec.description),
        columns: String(sec.columns || '3'),
        cards: Array.isArray(sec.cards || sec.items) ? (sec.cards || sec.items).map((c: any) => ({
          title: c.title || c.heading || '',
          description: mapBody(c.description || c.text || c.excerpt),
          href: c.href || c.link || '',
          icon: c.icon || '',
          badge: c.badge || '',
          image: mapImage(c.image || c.src),
        })) : [],
      }
    }
    if (type === 'accordion' || type === 'faq') {
      return {
        blockType: 'accordion',
        sectionId: sec.id || '',
        kicker: sec.kicker || '',
        title: sec.title || sec.heading || 'Frequently Asked Questions',
        lede: mapLede(sec.lede),
        items: Array.isArray(sec.items) ? sec.items.map((it: any) => ({
          title: it.title || it.question || '',
          content: mapBody(it.content || it.answer),
        })) : [],
      }
    }
    if (type === 'stats' || type === 'orbit' || type === 'statsOrbit') {
      return {
        blockType: 'statsOrbit',
        sectionId: sec.id || '',
        kicker: sec.kicker || '',
        title: sec.title || sec.heading || 'Our Impact in Numbers',
        lede: mapLede(sec.lede),
        stats: Array.isArray(sec.stats || sec.items) ? (sec.stats || sec.items).map((s: any) => ({
          value: String(s.value || s.number || ''),
          label: s.label || s.title || '',
          sublabel: s.sublabel || s.context || '',
          icon: s.icon || '',
        })) : [],
      }
    }
    if (type === 'cta' || type === 'banner' || type === 'ctaBanner') {
      return {
        blockType: 'ctaBanner',
        sectionId: sec.id || '',
        kicker: sec.kicker || '',
        title: sec.title || sec.heading || '',
        description: mapBody(sec.description || sec.lede),
        primaryCta: sec.primaryCta || (sec.actions?.[0] ? { label: sec.actions[0].label, href: sec.actions[0].href } : undefined),
        secondaryCta: sec.secondaryCta || (sec.actions?.[1] ? { label: sec.actions[1].label, href: sec.actions[1].href } : undefined),
        styleVariant: sec.styleVariant || 'blue',
      }
    }
    if (type === 'waysToGive' || type === 'ways-to-give') {
      return {
        blockType: 'waysToGive',
        sectionId: sec.id || '',
        kicker: sec.kicker || '',
        title: sec.title || sec.heading || 'Ways to Give',
        lede: mapLede(sec.lede),
        options: Array.isArray(sec.options || sec.items) ? (sec.options || sec.items).map((o: any) => ({
          title: o.title || '',
          description: mapBody(o.description),
          href: o.href || '',
          icon: o.icon || '',
          badge: o.badge || '',
        })) : [],
      }
    }
    if (type === 'milestones' || type === 'timeline') {
      return {
        blockType: 'milestones',
        sectionId: sec.id || '',
        kicker: sec.kicker || '',
        title: sec.title || sec.heading || 'Our Journey & Milestones',
        lede: mapLede(sec.lede),
        milestones: Array.isArray(sec.milestones || sec.items) ? (sec.milestones || sec.items).map((m: any) => ({
          year: String(m.year || m.date || ''),
          title: m.title || '',
          description: mapBody(m.description),
        })) : [],
      }
    }
    // Default to contentSection
    return {
      blockType: 'contentSection',
      sectionId: sec.id || '',
      kicker: sec.kicker || '',
      title: sec.title || sec.heading || '',
      lede: mapLede(sec.lede),
      body: mapBody(sec.paragraphs || sec.content || sec.body),
      bullets: Array.isArray(sec.bullets) ? sec.bullets.map((b: any) => ({ text: typeof b === 'string' ? b : b.text })) : [],
      actions: Array.isArray(sec.actions) ? sec.actions.map((a: any) => ({
        label: a.label || '',
        href: a.href || '',
        variant: a.variant || 'default',
      })) : [],
    }
  })
}

async function seedEverything() {
  console.log('🚀 Starting Complete Payload CMS Seed & Block Explosion...')
  const payload = await getPayload({ config: configPromise })

  // 1. Seed Site Settings Global
  console.log('\n--- 1. Seeding SiteSettings Global ---')
  const settingsData = readJson('site-settings.json')
  if (settingsData) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        hospitalName: settingsData.hospitalName || 'Hijaz Social Welfare Society (Hijaz Hospital)',
        tagline: settingsData.tagline || 'Excellence in Care · Dignity in Service · Access for All',
        missionStatement: settingsData.missionStatement || 'To care for the ailing with compassion, respect, dignity, and professional excellence, while ensuring that financial hardship never stands in the way of receiving care.',
        contact: {
          uan: settingsData.contact?.uan || '+92 42 111 044 529',
          phone: settingsData.contact?.phone || '0321-4045125',
          emergencyPhone: settingsData.contact?.emergency || '+92 42 111 044 529',
          generalEmail: settingsData.contact?.email || 'info@hijazhospital.org.pk',
          donationsEmail: settingsData.contact?.donationsEmail || 'Donations@hijazhospital.org.pk',
          address: settingsData.contact?.address || '27-D-1, Sir Syed Road, Gulberg III, Lahore, Pakistan',
          patientReportsUrl: settingsData.contact?.patientReportsUrl || 'http://110.39.146.42:82/Patient/Login.aspx',
        },
        socialLinks: {
          facebook: settingsData.socialLinks?.facebook || 'https://www.facebook.com/HijazHospitalTrust/',
          youtube: settingsData.socialLinks?.youtube || 'https://www.youtube.com/channel/UCIzVtxEnDTJsdIcCokl_paQ',
          linkedin: settingsData.socialLinks?.linkedin || 'https://www.linkedin.com/company/hijaz-hospital-trust',
          twitter: settingsData.socialLinks?.twitter || 'https://twitter.com/HijazHospital',
        },
        newsletter: {
          enabled: settingsData.newsletter?.enabled ?? true,
          label: settingsData.newsletter?.label || 'Stay updated with our medical camps and impact',
          placeholder: settingsData.newsletter?.placeholder || 'Enter your email address',
          buttonLabel: settingsData.newsletter?.buttonLabel || 'Subscribe',
          successMessage: settingsData.newsletter?.successMessage || 'Thank you for subscribing to Hijaz Hospital updates.',
          errorMessage: settingsData.newsletter?.errorMessage || 'Please enter a valid email address.',
        },
        legacySettings: settingsData,
      },
    })
    console.log('✓ SiteSettings Global updated with structured fields')
  }

  // 2. Seed Navigation Global
  console.log('\n--- 2. Seeding Navigation Global ---')
  const navData = readJson('navigation.json')
  if (navData) {
    const mainNavItems = (navData.mainNav || navData.navigation || []).map((item: any) => ({
      id: item.id || item.label?.toLowerCase() || '',
      label: item.label || '',
      href: item.href || '',
      badge: item.badge || '',
      moreLink: item.moreLink ? { label: item.moreLink.label, href: item.moreLink.href } : undefined,
      groups: (item.groups || []).map((grp: any) => ({
        title: grp.title || '',
        links: (grp.links || []).map((l: any) => ({
          label: l.label || '',
          href: l.href || '',
          badge: l.badge || '',
          icon: l.icon || '',
          description: l.description || '',
        })),
      })),
    }))

    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        utilityBar: {
          helpline: '+92 42 111 044 529',
          emergency: '24/7 Emergency: +92 42 111 044 529',
          patientReportsLabel: 'Online Patient Reports',
          patientReportsUrl: 'http://110.39.146.42:82/Patient/Login.aspx',
          donateButtonLabel: 'Donate Now',
          donateButtonHref: '/donate',
        },
        mainNavItems,
        legacyNavigation: navData,
      },
    })
    console.log('✓ Navigation Global updated with structured mega menu items')
  }

  // 3. Seed Structured LegacyPages (Home, About Us, Our Purpose, etc.)
  console.log('\n--- 3. Seeding Structured LegacyPages ---')
  const pageFiles = [
    { file: 'home.json', slug: 'home' },
    { file: 'about-us.json', slug: 'about-us' },
    { file: 'how-to-donate.json', slug: 'how-to-donate' },
    { file: 'our-purpose.json', slug: 'our-purpose' },
    { file: 'our-impact.json', slug: 'our-impact' },
    { file: 'our-supporters.json', slug: 'our-supporters' },
    { file: 'chairmans-message.json', slug: 'chairmans-message' },
    { file: 'presidents-message.json', slug: 'presidents-message' },
    { file: 'patient-welfare-hub.json', slug: 'patient-welfare-hub' },
    { file: 'donate.json', slug: 'donate' },
    { file: 'leadership.json', slug: 'leadership' },
    { file: 'leadership-messages.json', slug: 'leadership-messages' },
  ]

  for (const { file, slug } of pageFiles) {
    const data = readJson(file)
    if (!data) continue

    const hero = mapHero(data.hero)
    const jumpLinks = mapJumpLinks(data.jumpLinks || [])
    const pageSections = mapSections(data.sections || [])

    // Specialized data mappings
    const homeSlider = Array.isArray(data.slider || data.hero?.slides) ? (data.slider || data.hero?.slides).map((s: any) => ({
      kicker: s.kicker || '',
      title: s.title || '',
      excerpt: s.excerpt || s.description || '',
      image: s.image || s.src || '',
      ctaLabel: s.ctaLabel || 'Donate Now',
      ctaHref: s.ctaHref || '/donate',
    })) : []

    const statsOrbit = Array.isArray(data.stats || data.facts) ? (data.stats || data.facts).map((s: any) => ({
      value: String(s.value || s.number || ''),
      label: s.label || s.title || '',
      sublabel: s.sublabel || '',
      icon: s.icon || '',
    })) : []

    const donorWall = Array.isArray(data.donors) ? data.donors.map((d: any, idx: number) => ({
      number: d.number || idx + 1,
      name: d.name || d.title || '',
      category: d.category || '',
    })) : []

    const leadershipTeam = Array.isArray(data.members || data.team || data.trustees) ? (data.members || data.team || data.trustees).map((m: any) => ({
      name: m.name || '',
      role: m.role || m.designation || '',
      description: m.description || m.bio || '',
      image: m.image || '',
    })) : []

    const complianceLogos = Array.isArray(data.complianceLogos || data.certifications) ? (data.complianceLogos || data.certifications).map((c: any) => ({
      title: c.title || '',
      src: c.src || c.image || '',
      href: c.href || '',
      alt: c.alt || c.title || '',
    })) : []

    // Upsert into LegacyPages collection
    const existing = await payload.find({
      collection: 'legacy-pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const payloadData: any = {
      title: data.title || data.heading || slug,
      slug,
      description: data.description || data.lede || data.hero?.excerpt || '',
      hero,
      jumpLinks,
      pageSections,
      homeSlider,
      statsOrbit,
      donorWall,
      leadershipTeam,
      complianceLogos,
      legacyHero: data.hero,
      legacyJumpLinks: data.jumpLinks,
      legacySections: data.sections,
      legacyGroups: data.groups,
      legacyExternals: data.externals,
      legacyStats: data.stats,
      legacyRawData: data,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'legacy-pages',
        id: existing.docs[0]!.id,
        data: payloadData,
      })
      console.log(`✓ Updated structured LegacyPage: ${slug}`)
    } else {
      await payload.create({
        collection: 'legacy-pages',
        data: payloadData,
      })
      console.log(`✓ Created structured LegacyPage: ${slug}`)
    }
  }

  // 4. Update Departments with structured fields & sections
  console.log('\n--- 4. Seeding Structured Departments ---')
  const deptsData = readJson('departments.json')
  if (Array.isArray(deptsData)) {
    for (const dept of deptsData) {
      const hero = mapHero(dept.hero || { title: dept.title, kicker: dept.category, excerpt: dept.excerpt || dept.description })
      const jumpLinks = mapJumpLinks(dept.jumpLinks || [])
      const pageSections = mapSections(dept.sections || [])
      const servicesList = Array.isArray(dept.services) ? dept.services.map((s: any) => typeof s === 'string' ? { title: s } : { title: s.title || '', description: s.description || '', href: s.href || '' }) : []

      const existing = await payload.find({
        collection: 'departments',
        where: { slug: { equals: dept.slug } },
        limit: 1,
      })

      const dataToSave: any = {
        title: dept.title,
        category: dept.category || 'Clinical Specialty',
        categorySlug: dept.categorySlug || '',
        description: dept.description || '',
        excerpt: dept.excerpt || '',
        hero,
        jumpLinks,
        pageSections,
        servicesList,
        legacyHero: dept.hero,
        legacyJumpLinks: dept.jumpLinks,
        legacySections: dept.sections,
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'departments',
          id: existing.docs[0]!.id,
          data: dataToSave,
        })
        console.log(`✓ Updated structured Department: ${dept.slug}`)
      } else {
        await payload.create({
          collection: 'departments',
          data: { ...dataToSave, slug: dept.slug },
        })
        console.log(`✓ Created structured Department: ${dept.slug}`)
      }
    }
  }

  // 5. Update Services with structured fields & sections
  console.log('\n--- 5. Seeding Structured Services ---')
  const servicesData = readJson('services.json')
  if (Array.isArray(servicesData)) {
    for (const srv of servicesData) {
      const hero = mapHero(srv.hero || { title: srv.title, kicker: srv.category, excerpt: srv.excerpt || srv.description })
      const jumpLinks = mapJumpLinks(srv.jumpLinks || [])
      const pageSections = mapSections(srv.sections || [])

      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: srv.slug } },
        limit: 1,
      })

      const dataToSave: any = {
        title: srv.title,
        category: srv.category || '',
        categorySlug: srv.categorySlug || '',
        description: srv.description || '',
        excerpt: srv.excerpt || '',
        hero,
        jumpLinks,
        pageSections,
        legacyHero: srv.hero,
        legacyJumpLinks: srv.jumpLinks,
        legacySections: srv.sections,
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'services',
          id: existing.docs[0]!.id,
          data: dataToSave,
        })
        console.log(`✓ Updated structured Service: ${srv.slug}`)
      } else {
        await payload.create({
          collection: 'services',
          data: { ...dataToSave, slug: srv.slug },
        })
        console.log(`✓ Created structured Service: ${srv.slug}`)
      }
    }
  }

  // 6. Update DonationCauses with structured fields
  console.log('\n--- 6. Seeding Structured DonationCauses ---')
  const causesData = readJson('donation-causes.json') || readJson('what-you-can-support.json')?.causes
  if (Array.isArray(causesData)) {
    for (const cause of causesData) {
      const hero = mapHero(cause.hero || { title: cause.title, excerpt: cause.excerpt || cause.description })
      const jumpLinks = mapJumpLinks(cause.jumpLinks || [])
      const pageSections = mapSections(cause.sections || [])

      const existing = await payload.find({
        collection: 'donation-causes',
        where: { slug: { equals: cause.slug } },
        limit: 1,
      })

      const dataToSave: any = {
        title: cause.title,
        kind: cause.kind || '',
        description: cause.description || '',
        excerpt: cause.excerpt || '',
        icon: cause.icon || 'Heart',
        zakatEligible: cause.zakatEligible ?? true,
        hero,
        jumpLinks,
        pageSections,
        legacyHero: cause.hero,
        legacyJumpLinks: cause.jumpLinks,
        legacySections: cause.sections,
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'donation-causes',
          id: existing.docs[0]!.id,
          data: dataToSave,
        })
        console.log(`✓ Updated structured DonationCause: ${cause.slug}`)
      } else {
        await payload.create({
          collection: 'donation-causes',
          data: { ...dataToSave, slug: cause.slug },
        })
        console.log(`✓ Created structured DonationCause: ${cause.slug}`)
      }
    }
  }

  // 7. Update Doctors with structured fields
  console.log('\n--- 7. Seeding Structured Doctors ---')
  const doctorsData = readJson('doctors.json')?.doctors || readJson('doctors.json')
  if (Array.isArray(doctorsData)) {
    for (const doc of doctorsData) {
      const existing = await payload.find({
        collection: 'doctors',
        where: { slug: { equals: doc.slug } },
        limit: 1,
      })

      const dataToSave: any = {
        name: doc.name,
        specialty: doc.specialty || '',
        department: doc.department || '',
        role: doc.role || (doc.tags?.includes('head-of-department') ? 'Head of Department' : 'Consultant'),
        qualifications: doc.qualifications || (doc.role === 'Senior Registrar' ? 'Senior Registrar, FMH' : 'Consultant Specialist'),
        experience: doc.experience || '10+ Years',
        image: doc.image || '',
        tags: doc.tags || [],
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'doctors',
          id: existing.docs[0]!.id,
          data: dataToSave,
        })
        console.log(`✓ Updated structured Doctor: ${doc.name}`)
      } else {
        await payload.create({
          collection: 'doctors',
          data: { ...dataToSave, slug: doc.slug },
        })
        console.log(`✓ Created structured Doctor: ${doc.name}`)
      }
    }
  }

  // 8. Update SuccessStories with structured fields
  console.log('\n--- 8. Seeding Structured SuccessStories ---')
  const storiesData = readJson('success-stories.json')?.stories || readJson('success-stories.json')
  if (Array.isArray(storiesData)) {
    for (const story of storiesData) {
      const existing = await payload.find({
        collection: 'success-stories',
        where: { slug: { equals: story.slug } },
        limit: 1,
      })

      const storyParagraphs = Array.isArray(story.articleContent || story.paragraphs)
        ? (story.articleContent || story.paragraphs).map((p: any) => ({
            type: p.type || 'paragraph',
            text: typeof p === 'string' ? p : p.text || '',
            attribution: p.attribution || '',
          }))
        : []

      const dataToSave: any = {
        title: story.title || story.heading || '',
        heading: story.heading || story.title || '',
        subHeading: story.subHeading || story.subtitle || '',
        category: story.category || 'life-saving-treatments',
        format: story.format || 'article',
        thumbnail: story.thumbnail || story.heroImage || '',
        videoUrl: story.videoUrl || '',
        publishedDate: story.publishedDate || '2026-01-01',
        featured: story.featured ?? false,
        storyParagraphs,
        legacyContent: story.articleContent,
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'success-stories',
          id: existing.docs[0]!.id,
          data: dataToSave,
        })
        console.log(`✓ Updated structured SuccessStory: ${story.slug}`)
      } else {
        await payload.create({
          collection: 'success-stories',
          data: { ...dataToSave, slug: story.slug },
        })
        console.log(`✓ Created structured SuccessStory: ${story.slug}`)
      }
    }
  }

  // 9. Update News with structured fields
  console.log('\n--- 9. Seeding Structured News ---')
  const newsData = readJson('news.json')?.articles || readJson('news.json')
  if (Array.isArray(newsData)) {
    for (const article of newsData) {
      const existing = await payload.find({
        collection: 'news',
        where: { slug: { equals: article.slug } },
        limit: 1,
      })

      const paragraphs = Array.isArray(article.content || article.paragraphs)
        ? (article.content || article.paragraphs).map((p: any) => ({ text: typeof p === 'string' ? p : p.text || '' }))
        : []

      const dataToSave: any = {
        title: article.title || '',
        tagLine: article.tagLine || '',
        shortDescription: article.shortDescription || article.excerpt || '',
        heroImage: article.heroImage || article.image || '',
        publishedAt: article.publishedAt || article.date || '2026-02-01',
        featured: article.featured ?? false,
        author: {
          name: article.author?.name || 'Hijaz Hospital Editorial Team',
          role: article.author?.role || 'Communications Office',
          avatar: article.author?.avatar || '',
        },
        paragraphs,
        legacyContent: article.content,
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'news',
          id: existing.docs[0]!.id,
          data: dataToSave,
        })
        console.log(`✓ Updated structured News Article: ${article.slug}`)
      } else {
        await payload.create({
          collection: 'news',
          data: { ...dataToSave, slug: article.slug },
        })
        console.log(`✓ Created structured News Article: ${article.slug}`)
      }
    }
  }

  // 10. Update Events with structured fields
  console.log('\n--- 10. Seeding Structured Events ---')
  const eventsData = readJson('events.json')?.hospitalEvents || readJson('events.json')?.events || readJson('events.json')
  if (Array.isArray(eventsData)) {
    for (const event of eventsData) {
      const existing = await payload.find({
        collection: 'events',
        where: { slug: { equals: event.slug } },
        limit: 1,
      })

      const paragraphs = Array.isArray(event.content || event.paragraphs)
        ? (event.content || event.paragraphs).map((p: any) => ({ text: typeof p === 'string' ? p : p.text || '' }))
        : []

      const dataToSave: any = {
        title: event.title || '',
        tagLine: event.tagLine || '',
        shortDescription: event.shortDescription || '',
        heroImage: event.heroImage || '',
        eventType: event.eventType || 'Free Medical Camp',
        eventDate: event.eventDate || '',
        eventTime: event.eventTime || '',
        eventVenue: event.eventVenue || 'Hijaz Hospital, Lahore',
        eventEntry: event.eventEntry || 'Free & Open to All',
        paragraphs,
        legacyContent: event.content,
      }

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'events',
          id: existing.docs[0]!.id,
          data: dataToSave,
        })
        console.log(`✓ Updated structured Event: ${event.slug}`)
      } else {
        await payload.create({
          collection: 'events',
          data: { ...dataToSave, slug: event.slug },
        })
        console.log(`✓ Created structured Event: ${event.slug}`)
      }
    }
  }

  console.log('\n🎉 Complete Payload CMS Structured Seeding Finished Successfully!')
  process.exit(0)
}

seedEverything().catch((err) => {
  console.error('❌ Error during complete CMS seeding:', err)
  process.exit(1)
})
