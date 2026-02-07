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
  :deep(.f-skeleton) {
    width: 100%;
    max-width: 400px;
  }
}
</style>
