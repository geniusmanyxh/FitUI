export interface BadgeProps {
  value?: number | string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /** 值为 0 时是否显示 */
  showZero?: boolean
  /** Badge 的偏移量 [x, y] */
  offset?: [number, number]
  /** 自定义背景颜色 */
  color?: string
  /** 自定义 Badge 样式 */
  badgeStyle?: Record<string, any>
  /** 自定义 Badge 类名 */
  badgeClass?: string
}

export interface BadgeEmits {
  (e: 'click', event: MouseEvent): void
}
