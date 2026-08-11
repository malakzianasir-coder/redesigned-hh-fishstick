/**
 * Rebuilds Patient Welfare → Financial & Community Support pages
 * (paraphrased hero, verbatim body) and lightly tags Patient Resources.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const welfareFile = path.join(__dirname, '..', 'content', 'patient-welfare.json')
const hubFile = path.join(__dirname, '..', 'content', 'patient-welfare-hub.json')

const existing = JSON.parse(fs.readFileSync(welfareFile, 'utf8'))
const hub = JSON.parse(fs.readFileSync(hubFile, 'utf8'))

const CATEGORY = 'Financial & Community Support'
const CATEGORY_SLUG = 'financial-community'

const FINANCIAL = {
  'financial-assistance': {
    slug: 'financial-assistance',
    title: 'Zakat & Financial Assistance',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'Shariah-compliant Zakat and charitable welfare assistance so financial hardship never blocks essential care.',
    excerpt:
      'Shariah-compliant Zakat and charitable welfare assistance so financial hardship never blocks essential care.',
    hero: {
      kicker: CATEGORY,
      title: 'Zakat & Financial Assistance',
      excerpt:
        'Shariah-compliant Zakat and charitable welfare assistance so financial hardship never blocks essential care.',
      media: { type: 'illustration', preset: 'page/financial-assistance' },
      links: [
        { label: 'Zakat System', href: '#zakat-system', variant: 'primary' },
        { label: 'Eligibility', href: '#eligibility', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Zakat System', href: '#zakat-system' },
      { label: 'Financial Assistance', href: '#financial-assistance' },
      { label: 'Eligibility', href: '#eligibility' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Zakat & Financial Assistance',
        background: 'white',
        body: [
          'Hijaz Hospital is committed to ensuring that financial hardship does not prevent deserving patients from receiving essential medical care. Through its Shariah-Compliant Zakat Management System and charitable welfare programs, the hospital provides financial assistance to eligible patients with fairness, dignity, and compassion.',
        ],
      },
      {
        type: 'content',
        id: 'zakat-system',
        kicker: 'Zakat Management',
        heading: 'Shariah-Compliant Zakat Management System',
        background: 'muted',
        body: [
          "Hijaz Hospital has established a Shariah-Compliant Zakat Management System (ZMS) under the supervision of qualified Islamic scholars and respected Muftis. The system ensures that Zakat donations are received, managed, and utilized strictly in accordance with the teachings of the Qur'an and Sunnah.",
          "All Zakat contributions are maintained in a dedicated account separate from other hospital funds. Patient eligibility is assessed by the Welfare Shariah Department, where each case is reviewed with complete confidentiality and respect for the patient's dignity.",
          'Eligible patients receive financial assistance for their medical treatment through the Zakat fund. Patients who do not meet the prescribed Shariah criteria may still be considered for assistance through general donations or other charitable welfare resources. (Other than zakat and Sadqate-e-Wajiba)',
          "The system is supervised by the hospital's Shariah consultant in consultation with a three-member Shariah Committee, ensuring that all policies and procedures remain fully aligned with established Shariah principles.",
        ],
      },
      {
        type: 'serviceGroups',
        id: 'financial-assistance',
        layout: 'stack',
        background: 'white',
        kicker: 'Financial Support',
        heading: 'Financial Assistance for Deserving Patients',
        intro:
          'Hijaz Hospital provides financial assistance to patients who are unable to afford medical treatment. Depending on eligibility, support may be provided through:',
        groups: [
          {
            heading: 'Support Sources',
            icon: 'hand-coins',
            items: ['Zakat and Sadqat-e-Wajiba funds', 'General donations'],
          },
        ],
        footer:
          "Each application is assessed individually based on the patient's financial circumstances (Income, Assets and Liability), medical needs, and the availability of assistance.",
      },
      {
        type: 'processSteps',
        id: 'eligibility',
        kicker: 'Application Process',
        heading: 'Eligibility & Application Process',
        intro:
          'Patients seeking financial assistance may contact the Welfare Shariah Department for guidance. Applications are processed through a structured and confidential assessment that includes:',
        background: 'muted',
        steps: [
          { title: 'Submission of an application for financial assistance.', items: [] },
          {
            title: "Assessment of the patient's financial circumstances and medical requirements.",
            items: [],
          },
          {
            title:
              'Review by the Welfare Department and, where applicable, the Welfare Shariah Department.',
            items: [],
          },
          {
            title: 'Approval in accordance with the applicable welfare or Zakat criteria.',
            items: [],
          },
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Responsible Stewardship',
        quote:
          'Hijaz Hospital remains committed to serving the community with compassion, integrity, and responsible stewardship, ensuring that deserving patients receive essential medical care while donors can contribute with confidence.',
      },
    ],
  },

  'dialysis-support': {
    slug: 'dialysis-support',
    title: 'Dialysis Patient Support Program',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'Welfare support beyond dialysis treatment — monthly assistance, ration, and family needs for deserving patients.',
    excerpt:
      'Welfare support beyond dialysis treatment — monthly assistance, ration, and family needs for deserving patients.',
    hero: {
      kicker: CATEGORY,
      title: 'Dialysis Patient Support Program',
      excerpt:
        'Welfare support beyond dialysis treatment — monthly assistance, ration, and family needs for deserving patients.',
      media: { type: 'illustration', preset: 'page/dialysis-support' },
      links: [
        { label: 'Support Offered', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Support Offered', href: '#services' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Dialysis Patient Support Program',
        background: 'white',
        body: [
          'Patients living with kidney failure often require lifelong dialysis treatment, placing significant financial and emotional strain on both patients and their families. Recognizing these challenges, Hijaz Hospital provides dedicated support to deserving dialysis patients through its welfare programs.',
          'In addition to subsidized or free dialysis treatment for eligible patients, the hospital offers financial assistance to help ease the burden of long-term care. Depending on individual circumstances and available resources, support may include:',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Support Offered',
        heading: 'Support May Include',
        groups: [
          {
            heading: 'Dialysis Patient Support',
            icon: 'drop',
            items: [
              'Monthly financial assistance',
              'Ration support for families',
              'Assistance during exceptional personal or financial hardship',
              'Support for essential family needs, including marriage assistance in deserving cases',
            ],
          },
        ],
      },
      {
        type: 'content',
        id: 'closing',
        kicker: 'Beyond Medical Treatment',
        heading: 'Care Beyond Treatment',
        background: 'white',
        body: [
          'Through this program, Hijaz Hospital extends its care beyond medical treatment by supporting the overall well-being of dialysis patients and their families with compassion, dignity, and respect.',
          "This initiative reflects the hospital's commitment to standing alongside deserving patients throughout their treatment journey and helping them maintain a better quality of life",
        ],
      },
    ],
  },

  'free-medicines': {
    slug: 'free-medicines',
    title: 'Free Medicines for Eligible Patients',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'Prescribed medicines free of charge for eligible OPD patients — continuity of treatment without medicine costs.',
    excerpt:
      'Prescribed medicines free of charge for eligible OPD patients — continuity of treatment without medicine costs.',
    hero: {
      kicker: CATEGORY,
      title: 'Free Medicines for Eligible Patients',
      excerpt:
        'Prescribed medicines free of charge for eligible OPD patients — continuity of treatment without medicine costs.',
      media: { type: 'illustration', preset: 'page/free-medicines' },
      links: [
        { label: 'Departments Covered', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Departments', href: '#services' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Free Medicines for Eligible Patients',
        background: 'white',
        body: [
          'Hijaz Hospital provides prescribed medicines free of charge to eligible outpatient (OPD) patients. Through its Pharmacy Department, the hospital ensures that patients can continue their treatment without the burden of medicine costs.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Coverage',
        heading: 'Available Across Key Clinical Departments',
        intro: 'This support is available across key clinical departments, including:',
        groups: [
          {
            heading: 'Clinical Departments',
            icon: 'pill',
            items: ['Gynecology', 'Dialysis', 'Medicine', 'Surgery'],
          },
        ],
      },
      {
        type: 'content',
        id: 'donor-support',
        kicker: 'Donor Support',
        heading: 'Supported by Generous Donors',
        background: 'white',
        body: [
          'With the generous support of donors, Hijaz Hospital continues to provide free medicines worth millions of rupees each year to patients in need.',
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Accessible Care',
        quote:
          "This initiative reflects the hospital's commitment to making essential healthcare more accessible and ensuring continuity of treatment for deserving patients.",
      },
    ],
  },

  'free-meals': {
    slug: 'free-meals',
    title: 'Free Meals for Patients and Attendants',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'Three nutritious meals daily for admitted patients and attendants — care that extends beyond treatment.',
    excerpt:
      'Three nutritious meals daily for admitted patients and attendants — care that extends beyond treatment.',
    hero: {
      kicker: CATEGORY,
      title: 'Free Meals for Patients and Attendants',
      excerpt:
        'Three nutritious meals daily for admitted patients and attendants — care that extends beyond treatment.',
      media: { type: 'illustration', preset: 'page/free-meals' },
      links: [
        { label: 'Overview', href: '#overview', variant: 'primary' },
        { label: 'Patient Welfare Hub', href: '/patient-welfare', variant: 'ghost' },
      ],
    },
    jumpLinks: [{ label: 'Overview', href: '#overview' }],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Free Meals for Patients and Attendants',
        background: 'white',
        body: [
          'At Hijaz Hospital, we believe that patient care extends beyond medical treatment. As part of our commitment to compassion and community service, the hospital provides three nutritious meals daily to admitted patients and their attendants.',
          'This service helps reduce the financial burden on families, allowing them to focus on treatment, recovery, and the well-being of their loved ones. By providing meals with dignity and care, Hijaz Hospital continues its mission of supporting patients and their families throughout their healthcare journey.',
        ],
      },
    ],
  },

  'sehat-sahulat': {
    slug: 'sehat-sahulat',
    title: 'Sehat Sahulat Program',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'Government-supported healthcare coverage that helps eligible patients access treatment with less financial burden.',
    excerpt:
      'Government-supported healthcare coverage that helps eligible patients access treatment with less financial burden.',
    hero: {
      kicker: CATEGORY,
      title: 'Sehat Sahulat Program',
      excerpt:
        'Government-supported healthcare coverage that helps eligible patients access treatment with less financial burden.',
      media: { type: 'illustration', preset: 'page/sehat-sahulat' },
      links: [
        { label: 'Program Details', href: '#overview', variant: 'primary' },
        { label: 'Patient Welfare Hub', href: '/patient-welfare', variant: 'ghost' },
      ],
    },
    jumpLinks: [{ label: 'Overview', href: '#overview' }],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Sehat Sahulat Program',
        background: 'white',
        body: [
          'Hijaz Hospital facilitates eligible patients through the Sehat Sahulat Program, a government-supported healthcare initiative designed to improve access to medical treatment for citizens of Pakistan.',
          'Through this program, eligible patients can receive healthcare services while reducing the financial burden of medical expenses. Hijaz Hospital remains committed to supporting quality, affordable, and patient-centered healthcare for the community.',
        ],
      },
    ],
  },

  'free-medical-camps': {
    slug: 'free-medical-camps',
    title: 'Flood Relief & Humanitarian Assistance',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'Community support in times of disaster — homes, mosques, and financial assistance after the floods of 2005, 2011, and 2022.',
    excerpt:
      'Community support in times of disaster — homes, mosques, and financial assistance after the floods of 2005, 2011, and 2022.',
    hero: {
      kicker: CATEGORY,
      title: 'Flood Relief & Humanitarian Assistance',
      excerpt:
        'Community support in times of disaster — homes, mosques, and financial assistance after the floods of 2005, 2011, and 2022.',
      media: { type: 'illustration', preset: 'page/free-medical-camps' },
      links: [
        { label: 'Overview', href: '#overview', variant: 'primary' },
        { label: 'Patient Welfare Hub', href: '/patient-welfare', variant: 'ghost' },
      ],
    },
    jumpLinks: [{ label: 'Overview', href: '#overview' }],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Flood Relief & Humanitarian Assistance',
        background: 'white',
        body: [
          'Hijaz Hospital has always remained committed to supporting communities during times of hardship and natural disasters. During the floods of 2005, 2011, and 2022, the hospital extended support to affected communities across Punjab and other regions of Pakistan.',
          'The relief efforts included the construction of more than 50 houses for flood-affected families during the 2022 floods, contributions toward the construction of mosques and other community support initiatives, and financial assistance for families facing challenges due to flood-related losses.',
          'Hijaz Hospital believes that its commitment to humanity extends beyond healthcare services. In times of need, the hospital continues to support affected communities with compassion, dignity, and a spirit of service.',
        ],
      },
    ],
  },
}

const RESOURCES = new Set([
  'admission-process',
  'patient-rights',
  'patient-information-guide',
])

const next = existing.map((page) => {
  if (FINANCIAL[page.slug]) return FINANCIAL[page.slug]
  if (RESOURCES.has(page.slug)) {
    const { tagline: _tagline, ...heroRest } = page.hero || {}
    return {
      ...page,
      category: 'Patient Resources',
      categorySlug: 'patient-resources',
      hero: {
        ...heroRest,
        kicker: 'Patient Resources',
        excerpt: page.hero?.excerpt || page.excerpt,
        // drop generic tagline so it never becomes a quote
      },
    }
  }
  return page
})

fs.writeFileSync(welfareFile, JSON.stringify(next, null, 2) + '\n')

// Hub updates
hub.hero = {
  ...hub.hero,
  kicker: 'Patient Welfare',
  title: 'Financial & Community Support',
  excerpt:
    'Zakat, welfare programs, and community support — so financial hardship never stands between patients and essential care.',
}

hub.hub.groups = hub.hub.groups.map((group) => {
  if (group.label === 'Financial & Community Support') {
    return {
      ...group,
      id: CATEGORY_SLUG,
      cards: group.cards.map((card) => {
        const page = FINANCIAL[card.slug]
        if (!page) return card
        return {
          ...card,
          title: page.title,
          excerpt: page.excerpt,
          href: `/patient-welfare/${page.slug}`,
        }
      }),
    }
  }
  if (group.label === 'Patient Resources') {
    return { ...group, id: 'patient-resources' }
  }
  return group
})

fs.writeFileSync(hubFile, JSON.stringify(hub, null, 2) + '\n')

// Nav label for flood relief
const navFile = path.join(__dirname, '..', 'content', 'navigation.json')
const nav = JSON.parse(fs.readFileSync(navFile, 'utf8'))
const mega = nav.megaMenus?.find((m) => m.id === 'patient-welfare')
if (mega) {
  for (const col of mega.columns || []) {
    for (const link of col.links || []) {
      if (link.href === '/patient-welfare/financial-assistance') {
        link.label = 'Zakat & Financial Assistance'
      }
      if (link.href === '/patient-welfare/dialysis-support') {
        link.label = 'Dialysis Patient Support'
      }
      if (link.href === '/patient-welfare/free-medical-camps') {
        link.label = 'Flood Relief & Humanitarian Assistance'
      }
      if (link.href === '/patient-welfare/free-medicines') {
        link.label = 'Free Medicines'
      }
      if (link.href === '/patient-welfare/free-meals') {
        link.label = 'Free Meals'
      }
    }
  }
}
fs.writeFileSync(navFile, JSON.stringify(nav, null, 2) + '\n')

console.log(
  `Updated ${Object.keys(FINANCIAL).length} financial/community pages; tagged ${RESOURCES.size} patient-resource pages.`,
)
