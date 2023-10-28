<template>
  <i :class="iocnName" :style="isSize ? iconSizeStyle : null" v-bind="$attrs"> </i>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { allIconObj } from '../../utils/ficon'
import { computeIconSize } from '../../utils/fsize'
import type { allIconType } from '../../utils/ficon'
import type { IconSize } from '../../utils/fsize'


defineOptions({ name: 'FIcon', inheritAttrs: false, })

const props = defineProps<{
  icon?: allIconType,
  size?: IconSize
}>()

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