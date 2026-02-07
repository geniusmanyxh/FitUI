<template>
  <div 
    class="f-menu" 
    :class="menuClass"
    :style="menuStyle"
  >
    <template v-for="item in items" :key="item.key">
      <div
        v-if="!item.children"
        class="f-menu__item"
        :class="getItemClass(item)"
        :style="getItemStyle(item)"
        @click="handleSelect(item)"
      >
        <FIcon v-if="item.icon" :icon="item.icon" class="f-menu__icon" />
        <span class="f-menu__label" :class="{ 'f-menu__label--ellipsis': ellipsis }">{{ item.label }}</span>
      </div>
      <div v-else class="f-menu__submenu">
        <div
          class="f-menu__item f-menu__submenu-title"
          :class="getItemClass(item)"
          :style="getItemStyle(item)"
          @click="handleSubmenuClick(item)"
          @mouseenter="handleSubmenuHover(item)"
          @mouseleave="handleSubmenuLeave(item)"
        >
          <FIcon v-if="item.icon" :icon="item.icon" class="f-menu__icon" />
          <span class="f-menu__label" :class="{ 'f-menu__label--ellipsis': ellipsis }">{{ item.label }}</span>
          <FIcon icon="chevron-right" class="f-menu__arrow" />
        </div>
        <Transition :name="collapseTransition ? 'f-menu' : ''">
          <div v-show="openedKeys.includes(item.key)" class="f-menu__submenu-content">
            <div
              v-for="child in item.children"
              :key="child.key"
              class="f-menu__item"
              :class="getItemClass(child)"
              :style="getItemStyle(child)"
              @click="handleSelect(child)"
            >
              <FIcon v-if="child.icon" :icon="child.icon" class="f-menu__icon" />
              <span class="f-menu__label" :class="{ 'f-menu__label--ellipsis': ellipsis }">{{ child.label }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { MenuProps, MenuEmits, MenuItem } from './Menu'
import type { MenuModeType, MenuThemeType } from './Menu'
import FIcon from '@/FIcon'

defineOptions({ name: 'FMenu', inheritAttrs: false })

const props = withDefaults(defineProps<MenuProps>(), {
  mode: 'vertical',
  theme: 'light',
  defaultActive: '',
  collapse: false,
  items: () => [],
  router: false,
  defaultOpeneds: () => [],
  uniqueOpened: false,
  menuTrigger: 'click',
  backgroundColor: undefined,
  textColor: undefined,
  activeTextColor: undefined,
  collapseTransition: true,
  ellipsis: false
})

const emit = defineEmits<MenuEmits>()

// Try to use router conditionally - check at runtime
let routerInstance: any = null
const getRouter = () => {
  if (routerInstance) return routerInstance
  try {
    // @ts-ignore - vue-router may not be available
    const vueRouter = require('vue-router')
    if (vueRouter && vueRouter.useRouter) {
      routerInstance = vueRouter.useRouter()
      return routerInstance
    }
  } catch {
    // Router not available
  }
  return null
}

const activeKey = ref(props.defaultActive)
const openedKeys = ref<string[]>([...props.defaultOpeneds])
let hoverTimeout: number | null = null

// Initialize opened keys from defaultOpeneds
watch(() => props.defaultOpeneds, (newVal) => {
  openedKeys.value = [...newVal]
}, { immediate: true })

const menuClass = computed(() => {
  return [
    `f-menu--${props.mode}`,
    `f-menu--${props.theme}`,
    {
      'f-menu--collapse': props.collapse
    }
  ]
})

const menuStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.backgroundColor) {
    style['--menu-bg-color'] = props.backgroundColor
  }
  if (props.textColor) {
    style['--menu-text-color'] = props.textColor
  }
  if (props.activeTextColor) {
    style['--menu-active-text-color'] = props.activeTextColor
  }
  return style
})

function getItemClass(item: MenuItem) {
  return {
    'f-menu__item--active': activeKey.value === item.key,
    'f-menu__item--disabled': item.disabled
  }
}

function getItemStyle(item: MenuItem) {
  const style: Record<string, string> = {}
  if (activeKey.value === item.key && props.activeTextColor) {
    style.color = props.activeTextColor
  } else if (props.textColor) {
    style.color = props.textColor
  }
  return style
}

function handleSelect(item: MenuItem) {
  if (item.disabled) return
  
  activeKey.value = item.key
  emit('select', item.key, item)
  
  // Router mode navigation
  if (props.router && item.key) {
    const routerInstance = getRouter()
    if (routerInstance) {
      routerInstance.push(item.key)
    }
  }
}

function handleSubmenuClick(item: MenuItem) {
  if (item.disabled) return
  if (props.mode === 'horizontal' && props.menuTrigger === 'hover') return
  
  toggleSubmenu(item)
}

function handleSubmenuHover(item: MenuItem) {
  if (props.mode === 'horizontal' && props.menuTrigger === 'hover') {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    hoverTimeout = window.setTimeout(() => {
      if (!openedKeys.value.includes(item.key)) {
        toggleSubmenu(item)
      }
    }, 0)
  }
}

function handleSubmenuLeave(item: MenuItem) {
  if (props.mode === 'horizontal' && props.menuTrigger === 'hover') {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    hoverTimeout = window.setTimeout(() => {
      const index = openedKeys.value.indexOf(item.key)
      if (index > -1) {
        openedKeys.value.splice(index, 1)
        emit('close', item.key, item)
      }
    }, 300)
  }
}

function toggleSubmenu(item: MenuItem) {
  const index = openedKeys.value.indexOf(item.key)
  
  if (index > -1) {
    openedKeys.value.splice(index, 1)
    emit('close', item.key, item)
  } else {
    // If uniqueOpened is true, close all other submenus
    if (props.uniqueOpened) {
      const previousOpened = [...openedKeys.value]
      openedKeys.value = []
      previousOpened.forEach(key => {
        const prevItem = findItemByKey(key)
        if (prevItem) {
          emit('close', key, prevItem)
        }
      })
    }
    
    openedKeys.value.push(item.key)
    emit('open', item.key, item)
  }
}

function findItemByKey(key: string): MenuItem | null {
  for (const item of props.items) {
    if (item.key === key) return item
    if (item.children) {
      for (const child of item.children) {
        if (child.key === key) return child
      }
    }
  }
  return null
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
