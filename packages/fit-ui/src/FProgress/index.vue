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
            fill="none"
            :stroke-linecap="round"
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
  if (props.type === 'dashboard') {
    return `M 50 ${50 - radius.value} A ${radius.value} ${radius.value} 0 1 1 ${50 + radius.value} 50`
  }
  return `M 50 50 m 0 -${radius.value} a ${radius.value} ${radius.value} 0 1 0 0 ${radius.value * 2} a ${radius.value} ${radius.value} 0 1 0 0 -${radius.value * 2}`
})

const strokePath = computed(() => {
  const percentage = Math.min(props.percentage, 100)
  const angle = (percentage / 100) * 360
  
  if (props.type === 'dashboard') {
    const startAngle = -90
    const endAngle = startAngle + (angle / 2)
    const startRadius = angleToRadius(startAngle)
    const endRadius = angleToRadius(endAngle)
    
    return `M 50 ${50 - radius.value} A ${radius.value} ${radius.value} 0 ${percentage >= 50 ? 1 : 0} 1 ${50 + startRadius.x} ${50 + startRadius.y} L 50 50 L ${50 + endRadius.x} ${50 + endRadius.y}`
  }
  
  const startAngle = -90
  const endAngle = startAngle + angle
  const startRadius = angleToRadius(startAngle)
  const endRadius = angleToRadius(endAngle)
  
  return `M 50 ${50 - radius.value} A ${radius.value} ${radius.value} 0 ${angle >= 180 ? 1 : 0} 1 ${50 + startRadius.x} ${50 + startRadius.y} L 50 50 L ${50 + endRadius.x} ${50 + endRadius.y}`
})

function angleToRadius(angle: number) {
  const rad = (angle * Math.PI) / 180
  return {
    x: radius.value * Math.cos(rad),
    y: radius.value * Math.sin(rad)
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
