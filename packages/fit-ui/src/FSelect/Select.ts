import type { InjectionKey, Ref, ComputedRef } from 'vue'

export type SelectSizeType = 'small' | 'medium' | 'large'

export type SelectPlacementType =
  | 'top'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: SelectOption[]
}

export interface SelectProps {
  modelValue?: string | number | unknown[] | Record<string, unknown>
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  remote?: boolean
  remoteMethod?: (query: string) => void | Promise<void>
  loading?: boolean
  multiple?: boolean
  size?: SelectSizeType
  multipleLimit?: number
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  maxCollapseTags?: number
  allowCreate?: boolean
  reserveKeyword?: boolean
  defaultFirstOption?: boolean
  valueKey?: string
  filterMethod?: (query: string, option: SelectOption) => boolean
  popperClass?: string
  placement?: SelectPlacementType
  teleported?: boolean
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  name?: string
  validateEvent?: boolean
  noDataText?: string
  noMatchText?: string
  fitInputWidth?: boolean
  popperMinWidth?: number
  closeOnBlur?: boolean
  closeOnClickOutside?: boolean
  autofocus?: boolean
}

export interface SelectEmits {
  (e: 'update:modelValue', value: SelectProps['modelValue']): void
  (e: 'change', value: SelectProps['modelValue']): void
  (e: 'visible-change', visible: boolean): void
  (e: 'remove-tag', value: string | number): void
  (e: 'clear'): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'create', value: string): void
}

export interface OptionProps {
  value: string | number
  label: string
  disabled?: boolean
}

export interface OptionGroupProps {
  label: string
  disabled?: boolean
}

export interface SelectOptionData {
  value: string | number
  label: string
  disabled: boolean
  index: number
  groupLabel?: string
  groupDisabled?: boolean
}

export interface SelectContext {
  modelValue: ComputedRef<SelectProps['modelValue']>
  multiple: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  valueKey: ComputedRef<string>
  selectOption: (option: SelectOptionData) => void
  registerOption: (key: string | number, data: SelectOptionData) => void
  unregisterOption: (key: string | number) => void
  updateHoverIndex: (index: number) => void
  addCreatedOption: (value: string, label: string) => void
}

export const SELECT_CONTEXT_KEY: InjectionKey<SelectContext> = Symbol('FSelectContext')

export interface SelectExpose {
  focus: () => void
  blur: () => void
  open: () => void
  close: () => void
  selectedOptions: ComputedRef<SelectOption[]>
  isOpen: Ref<boolean>
}
