<template>
  <div 
    :class="[`checkbox_wrapper`, { 'checkbox_disabled': disabled }]" 
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
    role="checkbox"
    :aria-checked="modelValue"
    :aria-disabled="disabled"
    tabindex="0"
  >
    <div :class="[`checkbox_core`, { 'checkbox_core_active': modelValue, 'checkbox_core_disabled': disabled }]">
      <div v-if="modelValue" class="checkbox_icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div v-if="label" class="checkbox_label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * FCheckbox 复选框组件
 *
 * @description 用于多选的场景，如选择多个选项
 * @example
 * ```vue
 * <FCheckbox v-model="value">选项1</FCheckbox>
 * <FCheckbox v-model="value" disabled>禁用选项</FCheckbox>
 * ```
 */
defineOptions({ name: 'FCheckbox', inheritAttrs: false })

const props = defineProps<{
  /**
   * 绑定值
   * @default false
   */
  modelValue: boolean
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 是否显示标签
   * @default false
   */
  label?: boolean
}>()

const emit = defineEmits<{
  /**
   * 绑定值变化时触发
   */
  (e: 'update:modelValue', value: boolean): void
  /**
   * 状态变化时触发
   */
  (e: 'change', value: boolean): void
}>()

const handleClick = () => {
  if (props.disabled) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>