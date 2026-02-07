<template>
  <div>
    <custom-nav title="FDivider"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：水平分割线 -->
      <div class="section">
        <h3>水平分割线</h3>
        <div class="divider-content">
          <p>上方内容</p>
          <FDivider />
          <p>下方内容</p>
        </div>
      </div>

      <!-- 场景二：垂直分割线 -->
      <div class="section">
        <h3>垂直分割线</h3>
        <div class="vertical-content">
          <span>左侧内容</span>
          <FDivider direction="vertical" />
          <span>中间内容</span>
          <FDivider direction="vertical" border-style="dashed" />
          <span>右侧内容</span>
          <FDivider direction="vertical" border-style="dotted" />
        </div>
      </div>

      <!-- 场景三：内容位置 -->
      <div class="section">
        <h3>内容位置</h3>
        <div class="divider-content">
          <p>上方内容</p>
          <FDivider content-position="left">左侧文字</FDivider>
          <p>中间内容</p>
          <FDivider content-position="center">居中文字</FDivider>
          <p>下方内容</p>
          <FDivider content-position="right">右侧文字</FDivider>
        </div>
      </div>

      <!-- 场景四：边框样式 -->
      <div class="section">
        <h3>边框样式</h3>
        <div class="divider-content">
          <p>实线分割线</p>
          <FDivider border-style="solid" />
          <p>虚线分割线</p>
          <FDivider border-style="dashed" />
          <p>点线分割线</p>
          <FDivider border-style="dotted" />
        </div>
      </div>

      <!-- 场景五：带文字分割线 -->
      <div class="section">
        <h3>带文字分割线</h3>
        <div class="divider-content">
          <p>上方内容</p>
          <FDivider>默认分割线（插槽）</FDivider>
          <p>中间内容</p>
          <FDivider content="使用 content prop" />
          <p>下方内容</p>
          <FDivider border-style="dashed">虚线分割线</FDivider>
          <p>更多内容</p>
          <FDivider border-style="dotted" content="点线分割线（content prop）" />
        </div>
      </div>

      <!-- 场景六：组合示例 -->
      <div class="section">
        <h3>组合示例</h3>
        <div class="divider-content">
          <p>复杂布局示例</p>
          <div class="complex-layout">
            <div class="column">
              <h4>列1</h4>
              <p>内容1</p>
            </div>
            <FDivider direction="vertical" />
            <div class="column">
              <h4>列2</h4>
              <p>内容2</p>
            </div>
            <FDivider direction="vertical" />
            <div class="column">
              <h4>列3</h4>
              <p>内容3</p>
            </div>
          </div>
          <FDivider content-position="center">分割线</FDivider>
          <p>下方内容区域</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FDivider-Demo", inheritAttrs: false })

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
  
  .divider-content {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    
    p {
      margin: 10px 0;
    }
  }
  
  .vertical-content {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .complex-layout {
    display: flex;
    align-items: stretch;
    gap: 0;
    margin: 20px 0;
    
    .column {
      flex: 1;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #e8e8e8;
      
      h4 {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
