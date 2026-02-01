<template>
  <div class="f-textarea" :class="textareaClass">
    <textarea
      :id="textareaId"
      ref="textareaRef"
      v-model="innerValue"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      :aria-label="label"
      :aria-disabled="disabled"
      :aria-readonly="readonly"
      :aria-invalid="invalid"
      :aria-describedby="describedby"
      :autofocus="autofocus"
      :form="form"
      class="f-textarea__inner"
      :style="textareaStyle"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></textarea>
    <span v-if="showWordLimit && maxlength" class="f-textarea__count">
      {{ textLength }}/{{ maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue'
import type { TextareaProps } from './Textarea'
import type { TextareaSizeType } from './Textarea'

defineOptions({ name: 'FTextarea', inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  placeholder: '',
  disabled: false,
  readonly: false,
  showWordLimit: false,
  resize: 'none',
  autosize: false,
  size: 'medium',
  rows: 2,
  name: '',
  label: '',
  id: undefined,
  autofocus: false,
  form: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const textareaRef = ref<HTMLTextAreaElement>()
const innerValue = ref(props.modelValue || '')
const textareaHeight = ref('')

const instance = getCurrentInstance()
const textareaId = computed(
  () => props.id ?? `f-textarea-${instance?.uid ?? Math.random().toString(36).slice(2)}`
)

const describedby = computed(() => {
  return props.showWordLimit && props.maxlength ? `${textareaId.value}-count` : undefined
})

const textLength = computed(() => innerValue.value.length)

const invalid = computed(() => {
  if (props.minlength !== undefined && innerValue.value.length < props.minlength) {
    return true
  }
  if (props.maxlength !== undefined && innerValue.value.length > props.maxlength) {
    return true
  }
  return false
})

const textareaClass = computed(() => {
  return [
    `f-textarea--${props.size}`,
    {
      'f-textarea--disabled': props.disabled,
      'f-textarea--readonly': props.readonly,
      'f-textarea--autosize': props.autosize,
      'f-textarea--invalid': invalid.value
    }
  ]
})

const textareaStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.autosize) {
    style.height = textareaHeight.value
    style.overflow = 'hidden'
  } else {
    style.resize = props.resize
  }
  
  return style
})

function adjustHeight() {
  if (!props.autosize || !textareaRef.value) return
  
  const textarea = textareaRef.value
  const minRows = typeof props.autosize === 'object' ? props.autosize.minRows : props.rows
  const maxRows = typeof props.autosize === 'object' ? props.autosize.maxRows : undefined
  
  textarea.style.height = 'auto'
  
  let height = textarea.scrollHeight
  
  if (minRows) {
    const singleLineHeight = parseFloat(getComputedStyle(textarea).lineHeight)
    const minHeight = singleLineHeight * minRows
    height = Math.max(height, minHeight)
  }
  
  if (maxRows) {
    const singleLineHeight = parseFloat(getComputedStyle(textarea).lineHeight)
    const maxHeight = singleLineHeight * maxRows
    height = Math.min(height, maxHeight)
    textarea.style.overflowY = height >= maxHeight ? 'auto' : 'hidden'
  }
  
  textareaHeight.value = `${height}px`
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  innerValue.value = target.value
  emit('update:modelValue', target.value)
  
  if (props.autosize) {
    nextTick(() => {
      adjustHeight()
    })
  }
}

function handleChange(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('change', target.value)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== innerValue.value) {
    innerValue.value = newVal || ''
  }
})

watch(() => innerValue.value, () => {
  if (props.autosize) {
    nextTick(() => {
      adjustHeight()
    })
  }
})

onMounted(() => {
  if (props.autosize) {
    nextTick(() => {
      adjustHeight()
    })
  }
})

defineExpose({
  textareaRef,
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select(),
  resizeTextarea: adjustHeight
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
