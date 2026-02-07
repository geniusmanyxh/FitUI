<template>
  <button
    :class="btnClassArr"
    :type="nativeType"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="f-button__loading">
      <slot name="loading">
        <span class="f-button__loading-icon"></span>
      </slot>
    </span>
    <span v-if="icon && !loading" class="f-button__icon">
      <slot name="icon"><f-icon :icon="curBtnIcon" :class="btnIconClassArr"></f-icon></slot>
    </span>
    <span v-if="$slots.default" class="f-button__text">
      <slot></slot>
    </span>
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
 * <FButton type="primary" loading>加载中</FButton>
 * <FButton type="primary" circle icon="search"></FButton>
 * <FButton type="primary" disabled>禁用</FButton>
 * <FButton type="primary" link>链接按钮</FButton>
 * <FButton type="primary" text>文字按钮</FButton>
 * ```
 */
import { computed } from 'vue'
import { type SizeType, btnSizeClass } from '@utils/fsize'
import { type ButtonType, type NativeType, btnClass } from './Button'
import FIcon from '@/FIcon'
import { type allIconType } from '@utils/ficon'

defineOptions({ name: 'FButton', inheritAttrs: false })

/**
 * 按钮组件属性
 */
export interface ButtonProps {
  /** 按钮类型 */
  type?: ButtonType
  /** 是否为朴素按钮 */
  plain?: boolean
  /** 是否为圆角按钮 */
  round?: boolean
  /** 按钮尺寸 */
  size?: SizeType
  /** 图标名称 */
  icon?: allIconType
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否为圆形按钮 */
  circle?: boolean
  /** 是否为链接按钮 */
  link?: boolean
  /** 是否为文字按钮 */
  text?: boolean
  /** 原生 type 属性 */
  nativeType?: NativeType
  /** 是否自动聚焦 */
  autofocus?: boolean
  /** 自定义颜色 */
  color?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  plain: false,
  round: false,
  size: 'medium',
  disabled: false,
  loading: false,
  circle: false,
  link: false,
  text: false,
  nativeType: 'button',
  autofocus: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

const btnClassArr = computed(() => {
  const typeClass = props.plain ? `${btnClass[props.type]}_plain` : btnClass[props.type]
  const sizeClass = btnSizeClass[props.size]
  const classes: string[] = ['f-button', typeClass, sizeClass]
  if (props.round) classes.push('button_round')
  if (props.circle) classes.push('f-button--circle')
  if (props.disabled) classes.push('is-disabled')
  if (props.loading) classes.push('is-loading')
  if (props.link) classes.push('f-button--link')
  if (props.text) classes.push('f-button--text')
  if (props.color) classes.push('f-button--custom-color')
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
  const arr: string[] = ['btn_icon', props.size]
  if (props.plain && props.type !== 'default') {
    arr.push(`text-${iconColorMap[props.type]}-500`)
  }
  return arr
})
</script>

<style scoped lang="scss">
@use './style/button' as *;
</style>
