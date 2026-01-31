<template>
  <i :class="iocnName" :style="isSize ? iconSizeStyle : null" v-bind="$attrs"> </i>
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
 * ```
 */
import { computed } from 'vue'
import { allIconObj } from '@utils/ficon'
import { computeIconSize } from '@utils/fsize'
import type { allIconType } from '@utils/ficon'
import type { IconSize } from '@utils/fsize'


defineOptions({ name: 'FIcon', inheritAttrs: false, })

/**
 * 图标组件属性
 */
export interface IconProps {
  /**
   * 图标名称
   * @example 'github' | 'search' | 'delete' | 'edit'
   */
  icon?: allIconType
  
  /**
   * 图标尺寸
   * @default undefined（使用默认尺寸）
   * @example 'small' | 'medium' | 'large' | 24
   */
  size?: IconSize
}

const props = defineProps<IconProps>()

const iocnName = computed<string>(() =>
  props.icon ? allIconObj[props.icon] : ''
)

const isSize = computed(() => !!props.size)

const iconSizeStyle = computed(() => ({
  fontSize: computeIconSize(props.size)
}))
</script>

<style scoped></style>