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
import { reactive, ref, watch } from 'vue'
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

let iocnName = ref<string>('')
const isSize = ref(false)
const updateIcon = (key: allIconType) => {
  if (key) {
    iocnName.value = allIconObj[key]
    // console.log(key, iocnName.value)
  }
}

const iconSizeStyle = reactive({
  fontSize:computeIconSize()
})

watch(
  [() => props.icon,
  () => props.size],
  (res) => {
  //  console.log(res)
    if (res[0]) {
      updateIcon(res[0])
    }

    if(res[1]){
      iconSizeStyle.fontSize = computeIconSize(res[1])
      isSize.value = true
    } else {
      isSize.value = false
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>

<style scoped></style>