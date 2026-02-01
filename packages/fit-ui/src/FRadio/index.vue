<template>
  <div 
    :class="[`radio_wrapper`, { 'radio_disabled': disabled }]" 
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
    role="radio"
    :aria-checked="modelValue"
    :aria-disabled="disabled"
    tabindex="0"
  >
    <div :class="[`radio_core`, { 'radio_core_active': modelValue, 'radio_core_disabled': disabled }]">
      <div v-if="modelValue" class="radio_icon">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="4" fill="white"/>
        </svg>
      </div>
    </div>
    <div v-if="label" class="radio_label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * FRadio 单选框组件
 *
 * @description 用于多选一的场景，如选择单个选项
 * @example
 * ```vue
 * <FRadio v-model="value" value="option1">选项1</FRadio>
 * <FRadio v-model="value" value="option2" disabled>禁用选项</FRadio>
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
.radio_wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    .radio_core {
      border-color: #3b82f6;
    }
  }

  &:focus-visible {
    .radio_core {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
  }

  &.radio_disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.radio_core {
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  background-color: #ffffff;
  transition: all 0.3s ease;

  &.radio_core_active {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }

  &.radio_core_disabled {
    border-color: #d1d5db;
    background-color: #f3f4f6;
  }
}

.radio_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.radio_label {
  margin-left: 8px;
  font-size: 14px;
  color: #374151;
}
</style>