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
      <span v-if="labelSuffix" class="f-form-item__suffix">{{ labelSuffix }}</span>
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
  for: ''
})

const formContext = inject<FormContext>(FORM_CONTEXT_KEY)
const fieldValue = ref<any>(undefined)
const errorMessage = ref('')
const showError = ref(false)
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
  return props.labelSuffix || formContext?.labelSuffix
})

const disabled = computed(() => {
  return formContext?.disabled
})

function validate(callback?: (error?: string) => void): Promise<boolean> {
  if (!props.prop || !formContext) {
    if (callback) callback()
    return Promise.resolve(true)
  }
  
  return formContext.validateField(props.prop, (error?: string) => {
    errorMessage.value = error || ''
    showError.value = !!error
    if (callback) callback(error)
  })
}

function clearValidate() {
  errorMessage.value = ''
  showError.value = false
}

function resetField() {
  if (props.prop && formContext?.model) {
    formContext.model[props.prop] = undefined
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
    
    isRequired.value = allRules.some(rule => rule.required)
    
    if (formContext.model && props.prop in formContext.model) {
      fieldValue.value = formContext.model[props.prop]
    }
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
