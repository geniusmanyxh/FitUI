<template>
  <div
    class="f-dropdown-item"
    :class="{
      'f-dropdown-item--disabled': disabled,
      'f-dropdown-item--divided': divided
    }"
    role="option"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <FIcon v-if="icon" :icon="icon" class="f-dropdown-item__icon" />
    <span class="f-dropdown-item__content">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import FIcon from '@/FIcon'

defineOptions({ name: 'FDropdownItem', inheritAttrs: false })

const props = withDefaults(defineProps<{
  /**
   * 命令，用于区分不同的菜单项
   */
  command?: string | number
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 是否显示分割线
   * @default false
   */
  divided?: boolean
  /**
   * 图标
   */
  icon?: any
}>(), {
  disabled: false,
  divided: false
})

const dropdownContext = inject<{
  handleCommand: (command: string | number) => void
}>('dropdownContext')

const handleClick = () => {
  if (props.disabled) return
  if (dropdownContext && props.command !== undefined) {
    dropdownContext.handleCommand(props.command)
  }
}
</script>

<style scoped lang="scss">
.f-dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover:not(&--disabled) {
    background-color: var(--fit-hover-bg-color, #f5f7fa);
  }
  
  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &--divided {
    border-top: 1px solid var(--fit-border-color, #e4e7ed);
    margin-top: 4px;
    padding-top: 8px;
  }
  
  &__icon {
    margin-right: 8px;
  }
  
  &__content {
    flex: 1;
  }
}
</style>
