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
  /** 是否只读 */
  readonly?: boolean
  controls?: boolean
  controlsPosition?: 'right' | ''
  name?: string
  label?: string
  placeholder?: string
  id?: string
  /** 输入时是否触发表单校验 */
  validateEvent?: boolean
  /** 清空时的值（null | min | max | number） */
  valueOnClear?: number | null | 'min' | 'max'
}
