export type NavLink = {
  label: string
  href: string
  description?: string
  external?: boolean
}

export type NavGroup = {
  heading: string
  links: NavLink[]
}

export type NavFeatured = {
  title: string
  description: string
  ctaLabel: string
  href: string
}

export type NavTopLevelItem = {
  id: string
  label: string
  moreLink?: NavLink
  groups: NavGroup[]
  featured?: NavFeatured
}

export type NavigationData = {
  topLevel: NavTopLevelItem[]
}
