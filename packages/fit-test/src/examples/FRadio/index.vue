<template>
  <div>
    <custom-nav title="FRadio"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：单选框组 -->
      <div class="section">
        <h3>单选框组</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
            <FRadio label="选项3"></FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 场景二：按钮样式单选 -->
      <div class="section">
        <h3>按钮样式单选</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue" type="button">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
            <FRadio label="选项3"></FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 场景三：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue">
            <FRadio label="选项1" disabled></FRadio>
            <FRadio label="选项2"></FRadio>
            <FRadio label="选项3" disabled></FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 场景四：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue" size="small">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioValue" size="medium" style="margin-left: 20px;">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioValue" size="large" style="margin-left: 20px;">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 场景五：按钮样式不同尺寸 -->
      <div class="section">
        <h3>按钮样式不同尺寸</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue" type="button" size="small">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioValue" type="button" size="medium" style="margin-left: 20px;">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioValue" type="button" size="large" style="margin-left: 20px;">
            <FRadio label="选项1"></FRadio>
            <FRadio label="选项2"></FRadio>
          </FRadioGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FRadio-Demo", inheritAttrs: false })

import { ref } from 'vue'

const radioValue = ref('选项1')
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    align-items: flex-start;
  }
  
  :deep(.f-radio) {
    margin-right: 10px;
  }
}
</style>
