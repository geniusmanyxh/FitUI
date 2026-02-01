<template>
  <div class="f-empty" @click="handleClick">
    <div v-if="image || $slots.image" class="f-empty__image">
      <slot name="image">
        <img v-if="image" :src="image" alt="empty" />
      </slot>
    </div>
    <div class="f-empty__description">
      <slot name="description">
        <p>{{ description }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" class="f-empty__default">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmptyProps, EmptyEmits } from './Empty'

defineOptions({ name: 'FEmpty', inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), {
  description: '暂无数据'
})

const emit = defineEmits<EmptyEmits>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
