<template>
  <div>
    <custom-nav title="FInput"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础输入 -->
      <div class="section">
        <h3>基础输入</h3>
        <div class="row">
          <FInput v-model="inputValue" placeholder="请输入内容" />
        </div>
      </div>

      <!-- 场景二：密码输入 -->
      <div class="section">
        <h3>密码输入</h3>
        <div class="row">
          <FInput v-model="passwordValue" type="password" placeholder="请输入密码" />
        </div>
      </div>

      <!-- 场景三：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FInput v-model="inputValue" size="small" placeholder="小型输入框" />
          <FInput v-model="inputValue" size="medium" placeholder="中型输入框" />
          <FInput v-model="inputValue" size="large" placeholder="大型输入框" />
        </div>
      </div>

      <!-- 场景四：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FInput v-model="inputValue" disabled placeholder="禁用的输入框" />
        </div>
      </div>

      <!-- 场景五：只读状态 -->
      <div class="section">
        <h3>只读状态</h3>
        <div class="row">
          <FInput v-model="inputValue" readonly placeholder="只读的输入框" />
        </div>
      </div>

      <!-- 场景六：前缀和后缀 -->
      <div class="section">
        <h3>前缀和后缀</h3>
        <div class="row">
          <FInput v-model="inputValue" placeholder="请输入内容">
            <template #prefix>
              <FIcon name="search" />
            </template>
          </FInput>
          <FInput v-model="inputValue" placeholder="请输入内容">
            <template #suffix>
              <FIcon name="close" />
            </template>
          </FInput>
        </div>
      </div>

      <!-- 场景七：清除按钮 -->
      <div class="section">
        <h3>清除按钮</h3>
        <div class="row">
          <FInput v-model="inputValue" clearable placeholder="可清除的输入框" />
        </div>
      </div>

      <!-- 场景八：最大长度和字数统计 -->
      <div class="section">
        <h3>最大长度和字数统计</h3>
        <div class="row">
          <FInput v-model="inputValue" maxlength="20" show-word-limit placeholder="最多输入20个字符" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FInput-Demo", inheritAttrs: false })

import { ref } from 'vue'

const inputValue = ref('')
const passwordValue = ref('')
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
    align-items: center;
  }
  
  :deep(.f-input) {
    width: 300px;
  }
}
</style>
