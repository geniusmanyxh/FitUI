<template>
  <div class="dropdown_wrapper" ref="dropdownRef">
    <!-- 触发元素 -->
    <div
      class="dropdown_trigger"
      ref="triggerRef"
      @click="toggleDropdown"
      @keydown.enter="toggleDropdown"
      @keydown.space="toggleDropdown"
      @keydown.esc="closeDropdown"
      role="button"
      :aria-haspopup="'listbox'"
      :aria-expanded="isOpen"
      :aria-controls="`dropdown-menu-${id}`"
      tabindex="0"
    >
      <slot name="trigger"></slot>
    </div>
    
    <!-- 下拉菜单 -->
    <div
      v-if="isOpen"
      class="dropdown_menu"
      :class="{
        [`dropdown_menu_${placement}`]: true
      }"
      ref="menuRef"
      :id="`dropdown-menu-${id}`"
      role="listbox"
      :aria-labelledby="`dropdown-trigger-${id}`"
      @keydown.esc="closeDropdown"
      @keydown.up="handleKeyDown('up')"
      @keydown.down="handleKeyDown('down')"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * FDropdown 下拉菜单组件
 *
 * @description 用于展示下拉菜单，支持自定义触发和菜单内容
 * @example
 * ```vue
 * <FDropdown>
 *   <template #trigger>
 *     <FButton>下拉菜单</FButton>
 *   </template>
 *   <div class="dropdown-item" role="option">选项1</div>
 *   <div class="dropdown-item" role="option">选项2</div>
 *   <div class="dropdown-item" role="option">选项3</div>
 * </FDropdown>
 * ```
 */
defineOptions({ name: 'FDropdown', inheritAttrs: false })

import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  /**
   * 下拉菜单位置
   * @default 'bottom'
   * @example 'top' | 'bottom' | 'left' | 'right'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * 是否默认展开
   * @default false
   */
  defaultOpen?: boolean
  /**
   * 是否可点击外部关闭
   * @default true
   */
  clickOutside?: boolean
  /**
   * 下拉菜单宽度
   * @default 'auto'
   * @example '200px' | '100%' | 'auto'
   */
  menuWidth?: string
}>()

const emit = defineEmits<{
  /**
   * 下拉菜单展开状态变化时触发
   */
  (e: 'update:open', value: boolean): void
  /**
   * 下拉菜单展开时触发
   */
  (e: 'open'): void
  /**
   * 下拉菜单关闭时触发
   */
  (e: 'close'): void
}>()

// 组件引用
const dropdownRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()

// 状态管理
const isOpen = ref(props.defaultOpen || false)
const id = Math.random().toString(36).slice(2, 11)

// 切换下拉菜单状态
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

// 打开下拉菜单
const openDropdown = () => {
  if (!isOpen.value) {
    isOpen.value = true
    emit('update:open', true)
    emit('open')
  }
}

// 关闭下拉菜单
const closeDropdown = () => {
  if (isOpen.value) {
    isOpen.value = false
    emit('update:open', false)
    emit('close')
  }
}

// 处理键盘导航
const handleKeyDown = (direction: 'up' | 'down') => {
  if (!menuRef.value) return
  
  const options = Array.from(menuRef.value.querySelectorAll('[role="option"]'))
  if (options.length === 0) return
  
  const currentIndex = options.findIndex(option => option === document.activeElement)
  let nextIndex = currentIndex
  
  if (direction === 'down') {
    nextIndex = (currentIndex + 1) % options.length
  } else {
    nextIndex = (currentIndex - 1 + options.length) % options.length
  }
  
  if (nextIndex >= 0 && nextIndex < options.length) {
    (options[nextIndex] as HTMLElement).focus()
  } else {
    (options[0] as HTMLElement).focus()
  }
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.clickOutside &&
    isOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    closeDropdown()
  }
}

// 监听点击外部事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 监听isOpen状态变化，调整菜单位置
watch(isOpen, (newValue) => {
  if (newValue && menuRef.value && triggerRef.value) {
    // 这里可以添加位置计算逻辑
  }
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>