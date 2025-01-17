
// 消息类型，包括成功、错误、警告、信息和默认
export const messageTypes = ['success', 'error', 'warn', 'info', 'default'] as const;
export type MessageType = typeof messageTypes[number];

export interface MessageProps {
    // 消息类型
    type?: MessageType
    // 消息内容
    msg?: string
    // 消息持续时间，单位为毫秒，或设置为'notime'表示不自动关闭
    duration?: number | 'notime'
    // 消息图标
    icon?: string
    // 是否显示关闭按钮
    showClose?: boolean
    // 消息的z-index值
    zIndex?: number
    // 建议添加
    // 消息距离顶部的偏移量
    offset?: number        
    // 挂载节点，可以是字符串选择器或HTMLElement
    appendTo?: string | HTMLElement  
    // 关闭回调
    onClose?: () => void  
    // 显示回调
    onShow?: () => void   
}
export type MsgResult = {
    type: MessageType | undefined,
    msg: string | undefined,
    show: boolean,
    close: boolean
  }
// 过滤后的消息属性类型
// 使用 Omit 和 Extract 内置类型来过滤函数类型属性
export type PageMessageProp = Omit<MessageProps, Extract<keyof MessageProps, 'onClose' | 'onShow'>>

