<template>
  <div class="f-divider" :class="dividerClass" role="separator">
    <template v-if="content || $slots.default">
      <span class="f-divider__text" :class="`f-divider__text--${contentPosition}`">
        <slot>{{ content }}</slot>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DividerProps } from './Divider'

defineOptions({ name: 'FDivider', inheritAttrs: false })

const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  contentPosition: 'center',
  borderStyle: 'solid'
})

const dividerClass = computed(() => {
  return [
    `f-divider--${props.direction}`,
    `f-divider--${props.borderStyle}`
  ]
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
