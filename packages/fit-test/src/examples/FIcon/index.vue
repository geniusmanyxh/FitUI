<template>
  <div>
    <custom-nav title="FIcon"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础图标 -->
      <div class="section">
        <h3>基础图标</h3>
        <div class="row">
          <FIcon icon="search" />
          <FIcon icon="check" />
          <FIcon icon="close" />
          <FIcon icon="warning" />
          <FIcon icon="info" />
          <FIcon icon="delete" />
          <FIcon icon="edit" />
          <FIcon icon="plus" />
          <FIcon icon="minus" />
          <FIcon icon="star" />
          <FIcon icon="user" />
          <FIcon icon="setting" />
        </div>
      </div>

      <!-- 场景二：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FIcon icon="search" size="12" />
          <FIcon icon="search" size="16" />
          <FIcon icon="search" size="20" />
          <FIcon icon="search" size="24" />
          <FIcon icon="search" size="32" />
          <FIcon icon="search" size="40" />
        </div>
      </div>

      <!-- 场景三：自定义颜色 -->
      <div class="section">
        <h3>自定义颜色</h3>
        <div class="row">
          <FIcon icon="search" color="#1890ff" />
          <FIcon icon="check" color="#52c41a" />
          <FIcon icon="warning" color="#faad14" />
          <FIcon icon="close" color="#f5222d" />
          <FIcon icon="info" color="#13c2c2" />
          <FIcon icon="star" color="#faad14" />
          <FIcon icon="delete" color="#f5222d" />
          <FIcon icon="user" color="#722ed1" />
        </div>
      </div>

      <!-- 场景四：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <FIcon icon="search" size="16" color="#1890ff" />
          <FIcon icon="check" size="20" color="#52c41a" />
          <FIcon icon="warning" size="24" color="#faad14" />
          <FIcon icon="close" size="32" color="#f5222d" />
          <FIcon icon="info" size="40" color="#13c2c2" />
        </div>
      </div>

      <!-- 场景五：常用图标集合 -->
      <div class="section">
        <h3>常用图标集合</h3>
        <div class="row">
          <!-- 导航图标 -->
          <FIcon icon="home" />
          <FIcon icon="menu" />
          <FIcon icon="back" />
          <FIcon icon="forward" />
          <!-- 操作图标 -->
          <FIcon icon="copy" />
          <FIcon icon="paste" />
          <FIcon icon="cut" />
          <FIcon icon="download" />
          <FIcon icon="upload" />
          <!-- 状态图标 -->
          <FIcon icon="success" />
          <FIcon icon="error" />
          <FIcon icon="loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FIcon-Demo', inheritAttrs: false })

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