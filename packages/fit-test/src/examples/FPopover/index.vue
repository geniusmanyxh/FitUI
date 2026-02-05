<template>
  <div>
    <custom-nav title="FPopover"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：不同位置 -->
      <div class="section">
        <h3>不同位置</h3>
        <div class="row">
          <FPopover content="顶部提示" placement="top">
            <FButton type="primary">顶部</FButton>
          </FPopover>
          <FPopover content="底部提示" placement="bottom">
            <FButton type="primary">底部</FButton>
          </FPopover>
          <FPopover content="左侧提示" placement="left">
            <FButton type="primary">左侧</FButton>
          </FPopover>
          <FPopover content="右侧提示" placement="right">
            <FButton type="primary">右侧</FButton>
          </FPopover>
        </div>
      </div>

      <!-- 场景二：触发方式 -->
      <div class="section">
        <h3>触发方式</h3>
        <div class="row">
          <FPopover content="hover 触发" trigger="hover">
            <FButton type="primary">hover 触发</FButton>
          </FPopover>
          <FPopover content="click 触发" trigger="click">
            <FButton type="primary">click 触发</FButton>
          </FPopover>
          <FPopover content="focus 触发" trigger="focus">
            <FButton type="primary">focus 触发</FButton>
          </FPopover>
        </div>
      </div>

      <!-- 场景三：宽度控制 -->
      <div class="section">
        <h3>宽度控制</h3>
        <div class="row">
          <FPopover content="固定宽度的提示信息" :width="200">
            <FButton type="primary">固定宽度</FButton>
          </FPopover>
          <FPopover content="自适应宽度的提示信息">
            <FButton type="primary">自适应宽度</FButton>
          </FPopover>
        </div>
      </div>

      <!-- 场景四：自定义内容 -->
      <div class="section">
        <h3>自定义内容</h3>
        <div class="row">
          <FPopover>
            <template #content>
              <div class="popover-content">
                <h4>自定义内容</h4>
                <p>这是一个包含自定义内容的弹出框</p>
                <FButton type="primary" size="small">操作按钮</FButton>
              </div>
            </template>
            <FButton type="primary">自定义内容</FButton>
          </FPopover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FPopover-Demo", inheritAttrs: false })

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
  
  .popover-content {
    padding: 10px;
    
    h4 {
      margin-bottom: 8px;
    }
    
    p {
      margin-bottom: 12px;
    }
  }
}
</style>
