<template>
  <!-- textarea 模式 -->
  <div
    v-if="type === 'textarea'"
    :class="wrapperClass"
  >
    <textarea
      :id="inputId"
      ref="textareaRef"
      v-bind="filteredAttrs"
      class="f-input__textarea"
      :value="model"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      :tabindex="tabindex"
      :autofocus="autofocus"
      :aria-invalid="invalid"
      :aria-required="required"
      :aria-describedby="describedby"
      :style="textareaCalcStyle"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    />
    <span v-if="isWordLimitVisible" class="f-input__count">
      {{ textLength }} / {{ normalizedMaxlength }}
    </span>
  </div>

  <!-- input 模式 -->
  <div
    v-else
    :class="wrapperClass"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- prepend 插槽 -->
    <div v-if="$slots.prepend" class="f-input__prepend">
      <slot name="prepend" />
    </div>

    <div
      :class="[
        'f-input__wrapper',
        isFocused && 'is-focus',
      ]"
      @click="handleWrapperClick"
    >
      <!-- prefix -->
      <span v-if="$slots.prefix || prefixIcon" class="f-input__prefix">
        <span class="f-input__prefix-inner">
          <slot name="prefix">
            <f-icon v-if="prefixIcon" :icon="prefixIcon as any" />
          </slot>
        </span>
      </span>

      <!-- native input -->
      <input
        :id="inputId"
        ref="inputRef"
        v-bind="filteredAttrs"
        class="f-input__inner"
        :value="displayInputValue"
        :type="nativeInputType"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :tabindex="tabindex"
        :autofocus="autofocus"
        :name="name"
        :style="inputStyle"
        :aria-invalid="invalid"
        :aria-required="required"
        :aria-describedby="describedby"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      />

      <!-- suffix -->
      <span v-if="showSuffixArea" class="f-input__suffix">
        <span class="f-input__suffix-inner">
          <!-- 可清空按钮 -->
          <span
            v-if="showClearBtn"
            class="f-input__icon f-input__clear"
            role="button"
            tabindex="-1"
            aria-label="清空"
            @click.stop="handleClear"
            @mousedown.prevent
          >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
            </svg>
          </span>

          <!-- 密码可见切换 -->
          <span
            v-if="showPwdToggle"
            class="f-input__icon f-input__password-toggle"
            role="button"
            tabindex="-1"
            :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
            @click.stop="togglePasswordVisibility"
            @mousedown.prevent
          >
            <!-- 眼睛睁开 -->
            <svg v-if="passwordVisible" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 256c-211.2 0-390.4 121.6-480 307.2 89.6 185.6 268.8 307.2 480 307.2s390.4-121.6 480-307.2C902.4 377.6 723.2 256 512 256zm0 512c-112 0-204.8-92.8-204.8-204.8S400 358.4 512 358.4s204.8 92.8 204.8 204.8S624 768 512 768zm0-332.8c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128-57.6-128-128-128z"/>
            </svg>
            <!-- 眼睛关闭 -->
            <svg v-else viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M942.2 486.2Q889.4 375 816.5 304l-52.6 52.7A553 553 0 01880.4 512 555.3 555.3 0 01540 768c-38.2 0-75.1-5.8-110-16.8L375 806.2A629 629 0 00540 832c264.6 0 488-176 560-320a625.9 625.9 0 00-157.8-25.8zm-85.5-66L787 490l-68-68.5c1-6.4 1-12.8 1-19.5 0-97.2-78.8-176-176-176-6.7 0-13.2.4-19.5 1.2L456 158.6A631 631 0 01540 128c264.6 0 488 176 560 320-31.2 62.4-73 119-123.3 168.2zM163.8 486.2A553 553 0 01540 256c38.2 0 75.1 5.8 110 16.8l55-55A629 629 0 00540 128C275.4 128 51.4 304-20.6 448a625.9 625.9 0 00184.4 38.2zm128 128l68 68.5c-1 6.4-1 12.8-1 19.5 0 97.2 78.8 176 176 176 6.7 0 13.2-.4 19.5-1.2l68.6 68.5A631 631 0 01540 896C275.4 896 51.4 720-20.6 576c31.2-62.4 73-119 123.3-168.2l69.1 69.4v7zM210 614.2l88-88a128 128 0 00180 180l88 88A264.7 264.7 0 01275.2 512c0-23.6 3-46.4 8.8-68.2L210 614.2zm144-248l88 88c13.4-8.8 29.4-14 46-14 48.6 0 88 39.4 88 88 0 16.6-5.2 32.6-14 46l88 88A264.7 264.7 0 00804.8 512c0-143.6-116.4-260-260-260-31.6 0-62 5.8-90.8 16.2z"/>
            </svg>
          </span>

          <!-- 自定义 suffix 插槽 -->
          <slot name="suffix">
            <f-icon v-if="suffixIcon" :icon="suffixIcon as any" />
          </slot>

          <!-- 字数统计 -->
          <span v-if="isWordLimitVisible" class="f-input__count">
            {{ textLength }} / {{ normalizedMaxlength }}
          </span>
        </span>
      </span>
    </div>

    <!-- append 插槽 -->
    <div v-if="$slots.append" class="f-input__append">
      <slot name="append" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * FInput 输入框组件
 *
 * @description 功能丰富的输入框组件，支持文本/密码/数字/textarea 等类型；
 *   支持可清空、密码切换、前后缀插槽、复合输入、字数统计、自适应高度 textarea 等特性；
 *   完整的无障碍和设计 token 支持。
 *
 * @example
 * ```vue
 * <FInput v-model="value" placeholder="请输入" clearable />
 * <FInput v-model="pwd" type="password" show-password />
 * <FInput v-model="text" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" />
 * <FInput v-model="url" placeholder="请输入网址">
 *   <template #prepend>https://</template>
 *   <template #append>.com</template>
 * </FInput>
 * ```
 */
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  useSlots,
  watch,
} from 'vue'
import type { SizeType } from '@utils/fsize'
import type { InputAutoSize, InputType } from './Input'
import FIcon from '@/FIcon'

