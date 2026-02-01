export type PaginationSizeType = 'small' | 'medium' | 'large'

export interface PaginationProps {
  currentPage?: number
  pageSize?: number
  total?: number
  pageCount?: number
  pagerCount?: number
  pageSizeOptions?: number[]
  layout?: string[]
  prevText?: string
  nextText?: string
  disabled?: boolean
  hideOnSinglePage?: boolean
  size?: PaginationSizeType
  background?: boolean
}

export interface PaginationEmits {
  (e: 'update:currentPage', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'size-change', current: number, size: number): void
  (e: 'current-change', current: number): void
  (e: 'prev-click', current: number): void
  (e: 'next-click', current: number): void
}
