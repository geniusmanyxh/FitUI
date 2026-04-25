<template>
  <div>
    <custom-nav title="FDatePicker"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础日期选择 -->
      <div class="section">
        <h3>基础日期选择</h3>
        <FSpace>
          <FDatePicker v-model="date1" />
          <span class="date-value">选中日期: {{ date1 || '未选择' }}</span>
        </FSpace>
      </div>

      <!-- 场景二：自定义占位符 -->
      <div class="section">
        <h3>自定义占位符</h3>
        <FDatePicker v-model="date2" placeholder="请选择入职日期" />
      </div>

      <!-- 场景三：禁用某些日期 -->
      <div class="section">
        <h3>禁用某些日期</h3>
        <FSpace>
          <FDatePicker v-model="date3" :disabled-date="disabledDate" />
          <span class="date-tip">禁用今天之前的日期</span>
        </FSpace>
      </div>

      <!-- 场景四：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <FDatePicker v-model="date4" disabled />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FDatePicker, FSpace } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FDatePicker-Demo', inheritAttrs: false })

const date1 = ref('')
const date2 = ref('')
const date3 = ref('')
const date4 = ref('2026-01-15')

const disabledDate = (date: Date) => {
  return date.getTime() < Date.now() - 86400000
}
</script>

<style scoped lang="scss">
.date-value {
  font-size: 13px;
  color: #606266;
}

.date-tip {
  font-size: 12px;
  color: #909399;
}
</style>
