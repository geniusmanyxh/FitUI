<template>
  <div>
    <custom-nav title="FSwitch"></custom-nav>
    <div class="demoBox">
      <!-- 基础用法 -->
      <div class="section">
        <h3>基础用法</h3>
        <div class="row">
          <FSwitch v-model="switchVal" />
          <span style="margin-left: 12px; color: #999;">当前值: {{ switchVal }}</span>
        </div>
      </div>

      <!-- 文字描述 -->
      <div class="section">
        <h3>文字描述</h3>
        <div class="row">
          <FSwitch v-model="switchText" active-text="开启" inactive-text="关闭" />
          <span style="margin-left: 12px; color: #999;">当前值: {{ switchText }}</span>
        </div>
      </div>

      <!-- 内联文字 -->
      <div class="section">
        <h3>内联文字</h3>
        <div class="row">
          <FSwitch v-model="switchInline" active-text="是" inactive-text="否" inline-prompt />
          <span style="margin-left: 12px; color: #999;">当前值: {{ switchInline }}</span>
        </div>
      </div>

      <!-- 自定义值 -->
      <div class="section">
        <h3>自定义值</h3>
        <div class="row">
          <FSwitch v-model="customVal" active-value="yes" inactive-value="no" />
          <span style="margin-left: 12px; color: #999;">当前值: {{ customVal }}</span>
        </div>
      </div>

      <!-- 加载状态 -->
      <div class="section">
        <h3>加载状态</h3>
        <div class="row">
          <FSwitch v-model="switchLoading" loading />
          <span style="margin-left: 12px; color: #999;">当前值: {{ switchLoading }}</span>
        </div>
      </div>

      <!-- 不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FSwitch v-model="switchSize" size="small" />
          <FSwitch v-model="switchSize" size="medium" style="margin-left: 12px;" />
          <FSwitch v-model="switchSize" size="large" style="margin-left: 12px;" />
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FSwitch v-model="switchDisabled" disabled />
          <span style="margin-left: 12px; color: #999;">当前值: {{ switchDisabled }}</span>
        </div>
      </div>

      <!-- 切换前钩子 (beforeChange) -->
      <div class="section">
        <h3>切换前钩子 (beforeChange)</h3>
        <div class="row">
          <FSwitch v-model="switchBeforeChange" :before-change="handleBeforeChange" />
          <span style="margin-left: 12px; color: #999;">切换前会弹出确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'FSwitch-Demo', inheritAttrs: false })

const switchVal = ref(false)
const switchText = ref(false)
const switchInline = ref(false)
const customVal = ref('no')
const switchLoading = ref(false)
const switchSize = ref(false)
const switchDisabled = ref(true)
const switchBeforeChange = ref(false)

const handleBeforeChange = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const result = window.confirm('确定要切换吗？')
    resolve(result)
  })
}
</script>

<style scoped lang="scss">
</style>
