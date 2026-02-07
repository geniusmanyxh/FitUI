<template>
  <Teleport :to="appendToTarget">
    <Transition name="f-notification">
      <div 
        v-if="visible" 
        class="f-notification" 
        :class="[notificationClass, customClass]" 
        :style="notificationStyle"
        @click="handleClick"
      >
        <div class="f-notification__content">
          <FIcon v-if="type !== 'info'" :icon="typeIcon" class="f-notification__icon" />
          <div class="f-notification__message">
            <div v-if="title" class="f-notification__title">{{ title }}</div>
            <div class="f-notification__text">
              <span v-if="dangerouslyUseHTMLString" v-html="message"></span>
              <span v-else>{{ message }}</span>
            </div>
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
import type { allIconType } from '@utils/ficon'
import FIcon from '@/FIcon'

defineOptions({ name: 'FNotification', inheritAttrs: false })

const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  duration: 3000,
  showClose: true,
  position: 'top-right',
  offset: 20,
  dangerouslyUseHTMLString: false,
  customClass: undefined,
  zIndex: undefined,
  appendTo: undefined,
  onClick: undefined,
  onClose: undefined
})

const emit = defineEmits<NotificationEmits>()

const visible = ref(true)

// 计算挂载目标
const appendToTarget = computed(() => {
  if (!props.appendTo) {
    return 'body'
  }
  if (typeof props.appendTo === 'string') {
    return props.appendTo
  }
  // 如果是 HTMLElement，需要返回一个选择器或 'body'
  // 由于 Teleport 的限制，这里返回 'body'，实际挂载逻辑需要在外部处理
  return 'body'
})

const notificationClass = computed(() => {
  return [
    `f-notification--${props.type}`,
    `f-notification--${props.position}`
  ]
})

const customClass = computed(() => props.customClass)

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
  
  if (props.zIndex !== undefined) {
    style.zIndex = `${props.zIndex}`
  }
  
  return style
})

const typeIcon = computed(() => {
  const iconMap: Record<NotificationType, allIconType> = {
    success: 'circle-check',
    warning: 'circle-warning',
    error: 'circle-error',
    info: 'circle-information'
  }
  return iconMap[props.type]
})

function handleClose() {
  visible.value = false
  emit('close')
  if (props.onClose) {
    props.onClose()
  }
}

function handleClick() {
  if (props.onClick) {
    props.onClick()
  }
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