defineOptions({ name: 'FInput', inheritAttrs: false })

// ==================== Props ====================
const props = withDefaults(
  defineProps<{
    /** 输入类型 */
    type?: InputType
    /** 尺寸 */
    size?: SizeType
    /** 是否禁用 */
    disabled?: boolean
    /** 是否只读 */
    readonly?: boolean
    /** 是否可清空 */
    clearable?: boolean
    /** 是否显示密码切换（仅 type="password"） */
    showPassword?: boolean
    /** 占位文案 */
    placeholder?: string
    /** 最大输入长度 */
    maxlength?: number | string
    /** 最小输入长度 */
    minlength?: number | string
    /** 是否显示字数统计（需配合 maxlength） */
    showWordLimit?: boolean
    /** textarea 行数 */
    rows?: number
    /** textarea 自适应高度 */
    autosize?: boolean | InputAutoSize
    /** 是否必填（aria-required） */
    required?: boolean
    /** 是否校验失败（aria-invalid） */
    invalid?: boolean
    /** 关联说明内容 id（aria-describedby） */
    describedby?: string
    /** 与 label 关联的 id */
    id?: string
    /** tabindex */
    tabindex?: string | number
    /** 是否自动聚焦 */
    autofocus?: boolean
    /** 输入值格式化函数（显示时） */
    formatter?: (value: string) => string
    /** 输入值解析函数（存储时） */
    parser?: (value: string) => string
    /** 前缀图标名称 */
    prefixIcon?: string
    /** 后缀图标名称 */
    suffixIcon?: string
    /** 原生 name 属性 */
    name?: string
    /** 输入时是否触发表单校验 */
    validateEvent?: boolean
    /** 输入框自定义样式 */
    inputStyle?: Record<string, string>
  }>(),
  {
    type: 'text',
    size: 'medium',
    disabled: false,
    readonly: false,
    clearable: false,
    showPassword: false,
    placeholder: '',
    maxlength: undefined,
    minlength: undefined,
    showWordLimit: false,
    rows: 3,
    autosize: false,
    required: false,
    invalid: false,
    describedby: undefined,
    id: undefined,
    tabindex: undefined,
    autofocus: false,
    validateEvent: true,
  },
)

