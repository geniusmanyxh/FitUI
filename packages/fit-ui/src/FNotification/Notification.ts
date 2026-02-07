export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export interface NotificationProps {
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  showClose?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  offset?: number
  /**
   * 是否将消息内容作为 HTML 渲染
   * @default false
   */
  dangerouslyUseHTMLString?: boolean
  /**
   * 自定义类名
   * @default undefined
   */
  customClass?: string
  /**
   * z-index 层级
   * @default undefined
   */
  zIndex?: number
  /**
   * 挂载节点
   * @default undefined
   */
  appendTo?: string | HTMLElement
  /**
   * 点击通知时的回调
   * @default undefined
   */
  onClick?: () => void
  /**
   * 关闭时的回调
   * @default undefined
   */
  onClose?: () => void
}

export interface NotificationEmits {
  (e: 'close'): void
}
