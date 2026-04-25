<template>
  <div class="f-space" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withInstall } from '@utils/install'
import type { CSSProperties } from 'vue'

defineOptions({ name: 'FSpace', inheritAttrs: false })

export interface SpaceProps {
  size?: number | string
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  align?: 'start' | 'end' | 'center' | 'baseline'
}

const props = withDefaults(defineProps<SpaceProps>(), {
  size: 8,
  direction: 'horizontal',
  wrap: false,
  align: 'center'
})

const containerStyle = computed<CSSProperties>(() => ({
  display: 'flex',
  flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
  gap: typeof props.size === 'number' ? `${props.size}px` : props.size,
  flexWrap: props.wrap ? 'wrap' : 'nowrap',
  alignItems: props.align
}))
</script>

<style scoped lang="scss">
.f-space {
  :slotted(.f-space-item) {
    flex-shrink: 0;
  }
}
</style>
