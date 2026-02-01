export interface BreadcrumbItem {
  label?: string
  to?: string
  href?: string
  disabled?: boolean
}

export interface BreadcrumbProps {
  separator?: string
  items?: BreadcrumbItem[]
}

export interface BreadcrumbEmits {
  (e: 'click', item: BreadcrumbItem, index: number): void
}
