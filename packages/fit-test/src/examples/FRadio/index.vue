<template>
  <div>
    <custom-nav title="FRadio"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：单选框组 -->
      <div class="section">
        <h3>单选框组</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue">
            <FRadio :value="'选项1'" label="选项1">选项1</FRadio>
            <FRadio :value="'选项2'" label="选项2">选项2</FRadio>
            <FRadio :value="'选项3'" label="选项3">选项3</FRadio>
          </FRadioGroup>
          <span style="margin-left: 12px; color: #999;">当前值: {{ radioValue }}</span>
        </div>
      </div>

      <!-- 场景二：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue2">
            <FRadio :value="'选项1'" label="选项1" disabled>选项1</FRadio>
            <FRadio :value="'选项2'" label="选项2">选项2</FRadio>
            <FRadio :value="'选项3'" label="选项3" disabled>选项3</FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 场景三：带边框 -->
      <div class="section">
        <h3>带边框 (Border)</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue3">
            <FRadio :value="'选项1'" label="选项1" border>选项1</FRadio>
            <FRadio :value="'选项2'" label="选项2" border>选项2</FRadio>
            <FRadio :value="'选项3'" label="选项3" border>选项3</FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 场景四：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row" style="flex-direction: column; gap: 12px;">
          <FRadioGroup v-model="radioValue4" size="small">
            <FRadio :value="'选项1'" label="选项1" border>选项1</FRadio>
            <FRadio :value="'选项2'" label="选项2" border>选项2</FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioValue4" size="medium">
            <FRadio :value="'选项1'" label="选项1" border>选项1</FRadio>
            <FRadio :value="'选项2'" label="选项2" border>选项2</FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioValue4" size="large">
            <FRadio :value="'选项1'" label="选项1" border>选项1</FRadio>
            <FRadio :value="'选项2'" label="选项2" border>选项2</FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 场景五：整组禁用 -->
      <div class="section">
        <h3>整组禁用</h3>
        <div class="row">
          <FRadioGroup v-model="radioValue5" disabled>
            <FRadio :value="'选项1'" label="选项1">选项1</FRadio>
            <FRadio :value="'选项2'" label="选项2">选项2</FRadio>
            <FRadio :value="'选项3'" label="选项3">选项3</FRadio>
          </FRadioGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FRadioGroup } from 'fit-ui/src/FRadio'

defineOptions({ name: 'FRadio-Demo', inheritAttrs: false })

const radioValue = ref('选项1')
const radioValue2 = ref('选项2')
const radioValue3 = ref('选项1')
const radioValue4 = ref('选项1')
const radioValue5 = ref('选项2')
</script>

<style scoped lang="scss">
</style>
