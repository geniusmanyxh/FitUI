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
    
    <template v-else-if="type === 'circle'">
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

    <template v-else-if="type === 'dashboard'">
      <div class="f-progress__dashboard" :style="circleStyle">
        <svg viewBox="0 0 100 100">
          <!-- 背景弧线轨道 -->
          <path
            class="f-progress__dashboard-track"
            :d="trackPath"
            :stroke="backgroundColor"
            :stroke-width="strokeWidth * 0.4"
            fill="none"
            stroke-linecap="round"
          />

          <!-- 刻度线 -->
          <line
            v-for="(tick, index) in dashboardTicks"
            :key="'t' + index"
            :x1="tick.x1"
            :y1="tick.y1"
            :x2="tick.x2"
            :y2="tick.y2"
            :stroke="tick.isActive ? strokeColor : 'var(--f-text-placeholder, #a8abb2)'"
            :stroke-width="tick.isMajor ? 1 : tick.isMedium ? 0.7 : 0.4"
            stroke-linecap="round"
          />

          <!-- 刻度标签 -->
          <text
            v-for="(label, index) in dashboardLabels"
            :key="'l' + index"
            :x="label.x"
            :y="label.y"
            text-anchor="middle"
            dominant-baseline="central"
            class="f-progress__dashboard-label"
            :fill="label.isActive ? strokeColor : 'var(--f-text-placeholder, #a8abb2)'"
          >
            {{ label.value }}
          </text>

          <!-- 指针 -->
          <g class="f-progress__dashboard-needle" :style="needleStyle">
            <polygon :points="needlePoints" :fill="strokeColor" />
            <circle cx="50" cy="50" r="5" :fill="strokeColor" />
            <circle cx="50" cy="50" r="2.5" fill="var(--f-bg-color, #fff)" />
          </g>
        </svg>

        <!-- 中心数值 -->
        <div v-if="showText" class="f-progress__dashboard-text">
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
    // 仪表盘：从225度到135度（3/4圆，底部留空，缺口朝下）
    const start = polarToCartesian(50, 50, r, 225)
    const end = polarToCartesian(50, 50, r, 135)
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

// ===== Dashboard 仪表盘模式 =====
const DASHBOARD_START = 225   // 起始角度：7:30 方向（左下）
const DASHBOARD_SWEEP = 270   // 弧线跨度：270°

// 刻度线数据
const dashboardTicks = computed(() => {
  if (props.type !== 'dashboard') return []
  const r = radius.value
  const ticks = []
  for (let i = 0; i <= 100; i += 5) {
    const angle = DASHBOARD_START + DASHBOARD_SWEEP * i / 100
    const isMajor = i % 20 === 0
    const isMedium = !isMajor && i % 10 === 0
    const len = isMajor ? 8 : isMedium ? 5 : 3
    const outer = polarToCartesian(50, 50, r, angle)
    const inner = polarToCartesian(50, 50, r - len, angle)
    ticks.push({
      x1: outer.x, y1: outer.y,
      x2: inner.x, y2: inner.y,
      isMajor, isMedium,
      isActive: i <= props.percentage,
      value: i,
      angle
    })
  }
  return ticks
})

// 主刻度标签数据
const dashboardLabels = computed(() => {
  if (props.type !== 'dashboard') return []
  const r = radius.value
  const labelR = r - 13
  return dashboardTicks.value
    .filter(t => t.isMajor)
    .map(t => {
      const pos = polarToCartesian(50, 50, labelR, t.angle)
      return { x: pos.x, y: pos.y, value: t.value, isActive: t.isActive }
    })
})

// 指针旋转角度
const needleAngle = computed(() => {
  const p = Math.min(Math.max(props.percentage, 0), 100)
  return DASHBOARD_START + DASHBOARD_SWEEP * p / 100
})

// 指针 CSS 变换（用于平滑动画）
const needleStyle = computed(() => ({
  transform: `rotate(${needleAngle.value}deg)`,
  transformOrigin: '50px 50px'
}))

// 指针多边形（菱形，初始朝上，通过 CSS rotate 旋转到目标角度）
const needlePoints = computed(() => {
  const r = radius.value
  const tipR = r - 9
  const tipY = 50 - tipR
  return `50,${tipY} 48,50 50,55 52,50`
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
