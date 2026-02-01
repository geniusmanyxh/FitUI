<template>
  <div class="f-menu" :class="menuClass">
    <template v-for="item in items" :key="item.key">
      <div
        v-if="!item.children"
        class="f-menu__item"
        :class="getItemClass(item)"
        @click="handleSelect(item)"
      >
        <FIcon v-if="item.icon" :icon="item.icon" class="f-menu__icon" />
        <span class="f-menu__label">{{ item.label }}</span>
      </div>
      <div v-else class="f-menu__submenu">
        <div
          class="f-menu__item f-menu__submenu-title"
          :class="getItemClass(item)"
          @click="handleSubmenuClick(item)"
        >
          <FIcon v-if="item.icon" :icon="item.icon" class="f-menu__icon" />
          <span class="f-menu__label">{{ item.label }}</span>
          <FIcon icon="chevron-right" class="f-menu__arrow" />
        </div>
        <Transition name="f-menu">
          <div v-show="openedKeys.includes(item.key)" class="f-menu__submenu-content">
            <div
              v-for="child in item.children"
              :key="child.key"
              class="f-menu__item"
              :class="getItemClass(child)"
              @click="handleSelect(child)"
            >
              <FIcon v-if="child.icon" :icon="child.icon" class="f-menu__icon" />
              <span class="f-menu__label">{{ child.label }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MenuProps, MenuEmits, MenuItem } from './Menu'
import type { MenuModeType, MenuThemeType } from './Menu'
import FIcon from '@/FIcon'

defineOptions({ name: 'FMenu', inheritAttrs: false })

const props = withDefaults(defineProps<MenuProps>(), {
  mode: 'vertical',
  theme: 'light',
  defaultActive: '',
  collapse: false,
  items: () => []
})

const emit = defineEmits<MenuEmits>()

const activeKey = ref(props.defaultActive)
const openedKeys = ref<string[]>([])

const menuClass = computed(() => {
  return [
    `f-menu--${props.mode}`,
    `f-menu--${props.theme}`,
    {
      'f-menu--collapse': props.collapse
    }
  ]
})

function getItemClass(item: MenuItem) {
  return {
    'f-menu__item--active': activeKey.value === item.key,
    'f-menu__item--disabled': item.disabled
  }
}

function handleSelect(item: MenuItem) {
  if (item.disabled) return
  activeKey.value = item.key
  emit('select', item.key, item)
}

function handleSubmenuClick(item: MenuItem) {
  if (item.disabled) return
  
  const index = openedKeys.value.indexOf(item.key)
  if (index > -1) {
    openedKeys.value.splice(index, 1)
    emit('close', item.key, item)
  } else {
    openedKeys.value.push(item.key)
    emit('open', item.key, item)
  }
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
