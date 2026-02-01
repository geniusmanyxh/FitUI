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
.switch_wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    .switch_core {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
  }

  &:focus-visible {
    .switch_core {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
  }

  &.switch_disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.switch_core {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: #e5e7eb;
  transition: all 0.3s ease;

  &.switch_core_active {
    background-color: #3b82f6;
  }
}

.switch_button {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &.switch_button_active {
    transform: translateX(20px);
  }
}

.switch_label {
  margin-left: 8px;
  font-size: 14px;
  color: #374151;
}
</style>