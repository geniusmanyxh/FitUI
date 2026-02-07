<template>
  <div>
    <custom-nav title="FTabs"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础标签页 -->
      <div class="section">
        <h3>基础标签页</h3>
        <div class="row">
          <FTabs v-model="activeTab">
            <FTabPane label="标签1" name="1">标签1内容</FTabPane>
            <FTabPane label="标签2" name="2">标签2内容</FTabPane>
            <FTabPane label="标签3" name="3">标签3内容</FTabPane>
          </FTabs>
        </div>
      </div>

      <!-- 场景二：卡片式标签页 -->
      <div class="section">
        <h3>卡片式标签页</h3>
        <div class="row">
          <FTabs v-model="activeTab" type="card">
            <FTabPane label="标签1" name="1">标签1内容</FTabPane>
            <FTabPane label="标签2" name="2">标签2内容</FTabPane>
            <FTabPane label="标签3" name="3">标签3内容</FTabPane>
          </FTabs>
        </div>
      </div>

      <!-- 场景三：位置 -->
      <div class="section">
        <h3>位置</h3>
        <div class="row">
          <FTabs v-model="activeTab" position="top">
            <FTabPane label="顶部" name="1">顶部标签</FTabPane>
          </FTabs>
          <FTabs v-model="activeTab" position="bottom" style="margin-top: 20px;">
            <FTabPane label="底部" name="1">底部标签</FTabPane>
          </FTabs>
          <FTabs v-model="activeTab" position="left" style="margin-top: 20px;">
            <FTabPane label="左侧" name="1">左侧标签</FTabPane>
          </FTabs>
          <FTabs v-model="activeTab" position="right" style="margin-top: 20px;">
            <FTabPane label="右侧" name="1">右侧标签</FTabPane>
          </FTabs>
        </div>
      </div>

      <!-- 场景四：可关闭标签页 -->
      <div class="section">
        <h3>可关闭标签页</h3>
        <div class="row">
          <FTabs v-model="activeTab" type="card" closable>
            <FTabPane label="标签1" name="1">标签1内容</FTabPane>
            <FTabPane label="标签2" name="2">标签2内容</FTabPane>
            <FTabPane label="标签3" name="3">标签3内容</FTabPane>
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
