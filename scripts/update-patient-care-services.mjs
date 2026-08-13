/**
 * Rebuilds Patient Care services (Hospital Facilities, Clinical Support, Support Services)
 * to match the department detail pattern:
 * - paraphrased MarketingHero excerpt (+ optional quote from tagline)
 * - verbatim overview body and section copy
 * - serviceGroups / bullets / content / accommodation / callout / closingBand
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, '..', 'content', 'services.json')
const existing = JSON.parse(fs.readFileSync(file, 'utf8'))

const MEDIA = '/media/services-hero-banner.webp'

const PATIENT_CARE = [
  {
    slug: 'opd',
    title: 'Outpatient Department (OPD)',
    category: 'Hospital Facilities',
    categorySlug: 'facilities',
    description:
      'Expert consultations across 40+ specialties, with free medicines for every OPD patient.',
    excerpt:
      'Expert consultations across 40+ specialties, with free medicines for every OPD patient.',
    hero: {
      kicker: 'Hospital Facilities',
      title: 'Outpatient Department (OPD)',
      quote: 'Expert Consultations. Comprehensive Care. Free Medicines for Every OPD Patient.',
      excerpt:
        'Expert consultations across 40+ specialties, with free medicines for every OPD patient.',
      media: { type: 'image', src: MEDIA, alt: 'Outpatient Department (OPD)' },
      links: [
        { label: 'Our Services', href: '#services', variant: 'primary' },
        { label: 'Why Choose Us', href: '#why-choose', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Timings', href: '#timings' },
      { label: 'Services', href: '#services' },
      { label: 'Why Choose Us', href: '#why-choose' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'First Point of Contact for Expert Care',
        background: 'white',
        body: [
          'The Outpatient Department (OPD) at Hijaz Hospital is the first point of contact for patients seeking expert medical consultation, diagnosis, treatment, and follow-up care. With over 40 experienced consultants across a wide range of medical and surgical specialties, we provide quality healthcare that is accessible, affordable, and compassionate.',
          'As a charitable healthcare institution, Hijaz Hospital is committed to making quality healthcare accessible to everyone. Through our welfare and donor-supported programs, all OPD patients receive free medicines, ensuring that essential treatment remains within reach for individuals and families in need.',
        ],
      },
      {
        type: 'content',
        id: 'timings',
        kicker: 'OPD Timings',
        heading: 'OPD Timings',
        background: 'muted',
        body: ['Morning Clinic: 8:00 AM – 2:00 PM', 'Evening Clinic: 2:00 PM – 8:00 PM'],
      },
      {
        type: 'content',
        id: 'specialized-care',
        kicker: 'Specialized Medical Care',
        heading: 'Specialized Medical Care',
        background: 'white',
        body: [
          'Our consultants provide comprehensive evaluation and personalized treatment plans across multiple specialties, helping patients receive the right care at the right time.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Diagnostic & Support Services',
        heading: 'Diagnostic & Support Services',
        intro: 'To support accurate diagnosis and effective treatment, OPD patients have access to:',
        groups: [
          {
            heading: 'Diagnostic & Support Services',
            icon: 'microscope',
            items: [
              'Laboratory Investigations',
              'Radiology & Imaging Services',
              'Pharmacy Support',
              'Specialist Referrals',
            ],
          },
        ],
        footer:
          'In situations where, certain specialized diagnostic tests or services are not available within the hospital, Hijaz Hospital coordinates these investigations through trusted external laboratories and diagnostic partners. This ensures that patients continue to receive timely, accurate, and uninterrupted medical care.',
      },
      {
        type: 'bullets',
        id: 'why-choose',
        layout: 'cards',
        background: 'white',
        kicker: 'Why Choose Us',
        heading: 'Why Choose Hijaz Hospital OPD?',
        items: [
          '40+ Specialized Consultants',
          'Free Medicines for All OPD Patients',
          'Comprehensive Diagnostic Support',
          'Affordable and Accessible Healthcare',
          'Convenient Morning & Evening Clinics',
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Compassionate Care',
        quote:
          'Dedicated to compassionate, patient-centered care, our OPD serves as a trusted gateway to quality healthcare for the community.',
      },
    ],
  },
  {
    slug: 'ipd',
    title: 'Inpatient Department (IPD)',
    category: 'Hospital Facilities',
    categorySlug: 'facilities',
    description:
      'Compassionate inpatient care — hospitalization, surgery, and recovery, accessible to all.',
    excerpt:
      'Compassionate inpatient care — hospitalization, surgery, and recovery, accessible to all.',
    hero: {
      kicker: 'Hospital Facilities',
      title: 'Inpatient Department (IPD)',
      quote: 'Compassionate Inpatient Care, Accessible to All.',
      excerpt:
        'Compassionate inpatient care — hospitalization, surgery, and recovery, accessible to all.',
      media: { type: 'image', src: MEDIA, alt: 'Inpatient Department at Hijaz Hospital' },
      links: [
        { label: 'Our Services', href: '#services', variant: 'primary' },
        { label: 'Accommodation', href: '#accommodation', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Welfare Support', href: '#welfare' },
      { label: 'Sehat Sahulat', href: '#sehat-sahulat' },
      { label: 'Surgical Services', href: '#services' },
      { label: 'Accommodation', href: '#accommodation' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Comprehensive Medical and Surgical Care',
        background: 'white',
        body: [
          'The Inpatient Department (IPD) at Hijaz Hospital provides comprehensive medical and surgical care for patients requiring hospitalization, continuous monitoring, specialized treatment, and postoperative recovery. With an average of 25–35 daily admissions, our IPD is equipped to deliver quality care through experienced consultants, skilled nursing staff, and modern medical facilities.',
        ],
      },
      {
        type: 'content',
        id: 'welfare',
        kicker: 'Accessible Healthcare for All',
        heading: 'Accessible Healthcare for All',
        background: 'muted',
        body: [
          'Many of our admitted patients come from underprivileged backgrounds and rely on charitable support to access essential healthcare services. As a charitable healthcare institution, Hijaz Hospital is committed to ensuring that no patient is denied treatment due to financial hardship.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'welfare-support',
        layout: 'stack',
        background: 'muted',
        kicker: 'Welfare Support',
        heading: 'Free Treatment Includes',
        intro:
          'Through donor-supported welfare programs, deserving and critically ill patients receive free treatment, including:',
        groups: [
          {
            heading: 'Free Treatment Includes',
            icon: 'hand-coins',
            items: [
              'Hospitalization',
              'Surgical Procedures',
              'Medications',
              'Diagnostic Investigations',
              'Nursing Care',
              'Follow-up Services',
            ],
          },
        ],
      },
      {
        type: 'callout',
        id: 'sehat-sahulat',
        kicker: 'Government Coverage',
        heading: 'Sehat Sahulat Program',
        background: 'white',
        body: [
          "Hijaz Hospital is also enlisted under the Government of Pakistan's Sehat Sahulat Program, enabling eligible patients to receive medical and surgical treatment through government-sponsored healthcare coverage. This initiative helps reduce financial burdens while ensuring access to quality healthcare services.",
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Surgical Services',
        heading: 'Surgical Services',
        intro: 'Our hospital performs a wide range of surgical procedures across multiple specialties, including:',
        groups: [
          {
            heading: 'Surgical Specialties',
            icon: 'knife',
            items: [
              'Orthopedic Surgery',
              'General Surgery',
              'ENT Surgery',
              'Urology',
              'Gynecology & Obstetrics',
              'Gastroenterology Procedures',
            ],
          },
        ],
        footer:
          'All procedures are supported by qualified surgeons, experienced consultants, dedicated nursing teams, and advanced medical infrastructure.',
      },
      {
        type: 'accommodation',
        id: 'accommodation',
        kicker: 'Accommodation',
        heading: 'Private & VIP Accommodation',
        background: 'white',
        intro: [
          'For patients seeking additional privacy and comfort, Hijaz Hospital offers private accommodation options with the same high standard of medical care provided throughout the hospital. These rooms feature modern amenities and personalized support while remaining available at subsidized rates to make quality healthcare more accessible.',
        ],
        rooms: [
          { count: '4', label: 'Private Gynecology Rooms' },
          { count: '2', label: 'VIP Rooms' },
          { count: '1', label: 'Semi-VIP Room' },
          { count: '1', label: 'VVIP Room' },
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Compassionate Inpatient Care',
        quote:
          'From admission to recovery, our IPD team is dedicated to providing safe, dignified, and patient-centered care, ensuring every patient receives the treatment and support they need throughout their hospital stay.',
      },
    ],
  },
  {
    slug: 'icu',
    title: 'Intensive Care Unit (ICU)',
    category: 'Hospital Facilities',
    categorySlug: 'facilities',
    description:
      '24/7 critical care with continuous monitoring and life-support for the most seriously ill.',
    excerpt:
      '24/7 critical care with continuous monitoring and life-support for the most seriously ill.',
    hero: {
      kicker: 'Hospital Facilities',
      title: 'Intensive Care Unit (ICU)',
      excerpt:
        '24/7 critical care with continuous monitoring and life-support for the most seriously ill.',
      media: { type: 'image', src: MEDIA, alt: 'Intensive Care Unit (ICU)' },
      links: [
        { label: 'Facilities & Services', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Facilities & Services', href: '#services' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Specialized Care for Critically Ill Patients',
        background: 'white',
        body: [
          'The Intensive Care Unit (ICU) at Hijaz Hospital provides specialized care for critically ill patients requiring continuous monitoring, advanced medical treatment, and life-support services.',
          'The ICU operates 24 hours a day, 7 days a week, providing uninterrupted critical care for patients with severe medical and surgical conditions, postoperative complications, respiratory failure, and other life-threatening emergencies.',
          'The unit is staffed by experienced doctors, nurses, anesthesia personnel, and critical care professionals who work together to deliver comprehensive, patient-centered care around the clock.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Facilities and Services',
        heading: 'Facilities and Services',
        intro: 'The ICU consists of 6 fully equipped beds and offers:',
        groups: [
          {
            heading: 'ICU Facilities and Services',
            icon: 'heartbeat',
            items: [
              'Continuous 24/7 patient monitoring',
              'Postoperative critical care',
              'Ventilator and respiratory support',
              'Emergency stabilization and resuscitation',
              'Critical care and anesthesia consultations',
              'Management of high-risk surgical and medical patients',
              'Round-the-clock nursing care',
              'Multidisciplinary treatment planning',
            ],
          },
        ],
        footer:
          'Equipped with advanced monitoring and life-support systems, the ICU is committed to providing timely, effective, and compassionate care in a safe and closely supervised environment.',
      },
    ],
  },
  {
    slug: 'emergency',
    title: 'Emergency Department',
    category: 'Hospital Facilities',
    categorySlug: 'facilities',
    description:
      'Round-the-clock emergency care for acute illness, injury, and urgent medical needs.',
    excerpt:
      'Round-the-clock emergency care for acute illness, injury, and urgent medical needs.',
    hero: {
      kicker: 'Hospital Facilities',
      title: 'Emergency Department',
      excerpt:
        'Round-the-clock emergency care for acute illness, injury, and urgent medical needs.',
      media: { type: 'image', src: MEDIA, alt: 'Emergency Department' },
      links: [
        { label: 'Our Services', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Services', href: '#services' },
      { label: 'Accessible Care', href: '#accessible-care' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Immediate Care, Around the Clock',
        background: 'white',
        body: [
          'The Emergency Department at Hijaz Hospital provides immediate medical care for patients requiring urgent treatment and operates 24 hours a day, 7 days a week.',
          'Our experienced team of physicians, nurses, and healthcare professionals is available around the clock to manage a wide range of emergencies, including acute illnesses, injuries, accidents, and other urgent medical conditions. Patients receive prompt assessment, stabilization, and treatment to ensure timely and effective care.',
          'Serving hundreds of patients each day, the Emergency Department is a trusted source of emergency healthcare for the community.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Services',
        heading: 'Services',
        groups: [
          {
            heading: 'Emergency Services',
            icon: 'first-aid',
            items: [
              '24/7 emergency medical care',
              'Initial assessment and triage',
              'Management of acute illnesses and injuries',
              'Emergency stabilization and treatment',
              'Referral to specialist consultants when required',
              'Continuous medical and nursing supervision',
              'Coordination with inpatient, surgical, and critical care services',
              'Minor surgical procedures, including wound management and other urgent surgical interventions',
            ],
          },
        ],
      },
      {
        type: 'content',
        id: 'accessible-care',
        kicker: 'Affordable and Accessible Care',
        heading: 'Affordable and Accessible Care',
        background: 'white',
        body: [
          'Hijaz Hospital is committed to ensuring access to quality healthcare for all. Medicines administered during emergency treatment are provided free of charge, and financially disadvantaged patients may receive free medical care based on eligibility and need.',
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Compassionate Care',
        quote:
          'With experienced healthcare professionals and round-the-clock services, the Emergency Department remains dedicated to providing timely, safe, and compassionate care whenever it is needed most.',
      },
    ],
  },
  {
    slug: 'ot-complex',
    title: 'Operation Theatre Complex',
    category: 'Hospital Facilities',
    categorySlug: 'facilities',
    description:
      'Modern theatres and multidisciplinary surgical teams for safe, high-quality procedures.',
    excerpt:
      'Modern theatres and multidisciplinary surgical teams for safe, high-quality procedures.',
    hero: {
      kicker: 'Hospital Facilities',
      title: 'Operation Theatre Complex',
      excerpt:
        'Modern theatres and multidisciplinary surgical teams for safe, high-quality procedures.',
      media: { type: 'image', src: MEDIA, alt: 'Operation Theatre Complex' },
      links: [
        { label: 'Surgical Services', href: '#services', variant: 'primary' },
        { label: 'Facilities', href: '#facilities', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Facilities', href: '#facilities' },
      { label: 'Surgical Services', href: '#services' },
      { label: 'Patient Safety', href: '#safety' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Modern Surgical Facilities',
        background: 'white',
        body: [
          'The Operation Theatre Complex at Hijaz Hospital is a modern surgical facility designed to provide safe, efficient, and high-quality surgical care across multiple specialties.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'facilities',
        layout: 'stack',
        background: 'muted',
        kicker: 'Facilities',
        heading: 'Facilities',
        intro:
          'The complex consists of three fully equipped operation theatres for General Surgery, one dedicated to Gynecology, one assigned for Eye Surgery, and one specialized for Gastroenterology procedures. These theatres are supported by essential facilities that ensure smooth surgical workflows and optimal patient care, including:',
        groups: [
          {
            heading: 'Supporting Facilities',
            icon: 'hospital',
            items: [
              "Surgeons' Room",
              'Patient Recovery Room',
              'Central Sterile Supply Department (CSSD)',
              'Dedicated Pharmacy Store',
              'Preoperative and postoperative support areas',
            ],
          },
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'white',
        kicker: 'Surgical Services',
        heading: 'Surgical Services',
        intro: 'The Operation Theatre Complex supports a wide range of surgical procedures, including:',
        groups: [
          {
            heading: 'Surgical Procedures',
            icon: 'knife',
            items: [
              'General Surgery',
              'Orthopedic Surgery',
              'Gynecological Surgery',
              'Ophthalmic (Eye) Surgery',
              'Urology Procedures',
              'ENT (Ear, Nose and Throat) Surgery',
              'Gastrointestinal Endoscopic Procedures (or Gastroenterology Procedures, as applicable)',
              'Minor and major surgical procedures',
              'Emergency surgical procedures',
              'Laparoscopic (Minimally Invasive) Surgery',
              'Plastic and Reconstructive Surgery',
            ],
          },
        ],
      },
      {
        type: 'content',
        id: 'safety',
        kicker: 'Quality and Patient Safety',
        heading: 'Quality and Patient Safety',
        background: 'muted',
        body: [
          'Patient safety and infection prevention are central to all surgical services at Hijaz Hospital. The complex follows strict sterilization and infection control protocols and is supported by experienced surgeons, anesthetists, nurses, and operation theatre technicians who work together to deliver safe, effective, and high-quality surgical care.',
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Comprehensive Care',
        quote:
          'With modern facilities, advanced surgical equipment, and a multidisciplinary approach, the Operation Theatre Complex provides comprehensive surgical services for patients requiring both routine and specialized procedures.',
      },
    ],
  },
  {
    slug: 'nursing',
    title: 'Nursing Department',
    category: 'Clinical Support',
    categorySlug: 'clinical',
    description:
      'Caring hands, compassionate hearts, and professional excellence — 50+ nurses around the clock.',
    excerpt:
      'Caring hands, compassionate hearts, and professional excellence — 50+ nurses around the clock.',
    hero: {
      kicker: 'Clinical Support',
      title: 'Nursing Department',
      quote: 'Caring hands, compassionate hearts, and professional excellence',
      excerpt:
        'Caring hands, compassionate hearts, and professional excellence — 50+ nurses around the clock.',
      media: { type: 'image', src: MEDIA, alt: 'Nursing Department' },
      links: [
        { label: 'Nursing Services', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Nursing Services', href: '#services' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Continuous, and Safe Care',
        background: 'white',
        body: [
          'The Nursing Department at Hijaz Hospital plays a vital role in providing Continuous, and Safe Care to patients across all departments.',
          'Supported by a team of more than 50 qualified and professionally trained nurses, the department works closely with doctors and healthcare teams to ensure effective treatment, patient comfort, and smooth recovery.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Nursing Services',
        heading: 'Nursing Services',
        intro: 'Our nursing team provides:',
        groups: [
          {
            heading: 'Nursing Services',
            icon: 'heartbeat',
            items: [
              '24/7 patient care and monitoring',
              'Administration of medications and treatments',
              'Monitoring of vital signs and patient conditions',
              'Assistance with patient comfort and daily care needs',
              'Infection prevention and patient safety practices',
              'Support for treatment plans and clinical care coordination',
            ],
          },
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Patient-Centered Care',
        quote:
          'With a strong focus on professionalism, compassion, and patient-centered care, the Nursing Care Department remains committed to ensuring that every patient receives safe and quality healthcare throughout their hospital stay.',
      },
    ],
  },
  {
    slug: 'anesthesia',
    title: 'Anesthesia Department',
    category: 'Clinical Support',
    categorySlug: 'clinical',
    description: 'Safe anesthesia care before, during, and after surgery — available 24/7.',
    excerpt: 'Safe anesthesia care before, during, and after surgery — available 24/7.',
    hero: {
      kicker: 'Clinical Support',
      title: 'Anesthesia Department',
      excerpt: 'Safe anesthesia care before, during, and after surgery — available 24/7.',
      media: { type: 'image', src: MEDIA, alt: 'Anesthesia Department' },
      links: [
        { label: 'Our Services', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Services', href: '#services' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Safe and Specialized Anesthesia Care',
        background: 'white',
        body: [
          'The Anesthesia Department at Hijaz Hospital provides safe and specialized anesthesia care for patients undergoing surgical and diagnostic procedures. Our experienced team of anesthetists ensures comprehensive care before, during, and after surgery.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Services',
        heading: 'Anesthesia Services',
        intro:
          'Working closely with surgeons, operation theatre teams, and the Intensive Care Unit (ICU), the department provides:',
        groups: [
          {
            heading: 'Anesthesia Services',
            icon: 'syringe',
            items: [
              'Pre-anesthetic assessment and patient evaluation',
              'Anesthesia management during surgical procedures',
              'Postoperative monitoring and pain management',
              'Critical care support when required',
              'Continuous patient monitoring throughout procedures',
            ],
          },
        ],
        footer:
          "Using modern anesthesia techniques and evidence-based practices, our team delivers individualized care based on each patient's medical condition and surgical needs.",
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Patient Safety',
        quote:
          'With 24/7 availability and a commitment to patient safety, the Anesthesia Department supports a wide range of surgical specialties while ensuring a comfortable and secure surgical experience.',
      },
    ],
  },
  {
    slug: 'ambulance',
    title: 'Ambulance Services',
    category: 'Clinical Support',
    categorySlug: 'clinical',
    description: '24/7 ambulance transport with free service for deserving patients.',
    excerpt: '24/7 ambulance transport with free service for deserving patients.',
    hero: {
      kicker: 'Clinical Support',
      title: 'Ambulance Services',
      excerpt: '24/7 ambulance transport with free service for deserving patients.',
      media: { type: 'image', src: MEDIA, alt: 'Ambulance Services' },
      links: [
        { label: 'Overview', href: '#overview', variant: 'primary' },
        { label: 'Accessible Care', href: '#accessible-care', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Accessible Care', href: '#accessible-care' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Timely Transportation and Emergency Support',
        background: 'white',
        body: [
          'Hijaz Hospital provides 24/7 ambulance services to ensure timely transportation and emergency medical support for patients whenever required.',
          'Our ambulance services are equipped to support safe patient transfers, including emergency transportation and the transfer of critically ill patients requiring medical assistance during transit.',
        ],
      },
      {
        type: 'content',
        id: 'accessible-care',
        kicker: 'Accessible Healthcare',
        heading: 'Accessible Healthcare',
        background: 'muted',
        body: [
          'As part of our commitment to accessible healthcare, ambulance services are provided free of charge to deserving patients, helping ensure that financial limitations do not prevent access to urgent medical care.',
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Emergency Assistance',
        quote:
          "With a focus on rapid response, safe transportation, and patient support, Hijaz Hospital's ambulance services remain available whenever emergency assistance is needed.",
      },
    ],
  },
  {
    slug: 'dialysis',
    title: 'Dialysis Care Unit',
    category: 'Clinical Support',
    categorySlug: 'clinical',
    description: 'Safe, reliable dialysis since 2008 — with free care for eligible patients.',
    excerpt: 'Safe, reliable dialysis since 2008 — with free care for eligible patients.',
    hero: {
      kicker: 'Clinical Support',
      title: 'Dialysis Care Unit',
      excerpt: 'Safe, reliable dialysis since 2008 — with free care for eligible patients.',
      media: { type: 'image', src: MEDIA, alt: 'Dialysis Care Unit' },
      links: [
        { label: 'Facilities & Services', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Facilities & Services', href: '#services' },
      { label: 'Patient Support', href: '#support' },
      { label: 'Access', href: '#access' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Compassionate Renal Care Since 2008',
        background: 'white',
        body: [
          'Established in 2008, the Dialysis Care Unit at Hijaz Hospital provides safe, reliable, and high-quality dialysis services for patients living with kidney failure. The unit is dedicated to delivering compassionate renal care, with a special commitment to serving deserving and underprivileged members of the community.',
          'The unit is equipped with advanced Fresenius dialysis machines and follows strict safety, infection control, and quality protocols to ensure effective and comfortable dialysis treatment.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Facilities and Services',
        heading: 'Facilities and Services',
        groups: [
          {
            heading: 'Dialysis Facilities and Services',
            icon: 'drop',
            items: [
              '30 fully equipped dialysis machines',
              'Regular dialysis sessions through multiple daily shifts',
              'Safe and closely monitored dialysis treatment',
              'Experienced medical and nursing support',
              'Continuous patient monitoring throughout each dialysis session',
            ],
          },
        ],
      },
      {
        type: 'content',
        id: 'support',
        kicker: 'Support for Deserving Patients',
        heading: 'Support for Deserving Patients',
        background: 'white',
        body: [
          "Hijaz Hospital is committed to making essential healthcare accessible to all. Eligible patients who are unable to afford treatment may receive dialysis services free of charge through the hospital's support program.",
        ],
      },
      {
        type: 'content',
        id: 'access',
        kicker: 'Accessing Dialysis Services',
        heading: 'Accessing Dialysis Services',
        background: 'muted',
        body: [
          "Patients seeking dialysis care may contact the Dialysis Care Unit for medical evaluation and the availability of treatment slots. Dialysis services are provided based on the patient's medical needs and the available capacity of the unit.",
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Compassionate Care',
        quote:
          'The Dialysis Care Unit continues to serve patients with a commitment to safe, compassionate, and accessible kidney care.',
      },
    ],
  },
  {
    slug: 'pharmacy',
    title: 'Pharmacy',
    category: 'Support Services',
    categorySlug: 'support',
    description: 'Safe, authentic medicines with free dispensing for deserving patients.',
    excerpt: 'Safe, authentic medicines with free dispensing for deserving patients.',
    hero: {
      kicker: 'Support Services',
      title: 'Pharmacy',
      excerpt: 'Safe, authentic medicines with free dispensing for deserving patients.',
      media: { type: 'image', src: MEDIA, alt: 'Pharmacy' },
      links: [
        { label: 'Pharmacy Services', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Pharmacy Services', href: '#services' },
      { label: 'Accessible Care', href: '#accessible-care' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Safe, Authentic, and Quality Medicines',
        background: 'white',
        body: [
          'At Hijaz Hospital, the Pharmacy plays an important role in supporting patient care by ensuring the availability of safe, authentic, and quality medicines for patients.',
          'Our pharmacy department focuses on responsible medicine procurement, proper storage, and safe dispensing practices, and regular audit processes to maintain quality, transparency, and patient safety.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Pharmacy Services',
        heading: 'Pharmacy Services',
        intro: 'These mainly include',
        groups: [
          {
            heading: 'Pharmacy Services',
            icon: 'pill',
            items: [
              'Availability of quality medicines for patients',
              "Safe dispensing according to physicians' prescriptions",
              'Support for OPD, admitted patients, surgical, and specialized care services',
              'Proper medicine storage and quality control practices',
              'Efficient medicine management and patient support',
              'Regular audits for ensuring quality standards and transparency',
            ],
          },
        ],
      },
      {
        type: 'content',
        id: 'accessible-care',
        kicker: 'Commitment to Accessible Healthcare',
        heading: 'Commitment to Accessible Healthcare',
        background: 'white',
        body: [
          'Through hospital resources and welfare support, Hijaz Hospital provides free medicines to deserving patients who require financial assistance, helping ensure that treatment remains accessible to those in need.',
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Compassionate Service',
        quote:
          'With a focus on safety, reliability, and compassionate service, Pharmacy Services at Hijaz Hospital continue to support patients throughout their healthcare journey.',
      },
    ],
  },
  {
    slug: 'blood-bank',
    title: 'Blood Bank',
    category: 'Support Services',
    categorySlug: 'support',
    description:
      'Voluntary donations, careful screening, and transfusion support when patients need it.',
    excerpt:
      'Voluntary donations, careful screening, and transfusion support when patients need it.',
    hero: {
      kicker: 'Support Services',
      title: 'Blood Bank',
      excerpt:
        'Voluntary donations, careful screening, and transfusion support when patients need it.',
      media: { type: 'image', src: MEDIA, alt: 'Blood Bank' },
      links: [
        { label: 'Blood Bank Services', href: '#services', variant: 'primary' },
        { label: 'Overview', href: '#overview', variant: 'ghost' },
      ],
    },
    jumpLinks: [
      { label: 'Overview', href: '#overview' },
      { label: 'Services', href: '#services' },
    ],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Safe and Reliable Transfusion Support',
        background: 'white',
        body: [
          "Hijaz Hospital's Blood Bank provides safe and reliable services to support patients requiring blood transfusion and related laboratory services.",
          'As a trust hospital, we receive blood through voluntary donations and ensure that every blood unit is carefully screened, stored, and handled according to established safety standards.',
        ],
      },
      {
        type: 'serviceGroups',
        id: 'services',
        layout: 'stack',
        background: 'muted',
        kicker: 'Blood Bank Services',
        heading: 'Blood Bank Services',
        groups: [
          {
            heading: 'Blood Bank Services',
            icon: 'drop',
            items: [
              'Whole blood collection, processing, and issuance',
              'Fresh Frozen Plasma (FFP) services',
              'Blood grouping and Rh factor testing',
              'Donor blood grouping and cross-matching',
              'Complete cross-match facility for safe transfusion',
              'Direct and Indirect Coombs Tests',
            ],
          },
        ],
        footer:
          'All blood storage, testing, and transfusion procedures are carried out with strict attention to safety and quality. The Blood Bank team works in coordination with medical departments to provide timely support for patients requiring transfusion.',
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Patient Support',
        quote:
          'Hijaz Hospital provides Blood Bank support for patients in need, with special assistance available for deserving patients whenever required.',
      },
    ],
  },
  {
    slug: 'cafeteria',
    title: 'Cafeteria',
    category: 'Support Services',
    categorySlug: 'support',
    description:
      'Clean, hygienic meals and snacks at subsidized rates for patients, visitors, and staff.',
    excerpt:
      'Clean, hygienic meals and snacks at subsidized rates for patients, visitors, and staff.',
    hero: {
      kicker: 'Support Services',
      title: 'Cafeteria',
      excerpt:
        'Clean, hygienic meals and snacks at subsidized rates for patients, visitors, and staff.',
      media: { type: 'image', src: MEDIA, alt: 'Cafeteria' },
      links: [{ label: 'Overview', href: '#overview', variant: 'primary' }],
    },
    jumpLinks: [{ label: 'Overview', href: '#overview' }],
    sections: [
      {
        type: 'content',
        id: 'overview',
        kicker: 'Overview',
        heading: 'Clean, Comfortable, and Hygienic Food Services',
        background: 'white',
        body: [
          "Hijaz Hospital's Cafeteria provides clean, comfortable, and hygienic food services for patients, attendants, visitors, and hospital staff.",
          'The cafeteria offers a variety of fresh meals, snacks, and beverages at subsidized rates, ensuring access to affordable food within the hospital premises.',
        ],
      },
      {
        type: 'closingBand',
        id: 'closing',
        kicker: 'Supportive Environment',
        quote:
          'With a focus on quality, cleanliness, and respectful service, the cafeteria is designed to provide a convenient and supportive environment for everyone visiting and working at Hijaz Hospital.',
      },
    ],
  },
]

const PATIENT_SLUGS = new Set(PATIENT_CARE.map((s) => s.slug))
const diagnostics = existing.filter((s) => !PATIENT_SLUGS.has(s.slug))

// Keep Patient Care group order, then diagnostics
const next = [...PATIENT_CARE, ...diagnostics]

fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n')
console.log(`Updated ${PATIENT_CARE.length} patient-care services; kept ${diagnostics.length} others.`)
