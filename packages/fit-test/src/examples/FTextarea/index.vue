<template>
  <div>
    <custom-nav title="FTextarea"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础文本域 -->
      <div class="section">
        <h3>基础文本域</h3>
        <div class="row">
          <FTextarea v-model="textareaValue" placeholder="请输入内容" />
        </div>
      </div>

      <!-- 场景二：行数控制 -->
      <div class="section">
        <h3>行数控制</h3>
        <div class="row">
          <FTextarea v-model="textareaValue" rows="3" placeholder="3行文本域" />
          <FTextarea v-model="textareaValue" rows="5" placeholder="5行文本域" />
        </div>
      </div>

      <!-- 场景三：自动高度 -->
      <div class="section">
        <h3>自动高度</h3>
        <div class="row">
          <FTextarea v-model="textareaValue" auto-size placeholder="自动高度文本域" />
        </div>
      </div>

      <!-- 场景四：字数统计 -->
      <div class="section">
        <h3>字数统计</h3>
        <div class="row">
          <FTextarea v-model="textareaValue" maxlength="100" show-word-limit placeholder="最多输入100个字符" />
        </div>
      </div>

      <!-- 场景五：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FTextarea v-model="textareaValue" disabled placeholder="禁用的文本域" />
        </div>
      </div>

      <!-- 场景六：只读状态 -->
      <div class="section">
        <h3>只读状态</h3>
        <div class="row">
          <FTextarea v-model="textareaValue" readonly placeholder="只读的文本域" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FTextarea-Demo", inheritAttrs: false })

import { ref } from 'vue'

const textareaValue = ref('')
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
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    align-items: flex-start;
  }
  
  :deep(.f-textarea) {
    width: 400px;
  }
}
</style>
