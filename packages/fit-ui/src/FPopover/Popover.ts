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
}

export interface PopoverEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
}
