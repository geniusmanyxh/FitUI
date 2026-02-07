<template>
  <div>
    <custom-nav title="FCheckbox"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：单个复选框 -->
      <div class="section">
        <h3>单个复选框</h3>
        <div class="row">
          <FCheckbox v-model="singleCheck" label="同意协议">同意协议</FCheckbox>
          <span style="margin-left: 12px; color: #999;">当前值: {{ singleCheck }}</span>
        </div>
      </div>

      <!-- 场景二：复选框组 -->
      <div class="section">
        <h3>复选框组 (CheckboxGroup)</h3>
        <div class="row">
          <FCheckboxGroup v-model="checkGroup">
            <FCheckbox :value="'选项1'" label="选项1">选项1</FCheckbox>
            <FCheckbox :value="'选项2'" label="选项2">选项2</FCheckbox>
            <FCheckbox :value="'选项3'" label="选项3">选项3</FCheckbox>
          </FCheckboxGroup>
          <span style="margin-left: 12px; color: #999;">已选: {{ checkGroup }}</span>
        </div>
      </div>

      <!-- 场景三：全选和半选 (indeterminate) -->
      <div class="section">
        <h3>全选和半选 (Indeterminate)</h3>
        <div class="row" style="flex-direction: column; align-items: flex-start;">
          <FCheckbox
            v-model="allChecked"
            :indeterminate="isIndeterminate"
            @change="handleAllChange"
          >全选</FCheckbox>
          <div style="margin-top: 8px;">
            <FCheckboxGroup v-model="checkGroup2" @change="handleGroupChange">
              <FCheckbox :value="'选项A'" label="选项A">选项A</FCheckbox>
              <FCheckbox :value="'选项B'" label="选项B">选项B</FCheckbox>
              <FCheckbox :value="'选项C'" label="选项C">选项C</FCheckbox>
            </FCheckboxGroup>
          </div>
        </div>
      </div>

      <!-- 场景四：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FCheckbox v-model="singleCheck" disabled label="禁用">禁用的复选框</FCheckbox>
          <FCheckboxGroup v-model="checkGroup" disabled style="margin-left: 16px;">
            <FCheckbox :value="'选项1'" label="选项1">选项1</FCheckbox>
            <FCheckbox :value="'选项2'" label="选项2">选项2</FCheckbox>
          </FCheckboxGroup>
        </div>
      </div>

      <!-- 场景五：带边框 (border) -->
      <div class="section">
        <h3>带边框 (Border)</h3>
        <div class="row">
          <FCheckboxGroup v-model="checkGroup3">
            <FCheckbox :value="'选项1'" label="选项1" border>选项1</FCheckbox>
            <FCheckbox :value="'选项2'" label="选项2" border>选项2</FCheckbox>
            <FCheckbox :value="'选项3'" label="选项3" border disabled>选项3</FCheckbox>
          </FCheckboxGroup>
        </div>
      </div>

      <!-- 场景六：限制选择数量 -->
      <div class="section">
        <h3>限制选择数量 (min=1, max=2)</h3>
        <div class="row">
          <FCheckboxGroup v-model="checkGroup4" :min="1" :max="2">
            <FCheckbox :value="'A'" label="A">A</FCheckbox>
            <FCheckbox :value="'B'" label="B">B</FCheckbox>
            <FCheckbox :value="'C'" label="C">C</FCheckbox>
            <FCheckbox :value="'D'" label="D">D</FCheckbox>
          </FCheckboxGroup>
          <span style="margin-left: 12px; color: #999;">已选: {{ checkGroup4 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FCheckboxGroup } from 'fit-ui/src/FCheckbox'

defineOptions({ name: 'FCheckbox-Demo', inheritAttrs: false })

const singleCheck = ref(false)
const checkGroup = ref(['选项1'])
const checkGroup2 = ref<string[]>(['选项A'])
const checkGroup3 = ref(['选项1'])
const checkGroup4 = ref(['A'])
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
