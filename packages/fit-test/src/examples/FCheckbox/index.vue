<template>
  <div>
    <custom-nav title="FCheckbox"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：单个复选框 -->
      <div class="section">
        <h3>单个复选框</h3>
        <div class="row">
          <FCheckbox v-model="singleCheck">单个复选框</FCheckbox>
        </div>
      </div>

      <!-- 场景二：复选框组 -->
      <div class="section">
        <h3>复选框组</h3>
        <div class="row">
          <FCheckboxGroup v-model="checkGroup">
            <FCheckbox label="选项1"></FCheckbox>
            <FCheckbox label="选项2"></FCheckbox>
            <FCheckbox label="选项3"></FCheckbox>
          </FCheckboxGroup>
        </div>
      </div>

      <!-- 场景三：全选和半选 -->
      <div class="section">
        <h3>全选和半选</h3>
        <div class="row">
          <FCheckbox v-model="allChecked" @change="handleAllChange">全选</FCheckbox>
          <div style="margin-left: 20px;">
            <FCheckboxGroup v-model="checkGroup" @change="handleGroupChange">
              <FCheckbox label="选项1"></FCheckbox>
              <FCheckbox label="选项2"></FCheckbox>
              <FCheckbox label="选项3"></FCheckbox>
            </FCheckboxGroup>
          </div>
        </div>
      </div>

      <!-- 场景四：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FCheckbox v-model="singleCheck" disabled>禁用的单个复选框</FCheckbox>
          <FCheckboxGroup v-model="checkGroup" style="margin-left: 20px;">
            <FCheckbox label="选项1" disabled></FCheckbox>
            <FCheckbox label="选项2"></FCheckbox>
            <FCheckbox label="选项3" disabled></FCheckbox>
          </FCheckboxGroup>
        </div>
      </div>

      <!-- 场景五：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FCheckbox v-model="singleCheck" size="small">小型复选框</FCheckbox>
          <FCheckbox v-model="singleCheck" size="medium">中型复选框</FCheckbox>
          <FCheckbox v-model="singleCheck" size="large">大型复选框</FCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FCheckbox-Demo", inheritAttrs: false })

import { ref, computed } from 'vue'

const singleCheck = ref(false)
const checkGroup = ref(['选项1'])
const allChecked = ref(false)

const handleAllChange = (value: boolean) => {
  if (value) {
    checkGroup.value = ['选项1', '选项2', '选项3']
  } else {
    checkGroup.value = []
  }
}

const handleGroupChange = (value: string[]) => {
  allChecked.value = value.length === 3
}
</script>

<style scoped lang="scss">
.demoBox {
  .row {
    align-items: flex-start;
  }
  
  :deep(.f-checkbox) {
    margin-right: 10px;
  }
}
</style>
