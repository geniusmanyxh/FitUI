import type { SizeType } from '@utils/fsize'

/**
 * textarea autosize 配置
 */
export interface InputAutoSize {
  /** 最小行数 */
  minRows?: number
  /** 最大行数 */
  maxRows?: number
}

/**
 * 支持的输入类型
 */
export type InputType = 'text' | 'password' | 'number' | 'textarea' | 'email' | 'url' | 'tel' | 'search'

/**
 * FInput 组件 Props 类型
 */
export interface InputProps {
  /**
   * 输入类型
   * @default 'text'
   */
  type?: InputType

  /**
   * 尺寸
   * @default 'medium'
   */
  size?: SizeType

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean

  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean

  /**
   * 是否显示密码切换按钮（仅 type="password" 有效）
   * @default false
   */
  showPassword?: boolean

  /**
   * 占位文案
   */
  placeholder?: string

  /**
   * 最大输入长度
   */
  maxlength?: number | string

  /**
   * 最小输入长度
   */
  minlength?: number | string

  /**
   * 是否显示字数统计（需配合 maxlength 使用）
   * @default false
   */
  showWordLimit?: boolean

  /**
   * textarea 的行数
   * @default 3
   */
  rows?: number

  /**
   * textarea 自适应内容高度，可传入 { minRows, maxRows }
   * @default false
   */
  autosize?: boolean | InputAutoSize

  /**
   * 是否必填（用于 aria-required）
   * @default false
   */
  required?: boolean

  /**
   * 是否校验失败（用于 aria-invalid）
   * @default false
   */
  invalid?: boolean

  /**
   * 关联的说明内容 id（aria-describedby）
   */
  describedby?: string

  /**
   * 与 label 关联的 id，便于无障碍
   */
  id?: string

  /**
   * 输入框 tabindex
   */
  tabindex?: string | number

  /**
   * 是否自动聚焦
   * @default false
   */
  autofocus?: boolean
}

/**
 * FInput 组件 Emits 类型
 */
export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'keydown', event: KeyboardEvent): void
}
