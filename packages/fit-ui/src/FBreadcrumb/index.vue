<template>
  <div class="f-breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <span
        v-if="index > 0"
        class="f-breadcrumb__separator"
      >
        {{ separator }}
      </span>
      <span
        class="f-breadcrumb__item"
        :class="{ 'f-breadcrumb__item--disabled': item.disabled }"
        @click="handleClick(item, index)"
      >
        <slot name="item" :item="item" :index="index">
          {{ item.label }}
        </slot>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbProps, BreadcrumbEmits, BreadcrumbItem } from './Breadcrumb'

defineOptions({ name: 'FBreadcrumb', inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/'
})

const emit = defineEmits<BreadcrumbEmits>()

function handleClick(item: BreadcrumbItem, index: number) {
  if (item.disabled) return
  emit('click', item, index)
}
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
