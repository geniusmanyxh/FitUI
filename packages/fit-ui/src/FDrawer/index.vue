<template>
  <Teleport to="body">
    <Transition name="f-drawer">
      <div v-if="visible" class="f-drawer" :class="drawerClass">
        <div v-if="mask" class="f-drawer__mask" @click="handleMaskClick"></div>
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
            <div class="f-drawer__body">
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
import { computed, watch } from 'vue'
import type { DrawerProps, DrawerEmits } from './Drawer'
import type { DrawerPositionType, DrawerSizeType } from './Drawer'
import FIcon from '@/FIcon'
import FButton from '@/FButton'

defineOptions({ name: 'FDrawer', inheritAttrs: false })

const props = withDefaults(defineProps<DrawerProps>(), {
  visible: false,
  position: 'right',
  size: 'medium',
  closable: true,
  maskClosable: true,
  mask: true,
  showFooter: false,
  footer: false
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

function handleClose() {
  emit('update:visible', false)
  emit('close')
}

function handleMaskClick() {
  if (props.maskClosable) {
    handleClose()
  }
}

watch(() => props.visible, (newVal) => {
  if (newVal) {
    emit('open')
  } else {
    emit('closed')
  }
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
