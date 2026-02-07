<template>
  <div>
    <custom-nav title="FInputNumber"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础用法 -->
      <div class="section">
        <h3>基础用法</h3>
        <div class="row">
          <FInputNumber v-model="numberValue" />
        </div>
      </div>

      <!-- 场景二：步长设置 -->
      <div class="section">
        <h3>步长设置</h3>
        <div class="row">
          <FInputNumber v-model="numberValue" step="0.1" />
          <FInputNumber v-model="numberValue" step="1" />
          <FInputNumber v-model="numberValue" step="5" />
        </div>
      </div>

      <!-- 场景三：最小值和最大值 -->
      <div class="section">
        <h3>最小值和最大值</h3>
        <div class="row">
          <FInputNumber v-model="numberValue" min="0" max="10" />
        </div>
      </div>

      <!-- 场景四：精度控制 -->
      <div class="section">
        <h3>精度控制</h3>
        <div class="row">
          <FInputNumber v-model="numberValue" step="0.1" precision="1" />
          <FInputNumber v-model="numberValue" step="0.01" precision="2" />
        </div>
      </div>

      <!-- 场景五：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FInputNumber v-model="numberValue" disabled />
        </div>
      </div>

      <!-- 场景六：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FInputNumber v-model="numberValue" size="small" />
          <FInputNumber v-model="numberValue" size="medium" />
          <FInputNumber v-model="numberValue" size="large" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FInputNumber-Demo", inheritAttrs: false })

import { ref } from 'vue'

const numberValue = ref(0)
</script>

<style scoped lang="scss">
.demoBox {
  :deep(.f-input-number) {
    width: 120px;
  }
}
</style>
