<template>
  <div>
    <custom-nav title="FPopconfirm"></custom-nav>
    <div class="demoBox">
      <!-- 场景一：基础气泡确认 -->
      <div class="section">
        <h3>基础气泡确认</h3>
        <FPopconfirm title="确定要删除这条数据吗？" @confirm="handleDelete" @cancel="handleCancel">
          <template #reference>
            <FButton type="danger">删除</FButton>
          </template>
        </FPopconfirm>
      </div>

      <!-- 场景二：自定义按钮文本 -->
      <div class="section">
        <h3>自定义按钮文本</h3>
        <FPopconfirm
          title="确认要执行此操作吗？"
          confirm-button-text="确认执行"
          cancel-button-text="取消操作"
          @confirm="handleExecute"
          @cancel="handleCancel"
        >
          <template #reference>
            <FButton type="primary">执行操作</FButton>
          </template>
        </FPopconfirm>
      </div>

      <!-- 场景三：不同触发方式 -->
      <div class="section">
        <h3>点击触发</h3>
        <FSpace>
          <FPopconfirm
            title="点击气泡确认框内容"
            trigger="click"
            @confirm="handleConfirm('click')"
            @cancel="handleCancel"
          >
            <template #reference>
              <FButton type="success">Click 触发</FButton>
            </template>
          </FPopconfirm>
          <FPopconfirm
            title="悬停气泡确认框内容"
            trigger="hover"
            @confirm="handleConfirm('hover')"
            @cancel="handleCancel"
          >
            <template #reference>
              <FButton type="warning">Hover 触发</FButton>
            </template>
          </FPopconfirm>
        </FSpace>
      </div>

      <!-- 场景四：自定义宽度 -->
      <div class="section">
        <h3>自定义宽度</h3>
        <FPopconfirm
          title="这是一个较宽的气泡确认框，包含较长的确认信息文本内容"
          width="300"
          @confirm="handleWide"
          @cancel="handleCancel"
        >
          <template #reference>
            <FButton type="info">宽气泡确认</FButton>
          </template>
        </FPopconfirm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FPopconfirm, FSpace, FButton } from '@geniusmanyxh/fit-ui'

defineOptions({ name: 'FPopconfirm-Demo', inheritAttrs: false })

const handleDelete = () => {
  console.log('已删除')
}

const handleExecute = () => {
  console.log('已执行')
}

const handleConfirm = (type: string) => {
  console.log(`${type} 触发确认`)
}

const handleWide = () => {
  console.log('宽气泡确认')
}

const handleCancel = () => {
  console.log('已取消')
}
</script>

<style scoped lang="scss">
</style>
