<template>
  <Teleport to="body">
    <div 
      v-if="modelValue" 
      class="modal_wrapper"
      @click="handleOverlayClick"
      role="dialog"
      :aria-modal="true"
      :aria-labelledby="title ? 'modal-title' : undefined"
    >
      <div 
        class="modal_overlay"
        :class="{ 'modal_overlay_fade': true }"
      ></div>
      <div 
        ref="modalRef"
        class="modal_content"
        :class="[
          `modal_content_${size}`,
          { 'modal_content_fade': true, 'modal_content_no_header': !showHeader, 'modal_content_no_footer': !showFooter }
        ]"
        @click.stop
        tabindex="-1"
      >
        <!-- 头部 -->
        <div v-if="showHeader" class="modal_header">
          <div class="modal_title" id="modal-title">
            <slot name="title">{{ title }}</slot>
          </div>
          <button 
            v-if="closable" 
            class="modal_close"
            @click="handleClose"
            @keydown.enter="handleClose"
            @keydown.space="handleClose"
            aria-label="关闭"
            tabindex="0"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- 内容 -->
        <div class="modal_body">
          <slot></slot>
        </div>
        
        <!-- 底部 -->
        <div v-if="showFooter" class="modal_footer">
          <slot name="footer">
            <button 
              class="modal_btn modal_btn_cancel"
              @click="handleCancel"
              @keydown.enter="handleCancel"
              @keydown.space="handleCancel"
              tabindex="0"
            >
              {{ cancelText }}
            </button>
            <button 
              class="modal_btn modal_btn_confirm"
              @click="handleConfirm"
              @keydown.enter="handleConfirm"
              @keydown.space="handleConfirm"
              tabindex="0"
            >
              {{ confirmText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
/**
 * FModal 弹窗组件
 *
 * @description 用于弹窗确认、表单弹窗等场景
 * @example
 * ```vue
 * <FModal v-model="visible" title="提示">
 *   <p>确定要执行此操作吗？</p>
 * </FModal>
 * ```
 */
defineOptions({ name: 'FModal', inheritAttrs: false })

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  /**
   * 绑定值，控制弹窗显示/隐藏
   * @default false
   */
  modelValue: boolean
  /**
   * 弹窗标题
   * @default ''
   */
  title?: string
  /**
   * 弹窗尺寸
   * @default 'medium'
   * @example 'small' | 'medium' | 'large'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 是否可关闭
   * @default true
   */
  closable?: boolean
  /**
   * 点击遮罩层是否可关闭
   * @default true
   */
  closeOnClickOverlay?: boolean
  /**
   * 按 ESC 键是否可关闭
   * @default true
   */
  closeOnPressEscape?: boolean
  /**
   * 是否显示头部
   * @default true
   */
  showHeader?: boolean
  /**
   * 是否显示底部
   * @default true
   */
  showFooter?: boolean
  /**
   * 取消按钮文本
   * @default '取消'
   */
  cancelText?: string
  /**
   * 确认按钮文本
   * @default '确定'
   */
  confirmText?: string
}>()

const emit = defineEmits<{
  /**
   * 绑定值变化时触发
   */
  (e: 'update:modelValue', value: boolean): void
  /**
   * 关闭时触发
   */
  (e: 'close'): void
  /**
   * 取消时触发
   */
  (e: 'cancel'): void
  /**
   * 确认时触发
   */
  (e: 'confirm'): void
}>()

const modalRef = ref<HTMLElement | null>(null)
const previousFocus = ref<HTMLElement | null>(null)

// 默认值处理
const showHeader = computed(() => props.showHeader ?? true)
const showFooter = computed(() => props.showFooter ?? true)
const closable = computed(() => props.closable ?? true)
const closeOnClickOverlay = computed(() => props.closeOnClickOverlay ?? true)
const closeOnPressEscape = computed(() => props.closeOnPressEscape ?? true)
const cancelText = computed(() => props.cancelText ?? '取消')
const confirmText = computed(() => props.confirmText ?? '确定')
const size = computed(() => props.size ?? 'medium')

// 处理遮罩层点击
const handleOverlayClick = () => {
  if (closeOnClickOverlay.value) {
    handleClose()
  }
}

// 处理关闭
const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
  handleClose()
}

// 处理确认
const handleConfirm = () => {
  emit('confirm')
  handleClose()
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && closeOnPressEscape.value && props.modelValue) {
    handleClose()
  } else if (event.key === 'Tab') {
    handleTabKey(event)
  }
}

// 处理 Tab 键，实现焦点陷阱
const handleTabKey = (event: KeyboardEvent) => {
  if (!modalRef.value) return
  
  const focusableElements = modalRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])' 
  ) as NodeListOf<HTMLElement>
  
  if (focusableElements.length === 0) {
    event.preventDefault()
    return
  }
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  } else if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  }
}

// 保存之前的焦点元素
const savePreviousFocus = () => {
  previousFocus.value = document.activeElement as HTMLElement
}

// 聚焦到弹窗
const focusModal = () => {
  if (modalRef.value) {
    modalRef.value.focus()
  }
}

// 恢复之前的焦点
const restorePreviousFocus = () => {
  if (previousFocus.value) {
    previousFocus.value.focus()
  }
}

// 监听显示/隐藏
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    savePreviousFocus()
    // 下一帧聚焦，确保 DOM 已经渲染
    setTimeout(focusModal, 100)
  } else {
    restorePreviousFocus()
  }
})

// 生命周期
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  restorePreviousFocus()
})
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>