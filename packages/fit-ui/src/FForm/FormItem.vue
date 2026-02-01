<template>
  <div class="f-form-item" :class="formItemClass" :data-field="prop">
    <label
      v-if="label || $slots.label"
      class="f-form-item__label"
      :style="labelStyle"
      :for="labelFor"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="isRequired && !hideRequiredAsterisk" class="f-form-item__asterisk">*</span>
      <span v-if="labelSuffix !== undefined && labelSuffix !== ''" class="f-form-item__suffix">{{ labelSuffix }}</span>
    </label>
    <div class="f-form-item__content">
      <slot></slot>
      <Transition name="f-form-item">
        <div v-if="showError && errorMessage" class="f-form-item__error" role="alert">
          {{ errorMessage }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import type { FormItemProps, FormContext } from './Form'
import { FORM_CONTEXT_KEY } from './Form'

defineOptions({ name: 'FFormItem', inheritAttrs: false })

const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  labelWidth: '',
  prop: '',
  required: false,
  rules: () => [],
  error: '',
  showMessage: undefined,
  inlineMessage: false,
  size: undefined,
  for: '',
  labelSuffix: undefined
})

const formContext = inject<FormContext>(FORM_CONTEXT_KEY) || inject<FormContext>('formContext')
const fieldValue = ref<any>(undefined)
const errorMessage = ref(props.error)
const showError = ref(!!props.error)
const isRequired = ref(false)

const fieldId = `f-form-item-${Math.random().toString(36).slice(2)}`

const labelFor = computed(() => props.for || fieldId)

const labelStyle = computed(() => {
  const width = props.labelWidth || formContext?.labelWidth
  if (!width || width === 'auto') return {}
  return {
    width: typeof width === 'number' ? `${width}px` : width
  }
})

const formItemClass = computed(() => {
  return [
    `f-form-item--${formContext?.labelPosition || 'right'}`,
    {
      'f-form-item--error': showError.value,
      'f-form-item--required': isRequired.value,
      'f-form-item--inline': formContext?.inline,
      [`f-form-item--${formContext?.size || props.size || 'medium'}`]: true
    }
  ]
})

const showMessage = computed(() => {
  return props.showMessage !== undefined ? props.showMessage : formContext?.showMessage
})

const inlineMessage = computed(() => {
  return props.inlineMessage !== undefined ? props.inlineMessage : formContext?.inlineMessage
})

const hideRequiredAsterisk = computed(() => {
  return formContext?.hideRequiredAsterisk
})

const labelSuffix = computed(() => {
  return props.labelSuffix !== undefined ? props.labelSuffix : formContext?.labelSuffix
})

const disabled = computed(() => {
  return formContext?.disabled
})

async function validate(callback?: (error?: string) => void): Promise<boolean> {
  if (!props.prop) {
    if (callback) callback()
    return true
  }
  
  // 检查规则是否存在
  const allRules = [...props.rules]
  if (formContext?.rules?.[props.prop]) {
    allRules.push(...formContext.rules[props.prop])
  }
  
  // 如果没有规则，直接返回true
  if (allRules.length === 0) {
    if (callback) callback()
    return true
  }
  
  // 如果有formContext且有validateField方法，使用formContext的validateField方法
  if (formContext && formContext.validateField) {
    const isValid = await formContext.validateField(props.prop, (error?: string) => {
      errorMessage.value = error || ''
      showError.value = !!error
      if (callback) callback(error)
    })
    return isValid
  } else {
    // 否则，使用内部验证逻辑
    const value = formContext?.model?.[props.prop]
    let error: string | undefined
    
    for (const rule of allRules) {
      if (rule.required && (value === undefined || value === null || value === '')) {
        error = rule.message || `${props.prop} is required`
        break
      }
    }
    
    errorMessage.value = error || ''
    showError.value = !!error
    if (callback) callback(error)
    return !error
  }
}

function clearValidate() {
  errorMessage.value = ''
  showError.value = false
}

function resetField() {
  if (props.prop && formContext?.model) {
    formContext.model[props.prop] = undefined
    fieldValue.value = undefined
  }
  clearValidate()
}

watch(() => props.error, (newVal) => {
  errorMessage.value = newVal
  showError.value = !!newVal
})

watch(() => fieldValue.value, (newVal) => {
  if (props.prop && formContext?.model) {
    formContext.model[props.prop] = newVal
  }
})

onMounted(() => {
  if (props.prop && formContext) {
    formContext.addField(fieldId, props.prop, props.rules)
    
    const allRules = [...props.rules]
    if (formContext.rules?.[props.prop]) {
      allRules.push(...formContext.rules[props.prop])
    }
    
    // 检查props.required和rules中的required属性
    isRequired.value = props.required || allRules.some(rule => rule.required)
    
    if (formContext.model && props.prop in formContext.model) {
      fieldValue.value = formContext.model[props.prop]
    }
  } else {
    // 如果没有formContext，直接使用props.required
    isRequired.value = props.required
  }
})

onUnmounted(() => {
  if (props.prop && formContext) {
    formContext.removeField(fieldId)
  }
})

defineExpose({
  validate,
  clearValidate,
  resetField,
  fieldValue
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
