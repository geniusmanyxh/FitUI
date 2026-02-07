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

      <!-- 场景五：SkeletonItem 组件 -->
      <div class="section">
        <h3>SkeletonItem 组件</h3>
        <div class="row" style="flex-direction: column; gap: 16px; align-items: flex-start;">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>文本类型：</div>
            <FSkeletonItem variant="text" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>圆形类型：</div>
            <FSkeletonItem variant="circle" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>图片类型：</div>
            <FSkeletonItem variant="image" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>按钮类型：</div>
            <FSkeletonItem variant="button" />
          </div>
        </div>
      </div>

      <!-- 场景六：节流 -->
      <div class="section">
        <h3>节流</h3>
        <div class="row" style="flex-direction: column; gap: 12px; align-items: flex-start;">
          <div>
            <FButton @click="toggleLoading">切换加载状态</FButton>
            <span style="margin-left: 12px;">当前状态: {{ loading ? '加载中' : '已加载' }}</span>
          </div>
          <FSkeleton :loading="loading" :throttle="500">
            <div>这是实际内容，当 loading 为 true 时，会延迟 500ms 显示骨架屏</div>
          </FSkeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FSkeleton-Demo", inheritAttrs: false })

import { ref } from 'vue'

const loading = ref(true)

const toggleLoading = () => {
  loading.value = !loading.value
}

</script>

<style scoped lang="scss">
.demoBox {
  :deep(.f-skeleton) {
    width: 100%;
    max-width: 400px;
  }
}
</style>
