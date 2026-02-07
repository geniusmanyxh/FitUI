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
import { computed, inject } from 'vue'
import type { CheckboxGroupContext } from './CheckboxGroup.vue'

defineOptions({ name: 'FCheckbox', inheritAttrs: false })

export interface CheckboxProps {
  modelValue?: boolean | string | number
  value?: string | number | boolean
  label?: string
  disabled?: boolean
  border?: boolean
  size?: 'small' | 'medium' | 'large'
  name?: string
  indeterminate?: boolean
  checked?: boolean
  trueValue?: string | number
  falseValue?: string | number
  validateEvent?: boolean
  tabindex?: number | string
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
    return checkboxGroup.modelValue.value.includes(props.value as any)
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
    checkboxGroup.changeEvent(props.value as any)
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
