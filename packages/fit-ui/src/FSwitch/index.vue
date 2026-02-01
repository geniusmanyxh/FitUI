<template>
  <div 
    :class="[`switch_wrapper`, { 'switch_disabled': disabled }]" 
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="disabled"
    tabindex="0"
  >
    <div :class="[`switch_core`, { 'switch_core_active': modelValue }]">
      <div :class="[`switch_button`, { 'switch_button_active': modelValue }]"></div>
    </div>
    <div v-if="label" class="switch_label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * FSwitch 开关组件
 *
 * @description 用于二选一的场景，如启用/禁用功能
 * @example
 * ```vue
 * <FSwitch v-model="value">启用功能</FSwitch>
 * <FSwitch v-model="value" disabled>禁用状态</FSwitch>
 * ```
 */
defineOptions({ name: 'FSwitch', inheritAttrs: false })

import { computed } from 'vue'

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