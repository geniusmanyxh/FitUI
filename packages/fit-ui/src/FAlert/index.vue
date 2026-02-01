<template>
  <div 
    :class="[`alert_wrapper`, `alert_${type}`, { 'alert_dismissible': closable }]"
    role="alert"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
  >
    <!-- 图标 -->
    <div class="alert_icon">
      <svg v-if="type === 'success'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else-if="type === 'warning'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 15H10.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.3333 18.3333C19.0471 17.6195 19.5 16.6326 19.5 15.5556V4.44444C19.5 3.36746 19.0471 2.38055 18.3333 1.66667C17.6195 0.952885 16.6326 0.5 15.5556 0.5H4.44444C3.36746 0.5 2.38055 0.952885 1.66667 1.66667C0.952885 2.38055 0.5 3.36746 0.5 4.44444V15.5556C0.5 16.6326 0.952885 17.6195 1.66667 18.3333C2.38055 19.0471 3.36746 19.5 4.44444 19.5H15.5556C16.6326 19.5 17.6195 19.0471 18.3333 18.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else-if="type === 'error'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.3333 18.3333C19.0471 17.6195 19.5 16.6326 19.5 15.5556V4.44444C19.5 3.36746 19.0471 2.38055 18.3333 1.66667C17.6195 0.952885 16.6326 0.5 15.5556 0.5H4.44444C3.36746 0.5 2.38055 0.952885 1.66667 1.66667C0.952885 2.38055 0.5 3.36746 0.5 4.44444V15.5556C0.5 16.6326 0.952885 17.6195 1.66667 18.3333C2.38055 19.0471 3.36746 19.5 4.44444 19.5H15.5556C16.6326 19.5 17.6195 19.0471 18.3333 18.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else-if="type === 'info'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 16H10.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.3333 18.3333C19.0471 17.6195 19.5 16.6326 19.5 15.5556V4.44444C19.5 3.36746 19.0471 2.38055 18.3333 1.66667C17.6195 0.952885 16.6326 0.5 15.5556 0.5H4.44444C3.36746 0.5 2.38055 0.952885 1.66667 1.66667C0.952885 2.38055 0.5 3.36746 0.5 4.44444V15.5556C0.5 16.6326 0.952885 17.6195 1.66667 18.3333C2.38055 19.0471 3.36746 19.5 4.44444 19.5H15.5556C16.6326 19.5 17.6195 19.0471 18.3333 18.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    
    <!-- 内容 -->
    <div class="alert_content">
      <div v-if="title" class="alert_title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="alert_message">
        <slot></slot>
      </div>
    </div>
    
    <!-- 关闭按钮 -->
    <button 
      v-if="closable" 
      class="alert_close"
      @click="handleClose"
      @keydown.enter="handleClose"
      @keydown.space="handleClose"
      aria-label="关闭"
      tabindex="0"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
/**
 * FAlert 警告提示组件
 *
 * @description 用于页面内的警告提示，支持多种类型和可关闭功能
 * @example
 * ```vue
 * <FAlert type="success" title="成功">操作成功</FAlert>
 * <FAlert type="warning" closable>警告信息</FAlert>
 * <FAlert type="error">错误信息</FAlert>
 * <FAlert type="info">提示信息</FAlert>
 * ```
 */
const props = defineProps<{
  /**
   * 警告类型
   * @default 'info'
   * @example 'success' | 'warning' | 'error' | 'info'
   */
  type?: 'success' | 'warning' | 'error' | 'info'
  /**
   * 警告标题
   * @default ''
   */
  title?: string
  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean
}>()

const emit = defineEmits<{
  /**
   * 关闭时触发
   */
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.alert_wrapper {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &.alert_success {
    background-color: #f0fdf4;
    border-left: 4px solid #22c55e;
    color: #166534;
  }

  &.alert_warning {
    background-color: #fffbeb;
    border-left: 4px solid #eab308;
    color: #78350f;
  }

  &.alert_error {
    background-color: #fef2f2;
    border-left: 4px solid #ef4444;
    color: #991b1b;
  }

  &.alert_info {
    background-color: #eff6ff;
    border-left: 4px solid #3b82f6;
    color: #1e40af;
  }

  &.alert_dismissible {
    padding-right: 40px;
  }
}

.alert_icon {
  flex-shrink: 0;
  margin-right: 12px;
  margin-top: 2px;
  font-size: 16px;
}

.alert_content {
  flex: 1;
  min-width: 0;
}

.alert_title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.alert_message {
  font-size: 14px;
  line-height: 1.5;
}

.alert_close {
  flex-shrink: 0;
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    border-radius: 4px;
  }
}
</style>