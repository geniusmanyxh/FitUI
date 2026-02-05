<template>
  <div>
    <custom-nav title="FSkeleton"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础骨架屏 -->
      <div class="section">
        <h3>基础骨架屏</h3>
        <div class="row">
          <FSkeleton />
        </div>
      </div>

      <!-- 场景二：动画效果 -->
      <div class="section">
        <h3>动画效果</h3>
        <div class="row">
          <FSkeleton animated />
        </div>
      </div>

      <!-- 场景三：自定义行数 -->
      <div class="section">
        <h3>自定义行数</h3>
        <div class="row">
          <FSkeleton :rows="3" />
          <FSkeleton :rows="5" animated />
        </div>
      </div>

      <!-- 场景四：头像骨架屏 -->
      <div class="section">
        <h3>头像骨架屏</h3>
        <div class="row">
          <FSkeleton avatar />
          <FSkeleton avatar animated />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FSkeleton-Demo", inheritAttrs: false })

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
  
  :deep(.f-skeleton) {
    width: 100%;
    max-width: 400px;
  }
}
</style>
