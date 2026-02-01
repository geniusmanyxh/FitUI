<template>
  <div class="f-popover" ref="popoverRef">
    <div
      ref="triggerRef"
      class="f-popover__trigger"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot></slot>
    </div>
    <Teleport to="body">
      <Transition :name="transition">
        <div
          v-if="visible"
          ref="contentRef"
          class="f-popover__content"
          :class="contentClass"
          :style="contentStyle"
        >
          <div v-if="showArrow" class="f-popover__arrow"></div>
          <div class="f-popover__inner">
            <slot name="content"></slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { PopoverProps, PopoverEmits } from './Popover'
import type { PopoverTriggerType, PopoverPlacementType } from './Popover'

defineOptions({ name: 'FPopover', inheritAttrs: false })

const props = withDefaults(defineProps<PopoverProps>(), {
  visible: false,
  trigger: 'click',
  placement: 'bottom',
  width: 180,
  offset: 12,
  disabled: false,
  hideAfter: 0,
  showArrow: true,
  transition: 'f-popover'
})

const emit = defineEmits<PopoverEmits>()

const popoverRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const timer = ref<number>()

const contentClass = computed(() => {
  return [
    `f-popover__content--${props.placement}`
  ]
})

const contentStyle = computed(() => {
  const style: Record<string, string> = {}
  style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return style
})

function handleClick() {
  if (props.disabled || props.trigger !== 'click') return
  
  if (props.visible) {
    hide()
  } else {
    show()
  }
}

function handleMouseEnter() {
  if (props.disabled || props.trigger !== 'hover') return
  show()
}

function handleMouseLeave() {
  if (props.disabled || props.trigger !== 'hover') return
  hide()
}

function handleFocus() {
  if (props.disabled || props.trigger !== 'focus') return
  show()
}

function handleBlur() {
  if (props.disabled || props.trigger !== 'focus') return
  hide()
}

function show() {
  emit('update:visible', true)
  emit('show')
  nextTick(() => {
    updatePosition()
  })
}

function hide() {
  emit('update:visible', false)
  emit('hide')
}

function updatePosition() {
  if (!triggerRef.value || !contentRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset
  
  let top = 0
  let left = 0
  
  switch (props.placement) {
    case 'top':
    case 'top-start':
    case 'top-end':
      top = triggerRect.top + scrollY - props.offset
      break
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      top = triggerRect.bottom + scrollY + props.offset
      break
    case 'left':
    case 'left-start':
    case 'left-end':
      left = triggerRect.left + scrollX - props.offset
      break
    case 'right':
    case 'right-start':
    case 'right-end':
      left = triggerRect.right + scrollX + props.offset
      break
  }
  
  switch (props.placement) {
    case 'top':
    case 'bottom':
    case 'left':
    case 'right':
      if (props.placement === 'top' || props.placement === 'bottom') {
        left = triggerRect.left + scrollX + (triggerRect.width - (typeof props.width === 'number' ? props.width : 180)) / 2
      } else {
        top = triggerRect.top + scrollY + (triggerRect.height - (typeof props.width === 'number' ? props.width : 180)) / 2
      }
      break
    case 'top-start':
    case 'bottom-start':
    case 'left-start':
    case 'right-start':
      if (props.placement === 'top-start' || props.placement === 'bottom-start') {
        left = triggerRect.left + scrollX
      } else {
        top = triggerRect.top + scrollY
      }
      break
    case 'top-end':
    case 'bottom-end':
    case 'left-end':
    case 'right-end':
      if (props.placement === 'top-end' || props.placement === 'bottom-end') {
        left = triggerRect.right + scrollX - (typeof props.width === 'number' ? props.width : 180)
      } else {
        top = triggerRect.bottom + scrollY - (typeof props.width === 'number' ? props.width : 180)
      }
      break
  }
  
  contentRef.value.style.setProperty('top', `${top}px`)
  contentRef.value.style.setProperty('left', `${left}px`)
}

onMounted(() => {
  if (props.visible) {
    nextTick(() => {
      updatePosition()
    })
  }
  
  window.addEventListener('scroll', updatePosition)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('resize', updatePosition)
  if (timer.value) {
    clearTimeout(timer.value)
  }
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
