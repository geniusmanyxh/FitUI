<template>
  <Teleport to="body">
    <Transition name="f-notification">
      <div v-if="visible" class="f-notification" :class="notificationClass" :style="notificationStyle">
        <div class="f-notification__content">
          <FIcon v-if="type !== 'info'" :icon="typeIcon" class="f-notification__icon" />
          <div class="f-notification__message">
            <div v-if="title" class="f-notification__title">{{ title }}</div>
            <div class="f-notification__text">{{ message }}</div>
          </div>
        </div>
        <button v-if="showClose" class="f-notification__close" @click="handleClose">
          <FIcon icon="close" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { NotificationProps, NotificationEmits } from './Notification'
import type { NotificationType } from './Notification'
import FIcon from '@/FIcon'

defineOptions({ name: 'FNotification', inheritAttrs: false })

const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  duration: 3000,
  showClose: true,
  position: 'top-right',
  offset: 20
})

const emit = defineEmits<NotificationEmits>()

const visible = ref(true)

const notificationClass = computed(() => {
  return [
    `f-notification--${props.type}`,
    `f-notification--${props.position}`
  ]
})

const notificationStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.position.includes('top')) {
    style.top = `${props.offset}px`
  } else {
    style.bottom = `${props.offset}px`
  }
  
  if (props.position.includes('right')) {
    style.right = `${props.offset}px`
  } else {
    style.left = `${props.offset}px`
  }
  
  return style
})

const typeIcon = computed(() => {
  const iconMap: Record<NotificationType, string> = {
    success: 'check-circle',
    warning: 'warning',
    error: 'x-circle',
    info: 'info-circle'
  }
  return iconMap[props.type]
})

function handleClose() {
  visible.value = false
  emit('close')
}

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
