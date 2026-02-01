<template>
  <form :class="formClass" @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue'
import type { FormProps, FormContext, FormRule } from './Form'
import { FORM_CONTEXT_KEY } from './Form'

defineOptions({ name: 'FForm', inheritAttrs: false })

const props = withDefaults(defineProps<FormProps>(), {
  labelPosition: 'right',
  labelWidth: 'auto',
  labelSuffix: '',
  inline: false,
  disabled: false,
  size: 'medium',
  validateOnRuleChange: true,
  hideRequiredAsterisk: false,
  showMessage: true,
  inlineMessage: false,
  statusIcon: false
})

const emit = defineEmits<{
  (e: 'validate', isValid: boolean, invalidFields?: Record<string, string[]>): void
  (e: 'validate-field', prop: string, isValid: boolean, message?: string): void
}>()

const fields = ref<Map<string, { prop: string; rules: FormRule[] }>>(new Map())

const formClass = computed(() => {
  return [
    'f-form',
    `f-form--${props.labelPosition}`,
    {
      'f-form--inline': props.inline,
      'f-form--disabled': props.disabled,
      [`f-form--${props.size}`]: props.size
    }
  ]
})

const formContext = computed<FormContext>(() => ({
  model: props.model || {},
  rules: props.rules,
  labelPosition: props.labelPosition,
  labelWidth: props.labelWidth,
  labelSuffix: props.labelSuffix,
  disabled: props.disabled,
  size: props.size,
  validateOnRuleChange: props.validateOnRuleChange,
  hideRequiredAsterisk: props.hideRequiredAsterisk,
  showMessage: props.showMessage,
  inlineMessage: props.inlineMessage,
  statusIcon: props.statusIcon,
  addField: (field: string, prop: string, rules: FormRule[]) => {
    fields.value.set(field, { prop, rules })
  },
  removeField: (field: string) => {
    fields.value.delete(field)
  },
  validateField: async (prop: string, callback?: (error?: string) => void) => {
    const field = fields.value.get(prop)
    if (!field || !props.model) {
      if (callback) callback()
      return true
    }
    
    const value = props.model[field.prop]
    const rules = field.rules || []
    const formRules = props.rules?.[field.prop] || []
    const allRules = [...rules, ...formRules]
    
    for (const rule of allRules) {
      const error = await validateRule(rule, value, field.prop)
      if (error) {
        emit('validate-field', field.prop, false, error)
        if (callback) callback(error)
        return false
      }
    }
    
    emit('validate-field', field.prop, true)
    if (callback) callback()
    return true
  },
  clearValidate: (props?: string | string[]) => {
    if (!props) {
      fields.value.forEach((field) => {
        const element = document.querySelector(`[data-field="${field.prop}"]`) as HTMLElement
        if (element) {
          element.dataset.error = ''
        }
      })
    } else {
      const propList = Array.isArray(props) ? props : [props]
      propList.forEach(prop => {
        const element = document.querySelector(`[data-field="${prop}"]`) as HTMLElement
        if (element) {
          element.dataset.error = ''
        }
      })
    }
  }
}))

provide(FORM_CONTEXT_KEY, formContext)

async function validateRule(rule: FormRule, value: any, prop: string): Promise<string | undefined> {
  if (rule.required && (value === undefined || value === null || value === '')) {
    return rule.message || `${prop} is required`
  }
  
  if (rule.type) {
    const typeMap: Record<string, boolean> = {
      string: typeof value === 'string',
      number: typeof value === 'number',
      boolean: typeof value === 'boolean',
      array: Array.isArray(value),
      object: typeof value === 'object' && value !== null && !Array.isArray(value),
      date: value instanceof Date,
      url: typeof value === 'string' && /^https?:\/\//.test(value),
      email: typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
    
    if (!typeMap[rule.type]) {
      return rule.message || `${prop} must be ${rule.type}`
    }
  }
  
  if (rule.min !== undefined) {
    const length = Array.isArray(value) ? value.length : String(value).length
    if (length < rule.min) {
      return rule.message || `${prop} must be at least ${rule.min}`
    }
  }
  
  if (rule.max !== undefined) {
    const length = Array.isArray(value) ? value.length : String(value).length
    if (length > rule.max) {
      return rule.message || `${prop} must be at most ${rule.max}`
    }
  }
  
  if (rule.len !== undefined) {
    const length = Array.isArray(value) ? value.length : String(value).length
    if (length !== rule.len) {
      return rule.message || `${prop} must be exactly ${rule.len} characters`
    }
  }
  
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return rule.message || `${prop} format is invalid`
  }
  
  if (rule.validator) {
    return new Promise((resolve) => {
      const result = rule.validator!(rule, value, (error?: string) => {
        resolve(error)
      })
      if (result !== undefined) {
        resolve(result === false ? rule.message : undefined)
      }
    })
  }
  
  return undefined
}

async function validate(callback?: (isValid: boolean, invalidFields?: Record<string, string[]>) => void) {
  if (!props.model || fields.value.size === 0) {
    if (callback) callback(true)
    emit('validate', true)
    return true
  }
  
  let isValid = true
  const invalidFields: Record<string, string[]> = {}
  
  for (const [field, { prop, rules }] of fields.value) {
    const value = props.model[prop]
    const formRules = props.rules?.[prop] || []
    const allRules = [...rules, ...formRules]
    
    for (const rule of allRules) {
      const error = await validateRule(rule, value, prop)
      if (error) {
        isValid = false
        if (!invalidFields[prop]) {
          invalidFields[prop] = []
        }
        invalidFields[prop].push(error)
        break
      }
    }
  }
  
  if (callback) callback(isValid, invalidFields)
  emit('validate', isValid, invalidFields)
  return isValid
}

function resetFields() {
  if (!props.model) return
  
  for (const [field, { prop }] of fields.value) {
    props.model[prop] = undefined
    const element = document.querySelector(`[data-field="${prop}"]`) as HTMLElement
    if (element) {
      element.dataset.error = ''
    }
  }
}

function clearValidate(props?: string | string[]) {
  formContext.value.clearValidate(props)
}

watch(() => props.rules, () => {
  if (props.validateOnRuleChange) {
    validate()
  }
}, { deep: true })

defineExpose({
  validate,
  validateField: formContext.value.validateField,
  resetFields,
  clearValidate
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
