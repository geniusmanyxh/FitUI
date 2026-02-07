<template>
  <div>
    <custom-nav title="FButton"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础类型 -->
      <div class="section">
        <h3>基础类型</h3>
        <div class="row">
          <FButton type="default">默认按钮</FButton>
          <FButton type="primary">主要按钮</FButton>
          <FButton type="success">成功按钮</FButton>
          <FButton type="info">信息按钮</FButton>
          <FButton type="warning">警告按钮</FButton>
          <FButton type="danger">危险按钮</FButton>
        </div>
      </div>

      <!-- 场景二：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FButton type="primary" size="small">小型按钮</FButton>
          <FButton type="primary" size="medium">中型按钮</FButton>
          <FButton type="primary" size="large">大型按钮</FButton>
        </div>
      </div>

      <!-- 场景三：plain 模式 -->
      <div class="section">
        <h3>Plain 模式</h3>
        <div class="row">
          <FButton type="default" plain>默认按钮</FButton>
          <FButton type="primary" plain>主要按钮</FButton>
          <FButton type="success" plain>成功按钮</FButton>
          <FButton type="info" plain>信息按钮</FButton>
          <FButton type="warning" plain>警告按钮</FButton>
          <FButton type="danger" plain>危险按钮</FButton>
        </div>
      </div>

      <!-- 场景四：round 模式 -->
      <div class="section">
        <h3>Round 模式</h3>
        <div class="row">
          <FButton type="default" round>默认按钮</FButton>
          <FButton type="primary" round>主要按钮</FButton>
          <FButton type="success" round>成功按钮</FButton>
          <FButton type="info" round>信息按钮</FButton>
          <FButton type="warning" round>警告按钮</FButton>
          <FButton type="danger" round>危险按钮</FButton>
        </div>
      </div>

      <!-- 场景五：带图标 -->
      <div class="section">
        <h3>带图标</h3>
        <div class="row">
          <FButton type="primary" icon="search">搜索</FButton>
          <FButton type="success" icon="check">确认</FButton>
          <FButton type="warning" icon="warning">警告</FButton>
          <FButton type="danger" icon="delete">删除</FButton>
          <FButton type="info" icon="info">信息</FButton>
        </div>
      </div>

      <!-- 场景六：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FButton type="default" disabled>默认按钮</FButton>
          <FButton type="primary" disabled>主要按钮</FButton>
          <FButton type="success" disabled>成功按钮</FButton>
          <FButton type="info" disabled>信息按钮</FButton>
          <FButton type="warning" disabled>警告按钮</FButton>
          <FButton type="danger" disabled>危险按钮</FButton>
        </div>
      </div>

      <!-- 场景七：加载状态 -->
      <div class="section">
        <h3>加载状态</h3>
        <div class="row">
          <FButton type="primary" loading>加载中</FButton>
          <FButton type="success" loading>加载中</FButton>
          <FButton type="warning" loading>加载中</FButton>
          <FButton type="danger" loading>加载中</FButton>
        </div>
      </div>

      <!-- 场景八：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <FButton type="primary" size="small" plain>小型Plain</FButton>
          <FButton type="success" size="medium" round>中型Round</FButton>
          <FButton type="warning" size="large" icon="check">大型带图标</FButton>
          <FButton type="danger" size="medium" plain round>Plain Round</FButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FButton-Demo', inheritAttrs: false })

</script>

<style scoped lang="scss">
</style>