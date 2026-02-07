export interface EmptyProps {
  image?: string
  description?: string
  imageSize?: number
}

export interface EmptyEmits {
  (e: 'click', event: MouseEvent): void
}
