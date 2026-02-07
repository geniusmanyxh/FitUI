export type PopoverTriggerType = 'click' | 'hover' | 'focus' | 'manual'
export type PopoverPlacementType = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

export interface PopoverProps {
  visible?: boolean
  trigger?: PopoverTriggerType
  placement?: PopoverPlacementType
  width?: string | number
  offset?: number
  disabled?: boolean
  hideAfter?: number
  showArrow?: boolean
  transition?: string
  /**
   * 弹出层的自定义类名
   * @default undefined
   */
  popperClass?: string
  /**
   * 弹出层的自定义样式
   * @default undefined
   */
  popperStyle?: Record<string, any>
  /**
   * 显示延迟时间（毫秒）
   * @default 0
   */
  showAfter?: number
  /**
   * 是否使用 Teleport 传送
   * @default true
   */
  teleported?: boolean
  /**
   * 是否持久化显示（鼠标移出后不消失）
   * @default false
   */
  persistent?: boolean
  /**
   * tabindex 属性
   * @default undefined
   */
  tabindex?: number
}

export interface PopoverEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
}
