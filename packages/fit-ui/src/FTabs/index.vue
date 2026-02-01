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
.tabs_wrapper {
  width: 100%;
}

.tabs_nav {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  overflow: hidden;

  &.tabs_nav_scrollable {
    overflow-x: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.tabs_nav_list {
  display: flex;
  align-items: center;
}

.tabs_nav_item {
  position: relative;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #3b82f6;
  }

  &:focus-visible {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    outline-offset: 2px;
    border-radius: 4px;
  }

  &.tabs_nav_item_active {
    color: #3b82f6;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      height: 2px;
      background-color: #3b82f6;
      border-radius: 2px;
    }
  }
}

.tabs_content {
  padding: 20px 0;
}

.tabs_panel {
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.tabs_panel_active {
    display: block;
    opacity: 1;
  }
}
</style>