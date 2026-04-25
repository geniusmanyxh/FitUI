<template>
  <div>
    <custom-nav title="FScrollbar"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础滚动条 -->
      <div class="section">
        <h3>基础滚动条</h3>
        <FScrollbar height="200px">
          <div v-for="i in 30" :key="i" class="scroll-item">
            内容项 {{ i }}
          </div>
        </FScrollbar>
      </div>

      <!-- 场景二：最大高度滚动 -->
      <div class="section">
        <h3>最大高度滚动</h3>
        <FScrollbar max-height="300px">
          <div v-for="i in 50" :key="i" class="scroll-item">
            内容项 {{ i }}
          </div>
        </FScrollbar>
      </div>

      <!-- 场景三：原生滚动条 -->
      <div class="section">
        <h3>原生滚动条</h3>
        <FScrollbar height="200px" native>
          <div v-for="i in 30" :key="i" class="scroll-item">
            原生滚动条内容项 {{ i }}
          </div>
        </FScrollbar>
      </div>

      <!-- 场景四：内容包装 -->
      <div class="section">
        <h3>内容包装 (wrap)</h3>
        <FScrollbar height="200px" wrap>
          <div class="wrap-content">
            <div v-for="i in 20" :key="i" class="wrap-item">项目 {{ i }}</div>
          </div>
        </FScrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FScrollbar } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FScrollbar-Demo', inheritAttrs: false })
</script>

<style scoped lang="scss">
.scroll-item {
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  color: #303133;

  &:last-child {
    border-bottom: none;
  }
}

.wrap-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
}

.wrap-item {
  width: 100px;
  height: 60px;
  background-color: #f5f7fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #606266;
}
</style>
