export interface CardProps {
  header?: string
  shadow?: 'always' | 'hover' | 'never'
  bodyStyle?: Record<string, any>
  bodyClass?: string
}

export interface CardEmits {
  (e: 'click', event: MouseEvent): void
}
