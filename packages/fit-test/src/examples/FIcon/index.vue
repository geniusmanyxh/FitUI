<template>
  <div>
    <custom-nav title="FIcon"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础图标 -->
      <div class="section">
        <h3>基础图标</h3>
        <div class="row">
          <FIcon name="search" />
          <FIcon name="check" />
          <FIcon name="close" />
          <FIcon name="warning" />
          <FIcon name="info" />
          <FIcon name="delete" />
          <FIcon name="edit" />
          <FIcon name="plus" />
          <FIcon name="minus" />
          <FIcon name="star" />
          <FIcon name="user" />
          <FIcon name="setting" />
        </div>
      </div>

      <!-- 场景二：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FIcon name="search" size="12" />
          <FIcon name="search" size="16" />
          <FIcon name="search" size="20" />
          <FIcon name="search" size="24" />
          <FIcon name="search" size="32" />
          <FIcon name="search" size="40" />
        </div>
      </div>

      <!-- 场景三：自定义颜色 -->
      <div class="section">
        <h3>自定义颜色</h3>
        <div class="row">
          <FIcon name="search" color="#1890ff" />
          <FIcon name="check" color="#52c41a" />
          <FIcon name="warning" color="#faad14" />
          <FIcon name="close" color="#f5222d" />
          <FIcon name="info" color="#13c2c2" />
          <FIcon name="star" color="#faad14" />
          <FIcon name="delete" color="#f5222d" />
          <FIcon name="user" color="#722ed1" />
        </div>
      </div>

      <!-- 场景四：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <FIcon name="search" size="16" color="#1890ff" />
          <FIcon name="check" size="20" color="#52c41a" />
          <FIcon name="warning" size="24" color="#faad14" />
          <FIcon name="close" size="32" color="#f5222d" />
          <FIcon name="info" size="40" color="#13c2c2" />
        </div>
      </div>

      <!-- 场景五：常用图标集合 -->
      <div class="section">
        <h3>常用图标集合</h3>
        <div class="row">
          <!-- 导航图标 -->
          <FIcon name="home" />
          <FIcon name="menu" />
          <FIcon name="back" />
          <FIcon name="forward" />
          <!-- 操作图标 -->
          <FIcon name="copy" />
          <FIcon name="paste" />
          <FIcon name="cut" />
          <FIcon name="download" />
          <FIcon name="upload" />
          <!-- 状态图标 -->
          <FIcon name="success" />
          <FIcon name="error" />
          <FIcon name="loading" />
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