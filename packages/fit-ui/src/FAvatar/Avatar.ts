import type { allIconType } from '@utils/ficon'

export type AvatarSizeType = 'small' | 'medium' | 'large' | 'default'
export type AvatarShapeType = 'circle' | 'square'

export interface AvatarProps {
  src?: string
  /** img 的 srcset 属性 */
  srcSet?: string
  alt?: string
  size?: AvatarSizeType | number
  shape?: AvatarShapeType
  icon?: allIconType
  text?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none'
  /** 文字头像时文字与两侧的间距 */
  gap?: number
}

export interface AvatarEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'error', event: Event): void
}
