export interface BadgeProps {
  value?: number | string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export interface BadgeEmits {
  (e: 'click', event: MouseEvent): void
}
