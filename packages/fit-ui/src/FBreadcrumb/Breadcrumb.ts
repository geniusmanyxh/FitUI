export interface BreadcrumbItem {
  label?: string
  to?: string
  href?: string
  replace?: boolean
  disabled?: boolean
}

export interface BreadcrumbProps {
  separator?: string
  separatorIcon?: string
  items?: BreadcrumbItem[]
}

export interface BreadcrumbEmits {
  (e: 'click', item: BreadcrumbItem, index: number): void
}
