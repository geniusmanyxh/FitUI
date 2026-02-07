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
 * // 快捷方法
 * success('操作成功！')
 * error('操作失败！')
 * warning('警告信息！', { duration: 5000 })
 * info('提示信息！', { showClose: true })
 * 
 * // 自定义消息
 * message({
 *   type: 'success',
 *   msg: '自定义消息',
 *   duration: 3000,
 *   showClose: true,
 *   onClose: (res) => console.log('关闭', res)
 * })
 * </script>
 * ```
 */

// utils/Message.ts
// 引入Vue及相关组件和枚举类型
import { createApp, h } from 'vue';
import Message from '@/FMessage/index.vue';
import { ComponentContainerClass } from '@enums/styleConstEnum'
import { MessageType,MsgResult } from '@ftypes/FMessage/index.type';

/**
 * 消息组件的属性类型
 */
type msgProps = {
  /** 消息类型 */
  type?: MessageType
  /** 消息内容 */
  msg?: string
  /** 消息显示时长（毫秒），设置为 'notime' 则不自动关闭 */
  duration?: number | 'notime'
  /** 自定义图标 */
  icon?: string
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** z-index 层级 */
  zIndex?: number
  /** 是否合并重复消息 */
  grouping?: boolean
  /** 是否将消息内容作为 HTML 渲染 */
  dangerouslyUseHTMLString?: boolean
  /** 距离顶部的偏移量（像素） */
  offset?: number
  /** 挂载节点 */
  appendTo?: string | HTMLElement
  /** 关闭回调函数 */
  onClose?: (res:MsgResult) => void
  /** 显示回调函数 */
  onShow?: (res:MsgResult) => void
}

/**
 * 简化的消息属性类型（排除 type 和 msg）
 */
type simpleMsgProps = Omit<msgProps, 'type' | 'msg'>

/**
 * 消息提示 Hook
 * 
 * @returns 返回消息提示相关方法的对象
 * @returns {Function} message - 通用消息方法
 * @returns {Function} success - 成功消息快捷方法
 * @returns {Function} error - 错误消息快捷方法
 * @returns {Function} warning - 警告消息快捷方法
 * @returns {Function} info - 信息消息快捷方法
 */
// 存储消息实例，用于分组和关闭所有
const messageInstances: Array<{ app: any, container: HTMLElement, curEl: HTMLElement }> = []

export const useMessage = () => {
  /**
   * 创建消息容器
   * @param appendTo - 挂载节点
   * @returns 返回包含容器元素引用的对象
   * @returns {HTMLElement} curEl - 消息容器根元素
   * @returns {HTMLElement} container - 单个消息项容器
   */
  const createContainer = (appendTo?: string | HTMLElement) => {
    // 确定挂载目标
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

    // 尝试获取已存在的消息容器元素
    let curEl = mountTarget.querySelector(`.${ComponentContainerClass.FMessage}`) as HTMLElement
    // 如果不存在，创建并添加到挂载目标
    if (!curEl) {
      curEl = document.createElement('div');
      curEl.setAttribute('class', `${ComponentContainerClass.FMessage}`);
      mountTarget.appendChild(curEl);
    }
    // 创建单个消息项的容器
    const container = document.createElement('div');
    container.setAttribute('class', 'f-message-box-item');
    curEl.appendChild(container);
    return { curEl, container };
  };

  /**
   * 显示消息提示
   * @param options - 消息配置选项
   * @param options.type - 消息类型
   * @param options.msg - 消息内容
   * @param options.duration - 显示时长（毫秒）
   * @param options.icon - 自定义图标
   * @param options.showClose - 是否显示关闭按钮
   * @param options.zIndex - z-index 层级
   * @param options.grouping - 是否合并重复消息
   * @param options.dangerouslyUseHTMLString - 是否将消息内容作为 HTML 渲染
   * @param options.offset - 距离顶部的偏移量
   * @param options.appendTo - 挂载节点
   * @param options.onClose - 关闭回调
   * @param options.onShow - 显示回调
   */
  const message = (options: msgProps) => {
      // 如果启用分组，检查是否有相同类型的重复消息
      if (options.grouping) {
        const existingMessage = messageInstances.find(instance => {
          // 通过检查容器中是否有相同类型的消息来判断
          const messageEl = instance.container.querySelector('.f-message-item')
          if (messageEl) {
            const typeClass = `msg_${options.type || 'default'}`
            return messageEl.classList.contains(typeClass)
          }
          return false
        })
        
        if (existingMessage) {
          // 如果找到重复消息，更新其内容而不是创建新消息
          // 这里需要访问消息组件的实例来更新内容
          // 由于 Vue 3 的限制，我们可能需要重新渲染
          // 为了简化，这里仍然创建新消息，但可以优化为更新现有消息
          // 注意：实际实现可能需要更复杂的逻辑来更新现有消息内容
        }
      }

      const { curEl, container } = createContainer(options.appendTo);
      // 如果duration为0或notime，则显示关闭按钮
      if (options.duration === 'notime' || options.duration === 0) {
        options.showClose = true
      }
      // 创建Vue应用，渲染消息组件
      const app = createApp({
        render() {
          return h(Message, {
            ...options,
            onShow: () => {
              options.onShow && options.onShow({ type: options.type, msg: options.msg,close: false,show: true })
            },
            onClose: () => {
              setTimeout(() => {
                app.unmount(); // 当消息关闭时，卸载Vue应用
                // 从实例数组中移除
                const index = messageInstances.findIndex(inst => inst.app === app)
                if (index > -1) {
                  messageInstances.splice(index, 1)
                }
                // 根据当前容器子元素数量，决定是否移除容器
                if (curEl.children.length <= 1) {
                  curEl.remove();
                } else {
                  curEl.removeChild(container);
                }
              },500)
              options.onClose && options.onClose({ type: options.type, msg: options.msg,close: true,show: false })
            },
          });
        },
      });
      app.mount(container); // 将Vue应用挂载到消息容器
      
      // 存储实例用于后续操作
      messageInstances.push({ app, container, curEl })
  };

  /**
   * 显示成功消息
   * @param msg - 消息内容
   * @param options - 附加配置选项
   * @example
   * success('操作成功！')
   * success('保存成功！', { duration: 5000 })
   */
  const success = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'success', msg });
  };

  /**
   * 显示错误消息
   * @param msg - 消息内容
   * @param options - 附加配置选项
   * @example
   * error('操作失败！')
   * error('网络错误！', { showClose: true })
   */
  const error = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'error', msg });
  };

  /**
   * 显示警告消息
   * @param msg - 消息内容
   * @param options - 附加配置选项
   * @example
   * warning('请注意！')
   * warning('数据将被覆盖！', { duration: 'notime' })
   */
  const warning = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'warn', msg });
  };

  /**
   * 显示信息消息
   * @param msg - 消息内容
   * @param options - 附加配置选项
   * @example
   * info('提示信息')
   * info('请查看详情', { zIndex: 2000 })
   */
  const info = (msg = '', options: simpleMsgProps = {}) => {
    return message({ ...options, type: 'info', msg });
  };

  /**
   * 关闭所有消息
   */
  const closeAll = () => {
    messageInstances.forEach(({ app, container, curEl }) => {
      try {
        app.unmount()
        if (curEl.children.length <= 1) {
          curEl.remove()
        } else {
          curEl.removeChild(container)
        }
      } catch (e) {
        // 忽略卸载错误
      }
    })
    messageInstances.length = 0
  }

  // 返回消息显示和成功消息的方法
  return {
    message,
    success,
    error,
    warning,
    info,
    closeAll
  };
}