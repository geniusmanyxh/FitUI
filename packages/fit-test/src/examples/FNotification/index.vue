<template>
  <div>
    <custom-nav title="FNotification"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同类型 -->
      <div class="section">
        <h3>不同类型</h3>
        <div class="row">
          <FButton type="primary" @click="showSuccess">成功通知</FButton>
          <FButton type="warning" @click="showWarning">警告通知</FButton>
          <FButton type="danger" @click="showError">错误通知</FButton>
          <FButton type="info" @click="showInfo">信息通知</FButton>
        </div>
      </div>

      <!-- 场景二：位置设置 -->
      <div class="section">
        <h3>位置设置</h3>
        <div class="row">
          <FButton type="primary" @click="showTopLeft">左上</FButton>
          <FButton type="primary" @click="showTop">顶部</FButton>
          <FButton type="primary" @click="showTopRight">右上</FButton>
          <FButton type="primary" @click="showBottomLeft">左下</FButton>
          <FButton type="primary" @click="showBottom">底部</FButton>
          <FButton type="primary" @click="showBottomRight">右下</FButton>
        </div>
      </div>

      <!-- 场景三：持续时间 -->
      <div class="section">
        <h3>持续时间</h3>
        <div class="row">
          <FButton type="primary" @click="showShortDuration">1秒后关闭</FButton>
          <FButton type="warning" @click="showMediumDuration">3秒后关闭</FButton>
          <FButton type="info" @click="showLongDuration">5秒后关闭</FButton>
        </div>
      </div>

      <!-- 场景四：可关闭 -->
      <div class="section">
        <h3>可关闭</h3>
        <div class="row">
          <FButton type="primary" @click="showClosable">可关闭通知</FButton>
          <FButton type="info" @click="showNotClosable">不可关闭通知</FButton>
        </div>
      </div>

      <!-- 场景五：带描述 -->
      <div class="section">
        <h3>带描述</h3>
        <div class="row">
          <FButton type="primary" @click="showWithDescription">带描述的通知</FButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FNotification-Demo", inheritAttrs: false })

import { FNotification } from '@packages/fit-ui'

const showSuccess = () => {
  FNotification.success('操作成功')
}

const showWarning = () => {
  FNotification.warning('警告信息')
}

const showError = () => {
  FNotification.error('操作失败')
}

const showInfo = () => {
  FNotification.info('提示信息')
}

const showTopLeft = () => {
  FNotification.success('左上通知', {
    position: 'top-left'
  })
}

const showTop = () => {
  FNotification.success('顶部通知', {
    position: 'top'
  })
}

const showTopRight = () => {
  FNotification.success('右上通知', {
    position: 'top-right'
  })
}

const showBottomLeft = () => {
  FNotification.success('左下通知', {
    position: 'bottom-left'
  })
}

const showBottom = () => {
  FNotification.success('底部通知', {
    position: 'bottom'
  })
}

const showBottomRight = () => {
  FNotification.success('右下通知', {
    position: 'bottom-right'
  })
}

const showShortDuration = () => {
  FNotification.success('1秒后关闭', {
    duration: 1000
  })
}

const showMediumDuration = () => {
  FNotification.warning('3秒后关闭', {
    duration: 3000
  })
}

const showLongDuration = () => {
  FNotification.info('5秒后关闭', {
    duration: 5000
  })
}

const showClosable = () => {
  FNotification.success('可关闭的通知', {
    closable: true
  })
}

const showNotClosable = () => {
  FNotification.info('不可关闭的通知', {
    closable: false
  })
}

const showWithDescription = () => {
  FNotification.success({
    title: '操作成功',
    message: '您的操作已成功完成，请继续下一步。'
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
    align-items: center;
  }
}
</style>
