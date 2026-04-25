import type { allIconType } from '@utils/ficon'

export interface BreadcrumbItem {
  label?: string
  to?: string
  href?: string
  replace?: boolean
  disabled?: boolean
}

export interface BreadcrumbProps {
  separator?: string
  separatorIcon?: allIconType
  items?: BreadcrumbItem[]
}

export interface BreadcrumbEmits {
  (e: 'click', item: BreadcrumbItem, index: number): void
}
