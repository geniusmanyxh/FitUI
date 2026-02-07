export type DrawerPositionType = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSizeType = 'small' | 'medium' | 'large' | number

export interface DrawerProps {
  visible?: boolean
  position?: DrawerPositionType
  size?: DrawerSizeType
  title?: string
  closable?: boolean
  maskClosable?: boolean
  mask?: boolean
  showFooter?: boolean
  footer?: boolean
  /**
   * 是否锁定 body 滚动
   * @default true
   */
  lockScroll?: boolean
  /**
   * 关闭前的回调
   * @default undefined
   * @description 返回 false 或 Promise<false> 可以阻止关闭
   */
  beforeClose?: () => Promise<boolean> | boolean
  /**
   * 关闭时是否销毁内容
   * @default false
   */
  destroyOnClose?: boolean
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
   * 遮罩层自定义类名
   * @default undefined
   */
  modalClass?: string
}

export interface DrawerEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'closed'): void
}
