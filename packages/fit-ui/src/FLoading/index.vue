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
defineOptions({ name: 'FLoading', inheritAttrs: false })

withDefaults(
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
  }>(),
  {
    fullscreen: false,
    type: 'spin',
    size: 'medium',
    text: ''
  }
)
</script>

<style scoped lang="scss">
@use './style/index' as *;
</style>