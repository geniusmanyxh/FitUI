<template>
  <div>
    <custom-nav title="FAlert"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础用法 -->
      <div class="section">
        <h3>基础用法</h3>
        <div class="row">
          <FAlert type="success" title="成功提示">操作成功</FAlert>
          <FAlert type="warning" title="警告提示">警告信息</FAlert>
          <FAlert type="error" title="错误提示">错误信息</FAlert>
          <FAlert type="info" title="信息提示">提示信息</FAlert>
        </div>
      </div>

      <!-- 场景二：主题 (effect) -->
      <div class="section">
        <h3>主题 (effect)</h3>
        <div class="row">
          <FAlert type="success" title="成功提示" effect="light">浅色效果</FAlert>
          <FAlert type="success" title="成功提示" effect="dark">深色效果</FAlert>
          <FAlert type="warning" title="警告提示" effect="light">浅色效果</FAlert>
          <FAlert type="warning" title="警告提示" effect="dark">深色效果</FAlert>
          <FAlert type="error" title="错误提示" effect="light">浅色效果</FAlert>
          <FAlert type="error" title="错误提示" effect="dark">深色效果</FAlert>
          <FAlert type="info" title="信息提示" effect="light">浅色效果</FAlert>
          <FAlert type="info" title="信息提示" effect="dark">深色效果</FAlert>
        </div>
      </div>

      <!-- 场景三：居中 (center) -->
      <div class="section">
        <h3>居中 (center)</h3>
        <div class="row">
          <FAlert type="info" title="信息提示" center>居中显示的内容</FAlert>
          <FAlert type="success" title="成功提示" center show-icon>居中显示带图标</FAlert>
          <FAlert type="warning" title="警告提示" center>居中警告信息</FAlert>
        </div>
      </div>

      <!-- 场景四：带图标 (showIcon) -->
      <div class="section">
        <h3>带图标 (showIcon)</h3>
        <div class="row">
          <FAlert type="success" title="成功提示" show-icon>操作成功</FAlert>
          <FAlert type="warning" title="警告提示" show-icon>警告信息</FAlert>
          <FAlert type="error" title="错误提示" show-icon>错误信息</FAlert>
          <FAlert type="info" title="信息提示" show-icon>提示信息</FAlert>
        </div>
      </div>

      <!-- 场景五：可关闭 -->
      <div class="section">
        <h3>可关闭</h3>
        <div class="row">
          <FAlert type="success" title="成功提示" closable @close="handleClose">操作成功</FAlert>
          <FAlert type="warning" title="警告提示" closable @close="handleClose">警告信息</FAlert>
          <FAlert type="error" title="错误提示" closable @close="handleClose">错误信息</FAlert>
          <FAlert type="info" title="信息提示" closable @close="handleClose">提示信息</FAlert>
        </div>
      </div>

      <!-- 场景六：自定义关闭文本 -->
      <div class="section">
        <h3>自定义关闭文本</h3>
        <div class="row">
          <FAlert type="info" title="信息提示" closable close-text="知道了">默认关闭图标</FAlert>
          <FAlert type="warning" title="警告提示" closable close-text="知道了">自定义关闭文本</FAlert>
          <FAlert type="error" title="错误提示" closable close-text="知道了">自定义关闭文本</FAlert>
          <FAlert type="success" title="成功提示" closable close-text="知道了">自定义关闭文本</FAlert>
        </div>
      </div>

      <!-- 场景七：带描述 -->
      <div class="section">
        <h3>带描述</h3>
        <div class="row">
          <FAlert type="success" title="成功提示">
            操作已成功完成，请继续下一步。
          </FAlert>
          <FAlert type="error" title="错误提示">
            操作失败，请检查输入信息后重试。
          </FAlert>
          <FAlert type="warning" title="警告提示">
            请注意，此操作可能会影响系统性能。
          </FAlert>
          <FAlert type="info" title="信息提示">
            这是一条重要的提示信息，请仔细阅读。
          </FAlert>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FAlert-Demo", inheritAttrs: false })

import { FMessage } from '@geniusmanyxh/fit-ui'

const handleClose = () => {
  FMessage.info('Alert 已关闭')
}
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    flex-direction: column;
    gap: 15px;
  }
  
  :deep(.f-alert) {
    width: 100%;
    max-width: 600px;
  }
}
</style>
