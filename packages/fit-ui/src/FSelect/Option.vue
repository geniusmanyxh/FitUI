<template>
  <li
    ref="optionRef"
    class="f-select__item"
    :class="optionClasses"
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <slot>
      {{ label }}
    </slot>
  </li>
</template>

<script setup lang="ts">
/**
 * FOption 选择器选项组件
 * 
 * @description 用于 FSelect 组件的选项，支持插槽语法
 * @example
 * ```vue
 * <FSelect v-model="value">
 *   <FOption value="1" label="选项 1" />
 *   <FOption value="2" label="选项 2" :disabled="true" />
 * </FSelect>
 * ```
 */
import { computed, getCurrentInstance, inject, ref } from 'vue'

defineOptions({ name: 'FOption', inheritAttrs: false })

const props = defineProps<{
  /**
   * 选项值
   */
  value: string | number
  /**
   * 选项标签
   */
  label: string
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
}>()

const emit = defineEmits<{
  /**
   * 选项被选中时触发
   */
  select: [value: string | number]
}>()

const optionRef = ref<HTMLElement | null>(null)
const instance = getCurrentInstance()

// 从 FSelect 注入上下文
const selectContext = inject<any>('FSelectContext', null)

const isSelected = computed(() => {
  if (!selectContext) return false
  const { modelValue, multiple } = selectContext
  if (multiple) {
    return Array.isArray(modelValue) && modelValue.includes(props.value)
  }
  return modelValue === props.value
})

const optionClasses = computed(() => ({
  'is-selected': isSelected.value,
  'is-disabled': props.disabled,
  'is-hovering': isHovering.value
}))

const isHovering = ref(false)

const handleClick = () => {
  if (props.disabled) return
  emit('select', props.value)
  // 如果注入了 selectContext，调用其方法
  if (selectContext?.selectOption) {
    selectContext.selectOption({ value: props.value, label: props.label, disabled: props.disabled })
  }
}

const handleMouseEnter = () => {
  isHovering.value = true
  // 更新 FSelect 的 hoverIndex
  if (selectContext?.updateHoverIndex && instance) {
    selectContext.updateHoverIndex(instance.uid)
  }
}

// 暴露选项信息给父组件
defineExpose({
  value: props.value,
  label: props.label,
  disabled: props.disabled,
  optionRef
})
</script>
