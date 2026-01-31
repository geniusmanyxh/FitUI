<template>
  <input
    :id="inputId"
    ref="inputRef"
    v-bind="mergedAttrs"
    :value="model"
    :type="type"
    :disabled="disabled"
    :placeholder="placeholder"
    :aria-invalid="invalid"
    :aria-required="required"
    :aria-describedby="describedby"
    :class="inputClass"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
/**
 * FInput 输入框组件
 *
 * @description 支持文本/密码/数字的输入框，与 Button 搭配做表单；支持设计 token、无障碍
 * @example
 * ```vue
 * <FInput v-model="value" placeholder="请输入" />
 * <FInput v-model="pwd" type="password" size="small" />
 * <label :for="id">用户名</label><FInput :id="id" v-model="name" />
 * ```
 */
import { computed, getCurrentInstance, ref, useAttrs } from 'vue'
import type { SizeType } from '@utils/fsize'

defineOptions({ name: 'FInput', inheritAttrs: false })

export interface InputProps {
  /**
   * 输入类型
   * @default 'text'
   */
  type?: 'text' | 'password' | 'number'

  /**
   * 尺寸
   * @default 'medium'
   */
  size?: SizeType

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 占位文案
   */
  placeholder?: string

  /**
   * 是否必填（用于 aria-required）
   * @default false
   */
  required?: boolean

  /**
   * 是否校验失败（用于 aria-invalid）
   * @default false
   */
  invalid?: boolean

  /**
   * 关联的说明内容 id（aria-describedby）
   */
  describedby?: string

  /**
   * 与 label 关联的 id，便于无障碍
   */
  id?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'medium',
  disabled: false,
  placeholder: '',
  required: false,
  invalid: false,
  describedby: undefined,
  id: undefined,
})

const model = defineModel<string>({ default: '' })

const attrs = useAttrs()
const mergedAttrs = computed(() => {
  const { id: _id, class: _class, ...rest } = attrs as Record<string, unknown>
  return rest
})

const instance = getCurrentInstance()
const inputId = computed(
  () => props.id ?? `f-input-${instance?.uid ?? Math.random().toString(36).slice(2)}`
)

const inputRef = ref<HTMLInputElement | null>(null)

const inputClass = computed(() => [
  'f-input',
  `f-input--${props.size}`,
  props.disabled && 'f-input--disabled',
  props.invalid && 'f-input--invalid',
])

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  model.value = target.value ?? ''
}

defineExpose({
  inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
