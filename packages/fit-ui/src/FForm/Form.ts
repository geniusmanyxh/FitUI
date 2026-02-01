import type { InjectionKey } from 'vue'

export type FormLabelPosition = 'left' | 'right' | 'top'
export type FormLabelWidth = string | number

export interface FormProps {
  model?: Record<string, any>
  rules?: Record<string, FormRule[]>
  labelPosition?: FormLabelPosition
  labelWidth?: FormLabelWidth
  labelSuffix?: string
  inline?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
}

export interface FormRule {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change'
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  validator?: (rule: FormRule, value: any, callback: (error?: string) => void) => void | boolean
  type?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email'
}

export interface FormItemProps {
  label?: string
  labelWidth?: FormLabelWidth
  prop?: string
  required?: boolean
  rules?: FormRule[]
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  size?: 'small' | 'medium' | 'large'
  for?: string
  labelSuffix?: string
}

export interface FormContext {
  model: Record<string, any>
  rules?: Record<string, FormRule[]>
  labelPosition?: FormLabelPosition
  labelWidth?: FormLabelWidth
  labelSuffix?: string
  inline?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  addField: (field: string, prop: string, rules: FormRule[]) => void
  removeField: (field: string) => void
  validateField: (prop: string, callback?: (error?: string) => void) => Promise<boolean>
  clearValidate: (props?: string | string[]) => void
}

export const FORM_CONTEXT_KEY: InjectionKey<FormContext> = Symbol('form-context')
