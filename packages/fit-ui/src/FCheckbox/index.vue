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
.checkbox_wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    .checkbox_core {
      border-color: #3b82f6;
    }
  }

  &:focus-visible {
    .checkbox_core {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
  }

  &.checkbox_disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.checkbox_core {
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background-color: #ffffff;
  transition: all 0.3s ease;

  &.checkbox_core_active {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }

  &.checkbox_core_disabled {
    border-color: #d1d5db;
    background-color: #f3f4f6;
  }
}

.checkbox_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.checkbox_label {
  margin-left: 8px;
  font-size: 14px;
  color: #374151;
}
</style>