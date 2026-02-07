<template>
  <div>
    <custom-nav title="FRadio"></custom-nav>
    <div class="demoBox">
      <!-- 基础用法 -->
      <div class="section">
        <h3>基础用法</h3>
        <div class="row">
          <FRadioGroup v-model="radio">
            <FRadio label="Option A" value="a">Option A</FRadio>
            <FRadio label="Option B" value="b">Option B</FRadio>
            <FRadio label="Option C" value="c">Option C</FRadio>
          </FRadioGroup>
          <span style="margin-left: 12px; color: #999;">当前值: {{ radio }}</span>
        </div>
      </div>

      <!-- RadioGroup -->
      <div class="section">
        <h3>RadioGroup</h3>
        <div class="row">
          <FRadioGroup v-model="radioGroup">
            <FRadio label="Option A" value="a">Option A</FRadio>
            <FRadio label="Option B" value="b">Option B</FRadio>
            <FRadio label="Option C" value="c">Option C</FRadio>
          </FRadioGroup>
          <span style="margin-left: 12px; color: #999;">当前值: {{ radioGroup }}</span>
        </div>
      </div>

      <!-- 带边框 (border) -->
      <div class="section">
        <h3>带边框 (border)</h3>
        <div class="row">
          <FRadioGroup v-model="radioBorder">
            <FRadio label="Option" value="a" border>Option A</FRadio>
            <FRadio label="Option" value="b" border>Option B</FRadio>
            <FRadio label="Option" value="c" border>Option C</FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row" style="flex-direction: column; gap: 12px;">
          <FRadioGroup v-model="radioSize" size="small">
            <FRadio label="Option" value="a" border>Small</FRadio>
            <FRadio label="Option" value="b" border>Small</FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioSize" size="medium">
            <FRadio label="Option" value="a" border>Medium</FRadio>
            <FRadio label="Option" value="b" border>Medium</FRadio>
          </FRadioGroup>
          <FRadioGroup v-model="radioSize" size="large">
            <FRadio label="Option" value="a" border>Large</FRadio>
            <FRadio label="Option" value="b" border>Large</FRadio>
          </FRadioGroup>
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row" style="flex-direction: column; gap: 12px;">
          <div>
            <FRadioGroup v-model="radioDisabled">
              <FRadio label="Option A" value="a" disabled>Option A (禁用)</FRadio>
              <FRadio label="Option B" value="b">Option B</FRadio>
              <FRadio label="Option C" value="c" disabled>Option C (禁用)</FRadio>
            </FRadioGroup>
          </div>
          <div>
            <FRadioGroup v-model="radioGroupDisabled" disabled>
              <FRadio label="Option A" value="a">Option A</FRadio>
              <FRadio label="Option B" value="b">Option B</FRadio>
              <FRadio label="Option C" value="c">Option C</FRadio>
            </FRadioGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({ name: 'FRadio-Demo', inheritAttrs: false })

const radio = ref('a')
const radioGroup = ref('a')
const radioBorder = ref('a')
const radioSize = ref('a')
const radioDisabled = ref('b')
const radioGroupDisabled = ref('b')
</script>

<style scoped lang="scss">
</style>
