<template>
  <div>
    <custom-nav title="FRate"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础评分 -->
      <div class="section">
        <h3>基础评分</h3>
        <div class="rate-row">
          <FRate v-model="rate1" />
          <span class="rate-value">当前评分: {{ rate1 }}</span>
        </div>
      </div>

      <!-- 场景二：半星评分 -->
      <div class="section">
        <h3>半星评分</h3>
        <div class="rate-row">
          <FRate v-model="rate2" allow-half />
          <span class="rate-value">当前评分: {{ rate2 }}</span>
        </div>
      </div>

      <!-- 场景三：显示文字 -->
      <div class="section">
        <h3>显示文字</h3>
        <div class="rate-row">
          <FRate v-model="rate3" show-text :texts="rateTexts" />
        </div>
      </div>

      <!-- 场景四：不同数量 -->
      <div class="section">
        <h3>自定义最大评分数</h3>
        <FSpace direction="vertical" :size="16">
          <FSpace align="center">
            <span class="rate-label">5星:</span>
            <FRate v-model="rate4a" :max="5" />
          </FSpace>
          <FSpace align="center">
            <span class="rate-label">10星:</span>
            <FRate v-model="rate4b" :max="10" />
          </FSpace>
        </FSpace>
      </div>

      <!-- 场景五：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="rate-row">
          <FRate v-model="rate5" disabled />
          <span class="rate-value">只读评分</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FRate, FSpace } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FRate-Demo', inheritAttrs: false })

const rate1 = ref(3)
const rate2 = ref(3.5)
const rate3 = ref(4)
const rate4a = ref(2)
const rate4b = ref(7)
const rate5 = ref(4)

const rateTexts = ['非常差', '差', '一般', '好', '非常好']
</script>

<style scoped lang="scss">
.rate-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.rate-value {
  font-size: 13px;
  color: #606266;
}

.rate-label {
  font-size: 14px;
  color: #303133;
  min-width: 50px;
}
</style>
