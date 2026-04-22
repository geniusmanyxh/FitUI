export interface OptionProps {
  /**
   * 选项值
   */
  value: string | number

  /**
   * 选项显示文本
   */
  label: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
}
