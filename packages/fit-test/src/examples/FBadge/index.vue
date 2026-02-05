<template>
  <div>
    <custom-nav title="FBadge"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础类型 -->
      <div class="section">
        <h3>基础类型</h3>
        <div class="row">
          <FBadge type="primary" value="5"></FBadge>
          <FBadge type="success" value="10"></FBadge>
          <FBadge type="warning" value="15"></FBadge>
          <FBadge type="danger" value="20"></FBadge>
          <FBadge type="info" value="25"></FBadge>
        </div>
      </div>

      <!-- 场景二：数值显示 -->
      <div class="section">
        <h3>数值显示</h3>
        <div class="row">
          <FBadge value="0"></FBadge>
          <FBadge value="1"></FBadge>
          <FBadge value="99"></FBadge>
          <FBadge value="100"></FBadge>
          <FBadge value="999"></FBadge>
        </div>
      </div>

      <!-- 场景三：最大值设置 -->
      <div class="section">
        <h3>最大值设置</h3>
        <div class="row">
          <FBadge value="5" max="10"></FBadge>
          <FBadge value="15" max="10"></FBadge>
          <FBadge value="99" max="99"></FBadge>
          <FBadge value="100" max="99"></FBadge>
          <FBadge value="999" max="99"></FBadge>
        </div>
      </div>

      <!-- 场景四：小红点模式 -->
      <div class="section">
        <h3>小红点模式</h3>
        <div class="row">
          <FBadge dot></FBadge>
          <FBadge type="primary" dot></FBadge>
          <FBadge type="success" dot></FBadge>
          <FBadge type="warning" dot></FBadge>
          <FBadge type="danger" dot></FBadge>
          <FBadge type="info" dot></FBadge>
        </div>
      </div>

      <!-- 场景五：隐藏状态 -->
      <div class="section">
        <h3>隐藏状态</h3>
        <div class="row">
          <FBadge value="5" hidden></FBadge>
          <FBadge value="10"></FBadge>
          <FBadge dot hidden></FBadge>
          <FBadge dot></FBadge>
        </div>
      </div>

      <!-- 场景六：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="row">
          <div class="badge-wrapper">
            <FButton type="primary">
              消息
              <FBadge value="5" style="margin-left: 8px;"></FBadge>
            </FButton>
          </div>
          <div class="badge-wrapper">
            <FIcon icon="bell" size="20" />
            <FBadge value="10" type="danger" style="margin-left: 8px;"></FBadge>
          </div>
          <div class="badge-wrapper">
            <FIcon icon="mail" size="20" />
            <FBadge dot type="warning" style="margin-left: 8px;"></FBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FBadge-Demo", inheritAttrs: false })

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
  
  .badge-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
