<template>
  <span class="f-breadcrumb__item" :class="{ 'f-breadcrumb__item--disabled': disabled }" @click="handleClick">
    <component
      :is="tag"
      v-if="to || href"
      :to="to"
      :href="href"
      :replace="replace"
    >
      <slot></slot>
    </component>
    <span v-else>
      <slot></slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, inject, getCurrentInstance } from 'vue'

defineOptions({ name: 'FBreadcrumbItem', inheritAttrs: false })

const props = withDefaults(defineProps<{
  /** 路由跳转目标，同 vue-router 的 to 属性 */
  to?: string | Record<string, any>
  /** 原生 href 属性 */
  href?: string
  /** 是否使用 replace 方式跳转 */
  replace?: boolean
  /** 是否禁用 */
  disabled?: boolean
}>(), {
  replace: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const separator = inject<string>('breadcrumbSeparator', '/')
const separatorIcon = inject<string | undefined>('breadcrumbSeparatorIcon')

// Safely detect router availability via the Vue app instance
const instance = getCurrentInstance()
const router = instance?.appContext.config.globalProperties.$router

const tag = computed(() => {
  if (props.href) return 'a'
  // Only use router-link if router is actually installed
  if (props.to) return 'a'
  return 'span'
})

const handleClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  
  // Emit click event so parent FBreadcrumb can listen
  emit('click', event)
  
  // If router is available and `to` is set, perform programmatic navigation
  if (props.to && !props.href && router) {
    event.preventDefault()
    if (props.replace) {
      router.replace(props.to!)
    } else {
      router.push(props.to!)
    }
  }
}
</script>

<style scoped lang="scss">
.f-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  
  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: var(--fit-primary-color, #409eff);
    }
  }
}
</style>
