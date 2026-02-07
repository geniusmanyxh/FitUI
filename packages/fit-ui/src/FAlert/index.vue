<template>
  <div 
    :class="[
      `alert_wrapper`, 
      `alert_${type}`, 
      `alert_${effect}`,
      { 
        'alert_dismissible': closable,
        'alert_center': center
      }
    ]"
    role="alert"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
  >
    <!-- 图标 -->
    <div v-if="showIcon" class="alert_icon">
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
      :class="{ 'alert_close_text': closeText }"
      @click="handleClose"
      @keydown.enter="handleClose"
      @keydown.space="handleClose"
      aria-label="关闭"
      tabindex="0"
    >
      <span v-if="closeText" class="alert_close_text_content">{{ closeText }}</span>
      <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
defineOptions({ name: 'FAlert', inheritAttrs: false })

const props = withDefaults(defineProps<{
  /** 警告类型 */
  type?: 'success' | 'warning' | 'error' | 'info'
  /** 警告标题 */
  title?: string
  /** 是否可关闭 */
  closable?: boolean
  /** 主题风格 */
  effect?: 'light' | 'dark'
  /** 文字是否居中 */
  center?: boolean
  /** 是否显示图标 */
  showIcon?: boolean
  /** 关闭按钮自定义文本 */
  closeText?: string
}>(), {
  type: 'info',
  closable: false,
  effect: 'light',
  center: false,
  showIcon: false,
  closeText: ''
})

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
@use './style/index' as *;
</style>