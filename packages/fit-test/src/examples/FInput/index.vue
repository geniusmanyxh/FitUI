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

      <!-- 场景二：不同类型输入 -->
      <div class="section">
        <h3>不同类型输入</h3>
        <div class="row">
          <FInput v-model="inputValue" type="text" placeholder="文本输入" />
          <FInput v-model="passwordValue" type="password" placeholder="请输入密码" />
          <FInput v-model="numberValue" type="number" placeholder="数字输入" />
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

      <!-- 场景五：校验状态 -->
      <div class="section">
        <h3>校验状态</h3>
        <div class="row">
          <FInput v-model="inputValue" invalid placeholder="校验失败的输入框" />
          <FInput v-model="inputValue" required placeholder="必填的输入框" />
        </div>
      </div>

      <!-- 场景六：无障碍支持 -->
      <div class="section">
        <h3>无障碍支持</h3>
        <div class="row">
          <div>
            <label :for="inputId">用户名</label>
            <FInput :id="inputId" v-model="inputValue" placeholder="请输入用户名" />
          </div>
          <div>
            <label :for="emailId">邮箱</label>
            <FInput 
              :id="emailId" 
              v-model="emailValue" 
              placeholder="请输入邮箱" 
              required
              :describedby="emailHelpId"
            />
            <span :id="emailHelpId" class="help-text">请输入有效的邮箱地址</span>
          </div>
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
const numberValue = ref('')
const emailValue = ref('')
const inputId = 'f-input-username'
const emailId = 'f-input-email'
const emailHelpId = 'f-input-email-help'
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

  .help-text {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: var(--f-text-secondary, #666);
  }

  label {
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
