<template>
  <div>
    <custom-nav title="FLoading"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：区域加载 -->
      <div class="section">
        <h3>区域加载</h3>
        <div class="row">
          <div class="loading-container">
            <FLoading v-if="areaLoading" />
            <div class="loading-content">
              <p>加载中的内容区域</p>
            </div>
          </div>
          <FButton type="primary" @click="toggleAreaLoading">切换区域加载</FButton>
        </div>
      </div>

      <!-- 场景二：全屏加载 -->
      <div class="section">
        <h3>全屏加载</h3>
        <div class="row">
          <FButton type="primary" @click="toggleFullscreenLoading">切换全屏加载</FButton>
          <FLoading v-if="fullscreenLoading" fullscreen />
        </div>
      </div>

      <!-- 场景三：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FLoading v-if="sizeLoading" size="small" />
          <FLoading v-if="sizeLoading" size="medium" />
          <FLoading v-if="sizeLoading" size="large" />
        </div>
      </div>

      <!-- 场景四：自定义文字 -->
      <div class="section">
        <h3>自定义文字</h3>
        <div class="row">
          <div class="loading-container">
            <FLoading v-if="textLoading" text="加载中..." />
            <div class="loading-content">
              <p>带自定义文字的加载</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景五：v-loading 指令 -->
      <div class="section">
        <h3>v-loading 指令</h3>
        <div class="row">
          <div v-loading="isLoading" style="height: 200px; border: 1px solid #eee;">
            <p>内容区域</p>
          </div>
          <FButton @click="isLoading = !isLoading">切换加载</FButton>
        </div>
      </div>

      <!-- 场景六：不同加载类型 -->
      <div class="section">
        <h3>不同加载类型</h3>
        <div class="row">
          <div class="loading-container">
            <FLoading v-if="typeLoading" type="spin" text="旋转加载" />
            <div class="loading-content">
              <p>旋转类型</p>
            </div>
          </div>
          <div class="loading-container">
            <FLoading v-if="typeLoading" type="pulse" text="脉冲加载" />
            <div class="loading-content">
              <p>脉冲类型</p>
            </div>
          </div>
          <div class="loading-container">
            <FLoading v-if="typeLoading" type="dots" text="点状加载" />
            <div class="loading-content">
              <p>点状类型</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 场景七：加载带自定义文本 -->
      <div class="section">
        <h3>加载带自定义文本</h3>
        <div class="row">
          <div class="loading-container">
            <FLoading v-if="customTextLoading" text="正在处理数据..." />
            <div class="loading-content">
              <p>自定义加载文本</p>
            </div>
          </div>
          <div class="loading-container">
            <FLoading v-if="customTextLoading" type="pulse" text="请稍候..." />
            <div class="loading-content">
              <p>脉冲加载 + 自定义文本</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FLoading-Demo", inheritAttrs: false })

import { ref } from 'vue'

const areaLoading = ref(true)
const fullscreenLoading = ref(false)
const sizeLoading = ref(true)
const textLoading = ref(true)
const isLoading = ref(false)
const typeLoading = ref(true)
const customTextLoading = ref(true)

const toggleAreaLoading = () => {
  areaLoading.value = !areaLoading.value
}

const toggleFullscreenLoading = () => {
  fullscreenLoading.value = !fullscreenLoading.value
}
</script>

<style scoped lang="scss">
.demoBox {
  .loading-container {
    position: relative;
    width: 300px;
    height: 200px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .loading-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
