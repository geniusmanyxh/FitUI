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
}

export interface DrawerEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'closed'): void
}
