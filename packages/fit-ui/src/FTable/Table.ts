export type TableSizeType = 'small' | 'medium' | 'large'
export type TableAlignType = 'left' | 'center' | 'right'

export interface TableColumn {
  key: string
  label?: string
  width?: string | number
  minWidth?: string | number
  align?: TableAlignType
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean
  resizable?: boolean
  className?: string
  headerClassName?: string
  cellClassName?: string
}

export interface TableProps {
  data?: Record<string, any>[]
  columns?: TableColumn[]
  size?: TableSizeType
  stripe?: boolean
  border?: boolean
  highlightCurrentRow?: boolean
  showHeader?: boolean
  rowKey?: string
  defaultSort?: { prop: string; order: 'ascending' | 'descending' }
  emptyText?: string
  fit?: boolean
  maxHeight?: string | number
  lazy?: boolean
}

export interface TableEmits {
  (e: 'sort', prop: string, order: 'ascending' | 'descending'): void
  (e: 'selection-change', selection: Record<string, any>[]): void
  (e: 'row-click', row: Record<string, any>, index: number): void
  (e: 'row-dblclick', row: Record<string, any>, index: number): void
  (e: 'row-contextmenu', row: Record<string, any>, column: TableColumn, event: MouseEvent): void
  (e: 'header-click', column: TableColumn, event: MouseEvent): void
  (e: 'cell-click', row: Record<string, any>, column: TableColumn, cell: any, event: MouseEvent): void
}
