<template>
  <div>
    <custom-nav title="FTimePicker"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础时间选择 -->
      <div class="section">
        <h3>基础时间选择</h3>
        <FSpace>
          <FTimePicker v-model="time1" />
          <span class="time-value">选中时间: {{ time1 || '未选择' }}</span>
        </FSpace>
      </div>

      <!-- 场景二：自定义占位符 -->
      <div class="section">
        <h3>自定义占位符</h3>
        <FTimePicker v-model="time2" placeholder="请选择开始时间" />
      </div>

      <!-- 场景三：禁用某些小时 -->
      <div class="section">
        <h3>禁用某些小时</h3>
        <FSpace>
          <FTimePicker v-model="time3" :disabled-hours="disabledHours" />
          <span class="time-tip">禁用 0-8 点和 22-23 点</span>
        </FSpace>
      </div>

      <!-- 场景四：自定义时间格式 -->
      <div class="section">
        <h3>禁用状态</h3>
        <FTimePicker v-model="time4" disabled />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FTimePicker, FSpace } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FTimePicker-Demo', inheritAttrs: false })

const time1 = ref('')
const time2 = ref('')
const time3 = ref('')
const time4 = ref('12:30:00')

const disabledHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23]
</script>

<style scoped lang="scss">
.time-value {
  font-size: 13px;
  color: #606266;
}

.time-tip {
  font-size: 12px;
  color: #909399;
}
</style>
