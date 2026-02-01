export type SelectSizeType = 'small' | 'medium' | 'large'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: SelectOption[]
}

export interface SelectProps {
  modelValue?: string | number | (string | number)[]
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  remote?: boolean
  remoteMethod?: (query: string) => Promise<SelectOption[]>
  loading?: boolean
  multiple?: boolean
  size?: SelectSizeType
  multipleLimit?: number
}
