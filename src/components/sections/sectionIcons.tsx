import {
  ArrowUpRight,
  Baby,
  Bone,
  Check,
  CheckCircle,
  ClipboardText,
  Drop,
  Ear,
  Eye,
  FirstAid,
  GenderFemale,
  HandCoins,
  Heart,
  Heartbeat,
  Hospital,
  ImageSquare,
  Knife,
  ListChecks,
  MagnifyingGlass,
  Microscope,
  Pill,
  Pulse,
  Rows,
  Scan,
  Scissors,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Tooth,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

export const SECTION_ICON_MAP: Record<string, Icon> = {
  'users-three': UsersThree,
  hospital: Hospital,
  knife: Knife,
  'clipboard-text': ClipboardText,
  'shield-check': ShieldCheck,
  'hand-coins': HandCoins,
  pill: Pill,
  microscope: Microscope,
  'first-aid': FirstAid,
  'first-aid-kit': FirstAid,
  bone: Bone,
  ear: Ear,
  drop: Drop,
  'gender-female': GenderFemale,
  pulse: Pulse,
  scan: Scan,
  rows: Rows,
  'list-checks': ListChecks,
  check: Check,
  'check-circle': CheckCircle,
  heart: Heart,
  heartbeat: Heartbeat,
  'arrow-up-right': ArrowUpRight,
  'magnifying-glass': MagnifyingGlass,
  'image-square': ImageSquare,
  stethoscope: Stethoscope,
  scissors: Scissors,
  syringe: Syringe,
  tooth: Tooth,
  eye: Eye,
  baby: Baby,
}

/** Infer a section icon from a service-group heading when none is set in content. */
export function iconForServiceHeading(heading?: string): string {
  const h = (heading || '').toLowerCase()
  if (h.includes('all procedure')) return 'list-checks'
  if (h.includes('obstetric') || h.includes('gynecol') || h.includes('gynaecol') || h.includes('maternity') || h.includes('pregnancy') || h.includes('cesarean') || h.includes('women'))
    return 'gender-female'
  if (h.includes('pediatric') || h.includes('children') || h.includes('congenital') || h.includes('well-baby') || h.includes('newborn') || h.includes('infant') || h.includes('outpatient & inpatient'))
    return 'baby'
  if (h.includes('nutrition') || h.includes('diet') || h.includes('malnutrition') || h.includes('weight & lifestyle'))
    return 'pill'
  if (h.includes('physio') || h.includes('rehab') || h.includes('electrotherapy') || h.includes('manual therapy') || h.includes('exercise') || h.includes('neurological physio') || h.includes('general rehabilitation'))
    return 'pulse'
  if (h.includes('trauma') || h.includes('fracture') || h.includes('bone') || h.includes('ortho') || h.includes('spine') || h.includes('joint') || h.includes('sports') || h.includes('musculoskeletal') || h.includes('rheumatic') || h.includes('geriatric') || h.includes('reconstructive orthopedic'))
    return 'bone'
  if (h.includes('eye') || h.includes('ophthal') || h.includes('vision') || h.includes('corneal') || h.includes('cataract') || h.includes('glaucoma') || h.includes('eyelid') || h.includes('conjunct'))
    return 'eye'
  if (h.includes('ear') || h.includes('ent') || h.includes('nose') || h.includes('throat') || h.includes('sinus') || h.includes('tonsil') || h.includes('thyroid') || h.includes('parotid') || h.includes('laryng'))
    return 'ear'
  if (h.includes('dental') || h.includes('tooth') || h.includes('endodont') || h.includes('periodont') || h.includes('prosthodont') || h.includes('orthodont') || h.includes('oral') || h.includes('filling') || h.includes('scaling') || h.includes('root canal') || h.includes('wisdom'))
    return 'tooth'
  if (h.includes('plastic') || h.includes('reconstruct') || h.includes('cosmetic') || h.includes('aesthetic') || h.includes('burn') || h.includes('scar') || h.includes('cleft') || h.includes('facelift') || h.includes('liposuction'))
    return 'scissors'
  if (h.includes('cardiac') || h.includes('cardio') || h.includes('heart')) return 'heartbeat'
  if (h.includes('pulmonary') || h.includes('respiratory') || h.includes('lung') || h.includes('tuberculosis') || h.includes('tb care') || h.includes('asthma') || h.includes('copd'))
    return 'pulse'
  if (h.includes('diabetes') || h.includes('endocrine') || h.includes('hormonal') || h.includes('metabolic') || h.includes('thyroid disorder'))
    return 'syringe'
  if (h.includes('dermat') || h.includes('skin') || h.includes('hair') || h.includes('nail') || h.includes('acne') || h.includes('eczema'))
    return 'first-aid'
  if (h.includes('dialysis') || h.includes('transplant') || h.includes('renal') || h.includes('kidney')) return 'drop'
  if (h.includes('laparoscop') || h.includes('minimally invasive') || h.includes('endourolog') || h.includes('cystoscop') || h.includes('endoscopic'))
    return 'scan'
  if (h.includes('stone') || h.includes('prostate') || h.includes('bladder') || h.includes('urolog') || h.includes('androlog') || h.includes('ureth') || h.includes('neph'))
    return 'drop'
  if (h.includes('head & neck') || h.includes('neck /')) return 'scissors'
  if (h.includes('hepat') || h.includes('gastro') || h.includes('colorectal') || h.includes('digestive') || h.includes('biliary') || h.includes('liver') || h.includes('general surgery') || h.includes('append') || h.includes('hernia'))
    return 'knife'
  if (h.includes('critical') || h.includes('hospice') || h.includes('supportive')) return 'hospital'
  if (h.includes('infectious') || h.includes('general medical') || h.includes('diagnosis and management'))
    return 'stethoscope'
  if (h.includes('diagnostic') || h.includes('examination') || h.includes('outpatient') || h.includes('assessment') || h.includes('education') || h.includes('preventive') || h.includes('follow-up') || h.includes('patient care'))
    return 'clipboard-text'
  if (h.includes('minor') || h.includes('major') || h.includes('surg')) return 'knife'
  if (h.includes('restorative')) return 'tooth'
  return 'stethoscope'
}

export function SectionIcon({
  name,
  size = 22,
  className,
}: {
  name?: string
  size?: number
  className?: string
}) {
  const IconComponent = name ? SECTION_ICON_MAP[name] : SECTION_ICON_MAP.stethoscope
  if (!IconComponent) return null
  return <IconComponent size={size} weight="duotone" className={className} />
}
