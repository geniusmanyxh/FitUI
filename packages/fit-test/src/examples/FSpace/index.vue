<template>
  <div>
    <custom-nav title="FSpace"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础水平间距 -->
      <div class="section">
        <h3>基础水平间距</h3>
        <FSpace>
          <FButton type="primary">按钮 1</FButton>
          <FButton type="primary">按钮 2</FButton>
          <FButton type="primary">按钮 3</FButton>
        </FSpace>
      </div>

      <!-- 场景二：垂直间距 -->
      <div class="section">
        <h3>垂直间距</h3>
        <FSpace direction="vertical">
          <FButton type="primary">按钮 1</FButton>
          <FButton type="primary">按钮 2</FButton>
          <FButton type="primary">按钮 3</FButton>
        </FSpace>
      </div>

      <!-- 场景三：自定义间距大小 -->
      <div class="section">
        <h3>自定义间距大小</h3>
        <FSpace :size="20">
          <FButton type="success">按钮 1</FButton>
          <FButton type="warning">按钮 2</FButton>
          <FButton type="danger">按钮 3</FButton>
        </FSpace>
      </div>

      <!-- 场景四：对齐方式 -->
      <div class="section">
        <h3>对齐方式 (align)</h3>
        <FSpace align="start">
          <div class="demo-item">start</div>
          <div class="demo-item-tall">start - 高元素</div>
          <div class="demo-item">start</div>
        </FSpace>
        <FSpace align="center">
          <div class="demo-item">center</div>
          <div class="demo-item-tall">center - 高元素</div>
          <div class="demo-item">center</div>
        </FSpace>
        <FSpace align="end">
          <div class="demo-item">end</div>
          <div class="demo-item-tall">end - 高元素</div>
          <div class="demo-item">end</div>
        </FSpace>
      </div>

      <!-- 场景五：自动换行 -->
      <div class="section">
        <h3>自动换行 (wrap)</h3>
        <FSpace wrap :size="12">
          <FButton v-for="i in 8" :key="i" type="primary" size="small">按钮 {{ i }}</FButton>
        </FSpace>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FSpace, FButton } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FSpace-Demo', inheritAttrs: false })
</script>

<style scoped lang="scss">
.demo-item {
  width: 60px;
  height: 30px;
  background-color: #e8eaf6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 4px;
}

.demo-item-tall {
  width: 60px;
  height: 60px;
  background-color: #c5cae9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 4px;
}
</style>
