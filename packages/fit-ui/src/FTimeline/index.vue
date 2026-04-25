<template>
  <div class="f-timeline" :class="{ 'f-timeline--reverse': reverse }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { withInstall } from '@utils/install'

defineOptions({ name: 'FTimeline', inheritAttrs: false })

export interface TimelineProps {
  reverse?: boolean
}

withDefaults(defineProps<TimelineProps>(), {
  reverse: false
})
</script>

<style scoped lang="scss">
.f-timeline {
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #ebeef5;
  }
}
</style>
