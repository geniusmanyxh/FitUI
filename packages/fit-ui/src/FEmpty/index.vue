<template>
  <div class="f-empty" @click="handleClick">
    <div class="f-empty__image" :style="imageStyle">
      <slot name="image">
        <img v-if="image" :src="image" alt="empty" />
        <svg v-else viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h448l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z" fill="#d9d9d9"/>
          <path d="M512 448a32 32 0 1 1 0-64 32 32 0 0 1 0 64zm0 64a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320z" fill="#d9d9d9"/>
        </svg>
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
import { computed } from 'vue'
import type { EmptyProps, EmptyEmits } from './Empty'

defineOptions({ name: 'FEmpty', inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), {
  description: '暂无数据'
})

const emit = defineEmits<EmptyEmits>()

const imageStyle = computed(() => {
  if (props.imageSize) {
    return {
      width: `${props.imageSize}px`,
      height: `${props.imageSize}px`
    }
  }
  return {}
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
