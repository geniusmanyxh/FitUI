<template>
  <label
    :class="checkboxClasses"
    @click.prevent="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed' : isChecked"
    :aria-disabled="isDisabled"
    :tabindex="tabindex ?? 0"
  >
    <span :class="['f-checkbox__input', { 'is-checked': isChecked, 'is-disabled': isDisabled, 'is-indeterminate': indeterminate }]">
      <span class="f-checkbox__inner"></span>
      <input
        type="checkbox"
        class="f-checkbox__original"
        :name="name"
        :disabled="isDisabled"
        :checked="isChecked"
        :value="value"
        :id="id"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" class="f-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
/**
 * FCheckbox 复选框组件
 *
 * @description 复选框组件，支持独立使用、组合使用和全选/半选状态
 * @example
 * ```vue
 * <!-- 独立使用 -->
 * <FCheckbox v-model="checked" label="同意协议" />
 * 
 * <!-- 组合使用 -->
 * <FCheckboxGroup v-model="checkList">
 *   <FCheckbox value="a" label="选项 A" />
 *   <FCheckbox value="b" label="选项 B" />
 * </FCheckboxGroup>
 * 
 * <!-- 全选/半选 -->
 * <FCheckbox v-model="allChecked" :indeterminate="isIndeterminate" />
 * 
 * <!-- 自定义内容 -->
 * <FCheckbox value="option1">
 *   <span class="custom">自定义内容</span>
 * </FCheckbox>
 * ```
 */
import { computed, inject } from 'vue'
import type { CheckboxGroupContext } from './CheckboxGroup.vue'

defineOptions({ name: 'FCheckbox', inheritAttrs: false })

/**
 * 复选框组件属性
 */
export interface CheckboxProps {
  /** 
   * 绑定值
   * @description v-model 绑定的值
   */
  modelValue?: boolean | string | number
  
  /** 
   * 复选框绑定值
   * @description 选中时 v-model 更新的值，用于标识该选项
   * @description 在 CheckboxGroup 中使用时，此值会添加到 modelValue 数组中
   * @example value="option1"
   */
  value?: string | number | boolean
  
  /** 
   * 复选框显示文本
   * @description 当不提供默认插槽内容时，使用此文本作为标签显示
   * @default undefined
   * @note 如果同时提供插槽内容和 label，插槽内容优先级更高
   */
  label?: string
  
  /** 是否禁用 */
  disabled?: boolean
  
  /** 是否带边框 */
  border?: boolean
  
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large'
  
  /** 原生 name 属性 */
  name?: string
  
  /** 是否为不确定状态（半选） */
  indeterminate?: boolean
  
  /** 
   * 选中状态
   * @deprecated 请使用 modelValue 代替
   */
  checked?: boolean
  
  /** 
   * 选中时的值
   * @description 用于自定义选中状态的值，配合 falseValue 使用
   */
  trueValue?: string | number
  
  /** 
   * 未选中时的值
   * @description 用于自定义未选中状态的值，配合 trueValue 使用
   */
  falseValue?: string | number
  
  /** 是否触发表单校验 */
  validateEvent?: boolean
  
  /** tabindex 属性 */
  tabindex?: number | string
  
  /** 原生 id 属性 */
  id?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  border: false,
  size: 'medium',
  indeterminate: false,
  checked: false,
  validateEvent: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  change: [value: boolean | string | number]
}>()

const checkboxGroup = inject<CheckboxGroupContext | null>('FCheckboxGroup', null)

const isGroup = computed(() => !!checkboxGroup)

const isChecked = computed(() => {
  if (isGroup.value && checkboxGroup) {
    const value = props.value ?? ''
    return checkboxGroup.modelValue.value.includes(value)
  }
  if (props.trueValue !== undefined) {
    return props.modelValue === props.trueValue
  }
  return !!props.modelValue
})

const isDisabled = computed(() => {
  if (checkboxGroup?.disabled?.value) return true
  return props.disabled
})

const actualSize = computed(() => {
  return checkboxGroup?.size?.value ?? props.size
})

const checkboxClasses = computed(() => {
  const classes = ['f-checkbox', `f-checkbox--${actualSize.value}`]
  if (isChecked.value) classes.push('is-checked')
  if (isDisabled.value) classes.push('is-disabled')
  if (props.border) classes.push('is-bordered')
  if (props.indeterminate) classes.push('is-indeterminate')
  return classes
})

function handleClick() {
  if (isDisabled.value) return
  if (isGroup.value && checkboxGroup) {
    const value = props.value ?? ''
    checkboxGroup.changeEvent(value)
  } else {
    const newVal = !isChecked.value
    if (props.trueValue !== undefined && props.falseValue !== undefined) {
      emit('update:modelValue', newVal ? props.trueValue : props.falseValue)
      emit('change', newVal ? props.trueValue : props.falseValue)
    } else {
      emit('update:modelValue', newVal)
      emit('change', newVal)
    }
  }
}

function handleChange(e: Event) {
  // handled by handleClick
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
