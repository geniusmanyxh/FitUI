<template>
  <div>
    <custom-nav title="FEmpty"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：默认空状态 -->
      <div class="section">
        <h3>默认空状态</h3>
        <div class="row">
          <FEmpty />
        </div>
      </div>

      <!-- 场景二：自定义图片 -->
      <div class="section">
        <h3>自定义图片</h3>
        <div class="row">
          <FEmpty>
            <template #image>
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=empty%20state%20illustration%20simple&image_size=square" alt="空状态" style="width: 120px; height: 120px;" />
            </template>
          </FEmpty>
        </div>
      </div>

      <!-- 场景三：自定义描述 -->
      <div class="section">
        <h3>自定义描述</h3>
        <div class="row">
          <FEmpty description="暂无数据，请添加内容">
            <template #extra>
              <FButton type="primary">添加数据</FButton>
            </template>
          </FEmpty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FEmpty-Demo", inheritAttrs: false })

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
    justify-content: center;
  }
  
  :deep(.f-empty) {
    width: 100%;
    max-width: 400px;
  }
}
</style>
