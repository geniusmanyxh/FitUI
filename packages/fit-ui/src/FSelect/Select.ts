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
  /** 多选时是否折叠标签 */
  collapseTags?: boolean
  /** 折叠标签时鼠标悬浮显示完整列表 */
  collapseTagsTooltip?: boolean
  /** 折叠标签时最多显示的标签数 */
  maxCollapseTags?: number
  /** 是否允许创建新选项（需配合 filterable） */
  allowCreate?: boolean
  /** 搜索后保留关键字 */
  reserveKeyword?: boolean
  /** 是否在输入框聚焦时默认选中第一个选项 */
  defaultFirstOption?: boolean
  /** 自定义筛选方法 */
  filterMethod?: (query: string, option: SelectOption) => boolean
  /** 下拉菜单自定义类名 */
  popperClass?: string
  /** 下拉菜单弹出位置 */
  placement?: string
  /** 多选标签类型 */
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  /** 原生 name 属性 */
  name?: string
  /** 输入时是否触发表单校验 */
  validateEvent?: boolean
  /** 无数据时的文本 */
  noDataText?: string
  /** 搜索无匹配时的文本 */
  noMatchText?: string
}
