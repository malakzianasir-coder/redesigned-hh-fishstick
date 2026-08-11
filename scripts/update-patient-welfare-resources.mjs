/**
 * Rebuilds Patient Welfare → Patient Resources pages
 * (paraphrased hero, verbatim body). Omits editorial CMS notes.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const welfareFile = path.join(__dirname, '..', 'content', 'patient-welfare.json')
const hubFile = path.join(__dirname, '..', 'content', 'patient-welfare-hub.json')

const existing = JSON.parse(fs.readFileSync(welfareFile, 'utf8'))
const hub = JSON.parse(fs.readFileSync(hubFile, 'utf8'))

const CATEGORY = 'Patient Resources'
const CATEGORY_SLUG = 'patient-resources'

const RESOURCES = {
  'admission-process': {
    slug: 'admission-process',
    title: 'Patient Admission Process',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'A structured six-step admission path — from OPD consultation through treatment and discharge.',
    excerpt:
      'A structured six-step admission path — from OPD consultation through treatment and discharge.',
    hero: {
      kicker: CATEGORY,
      title: 'Patient Admission Process',
      excerpt:
        'A structured six-step admission path — from OPD consultation through treatment and discharge.',
      media: { type: 'illustration', preset: 'page/admission-process' },
      links: [
        { label: 'Admission Steps', href: '#admission-process', variant: 'primary' },
        { label: 'Patient Welfare Hub', href: '/patient-welfare', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Admission Steps', href: '#admission-process' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Patient Admission Process',
        background: 'white',
        body: [
          'Hijaz Hospital follows a structured admission process to ensure smooth coordination, timely treatment, and quality patient care.',
        ],
      },
      {
        type: 'processSteps',
        id: 'admission-process',
        kicker: 'Admission Steps',
        heading: 'How Admission Works',
        background: 'muted',
        // Editorial note suggested Financial Assistance before Pre-Procedure;
        // applied that order. The note itself is not shown on the public site.
        steps: [
          {
            title: 'OPD Consultation & Assessment',
            items: [
              'Patients visit the OPD Registration Counter for registration and consultation.',
              'A department-wise token is issued, and the patient meets the relevant consultant.',
              'The consultant evaluates the patient and determines whether admission is required.',
            ],
          },
          {
            title: 'Admission & Eligibility Verification',
            items: [
              'If admission is advised, the patient proceeds to the relevant admission desk for further processing.',
              'For patients to be registered under the Sehat Sahulat Program (SSP), eligibility verification and required approvals are completed through the SSP system.',
              'Necessary admission documentation is completed, and the patient file is prepared.',
            ],
          },
          {
            title: 'Financial Assistance & Category Assessment',
            items: [
              'Patient category and financial arrangements are confirmed according to hospital policy.',
              'Eligible patients may receive assistance through the applicable support programs, including welfare and financial assistance services.',
            ],
          },
          {
            title: 'Pre-Procedure Assessment (If Required)',
            items: [
              'Patients requiring surgery or procedures undergo assessment by the Anesthesia Department.',
              "The anesthesia consultant evaluates the patient's fitness for the planned procedure.",
            ],
          },
          {
            title: 'Admission & Treatment',
            items: [
              'After completion of admission formalities, the patient is shifted to the relevant ward.',
              "Treatment, surgery, or medical management is provided according to the consultant's advice.",
              'During the hospital stay, patient care, medicines, investigations, and treatment records are managed through the inpatient care system.',
            ],
          },
          {
            title: 'Discharge Process',
            items: [
              'After completion of treatment, the final bill and discharge documentation are prepared.',
              'The patient receives a discharge summary and necessary instructions before leaving the hospital.',
            ],
          },
        ],
      },
    ],
  },

  'patient-rights': {
    slug: 'patient-rights',
    title: 'Patient Rights & Responsibilities',
    category: CATEGORY,
    categorySlug: CATEGORY_SLUG,
    description:
      'Your rights to dignified, safe care — and the shared responsibilities that support a positive healthcare environment.',
    excerpt:
      'Your rights to dignified, safe care — and the shared responsibilities that support a positive healthcare environment.',
    hero: {
      kicker: CATEGORY,
      title: 'Patient Rights & Responsibilities',
      excerpt:
        'Your rights to dignified, safe care — and the shared responsibilities that support a positive healthcare environment.',
      media: { type: 'illustration', preset: 'page/patient-rights' },
      links: [
        { label: 'Patient Rights', href: '#patient-rights', variant: 'primary' },
        { label: 'Responsibilities', href: '#patient-responsibilities', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Patient Rights', href: '#patient-rights' },
      { label: 'Responsibilities', href: '#patient-responsibilities' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Patient Rights & Responsibilities',
        background: 'white',
        body: [
          'Hijaz Hospital is committed to protecting the rights, dignity, and well-being of every patient. Quality healthcare is achieved through mutual respect, cooperation, and partnership between patients, attendants, and healthcare teams. All patients are entitled to receive safe, respectful, and compassionate care while also contributing to a positive healthcare environment.',
        ],
      },
      {
        type: 'numberedList',
        id: 'patient-rights',
        kicker: 'Your Rights',
        heading: 'Patient Rights',
        background: 'muted',
        items: [
          {
            title: 'Right to Respect & Dignity',
            content:
              'Every patient has the right to be treated with respect, compassion, and dignity regardless of religion, gender, age, or financial status.',
          },
          {
            title: 'Right to Quality Healthcare',
            content:
              'Patients have the right to receive safe, appropriate, and professional medical care according to established hospital standards.',
          },
          {
            title: 'Right to Privacy & Confidentiality',
            content:
              'Patients have the right to privacy. All personal information, medical records, and treatment details are kept confidential.',
          },
          {
            title: 'Right to Information',
            content: 'Patients have the right to receive clear information regarding:',
            bullets: [
              'Their diagnosis',
              'Proposed treatment plan',
              'Medicines prescribed',
              'Possible risks, benefits, and available treatment options',
            ],
          },
          {
            title: 'Right to Informed Consent',
            content:
              'Patients and, where applicable, their attendants have the right to receive information and provide consent before major procedures or surgeries, except in emergency situations where immediate care is required.',
          },
          {
            title: 'Right to Emergency Care',
            content:
              'Patients have the right to receive emergency medical care without unnecessary delay.',
          },
          {
            title: 'Right to Respectful Communication',
            content:
              'Patients have the right to ask questions regarding their treatment and receive understandable explanations from healthcare providers.',
          },
          {
            title: 'Right to Second Opinion',
            content:
              'Patients have the right to seek a second medical opinion from another qualified healthcare professional when required.',
          },
          {
            title: 'Right to Complaint & Feedback',
            content:
              'Patients have the right to share complaints, concerns, or suggestions without fear of discrimination or unfair treatment.',
          },
          {
            title: 'Right to Financial Transparency',
            content:
              'Patients have the right to receive clear information regarding treatment costs, billing details, and available welfare or financial assistance options where applicable.',
          },
        ],
      },
      {
        type: 'numberedList',
        id: 'patient-responsibilities',
        kicker: 'Your Role',
        heading: 'Patient Responsibilities',
        background: 'white',
        items: [
          {
            title: 'Provide Accurate Information',
            content:
              'Patients and attendants should provide complete and accurate information regarding medical history, current medications, allergies, and personal details necessary for proper care.',
          },
          {
            title: 'Follow Medical Advice',
            content:
              'Patients should follow treatment plans, medication instructions, and guidance provided by doctors and healthcare professionals.',
          },
          {
            title: 'Respect Hospital Staff',
            content:
              'Patients and attendants should treat doctors, nurses, and hospital staff with respect and cooperate throughout the treatment process.',
          },
          {
            title: 'Follow Hospital Rules & Guidelines',
            content: 'Patients and attendants should follow hospital policies, including:',
            bullets: [
              'Visiting hours',
              'Cleanliness standards',
              'Safety protocols',
              'Queue and token systems',
            ],
          },
          {
            title: 'Protect Hospital Property',
            content:
              'Patients and attendants should use hospital facilities, equipment, and resources responsibly.',
          },
          {
            title: 'Fulfill Financial Responsibilities',
            content:
              'Patients should complete necessary financial requirements related to their care or contact the relevant welfare department if financial assistance is required.',
          },
          {
            title: 'Support Infection Prevention Measures',
            content:
              'Patients and visitors should follow hygiene instructions and infection control guidelines to help maintain a safe environment for everyone.',
          },
          {
            title: 'Maintain a Respectful Environment',
            content:
              'Violence, aggressive behavior, smoking, or misuse of hospital premises is not permitted.',
          },
          {
            title: 'Attend Follow-Up Visits',
            content:
              'Patients should attend scheduled follow-up appointments, investigations, and consultations as advised by healthcare providers.',
          },
          {
            title: 'Cooperate in the Care Process',
            content:
              'Patients and attendants should cooperate with healthcare teams and provide necessary support to ensure safe and effective treatment outcomes.',
          },
        ],
      },
    ],
  },
}

const next = existing.map((page) => {
  if (RESOURCES[page.slug]) return RESOURCES[page.slug]
  return page
})

fs.writeFileSync(welfareFile, JSON.stringify(next, null, 2) + '\n')

hub.hub.groups = hub.hub.groups.map((group) => {
  if (group.label !== 'Patient Resources') return group
  return {
    ...group,
    id: CATEGORY_SLUG,
    cards: group.cards.map((card) => {
      const page = RESOURCES[card.slug]
      if (!page) return card
      return {
        ...card,
        title: page.title,
        excerpt: page.excerpt,
        href: `/patient-welfare/${page.slug}`,
      }
    }),
  }
})

fs.writeFileSync(hubFile, JSON.stringify(hub, null, 2) + '\n')

const navFile = path.join(__dirname, '..', 'content', 'navigation.json')
const nav = JSON.parse(fs.readFileSync(navFile, 'utf8'))
const mega = nav.megaMenus?.find((m) => m.id === 'patient-welfare')
if (mega) {
  for (const col of mega.columns || []) {
    for (const link of col.links || []) {
      if (link.href === '/patient-welfare/admission-process') {
        link.label = 'Patient Admission Process'
      }
      if (link.href === '/patient-welfare/patient-rights') {
        link.label = 'Patient Rights & Responsibilities'
      }
    }
  }
}
fs.writeFileSync(navFile, JSON.stringify(nav, null, 2) + '\n')

console.log(`Updated ${Object.keys(RESOURCES).length} patient-resources pages.`)
