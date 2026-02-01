export type AvatarSizeType = 'small' | 'medium' | 'large' | 'default'
export type AvatarShapeType = 'circle' | 'square'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSizeType | number
  shape?: AvatarShapeType
  icon?: string
  text?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none'
}

export interface AvatarEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'error', event: Event): void
}
