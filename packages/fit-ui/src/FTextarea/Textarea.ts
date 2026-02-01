export type TextareaSizeType = 'small' | 'medium' | 'large'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  minlength?: number
  showWordLimit?: boolean
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  autosize?: boolean | { minRows?: number; maxRows?: number }
  size?: TextareaSizeType
  rows?: number
  name?: string
  label?: string
  id?: string
  autofocus?: boolean
  form?: string
}
