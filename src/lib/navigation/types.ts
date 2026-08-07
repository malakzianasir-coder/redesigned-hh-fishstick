export type NavLink = {
  label: string
  href: string
  description?: string
  external?: boolean
}

export type NavGroup = {
  heading: string
  /** When set, the group title links to this hub (or overview) page. */
  href?: string
  links: NavLink[]
}

export type NavTopLevelItem = {
  id: string
  label: string
  moreLink?: NavLink
  groups: NavGroup[]
}

export type NavigationData = {
  topLevel: NavTopLevelItem[]
}
