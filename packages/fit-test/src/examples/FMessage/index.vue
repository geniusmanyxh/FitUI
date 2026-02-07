<template>
  <div>
    <custom-nav title="FMessage"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同类型 -->
      <div class="section">
        <h3>不同类型</h3>
        <div class="row">
          <FButton type="primary" @click="showSuccess">成功消息</FButton>
          <FButton type="warning" @click="showWarning">警告消息</FButton>
          <FButton type="danger" @click="showError">错误消息</FButton>
          <FButton type="info" @click="showInfo">信息消息</FButton>
        </div>
      </div>

      <!-- 场景二：可关闭选项 -->
      <div class="section">
        <h3>可关闭选项</h3>
        <div class="row">
          <FButton type="primary" @click="showClosable">可关闭消息</FButton>
          <FButton type="info" @click="showNotClosable">不可关闭消息</FButton>
          <FButton type="success" @click="showWithClose">显示关闭按钮</FButton>
        </div>
      </div>

      <!-- 场景三：持续时间 -->
      <div class="section">
        <h3>持续时间</h3>
        <div class="row">
          <FButton type="primary" @click="showShortDuration">1秒后关闭</FButton>
          <FButton type="warning" @click="showMediumDuration">3秒后关闭</FButton>
          <FButton type="info" @click="showLongDuration">5秒后关闭</FButton>
          <FButton type="success" @click="showInfinite">不自动关闭</FButton>
        </div>
      </div>

      <!-- 场景四：位置设置 -->
      <div class="section">
        <h3>位置设置</h3>
        <div class="row">
          <FButton type="primary" @click="showTopLeft">左上</FButton>
          <FButton type="success" @click="showTop">顶部</FButton>
          <FButton type="info" @click="showTopRight">右上</FButton>
          <FButton type="warning" @click="showBottomLeft">左下</FButton>
          <FButton type="danger" @click="showBottom">底部</FButton>
          <FButton type="primary" @click="showBottomRight">右下</FButton>
        </div>
      </div>

      <!-- 场景五：分组合并 (grouping) -->
      <div class="section">
        <h3>分组合并 (grouping)</h3>
        <div class="row">
          <FButton type="primary" @click="showGrouping">点击多次合并消息</FButton>
          <p style="color: #666; font-size: 12px;">连续点击按钮多次，相同消息会被合并</p>
        </div>
      </div>

      <!-- 场景六：HTML 内容 -->
      <div class="section">
        <h3>HTML 内容</h3>
        <div class="row">
          <FButton type="primary" @click="showHTMLContent">显示 HTML 内容</FButton>
        </div>
      </div>

      <!-- 场景七：偏移量 (offset) -->
      <div class="section">
        <h3>偏移量 (offset)</h3>
        <div class="row">
          <FButton type="primary" @click="showWithOffset">偏移 100px 的消息</FButton>
        </div>
      </div>

      <!-- 场景八：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <FButton type="primary" @click="showCombination">组合消息</FButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FMessage-Demo', inheritAttrs: false })

import { useMessage } from '@geniusmanyxh/fit-ui'

const { success, error, warning, info, message } = useMessage()

const showSuccess = () => {
  success('操作成功')
}

const showWarning = () => {
  warning('警告信息')
}

const showError = () => {
  error('操作失败')
}

const showInfo = () => {
  info('提示信息')
}

const showClosable = () => {
  success('可关闭的成功消息', { 
    showClose: true 
  })
}

const showNotClosable = () => {
  info('不可关闭的信息消息', { 
    showClose: false 
  })
}

const showWithClose = () => {
  success('显示关闭按钮的消息', {
    showClose: true
  })
}

const showShortDuration = () => {
  success('1秒后自动关闭', { 
    duration: 1000 
  })
}

const showMediumDuration = () => {
  warning('3秒后自动关闭', { 
    duration: 3000 
  })
}

const showLongDuration = () => {
  info('5秒后自动关闭', { 
    duration: 5000 
  })
}

const showInfinite = () => {
  error('不会自动关闭', { 
    duration: 'notime' 
  })
}

const showTopLeft = () => {
  success('左上角消息', { 
    position: 'top-left' 
  })
}

const showTop = () => {
  success('顶部消息', { 
    position: 'top' 
  })
}

const showTopRight = () => {
  success('右上角消息', { 
    position: 'top-right' 
  })
}

const showBottomLeft = () => {
  success('左下角消息', { 
    position: 'bottom-left' 
  })
}

const showBottom = () => {
  success('底部消息', { 
    position: 'bottom' 
  })
}

const showBottomRight = () => {
  success('右下角消息', { 
    position: 'bottom-right' 
  })
}

const showGrouping = () => {
  success('相同的消息会被合并', {
    grouping: true
  })
}

const showHTMLContent = () => {
  message({
    type: 'success',
    msg: '<b>Bold</b> message with <span style="color: red;">red text</span>',
    dangerouslyUseHTMLString: true
  })
}

const showWithOffset = () => {
  success('距离顶部 100px 的消息', {
    offset: 100
  })
}

const showCombination = () => {
  success('组合配置消息', {
    showClose: true,
    duration: 3000,
    position: 'top-right'
  })
}
</script>

<style scoped lang="scss">
</style>