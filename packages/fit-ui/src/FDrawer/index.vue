<template>
  <Teleport :to="appendToTarget">
    <Transition name="f-drawer">
      <div v-if="!destroyOnClose || visible" class="f-drawer" :class="drawerClass" :style="drawerStyle">
        <div v-if="mask" class="f-drawer__mask" :class="modalClass" @click="handleMaskClick"></div>
        <div class="f-drawer__container" :style="containerStyle">
          <div class="f-drawer__content">
            <div v-if="title || closable || $slots.header" class="f-drawer__header">
              <slot name="header">
                <span class="f-drawer__title">{{ title }}</span>
              </slot>
              <button v-if="closable" class="f-drawer__close" @click="handleClose">
                <FIcon icon="close" />
              </button>
            </div>
            <div v-if="!destroyOnClose || visible" class="f-drawer__body">
              <slot></slot>
            </div>
            <div v-if="showFooter || footer || $slots.footer" class="f-drawer__footer">
              <slot name="footer">
                <FButton @click="handleClose">关闭</FButton>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import type { DrawerProps, DrawerEmits } from './Drawer'
import type { DrawerPositionType, DrawerSizeType } from './Drawer'
import FIcon from '@/FIcon'
import FButton from '@/FButton'

defineOptions({ name: 'FDrawer', inheritAttrs: false })

const originalBodyOverflow = ref('')

const props = withDefaults(defineProps<DrawerProps>(), {
  visible: false,
  position: 'right',
  size: 'medium',
  closable: true,
  maskClosable: true,
  mask: true,
  showFooter: false,
  footer: false,
  lockScroll: true,
  destroyOnClose: false,
  zIndex: undefined,
  appendTo: undefined,
  modalClass: undefined
})

const emit = defineEmits<DrawerEmits>()

const drawerClass = computed(() => {
  return [
    `f-drawer--${props.position}`
  ]
})

const containerStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (typeof props.size === 'number') {
    if (props.position === 'left' || props.position === 'right') {
      style.width = `${props.size}px`
    } else {
      style.height = `${props.size}px`
    }
  } else {
    const sizeMap: Record<DrawerSizeType, string> = {
      small: '300px',
      medium: '500px',
      large: '700px'
    }
    if (props.position === 'left' || props.position === 'right') {
      style.width = sizeMap[props.size]
    } else {
      style.height = sizeMap[props.size]
    }
  }
  
  return style
})

const drawerStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.zIndex !== undefined) {
    style.zIndex = `${props.zIndex}`
  }
  
  return style
})

// 计算挂载目标
const appendToTarget = computed(() => {
  if (!props.appendTo) {
    return 'body'
  }
  if (typeof props.appendTo === 'string') {
    return props.appendTo
  }
  // HTMLElement 需要特殊处理，这里返回 'body'，实际挂载逻辑在外部处理
  return 'body'
})

const modalClass = computed(() => props.modalClass)

async function handleClose() {
  if (props.beforeClose) {
    const result = await props.beforeClose()
    if (result === false) {
      return
    }
  }
  emit('update:visible', false)
  emit('close')
}

async function handleMaskClick() {
  if (props.maskClosable) {
    await handleClose()
  }
}

// 锁定/解锁 body 滚动
const lockBodyScroll = () => {
  if (props.lockScroll) {
    originalBodyOverflow.value = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
}

const unlockBodyScroll = () => {
  if (props.lockScroll) {
    document.body.style.overflow = originalBodyOverflow.value
  }
}

watch(() => props.visible, (newVal) => {
  if (newVal) {
    lockBodyScroll()
    emit('open')
  } else {
    unlockBodyScroll()
    emit('closed')
  }
})

onMounted(() => {
  if (props.visible) {
    lockBodyScroll()
  }
})

onUnmounted(() => {
  unlockBodyScroll()
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
