export type SkeletonType = 'text' | 'image' | 'custom'

export interface SkeletonProps {
  loading?: boolean
  rows?: number
  animated?: boolean
  type?: SkeletonType
  avatar?: boolean
  title?: boolean
  paragraph?: boolean
  active?: boolean
}

export interface SkeletonEmits {
  (e: 'click', event: MouseEvent): void
}
