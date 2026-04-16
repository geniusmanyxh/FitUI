<template>
  <label
    :class="radioClasses"
    @click.prevent="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    :tabindex="isChecked ? 0 : -1"
  >
    <span :class="['f-radio__input', { 'is-checked': isChecked, 'is-disabled': isDisabled }]">
      <span class="f-radio__inner"></span>
      <input
        type="radio"
        class="f-radio__original"
        :name="name"
        :disabled="isDisabled"
        :checked="isChecked"
        :value="value"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" class="f-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
/**
 * FRadio 单选框组件
 *
 * @description 单选框组件，支持独立使用和组合使用
 * @example
 * ```vue
 * <!-- 独立使用 -->
 * <FRadio v-model="value" value="option1" label="选项 1" />
 * 
 * <!-- 组合使用 -->
 * <FRadioGroup v-model="value">
 *   <FRadio value="option1" label="选项 1" />
 *   <FRadio value="option2" label="选项 2" />
 * </FRadioGroup>
 * 
 * <!-- 自定义内容 -->
 * <FRadio value="option1">
 *   <span class="custom">自定义内容</span>
 * </FRadio>
 * ```
 */
import { computed, inject } from 'vue'
import type { RadioGroupContext } from './RadioGroup.vue'

defineOptions({ name: 'FRadio', inheritAttrs: false })

/**
 * 单选框组件属性
 */
export interface RadioProps {
  /** 
   * 绑定值
   * @description v-model 绑定的值
   */
  modelValue?: string | number | boolean
  
  /** 
   * 单选框绑定值
   * @description 选中时 v-model 更新的值，用于标识该选项
   * @example value="option1"
   */
  value?: string | number | boolean
  
  /** 
   * 单选框显示文本
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
  
  /** 是否触发表单校验 */
  validateEvent?: boolean
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  border: false,
  size: 'medium',
  validateEvent: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const radioGroup = inject<RadioGroupContext | null>('FRadioGroup', null)

const isGroup = computed(() => !!radioGroup)

const isChecked = computed(() => {
  if (isGroup.value && radioGroup) {
    return radioGroup.modelValue.value === props.value
  }
  return props.modelValue === props.value || props.modelValue === true
})

const isDisabled = computed(() => {
  if (radioGroup?.disabled?.value) return true
  return props.disabled
})

const actualSize = computed(() => {
  return radioGroup?.size?.value ?? props.size
})

const radioClasses = computed(() => {
  const classes = ['f-radio', `f-radio--${actualSize.value}`]
  if (isChecked.value) classes.push('is-checked')
  if (isDisabled.value) classes.push('is-disabled')
  if (props.border) classes.push('is-bordered')
  return classes
})

function handleClick() {
  if (isDisabled.value) return
  if (isChecked.value) return // radio can't uncheck

  if (isGroup.value && radioGroup) {
    radioGroup.changeEvent(props.value as any)
  } else {
    emit('update:modelValue', props.value as any)
    emit('change', props.value as any)
  }
}

function handleChange(e: Event) {
  // handled by handleClick
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
