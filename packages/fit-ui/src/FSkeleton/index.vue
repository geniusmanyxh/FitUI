<template>
  <div v-if="showSkeleton" class="f-skeleton" :class="skeletonClass" @click="handleClick">
    <slot name="template">
      <div v-if="type === 'text' || type === 'custom'" class="f-skeleton__content">
        <div v-if="title" class="f-skeleton__title"></div>
        <div v-if="paragraph" class="f-skeleton__paragraph">
          <div v-for="i in rows" :key="i" class="f-skeleton__paragraph-item"></div>
        </div>
      </div>
      <div v-else-if="type === 'image'" class="f-skeleton__image">
        <div v-if="avatar" class="f-skeleton__avatar"></div>
        <div class="f-skeleton__image-content">
          <div v-if="title" class="f-skeleton__title"></div>
          <div v-if="paragraph" class="f-skeleton__paragraph">
            <div v-for="i in rows" :key="i" class="f-skeleton__paragraph-item"></div>
          </div>
        </div>
      </div>
    </slot>
  </div>
  <div v-else-if="$slots.default" class="f-skeleton">
    <slot></slot>
  </div>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { SkeletonProps, SkeletonEmits } from './Skeleton'
import type { SkeletonType } from './Skeleton'

defineOptions({ name: 'FSkeleton', inheritAttrs: false })

const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  rows: 3,
  animated: true,
  type: 'text',
  avatar: false,
  title: true,
  paragraph: true,
  active: true
})

const emit = defineEmits<SkeletonEmits>()

const showSkeleton = ref(false)
let throttleTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.loading,
  (newVal) => {
    if (throttleTimer) {
      clearTimeout(throttleTimer)
      throttleTimer = null
    }

    if (newVal) {
      if (props.throttle && props.throttle > 0) {
        throttleTimer = setTimeout(() => {
          showSkeleton.value = true
        }, props.throttle)
      } else {
        showSkeleton.value = true
      }
    } else {
      showSkeleton.value = false
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.loading) {
    if (props.throttle && props.throttle > 0) {
      throttleTimer = setTimeout(() => {
        showSkeleton.value = true
      }, props.throttle)
    } else {
      showSkeleton.value = true
    }
  }
})

onBeforeUnmount(() => {
  if (throttleTimer) {
    clearTimeout(throttleTimer)
  }
})

const skeletonClass = computed(() => {
  return [
    `f-skeleton--${props.type}`,
    {
      'f-skeleton--animated': props.animated,
      'f-skeleton--active': props.active
    }
  ]
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