// ==================== Emits ====================
const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'keydown', event: KeyboardEvent): void
}>()

// ==================== Model ====================
const model = defineModel<string>({ default: '' })

// ==================== Refs ====================
const inputRef = ref<HTMLInputElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const hovering = ref(false)
const isFocused = ref(false)
const passwordVisible = ref(false)
const isComposing = shallowRef(false)
const textareaCalcStyle = ref<Record<string, string>>({})

const slots = useSlots()
const attrs = useAttrs()

// ==================== Computed ====================
const instance = getCurrentInstance()

const inputId = computed(
  () => props.id ?? `f-input-${instance?.uid ?? Math.random().toString(36).slice(2)}`,
)

const filteredAttrs = computed(() => {
  const { id: _id, class: _class, style: _style, ...rest } = attrs as Record<string, unknown>
  return rest
})

const nativeRef = computed(() => inputRef.value || textareaRef.value)

const isTextarea = computed(() => props.type === 'textarea')

/** 格式化后的显示值 */
const displayInputValue = computed(() => {
  if (props.formatter) return props.formatter(model.value)
  return model.value
})

/** 真正渲染到 <input> 上的 type */
const nativeInputType = computed(() => {
  if (props.showPassword) {
    return passwordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const normalizedMaxlength = computed(() => {
  if (props.maxlength == null) return undefined
  return Number(props.maxlength)
})

const textLength = computed(() => {
  return (model.value ?? '').length
})

/** 是否显示字数统计 */
const isWordLimitVisible = computed(() => {
  return (
    props.showWordLimit
    && normalizedMaxlength.value != null
    && !props.disabled
    && !props.readonly
    && (props.type === 'text' || props.type === 'textarea')
  )
})

/** 是否显示清空按钮 */
const showClearBtn = computed(() => {
  return (
    props.clearable
    && !props.disabled
    && !props.readonly
    && !!model.value
    && (hovering.value || isFocused.value)
  )
})

/** 是否显示密码切换按钮 */
const showPwdToggle = computed(() => {
  return (
    props.showPassword
    && !props.disabled
    && !props.readonly
    && !!model.value
  )
})

/** 是否需要渲染 suffix 区域 */
const showSuffixArea = computed(() => {
  return !!(
    slots.suffix
    || props.suffixIcon
    || showClearBtn.value
    || showPwdToggle.value
    || isWordLimitVisible.value
  )
})

/** 外层容器 class */
const wrapperClass = computed(() => {
  if (isTextarea.value) {
    return [
      'f-textarea',
      `f-textarea--${props.size}`,
      props.disabled && 'is-disabled',
      props.readonly && 'is-readonly',
      props.invalid && 'is-invalid',
      isFocused.value && 'is-focus',
      isWordLimitVisible.value && 'is-exceed',
    ]
  }
  return [
    'f-input',
    `f-input--${props.size}`,
    props.disabled && 'is-disabled',
    props.readonly && 'is-readonly',
    props.invalid && 'is-invalid',
    slots.prepend && 'f-input--prepend',
    slots.append && 'f-input--append',
    (slots.prefix || props.prefixIcon) && 'f-input--prefix',
    (showSuffixArea.value) && 'f-input--suffix',
  ]
})

// ==================== Textarea Autosize ====================
function calcTextareaHeight() {
  if (!textareaRef.value || !props.autosize) return

  const ta = textareaRef.value
  // 先重置高度以便准确计算 scrollHeight
  ta.style.height = 'auto'
  const scrollHeight = ta.scrollHeight
  const lineHeight = parseFloat(getComputedStyle(ta).lineHeight) || 20
  const paddingTop = parseFloat(getComputedStyle(ta).paddingTop) || 0
  const paddingBottom = parseFloat(getComputedStyle(ta).paddingBottom) || 0
  const borderTop = parseFloat(getComputedStyle(ta).borderTopWidth) || 0
  const borderBottom = parseFloat(getComputedStyle(ta).borderBottomWidth) || 0
  const extra = paddingTop + paddingBottom + borderTop + borderBottom

  let minHeight: number | undefined
  let maxHeight: number | undefined

  if (typeof props.autosize === 'object') {
    if (props.autosize.minRows) {
      minHeight = props.autosize.minRows * lineHeight + extra
    }
    if (props.autosize.maxRows) {
      maxHeight = props.autosize.maxRows * lineHeight + extra
    }
  }

  let height = scrollHeight
  if (minHeight != null && height < minHeight) height = minHeight
  if (maxHeight != null && height > maxHeight) {
    height = maxHeight
    textareaCalcStyle.value = { height: `${height}px`, overflowY: 'auto' }
  }
  else {
    textareaCalcStyle.value = { height: `${height}px`, overflowY: 'hidden' }
  }
}

// ==================== Event Handlers ====================
function handleInput(e: Event) {
  if (isComposing.value) return
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  let value = target.value ?? ''

  // parser: 将显示值解析为存储值
  if (props.parser) {
    value = props.parser(value)
  }

  model.value = value
  emit('input', value)

  // formatter: 将存储值格式化为显示值
  if (props.formatter) {
    nextTick(() => {
      if (target) target.value = props.formatter!(model.value)
    })
  }

  // textarea autosize
  if (isTextarea.value && props.autosize) {
    nextTick(calcTextareaHeight)
  }
}

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  emit('change', target.value ?? '')
}

function handleFocus(e: FocusEvent) {
  isFocused.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  isFocused.value = false
  emit('blur', e)
}

function handleKeydown(e: KeyboardEvent) {
  emit('keydown', e)
}

function handleClear() {
  model.value = ''
  emit('input', '')
  emit('change', '')
  emit('clear')
  nextTick(() => {
    nativeRef.value?.focus()
  })
}

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value
  nextTick(() => {
    inputRef.value?.focus()
  })
}

/** 点击 wrapper 时聚焦 input */
function handleWrapperClick() {
  if (props.disabled || props.readonly) return
  inputRef.value?.focus()
}

// 中文输入法处理
function handleCompositionStart() {
  isComposing.value = true
}

function handleCompositionEnd(e: CompositionEvent) {
  isComposing.value = false
  // 部分浏览器 compositionend 在 input 之后触发
  handleInput(e)
}

// ==================== Watchers ====================
watch(
  () => model.value,
  () => {
    if (isTextarea.value && props.autosize) {
      nextTick(calcTextareaHeight)
    }
  },
)

// ==================== Lifecycle ====================
onMounted(() => {
  if (isTextarea.value && props.autosize) {
    nextTick(calcTextareaHeight)
  }
})

// ==================== Expose ====================
defineExpose({
  /** 原生 input 元素引用 */
  inputRef,
  /** 原生 textarea 元素引用 */
  textareaRef,
  /** 原生元素引用（input 或 textarea） */
  ref: nativeRef,
  /** 聚焦 */
  focus: () => nativeRef.value?.focus(),
  /** 失焦 */
  blur: () => nativeRef.value?.blur(),
  /** 选中 */
  select: () => nativeRef.value?.select(),
  /** 清空 */
  clear: handleClear,
  /** 重新计算 textarea 高度 */
  resizeTextarea: calcTextareaHeight,
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
