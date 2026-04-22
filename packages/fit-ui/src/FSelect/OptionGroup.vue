<template>
  <div class="f-select__group">
    <div class="f-select__group-label">{{ label }}</div>
    <ul class="f-select__group-list" role="group" :aria-label="label">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * FOptionGroup 选项分组组件
 * 
 * @description 用于 FSelect 组件的选项分组，必须配合 FOption 使用
 * @example
 * ```vue
 * <FSelect v-model="value">
 *   <FOptionGroup label="热门城市">
 *     <FOption value="sh" label="上海" />
 *     <FOption value="bj" label="北京" />
 *   </FOptionGroup>
 *   <FOptionGroup label="其他城市">
 *     <FOption value="gz" label="广州" />
 *   </FOptionGroup>
 * </FSelect>
 * ```
 */
import { computed, provide, ref } from 'vue'
import type { OptionGroupProps } from './Select'

defineOptions({ name: 'FOptionGroup', inheritAttrs: false })

const props = withDefaults(defineProps<OptionGroupProps>(), {
  disabled: false,
})

const groupDisabled = computed(() => props.disabled)

provide('FOptionGroupContext', {
  disabled: groupDisabled,
  label: computed(() => props.label),
})
</script>
