import {
  ArrowUpRight,
  Bone,
  ClipboardText,
  Drop,
  Ear,
  FirstAid,
  GenderFemale,
  HandCoins,
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
  ShieldCheck,
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
  bone: Bone,
  ear: Ear,
  drop: Drop,
  'gender-female': GenderFemale,
  pulse: Pulse,
  scan: Scan,
  rows: Rows,
  'list-checks': ListChecks,
  'arrow-up-right': ArrowUpRight,
  'magnifying-glass': MagnifyingGlass,
  'image-square': ImageSquare,
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
  const IconComponent = name ? SECTION_ICON_MAP[name] : null
  if (!IconComponent) return null
  return <IconComponent size={size} weight="duotone" className={className} />
}
