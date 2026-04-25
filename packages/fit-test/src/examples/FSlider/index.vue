<template>
  <div>
    <custom-nav title="FSlider"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础滑块 -->
      <div class="section">
        <h3>基础滑块</h3>
        <div class="slider-row">
          <FSlider v-model="slider1" class="slider" />
          <span class="slider-value">{{ slider1 }}</span>
        </div>
      </div>

      <!-- 场景二：自定义范围 -->
      <div class="section">
        <h3>自定义范围</h3>
        <div class="slider-row">
          <FSlider v-model="slider2" :min="10" :max="100" class="slider" />
          <span class="slider-value">{{ slider2 }}</span>
        </div>
      </div>

      <!-- 场景三：步长设置 -->
      <div class="section">
        <h3>步长设置</h3>
        <div class="slider-row">
          <FSlider v-model="slider3" :step="10" show-input class="slider" />
          <span class="slider-value">{{ slider3 }}</span>
        </div>
      </div>

      <!-- 场景四：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="slider-row">
          <FSlider v-model="slider4" disabled class="slider" />
          <span class="slider-value">{{ slider4 }}</span>
        </div>
      </div>

      <!-- 场景五：带输入框 -->
      <div class="section">
        <h3>带输入框</h3>
        <div class="slider-row">
          <FSlider v-model="slider5" :step="5" show-input class="slider" />
          <span class="slider-value">{{ slider5 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FSlider } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FSlider-Demo', inheritAttrs: false })

const slider1 = ref(50)
const slider2 = ref(30)
const slider3 = ref(50)
const slider4 = ref(40)
const slider5 = ref(25)
</script>

<style scoped lang="scss">
.slider-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.slider {
  flex: 1;
}

.slider-value {
  font-size: 14px;
  color: #303133;
  min-width: 40px;
  text-align: right;
}
</style>
