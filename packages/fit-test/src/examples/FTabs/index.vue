<template>
  <div>
    <custom-nav title="FTabs"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础标签页 -->
      <div class="section">
        <h3>基础标签页</h3>
        <div class="row">
          <FTabs v-model:active-key="activeTab">
            <FTabPane label="标签 1" name="1">标签 1 内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
            <FTabPane label="标签 3" name="3">标签 3 内容</FTabPane>
          </FTabs>
        </div>
      </div>

      <!-- 场景二：卡片式标签页 -->
      <div class="section">
        <h3>卡片式标签页</h3>
        <div class="row">
          <FTabs v-model:active-key="activeTab" type="card">
            <FTabPane label="标签 1" name="1">标签 1 内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
            <FTabPane label="标签 3" name="3">标签 3 内容</FTabPane>
          </FTabs>
        </div>
      </div>

      <!-- 场景三：标签位置 -->
      <div class="section">
        <h3>标签位置</h3>
        <div class="row">
          <FTabs v-model:active-key="positionTab" tab-position="top">
            <FTabPane label="顶部" name="1">顶部标签内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
          </FTabs>
          <FTabs v-model:active-key="positionTab" tab-position="bottom" style="margin-top: 20px;">
            <FTabPane label="底部" name="1">底部标签内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
          </FTabs>
          <FTabs v-model:active-key="positionTab" tab-position="left" style="margin-top: 20px;">
            <FTabPane label="左侧" name="1">左侧标签内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
          </FTabs>
          <FTabs v-model:active-key="positionTab" tab-position="right" style="margin-top: 20px;">
            <FTabPane label="右侧" name="1">右侧标签内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
          </FTabs>
        </div>
      </div>

      <!-- 场景四：可关闭标签页 -->
      <div class="section">
        <h3>可关闭标签页</h3>
        <div class="row">
          <FTabs v-model:active-key="activeTab" type="card" closable>
            <FTabPane label="标签 1" name="1">标签 1 内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
            <FTabPane label="标签 3" name="3">标签 3 内容</FTabPane>
          </FTabs>
        </div>
      </div>

      <!-- 场景五：可关闭的卡片式标签页 -->
      <div class="section">
        <h3>可关闭的卡片式标签页</h3>
        <div class="row">
          <FTabs v-model:active-key="closableCardTab" type="card" closable>
            <FTabPane label="标签 1" name="1">标签 1 内容</FTabPane>
            <FTabPane label="标签 2" name="2">标签 2 内容</FTabPane>
            <FTabPane label="标签 3" name="3">标签 3 内容</FTabPane>
            <FTabPane label="标签 4" name="4">标签 4 内容</FTabPane>
          </FTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FTabs-Demo", inheritAttrs: false })

import { ref } from 'vue'

const activeTab = ref('1')
const closableCardTab = ref('1')
const positionTab = ref('1')
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    align-items: flex-start;
  }
  
  :deep(.f-tabs) {
    width: 100%;
    max-width: 600px;
  }
}
</style>
