<template>
  <div
    v-if="!lazy || isActive"
    v-show="isActive"
    class="tabs_panel"
    :class="{ 'tabs_panel_active': isActive }"
    role="tabpanel"
    :aria-labelledby="`tab-${name}`"
    :id="`tabpanel-${name}`"
    :aria-hidden="!isActive"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'

defineOptions({ name: 'FTabPane', inheritAttrs: false })

const props = withDefaults(defineProps<{
  /**
   * 标签页名称，作为唯一标识
   */
  label: string
  /**
   * 标签页唯一标识，默认使用 label
   */
  name?: string | number
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 是否可关闭
   * @default undefined (继承父组件 closable)
   */
  closable?: boolean
  /**
   * 是否延迟渲染
   * @default false
   */
  lazy?: boolean
}>(), {
  disabled: false,
  lazy: false
})

const tabsContext = inject<{
  activeKey: { value: string | number | undefined }
  updatePaneList: () => void
}>('tabsContext')

const paneName = computed(() => props.name ?? props.label)
const isActive = computed(() => {
  if (!tabsContext) return false
  return tabsContext.activeKey.value === paneName.value
})

onMounted(() => {
  if (tabsContext) {
    tabsContext.updatePaneList()
  }
})
</script>

<style scoped lang="scss">
.tabs_panel {
  display: none;
  
  &.tabs_panel_active {
    display: block;
  }
}
</style>
