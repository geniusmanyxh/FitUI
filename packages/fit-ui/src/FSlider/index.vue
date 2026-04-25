<template>
  <div class="f-slider" :class="{ 'is-disabled': disabled, 'is-vertical': vertical }" role="slider" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="currentValue" tabindex="0" @keydown="handleKeyDown">
    <div ref="trackRef" class="f-slider__track" @mousedown="handleMouseDown">
      <div class="f-slider__runway" :style="runwayStyle"></div>
      <div class="f-slider__button" :class="{ 'is-dragging': isDragging }" :style="buttonStyle"></div>
    </div>
    <input v-if="showInput" type="number" class="f-slider__input" :value="currentValue" :min="min" :max="max" :step="step" @change="handleInputChange" :disabled="disabled">
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withInstall } from '@utils/install'

defineOptions({ name: 'FSlider', inheritAttrs: false })

export interface SliderProps {
  modelValue?: number | number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showInput?: boolean
  range?: boolean
  vertical?: boolean
  marks?: Record<number, string>
}

export interface SliderEmits {
  (e: 'update:modelValue', value: number | number[]): void
  (e: 'change', value: number | number[]): void
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showInput: false,
  range: false,
  vertical: false,
  marks: () => ({})
})

const emit = defineEmits<SliderEmits>()

const trackRef = ref<HTMLElement>()
const isDragging = ref(false)
const currentValue = ref(props.modelValue as number)

const percentage = computed(() => {
  return ((currentValue.value - props.min) / (props.max - props.min)) * 100
})

const runwayStyle = computed(() => {
  if (props.vertical) {
    return { height: `${percentage.value}%` }
  }
  return { width: `${percentage.value}%` }
})

const buttonStyle = computed(() => {
  if (props.vertical) {
    return { bottom: `${percentage.value}%` }
  }
  return { left: `${percentage.value}%` }
})

const getValueFromPosition = (pos: number) => {
  if (!trackRef.value) return currentValue.value
  const rect = trackRef.value.getBoundingClientRect()
  let ratio: number
  if (props.vertical) {
    ratio = (rect.bottom - pos) / rect.height
  } else {
    ratio = (pos - rect.left) / rect.width
  }
  ratio = Math.max(0, Math.min(1, ratio))
  return props.min + ratio * (props.max - props.min)
}

const formatValue = (val: number) => {
  const steps = Math.round((val - props.min) / props.step)
  return props.min + steps * props.step
}

const handleMouseDown = (e: MouseEvent) => {
  if (props.disabled) return
  isDragging.value = true
  updateValueFromEvent(e)
}

const updateValueFromEvent = (e: MouseEvent | TouchEvent) => {
  const clientY = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
  const clientX = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
  const pos = props.vertical ? clientY : clientX
  const val = formatValue(getValueFromPosition(pos))
  currentValue.value = val
  emit('update:modelValue', val)
  emit('change', val)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  updateValueFromEvent(e)
}

const handleMouseUp = () => {
  isDragging.value = false
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (props.disabled) return
  let newVal = currentValue.value
  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowRight':
      newVal = Math.min(props.max, currentValue.value + props.step)
      break
    case 'ArrowDown':
    case 'ArrowLeft':
      newVal = Math.max(props.min, currentValue.value - props.step)
      break
    case 'Home':
      newVal = props.min
      break
    case 'End':
      newVal = props.max
      break
  }
  if (newVal !== currentValue.value) {
    currentValue.value = newVal
    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
}

const handleInputChange = (e: Event) => {
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(val)) {
    const formatted = formatValue(Math.max(props.min, Math.min(props.max, val)))
    currentValue.value = formatted
    emit('update:modelValue', formatted)
    emit('change', formatted)
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
