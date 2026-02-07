<template>
  <div>
    <custom-nav title="FCheckbox"></custom-nav>
    <div class="demoBox">
      <!-- 基础用法 -->
      <div class="section">
        <h3>基础用法</h3>
        <div class="row">
          <FCheckbox v-model="singleCheck" label="同意协议">同意协议</FCheckbox>
          <span style="margin-left: 12px; color: #999;">当前值: {{ singleCheck }}</span>
        </div>
      </div>

      <!-- CheckboxGroup -->
      <div class="section">
        <h3>CheckboxGroup</h3>
        <div class="row">
          <FCheckboxGroup v-model="checkList">
            <FCheckbox label="Option A" value="a">Option A</FCheckbox>
            <FCheckbox label="Option B" value="b">Option B</FCheckbox>
            <FCheckbox label="Option C" value="c">Option C</FCheckbox>
          </FCheckboxGroup>
          <span style="margin-left: 12px; color: #999;">已选: {{ checkList }}</span>
        </div>
      </div>

      <!-- 全选/半选 (indeterminate) -->
      <div class="section">
        <h3>全选/半选 (indeterminate)</h3>
        <div class="row" style="flex-direction: column; align-items: flex-start;">
          <FCheckbox
            v-model="allChecked"
            :indeterminate="isIndeterminate"
            @change="handleAllChange"
            label="全选"
          >全选</FCheckbox>
          <div style="margin-top: 8px;">
            <FCheckboxGroup v-model="checkGroup2" @change="handleGroupChange">
              <FCheckbox label="选项A" value="选项A">选项A</FCheckbox>
              <FCheckbox label="选项B" value="选项B">选项B</FCheckbox>
              <FCheckbox label="选项C" value="选项C">选项C</FCheckbox>
            </FCheckboxGroup>
          </div>
        </div>
      </div>

      <!-- 带边框 (border) -->
      <div class="section">
        <h3>带边框 (border)</h3>
        <div class="row">
          <FCheckboxGroup v-model="checkGroup3">
            <FCheckbox label="Option" value="option1" border>Option 1</FCheckbox>
            <FCheckbox label="Option" value="option2" border>Option 2</FCheckbox>
            <FCheckbox label="Option" value="option3" border>Option 3</FCheckbox>
          </FCheckboxGroup>
        </div>
      </div>

      <!-- 不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row" style="flex-direction: column; gap: 12px;">
          <FCheckboxGroup v-model="checkGroup4" size="small">
            <FCheckbox label="Option" value="small1" border>Small</FCheckbox>
            <FCheckbox label="Option" value="small2" border>Small</FCheckbox>
          </FCheckboxGroup>
          <FCheckboxGroup v-model="checkGroup4" size="medium">
            <FCheckbox label="Option" value="medium1" border>Medium</FCheckbox>
            <FCheckbox label="Option" value="medium2" border>Medium</FCheckbox>
          </FCheckboxGroup>
          <FCheckboxGroup v-model="checkGroup4" size="large">
            <FCheckbox label="Option" value="large1" border>Large</FCheckbox>
            <FCheckbox label="Option" value="large2" border>Large</FCheckbox>
          </FCheckboxGroup>
        </div>
      </div>

      <!-- 最大/最小选择数 -->
      <div class="section">
        <h3>最大/最小选择数</h3>
        <div class="row">
          <FCheckboxGroup v-model="checkGroup5" :min="1" :max="3">
            <FCheckbox label="Option A" value="a">Option A</FCheckbox>
            <FCheckbox label="Option B" value="b">Option B</FCheckbox>
            <FCheckbox label="Option C" value="c">Option C</FCheckbox>
            <FCheckbox label="Option D" value="d">Option D</FCheckbox>
            <FCheckbox label="Option E" value="e">Option E</FCheckbox>
          </FCheckboxGroup>
          <span style="margin-left: 12px; color: #999;">已选: {{ checkGroup5 }} (最少1个，最多3个)</span>
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row" style="flex-direction: column; gap: 12px;">
          <div>
            <FCheckbox v-model="singleCheck" disabled label="禁用">禁用的复选框</FCheckbox>
          </div>
          <div>
            <FCheckboxGroup v-model="checkGroup6" disabled>
              <FCheckbox label="Option 1" value="1">Option 1</FCheckbox>
              <FCheckbox label="Option 2" value="2">Option 2</FCheckbox>
              <FCheckbox label="Option 3" value="3">Option 3</FCheckbox>
            </FCheckboxGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'FCheckbox-Demo', inheritAttrs: false })

const singleCheck = ref(false)
const checkList = ref<string[]>(['a'])
const checkGroup2 = ref<string[]>(['选项A'])
const checkGroup3 = ref<string[]>(['option1'])
const checkGroup4 = ref<string[]>([])
const checkGroup5 = ref<string[]>(['a'])
const checkGroup6 = ref<string[]>(['1'])
const allChecked = ref(false)

const allOptions = ['选项A', '选项B', '选项C']

const isIndeterminate = computed(() => {
  return checkGroup2.value.length > 0 && checkGroup2.value.length < allOptions.length
})

const handleAllChange = (value: boolean | string | number) => {
  if (value) {
    checkGroup2.value = [...allOptions]
  } else {
    checkGroup2.value = []
  }
}

const handleGroupChange = (value: (string | number | boolean)[]) => {
  allChecked.value = value.length === allOptions.length
}
</script>

<style scoped lang="scss">
</style>
