<template>
  <div class="f-checkbox-group" role="group" :aria-label="label">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, toRef, type Ref } from 'vue'

defineOptions({ name: 'FCheckboxGroup' })

export interface CheckboxGroupContext {
  modelValue: Ref<(string | number | boolean)[]>
  disabled: Ref<boolean>
  size: Ref<string>
  min: Ref<number>
  max: Ref<number>
  changeEvent: (value: string | number | boolean) => void
}

export interface CheckboxGroupProps {
  modelValue?: (string | number | boolean)[]
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  min?: number
  max?: number
  label?: string
  validateEvent?: boolean
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
  size: 'medium',
  min: 0,
  max: Infinity,
  validateEvent: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: (string | number | boolean)[]]
  change: [value: (string | number | boolean)[]]
}>()

function changeEvent(value: string | number | boolean) {
  const currentVal = [...props.modelValue]
  const idx = currentVal.indexOf(value)
  if (idx > -1) {
    // uncheck - check min
    if (currentVal.length <= props.min) return
    currentVal.splice(idx, 1)
  } else {
    // check - check max
    if (props.max !== Infinity && currentVal.length >= props.max) return
    currentVal.push(value)
  }
  emit('update:modelValue', currentVal)
  emit('change', currentVal)
}

provide<CheckboxGroupContext>('FCheckboxGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size'),
  min: toRef(props, 'min'),
  max: toRef(props, 'max'),
  changeEvent,
})
</script>
