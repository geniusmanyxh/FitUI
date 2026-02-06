<template>
  <div>
    <custom-nav title="FProgress"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：直线进度条 -->
      <div class="section">
        <h3>直线进度条</h3>
        <div class="row">
          <FProgress v-model:percentage="progressValue" />
          <FProgress v-model:percentage="progressValue" type="success" />
          <FProgress v-model:percentage="progressValue" type="warning" />
          <FProgress v-model:percentage="progressValue" type="danger" />
        </div>
      </div>

      <!-- 场景二：环形进度条 -->
      <div class="section">
        <h3>环形进度条</h3>
        <div class="row">
          <FProgress v-model:percentage="progressValue" type="circle" />
          <FProgress v-model:percentage="progressValue" type="circle" status="success" />
          <FProgress v-model:percentage="progressValue" type="circle" status="warning" />
          <FProgress v-model:percentage="progressValue" type="circle" status="danger" />
        </div>
      </div>

      <!-- 场景三：不同状态 -->
      <div class="section">
        <h3>不同状态</h3>
        <div class="row">
          <FProgress :percentage="0" status="success" />
          <FProgress :percentage="50" status="warning" />
          <FProgress :percentage="100" status="success" />
          <FProgress :percentage="100" status="danger" />
        </div>
      </div>

      <!-- 场景四：百分比显示 -->
      <div class="section">
        <h3>百分比显示</h3>
        <div class="row">
          <FProgress v-model:percentage="progressValue" show-text />
          <FProgress v-model:percentage="progressValue" type="circle" show-text />
        </div>
      </div>

      <!-- 场景五：动态调整 -->
      <div class="section">
        <h3>动态调整</h3>
        <div class="row">
          <FButton type="primary" @click="decreaseProgress">减少</FButton>
          <FButton type="primary" @click="increaseProgress">增加</FButton>
          <FButton type="primary" @click="resetProgress">重置</FButton>
          <FProgress v-model:percentage="progressValue" show-text style="margin-top: 20px; width: 100%;" />
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
</script>

<style scoped lang="scss">
.demoBox {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  .section {
    width: 100%;
    
    h3 {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .row {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
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
