export type InputNumberSizeType = 'small' | 'medium' | 'large'

export interface InputNumberProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  size?: InputNumberSizeType
  disabled?: boolean
  controls?: boolean
  controlsPosition?: 'right' | ''
  name?: string
  label?: string
  placeholder?: string
  id?: string
}
