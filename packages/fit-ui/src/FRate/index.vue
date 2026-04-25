<template>
  <div
    class="f-rate"
    :class="{ 'is-disabled': disabled }"
    role="radiogroup"
    :aria-label="label || 'Rating'"
    @mouseleave="handleMouseLeave"
  >
    <template v-for="item in max" :key="item">
      <span
        class="f-rate__item"
        :style="{ fontSize: size }"
        @click="handleRateClick(item)"
        @mouseenter="handleRateHover(item)"
        role="radio"
        :aria-checked="Math.ceil(currentValue) === item ? 'true' : 'false'"
        tabindex="0"
        @keydown.enter="handleRateClick(item)"
        @keydown.space.prevent="handleRateClick(item)"
      >
        <svg
          class="f-rate__star"
          :class="{
            active: Math.ceil(currentValue) >= item,
            half: allowHalf && Math.floor(currentValue) === item - 1 && currentValue % 1 !== 0
          }"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>
    </template>
    <span v-if="showText" class="f-rate__text">{{ text || currentValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { withInstall } from '@utils/install'

defineOptions({ name: 'FRate', inheritAttrs: false })

export interface RateProps {
  modelValue?: number
  max?: number
  disabled?: boolean
  allowHalf?: boolean
  size?: string
  showText?: boolean
  texts?: string[]
  label?: string
}

export interface RateEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  allowHalf: false,
  size: '20px',
  showText: false,
  texts: () => [],
  label: 'Rating'
})

const emit = defineEmits<RateEmits>()

const currentValue = ref(props.modelValue)
const hoverValue = ref(0)

const text = computed(() => {
  const index = Math.ceil(currentValue.value) - 1
  return props.texts[index] ?? `${currentValue.value} / ${props.max}`
})

watch(() => props.modelValue, (val) => {
  currentValue.value = val
})

const handleRateClick = (item: number) => {
  if (props.disabled) return
  const newValue = props.allowHalf && Math.abs(currentValue.value - item + 0.5) < 0.1 ? item - 0.5 : item
  currentValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleRateHover = (item: number) => {
  if (props.disabled) return
  hoverValue.value = item
}

const handleMouseLeave = () => {
  hoverValue.value = 0
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
