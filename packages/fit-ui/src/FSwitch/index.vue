<template>
  <div
    :class="switchClasses"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
    role="switch"
    :aria-checked="isChecked"
    :aria-disabled="disabled || loading"
    :tabindex="tabindex ?? 0"
  >
    <span v-if="inactiveText && !inlinePrompt" class="f-switch__label f-switch__label--left" :class="{ 'is-active': !isChecked }">
      {{ inactiveText }}
    </span>
    <span :class="['f-switch__core', { 'is-checked': isChecked }]" :style="coreStyle">
      <span v-if="inlinePrompt" class="f-switch__inner">
        {{ isChecked ? activeText : inactiveText }}
      </span>
      <span class="f-switch__action">
        <span v-if="loading" class="f-switch__loading-icon"></span>
        <slot v-else-if="isChecked" name="activeAction"></slot>
        <slot v-else name="inactiveAction"></slot>
      </span>
    </span>
    <span v-if="activeText && !inlinePrompt" class="f-switch__label f-switch__label--right" :class="{ 'is-active': isChecked }">
      {{ activeText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

defineOptions({ name: 'FSwitch', inheritAttrs: false })

export interface SwitchProps {
  modelValue?: boolean | string | number
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  width?: number | string
  inlinePrompt?: boolean
  activeIcon?: string
  inactiveIcon?: string
  activeText?: string
  inactiveText?: string
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
  name?: string
  validateEvent?: boolean
  beforeChange?: () => Promise<boolean> | boolean
  tabindex?: number | string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  size: 'medium',
  inlinePrompt: false,
  activeValue: true,
  inactiveValue: false,
  validateEvent: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | string | number]
  change: [value: boolean | string | number]
}>()

const isChecked = computed(() => {
  return props.modelValue === props.activeValue
})

const switchClasses = computed(() => {
  const classes = ['f-switch', `f-switch--${props.size}`]
  if (isChecked.value) classes.push('is-checked')
  if (props.disabled) classes.push('is-disabled')
  if (props.loading) classes.push('is-loading')
  return classes
})

const coreStyle = computed(() => {
  if (props.width) {
    const w = typeof props.width === 'number' ? `${props.width}px` : props.width
    return { width: w }
  }
  return {}
})

const switchLoading = ref(false)

async function handleClick() {
  if (props.disabled || props.loading || switchLoading.value) return

  const newValue = isChecked.value ? props.inactiveValue : props.activeValue

  if (props.beforeChange) {
    switchLoading.value = true
    try {
      const result = await props.beforeChange()
      if (result === false) return
    } catch {
      return
    } finally {
      switchLoading.value = false
    }
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

defineExpose({
  focus: () => {},
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
