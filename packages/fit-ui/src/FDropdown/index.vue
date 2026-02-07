<template>
  <div class="dropdown_wrapper" ref="dropdownRef" :class="{ 'dropdown_wrapper--disabled': disabled }">
    <!-- 触发元素 -->
    <div
      v-if="!splitButton"
      class="dropdown_trigger"
      ref="triggerRef"
      @click="handleTriggerClick"
      @mouseenter="handleTriggerEnter"
      @mouseleave="handleTriggerLeave"
      @contextmenu="handleContextMenu"
      @keydown.enter="handleTriggerClick"
      @keydown.space="handleTriggerClick"
      @keydown.esc="closeDropdown"
      role="button"
      :aria-haspopup="'listbox'"
      :aria-expanded="isOpen"
      :aria-controls="`dropdown-menu-${id}`"
      :tabindex="disabled ? -1 : 0"
    >
      <slot name="trigger"></slot>
    </div>
    
    <!-- Split Button Mode -->
    <div v-else class="dropdown_trigger_split">
      <div
        class="dropdown_trigger_split_main"
        @click="handleSplitMainClick"
      >
        <slot name="trigger"></slot>
      </div>
      <div
        class="dropdown_trigger_split_arrow"
        ref="triggerRef"
        @click="handleTriggerClick"
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
        @keydown.enter="handleTriggerClick"
        @keydown.space="handleTriggerClick"
        @keydown.esc="closeDropdown"
        role="button"
        :aria-haspopup="'listbox'"
        :aria-expanded="isOpen"
        :aria-controls="`dropdown-menu-${id}`"
        :tabindex="disabled ? -1 : 0"
      >
        <FIcon :icon="('chevron-down' as any)" />
      </div>
    </div>
    
    <!-- 下拉菜单 -->
    <Teleport v-if="teleported && isOpen" to="body">
      <FDropdownMenu
        :id="`dropdown-menu-${id}`"
        :placement="placement"
        :max-height="maxHeight"
        :popper-class="popperClass"
        :menu-width="menuWidth"
        ref="menuRef"
        @close="closeDropdown"
      >
        <slot></slot>
      </FDropdownMenu>
    </Teleport>
    <FDropdownMenu
      v-else-if="isOpen"
      :id="`dropdown-menu-${id}`"
      :placement="placement"
      :max-height="maxHeight"
      :popper-class="popperClass"
      :menu-width="menuWidth"
      ref="menuRef"
      @close="closeDropdown"
    >
      <slot></slot>
    </FDropdownMenu>
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

import { ref, onMounted, onUnmounted, watch, provide, Teleport } from 'vue'
import FIcon from '@/FIcon'
import FDropdownMenu from './DropdownMenu.vue'

const props = withDefaults(defineProps<{
  /** 下拉菜单位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** 是否默认展开 */
  defaultOpen?: boolean
  /** 是否可点击外部关闭 */
  clickOutside?: boolean
  /** 下拉菜单宽度 */
  menuWidth?: string
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'contextmenu'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否为分割按钮模式 */
  splitButton?: boolean
  /** 点击菜单项后是否隐藏菜单 */
  hideOnClick?: boolean
  /** 展示延迟 (ms) */
  showTimeout?: number
  /** 隐藏延迟 (ms) */
  hideTimeout?: number
  /** 按钮类型 (splitButton模式) */
  type?: string
  /** 按钮尺寸 (splitButton模式) */
  size?: string
  /** 菜单最大高度 */
  maxHeight?: number
  /** 自定义弹出层类名 */
  popperClass?: string
  /** 是否通过Teleport插入到body */
  teleported?: boolean
}>(), {
  placement: 'bottom',
  clickOutside: true,
  trigger: 'hover',
  disabled: false,
  splitButton: false,
  hideOnClick: true,
  showTimeout: 150,
  hideTimeout: 150,
  teleported: false
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'command', command: string | number): void
  (e: 'visible-change', visible: boolean): void
}>()

// 组件引用
const dropdownRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const menuRef = ref<InstanceType<typeof FDropdownMenu>>()

// 状态管理
const isOpen = ref(props.defaultOpen || false)
const id = Math.random().toString(36).slice(2, 11)
let showTimer: number | null = null
let hideTimer: number | null = null

// Provide command handler to children
const handleCommand = (command: string | number) => {
  emit('command', command)
  if (props.hideOnClick) {
    closeDropdown()
  }
}

provide('dropdownContext', {
  handleCommand
})

// 切换下拉菜单状态
const toggleDropdown = () => {
  if (props.disabled) return
  if (props.trigger !== 'click') return
  
  isOpen.value = !isOpen.value
  updateVisible()
}

const handleTriggerClick = () => {
  if (props.disabled) return
  if (props.trigger === 'click') {
    toggleDropdown()
  }
}

const handleSplitMainClick = () => {
  // In split button mode, main button doesn't toggle dropdown
  // This can be customized via slot
}

const handleTriggerEnter = () => {
  if (props.disabled) return
  if (props.trigger === 'hover') {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    if (showTimer) {
      clearTimeout(showTimer)
    }
    showTimer = window.setTimeout(() => {
      if (!isOpen.value) {
        isOpen.value = true
        updateVisible()
      }
    }, props.showTimeout)
  }
}

const handleTriggerLeave = () => {
  if (props.disabled) return
  if (props.trigger === 'hover') {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    if (hideTimer) {
      clearTimeout(hideTimer)
    }
    hideTimer = window.setTimeout(() => {
      if (isOpen.value) {
        isOpen.value = false
        updateVisible()
      }
    }, props.hideTimeout)
  }
}

const handleContextMenu = (e: MouseEvent) => {
  if (props.disabled) return
  if (props.trigger === 'contextmenu') {
    e.preventDefault()
    if (!isOpen.value) {
      isOpen.value = true
      updateVisible()
    }
  }
}

// 打开下拉菜单
const openDropdown = () => {
  if (props.disabled) return
  if (!isOpen.value) {
    isOpen.value = true
    updateVisible()
  }
}

// 关闭下拉菜单
const closeDropdown = () => {
  if (isOpen.value) {
    isOpen.value = false
    updateVisible()
  }
}

const updateVisible = () => {
  emit('update:open', isOpen.value)
  emit('visible-change', isOpen.value)
  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

// 处理键盘导航
const handleKeyDown = (direction: 'up' | 'down') => {
  if (!menuRef.value) return
  
  const el = menuRef.value?.$el as HTMLElement | undefined
  if (!el) return
  const options = Array.from(el.querySelectorAll('[role="option"]'))
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
    !dropdownRef.value.contains(event.target as Node) &&
    menuRef.value &&
    !menuRef.value.$el?.contains(event.target as Node)
  ) {
    closeDropdown()
  }
}

// 监听点击外部事件
onMounted(() => {
  if (props.trigger === 'click' || props.clickOutside) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
})

// 监听isOpen状态变化
watch(() => props.defaultOpen, (newVal) => {
  isOpen.value = newVal
})

watch(isOpen, (newValue) => {
  updateVisible()
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>