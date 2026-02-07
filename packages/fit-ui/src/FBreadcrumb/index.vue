<template>
  <div class="f-breadcrumb">
    <slot>
      <template v-if="items && items.length > 0">
        <template v-for="(item, index) in items" :key="index">
          <FBreadcrumbItem
            :to="item.to"
            :href="item.href"
            :replace="item.replace"
            :disabled="item.disabled"
            @click="handleClick(item, index)"
          >
            <slot name="item" :item="item" :index="index">
              {{ item.label }}
            </slot>
          </FBreadcrumbItem>
          <span
            v-if="index < items.length - 1"
            class="f-breadcrumb__separator"
          >
            <FIcon v-if="separatorIcon" :icon="(separatorIcon as any)" />
            <span v-else>{{ separator }}</span>
          </span>
        </template>
      </template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type { BreadcrumbProps, BreadcrumbEmits, BreadcrumbItem } from './Breadcrumb'
import FBreadcrumbItem from './BreadcrumbItem.vue'
import FIcon from '@/FIcon'

defineOptions({ name: 'FBreadcrumb', inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
  items: () => []
})

const emit = defineEmits<BreadcrumbEmits>()

// Provide separator and separatorIcon to child BreadcrumbItem components
provide('breadcrumbSeparator', props.separator)
provide('breadcrumbSeparatorIcon', props.separatorIcon)

function handleClick(item: BreadcrumbItem, index: number) {
  if (item.disabled) return
  emit('click', item, index)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
