<template>
  <div>
    <custom-nav title="FSteps"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础步骤条 -->
      <div class="section">
        <h3>基础步骤条</h3>
        <FSteps :active="active1">
          <FStep title="步骤 1" description="这是第一步的描述"></FStep>
          <FStep title="步骤 2" description="这是第二步的描述"></FStep>
          <FStep title="步骤 3" description="这是第三步的描述"></FStep>
          <FStep title="步骤 4" description="这是第四步的描述"></FStep>
        </FSteps>
        <div class="steps-actions">
          <FButton @click="prev1" :disabled="active1 === 0" size="small">上一步</FButton>
          <FButton @click="next1" :disabled="active1 === 4" size="small" type="primary">下一步</FButton>
        </div>
      </div>

      <!-- 场景二：竖向步骤条 -->
      <div class="section">
        <h3>竖向步骤条</h3>
        <FSteps :active="active2" direction="vertical">
          <FStep title="用户注册" description="填写基本信息完成注册"></FStep>
          <FStep title="身份验证" description="上传身份证明材料"></FStep>
          <FStep title="审核中" description="等待平台审核"></FStep>
          <FStep title="完成" description="审核通过，可以使用"></FStep>
        </FSteps>
      </div>

      <!-- 场景三：带图标的步骤条 -->
      <div class="section">
        <h3>简易模式</h3>
        <FSteps :active="active3" simple>
          <FStep title="准备中"></FStep>
          <FStep title="进行中"></FStep>
          <FStep title="已完成"></FStep>
        </FSteps>
      </div>

      <!-- 场景四：带状态的步骤条 -->
      <div class="section">
        <h3>错误状态</h3>
        <FSteps :active="active4">
          <FStep title="步骤 1" description="已完成"></FStep>
          <FStep title="步骤 2" description="已完成"></FStep>
          <FStep title="步骤 3" description="发生错误" status="error"></FStep>
          <FStep title="步骤 4" description="待执行"></FStep>
        </FSteps>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FSteps, FStep, FButton } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FSteps-Demo', inheritAttrs: false })

const active1 = ref(1)
const active2 = ref(2)
const active3 = ref(1)
const active4 = ref(2)

const prev1 = () => {
  if (active1.value > 0) {
    active1.value--
  }
}

const next1 = () => {
  if (active1.value < 4) {
    active1.value++
  }
}
</script>

<style scoped lang="scss">
.steps-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
