/**
 * FitUI 加载提示工具
 * 
 * @description 提供全局加载提示功能的服务式调用
 * @module useLoading
 * @example
 * ```vue
 * <script setup>
 * import { useLoading } from '@geniusmanyxh/fit-ui'
 * 
 * const loading = useLoading()
 * 
 * const { close } = loading({ fullscreen: true, text: '加载中...' })
 * 
 * setTimeout(() => {
 *   close()
 * }, 2000)
 * </script>
 * ```
 */

import { createApp, h } from 'vue'
import Loading from '@/FLoading/index.vue'

type LoadingOptions = {
  text?: string
  spinner?: string
  background?: string
  fullscreen?: boolean
  lock?: boolean
  target?: string | HTMLElement
  visible?: boolean
}

interface LoadingInstance {
  app: ReturnType<typeof createApp>
  container: HTMLElement
  close: () => void
}

let loadingInstance: LoadingInstance | null = null

export const useLoading = (options: LoadingOptions = {}) => {
  const {
    text = '',
    spinner = '',
    background = 'rgba(0, 0, 0, 0.5)',
    fullscreen = false,
    lock = false,
    target,
    visible = true,
  } = options

  let mountTarget: HTMLElement = document.body
  if (target) {
    if (typeof target === 'string') {
      const el = document.querySelector(target) as HTMLElement
      if (el) {
        mountTarget = el
      }
    } else if (target instanceof HTMLElement) {
      mountTarget = target
    }
  }

  const container = document.createElement('div')
  container.setAttribute('class', 'f-loading-overlay')
  if (fullscreen) {
    container.setAttribute('class', 'f-loading-overlay f-loading-overlay--fullscreen')
  }
  container.style.cssText = `
    position: ${fullscreen ? 'fixed' : 'absolute'};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${background};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `

  if (lock && fullscreen) {
    document.body.style.overflow = 'hidden'
  }

  mountTarget.appendChild(container)

  const app = createApp({
    render() {
      return h(Loading, {
        visible,
        text,
        spinner,
      })
    },
  })

  app.mount(container)

  const close = () => {
    setTimeout(() => {
      app.unmount()
      container.remove()
      if (lock && fullscreen) {
        document.body.style.overflow = ''
      }
      loadingInstance = null
    }, 300)
  }

  loadingInstance = { app, container, close }

  return { close }
}
