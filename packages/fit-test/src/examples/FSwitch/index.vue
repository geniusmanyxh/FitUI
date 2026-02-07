<template>
  <div>
    <custom-nav title="FSwitch"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础开关 -->
      <div class="section">
        <h3>基础开关</h3>
        <div class="row">
          <FSwitch v-model="switchValue"></FSwitch>
        </div>
      </div>

      <!-- 场景二：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FSwitch v-model="switchValue" size="small"></FSwitch>
          <FSwitch v-model="switchValue" size="medium"></FSwitch>
          <FSwitch v-model="switchValue" size="large"></FSwitch>
        </div>
      </div>

      <!-- 场景三：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FSwitch v-model="switchValue" disabled></FSwitch>
        </div>
      </div>

      <!-- 场景四：加载状态 -->
      <div class="section">
        <h3>加载状态</h3>
        <div class="row">
          <FSwitch v-model="switchValue" loading></FSwitch>
        </div>
      </div>

      <!-- 场景五：自定义颜色 -->
      <div class="section">
        <h3>自定义颜色</h3>
        <div class="row">
          <FSwitch v-model="switchValue" active-color="#1890ff"></FSwitch>
          <FSwitch v-model="switchValue" active-color="#52c41a"></FSwitch>
          <FSwitch v-model="switchValue" active-color="#faad14"></FSwitch>
          <FSwitch v-model="switchValue" active-color="#f5222d"></FSwitch>
        </div>
      </div>

      <!-- 场景六：带文字 -->
      <div class="section">
        <h3>带文字</h3>
        <div class="row">
          <FSwitch v-model="switchValue" active-text="开" inactive-text="关"></FSwitch>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FSwitch-Demo", inheritAttrs: false })

import { ref } from 'vue'

const switchValue = ref(false)
</script>

<style scoped lang="scss">
.demoBox {
  :deep(.f-switch) {
    margin-right: 10px;
  }
}
</style>
