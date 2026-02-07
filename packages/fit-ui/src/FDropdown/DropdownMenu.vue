<template>
  <div
    class="f-dropdown-menu"
    :class="[
      `f-dropdown-menu--${placement}`,
      popperClass
    ]"
    :style="menuStyle"
    :id="id"
    role="listbox"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @keydown.esc="handleClose"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'FDropdownMenu', inheritAttrs: false })

const props = withDefaults(defineProps<{
  /**
   * 菜单ID
   */
  id?: string
  /**
   * 菜单位置
   * @default 'bottom'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * 菜单最大高度
   */
  maxHeight?: number
  /**
   * 自定义类名
   */
  popperClass?: string
  /**
   * 菜单宽度
   * @default 'auto'
   */
  menuWidth?: string
}>(), {
  placement: 'bottom',
  menuWidth: 'auto'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const menuStyle = computed(() => {
  const style: Record<string, string> = {
    width: props.menuWidth
  }
  if (props.maxHeight) {
    style['max-height'] = `${props.maxHeight}px`
    style['overflow-y'] = 'auto'
  }
  return style
})

const handleMouseEnter = () => {
  // Keep menu open on hover
}

const handleMouseLeave = () => {
  // Could close on leave if needed
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.f-dropdown-menu {
  position: absolute;
  background: var(--fit-bg-color, #fff);
  border: 1px solid var(--fit-border-color, #e4e7ed);
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  z-index: 1000;
  min-width: 100px;
  
  &--top {
    bottom: 100%;
    margin-bottom: 4px;
  }
  
  &--bottom {
    top: 100%;
    margin-top: 4px;
  }
  
  &--left {
    right: 100%;
    margin-right: 4px;
  }
  
  &--right {
    left: 100%;
    margin-left: 4px;
  }
}
</style>
