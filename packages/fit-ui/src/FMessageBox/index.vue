<template>
  <transition name="f-message-box-fade">
    <div v-if="visible" class="f-message-box__wrapper" @click.self="handleWrapperClick">
      <div
        class="f-message-box"
        :class="[typeClass, customClass]"
        :style="messageBoxStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        ref="messageBoxRef"
      >
        <div v-if="showClose" class="f-message-box__header">
          <button class="f-message-box__close" @click="handleClose" aria-label="关闭">
            <f-icon icon="close" size="small"></f-icon>
          </button>
        </div>
        <div v-if="title" class="f-message-box__title" :id="titleId">
          <f-icon v-if="type" :icon="iconType" :class="`f-message-box__icon--${type}`"></f-icon>
          {{ title }}
        </div>
        <div class="f-message-box__content">
          <div v-if="dangerouslyUseHTMLString" class="f-message-box__message" v-html="message"></div>
          <div v-else class="f-message-box__message">{{ message }}</div>
          <input
            v-if="showInput"
            ref="inputRef"
            class="f-message-box__input"
            v-model="inputValue"
            :placeholder="inputPlaceholder"
            :type="inputType"
            @keyup.enter="handleConfirm"
          >
          <p v-if="inputError" class="f-message-box__errormsg">{{ inputError }}</p>
        </div>
        <div class="f-message-box__btns">
          <button
            v-if="showCancelButton"
            class="f-message-box__btn f-message-box__btn--cancel"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </button>
          <button
            v-if="showConfirmButton"
            class="f-message-box__btn f-message-box__btn--confirm"
            :class="{ 'is-disabled': confirmDisabled }"
            @click="handleConfirm"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import FIcon from '@/FIcon'

defineOptions({ name: 'FMessageBox', inheritAttrs: false })

export type MessageBoxType = 'alert' | 'confirm' | 'prompt'

export interface MessageBoxInstance {
  inputValue: string
}

export interface MessageBoxOptions {
  title?: string
  message?: string
  type?: MessageBoxType
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  showClose?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  zIndex?: number
  width?: string | number
  showInput?: boolean
  inputPlaceholder?: string
  inputType?: string
  inputValue?: string
  inputPattern?: RegExp
  inputValidator?: (value: string) => boolean | string
  beforeClose?: (action: 'confirm' | 'cancel', instance: MessageBoxInstance) => Promise<void> | void
}

export interface MessageBoxEmits {
  (e: 'close', action: 'confirm' | 'cancel'): void
}

const props = withDefaults(defineProps<MessageBoxOptions>(), {
  title: '',
  message: '',
  type: 'alert',
  showCancelButton: false,
  showConfirmButton: true,
  cancelButtonText: '取消',
  confirmButtonText: '确定',
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  dangerouslyUseHTMLString: false,
  customClass: '',
  zIndex: 2000,
  width: '420px',
  showInput: false,
  inputPlaceholder: '',
  inputType: 'text',
  inputValue: '',
  inputPattern: undefined,
  inputValidator: undefined,
  beforeClose: undefined
})

const emit = defineEmits<MessageBoxEmits>()

const visible = ref(false)
const inputValue = ref(props.inputValue)
const inputError = ref('')
const confirmDisabled = ref(false)
const messageBoxRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const titleId = `f-message-box-title-${Math.random().toString(36).slice(2, 9)}`

const typeClass = computed(() => props.type ? `f-message-box--${props.type}` : '')
const iconType = computed(() => {
  const iconMap: Record<string, string> = {
    success: 'circle-check',
    warning: 'circle-information',
    error: 'circle-cross',
    info: 'circle-information'
  }
  return iconMap[props.type] || 'circle-information'
})

const messageBoxStyle = computed(() => ({
  zIndex: props.zIndex,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width
}))

const validateInput = () => {
  if (!props.showInput) return true
  const value = inputValue.value
  if (props.inputPattern && !props.inputPattern.test(value)) {
    inputError.value = '输入格式不正确'
    return false
  }
  if (props.inputValidator) {
    const result = props.inputValidator(value)
    if (result === false) {
      inputError.value = '输入不合法'
      return false
    } else if (typeof result === 'string') {
      inputError.value = result
      return false
    }
  }
  inputError.value = ''
  return true
}

const handleConfirm = async () => {
  if (confirmDisabled.value) return
  if (props.showInput && !validateInput()) return
  
  confirmDisabled.value = true
  
  if (props.beforeClose) {
    try {
      await props.beforeClose('confirm', { inputValue: inputValue.value })
      doClose('confirm')
    } catch {
      confirmDisabled.value = false
    }
  } else {
    doClose('confirm')
  }
}

const handleCancel = async () => {
  if (props.beforeClose) {
    await props.beforeClose('cancel', { inputValue: inputValue.value })
  }
  doClose('cancel')
}

const doClose = (action: 'confirm' | 'cancel') => {
  visible.value = false
  emit('close', action)
  confirmDisabled.value = false
}

const handleClose = () => {
  doClose('cancel')
}

const handleWrapperClick = () => {
  if (props.closeOnClickModal) {
    doClose('cancel')
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (props.closeOnPressEscape && e.key === 'Escape') {
    doClose('cancel')
  }
}

const open = () => {
  visible.value = true
  nextTick(() => {
    if (props.showInput && inputRef.value) {
      inputRef.value.focus()
    }
    if (messageBoxRef.value) {
      messageBoxRef.value.focus()
      messageBoxRef.value.addEventListener('keydown', handleKeydown)
    }
  })
}

const close = () => {
  doClose('cancel')
}

defineExpose({ open, close, inputValue })

watch(() => props.inputValue, (val) => {
  inputValue.value = val
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>
