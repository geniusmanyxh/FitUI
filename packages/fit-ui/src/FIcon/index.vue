<template>
  <i :class="iconClasses" :style="iconStyle" v-bind="$attrs"> </i>
</template>

<script setup lang="ts">
/**
 * FIcon 图标组件
 *
 * @description 支持多种图标集的图标组件，包括 Logo、Mono、Google Material Icons
 * @example
 * ```vue
 * <FIcon icon="github" size="large" />
 * <FIcon icon="search" size="24" />
 * <FIcon icon="loading" spin />
 * <FIcon icon="check" color="#67c23a" />
 * ```
 */
import { computed } from 'vue'
import { allIconObj } from '@utils/ficon'
import { computeIconSize } from '@utils/fsize'
import type { allIconType } from '@utils/ficon'
import type { IconSize } from '@utils/fsize'

defineOptions({ name: 'FIcon', inheritAttrs: false })

/**
 * 图标组件属性
 */
export interface IconProps {
  /** 图标名称 */
  icon?: allIconType
  /** 图标尺寸 */
  size?: IconSize
  /** 图标颜色 */
  color?: string
  /** 是否旋转动画 */
  spin?: boolean
}

const props = withDefaults(defineProps<IconProps>(), {
  spin: false,
})

const iconClasses = computed(() => {
  const classes: string[] = []
  if (props.icon) classes.push(allIconObj[props.icon])
  if (props.spin) classes.push('f-icon--spin')
  return classes
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.size) style.fontSize = computeIconSize(props.size)
  if (props.color) style.color = props.color
  return style
})
</script>

<style scoped>
.f-icon--spin {
  animation: f-icon-spin 1.5s linear infinite;
}

@keyframes f-icon-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>