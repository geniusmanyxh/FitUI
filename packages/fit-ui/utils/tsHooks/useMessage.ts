/**
 * FitUI 消息提示工具
 * 
 * @description 提供全局消息提示功能的 Composition API Hook
 * @module useMessage
 * @example
 * ```vue
 * <script setup>
 * import { useMessage } from '@geniusmanyxh/fit-ui'
 * 
 * const { success, error, warning, info, message } = useMessage()
 * 
 * success('操作成功！')
 * error('操作失败！')
 * warning('警告信息！', { duration: 5000 })
 * info('提示信息！', { showClose: true })
 * 
 * message({
 *   type: 'success',
 *   msg: '自定义消息',
 *   duration: 3000,
 *   showClose: true,
 *   onClose: () => console.log('关闭')
 * })
 * </script>
 * ```
 */

import { createApp, h, type ComponentPublicInstance } from 'vue'
import Message from '@/FMessage/index.vue'
import { ComponentContainerClass } from '@enums/styleConstEnum'
import { MessageType, MsgResult } from '@ftypes/FMessage/index.type'

type msgProps = {
  type?: MessageType
  msg?: string
  duration?: number | 'notime'
  icon?: string
  showClose?: boolean
  zIndex?: number
  grouping?: boolean
  dangerouslyUseHTMLString?: boolean
  offset?: number
  appendTo?: string | HTMLElement
  onClose?: (res: MsgResult) => void
  onShow?: (res: MsgResult) => void
}

type simpleMsgProps = Omit<msgProps, 'type' | 'msg'>

interface MessageInstance {
  app: ReturnType<typeof createApp>
  container: HTMLElement
  curEl: HTMLElement
}

interface MessageReturn {
  message: (options: msgProps) => void
  success: (msg?: string, options?: simpleMsgProps) => void
  error: (msg?: string, options?: simpleMsgProps) => void
  warning: (msg?: string, options?: simpleMsgProps) => void
  info: (msg?: string, options?: simpleMsgProps) => void
  closeAll: () => void
}

const messageInstances: MessageInstance[] = []

export const useMessage = (): MessageReturn => {
  const createContainer = (appendTo?: string | HTMLElement): { curEl: HTMLElement, container: HTMLElement } => {
    let mountTarget: HTMLElement = document.body
    if (appendTo) {
      if (typeof appendTo === 'string') {
        const el = document.querySelector(appendTo) as HTMLElement
        if (el) {
          mountTarget = el
        }
      } else if (appendTo instanceof HTMLElement) {
        mountTarget = appendTo
      }
    }

    let curEl = mountTarget.querySelector(`.${ComponentContainerClass.FMessage}`) as HTMLElement
    if (!curEl) {
      curEl = document.createElement('div')
      curEl.setAttribute('class', ComponentContainerClass.FMessage)
      mountTarget.appendChild(curEl)
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'f-message-box-item')
    curEl.appendChild(container)
    return { curEl, container }
  }

  const message = (options: msgProps) => {
    if (options.grouping) {
      const existingMessage = messageInstances.find((instance) => {
        const messageEl = instance.container.querySelector('.f-message-item')
        if (messageEl) {
          const typeClass = `msg_${options.type || 'default'}`
          return messageEl.classList.contains(typeClass)
        }
        return false
      })
      
      if (existingMessage) {
        const messageEl = existingMessage.container.querySelector('.f-message-item')
        if (messageEl) {
          messageEl.classList.add('is-grouping')
        }
      }
    }

    const { curEl, container } = createContainer(options.appendTo)

    if (options.duration === 'notime' || options.duration === 0) {
      options.showClose = true
    }

    const app = createApp({
      render() {
        return h(Message, {
          ...options,
          onShow: () => {
            options.onShow?.({ type: options.type, msg: options.msg, close: false, show: true })
          },
          onClose: () => {
            setTimeout(() => {
              app.unmount()
              const index = messageInstances.findIndex((inst) => inst.app === app)
              if (index > -1) {
                messageInstances.splice(index, 1)
              }
              if (curEl.children.length <= 1) {
                curEl.remove()
              } else {
                curEl.removeChild(container)
              }
            }, 500)
            options.onClose?.({ type: options.type, msg: options.msg, close: true, show: false })
          },
        })
      },
    })

    app.mount(container)
    messageInstances.push({ app, container, curEl })
  }

  const success = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'success', msg })
  }

  const error = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'error', msg })
  }

  const warning = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'warn', msg })
  }

  const info = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'info', msg })
  }

  const closeAll = () => {
    messageInstances.forEach(({ app, container, curEl }) => {
      try {
        app.unmount()
        if (curEl.children.length <= 1) {
          curEl.remove()
        } else {
          curEl.removeChild(container)
        }
      } catch {
        // ignore
      }
    })
    messageInstances.length = 0
  }

  return {
    message,
    success,
    error,
    warning,
    info,
    closeAll
  }
}
