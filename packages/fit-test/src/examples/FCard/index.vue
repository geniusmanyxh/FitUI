<template>
  <div>
    <custom-nav title="FCard"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础卡片 -->
      <div class="section">
        <h3>基础卡片</h3>
        <div class="row">
          <FCard>
            <template #header>
              <div>卡片标题</div>
            </template>
            <div>卡片内容</div>
          </FCard>
        </div>
      </div>

      <!-- 场景二：带头部 -->
      <div class="section">
        <h3>带头部</h3>
        <div class="row">
          <FCard>
            <template #header>
              <div class="card-header">
                <span>卡片标题</span>
                <FButton type="text">操作</FButton>
              </div>
            </template>
            <div>卡片内容</div>
            <template #footer>
              <div class="card-footer">
                <FButton type="default">取消</FButton>
                <FButton type="primary">确定</FButton>
              </div>
            </template>
          </FCard>
        </div>
      </div>

      <!-- 场景三：阴影效果 -->
      <div class="section">
        <h3>阴影效果</h3>
        <div class="row">
          <FCard shadow="always">
            <div>总是显示阴影</div>
          </FCard>
          <FCard shadow="hover">
            <div> hover 时显示阴影</div>
          </FCard>
          <FCard shadow="never">
            <div>从不显示阴影</div>
          </FCard>
        </div>
      </div>

      <!-- 场景四：自定义样式 -->
      <div class="section">
        <h3>自定义样式</h3>
        <div class="row">
          <FCard class="custom-card">
            <template #header>
              <div>自定义卡片</div>
            </template>
            <div>自定义样式的卡片内容</div>
          </FCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FCard-Demo", inheritAttrs: false })

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
    align-items: flex-start;
  }
  
  :deep(.f-card) {
    width: 100%;
    max-width: 400px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .custom-card {
    border: 2px solid #1890ff;
    border-radius: 8px;
  }
}
</style>
