/**
 * Transforms Mother & Child + Specialized Care departments to match Surgery shell:
 * - paraphrased MarketingHero excerpt
 * - verbatim overview body
 * - serviceGroups layout: finder
 * - why-choose as bullets cards
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, '..', 'content', 'departments.json')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))

const UPDATES = {
  'gynaecology-obstetrics': {
    title: 'Gynaecology & Obstetrics',
    category: 'Mother & Child Care',
    categorySlug: 'mother-child',
    paraphrase:
      'Pregnancy, maternity, and women’s health care — from routine and high-risk obstetrics to gynecological diagnosis and surgery.',
    tagline: 'Comprehensive Women’s Healthcare Services',
    overviewBody: [
      'The Gynaecology & Obstetrics Department at Hijaz Hospital provides comprehensive care for women through all stages of life, including pregnancy care, obstetric services, gynecological diagnosis, and surgical treatment. The department is supported by experienced gynecologists, obstetricians, nursing staff, and modern hospital facilities to provide safe and patient-centered care.',
      'The department offers management of routine and high-risk pregnancies, gynecological disorders, reproductive health conditions, and advanced surgical procedures.',
    ],
    servicesHeading: 'Our Services',
    groups: [
      {
        heading: 'Obstetric Services & Procedures',
        items: [
          'Cesarean Section (LSCS)',
          'Cesarean Hysterectomy',
          'Obstetric Hysterectomy',
          'Exploratory Laparotomy for Ruptured Uterus',
          'Repair of Uterine Rupture',
          'Cervical Cerclage Insertion',
          'Management Surgery for Postpartum Hemorrhage (PPH)',
          'Episiotomy and Repair',
          'Perineal Tear Repair',
          'Exploratory laparotomy for ectopic pregnancy)',
          'Cervical Cerclage Removal',
          'Manual Removal of Placenta',
          'Vacuum-Assisted Vaginal Delivery',
          'Forceps Delivery',
        ],
      },
      {
        heading: 'Major Gynecological Surgeries',
        items: [
          'Total Abdominal Hysterectomy (TAH)',
          'Vaginal Hysterectomy (VH)',
          'Oophorectomy',
          'Salpingectomy',
          'Myomectomy',
          'Ovarian Cystectomy',
          'Manchester Repair',
          'Anterior Colporrhaphy',
          'Posterior Colporrhaphy',
        ],
      },
      {
        heading: 'Gynecological Diagnostic & Minor Procedures',
        items: [
          'Pap Smear',
          'Cervical Biopsy',
          'Endometrial Biopsy',
          'Dilatation and Curettage (D&C)',
          'Dilatation and Evacuation (D&E)',
          'Bartholin Cyst Incision and Drainage',
          'Marsupialization of Bartholin Cyst',
          'Cauterization of Cervical Erosion',
          'Removal of Cervical Polyp',
          'Bilateral Tubal Ligation (BTL)',
          'Manual Vacuum Aspiration (MVA)',
          'Insertion and Removal of Intrauterine Contraceptive Device (IUCD)',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Gynaecology & Obstetrics?',
    whyItems: [
      'Experienced gynecologists and obstetricians',
      'Comprehensive maternity and women’s healthcare services',
      'Management of routine and high-risk pregnancies',
      'Advanced gynecological surgical procedures',
      'Support from modern operation theatre and hospital facilities',
      'Patient-focused care with emphasis on safety and dignity',
    ],
  },

  'pediatrics-neonatology': {
    title: 'Pediatrics',
    category: 'Mother & Child Care',
    categorySlug: 'mother-child',
    paraphrase:
      'Outpatient, inpatient, emergency, and newborn care for infants, children, and adolescents — with a focus on early diagnosis and healthy development.',
    tagline: 'Comprehensive Healthcare for Infants, Children & Adolescents',
    overviewBody: [
      'The Pediatrics Department at Hijaz Hospital provides comprehensive outpatient, inpatient, emergency, and newborn care for infants, children, and adolescents. Our pediatric team is committed to delivering compassionate, evidence-based medical care, focusing on early diagnosis, effective treatment, and healthy growth and development.',
      'The department manages a wide range of childhood illnesses while providing ongoing monitoring and follow-up to support long-term health.',
    ],
    servicesHeading: 'Our Pediatric Services',
    groups: [
      {
        heading: 'Outpatient & Inpatient Care',
        items: [
          'Pediatric outpatient (OPD) consultations',
          'Management of admitted pediatric patients',
          'Emergency assessment and treatment for acutely ill children',
          'Well-baby nursery care',
        ],
      },
      {
        heading: 'Conditions We Manage',
        items: [
          'Pneumonia',
          'Diarrheal diseases',
          'Bronchiolitis',
          'Bronchial Asthma',
          'Enteric Fever (Typhoid)',
          'Urinary Tract Infections (UTIs)',
          'Recurrent febrile illnesses',
          'Other common childhood medical conditions',
        ],
      },
      {
        heading: 'Diagnostic Support',
        items: [
          'Pediatric laboratory investigations',
          'Pediatric X-ray services',
          'Clinical evaluation and ongoing follow-up',
        ],
      },
    ],
    afterServices: [
      {
        type: 'content',
        id: 'emergency-pediatric-care',
        kicker: 'Emergency Care',
        heading: 'Emergency Pediatric Care',
        background: 'white',
        body: [
          'Children requiring urgent medical attention receive prompt assessment and emergency management. Critically ill patients are stabilized and managed according to their clinical condition, with referral to higher-level pediatric care when specialized services are required.',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Pediatrics?',
    whyItems: [
      'Comprehensive outpatient, inpatient, and emergency pediatric care',
      'Well-baby nursery services',
      'Experienced pediatric healthcare team',
      'Diagnostic support for timely evaluation',
      'Patient-centered care with emphasis on prevention, treatment, and regular follow-up',
    ],
  },

  'dietetics-nutrition': {
    title: 'Dietetics & Nutrition',
    category: 'Specialized Care',
    categorySlug: 'specialized',
    paraphrase:
      'Personalized nutrition assessment, counseling, and medical nutrition therapy for OPD, inpatient, ICU, and lifestyle-related needs.',
    tagline: 'Personalized Nutrition Care for Better Health',
    overviewBody: [
      'The Dietetics & Nutrition Department at Hijaz Hospital provides comprehensive nutrition assessment, counseling, and medical nutrition therapy for patients with different health conditions. Our qualified nutrition professionals work closely with medical teams to develop personalized dietary plans that support treatment, recovery, and long-term health.',
      'The department provides nutrition services for OPD patients, admitted patients, critically ill patients, and individuals requiring lifestyle and disease-specific dietary management.',
    ],
    servicesHeading: 'Our Nutrition Services',
    groups: [
      {
        heading: 'Clinical Nutrition & Medical Nutrition Therapy',
        items: [
          'Nutrition OPD consultations',
          'In-ward patient nutritional assessment and counseling',
          'Medical Nutrition Therapy (MNT)',
          'Malnutrition assessment and management',
          'Nutrition education and follow-up',
        ],
      },
      {
        heading: 'Disease-Specific Diet Counseling',
        items: [
          'Diabetes dietary counseling',
          'Mounted / Standing in Kids',
          'Hypertension and cardiac diet counseling',
          'Renal diet planning for kidney disease and dialysis patients',
          'Nutritional guidance for critically ill patients in ICU',
        ],
      },
      {
        heading: 'Weight & Lifestyle Management',
        items: [
          'Obesity management',
          'Weight management programs',
          'Body composition and nutrition assessment',
          'Lifestyle modification counseling',
        ],
      },
      {
        heading: 'Women’s Health Nutrition',
        items: [
          'Antenatal patient nutrition assessment and counseling',
          'Postnatal patient nutrition assessment and counseling',
          'PCOS dietary management',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Dietetics & Nutrition?',
    whyItems: [
      'Qualified nutrition professionals and patient-centered counseling',
      'Personalized diet plans based on individual health needs',
      'Support for medical conditions through evidence-based nutrition care',
      'Coordination with doctors and clinical departments',
      'Continuous monitoring and follow-up for better outcomes',
    ],
  },

  'physiotherapy-rehabilitation': {
    title: 'Physiotherapy',
    category: 'Specialized Care',
    categorySlug: 'specialized',
    paraphrase:
      'Evidence-based rehabilitation to reduce pain, restore mobility, and improve function after injury, surgery, and chronic conditions.',
    tagline: 'Rehabilitation, Recovery & Functional Improvement',
    overviewBody: [
      'The Physiotherapy Department at Hijaz Hospital provides comprehensive rehabilitation services to help patients recover mobility, reduce pain, improve physical function, and enhance quality of life. Our trained physiotherapists use evidence-based techniques, modern rehabilitation equipment, and personalized exercise programs to support recovery from injuries, surgeries, neurological conditions, and chronic disorders.',
      'The department provides rehabilitation services for orthopedic, neurological, pediatric, gynecological, and general medical conditions.',
    ],
    servicesHeading: 'Our Physiotherapy Services',
    groups: [
      {
        heading: 'Electrotherapy & Pain Management Modalities',
        items: [
          'Short Wave Diathermy (SWD)',
          'Ultrasound Therapy',
          'Electrical Muscle Stimulation (EMS)',
          'Transcutaneous Electrical Nerve Stimulation (TENS)',
          'Electrical Stimulation Therapy',
          'Heat Therapy',
          'Cold Therapy',
          'Vibrator Therapy',
          'Pain Management Modalities',
        ],
      },
      {
        heading: 'Manual Therapy & Rehabilitation',
        items: [
          'Range of Motion (ROM) Exercises',
          'Strengthening Exercises',
          'Stretching Exercises',
          'Aerobic Exercises',
          'Balance and Coordination Training',
          'Postural Correction',
          'Gait Training',
          'Functional Rehabilitation',
          'Manual Mobilization Techniques',
          'Exercise Therapy Programs',
          'Cervical and Lumbar Traction',
        ],
      },
      {
        heading: 'Specialized Rehabilitation Programs',
        items: [
          'Gym-based therapeutic exercises',
          'Dumbbell and gym ball exercises',
          'TheraBand exercises',
          'Cupping Therapy',
          'Dry Needling',
        ],
      },
      {
        heading: 'Orthopedic Physiotherapy',
        items: [
          'Back Pain',
          'Neck Pain',
          'Shoulder Pain',
          'Knee Pain',
          'Arthritis',
          'Frozen Shoulder',
          'Sports Injuries',
          'Fracture Rehabilitation',
          'Joint Stiffness',
          'Muscle Spasm',
          'Spinal Spondylosis',
          'PIVD (Prolapsed Intervertebral Disc)',
          'Tennis Elbow',
          'Post-operative Rehabilitation',
        ],
      },
      {
        heading: 'Neurological Physiotherapy',
        items: [
          'Bell’s Palsy',
          'Facial Palsy',
          'Stroke Rehabilitation',
          'Paralysis Rehabilitation',
          'Neuromuscular Weakness',
          'Balance Disorders',
          'Nerve Injuries',
        ],
      },
      {
        heading: 'Women’s Health Physiotherapy',
        items: [
          'Postpartum Rehabilitation',
          'Pelvic Floor Rehabilitation',
          'Pregnancy-related Back Pain',
          'Post-Cesarean Section Recovery',
        ],
      },
      {
        heading: 'Pediatric Physiotherapy',
        items: [
          'Developmental Delays',
          'Pediatric Weakness',
          'Postural Problems in Children',
        ],
      },
      {
        heading: 'General Rehabilitation',
        items: ['Pain Management', 'Muscle Weakness', 'Mobility Training'],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Physiotherapy?',
    whyItems: [
      'Experienced physiotherapists and rehabilitation team',
      'Comprehensive rehabilitation programs',
      'Modern physiotherapy modalities and equipment',
      'Personalized treatment plans based on patient needs',
      'Support for postoperative and chronic condition recovery',
      'Focus on improving mobility, independence, and quality of life',
    ],
  },

  dermatology: {
    title: 'Dermatology',
    category: 'Internal Medicine & Allied Specialties',
    categorySlug: 'internal-medicine',
    paraphrase:
      'Diagnosis and treatment for skin, hair, and nail conditions — with OPD care, minor procedures, and preventive guidance.',
    tagline: 'Expert Skin, Hair & Nail Care',
    overviewBody: [
      'The Dermatology Department at Hijaz Hospital provides comprehensive diagnosis, treatment, and preventive care for a wide range of conditions affecting the skin, hair, and nails. Serving both outpatient (OPD) and referred inpatient (IPD) patients, our experienced dermatologist is committed to delivering high-quality, evidence-based, and patient-centered care in a safe and compassionate environment',
      'With a commitment to clinical excellence and individualized care, the Dermatology Department at Hijaz Hospital helps patients achieve healthier skin, hair, and nails while improving their overall quality of life.',
    ],
    servicesHeading: 'Our Services',
    servicesIntro:
      'Our Dermatology Department offers specialized consultation, diagnosis, and treatment for a wide range of dermatological conditions, including:',
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
          'Electrocautery and cauterization',
          'Intralesional steroid injections for conditions such as:',
          'Keloids',
          'Alopecia Areata',
          'Hypertrophic scars',
          'Lichen Planus',
          'Platelet-Rich Plasma (PRP) Therapy for selected hair loss conditions',
          'Assessment and management of benign skin lesions',
          'Removal of warts and skin tags',
        ],
      },
      {
        heading: 'Patient Education & Preventive Care',
        items: [
          'Daily skincare routines',
          'Prevention of common skin infections',
          'Sun protection and UV safety',
          'Hair and scalp care',
          'Long-term management of chronic skin diseases',
          'Lifestyle and dietary measures that support healthy skin',
        ],
      },
    ],
    whyHeading: 'Why Choose Hijaz Hospital Dermatology?',
    whyItems: [
      'Experienced dermatologist',
      'Evidence-based diagnosis and treatment',
      'Management of common and chronic skin, hair, and nail disorders',
      'Minor dermatological procedures performed where clinically indicated',
      'Personalized patient education and preventive care',
      'Compassionate, patient-centered healthcare',
    ],
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
      body: update.overviewBody,
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
    ...(update.afterServices || []),
    {
      type: 'bullets',
      id: 'why-choose',
      layout: 'cards',
      background: 'white',
      kicker: 'Why Choose Us',
      heading: update.whyHeading,
      items: update.whyItems,
    },
  ]

  return {
    ...dept,
    title: update.title,
    category: update.category,
    categorySlug: update.categorySlug,
    description: update.paraphrase,
    excerpt: update.paraphrase,
    hero: {
      kicker: update.category,
      title: update.title,
      excerpt: update.paraphrase,
      media: dept.hero.media,
      links: [
        { label: 'Our Services', href: '#services', variant: 'primary' },
        { label: 'Why Choose Us', href: '#why-choose', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Services', href: '#services' },
      { label: 'Why Choose Us', href: '#why-choose' },
    ],
    sections,
  }
})

fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n')
console.log('Updated departments:', Object.keys(UPDATES).join(', '))
