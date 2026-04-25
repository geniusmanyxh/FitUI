<template>
  <li class="f-timeline-item" :class="{ 'f-timeline-item--center': center }">
    <div class="f-timeline-item__node" :class="[`f-timeline-item__node--${type}`]" :style="nodeStyle">
      <slot name="icon">
        <f-icon :icon="icon" size="small" v-if="icon"></f-icon>
      </slot>
    </div>
    <div class="f-timeline-item__content">
      <slot></slot>
    </div>
    <div class="f-timeline-item__timestamp" v-if="timestamp">
      {{ timestamp }}
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FIcon from '@/FIcon'
import type { CSSProperties } from 'vue'

defineOptions({ name: 'FTimelineItem', inheritAttrs: false })

export interface TimelineItemProps {
  timestamp?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  icon?: string
  center?: boolean
  size?: string
}

const props = withDefaults(defineProps<TimelineItemProps>(), {
  timestamp: '',
  type: 'default',
  icon: '',
  center: false,
  size: '16px'
})

const nodeStyle = computed<CSSProperties>(() => ({
  width: props.size,
  height: props.size
}))
</script>

<style scoped lang="scss">
.f-timeline-item {
  position: relative;
  padding: 0 0 20px 28px;
  margin: 0;

  &__node {
    position: absolute;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    background-color: #dcdfe6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    &--primary {
      background-color: #409eff;
    }

    &--success {
      background-color: #67c23a;
    }

    &--warning {
      background-color: #e6a23c;
    }

    &--danger {
      background-color: #f56c6c;
    }

    &--info {
      background-color: #909399;
    }
  }

  &__content {
    font-size: 14px;
    color: #303133;
  }

  &__timestamp {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
  }
}
</style>
