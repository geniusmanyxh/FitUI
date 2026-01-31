<template>
  <button :class="btnClassArr" v-bind="$attrs">
    <div v-if="icon" class="flex justify-center items-center">
      <slot name="icon"><f-icon :icon="curBtnIcon" :class="btnIconClassArr"></f-icon></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
/**
 * FButton 按钮组件
 *
 * @description 支持多种类型、尺寸和状态的按钮组件
 * @example
 * ```vue
 * <FButton type="primary" size="large">主要按钮</FButton>
 * <FButton type="success" plain>朴素按钮</FButton>
 * <FButton type="danger" round icon="delete">删除</FButton>
 * ```
 */
import { computed } from 'vue'
import { type SizeType, btnSizeClass } from '@utils/fsize'
import { type ButtonType, btnClass } from './Button'
import FIcon from '@/FIcon'
import { type allIconType } from '@utils/ficon'

defineOptions({ name: 'FButton', inheritAttrs: false })

/**
 * 按钮组件属性
 */
export interface ButtonProps {
  /**
   * 按钮类型
   * @default 'default'
   * @example 'primary' | 'success' | 'info' | 'warning' | 'danger'
   */
  type?: ButtonType

  /**
   * 是否为朴素按钮
   * @default false
   */
  plain?: boolean

  /**
   * 是否为圆角按钮
   * @default false
   */
  round?: boolean

  /**
   * 按钮尺寸
   * @default 'medium'
   * @example 'small' | 'medium' | 'large'
   */
  size?: SizeType

  /**
   * 图标名称
   * @example 'search' | 'delete' | 'edit'
   */
  icon?: allIconType
}

const props = defineProps<ButtonProps>()

const btnClassArr = computed(() => {
  const type = props.type ?? 'default'
  const size = props.size ?? 'medium'
  const typeClass = props.plain ? `${btnClass[type]}_plain` : btnClass[type]
  const sizeClass = btnSizeClass[size]
  const classes: string[] = [typeClass, sizeClass]
  if (props.round) {
    classes.push('button_round')
  }
  return classes
})

const curBtnIcon = computed<allIconType>(() => props.icon ?? 'github')

const iconColorMap: Record<ButtonType, string> = {
  default: 'gray',
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  info: 'gray',
}

const btnIconClassArr = computed(() => {
  const type = props.type ?? 'default'
  const size = props.size ?? 'medium'
  const arr: string[] = ['btn_icon', size]
  if (props.plain && type !== 'default') {
    arr.push(`text-${iconColorMap[type]}-500`)
  }
  return arr
})
</script>

<style scoped lang="scss">
@use './style/button' as *;
</style>
