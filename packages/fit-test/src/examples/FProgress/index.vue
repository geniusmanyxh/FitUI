<template>
  <div>
    <custom-nav title="FProgress"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：直线进度条 -->
      <div class="section">
        <h3>直线进度条</h3>
        <div class="row">
          <FProgress :percentage="progressValue" />
          <FProgress :percentage="progressValue" status="success" />
          <FProgress :percentage="progressValue" status="warning" />
          <FProgress :percentage="progressValue" status="exception" />
        </div>
      </div>

      <!-- 场景二：环形进度条 -->
      <div class="section">
        <h3>环形进度条</h3>
        <div class="row">
          <FProgress :percentage="progressValue" type="circle" />
          <FProgress :percentage="progressValue" type="circle" status="success" />
          <FProgress :percentage="progressValue" type="circle" status="warning" />
          <FProgress :percentage="progressValue" type="circle" status="exception" />
        </div>
      </div>

      <!-- 场景三：仪表盘进度条 -->
      <div class="section">
        <h3>仪表盘进度条</h3>
        <div class="row">
          <FProgress :percentage="progressValue" type="dashboard" />
          <FProgress :percentage="progressValue" type="dashboard" status="success" />
          <FProgress :percentage="progressValue" type="dashboard" status="warning" />
          <FProgress :percentage="progressValue" type="dashboard" status="exception" />
        </div>
      </div>

      <!-- 场景四：不同状态 -->
      <div class="section">
        <h3>不同状态</h3>
        <div class="row">
          <FProgress :percentage="0" status="success" />
          <FProgress :percentage="50" status="warning" />
          <FProgress :percentage="100" status="success" />
          <FProgress :percentage="100" status="exception" />
        </div>
      </div>

      <!-- 场景五：百分比显示 -->
      <div class="section">
        <h3>百分比显示</h3>
        <div class="row">
          <FProgress :percentage="progressValue" show-text />
          <FProgress :percentage="progressValue" type="circle" show-text />
        </div>
      </div>

      <!-- 场景六：动态调整 -->
      <div class="section">
        <h3>动态调整</h3>
        <div class="row">
          <FButton type="primary" @click="decreaseProgress">减少</FButton>
          <FButton type="primary" @click="increaseProgress">增加</FButton>
          <FButton type="primary" @click="resetProgress">重置</FButton>
          <FProgress :percentage="progressValue" show-text style="margin-top: 20px; width: 100%;" />
        </div>
      </div>

      <!-- 不确定进度 -->
      <div class="section">
        <h3>不确定进度 (indeterminate)</h3>
        <div class="row">
          <FProgress :percentage="50" indeterminate />
          <FProgress :percentage="50" indeterminate :duration="3000" />
          <FProgress :percentage="50" indeterminate status="success" />
          <FProgress :percentage="50" indeterminate status="warning" />
        </div>
      </div>

      <!-- 自定义格式 -->
      <div class="section">
        <h3>自定义格式 (format)</h3>
        <div class="row">
          <FProgress :percentage="progressValue" :format="formatPercent" />
          <FProgress :percentage="progressValue" type="circle" :format="formatPercent" />
        </div>
      </div>

      <!-- 条纹样式 -->
      <div class="section">
        <h3>条纹样式 (striped)</h3>
        <div class="row">
          <FProgress :percentage="progressValue" striped />
          <FProgress :percentage="progressValue" striped striped-flow />
          <FProgress :percentage="progressValue" striped status="success" />
          <FProgress :percentage="progressValue" striped striped-flow status="warning" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FProgress-Demo", inheritAttrs: false })

import { ref } from 'vue'

const progressValue = ref(50)

const decreaseProgress = () => {
  progressValue.value = Math.max(0, progressValue.value - 10)
}

const increaseProgress = () => {
  progressValue.value = Math.min(100, progressValue.value + 10)
}

const resetProgress = () => {
  progressValue.value = 0
}

const formatPercent = (percentage: number) => {
  return `已完成 ${percentage}%`
}

</script>

<style scoped lang="scss">
.demoBox {
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  :deep(.f-progress) {
    width: 100%;
    max-width: 400px;
  }
  
  :deep(.f-progress-circle) {
    margin-right: 20px;
  }
}
</style>
