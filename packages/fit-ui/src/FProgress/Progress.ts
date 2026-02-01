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
}

export interface ProgressEmits {
  (e: 'click', event: MouseEvent): void
}
