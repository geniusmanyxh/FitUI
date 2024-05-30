// utils/Message.ts
// 引入Vue及相关组件和枚举类型
import { createApp, h } from 'vue';
import Message from '@/FMessage/index.vue';
import { ComponentContainerClass } from '@enums/styleConstEnum'

// 定义消息类型枚举
type MsgType = 'success' | 'error' | 'warn' | 'info' | 'default'
type MsgResult = {
  type: MsgType | undefined,
  msg: string | undefined,
  show: boolean,
  close: boolean
}
// 定义消息组件的属性类型
type msgProps = {
  type?: MsgType, // 消息类型
  msg?: string, // 消息内容
  duration?: number | 'notime', // 消息显示时长
  icon?: string, // 自定义图标
  showClose?: boolean, // 是否显示关闭按钮
  zIndex?: number, // z-index值
  onClose?: (res:MsgResult) => void, // 关闭按钮点击事件
  onShow?: (res:MsgResult) => void, // 消息点击事件
}

// 定义简化消息属性类型，排除type和msg属性
type simpleMsgProps = Omit<msgProps, 'type' | 'msg'>
/**
 * 提供消息提示功能的工具函数
 * @returns 返回一个对象，包含用于显示消息和成功消息的方法
 */
export const useMessage = () => {
  /**
   * 创建消息容器
   * @returns 返回一个对象，包含当前元素和容器元素的引用
   */
  const createContainer = () => {
    // 尝试获取已存在的消息容器元素
    let curEl = document.querySelector(`.${ComponentContainerClass.FMessage}`);
    // 如果不存在，创建并添加到文档体中
    if (!curEl) {
      curEl = document.createElement('div');
      curEl.setAttribute('class', `${ComponentContainerClass.FMessage}`);
      document.body.appendChild(curEl);
    }
    // 创建单个消息项的容器
    const container = document.createElement('div');
    container.setAttribute('class', 'f-message-box-item');
    curEl.appendChild(container);
    return { curEl, container };
  };

  /**
   * 根据选项显示消息
   * @param options 消息选项，部分msgProps类型
   */
  const showMessage = (options: Partial<msgProps>) => {
      const { curEl, container } = createContainer();
      // 创建Vue应用，渲染消息组件
      const app = createApp({
        render() {
          return h(Message, {
            ...options,
            onShow: () => {
              options.onShow && options.onShow({ type: options.type, msg: options.msg,close: false,show: true })
            },
            onClose: () => {
              app.unmount(); // 当消息关闭时，卸载Vue应用
              // 根据当前容器子元素数量，决定是否移除容器
              if (curEl.children.length <= 1) {
                curEl.remove();
              } else {
                curEl.removeChild(container);
              }
              options.onClose && options.onClose({ type: options.type, msg: options.msg,close: true,show: false })
            },
          });
        },
      });
      app.mount(container); // 将Vue应用挂载到消息容器
     
  };

  /**
   * 显示成功类型的消息
   * @param msg 消息内容，默认为空字符串
   * @param options 消息选项，simpleMsgProps类型
   * @returns 返回Promise，resolve时表示消息显示完成
   */
  const successMsg = (msg = '', options: simpleMsgProps = {}) => {
    return showMessage({ ...options, type: 'success', msg });
  };

  // 返回消息显示和成功消息的方法
  return {
    showMessage,
    successMsg
  };
}