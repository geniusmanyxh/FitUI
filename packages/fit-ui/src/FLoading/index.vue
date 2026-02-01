<template>
  <Teleport v-if="fullscreen" to="body">
    <div class="loading_fullscreen_wrapper">
      <div class="loading_overlay"></div>
      <div :class="[`loading_content`, `loading_content_${size}`]">
        <div :class="[`loading_spinner`, `loading_spinner_${type}`]">
          <svg v-if="type === 'spin'" class="loading_spinner_icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="loading_spinner_circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4159" stroke-dashoffset="31.4159"/>
          </svg>
          <div v-else-if="type === 'pulse'" class="loading_pulse"></div>
          <div v-else-if="type === 'dots'" class="loading_dots">
            <div class="loading_dot"></div>
            <div class="loading_dot"></div>
            <div class="loading_dot"></div>
          </div>
        </div>
        <div v-if="text" class="loading_text">{{ text }}</div>
      </div>
    </div>
  </Teleport>
  <div v-else :class="[`loading_wrapper`, `loading_wrapper_${size}`]">
    <div :class="[`loading_spinner`, `loading_spinner_${type}`]">
      <svg v-if="type === 'spin'" class="loading_spinner_icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="loading_spinner_circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4159" stroke-dashoffset="31.4159"/>
      </svg>
      <div v-else-if="type === 'pulse'" class="loading_pulse"></div>
      <div v-else-if="type === 'dots'" class="loading_dots">
        <div class="loading_dot"></div>
        <div class="loading_dot"></div>
        <div class="loading_dot"></div>
      </div>
    </div>
    <div v-if="text" class="loading_text">{{ text }}</div>
  </div>
</template>

<script lang="ts" setup>
/**
 * FLoading 加载态组件
 *
 * @description 用于显示加载状态，支持全屏和局部加载
 * @example
 * ```vue
 * <!-- 局部加载 -->
 * <FLoading text="加载中..." />
 * 
 * <!-- 全屏加载 -->
 * <FLoading fullscreen text="加载中..." />
 * ```
 */
defineProps<{
  /**
   * 是否全屏显示
   * @default false
   */
  fullscreen?: boolean
  /**
   * 加载图标类型
   * @default 'spin'
   * @example 'spin' | 'pulse' | 'dots'
   */
  type?: 'spin' | 'pulse' | 'dots'
  /**
   * 加载图标大小
   * @default 'medium'
   * @example 'small' | 'medium' | 'large'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 加载文本
   * @default ''
   */
  text?: string
}>()
</script>

<style scoped lang="scss">
// 全屏加载
.loading_fullscreen_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
}

// 局部加载
.loading_wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;

  &.loading_wrapper_small {
    padding: 8px;
  }

  &.loading_wrapper_large {
    padding: 24px;
  }
}

// 加载内容
.loading_content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &.loading_content_small {
    padding: 16px;
  }

  &.loading_content_large {
    padding: 24px;
  }
}

// 加载图标
.loading_spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;

  &.loading_spinner_small {
    font-size: 16px;
  }

  &.loading_spinner_medium {
    font-size: 24px;
  }

  &.loading_spinner_large {
    font-size: 32px;
  }
}

// 旋转动画
.loading_spinner_icon {
  width: 1em;
  height: 1em;
  animation: spin 1s linear infinite;
}

.loading_spinner_circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 31.4159;
  }
  50% {
    stroke-dashoffset: 7.85398;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 31.4159;
    transform: rotate(450deg);
  }
}

// 脉冲动画
.loading_pulse {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: currentColor;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.6);
    opacity: 1;
  }
}

// 点动画
.loading_dots {
  display: flex;
  gap: 0.3em;

  .loading_dot {
    width: 0.3em;
    height: 0.3em;
    border-radius: 50%;
    background-color: currentColor;
    animation: dotBounce 1.5s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes dotBounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-0.5em);
  }
}

// 加载文本
.loading_text {
  margin-top: 12px;
  font-size: 14px;
  color: #666666;
  text-align: center;

  .loading_content_small &,
  .loading_wrapper_small & {
    margin-top: 8px;
    font-size: 12px;
  }

  .loading_content_large &,
  .loading_wrapper_large & {
    margin-top: 16px;
    font-size: 16px;
  }
}
</style>