<template>
  <div class="f-input-number" :class="inputNumberClass">
    <span
      v-if="controls && controlsPosition !== 'right'"
      class="f-input-number__decrease"
      :class="{ 'is-disabled': minDisabled }"
      role="button"
      tabindex="-1"
      @click="decrease"
    >
      <slot name="decrease-icon">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm-192-384h384a32 32 0 1 0 0-64H320a32 32 0 0 0 0 64z"></path>
        </svg>
      </slot>
    </span>
    <div class="f-input-number__wrapper">
      <input
        :id="inputId"
        ref="inputRef"
        v-model="displayValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-label="label"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="currentValue ?? undefined"
        :aria-disabled="disabled"
        class="f-input-number__inner"
        :class="{ 'is-disabled': disabled }"
        type="text"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
    </div>
    <span
      v-if="controls && controlsPosition === 'right'"
      class="f-input-number__increase"
      :class="{ 'is-disabled': maxDisabled }"
      role="button"
      tabindex="-1"
      @click="increase"
    >
      <slot name="increase-icon">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm32-512H352a32 32 0 0 0 0 64h192a32 32 0 0 0 0-64zm0 128H480a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64z"></path>
        </svg>
      </slot>
    </span>
    <span
      v-if="controls && controlsPosition !== 'right'"
      class="f-input-number__increase"
      :class="{ 'is-disabled': maxDisabled }"
      role="button"
      tabindex="-1"
      @click="increase"
    >
      <slot name="increase-icon">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm32-512H352a32 32 0 0 0 0 64h192a32 32 0 0 0 0-64zm0 128H480a32 32 0 0 0 0 64h64a32 32 0 0 0 0-64z"></path>
        </svg>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance } from 'vue'
import type { InputNumberProps } from './InputNumber'
import type { InputNumberSizeType } from './InputNumber'

defineOptions({ name: 'FInputNumber', inheritAttrs: false })

const props = withDefaults(defineProps<InputNumberProps>(), {
  modelValue: 0,
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  size: 'medium',
  disabled: false,
  readonly: false,
  controls: true,
  controlsPosition: '',
  name: '',
  label: '',
  placeholder: '',
  id: undefined,
  validateEvent: true,
  valueOnClear: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
  (e: 'change', value: number | null, oldValue: number | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const inputRef = ref<HTMLInputElement>()
const displayValue = ref('')
const currentValue = ref<number | null>(props.modelValue)
const userInput = ref(false)

const instance = getCurrentInstance()
const inputId = computed(
  () => props.id ?? `f-input-number-${instance?.uid ?? Math.random().toString(36).slice(2)}`
)

const minDisabled = computed(() => {
  return props.disabled || currentValue.value !== null && currentValue.value <= props.min
})

const maxDisabled = computed(() => {
  return props.disabled || currentValue.value !== null && currentValue.value >= props.max
})

const inputNumberClass = computed(() => {
  return [
    `f-input-number--${props.size}`,
    {
      'is-disabled': props.disabled,
      'is-without-controls': !props.controls,
      'is-controls-right': props.controlsPosition === 'right'
    }
  ]
})

function toPrecision(num: number, precision?: number): number {
  if (precision === undefined) precision = props.precision
  if (precision === undefined) return num
  return parseFloat(num.toFixed(precision))
}

function getPrecision(value: number | string): number {
  if (value === '') return 0
  const str = value.toString()
  const decimalIndex = str.indexOf('.')
  return decimalIndex >= 0 ? str.length - decimalIndex - 1 : 0
}

function ensurePrecision(num: number): number {
  if (props.precision !== undefined) {
    return toPrecision(num, props.precision)
  }
  return num
}

function increase() {
  if (props.disabled || maxDisabled.value) return
  const value = Number(currentValue.value) || 0
  const newValue = ensurePrecision(value + props.step)
  setCurrentValue(newValue)
}

function decrease() {
  if (props.disabled || minDisabled.value) return
  const value = Number(currentValue.value) || 0
  const newValue = ensurePrecision(value - props.step)
  setCurrentValue(newValue)
}

function setCurrentValue(value: number) {
  const oldVal = currentValue.value
  
  if (value < props.min) {
    value = props.min
  } else if (value > props.max) {
    value = props.max
  }
  
  if (props.stepStrictly) {
    const stepPrecision = getPrecision(props.step)
    const maxPrecision = Math.max(stepPrecision, getPrecision(value))
    const stepMultiple = Math.pow(10, maxPrecision)
    const normalizedValue = Math.round(value / props.step) * props.step * stepMultiple / stepMultiple
    value = toPrecision(normalizedValue, maxPrecision)
  }
  
  // 应用precision限制
  value = ensurePrecision(value)
  
  currentValue.value = value
  emit('update:modelValue', value)
  emit('change', value, oldVal)
  
  if (!userInput.value) {
    displayValue.value = formatValue(value)
  }
}

function formatValue(value: number | null): string {
  if (value === null || value === undefined) return ''
  return value.toString()
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  userInput.value = false
  const raw = displayValue.value.trim()

  if (raw === '') {
    // valueOnClear support
    let clearVal: number | null = null
    if (props.valueOnClear === 'min') clearVal = props.min === -Infinity ? null : props.min
    else if (props.valueOnClear === 'max') clearVal = props.max === Infinity ? null : props.max
    else if (typeof props.valueOnClear === 'number') clearVal = props.valueOnClear
    else clearVal = null

    if (clearVal !== null) {
      setCurrentValue(clearVal)
    } else {
      currentValue.value = null
      emit('update:modelValue', null)
      emit('change', null, currentValue.value)
      displayValue.value = ''
    }
  } else {
    const value = Number(raw)
    if (isNaN(value)) {
      setCurrentValue(props.min === -Infinity ? 0 : props.min)
    } else {
      setCurrentValue(ensurePrecision(value))
    }
  }

  emit('blur', event)
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      increase()
      break
    case 'ArrowDown':
      event.preventDefault()
      decrease()
      break
  }
}

function handleInput() {
  userInput.value = true
  const value = displayValue.value
  const num = Number(value)
  
  if (!isNaN(num)) {
    const precision = getPrecision(value)
    if (props.precision !== undefined && precision > props.precision) {
      displayValue.value = value.slice(0, value.length - (precision - props.precision))
    }
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== currentValue.value && !userInput.value) {
    currentValue.value = newVal
    displayValue.value = formatValue(newVal)
  }
}, { immediate: true })

watch(displayValue, () => {
  handleInput()
})

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
