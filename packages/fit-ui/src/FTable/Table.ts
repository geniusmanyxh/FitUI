export type TableSizeType = 'small' | 'medium' | 'large'
export type TableAlignType = 'left' | 'center' | 'right'

export type TableRow = Record<string, unknown>

export interface TableColumn {
  /**
   * 列的唯一标识（支持别名 dataIndex、prop）
   */
  key?: string
  /**
   * 列的数据字段名（与 key 互为别名）
   */
  dataIndex?: string
  /**
   * 列的唯一标识（与 key 互为别名，向后兼容）
   */
  prop?: string
  /**
   * 列的显示标题（支持别名 title、label）
   */
  label?: string
  /**
   * 列的显示标题（与 label 互为别名）
   */
  title?: string
  width?: string | number
  minWidth?: string | number
  align?: TableAlignType
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean
  resizable?: boolean
  className?: string
  headerClassName?: string
  cellClassName?: string
  type?: 'default' | 'selection' | 'index' | 'expand'
  selectable?: (row: TableRow, index: number) => boolean
  index?: number | ((index: number) => number)
  showOverflowTooltip?: boolean
}

export interface TableProps {
  data?: TableRow[]
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
  height?: string | number
  rowClassName?: string | ((data: { row: TableRow; rowIndex: number }) => string)
  rowStyle?: Record<string, string | number> | ((data: { row: TableRow; rowIndex: number }) => Record<string, string | number>)
  showSummary?: boolean
  sumText?: string
  summaryMethod?: (data: { columns: TableColumn[]; data: TableRow[] }) => (string | number)[]
  spanMethod?: (data: { row: TableRow; column: TableColumn; rowIndex: number; columnIndex: number }) => [number, number] | { rowspan: number; colspan: number }
  defaultExpandAll?: boolean
  treeProps?: { children: string; hasChildren: string }
  indent?: number
  currentRowKey?: string | number
  loading?: boolean
  loadingText?: string
}

export interface TableEmits {
  (e: 'sort', prop: string, order: 'ascending' | 'descending'): void
  (e: 'selection-change', selection: TableRow[]): void
  (e: 'select', selection: TableRow[], row: TableRow): void
  (e: 'select-all', selection: TableRow[]): void
  (e: 'row-click', row: TableRow, index: number): void
  (e: 'row-dblclick', row: TableRow, index: number): void
  (e: 'row-contextmenu', row: TableRow, column: TableColumn, event: MouseEvent): void
  (e: 'header-click', column: TableColumn, event: MouseEvent): void
  (e: 'cell-click', row: TableRow, column: TableColumn, cell: unknown, event: MouseEvent): void
}
