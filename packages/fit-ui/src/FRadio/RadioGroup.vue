<template>
  <div class="f-radio-group" role="radiogroup" :aria-label="label">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, toRef, computed, type Ref } from 'vue'

defineOptions({ name: 'FRadioGroup' })

export interface RadioGroupContext {
  modelValue: Ref<string | number | boolean>
  disabled: Ref<boolean>
  size: Ref<string>
  name: Ref<string>
  changeEvent: (value: string | number | boolean) => void
}

export interface RadioGroupProps {
  modelValue?: string | number | boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  name?: string
  label?: string
  validateEvent?: boolean
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: '',
  disabled: false,
  size: 'medium',
  name: '',
  validateEvent: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

function changeEvent(value: string | number | boolean) {
  emit('update:modelValue', value)
  emit('change', value)
}

provide<RadioGroupContext>('FRadioGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size'),
  name: toRef(props, 'name'),
  changeEvent,
})
</script>
