<template>
  <div 
    class="tabs_wrapper" 
    :class="[
      `tabs_wrapper--${tabPosition}`,
      `tabs_wrapper--${type}`,
      { 'tabs_wrapper--stretch': stretch }
    ]"
    role="tablist" 
    :aria-label="ariaLabel"
  >
    <div 
      class="tabs_nav"
      :class="{ 
        'tabs_nav_scrollable': scrollable,
        [`tabs_nav--${tabPosition}`]: true
      }"
    >
      <div class="tabs_nav_list" :class="{ 'tabs_nav_list--stretch': stretch }">
        <button
          v-for="(tab, index) in tabList"
          :key="tab.name || tab.key || index"
          class="tabs_nav_item"
          :class="{
            'tabs_nav_item_active': isActive(tab, index),
            'tabs_nav_item--disabled': tab.disabled
          }"
          role="tab"
          :aria-selected="isActive(tab, index)"
          :aria-controls="`tabpanel-${tab.name || tab.key || index}`"
          :id="`tab-${tab.name || tab.key || index}`"
          :disabled="tab.disabled"
          @click="handleTabClick(tab, index)"
          @keydown.enter="handleTabClick(tab, index)"
          @keydown.space="handleTabClick(tab, index)"
          @keydown.left="handleKeyDown(index, 'left')"
          @keydown.right="handleKeyDown(index, 'right')"
        >
          {{ tab.label }}
          <FIcon 
            v-if="closable && (tab.closable !== false)" 
            :icon="('close' as any)" 
            class="tabs_nav_item_close"
            @click.stop="handleTabRemove(tab, index)"
          />
        </button>
        <button
          v-if="addable"
          class="tabs_nav_item tabs_nav_item--add"
          @click="handleTabAdd"
        >
          <FIcon :icon="('plus' as any)" />
        </button>
      </div>
    </div>
    
    <div class="tabs_content" :class="`tabs_content--${tabPosition}`">
      <slot></slot>
      <template v-if="props.tabs && props.tabs.length > 0 && !slots.default">
        <div
          v-for="(tab, index) in props.tabs"
          :key="tab.key || index"
          class="tabs_panel"
          :class="{
            'tabs_panel_active': isActive(tab, index)
          }"
          role="tabpanel"
          :aria-labelledby="`tab-${tab.key || index}`"
          :id="`tabpanel-${tab.key || index}`"
          :aria-hidden="!isActive(tab, index)"
        >
          <slot :name="tab.name"></slot>
        </div>
      </template>
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

import { computed, provide, ref, useSlots, watch, type Slots } from 'vue'
import FIcon from '@/FIcon'

export interface TabItem {
  key?: string | number
  label: string
  name: string
  disabled?: boolean
  closable?: boolean
}

const props = withDefaults(defineProps<{
  /**
   * 标签页数据
   * @default []
   * @example [{ key: '1', label: '标签1', name: 'tab1' }]
   */
  tabs?: TabItem[]
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
  /**
   * 标签页类型
   * @default 'default'
   */
  type?: 'default' | 'card' | 'border-card'
  /**
   * 标签是否可关闭
   * @default false
   */
  closable?: boolean
  /**
   * 标签是否可增加
   * @default false
   */
  addable?: boolean
  /**
   * 标签是否可编辑
   * @default false
   */
  editable?: boolean
  /**
   * 标签宽度是否自适应
   * @default false
   */
  stretch?: boolean
  /**
   * 标签位置
   * @default 'top'
   */
  tabPosition?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * 切换标签前的钩子
   */
  beforeLeave?: (newName: string | number, oldName: string | number) => boolean | Promise<boolean>
}>(), {
  tabs: () => [],
  scrollable: false,
  ariaLabel: '标签页',
  type: 'default',
  closable: false,
  addable: false,
  editable: false,
  stretch: false,
  tabPosition: 'top'
})

const emit = defineEmits<{
  (e: 'update:activeKey', value: string | number | undefined): void
  (e: 'tabClick', value: string | number): void
  (e: 'tab-add'): void
  (e: 'tab-remove', name: string | number): void
  (e: 'tab-change', name: string | number): void
}>()

const slots: Slots = useSlots()
const paneList = ref<Array<{ name: string | number; label: string; disabled?: boolean; closable?: boolean; lazy?: boolean }>>([])

// Collect panes from slots
const updatePaneList = () => {
  if (slots.default) {
    const panes: typeof paneList.value = []
    const children = slots.default()
    children.forEach((child: any) => {
      if (child.type && (child.type.name === 'FTabPane' || child.type.__name === 'FTabPane')) {
        const props = child.props || {}
        panes.push({
          name: props.name || panes.length,
          label: props.label || '',
          disabled: props.disabled,
          closable: props.closable,
          lazy: props.lazy
        })
      }
    })
    paneList.value = panes
  }
}

// Use tabs prop if provided, otherwise use paneList from slots
const tabList = computed(() => {
  if (props.tabs && props.tabs.length > 0) {
    return props.tabs
  }
  return paneList.value.map((pane, index) => ({
    key: pane.name,
    label: pane.label,
    name: String(pane.name),
    disabled: pane.disabled,
    closable: pane.closable
  }))
})

const activeKey = computed({
  get: () => props.activeKey,
  set: (val) => emit('update:activeKey', val)
})

const isActive = (tab: TabItem | { name: string | number }, index: number) => {
  const tabKey = 'key' in tab ? tab.key : tab.name
  return activeKey.value === tabKey || (activeKey.value === undefined && index === 0)
}

const handleTabClick = async (tab: TabItem | { name: string | number }, index: number) => {
  if ('disabled' in tab && tab.disabled) return
  
  const tabKey = 'key' in tab ? tab.key : tab.name
  const tabName = 'name' in tab ? tab.name : String(tabKey)
  
  if (props.beforeLeave) {
    const oldName = activeKey.value ?? (tabList.value[0]?.key ?? tabList.value[0]?.name ?? 0)
    const result = await props.beforeLeave(tabName, oldName)
    if (!result) return
  }
  
  emit('update:activeKey', tabKey ?? tabName)
  emit('tabClick', tabKey ?? tabName)
  emit('tab-change', tabKey ?? tabName)
}

const handleTabRemove = (tab: TabItem | { name: string | number }, index: number) => {
  const tabKey = 'key' in tab ? tab.key : tab.name
  const tabName = 'name' in tab ? tab.name : String(tabKey)
  emit('tab-remove', tabKey ?? tabName)
}

const handleTabAdd = () => {
  emit('tab-add')
}

const handleKeyDown = (currentIndex: number, direction: 'left' | 'right') => {
  const nextIndex = direction === 'left' 
    ? (currentIndex - 1 + tabList.value.length) % tabList.value.length
    : (currentIndex + 1) % tabList.value.length
  
  const nextTab = tabList.value[nextIndex]
  const nextKey = nextTab.key ?? nextTab.name ?? nextIndex
  handleTabClick(nextTab, nextIndex)
}

// Provide context for TabPane
provide('tabsContext', {
  activeKey,
  updatePaneList
})

// Update pane list when component mounts or slots change
updatePaneList()

// Watch for slot changes
watch(() => slots.default?.(), () => {
  updatePaneList()
}, { deep: true })
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>