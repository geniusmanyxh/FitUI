<template>
  <div>
    <custom-nav title="FSwitch"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础开关 -->
      <div class="section">
        <h3>基础开关</h3>
        <div class="row">
          <FSwitch v-model="switchValue"></FSwitch>
          <span style="margin-left: 12px; color: #999;">{{ switchValue }}</span>
        </div>
      </div>

      <!-- 场景二：不同尺寸 -->
      <div class="section">
        <h3>不同尺寸</h3>
        <div class="row">
          <FSwitch v-model="switchValue" size="small"></FSwitch>
          <FSwitch v-model="switchValue" size="medium" style="margin-left: 12px;"></FSwitch>
          <FSwitch v-model="switchValue" size="large" style="margin-left: 12px;"></FSwitch>
        </div>
      </div>

      <!-- 场景三：禁用状态 -->
      <div class="section">
        <h3>禁用状态</h3>
        <div class="row">
          <FSwitch v-model="switchValue" disabled></FSwitch>
        </div>
      </div>

      <!-- 场景四：加载状态 -->
      <div class="section">
        <h3>加载状态</h3>
        <div class="row">
          <FSwitch v-model="switchValue" loading></FSwitch>
        </div>
      </div>

      <!-- 场景五：带文字描述 -->
      <div class="section">
        <h3>带文字描述</h3>
        <div class="row">
          <FSwitch v-model="switchValue" active-text="开启" inactive-text="关闭"></FSwitch>
        </div>
      </div>

      <!-- 场景六：自定义 activeValue / inactiveValue -->
      <div class="section">
        <h3>自定义值 (activeValue='yes' / inactiveValue='no')</h3>
        <div class="row">
          <FSwitch v-model="customValue" active-value="yes" inactive-value="no"></FSwitch>
          <span style="margin-left: 12px; color: #999;">当前值: {{ customValue }}</span>
        </div>
      </div>

      <!-- 场景七：beforeChange 异步确认 -->
      <div class="section">
        <h3>切换前确认 (beforeChange)</h3>
        <div class="row">
          <FSwitch v-model="confirmSwitch" :before-change="handleBeforeChange"></FSwitch>
          <span style="margin-left: 12px; color: #999;">切换前会弹出确认</span>
        </div>
      </div>

      <!-- 场景八：自定义宽度 -->
      <div class="section">
        <h3>自定义宽度</h3>
        <div class="row">
          <FSwitch v-model="switchValue" :width="80" active-text="开启" inactive-text="关闭" inline-prompt></FSwitch>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'FSwitch-Demo', inheritAttrs: false })

const switchValue = ref(false)
const customValue = ref('no')
const confirmSwitch = ref(false)

const handleBeforeChange = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const result = window.confirm('确定要切换吗？')
    resolve(result)
  })
}
</script>

<style scoped lang="scss">
</style>
