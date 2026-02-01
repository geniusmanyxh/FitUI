<template>
  <div class="f-card" :class="cardClass" @click="handleClick">
    <div v-if="header || $slots.header" class="f-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="f-card__body" :class="bodyClass" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps, CardEmits } from './Card'

defineOptions({ name: 'FCard', inheritAttrs: false })

const props = withDefaults(defineProps<CardProps>(), {
  shadow: 'always'
})

const emit = defineEmits<CardEmits>()

const cardClass = computed(() => {
  return [
    `f-card--${props.shadow}`
  ]
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
