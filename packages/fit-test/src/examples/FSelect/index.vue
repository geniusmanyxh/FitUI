<template>
  <div>
    <custom-nav title="FSelect"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：单选 -->
      <div class="section">
        <h3>单选</h3>
        <div class="row">
          <FSelect v-model="selectValue" placeholder="请选择">
            <FOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></FOption>
          </FSelect>
        </div>
      </div>

      <!-- 场景二：多选 -->
      <div class="section">
        <h3>多选</h3>
        <div class="row">
          <FSelect v-model="multipleValue" multiple placeholder="请选择">
            <FOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></FOption>
          </FSelect>
        </div>
      </div>

      <!-- 场景三：可搜索 -->
      <div class="section">
        <h3>可搜索</h3>
        <div class="row">
          <FSelect v-model="selectValue" filterable placeholder="请选择">
            <FOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></FOption>
          </FSelect>
        </div>
      </div>

      <!-- 场景四：可清除 -->
      <div class="section">
        <h3>可清除</h3>
        <div class="row">
          <FSelect v-model="selectValue" clearable placeholder="请选择">
            <FOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></FOption>
          </FSelect>
        </div>
      </div>

      <!-- 场景五：禁用选项 -->
      <div class="section">
        <h3>禁用选项</h3>
        <div class="row">
          <FSelect v-model="selectValue" placeholder="请选择">
            <FOption v-for="item in optionsWithDisabled" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></FOption>
          </FSelect>
        </div>
      </div>

      <!-- 场景六：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FSelect v-model="selectValue" size="small" placeholder="小型选择器">
            <FOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></FOption>
          </FSelect>
          <FSelect v-model="selectValue" size="medium" placeholder="中型选择器">
            <FOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></FOption>
          </FSelect>
          <FSelect v-model="selectValue" size="large" placeholder="大型选择器">
            <FOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></FOption>
          </FSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FSelect-Demo", inheritAttrs: false })

import { ref } from 'vue'

const selectValue = ref('')
const multipleValue = ref([])

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' }
]

const optionsWithDisabled = [
  { value: 'option1', label: '选项1', disabled: false },
  { value: 'option2', label: '选项2', disabled: true },
  { value: 'option3', label: '选项3', disabled: false },
  { value: 'option4', label: '选项4', disabled: true },
  { value: 'option5', label: '选项5', disabled: false }
]
</script>

<style scoped lang="scss">
.demoBox {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  .section {
    width: 100%;
    
    h3 {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    align-items: center;
  }
  
  :deep(.f-select) {
    width: 300px;
  }
}
</style>
