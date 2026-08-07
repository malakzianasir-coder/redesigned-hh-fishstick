/**
 * Transforms Internal Medicine & Allied Specialty departments:
 * - paraphrased MarketingHero excerpt
 * - verbatim overview body
 * - serviceGroups layout: finder
 * - why-choose as bullets cards (or commitment content where provided)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, '..', 'content', 'departments.json')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))

const UPDATES = {
  'general-medicine': {
    paraphrase:
      'Adult medical care for acute illness, chronic disease, and complex conditions — with prevention, early diagnosis, and coordinated specialist support.',
    tagline: 'Comprehensive Internal Medicine Care',
    overview: [
      'The Medicine Department at Hijaz Hospital provides comprehensive diagnosis, treatment, and ongoing management of a wide range of adult medical conditions. The department is supported by experienced physicians and healthcare professionals who provide patient-centered care for acute illnesses, chronic diseases, and complex medical conditions.',
      'The department focuses on prevention, early diagnosis, disease management, and coordination of care with other specialties whenever required.',
    ],
    servicesHeading: 'Our Medical Services',
    groups: [
      {
        heading: 'Respiratory & Pulmonary Care',
        items: [
          'Pulmonary Medicine',
          'Diagnosis and management of respiratory diseases',
          'Acute and chronic lung conditions',
        ],
      },
      {
        heading: 'Diabetes & Endocrine Care',
        items: [
          'Diabetes and its complications',
          'Endocrine disorders',
          'Hypertension and related complications',
        ],
      },
      {
        heading: 'Kidney & Renal Care',
        items: [
          'Acute and chronic kidney diseases',
          'Kidney infections',
          'Coordination with specialized renal care services',
        ],
      },
      {
        heading: 'Gastrointestinal & Liver Care',
        items: [
          'Liver disorders',
          'Management of digestive system-related conditions',
        ],
      },
      {
        heading: 'General Medical Care',
        items: ['Infectious diseases'],
      },
      {
        heading: 'Musculoskeletal & Geriatric Care',
        items: [
          'Joint and rheumatic disorders',
          'Degenerative bone diseases',
          'Geriatric care for elderly patients',
        ],
      },
      {
        heading: 'Supportive & Critical Care Services',
        items: ['Critical care support', 'Hospice and supportive care services'],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Medicine Department?',
    whyItems: [
      'Experienced physicians and multidisciplinary healthcare team',
      'Management of acute and chronic medical conditions',
      'Comprehensive diagnosis and treatment planning',
      'Coordination with specialist departments when required',
      'Patient-focused care with continuous monitoring and follow-up',
    ],
  },

  gastroenterology: {
    paraphrase:
      'Diagnosis and treatment for digestive, liver, pancreas, and biliary conditions — including advanced endoscopy and emergency GI care.',
    tagline: 'Comprehensive Digestive & Liver Care',
    overview: [
      'The Gastroenterology Department at Hijaz Hospital provides comprehensive diagnostic services, treatment, and management of diseases affecting the gastrointestinal tract, liver, pancreas, and biliary system. The department offers advanced diagnostic and therapeutic procedures supported by experienced specialists and modern facilities.',
      'Our services provide timely and effective care for patients.',
    ],
    servicesHeading: 'Our Gastroenterology Services',
    groups: [
      {
        heading: 'Gastrointestinal Disorders',
        items: [
          'Peptic ulcer disease (PUD)',
          'Irritable Bowel Syndrome (IBS)',
          'Inflammatory Bowel Disease (IBD)',
          'Esophageal disorders',
          'Esophageal stricture management',
          'Achalasia management',
        ],
      },
      {
        heading: 'Liver & Biliary Care',
        items: [
          'Hepatitis and its various forms',
          'Chronic liver disease and cirrhosis management',
          'Hepatocellular carcinoma (Liver Cancer) care',
          'Pancreatic and biliary tract disorders',
          'Common Bile Duct (CBD) stone management',
        ],
      },
      {
        heading: 'Gastrointestinal Bleeding & Emergency Care',
        items: [
          'Upper Gastrointestinal Bleeding Management',
          'Lower Gastrointestinal Bleeding Management',
          'Tumor / Cancers of Gastrointestinal tract and Hepto – pancreatic biliary system',
        ],
      },
      {
        heading: 'Endoscopic Procedures',
        items: [
          'Upper Gastrointestinal Endoscopy',
          'Colonoscopy',
          'Sigmoidoscopy',
          'Endoscopic Retrograde Cholangiopancreatography (ERCP)',
          'Common Bile Duct (CBD) Stone Extraction',
          'Esophageal Foreign Body Removal',
          'Stomach Foreign Body Removal',
          'Esophageal stenting',
          'Duodenal Stenting',
          'Colonic Stenting',
          'CBD & Pancreatic Duct Stenting',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Gastroenterology?',
    whyItems: [
      'Experienced gastroenterologists and multidisciplinary care team',
      'Advanced diagnostic and therapeutic endoscopy services',
      'Comprehensive management of digestive and liver diseases',
      'Support for both routine and emergency gastrointestinal conditions',
      'Patient-focused care with modern diagnostic facilities',
    ],
  },

  nephrology: {
    paraphrase:
      'Preventive, diagnostic, and long-term kidney care — including dialysis, interventional procedures, transplant support, and critical renal management.',
    tagline: 'Comprehensive Kidney Care Services',
    overview: [
      'The Nephrology Department at Hijaz Hospital provides comprehensive preventive, diagnostic, therapeutic, and supportive care for patients with kidney diseases and related disorders. The department offers evaluation, treatment, and long-term management of kidney conditions through experienced nephrology specialists and a multidisciplinary healthcare team.',
      'Our services include management of acute and chronic kidney diseases, dialysis care, interventional nephrology procedures, transplant support, and critical care renal management.',
    ],
    servicesHeading: 'Our Nephrology Services',
    groups: [
      {
        heading: 'Clinical Nephrology',
        items: [
          'Diagnosis and management of:',
          'Acute Kidney Injury (AKI)',
          'Chronic Kidney Disease (CKD)',
          'Glomerular diseases',
          'Diabetic and hypertensive kidney disease',
          'Electrolyte and acid-base disorders',
          'Resistant hypertension',
        ],
      },
      {
        heading: 'Dialysis Services',
        items: [
          'Maintenance Hemodialysis',
          'Ongoing monitoring and management of dialysis patients',
        ],
      },
      {
        heading: 'Interventional Nephrology',
        items: [
          'Temporary dialysis catheter insertion',
          'Renal biopsy',
          'AV fistula assessment and coordination',
        ],
      },
      {
        heading: 'Kidney Transplant Support',
        items: [
          'Pre-transplant evaluation',
          'Post-transplant follow-up',
          'Monitoring of immunosuppressive therapy',
        ],
      },
      {
        heading: 'Critical Care Nephrology',
        items: [
          'Renal support for critically ill patients',
          'Management of fluid balance',
          'Electrolyte and acid-base management',
        ],
      },
      {
        heading: 'Preventive & Supportive Kidney Care',
        items: [
          'Chronic Kidney Disease (CKD) screening and counseling',
          'Nutrition and fluid management guidance',
          'Patient and family education',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Nephrology?',
    whyItems: [
      'Experienced nephrology specialists and multidisciplinary care team',
      'Comprehensive kidney disease management',
      'Dedicated dialysis support services',
      'Coordination with critical care and other specialties',
      'Focus on prevention, patient education, and long-term kidney health',
    ],
  },

  cardiology: {
    paraphrase:
      'Outpatient heart disease evaluation and medical management, plus pre-operative cardiac assessment to support safe anesthesia and surgery.',
    tagline: 'Comprehensive Cardiac Assessment & Outpatient Care',
    overview: [
      'The Cardiology Department at Hijaz Hospital provides specialized outpatient services for the diagnosis, evaluation, and medical management of heart diseases. The department also plays an important role in pre-operative cardiac assessment, helping ensure that patients are medically fit for anesthesia and surgical procedures.',
      'Working in close coordination with other clinical departments, our cardiologist provides timely consultations, risk assessment, and treatment recommendations to support safe and effective patient care.',
    ],
    servicesHeading: 'Our Cardiology Services',
    groups: [
      {
        heading: 'Outpatient Cardiology Care',
        items: [
          'Cardiology consultations',
          'Diagnosis and medical management of heart diseases',
          'Hypertension evaluation and treatment',
          'Follow-up care and ongoing monitoring',
          'Cardiac risk assessment and preventive counseling',
        ],
      },
      {
        heading: 'Conditions We Manage',
        items: [
          'Valvular Heart Diseases',
          'Cardiomyopathy',
          'Heart Failure',
          'Cardiac Arrhythmias',
          'Pericardial Diseases',
          'Rheumatic Heart Diseases',
          'Congenital Heart Diseases',
          'Hypertension (High Blood Pressure)',
        ],
      },
      {
        heading: 'Pre-Surgical Cardiac Assessment',
        items: [
          'The Cardiology Department provides cardiac fitness evaluation and medical clearance for patients undergoing:',
          'General Surgery',
          'Gynaecological and Obstetric Procedures',
          'Urological Surgery',
          'Orthopedic Surgery',
          'Other elective surgical procedures, where required',
          'These evaluations help assess cardiac risk before anesthesia and surgery, supporting safe surgical outcomes.',
        ],
      },
    ],
    afterServices: [
      {
        type: 'content',
        id: 'referral',
        kicker: 'Advanced Care',
        heading: 'Referral for Advanced Cardiac Care',
        background: 'white',
        body: [
          'Patients requiring specialized cardiac interventions, emergency cardiac procedures, or advanced investigations are referred to appropriate tertiary care hospitals to ensure timely access to comprehensive cardiac services.',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Cardiology?',
    whyItems: [
      'Qualified cardiologist providing specialized outpatient care',
      'Comprehensive evaluation and management of heart diseases',
      'Reliable pre-operative cardiac assessment and fitness evaluation',
      'Essential diagnostic support available on-site',
      'Close coordination with surgical and medical specialties',
      'Affordable, accessible, and patient-centered care',
    ],
    closing: {
      id: 'commitment',
      kicker: 'Our Commitment',
      heading: 'Our Commitment',
      body: [
        'Hijaz Hospital is committed to providing accurate, compassionate, and evidence-based cardiac care. Through timely diagnosis, careful evaluation, and coordinated clinical management, we strive to support the cardiovascular health and overall well-being of every patient.',
      ],
    },
  },

  pulmonology: {
    paraphrase:
      'Outpatient, inpatient, and emergency care for respiratory and chest diseases — including TB evaluation, treatment, and follow-up.',
    tagline: 'Comprehensive Respiratory Care',
    overview: [
      'The Pulmonology Department at Hijaz Hospital provides specialized outpatient, inpatient, and emergency care for patients with respiratory and chest diseases. Our experienced pulmonology team offers comprehensive evaluation, diagnosis, treatment, and follow-up for both acute and chronic lung conditions.',
      'The department works closely with other clinical specialties to provide coordinated care and ensure timely management of patients with respiratory illnesses.',
    ],
    servicesHeading: 'Our Pulmonology Services',
    groups: [
      {
        heading: 'Outpatient & Inpatient Care',
        items: [
          'Pulmonology consultations for OPD patients',
          'Management of admitted patients with respiratory diseases',
          'Emergency evaluation and treatment of critical respiratory conditions',
          'Consultation for patients referred from other hospital departments',
        ],
      },
      {
        heading: 'Conditions We Manage',
        items: [
          'Bronchial Asthma',
          'Chronic Obstructive Pulmonary Disease (COPD)',
          'Pulmonary Tuberculosis (TB)',
          'Respiratory Infections',
          'Other acute and chronic lung diseases',
        ],
      },
      {
        heading: 'Diagnostic Support',
        items: [
          'The department is supported by essential diagnostic services, including:',
          'Chest X-ray',
          'Pulmonary investigations, as clinically indicated',
          'Ongoing monitoring and follow-up of respiratory conditions',
        ],
      },
    ],
    afterServices: [
      {
        type: 'content',
        id: 'tb-care',
        kicker: 'TB Care',
        heading: 'Tuberculosis (TB) Care',
        background: 'white',
        body: [
          'Hijaz Hospital is committed to supporting patients with pulmonary tuberculosis by providing comprehensive evaluation, treatment, and follow-up. Eligible patients receive anti-tuberculosis treatment free of charge in accordance with hospital policies and national treatment guidelines.',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Pulmonology?',
    whyItems: [
      'Specialized care for respiratory and chest diseases',
      'Outpatient, inpatient, and emergency pulmonology services',
      'Integrated diagnostic support',
      'Coordinated care with other clinical departments',
      'Free treatment for eligible tuberculosis patients',
      'Patient-focused care with emphasis on long-term respiratory health',
    ],
  },

  endocrinology: {
    paraphrase:
      'Specialist care for hormonal and metabolic disorders — including diabetes, thyroid disease, and long-term endocrine management.',
    tagline: 'Comprehensive Hormonal & Metabolic Care',
    overview: [
      'The Endocrinology Department at Hijaz Hospital provides specialized care for patients with hormonal, metabolic, and endocrine disorders. Our endocrinology services focus on accurate diagnosis, evidence-based treatment, and long-term management to help patients achieve better health and improved quality of life.',
      'The department works closely with other clinical specialties to provide coordinated care for patients with complex endocrine and metabolic conditions.',
    ],
    servicesHeading: 'Our Endocrinology Services',
    groups: [
      {
        heading: 'Diagnosis and Management of:',
        items: [
          'Diabetes Mellitus',
          'Thyroid Disorders',
          'Polycystic Ovary Syndrome (PCOS)',
          'Dyslipidemia (Disorders of Blood Lipids)',
          'Hypertension related to endocrine disorders',
          'Obesity and Weight Management',
          'Adrenal Gland Disorders',
          'Pituitary Gland Disorders',
          'Parathyroid Gland Disorders',
          'Growth Disorders, including Short Stature',
          'Delayed Puberty',
          'Precocious Puberty (Early Puberty)',
        ],
      },
      {
        heading: 'Patient Care & Follow-Up',
        items: [
          'Comprehensive endocrine evaluation',
          'Individualized treatment plans',
          'Long-term disease monitoring and follow-up',
          'Lifestyle and dietary counseling in coordination with the Dietetics & Nutrition Department',
          'Patient education for chronic endocrine conditions',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Endocrinology?',
    whyItems: [
      'Specialized care for hormonal and metabolic disorders',
      'Evidence-based diagnosis and treatment',
      'Personalized long-term disease management',
      'Multidisciplinary care with other medical specialties',
      'Patient-centered approach focused on improving long-term health outcomes',
    ],
  },

  dermatology: {
    paraphrase:
      'Diagnosis and treatment for skin, hair, and nail conditions — including minor procedures, preventive guidance, and patient education.',
    tagline: 'Expert Skin, Hair & Nail Care',
    overview: [
      'The Dermatology Department at Hijaz Hospital provides comprehensive diagnosis and treatment for diseases affecting the skin, hair, and nails. Our experienced dermatologist is committed to delivering high-quality, patient-centered care using evidence-based medical practices.',
    ],
    servicesHeading: 'Our Services',
    servicesIntro:
      'Our Dermatology Department offers specialized consultation and treatment for a wide range of skin conditions, including:',
    groups: [
      {
        heading: 'Skin, Hair & Nail Conditions',
        items: [
          'Acne and acne scars',
          'Eczema (Dermatitis)',
          'Psoriasis',
          'Fungal skin infections',
          'Bacterial and viral skin infections',
          'Allergic skin disorders',
          'Vitiligo',
          'Pigmentation disorders',
          'Hair fall and scalp diseases',
          'Alopecia (Hair Loss)',
          'Nail disorders',
          'Keloids and hypertrophic scars',
          'Warts, moles, and skin tags',
          'Chronic itching and rashes',
          'Lichen Planus and other inflammatory skin diseases',
        ],
      },
      {
        heading: 'Minor Dermatological Procedures',
        items: [
          'Our dermatologist performs various minor dermatological procedures, including:',
          'Electrocautery and cauterization',
          'Intralesional steroid injections for conditions such as: Keloids, Alopecia Areata, Hypertrophic scars, Lichen Planus',
          'Platelet-Rich Plasma (PRP) Therapy for selected hair loss conditions',
          'Skin lesion assessment and management',
          'Wart and skin tag removal (where indicated)',
        ],
      },
      {
        heading: 'Patient Education & Preventive Care',
        items: [
          'We believe that prevention is an essential part of healthy skin. Our team provides guidance on:',
          'Daily skincare routines',
          'Prevention of common skin infections',
          'Sun protection and UV safety',
          'Hair and scalp care',
          'Management of chronic skin diseases',
          'Lifestyle and dietary advice for healthy skin',
        ],
      },
    ],
    closing: {
      id: 'commitment',
      kicker: 'Our Commitment',
      heading: 'Dedicated Skin Care',
      body: [
        'At Hijaz Hospital, our Dermatology Department is dedicated to providing compassionate, affordable, and effective skin care to help patients achieve healthier skin and improved quality of life.',
      ],
    },
  },
}

const next = data.map((dept) => {
  const update = UPDATES[dept.slug]
  if (!update) return dept

  const sections = [
    {
      type: 'content',
      id: 'overview',
      kicker: 'Overview',
      heading: update.tagline,
      background: 'white',
      body: update.overview,
    },
    {
      type: 'serviceGroups',
      id: 'services',
      layout: 'finder',
      background: 'muted',
      kicker: 'Services',
      heading: update.servicesHeading,
      ...(update.servicesIntro ? { intro: update.servicesIntro } : {}),
      groups: update.groups,
    },
  ]

  if (update.afterServices) {
    sections.push(...update.afterServices)
  }

  if (update.whyItems) {
    sections.push({
      type: 'bullets',
      id: 'why-choose',
      layout: 'cards',
      background: 'white',
      kicker: 'Why Choose Us',
      heading: update.whyHeading,
      items: update.whyItems,
    })
  }

  if (update.closing) {
    sections.push({
      type: 'content',
      id: update.closing.id,
      kicker: update.closing.kicker,
      heading: update.closing.heading,
      background: update.whyItems ? 'muted' : 'white',
      body: update.closing.body,
    })
  }

  const jumpLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Services', href: '#services' },
  ]
  if (update.whyItems) {
    jumpLinks.push({ label: 'Why Choose Us', href: '#why-choose' })
  } else if (update.closing) {
    jumpLinks.push({ label: 'Our Commitment', href: `#${update.closing.id}` })
  }

  const heroLinks = [{ label: 'Our Services', href: '#services', variant: 'primary' }]
  if (update.whyItems) {
    heroLinks.push({ label: 'Why Choose Us', href: '#why-choose', variant: 'ghost' })
  } else if (update.closing) {
    heroLinks.push({ label: 'Our Commitment', href: `#${update.closing.id}`, variant: 'ghost' })
  }

  return {
    ...dept,
    description: update.paraphrase,
    excerpt: update.paraphrase,
    hero: {
      kicker: dept.category,
      title: dept.title,
      excerpt: update.paraphrase,
      media: dept.hero.media,
      links: heroLinks,
    },
    jumpLinks,
    sections,
  }
})

fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n')
console.log('Updated Internal Medicine departments:', Object.keys(UPDATES).join(', '))
