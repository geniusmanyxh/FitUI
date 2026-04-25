/**
 * FForm 组件实例类型
 * 
 * @description 用于 TypeScript 类型提示和 IDE 自动补全
 * @example
 * ```typescript
 * const formRef = ref<FormInstance>()
 * 
 * // 验证表单
 * await formRef.value?.validate()
 * 
 * // 重置表单
 * formRef.value?.resetFields()
 * ```
 */
export interface FormInstance {
  /**
   * 验证整个表单
   * @param callback 验证回调函数
   * @returns Promise<boolean> 验证结果
   */
  validate: (callback?: (isValid: boolean, invalidFields?: Record<string, string[]>) => void) => Promise<boolean>
  
  /**
   * 验证指定字段
   * @param prop 字段名
   * @param callback 验证回调函数
   * @returns Promise<boolean> 验证结果
   */
  validateField: (prop: string, callback?: (error?: string) => void) => Promise<boolean>
  
  /**
   * 重置所有字段到初始值
   */
  resetFields: () => void
  
  /**
   * 清除指定字段的验证错误
   * @param props 字段名数组或单个字段名
   */
  clearValidate: (props?: string | string[]) => void
  
  /**
   * 滚动到错误字段
   * @param prop 字段名
   */
  scrollToField: (prop: string) => void
}

/**
 * FFormItem 组件实例类型
 * 
 * @description 用于 TypeScript 类型提示和 IDE 自动补全
 * @example
 * ```typescript
 * const formItemRef = ref<FormItemInstance>()
 * 
 * // 验证单个字段
 * await formItemRef.value?.validate()
 * ```
 */
export interface FormItemInstance {
  /**
   * 验证当前字段
   * @returns Promise<boolean> 验证结果
   */
  validate: () => Promise<boolean>
  
  /**
   * 清除当前字段的验证错误
   */
  clearValidate: () => void
  
  /**
   * 重置当前字段
   */
  resetField: () => void
}

/**
 * 表单验证规则类型
 */
export interface FormRule {
  /**
   * 是否必填
   */
  required?: boolean
  
  /**
   * 验证失败时的提示信息
   */
  message?: string
  
  /**
   * 触发验证的时机
   * @default 'change'
   */
  trigger?: 'blur' | 'change'
  
  /**
   * 最小长度
   */
  min?: number
  
  /**
   * 最大长度
   */
  max?: number
  
  /**
   * 指定长度
   */
  len?: number
  
  /**
   * 正则表达式验证
   */
  pattern?: RegExp
  
  /**
   * 自定义验证器
   */
  validator?: (rule: FormRule, value: unknown, callback: (error?: string) => void) => void | boolean
  
  /**
   * 字段类型
   */
  type?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email'
}
