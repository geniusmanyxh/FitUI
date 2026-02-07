<template>
  <div class="f-skeleton-item" :class="itemClass" :style="itemStyle"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({ name: 'FSkeletonItem' })

export interface SkeletonItemProps {
  variant?: 'text' | 'image' | 'circle' | 'rect' | 'button' | 'p' | 'h1' | 'h3' | 'caption'
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<SkeletonItemProps>(), {
  variant: 'text',
})

const itemClass = computed(() => {
  return [`f-skeleton-item--${props.variant}`]
})

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})
</script>

<style scoped>
.f-skeleton-item {
  background: #f2f2f2;
  border-radius: 4px;
}

.f-skeleton-item--text {
  width: 100%;
  height: 16px;
}

.f-skeleton-item--p {
  width: 100%;
  height: 14px;
}

.f-skeleton-item--h1 {
  width: 60%;
  height: 24px;
}

.f-skeleton-item--h3 {
  width: 50%;
  height: 18px;
}

.f-skeleton-item--caption {
  width: 40%;
  height: 12px;
}

.f-skeleton-item--image {
  width: 100px;
  height: 100px;
  border-radius: 0;
}

.f-skeleton-item--circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.f-skeleton-item--rect {
  width: 100%;
  height: 80px;
  border-radius: 0;
}

.f-skeleton-item--button {
  width: 80px;
  height: 32px;
  border-radius: 4px;
}
</style>
