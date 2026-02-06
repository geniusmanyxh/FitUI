<template>
  <div class="f-progress" :class="progressClass" @click="handleClick">
    <template v-if="type === 'line'">
      <div class="f-progress__bar" :style="barStyle">
        <div class="f-progress__outer" :style="outerStyle">
          <div class="f-progress__inner" :style="innerStyle">
            <div v-if="textInside" class="f-progress__text-inner">
              {{ percentage }}%
            </div>
          </div>
        </div>
      </div>
      <div v-if="showText && !textInside" class="f-progress__text">
        <slot name="default">
          {{ percentage }}%
        </slot>
      </div>
    </template>
    
    <template v-else-if="type === 'circle' || type === 'dashboard'">
      <div class="f-progress__circle" :style="circleStyle">
        <svg viewBox="0 0 100 100" :style="svgStyle">
          <path
            class="f-progress__circle-track"
            :d="trackPath"
            :stroke="backgroundColor"
            :stroke-width="strokeWidth"
            fill="none"
          />
          <path
            class="f-progress__circle-stroke"
            :d="strokePath"
            :stroke="strokeColor"
            :stroke-width="strokeWidth"
            :stroke-dasharray="strokeDasharray"
            :stroke-dashoffset="strokeDashoffset"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
        <div v-if="showText" class="f-progress__circle-text">
          <slot name="default">
            {{ percentage }}%
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressProps, ProgressEmits } from './Progress'
import type { ProgressType, ProgressStatusType } from './Progress'

defineOptions({ name: 'FProgress', inheritAttrs: false })

const props = withDefaults(defineProps<ProgressProps>(), {
  percentage: 0,
  type: 'line',
  status: 'default',
  strokeWidth: 6,
  textInside: false,
  width: 126,
  showText: true,
  backgroundColor: '#e5e7eb'
})

const emit = defineEmits<ProgressEmits>()

const progressClass = computed(() => {
  return [
    `f-progress--${props.type}`,
    `f-progress--${props.status}`
  ]
})

const barStyle = computed(() => {
  return {
    width: props.type === 'line' ? '100%' : `${props.width}px`
  }
})

const outerStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor
  }
})

const innerStyle = computed(() => {
  const color = getStrokeColor()
  return {
    width: `${Math.min(props.percentage, 100)}%`,
    backgroundColor: color,
    transition: 'width 0.3s ease'
  }
})

const circleStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.width}px`
  }
})

const svgStyle = computed(() => {
  return {
    width: '100%',
    height: '100%'
  }
})

const strokeColor = computed(() => {
  return getStrokeColor()
})

const radius = computed(() => {
  return 50 - props.strokeWidth / 2
})

const trackPath = computed(() => {
  const r = radius.value
  if (props.type === 'dashboard') {
    // 仪表盘：从135度到45度（3/4圆，底部留空）
    const start = polarToCartesian(50, 50, r, 135)
    const end = polarToCartesian(50, 50, r, 45)
    return `M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`
  }
  // 完整圆环
  return `M 50 ${50 - r} A ${r} ${r} 0 1 1 50 ${50 + r} A ${r} ${r} 0 1 1 50 ${50 - r}`
})

const strokePath = computed(() => {
  return trackPath.value
})

const pathLength = computed(() => {
  const r = radius.value
  if (props.type === 'dashboard') {
    // 3/4圆周长
    return 2 * Math.PI * r * 0.75
  }
  // 完整圆周长
  return 2 * Math.PI * r
})

const strokeDasharray = computed(() => {
  return `${pathLength.value} ${pathLength.value}`
})

const strokeDashoffset = computed(() => {
  const percentage = Math.min(props.percentage, 100)
  return pathLength.value * (1 - percentage / 100)
})

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function getStrokeColor(): string {
  if (props.color) {
    if (Array.isArray(props.color)) {
      const percentage = Math.min(props.percentage, 100)
      const index = Math.floor(percentage / 100 * (props.color.length - 1))
      return props.color[index]
    }
    return props.color
  }
  
  if (props.status === 'success') return 'var(--f-success)'
  if (props.status === 'exception') return 'var(--f-danger)'
  if (props.status === 'warning') return 'var(--f-warning)'
  
  return 'var(--f-primary)'
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
