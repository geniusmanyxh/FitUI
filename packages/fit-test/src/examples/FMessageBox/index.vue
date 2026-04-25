<template>
  <div>
    <custom-nav title="FMessageBox"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：Alert 提示框 -->
      <div class="section">
        <h3>Alert 提示框</h3>
        <FSpace wrap>
          <FButton @click="openAlert">基础 Alert</FButton>
          <FButton @click="openAlertWithType('success')" type="success">成功 Alert</FButton>
          <FButton @click="openAlertWithType('warning')" type="warning">警告 Alert</FButton>
          <FButton @click="openAlertWithType('error')" type="danger">错误 Alert</FButton>
          <FButton @click="openAlertWithType('info')" type="info">信息 Alert</FButton>
        </FSpace>
      </div>

      <!-- 场景二：Confirm 确认框 -->
      <div class="section">
        <h3>Confirm 确认框</h3>
        <FButton type="primary" @click="openConfirm">删除确认</FButton>
      </div>

      <!-- 场景三：Prompt 输入框 -->
      <div class="section">
        <h3>Prompt 输入框</h3>
        <FButton @click="openPrompt">输入用户名</FButton>
        <p v-if="promptResult" class="result-text">输入结果: {{ promptResult }}</p>
      </div>

      <!-- 场景四：自定义样式 -->
      <div class="section">
        <h3>自定义按钮文本</h3>
        <FButton type="warning" @click="openCustomText">自定义按钮文本</FButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FButton, FSpace, FMessageBox } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FMessageBox-Demo', inheritAttrs: false })

const promptResult = ref('')

const openAlert = () => {
  const instance = new FMessageBox({
    title: '提示',
    message: '这是一条提示信息',
    type: 'alert'
  })
  instance.open()
}

const openAlertWithType = (type: 'success' | 'warning' | 'error' | 'info') => {
  const messages = {
    success: '操作成功完成！',
    warning: '请注意，这是一个警告信息',
    error: '操作失败，请重试',
    info: '这是一条信息提示'
  }
  const titles = {
    success: '成功',
    warning: '警告',
    error: '错误',
    info: '提示'
  }

  const instance = new FMessageBox({
    title: titles[type],
    message: messages[type],
    type
  })
  instance.open()
}

const openConfirm = () => {
  const instance = new FMessageBox({
    title: '确认删除',
    message: '确定要删除这条数据吗？此操作不可撤销。',
    type: 'confirm',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    beforeClose: async (action) => {
      if (action === 'confirm') {
        console.log('确认删除')
      }
    }
  })
  instance.open()
}

const openPrompt = () => {
  const instance = new FMessageBox({
    title: '输入用户名',
    message: '请输入您的用户名',
    type: 'prompt',
    showInput: true,
    showCancelButton: true,
    inputPlaceholder: '请输入用户名',
    inputValidator: (value: string) => {
      if (!value) return '用户名不能为空'
      if (value.length < 2) return '用户名至少2个字符'
      return true
    },
    beforeClose: async (action, msgInstance) => {
      if (action === 'confirm') {
        promptResult.value = msgInstance.inputValue
      }
    }
  })
  instance.open()
}

const openCustomText = () => {
  const instance = new FMessageBox({
    title: '自定义按钮',
    message: '确认要执行此操作吗？',
    type: 'confirm',
    showCancelButton: true,
    confirmButtonText: '是的，执行',
    cancelButtonText: '我再想想'
  })
  instance.open()
}
</script>

<style scoped lang="scss">
.result-text {
  margin-top: 12px;
  font-size: 14px;
  color: #606266;
}
</style>
