<template>
  <div class="f-result" :class="resultClass" @click="handleClick">
    <div class="f-result__icon">
      <slot name="icon">
        <FIcon v-if="statusIcon" :icon="statusIcon" />
        <FIcon v-else-if="icon" :icon="icon" />
      </slot>
    </div>
    <div class="f-result__title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" class="f-result__subtitle">
      <slot name="subTitle">
        {{ subTitle }}
      </slot>
    </div>
    <div v-if="$slots.extra" class="f-result__extra">
      <slot name="extra"></slot>
    </div>
    <div v-if="$slots.default" class="f-result__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResultProps, ResultEmits } from './Result'
import type { ResultStatusType } from './Result'
import type { allIconType } from '@utils/ficon'
import FIcon from '@/FIcon'

defineOptions({ name: 'FResult', inheritAttrs: false })

const props = withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: '',
  subTitle: ''
})

const emit = defineEmits<ResultEmits>()

const resultClass = computed(() => {
  return [
    `f-result--${props.status}`
  ]
})

const statusIcon = computed(() => {
  const iconMap: Record<ResultStatusType, allIconType> = {
    success: 'circle-check',
    error: 'circle-error',
    warning: 'circle-warning',
    info: 'circle-information',
    '404': 'search',
    '500': 'warning'
  }
  return iconMap[props.status]
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
