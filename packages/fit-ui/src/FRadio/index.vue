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
import { computed, inject } from 'vue'
import type { RadioGroupContext } from './RadioGroup.vue'

defineOptions({ name: 'FRadio', inheritAttrs: false })

export interface RadioProps {
  modelValue?: string | number | boolean
  value?: string | number | boolean
  label?: string
  disabled?: boolean
  border?: boolean
  size?: 'small' | 'medium' | 'large'
  name?: string
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
