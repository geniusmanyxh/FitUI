<template>
  <div class="tabs_wrapper" role="tablist" :aria-label="ariaLabel">
    <div 
      class="tabs_nav"
      :class="{ 'tabs_nav_scrollable': scrollable }"
    >
      <div class="tabs_nav_list">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.key || index"
          class="tabs_nav_item"
          :class="{
            'tabs_nav_item_active': activeKey === tab.key || (activeKey === undefined && index === 0)
          }"
          role="tab"
          :aria-selected="activeKey === tab.key || (activeKey === undefined && index === 0)"
          :aria-controls="`tabpanel-${tab.key || index}`"
          :id="`tab-${tab.key || index}`"
          @click="handleTabClick(tab.key || index)"
          @keydown.enter="handleTabClick(tab.key || index)"
          @keydown.space="handleTabClick(tab.key || index)"
          @keydown.left="handleKeyDown(index, 'left')"
          @keydown.right="handleKeyDown(index, 'right')"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    
    <div class="tabs_content">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.key || index"
        class="tabs_panel"
        :class="{
          'tabs_panel_active': activeKey === tab.key || (activeKey === undefined && index === 0)
        }"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.key || index}`"
        :id="`tabpanel-${tab.key || index}`"
        :aria-hidden="activeKey !== tab.key && (activeKey !== undefined || index !== 0)"
      >
        <slot :name="tab.name"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * FTabs 标签页组件
 *
 * @description 用于内容分类展示，支持自定义标签和内容
 * @example
 * ```vue
 * <FTabs :tabs="[
 *   { key: '1', label: '标签1', name: 'tab1' },
 *   { key: '2', label: '标签2', name: 'tab2' },
 *   { key: '3', label: '标签3', name: 'tab3' }
 * ]" v-model:activeKey="activeTab">
 *   <template #tab1>内容1</template>
 *   <template #tab2>内容2</template>
 *   <template #tab3>内容3</template>
 * </FTabs>
 * ```
 */
defineOptions({ name: 'FTabs', inheritAttrs: false })

import { computed } from 'vue'

const props = defineProps<{
  /**
   * 标签页数据
   * @default []
   * @example [{ key: '1', label: '标签1', name: 'tab1' }]
   */
  tabs: Array<{
    /**
     * 标签唯一标识
     */
    key?: string | number
    /**
     * 标签名称
     */
    label: string
    /**
     * 对应插槽名称
     */
    name: string
  }>
  /**
   * 当前激活的标签键值
   * @default undefined
   */
  activeKey?: string | number
  /**
   * 是否可滚动
   * @default false
   */
  scrollable?: boolean
  /**
   * 无障碍标签
   * @default '标签页'
   */
  ariaLabel?: string
}>()

const emit = defineEmits<{
  /**
   * 激活标签变化时触发
   */
  (e: 'update:activeKey', value: string | number): void
  /**
   * 点击标签时触发
   */
  (e: 'tabClick', value: string | number): void
}>()

const handleTabClick = (key: string | number) => {
  emit('update:activeKey', key)
  emit('tabClick', key)
}

const handleKeyDown = (currentIndex: number, direction: 'left' | 'right') => {
  const nextIndex = direction === 'left' 
    ? (currentIndex - 1 + props.tabs.length) % props.tabs.length
    : (currentIndex + 1) % props.tabs.length
  
  const nextKey = props.tabs[nextIndex].key || nextIndex
  handleTabClick(nextKey)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>