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

      <!-- 场景五：组合示例 -->
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

import { FMessage } from '@packages/fit-ui'

const showSuccess = () => {
  FMessage.success('操作成功')
}

const showWarning = () => {
  FMessage.warning('警告信息')
}

const showError = () => {
  FMessage.error('操作失败')
}

const showInfo = () => {
  FMessage.info('提示信息')
}

const showClosable = () => {
  FMessage.success('可关闭的成功消息', { 
    closable: true 
  })
}

const showNotClosable = () => {
  FMessage.info('不可关闭的信息消息', { 
    closable: false 
  })
}

const showShortDuration = () => {
  FMessage.success('1秒后自动关闭', { 
    duration: 1000 
  })
}

const showMediumDuration = () => {
  FMessage.warning('3秒后自动关闭', { 
    duration: 3000 
  })
}

const showLongDuration = () => {
  FMessage.info('5秒后自动关闭', { 
    duration: 5000 
  })
}

const showInfinite = () => {
  FMessage.error('不会自动关闭', { 
    duration: 0 
  })
}

const showTopLeft = () => {
  FMessage.success('左上角消息', { 
    position: 'top-left' 
  })
}

const showTop = () => {
  FMessage.success('顶部消息', { 
    position: 'top' 
  })
}

const showTopRight = () => {
  FMessage.success('右上角消息', { 
    position: 'top-right' 
  })
}

const showBottomLeft = () => {
  FMessage.success('左下角消息', { 
    position: 'bottom-left' 
  })
}

const showBottom = () => {
  FMessage.success('底部消息', { 
    position: 'bottom' 
  })
}

const showBottomRight = () => {
  FMessage.success('右下角消息', { 
    position: 'bottom-right' 
  })
}

const showCombination = () => {
  FMessage.success('组合配置消息', {
    closable: true,
    duration: 3000,
    position: 'top-right'
  })
}
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
  }
}
</style>