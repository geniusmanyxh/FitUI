export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressStatusType = 'success' | 'exception' | 'warning' | 'default'

export interface ProgressProps {
  percentage?: number
  type?: ProgressType
  status?: ProgressStatusType
  strokeWidth?: number
  textInside?: boolean
  width?: number
  showText?: boolean
  color?: string | string[]
  backgroundColor?: string
  /** 是否为不确定进度 */
  indeterminate?: boolean
  /** 不确定进度动画持续时间(ms) */
  duration?: number
  /** 自定义文本格式化函数 */
  format?: (percentage: number) => string
  /** 是否为条纹样式 */
  striped?: boolean
  /** 条纹是否流动 */
  stripedFlow?: boolean
}

export interface ProgressEmits {
  (e: 'click', event: MouseEvent): void
}
