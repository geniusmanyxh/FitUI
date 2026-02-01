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
.modal_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;

  &.modal_overlay_fade {
    animation: fadeIn 0.3s ease;
  }
}

.modal_content {
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  outline: none;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &.modal_content_fade {
    animation: zoomIn 0.3s ease;
  }

  &.modal_content_small {
    width: 400px;
    max-width: 100%;
  }

  &.modal_content_medium {
    width: 600px;
    max-width: 100%;
  }

  &.modal_content_large {
    width: 800px;
    max-width: 100%;
  }

  &.modal_content_no_header {
    .modal_body {
      padding-top: 24px;
    }
  }

  &.modal_content_no_footer {
    .modal_body {
      padding-bottom: 24px;
    }
  }
}

.modal_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
}

.modal_title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.modal_close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  transition: color 0.3s ease;

  &:hover {
    color: #333333;
  }

  &:focus-visible {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    border-radius: 4px;
  }
}

.modal_body {
  padding: 0 24px;
  flex: 1;
  overflow-y: auto;
  max-height: calc(90vh - 136px);
}

.modal_footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #e8e8e8;
  gap: 12px;
}

.modal_btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus-visible {
    outline: 2px solid rgba(59, 130, 246, 0.5);
  }

  &.modal_btn_cancel {
    background-color: #ffffff;
    color: #333333;

    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }
  }

  &.modal_btn_confirm {
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: #ffffff;

    &:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .modal_content {
    &.modal_content_medium,
    &.modal_content_large {
      width: 90%;
      max-width: 100%;
    }
  }
}
</style>