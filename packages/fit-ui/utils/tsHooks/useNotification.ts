/**
 * FitUI 通知提示工具
 * 
 * @description 提供全局通知提示功能的 Composition API Hook
 * @module useNotification
 * @example
 * ```vue
 * <script setup>
 * import { useNotification } from '@geniusmanyxh/fit-ui'
 * 
 * const notify = useNotification()
 * 
 * notify({ title: '通知', message: '这是一条通知消息' })
 * notify.success({ title: '成功', message: '操作成功' })
 * notify.error({ title: '错误', message: '操作失败' })
 * </script>
 * ```
 */

import { createApp, h, type ComponentPublicInstance } from 'vue'
import Notification from '@/FNotification/index.vue'
import { ComponentContainerClass } from '@enums/styleConstEnum'
import type { NotificationType } from './types'

type NotificationOptions = {
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  offset?: number
  showClose?: boolean
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  zIndex?: number
  appendTo?: string | HTMLElement
  onClick?: () => void
  onClose?: () => void
}

type NotificationPosition = NotificationOptions['position']

interface NotificationInstance {
  app: ReturnType<typeof createApp>
  container: HTMLElement
  position: NotificationPosition
}

const notificationInstances: NotificationInstance[] = []

const positionMap: Record<string, string> = {
  'top-right': `${ComponentContainerClass.FNotification}--top-right`,
  'top-left': `${ComponentContainerClass.FNotification}--top-left`,
  'bottom-right': `${ComponentContainerClass.FNotification}--bottom-right`,
  'bottom-left': `${ComponentContainerClass.FNotification}--bottom-left`,
}

const createContainer = (position: NotificationPosition = 'top-right'): { container: HTMLElement } => {
  const container = document.createElement('div')
  container.setAttribute('class', positionMap[position] || positionMap['top-right'])
  document.body.appendChild(container)
  return { container }
}

const notify = (options: NotificationOptions) => {
  const { container } = createContainer(options.position)

  const app = createApp({
    render() {
      return h(Notification, {
        title: options.title,
        message: options.message,
        type: options.type,
        duration: options.duration,
        position: options.position,
        offset: options.offset,
        showClose: options.showClose,
        dangerouslyUseHTMLString: options.dangerouslyUseHTMLString,
        customClass: options.customClass,
        zIndex: options.zIndex,
        appendTo: options.appendTo,
        onClick: options.onClick,
        onClose: () => {
          setTimeout(() => {
            app.unmount()
            const index = notificationInstances.findIndex((inst) => inst.app === app)
            if (index > -1) {
              notificationInstances.splice(index, 1)
            }
            container.remove()
          }, 300)
          options.onClose?.()
        },
      })
    },
  })

  app.mount(container)
  notificationInstances.push({ app, container, position: options.position || 'top-right' })
}

export const useNotification = () => {
  const notifyWithType = (type: NotificationType, options: Omit<NotificationOptions, 'type'> = {}) => {
    return notify({ ...options, type })
  }

  const closeAll = () => {
    notificationInstances.forEach(({ app, container }) => {
      try {
        app.unmount()
        container.remove()
      } catch {
        // ignore
      }
    })
    notificationInstances.length = 0
  }

  return Object.assign(notify, {
    success: (options: Omit<NotificationOptions, 'type'> = {}) => notifyWithType('success', options),
    warning: (options: Omit<NotificationOptions, 'type'> = {}) => notifyWithType('warning', options),
    error: (options: Omit<NotificationOptions, 'type'> = {}) => notifyWithType('error', options),
    info: (options: Omit<NotificationOptions, 'type'> = {}) => notifyWithType('info', options),
    closeAll,
  })
}
