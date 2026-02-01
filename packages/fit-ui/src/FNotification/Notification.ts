export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export interface NotificationProps {
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  showClose?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  offset?: number
}

export interface NotificationEmits {
  (e: 'close'): void
}
