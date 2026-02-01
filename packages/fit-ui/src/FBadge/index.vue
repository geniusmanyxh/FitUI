<template>
  <div class="f-badge" @click="handleClick">
    <slot></slot>
    <Transition name="f-badge">
      <span v-if="!hidden && (content || isDot)" class="f-badge__content" :class="badgeClass">
        <span v-if="content" class="f-badge__value">{{ content }}</span>
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps, BadgeEmits } from './Badge'

defineOptions({ name: 'FBadge', inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), {
  max: 99,
  isDot: false,
  hidden: false,
  type: 'danger'
})

const emit = defineEmits<BadgeEmits>()

const content = computed(() => {
  if (props.isDot) return ''
  if (props.value === undefined || props.value === null) return ''
  
  const numValue = Number(props.value)
  if (isNaN(numValue)) return String(props.value)
  
  if (props.max !== undefined && numValue > props.max) {
    return `${props.max}+`
  }
  
  return String(props.value)
})

const badgeClass = computed(() => {
  return [
    `f-badge__content--${props.type}`,
    {
      'f-badge__content--dot': props.isDot,
      'f-badge__content--fixed': !props.isDot
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
