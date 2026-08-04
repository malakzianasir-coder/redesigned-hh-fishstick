/**
 * Enrich content/lab-tests.json with CMS-ready detail fields.
 * Usage: node scripts/enrich-lab-tests.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dirname, '../content/lab-tests.json')

const ALIASES = {
  alt: [{ name: 'SGPT' }, { name: 'Alanine Aminotransferase' }],
  ast: [{ name: 'SGOT' }, { name: 'Aspartate Aminotransferase' }],
  alp: [{ name: 'Alkaline Phosphatase' }],
  hbaic: [{ name: 'HbA1c' }, { name: 'Glycated Hemoglobin' }],
  gtt: [{ name: 'Glucose Tolerance Test' }, { name: 'OGTT' }],
  cbc: [{ name: 'Complete Blood Count' }, { name: 'Full Blood Count' }],
  hbsag: [{ name: 'Hepatitis B Surface Antigen' }],
  'anti-hcv': [{ name: 'Hepatitis C Antibody' }],
  'hiv-by-elisa': [{ name: 'HIV Screening' }],
  'vdrl-syphilis': [{ name: 'VDRL' }, { name: 'Syphilis Screen' }],
  crp: [{ name: 'C-Reactive Protein' }],
  'ra-factor': [{ name: 'Rheumatoid Factor' }],
  esr: [{ name: 'Erythrocyte Sedimentation Rate' }],
  aptt: [{ name: 'Activated Partial Thromboplastin Time' }],
  pt: [{ name: 'Prothrombin Time' }],
  tsh: [{ name: 'Thyroid Stimulating Hormone' }],
  fsh: [{ name: 'Follicle Stimulating Hormone' }],
  lh: [{ name: 'Luteinizing Hormone' }],
  'beta-hcg': [{ name: 'β-hCG' }, { name: 'Pregnancy Test (Quantitative)' }],
  upt: [{ name: 'Urine Pregnancy Test' }, { name: 'UPT' }],
  mp: [{ name: 'Malaria Parasite' }, { name: 'Peripheral Smear for MP' }],
  'vitamin-d': [{ name: '25-OH Vitamin D' }],
  pth: [{ name: 'Parathyroid Hormone' }],
  'trop-i': [{ name: 'Troponin I' }, { name: 'Cardiac Marker' }],
  dlc: [{ name: 'Differential Leukocyte Count' }],
  tlc: [{ name: 'Total Leukocyte Count' }],
  hb: [{ name: 'Hemoglobin' }],
  'dengune-ns-1-antigen': [{ name: 'Dengue NS1 Antigen' }],
  'dengue-igg': [{ name: 'Dengue IgG Antibody' }],
  'dengue-igm': [{ name: 'Dengue IgM Antibody' }],
  'h-pylori-stool-antigen': [{ name: 'H. pylori Antigen' }],
  'stool-c-e': [{ name: 'Stool Routine Examination' }],
  'urine-complete-examination': [{ name: 'Urine R/E' }, { name: 'Urinalysis' }],
}

const PANEL_INCLUDES = {
  'liver-function-test': ['Bilirubin Total', 'ALT', 'AST', 'ALP', 'Albumin'],
  'renal-function-test': ['Urea', 'Creatine', 'Uric Acid'],
  'lipid-profile': ['Cholesterol', 'Triglyceride', 'HDL', 'LDL'],
  'serum-electrolytes': ['Sodium', 'Potassium', 'Chloride'],
  'screening-profile-anti-hcv-hbsag': ['Anti HCV', 'HBsAg'],
  'thyroid-profile': ['T3', 'T4', 'TSH'],
  'fertility-profile': ['FSH', 'LH', 'Prolactin', 'TSH'],
  'cbc-for-dengue': ['CBC', 'Platelet count'],
}

const FASTING_SLUGS = new Set([
  'glucose-fasting',
  'gtt',
  'lipid-profile',
  'cholesterol',
  'triglyceride',
  'hdl',
  'ldl',
  'liver-function-test',
  'renal-function-test',
])

const CATEGORY_PURPOSE = {
  'Routine Chemistry': 'metabolic and organ function',
  'Glucose profile': 'blood sugar control and diabetes screening',
  Hematology: 'blood cell counts and morphology',
  Microbiology: 'infection detection and culture sensitivity',
  'Special chemistry': 'hormone, immunology, and specialised markers',
  'Coagulation profile': 'clotting function and bleeding risk',
  Dengue: 'dengue fever diagnosis and monitoring',
  Other: 'general diagnostic assessment',
}

function paragraph(text) {
  return { type: 'paragraph', text }
}

function buildDescription(test) {
  const purpose = CATEGORY_PURPOSE[test.category] || 'clinical assessment'
  const specimen = test.specimen || 'the required specimen'
  return [
    paragraph(
      `${test.name} is a laboratory investigation used to support ${purpose}. The test is performed on ${specimen.toLowerCase()}.`,
    ),
    paragraph(
      `Your clinician may order this test to help diagnose, monitor, or rule out conditions related to your symptoms and medical history.`,
    ),
  ]
}

function buildPreparation(test) {
  if (FASTING_SLUGS.has(test.slug)) {
    return [
      paragraph('Fast for 10–12 hours before sample collection. Water is permitted.'),
      paragraph('Avoid alcohol and heavy meals the evening before the test.'),
    ]
  }
  if (test.specimen?.toLowerCase().includes('urine')) {
    return [
      paragraph('Collect a clean-catch midstream urine sample in the container provided.'),
      paragraph('Avoid contamination from skin or external surfaces.'),
    ]
  }
  if (test.specimen?.toLowerCase().includes('stool')) {
    return [
      paragraph('Collect a fresh stool sample in the sterile container provided.'),
      paragraph('Avoid mixing with urine or toilet water.'),
    ]
  }
  if (test.specimen?.toLowerCase().includes('semen')) {
    return [
      paragraph('Abstain from ejaculation for 2–5 days before collection unless advised otherwise.'),
      paragraph('Collect the sample at the laboratory or as directed by staff.'),
    ]
  }
  return [
    paragraph('No special preparation is usually required unless your doctor advises otherwise.'),
    paragraph('Inform the phlebotomist of any medications, supplements, or recent illness.'),
  ]
}

function buildSampleInstructions(test) {
  const specimen = test.specimen || 'as directed'
  if (specimen.toLowerCase().includes('edta')) {
    return 'An EDTA (purple-top) blood tube is required. Hand the labelled sample to laboratory staff immediately after collection.'
  }
  if (specimen.toLowerCase().includes('sodium citrate')) {
    return 'Collect blood in a sodium citrate (blue-top) tube. Fill the tube to the marked line and invert gently 3–4 times.'
  }
  if (specimen.toLowerCase().includes('serum')) {
    return 'Blood is drawn into a clotted (gold/red-top) tube, allowed to clot, then centrifuged for serum separation.'
  }
  if (specimen.toLowerCase().includes('urine')) {
    return 'Use the sterile container provided. A midstream clean-catch sample is preferred unless a timed collection is ordered.'
  }
  if (specimen.toLowerCase().includes('stool')) {
    return 'Transfer a walnut-sized portion into the sterile stool pot. Label with name, date, and time of collection.'
  }
  if (specimen.toLowerCase().includes('swab')) {
    return 'Specimen is collected using a sterile swab or syringe as appropriate. Follow staff instructions for site preparation.'
  }
  return `Present at the sample collection area with the required specimen: ${specimen}. Staff will guide you through labelling and handling.`
}

function buildReportDelivery(test) {
  const time = test.reportingTime || '24 hours'
  if (test.isOutsourced) {
    return `This test is processed by a partner reference laboratory. Results are typically available within ${time} and will be shared once verified by our pathology team.`
  }
  return `Results are usually available within ${time} during routine working hours. Urgent or critical results are communicated directly to the referring clinician.`
}

function buildAvailability(test) {
  if (test.isOutsourced) {
    return 'Sample collection: Monday–Saturday, 7:00 AM – 8:00 PM. Outsourced processing may extend turnaround on weekends and public holidays.'
  }
  return 'Sample collection: Monday–Saturday, 7:00 AM – 10:00 PM. Reporting times may vary on Sundays and public holidays.'
}

function enrichTest(test) {
  const included = PANEL_INCLUDES[test.slug]
  return {
    ...test,
    alsoKnownAs: ALIASES[test.slug] || [],
    description: buildDescription(test),
    preparation: buildPreparation(test),
    includedTests: included ? included.map((name) => ({ name })) : [],
    sampleInstructions: buildSampleInstructions(test),
    reportDelivery: buildReportDelivery(test),
    availability: buildAvailability(test),
  }
}

const data = JSON.parse(readFileSync(jsonPath, 'utf8'))
data.tests = data.tests.map(enrichTest)
writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`Enriched ${data.tests.length} lab tests.`)
