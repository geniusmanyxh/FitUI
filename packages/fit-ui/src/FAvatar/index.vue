<template>
  <span class="f-avatar" :class="avatarClass" :style="avatarStyle" @click="handleClick">
    <img
      v-if="src && !hasError"
      :src="src"
      :srcset="srcSet"
      :alt="alt"
      class="f-avatar__image"
      :style="{ objectFit: fit }"
      @error="handleError"
    />
    <span v-else-if="icon" class="f-avatar__icon">
      <FIcon :icon="icon" />
    </span>
    <span v-else-if="text" class="f-avatar__text" :style="textStyle">
      {{ text }}
    </span>
    <slot v-else></slot>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { AvatarProps, AvatarEmits } from './Avatar'
import type { AvatarSizeType, AvatarShapeType } from './Avatar'
import FIcon from '@/FIcon'

defineOptions({ name: 'FAvatar', inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: 'avatar',
  size: 'default',
  shape: 'circle',
  fit: 'cover'
})

const emit = defineEmits<AvatarEmits>()

const hasError = ref(false)

const avatarClass = computed(() => {
  const classes: string[] = []
  
  if (typeof props.size === 'string') {
    classes.push(`f-avatar--${props.size}`)
  }
  
  classes.push(`f-avatar--${props.shape}`)
  
  return classes
})

const avatarStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (typeof props.size === 'number') {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
    style.fontSize = `${props.size / 2}px`
  }
  
  return style
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}

function handleError(event: Event) {
  hasError.value = true
  emit('error', event)
}

const textStyle = computed(() => {
  if (props.gap !== undefined) {
    return { padding: `0 ${props.gap}px` }
  }
  return {}
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
