<template>
  <li
    v-show="visible"
    ref="optionRef"
    class="f-select__item"
    :class="optionClasses"
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="isDisabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <slot>
      <span class="f-select__item-text">{{ currentLabel }}</span>
    </slot>
    <span v-if="isSelected" class="f-select__item-check">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M406.656 706.944 195.84 496.128a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.656 706.944z"></path>
      </svg>
    </span>
  </li>
</template>

<script setup lang="ts">
/**
 * FOption 选择器选项组件
 *
 * @description 用于 FSelect 组件的选项，支持插槽语法，自动向父组件注册
 * @example
 * ```vue
 * <FSelect v-model="value">
 *   <FOption value="1" label="选项 1" />
 *   <FOption value="2" label="选项 2" :disabled="true" />
 * </FSelect>
 * ```
 */
import { computed, inject, onMounted, onUnmounted, ref, useSlots, getCurrentInstance, watch, nextTick } from 'vue'
import type { SelectContext, SelectOptionData } from '@/FSelect/Select'
import { SELECT_CONTEXT_KEY } from '@/FSelect/Select'
import type { OptionProps } from './Option'

defineOptions({ name: 'FOption', inheritAttrs: false })

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  select: [value: OptionProps['value']]
}>()

const optionRef = ref<HTMLElement | null>(null)
const slots = useSlots()
const instance = getCurrentInstance()

const selectContext = inject<SelectContext | null>(SELECT_CONTEXT_KEY, null)

const isDisabled = computed(() => {
  return props.disabled || (selectContext?.disabled.value ?? false)
})

const currentLabel = computed(() => {
  return props.label ?? String(props.value)
})

const isSelected = computed(() => {
  if (!selectContext) return false
  const { modelValue, multiple, valueKey } = selectContext
  const val = modelValue.value

  if (multiple.value) {
    if (!Array.isArray(val)) return false
    return val.some(item => getValueKey(item, valueKey.value) === getValueKey(props.value, valueKey.value))
  }
  return getValueKey(val, valueKey.value) === getValueKey(props.value, valueKey.value)
})

const isHovering = ref(false)

const visible = ref(true)

const optionClasses = computed(() => ({
  'is-selected': isSelected.value,
  'is-disabled': isDisabled.value,
  'is-hovering': isHovering.value,
}))

function getValueKey(value: unknown, key: string): string | number {
  if (value === null || value === undefined) return ''
  return String(value)
}

function handleClick() {
  if (isDisabled.value) return
  emit('select', props.value)
  if (selectContext?.selectOption) {
    selectContext.selectOption({
      value: props.value,
      label: currentLabel.value,
      disabled: props.disabled,
      index: 0,
    })
  }
}

function handleMouseEnter() {
  isHovering.value = true
  if (selectContext?.updateHoverIndex && instance) {
    selectContext.updateHoverIndex(instance.uid)
  }
}

function register() {
  if (!selectContext) return
  const optionData: SelectOptionData = {
    value: props.value,
    label: currentLabel.value,
    disabled: props.disabled,
    index: instance?.uid ?? 0,
  }
  selectContext.registerOption(props.value, optionData)
}

function unregister() {
  if (!selectContext) return
  selectContext.unregisterOption(props.value)
}

onMounted(() => {
  register()
})

onUnmounted(() => {
  unregister()
})

watch(() => props.label, () => {
  register()
})

defineExpose({
  value: props.value,
  label: currentLabel.value,
  disabled: props.disabled,
  optionRef,
  selected: isSelected,
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
